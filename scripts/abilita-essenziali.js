/**
 * Le Abilità Essenziali — canone M6 del 2026-08-19, riformato l'11/9/2026.
 *
 * La lista di sistema (27 voci, tradotte da Vampiri 5e) diventa la fila unica
 * alfabetica delle quattordici voci del manuale: le tredici di Vampiri 6e più
 * il Velo (l'Occulto col nome di casa). Ogni voce vive su UNA chiave del
 * sistema, così tiri, specialità e macro continuano a funzionare; le tredici
 * chiavi assorbite spariscono dalla scheda ma restano nei dati dell'attore,
 * finché la conversione dei personaggi vivi non le travasa a mano.
 *
 * La corrispondenza (tavola «Dove va quello che muore» del canone):
 *   Rissa, Mischia                 → Mischia           (chiave: brawl)
 *   Armi da Fuoco                  → Mira   (chiave: firearms)
 *   Accademiche, Scienze, Finanza, Politica → Conoscenze (chiave: academics)
 *   Occulto, Creature (senza corpo) → Velo             (chiave: occult)
 *   Affinità Animale, Creature (con corpo) → Sopravvivenza (survival)
 *   Guidare                        → Atletica          (athletics)
 *   Intuito                        → Allerta           (awareness)
 *   Tecnologia                     → Manualità, Criminalità, Investigare, Conoscenze
 *   Espressività                   → Arte              (chiave: performance)
 *   Furtività                      → Sotterfugio       (subterfuge)
 *   Autorità, Galateo, Intimidire  → Convincere        (persuasion)
 *   Bassifondi                     → Investigare       (investigation)
 */

/** Le quattordici chiavi di sistema su cui vivono le voci del canone. */
export const CHIAVI_VIVE = Object.freeze([
  "awareness", // Allerta
  "performance", // Arte
  "athletics", // Atletica
  "academics", // Conoscenze
  "persuasion", // Convincere
  "larceny", // Criminalità
  "investigation", // Investigare
  "craft", // Manualità
  "medicine", // Medicina
  "firearms", // Mira (era «Armi a Distanza» per qualche ora dell'11/9: Blue ha scelto Mira)
  "brawl", // Mischia
  "survival", // Sopravvivenza
  "subterfuge", // Sotterfugio
  "occult" // Velo
]);

/** Le tredici chiavi assorbite: mai mostrate sulla scheda del Mago. */
export const CHIAVI_ASSORBITE = Object.freeze([
  "melee",
  "stealth",
  "etiquette",
  "intimidation",
  "leadership",
  "streetwise",
  "finance",
  "politics",
  "animalken",
  "drive",
  "insight",
  "science",
  "technology"
]);

/** Le cinque voci che cambiano nome rispetto all'etichetta di sistema. */
export const RINOMINATE = Object.freeze({
  brawl: "WOD5E_MAGE.Skills.Melee",
  firearms: "WOD5E_MAGE.Skills.Ranged",
  academics: "WOD5E_MAGE.Skills.Knowledge",
  occult: "WOD5E_MAGE.Skills.Veil",
  performance: "WOD5E_MAGE.Skills.Art"
});

/** Il tetto di ogni Abilità alla creazione (V6: nessuna voce oltre il terzo). */
export const TETTO_CREAZIONE = 3;

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
 * Le Abilità Essenziali per gruppo del sistema (Fisiche, Sociali, Mentali),
 * ognuno in ordine alfabetico: serve ai Tratti a colonne quando il giocatore
 * vuole l'ordine per gruppo (6/9).
 */
export function prepareEssentialSkillsByGroup(sortedSkills, { localize = (k) => k, lang = "it" } = {}) {
  const gruppi = {};
  for (const [gruppo, lista] of Object.entries(sortedSkills ?? {})) {
    gruppi[gruppo] = prepareEssentialSkillList({ [gruppo]: lista }, { localize, lang });
  }
  return gruppi;
}

/**
 * Gli Attributi in un ordine solo (6/9): «alpha» una fila alfabetica,
 * «group» i gruppi del sistema (Fisici, Sociali, Mentali) come sono.
 */
export function orderAttributes(sortedAttributes, { order = "alpha", lang = "it" } = {}) {
  if (order !== "alpha") return sortedAttributes ?? {};
  const tutti = Object.values(sortedAttributes ?? {}).flat().filter(Boolean);
  tutti.sort((a, b) => String(a.displayName ?? a.id).localeCompare(String(b.displayName ?? b.id), lang));
  return { tutti };
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

/** Le Abilità sopra il tetto della creazione, per il memo. */
export function skillsOverCap(skills, cap = TETTO_CREAZIONE) {
  return CHIAVI_VIVE.filter((key) => Math.trunc(Number(skills?.[key]?.value) || 0) > cap);
}
