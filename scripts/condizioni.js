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
