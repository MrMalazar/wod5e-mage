/**
 * I poteri delle Sfere (raccolta del 14/9/2026): le Sfere non hanno più
 * gradi di potere, sono contenitori. Cinque pallini per Sfera, due poteri
 * per pallino, dieci per Sfera, novanta in tutto; funzionano come le
 * Discipline, capacità passive e sconti che si agganciano all'uso della
 * Sfera. Un potere solo per lancio (Blue, 16/9).
 *
 * Finché Blue non li scrive, il catalogo (data/poteri.js) è di segnaposto:
 * si vedono, si scelgono, viaggiano fino alla carta, ma non fanno niente.
 * Il gancio per quando faranno qualcosa è `effects`: una lista di
 * { on: "threshold" | "dice" | "successFrom", value }, che applyPotere
 * mette nel conto. Tutto qui è puro.
 */
import { POTERI, POTERE_DOTS, POTERI_PER_PALLINO, potereId, poteriSegnaposto } from "./data/poteri.js";

export { POTERI, POTERE_DOTS, POTERI_PER_PALLINO, potereId, poteriSegnaposto };

/** I ganci previsti per gli effetti di un potere sul tiro. */
export const POTERE_EFFECTS = Object.freeze(["threshold", "dice", "successFrom"]);

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

/** Un potere per id, dal catalogo. */
export function findPotere(id, catalog = POTERI) {
  const key = String(id ?? "");
  return catalog.find((power) => power.id === key) ?? null;
}

/**
 * I poteri che un personaggio ha: quelli delle Sfere che possiede, fino al
 * pallino raggiunto. `ratings` è { sfera: pallini }. In ordine di Sfera
 * (come `order`, o come il catalogo), poi di pallino, poi di posto.
 */
export function poteriOf(ratings = {}, { catalog = POTERI, order = null } = {}) {
  const owned = catalog.filter((power) => count(ratings?.[power.sphere]) >= count(power.dot));
  if (!order) return owned;
  const rank = new Map(order.map((sphere, index) => [sphere, index]));
  return [...owned].sort((a, b) => (rank.get(a.sphere) ?? 99) - (rank.get(b.sphere) ?? 99) || a.dot - b.dot || a.slot - b.slot);
}

/**
 * Il nome che si stampa: quello scritto, oppure, per un segnaposto,
 * «Forze 3 · 1» (Sfera, pallino, posto). `localize` traduce la Sfera.
 */
export function potereLabel(power, localize = (key) => key) {
  if (!power) return "";
  const name = String(power.name ?? "").trim();
  if (name) return name;
  return `${localize(`WOD5E_MAGE.Spheres.${power.sphere}`)} ${count(power.dot)} · ${count(power.slot)}`;
}

/**
 * Gli effetti del potere sul conto: `threshold` aggiunge (o toglie, se
 * negativo) alla soglia calcolata, mai sotto zero; `dice` aggiunge dadi
 * alla riserva; `successFrom` fissa da che numero si riesce. Torna il conto
 * toccato e le note per la carta. Un segnaposto non cambia niente.
 */
export function applyPotere(conto, power) {
  const next = { threshold: count(conto?.threshold), dice: Math.trunc(Number(conto?.dice) || 0), difficulty: conto?.difficulty ?? null, notes: [] };
  for (const effect of power?.effects ?? []) {
    const value = Math.trunc(Number(effect?.value) || 0);
    switch (effect?.on) {
      case "threshold":
        next.threshold = Math.max(next.threshold + value, 0);
        next.notes.push({ on: "threshold", value });
        break;
      case "dice":
        next.dice += value;
        next.notes.push({ on: "dice", value });
        break;
      case "successFrom":
        if (value > 0) {
          next.difficulty = value;
          next.notes.push({ on: "successFrom", value });
        }
        break;
      default:
        break;
    }
  }
  return next;
}
