import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  SCOPES,
  SCOPE_TABLE_STEPS,
  prepareAffinityGift,
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
assert.deepEqual([...SCOPES], ["potency", "duration", "area", "targets", "conditions", "range"]);

// Senza Sfera affine non c'è Dono da mostrare.
assert.equal(prepareAffinityGift(null, 3), null);
assert.equal(prepareAffinityGift({ name: "Vuota", abilities: [] }, 3), null);

// Corrispondenza: il Dono lavora sull'Ambito Portata, con successi pari ad Areté.
const correspondence = {
  name: "Corrispondenza",
  img: "modules/wod5e-mage/assets/icons/sheet/correspondence.png",
  abilities: [
    { id: "perception", label: "Percezione" },
    { id: "resistance", label: "Resistenza" },
    { id: "innateDefense", label: "Difesa innata" },
    { id: "range", label: "Portata", kind: "ambito" }
  ]
};
let gift = prepareAffinityGift(correspondence, 3);
assert.deepEqual(gift, {
  kind: "scope",
  isScope: true,
  id: "range",
  label: "WOD5E_MAGE.Scopes.range",
  successes: 3,
  sphereName: "Corrispondenza",
  sphereImg: "modules/wod5e-mage/assets/icons/sheet/correspondence.png"
});
assert.equal(prepareAffinityGift(correspondence, "4.7").successes, 4);
assert.equal(prepareAffinityGift(correspondence, undefined).successes, 0);

// Vita: il Dono sta su un tracciato, non su un Ambito.
const life = {
  name: "Vita",
  img: "",
  abilities: [
    { id: "perception", label: "Percezione" },
    { id: "health", label: "Salute", kind: "tracciato" }
  ]
};
gift = prepareAffinityGift(life, 5);
assert.equal(gift.kind, "track");
assert.equal(gift.isScope, false);
assert.equal(gift.label, "Salute");
assert.equal(gift.successes, 0);

// Il listino: sei righe per sette gradini, con la riga del Dono accesa.
const table = prepareScopeTable({
  gift: prepareAffinityGift(correspondence, 2),
  localize: (key) => key.replace("WOD5E_MAGE.Spheres.", "")
});
assert.equal(table.steps.length, SCOPE_TABLE_STEPS);
assert.deepEqual(table.steps, [1, 2, 3, 4, 5, 6, 7]);
assert.equal(table.rows.length, 6);
assert.deepEqual(table.rows.map((row) => row.gift), [false, false, false, false, false, true]);
assert.equal(table.rows[0].cells[0].label, "WOD5E_MAGE.Scopes.Table.potency.1");
assert.equal(table.rows[5].cells[6].label, "WOD5E_MAGE.Scopes.Table.range.7");
assert.equal(table.rows[0].spheres, "forces, prime, spirit, life");
assert.equal(table.rows[5].spheres, "correspondence, spirit");
assert.equal(prepareScopeTable().rows.every((row) => row.gift === false), true);

// Le 42 celle del listino hanno una voce in tutte e due le lingue.
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8"));
  const cells = strings.WOD5E_MAGE.Scopes.Table;
  for (const scope of SCOPES) {
    for (let step = 1; step <= SCOPE_TABLE_STEPS; step += 1) {
      assert.equal(typeof cells[scope][String(step)], "string", `${lang} ${scope} ${step}`);
    }
  }
}

// Il template degli Ambiti non ha più l'esagono né i contatori.
const scopesTemplate = readFileSync(
  new URL("../templates/actor/parts/scopes.hbs", import.meta.url),
  "utf8"
);
assert.doesNotMatch(scopesTemplate, /<polygon|type="number"|flags\.wod5e-mage\.scopes/);
assert.match(scopesTemplate, /affinityGift\.isScope[\s\S]*WOD5E_MAGE\.Scopes\.GiftSuccesses/);
assert.match(scopesTemplate, /WOD5E_MAGE\.Scopes\.NoAffinity/);

const scopeTableTemplate = readFileSync(
  new URL("../templates/actor/parts/scope-table.hbs", import.meta.url),
  "utf8"
);
assert.match(scopeTableTemplate, /scopeTable\.steps[\s\S]*scopeTable\.rows[\s\S]*row\.cells[\s\S]*row\.spheres/);
assert.match(scopeTableTemplate, /\{\{#if row\.gift\}\} gift\{\{\/if\}\}/);

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
