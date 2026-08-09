import { MortalActorSheet } from "/systems/wod5e/system/actor/mortal-actor-sheet.js";
import { getArete, onAreteChange, onAreteRoll } from "../arete.js";
import { prepareConceptChallenge } from "../concept-challenge.js";
import { onFocusInstrumentToggle, prepareFocus } from "../focus.js";
import {
  getPersistentMagickResources,
  onMagickBalanceChange,
  prepareMagickTrack
} from "../magick-balance.js";
import {
  onOngoingMagickAdd,
  onOngoingMagickDelete,
  prepareOngoingMagick
} from "../ongoing-magick.js";
import { onScopeChange, prepareScopes } from "../scopes.js";
import { onSphereSelectionChange, prepareSpheres } from "../spheres.js";
import { getWisdom, onWisdomResourceChange, onWisdomRoll } from "../wisdom.js";

const {
  header: _nativeHeader,
  tabs,
  stats,
  experience,
  ...remainingParts
} = MortalActorSheet.PARTS;

/**
 * Mage sheet for mortal Actors.
 *
 * It intentionally inherits every part and action from MortalActorSheet. Mage
 * fields can be introduced incrementally without changing the native system.
 */
export class MageActorSheet extends MortalActorSheet {
  static DEFAULT_OPTIONS = {
    classes: ["wod5e-mage", "mage"],
    actions: {
      areteChange: onAreteChange,
      areteRoll: onAreteRoll,
      focusInstrumentToggle: onFocusInstrumentToggle,
      magickBalanceChange: onMagickBalanceChange,
      ongoingMagickAdd: onOngoingMagickAdd,
      ongoingMagickDelete: onOngoingMagickDelete,
      scopeChange: onScopeChange,
      sphereSelectionChange: onSphereSelectionChange,
      wisdomResourceChange: onWisdomResourceChange,
      wisdomRoll: onWisdomRoll
    }
  };

  static PARTS = {
    header: {
      template: "modules/wod5e-mage/templates/actor/mage-header.hbs",
      templates: [
        "systems/wod5e/display/shared/actors/parts/health.hbs",
        "systems/wod5e/display/shared/actors/parts/willpower.hbs",
        "systems/wod5e/display/shared/actors/parts/header-profile.hbs",
        "modules/wod5e-mage/templates/actor/parts/wisdom.hbs"
      ]
    },
    tabs,
    stats,
    experience,
    magick: {
      template: "modules/wod5e-mage/templates/actor/parts/spheres.hbs"
    },
    focus: {
      template: "modules/wod5e-mage/templates/actor/parts/focus.hbs"
    },
    conceptChallenge: {
      template: "modules/wod5e-mage/templates/actor/parts/concept-challenge.hbs"
    },
    ...remainingParts
  };

  constructor(options = {}) {
    super(options);

    const { stats, experience, ...remainingTabs } = this.tabs;
    this.tabs = {
      stats,
      magick: {
        id: "magick",
        group: "primary",
        title: "WOD5E_MAGE.Tabs.Magick",
        icon: '<i class="fa-solid fa-circle-nodes"></i>'
      },
      focus: {
        id: "focus",
        group: "primary",
        title: "WOD5E_MAGE.Tabs.Focus",
        icon: '<i class="fa-solid fa-bullseye"></i>'
      },
      conceptChallenge: {
        id: "conceptChallenge",
        group: "primary",
        title: "WOD5E_MAGE.Tabs.ConceptChallenge",
        icon: '<i class="fa-solid fa-pen-to-square"></i>'
      },
      experience,
      ...remainingTabs
    };
  }

  get title() {
    const label = game.i18n.localize("WOD5E_MAGE.Sheets.Mage");
    const tokenPrefix = this.actor.isToken ? "[Token] " : "";
    return `${tokenPrefix}${label}: ${this.actor.name}`;
  }

  async _prepareContext() {
    const context = await super._prepareContext();
    context.currentTypeLabel = "WOD5E_MAGE.Sheets.Awakened";
    context.wisdom = getWisdom(this.actor);
    return context;
  }

  async _preparePartContext(partId, context, options) {
    context = { ...(await super._preparePartContext(partId, context, options)) };

    if (partId === "magick") {
      context.tab = context.tabs.magick;
      context.arete = getArete(this.actor);
      context.magickTrack = prepareMagickTrack(this.actor);
      context.persistentMagickResources = getPersistentMagickResources(this.actor);
      context.scopes = prepareScopes(this.actor);
      context.ongoingMagick = prepareOngoingMagick(this.actor);
      // Sort the upper icon selector by the labels the player actually sees.
      // Passing i18n explicitly avoids relying on global fallback resolution.
      const sphereData = prepareSpheres(this.actor, {
        localize: game.i18n.localize.bind(game.i18n),
        locale: game.i18n.lang
      });
      context.sphereChoices = sphereData.all;
      context.spheres = sphereData.selected;
    }

    if (partId === "conceptChallenge") {
      context.tab = context.tabs.conceptChallenge;
      context.conceptChallenge = await prepareConceptChallenge(this.actor);
    }

    if (partId === "focus") {
      context.tab = context.tabs.focus;
      context.focus = await prepareFocus(this.actor);
    }

    return context;
  }
}
