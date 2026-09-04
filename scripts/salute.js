import { MODULE_ID } from "./constants.js";
import { addParadoxToBalance, getMagickBalance, MAGICK_TRACK_MAX } from "./magick-balance.js";

/**
 * La Salute del ramo A (tronco del 3/9/2026): un tracciato solo, lungo
 * 1 + Costituzione + Fermezza, che porta i danni fisici (/ superficiale,
 * X aggravato) e quelli mentali (o superficiale, ◎ aggravato). La parola
 * Volontà è caduta: ogni «spendi 1 Volontà» è una casella mentale segnata.
 */

// I quattro segni, nell'ordine in cui il clic li fa girare.
export const SALUTE_STATES = Object.freeze(["", "ps", "pa", "ms", "ma"]);

// L'ordine in cui il tracciato si dipinge da sinistra: prima gli aggravati.
export const SALUTE_ORDER = Object.freeze(["pa", "ps", "ma", "ms"]);

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

function attributeValue(actor, id) {
  return count(actor.system?.attributes?.[id]?.value);
}

/** Le caselle: 1 + Costituzione + Fermezza, più le caselle in più segnate a mano. */
export function saluteMax(actor, extra = 0) {
  return Math.max(1 + attributeValue(actor, "stamina") + attributeValue(actor, "resolve") + Math.trunc(Number(extra) || 0), 1);
}

/** Riporta i conti dentro il tracciato: gli aggravati hanno la precedenza. */
export function clampSalute(counts, max) {
  const next = { pa: count(counts?.pa), ps: count(counts?.ps), ma: count(counts?.ma), ms: count(counts?.ms) };
  let room = Math.max(max, 0);
  for (const state of SALUTE_ORDER) {
    next[state] = Math.min(next[state], room);
    room -= next[state];
  }
  return next;
}

/** Lo stato del tracciato: Menomato a tracciato coperto, KO a tutte aggravate. */
export function saluteStatus(counts, max) {
  const total = counts.pa + counts.ps + counts.ma + counts.ms;
  const aggravated = counts.pa + counts.ma;
  if (max > 0 && aggravated >= max) {
    return counts.pa >= counts.ma ? "WOD5E_MAGE.Salute.KoDeath" : "WOD5E_MAGE.Salute.KoShock";
  }
  if (max > 0 && total >= max) return "WOD5E_MAGE.Salute.Impaired";
  return "";
}

export function getSalute(actor) {
  const stored = actor.getFlag(MODULE_ID, "salute") ?? {};
  const extra = Math.trunc(Number(stored.extra) || 0);
  const max = saluteMax(actor, extra);
  const counts = clampSalute(stored, max);
  const total = counts.pa + counts.ps + counts.ma + counts.ms;

  const painted = SALUTE_ORDER.flatMap((state) => Array.from({ length: counts[state] }, () => state));
  const cells = Array.from({ length: max }, (_, index) => ({
    index,
    state: painted[index] ?? "",
    label: `WOD5E_MAGE.Salute.States.${painted[index] || "empty"}`
  }));

  return {
    ...counts,
    extra,
    max,
    total,
    cells,
    status: saluteStatus(counts, max)
  };
}

/** Il clic fa girare la casella: vuota, /, X, o, ◎, poi di nuovo vuota. */
export function nextSaluteState(state) {
  const index = SALUTE_STATES.indexOf(state);
  return SALUTE_STATES[(index < 0 ? 0 : index + 1) % SALUTE_STATES.length];
}

/** Applica il cambio di una casella ai conti, senza uscire dal tracciato. */
export function applySaluteStateChange(counts, max, fromState, toState) {
  const next = { pa: count(counts?.pa), ps: count(counts?.ps), ma: count(counts?.ma), ms: count(counts?.ms) };
  if (fromState && next[fromState] > 0) next[fromState] -= 1;
  if (toState) next[toState] += 1;
  return clampSalute(next, max);
}

function canEdit(actor) {
  if (!actor.isOwner) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.NoSufficientPermission", { string: actor.name })
    );
    return false;
  }
  return true;
}

/** Clic sinistro: la casella gira; clic destro: la casella si svuota. */
export async function onSaluteCellChange(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;

  const salute = getSalute(actor);
  const index = Math.trunc(Number(target.dataset.index));
  const cell = salute.cells[index];
  if (!cell) return;

  const toState = event.button === 2 ? "" : nextSaluteState(cell.state);
  const next = applySaluteStateChange(salute, salute.max, cell.state, toState);
  await actor.setFlag(MODULE_ID, "salute", { ...next, extra: salute.extra });
}

/** Il più e il meno accanto al nome: caselle in più oltre il conto. */
export async function onSaluteExtraChange(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  if (actor.system.locked) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.CannotModifyResourceString", { string: actor.name })
    );
    return;
  }

  const salute = getSalute(actor);
  const delta = Number(target.dataset.delta) || 0;
  const extra = salute.extra + delta;
  const next = clampSalute(salute, saluteMax(actor, extra));
  await actor.setFlag(MODULE_ID, "salute", { ...next, extra });
}

/**
 * Negare il Contraccolpo (ramo A): una volta per sessione segni un aggravato
 * mentale, il Contraccolpo non scatta e la Ruota sale di 3. Se i tre punti
 * portano la Ruota al massimo, Difetto paradossale oppure scoppio: lo dice
 * l'avviso, la scelta è del tavolo.
 */
export const CONTRACCOLPO_COST = 3;

export function getContraccolpo(actor) {
  return { used: Boolean(actor.getFlag(MODULE_ID, "contraccolpoNegato")) };
}

/** Dove va l'aggravato mentale: in una casella vuota, o su un superficiale. */
export function saluteWithMentalAggravated(counts, max) {
  const next = { pa: count(counts?.pa), ps: count(counts?.ps), ma: count(counts?.ma), ms: count(counts?.ms) };
  const total = next.pa + next.ps + next.ma + next.ms;
  if (total < max) {
    next.ma += 1;
    return next;
  }
  if (next.ms > 0) {
    next.ms -= 1;
    next.ma += 1;
    return next;
  }
  if (next.ps > 0) {
    next.ps -= 1;
    next.ma += 1;
    return next;
  }
  return null;
}

export async function onContraccolpoNega(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;

  if (getContraccolpo(actor).used) {
    ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.Contraccolpo.AlreadyUsed"));
    return;
  }

  const salute = getSalute(actor);
  const wounded = saluteWithMentalAggravated(salute, salute.max);
  if (!wounded) {
    ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.Contraccolpo.NoRoom"));
    return;
  }

  const balance = getMagickBalance(actor);
  const next = addParadoxToBalance(balance, CONTRACCOLPO_COST);

  await actor.update({
    [`flags.${MODULE_ID}.salute`]: { ...wounded, extra: salute.extra },
    [`flags.${MODULE_ID}.magickBalance`]: { quintessence: next.quintessence, paradox: next.paradox },
    [`flags.${MODULE_ID}.contraccolpoNegato`]: true
  });

  ui.notifications.info(
    game.i18n.format("WOD5E_MAGE.Contraccolpo.Done", { amount: CONTRACCOLPO_COST })
  );
  if (next.paradox >= MAGICK_TRACK_MAX) {
    ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.Contraccolpo.WheelFull"));
  }
}

/** Nuova sessione: il Contraccolpo si può negare di nuovo. */
export async function onContraccolpoReset(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  await actor.setFlag(MODULE_ID, "contraccolpoNegato", false);
}
