import assert from "node:assert/strict";
globalThis.__sim = { rolls: [], messages: [], faces: [], situational: [] };
const strings = { "WOD5E_MAGE.RamoC.DiceNote": "Dadi: {note}", "WOD5E_MAGE.RamoC.NoDice": "Nessun dado: fallito", "WOD5E_MAGE.Arete.BacklashLabel": "Contraccolpo", "WOD5E_MAGE.Arete.BacklashEyesOne": "un occhio", "WOD5E_MAGE.Arete.BacklashEyes": "{eyes} occhi", "WOD5E_MAGE.Bussola.Flavor": "Bussola: {label}" };
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
const actor = { name: "Ianira", system: {}, isOwner: true, getFlag: () => undefined, setFlag: async () => {} };

// 1. Magick, Volgare con testimoni: riserva 9, soglia 5 → 4 dadi; 2 rossi convertiti; riuscita dall'8.
globalThis.__sim.faces = [8, 3, 9, 10];
let message = await rollRamoCDirect({ actor, data: actor.system, pool: 9, threshold: 5, successFrom: 8, paradoxRating: 2, burn: 5, sphereLevel: 0, arete: 3, title: "Destrezza + Velo", flavor: "<carta>", card: { symbols: [], traits: [] } });
let roll = globalThis.__sim.rolls.at(-1);
assert.equal(roll.formula, "2dmcs>7 + 2dpcs>7");
assert.equal(roll.options.mageSuccessFrom, 8);
let card = message.getFlag("wod5e-mage", ROLL_CARD_FLAG);
assert.deepEqual([card.pool, card.threshold, card.dice, card.successFrom, card.advancedDifficulty, card.total], [9, 5, 4, 8, true, 3], "8, 9 e 10 riescono; il 3 no");
assert.equal(card.ustione.threshold, 5, "il 10 sui rossi apre l'Ustione pari alla soglia");
assert.equal(card.ustione.eyes, 1);
assert.match(message.flavor, /Dadi: 9 − 5 = 4/);

// 2. Tiro di Abilità: niente rossi, riuscita dal 6, il margine oltre il primo successo.
globalThis.__sim.faces = [6, 7, 2];
message = await rollRamoCDirect({ actor, data: actor.system, pool: 3, threshold: 0, successFrom: 6, paradoxRating: 4, skill: true, title: "Prontezza + Allerta", flavor: "<carta>", card: { symbols: [], traits: [] } });
roll = globalThis.__sim.rolls.at(-1);
assert.equal(roll.formula, "3dmcs>5 + 0dpcs>5", "un tiro di Abilità non tira rossi anche col Paradosso sulla Ruota");
card = message.getFlag("wod5e-mage", ROLL_CARD_FLAG);
assert.deepEqual([card.total, card.margin, card.skill, card.successFrom], [2, 1, true, 6]);

// 3. Zero dadi e niente rossi: la carta senza tiro, fallita.
message = await rollRamoCDirect({ actor, data: actor.system, pool: 4, threshold: 9, successFrom: 6, paradoxRating: 0, title: "Impossibile", flavor: "<carta>", card: {} });
card = message.getFlag("wod5e-mage", ROLL_CARD_FLAG);
assert.deepEqual([card.total, card.dice], [0, 0]);
assert.match(message.content, /Nessun dado: fallito/);

// 4. Zero dadi ma rossi sulla Ruota: i rossi si tirano lo stesso e possono riuscire.
globalThis.__sim.faces = [7, 1];
message = await rollRamoCDirect({ actor, data: actor.system, pool: 4, threshold: 9, successFrom: 6, paradoxRating: 2, burn: 9, title: "Solo rossi", flavor: "<carta>", card: {} });
roll = globalThis.__sim.rolls.at(-1);
assert.equal(roll.formula, "0dmcs>5 + 2dpcs>5");
card = message.getFlag("wod5e-mage", ROLL_CARD_FLAG);
assert.deepEqual([card.total, card.dice, card.countedParadox], [1, 0, 2]);
assert.equal(card.ustione.eyes, 1, "l'1 sul rosso apre il Contraccolpo");

// 5. contoDice: i numeri della finestra e del tiro diretto coincidono.
assert.deepEqual(contoDice({ pool: 9, threshold: 5, paradoxRating: 2 }), { pool: 9, threshold: 5, dice: 4, basicDice: 2, paradoxDice: 2, countedParadox: 2, eyeOnly: 0, totalDice: 4 });
assert.deepEqual(contoDice({ pool: 9, threshold: 5, paradoxRating: 2, bought: true }), { pool: 9, threshold: 5, dice: 0, basicDice: 0, paradoxDice: 2, countedParadox: 0, eyeOnly: 2, totalDice: 2 });

console.log("finta Foundry: 5 scenari ok, messaggi:", globalThis.__sim.messages.length);
