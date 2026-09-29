import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  calculateRamoCSuccesses,
  ADVANCED_SUCCESS_FROM,
  diceNote,
  isSuccess,
  ORIGINAL_SUCCESS_FROM,
  costoLancio,
  PAGAMENTI,
  pagamentoDelLancio,
  paradossoDelTipo,
  prezzoAllowed,
  quintessenceSpend,
  RAMO,
  ramoCDice,
  ramoCMargin,
  sforzoCost,
  splitRamoCDice,
  successModifier,
  successThreshold,
  testoCosto,
  TIPI_LANCIO,
  tipoDaOpzioni,
  usesAdvancedDifficulty,
  SUCCESS_FROM,
  ustioneAmount
} from "../scripts/ramo-c.js";
import { getMageDieImage, getParadoxDieResult } from "../scripts/dice-faces.js";
import { rollOutcome } from "../scripts/roll-card.js";
import { sforzoState } from "../scripts/sforzo.js";
import { prezzoState } from "../scripts/prezzo.js";
import { recountCard, rerollableDice, volontaState } from "../scripts/volonta.js";
import { datasetPool, skillRollCard } from "../scripts/mage-roll-selection.js";
import { normalizeMagickRollOptions } from "../scripts/arete.js";

// Il ramo C (verdetti di Blue, 11/9): la soglia toglie dadi, un 8 riesce.
assert.equal(RAMO, "C");
assert.equal(SUCCESS_FROM, 8, "il ripiego delle carte vecchie");
assert.equal(successModifier(), "cs>5");
assert.equal(successModifier(8), "cs>7");
assert.equal(ORIGINAL_SUCCESS_FROM, 6);
assert.equal(ADVANCED_SUCCESS_FROM, 8);
assert.equal(successThreshold(false), 6);
assert.equal(successThreshold(true), 8);
// La difficoltà dipende solo da Volgare con testimoni, anche nelle risposte
// "on" dei passi della modale semplificata e degli incantesimi salvati.
for (const [answers, expected] of [
  [{}, 6],
  [{ coincidental: true }, 6],
  [{ vulgar: true }, 6],
  [{ witnesses: true }, 8],
  [{ witnesses: "on" }, 8],
  [{ vulgar: true, witnesses: true }, 8],
  [{ witnesses: false }, 6],
  [{ witnesses: "false" }, 6]
]) {
  const options = normalizeMagickRollOptions(answers);
  const advancedDifficulty = usesAdvancedDifficulty(options);
  const successFrom = successThreshold(advancedDifficulty);
  assert.equal(successFrom, expected, JSON.stringify(answers));
  // Stesso esito per dadi normali, dadi Paradosso e ricalcolo della carta.
  const results = [{ result: 6 }, { result: 7 }, { result: 8 }];
  assert.equal(calculateRamoCSuccesses(results, results, Infinity, { successFrom }), expected === 6 ? 6 : 2);
  assert.equal(recountCard({ ramo: "C", advancedDifficulty, successFrom }, results, results), expected === 6 ? 6 : 2);
  assert.equal(rerollableDice(results, [], { successFrom }).length, expected === 6 ? 0 : 2);
}
assert.equal(usesAdvancedDifficulty(), false);
assert.equal(usesAdvancedDifficulty({ witnesses: true, skill: true }), false);
assert.equal(usesAdvancedDifficulty({ witnesses: true, onlyParadox: true }), false);
assert.equal(successModifier(6), "cs>5");
assert.equal(successModifier(8), "cs>7");
assert.equal(isSuccess({ result: 8 }), true);
assert.equal(isSuccess({ result: 7 }), false);
assert.equal(isSuccess(10), true);

// L'esempio dello studio: riserva 6, soglia 3, tre dadi; soglia 5, uno; soglia 7, zero.
assert.deepEqual(ramoCDice(6, 3), { pool: 6, threshold: 3, dice: 3 });
assert.deepEqual(ramoCDice(6, 5), { pool: 6, threshold: 5, dice: 1 });
assert.deepEqual(ramoCDice(6, 7), { pool: 6, threshold: 7, dice: 0 });
assert.deepEqual(ramoCDice("x", -2), { pool: 0, threshold: 0, dice: 0 });
assert.equal(diceNote({ pool: 6, threshold: 3, dice: 3 }), "6 − 3 = 3");

// I rossi a parte (verdetto di Blue del 29/9: «il paradosso non si sostituisce più ai
// dadi che fai per tirare, ma viene tirato a parte»): la riserva tira tutti i suoi dadi,
// i rossi si tirano accanto, tanti quanto il Paradosso, e non contano per la riuscita.
assert.deepEqual(splitRamoCDice(3, 2), { basicDice: 3, paradoxDice: 2, countedParadox: 0, eyeOnly: 2, totalDice: 5 });
assert.deepEqual(splitRamoCDice(1, 3), { basicDice: 1, paradoxDice: 3, countedParadox: 0, eyeOnly: 3, totalDice: 4 });
assert.deepEqual(splitRamoCDice(0, 4), { basicDice: 0, paradoxDice: 4, countedParadox: 0, eyeOnly: 4, totalDice: 4 });
assert.deepEqual(splitRamoCDice(5, 0), { basicDice: 5, paradoxDice: 0, countedParadox: 0, eyeOnly: 0, totalDice: 5 });

// Il costo del lancio (29/9): 1 Quintessenza, oppure il Paradosso del tipo
// (Accidentale 1, Volgare 2, con testimoni 3); chi paga in Quintessenza prende
// lo stesso il Paradosso del Volgare.
assert.deepEqual(TIPI_LANCIO, ["accidentale", "volgare", "testimoni"]);
assert.deepEqual(PAGAMENTI, ["quintessenza", "paradosso"]);
assert.equal(tipoDaOpzioni(), "accidentale");
assert.equal(tipoDaOpzioni({ vulgar: true }), "volgare");
assert.equal(tipoDaOpzioni({ vulgar: true, witnesses: true }), "testimoni");
assert.deepEqual(TIPI_LANCIO.map((kind) => paradossoDelTipo(kind)), [0, 1, 2]);
assert.deepEqual(costoLancio("accidentale", "quintessenza"), { pay: "quintessenza", quintessenza: 1, paradosso: 0 });
assert.deepEqual(costoLancio("accidentale", "paradosso"), { pay: "paradosso", quintessenza: 0, paradosso: 1 });
assert.deepEqual(costoLancio("volgare", "quintessenza"), { pay: "quintessenza", quintessenza: 1, paradosso: 1 });
assert.deepEqual(costoLancio("volgare", "paradosso"), { pay: "paradosso", quintessenza: 0, paradosso: 2 });
assert.deepEqual(costoLancio("testimoni", "quintessenza"), { pay: "quintessenza", quintessenza: 1, paradosso: 2 });
assert.deepEqual(costoLancio("testimoni", "paradosso"), { pay: "paradosso", quintessenza: 0, paradosso: 3 });
assert.deepEqual(costoLancio("volgare", null), { pay: "paradosso", quintessenza: 0, paradosso: 2 }, "senza scelta valida si paga in Paradosso");
// Chi paga: la scelta, se si può; senza Quintessenza libera si paga in Paradosso, sempre possibile.
assert.equal(pagamentoDelLancio(null, 2), "quintessenza", "senza scelta: la Quintessenza quando c'è");
assert.equal(pagamentoDelLancio(null, 0), "paradosso");
assert.equal(pagamentoDelLancio("quintessenza", 0), "paradosso", "la Quintessenza che non c'è non si paga");
assert.equal(pagamentoDelLancio("paradosso", 5), "paradosso");
// In parole: chiavi fuori da Foundry, i numeri dentro format.
const formatta = (key, data) => `${key.split(".").pop()}:${data?.points ?? ""}`;
assert.equal(testoCosto(costoLancio("volgare", "quintessenza"), (key) => key.split(".").pop(), formatta), "PuntiQuintessenza:1 E PuntiParadosso:1");
assert.equal(testoCosto(costoLancio("testimoni", "paradosso"), (key) => key, formatta), "PuntiParadosso:3");
assert.equal(testoCosto({}, (key) => key, formatta), "");

// I successi: 8 o più, i rossi fino a quelli che contano, niente coppie di dieci.
assert.equal(calculateRamoCSuccesses([{ result: 8 }, { result: 7 }, { result: 10 }]), 2);
assert.equal(calculateRamoCSuccesses([{ result: 10 }, { result: 10 }]), 2, "nel ramo C i critici non esistono");
assert.equal(calculateRamoCSuccesses([{ result: 6 }], [{ result: 9 }, { result: 8 }], 1), 1, "un rosso solo conta");
assert.equal(calculateRamoCSuccesses([], [{ result: 9 }, { result: 8 }], 0), 0, "rossi solo per l'occhio");
assert.equal(calculateRamoCSuccesses([], [{ result: 9 }, { result: 8 }]), 2, "senza tetto contano tutti");
assert.equal(calculateRamoCSuccesses([{ result: 9, discarded: true }, { result: 9, active: false }], []), 0);
assert.equal(calculateRamoCSuccesses([{ result: 6 }, { result: 7 }], [], Infinity, { successFrom: 6 }), 2, "senza difficolta avanzata conta dal 6");
assert.equal(calculateRamoCSuccesses([{ result: 6 }, { result: 7 }, { result: 8 }], [], Infinity, { successFrom: 8 }), 1, "con difficolta avanzata conta dall'8");

// Il margine dei tiri di Abilità: i successi oltre il primo.
assert.equal(ramoCMargin(0), 0);
assert.equal(ramoCMargin(1), 0);
assert.equal(ramoCMargin(3), 2);

// La Quintessenza (Blue, 16/9): un dado per punto, e basta. La riuscita comprata è caduta.
assert.deepEqual(quintessenceSpend(2, 3), { spent: 2, price: 0, bought: false, dice: 2 });
assert.deepEqual(quintessenceSpend(3, 3), { spent: 3, price: 0, bought: false, dice: 3 }, "al livello della Sfera non si compra più niente");
assert.deepEqual(quintessenceSpend(4), { spent: 4, price: 0, bought: false, dice: 4 });
assert.deepEqual(quintessenceSpend(-1), { spent: 0, price: 0, bought: false, dice: 0 });

// L'Ustione pari alla soglia senza tetto; Sforzare costa la soglia; Vittoria a un prezzo con almeno un dado.
assert.equal(ustioneAmount(9), 9);
assert.equal(sforzoCost(4), 4);
assert.equal(prezzoAllowed({ total: 0, dice: 1 }), true);
assert.equal(prezzoAllowed({ total: 0, dice: 0 }), false);
assert.equal(prezzoAllowed({ total: 1, dice: 3 }), false);

// Le facce: 6 e 7 sono vuote, 8 e 9 scintilla, 10 stellina; sui rossi 1 e 10 sono l'occhio.
assert.match(getMageDieImage(8), /magick-scintilla\.svg$/);
assert.match(getMageDieImage(10), /magick-stellina\.svg$/);
assert.match(getMageDieImage(7), /dado-vuoto\.svg$/);
assert.match(getMageDieImage(6), /dado-vuoto\.svg$/);
assert.equal(getParadoxDieResult(7), "failure");
// Dal 29/9 i rossi decidono solo lo scoppio: l'8 è una faccia vuota.
assert.equal(getParadoxDieResult(8), "failure");
assert.equal(getParadoxDieResult(1), "bestial");
assert.equal(getParadoxDieResult(10), "paradoxTen");
assert.match(getMageDieImage(6, { successFrom: 6 }), /magick-scintilla\.svg$/);
assert.equal(getParadoxDieResult(6, { successFrom: 6 }), "failure", "un rosso non fa mai successo");

// La fascia: un successo basta; le carte vecchie con la riuscita comprata tengono la loro parola.
assert.equal(rollOutcome(1, 1, (k) => k).text, "WOD5E_MAGE.RollCard.Success");
assert.equal(rollOutcome(0, 1, (k) => k).text, "WOD5E_MAGE.RollCard.Failure");
assert.equal(rollOutcome(1, 1, (k) => k, { bought: true }).text, "WOD5E_MAGE.RollCard.Bought");

// I tasti sotto la carta nel ramo C: Sforzare paga la soglia; Vittoria a un
// prezzo con almeno un dado; la Volontà ritira i dadi sotto l'8.
assert.deepEqual(sforzoState({ total: 0, difficulty: 1, threshold: 4, ramo: "C" }), { show: true, missing: 4 });
assert.deepEqual(sforzoState({ total: 1, difficulty: 1, threshold: 4, ramo: "C" }), { show: false, missing: 0 });
assert.deepEqual(sforzoState({ total: 0, difficulty: 1, threshold: 4, ramo: "C", skill: true }), { show: false, missing: 0 }, "non sui tiri di Abilità");
assert.deepEqual(sforzoState({ total: 0, difficulty: 1, threshold: 0, ramo: "C" }), { show: false, missing: 0 }, "senza soglia niente da pagare");
assert.deepEqual(prezzoState({ total: 0, difficulty: 1, dice: 2 }), { show: true, enabled: true, missing: 1, dice: 2 });
assert.deepEqual(prezzoState({ total: 0, difficulty: 1, dice: 0 }), { show: true, enabled: false, missing: 1, dice: 0 }, "a zero dadi il tasto c'è ma è spento");
assert.deepEqual(prezzoState({ total: 0, difficulty: 1, dice: 2, skill: true }), { show: false, enabled: false, missing: 0 });
// Dall'11/9 anche il rosso con l'1 si ritira (l'occhio resta); il 10 è un successo e no.
assert.deepEqual(rerollableDice([{ result: 7 }, { result: 8 }, { result: 2 }], [{ result: 1 }, { result: 6 }, { result: 10 }]), [
  { kind: "basic", index: 0 }, { kind: "basic", index: 2 }, { kind: "paradox", index: 0 }, { kind: "paradox", index: 1 }
]);
assert.deepEqual(rerollableDice([{ result: 7 }, { result: 5 }], [], { successFrom: 6 }), [{ kind: "basic", index: 1 }], "i messaggi del ramo A leggono il 6");
// I rossi a parte (29/9): la Volontà ritira solo i bianchi.
assert.deepEqual(rerollableDice([{ result: 7 }, { result: 8 }], [{ result: 1 }, { result: 6 }], { rossi: false }), [{ kind: "basic", index: 0 }]);
assert.equal(recountCard({ ramo: "C", countedParadox: 1 }, [{ result: 8 }, { result: 7 }], [{ result: 9 }, { result: 8 }]), 2);
assert.equal(recountCard({ ramo: "C", advancedDifficulty: false }, [{ result: 6 }], []), 1);
assert.equal(recountCard({ ramo: "C", advancedDifficulty: true }, [{ result: 6 }], []), 0);
assert.equal(recountCard({ autoSuccesses: 1 }, [{ result: 6 }], []), 2, "le carte del ramo A contano come prima");
assert.equal(volontaState({ total: 0, difficulty: 1, failedCount: 2 }).show, true);

// I tiri di Abilità dal dataset del sistema: percorsi sommati, dadi piatti, valore assoluto.
const system = { attributes: { wits: { value: 3 } }, skills: { athletics: { value: 2 } } };
assert.deepEqual(datasetPool(system, { valuePaths: "attributes.wits.value skills.athletics.value", flatMod: "1" }), {
  pool: 6, parts: [{ path: "attributes.wits.value", value: 3 }, { path: "skills.athletics.value", value: 2 }], flatMod: 1, absolute: null
});
assert.equal(datasetPool(system, { valuePaths: "attributes.wits.value", useAbsoluteValue: "true", absoluteValue: "4" }).pool, 4);
assert.equal(datasetPool(system, {}).pool, 0);
const skillCard = skillRollCard({ traits: [{ label: "Prontezza", value: 3 }], flatMod: 1 }, (k) => k);
assert.match(skillCard, /Prontezza 3 \+ \+1/);
assert.doesNotMatch(skillCard, /RollCard\.Threshold|RollCard\.Type/, "senza soglia fissa né Tipo");

// La macchina: la formula cs>7, l'Ustione in attesa sulla carta, niente Ustione automatica.
const dice = readFileSync(new URL("../scripts/paradox-dice.js", import.meta.url), "utf8");
assert.match(dice, /const advancedDifficulty = usesAdvancedDifficulty\(\{ witnesses, skill, onlyParadox \}\)/);
assert.match(dice, /const successFrom = successThreshold\(advancedDifficulty\)/);
assert.doesNotMatch(dice, /#inputAdvancedDifficulty/);
// Il tiro diretto dalla scheda (16/9) passa dallo stesso esecutore della finestra.
assert.match(dice, /export async function executeRamoCRoll\(/);
assert.match(dice, /export async function rollRamoCDirect\(/);
assert.match(dice, /export function contoDice\(/);
const arete = readFileSync(new URL("../scripts/arete.js", import.meta.url), "utf8");
assert.match(arete, /rollAreteWithParadox\(\{\s*pool: conto\.pool,\s*threshold,\s*witnesses: options\.witnesses,/);
assert.match(dice, /\$\{modifier\} \+ \$\{conto\.paradoxDice\}d\$\{ParadoxDie\.DENOMINATION\}\$\{modifier\}/);
assert.match(dice, /cardData\.ustione = \{ threshold: burnNow, sphere: Math\.max\(Math\.trunc\(Number\(sphereLevel\) \|\| 0\), 0\), tens, kind: effectKind \?\? "", eyes, choice: "" \}/);
assert.doesNotMatch(dice, /applyUstione/);
assert.match(dice, /difficulty: 1,/);
const confirm = readFileSync(new URL("../templates/dialogs/arete-roll-confirm.hbs", import.meta.url), "utf8");
assert.match(confirm, /data-role="diceOut"/);
assert.match(confirm, /id="inputParadoxDice" value="\{\{paradoxDice\}\}" readonly/);
assert.doesNotMatch(confirm, /paradoxPlus|paradoxMinus/);
assert.doesNotMatch(confirm, /inputAdvancedDifficulty|name="advancedDifficulty"/);
const selection = readFileSync(new URL("../scripts/mage-roll-selection.js", import.meta.url), "utf8");
assert.match(selection, /skill: true,/);
assert.match(selection, /if \(!isMageActor\(actor\)\) return WOD5E\.api\.RollFromDataset/);
const salute = readFileSync(new URL("../scripts/salute.js", import.meta.url), "utf8");
assert.match(salute, /pool: resolve \+ composure,[\s\S]*skill: true,/);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8"));
  for (const key of ["Pool", "Threshold", "Dice", "DiceLine", "Reds", "RossiAParte", "DiceNote", "NoDice", "BoughtBanner", "MarginHint", "SkillRoll"]) {
    assert.equal(typeof strings.WOD5E_MAGE.RamoC[key], "string", `${lang} RamoC.${key}`);
  }
  assert.equal(strings.WOD5E_MAGE.RamoC.AdvancedDifficulty, undefined, `${lang}: la casella della difficoltà avanzata è caduta (16/9)`);
  assert.equal(typeof strings.WOD5E_MAGE.RollCard.Bought, "string", "le carte vecchie leggono ancora la parola");
  // La riuscita comprata è caduta (16/9): niente tasto in chat, niente nel dialogo.
  assert.equal(strings.WOD5E_MAGE.Compra, undefined, `${lang}: Compra`);
  assert.equal(strings.WOD5E_MAGE.RamoC.BuyPrice, undefined, `${lang}: BuyPrice`);
  assert.equal(typeof strings.WOD5E_MAGE.Arete.SpecialtyDice, "string");
  assert.equal(strings.WOD5E_MAGE.Arete.AutoVictory, undefined, `${lang}: la vittoria automatica del ramo A è caduta`);
  // La parola «gettone» non entra (verdetto di Blue). Il token della mappa, quello di
  // Foundry, entra solo nell'impostazione dei nomi delle schede sui token (25/9).
  const senzaMappa = { ...strings.WOD5E_MAGE, Settings: { ...strings.WOD5E_MAGE.Settings, NomiScheda: undefined } };
  assert.doesNotMatch(JSON.stringify({ ...strings, WOD5E_MAGE: senzaMappa }), /gettone|token/i);
}

console.log("Ramo C: test passati.");
