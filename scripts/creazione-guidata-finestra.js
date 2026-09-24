/**
 * La finestra della creazione guidata (Blue, 21/9 e 23/9): un'ApplicationV2
 * a parte, aperta dal tasto in testata della scheda e da sola su un Mago
 * appena creato. Guida nell'ordine del 5/9, scrive subito sul personaggio
 * (la scheda dietro si aggiorna da sé) e si riapre al passo dov'era
 * (flag creazione.guidata.passo). I conti stanno in creazione-guidata.js;
 * qui i clic, i campi e i cataloghi.
 */
import { CHIAVI_VIVE } from "./abilita-essenziali.js";
import { addFromArchivio, ARCHIVI, loadArchivio, openArchivio } from "./archivi.js";
import { getArete } from "./arete.js";
import { MAGE_SHEET_ID, MODULE_ID } from "./constants.js";
import {
  GUIDA_TESTI_SETTING,
  GUIDATA_FLAG,
  PASSI,
  passoSalvato,
  prepareGuidata,
  QUINTESSENZA_INIZIALE
} from "./creazione-guidata.js";
import { findFamiglia, findSottofamiglia } from "./famiglie.js";
import { FOCUS_CREDOS, FOCUS_FORMS, FOCUS_TOOL_IDS } from "./focus.js";
import { applyMagickBalanceDelta, getMagickBalance } from "./magick-balance.js";
import { PERSONAGGIO_TABLES } from "./personaggio-extra.js";
import { POTERI_FLAG } from "./poteri.js";
import { aggiungiDalCatalogo, sferePerCatalogo } from "./poteri-scheda.js";
import { openCatalogoPoteri } from "./catalogo-poteri.js";
import { creationTargets } from "./riepilogo.js";
import { getSphereSelection, SPHERES } from "./spheres.js";
import { isChiaro, TEMA_CLASSE, TEMA_SETTING } from "./tema.js";
import { ATTRIBUTE_KEYS } from "./tratti-icone.js";

const RADICE = `modules/${MODULE_ID}/templates/guidata`;

/** I cataloghi che i passi pescano: il passo e le sue specie d'archivio. */
const CATALOGHI_PER_PASSO = Object.freeze({
  bussola: ["ambizione", "desiderio", "convinzione"],
  concetto: ["concetto"],
  ancore: ["ancora"]
});

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class CreazioneGuidata extends HandlebarsApplicationMixin(ApplicationV2) {
  /** Le finestre aperte, una per personaggio. */
  static aperte = new Map();

  #actor;

  /** Il passo di chi non può scrivere sul personaggio: resta nella finestra. */
  #passo = null;

  /** Le voci dei cataloghi già caricate, per specie. */
  #cataloghi = {};

  constructor({ actor, ...options } = {}) {
    super({ id: `wod5e-mage-guidata-${actor?.id ?? "nuovo"}`, ...options });
    this.#actor = actor;
  }

  static DEFAULT_OPTIONS = {
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-guidata"],
    tag: "form",
    window: {
      title: "WOD5E_MAGE.Guidata.Title",
      icon: "fa-solid fa-wand-sparkles",
      resizable: true,
      contentClasses: ["wod5e-mage-guidata-contenuto"]
    },
    position: { width: 1060, height: 800 },
    form: {
      submitOnChange: true,
      closeOnSubmit: false,
      handler: CreazioneGuidata.#onSubmit
    },
    actions: {
      passoVai: CreazioneGuidata.#onPassoVai,
      credoScegli: CreazioneGuidata.#onCredoScegli,
      famigliaScegli: CreazioneGuidata.#onFamigliaScegli,
      sottofamigliaScegli: CreazioneGuidata.#onSottofamigliaScegli,
      tipoScegli: CreazioneGuidata.#onTipoScegli,
      catalogoApri: CreazioneGuidata.#onCatalogoApri,
      propostaMetti: CreazioneGuidata.#onPropostaMetti,
      rigaTogli: CreazioneGuidata.#onRigaTogli,
      rigaNuova: CreazioneGuidata.#onRigaNuova,
      sfidaApri: CreazioneGuidata.#onSfidaApri,
      dominioAccesso: CreazioneGuidata.#onDominioAccesso,
      dominioPotere: CreazioneGuidata.#onDominioPotere,
      dominioPotereTogli: CreazioneGuidata.#onDominioPotereTogli,
      strumentoUsa: CreazioneGuidata.#onStrumentoUsa,
      areteScegli: CreazioneGuidata.#onAreteScegli,
      aretePartenza: CreazioneGuidata.#onAretePartenza,
      risorsa: CreazioneGuidata.#onRisorsa,
      attributoPallino: CreazioneGuidata.#onAttributoPallino,
      abilitaPallino: CreazioneGuidata.#onAbilitaPallino,
      oggettoPunti: CreazioneGuidata.#onOggettoPunti,
      oggettoTogli: CreazioneGuidata.#onOggettoTogli,
      percheRipristina: CreazioneGuidata.#onPercheRipristina,
      schedaApri: CreazioneGuidata.#onSchedaApri,
      chiudi: CreazioneGuidata.#onChiudi
    }
  };

  static PARTS = {
    testa: { template: `${RADICE}/testa.hbs` },
    corpo: {
      template: `${RADICE}/corpo.hbs`,
      templates: [`${RADICE}/perche.hbs`, ...PASSI.map((id) => `${RADICE}/passi/${id}.hbs`)],
      scrollable: [".wod5e-mage-guidata-corpo"]
    },
    piede: { template: `${RADICE}/piede.hbs` }
  };

  get actor() {
    return this.#actor;
  }

  get title() {
    return game.i18n.format("WOD5E_MAGE.Guidata.WindowTitle", { name: this.actor?.name ?? "" });
  }

  /** Il passo in corso: sul personaggio per chi lo possiede, nella finestra per gli altri. */
  get passo() {
    return this.#passo ?? passoSalvato(this.actor);
  }

  get canEdit() {
    return Boolean(this.actor?.isOwner) && !this.actor?.system?.locked;
  }

  /* ---------------------------------------------------------------- */

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const passo = this.passo;
    const id = PASSI[passo - 1];
    await this.#caricaCataloghi(CATALOGHI_PER_PASSO[id] ?? []);
    const localize = game.i18n.localize.bind(game.i18n);
    const testi = game.settings.get(MODULE_ID, GUIDA_TESTI_SETTING) ?? {};
    const guida = prepareGuidata(this.actor, {
      passo,
      localize,
      lang: game.i18n.lang,
      cataloghi: this.#cataloghi,
      testi,
      canEdit: this.canEdit,
      narratore: Boolean(game.user?.isGM)
    });
    guida.passo.partial = `${RADICE}/passi/${guida.passo.id}.hbs`;
    return Object.assign(context, guida, {
      bloccato: Boolean(this.actor?.isOwner) && Boolean(this.actor?.system?.locked),
      actor: this.actor
    });
  }

  async #caricaCataloghi(kinds) {
    for (const kind of kinds) {
      if (this.#cataloghi[kind] || !ARCHIVI[kind]) continue;
      this.#cataloghi[kind] = await loadArchivio(kind);
    }
  }

  _onRender(context, options) {
    super._onRender?.(context, options);
    // La finestra segue il personaggio: ogni scrittura la ridisegna.
    if (this.actor?.apps && !this.actor.apps[this.id]) this.actor.apps[this.id] = this;
    CreazioneGuidata.aperte.set(this.actor?.id, this);
    this.element.classList.toggle(TEMA_CLASSE, isChiaro(game.settings.get(MODULE_ID, TEMA_SETTING)));
    // Le immagini delle Famiglie che mancano lasciano il posto al segnaposto
    // (l'onerror sta nel template; qui quelle già fallite in cache).
    for (const img of this.element.querySelectorAll(".wod5e-mage-guidata-arte.immagine img")) {
      if (img.complete && img.naturalWidth === 0) img.parentElement?.classList.add("manca");
    }
  }

  _onClose(options) {
    super._onClose?.(options);
    if (this.actor?.apps) delete this.actor.apps[this.id];
    if (CreazioneGuidata.aperte.get(this.actor?.id) === this) CreazioneGuidata.aperte.delete(this.actor?.id);
  }

  /* ---------------------------------------------------------------- */
  /* I campi: la scheda si scrive a ogni cambio; il perché va nel mondo. */
  /* ---------------------------------------------------------------- */

  static async #onSubmit(event, form, formData) {
    const dati = foundry.utils.expandObject(formData.object ?? {});
    const testi = dati[GUIDA_TESTI_SETTING];
    delete dati[GUIDA_TESTI_SETTING];
    if (testi && game.user?.isGM) {
      const attuali = foundry.utils.deepClone(game.settings.get(MODULE_ID, GUIDA_TESTI_SETTING) ?? {});
      await game.settings.set(MODULE_ID, GUIDA_TESTI_SETTING, foundry.utils.mergeObject(attuali, testi));
    }
    if (Object.keys(dati).length && this.canEdit) await this.actor.update(dati);
    // Il testo riscritto si rilegge subito, anche se il personaggio non è cambiato.
    if (testi) await this.render();
  }

  /* ---------------------------------------------------------------- */
  /* I clic                                                              */
  /* ---------------------------------------------------------------- */

  async #vaiAlPasso(n) {
    const passo = Math.min(Math.max(Math.trunc(Number(n) || 1), 1), PASSI.length);
    if (this.actor?.isOwner) {
      await this.actor.update({ [`flags.${MODULE_ID}.${GUIDATA_FLAG}.guidata.passo`]: passo });
      return;
    }
    this.#passo = passo;
    await this.render();
  }

  #avvisaNonPuoi() {
    if (!this.actor?.isOwner) {
      ui.notifications.warn(game.i18n.format("WOD5E.Notifications.NoSufficientPermission", { string: this.actor?.name ?? "" }));
      return true;
    }
    if (this.actor?.system?.locked) {
      ui.notifications.warn(game.i18n.format("WOD5E.Notifications.CannotModifyResourceString", { string: this.actor.name }));
      return true;
    }
    return false;
  }

  static async #onPassoVai(event, target) {
    event.preventDefault();
    await this.#vaiAlPasso(target.dataset.passo);
  }

  static async #onCredoScegli(event, target) {
    event.preventDefault();
    if (this.#avvisaNonPuoi()) return;
    const credo = String(target.dataset.credo ?? "");
    if (!FOCUS_CREDOS.includes(credo)) return;
    await this.actor.update({ [`flags.${MODULE_ID}.focus.credo`]: credo });
  }

  static async #onFamigliaScegli(event, target) {
    event.preventDefault();
    if (this.#avvisaNonPuoi()) return;
    const famiglia = String(target.dataset.famiglia ?? "");
    if (!findFamiglia(famiglia)) return;
    const current = this.actor.getFlag(MODULE_ID, "lineage") ?? {};
    if (String(current.famiglia ?? "") === famiglia) return;
    await this.actor.update({ [`flags.${MODULE_ID}.lineage`]: { famiglia, sottofamiglia: "" } });
  }

  static async #onSottofamigliaScegli(event, target) {
    event.preventDefault();
    if (this.#avvisaNonPuoi()) return;
    const sottofamiglia = String(target.dataset.sottofamiglia ?? "");
    const famiglia = String(this.actor.getFlag(MODULE_ID, "lineage")?.famiglia ?? "");
    if (!findSottofamiglia(famiglia, sottofamiglia)) return;
    await this.actor.update({ [`flags.${MODULE_ID}.lineage.sottofamiglia`]: sottofamiglia });
  }

  static async #onTipoScegli(event, target) {
    event.preventDefault();
    if (this.#avvisaNonPuoi()) return;
    const form = String(target.dataset.form ?? "");
    if (!FOCUS_FORMS.includes(form)) return;
    await this.actor.update({ [`flags.${MODULE_ID}.focus.practiceForm`]: form });
  }

  static async #onCatalogoApri(event, target) {
    event.preventDefault();
    const kind = String(target.dataset.kind ?? "");
    if (!ARCHIVI[kind]) return;
    await openArchivio(this.actor, kind);
  }

  /** Una proposta cliccata va sulla scheda come dal catalogo (il + dell'archivio). */
  static async #onPropostaMetti(event, target) {
    event.preventDefault();
    if (this.#avvisaNonPuoi()) return;
    const kind = String(target.dataset.kind ?? "");
    const uuid = String(target.dataset.uuid ?? "");
    const entry = (this.#cataloghi[kind] ?? []).find((voce) => voce.uuid === uuid);
    if (!entry) return;
    await addFromArchivio(this.actor, kind, entry);
  }

  static async #onRigaTogli(event, target) {
    event.preventDefault();
    if (this.#avvisaNonPuoi()) return;
    const table = String(target.dataset.table ?? "");
    const row = String(target.dataset.row ?? "");
    if (!Object.values(PERSONAGGIO_TABLES).includes(table) || !row) return;
    await this.actor.update({ [`flags.${MODULE_ID}.${table}.-=${row}`]: null });
  }

  static async #onRigaNuova(event, target) {
    event.preventDefault();
    if (this.#avvisaNonPuoi()) return;
    const table = String(target.dataset.table ?? "");
    if (!Object.values(PERSONAGGIO_TABLES).includes(table)) return;
    const rows = { ...(this.actor.getFlag(MODULE_ID, table) ?? {}) };
    let rowId = foundry.utils.randomID();
    while (rows[rowId]) rowId = foundry.utils.randomID();
    rows[rowId] = table === PERSONAGGIO_TABLES.anchors ? { name: "", description: "" } : { group: "", text: "", serve: "", cross: "" };
    await this.actor.setFlag(MODULE_ID, table, rows);
  }

  /** La Sfida sta sulla scheda: la finestra apre la scheda alla pagina giusta. */
  static async #onSfidaApri(event) {
    event.preventDefault();
    const sheet = this.actor?.sheet;
    if (!sheet) return;
    await sheet.render(true);
    sheet.changeTab?.("conceptChallenge", "primary");
  }

  /**
   * L'accesso a un Dominio (25/9): la Sfera entra fra le conosciute, e il
   * livello segna 1 come promemoria; tolto l'accesso, la Sfera torna fuori
   * e il livello a 0. I poteri presi lì restano sulla scheda.
   */
  static async #onDominioAccesso(event, target) {
    event.preventDefault();
    if (this.#avvisaNonPuoi()) return;
    const sphere = String(target.dataset.sphere ?? "");
    if (!SPHERES.includes(sphere)) return;
    const selection = getSphereSelection(this.actor);
    const aperto = !selection[sphere];
    const level = Math.trunc(Number(this.actor.getFlag(MODULE_ID, "spheres")?.[sphere]) || 0);
    const changes = { [`flags.${MODULE_ID}.selectedSpheres`]: { ...selection, [sphere]: aperto } };
    if (aperto && level < 1) changes[`flags.${MODULE_ID}.spheres.${sphere}`] = 1;
    if (!aperto) changes[`flags.${MODULE_ID}.spheres.${sphere}`] = 0;
    await this.actor.update(changes);
  }

  /** Il potere del Dominio: la finestra «Aggiungi» della scheda, aperta su quella Sfera. */
  static async #onDominioPotere(event, target) {
    event.preventDefault();
    if (this.#avvisaNonPuoi()) return;
    const sphere = String(target.dataset.sphere ?? "");
    const spheres = sferePerCatalogo(this.actor);
    if (!spheres.some((entry) => entry.id === sphere)) return;
    const actor = this.actor;
    await openCatalogoPoteri({ spheres, sphere, onAdd: (dove, catalogId) => aggiungiDalCatalogo(actor, dove, catalogId) });
  }

  static async #onDominioPotereTogli(event, target) {
    event.preventDefault();
    if (this.#avvisaNonPuoi()) return;
    const id = String(target.dataset.row ?? "");
    const rows = this.actor.getFlag(MODULE_ID, POTERI_FLAG) ?? {};
    if (!Object.hasOwn(rows, id)) return;
    await this.actor.update({ [`flags.${MODULE_ID}.${POTERI_FLAG}.-=${id}`]: null });
  }

  /** Il consiglio del Credo cliccato: lo Strumento, il tuo di preciso se manca, il mestiere se serve. */
  static async #onStrumentoUsa(event, target) {
    event.preventDefault();
    if (this.#avvisaNonPuoi()) return;
    const sphere = String(target.dataset.sphere ?? "");
    const tool = String(target.dataset.tool ?? "");
    if (!sphere || !FOCUS_TOOL_IDS.includes(tool)) return;
    const current = this.actor.getFlag(MODULE_ID, "focus")?.sphereInstruments?.[sphere] ?? {};
    const next = { tool };
    if (!String(current.name ?? "").trim() && target.dataset.name) next.name = String(target.dataset.name);
    if (!String(current.profession ?? "").trim() && target.dataset.profession) next.profession = String(target.dataset.profession);
    await this.actor.update({ [`flags.${MODULE_ID}.focus.sphereInstruments.${sphere}`]: next });
  }

  static async #onAreteScegli(event, target) {
    event.preventDefault();
    if (this.#avvisaNonPuoi()) return;
    const value = Math.min(Math.max(Math.trunc(Number(target.dataset.value) || 1), 1), 5);
    await this.actor.setFlag(MODULE_ID, "arete", { value });
  }

  /** Il tasto di partenza (LIBRO 05_080): l'Areté del grado, Quintessenza 3, Paradosso al pavimento. */
  static async #onAretePartenza(event) {
    event.preventDefault();
    if (this.#avvisaNonPuoi()) return;
    const creazione = this.actor.getFlag(MODULE_ID, GUIDATA_FLAG) ?? {};
    const target = creationTargets(creazione.grado).arete;
    const balance = getMagickBalance(this.actor);
    await this.actor.update({
      [`flags.${MODULE_ID}.arete`]: { value: target },
      [`flags.${MODULE_ID}.magickBalance`]: { quintessence: Math.min(QUINTESSENZA_INIZIALE, 9 - balance.floor), paradox: balance.floor }
    });
  }

  static async #onRisorsa(event, target) {
    event.preventDefault();
    if (this.#avvisaNonPuoi()) return;
    const resource = String(target.dataset.resource ?? "");
    const delta = Number(target.dataset.delta) || 0;
    const balance = getMagickBalance(this.actor);
    const next = applyMagickBalanceDelta(balance, resource, delta, balance.floor);
    if (next.quintessence === balance.quintessence && next.paradox === balance.paradox) return;
    await this.actor.setFlag(MODULE_ID, "magickBalance", next);
  }

  static async #onAttributoPallino(event, target) {
    event.preventDefault();
    if (this.#avvisaNonPuoi()) return;
    const id = String(target.dataset.attribute ?? "");
    if (!ATTRIBUTE_KEYS.includes(id)) return;
    const value = Math.min(Math.max(Math.trunc(Number(target.dataset.value) || 1), 1), 5);
    await this.actor.update({ [`system.attributes.${id}.value`]: value });
  }

  static async #onAbilitaPallino(event, target) {
    event.preventDefault();
    if (this.#avvisaNonPuoi()) return;
    const id = String(target.dataset.skill ?? "");
    if (!CHIAVI_VIVE.includes(id)) return;
    const value = Math.min(Math.max(Math.trunc(Number(target.dataset.value) || 0), 0), 5);
    const cap = creationTargets((this.actor.getFlag(MODULE_ID, GUIDATA_FLAG) ?? {}).grado).skillCap;
    if (value > cap) {
      ui.notifications.warn(game.i18n.format("WOD5E_MAGE.Guidata.Abilita.TettoAvviso", { cap }));
      return;
    }
    await this.actor.update({ [`system.skills.${id}.value`]: value });
  }

  static async #onOggettoPunti(event, target) {
    event.preventDefault();
    if (this.#avvisaNonPuoi()) return;
    const item = this.actor.items.get(String(target.dataset.item ?? ""));
    if (!item) return;
    const value = Math.min(Math.max(Math.trunc(Number(target.dataset.value) || 0), 0), 5);
    // Lo stesso pallino cliccato di nuovo toglie il punto (come sulla scheda).
    const current = Math.trunc(Number(item.system?.points) || 0);
    await item.update({ "system.points": current === value ? value - 1 : value });
  }

  static async #onOggettoTogli(event, target) {
    event.preventDefault();
    if (this.#avvisaNonPuoi()) return;
    const item = this.actor.items.get(String(target.dataset.item ?? ""));
    if (item) await item.delete();
  }

  static async #onPercheRipristina(event) {
    event.preventDefault();
    if (!game.user?.isGM) return;
    const id = PASSI[this.passo - 1];
    const attuali = foundry.utils.deepClone(game.settings.get(MODULE_ID, GUIDA_TESTI_SETTING) ?? {});
    delete attuali[id];
    await game.settings.set(MODULE_ID, GUIDA_TESTI_SETTING, attuali);
    await this.render();
  }

  static async #onSchedaApri(event) {
    event.preventDefault();
    await this.actor?.sheet?.render(true);
  }

  static async #onChiudi(event) {
    event.preventDefault();
    await this.close();
  }
}

/** Apre la guida del personaggio (o la porta in cima, se è già aperta). */
export async function apriCreazioneGuidata(actor) {
  if (!actor) return null;
  const aperta = CreazioneGuidata.aperte.get(actor.id);
  if (aperta) {
    await aperta.render({ force: true });
    aperta.bringToFront?.();
    return aperta;
  }
  const finestra = new CreazioneGuidata({ actor });
  await finestra.render({ force: true });
  return finestra;
}

/** L'azione del tasto in testata della scheda. */
export async function onGuidataApri(event) {
  event?.preventDefault?.();
  await apriCreazioneGuidata(this.actor);
}

/**
 * Il modulo registra l'impostazione dei testi e apre la guida da sola sul
 * Mago appena creato (da chi lo crea).
 */
export function registraCreazioneGuidata() {
  game.settings.register(MODULE_ID, GUIDA_TESTI_SETTING, {
    scope: "world",
    config: false,
    type: Object,
    default: {}
  });
  Hooks.on("createActor", (actor, options, userId) => {
    if (userId !== game.user?.id) return;
    if (actor?.getFlag?.("core", "sheetClass") !== MAGE_SHEET_ID) return;
    // La scheda si apre da sé: la guida le va sopra, un attimo dopo.
    setTimeout(() => { apriCreazioneGuidata(actor); }, 250);
  });
}
