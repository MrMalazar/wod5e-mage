import { MODULE_ID } from "./constants.js";
import { getMagickBalance } from "./magick-balance.js";
import { isMageActor } from "./mage-dice.js";
import { RAMO } from "./ramo-c.js";
import { markRollOpen, ROLL_CARD_FLAG, rollActionsBox, rollOutcome } from "./roll-card.js";
import { missingSuccesses } from "./sforzo.js";

/**
 * Comprare la riuscita con la Quintessenza a tiro fatto (ordine di Blue,
 * 11/9: «manca la richiesta come messaggio quando esce il tiro fallito»).
 * Nel ramo C punti di Quintessenza pari al livello della Sfera più alta
 * comprano la riuscita; prima del tiro si fa dalla finestra, dopo un tiro
 * fallito da questo tasto, nella fila sotto la fascia. La Ruota scende
 * subito; l'Ustione dei rossi, se è scattata, resta. I danni dell'effetto
 * comprato sono aggravati (RamoC.BoughtFlavor).
 */

export const COMPRA_FLAG = "compra";

/** Il prezzo: la Sfera più alta del lancio. Zero se non c'è (tiri di Abilità, carte vecchie). */
export function compraPrice(card) {
  return Math.max(Math.trunc(Number(card?.sphereMax) || 0), 0);
}

/**
 * Il tasto compare sotto un tiro fallito del ramo C, vergine, con una
 * Sfera; è acceso solo se la Quintessenza basta.
 */
export function compraState({ total = 0, difficulty = 0, ramo = "", sphereMax = 0, quintessence = 0, forced = false, priced = false, burst = false, automatic = false, skill = false } = {}) {
  const price = Math.max(Math.trunc(Number(sphereMax) || 0), 0);
  const missing = missingSuccesses(total, difficulty);
  if (ramo !== RAMO || forced || priced || burst || automatic || skill || missing <= 0 || price <= 0) return { show: false, enabled: false, price: 0, quintessence: 0 };
  const available = Math.max(Math.trunc(Number(quintessence) || 0), 0);
  return { show: true, enabled: available >= price, price, quintessence: available };
}

function stateInput(card, quintessence) {
  return { total: card.total, difficulty: card.difficulty, ramo: card.ramo, sphereMax: card.sphereMax, quintessence, forced: card.forced, priced: card.priced, burst: card.burst || card.burstResult, automatic: card.automatic, skill: card.skill };
}

function speakerActor(message) {
  const actor = ChatMessage.getSpeakerActor?.(message.speaker) ?? game.actors?.get(message.speaker?.actor);
  return actor ?? null;
}

/** Il tasto: «Compra la riuscita −N», col prezzo e la Quintessenza in mano nel titolo. */
export function renderCompraButton(state, localize, format) {
  const hint = state.enabled
    ? format("WOD5E_MAGE.Compra.Hint", { price: state.price, quintessence: state.quintessence })
    : format("WOD5E_MAGE.Compra.HintPoor", { price: state.price, quintessence: state.quintessence });
  return `<button type="button" class="wod5e-mage-roll-action wod5e-mage-compra-button" data-compra="go"${state.enabled ? "" : " disabled"} title="${hint}">${localize("WOD5E_MAGE.Compra.Button")} <b>−${state.price}</b></button>`;
}

/** La riga di quel che è stato fatto, al posto del tasto. */
export function renderBought(used, format, localize) {
  return `<p class="wod5e-mage-roll-note wod5e-mage-roll-note-compra"><b class="wod5e-mage-compra-label">${localize("WOD5E_MAGE.Compra.Label")}</b> <span>${format("WOD5E_MAGE.Compra.Done", { price: used.price ?? 0 })}</span></p>`;
}

/** Sotto i dadi di un tiro fallito del Mago: il tasto, o la riga di quel che si è fatto. */
export function decorateCompra(message, html) {
  if (!html?.querySelector) return false;
  const card = message.getFlag?.(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  if (!message?.rolls?.[0] && card.ramo !== RAMO) return false;
  const target = html.querySelector(".dice-result") ?? html.querySelector(".message-content");
  if (!target || target.querySelector(".wod5e-mage-compra-button, .wod5e-mage-roll-note-compra")) return false;

  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const used = message.getFlag?.(MODULE_ID, COMPRA_FLAG);
  if (used) {
    target.insertAdjacentHTML("beforeend", renderBought(used, format, localize));
    return true;
  }

  const actor = speakerActor(message);
  if (!isMageActor(actor) || !actor.isOwner) return false;
  if (!Number.isFinite(Number(card.total))) return false;
  const state = compraState(stateInput(card, getMagickBalance(actor).quintessence));
  if (!state.show) return false;

  const box = rollActionsBox(target);
  box.insertAdjacentHTML("beforeend", renderCompraButton(state, localize, format));
  if (state.enabled) {
    markRollOpen(html);
    box.querySelector("[data-compra=\"go\"]")?.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      await buySuccess(message, actor);
    });
  }
  return true;
}

async function confirmCompra(state, localize, format) {
  return foundry.applications.api.DialogV2.confirm({
    window: { title: localize("WOD5E_MAGE.Compra.Title") },
    content: `<div class="wod5e-mage-compra-ask"><p>${format("WOD5E_MAGE.Compra.Ask", { price: state.price, quintessence: state.quintessence })}</p><p><em>${localize("WOD5E_MAGE.Compra.AskNote")}</em></p></div>`,
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-compra-dialog"],
    yes: { icon: "fas fa-gem", label: localize("WOD5E_MAGE.Compra.Yes"), default: true },
    no: { icon: "fas fa-times", label: localize("WOD5E_MAGE.Compra.No") },
    rejectClose: false
  });
}

/** Compra la riuscita: la Quintessenza scende del prezzo, la carta dice riuscita comprata. */
export async function buySuccess(message, actor) {
  if (message.getFlag(MODULE_ID, COMPRA_FLAG)) return null;
  const card = message.getFlag(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  const balance = getMagickBalance(actor);
  const state = compraState(stateInput(card, balance.quintessence));
  if (!state.show || !state.enabled) return null;
  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const ok = await confirmCompra(state, localize, format);
  if (!ok) return null;

  await actor.setFlag(MODULE_ID, "magickBalance", { quintessence: Math.max(balance.quintessence - state.price, 0), paradox: balance.paradox });
  const used = { price: state.price };
  const flags = { [MODULE_ID]: { [COMPRA_FLAG]: used, [ROLL_CARD_FLAG]: { symbols: [], ...card, bought: true, automatic: true, total: Math.max(Math.trunc(Number(card.total) || 0), 1) } } };
  await message.update({ flags });
  const outcome = rollOutcome(1, card.difficulty, localize, { bought: true });
  ui.notifications.info(`${outcome.text}. ${format("WOD5E_MAGE.Compra.Done", { price: state.price })}`);
  return used;
}

export function registerCompra() {
  Hooks.on("renderChatMessageHTML", decorateCompra);
}
