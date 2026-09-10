import { isOneStepShort } from "./arete.js";
import { MODULE_ID } from "./constants.js";
import { isMageActor } from "./mage-dice.js";
import { markRollOpen, ROLL_CARD_FLAG, rollActionsBox, rollOutcome } from "./roll-card.js";
import { missingSuccesses } from "./sforzo.js";

/**
 * La vittoria a un prezzo (ramo A, «a un passo»): quando alla soglia mancano
 * al massimo Areté successi, l'incantesimo può riuscire lo stesso e il
 * prezzo lo decide il Narratore. Dalla 0.86.0 (Blue, 10/9 notte) è il terzo
 * tasto sotto la fascia del tiro fallito, con Ritira con Volontà e Sforzare
 * la realtà: fuori dall'Areté il tasto c'è ma è spento, e dice perché.
 */

export const PREZZO_FLAG = "prezzo";

/** Il tasto compare sotto un tiro fallito e vergine; è acceso solo entro l'Areté. */
export function prezzoState({ total = 0, difficulty = 0, arete = 0, forced = false, priced = false, burst = false, automatic = false } = {}) {
  const missing = missingSuccesses(total, difficulty);
  if (forced || priced || burst || automatic || missing <= 0) return { show: false, enabled: false, missing: 0 };
  return { show: true, enabled: isOneStepShort(total, difficulty, arete), missing };
}

function speakerActor(message) {
  const actor = ChatMessage.getSpeakerActor?.(message.speaker) ?? game.actors?.get(message.speaker?.actor);
  return actor ?? null;
}

/** Il tasto: «Vittoria a un prezzo», con quanto manca e l'Areté nel titolo. */
export function renderPrezzoButton(state, arete, localize, format) {
  const hint = state.enabled
    ? format("WOD5E_MAGE.Prezzo.Hint", { missing: state.missing, arete })
    : format("WOD5E_MAGE.Prezzo.HintFar", { missing: state.missing, arete });
  return `<button type="button" class="wod5e-mage-roll-action wod5e-mage-prezzo-button" data-prezzo="go"${state.enabled ? "" : " disabled"} title="${hint}">${localize("WOD5E_MAGE.Prezzo.Button")}</button>`;
}

/** La riga di quel che è stato fatto, al posto del tasto. */
export function renderPriced(used, format, localize) {
  return `<p class="wod5e-mage-roll-note wod5e-mage-roll-note-prezzo"><b class="wod5e-mage-prezzo-label">${localize("WOD5E_MAGE.Prezzo.Label")}</b> <span>${format("WOD5E_MAGE.Prezzo.Done", { missing: used.missing, arete: used.arete })}</span></p>`;
}

/** Sotto i dadi di un tiro fallito del Mago: il tasto, o la riga di quel che si è fatto. */
export function decoratePrezzo(message, html) {
  const roll = message?.rolls?.[0];
  if (!roll || !html?.querySelector) return false;
  const target = html.querySelector(".dice-result");
  if (!target || target.querySelector(".wod5e-mage-prezzo-button, .wod5e-mage-roll-note-prezzo")) return false;

  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const used = message.getFlag?.(MODULE_ID, PREZZO_FLAG);
  if (used) {
    target.insertAdjacentHTML("beforeend", renderPriced(used, format, localize));
    return true;
  }

  const actor = speakerActor(message);
  if (!isMageActor(actor) || !actor.isOwner) return false;
  const card = message.getFlag?.(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  if (!Number.isFinite(Number(card.total)) || !Number.isFinite(Number(card.arete))) return false;
  const arete = Math.max(Math.trunc(Number(card.arete) || 0), 0);
  const state = prezzoState({ total: card.total, difficulty: card.difficulty, arete, forced: card.forced, priced: card.priced, burst: card.burst || card.burstResult, automatic: card.automatic });
  if (!state.show) return false;

  const box = rollActionsBox(target);
  box.insertAdjacentHTML("beforeend", renderPrezzoButton(state, arete, localize, format));
  if (state.enabled) {
    markRollOpen(html);
    box.querySelector("[data-prezzo=\"go\"]")?.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      await winAtAPrice(message, actor);
    });
  }
  return true;
}

/** La finestra: riesce, e il prezzo lo decide il Narratore. */
async function confirmPrezzo(state, arete, localize, format) {
  return foundry.applications.api.DialogV2.confirm({
    window: { title: localize("WOD5E_MAGE.Prezzo.Title") },
    content: `<div class="wod5e-mage-prezzo-ask"><p>${format("WOD5E_MAGE.Prezzo.Ask", { missing: state.missing, arete })}</p><p><em>${localize("WOD5E_MAGE.Prezzo.AskNote")}</em></p></div>`,
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-prezzo-dialog"],
    yes: { icon: "fas fa-handshake", label: localize("WOD5E_MAGE.Prezzo.Yes"), default: true },
    no: { icon: "fas fa-times", label: localize("WOD5E_MAGE.Prezzo.No") },
    rejectClose: false
  });
}

/** La riuscita a un prezzo: la carta dice riuscito, e la riga ricorda che il prezzo è del Narratore. */
export async function winAtAPrice(message, actor) {
  if (message.getFlag(MODULE_ID, PREZZO_FLAG)) return null;
  const card = message.getFlag(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  const arete = Math.max(Math.trunc(Number(card.arete) || 0), 0);
  const state = prezzoState({ total: card.total, difficulty: card.difficulty, arete, forced: card.forced, priced: card.priced, burst: card.burst || card.burstResult, automatic: card.automatic });
  if (!state.show || !state.enabled) return null;
  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const ok = await confirmPrezzo(state, arete, localize, format);
  if (!ok) return null;

  const used = { missing: state.missing, arete };
  const flags = { [MODULE_ID]: { [PREZZO_FLAG]: used, [ROLL_CARD_FLAG]: { symbols: [], ...card, priced: true } } };
  await message.update({ flags });
  const outcome = rollOutcome(card.total, card.difficulty, localize, { priced: true });
  ui.notifications.info(`${outcome.text}. ${format("WOD5E_MAGE.Prezzo.Done", { missing: state.missing, arete })}`);
  return used;
}

export function registerPrezzo() {
  Hooks.on("renderChatMessageHTML", decoratePrezzo);
}
