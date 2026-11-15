import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  calculateRamoCSuccesses,
  ADVANCED_SUCCESS_FROM,
  isSuccess,
  ORIGINAL_SUCCESS_FROM,
  costoLancio,
  PAGAMENTI,
  pagamentoDelLancio,
  paradossoDelTipo,
  quintessenceSpend,
  RAMO,
  successoParadossale,
  splitRamoCDice,
  successModifier,
  successThreshold,
  testoCosto,
  TIPI_LANCIO,
  tipoDaOpzioni,
  SUCCESS_FROM
} from "../scripts/ramo-c.js";
import { getMageDieImage, getParadoxDieResult } from "../scripts/dice-faces.js";
import { rollOutcome } from "../scripts/roll-card.js";
import { indulgereState } from "../scripts/indulgere.js";
import { prezzoState } from "../scripts/prezzo.js";
import { recountCard, rerollableDice, volontaState } from "../scripts/volonta.js";
import { datasetPool, skillRollCard } from "../scripts/mage-roll-selection.js";
import { normalizeMagickRollOptions } from "../scripts/arete.js";

// Quel che resta del ramo C dopo il Sistema (14/11): i tipi di lancio e il loro costo, i rossi a
// parte, e la lettura delle carte di prima (riuscita dal 6 o dall'8, niente coppie). Il tiro nuovo,
// tutta la riserva e successi pari alla soglia, sta in sistema.js e nelle sue prove.
assert.equal(RAMO, "C");
assert.equal(SUCCESS_FROM, 8, "il ripiego delle carte vecchie");
assert.equal(successModifier(), "cs>5");
assert.equal(successModifier(8), "cs>7");
assert.equal(ORIGINAL_SUCCESS_FROM, 6);
assert.equal(ADVANCED_SUCCESS_FROM, 8);
assert.equal(successThreshold(false), 6);
assert.equal(successThreshold(true), 8);
// Le carte di prima portano scritta la riuscita, 6 oppure 8 (il Volgare con testimoni): si
// rileggono e si ricontano così, dadi normali e rossi, anche dopo il Sistema.
for (const [advancedDifficulty, expected] of [[false, 6], [true, 8]]) {
  const successFrom = successThreshold(advancedDifficulty);
  assert.equal(successFrom, expected);
  const results = [{ result: 6 }, { result: 7 }, { result: 8 }];
  assert.equal(calculateRamoCSuccesses(results, results, Infinity, { successFrom }), expected === 6 ? 6 : 2);
  assert.equal(recountCard({ ramo: "C", advancedDifficulty, successFrom }, results, results), expected === 6 ? 6 : 2);
  assert.equal(rerollableDice(results, [], { successFrom }).length, expected === 6 ? 0 : 2);
}
// I testimoni restano un tipo di lancio; la riuscita dall'8 non c'è più.
assert.equal(normalizeMagickRollOptions({ witnesses: "on" }).witnesses, true);
assert.equal(successModifier(6), "cs>5");
assert.equal(successModifier(8), "cs>7");
assert.equal(isSuccess({ result: 8 }), true);
assert.equal(isSuccess({ result: 7 }), false);
assert.equal(isSuccess(10), true);

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

// La Quintessenza (Blue, 16/9): un dado per punto, e basta. La riuscita comprata è caduta.
assert.deepEqual(quintessenceSpend(2, 3), { spent: 2, price: 0, bought: false, dice: 2 });
assert.deepEqual(quintessenceSpend(3, 3), { spent: 3, price: 0, bought: false, dice: 3 }, "al livello della Sfera non si compra più niente");
assert.deepEqual(quintessenceSpend(4), { spent: 4, price: 0, bought: false, dice: 4 });
assert.deepEqual(quintessenceSpend(-1), { spent: 0, price: 0, bought: false, dice: 0 });

// Le facce: 6 e 7 sono vuote, 8 e 9 scintilla, 10 stellina; sui rossi 1 e 10 sono l'occhio.
assert.match(getMageDieImage(8), /magick-scintilla\.svg$/);
assert.match(getMageDieImage(10), /magick-stellina\.svg$/);
assert.match(getMageDieImage(7), /dado-vuoto\.svg$/);
assert.match(getMageDieImage(6), /dado-vuoto\.svg$/);
assert.equal(getParadoxDieResult(7), "failure");
// I rossi a parte (29/9) non contano per la riuscita, ma l'8 mostra la scintilla (30/9, il successo paradossale).
assert.equal(getParadoxDieResult(8), "success");
assert.equal(getParadoxDieResult(1), "bestial");
assert.equal(getParadoxDieResult(10), "paradoxTen");
assert.match(getMageDieImage(6, { successFrom: 6 }), /magick-scintilla\.svg$/);
assert.equal(getParadoxDieResult(6, { successFrom: 6 }), "success", "coi Volgari senza testimoni il rosso fa successo dal 6");

// Il successo paradossale (Blue, 30/9): la riserva riesce e almeno un rosso fa successo.
{
  const carta = { ramo: "C", rossiAParte: true, total: 1, successFrom: 6 };
  const rossi = [{ result: 7, active: true }, { result: 3, active: true }];
  assert.equal(successoParadossale(carta, rossi), 1, "riesce e un rosso fa 7 col 6");
  assert.equal(successoParadossale({ ...carta, total: 0 }, rossi), 0, "col lancio fallito non c'è");
  assert.equal(successoParadossale({ ...carta, successFrom: 8 }, rossi), 0, "con testimoni il 7 non è un successo");
  assert.equal(successoParadossale({ ...carta, successFrom: 8 }, [{ result: 10, active: true }]), 1, "il 10 fa successo, e scoppia");
  assert.equal(successoParadossale(carta, [{ result: 9, active: false, discarded: true }]), 0, "un rosso scartato non conta");
  assert.equal(successoParadossale({ ...carta, rossiAParte: false }, rossi), 0, "le carte di prima no");
  assert.equal(successoParadossale({ ...carta, skill: true }, rossi), 0, "i tiri di Abilità no");
  assert.equal(successoParadossale({ ...carta, burst: true }, rossi), 0, "lo Scoppio no");
  assert.equal(successoParadossale(carta, []), 0, "senza rossi no");
  // Col Sistema il tiro è paradossale quando prende i successi dei rossi: lo dice la carta, non i dadi (rossi.js).
  const nuova = { ...carta, sistema: true, difficulty: 3 };
  assert.equal(successoParadossale({ ...nuova, total: 2 }, rossi), 0);
  assert.equal(successoParadossale({ ...nuova, total: 3 }, rossi), 0, "riesce e un rosso ha fatto successo, ma nessuno l'ha preso");
}

// La fascia: servono successi pari alla soglia (sulle carte di prima la soglia scritta è 1); le
// carte vecchie con la riuscita comprata tengono la loro parola.
assert.equal(rollOutcome(1, 1, (k) => k).text, "WOD5E_MAGE.RollCard.Success");
assert.equal(rollOutcome(0, 1, (k) => k).text, "WOD5E_MAGE.RollCard.Failure");
assert.deepEqual(rollOutcome(2, 3, (k) => k), { total: 2, cssClass: "failure", text: "WOD5E_MAGE.RollCard.Failure", missing: 1 });
assert.equal(rollOutcome(3, 3, (k) => k).text, "WOD5E_MAGE.RollCard.Success");
assert.equal(rollOutcome(1, 1, (k) => k, { bought: true }).text, "WOD5E_MAGE.RollCard.Bought");

// I tasti sotto la carta: Tira Saggezza sul lancio indulto (3/10), con la soglia
// dell'incantesimo fino a 7; Vittoria a un prezzo su ogni tiro fallito con almeno
// un dado, di Abilità o di Magick; la Volontà ritira i dadi falliti.
assert.deepEqual(indulgereState({ total: 0, difficulty: 1, threshold: 4, ramo: "C", indulgi: "hubris" }), { show: true, lato: "hubris", soglia: 4 });
assert.deepEqual(indulgereState({ total: 1, difficulty: 1, threshold: 4, ramo: "C", indulgi: "silenzio" }), { show: true, lato: "silenzio", soglia: 4 }, "anche riuscito: indulgere si paga sempre");
assert.deepEqual(indulgereState({ total: 0, difficulty: 1, threshold: 4, ramo: "C" }), { show: false, lato: "", soglia: 0 }, "senza dichiararlo prima, niente");
assert.equal(indulgereState({ threshold: 9, indulgi: "hubris" }).soglia, 7, "la soglia dell'incantesimo fa da gradino, fino a 7");
assert.deepEqual(prezzoState({ total: 0, difficulty: 1, dice: 2 }), { show: true, enabled: true, missing: 1, dice: 2 });
assert.deepEqual(prezzoState({ total: 0, difficulty: 1, dice: 0 }), { show: true, enabled: false, missing: 1, dice: 0 }, "a zero dadi il tasto c'è ma è spento");
assert.deepEqual(prezzoState({ total: 2, difficulty: 4, dice: 5 }), { show: true, enabled: true, missing: 2, dice: 5 }, "mancano due successi: il prezzo cresce con loro");
assert.deepEqual(prezzoState({ total: 4, difficulty: 4, dice: 5 }), { show: false, enabled: false, missing: 0 }, "a tiro riuscito niente tasto");
assert.deepEqual(prezzoState({ total: 0, difficulty: 1, dice: 2, saggezza: true }), { show: false, enabled: false, missing: 0 }, "sui tiri di Saggezza no");
assert.deepEqual(prezzoState({ total: 0, difficulty: 1, dice: 2, soloConto: true }), { show: false, enabled: false, missing: 0 }, "sul Relax, che conta i successi e basta, no");
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
// Col Sistema si ricontano i dadi della riserva, le stelline a coppie; i rossi a parte non entrano.
assert.equal(recountCard({ ramo: "C", sistema: true }, [{ result: 10 }, { result: 10 }, { result: 6 }, { result: 5 }], [{ result: 9 }]), 5);
assert.equal(recountCard({ ramo: "C", sistema: true }, [{ result: 10 }, { result: 7 }, { result: 3, active: false, discarded: true }], []), 2);
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

// La macchina: si tira tutta la riserva dal 6, i successi si contano col Sistema, la soglia sta
// sulla carta, l'Ustione aspetta sulla carta e non scatta da sola.
const dice = readFileSync(new URL("../scripts/paradox-dice.js", import.meta.url), "utf8");
assert.match(dice, /const successFrom = RIUSCITA_DA;/);
assert.match(dice, /const dice = bought \|\| onlyParadox \? 0 : conto\.pool;/, "tutta la riserva: la soglia non toglie dadi");
assert.match(dice, /roll\._total = bought \? soglia : contaSuccessi\(basicResults\)\.successi;/);
assert.match(dice, /cardData\.margin = esito\(\{ successi: roll\._total, soglia \}\)\.margine;/);
assert.match(dice, /sistema: true,/, "la carta porta il segno del Sistema");
assert.doesNotMatch(dice, /ramoCDice|usesAdvancedDifficulty|forcedSuccessFrom|ramoCMargin|diceNote/);
assert.doesNotMatch(dice, /#inputAdvancedDifficulty/);
// Il tiro diretto dalla scheda (16/9) passa dallo stesso esecutore della finestra.
assert.match(dice, /export async function executeRamoCRoll\(/);
assert.match(dice, /export async function rollRamoCDirect\(/);
assert.match(dice, /export function contoDice\(/);
const arete = readFileSync(new URL("../scripts/arete.js", import.meta.url), "utf8");
assert.match(arete, /rollAreteWithParadox\(\{\s*pool: conto\.pool,\s*threshold,\s*bonusDice,/);
assert.match(dice, /\$\{modifier\} \+ \$\{conto\.paradoxDice\}d\$\{ParadoxDie\.DENOMINATION\}\$\{modifier\}/);
assert.match(dice, /cardData\.ustione = \{ threshold: burnNow, sphere: Math\.max\(Math\.trunc\(Number\(sphereLevel\) \|\| 0\), 0\), tens, kind: effectKind \?\? "", eyes, choice: "" \}/);
assert.doesNotMatch(dice, /applyUstione/);
assert.match(dice, /difficulty: soglia,/, "la fascia legge i successi contro la soglia");
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
  for (const key of ["Pool", "Threshold", "Dice", "DiceLine", "Reds", "RossiAParte", "NoDice", "BoughtBanner", "MarginHint", "SkillRoll"]) {
    assert.equal(typeof strings.WOD5E_MAGE.RamoC[key], "string", `${lang} RamoC.${key}`);
  }
  assert.equal(strings.WOD5E_MAGE.RamoC.DiceNote, undefined, `${lang}: la nota «riserva meno soglia» è caduta col Sistema`);
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
