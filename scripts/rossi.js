import { MODULE_ID } from "./constants.js";
import { isMageActor } from "./mage-dice.js";
import { markRollOpen, ROLL_CARD_FLAG, rollActionsBox } from "./roll-card.js";
import { contaSuccessi, esito, leggiRossi } from "./sistema.js";

/**
 * I rossi presi (il Sistema, voce Rossi). I rossi si tirano a parte e la
 * riuscita la fa la riserva; il giocatore però può prendere i loro successi
 * e aggiungerli al suo tiro. Se lo fa il tiro diventa paradossale, che riesca
 * o che fallisca, e il Narratore distorce l'effetto col suo menù. Con un 10
 * sui rossi la scelta non c'è: quei successi si prendono al lancio
 * (paradox-dice.js). Una volta presi, le stelline dei rossi contano come le
 * altre: fanno coppia con quelle della riserva.
 *
 * Qui stanno il conto di quel che i rossi darebbero, il tasto sotto la carta
 * e la presa. Le funzioni di conto sono pure: si provano fuori da Foundry.
 */

export const ROSSI_PRESI = Object.freeze(["scelta", "obbligo"]);

/** Come sono stati presi i rossi di una carta: «scelta», «obbligo», o vuoto se stanno ancora a parte. */
export function rossiPresi(card = {}) {
  if (!card?.paradossale) return "";
  return card.rossiPresi === "obbligo" ? "obbligo" : "scelta";
}

/**
 * Cosa si può fare coi rossi di una carta. `guadagno` sono i successi in più
 * che i rossi darebbero al tiro (le stelline si contano insieme a quelle
 * della riserva); `successi` è il totale coi rossi dentro. Il tasto compare
 * finché i rossi non sono presi e darebbero almeno un successo. Valgono solo
 * i lanci del Sistema: niente tiri di Abilità, Scoppi, riuscite senza tirare,
 * tiri di Saggezza, né i tiri già chiusi con la Vittoria a un prezzo.
 */
export function rossiState(card = {}, riserva = [], rossi = []) {
  const spento = { show: false, presi: "", guadagno: 0, successi: 0 };
  if (!card?.sistema || card.skill || card.burst || card.burstResult || card.bought || card.automatic || card.saggezza) return spento;
  if (leggiRossi(rossi).dadi <= 0) return spento;
  const presi = rossiPresi(card);
  const senza = contaSuccessi(riserva).successi;
  const con = contaSuccessi([...(Array.isArray(riserva) ? riserva : []), ...(Array.isArray(rossi) ? rossi : [])]).successi;
  const guadagno = Math.max(con - senza, 0);
  return { show: !presi && !card.priced && guadagno > 0, presi, guadagno, successi: con };
}

/** I successi di una carta del Sistema: la riserva, coi rossi dentro solo se sono stati presi. */
export function successiDellaCarta(card = {}, riserva = [], rossi = []) {
  const dadi = rossiPresi(card) ? [...(Array.isArray(riserva) ? riserva : []), ...(Array.isArray(rossi) ? rossi : [])] : riserva;
  return contaSuccessi(dadi).successi;
}

/** La carta dopo la presa: il totale coi rossi, il margine nuovo, il segno del tiro paradossale. */
export function cartaCoiRossi(card = {}, riserva = [], rossi = [], come = "scelta") {
  const total = contaSuccessi([...(Array.isArray(riserva) ? riserva : []), ...(Array.isArray(rossi) ? rossi : [])]).successi;
  return {
    ...card,
    total,
    margin: esito({ successi: total, soglia: card.difficulty }).margine,
    paradossale: true,
    rossiPresi: come === "obbligo" ? "obbligo" : "scelta"
  };
}

/** Il tasto: «Prendi i rossi +N», col prezzo nel sorvolo. */
export function renderRossiButton(state, localize, format) {
  const hint = format("WOD5E_MAGE.Rossi.Hint", { successi: state.guadagno });
  return `<button type="button" class="wod5e-mage-roll-action wod5e-mage-rossi-button" data-rossi="prendi" title="${hint}">${localize("WOD5E_MAGE.Rossi.Prendi")} <b>+${state.guadagno}</b></button>`;
}

function diceTerms(roll) {
  const terms = roll?.terms ?? [];
  const basic = terms.find((term) => Array.isArray(term?.results) && term?.denomination !== "p");
  const advanced = terms.find((term) => Array.isArray(term?.results) && term !== basic);
  return { basic, advanced };
}

function speakerActor(message) {
  const actor = ChatMessage.getSpeakerActor?.(message.speaker) ?? game.actors?.get(message.speaker?.actor);
  return actor ?? null;
}

/** La finestra: i successi che entrano, e il prezzo (il tiro diventa paradossale). */
async function confermaRossi(state, localize, format) {
  return foundry.applications.api.DialogV2.confirm({
    window: { title: localize("WOD5E_MAGE.Rossi.Title") },
    content: `<div class="wod5e-mage-prezzo-ask"><p>${format("WOD5E_MAGE.Rossi.Ask", { successi: state.guadagno })}</p></div>`,
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-prezzo-dialog"],
    yes: { icon: "fas fa-eye", label: localize("WOD5E_MAGE.Rossi.Yes"), default: true },
    no: { icon: "fas fa-times", label: localize("WOD5E_MAGE.Rossi.No") },
    rejectClose: false
  });
}

/** Prende i rossi: il totale si riconta con loro dentro e il tiro diventa paradossale. */
export async function prendiRossi(message, { conferma = true } = {}) {
  const card = message.getFlag(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  const { basic, advanced } = diceTerms(message.rolls?.[0]);
  const riserva = basic?.results ?? [];
  const rossi = advanced?.results ?? [];
  const state = rossiState(card, riserva, rossi);
  if (!state.show) return null;
  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  if (conferma && !(await confermaRossi(state, localize, format))) return null;

  const next = cartaCoiRossi({ symbols: [], ...card }, riserva, rossi, "scelta");
  await message.update({ flags: { [MODULE_ID]: { [ROLL_CARD_FLAG]: next } } });
  ui.notifications.info(format("WOD5E_MAGE.Rossi.Done", { successi: state.guadagno, total: next.total }));
  return next;
}

/** Sotto la carta di un lancio coi rossi a successo: il tasto, per chi ha il mago. */
export function decorateRossi(message, html) {
  if (!html?.querySelector) return false;
  const roll = message?.rolls?.[0];
  if (!roll) return false;
  const target = html.querySelector(".dice-result");
  if (!target || target.querySelector(".wod5e-mage-rossi-button")) return false;
  const card = message.getFlag?.(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  const { basic, advanced } = diceTerms(roll);
  const state = rossiState(card, basic?.results ?? [], advanced?.results ?? []);
  if (!state.show) return false;
  const actor = speakerActor(message);
  if (!isMageActor(actor) || !actor.isOwner) return false;

  const box = rollActionsBox(target);
  box.insertAdjacentHTML("beforeend", renderRossiButton(state, game.i18n.localize.bind(game.i18n), game.i18n.format.bind(game.i18n)));
  // Coi rossi il fallimento è ancora aperto, se bastano a coprire i successi che mancano.
  if (state.successi >= Math.max(Math.trunc(Number(card.difficulty) || 0), 1)) markRollOpen(html);
  box.querySelector("[data-rossi=\"prendi\"]")?.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await prendiRossi(message);
  });
  return true;
}

export function registerRossi() {
  Hooks.on("renderChatMessageHTML", decorateRossi);
}
