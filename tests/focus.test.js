import assert from "node:assert/strict";
import { onFocusInstrumentToggle, prepareFocus } from "../scripts/focus.js";

function focusActor({ arete = 1, spheres = {}, selectedSpheres, focus = {} } = {}) {
  return {
    isOwner: true,
    name: "Mage",
    system: { locked: false },
    getFlag(_moduleId, key) {
      if (key === "arete") return { value: arete };
      if (key === "spheres") return spheres;
      if (key === "selectedSpheres") return selectedSpheres;
      if (key === "focus") return focus;
      return undefined;
    },
    async update(data) {
      this.lastUpdate = data;
    }
  };
}

// Sette slot anche ad Areté 1: il conto «2 + Areté» non esiste più.
let actor = focusActor();
let focus = await prepareFocus(actor);
assert.equal(focus.instrumentCount, 7);
assert.equal(focus.instruments.length, 7);
assert.equal(focus.arete, undefined);
assert.equal(focus.spheres.length, 9);
assert.equal(focus.spheres[0].levelLabel, "");

actor = focusActor({
  arete: 5,
  spheres: { forces: 2, time: 5 },
  selectedSpheres: { forces: true, time: false },
  focus: {
    paradigm: "Everything is connected",
    instruments: { slot1: { selected: true, name: "Old compass" } },
    sphereNotes: { forces: "Fire reveals intent" }
  }
});
focus = await prepareFocus(actor, async (value) => `<p>${value}</p>`);
assert.equal(focus.instrumentCount, 7);
assert.equal(focus.instruments[0].selected, true);
assert.equal(focus.instruments[0].name, "Old compass");
assert.equal(focus.spheres.find((sphere) => sphere.id === "forces").levelLabel, "WOD5E_MAGE.Spheres.Influence.Touch");
assert.equal(focus.spheres.find((sphere) => sphere.id === "forces").enrichedNotes, "<p>Fire reveals intent</p>");
// Tempo ha cinque pallini ma è nascosta: niente parentesi nel Focus.
assert.equal(focus.spheres.find((sphere) => sphere.id === "time").levelLabel, "");

await onFocusInstrumentToggle.call(
  { actor },
  { preventDefault() {} },
  { dataset: { slot: "slot2", selected: "false" } }
);
assert.deepEqual(actor.lastUpdate, {
  "flags.wod5e-mage.focus.instruments.slot2.selected": true
});

console.log("Focus tests passed.");
