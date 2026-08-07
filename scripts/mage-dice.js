import { MAGE_SHEET_ID, MODULE_ID } from "./constants.js";

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
  dice.forEach((die) => {
    die.classList.remove("mortal-dice");
    die.classList.add("mage-dice");
  });

  return dice.length;
}

export function registerMageDiceRendering() {
  Hooks.on("renderChatMessageHTML", applyMageDiceClass);
}
