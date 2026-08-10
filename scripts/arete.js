import { MODULE_ID } from "./constants.js";
import {
  addParadoxToBalance,
  getMagickBalance,
  paradoxGainForMagickType
} from "./magick-balance.js";

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

function flattenTraitGroups(groups, type) {
  return Object.values(groups ?? {})
    .flatMap((group) => Array.isArray(group) ? group : [])
    .filter((trait) => trait?.id && !trait.hidden)
    .map((trait) => ({
      key: `${type}:${trait.id}`,
      id: trait.id,
      type,
      label: trait.displayName ?? trait.name ?? trait.id,
      value: Math.max(Number(trait.value) || 0, 0)
    }));
}

export function prepareAreteTraits(actor) {
  return {
    attributes: flattenTraitGroups(actor.system?.sortedAttributes, "attribute"),
    skills: flattenTraitGroups(actor.system?.sortedSkills, "skill")
  };
}

export function calculateAreteTraitPool(arete, attribute, skill) {
  return (
    Math.max(Number(arete) || 0, 0)
    + Math.max(Number(attribute) || 0, 0)
    + Math.max(Number(skill) || 0, 0)
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
    // Areté non entra più di suo: lo aggiunge il giocatore spuntando la casella.
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
  const traits = prepareAreteTraits(actor);
  const content = await foundry.applications.handlebars.renderTemplate(
    "modules/wod5e-mage/templates/dialogs/arete-roll.hbs",
    { arete, ...traits }
  );

  const result = await foundry.applications.api.DialogV2.input({
    window: {
      title: game.i18n.localize("WOD5E_MAGE.Arete.Roll")
    },
    // DialogV2.input defaults to 400 px in Foundry 14. The three-part Areté
    // pool needs 25% more horizontal room, so this dialog alone uses 500 px.
    position: {
      width: 500
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
    classes: ["wod5e", actor.system.gamesystem],
    render: (_event, dialog) => makeMagickTypeExclusive(dialog)
  });

  if (!result || result === "cancel") return;

  const selectedAttribute = findTraitById(traits.attributes, result.attribute);
  const selectedSkill = findTraitById(traits.skills, result.skill);
  if (!selectedAttribute || !selectedSkill) {
    ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.Arete.SelectTraitWarning"));
    return;
  }

  const options = normalizeMagickRollOptions(result);
  // Areté non entra da solo nella riserva: di base vale zero ed è il giocatore
  // a chiamarlo spuntando la casella. Il punteggio resta modificabile solo dai
  // pallini sulla scheda. Attributo e Abilità si sommano sempre.
  const areteValue = options.useArete ? arete.value : 0;
  const dicePool = calculateAreteTraitPool(
    areteValue,
    selectedAttribute.value,
    selectedSkill.value
  );
  const rollLabel = game.i18n.format(
    options.useArete ? "WOD5E_MAGE.Arete.Rolling" : "WOD5E_MAGE.Arete.RollingNoArete",
    {
      attribute: selectedAttribute.label,
      skill: selectedSkill.label
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
    "attributes",
    `attributes.${selectedAttribute.id}`,
    "skills",
    `skills.${selectedSkill.id}`
  ];
  if (options.useArete) selectors.unshift("arete");
  if (options.coincidental) selectors.push("magick.coincidental");
  if (options.vulgar) selectors.push("magick.vulgar");
  if (options.witnesses) selectors.push("magick.vulgar-with-witnesses");

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
      attribute: selectedAttribute.label,
      attributeValue: selectedAttribute.value,
      skill: selectedSkill.label,
      skillValue: selectedSkill.value,
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
      selectors,
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
