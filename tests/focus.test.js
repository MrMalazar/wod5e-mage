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
// Senza Sfere sbloccate, la colonna delle Sfere del Focus è vuota.
assert.equal(focus.spheres.length, 0);
// Ogni slot porta la famiglia: vuota di default, sei scelte in ordine.
assert.equal(focus.instruments[0].kind, "");
assert.deepEqual(
  focus.instruments[0].families.map((family) => family.id),
  ["body", "machine", "object", "substance", "word", "world"]
);
assert.equal(focus.instruments[0].families.every((family) => !family.selected), true);
// La Pratica si dichiara in due campi: la Forma (tre scelte) e il nome.
assert.equal(focus.practiceForm, "");
assert.deepEqual(focus.forms.map((form) => form.id), ["magick", "tecnomagick", "ibrida"]);

actor = focusActor({
  arete: 5,
  spheres: { forces: 2, time: 5 },
  selectedSpheres: { forces: true, time: false },
  focus: {
    paradigm: "Everything is connected",
    practiceForm: "tecnomagick",
    instruments: { slot1: { selected: true, name: "Old compass", kind: "object" } },
    sphereNotes: { forces: "Fire reveals intent" }
  }
});
focus = await prepareFocus(actor, async (value) => `<p>${value}</p>`);
assert.equal(focus.instrumentCount, 7);
assert.equal(focus.instruments[0].selected, true);
assert.equal(focus.instruments[0].name, "Old compass");
assert.equal(focus.practiceForm, "tecnomagick");
assert.equal(focus.forms.find((form) => form.id === "tecnomagick").selected, true);
assert.equal(focus.instruments[0].kind, "object");
assert.equal(focus.instruments[0].families.find((family) => family.id === "object").selected, true);
// Solo le Sfere selezionate compaiono: Forza sì, Tempo (nascosta) no.
assert.equal(focus.spheres.length, 1);
assert.equal(focus.spheres.find((sphere) => sphere.id === "forces").levelLabel, undefined);
assert.equal(focus.spheres.find((sphere) => sphere.id === "forces").enrichedNotes, "<p>Fire reveals intent</p>");
assert.equal(focus.spheres.find((sphere) => sphere.id === "time"), undefined);

await onFocusInstrumentToggle.call(
  { actor },
  { preventDefault() {} },
  { dataset: { slot: "slot2", selected: "false" } }
);
assert.deepEqual(actor.lastUpdate, {
  "flags.wod5e-mage.focus.instruments.slot2.selected": true
});

console.log("Focus tests passed.");
