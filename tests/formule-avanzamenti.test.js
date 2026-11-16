import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { AVANZAMENTI_FLAG, AVANZAMENTI_SCENA_FLAG, avanzamentiDi, avanzamentoState, mancanoAlProssimo, renderAvanzamentoButton } from "../scripts/formule-avanzamenti.js";
import { contoTiro, emptyTiro, setBussola } from "../scripts/tiro.js";

// Gli avanzamenti delle Formule (il Sistema, voce Formule): arrivano dai fallimenti, uno per scena;
// a 2 un dado, a 4 due, a 7 tre; nelle Formule il premio dell'Areté non si applica.
assert.deepEqual([AVANZAMENTI_FLAG, AVANZAMENTI_SCENA_FLAG], ["formuleAvanzamenti", "formuleScena"]);
assert.deepEqual([0, 1, 2, 3, 4, 6, 7, 12].map((punti) => avanzamentiDi({ costruire: punti }, "costruire").dadi), [0, 0, 1, 1, 2, 2, 3, 3]);
assert.deepEqual(avanzamentiDi({}, "costruire"), { punti: 0, dadi: 0 });
assert.deepEqual(avanzamentiDi({ costruire: 3 }, ""), { punti: 0, dadi: 0 });
assert.deepEqual([0, 1, 2, 3, 5, 6, 7, 9].map(mancanoAlProssimo), [2, 1, 2, 1, 2, 1, 0, 0]);

// Il tasto: su un lancio di Formula fallito, finché la Formula non ha preso l'avanzamento in questa scena.
const carta = { sistema: true, formula: "costruire", total: 1, difficulty: 3 };
assert.deepEqual(avanzamentoState(carta), { show: true, id: "costruire" });
assert.equal(avanzamentoState({ ...carta, total: 3 }).show, false, "riuscito: niente avanzamento");
assert.equal(avanzamentoState(carta, { costruire: true }).show, false, "uno per scena");
assert.equal(avanzamentoState(carta, { danneggiare: true }).show, true, "la scena conta per Formula");
for (const fuori of [{ formula: "" }, { sistema: false }, { skill: true }, { priced: true }, { forced: true }, { bought: true }, { avanzamento: true }, { saggezza: true }]) {
  assert.equal(avanzamentoState({ ...carta, ...fuori }).show, false, JSON.stringify(fuori));
}
const it = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8"));
const localize = (key) => key.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), it) ?? key;
const format = (key, data = {}) => String(localize(key)).replace(/\{(\w+)\}/g, (_, k) => String(data[k]));
assert.match(renderAvanzamentoButton("Costruire", localize, format), /data-avanzamento="prendi" title="Costruire prende un avanzamento se l'avevi descritta come si deve, o se interpreti il fallimento\. Uno per scena\.">Avanzamento<\/button>/);

// Il conto del riquadro: i dadi degli avanzamenti stanno nel tetto dei +3, e il premio non si applica.
const lancio = { ...emptyTiro(), arete: true, prize: true, spheres: ["matter"], scopes: { potency: 2, duration: 3 } };
const base = { arete: 2, attributeValue: 3, skillValue: 2 };
const senza = contoTiro(lancio, base);
assert.deepEqual([senza.prize, senza.difficulty, senza.pool], [2, 1, 5], "un incantesimo qualunque: il premio toglie 2");
const formula = contoTiro(lancio, { ...base, formula: { attiva: true, dadi: 2 } });
assert.deepEqual([formula.formula, formula.formulaDice, formula.prize, formula.difficulty, formula.pool], [true, 2, 0, 3, 7], "la Formula: due dadi dagli avanzamenti, il premio non c'è");
const pieno = contoTiro({ ...lancio, extra: 2, quintessence: 3 }, { ...base, quintessenceAvailable: 5, formula: { attiva: true, dadi: 3 } });
assert.deepEqual([pieno.extra, pieno.formulaDice, pieno.quintessence], [2, 1, 0], "il tetto: due dadi extra, uno degli avanzamenti, la Quintessenza resta fuori");
assert.equal(contoTiro({ ...emptyTiro(), attribute: "strength", soglia: 2 }, { ...base, formula: { attiva: true, dadi: 2 } }).formulaDice, 0, "fuori dalla Magick niente Formula");

// La Bussola (il Sistema): un dado fuori dal tetto; il tasto si accende e si spegne.
assert.equal(emptyTiro().bussola, false);
assert.deepEqual([setBussola(emptyTiro()).bussola, setBussola(setBussola(emptyTiro())).bussola, setBussola(emptyTiro(), false).bussola], [true, false, false]);
const conBussola = contoTiro({ ...lancio, extra: 3 }, { ...base, bussola: 1 });
assert.deepEqual([conBussola.extra, conBussola.bussolaDice, conBussola.pool], [3, 1, 9], "tre dadi extra nel tetto, e la Bussola fuori");

// La macchina: il riquadro conta gli avanzamenti e porta la Formula sulla carta; il tasto è registrato;
// il Cambio scena e la Nuova sessione tolgono il segno della scena; la Bussola nel riquadro.
const scheda = readFileSync(new URL("../scripts/tiro-scheda.js", import.meta.url), "utf8");
assert.match(scheda, /const formulaId = String\(spellOf\(actor, tiro\)\?\.formula \?\? ""\);/);
assert.match(scheda, /\.\.\.\(inputs\.formula\.attiva \? \{ formula: inputs\.formula\.id, formulaNome: spellName \|\| inputs\.formula\.id \} : \{\}\),/);
assert.equal((scheda.match(/await grantBussolaQuintessence\(actor, \{ label: localize\("WOD5E_MAGE\.Tiro\.Bussola"\) \}\);/g) ?? []).length, 2, "a tiro fatto, sui tiri di Abilità e sui lanci");
assert.match(readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8"), /registerAvanzamenti\(\);/);
assert.equal((readFileSync(new URL("../scripts/salute.js", import.meta.url), "utf8").match(/-=formuleScena/g) ?? []).length, 2);
const template = readFileSync(new URL("../templates/actor/parts/stat-tiro.hbs", import.meta.url), "utf8");
assert.match(template, /class="wod5e-mage-tiro-bussola\{\{#if tiro\.bussola\.on\}\} acceso\{\{\/if\}\}" data-action="tiroBussola"[^>]*title="\{\{tiro\.bussola\.hint\}\}"\{\{#if tiro\.bussola\.usata\}\} disabled\{\{\/if\}\}>/);
assert.match(readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8"), /tiroBussola: onTiroBussola/);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8")).WOD5E_MAGE;
  for (const key of ["Avanzamenti", "AvanzamentiHint", "AvanzamentiPieno", "AvanzamentiFlavor", "SenzaPremio", "Avanzamento", "AvanzamentoHint", "AvanzamentoPreso"]) assert.equal(typeof strings.Formule[key], "string", `${lang} Formule.${key}`);
  for (const key of ["Bussola", "BussolaHint", "BussolaUsata"]) assert.equal(typeof strings.Tiro[key], "string", `${lang} Tiro.${key}`);
}

console.log("Avanzamenti delle Formule e Bussola: test passati.");
