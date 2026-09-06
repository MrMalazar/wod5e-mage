import { MODULE_ID } from "./constants.js";
import { EFFETTI } from "./data/effetti.js";
import { SPHERES } from "./spheres.js";

/**
 * Il Grimorio (richiesta di Blue, 6/9/2026): gli effetti del manuale,
 * Sfera per Sfera e livello per livello, mostrati al giocatore solo se le
 * Sfere che ha li aprono (il livello della Sfera, e le Sfere in più che il
 * testo chiede). Dal tiro di Areté, il libro accanto all'Obiettivo lo apre;
 * la scelta scrive l'Obiettivo e accende i pallini delle Sfere coinvolte.
 * Gli Ambiti restano del giocatore: il manuale non li fissa per effetto.
 */

const LEVEL_LABELS = Object.freeze({
  1: "WOD5E_MAGE.Spheres.Influence.Perceive",
  2: "WOD5E_MAGE.Spheres.Influence.Touch",
  3: "WOD5E_MAGE.Spheres.Influence.Control",
  4: "WOD5E_MAGE.Spheres.Influence.Command",
  5: "WOD5E_MAGE.Spheres.Influence.Revolutionize"
});

function level(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

/** Un effetto si apre se la Sfera basta e le Sfere in più obbligatorie ci sono. */
export function effectAvailable(entry, sphereLevels = {}) {
  if (level(sphereLevels[entry.sphere]) < entry.level) return false;
  return (entry.extras ?? []).every((extra) => !extra.required || level(sphereLevels[extra.sphere]) >= extra.level);
}

/** Le Sfere che la scelta accende: la principale al suo livello, le obbligatorie al loro. */
export function effectSphereLevels(entry) {
  const levels = { [entry.sphere]: entry.level };
  for (const extra of entry.extras ?? []) {
    if (extra.required) levels[extra.sphere] = Math.max(levels[extra.sphere] ?? 0, extra.level);
  }
  return levels;
}

/** Il Grimorio del personaggio: per Sfera, per livello, solo quel che si apre. */
export function prepareGrimorio(sphereLevels = {}, localize = (key) => key) {
  return SPHERES
    .filter((sphere) => level(sphereLevels[sphere]) > 0)
    .map((sphere) => {
      const levels = [1, 2, 3, 4, 5]
        .filter((step) => step <= level(sphereLevels[sphere]))
        .map((step) => ({
          level: step,
          label: localize(LEVEL_LABELS[step]),
          dots: "●".repeat(step),
          entries: EFFETTI
            .filter((entry) => entry.sphere === sphere && entry.level === step && effectAvailable(entry, sphereLevels))
            .map((entry) => ({
              id: entry.id,
              name: entry.name,
              text: entry.text,
              extras: (entry.extras ?? []).map((extra) => ({
                label: localize(`WOD5E_MAGE.Spheres.${extra.sphere}`),
                dots: "●".repeat(extra.level),
                required: extra.required
              }))
            }))
        }))
        .filter((group) => group.entries.length);
      return {
        sphere,
        label: localize(`WOD5E_MAGE.Spheres.${sphere}`),
        icon: `modules/${MODULE_ID}/assets/icons/sheet/${sphere}.png`,
        levels
      };
    })
    .filter((group) => group.levels.length);
}

export function findEffetto(id) {
  return EFFETTI.find((entry) => entry.id === id) ?? null;
}

/**
 * Apre il Grimorio e torna l'effetto scelto, o null. Con `onPick` la
 * finestra resta aperta: ogni nome cliccato passa da `onPick` e si segna
 * come preso (per aggiungere liste di effetti alla scheda).
 */
export async function openGrimorio(sphereLevels, { onPick = null } = {}) {
  const localize = game.i18n.localize.bind(game.i18n);
  const content = await foundry.applications.handlebars.renderTemplate(
    `modules/${MODULE_ID}/templates/dialogs/grimorio.hbs`,
    { groups: prepareGrimorio(sphereLevels, localize) }
  );
  let chosen = null;
  await foundry.applications.api.DialogV2.wait({
    window: { title: localize("WOD5E_MAGE.Grimorio.Title") },
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-roll-dialog", "wod5e-mage-grimorio"],
    position: { width: 640 },
    content,
    buttons: [{ action: "close", icon: "fas fa-times", label: localize("WOD5E.Close"), default: true }],
    rejectClose: false,
    render: (_event, dialog) => {
      const root = dialog.element;
      const search = root.querySelector("[data-role=grimorioSearch]");
      search?.addEventListener("input", () => {
        const wanted = search.value.trim().toLowerCase();
        root.querySelectorAll(".wod5e-mage-grimorio-row").forEach((row) => {
          row.hidden = Boolean(wanted) && !row.textContent.toLowerCase().includes(wanted);
        });
      });
      root.addEventListener("click", async (event) => {
        const row = event.target.closest?.("[data-effetto]");
        if (!row) return;
        event.preventDefault();
        const entry = findEffetto(row.dataset.effetto);
        if (!entry) return;
        if (onPick) {
          if (row.classList.contains("taken")) return;
          await onPick(entry);
          row.classList.add("taken");
          return;
        }
        chosen = entry;
        dialog.close();
      });
    }
  }).catch(() => null);
  return chosen;
}
