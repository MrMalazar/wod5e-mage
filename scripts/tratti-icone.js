import { MODULE_ID } from "./constants.js";
import { CHIAVI_VIVE } from "./abilita-essenziali.js";

/**
 * I sigilli di casa per Attributi e Abilità: gli stessi simboli della scheda
 * cartacea, ricolorati in oro, uno per chiave di sistema. Arte, Conoscenze,
 * Mischia e Velo usano i sigilli dei nomi vecchi (Espressività, Accademiche,
 * Mischia, Occulto); Armi a Distanza ha il mirino disegnato l'11/9.
 */
const ROOT = `modules/${MODULE_ID}/assets/icons/sheet/tratti/`;

export const ATTRIBUTE_KEYS = Object.freeze([
  "strength",
  "dexterity",
  "stamina",
  "charisma",
  "manipulation",
  "composure",
  "intelligence",
  "wits",
  "resolve"
]);

const ICONE = new Set([...ATTRIBUTE_KEYS, ...CHIAVI_VIVE]);

export function traitIcon(id) {
  return ICONE.has(id) ? `${ROOT}${id}.svg` : "";
}

/**
 * Aggiunge il sigillo a ogni voce dei gruppi del sistema
 * ({physical, social, mental} per gli Attributi, colonna1..N per le Abilità).
 */
export function applyTraitIcons(groups) {
  return Object.fromEntries(
    Object.entries(groups ?? {}).map(([group, traits]) => [
      group,
      (traits ?? []).map((trait) => ({ ...trait, icon: traitIcon(trait?.id) }))
    ])
  );
}
