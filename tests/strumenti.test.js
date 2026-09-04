import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CREDO_STRUMENTI, FAMIGLIA_STRUMENTI, SOTTOFAMIGLIA_STRUMENTI } from "../scripts/data/strumenti.js";
import { FAMIGLIE } from "../scripts/famiglie.js";
import { FOCUS_CREDOS, FOCUS_TOOL_IDS } from "../scripts/focus.js";
import { SPHERES } from "../scripts/spheres.js";
import { keysForForm, suggestInstruments } from "../scripts/strumenti.js";

// I dati generati: tredici Credi con le nove Sfere, uno Strumento vero per cella.
assert.deepEqual(Object.keys(CREDO_STRUMENTI).sort(), [...FOCUS_CREDOS].sort());
for (const [credo, data] of Object.entries(CREDO_STRUMENTI)) {
  assert.deepEqual(Object.keys(data.spheres).sort(), [...SPHERES].sort(), credo);
  for (const cell of Object.values(data.spheres)) {
    for (const key of ["magick", "tecnomagick"]) {
      assert.ok(FOCUS_TOOL_IDS.includes(cell[key].tool), `${credo} ${cell[key].tool}`);
      assert.ok(cell[key].examples.length > 0, credo);
    }
  }
}
assert.equal(CREDO_STRUMENTI.arte.profession, "Artista");
// Ogni Famiglia e ogni setta ha i suoi Strumenti.
for (const famiglia of FAMIGLIE) {
  assert.ok(FAMIGLIA_STRUMENTI[famiglia.id], famiglia.id);
  for (const sub of famiglia.sottofamiglie) {
    assert.ok(SOTTOFAMIGLIA_STRUMENTI[sub.id], sub.id);
    assert.ok(Object.keys(SOTTOFAMIGLIA_STRUMENTI[sub.id].tools).length >= 4, sub.id);
  }
}
assert.deepEqual(FAMIGLIA_STRUMENTI.hermes.list, ["Cerchi e sigilli", "nomi veri", "grimori", "rituali"]);
assert.equal(SOTTOFAMIGLIA_STRUMENTI.verdicta.tools.object, "sigilli e timbri");
assert.equal(SOTTOFAMIGLIA_STRUMENTI.verdicta.credo, "legge");
assert.equal(FAMIGLIA_STRUMENTI.ngoma.tools.body, "imporre le mani");
// Il Mondo è cancellato: non arriva nei consigli.
assert.ok(Object.values(SOTTOFAMIGLIA_STRUMENTI).every((sub) => !("world" in sub.tools)));

// Il Tipo filtra le chiavi del Credo.
assert.deepEqual(keysForForm("magick"), ["magick"]);
assert.deepEqual(keysForForm("tecnomagick"), ["tecnomagick"]);
assert.deepEqual(keysForForm("ibrida"), ["magick", "tecnomagick"]);
assert.deepEqual(keysForForm(""), ["magick", "tecnomagick"]);

// I consigli per Forza di un ermetico Verdicta artista, in Magick.
const localize = (key) => key.split(".").pop();
const out = suggestInstruments({ credo: "arte", famiglia: "hermes", sottofamiglia: "verdicta", form: "magick", sphereId: "forces" }, localize);
assert.equal(out.empty, false);
assert.equal(out.credo.label, "arte");
assert.equal(out.credo.entries.length, 1);
assert.deepEqual(out.credo.entries[0], {
  key: "magick", keyLabel: "magick", tool: "gestures", toolLabel: "gestures", profession: "",
  examples: "uso della spatola, pennellata", name: "uso della spatola"
});
assert.equal(out.famiglia.label, "Ordine di Hermes");
assert.deepEqual(out.famiglia.list, ["Cerchi e sigilli", "nomi veri", "grimori", "rituali"]);
assert.equal(out.sottofamiglia.label, "Casa Verdicta");
assert.deepEqual(out.sottofamiglia.tools[0], { family: "object", familyLabel: "object", name: "sigilli e timbri" });
// In Tecnomagick l'esempio è un Attrezzo da mestiere: porta il mestiere del Credo.
const tecno = suggestInstruments({ credo: "arte", form: "tecnomagick", sphereId: "forces" }, (key) => (key.endsWith("tradeTools") ? "Attrezzi da mestiere" : key.split(".").pop()));
assert.deepEqual(tecno.credo.entries.map((entry) => [entry.tool, entry.profession, entry.toolLabel]), [["tradeTools", "Artista", "Attrezzi da Artista"]]);
// Un Credo in parole tue, senza Famiglia: niente consigli.
assert.equal(suggestInstruments({ credo: "il mio", sphereId: "forces" }, localize).empty, true);
// Una Craft: gli Strumenti della riga ⚙, senza Sottofamiglia.
const craft = suggestInstruments({ famiglia: "ngoma", sottofamiglia: "verdicta", sphereId: "prime" }, localize);
assert.equal(craft.famiglia.tools.length, 5);
assert.equal(craft.sottofamiglia, null);

// La scheda e il dialogo.
const focus = readFileSync(new URL("../templates/actor/parts/focus.hbs", import.meta.url), "utf8");
assert.match(focus, /data-action="strumentiSuggest" data-sphere="\{\{row\.id\}\}"/);
const dialog = readFileSync(new URL("../templates/dialogs/strumenti-consigli.hbs", import.meta.url), "utf8");
assert.match(dialog, /data-role="suggestApply" data-tool="\{\{entry\.tool\}\}" data-profession="\{\{entry\.profession\}\}" data-name="\{\{entry\.name\}\}"/);
const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheet, /strumentiSuggest: onStrumentiSuggest/);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8"));
  for (const key of ["Suggest", "SuggestTitle", "SuggestHint", "SuggestEmpty", "SuggestFromCredo", "SuggestFromFamily", "SuggestFromSubfamily", "SuggestNoneForType", "SuggestApply", "SuggestApplyName"]) {
    assert.equal(typeof strings.WOD5E_MAGE.Focus[key], "string", `${lang} ${key}`);
  }
}

console.log("Strumenti tests passed.");
