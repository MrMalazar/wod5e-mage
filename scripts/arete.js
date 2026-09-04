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
import { SCOPES } from "./scopes.js";
import { FOCUS_FORMS } from "./focus.js";

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

/** La riserva del ramo A: due tratti e basta, l'Areté non tira. */
export function calculateAreteTraitPool(firstTrait, secondTrait) {
  return (
    Math.max(Number(firstTrait) || 0, 0)
    + Math.max(Number(secondTrait) || 0, 0)
  );
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

/** L'Armonia: un dado, o due, mai di più. */
export function normalizeHarmony(value) {
  return Math.min(Math.max(Math.trunc(Number(value) || 0), 0), 2);
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

/**
 * La soglia del ramo A: il maggiore fra la Sfera più alta e l'Ambito più
 * alto, +1 per ogni Ambito oltre il primo, +1 piatto con tre o più Sfere,
 * tetto 7. Gli Ambiti valgono da 1 a 7.
 */
export function calculateMagickThreshold({ sphereLevels = [], scopeLevels = [] } = {}) {
  const spheres = sphereLevels
    .map((level) => Math.max(Math.trunc(Number(level) || 0), 0))
    .filter((level) => level > 0);
  const scopes = scopeLevels
    .map((level) => Math.min(Math.max(Math.trunc(Number(level) || 0), 1), THRESHOLD_CAP));
  if (!spheres.length && !scopes.length) return 0;

  const highest = Math.max(0, ...spheres, ...scopes);
  const extraScopes = Math.max(scopes.length - 1, 0);
  const manySpheres = spheres.length >= 3 ? 1 : 0;
  return Math.min(highest + extraScopes + manySpheres, THRESHOLD_CAP);
}

/** Vittoria automatica: riserva almeno doppia della soglia, non si tira. */
export function isAutomaticVictory(pool, threshold) {
  const goal = Math.max(Math.trunc(Number(threshold) || 0), 0);
  return goal > 0 && Math.max(Math.trunc(Number(pool) || 0), 0) >= goal * 2;
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

/** Gli Ambiti li aggiunge il giocatore: il + accoda una riga tendina+Lvl. */
function wireScopeRows(dialog) {
  const root = dialog?.element;
  const list = root?.querySelector("[data-role=scopeRows]");
  const addButton = root?.querySelector("[data-role=scopeAdd]");
  const rowTemplate = root?.querySelector("template[data-role=scopeRowTemplate]");
  if (!list || !addButton || !rowTemplate) return;

  const addRow = () => {
    const index = list.querySelectorAll(".wod5e-mage-arete-scope-row").length;
    const fragment = rowTemplate.content.cloneNode(true);
    const select = fragment.querySelector("select");
    const level = fragment.querySelector("input");
    if (select) select.name = `scope-${index}`;
    if (level) level.name = `scope-lvl-${index}`;
    list.appendChild(fragment);
  };

  addButton.addEventListener("click", (event) => {
    event.preventDefault();
    addRow();
  });

  // Una riga pronta all'apertura: le altre le chiede il giocatore col +.
  addRow();
}

function optionValue(select) {
  const option = select?.selectedOptions?.[0];
  return Math.max(Math.trunc(Number(option?.dataset?.value) || 0), 0);
}

/** Il conto vivo: riserva (due tratti, premio, Armonia) contro soglia. */
function wireDifficulty(dialog) {
  const root = dialog?.element;
  const boxes = [...(root?.querySelectorAll(".wod5e-mage-arete-sphere-box") ?? [])];
  const thresholdOut = root?.querySelector("[data-role=threshold]");
  const poolOut = root?.querySelector("[data-role=pool]");
  const autoOut = root?.querySelector("[data-role=autoVictory]");
  if (!thresholdOut || !poolOut) return;

  const primary = root.querySelector("#wod5e-mage-arete-primary");
  const secondary = root.querySelector("#wod5e-mage-arete-secondary");
  const prizeBox = root.querySelector("input[name=prize]");
  const harmony = root.querySelector("#wod5e-mage-arete-harmony");

  const update = () => {
    const sphereLevels = boxes
      .filter((box) => box.checked)
      .map((box) => Math.max(Math.trunc(Number(box.dataset.level) || 0), 0));
    const scopeLevels = [];
    root.querySelectorAll(".wod5e-mage-arete-scope-row").forEach((row) => {
      const select = row.querySelector("select");
      if (!select?.value) return;
      scopeLevels.push(Number(row.querySelector("input")?.value) || 1);
    });
    const threshold = calculateMagickThreshold({ sphereLevels, scopeLevels });

    const prizeDice = prizeBox?.checked
      ? Math.max(Math.trunc(Number(prizeBox.dataset.value) || 0), 0)
      : 0;
    const bonus = capBonusDice(prizeDice + normalizeHarmony(harmony?.value));
    const pool = calculateAreteTraitPool(optionValue(primary), optionValue(secondary)) + bonus;

    thresholdOut.textContent = String(threshold);
    poolOut.textContent = String(pool);
    autoOut?.classList.toggle("hidden", !isAutomaticVictory(pool, threshold));
  };

  boxes.forEach((box) => box.addEventListener("change", update));
  [primary, secondary, prizeBox, harmony].forEach((control) => {
    control?.addEventListener("change", update);
  });
  // Le righe degli Ambiti sono dinamiche: si ascolta il contenitore.
  const list = root?.querySelector("[data-role=scopeRows]");
  list?.addEventListener("change", update);
  list?.addEventListener("input", update);
  update();
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
async function postAutomaticVictory(actor, title, flavor) {
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    flavor: title,
    content: `<p>${flavor}</p>`
  });
}

export async function onAreteRoll(event) {
  event.preventDefault();

  const actor = this.actor;
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
  const rollSpheres = prepareSpheres(actor).selected
    .filter((sphere) => sphere.value > 0)
    .map((sphere) => ({
      ...sphere,
      steps: Array.from({ length: 5 }, (_, index) => ({ active: index < sphere.value }))
    }));
  // I sei Ambiti, per la tendina.
  const scopeOptions = SCOPES.map((id) => ({ id, label: `WOD5E_MAGE.Scopes.${id}` }));
  const content = await foundry.applications.handlebars.renderTemplate(
    "modules/wod5e-mage/templates/dialogs/arete-roll.hbs",
    { arete, prize, spheres: rollSpheres, scopes: scopeOptions, ...traits }
  );

  const result = await foundry.applications.api.DialogV2.input({
    window: {
      title: game.i18n.localize("WOD5E_MAGE.Arete.Roll")
    },
    // La finestra segue la dimensione naturale dell'intero contenuto; il CSS
    // mantiene form e controlli al 100% senza tagliare i tre selettori.
    position: {
      width: "auto",
      height: "auto"
    },
    content,
    ok: {
      icon: "fas fa-dice",
      label: game.i18n.localize("WOD5E_MAGE.Arete.Roll")
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
      wireScopeRows(dialog);
      wireDifficulty(dialog);
      wireMaintainedEffect(dialog);
    }
  });

  if (!result || result === "cancel") return;

  const selectedFirstTrait = findMageRollTrait(traits, result.primaryTrait);
  const selectedSecondTrait = findMageRollTrait(traits, result.secondaryTrait);
  // La riserva è un'Abilità più un'Abilità o un Attributo: mai due Attributi.
  if (!selectedFirstTrait || !selectedSecondTrait || selectedFirstTrait.type !== "skill") {
    ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.Arete.SelectTraitWarning"));
    return;
  }

  const options = normalizeMagickRollOptions(result);
  const sphereLevels = rollSpheres
    .filter((sphere) => isChecked(result[`sphere-${sphere.id}`]))
    .map((sphere) => sphere.value);

  // Gli Ambiti dichiarati (righe aggiunte dal giocatore col +), col livello
  // da 1 a 7: fanno soglia, e il piano finisce nel testo del tiro in chat.
  const scopeEntries = Object.entries(result)
    .map(([key, value]) => {
      const match = key.match(/^scope-(\d+)$/);
      if (!match) return null;
      const scopeId = String(value ?? "");
      if (!SCOPES.includes(scopeId)) return null;
      const level = Math.min(
        Math.max(Math.trunc(Number(result[`scope-lvl-${match[1]}`]) || 1), 1),
        THRESHOLD_CAP
      );
      return { scopeId, level };
    })
    .filter(Boolean);

  const threshold = calculateMagickThreshold({
    sphereLevels,
    scopeLevels: scopeEntries.map((entry) => entry.level)
  });

  const prizeDice = options.usePrize ? prize.dice : 0;
  const bonusDice = prizeDice + options.harmony;
  const basePool = calculateAreteTraitPool(selectedFirstTrait.value, selectedSecondTrait.value);
  const dicePool = basePool + capBonusDice(bonusDice);
  const rollLabel = game.i18n.format("WOD5E_MAGE.Arete.Rolling", {
    first: selectedFirstTrait.label,
    second: selectedSecondTrait.label
  });
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

  const selectors = [
    ...selectorsForMageRollTrait(selectedFirstTrait),
    ...selectorsForMageRollTrait(selectedSecondTrait)
  ];
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
  let flavor = game.i18n.format("WOD5E_MAGE.Arete.RollFlavor", {
    first: selectedFirstTrait.label,
    firstValue: selectedFirstTrait.value,
    second: selectedSecondTrait.label,
    secondValue: selectedSecondTrait.value,
    bonus: bonusParts.length ? ` + ${bonusParts.join(" + ")}` : "",
    threshold,
    magickType
  });

  const scopePlans = scopeEntries.map((entry) => {
    const scopeLabel = game.i18n.localize(`WOD5E_MAGE.Scopes.${entry.scopeId}`);
    return `${scopeLabel} ${entry.level}`;
  });
  if (scopePlans.length) {
    flavor += ` ${game.i18n.format("WOD5E_MAGE.Arete.ScopePlan", { plans: scopePlans.join(", ") })}`;
  }

  // La vittoria automatica: riserva almeno doppia della soglia, non si tira.
  // Nel Volgare si tirano comunque i soli dadi rossi, per il Contraccolpo;
  // se scatta, l'Ustione è pari alla soglia.
  const automatic = isAutomaticVictory(dicePool, threshold);
  const paradoxGain = paradoxGainForMagickType(options);
  if (automatic && paradoxGain === 0) {
    flavor += ` ${game.i18n.format("WOD5E_MAGE.Arete.AutoVictoryChat", { pool: dicePool, threshold })}`;
    await postAutomaticVictory(actor, rollLabel, flavor);
    await addMaintainedEffect(actor, result);
    return;
  }

  // La Magick volgare paga subito: la Ruota si sposta verso il Paradosso prima
  // del tiro, così i dadi Paradosso di questo tiro contano già il rincaro.
  const balanceBefore = getMagickBalance(actor);
  let balanceMoved = false;

  if (paradoxGain > 0 && actor.isOwner) {
    const balanceAfter = addParadoxToBalance(balanceBefore, paradoxGain);
    if (
      balanceAfter.paradox !== balanceBefore.paradox
      || balanceAfter.quintessence !== balanceBefore.quintessence
    ) {
      await actor.setFlag(MODULE_ID, "magickBalance", balanceAfter);
      balanceMoved = true;
      ui.notifications.info(
        game.i18n.format("WOD5E_MAGE.MagickBalance.ParadoxGained", { amount: paradoxGain })
      );
    }
  }

  const paradoxRating = getMagickBalance(actor).paradox;

  if (automatic) {
    flavor += ` ${game.i18n.format("WOD5E_MAGE.Arete.RedOnly", { pool: dicePool, threshold, burn: threshold })}`;
    if (paradoxRating === 0) {
      // Niente rossi da tirare: la vittoria resta automatica, e basta.
      await postAutomaticVictory(actor, rollLabel, flavor);
      await addMaintainedEffect(actor, result);
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
      arete: arete.value,
      title: rollLabel,
      flavor,
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

  if (rolled) await addMaintainedEffect(actor, result);
}

/**
 * L'Effetto Mantenuto dichiarato nel dialogo, a tiro risolto, si scrive da
 * solo fra le Magick in Atto della pagina Magick.
 */
async function addMaintainedEffect(actor, result) {
  const maintainedName = String(result.maintainedName ?? "").trim();
  if (!isChecked(result.maintained) || !maintainedName || !actor.isOwner) return;

  const rows = { ...(actor.getFlag(MODULE_ID, "ongoingMagick") ?? {}) };
  let rowId = foundry.utils.randomID();
  while (rows[rowId]) rowId = foundry.utils.randomID();

  rows[rowId] = {
    nameSpheres: maintainedName,
    status: game.i18n.localize("WOD5E_MAGE.OngoingMagick.MaintainedStatus"),
    triggerEffect: ""
  };

  await actor.setFlag(MODULE_ID, "ongoingMagick", rows);
  ui.notifications.info(
    game.i18n.format("WOD5E_MAGE.OngoingMagick.MaintainedAdded", { name: maintainedName })
  );
}
