import assert from "node:assert/strict";
import {
  compileMageTraitRoll,
  prepareMageRollTraits
} from "../scripts/mage-roll-selection.js";

const actor = {
  system: {
    sortedSkills: {
      physical: [
        { id: "brawl", displayName: "Rissa", value: 3 },
        { id: "firearms", displayName: "Armi da fuoco", value: 5 }
      ],
      mental: [{ id: "occult", displayName: "Occulto", value: 4 }],
      social: [{ id: "persuasion", displayName: "Convincere", value: 2 }]
    },
    sortedAttributes: {
      physical: [{ id: "dexterity", displayName: "Destrezza", value: 2 }],
      mental: [{ id: "intelligence", displayName: "Intelligenza", value: 3 }]
    }
  }
};

const traits = prepareMageRollTraits(actor, {
  localize: (key) => key === "WOD5E_MAGE.Skills.Combat" ? "Combattimento" : key,
  lang: "it"
});

assert.deepEqual(traits.skills.map((trait) => trait.id), ["brawl", "persuasion", "occult"]);
assert.equal(traits.skills.find((trait) => trait.id === "brawl").label, "Combattimento");
assert.equal(traits.skills.some((trait) => trait.id === "firearms"), false);

const twoAbilities = compileMageTraitRoll({
  dataset: {},
  traits,
  primarySkillId: "brawl",
  secondaryKey: "skill:occult"
});
assert.equal(twoAbilities.label, "Combattimento + Occulto");
assert.equal(twoAbilities.valuePaths, "skills.brawl.value skills.occult.value");
assert.equal(twoAbilities.selectors, "skills skills.brawl skills.occult");
assert.equal(twoAbilities.selectDialog, false);

const abilityAndAttribute = compileMageTraitRoll({
  dataset: {},
  traits,
  primarySkillId: "occult",
  secondaryKey: "attribute:intelligence"
});
assert.equal(abilityAndAttribute.label, "Occulto + Intelligenza");
assert.equal(
  abilityAndAttribute.valuePaths,
  "skills.occult.value attributes.intelligence.value"
);
assert.equal(
  abilityAndAttribute.selectors,
  "skills skills.occult attributes attributes.intelligence mental"
);

assert.equal(compileMageTraitRoll({
  dataset: {},
  traits,
  primarySkillId: "firearms",
  secondaryKey: "attribute:dexterity"
}), null);

console.log("Mage trait roll selection tests passed.");
