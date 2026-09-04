import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { applyReset, onResetSection, prepareResets, RESET_IDS, RESETS } from "../scripts/reset.js";

// Sette tasti, nell'ordine chiesto.
assert.deepEqual(RESET_IDS, ["attributes", "skills", "advantages", "spheres", "credo", "lineage", "compass"]);
assert.deepEqual(prepareResets((key) => key.split(".").pop()).map((reset) => reset.label), ["Attributes", "Skills", "Advantages", "Spheres", "Credo", "Lineage", "Compass", "All"]);

function actorStub() {
  return {
    isOwner: true,
    name: "Test",
    system: { attributes: { strength: { value: 3 }, wits: { value: 2 } }, skills: { academics: { value: 3, bonuses: [{ source: "Storia" }] } } },
    items: [{ id: "f1", type: "feature" }, { id: "c1", type: "condition" }, { id: "f2", type: "feature" }],
    updates: [],
    deleted: [],
    async update(data) { this.updates.push(data); },
    async deleteEmbeddedDocuments(type, ids) { this.deleted.push([type, ids]); }
  };
}

// Attributi a 1; Abilità a zero senza Specializzazioni né Abilità Specifiche.
let actor = actorStub();
await applyReset(actor, "attributes");
assert.deepEqual(actor.updates, [{ "system.attributes.strength.value": 1, "system.attributes.wits.value": 1 }]);
actor = actorStub();
await applyReset(actor, "skills");
assert.deepEqual(actor.updates, [{ "system.skills.academics.value": 0, "system.skills.academics.bonuses": [], "flags.wod5e-mage.-=customSkills": null }]);
// Vantaggi: via gli oggetti feature, non le Condizioni.
actor = actorStub();
await applyReset(actor, "advantages");
assert.deepEqual(actor.deleted, [["Item", ["f1", "f2"]]]);
assert.deepEqual(actor.updates, []);
// Sfere a zero, con selezione, casette e Specialità azzerate.
actor = actorStub();
await applyReset(actor, "spheres");
const spheres = actor.updates[0];
assert.equal(spheres["flags.wod5e-mage.spheres.forces"], 0);
assert.equal(spheres["flags.wod5e-mage.-=selectedSpheres"], null);
assert.equal(spheres["flags.wod5e-mage.-=familySpheres"], null);
assert.equal(spheres["flags.wod5e-mage.-=sphereSpecialties"], null);
// Credo, Appartenenza e Bussola.
actor = actorStub();
await applyReset(actor, "credo");
assert.deepEqual(actor.updates, [{ "flags.wod5e-mage.-=focus": null }]);
actor = actorStub();
await applyReset(actor, "lineage");
assert.deepEqual(actor.updates, [{ "flags.wod5e-mage.-=lineage": null }]);
actor = actorStub();
await applyReset(actor, "compass");
assert.deepEqual(Object.keys(actor.updates[0]).sort(), ["flags.wod5e-mage.-=ambitionTrigger", "flags.wod5e-mage.-=ancore", "flags.wod5e-mage.-=convinzioni", "flags.wod5e-mage.-=desireTrigger", "system.headers.ambition", "system.headers.desire"].sort());
assert.equal(await applyReset(actor, "boh"), false);
// Reset scheda: tutte le parti, poi Condizioni, Salute, Note e giocatore.
actor = actorStub();
await applyReset(actor, "all");
assert.equal(actor.updates.length, 7);
assert.deepEqual(actor.deleted, [["Item", ["f1", "f2"]], ["Item", ["c1"]]]);
assert.deepEqual(actor.updates.at(-1)["flags.wod5e-mage.salute"], { pa: 0, ps: 0, ma: 0, ms: 0, extra: 0 });
assert.equal(actor.updates.at(-1)["flags.wod5e-mage.-=note"], null);

// Il clic: chiede conferma, e senza conferma non tocca niente.
let asked = 0;
let answer = false;
globalThis.game = { i18n: { localize: (key) => key, format: (key) => key } };
globalThis.ui = { notifications: { warn() {} } };
globalThis.foundry = { applications: { api: { DialogV2: { async confirm() { asked += 1; return answer; } } } } };
actor = actorStub();
await onResetSection.call({ actor }, { preventDefault() {} }, { dataset: { reset: "attributes" } });
assert.equal(asked, 1);
assert.deepEqual(actor.updates, []);
answer = true;
await onResetSection.call({ actor }, { preventDefault() {} }, { dataset: { reset: "attributes" } });
assert.equal(actor.updates.length, 1);
await onResetSection.call({ actor }, { preventDefault() {} }, { dataset: { reset: "boh" } });
assert.equal(asked, 2);

// La scheda: i tasti in fondo al memo, l'azione registrata, la lingua.
const tratti = readFileSync(new URL("../templates/actor/parts/tratti.hbs", import.meta.url), "utf8");
assert.match(tratti, /wod5e-mage-riepilogo-checks[\s\S]*wod5e-mage-reset-row[\s\S]*data-action="resetSection" data-reset="\{\{reset\.id\}\}"/);
const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheet, /resetSection: onResetSection/);
assert.match(sheet, /context\.resets = prepareResets/);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8"));
  for (const id of RESET_IDS) assert.equal(typeof strings.WOD5E_MAGE.Reset[RESETS[id].label.split(".").pop()], "string", `${lang} ${id}`);
  assert.match(strings.WOD5E_MAGE.Reset.Confirm, /\{label\}/);
}

console.log("Reset tests passed.");
