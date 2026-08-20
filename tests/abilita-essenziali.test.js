import assert from "node:assert/strict";
import {
  CHIAVI_ASSORBITE,
  CHIAVI_VIVE,
  prepareEssentialSkills
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

// Le tre voci rinominate, tradotte come dal lang italiano del modulo.
const TRADUZIONI = {
  "WOD5E_MAGE.Skills.Combat": "Combattimento",
  "WOD5E_MAGE.Skills.Creatures": "Creature",
  "WOD5E_MAGE.Skills.Art": "Arte"
};

const sortedSkills = {};
for (const [tipo, ids] of Object.entries(TIPI)) {
  sortedSkills[tipo] = ids.map((id) => ({ id, displayName: ETICHETTE[id], value: 0 }));
}
// WIZ ha Armi da fuoco 3 e Criminalità 4: la voce morta sparisce, la viva resta.
sortedSkills.physical.find((s) => s.id === "firearms").value = 3;
sortedSkills.physical.find((s) => s.id === "larceny").value = 4;

const gruppi = prepareEssentialSkills(sortedSkills, {
  localize: (k) => TRADUZIONI[k] ?? k,
  lang: "it"
});

const voci = Object.values(gruppi).flat();

// Diciotto voci, sei per colonna, tre colonne.
assert.equal(voci.length, 18);
assert.deepEqual(Object.keys(gruppi), ["colonna1", "colonna2", "colonna3"]);
assert.deepEqual(Object.values(gruppi).map((c) => c.length), [6, 6, 6]);

// Tutte e sole le chiavi vive; nessuna assorbita.
assert.deepEqual(new Set(voci.map((v) => v.id)), new Set(CHIAVI_VIVE));
for (const morta of CHIAVI_ASSORBITE) {
  assert.ok(!voci.some((v) => v.id === morta), `${morta} doveva sparire`);
}

// La fila unica alfabetica del canone, colonna per colonna.
assert.deepEqual(voci.map((v) => v.displayName), [
  "Accademiche", "Allerta", "Arte", "Atletica", "Combattimento", "Convincere",
  "Creature", "Criminalità", "Guidare", "Intuito", "Investigare", "Manualità",
  "Medicina", "Occulto", "Scienze", "Sopravvivenza", "Sotterfugio", "Tecnologia"
]);

// Le rinominate restano sulle loro chiavi di sistema.
assert.equal(voci.find((v) => v.displayName === "Combattimento").id, "brawl");
assert.equal(voci.find((v) => v.displayName === "Creature").id, "animalken");
assert.equal(voci.find((v) => v.displayName === "Arte").id, "performance");

// I valori dell'attore passano intatti sulle voci vive.
assert.equal(voci.find((v) => v.id === "larceny").value, 4);

// L'input di partenza non viene toccato (il sistema lo riusa).
assert.equal(sortedSkills.physical.length, 9);
assert.equal(sortedSkills.social.find((s) => s.id === "performance").displayName, "Espressività");

console.log("abilita-essenziali.test.js: tutte le asserzioni superate");
