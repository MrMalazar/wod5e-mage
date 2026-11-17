import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  BUSSOLA_DADI,
  BUSSOLA_MALUS_DADI,
  BUSSOLA_SCALA_FLAG,
  BUSSOLA_SCENE_FLAG,
  BUSSOLA_SPEGNE,
  aggiornamentoBussola,
  aggiornamentoTradimento,
  effettoBussola,
  effettoContro,
  menuBussolaModi,
  menuBussolaVoci,
  curaVolonta,
  modiDellaVoce,
  normalizeBussolaTiro,
  normalizeScala,
  prepareBussolaChoice,
  rigaDellaVoce,
  sceltaDalMenu,
  spentaPath,
  statoBussola,
  statoDelMenu,
  testoBussola,
  usateDellaScena,
  voltaContro
} from "../scripts/bussola.js";
import { contoTiro, emptyTiro, pickAttribute, pickSkill, removePill, setBussola, setScope, setSoglia, toggleArete } from "../scripts/tiro.js";
import { testoTradimento } from "../scripts/wisdom.js";

// La scala delle Convinzioni (Blue, 16/11/2026): a favore 2 dadi o 1 Quintessenza, una volta per
// scena, e dalla seconda volta nella sessione, col gesto diverso, anche difficoltà −1; contro 2 dadi
// in meno, dalla seconda volta anche difficoltà +1, alla terza la Convinzione si spegne.
assert.deepEqual([BUSSOLA_DADI, BUSSOLA_MALUS_DADI, BUSSOLA_SPEGNE, BUSSOLA_SCENE_FLAG, BUSSOLA_SCALA_FLAG], [2, 2, 3, "convinzioneScena", "bussolaScala"]);

const it = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8"));
const en = JSON.parse(readFileSync(new URL("../lang/en.json", import.meta.url), "utf8"));
const localize = (key) => key.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), it) ?? key;
const format = (key, data = {}) => String(localize(key)).replace(/\{(\w+)\}/g, (_, k) => String(data[k]));

// Le voci, lette da una scheda finta: l'Ambizione, due Convinzioni attive e una spenta.
const flags = {
  convinzioni: {
    c1: { group: "", text: "Non lascio indietro nessuno", serve: "", cross: "" },
    c2: { group: "", text: "Mai mentire a chi si fida di me", serve: "", cross: "" },
    c3: { group: "", text: "Il sapere va diviso", serve: "", cross: "", spenta: true }
  }
};
const actor = { getFlag: (_m, key) => flags[key], system: { headers: { ambition: "Aprire la scuola", desire: "" } } };
let stato = statoBussola(actor);
assert.deepEqual(stato.voci.map((v) => [v.id, v.kind, v.rowId, v.spenta]), [["ambizione", "ambizione", "", false], ["convinzione:c1", "convinzione", "c1", false], ["convinzione:c2", "convinzione", "c2", false], ["convinzione:c3", "convinzione", "c3", true]]);
assert.deepEqual([stato.usate, stato.scala], [{ convinzione: false, ambizione: false, desiderio: false }, { favore: {}, contro: {}, scena: {} }]);
// Il segno della scena per voce (Blue, 17/11): le Convinzioni, l'Ambizione e il Desiderio, una volta ciascuno.
// Il segno di prima, { used }, vale per le Convinzioni.
assert.deepEqual([usateDellaScena(null), usateDellaScena({ used: true, label: "x" }), usateDellaScena({ ambizione: true, desiderio: true })], [
  { convinzione: false, ambizione: false, desiderio: false },
  { convinzione: true, ambizione: false, desiderio: false },
  { convinzione: false, ambizione: true, desiderio: true }
]);
assert.equal(prepareBussolaChoice(actor).options.length, 4);

// La scelta pulita: contro vale solo per una Convinzione; il gesto solo a favore di una Convinzione.
assert.equal(rigaDellaVoce("convinzione:c1"), "c1");
assert.equal(rigaDellaVoce("ambizione"), "");
assert.deepEqual(normalizeBussolaTiro({ voce: "convinzione:c1", verso: "favore", modo: "quintessenza", gesto: true }), { voce: "convinzione:c1", verso: "favore", modo: "quintessenza", gesto: true });
assert.deepEqual(normalizeBussolaTiro({ voce: "ambizione", gesto: true }), { voce: "ambizione", verso: "favore", modo: "volonta", gesto: false });
// I premi a scelta (Blue, 17/11): con una Convinzione 2 dadi o 1 Quintessenza; con l'Ambizione o il
// Desiderio 1 Volontà o 1 Quintessenza. Un premio che la voce non ha prende il primo dei suoi.
assert.deepEqual([modiDellaVoce("convinzione:c1"), modiDellaVoce("ambizione"), modiDellaVoce("desiderio")], [["dadi", "quintessenza"], ["volonta", "quintessenza"], ["volonta", "quintessenza"]]);
assert.equal(normalizeBussolaTiro({ voce: "desiderio", modo: "dadi" }).modo, "volonta", "i dadi non sono un premio del Desiderio");
assert.equal(normalizeBussolaTiro({ voce: "convinzione:c1", modo: "volonta" }).modo, "dadi", "la Volontà non è un premio delle Convinzioni");
assert.deepEqual(normalizeBussolaTiro({ voce: "convinzione:c1", verso: "contro", modo: "dadi", gesto: true }), { voce: "convinzione:c1", verso: "contro", modo: "", gesto: false });
for (const rotta of [null, true, "ambizione", {}, { voce: "ambizione", verso: "contro" }, { voce: "convinzione:" }, { voce: "nope" }]) assert.equal(normalizeBussolaTiro(rotta), null, JSON.stringify(rotta));
assert.deepEqual(normalizeScala({ favore: { c1: 2, c2: 0, c3: "x" }, contro: { c1: 1.7 }, scena: { c1: true, c2: false } }), { favore: { c1: 2 }, contro: { c1: 1 }, scena: { c1: true } });

// A favore, la prima volta: 2 dadi, oppure 1 Quintessenza a tiro fatto; il gesto diverso non conta ancora.
let effetto = effettoBussola({ voce: "convinzione:c1", modo: "dadi", gesto: true }, stato);
assert.deepEqual([effetto.attiva, effetto.verso, effetto.riga, effetto.dadi, effetto.difficolta, effetto.quintessenza, effetto.volta, effetto.gesto], [true, "favore", "c1", 2, 0, 0, 1, false]);
effetto = effettoBussola({ voce: "ambizione", modo: "quintessenza" }, stato);
assert.deepEqual([effetto.dadi, effetto.volonta, effetto.quintessenza, effetto.difficolta, effetto.label], [0, 0, 1, 0, "WOD5E_MAGE.Bussola.Ambition: Aprire la scuola"]);
effetto = effettoBussola({ voce: "ambizione", modo: "volonta" }, stato);
assert.deepEqual([effetto.attiva, effetto.dadi, effetto.volonta, effetto.aggravato, effetto.quintessenza, effetto.difficolta], [true, 0, 1, true, 0, 0], "l'Ambizione non dà dadi: 1 Volontà a tiro fatto, che toglie anche un aggravato");
const desiderio = { voci: [{ id: "desiderio", kind: "desiderio", rowId: "", text: "Una notte di sonno intera", spenta: false, label: "Desiderio: Una notte di sonno intera" }], usate: {}, scala: {} };
effetto = effettoBussola({ voce: "desiderio" }, desiderio);
assert.deepEqual([effetto.attiva, effetto.modo, effetto.volonta, effetto.aggravato], [true, "volonta", 1, false], "la Volontà del Desiderio toglie solo un superficiale");
// La Volontà della Bussola toglie un danno mentale: il Desiderio un superficiale, l'Ambizione anche un
// aggravato, prima quello; mai le caselle in debito del Sacrificio.
assert.deepEqual([{ ms: 3 }, { ms: 2, debito: { ms: 1 } }, { ms: 1, debito: { ms: 1 } }, { ma: 2 }, {}].map((salute) => curaVolonta(salute)), [{ segno: "ms", resta: 2 }, { segno: "ms", resta: 1 }, null, null, null]);
assert.deepEqual([{ ma: 2, ms: 1 }, { ma: 1, ms: 1, debito: { ma: 1 } }, { ma: 1, debito: { ma: 1 } }, { ms: 2 }].map((salute) => curaVolonta(salute, { aggravato: true })), [{ segno: "ma", resta: 1 }, { segno: "ms", resta: 0 }, null, { segno: "ms", resta: 1 }]);
// La seconda volta nella sessione, col gesto diverso: anche difficoltà −1; senza gesto diverso, no.
stato = { ...stato, scala: { favore: { c1: 1 }, contro: {}, scena: {} } };
assert.deepEqual(["dadi", "quintessenza"].map((modo) => effettoBussola({ voce: "convinzione:c1", modo, gesto: true }, stato)).map((e) => [e.dadi, e.quintessenza, e.difficolta, e.volta, e.gesto]), [[2, 0, -1, 2, true], [0, 1, -1, 2, true]]);
assert.equal(effettoBussola({ voce: "convinzione:c1", modo: "dadi" }, stato).difficolta, 0, "lo stesso gesto: niente sconto");
assert.equal(effettoBussola({ voce: "convinzione:c2", modo: "dadi", gesto: true }, stato).difficolta, 0, "la scala è per Convinzione");
// Una volta per scena, per voce: l'Ambizione servita non vale più, una Convinzione sì; contro sempre.
assert.equal(effettoBussola({ voce: "ambizione" }, { ...stato, usate: { ambizione: true } }).attiva, false);
assert.equal(effettoBussola({ voce: "convinzione:c1" }, { ...stato, usate: { ambizione: true } }).attiva, true);
assert.equal(effettoBussola({ voce: "convinzione:c1" }, { ...stato, usate: { convinzione: true } }).attiva, false, "una sola Convinzione per scena");
assert.equal(effettoBussola({ voce: "convinzione:c1", verso: "contro" }, { ...stato, usate: { convinzione: true, ambizione: true, desiderio: true } }).attiva, true);
// La Convinzione spenta e la voce che non c'è più non valgono.
assert.equal(effettoBussola({ voce: "convinzione:c3" }, stato).attiva, false);
assert.equal(effettoBussola({ voce: "convinzione:c3", verso: "contro" }, stato).attiva, false);
assert.equal(effettoBussola({ voce: "desiderio" }, stato).attiva, false, "il Desiderio non è scritto");
// Contro: 2 dadi in meno; la seconda volta anche difficoltà +1; la terza, con gli stessi malus, si spegne.
assert.deepEqual([0, 1, 2].map((prima) => effettoBussola({ voce: "convinzione:c2", verso: "contro" }, { ...stato, scala: { contro: { c2: prima } } })).map((e) => [e.dadi, e.difficolta, e.volta, e.spegne]), [[-2, 0, 1, false], [-2, 1, 2, false], [-2, 1, 3, true]]);

// Il conto del tiro: a favore i dadi fuori dal tetto, contro i dadi in meno senza tetto; la
// difficoltà della Bussola sposta la soglia, nella Magick e nell'Abilità.
const abilita = setSoglia(pickSkill(pickAttribute(emptyTiro(), "dexterity"), "skill:athletics"), 3);
const base = { attributeValue: 3, skillValue: 2 };
let conto = contoTiro(abilita, { ...base, bussola: { dadi: 2, difficolta: -1 } });
assert.deepEqual([conto.bussolaDice, conto.bussolaMalus, conto.pool, conto.difficulty, conto.sogliaMano], [2, 0, 7, 2, 3], "5 dadi più 2, e la soglia 3 scende a 2");
conto = contoTiro(abilita, { ...base, bussola: { dadi: -2, difficolta: 1 } });
assert.deepEqual([conto.bussolaDice, conto.bussolaMalus, conto.pool, conto.riservaTotale, conto.difficulty], [0, -2, 3, 3, 4], "contro: 2 dadi in meno e la soglia sale a 4");
assert.equal(contoTiro(setSoglia(abilita, 7), { ...base, bussola: { dadi: -2, difficolta: 1 } }).difficulty, 8, "il +1 della Bussola non si perde sopra il 7 del Narratore");
assert.equal(contoTiro(setSoglia(abilita, 1), { ...base, bussola: { dadi: 2, difficolta: -1 } }).difficulty, 1, "mai sotto 1");
assert.equal(contoTiro(pickSkill(pickAttribute(emptyTiro(), "dexterity"), "skill:athletics"), { ...base, bussola: { dadi: 2, difficolta: -1 } }).difficulty, 0, "senza la soglia del Narratore il tiro non parte, Bussola o no");
assert.equal(contoTiro(abilita, { attributeValue: 1, skillValue: 0, bussola: { dadi: -2, difficolta: 0 } }).pool, 0, "i dadi non vanno sotto zero");
const lancio = setScope(setScope(toggleArete(pickSkill(pickAttribute(emptyTiro(), "dexterity"), "skill:occult")), "potency", 4), "range", 3);
const soglia = contoTiro(lancio, { arete: 2, ...base }).difficulty;
assert.deepEqual([-1, 1].map((difficolta) => contoTiro(lancio, { arete: 2, ...base, bussola: { dadi: 0, difficolta } }).difficulty), [soglia - 1, soglia + 1]);
assert.equal(contoTiro(setSoglia(lancio, 2), { arete: 2, ...base, bussola: { dadi: 0, difficolta: 1 } }).sogliaSenzaMano, soglia + 1, "la soglia senza la mano del Narratore porta la Bussola: la nota dice solo la mano");
// Lo stato del riquadro: la scelta entra pulita, la × la toglie, la scelta vecchia (un sì e basta) cade.
const scelto = setBussola(abilita, { voce: "convinzione:c1", verso: "contro" });
assert.deepEqual(scelto.bussola, { voce: "convinzione:c1", verso: "contro", modo: "", gesto: false });
assert.equal(removePill(scelto, { kind: "bussola", id: "bussola" }).bussola, null);
assert.equal(setBussola(abilita, { voce: "nope" }).bussola, null);

// I menù del tasto: a favore le voci attive (finché la scena non l'ha vista), contro le Convinzioni
// attive con quel che costa la volta che sarebbe, in fondo Nessuna. A favore il secondo menù chiede
// il modo, e il gesto diverso dalla seconda volta.
stato = { ...statoBussola(actor), scala: { favore: { c1: 1 }, contro: { c2: 2 }, scena: {} } };
assert.deepEqual(menuBussolaVoci(stato, localize, format).map((v) => [v.state, v.text]), [
  ["favore|ambizione", "Segue l'Ambizione: Aprire la scuola"],
  ["favore|convinzione:c1", "Serve «Non lascio indietro nessuno»"],
  ["favore|convinzione:c2", "Serve «Mai mentire a chi si fida di me»"],
  ["contro|convinzione:c1", "Va contro «Non lascio indietro nessuno»: 2 dadi in meno"],
  ["contro|convinzione:c2", "Va contro «Mai mentire a chi si fida di me»: 2 dadi in meno, difficoltà +1, e si spegne"],
  ["", "Nessuna"]
]);
assert.ok(menuBussolaVoci(stato, localize, format).every((v) => v.glyph === null), "le voci sono solo testo");
assert.deepEqual(menuBussolaVoci({ ...stato, usate: { convinzione: true } }, localize, format).map((v) => v.state), ["favore|ambizione", "contro|convinzione:c1", "contro|convinzione:c2", ""], "le Convinzioni hanno dato: restano l'Ambizione e il contro");
assert.deepEqual(menuBussolaVoci({ ...stato, usate: { convinzione: true, ambizione: true } }, localize, format).map((v) => v.state), ["contro|convinzione:c1", "contro|convinzione:c2", ""]);
assert.deepEqual(menuBussolaVoci({ voci: [], usata: false, scala: {} }, localize, format), [], "niente in scheda: niente menù");
assert.deepEqual(menuBussolaVoci({ voci: stato.voci.filter((v) => v.kind === "ambizione"), usate: { ambizione: true }, scala: {} }, localize, format), [], "solo l'Ambizione, già servita: niente da scegliere");
assert.deepEqual(menuBussolaModi("convinzione:c1", stato, localize).map((v) => [v.state, v.text]), [["dadi", "2 dadi in più"], ["quintessenza", "1 Quintessenza a tiro fatto"], ["dadi|gesto", "Gesto diverso: 2 dadi e difficoltà −1"], ["quintessenza|gesto", "Gesto diverso: 1 Quintessenza e difficoltà −1"]]);
assert.deepEqual(menuBussolaModi("convinzione:c2", stato, localize).map((v) => v.state), ["dadi", "quintessenza"], "la prima volta nella sessione: niente gesto");
assert.deepEqual(menuBussolaModi("ambizione", stato, localize).map((v) => [v.state, v.text]), [["volonta", "1 Volontà a tiro fatto, anche da un danno aggravato"], ["quintessenza", "1 Quintessenza a tiro fatto"]], "l'Ambizione: Volontà o Quintessenza, e mai il gesto");
assert.deepEqual(menuBussolaModi("desiderio", { ...stato, scala: { favore: { desiderio: 3 } } }, localize).map((v) => [v.state, v.text]), [["volonta", "1 Volontà a tiro fatto"], ["quintessenza", "1 Quintessenza a tiro fatto"]]);
assert.deepEqual(sceltaDalMenu("favore|convinzione:c1", "quintessenza|gesto"), { voce: "convinzione:c1", verso: "favore", modo: "quintessenza", gesto: true });
assert.deepEqual(sceltaDalMenu("contro|convinzione:c2"), { voce: "convinzione:c2", verso: "contro", modo: "", gesto: false });
assert.equal(sceltaDalMenu(""), null);
assert.deepEqual([statoDelMenu({ voce: "convinzione:c2", verso: "contro" }), statoDelMenu(null)], ["contro|convinzione:c2", ""]);
assert.deepEqual([1, 2, 3, 7].map((v) => voltaContro(v, localize)), ["prima volta", "seconda volta", "terza volta", "terza volta"]);
assert.equal(effettoContro(2, localize), "2 dadi in meno e difficoltà +1");

// Le parole nel riquadro e sulla carta.
assert.deepEqual(testoBussola(effettoBussola({ voce: "convinzione:c1", modo: "dadi", gesto: true }, stato), localize, format), {
  tasto: "Bussola",
  riga: "Bussola",
  nota: "Serve «Non lascio indietro nessuno»: 2 dadi in più, fuori dal tetto, e difficoltà −1 col gesto diverso."
});
assert.deepEqual(testoBussola(effettoBussola({ voce: "ambizione", modo: "quintessenza" }, stato), localize, format), { tasto: "Bussola", riga: "Bussola", nota: "Segue l'Ambizione, «Aprire la scuola»: 1 Quintessenza a tiro fatto." });
assert.equal(testoBussola(effettoBussola({ voce: "ambizione", modo: "volonta" }, stato), localize, format).nota, "Segue l'Ambizione, «Aprire la scuola»: 1 Volontà a tiro fatto, un danno mentale in meno, anche aggravato.");
assert.equal(testoBussola(effettoBussola({ voce: "desiderio" }, desiderio), localize, format).nota, "Segue il Desiderio, «Una notte di sonno intera»: 1 Volontà a tiro fatto, un danno mentale superficiale in meno.");
assert.deepEqual(testoBussola(effettoBussola({ voce: "convinzione:c2", verso: "contro" }, stato), localize, format), {
  tasto: "Contro",
  riga: "Contro la Convinzione",
  nota: "Contro «Mai mentire a chi si fida di me», terza volta: 2 dadi in meno, difficoltà +1, e si spegne."
});
assert.deepEqual(testoBussola(effettoBussola(null, stato), localize, format), { tasto: "Bussola", riga: "", nota: "" });

// A tiro fatto: a favore il segno della scena e, per una Convinzione, una volta in più nella sessione
// e le volte contro azzerate; contro una volta in più nella storia e il segno della scena; alla terza
// la Convinzione si spegne e il conto riparte.
assert.deepEqual(aggiornamentoBussola(effettoBussola({ voce: "ambizione", modo: "dadi" }, stato), stato.scala), { "flags.wod5e-mage.convinzioneScena.ambizione": true });
assert.deepEqual(aggiornamentoBussola(effettoBussola({ voce: "desiderio" }, desiderio), {}), { "flags.wod5e-mage.convinzioneScena.desiderio": true });
assert.deepEqual(aggiornamentoBussola(effettoBussola({ voce: "convinzione:c2", modo: "dadi" }, stato), stato.scala), {
  "flags.wod5e-mage.convinzioneScena.convinzione": true,
  "flags.wod5e-mage.bussolaScala.favore.c2": 1,
  "flags.wod5e-mage.bussolaScala.contro.-=c2": null
}, "servirla azzera le volte contro");
assert.deepEqual(aggiornamentoBussola(effettoBussola({ voce: "convinzione:c1", verso: "contro" }, stato), stato.scala), { "flags.wod5e-mage.bussolaScala.scena.c1": true, "flags.wod5e-mage.bussolaScala.contro.c1": 1 });
assert.deepEqual(aggiornamentoBussola(effettoBussola({ voce: "convinzione:c2", verso: "contro" }, stato), stato.scala), { "flags.wod5e-mage.bussolaScala.scena.c2": true, "flags.wod5e-mage.bussolaScala.contro.-=c2": null, "flags.wod5e-mage.convinzioni.c2.spenta": true });
assert.equal(spentaPath("c2"), "flags.wod5e-mage.convinzioni.c2.spenta");
assert.deepEqual(aggiornamentoBussola(effettoBussola(null, stato), stato.scala), {});

// L'atto della Saggezza che tradisce: una volta contro, salvo che il tiro della scena l'abbia già contata.
let passo = aggiornamentoTradimento("c1", { contro: { c1: 1 } });
assert.deepEqual(passo, { update: { "flags.wod5e-mage.bussolaScala.scena.c1": true, "flags.wod5e-mage.bussolaScala.contro.c1": 2 }, contata: true, volta: 2, spegne: false });
assert.equal(testoTradimento(passo, "Non lascio indietro nessuno", format), "Tradita «Non lascio indietro nessuno»: seconda volta contro, alla terza si spegne.");
passo = aggiornamentoTradimento("c1", { contro: { c1: 1 }, scena: { c1: true } });
assert.deepEqual(passo, { update: {}, contata: false, volta: 1, spegne: false });
assert.equal(testoTradimento(passo, "Non lascio indietro nessuno", format), "Tradita «Non lascio indietro nessuno»: il tiro di questa scena l'ha già contata.");
passo = aggiornamentoTradimento("c2", { contro: { c2: 2 } });
assert.deepEqual([passo.contata, passo.volta, passo.spegne, passo.update["flags.wod5e-mage.convinzioni.c2.spenta"]], [true, 3, true, true]);
assert.equal(testoTradimento(passo, "Mai mentire", format), "Tradita «Mai mentire»: terza volta contro, e si spegne.");
assert.deepEqual(aggiornamentoTradimento("", {}), { update: {}, contata: false, volta: 0, spegne: false });

// Gli azzeramenti: il Cambio scena toglie le attraversate della scena; la Nuova sessione anche le volte
// a favore; la Nuova storia (la finestra dell'Ancora) le volte contro; il Quadro, a inizio sessione, come la Nuova sessione.
const read = (name) => readFileSync(new URL(`../${name}`, import.meta.url), "utf8");
const salute = read("scripts/salute.js");
assert.equal((salute.match(/\[`flags\.\$\{MODULE_ID\}\.\$\{BUSSOLA_SCALA_FLAG\}\.-=scena`\]: null/g) ?? []).length, 2, "Cambio scena e Nuova sessione");
assert.equal((salute.match(/\[`flags\.\$\{MODULE_ID\}\.\$\{BUSSOLA_SCALA_FLAG\}\.-=favore`\]: null/g) ?? []).length, 1, "la Nuova sessione");
assert.match(read("scripts/wisdom.js"), /BUSSOLA_SCALA_FLAG\}\.-=contro`\]: null/);
assert.match(read("scripts/quadro-narratore.js"), /BUSSOLA_SCALA_FLAG\}\.-=favore`\] = null;[\s\S]*BUSSOLA_SCALA_FLAG\}\.-=scena`\] = null;/);
// Il menù della Bussola va a capo: askSegno prende una classe.
assert.match(salute, /export function askSegno\(event, current, options, \{ classe = "" \} = \{\}\)/);
assert.match(read("styles/wod5e-mage.css"), /\.wod5e-mage-salute-menu\.bussola \.wod5e-mage-salute-menu-text \{[^}]*white-space: normal;/);

// Le lingue: le stesse chiavi in it e en, e il compendio dei Credi con la frase nuova.
const chiavi = (o, prefix = "") => Object.entries(o).flatMap(([k, v]) => (v && typeof v === "object" ? chiavi(v, `${prefix}${k}.`) : [`${prefix}${k}`]));
assert.deepEqual(chiavi(en.WOD5E_MAGE.Bussola), chiavi(it.WOD5E_MAGE.Bussola), "Bussola: stesse chiavi in it e en");
for (const key of ["Ask", "Short", "Hint", "Pick", "Used", "NewScene", "NewSceneHint", "Flavor"]) assert.equal(it.WOD5E_MAGE.Bussola[key], undefined, `Bussola.${key} tolta`);
assert.match(it.WOD5E_MAGE.Guidata.Passi.bussola.PercheDue, /Quando li segui scegli 1 Volontà o 1 Quintessenza, una volta per scena ciascuno[\s\S]*Compiere il Desiderio dà 2 punti di Esperienza, compiere l'Ambizione 5[\s\S]*scegli 2 dadi o 1 Quintessenza[\s\S]*alla terza volta si spegne/);
assert.match(it.WOD5E_MAGE.Guidata.Bussola.GuadagniAmbizione, /anche da un danno aggravato, o 1 Quintessenza; compierla vale 5 punti di Esperienza$/);
assert.match(it.WOD5E_MAGE.Guidata.Bussola.GuadagniDesiderio, /1 Volontà o 1 Quintessenza, raggiungerlo vale 2 punti di Esperienza$/);
assert.doesNotMatch(JSON.stringify(it), /dado della Bussola/);
const credi = read("packs/mage-credi.db");
assert.equal(credi.split("Vanno a scala: servirle dà 2 dadi o 1 Quintessenza, e servirle ancora nella sessione anche difficoltà −1; attraversarle toglie 2 dadi, poi alza la difficoltà, e alla terza le spegne.").length - 1, 13);
assert.doesNotMatch(credi, /dado della Bussola/);

console.log("Bussola, la scala delle Convinzioni: test passati.");
