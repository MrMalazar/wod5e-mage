import { calculateAreteSuccesses } from "./arete-dice-pool.js";
import { MODULE_ID } from "./constants.js";
import { isMageActor } from "./mage-dice.js";
import { ROLL_CARD_FLAG, rollOutcome } from "./roll-card.js";
import { addSaluteDamage } from "./salute.js";

/**
 * Il ritiro di Volontà sotto il tiro (verdetti di Blue, 6/9/2026): quando
 * un tiro fallisce, il giocatore SCEGLIE sulla carta i dadi da ritirare
 * (fino a tre, fra i falliti: anche i rossi, MAI un rosso che ha fatto 1 o
 * 10: «una volta che è scoppiato, è scoppiato»), poi «Ritira» costa un
 * superficiale mentale; oppure «Aggravato mentale: +2 successi». Una
 * scelta sola per tiro (Il ritiro, capitolo del Sistema).
 */

export const VOLONTA_FLAG = "volonta";
export const REROLL_MAX = 3;
export const AGGRAVATED_BONUS = 2;

const isActive = (result) => result?.active !== false && !result?.discarded;

/**
 * I dadi che si possono ritirare: i falliti (1-5) fra i bianchi, i falliti
 * (2-5) fra i rossi: l'1 e il 10 del Paradosso restano dove sono. Torna
 * {kind, index} per ognuno.
 */
export function rerollableDice(basicResults = [], paradoxResults = []) {
  const basic = basicResults
    .map((result, index) => ({ kind: "basic", index, value: Number(result?.result) || 0, ok: isActive(result) }))
    .filter((entry) => entry.ok && entry.value <= 5);
  const paradox = paradoxResults
    .map((result, index) => ({ kind: "paradox", index, value: Number(result?.result) || 0, ok: isActive(result) }))
    .filter((entry) => entry.ok && entry.value >= 2 && entry.value <= 5);
  return [...basic, ...paradox].map(({ kind, index }) => ({ kind, index }));
}

/** I dadi falliti da ritirare quando nessuno sceglie: i bianchi più bassi, al massimo `count`. Torna gli indici. */
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
 * senza soglia, dove decide il giocatore), una volta sola; il ritiro vale
 * solo se c'è almeno un dado da ritirare.
 */
export function volontaState({ total = 0, difficulty = 0, failedCount = 0, used = null, burst = false } = {}) {
  if (used || burst) return { show: false, options: [] };
  const goal = Math.max(Math.trunc(Number(difficulty) || 0), 0);
  const failed = goal > 0 && Math.max(Math.trunc(Number(total) || 0), 0) < goal;
  if (goal > 0 && !failed) return { show: false, options: [] };
  const options = [1, 2, 3].map((dice) => ({ dice, enabled: failedCount >= dice }));
  return { show: true, options, aggravated: true, max: Math.min(REROLL_MAX, failedCount) };
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
  const reroll = `<button type="button" class="wod5e-mage-volonta-reroll" data-volonta="reroll" disabled title="${localize("WOD5E_MAGE.Volonta.RerollHint")}">${localize("WOD5E_MAGE.Volonta.Reroll")} <b data-role="picked">0</b>/${state.max}</button>`;
  const aggravated = `<button type="button" class="wod5e-mage-volonta-aggravato" data-volonta="aggravato" title="${localize("WOD5E_MAGE.Volonta.AggravatedHint")}">${localize("WOD5E_MAGE.Volonta.Aggravated")}</button>`;
  return `<div class="wod5e-mage-volonta"><span class="wod5e-mage-volonta-label">${localize("WOD5E_MAGE.Volonta.Label")}</span>${reroll}${aggravated}</div>`;
}

/** Il dado sulla carta: i bianchi vengono prima dei rossi, ognuno col suo indice. */
function dieElement(target, { kind, index }) {
  const dice = [...target.querySelectorAll(".dice-icons img.die")];
  const paradox = dice.filter((img) => img.classList.contains("paradox-dice"));
  const basic = dice.filter((img) => !img.classList.contains("paradox-dice"));
  const pool = kind === "paradox" ? paradox : basic;
  return pool.find((img) => Number(img.dataset.index) === index) ?? null;
}

function renderUsed(used, format) {
  let text = used.kind === "aggravato"
    ? format("WOD5E_MAGE.Volonta.UsedAggravated", { bonus: AGGRAVATED_BONUS })
    : format("WOD5E_MAGE.Volonta.UsedReroll", { dice: used.dice });
  // Un rosso ritirato che mostra 1 o 10: l'occhio del Paradosso, da guardare al tavolo.
  if (used.kind === "reroll" && Number(used.eyes) > 0) text += ` ${format("WOD5E_MAGE.Volonta.RerollEyes", { eyes: used.eyes })}`;
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
  const candidates = rerollableDice(basic.results, advanced?.results ?? []);
  const state = volontaState({ total, difficulty, failedCount: candidates.length, used });
  if (!state.show) return false;

  target.insertAdjacentHTML("beforeend", renderButtons(state, game.i18n.localize.bind(game.i18n)));
  const box = target.querySelector(".wod5e-mage-volonta");
  const rerollButton = box?.querySelector("[data-volonta=\"reroll\"]");
  const counter = box?.querySelector("[data-role=\"picked\"]");
  const picked = [];

  // I dadi da ritirare si scelgono sulla carta: un clic accende, un altro spegne.
  for (const candidate of candidates) {
    const img = dieElement(target, candidate);
    if (!img) continue;
    img.classList.add("wod5e-mage-volonta-pick");
    img.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const at = picked.findIndex((entry) => entry.kind === candidate.kind && entry.index === candidate.index);
      if (at >= 0) {
        picked.splice(at, 1);
        img.classList.remove("picked");
      } else if (picked.length < state.max) {
        picked.push(candidate);
        img.classList.add("picked");
      }
      if (counter) counter.textContent = String(picked.length);
      if (rerollButton) rerollButton.disabled = picked.length === 0;
    });
  }

  box?.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-volonta]");
    if (!button || button.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    const choice = button.dataset.volonta;
    if (choice === "aggravato") return spendAggravated(message, actor);
    return rerollDice(message, actor, picked.slice());
  });
  return true;
}

/** Il totale nuovo della carta del Mago, dopo il ritiro o l'aggravato. */
export function recountCard(card, basicResults, advancedResults) {
  return calculateAreteSuccesses(basicResults, advancedResults)
    + Math.max(Math.trunc(Number(card?.autoSuccesses) || 0), 0)
    + Math.max(Math.trunc(Number(card?.volontaBonus) || 0), 0);
}

/** Ritira i dadi scelti: i bianchi coi bianchi, i rossi coi rossi. */
async function rerollDice(message, actor, picks) {
  if (message.getFlag(MODULE_ID, VOLONTA_FLAG)) return;
  const rolls = message.rolls;
  const { basic, advanced } = diceTerms(rolls[0]);
  const chosen = (Array.isArray(picks) ? picks : []).slice(0, REROLL_MAX);
  if (!chosen.length) return;

  let eyes = 0;
  for (const kind of ["basic", "paradox"]) {
    const term = kind === "paradox" ? advanced : basic;
    const indices = chosen.filter((pick) => pick.kind === kind).map((pick) => pick.index);
    if (!term || !indices.length) continue;
    const reroll = await new foundry.dice.Roll(`${indices.length}d10cs>5`).evaluate();
    if (game.dice3d) await game.dice3d.showForRoll(reroll, game.user, true);
    const fresh = reroll.terms[0]?.results ?? [];
    for (const index of indices) {
      term.results[index].discarded = true;
      term.results[index].active = false;
    }
    for (const result of fresh) {
      term.results.push({ ...result, active: true, discarded: false });
      if (kind === "paradox" && (result.result === 1 || result.result === 10)) eyes += 1;
    }
  }

  const flags = { [MODULE_ID]: { [VOLONTA_FLAG]: { kind: "reroll", dice: chosen.length, eyes } } };
  const card = message.getFlag(MODULE_ID, ROLL_CARD_FLAG);
  if (card && Number.isFinite(Number(card.total))) {
    flags[MODULE_ID][ROLL_CARD_FLAG] = { ...card, total: recountCard(card, basic.results, advanced?.results ?? []) };
  }
  await addSaluteDamage(actor, { ms: 1 });
  await message.update({ rolls, flags });
  ui.notifications.info(game.i18n.format("WOD5E_MAGE.Volonta.RerollDone", { dice: chosen.length }));
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
