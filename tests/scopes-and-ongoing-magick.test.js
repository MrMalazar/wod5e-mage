import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getScopeSelection, prepareScopes } from "../scripts/scopes.js";
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

let scopes = getScopeSelection(mageActor());
assert.equal(Object.keys(scopes).length, 6);
assert.equal(Object.values(scopes).every((value) => value === 0), true);

scopes = prepareScopes(mageActor({
  scopes: {
    potency: true,
    duration: "3",
    targets: -2,
    area: 4.8,
    conditions: "invalid"
  }
}));
assert.deepEqual(
  Object.fromEntries(scopes.map((scope) => [scope.id, scope.value])),
  {
    potency: 1,
    duration: 3,
    targets: 0,
    area: 4,
    conditions: 0,
    range: 0
  }
);

const scopesTemplate = readFileSync(
  new URL("../templates/actor/parts/scopes.hbs", import.meta.url),
  "utf8"
);
assert.match(scopesTemplate, /<polygon points="150,30 245,80 245,160 150,210 55,160 55,80"><\/polygon>/);
assert.equal((scopesTemplate.match(/type="number"/g) ?? []).length, 1);
assert.match(scopesTemplate, /name="flags\.wod5e-mage\.scopes\.\{\{scope\.id\}\}"/);
assert.doesNotMatch(scopesTemplate, /role="checkbox"|resource-value-step/);

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
