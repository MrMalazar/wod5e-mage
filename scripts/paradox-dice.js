import { DiceRegistry } from "/systems/wod5e/system/api/def/dice.js";
import {
  MortalDie,
  WOD5eDie
} from "/systems/wod5e/system/dice/splat-dice.js";
import { getSituationalModifiers } from "/systems/wod5e/system/scripts/rolls/situational-modifiers.js";
import { WOD5eRoll } from "/systems/wod5e/system/scripts/system-rolls.js";
import {
  calculateAreteSuccesses,
  calculateAreteDicePool,
  shiftParadoxDice
} from "./arete-dice-pool.js";
import { bonusDiceExcess, isOneStepShort } from "./arete.js";
import {
  getParadoxDieResult,
  getParadoxDieImage,
  PARADOX_DICE_FACES
} from "./dice-faces.js";

const PARADOX_DENOMINATION = "p";

/**
 * Paradox remains part of the Mortal roll family, but its 10 has a dedicated
 * result category: it is a success and keeps its icon without forming critical
 * pairs with any die.
 */
export class ParadoxDie extends WOD5eDie {
  static GAME_SYSTEM = "mortal";
  static DIE_TYPE = "advanced";
  static DENOMINATION = PARADOX_DENOMINATION;

  static getResultLabel(result) {
    const image = getParadoxDieImage(result);
    return image
      ? `<img src="${image}" />`
      : '<span class="paradox-dice paradox-dice-empty"></span>';
  }
}

/** Register the custom dP term and its module-provided chat faces. */
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
    // Le facce contengono percorsi completi; la stringa vuota e' il dado CSS.
    imgRoot: "",
    faces: PARADOX_DICE_FACES,
    // Do not include hunger-dice: that native class adds the old red styling.
    css: "paradox-dice",
    resultMap: getParadoxDieResult
  });

  Hooks.once("diceSoNiceReady", registerDiceSoNicePreset);
}

function registerDiceSoNicePreset(dice3d) {
  dice3d.addColorset({
    name: "mage-paradox",
    description: "Mage Paradox Dice",
    category: "World of Darkness 5e",
    foreground: "#d0524a",
    background: "#17120f",
    edge: "#b5433c",
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


function changeParadoxDice(ownerDocument, delta) {
  const basicInput = ownerDocument.querySelector("#inputBasicDice");
  const paradoxInput = ownerDocument.querySelector("#inputParadoxDice");
  if (!basicInput || !paradoxInput) return;

  // Ogni dado aggiunto al Paradosso viene sottratto ai dadi Mage e viceversa.
  const pool = shiftParadoxDice(
    basicInput.valueAsNumber,
    paradoxInput.valueAsNumber,
    delta
  );
  basicInput.value = pool.basicDice;
  paradoxInput.value = pool.paradoxDice;
}

function initializeModifierControls(dialog) {
  const form = dialog.element;
  const basicInput = form.querySelector("#inputBasicDice");
  const paradoxInput = form.querySelector("#inputParadoxDice");
  if (!basicInput || !paradoxInput) return;

  form.querySelectorAll(".mod-checkbox").forEach((input) => {
    input.addEventListener("change", () => {
      const value = Number(input.dataset.value) || 0;
      const delta = input.checked ? value : -value;
      const currentTotal = basicInput.valueAsNumber + paradoxInput.valueAsNumber;
      // I modificatori cambiano il totale ma conservano, quando possibile, la
      // quantita' di Paradosso scelta manualmente nel popup.
      const pool = calculateAreteDicePool(
        currentTotal + delta,
        paradoxInput.valueAsNumber
      );
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
  bonusDice = 0,
  paradoxRating,
  onlyParadox = false,
  difficulty = 0,
  arete = 0,
  title,
  flavor,
  selectors = []
}) {
  const situationalModifiers = onlyParadox
    ? []
    : await getSituationalModifiers({ actor, selectors });
  const activeModifiersNow = situationalModifiers
    .filter((modifier) => modifier.isActive);
  const activeTotal = activeModifiersNow
    .reduce((total, modifier) => total + (Number(modifier.value) || 0), 0);
  // La riserva mostrata: tratti, dadi in più e modificatori attivi, col
  // tetto già applicato. Nella vittoria automatica volgare si tirano solo i
  // rossi: la parte Mage parte da zero.
  const startingExcess = bonusDiceExcess(bonusDice, activeModifiersNow);
  const initialPool = onlyParadox
    ? calculateAreteDicePool(paradoxRating, paradoxRating)
    : calculateAreteDicePool(dicePool + bonusDice + activeTotal - startingExcess, paradoxRating);
  const content = await foundry.applications.handlebars.renderTemplate(
    "modules/wod5e-mage/templates/dialogs/arete-roll-confirm.hbs",
    {
      ...initialPool,
      difficulty,
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
      paradoxPlus: (_event, target) => {
        changeParadoxDice(target.ownerDocument, 1);
      },
      paradoxMinus: (_event, target) => {
        changeParadoxDice(target.ownerDocument, -1);
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
          const selectedParadox =
            form.querySelector("#inputParadoxDice")?.valueAsNumber || 0;
          const activeModifiers = collectActiveModifiers(form);
          // Il tetto +3 si applica sul conto finale: premio, Armonia e
          // modificatori positivi insieme. Lo scarto va in chat.
          const excess = onlyParadox ? 0 : bonusDiceExcess(bonusDice, activeModifiers);
          const alreadyRemoved = onlyParadox ? 0 : startingExcess;
          const finalPool = calculateAreteDicePool(
            visibleTotal + getCustomModifierTotal(form) - (excess - alreadyRemoved),
            selectedParadox
          );
          const difficulty = Number(form.querySelector("#inputDifficulty")?.value) || 0;
          const rollMode = form.querySelector('[name="rollMode"]')?.value
            || game.settings.get("core", "rollMode");
          const basicDice = onlyParadox ? 0 : finalPool.basicDice;
          const paradoxDice = onlyParadox ? Math.max(finalPool.paradoxDice, 1) : finalPool.paradoxDice;
          const formula = `${basicDice}d${MortalDie.DENOMINATION}cs>5 + ${paradoxDice}d${ParadoxDie.DENOMINATION}cs>5`;
          let rollFlavor = flavor;
          if (excess > 0) {
            rollFlavor += ` ${game.i18n.format("WOD5E_MAGE.Arete.BonusCap", { excess })}`;
          }
          const roll = await new WOD5eRoll(formula, data, {
            system: "mortal",
            title,
            flavor: rollFlavor,
            difficulty,
            rollMode,
            activeModifiers,
            mageArete: true,
            paradoxRating
          }).roll();

          // WoD5e normally forms critical pairs across basic and advanced
          // dice. In an Arete roll only Mage tens may form those pairs.
          roll._total = calculateAreteSuccesses(
            roll.basicDice?.results ?? [],
            roll.advancedDice?.results ?? []
          );

          // A un passo (ramo A): sotto la soglia di al massimo Areté
          // successi, la riuscita ha un prezzo. Il messaggio lo dice.
          if (isOneStepShort(roll._total, difficulty, arete)) {
            roll.options.flavor = `${rollFlavor} ${game.i18n.format("WOD5E_MAGE.Arete.OneStep", {
              missing: difficulty - roll._total,
              arete
            })}`;
          }

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
    position: { width: "auto", height: "auto" },
    classes: ["wod5e", "wod5e-mage", "mage", "mortal", "roll-dialog", "mage-arete-roll-dialog", "wod5e-mage-roll-dialog"],
    render: (_event, dialog) => initializeModifierControls(dialog)
  });
}
