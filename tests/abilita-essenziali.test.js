import assert from "node:assert/strict";
import {
  CHIAVI_ASSORBITE,
  CHIAVI_VIVE,
  nextEssentialSkillValue,
  prepareEssentialSkills,
  prepareEssentialSkillsByGroup,
  orderAttributes,
  skillsOverCap,
  TETTO_CREAZIONE
} from "../scripts/abilita-essenziali.js";

// Le etichette italiane del sistema, come arrivano da initializeLabels.
const ETICHETTE = {
  athletics: "Atletica", brawl: "Rissa", craft: "Manualità", drive: "Guidare",
  firearms: "Armi da fuoco", larceny: "Criminalità", melee: "Mischia",
  stealth: "Furtività", survival: "Sopravvivenza",
  animalken: "Affinità animale", etiquette: "Galateo", insight: "Intuito",
  intimidation: "Intimidire", leadership: "Autorità", performance: "Espressività",
  persuasion: "Convincere", streetwise: "Bassifondi", subterfuge: "Sotterfugio",
  academics: "Accademiche", awareness: "Allerta", finance: "Finanza",
  investigation: "Investigare", medicine: "Medicina", occult: "Occulto",
  politics: "Politica", science: "Scienze", technology: "Tecnologia"
};

const TIPI = {
  physical: ["athletics", "brawl", "craft", "drive", "firearms", "larceny", "melee", "stealth", "survival"],
  social: ["animalken", "etiquette", "insight", "intimidation", "leadership", "performance", "persuasion", "streetwise", "subterfuge"],
  mental: ["academics", "awareness", "finance", "investigation", "medicine", "occult", "politics", "science", "technology"]
};

// Le cinque voci rinominate, tradotte come dal lang italiano del modulo.
const TRADUZIONI = {
  "WOD5E_MAGE.Skills.Melee": "Mischia",
  "WOD5E_MAGE.Skills.Ranged": "Mira",
  "WOD5E_MAGE.Skills.Knowledge": "Conoscenze",
  "WOD5E_MAGE.Skills.Veil": "Velo",
  "WOD5E_MAGE.Skills.Art": "Arte"
};

const sortedSkills = {};
for (const [tipo, ids] of Object.entries(TIPI)) {
  sortedSkills[tipo] = ids.map((id) => ({ id, displayName: ETICHETTE[id], value: 0 }));
}
// WIZ ha Furtività 3 e Criminalità 4: la voce morta sparisce, la viva resta.
sortedSkills.physical.find((s) => s.id === "stealth").value = 3;
sortedSkills.physical.find((s) => s.id === "larceny").value = 4;

const gruppi = prepareEssentialSkills(sortedSkills, {
  localize: (k) => TRADUZIONI[k] ?? k,
  lang: "it"
});

const voci = Object.values(gruppi).flat();

// Quattordici voci (11/9: le tredici di V6 più il Velo), tre colonne da cinque, cinque e quattro.
assert.equal(voci.length, 14);
assert.deepEqual(Object.keys(gruppi), ["colonna1", "colonna2", "colonna3"]);
assert.deepEqual(Object.values(gruppi).map((c) => c.length), [5, 5, 4]);

// Tutte e sole le chiavi vive; nessuna assorbita.
assert.deepEqual(new Set(voci.map((v) => v.id)), new Set(CHIAVI_VIVE));
for (const morta of CHIAVI_ASSORBITE) {
  assert.ok(!voci.some((v) => v.id === morta), `${morta} doveva sparire`);
}

// La fila unica alfabetica del canone, colonna per colonna.
assert.deepEqual(voci.map((v) => v.displayName), [
  "Allerta", "Arte", "Atletica", "Conoscenze", "Convincere",
  "Criminalità", "Investigare", "Manualità", "Medicina", "Mira",
  "Mischia", "Sopravvivenza", "Sotterfugio", "Velo"
]);

// Le rinominate restano sulle loro chiavi di sistema.
assert.equal(voci.find((v) => v.displayName === "Mischia").id, "brawl");
assert.equal(voci.find((v) => v.displayName === "Mira").id, "firearms");
assert.equal(voci.find((v) => v.displayName === "Conoscenze").id, "academics");
assert.equal(voci.find((v) => v.displayName === "Velo").id, "occult");
assert.equal(voci.find((v) => v.displayName === "Arte").id, "performance");

// Le voci morte dell'11/9 non ci sono più: Guidare, Intuito, Creature, Scienze, Tecnologia.
for (const morta of ["drive", "insight", "animalken", "science", "technology"]) {
  assert.ok(CHIAVI_ASSORBITE.includes(morta), `${morta} dev'essere assorbita`);
}
assert.equal(CHIAVI_VIVE.length + CHIAVI_ASSORBITE.length, 27);

// Il tetto della creazione: tre pallini (V6).
assert.equal(TETTO_CREAZIONE, 3);
assert.deepEqual(skillsOverCap({ brawl: { value: 4 }, occult: { value: 3 }, melee: { value: 5 } }), ["brawl"]);

// Il primo pallino può essere spento tornando a zero; gli altri continuano
// a impostare normalmente il valore scelto.
assert.equal(nextEssentialSkillValue(0, 0), 1);
assert.equal(nextEssentialSkillValue(1, 0), 0);
assert.equal(nextEssentialSkillValue(1, 1), 2);
assert.equal(nextEssentialSkillValue(3, 0), 1);
assert.equal(nextEssentialSkillValue(3, 4), 5);

// I valori dell'attore passano intatti sulle voci vive.
assert.equal(voci.find((v) => v.id === "larceny").value, 4);

// L'input di partenza non viene toccato (il sistema lo riusa).
assert.equal(sortedSkills.physical.length, 9);
assert.equal(sortedSkills.social.find((s) => s.id === "performance").displayName, "Espressività");

console.log("abilita-essenziali.test.js: tutte le asserzioni superate");

// I Tratti a colonne (6/9): per gruppo (Fisici, Sociali, Mentali, ognuno
// alfabetico) o una fila alfabetica sola.
const perGruppo = prepareEssentialSkillsByGroup(sortedSkills, { localize: (k) => k, lang: "it" });
assert.deepEqual(Object.keys(perGruppo), Object.keys(sortedSkills));
for (const [gruppo, lista] of Object.entries(perGruppo)) {
  const nomi = lista.map((s) => String(s.displayName ?? s.id));
  assert.deepEqual(nomi, [...nomi].sort((a, b) => a.localeCompare(b, "it")), gruppo);
}
const attributi = { physical: [{ id: "strength", displayName: "Forza" }, { id: "dexterity", displayName: "Destrezza" }], social: [{ id: "charisma", displayName: "Carisma" }], mental: [{ id: "wits", displayName: "Prontezza" }] };
assert.deepEqual(orderAttributes(attributi, { order: "alpha", lang: "it" }).tutti.map((a) => a.displayName), ["Carisma", "Destrezza", "Forza", "Prontezza"]);
assert.deepEqual(Object.keys(orderAttributes(attributi, { order: "group" })), ["physical", "social", "mental"]);
