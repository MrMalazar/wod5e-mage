import { MODULE_ID } from "./constants.js";

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

export function prepareAnchors(actor) {
  const stored = actor.getFlag(MODULE_ID, PERSONAGGIO_TABLES.anchors) ?? {};

  return Object.entries(stored).map(([id, row]) => ({
    id,
    name: String(row?.name ?? ""),
    description: String(row?.description ?? "")
  }));
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
      groups: CONVICTION_GROUPS.map((groupId) => ({
        id: groupId,
        label: localize(`WOD5E_MAGE.Personaggio.ConvictionGroups.${groupId}`),
        selected: groupId === group
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
    ? { name: "", description: "" }
    : { group: "", text: "" };

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
