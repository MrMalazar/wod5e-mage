// Le Formule e i poteri del modulo si generano dai dati, non si scrivono a mano
// (Blue, 24/9: il testo delle matrici e il libretto dei poteri restano il
// sorgente). I due JSON in tools/dati/ vengono da esporta_json.py (cartella
// delle matrici); questo attrezzo li trasforma in scripts/data/formule.js e
// scripts/data/poteri.js. Dal 30/9 il catalogo dei poteri prende sopra il
// rifacimento deciso (tools/dati/rifacimento.json, dalla pagina «Poteri delle
// Sfere»). Uso: node tools/genera-dati.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const qui = path.dirname(fileURLToPath(import.meta.url));
const radice = path.resolve(qui, "..");
const leggi = (nome) => JSON.parse(readFileSync(path.join(qui, "dati", nome), "utf8"));
const formule = leggi("formule.json");
const poteri = leggi("poteri.json");
// Gli effetti sul tiro (tappa 3): scritti a mano, potere per potere, in effetti_poteri.json.
const effetti = leggi("effetti_poteri.json");
const prerequisiti = leggi("prerequisiti_poteri.json");
// Il rifacimento dei poteri (Blue, 28/9: un attivo con un costo, un passivo con una cadenza), la parte
// decisa (30/9: «carica tutte quelle che abbiamo approvato e deciso su Foundry»): viene dalla pagina
// «Poteri delle Sfere» e si unisce qui al catalogo del libretto.
const rifacimento = leggi("rifacimento.json");

const SFERE = ["correspondence", "entropy", "forces", "life", "matter", "mind", "prime", "spirit", "time"];
const AMBITI = ["targets", "conditions", "duration", "range", "potency", "precision"];
const GANCI = ["dice", "threshold", "successFrom", "autoSuccess", "freeScope", "quintessenceOnSkills", "prizeDouble", "nota"];
const TIRI = ["magick", "abilita", "any"];
const MODI = ["passivo", "attivo"];
const CONDIZIONI = ["saluteMeta", "abilita1", "dadi1", "dadi2", "incantesimoScelto", "abilitaScelta", "potenza3"];
const SCELTE = ["ambito", "abilita", "incantesimo"];

// Le Formule vecchie (ramo B, effetti.js) che oggi stanno in una matrice fusa,
// o hanno cambiato nome: così le righe degli effetti trovano la matrice.
const ALIAS = {
  accelerare: "accelerare-e-rallentare",
  rallentare: "accelerare-e-rallentare",
  benedire: "benedire-e-maledire",
  maledire: "benedire-e-maledire",
  aprire: "aprire-e-bloccare",
  bloccare: "aprire-e-bloccare",
  creare: "creare-e-distruggere",
  distruggere: "creare-e-distruggere",
  invulnerabilita: "invulnerabilita"
};

/* ------------------------------------------------------------------ */
/* Il rifacimento deciso (30/9). Le voci di rifacimento.json sono scritte */
/* come nella pagina: grado, prerequisiti in parole, accesso e amalgama  */
/* in parole, attivo { costo, testo, con }, passivo { cadenza, testo,    */
/* con }, paradosso. Qui diventano voci del catalogo come le altre, più  */
/* il costo dell'attivo e la cadenza del passivo scritti per esteso.     */
/* ------------------------------------------------------------------ */

const NOMI_A_ID = { corrispondenza: "correspondence", entropia: "entropy", forza: "forces", forze: "forces", vita: "life", materia: "matter", mente: "mind", primordio: "prime", spirito: "spirit", tempo: "time" };

/** Le Sfere nominate in un testo («Mente, Vita o Spirito», «Vita e Mente»), come id, nell'ordine del testo; nessuna per «Qualsiasi». */
function sfereDelTesto(t) {
  const trovate = [...String(t ?? "").matchAll(/Corrispondenza|Entropia|Forza|Materia|Mente|Primordio|Spirito|Tempo|Vita/g)].map((m) => NOMI_A_ID[m[0].toLowerCase()]);
  return [...new Set(trovate)];
}

/** I prerequisiti scritti in parole: «nessuno», o «N poteri conosciuti in …» (tanti poteri della Sfera da cui lo si prende). */
function prerequisitiDelTesto(t, id) {
  const s = String(t ?? "").trim();
  if (!s || s === "nessuno") return null;
  const m = s.match(/^(\d+) poter[ei] conosciut[oi] in /);
  if (!m) throw new Error(`rifacimento, ${id}: prerequisiti che non so leggere («${s}»)`);
  return [{ numero: Number(m[1]) }];
}

/**
 * Il costo dell'attivo scritto per esteso, letto per il tasto «Usa»: `fisso` è la Quintessenza che il
 * modulo scala da solo («2 Quintessenza», anche «2 Quintessenza e 2 Paradosso»: il Paradosso lo segna
 * il tavolo); `variabile` ({ min, max }, max 0 = senza tetto) quando la Quintessenza cambia di volta in
 * volta e la sceglie chi usa il potere; `uses` il limite d'uso scritto nel costo («una volta per scena»).
 */
function costoDelTesto(t) {
  const s = String(t ?? "").trim();
  let fisso = 0;
  let variabile = null;
  const m = s.match(/^(\d+) Quintessenza(?: e \d+ Paradosso)?$/);
  if (m) fisso = Number(m[1]);
  else if (/Quintessenza/.test(s)) {
    const da = s.match(/^da (\d+) a (\d+) Quintessenza$/);
    const tre = s.match(/^(\d+), (\d+) o (\d+) Quintessenza$/);
    const base = s.match(/^(\d+) Quintessenza\b/);
    if (da) variabile = { min: Number(da[1]), max: Number(da[2]) };
    else if (tre) variabile = { min: Number(tre[1]), max: Number(tre[3]) };
    else if (base) variabile = { min: Number(base[1]), max: 0 };
    else variabile = { min: 0, max: 0 };
  }
  // «Una volta per cronaca» (Il ritorno, 1/10) si conta come «campagna», il periodo che il modulo riarma solo a mano.
  const per = /una volta per scena/i.test(s) ? "scena" : /una volta per sessione/i.test(s) ? "sessione" : /una volta per cronaca/i.test(s) ? "campagna" : "";
  return { fisso, variabile, uses: per ? { per, n: 1 } : null };
}

/** Un effetto rifatto (attivo o passivo) come sezione del catalogo: il testo, e le righe d'Amalgama («Con Sfera») sotto. */
function sezioneRifatta(e) {
  return { text: String(e.testo ?? "").trim(), rows: (e.con ?? []).map((c) => ({ spheres: [...c.s], text: String(c.t ?? "").trim(), con: true })), none: false };
}

/** Una voce rifatta (o aggiunta) nel formato del catalogo; `base` è la voce del libretto (null per gli aggiunti). */
function vocedelRifacimento(id, r, base = null) {
  const accessoTesto = r.accesso ?? base?.accessText ?? "";
  const access = r.accesso !== undefined ? sfereDelTesto(r.accesso) : [...(base?.access ?? [])];
  if (r.accesso !== undefined && !access.length && r.accesso !== "Qualsiasi") throw new Error(`rifacimento, ${id}: accesso che non so leggere («${r.accesso}»)`);
  const amalgama = String(r.amalgama ?? "nessuna").trim();
  const costo = costoDelTesto(r.attivo.costo);
  return {
    ...(base ?? { formula: null, formulaName: "", link: "", grimorioEffect: "", note: "", hooks: [], effects: [] }),
    id,
    name: r.nome ?? base?.name,
    page: r.pagina ?? base?.page,
    flavor: r.flavour ?? base?.flavor ?? "",
    level: r.grado,
    access,
    accessText: accessoTesto,
    amalgams: amalgama === "nessuna" ? [] : sfereDelTesto(amalgama),
    amalgamsText: amalgama === "nessuna" ? "" : amalgama,
    active: sezioneRifatta(r.attivo),
    passive: sezioneRifatta(r.passivo),
    amalgam: { text: "", rows: [], none: true },
    paradox: String(r.paradosso ?? "").trim(),
    cost: costo.fisso,
    kind: "attivo e passivo",
    uses: costo.uses,
    // Il rifacimento (28/9): il costo dell'attivo e la cadenza del passivo, scritti come nella pagina.
    rifatto: true,
    costoAttivo: String(r.attivo.costo).trim(),
    cadenzaPassivo: String(r.passivo.cadenza).trim(),
    costoVariabile: costo.variabile,
    prerequisitiRifatti: prerequisitiDelTesto(r.prerequisiti, id)
  };
}

/** Un ritocco (29/9) su una riga del catalogo: la parte, le Sfere della riga, il testo di prima e quello nuovo. */
function conRitocchi(p, righe) {
  const sezioni = { attivo: "active", passivo: "passive", amalgama: "amalgam" };
  const q = structuredClone(p);
  for (const r of righe) {
    const s = q[sezioni[r.parte]];
    if (!s) throw new Error(`ritocchi, ${p.id}: parte sconosciuta ${r.parte}`);
    const stesse = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);
    if (!r.s.length && s.text === r.da) { s.text = r.a; continue; }
    const riga = s.rows.find((x) => stesse(x.spheres, r.s) && x.text === r.da);
    if (!riga) throw new Error(`ritocchi, ${p.id}: la riga «${r.da.slice(0, 50)}…» non c'è più nel catalogo`);
    riga.text = r.a;
  }
  return q;
}

/**
 * Il catalogo intero: il libretto (poteri.json) col rifacimento deciso sopra. I rifatti prendono il
 * posto della voce con lo stesso id, i tolti escono, i ritocchi cambiano la loro riga, gli aggiunti
 * entrano dopo l'ultima voce della loro pagina.
 */
function unisciRifacimento(libretto, rif) {
  const perId = new Map(libretto.map((p) => [p.id, p]));
  for (const id of [...Object.keys(rif.poteri), ...Object.keys(rif.tolti), ...Object.keys(rif.ritocchi?.poteri ?? {})]) {
    if (!perId.has(id)) throw new Error(`rifacimento: ${id} non è nel catalogo`);
  }
  for (const id of Object.keys(rif.aggiunti)) if (perId.has(id)) throw new Error(`rifacimento: l'aggiunto ${id} ha l'id di un potere del catalogo`);
  const lista = [];
  for (const p of libretto) {
    if (rif.tolti[p.id]) continue;
    if (rif.poteri[p.id]) lista.push(vocedelRifacimento(p.id, rif.poteri[p.id], p));
    else if (rif.ritocchi?.poteri?.[p.id]) lista.push(conRitocchi(p, rif.ritocchi.poteri[p.id]));
    else lista.push(p);
  }
  for (const [id, r] of Object.entries(rif.aggiunti)) {
    const voce = vocedelRifacimento(id, r);
    let dove = -1;
    lista.forEach((p, i) => { if (p.page === voce.page) dove = i; });
    lista.splice(dove < 0 ? lista.length : dove + 1, 0, voce);
  }
  const nomi = new Set();
  for (const p of lista) {
    if (nomi.has(p.name)) throw new Error(`catalogo: due poteri col nome ${p.name}`);
    nomi.add(p.name);
  }
  return lista;
}

const catalogo = unisciRifacimento(poteri.poteri, rifacimento);
const idCatalogo = new Set(catalogo.map((p) => p.id));
// I poteri tolti escono anche dalle Formule che li elencavano.
for (const f of formule.formule) f.powers = f.powers.filter((id) => idCatalogo.has(id) || !rifacimento.tolti[id]);

function controlla() {
  const idPoteri = idCatalogo;
  for (const f of formule.formule) {
    for (const s of [...f.access, ...f.amalgams]) if (!SFERE.includes(s)) throw new Error(`${f.name}: Sfera sconosciuta ${s}`);
    for (const t of f.thresholds) {
      for (const [k, v] of Object.entries(t.scopes)) if (!AMBITI.includes(k) || v < 0 || v > 7) throw new Error(`${f.name}: Ambito ${k} ${v}`);
      if (Object.values(t.scopes).reduce((a, b) => a + b, 0) !== t.base) throw new Error(`${f.name}: la soglia non torna`);
    }
    for (const p of f.powers) if (!idPoteri.has(p)) throw new Error(`${f.name}: potere ${p} non trovato`);
  }
  const idFormule = new Set(formule.formule.map((f) => f.id));
  for (const p of catalogo) {
    if (p.formula && !idFormule.has(p.formula)) throw new Error(`${p.name}: Formula ${p.formula} non trovata`);
    for (const s of [...p.access, ...p.amalgams]) if (s !== "any" && !SFERE.includes(s)) throw new Error(`${p.name}: Sfera sconosciuta ${s}`);
    if (p.rifatto) {
      if (!Number.isInteger(p.level) || p.level < 1 || p.level > 5) throw new Error(`${p.name}: grado ${p.level}`);
      if (!p.costoAttivo || !p.cadenzaPassivo) throw new Error(`${p.name}: manca il costo dell'attivo o la cadenza del passivo`);
      if (/[()]/.test(p.costoAttivo + p.cadenzaPassivo)) throw new Error(`${p.name}: parentesi nel costo o nella cadenza (le usa il testo a blocchi)`);
    }
  }
  controllaEffetti();
  controllaPrerequisiti();
}

/**
 * I prerequisiti d'acquisto (25/9; 25/9 sera: una riga per condizione): per
 * ogni potere una lista di condizioni, ciascuna con un campo solo: `numero`
 * (intero da 1 in su: tanti poteri della stessa Sfera), `potere` (l'id di un
 * potere che esiste e non è il potere stesso), `testo` (una condizione che
 * giudica il tavolo, scritta com'è).
 */
function controllaPrerequisiti() {
  const idPoteri = idCatalogo;
  for (const [id, lista] of Object.entries(prerequisitiDelCatalogo())) {
    if (!idPoteri.has(id)) throw new Error(`prerequisiti: potere ${id} non trovato`);
    if (!Array.isArray(lista) || !lista.length) throw new Error(`prerequisiti di ${id}: serve una lista di condizioni, una per riga`);
    for (const condizione of lista) {
      const chiavi = Object.keys(condizione ?? {});
      if (chiavi.length !== 1 || !["numero", "potere", "testo"].includes(chiavi[0])) throw new Error(`prerequisiti di ${id}: ogni condizione ha un campo solo fra numero, potere e testo (${chiavi.join(", ")})`);
      if (condizione.numero !== undefined && (!Number.isInteger(condizione.numero) || condizione.numero < 1)) throw new Error(`prerequisiti di ${id}: numero ${condizione.numero}`);
      if (condizione.potere !== undefined) {
        if (!idPoteri.has(condizione.potere)) throw new Error(`prerequisiti di ${id}: potere ${condizione.potere} non trovato`);
        if (condizione.potere === id) throw new Error(`prerequisiti di ${id}: richiede se stesso`);
      }
      if (condizione.testo !== undefined && !String(condizione.testo).trim()) throw new Error(`prerequisiti di ${id}: testo vuoto`);
    }
  }
}

/**
 * I prerequisiti di ogni potere: quelli scritti in prerequisiti_poteri.json, o quelli del rifacimento
 * (30/9: il grado N chiede N-1 poteri conosciuti nella Sfera). Il file scritto a mano vince.
 */
function prerequisitiDelCatalogo() {
  const tutti = {};
  for (const p of catalogo) if (p.prerequisitiRifatti) tutti[p.id] = p.prerequisitiRifatti;
  return { ...tutti, ...prerequisiti.prerequisiti };
}

/** Il testo intero di un potere, con gli spazi normalizzati: per cercare le note. */
function testoPiatto(p) {
  return testoPotere(p).replace(/\s+/g, " ");
}

/**
 * Gli effetti scritti a mano: il potere esiste, i ganci sono quelli previsti,
 * la nota è una frase del testo del potere (nessuna regola inventata), le
 * Sfere e gli Ambiti esistono, la scelta ha un tipo previsto.
 */
function controllaEffetti() {
  const perId = new Map(catalogo.map((p) => [p.id, p]));
  for (const [id, lista] of Object.entries(effetti.effetti)) {
    const p = perId.get(id);
    if (!p) throw new Error(`effetti: potere ${id} non trovato`);
    if (!Array.isArray(lista) || !lista.length) throw new Error(`${p.name}: effetti vuoti`);
    const testo = testoPiatto(p);
    for (const e of lista) {
      if (!GANCI.includes(e.on)) throw new Error(`${p.name}: gancio sconosciuto ${e.on}`);
      if (e.roll !== undefined && !TIRI.includes(e.roll)) throw new Error(`${p.name}: tiro sconosciuto ${e.roll}`);
      if (e.mode !== undefined && !MODI.includes(e.mode)) throw new Error(`${p.name}: modo sconosciuto ${e.mode}`);
      for (const w of [].concat(e.when ?? [])) if (!CONDIZIONI.includes(w)) throw new Error(`${p.name}: condizione sconosciuta ${w}`);
      for (const s of [].concat(e.requires ?? [])) if (!SFERE.includes(s)) throw new Error(`${p.name}: Sfera richiesta sconosciuta ${s}`);
      if (e.on === "freeScope" && e.scope !== "scelta" && !AMBITI.includes(e.scope)) throw new Error(`${p.name}: Ambito sconosciuto ${e.scope}`);
      if (e.value !== undefined && typeof e.value !== "number") {
        if (!["poteri", "sfere"].includes(e.value?.from)) throw new Error(`${p.name}: valore sconosciuto ${JSON.stringify(e.value)}`);
        if (e.value.sphere !== undefined && !SFERE.includes(e.value.sphere)) throw new Error(`${p.name}: Sfera del valore sconosciuta ${e.value.sphere}`);
      }
      if (typeof e.nota !== "string" || !e.nota.trim()) throw new Error(`${p.name}: manca la nota`);
      if (!testo.includes(e.nota.replace(/\s+/g, " "))) throw new Error(`${p.name}: la nota non sta nel testo del potere: «${e.nota}»`);
    }
  }
  for (const [id, scelta] of Object.entries(effetti.scelte)) {
    const p = perId.get(id);
    if (!p) throw new Error(`scelte: potere ${id} non trovato`);
    if (!SCELTE.includes(scelta.kind)) throw new Error(`${p.name}: scelta sconosciuta ${scelta.kind}`);
    if (scelta.kind === "ambito") {
      for (const [s, ambiti] of Object.entries(scelta.options ?? {})) {
        if (!SFERE.includes(s)) throw new Error(`${p.name}: Sfera della scelta sconosciuta ${s}`);
        for (const a of ambiti) if (!AMBITI.includes(a)) throw new Error(`${p.name}: Ambito della scelta sconosciuto ${a}`);
      }
    }
  }
}

/** Una riga di sezione: «Accesso con X: …», «Con X: …» per le righe d'Amalgama del rifacimento, o il testo com'è. */
function rigaDiSezione(r, prefisso = "Accesso con") {
  if (!r.spheres.length) return r.text;
  return `${r.con ? "Con" : prefisso} ${r.spheres.map(nomeSfera).join(" + ")}: ${r.text}`;
}

/**
 * Il testo intero di un potere per la scheda: le tre sezioni, una riga per «Accesso con». Nei poteri
 * rifatti (30/9) il titolo porta fra parentesi il costo dell'attivo e la cadenza del passivo
 * («Effetto attivo (1 Quintessenza): …», «Effetto passivo (Sempre): …»).
 */
function testoPotere(p) {
  const blocchi = [];
  const sezione = (titolo, s, misura = "") => {
    if (s.none) return;
    const righe = [s.text, ...s.rows.map((r) => rigaDiSezione(r))].filter(Boolean);
    if (righe.length) blocchi.push(`${titolo}${misura ? ` (${misura})` : ""}: ${righe.join("\n")}`);
  };
  sezione("Effetto attivo", p.active, p.costoAttivo);
  sezione("Effetto passivo", p.passive, p.cadenzaPassivo);
  sezione("Effetto Amalgama", p.amalgam);
  return blocchi.join("\n\n");
}

/**
 * Il testo di una sezione sola (Blue, 27/9: il potere si legge in quattro parti,
 * Grado, Prerequisiti, Effetto attivo, Effetto passivo): le righe con «Accesso
 * con» (o «Con», per l'Amalgama) davanti alla Sfera; vuoto se la sezione non c'è.
 */
function testoSezione(s, prefisso = "Accesso con") {
  if (!s || s.none) return "";
  return [s.text, ...s.rows.map((r) => rigaDiSezione(r, prefisso))].filter(Boolean).join("\n");
}

const NOMI_SFERE = { correspondence: "Corrispondenza", entropy: "Entropia", forces: "Forza", life: "Vita", matter: "Materia", mind: "Mente", prime: "Primordio", spirit: "Spirito", time: "Tempo", any: "Qualsiasi" };
function nomeSfera(id) { return NOMI_SFERE[id] ?? id; }

function scrivi(nome, testa, nomeCostante, dati, coda = "") {
  const corpo = JSON.stringify(dati, null, 2);
  writeFileSync(path.join(radice, "scripts", "data", nome), `${testa}\nexport const ${nomeCostante} = Object.freeze(${corpo});\n${coda}`, "utf8");
}

controlla();

scrivi("formule.js",
  `// GENERATO da tools/genera-dati.mjs (sorgente: tools/dati/formule.json, dal testo delle matrici del ${formule.generated}).\n// Non si scrive a mano: si corregge il testo, si rifà l'esportazione e si rilancia l'attrezzo.\n// Le 48 matrici (Blue, 24/9): Accesso, Amalgame, Descrizione per Sfera, Limite, soglia base come Ambiti, «In genere», i poteri legati.`,
  "FORMULE_M6",
  formule.formule.map((f) => ({
    id: f.id, name: f.name, access: f.access, amalgams: f.amalgams, amalgamsNote: f.amalgamsNote,
    intro: f.intro, bySphere: f.bySphere, coda: f.coda, limit: f.limit,
    thresholds: f.thresholds, thresholdText: f.thresholdText, use: f.use,
    powers: f.powers, newPowers: f.newPowers, byBlue: f.byBlue
  })),
  `\n/** Le Formule di ieri (ramo B) che oggi hanno un altro id: le righe degli effetti le cercano qui. */\nexport const FORMULE_ALIAS = Object.freeze(${JSON.stringify(ALIAS, null, 2)});\n`);

/** Un'impronta corta di un valore (FNV-1a a 32 bit sul JSON): la stessa che calcola scripts/poteri-allinea.js. */
function impronta(valore) {
  const t = JSON.stringify(valore ?? null);
  let h = 0x811c9dc5;
  for (let i = 0; i < t.length; i += 1) {
    h ^= t.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

const vociPoteri = catalogo.map((p) => ({
  id: p.id,
  spheres: p.access.length ? p.access : ["any"],
  name: p.name,
  dot: p.level,
  type: p.kind === "attivo e passivo" ? "attivo" : p.kind,
  kind: p.kind,
  text: testoPotere(p),
  // Le quattro parti (27/9): l'attivo, il passivo e l'Amalgama separati; il grado è `dot`, i prerequisiti stanno sotto.
  attivo: testoSezione(p.active),
  passivo: testoSezione(p.passive),
  amalgama: testoSezione(p.amalgam, "Con"),
  amalgam: p.amalgams[0] ?? "",
  amalgams: p.amalgams,
  amalgamText: p.amalgam.none ? "" : [p.amalgam.text, ...p.amalgam.rows.map((r) => rigaDiSezione(r))].filter(Boolean).join("\n"),
  flavor: p.flavor,
  // Nei poteri rifatti il costo è quello scritto (anche «da 1 a 3 Quintessenza», «Azione»); `costValue` la Quintessenza che si scala da sola.
  cost: p.rifatto ? p.costoAttivo : (p.cost ? `${p.cost} Quintessenza` : ""),
  costValue: p.cost,
  uses: p.uses,
  paradox: p.paradox,
  formula: p.formula,
  formulaName: p.formulaName,
  link: p.link,
  page: p.page,
  hooks: p.hooks,
  effects: effetti.effetti[p.id] ?? [],
  scelta: effetti.scelte[p.id] ?? null,
  prerequisiti: prerequisitiDelCatalogo()[p.id] ?? null,
  rifatto: Boolean(p.rifatto),
  costoAttivo: p.costoAttivo ?? "",
  cadenzaPassivo: p.cadenzaPassivo ?? "",
  costoVariabile: p.costoVariabile ?? null
}));

// I poteri tolti dal rifacimento (per le schede che li hanno ancora: la riga resta, col segno «Tolto»)
// e l'impronta del catalogo (quando cambia, al primo avvio il Narratore riallinea le schede: poteri-allinea.js).
const tolti = Object.fromEntries(Object.entries(rifacimento.tolti).map(([id, t]) => [id, { name: poteri.poteri.find((p) => p.id === id)?.name ?? id, data: t.data, motivo: t.motivo }]));
scrivi("poteri.js",
  `// GENERATO da tools/genera-dati.mjs (sorgenti: tools/dati/poteri.json, dal libretto dei poteri e dai poteri nuovi del 23-24/9;\n// tools/dati/effetti_poteri.json, gli effetti sul tiro scritti a mano dal testo, tappa 3 del 24/9;\n// tools/dati/prerequisiti_poteri.json, i prerequisiti d'acquisto, 25/9; dal 27/9 attivo, passivo e amalgama separati, per le quattro parti del testo).\n// Non si scrive a mano. Il catalogo dei poteri delle Sfere: ogni voce ha le Sfere che la aprono\n// (\`spheres\`, con "any" per Qualsiasi), la matrice di provenienza, il testo intero, il costo in\n// Quintessenza, il limite d'uso, \`effects\` (gli effetti sul tiro: poteri.js li applica), \`scelta\`\n// (cosa il giocatore sceglie all'acquisto: un Ambito, un'Abilità, un incantesimo) e \`prerequisiti\`\n// (le condizioni d'acquisto, una per riga: numero, potere o testo; null = nessuna).
// Dal 30/9 anche tools/dati/rifacimento.json, i poteri rifatti e decisi nella pagina «Poteri delle Sfere»:
// \`rifatto\` true, \`costoAttivo\` e \`cadenzaPassivo\` scritti per esteso, \`costoVariabile\` ({ min, max },
// max 0 = senza tetto) quando la Quintessenza dell'attivo la sceglie chi lo usa.`,
  "POTERI",
  vociPoteri,
  `\n/** I poteri tolti dal rifacimento: id → { name, data, motivo }. */\nexport const POTERI_TOLTI = Object.freeze(${JSON.stringify(tolti, null, 2)});\n`
  + `\n/** L'impronta del catalogo: cambia quando cambia un potere, e allora le schede si riallineano (poteri-allinea.js). */\nexport const POTERI_VERSIONE = "${impronta(vociPoteri)}";\n`);

const conEffetti = Object.keys(effetti.effetti).length;
const rifatti = catalogo.filter((p) => p.rifatto).length;
console.log(`formule ${formule.formule.length}, poteri ${catalogo.length} (${rifatti} rifatti, ${Object.keys(rifacimento.tolti).length} tolti; ${conEffetti} con effetti sul tiro): scritti scripts/data/formule.js e scripts/data/poteri.js`);
