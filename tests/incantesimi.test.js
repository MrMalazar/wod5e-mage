import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spellFromResult } from "../scripts/arete.js";
import { prepareIncantesimo, prepareIncantesimi, INCANTESIMI_FLAG } from "../scripts/incantesimi.js";
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

// Il Grimorio comune (6/9): la voce del compendio porta il testo leggibile e i dati per il tiro.
const shared = sharedItemData(spell, { author: "Claudio", localize: (key) => key.split(".").pop() });
assert.equal(shared.type, "feature");
assert.equal(shared.name, "Riavvolgere Scena");
assert.match(shared.img, /time\.png$/);
assert.match(shared.system.description, /Author:<\/strong> Claudio[\s\S]*Credo:<\/strong> dati[\s\S]*Narrative:<\/strong> Su, su/);
assert.equal(shared.flags["wod5e-mage"].incantesimo.author, "Claudio");
assert.deepEqual(shared.flags["wod5e-mage"].incantesimo.spheres, { time: 3 });
const groups = groupSharedSpells([{ credo: "Tutto è Dati", name: "A" }, { credo: "", name: "B" }, { credo: "Tutto è Dati", name: "C" }], (k) => "Senza");
assert.deepEqual(groups.map((g) => [g.credo, g.spells.length]), [["Tutto è Dati", 2], ["Senza", 1]]);
assert.equal(SHARED_PACK_NAME, "grimorio-comune");
assert.match(page, /data-action="grimorioComuneOpen"[\s\S]*data-action="incantesimoShare"/);
const comune = readFileSync(new URL("../templates/dialogs/grimorio-comune.hbs", import.meta.url), "utf8");
assert.match(comune, /data-spell="\{\{spell\.id\}\}"[\s\S]*data-shared-action="roll"[\s\S]*data-shared-action="copy"/);
assert.match(readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8"), /registerGrimorioComune\(\)/);
// Il Grimorio degli effetti: Sfere a tendina, ogni effetto una riga col come a richiesta.
const effetti = readFileSync(new URL("../templates/dialogs/grimorio.hbs", import.meta.url), "utf8");
assert.match(effetti, /<details class="wod5e-mage-grimorio-sphere" open>[\s\S]*<details class="wod5e-mage-grimorio-row">[\s\S]*class="wod5e-mage-grimorio-pick" data-effetto="\{\{entry\.id\}\}"[\s\S]*<p>\{\{entry\.text\}\}<\/p>/);

console.log("Grimorio del personaggio: test passati.");
