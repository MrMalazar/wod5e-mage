import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  applyPotere,
  catalogoDellaSfera,
  sfereDellaVoce,
  contoPoteri,
  findPotere,
  normalizzaPotere,
  nuovoPotere,
  ordinaPoteri,
  POTERE_DOTS,
  POTERE_TIPI,
  POTERI,
  POTERI_FLAG,
  poteriDelPersonaggio,
  poteriOfSphere,
  potereLabel
} from "../scripts/poteri.js";

// Il catalogo (24/9): i 187 poteri del libretto e dei nuovi, generati dai dati;
// ogni voce dice le Sfere che la aprono («any» per Qualsiasi) e la matrice.
assert.equal(POTERE_DOTS, 5);
assert.deepEqual([...POTERE_TIPI], ["attivo", "passivo"]);
assert.equal(POTERI.length, 187);
assert.equal(new Set(POTERI.map((power) => power.id)).size, POTERI.length);
assert.ok(POTERI.every((power) => power.name && power.spheres.length && power.formula && Array.isArray(power.effects)));
assert.deepEqual(sfereDellaVoce(POTERI.find((power) => power.id === "velocista")), ["forces", "time"]);
assert.equal(sfereDellaVoce(POTERI.find((power) => power.id === "la-pratica-rende-perfetti")).length, 9);
assert.deepEqual(sfereDellaVoce({ sphere: "life" }), ["life"]);
assert.deepEqual(POTERI.find((power) => power.id === "velocista").uses, null);
assert.deepEqual(POTERI.find((power) => power.id === "conosco-un-posto").uses, { per: "sessione", n: 1 });
assert.equal(POTERI.find((power) => power.id === "pronto-soccorso").costValue, 2);
assert.equal(POTERI_FLAG, "poteri");

// Una riga della bandiera letta pulita: i campi al loro posto, il resto scartato.
const riga = normalizzaPotere("abc", { sphere: "forces", name: " Conduttore ", dot: "7", type: "passivo", text: "Un dado in più.", amalgam: "mind", amalgamText: "Anche la mente", cost: "1 Quintessenza", source: "catalogo", catalogId: "P001-Fo" });
assert.deepEqual(riga, { id: "abc", sphere: "forces", name: "Conduttore", dot: 5, type: "passivo", text: "Un dado in più.", amalgam: "mind", amalgamText: "Anche la mente", flavor: "", cost: "1 Quintessenza", source: "catalogo", catalogId: "P001-Fo", formula: "", formulaName: "", link: "", costValue: 0, uses: null, effects: [] });
assert.deepEqual(normalizzaPotere("x", { sphere: "boh", type: "strano", dot: -2, amalgam: "nessuna" }), { id: "x", sphere: "", name: "", dot: 0, type: "", text: "", amalgam: "", amalgamText: "", flavor: "", cost: "", source: "mano", catalogId: "", formula: "", formulaName: "", link: "", costValue: 0, uses: null, effects: [] });
// Dal catalogo del 24/9 restano la matrice, il legame, il costo e il limite d'uso.
assert.deepEqual(normalizzaPotere("y", { sphere: "life", name: "Pronto soccorso", formula: "guarire", formulaName: "Guarire", link: "proposta", costValue: "2", uses: { per: "scena", n: 0 } }).uses, { per: "scena", n: 1 });

// I poteri del personaggio: dalla bandiera, in ordine di Sfera (come la scheda), pallino, nome.
const actor = { getFlag: (module, key) => (module === "wod5e-mage" && key === "poteri" ? {
  a: { sphere: "forces", name: "Vestire lo scudo", dot: 3, type: "passivo" },
  b: { sphere: "forces", name: "Conduttore", dot: 2, type: "passivo" },
  c: { sphere: "life", name: "Rigenerazione", dot: 1, type: "passivo", amalgam: "mind" },
  d: { sphere: "forces", name: "Buco nero", dot: 5, type: "attivo", cost: "una volta a sessione" },
  e: { sphere: "forces", name: "Antifurto", dot: 2 },
  rotta: null
} : {}) };
const poteri = poteriDelPersonaggio(actor, { order: ["forces", "life"] });
assert.deepEqual(poteri.map((power) => power.name), ["Antifurto", "Conduttore", "Vestire lo scudo", "Buco nero", "Rigenerazione"]);
assert.deepEqual(poteriDelPersonaggio(actor, { order: ["life", "forces"] }).map((power) => power.name)[0], "Rigenerazione");
assert.deepEqual(poteriDelPersonaggio({ getFlag: () => undefined }), []);
assert.deepEqual(poteriOfSphere(poteri, "life").map((power) => power.id), ["c"]);
// Il conto per Sfera: il numero dei poteri inseriti, tutte e nove le Sfere.
const conti = contoPoteri(poteri);
assert.deepEqual([conti.forces, conti.life, conti.mind, Object.keys(conti).length], [4, 1, 0, 9]);
assert.equal(findPotere("c", poteri).name, "Rigenerazione");
assert.equal(findPotere("zzz", poteri), null);
// Senza pallino in fondo alla sua Sfera; senza nome, «(senza nome)».
assert.deepEqual(ordinaPoteri([{ sphere: "mind", dot: 0, name: "B" }, { sphere: "mind", dot: 1, name: "A" }], ["mind"]).map((power) => power.name), ["A", "B"]);
const localize = (key) => ({ "WOD5E_MAGE.Poteri.SenzaNome": "(senza nome)" }[key] ?? key);
assert.equal(potereLabel(poteri[1], localize), "Conduttore");
assert.equal(potereLabel({ name: "" }, localize), "(senza nome)");
assert.equal(potereLabel(null, localize), "");

// La riga nuova: vuota sulla Sfera (a mano), o copiata dal catalogo.
assert.deepEqual(nuovoPotere("forces"), { sphere: "forces", name: "", dot: 0, type: "", text: "", amalgam: "", amalgamText: "", flavor: "", cost: "", source: "mano", catalogId: "" });
assert.equal(nuovoPotere("boh").sphere, "");
const voce = { id: "P016-Vi", sphere: "life", name: "Rigenerazione", dot: 1, type: "passivo", text: "Ogni cambio scena…", amalgam: "mind", amalgamText: "Anche la mente", cost: "", effects: [{ on: "dice", value: 1 }] };
const daCatalogo = nuovoPotere("life", voce);
assert.deepEqual([daCatalogo.source, daCatalogo.catalogId, daCatalogo.name, daCatalogo.amalgam, daCatalogo.effects.length], ["catalogo", "P016-Vi", "Rigenerazione", "mind", 1]);

// La tendina Aggiungi: le voci della Sfera in ordine di pallino, spuntate se conosciute, chiuse sopra i pallini.
const catalog = [
  { id: "M3", sphere: "matter", name: "Artigiano", dot: 3, type: "passivo" },
  { id: "M1", sphere: "matter", name: "Radiografia", dot: 1, type: "passivo" },
  { id: "M5", sphere: "matter", name: "Elemento 119", dot: 5, type: "attivo" },
  { id: "F1", sphere: "forces", name: "Conduttore", dot: 2 }
];
const owned = [normalizzaPotere("k", { sphere: "matter", name: "Radiografia", source: "catalogo", catalogId: "M1" })];
const tendina = catalogoDellaSfera("matter", { catalog, rating: 3, owned });
// In ordine di nome (24/9: i pallini sono quasi tutti da assegnare), spuntate se conosciute, chiuse sopra i pallini.
assert.deepEqual(tendina.map((entry) => [entry.id, entry.known, entry.locked]), [["M3", false, false], ["M5", false, true], ["M1", true, false]]);
assert.deepEqual(catalogoDellaSfera("matter", { catalog: [], rating: 3 }), []);
assert.deepEqual(catalogoDellaSfera("spirit", { catalog, rating: 5 }), []);
// Il catalogo vero: un potere con più Sfere d'Accesso sta in ogni tendina, «Qualsiasi» in tutte; la Sfera scelta è quella della tendina.
assert.ok(catalogoDellaSfera("forces", { catalog: POTERI }).some((entry) => entry.id === "velocista"));
assert.ok(catalogoDellaSfera("time", { catalog: POTERI }).some((entry) => entry.id === "velocista"));
assert.ok(!catalogoDellaSfera("life", { catalog: POTERI }).some((entry) => entry.id === "velocista"));
assert.ok(catalogoDellaSfera("spirit", { catalog: POTERI }).some((entry) => entry.id === "la-pratica-rende-perfetti"));
const velocista = nuovoPotere("time", POTERI.find((power) => power.id === "velocista"));
assert.deepEqual([velocista.sphere, velocista.formulaName, velocista.link, velocista.costValue, velocista.source], ["time", "Accelerare e Rallentare", "proposta", 2, "catalogo"]);

// Gli effetti sul conto: soglia (mai sotto zero), dadi, riuscita da. Un potere senza effetti non tocca niente.
const conto = { threshold: 5, dice: 0, difficulty: null };
assert.deepEqual(applyPotere(conto, poteri[0]), { threshold: 5, dice: 0, difficulty: null, notes: [] });
const sconto = { ...poteri[1], effects: [{ on: "threshold", value: -2 }, { on: "dice", value: 1 }] };
assert.deepEqual(applyPotere(conto, sconto), { threshold: 3, dice: 1, difficulty: null, notes: [{ on: "threshold", value: -2 }, { on: "dice", value: 1 }] });
assert.equal(applyPotere({ threshold: 1 }, { effects: [{ on: "threshold", value: -4 }] }).threshold, 0);
assert.equal(applyPotere(conto, { effects: [{ on: "successFrom", value: 8 }] }).difficulty, 8);
assert.equal(applyPotere(conto, { effects: [{ on: "successFrom", value: 0 }] }).difficulty, null);
assert.equal(applyPotere(conto, { effects: [{ on: "altro", value: 3 }] }).threshold, 5, "un gancio sconosciuto non fa niente");
assert.deepEqual(applyPotere(undefined, null), { threshold: 0, dice: 0, difficulty: null, notes: [] });

// La pagina Magick e la prima pagina leggono i poteri inseriti, non i segnaposto.
const scheda = readFileSync(new URL("../scripts/poteri-scheda.js", import.meta.url), "utf8");
assert.match(scheda, /export function preparePoteriPagina\(actor, sheet/);
assert.match(scheda, /export async function onPotereNuovo[\s\S]*nuovoPotere\(sphere\)/);
assert.match(scheda, /export async function onPotereTogli[\s\S]*\.-=\$\{id\}`\]: null/);
const tiroScheda = readFileSync(new URL("../scripts/tiro-scheda.js", import.meta.url), "utf8");
assert.match(tiroScheda, /findPotere\(tiro\.power, poteriDelPersonaggio\(actor\)\)/);
assert.match(tiroScheda, /export function preparePoteriRows[\s\S]*poteriDelPersonaggio\(actor, \{ order \}\)/);
assert.doesNotMatch(tiroScheda, /placeholder|poteriSegnaposto/);
const reset = readFileSync(new URL("../scripts/reset.js", import.meta.url), "utf8");
assert.match(reset, /POTERI_FLAG\}`\]: null/);

console.log("poteri: ok");
