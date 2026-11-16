import { MODULE_ID } from "./constants.js";
import { DICE_CHAT_ROOT } from "./dice-faces.js";
import { isMageActor } from "./mage-dice.js";
import { ROLL_CARD_FLAG, rollActionsBox } from "./roll-card.js";
import { addSaluteDamage } from "./salute.js";
import { contaDanni, contaSuccessi, esito, faccia } from "./sistema.js";

/**
 * Il dado dei danni (il Sistema, voce Potenza). Con la lente Danni la Potenza
 * dà un dado dei danni per livello: un dado a dieci facce coi simboli di
 * sempre, dove la vuota non fa danni, la scintilla ne fa 2 e la stellina 4.
 * Fino alla 1.40.0 i danni di un effetto erano l'Areté più la Potenza, un
 * numero fisso; l'Areté nella riserva non entra più, e nemmeno qui.
 *
 * Il tasto «Tira i danni» sta sotto la carta di un lancio riuscito che porta
 * la Potenza con la lente Danni, e sulla carta della Magick di un nemico. Il
 * tiro va in chat con le facce uscite e il totale; se la carta sapeva il
 * bersaglio, chi lo possiede (o il Narratore) li segna sulla Salute.
 * I conti sono puri: si provano fuori da Foundry.
 */

export const DANNI_FLAG = "danni";

/** La lente della Potenza che fa danni. */
export const LENTE_DANNI = "potencyDamage";

const intero = (value) => Math.max(Math.trunc(Number(value) || 0), 0);

/** I dadi dei danni di un effetto: il livello della Potenza quando si legge con la lente Danni, altrimenti nessuno. */
export function dadiDeiDanni(potenza, lente = LENTE_DANNI) {
  return lente === LENTE_DANNI ? Math.min(intero(potenza), 7) : 0;
}

/** La lettura dei dadi usciti: quante scintille, quante stelline, e i danni che fanno. */
export function leggiDanni(risultati = []) {
  const conto = contaSuccessi(risultati);
  return { dadi: conto.dadi, vuote: conto.vuote, scintille: conto.scintille, stelline: conto.stelline, danni: contaDanni(risultati) };
}

function escapeHtml(value) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** La faccia di un dado dei danni in chat: la vuota è un quadrato, le altre il simbolo del modulo. */
function facciaHtml(dado) {
  const tipo = faccia(dado);
  if (tipo === "vuota") return '<span class="wod5e-mage-danni-dado vuoto" aria-hidden="true"></span>';
  const file = tipo === "stellina" ? "magick-stellina.svg" : "magick-scintilla.svg";
  return `<img class="wod5e-mage-danni-dado" src="${DICE_CHAT_ROOT}${file}" alt="${tipo === "stellina" ? "4" : "2"}">`;
}

/** La carta in chat: il titolo, le facce uscite, i danni in grande, la regola in piccolo. */
export function renderDanni({ titolo = "", risultati = [] } = {}, localize = (key) => key, format = (key) => key) {
  const lettura = leggiDanni(risultati);
  return [
    '<div class="wod5e-mage-roll-card wod5e-mage-danni-carta">',
    `<div class="wod5e-mage-danni-testa"><b>${escapeHtml(localize("WOD5E_MAGE.Danni.Titolo"))}</b>${titolo ? `<small>${escapeHtml(titolo)}</small>` : ""}</div>`,
    `<div class="wod5e-mage-danni-dadi">${risultati.map(facciaHtml).join("")}</div>`,
    `<div class="wod5e-mage-danni-totale"><b>${lettura.danni}</b><span>${escapeHtml(format("WOD5E_MAGE.Danni.Conto", { dadi: lettura.dadi, scintille: lettura.scintille, stelline: lettura.stelline }))}</span></div>`,
    "</div>"
  ].join("");
}

/** Il tasto: «Tira i danni», coi dadi nel numero e la regola nel sorvolo. */
export function renderDanniButton(dadi, localize = (key) => key, format = (key) => key) {
  return `<button type="button" class="wod5e-mage-roll-action wod5e-mage-danni-button" data-danni="tira" title="${escapeHtml(format("WOD5E_MAGE.Danni.Hint", { dadi }))}">${escapeHtml(localize("WOD5E_MAGE.Danni.Tira"))} <b>${dadi}</b></button>`;
}

/** Il lancio riuscito di un mago che porta dadi dei danni: lì compare il tasto. */
export function danniDellaCarta(card = {}) {
  const dadi = intero(card?.danni);
  if (!dadi || card.skill || card.burst || card.burstResult || card.saggezza) return 0;
  const riuscito = card.forced || card.priced || card.bought || esito({ successi: card.total, soglia: card.difficulty }).riuscito;
  return riuscito ? dadi : 0;
}

/** Tira i dadi dei danni e manda la carta in chat. Torna il messaggio, o null senza dadi. */
export async function tiraDanni({ dadi = 0, actor = null, titolo = "", bersaglio = null } = {}) {
  const quanti = intero(dadi);
  if (quanti <= 0) return null;
  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const roll = await new foundry.dice.Roll(`${quanti}d10`).evaluate();
  if (game.dice3d) await game.dice3d.showForRoll(roll, game.user, true);
  const risultati = (roll.terms[0]?.results ?? []).map((result) => ({ result: result.result, active: true }));
  const lettura = leggiDanni(risultati);
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: renderDanni({ titolo, risultati }, localize, format),
    flags: { [MODULE_ID]: { [DANNI_FLAG]: { dadi: quanti, danni: lettura.danni, facce: risultati.map((dado) => dado.result), bersaglio: bersaglio?.uuid ? { uuid: String(bersaglio.uuid), name: String(bersaglio.name ?? "") } : null, applicato: false } } }
  });
}

/** Il bersaglio: il primo token preso di mira da chi tira, se ha un attore. */
function bersaglioPreso(user = globalThis.game?.user) {
  const token = [...(user?.targets ?? [])][0];
  const actor = token?.actor;
  return actor ? { uuid: String(actor.uuid ?? ""), name: String(token.name ?? actor.name ?? "") } : null;
}

function speakerActor(message) {
  const actor = ChatMessage.getSpeakerActor?.(message.speaker) ?? game.actors?.get(message.speaker?.actor);
  return actor ?? null;
}

/** Sotto la carta di un lancio riuscito con la Potenza in Danni: il tasto, per chi ha il mago. */
export function decorateDanniLancio(message, html) {
  if (!html?.querySelector) return false;
  const card = message.getFlag?.(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  const dadi = danniDellaCarta(card);
  if (!dadi) return false;
  const target = html.querySelector(".dice-result") ?? html.querySelector(".message-content");
  if (!target || target.querySelector(".wod5e-mage-danni-button")) return false;
  const actor = speakerActor(message);
  if (!isMageActor(actor) || !actor.isOwner) return false;
  const box = rollActionsBox(target);
  box.insertAdjacentHTML("beforeend", renderDanniButton(dadi, game.i18n.localize.bind(game.i18n), game.i18n.format.bind(game.i18n)));
  box.querySelector("[data-danni=\"tira\"]")?.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await tiraDanni({ dadi, actor, titolo: String(card.title ?? ""), bersaglio: bersaglioPreso() });
  });
  return true;
}

/** Sulla carta dei danni che sa il bersaglio: «Applica a <bersaglio>», per chi lo possiede o per il Narratore. */
export async function decorateDanniCarta(message, html) {
  const dati = message?.getFlag?.(MODULE_ID, DANNI_FLAG);
  if (!dati || !html?.querySelector) return false;
  const carta = html.querySelector(".wod5e-mage-danni-carta");
  if (!carta || carta.querySelector("[data-danni-applica]")) return false;
  if (!dati.bersaglio?.uuid || !intero(dati.danni) || dati.applicato) return true;
  const target = await fromUuid(dati.bersaglio.uuid).catch(() => null);
  if (!target || !(game.user?.isGM || target.isOwner)) return true;
  const format = game.i18n.format.bind(game.i18n);
  const button = document.createElement("button");
  button.type = "button";
  button.className = "wod5e-mage-nemico-applica";
  button.dataset.danniApplica = "1";
  button.textContent = format("WOD5E_MAGE.Danni.Applica", { danni: dati.danni, bersaglio: dati.bersaglio.name });
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    button.disabled = true;
    await addSaluteDamage(target, { ps: intero(dati.danni) });
    ui.notifications.info(format("WOD5E_MAGE.Danni.Applicati", { danni: dati.danni, bersaglio: target.name }));
    if (message.isOwner || game.user.isGM) await message.update({ [`flags.${MODULE_ID}.${DANNI_FLAG}.applicato`]: true }).catch(() => null);
    button.remove();
  });
  carta.append(button);
  return true;
}

export function registerDanni() {
  Hooks.on("renderChatMessageHTML", (message, html) => { decorateDanniLancio(message, html); decorateDanniCarta(message, html); });
}
