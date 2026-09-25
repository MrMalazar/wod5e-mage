/**
 * Il Vathrâ nel modulo (Blue, 25/9): la parte senza Foundry. Il motore sta in
 * vathra-core.js (copia di 03_FABBRICA), la lettura in lettura.js; qui ci sono
 * le manopole del traduttore, i gettoni delle particelle, la radice coi Modi,
 * il frasario, e le regole della carta in chat.
 *
 * I verdetti di Blue (25/9):
 * - la frase va anche in chat: glifi e lettura per tutti, il senso in italiano
 *   e la glossa solo a chi capisce;
 * - chi capisce lo sceglie chi manda, al momento dell'invio, come un
 *   sussurro; il Narratore e chi scrive capiscono sempre;
 * - il traduttore lo aprono tutti, giocatori e Narratore.
 */
import VATHRA from "./vathra-core.js";
import { MODI, REGISTRATE } from "./dati.js";
import { FRASARIO } from "./frasario.js";
import { comeSiLegge } from "./lettura.js";

/** La bandiera della carta in chat. */
export const VATHRA_FLAG = "vathra";

/** Le due mani: la filata per leggere, la sciolta per firmare. */
export const MANI = Object.freeze(["filata", "sciolta"]);
export const FONT_MANO = Object.freeze({ filata: "Vathra Filata", sciolta: "Vathra Sciolta" });

/** Le pagine della finestra. */
export const PAGINE = Object.freeze(["traduttore", "radice", "alfabeto", "frasario"]);

/** Le manopole del traduttore e i loro valori, come nella pagina di 03_FABBRICA. */
export const MANOPOLE = Object.freeze({
  testimone: Object.freeze(["auto", "nessuna", "occhi", "tessitura", "riferito", "avatar"]),
  consenso: Object.freeze(["nessuno", "coincidente", "volgare"]),
  modo: Object.freeze(["auto", "imperativo", "racconto"]),
  registro: Object.freeze(["consensuale", "reale"]),
  risvegliato: Object.freeze(["auto", "si", "no"]),
  nomiPropri: Object.freeze(["lascia", "muta"])
});

/** Il primo valore di ogni manopola è quello di partenza. */
export const OPZIONI_BASE = Object.freeze(Object.fromEntries(Object.entries(MANOPOLE).map(([k, valori]) => [k, valori[0]])));

/** Dove torna una manopola quando si spegne il suo gettone. */
export const SPENTO = Object.freeze({ testimone: "auto", consenso: "nessuno", registro: "consensuale" });

/** I gettoni «Se serve» sotto la traduzione; il separatore è null. */
export const GETTONI = Object.freeze([
  { k: "testimone", v: "occhi" }, { k: "testimone", v: "tessitura" }, { k: "testimone", v: "riferito" }, { k: "testimone", v: "avatar" },
  null,
  { k: "consenso", v: "coincidente" }, { k: "consenso", v: "volgare" },
  null,
  { k: "registro", v: "reale" }
]);

/** Le manopole riportate a valori noti: quelle sconosciute tornano alla partenza. */
export function normalizzaOpzioni(opzioni = {}) {
  const out = {};
  for (const [k, valori] of Object.entries(MANOPOLE)) {
    const v = opzioni?.[k];
    out[k] = valori.includes(v) ? v : OPZIONI_BASE[k];
  }
  return out;
}

export function normalizzaMano(mano) {
  return MANI.includes(mano) ? mano : "filata";
}

/**
 * La traduzione di un testo: la lettura (romanizzazione), i glifi per il
 * font, la glossa, e come si legge. Un testo vuoto torna `vuoto: true`.
 */
export function traduciTesto(testo, opzioni = {}) {
  const pulito = String(testo ?? "").trim();
  if (!pulito) return { vuoto: true, romanizzazione: "", glifi: "", glossa: "", legge: "" };
  const r = VATHRA.traduci(pulito, { ...normalizzaOpzioni(opzioni), determinatezza: true });
  const romanizzazione = String(r.romanizzazione ?? "").trim();
  return {
    vuoto: !romanizzazione,
    romanizzazione,
    glifi: String(r.glifi ?? "").trim(),
    glossa: String(r.glossa ?? "").trim(),
    legge: comeSiLegge(romanizzazione)
  };
}

/** Accende o spegne un gettone: torna le manopole nuove. */
export function toggleGettone(opzioni, k, v) {
  const out = normalizzaOpzioni(opzioni);
  if (!(k in SPENTO) || !MANOPOLE[k].includes(v)) return out;
  out[k] = out[k] === v ? SPENTO[k] : v;
  return out;
}

/**
 * Lo stato dei gettoni: acceso quando lo imponi tu, «eco» (tratteggiato)
 * quando la testimonianza la dice già la frase italiana («l'ho visto…»).
 */
export function statoGettoni(testo, opzioni = {}) {
  const o = normalizzaOpzioni(opzioni);
  const prima = String(testo ?? "").split(/(?<=[.!?;:])\s+|\n+/)[0] || "";
  const letto = VATHRA.leggiIndizi(prima);
  return GETTONI.map((g) => {
    if (!g) return { sep: true };
    const acceso = o[g.k] === g.v;
    const eco = !acceso && g.k === "testimone" && o.testimone === "auto" && Boolean(letto.trovato) && letto.testimone === g.v;
    return { ...g, acceso, eco };
  });
}

/** La registrazione di una lettura, se è una delle dieci: «F3.mp3». */
export function registrazione(romanizzazione) {
  const indice = REGISTRATE.indexOf(String(romanizzazione ?? "").trim());
  return indice >= 0 ? `F${indice}.mp3` : null;
}

/** La radice di una parola italiana coi sette Modi: la lettura, i glifi, come si legge. */
export function radice(parola) {
  const w = String(parola ?? "").trim().split(/\s+/)[0] ?? "";
  if (!w) return null;
  const d = VATHRA.declina(w);
  return {
    parola: w,
    radice: d.radice,
    dalLessico: d.nota === "lessico",
    modi: MODI.map((m) => ({ ...m, vathra: d[m.id], glifi: VATHRA.perIlFont(d[m.id]), legge: comeSiLegge(d[m.id]) }))
  };
}

/** Le manopole di una frase del frasario, sopra quelle di partenza (come faceva la pagina). */
export function opzioniFrase(frase) {
  return normalizzaOpzioni({ ...OPZIONI_BASE, testimone: "nessuna", consenso: "nessuno", ...(frase?.o ?? {}) });
}

/** Una frase del frasario per gruppo e indice. */
export function fraseDelFrasario(gruppo, indice) {
  return FRASARIO.find((g) => g.id === gruppo)?.frasi?.[Number(indice)] ?? null;
}

const cercabile = (s) => String(s ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[ʼ'’]/g, "'");

/** Il frasario tradotto: per ogni frase la lettura, i glifi, se è registrata, e il testo per la ricerca. */
export function frasarioTradotto() {
  return FRASARIO.map((g) => ({
    id: g.id,
    titolo: g.titolo,
    frasi: g.frasi.map((f, indice) => {
      const t = traduciTesto(f.it, opzioniFrase(f));
      return { indice, it: f.it, romanizzazione: t.romanizzazione, glifi: t.glifi, legge: t.legge, registrata: Boolean(registrazione(t.romanizzazione)), cerca: cercabile(`${f.it} ${t.romanizzazione}`) };
    })
  }));
}

/** Il filtro del frasario: tutte le parole cercate devono stare nella frase o nella sua lettura. */
export function fraseCorrisponde(cerca, filtro) {
  const parole = cercabile(filtro).split(/\s+/).filter(Boolean);
  if (!parole.length) return true;
  return parole.every((p) => String(cerca ?? "").includes(p));
}

/** Chi vede il senso di una carta: il Narratore, chi l'ha scritta, e chi è stato acceso. */
export function capisce({ userId = null, isGM = false, autoreId = null, capiscono = [] } = {}) {
  if (isGM) return true;
  if (userId && autoreId && userId === autoreId) return true;
  return Array.isArray(capiscono) && capiscono.includes(userId);
}

/** Gli id di chi capisce, puliti: stringhe, una volta sola, senza l'autore. */
export function pulisciCapiscono(ids = [], autoreId = null) {
  return [...new Set([...(ids ?? [])].filter((id) => id !== null && id !== undefined).map(String).filter(Boolean))].filter((id) => id !== autoreId);
}

/** Accende o spegne un giocatore fra quelli che capiscono. */
export function toggleCapisce(ids = [], userId) {
  const set = new Set([...(ids ?? [])].map(String));
  if (set.has(userId)) set.delete(userId); else set.add(userId);
  return [...set];
}

/** La bandiera della carta: tutto quello che serve a disegnarla e a mostrare il senso. */
export function datiCarta({ testo, traduzione, mano, capiscono = [], autoreId = null } = {}) {
  return {
    italiano: String(testo ?? "").trim(),
    romanizzazione: traduzione?.romanizzazione ?? "",
    glifi: traduzione?.glifi ?? "",
    glossa: traduzione?.glossa ?? "",
    legge: traduzione?.legge ?? "",
    mano: normalizzaMano(mano),
    capiscono: pulisciCapiscono(capiscono, autoreId)
  };
}

/** Il comando in chat: «/vathra» apre il traduttore, «/vathra <frase>» lo apre con la frase. */
export function leggiComando(messaggio) {
  const m = String(messaggio ?? "").match(/^\s*\/vathra(?:\s+([\s\S]*))?$/i);
  if (!m) return null;
  return { testo: String(m[1] ?? "").trim() };
}
