import { MODULE_ID } from "./constants.js";
import { EFFETTI, FORMULE } from "./data/effetti.js";
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

/**
 * Un effetto si apre se la Sfera che lo porta basta. Le compagne «dirette»
 * (regola del ponte, 6/9) non chiudono la porta: senza, l'effetto riesce di
 * lato e sale di un grado. Le tavole vecchie (senza compagne) tengono ancora
 * l'obbligo delle Sfere in più.
 */
export function effectAvailable(entry, sphereLevels = {}) {
  if (level(sphereLevels[entry.sphere]) < entry.level) return false;
  if (entry.pairings?.length) return true;
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

/** Gli Ambiti consigliati, una frase per riga: si spezza dopo il punto, davanti a una maiuscola. */
export function splitScopes(scopes) {
  return String(scopes ?? "")
    .split(/(?<=\.)\s+(?=[A-ZÀ-Ý])/)
    .map((part) => part.trim())
    .filter(Boolean);
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
              // La Formula (o le Formule) del ramo B che l'effetto porta (6/9).
              formule: formuleLabels(entry),
              // Nel formato nuovo (con le compagne) l'obbligo sta nell'elenco:
              // in testa non si ripete.
              extras: (entry.pairings?.length ? [] : (entry.extras ?? [])).map((extra) => ({
                label: localize(`WOD5E_MAGE.Spheres.${extra.sphere}`),
                dots: "●".repeat(extra.level),
                required: extra.required
              })),
              // Il formato nuovo (6/9): le Sfere compagne con quel che aggiungono,
              // SOLO quelle che il personaggio ha (verdetto di Blue: vede come
              // l'effetto si espande con le sue Sfere), e gli Ambiti consigliati
              // una riga per Ambito.
              pairings: (entry.pairings ?? [])
                .filter((pairing) => level(sphereLevels[pairing.sphere]) > 0)
                .map((pairing) => ({
                  label: localize(`WOD5E_MAGE.Spheres.${pairing.sphere}`),
                  icon: `modules/${MODULE_ID}/assets/icons/sheet/${pairing.sphere}.png`,
                  text: pairing.text,
                  required: Boolean(pairing.required)
                })),
              // Le compagne dirette che il personaggio non ha: una riga sola,
              // «senza X: di lato, e Volgare».
              missing: (entry.pairings ?? [])
                .filter((pairing) => pairing.required && level(sphereLevels[pairing.sphere]) <= 0)
                .map((pairing) => localize(`WOD5E_MAGE.Spheres.${pairing.sphere}`)),
              scopes: splitScopes(entry.scopes ?? "")
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

/** I nomi delle Formule di un effetto, «Danneggiare · 3». */
export function formuleLabels(entry) {
  return (entry.formule ?? [])
    .map((id) => FORMULE.find((formula) => formula.id === id))
    .filter(Boolean)
    .map((formula) => `${formula.name} · ${formula.grade}`);
}

const STATUS_ORDER = Object.freeze({ open: 0, short: 1, absent: 2 });

/**
 * La vista «per Formula» (le Formule del ramo B come verbi universali, 6/9):
 * per grado, ogni Formula con la sua glossa e, Sfera per Sfera, gli effetti
 * che la portano. Si mostra una Formula se almeno una Sfera del personaggio
 * la tocca; le righe dicono se l'effetto è aperto, quanti pallini mancano,
 * o che la Sfera non c'è.
 */
export function prepareGrimorioFormule(sphereLevels = {}, localize = (key) => key) {
  const anySphere = SPHERES.some((sphere) => level(sphereLevels[sphere]) > 0);
  if (!anySphere) return [];
  return [1, 2, 3, 4, 5]
    .map((grade) => ({
      grade,
      dots: "●".repeat(grade),
      label: `${localize("WOD5E_MAGE.Grimorio.Grade")} ${grade}`,
      formule: FORMULE
        .filter((formula) => formula.grade === grade)
        .map((formula) => {
          const rows = SPHERES
            .flatMap((sphere) => EFFETTI
              .filter((entry) => entry.sphere === sphere && (entry.formule ?? []).includes(formula.id))
              .map((entry) => {
                const owned = level(sphereLevels[sphere]);
                const status = owned <= 0 ? "absent" : owned >= entry.level ? "open" : "short";
                const short = entry.level - owned;
                return {
                  id: entry.id,
                  name: entry.name,
                  level: entry.level,
                  dots: "●".repeat(entry.level),
                  sphere,
                  label: localize(`WOD5E_MAGE.Spheres.${sphere}`),
                  icon: `modules/${MODULE_ID}/assets/icons/sheet/${sphere}.png`,
                  subject: formula.subjects?.[sphere] ?? "",
                  status,
                  open: status === "open",
                  short: status === "short" ? short : 0,
                  statusText: status === "open"
                    ? localize("WOD5E_MAGE.Grimorio.OpenRow")
                    : status === "short"
                      ? localize(short === 1 ? "WOD5E_MAGE.Grimorio.ShortOne" : "WOD5E_MAGE.Grimorio.ShortMany").replace("{n}", String(short))
                      : localize("WOD5E_MAGE.Grimorio.Absent")
                };
              }))
            .sort((a, b) => (STATUS_ORDER[a.status] - STATUS_ORDER[b.status]) || (a.short - b.short) || (a.level - b.level) || a.label.localeCompare(b.label));
          return {
            id: formula.id,
            name: formula.name,
            grade: formula.grade,
            title: `${formula.name} · ${formula.grade}`,
            text: formula.text,
            rows,
            open: rows.some((row) => row.open),
            touched: rows.some((row) => row.status !== "absent")
          };
        })
        .filter((formula) => formula.touched)
    }))
    .filter((group) => group.formule.length);
}

export function findEffetto(id) {
  return EFFETTI.find((entry) => entry.id === id) ?? null;
}

/**
 * Apre il Grimorio e torna l'effetto scelto, o null. Con `onPick` la
 * finestra resta aperta: ogni nome cliccato passa da `onPick` e si segna
 * come preso (per aggiungere liste di effetti alla scheda).
 */
let lastView = "sphere";

export async function openGrimorio(sphereLevels, { onPick = null } = {}) {
  const localize = game.i18n.localize.bind(game.i18n);
  const content = await foundry.applications.handlebars.renderTemplate(
    `modules/${MODULE_ID}/templates/dialogs/grimorio.hbs`,
    { groups: prepareGrimorio(sphereLevels, localize), grades: prepareGrimorioFormule(sphereLevels, localize), view: lastView }
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
      // L'interruttore fra le due viste: per Sfera, per Formula.
      const showView = (view) => {
        lastView = view;
        root.querySelectorAll("[data-view-panel]").forEach((panel) => { panel.hidden = panel.dataset.viewPanel !== view; });
        root.querySelectorAll("[data-role=grimorioView]").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
      };
      root.querySelectorAll("[data-role=grimorioView]").forEach((button) => {
        button.addEventListener("click", (event) => { event.preventDefault(); showView(button.dataset.view); });
      });
      showView(lastView);
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
