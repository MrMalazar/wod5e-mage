/**
 * La scheda del nemico (Blue, 25/9; rifatta l'1/10 sul mock
 * docs/mock_scheda_nemico_1-10.html): una scheda in più per gli attori `spc`
 * del sistema, «Scheda del nemico (M6)». La testata resta sempre (chi è,
 * Salute, Armatura, Condizioni); sotto tre pagine: In gioco, Oggetti, Note.
 * La Magick non ha più una pagina sua: sta nel blocco della Natura, dentro In
 * gioco. I conti e i contesti stanno in nemico.js (funzioni pure), le carte in
 * chat in nemico-chat.js; qui la finestra, le azioni e la memoria della scheda
 * (le righe aperte, il cassetto, il modulo a mano).
 *
 * Due modi, col tasto in testata: in Gioca cambia lo stato (Salute, armatura,
 * Condizioni, mano del Narratore, tiri) e la scheda resta com'è; in Scrivi
 * cambia la scheda. Il modo è una bandiera del modulo (flags.wod5e-mage.
 * nemico.modo), non il lucchetto del sistema, che fermerebbe anche l'armatura.
 *
 * I dati nuovi stanno in flags.wod5e-mage.nemico; i campi col `name` si
 * salvano da soli al cambio, col form del sistema. Estende la scheda spc del
 * sistema: da lì arrivano il trascinamento degli oggetti e la vista limitata.
 */
import { SPCActorSheet } from "/systems/wod5e/system/actor/spc-actor-sheet.js";
import { onArchivioOpen } from "../archivi.js";
import { onCondizioneToggle, prepareCondizioni } from "../condizioni.js";
import { MODULE_ID } from "../constants.js";
import { openCatalogoPerNemico } from "../catalogo-poteri.js";
import { POTERI } from "../data/poteri.js";
import { findFormula } from "../grimorio.js";
import { CAMPI, datiNemico, effettoDaFormula, effettoDaPotere, idNuovo, malusCondizioni, manoDelNarratore, MODI, modoDelNemico, NEMICO_FLAG, numeroDelCampo, partiDelPotere, prepareNemicoContext, puoAlzare, riservaDellAzione, riservaScalata, sogliaDagliAmbiti } from "../nemico.js";
import { lanciaNemico, tiraNemico } from "../nemico-chat.js";
import { onGuidedItemCreate, onGuidedItemEdit } from "../oggetti-guidati.js";
import { modDelMondo, POTERI_MOD_SETTING } from "../poteri-mod.js";
import { getSalute, onSaluteCellChange, onSaluteDanni, onSaluteReset, onSaluteRiposo } from "../salute.js";
import { scopeLensIds } from "../scopes.js";
import { SPHERES } from "../spheres.js";
import { altraScala, altroTema, applicaScala, applicaTema, misuraFinestra, SCALA_AZIONE, SCALA_SETTING, SCALA_TASTO_CLASSE, scalaFattore, TEMA_AZIONE, TEMA_SETTING, TEMA_TASTO_CLASSE } from "../tema.js";
import { chiudiRuote, onVentaglioChiudi, onVentaglioToggle, wireCassetti } from "./mage-actor-sheet.js";

const NEMICO = `modules/${MODULE_ID}/templates/nemico`;

/** La misura naturale della finestra (il mock dell'1/10): si adatta allo schermo come la scheda del mago. */
export const MISURA_NEMICO = Object.freeze({ width: 960, height: 770 });

const DISPOSIZIONI = ["ostile", "neutrale", "amichevole", "segreto"];

/**
 * Le classi con cui il sistema veste la finestra secondo la linea dell'attore
 * (spc-actor-sheet.js, _onRender: da `system.gamesystem`, cioè dallo spcType).
 * Ognuna porta i suoi colori: l'alone intorno alla finestra e le barre di
 * scorrimento, rosse per il vampiro, arancioni per il cacciatore, marroni per
 * il licantropo.
 */
const LINEE_DEL_SISTEMA = Object.freeze(["vampire", "werewolf", "hunter"]);

/**
 * La cornice del nemico è una per tutte le Nature (1.33.2): quella dei mortali,
 * che la scheda ha sempre avuto. Da quando un PNG di M6 nasce col suo spcType
 * il sistema la colorerebbe con la linea; qui la differenza fra le Nature la fa
 * il blocco sotto le Azioni, non il vestito della finestra.
 */
export function corniceDelNemico(classList) {
  classList.remove(...LINEE_DEL_SISTEMA);
  classList.add("mortal");
}

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

/** Chi può cambiare la scheda: chi la possiede. Il lucchetto del sistema qui non conta (1/10): c'è il modo, Gioca o Scrivi. */
function puoScrivere(sheet) {
  const actor = sheet.actor;
  if (actor.isOwner) return true;
  ui.notifications.warn(format("WOD5E.Notifications.NoSufficientPermission", { string: actor.name }));
  return false;
}

function bandiera(sheet) {
  return sheet.actor.getFlag(MODULE_ID, NEMICO_FLAG) ?? {};
}

function nuovoId(sheet, tavola) {
  return idNuovo(tavola ?? {}, () => foundry.utils.randomID());
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

/** «Togli la Magick» a un nemico che l'aveva accesa col vecchio tasto e ha un'altra Natura: gli effetti restano scritti. */
async function onMagickSpegni(event) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  this._stato.cassetto = "";
  await scrivi(this, "magick.on", false);
}

/** Il tasto dei due modi: Gioca o Scrivi. Toglie anche il lucchetto del sistema, che qui non serve e fermerebbe l'armatura. */
async function onNemicoModo(event, target) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  const modo = String(target.dataset.modo ?? "");
  // Il modo di adesso non si riscrive: niente cambia, e le righe aperte restano aperte.
  if (!MODI.includes(modo) || modo === this.modoAttuale()) return;
  // Uscendo da Scrivi le righe aperte per riscriverle si richiudono, e il cassetto pure.
  this._stato.aperte.clear();
  this._stato.cassetto = "";
  const update = { [radice("modo")]: modo };
  if (this.actor.system?.locked) update["system.locked"] = false;
  await this.actor.update(update);
}

/** La mano del Narratore: meno e più, fra −10 e +10. */
async function onNemicoMano(event, target) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  const delta = Math.trunc(Number(target.dataset.delta) || 0);
  const attuale = datiNemico(bandiera(this)).manoNarratore;
  const nuovo = Math.max(Math.min(attuale + delta, 10), -10);
  if (nuovo !== attuale) await scrivi(this, "manoNarratore", nuovo);
}

/** Un punto dell'armatura: il conto va dove dice il punto cliccato (nemico.js, puntiAlClic). */
async function onNemicoArmatura(event, target) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  const item = this.actor.items.get(String(target.dataset.itemId ?? ""));
  if (!item || item.type !== "armor") return;
  const attuali = Math.max(Math.trunc(Number(item.system?.armorvalue)) || 0, 0);
  const punti = Math.max(Math.trunc(Number(target.dataset.punti) || 0), 0);
  if (punti === attuali) return;
  const update = { "system.armorvalue": punti };
  // Un'armatura che non ricorda il suo pieno lo prende dal punteggio di prima.
  const pieno = Math.trunc(Number(item.flags?.[MODULE_ID]?.armaturaPiena) || 0);
  if (pieno <= 0) update[`flags.${MODULE_ID}.armaturaPiena`] = Math.max(attuali, punti);
  await item.update(update);
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
  const id = String(target.dataset.caso ?? "");
  // Un caso a dadi del sistema (una riserva eccezionale accesa) non si cancella: si spegne.
  if (id.startsWith("skill:")) await this.actor.update({ [`system.exceptionaldicepools.${id.slice(6)}.active`]: false });
  else await togli(this, "casi", id);
}

/** La pastiglia di un effetto o di un potere: il clic apre il testo sotto (in Scrivi, i campi), un altro lo richiude. */
async function onNemicoEffettoApri(event, target) {
  event.preventDefault();
  const chiave = `effetto:${String(target.dataset.effetto ?? "")}`;
  if (this._stato.aperte.has(chiave)) this._stato.aperte.delete(chiave); else this._stato.aperte.add(chiave);
  await this.render({ parts: ["gioco"] });
}

async function onNemicoEffettoNuovo(event) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  const id = nuovoId(this, bandiera(this).effetti);
  this._stato.aperte.add(`effetto:${id}`);
  await scrivi(this, `effetti.${id}`, { nome: localize("WOD5E_MAGE.Nemico.EffettoNuovo"), testo: "", tipo: "passivo", catalogo: "", sort: Date.now() });
}

async function onNemicoEffettoTogli(event, target) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  const id = String(target.dataset.effetto ?? "");
  this._stato.aperte.delete(`effetto:${id}`);
  await togli(this, "effetti", id);
}

/**
 * «Potere»: il catalogo dei poteri del manuale, lo stesso della scheda del mago,
 * Sfera per Sfera e in ordine di grado; «Aggiungi» mette il potere sul nemico
 * (senza prerequisiti né prezzo: lo decide il Narratore) e la finestra resta
 * aperta. Sulla scheda la riga porta la chiave del catalogo: il testo si legge
 * dal catalogo di adesso.
 */
async function onNemicoEffettoCatalogo(event) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  const sheet = this;
  const presi = Object.values(bandiera(this).effetti ?? {}).map((row) => String(row?.catalogo ?? "")).filter(Boolean).map((catalogId) => ({ catalogId, sphere: "" }));
  await openCatalogoPerNemico({
    owned: presi,
    titolo: format("WOD5E_MAGE.Nemico.CatalogoTitoloDi", { nome: this.actor.name }),
    onAdd: async (catalogId) => {
      const entry = POTERI.find((power) => power.id === catalogId);
      const effetti = bandiera(sheet).effetti ?? {};
      if (!entry || Object.values(effetti).some((row) => row?.catalogo === catalogId)) return false;
      const id = nuovoId(sheet, effetti);
      await scrivi(sheet, `effetti.${id}`, effettoDaPotere(entry, { sort: Date.now() }));
      return true;
    }
  });
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

/** «Effetto di Magick»: apre il cassetto (dal Grimorio, la prima volta) e un altro clic lo richiude. */
async function onNemicoCassetto(event, target) {
  event.preventDefault();
  const id = String(target.dataset.cassetto ?? "");
  this._stato.cassetto = this._stato.cassetto === id ? "" : id;
  await this.render({ parts: ["gioco"] });
}

/** Le due strade del cassetto: dal Grimorio o a mano. */
async function onNemicoCassettoVia(event, target) {
  event.preventDefault();
  const id = String(target.dataset.cassetto ?? "");
  if (!["grimorio", "mano"].includes(id) || this._stato.cassetto === id) return;
  this._stato.cassetto = id;
  await this.render({ parts: ["gioco"] });
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
  // La lente dopo, in giro fra le due o tre dell'Ambito (29/9: Potenza,
  // Condizioni e Precisione ne hanno tre).
  const quante = Math.max(scopeLensIds(scope).length, 1);
  this._stato.mano.lenti[scope] = ((Math.trunc(Number(this._stato.mano.lenti[scope]) || 0)) + 1) % quante;
  await this.render({ parts: ["gioco"] });
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
  await this.render({ parts: ["gioco"] });
}

async function onNemicoManoScelta(event, target) {
  event.preventDefault();
  const campo = String(target.dataset.campo ?? "");
  if (!["dominio", "come"].includes(campo)) return;
  this._stato.mano[campo] = String(target.dataset.value ?? "");
  await this.render({ parts: ["gioco"] });
}

/** «Aggiungi» del cassetto a mano: l'effetto coi suoi Ambiti e la soglia sommata. */
async function onNemicoManoAggiungi(event) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  const mano = this._stato.mano;
  const conto = sogliaDagliAmbiti(mano.livelli ?? {});
  const ambiti = Object.fromEntries(conto.ambiti.map((entry) => [entry.id, entry.level]));
  const id = nuovoId(this, bandiera(this).magick?.effetti);
  // Il cassetto si chiude e si svuota prima di scrivere: il ridisegno che segue lo trova già chiuso.
  this._stato.mano = {};
  this._stato.cassetto = "";
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
    lentePotenza: ["danni", "peso", "influenza"][Math.min(Math.trunc(Number((mano.lenti ?? {}).potency) || 0), 2)],
    sort: Date.now()
  });
}

async function onNemicoMagickApri(event, target) {
  event.preventDefault();
  const id = String(target.dataset.effetto ?? "");
  if (this._stato.aperte.has(id)) this._stato.aperte.delete(id); else this._stato.aperte.add(id);
  await this.render({ parts: ["gioco"] });
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

/**
 * «Dal compendio»: l'archivio dell'equipaggiamento, come sul mago. L'archivio
 * non aggiunge niente a un attore chiuso col lucchetto del sistema, e la scheda
 * del nemico quel lucchetto non lo mostra: se c'è, si toglie prima di aprire.
 */
async function onNemicoArchivio(event, target) {
  event.preventDefault();
  if (!puoScrivere(this)) return;
  if (this.actor.system?.locked) await this.actor.update({ "system.locked": false });
  await onArchivioOpen.call(this, event, target);
}

/** «Dai a un PG»: l'oggetto si crea sul personaggio scelto e si toglie dal nemico. Si fa in tutti e due i modi. */
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

  /** La sua misura a scala 1: chi riscala tutte le schede aperte (tema.js, la scheda del mago) usa questa. */
  static MISURA_NATURALE = MISURA_NEMICO;

  static DEFAULT_OPTIONS = {
    classes: ["wod5e-mage", "wod5e-mage-nemico"],
    position: { width: MISURA_NEMICO.width, height: MISURA_NEMICO.height },
    form: { handler: NemicoSheet.onSubmitNemicoForm },
    actions: {
      ritrattoCambia: onRitrattoCambia,
      saluteCellChange: { handler: onSaluteCellChange, buttons: [0, 2] },
      saluteDanni: onSaluteDanni,
      saluteRiposo: onSaluteRiposo,
      saluteReset: onSaluteReset,
      ventaglioToggle: onVentaglioToggle,
      ventaglioChiudi: onVentaglioChiudi,
      condizioneToggle: onCondizioneToggle,
      archivioOpen: onNemicoArchivio,
      createItem: onGuidedItemCreate,
      itemEdit: onGuidedItemEdit,
      magickSpegni: onMagickSpegni,
      nemicoModo: onNemicoModo,
      nemicoMano: onNemicoMano,
      nemicoArmatura: onNemicoArmatura,
      nemicoTira: onNemicoTira,
      nemicoAzioneTira: onNemicoAzioneTira,
      nemicoAzioneUsa: onNemicoAzioneUsa,
      nemicoAzioneApri: onNemicoAzioneApri,
      nemicoAzioneNuova: onNemicoAzioneNuova,
      nemicoAzioneTogli: onNemicoAzioneTogli,
      nemicoCasoNuovo: onNemicoCasoNuovo,
      nemicoCasoTogli: onNemicoCasoTogli,
      nemicoEffettoApri: onNemicoEffettoApri,
      nemicoEffettoNuovo: onNemicoEffettoNuovo,
      nemicoEffettoCatalogo: onNemicoEffettoCatalogo,
      nemicoEffettoTogli: onNemicoEffettoTogli,
      nemicoDominio: onNemicoDominio,
      nemicoCassetto: onNemicoCassetto,
      nemicoCassettoVia: onNemicoCassettoVia,
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
    oggetti: { template: `${NEMICO}/oggetti.hbs` },
    note: { template: `${NEMICO}/note.hbs` },
    limited: { template: `${NEMICO}/limitata.hbs` }
  };

  /** Le pagine: In gioco, Oggetti, Note. La Magick sta nel blocco della Natura, dentro In gioco. */
  static LINGUETTE = Object.freeze({
    gioco: Object.freeze({ id: "gioco", group: "primary", title: "WOD5E_MAGE.Nemico.Pagine.gioco" }),
    oggetti: Object.freeze({ id: "oggetti", group: "primary", title: "WOD5E_MAGE.Nemico.Pagine.oggetti" }),
    note: Object.freeze({ id: "note", group: "primary", title: "WOD5E_MAGE.Nemico.Pagine.note" })
  });

  /**
   * Le linguette di una finestra, ogni volta oggetti nuovi (1.33.2): il sistema
   * ci scrive sopra quale è accesa (getTabs), e con gli stessi oggetti per
   * tutte le schede due nemici aperti insieme si scambiavano la pagina.
   */
  static linguette() {
    return Object.fromEntries(Object.entries(NemicoSheet.LINGUETTE).map(([id, linguetta]) => [id, { ...linguetta }]));
  }

  tabGroups = { primary: "gioco" };

  constructor(options = {}) {
    super(options);
    // La memoria della scheda: le righe aperte, il cassetto della Magick, il modulo a mano, la tendina delle Condizioni.
    // `modo` è quello con cui la finestra si è aperta, finché nessuno ne sceglie uno col tasto (modoAttuale).
    this._stato = { aperte: new Set(), cassetto: "", cerca: "", mano: {}, tendina: false, modo: "" };
    this.tabs = NemicoSheet.linguette();
  }

  get title() {
    const tokenPrefix = this.actor.isToken ? "[Token] " : "";
    return `${tokenPrefix}${localize("WOD5E_MAGE.Nemico.Sheet")}: ${this.actor.name}`;
  }

  /**
   * Il form del sistema, con un riguardo per i numeri: il campo svuotato o
   * fuori misura si riporta al suo minimo e al suo massimo prima di salvare.
   */
  static async onSubmitNemicoForm(event, form, formData) {
    const target = event?.target;
    if (target?.tagName === "INPUT" && target.type === "number") {
      target.value = String(numeroDelCampo(target.value, { min: target.min, max: target.max }));
    }
    return SPCActorSheet.onSubmitActorForm.call(this, event, form, formData);
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

  /** Il token di questa scheda, se la scheda è di un token (anche di un attore non collegato). */
  get tokenDellaScheda() {
    return this.token ?? this.actor?.token ?? null;
  }

  /**
   * Il modo che la finestra mostra adesso. Finché nessuno l'ha scelto col
   * tasto, la finestra tiene quello con cui si è aperta: un nemico appena
   * creato resta in Scrivi anche quando la prima soglia lo rende «scritto»
   * (1.33.2). Alla chiusura la memoria si svuota: riaperto, un nemico scritto
   * si apre in Gioca.
   */
  modoAttuale() {
    const dati = datiNemico(bandiera(this));
    const puo = Boolean(this.actor.isOwner);
    if (puo && !dati.modo && !this._stato.modo) this._stato.modo = modoDelNemico(dati);
    return modoDelNemico(dati, { puoScrivere: puo, aperto: this._stato.modo });
  }

  _onClose(options) {
    super._onClose?.(options);
    this._stato.modo = "";
  }

  /** Il contesto puro della scheda (nemico.js), dai dati dell'attore e dalla memoria della scheda. */
  contesto() {
    // Fissa il modo di questa apertura prima di preparare il contesto, che lo legge dalla memoria.
    this.modoAttuale();
    let nomi = {};
    try {
      nomi = globalThis.WOD5E?.Skills?.getList?.({}) ?? {};
    } catch (_error) {
      nomi = {};
    }
    let mods = {};
    try {
      mods = game.settings.get(MODULE_ID, POTERI_MOD_SETTING) ?? {};
    } catch (_error) {
      mods = {};
    }
    const items = this.actor.items.contents;
    return prepareNemicoContext({
      actor: this.actor,
      items,
      salute: getSalute(this.actor),
      stato: this._stato,
      nomi,
      condizioniScelta: prepareCondizioni(this.actor.items),
      // Scrive chi possiede la scheda; gli altri la vedono sempre in Gioca.
      puoScrivere: this.actor.isOwner,
      // La disposizione del token della scheda; senza token, quella del prototipo.
      disposizione: this.tokenDellaScheda?.disposition ?? null,
      // I poteri del manuale si leggono dal catalogo, con la modifica del Narratore che vale per tutti.
      potere: (id) => partiDelPotere(id, { mod: modDelMondo(id, mods), localize }),
      localize,
      format,
      lang: game.i18n.lang
    });
  }

  async _prepareContext(options) {
    this.tabs = NemicoSheet.linguette();
    if (!Object.hasOwn(this.tabs, this.tabGroups.primary)) this.tabGroups.primary = "gioco";
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

  /** La disposizione scelta in Scrivi va sul token della scheda e sul prototipo: i token messi dopo nascono così. */
  async cambiaDisposizione(value) {
    if (!puoScrivere(this)) return;
    const disposizione = Math.trunc(Number(value));
    if (![-2, -1, 0, 1].includes(disposizione)) return;
    const token = this.tokenDellaScheda;
    if (token && token.disposition !== disposizione) await token.update({ disposition: disposizione });
    // Un attore non collegato vive nel suo token: il prototipo è dell'attore di partenza, e resta com'è.
    if (!this.actor.isToken && this.actor.prototypeToken?.disposition !== disposizione) await this.actor.update({ "prototypeToken.disposition": disposizione });
    else if (token) await this.render({ parts: ["testa"] });
  }

  _onRender(context, options) {
    super._onRender(context, options);
    const element = this.element;
    if (!element) return;
    // Il sistema ha appena messo sulla finestra la classe della linea: la cornice torna quella di sempre.
    corniceDelNemico(element.classList);
    const scala = game.settings.get(MODULE_ID, SCALA_SETTING);
    applicaTema(element, game.settings.get(MODULE_ID, TEMA_SETTING), { localize });
    // La scala del contenuto è quella della misura di questa finestra (960 × 770), non delle quattro colonne del mago.
    applicaScala(element, scala, { localize, format, viewport: window, naturale: MISURA_NEMICO });
    for (const id of DISPOSIZIONI) element.classList.toggle(`wod5e-mage-nemico-${id}`, context.disposizione?.id === id);
    // Il modo sulla finestra: in Scrivi i campi sono carta.
    element.classList.toggle("wod5e-mage-nemico-scrivi", context.modo === "scrivi");
    // La ruota della Salute: si chiude com'è sul mago, con un clic fuori o con Esc.
    chiudiRuote(this);
    wireCassetti(this);
    // Un render parziale lascia al loro posto i pezzi delle altre pagine: ogni ascolto si mette una volta sola.
    const nuovi = (selettore) => [...element.querySelectorAll(selettore)].filter((nodo) => {
      if (nodo.dataset.nemicoPronto) return false;
      nodo.dataset.nemicoPronto = "1";
      return true;
    });
    // La disposizione non è un campo dell'attore: sta sul token.
    for (const select of nuovi("[data-nemico-disposizione]")) {
      select.addEventListener("change", (event) => {
        event.stopPropagation();
        this.cambiaDisposizione(select.value);
      });
    }
    // Il modulo a mano: i campi senza `name` restano nella memoria della scheda.
    for (const input of nuovi("[data-mano]")) {
      input.addEventListener("change", (event) => {
        event.stopPropagation();
        const key = input.dataset.mano;
        this._stato.mano[key] = input.type === "checkbox" ? input.checked : input.value;
      });
    }
    // La cerca del Grimorio filtra sul posto, e sopravvive ai render.
    for (const cerca of nuovi("[data-nemico-cerca]")) {
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
      cerca.addEventListener("change", (event) => event.stopPropagation());
      filtra();
    }
    // La tendina delle Condizioni ricorda com'era.
    for (const tendina of nuovi(".wod5e-mage-nemico-condizioni-tendina")) {
      tendina.open = Boolean(this._stato.tendina);
      tendina.addEventListener("toggle", () => { this._stato.tendina = tendina.open; });
    }
  }
}
