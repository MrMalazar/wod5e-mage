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

// Areté resta fuori dalla riserva finché la casella non viene spuntata.
assert.deepEqual(normalizeMagickRollOptions(), {
  useArete: false,
  coincidental: false,
  vulgar: false,
  witnesses: false
});
assert.equal(normalizeMagickRollOptions({ arete: "on" }).useArete, true);
assert.equal(normalizeMagickRollOptions({ arete: true }).useArete, true);
assert.equal(normalizeMagickRollOptions({ arete: "false" }).useArete, false);

assert.deepEqual(normalizeMagickRollOptions({ vulgar: false, witnesses: true }), {
  useArete: false,
  coincidental: false,
  vulgar: false,
  witnesses: true
});

// Il tipo di Magick è una scelta sola: vince sempre la più grave.
assert.deepEqual(normalizeMagickRollOptions({
  coincidental: true,
  vulgar: true,
  witnesses: false
}), {
  useArete: false,
  coincidental: false,
  vulgar: true,
  witnesses: false
});
assert.deepEqual(normalizeMagickRollOptions({
  coincidental: true,
  vulgar: true,
  witnesses: true
}), {
  useArete: false,
  coincidental: false,
  vulgar: false,
  witnesses: true
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
