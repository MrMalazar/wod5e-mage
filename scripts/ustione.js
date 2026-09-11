import { MODULE_ID } from "./constants.js";
import { isMageActor } from "./mage-dice.js";
import { getMagickBalance, getParadoxFloor } from "./magick-balance.js";
import { applyUstione, paradoxAfterBurst, ustioneText } from "./paradox-burst.js";
import { ROLL_CARD_FLAG, rollActionsBox } from "./roll-card.js";

/**
 * L'Ustione del ramo C (verdetti di Blue, 11/9/2026): a Contraccolpo
 * scattato l'Ustione è pari alla soglia, e SCEGLIE IL GIOCATORE. «Brucia»:
 * i danni li prende lui, segnati sulla Salute (fisici, mentali o metà e
 * metà secondo l'Effetto; ogni due 10 un aggravato) e bloccati in rosso
 * per la scena. «Dai al Narratore»: altrettanti punti Paradosso passano
 * nella riserva del Narratore, e la realtà colpirà dove vuole lei. In
 * tutti e due i casi la Ruota si scarica di altrettanto (PROPOSTA dello
 * studio). I due tasti stanno sotto la carta del tiro; premuto uno,
 * l'altro sparisce. Non è una trattativa: la scelta è del giocatore.
 * I punti dati al Narratore sono pari al livello della Sfera usata, non
 * alla soglia (Blue, 11/9 sera: «va ridotto al pari del livello sfera»);
 * i danni restano pari alla soglia. Coi tasti non c'è testo: «vede solo i
 * bottoni e tanto basta».
 */

export const USTIONE_CHOICES = Object.freeze(["brucia", "narratore"]);

/** Cosa mostrare: i tasti finché il giocatore non ha scelto, poi la riga. */
export function ustioneState(ustione) {
  const threshold = Math.max(Math.trunc(Number(ustione?.threshold) || 0), 0);
  if (!ustione || threshold <= 0) return { show: false, chosen: "", threshold: 0, points: 0 };
  const chosen = USTIONE_CHOICES.includes(ustione.choice) ? ustione.choice : "";
  return { show: !chosen, chosen, threshold, points: givenPoints(ustione) };
}

/** I punti Paradosso al Narratore: il livello della Sfera usata; senza Sfera (i messaggi vecchi), la soglia. */
export function givenPoints(ustione) {
  const sphere = Math.max(Math.trunc(Number(ustione?.sphere) || 0), 0);
  return sphere > 0 ? sphere : Math.max(Math.trunc(Number(ustione?.threshold) || 0), 0);
}

/** I due tasti: Brucia (rosso) e Dai al Narratore (viola), con l'Ustione nel numero. */
export function renderUstioneButtons(state, localize, format) {
  const burn = format("WOD5E_MAGE.Ustione.BurnHint", { burn: state.threshold });
  const give = format("WOD5E_MAGE.Ustione.GiveHint", { points: state.points });
  return [
    `<button type="button" class="wod5e-mage-roll-action wod5e-mage-ustione-button wod5e-mage-ustione-brucia" data-ustione="brucia" title="${burn}">${localize("WOD5E_MAGE.Ustione.Burn")} <b>${state.threshold}</b></button>`,
    `<button type="button" class="wod5e-mage-roll-action wod5e-mage-ustione-button wod5e-mage-ustione-narratore" data-ustione="narratore" title="${give}">${localize("WOD5E_MAGE.Ustione.Give")} <b>${state.points}</b></button>`
  ].join("");
}

/** La riga di quel che è stato scelto, al posto dei tasti. */
export function renderUstioneDone(ustione, format, localize) {
  const label = localize("WOD5E_MAGE.Ustione.Label");
  let text = "";
  if (ustione?.choice === "brucia") {
    text = ustione.applied
      ? ustioneText(ustione.applied, format)
      : format("WOD5E_MAGE.Ustione.BurnedShort", { burn: ustione.threshold });
  } else if (ustione?.choice === "narratore") {
    text = format("WOD5E_MAGE.Ustione.Given", { points: ustione.given ?? ustione.threshold, discharged: ustione.discharged ?? 0 });
  }
  if (!text) return "";
  return `<p class="wod5e-mage-roll-note wod5e-mage-roll-note-ustione wod5e-mage-roll-note-ustione-${ustione.choice}"><b class="wod5e-mage-ustione-label">${label}</b> <span>${text}</span></p>`;
}

function speakerActor(message) {
  const actor = ChatMessage.getSpeakerActor?.(message.speaker) ?? game.actors?.get(message.speaker?.actor);
  return actor ?? null;
}

/** Sotto la carta di un tiro con l'occhio sui rossi: i due tasti, o la riga. */
export function decorateUstione(message, html) {
  if (!html?.querySelector) return false;
  const card = message.getFlag?.(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  const state = ustioneState(card.ustione);
  if (!state.show && !state.chosen) return false;
  const target = html.querySelector(".dice-result") ?? html.querySelector(".message-content");
  if (!target || target.querySelector(".wod5e-mage-ustione-button, .wod5e-mage-roll-note-ustione")) return false;

  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  if (state.chosen) {
    const note = renderUstioneDone(card.ustione, format, localize);
    if (note) target.insertAdjacentHTML("beforeend", note);
    return Boolean(note);
  }

  // Chi guarda non vede niente finché il giocatore non sceglie (Blue: «vede solo i bottoni»).
  const actor = speakerActor(message);
  if (!isMageActor(actor) || !actor.isOwner) return false;

  const box = rollActionsBox(target);
  box.insertAdjacentHTML("beforeend", renderUstioneButtons(state, localize, format));
  box.querySelector("[data-ustione=\"brucia\"]")?.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await chooseBurn(message, actor);
  });
  box.querySelector("[data-ustione=\"narratore\"]")?.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await chooseGive(message, actor);
  });
  return true;
}

/** La Ruota si scarica di un punto per punto dell'Ustione, mai sotto il pavimento. */
async function dischargeWheel(actor, amount) {
  const balance = getMagickBalance(actor);
  const paradox = paradoxAfterBurst(balance.paradox, amount, getParadoxFloor(actor));
  if (paradox !== balance.paradox) {
    await actor.setFlag(MODULE_ID, "magickBalance", { quintessence: balance.quintessence, paradox });
  }
  return balance.paradox - paradox;
}

/** Brucia: i danni sul mago, bloccati in rosso; la Ruota si scarica. */
export async function chooseBurn(message, actor) {
  const card = message.getFlag(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  const state = ustioneState(card.ustione);
  if (!state.show) return null;
  const applied = await applyUstione(actor, { threshold: state.threshold, tens: card.ustione.tens, kind: card.ustione.kind, lock: true });
  const ustione = { ...card.ustione, choice: "brucia", applied };
  await message.update({ flags: { [MODULE_ID]: { [ROLL_CARD_FLAG]: { symbols: [], ...card, ustione } } } });
  ui.notifications.info(game.i18n.format("WOD5E_MAGE.Ustione.BurnDone", { burn: state.threshold }));
  return ustione;
}

/** Dai al Narratore: punti Paradosso pari alla Sfera usata alla riserva del Narratore; la Ruota si scarica di altrettanto. */
export async function chooseGive(message, actor) {
  const card = message.getFlag(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  const state = ustioneState(card.ustione);
  if (!state.show) return null;
  const discharged = await dischargeWheel(actor, state.points);
  const ustione = {
    ...card.ustione,
    choice: "narratore",
    given: state.points,
    discharged,
    collected: false,
    actorId: actor.id,
    actorName: actor.name
  };
  await message.update({ flags: { [MODULE_ID]: { [ROLL_CARD_FLAG]: { symbols: [], ...card, ustione } } } });
  ui.notifications.info(game.i18n.format("WOD5E_MAGE.Ustione.GiveDone", { points: state.points }));
  // I punti li raccoglie il client del Narratore attivo dal gancio
  // updateChatMessage (che scatta anche qui, se il Narratore è questo client).
  return ustione;
}

export function registerUstione() {
  Hooks.on("renderChatMessageHTML", decorateUstione);
}
