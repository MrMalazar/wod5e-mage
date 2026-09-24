// Le Formule e i poteri del modulo si generano dai dati, non si scrivono a mano
// (Blue, 24/9: il testo delle matrici e il libretto dei poteri restano il
// sorgente). I due JSON in tools/dati/ vengono da esporta_json.py (cartella
// delle matrici); questo attrezzo li trasforma in scripts/data/formule.js e
// scripts/data/poteri.js. Uso: node tools/genera-dati.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const qui = path.dirname(fileURLToPath(import.meta.url));
const radice = path.resolve(qui, "..");
const leggi = (nome) => JSON.parse(readFileSync(path.join(qui, "dati", nome), "utf8"));
const formule = leggi("formule.json");
const poteri = leggi("poteri.json");

const SFERE = ["correspondence", "entropy", "forces", "life", "matter", "mind", "prime", "spirit", "time"];
const AMBITI = ["targets", "conditions", "duration", "impact", "range", "potency", "precision"];

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

function controlla() {
  const idPoteri = new Set(poteri.poteri.map((p) => p.id));
  for (const f of formule.formule) {
    for (const s of [...f.access, ...f.amalgams]) if (!SFERE.includes(s)) throw new Error(`${f.name}: Sfera sconosciuta ${s}`);
    for (const t of f.thresholds) {
      for (const [k, v] of Object.entries(t.scopes)) if (!AMBITI.includes(k) || v < 0 || v > 7) throw new Error(`${f.name}: Ambito ${k} ${v}`);
      if (Object.values(t.scopes).reduce((a, b) => a + b, 0) !== t.base) throw new Error(`${f.name}: la soglia non torna`);
    }
    for (const p of f.powers) if (!idPoteri.has(p)) throw new Error(`${f.name}: potere ${p} non trovato`);
  }
  const idFormule = new Set(formule.formule.map((f) => f.id));
  for (const p of poteri.poteri) {
    if (p.formula && !idFormule.has(p.formula)) throw new Error(`${p.name}: Formula ${p.formula} non trovata`);
    for (const s of [...p.access, ...p.amalgams]) if (s !== "any" && !SFERE.includes(s)) throw new Error(`${p.name}: Sfera sconosciuta ${s}`);
  }
}

/** Il testo intero di un potere per la scheda: le tre sezioni, una riga per «Accesso con». */
function testoPotere(p) {
  const blocchi = [];
  const sezione = (titolo, s) => {
    if (s.none) return;
    const righe = [s.text, ...s.rows.map((r) => (r.spheres.length ? `Accesso con ${r.spheres.map(nomeSfera).join(" + ")}: ${r.text}` : r.text))].filter(Boolean);
    if (righe.length) blocchi.push(`${titolo}: ${righe.join("\n")}`);
  };
  sezione("Effetto attivo", p.active);
  sezione("Effetto passivo", p.passive);
  sezione("Effetto Amalgama", p.amalgam);
  return blocchi.join("\n\n");
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

scrivi("poteri.js",
  `// GENERATO da tools/genera-dati.mjs (sorgente: tools/dati/poteri.json, dal libretto dei poteri e dai poteri nuovi del 23-24/9).\n// Non si scrive a mano. Il catalogo dei poteri delle Sfere: ogni voce ha le Sfere che la aprono\n// (\`spheres\`, con "any" per Qualsiasi), la matrice di provenienza, il testo intero, il costo in\n// Quintessenza, il limite d'uso e \`effects\` (vuoto finché il potere non fa qualcosa nel conto).`,
  "POTERI",
  poteri.poteri.map((p) => ({
    id: p.id,
    spheres: p.access.length ? p.access : ["any"],
    name: p.name,
    dot: p.level,
    type: p.kind === "attivo e passivo" ? "attivo" : p.kind,
    kind: p.kind,
    text: testoPotere(p),
    amalgam: p.amalgams[0] ?? "",
    amalgams: p.amalgams,
    amalgamText: p.amalgam.none ? "" : [p.amalgam.text, ...p.amalgam.rows.map((r) => (r.spheres.length ? `Accesso con ${r.spheres.map(nomeSfera).join(" + ")}: ${r.text}` : r.text))].filter(Boolean).join("\n"),
    flavor: p.flavor,
    cost: p.cost ? `${p.cost} Quintessenza` : "",
    costValue: p.cost,
    uses: p.uses,
    paradox: p.paradox,
    formula: p.formula,
    formulaName: p.formulaName,
    link: p.link,
    page: p.page,
    hooks: p.hooks,
    effects: []
  })));

console.log(`formule ${formule.formule.length}, poteri ${poteri.poteri.length}: scritti scripts/data/formule.js e scripts/data/poteri.js`);
