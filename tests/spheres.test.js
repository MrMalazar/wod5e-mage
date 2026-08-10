import assert from "node:assert/strict";
import {
  prepareSpheres,
  sortSpheresAlphabetically
} from "../scripts/spheres.js";

function sphereActor({ values = {}, selection } = {}) {
  return {
    getFlag(_moduleId, key) {
      if (key === "spheres") return values;
      if (key === "selectedSpheres") return selection;
      return undefined;
    }
  };
}

// Existing rated Spheres are selected automatically on first upgrade.
let prepared = prepareSpheres(sphereActor({
  values: { correspondence: 2, forces: 5 }
}));
assert.equal(prepared.all.length, 9);
assert.deepEqual(prepared.selected.map((sphere) => sphere.id), ["correspondence", "forces"]);
assert.equal(
  prepared.selected[0].influenceLabel,
  "WOD5E_MAGE.Spheres.Influence.Touch"
);
assert.equal(
  prepared.selected[1].influenceLabel,
  "WOD5E_MAGE.Spheres.Influence.Revolutionize"
);

// Once stored, the checkbox selection is independent from the dot rating.
prepared = prepareSpheres(sphereActor({
  values: { correspondence: 3, entropy: 1 },
  selection: { correspondence: false, entropy: true }
}));
assert.deepEqual(prepared.selected.map((sphere) => sphere.id), ["entropy"]);
assert.equal(prepared.selected[0].icon.endsWith("/entropy.png"), true);

const italianLabels = {
  correspondence: "Corrispondenza",
  entropy: "Entropia",
  forces: "Forze",
  life: "Vita",
  matter: "Materia",
  mind: "Mente",
  prime: "Prime",
  spirit: "Spirito",
  time: "Tempo"
};
const localizedOrder = sortSpheresAlphabetically(
  prepared.all,
  (key) => italianLabels[key.split(".").at(-1)],
  "it"
);
assert.deepEqual(localizedOrder.map((sphere) => sphere.id), [
  "correspondence",
  "entropy",
  "forces",
  "matter",
  "mind",
  "prime",
  "spirit",
  "time",
  "life"
]);

const localizedPrepared = prepareSpheres(sphereActor(), {
  localize: (key) => italianLabels[key.split(".").at(-1)],
  locale: "it"
});
assert.deepEqual(localizedPrepared.all.map((sphere) => sphere.id), [
  "correspondence",
  "entropy",
  "forces",
  "matter",
  "mind",
  "prime",
  "spirit",
  "time",
  "life"
]);

console.log("Sphere selection and Influence tests passed.");
