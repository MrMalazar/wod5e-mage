import assert from "node:assert/strict";
import {
  onSphereSelectionChange,
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

// L'accesso al Dominio (Blue, 25/9 sera): niente livelli sulla scheda. Il tasto apre o chiude la Sfera
// fra le conosciute, e il vecchio numero resta solo come segno interno: 1 aperto, 0 chiuso.
{
  const updates = [];
  const flags = { spheres: { forces: 0, matter: 3 }, selectedSpheres: { forces: false, matter: true } };
  const actor = { isOwner: true, system: { locked: false }, getFlag: (_m, key) => flags[key], update: async (changes) => { updates.push(changes); } };
  const evento = { preventDefault() {} };
  await onSphereSelectionChange.call({ actor }, evento, { dataset: { sphere: "forces", selected: "false" } });
  assert.deepEqual(updates.at(-1), { "flags.wod5e-mage.selectedSpheres": { correspondence: false, entropy: false, forces: true, life: false, matter: true, mind: false, prime: false, spirit: false, time: false }, "flags.wod5e-mage.spheres.forces": 1 }, "aperto: fra le conosciute, e il segno a 1");
  await onSphereSelectionChange.call({ actor }, evento, { dataset: { sphere: "matter", selected: "true" } });
  assert.deepEqual(updates.at(-1)["flags.wod5e-mage.spheres.matter"], 0, "chiuso: il segno a 0");
  assert.equal(updates.at(-1)["flags.wod5e-mage.selectedSpheres"].matter, false);
  console.log("accesso al Dominio: ok");
}
