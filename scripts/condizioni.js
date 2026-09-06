import { CONDIZIONI } from "./data/condizioni.js";
import { MODULE_ID } from "./constants.js";

/**
 * Le Condizioni di M6 sulla scheda (compromesso di Blue, 4/9 notte): sopra
 * la striscia dei simboli accesi, sotto una tendina con tutte le venticinque
 * divise per gruppo; un clic accende, un altro spegne, e il simbolo acceso
 * resta sopra anche a tendina chiusa. Accesa, la Condizione è un oggetto
 * «condition» del sistema addosso al personaggio, così i dadi che toglie
 * entrano nel tiro da soli. Le Condizioni fuori lista arrivano dalla lente.
 */

export const CONDIZIONE_FLAG = "condizione";

/** L'ordine dei gruppi, com'è nella bozza. */
export const CONDIZIONI_GROUPS = Object.freeze([...new Set(CONDIZIONI.map((entry) => entry.group))]);

/** L'id della Condizione di lista che un oggetto porta, o "". */
export function condizioneIdOf(item) {
  const flags = item?.flags?.[MODULE_ID] ?? {};
  return String(flags[CONDIZIONE_FLAG] ?? "");
}

/** Gli oggetti «condition» del personaggio che sono Condizioni di lista, per id. */
export function activeCondizioni(items) {
  const active = new Map();
  for (const item of items ?? []) {
    if (item?.type !== "condition") continue;
    const id = condizioneIdOf(item);
    if (id && !active.has(id)) active.set(id, item);
  }
  return active;
}

/** I dadi tolti da una Condizione di lista, in una parola: "-2", "-1 -1", "". */
export function condizioneDice(entry) {
  return (entry?.bonuses ?? [])
    .map((bonus) => Number(bonus?.value) || 0)
    .filter((value) => value !== 0)
    .map((value) => (value > 0 ? `+${value}` : String(value)))
    .join(" ");
}

/** Il titolo che compare al passaggio del mouse: nome, dadi, cos'è, effetto. */
export function condizioneTitle(entry) {
  const dice = condizioneDice(entry);
  return `${entry.name}${dice ? ` (${dice})` : ""} · ${entry.what}. ${entry.effect}`;
}

/** La tendina: i gruppi coi simboli, accesi o spenti. */
export function prepareCondizioni(items) {
  const active = activeCondizioni(items);
  return CONDIZIONI_GROUPS.map((group) => ({
    group,
    entries: CONDIZIONI.filter((entry) => entry.group === group).map((entry) => {
      const item = active.get(entry.id);
      return {
        id: entry.id,
        name: entry.name,
        icon: entry.icon,
        active: Boolean(item),
        suppressed: Boolean(item?.system?.suppressed),
        dice: condizioneDice(entry),
        title: condizioneTitle(entry)
      };
    })
  }));
}

export function findCondizione(id) {
  return CONDIZIONI.find((entry) => entry.id === id) ?? null;
}

export function findCondizioneByName(name) {
  const wanted = String(name ?? "").trim().toLowerCase();
  return CONDIZIONI.find((entry) => entry.name.toLowerCase() === wanted) ?? null;
}

/** L'oggetto che va addosso al personaggio, sempre dai dati del modulo. */
export function condizioneItemData(entry) {
  return {
    name: entry.name,
    type: "condition",
    img: entry.icon,
    system: {
      description: entry.description,
      bonuses: entry.bonuses.map((bonus) => ({ ...bonus, paths: [...bonus.paths] })),
      source: { book: "M6 · Le Condizioni", page: "" },
      effects: {},
      suppressed: false
    },
    flags: { [MODULE_ID]: { [CONDIZIONE_FLAG]: entry.id } }
  };
}

/** Il testo di una descrizione, senza i tag, per una riga corta. */
function plainText(html) {
  return String(html ?? "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Le righe della cella Condizioni (verdetto di Blue, 4/9 notte, «strada 1»):
 * simbolo, nome, il cos'è in piccolo e i dadi tolti. Le Condizioni di lista
 * leggono dal modulo, le altre dal loro oggetto.
 */
export function prepareConditionRows(items) {
  const rows = [];
  for (const item of items ?? []) {
    if (item?.type !== "condition") continue;
    const definition = findCondizione(condizioneIdOf(item));
    const bonuses = definition?.bonuses ?? item.system?.bonuses ?? [];
    const dice = bonuses
      .map((bonus) => Number(bonus?.value) || 0)
      .filter((value) => value !== 0)
      .map((value) => (value > 0 ? `+${value}` : String(value)))
      .join(" ");
    const what = definition?.what ?? plainText(item.system?.description).slice(0, 90);
    const effect = definition?.effect ?? "";
    rows.push({
      id: item.id ?? item._id,
      uuid: item.uuid ?? "",
      img: item.img,
      name: item.name,
      what,
      effect,
      dice,
      list: Boolean(definition),
      condizione: definition?.id ?? "",
      title: `${item.name}${dice ? ` (${dice})` : ""}${what ? ` · ${what}` : ""}${effect ? `. ${effect}` : ""}`,
      suppressed: Boolean(item.system?.suppressed)
    });
  }
  return rows;
}

/** Accende o spegne una Condizione di lista su un personaggio; torna true se accesa. */
export async function toggleCondizione(actor, entry) {
  const current = activeCondizioni(actor.items).get(entry.id);
  if (current) {
    await actor.deleteEmbeddedDocuments("Item", [current.id]);
    return false;
  }
  await actor.createEmbeddedDocuments("Item", [condizioneItemData(entry)]);
  return true;
}

/**
 * Il clic su un simbolo, nella tendina o nella striscia: accende o spegne la
 * Condizione di lista; un oggetto fuori lista (dalla lente) si toglie e basta.
 */
export async function onCondizioneToggle(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!actor.isOwner) {
    ui.notifications.warn(game.i18n.format("WOD5E.Notifications.NoSufficientPermission", { string: actor.name }));
    return;
  }
  const entry = findCondizione(target.dataset.condizione);
  if (entry) {
    await toggleCondizione(actor, entry);
    return;
  }
  const itemId = target.dataset.itemId;
  if (itemId && actor.items.get(itemId)) await actor.deleteEmbeddedDocuments("Item", [itemId]);
}
