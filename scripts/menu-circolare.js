/**
 * Il menù circolare del Narratore (Blue, 17-18/11/2026): le nove Sfere in
 * cerchio, solo coi sigilli e il nome sotto; al clic la Sfera va sulla linea
 * e si aprono Narrativa e Combattimento, collegate come in uno schema; dal
 * lato scelto si apre il ventaglio delle mosse, ognuna col suo simbolo. In
 * fondo al ventaglio l'Effetto di Magick (la lista degli incantesimi della
 * Sfera, con la cerca) e Componi (la finestra del lancio, già sulla Sfera).
 *
 * Le regole vengono dalla guida del menù per Sfere (13/10) e dall'app 0.12.0:
 * i tre cerchi delle Sfere (al tavolo X, del nemico X ragionata come PNG,
 * fuori X e qualcosa in più); la soglia per scardinare è il pagato, più 3 per
 * le mosse che fissano qualcosa; in combattimento una spesa per turno; la
 * spesa si dichiara in chat con cinque secondi per nasconderla. Chi agisce è
 * il token selezionato; senza token agisce il Paradosso (18/11).
 *
 * Qui stanno solo i conti puri, senza Foundry; la finestra è in
 * menu-circolare-ui.js.
 */
import { MENU_ICONE, MENU_ICONE_LATI, MENU_SFERE } from "./data/menu-sfere.js";
import { FORMULE_M6 } from "./data/formule.js";

export const FATTI_SETTING = "fattiFissati";
export const TURNO_SETTING = "menuCircolareTurno";
export const LATI = Object.freeze(["n", "s"]);
export const SOGLIA_FISSA = 3;
export const COMPONI = "_componi";
export const CERCHI = Object.freeze(["t", "n", "f"]);
/** Gli Ambiti della finestra del lancio, con l'Epicità in cima (2/10: da 1 a 7; sopra lo 0 al massimo tre). */
export const AMBITI_LANCIO = Object.freeze(["epic", "targets", "conditions", "duration", "range", "potency", "precision"]);
export const AMBITI_MAX = 3;
export const LIVELLO_MAX = 7;
export const EFFETTI_LANCIO = Object.freeze(["physical", "mental", "variable"]);

/* ------------------------------------------------------------------ */
/*  Le righe                                                           */
/* ------------------------------------------------------------------ */

export function sferaMenu(id) {
  return MENU_SFERE.find((sfera) => sfera.id === id) ?? null;
}

export function indiceSfera(id) {
  return MENU_SFERE.findIndex((sfera) => sfera.id === id);
}

/** Le righe di un lato: le sue più quelle Narrativa/Combattimento, nell'ordine della stesura (l'Effetto di Magick in fondo). */
export function righeDelLato(sfera, lato) {
  if (!sfera || !LATI.includes(lato)) return [];
  return sfera.righe.filter((riga) => riga.lato === lato || riga.lato === "ns");
}

export function rigaMenu(sfera, id) {
  return sfera?.righe.find((riga) => riga.id === id) ?? null;
}

export function isEffettoMagick(id) {
  return typeof id === "string" && /-effetto-di-magick$/.test(id);
}

export function idEffettoMagick(sferaId) {
  return `${sferaId}-effetto-di-magick`;
}

export function iconaDi(nome) {
  return MENU_ICONE[nome] ?? "";
}

export function iconaLato(lato) {
  return iconaDi(MENU_ICONE_LATI[lato] ?? "");
}

export function iconaComponi() {
  return iconaDi(MENU_ICONE_LATI.componi);
}

/** La soglia per scardinare una mossa del Narratore: il pagato, più 3 se fissa qualcosa. */
export function sogliaPerScardinare(paga, fissa = false) {
  const pagato = Math.max(Math.trunc(Number(paga) || 0), 0);
  return pagato + (fissa ? SOGLIA_FISSA : 0);
}

/* ------------------------------------------------------------------ */
/*  I tre cerchi delle Sfere                                           */
/* ------------------------------------------------------------------ */

/**
 * Il cerchio di ogni Sfera: «t» se la usa un mago al tavolo, «n» se la ha un
 * nemico in scena con la Magick accesa, «f» se fuori. Il tavolo vince sul nemico.
 */
export function cerchiDelleSfere({ alTavolo = [], delNemico = [] } = {}) {
  const tavolo = new Set(alTavolo);
  const nemico = new Set(delNemico);
  return Object.fromEntries(MENU_SFERE.map((sfera) => [sfera.id, tavolo.has(sfera.id) ? "t" : nemico.has(sfera.id) ? "n" : "f"]));
}

/* ------------------------------------------------------------------ */
/*  Gli incantesimi della Sfera e la finestra del lancio               */
/* ------------------------------------------------------------------ */

function normale(testo) {
  return String(testo ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/** Le Formule che si lanciano con la Sfera (quelle che l'hanno fra gli Accessi), filtrate dalla cerca. */
export function formuleDellaSfera(sferaId, cerca = "") {
  const filtro = normale(cerca).trim();
  return FORMULE_M6
    .filter((formula) => formula.access.includes(sferaId))
    .filter((formula) => !filtro || normale(`${formula.name} ${formula.bySphere?.[sferaId] ?? ""} ${formula.intro}`).includes(filtro))
    .map((formula) => ({
      id: formula.id,
      nome: formula.name,
      per: formula.bySphere?.[sferaId] ?? "",
      intro: formula.intro,
      soglia: formula.thresholdText,
      limite: formula.limit,
      ambiti: { ...(formula.thresholds?.[0]?.scopes ?? {}) }
    }));
}

export function formulaM6(id) {
  const formula = FORMULE_M6.find((f) => f.id === id);
  return formula ?? null;
}

/** I livelli della finestra del lancio: l'Epicità da 1 a 7, gli altri da 0 a 7. */
export function ambitiNuovi(pre = {}) {
  const livelli = Object.fromEntries(AMBITI_LANCIO.map((id) => [id, 0]));
  livelli.epic = 1;
  for (const [id, valore] of Object.entries(pre ?? {})) {
    if (id in livelli) livelli[id] = Math.min(Math.max(Math.trunc(Number(valore) || 0), 0), LIVELLO_MAX);
  }
  livelli.epic = Math.max(livelli.epic, 1);
  return livelli;
}

/** Un pallino toccato: l'Epicità non scende sotto 1; un Ambito ritoccato torna a 0; il quarto Ambito sopra lo 0 non entra. */
export function toccaAmbito(livelli, id, n) {
  const next = { ...ambitiNuovi(livelli) };
  const valore = Math.min(Math.max(Math.trunc(Number(n) || 0), 0), LIVELLO_MAX);
  if (!(id in next)) return { livelli: next, rifiutato: false };
  if (id === "epic") {
    next.epic = Math.max(valore, 1);
    return { livelli: next, rifiutato: false };
  }
  if (next[id] === valore) {
    next[id] = 0;
    return { livelli: next, rifiutato: false };
  }
  const alzati = AMBITI_LANCIO.filter((a) => a !== "epic" && a !== id && next[a] > 0).length;
  if (next[id] === 0 && alzati >= AMBITI_MAX) return { livelli: next, rifiutato: true };
  next[id] = valore;
  return { livelli: next, rifiutato: false };
}

/** Le parole degli Ambiti usati, per la carta: «Epicità 2 · Durata 1». */
export function riassuntoAmbiti(livelli, localize = (k) => k) {
  const l = ambitiNuovi(livelli);
  return AMBITI_LANCIO
    .filter((id) => id === "epic" || l[id] > 0)
    .map((id) => `${localize(`WOD5E_MAGE.Scopes.${id}`)} ${l[id]}`)
    .join(" · ");
}

/* ------------------------------------------------------------------ */
/*  Il disegno                                                         */
/* ------------------------------------------------------------------ */

/** La rotazione più vicina a quella di adesso che porta l'angolo voluto. */
export function piuVicina(corrente, voluta) {
  const delta = ((((voluta - corrente) % 360) + 540) % 360) - 180;
  return corrente + delta;
}

/** La rotazione che porta la Sfera i a destra, sulla linea (l'anello parte con Corrispondenza in alto, in senso orario). */
export function rotazionePer(i) {
  return 90 - 40 * i;
}

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const r2 = (v) => Math.round(v * 100) / 100;

/** Le misure di base, a scala 1, quando la Sfera è scelta. */
export const MISURE = Object.freeze({ R: 128, nodo: 60, scelta: 84, mozzo: 96, dx: 150, dy: 98, lato: 70, raggio: 250, mossa: 54, base: 86, mozzoBase: 160 });
/** La larghezza in pixel del nome più lungo del ventaglio, a 16 px (Nemeya Bold). */
export const NOME_PIU_LUNGO = 184;

/**
 * Il disegno del menù per la grandezza del palco: dove sta il centro
 * dell'anello, il raggio, le misure dei nodi, dove si apre il ventaglio. Con
 * la Sfera scelta il pannello prende la destra (o il fondo, sotto i 900 px).
 */
export function disegno({ W = 1280, H = 760, sfera = null, lato = null, riga = null, rot = 0 } = {}) {
  const largo = W >= 900;
  const focus = sfera !== null && sfera !== undefined;
  const P = largo ? Math.round(clamp(W * 0.28, 300, 420)) : W;
  const foglio = largo ? H : Math.round(H * (riga ? 0.62 : 0.36));
  const aW = focus && largo ? W - P : W;
  const aH = focus && !largo ? H - foglio : H;
  const M = MISURE;
  const A = M.R + M.nodo / 2 + M.R + M.dx + M.raggio + M.mossa / 2 + 10;
  let kW = (aW - 48) / (A + NOME_PIU_LUNGO);
  if (kW < 13 / 16) kW = (aW - 48 - (NOME_PIU_LUNGO * 13) / 16) / A;
  const kH = (aH / 2 - 16) / 232;
  const stretto = focus && Math.min(1, kW, kH) < 0.5;
  let cx;
  let cy;
  let R;
  let k = 1;
  let nodo;
  let scelta;
  let mozzo;
  if (!focus) {
    R = clamp(Math.min(aW, aH) * 0.31, 100, 250);
    nodo = clamp(R * 0.36, 50, 86);
    scelta = nodo;
    mozzo = clamp(R * 0.62, 92, 160);
    cx = aW / 2;
    cy = aH / 2;
  } else {
    const wuc = M.scelta / 2 + M.dx + M.raggio + M.mossa / 2 + 8;
    k = stretto ? Math.min(1, (aW - 24) / wuc, kH) : Math.min(1, kW, kH);
    k = Math.max(k, 0.4);
    R = M.R * k;
    nodo = M.nodo * k;
    scelta = M.scelta * k;
    mozzo = M.mozzo * k;
    const nomi = Math.max(13, Math.round(16 * k));
    const wpx = stretto ? wuc * k : A * k + (NOME_PIU_LUNGO * nomi) / 16;
    const sinistra = Math.max(stretto ? 12 : 24, (aW - wpx) / 2);
    cx = stretto ? sinistra + (M.scelta / 2) * k - R : sinistra + (M.R + M.nodo / 2) * k;
    cy = aH / 2;
  }
  const sx = cx + R;
  return {
    largo, focus, stretto, k, P, foglio, aW, aH,
    cx: r2(cx), cy: r2(cy), R: r2(R), rot,
    nodo: r2(nodo), scelta: r2(scelta), mozzo: r2(mozzo),
    sx: r2(sx), sy: r2(cy),
    mx: r2(sx + M.dx * k), my: r2(cy),
    lato: r2(M.lato * k), mossa: r2(M.mossa * k), raggio: r2(M.raggio * k),
    nomi: !stretto, nomiPx: Math.max(13, Math.round(16 * k))
  };
}

/** Dove sta la Sfera i dell'anello sul palco, col raggio del nodo. */
export function posizioneSfera(d, i, sceltaIndice = null) {
  const a = ((-90 + 40 * i + d.rot) * Math.PI) / 180;
  const r = (d.focus && sceltaIndice === i ? d.scelta : d.nodo) / 2;
  return { x: d.cx + d.R * Math.cos(a), y: d.cy + d.R * Math.sin(a), r };
}

/** I due lati: quello scelto va sulla linea, l'altro si sposta di lato, più piccolo. */
export function posizioniLati(d, latoScelto = null) {
  return LATI.map((lato) => {
    const segno = lato === "n" ? -1 : 1;
    const scelto = latoScelto === lato;
    const altro = Boolean(latoScelto) && !scelto;
    let x = MISURE.dx * d.k;
    let y = segno * MISURE.dy * d.k;
    let scala = 1;
    if (scelto) y = 0;
    else if (altro) {
      x = MISURE.dx * 0.62 * d.k;
      y = segno * MISURE.dy * 1.15 * d.k;
      scala = 0.8;
    }
    const r = (d.lato / 2) * scala;
    const dist = Math.hypot(x, y);
    return {
      lato, scelto, altro, x: r2(x), y: r2(y), r: r2(r),
      angolo: r2((Math.atan2(y, x) * 180) / Math.PI),
      inizio: r2(d.scelta / 2 + 6),
      lunghezza: r2(Math.max(0, dist - d.scelta / 2 - r - 12))
    };
  });
}

/** Il ventaglio: n mosse su un arco di raggio fisso, centrato sulla linea, al massimo 104 gradi, un passo fino a 17. */
export function posizioniVentaglio(d, n) {
  const passo = n > 1 ? Math.min(17, 104 / (n - 1)) : 0;
  const rLato = d.lato / 2;
  const rMossa = d.mossa / 2;
  return Array.from({ length: n }, (_, j) => {
    const phi = (j - (n - 1) / 2) * passo;
    const rad = (phi * Math.PI) / 180;
    return {
      x: r2(d.raggio * Math.cos(rad)), y: r2(d.raggio * Math.sin(rad)), angolo: r2(phi),
      inizio: r2(rLato + 6), lunghezza: r2(Math.max(0, d.raggio - rLato - rMossa - 12))
    };
  });
}

/** Il lato dove sta il nome al passaggio del mouse, per la Sfera all'angolo dato. */
export function latoEtichetta(angoloAssoluto) {
  const a = (((angoloAssoluto % 360) + 360) % 360) * (Math.PI / 180);
  const c = Math.cos(a);
  const s = Math.sin(a);
  if (c > 0.45) return "r";
  if (c < -0.45) return "l";
  return s > 0 ? "b" : "t";
}

/** I pallini della riserva nella spesa: i primi «paga» si spendono (vuoti), gli altri restano. Oltre 20 si dice il numero e basta. */
export function palliniRiserva(riserva, paga) {
  const n = Math.max(Math.trunc(Number(riserva) || 0), 0);
  if (!n || n > 20) return [];
  const p = Math.max(Math.trunc(Number(paga) || 0), 0);
  return Array.from({ length: n }, (_, i) => i < p);
}

/** La chiave del turno di combattimento: una spesa del lato Combattimento per turno. */
export function chiaveTurno(combat) {
  if (!combat?.started) return "";
  return `${combat.id ?? ""}:${Math.trunc(Number(combat.round) || 0)}:${Math.trunc(Number(combat.turn) || 0)}`;
}

/* ------------------------------------------------------------------ */
/*  La spesa: la carta in chat, il fatto fissato, l'effetto sul mago   */
/* ------------------------------------------------------------------ */

function esc(valore) {
  return String(valore ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/**
 * La carta «Il Paradosso agisce» per la chat, con le righe del pop-up: la
 * Sfera e il lato, su chi, chi la fa, l'effetto, la soglia per scardinarla, la
 * durata. La nota è del Narratore («una riga per te»): sta solo nella carta
 * nascosta, che vedono i Narratori.
 */
export function cartaMossa(spesa = {}, { nascosta = false, localize = (k) => k } = {}) {
  const L = (k) => localize(`WOD5E_MAGE.MenuCircolare.${k}`);
  const riga = (chiave, valore, classe = "") => `<div class="wod5e-mage-roll-row${classe ? ` ${classe}` : ""}"><b class="wod5e-mage-roll-key">${esc(chiave)}</b><span class="wod5e-mage-roll-value">${esc(valore)}</span></div>`;
  const lato = LATI.includes(spesa.lato) ? L(`Lati.${spesa.lato}`) : "";
  const rows = [riga(L("Carta.sfera"), [spesa.sferaNome, lato].filter(Boolean).join(" · "))];
  if (spesa.suChi?.nome) rows.push(riga(L("Carta.suChi"), spesa.suChi.nome));
  if (spesa.da?.nome) rows.push(riga(L("Carta.da"), spesa.da.nome));
  if (spesa.testo) rows.push(riga(L("Carta.effetto"), spesa.testo));
  rows.push(riga(L("Carta.soglia"), String(spesa.soglia ?? "")));
  if (spesa.durataTesto) rows.push(riga(L("Carta.durata"), spesa.durataTesto));
  if (spesa.fissa) rows.push(`<p class="wod5e-mage-mc-carta-fissa">${esc(L("Carta.fissato"))}</p>`);
  if (nascosta && spesa.nota) rows.push(riga(L("Carta.nota"), spesa.nota));
  return `<div class="wod5e-mage-paradosso-card wod5e-mage-menu-card wod5e-mage-mc-carta"><p class="wod5e-mage-roll-victory wod5e-mage-paradosso-banner">${esc(L("Pop.titolo"))} · ${esc(spesa.nome)}</p><div class="wod5e-mage-roll-card">${rows.join("")}</div></div>`;
}

/** Il fatto fissato che la spesa lascia nel mondo: resta con la sua soglia finché non lo scardinano. */
export function fattoFissato(spesa = {}, { id = "", scena = 0 } = {}) {
  const quando = Number(spesa.quando) || Date.now();
  return {
    id: String(id || `${spesa.riga || "fatto"}-${quando}`),
    nome: String(spesa.nome ?? ""),
    sfera: String(spesa.sfera ?? ""),
    sferaNome: String(spesa.sferaNome ?? ""),
    soglia: Math.max(Math.trunc(Number(spesa.soglia) || 0), 0),
    da: String(spesa.da?.nome ?? ""),
    scena: Math.max(Math.trunc(Number(scena) || 0), 0),
    quando
  };
}

/**
 * La durata dell'effetto sul mago, nei tempi del Quadro: la scena; «più a
 * lungo» fino alla fine della sessione; quello che dura quanto dice la riga o
 * l'incantesimo si chiude col Cambio scena, e il Narratore lo toglie prima a mano.
 */
export function durataAddosso(durata) {
  return durata === "lunga" ? "sessione" : "scena";
}

/** La voce che recordAddosso vuole, fatta dalla spesa del menù circolare. */
export function voceAddosso(spesa = {}) {
  return {
    id: String(spesa.riga || spesa.nome || "mossa"),
    nome: String(spesa.nome ?? ""),
    famiglia: String(spesa.sfera ?? ""),
    modo: "immediato",
    durata: durataAddosso(spesa.durata),
    effetto: String(spesa.testo ?? "")
  };
}
