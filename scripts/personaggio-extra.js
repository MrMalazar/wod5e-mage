import { MODULE_ID } from "./constants.js";
import { FOCUS_CREDOS } from "./focus.js";
import { CAMPI_ANCORA, completaAncora, generaAncora, opzioniRuolo } from "./generatore-ancore.js";

/**
 * La pagina Personaggio oltre i campi del sistema: le ANCORE e le
 * CONVINZIONI, a slot liberi col più e il meno (di norma tre e tre), e la
 * Convinzione dichiara il macro gruppo del catalogo a cui è legata.
 */
export const PERSONAGGIO_TABLES = Object.freeze({
  anchors: "ancore",
  convictions: "convinzioni"
});

/** I sette gruppi del catalogo delle Convinzioni (08, blocco H). */
export const CONVICTION_GROUPS = Object.freeze([
  "morte",
  "verita",
  "lealta",
  "liberta",
  "giustizia",
  "ordine",
  "natura"
]);

/** Una riga vuota di Ancora: le sette righe della Bussola rifatta (25/9), più le note. */
export function ancoraVuota() {
  const row = { description: "" };
  for (const campo of CAMPI_ANCORA) row[campo] = "";
  return row;
}

/** Le Convinzioni del personaggio come opzioni: per legare ogni Ancora a una di esse. */
export function convictionOptions(actor, selected = "") {
  const stored = actor?.getFlag?.(MODULE_ID, PERSONAGGIO_TABLES.convictions) ?? {};
  return Object.entries(stored)
    .map(([id, row]) => ({ id, text: String(row?.text ?? "").trim(), selected: id === selected }))
    .filter((option) => option.text);
}

/**
 * Le Ancore della scheda: nome, ruolo, mestiere, età, cosa ti dà, la
 * Convinzione legata (l'id di una riga delle Convinzioni), cosa non sa, dove
 * morde; `description` sono le note (e il vecchio campo «perché conta»).
 */
export function prepareAnchors(actor) {
  const stored = actor.getFlag(MODULE_ID, PERSONAGGIO_TABLES.anchors) ?? {};

  return Object.entries(stored).map(([id, row]) => {
    const conviction = String(row?.conviction ?? "");
    const convictions = convictionOptions(actor, conviction);
    return {
      id,
      name: String(row?.name ?? ""),
      role: String(row?.role ?? ""),
      job: String(row?.job ?? ""),
      age: String(row?.age ?? ""),
      gives: String(row?.gives ?? ""),
      conviction,
      convictionText: convictions.find((option) => option.selected)?.text ?? "",
      unknown: String(row?.unknown ?? ""),
      bites: String(row?.bites ?? ""),
      description: String(row?.description ?? ""),
      roles: opzioniRuolo(String(row?.role ?? "")),
      convictions
    };
  });
}

/** Cosa mostra la carta dell'Ancora quando ha poco: il nome, o il ruolo, o il mestiere. */
export function anchorLabel(row) {
  return [row?.name, row?.role, row?.job].map((v) => String(v ?? "").trim()).find(Boolean) ?? "";
}

export function prepareConvictions(actor) {
  const stored = actor.getFlag(MODULE_ID, PERSONAGGIO_TABLES.convictions) ?? {};
  const localize = globalThis.game?.i18n?.localize?.bind(globalThis.game.i18n)
    ?? ((key) => key);

  return Object.entries(stored).map(([id, row]) => {
    const group = String(row?.group ?? "");
    return {
      id,
      group,
      text: String(row?.text ?? ""),
      // I due momenti (verdetto di Blue, 4/9 notte): quando la servi, quando la attraversi.
      serve: String(row?.serve ?? ""),
      cross: String(row?.cross ?? ""),
      groups: CONVICTION_GROUPS.map((groupId) => ({
        id: groupId,
        label: localize(`WOD5E_MAGE.Personaggio.ConvictionGroups.${groupId}`),
        selected: groupId === group
      })),
      // Le Convinzioni di un Credo stanno sotto il Credo, non sotto un gruppo del catalogo.
      credos: FOCUS_CREDOS.map((credoId) => ({
        id: credoId,
        label: localize(`WOD5E_MAGE.Focus.Credos.${credoId}`),
        selected: credoId === group
      }))
    };
  });
}

function canEdit(actor) {
  if (!actor.isOwner) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.NoSufficientPermission", {
        string: actor.name
      })
    );
    return false;
  }

  if (actor.system.locked) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.CannotModifyResourceString", {
        string: actor.name
      })
    );
    return false;
  }

  return true;
}

function tableFlag(target) {
  const table = target.dataset.table;
  return Object.values(PERSONAGGIO_TABLES).includes(table) ? table : null;
}

export async function onPersonaggioRowAdd(event, target) {
  event.preventDefault();

  const actor = this.actor;
  const flagKey = tableFlag(target);
  if (!flagKey || !canEdit(actor)) return;

  const rows = { ...(actor.getFlag(MODULE_ID, flagKey) ?? {}) };
  let rowId = foundry.utils.randomID();
  while (rows[rowId]) rowId = foundry.utils.randomID();

  rows[rowId] = flagKey === PERSONAGGIO_TABLES.anchors
    ? ancoraVuota()
    : { group: "", text: "", serve: "", cross: "" };

  await actor.setFlag(MODULE_ID, flagKey, rows);
}

/**
 * Il tasto Genera (25/9): su una riga riempie solo i campi vuoti (chi vuole
 * ritirarne uno lo svuota e preme di nuovo); senza riga ne crea una nuova
 * tutta tirata. La Convinzione resta al giocatore.
 */
export async function onAncoraGenera(event, target) {
  event.preventDefault();

  const actor = this.actor;
  if (!canEdit(actor)) return;

  const flagKey = PERSONAGGIO_TABLES.anchors;
  const rows = { ...(actor.getFlag(MODULE_ID, flagKey) ?? {}) };
  const rowId = String(target?.dataset?.row ?? "");
  const sesso = String(target?.dataset?.sesso ?? "");
  if (rowId && Object.hasOwn(rows, rowId)) {
    rows[rowId] = completaAncora(rows[rowId], { sesso });
  } else {
    let newId = foundry.utils.randomID();
    while (rows[newId]) newId = foundry.utils.randomID();
    rows[newId] = generaAncora({ sesso });
  }
  await actor.setFlag(MODULE_ID, flagKey, rows);
}

export async function onPersonaggioRowDelete(event, target) {
  event.preventDefault();

  const actor = this.actor;
  const flagKey = tableFlag(target);
  if (!flagKey || !canEdit(actor)) return;

  const rowId = target.dataset.row;
  const rows = { ...(actor.getFlag(MODULE_ID, flagKey) ?? {}) };
  if (!Object.hasOwn(rows, rowId)) return;

  // La sintassi -= di Foundry toglie la riga senza rifondere le altre.
  await actor.update({
    [`flags.${MODULE_ID}.${flagKey}.-=${rowId}`]: null
  });
}
