import assert from "node:assert/strict";
import {
  calculateAreteTraitPool,
  getArete,
  normalizeMagickRollOptions,
  prepareAreteTraits
} from "../scripts/arete.js";

function actorWithFlag(value) {
  return {
    getFlag: () => value,
    system: {}
  };
}

assert.equal(getArete(actorWithFlag(undefined)).value, 1);
assert.equal(getArete(actorWithFlag({ value: 3 })).value, 3);
assert.equal(getArete(actorWithFlag({ value: 99 })).value, 5);
assert.equal(getArete(actorWithFlag({ value: 0 })).value, 1);

assert.equal(calculateAreteTraitPool(3, 4, 2), 9);
assert.equal(calculateAreteTraitPool(1, 1, 0), 2);

assert.deepEqual(normalizeMagickRollOptions({ vulgar: false, witnesses: true }), {
  coincidental: false,
  vulgar: false,
  witnesses: true
});
assert.deepEqual(normalizeMagickRollOptions({
  coincidental: true,
  vulgar: true,
  witnesses: false
}), {
  coincidental: true,
  vulgar: true,
  witnesses: false
});

const traits = prepareAreteTraits({
  system: {
    sortedAttributes: {
      custom: [{ id: "focus", displayName: "Focus", value: 4 }]
    },
    sortedSkills: {
      custom: [{ id: "ritual", displayName: "Ritual", value: 2 }]
    }
  }
});

assert.deepEqual(traits.attributes[0], {
  key: "attribute:focus",
  id: "focus",
  type: "attribute",
  label: "Focus",
  value: 4
});
assert.deepEqual(traits.skills[0], {
  key: "skill:ritual",
  id: "ritual",
  type: "skill",
  label: "Ritual",
  value: 2
});

console.log("Areté tests passed.");
