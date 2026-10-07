import { MODULE_ID } from "./constants.js";
import { isMageActor } from "./mage-dice.js";
import { ROLL_CARD_FLAG, rollActionsBox } from "./roll-card.js";
import { esitoIndulgere, fineDi, LATI, normalizeLato, normalizeSaggezza, passoTesto, rollSaggezza, saveSaggezza } from "./wisdom.js";

/**
 * L'Indulgere (Blue, 3/10/2026), al posto dello Sforzare la realtà del 10/9:
 * prima di un lancio di Magick il giocatore dichiara che indulge, il
 * Narratore dice se lo scopo è l'Hubris o il Silenzio, e si tira.
 * L'incantesimo riesce comunque («Successo indulgendo»), e subito dopo
 * tocca il tiro di Saggezza: Fermezza + Autocontrollo meno la soglia
 * dell'incantesimo, un 8 riesce. Fallito, il segno del lato scelto scende
 * di un passo, anche dove il cancello lo fermerebbe. Il giocatore lo vede
 * dopo: sotto la carta del lancio compare il tasto «Tira Saggezza», così si
 * ricorda che la riserva sono quei due Attributi. Il prezzo dello Sforzare
 * (Paradosso pari alla soglia, la copia al Narratore, l'aggravato dalla
 * seconda volta) non c'è più.
 *
 * Sulla carta del lancio: `indulgi` (il lato) e `forced` (la fascia dice
 * Successo); sul messaggio, la bandiera `indulgere` con com'è andato il tiro
 * di Saggezza.
 */

export const INDULGERE_FLAG = "indulgere";

/** Il lato dichiarato è uno dei due; altrimenti non si indulge. */
export function normalizeIndulgi(value) {
  return normalizeLato(value);
}

/** Il tasto «Tira Saggezza» compare sotto la carta di un lancio indulto e non ancora pagato. */
export function indulgereState(card = {}, used = null) {
  const lato = normalizeIndulgi(card?.indulgi);
  if (!lato || used) return { show: false, lato: "", soglia: 0 };
  return { show: true, lato, soglia: Math.max(Math.trunc(Number(card.threshold) || 0), 0) };
}

/** Le voci del menù sul tasto del Tiro: nell'Hubris, nel Silenzio, niente. */
export function indulgereOptions(localize = (key) => key) {
  return [
    ...LATI.map((lato) => ({ state: lato, text: localize(`WOD5E_MAGE.Indulgere.Nel.${lato}`), glyph: null })),
    { state: "", text: localize("WOD5E_MAGE.Indulgere.No"), glyph: null }
  ];
}

function speakerActor(message) {
  const actor = ChatMessage.getSpeakerActor?.(message.speaker) ?? game.actors?.get(message.speaker?.actor);
  return actor ?? null;
}

/** Il tasto nella fila sotto la fascia: «Tira Saggezza», col lato e la soglia nel titolo. */
export function renderIndulgereButton(state, localize, format) {
  const hint = format("WOD5E_MAGE.Indulgere.Hint", { lato: localize(`WOD5E_MAGE.Wisdom.Lati.${state.lato}`), soglia: state.soglia });
  return `<button type="button" class="wod5e-mage-roll-action wod5e-mage-indulgere-button" data-indulgere="go" title="${hint}">${localize("WOD5E_MAGE.Indulgere.Button")}</button>`;
}

/** La riga di quel che è successo, al posto del tasto. */
export function renderIndulto(used, localize) {
  const testo = String(used?.testo ?? "");
  return `<p class="wod5e-mage-roll-note wod5e-mage-roll-note-indulgere ${used?.esito === "fallito" ? "scende" : "resta"}"><b class="wod5e-mage-indulgere-label">${localize("WOD5E_MAGE.Indulgere.Label")}</b> <span>${testo.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span></p>`;
}

/** Sotto i dadi di un lancio indulto: il tasto, o la riga di quel che si è fatto. */
export function decorateIndulgere(message, html) {
  if (!html?.querySelector) return false;
  const card = message.getFlag?.(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  if (!normalizeIndulgi(card.indulgi)) return false;
  const target = html.querySelector(".dice-result") ?? html.querySelector(".message-content");
  if (!target || target.querySelector(".wod5e-mage-indulgere-button, .wod5e-mage-roll-note-indulgere")) return false;

  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const used = message.getFlag?.(MODULE_ID, INDULGERE_FLAG);
  if (used) {
    target.insertAdjacentHTML("beforeend", renderIndulto(used, localize));
    return true;
  }

  const actor = speakerActor(message);
  if (!isMageActor(actor) || !actor.isOwner) return false;
  const state = indulgereState(card, used);
  if (!state.show) return false;

  const box = rollActionsBox(target);
  box.insertAdjacentHTML("beforeend", renderIndulgereButton(state, localize, format));
  box.querySelector("[data-indulgere=\"go\"]")?.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await indulgi(message, actor);
  });
  return true;
}

/**
 * Il tiro di Saggezza dell'Indulgere: la soglia è quella dell'incantesimo,
 * il lato quello dichiarato. Fallito, il segno scende di un passo senza
 * cancello; la carta del lancio prende la riga di com'è andata.
 */
export async function indulgi(message, actor) {
  if (message.getFlag(MODULE_ID, INDULGERE_FLAG)) return null;
  const card = message.getFlag(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  const state = indulgereState(card);
  if (!state.show) return null;
  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const latoNome = localize(`WOD5E_MAGE.Wisdom.Lati.${state.lato}`);

  const tiro = await rollSaggezza(actor, {
    soglia: state.soglia,
    title: format("WOD5E_MAGE.Indulgere.Rolling", { lato: latoNome }),
    card: { indulgere: state.lato, soglia: state.soglia }
  });
  if (!tiro) return null;

  const stato = normalizeSaggezza(actor.getFlag(MODULE_ID, "wisdom"));
  const esito = esitoIndulgere(stato, { lato: state.lato, successi: tiro.successi });
  if (esito.sposta) await saveSaggezza(actor, esito.next);
  const testo = esito.esito === "fallito"
    ? format("WOD5E_MAGE.Indulgere.Fallito", { lato: latoNome, passo: passoTesto(state.lato, esito.passo, localize, format) })
    : format("WOD5E_MAGE.Indulgere.Riuscito", { lato: latoNome });
  const fine = fineDi(esito.next) ? localize(`WOD5E_MAGE.Wisdom.Fine.${fineDi(esito.next)}`) : "";
  const used = { lato: state.lato, soglia: state.soglia, successi: tiro.successi, esito: esito.esito, passo: esito.passo, testo: [testo, fine].filter(Boolean).join(" ") };

  // La carta del tiro di Saggezza dice la stessa cosa sotto i dadi.
  const saggezzaCard = tiro.message.getFlag?.(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  await tiro.message.update({ flags: { [MODULE_ID]: { [ROLL_CARD_FLAG]: { ...saggezzaCard, saggezza: { ...(saggezzaCard.saggezza ?? {}), esito: esito.esito, passo: esito.passo, testo: used.testo } } } } });
  await message.update({ flags: { [MODULE_ID]: { [INDULGERE_FLAG]: used } } });
  ui.notifications.info(used.testo);
  return used;
}

export function registerIndulgere() {
  Hooks.on("renderChatMessageHTML", decorateIndulgere);
}
