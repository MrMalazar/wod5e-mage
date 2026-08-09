import { MAGE_SHEET_ID, MODULE_ID } from "./constants.js";
import {
  EMPTY_DICE_FACE,
  getMageDieImage,
  getParadoxDieImage
} from "./dice-faces.js";

export { getMageDieImage } from "./dice-faces.js";

export function isMageActor(actor) {
  if (!actor?.getFlag) return false;

  return (
    actor.getFlag("core", "sheetClass") === MAGE_SHEET_ID
    || Boolean(actor.getFlag(MODULE_ID, "isMage"))
  );
}

/**
 * Usa uno SVG trasparente per le facce vuote. Il CSS continua a disegnare il
 * quadrato, mentre un src valido impedisce al browser di mostrare l'icona rotta.
 */
function applyDieFace(die, image, emptyClass) {
  const isEmpty = image === EMPTY_DICE_FACE;
  die.classList[isEmpty ? "add" : "remove"](emptyClass);
  die.src = image;
}

export function applyMageDiceClass(message, html) {
  const actor = message?.speakerActor;
  if (!isMageActor(actor) || !html?.querySelectorAll) return 0;

  const basicDice = html.querySelectorAll(".roll-img.mortal-dice");
  const basicResults = message?.rolls?.[0]?.basicDice?.results ?? [];

  basicDice.forEach((die, index) => {
    die.classList.remove("mortal-dice");
    die.classList.add("mage-dice");

    // WoD5e mantiene lo stesso ordine tra risultati e dadi mostrati in chat.
    const result = basicResults[index]?.result;
    if (result !== undefined) {
      applyDieFace(die, getMageDieImage(result), "mage-dice-empty");
    }
  });

  const paradoxDice = html.querySelectorAll(".roll-img.paradox-dice");
  const paradoxResults = message?.rolls?.[0]?.advancedDice?.results ?? [];

  paradoxDice.forEach((die, index) => {
    const result = paradoxResults[index]?.result;
    if (result !== undefined) {
      applyDieFace(die, getParadoxDieImage(result), "paradox-dice-empty");
    }
  });

  return basicDice.length + paradoxDice.length;
}

export function registerMageDiceRendering() {
  Hooks.on("renderChatMessageHTML", applyMageDiceClass);
}
