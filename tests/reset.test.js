import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { applyReset, nomeConferma, onResetSection, prepareResets, prepareResetsById, RESET_IDS, RESETS } from "../scripts/reset.js";

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

// Il reset della scheda intera (Blue, 25/9 sera): la seconda conferma è il nome del personaggio scritto.
assert.equal(nomeConferma("Guendalina", "Guendalina"), true);
assert.equal(nomeConferma("  guendalina ", "Guendalina"), true, "maiuscole e spazi non contano");
assert.equal(nomeConferma("Guenda", "Guendalina"), false);
assert.equal(nomeConferma("", ""), false, "senza nome non si conferma");
let scrittoNome = false;
let contenuto = "";
globalThis.foundry.utils = { escapeHTML: (s) => String(s) };
globalThis.foundry.applications.api.DialogV2.wait = async ({ content, buttons }) => {
  contenuto = content;
  const reset = buttons.find((b) => b.action === "reset");
  return reset.callback({}, { form: { elements: { nome: { value: scrittoNome ? "Test" : "altro" } } } });
};
actor = actorStub();
await onResetSection.call({ actor }, { preventDefault() {} }, { dataset: { reset: "all" } });
assert.equal(actor.updates.length, 0, "col nome sbagliato non si azzera");
assert.ok(contenuto.includes('name="nome"') && contenuto.includes("WOD5E_MAGE.Reset.ConfermaNome"));
scrittoNome = true;
await onResetSection.call({ actor }, { preventDefault() {} }, { dataset: { reset: "all" } });
assert.equal(actor.updates.length, 7, "col nome giusto la scheda si azzera");
assert.equal(asked, 2, "il reset della scheda non passa dalla conferma semplice");

// La scheda (11/9): la spunta «Mostra i tasti di reset» e il reset della
// scheda intera nel memo; ogni altro tasto nella sua sezione, a sinistra del
// titolo, dentro {{#if creazioneReset}}; l'azione registrata; la lingua.
assert.deepEqual(Object.keys(prepareResetsById()), [...RESET_IDS, "all"]);
const read = (file) => readFileSync(new URL(`../templates/actor/parts/${file}`, import.meta.url), "utf8");
const tratti = read("stat.hbs");
// Dal 23/9 i tasti di reset si accendono con la spunta del memo (creazioneReset = memo.on): niente più spunta a parte.
assert.match(tratti, /name="flags\.wod5e-mage\.creazione\.memo"[\s\S]*\{\{#if memo\.on\}\}[\s\S]*data-reset="all"/);
assert.doesNotMatch(tratti, /name="flags\.wod5e-mage\.creazione\.reset"/);
assert.doesNotMatch(tratti, /data-reset="\{\{reset\.id\}\}"/);
const tasto = (id) => new RegExp(`\\{\\{#if creazioneReset\\}\\}\\{\\{> "modules/wod5e-mage/templates/actor/parts/reset-tasto.hbs" resetsById\\.${id}\\}\\}`);
// Nella prima pagina (16/9) i tasti di reset stanno nel titolo del riquadro: Attributi, Abilità, Magick.
assert.match(read("stat-attributi.hbs"), new RegExp(`wod5e-mage-riq-title[\\s\\S]*${tasto("attributes").source}[\\s\\S]*AttributesList\\.Attributes`));
assert.match(read("stat-abilita.hbs"), new RegExp(`wod5e-mage-riq-title[\\s\\S]*${tasto("skills").source}[\\s\\S]*SkillsList\\.Skills`));
assert.match(read("stat-magick.hbs"), new RegExp(`wod5e-mage-riq-title[\\s\\S]*${tasto("spheres").source}[\\s\\S]*Tabs\\.Magick`));
assert.match(read("spheres.hbs"), new RegExp(`wod5e-mage-section-title[\\s\\S]*${tasto("spheres").source}[\\s\\S]*Tabs\\.Magick`));
assert.match(read("focus.hbs"), new RegExp(`wod5e-mage-section-title[\\s\\S]*${tasto("credo").source}[\\s\\S]*Tabs\\.Focus`));
assert.match(read("appartenenza.hbs"), new RegExp(`<summary[\\s\\S]*${tasto("lineage").source}[\\s\\S]*Lineage\\.Label`));
assert.match(read("personaggio.hbs"), new RegExp(`${tasto("compass").source}[\\s\\S]*Personaggio\\.IdentityLabel`));
assert.match(read("dotazione.hbs"), /\{\{#if creazioneReset\}\}[\s\S]*resetsById\.advantages[\s\S]*core-features\.hbs/);
assert.match(read("reset-tasto.hbs"), /data-action="resetSection" data-reset="\{\{id\}\}"[\s\S]*@root\.locked/);
const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheet, /resetSection: onResetSection/);
assert.match(sheet, /const creazione = this\.actor\.getFlag\(MODULE_ID, "creazione"\) \?\? \{\};/);
assert.match(sheet, /context\.creazioneReset = context\.memo\.on \|\| Boolean\(creazione\.reset\)/);
assert.match(sheet, /context\.resetsById = prepareResetsById/);
assert.match(sheet, /classList\.toggle\("wod5e-mage-creazione", Boolean\(context\.creazioneReset\)\)/);
// Senza la spunta la X che azzera un tratto sparisce.
assert.match(readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8"), /sheet:not\(\.wod5e-mage-creazione\)[^{]*\.resource-value-empty \{\s*display: none;/);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8"));
  for (const id of RESET_IDS) assert.equal(typeof strings.WOD5E_MAGE.Reset[RESETS[id].label.split(".").pop()], "string", `${lang} ${id}`);
  assert.match(strings.WOD5E_MAGE.Reset.Confirm, /\{label\}/);
  assert.match(strings.WOD5E_MAGE.Reset.ConfermaNome, /\{name\}/);
}

console.log("Reset tests passed.");
