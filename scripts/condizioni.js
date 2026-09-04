import { CONDIZIONI } from "./data/condizioni.js";
import { MODULE_ID } from "./constants.js";

/**
 * Le Condizioni di M5 sulla scheda (verdetto di Blue, 4/9 notte): il + della
 * cella apre l'archivio, diviso per categoria; la scelta diventa un oggetto
 * «condition» del sistema addosso al personaggio, così i dadi che toglie
 * entrano nel tiro da soli. Le Condizioni fuori lista arrivano dalla lente.
 */

export const CONDIZIONE_FLAG = "condizione";

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
      source: { book: "M5 · Le Condizioni", page: "" },
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
    rows.push({
      id: item.id ?? item._id,
      uuid: item.uuid ?? "",
      img: item.img,
      name: item.name,
      what: definition?.what ?? plainText(item.system?.description).slice(0, 90),
      effect: definition?.effect ?? "",
      dice,
      suppressed: Boolean(item.system?.suppressed)
    });
  }
  return rows;
}

function condizioneIdOf(item) {
  const flags = item?.flags?.[MODULE_ID] ?? {};
  return String(flags[CONDIZIONE_FLAG] ?? "");
}
