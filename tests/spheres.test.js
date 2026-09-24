import assert from "node:assert/strict";
import {
  nextSphereValue,
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
  prime: "Primordio",
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

// Le Sfere di famiglia: segnate a mano, si leggono con le Sfere.
{
  const { getFamilySpheres } = await import("../scripts/spheres.js");
  const actor = {
    getFlag: (_m, key) => (key === "familySpheres" ? { forces: true, time: "x" } : key === "spheres" ? { forces: 2 } : undefined)
  };
  assert.equal(getFamilySpheres(actor).forces, true);
  assert.equal(getFamilySpheres(actor).time, true);
  assert.equal(getFamilySpheres(actor).mind, false);
  const prepared = prepareSpheres(actor);
  assert.equal(prepared.all.find((sphere) => sphere.id === "forces").family, true);
  assert.equal(prepared.all.find((sphere) => sphere.id === "mind").family, false);
}

// Il clic sui pallini della Sfera (Blue, 25/9): un vuoto accende fino a lì, un acceso più in basso riporta lì,
// l'ultimo acceso si spegne.
assert.equal(nextSphereValue(0, 2), 3, "da 0, il terzo fa 3");
assert.equal(nextSphereValue(4, 1), 2, "da 4, il secondo fa 2");
assert.equal(nextSphereValue(4, 3), 3, "da 4, il quarto (l'ultimo acceso) fa 3");
assert.equal(nextSphereValue(1, 0), 0, "da 1, il primo fa 0");
assert.equal(nextSphereValue(2, 4), 5, "da 2, il quinto fa 5");
assert.equal(nextSphereValue("x", 9), 5, "fuori scala: al massimo il quinto pallino, e il valore rotto vale 0");
console.log("pallini della Sfera: ok");
