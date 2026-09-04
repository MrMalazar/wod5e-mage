import { MortalActorSheet } from "/systems/wod5e/system/actor/mortal-actor-sheet.js";
import { prepareEssentialSkills } from "../abilita-essenziali.js";
import { onCustomSkillAdd, onCustomSkillDelete, prepareCustomSkills } from "../abilita-specifiche.js";
import { MODULE_ID } from "../constants.js";
import { onArchivioOpen } from "../archivi.js";
import { onCondizioneToggle, prepareCondizioni, prepareConditionRows } from "../condizioni.js";
import { onNoteAdd, onNoteDelete, prepareNote } from "../note.js";
import { onResetSection, prepareResets } from "../reset.js";
import { onStrumentiSuggest } from "../strumenti.js";
import { getArete, onAreteChange, onAreteRoll } from "../arete.js";
import { onBonusAdd, onBonusDelete, prepareBonuses } from "../bonuses.js";
import { prepareConceptChallenge } from "../concept-challenge.js";
import {
  BELONGING_TABLES,
  onBelongingAdd,
  onBelongingDelete,
  prepareBelongings
} from "../dotazione-extra.js";
import {
  bindExperienceCalculator,
  onExperienceLogAdd,
  onExperienceLogDelete,
  prepareExperiencePage
} from "../experience-window.js";
import { prepareFocus } from "../focus.js";
import { credoSphereBadges, prepareLineageChoices } from "../famiglie.js";
import { FOCUS_CREDOS } from "../focus.js";
import { getLineage } from "../lineage.js";
import {
  onPersonaggioRowAdd,
  onPersonaggioRowDelete,
  prepareAnchors,
  prepareConvictions
} from "../personaggio-extra.js";
import { onMageRoll, onSpecialtyRoll } from "../mage-roll-selection.js";
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
import { prepareScopeTable } from "../scopes.js";
import { loadSpherePowers, prepareSphereSpecialties } from "../sphere-specialties.js";
import { onFamilySphereToggle, onSphereSelectionChange, prepareSpheres } from "../spheres.js";
import { prepareCreationSummary } from "../riepilogo.js";
import { applyTraitIcons } from "../tratti-icone.js";
import { onSpecialtyAdd, onSpecialtyDelete, prepareSpecialties } from "../specializzazioni.js";
import { onGuidedItemCreate } from "../oggetti-guidati.js";
import { getWisdom, onWisdomResourceChange, onWisdomRoll } from "../wisdom.js";
import {
  getContraccolpo,
  getSalute,
  onContraccolpoNega,
  onSaluteCellChange,
  onSaluteExtraChange,
  onSaluteNewSession,
  onSaluteRelax,
  onSaluteReset,
  onSaluteRiposo
} from "../salute.js";

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
  stats: _nativeStats,
  ...remainingParts
} = MortalActorSheet.PARTS;

const icon = (name) => `<i class="fa-solid fa-${name}"></i>`;

/** Flip the header Wheel between arc and bar mode, then repaint. */
async function onWheelModeToggle(event) {
  event?.preventDefault?.();
  const current = game.settings.get(MODULE_ID, "headerWheelMode");
  await game.settings.set(MODULE_ID, "headerWheelMode", current === "bar" ? "wheel" : "bar");
  this.render();
}

/**
 * Scheda del Mago: sei pagine raggruppate per come si usano al tavolo.
 * Vedi templates/actor/parts per i template ricomposti.
 */
export class MageActorSheet extends MortalActorSheet {
  static DEFAULT_OPTIONS = {
    classes: ["wod5e-mage", "mage"],
    actions: {
      roll: onMageRoll,
      // Il + di armi, armature, oggetti, Pregi, Difetti e Background chiede
      // i campi che servono; gli altri tipi restano al sistema.
      createItem: onGuidedItemCreate,
      archivioOpen: onArchivioOpen,
      strumentiSuggest: onStrumentiSuggest,
      resetSection: onResetSection,
      noteAdd: onNoteAdd,
      noteDelete: onNoteDelete,
      areteChange: onAreteChange,
      areteRoll: onAreteRoll,
      belongingAdd: onBelongingAdd,
      belongingDelete: onBelongingDelete,
      bonusAdd: onBonusAdd,
      bonusDelete: onBonusDelete,
      contraccolpoNega: onContraccolpoNega,
      customSkillAdd: onCustomSkillAdd,
      customSkillDelete: onCustomSkillDelete,
      // Clic sinistro sceglie il segno, clic destro svuota la casella.
      saluteCellChange: { handler: onSaluteCellChange, buttons: [0, 2] },
      saluteExtraChange: onSaluteExtraChange,
      saluteNewSession: onSaluteNewSession,
      saluteReset: onSaluteReset,
      saluteRiposo: onSaluteRiposo,
      saluteRelax: onSaluteRelax,
      magickBalanceChange: onMagickBalanceChange,
      experienceLogAdd: onExperienceLogAdd,
      experienceLogDelete: onExperienceLogDelete,
      ongoingMagickAdd: onOngoingMagickAdd,
      ongoingMagickDelete: onOngoingMagickDelete,
      personaggioRowAdd: onPersonaggioRowAdd,
      personaggioRowDelete: onPersonaggioRowDelete,
      specialtyAdd: onSpecialtyAdd,
      specialtyRoll: onSpecialtyRoll,
      specialtyDelete: onSpecialtyDelete,
      familySphereToggle: onFamilySphereToggle,
      sphereSelectionChange: onSphereSelectionChange,
      wheelModeToggle: onWheelModeToggle,
      condizioneToggle: onCondizioneToggle,
      wisdomResourceChange: onWisdomResourceChange,
      wisdomRoll: onWisdomRoll
    }
  };

  static PARTS = {
    header: {
      template: `${MODULE}/mage-header.hbs`,
      templates: [
        `${MODULE}/parts/salute.hbs`,
        `${MODULE}/parts/appartenenza.hbs`,
        `${SYSTEM}/header-profile.hbs`
      ]
    },
    tabs: { template: `${MODULE}/parts/tab-navigation.hbs` },
    // Forked from the system stats part to host Wheel and Scopes beside the
    // Conditions/Custom Rolls panel (see templates/actor/parts/tratti.hbs).
    stats: {
      template: `${MODULE}/parts/tratti.hbs`,
      templates: [
        `${MODULE}/parts/ruota.hbs`,
        `${MODULE}/parts/bonuses.hbs`,
        `${MODULE}/parts/specializzazioni.hbs`
      ]
    },
    magick: {
      template: `${MODULE}/parts/spheres.hbs`,
      templates: [`${MODULE}/parts/scope-table.hbs`]
    },
    focus: { template: `${MODULE}/parts/focus.hbs` },
    conceptChallenge: { template: `${MODULE}/parts/concept-challenge.hbs` },
    personaggio: {
      template: `${MODULE}/parts/personaggio.hbs`,
      templates: [`${MODULE}/parts/wisdom.hbs`]
    },
    dotazione: {
      template: `${MODULE}/parts/dotazione.hbs`,
      templates: [
        `${MODULE}/parts/core-features.hbs`,
        `${MODULE}/parts/equipment-list.hbs`
      ]
    },
    esperienza: { template: `${MODULE}/parts/esperienza.hbs` },
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
      // La Sfida del Concetto vive sotto il Personaggio.
      conceptChallenge: {
        id: "conceptChallenge",
        group: "primary",
        title: "WOD5E_MAGE.Tabs.ConceptChallenge",
        icon: icon("pen-to-square")
      },
      esperienza: {
        id: "esperienza",
        group: "primary",
        title: "WOD5E.Tabs.Experience",
        icon: icon("file-contract")
      },
      // Le Note in fondo, sotto l'Esperienza (4/9 notte).
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

  /** Dopo ogni render la pagina Esperienza ricabla il suo calcolatore. */
  _onRender(context, options) {
    super._onRender?.(context, options);
    bindExperienceCalculator(this.element);
    // L'Appartenenza in testata resta aperta o chiusa com'era, attraverso i render.
    const appartenenza = this.element?.querySelector(".wod5e-mage-appartenenza");
    if (appartenenza) {
      appartenenza.open = Boolean(this._appartenenzaOpen);
      appartenenza.addEventListener("toggle", () => { this._appartenenzaOpen = appartenenza.open; });
    }
    // La tendina delle Condizioni resta com'era attraverso i render.
    const drawer = this.element?.querySelector(".wod5e-mage-condizioni-drawer");
    if (drawer) {
      drawer.open = Boolean(this._condizioniOpen);
      drawer.addEventListener("toggle", () => { this._condizioniOpen = drawer.open; });
    }
    // Le Specialità delle Sfere: il testo del potere si apre dal titolo.
    this._specialtyOpen ??= {};
    for (const article of this.element?.querySelectorAll(".wod5e-mage-sphere-specialty[data-slot]") ?? []) {
      const key = article.dataset.slot;
      article.classList.toggle("open", Boolean(this._specialtyOpen[key]));
      article.querySelector(".wod5e-mage-sphere-specialty-head")?.addEventListener("click", () => {
        this._specialtyOpen[key] = !this._specialtyOpen[key];
        article.classList.toggle("open", this._specialtyOpen[key]);
      });
    }
    // Le domande della Sfida del concetto: ogni tendina ricorda com'era.
    this._conceptOpen ??= {};
    for (const field of this.element?.querySelectorAll(".wod5e-mage-concept-field[data-field]") ?? []) {
      const id = field.dataset.field;
      if (id in this._conceptOpen) field.open = this._conceptOpen[id];
      field.addEventListener("toggle", () => { this._conceptOpen[id] = field.open; });
    }
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
    context.wisdomStatus = String(this.actor.getFlag(MODULE_ID, "wisdomStatus") ?? "");
    return context;
  }

  async _preparePartContext(partId, context, options) {
    context = { ...(await super._preparePartContext(partId, context, options)) };

    const actor = this.actor;

    // Traits: the system list gives way to the eighteen Essential Skills,
    // one alphabetical file over three columns. The page also hosts the
    // Wheel widget, so it needs that context too.
    if (partId === "stats") {
      // Ogni voce porta il suo sigillo, a sinistra del nome.
      context.sortedSkills = applyTraitIcons(prepareEssentialSkills(context.sortedSkills, {
        localize: game.i18n.localize.bind(game.i18n),
        lang: game.i18n.lang
      }));
      context.sortedAttributes = applyTraitIcons(context.sortedAttributes);
      // Le Abilità Specifiche del giocatore, sotto le essenziali.
      context.customSkills = prepareCustomSkills(actor);
      context.arete = getArete(actor);
      context.magickTrack = prepareMagickTrack(actor);
      // Quintessenza generata e Paradosso permanente vivono nella Ruota.
      context.persistentMagickResources = getPersistentMagickResources(actor);
      context.bonuses = prepareBonuses(actor);
      // I tasti di reset in fondo al memo.
      context.resets = prepareResets(game.i18n.localize.bind(game.i18n));
      // Le Condizioni addosso: righe con simbolo, nome, cos'è e dadi.
      context.condizioniRows = prepareConditionRows(actor.items);
      context.condizioni = prepareCondizioni(actor.items);
      // Le Specializzazioni delle Abilità, lette dai bonuses del sistema.
      context.specialties = prepareSpecialties(actor, {
        localize: game.i18n.localize.bind(game.i18n),
        lang: game.i18n.lang
      });
      context.wheelAsBar = game.settings.get(MODULE_ID, "headerWheelMode") === "bar";
      // Negare il Contraccolpo: una volta per sessione, dalla Ruota.
      context.contraccolpo = getContraccolpo(actor);
      // Il memo di creazione, in fondo alla pagina: conta e verifica.
      context.creationSummary = prepareCreationSummary(actor);
    }

    // La testata: la riga dell'appartenenza sotto il nome, e la Salute.
    if (partId === "header") {
      context.lineage = getLineage(actor);
      context.salute = getSalute(actor);
      // L'Appartenenza a tendina, in alto a destra: tendine e Credo.
      const localize = game.i18n.localize.bind(game.i18n);
      context.lineageChoices = prepareLineageChoices(context.lineage, localize);
      const credo = String(actor.getFlag(MODULE_ID, "focus")?.credo ?? "");
      context.credos = FOCUS_CREDOS.map((id) => ({ id, label: localize(`WOD5E_MAGE.Focus.Credos.${id}`), selected: id === credo }));
      context.credoLabel = FOCUS_CREDOS.includes(credo) ? localize(`WOD5E_MAGE.Focus.Credos.${credo}`) : "";
      context.credoSpheres = credoSphereBadges(credo, localize);
      // Il nome del giocatore, sotto quello del personaggio.
      context.playerName = String(actor.getFlag(MODULE_ID, "player") ?? "");
    }

    if (partId === "magick") {
      context.tab = context.tabs.magick;
      context.arete = getArete(actor);
      context.scopeTable = prepareScopeTable();
      // Le Specialità delle Sfere, dal terzo pallino, coi poteri del compendio.
      context.sphereSpecialties = prepareSphereSpecialties(actor, {
        powers: await loadSpherePowers(),
        localize: game.i18n.localize.bind(game.i18n),
        locale: game.i18n.lang
      });
      context.magickTrack = prepareMagickTrack(actor);
      context.persistentMagickResources = getPersistentMagickResources(actor);
      context.ongoingMagick = prepareOngoingMagick(actor);
      const sphereData = prepareSpheres(actor, {
        localize: game.i18n.localize.bind(game.i18n),
        locale: game.i18n.lang
      });
      context.sphereChoices = sphereData.all;
      context.spheres = sphereData.selected;
    }

    // La pagina del Credo: Saggezza, Credo, Tipo e Strumenti per Sfera.
    if (partId === "focus") {
      context.tab = context.tabs.focus;
      context.focus = await prepareFocus(actor);
    }

    if (partId === "conceptChallenge") {
      context.tab = context.tabs.conceptChallenge;
      context.conceptChallenge = await prepareConceptChallenge(actor);
    }

    // Le pagine ricomposte non passano dallo switch del sistema: le loro
    // preparazioni vanno chiamate a mano, una o due per pagina.
    if (partId === "personaggio") {
      context = await this.prepareFeaturesContext(context, actor);
      context.lineage = getLineage(actor);
      // Ancore e Convinzioni a slot liberi, e il «quando si attiva» di
      // Ambizione e Desiderio.
      context.anchors = prepareAnchors(actor);
      context.convictions = prepareConvictions(actor);
      context.ambitionTrigger = String(actor.getFlag(MODULE_ID, "ambitionTrigger") ?? "");
      context.desireTrigger = String(actor.getFlag(MODULE_ID, "desireTrigger") ?? "");
      context.tab = context.tabs.personaggio;
    }

    if (partId === "dotazione") {
      context = await this.prepareFeaturesContext(context, actor);
      context = await this.prepareEquipmentContext(context, actor);
      // Le due tavole libere: in comune coi giocatori, e di storia.
      const belongings = prepareBelongings(actor);
      context.belongingTables = [
        {
          flag: BELONGING_TABLES.shared,
          label: "WOD5E_MAGE.Belongings.SharedLabel",
          hint: "WOD5E_MAGE.Belongings.SharedHint",
          empty: "WOD5E_MAGE.Belongings.SharedEmpty",
          rows: belongings.shared
        },
        {
          flag: BELONGING_TABLES.story,
          label: "WOD5E_MAGE.Belongings.StoryLabel",
          hint: "WOD5E_MAGE.Belongings.StoryHint",
          empty: "WOD5E_MAGE.Belongings.StoryEmpty",
          rows: belongings.story
        }
      ];
      context.tab = context.tabs.dotazione;
    }

    // Le Note: riquadri liberi del giocatore, niente campi del sistema.
    if (partId === "note") {
      context.note = prepareNote(actor);
      context.tab = context.tabs.note;
    }

    // L'Esperienza vive in scheda: totali, registro delle spese, calcolatore.
    if (partId === "esperienza") {
      context.experience = prepareExperiencePage(actor);
      context.tab = context.tabs.esperienza;
    }

    return context;
  }
}
