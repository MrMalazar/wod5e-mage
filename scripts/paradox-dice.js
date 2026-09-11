import { DiceRegistry } from "/systems/wod5e/system/api/def/dice.js";
import {
  MortalDie,
  WOD5eDie
} from "/systems/wod5e/system/dice/splat-dice.js";
import { getSituationalModifiers } from "/systems/wod5e/system/scripts/rolls/situational-modifiers.js";
import { WOD5eRoll } from "/systems/wod5e/system/scripts/system-rolls.js";
import { bonusDiceExcess } from "./arete.js";
import { bussolaDice, grantBussolaQuintessence, readBussola, renderBussolaBlock, wireBussola } from "./bussola.js";
import { MODULE_ID } from "./constants.js";
import {
  calculateRamoCSuccesses,
  diceNote,
  RAMO,
  ramoCDice,
  ramoCMargin,
  splitRamoCDice,
  SUCCESS_MODIFIER
} from "./ramo-c.js";
import { renderAutoVictoryBanner, renderBacklashNote, renderRollNote, ROLL_CARD_FLAG } from "./roll-card.js";
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

  // Nel ramo C la riuscita è l'8: le facce 6 e 7 sono fallimenti anche in 3D.
  dice3d.addDicePreset({
    type: "dp",
    labels: [
      "systems/wod5e/assets/icons/dsn/bestial-fail-dsn.png",
      "systems/wod5e/assets/icons/dsn/red-fail-dsn.png",
      "systems/wod5e/assets/icons/dsn/red-fail-dsn.png",
      "systems/wod5e/assets/icons/dsn/red-fail-dsn.png",
      "systems/wod5e/assets/icons/dsn/red-fail-dsn.png",
      "systems/wod5e/assets/icons/dsn/red-fail-dsn.png",
      "systems/wod5e/assets/icons/dsn/red-fail-dsn.png",
      "systems/wod5e/assets/icons/dsn/red-success-dsn.png",
      "systems/wod5e/assets/icons/dsn/red-success-dsn.png",
      "systems/wod5e/assets/icons/dsn/red-crit-dsn.png"
    ],
    colorset: "mage-paradox",
    system: "wod5e"
  }, "d10");
}

/** Gli occhi sui dadi rossi: l'1 e il 10 chiamano il Contraccolpo. */
export function countParadoxEyes(results = []) {
  return results
    .filter((result) => result?.active !== false && !result?.discarded)
    .filter((result) => [1, 10].includes(Number(result.result)))
    .length;
}

/** I dieci sui rossi: ogni due, un punto dell'Ustione diventa aggravato. */
export function countParadoxTens(results = []) {
  return results
    .filter((result) => result?.active !== false && !result?.discarded)
    .filter((result) => Number(result.result) === 10)
    .length;
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

/**
 * La riga viva della finestra (ramo C): riserva meno soglia uguale dadi,
 * e quanti rossi. Si riscrive a ogni tocco di riserva, soglia e
 * modificatori. Torna il conto, per chi lo chiama al tiro.
 */
export function readDialogDice(form, { paradoxRating = 0, bought = false, onlyParadox = false } = {}) {
  // La Bussola rispettata (11/9) vale un dado, fuori dal tetto.
  const pool = Math.max((form.querySelector("#inputBasicDice")?.valueAsNumber || 0) + getCustomModifierTotal(form) + bussolaDice(form), 0);
  const threshold = Math.max(Number(form.querySelector("#inputDifficulty")?.value) || 0, 0);
  const conto = ramoCDice(pool, threshold);
  const dice = bought || onlyParadox ? 0 : conto.dice;
  const split = splitRamoCDice(dice, paradoxRating);
  if (bought || onlyParadox) {
    // La riuscita comprata (o lo Scoppio): i rossi si tirano solo per l'occhio.
    split.basicDice = 0;
    split.countedParadox = 0;
    split.eyeOnly = split.paradoxDice;
    split.totalDice = split.paradoxDice;
  }
  return { ...conto, dice, ...split };
}

function paintDialogDice(form, options) {
  const out = form.querySelector("[data-role=diceOut]");
  if (!out) return;
  const conto = readDialogDice(form, options);
  const format = game.i18n.format.bind(game.i18n);
  const parts = [format("WOD5E_MAGE.RamoC.DiceLine", { pool: conto.pool, threshold: conto.threshold, dice: conto.dice })];
  if (conto.paradoxDice > 0) {
    parts.push(conto.eyeOnly > 0
      ? format("WOD5E_MAGE.RamoC.RedsEyeOnly", { reds: conto.paradoxDice, eyeOnly: conto.eyeOnly })
      : format("WOD5E_MAGE.RamoC.Reds", { reds: conto.paradoxDice }));
  }
  if (options.bought) parts.push(game.i18n.localize("WOD5E_MAGE.RamoC.BoughtLine"));
  out.textContent = parts.join(" · ");
  const paradoxInput = form.querySelector("#inputParadoxDice");
  if (paradoxInput) paradoxInput.value = String(conto.paradoxDice);
}

function initializeDialog(dialog, options) {
  const form = dialog.element;
  const repaint = () => paintDialogDice(form, options);
  wireBussola(form, options.actor, repaint);
  form.querySelectorAll("#inputBasicDice, #inputDifficulty").forEach((input) => {
    input.addEventListener("input", repaint);
    input.addEventListener("change", repaint);
  });
  form.querySelectorAll(".mod-checkbox").forEach((input) => {
    input.addEventListener("change", () => {
      const basicInput = form.querySelector("#inputBasicDice");
      const value = Number(input.dataset.value) || 0;
      if (basicInput) basicInput.value = String(Math.max((basicInput.valueAsNumber || 0) + (input.checked ? value : -value), 0));
      repaint();
    });
  });
  // I modificatori scritti a mano entrano nel conto a ogni tasto.
  form.addEventListener("input", (event) => {
    if (event.target?.classList?.contains("mod-value")) repaint();
  });
  form.addEventListener("click", (event) => {
    if (event.target?.closest?.("[data-action]")) window.setTimeout(repaint, 0);
  });
  repaint();
}

/**
 * Un messaggio senza dadi: la riuscita comprata con la Quintessenza (niente
 * rossi da tirare) oppure il lancio senza nessun dado (fallito). Porta la
 * carta del Mago come un tiro, così i tasti sotto sanno cosa fare.
 */
async function postDicelessMessage(actor, title, { flavor, cardData, banner = "", rollMode }) {
  const localize = game.i18n.localize.bind(game.i18n);
  const content = [
    banner ? renderAutoVictoryBanner(localize, banner) : "",
    flavor
  ].join("");
  return ChatMessage.create(ChatMessage.applyRollMode({
    speaker: ChatMessage.getSpeaker({ actor }),
    flavor: title,
    content,
    flags: { [MODULE_ID]: { [ROLL_CARD_FLAG]: cardData } }
  }, rollMode));
}

/**
 * La finestra di conferma e il tiro del ramo C. La usano il tiro di Areté,
 * lo Scoppio e (dalla 0.87.0) i tiri di Abilità della scheda: la riserva
 * meno la soglia dà i dadi, un 8 riesce, i rossi si tirano sempre. Torna il
 * messaggio in chat, oppure null se la finestra è stata chiusa.
 *
 * @param pool          la riserva prima della soglia
 * @param threshold     la soglia (modificabile nella finestra)
 * @param bonusDice     i dadi in più (premio, Armonia) già dentro `pool`, per il tetto +3
 * @param paradoxRating i rossi: il Paradosso sulla Ruota
 * @param onlyParadox   lo Scoppio: solo rossi
 * @param bought        la riuscita comprata con la Quintessenza: non si tira, salvo i rossi
 * @param burn          l'Ustione se scatta il Contraccolpo: la soglia (i danni)
 * @param sphereLevel   il livello della Sfera usata (la più alta): i punti Paradosso al Narratore
 * @param skill         un tiro di Abilità: niente rossi, e il margine oltre il primo successo
 * @param bussola       (tiri di Abilità) le voci della Bussola: la finestra chiede «Rispetta la Bussola?»
 */
export async function rollAreteWithParadox({
  actor,
  data,
  pool = 0,
  threshold = 0,
  bonusDice = 0,
  paradoxRating = 0,
  onlyParadox = false,
  bought = false,
  burn = 0,
  sphereLevel = 0,
  effectKind = "",
  arete = 0,
  skill = false,
  bussola = null,
  title,
  flavor = "",
  card = null,
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
  // tetto +3 già applicato (tronco). La soglia si toglie dopo, nella finestra.
  const startingExcess = skill ? 0 : bonusDiceExcess(bonusDice, activeModifiersNow);
  const reds = skill ? 0 : Math.max(Math.trunc(Number(paradoxRating) || 0), 0);
  const options = { paradoxRating: reds, bought, onlyParadox, actor };
  const bussolaHtml = skill && bussola ? renderBussolaBlock(bussola, game.i18n.localize.bind(game.i18n)) : "";
  const content = await foundry.applications.handlebars.renderTemplate(
    "modules/wod5e-mage/templates/dialogs/arete-roll-confirm.hbs",
    {
      basicDice: onlyParadox ? 0 : Math.max(Math.trunc(Number(pool) || 0) + activeTotal - startingExcess, 0),
      paradoxDice: reds,
      difficulty: Math.max(Math.trunc(Number(threshold) || 0), 0),
      skill,
      onlyParadox,
      bought,
      showReds: !skill,
      bussolaHtml,
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
          const activeModifiers = collectActiveModifiers(form);
          // Il tetto +3 (tronco) vale sul conto finale: premio, Armonia e
          // modificatori positivi insieme. Lo scarto va in chat.
          const excess = skill || onlyParadox ? 0 : bonusDiceExcess(bonusDice, activeModifiers);
          const alreadyRemoved = skill || onlyParadox ? 0 : startingExcess;
          const basicInput = form.querySelector("#inputBasicDice");
          if (basicInput && excess - alreadyRemoved > 0) {
            basicInput.value = String(Math.max((basicInput.valueAsNumber || 0) - (excess - alreadyRemoved), 0));
          }
          const conto = readDialogDice(form, options);
          const rollMode = form.querySelector('[name="rollMode"]')?.value
            || game.settings.get("core", "rollMode");
          const format = game.i18n.format.bind(game.i18n);
          const localize = game.i18n.localize.bind(game.i18n);
          // La Bussola rispettata nel tiro di Abilità: un dado ora (già nel conto), +1 Quintessenza a tiro fatto.
          const bussolaKept = skill && bussola ? readBussola(form, bussola) : null;

          let rollFlavor = flavor;
          if (bussolaKept) {
            rollFlavor += renderRollNote(format("WOD5E_MAGE.Bussola.Flavor", { label: bussolaKept.label }), "bussola");
          }
          if (!onlyParadox) {
            rollFlavor += renderRollNote(format("WOD5E_MAGE.RamoC.DiceNote", { note: diceNote(conto) }), "dice");
          }
          if (excess > 0) {
            rollFlavor += renderRollNote(game.i18n.format("WOD5E_MAGE.Arete.BonusCap", { excess }));
          }
          if (conto.eyeOnly > 0 && !bought && !onlyParadox) {
            rollFlavor += renderRollNote(format("WOD5E_MAGE.RamoC.EyeOnlyNote", { eyeOnly: conto.eyeOnly }));
          }

          // La carta del Mago: il conto vero e la soglia, per i tasti sotto.
          const cardData = {
            ...(card ?? {}),
            ramo: RAMO,
            pool: conto.pool,
            threshold: conto.threshold,
            dice: conto.dice,
            countedParadox: conto.countedParadox,
            eyeOnly: conto.eyeOnly,
            sphereMax: Math.max(Math.trunc(Number(sphereLevel) || 0), 0),
            // Un successo basta: la fascia legge questo contro il totale.
            difficulty: 1,
            autoSuccesses: 0,
            effectKind: effectKind ?? "",
            arete,
            skill,
            bought,
            automatic: bought
          };

          // Nessun dado da tirare: la riuscita comprata senza rossi, oppure
          // il lancio a zero dadi, che fallisce senza tirare.
          if (conto.basicDice + conto.paradoxDice === 0) {
            cardData.total = bought ? 1 : 0;
            const flavorOut = rollFlavor + (bought
              ? ""
              : renderRollNote(localize("WOD5E_MAGE.RamoC.NoDice"), "nodice"));
            return postDicelessMessage(actor, title, {
              flavor: flavorOut,
              cardData,
              banner: bought ? localize("WOD5E_MAGE.RamoC.BoughtBanner") : "",
              rollMode
            });
          }

          const formula = `${conto.basicDice}d${MortalDie.DENOMINATION}${SUCCESS_MODIFIER} + ${conto.paradoxDice}d${ParadoxDie.DENOMINATION}${SUCCESS_MODIFIER}`;
          const roll = await new WOD5eRoll(formula, data, {
            system: "mortal",
            title,
            flavor: rollFlavor,
            difficulty: 1,
            rollMode,
            activeModifiers,
            mageArete: true,
            paradoxRating: reds
          }).roll();

          // Il conto del ramo C: 8 o più, i rossi contano fino a quelli
          // convertiti, niente coppie di dieci. La riuscita comprata è 1.
          const basicResults = roll.basicDice?.results ?? [];
          const redResults = roll.advancedDice?.results ?? [];
          roll._total = bought
            ? 1
            : calculateRamoCSuccesses(basicResults, redResults, conto.countedParadox);
          cardData.total = roll._total;
          if (skill) cardData.margin = ramoCMargin(roll._total);

          let finalFlavor = rollFlavor;

          // Il Contraccolpo: ogni rosso che mostra l'occhio (1 o 10) chiama
          // la realtà. L'Ustione è pari alla soglia (i danni) e la Sfera usata
          // dice i punti Paradosso al Narratore (Blue, 11/9 sera); dalla
          // 0.87.0 non si segna da sola: la scelta (Brucia, o Dai al
          // Narratore) sta nei tasti sotto la carta, e la fa il giocatore.
          // Coi tasti non serve una riga di testo: «vede solo i bottoni».
          const eyes = countParadoxEyes(redResults);
          // L'Ustione è la soglia com'è nella finestra (si può ritoccare lì); lo Scoppio porta la sua.
          const burnNow = onlyParadox ? burn : (burn > 0 ? conto.threshold : 0);
          if (eyes > 0 && !skill) {
            const tens = countParadoxTens(redResults);
            if (burnNow > 0) {
              cardData.ustione = { threshold: burnNow, sphere: Math.max(Math.trunc(Number(sphereLevel) || 0), 0), tens, kind: effectKind ?? "", eyes, choice: "" };
            } else {
              const eyesText = eyes === 1
                ? localize("WOD5E_MAGE.Arete.BacklashEyesOne")
                : format("WOD5E_MAGE.Arete.BacklashEyes", { eyes });
              finalFlavor += renderBacklashNote(localize(onlyParadox ? "WOD5E_MAGE.Burst.Label" : "WOD5E_MAGE.Arete.BacklashLabel"), `${eyesText}.`);
            }
          }
          roll.options.flavor = finalFlavor;

          const flags = { [MODULE_ID]: { [ROLL_CARD_FLAG]: cardData } };
          const message = await roll.toMessage(
            { speaker: ChatMessage.getSpeaker({ actor }), flags },
            { rollMode }
          );
          if (bussolaKept) await grantBussolaQuintessence(actor, bussolaKept);
          return message;
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
    render: (_event, dialog) => initializeDialog(dialog, options)
  });
}
