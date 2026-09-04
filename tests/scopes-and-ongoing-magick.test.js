import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  SCOPES,
  SCOPE_TABLE_STEPS,
  prepareScopeTable
} from "../scripts/scopes.js";
import {
  onOngoingMagickAdd,
  onOngoingMagickDelete,
  prepareOngoingMagick
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

// La tavola: sei righe per sette livelli, senza righe accese.
const table = prepareScopeTable();
assert.equal(table.steps.length, SCOPE_TABLE_STEPS);
assert.deepEqual(table.steps, [1, 2, 3, 4, 5, 6, 7]);
// Otto righe: i sette Ambiti, con la Durata sdoppiata in gioco e narrativa.
assert.equal(table.rows.length, 8);
assert.deepEqual(table.rows.map((row) => row.id), ["potency", "duration", "durationNarrative", "area", "targets", "conditions", "range", "precision"]);
assert.equal(table.rows[2].scope, "duration");
// La Potenza è l'Areté più il numero (al primo livello l'Areté e basta);
// i Bersagli portano la persona, Durata narrativa e Area un simbolo per cella.
assert.equal(table.rows[0].cells[0].arete, true);
assert.equal(table.rows[0].cells[0].hideLabel, true);
assert.equal(table.rows[0].cells[1].hideLabel, false);
assert.equal(table.rows[4].cells[0].faIcon, "fa-solid fa-user");
assert.equal(table.rows[2].cells[6].faIcon, "fa-solid fa-infinity");
assert.equal(table.rows[3].cells[0].faIcon, "fa-solid fa-door-open");
assert.equal(table.rows[0].cells[0].label, "WOD5E_MAGE.Scopes.Table.potency.1");
assert.equal(table.rows[6].cells[6].label, "WOD5E_MAGE.Scopes.Table.range.7");
// La Durata porta il simbolo del tempo, gli altri Ambiti no.
assert.match(table.rows[1].cells[0].icon, /tempo_scena\.svg$/);
assert.match(table.rows[1].cells[3].icon, /tempo_sessione\.svg$/);
assert.match(table.rows[1].cells[6].icon, /tempo_cronaca\.svg$/);
assert.equal(table.rows[0].cells[0].icon, "");
assert.equal(table.rows[2].cells[0].icon, "");
// La colonna delle Sfere non esiste più: solo Ambito e sette gradini.
assert.equal(table.rows[0].spheres, undefined);
assert.equal(table.rows.every((row) => row.gift === undefined), true);

// Le 56 celle della tavola hanno una voce in tutte e due le lingue.
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8"));
  const cells = strings.WOD5E_MAGE.Scopes.Table;
  assert.equal(cells.range["6"], lang === "it" ? "Stessa Dimensione" : "Same Dimension");
  for (const scope of table.rows.map((row) => row.id)) {
    for (let step = 1; step <= SCOPE_TABLE_STEPS; step += 1) {
      assert.equal(typeof cells[scope][String(step)], "string", `${lang} ${scope} ${step}`);
    }
  }
}

// La tavola in scheda: niente colonna delle Sfere, niente riga del Dono.
const scopeTableTemplate = readFileSync(
  new URL("../templates/actor/parts/scope-table.hbs", import.meta.url),
  "utf8"
);
assert.match(scopeTableTemplate, /scopeTable\.steps[\s\S]*scopeTable\.rows[\s\S]*row\.cells/);
assert.doesNotMatch(scopeTableTemplate, /gift/);
// Le colonne invisibili: ogni riga dice le sue, e la cella le rispetta.
assert.deepEqual(table.rows.map((row) => row.layout), ["symbol-number-glyph", "symbol-number", "symbol-text", "symbol-text", "symbol-number", "number", "text", "text"]);
assert.equal(table.rows[0].cells[0].number, false);
assert.equal(table.rows[0].cells[1].number, true);
assert.equal(table.rows[7].small, true);
assert.equal(table.rows[7].cells[0].text, true);
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
