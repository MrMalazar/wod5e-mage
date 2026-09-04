import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  AFFINITY_SPHERE_PACK_ID,
  AFFINITY_SPHERE_PACK_IDS,
  affinitySphereFromItem,
  getAffinitySpherePackId
} from "../scripts/affinity-sphere-data.js";
import {
  loadSpherePowers,
  prepareSphereSpecialties,
  SPECIALTY_MIN_RATING,
  specialtyScopes
} from "../scripts/sphere-specialties.js";

const packSource = readFileSync(
  new URL("../packs/mage-spheres.db", import.meta.url),
  "utf8"
).trim();
const items = packSource.split(/\r?\n/).map((line) => JSON.parse(line));
const englishPackSource = readFileSync(
  new URL("../packs/mage-spheres-en.db", import.meta.url),
  "utf8"
).trim();
const englishItems = englishPackSource
  .split(/\r?\n/)
  .map((line) => JSON.parse(line));
const expectedIds = [
  "correspondence",
  "entropy",
  "forces",
  "life",
  "matter",
  "mind",
  "prime",
  "spirit",
  "time"
];

assert.equal(AFFINITY_SPHERE_PACK_ID, "wod5e-mage.mage-spheres");
assert.equal(AFFINITY_SPHERE_PACK_IDS.en, "wod5e-mage.mage-spheres-en");
assert.equal(getAffinitySpherePackId("it"), AFFINITY_SPHERE_PACK_IDS.it);
assert.equal(getAffinitySpherePackId("en"), AFFINITY_SPHERE_PACK_IDS.en);
assert.equal(getAffinitySpherePackId("en-US"), AFFINITY_SPHERE_PACK_IDS.en);
assert.equal(items.length, 9);
assert.equal(englishItems.length, 9);
assert.deepEqual(
  items.map((item) => item.flags["wod5e-mage"].affinitySphere.id).sort(),
  expectedIds
);

// Ogni Sfera porta quattro poteri passivi: i tre comuni e il suo.
for (const collection of [items, englishItems]) {
  for (const item of collection) {
    const sphere = item.flags["wod5e-mage"].affinitySphere;
    assert.equal(item.type, "feature");
    assert.equal(item._id.length, 16);
    assert.equal(sphere.abilities.length, 4);
    assert.deepEqual(
      sphere.abilities.slice(0, 3).map((ability) => ability.id),
      ["perception", "resistance", "innateDefense"]
    );
    assert.ok(sphere.abilities[3].id);
    assert.ok(item.system.description.includes("<h3>"));
    // Il potere dell'Ambito dice la regola del minore, non i successi automatici.
    if (["ambito", "scope"].includes(sphere.abilities[3].kind)) {
      assert.match(sphere.abilities[3].description, /minore|lower/);
      assert.doesNotMatch(sphere.abilities[3].description, /successi automatici|automatic/);
    }
  }
}
// La Volontà non c'è più: Mente lavora sulla Salute mentale.
assert.equal(items.find((item) => item.flags["wod5e-mage"].affinitySphere.id === "mind").flags["wod5e-mage"].affinitySphere.abilities[3].label, "Salute mentale");

const normalized = affinitySphereFromItem({ ...items[0], uuid: "Compendium.x" });
assert.equal(normalized.id, "correspondence");
assert.equal(normalized.name, "Corrispondenza");
assert.equal(normalized.abilities.length, 4);

// I poteri si caricano dal compendio della lingua attiva.
const powers = await loadSpherePowers({
  lang: "en",
  getPack(packId) {
    assert.equal(packId, AFFINITY_SPHERE_PACK_IDS.en);
    return { getDocuments: async () => englishItems.map((item) => ({ ...item, uuid: `Compendium.${item._id}` })) };
  }
});
assert.equal(Object.keys(powers).length, 9);
assert.equal(powers.correspondence.name, "Correspondence");

// Le Specialità: solo le Sfere sbloccate dal terzo pallino, con la scelta.
assert.equal(SPECIALTY_MIN_RATING, 3);
const itPowers = await loadSpherePowers({
  lang: "it",
  getPack: () => ({ getDocuments: async () => items })
});
const actor = {
  getFlag(_m, key) {
    if (key === "spheres") return { correspondence: 3, forces: 2, mind: 4, time: 5 };
    if (key === "selectedSpheres") return { correspondence: true, forces: true, mind: true, time: false };
    if (key === "sphereSpecialties") return { correspondence: "range", mind: "nonEsiste", forces: "potency" };
    return undefined;
  }
};
const rows = prepareSphereSpecialties(actor, { powers: itPowers });
assert.deepEqual(rows.map((row) => row.id), ["correspondence", "mind"]);
assert.equal(rows[0].choice, "range");
assert.equal(rows[0].chosen.label, "Portata");
assert.equal(rows[0].options.length, 4);
assert.equal(rows[0].options.find((option) => option.id === "range").selected, true);
// Una scelta che il compendio non conosce vale come nessuna scelta.
assert.equal(rows[1].choice, "");
assert.equal(rows[1].chosen, null);

// Per il tiro: Corrispondenza copre la Portata; Forze (due pallini) no.
assert.deepEqual(specialtyScopes(actor, itPowers), { correspondence: "range" });

console.log("Sphere specialities tests passed.");
