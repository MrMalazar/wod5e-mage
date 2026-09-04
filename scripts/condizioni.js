import { CONDIZIONI } from "./data/condizioni.js";
import { MODULE_ID } from "./constants.js";

/**
 * Le Condizioni come quadratini (verdetto di Blue, 4/9 notte): tutte e
 * venticinque nel pannello, si accendono e si spengono con un clic. Accesa,
 * la Condizione è un oggetto «condition» del sistema addosso al personaggio,
 * così i dadi che toglie entrano nel tiro da soli; spenta, l'oggetto se ne va.
 * Le Condizioni fuori lista restano oggetti normali, aggiunti dalla lente.
 */

export const CONDIZIONE_FLAG = "condizione";

/** L'ordine dei gruppi, com'è nella bozza. */
export const CONDIZIONI_GROUPS = Object.freeze([...new Set(CONDIZIONI.map((entry) => entry.group))]);

export function findCondizione(id) {
  return CONDIZIONI.find((entry) => entry.id === id) ?? null;
}

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

/** I gruppi coi quadratini: accesi, spenti, e la spiegazione nel titolo. */
export function prepareCondizioni(items) {
  const active = activeCondizioni(items);
  return CONDIZIONI_GROUPS.map((group) => ({
    group,
    entries: CONDIZIONI.filter((entry) => entry.group === group).map((entry) => {
      const item = active.get(entry.id);
      const dice = entry.bonuses.map((bonus) => bonus.value).join(" ");
      return {
        id: entry.id,
        name: entry.name,
        icon: entry.icon,
        active: Boolean(item),
        suppressed: Boolean(item?.system?.suppressed),
        dice,
        title: `${entry.name}${dice ? ` (${dice})` : ""} · ${entry.what}. ${entry.effect}`
      };
    })
  }));
}

/** Le Condizioni fuori lista: gli oggetti che restano nella lista classica. */
export function customConditions(conditions) {
  return (conditions ?? []).filter((item) => !condizioneIdOf(item));
}

/** L'oggetto da creare quando un quadratino si accende. */
export function condizioneItemData(entry) {
  return {
    name: entry.name,
    type: "condition",
    img: entry.icon,
    system: {
      description: entry.description,
      bonuses: entry.bonuses.map((bonus) => ({ ...bonus, paths: [...bonus.paths] })),
      source: { book: "M5 · Le Condizioni", page: "" },
      effects: {},
      suppressed: false
    },
    flags: { [MODULE_ID]: { [CONDIZIONE_FLAG]: entry.id } }
  };
}

/** Il clic sul quadratino: accende o spegne la Condizione. */
export async function onCondizioneToggle(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!actor.isOwner) {
    ui.notifications.warn(game.i18n.format("WOD5E.Notifications.NoSufficientPermission", { string: actor.name }));
    return;
  }
  const entry = findCondizione(target.dataset.condizione);
  if (!entry) return;
  const current = activeCondizioni(actor.items).get(entry.id);
  if (current) {
    await actor.deleteEmbeddedDocuments("Item", [current.id]);
  } else {
    await actor.createEmbeddedDocuments("Item", [condizioneItemData(entry)]);
  }
}
