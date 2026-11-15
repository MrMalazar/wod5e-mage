import assert from "node:assert/strict";
globalThis.__sim = { rolls: [], messages: [], faces: [], situational: [] };
const strings = { "WOD5E_MAGE.RamoC.NoDice": "Nessun dado: fallito", "WOD5E_MAGE.Arete.BacklashLabel": "Contraccolpo", "WOD5E_MAGE.Arete.BacklashEyesOne": "un occhio", "WOD5E_MAGE.Arete.BacklashEyes": "{eyes} occhi", "WOD5E_MAGE.Bussola.Flavor": "Bussola: {label}" };
globalThis.game = {
  i18n: { lang: "it", localize: (k) => strings[k] ?? k, format: (k, d = {}) => Object.entries(d).reduce((t, [a, b]) => t.replace(`{${a}}`, String(b)), strings[k] ?? k) },
  settings: { get: () => "publicroll" }
};
globalThis.CONFIG = { Dice: { terms: {}, rollModes: {} } };
globalThis.Hooks = { once() {} };
globalThis.ChatMessage = {
  getSpeaker: ({ actor }) => ({ alias: actor.name }),
  applyRollMode: (data) => data,
  create: async (data) => { const m = { ...data, getFlag: (s, k) => data.flags?.[s]?.[k] }; globalThis.__sim.messages.push(m); return m; }
};
globalThis.foundry = { applications: { api: { DialogV2: {} }, handlebars: {} } };
globalThis.ui = { notifications: { info() {}, warn() {} } };

const { rollRamoCDirect, contoDice } = await import(new URL("../../scripts/paradox-dice.js", import.meta.url).href);
const { ROLL_CARD_FLAG } = await import(new URL("../../scripts/roll-card.js", import.meta.url).href);
const { rossiState } = await import(new URL("../../scripts/rossi.js", import.meta.url).href);
const actor = { name: "Ianira", system: {}, isOwner: true, getFlag: () => undefined, setFlag: async () => {} };

// Il tiro del Sistema (Blue, 14/11): si tira tutta la riserva, si riesce dal 6, le stelline
// contano a coppie, e servono successi pari alla soglia; quelli in più sono il margine.

// 1. Magick, Volgare: riserva 9, soglia 5 → nove dadi, e 2 rossi a parte. Quattro scintille
//    e una stellina spaiata fanno 5 successi: riesce giusto, senza margine. I rossi (un 9 e
//    un 4) restano a parte finché il giocatore non li prende.
globalThis.__sim.faces = [8, 3, 9, 7, 10, 2, 4, 5, 6, 9, 4];
let message = await rollRamoCDirect({ actor, data: actor.system, pool: 9, threshold: 5, paradoxRating: 2, burn: 5, sphereLevel: 0, arete: 3, title: "Destrezza + Velo", flavor: "<carta>", card: { symbols: [], traits: [] } });
let card = message.getFlag("wod5e-mage", ROLL_CARD_FLAG);
assert.deepEqual([card.total, card.margin, card.paradossale, card.ustione], [5, 0, undefined, undefined], "il 9 rosso non entra da solo, e senza occhi niente Contraccolpo");
assert.deepEqual(rossiState(card, globalThis.__sim.rolls.at(-1).basicDice.results, globalThis.__sim.rolls.at(-1).advancedDice.results), { show: true, presi: "", guadagno: 1, successi: 6 }, "sotto la carta il tasto: i rossi darebbero un successo");

//    Gli stessi dadi con un 10 sui rossi: la scelta non c'è. I successi dei rossi si prendono
//    (il 10 rosso fa coppia con quello della riserva: 4 scintille, una coppia e il 9), il tiro
//    è paradossale e l'occhio apre l'Ustione.
globalThis.__sim.faces = [8, 3, 9, 7, 10, 2, 4, 5, 6, 10, 9];
message = await rollRamoCDirect({ actor, data: actor.system, pool: 9, threshold: 5, paradoxRating: 2, burn: 5, sphereLevel: 0, arete: 3, title: "Destrezza + Velo", flavor: "<carta>", card: { symbols: [], traits: [] } });
let roll = globalThis.__sim.rolls.at(-1);
assert.equal(roll.formula, "9dmcs>5 + 2dpcs>5", "la soglia non toglie dadi, e i rossi nemmeno");
assert.equal(roll.options.mageSuccessFrom, 6);
assert.equal(roll.options.difficulty, 5, "la fascia legge i successi contro la soglia");
card = message.getFlag("wod5e-mage", ROLL_CARD_FLAG);
assert.deepEqual([card.pool, card.threshold, card.dice, card.difficulty, card.successFrom, card.advancedDifficulty, card.total, card.margin, card.countedParadox, card.rossiAParte, card.sistema], [9, 5, 9, 5, 6, false, 9, 4, 0, true, true], "col 10 rosso i successi dei rossi entrano: 5 scintille e una coppia di stelline");
assert.deepEqual([card.paradossale, card.rossiPresi], [true, "obbligo"], "il tiro è paradossale, e non per scelta");
assert.equal(rossiState(card, roll.basicDice.results, roll.advancedDice.results).show, false, "presi per forza: niente tasto");
assert.equal(card.ustione.threshold, 5, "il 10 sui rossi apre l'Ustione pari alla soglia");
assert.equal(card.ustione.eyes, 1);
assert.doesNotMatch(message.flavor, /−/, "niente più «riserva meno soglia» sulla carta");
assert.match(message.flavor, /WOD5E_MAGE\.RamoC\.RossiAParte/, "la carta dice che i rossi sono a parte");

// 2. Le stelline a coppie: due 10 valgono 4 successi. Con un 6 sono 5: a soglia 3 il margine è 2.
globalThis.__sim.faces = [10, 10, 6, 1];
message = await rollRamoCDirect({ actor, data: actor.system, pool: 4, threshold: 3, paradoxRating: 0, title: "Coppia", flavor: "<carta>", card: {} });
card = message.getFlag("wod5e-mage", ROLL_CARD_FLAG);
assert.deepEqual([card.total, card.margin, card.dice], [5, 2, 4]);
// Tre stelline: una coppia e una spaiata, 5 successi.
globalThis.__sim.faces = [10, 10, 10];
message = await rollRamoCDirect({ actor, data: actor.system, pool: 3, threshold: 1, paradoxRating: 0, title: "Tre stelline", flavor: "<carta>", card: {} });
assert.equal(message.getFlag("wod5e-mage", ROLL_CARD_FLAG).total, 5);

// 3. Tiro di Abilità: niente rossi anche col Paradosso sulla Ruota. Due successi a soglia 1: margine 1.
globalThis.__sim.faces = [6, 7, 2];
message = await rollRamoCDirect({ actor, data: actor.system, pool: 3, threshold: 1, paradoxRating: 4, skill: true, title: "Prontezza + Allerta", flavor: "<carta>", card: { symbols: [], traits: [] } });
roll = globalThis.__sim.rolls.at(-1);
assert.equal(roll.formula, "3dmcs>5 + 0dpcs>5", "un tiro di Abilità non tira rossi");
card = message.getFlag("wod5e-mage", ROLL_CARD_FLAG);
assert.deepEqual([card.total, card.margin, card.skill, card.successFrom, card.difficulty], [2, 1, true, 6, 1]);
// Gli stessi dadi a soglia 3: due successi non bastano. Fallito, e la carta dice la soglia vera.
globalThis.__sim.faces = [6, 7, 2];
message = await rollRamoCDirect({ actor, data: actor.system, pool: 3, threshold: 3, skill: true, title: "Prontezza + Allerta", flavor: "<carta>", card: {} });
card = message.getFlag("wod5e-mage", ROLL_CARD_FLAG);
assert.deepEqual([card.total, card.margin, card.difficulty, card.dice], [2, 0, 3, 3]);
// Senza soglia scritta ne serve comunque uno.
globalThis.__sim.faces = [2, 3];
message = await rollRamoCDirect({ actor, data: actor.system, pool: 2, threshold: 0, skill: true, title: "Senza soglia", flavor: "<carta>", card: {} });
assert.deepEqual([message.getFlag("wod5e-mage", ROLL_CARD_FLAG).difficulty, message.getFlag("wod5e-mage", ROLL_CARD_FLAG).total], [1, 0]);

// 4. Zero dadi e niente rossi (una Condizione che fa fallire): la carta senza tiro, fallita.
message = await rollRamoCDirect({ actor, data: actor.system, pool: 0, threshold: 4, paradoxRating: 0, title: "Senza dadi", flavor: "<carta>", card: {} });
card = message.getFlag("wod5e-mage", ROLL_CARD_FLAG);
assert.deepEqual([card.total, card.dice, card.difficulty], [0, 0, 4]);
assert.match(message.content, /Nessun dado: fallito/);

// 5. Zero dadi ma rossi sulla Ruota: i rossi si tirano lo stesso, e l'1 apre il Contraccolpo.
globalThis.__sim.faces = [7, 1];
message = await rollRamoCDirect({ actor, data: actor.system, pool: 0, threshold: 9, paradoxRating: 2, burn: 9, title: "Solo rossi", flavor: "<carta>", card: {} });
roll = globalThis.__sim.rolls.at(-1);
assert.equal(roll.formula, "0dmcs>5 + 2dpcs>5");
card = message.getFlag("wod5e-mage", ROLL_CARD_FLAG);
assert.deepEqual([card.total, card.dice, card.countedParadox, card.paradossale], [0, 0, 0, undefined], "il 7 rosso non entra fra i successi: i rossi stanno a parte finché non si prendono");
assert.equal(card.ustione.eyes, 1, "l'1 sul rosso apre il Contraccolpo");
assert.equal(card.ustione.threshold, 9, "l'Ustione vale la soglia dell'incantesimo");

// 6. La riuscita senza tirare di un potere: i successi della soglia, giusti, senza margine.
message = await rollRamoCDirect({ actor, data: actor.system, pool: 5, threshold: 4, paradoxRating: 0, bought: true, banner: "Riesce senza tirare", title: "Potere", flavor: "<carta>", card: {} });
card = message.getFlag("wod5e-mage", ROLL_CARD_FLAG);
assert.deepEqual([card.total, card.margin, card.difficulty, card.automatic, card.dice], [4, 0, 4, true, 0]);

// 7. contoDice: i numeri della finestra e del tiro diretto coincidono.
assert.deepEqual(contoDice({ pool: 9, threshold: 5, paradoxRating: 2 }), { pool: 9, threshold: 5, dice: 9, basicDice: 9, paradoxDice: 2, countedParadox: 0, eyeOnly: 2, totalDice: 11 });
assert.deepEqual(contoDice({ pool: 9, threshold: 5, paradoxRating: 2, bought: true }), { pool: 9, threshold: 5, dice: 0, basicDice: 0, paradoxDice: 2, countedParadox: 0, eyeOnly: 2, totalDice: 2 });
assert.equal(contoDice({ pool: 4, threshold: 0 }).threshold, 1, "la soglia non scende sotto 1");
assert.deepEqual(contoDice({ pool: 0, threshold: 0, paradoxRating: 3, onlyParadox: true }), { pool: 0, threshold: 0, dice: 0, basicDice: 0, paradoxDice: 3, countedParadox: 0, eyeOnly: 3, totalDice: 3 }, "lo Scoppio: solo rossi, senza soglia");

console.log("finta Foundry: 7 scenari ok, messaggi:", globalThis.__sim.messages.length);
