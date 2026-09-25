import { MODULE_ID } from "./constants.js";

// Il nome della scheda sui token, per il Narratore (Blue, 25/9: «voglio che su
// ogni token, in overlay per il master, compaia il nome della scheda»).
// Il cartellino è quello di Foundry sotto il token: per chi è GM resta sempre
// visibile e porta il nome dell'attore, non quello del token («Mortale (4)»
// diventa «Sahajiya - Vasco»). Per i giocatori non cambia niente: vedono il
// nome del token come dice l'impostazione del token. Nessun dato toccato,
// tutto succede nel client di chi guarda.

export const NOMI_SCHEDA_SETTING = "nomiSchedaToken";

let acceso = false;
let notaSenzaScheda = "senza scheda";

/**
 * Il testo del cartellino: il nome della scheda; se l'attore non c'è più,
 * il nome del token con la nota, così il token orfano si riconosce.
 * @param {{name?: string, actor?: {name?: string}|null}} tokenDoc
 * @param {string} [senzaScheda]
 * @returns {string}
 */
export function testoCartellino(tokenDoc, senzaScheda = "senza scheda") {
  const nomeToken = tokenDoc?.name ?? "";
  const actor = tokenDoc?.actor;
  if (actor) return actor.name || nomeToken;
  return senzaScheda ? `${nomeToken} (${senzaScheda})`.trim() : nomeToken;
}

/** Acceso per chi è Narratore, finché non lo spegne dalle impostazioni. */
function aggiornaStato() {
  acceso = Boolean(game.user?.isGM) && game.settings.get(MODULE_ID, NOMI_SCHEDA_SETTING) !== false;
}

/** Dopo ogni giro di Foundry sul token: il testo e la visibilità del cartellino. */
function applicaCartellino(token) {
  if (!acceso) return;
  const cartellino = token?.nameplate;
  if (!cartellino || cartellino.destroyed) return;
  const testo = testoCartellino(token.document, notaSenzaScheda);
  if (cartellino.text !== testo) cartellino.text = testo;
  if (!cartellino.visible) cartellino.visible = true;
}

/**
 * Ridisegna i cartellini dei token in scena; con `actorId` solo quelli di quell'attore.
 * Spento, il giro di Foundry rimette il nome del token e la sua visibilità.
 * @param {string} [actorId]
 */
export function ridisegnaCartellini(actorId) {
  for (const token of globalThis.canvas?.tokens?.placeables ?? []) {
    if (actorId && token.document?.actorId !== actorId) continue;
    token.renderFlags?.set({ refreshNameplate: true, refreshState: true });
  }
}

export function registraNomiScheda() {
  // Nel setup c'è già l'utente: l'impostazione si vede solo fra quelle del Narratore.
  Hooks.once("setup", () => {
    game.settings.register(MODULE_ID, NOMI_SCHEDA_SETTING, {
      name: "WOD5E_MAGE.Settings.NomiScheda.Name",
      hint: "WOD5E_MAGE.Settings.NomiScheda.Hint",
      scope: "client",
      config: Boolean(game.user?.isGM),
      type: Boolean,
      default: true,
      onChange: () => {
        aggiornaStato();
        ridisegnaCartellini();
      }
    });
    notaSenzaScheda = game.i18n.localize("WOD5E_MAGE.NomiScheda.SenzaScheda");
    aggiornaStato();
  });

  Hooks.on("refreshToken", applicaCartellino);

  // La scheda rinominata o cancellata: i suoi token si ridisegnano subito.
  Hooks.on("updateActor", (actor, changes) => {
    if (acceso && "name" in (changes ?? {})) ridisegnaCartellini(actor.id);
  });
  Hooks.on("deleteActor", (actor) => {
    if (acceso) ridisegnaCartellini(actor.id);
  });
}
