import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import {
  WISDOM_BASE,
  applyWisdomStateChange,
  clampWisdom,
  faiCadereInchiostro,
  getWisdom,
  normalizeStainChoice,
  paintWisdom,
  wisdomAfterCure,
  wisdomBase,
  wisdomClean,
  wisdomStateId,
  wisdomDicePool,
  wisdomExtra,
  wisdomMax,
  wisdomWithStains
} from "../scripts/wisdom.js";

// La fila della Saggezza come la Salute (Blue, 23/9): la formula del LIBRO
// (3 + il più alto fra Carisma e Fermezza), le caselle in più, i segni
// d'inchiostro, Segna, Cura, Reset.
const actor = (attributes, flag) => ({
  system: { attributes },
  getFlag: (_module, key) => (key === "wisdom" ? flag : undefined)
});

assert.equal(WISDOM_BASE, 3);
assert.equal(wisdomBase(actor({ charisma: { value: 2 }, resolve: { value: 3 } })), 6);
assert.equal(wisdomBase(actor({ charisma: { value: 4 }, resolve: { value: 1 } })), 7);
assert.equal(wisdomBase(actor({})), 3);
assert.deepEqual([wisdomMax(6, 0), wisdomMax(6, 2), wisdomMax(6, -3), wisdomMax(1, -5)], [6, 8, 3, 1]);
// Il vecchio `max` scritto a mano diventa caselle in più: la fila resta lunga com'era.
assert.deepEqual([wisdomExtra({ extra: 2 }, 6), wisdomExtra({ max: 10 }, 6), wisdomExtra({ max: 5 }, 6), wisdomExtra({}, 6), wisdomExtra({ extra: -1, max: 10 }, 6)], [2, 4, -1, 0, -1]);

assert.deepEqual(clampWisdom({ superficial: 4, aggravated: 3 }, 6), { superficial: 3, aggravated: 3 });
assert.deepEqual(clampWisdom({ superficial: 2, aggravated: 9 }, 6), { superficial: 0, aggravated: 6 });
assert.deepEqual(paintWisdom({ superficial: 2, aggravated: 1 }, 5).map((c) => c.state), ["a", "s", "s", "", ""]);
assert.equal(paintWisdom({ superficial: 1, aggravated: 0 }, 2)[1].label, "WOD5E_MAGE.Wisdom.States.empty");

const wisdom = getWisdom(actor({ charisma: { value: 2 }, resolve: { value: 3 } }, { max: 8, superficial: 2, aggravated: 1 }));
assert.deepEqual([wisdom.max, wisdom.base, wisdom.extra, wisdom.superficial, wisdom.aggravated, wisdom.segnato, wisdom.cells.length], [8, 6, 2, 2, 1, false, 8]);
assert.equal(getWisdom(actor({}, { superficial: 3, aggravated: 0 })).segnato, true, "la fila piena è Segnato");
assert.equal(getWisdom(actor({}, {})).max, 3);

// Il menù della casella: da un segno all'altro, e via.
assert.deepEqual(applyWisdomStateChange({ superficial: 1, aggravated: 1 }, 6, "s", "a"), { superficial: 0, aggravated: 2 });
assert.deepEqual(applyWisdomStateChange({ superficial: 1, aggravated: 1 }, 6, "", "s"), { superficial: 2, aggravated: 1 });
assert.deepEqual(applyWisdomStateChange({ superficial: 1, aggravated: 1 }, 6, "a", ""), { superficial: 1, aggravated: 0 });

// Segna: le sbarre riempiono, a fila piena le sbarre diventano croci.
assert.deepEqual(wisdomWithStains({ superficial: 1, aggravated: 0 }, 6, { state: "s", amount: 2 }), { counts: { superficial: 3, aggravated: 0 }, converted: 0 });
assert.deepEqual(wisdomWithStains({ superficial: 5, aggravated: 0 }, 6, { state: "s", amount: 3 }), { counts: { superficial: 4, aggravated: 2 }, converted: 2 });
assert.deepEqual(wisdomWithStains({ superficial: 2, aggravated: 3 }, 6, { state: "a", amount: 2 }), { counts: { superficial: 1, aggravated: 5 }, converted: 1 });
assert.deepEqual(wisdomWithStains({ superficial: 0, aggravated: 6 }, 6, { state: "s", amount: 2 }), { counts: { superficial: 0, aggravated: 6 }, converted: 0 });
// Cura: una sbarra alla volta, mai le croci (04_102).
assert.deepEqual(wisdomAfterCure({ superficial: 2, aggravated: 1 }, 6), { superficial: 1, aggravated: 1 });
assert.deepEqual(wisdomAfterCure({ superficial: 0, aggravated: 2 }, 6), { superficial: 0, aggravated: 2 });
assert.deepEqual(normalizeStainChoice({ state: "a", amount: "2" }), { state: "a", amount: 2 });
assert.deepEqual(normalizeStainChoice({ state: "x", amount: -1 }), { state: "", amount: 0 });
assert.deepEqual([wisdomDicePool({ max: 6, superficial: 2, aggravated: 1 }), wisdomDicePool({ max: 3, superficial: 3, aggravated: 0 })], [3, 1]);

// La goccia: dopo il render la casella segnata porta `cade`, una volta sola.
{
  const classi = new Set();
  const cell = { classList: { add: (c) => classi.add(c), remove: (c) => classi.delete(c) }, offsetWidth: 20 };
  const sheet = { _inchiostroCade: { index: 2, state: "s" }, element: { querySelectorAll: (sel) => (sel.includes('data-index="2"') ? [cell] : []) } };
  faiCadereInchiostro(sheet);
  assert.ok(classi.has("cade"));
  assert.equal(sheet._inchiostroCade, null);
  faiCadereInchiostro({ _inchiostroCade: null });
}

// I template e le azioni della scheda.
const read = (name) => readFileSync(new URL(`../${name}`, import.meta.url), "utf8");
const sheet = read("scripts/sheets/mage-actor-sheet.js");
assert.match(sheet, /wisdomCellChange: \{ handler: onWisdomCellChange, buttons: \[0, 2\] \}/);
for (const action of ["wisdomSegna: onWisdomSegna", "wisdomCura: onWisdomCura", "wisdomReset: onWisdomReset", "faiCadereInchiostro(this)"]) assert.ok(sheet.includes(action), action);
// La fila sta nelle Risorse della prima pagina (il partial wisdom.hbs della Bussola non c'è più, 24/9 sera).
assert.match(read("templates/actor/parts/stat-risorse.hbs"), /wod5e-mage-inchiostro-fila[\s\S]*wod5e-mage-inchiostro-cella" data-state="\{\{cell\.state\}\}" data-action="wisdomCellChange"/);
assert.doesNotMatch(read("templates/actor/parts/stat-risorse.hbs"), /squareCounterChange|resource-counter-step/);
assert.ok(!existsSync(new URL("../templates/actor/parts/wisdom.hbs", import.meta.url)), "wisdom.hbs tolto");
assert.match(read("templates/dialogs/saggezza-macchie.hbs"), /name="amount"[\s\S]*name="state"[\s\S]*data-role="macchiaSign" data-state="\{\{sign\.state\}\}"[\s\S]*wod5e-mage-inchiostro-glyph/);
const css = read("styles/wod5e-mage.css");
for (const rule of ['.wod5e-mage-inchiostro-cella[data-state="s"]::after', '.wod5e-mage-inchiostro-cella[data-state="a"]::after', ".wod5e-mage-inchiostro-cella.cade::before", "@keyframes wod5e-mage-goccia-cade", "@keyframes wod5e-mage-macchia-allarga"]) assert.ok(css.includes(rule), rule);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(read(`lang/${lang}.json`)).WOD5E_MAGE.Wisdom;
  for (const key of ["Hint", "Extra", "ClickHint", "Segna", "SegnaBreve", "SegnaHint", "SegnaAmount", "SegnaSign", "SegnaOk", "SegnaDone", "SegnaConverted", "Cura", "CuraHint", "CuraDone", "CuraNiente", "Reset", "ResetHint"]) assert.equal(typeof strings[key], "string", `${lang} ${key}`);
  assert.deepEqual(Object.keys(strings.States), ["empty", "s", "a"], lang);
}

console.log("Saggezza d'inchiostro: test passati.");

// Lo stato della Saggezza (Blue, 26/9): dalle caselle pulite, non si scrive a mano.
assert.deepEqual([{ max: 9, superficial: 0, aggravated: 0 }, { max: 8, superficial: 1, aggravated: 0 }, { max: 6, superficial: 1, aggravated: 0 }, { max: 6, superficial: 2, aggravated: 1 }, { max: 6, superficial: 4, aggravated: 1 }, { max: 6, superficial: 3, aggravated: 3 }].map(wisdomStateId), ["sereno", "lucido", "saldo", "incrinato", "inBilico", "segnato"]);
assert.equal(wisdomClean({ max: 5, superficial: 9, aggravated: 0 }), 0);
{
  const attore = { system: { attributes: { charisma: { value: 3 }, resolve: { value: 1 } } }, getFlag: () => ({ superficial: 2, aggravated: 0, extra: 0 }) };
  const w = getWisdom(attore);
  assert.deepEqual([w.max, w.puliti, w.stato, w.statoLabel], [6, 4, "incrinato", "WOD5E_MAGE.Wisdom.Stati.incrinato"]);
  const piena = getWisdom({ ...attore, getFlag: () => ({ superficial: 3, aggravated: 3, extra: 0 }) });
  assert.deepEqual([piena.segnato, piena.stato], [true, "segnato"]);
}
const itWisdom = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8")).WOD5E_MAGE.Wisdom;
const enWisdom = JSON.parse(readFileSync(new URL("../lang/en.json", import.meta.url), "utf8")).WOD5E_MAGE.Wisdom;
for (const id of ["segnato", "inBilico", "incrinato", "saldo", "lucido", "sereno"]) assert.ok(itWisdom.Stati[id] && enWisdom.Stati[id], `Stati.${id}`);
assert.match(readFileSync(new URL("../templates/actor/parts/stat-risorse.hbs", import.meta.url), "utf8"), /wod5e-mage-riga-nome-fermo[^\n]*Wisdom\.Label[\s\S]{0,600}<output class="wod5e-mage-saggezza-stato stato-\{\{wisdom\.stato\}\}"[\s\S]*data-action="wisdomAttributePick"/);
assert.doesNotMatch(readFileSync(new URL("../templates/actor/parts/stat-risorse.hbs", import.meta.url), "utf8"), /wod5e-mage-riga-stato/);
console.log("stato della Saggezza: ok");
