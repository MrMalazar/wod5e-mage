import { MODULE_ID } from "./constants.js";
import { CASSETTI_PARADOSSO, FAMIGLIE_PARADOSSO, MENU_PARADOSSO, SCENE_PARADOSSO } from "./data/menu-paradosso.js";
import { ROLL_CARD_FLAG } from "./roll-card.js";

/**
 * Il menù del Paradosso (Blue, 24/9/2026): le 65 voci con cui il Narratore
 * fa rimbalzare sui maghi i Volgari che hanno lanciato. Qui stanno i conti
 * puri, senza Foundry: la lista per scena, il prezzo di una voce, gli ultimi
 * Volgari in chat, l'effetto che resta addosso al mago e quando scade, gli
 * orologi del Paradosso (colore e forma diversi per ogni orologio, come
 * vuole Blue per chi non distingue i colori), la carta in chat e la copia
 * automatica dei punti. La finestra sta in quadro-narratore.js.
 */

export { CASSETTI_PARADOSSO, FAMIGLIE_PARADOSSO, MENU_PARADOSSO, SCENE_PARADOSSO };

/** Sull'attore: gli effetti del Paradosso che ha addosso, per id di spesa. */
export const ADDOSSO_FLAG = "paradossoAddosso";
/** Sul messaggio del tiro: la copia dei punti è già stata fatta. */
export const COPIA_FLAG = "paradossoCopiato";
/** Nel mondo: la scena in corso (tipo, posto, numero). */
export const SCENA_SETTING = "scenaParadosso";
/** Nel mondo: i maghi che il Narratore ha messo nel Quadro. */
export const MAGHI_SETTING = "quadroMaghi";
/** Sul client: la finestra (modo, cassetti aperti). */
export const QUADRO_SETTING = "quadroParadosso";

export const MODI_QUADRO = Object.freeze(["contatore", "menu", "giocatori"]);
export const POSTI = Object.freeze(["normale", "dissonante", "assonante"]);
export const DURATE = Object.freeze(["lancio", "turno", "scena", "sessione"]);

/**
 * Le coppie colore e forma degli orologi del Paradosso, nell'ordine in cui
 * si assegnano: ogni orologio aperto senza scegliere prende la prima coppia
 * libera, così due orologi non si somigliano mai (verdetto di Blue, 24/9).
 * I colori sono quelli del modulo Orologio; le forme le disegna il Quadro
 * (il modulo Orologio le riceve nel campo `forma`, per quando le avrà).
 */
export const COPPIE_OROLOGIO = Object.freeze([
  { colore: "viola", forma: "cerchio" },
  { colore: "ambra", forma: "quadrato" },
  { colore: "azzurro", forma: "esagono" },
  { colore: "verde", forma: "triangolo" },
  { colore: "rosso", forma: "rombo" },
  { colore: "avorio", forma: "ottagono" }
]);

const ORDINE_FAMIGLIE = FAMIGLIE_PARADOSSO;

/** Una voce come la vede la lista: la sua scena per nome, se è della scena in corso, la faccia delle comuni. */
function voceInLista(voce, scenaId) {
  return {
    ...voce,
    scenaNome: voce.scena ? (scenaById(voce.scena)?.nome ?? voce.scena) : "",
    inCorso: Boolean(voce.scena) && voce.scena === scenaId,
    faccia: scenaId && voce.facce?.[scenaId] ? voce.facce[scenaId] : null
  };
}

/**
 * Il menù in nove cassetti (Blue, 27/9): le voci raggruppate per «su cosa
 * rimbalza il Paradosso» (mago, incantesimo, dormienti, presenze, posto,
 * scontro, orologi, ancore, scoppio), nell'ordine del menù, in ordine
 * alfabetico dentro ogni cassetto, con la stessa cerca di `cassettiPerScena`
 * (che resta per la tendina del rimbalzo). Con una scena scelta le voci che
 * il PDF consiglia per quella scena portano `consigliata`; senza scena
 * niente. La tendina non nasconde mai una voce; la cerca tiene solo i
 * cassetti con qualcosa dentro.
 */
export function cassettiPerRimbalzo(scenaId = "", { cerca = "" } = {}) {
  const scena = scenaById(scenaId);
  const consigliate = new Set(scena?.consigliate ?? []);
  const filtro = testo(cerca).toLowerCase();
  const passa = (voce) => !filtro || `${voce.nome} ${voce.breve ?? ""} ${voce.effetto} ${voce.quando} ${voce.scenaNome ?? ""}`.toLowerCase().includes(filtro);
  return CASSETTI_PARADOSSO.map((cassetto) => {
    const voci = MENU_PARADOSSO
      .filter((voce) => voce.cassetto === cassetto)
      .map((voce) => ({ ...voceInLista(voce, scenaId), consigliata: consigliate.has(voce.id) }))
      .filter(passa)
      .sort(perNome);
    return { cassetto, voci, conto: voci.length, consigliate: voci.filter((voce) => voce.consigliata).length };
  }).filter((cassetto) => cassetto.conto > 0 || !filtro);
}

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

function testo(value) {
  return String(value ?? "").trim();
}

/* ------------------------------------------------------------------ */
/*  Le voci                                                            */
/* ------------------------------------------------------------------ */

export function voceById(id) {
  return MENU_PARADOSSO.find((voce) => voce.id === id) ?? null;
}

export function scenaById(id) {
  return SCENE_PARADOSSO.find((scena) => scena.id === id) ?? null;
}

const perNome = (a, b) => a.nome.localeCompare(b.nome, "it");

/**
 * Le voci del menù a famiglie, tutte in vista (Blue, 25/9: «voglio sempre
 * vedere in tutte le categorie tutte le opzioni, devo essere io che vado a
 * cercare»), in ordine alfabetico dentro ogni famiglia, senza sottotitoli
 * di scena (Blue, 25/9 sera: «togliamole tutte e lasciamo solo gli
 * elementi»): ogni voce di scena sa la sua scena (`scenaNome`, per il testo
 * e la cerca). Le comuni portano la faccia della scena in corso, se c'è.
 * `tutte: false` tiene il comportamento di prima (solo la scena in corso).
 */
export function cassettiPerScena(scenaId = "", { cerca = "", tutte = true } = {}) {
  const scena = scenaById(scenaId);
  const filtro = testo(cerca).toLowerCase();
  const passa = (voce) => !filtro || `${voce.nome} ${voce.breve ?? ""} ${voce.effetto} ${voce.quando} ${voce.scenaNome ?? ""}`.toLowerCase().includes(filtro);
  return ORDINE_FAMIGLIE.map((famiglia) => {
    const voci = MENU_PARADOSSO
      .filter((voce) => voce.famiglia === famiglia && (!voce.scena || voce.scena === scenaId || tutte))
      .map((voce) => ({
        ...voce,
        scenaNome: voce.scena ? (scenaById(voce.scena)?.nome ?? voce.scena) : "",
        inCorso: Boolean(voce.scena) && voce.scena === scenaId,
        faccia: scenaId && voce.facce?.[scenaId] ? voce.facce[scenaId] : null
      }))
      .filter(passa)
      .sort(perNome);
    return {
      famiglia,
      voci,
      conto: voci.length,
      faccia: scena?.facce?.[famiglia] ?? ""
    };
  }).filter((cassetto) => cassetto.conto > 0 || !filtro);
}

/* ------------------------------------------------------------------ */
/*  Il prezzo                                                          */
/* ------------------------------------------------------------------ */

/**
 * Quanto costa una voce, dati i campi che il suo prezzo chiede: la soglia
 * del Volgare a cui risponde, la soglia scritta di chi entra, i pallini,
 * il prezzo del rimbalzo che un orologio di Carica porta con sé. Torna
 * null quando manca un numero che serve.
 */
export function prezzoVoce(voce, { soglia = 0, suaSoglia = 0, pallini = 1, rimbalzo = 0 } = {}) {
  const prezzo = voce?.prezzo ?? {};
  switch (prezzo.tipo) {
    case "fisso": return count(prezzo.valore);
    case "soglia": return count(soglia) > 0 ? count(soglia) : null;
    case "suaSoglia": return count(suaSoglia) > 0 ? count(suaSoglia) : null;
    case "pallino": return count(prezzo.valore) * Math.min(Math.max(count(pallini), 1), count(prezzo.massimo) || 1);
    case "orologioRimbalzo": return count(prezzo.valore) + count(rimbalzo);
    default: return null;
  }
}

/** I campi che la spesa di una voce chiede, oltre a «risponde a» e «su chi». */
export function campiSpesa(voce) {
  const prezzo = voce?.prezzo ?? {};
  return {
    soglia: prezzo.tipo === "soglia",
    suaSoglia: prezzo.tipo === "suaSoglia" || Boolean(voce?.presenza),
    pallini: prezzo.tipo === "pallino",
    rimbalzo: prezzo.tipo === "orologioRimbalzo",
    orologio: voce?.famiglia === "orologi" || Boolean(voce?.presenza) || Boolean(prezzo.orologio),
    ancora: voce?.famiglia === "ancore",
    vuole: Boolean(voce?.presenza)
  };
}

/* ------------------------------------------------------------------ */
/*  Gli ultimi Volgari in chat                                         */
/* ------------------------------------------------------------------ */

/**
 * I Volgari lanciati in chat, dal più recente: chi, il titolo del lancio,
 * la soglia, se era con testimoni. `dal` è il momento della Nuova sessione:
 * i lanci di prima non contano.
 */
export function volgariRecenti(messages = [], { dal = 0, massimo = 12 } = {}) {
  const out = [];
  for (const message of [...messages].reverse()) {
    const card = message?.flags?.[MODULE_ID]?.[ROLL_CARD_FLAG];
    if (!card || !card.vulgar) continue;
    const quando = Number(message?.timestamp ?? 0);
    if (dal && quando && quando < dal) continue;
    out.push({
      messageId: String(message.id ?? ""),
      actorId: String(message?.speaker?.actor ?? ""),
      actorName: String(message?.speaker?.alias ?? ""),
      titolo: testo(card.title) || primaRiga(message?.flavor),
      soglia: count(card.threshold),
      testimoni: Boolean(card.advancedDifficulty),
      quando,
      round: count(card.round)
    });
    if (out.length >= massimo) break;
  }
  return out;
}

/** La prima riga piena di un flavor in HTML: il titolo del lancio nelle carte di prima del 24/9. */
function primaRiga(html) {
  return String(html ?? "").replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, " ").split("\n")
    .map((riga) => riga.replace(/\s+/g, " ").trim())
    .find(Boolean) ?? "";
}

/** L'etichetta di un Volgare nella tendina «risponde a»: mago, titolo, tipo, soglia, senza i pezzi vuoti. */
export function etichettaVolgare(volgare, localize = (key) => key) {
  return [
    volgare?.actorName,
    volgare?.titolo,
    localize(volgare?.testimoni ? "WOD5E_MAGE.Menu.ConTestimoni" : "WOD5E_MAGE.Menu.Volgare"),
    `${localize("WOD5E_MAGE.Menu.Soglia")} ${count(volgare?.soglia)}`
  ].map((parte) => testo(parte)).filter(Boolean).join(" · ");
}

/**
 * La copia automatica (verdetto del 24/9: i punti te li danno i giocatori):
 * un lancio Volgare chiuso in chat porta 1 punto al Narratore, 2 se era con
 * testimoni. Torna null se il messaggio non è un Volgare o è già copiato.
 */
export function copiaDaCarta(flags = {}) {
  const card = flags?.[ROLL_CARD_FLAG];
  if (!card || !card.vulgar || flags?.[COPIA_FLAG]) return null;
  return { points: card.advancedDifficulty ? 2 : 1, testimoni: Boolean(card.advancedDifficulty) };
}

/* ------------------------------------------------------------------ */
/*  Gli effetti addosso al mago                                        */
/* ------------------------------------------------------------------ */

/** La riga che una spesa lascia addosso al mago, con la sua durata. */
export function recordAddosso(voce, { id = "", scena = 0, round = 0, risponde = "", testo: nota = "", quando = Date.now() } = {}) {
  return {
    id: String(id || `${voce.id}-${quando}`),
    voce: voce.id,
    nome: voce.nome,
    famiglia: voce.famiglia,
    modo: voce.modo,
    durata: DURATE.includes(voce.durata) ? voce.durata : "scena",
    effetto: voce.effetto,
    testo: testo(nota),
    risponde: testo(risponde),
    scena: count(scena),
    round: count(round),
    quando: Number(quando) || Date.now()
  };
}

/** Le righe che restano dopo un evento: un lancio di Magick del mago, la fine del turno, della scena, della sessione. */
export function addossoDopo(addosso = {}, evento) {
  const ordine = { lancio: 1, turno: 2, scena: 3, sessione: 4 };
  const soglia = ordine[evento] ?? 0;
  const next = {};
  for (const [id, riga] of Object.entries(addosso ?? {})) {
    const durata = ordine[riga?.durata] ?? 3;
    if (durata > soglia) next[id] = riga;
  }
  return next;
}

/** Le righe in ordine di arrivo, con l'etichetta della durata. */
export function righeAddosso(addosso = {}) {
  return Object.values(addosso ?? {})
    .filter((riga) => riga && typeof riga === "object")
    .sort((a, b) => (a.quando ?? 0) - (b.quando ?? 0));
}

/* ------------------------------------------------------------------ */
/*  Gli orologi del Paradosso                                          */
/* ------------------------------------------------------------------ */

/** La prima coppia colore e forma che nessun orologio aperto usa già. */
export function coppiaLibera(orologi = []) {
  const usate = new Set((orologi ?? []).map((c) => `${c?.colore ?? ""}/${c?.forma ?? ""}`));
  const colori = new Set((orologi ?? []).map((c) => c?.colore ?? ""));
  return COPPIE_OROLOGIO.find((coppia) => !usate.has(`${coppia.colore}/${coppia.forma}`) && !colori.has(coppia.colore))
    ?? COPPIE_OROLOGIO.find((coppia) => !usate.has(`${coppia.colore}/${coppia.forma}`))
    ?? COPPIE_OROLOGIO[(orologi?.length ?? 0) % COPPIE_OROLOGIO.length];
}

/**
 * Un orologio del Paradosso nel formato del modulo Orologio di Blue
 * (stato.js, nuovoOrologio): senza timer, avanza da solo coi Volgari o a
 * mano, in vista o nascosto, con l'evento in chat sull'ultimo segmento e
 * il segno del Paradosso (`paradosso`) per riconoscerlo e chiuderlo a
 * fine sessione.
 */
export function nuovoOrologioParadosso({ id, titolo = "", segmenti = 4, visibile = true, colore = "viola", forma = "cerchio", scatta = "", voce = "", actorId = "", ordine = Date.now() } = {}) {
  const n = Math.min(Math.max(count(segmenti) || 4, 3), 16);
  const eventi = scatta ? { [String(n)]: [{ tipo: "chat", bersaglio: "", testo: scatta, soloNarratore: !visibile }] } : {};
  return {
    id: String(id || `paradosso-${ordine}`),
    titolo: testo(titolo),
    unita: "",
    segmenti: n,
    pieni: 0,
    senzaTimer: true,
    durata: 60,
    durate: Array.from({ length: n }, () => null),
    colore,
    dimensione: "medio",
    ciclo: false,
    visibile: Boolean(visibile),
    mostraNomi: false,
    mostraTimer: false,
    manualeScatena: true,
    nomi: Array.from({ length: n }, () => ""),
    eventi,
    attivo: false,
    inPausa: false,
    bloccato: false,
    scadenza: null,
    residuo: 60000,
    ordine,
    forma,
    paradosso: { voce: String(voce ?? ""), scatta: testo(scatta), actorId: String(actorId ?? "") }
  };
}

export function isOrologioParadosso(orologio) {
  return Boolean(orologio?.paradosso);
}

/** I colori degli orologi (la tavolozza del modulo Orologio) e i vertici delle forme, in un quadrato 100×100. */
export const COLORI_OROLOGIO = Object.freeze({ rosso: "#c0392b", ambra: "#d68910", verde: "#27ae60", azzurro: "#2e86c1", viola: "#8e44ad", avorio: "#e8e2d0" });

function poligono(lati, raggio, rotazione) {
  return Array.from({ length: lati }, (_, i) => {
    const a = rotazione + (i * 2 * Math.PI) / lati;
    return [50 + raggio * Math.cos(a), 50 + raggio * Math.sin(a)];
  });
}

export const FORME_OROLOGIO = Object.freeze({
  cerchio: null,
  quadrato: [[8, 8], [92, 8], [92, 92], [8, 92]],
  esagono: poligono(6, 46, -Math.PI / 2),
  triangolo: [[50, 3], [96, 84], [4, 84]],
  rombo: [[50, 3], [97, 50], [50, 97], [3, 50]],
  ottagono: poligono(8, 47, -Math.PI / 2 + Math.PI / 8)
});

const arrotonda = (n) => Math.round(n * 10) / 10;

/**
 * L'orologio disegnato: la forma della coppia (cerchio, quadrato, esagono,
 * triangolo, rombo, ottagono) tagliata in tanti spicchi quanti i segmenti,
 * i pieni nel colore, i vuoti scuri, un filetto fra uno spicchio e l'altro.
 * Torna il markup SVG, quadrato, della misura chiesta (Blue, 25/9: «gli
 * orologi con i segmenti di forme e colori diversi, quelli non li trovo»).
 */
export function svgOrologio(orologio, { size = 44, sfondo = "#1b160f", vuoto = "#3a3328", classe = "" } = {}) {
  const segmenti = Math.min(Math.max(count(orologio?.segmenti) || 4, 1), 24);
  const pieni = Math.min(count(orologio?.pieni), segmenti);
  const colore = COLORI_OROLOGIO[orologio?.colore] ?? COLORI_OROLOGIO.viola;
  const forma = orologio?.forma in FORME_OROLOGIO ? orologio.forma : "cerchio";
  const punti = FORME_OROLOGIO[forma];
  const id = `oro-${String(orologio?.id ?? "x").replace(/[^a-z0-9_-]/gi, "")}-${size}`;
  const contorno = punti
    ? `<polygon points="${punti.map(([x, y]) => `${arrotonda(x)},${arrotonda(y)}`).join(" ")}"`
    : `<circle cx="50" cy="50" r="46"`;
  const spicchi = [];
  for (let i = 0; i < segmenti; i += 1) {
    const a1 = -Math.PI / 2 + (i * 2 * Math.PI) / segmenti;
    const a2 = -Math.PI / 2 + ((i + 1) * 2 * Math.PI) / segmenti;
    const R = 80;
    const p1 = [50 + R * Math.cos(a1), 50 + R * Math.sin(a1)];
    const p2 = [50 + R * Math.cos(a2), 50 + R * Math.sin(a2)];
    const arco = segmenti === 1 ? `A ${R} ${R} 0 1 1 ${arrotonda(50 - R)} 50 A ${R} ${R} 0 1 1 ${arrotonda(p1[0])} ${arrotonda(p1[1])}` : `A ${R} ${R} 0 ${a2 - a1 > Math.PI ? 1 : 0} 1 ${arrotonda(p2[0])} ${arrotonda(p2[1])}`;
    spicchi.push(`<path d="M50 50 L${arrotonda(p1[0])} ${arrotonda(p1[1])} ${arco} Z" fill="${i < pieni ? colore : vuoto}" stroke="${sfondo}" stroke-width="3" clip-path="url(#${id})"/>`);
  }
  return `<svg class="wod5e-mage-orologio${classe ? ` ${classe}` : ""}" viewBox="0 0 100 100" width="${size}" height="${size}" role="img" aria-label="${escapeHtml(orologio?.titolo ?? "")} ${pieni}/${segmenti}"><defs><clipPath id="${id}">${contorno}/></clipPath></defs>${spicchi.join("")}${contorno} fill="none" stroke="${colore}" stroke-width="4"/></svg>`;
}

/**
 * Cosa scatta quando l'orologio è pieno, precompilato per la voce (24/9 sera,
 * Blue: «opzioni veloci, con esempi o caselle precompilate»): il rimbalzo scelto
 * per Carica e Nascosto, chi entra per le Presenze e l'Arrivo, l'effetto che
 * cade per Scadenza, la chiamata dell'Ancora, la Conseguenza del Ciclo.
 */
export function scattaPredefinito(voce, { rimbalzo = "", risponde = "", chi = "" } = {}, localize = (key) => key, format = (key) => key) {
  if (!voce) return "";
  if (voce.prezzo?.tipo === "orologioRimbalzo") return testo(rimbalzo);
  if (voce.presenza) return format("WOD5E_MAGE.Menu.ScattaEntra", { nome: testo(chi) || voce.nome });
  if (voce.id === "arrivo") return format("WOD5E_MAGE.Menu.ScattaEntra", { nome: testo(chi) || localize("WOD5E_MAGE.Menu.Famiglie.presenze") });
  if (voce.id === "scadenza") return format("WOD5E_MAGE.Menu.ScattaCade", { nome: testo(risponde) || voce.nome });
  if (voce.id === "ancora" || voce.prezzo?.orologio) return localize("WOD5E_MAGE.Menu.ScattaChiamata");
  if (voce.id === "ciclo") return localize("WOD5E_MAGE.Menu.ScattaTocco");
  return testo(voce.breve) || testo(voce.effetto);
}

/** Un segmento in più: torna l'orologio cambiato e se è arrivato in fondo. */
export function avanzaOrologio(orologio) {
  const c = { ...orologio };
  if (c.pieni >= c.segmenti) return { orologio: c, pieno: true, scattato: false };
  c.pieni = count(c.pieni) + 1;
  return { orologio: c, pieno: c.pieni >= c.segmenti, scattato: c.pieni >= c.segmenti };
}

/* ------------------------------------------------------------------ */
/*  La carta in chat                                                   */
/* ------------------------------------------------------------------ */

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * «Il Paradosso agisce» per una voce del menù: il nome col modo, a quale
 * Volgare risponde, il Segno (se è annunciata) e l'Effetto, le «Possibilità»
 * (le tre mosse; Blue, 25/9: prima «cosa fate»), il Poi. Il prezzo non ci va: lo vede il Narratore nel
 * registro. `dettagli` porta le righe in più (chi entra e cosa vuole, i
 * segmenti dell'orologio, l'Ancora).
 */
export function renderCartaVoce(voce, { risponde = "", suChi = "", dettagli = [], testo: nota = "" } = {}, localize = (key) => key) {
  const riga = (chiave, valore, classe = "") => `<div class="wod5e-mage-roll-row${classe ? ` ${classe}` : ""}"><b class="wod5e-mage-roll-key">${escapeHtml(chiave)}</b><span class="wod5e-mage-roll-value">${valore}</span></div>`;
  const rows = [];
  if (risponde) rows.push(riga(localize("WOD5E_MAGE.Menu.Risponde"), escapeHtml(risponde)));
  if (suChi) rows.push(riga(localize("WOD5E_MAGE.Menu.SuChi"), escapeHtml(suChi)));
  if (voce.modo === "annunciato" && voce.segno) rows.push(riga(localize("WOD5E_MAGE.Menu.Segno"), `<em>${escapeHtml(voce.segno)}</em>`));
  const etichettaEffetto = voce.modo === "annunciato" ? localize("WOD5E_MAGE.Menu.EffettoDopo") : localize("WOD5E_MAGE.Menu.Effetto");
  rows.push(riga(etichettaEffetto, escapeHtml(voce.effetto)));
  for (const dettaglio of dettagli) {
    if (dettaglio?.valore) rows.push(riga(dettaglio.chiave, escapeHtml(dettaglio.valore)));
  }
  if (nota) rows.push(riga(localize("WOD5E_MAGE.Paradosso.What"), escapeHtml(nota)));
  if (voce.mosse?.length) {
    rows.push(riga(localize("WOD5E_MAGE.Menu.Possibilita"), voce.mosse.map((mossa) => `<span class="wod5e-mage-menu-mossa">${escapeHtml(mossa)}</span>`).join(" "), "wod5e-mage-menu-mosse"));
  }
  if (voce.poi) rows.push(riga(localize("WOD5E_MAGE.Menu.Poi"), escapeHtml(voce.poi), "wod5e-mage-menu-poi"));
  const modo = localize(`WOD5E_MAGE.Menu.Modo.${voce.modo}`);
  return `<div class="wod5e-mage-paradosso-card wod5e-mage-menu-card"><p class="wod5e-mage-roll-victory wod5e-mage-paradosso-banner">${escapeHtml(localize("WOD5E_MAGE.Paradosso.CardTitle"))} · ${escapeHtml(voce.nome)} <small>${escapeHtml(modo)}</small></p><div class="wod5e-mage-roll-card">${rows.join("")}</div></div>`;
}

/* ------------------------------------------------------------------ */
/*  Il ritmo                                                           */
/* ------------------------------------------------------------------ */

/** Le spese del menù in questa scena, in tutto e per mago, e in questo giro di combattimento. */
export function contoRitmo(log = [], { scena = 0, round = 0 } = {}) {
  const spese = (log ?? []).filter((entry) => entry?.kind === "menu" && count(entry.scena) === count(scena));
  const perMago = {};
  for (const entry of spese) {
    const id = String(entry.actorId ?? "");
    if (id) perMago[id] = (perMago[id] ?? 0) + 1;
  }
  return {
    scena: spese.length,
    perMago,
    turno: round ? spese.filter((entry) => count(entry.round) === count(round)).length : 0
  };
}

/** Il momento della Nuova sessione più recente nel registro (0 se non c'è). */
export function inizioSessione(log = []) {
  const entry = [...(log ?? [])].reverse().find((row) => row?.kind === "session");
  return Number(entry?.when ?? 0) || 0;
}
