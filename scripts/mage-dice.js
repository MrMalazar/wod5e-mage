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

  const basicDice = html.querySelectorAll(".roll-img.mortal-dice, .roll-img.vampire-dice, .roll-img.hunter-dice, .roll-img.werewolf-dice");
  const basicResults = message?.rolls?.[0]?.basicDice?.results ?? [];

  basicDice.forEach((die, index) => {
    die.classList.remove("mortal-dice", "vampire-dice", "hunter-dice", "werewolf-dice");
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

/**
 * La prossima finestra di tiro del sistema (quella coi contatori dei dadi)
 * veste i dadi Mage: stella viola al posto dell'ankh mortale. Va chiamata
 * subito prima di consegnare il tiro all'API WoD5e, per un attore Mago.
 */
export function dressNextRollDialogAsMage() {
  Hooks.once("renderDialogV2", (_app, element) => {
    const root = element ?? _app?.element;
    if (!root?.querySelectorAll) return;
    // Le classi del modulo: i colori della scheda al posto di quelli del
    // sistema, e niente pannello dei modificatori (4/9 notte).
    root.classList?.remove("vampire", "hunter", "werewolf");
    root.classList?.add("wod5e-mage", "mage", "wod5e-mage-roll-dialog");

    // Il dado del sistema (ankh mortale, o quello di un altro splat) diventa
    // la stella della Magick: le immagini si riconoscono dal percorso.
    root.querySelectorAll("img.mortal-dice, img[src*='/dialog/mortal-dice'], img[src*='/dialog/vampire-dice'], img[src*='/dialog/hunter-dice'], img[src*='/dialog/werewolf-dice']").forEach((die) => {
      die.classList.remove("mortal-dice");
      die.classList.add("mage-dice");
      die.src = `modules/${MODULE_ID}/assets/icons/dice/chat/magick-stellina.svg`;
    });

    // L'intestazione «Dadi mortale» diventa «Dadi Mage».
    root.querySelectorAll(".dice-group-header label").forEach((label) => {
      if (/mortal|vampir|hunter|werewolf|cacciator|lupo/i.test(label.textContent)) {
        label.textContent = game.i18n.localize("WOD5E_MAGE.Dice.MageDice");
      }
    });
  });
}

export function registerMageDiceRendering() {
  Hooks.on("renderChatMessageHTML", applyMageDiceClass);
}
