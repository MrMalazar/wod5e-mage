import { MODULE_ID } from "./constants.js";
import { SUCCESS_FROM } from "./ramo-c.js";

export const DICE_CHAT_ROOT = `modules/${MODULE_ID}/assets/icons/dice/chat/`;
export const EMPTY_DICE_FACE = `${DICE_CHAT_ROOT}dado-vuoto.svg`;

export const PARADOX_DICE_FACES = Object.freeze({
  bestial: `${DICE_CHAT_ROOT}paradosso-occhio-vuoto.svg`,
  // Lo SVG e' trasparente: forma e colore della faccia vuota arrivano dal CSS.
  failure: EMPTY_DICE_FACE,
  success: `${DICE_CHAT_ROOT}paradosso-scintilla.svg`,
  // Il 10 conserva la sua icona ma non usa la categoria critica nativa.
  paradoxTen: `${DICE_CHAT_ROOT}paradosso-occhio-completo.svg`
});

export function getParadoxDieResult(result, { successFrom = SUCCESS_FROM } = {}) {
  const value = Number(result);
  if (value === 1) return "bestial";
  if (value === 10) return "paradoxTen";
  // Il ramo C (11/9): la riuscita è l'8, il 6 e il 7 sono facce vuote.
  if (value >= successFrom) return "success";
  return "failure";
}

export function getMageDieImage(result, { successFrom = SUCCESS_FROM } = {}) {
  const value = Number(result);
  if (value === 10) return `${DICE_CHAT_ROOT}magick-stellina.svg`;
  if (value >= successFrom) return `${DICE_CHAT_ROOT}magick-scintilla.svg`;

  return EMPTY_DICE_FACE;
}

export function getParadoxDieImage(result, options = {}) {
  return PARADOX_DICE_FACES[getParadoxDieResult(result, options)];
}
