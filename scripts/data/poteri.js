// I novanta poteri delle Sfere (raccolta del 14/9/2026): dieci per Sfera,
// due per pallino. Blue non li ha ancora scritti: qui stanno i SEGNAPOSTO,
// che si vedono e si scelgono ma non fanno niente. Quando arriveranno i
// poteri veri, ogni riga prende nome, testo ed effetti:
// { id, sphere, dot, slot, name, text, effects: [{ on, value }] }.
// Gli `on` ammessi stanno in poteri.js (POTERE_EFFECTS).
import { SPHERES } from "../spheres.js";

export const POTERI_PER_PALLINO = 2;
export const POTERE_DOTS = 5;

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

/** L'id di un potere: Sfera, pallino, posto (1 o 2). */
export function potereId(sphere, dot, slot) {
  return `${sphere}-${count(dot)}-${count(slot)}`;
}

/**
 * I novanta segnaposto: per ogni Sfera, cinque pallini, due posti l'uno.
 * Nome e testo vuoti: la scheda stampa «Sfera · pallino · posto».
 */
export function poteriSegnaposto(spheres = SPHERES) {
  const out = [];
  for (const sphere of spheres) {
    for (let dot = 1; dot <= POTERE_DOTS; dot += 1) {
      for (let slot = 1; slot <= POTERI_PER_PALLINO; slot += 1) {
        out.push({ id: potereId(sphere, dot, slot), sphere, dot, slot, name: "", text: "", effects: [] });
      }
    }
  }
  return out;
}

export const POTERI = Object.freeze(poteriSegnaposto());
