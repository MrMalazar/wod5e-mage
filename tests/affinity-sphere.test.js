import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  AFFINITY_SPHERE_FLAG,
  AFFINITY_SPHERE_PACK_ID,
  AFFINITY_SPHERE_PACK_IDS,
  affinitySphereFromItem,
  getAffinitySpherePackId,
  prepareAffinitySphere
} from "../scripts/affinity-sphere-data.js";

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
assert.deepEqual(
  englishItems
    .map((item) => item.flags["wod5e-mage"].affinitySphere.id)
    .sort(),
  expectedIds
);

for (const item of items) {
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
  assert.ok(item.img.startsWith("modules/wod5e-mage/assets/icons/sheet/"));
}

for (const item of englishItems) {
  const sphere = item.flags["wod5e-mage"].affinitySphere;
  assert.equal(sphere.abilities.length, 4);
  assert.ok(item.system.description.includes("<h3>"));
}
assert.equal(
  englishItems.find(
    (item) => item.flags["wod5e-mage"].affinitySphere.id === "correspondence"
  )?.name,
  "Correspondence"
);

const sourceItem = {
  ...items[0],
  uuid: "Compendium.wod5e-mage.mage-spheres.Item.MageSphereCorr01"
};
const normalized = affinitySphereFromItem(sourceItem);
assert.equal(normalized.id, "correspondence");
assert.equal(normalized.name, "Corrispondenza");
assert.equal(normalized.abilities.length, 4);

const actor = {
  getFlag(_moduleId, key) {
    assert.equal(key, AFFINITY_SPHERE_FLAG);
    return { id: "correspondence", uuid: sourceItem.uuid };
  }
};
const prepared = await prepareAffinitySphere(actor, {
  resolveUuid: async (uuid) => {
    assert.equal(uuid, sourceItem.uuid);
    return sourceItem;
  }
});
assert.equal(prepared.id, "correspondence");
assert.equal(prepared.abilities[3].label, "Portata");

const localized = await prepareAffinitySphere(actor, {
  lang: "en",
  getPack(packId) {
    assert.equal(packId, AFFINITY_SPHERE_PACK_IDS.en);
    return {
      getDocuments: async () => englishItems.map((item) => ({
        ...item,
        uuid: `Compendium.wod5e-mage.mage-spheres-en.Item.${item._id}`
      }))
    };
  },
  resolveUuid: async () => assert.fail("The localized pack should win.")
});
assert.equal(localized.name, "Correspondence");
assert.equal(localized.abilities[0].label, "Perception");

const empty = await prepareAffinitySphere(
  { getFlag: () => undefined },
  { resolveUuid: async () => assert.fail("No UUID should be resolved.") }
);
assert.equal(empty, null);

const manifest = JSON.parse(
  readFileSync(new URL("../module.json", import.meta.url), "utf8")
);
const manifestPack = manifest.packs.find((pack) => pack.name === "mage-spheres");
const englishManifestPack = manifest.packs.find(
  (pack) => pack.name === "mage-spheres-en"
);
assert.ok(manifestPack);
assert.ok(englishManifestPack);
assert.equal(manifestPack.type, "Item");
assert.equal(manifestPack.path, "packs/mage-spheres");
assert.equal(englishManifestPack.path, "packs/mage-spheres-en");
// La versione non si fissa nel test: basta che sia un semver senza "v".
assert.match(manifest.version, /^\d+\.\d+\.\d+$/);

const buildScript = readFileSync(
  new URL("../tools/build-release.ps1", import.meta.url),
  "utf8"
);
assert.match(buildScript, /"packs"/);

const sheetSource = readFileSync(
  new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url),
  "utf8"
);
assert.match(sheetSource, /affinitySphereOpen: onAffinitySphereOpen/);
assert.match(sheetSource, /affinitySphereClear: onAffinitySphereClear/);
assert.match(
  sheetSource,
  /context\.affinitySphere = await prepareAffinitySphere\(actor\)/
);

const magickTemplate = readFileSync(
  new URL("../templates/actor/parts/spheres.hbs", import.meta.url),
  "utf8"
);
assert.match(magickTemplate, /data-action="affinitySphereOpen"/);
assert.match(magickTemplate, /data-action="affinitySphereClear"/);
assert.match(magickTemplate, /affinitySphere\.abilities/);

console.log("Affinity Sphere compendium and selection tests passed.");
