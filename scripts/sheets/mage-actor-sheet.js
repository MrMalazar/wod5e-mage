import { MortalActorSheet } from "/systems/wod5e/system/actor/mortal-actor-sheet.js";
import { _onDotCounterChange, _onDotCounterEmpty } from "/systems/wod5e/system/actor/scripts/counters.js";
import { nextEssentialSkillValue, orderAttributes, prepareEssentialSkillsByGroup } from "../abilita-essenziali.js";
import { onCustomSkillAdd, onCustomSkillDelete, prepareCustomSkills } from "../abilita-specifiche.js";
import { MODULE_ID } from "../constants.js";
import { onArchivioOpen } from "../archivi.js";
import { onCondizioneToggle, prepareCondizioni, prepareConditionRows } from "../condizioni.js";
import { onParadoxBurst } from "../paradox-burst.js";
import { groupIncantesimiBySphere, onIncantesimoAdd, onIncantesimoChat, onIncantesimoDelete, onIncantesimoEdit, onIncantesimoFromEffetti, onIncantesimoRoll, prepareIncantesimi } from "../incantesimi.js";
import { onGrimorioComuneOpen, onIncantesimoShare } from "../grimorio-comune.js";
import { onFormulaLancia, onFormulaScrivi, onFormuleTutte, prepareFormulePagina, sfereAccessibili, sfereDelFiltro, wireFormule } from "../formule-scheda.js";
import { bindNoteBoard, noteBoardHeight, onNoteAdd, onNoteDelete, prepareNote } from "../note.js";
import { onResetSection, prepareResetsById } from "../reset.js";
import { onCredoFamilyPick } from "../famiglie.js";
import { onStrumentiSuggest } from "../strumenti.js";
import { getArete, onAreteChange, onAreteRoll, onAreteSimple } from "../arete.js";
import { prepareConceptChallenge } from "../concept-challenge.js";
import {
  BELONGING_TABLES,
  onBelongingAdd,
  onBelongingArchivio,
  onBelongingDelete,
  prepareBelongings,
  onItemFieldChange,
  onArmaturaColpo,
  onArmaturaPunto
} from "../dotazione-extra.js";
import {
  bindExperienceCalculator,
  onExperienceLogAdd,
  onExperienceLogDelete,
  onExperienceProposalIgnore,
  onExperienceProposalMark,
  prepareExperiencePage
} from "../experience-window.js";
import { onCredoModifica, onFocusForm, onStrumentoPick, prepareFocus } from "../focus.js";
import {
  alphabetical,
  credoSphereBadges,
  isFreeCredo,
  prepareCredoSphereChoices,
  prepareLineageChoices
} from "../famiglie.js";
import { FOCUS_CREDOS } from "../focus.js";
import { getLineage } from "../lineage.js";
import {
  onAncoraGenera,
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
import { onOngoingMagickAdd, onOngoingMagickDelete, onOngoingMagickLock, onOngoingMagickToggle, prepareOngoingMagick } from "../ongoing-magick.js";
import { prepareScopeTable } from "../scopes.js";
import { onPotereApri, onPotereCatalogo, onPotereCatalogoCompleto, onPotereDaCatalogo, onPotereModifica, onPotereModificaBase, onPotereNuovo, onPotereTogli, onPotereUsa, preparePoteriFiltri, preparePoteriPagina, riapriPoteri } from "../poteri-scheda.js";
import { onFamilySphereToggle, onSphereSelectionChange, prepareSpheres } from "../spheres.js";
import { prepareCreationSummary } from "../riepilogo.js";
import { prepareMemo } from "../memo.js";
import { applyTraitIcons } from "../tratti-icone.js";
import { onSpecialtyDelete, onSpecialtyToggle, prepareSpecialties, riapriSpecializzazioni, rigaSpecializzazioni, wireSpecialtyInputs } from "../specializzazioni.js";
import { skillSpecialtyNames } from "../arete.js";
import {
  onTiroArete,
  onTiroAttribute,
  onTiroClear,
  onTiroDifficulty,
  onTiroExtra,
  onTiroDadi,
  onTiroGrimorio,
  onTiroIncantesimo,
  onScopeMode,
  scopeModesOf,
  onGrimorioClose,
  onTiroPill,
  onTiroPower,
  onTiroPrize,
  onTiroQuintessence,
  onTiroRoll,
  onTiroScope,
  onTiroSforza, onTiroNarratore,
  onTiroSkill,
  onTiroSpecialty,
  onTiroSphere,
  onTiroTrait,
  poteriOfSphere,
  prepareIncantesimiRows,
  preparePoteriRows,
  prepareScopeRows,
  prepareTiroContext,
  tiroOf,
  traitDiceOf
} from "../tiro-scheda.js";
import { onRitrattoAdd, onRitrattoNext, onRitrattoRemove, prepareRitratti, RITRATTI_FLAG } from "../ritratti.js";
import { altraScala, altroTema, applicaScala, applicaTema, misuraFinestra, normalizeScala, SCALA_AZIONE, SCALA_SETTING, SCALA_TASTO_CLASSE, scalaFattore, sporgeDalloSchermo, TEMA_AZIONE, TEMA_SETTING, TEMA_TASTO_CLASSE } from "../tema.js";
import { CreazioneGuidata, onGuidataApri } from "../creazione-guidata-finestra.js";
import { onGuidedItemCreate, onGuidedItemEdit } from "../oggetti-guidati.js";
import { faiCadereInchiostro, getWisdom, onWisdomAttributePick, onWisdomCellChange, onWisdomCura, onWisdomReset, onWisdomResourceChange, onWisdomRoll, onWisdomSegna } from "../wisdom.js";
import { classeRuota, posizioneRuota } from "../ventaglio.js";
import {
  getContraccolpo,
  getSalute,
  onContraccolpoNega,
  onSaluteCellChange,
  onSaluteDanni,
  onSaluteExtraChange,
  onSaluteNewSession,
  onSaluteCambioScena,
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
 * Il tasto del tema accanto ai tre pallini (16/9): gira l'impostazione del
 * giocatore; è l'impostazione, cambiando, a rivestire tutte le schede del
 * Mago aperte (MageActorSheet.applicaTemaOvunque), senza render.
 */
async function onTemaToggle(event) {
  event?.preventDefault?.();
  const next = altroTema(game.settings.get(MODULE_ID, TEMA_SETTING));
  await game.settings.set(MODULE_ID, TEMA_SETTING, next);
  // L'impostazione lo fa già cambiando; rifarlo non costa (è solo una classe).
  MageActorSheet.applicaTemaOvunque(next);
}

/**
 * Il tasto della misura del testo (16/9 sera), a sinistra di quello del
 * tema: piccolo, medio, grande, e da capo. L'impostazione riveste le schede
 * aperte; la finestra cresce o cala in proporzione, entro lo schermo.
 */
async function onScalaToggle(event) {
  event?.preventDefault?.();
  const current = normalizeScala(game.settings.get(MODULE_ID, SCALA_SETTING));
  const next = altraScala(current);
  await game.settings.set(MODULE_ID, SCALA_SETTING, next);
  MageActorSheet.applicaScalaOvunque(next);
  const ratio = scalaFattore(next) / scalaFattore(current);
  const { width, height } = this.position ?? {};
  if (Number.isFinite(width) && Number.isFinite(height)) {
    this.setPosition({
      width: Math.min(Math.round(width * ratio), Math.max(window.innerWidth - 40, 600)),
      height: Math.min(Math.round(height * ratio), Math.max(window.innerHeight - 40, 400))
    });
  }
}

/** Il tasto accanto al + delle Abilità (16/9 sera): per famiglia o tutte in fila, in ordine alfabetico. */
async function onSkillsFlatToggle(event) {
  event?.preventDefault?.();
  await game.settings.set(MODULE_ID, "skillsFlat", !game.settings.get(MODULE_ID, "skillsFlat"));
  this.render({ parts: ["stats"] });
}

/**
 * I cassetti (poteri delle Sfere, livelli degli Ambiti; le Specializzazioni
 * no, dal 26/9 stanno in riga) si aprono sotto la riga; se sotto non c'è posto nel riquadro, si aprono
 * sopra (Blue, 16/9 sera: quello di Velo era tagliato). Si misura a
 * cassetto mostrato: al sorvolo, o col tastino.
 */
function flipCassetto(row) {
  const drawer = row.querySelector(":scope > .wod5e-mage-cassetto");
  const body = row.closest(".wod5e-mage-riq-body");
  if (!drawer || !body) return;
  row.classList.remove("cassetto-su");
  const limit = body.getBoundingClientRect();
  const rect = row.getBoundingClientRect();
  const height = drawer.offsetHeight || 36;
  if (rect.bottom + height > limit.bottom && rect.top - height >= limit.top) row.classList.add("cassetto-su");
}

export function wireCassetti(sheet) {
  for (const row of sheet.element?.querySelectorAll(".wod5e-mage-riga.con-cassetto") ?? []) {
    row.addEventListener("mouseenter", () => flipCassetto(row));
  }
  // Le tendine (gli Ambiti) si aprono solo col tastino: un clic altrove
  // sulla scheda le chiude, e chiude anche la ruota dei comandi (che sta
  // fuori dalla riga: un clic dentro la ruota non la chiude). Il gancio sta
  // sulla cornice, che resta. Esc e lo scorrimento di un riquadro chiudono
  // la ruota, che altrimenti resterebbe ferma sopra righe che si muovono.
  if (sheet.element && !sheet._tendineWired) {
    sheet._tendineWired = true;
    sheet.element.addEventListener("pointerdown", (event) => {
      if (event.target?.closest?.(".wod5e-mage-ruota-comandi")) return;
      for (const ruota of sheet.element.querySelectorAll(".wod5e-mage-ruota-comandi")) {
        if (!ruota._riga?.contains(event.target)) {
          ruota._riga?.classList.remove("aperto");
          ruota.remove();
        }
      }
      for (const row of sheet.element.querySelectorAll(".wod5e-mage-riga.aperto")) {
        if (!row.contains(event.target)) row.classList.remove("aperto");
      }
    });
    sheet.element.addEventListener("keydown", (event) => { if (event.key === "Escape") chiudiRuote(sheet); });
    sheet.element.addEventListener("scroll", () => chiudiRuote(sheet), true);
  }
}

/** Le ruote dei comandi aperte: via, e le loro righe si chiudono. */
export function chiudiRuote(sheet) {
  for (const ruota of sheet.element?.querySelectorAll(".wod5e-mage-ruota-comandi") ?? []) {
    ruota._riga?.classList.remove("aperto");
    ruota.remove();
  }
  for (const row of sheet.element?.querySelectorAll(".wod5e-mage-riga.con-ventaglio.aperto") ?? []) row.classList.remove("aperto");
}

/**
 * Il tastino della Salute e della Saggezza (20/9, seconda passata): apre la
 * ruota dei comandi intorno al tastino. La ruota non sta nella riga (il
 * corpo del riquadro taglia quel che esce): si appende al contenuto della
 * finestra, col centro sul tastino, un disco col fondo suo, i comandi in
 * cerchio (copiati dalla sorgente nascosta nella riga, così le azioni sono
 * le stesse) e il tasto al centro per chiudere. Si chiude anche con un
 * comando, con un clic altrove, con Esc e a ogni render.
 */
export function onVentaglioToggle(event, target) {
  event?.preventDefault?.();
  const row = target?.closest?.(".wod5e-mage-riga.con-ventaglio");
  const source = row?.querySelector(":scope > .wod5e-mage-ventaglio");
  const content = this.element?.querySelector(".window-content");
  if (!row || !source || !content) return;
  const wasOpen = row.classList.contains("aperto");
  chiudiRuote(this);
  if (wasOpen) return;
  const voci = source.querySelectorAll(".wod5e-mage-ventaglio-voce").length;
  const ruota = document.createElement("div");
  ruota.className = `wod5e-mage-ruota-comandi ${classeRuota(voci)}`;
  ruota.setAttribute("role", "group");
  ruota.setAttribute("aria-label", source.getAttribute("aria-label") ?? "");
  ruota.innerHTML = source.innerHTML;
  const chiudi = document.createElement("button");
  chiudi.type = "button";
  chiudi.className = "wod5e-mage-ruota-chiudi";
  chiudi.dataset.action = "ventaglioChiudi";
  chiudi.title = game.i18n.localize("WOD5E_MAGE.Ventaglio.Chiudi");
  chiudi.setAttribute("aria-label", chiudi.title);
  chiudi.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
  ruota.appendChild(chiudi);
  ruota._riga = row;
  const centro = posizioneRuota(target.getBoundingClientRect(), content.getBoundingClientRect(), content.offsetWidth);
  ruota.style.left = `${centro.x}px`;
  ruota.style.top = `${centro.y}px`;
  content.appendChild(ruota);
  row.classList.add("aperto");
  // Un comando scelto chiude la ruota, dopo che l'azione è partita.
  ruota.addEventListener("click", (ev) => {
    if (ev.target?.closest?.(".wod5e-mage-ventaglio-voce")) setTimeout(() => chiudiRuote(this), 0);
  });
}

export function onVentaglioChiudi(event) {
  event?.preventDefault?.();
  chiudiRuote(this);
}

/**
 * Il tastino in fondo alla riga dell'Ambito (16/9 sera): apre la tendina e
 * la tiene aperta finché non lo si preme di nuovo o non si clicca altrove;
 * una tendina aperta alla volta per riquadro. Niente sorvolo (Blue: «voglio
 * solo che quando clicca mi mostra le scelte»). Solo classi: niente render.
 * Sugli Ambiti (20/9, seconda passata) è il clic sul nome: apre la tendina
 * delle letture (Peso, Epicità, Danni…). La Salute e la Saggezza hanno la
 * ruota dei comandi, con la sua azione.
 */
function onCassettoToggle(event, target) {
  event?.preventDefault?.();
  const row = target?.closest?.(".wod5e-mage-riga.con-tendina, .wod5e-mage-riga.con-cassetto");
  if (!row) return;
  const open = !row.classList.contains("aperto");
  // Le tendine aperte si ricordano per chiave (Blue, 25/9: coi pallini delle
  // Sfere «si chiudono da sole»): il render le riapre com'erano.
  const aperte = (this._cassettiAperti ??= new Set());
  for (const other of row.closest(".wod5e-mage-riq-body")?.querySelectorAll(".wod5e-mage-riga.aperto") ?? []) {
    other.classList.remove("aperto");
    if (other.dataset.cassetto) aperte.delete(other.dataset.cassetto);
  }
  row.classList.toggle("aperto", open);
  if (row.dataset.cassetto) aperte[open ? "add" : "delete"](row.dataset.cassetto);
  if (open) flipCassetto(row);
}

/** Dopo il render: le tendine con la chiave ricordata tornano aperte. */
function riapriCassetti(sheet) {
  const aperte = sheet._cassettiAperti;
  if (!aperte?.size) return;
  for (const row of sheet.element?.querySelectorAll(".wod5e-mage-riga.con-tendina[data-cassetto]") ?? []) {
    if (!aperte.has(row.dataset.cassetto)) continue;
    row.classList.add("aperto");
    flipCassetto(row);
  }
}

/**
 * Il nome di una Condizione accesa (20/9): un clic apre la spiegazione
 * (cos'è e cosa fa, dalla voce), un altro la richiude. Solo una classe
 * sulla riga: niente render, niente spazio quando è chiusa.
 */
function onCondizioneApri(event, target) {
  event?.preventDefault?.();
  const row = target?.closest?.(".wod5e-mage-condizione-riga");
  if (!row) return;
  const open = !row.classList.contains("aperta");
  row.classList.toggle("aperta", open);
  target.setAttribute("aria-expanded", open ? "true" : "false");
}

/**
 * I contatori nativi impostano sempre il primo pallino a 1. Sulle Abilità
 * Essenziali, invece, un secondo clic sul primo pallino riporta il valore a 0.
 * L'aggiornamento resta affidato agli handler nativi, inclusi blocco scheda e
 * messaggi di avviso del sistema.
 */
async function onEssentialSkillDotChange(event, target) {
  const counter = target?.closest?.(".resource-value");
  const nextValue = nextEssentialSkillValue(counter?.dataset?.value, target?.dataset?.index);

  if (nextValue === 0) {
    return _onDotCounterEmpty.call(this, event, target);
  }

  return _onDotCounterChange.call(this, event, target);
}

/**
 * Le cerche e i filtri della prima pagina (16/9): ogni elenco (`data-list`)
 * ha la sua casella (`data-filter`) e, i Tratti, i tasti di specie
 * (`data-filters`). Nascondono le righe che non combaciano; il testo e la
 * specie scelti restano nella scheda attraverso i render.
 */
/** La scheda dei Tratti in uso (23/9; le sei di Blue del 25/9): quella scelta, o i Tratti. */
export const SCHEDE_TRATTI = Object.freeze(["tratti", "equipment", "attivi", "passivi", "other", "grimorio"]);
export function schedaTratti(state) {
  const kind = String(state?.kind ?? "");
  return SCHEDE_TRATTI.includes(kind) ? kind : SCHEDE_TRATTI[0];
}

function wireStatFilters(sheet) {
  const root = sheet.element;
  if (!root) return;
  const apply = (name) => {
    const list = root.querySelector(`[data-list="${name}"]`);
    if (!list) return;
    const state = sheet._filters[name] ?? {};
    const needle = String(state.text ?? "").trim().toLocaleLowerCase(game.i18n.lang);
    let kind = String(state.kind ?? "");
    // Un filtro rimasto senza il suo tasto (la Sfera sparita dalla lista: le
    // Formule tornate alle accessibili, un effetto tolto) si spegne da sé.
    const group = root.querySelector(`[data-filters="${name}"]`);
    if (kind && group && !group.querySelector(`.wod5e-mage-filtro[data-kind="${kind}"]`)) {
      kind = "";
      sheet._filters[name] = { ...state, kind };
    }
    for (const row of list.querySelectorAll("[data-search]")) {
      const text = String(row.dataset.search ?? "").toLocaleLowerCase(game.i18n.lang);
      const okText = !needle || text.includes(needle);
      // Il genere della riga, o i suoi generi (le Sfere di una Formula o di un effetto, 26/9 sera).
      const kinds = String(row.dataset.kinds ?? "").split(" ").filter(Boolean);
      const okKind = !kind || row.dataset.kind === kind || kinds.includes(kind);
      row.hidden = !(okText && okKind);
    }
    // I gruppi (gli effetti per Sfera) senza righe in vista si nascondono.
    for (const gruppo of list.querySelectorAll("[data-gruppo]")) {
      gruppo.hidden = ![...gruppo.querySelectorAll("[data-search]")].some((row) => !row.hidden);
    }
    for (const button of root.querySelectorAll(`[data-filters="${name}"] .wod5e-mage-filtro`)) {
      const active = String(button.dataset.kind ?? "") === kind;
      button.classList.toggle("active", active);
      if (button.getAttribute("role") === "tab") button.setAttribute("aria-selected", String(active));
    }
    // La scheda scelta sul riquadro: il libro del Grimorio si vede solo lì.
    const box = list.closest(".wod5e-mage-riq");
    if (box) box.dataset.scheda = kind;
  };
  for (const input of root.querySelectorAll("input[data-filter]")) {
    const name = input.dataset.filter;
    input.value = String(sheet._filters[name]?.text ?? "");
    input.addEventListener("input", () => {
      sheet._filters[name] = { ...(sheet._filters[name] ?? {}), text: input.value };
      apply(name);
    });
    apply(name);
  }
  for (const group of root.querySelectorAll("[data-filters]")) {
    const name = group.dataset.filters;
    // Le schede dei Tratti partono dal Background (23/9): mai «tutte insieme».
    if (name === "tratti") sheet._filters[name] = { ...(sheet._filters[name] ?? {}), kind: schedaTratti(sheet._filters[name]) };
    for (const button of group.querySelectorAll(".wod5e-mage-filtro")) {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        sheet._filters[name] = { ...(sheet._filters[name] ?? {}), kind: button.dataset.kind ?? "" };
        apply(name);
      });
    }
    apply(name);
  }
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
      // La matita: il sistema la chiama itemEdit (5.3.19) o itemOpen (5.3.26);
      // il modulo si porta la sua (10/9).
      itemEdit: onGuidedItemEdit,
      archivioOpen: onArchivioOpen,
      // L'armatura sulla riga dell'Inventario (Blue, 25/9): ▼ il colpo assorbito, ▲ il punto che torna.
      armaturaColpo: onArmaturaColpo,
      armaturaPunto: onArmaturaPunto,
      strumentiSuggest: onStrumentiSuggest,
      resetSection: onResetSection,
      incantesimoAdd: onIncantesimoAdd,
      incantesimoEdit: onIncantesimoEdit,
      incantesimoDelete: onIncantesimoDelete,
      incantesimoRoll: onIncantesimoRoll,
      incantesimoChat: onIncantesimoChat,
      incantesimoShare: onIncantesimoShare,
      incantesimoFromEffetti: onIncantesimoFromEffetti,
      grimorioComuneOpen: onGrimorioComuneOpen,
      // La pagina Formule (26/9): tutte o le accessibili, e i due tasti della matrice.
      formuleTutte: onFormuleTutte,
      formulaScrivi: onFormulaScrivi,
      formulaLancia: onFormulaLancia,
      // La freccetta della riga dell'Abilità (26/9 sera): apre e chiude le Specializzazioni.
      specialtyToggle: onSpecialtyToggle,
      noteAdd: onNoteAdd,
      noteDelete: onNoteDelete,
      areteChange: onAreteChange,
      areteRoll: onAreteRoll,
      areteSimple: onAreteSimple,
      belongingAdd: onBelongingAdd,
      // La pagina del Credo (21/9): il Tipo e gli Strumenti a pastiglie, la matita delle Sfere.
      focusForm: onFocusForm,
      strumentoPick: onStrumentoPick,
      credoModifica: onCredoModifica,
      belongingArchivio: onBelongingArchivio,
      belongingDelete: onBelongingDelete,
      contraccolpoNega: onContraccolpoNega,
      paradoxBurst: onParadoxBurst,
      customSkillAdd: onCustomSkillAdd,
      customSkillDelete: onCustomSkillDelete,
      essentialSkillClear: _onDotCounterEmpty,
      essentialSkillDotChange: onEssentialSkillDotChange,
      // Clic sinistro sceglie il segno, clic destro svuota la casella.
      saluteCellChange: { handler: onSaluteCellChange, buttons: [0, 2] },
      saluteExtraChange: onSaluteExtraChange,
      saluteNewSession: onSaluteNewSession,
      saluteCambioScena: onSaluteCambioScena,
      saluteReset: onSaluteReset,
      saluteDanni: onSaluteDanni,
      saluteRiposo: onSaluteRiposo,
      saluteRelax: onSaluteRelax,
      magickBalanceChange: onMagickBalanceChange,
      experienceLogAdd: onExperienceLogAdd,
      experienceLogDelete: onExperienceLogDelete,
      // Le spese proposte dalle altre pagine (21/9): Segna e Ignora.
      experienceProposalMark: onExperienceProposalMark,
      experienceProposalIgnore: onExperienceProposalIgnore,
      ongoingMagickAdd: onOngoingMagickAdd,
      ongoingMagickDelete: onOngoingMagickDelete,
      ongoingMagickToggle: onOngoingMagickToggle,
      ongoingMagickLock: onOngoingMagickLock,
      // I poteri inseriti dal giocatore (21/9): la pagina Magick.
      potereNuovo: onPotereNuovo,
      potereDaCatalogo: onPotereDaCatalogo,
      // La finestra del catalogo (24/9 sera), e il Catalogo completo da leggere.
      potereCatalogo: onPotereCatalogo,
      potereCatalogoCompleto: onPotereCatalogoCompleto,
      potereModifica: onPotereModifica,
      potereModificaBase: onPotereModificaBase,
      potereTogli: onPotereTogli,
      potereApri: onPotereApri,
      // «Usa» (24/9): il potere senza tirare, con usi contati, costo e carta.
      potereUsa: onPotereUsa,
      // Ogni riga apribile (21/9): il clic sul nome apre e chiude il testo.
      rigaApri: onPotereApri,
      personaggioRowAdd: onPersonaggioRowAdd,
      personaggioRowDelete: onPersonaggioRowDelete,
      ancoraGenera: onAncoraGenera,
      specialtyRoll: onSpecialtyRoll,
      specialtyDelete: onSpecialtyDelete,
      familySphereToggle: onFamilySphereToggle,
      credoFamilyPick: onCredoFamilyPick,
      sphereSelectionChange: onSphereSelectionChange,
      wheelModeToggle: onWheelModeToggle,
      // La modalità chiara (16/9) e la misura del testo (16/9 sera): i tasti accanto ai tre pallini della finestra.
      [TEMA_AZIONE]: onTemaToggle,
      [SCALA_AZIONE]: onScalaToggle,
      // La creazione guidata (23/9): la bacchetta accanto ai tre pallini.
      guidataApri: onGuidataApri,
      // Le Abilità per famiglia o tutte in fila.
      skillsFlatToggle: onSkillsFlatToggle,
      // I tastini in fondo alla riga dell'Ambito: la lettura e la tendina dei livelli.
      scopeMode: onScopeMode,
      cassettoToggle: onCassettoToggle,
      ventaglioToggle: onVentaglioToggle,
      ventaglioChiudi: onVentaglioChiudi,
      condizioneToggle: onCondizioneToggle,
      condizioneApri: onCondizioneApri,
      wisdomResourceChange: onWisdomResourceChange,
      wisdomRoll: onWisdomRoll,
      // La Saggezza come la Salute (23/9): il menù dei segni sulla casella,
      // Segna, Cura e Reset nella ruota.
      wisdomCellChange: { handler: onWisdomCellChange, buttons: [0, 2] },
      wisdomSegna: onWisdomSegna,
      wisdomCura: onWisdomCura,
      wisdomReset: onWisdomReset,
      wisdomAttributePick: onWisdomAttributePick,
      // Il tiro composto (16/9): i clic dei nove riquadri della prima pagina.
      tiroArete: onTiroArete,
      tiroPrize: onTiroPrize,
      tiroSphere: onTiroSphere,
      tiroScope: onTiroScope,
      tiroAttribute: onTiroAttribute,
      tiroSkill: onTiroSkill,
      tiroSpecialty: onTiroSpecialty,
      tiroTrait: onTiroTrait,
      tiroPower: onTiroPower,
      tiroPill: onTiroPill,
      tiroClear: onTiroClear,
      tiroDifficulty: onTiroDifficulty,
      tiroQuintessence: onTiroQuintessence,
      tiroExtra: onTiroExtra,
      tiroDadi: onTiroDadi,
      tiroSforza: onTiroSforza,
      tiroNarratore: onTiroNarratore,
      tiroGrimorio: onTiroGrimorio,
      tiroIncantesimo: onTiroIncantesimo,
      grimorioClose: onGrimorioClose,
      tiroRoll: onTiroRoll,
      // I ritratti (16/9): girano, se ne aggiunge uno, si toglie quello che si vede.
      ritrattoNext: onRitrattoNext,
      ritrattoAdd: onRitrattoAdd,
      ritrattoRemove: onRitrattoRemove
    },
    // La finestra: quattro colonne di riquadri vogliono spazio (16/9).
    position: {
      width: 1340,
      height: 1080
    }
  };

  static PARTS = {
    // La testata è vuota (16/9): l'identità sta nel primo riquadro della prima pagina.
    header: {
      template: `${MODULE}/mage-header.hbs`
    },
    tabs: { template: `${MODULE}/parts/tab-navigation.hbs` },
    // La prima pagina (16/9): otto riquadri in quattro colonne, il selettore
    // del tiro composto (templates/actor/parts/stat.hbs e stat-*.hbs).
    stats: {
      template: `${MODULE}/parts/stat.hbs`,
      templates: [
        `${MODULE}/parts/stat-identita.hbs`,
        `${MODULE}/parts/salute.hbs`,
        `${MODULE}/parts/appartenenza.hbs`,
        `${MODULE}/parts/reset-tasto.hbs`,
        `${MODULE}/parts/stat-condizioni.hbs`,
        `${MODULE}/parts/stat-risorse.hbs`,
        `${MODULE}/parts/stat-ruota.hbs`,
        `${MODULE}/parts/stat-magick.hbs`,
        `${MODULE}/parts/stat-attributi.hbs`,
        `${MODULE}/parts/stat-tratti.hbs`,
        `${MODULE}/parts/stat-abilita.hbs`,
        `${MODULE}/parts/stat-tiro.hbs`
      ],
      scrollable: [".wod5e-mage-riq-scroll", ".wod5e-mage-riq-body"]
    },
    magick: {
      template: `${MODULE}/parts/spheres.hbs`,
      templates: [`${MODULE}/parts/scope-table.hbs`]
    },
    grimorio: {
      template: `${MODULE}/parts/grimorio.hbs`,
      templates: [`${MODULE}/parts/incantesimo-card.hbs`, `${MODULE}/parts/formula-scheda.hbs`, `${MODULE}/parts/filtro-sfere.hbs`]
    },
    focus: {
      template: `${MODULE}/parts/focus.hbs`,
      templates: [`${MODULE}/parts/strumento-riga.hbs`]
    },
    conceptChallenge: { template: `${MODULE}/parts/concept-challenge.hbs` },
    personaggio: { template: `${MODULE}/parts/personaggio.hbs` },
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

    // Le pagine, a gruppi (6/9): chi sei (Tratti, Dotazione), la Magick
    // (Magick, Grimorio, Credo), la storia (Bussola, Sfida, Esperienza,
    // Note). `groupStart` apre un gruppo: la barra ci mette un divisorio.
    // La PART `stats` tiene il suo id perché tabGroups.primary punta lì.
    this.tabs = {
      stats: {
        id: "stats",
        group: "primary",
        title: "WOD5E_MAGE.Tabs.Traits",
        short: "WOD5E_MAGE.Tabs.Short.stats",
        icon: icon("table-cells-large")
      },
      dotazione: {
        id: "dotazione",
        group: "primary",
        title: "WOD5E_MAGE.Tabs.Belongings",
        short: "WOD5E_MAGE.Tabs.Short.dotazione",
        icon: icon("toolbox")
      },
      magick: {
        id: "magick",
        groupStart: true,
        group: "primary",
        title: "WOD5E_MAGE.Tabs.Magick",
        short: "WOD5E_MAGE.Tabs.Short.magick",
        icon: icon("circle-nodes")
      },
      // Il Grimorio del personaggio, subito dopo la Magick (6/9).
      grimorio: {
        id: "grimorio",
        group: "primary",
        title: "WOD5E_MAGE.Tabs.Grimorio",
        short: "WOD5E_MAGE.Tabs.Short.grimorio",
        icon: icon("scroll")
      },
      focus: {
        id: "focus",
        group: "primary",
        title: "WOD5E_MAGE.Tabs.Focus",
        short: "WOD5E_MAGE.Tabs.Short.focus",
        icon: icon("bullseye")
      },
      personaggio: {
        id: "personaggio",
        groupStart: true,
        group: "primary",
        title: "WOD5E_MAGE.Tabs.Character",
        short: "WOD5E_MAGE.Tabs.Short.personaggio",
        icon: icon("gem")
      },
      // La Sfida del Concetto vive sotto il Personaggio.
      conceptChallenge: {
        id: "conceptChallenge",
        group: "primary",
        title: "WOD5E_MAGE.Tabs.ConceptChallenge",
        short: "WOD5E_MAGE.Tabs.Short.conceptChallenge",
        icon: icon("pen-to-square")
      },
      esperienza: {
        id: "esperienza",
        group: "primary",
        title: "WOD5E.Tabs.Experience",
        short: "WOD5E_MAGE.Tabs.Short.esperienza",
        icon: icon("file-contract")
      },
      // Le Note in fondo, sotto l'Esperienza (4/9 notte).
      note: {
        id: "note",
        group: "primary",
        title: "WOD5E_MAGE.Tabs.Notes",
        short: "WOD5E_MAGE.Tabs.Short.note",
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

  /**
   * La cornice della finestra si disegna una volta sola: qui entra il tasto
   * del tema (16/9), a sinistra dei tre pallini (o della X, se i pallini
   * mancano). Icona ed etichetta gliele mette applicaTema a ogni render.
   */
  async _renderFrame(options) {
    const frame = await super._renderFrame(options);
    const anchor = this.window?.controls ?? this.window?.close
      ?? frame.querySelector("button[data-action=toggleControls]") ?? frame.querySelector("button[data-action=close]");
    if (anchor && !frame.querySelector(`.${TEMA_TASTO_CLASSE}`)) {
      // Da sinistra: la creazione guidata (23/9), la misura del testo, poi il tema, poi i tre pallini.
      const guidata = document.createElement("button");
      guidata.type = "button";
      guidata.classList.add("header-control", "icon", "fa-solid", "fa-wand-sparkles", "wod5e-mage-guidata-testata");
      guidata.dataset.action = "guidataApri";
      guidata.dataset.tooltip = game.i18n.localize("WOD5E_MAGE.Guidata.Apri");
      guidata.setAttribute("aria-label", game.i18n.localize("WOD5E_MAGE.Guidata.Apri"));
      const scala = document.createElement("button");
      scala.type = "button";
      scala.classList.add("header-control", "icon", "fa-solid", "fa-text-height", SCALA_TASTO_CLASSE);
      scala.dataset.action = SCALA_AZIONE;
      const tema = document.createElement("button");
      tema.type = "button";
      tema.classList.add("header-control", "icon", "fa-solid", TEMA_TASTO_CLASSE);
      tema.dataset.action = TEMA_AZIONE;
      anchor.before(guidata, scala, tema);
    }
    return frame;
  }

  /** Il tema del giocatore (16/9) su tutte le schede del Mago aperte, senza render. */
  static applicaTemaOvunque(tema = game.settings.get(MODULE_ID, TEMA_SETTING)) {
    const localize = (key) => game.i18n.localize(key);
    for (const app of foundry.applications?.instances?.values?.() ?? []) {
      if (app instanceof MageActorSheet || app.constructor?.SCHEDA_DEL_MODULO) applicaTema(app.element, tema, { localize });
    }
    // Anche le creazioni guidate aperte (23/9) cambiano vestito.
    for (const app of CreazioneGuidata.aperte.values()) applicaTema(app.element, tema, { localize });
  }

  /** La misura del testo (16/9 sera) su tutte le schede del Mago aperte, senza render. */
  static applicaScalaOvunque(scala = game.settings.get(MODULE_ID, SCALA_SETTING)) {
    const i18n = { localize: (key) => game.i18n.localize(key), format: (key, data) => game.i18n.format(key, data), viewport: window };
    for (const app of foundry.applications?.instances?.values?.() ?? []) {
      if (app instanceof MageActorSheet || app.constructor?.SCHEDA_DEL_MODULO) applicaScala(app.element, scala, i18n);
    }
  }

  /**
   * La scheda sullo schermo (16/9 sera): la finestra parte della misura
   * che ci sta, e la scala del contenuto segue. Se la finestra del browser
   * cambia, le schede aperte si riadattano; quelle che sporgono si
   * restringono.
   */
  static adattaAlloSchermo() {
    const scala = game.settings.get(MODULE_ID, SCALA_SETTING);
    MageActorSheet.applicaScalaOvunque(scala);
    for (const app of foundry.applications?.instances?.values?.() ?? []) {
      if (!(app instanceof MageActorSheet) || app.minimized) continue;
      if (sporgeDalloSchermo(app.position, window)) app.setPosition(misuraFinestra(scala, window));
    }
  }

  static #adattaTimer = null;

  /** Il gancio sul ridimensionamento della finestra del browser, una volta sola. */
  static agganciaSchermo() {
    if (MageActorSheet.#schermoAgganciato) return;
    MageActorSheet.#schermoAgganciato = true;
    window.addEventListener("resize", () => {
      clearTimeout(MageActorSheet.#adattaTimer);
      MageActorSheet.#adattaTimer = setTimeout(() => MageActorSheet.adattaAlloSchermo(), 150);
    });
  }

  static #schermoAgganciato = false;

  /** La finestra parte della misura che sta nello schermo del giocatore. */
  _initializeApplicationOptions(options) {
    const applicationOptions = super._initializeApplicationOptions(options);
    try {
      const misura = misuraFinestra(game.settings.get(MODULE_ID, SCALA_SETTING), window);
      applicationOptions.position = { ...(applicationOptions.position ?? {}), ...misura };
    } catch (error) {
      console.warn("wod5e-mage | Misura della finestra non calcolata: resta quella di default.", error);
    }
    return applicationOptions;
  }

  /** Dopo ogni render la pagina Esperienza ricabla il suo calcolatore. */
  _onRender(context, options) {
    super._onRender?.(context, options);
    chiudiRuote(this);
    // La goccia d'inchiostro sulla casella della Saggezza appena segnata (23/9).
    faiCadereInchiostro(this);
    // La modalità chiara (16/9) e la misura del testo (16/9 sera): la classe
    // e la scala sulla finestra, i due tasti in testata.
    applicaTema(this.element, game.settings.get(MODULE_ID, TEMA_SETTING), { localize: (key) => game.i18n.localize(key) });
    applicaScala(this.element, game.settings.get(MODULE_ID, SCALA_SETTING), { localize: (key) => game.i18n.localize(key), format: (key, data) => game.i18n.format(key, data), viewport: window });
    MageActorSheet.agganciaSchermo();
    // La modalità creazione (11/9): con la spunta accesa si vedono i tasti di
    // reset e la X che azzera un tratto; spenta, la X sparisce.
    this.element?.classList.toggle("wod5e-mage-creazione", Boolean(context.creazioneReset));
    bindExperienceCalculator(this.element);
    // La lavagna delle Note: presa e angolo (6/9).
    bindNoteBoard(this);
    // L'Appartenenza in testata resta aperta o chiusa com'era, attraverso i render.
    const appartenenza = this.element?.querySelector(".wod5e-mage-appartenenza");
    if (appartenenza) {
      appartenenza.open = Boolean(this._appartenenzaOpen);
      appartenenza.addEventListener("toggle", () => { this._appartenenzaOpen = appartenenza.open; });
    }
    // Le tendine della prima pagina restano com'erano attraverso i render:
    // Condizioni, Dettagli della Ruota, il memo di creazione.
    this._drawersOpen ??= {};
    // Anche la tavola degli Ambiti della pagina Magick (Blue, 25/9: si chiudeva da sola coi pallini).
    for (const [key, selector] of [["condizioni", ".wod5e-mage-condizioni-drawer"], ["ruota", ".wod5e-mage-ruota-dettagli"], ["saggezza", ".wod5e-mage-saggezza-tendina"], ["ambitiTavola", ".wod5e-mage-riq-ambiti-tavola"]]) {
      const drawer = this.element?.querySelector(selector);
      if (!drawer) continue;
      drawer.open = Boolean(this._drawersOpen[key]);
      drawer.addEventListener("toggle", () => { this._drawersOpen[key] = drawer.open; });
    }
    // Le cerche e i filtri di Poteri e Tratti (16/9): filtrano sul posto,
    // senza render; il testo scritto sopravvive ai render.
    this._filters ??= {};
    wireStatFilters(this);
    // I cassetti al sorvolo si aprono sopra quando sotto non c'è posto.
    wireCassetti(this);
    // Le caselle delle Specializzazioni (26/9): Invio o l'uscita dal campo scrivono.
    wireSpecialtyInputs(this.element, this.actor);
    riapriSpecializzazioni(this);
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
    // Il Grimorio (6/9): ogni incantesimo è una tendina che ricorda com'era;
    // il dado nella testa non la apre né la chiude.
    this._incantesimoOpen ??= {};
    for (const card of this.element?.querySelectorAll(".wod5e-mage-incantesimo[data-row]") ?? []) {
      const id = card.dataset.row;
      if (id in this._incantesimoOpen) card.open = this._incantesimoOpen[id];
      card.addEventListener("toggle", () => { this._incantesimoOpen[id] = card.open; });
      for (const button of card.querySelectorAll(":scope > summary button")) {
        button.addEventListener("click", (event) => event.preventDefault());
      }
    }
    // La pagina Formule (26/9): le righe ricordano com'erano, i tasti di scelta si accendono al clic.
    wireFormule(this);
    // Le Sfere del Credo: ogni tendina ricorda com'era.
    this._focusSphereOpen ??= {};
    for (const sphere of this.element?.querySelectorAll(".wod5e-mage-focus-sphere[data-sphere]") ?? []) {
      const id = sphere.dataset.sphere;
      if (id in this._focusSphereOpen) sphere.open = this._focusSphereOpen[id];
      sphere.addEventListener("toggle", () => { this._focusSphereOpen[id] = sphere.open; });
    }
    // Le righe dei poteri della pagina Magick e le tendine delle righe tornano aperte com'erano (Blue, 25/9).
    riapriPoteri(this);
    riapriCassetti(this);
    // I dettagli in riga dei Tratti (Blue, 24/9 sera): le caselle accanto al
    // tratto e all'oggetto scrivono sull'oggetto al cambio, senza aprirlo.
    for (const field of this.element?.querySelectorAll("[data-item-field][data-item-id]") ?? []) {
      field.addEventListener("change", (event) => onItemFieldChange.call(this, event, field));
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
    // I tasti di reset (11/9): ognuno nella sua sezione, visibili solo con la
    // spunta «Mostra i tasti di reset» del memo di creazione; con loro la X
    // che azzera un tratto solo.
    // Il memo di creazione come spunta (23/9): i conti sui titoli dei
    // riquadri e il colore delle linguette; serve a ogni PART, la barra
    // delle pagine compresa. La stessa spunta accende i tasti di reset
    // (Blue, 23/9: «sì, che può tornare utile nella fase di creazione»): la
    // vecchia spunta «Mostra i tasti di reset» (creazione.reset) vale ancora
    // per chi l'aveva accesa.
    const creazione = this.actor.getFlag(MODULE_ID, "creazione") ?? {};
    context.creationSummary = prepareCreationSummary(this.actor, getArete(this.actor).value);
    context.memo = prepareMemo(context.creationSummary, { on: Boolean(creazione.memo) });
    context.creazioneReset = context.memo.on || Boolean(creazione.reset);
    context.resetsById = prepareResetsById(game.i18n.localize.bind(game.i18n));
    return context;
  }

  /**
   * Il contesto dei nove riquadri (16/9): Identità (ritratti, nomi,
   * Appartenenza), Salute e Condizioni, Risorse (la Ruota), Magick (Areté,
   * Sfere, Ambiti a livelli), Poteri, Attributi e Abilità per famiglia col
   * cassetto delle Specializzazioni, Tratti (gli oggetti), e Il Tiro.
   */
  prepareStatContext(context, actor) {
    const localize = game.i18n.localize.bind(game.i18n);
    const lang = game.i18n.lang;
    const i18n = { localize, lang };
    const tiro = tiroOf(this);

    // Identità.
    context.lineage = getLineage(actor);
    context.lineageChoices = prepareLineageChoices(context.lineage, localize, lang);
    const credo = String(actor.getFlag(MODULE_ID, "focus")?.credo ?? "");
    context.credos = alphabetical(FOCUS_CREDOS.map((id) => ({ id, label: localize(`WOD5E_MAGE.Focus.Credos.${id}`), selected: id === credo })), lang);
    context.credoLabel = FOCUS_CREDOS.includes(credo) ? localize(`WOD5E_MAGE.Focus.Credos.${credo}`) : "";
    const credoChoice = actor.getFlag(MODULE_ID, "focus")?.credoSpheres ?? {};
    context.credoSpheres = credoSphereBadges(credo, localize, credoChoice, actor.getFlag(MODULE_ID, "focus")?.credoFamily);
    context.credoFree = isFreeCredo(credo);
    context.credoSphereChoices = prepareCredoSphereChoices(credoChoice, localize);
    context.playerName = String(actor.getFlag(MODULE_ID, "player") ?? "");
    context.ritratti = prepareRitratti(actor.getFlag(MODULE_ID, RITRATTI_FLAG), actor.img);

    // Salute e Condizioni.
    context.salute = getSalute(actor);
    context.condizioniRows = prepareConditionRows(actor.items);
    context.condizioni = prepareCondizioni(actor.items);

    // Risorse.
    context.magickTrack = prepareMagickTrack(actor);
    context.persistentMagickResources = getPersistentMagickResources(actor);
    context.wheelAsBar = game.settings.get(MODULE_ID, "headerWheelMode") === "bar";
    context.contraccolpo = getContraccolpo(actor);

    // Magick: l'Areté, le Sfere possedute (scelte se in catena), gli Ambiti a sette livelli.
    context.arete = getArete(actor);
    // Ogni Sfera porta nel suo cassetto i suoi poteri (segnaposto finché non sono scritti).
    context.poteri = preparePoteriRows(actor, tiro, localize);
    // La riga della Sfera (20/9 sera): niente pallini, il conto dei poteri
    // conosciuti e la tendina a caselle col potere scelto per il lancio.
    context.spheres = prepareSpheres(actor, { localize, locale: lang }).selected
      .map((sphere) => {
        const poteri = poteriOfSphere(context.poteri, sphere.id);
        return { ...sphere, chosen: tiro.spheres.includes(sphere.id), poteri, potere: poteri.find((power) => power.selected) ?? null };
      });
    context.scopeRows = prepareScopeRows(tiro, localize, { arete: context.arete.value, modes: scopeModesOf(this) });

    // Il Grimorio (16/9 sera): gli incantesimi scritti, cliccabili per il lancio.
    context.incantesimi = prepareIncantesimiRows(actor, tiro, localize);

    // Attributi e Abilità per famiglia, coi sigilli e lo stato «scelto».
    const groupLabels = { physical: "WOD5E.SPC.Physical", social: "WOD5E.SPC.Social", mental: "WOD5E.SPC.Mental" };
    const attributes = applyTraitIcons(orderAttributes(context.sortedAttributes, { order: "group", lang }));
    context.attributeGroups = Object.entries(attributes).map(([group, rows]) => ({
      id: group,
      label: localize(groupLabels[group] ?? group),
      rows: (rows ?? []).map((attribute) => ({ ...attribute, chosen: tiro.attribute === attribute.id }))
    }));
    const specialtyNames = skillSpecialtyNames(actor);
    const skills = applyTraitIcons(prepareEssentialSkillsByGroup(context.sortedSkills, i18n));
    context.skillGroups = Object.entries(skills).map(([group, rows]) => ({
      id: group,
      label: localize(groupLabels[group] ?? group),
      rows: (rows ?? []).map((skill) => {
        const key = `skill:${skill.id}`;
        // Le Specializzazioni in riga sotto l'Abilità (26/9): le scritte, i posti liberi, i suggerimenti; `chosen` su quella nel tiro.
        const spec = rigaSpecializzazioni(skill.id, skill.value, specialtyNames[skill.id] ?? [], { chosen: tiro.skill === key ? tiro.specialty ?? "" : "" });
        return { ...skill, key, chosen: tiro.skill === key, spec, specialtyChosen: spec.chosen };
      })
    }));
    context.customSkills = prepareCustomSkills(actor).map((skill) => ({ ...skill, chosen: tiro.skill === `custom:${skill.id}`, custom: true }));
    // Tutte in fila (16/9 sera): il tasto accanto al + scioglie le famiglie e
    // mette ogni Abilità, Specifiche comprese, in ordine alfabetico.
    context.skillsFlat = Boolean(game.settings.get(MODULE_ID, "skillsFlat"));
    if (context.skillsFlat) {
      const rows = [...context.skillGroups.flatMap((group) => group.rows), ...context.customSkills.map((skill) => ({ ...skill, displayName: skill.name }))];
      rows.sort((a, b) => String(a.displayName ?? "").localeCompare(String(b.displayName ?? ""), lang));
      context.skillGroups = [{ id: "tutte", label: "", rows }];
      context.customSkills = [];
    }
    context.specialties = prepareSpecialties(actor, i18n);

    // Tratti: gli oggetti del personaggio in un elenco piatto, con la specie
    // per le schede in testa al riquadro (23/9; le sei di Blue del 25/9):
    // Tratti (Background, Pregi e Difetti insieme), Equipaggiamento, Poteri
    // attivi, Poteri passivi, Altro, e il Grimorio; tutto in ordine di nome.
    // La scheda scelta resta nella scheda attraverso i render.
    const kinds = [
      { id: "tratti", label: localize("WOD5E_MAGE.Stat.Tratti") },
      { id: "equipment", label: localize("WOD5E_MAGE.Stat.TrattiEquipaggiamento") },
      { id: "attivi", label: localize("WOD5E_MAGE.Stat.PoteriAttivi") },
      { id: "passivi", label: localize("WOD5E_MAGE.Stat.PoteriPassivi") },
      { id: "other", label: localize("WOD5E_MAGE.Stat.TrattiAltri") },
      { id: "grimorio", label: localize("WOD5E_MAGE.Tabs.Grimorio") }
    ];
    const kindOf = (item) => {
      if (item.type === "feature") return "tratti";
      if (["weapon", "armor", "gear"].includes(item.type)) return "equipment";
      if (["boon", "trait", "customRoll"].includes(item.type)) return "other";
      return null;
    };
    const rows = [];
    for (const item of actor.items ?? []) {
      const kindId = kindOf(item);
      if (!kindId) continue;
      const kind = kinds.find((entry) => entry.id === kindId);
      const dice = traitDiceOf(actor, [item.id]);
      rows.push({
        id: item.id,
        name: item.name,
        img: item.img,
        kind: kind.id,
        kindLabel: kind.label,
        dice: dice ? `${dice > 0 ? "+" : ""}${dice}` : "",
        chosen: tiro.traits.includes(item.id),
        hint: dice ? localize("WOD5E_MAGE.Tiro.TraitHintDice").replace("{dice}", String(dice)) : localize("WOD5E_MAGE.Tiro.TraitHint")
      });
    }
    context.traitRows = rows.sort((a, b) => a.name.localeCompare(b.name, lang));
    // I poteri con il testo dell'effetto, nelle due schede (Blue, 25/9).
    context.poteriFiltri = preparePoteriFiltri(actor, context.poteri, { localize, locale: lang });
    context.trattiScheda = schedaTratti(this._filters?.tratti);
    context.traitKinds = kinds.map((kind) => ({
      ...kind,
      short: localize(`WOD5E_MAGE.Stat.Filtri.${kind.id}`),
      active: kind.id === context.trattiScheda
    }));

    // Il Tiro.
    context.tiro = prepareTiroContext(actor, tiro);

    // I Bonus scritti, sotto i riquadri (il memo sta nel contesto di base).
    return context;
  }

  async _preparePartContext(partId, context, options) {
    context = { ...(await super._preparePartContext(partId, context, options)) };

    const actor = this.actor;

    // La prima pagina (16/9): nove riquadri, il selettore del tiro composto.
    if (partId === "stats") {
      context = this.prepareStatContext(context, actor);
    }

    // La testata è vuota: resta solo il gancio del sistema.
    if (partId === "header") {
      context.salute = getSalute(actor);
    }

    if (partId === "magick") {
      context.tab = context.tabs.magick;
      context.arete = getArete(actor);
      context.scopeTable = prepareScopeTable(game.i18n.localize.bind(game.i18n));
      context.magickTrack = prepareMagickTrack(actor);
      context.persistentMagickResources = getPersistentMagickResources(actor);
      context.ongoingMagick = prepareOngoingMagick(actor, game.i18n.localize.bind(game.i18n));
      // La pagina rifatta (21/9): le nove Sfere in lista, i poteri inseriti Sfera per Sfera.
      Object.assign(context, preparePoteriPagina(actor, this, {
        localize: game.i18n.localize.bind(game.i18n),
        locale: game.i18n.lang
      }));
    }

    // La pagina del Credo: Saggezza, Credo, Tipo e Strumenti per Sfera.
    if (partId === "focus") {
      context.tab = context.tabs.focus;
      context.focus = await prepareFocus(actor, undefined, { editing: this._credoInModifica });
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
      context.altriOggetti = belongings.items;
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

    // La pagina Formule (26/9): a sinistra le Formule accessibili (o tutte), a
    // destra gli effetti di Magick del giocatore, in ordine di nome.
    if (partId === "grimorio") {
      context.tab = context.tabs.grimorio;
      const localize = game.i18n.localize.bind(game.i18n);
      context.formule = prepareFormulePagina(sfereAccessibili(actor), { tutte: Boolean(this._formuleTutte), localize, lang: game.i18n.lang });
      context.incantesimi = [...prepareIncantesimi(actor, localize)].sort((a, b) => a.name.localeCompare(b.name, game.i18n.lang));
      context.incantesimiGroups = groupIncantesimiBySphere(context.incantesimi, localize);
      // Il filtro per Sfera degli effetti (26/9 sera): le Sfere che gli effetti usano.
      context.effettiSfere = sfereDelFiltro(context.incantesimi.map((spell) => spell.spheres.map((sphere) => sphere.id)), localize, game.i18n.lang);
    }

    if (partId === "note") {
      context.note = prepareNote(actor);
      context.noteBoardHeight = noteBoardHeight(context.note);
      context.tab = context.tabs.note;
    }

    // L'Esperienza vive in scheda: totali, registro delle spese, calcolatore.
    if (partId === "esperienza") {
      context.experience = prepareExperiencePage(actor, { localize: game.i18n.localize.bind(game.i18n), format: game.i18n.format.bind(game.i18n) });
      context.tab = context.tabs.esperienza;
    }

    return context;
  }
}
