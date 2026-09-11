import { calculateAreteSuccesses } from "./arete-dice-pool.js";
import { MODULE_ID } from "./constants.js";
import { isMageActor } from "./mage-dice.js";
import { calculateRamoCSuccesses, RAMO, SUCCESS_FROM, SUCCESS_MODIFIER } from "./ramo-c.js";
import { markRollOpen, ROLL_CARD_FLAG, rollActionsBox } from "./roll-card.js";
import { addSaluteDamage } from "./salute.js";

/**
 * Il ritiro di Volontà sotto il tiro (verdetti di Blue, 6/9/2026): quando
 * un tiro fallisce, il giocatore SCEGLIE sulla carta i dadi da ritirare
 * (fino a tre, fra i falliti: anche i rossi, e dall'11/9 anche il rosso che
 * ha fatto 1: si ritira per cercare il successo, ma l'occhio resta e lo
 * Scoppio con lui, «se un dado lo fa uscire si attiva»), poi «Ritira con
 * Volontà» costa un superficiale mentale. L'aggravato che comprava due successi è
 * cancellato (Blue, 10/9 notte). Il tasto sta nella fila dei tre sotto la
 * fascia, con Sforzare la realtà e Vittoria a un prezzo.
 */

export const VOLONTA_FLAG = "volonta";
export const REROLL_MAX = 3;

const isActive = (result) => result?.active !== false && !result?.discarded;
const count = (value) => Math.max(Math.trunc(Number(value) || 0), 0);

/**
 * I dadi che si possono ritirare: i falliti fra i bianchi (sotto la
 * riuscita: nel ramo C l'8, quindi 1-7) e i falliti fra i rossi, compreso
 * l'1 dell'occhio (11/9: si ritira per il successo, lo Scoppio resta; il 10
 * è già un successo e non si ritira). Torna {kind, index} per ognuno.
 */
export function rerollableDice(basicResults = [], paradoxResults = [], { successFrom = SUCCESS_FROM } = {}) {
  const basic = basicResults
    .map((result, index) => ({ kind: "basic", index, value: Number(result?.result) || 0, ok: isActive(result) }))
    .filter((entry) => entry.ok && entry.value < successFrom);
  const paradox = paradoxResults
    .map((result, index) => ({ kind: "paradox", index, value: Number(result?.result) || 0, ok: isActive(result) }))
    .filter((entry) => entry.ok && entry.value < successFrom);
  return [...basic, ...paradox].map(({ kind, index }) => ({ kind, index }));
}

/** I dadi falliti da ritirare quando nessuno sceglie: i bianchi più bassi, al massimo `count`. Torna gli indici. */
export function pickRerollDice(results = [], count = 1, { successFrom = SUCCESS_FROM } = {}) {
  const wanted = Math.min(Math.max(Math.trunc(Number(count) || 0), 0), REROLL_MAX);
  return results
    .map((result, index) => ({ index, value: Number(result?.result) || 0, ok: isActive(result) }))
    .filter((entry) => entry.ok && entry.value < successFrom)
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
 * Cosa mostrare sotto il tiro: il tasto compare solo a tiro fallito (o
 * senza soglia, dove decide il giocatore), una volta sola; è acceso solo
 * se c'è almeno un dado da ritirare (`max`), altrimenti spento con la
 * ragione nel titolo.
 */
export function volontaState({ total = 0, difficulty = 0, failedCount = 0, used = null, burst = false, forced = false, priced = false } = {}) {
  if (used || burst || forced || priced) return { show: false, max: 0 };
  const goal = Math.max(Math.trunc(Number(difficulty) || 0), 0);
  const failed = goal > 0 && Math.max(Math.trunc(Number(total) || 0), 0) < goal;
  if (goal > 0 && !failed) return { show: false, max: 0 };
  return { show: true, max: Math.min(REROLL_MAX, Math.max(Math.trunc(Number(failedCount) || 0), 0)) };
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

/** Il tasto: «Ritira con Volontà 0/3», acceso se c'è almeno un dado da ritirare (premuto senza dadi scelti, ricorda di sceglierli); senza dadi da ritirare, spento. */
export function renderRerollButton(state, localize) {
  const hint = state.max > 0 ? localize("WOD5E_MAGE.Volonta.RerollHint") : localize("WOD5E_MAGE.Volonta.NoDice");
  return `<button type="button" class="wod5e-mage-roll-action wod5e-mage-volonta-reroll" data-volonta="reroll"${state.max > 0 ? "" : " disabled"} title="${hint}">${localize("WOD5E_MAGE.Volonta.Reroll")} <small><b data-role="picked">0</b>/${state.max}</small></button>`;
}

/** Il dado sulla carta: i bianchi vengono prima dei rossi, ognuno col suo indice. */
function dieElement(target, { kind, index }) {
  const dice = [...target.querySelectorAll(".dice-icons img.die")];
  const paradox = dice.filter((img) => img.classList.contains("paradox-dice"));
  const basic = dice.filter((img) => !img.classList.contains("paradox-dice"));
  const pool = kind === "paradox" ? paradox : basic;
  return pool.find((img) => Number(img.dataset.index) === index) ?? null;
}

/** La riga di quel che si è fatto, al posto del tasto. Torna vuoto per le scelte che non esistono più. */
export function renderUsed(used, format) {
  if (used?.kind !== "reroll") return "";
  let text = format("WOD5E_MAGE.Volonta.UsedReroll", { dice: used.dice });
  // Un rosso ritirato che mostra 1 o 10: l'occhio del Paradosso, da guardare al tavolo.
  if (Number(used.eyes) > 0) text += ` ${format("WOD5E_MAGE.Volonta.RerollEyes", { eyes: used.eyes })}`;
  return `<p class="wod5e-mage-roll-note wod5e-mage-roll-note-volonta">${text}</p>`;
}

/** Sotto i dadi di ogni tiro del Mago: il tasto, o la riga di quel che si è fatto. */
export function decorateVolonta(message, html) {
  const roll = message?.rolls?.[0];
  if (!roll || !html?.querySelector) return false;
  const target = html.querySelector(".dice-result");
  if (!target || target.querySelector(".wod5e-mage-volonta-reroll, .wod5e-mage-roll-note-volonta")) return false;

  const used = message.getFlag?.(MODULE_ID, VOLONTA_FLAG);
  const format = game.i18n.format.bind(game.i18n);
  if (used) {
    const note = renderUsed(used, format);
    if (note) target.insertAdjacentHTML("beforeend", note);
    return Boolean(note);
  }

  const actor = speakerActor(message);
  if (!isMageActor(actor) || !actor.isOwner) return false;
  const card = message.getFlag?.(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  // Vittoria automatica, Scoppio, realtà già sforzata o vittoria a un prezzo: niente da ritirare.
  if (card.automatic || card.burst || card.burstResult || card.forced || card.priced) return false;

  const { basic, advanced } = diceTerms(roll);
  if (!basic) return false;
  const total = Number.isFinite(Number(card.total)) ? Number(card.total) : systemTotal(basic.results, advanced?.results ?? []);
  const difficulty = Number.isFinite(Number(card.difficulty)) ? Number(card.difficulty) : Number(roll.options?.difficulty) || 0;
  const candidates = rerollableDice(basic.results, advanced?.results ?? [], { successFrom: card.ramo === RAMO ? SUCCESS_FROM : 6 });
  const state = volontaState({ total, difficulty, failedCount: candidates.length, used });
  if (!state.show) return false;

  const box = rollActionsBox(target);
  box.insertAdjacentHTML("beforeend", renderRerollButton(state, game.i18n.localize.bind(game.i18n)));
  const rerollButton = box.querySelector("[data-volonta=\"reroll\"]");
  const counter = rerollButton?.querySelector("[data-role=\"picked\"]");
  const picked = [];
  // Con almeno un dado da ritirare il fallimento è ancora aperto: la fascia va in giallo.
  if (state.max > 0) markRollOpen(html);

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
    });
  }

  rerollButton?.addEventListener("click", (event) => {
    if (rerollButton.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    // Senza dadi scelti il tasto ricorda come si fa: si cliccano i dadi sulla carta.
    if (!picked.length) return ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.Volonta.PickFirst"));
    return rerollDice(message, actor, picked.slice());
  });
  return true;
}

/** Il totale nuovo della carta del Mago, dopo il ritiro: nel ramo C 8 o più, senza coppie. */
export function recountCard(card, basicResults, advancedResults) {
  if (card?.ramo === RAMO) {
    return calculateRamoCSuccesses(basicResults, advancedResults, card.countedParadox ?? Infinity);
  }
  return calculateAreteSuccesses(basicResults, advancedResults)
    + Math.max(Math.trunc(Number(card?.autoSuccesses) || 0), 0);
}

/** Ritira i dadi scelti: i bianchi coi bianchi, i rossi coi rossi. */
async function rerollDice(message, actor, picks) {
  if (message.getFlag(MODULE_ID, VOLONTA_FLAG)) return;
  const rolls = message.rolls;
  const { basic, advanced } = diceTerms(rolls[0]);
  const chosen = (Array.isArray(picks) ? picks : []).slice(0, REROLL_MAX);
  if (!chosen.length) return;
  const card = message.getFlag(MODULE_ID, ROLL_CARD_FLAG);

  let eyes = 0;
  for (const kind of ["basic", "paradox"]) {
    const term = kind === "paradox" ? advanced : basic;
    const indices = chosen.filter((pick) => pick.kind === kind).map((pick) => pick.index);
    if (!term || !indices.length) continue;
    const reroll = await new foundry.dice.Roll(`${indices.length}d10${card?.ramo === RAMO ? SUCCESS_MODIFIER : "cs>5"}`).evaluate();
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
  if (card && Number.isFinite(Number(card.total))) {
    const total = recountCard(card, basic.results, advanced?.results ?? []);
    flags[MODULE_ID][ROLL_CARD_FLAG] = { ...card, total };
    if (card.skill) flags[MODULE_ID][ROLL_CARD_FLAG].margin = Math.max(total - 1, 0);
    // Un rosso ritirato che mostra l'occhio chiama il Contraccolpo (ramo C):
    // l'Ustione, pari alla soglia, aspetta la scelta del giocatore sotto la carta.
    // Un occhio già uscito resta (11/9: «lo scoppio rimane»): i 10 e gli
    // occhi si contano su tutti i rossi, anche quelli ritirati.
    if (eyes > 0 && card.ramo === RAMO && Number(card.threshold) > 0 && !card.skill) {
      const reds = advanced?.results ?? [];
      const tens = reds.filter((result) => Number(result.result) === 10).length;
      const allEyes = reds.filter((result) => Number(result.result) === 1 || Number(result.result) === 10).length;
      if (!card.ustione) {
        flags[MODULE_ID][ROLL_CARD_FLAG].ustione = { threshold: Number(card.threshold), sphere: Math.max(Math.trunc(Number(card.sphereMax) || 0), 0), tens, kind: card.effectKind ?? "", eyes: allEyes, choice: "" };
      } else if (!card.ustione.choice) {
        flags[MODULE_ID][ROLL_CARD_FLAG].ustione = { ...card.ustione, tens: Math.max(tens, count(card.ustione.tens)), eyes: Math.max(allEyes, count(card.ustione.eyes)) };
      }
    }
  }
  await addSaluteDamage(actor, { ms: 1 });
  await message.update({ rolls, flags });
  ui.notifications.info(game.i18n.format("WOD5E_MAGE.Volonta.RerollDone", { dice: chosen.length }));
}

export function registerVolonta() {
  Hooks.on("renderChatMessageHTML", decorateVolonta);
}
