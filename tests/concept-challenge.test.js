import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  CONCEPT_CHALLENGE_GROUPS,
  prepareConceptChallenge
} from "../scripts/concept-challenge.js";

function actorWithConcept(values) {
  return {
    getFlag(_moduleId, key) {
      return key === "conceptChallenge" ? values : undefined;
    }
  };
}

assert.equal(CONCEPT_CHALLENGE_GROUPS.length, 3);
assert.equal(
  CONCEPT_CHALLENGE_GROUPS.reduce((total, group) => total + group.fields.length, 0),
  21
);

let groups = await prepareConceptChallenge(actorWithConcept());
assert.equal(groups.length, 3);
assert.equal(groups[0].fields[0].value, "");

groups = await prepareConceptChallenge(actorWithConcept({
  description: "A quiet observer",
  beacon: "My sister"
}), async (value) => `<p>${value}</p>`);
assert.equal(groups[0].fields[0].value, "A quiet observer");
assert.equal(groups[0].fields[0].enrichedValue, "<p>A quiet observer</p>");
assert.equal(groups[2].fields[0].value, "My sister");

const sheetSource = readFileSync(
  new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url),
  "utf8"
);

assert.match(
  sheetSource,
  /import \{ prepareConceptChallenge \} from "\.\.\/concept-challenge\.js";/
);
assert.match(
  sheetSource,
  /conceptChallenge: \{ template: `\$\{MODULE\}\/parts\/concept-challenge\.hbs` \}/
);
assert.match(sheetSource, /id: "conceptChallenge"/);
assert.match(sheetSource, /title: "WOD5E_MAGE\.Tabs\.ConceptChallenge"/);
assert.match(
  sheetSource,
  /context\.conceptChallenge = await prepareConceptChallenge\(actor\)/
);

// Ogni domanda è una tendina: aperta se ha un testo, e la scheda ricorda com'era.
const conceptTemplate = readFileSync(new URL("../templates/actor/parts/concept-challenge.hbs", import.meta.url), "utf8");
assert.match(conceptTemplate, /<details class="wod5e-mage-concept-field" data-field="\{\{field\.id\}\}"\{\{#if field\.value\}\} open\{\{\/if\}\}>[\s\S]*<summary>[\s\S]*field\.label[\s\S]*field\.prompt[\s\S]*<\/summary>[\s\S]*<prose-mirror/);
assert.match(sheetSource, /_conceptOpen/);

console.log("Concept Challenge tests passed.");
