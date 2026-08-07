import assert from "node:assert/strict";
import { applyMageDiceClass, isMageActor } from "../scripts/mage-dice.js";

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
  classList: {
    add: (name) => classes.add(name),
    remove: (name) => classes.delete(name)
  }
};
const changed = applyMageDiceClass(
  { speakerActor: mageActor({ flag: true }) },
  { querySelectorAll: () => [die] }
);

assert.equal(changed, 1);
assert.equal(classes.has("mortal-dice"), false);
assert.equal(classes.has("mage-dice"), true);

console.log("Mage dice tests passed.");
