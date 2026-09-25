import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  ambitiDellaScelta,
  applyPotere,
  blocchiDelGenere,
  blocchiDelTesto,
  generiDelTesto,
  quattroParti,
  righePrerequisiti,
  sfereDellaChiave,
  cartaPotere,
  catalogoDellaSfera,
  contoPoteri,
  effettiDelPotere,
  findPotere,
  idVarianteAttiva,
  normalizzaPotere,
  nuovoPotere,
  ordinaPoteri,
  POTERE_DOTS,
  POTERE_EFFECTS,
  POTERE_TIPI,
  potereLabel,
  condizioniDelPotere,
  prerequisitiMancanti,
  POTERI,
  POTERI_FLAG,
  POTERI_USI_FLAG,
  poteriDelPersonaggio,
  poteriOfSphere,
  puoUsare,
  registraUso,
  riarmaUsi,
  riuscitaSenzaTirare,
  ruotaDopoUso,
  sfereDellaVoce,
  spezzaIdPotere,
  tiroDelPotere,
  usiDelPotere,
  variantiDelPotere,
  voceDellaRiga
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
assert.deepEqual(riga, { id: "abc", sphere: "forces", name: "Conduttore", dot: 5, type: "passivo", text: "Un dado in più.", amalgam: "mind", amalgamText: "Anche la mente", flavor: "", cost: "1 Quintessenza", prerequisitiTesto: "", attivo: "", passivo: "", source: "catalogo", catalogId: "P001-Fo", formula: "", formulaName: "", link: "", costValue: 0, uses: null, paradox: "", effects: [], scelta: "" });
assert.deepEqual(normalizzaPotere("x", { sphere: "boh", type: "strano", dot: -2, amalgam: "nessuna" }), { id: "x", sphere: "", name: "", dot: 0, type: "", text: "", amalgam: "", amalgamText: "", flavor: "", cost: "", prerequisitiTesto: "", attivo: "", passivo: "", source: "mano", catalogId: "", formula: "", formulaName: "", link: "", costValue: 0, uses: null, paradox: "", effects: [], scelta: "" });
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
const tendina = catalogoDellaSfera("matter", { catalog, owned });
// In ordine di grado e poi di nome (25/9: la gerarchia si legge), spuntate se conosciute; il grado non chiude niente.
assert.deepEqual(tendina.map((entry) => [entry.id, entry.known, entry.locked]), [["M1", true, false], ["M3", false, false], ["M5", false, false]]);
assert.deepEqual(catalogoDellaSfera("matter", { catalog: [] }), []);
// Conosciuto anche se preso in un'altra Sfera (25/9 sera): la spunta guarda tutte le righe, e dice dove sta segnato.
{
  const conUniversale = [...catalog, { id: "U1", spheres: ["any"], name: "Coperto", dot: 1 }];
  const altrove = catalogoDellaSfera("matter", { catalog: conUniversale, owned: [], tutti: [normalizzaPotere("u", { sphere: "forces", source: "catalogo", catalogId: "U1" })] });
  const u1 = altrove.find((entry) => entry.id === "U1");
  assert.deepEqual([u1.known, u1.knownSphere], [true, "forces"]);
  assert.deepEqual([altrove.find((entry) => entry.id === "M1").known, altrove.find((entry) => entry.id === "M1").knownSphere], [false, ""]);
}
assert.deepEqual(catalogoDellaSfera("spirit", { catalog }), []);
// I prerequisiti (25/9; 25/9 sera: una condizione per riga): tanti poteri della Sfera, poteri precisi, o una
// condizione che giudica il tavolo; ogni riga ha il suo stato, e il potere è chiuso se una riga manca.
const conPrerequisiti = [
  ...catalog,
  { id: "M2", sphere: "matter", name: "Fusione", dot: 2, prerequisiti: [{ numero: 2 }] },
  { id: "M4", sphere: "matter", name: "Trasmutare", dot: 4, prerequisiti: [{ potere: "M3" }, { potere: "F1" }, { testo: "Aver toccato l'oro" }] }
];
assert.deepEqual(condizioniDelPotere(conPrerequisiti[4], { owned }), [{ kind: "numero", n: 2, id: "", testo: "", ok: false }], "un potere conosciuto, ne servono due");
assert.deepEqual(prerequisitiMancanti(conPrerequisiti[4], { owned }), [{ kind: "numero", n: 2, id: "", testo: "", ok: false }]);
assert.equal(prerequisitiMancanti(conPrerequisiti[4], { owned: [...owned, normalizzaPotere("k2", { sphere: "matter", name: "Artigiano", source: "catalogo", catalogId: "M3" })] }), null, "con due poteri si prende");
assert.deepEqual(condizioniDelPotere(conPrerequisiti[5], { owned, tutti: owned }).map((riga) => [riga.kind, riga.id || riga.testo, riga.ok]), [["potere", "M3", false], ["potere", "F1", false], ["testo", "Aver toccato l'oro", null]], "una riga per condizione; quella del tavolo non si giudica");
assert.deepEqual(prerequisitiMancanti(conPrerequisiti[5], { owned, tutti: [...owned, normalizzaPotere("f", { sphere: "forces", name: "Conduttore", source: "catalogo", catalogId: "F1" })] }).map((riga) => riga.id), ["M3"], "Conduttore sta su Forze e conta lo stesso");
assert.equal(prerequisitiMancanti(conPrerequisiti[0], { owned }), null, "senza prerequisiti si prende");
// Il formato vecchio { numero, poteri } si legge ancora.
assert.deepEqual(condizioniDelPotere({ id: "X", prerequisiti: { numero: 1, poteri: ["M1"] } }, { owned }).map((riga) => [riga.kind, riga.ok]), [["numero", true], ["potere", true]]);
const conChiusi = catalogoDellaSfera("matter", { catalog: conPrerequisiti, owned, tutti: owned });
assert.deepEqual(conChiusi.map((entry) => [entry.id, entry.locked, entry.condizioni.length, entry.chiuso?.length ?? null]), [["M1", false, 0, null], ["M2", true, 1, 1], ["M3", false, 0, null], ["M4", true, 3, 2], ["M5", false, 0, null]]);
// Il catalogo vero: un potere con più Sfere d'Accesso sta in ogni tendina, «Qualsiasi» in tutte; la Sfera scelta è quella della tendina.
assert.ok(catalogoDellaSfera("forces", { catalog: POTERI }).some((entry) => entry.id === "velocista"));
assert.ok(catalogoDellaSfera("time", { catalog: POTERI }).some((entry) => entry.id === "velocista"));
assert.ok(!catalogoDellaSfera("life", { catalog: POTERI }).some((entry) => entry.id === "velocista"));
assert.ok(catalogoDellaSfera("spirit", { catalog: POTERI }).some((entry) => entry.id === "la-pratica-rende-perfetti"));
const velocista = nuovoPotere("time", POTERI.find((power) => power.id === "velocista"));
assert.deepEqual([velocista.sphere, velocista.formulaName, velocista.link, velocista.costValue, velocista.source], ["time", "Accelerare e Rallentare", "proposta", 2, "catalogo"]);

// Gli effetti sul conto: soglia (mai sotto zero), dadi, riuscita da. Un potere senza effetti non tocca niente.
const conto = { threshold: 5, dice: 0, difficulty: null };
const vuoto = { threshold: 5, thresholdDelta: 0, dice: 0, difficulty: null, prize: 0, freeScopes: {}, quintessenceOnSkills: false, autoSuccess: [], notes: [], esclusi: [], attivo: false };
assert.deepEqual(applyPotere(conto, poteri[0]), vuoto);
const sconto = { ...poteri[1], effects: [{ on: "threshold", value: -2 }, { on: "dice", value: 1 }] };
const applicato = applyPotere(conto, sconto, { magick: true });
assert.deepEqual([applicato.threshold, applicato.thresholdDelta, applicato.dice, applicato.difficulty], [3, -2, 1, null]);
assert.deepEqual(applicato.notes, [{ on: "threshold", value: -2, nota: "" }, { on: "dice", value: 1, nota: "" }]);
assert.equal(applyPotere({ threshold: 1 }, { effects: [{ on: "threshold", value: -4 }] }, { magick: true }).threshold, 0);
assert.equal(applyPotere(conto, { effects: [{ on: "successFrom", value: 8 }] }, { magick: true }).difficulty, 8);
assert.equal(applyPotere(conto, { effects: [{ on: "successFrom", value: 0 }] }, { magick: true }).difficulty, null);
assert.equal(applyPotere(conto, { effects: [{ on: "altro", value: 3 }] }, { magick: true }).threshold, 5, "un gancio sconosciuto non fa niente");
assert.deepEqual(applyPotere(undefined, null), { ...vuoto, threshold: 0 });
// Senza `magick` nel contesto il tiro è di Abilità: un effetto della Magick resta fuori, col perché.
const fuori = applyPotere(conto, sconto, {});
assert.deepEqual([fuori.threshold, fuori.dice, fuori.esclusi.map((e) => e.motivo)], [5, 0, ["tiro:magick", "tiro:magick"]]);

// La pagina Magick e la prima pagina leggono i poteri inseriti, non i segnaposto.
const scheda = readFileSync(new URL("../scripts/poteri-scheda.js", import.meta.url), "utf8");
assert.match(scheda, /export function preparePoteriPagina\(actor, sheet/);
assert.match(scheda, /export async function onPotereNuovo[\s\S]*nuovoPotere\(sphere\)/);
assert.match(scheda, /export async function onPotereTogli[\s\S]*\.-=\$\{id\}`\]: null/);
const tiroScheda = readFileSync(new URL("../scripts/tiro-scheda.js", import.meta.url), "utf8");
assert.match(tiroScheda, /findPotere\(powerId, rows\)/);
assert.match(tiroScheda, /export function preparePoteriRows[\s\S]*poteriDelPersonaggio\(actor, \{ order \}\)/);
assert.doesNotMatch(tiroScheda, /placeholder|poteriSegnaposto/);
const reset = readFileSync(new URL("../scripts/reset.js", import.meta.url), "utf8");
assert.match(reset, /POTERI_FLAG\}`\]: null/);

// I gradi dati da Blue il 25/9 sera ai poteri che non l'avevano; Senza residuo aspetta ancora; Annientare non è nel catalogo.
{
  const gradi = {
    1: ["bussola", "coperto", "difendersi-dalla-sfera", "fatto-per-durare", "folla", "sentinella", "sesto-senso", "copertura", "interruttore", "dettaglio"],
    2: ["bussola-doppia", "appoggio", "legame", "modello", "segnale", "incassare", "guasto", "adrenalina"],
    3: ["la-pratica-rende-perfetti", "mestiere", "ambito-di-casa", "seconda-possibilita", "sferzata", "miraggio", "rigenerazione", "pronto-soccorso"],
    4: ["rallentare", "velocista", "convalescenza"],
    5: ["impresa-impossibile"]
  };
  for (const [grado, ids] of Object.entries(gradi)) {
    for (const id of ids) assert.equal(POTERI.find((p) => p.id === id)?.dot, Number(grado), id);
  }
  assert.deepEqual(POTERI.filter((p) => !p.dot).map((p) => p.id), ["senza-residuo"], "un solo potere senza grado");
  assert.ok(!POTERI.some((p) => /annient/i.test(p.name)), "Annientare non è nel catalogo");
  // Miraggio: l'illusione tangibile e la prova di chi guarda; Pronto soccorso: l'ultimo danno appena subito, meno uno.
  assert.match(POTERI.find((p) => p.id === "miraggio").text, /illusione tangibile[\s\S]*Fermezza \+ Allerta, o Fermezza \+ Sotterfugio[\s\S]*Areté più i poteri che conosci nella Sfera/);
  assert.match(POTERI.find((p) => p.id === "pronto-soccorso").text, /l'ultimo danno che ha appena subito, meno uno/);
}

console.log("poteri: ok");

// Il tasto «Usa» (tappa 2, 24/9): gli usi per scena e per sessione si
// contano e si riarmano da soli, il costo scende dalla Ruota, la carta porta
// i blocchi del testo.
const conosco = POTERI.find((power) => power.id === "conosco-un-posto");
const pronto = { ...normalizzaPotere("r1", nuovoPotere("life", POTERI.find((power) => power.id === "pronto-soccorso"))), id: "r1" };
const conoscoRiga = { ...normalizzaPotere("r2", nuovoPotere("mind", conosco)), id: "r2" };
assert.deepEqual(usiDelPotere(conoscoRiga, {}), { per: "sessione", max: 1, usati: 0, restanti: 1 });
assert.equal(usiDelPotere(pronto, {}), null);
assert.equal(usiDelPotere({ id: "x", uses: { per: "turno", n: 1 } }, {}), null);
assert.deepEqual(puoUsare(conoscoRiga, { usi: {}, quintessence: 0 }), { ok: true, motivo: "", usi: { per: "sessione", max: 1, usati: 0, restanti: 1 } });
const dopo = registraUso({}, conoscoRiga);
assert.deepEqual(dopo, { r2: { sessione: 1 } });
assert.deepEqual(puoUsare(conoscoRiga, { usi: dopo, quintessence: 5 }).motivo, "usi");
assert.deepEqual(puoUsare(pronto, { usi: {}, quintessence: 1 }).motivo, "quintessenza");
assert.equal(puoUsare(pronto, { usi: {}, quintessence: 2 }).ok, true);
// Senza periodo contato la bandiera non cambia.
assert.deepEqual(registraUso(dopo, pronto), dopo);
// Cambio Scena riarma la scena, Nuova sessione anche la sessione; «campagna» resta.
const usi = { a: { scena: 1, sessione: 2, campagna: 1 }, b: { scena: 1 } };
assert.deepEqual(riarmaUsi(usi, "scena"), { a: { sessione: 2, campagna: 1 } });
assert.deepEqual(riarmaUsi(usi, "sessione"), { a: { campagna: 1 } });
assert.deepEqual(riarmaUsi(usi, "campagna"), {});
assert.deepEqual(riarmaUsi({}, "scena"), {});
assert.deepEqual(ruotaDopoUso({ quintessence: 3, paradox: 2 }, pronto), { quintessence: 1, paradox: 2 });
assert.deepEqual(ruotaDopoUso({ quintessence: 1, paradox: 2 }, pronto), { quintessence: 0, paradox: 2 });
const blocchi = blocchiDelTesto("Effetto attivo: Paga 2 Quintessenza: cura.\nAccesso con Vita: ferite.\n\nEffetto passivo: In una scena di cure, un danno in più.");
assert.deepEqual(blocchi, [
  { titolo: "Effetto attivo", kind: "attivo", righe: ["Paga 2 Quintessenza: cura.", "Accesso con Vita: ferite."], voci: [{ chiave: "Paga 2 Quintessenza", testo: "cura.", sfere: [], accesso: false, con: false }, { chiave: "Accesso con Vita", testo: "ferite.", sfere: ["life"], accesso: true, con: false }] },
  { titolo: "Effetto passivo", kind: "passivo", righe: ["In una scena di cure, un danno in più."], voci: [{ chiave: "", testo: "In una scena di cure, un danno in più.", sfere: [], accesso: false, con: false }] }
]);
// «Accesso con X» porta la Sfera come id (Blue, 26/9: sulla scheda sta il sigillo, non la parola):
// i nomi come li scrive il generatore («Forza»), anche in coppia; un nome che non è una Sfera resta testo.
assert.deepEqual([sfereDellaChiave("Accesso con Forza"), sfereDellaChiave("Accesso con Entropia + Primordio"), sfereDellaChiave("Accesso con Qualsiasi"), sfereDellaChiave("Paga 2 Quintessenza"), sfereDellaChiave("")], [["forces"], ["entropy", "prime"], [], [], []]);
assert.deepEqual(voceDellaRiga("Accesso con Forza: un dado."), { chiave: "Accesso con Forza", testo: "un dado.", sfere: ["forces"], accesso: true, con: false });
for (const tpl of ["templates/actor/parts/spheres.hbs", "templates/actor/parts/stat-tratti.hbs", "templates/dialogs/catalogo-poteri.hbs", "templates/chat/potere.hbs"]) {
  assert.match(readFileSync(new URL(`../${tpl}`, import.meta.url), "utf8"), /\{\{#if v\.accesso\}\}<(?:b|strong) class="wod5e-mage-accesso">(?:\{\{#if v\.con\}\}\{\{localize "WOD5E_MAGE\.Poteri\.ConSfera"\}\}\{\{else\}\})?\{\{localize "WOD5E_MAGE\.Grimorio\.Access"\}\}(?:\{\{\/if\}\})? \{\{#each v\.sfere as \|sfera\|\}\}<img class="wod5e-mage-sfera-inline" src="modules\/wod5e-mage\/assets\/icons\/sheet\/\{\{sfera\}\}\.png"/, tpl);
}
// Il testo scritto a mano: un blocco senza titolo né genere; l'Amalgama ha il suo genere; le chiavi «Con N poteri».
assert.deepEqual(blocchiDelTesto("Fa una cosa.\nCon 2 poteri: due cose."), [{ titolo: "", kind: "", righe: ["Fa una cosa.", "Con 2 poteri: due cose."], voci: [{ chiave: "", testo: "Fa una cosa.", sfere: [], accesso: false, con: false }, { chiave: "Con 2 poteri", testo: "due cose.", sfere: [], accesso: false, con: false }] }]);
assert.deepEqual(blocchiDelTesto("Effetto Amalgama: Con più Sfere.\nAccesso con Primordio + Tempo: anche il resto.").map((b) => [b.kind, b.voci.map((v) => v.chiave)]), [["amalgama", ["", "Accesso con Primordio + Tempo"]]]);
assert.deepEqual(blocchiDelGenere("Effetto attivo: A.\n\nEffetto passivo: P.", "passivo").map((b) => b.righe), [["P."]]);
assert.deepEqual(voceDellaRiga("Accesso con Mente: danni mentali."), { chiave: "Accesso con Mente", testo: "danni mentali.", sfere: ["mind"], accesso: true, con: false });
assert.deepEqual(voceDellaRiga("Una frase con i due punti dopo: qui."), { chiave: "", testo: "Una frase con i due punti dopo: qui.", sfere: [], accesso: false, con: false });
const carta = cartaPotere(pronto, { sphereLabel: "Vita", usi: null, spent: 2, localize: (key) => key });
assert.deepEqual([carta.name, carta.sphere, carta.formula, carta.kind, carta.spent, carta.usi, carta.blocchi.length > 1, Boolean(carta.paradox)], ["Pronto soccorso", "Vita", "Guarire", "WOD5E_MAGE.Poteri.Tipo.attivo", 2, null, true, true]);
assert.equal(cartaPotere(conoscoRiga, { usi: usiDelPotere(conoscoRiga, dopo), localize: (key) => key }).usi.label, "WOD5E_MAGE.Poteri.Usi.sessione");
assert.equal(POTERI_USI_FLAG, "poteriUsi");
const spheresPage = readFileSync(new URL("../templates/actor/parts/spheres.hbs", import.meta.url), "utf8");
// Il tag «qualsiasi Sfera» sulla riga e, in modifica, la tendina del segno (25/9 sera).
assert.match(spheresPage, /\{\{#if p\.universale\}\}<small class="wod5e-mage-potere-tipo universale"[^>]*>\{\{localize "WOD5E_MAGE\.Poteri\.Universale"\}\}/);
assert.match(spheresPage, /\{\{#if p\.universale\}\}<label><span>\{\{localize "WOD5E_MAGE\.Poteri\.SegnatoIn"\}\}<\/span><select name="flags\.wod5e-mage\.poteri\.\{\{p\.id\}\}\.sphere">/);
assert.match(spheresPage, /data-action="potereUsa" data-row="\{\{p\.id\}\}"/);
assert.match(readFileSync(new URL("../templates/chat/potere.hbs", import.meta.url), "utf8"), /carta\.blocchi/);
const salute = readFileSync(new URL("../scripts/salute.js", import.meta.url), "utf8");
assert.match(salute, /riarmaUsi\(actor\.getFlag\(MODULE_ID, POTERI_USI_FLAG\) \?\? \{\}, "scena"\)/);
assert.match(salute, /riarmaUsi\(actor\.getFlag\(MODULE_ID, POTERI_USI_FLAG\) \?\? \{\}, "sessione"\)/);
console.log("poteri, tasto Usa: ok");


// Gli effetti sul tiro dai dati (tappa 3, 24/9): il catalogo li porta, la
// riga li legge dal catalogo, le condizioni e le varianti si giudicano.
{
  const conEffetti = POTERI.filter((power) => power.effects.length);
  assert.equal(conEffetti.length, 36, "36 poteri con effetti sul tiro");
  for (const power of conEffetti) {
    for (const effect of power.effects) {
      assert.ok(POTERE_EFFECTS.includes(effect.on), `${power.name}: gancio ${effect.on}`);
      assert.ok(effect.nota && power.text.replace(/\s+/g, " ").includes(effect.nota.replace(/\s+/g, " ")), `${power.name}: la nota sta nel testo`);
    }
  }
  assert.deepEqual(POTERI.find((power) => power.id === "ambito-di-casa").scelta.kind, "ambito");
  assert.deepEqual(POTERI.find((power) => power.id === "mestiere").scelta, { kind: "abilita" });
  assert.equal(POTERI.find((power) => power.id === "appoggio").scelta, null);

  // L'id con la variante.
  assert.deepEqual(spezzaIdPotere("r1#attivo"), { id: "r1", variant: "attivo" });
  assert.deepEqual(spezzaIdPotere("r1"), { id: "r1", variant: "" });
  assert.deepEqual(spezzaIdPotere("r1#boh"), { id: "r1", variant: "" });
  assert.equal(idVarianteAttiva("r1"), "r1#attivo");

  const riga = (id, sphere, scelta = "") => ({ ...normalizzaPotere(id, { ...nuovoPotere(sphere, POTERI.find((power) => power.id === id)), scelta }), id: `riga-${id}` });

  // Appoggio: la Potenza non conta fino a 4 (l'eccedenza conta), solo nella Magick.
  const appoggio = riga("appoggio", "forces");
  assert.deepEqual(variantiDelPotere(appoggio), { passivo: true, attivo: false });
  assert.equal(tiroDelPotere(appoggio), "magick");
  const conAppoggio = applyPotere({ threshold: 0 }, appoggio, { magick: true });
  assert.deepEqual([conAppoggio.freeScopes, conAppoggio.notes[0].on, conAppoggio.notes[0].scope, conAppoggio.attivo], [{ potency: 4 }, "freeScope", "potency", false]);
  assert.deepEqual(applyPotere({ threshold: 0 }, appoggio, { magick: false }).esclusi.map((e) => e.motivo), ["tiro:magick"]);

  // Ambito di casa: l'Ambito scelto nella riga, fino ai poteri conosciuti nella Sfera; la variante attiva a qualunque livello.
  const casa = riga("ambito-di-casa", "forces", "potency");
  assert.deepEqual(variantiDelPotere(casa), { passivo: true, attivo: true });
  assert.deepEqual(ambitiDellaScelta(casa), ["potency", "range"]);
  assert.deepEqual(ambitiDellaScelta(riga("ambito-di-casa", "spirit")), []);
  assert.deepEqual([tiroDelPotere(casa), tiroDelPotere(casa, "attivo")], ["magick", "magick"]);
  assert.equal(applyPotere({}, casa, { magick: true, poteriConti: { forces: 3 } }).freeScopes.potency, 3);
  const casaAttiva = applyPotere({}, casa, { magick: true, variant: "attivo", poteriConti: { forces: 3 } });
  assert.deepEqual([casaAttiva.freeScopes.potency, casaAttiva.attivo], [7, true]);
  assert.equal(applyPotere({}, casa, { magick: true, poteriConti: { forces: 3 } }).attivo, false, "senza variante gli attivi restano fuori");
  const casaSenzaScelta = applyPotere({}, riga("ambito-di-casa", "forces"), { magick: true, poteriConti: { forces: 3 } });
  assert.deepEqual([casaSenzaScelta.freeScopes, casaSenzaScelta.esclusi.map((e) => e.motivo)], [{}, ["attivo", "scelta"]], "l'attivo non scelto, e la scelta che manca");

  // Mestiere: un dado per Sfera conosciuta (fino a 3) sull'Abilità scelta, fuori dalla Magick; l'attivo la porta nella Magick.
  const mestiere = riga("mestiere", "mind", "skill:persuasion");
  assert.deepEqual([tiroDelPotere(mestiere), tiroDelPotere(mestiere, "attivo")], ["abilita", "magick"]);
  const ctxMestiere = { magick: false, skill: "skill:persuasion", spheresOwned: ["mind", "time", "forces", "life"] };
  assert.equal(applyPotere({}, mestiere, ctxMestiere).dice, 3);
  assert.equal(applyPotere({}, mestiere, { ...ctxMestiere, spheresOwned: ["mind", "time"] }).dice, 2);
  assert.deepEqual(applyPotere({}, mestiere, { ...ctxMestiere, skill: "skill:athletics" }).esclusi.map((e) => e.motivo), ["abilitaScelta", "tiro:magick"]);
  const mestiereMagick = applyPotere({}, mestiere, { ...ctxMestiere, magick: true, variant: "attivo" });
  assert.deepEqual([mestiereMagick.dice, mestiereMagick.attivo], [3, true]);

  // Fortuna del principiante: solo attivo, quindi sceglierlo è attivarlo; vale con un'Abilità a un pallino.
  const fortuna = riga("fortuna-del-principiante", "entropy");
  assert.deepEqual(variantiDelPotere(fortuna), { passivo: false, attivo: true });
  assert.equal(tiroDelPotere(fortuna), "abilita");
  const fortunaOk = applyPotere({}, fortuna, { magick: false, skillValue: 1 });
  assert.deepEqual([fortunaOk.attivo, fortunaOk.autoSuccess.length, fortunaOk.autoSuccess[0].when], [true, 1, []]);
  assert.deepEqual(applyPotere({}, fortuna, { magick: false, skillValue: 3 }).esclusi.map((e) => e.motivo), ["abilita1"]);

  // Niente al caso: la riuscita senza tirare vuole due dadi; nella Magick serve Primordio.
  const niente = riga("niente-al-caso", "entropy");
  assert.equal(tiroDelPotere(niente), "any");
  const nienteAbilita = applyPotere({}, niente, { magick: false });
  assert.deepEqual(nienteAbilita.autoSuccess.map((a) => a.when), [["dadi2"]]);
  assert.deepEqual(riuscitaSenzaTirare(nienteAbilita.autoSuccess, 2).ok, true);
  assert.deepEqual(riuscitaSenzaTirare(nienteAbilita.autoSuccess, 1), { ok: false, nota: "", motivo: "dadi2" });
  assert.deepEqual(applyPotere({}, niente, { magick: true, spheresOwned: ["entropy"] }).esclusi.map((e) => e.motivo), ["tiro:abilita", "sfera:prime"]);
  assert.equal(applyPotere({}, niente, { magick: true, spheresOwned: ["entropy", "prime"] }).autoSuccess.length, 1);

  // Voce dell'Avatar: il premio doppio. Anche a mani nude: la Quintessenza nei tiri di Abilità.
  assert.equal(applyPotere({ prize: 3 }, riga("voce-dell-avatar", "spirit"), { magick: true }).prize, 6);
  assert.equal(applyPotere({}, riga("anche-a-mani-nude", "prime"), { magick: false }).quintessenceOnSkills, true);
  assert.equal(applyPotere({}, riga("anche-a-mani-nude", "prime"), { magick: true }).quintessenceOnSkills, false);

  // Adrenalina: soglia -2 sotto metà Salute. Terra sacra: dadi pari ai poteri di Spirito, con Spirito.
  assert.equal(applyPotere({ threshold: 4 }, riga("adrenalina", "life"), { magick: true, saluteMeta: true }).threshold, 2);
  assert.deepEqual(applyPotere({ threshold: 4 }, riga("adrenalina", "life"), { magick: true, saluteMeta: false }).esclusi.map((e) => e.motivo), ["saluteMeta"]);
  assert.equal(applyPotere({}, riga("terra-sacra", "prime"), { magick: true, spheresOwned: ["prime", "spirit"], poteriConti: { spirit: 2 } }).dice, 2);
  assert.deepEqual(applyPotere({}, riga("terra-sacra", "prime"), { magick: true, spheresOwned: ["prime"] }).esclusi.map((e) => e.motivo), ["sfera:spirit"]);

  // Semplice violenza: la nota solo con Potenza 3 o più. La Pratica: -2 sull'incantesimo scelto.
  assert.equal(applyPotere({}, riga("semplice-violenza", "forces"), { magick: true, scopes: { potency: 3 } }).notes.length, 1);
  assert.equal(applyPotere({}, riga("semplice-violenza", "forces"), { magick: true, scopes: { potency: 2 } }).notes.length, 0);
  const pratica = riga("la-pratica-rende-perfetti", "mind", "s1");
  assert.equal(applyPotere({ threshold: 3 }, pratica, { magick: true, spell: "s1" }).threshold, 1);
  assert.deepEqual(applyPotere({ threshold: 3 }, pratica, { magick: true, spell: "s2" }).esclusi.map((e) => e.motivo), ["incantesimoScelto", "attivo"]);
  const praticaAttiva = applyPotere({ threshold: 3 }, pratica, { magick: true, spell: "s1", variant: "attivo" });
  assert.deepEqual([praticaAttiva.threshold, praticaAttiva.autoSuccess.map((a) => a.when), praticaAttiva.attivo], [1, [["dadi1"]], true]);

  // Un potere scritto a mano con effetti suoi li tiene; una riga del catalogo legge il catalogo, non la copia.
  assert.equal(effettiDelPotere({ catalogId: "", effects: [{ on: "dice", value: 2, nota: "x" }] }).length, 1);
  assert.equal(effettiDelPotere({ catalogId: "appoggio", effects: [] }).length, 1);
  assert.equal(effettiDelPotere({ catalogId: "da-qualche-parte", effects: [] }).length, 0);
  console.log("poteri, effetti sul tiro: ok");
}

// Le quattro parti (Blue, 27/9): Grado, Prerequisiti, Effetto attivo, Effetto passivo.
{
  const it = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8")).WOD5E_MAGE;
  const localize = (key) => key.split(".").slice(1).reduce((nodo, parte) => nodo?.[parte], it) ?? key;
  const banco = POTERI.find((power) => power.id === "il-banco-vince");
  assert.equal(banco.name, "Il banco vince");
  assert.equal(banco.kind, "passivo");
  assert.match(banco.passivo, /^Quando a qualcun altro in scena va male un tiro di Abilità, al tuo prossimo tiro di Abilità hai \+2 dadi/);
  assert.match(banco.amalgama, /^Con Primordio: quando a qualcun altro in scena scoppia il Paradosso su un tiro di Magick, recuperi 1 Quintessenza, ma prendi anche tu 1 punto di Paradosso\./);
  assert.equal(banco.attivo, "");
  // Dal catalogo: il passivo porta anche l'Amalgama, con la Sfera in chiave.
  const riga = nuovoPotere("entropy", banco);
  const parti = quattroParti(riga, { entry: banco, localize });
  assert.equal(parti.grado, 2);
  assert.deepEqual([parti.attivo.vuota, parti.passivo.vuota, parti.prerequisiti.vuota], [true, false, true]);
  assert.equal(parti.passivo.righe.length, 2);
  assert.deepEqual(parti.passivo.voci[1].sfere, ["prime"]);
  assert.equal(parti.passivo.voci[1].chiave, "Con Primordio");
  assert.deepEqual([parti.attivo.fonte, parti.passivo.fonte, parti.prerequisiti.fonte], ["base", "base", "base"]);
  assert.deepEqual(parti.modificato, { scheda: false, mondo: false });
  // Un potere solo attivo con l'Amalgama: l'Amalgama sta nell'attivo.
  const copertura = POTERI.find((power) => power.id === "copertura");
  const attivo = quattroParti(nuovoPotere("mind", copertura), { entry: copertura, localize });
  assert.ok(attivo.attivo.righe.some((riga) => riga.startsWith("Con Tempo:")) && attivo.passivo.vuota);
  // La modifica del Narratore (per tutti) vince sulla base; quella della scheda vince su tutto.
  const mondo = quattroParti(riga, { entry: banco, mod: { passivo: "Il banco paga sempre." }, localize });
  assert.deepEqual([mondo.passivo.testo, mondo.passivo.fonte, mondo.modificato.mondo], ["Il banco paga sempre.", "mondo", true]);
  const scheda = quattroParti({ ...riga, passivo: "Sulla mia scheda.", prerequisitiTesto: "Aver perso a carte" }, { entry: banco, mod: { passivo: "Il banco paga sempre." }, localize });
  assert.deepEqual([scheda.passivo.testo, scheda.passivo.fonte, scheda.prerequisiti.testo, scheda.modificato], ["Sulla mia scheda.", "scheda", "Aver perso a carte", { scheda: true, mondo: false }]);
  // La vecchia modifica a mano del testo (prima del 27/9) vale come modifica della scheda.
  const vecchia = quattroParti({ ...riga, text: "Effetto passivo: Cambiato a mano." }, { entry: banco, localize });
  assert.deepEqual([vecchia.passivo.testo, vecchia.passivo.fonte], ["Cambiato a mano.", "scheda"]);
  // Un potere scritto a mano, senza catalogo: il testo va nel genere del tipo, l'Amalgama scritta con la sua Sfera.
  const mano = quattroParti({ sphere: "forces", name: "Mio", dot: 1, type: "passivo", text: "Fa una cosa.", amalgam: "mind", amalgamText: "anche la mente." }, { localize });
  assert.deepEqual([mano.grado, mano.attivo.vuota, mano.passivo.righe], [1, true, ["Fa una cosa.", "Con Mente: anche la mente."]]);
  assert.deepEqual(mano.passivo.voci[1].sfere, ["mind"]);
  // I prerequisiti scritti nei dati, in parole.
  assert.deepEqual(righePrerequisiti({ prerequisiti: [{ numero: 2 }, { potere: "bottino" }, { testo: "Aver venduto qualcosa" }], spheres: ["matter"] }, { localize }), ["2 poteri di Materia", "richiede Bottino", "Aver venduto qualcosa"]);
  assert.deepEqual(generiDelTesto("Effetto attivo: A.\n\nEffetto passivo: P.\n\nEffetto Amalgama: Accesso con Vita: V."), { attivo: "A.", passivo: "P.", amalgama: "Accesso con Vita: V." });
  assert.deepEqual(generiDelTesto("Libero.", "passivo"), { attivo: "", passivo: "Libero.", amalgama: "" });
  console.log("poteri, quattro parti: ok");
}
