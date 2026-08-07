import { MODULE_ID } from "./constants.js";
import { getMagickBalance } from "./magick-balance.js";

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
  coincidental = false,
  vulgar = false,
  witnesses = false
} = {}) {
  return {
    coincidental: isChecked(coincidental),
    vulgar: isChecked(vulgar),
    witnesses: isChecked(witnesses)
  };
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
    classes: ["wod5e", actor.system.gamesystem]
  });

  if (!result || result === "cancel") return;

  const selectedAttribute = findTraitById(traits.attributes, result.attribute);
  const selectedSkill = findTraitById(traits.skills, result.skill);
  if (!selectedAttribute || !selectedSkill) {
    ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.Arete.SelectTraitWarning"));
    return;
  }

  const options = normalizeMagickRollOptions(result);
  // Areté is read only here: its value can be changed exclusively through the
  // dots on the Mage sheet. Every roll then adds one Attribute and one Skill.
  const dicePool = calculateAreteTraitPool(
    arete.value,
    selectedAttribute.value,
    selectedSkill.value
  );
  const rollLabel = game.i18n.format("WOD5E_MAGE.Arete.Rolling", {
    attribute: selectedAttribute.label,
    skill: selectedSkill.label
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
    "arete",
    "attributes",
    `attributes.${selectedAttribute.id}`,
    "skills",
    `skills.${selectedSkill.id}`
  ];
  if (options.coincidental) selectors.push("magick.coincidental");
  if (options.vulgar) selectors.push("magick.vulgar");
  if (options.witnesses) selectors.push("magick.vulgar-with-witnesses");

  const paradoxRating = getMagickBalance(actor).paradox;
  // Load the Foundry-specific dice implementation only when an Areté roll is
  // actually requested. Keeping it out of the data helpers also lets their
  // pure validation tests run outside Foundry.
  const { rollAreteWithParadox } = await import("./paradox-dice.js");
  await rollAreteWithParadox({
    dicePool,
    paradoxRating,
    title: rollLabel,
    flavor: game.i18n.format("WOD5E_MAGE.Arete.RollFlavor", {
      arete: arete.value,
      attribute: selectedAttribute.label,
      attributeValue: selectedAttribute.value,
      skill: selectedSkill.label,
      skillValue: selectedSkill.value,
      magickType
    }),
    selectors,
    actor,
    data: actor.system
  });
}
