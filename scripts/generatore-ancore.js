// Il generatore delle Ancore (Blue, 25/9/2026): tira nome e cognome, ruolo,
// mestiere, età, cosa ti dà, cosa non sa e dove morde. La Convinzione legata
// non si tira: si sceglie fra quelle del personaggio. Puro, senza Foundry:
// riceve un `rng` che rende un numero in [0, 1) e si prova con un seme.

import {
  COGNOMI,
  COGNOMI_RISERVA,
  COSA_NON_SA,
  COSA_TI_DA,
  DOVE_MORDE,
  MESTIERI,
  NOMI_DONNA,
  NOMI_UOMO,
  RUOLI
} from "./data/generatore-ancore.js";

/** I campi di un'Ancora sulla scheda, nell'ordine delle sette righe. */
export const CAMPI_ANCORA = Object.freeze(["name", "role", "job", "age", "gives", "conviction", "unknown", "bites"]);

/** I campi che il generatore riempie (la Convinzione resta al giocatore). */
export const CAMPI_GENERATI = Object.freeze(["name", "role", "job", "age", "gives", "unknown", "bites"]);

/** L'età: un d100, sotto il 6 e sopra il 90 si rilancia. */
export const ETA_MIN = 6;
export const ETA_MAX = 90;

function pesca(list, rng) {
  const n = list.length;
  if (!n) return "";
  const index = Math.min(n - 1, Math.max(0, Math.floor(rng() * n)));
  return list[index];
}

/** Il sesso del nome: «donna», «uomo», o a caso. */
export function tiraNome(rng = Math.random, sesso = "") {
  const donna = sesso === "donna" ? true : sesso === "uomo" ? false : rng() < 0.5;
  return pesca(donna ? NOMI_DONNA : NOMI_UOMO, rng);
}

/** Il cognome: la tavola dei cento più la riserva, tutti con lo stesso peso. */
export function tiraCognome(rng = Math.random) {
  return pesca([...COGNOMI, ...COGNOMI_RISERVA], rng);
}

export function tiraEta(rng = Math.random) {
  for (let tentativi = 0; tentativi < 20; tentativi += 1) {
    const eta = 1 + Math.floor(rng() * 100);
    if (eta >= ETA_MIN && eta <= ETA_MAX) return eta;
  }
  return ETA_MIN + Math.floor(rng() * (ETA_MAX - ETA_MIN + 1));
}

export function tiraRuolo(rng = Math.random) {
  return pesca(RUOLI, rng)?.id ?? "";
}

export function tiraMestiere(rng = Math.random) {
  return pesca(MESTIERI, rng);
}

/** Un campo solo, per il tasto accanto alla casella. */
export function tiraCampo(campo, rng = Math.random, { sesso = "" } = {}) {
  switch (campo) {
    case "name": return `${tiraNome(rng, sesso)} ${tiraCognome(rng)}`;
    case "role": return tiraRuolo(rng);
    case "job": return tiraMestiere(rng);
    case "age": return String(tiraEta(rng));
    case "gives": return pesca(COSA_TI_DA, rng);
    case "unknown": return pesca(COSA_NON_SA, rng);
    case "bites": return pesca(DOVE_MORDE, rng);
    default: return "";
  }
}

/** Un'Ancora intera, tutti i campi tirati; la Convinzione vuota. */
export function generaAncora({ rng = Math.random, sesso = "" } = {}) {
  const row = { conviction: "", description: "" };
  for (const campo of CAMPI_GENERATI) row[campo] = tiraCampo(campo, rng, { sesso });
  return row;
}

/**
 * Riempie solo i campi vuoti di una riga che c'è già: chi vuole ritirare un
 * campo lo svuota e preme di nuovo Genera. La Convinzione e le note non si toccano.
 */
export function completaAncora(row, { rng = Math.random, sesso = "" } = {}) {
  const out = { ...(row ?? {}) };
  for (const campo of CAMPI_GENERATI) {
    if (String(out[campo] ?? "").trim() === "") out[campo] = tiraCampo(campo, rng, { sesso });
  }
  return out;
}

/** La definizione di un ruolo del d20, per il sorvolo. */
export function definizioneRuolo(id) {
  return RUOLI.find((ruolo) => ruolo.id === id)?.definizione ?? "";
}

/** Le opzioni della tendina del ruolo: id, definizione, scelto. */
export function opzioniRuolo(selected = "") {
  return RUOLI.map((ruolo) => ({ id: ruolo.id, definizione: ruolo.definizione, selected: ruolo.id === selected }));
}
