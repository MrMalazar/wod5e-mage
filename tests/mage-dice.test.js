import assert from "node:assert/strict";
import {
  applyMageDiceClass,
  getMageDieImage,
  isMageActor
} from "../scripts/mage-dice.js";
import { getParadoxDieImage } from "../scripts/dice-faces.js";

function mageActor({ sheetClass = "", flag = false } = {}) {
  return {
    getFlag(scope, key) {
      if (scope === "core" && key === "sheetClass") return sheetClass;
      if (scope === "wod5e-mage" && key === "isMage") return flag;
      return undefined;
    }
  };
}

assert.equal(isMageActor(mageActor()), false);
assert.equal(isMageActor(mageActor({ flag: true })), true);
assert.equal(
  isMageActor(mageActor({ sheetClass: "wod5e-mage.MageActorSheet" })),
  true
);

const classes = new Set(["roll-img", "mortal-dice"]);
const die = {
  src: "native-mortal.png",
  classList: {
    add: (name) => classes.add(name),
    remove: (name) => classes.delete(name)
  }
};
const changed = applyMageDiceClass(
  {
    speakerActor: mageActor({ flag: true }),
    rolls: [{ basicDice: { results: [{ result: 10 }] } }]
  },
  { querySelectorAll: () => [die] }
);

assert.equal(changed, 1);
assert.equal(classes.has("mortal-dice"), false);
assert.equal(classes.has("mage-dice"), true);
assert.equal(die.src, "modules/wod5e-mage/assets/icons/dice/chat/star_mage.png");

assert.equal(getMageDieImage(1).endsWith("empty_mage.png"), true);
assert.equal(getMageDieImage(5).endsWith("empty_mage.png"), true);
assert.equal(getMageDieImage(6).endsWith("spark_mage.png"), true);
assert.equal(getMageDieImage(9).endsWith("spark_mage.png"), true);
assert.equal(getMageDieImage(10).endsWith("star_mage.png"), true);

assert.equal(getParadoxDieImage(1).endsWith("eye_closed_paradox.png"), true);
assert.equal(getParadoxDieImage(2).endsWith("empty_paradox.png"), true);
assert.equal(getParadoxDieImage(5).endsWith("empty_paradox.png"), true);
assert.equal(getParadoxDieImage(6).endsWith("spark_paradox.png"), true);
assert.equal(getParadoxDieImage(9).endsWith("spark_paradox.png"), true);
assert.equal(getParadoxDieImage(10).endsWith("eye_open_paradox.png"), true);

console.log("Mage dice tests passed.");
