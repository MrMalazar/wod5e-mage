import { MODULE_ID } from "./constants.js";

/**
 * La pagina Note (verdetto di Blue, 4/9 notte): una pagina vuota dove il
 * giocatore aggiunge riquadri a piacere, col + e il meno. Ogni riquadro ha
 * un titolo corto e un testo lungo. Vive nel flag `note`.
 */
export const NOTE_FLAG = "note";

/** Misure di un riquadro nuovo e passo della cascata (6/9). */
export const NOTE_DEFAULT = Object.freeze({ w: 320, h: 200, step: 24, minW: 180, minH: 110 });

/**
 * La lavagna (6/9): ogni riquadro ha la sua posizione e la sua misura
 * (x, y, w, h in px) e il giocatore lo trascina dalla presa e lo ridimensiona
 * dall'angolo. Chi non ha ancora una posizione si mette in cascata.
 */
export function prepareNote(actor) {
  const stored = actor.getFlag(MODULE_ID, NOTE_FLAG) ?? {};
  const rows = Object.entries(stored)
    .map(([id, row]) => ({
      id,
      title: String(row?.title ?? ""),
      text: String(row?.text ?? ""),
      sort: Number(row?.sort) || 0,
      x: Number.isFinite(Number(row?.x)) ? Math.max(0, Number(row.x)) : null,
      y: Number.isFinite(Number(row?.y)) ? Math.max(0, Number(row.y)) : null,
      w: Math.max(NOTE_DEFAULT.minW, Number(row?.w) || NOTE_DEFAULT.w),
      h: Math.max(NOTE_DEFAULT.minH, Number(row?.h) || NOTE_DEFAULT.h)
    }))
    .sort((a, b) => a.sort - b.sort);
  rows.forEach((row, index) => {
    if (row.x === null) row.x = NOTE_DEFAULT.step * index;
    if (row.y === null) row.y = NOTE_DEFAULT.step * index;
  });
  return rows;
}

/** L'altezza della lavagna: il riquadro più in basso, più un margine. */
export function noteBoardHeight(rows) {
  return Math.max(240, ...rows.map((row) => row.y + row.h + 40));
}

/**
 * Cabla la lavagna dopo il render: la presa trascina, l'angolo ridimensiona;
 * a mano alzata la posizione e la misura si salvano sul personaggio.
 */
export function bindNoteBoard(sheet) {
  const board = sheet.element?.querySelector(".wod5e-mage-note-board");
  if (!board || board.dataset.locked === "true") return;
  for (const block of board.querySelectorAll(".wod5e-mage-note-block[data-row]")) {
    const grip = block.querySelector(".wod5e-mage-note-grip");
    const corner = block.querySelector(".wod5e-mage-note-resize");
    const start = (mode) => (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      const rect = { x: block.offsetLeft, y: block.offsetTop, w: block.offsetWidth, h: block.offsetHeight };
      const origin = { x: event.clientX, y: event.clientY };
      block.classList.add("dragging");
      const move = (ev) => {
        const dx = ev.clientX - origin.x;
        const dy = ev.clientY - origin.y;
        if (mode === "move") {
          block.style.left = `${Math.max(0, rect.x + dx)}px`;
          block.style.top = `${Math.max(0, rect.y + dy)}px`;
        } else {
          block.style.width = `${Math.max(NOTE_DEFAULT.minW, rect.w + dx)}px`;
          block.style.height = `${Math.max(NOTE_DEFAULT.minH, rect.h + dy)}px`;
        }
      };
      const up = async () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        block.classList.remove("dragging");
        const key = `flags.${MODULE_ID}.${NOTE_FLAG}.${block.dataset.row}`;
        await sheet.actor.update({
          [`${key}.x`]: Math.round(block.offsetLeft),
          [`${key}.y`]: Math.round(block.offsetTop),
          [`${key}.w`]: Math.round(block.offsetWidth),
          [`${key}.h`]: Math.round(block.offsetHeight)
        });
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    };
    grip?.addEventListener("pointerdown", start("move"));
    corner?.addEventListener("pointerdown", start("resize"));
  }
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

/** Il +: un riquadro nuovo, in cascata. */
export async function onNoteAdd(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const rows = actor.getFlag(MODULE_ID, NOTE_FLAG) ?? {};
  let id = foundry.utils.randomID();
  while (rows[id]) id = foundry.utils.randomID();
  const sort = Math.max(0, ...Object.values(rows).map((row) => Number(row?.sort) || 0)) + 10;
  // In cascata: un passo più in basso e a destra dell'ultimo riquadro.
  const count = Object.keys(rows).length;
  const offset = NOTE_DEFAULT.step * count;
  await actor.update({ [`flags.${MODULE_ID}.${NOTE_FLAG}.${id}`]: { title: "", text: "", sort, x: offset, y: offset, w: NOTE_DEFAULT.w, h: NOTE_DEFAULT.h } });
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
