import { MODULE_ID } from "./constants.js";
import { EFFETTI, FORMULE } from "./data/effetti.js";
import { FORMULE_ALIAS, FORMULE_M6 } from "./data/formule.js";
import { POTERI } from "./data/poteri.js";
import { SCOPES } from "./scopes.js";
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
 * L'accesso a un Dominio (Blue, 25/9: «quando hai accesso a un dominio puoi
 * fare magick su quel dominio, non serve avere un livello di sfera»): una
 * Sfera è del personaggio se sta fra le sue, anche a livello 0; il livello
 * resta un promemoria. Le tavole vecchie degli effetti restano a livelli.
 */
function accessed(sphereLevels, sphere) {
  return Boolean(sphereLevels) && Object.hasOwn(sphereLevels, sphere) && sphereLevels[sphere] !== null && sphereLevels[sphere] !== undefined && sphereLevels[sphere] !== false;
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
                  // Il livello della compagna, quando il blocco lo scrive («+ Vita ●●●», 7/9).
                  dots: (pairing.level ?? 1) > 1 ? "●".repeat(pairing.level) : "",
                  required: Boolean(pairing.required)
                })),
              // Le compagne dirette che il personaggio non ha: una riga sola,
              // «senza X: di lato, e Volgare».
              missing: (entry.pairings ?? [])
                .filter((pairing) => pairing.required && pairing.sphere !== "prime" && level(sphereLevels[pairing.sphere]) < (pairing.level ?? 1))
                .map((pairing) => `${localize(`WOD5E_MAGE.Spheres.${pairing.sphere}`)}${(pairing.level ?? 1) > 1 ? ` ${"●".repeat(pairing.level)}` : ""}`),
              // Il Primordio senza Primordio (verdetto di Blue, 7/9): l'effetto
              // si fa lo stesso, pagando in Quintessenza. Una riga sotto ogni
              // effetto che chiede il Primordio come compagna.
              missingPrime: (entry.pairings ?? []).some((pairing) => pairing.sphere === "prime") && level(sphereLevels.prime) <= 0,
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

/** La matrice di oggi per una Formula di ieri: l'id fuso o cambiato, poi la voce. */
export function findFormula(id) {
  const key = FORMULE_ALIAS[id] ?? id;
  return FORMULE_M6.find((formula) => formula.id === key) ?? null;
}

/** I nomi delle matrici di un effetto: «Danneggiare», «Accelerare e Rallentare» (senza grado dal 24/9). */
export function formuleLabels(entry) {
  const names = (entry.formule ?? [])
    .map((id) => findFormula(id)?.name ?? FORMULE.find((formula) => formula.id === id)?.name ?? "")
    .filter(Boolean);
  return names.filter((name, index) => names.indexOf(name) === index);
}

/**
 * La vista «per Formula» (24/9): le 48 matrici del formato di Blue, in
 * ordine alfabetico e senza gradi. Ogni matrice porta le Sfere d'Accesso
 * (accese se il personaggio le ha), le Amalgame, la Descrizione con una riga
 * per Sfera, il Limite, la soglia base come Ambiti, «In genere» e i poteri
 * legati. Si apre se almeno una Sfera d'Accesso è del personaggio; senza,
 * la matrice si legge e basta.
 */
function sphereRef(sphere, sphereLevels, localize) {
  return {
    id: sphere,
    label: localize(`WOD5E_MAGE.Spheres.${sphere}`),
    icon: `modules/${MODULE_ID}/assets/icons/sheet/${sphere}.png`,
    owned: accessed(sphereLevels, sphere),
    level: level(sphereLevels[sphere])
  };
}

/** Le righe «Sfera: testo» della Descrizione; la chiave «forces+prime» vale per le Sfere insieme. */
export function formulaSphereRows(formula, sphereLevels = {}, localize = (key) => key) {
  return Object.entries(formula.bySphere ?? {}).map(([key, text]) => {
    const ids = key.split("+").filter((id) => SPHERES.includes(id));
    return {
      key,
      spheres: ids.map((id) => sphereRef(id, sphereLevels, localize)),
      label: ids.map((id) => localize(`WOD5E_MAGE.Spheres.${id}`)).join(" + "),
      owned: ids.length > 0 && ids.every((id) => accessed(sphereLevels, id)),
      text
    };
  });
}

/** La soglia base letta: «4 (Durata 1, Impatto 3)», gli Ambiti nell'ordine in cui Blue li scrive, con le etichette nella lingua in uso. */
export function formulaThresholds(formula, localize = (key) => key) {
  return (formula.thresholds ?? []).map((threshold) => {
    const scopes = Object.keys(threshold.scopes ?? {})
      .filter((scope) => SCOPES.includes(scope) && level(threshold.scopes[scope]) > 0)
      .map((scope) => ({ id: scope, label: localize(`WOD5E_MAGE.Scopes.${scope}`), level: level(threshold.scopes[scope]) }));
    return {
      base: threshold.base,
      scopes,
      text: `${threshold.base} (${scopes.map((scope) => `${scope.label} ${scope.level}`).join(", ")})`
    };
  });
}

/** I poteri legati a una matrice, dal catalogo: nome, Sfere, segno del legame. */
export function formulaPowers(formula) {
  return (formula.powers ?? [])
    .map((id) => POTERI.find((power) => power.id === id))
    .filter(Boolean)
    .map((power) => ({ id: power.id, name: power.name, link: power.link, proposal: power.link === "proposta", spheres: power.spheres }));
}

export function prepareMatrice(formula, sphereLevels = {}, localize = (key) => key) {
  const access = formula.access.map((sphere) => sphereRef(sphere, sphereLevels, localize));
  const amalgams = formula.amalgams.map((sphere) => sphereRef(sphere, sphereLevels, localize));
  // L'Amalgama si sceglie fra le Sfere che il personaggio ha: quelle scritte
  // nella matrice, o, se la matrice non ne scrive, qualunque sua Sfera fuori
  // dall'Accesso («a fantasia del giocatore»).
  const amalgamChoices = (formula.amalgams.length ? formula.amalgams : SPHERES.filter((sphere) => !formula.access.includes(sphere)))
    .filter((sphere) => accessed(sphereLevels, sphere))
    .map((sphere) => sphereRef(sphere, sphereLevels, localize));
  const accessOwned = access.filter((sphere) => sphere.owned)
    // Con una Sfera d'Accesso sola la scelta è già fatta; il nome del gruppo di
    // radio porta l'id della matrice (i partial non vedono il contesto sopra).
    .map((sphere, index, all) => ({ ...sphere, formulaId: formula.id, checked: all.length === 1 && index === 0 }));
  return {
    id: formula.id,
    name: formula.name,
    intro: formula.intro,
    rows: formulaSphereRows(formula, sphereLevels, localize),
    coda: formula.coda,
    limit: formula.limit,
    use: formula.use,
    thresholds: formulaThresholds(formula, localize).map((threshold) => ({ ...threshold, formulaId: formula.id })),
    thresholdText: formula.thresholdText,
    access,
    accessOwned,
    amalgams,
    amalgamsFree: formula.amalgams.length === 0,
    amalgamsNote: formula.amalgamsNote ?? "",
    amalgamChoices,
    open: access.some((sphere) => sphere.owned),
    powers: formulaPowers(formula),
    byBlue: Boolean(formula.byBlue)
  };
}

export function prepareGrimorioFormule(sphereLevels = {}, localize = (key) => key) {
  return [...FORMULE_M6]
    .sort((a, b) => a.name.localeCompare(b.name, "it"))
    .map((formula) => prepareMatrice(formula, sphereLevels, localize));
}

/**
 * La scelta di una matrice dal Grimorio: la Sfera d'Accesso (una delle
 * possedute), le Amalgame (zero o più, possedute), gli Ambiti della soglia
 * base. Torna null se la Sfera d'Accesso non apre la Formula o non è del
 * personaggio.
 */
export function formulaPick(formula, { access, amalgams = [], threshold = 0, sphereLevels = {} } = {}) {
  if (!formula || !formula.access.includes(access) || !accessed(sphereLevels, access)) return null;
  // Le Amalgame ammesse: quelle scritte nella matrice; se non ne scrive, qualunque Sfera fuori dall'Accesso.
  const allowed = formula.amalgams?.length ? formula.amalgams : SPHERES.filter((sphere) => !formula.access.includes(sphere));
  const chosen = (amalgams ?? []).filter((sphere) => allowed.includes(sphere) && sphere !== access && accessed(sphereLevels, sphere));
  const soglia = formula.thresholds?.[Math.min(Math.max(threshold, 0), (formula.thresholds?.length ?? 1) - 1)] ?? { base: 0, scopes: {} };
  const spheres = { [access]: level(sphereLevels[access]) };
  for (const sphere of chosen) spheres[sphere] = level(sphereLevels[sphere]);
  return { formula, access, amalgams: chosen, spheres, scopes: { ...soglia.scopes }, threshold: soglia.base };
}

export function findEffetto(id) {
  return EFFETTI.find((entry) => entry.id === id) ?? null;
}

/**
 * Apre il Grimorio e torna l'effetto scelto, o null. Con `onPick` la
 * finestra resta aperta: ogni nome cliccato passa da `onPick` e si segna
 * come preso (per aggiungere liste di effetti alla scheda).
 */
// Si apre per Formula (verdetto di Blue, 10/9); poi si ricorda l'ultima vista.
let lastView = "formula";
// Le Sfere spente coi simboli in cima (7/9): si ricordano finché il mondo resta aperto.
const dimmedSpheres = new Set();

/** I simboli delle Sfere possedute, in cima al Grimorio: un clic accende o spegne. */
export function prepareGrimorioSpheres(sphereLevels = {}, localize = (key) => key, dimmed = new Set()) {
  return SPHERES
    .filter((sphere) => level(sphereLevels[sphere]) > 0)
    .map((sphere) => ({
      sphere,
      label: localize(`WOD5E_MAGE.Spheres.${sphere}`),
      icon: `modules/${MODULE_ID}/assets/icons/sheet/${sphere}.png`,
      dots: "●".repeat(level(sphereLevels[sphere])),
      lit: !dimmed.has(sphere)
    }));
}

/** Legge dalla riga della matrice la Sfera d'Accesso e le Amalgame spuntate. */
function readFormulaChoice(row, formula, sphereLevels) {
  const access = row.querySelector("input[data-role=formulaAccess]:checked")?.value ?? "";
  const amalgams = [...row.querySelectorAll("input[data-role=formulaAmalgam]:checked")].map((input) => input.value);
  const threshold = Number(row.querySelector("input[data-role=formulaThreshold]:checked")?.value ?? 0);
  return formulaPick(formula, { access, amalgams, threshold, sphereLevels });
}

/**
 * `onFormula(pick)` e `onFormulaRoll(pick)` servono la pagina del Grimorio:
 * la matrice scelta si scrive fra gli incantesimi, o si lancia subito. Senza
 * (dalla finestra del tiro) la scelta della matrice chiude la finestra e
 * torna `pick` ({ formula, access, amalgams, spheres, scopes }): chi ha
 * aperto il Grimorio la legge come una scelta.
 */
export async function openGrimorio(sphereLevels, { onPick = null, onFormula = null, onFormulaRoll = null } = {}) {
  const localize = game.i18n.localize.bind(game.i18n);
  const content = await foundry.applications.handlebars.renderTemplate(
    `modules/${MODULE_ID}/templates/dialogs/grimorio.hbs`,
    {
      groups: prepareGrimorio(sphereLevels, localize),
      formule: prepareGrimorioFormule(sphereLevels, localize),
      spheres: prepareGrimorioSpheres(sphereLevels, localize, dimmedSpheres),
      view: lastView,
      inSheet: Boolean(onFormula || onFormulaRoll)
    }
  );
  let chosen = null;
  await foundry.applications.api.DialogV2.wait({
    window: { title: localize("WOD5E_MAGE.Grimorio.Title") },
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-roll-dialog", "wod5e-mage-grimorio"],
    position: { width: 720 },
    content,
    buttons: [{ action: "close", icon: "fas fa-times", label: localize("WOD5E.Close"), default: true }],
    rejectClose: false,
    render: (_event, dialog) => {
      const root = dialog.element;
      // L'interruttore fra le due viste: per Sfera, per Formula.
      const showView = (view) => {
        lastView = view;
        root.querySelectorAll("[data-view-panel]").forEach((panel) => { panel.hidden = panel.dataset.viewPanel !== view; });
        root.querySelectorAll("[data-view-only]").forEach((part) => { part.hidden = part.dataset.viewOnly !== view; });
        root.querySelectorAll("[data-role=grimorioView]").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
      };
      root.querySelectorAll("[data-role=grimorioView]").forEach((button) => {
        button.addEventListener("click", (event) => { event.preventDefault(); showView(button.dataset.view); });
      });
      showView(lastView);
      const search = root.querySelector("[data-role=grimorioSearch]");
      // Le matrici (24/9): la Sfera d'Accesso, le Amalgame e i due tasti stanno
      // dentro ogni riga; i tasti si accendono solo con una Sfera d'Accesso scelta.
      const armFormulaRows = () => {
        root.querySelectorAll("[data-formula]").forEach((row) => {
          const paint = () => {
            const ready = Boolean(row.querySelector("input[data-role=formulaAccess]:checked"));
            row.querySelectorAll("[data-role=formulaSave], [data-role=formulaRoll], [data-role=formulaPick]").forEach((button) => { button.disabled = !ready; });
          };
          row.querySelectorAll("input[data-role=formulaAccess]").forEach((input) => input.addEventListener("change", paint));
          paint();
        });
      };
      armFormulaRows();
      // I simboli delle Sfere (7/9): spenta una Sfera, sparisce dalla vista
      // per Sfera e dalle righe della vista per Formula.
      const applySpheres = () => {
        root.querySelectorAll("[data-role=grimorioSphere]").forEach((button) => button.classList.toggle("lit", !dimmedSpheres.has(button.dataset.sphere)));
        root.querySelectorAll("[data-sphere-group]").forEach((group) => { group.hidden = dimmedSpheres.has(group.dataset.sphereGroup); });
      };
      root.querySelectorAll("[data-role=grimorioSphere]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          const sphere = button.dataset.sphere;
          if (dimmedSpheres.has(sphere)) dimmedSpheres.delete(sphere);
          else dimmedSpheres.add(sphere);
          applySpheres();
        });
      });
      applySpheres();
      search?.addEventListener("input", () => {
        const wanted = search.value.trim().toLowerCase();
        root.querySelectorAll(".wod5e-mage-grimorio-row").forEach((row) => {
          row.hidden = Boolean(wanted) && !row.textContent.toLowerCase().includes(wanted);
        });
      });
      root.addEventListener("click", async (event) => {
        // I tasti della matrice: scrivi nel Grimorio, lancia, o scegli (dal tiro).
        const formulaButton = event.target.closest?.("[data-role=formulaSave], [data-role=formulaRoll], [data-role=formulaPick]");
        if (formulaButton) {
          event.preventDefault();
          const formulaRow = formulaButton.closest("[data-formula]");
          const formula = findFormula(formulaRow?.dataset.formula ?? "");
          const pick = formulaRow && formula ? readFormulaChoice(formulaRow, formula, sphereLevels) : null;
          if (!pick) return;
          if (formulaButton.dataset.role === "formulaSave" && onFormula) {
            await onFormula(pick);
            formulaButton.classList.add("taken");
            return;
          }
          if (formulaButton.dataset.role === "formulaRoll" && onFormulaRoll) {
            dialog.close();
            await onFormulaRoll(pick);
            return;
          }
          chosen = pick;
          dialog.close();
          return;
        }
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
