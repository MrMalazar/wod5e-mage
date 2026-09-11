import { MODULE_ID } from "./constants.js";
import { addParadoxToBalance, getMagickBalance, getPersistentMagickResources, MAGICK_TRACK_MAX } from "./magick-balance.js";
import { joinLobby } from "./paradosso-narratore.js";

/**
 * La Salute del ramo A (tronco del 3/9/2026): un tracciato solo, lungo
 * 1 + Costituzione + Fermezza, che porta i danni fisici (/ superficiale,
 * X aggravato) e quelli mentali (o superficiale, ◎ aggravato). La parola
 * Volontà è caduta: ogni «spendi 1 Volontà» è una casella mentale segnata.
 */

// I quattro segni, nell'ordine della scelta.
export const SALUTE_STATES = Object.freeze(["", "ps", "pa", "ms", "ma"]);

// L'ordine dei conti: prima gli aggravati.
export const SALUTE_ORDER = Object.freeze(["pa", "ps", "ma", "ms"]);

/**
 * Come si dipinge il tracciato (verdetto di Blue, 6/9/2026): i danni fisici
 * da sinistra a destra (aggravati, poi superficiali), quelli mentali da
 * destra a sinistra (aggravati all'estremo, poi superficiali verso il
 * centro). Torna gli stati delle caselle, da sinistra.
 */
export function paintSalute(counts, max) {
  const cells = Array.from({ length: Math.max(max, 0) }, () => "");
  const left = [...Array.from({ length: count(counts?.pa) }, () => "pa"), ...Array.from({ length: count(counts?.ps) }, () => "ps")];
  const right = [...Array.from({ length: count(counts?.ma) }, () => "ma"), ...Array.from({ length: count(counts?.ms) }, () => "ms")];
  left.slice(0, cells.length).forEach((state, index) => { cells[index] = state; });
  right.slice(0, cells.length - Math.min(left.length, cells.length)).forEach((state, index) => { cells[cells.length - 1 - index] = state; });
  return cells;
}

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

/**
 * Le caselle bloccate dall'Ustione (ramo C, verdetto di Blue dell'11/9): i
 * danni del Paradosso colorano la casella di rosso e la «bloccano», ma è
 * solo un effetto visivo: il giocatore li può comunque togliere. Il conto
 * non supera mai i danni segnati sul suo lato.
 */
export function normalizeParadoxLocks(stored, counts) {
  return {
    p: Math.min(count(stored?.p), count(counts?.pa) + count(counts?.ps)),
    m: Math.min(count(stored?.m), count(counts?.ma) + count(counts?.ms))
  };
}

/** Quali caselle sono bloccate: le prime fisiche da sinistra, le prime mentali da destra. */
export function paintParadoxLocks(painted, locks) {
  const cells = painted.map(() => false);
  let physical = count(locks?.p);
  for (let index = 0; index < cells.length && physical > 0; index += 1) {
    if (painted[index] === "pa" || painted[index] === "ps") {
      cells[index] = true;
      physical -= 1;
    }
  }
  let mental = count(locks?.m);
  for (let index = cells.length - 1; index >= 0 && mental > 0; index -= 1) {
    if (painted[index] === "ma" || painted[index] === "ms") {
      cells[index] = true;
      mental -= 1;
    }
  }
  return cells;
}

/** Cambio Scena (11/9): una casella bloccata si sblocca, prima le fisiche. */
export function locksAfterScene(locks) {
  const next = { p: count(locks?.p), m: count(locks?.m) };
  if (next.p > 0) next.p -= 1;
  else if (next.m > 0) next.m -= 1;
  return next;
}

export function getSalute(actor) {
  const stored = actor.getFlag(MODULE_ID, "salute") ?? {};
  const extra = Math.trunc(Number(stored.extra) || 0);
  const max = saluteMax(actor, extra);
  const counts = clampSalute(stored, max);
  const total = counts.pa + counts.ps + counts.ma + counts.ms;
  const locks = normalizeParadoxLocks(stored.paradosso, counts);

  const painted = paintSalute(counts, max);
  const lockedCells = paintParadoxLocks(painted, locks);
  const cells = Array.from({ length: max }, (_, index) => ({
    index,
    state: painted[index] ?? "",
    locked: lockedCells[index],
    label: `WOD5E_MAGE.Salute.States.${painted[index] || "empty"}`
  }));

  return {
    ...counts,
    extra,
    paradosso: locks,
    locked: locks.p + locks.m,
    max,
    total,
    cells,
    status: saluteStatus(counts, max)
  };
}

// A tracciato pieno un superficiale diventa aggravato: prima dal lato del
// colpo (fisico da sinistra, mentale da destra), poi dall'altro.
const CONVERSION_SIDES = Object.freeze({ pa: ["ps", "ms"], ps: ["ps", "ms"], ma: ["ms", "ps"], ms: ["ms", "ps"] });
const AGGRAVATED_OF = Object.freeze({ ps: "pa", ms: "ma" });

/**
 * Somma danni ai conti (pa, ps, ma, ms). Quel che entra riempie le caselle
 * libere; a tracciato pieno vale la conversione (LIBRO, «La conversione»):
 * ogni danno di troppo trasforma un superficiale in aggravato, qualunque
 * sia il tipo del colpo, partendo dalla prima casella del suo lato (i
 * fisici da sinistra, i mentali da destra) e poi dall'altro lato. Torna i
 * conti nuovi e quanti superficiali sono diventati aggravati.
 */
export function saluteDamageOutcome(counts, max, damage = {}) {
  const next = { pa: count(counts?.pa), ps: count(counts?.ps), ma: count(counts?.ma), ms: count(counts?.ms) };
  let room = Math.max(count(max) - (next.pa + next.ps + next.ma + next.ms), 0);
  const overflow = { pa: 0, ps: 0, ma: 0, ms: 0 };
  for (const state of SALUTE_ORDER) {
    const hit = count(damage[state]);
    const taken = Math.min(hit, room);
    next[state] += taken;
    room -= taken;
    overflow[state] = hit - taken;
  }
  let converted = 0;
  for (const state of SALUTE_ORDER) {
    while (overflow[state] > 0) {
      const from = CONVERSION_SIDES[state].find((kind) => next[kind] > 0);
      if (!from) break;
      next[from] -= 1;
      next[AGGRAVATED_OF[from]] += 1;
      overflow[state] -= 1;
      converted += 1;
    }
  }
  return { counts: clampSalute(next, max), converted };
}

/** Somma danni ai conti (pa, ps, ma, ms), senza uscire dal tracciato. */
export function saluteWithDamage(counts, max, damage = {}) {
  return saluteDamageOutcome(counts, max, damage).counts;
}

/**
 * Segna danni sulla Salute del personaggio e torna i conti nuovi. Con
 * `lock` (l'Ustione del ramo C) le caselle segnate restano bloccate in
 * rosso finché una scena non le sblocca.
 */
export async function addSaluteDamage(actor, damage = {}, { lock = false } = {}) {
  const salute = getSalute(actor);
  const { counts, converted } = saluteDamageOutcome(salute, salute.max, damage);
  const paradosso = lock
    ? normalizeParadoxLocks({
      p: salute.paradosso.p + count(damage.pa) + count(damage.ps),
      m: salute.paradosso.m + count(damage.ma) + count(damage.ms)
    }, counts)
    : normalizeParadoxLocks(salute.paradosso, counts);
  await actor.setFlag(MODULE_ID, "salute", { ...counts, extra: salute.extra, paradosso });
  return { ...counts, converted };
}

/** Il segno scelto nella finestra dei danni: uno dei quattro, o niente. */
export function normalizeDamageChoice(result = {}) {
  const state = SALUTE_STATES.includes(result.state) && result.state ? result.state : "";
  const amount = Math.max(Math.trunc(Number(result.amount) || 0), 0);
  return { state, amount };
}

/**
 * Danni subiti (ordine di Blue, 9/9): il tasto accanto a Reset apre una
 * finestra che chiede quanti danni e di che segno (superficiale o
 * aggravato, fisico o mentale), e li segna sul tracciato. Se il tracciato
 * era pieno, dice quanti superficiali sono diventati aggravati.
 */
export async function onSaluteDanni(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;

  const localize = game.i18n.localize.bind(game.i18n);
  const signs = SALUTE_STATES.filter((state) => state).map((state) => ({ state, label: `WOD5E_MAGE.Salute.States.${state}` }));
  const content = await foundry.applications.handlebars.renderTemplate(
    "modules/wod5e-mage/templates/dialogs/salute-danni.hbs",
    { signs, chosen: "ps" }
  );
  let result = null;
  try {
    result = await foundry.applications.api.DialogV2.input({
      window: { title: localize("WOD5E_MAGE.Salute.Danni") },
      content,
      ok: { icon: "fa-solid fa-heart-crack", label: localize("WOD5E_MAGE.Salute.DanniOk") },
      buttons: [{ action: "cancel", icon: "fas fa-times", label: localize("WOD5E.Cancel") }],
      classes: ["wod5e", "wod5e-mage", "mage", actor.system.gamesystem, "wod5e-mage-roll-dialog"],
      position: { width: 380, height: "auto" },
      render: (_event, dialog) => wireDamageSigns(dialog)
    });
  } catch (_error) {
    return;
  }
  if (!result || result === "cancel") return;

  const { state, amount } = normalizeDamageChoice(result);
  if (!state || amount <= 0) return;
  const next = await addSaluteDamage(actor, { [state]: amount });
  const sign = localize(`WOD5E_MAGE.Salute.States.${state}`);
  const parts = [game.i18n.format("WOD5E_MAGE.Salute.DanniDone", { amount, sign })];
  if (next.converted > 0) parts.push(game.i18n.format("WOD5E_MAGE.Salute.DanniConverted", { converted: next.converted }));
  const status = saluteStatus(next, getSalute(actor).max);
  if (status) parts.push(localize(status));
  ui.notifications.info(parts.join(" "));
}

/** I quattro segni nella finestra dei danni: un clic sceglie, il campo nascosto lo porta. */
function wireDamageSigns(dialog) {
  const root = dialog?.element;
  const input = root?.querySelector("input[name=state]");
  const buttons = [...(root?.querySelectorAll("[data-role=danniSign]") ?? [])];
  if (!input || !buttons.length) return;
  const paint = () => buttons.forEach((button) => button.classList.toggle("current", button.dataset.state === input.value));
  buttons.forEach((button) => {
    button.addEventListener("click", (click) => {
      click.preventDefault();
      input.value = button.dataset.state ?? "";
      paint();
    });
  });
  paint();
  root.querySelector("input[name=amount]")?.focus();
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

/**
 * Il clic apre un menù piccolo dove hai cliccato: i quattro segni e la
 * casella vuota, solo simboli (la legenda sta sotto il tracciato). Si chiude
 * scegliendo, o cliccando fuori, o con Esc. Il clic destro svuota subito.
 */
function askSaluteState(event, current) {
  return new Promise((resolve) => {
    document.querySelectorAll(".wod5e-mage-salute-menu").forEach((old) => old.remove());
    const localize = game.i18n.localize.bind(game.i18n);
    const menu = document.createElement("div");
    menu.className = "wod5e-mage-salute-menu";
    menu.setAttribute("role", "menu");

    const options = [...SALUTE_STATES.filter((state) => state), ""];
    for (const state of options) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "wod5e-mage-salute-menu-item";
      button.dataset.state = state;
      button.title = localize(`WOD5E_MAGE.Salute.States.${state || "empty"}`);
      button.setAttribute("aria-label", button.title);
      if (state === current) button.classList.add("current");
      const glyph = document.createElement("i");
      glyph.className = "wod5e-mage-salute-glyph";
      glyph.dataset.state = state;
      button.appendChild(glyph);
      // Il nome del segno, a destra del simbolo: fa da legenda.
      const text = document.createElement("span");
      text.className = "wod5e-mage-salute-menu-text";
      text.textContent = button.title;
      button.appendChild(text);
      button.addEventListener("click", (click) => {
        click.preventDefault();
        click.stopPropagation();
        close(state);
      });
      menu.appendChild(button);
    }

    const close = (value) => {
      menu.remove();
      document.removeEventListener("pointerdown", onOutside, true);
      document.removeEventListener("keydown", onKey, true);
      resolve(value);
    };
    const onOutside = (pointer) => {
      if (!menu.contains(pointer.target)) close(null);
    };
    const onKey = (key) => {
      if (key.key === "Escape") close(null);
    };

    document.body.appendChild(menu);
    // Dove hai cliccato, dentro lo schermo.
    const width = menu.offsetWidth || 150;
    const height = menu.offsetHeight || 32;
    const x = Math.min(Math.max((event.clientX ?? 0) + 10, 4), window.innerWidth - width - 4);
    const y = Math.min(Math.max((event.clientY ?? 0) - height / 2, 4), window.innerHeight - height - 4);
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;

    setTimeout(() => {
      document.addEventListener("pointerdown", onOutside, true);
      document.addEventListener("keydown", onKey, true);
    }, 0);
  });
}

export async function onSaluteCellChange(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;

  const salute = getSalute(actor);
  const index = Math.trunc(Number(target.dataset.index));
  const cell = salute.cells[index];
  if (!cell) return;

  const toState = event.button === 2 ? "" : await askSaluteState(event, cell.state);
  if (toState === null || toState === cell.state) return;
  const next = applySaluteStateChange(salute, salute.max, cell.state, toState);
  // Una casella bloccata svuotata a mano: il blocco cade con lei (è solo visivo).
  const paradosso = cell.locked && !toState
    ? (cell.state === "pa" || cell.state === "ps" ? { ...salute.paradosso, p: salute.paradosso.p - 1 } : { ...salute.paradosso, m: salute.paradosso.m - 1 })
    : salute.paradosso;
  await actor.setFlag(MODULE_ID, "salute", { ...next, extra: salute.extra, paradosso: normalizeParadoxLocks(paradosso, next) });
}

/**
 * Cambio Scena (verdetto di Blue, 11/9): sotto Nuova sessione, il tasto
 * sblocca una casella bloccata dall'Ustione e riarma la Convinzione.
 */
export async function onSaluteCambioScena(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const salute = getSalute(actor);
  const paradosso = locksAfterScene(salute.paradosso);
  await actor.update({
    [`flags.${MODULE_ID}.salute.paradosso`]: paradosso,
    [`flags.${MODULE_ID}.-=convinzioneScena`]: null
  });
  const unlocked = salute.locked - (paradosso.p + paradosso.m);
  ui.notifications.info(unlocked > 0
    ? game.i18n.localize("WOD5E_MAGE.Salute.CambioScenaDone")
    : game.i18n.localize("WOD5E_MAGE.Salute.CambioScenaNone"));
}

/**
 * Nuova sessione: i superficiali mentali guariscono tutti, un superficiale
 * fisico se ne va, e il Contraccolpo si può negare di nuovo.
 */
export function saluteAfterSession(counts) {
  return {
    pa: count(counts?.pa),
    ps: Math.max(count(counts?.ps) - 1, 0),
    ma: count(counts?.ma),
    ms: 0
  };
}

/**
 * La Quintessenza a nuova sessione (ramo C, verdetto dell'11/9): la Ruota
 * si azzera e riparte dalla «Quintessenza generata» dei Background; chi
 * non ne ha riparte da zero. I tre punti della prima sessione si mettono
 * a mano.
 */
export function quintessenceGained(generated) {
  return Math.max(Math.trunc(Number(String(generated ?? "").trim()) || 0), 0);
}

/** La Ruota a nuova sessione: la Quintessenza generata, dentro le celle libere. */
export function balanceAfterSession(balance, generated) {
  const gained = quintessenceGained(generated);
  return {
    quintessence: Math.min(gained, Math.max(MAGICK_TRACK_MAX - Math.max(count(balance?.paradox), count(balance?.floor)), 0)),
    paradox: count(balance?.paradox)
  };
}

/** La riga delle Prese dell'Esperienza per i punti della sessione. */
export function experienceGainRow(points, when) {
  return { cost: Math.max(Math.trunc(Number(points) || 0), 0), when: String(when ?? "").trim() };
}

export async function onSaluteNewSession(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;

  // Prima i punti esperienza della sessione: il Narratore li assegna alla
  // fine (o all'inizio della prossima), e finiscono fra le Prese.
  const localize = game.i18n.localize.bind(game.i18n);
  const today = new Date().toLocaleDateString(game.i18n.lang);
  const content = await foundry.applications.handlebars.renderTemplate(
    "modules/wod5e-mage/templates/dialogs/new-session.hbs",
    { when: localize("WOD5E_MAGE.Salute.SessionOf").replace("{date}", today) }
  );
  let result = null;
  try {
    result = await foundry.applications.api.DialogV2.input({
      window: { title: localize("WOD5E_MAGE.Salute.NewSession") },
      content,
      ok: { icon: "fa-solid fa-sun", label: localize("WOD5E_MAGE.Salute.NewSession") },
      buttons: [{ action: "cancel", icon: "fas fa-times", label: localize("WOD5E.Cancel") }],
      classes: ["wod5e", "wod5e-mage", "mage", actor.system.gamesystem, "wod5e-mage-roll-dialog"],
      position: { width: 420, height: "auto" }
    });
  } catch (_error) {
    return;
  }
  if (!result || result === "cancel") return;

  const salute = getSalute(actor);
  const update = {
    // La sessione nuova è anche una scena nuova: una casella bloccata si sblocca.
    [`flags.${MODULE_ID}.salute`]: { ...saluteAfterSession(salute), extra: salute.extra, paradosso: locksAfterScene(salute.paradosso) },
    [`flags.${MODULE_ID}.contraccolpoNegato`]: false,
    // Nuova sessione, nuova scena: la Convinzione può rigenerare di nuovo (9/9).
    [`flags.${MODULE_ID}.-=convinzioneScena`]: null,
    // Sforzare la realtà (10/9 sera): la prima volta della sessione torna gratis.
    [`flags.${MODULE_ID}.-=sforziSessione`]: null
  };

  // La Ruota (ramo C, 11/9): a nuova sessione la Quintessenza si azzera e
  // riparte dalla «Quintessenza generata» scritta sulla scheda.
  const balance = getMagickBalance(actor);
  update[`flags.${MODULE_ID}.magickBalance`] = balanceAfterSession(balance, getPersistentMagickResources(actor).generatedQuintessence);

  const gain = experienceGainRow(result.experience, result.when);
  if (gain.cost > 0) {
    const rows = { ...(actor.getFlag(MODULE_ID, "experienceGains") ?? {}) };
    let rowId = foundry.utils.randomID();
    while (rows[rowId]) rowId = foundry.utils.randomID();
    update[`flags.${MODULE_ID}.experienceGains.${rowId}`] = gain;
  }

  await actor.update(update);
  // Il personaggio entra in lobby: la Scheda del Paradosso del Narratore lo conta.
  await joinLobby(actor);
  ui.notifications.info(gain.cost > 0
    ? game.i18n.format("WOD5E_MAGE.Salute.NewSessionDoneXp", { points: gain.cost })
    : localize("WOD5E_MAGE.Salute.NewSessionDone"));
}

/** Riposo: i superficiali mentali guariscono tutti, un superficiale fisico se ne va. */
export async function onSaluteRiposo(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const salute = getSalute(actor);
  await actor.setFlag(MODULE_ID, "salute", { ...saluteAfterSession(salute), extra: salute.extra });
  ui.notifications.info(game.i18n.localize("WOD5E_MAGE.Salute.RiposoDone"));
}

/**
 * Relax (verdetto di Blue, 4/9 notte): ogni successo cura un superficiale
 * mentale, ogni due successi un aggravato mentale; almeno una casella.
 * I superficiali prima, poi le coppie sugli aggravati.
 */
export function saluteAfterRelax(counts, successes) {
  const out = { pa: count(counts?.pa), ps: count(counts?.ps), ma: count(counts?.ma), ms: count(counts?.ms) };
  let left = Math.max(Math.trunc(Number(successes) || 0), 0);
  const healedSuperficial = Math.min(out.ms, left);
  out.ms -= healedSuperficial;
  left -= healedSuperficial;
  const healedAggravated = Math.min(out.ma, Math.floor(left / 2));
  out.ma -= healedAggravated;
  if (healedSuperficial + healedAggravated === 0) {
    // Il minimo: una casella, un superficiale se c'è, altrimenti un aggravato.
    if (out.ms > 0) out.ms -= 1;
    else if (out.ma > 0) out.ma -= 1;
  }
  return out;
}

/** Relax: Fermezza + Autocontrollo, e i successi curano la mente. */
export async function onSaluteRelax(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const resolve = Math.max(Number(actor.system?.attributes?.resolve?.value) || 0, 0);
  const composure = Math.max(Number(actor.system?.attributes?.composure?.value) || 0, 0);
  // Il ramo C (11/9): anche il Relax passa dalla finestra del modulo, un 8 riesce.
  const { rollAreteWithParadox } = await import("./paradox-dice.js");
  const { ROLL_CARD_FLAG } = await import("./roll-card.js");
  let message = null;
  try {
    message = await rollAreteWithParadox({
      actor,
      data: actor.system,
      pool: resolve + composure,
      threshold: 0,
      paradoxRating: 0,
      skill: true,
      title: game.i18n.localize("WOD5E_MAGE.Salute.RelaxRolling"),
      selectors: ["attributes", "attributes.resolve", "attributes.composure", "mental"]
    });
  } catch (_error) {
    return;
  }
  if (!message || message === "cancel") return;
  const successes = Math.max(Math.trunc(Number(message.getFlag?.(MODULE_ID, ROLL_CARD_FLAG)?.total) || 0), 0);
  const salute = getSalute(actor);
  const after = saluteAfterRelax(salute, successes);
  await actor.setFlag(MODULE_ID, "salute", { ...after, extra: salute.extra });
  ui.notifications.info(game.i18n.format("WOD5E_MAGE.Salute.RelaxDone", {
    successes,
    superficial: salute.ms - after.ms,
    aggravated: salute.ma - after.ma
  }));
}

/** Reset: il tracciato torna vuoto e pulito. */
export async function onSaluteReset(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;

  const salute = getSalute(actor);
  await actor.setFlag(MODULE_ID, "salute", { pa: 0, ps: 0, ma: 0, ms: 0, extra: salute.extra, paradosso: { p: 0, m: 0 } });
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

