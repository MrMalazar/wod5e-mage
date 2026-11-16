import { MODULE_ID } from "./constants.js";
import { BUSSOLA_SCENE_FLAG } from "./bussola.js";
import { findMageRollTrait, prepareMageRollTraits } from "./mage-roll-selection.js";
import { INFLUENCE_LABELS, prepareSpheres } from "./spheres.js";
import { EPIC_SCOPE, prepareScopeTable, scopeMin, scopeReadings, SCOPE_ICONS, SCOPES } from "./scopes.js";
import { FOCUS_FORMS, PERCEIVE_TOOL_ID } from "./focus.js";
import { maintainedEffectRow, shouldRecordEffect } from "./ongoing-magick.js";
import { effectEpic, effectSphereLevels, openGrimorio } from "./grimorio.js";
import { normalizeEffectKind } from "./paradox-burst.js";
import { sogliaMagick } from "./sistema.js";

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

/** Il tetto dei dadi in più: Armonia e Bonus scritti insieme. */
export const BONUS_DICE_CAP = 3;

/** La Specializzazione dell'Abilità nel tiro di Areté (11/9): un dado, fuori dal tetto. */
export const SKILL_SPECIALTY_DICE = 1;

/** Le Specializzazioni di ogni Abilità (i bonuses del sistema), per le tendine. */
export function skillSpecialtyNames(actor) {
  const out = {};
  for (const [id, skill] of Object.entries(actor?.system?.skills ?? {})) {
    const names = (skill?.bonuses ?? []).map((bonus) => String(bonus?.source ?? "").trim()).filter(Boolean);
    if (names.length) out[id] = names;
  }
  return out;
}

/** Il livello massimo di un Ambito; la somma degli Ambiti non ha tetto. */
export const THRESHOLD_CAP = 7;

/**
 * Il premio dell'Areté (il Sistema, voce Premio): quando il lancio rispetta
 * il Credo, o passa dallo Strumento, o impressiona il tavolo, e il Narratore
 * è d'accordo, la soglia scende di quant'è l'Areté. Sta fuori dal tetto dei
 * bonus. Lo prendono tutti e tre i Tipi di Magick, l'Ibrida compresa (Blue,
 * 2/10). Dal 27/9 al 14/11 dava dadi. Torna di quanto scende la soglia.
 */
export function calculateAretePrize(arete) {
  return Math.min(Math.max(Math.trunc(Number(arete) || 0), 0), ARETE_MAX);
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
 * Il tetto dei dadi in più (ramo A): Armonia e ogni
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
 * La somma dei livelli degli Ambiti (Blue, 16/9): Potenza 4 e Portata 3 fanno
 * 7, lo 0 non costa, niente tetto. Era la soglia dei lanci fino alla 1.40.0;
 * col Sistema i lanci contano la soglia con sogliaMagick (sistema.js), e la
 * somma resta soltanto per il prezzo degli effetti della Scheda del Paradosso
 * del Narratore, finché Blue non riscrive il menù.
 */
export const SCOPE_COUNTS_FROM = 1;

export function scopeThreshold(scopeLevels = []) {
  return levelEntries(scopeLevels, THRESHOLD_CAP)
    .filter((entry) => entry.level >= SCOPE_COUNTS_FROM)
    .reduce((sum, entry) => sum + entry.level, 0);
}

/** La somma degli Ambiti, per la Scheda del Paradosso (paradosso-narratore.js). */
export function calculateMagickThreshold({ scopeLevels = [] } = {}) {
  return Math.max(scopeThreshold(scopeLevels), 0);
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
    // Il giocatore spunta il premio: la soglia scende di quant'è l'Areté (il Sistema).
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
 * La voce del livello scelto, a destra dei pallini (9/9): «Città» al quarto
 * pallino dell'Area, «Alterare» al terzo di una Sfera. Con più letture se ne
 * vede una sola (verdetto di Blue, 10/9), senza il nome della lettura davanti
 * (10/9 notte), e il tasto accanto passa alla lettura dopo.
 */
function paintReading(out, parts = [], index = 0) {
  const text = out.querySelector("[data-role=readingText]") ?? out;
  const part = parts.length ? parts[((index % parts.length) + parts.length) % parts.length] : null;
  const nodes = [];
  if (part) {
    const piece = document.createElement("span");
    piece.className = "wod5e-mage-arete-reading-part";
    // Il nome della lettura (Dettaglio, Influenza…) non si scrive più (Blue,
    // 10/9 notte: «da Dettaglio Un atomo a Un atomo»): sta nella nota al
    // passaggio del mouse, col conto dei Danni («Danni: Areté 3 +3»).
    piece.append(part.text ?? "");
    const detail = part.hint || part.text || "";
    piece.title = part.sub ? `${part.sub}: ${detail}` : detail;
    nodes.push(piece);
  }
  text.replaceChildren(...nodes);
  const button = out.querySelector("[data-role=readingSwitch]");
  if (button) button.hidden = parts.length < 2;
}

/**
 * Le letture per il dialogo: le Sfere dicono il nome del livello
 * (Percepire, Ritoccare, Alterare, Dominare, Rivoluzionare), gli Ambiti la
 * voce della tavola; con l'Areté del personaggio i Danni della Potenza sono
 * già sommati (10/9). Torna una funzione (kind, id, level) → parti.
 */
export function dotReadings(localize = (key) => key, { arete = null } = {}) {
  const scopes = scopeReadings(localize, { arete });
  const spheres = INFLUENCE_LABELS.slice(1).map((key) => String(localize(key)));
  return (kind, id, level) => {
    // Gli Ambiti hanno una lettura anche allo 0 (la base: «A contatto», «Un
    // bersaglio»); le Sfere non hanno più livelli (25/9 sera): nessuna lettura.
    if (kind === "scope") return scopes[id]?.[Math.max(level, 0)] ?? [];
    if (kind === "sphere") return [];
    if (level <= 0) return [];
    return spheres[level - 1] ? [{ sub: "", text: spheres[level - 1] }] : [];
  };
}

/** Il livello più basso di una fila: 1 per l'Epicità (2/10), 0 per tutte le altre. */
function rowMin(row) {
  return row?.dataset?.kind === "scope" ? scopeMin(row.dataset.id) : 0;
}

/**
 * Le file a pallini di Sfere e Ambiti: il clic su un pallino fissa il
 * livello (di nuovo sullo stesso: zero, o l'1 dell'Epicità), lo scrive nel
 * campo nascosto e scrive la voce del livello a destra.
 */
function wireDotRows(dialog, readingFor = () => []) {
  const root = dialog?.element;
  root?.querySelectorAll("[data-role=dotRow]").forEach((row) => {
    const input = row.querySelector("input[type=hidden]");
    const dots = [...row.querySelectorAll(".wod5e-mage-arete-sphere-dot")];
    const reading = row.querySelector("[data-role=dotReading]");
    if (!input) return;
    const min = rowMin(row);

    const paint = () => {
      const level = Math.max(Math.trunc(Number(input.value) || 0), min);
      dots.forEach((dot) => {
        dot.classList.toggle("active", Number(dot.dataset.level) <= level);
      });
      row.classList.toggle("chosen", level > 0);
      if (reading) paintReading(reading, readingFor(row.dataset.kind, row.dataset.id, level), Number(row.dataset.reading) || 0);
    };
    // Il tasto accanto alla voce: la lettura dopo (Peso, Influenza, Danni…).
    reading?.querySelector("[data-role=readingSwitch]")?.addEventListener("click", (event) => {
      event.preventDefault();
      row.dataset.reading = String((Number(row.dataset.reading) || 0) + 1);
      paint();
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", (event) => {
        event.preventDefault();
        const level = Math.max(Math.trunc(Number(dot.dataset.level) || 0), 0);
        input.value = String(Number(input.value) === level ? min : level);
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
    const level = Math.max(Math.trunc(Number(row.querySelector("input[type=hidden]")?.value) || 0), rowMin(row));
    if (level > 0) entries.push({ id: row.dataset.id, level });
  });
  return entries;
}

function optionValue(select) {
  // Una select legge l'opzione scelta; un campo nascosto (i tratti che
  // viaggiano fra i passi dell'Areté semplificata) porta il valore da sé.
  const option = select?.selectedOptions?.[0] ?? select;
  return Math.max(Math.trunc(Number(option?.dataset?.value) || 0), 0);
}

/**
 * Il conto vivo della finestra (il Sistema): la riserva, Attributo più
 * Abilità più il dado della Specializzazione, e la soglia degli Ambiti
 * contata con l'Areté (l'Ambito più alto, Epicità compresa, più 1 per ogni
 * altro sopra l'Areté, fino a 10), che scende di quant'è l'Areté col premio.
 * Quintessenza, Armonia, Bussola e Paradosso li conta il riquadro del Tiro,
 * dove l'incantesimo si lancia.
 */
function wireDifficulty(dialog) {
  const root = dialog?.element;
  const thresholdOut = root?.querySelector("[data-role=threshold]");
  const poolOut = root?.querySelector("[data-role=pool]");
  if (!thresholdOut || !poolOut) return;

  const attribute = root.querySelector("#wod5e-mage-arete-attribute");
  const primary = root.querySelector("#wod5e-mage-arete-primary");
  const secondary = root.querySelector("#wod5e-mage-arete-secondary");
  const prizeBox = root.querySelector("input[name=prize]");
  // La Specializzazione dell'Abilità (11/9: al posto della seconda Abilità): un dado, fuori dal tetto.
  const specialtyBox = root.querySelector("input[name=skillSpecialty]");
  const specialtyNames = root.querySelector("[data-role=specialtyNames]");
  const areteValue = Math.max(Math.trunc(Number(root.querySelector("[data-arete]")?.dataset.arete) || 0), ARETE_MIN);

  const update = () => {
    const premio = Boolean(prizeBox?.checked && !prizeBox.disabled);
    const soglia = sogliaMagick({ ambiti: readDotRows(root, "scope"), arete: areteValue, premio }).soglia;
    if (specialtyNames) {
      const names = primary?.selectedOptions?.[0]?.dataset?.specialties ?? "";
      specialtyNames.textContent = names ? `(${names})` : "";
    }
    const pool = calculateAreteTraitPool(optionValue(attribute), optionValue(primary), optionValue(secondary))
      + (specialtyBox?.checked ? SKILL_SPECIALTY_DICE : 0);
    thresholdOut.textContent = String(soglia);
    poolOut.textContent = String(pool);
  };

  [attribute, primary, secondary, prizeBox, specialtyBox].forEach((control) => {
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
    // La Sfera scelta vale 1: senza livelli (25/9 sera) il numero dice solo che c'è.
    const level = Math.min(Math.max(Math.trunc(Number(result[`sphere-${sphere.id}`]) || 0), 0), 1);
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
  // Un effetto percettivo usa lo Strumento di Percepire (9/9), se c'è;
  // altrimenti gli Strumenti delle Sfere usate. Senza livelli di Sfera (25/9
  // sera) percettivo è l'incantesimo che viene dalla matrice Percepire.
  const formula = String(result.formula ?? "").trim();
  const perceptive = formula === "percepire";
  const perceiveRow = focus.sphereInstruments?.[PERCEIVE_TOOL_ID] ?? {};
  const instrumentIds = perceptive && (perceiveRow.tool || String(perceiveRow.name ?? "").trim())
    ? [PERCEIVE_TOOL_ID]
    : Object.keys(spheres);
  const instruments = instrumentIds
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
    instruments,
    ...(formula ? { formula } : {})
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
  setValue("#wod5e-mage-arete-formula", preset.formula ?? "");
  setValue("#wod5e-mage-arete-narrative", preset.narrative);
  for (const [kind, levels] of [["sphere", preset.spheres ?? {}], ["scope", preset.scopes ?? {}]]) {
    for (const [id, level] of Object.entries(levels)) {
      const row = root.querySelector(`[data-role=dotRow][data-kind=${kind}][data-id="${id}"]`);
      const input = row?.querySelector("input[type=hidden]");
      if (!input) continue;
      const max = kind === "sphere" ? row.querySelectorAll(".wod5e-mage-arete-sphere-dot").length : THRESHOLD_CAP;
      input.value = String(Math.min(Math.max(Math.trunc(Number(level) || 0), rowMin(row)), max));
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
  const setDots = (kind, id, level, cap = null) => {
    const row = root.querySelector(`[data-role=dotRow][data-kind=${kind}][data-id="${id}"]`);
    const input = row?.querySelector("input[type=hidden]");
    if (!input) return;
    input.value = String(Math.max(cap === null ? level : Math.min(level, cap), rowMin(row)));
    row._paint?.();
    input.dispatchEvent(new Event("change", { bubbles: true }));
  };
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    const entry = await openGrimorio(sphereLevels, { arete: Math.max(Math.trunc(Number(root.querySelector("[data-arete]")?.dataset.arete) || 0), ARETE_MIN) });
    if (!entry) return;
    // Una matrice (24/9): l'Obiettivo è «In genere», le Sfere scelte si
    // accendono al loro livello, gli Ambiti vanno ai livelli della soglia base.
    if (entry.formula) {
      goal.value = entry.formula.use;
      const name = root.querySelector("#wod5e-mage-arete-spell-name");
      if (name && !name.value) name.value = entry.formula.name;
      const formula = root.querySelector("#wod5e-mage-arete-formula");
      if (formula) formula.value = entry.formula.id;
      for (const sphere of Object.keys(sphereLevels)) setDots("sphere", sphere, entry.spheres[sphere] ?? 0);
      for (const scope of SCOPES) setDots("scope", scope, entry.scopes[scope] ?? 0);
      return;
    }
    goal.value = entry.name;
    for (const [sphere, level] of Object.entries(effectSphereLevels(entry))) {
      setDots("sphere", sphere, level, Math.max(Math.trunc(Number(sphereLevels[sphere]) || 0), 0));
    }
    // L'Epicità parte dal livello dell'effetto (Blue, 2/10).
    setDots("scope", EPIC_SCOPE, effectEpic(entry));
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

/** I vecchi tasti del tiro di Areté (la testata è vuota dal 16/9): portano al riquadro del Tiro. */
export async function onAreteRoll(event) {
  event?.preventDefault?.();
  return caricaDalGrimorio(this.actor);
}

/** L'Areté semplificata (8/9) tirava in tre finestre; col Sistema si lancia dal riquadro del Tiro. */
export async function onAreteSimple(event) {
  event?.preventDefault?.();
  return caricaDalGrimorio(this.actor);
}

const TRAIT_FIELDS = Object.freeze([
  { field: "attributeTrait", id: "wod5e-mage-arete-attribute" },
  { field: "primaryTrait", id: "wod5e-mage-arete-primary" },
  { field: "secondaryTrait", id: "wod5e-mage-arete-secondary" }
]);

/** Quali campi appartengono a ogni passo dell'Areté semplificata. */
const STEP_OWNS = Object.freeze({
  1: (key) => key === "goal" || key.startsWith("sphere-") || key.startsWith("scope-"),
  2: (key) => ["effectKind", "attributeTrait", "primaryTrait", "secondaryTrait", "skillSpecialty", "coincidental", "vulgar", "witnesses"].includes(key),
  3: (key) => ["prize", "harmony", "pagaCon", "maintained", "maintainedName", "bussola", "bussolaId"].includes(key)
});

function clampLevel(value, max) {
  return Math.min(Math.max(Math.trunc(Number(value) || 0), 0), max);
}

/**
 * Cosa mostra la finestra (8/9). Senza passo (`step` 0) mostra tutto, com'è
 * il tiro pieno. Con un passo mostra solo la sua parte, e le risposte dei
 * passi prima viaggiano come campi nascosti (`carry`): così il conto della
 * riserva e della soglia, e il tiro alla fine, leggono tutto da una finestra.
 */
export function stepContext(step = 0, answers = {}, { traits = { attributes: [], skills: [] }, rollSpheres = [] } = {}) {
  const all = !step;
  const show = {
    goal: all || step === 1,
    spheres: all || step === 1,
    scopes: all || step === 1,
    effect: all || step === 2,
    traits: all || step === 2,
    types: all || step === 2,
    conto: all || step === 3,
    pool: all || step >= 2
  };
  show.side = show.traits || show.types || show.conto;
  const carry = step > 1
    ? {
      goal: String(answers.goal ?? "").trim(),
      spheres: rollSpheres.map((sphere) => ({
        id: sphere.id,
        level: clampLevel(answers[`sphere-${sphere.id}`], sphere.value)
      })),
      scopes: SCOPES.map((id) => ({ id, level: clampLevel(answers[`scope-${id}`], THRESHOLD_CAP) })),
      effect: step === 3,
      effectKind: normalizeEffectKind(answers.effectKind),
      traits: TRAIT_FIELDS.map(({ field, id }) => {
        const trait = findMageRollTrait(traits, answers[field]);
        return { field, id, key: trait ? String(answers[field]) : "", value: trait?.value ?? 0, label: trait?.label ?? "" };
      }),
      coincidental: isChecked(answers.coincidental),
      vulgar: isChecked(answers.vulgar),
      witnesses: isChecked(answers.witnesses)
    }
    : null;
  if (carry) carry.traitLabels = carry.traits.filter((trait) => trait.key).map((trait) => `${trait.label} (${trait.value})`).join(" + ");
  return { step, simple: step > 0, show, carry };
}

/** Le risposte di un passo entrano nel mazzo: le sue vecchie escono prima. */
export function mergeStepAnswers(answers = {}, step = 0, fresh = {}) {
  const owns = STEP_OWNS[step] ?? (() => false);
  const kept = Object.fromEntries(Object.entries(answers).filter(([key]) => !owns(key)));
  return { ...kept, ...fresh };
}

/**
 * Le tre finestre in fila (8/9): `ask(step, answers)` apre la finestra del
 * passo e torna le sue risposte, oppure "back" o "cancel". Indietro riapre
 * il passo prima con le risposte già date; Annulla chiude tutto.
 */
export async function collectSimpleAnswers(ask, steps = 3) {
  let answers = {};
  let step = 1;
  while (step >= 1 && step <= steps) {
    const fresh = await ask(step, answers);
    if (!fresh || fresh === "cancel") return null;
    if (fresh === "back") {
      step -= 1;
      continue;
    }
    answers = mergeStepAnswers(answers, step, fresh);
    step += 1;
  }
  return step < 1 ? null : answers;
}

/** Il flag «Convinzione già rigenerata in questa scena» (9/9). */
export const CONVICTION_SCENE_FLAG = BUSSOLA_SCENE_FLAG;

/**
 * Lanciare dal Grimorio (il Sistema, 16/11): l'incantesimo entra nel riquadro
 * del Tiro della prima pagina, che conta la soglia, il premio, la
 * Quintessenza e il Paradosso come vuole il Sistema; lì si tira coi tre
 * tasti. Vale per il Grimorio comune, per le Formule della matrice e per i
 * vecchi tasti del tiro di Areté. Senza incantesimo la scheda va al
 * riquadro, vuoto. Fino alla 1.40.0 la finestra del Grimorio tirava da sé,
 * col conto di prima.
 */
export async function caricaDalGrimorio(actor, spell = null) {
  const sheet = actor?.sheet;
  if (!sheet) return null;
  if (!sheet.rendered) await sheet.render({ force: true });
  const { caricaNelTiro } = await import("./tiro-scheda.js");
  if (spell) {
    // Le Formule viaggiano col nome della pagina Formule; gli altri col nome del Grimorio comune.
    const id = spell.formula ? `formula:${spell.formula}` : `grimorio:${spell.sharedId ?? spell.name ?? ""}`;
    await caricaNelTiro(sheet, id, spell);
  } else {
    sheet.changeTab?.("stats", "primary");
    await sheet.render({ parts: ["stats"] });
  }
  return null;
}

/**
 * La finestra del Grimorio del personaggio (6/9): scrive un incantesimo e
 * torna quello da salvare. Un `preset` (un incantesimo salvato) la riempie
 * prima di aprirla. Col modo «roll» non apre niente: l'incantesimo va nel
 * riquadro del Tiro (caricaDalGrimorio).
 */
export async function launchArete(actor, { mode = "roll", preset = null } = {}) {
  if (mode !== "save") return caricaDalGrimorio(actor, preset);
  const arete = getArete(actor);
  const traits = prepareAreteTraits(actor, {
    localize: game.i18n.localize.bind(game.i18n),
    lang: game.i18n.lang
  });
  // Il premio vale per ogni Tipo di Magick, l'Ibrida compresa (2/10): la soglia scende di quant'è l'Areté.
  const prize = { dice: calculateAretePrize(arete.value) };
  // Le Sfere conosciute sono i Domini (Blue, 25/9 sera): niente livelli, la
  // Sfera si sceglie e basta, un segno solo per Sfera.
  const rollSpheres = prepareSpheres(actor).selected.map((sphere) => ({ ...sphere, steps: [{ value: 1 }] }));
  const localize = game.i18n.localize.bind(game.i18n);
  const readingFor = dotReadings(localize, { arete: arete.value });
  // Gli Ambiti a sette pallini l'uno, i livelli da 1 a 7 (Blue, 2/10: via il
  // pallino dello 0). In cima l'Epicità, staccata, che parte da 1.
  const scopeOptions = SCOPES.map((id) => ({
    id,
    label: `WOD5E_MAGE.Scopes.${id}`,
    base: id === EPIC_SCOPE,
    min: scopeMin(id),
    faIcon: SCOPE_ICONS[id] ?? "",
    steps: Array.from({ length: THRESHOLD_CAP }, (_, index) => ({ value: index + 1 }))
  }));
  const sphereLevelsOwned = Object.fromEntries(rollSpheres.map((sphere) => [sphere.id, sphere.value]));
  // Le Specializzazioni di ogni Abilità, sulle opzioni della tendina.
  const specialtyNames = skillSpecialtyNames(actor);
  const skillsWithSpecialties = traits.skills.map((trait) => ({ ...trait, specialties: (specialtyNames[trait.id] ?? []).join(", ") }));
  const content = await foundry.applications.handlebars.renderTemplate(
    "modules/wod5e-mage/templates/dialogs/arete-roll.hbs",
    { arete, prize, spheres: rollSpheres, scopes: scopeOptions, saveMode: true, preset, ...traits, skills: skillsWithSpecialties, ...stepContext(0, {}, { traits, rollSpheres }) }
  );
  const result = await foundry.applications.api.DialogV2.input({
    window: { title: localize("WOD5E_MAGE.Incantesimi.DialogTitle") },
    // Una finestra compatta: due colonne, niente muri di testo.
    position: { width: 940, height: "auto" },
    content,
    ok: { icon: "fas fa-floppy-disk", label: localize("WOD5E_MAGE.Incantesimi.Save") },
    buttons: [{ action: "cancel", icon: "fas fa-times", label: localize("WOD5E.Cancel") }],
    classes: ["wod5e", "wod5e-mage", "mage", actor.system.gamesystem, "wod5e-mage-roll-dialog"],
    render: (_event, dialog) => {
      makeMagickTypeExclusive(dialog);
      wireDotRows(dialog, readingFor);
      wireDifficulty(dialog);
      wireScopeTable(dialog);
      wireMaintainedEffect(dialog);
      wireGrimorio(dialog, sphereLevelsOwned);
      applyAretePreset(dialog, preset);
    }
  });
  if (!result || result === "cancel") return null;
  // Il Grimorio: niente tiro, torna quel che si è scelto, da salvare.
  return spellFromResult(actor, result, { traits, rollSpheres, localize });
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
    effect: effect.goal,
    status: game.i18n.localize(maintained ? "WOD5E_MAGE.OngoingMagick.MaintainedStatus" : "WOD5E_MAGE.OngoingMagick.RunningStatus"),
    caster: effect.caster ?? String(actor.name ?? ""),
    spheres: effect.spheres ?? [],
    scopes: effect.scopes ?? {},
    composition: effect.composition ?? "",
    scopesText: effect.scopesText ?? "",
    modifiers: effect.modifiers ?? ""
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
