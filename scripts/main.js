import { registerActorCreationChoice } from "./actor-creation.js";
import { MAGE_SHEET_ID, MODULE_ID, SUPPORTED_SYSTEM_ID } from "./constants.js";
import { isMageActor, registerMageDiceRendering } from "./mage-dice.js";
import { registerParadoxDice } from "./paradox-dice.js";
import { registerLineageSpheres } from "./famiglie.js";
import { registerRollCardRendering } from "./roll-card.js";
import { assignCondizione, listCondizioni, openCondizioniMaster, selectedActors } from "./condizioni-master.js";
import { findCondizione } from "./condizioni.js";
import { registerVolonta } from "./volonta.js";
import { registerSforzo } from "./sforzo.js";
import { registerPrezzo } from "./prezzo.js";
import { registerUstione } from "./ustione.js";
import { registerParadossoNarratore } from "./paradosso-narratore.js";
import { registerQuadroNarratore } from "./quadro-narratore.js";
import { registerGrimorioComune } from "./grimorio-comune.js";
import { registraSocketVerdetto } from "./verdetto-narratore.js";
import { SCALA_PREDEFINITA, SCALA_SETTING, TEMA_CHIARO, TEMA_SCURO, TEMA_SETTING } from "./tema.js";
import { registraCreazioneGuidata } from "./creazione-guidata-finestra.js";
import { MageActorSheet } from "./sheets/mage-actor-sheet.js";
import { registraHelperIcone } from "./icone-oggetti.js";

/**
 * Return the public API exposed by this module.
 *
 * Keeping system integration behind this object gives macros and other modules
 * a stable entry point while the Mage implementation grows.
 */
function createApi() {
  return Object.freeze({
    id: MODULE_ID,

    get version() {
      return game.modules.get(MODULE_ID)?.version ?? "0.0.0";
    },

    isSupportedSystem() {
      return game.system.id === SUPPORTED_SYSTEM_ID;
    },

    isMage(actor) {
      return isMageActor(actor);
    },

    async setMage(actor, enabled = true) {
      if (!(actor instanceof Actor)) {
        throw new TypeError("setMage requires a Foundry Actor document.");
      }

      const update = enabled
        ? {
            "flags.core.sheetClass": MAGE_SHEET_ID,
            [`flags.${MODULE_ID}.isMage`]: true
          }
        : {
            "flags.core.-=sheetClass": null,
            [`flags.${MODULE_ID}.-=isMage`]: null
          };

      return actor.update(update);
    },

    /** Le Condizioni per il Master: la finestra, o l'assegnazione diretta. */
    condizioni: Object.freeze({
      assign: openCondizioniMaster,
      list: listCondizioni,
      async toggle(id, actors = selectedActors(canvas?.tokens?.controlled)) {
        const entry = findCondizione(id);
        if (!entry) throw new Error(`Condizione sconosciuta: ${id}`);
        return assignCondizione(actors, entry);
      }
    })
  });
}

function debug(message, ...data) {
  if (!game.settings.get(MODULE_ID, "debugLogging")) return;
  console.debug(`${MODULE_ID} | ${message}`, ...data);
}

Hooks.once("init", () => {
  console.info(`${MODULE_ID} | Initializing`);

  // L'icona propria di un oggetto nella pagina Tratti (23/9): l'immagine del
  // Rifugio, la lettera solo per chi ha il segnaposto.
  registraHelperIcone(globalThis.Handlebars);

  // Each player picks how the header Wheel dresses: arc or compact bar.
  game.settings.register(MODULE_ID, "headerWheelMode", {
    name: "WOD5E_MAGE.Settings.HeaderWheelMode.Name",
    hint: "WOD5E_MAGE.Settings.HeaderWheelMode.Hint",
    scope: "client",
    config: true,
    type: String,
    choices: {
      wheel: "WOD5E_MAGE.Settings.HeaderWheelMode.Wheel",
      bar: "WOD5E_MAGE.Settings.HeaderWheelMode.Bar"
    },
    default: "wheel"
  });

  // La modalità chiara (16/9): il tema della scheda del Mago, per giocatore.
  // Si gira anche dal tasto accanto ai tre pallini della finestra; cambiando,
  // riveste le schede aperte senza render.
  game.settings.register(MODULE_ID, TEMA_SETTING, {
    name: "WOD5E_MAGE.Settings.SheetTheme.Name",
    hint: "WOD5E_MAGE.Settings.SheetTheme.Hint",
    scope: "client",
    config: true,
    type: String,
    choices: {
      [TEMA_SCURO]: "WOD5E_MAGE.Settings.SheetTheme.Scuro",
      [TEMA_CHIARO]: "WOD5E_MAGE.Settings.SheetTheme.Chiaro"
    },
    default: TEMA_SCURO,
    onChange: (value) => MageActorSheet.applicaTemaOvunque(value)
  });

  // La misura del testo (16/9 sera): piccolo, medio, grande; una scala sul
  // contenuto della finestra, ogni cosa tiene la sua proporzione. Si gira
  // anche dal tasto a sinistra di quello del tema.
  game.settings.register(MODULE_ID, SCALA_SETTING, {
    name: "WOD5E_MAGE.Settings.SheetScale.Name",
    hint: "WOD5E_MAGE.Settings.SheetScale.Hint",
    scope: "client",
    config: true,
    type: String,
    choices: {
      piccolo: "WOD5E_MAGE.Scala.Piccolo",
      medio: "WOD5E_MAGE.Scala.Medio",
      grande: "WOD5E_MAGE.Scala.Grande"
    },
    default: SCALA_PREDEFINITA,
    onChange: (value) => MageActorSheet.applicaScalaOvunque(value)
  });

  // Le Abilità tutte in fila (16/9 sera): il tasto accanto al + della prima pagina.
  game.settings.register(MODULE_ID, "skillsFlat", {
    scope: "client",
    config: false,
    type: Boolean,
    default: false
  });

  game.settings.register(MODULE_ID, "debugLogging", {
    name: "WOD5E_MAGE.Settings.DebugLogging.Name",
    hint: "WOD5E_MAGE.Settings.DebugLogging.Hint",
    scope: "client",
    config: true,
    type: Boolean,
    default: false
  });

  foundry.applications.apps.DocumentSheetConfig.registerSheet(
    Actor,
    MODULE_ID,
    MageActorSheet,
    {
      types: ["mortal"],
      label: "WOD5E_MAGE.Sheets.Mage",
      makeDefault: false,
      canBeDefault: true,
      canConfigure: true
    }
  );

  registerActorCreationChoice();
  registerMageDiceRendering();
  registerRollCardRendering();
  registerVolonta();
  // Sforzare la realtà (10/9 sera): il tasto sotto il tiro fallito, dopo la Volontà.
  registerSforzo();
  registerPrezzo();
  // Il ramo C (11/9): la scelta dell'Ustione sotto la carta, e i punti
  // Paradosso del Narratore col pannello e la lobby.
  registerUstione();
  registerParadossoNarratore();
  registerQuadroNarratore();
  registerGrimorioComune();
  registerLineageSpheres();
  registerParadoxDice();
  // La creazione guidata (23/9): i testi del Narratore e l'apertura sul Mago nuovo.
  registraCreazioneGuidata();

  const module = game.modules.get(MODULE_ID);
  if (module) module.api = createApi();
});

Hooks.once("ready", () => {
  const api = game.modules.get(MODULE_ID)?.api;

  if (!api?.isSupportedSystem()) {
    ui.notifications.error(
      game.i18n.format("WOD5E_MAGE.Errors.UnsupportedSystem", {
        expected: SUPPORTED_SYSTEM_ID,
        actual: game.system.id
      }),
      { permanent: true }
    );
    return;
  }

  // Il verdetto del Narratore sui tiri dei giocatori (16/9 sera): il canale del modulo.
  registraSocketVerdetto();

  debug("Ready", {
    foundryVersion: game.version,
    systemVersion: game.system.version,
    moduleVersion: api.version
  });
});
