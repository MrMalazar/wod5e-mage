import { MODULE_ID } from "./constants.js";
import { addParadoxToBalance, addQuintessenceToBalance, caselleLibere, getMagickBalance, getPersistentMagickResources, MAGICK_TRACK_MAX } from "./magick-balance.js";
import { MAGHI_SETTING } from "./menu-paradosso.js";
import { joinLobby } from "./paradosso-narratore.js";
import { POTERI_USI_FLAG, riarmaUsi } from "./poteri.js";

/**
 * La Salute del ramo A (tronco del 3/9/2026): un tracciato solo, lungo
 * 2 + Costituzione + Fermezza (dall'11/9; era 1), che porta i danni fisici (/ superficiale,
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

/** Le caselle: 2 + Costituzione + Fermezza (Blue, 11/9), più le caselle in più segnate a mano. */
export const SALUTE_BASE = 2;
export function saluteMax(actor, extra = 0) {
  // Il nemico (un attore spc, 27/9) non ha Attributi: le caselle sono system.health.max, già scritto nel Bestiario.
  if (actor?.type === "spc") return Math.max(Math.trunc(Number(actor.system?.health?.max) || 0) + Math.trunc(Number(extra) || 0), 1);
  return Math.max(SALUTE_BASE + attributeValue(actor, "stamina") + attributeValue(actor, "resolve") + Math.trunc(Number(extra) || 0), 1);
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

/**
 * Il Sacrificio (verdetti di Blue del 29/9/2026): con un'azione veloce, come
 * una reazione, il giocatore prende danni a sua scelta, fisici o mentali,
 * superficiali o aggravati, e ne ricava Quintessenza: un superficiale vale 1,
 * un aggravato 3. Il danno è paradossale e resta bloccato (non si cura,
 * nemmeno con la Magick, e il Cambio Scena non lo sblocca) finché il
 * giocatore non ripaga la stessa Quintessenza, o finché finisce la sessione.
 * Il debito si tiene per segno: {pa, ps, ma, ms}.
 */
export const SACRIFICIO_RESA = Object.freeze({ ps: 1, ms: 1, pa: 3, ma: 3 });

/** La Quintessenza di un Sacrificio (e il prezzo del suo saldo): 1 a superficiale, 3 ad aggravato. */
export function sacrificioResa(state, amount = 1) {
  return (SACRIFICIO_RESA[state] ?? 0) * count(amount);
}

/** Il debito non supera i danni segnati dello stesso segno. */
export function normalizeDebito(stored, counts) {
  return {
    pa: Math.min(count(stored?.pa), count(counts?.pa)),
    ps: Math.min(count(stored?.ps), count(counts?.ps)),
    ma: Math.min(count(stored?.ma), count(counts?.ma)),
    ms: Math.min(count(stored?.ms), count(counts?.ms))
  };
}

/** Quanta Quintessenza chiede il debito per sbloccarsi tutto. */
export function debitoQuintessenza(debito) {
  return SALUTE_ORDER.reduce((total, state) => total + sacrificioResa(state, debito?.[state]), 0);
}

/**
 * Quali caselle sono in debito: per ogni segno, le più interne del suo
 * blocco (i fisici da destra del loro blocco, i mentali da sinistra), che
 * sono le ultime segnate; l'Ustione blocca invece da fuori.
 */
export function paintDebito(painted, debito) {
  const cells = painted.map(() => false);
  for (const state of SALUTE_ORDER) {
    const indices = painted.map((value, index) => (value === state ? index : -1)).filter((index) => index >= 0);
    if (state === "pa" || state === "ps") indices.reverse();
    indices.slice(0, count(debito?.[state])).forEach((index) => { cells[index] = true; });
  }
  return cells;
}

/**
 * Quanti danni di quel segno si possono sacrificare: le caselle libere della
 * Salute (il Sacrificio non converte), e la Quintessenza deve starci tutta
 * nella Ruota.
 */
export function sacrificioMassimo({ max = 0, total = 0 } = {}, balance = {}, state = "ps") {
  const resa = SACRIFICIO_RESA[state] ?? 0;
  if (!resa) return 0;
  const boxes = Math.max(count(max) - count(total), 0);
  return Math.min(boxes, Math.floor(caselleLibere(balance) / resa));
}

/** La Salute dopo il Sacrificio: i danni nelle caselle libere, e il debito che cresce. */
export function saluteDopoSacrificio(counts, max, debito, state, amount) {
  const taken = count(amount);
  const next = saluteWithDamage(counts, max, { [state]: taken });
  const nextDebito = { pa: count(debito?.pa), ps: count(debito?.ps), ma: count(debito?.ma), ms: count(debito?.ms) };
  nextDebito[state] += taken;
  return { counts: next, debito: normalizeDebito(nextDebito, next) };
}

/** Il debito dopo il saldo: le caselle saldate tornano curabili. */
export function debitoDopoSaldo(debito, state, amount) {
  const next = { pa: count(debito?.pa), ps: count(debito?.ps), ma: count(debito?.ma), ms: count(debito?.ms) };
  if (state in next) next[state] = Math.max(next[state] - count(amount), 0);
  return next;
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
  // Il debito del Sacrificio (29/9): caselle bloccate a parte, finché non si salda.
  const debito = normalizeDebito(stored.debito, counts);

  const painted = paintSalute(counts, max);
  const lockedCells = paintParadoxLocks(painted, locks);
  const debtCells = paintDebito(painted, debito);
  const cells = Array.from({ length: max }, (_, index) => ({
    index,
    state: painted[index] ?? "",
    locked: lockedCells[index],
    debt: debtCells[index],
    label: `WOD5E_MAGE.Salute.States.${painted[index] || "empty"}`
  }));

  return {
    ...counts,
    extra,
    paradosso: locks,
    locked: locks.p + locks.m,
    debito,
    debt: debito.pa + debito.ps + debito.ma + debito.ms,
    debitoQuintessenza: debitoQuintessenza(debito),
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

/**
 * Il Sacrificio (Blue, 29/9): il tasto accanto alla Quintessenza apre una
 * finestra coi quattro segni e quanti danni; sotto, quanta Quintessenza
 * rendono (1 a superficiale, 3 ad aggravato) e i limiti (le caselle libere
 * della Salute, il posto sulla Ruota). Il danno entra bloccato, in debito,
 * e la carta in chat lo dice al tavolo.
 */
export async function onSaluteSacrificio(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;

  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const salute = getSalute(actor);
  const balance = getMagickBalance(actor);
  const boxes = Math.max(salute.max - salute.total, 0);
  if (boxes <= 0) {
    ui.notifications.warn(localize("WOD5E_MAGE.Sacrificio.NoBoxes"));
    return;
  }
  const signs = SALUTE_STATES.filter((state) => state).map((state) => ({
    state,
    label: `WOD5E_MAGE.Salute.States.${state}`,
    resa: SACRIFICIO_RESA[state],
    max: sacrificioMassimo(salute, balance, state)
  }));
  const content = await foundry.applications.handlebars.renderTemplate(
    "modules/wod5e-mage/templates/dialogs/sacrificio.hbs",
    { signs, chosen: "ps", boxes, cells: caselleLibere(balance) }
  );
  let result = null;
  try {
    result = await foundry.applications.api.DialogV2.input({
      window: { title: localize("WOD5E_MAGE.Sacrificio.Title") },
      content,
      ok: { icon: "fa-solid fa-hand-holding-droplet", label: localize("WOD5E_MAGE.Sacrificio.Ok") },
      buttons: [{ action: "cancel", icon: "fas fa-times", label: localize("WOD5E.Cancel") }],
      classes: ["wod5e", "wod5e-mage", "mage", actor.system.gamesystem, "wod5e-mage-roll-dialog"],
      position: { width: 400, height: "auto" },
      render: (_event, dialog) => wireSacrificio(dialog, format)
    });
  } catch (_error) {
    return;
  }
  if (!result || result === "cancel") return;

  const { state, amount } = normalizeDamageChoice(result);
  if (!state || amount <= 0) return;
  // Si rilegge tutto: la scheda può essere cambiata mentre la finestra era aperta.
  const now = getSalute(actor);
  const ruota = getMagickBalance(actor);
  if (amount > Math.max(now.max - now.total, 0)) {
    ui.notifications.warn(localize("WOD5E_MAGE.Sacrificio.NoBoxes"));
    return;
  }
  const points = sacrificioResa(state, amount);
  if (points > caselleLibere(ruota)) {
    ui.notifications.warn(localize("WOD5E_MAGE.Sacrificio.NoRoom"));
    return;
  }
  const dopo = saluteDopoSacrificio(now, now.max, now.debito, state, amount);
  const ricarica = addQuintessenceToBalance(ruota, points);
  await actor.update({
    [`flags.${MODULE_ID}.salute`]: { ...dopo.counts, extra: now.extra, paradosso: normalizeParadoxLocks(now.paradosso, dopo.counts), debito: dopo.debito },
    [`flags.${MODULE_ID}.magickBalance`]: { quintessence: ricarica.quintessence, paradox: ricarica.paradox }
  });
  const sign = localize(`WOD5E_MAGE.Salute.States.${state}`);
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: `<p class="wod5e-mage-roll-note wod5e-mage-sacrificio-nota">${format("WOD5E_MAGE.Sacrificio.Chat", { amount, sign, points: ricarica.gained })}</p>`
  });
  const parts = [format("WOD5E_MAGE.Sacrificio.Done", { amount, sign, points: ricarica.gained })];
  const status = saluteStatus(dopo.counts, now.max);
  if (status) parts.push(localize(status));
  ui.notifications.info(parts.join(" "));
}

/** La finestra del Sacrificio: il segno scelto, il numero dentro il massimo del segno, e quanto rende. */
function wireSacrificio(dialog, format) {
  const root = dialog?.element;
  const input = root?.querySelector("input[name=state]");
  const amount = root?.querySelector("input[name=amount]");
  const out = root?.querySelector("[data-role=sacrificioResa]");
  const buttons = [...(root?.querySelectorAll("[data-role=danniSign]") ?? [])];
  if (!input || !amount || !buttons.length) return;
  const paint = () => {
    const chosen = buttons.find((button) => button.dataset.state === input.value);
    const max = Math.max(Math.trunc(Number(chosen?.dataset.max) || 0), 0);
    amount.max = String(Math.max(max, 1));
    const value = Math.min(Math.max(Math.trunc(Number(amount.value) || 0), 0), max);
    if (String(value) !== amount.value && max > 0) amount.value = String(Math.max(value, 1));
    buttons.forEach((button) => button.classList.toggle("current", button === chosen));
    const ok = root.querySelector("button[data-action=ok]");
    if (ok) ok.disabled = max <= 0;
    if (out) {
      out.textContent = max > 0
        ? format("WOD5E_MAGE.Sacrificio.Resa", { points: sacrificioResa(input.value, Math.min(Math.max(Math.trunc(Number(amount.value) || 0), 0), max)) })
        : format("WOD5E_MAGE.Sacrificio.Nessuno", {});
    }
  };
  buttons.forEach((button) => {
    button.addEventListener("click", (click) => {
      click.preventDefault();
      if (button.disabled) return;
      input.value = button.dataset.state ?? "";
      paint();
    });
  });
  amount.addEventListener("input", paint);
  amount.addEventListener("change", paint);
  paint();
  amount.focus();
}

/**
 * Salda il debito (Blue, 29/9): si ripaga la stessa Quintessenza che il
 * Sacrificio ha dato (1 a superficiale, 3 ad aggravato), e quelle caselle
 * tornano curabili. Il tasto sta accanto alla Quintessenza, col conto del
 * debito; alla sessione nuova il debito finisce da solo.
 */
export async function onSaluteSalda(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;

  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const salute = getSalute(actor);
  if (salute.debt <= 0) {
    ui.notifications.info(localize("WOD5E_MAGE.Debito.Nessuno"));
    return;
  }
  const quintessence = getMagickBalance(actor).quintessence;
  const signs = SALUTE_ORDER.filter((state) => salute.debito[state] > 0).map((state) => ({
    state,
    label: `WOD5E_MAGE.Salute.States.${state}`,
    resa: SACRIFICIO_RESA[state],
    max: Math.min(salute.debito[state], Math.floor(quintessence / SACRIFICIO_RESA[state]))
  }));
  const content = await foundry.applications.handlebars.renderTemplate(
    "modules/wod5e-mage/templates/dialogs/salda.hbs",
    { signs, chosen: signs[0]?.state ?? "", quintessence, owed: salute.debitoQuintessenza }
  );
  let result = null;
  try {
    result = await foundry.applications.api.DialogV2.input({
      window: { title: localize("WOD5E_MAGE.Debito.Title") },
      content,
      ok: { icon: "fa-solid fa-unlock", label: localize("WOD5E_MAGE.Debito.Ok") },
      buttons: [{ action: "cancel", icon: "fas fa-times", label: localize("WOD5E.Cancel") }],
      classes: ["wod5e", "wod5e-mage", "mage", actor.system.gamesystem, "wod5e-mage-roll-dialog"],
      position: { width: 400, height: "auto" },
      render: (_event, dialog) => wireSalda(dialog, format)
    });
  } catch (_error) {
    return;
  }
  if (!result || result === "cancel") return;

  const { state, amount } = normalizeDamageChoice(result);
  const now = getSalute(actor);
  const ruota = getMagickBalance(actor);
  const taken = Math.min(amount, now.debito[state] ?? 0);
  if (!state || taken <= 0) return;
  const points = sacrificioResa(state, taken);
  if (points > ruota.quintessence) {
    ui.notifications.warn(localize("WOD5E_MAGE.Debito.NoQuintessenza"));
    return;
  }
  await actor.update({
    [`flags.${MODULE_ID}.salute.debito`]: debitoDopoSaldo(now.debito, state, taken),
    [`flags.${MODULE_ID}.magickBalance`]: { quintessence: ruota.quintessence - points, paradox: ruota.paradox }
  });
  const sign = localize(`WOD5E_MAGE.Salute.States.${state}`);
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: `<p class="wod5e-mage-roll-note wod5e-mage-sacrificio-nota">${format("WOD5E_MAGE.Debito.Chat", { amount: taken, sign, points })}</p>`
  });
  ui.notifications.info(format("WOD5E_MAGE.Debito.Done", { amount: taken, sign, points }));
}

/** La finestra del saldo: il segno in debito, quante caselle, e quanto costa. */
function wireSalda(dialog, format) {
  const root = dialog?.element;
  const input = root?.querySelector("input[name=state]");
  const amount = root?.querySelector("input[name=amount]");
  const out = root?.querySelector("[data-role=saldaCosto]");
  const buttons = [...(root?.querySelectorAll("[data-role=danniSign]") ?? [])];
  if (!input || !amount || !buttons.length) return;
  const paint = () => {
    const chosen = buttons.find((button) => button.dataset.state === input.value) ?? buttons[0];
    input.value = chosen?.dataset.state ?? "";
    const max = Math.max(Math.trunc(Number(chosen?.dataset.max) || 0), 0);
    amount.max = String(Math.max(max, 1));
    const value = Math.min(Math.max(Math.trunc(Number(amount.value) || 0), 1), Math.max(max, 1));
    if (String(value) !== amount.value) amount.value = String(value);
    buttons.forEach((button) => button.classList.toggle("current", button === chosen));
    const ok = root.querySelector("button[data-action=ok]");
    if (ok) ok.disabled = max <= 0;
    if (out) out.textContent = format(max > 0 ? "WOD5E_MAGE.Debito.Costo" : "WOD5E_MAGE.Debito.NoQuintessenza", { points: sacrificioResa(input.value, value) });
  };
  buttons.forEach((button) => {
    button.addEventListener("click", (click) => {
      click.preventDefault();
      input.value = button.dataset.state ?? "";
      paint();
    });
  });
  amount.addEventListener("input", paint);
  amount.addEventListener("change", paint);
  paint();
  amount.focus();
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
 * Il menù dei segni sta DENTRO la finestra della scheda (23/9): appeso al
 * corpo della pagina non vedeva i gettoni dei colori, che vivono sulla
 * scheda, e usciva senza fondo e senza simboli («opacità insufficiente», «è
 * scomparso il simbolo di selezione»). Dentro la scheda ha i colori del tema
 * in uso, chiaro compreso. Conti puri, senza DOM: la posizione del menù
 * rispetto all'angolo della finestra, dentro i suoi bordi.
 */
export function posizioneMenuSalute(click, finestra, menu) {
  const width = Math.max(Number(menu?.width) || 0, 1);
  const height = Math.max(Number(menu?.height) || 0, 1);
  const x = (Number(click?.x) || 0) - (Number(finestra?.left) || 0) + 10;
  const y = (Number(click?.y) || 0) - (Number(finestra?.top) || 0) - height / 2;
  const maxX = Math.max((Number(finestra?.width) || 0) - width - 4, 4);
  const maxY = Math.max((Number(finestra?.height) || 0) - height - 4, 4);
  return { x: Math.min(Math.max(x, 4), maxX), y: Math.min(Math.max(y, 4), maxY) };
}

/**
 * Il clic apre un menù piccolo dove hai cliccato: i segni e la casella
 * vuota, col nome accanto al simbolo e la spunta sul segno in uso. Si
 * chiude scegliendo, o cliccando fuori, o con Esc. Il clic destro svuota
 * subito. Il menù si appende alla finestra della scheda (vedi
 * posizioneMenuSalute), non al corpo della pagina. Lo usa anche la
 * Saggezza (23/9) coi suoi segni d'inchiostro: `options` è la lista
 * `{state, label, glyph}` dei segni, la casella vuota compresa.
 */
export function askSegno(event, current, options) {
  return new Promise((resolve) => {
    document.querySelectorAll(".wod5e-mage-salute-menu").forEach((old) => old.remove());
    const localize = game.i18n.localize.bind(game.i18n);
    const menu = document.createElement("div");
    menu.className = "wod5e-mage-salute-menu";
    menu.setAttribute("role", "menu");

    for (const option of options) {
      const state = option.state ?? "";
      const button = document.createElement("button");
      button.type = "button";
      button.className = "wod5e-mage-salute-menu-item";
      button.dataset.state = state;
      // `text` è già scritto (per esempio «Carisma 3»); `label` è una chiave di lingua.
      button.title = option.text ?? localize(option.label);
      button.setAttribute("aria-label", button.title);
      if (state === current) {
        button.classList.add("current");
        button.setAttribute("aria-checked", "true");
      }
      // Il simbolo del segno; con `glyph: null` la voce è solo testo.
      if (option.glyph !== null) {
        const glyph = document.createElement("i");
        glyph.className = option.glyph ?? "wod5e-mage-salute-glyph";
        glyph.dataset.state = state;
        button.appendChild(glyph);
      }
      // Il nome del segno, a destra del simbolo: fa da legenda.
      const text = document.createElement("span");
      text.className = "wod5e-mage-salute-menu-text";
      text.textContent = button.title;
      button.appendChild(text);
      // La spunta sul segno in uso.
      const spunta = document.createElement("i");
      spunta.className = "fa-solid fa-check wod5e-mage-salute-menu-spunta";
      spunta.setAttribute("aria-hidden", "true");
      button.appendChild(spunta);
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

    // Dentro la finestra della scheda (che è posizionata: il menù sta in
    // assoluto rispetto al suo angolo); il corpo della pagina solo come ripiego.
    const host = event.target?.closest?.(".application") ?? document.body;
    host.appendChild(menu);
    const finestra = host === document.body
      ? { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight }
      : host.getBoundingClientRect();
    const posizione = posizioneMenuSalute(
      { x: event.clientX ?? 0, y: event.clientY ?? 0 },
      finestra,
      { width: menu.offsetWidth || 150, height: menu.offsetHeight || 32 }
    );
    menu.style.left = `${posizione.x}px`;
    menu.style.top = `${posizione.y}px`;

    setTimeout(() => {
      document.addEventListener("pointerdown", onOutside, true);
      document.addEventListener("keydown", onKey, true);
    }, 0);
  });
}

/** I quattro segni della Salute e la casella vuota, per il menù. */
function saluteMenuOptions() {
  return [...SALUTE_STATES.filter((state) => state), ""].map((state) => ({
    state,
    label: `WOD5E_MAGE.Salute.States.${state || "empty"}`,
    glyph: "wod5e-mage-salute-glyph"
  }));
}

export async function onSaluteCellChange(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;

  const salute = getSalute(actor);
  const index = Math.trunc(Number(target.dataset.index));
  const cell = salute.cells[index];
  if (!cell) return;

  // La casella del Sacrificio (29/9) non si tocca finché c'è il debito: il Narratore sì, per correggere.
  if (cell.debt && !game.user?.isGM) {
    ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.Debito.CellaBloccata"));
    return;
  }
  const toState = event.button === 2 ? "" : await askSegno(event, cell.state, saluteMenuOptions());
  if (toState === null || toState === cell.state) return;
  const next = applySaluteStateChange(salute, salute.max, cell.state, toState);
  // Una casella bloccata svuotata a mano: il blocco cade con lei (è solo visivo).
  const paradosso = cell.locked && !toState
    ? (cell.state === "pa" || cell.state === "ps" ? { ...salute.paradosso, p: salute.paradosso.p - 1 } : { ...salute.paradosso, m: salute.paradosso.m - 1 })
    : salute.paradosso;
  await actor.setFlag(MODULE_ID, "salute", { ...next, extra: salute.extra, paradosso: normalizeParadoxLocks(paradosso, next) });
}

/** La ricarica (Blue, 29/9): a ogni cambio scena +1 Quintessenza, che si accumula. */
export const RICARICA_SCENA = 1;

/**
 * Il mago sta nel Quadro del Narratore? Dal 30/9 (Blue) il Cambio scena del
 * Quadro dà il +1 ai suoi maghi: il tasto della scheda non lo ridà, così la
 * Quintessenza della scena arriva una volta sola.
 */
export function nelQuadro(actor) {
  if (!actor?.id) return false;
  try {
    const ids = game.settings?.get?.(MODULE_ID, MAGHI_SETTING)?.ids ?? [];
    return ids.map(String).includes(String(actor.id));
  } catch {
    return false;
  }
}

/**
 * Cambio Scena (verdetto di Blue, 11/9): sotto Nuova sessione, il tasto
 * sblocca una casella bloccata dall'Ustione e riarma la Convinzione; dal
 * 29/9 dà anche +1 Quintessenza, nelle caselle libere della Ruota. Il
 * debito del Sacrificio non si sblocca. Dal 30/9 ai maghi del Quadro il +1
 * lo dà il Cambio scena del Narratore (`nelQuadro`), e qui non si ridà.
 */
export async function onSaluteCambioScena(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const salute = getSalute(actor);
  const paradosso = locksAfterScene(salute.paradosso);
  const dalQuadro = nelQuadro(actor);
  const ricarica = dalQuadro ? null : addQuintessenceToBalance(getMagickBalance(actor), RICARICA_SCENA);
  const update = {
    [`flags.${MODULE_ID}.salute.paradosso`]: paradosso,
    [`flags.${MODULE_ID}.-=convinzioneScena`]: null,
    // I poteri «una volta per scena» tornano disponibili (24/9).
    [`flags.${MODULE_ID}.${POTERI_USI_FLAG}`]: riarmaUsi(actor.getFlag(MODULE_ID, POTERI_USI_FLAG) ?? {}, "scena")
  };
  if (ricarica) update[`flags.${MODULE_ID}.magickBalance`] = { quintessence: ricarica.quintessence, paradox: ricarica.paradox };
  await actor.update(update);
  const unlocked = salute.locked - (paradosso.p + paradosso.m);
  ui.notifications.info(unlocked > 0
    ? game.i18n.localize("WOD5E_MAGE.Salute.CambioScenaDone")
    : game.i18n.localize("WOD5E_MAGE.Salute.CambioScenaNone"));
  if (!ricarica) {
    ui.notifications.info(game.i18n.localize("WOD5E_MAGE.Salute.CambioScenaQuadro"));
    return;
  }
  ui.notifications.info(ricarica.gained > 0
    ? game.i18n.format("WOD5E_MAGE.Salute.CambioScenaQuintessenza", { points: ricarica.gained })
    : game.i18n.localize("WOD5E_MAGE.Salute.CambioScenaRuotaPiena"));
}

/**
 * Nuova sessione: i superficiali mentali guariscono tutti, un superficiale
 * fisico se ne va, e il Contraccolpo si può negare di nuovo. Il Riposo fa lo
 * stesso, ma le caselle in debito del Sacrificio (29/9) restano: `debito`.
 */
export function saluteAfterSession(counts, debito = {}) {
  const ps = count(counts?.ps);
  const ms = count(counts?.ms);
  const keepPs = Math.min(count(debito?.ps), ps);
  return {
    pa: count(counts?.pa),
    ps: Math.max(ps - 1, keepPs),
    ma: count(counts?.ma),
    ms: Math.min(count(debito?.ms), ms)
  };
}

/**
 * La Quintessenza a nuova sessione. Dal 25/9 (Blue) non si azzera più: si
 * accumula di sessione in sessione, e a sessione nuova rendono di nuovo i
 * Background (la casella «Quintessenza generata»). Dal 29/9 la sessione
 * nuova è anche un cambio scena: +1. I tre punti della prima sessione si
 * mettono a mano.
 */
export function quintessenceGained(generated) {
  return Math.max(Math.trunc(Number(String(generated ?? "").trim()) || 0), 0);
}

/** La Ruota a nuova sessione: quella che c'era, più i Background e la ricarica della scena, dentro le celle libere. */
export function balanceAfterSession(balance, generated, { scena = RICARICA_SCENA } = {}) {
  const paradox = Math.max(count(balance?.paradox), count(balance?.floor));
  const next = addQuintessenceToBalance({ quintessence: count(balance?.quintessence), paradox }, quintessenceGained(generated) + count(scena));
  return { quintessence: next.quintessence, paradox: count(balance?.paradox) };
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
    // Il debito del Sacrificio (29/9) finisce con la sessione: le caselle si
    // sbloccano e da qui si curano come le altre.
    [`flags.${MODULE_ID}.salute`]: { ...saluteAfterSession(salute), extra: salute.extra, paradosso: locksAfterScene(salute.paradosso), debito: { pa: 0, ps: 0, ma: 0, ms: 0 } },
    [`flags.${MODULE_ID}.contraccolpoNegato`]: false,
    // Nuova sessione, nuova scena: la Convinzione può rigenerare di nuovo (9/9).
    [`flags.${MODULE_ID}.-=convinzioneScena`]: null,
    // Sforzare la realtà (10/9 sera): la prima volta della sessione torna gratis.
    [`flags.${MODULE_ID}.-=sforziSessione`]: null,
    // I poteri «una volta per scena» e «per sessione» tornano disponibili (24/9).
    [`flags.${MODULE_ID}.${POTERI_USI_FLAG}`]: riarmaUsi(actor.getFlag(MODULE_ID, POTERI_USI_FLAG) ?? {}, "sessione")
  };

  // La Ruota (25/9 e 29/9): la Quintessenza resta, i Background rendono
  // («Quintessenza generata») e la scena nuova dà il suo punto.
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
  // Le caselle in debito del Sacrificio restano (29/9).
  await actor.setFlag(MODULE_ID, "salute", { ...saluteAfterSession(salute, salute.debito), extra: salute.extra });
  ui.notifications.info(game.i18n.localize("WOD5E_MAGE.Salute.RiposoDone"));
}

/**
 * Relax (verdetto di Blue, 4/9 notte): ogni successo cura un superficiale
 * mentale, ogni due successi un aggravato mentale; almeno una casella.
 * I superficiali prima, poi le coppie sugli aggravati.
 */
export function saluteAfterRelax(counts, successes, debito = {}) {
  // Le caselle in debito del Sacrificio (29/9) non si curano: il conto lavora sulle altre.
  const keepMa = Math.min(count(debito?.ma), count(counts?.ma));
  const keepMs = Math.min(count(debito?.ms), count(counts?.ms));
  const out = { pa: count(counts?.pa), ps: count(counts?.ps), ma: count(counts?.ma) - keepMa, ms: count(counts?.ms) - keepMs };
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
  out.ma += keepMa;
  out.ms += keepMs;
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
  const after = saluteAfterRelax(salute, successes, salute.debito);
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
  await actor.setFlag(MODULE_ID, "salute", { pa: 0, ps: 0, ma: 0, ms: 0, extra: salute.extra, paradosso: { p: 0, m: 0 }, debito: { pa: 0, ps: 0, ma: 0, ms: 0 } });
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
 * mentale (paradossale, bloccato in rosso: Blue, 11/9), il Contraccolpo non
 * scatta e la Ruota sale di 3. Se i tre punti
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

  // L'aggravato mentale è paradossale (Blue, 11/9): la casella resta
  // bloccata in rosso finché non passa la scena, come l'Ustione bruciata.
  const paradosso = normalizeParadoxLocks({ p: salute.paradosso.p, m: salute.paradosso.m + 1 }, wounded);
  await actor.update({
    [`flags.${MODULE_ID}.salute`]: { ...wounded, extra: salute.extra, paradosso },
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

