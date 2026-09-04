import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import {
  BELONGING_KINDS,
  BELONGING_TABLES,
  onBelongingAdd,
  onBelongingDelete,
  prepareBelongings
} from "../scripts/dotazione-extra.js";
import { ATTRIBUTE_KEYS, applyTraitIcons, traitIcon } from "../scripts/tratti-icone.js";
import {
  CONVICTION_GROUPS,
  PERSONAGGIO_TABLES,
  onPersonaggioRowAdd,
  onPersonaggioRowDelete,
  prepareAnchors,
  prepareConvictions
} from "../scripts/personaggio-extra.js";
import { CHIAVI_VIVE } from "../scripts/abilita-essenziali.js";

globalThis.foundry = { utils: { randomID: () => "row1" } };
globalThis.ui = { notifications: { warn() {} } };
globalThis.game = { i18n: { format: (key) => key } };

function mageActor(flags = {}, { owner = true, locked = false } = {}) {
  return {
    isOwner: owner,
    name: "Mage",
    system: { locked },
    getFlag(_moduleId, key) {
      return flags[key];
    },
    async setFlag(_moduleId, key, value) {
      this.lastFlag = { key, value };
    },
    async update(data) {
      this.lastUpdate = data;
    }
  };
}

// Ogni Attributo e ogni Abilità Essenziale ha il suo sigillo su disco.
for (const key of [...ATTRIBUTE_KEYS, ...CHIAVI_VIVE]) {
  const icon = traitIcon(key);
  assert.match(icon, /assets\/icons\/sheet\/tratti\//, key);
  const path = new URL(`../assets/icons/sheet/tratti/${key}.svg`, import.meta.url);
  assert.equal(existsSync(path), true, `manca il sigillo di ${key}`);
  const svg = readFileSync(path, "utf8");
  assert.doesNotMatch(svg, /#FFFFFF/, `sigillo di ${key} col fondo bianco`);
}
assert.equal(traitIcon("streetwise"), "");
const grouped = applyTraitIcons({ colonna1: [{ id: "athletics" }, { id: "sconosciuta" }] });
assert.match(grouped.colonna1[0].icon, /athletics\.svg$/);
assert.equal(grouped.colonna1[1].icon, "");

// Le due tavole della Dotazione: vuote senza flag, righe normalizzate.
assert.deepEqual(prepareBelongings(mageActor()), { shared: [], story: [] });
const belongings = prepareBelongings(mageActor({
  [BELONGING_TABLES.shared]: { a: { kind: "background", name: "Rifugio del Coro", value: "3" } },
  [BELONGING_TABLES.story]: { b: { kind: "flaw", name: "Debito", value: 9.7 } }
}));
assert.equal(belongings.shared.length, 1);
assert.equal(belongings.shared[0].kinds.length, BELONGING_KINDS.length);
assert.equal(belongings.shared[0].kinds.find((kind) => kind.id === "background").selected, true);
// Il livello vive a pallini: intero, mai sotto zero né sopra cinque.
assert.equal(belongings.shared[0].value, 3);
assert.deepEqual(belongings.story[0], {
  id: "b",
  kind: "flaw",
  name: "Debito",
  value: 5,
  kinds: belongings.story[0].kinds
});

// Il + aggiunge una riga vuota alla tavola giusta; tavole ignote non scrivono.
let actor = mageActor();
await onBelongingAdd.call({ actor }, { preventDefault() {} }, { dataset: { table: BELONGING_TABLES.story } });
assert.deepEqual(actor.lastFlag, {
  key: BELONGING_TABLES.story,
  value: { row1: { kind: "", name: "", value: 0 } }
});
actor = mageActor();
await onBelongingAdd.call({ actor }, { preventDefault() {} }, { dataset: { table: "altrove" } });
assert.equal(actor.lastFlag, undefined);

// Il cestino toglie solo la riga scelta, con la sintassi -= di Foundry.
actor = mageActor({ [BELONGING_TABLES.shared]: { a: { kind: "", name: "", notes: "" } } });
await onBelongingDelete.call({ actor }, { preventDefault() {} }, { dataset: { table: BELONGING_TABLES.shared, row: "a" } });
assert.deepEqual(actor.lastUpdate, { "flags.wod5e-mage.sharedBelongings.-=a": null });

// Scheda bloccata: niente scritture.
actor = mageActor({}, { locked: true });
await onBelongingAdd.call({ actor }, { preventDefault() {} }, { dataset: { table: BELONGING_TABLES.shared } });
assert.equal(actor.lastFlag, undefined);

// Il template: tendina del tipo, nome e note per riga, su entrambe le tavole.
const template = readFileSync(new URL("../templates/actor/parts/dotazione.hbs", import.meta.url), "utf8");
assert.match(template, /belongingTables[\s\S]*data-action="belongingAdd"[\s\S]*data-action="belongingDelete"/);
assert.match(template, /flags\.wod5e-mage\.\{\{table\.flag\}\}\.\{\{row\.id\}\}\.kind/);
assert.match(template, /flags\.wod5e-mage\.\{\{table\.flag\}\}\.\{\{row\.id\}\}\.name/);
// Il livello è un contatore a pallini, con lo zero a sinistra.
assert.match(template, /data-name="flags\.wod5e-mage\.\{\{table\.flag\}\}\.\{\{row\.id\}\}\.value"/);
assert.match(template, /wod5e-mage-belonging-dots[\s\S]*dotCounterEmpty[\s\S]*dotCounterChange/);
assert.doesNotMatch(template, /\.notes/);

// Personaggio: Ancore e Convinzioni a slot liberi, coi sette gruppi.
assert.deepEqual(prepareAnchors(mageActor()), []);
assert.deepEqual(prepareConvictions(mageActor()), []);
const convictions = prepareConvictions(mageActor({
  [PERSONAGGIO_TABLES.convictions]: { c: { group: "lealta", text: "Mai vendere un amico" } }
}));
assert.equal(convictions[0].groups.length, CONVICTION_GROUPS.length);
assert.equal(convictions[0].groups.find((group) => group.id === "lealta").selected, true);
// I due momenti e i Credi in tendina: una Convinzione di Tutto è Arte sta sotto il suo Credo.
assert.deepEqual([convictions[0].serve, convictions[0].cross], ["", ""]);
const credoConviction = prepareConvictions(mageActor({
  [PERSONAGGIO_TABLES.convictions]: { c: { group: "arte", text: "Il bello non si spiega.", serve: "lasci l'opera parlare", cross: "spieghi l'opera a chi non l'ha chiesto" } }
}))[0];
assert.equal(credoConviction.credos.find((group) => group.id === "arte").selected, true);
assert.equal(credoConviction.serve, "lasci l'opera parlare");
// Le Convinzioni stanno col Credo (4/9 notte), la Saggezza in cima al Personaggio.
const focusSource = readFileSync(new URL("../templates/actor/parts/focus.hbs", import.meta.url), "utf8");
assert.match(focusSource, /wod5e-mage-focus-convinzioni[\s\S]*convinzioni\.\{\{row\.id\}\}\.serve[\s\S]*convinzioni\.\{\{row\.id\}\}\.cross/);
assert.doesNotMatch(focusSource, /wisdom\.hbs/);
assert.match(personaggioSource(), /wod5e-mage-personaggio-content[\s\S]*wisdom\.hbs[\s\S]*IdentityLabel/);
assert.doesNotMatch(personaggioSource(), /data-table="convinzioni"/);
// L'Appartenenza sta in testata (4/9 notte), non più nel Personaggio.
assert.doesNotMatch(personaggioSource(), /flags\.wod5e-mage\.lineage/);
const appartenenza = readFileSync(new URL("../templates/actor/parts/appartenenza.hbs", import.meta.url), "utf8");
// Niente Fazione; il Credo ha due posti per i simboli delle sue Sfere (4/9 notte).
assert.match(appartenenza, /<details class="wod5e-mage-appartenenza">[\s\S]*wod5e-mage-lineage-pick[\s\S]*lineageChoices\.familySphere\.icon[\s\S]*lineageChoices\.subSphere\.icon[\s\S]*wod5e-mage-lineage-pick-double[\s\S]*credoSpheres[\s\S]*flags\.wod5e-mage\.focus\.credo/);
assert.doesNotMatch(appartenenza, /lineage\.fazione/);
// Nuova sessione in testata, nome del giocatore sotto il nome.
const header = readFileSync(new URL("../templates/actor/mage-header.hbs", import.meta.url), "utf8");
assert.match(header, /<header[^>]*>\s*\{\{!--[^}]*--\}\}\s*<button type="button" class="wod5e-mage-new-session" data-action="saluteNewSession"/);
assert.match(header, /flags\.wod5e-mage\.player/);
assert.match(readFileSync(new URL("../templates/actor/mage-header.hbs", import.meta.url), "utf8"), /parts\/appartenenza\.hbs/);
assert.doesNotMatch(readFileSync(new URL("../templates/actor/parts/focus.hbs", import.meta.url), "utf8"), /<select name="flags\.wod5e-mage\.focus\.credo"/);
function personaggioSource() {
  return readFileSync(new URL("../templates/actor/parts/personaggio.hbs", import.meta.url), "utf8");
}
const anchors = prepareAnchors(mageActor({
  [PERSONAGGIO_TABLES.anchors]: { a: { name: "Nonna Lucia", description: null } }
}));
assert.deepEqual(anchors, [{ id: "a", name: "Nonna Lucia", description: "" }]);

actor = mageActor();
await onPersonaggioRowAdd.call({ actor }, { preventDefault() {} }, { dataset: { table: PERSONAGGIO_TABLES.anchors } });
assert.deepEqual(actor.lastFlag, { key: "ancore", value: { row1: { name: "", description: "" } } });
actor = mageActor();
await onPersonaggioRowAdd.call({ actor }, { preventDefault() {} }, { dataset: { table: PERSONAGGIO_TABLES.convictions } });
assert.deepEqual(actor.lastFlag, { key: "convinzioni", value: { row1: { group: "", text: "", serve: "", cross: "" } } });
actor = mageActor({ convinzioni: { c: { group: "", text: "" } } });
await onPersonaggioRowDelete.call({ actor }, { preventDefault() {} }, { dataset: { table: "convinzioni", row: "c" } });
assert.deepEqual(actor.lastUpdate, { "flags.wod5e-mage.convinzioni.-=c": null });

// Il template del Personaggio: gabbia a tendine, trigger e tavole.
const personaggio = readFileSync(new URL("../templates/actor/parts/personaggio.hbs", import.meta.url), "utf8");
assert.match(personaggio, /wod5e-mage-concept-content[\s\S]*wod5e-mage-concept-group/);
assert.match(personaggio, /flags\.wod5e-mage\.ambitionTrigger[\s\S]*flags\.wod5e-mage\.desireTrigger/);
assert.match(personaggio, /data-table="ancore"/);
assert.doesNotMatch(personaggio, /chronicle-tenets|touchstones-convictions/);

// Il memo di creazione: conta i pallini e verifica i campi minimi.
const { prepareCreationSummary } = await import("../scripts/riepilogo.js");
const summaryActor = {
  system: {
    attributes: { strength: { value: 3 }, dexterity: { value: 2 } },
    skills: { athletics: { value: 2 }, brawl: { value: 3 }, melee: { value: 4 } },
    headers: { concept: "Custode del faro" }
  },
  items: [
    { type: "feature", system: { featuretype: "background", points: 2 } },
    { type: "feature", system: { featuretype: "background", points: 1 } },
    { type: "feature", system: { featuretype: "merit", points: 3 } },
    { type: "feature", system: { featuretype: "flaw", points: 1 } },
    { type: "equipment", system: { points: 9 } }
  ],
  getFlag: (_m, key) => {
    if (key === "spheres") return { forces: 3, time: 1 };
    if (key === "ancore") return { a: { name: "", description: "" } };
    if (key === "convinzioni") return { c: { group: "lealta", text: "Mai vendere un amico" } };
    // Forze e Tempo hanno pallini, ma solo Forze ha lo Strumento.
    if (key === "focus") return { sphereInstruments: { forces: { tool: "weapons" } } };
    return undefined;
  }
};
const summary = prepareCreationSummary(summaryActor);
const byId = Object.fromEntries(summary.counts.map((count) => [count.id, count.value]));
// melee è un'abilità assorbita: i suoi pallini non contano.
assert.deepEqual(byId, { attributes: 5, skills: 5, backgrounds: 3, merits: 3, flaws: 1, spheres: 4 });
const checkById = Object.fromEntries(summary.checks.map((check) => [check.id, check.ok]));
assert.deepEqual(checkById, { concept: true, anchors: false, convictions: true, instruments: false });
// Con lo Strumento anche su Tempo, il controllo passa.
summaryActor.getFlag = ((original) => (m, key) => key === "focus"
  ? { sphereInstruments: { forces: { tool: "weapons" }, time: { tool: "trance" } } }
  : original(m, key))(summaryActor.getFlag);
assert.equal(prepareCreationSummary(summaryActor).checks.find((check) => check.id === "instruments").ok, true);

console.log("Dotazione extra, Personaggio e sigilli dei tratti: test passati.");
