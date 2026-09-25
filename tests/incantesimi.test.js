import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { collectSimpleAnswers, mergeStepAnswers, spellFromResult, stepContext } from "../scripts/arete.js";
import { groupIncantesimiBySphere, prepareIncantesimo, prepareIncantesimi, spellFromEffetto, spellFromFormula, topSpheres, INCANTESIMI_FLAG } from "../scripts/incantesimi.js";
import { FORMULE_M6 } from "../scripts/data/formule.js";
import { formulaPick, testoDellaFormula } from "../scripts/grimorio.js";
import { groupSharedSpells, sharedItemData, SHARED_PACK_NAME } from "../scripts/grimorio-comune.js";

// Il Grimorio del personaggio (6/9): la finestra del tiro in modo «salva» torna l'incantesimo.
const traits = {
  attributes: [{ key: "attribute:dexterity", id: "dexterity", type: "attribute", label: "Destrezza", value: 3 }],
  skills: [{ key: "skill:technology", id: "technology", type: "skill", label: "Tecnologia", value: 2 }]
};
const rollSpheres = [{ id: "time", value: 3 }, { id: "forces", value: 2 }];
const actor = {
  getFlag: (_m, key) => key === "focus"
    ? { credo: "dati", practiceForm: "ibrida", sphereInstruments: { time: { tool: "gestures", name: "Codici" }, forces: { tool: "devices", name: "" } } }
    : undefined
};
const result = {
  spellName: "Riavvolgere Scena", goal: "Riavvolgere il tempo nell'area", narrative: "Su, su, destra, invio.",
  attributeTrait: "attribute:dexterity", primaryTrait: "skill:technology", secondaryTrait: "",
  "sphere-time": "3", "sphere-forces": "0", "scope-duration": "2", "scope-targets": "3",
  witnesses: true, prize: true, maintained: false, effectKind: "variable"
};
const spell = spellFromResult(actor, result, { traits, rollSpheres, localize: (key) => key.split(".").pop() });
assert.equal(spell.name, "Riavvolgere Scena");
// Le Sfere senza livelli (25/9 sera): la Sfera scelta vale 1, il numero dice solo che c'è.
assert.deepEqual(spell.spheres, { time: 1 });
assert.deepEqual(spell.scopes, { duration: 2, targets: 3 });
assert.equal(spell.magickType, "witnesses");
assert.equal(spell.credo, "dati");
assert.equal(spell.practiceForm, "ibrida");
assert.deepEqual(spell.instruments, ["gestures (Codici)"]);
assert.deepEqual(spell.traits.map((t) => [t.field, t.key]), [["attributeTrait", "attribute:dexterity"], ["primaryTrait", "skill:technology"]]);
assert.equal(spell.effectKind, "variable");
assert.equal(spell.prize, true);
// Senza nome, il nome è l'Obiettivo.
assert.equal(spellFromResult(actor, { ...result, spellName: "" }, { traits, rollSpheres }).name, "Riavvolgere il tempo nell'area");
// Un effetto percettivo (dalla matrice Percepire; 25/9 sera: senza livelli di Sfera) usa lo Strumento di Percepire (9/9), se c'è.
{
  const perceiver = {
    getFlag: (_m, key) => key === "focus"
      ? { credo: "dati", practiceForm: "", sphereInstruments: { time: { tool: "gestures", name: "Codici" }, percepire: { tool: "weapons", name: "Lente" } } }
      : undefined
  };
  const perceptive = spellFromResult(perceiver, { ...result, formula: "percepire" }, { traits, rollSpheres, localize: (key) => key.split(".").pop() });
  assert.deepEqual([perceptive.instruments, perceptive.formula], [["weapons (Lente)"], "percepire"]);
  assert.deepEqual(spellFromResult(perceiver, result, { traits, rollSpheres, localize: (key) => key.split(".").pop() }).instruments, ["gestures (Codici)"]);
  assert.deepEqual(spellFromResult(actor, { ...result, formula: "percepire" }, { traits, rollSpheres, localize: (key) => key.split(".").pop() }).instruments, ["gestures (Codici)"], "senza lo Strumento di Percepire restano quelli delle Sfere");
  assert.equal("formula" in spellFromResult(actor, result, { traits, rollSpheres }), false, "senza matrice niente campo");
}

// La pagina: etichette pronte, ordine per sort e nome.
const row = prepareIncantesimo("a", spell, (key) => key.split(".").pop());
assert.equal(row.credo, "dati");
assert.equal(row.practiceForm, "ibrida");
assert.equal(row.magickType, "VulgarWithWitnesses");
assert.equal(row.magickTypeId, "witnesses");
assert.deepEqual(row.spheres.map((s) => [s.id, s.level]), [["time", 1]]);
assert.deepEqual(row.scopes.map((s) => [s.id, s.level]), [["targets", 3], ["duration", 2]]);
// Un incantesimo di ieri con l'Area si legge nei Bersagli (23/9).
assert.deepEqual(prepareIncantesimo("v", { name: "Vecchio", scopes: { area: 4, range: 2 } }, (key) => key.split(".").pop()).scopes.map((s) => [s.id, s.level]), [["targets", 4], ["range", 2]]);
assert.equal(row.traits, "Destrezza + Tecnologia");
const pageActor = { getFlag: (_m, key) => key === INCANTESIMI_FLAG ? { b: { name: "Zeta", sort: 1 }, a: { name: "Alfa", sort: 0 } } : undefined };
assert.deepEqual(prepareIncantesimi(pageActor).map((r) => r.name), ["Alfa", "Zeta"]);
assert.equal(prepareIncantesimo("x", {}).name, "WOD5E_MAGE.Incantesimi.Unnamed");

// La scheda: la pagina Grimorio dopo la Magick, i cinque comandi, il dialogo in modo «salva».
const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheet, /grimorio: \{\s*template: `\$\{MODULE\}\/parts\/grimorio\.hbs`,\s*templates: \[`\$\{MODULE\}\/parts\/incantesimo-card\.hbs`, `\$\{MODULE\}\/parts\/formula-scheda\.hbs`, `\$\{MODULE\}\/parts\/filtro-sfere\.hbs`\]/);
assert.match(sheet, /magick: \{[\s\S]*\},\s*\/\/ Il Grimorio del personaggio[\s\S]*grimorio: \{\s*id: "grimorio"[\s\S]*focus: \{/);
const page = readFileSync(new URL("../templates/actor/parts/grimorio.hbs", import.meta.url), "utf8");
const card = readFileSync(new URL("../templates/actor/parts/incantesimo-card.hbs", import.meta.url), "utf8");
assert.match(page, /data-action="incantesimoAdd"/);
for (const action of ["incantesimoRoll", "incantesimoShare", "incantesimoChat", "incantesimoEdit", "incantesimoDelete"]) {
  assert.match(card, new RegExp(`data-action="${action}"`), action);
}
const dialog = readFileSync(new URL("../templates/dialogs/arete-roll.hbs", import.meta.url), "utf8");
assert.match(dialog, /\{\{#if saveMode\}\}[\s\S]*name="spellName"[\s\S]*name="narrative"[\s\S]*\{\{#unless saveMode\}\}[\s\S]*name="harmony"/);
const arete = readFileSync(new URL("../scripts/arete.js", import.meta.url), "utf8");
assert.match(arete, /export async function launchArete\(actor, \{ mode = "roll", preset = null, simple = false \} = \{\}\)/);
// L'Areté semplificata (8/9): il secondo sigillo con la S; tre finestre in fila,
// una alla volta, e la prossima si apre solo quando la precedente è chiusa.
assert.match(arete, /export async function onAreteSimple[\s\S]*simple: true/);
assert.match(arete, /const result = simple \? await collectSimpleAnswers\(ask\) : await ask\(0, \{\}\);/);
assert.doesNotMatch(arete, /wireSteps/);
// Il <form> del template lo butta via il browser (form dentro form, 0.79.0):
// niente form nel template, e tutto si cerca da `root`.
assert.doesNotMatch(dialog.replace(/\{\{!--[\s\S]*?--\}\}/g, ""), /<form/);
assert.doesNotMatch(arete, /root\.querySelector\("\.wod5e-mage-arete-simple"\)/);
assert.match(arete, /root\.querySelector\("\[data-arete\]"\)\?\.dataset\.arete/);
assert.match(dialog, /<div class="wod5e-mage-arete-layout\{\{#if simple\}\} wod5e-mage-arete-simple\{\{\/if\}\}" data-arete="\{\{arete\.value\}\}">/);
// La testata è vuota (16/9): i tasti del tiro non ci sono più, la scheda compone.
assert.doesNotMatch(readFileSync(new URL("../templates/actor/mage-header.hbs", import.meta.url), "utf8"), /data-action="areteSimple"|data-action="areteRoll"/);
// Il template mostra un passo e porta gli altri come campi nascosti.
assert.match(dialog, /\{\{#if show\.goal\}\}[\s\S]*name="goal"[\s\S]*\{\{else\}\}\s*<input type="hidden" name="goal" value="\{\{carry\.goal\}\}">/);
assert.match(dialog, /\{\{#each carry\.spheres as \|row\|\}\}\s*<span data-role="dotRow" data-kind="sphere" data-id="\{\{row\.id\}\}" data-specialty="\{\{row\.specialty\}\}" hidden><input type="hidden" name="sphere-\{\{row\.id\}\}" value="\{\{row\.level\}\}">/);
assert.match(dialog, /\{\{#each carry\.traits as \|trait\|\}\}\s*<input type="hidden" name="\{\{trait\.field\}\}" id="\{\{trait\.id\}\}" value="\{\{trait\.key\}\}" data-value="\{\{trait\.value\}\}">/);
assert.equal((dialog.match(/<li class="\{\{#if show\.\w+\}\}active\{\{\/if\}\}"><b>\d<\/b>/g) ?? []).length, 3);
const css = readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8");
assert.match(css, /\.wod5e-mage-arete-layout\.wod5e-mage-arete-simple \[hidden\] \{\s*display: none !important;/);
assert.match(css, /\.wod5e-mage-arete-simple \.wod5e-mage-arete-goal-box \{\s*order: -1;/);
assert.doesNotMatch(css, /arete-step-nav|arete-steps > button/);

// Cosa mostra ogni finestra, e cosa porta delle precedenti.
const full = stepContext(0, {}, { traits, rollSpheres });
assert.equal(full.simple, false);
assert.ok(Object.values(full.show).every(Boolean));
assert.equal(full.carry, null);
const step1 = stepContext(1, {}, { traits, rollSpheres });
assert.equal(step1.simple, true);
assert.deepEqual(step1.show, { goal: true, spheres: true, scopes: true, effect: false, traits: false, types: false, conto: false, pool: false, side: false });
assert.equal(step1.carry, null);
const answers1 = { goal: " Riavvolgere il tempo ", "sphere-time": "5", "sphere-forces": "1", "scope-duration": "9" };
const step2 = stepContext(2, answers1, { traits, rollSpheres });
assert.deepEqual(step2.show, { goal: false, spheres: false, scopes: false, effect: true, traits: true, types: true, conto: false, pool: true, side: true });
assert.equal(step2.carry.goal, "Riavvolgere il tempo");
// I livelli portati stanno dentro i pallini posseduti e il tetto degli Ambiti.
assert.deepEqual(step2.carry.spheres, [{ id: "time", level: 3, specialty: "" }, { id: "forces", level: 1, specialty: "" }]);
assert.equal(step2.carry.scopes.find((scope) => scope.id === "duration").level, 7);
assert.equal(step2.carry.scopes.find((scope) => scope.id === "targets").level, 0);
assert.equal(step2.carry.effect, false);
const answers2 = { ...answers1, effectKind: "mental", attributeTrait: "attribute:dexterity", primaryTrait: "skill:technology", secondaryTrait: "", coincidental: false, vulgar: true, witnesses: false };
const step3 = stepContext(3, answers2, { traits, rollSpheres });
assert.deepEqual(step3.show, { goal: false, spheres: false, scopes: false, effect: false, traits: false, types: false, conto: true, pool: true, side: true });
assert.equal(step3.carry.effect, true);
assert.equal(step3.carry.effectKind, "mental");
assert.deepEqual(step3.carry.traits.map((trait) => [trait.field, trait.id, trait.key, trait.value]), [
  ["attributeTrait", "wod5e-mage-arete-attribute", "attribute:dexterity", 3],
  ["primaryTrait", "wod5e-mage-arete-primary", "skill:technology", 2],
  ["secondaryTrait", "wod5e-mage-arete-secondary", "", 0]
]);
assert.equal(step3.carry.traitLabels, "Destrezza (3) + Tecnologia (2)");
assert.deepEqual([step3.carry.coincidental, step3.carry.vulgar, step3.carry.witnesses], [false, true, false]);
assert.equal(stepContext(3, { ...answers2, attributeTrait: "attribute:nope" }, { traits, rollSpheres }).carry.traits[0].key, "");

// Le risposte di un passo sostituiscono le sue vecchie, le altre restano.
assert.deepEqual(mergeStepAnswers({ goal: "a", "sphere-time": "2", attributeTrait: "x" }, 1, { goal: "b" }), { attributeTrait: "x", goal: "b" });
assert.deepEqual(mergeStepAnswers({ goal: "a", vulgar: true }, 2, { coincidental: true, goal: "a" }), { goal: "a", coincidental: true });

// Tre finestre in fila: Avanti, Indietro (con le risposte già date), Annulla.
{
  const calls = [];
  const script = [
    { goal: "g", "sphere-time": "2" },
    "back",
    { goal: "g2", "sphere-time": "3" },
    { attributeTrait: "attribute:dexterity", vulgar: true, goal: "g2", "sphere-time": "3" },
    "back",
    { attributeTrait: "attribute:dexterity", coincidental: true, goal: "g2", "sphere-time": "3" },
    { prize: true, goal: "g2", "sphere-time": "3", coincidental: "on" }
  ];
  const answers = await collectSimpleAnswers(async (step, given) => {
    calls.push([step, { ...given }]);
    return script.shift();
  });
  assert.deepEqual(calls.map(([step]) => step), [1, 2, 1, 2, 3, 2, 3]);
  assert.deepEqual(calls[2][1], { goal: "g", "sphere-time": "2" });
  assert.equal(calls[5][1].vulgar, true);
  assert.deepEqual(answers, { goal: "g2", "sphere-time": "3", attributeTrait: "attribute:dexterity", coincidental: "on", prize: true });
  assert.equal(await collectSimpleAnswers(async () => "cancel"), null);
  assert.equal(await collectSimpleAnswers(async () => null), null);
  assert.equal(await collectSimpleAnswers(async (step) => (step === 1 ? "back" : {})), null);
}
assert.match(arete, /if \(saveMode\) \{\s*return spellFromResult/);
assert.match(arete, /applyAretePreset\(dialog, preset\)/);

// Il Grimorio comune (6/9): la voce del compendio porta il testo leggibile e i dati per il tiro.
const shared = sharedItemData(spell, { author: "Claudio", localize: (key) => key.split(".").pop() });
assert.equal(shared.type, "feature");
assert.equal(shared.name, "Riavvolgere Scena");
assert.match(shared.img, /time\.png$/);
assert.match(shared.system.description, /Author:<\/strong> Claudio[\s\S]*Credo:<\/strong> dati[\s\S]*Narrative:<\/strong> Su, su/);
assert.equal(shared.flags["wod5e-mage"].incantesimo.author, "Claudio");
assert.deepEqual(shared.flags["wod5e-mage"].incantesimo.spheres, { time: 1 });
const groups = groupSharedSpells([{ credo: "Tutto è Dati", name: "A" }, { credo: "", name: "B" }, { credo: "Tutto è Dati", name: "C" }], (k) => "Senza");
assert.deepEqual(groups.map((g) => [g.credo, g.spells.length]), [["Tutto è Dati", 2], ["Senza", 1]]);
assert.equal(SHARED_PACK_NAME, "grimorio-comune");
assert.match(page, /data-action="grimorioComuneOpen"/);
const comune = readFileSync(new URL("../templates/dialogs/grimorio-comune.hbs", import.meta.url), "utf8");
assert.match(comune, /data-spell="\{\{spell\.id\}\}"[\s\S]*data-shared-action="roll"[\s\S]*data-shared-action="copy"/);
assert.match(readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8"), /registerGrimorioComune\(\)/);
// Il Grimorio degli effetti: Sfere a tendina, ogni effetto una riga col come a richiesta.
const effetti = readFileSync(new URL("../templates/dialogs/grimorio.hbs", import.meta.url), "utf8");
assert.match(effetti, /<details class="wod5e-mage-grimorio-sphere" data-sphere-group="\{\{group\.sphere\}\}" open>[\s\S]*<details class="wod5e-mage-grimorio-row">[\s\S]*class="wod5e-mage-grimorio-pick" data-effetto="\{\{entry\.id\}\}"[\s\S]*<p>\{\{entry\.text\}\}<\/p>/);

// Per Sfere (6/9): sotto la Sfera più alta; a pari merito in tutte e due; senza Sfere in coda.
const rowsBySphere = [
  prepareIncantesimo("a", { name: "Tempo3", spheres: { time: 3, forces: 1 } }, (k) => k.split(".").pop()),
  prepareIncantesimo("b", { name: "Pari", spheres: { time: 2, forces: 2 } }, (k) => k.split(".").pop()),
  prepareIncantesimo("c", { name: "Nudo", spheres: {} }, (k) => k.split(".").pop())
];
assert.deepEqual(topSpheres(rowsBySphere[0]), ["time"]);
assert.deepEqual(topSpheres(rowsBySphere[1]), ["forces", "time"]);
const bySphere = groupIncantesimiBySphere(rowsBySphere, (k) => k.split(".").pop());
assert.deepEqual(bySphere.map((g) => [g.sphere, g.spells.map((s) => s.name)]), [["forces", ["Pari"]], ["time", ["Tempo3", "Pari"]], ["", ["Nudo"]]]);
// Un effetto del manuale diventa un incantesimo da ritoccare.
const fromEffetto = spellFromEffetto(actor, { id: "forces-2-x", name: "Curvare", text: "scompari", extras: [] }, { forces: 2 }, (key) => key.split(".").pop());
assert.deepEqual([fromEffetto.name, fromEffetto.goal, fromEffetto.spheres, fromEffetto.credo, fromEffetto.instruments, fromEffetto.effetto], ["Curvare", "scompari", { forces: 2 }, "dati", ["devices"], "forces-2-x"]);
assert.match(page, /data-action="incantesimoFromEffetti"[\s\S]*incantesimiGroups[\s\S]*incantesimo-card\.hbs" spell=spell/);
assert.match(readFileSync(new URL("../scripts/grimorio.js", import.meta.url), "utf8"), /onPick = null, onFormula = null, onFormulaRoll = null/);
// Una matrice scelta nel Grimorio (24/9): il nome della Formula, «In genere»
// come Obiettivo, la Sfera d'Accesso e le Amalgame, gli Ambiti della soglia base.
const guarire = FORMULE_M6.find((formula) => formula.id === "guarire");
const fromFormula = spellFromFormula(actor, formulaPick(guarire, { access: "life", amalgams: ["spirit"], sphereLevels: { life: 2, spirit: 1 } }), (key) => key.split(".").pop());
assert.deepEqual([fromFormula.name, fromFormula.goal, fromFormula.spheres, fromFormula.scopes, fromFormula.formula, fromFormula.access, fromFormula.amalgams, fromFormula.credo, fromFormula.effetto], ["Guarire", testoDellaFormula(guarire, { access: "life", amalgams: ["spirit"] }), { life: 2, spirit: 1 }, { potency: 3, impact: 1 }, "guarire", "life", ["spirit"], "dati", ""]);
// Dal lancio nel Grimorio arriva la lettura della Sfera di accesso, non la glossa generica (Blue, 25/9).
assert.notEqual(fromFormula.goal, guarire.use);
assert.match(fromFormula.goal, /^il corpo di una persona/);
assert.equal(prepareIncantesimo("f1", fromFormula, (key) => key.split(".").pop()).formulaName, "Guarire");
assert.equal(prepareIncantesimo("f2", { name: "x" }, (key) => key).formulaName, "");
assert.match(readFileSync(new URL("../templates/actor/parts/incantesimo-card.hbs", import.meta.url), "utf8"), /spell\.formulaName/);

console.log("Grimorio del personaggio: test passati.");

// Il dado dell'effetto (26/9) carica il Tiro della prima pagina, niente finestra;
// la pagina Formule sta in due colonne, con la riga della Formula come partial.
{
  const incantesimiScript = readFileSync(new URL("../scripts/incantesimi.js", import.meta.url), "utf8");
  const roll = incantesimiScript.slice(incantesimiScript.indexOf("export async function onIncantesimoRoll"), incantesimiScript.indexOf("export async function onIncantesimoFromEffetti"));
  assert.match(roll, /caricaNelTiro\(this, id, current\)/);
  assert.doesNotMatch(roll, /launchArete/);
  assert.match(sheet, /grimorio: \{\s*template: `\$\{MODULE\}\/parts\/grimorio\.hbs`,\s*templates: \[`\$\{MODULE\}\/parts\/incantesimo-card\.hbs`, `\$\{MODULE\}\/parts\/formula-scheda\.hbs`, `\$\{MODULE\}\/parts\/filtro-sfere\.hbs`\]/);
  assert.match(sheet, /formuleTutte: onFormuleTutte,\s*formulaScrivi: onFormulaScrivi,\s*formulaLancia: onFormulaLancia/);
  assert.match(sheet, /context\.formule = prepareFormulePagina\(sfereAccessibili\(actor\), \{ tutte: Boolean\(this\._formuleTutte\), localize, lang: game\.i18n\.lang \}\)/);
  assert.match(sheet, /wireFormule\(this\)/);
  assert.match(page, /wod5e-mage-formule-layout[\s\S]*wod5e-mage-riq-formule[\s\S]*formula-scheda\.hbs" formula=formula[\s\S]*wod5e-mage-riq-effetti[\s\S]*incantesimo-card\.hbs" spell=spell/);
}

// Il filtro per Sfera della pagina Formule (26/9 sera): ogni effetto porta le sue Sfere in una parola.
assert.equal(prepareIncantesimo("k1", { name: "Due Sfere", spheres: { time: 1, forces: 2 } }).kinds, "forces time");
assert.equal(prepareIncantesimo("k2", { name: "Senza" }).kinds, "");
console.log("generi degli effetti: ok");
