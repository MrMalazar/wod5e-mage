import { MODULE_ID } from "./constants.js";

export const DICE_CHAT_ROOT = `modules/${MODULE_ID}/assets/icons/dice/chat/`;

export const PARADOX_DICE_FACES = Object.freeze({
  bestial: "eye_closed_paradox.png",
  failure: "empty_paradox.png",
  success: "spark_paradox.png",
  critical: "eye_open_paradox.png"
});

export function getMageDieImage(result) {
  const value = Number(result);
  if (value === 10) return `${DICE_CHAT_ROOT}star_mage.png`;
  if (value >= 6) return `${DICE_CHAT_ROOT}spark_mage.png`;
  return `${DICE_CHAT_ROOT}empty_mage.png`;
}

export function getParadoxDieImage(result) {
  const value = Number(result);
  if (value === 1) return `${DICE_CHAT_ROOT}${PARADOX_DICE_FACES.bestial}`;
  if (value === 10) return `${DICE_CHAT_ROOT}${PARADOX_DICE_FACES.critical}`;
  if (value >= 6) return `${DICE_CHAT_ROOT}${PARADOX_DICE_FACES.success}`;
  return `${DICE_CHAT_ROOT}${PARADOX_DICE_FACES.failure}`;
}
