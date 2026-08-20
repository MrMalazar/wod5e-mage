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

export function calculateAreteTraitPool(arete, firstTrait, secondTrait) {
  return (
    Math.max(Number(arete) || 0, 0)
    + Math.max(Number(firstTrait) || 0, 0)
    + Math.max(Number(secondTrait) || 0, 0)
  );
}

function isChecked(value) {
  return value === true || value === "true" || value === "on";
}

export function normalizeMagickRollOptions({
  arete = false,
  coincidental = false,
  vulgar = false,
  witnesses = false
} = {}) {
  const options = {
    // Il valore resta fissato dai pallini della scheda, ma entra nella riserva
    // soltanto quando il giocatore seleziona la casella del dialogo.
    useArete: isChecked(arete),
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

function findTraitById(traits, id) {
  return traits.find((trait) => trait.id === id);
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

export async function onAreteRoll(event) {
  event.preventDefault();

  const actor = this.actor;
  const arete = getArete(actor);
  const traits = prepareAreteTraits(actor, {
    localize: game.i18n.localize.bind(game.i18n),
    lang: game.i18n.lang
  });
  const content = await foundry.applications.handlebars.renderTemplate(
    "modules/wod5e-mage/templates/dialogs/arete-roll.hbs",
    { arete, ...traits }
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
    classes: ["wod5e", actor.system.gamesystem, "wod5e-mage-roll-dialog"],
    render: (_event, dialog) => makeMagickTypeExclusive(dialog)
  });

  if (!result || result === "cancel") return;

  const selectedSkill = findTraitById(traits.skills, result.primarySkill);
  const selectedSecondTrait = findMageRollTrait(traits, result.secondaryTrait);
  if (!selectedSkill || !selectedSecondTrait) {
    ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.Arete.SelectTraitWarning"));
    return;
  }

  const options = normalizeMagickRollOptions(result);
  // Il valore di Areté non è modificabile nel dialogo: la casella decide solo
  // se sommare o meno il valore impostato tramite i pallini della scheda.
  const areteValue = options.useArete ? arete.value : 0;
  const dicePool = calculateAreteTraitPool(
    areteValue,
    selectedSkill.value,
    selectedSecondTrait.value
  );
  const rollLabel = game.i18n.format(
    options.useArete ? "WOD5E_MAGE.Arete.Rolling" : "WOD5E_MAGE.Arete.RollingNoArete",
    {
      first: selectedSkill.label,
      second: selectedSecondTrait.label
    }
  );
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
    "skills",
    `skills.${selectedSkill.id}`,
    ...selectorsForMageRollTrait(selectedSecondTrait)
  ];
  if (options.useArete) selectors.unshift("arete");
  if (options.coincidental) selectors.push("magick.coincidental");
  if (options.vulgar) selectors.push("magick.vulgar");
  if (options.witnesses) selectors.push("magick.vulgar-with-witnesses");
  // Rimuove i duplicati generati quando si selezionano due abilità.
  const uniqueSelectors = [...new Set(selectors)];

  // La Magick volgare paga subito: la Ruota si sposta verso il Paradosso prima
  // del tiro, così i dadi Paradosso di questo tiro contano già il rincaro.
  const balanceBefore = getMagickBalance(actor);
  const paradoxGain = paradoxGainForMagickType(options);
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
  const flavor = game.i18n.format(
    options.useArete
      ? "WOD5E_MAGE.Arete.RollFlavor"
      : "WOD5E_MAGE.Arete.RollFlavorNoArete",
    {
      arete: areteValue,
      first: selectedSkill.label,
      firstValue: selectedSkill.value,
      second: selectedSecondTrait.label,
      secondValue: selectedSecondTrait.value,
      magickType
    }
  );

  // Load the Foundry-specific dice implementation only when an Areté roll is
  // actually requested. Keeping it out of the data helpers also lets their
  // pure validation tests run outside Foundry.
  const { rollAreteWithParadox } = await import("./paradox-dice.js");

  let outcome = null;
  try {
    outcome = await rollAreteWithParadox({
      dicePool,
      paradoxRating,
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
}
