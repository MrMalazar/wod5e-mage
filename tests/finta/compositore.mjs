import assert from "node:assert/strict";
globalThis.__sim = { rolls: [], messages: [], faces: [], situational: [] };
const strings = { "WOD5E_MAGE.RamoC.DiceNote": "Dadi: {note}", "WOD5E_MAGE.RamoC.NoDice": "Nessun dado", "WOD5E_MAGE.Arete.Label": "Areté", "WOD5E_MAGE.Skills.Veil": "Velo", "WOD5E_MAGE.Spheres.forces": "Forze", "WOD5E_MAGE.Scopes.potency": "Potenza", "WOD5E_MAGE.Scopes.range": "Portata", "WOD5E_MAGE.Tiro.Kinds.testimoni": "Volgare con testimoni", "WOD5E_MAGE.Tiro.KindMagick": "Tiro di Magick", "WOD5E_MAGE.Tiro.KindSkill": "Tiro di Abilità", "WOD5E_MAGE.Tiro.KindNone": "Componi", "WOD5E_MAGE.Tiro.PowerNote": "Potere: {name}.", "WOD5E_MAGE.Arete.SkillSpecialtyFlavor": "Specializzazione +{dice}", "WOD5E_MAGE.Arete.QuintessenceFlavor": "Quintessenza {points}", "WOD5E_MAGE.Arete.QuintessenceSpent": "spesa {points}", "WOD5E_MAGE.MagickBalance.ParadoxGained": "+{amount} Paradosso", "WOD5E_MAGE.Tiro.ManualDifficultyNote": "a mano {difficulty} ({computed})" };
const fmt = (k, d = {}) => Object.entries(d).reduce((t, [a, b]) => t.replace(`{${a}}`, String(b)), strings[k] ?? k);
globalThis.game = { i18n: { lang: "it", localize: (k) => strings[k] ?? k, format: fmt }, settings: { get: () => "publicroll" } };
globalThis.CONFIG = { Dice: { terms: {}, rollModes: {} } };
globalThis.Hooks = { once() {} };
globalThis.ChatMessage = { getSpeaker: ({ actor }) => ({ alias: actor.name }), applyRollMode: (d) => d, create: async (d) => { const m = { ...d, getFlag: (s, k) => d.flags?.[s]?.[k] }; globalThis.__sim.messages.push(m); return m; } };
globalThis.foundry = { applications: { api: { DialogV2: {} }, handlebars: {} }, utils: { randomID: () => "id" + Math.random().toString(36).slice(2, 8) } };
const infos = []; globalThis.ui = { notifications: { info: (m) => infos.push(m), warn: (m) => infos.push("WARN " + m) } };

const flags = { "wod5e-mage": { arete: { value: 3 }, spheres: { forces: 3, mind: 1 }, sphereSelection: { forces: true, mind: true }, magickBalance: { quintessence: 4, paradox: 1 }, focus: { practiceForm: "magick" } } };
const items = new Map([["i1", { id: "i1", name: "Occhio di lince", type: "feature", img: "", system: { featuretype: "merit", bonuses: [{ value: 1 }] } }]]);
const actor = {
  name: "Ianira", isOwner: true, items,
  system: {
    locked: false,
    sortedAttributes: { physical: [{ id: "dexterity", displayName: "Destrezza", value: 4 }], social: [], mental: [{ id: "wits", displayName: "Prontezza", value: 2 }] },
    sortedSkills: { mental: [{ id: "occult", displayName: "Velo", value: 5 }], physical: [{ id: "athletics", displayName: "Atletica", value: 2 }], social: [] },
    skills: { occult: { value: 5, bonuses: [{ source: "rituali", value: 1 }] }, athletics: { value: 2, bonuses: [] } },
    attributes: { dexterity: { value: 4 }, wits: { value: 2 } }
  },
  getFlag: (scope, key) => flags[scope]?.[key],
  setFlag: async (scope, key, value) => { flags[scope][key] = value; },
  update: async (data) => { for (const [k, v] of Object.entries(data)) { const path = k.split("."); if (path[0] === "flags") { let node = flags; for (const p of path.slice(1, -1)) node[p] ??= {}, node = node[p]; node[path.at(-1)] = v; } } }
};
const spheresMod = await import(new URL("../../scripts/spheres.js", import.meta.url).href);
// prepareSpheres legge la selezione dalla bandiera: controlla che la finta la regga.
const sel = spheresMod.prepareSpheres(actor, { localize: (k) => strings[k] ?? k, locale: "it" });
assert.ok(sel.selected.some((s) => s.id === "forces"), "Forze selezionata nella finta");

const T = await import(new URL("../../scripts/tiro.js", import.meta.url).href);
const S = await import(new URL("../../scripts/tiro-scheda.js", import.meta.url).href);
const { ROLL_CARD_FLAG } = await import(new URL("../../scripts/roll-card.js", import.meta.url).href);

// Componi: Areté, Forze, Potenza 4, Portata 3, Destrezza, Velo con rituali, il Pregio.
let tiro = T.toggleArete(T.emptyTiro());
tiro = T.toggleSphere(tiro, "forces");
tiro = T.setScope(T.setScope(tiro, "potency", 4), "range", 3);
tiro = T.pickAttribute(tiro, "dexterity");
tiro = T.pickSpecialty(tiro, "skill:occult", "rituali");
tiro = T.toggleTrait(tiro, "i1");
const ctx = S.prepareTiroContext(actor, tiro);
assert.equal(ctx.magick, true);
assert.equal(ctx.size, 8, "otto pezzi in catena (la catena non si stampa, ma si conta)");
assert.deepEqual([ctx.pool, ctx.computed, ctx.difficulty, ctx.dice, ctx.successFrom, ctx.ready], [4 + 5 + 1 + 1, 7 - 3, 4, 7, 6, true]);
assert.deepEqual([ctx.extra.value, ctx.extra.cap], [0, 3]);
const conExtra = S.prepareTiroContext(actor, T.setExtra(tiro, 2));
assert.deepEqual([conExtra.extra.value, conExtra.extra.dice, conExtra.pool], [2, 2, 13], "i dadi extra entrano nella riserva");
assert.deepEqual([ctx.prize.on, ctx.prize.arete, ctx.quintessence.available], [true, 3, 4]);
const rows = S.prepareScopeRows(tiro, (k) => strings[k] ?? k, { arete: 3 });
assert.equal(rows.length, 7);
assert.equal(rows.find((r) => r.id === "potency").steps[3].active, true);
const poteri = S.preparePoteriRows(actor, tiro, (k) => strings[k] ?? k);
assert.equal(poteri.length, 6 + 2, "Forze 3 e Mente 1: otto poteri");
assert.equal(poteri[0].label, "Forze 1 · 1");

// Il lancio: Volgare con testimoni, riuscita dall'8, la Ruota sale di 2, la Quintessenza chiesta scende.
tiro = T.setQuintessence(tiro, 2);
tiro = T.setKind(tiro, "testimoni");
globalThis.__sim.faces = [8, 8, 3, 3, 5, 6, 7, 10, 2];
const message = await S.launchTiro(actor, tiro);
assert.ok(message, "il tiro parte");
const card = message.getFlag("wod5e-mage", ROLL_CARD_FLAG);
const roll = globalThis.__sim.rolls.at(-1);
assert.equal(roll.formula, "6dmcs>7 + 3dpcs>7", "riserva 13 (11 + 2 di Quintessenza) meno 4 = 9 dadi; la Ruota paga prima del tiro (+2): 3 rossi convertiti");
assert.deepEqual([card.pool, card.threshold, card.dice, card.successFrom, card.total], [13, 4, 9, 8, 3]);
assert.equal(card.tiro.power, "");
assert.deepEqual(card.tiro.traits, ["i1"]);
assert.equal(flags["wod5e-mage"].magickBalance.paradox, 1 + 2, "Volgare con testimoni: +2 Paradosso");
assert.equal(flags["wod5e-mage"].magickBalance.quintessence, 4 - 2, "la Quintessenza spesa scende");
assert.equal(flags["wod5e-mage"].lastThreshold, 4);
assert.match(message.flavor, /Occhio di lince \+1/);

// Il tiro di Abilità: Destrezza + Atletica, Difficoltà 2 a mano, riuscita dal 6, niente rossi.
let abilita = T.pickSkill(T.pickAttribute(T.emptyTiro(), "dexterity"), "skill:athletics");
abilita = T.setDifficulty(abilita, 2);
const ctx2 = S.prepareTiroContext(actor, abilita);
assert.deepEqual([ctx2.magick, ctx2.pool, ctx2.difficulty, ctx2.dice, ctx2.manual], [false, 6, 2, 4, true]);
globalThis.__sim.faces = [6, 1, 1, 9];
const m2 = await S.launchTiro(actor, abilita);
const roll2 = globalThis.__sim.rolls.at(-1);
assert.equal(roll2.formula, "4dmcs>5 + 0dpcs>5");
assert.deepEqual([m2.getFlag("wod5e-mage", ROLL_CARD_FLAG).total, m2.getFlag("wod5e-mage", ROLL_CARD_FLAG).skill], [2, true]);

// Senza tratti non si tira; con la Magick senza tipo nemmeno.
assert.equal(await S.launchTiro(actor, T.toggleArete(T.emptyTiro())), null);
assert.equal(await S.launchTiro(actor, T.toggleArete(T.pickAttribute(T.emptyTiro(), "dexterity"))), null);
assert.ok(infos.some((m) => m.startsWith("WARN")));
console.log("compositore: ok,", globalThis.__sim.messages.length, "messaggi");
