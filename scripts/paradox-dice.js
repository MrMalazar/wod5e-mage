import { DiceRegistry } from "/systems/wod5e/system/api/def/dice.js";
import {
  hungerDiceFaces,
  vampireDiceLocation
} from "/systems/wod5e/system/dice/icons.js";
import {
  MortalDie,
  WOD5eDie
} from "/systems/wod5e/system/dice/splat-dice.js";
import { getSituationalModifiers } from "/systems/wod5e/system/scripts/rolls/situational-modifiers.js";
import { WOD5eRoll } from "/systems/wod5e/system/scripts/system-rolls.js";
import { calculateAreteDicePool } from "./arete-dice-pool.js";

const PARADOX_DENOMINATION = "p";

/**
 * Paradox uses the same result mapping as Hunger, but remains part of the
 * Mortal roll family. This lets WoD5e count successes and criticals normally
 * while keeping the advanced dice visually and mechanically separate.
 */
export class ParadoxDie extends WOD5eDie {
  static GAME_SYSTEM = "mortal";
  static DIE_TYPE = "advanced";
  static DENOMINATION = PARADOX_DENOMINATION;

  static getResultLabel(result) {
    const face = result === 1
      ? hungerDiceFaces.bestial
      : result === 10
        ? hungerDiceFaces.critical
        : result > 5
          ? hungerDiceFaces.success
          : hungerDiceFaces.failure;

    return `<img src="${vampireDiceLocation + face}" />`;
  }
}

function resultMap(result) {
  if (result === 10) return "critical";
  if (result > 5) return "success";
  if (result > 1) return "failure";
  return "bestial";
}

/** Register the custom dP term and its purple chat rendering. */
export function registerParadoxDice() {
  if (CONFIG.Dice.terms[PARADOX_DENOMINATION]
    && CONFIG.Dice.terms[PARADOX_DENOMINATION] !== ParadoxDie) {
    console.warn(
      "wod5e-mage | The 'p' dice denomination is already registered; Paradox dice were not installed."
    );
    return;
  }

  CONFIG.Dice.terms[PARADOX_DENOMINATION] = ParadoxDie;
  DiceRegistry.registerAdvanced("mortal", {
    imgRoot: vampireDiceLocation,
    faces: hungerDiceFaces,
    // Keep hunger-dice for compatibility with WoD5e advanced-die handling.
    // paradox-dice is later in the class list and supplies the purple theme.
    css: "hunger-dice paradox-dice",
    resultMap
  });

  Hooks.once("diceSoNiceReady", registerDiceSoNicePreset);
}

function registerDiceSoNicePreset(dice3d) {
  dice3d.addColorset({
    name: "mage-paradox",
    description: "Mage Paradox Dice",
    category: "World of Darkness 5e",
    foreground: "#ffffff",
    background: "#542176",
    edge: "#b78bd4",
    texture: "none",
    material: "plastic",
    font: "Arial Black"
  }, "default");

  dice3d.addDicePreset({
    type: "dp",
    labels: [
      "systems/wod5e/assets/icons/dsn/bestial-fail-dsn.png",
      "systems/wod5e/assets/icons/dsn/red-fail-dsn.png",
      "systems/wod5e/assets/icons/dsn/red-fail-dsn.png",
      "systems/wod5e/assets/icons/dsn/red-fail-dsn.png",
      "systems/wod5e/assets/icons/dsn/red-fail-dsn.png",
      "systems/wod5e/assets/icons/dsn/red-success-dsn.png",
      "systems/wod5e/assets/icons/dsn/red-success-dsn.png",
      "systems/wod5e/assets/icons/dsn/red-success-dsn.png",
      "systems/wod5e/assets/icons/dsn/red-success-dsn.png",
      "systems/wod5e/assets/icons/dsn/red-crit-dsn.png"
    ],
    colorset: "mage-paradox",
    system: "wod5e"
  }, "d10");
}

function addCustomModifier(_event, target) {
  const list = target.ownerDocument.querySelector("#custom-modifiers-list");
  const label = game.i18n.localize("WOD5E.RollList.CustomModifiers");
  list?.insertAdjacentHTML("beforeend", `
    <div class="form-group custom-modifier">
      <div class="mod-label">
        <a data-action="deleteCustomMod"><i class="fas fa-trash"></i></a>
        <input class="mod-name" type="text" value="${label}">
      </div>
      <input class="mod-value" type="number" value="1">
    </div>
  `);
}

function collectActiveModifiers(form) {
  const modifiers = [];

  form.querySelectorAll(".mod-checkbox:checked").forEach((input) => {
    const value = Number(input.dataset.value) || 0;
    modifiers.push({
      label: input.dataset.label,
      value: `${value > 0 ? "+" : ""}${value}`
    });
  });

  form.querySelectorAll(".custom-modifier").forEach((element) => {
    const value = Number(element.querySelector(".mod-value")?.value) || 0;
    modifiers.push({
      label: element.querySelector(".mod-name")?.value || "",
      value: `${value > 0 ? "+" : ""}${value}`
    });
  });

  return modifiers;
}

function getCustomModifierTotal(form) {
  return [...form.querySelectorAll(".custom-modifier .mod-value")]
    .reduce((total, input) => total + (Number(input.value) || 0), 0);
}

function initializeModifierControls(dialog, paradoxRating) {
  const form = dialog.element;
  const basicInput = form.querySelector("#inputBasicDice");
  const paradoxInput = form.querySelector("#inputParadoxDice");
  if (!basicInput || !paradoxInput) return;

  form.querySelectorAll(".mod-checkbox").forEach((input) => {
    input.addEventListener("change", () => {
      const value = Number(input.dataset.value) || 0;
      const delta = input.checked ? value : -value;
      const currentTotal = basicInput.valueAsNumber + paradoxInput.valueAsNumber;
      const pool = calculateAreteDicePool(currentTotal + delta, paradoxRating);
      basicInput.value = pool.basicDice;
      paradoxInput.value = pool.paradoxDice;
    });
  });
}

/**
 * Open a native-looking WoD5e confirmation dialog and roll the custom formula.
 * This path is used only by Areté; every other Mage roll continues through the
 * untouched WoD5e API and therefore never receives Paradox dice.
 */
export async function rollAreteWithParadox({
  actor,
  data,
  dicePool,
  paradoxRating,
  title,
  flavor,
  selectors = []
}) {
  const situationalModifiers = await getSituationalModifiers({ actor, selectors });
  const activeTotal = situationalModifiers
    .filter((modifier) => modifier.isActive)
    .reduce((total, modifier) => total + (Number(modifier.value) || 0), 0);
  const initialPool = calculateAreteDicePool(dicePool + activeTotal, paradoxRating);
  const content = await foundry.applications.handlebars.renderTemplate(
    "modules/wod5e-mage/templates/dialogs/arete-roll-confirm.hbs",
    {
      ...initialPool,
      difficulty: 0,
      rollMode: game.settings.get("core", "rollMode"),
      rollModes: CONFIG.Dice.rollModes,
      situationalModifiers
    }
  );

  return foundry.applications.api.DialogV2.wait({
    window: { title },
    content,
    actions: {
      plus: (_event, target) => {
        const input = target.ownerDocument.querySelector(`#${target.dataset.resource}`);
        if (input) input.valueAsNumber += 1;
      },
      minus: (_event, target) => {
        const input = target.ownerDocument.querySelector(`#${target.dataset.resource}`);
        if (input) input.valueAsNumber = Math.max(input.valueAsNumber - 1, 0);
      },
      addCustomMod: addCustomModifier,
      deleteCustomMod: (_event, target) => target.closest(".custom-modifier")?.remove()
    },
    buttons: [
      {
        action: "roll",
        icon: "fas fa-dice",
        label: game.i18n.localize("WOD5E.RollList.Label"),
        default: true,
        callback: async (_event, _button, dialog) => {
          const form = dialog.element;
          const visibleTotal =
            (form.querySelector("#inputBasicDice")?.valueAsNumber || 0)
            + (form.querySelector("#inputParadoxDice")?.valueAsNumber || 0);
          const finalPool = calculateAreteDicePool(
            visibleTotal + getCustomModifierTotal(form),
            paradoxRating
          );
          const difficulty = Number(form.querySelector("#inputDifficulty")?.value) || 0;
          const rollMode = form.querySelector('[name="rollMode"]')?.value
            || game.settings.get("core", "rollMode");
          const formula = `${finalPool.basicDice}d${MortalDie.DENOMINATION}cs>5 + ${finalPool.paradoxDice}d${ParadoxDie.DENOMINATION}cs>5`;
          const roll = await new WOD5eRoll(formula, data, {
            system: "mortal",
            title,
            flavor,
            difficulty,
            rollMode,
            activeModifiers: collectActiveModifiers(form),
            mageArete: true,
            paradoxRating
          }).roll();

          return roll.toMessage(
            { speaker: ChatMessage.getSpeaker({ actor }) },
            { rollMode }
          );
        }
      },
      {
        action: "cancel",
        icon: "fas fa-times",
        label: game.i18n.localize("WOD5E.Cancel")
      }
    ],
    classes: ["wod5e", "mortal", "roll-dialog", "mage-arete-roll-dialog"],
    render: (_event, dialog) => initializeModifierControls(dialog, paradoxRating)
  });
}
