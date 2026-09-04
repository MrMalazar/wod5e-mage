import assert from "node:assert/strict";
import { customSkillTraits, prepareCustomSkills } from "../scripts/abilita-specifiche.js";
import { compileMageTraitRoll, findMageRollTrait, prepareMageRollTraits } from "../scripts/mage-roll-selection.js";

const actor = {
  system: {
    sortedSkills: { mental: [{ id: "occult", displayName: "Occulto", value: 3 }] },
    sortedAttributes: { mental: [{ id: "wits", displayName: "Prontezza", value: 2 }] }
  },
  getFlag: (_m, key) => (key === "customSkills"
    ? { b1: { name: "Pilotare droni", value: "2" }, a1: { name: "Alchimia", value: 9 } }
    : undefined)
};

// Le Abilità Specifiche: in ordine di nome, pallini fra 0 e 5.
const rows = prepareCustomSkills(actor);
assert.deepEqual(rows.map((row) => [row.id, row.name, row.value]), [["a1", "Alchimia", 5], ["b1", "Pilotare droni", 2]]);

// Nelle finestre di tiro si accodano alle Abilità essenziali, col loro tipo.
const traits = prepareMageRollTraits(actor);
assert.deepEqual(traits.skills.map((trait) => trait.key), ["skill:occult", "custom:a1", "custom:b1"]);
assert.deepEqual(customSkillTraits(actor)[1], { key: "custom:b1", id: "b1", type: "custom", label: "Pilotare droni", value: 2 });
assert.equal(findMageRollTrait(traits, "custom:b1").label, "Pilotare droni");
assert.equal(findMageRollTrait(traits, "skill:b1"), null);

// Nel tiro del sistema l'Abilità Specifica entra come dadi piatti, non come percorso.
const dataset = compileMageTraitRoll({ dataset: {}, traits, primarySkillId: "b1", secondaryKey: "attribute:wits" });
assert.equal(dataset.valuePaths, "attributes.wits.value");
assert.equal(dataset.flatMod, 2);
assert.equal(dataset.label, "Pilotare droni + Prontezza");
const plain = compileMageTraitRoll({ dataset: {}, traits, primarySkillId: "occult", secondaryKey: "attribute:wits" });
assert.equal(plain.valuePaths, "skills.occult.value attributes.wits.value");
assert.equal(plain.flatMod, 0);

console.log("Abilità Specifiche tests passed.");
