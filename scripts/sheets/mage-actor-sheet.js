import { MortalActorSheet } from "/systems/wod5e/system/actor/mortal-actor-sheet.js";
import { getArete, onAreteChange, onAreteRoll } from "../arete.js";
import { onMagickBalanceChange, prepareMagickTrack } from "../magick-balance.js";
import { prepareSpheres } from "../spheres.js";
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
      magickBalanceChange: onMagickBalanceChange,
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
    ...remainingParts
  };

  constructor(options = {}) {
    super(options);

    const { stats, experience, ...remainingTabs } = this.tabs;
    this.tabs = {
      stats,
      experience,
      magick: {
        id: "magick",
        group: "primary",
        title: "WOD5E_MAGE.Tabs.Magick",
        icon: '<i class="fa-solid fa-circle-nodes"></i>'
      },
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
      context.spheres = prepareSpheres(this.actor);
    }

    return context;
  }
}
