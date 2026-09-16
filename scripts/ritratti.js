/**
 * I ritratti (16/9): più immagini per lo stesso personaggio, e un'icona
 * nello slot dell'immagine che le fa girare. Il ritratto che si vede è
 * anche l'immagine dell'attore, del suo token prototipo e quindi della
 * chat. La lista sta nella bandiera `ritratti`: { list: [...], index }.
 * Le funzioni sui dati sono pure; i tasti stanno in fondo.
 */
import { MODULE_ID } from "./constants.js";

export const RITRATTI_FLAG = "ritratti";

function clean(list) {
  return [...new Set((Array.isArray(list) ? list : []).map((path) => String(path ?? "").trim()).filter(Boolean))];
}

/**
 * La lista e l'indice come stanno, con l'immagine dell'attore sempre
 * dentro: se non c'è, è il primo ritratto.
 */
export function prepareRitratti(stored, currentImg = "") {
  const list = clean(stored?.list);
  const img = String(currentImg ?? "").trim();
  if (img && !list.includes(img)) list.unshift(img);
  const index = Math.min(Math.max(Math.trunc(Number(stored?.index) || 0), 0), Math.max(list.length - 1, 0));
  const shown = list.indexOf(img);
  return {
    list,
    index: shown >= 0 ? shown : index,
    count: list.length,
    position: (shown >= 0 ? shown : index) + 1,
    many: list.length > 1
  };
}

/** Il ritratto dopo quello che si vede; dall'ultimo si torna al primo. */
export function nextRitratto(ritratti) {
  if (!ritratti?.list?.length) return { list: [], index: 0, img: "" };
  const index = (ritratti.index + 1) % ritratti.list.length;
  return { list: ritratti.list, index, img: ritratti.list[index] };
}

/** Un ritratto in più, che diventa quello che si vede. */
export function addRitratto(ritratti, path) {
  const img = String(path ?? "").trim();
  const list = clean([...(ritratti?.list ?? []), img]);
  const index = Math.max(list.indexOf(img), 0);
  return { list, index, img: list[index] ?? "" };
}

/** Via il ritratto che si vede; resta il precedente (o il primo). Mai sotto uno. */
export function removeRitratto(ritratti) {
  const list = [...(ritratti?.list ?? [])];
  if (list.length <= 1) return { list, index: 0, img: list[0] ?? "" };
  list.splice(ritratti.index, 1);
  const index = Math.min(Math.max(ritratti.index - 1, 0), list.length - 1);
  return { list, index, img: list[index] };
}

/** L'aggiornamento dell'attore: la bandiera, l'immagine, il token prototipo. */
export function ritrattoUpdate(next) {
  const update = { [`flags.${MODULE_ID}.${RITRATTI_FLAG}`]: { list: next.list, index: next.index } };
  if (next.img) {
    update.img = next.img;
    update["prototypeToken.texture.src"] = next.img;
  }
  return update;
}

function ritrattiOf(actor) {
  return prepareRitratti(actor.getFlag(MODULE_ID, RITRATTI_FLAG), actor.img);
}

export async function onRitrattoNext(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!actor.isOwner) return;
  await actor.update(ritrattoUpdate(nextRitratto(ritrattiOf(actor))));
}

export async function onRitrattoAdd(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!actor.isOwner || actor.system.locked) return;
  const FilePicker = foundry.applications.apps.FilePicker.implementation;
  const picker = new FilePicker({
    type: "image",
    current: actor.img,
    callback: async (path) => {
      await actor.update(ritrattoUpdate(addRitratto(ritrattiOf(actor), path)));
    }
  });
  return picker.browse();
}

export async function onRitrattoRemove(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!actor.isOwner || actor.system.locked) return;
  await actor.update(ritrattoUpdate(removeRitratto(ritrattiOf(actor))));
}
