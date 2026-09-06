import { calculateAreteSuccesses } from "./arete-dice-pool.js";
import { MODULE_ID } from "./constants.js";
import { isMageActor } from "./mage-dice.js";
import { ROLL_CARD_FLAG, rollOutcome } from "./roll-card.js";
import { addSaluteDamage } from "./salute.js";

/**
 * Il ritiro di Volontà sotto il tiro (verdetto di Blue, 6/9/2026): quando
 * un tiro fallisce, sotto i dadi compaiono i tasti «Ritira 1», «Ritira 2»,
 * «Ritira 3» (un superficiale mentale, si ritirano i dadi falliti più bassi)
 * e «Aggravato mentale: +2 successi». Una scelta sola per tiro; mai i rossi
 * del Paradosso (Il ritiro, capitolo del Sistema).
 */

export const VOLONTA_FLAG = "volonta";
export const REROLL_MAX = 3;
export const AGGRAVATED_BONUS = 2;

const isActive = (result) => result?.active !== false && !result?.discarded;

/** I dadi falliti da ritirare: i più bassi, al massimo `count`. Torna gli indici. */
export function pickRerollDice(results = [], count = 1) {
  const wanted = Math.min(Math.max(Math.trunc(Number(count) || 0), 0), REROLL_MAX);
  return results
    .map((result, index) => ({ index, value: Number(result?.result) || 0, ok: isActive(result) }))
    .filter((entry) => entry.ok && entry.value <= 5)
    .sort((a, b) => a.value - b.value || a.index - b.index)
    .slice(0, wanted)
    .map((entry) => entry.index);
}

/** Il conto del sistema, per i tiri senza carta del Mago: 6+ e coppie di 10 fra tutti i dadi. */
export function systemTotal(basicResults = [], advancedResults = []) {
  const all = [...basicResults, ...advancedResults].filter(isActive);
  const successes = all.filter((result) => Number(result.result) >= 6).length;
  const tens = all.filter((result) => Number(result.result) === 10).length;
  return successes + Math.floor(tens / 2) * 2;
}

/**
 * Cosa mostrare sotto il tiro: i tasti compaiono solo a tiro fallito (o
 * senza soglia, dove decide il giocatore), una volta sola, e ogni «Ritira N»
 * vale solo se ci sono almeno N dadi falliti.
 */
export function volontaState({ total = 0, difficulty = 0, failedCount = 0, used = null, burst = false } = {}) {
  if (used || burst) return { show: false, options: [] };
  const goal = Math.max(Math.trunc(Number(difficulty) || 0), 0);
  const failed = goal > 0 && Math.max(Math.trunc(Number(total) || 0), 0) < goal;
  if (goal > 0 && !failed) return { show: false, options: [] };
  const options = [1, 2, 3].map((dice) => ({ dice, enabled: failedCount >= dice }));
  return { show: true, options, aggravated: true };
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

function renderButtons(state, localize) {
  const buttons = state.options.map((option) => `<button type="button" data-volonta="${option.dice}" ${option.enabled ? "" : "disabled"} title="${localize("WOD5E_MAGE.Volonta.RerollHint")}">${localize("WOD5E_MAGE.Volonta.Reroll")} ${option.dice}</button>`);
  buttons.push(`<button type="button" class="wod5e-mage-volonta-aggravato" data-volonta="aggravato" title="${localize("WOD5E_MAGE.Volonta.AggravatedHint")}">${localize("WOD5E_MAGE.Volonta.Aggravated")}</button>`);
  return `<div class="wod5e-mage-volonta"><span class="wod5e-mage-volonta-label">${localize("WOD5E_MAGE.Volonta.Label")}</span>${buttons.join("")}</div>`;
}

function renderUsed(used, format) {
  const text = used.kind === "aggravato"
    ? format("WOD5E_MAGE.Volonta.UsedAggravated", { bonus: AGGRAVATED_BONUS })
    : format("WOD5E_MAGE.Volonta.UsedReroll", { dice: used.dice });
  return `<p class="wod5e-mage-roll-note wod5e-mage-roll-note-volonta">${text}</p>`;
}

/** Sotto i dadi di ogni tiro del Mago: i tasti, o la riga di quel che si è fatto. */
export function decorateVolonta(message, html) {
  const roll = message?.rolls?.[0];
  if (!roll || !html?.querySelector) return false;
  const target = html.querySelector(".dice-result");
  if (!target || target.querySelector(".wod5e-mage-volonta, .wod5e-mage-roll-note-volonta")) return false;

  const used = message.getFlag?.(MODULE_ID, VOLONTA_FLAG);
  const format = game.i18n.format.bind(game.i18n);
  if (used) {
    target.insertAdjacentHTML("beforeend", renderUsed(used, format));
    return true;
  }

  const actor = speakerActor(message);
  if (!isMageActor(actor) || !actor.isOwner) return false;
  const card = message.getFlag?.(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  if (card.automatic || card.burst || card.burstResult) return false;

  const { basic, advanced } = diceTerms(roll);
  if (!basic) return false;
  const total = Number.isFinite(Number(card.total)) ? Number(card.total) : systemTotal(basic.results, advanced?.results ?? []);
  const difficulty = Number.isFinite(Number(card.difficulty)) ? Number(card.difficulty) : Number(roll.options?.difficulty) || 0;
  const state = volontaState({ total, difficulty, failedCount: pickRerollDice(basic.results, REROLL_MAX).length, used });
  if (!state.show) return false;

  target.insertAdjacentHTML("beforeend", renderButtons(state, game.i18n.localize.bind(game.i18n)));
  target.querySelector(".wod5e-mage-volonta")?.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-volonta]");
    if (!button || button.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    const choice = button.dataset.volonta;
    if (choice === "aggravato") return spendAggravated(message, actor);
    return rerollDice(message, actor, Number(choice) || 1);
  });
  return true;
}

/** Il totale nuovo della carta del Mago, dopo il ritiro o l'aggravato. */
export function recountCard(card, basicResults, advancedResults) {
  return calculateAreteSuccesses(basicResults, advancedResults)
    + Math.max(Math.trunc(Number(card?.autoSuccesses) || 0), 0)
    + Math.max(Math.trunc(Number(card?.volontaBonus) || 0), 0);
}

async function rerollDice(message, actor, count) {
  if (message.getFlag(MODULE_ID, VOLONTA_FLAG)) return;
  const rolls = message.rolls;
  const { basic, advanced } = diceTerms(rolls[0]);
  const indices = pickRerollDice(basic?.results ?? [], count);
  if (!indices.length) return;

  const reroll = await new foundry.dice.Roll(`${indices.length}d${basic.denomination}cs>5`).evaluate();
  if (game.dice3d) await game.dice3d.showForRoll(reroll, game.user, true);
  const fresh = reroll.terms[0]?.results ?? [];

  for (const index of indices) {
    basic.results[index].discarded = true;
    basic.results[index].active = false;
  }
  for (const result of fresh) basic.results.push({ ...result, active: true, discarded: false });

  const flags = { [MODULE_ID]: { [VOLONTA_FLAG]: { kind: "reroll", dice: indices.length } } };
  const card = message.getFlag(MODULE_ID, ROLL_CARD_FLAG);
  if (card && Number.isFinite(Number(card.total))) {
    flags[MODULE_ID][ROLL_CARD_FLAG] = { ...card, total: recountCard(card, basic.results, advanced?.results ?? []) };
  }
  await addSaluteDamage(actor, { ms: 1 });
  await message.update({ rolls, flags });
  ui.notifications.info(game.i18n.format("WOD5E_MAGE.Volonta.RerollDone", { dice: indices.length }));
}

async function spendAggravated(message, actor) {
  if (message.getFlag(MODULE_ID, VOLONTA_FLAG)) return;
  const { basic, advanced } = diceTerms(message.rolls[0]);
  const card = message.getFlag(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  const base = Number.isFinite(Number(card.total)) ? Number(card.total) : systemTotal(basic?.results ?? [], advanced?.results ?? []);
  const difficulty = Number.isFinite(Number(card.difficulty)) ? Number(card.difficulty) : Number(message.rolls[0]?.options?.difficulty) || 0;
  const flags = {
    [MODULE_ID]: {
      [VOLONTA_FLAG]: { kind: "aggravato", bonus: AGGRAVATED_BONUS },
      [ROLL_CARD_FLAG]: { symbols: [], ...card, total: base + AGGRAVATED_BONUS, difficulty, volontaBonus: AGGRAVATED_BONUS }
    }
  };
  await addSaluteDamage(actor, { ma: 1 });
  await message.update({ flags });
  const outcome = rollOutcome(base + AGGRAVATED_BONUS, difficulty, game.i18n.format.bind(game.i18n));
  ui.notifications.info(game.i18n.format("WOD5E_MAGE.Volonta.AggravatedDone", { bonus: AGGRAVATED_BONUS, total: outcome.total }));
}

export function registerVolonta() {
  Hooks.on("renderChatMessageHTML", decorateVolonta);
}
