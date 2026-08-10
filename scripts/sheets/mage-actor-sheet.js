import { MortalActorSheet } from "/systems/wod5e/system/actor/mortal-actor-sheet.js";
import { getArete, onAreteChange, onAreteRoll } from "../arete.js";
import { onConceptChallengeOpen } from "../concept-challenge.js";
import { onExperienceOpen } from "../experience-window.js";
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

const MODULE = "modules/wod5e-mage/templates/actor";
const SYSTEM = "systems/wod5e/display/shared/actors/parts";

// Le PART che il Mago ricompone da sé: il loro contenuto finisce dentro
// personaggio / dotazione / note, quindi non vanno più renderizzate a parte.
const {
  header: _nativeHeader,
  tabs: _nativeTabs,
  experience: _nativeExperience,
  features: _nativeFeatures,
  equipment: _nativeEquipment,
  biography: _nativeBiography,
  notepad: _nativeNotepad,
  stats,
  ...remainingParts
} = MortalActorSheet.PARTS;

const icon = (name) => `<i class="fa-solid fa-${name}"></i>`;

/**
 * Scheda del Mago: sei pagine raggruppate per come si usano al tavolo.
 * Vedi templates/actor/parts per i template ricomposti.
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
      openConceptChallenge: onConceptChallengeOpen,
      openExperience: onExperienceOpen,
      scopeChange: onScopeChange,
      sphereSelectionChange: onSphereSelectionChange,
      wisdomResourceChange: onWisdomResourceChange,
      wisdomRoll: onWisdomRoll
    }
  };

  static PARTS = {
    header: {
      template: `${MODULE}/mage-header.hbs`,
      templates: [
        `${SYSTEM}/health.hbs`,
        `${SYSTEM}/willpower.hbs`,
        `${SYSTEM}/header-profile.hbs`
      ]
    },
    tabs: { template: `${MODULE}/parts/tab-navigation.hbs` },
    stats,
    magick: { template: `${MODULE}/parts/spheres.hbs` },
    focus: {
      template: `${MODULE}/parts/focus.hbs`,
      templates: [`${MODULE}/parts/wisdom.hbs`]
    },
    personaggio: {
      template: `${MODULE}/parts/personaggio.hbs`,
      templates: [
        `${SYSTEM}/core-details.hbs`,
        `${SYSTEM}/chronicle-tenets.hbs`,
        `${SYSTEM}/touchstones-convictions.hbs`
      ]
    },
    dotazione: {
      template: `${MODULE}/parts/dotazione.hbs`,
      templates: [
        `${SYSTEM}/core-features.hbs`,
        `${MODULE}/parts/equipment-list.hbs`
      ]
    },
    note: { template: `${MODULE}/parts/note.hbs` },
    ...remainingParts
  };

  constructor(options = {}) {
    super(options);

    // Sei pagine, nell'ordine in cui si usano. La PART `stats` tiene il suo id
    // perché tabGroups.primary punta lì: cambia solo l'etichetta.
    this.tabs = {
      stats: {
        id: "stats",
        group: "primary",
        title: "WOD5E_MAGE.Tabs.Traits",
        icon: icon("table-cells-large")
      },
      magick: {
        id: "magick",
        group: "primary",
        title: "WOD5E_MAGE.Tabs.Magick",
        icon: icon("circle-nodes")
      },
      focus: {
        id: "focus",
        group: "primary",
        title: "WOD5E_MAGE.Tabs.Focus",
        icon: icon("bullseye")
      },
      dotazione: {
        id: "dotazione",
        group: "primary",
        title: "WOD5E_MAGE.Tabs.Belongings",
        icon: icon("toolbox")
      },
      personaggio: {
        id: "personaggio",
        group: "primary",
        title: "WOD5E_MAGE.Tabs.Character",
        icon: icon("gem")
      },
      note: {
        id: "note",
        group: "primary",
        title: "WOD5E_MAGE.Tabs.Notes",
        icon: icon("note-sticky")
      }
    };
  }

  /** Le Impostazioni escono dalla barra e vanno nel menù della finestra. */
  _getHeaderControls() {
    const controls = super._getHeaderControls();

    controls.push({
      icon: "fa-solid fa-gears",
      label: "WOD5E.Tabs.Settings",
      action: "openSettings"
    });

    return controls;
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

    const actor = this.actor;

    // La testata porta la Ruota e Areté, quindi le serve il loro contesto.
    if (partId === "header") {
      context.arete = getArete(actor);
      context.magickTrack = prepareMagickTrack(actor);
    }

    if (partId === "magick") {
      context.tab = context.tabs.magick;
      context.arete = getArete(actor);
      context.magickTrack = prepareMagickTrack(actor);
      context.persistentMagickResources = getPersistentMagickResources(actor);
      context.scopes = prepareScopes(actor);
      context.ongoingMagick = prepareOngoingMagick(actor);
      const sphereData = prepareSpheres(actor, {
        localize: game.i18n.localize.bind(game.i18n),
        locale: game.i18n.lang
      });
      context.sphereChoices = sphereData.all;
      context.spheres = sphereData.selected;
    }

    // La Saggezza scende qui dalla testata, con le Convinzioni accanto.
    if (partId === "focus") {
      context.tab = context.tabs.focus;
      context.focus = await prepareFocus(actor);
    }

    // Le pagine ricomposte non passano dallo switch del sistema: le loro
    // preparazioni vanno chiamate a mano, una o due per pagina.
    if (partId === "personaggio") {
      context = await this.prepareFeaturesContext(context, actor);
      context.tab = context.tabs.personaggio;
    }

    if (partId === "dotazione") {
      context = await this.prepareFeaturesContext(context, actor);
      context = await this.prepareEquipmentContext(context, actor);
      context.tab = context.tabs.dotazione;
    }

    if (partId === "note") {
      context = await this.prepareBiographyContext(context, actor);
      context = await this.prepareNotepadContext(context, actor);
      context.tab = context.tabs.note;
    }

    return context;
  }
}
