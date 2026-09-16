import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { prepareSpecialties, specialtyBonus, specialtySkillChoices, specialtyCounts, specialtySlots, suggestionOptions, SPECIALTY_STEPS, SPECIALIZZAZIONI } from "../scripts/specializzazioni.js";
import { CHIAVI_VIVE } from "../scripts/abilita-essenziali.js";

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

// Nel riquadro delle Abilità (16/9): il + delle Abilità Specifiche nel
// titolo, le righe aggiunte sotto il titolo loro col nome che si scrive; le
// Specializzazioni nel cassetto al sorvolo, un posto vuoto le aggiunge con
// l'Abilità già scelta, la × le toglie; niente Tiri personalizzati.
const abilita = readFileSync(new URL("../templates/actor/parts/stat-abilita.hbs", import.meta.url), "utf8");
assert.doesNotMatch(abilita, /CustomRolls|customRolls/);
assert.match(abilita, /wod5e-mage-riq-title[\s\S]*data-action="customSkillAdd"[\s\S]*CustomSkills\.Label[\s\S]*data-key="custom:\{\{skill\.id\}\}"[\s\S]*flags\.wod5e-mage\.customSkills\.\{\{skill\.id\}\}\.name[\s\S]*flags\.wod5e-mage\.customSkills\.\{\{skill\.id\}\}\.value[\s\S]*data-action="customSkillDelete"/);
assert.match(abilita, /wod5e-mage-cassetto[\s\S]*data-action="tiroSpecialty" data-key="\{\{skill\.key\}\}" data-specialty="\{\{slot\.name\}\}"[\s\S]*data-action="specialtyDelete" data-skill="\{\{skill\.id\}\}" data-index="\{\{slot\.index\}\}"[\s\S]*data-action="specialtyAdd" data-skill="\{\{skill\.id\}\}"/);
const dialog = readFileSync(new URL("../templates/dialogs/specialty-add.hbs", import.meta.url), "utf8");
assert.match(dialog, /name="skill"[\s\S]*\{\{#if skill\.selected\}\}selected\{\{\/if\}\}[\s\S]*name="source"/);
const specScript = readFileSync(new URL("../scripts/specializzazioni.js", import.meta.url), "utf8");
assert.match(specScript, /const preset = String\(target\?\.dataset\?\.skill \?\? ""\)/);

// Il clic sulla Specializzazione tira l'Abilità col dado in più già dentro (4/9 notte): la via vecchia resta per chi la chiama.
const { compileMageTraitRoll } = await import("../scripts/mage-roll-selection.js");
const compiled = compileMageTraitRoll({
  dataset: { selectDialog: "true", skill: "academics", flatMod: "1", specialty: "Storia" },
  traits: { skills: [{ key: "skill:academics", id: "academics", type: "skill", label: "Accademiche", value: 3 }], attributes: [{ key: "attribute:intelligence", id: "intelligence", type: "attribute", category: "mental", label: "Intelligenza", value: 2 }] },
  primarySkillId: "academics",
  secondaryKey: "attribute:intelligence"
});
assert.equal(compiled.flatMod, 1);
assert.equal(compiled.label, "Accademiche + Intelligenza · Storia");
// Niente pannello dei modificatori nei tiri del Mago.
const css = readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8");
assert.match(css, /\.wod5e-mage-roll-dialog \.situational-modifiers \{\s*display: none;/);
assert.match(readFileSync(new URL("../scripts/mage-dice.js", import.meta.url), "utf8"), /classList\?\.add\("wod5e-mage", "mage", "wod5e-mage-roll-dialog"\)/);

console.log("Specializzazioni tests passed.");

// Le Specializzazioni si prendono a 1, 3 e 5 pallini (11/9, i focus di V6):
// una a 1, due a 3, tre a 5; la tendina mostra solo le Abilità con un posto libero.
assert.deepEqual([...SPECIALTY_STEPS], [1, 3, 5]);
assert.deepEqual([0, 1, 2, 3, 4, 5, 9].map(specialtySlots), [0, 1, 1, 2, 2, 3, 3]);
{
  const prepared = prepareSpecialties(actor);
  const used = specialtyCounts(prepared.rows);
  assert.deepEqual(used, { athletics: 1, occult: 2 });
  // Atletica 2 ha un posto e lo usa già; Occulto 3 ha due posti e li usa: nessuna scelta.
  assert.deepEqual(specialtySkillChoices(prepared.skills, used), []);
  // Senza Specializzazioni, tutte e due sono in tendina, con i posti.
  assert.deepEqual(specialtySkillChoices(prepared.skills).map((skill) => [skill.id, skill.used, skill.slots]), [["athletics", 0, 1], ["occult", 0, 2]]);
  // A zero pallini niente posto.
  assert.deepEqual(specialtySkillChoices([{ id: "brawl", label: "Mischia", value: 0 }]), []);
  assert.deepEqual(specialtySkillChoices([]), []);
}
// Il catalogo dei suggerimenti copre tutte le chiavi vive, una parola l'una.
assert.deepEqual(Object.keys(SPECIALIZZAZIONI).sort(), [...CHIAVI_VIVE].sort());
for (const [key, names] of Object.entries(SPECIALIZZAZIONI)) {
  for (const name of names) assert.doesNotMatch(name, /\s/, `${key}: ${name}`);
}
// In ordine alfabetico, filtrati da quel che si scrive (11/9: la tendina nativa era storta).
assert.equal(suggestionOptions("brawl"), '<li data-value="Disarmo">Disarmo</li><li data-value="Improvvisate">Improvvisate</li><li data-value="Lame">Lame</li><li data-value="Lotta">Lotta</li><li data-value="Mazze">Mazze</li><li data-value="Pugilato">Pugilato</li>');
assert.equal(suggestionOptions("brawl", "la"), '<li data-value="Lame">Lame</li>');
assert.equal(suggestionOptions("streetwise"), "");
{
  const dialog = readFileSync(new URL("../templates/dialogs/specialty-add.hbs", import.meta.url), "utf8");
  assert.doesNotMatch(dialog.replace(/\{\{!--[\s\S]*?--\}\}/g, ""), /<form/);
  assert.match(dialog, /\{\{#unless skills\.length\}\}disabled\{\{\/unless\}\}/);
  assert.match(dialog, /name="source"[^>]*autocomplete="off"[\s\S]*<ul class="wod5e-mage-suggest" data-role="suggest" hidden>/);
  assert.match(readFileSync(new URL("../scripts/specializzazioni.js", import.meta.url), "utf8"), /specialtySkillChoices\(prepared\.skills, specialtyCounts\(prepared\.rows\)\)/);
}
