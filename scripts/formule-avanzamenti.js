import { MODULE_ID } from "./constants.js";
import { isMageActor } from "./mage-dice.js";
import { ROLL_CARD_FLAG, rollActionsBox } from "./roll-card.js";
import { dadiAvanzamenti, esito } from "./sistema.js";

/**
 * Gli avanzamenti delle Formule (il Sistema, voce Formule). Arrivano dai
 * fallimenti: se in una scena il tiro di attivazione di una Formula fallisce,
 * e il giocatore l'aveva descritta come si deve oppure interpreta il
 * fallimento, la Formula prende un avanzamento. A 2 avanzamenti dà un dado in
 * più al suo tiro, a 4 due, a 7 tre (dentro il tetto dei +3). Ne prende al
 * massimo uno per scena, e solo giocandola. Nelle Formule il premio
 * dell'Areté non si applica: lo sostituiscono gli avanzamenti.
 *
 * Il conto sta sul personaggio, una voce per Formula; il segno della scena
 * si toglie col Cambio scena e con la Nuova sessione (salute.js). Il tasto
 * «Avanzamento» compare sotto la carta di un lancio di Formula fallito.
 * I conti sono puri: si provano fuori da Foundry.
 */

export const AVANZAMENTI_FLAG = "formuleAvanzamenti";
export const AVANZAMENTI_SCENA_FLAG = "formuleScena";

const intero = (value) => Math.max(Math.trunc(Number(value) || 0), 0);

/** Gli avanzamenti di una Formula sul personaggio, e i dadi che danno. */
export function avanzamentiDi(registro = {}, id = "") {
  const punti = id ? intero(registro?.[id]) : 0;
  return { punti, dadi: dadiAvanzamenti(punti) };
}

/** I punti che mancano al prossimo dado (2, 4, 7), o 0 quando la Formula è già a tre dadi. */
export function mancanoAlProssimo(punti = 0) {
  const fatti = intero(punti);
  const soglia = [2, 4, 7].find((passo) => passo > fatti);
  return soglia ? soglia - fatti : 0;
}

/**
 * Il tasto sotto la carta: c'è su un lancio del Sistema che porta una
 * Formula, fallito (i successi sotto la soglia, senza Vittoria a un prezzo e
 * senza riuscita indulgendo o senza tirare), finché la Formula non ha preso
 * il suo avanzamento in questa scena.
 */
export function avanzamentoState(card = {}, scena = {}) {
  const id = String(card?.formula ?? "");
  const spento = { show: false, id };
  if (!id || !card?.sistema || card.skill || card.burst || card.burstResult || card.saggezza) return spento;
  if (card.priced || card.forced || card.bought || card.automatic || card.avanzamento) return spento;
  if (esito({ successi: card.total, soglia: card.difficulty }).riuscito) return spento;
  if (scena?.[id]) return spento;
  return { show: true, id };
}

/** Il tasto: «Avanzamento», con la regola nel sorvolo. */
export function renderAvanzamentoButton(nome, localize = (key) => key, format = (key) => key) {
  const hint = String(format("WOD5E_MAGE.Formule.AvanzamentoHint", { nome })).replace(/"/g, "&quot;");
  return `<button type="button" class="wod5e-mage-roll-action wod5e-mage-avanzamento-button" data-avanzamento="prendi" title="${hint}">${localize("WOD5E_MAGE.Formule.Avanzamento")}</button>`;
}

function speakerActor(message) {
  const actor = ChatMessage.getSpeakerActor?.(message.speaker) ?? game.actors?.get(message.speaker?.actor);
  return actor ?? null;
}

/** La Formula prende l'avanzamento: un punto in più, il segno della scena, e la carta che lo ricorda. */
export async function prendiAvanzamento(message) {
  const card = message.getFlag(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  const actor = speakerActor(message);
  if (!actor?.isOwner) return null;
  const scena = actor.getFlag(MODULE_ID, AVANZAMENTI_SCENA_FLAG) ?? {};
  const state = avanzamentoState(card, scena);
  if (!state.show) return null;
  const registro = actor.getFlag(MODULE_ID, AVANZAMENTI_FLAG) ?? {};
  const prima = avanzamentiDi(registro, state.id);
  const punti = prima.punti + 1;
  await actor.update({
    [`flags.${MODULE_ID}.${AVANZAMENTI_FLAG}.${state.id}`]: punti,
    [`flags.${MODULE_ID}.${AVANZAMENTI_SCENA_FLAG}.${state.id}`]: true
  });
  if (message.isOwner || game.user?.isGM) await message.update({ [`flags.${MODULE_ID}.${ROLL_CARD_FLAG}.avanzamento`]: true }).catch(() => null);
  const dopo = avanzamentiDi({ [state.id]: punti }, state.id);
  ui.notifications.info(game.i18n.format("WOD5E_MAGE.Formule.AvanzamentoPreso", { nome: card.formulaNome || state.id, punti, dadi: dopo.dadi }));
  return punti;
}

/** Sotto la carta di un lancio di Formula fallito: il tasto, per chi ha il mago. */
export function decorateAvanzamento(message, html) {
  if (!html?.querySelector) return false;
  const card = message?.getFlag?.(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  if (!card?.formula) return false;
  const actor = speakerActor(message);
  if (!isMageActor(actor) || !actor.isOwner) return false;
  const state = avanzamentoState(card, actor.getFlag(MODULE_ID, AVANZAMENTI_SCENA_FLAG) ?? {});
  if (!state.show) return false;
  const target = html.querySelector(".dice-result");
  if (!target || target.querySelector(".wod5e-mage-avanzamento-button")) return false;
  const box = rollActionsBox(target);
  box.insertAdjacentHTML("beforeend", renderAvanzamentoButton(card.formulaNome || state.id, game.i18n.localize.bind(game.i18n), game.i18n.format.bind(game.i18n)));
  box.querySelector("[data-avanzamento=\"prendi\"]")?.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await prendiAvanzamento(message);
  });
  return true;
}

export function registerAvanzamenti() {
  Hooks.on("renderChatMessageHTML", decorateAvanzamento);
}
