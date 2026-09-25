import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { conSpecializzazione, nomiSpecializzazioni, prepareSpecialties, rigaSpecializzazioni, senzaSpecializzazione, specialtyBonus, specialtySlots, SPECIALTY_STEPS, SPECIALIZZAZIONI, SPECIALIZZAZIONI_PER_VOCE } from "../scripts/specializzazioni.js";
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
assert.deepEqual(nomiSpecializzazioni(actor), { athletics: ["Corsa"], occult: ["Rituali", "Spiriti"], melee: ["Lame"] });

// Il bonus è quello del sistema: +1, sul percorso dell'Abilità, sempre in mostra.
assert.deepEqual(specialtyBonus("occult", "  Serrature "), {
  source: "Serrature",
  value: 1,
  paths: ["skills.occult"],
  displayWhenInactive: true
});

// Nel riquadro delle Abilità (16/9; 26/9): il + delle Abilità Specifiche nel
// titolo, le righe aggiunte sotto il titolo loro col nome che si scrive; le
// Specializzazioni in riga sotto l'Abilità, pastiglie con la × e la casella
// che ne scrive una (niente finestra, niente tendina); niente Tiri personalizzati.
const abilita = readFileSync(new URL("../templates/actor/parts/stat-abilita.hbs", import.meta.url), "utf8");
assert.doesNotMatch(abilita, /CustomRolls|customRolls/);
assert.match(abilita, /wod5e-mage-riq-title[\s\S]*data-action="customSkillAdd"[\s\S]*CustomSkills\.Label[\s\S]*data-key="custom:\{\{skill\.id\}\}"[\s\S]*flags\.wod5e-mage\.customSkills\.\{\{skill\.id\}\}\.name[\s\S]*flags\.wod5e-mage\.customSkills\.\{\{skill\.id\}\}\.value[\s\S]*data-action="customSkillDelete"/);
assert.match(abilita, /con-specializzazioni[\s\S]*wod5e-mage-specializzazioni[\s\S]*data-action="tiroSpecialty" data-key="\{\{skill\.key\}\}" data-specialty="\{\{s\.name\}\}"[\s\S]*data-action="specialtyDelete" data-skill="\{\{skill\.id\}\}" data-index="\{\{s\.index\}\}"[\s\S]*<input type="text" class="wod5e-mage-pastiglia-scrivi" list="wod5e-mage-spec-\{\{@root\.actor\.id\}\}-\{\{skill\.id\}\}" data-specialty-add="\{\{skill\.id\}\}"[\s\S]*<datalist id="wod5e-mage-spec-\{\{@root\.actor\.id\}\}-\{\{skill\.id\}\}">/);
assert.doesNotMatch(abilita, /specialtyAdd|cassettoToggle|wod5e-mage-cassetto|wod5e-mage-abilita-tendina/);
assert.equal(existsSync(new URL("../templates/dialogs/specialty-add.hbs", import.meta.url)), false, "la finestra non c'è più");
const specScript = readFileSync(new URL("../scripts/specializzazioni.js", import.meta.url), "utf8");
assert.doesNotMatch(specScript, /DialogV2|onSpecialtyAdd|wireSuggestions/);
assert.match(specScript, /input\[data-specialty-add\]/);
assert.match(specScript, /event\.stopPropagation\(\)/);
const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheet, /wireSpecialtyInputs\(this\.element, this\.actor\)/);
assert.doesNotMatch(sheet, /specialtyAdd: onSpecialtyAdd/);

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
// La riga sotto l'Abilità va a capo, sulla scheda e nella guidata.
assert.match(css, /\.wod5e-mage-riga-abilita\.con-specializzazioni \{[^}]*flex-wrap: wrap;/s);
assert.match(css, /\.wod5e-mage-guidata-riga\.con-specializzazioni \{[^}]*flex-wrap: wrap;/s);

console.log("Specializzazioni tests passed.");

// Le Specializzazioni si prendono a 1, 3 e 5 pallini (11/9, i focus di V6):
// una a 1, due a 3, tre a 5.
assert.deepEqual([...SPECIALTY_STEPS], [1, 3, 5]);
assert.deepEqual([0, 1, 2, 3, 4, 5, 9].map(specialtySlots), [0, 1, 1, 2, 2, 3, 3]);

// La riga (26/9): le scritte con l'indice, i posti liberi, i suggerimenti in ordine, quella nel tiro.
{
  const riga = rigaSpecializzazioni("occult", 3, ["Rituali", "Spiriti"], { chosen: "Spiriti" });
  assert.deepEqual([riga.slots, riga.free, riga.chosen], [2, 0, "Spiriti"]);
  assert.deepEqual(riga.scritte, [{ index: 0, name: "Rituali", chosen: false }, { index: 1, name: "Spiriti", chosen: true }]);
  assert.deepEqual(riga.suggestions, ["Cosmologia", "Esterni", "Fatati", "Licantropi", "Risvegliati", "Vampiri"]);
  assert.deepEqual([rigaSpecializzazioni("brawl", 0).slots, rigaSpecializzazioni("brawl", 0).free, rigaSpecializzazioni("brawl", 1).free, rigaSpecializzazioni("brawl", 5, ["Lame"]).free], [0, 0, 1, 2]);
  assert.deepEqual(rigaSpecializzazioni("streetwise", 2).suggestions, []);
  // Con l'Abilità scesa sotto le Specializzazioni scritte, restano tutte e i posti liberi sono zero.
  assert.deepEqual([rigaSpecializzazioni("occult", 1, ["Rituali", "Spiriti"]).scritte.length, rigaSpecializzazioni("occult", 1, ["Rituali", "Spiriti"]).free], [2, 0]);
}

// La scrittura: il nome pulito in coda; niente vuoti, doppioni o posti oltre i pallini.
{
  const bonuses = actor.system.skills.athletics.bonuses;
  const ok = conSpecializzazione(bonuses, "athletics", 3, "  Nuoto ");
  assert.deepEqual([ok.ok, ok.motivo, ok.bonuses.length, ok.bonuses[1]], [true, "", 2, specialtyBonus("athletics", "Nuoto")]);
  assert.deepEqual([conSpecializzazione(bonuses, "athletics", 3, "  ").motivo, conSpecializzazione(bonuses, "athletics", 3, "corsa").motivo, conSpecializzazione(bonuses, "athletics", 2, "Nuoto").motivo], ["vuoto", "doppione", "pieno"]);
  assert.equal(conSpecializzazione(bonuses, "athletics", 2, "Nuoto").bonuses.length, 1, "com'erano");
  assert.deepEqual(conSpecializzazione(undefined, "brawl", 1, "Lame").bonuses, [specialtyBonus("brawl", "Lame")]);
  assert.deepEqual(senzaSpecializzazione(actor.system.skills.occult.bonuses, 0).map((b) => b.source), ["Spiriti"]);
  assert.deepEqual(senzaSpecializzazione(actor.system.skills.occult.bonuses, 5).map((b) => b.source), ["Rituali", "Spiriti"]);
  assert.deepEqual(senzaSpecializzazione(actor.system.skills.occult.bonuses, "x").length, 2);
}

// Il catalogo dei suggerimenti copre tutte le chiavi vive, sei per voce (16/9), una parola l'una, senza doppioni.
assert.deepEqual(Object.keys(SPECIALIZZAZIONI).sort(), [...CHIAVI_VIVE].sort());
assert.equal(SPECIALIZZAZIONI_PER_VOCE, 6);
for (const [key, names] of Object.entries(SPECIALIZZAZIONI)) {
  assert.equal(names.length, SPECIALIZZAZIONI_PER_VOCE, `${key}: ${names.length}`);
  assert.equal(new Set(names).size, names.length, `${key}: doppioni`);
  for (const name of names) assert.doesNotMatch(name, /\s/, `${key}: ${name}`);
}
// Le fette uscite il 16/9 non tornano.
for (const morta of ["Deduzione", "Selva", "Fondo", "Lancio", "Aure", "Disarmo", "Veleni", "Raffica"]) {
  assert.ok(!Object.values(SPECIALIZZAZIONI).some((names) => names.includes(morta)), morta);
}

// La creazione guidata (26/9): il passo Abilità porta le Specializzazioni, con la stessa casella.
{
  const guidata = readFileSync(new URL("../templates/guidata/passi/abilita.hbs", import.meta.url), "utf8");
  assert.match(guidata, /con-specializzazioni[\s\S]*wod5e-mage-guidata-specializzazioni[\s\S]*data-action="specialtyTogli" data-skill="\{\{skill\.id\}\}" data-index="\{\{s\.index\}\}"[\s\S]*class="wod5e-mage-guidata-pastiglia-scrivi" list="wod5e-mage-spec-guidata-\{\{skill\.id\}\}" data-specialty-add="\{\{skill\.id\}\}"/);
  const finestra = readFileSync(new URL("../scripts/creazione-guidata-finestra.js", import.meta.url), "utf8");
  assert.match(finestra, /specialtyTogli: CreazioneGuidata\.#onSpecialtyTogli/);
  assert.match(finestra, /if \(this\.canEdit\) wireSpecialtyInputs\(this\.element, this\.actor\)/);
  const it = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8")).WOD5E_MAGE.Specialties;
  const en = JSON.parse(readFileSync(new URL("../lang/en.json", import.meta.url), "utf8")).WOD5E_MAGE.Specialties;
  for (const key of ["Remove", "Scrivi", "ScriviHint", "Doppione", "Full"]) assert.ok(it[key] && en[key], key);
  assert.equal(it.Add, undefined, "la finestra non c'è più: niente Aggiungi");
}
console.log("Specializzazioni in riga (26/9): ok");

// La freccetta della riga (Blue, 26/9 sera: «un compromesso tra prima e dopo»):
// apre e chiude la riga delle Specializzazioni con una classe, la scheda
// ricorda com'era e il render dopo la rimette com'era.
{
  const { onSpecialtyToggle, riapriSpecializzazioni } = await import("../scripts/specializzazioni.js");
  const riga = (skill, aperta = false) => {
    const el = { dataset: { skill }, classes: new Set(aperta ? ["aperta"] : []), tasto: { attrs: {} } };
    el.classList = { toggle: (c, on) => { const next = on ?? !el.classes.has(c); next ? el.classes.add(c) : el.classes.delete(c); return next; }, contains: (c) => el.classes.has(c) };
    el.tasto.setAttribute = (k, v) => { el.tasto.attrs[k] = v; };
    el.tasto.closest = () => el;
    el.querySelector = (selector) => (selector === "[data-action=specialtyToggle]" ? el.tasto : null);
    return el;
  };
  const velo = riga("occult", true), atletica = riga("athletics");
  const righe = [velo, atletica];
  const sheet = { element: { querySelectorAll: () => righe } };
  onSpecialtyToggle.call(sheet, { preventDefault() {} }, velo.tasto);
  assert.deepEqual([velo.classes.has("aperta"), velo.tasto.attrs["aria-expanded"], sheet._specializzazioniAperte], [false, "false", { occult: false }]);
  onSpecialtyToggle.call(sheet, { preventDefault() {} }, atletica.tasto);
  assert.deepEqual([atletica.classes.has("aperta"), sheet._specializzazioniAperte], [true, { occult: false, athletics: true }]);
  // Dopo il render le righe tornano come le ha lasciate il giocatore (Velo chiusa anche se nasce aperta).
  const dopo = [riga("occult", true), riga("athletics"), riga("brawl")];
  riapriSpecializzazioni({ ...sheet, element: { querySelectorAll: () => dopo } });
  assert.deepEqual(dopo.map((el) => el.classes.has("aperta")), [false, true, false]);
  assert.deepEqual([dopo[0].tasto.attrs["aria-expanded"], dopo[1].tasto.attrs["aria-expanded"], dopo[2].tasto.attrs["aria-expanded"]], ["false", "true", undefined]);
  riapriSpecializzazioni({});
  onSpecialtyToggle.call(sheet, { preventDefault() {} }, { closest: () => null });
}
console.log("freccetta delle Specializzazioni: ok");
