/**
 * Le Abilità Essenziali — canone M6 del 2026-08-19.
 *
 * La lista di sistema (27 voci, tradotte da Vampiri 5e) diventa la fila unica
 * alfabetica delle diciotto voci del manuale. Ogni voce vive su UNA chiave del
 * sistema, così tiri, specialità e macro continuano a funzionare; le nove
 * chiavi assorbite spariscono dalla scheda ma restano nei dati dell'attore,
 * finché la conversione dei personaggi vivi non le travasa a mano.
 *
 * La corrispondenza (tavola «Dove va quello che muore» del canone):
 *   Armi da Fuoco, Mischia, Rissa  → Combattimento (chiave: brawl)
 *   Affinità Animale               → Creature      (chiave: animalken)
 *   Espressività                   → Arte          (chiave: performance)
 *   Furtività                      → Criminalità   (larceny, già viva)
 *   Autorità, Galateo, Intimidire  → Convincere    (persuasion, già viva)
 *   Bassifondi                     → Sopravvivenza (survival, già viva)
 *   Finanza, Politica              → Accademiche   (academics, già viva)
 */

/** Le diciotto chiavi di sistema su cui vivono le voci del canone. */
export const CHIAVI_VIVE = Object.freeze([
  "academics", // Accademiche
  "awareness", // Allerta
  "performance", // Arte
  "athletics", // Atletica
  "brawl", // Combattimento
  "persuasion", // Convincere
  "animalken", // Creature
  "larceny", // Criminalità
  "drive", // Guidare
  "insight", // Intuito
  "investigation", // Investigare
  "craft", // Manualità
  "medicine", // Medicina
  "occult", // Occulto
  "science", // Scienze
  "survival", // Sopravvivenza
  "subterfuge", // Sotterfugio
  "technology" // Tecnologia
]);

/** Le nove chiavi assorbite: mai mostrate sulla scheda del Mago. */
export const CHIAVI_ASSORBITE = Object.freeze([
  "firearms",
  "melee",
  "stealth",
  "etiquette",
  "intimidation",
  "leadership",
  "streetwise",
  "finance",
  "politics"
]);

/** Le tre voci che cambiano nome rispetto all'etichetta di sistema. */
export const RINOMINATE = Object.freeze({
  brawl: "WOD5E_MAGE.Skills.Combat",
  animalken: "WOD5E_MAGE.Skills.Creatures",
  performance: "WOD5E_MAGE.Skills.Art"
});

const VIVE = new Set(CHIAVI_VIVE);

/**
 * Restituisce la fila alfabetica delle sole Abilità Essenziali.
 * Questa è la fonte unica usata sia dalla scheda sia dalle finestre di tiro,
 * così le vecchie abilità assorbite non possono ricomparire nei selettori.
 */
export function prepareEssentialSkillList(sortedSkills, { localize = (k) => k, lang = "it" } = {}) {
  const voci = Object.values(sortedSkills ?? {})
    .flat()
    .filter((skill) => skill && VIVE.has(skill.id))
    .map((skill) =>
      RINOMINATE[skill.id]
        ? { ...skill, displayName: localize(RINOMINATE[skill.id]) }
        : skill
    );

  voci.sort((a, b) =>
    String(a.displayName ?? a.id).localeCompare(String(b.displayName ?? b.id), lang)
  );

  return voci;
}

/**
 * Riscrive il `sortedSkills` del sistema nella fila unica alfabetica del
 * canone, distribuita in colonne per il template di sistema (che disegna
 * una colonna per ogni gruppo).
 *
 * @param {object} sortedSkills - i gruppi del sistema ({physical, social, mental}).
 * @param {object} [opzioni]
 * @param {(key: string) => string} [opzioni.localize] - il localize di i18n.
 * @param {string} [opzioni.lang] - la lingua per l'ordinamento alfabetico.
 * @param {number} [opzioni.colonne] - quante colonne disegna il template.
 * @returns {object} i nuovi gruppi, `colonna1..N`, in ordine alfabetico.
 */
export function prepareEssentialSkills(sortedSkills, { localize = (k) => k, lang = "it", colonne = 3 } = {}) {
  const voci = prepareEssentialSkillList(sortedSkills, { localize, lang });

  const perColonna = Math.max(1, Math.ceil(voci.length / colonne));
  const gruppi = {};
  for (let i = 0; i < colonne; i++) {
    gruppi[`colonna${i + 1}`] = voci.slice(i * perColonna, (i + 1) * perColonna);
  }

  return gruppi;
}
