import { MODULE_ID } from "./constants.js";

/**
 * La pagina Note (verdetto di Blue, 4/9 notte): una pagina vuota dove il
 * giocatore aggiunge riquadri a piacere, col + e il meno. Ogni riquadro ha
 * un titolo corto e un testo lungo. Vive nel flag `note`.
 */
export const NOTE_FLAG = "note";

export function prepareNote(actor) {
  const stored = actor.getFlag(MODULE_ID, NOTE_FLAG) ?? {};
  return Object.entries(stored)
    .map(([id, row]) => ({
      id,
      title: String(row?.title ?? ""),
      text: String(row?.text ?? ""),
      sort: Number(row?.sort) || 0
    }))
    .sort((a, b) => a.sort - b.sort);
}

function canEdit(actor) {
  if (!actor.isOwner) {
    ui.notifications.warn(game.i18n.format("WOD5E.Notifications.NoSufficientPermission", { string: actor.name }));
    return false;
  }
  if (actor.system.locked) {
    ui.notifications.warn(game.i18n.format("WOD5E.Notifications.CannotModifyResourceString", { string: actor.name }));
    return false;
  }
  return true;
}

/** Il +: un riquadro nuovo in fondo. */
export async function onNoteAdd(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const rows = actor.getFlag(MODULE_ID, NOTE_FLAG) ?? {};
  let id = foundry.utils.randomID();
  while (rows[id]) id = foundry.utils.randomID();
  const sort = Math.max(0, ...Object.values(rows).map((row) => Number(row?.sort) || 0)) + 10;
  await actor.update({ [`flags.${MODULE_ID}.${NOTE_FLAG}.${id}`]: { title: "", text: "", sort } });
}

/** Il meno: via il riquadro. */
export async function onNoteDelete(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const id = target.dataset.row;
  if (!id) return;
  await actor.update({ [`flags.${MODULE_ID}.${NOTE_FLAG}.-=${id}`]: null });
}
