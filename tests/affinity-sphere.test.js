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
  specialtyScopes,
  specialtySlots
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

// Le Specialità: una al terzo pallino, poi una per pallino.
assert.equal(SPECIALTY_MIN_RATING, 3);
assert.deepEqual([0, 1, 2, 3, 4, 5].map(specialtySlots), [0, 0, 0, 1, 2, 3]);

// Solo le Sfere sbloccate dal terzo pallino, con gli slot e le scelte.
const itPowers = await loadSpherePowers({
  lang: "it",
  getPack: () => ({ getDocuments: async () => items })
});
const actor = {
  getFlag(_m, key) {
    if (key === "spheres") return { correspondence: 3, forces: 2, mind: 4, time: 5 };
    if (key === "selectedSpheres") return { correspondence: true, forces: true, mind: true, time: true };
    // Corrispondenza con la forma vecchia (stringa), Mente a due slot, Tempo vuoto.
    if (key === "sphereSpecialties") return { correspondence: "range", mind: { 1: "perception", 2: "nonEsiste" }, forces: "potency" };
    return undefined;
  }
};
const rows = prepareSphereSpecialties(actor, { powers: itPowers });
assert.deepEqual(rows.map((row) => [row.id, row.slots.length]), [["correspondence", 1], ["mind", 2], ["time", 3]]);
const corr = rows[0].slots[0];
assert.equal(corr.choice, "range");
assert.equal(corr.chosen.label, "Portata");
assert.equal(corr.options.length, 4);
assert.equal(corr.options.find((option) => option.id === "range").selected, true);
// Mente: il primo slot ha Percezione, il secondo una scelta ignota (vuota);
// nel secondo slot Percezione è presa e non si ripete.
const mind = rows[1];
assert.equal(mind.slots[0].choice, "perception");
assert.equal(mind.slots[1].choice, "");
assert.equal(mind.slots[1].chosen, null);
assert.equal(mind.slots[1].options.find((option) => option.id === "perception").taken, true);
assert.equal(mind.slots[0].options.find((option) => option.id === "perception").taken, false);

// Per il tiro: Corrispondenza copre la Portata; Forze (due pallini) no;
// Mente non ha scelto l'Ambito.
assert.deepEqual(specialtyScopes(actor, itPowers), { correspondence: "range" });

console.log("Sphere specialities tests passed.");
