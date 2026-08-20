import assert from "node:assert/strict";
import {
  applyMageDiceClass,
  getMageDieImage,
  isMageActor
} from "../scripts/mage-dice.js";
import {
  getParadoxDieImage,
  getParadoxDieResult
} from "../scripts/dice-faces.js";

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
  {
    querySelectorAll: (selector) => selector === ".roll-img.mortal-dice"
      ? [die]
      : []
  }
);

assert.equal(changed, 1);
assert.equal(classes.has("mortal-dice"), false);
assert.equal(classes.has("mage-dice"), true);
assert.equal(die.src, "modules/wod5e-mage/assets/icons/dice/chat/magick-stellina.svg");

assert.equal(getMageDieImage(1).endsWith("dado-vuoto.svg"), true);
assert.equal(getMageDieImage(5).endsWith("dado-vuoto.svg"), true);
assert.equal(getMageDieImage(6).endsWith("magick-scintilla.svg"), true);
assert.equal(getMageDieImage(9).endsWith("magick-scintilla.svg"), true);
assert.equal(getMageDieImage(10).endsWith("magick-stellina.svg"), true);

assert.equal(getParadoxDieImage(1).endsWith("paradosso-occhio-vuoto.svg"), true);
assert.equal(getParadoxDieImage(2).endsWith("dado-vuoto.svg"), true);
assert.equal(getParadoxDieImage(5).endsWith("dado-vuoto.svg"), true);
assert.equal(getParadoxDieImage(6).endsWith("paradosso-scintilla.svg"), true);
assert.equal(getParadoxDieImage(9).endsWith("paradosso-scintilla.svg"), true);
assert.equal(getParadoxDieImage(10).endsWith("paradosso-occhio-completo.svg"), true);
assert.equal(getParadoxDieResult(1), "bestial");
assert.equal(getParadoxDieResult(5), "failure");
assert.equal(getParadoxDieResult(9), "success");
assert.equal(getParadoxDieResult(10), "paradoxTen");

const emptyMageClasses = new Set(["roll-img", "mortal-dice"]);
let emptyMageSourceRemoved = false;
const emptyMageDie = {
  src: "native-mortal.png",
  classList: {
    add: (name) => emptyMageClasses.add(name),
    remove: (name) => emptyMageClasses.delete(name)
  },
  removeAttribute(name) {
    if (name === "src") emptyMageSourceRemoved = true;
  }
};

applyMageDiceClass(
  {
    speakerActor: mageActor({ flag: true }),
    rolls: [{ basicDice: { results: [{ result: 4 }] } }]
  },
  {
    querySelectorAll: (selector) => selector === ".roll-img.mortal-dice"
      ? [emptyMageDie]
      : []
  }
);

assert.equal(emptyMageClasses.has("mage-dice-empty"), true);
assert.equal(emptyMageSourceRemoved, false);
assert.equal(emptyMageDie.src.endsWith("dado-vuoto.svg"), true);

const emptyParadoxClasses = new Set(["roll-img", "paradox-dice"]);
let emptyParadoxSourceRemoved = false;
const emptyParadoxDie = {
  src: "",
  classList: {
    add: (name) => emptyParadoxClasses.add(name),
    remove: (name) => emptyParadoxClasses.delete(name)
  },
  removeAttribute(name) {
    if (name === "src") emptyParadoxSourceRemoved = true;
  }
};

const paradoxChanged = applyMageDiceClass(
  {
    speakerActor: mageActor({ flag: true }),
    rolls: [{ advancedDice: { results: [{ result: 3 }] } }]
  },
  {
    querySelectorAll: (selector) => selector === ".roll-img.paradox-dice"
      ? [emptyParadoxDie]
      : []
  }
);

assert.equal(paradoxChanged, 1);
assert.equal(emptyParadoxClasses.has("paradox-dice-empty"), true);
assert.equal(emptyParadoxSourceRemoved, false);
assert.equal(emptyParadoxDie.src.endsWith("dado-vuoto.svg"), true);

console.log("Mage dice tests passed.");
