import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { prepareSpecialties, specialtyBonus } from "../scripts/specializzazioni.js";

const actor = {
  system: {
    sortedSkills: {
      physical: [
        { id: "athletics", displayName: "Atletica", value: 2 },
        { id: "melee", displayName: "Mischia", value: 1 }
      ],
      mental: [{ id: "occult", displayName: "Occulto", value: 3 }]
    },
    skills: {
      athletics: { value: 2, bonuses: [{ source: "Corsa", value: 1, paths: ["skills.athletics"] }] },
      occult: {
        value: 3,
        bonuses: [
          { source: "Rituali", value: 1, paths: ["skills.occult"] },
          { source: "Spiriti", value: 1, paths: ["skills.occult"] }
        ]
      },
      melee: { value: 1, bonuses: [{ source: "Lame", value: 1 }] }
    }
  }
};

// Le righe: solo le Abilità essenziali, in ordine alfabetico, ognuna con
// le sue specializzazioni e l'indice per toglierle.
const { rows, skills } = prepareSpecialties(actor);
assert.deepEqual(skills.map((skill) => skill.id), ["athletics", "occult"]);
assert.deepEqual(
  rows.map((row) => [row.skill, row.index, row.source]),
  [["athletics", 0, "Corsa"], ["occult", 0, "Rituali"], ["occult", 1, "Spiriti"]]
);
assert.equal(rows[0].skillLabel, "Atletica");

// Il bonus è quello del sistema: +1, sul percorso dell'Abilità, sempre in mostra.
assert.deepEqual(specialtyBonus("occult", "  Serrature "), {
  source: "Serrature",
  value: 1,
  paths: ["skills.occult"],
  displayWhenInactive: true
});

// Nei Tratti: Condizioni accanto agli Attributi, Specializzazioni accanto
// alle Abilità, Bonus accanto alla Ruota; niente Tiri personalizzati.
const tratti = readFileSync(new URL("../templates/actor/parts/tratti.hbs", import.meta.url), "utf8");
assert.match(tratti, /wod5e-mage-tratti-attributes[\s\S]*wod5e-mage-tratti-conditions[\s\S]*wod5e-mage-tratti-skills[\s\S]*wod5e-mage-tratti-specialties[\s\S]*specializzazioni\.hbs[\s\S]*wod5e-mage-tratti-ruota[\s\S]*wod5e-mage-tratti-bonus[\s\S]*bonuses\.hbs/);
assert.doesNotMatch(tratti, /CustomRolls|customRolls/);
// Il + delle Abilità Specifiche sta nell'intestazione delle Abilità, e le
// righe aggiunte stanno sotto il titolo loro.
assert.match(tratti, /wod5e-mage-skills-header[\s\S]*data-action="customSkillAdd"[\s\S]*CustomSkills\.Label[\s\S]*data-custom-skill="\{\{skill\.id\}\}"[\s\S]*flags\.wod5e-mage\.customSkills\.\{\{skill\.id\}\}\.value[\s\S]*data-action="customSkillDelete"/);
const panel = readFileSync(new URL("../templates/actor/parts/specializzazioni.hbs", import.meta.url), "utf8");
assert.match(panel, /data-action="specialtyAdd"[\s\S]*data-action="editSkill"[\s\S]*data-action="specialtyDelete"/);
const dialog = readFileSync(new URL("../templates/dialogs/specialty-add.hbs", import.meta.url), "utf8");
assert.match(dialog, /name="skill"[\s\S]*name="source"/);

console.log("Specializzazioni tests passed.");
