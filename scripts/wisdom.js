import { MODULE_ID } from "./constants.js";
import { dressNextRollDialogAsMage, isMageActor } from "./mage-dice.js";
import { askSegno } from "./salute.js";

/**
 * La fila della Saggezza (LIBRO 04_92: «Saggezza = 3 + il più alto fra
 * Carisma e Fermezza», e la fila si allunga e si accorcia mentre giochi;
 * 04_102: le sbarre se ne vanno una alla volta scegliendo quando costa, le
 * croci le toglie solo lo Spirito). Dal 23/9 (Blue: «una possibilità
 * equivalente alla Salute») la fila ha la formula come la Salute, le caselle
 * in più col meno e il più, il clic sulla casella apre il menù dei segni
 * (sbarra, croce, vuota) e la ruota a sei: Tira, Segna, Cura, Reset, meno,
 * più. I segni sono macchie d'inchiostro: la sbarra è una goccia che macchia
 * mezza casella, la croce la casella tutta d'inchiostro (CSS).
 *
 * Nella bandiera `wisdom`: `superficial` (le sbarre), `aggravated` (le
 * croci), `extra` (le caselle in più, anche negative). Il vecchio `max`
 * scritto a mano (fino alla 1.1.0) si converte in `extra` al primo
 * passaggio, così nessuna fila cambia lunghezza da sola.
 */

export const WISDOM_BASE = 3;

/** I segni della fila: vuota, sbarra (superficiale), croce (aggravato). */
export const WISDOM_STATES = Object.freeze(["", "s", "a"]);

const DEFAULT_WISDOM = Object.freeze({ superficial: 0, aggravated: 0, extra: 0 });

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

function attributeValue(actor, id) {
  return count(actor?.system?.attributes?.[id]?.value);
}

/** I due Attributi fra cui si sceglie (Blue, 23/9: «sia il giocatore a sceglierlo»). */
export const WISDOM_ATTRIBUTES = Object.freeze(["charisma", "resolve"]);

/**
 * L'Attributo della formula: quello scelto dal giocatore se c'è, altrimenti
 * il più alto fra Carisma e Fermezza (a parità, il Carisma).
 */
export function wisdomAttribute(actor, chosen = "") {
  if (WISDOM_ATTRIBUTES.includes(chosen)) return chosen;
  return attributeValue(actor, "resolve") > attributeValue(actor, "charisma") ? "resolve" : "charisma";
}

/** La formula del LIBRO: 3 + il più alto fra Carisma e Fermezza (o quello scelto). */
export function wisdomBase(actor, chosen = "") {
  return WISDOM_BASE + attributeValue(actor, wisdomAttribute(actor, chosen));
}

/** Le caselle: base più le caselle in più, mai sotto uno. */
export function wisdomMax(base, extra = 0) {
  return Math.max(count(base) + Math.trunc(Number(extra) || 0), 1);
}

/**
 * Le caselle in più dalla bandiera: `extra` se c'è; altrimenti il vecchio
 * `max` scritto a mano meno la formula (la fila resta lunga com'era).
 */
export function wisdomExtra(stored, base) {
  const extra = Number(stored?.extra);
  if (Number.isFinite(extra)) return Math.trunc(extra);
  const max = Number(stored?.max);
  if (Number.isFinite(max) && max > 0) return Math.trunc(max) - count(base);
  return DEFAULT_WISDOM.extra;
}

/** I conti dentro la fila: prima le croci, poi le sbarre; il resto è vuoto. */
export function clampWisdom(counts, max) {
  const aggravated = Math.min(count(counts?.aggravated), count(max));
  const superficial = Math.min(count(counts?.superficial), Math.max(count(max) - aggravated, 0));
  return { superficial, aggravated };
}

/** Le caselle da disegnare: croci, poi sbarre, poi vuote. */
export function paintWisdom(counts, max) {
  const { superficial, aggravated } = clampWisdom(counts, max);
  const cells = [];
  for (let index = 0; index < count(max); index += 1) {
    const state = index < aggravated ? "a" : (index < aggravated + superficial ? "s" : "");
    cells.push({ index, state, label: `WOD5E_MAGE.Wisdom.States.${state || "empty"}` });
  }
  return cells;
}

export function getWisdom(actor) {
  const stored = actor.getFlag(MODULE_ID, "wisdom") ?? {};
  const chosen = WISDOM_ATTRIBUTES.includes(stored.attribute) ? stored.attribute : "";
  const attribute = wisdomAttribute(actor, chosen);
  const base = wisdomBase(actor, chosen);
  const extra = wisdomExtra(stored, base);
  const max = wisdomMax(base, extra);
  const { superficial, aggravated } = clampWisdom(stored, max);

  // La fila piena ha un nome (04_95): da lì scattano i quattro effetti.
  const segnato = max > 0 && superficial + aggravated >= max;

  return {
    max,
    base,
    extra,
    attribute,
    // La chiave di lingua del sistema: WOD5E.AttributesList.Charisma / Resolve.
    attributeLabel: `${attribute[0].toUpperCase()}${attribute.slice(1)}`,
    chosen,
    attributeValue: attributeValue(actor, attribute),
    choices: WISDOM_ATTRIBUTES.map((id) => ({ id, value: attributeValue(actor, id), selected: id === attribute })),
    superficial,
    aggravated,
    segnato,
    cells: paintWisdom({ superficial, aggravated }, max)
  };
}

/** Il cambio di una casella: da un segno a un altro, senza uscire dalla fila. */
export function applyWisdomStateChange(counts, max, fromState, toState) {
  const next = { superficial: count(counts?.superficial), aggravated: count(counts?.aggravated) };
  const key = (state) => (state === "s" ? "superficial" : state === "a" ? "aggravated" : null);
  const from = key(fromState);
  const to = key(toState);
  if (from && next[from] > 0) next[from] -= 1;
  if (to) next[to] += 1;
  return clampWisdom(next, max);
}

/**
 * Segna macchie (23/9, come i Danni subiti della Salute): quante e di che
 * segno. Se la fila è piena, ogni sbarra in più fa diventare croce una
 * sbarra che c'era (il tracciato non si allunga da solo); torna quante ne
 * ha convertite.
 */
export function wisdomWithStains(counts, max, { state = "s", amount = 0 } = {}) {
  const next = { superficial: count(counts?.superficial), aggravated: count(counts?.aggravated) };
  let hit = count(amount);
  let converted = 0;
  const room = () => Math.max(count(max) - next.superficial - next.aggravated, 0);
  if (state === "a") {
    const taken = Math.min(hit, room());
    next.aggravated += taken;
    hit -= taken;
    // Le croci oltre la fila prendono il posto delle sbarre.
    while (hit > 0 && next.superficial > 0) {
      next.superficial -= 1;
      next.aggravated += 1;
      hit -= 1;
      converted += 1;
    }
  } else {
    const taken = Math.min(hit, room());
    next.superficial += taken;
    hit -= taken;
    while (hit > 0 && next.superficial > 0) {
      next.superficial -= 1;
      next.aggravated += 1;
      hit -= 1;
      converted += 1;
    }
  }
  return { counts: clampWisdom(next, max), converted };
}

/** Cura (04_102): una sbarra alla volta se ne va; le croci restano allo Spirito. */
export function wisdomAfterCure(counts, max) {
  const next = { superficial: count(counts?.superficial), aggravated: count(counts?.aggravated) };
  if (next.superficial > 0) next.superficial -= 1;
  return clampWisdom(next, max);
}

/** Il segno scelto nella finestra delle macchie: sbarra o croce, e quante. */
export function normalizeStainChoice(result = {}) {
  const state = result.state === "a" ? "a" : (result.state === "s" ? "s" : "");
  const amount = Math.max(Math.trunc(Number(result.amount) || 0), 0);
  return { state, amount };
}

function canEdit(actor) {
  if (!actor.isOwner) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.NoSufficientPermission", { string: actor.name })
    );
    return false;
  }
  if (actor.system.locked) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.CannotModifyResourceString", { string: actor.name })
    );
    return false;
  }
  return true;
}

async function saveWisdom(actor, wisdom, counts) {
  await actor.setFlag(MODULE_ID, "wisdom", { superficial: counts.superficial, aggravated: counts.aggravated, extra: wisdom.extra, attribute: wisdom.chosen, "-=max": null });
}

/**
 * La scelta fra Carisma e Fermezza (23/9): il clic sul numero delle caselle
 * apre un menù coi due Attributi e il loro valore; quello scelto resta
 * scritto (`wisdom.attribute`) finché non lo si cambia.
 */
export async function onWisdomAttributePick(event, _target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const wisdom = getWisdom(actor);
  const localize = game.i18n.localize.bind(game.i18n);
  const options = wisdom.choices.map((choice) => ({
    state: choice.id,
    text: `${localize(`WOD5E.AttributesList.${choice.id[0].toUpperCase()}${choice.id.slice(1)}`)} ${choice.value}`,
    glyph: null
  }));
  const picked = await askSegno(event, wisdom.attribute, options);
  if (picked === null || picked === wisdom.chosen) return;
  const base = wisdomBase(actor, picked);
  const max = wisdomMax(base, wisdom.extra);
  await actor.setFlag(MODULE_ID, "wisdom", { ...clampWisdom(wisdom, max), extra: wisdom.extra, attribute: picked, "-=max": null });
}

/** Il meno e il più della ruota: le caselle in più, oltre la formula. */
export async function onWisdomResourceChange(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;

  const wisdom = getWisdom(actor);
  const delta = target.dataset.resourceAction === "plus" ? 1 : (target.dataset.resourceAction === "minus" ? -1 : 0);
  const extra = wisdom.extra + delta;
  const max = wisdomMax(wisdom.base, extra);
  await actor.setFlag(MODULE_ID, "wisdom", { ...clampWisdom(wisdom, max), extra, attribute: wisdom.chosen, "-=max": null });
}

/**
 * Il clic sulla casella apre il menù dei segni (sbarra, croce, vuota), come
 * la Salute; il clic destro svuota. La casella che cambia riceve la goccia
 * (`sheet._inchiostroCade`): il render la fa cadere.
 */
export async function onWisdomCellChange(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;

  const wisdom = getWisdom(actor);
  const index = Math.trunc(Number(target.dataset.index));
  const cell = wisdom.cells[index];
  if (!cell) return;

  const options = WISDOM_STATES.filter((state) => state).map((state) => ({ state, label: `WOD5E_MAGE.Wisdom.States.${state}`, glyph: "wod5e-mage-inchiostro-glyph" }));
  options.push({ state: "", label: "WOD5E_MAGE.Wisdom.States.empty", glyph: "wod5e-mage-inchiostro-glyph" });
  const toState = event.button === 2 ? "" : await askSegno(event, cell.state, options);
  if (toState === null || toState === cell.state) return;
  if (toState) this._inchiostroCade = { index, state: toState };
  await saveWisdom(actor, wisdom, applyWisdomStateChange(wisdom, wisdom.max, cell.state, toState));
}

/** Segna le macchie: la finestra chiede quante e di che segno. */
export async function onWisdomSegna(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;

  const localize = game.i18n.localize.bind(game.i18n);
  const signs = WISDOM_STATES.filter((state) => state).map((state) => ({ state, label: `WOD5E_MAGE.Wisdom.States.${state}` }));
  const content = await foundry.applications.handlebars.renderTemplate(
    "modules/wod5e-mage/templates/dialogs/saggezza-macchie.hbs",
    { signs, chosen: "s" }
  );
  let result = null;
  try {
    result = await foundry.applications.api.DialogV2.input({
      window: { title: localize("WOD5E_MAGE.Wisdom.Segna") },
      content,
      ok: { icon: "fa-solid fa-droplet", label: localize("WOD5E_MAGE.Wisdom.SegnaOk") },
      buttons: [{ action: "cancel", icon: "fas fa-times", label: localize("WOD5E.Cancel") }],
      classes: ["wod5e", "wod5e-mage", "mage", actor.system.gamesystem, "wod5e-mage-roll-dialog"],
      position: { width: 380, height: "auto" },
      render: (_event, dialog) => wireStainSigns(dialog)
    });
  } catch (_error) {
    return;
  }
  if (!result || result === "cancel") return;

  const { state, amount } = normalizeStainChoice(result);
  if (!state || amount <= 0) return;
  const wisdom = getWisdom(actor);
  const { counts, converted } = wisdomWithStains(wisdom, wisdom.max, { state, amount });
  // La goccia cade sull'ultima casella segnata.
  const marked = counts.superficial + counts.aggravated;
  if (marked > 0) this._inchiostroCade = { index: marked - 1, state: wisdom.cells[marked - 1]?.state ? state : state };
  await saveWisdom(actor, wisdom, counts);
  const parts = [game.i18n.format("WOD5E_MAGE.Wisdom.SegnaDone", { amount, sign: localize(`WOD5E_MAGE.Wisdom.States.${state}`) })];
  if (converted > 0) parts.push(game.i18n.format("WOD5E_MAGE.Wisdom.SegnaConverted", { converted }));
  if (getWisdom(actor).segnato) parts.push(`${localize("WOD5E_MAGE.Wisdom.Segnato")}: ${localize("WOD5E_MAGE.Wisdom.SegnatoEffects")}`);
  ui.notifications.info(parts.join(" "));
}

/** I due segni nella finestra delle macchie: un clic sceglie, il campo nascosto lo porta. */
function wireStainSigns(dialog) {
  const root = dialog?.element;
  const input = root?.querySelector("input[name=state]");
  const buttons = [...(root?.querySelectorAll("[data-role=macchiaSign]") ?? [])];
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

/** Cura: una sbarra se ne va (le croci le toglie lo Spirito). */
export async function onWisdomCura(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const wisdom = getWisdom(actor);
  if (wisdom.superficial <= 0) {
    ui.notifications.info(game.i18n.localize("WOD5E_MAGE.Wisdom.CuraNiente"));
    return;
  }
  await saveWisdom(actor, wisdom, wisdomAfterCure(wisdom, wisdom.max));
  ui.notifications.info(game.i18n.localize("WOD5E_MAGE.Wisdom.CuraDone"));
}

/** Reset: la fila torna pulita. */
export async function onWisdomReset(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const wisdom = getWisdom(actor);
  await saveWisdom(actor, wisdom, { superficial: 0, aggravated: 0 });
}

/** Il tiro di Saggezza: le caselle pulite, almeno un dado. */
export function wisdomDicePool(wisdom) {
  return Math.max(count(wisdom?.max) - count(wisdom?.aggravated) - count(wisdom?.superficial), 1);
}

export async function onWisdomRoll(event) {
  event.preventDefault();

  const actor = this.actor;
  const wisdom = getWisdom(actor);
  const dicePool = wisdomDicePool(wisdom);

  if (isMageActor(actor)) dressNextRollDialogAsMage();

  await WOD5E.api.Roll({
    basicDice: dicePool,
    title: game.i18n.localize("WOD5E_MAGE.Wisdom.Rolling"),
    selectors: ["wisdom"],
    actor,
    data: actor.system,
    quickRoll: false,
    disableAdvancedDice: true
  });
}

/**
 * La goccia che cade (23/9): dopo il render, la casella appena segnata porta
 * la classe `cade` e il CSS fa cadere la goccia e allargare la macchia. Il
 * ricordo si consuma: al render dopo non cade più niente.
 */
export function faiCadereInchiostro(sheet) {
  const goccia = sheet?._inchiostroCade;
  if (!goccia) return;
  sheet._inchiostroCade = null;
  for (const cell of sheet.element?.querySelectorAll?.(`.wod5e-mage-inchiostro-cella[data-index="${goccia.index}"]`) ?? []) {
    cell.classList.remove("cade");
    // Un riflusso fra togliere e rimettere: l'animazione riparte anche se la classe c'era.
    void cell.offsetWidth;
    cell.classList.add("cade");
  }
}
