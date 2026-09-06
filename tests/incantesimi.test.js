import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spellFromResult } from "../scripts/arete.js";
import { prepareIncantesimo, prepareIncantesimi, INCANTESIMI_FLAG } from "../scripts/incantesimi.js";

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
  "sphere-time": "3", "sphere-forces": "0", "scope-duration": "2", "scope-area": "3",
  witnesses: true, prize: true, maintained: false, effectKind: "variable"
};
const spell = spellFromResult(actor, result, { traits, rollSpheres, localize: (key) => key.split(".").pop() });
assert.equal(spell.name, "Riavvolgere Scena");
assert.deepEqual(spell.spheres, { time: 3 });
assert.deepEqual(spell.scopes, { duration: 2, area: 3 });
assert.equal(spell.magickType, "witnesses");
assert.equal(spell.credo, "dati");
assert.equal(spell.practiceForm, "ibrida");
assert.deepEqual(spell.instruments, ["gestures (Codici)"]);
assert.deepEqual(spell.traits.map((t) => [t.field, t.key]), [["attributeTrait", "attribute:dexterity"], ["primaryTrait", "skill:technology"]]);
assert.equal(spell.effectKind, "variable");
assert.equal(spell.prize, true);
// Senza nome, il nome è l'Obiettivo.
assert.equal(spellFromResult(actor, { ...result, spellName: "" }, { traits, rollSpheres }).name, "Riavvolgere il tempo nell'area");

// La pagina: etichette pronte, ordine per sort e nome.
const row = prepareIncantesimo("a", spell, (key) => key.split(".").pop());
assert.equal(row.credo, "dati");
assert.equal(row.practiceForm, "ibrida");
assert.equal(row.magickType, "VulgarWithWitnesses");
assert.equal(row.magickTypeId, "witnesses");
assert.deepEqual(row.spheres.map((s) => [s.id, s.level]), [["time", 3]]);
assert.deepEqual(row.scopes.map((s) => [s.id, s.level]), [["duration", 2], ["area", 3]]);
assert.equal(row.traits, "Destrezza + Tecnologia");
const pageActor = { getFlag: (_m, key) => key === INCANTESIMI_FLAG ? { b: { name: "Zeta", sort: 1 }, a: { name: "Alfa", sort: 0 } } : undefined };
assert.deepEqual(prepareIncantesimi(pageActor).map((r) => r.name), ["Alfa", "Zeta"]);
assert.equal(prepareIncantesimo("x", {}).name, "WOD5E_MAGE.Incantesimi.Unnamed");

// La scheda: la pagina Grimorio dopo la Magick, i cinque comandi, il dialogo in modo «salva».
const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheet, /grimorio: \{ template: `\$\{MODULE\}\/parts\/grimorio\.hbs` \}/);
assert.match(sheet, /magick: \{[\s\S]*\},\s*\/\/ Il Grimorio del personaggio[\s\S]*grimorio: \{\s*id: "grimorio"[\s\S]*focus: \{/);
const page = readFileSync(new URL("../templates/actor/parts/grimorio.hbs", import.meta.url), "utf8");
for (const action of ["incantesimoAdd", "incantesimoRoll", "incantesimoChat", "incantesimoEdit", "incantesimoDelete"]) {
  assert.match(page, new RegExp(`data-action="${action}"`), action);
}
const dialog = readFileSync(new URL("../templates/dialogs/arete-roll.hbs", import.meta.url), "utf8");
assert.match(dialog, /\{\{#if saveMode\}\}[\s\S]*name="spellName"[\s\S]*name="narrative"[\s\S]*\{\{#unless saveMode\}\}[\s\S]*name="harmony"/);
const arete = readFileSync(new URL("../scripts/arete.js", import.meta.url), "utf8");
assert.match(arete, /export async function launchArete\(actor, \{ mode = "roll", preset = null \} = \{\}\)/);
assert.match(arete, /if \(saveMode\) \{\s*return spellFromResult/);
assert.match(arete, /applyAretePreset\(dialog, preset\)/);

console.log("Grimorio del personaggio: test passati.");
