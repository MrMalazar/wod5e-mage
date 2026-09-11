import { MODULE_ID } from "./constants.js";
import { addParadoxToBalance, getMagickBalance, MAGICK_TRACK_MAX } from "./magick-balance.js";
import { isMageActor } from "./mage-dice.js";
import { normalizeEffectKind } from "./paradox-burst.js";
import { RAMO, sforzoCost } from "./ramo-c.js";
import { ROLL_CARD_FLAG, rollActionsBox, rollOutcome } from "./roll-card.js";
import { addSaluteDamage } from "./salute.js";

/**
 * Sforzare la realtà (regola di Blue, 10/9/2026 sera; ramo C dell'11/9):
 * a tiro fallito il giocatore può costringere la realtà a fare quello che
 * vuole. L'incantesimo riesce, e la Ruota sale di tanti punti di Paradosso
 * quanti ne dice il prezzo: nel ramo C la SOGLIA dell'incantesimo (non ci
 * sono successi mancanti; verdetto dell'11/9), oltre a quelli che il tiro
 * ha già portato, il Volgare, i rossi. È un azzardo: dalla seconda volta
 * nella stessa sessione costa anche un aggravato, fisico o mentale secondo
 * l'Effetto dichiarato (variabile: a caso; non dichiarato: fisico, come
 * l'Ustione). Il tasto sta nella fila sotto la fascia del tiro fallito.
 */

export const SFORZO_FLAG = "sforzo";
/** Sull'attore: quante volte in questa sessione. Nuova sessione lo azzera. */
export const SFORZO_SESSION_FLAG = "sforziSessione";

/** I successi che mancano: zero se il tiro è riuscito o senza soglia. */
export function missingSuccesses(total, difficulty) {
  const successes = Math.max(Math.trunc(Number(total) || 0), 0);
  const goal = Math.max(Math.trunc(Number(difficulty) || 0), 0);
  return goal > 0 ? Math.max(goal - successes, 0) : 0;
}

/**
 * Il tasto compare sotto un tiro fallito, non ancora sforzato né riuscito
 * a un prezzo, che non sia uno Scoppio né una riuscita senza dadi. Il
 * prezzo (`missing`, il nome resta): nel ramo C la soglia; nel ramo A i
 * successi che mancano.
 */
export function sforzoState({ total = 0, difficulty = 0, threshold = 0, ramo = "", forced = false, priced = false, burst = false, automatic = false, skill = false } = {}) {
  if (forced || priced || burst || automatic || skill) return { show: false, missing: 0 };
  const failed = missingSuccesses(total, difficulty) > 0;
  const missing = ramo === RAMO ? sforzoCost(threshold) : missingSuccesses(total, difficulty);
  if (!failed || missing <= 0) return { show: false, missing: 0 };
  return { show: true, missing };
}

/**
 * Il prezzo: Paradosso pari ai successi mancanti; dalla seconda volta in
 * sessione un aggravato, dove dice l'Effetto. `usesSoFar` conta le volte
 * già fatte in questa sessione.
 */
export function sforzoPrice({ missing = 0, usesSoFar = 0, effectKind = "", random = Math.random } = {}) {
  const paradox = Math.max(Math.trunc(Number(missing) || 0), 0);
  const uses = Math.max(Math.trunc(Number(usesSoFar) || 0), 0);
  let damage = null;
  if (uses >= 1) {
    const kind = normalizeEffectKind(effectKind);
    if (kind === "mental") damage = "ma";
    else if (kind === "variable") damage = random() < 0.5 ? "pa" : "ma";
    else damage = "pa";
  }
  return { paradox, damage, uses };
}

/**
 * Quanto Paradosso lavora davvero sulla Ruota: i punti che entrano, quelli
 * che si annullano con la Quintessenza (la Ruota piena si svuota a coppie),
 * e quelli che restano fuori perché non c'è più posto.
 */
export function sforzoBalance(balance, paradox) {
  const before = { quintessence: Math.max(Number(balance?.quintessence) || 0, 0), paradox: Math.max(Number(balance?.paradox) || 0, 0) };
  const after = addParadoxToBalance(before, paradox);
  const entered = after.paradox - before.paradox;
  const cancelled = before.quintessence - after.quintessence;
  const moved = entered + cancelled;
  return { after, entered, cancelled, moved, wasted: Math.max(paradox - moved, 0) };
}

/** I pezzi della carta che decidono il tasto. */
function stateInput(card) {
  return { total: card.total, difficulty: card.difficulty, threshold: card.threshold, ramo: card.ramo, forced: card.forced, priced: card.priced, burst: card.burst || card.burstResult, automatic: card.automatic, skill: card.skill };
}

function speakerActor(message) {
  const actor = ChatMessage.getSpeakerActor?.(message.speaker) ?? game.actors?.get(message.speaker?.actor);
  return actor ?? null;
}

function damageLabel(damage, localize) {
  if (damage === "ma") return localize("WOD5E_MAGE.Sforzo.DamageMental");
  if (damage === "pa") return localize("WOD5E_MAGE.Sforzo.DamagePhysical");
  return "";
}

/** Il tasto nella fila dei tre: «Sforzare la realtà +N», col prezzo nel titolo. */
export function renderSforzoButton(state, price, localize, format) {
  const hint = price.damage
    ? format("WOD5E_MAGE.Sforzo.HintAgain", { missing: state.missing, damage: damageLabel(price.damage, localize) })
    : format("WOD5E_MAGE.Sforzo.Hint", { missing: state.missing });
  return `<button type="button" class="wod5e-mage-roll-action wod5e-mage-sforzo-button" data-sforzo="go" title="${hint}">${localize("WOD5E_MAGE.Sforzo.Button")} <b>+${state.missing}</b></button>`;
}

/** La riga di quel che è stato fatto, al posto del tasto. */
export function renderForced(used, format, localize) {
  const parts = [format("WOD5E_MAGE.Sforzo.Done", { missing: used.missing, paradox: used.paradox })];
  if (used.damage) parts.push(format("WOD5E_MAGE.Sforzo.DoneDamage", { damage: damageLabel(used.damage, localize) }));
  if (Number(used.wasted) > 0) parts.push(format("WOD5E_MAGE.Sforzo.DoneWasted", { wasted: used.wasted }));
  return `<p class="wod5e-mage-roll-note wod5e-mage-roll-note-sforzo"><b class="wod5e-mage-sforzo-label">${localize("WOD5E_MAGE.Sforzo.Label")}</b> <span>${parts.join(" ")}</span></p>`;
}

/** Sotto i dadi di un tiro fallito del Mago: il tasto, o la riga di quel che si è fatto. */
export function decorateSforzo(message, html) {
  if (!html?.querySelector) return false;
  // Un tiro, oppure (ramo C) il lancio a zero dadi, senza tiro ma con la carta.
  const card = message.getFlag?.(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  if (!message?.rolls?.[0] && card.ramo !== RAMO) return false;
  const target = html.querySelector(".dice-result") ?? html.querySelector(".message-content");
  if (!target || target.querySelector(".wod5e-mage-sforzo-button, .wod5e-mage-roll-note-sforzo")) return false;

  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const used = message.getFlag?.(MODULE_ID, SFORZO_FLAG);
  if (used) {
    target.insertAdjacentHTML("beforeend", renderForced(used, format, localize));
    return true;
  }

  const actor = speakerActor(message);
  if (!isMageActor(actor) || !actor.isOwner) return false;
  if (!Number.isFinite(Number(card.total))) return false;
  const state = sforzoState(stateInput(card));
  if (!state.show) return false;

  const usesSoFar = Math.max(Math.trunc(Number(actor.getFlag(MODULE_ID, SFORZO_SESSION_FLAG)) || 0), 0);
  const price = sforzoPrice({ missing: state.missing, usesSoFar, effectKind: card.effectKind });
  const box = rollActionsBox(target);
  box.insertAdjacentHTML("beforeend", renderSforzoButton(state, price, localize, format));
  box.querySelector("[data-sforzo=\"go\"]")?.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await forceReality(message, actor);
  });
  return true;
}

/** La finestra che dice il prezzo, poi Sforza o Lascia stare. */
async function confirmSforzo(state, price, localize, format) {
  const lines = [`<p>${format("WOD5E_MAGE.Sforzo.Ask", { missing: state.missing })}</p>`];
  if (price.damage) lines.push(`<p>${format("WOD5E_MAGE.Sforzo.AskAgain", { times: price.uses + 1, damage: damageLabel(price.damage, localize) })}</p>`);
  lines.push(`<p><em>${localize("WOD5E_MAGE.Sforzo.AskNote")}</em></p>`);
  return foundry.applications.api.DialogV2.confirm({
    window: { title: localize("WOD5E_MAGE.Sforzo.Title") },
    content: `<div class="wod5e-mage-sforzo-ask">${lines.join("")}</div>`,
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-sforzo-dialog"],
    yes: { icon: "fas fa-hand-fist", label: localize("WOD5E_MAGE.Sforzo.Yes"), default: true },
    no: { icon: "fas fa-times", label: localize("WOD5E_MAGE.Sforzo.No") },
    rejectClose: false
  });
}

/** Costringe la realtà: la Ruota sale, l'aggravato si segna, la carta dice riuscito. */
export async function forceReality(message, actor) {
  if (message.getFlag(MODULE_ID, SFORZO_FLAG)) return null;
  const card = message.getFlag(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  const state = sforzoState(stateInput(card));
  if (!state.show) return null;
  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const usesSoFar = Math.max(Math.trunc(Number(actor.getFlag(MODULE_ID, SFORZO_SESSION_FLAG)) || 0), 0);
  const price = sforzoPrice({ missing: state.missing, usesSoFar, effectKind: card.effectKind });
  const ok = await confirmSforzo(state, price, localize, format);
  if (!ok) return null;

  // La Ruota sale: se è piena, quel che non entra si dice in chat.
  const balance = getMagickBalance(actor);
  const { after, moved, wasted } = sforzoBalance(balance, price.paradox);
  if (moved > 0) {
    await actor.setFlag(MODULE_ID, "magickBalance", { quintessence: after.quintessence, paradox: after.paradox });
  }
  if (price.damage) await addSaluteDamage(actor, { [price.damage]: 1 });
  await actor.setFlag(MODULE_ID, SFORZO_SESSION_FLAG, usesSoFar + 1);

  const used = { missing: state.missing, paradox: moved, wasted, damage: price.damage, uses: usesSoFar + 1, max: MAGICK_TRACK_MAX };
  // La carta dice riuscito; con la realtà sforzata la Volontà non ha più niente da fare.
  const flags = { [MODULE_ID]: { [SFORZO_FLAG]: used, [ROLL_CARD_FLAG]: { symbols: [], ...card, forced: true } } };
  await message.update({ flags });
  const outcome = rollOutcome(card.total, card.difficulty, localize, { forced: true });
  ui.notifications.info(`${outcome.text}. ${format("WOD5E_MAGE.Sforzo.Done", { missing: state.missing, paradox: moved })}`);
  return used;
}

export function registerSforzo() {
  Hooks.on("renderChatMessageHTML", decorateSforzo);
}
