import { MODULE_ID } from "./constants.js";

/**
 * Gli Elementi oltre l'inventario: Background, Vantaggi e Difetti che non
 * stanno sui punti del personaggio — quelli IN COMUNE con altri giocatori e
 * quelli DI STORIA, ottenuti (o subiti) in gioco, anche temporanei.
 * Righe libere nei flag del modulo, col livello a pallini come ogni tratto.
 */
export const BELONGING_TABLES = Object.freeze({
  shared: "sharedBelongings",
  story: "storyBelongings"
});

export const BELONGING_KINDS = Object.freeze(["background", "advantage", "flaw"]);

function readRows(actor, flagKey, localize) {
  const stored = actor.getFlag(MODULE_ID, flagKey) ?? {};

  return Object.entries(stored).map(([id, row]) => {
    const kind = String(row?.kind ?? "");
    const value = Math.trunc(Number(row?.value));
    return {
      id,
      kind,
      name: String(row?.name ?? ""),
      value: Number.isFinite(value) ? Math.min(Math.max(value, 0), 5) : 0,
      kinds: BELONGING_KINDS.map((kindId) => ({
        id: kindId,
        label: localize(`WOD5E_MAGE.Belongings.Kinds.${kindId}`),
        selected: kindId === kind
      }))
    };
  });
}

export function prepareBelongings(actor) {
  const localize = globalThis.game?.i18n?.localize?.bind(globalThis.game.i18n)
    ?? ((key) => key);

  return {
    shared: readRows(actor, BELONGING_TABLES.shared, localize),
    story: readRows(actor, BELONGING_TABLES.story, localize)
  };
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
  return Object.values(BELONGING_TABLES).includes(table) ? table : null;
}

export async function onBelongingAdd(event, target) {
  event.preventDefault();

  const actor = this.actor;
  const flagKey = tableFlag(target);
  if (!flagKey || !canEdit(actor)) return;

  const rows = { ...(actor.getFlag(MODULE_ID, flagKey) ?? {}) };
  let rowId = foundry.utils.randomID();
  while (rows[rowId]) rowId = foundry.utils.randomID();

  rows[rowId] = { kind: "", name: "", value: 0 };

  await actor.setFlag(MODULE_ID, flagKey, rows);
}

export async function onBelongingDelete(event, target) {
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
