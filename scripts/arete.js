import { MODULE_ID } from "./constants.js";
import {
  addParadoxToBalance,
  applyMagickBalanceDelta,
  getMagickBalance,
  MAGICK_TRACK_MAX,
  paradoxGainForMagickType
} from "./magick-balance.js";
import { quintessenceSpend, ramoCDice } from "./ramo-c.js";
import { BUSSOLA_DICE, BUSSOLA_SCENE_FLAG, bussolaChoice, grantBussolaQuintessence, prepareBussolaChoice, renderBussolaBlock, wireBussola } from "./bussola.js";
import {
  findMageRollTrait,
  prepareMageRollTraits,
  selectorsForMageRollTrait
} from "./mage-roll-selection.js";
import { INFLUENCE_LABELS, prepareSpheres } from "./spheres.js";
import { prepareScopeTable, scopeReadings, SCOPE_ICONS, SCOPES } from "./scopes.js";
import {
  ROLL_CARD_FLAG,
  renderRollCard,
  rollSymbols
} from "./roll-card.js";
import { FOCUS_FORMS, PERCEIVE_TOOL_ID } from "./focus.js";
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
 * Il premio dell'Areté (Blue, 16/9): l'Areté si sottrae alla soglia, per
 * intero, fino a zero, quando la narrazione lo merita (rispetta lo
 * Strumento, o il Credo, o inventa un effetto fuori dalle tavole) e il
 * Narratore dà l'ok: la casella resta per questo. Non è un dado in più: il
 * tetto +3 non lo riguarda. La Magick Ibrida non lo prende mai.
 */
export function calculateAretePrize(arete, form = "") {
  if (form === "ibrida") return 0;
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
 * La soglia (Blue, 16/9): la SOMMA dei livelli degli Ambiti dichiarati,
 * Potenza 4 e Portata 3 fanno 7. Un Ambito a 1 vale zero (11/9), dal 2 in
 * su vale il suo livello. Le Sfere non contano più. Niente tetto sulla
 * somma. Il premio dell'Areté si sottrae una volta sola, fino a zero.
 */
export const SCOPE_COUNTS_FROM = 2;

export function scopeThreshold(scopeLevels = []) {
  return levelEntries(scopeLevels, THRESHOLD_CAP)
    .filter((entry) => entry.level >= SCOPE_COUNTS_FROM)
    .reduce((sum, entry) => sum + entry.level, 0);
}

export function calculateMagickThreshold({ scopeLevels = [], prize = 0 } = {}) {
  return Math.max(scopeThreshold(scopeLevels) - calculateAretePrize(prize), 0);
}

/**
 * Le Specialità delle Sfere (verdetto di Blue, 4/9 notte, ramo A): quando
 * una Sfera nel lancio ha la Specialità su un Ambito dichiarato, il tiro
 * partiva con tanti successi quanto l'Areté. Nel ramo C un successo è già
 * la riuscita, quindi la stessa coppia dà tanti DADI quanto l'Areté
 * (PROPOSTA del programma, 11/9: da confermare con Blue). Una volta sola,
 * anche con più Specialità in gioco. Torna il conto e le coppie che lo danno.
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

/**
 * La riserva del ramo C prima della soglia: tratti, dadi in più (Armonia e
 * Bonus dentro il tetto), i dadi delle Specialità e la Quintessenza
 * spesa sotto il prezzo della riuscita. Torna i pezzi e il conto dei dadi.
 */
export function ramoCPool({ traits = 0, bonus = 0, specialtyDice = 0, quintessence = 0, sphereMax = 0, threshold = 0 } = {}) {
  const spend = quintessenceSpend(quintessence, sphereMax);
  const pool = Math.max(Math.trunc(Number(traits) || 0), 0)
    + capBonusDice(bonus)
    + Math.max(Math.trunc(Number(specialtyDice) || 0), 0)
    + spend.dice;
  return { ...ramoCDice(pool, threshold), spend };
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
    // Il giocatore spunta il premio: l'Areté della scheda riduce la soglia.
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
    // Il nome della lettura (Dettaglio, Epicità…) non si scrive più (Blue,
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
    if (level <= 0) return [];
    if (kind === "scope") return scopes[id]?.[level - 1] ?? [];
    return spheres[level - 1] ? [{ sub: "", text: spheres[level - 1] }] : [];
  };
}

/**
 * Le file a pallini di Sfere e Ambiti: il clic su un pallino fissa il
 * livello (di nuovo sullo stesso: zero), lo scrive nel campo nascosto e
 * scrive la voce del livello a destra.
 */
function wireDotRows(dialog, readingFor = () => []) {
  const root = dialog?.element;
  root?.querySelectorAll("[data-role=dotRow]").forEach((row) => {
    const input = row.querySelector("input[type=hidden]");
    const dots = [...row.querySelectorAll(".wod5e-mage-arete-sphere-dot")];
    const reading = row.querySelector("[data-role=dotReading]");
    if (!input) return;

    const paint = () => {
      const level = Math.max(Math.trunc(Number(input.value) || 0), 0);
      dots.forEach((dot) => {
        dot.classList.toggle("active", Number(dot.dataset.level) <= level);
      });
      row.classList.toggle("chosen", level > 0);
      if (reading) paintReading(reading, readingFor(row.dataset.kind, row.dataset.id, level), Number(row.dataset.reading) || 0);
    };
    // Il tasto accanto alla voce: la lettura dopo (Peso, Epicità, Danni…).
    reading?.querySelector("[data-role=readingSwitch]")?.addEventListener("click", (event) => {
      event.preventDefault();
      row.dataset.reading = String((Number(row.dataset.reading) || 0) + 1);
      paint();
    });

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
  // Una select legge l'opzione scelta; un campo nascosto (i tratti che
  // viaggiano fra i passi dell'Areté semplificata) porta il valore da sé.
  const option = select?.selectedOptions?.[0] ?? select;
  return Math.max(Math.trunc(Number(option?.dataset?.value) || 0), 0);
}

/** Il conto vivo: riserva contro la somma degli Ambiti, ridotta dal premio. */
function wireDifficulty(dialog) {
  const root = dialog?.element;
  const thresholdOut = root?.querySelector("[data-role=threshold]");
  const poolOut = root?.querySelector("[data-role=pool]");
  const autoOut = root?.querySelector("[data-role=autoVictory]");
  const diceOut = root?.querySelector("[data-role=dice]");
  if (!thresholdOut || !poolOut) return;

  const attribute = root.querySelector("#wod5e-mage-arete-attribute");
  const primary = root.querySelector("#wod5e-mage-arete-primary");
  const secondary = root.querySelector("#wod5e-mage-arete-secondary");
  const prizeBox = root.querySelector("input[name=prize]");
  const harmony = root.querySelector("#wod5e-mage-arete-harmony");
  const quintessence = root.querySelector("#wod5e-mage-arete-quintessence");
  const buyButton = root.querySelector("[data-role=buySuccess]");
  const buyPriceOut = root.querySelector("[data-role=buyPrice]");
  // La Specializzazione dell'Abilità (11/9: al posto della seconda Abilità)
  // e la Bussola rispettata: un dado l'una, fuori dal tetto +3.
  const specialtyBox = root.querySelector("input[name=skillSpecialty]");
  const specialtyNames = root.querySelector("[data-role=specialtyNames]");
  const bussolaBox = root.querySelector("input[name=bussola]");

  const autoSuccessOut = root.querySelector("[data-role=autoSuccesses]");
  const areteValue = Math.max(Math.trunc(Number(root.querySelector("[data-arete]")?.dataset.arete) || 0), 0);

  const update = () => {
    const sphereLevels = readDotRows(root, "sphere");
    const scopeLevels = readDotRows(root, "scope");
    const prizeReduction = prizeBox?.checked && !prizeBox.disabled
      ? calculateAretePrize(prizeBox.dataset.value)
      : 0;
    const threshold = calculateMagickThreshold({ scopeLevels, prize: prizeReduction });
    const quintessenceMax = Math.max(Math.trunc(Number(quintessence?.max) || 0), 0);
    const quintessenceSpent = Math.min(Math.max(Math.trunc(Number(quintessence?.value) || 0), 0), quintessenceMax);
    const specialtyDice = calculateAutomaticSuccesses({
      sphereLevels,
      scopeLevels,
      specialties: readSpecialties(root),
      arete: areteValue
    }).successes;

    const sphereMax = Math.max(0, ...sphereLevels.map((entry) => entry.level));
    // Il ramo C: riserva meno soglia uguale dadi; la Quintessenza al prezzo
    // della Sfera compra la riuscita, sotto il prezzo è un dado per punto.
    if (specialtyNames) {
      const names = primary?.selectedOptions?.[0]?.dataset?.specialties ?? "";
      specialtyNames.textContent = names ? `(${names})` : "";
    }
    const extraDice = (specialtyBox?.checked ? SKILL_SPECIALTY_DICE : 0) + (bussolaBox?.checked ? BUSSOLA_DICE : 0);
    const conto = ramoCPool({
      traits: calculateAreteTraitPool(optionValue(attribute), optionValue(primary), optionValue(secondary)),
      bonus: normalizeHarmony(harmony?.value) + extraDice,
      specialtyDice,
      quintessence: quintessenceSpent,
      sphereMax,
      threshold
    });

    thresholdOut.textContent = String(conto.threshold);
    poolOut.textContent = String(conto.pool);
    if (diceOut) diceOut.textContent = String(conto.dice);
    if (autoSuccessOut) {
      const parts = [];
      if (specialtyDice > 0) parts.push(game.i18n.format("WOD5E_MAGE.Arete.SpecialtyDice", { dice: specialtyDice }));
      if (sphereMax > 0 && quintessenceMax > 0) parts.push(game.i18n.format("WOD5E_MAGE.RamoC.BuyPrice", { price: sphereMax }));
      autoSuccessOut.textContent = parts.length ? `· ${parts.join(" · ")}` : "";
    }
    autoOut?.classList.toggle("hidden", !conto.spend.bought);
    // Il tasto «Compra la riuscita» (11/9): c'è quando c'è una Sfera e una
    // Ruota con Quintessenza; acceso se i punti bastano, spento col perché.
    if (buyButton) {
      const show = sphereMax > 0 && quintessenceMax > 0 && !conto.spend.bought;
      buyButton.hidden = !show;
      buyButton.disabled = quintessenceMax < sphereMax;
      buyButton.title = quintessenceMax >= sphereMax
        ? game.i18n.format("WOD5E_MAGE.Compra.DialogHint", { price: sphereMax })
        : game.i18n.format("WOD5E_MAGE.Compra.DialogPoor", { price: sphereMax, quintessence: quintessenceMax });
      if (buyPriceOut) buyPriceOut.textContent = String(sphereMax);
    }
  };
  buyButton?.addEventListener("click", (event) => {
    event.preventDefault();
    if (!quintessence || buyButton.disabled) return;
    const sphereMax = Math.max(0, ...readDotRows(root, "sphere").map((entry) => entry.level));
    quintessence.value = String(sphereMax);
    update();
  });

  [attribute, primary, secondary, prizeBox, harmony, quintessence, specialtyBox, bussolaBox].forEach((control) => {
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
  // Un effetto percettivo (tutte le Sfere al primo pallino) usa lo Strumento
  // di Percepire (9/9), se c'è; altrimenti gli Strumenti delle Sfere usate.
  const perceptive = Object.keys(spheres).length > 0 && Object.values(spheres).every((level) => level <= 1);
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

export async function onAreteRoll(event) {
  event.preventDefault();
  return launchArete(this.actor, { mode: "roll" });
}

/** L'Areté semplificata (8/9): lo stesso tiro, in tre finestre, una alla volta. */
export async function onAreteSimple(event) {
  event.preventDefault();
  return launchArete(this.actor, { mode: "roll", simple: true });
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
  3: (key) => ["prize", "harmony", "quintessence", "maintained", "maintainedName", "bussola", "bussolaId"].includes(key)
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
        level: clampLevel(answers[`sphere-${sphere.id}`], sphere.value),
        specialty: sphere.specialtyScope ?? ""
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

/**
 * Le risposte già date riempiono la finestra: quando si torna indietro, il
 * giocatore ritrova quel che aveva scelto. I campi nascosti portano già il
 * loro valore dal template; qui si riempiono i comandi visibili.
 */
function applyAreteAnswers(dialog, answers) {
  const root = dialog?.element;
  if (!root || !answers) return;
  for (const [name, value] of Object.entries(answers)) {
    const field = root.querySelector(`[name="${name}"]`);
    if (!field) continue;
    if (field.type === "checkbox") {
      field.checked = isChecked(value);
    } else if (field.closest?.("[data-role=dotRow]")) {
      const row = field.closest("[data-role=dotRow]");
      const dots = row.querySelectorAll(".wod5e-mage-arete-sphere-dot").length;
      // Una fila nascosta (un passo dopo il primo) ha già il valore dal template.
      if (!dots) continue;
      field.value = String(clampLevel(value, dots));
      row._paint?.();
    } else if (field.type === "hidden") {
      continue;
    } else {
      field.value = value ?? "";
    }
    field.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

/** Il flag «Convinzione già rigenerata in questa scena» (9/9). */
export const CONVICTION_SCENE_FLAG = BUSSOLA_SCENE_FLAG;

/**
 * La finestra del tiro di Areté, in due modi: «roll» tira; «save» (il
 * Grimorio del personaggio, 6/9) non tira e torna l'incantesimo da salvare.
 * Un `preset` (un incantesimo salvato) riempie la finestra prima di aprirla.
 */
export async function launchArete(actor, { mode = "roll", preset = null, simple = false } = {}) {
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
    reduction: calculateAretePrize(arete.value, form),
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
  const localize = game.i18n.localize.bind(game.i18n);
  const readingFor = dotReadings(localize, { arete: arete.value });
  // La Bussola rispettata (11/9, al posto della Convinzione del 9/9): Ambizione,
  // Desiderio e Convinzioni in tendina, un dado in più e +1 Quintessenza a tiro fatto.
  const bussola = prepareBussolaChoice(actor);
  const bussolaHtml = saveMode ? "" : renderBussolaBlock(bussola, localize);
  // Le Specializzazioni di ogni Abilità, sulle opzioni della tendina.
  const specialtyNames = skillSpecialtyNames(actor);
  const skillsWithSpecialties = traits.skills.map((trait) => ({ ...trait, specialties: (specialtyNames[trait.id] ?? []).join(", ") }));
  const base = { arete, prize, spheres: rollSpheres, scopes: scopeOptions, quintessence: quintessenceAvailable, saveMode, preset, bussolaHtml, ...traits, skills: skillsWithSpecialties };

  // Una finestra: tutta (step 0) o un passo dell'Areté semplificata (1, 2, 3).
  const ask = async (step = 0, answers = {}) => {
    const last = !step || step === 3;
    const content = await foundry.applications.handlebars.renderTemplate(
      "modules/wod5e-mage/templates/dialogs/arete-roll.hbs",
      { ...base, ...stepContext(step, answers, { traits, rollSpheres }) }
    );
    const buttons = [];
    if (step > 1) buttons.push({ action: "back", icon: "fas fa-chevron-left", label: localize("WOD5E_MAGE.Arete.Back") });
    buttons.push({ action: "cancel", icon: "fas fa-times", label: localize("WOD5E.Cancel") });
    return foundry.applications.api.DialogV2.input({
      window: {
        title: localize(saveMode ? "WOD5E_MAGE.Incantesimi.DialogTitle" : (step ? "WOD5E_MAGE.Arete.Simple" : "WOD5E_MAGE.Arete.Roll"))
      },
      // Una finestra compatta: due colonne, niente muri di testo. Un passo: una colonna.
      position: {
        width: step ? 620 : 940,
        height: "auto"
      },
      content,
      ok: {
        icon: saveMode ? "fas fa-floppy-disk" : (last ? "fas fa-dice" : "fas fa-chevron-right"),
        label: localize(saveMode ? "WOD5E_MAGE.Incantesimi.Save" : (last ? "WOD5E_MAGE.Arete.Roll" : "WOD5E_MAGE.Arete.Next"))
      },
      buttons,
      classes: ["wod5e", "wod5e-mage", "mage", actor.system.gamesystem, "wod5e-mage-roll-dialog", ...(step ? ["wod5e-mage-arete-simple-dialog"] : [])],
      render: (_event, dialog) => {
        makeMagickTypeExclusive(dialog);
        wireDotRows(dialog, readingFor);
        wireDifficulty(dialog);
        wireScopeTable(dialog);
        wireMaintainedEffect(dialog);
        wireBussola(dialog.element, actor);
        wireGrimorio(dialog, sphereLevelsOwned);
        applyAretePreset(dialog, preset);
        applyAreteAnswers(dialog, answers);
      }
    });
  };

  const result = simple ? await collectSimpleAnswers(ask) : await ask(0, {});

  if (!result || result === "cancel") return null;

  // Il Grimorio: niente tiro, torna quel che si è scelto, da salvare.
  if (saveMode) {
    return spellFromResult(actor, result, { traits, rollSpheres, localize });
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

  const prizeReduction = options.usePrize ? prize.reduction : 0;
  const threshold = calculateMagickThreshold({
    prize: prizeReduction,
    scopeLevels: scopeEntries.map((entry) => ({ id: entry.scopeId, level: entry.level }))
  });
  // Le Specialità (ramo C): dadi pari all'Areté, la soglia non si tocca.
  const specialty = calculateAutomaticSuccesses({
    sphereLevels: sphereEntries,
    scopeLevels: scopeEntries.map((entry) => ({ id: entry.scopeId, level: entry.level })),
    specialties,
    arete: arete.value
  });
  // La Quintessenza spesa (ramo C, 11/9): un punto vale un dado; punti pari
  // al livello della Sfera più alta comprano la riuscita senza tirare (i
  // rossi si tirano comunque). Scende dalla Ruota; se l'effetto fa danni,
  // sono aggravati.
  const quintessence = Math.min(Math.max(Math.trunc(Number(result.quintessence) || 0), 0), quintessenceAvailable);
  const sphereMax = Math.max(0, ...sphereEntries.map((entry) => entry.level));
  // La Bussola rispettata (11/9): un dado in più ora, +1 Quintessenza a tiro fatto, una volta per scena.
  const bussolaKept = bussolaChoice(result, bussola);
  // La Specializzazione dell'Abilità (11/9): un dado in più, fuori dal tetto.
  const specialtyDie = isChecked(result.skillSpecialty) ? SKILL_SPECIALTY_DICE : 0;
  const goal = String(result.goal ?? "").trim();
  const effectKind = normalizeEffectKind(result.effectKind);

  const bonusDice = options.harmony;
  const extraDice = specialtyDie + (bussolaKept ? BUSSOLA_DICE : 0);
  const basePool = calculateAreteTraitPool(...selectedTraits.map((trait) => trait.value));
  const conto = ramoCPool({
    traits: basePool,
    bonus: bonusDice + extraDice,
    specialtyDice: specialty.successes,
    quintessence,
    sphereMax,
    threshold
  });
  const bought = conto.spend.bought;
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
  if (options.harmony > 0) {
    bonusParts.push(game.i18n.format("WOD5E_MAGE.Arete.HarmonyFlavor", { dice: options.harmony }));
  }
  if (quintessence > 0) {
    bonusParts.push(bought
      ? game.i18n.format("WOD5E_MAGE.RamoC.BoughtFlavor", { points: quintessence, price: sphereMax })
      : game.i18n.format("WOD5E_MAGE.Arete.QuintessenceFlavor", { points: quintessence }));
  }
  if (specialtyDie > 0) {
    bonusParts.push(game.i18n.format("WOD5E_MAGE.Arete.SkillSpecialtyFlavor", { dice: specialtyDie }));
  }
  if (bussolaKept) {
    bonusParts.push(game.i18n.format("WOD5E_MAGE.Bussola.Flavor", { label: bussolaKept.label }));
  }
  if (specialty.successes > 0) {
    bonusParts.push(game.i18n.format("WOD5E_MAGE.Arete.SpecialtyDiceFlavor", {
      dice: specialty.successes,
      pairs: specialty.pairs.map((pair) => `${game.i18n.localize(`WOD5E_MAGE.Spheres.${pair.sphere}`)} ◆ ${game.i18n.localize(`WOD5E_MAGE.Scopes.${pair.scope}`)}`).join(", ")
    }));
  }
  // La carta del tiro: una riga per voce sotto i dadi, i simboli sopra.
  const scopeLevels = scopeEntries.map((entry) => ({ id: entry.scopeId, level: entry.level }));
  const card = renderRollCard({
    traits: selectedTraits.map((trait) => ({ label: trait.label, value: trait.value })),
    bonusParts,
    threshold,
    prize: prizeReduction,
    magickType,
    goal,
    effectKind: effectKind ? `WOD5E_MAGE.Arete.EffectKinds.${effectKind}` : "",
    spheres: sphereEntries.map((entry) => ({ id: entry.id, label: `WOD5E_MAGE.Spheres.${entry.id}`, level: entry.level })),
    scopes: scopeLevels.map((entry) => ({ id: entry.id, label: `WOD5E_MAGE.Scopes.${entry.id}`, level: entry.level }))
  }, localize);
  const symbols = rollSymbols({ spheres: sphereEntries, scopes: scopeLevels, prize: prizeReduction });
  // Quel che resta del lancio dopo il tiro: nome, tipo, Durata e soglia.
  const effect = {
    vulgar: options.vulgar || options.witnesses,
    duration: scopeEntries.find((entry) => entry.scopeId === "duration")?.level ?? 0,
    threshold,
    goal,
    fallbackName: goal || sphereEntries
      .map((entry) => `${localize(`WOD5E_MAGE.Spheres.${entry.id}`)} ${entry.level}`)
      .join(", ") || rollLabel
  };
  // L'ultima soglia lanciata: la usa lo Scoppio del Paradosso come proposta.
  if (actor.isOwner) await actor.update({ [`flags.${MODULE_ID}.lastThreshold`]: threshold, [`flags.${MODULE_ID}.lastSphereMax`]: sphereMax });
  const flavor = card;

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

  // L'Accidentale non tira i rossi: solo dadi normali. Il Volgare li tira
  // sempre, anche con la riuscita comprata: decidono se scoppia.
  const paradoxRating = options.coincidental ? 0 : getMagickBalance(actor).paradox;

  // Load the Foundry-specific dice implementation only when an Areté roll is
  // actually requested. Keeping it out of the data helpers also lets their
  // pure validation tests run outside Foundry.
  const { rollAreteWithParadox } = await import("./paradox-dice.js");

  let outcome = null;
  try {
    outcome = await rollAreteWithParadox({
      pool: conto.pool,
      threshold,
      witnesses: options.witnesses,
      bonusDice,
      paradoxRating,
      bought,
      burn: threshold,
      sphereLevel: sphereMax,
      effectKind,
      arete: arete.value,
      title: rollLabel,
      flavor,
      card: { symbols, traits: selectedTraits.map((trait) => ({ id: trait.id, type: trait.type, label: trait.label, value: trait.value })), vulgar: effect.vulgar },
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

  if (rolled) {
    // Il Volgare fallito genera un punto di Quintessenza (verdetto dell'11/9):
    // l'energia non spesa torna in casa.
    const total = Number(outcome?.getFlag?.(MODULE_ID, ROLL_CARD_FLAG)?.total);
    if (effect.vulgar && Number.isFinite(total) && total < 1 && actor.isOwner) {
      await grantFailedVulgarQuintessence(actor);
    }
    await grantBussolaQuintessence(actor, bussolaKept);
    await recordEffect(actor, result, effect);
  }
}

/**
 * Il Volgare fallito (ramo C, verdetto dell'11/9): un punto di Quintessenza
 * sale sulla Ruota, come col tasto +; se le nove celle sono piene, prima
 * se ne libera una dal Paradosso (mai sotto il pavimento).
 */
export function quintessenceAfterFailedVulgar(balance) {
  const next = applyMagickBalanceDelta(balance, "quintessence", 1, balance?.floor ?? 0);
  return { ...next, gained: next.quintessence !== balance.quintessence || next.paradox !== balance.paradox };
}

async function grantFailedVulgarQuintessence(actor) {
  const balance = getMagickBalance(actor);
  const next = quintessenceAfterFailedVulgar(balance);
  if (!next.gained) return false;
  await actor.setFlag(MODULE_ID, "magickBalance", { quintessence: next.quintessence, paradox: next.paradox });
  ui.notifications.info(game.i18n.localize("WOD5E_MAGE.RamoC.VulgarFailedQuintessence"));
  return true;
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
