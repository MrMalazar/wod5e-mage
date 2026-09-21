/**
 * I poteri delle Sfere (raccolta del 14/9/2026, rifatta il 21/9): le Sfere
 * non hanno gradi di potere, sono contenitori. Un potere modifica un numero,
 * un tiro, una risorsa o una regola del lancio; un potere solo per lancio
 * (Blue, 16/9).
 *
 * Dal 21/9 (Blue: «si devono contare i poteri che inserisce il giocatore,
 * non gli slot disponibili, perché quando il giocatore li comprerà con
 * l'esperienza starà a lui inserirne») i poteri stanno sul personaggio,
 * nella bandiera `poteri`: una riga per potere, con la Sfera, il nome, il
 * pallino richiesto, il tipo (attivo o passivo), Cosa fa, l'Amalgama (la
 * seconda Sfera e cosa sblocca), il Flavor, il costo, e da dove viene
 * (il catalogo di data/poteri.js, o la mano del giocatore). Il conto dei
 * poteri conosciuti di una Sfera è il numero di queste righe.
 *
 * Il gancio per quando i poteri faranno qualcosa nel conto è `effects`: una
 * lista di { on: "threshold" | "dice" | "successFrom", value }, che
 * applyPotere mette nel conto. Tutto qui è puro.
 */
import { MODULE_ID } from "./constants.js";
import { SPHERES } from "./spheres.js";
import { POTERI } from "./data/poteri.js";

export { POTERI };

/** La bandiera del personaggio coi poteri inseriti. */
export const POTERI_FLAG = "poteri";

/** I pallini di una Sfera: il pallino richiesto da un potere va da 1 a 5. */
export const POTERE_DOTS = 5;

/** I due tipi (foglio, colonna Tipo): attivo lo decide il giocatore e paga qualcosa, passivo scatta da solo. */
export const POTERE_TIPI = Object.freeze(["attivo", "passivo"]);

/** I ganci previsti per gli effetti di un potere sul tiro. */
export const POTERE_EFFECTS = Object.freeze(["threshold", "dice", "successFrom"]);

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

function testo(value) {
  return String(value ?? "").trim();
}

function sfera(value) {
  const id = testo(value);
  return SPHERES.includes(id) ? id : "";
}

/** Una riga della bandiera letta pulita: ogni campo al suo posto e del suo tipo. */
export function normalizzaPotere(id, row = {}) {
  const dot = Math.min(count(row?.dot), POTERE_DOTS);
  const type = testo(row?.type);
  return {
    id: String(id ?? ""),
    sphere: sfera(row?.sphere),
    name: testo(row?.name),
    dot,
    type: POTERE_TIPI.includes(type) ? type : "",
    text: testo(row?.text),
    amalgam: sfera(row?.amalgam),
    amalgamText: testo(row?.amalgamText),
    flavor: testo(row?.flavor),
    cost: testo(row?.cost),
    source: row?.source === "catalogo" ? "catalogo" : "mano",
    catalogId: testo(row?.catalogId),
    effects: Array.isArray(row?.effects) ? row.effects : []
  };
}

/** L'ordine delle righe: per Sfera (come `order`), poi per pallino, poi per nome. */
export function ordinaPoteri(rows, order = SPHERES) {
  const rank = new Map((order ?? SPHERES).map((sphere, index) => [sphere, index]));
  return [...rows].sort((a, b) =>
    (rank.get(a.sphere) ?? 99) - (rank.get(b.sphere) ?? 99)
    || (a.dot || 99) - (b.dot || 99)
    || a.name.localeCompare(b.name, "it"));
}

/**
 * I poteri che un personaggio ha inserito, puliti e in ordine. `order` è la
 * fila delle Sfere della scheda (in alfabetico nella lingua in uso).
 */
export function poteriDelPersonaggio(actor, { order = null } = {}) {
  const stored = actor?.getFlag?.(MODULE_ID, POTERI_FLAG) ?? {};
  const rows = Object.entries(stored ?? {})
    .filter(([, row]) => row && typeof row === "object")
    .map(([id, row]) => normalizzaPotere(id, row));
  return ordinaPoteri(rows, order ?? SPHERES);
}

/** I poteri di una Sfera sola. */
export function poteriOfSphere(rows, sphere) {
  return (rows ?? []).filter((power) => power.sphere === sphere);
}

/** Il conto per Sfera: { forces: 3, life: 0, … }, tutte e nove le Sfere. */
export function contoPoteri(rows) {
  const conti = Object.fromEntries(SPHERES.map((sphere) => [sphere, 0]));
  for (const power of rows ?? []) {
    if (power.sphere in conti) conti[power.sphere] += 1;
  }
  return conti;
}

/** Un potere per id, fra le righe date (quelle del personaggio). */
export function findPotere(id, rows = []) {
  const key = String(id ?? "");
  return (rows ?? []).find((power) => power.id === key) ?? null;
}

/** Il nome che si stampa: quello scritto, o «(senza nome)» finché non c'è. */
export function potereLabel(power, localize = (key) => key) {
  if (!power) return "";
  return testo(power.name) || localize("WOD5E_MAGE.Poteri.SenzaNome");
}

/**
 * La riga nuova da scrivere nella bandiera: vuota, sulla Sfera data (il
 * giocatore la riempie a mano), oppure copiata da una voce del catalogo.
 */
export function nuovoPotere(sphere, entry = null) {
  const base = {
    sphere: sfera(sphere) || sfera(entry?.sphere),
    name: "",
    dot: 0,
    type: "",
    text: "",
    amalgam: "",
    amalgamText: "",
    flavor: "",
    cost: "",
    source: "mano",
    catalogId: ""
  };
  if (!entry) return base;
  return {
    ...base,
    name: testo(entry.name),
    dot: Math.min(count(entry.dot), POTERE_DOTS),
    type: POTERE_TIPI.includes(testo(entry.type)) ? testo(entry.type) : "",
    text: testo(entry.text),
    amalgam: sfera(entry.amalgam),
    amalgamText: testo(entry.amalgamText),
    flavor: testo(entry.flavor),
    cost: testo(entry.cost),
    source: "catalogo",
    catalogId: testo(entry.id),
    effects: Array.isArray(entry.effects) ? entry.effects : []
  };
}

/**
 * Le voci del catalogo per la tendina «Aggiungi» di una Sfera: in ordine di
 * pallino, `known` se il personaggio ce l'ha già (stesso id di catalogo),
 * `locked` se chiede più pallini di quelli della Sfera (`rating`). Un
 * catalogo vuoto dà una lista vuota: resta la scrittura a mano.
 */
export function catalogoDellaSfera(sphere, { catalog = POTERI, rating = 0, owned = [] } = {}) {
  const have = new Set((owned ?? []).map((power) => power.catalogId).filter(Boolean));
  return (catalog ?? [])
    .filter((entry) => entry.sphere === sphere)
    .map((entry) => ({
      id: entry.id,
      name: testo(entry.name),
      dot: Math.min(count(entry.dot), POTERE_DOTS),
      type: testo(entry.type),
      amalgam: sfera(entry.amalgam),
      known: have.has(entry.id),
      locked: Math.min(count(entry.dot), POTERE_DOTS) > count(rating)
    }))
    .sort((a, b) => (a.dot || 99) - (b.dot || 99) || a.name.localeCompare(b.name, "it"));
}

/**
 * Gli effetti del potere sul conto: `threshold` aggiunge (o toglie, se
 * negativo) alla soglia calcolata, mai sotto zero; `dice` aggiunge dadi
 * alla riserva; `successFrom` fissa da che numero si riesce. Torna il conto
 * toccato e le note per la carta. Un potere senza effetti non cambia niente.
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
