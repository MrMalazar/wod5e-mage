import { registerActorCreationChoice } from "./actor-creation.js";
import { MAGE_SHEET_ID, MODULE_ID, SUPPORTED_SYSTEM_ID } from "./constants.js";
import { isMageActor, registerMageDiceRendering } from "./mage-dice.js";
import { registerParadoxDice } from "./paradox-dice.js";
import { registerLineageSpheres } from "./famiglie.js";
import { registerRollCardRendering } from "./roll-card.js";
import { assignCondizione, listCondizioni, openCondizioniMaster, selectedActors } from "./condizioni-master.js";
import { findCondizione } from "./condizioni.js";
import { MageActorSheet } from "./sheets/mage-actor-sheet.js";

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
  registerLineageSpheres();
  registerParadoxDice();

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

  debug("Ready", {
    foundryVersion: game.version,
    systemVersion: game.system.version,
    moduleVersion: api.version
  });
});
