import { prepareEssentialSkillList } from "./abilita-essenziali.js";
import { dressNextRollDialogAsMage, isMageActor } from "./mage-dice.js";

function numericValue(value) {
  return Math.max(Number(value) || 0, 0);
}

function flattenAttributes(groups) {
  return Object.entries(groups ?? {}).flatMap(([category, group]) =>
    (Array.isArray(group) ? group : [])
      .filter((trait) => trait?.id && !trait.hidden)
      .map((trait) => ({
        key: `attribute:${trait.id}`,
        id: trait.id,
        type: "attribute",
        category,
        label: trait.displayName ?? trait.name ?? trait.id,
        value: numericValue(trait.value)
      }))
  );
}

/** Prepara gli stessi tratti per ogni finestra di tiro della scheda Mage. */
export function prepareMageRollTraits(actor, { localize = (key) => key, lang = "it" } = {}) {
  const skills = prepareEssentialSkillList(actor.system?.sortedSkills, { localize, lang })
    .map((trait) => ({
      key: `skill:${trait.id}`,
      id: trait.id,
      type: "skill",
      label: trait.displayName ?? trait.name ?? trait.id,
      value: numericValue(trait.value)
    }));

  return {
    skills,
    attributes: flattenAttributes(actor.system?.sortedAttributes)
  };
}

export function findMageRollTrait(traits, key) {
  const [type, id] = String(key ?? "").split(":", 2);
  if (!id) return null;
  const collection = type === "skill"
    ? traits.skills
    : type === "attribute"
      ? traits.attributes
      : [];
  return collection.find((trait) => trait.id === id) ?? null;
}

export function selectorsForMageRollTrait(trait) {
  if (trait.type === "skill") return ["skills", `skills.${trait.id}`];
  return ["attributes", `attributes.${trait.id}`, trait.category].filter(Boolean);
}

/**
 * Compila il dataset WoD5e senza aprire il selettore nativo. Il primo tratto
 * è sempre un'abilità; il secondo può essere un'abilità o un attributo.
 */
export function compileMageTraitRoll({ dataset = {}, traits, primarySkillId, secondaryKey }) {
  const primary = traits.skills.find((trait) => trait.id === primarySkillId);
  const secondary = findMageRollTrait(traits, secondaryKey);
  if (!primary || !secondary) return null;

  const modified = {
    ...dataset,
    selectDialog: false,
    valuePaths: [
      `skills.${primary.id}.value`,
      `${secondary.type === "skill" ? "skills" : "attributes"}.${secondary.id}.value`
    ].join(" "),
    selectors: [...new Set([
      ...selectorsForMageRollTrait(primary),
      ...selectorsForMageRollTrait(secondary)
    ])].join(" ")
  };

  if (!modified.label) modified.label = `${primary.label} + ${secondary.label}`;

  if (dataset.useAbsoluteValue && dataset.absoluteValue) {
    modified.absoluteValue = numericValue(dataset.absoluteValue) + primary.value + secondary.value;
  }

  return modified;
}

function datasetFromTarget(target) {
  if (globalThis.$) return globalThis.$(target).data();
  return { ...target.dataset };
}

function usesSelectionDialog(value) {
  return value === true || value === "true" || value === "";
}

/** Intercetta soltanto i tiri della scheda Mage; il sistema nativo resta intatto. */
export async function onMageRoll(event, target) {
  event.preventDefault();

  const actor = this.actor;
  const dataset = datasetFromTarget(target);
  if (!usesSelectionDialog(dataset.selectDialog)) {
    if (isMageActor(actor)) dressNextRollDialogAsMage();
    return WOD5E.api.RollFromDataset({ dataset, actor });
  }

  const traits = prepareMageRollTraits(actor, {
    localize: game.i18n.localize.bind(game.i18n),
    lang: game.i18n.lang
  });
  const selectedSecondary = dataset.attribute ? `attribute:${dataset.attribute}` : "";
  const content = await foundry.applications.handlebars.renderTemplate(
    "modules/wod5e-mage/templates/dialogs/mage-trait-roll.hbs",
    {
      skills: traits.skills.map((trait) => ({
        ...trait,
        selectedPrimary: trait.id === dataset.skill,
        selectedSecondary: trait.key === selectedSecondary
      })),
      attributes: traits.attributes.map((trait) => ({
        ...trait,
        selectedSecondary: trait.key === selectedSecondary
      }))
    }
  );

  const result = await foundry.applications.api.DialogV2.input({
    window: { title: game.i18n.localize("WOD5E.RollList.SelectRoll") },
    position: { width: "auto", height: "auto" },
    content,
    ok: {
      icon: "fas fa-dice",
      label: game.i18n.localize("WOD5E.Confirm")
    },
    buttons: [{
      action: "cancel",
      icon: "fas fa-times",
      label: game.i18n.localize("WOD5E.Cancel")
    }],
    classes: ["wod5e", actor.system.gamesystem, "wod5e-mage-roll-dialog"]
  });

  if (!result || result === "cancel") return;

  const modifiedDataset = compileMageTraitRoll({
    dataset,
    traits,
    primarySkillId: result.primarySkill,
    secondaryKey: result.secondaryTrait
  });
  if (!modifiedDataset) {
    ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.RollSelection.SelectBothWarning"));
    return;
  }

  if (isMageActor(actor)) dressNextRollDialogAsMage();
  return WOD5E.api.RollFromDataset({ dataset: modifiedDataset, actor });
}
