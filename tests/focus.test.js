import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  familiesForForm,
  FOCUS_CREDOS,
  FOCUS_TOOLS,
  legacyInstrumentNames,
  prepareFocus
} from "../scripts/focus.js";

function focusActor({ spheres = {}, selectedSpheres, focus = {} } = {}) {
  return {
    isOwner: true,
    name: "Mage",
    system: { locked: false },
    getFlag(_moduleId, key) {
      if (key === "spheres") return spheres;
      if (key === "selectedSpheres") return selectedSpheres;
      if (key === "focus") return focus;
      return undefined;
    }
  };
}

// I ventidue Strumenti, cinque famiglie, niente Mondo.
assert.equal(FOCUS_TOOLS.length, 22);
assert.deepEqual(
  [...new Set(FOCUS_TOOLS.map((tool) => tool.family))],
  ["object", "word", "machine", "substance", "body"]
);
assert.equal(FOCUS_TOOLS.filter((tool) => tool.profession).length, 2);
assert.equal(FOCUS_CREDOS.length, 13);

// I Tipi: Oggetto e Sostanza per tutti, Parola e Corpo solo Magick,
// Macchina solo Tecnomagick, l'Ibrida tutto.
assert.deepEqual(familiesForForm("magick"), ["object", "substance", "word", "body"]);
assert.deepEqual(familiesForForm("tecnomagick"), ["object", "substance", "machine"]);
assert.equal(familiesForForm("ibrida").length, 5);
assert.equal(familiesForForm("").length, 5);

// Senza Sfere sbloccate: nessuna riga di Strumento, colonna delle Sfere vuota.
let actor = focusActor();
let focus = await prepareFocus(actor);
assert.equal(focus.instruments.length, 0);
assert.equal(focus.spheres.length, 0);
assert.equal(focus.credo, "");
assert.deepEqual(focus.credos.map((credo) => credo.id), [...FOCUS_CREDOS]);
assert.equal(focus.practiceForm, "");
assert.deepEqual(focus.forms.map((form) => form.id), ["magick", "tecnomagick", "ibrida"]);

// Una riga per Sfera sbloccata; lo Strumento salvato, il mestiere, il nome.
actor = focusActor({
  spheres: { forces: 2, time: 5, mind: 3 },
  selectedSpheres: { forces: true, time: false, mind: true },
  focus: {
    credo: "arte",
    paradigm: "Everything is connected",
    practiceForm: "tecnomagick",
    sphereInstruments: {
      forces: { tool: "tradeApparatus", profession: "meccanico", name: "il banco di prova" },
      mind: { tool: "prayers", name: "il rosario" }
    },
    sphereNotes: { forces: "Fire reveals intent" }
  }
});
focus = await prepareFocus(actor, async (value) => `<p>${value}</p>`);
assert.equal(focus.credo, "arte");
assert.equal(focus.credos.find((credo) => credo.id === "arte").selected, true);
assert.equal(focus.paradigm, "Everything is connected");
assert.equal(focus.forms.find((form) => form.id === "tecnomagick").selected, true);
assert.equal(focus.instruments.length, 2);
const forces = focus.instruments.find((row) => row.id === "forces");
assert.equal(forces.tool, "tradeApparatus");
assert.equal(forces.family, "machine");
assert.equal(forces.needsProfession, true);
assert.equal(forces.profession, "meccanico");
assert.equal(forces.name, "il banco di prova");
assert.equal(forces.outsideForm, false);
assert.equal(forces.families.find((family) => family.id === "machine").tools.find((tool) => tool.id === "tradeApparatus").selected, true);
// Le Preghiere stanno nella Parola: fuori dalla Tecnomagick, e la riga lo dice.
const mind = focus.instruments.find((row) => row.id === "mind");
assert.equal(mind.outsideForm, true);
assert.equal(mind.needsProfession, false);
assert.equal(mind.families.find((family) => family.id === "word").allowed, false);
assert.equal(mind.families.find((family) => family.id === "object").allowed, true);
// Solo le Sfere selezionate compaiono: Tempo (nascosta) no.
assert.equal(focus.spheres.length, 2);
assert.equal(focus.spheres.find((sphere) => sphere.id === "forces").enrichedNotes, "<p>Fire reveals intent</p>");
assert.equal(focus.spheres.find((sphere) => sphere.id === "time"), undefined);

// Lo stesso Strumento su due Sfere: possibile, e ogni riga nomina l'altra.
actor = focusActor({
  spheres: { forces: 2, mind: 3 },
  selectedSpheres: { forces: true, mind: true },
  focus: {
    practiceForm: "magick",
    sphereInstruments: { forces: { tool: "weapons" }, mind: { tool: "weapons" } }
  }
});
focus = await prepareFocus(actor);
assert.equal(focus.instruments[0].sharedWith.length, 1);
assert.equal(focus.instruments[1].sharedList, focus.instruments[0].label);

// I sei slot vecchi si riversano nelle righe, finché non si salva la prima volta.
const legacy = {
  slot1: { kind: "object", name: "Old compass", selected: true },
  slot2: { kind: "", name: "" },
  slot3: { kind: "word", name: "" },
  slot4: { kind: "", name: "una pietra" }
};
assert.deepEqual(
  legacyInstrumentNames(legacy, (key) => key.split(".").pop()),
  ["object · Old compass", "word", "una pietra"]
);
actor = focusActor({
  spheres: { forces: 2, mind: 3 },
  selectedSpheres: { forces: true, mind: true },
  focus: { instruments: legacy }
});
focus = await prepareFocus(actor);
assert.equal(focus.instruments.length, 2);
assert.equal(focus.instruments[0].tool, "");
assert.equal(focus.instruments[0].name, "WOD5E_MAGE.Focus.Families.object · Old compass");
assert.equal(focus.instruments[1].name, "WOD5E_MAGE.Focus.Families.word");
// Una volta salvate le righe, i vecchi slot non parlano più.
actor = focusActor({
  spheres: { forces: 2 },
  selectedSpheres: { forces: true },
  focus: { instruments: legacy, sphereInstruments: {} }
});
focus = await prepareFocus(actor);
assert.equal(focus.instruments[0].name, "");

console.log("Focus tests passed.");

// Lo Strumento di Percepire (9/9): in coda alle Sfere, stessa tendina, e conta nel «regge anche».
{
  const { preparePerceiveInstrument, prepareSphereInstruments, PERCEIVE_TOOL_ID } = await import("../scripts/focus.js");
  const localize = (key) => key;
  const spheres = [{ id: "forces", label: "WOD5E_MAGE.Spheres.forces", icon: "f.png", value: 2 }];
  const actorWith = (sphereInstruments) => ({ getFlag: (_m, key) => (key === "focus" ? { sphereInstruments } : undefined) });
  assert.equal(PERCEIVE_TOOL_ID, "percepire");
  const perceive = preparePerceiveInstrument(actorWith({ forces: { tool: "weapons" }, percepire: { tool: "weapons", name: "Lente" } }), { localize, spheres, form: "magick" });
  assert.equal(perceive.perceive, true);
  assert.equal(perceive.faIcon, "fa-solid fa-eye");
  assert.equal(perceive.tool, "weapons");
  assert.equal(perceive.name, "Lente");
  assert.deepEqual(perceive.sharedWith, ["WOD5E_MAGE.Spheres.forces"]);
  assert.ok(perceive.families.some((family) => family.tools.some((tool) => tool.selected)));
  const rows = prepareSphereInstruments(actorWith({ forces: { tool: "weapons" }, percepire: { tool: "weapons" } }), { localize, spheres, form: "magick" });
  assert.equal(rows.length, 1, "le righe delle Sfere restano quelle");
  assert.deepEqual(rows[0].sharedWith, ["WOD5E_MAGE.Focus.PerceiveTool"]);
  assert.equal(preparePerceiveInstrument(actorWith({}), { localize, spheres: [], form: "" }), null, "senza Sfere niente riga");
  const template = readFileSync(new URL("../templates/actor/parts/focus.hbs", import.meta.url), "utf8");
  assert.match(template, /\{\{#if focus\.perceiveInstrument\}\}\s*\{\{> "modules\/wod5e-mage\/templates\/actor\/parts\/strumento-riga\.hbs" row=focus\.perceiveInstrument locked=locked\}\}/);
  const riga = readFileSync(new URL("../templates/actor/parts/strumento-riga.hbs", import.meta.url), "utf8");
  assert.match(riga, /\{\#unless row\.perceive\}\}[\s\S]*data-action="strumentiSuggest"/);
  // Lo Strumento (21/9): la pastiglia apre la tendina, le pastiglie scrivono la bandiera (strumentoPick); via la select.
  assert.match(riga, /wod5e-mage-strumento-pastiglia\{\{#if row\.tool\}\} pieno\{\{\/if\}\}" data-action="cassettoToggle"[\s\S]*wod5e-mage-cassetto wod5e-mage-cassetto-strumenti[\s\S]*data-action="strumentoPick" data-sphere="\{\{\.\.\/\.\.\/row\.id\}\}" data-tool="\{\{tool\.id\}\}"[\s\S]*name="flags\.wod5e-mage\.focus\.sphereInstruments\.\{\{row\.id\}\}\.name"/);
  assert.doesNotMatch(riga, /<select/);
  const focusJs = readFileSync(new URL("../scripts/focus.js", import.meta.url), "utf8");
  assert.match(focusJs, /export async function onStrumentoPick[\s\S]*focus\.sphereInstruments\.\$\{sphere\}\.tool`\]: current === tool \? "" : tool/);
  assert.match(focusJs, /export async function onFocusForm[\s\S]*focus\.practiceForm`\]: current === form \? "" : form/);
  assert.match(focusJs, /export async function onCredoModifica[\s\S]*_credoInModifica/);
  assert.match(template, /data-action="focusForm" data-form="\{\{form\.id\}\}"[\s\S]*Focus\.CredoInTestata[\s\S]*wod5e-mage-focus-spheres[\s\S]*wod5e-mage-riga-credo-sfera\{\{#if sphere\.editing\}\} aperta modifica\{\{\/if\}\}"[\s\S]*data-action="rigaApri"[\s\S]*data-action="credoModifica" data-sphere="\{\{sphere\.id\}\}"[\s\S]*<prose-mirror name="flags\.wod5e-mage\.focus\.sphereNotes\.\{\{sphere\.id\}\}"/);
  assert.doesNotMatch(template, /<select name="flags\.wod5e-mage\.focus\.practiceForm"/);
}
