import { MODULE_ID } from "./constants.js";
import {
  addParadoxToBalance,
  getMagickBalance,
  paradoxGainForMagickType
} from "./magick-balance.js";
import {
  findMageRollTrait,
  prepareMageRollTraits,
  selectorsForMageRollTrait
} from "./mage-roll-selection.js";
import { prepareSpheres } from "./spheres.js";
import { prepareScopeTable, SCOPE_ICONS, SCOPES } from "./scopes.js";
import {
  ROLL_CARD_FLAG,
  renderAutoVictoryContent,
  renderRollCard,
  renderRollNote,
  rollSymbols
} from "./roll-card.js";
import { FOCUS_FORMS } from "./focus.js";
import { maintainedEffectRow, shouldRecordEffect } from "./ongoing-magick.js";
import { effectSphereLevels, openGrimorio } from "./grimorio.js";
import { normalizeEffectKind } from "./paradox-burst.js";
import { loadSpherePowers, specialtyScopes } from "./sphere-specialties.js";

export const ARETE_MIN = 1;
export const ARETE_MAX = 5;

function clampArete(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return ARETE_MIN;
  return Math.min(Math.max(Math.trunc(numericValue), ARETE_MIN), ARETE_MAX);
}

export function getArete(actor) {
  const stored = actor.getFlag(MODULE_ID, "arete");
  const value = clampArete(
    typeof stored === "object" && stored !== null ? stored.value : stored
  );

  return {
    value,
    min: ARETE_MIN,
    max: ARETE_MAX,
    steps: Array.from({ length: ARETE_MAX }, (_, index) => ({
      value: index + 1,
      active: index < value
    }))
  };
}

export function prepareAreteTraits(actor, options) {
  return prepareMageRollTraits(actor, options);
}

/**
 * La riserva del ramo A: Attributo, Abilità, Abilità. Ne basta uno; chi ne
 * sceglie di più somma i dadi. L'Areté non tira.
 */
export function calculateAreteTraitPool(...traits) {
  return traits.reduce((total, value) => total + Math.max(Number(value) || 0, 0), 0);
}

/** Il tetto dei dadi in più: premio, Armonia e Bonus scritti insieme. */
export const BONUS_DICE_CAP = 3;

/** La soglia della Magick non supera il 7, Rituali compresi. */
export const THRESHOLD_CAP = 7;

/**
 * Il premio dell'Areté: dadi in più pari all'Areté quando la descrizione lo
 * merita (rispetta lo Strumento, o il Credo, o inventa un effetto fuori dalle
 * tavole), dentro il tetto. La Magick Ibrida non lo prende mai.
 */
export function calculateAretePrize(arete, form = "") {
  if (form === "ibrida") return 0;
  return Math.min(Math.max(Math.trunc(Number(arete) || 0), 0), BONUS_DICE_CAP);
}

/** L'Armonia: i dadi che gli altri Maghi ti danno, contati al tavolo. */
export const HARMONY_MAX = 9;

export function normalizeHarmony(value) {
  return Math.min(Math.max(Math.trunc(Number(value) || 0), 0), HARMONY_MAX);
}

/** Quanti dadi in più restano una volta applicato il tetto. */
export function capBonusDice(bonusDice) {
  return Math.min(Math.max(Math.trunc(Number(bonusDice) || 0), 0), BONUS_DICE_CAP);
}

/**
 * Il tetto dei dadi in più (ramo A): premio dell'Areté, Armonia e ogni
 * modificatore positivo stanno insieme dentro +3. Torna quanti dadi vanno
 * tolti alla riserva perché il conto rientri.
 */
export function bonusDiceExcess(bonusDice, modifiers = []) {
  const positives = modifiers
    .map((modifier) => Number(modifier?.value) || 0)
    .filter((value) => value > 0)
    .reduce((total, value) => total + value, 0);
  const declared = Math.max(Math.trunc(Number(bonusDice) || 0), 0) + positives;
  return Math.max(declared - BONUS_DICE_CAP, 0);
}

function levelEntries(entries, max) {
  return (entries ?? [])
    .map((entry) => (typeof entry === "object" && entry !== null ? entry : { level: entry }))
    .map((entry) => ({
      id: String(entry.id ?? ""),
      level: Math.min(Math.max(Math.trunc(Number(entry.level) || 0), 0), max)
    }))
    .filter((entry) => entry.level > 0);
}

/**
 * La soglia del ramo A: il maggiore fra la Sfera più alta e l'Ambito più
 * alto, +1 per ogni Ambito oltre il primo, +1 piatto con tre o più Sfere,
 * tetto 7. Gli Ambiti valgono da 1 a 7. Le Specialità delle Sfere non la
 * toccano (verdetto di Blue, 4/9 notte): danno successi automatici.
 */
export function calculateMagickThreshold({ sphereLevels = [], scopeLevels = [] } = {}) {
  const spheres = levelEntries(sphereLevels, 5);
  const scopes = levelEntries(scopeLevels, THRESHOLD_CAP);
  if (!spheres.length && !scopes.length) return 0;

  const highest = Math.max(
    0,
    ...spheres.map((entry) => entry.level),
    ...scopes.map((entry) => entry.level)
  );
  const extraScopes = Math.max(scopes.length - 1, 0);
  const manySpheres = spheres.length >= 3 ? 1 : 0;
  // Il tetto 7 vale sul livello (e sulle tre Sfere); gli Ambiti oltre il
  // primo lo superano (regola di Blue del 4/9 notte).
  return Math.min(highest + manySpheres, THRESHOLD_CAP) + extraScopes;
}

/**
 * I successi automatici delle Specialità (verdetto di Blue, 4/9 notte):
 * quando una Sfera nel lancio ha la Specialità su un Ambito dichiarato,
 * il tiro parte con tanti successi quanto l'Areté. Una volta sola, anche
 * con più Specialità in gioco. Torna il conto e le coppie che lo danno.
 */
export function calculateAutomaticSuccesses({ sphereLevels = [], scopeLevels = [], specialties = {}, arete = 0 } = {}) {
  const spheres = levelEntries(sphereLevels, 5);
  const scopes = levelEntries(scopeLevels, THRESHOLD_CAP);
  const pairs = [];
  for (const [sphereId, scopeId] of Object.entries(specialties ?? {})) {
    if (!scopeId) continue;
    const sphere = spheres.find((entry) => entry.id === sphereId);
    const scope = scopes.find((entry) => entry.id === String(scopeId));
    if (sphere && scope) pairs.push({ sphere: sphereId, scope: String(scopeId) });
  }
  const value = Math.max(Math.trunc(Number(arete) || 0), 0);
  return { successes: pairs.length ? value : 0, pairs };
}

/** Vittoria automatica: riserva almeno doppia della soglia, non si tira. */
export function isAutomaticVictory(pool, threshold, automaticSuccesses = 0) {
  const goal = Math.max(Math.trunc(Number(threshold) || 0), 0);
  if (goal <= 0) return false;
  // I successi automatici delle Specialità che coprono la soglia: non si tira.
  if (Math.max(Math.trunc(Number(automaticSuccesses) || 0), 0) >= goal) return true;
  return Math.max(Math.trunc(Number(pool) || 0), 0) >= goal * 2;
}

/** A un passo: riuscita a un prezzo se mancano al massimo Areté successi. */
export function isOneStepShort(successes, threshold, arete) {
  const goal = Math.max(Math.trunc(Number(threshold) || 0), 0);
  const got = Math.max(Math.trunc(Number(successes) || 0), 0);
  if (goal === 0 || got >= goal) return false;
  return goal - got <= Math.max(Math.trunc(Number(arete) || 0), 0);
}

function isChecked(value) {
  return value === true || value === "true" || value === "on";
}

export function normalizeMagickRollOptions({
  prize = false,
  harmony = 0,
  coincidental = false,
  vulgar = false,
  witnesses = false
} = {}) {
  const options = {
    // Il premio lo decide la descrizione, e il giocatore lo spunta: i dadi
    // sono pari all'Areté della scheda, dentro il tetto.
    usePrize: isChecked(prize),
    harmony: normalizeHarmony(harmony),
    coincidental: isChecked(coincidental),
    vulgar: isChecked(vulgar),
    witnesses: isChecked(witnesses)
  };

  // Il tipo di Magick è una scelta sola. La finestra spegne le altre caselle
  // da sé, ma se dovesse arrivare comunque più di una spunta vince la più
  // grave, così il Paradosso automatico non si somma mai due volte.
  if (options.witnesses) {
    options.vulgar = false;
    options.coincidental = false;
  } else if (options.vulgar) {
    options.coincidental = false;
  }

  return options;
}

function notifyLocked(actor) {
  ui.notifications.warn(
    game.i18n.format("WOD5E.Notifications.CannotModifyResourceString", {
      string: actor.name
    })
  );
}

export async function onAreteChange(event, target) {
  event.preventDefault();

  const actor = this.actor;
  if (!actor.isOwner) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.NoSufficientPermission", {
        string: actor.name
      })
    );
    return;
  }

  if (actor.system.locked) {
    notifyLocked(actor);
    return;
  }

  const value = clampArete(target.dataset.value);
  await actor.setFlag(MODULE_ID, "arete", { value });
}

/**
 * Le tre caselle del tipo di Magick si comportano da scelta unica: spuntandone
 * una le altre si spengono. Restano caselle perché il giocatore possa anche
 * non dichiarare nulla.
 */
function makeMagickTypeExclusive(dialog) {
  const boxes = [...(dialog?.element?.querySelectorAll(".wod5e-mage-magick-type") ?? [])];

  boxes.forEach((box) => {
    box.addEventListener("change", () => {
      if (!box.checked) return;
      boxes.forEach((other) => {
        if (other !== box) other.checked = false;
      });
    });
  });
}

/**
 * Le file a pallini di Sfere e Ambiti: il clic su un pallino fissa il
 * livello (di nuovo sullo stesso: zero) e lo scrive nel campo nascosto.
 */
function wireDotRows(dialog) {
  const root = dialog?.element;
  root?.querySelectorAll("[data-role=dotRow]").forEach((row) => {
    const input = row.querySelector("input[type=hidden]");
    const dots = [...row.querySelectorAll(".wod5e-mage-arete-sphere-dot")];
    if (!input) return;

    const paint = () => {
      const level = Math.max(Math.trunc(Number(input.value) || 0), 0);
      dots.forEach((dot) => {
        dot.classList.toggle("active", Number(dot.dataset.level) <= level);
      });
      row.classList.toggle("chosen", level > 0);
    };

    dots.forEach((dot) => {
      dot.addEventListener("click", (event) => {
        event.preventDefault();
        const level = Math.max(Math.trunc(Number(dot.dataset.level) || 0), 0);
        input.value = String(Number(input.value) === level ? 0 : level);
        paint();
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });
    });
    // Il Grimorio ridipinge la fila da fuori.
    row._paint = paint;
    paint();
  });
}

function readDotRows(root, kind) {
  const entries = [];
  root?.querySelectorAll(`[data-role=dotRow][data-kind=${kind}]`).forEach((row) => {
    const level = Math.max(Math.trunc(Number(row.querySelector("input[type=hidden]")?.value) || 0), 0);
    if (level > 0) entries.push({ id: row.dataset.id, level });
  });
  return entries;
}

function readSpecialties(root) {
  const map = {};
  root?.querySelectorAll("[data-role=dotRow][data-kind=sphere]").forEach((row) => {
    if (row.dataset.specialty) map[row.dataset.id] = row.dataset.specialty;
  });
  return map;
}

function optionValue(select) {
  const option = select?.selectedOptions?.[0];
  return Math.max(Math.trunc(Number(option?.dataset?.value) || 0), 0);
}

/** Il conto vivo: riserva (due tratti, premio, Armonia) contro soglia. */
function wireDifficulty(dialog) {
  const root = dialog?.element;
  const thresholdOut = root?.querySelector("[data-role=threshold]");
  const poolOut = root?.querySelector("[data-role=pool]");
  const autoOut = root?.querySelector("[data-role=autoVictory]");
  if (!thresholdOut || !poolOut) return;

  const attribute = root.querySelector("#wod5e-mage-arete-attribute");
  const primary = root.querySelector("#wod5e-mage-arete-primary");
  const secondary = root.querySelector("#wod5e-mage-arete-secondary");
  const prizeBox = root.querySelector("input[name=prize]");
  const harmony = root.querySelector("#wod5e-mage-arete-harmony");
  const quintessence = root.querySelector("#wod5e-mage-arete-quintessence");

  const autoSuccessOut = root.querySelector("[data-role=autoSuccesses]");
  const areteValue = Math.max(Math.trunc(Number(root.querySelector(".wod5e-mage-arete-form")?.dataset.arete) || 0), 0);

  const update = () => {
    const sphereLevels = readDotRows(root, "sphere");
    const scopeLevels = readDotRows(root, "scope");
    const threshold = calculateMagickThreshold({ sphereLevels, scopeLevels });
    const quintessenceMax = Math.max(Math.trunc(Number(quintessence?.max) || 0), 0);
    const quintessenceSpent = Math.min(Math.max(Math.trunc(Number(quintessence?.value) || 0), 0), quintessenceMax);
    const automaticSuccesses = calculateAutomaticSuccesses({
      sphereLevels,
      scopeLevels,
      specialties: readSpecialties(root),
      arete: areteValue
    }).successes + quintessenceSpent;

    const prizeDice = prizeBox?.checked
      ? Math.max(Math.trunc(Number(prizeBox.dataset.value) || 0), 0)
      : 0;
    const bonus = capBonusDice(prizeDice + normalizeHarmony(harmony?.value));
    const pool = calculateAreteTraitPool(optionValue(attribute), optionValue(primary), optionValue(secondary)) + bonus;

    thresholdOut.textContent = String(threshold);
    poolOut.textContent = String(pool);
    if (autoSuccessOut) {
      autoSuccessOut.textContent = automaticSuccesses > 0
        ? game.i18n.format("WOD5E_MAGE.Arete.AutoSuccesses", { successes: automaticSuccesses })
        : "";
    }
    autoOut?.classList.toggle("hidden", !isAutomaticVictory(pool, threshold, automaticSuccesses));
  };

  [attribute, primary, secondary, prizeBox, harmony, quintessence].forEach((control) => {
    control?.addEventListener("change", update);
    control?.addEventListener("input", update);
  });
  // I pallini scrivono nei campi nascosti e avvisano col change.
  root.querySelectorAll("[data-role=dotRow] input[type=hidden]").forEach((input) => {
    input.addEventListener("change", update);
  });
  update();
}

/** L'icona accanto ad Ambiti apre la tavola dei livelli, per consultarla. */
function wireScopeTable(dialog) {
  const button = dialog?.element?.querySelector("[data-role=scopeTableOpen]");
  if (!button) return;
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    const content = await foundry.applications.handlebars.renderTemplate(
      "modules/wod5e-mage/templates/actor/parts/scope-table.hbs",
      { scopeTable: prepareScopeTable(game.i18n.localize.bind(game.i18n)) }
    );
    await foundry.applications.api.DialogV2.wait({
      window: { title: game.i18n.localize("WOD5E_MAGE.Scopes.TableTitle") },
      content: `<div class="wod5e-mage-scope-table-dialog">${content}</div>`,
      buttons: [{ action: "close", icon: "fas fa-times", label: game.i18n.localize("WOD5E.Close"), default: true }],
      classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-roll-dialog"],
      position: { width: 1000, height: "auto" }
    }).catch(() => null);
  });
}

/**
 * L'incantesimo del Grimorio del personaggio (6/9): quel che il dialogo ha
 * scelto, più il Credo, il Tipo di Magick e gli Strumenti delle Sfere usate,
 * letti dalla scheda al momento del salvataggio.
 */
export function spellFromResult(actor, result, { traits, rollSpheres, localize = (key) => key } = {}) {
  const options = normalizeMagickRollOptions(result);
  const spheres = {};
  for (const sphere of rollSpheres ?? []) {
    const level = Math.min(Math.max(Math.trunc(Number(result[`sphere-${sphere.id}`]) || 0), 0), sphere.value);
    if (level > 0) spheres[sphere.id] = level;
  }
  const scopes = {};
  for (const scopeId of SCOPES) {
    const level = Math.min(Math.max(Math.trunc(Number(result[`scope-${scopeId}`]) || 0), 0), THRESHOLD_CAP);
    if (level > 0) scopes[scopeId] = level;
  }
  const chosen = ["attributeTrait", "primaryTrait", "secondaryTrait"]
    .map((field) => {
      const trait = findMageRollTrait(traits, result[field]);
      return trait ? { field, key: String(result[field]), label: trait.label } : null;
    })
    .filter(Boolean);
  const focus = actor.getFlag(MODULE_ID, "focus") ?? {};
  const instruments = Object.keys(spheres)
    .map((id) => {
      const row = focus.sphereInstruments?.[id] ?? {};
      const tool = row.tool ? localize(`WOD5E_MAGE.Focus.Tools.${row.tool}`) : "";
      const name = String(row.name ?? "").trim();
      if (tool && name) return `${tool} (${name})`;
      return tool || name;
    })
    .filter((entry, index, all) => entry && all.indexOf(entry) === index);
  return {
    name: String(result.spellName ?? "").trim() || String(result.goal ?? "").trim(),
    goal: String(result.goal ?? "").trim(),
    narrative: String(result.narrative ?? "").trim(),
    effectKind: normalizeEffectKind(result.effectKind),
    magickType: options.witnesses ? "witnesses" : options.vulgar ? "vulgar" : options.coincidental ? "coincidental" : "",
    prize: Boolean(options.usePrize),
    maintained: isChecked(result.maintained),
    traits: chosen,
    spheres,
    scopes,
    credo: String(focus.credo ?? ""),
    practiceForm: FOCUS_FORMS.includes(focus.practiceForm) ? focus.practiceForm : "",
    instruments
  };
}

/** Un incantesimo salvato riempie la finestra: tratti, tipo, pallini, Obiettivo. */
function applyAretePreset(dialog, preset) {
  const root = dialog?.element;
  if (!root || !preset) return;
  const setValue = (selector, value) => {
    const field = root.querySelector(selector);
    if (!field) return;
    field.value = value ?? "";
    field.dispatchEvent(new Event("change", { bubbles: true }));
  };
  const setChecked = (selector, checked) => {
    const box = root.querySelector(selector);
    if (!box) return;
    box.checked = Boolean(checked);
    box.dispatchEvent(new Event("change", { bubbles: true }));
  };
  for (const trait of preset.traits ?? []) {
    const select = root.querySelector(`[name="${trait.field}"]`);
    if (select && [...select.options].some((option) => option.value === trait.key)) setValue(`[name="${trait.field}"]`, trait.key);
  }
  setChecked('input[name="prize"]', preset.prize);
  setChecked('input[name="coincidental"]', preset.magickType === "coincidental");
  setChecked('input[name="vulgar"]', preset.magickType === "vulgar");
  setChecked('input[name="witnesses"]', preset.magickType === "witnesses");
  setChecked("#wod5e-mage-arete-maintained", preset.maintained);
  setValue("#wod5e-mage-arete-maintained-name", preset.name);
  setValue("#wod5e-mage-arete-goal", preset.goal);
  setValue("#wod5e-mage-arete-effect-kind", preset.effectKind);
  setValue("#wod5e-mage-arete-spell-name", preset.name);
  setValue("#wod5e-mage-arete-narrative", preset.narrative);
  for (const [kind, levels] of [["sphere", preset.spheres ?? {}], ["scope", preset.scopes ?? {}]]) {
    for (const [id, level] of Object.entries(levels)) {
      const row = root.querySelector(`[data-role=dotRow][data-kind=${kind}][data-id="${id}"]`);
      const input = row?.querySelector("input[type=hidden]");
      if (!input) continue;
      const max = kind === "sphere" ? row.querySelectorAll(".wod5e-mage-arete-sphere-dot").length : THRESHOLD_CAP;
      input.value = String(Math.min(Math.max(Math.trunc(Number(level) || 0), 0), max));
      row._paint?.();
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
}

/**
 * Il libro accanto all'Obiettivo apre il Grimorio: la scelta scrive
 * l'Obiettivo e accende i pallini delle Sfere che l'effetto chiede.
 */
function wireGrimorio(dialog, sphereLevels) {
  const root = dialog?.element;
  const button = root?.querySelector("[data-role=grimorioOpen]");
  const goal = root?.querySelector("#wod5e-mage-arete-goal");
  if (!button || !goal) return;
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    const entry = await openGrimorio(sphereLevels);
    if (!entry) return;
    goal.value = entry.name;
    for (const [sphere, level] of Object.entries(effectSphereLevels(entry))) {
      const row = root.querySelector(`[data-role=dotRow][data-kind=sphere][data-id="${sphere}"]`);
      const input = row?.querySelector("input[type=hidden]");
      if (!input) continue;
      input.value = String(Math.min(level, Math.max(Math.trunc(Number(sphereLevels[sphere]) || 0), 0)));
      row._paint?.();
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
}

/** La casella «Effetto Mantenuto» mostra il campo del nome solo da spuntata. */
function wireMaintainedEffect(dialog) {
  const box = dialog?.element?.querySelector("#wod5e-mage-arete-maintained");
  const name = dialog?.element?.querySelector("#wod5e-mage-arete-maintained-name");
  if (!box || !name) return;

  box.addEventListener("change", () => {
    name.classList.toggle("hidden", !box.checked);
    if (box.checked) name.focus();
  });
}

/** Un messaggio in chat senza dadi: la vittoria automatica accidentale. */
/**
 * La vittoria automatica senza dadi: scritta grande, simboli del tiro,
 * conto e note, in un messaggio senza tiro.
 */
async function postAutomaticVictory(actor, title, { symbols, card, notes }) {
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    flavor: title,
    content: renderAutoVictoryContent(
      { symbols, card, notes },
      game.i18n.localize.bind(game.i18n)
    ),
    flags: { [MODULE_ID]: { [ROLL_CARD_FLAG]: { symbols, automatic: true } } }
  });
}

export async function onAreteRoll(event) {
  event.preventDefault();
  return launchArete(this.actor, { mode: "roll" });
}

/**
 * La finestra del tiro di Areté, in due modi: «roll» tira; «save» (il
 * Grimorio del personaggio, 6/9) non tira e torna l'incantesimo da salvare.
 * Un `preset` (un incantesimo salvato) riempie la finestra prima di aprirla.
 */
export async function launchArete(actor, { mode = "roll", preset = null } = {}) {
  const saveMode = mode === "save";
  const arete = getArete(actor);
  const traits = prepareAreteTraits(actor, {
    localize: game.i18n.localize.bind(game.i18n),
    lang: game.i18n.lang
  });
  // Il Tipo di Magick della pagina del Credo: l'Ibrida non prende il premio.
  const storedForm = actor.getFlag(MODULE_ID, "focus")?.practiceForm;
  const form = FOCUS_FORMS.includes(storedForm) ? storedForm : "";
  const prize = {
    dice: calculateAretePrize(arete.value, form),
    allowed: form !== "ibrida"
  };
  // Solo le Sfere sbloccate, con almeno un pallino: sono quelle combinabili.
  // Il livello parla a pallini nel dialogo, come sulla scheda.
  // Ogni Sfera porta i suoi pallini: il giocatore sceglie il livello che
  // usa. Le Specialità dell'Ambito si leggono dal compendio.
  const specialties = specialtyScopes(actor, await loadSpherePowers());
  const rollSpheres = prepareSpheres(actor).selected
    .filter((sphere) => sphere.value > 0)
    .map((sphere) => ({
      ...sphere,
      steps: Array.from({ length: sphere.value }, (_, index) => ({ value: index + 1 })),
      specialtyScope: specialties[sphere.id] ?? "",
      specialtyLabel: specialties[sphere.id] ? `WOD5E_MAGE.Scopes.${specialties[sphere.id]}` : ""
    }));
  // I sei Ambiti, a sette pallini l'uno.
  const scopeOptions = SCOPES.map((id) => ({
    id,
    label: `WOD5E_MAGE.Scopes.${id}`,
    faIcon: SCOPE_ICONS[id] ?? "",
    steps: Array.from({ length: THRESHOLD_CAP }, (_, index) => ({ value: index + 1 }))
  }));
  const quintessenceAvailable = getMagickBalance(actor).quintessence;
  const sphereLevelsOwned = Object.fromEntries(rollSpheres.map((sphere) => [sphere.id, sphere.value]));
  const content = await foundry.applications.handlebars.renderTemplate(
    "modules/wod5e-mage/templates/dialogs/arete-roll.hbs",
    { arete, prize, spheres: rollSpheres, scopes: scopeOptions, quintessence: quintessenceAvailable, saveMode, preset, ...traits }
  );

  const result = await foundry.applications.api.DialogV2.input({
    window: {
      title: game.i18n.localize(saveMode ? "WOD5E_MAGE.Incantesimi.DialogTitle" : "WOD5E_MAGE.Arete.Roll")
    },
    // Una finestra compatta: due colonne, niente muri di testo.
    position: {
      width: 700,
      height: "auto"
    },
    content,
    ok: {
      icon: saveMode ? "fas fa-floppy-disk" : "fas fa-dice",
      label: game.i18n.localize(saveMode ? "WOD5E_MAGE.Incantesimi.Save" : "WOD5E_MAGE.Arete.Roll")
    },
    buttons: [
      {
        action: "cancel",
        icon: "fas fa-times",
        label: game.i18n.localize("WOD5E.Cancel")
      }
    ],
    classes: ["wod5e", "wod5e-mage", "mage", actor.system.gamesystem, "wod5e-mage-roll-dialog"],
    render: (_event, dialog) => {
      makeMagickTypeExclusive(dialog);
      wireDotRows(dialog);
      wireDifficulty(dialog);
      wireScopeTable(dialog);
      wireMaintainedEffect(dialog);
      wireGrimorio(dialog, sphereLevelsOwned);
      applyAretePreset(dialog, preset);
    }
  });

  if (!result || result === "cancel") return null;

  // Il Grimorio: niente tiro, torna quel che si è scelto, da salvare.
  if (saveMode) {
    return spellFromResult(actor, result, { traits, rollSpheres, localize: game.i18n.localize.bind(game.i18n) });
  }

  // Attributo, Abilità, Abilità: ne basta uno, gli altri si sommano.
  const selectedTraits = [
    findMageRollTrait(traits, result.attributeTrait),
    findMageRollTrait(traits, result.primaryTrait),
    findMageRollTrait(traits, result.secondaryTrait)
  ].filter(Boolean);
  if (!selectedTraits.length) {
    ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.Arete.SelectTraitWarning"));
    return;
  }

  const options = normalizeMagickRollOptions(result);
  const sphereEntries = rollSpheres
    .map((sphere) => ({
      id: sphere.id,
      level: Math.min(Math.max(Math.trunc(Number(result[`sphere-${sphere.id}`]) || 0), 0), sphere.value)
    }))
    .filter((entry) => entry.level > 0);

  // Gli Ambiti dichiarati a pallini, col livello da 1 a 7: fanno soglia, e
  // il piano finisce nel testo del tiro in chat.
  const scopeEntries = SCOPES
    .map((scopeId) => ({
      scopeId,
      level: Math.min(Math.max(Math.trunc(Number(result[`scope-${scopeId}`]) || 0), 0), THRESHOLD_CAP)
    }))
    .filter((entry) => entry.level > 0);

  const threshold = calculateMagickThreshold({
    sphereLevels: sphereEntries,
    scopeLevels: scopeEntries.map((entry) => ({ id: entry.scopeId, level: entry.level }))
  });
  // Le Specialità: successi automatici pari all'Areté, la soglia non si tocca.
  const automatic_ = calculateAutomaticSuccesses({
    sphereLevels: sphereEntries,
    scopeLevels: scopeEntries.map((entry) => ({ id: entry.scopeId, level: entry.level })),
    specialties,
    arete: arete.value
  });
  // La Quintessenza spesa (6/9): un successo automatico per punto, scende
  // dalla Ruota; se l'effetto fa danni, sono aggravati.
  const quintessence = Math.min(Math.max(Math.trunc(Number(result.quintessence) || 0), 0), quintessenceAvailable);
  const autoSuccesses = automatic_.successes + quintessence;
  const goal = String(result.goal ?? "").trim();
  const effectKind = normalizeEffectKind(result.effectKind);

  const prizeDice = options.usePrize ? prize.dice : 0;
  const bonusDice = prizeDice + options.harmony;
  const basePool = calculateAreteTraitPool(...selectedTraits.map((trait) => trait.value));
  const dicePool = basePool + capBonusDice(bonusDice);
  const rollLabel = selectedTraits.map((trait) => trait.label).join(" + ");
  const selectedTypes = [];
  if (options.coincidental) {
    selectedTypes.push(game.i18n.localize("WOD5E_MAGE.Arete.Coincidental"));
  }
  if (options.vulgar) {
    selectedTypes.push(game.i18n.localize("WOD5E_MAGE.Arete.Vulgar"));
  }
  if (options.witnesses) {
    selectedTypes.push(game.i18n.localize("WOD5E_MAGE.Arete.VulgarWithWitnesses"));
  }
  const magickType = selectedTypes.length > 0
    ? selectedTypes.join(", ")
    : game.i18n.localize("WOD5E_MAGE.Arete.NoType");

  const selectors = selectedTraits.flatMap((trait) => selectorsForMageRollTrait(trait));
  if (options.coincidental) selectors.push("magick.coincidental");
  if (options.vulgar) selectors.push("magick.vulgar");
  if (options.witnesses) selectors.push("magick.vulgar-with-witnesses");
  // Rimuove i duplicati generati quando si selezionano due abilità.
  const uniqueSelectors = [...new Set(selectors)];

  const bonusParts = [];
  if (prizeDice > 0) {
    bonusParts.push(game.i18n.format("WOD5E_MAGE.Arete.PrizeFlavor", { dice: prizeDice }));
  }
  if (options.harmony > 0) {
    bonusParts.push(game.i18n.format("WOD5E_MAGE.Arete.HarmonyFlavor", { dice: options.harmony }));
  }
  if (quintessence > 0) {
    bonusParts.push(game.i18n.format("WOD5E_MAGE.Arete.QuintessenceFlavor", { points: quintessence }));
  }
  if (automatic_.successes > 0) {
    bonusParts.push(game.i18n.format("WOD5E_MAGE.Arete.AutoSuccessesFlavor", {
      successes: automatic_.successes,
      pairs: automatic_.pairs.map((pair) => `${game.i18n.localize(`WOD5E_MAGE.Spheres.${pair.sphere}`)} ◆ ${game.i18n.localize(`WOD5E_MAGE.Scopes.${pair.scope}`)}`).join(", ")
    }));
  }
  // La carta del tiro: una riga per voce sotto i dadi, i simboli sopra.
  const localize = game.i18n.localize.bind(game.i18n);
  const scopeLevels = scopeEntries.map((entry) => ({ id: entry.scopeId, level: entry.level }));
  const card = renderRollCard({
    traits: selectedTraits.map((trait) => ({ label: trait.label, value: trait.value })),
    bonusParts,
    threshold,
    magickType,
    goal,
    effectKind: effectKind ? `WOD5E_MAGE.Arete.EffectKinds.${effectKind}` : "",
    spheres: sphereEntries.map((entry) => ({ label: `WOD5E_MAGE.Spheres.${entry.id}`, level: entry.level })),
    scopes: scopeLevels.map((entry) => ({ label: `WOD5E_MAGE.Scopes.${entry.id}`, level: entry.level }))
  }, localize);
  const symbols = rollSymbols({ spheres: sphereEntries, scopes: scopeLevels, prize: prizeDice });
  // Quel che resta del lancio dopo il tiro: nome, tipo, Durata e soglia.
  const effect = {
    vulgar: options.vulgar || options.witnesses,
    duration: scopeEntries.find((entry) => entry.scopeId === "duration")?.level ?? 0,
    threshold,
    fallbackName: goal || sphereEntries
      .map((entry) => `${localize(`WOD5E_MAGE.Spheres.${entry.id}`)} ${entry.level}`)
      .join(", ") || rollLabel
  };
  // L'ultima soglia lanciata: la usa lo Scoppio del Paradosso come proposta.
  if (actor.isOwner) await actor.setFlag(MODULE_ID, "lastThreshold", threshold);
  let flavor = card;

  // La vittoria automatica: riserva almeno doppia della soglia, non si tira.
  // Nel Volgare si tirano comunque i soli dadi rossi, per il Contraccolpo;
  // se scatta, l'Ustione è pari alla soglia.
  const automatic = isAutomaticVictory(dicePool, threshold, autoSuccesses);
  const paradoxGain = paradoxGainForMagickType(options);

  // La Ruota paga subito: la Quintessenza spesa scende, la Magick volgare
  // sale verso il Paradosso, così i rossi di questo tiro contano già il
  // rincaro. Se il tiro non parte, la Ruota torna com'era.
  const balanceBefore = getMagickBalance(actor);
  let balanceMoved = false;
  if ((quintessence > 0 || paradoxGain > 0) && actor.isOwner) {
    const spent = { quintessence: Math.max(balanceBefore.quintessence - quintessence, 0), paradox: balanceBefore.paradox };
    const balanceAfter = addParadoxToBalance(spent, paradoxGain);
    if (balanceAfter.paradox !== balanceBefore.paradox || balanceAfter.quintessence !== balanceBefore.quintessence) {
      await actor.setFlag(MODULE_ID, "magickBalance", balanceAfter);
      balanceMoved = true;
      if (quintessence > 0) {
        ui.notifications.info(game.i18n.format("WOD5E_MAGE.Arete.QuintessenceSpent", { points: quintessence }));
      }
      if (paradoxGain > 0) {
        ui.notifications.info(game.i18n.format("WOD5E_MAGE.MagickBalance.ParadoxGained", { amount: paradoxGain }));
      }
    }
  }

  if (automatic && paradoxGain === 0) {
    const notes = [renderRollNote(game.i18n.format("WOD5E_MAGE.Arete.AutoVictoryChat", { pool: dicePool, threshold }))];
    await postAutomaticVictory(actor, rollLabel, { symbols, card, notes });
    await recordEffect(actor, result, effect);
    return;
  }

  // La Magick accidentale non tira i rossi: solo dadi normali.
  const paradoxRating = options.coincidental ? 0 : getMagickBalance(actor).paradox;

  if (automatic) {
    const redOnly = renderRollNote(game.i18n.format("WOD5E_MAGE.Arete.RedOnly", { pool: dicePool, threshold, burn: threshold }));
    flavor += redOnly;
    if (paradoxRating === 0) {
      // Niente rossi da tirare: la vittoria resta automatica, e basta.
      await postAutomaticVictory(actor, rollLabel, { symbols, card, notes: [redOnly] });
      await recordEffect(actor, result, effect);
      return;
    }
  }

  // Load the Foundry-specific dice implementation only when an Areté roll is
  // actually requested. Keeping it out of the data helpers also lets their
  // pure validation tests run outside Foundry.
  const { rollAreteWithParadox } = await import("./paradox-dice.js");

  let outcome = null;
  try {
    outcome = await rollAreteWithParadox({
      dicePool: automatic ? paradoxRating : basePool,
      bonusDice: automatic ? 0 : bonusDice,
      paradoxRating,
      onlyParadox: automatic,
      difficulty: automatic ? 0 : threshold,
      burn: threshold,
      effectKind,
      arete: arete.value,
      autoSuccesses: automatic ? 0 : autoSuccesses,
      title: rollLabel,
      flavor,
      // Sopra i dadi, in chat: i simboli e la vittoria automatica.
      card: { symbols, automatic },
      selectors: uniqueSelectors,
      actor,
      data: actor.system
    });
  } catch (error) {
    // La finestra chiusa con la X fa rifiutare DialogV2.wait: qui vale come
    // un annullamento, non come un errore da propagare.
    console.warn("wod5e-mage | Tiro di Areté interrotto.", error);
  }

  const rolled = Boolean(outcome) && outcome !== "cancel";

  // Se il tiro non è mai partito, la Ruota torna esattamente com'era.
  if (balanceMoved && !rolled) {
    await actor.setFlag(MODULE_ID, "magickBalance", balanceBefore);
    ui.notifications.info(game.i18n.localize("WOD5E_MAGE.MagickBalance.ParadoxReverted"));
  }

  if (rolled) await recordEffect(actor, result, effect);
}

/**
 * Il lancio, a tiro risolto, si scrive da solo fra le Magick in atto quando
 * il giocatore lo mantiene (casella spuntata) oppure ha dichiarato una
 * Durata (verdetto di Blue, 6/9/2026: ne risponde lui anche senza
 * mantenerlo). Se è Volgare, la riga blocca un punto di Paradosso permanente
 * finché resta in piedi. Torna la riga scritta, o null.
 */
export async function recordEffect(actor, result, effect = {}) {
  const maintained = isChecked(result?.maintained);
  if (!shouldRecordEffect({ maintained, duration: effect.duration }) || !actor.isOwner) return null;

  const name = String(result?.maintainedName ?? "").trim() || String(effect.fallbackName ?? "").trim();
  const row = maintainedEffectRow({
    name,
    vulgar: effect.vulgar,
    duration: effect.duration,
    threshold: effect.threshold,
    maintained,
    status: game.i18n.localize(maintained ? "WOD5E_MAGE.OngoingMagick.MaintainedStatus" : "WOD5E_MAGE.OngoingMagick.RunningStatus")
  });

  const rows = { ...(actor.getFlag(MODULE_ID, "ongoingMagick") ?? {}) };
  let rowId = foundry.utils.randomID();
  while (rows[rowId]) rowId = foundry.utils.randomID();
  rows[rowId] = row;

  await actor.setFlag(MODULE_ID, "ongoingMagick", rows);
  ui.notifications.info(
    game.i18n.format(row.lock ? "WOD5E_MAGE.OngoingMagick.MaintainedLocked" : "WOD5E_MAGE.OngoingMagick.MaintainedAdded", { name: row.nameSpheres })
  );
  return row;
}
