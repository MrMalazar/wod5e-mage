import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  SCOPES,
  SCOPE_TABLE_STEPS,
  prepareScopeTable
} from "../scripts/scopes.js";
import {
  lockedParadox,
  maintainedEffectRow,
  onOngoingMagickAdd,
  onOngoingMagickDelete,
  prepareOngoingMagick,
  shouldRecordEffect
} from "../scripts/ongoing-magick.js";

function mageActor(flags = {}) {
  return {
    getFlag(_moduleId, key) {
      return flags[key];
    }
  };
}

// Gli Ambiti sono le sei colonne del listino, nell'ordine del manuale.
assert.deepEqual([...SCOPES], ["potency", "duration", "area", "targets", "conditions", "range", "precision"]);

const scopeTableTemplate = readFileSync(
  new URL("../templates/actor/parts/scope-table.hbs", import.meta.url),
  "utf8"
);
// La tavola: sei righe per sette livelli, senza righe accese.
const table = prepareScopeTable();
assert.equal(table.steps.length, SCOPE_TABLE_STEPS);
assert.deepEqual(table.steps, [1, 2, 3, 4, 5, 6, 7]);
// Dieci righe: i sette Ambiti, con la Potenza in tre (Peso, Epicità, Danni)
// e la Durata in gioco e narrativa.
assert.equal(table.rows.length, 10);
assert.deepEqual(table.rows.map((row) => row.id), ["potency", "potencyEpic", "potencyDamage", "duration", "durationNarrative", "area", "targets", "conditions", "range", "precision"]);
assert.equal(table.rows[0].label, "WOD5E_MAGE.Scopes.PotencyWeight");
// La tavola per gruppi (6/9): Ambiti in ordine alfabetico della lingua, chi
// ha più letture porta la riga di titolo e le letture col solo loro nome.
const itScopes = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8")).WOD5E_MAGE.Scopes;
const tableIt = prepareScopeTable((key) => key.startsWith("WOD5E_MAGE.Scopes.") ? itScopes[key.slice("WOD5E_MAGE.Scopes.".length)] ?? key : key);
assert.deepEqual(tableIt.groups.map((group) => group.name), ["Area", "Bersagli", "Condizioni", "Durata", "Portata", "Potenza", "Precisione"]);
assert.deepEqual(tableIt.groups.map((group) => group.header), [false, false, false, true, false, true, false]);
assert.deepEqual(tableIt.groups.find((group) => group.scope === "potency").rows.map((row) => row.title), ["WOD5E_MAGE.Scopes.Sub.potency", "WOD5E_MAGE.Scopes.Sub.potencyEpic", "WOD5E_MAGE.Scopes.Sub.potencyDamage"]);
assert.equal(tableIt.groups.find((group) => group.scope === "area").rows[0].title, "WOD5E_MAGE.Scopes.area");
assert.deepEqual(Object.values(itScopes.Sub), ["Peso", "Epicità", "Danni", "Gioco", "Narrativa"]);
assert.match(scopeTableTemplate, /scopeTable\.groups[\s\S]*group\.header[\s\S]*wod5e-mage-scope-group[\s\S]*group\.rows[\s\S]*row\.title/);
assert.equal(table.rows[1].label, "WOD5E_MAGE.Scopes.PotencyEpic");
assert.equal(table.rows[1].scope, "potency");
assert.equal(table.rows[2].scope, "potency");
assert.equal(table.rows[4].scope, "duration");
// La Potenza (Danni) è l'Areté più il numero (al primo livello l'Areté e
// basta), senza casella; i Bersagli portano la persona, le Condizioni
// l'elenco, Durata narrativa e Area un simbolo per cella.
assert.equal(table.rows[0].cells[0].arete, false);
assert.equal(table.rows[1].cells[0].arete, false);
assert.equal(table.rows[2].cells[0].arete, true);
assert.equal(table.rows[2].cells[0].hideLabel, true);
assert.equal(table.rows[2].cells[1].hideLabel, false);
assert.equal(table.rows[2].cells[0].glyph, undefined);
assert.equal(table.rows[6].cells[0].faIcon, "fa-solid fa-user");
assert.equal(table.rows[7].cells[0].faIcon, "fa-solid fa-list-check");
assert.equal(table.rows[4].cells[6].faIcon, "fa-solid fa-infinity");
assert.equal(table.rows[5].cells[0].faIcon, "fa-solid fa-door-open");
assert.equal(table.rows[0].cells[0].label, "WOD5E_MAGE.Scopes.Table.potency.1");
assert.equal(table.rows[1].cells[0].label, "WOD5E_MAGE.Scopes.Table.potencyEpic.1");
assert.equal(table.rows[2].cells[0].label, "WOD5E_MAGE.Scopes.Table.potencyDamage.1");
assert.equal(table.rows[8].cells[6].label, "WOD5E_MAGE.Scopes.Table.range.7");
// La Durata porta il simbolo del tempo, gli altri Ambiti no.
// La Durata (6/9): 1 = entro 3 turni, 2 = una scena, 3 = due scene.
assert.match(table.rows[3].cells[0].icon, /tempo_turno\.svg$/);
assert.match(table.rows[3].cells[1].icon, /tempo_scena\.svg$/);
const itLang = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8"));
assert.deepEqual([1, 2, 3].map((n) => itLang.WOD5E_MAGE.Scopes.Table.duration[String(n)]), ["3", "1", "2"]);
assert.match(table.rows[3].cells[3].icon, /tempo_sessione\.svg$/);
assert.match(table.rows[3].cells[6].icon, /tempo_cronaca\.svg$/);
assert.equal(table.rows[0].cells[0].icon, "");
assert.equal(table.rows[4].cells[0].icon, "");
// La colonna delle Sfere non esiste più: solo Ambito e sette gradini.
assert.equal(table.rows[0].spheres, undefined);
assert.equal(table.rows[0].cells[0].text, true);
assert.equal(table.rows.every((row) => row.gift === undefined), true);

// Le 70 celle della tavola hanno una voce in tutte e due le lingue.
// La Potenza (Peso) parla in chili e tonnellate, la Precisione segue
// un'auto sola dal vago all'atomo (6/9).
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8"));
  const cells = strings.WOD5E_MAGE.Scopes.Table;
  // La Portata parla chiaro (6/9): «Lo vedi (entro 100 m)» … «Ovunque sia».
  assert.equal(cells.range["6"], lang === "it" ? "In un altro continente" : "On another continent");
  assert.match(cells.range["1"], /100 m/);
  assert.match(cells.potency["2"], /100 kg/);
  assert.match(cells.potency["6"], /500[.,]000 t/);
  assert.equal(typeof strings.WOD5E_MAGE.Scopes.PotencyWeight, "string");
  assert.equal(typeof strings.WOD5E_MAGE.Scopes.PotencyEpic, "string");
  assert.equal(strings.WOD5E_MAGE.Scopes.PotencyEffect, undefined);
  for (const scope of table.rows.map((row) => row.id)) {
    for (let step = 1; step <= SCOPE_TABLE_STEPS; step += 1) {
      assert.equal(typeof cells[scope][String(step)], "string", `${lang} ${scope} ${step}`);
    }
  }
}

// La tavola in scheda: niente colonna delle Sfere, niente riga del Dono.
assert.match(scopeTableTemplate, /scopeTable\.steps[\s\S]*scopeTable\.groups[\s\S]*row\.cells/);
assert.doesNotMatch(scopeTableTemplate, /gift/);
// Le colonne invisibili: ogni riga dice le sue, e la cella le rispetta.
assert.deepEqual(table.rows.map((row) => row.layout), ["text", "text", "symbol-number", "symbol-number", "symbol-text", "symbol-text", "symbol-number", "symbol-number", "text", "text"]);
assert.equal(table.rows[2].cells[0].number, false);
assert.equal(table.rows[2].cells[1].number, true);
assert.equal(table.rows[9].small, true);
assert.equal(table.rows[9].cells[0].text, true);
assert.match(scopeTableTemplate, /wod5e-mage-scope-cell" data-layout="\{\{cell\.layout\}\}"/);
assert.match(scopeTableTemplate, /wod5e-mage-scope-row-small/);
assert.doesNotMatch(scopeTableTemplate, /row\.spheres|TableSpheres/);

let rows = prepareOngoingMagick(mageActor());
assert.equal(rows.length, 0);

rows = prepareOngoingMagick(mageActor({
  ongoingMagick: {
    row2: {
      nameSpheres: "Ward - Forces 2",
      status: "Active",
      triggerEffect: "At sunset"
    }
  }
}));
assert.equal(rows[0].nameSpheres, "Ward - Forces 2");
assert.equal(rows[0].status, "Active");
assert.equal(rows[0].triggerEffect, "At sunset");
assert.deepEqual([rows[0].vulgar, rows[0].duration, rows[0].threshold, rows[0].lock], [false, 0, 0, 0]);

// Le Magick in atto (6/9): il Volgare in piedi blocca 1 Paradosso permanente;
// si segna quando è mantenuto o ha una Durata.
const vulgarRow = maintainedEffectRow({ name: "Fiamma", vulgar: true, duration: 2, threshold: 4, maintained: true, status: "Mantenuto" });
assert.deepEqual([vulgarRow.lock, vulgarRow.duration, vulgarRow.threshold, vulgarRow.vulgar, vulgarRow.nameSpheres], [1, 2, 4, true, "Fiamma"]);
assert.equal(maintainedEffectRow({ name: "Sussurro", vulgar: false, duration: 1 }).lock, 0);
assert.equal(shouldRecordEffect({ maintained: false, duration: 0 }), false);
assert.equal(shouldRecordEffect({ maintained: true, duration: 0 }), true);
assert.equal(shouldRecordEffect({ maintained: false, duration: 3 }), true);
assert.equal(lockedParadox(mageActor({ ongoingMagick: { a: { lock: 1 }, b: { lock: 0 }, c: vulgarRow } })), 2);
assert.equal(lockedParadox(mageActor()), 0);

globalThis.foundry = {
  utils: {
    randomID: () => "newRow"
  }
};

let storedRows = {};
const editableActor = {
  isOwner: true,
  name: "Mage",
  system: { locked: false },
  getFlag() {
    return storedRows;
  },
  async setFlag(_moduleId, _key, value) {
    storedRows = value;
  },
  async update(data) {
    this.lastUpdate = data;
  }
};
const event = { preventDefault() {} };

await onOngoingMagickAdd.call({ actor: editableActor }, event);
assert.deepEqual(storedRows.newRow, {
  nameSpheres: "",
  status: "",
  triggerEffect: ""
});

await onOngoingMagickDelete.call(
  { actor: editableActor },
  event,
  { dataset: { row: "newRow" } }
);
assert.deepEqual(editableActor.lastUpdate, {
  "flags.wod5e-mage.ongoingMagick.-=newRow": null
});

console.log("Scopes and ongoing Magick tests passed.");
