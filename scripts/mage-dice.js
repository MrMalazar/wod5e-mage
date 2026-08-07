import { MAGE_SHEET_ID, MODULE_ID } from "./constants.js";
import { getMageDieImage } from "./dice-faces.js";

export { getMageDieImage } from "./dice-faces.js";

export function isMageActor(actor) {
  if (!actor?.getFlag) return false;

  return (
    actor.getFlag("core", "sheetClass") === MAGE_SHEET_ID
    || Boolean(actor.getFlag(MODULE_ID, "isMage"))
  );
}

export function applyMageDiceClass(message, html) {
  const actor = message?.speakerActor;
  if (!isMageActor(actor) || !html?.querySelectorAll) return 0;

  const dice = html.querySelectorAll(".roll-img.mortal-dice");
  const results = message?.rolls?.[0]?.basicDice?.results ?? [];

  dice.forEach((die, index) => {
    die.classList.remove("mortal-dice");
    die.classList.add("mage-dice");

    // WoD5e renders basic dice in the same order as the term results. Change
    // only the image source; success counting remains entirely native.
    const result = results[index]?.result;
    if (result !== undefined) die.src = getMageDieImage(result);
  });

  return dice.length;
}

export function registerMageDiceRendering() {
  Hooks.on("renderChatMessageHTML", applyMageDiceClass);
}
