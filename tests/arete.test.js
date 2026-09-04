import assert from "node:assert/strict";
import {
  bonusDiceExcess,
  calculateAretePrize,
  calculateAreteTraitPool,
  calculateAutomaticSuccesses,
  calculateMagickThreshold,
  capBonusDice,
  getArete,
  isAutomaticVictory,
  isOneStepShort,
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

// La riserva del ramo A: due tratti, l'Areté non tira.
assert.equal(calculateAreteTraitPool(4, 2), 6);
assert.equal(calculateAreteTraitPool(1, 0), 1);
// Attributo, Abilità, Abilità: ne basta uno, gli altri si sommano.
assert.equal(calculateAreteTraitPool(3, 2, 2), 7);
assert.equal(calculateAreteTraitPool(3), 3);
assert.equal(calculateAreteTraitPool(), 0);

// Il premio dell'Areté: pari all'Areté, tetto +3, mai all'Ibrida.
assert.equal(calculateAretePrize(2, "magick"), 2);
assert.equal(calculateAretePrize(5, "tecnomagick"), 3);
assert.equal(calculateAretePrize(4, ""), 3);
assert.equal(calculateAretePrize(5, "ibrida"), 0);
assert.equal(capBonusDice(5), 3);
assert.equal(capBonusDice(-1), 0);

// Il tetto +3 conta premio, Armonia e modificatori positivi insieme;
// i negativi non c'entrano.
assert.equal(bonusDiceExcess(3, []), 0);
assert.equal(bonusDiceExcess(2, [{ value: "+2" }, { value: "-1" }]), 1);
assert.equal(bonusDiceExcess(0, [{ value: 1 }, { value: 1 }]), 0);
assert.equal(bonusDiceExcess(3, [{ value: "+3" }]), 3);

// La soglia: il maggiore fra Sfera e Ambito, +1 per ogni Ambito oltre il
// primo, +1 con tre o più Sfere, tetto 7.
assert.equal(calculateMagickThreshold(), 0);
assert.equal(calculateMagickThreshold({ sphereLevels: [3] }), 3);
assert.equal(calculateMagickThreshold({ sphereLevels: [3], scopeLevels: [4] }), 4);
assert.equal(calculateMagickThreshold({ sphereLevels: [3], scopeLevels: [4, 2] }), 5);
assert.equal(calculateMagickThreshold({ sphereLevels: [3, 2], scopeLevels: [1] }), 3);
assert.equal(calculateMagickThreshold({ sphereLevels: [3, 2, 1], scopeLevels: [1] }), 4);
// Il tetto 7 vale sul livello e sulle tre Sfere; gli Ambiti oltre il primo lo superano.
assert.equal(calculateMagickThreshold({ sphereLevels: [5, 4, 4], scopeLevels: [7, 7, 7] }), 9);
assert.equal(calculateMagickThreshold({ sphereLevels: [5, 4, 4], scopeLevels: [7] }), 7);
assert.equal(calculateMagickThreshold({ sphereLevels: [5], scopeLevels: [7, 1] }), 8);
// Un livello di Ambito fuori scala si riporta fra 0 e 7: lo zero non conta.
assert.equal(calculateMagickThreshold({ sphereLevels: [1], scopeLevels: [0] }), 1);
assert.equal(calculateMagickThreshold({ sphereLevels: [1], scopeLevels: [9] }), 7);

// Le Specialità non toccano più la soglia (verdetto di Blue, 4/9 notte):
// Mente 3 con Bersagli 4 e Portata 4 fa 5, con o senza Specialità.
assert.equal(calculateMagickThreshold({
  sphereLevels: [{ id: "mind", level: 3 }],
  scopeLevels: [{ id: "targets", level: 4 }, { id: "range", level: 4 }],
  specialties: { mind: "targets" }
}), 5);
// Danno successi automatici pari all'Areté quando la Sfera è nel lancio e
// l'Ambito è dichiarato; una volta sola; senza la coppia, niente.
assert.deepEqual(calculateAutomaticSuccesses({
  sphereLevels: [{ id: "forces", level: 3 }],
  scopeLevels: [{ id: "power", level: 7 }],
  specialties: { forces: "power" },
  arete: 2
}), { successes: 2, pairs: [{ sphere: "forces", scope: "power" }] });
assert.deepEqual(calculateAutomaticSuccesses({
  sphereLevels: [{ id: "forces", level: 3 }, { id: "mind", level: 2 }],
  scopeLevels: [{ id: "power", level: 7 }, { id: "targets", level: 2 }],
  specialties: { forces: "power", mind: "targets" },
  arete: 3
}).successes, 3);
assert.equal(calculateAutomaticSuccesses({ sphereLevels: [{ id: "forces", level: 3 }], scopeLevels: [{ id: "range", level: 2 }], specialties: { forces: "power" }, arete: 2 }).successes, 0);
assert.equal(calculateAutomaticSuccesses({ sphereLevels: [{ id: "mind", level: 3 }], scopeLevels: [{ id: "power", level: 2 }], specialties: { forces: "power" }, arete: 2 }).successes, 0);
assert.equal(calculateAutomaticSuccesses({ sphereLevels: [{ id: "forces", level: 3 }], scopeLevels: [{ id: "power", level: 2 }], specialties: { forces: "power" }, arete: 0 }).successes, 0);
// Coprono la soglia: vittoria automatica senza tirare.
assert.equal(isAutomaticVictory(3, 4, 4), true);
assert.equal(isAutomaticVictory(3, 4, 3), false);

// Vittoria automatica: riserva almeno doppia della soglia.
assert.equal(isAutomaticVictory(8, 4), true);
assert.equal(isAutomaticVictory(7, 4), false);
assert.equal(isAutomaticVictory(10, 0), false);

// A un passo: sotto la soglia di al massimo Areté successi.
assert.equal(isOneStepShort(2, 4, 2), true);
assert.equal(isOneStepShort(1, 4, 2), false);
assert.equal(isOneStepShort(4, 4, 2), false);
assert.equal(isOneStepShort(0, 0, 5), false);

// Il premio e l'Armonia entrano solo se il giocatore li dichiara.
assert.deepEqual(normalizeMagickRollOptions(), {
  usePrize: false,
  harmony: 0,
  coincidental: false,
  vulgar: false,
  witnesses: false
});
assert.equal(normalizeMagickRollOptions({ prize: "on" }).usePrize, true);
assert.equal(normalizeMagickRollOptions({ prize: true }).usePrize, true);
assert.equal(normalizeMagickRollOptions({ prize: "false" }).usePrize, false);
assert.equal(normalizeMagickRollOptions({ harmony: "2" }).harmony, 2);
assert.equal(normalizeMagickRollOptions({ harmony: 5 }).harmony, 5);
assert.equal(normalizeMagickRollOptions({ harmony: 40 }).harmony, 9);
assert.equal(normalizeMagickRollOptions({ harmony: -3 }).harmony, 0);

assert.deepEqual(normalizeMagickRollOptions({ vulgar: false, witnesses: true }), {
  usePrize: false,
  harmony: 0,
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
  usePrize: false,
  harmony: 0,
  coincidental: false,
  vulgar: true,
  witnesses: false
});
assert.deepEqual(normalizeMagickRollOptions({
  coincidental: true,
  vulgar: true,
  witnesses: true
}), {
  usePrize: false,
  harmony: 0,
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
      custom: [
        { id: "occult", displayName: "Ritual", value: 2 },
        { id: "firearms", displayName: "Firearms", value: 5 }
      ]
    }
  }
});

assert.deepEqual(traits.attributes[0], {
  key: "attribute:focus",
  id: "focus",
  type: "attribute",
  category: "custom",
  label: "Focus",
  value: 4
});
assert.deepEqual(traits.skills[0], {
  key: "skill:occult",
  id: "occult",
  type: "skill",
  label: "Ritual",
  value: 2
});
assert.equal(traits.skills.some((trait) => trait.id === "firearms"), false);

console.log("Areté tests passed.");
