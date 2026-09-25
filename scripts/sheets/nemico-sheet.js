/**
 * La scheda del nemico (Blue, 25/9, dal mock docs/mock_scheda_nemico_25-9.html):
 * una scheda in più per gli attori `spc` del sistema, «Scheda del nemico
 * (M6)». La testata resta sempre (chi è, Salute, Armatura, Condizioni); sotto
 * quattro pagine: In gioco, Magick (solo se ce l'ha), Oggetti, Note. I conti
 * e i contesti stanno in nemico.js (funzioni pure), le carte in chat in
 * nemico-chat.js; qui la finestra, le azioni e la memoria della scheda (le
 * righe aperte, il cassetto, il modulo a mano).
 *
 * I dati nuovi stanno in flags.wod5e-mage.nemico; i campi col `name` si
 * salvano da soli al cambio, col form del sistema. Estende la scheda spc del
 * sistema: da lì arrivano il trascinamento degli oggetti, il ritratto, il
 * lucchetto, la vista limitata.
 */
import { SPCActorSheet } from "/systems/wod5e/system/actor/spc-actor-sheet.js";
import { onArchivioOpen } from "../archivi.js";
import { onCondizioneToggle, prepareCondizioni } from "../condizioni.js";
import { MODULE_ID } from "../constants.js";
import { POTERI } from "../data/poteri.js";
import { onArmaturaColpo, onArmaturaPunto } from "../dotazione-extra.js";
import { findFormula } from "../grimorio.js";
import { CAMPI, effettoDaFormula, idNuovo, malusCondizioni, manoDelNarratore, NEMICO_FLAG, prepareNemicoContext, puoAlzare, riservaDellAzione, riservaScalata, sogliaDagliAmbiti, TIPI_MAGICK } from "../nemico.js";
import { lanciaNemico, tiraNemico } from "../nemico-chat.js";
import { onGuidedItemCreate, onGuidedItemEdit } from "../oggetti-guidati.js";
import { getSalute, onSaluteCellChange, onSaluteDanni, onSaluteReset, onSaluteRiposo } from "../salute.js";
import { SPHERES } from "../spheres.js";
import { altraScala, altroTema, applicaScala, applicaTema, misuraFinestra, SCALA_AZIONE, SCALA_SETTING, SCALA_TASTO_CLASSE, scalaFattore, TEMA_AZIONE, TEMA_SETTING, TEMA_TASTO_CLASSE } from "../tema.js";
import { chiudiRuote, onVentaglioChiudi, onVentaglioToggle, wireCassetti } from "./mage-actor-sheet.js";

const NEMICO = `modules/${MODULE_ID}/templates/nemico`;

/** La misura naturale della finestra (il mock): si adatta allo schermo come la scheda del mago. */
export const MISURA_NEMICO = Object.freeze({ width: 940, height: 820 });

const DISPOSIZIONI = ["ostile", "neutrale", "amichevole", "segreto"];

/* ------------------------------------------------------------- gli aiuti */

function localize(key) {
  return game.i18n.localize(key);
}

function format(key, data) {
  return game.i18n.format(key, data);
}

function radice(path) {
  return `flags.${MODULE_ID}.${NEMICO_FLAG}${path ? `.${path}` : ""}`;
}

function scrivi(sheet, path, value) {
  return sheet.actor.update({ [radice(path)]: value });
}

function togli(sheet, path, key) {
  return sheet.actor.update({ [`${radice(path)}.-=${key}`]: null });
}

function puoScrivere(sheet) {
  const actor = sheet.actor;
  if (actor.isOwner && !actor.system?.locked) return true;
  ui.notifications.warn(format("WOD5E.Notifications.NoSufficientPermission", { string: actor.name }));
  return false;
}

function bandiera(sheet) {
  return sheet.actor.getFlag(MODULE_ID, NEMICO_FLAG) ?? {};
}

function nuovoId(sheet, tavola) {
  return idNuovo(tavola ?? {}, () => foundry.utils.randomID());
}

/** Il primo blocco del testo di un potere, per l'effetto copiato dal catalogo. */
function primoBlocco(text) {
  const pulito = String(text ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return pulito.split(/(?=Effetto (?:attivo|passivo):)/i).map((parte) => parte.trim()).filter(Boolean)[0] ?? pulito;
}

/* ------------------------------------------------------------- le azioni */

/** Il ritratto: il + apre lo sfoglia file; la stessa immagine fa il token. */
async function onRitrattoCambia(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!actor.isOwner) return;
  const picker = new foundry.applications.apps.FilePicker.implementation({
    type: "image",
    current: actor.img,
    callback: async (path) => {
      await actor.update({ img: path, "prototypeToken.texture.src": path });
    }
  });
  await picker.browse();
}

async function onMagickAccendi(event) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  this.tabGroups.primary = "magick";
  await scrivi(this, "magick.on", true);
}

async function onMagickSpegni(event) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  this.tabGroups.primary = "gioco";
  await scrivi(this, "magick.on", false);
}

/** La riserva d'oro di una carta, o un caso a dadi: tira. */
async function onNemicoTira(event, target) {
  event.preventDefault();
  const ctx = this.contesto();
  const id = String(target.dataset.riserva ?? "physical");
  const riserva = riservaDellAzione(id, { casi: ctx.casi, system: this.actor.system, localize });
  const scalata = riservaScalata(riserva.base, malusCondizioni(this.actor.items.contents)[riserva.campo], manoDelNarratore(ctx.dati, localize));
  const nome = CAMPI.includes(id) ? format("WOD5E_MAGE.Nemico.TiroCampo", { campo: riserva.label.toLowerCase() }) : riserva.label;
  await tiraNemico(this.actor, { nome, riserva: { ...riserva, ...scalata }, soglia: 0 });
}

async function onNemicoAzioneTira(event, target) {
  event.preventDefault();
  const azione = this.contesto().azioni.find((row) => row.id === target.dataset.azione);
  if (!azione || azione.senzaTiro) return;
  await tiraNemico(this.actor, { nome: azione.nome, riserva: azione.riserva, soglia: azione.soglia, danno: azione.danno, aggravato: azione.aggravato, condizione: azione.condizione });
}

/** «Usa»: accende l'effetto dell'azione senza tiro; un altro clic lo spegne (e il suo turno dopo, in combattimento). */
async function onNemicoAzioneUsa(event, target) {
  event.preventDefault();
  if (!this.actor.isOwner) return;
  const id = String(target.dataset.azione ?? "");
  const attive = bandiera(this).attive ?? {};
  if (attive[id]) await togli(this, "attive", id);
  else await scrivi(this, `attive.${id}`, true);
}

async function onNemicoAzioneApri(event, target) {
  event.preventDefault();
  const id = String(target.dataset.azione ?? "");
  if (this._stato.aperte.has(id)) this._stato.aperte.delete(id); else this._stato.aperte.add(id);
  await this.render({ parts: ["gioco"] });
}

async function onNemicoAzioneNuova(event) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  const id = nuovoId(this, bandiera(this).azioni);
  this._stato.aperte.add(id);
  await scrivi(this, `azioni.${id}`, { nome: localize("WOD5E_MAGE.Nemico.AzioneNuova"), riserva: "physical", senzaTiro: false, sort: Date.now() });
}

async function onNemicoAzioneTogli(event, target) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  const id = String(target.dataset.azione ?? "");
  this._stato.aperte.delete(id);
  await this.actor.update({ [`${radice("azioni")}.-=${id}`]: null, [`${radice("attive")}.-=${id}`]: null });
}

/** Un caso nuovo su una carta: cosa, soglia o riserva, quanto, l'Abilità facoltativa. */
async function onNemicoCasoNuovo(event, target) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  const campo = CAMPI.includes(target.dataset.campo) ? target.dataset.campo : "physical";
  const ctx = this.contesto();
  const content = await foundry.applications.handlebars.renderTemplate(`modules/${MODULE_ID}/templates/dialogs/nemico-caso.hbs`, { abilita: ctx.abilitaScelta });
  const result = await foundry.applications.api.DialogV2.input({
    window: { title: format("WOD5E_MAGE.Nemico.CasoTitolo", { campo: localize(`WOD5E_MAGE.Nemico.Campi.${campo}`) }) },
    content,
    ok: { icon: "fas fa-plus", label: localize("WOD5E_MAGE.Nemico.Aggiungi") },
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-roll-dialog"],
    position: { width: 420, height: "auto" }
  });
  if (!result || result === "cancel") return;
  const nome = String(result.nome ?? "").trim();
  if (!nome) return;
  const valore = Math.max(Math.trunc(Number(result.valore) || 0), 0);
  const aSoglia = result.tipo === "soglia";
  const id = nuovoId(this, bandiera(this).casi);
  await scrivi(this, `casi.${id}`, { nome, campo, soglia: aSoglia ? valore : null, dadi: aSoglia ? null : valore, skill: String(result.skill ?? ""), sort: Date.now() });
}

async function onNemicoCasoTogli(event, target) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  await togli(this, "casi", String(target.dataset.caso ?? ""));
}

async function onNemicoEffettoNuovo(event) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  const id = nuovoId(this, bandiera(this).effetti);
  await scrivi(this, `effetti.${id}`, { nome: localize("WOD5E_MAGE.Nemico.EffettoNuovo"), testo: "", tipo: "passivo", catalogo: "", sort: Date.now() });
}

async function onNemicoEffettoTogli(event, target) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  await togli(this, "effetti", String(target.dataset.effetto ?? ""));
}

/** «Dal catalogo»: la finestra coi poteri dei maghi; il + copia nome e testo, e la riga porta il libro. */
async function onNemicoEffettoCatalogo(event) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  const poteri = POTERI.map((power) => ({
    id: power.id,
    name: power.name,
    breve: primoBlocco(power.text).slice(0, 110),
    testo: primoBlocco(power.text),
    sfere: (power.spheres ?? []).filter((id) => SPHERES.includes(id)).map((id) => ({ id, icon: `modules/${MODULE_ID}/assets/icons/sheet/${id}.png`, label: localize(`WOD5E_MAGE.Spheres.${id}`) })),
    tipoLabel: String(power.kind ?? ""),
    search: `${power.name} ${power.text}`.toLowerCase()
  })).sort((a, b) => a.name.localeCompare(b.name, game.i18n.lang));
  const content = await foundry.applications.handlebars.renderTemplate(`modules/${MODULE_ID}/templates/dialogs/nemico-catalogo.hbs`, { poteri });
  const sheet = this;
  await foundry.applications.api.DialogV2.wait({
    window: { title: localize("WOD5E_MAGE.Nemico.CatalogoTitolo") },
    position: { width: 640, height: 640 },
    content,
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-archivio-dialog", "wod5e-mage-nemico-catalogo-dialog"],
    buttons: [{ action: "close", icon: "fas fa-times", label: localize("WOD5E.Close"), default: true }],
    render: (_event, dialog) => {
      const root = dialog.element;
      const search = root.querySelector("[data-role=nemicoCatalogoCerca]");
      const righe = [...root.querySelectorAll("[data-role=nemicoCatalogoVoce]")];
      const vuoto = root.querySelector("[data-role=nemicoCatalogoVuoto]");
      const filtra = () => {
        const needle = String(search?.value ?? "").trim().toLowerCase();
        let viste = 0;
        for (const riga of righe) {
          const ok = !needle || String(riga.dataset.search ?? "").includes(needle);
          riga.hidden = !ok;
          if (ok) viste += 1;
        }
        if (vuoto) vuoto.hidden = viste > 0;
      };
      search?.addEventListener("input", filtra);
      for (const button of root.querySelectorAll("[data-role=nemicoCatalogoAggiungi]")) {
        button.addEventListener("click", async (clic) => {
          clic.preventDefault();
          const power = poteri.find((p) => p.id === button.dataset.potere);
          if (!power) return;
          const id = nuovoId(sheet, bandiera(sheet).effetti);
          const tipo = /passiv/i.test(power.tipoLabel) ? "passivo" : "attivo";
          await scrivi(sheet, `effetti.${id}`, { nome: power.name, testo: power.testo, tipo, catalogo: power.id, sort: Date.now() });
          button.classList.add("viola");
          button.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i>';
        });
      }
    }
  });
}

async function onNemicoArete(event, target) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  await scrivi(this, "magick.arete", Math.min(Math.max(Math.trunc(Number(target.dataset.level) || 1), 1), 5));
}

async function onNemicoDominio(event, target) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  const sfera = String(target.dataset.sfera ?? "");
  if (!SPHERES.includes(sfera)) return;
  const domini = bandiera(this).magick?.domini ?? {};
  if (domini[sfera]) await togli(this, "magick.domini", sfera);
  else await scrivi(this, `magick.domini.${sfera}`, true);
}

async function onNemicoTipoMagick(event, target) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  const tipo = String(target.dataset.tipo ?? "");
  if (TIPI_MAGICK.includes(tipo)) await scrivi(this, "magick.tipo", tipo);
}

async function onNemicoCassetto(event, target) {
  event.preventDefault();
  const id = String(target.dataset.cassetto ?? "");
  this._stato.cassetto = this._stato.cassetto === id ? "" : id;
  await this.render({ parts: ["magick"] });
}

/** Dal Grimorio: la Formula com'è, con la soglia base e i suoi Ambiti; la resistenza resta da scrivere. */
async function onNemicoFormula(event, target) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  const effetto = effettoDaFormula(findFormula(String(target.dataset.formula ?? "")), { indice: Number(target.dataset.indice) || 0 });
  if (!effetto) return;
  const id = nuovoId(this, bandiera(this).magick?.effetti);
  await scrivi(this, `magick.effetti.${id}`, { ...effetto, sort: Date.now() });
}

async function onNemicoLente(event, target) {
  event.preventDefault();
  const scope = String(target.dataset.scope ?? "");
  this._stato.mano.lenti ??= {};
  this._stato.mano.lenti[scope] = this._stato.mano.lenti[scope] ? 0 : 1;
  await this.render({ parts: ["magick"] });
}

async function onNemicoAmbito(event, target) {
  event.preventDefault();
  const scope = String(target.dataset.scope ?? "");
  const level = Math.max(Math.trunc(Number(target.dataset.level) || 0), 0);
  this._stato.mano.livelli ??= {};
  const attuale = Math.trunc(Number(this._stato.mano.livelli[scope]) || 0);
  const nuovo = attuale === level ? 0 : level;
  if (!puoAlzare(this._stato.mano.livelli, scope, nuovo)) {
    ui.notifications.warn(localize("WOD5E_MAGE.Nemico.TettoAmbiti"));
    return;
  }
  this._stato.mano.livelli[scope] = nuovo;
  await this.render({ parts: ["magick"] });
}

async function onNemicoManoScelta(event, target) {
  event.preventDefault();
  const campo = String(target.dataset.campo ?? "");
  if (!["dominio", "come"].includes(campo)) return;
  this._stato.mano[campo] = String(target.dataset.value ?? "");
  await this.render({ parts: ["magick"] });
}

/** «Aggiungi» del cassetto a mano: l'effetto coi suoi Ambiti e la soglia sommata. */
async function onNemicoManoAggiungi(event) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  const mano = this._stato.mano;
  const conto = sogliaDagliAmbiti(mano.livelli ?? {}, { impossibile: Boolean(mano.impossibile) });
  const ambiti = Object.fromEntries(conto.ambiti.map((entry) => [entry.id, entry.level]));
  const id = nuovoId(this, bandiera(this).magick?.effetti);
  await scrivi(this, `magick.effetti.${id}`, {
    nome: String(mano.nome ?? "").trim() || localize("WOD5E_MAGE.Nemico.EffettoNuovo"),
    breve: String(mano.cosa ?? "").trim(),
    testo: "",
    resiste: { attribute: String(mano.attribute ?? ""), skill: String(mano.skill ?? ""), testo: String(mano.resisteTesto ?? "").trim() },
    dominio: String(mano.dominio ?? ""),
    come: mano.come === "volgare" ? "volgare" : "accidentale",
    da: "mano",
    formula: "",
    ambiti,
    soglia: conto.soglia,
    impossibile: Boolean(mano.impossibile),
    lentePotenza: (mano.lenti ?? {}).potency ? "peso" : "danni",
    sort: Date.now()
  });
  this._stato.mano = {};
  this._stato.cassetto = "";
}

async function onNemicoMagickApri(event, target) {
  event.preventDefault();
  const id = String(target.dataset.effetto ?? "");
  if (this._stato.aperte.has(id)) this._stato.aperte.delete(id); else this._stato.aperte.add(id);
  await this.render({ parts: ["magick"] });
}

async function onNemicoMagickTogli(event, target) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  const id = String(target.dataset.effetto ?? "");
  this._stato.aperte.delete(id);
  await togli(this, "magick.effetti", id);
}

async function onNemicoLancia(event, target) {
  event.preventDefault();
  const effetto = this.contesto().magick.effetti.find((row) => row.id === target.dataset.effetto);
  if (!effetto) return;
  await lanciaNemico(this.actor, effetto);
}

/** «Dai a un PG»: l'oggetto si crea sul personaggio scelto e si toglie dal nemico. */
async function onNemicoDai(event, target) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  const item = this.actor.items.get(String(target.dataset.itemId ?? ""));
  if (!item) return;
  const personaggi = game.actors.filter((actor) => actor.hasPlayerOwner && actor.id !== this.actor.id && actor.type !== "spc").map((actor) => ({ id: actor.id, name: actor.name }));
  if (!personaggi.length) {
    ui.notifications.warn(localize("WOD5E_MAGE.Nemico.DaiNessuno"));
    return;
  }
  const content = await foundry.applications.handlebars.renderTemplate(`modules/${MODULE_ID}/templates/dialogs/nemico-dai.hbs`, { personaggi });
  const result = await foundry.applications.api.DialogV2.input({
    window: { title: format("WOD5E_MAGE.Nemico.DaiTitolo", { nome: item.name }) },
    content,
    ok: { icon: "fas fa-hand-holding", label: localize("WOD5E_MAGE.Nemico.Dai") },
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-roll-dialog"],
    position: { width: 380, height: "auto" }
  });
  if (!result || result === "cancel") return;
  const pg = game.actors.get(String(result.pg ?? ""));
  if (!pg) return;
  const data = item.toObject();
  delete data._id;
  await Item.create(data, { parent: pg });
  await item.delete();
  ui.notifications.info(format("WOD5E_MAGE.Nemico.Dato", { nome: item.name, pg: pg.name }));
}

async function onTemaToggle(event) {
  event.preventDefault();
  await game.settings.set(MODULE_ID, TEMA_SETTING, altroTema(game.settings.get(MODULE_ID, TEMA_SETTING)));
}

async function onScalaToggle(event) {
  event.preventDefault();
  const current = game.settings.get(MODULE_ID, SCALA_SETTING);
  const next = altraScala(current);
  await game.settings.set(MODULE_ID, SCALA_SETTING, next);
  const { width, height } = this.position ?? {};
  if (Number.isFinite(width) && Number.isFinite(height)) {
    const ratio = scalaFattore(next) / scalaFattore(current);
    this.setPosition({
      width: Math.min(Math.round(width * ratio), Math.max(window.innerWidth - 40, 600)),
      height: Math.min(Math.round(height * ratio), Math.max(window.innerHeight - 40, 400))
    });
  }
}

/* ------------------------------------------------------------- la scheda */

export class NemicoSheet extends SPCActorSheet {
  /** Le schede del modulo cambiano vestito e misura insieme (tema.js): questo segno le riconosce. */
  static SCHEDA_DEL_MODULO = true;

  static DEFAULT_OPTIONS = {
    classes: ["wod5e-mage", "wod5e-mage-nemico"],
    position: { width: MISURA_NEMICO.width, height: MISURA_NEMICO.height },
    actions: {
      ritrattoCambia: onRitrattoCambia,
      saluteCellChange: { handler: onSaluteCellChange, buttons: [0, 2] },
      saluteDanni: onSaluteDanni,
      saluteRiposo: onSaluteRiposo,
      saluteReset: onSaluteReset,
      ventaglioToggle: onVentaglioToggle,
      ventaglioChiudi: onVentaglioChiudi,
      armaturaColpo: onArmaturaColpo,
      armaturaPunto: onArmaturaPunto,
      condizioneToggle: onCondizioneToggle,
      archivioOpen: onArchivioOpen,
      createItem: onGuidedItemCreate,
      itemEdit: onGuidedItemEdit,
      magickAccendi: onMagickAccendi,
      magickSpegni: onMagickSpegni,
      nemicoTira: onNemicoTira,
      nemicoAzioneTira: onNemicoAzioneTira,
      nemicoAzioneUsa: onNemicoAzioneUsa,
      nemicoAzioneApri: onNemicoAzioneApri,
      nemicoAzioneNuova: onNemicoAzioneNuova,
      nemicoAzioneTogli: onNemicoAzioneTogli,
      nemicoCasoNuovo: onNemicoCasoNuovo,
      nemicoCasoTogli: onNemicoCasoTogli,
      nemicoEffettoNuovo: onNemicoEffettoNuovo,
      nemicoEffettoCatalogo: onNemicoEffettoCatalogo,
      nemicoEffettoTogli: onNemicoEffettoTogli,
      nemicoArete: onNemicoArete,
      nemicoDominio: onNemicoDominio,
      nemicoTipoMagick: onNemicoTipoMagick,
      nemicoCassetto: onNemicoCassetto,
      nemicoFormula: onNemicoFormula,
      nemicoLente: onNemicoLente,
      nemicoAmbito: onNemicoAmbito,
      nemicoManoScelta: onNemicoManoScelta,
      nemicoManoAggiungi: onNemicoManoAggiungi,
      nemicoMagickApri: onNemicoMagickApri,
      nemicoMagickTogli: onNemicoMagickTogli,
      nemicoLancia: onNemicoLancia,
      nemicoDai: onNemicoDai,
      [TEMA_AZIONE]: onTemaToggle,
      [SCALA_AZIONE]: onScalaToggle
    }
  };

  static PARTS = {
    testa: { template: `${NEMICO}/testa.hbs` },
    gioco: { template: `${NEMICO}/gioco.hbs` },
    magick: { template: `${NEMICO}/magick.hbs` },
    oggetti: { template: `${NEMICO}/oggetti.hbs` },
    note: { template: `${NEMICO}/note.hbs` },
    limited: { template: `${NEMICO}/limitata.hbs` }
  };

  tabGroups = { primary: "gioco" };

  constructor(options = {}) {
    super(options);
    // La memoria della scheda: le righe aperte, il cassetto della Magick, il modulo a mano, la tendina delle Condizioni.
    this._stato = { aperte: new Set(), cassetto: "", cerca: "", mano: {}, tendina: false };
    this.tabs = NemicoSheet.linguette(false);
  }

  /** Le pagine: In gioco, Magick (nascosta senza Magick), Oggetti, Note. */
  static linguette(magick) {
    return {
      gioco: { id: "gioco", group: "primary", title: "WOD5E_MAGE.Nemico.Pagine.gioco" },
      magick: { id: "magick", group: "primary", title: "WOD5E_MAGE.Nemico.Pagine.magick", hidden: !magick },
      oggetti: { id: "oggetti", group: "primary", title: "WOD5E_MAGE.Nemico.Pagine.oggetti" },
      note: { id: "note", group: "primary", title: "WOD5E_MAGE.Nemico.Pagine.note" }
    };
  }

  get title() {
    const tokenPrefix = this.actor.isToken ? "[Token] " : "";
    return `${tokenPrefix}${localize("WOD5E_MAGE.Nemico.Sheet")}: ${this.actor.name}`;
  }

  /** La finestra parte della misura che sta nello schermo, dalla sua misura naturale. */
  _initializeApplicationOptions(options) {
    const applicationOptions = super._initializeApplicationOptions(options);
    try {
      const misura = misuraFinestra(game.settings.get(MODULE_ID, SCALA_SETTING), window, MISURA_NEMICO);
      applicationOptions.position = { ...(applicationOptions.position ?? {}), ...misura };
    } catch (error) {
      console.warn("wod5e-mage | Misura della scheda del nemico non calcolata: resta quella di default.", error);
    }
    return applicationOptions;
  }

  /** I tre tasti in testata (creazione a parte): la misura del testo e il tema, come sulla scheda del mago. */
  async _renderFrame(options) {
    const frame = await super._renderFrame(options);
    const anchor = this.window?.controls ?? this.window?.close
      ?? frame.querySelector("button[data-action=toggleControls]") ?? frame.querySelector("button[data-action=close]");
    if (anchor && !frame.querySelector(`.${TEMA_TASTO_CLASSE}`)) {
      const scala = document.createElement("button");
      scala.type = "button";
      scala.classList.add("header-control", "icon", "fa-solid", "fa-text-height", SCALA_TASTO_CLASSE);
      scala.dataset.action = SCALA_AZIONE;
      const tema = document.createElement("button");
      tema.type = "button";
      tema.classList.add("header-control", "icon", "fa-solid", TEMA_TASTO_CLASSE);
      tema.dataset.action = TEMA_AZIONE;
      anchor.before(scala, tema);
    }
    return frame;
  }

  /** Il contesto puro della scheda (nemico.js), dai dati dell'attore e dalla memoria della scheda. */
  contesto() {
    let nomi = {};
    try {
      nomi = globalThis.WOD5E?.Skills?.getList?.({}) ?? {};
    } catch (_error) {
      nomi = {};
    }
    const items = this.actor.items.contents;
    return prepareNemicoContext({
      actor: this.actor,
      items,
      salute: getSalute(this.actor),
      stato: this._stato,
      nomi,
      condizioniScelta: prepareCondizioni(this.actor.items),
      localize,
      format,
      lang: game.i18n.lang
    });
  }

  async _prepareContext(options) {
    const magickOn = Boolean(bandiera(this).magick?.on);
    this.tabs = NemicoSheet.linguette(magickOn);
    if (!magickOn && this.tabGroups.primary === "magick") this.tabGroups.primary = "gioco";
    const context = await super._prepareContext(options);
    const ctx = this.contesto();
    // La biografia è HTML del sistema: arricchita per l'editor con la matita (come le note del Credo).
    const enrich = globalThis.foundry?.applications?.ux?.TextEditor?.implementation?.enrichHTML;
    const biografiaArricchita = enrich ? await enrich(ctx.biografia ?? "", { secrets: this.actor.isOwner, relativeTo: this.actor }) : ctx.biografia ?? "";
    return { ...context, ...ctx, biografiaArricchita, tabAttiva: this.tabGroups.primary, isGM: Boolean(game.user?.isGM) };
  }

  async _preparePartContext(partId, context, options) {
    context = { ...(await super._preparePartContext(partId, context, options)) };
    context.tab = context.tabs?.[partId] ?? { id: partId, group: "primary", cssClass: this.tabGroups.primary === partId ? "active" : "" };
    return context;
  }

  _onRender(context, options) {
    super._onRender(context, options);
    const element = this.element;
    if (!element) return;
    applicaTema(element, game.settings.get(MODULE_ID, TEMA_SETTING), { localize });
    applicaScala(element, game.settings.get(MODULE_ID, SCALA_SETTING), { localize, format, viewport: window });
    for (const id of DISPOSIZIONI) element.classList.toggle(`wod5e-mage-nemico-${id}`, context.disposizione?.id === id);
    // La ruota della Salute: si chiude com'è sul mago, con un clic fuori o con Esc.
    chiudiRuote(this);
    wireCassetti(this);
    // Il modulo a mano: i campi senza `name` restano nella memoria della scheda.
    for (const input of element.querySelectorAll("[data-mano]")) {
      input.addEventListener("change", () => {
        const key = input.dataset.mano;
        this._stato.mano[key] = input.type === "checkbox" ? input.checked : input.value;
        if (key === "impossibile") this.render({ parts: ["magick"] });
      });
    }
    // La cerca del Grimorio filtra sul posto, e sopravvive ai render.
    const cerca = element.querySelector("[data-nemico-cerca]");
    if (cerca) {
      const lista = element.querySelector("[data-nemico-lista=grimorio]");
      const filtra = () => {
        const needle = String(cerca.value ?? "").trim().toLowerCase();
        let viste = 0;
        for (const riga of lista?.querySelectorAll("[data-search]") ?? []) {
          const ok = !needle || String(riga.dataset.search ?? "").toLowerCase().includes(needle);
          riga.hidden = !ok;
          if (ok) viste += 1;
        }
        const nessuna = lista?.querySelector("[data-nemico-nessuna]");
        if (nessuna) nessuna.hidden = viste > 0 || !lista.querySelector("[data-search]");
      };
      cerca.addEventListener("input", () => {
        this._stato.cerca = cerca.value;
        filtra();
      });
      filtra();
    }
    // La tendina delle Condizioni ricorda com'era.
    const tendina = element.querySelector(".wod5e-mage-nemico-condizioni-tendina");
    if (tendina) {
      tendina.open = Boolean(this._stato.tendina);
      tendina.addEventListener("toggle", () => { this._stato.tendina = tendina.open; });
    }
  }
}
