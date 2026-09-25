import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import {
  BELONGING_KINDS,
  BELONGING_TABLES,
  belongingArchivioTable,
  onBelongingAdd,
  onBelongingDelete,
  onItemFieldChange,
  onArmaturaColpo,
  onArmaturaPunto,
  armaturaDopoColpo,
  armaturaDopoPunto,
  ARMATURA_MASSIMA,
  prepareBelongings,
  valoreCampoOggetto
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
assert.deepEqual(prepareBelongings(mageActor()), { shared: [], story: [], items: [] });
// Gli Altri oggetti (6/9): nome e nota, nella colonna dell'inventario.
assert.equal(BELONGING_TABLES.items, "altriOggetti");
assert.deepEqual(prepareBelongings(mageActor({ altriOggetti: { x: { name: "Torcia", note: "a pile" } } })).items, [{ id: "x", name: "Torcia", note: "a pile" }]);
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
actor = mageActor();
await onBelongingAdd.call({ actor }, { preventDefault() {} }, { dataset: { table: BELONGING_TABLES.items } });
assert.deepEqual(actor.lastFlag, { key: "altriOggetti", value: { row1: { name: "", note: "" } } });

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
// Due colonne (6/9): sinistra Background e tavole libere, destra inventario e
// Altri oggetti; le note dell'equipaggiamento non ci sono più.
assert.match(template, /wod5e-mage-dotazione-left[\s\S]*core-features\.hbs[\s\S]*wod5e-mage-belongings[\s\S]*wod5e-mage-dotazione-right[\s\S]*wod5e-mage-inventario[\s\S]*wod5e-mage-altri-oggetti[\s\S]*flags\.wod5e-mage\.altriOggetti\.\{\{row\.id\}\}\.name[\s\S]*flags\.wod5e-mage\.altriOggetti\.\{\{row\.id\}\}\.note/);
assert.doesNotMatch(template, /system\.equipment|EquipmentNotes|prose-mirror/);
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
// In cima al Personaggio la Saggezza e poi le Convinzioni (4/9 notte); niente delle due col Credo.
const focusSource = readFileSync(new URL("../templates/actor/parts/focus.hbs", import.meta.url), "utf8");
assert.doesNotMatch(focusSource, /wisdom\.hbs|data-table="convinzioni"/);
// La Bussola rifatta (26/9): a sinistra l'Identità e le Convinzioni, a destra le Ancore; niente Stato.
assert.match(personaggioSource(), /wod5e-mage-personaggio-columns[\s\S]*wod5e-mage-personaggio-col-left[\s\S]*IdentityLabel[\s\S]*ConvictionsLabel[\s\S]*convinzioni\.\{\{row\.id\}\}\.serve[\s\S]*convinzioni\.\{\{row\.id\}\}\.cross[\s\S]*wod5e-mage-personaggio-col-right[\s\S]*AnchorsLabel/);
assert.doesNotMatch(personaggioSource(), /wod5e-mage-riq-stato|wisdomStatus/);
// Le note dell'Ancora (26/9): la freccia apre la carta, le note sono un campo come gli altri.
assert.match(personaggioSource(), /wod5e-mage-ancora wod5e-mage-riga-apribile" data-row="\{\{row\.id\}\}"[\s\S]*wod5e-mage-ancora-apri" data-action="rigaApri"[\s\S]*wod5e-mage-bussola-campo largo wod5e-mage-ancora-note[\s\S]*textarea class="wod5e-mage-bussola-note" name="flags\.wod5e-mage\.ancore\.\{\{row\.id\}\}\.description" rows="6"/);
// L'Appartenenza sta in testata (4/9 notte), non più nel Personaggio.
assert.doesNotMatch(personaggioSource(), /flags\.wod5e-mage\.lineage/);
const appartenenza = readFileSync(new URL("../templates/actor/parts/appartenenza.hbs", import.meta.url), "utf8");
// Niente Fazione; il Credo ha due posti per i simboli delle sue Sfere (4/9 notte).
assert.match(appartenenza, /<details class="wod5e-mage-appartenenza">[\s\S]*wod5e-mage-lineage-pick[\s\S]*lineageChoices\.familySphere\.icon[\s\S]*lineageChoices\.subSphere\.icon[\s\S]*wod5e-mage-lineage-pick-double[\s\S]*credoSpheres[\s\S]*flags\.wod5e-mage\.focus\.credo/);
assert.doesNotMatch(appartenenza, /lineage\.fazione/);
// Nell'Identità (20/9): il ritratto coi tasti dei ritratti e, posati sul bordo
// basso, Nuova sessione e Cambio Scena; sotto il nome come titolo, poi il
// giocatore e l'Appartenenza a tendina sulla stessa riga.
const identita = readFileSync(new URL("../templates/actor/parts/stat-identita.hbs", import.meta.url), "utf8");
assert.match(identita, /wod5e-mage-ritratto[\s\S]*data-action="ritrattoNext"[\s\S]*wod5e-mage-identita-tasti[\s\S]*data-action="saluteNewSession"[\s\S]*data-action="saluteCambioScena"[\s\S]*wod5e-mage-names[\s\S]*wod5e-mage-identita-sotto[\s\S]*flags\.wod5e-mage\.player[\s\S]*parts\/appartenenza\.hbs/);
assert.doesNotMatch(readFileSync(new URL("../templates/actor/parts/focus.hbs", import.meta.url), "utf8"), /<select name="flags\.wod5e-mage\.focus\.credo"/);
function personaggioSource() {
  return readFileSync(new URL("../templates/actor/parts/personaggio.hbs", import.meta.url), "utf8");
}
// Le Ancore a sette righe (25/9): una riga vecchia (nome e glossa) si legge coi campi nuovi vuoti,
// le tendine del ruolo e delle Convinzioni pronte.
const anchors = prepareAnchors(mageActor({
  [PERSONAGGIO_TABLES.anchors]: { a: { name: "Nonna Lucia", description: null } }
}));
assert.equal(anchors.length, 1);
assert.equal(anchors[0].id, "a");
assert.equal(anchors[0].name, "Nonna Lucia");
assert.equal(anchors[0].description, "");
for (const campo of ["role", "job", "age", "gives", "conviction", "unknown", "bites", "convictionText"]) assert.equal(anchors[0][campo], "", campo);
assert.equal(anchors[0].roles.length, 20);
assert.deepEqual(anchors[0].convictions, []);

actor = mageActor();
await onPersonaggioRowAdd.call({ actor }, { preventDefault() {} }, { dataset: { table: PERSONAGGIO_TABLES.anchors } });
assert.deepEqual(actor.lastFlag, { key: "ancore", value: { row1: { name: "", role: "", job: "", age: "", gives: "", conviction: "", unknown: "", bites: "", description: "" } } });
actor = mageActor();
await onPersonaggioRowAdd.call({ actor }, { preventDefault() {} }, { dataset: { table: PERSONAGGIO_TABLES.convictions } });
assert.deepEqual(actor.lastFlag, { key: "convinzioni", value: { row1: { group: "", text: "", serve: "", cross: "" } } });
actor = mageActor({ convinzioni: { c: { group: "", text: "" } } });
await onPersonaggioRowDelete.call({ actor }, { preventDefault() {} }, { dataset: { table: "convinzioni", row: "c" } });
assert.deepEqual(actor.lastUpdate, { "flags.wod5e-mage.convinzioni.-=c": null });

// Il template del Personaggio: la Bussola come la Magick in atto (Blue, 25/9 sera): il titolo di
// pagina, i riquadri con le carte scure, i campi trasparenti; poi i trigger e le tavole.
const personaggio = readFileSync(new URL("../templates/actor/parts/personaggio.hbs", import.meta.url), "utf8");
assert.match(personaggio, /wod5e-mage-section-title[\s\S]*Tabs\.Short\.personaggio[\s\S]*wod5e-mage-riq-pagina[\s\S]*wod5e-mage-bussola-carta[\s\S]*wod5e-mage-bussola-campo/);
assert.doesNotMatch(personaggio, /wod5e-mage-concept-group|wod5e-mage-identity-grid|wod5e-mage-mini-textarea/, "niente gabbia a tendine né caselle crema");
{
  // Il CSS: etichette a larghezza fissa nelle carte di tutte e due le pagine, i campi con la riga d'oro,
  // il nome della Magick in atto che non sparisce sotto le pastiglie, le pastiglie a capo.
  const css = readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8");
  assert.match(css, /\.wod5e-mage-bussola-campo > span \{[^}]*flex: 0 0 var\(--bussola-etichetta\)/);
  assert.match(css, /\.wod5e-mage-atto-campo > span \{[^}]*flex: 0 0 var\(--atto-etichetta, 6\.4rem\)/);
  assert.match(css, /\.wod5e-mage-bussola-campo > input\[type="text"\],[\s\S]*?\{[^}]*background: transparent;[^}]*border-bottom: 1px solid var\(--mage-oro-tenue\)/);
  assert.match(css, /\.wod5e-mage-atto-testa > input\.wod5e-mage-atto-nome \{[^}]*min-width: 7rem/);
  assert.match(css, /\.wod5e-mage-atto-testa > \.wod5e-mage-ongoing-marks \{[^}]*flex-wrap: wrap/);
  assert.doesNotMatch(css, /wod5e-mage-identity-grid|wod5e-mage-mini-textarea|wod5e-mage-anchor-grid|wod5e-mage-wisdom-status|wod5e-mage-personaggio-content/, "via il CSS delle caselle crema");
}
assert.match(personaggio, /flags\.wod5e-mage\.ambitionTrigger[\s\S]*flags\.wod5e-mage\.desireTrigger/);
assert.match(personaggio, /data-table="convinzioni"[\s\S]*data-table="ancore"/);
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
    // Due Domini aperti (Forze e Tempo) e un potere solo: ne serve uno per Dominio.
    if (key === "selectedSpheres") return { forces: true, time: true };
    if (key === "poteri") return { p1: { sphere: "forces", catalogId: "faro", name: "Faro" } };
    if (key === "ancore") return { a: { name: "", description: "" } };
    if (key === "convinzioni") return { c: { group: "lealta", text: "Mai vendere un amico" } };
    // Forze e Tempo hanno pallini, ma solo Forze ha lo Strumento.
    if (key === "focus") return { sphereInstruments: { forces: { tool: "weapons" } } };
    return undefined;
  }
};
const summary = prepareCreationSummary(summaryActor);
const byId = Object.fromEntries(summary.counts.map((count) => [count.id, count.value]));
// melee è un'abilità assorbita: i suoi pallini non contano. I Vantaggi contano Background e Pregi insieme (7/9),
// e dal 24/9 le due basi si vedono anche da sole (4 di Background, 5 di Pregi).
assert.deepEqual(byId, { attributes: 5, skills: 5, backgrounds: 3, pregi: 3, merits: 6, flaws: 1, domini: 2, poteri: 1 });
// I traguardi del Neofita: 22, 19 (V6 più uno, tetto 3), 9 di Vantaggi (5 più 4), 2 Difetti; tre Domini (25/9 sera)
// e i poteri uno per Dominio aperto; rosso sotto, giallo sopra, verde pari (7/9, 11/9).
const byTarget = Object.fromEntries(summary.counts.map((count) => [count.id, [count.target, count.state]]));
// I Domini: tre alla creazione (25/9 sera), due aperti qui.
assert.deepEqual(byTarget, { attributes: [22, "under"], skills: [19, "under"], backgrounds: [4, "under"], pregi: [5, "under"], merits: [9, "under"], flaws: [2, "under"], domini: [3, "under"], poteri: [2, "under"] });
assert.deepEqual(summary.grades.map((g) => g.id), ["neofita", "risvegliato", "discepolo", "anziano", "maestro"]);
assert.equal(summary.grades[0].selected, true);
assert.equal(summary.profiles, undefined);
const { creationTargets, compareCount, sfidaBonuses, sfidaSummary, flawsExtraPoints, statoConto } = await import("../scripts/riepilogo.js");
// I premi della Sfida si sommano (LIBRO 05_015; 23/9): un gruppo +1 Abilità, due +2 Vantaggi, tre +1 potere.
// Niente pallini di Sfera (25/9): i pallini del grado sono poteri in più, oltre l'uno per Dominio.
// I Vantaggi (24/9): 5 Pregi più 4 Background, più i due della Sfida e i punti resi dai Difetti in più.
assert.deepEqual(creationTargets("maestro", 3), { grado: "maestro", arete: 4, attributes: 24, skills: 27, skillCap: 3, pregi: 5, backgrounds: 4, merits: 18, flaws: 6, flawsMax: 9, flawsExtra: 0, poteri: 5 });
assert.deepEqual(creationTargets("risvegliato", 2), { grado: "risvegliato", arete: 2, attributes: 22, skills: 22, skillCap: 3, pregi: 5, backgrounds: 4, merits: 11, flaws: 3, flawsMax: 6, flawsExtra: 0, poteri: 1 });
assert.deepEqual(creationTargets("neofita", 1), { grado: "neofita", arete: 1, attributes: 22, skills: 20, skillCap: 3, pregi: 5, backgrounds: 4, merits: 9, flaws: 2, flawsMax: 5, flawsExtra: 0, poteri: 0 });
assert.deepEqual(creationTargets("neofita", 0), { grado: "neofita", arete: 1, attributes: 22, skills: 19, skillCap: 3, pregi: 5, backgrounds: 4, merits: 9, flaws: 2, flawsMax: 5, flawsExtra: 0, poteri: 0 });
// I Difetti oltre i due rendono un punto ciascuno, fino a cinque (24/9): con 4 Difetti i Vantaggi salgono a 11, con 7 restano a 12.
assert.deepEqual([flawsExtraPoints(0), flawsExtraPoints(2), flawsExtraPoints(4), flawsExtraPoints(5), flawsExtraPoints(7)], [0, 0, 2, 3, 3]);
assert.deepEqual([creationTargets("neofita", 0, 4).merits, creationTargets("neofita", 0, 4).flawsExtra, creationTargets("neofita", 2, 5).merits], [11, 2, 14]);
// Lo stato dei conti: i Difetti resi sono verdi fino al tetto, poi gialli; le basi dei Vantaggi non sono mai gialle.
assert.deepEqual([statoConto({ id: "flaws", value: 4, target: 2, max: 5 }), statoConto({ id: "flaws", value: 6, target: 2, max: 5 }), statoConto({ id: "flaws", value: 1, target: 2, max: 5 })], ["exact", "over", "under"]);
assert.deepEqual([statoConto({ id: "pregi", value: 7, target: 5, soft: true }), statoConto({ id: "pregi", value: 3, target: 5, soft: true }), statoConto({ id: "merits", value: 10, target: 9 })], ["", "under", "over"]);
assert.deepEqual([sfidaBonuses(0), sfidaBonuses(1), sfidaBonuses(2), sfidaBonuses(3)], [{ skills: 0, merits: 0, poteri: 0 }, { skills: 1, merits: 0, poteri: 0 }, { skills: 1, merits: 2, poteri: 0 }, { skills: 1, merits: 2, poteri: 1 }]);
assert.deepEqual(sfidaSummary(2).prizes.map((p) => [p.count, p.bonus, p.earned]), [["skills", 1, true], ["merits", 2, true], ["poteri", 1, false]]);
assert.deepEqual([sfidaSummary(2).done, sfidaSummary(2).total, sfidaSummary(2).complete, sfidaSummary(3).complete], [2, 3, false, true]);
assert.deepEqual(summary.sfida.done, 0);
assert.deepEqual(summary.counts.map((count) => count.sfida), [0, 0, 0, 0, 0, 0, 0, 0]);
assert.deepEqual([compareCount(22, 22), compareCount(20, 22), compareCount(25, 22)], ["exact", "under", "over"]);
assert.equal(prepareCreationSummary(summaryActor, 1).checks.find((check) => check.id === "arete").ok, true);
assert.equal(prepareCreationSummary(summaryActor, 2).checks.find((check) => check.id === "arete").ok, false);
// Il tetto: un'Abilità a 4 spegne la spunta, la voce assorbita non conta.
assert.equal(summary.checks.find((check) => check.id === "skillCap").ok, true);
summaryActor.system.skills.brawl.value = 4;
assert.equal(prepareCreationSummary(summaryActor, 1).checks.find((check) => check.id === "skillCap").ok, false);
summaryActor.system.skills.brawl.value = 3;
// Il memo come spunta (23/9): la casella, poi il grado e la Sfida coi premi; niente più chip.
assert.match(readFileSync(new URL("../templates/actor/parts/stat.hbs", import.meta.url), "utf8"), /name="flags\.wod5e-mage\.creazione\.memo"[\s\S]*flags\.wod5e-mage\.creazione\.grado[\s\S]*wod5e-mage-memo-sfida[\s\S]*memo\.sfida\.prizes/);
assert.doesNotMatch(readFileSync(new URL("../templates/actor/parts/stat.hbs", import.meta.url), "utf8"), /wod5e-mage-riepilogo-chip/);
assert.doesNotMatch(readFileSync(new URL("../templates/actor/parts/stat.hbs", import.meta.url), "utf8"), /creazione\.profilo/);
const checkById = Object.fromEntries(summary.checks.map((check) => [check.id, check.ok]));
assert.deepEqual(checkById, { skillCap: true, flawsCap: true, concept: true, anchors: false, convictions: true, instruments: false });
// Con lo Strumento anche su Tempo, il controllo passa.
summaryActor.getFlag = ((original) => (m, key) => key === "focus"
  ? { sphereInstruments: { forces: { tool: "weapons" }, time: { tool: "trance" } } }
  : original(m, key))(summaryActor.getFlag);
assert.equal(prepareCreationSummary(summaryActor).checks.find((check) => check.id === "instruments").ok, true);

// L'inventario in un riquadro solo; lo stato della Saggezza (26/9) sta nelle
// Risorse della prima pagina, calcolato, non nella Bussola; nome del PG e del
// giocatore in una colonna sola.
const dotazioneTemplate = readFileSync(new URL("../templates/actor/parts/dotazione.hbs", import.meta.url), "utf8");
assert.match(dotazioneTemplate, /wod5e-mage-inventario[\s\S]*Dotazione\.Inventory[\s\S]*equipment-list\.hbs/);
assert.match(readFileSync(new URL("../templates/actor/parts/stat-risorse.hbs", import.meta.url), "utf8"), /<output class="wod5e-mage-saggezza-stato stato-\{\{wisdom\.stato\}\}"[^>]*>\{\{localize wisdom\.statoLabel\}\}<\/output>/);
assert.doesNotMatch(personaggioSource(), /wisdom\.hbs/, "la Saggezza non sta più nella Bussola");
const identitaTemplate = readFileSync(new URL("../templates/actor/parts/stat-identita.hbs", import.meta.url), "utf8");
assert.match(identitaTemplate, /wod5e-mage-names[\s\S]*name-field[\s\S]*wod5e-mage-player-field/);

console.log("Dotazione extra, Personaggio e sigilli dei tratti: test passati.");

// Il libro degli Elementi (10/9) vale per le due tavole, non per gli Altri oggetti.
assert.equal(belongingArchivioTable({ dataset: { table: "sharedBelongings" } }), "sharedBelongings");
assert.equal(belongingArchivioTable({ dataset: { table: "storyBelongings" } }), "storyBelongings");
assert.equal(belongingArchivioTable({ dataset: { table: "altriOggetti" } }), null);
assert.equal(belongingArchivioTable({ dataset: { table: "altro" } }), null);
console.log("Libro degli Elementi: test passati.");

// I dettagli in riga dei Tratti (Blue, 24/9 sera): la casella accanto al
// Background, al Pregio, all'arma scrive sull'oggetto senza aprirlo; per
// l'arma anche il danno base e il tipo, per l'armatura il valore.
{
  assert.equal(valoreCampoOggetto("flags.wod5e-mage.dettagli", "  in via Torino, al terzo piano "), "in via Torino, al terzo piano");
  assert.deepEqual([valoreCampoOggetto("system.weaponvalue", "3"), valoreCampoOggetto("system.weaponvalue", "-2"), valoreCampoOggetto("system.weaponvalue", "x"), valoreCampoOggetto("system.armorvalue", "12"), valoreCampoOggetto("system.weaponvalue", "12")], [3, 0, 0, 7, 9], "l'armatura fino a 7 (Blue, 25/9), il danno fino a 9");
  assert.deepEqual([valoreCampoOggetto("system.weaponType", "ranged"), valoreCampoOggetto("system.weaponType", "laser")], ["ranged", "melee"]);
  assert.equal(valoreCampoOggetto("system.description", "x"), null, "solo i campi in riga");
  const updates = [];
  globalThis.foundry.utils.getProperty = (obj, path) => path.split(".").reduce((o, k) => o?.[k], obj);
  const item = { flags: { "wod5e-mage": { dettagli: "" } }, system: { weaponvalue: 2, weaponType: "melee" }, update: async (data) => { updates.push(data); } };
  const actor = mageActor({}, {});
  actor.items = { get: (id) => (id === "i1" ? item : undefined) };
  const sheet = { actor };
  await onItemFieldChange.call(sheet, { preventDefault() {} }, { dataset: { itemId: "i1", itemField: "flags.wod5e-mage.dettagli" }, value: "un coltello da cucina" });
  await onItemFieldChange.call(sheet, { preventDefault() {} }, { dataset: { itemId: "i1", itemField: "system.weaponvalue" }, value: "2" });
  await onItemFieldChange.call(sheet, { preventDefault() {} }, { dataset: { itemId: "i1", itemField: "system.weaponType" }, value: "ranged" });
  await onItemFieldChange.call(sheet, { preventDefault() {} }, { dataset: { itemId: "i1", itemField: "system.description" }, value: "no" });
  await onItemFieldChange.call(sheet, { preventDefault() {} }, { dataset: { itemId: "manca", itemField: "system.weaponvalue" }, value: "5" });
  assert.deepEqual(updates, [{ "flags.wod5e-mage.dettagli": "un coltello da cucina" }, { "system.weaponType": "ranged" }], "scrive solo quel che cambia, solo i campi in riga");
  const bloccato = mageActor({}, { locked: true });
  bloccato.items = actor.items;
  await onItemFieldChange.call({ actor: bloccato }, { preventDefault() {} }, { dataset: { itemId: "i1", itemField: "system.weaponvalue" }, value: "5" });
  assert.equal(updates.length, 2, "a scheda bloccata non scrive");
  const vantaggi = readFileSync(new URL("../templates/actor/parts/core-features.hbs", import.meta.url), "utf8");
  assert.match(vantaggi, /wod5e-mage-riga-testa wod5e-mage-oggetto-testa"[\s\S]*data-action="rigaApri"[\s\S]*wod5e-mage-oggetto-pallini[\s\S]*data-action="itemEdit"[\s\S]*data-action="itemDelete"[\s\S]*<input type="text" class="wod5e-mage-oggetto-dettagli" data-item-id="\{\{item\._id\}\}" data-item-field="flags\.wod5e-mage\.dettagli" value="\{\{item\.flags\.\[wod5e-mage\]\.dettagli\}\}" placeholder="\{\{localize \(concat 'WOD5E_MAGE\.Tratti\.Dettagli\.' key\)\}\}"[^>]*\{\{#if @root\.locked\}\}disabled\{\{\/if\}\}>\s*<\/div>\s*<div class="wod5e-mage-riga-spiega/, "nome, pallini, matita, cestino, la casella in coda");
  assert.doesNotMatch(vantaggi, /wod5e-mage-oggetto-dettagli"[^>]*\sname=/, "senza name: non passa dal form del personaggio");
  const inventario = readFileSync(new URL("../templates/actor/parts/equipment-list.hbs", import.meta.url), "utf8");
  assert.match(inventario, /data-action="itemDelete"[\s\S]*\{\{#if \(eq key "weapon"\)\}\}[\s\S]*<input type="number" class="wod5e-mage-oggetto-numero" data-item-id="\{\{item\._id\}\}" data-item-field="system\.weaponvalue"[\s\S]*<select class="wod5e-mage-oggetto-tipo" data-item-id="\{\{item\._id\}\}" data-item-field="system\.weaponType"[\s\S]*<option value="melee"[\s\S]*WOD5E\.EquipmentList\.Melee[\s\S]*<option value="ranged"[\s\S]*<option value="supernatural"[\s\S]*\{\{else if \(eq key "armor"\)\}\}[\s\S]*data-item-field="system\.armorvalue"[\s\S]*\{\{\/if\}\}\s*<input type="text" class="wod5e-mage-oggetto-dettagli"[^>]*data-item-field="flags\.wod5e-mage\.dettagli"[^>]*Tratti\.Dettagli\.oggetto/, "matita, cestino, danno, tipo, la casella in coda");
  const sheetSource = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
  assert.match(sheetSource, /querySelectorAll\("\[data-item-field\]\[data-item-id\]"\)[\s\S]*addEventListener\("change", \(event\) => onItemFieldChange\.call\(this, event, field\)\)/);
  for (const lang of ["it", "en"]) {
    const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8")).WOD5E_MAGE.Tratti;
    assert.deepEqual(Object.keys(strings.Dettagli), ["background", "merit", "flaw", "boon", "oggetto"]);
    assert.ok(strings.DettagliLabel && strings.DettagliHint);
  }
  // Le liste degli oggetti da bordo a bordo (1.9.1): il sistema le stringeva al contenuto.
  const css = readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8");
  assert.match(css, /\.wod5e-mage-riq-body\.item-list \{\s*align-self: stretch;\s*width: 100%;/, "i Vantaggi e l'inventario prendono tutto il riquadro");
  console.log("Dettagli in riga dei Tratti: test passati.");
}

// L'Equipaggiamento sulla riga (Blue, 25/9): la spunta dell'Aggravato
// sull'arma, e sull'armatura ▼ (il colpo assorbito toglie un punto) e ▲
// (il punto che torna, fino al pieno).
{
  assert.deepEqual(
    [true, false, "true", "false", 1, "1", "on", undefined].map((raw) => valoreCampoOggetto("flags.wod5e-mage.aggravato", raw)),
    [true, false, true, false, true, true, false, false],
    "la spunta è vera solo se è vera"
  );
  assert.equal(ARMATURA_MASSIMA, 7);
  assert.deepEqual([armaturaDopoColpo(5), armaturaDopoColpo(1), armaturaDopoColpo(0), armaturaDopoColpo("x")], [4, 0, 0, 0]);
  assert.deepEqual([armaturaDopoPunto(3, 5), armaturaDopoPunto(5, 5), armaturaDopoPunto(6, 5), armaturaDopoPunto(6, 0), armaturaDopoPunto(7, undefined), armaturaDopoPunto(-2, 4)], [4, 5, 6, 7, 7, 1]);

  globalThis.foundry.utils.getProperty = (obj, path) => path.split(".").reduce((o, k) => o?.[k], obj);
  const updates = [];
  const arma = { type: "weapon", flags: { "wod5e-mage": {} }, system: { weaponvalue: 4 }, update: async (data) => { updates.push(data); } };
  const giubbotto = { type: "armor", flags: { "wod5e-mage": { armaturaPiena: 5 } }, system: { armorvalue: 5 }, update: async (data) => { updates.push(data); Object.assign(giubbotto.system, { armorvalue: data["system.armorvalue"] ?? giubbotto.system.armorvalue }); } };
  const vecchia = { type: "armor", flags: {}, system: { armorvalue: 3 }, update: async (data) => { updates.push(data); } };
  const actor = mageActor({}, {});
  actor.items = { get: (id) => ({ a: arma, g: giubbotto, v: vecchia })[id] };
  const sheet = { actor };
  await onItemFieldChange.call(sheet, { preventDefault() {} }, { type: "checkbox", checked: true, value: "on", dataset: { itemId: "a", itemField: "flags.wod5e-mage.aggravato" } });
  assert.deepEqual(updates.pop(), { "flags.wod5e-mage.aggravato": true }, "la spunta legge checked, non value");
  await onItemFieldChange.call(sheet, { preventDefault() {} }, { value: "6", dataset: { itemId: "g", itemField: "system.armorvalue" } });
  assert.deepEqual(updates.pop(), { "system.armorvalue": 6, "flags.wod5e-mage.armaturaPiena": 6 }, "a mano oltre il pieno: il pieno sale");
  giubbotto.system.armorvalue = 5;
  giubbotto.flags["wod5e-mage"].armaturaPiena = 5;
  await onItemFieldChange.call(sheet, { preventDefault() {} }, { value: "2", dataset: { itemId: "g", itemField: "system.armorvalue" } });
  assert.deepEqual(updates.pop(), { "system.armorvalue": 2 }, "a mano sotto il pieno: il pieno resta");
  giubbotto.system.armorvalue = 5;
  await onArmaturaColpo.call(sheet, { preventDefault() {} }, { dataset: { itemId: "g" } });
  assert.deepEqual(updates.pop(), { "system.armorvalue": 4 }, "▼ toglie un punto");
  await onArmaturaPunto.call(sheet, { preventDefault() {} }, { dataset: { itemId: "g" } });
  assert.deepEqual(updates.pop(), { "system.armorvalue": 5 }, "▲ lo rimette");
  await onArmaturaPunto.call(sheet, { preventDefault() {} }, { dataset: { itemId: "g" } });
  assert.equal(updates.length, 0, "al pieno ▲ non fa niente");
  await onArmaturaColpo.call(sheet, { preventDefault() {} }, { dataset: { itemId: "v" } });
  assert.deepEqual(updates.pop(), { "system.armorvalue": 2, "flags.wod5e-mage.armaturaPiena": 3 }, "l'armatura senza pieno lo prende al primo colpo");
  await onArmaturaColpo.call(sheet, { preventDefault() {} }, { dataset: { itemId: "a" } });
  assert.equal(updates.length, 0, "▼ vale solo per le armature");
  const bloccato = mageActor({}, { locked: true });
  bloccato.items = actor.items;
  await onArmaturaColpo.call({ actor: bloccato }, { preventDefault() {} }, { dataset: { itemId: "g" } });
  assert.equal(updates.length, 0, "a scheda bloccata non scrive");

  const inventario = readFileSync(new URL("../templates/actor/parts/equipment-list.hbs", import.meta.url), "utf8");
  // La spunta dell'Aggravato non sta più nella riga dell'inventario (Blue, 27/9): solo il tag quando c'è; si cambia nella modifica guidata.
  assert.doesNotMatch(inventario, /data-item-field="flags\.wod5e-mage\.aggravato"/, "niente spunta Aggravato nella riga");
  assert.match(inventario, /\{\{#if item\.flags\.\[wod5e-mage\]\.aggravato\}\}<small class="wod5e-mage-oggetto-tag"[^>]*>\{\{localize "WOD5E_MAGE\.Items\.AggravatedShort"\}\}<\/small>\{\{\/if\}\}/, "il tag Aggravato sull'arma che lo ha");
  assert.doesNotMatch(inventario, /data-item-field="flags\.wod5e-mage\.aggravato"[^>]*\sname=/, "senza name: non passa dal form del personaggio");
  assert.match(inventario, /data-item-field="system\.armorvalue"[\s\S]*armatura "mentale"[\s\S]*data-action="armaturaColpo" data-item-id="\{\{item\._id\}\}"[\s\S]*fa-angle-down[\s\S]*data-action="armaturaPunto" data-item-id="\{\{item\._id\}\}"[\s\S]*fa-angle-up/, "▼ e ▲ dopo il punteggio");
  const sheetSource = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
  assert.match(sheetSource, /armaturaColpo: onArmaturaColpo,\s*armaturaPunto: onArmaturaPunto/);
  const guided = readFileSync(new URL("../scripts/oggetti-guidati.js", import.meta.url), "utf8");
  assert.match(guided, /export function buildGuidedItemFlags\(type, form = \{\}\)[\s\S]*aggravato:[\s\S]*armaturaPiena: value/);
  assert.match(guided, /flags: \{ \[MODULE_ID\]: flags \}/);
  const dialog = readFileSync(new URL("../templates/dialogs/item-create.hbs", import.meta.url), "utf8");
  assert.match(dialog, /\{\{#if isWeapon\}\}[\s\S]*name="aggravato"[\s\S]*\{\{#if isArmor\}\}[\s\S]*name="armatura"/);
  for (const lang of ["it", "en"]) {
    const items = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8")).WOD5E_MAGE.Items;
    for (const key of ["Aggravated", "AggravatedShort", "AggravatedHint", "ArmorKind", "ArmorHit", "ArmorBack"]) assert.equal(typeof items[key], "string", `${lang} ${key}`);
    assert.deepEqual(Object.keys(items.ArmorKinds), ["fisica", "mentale"]);
  }
  console.log("Equipaggiamento in riga: test passati.");
}
