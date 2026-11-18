/**
 * Il Quadro del Narratore (Blue, 24/9/2026, terza proposta, «montalo su
 * Foundry»): una finestra sola che cambia in tre modi con un bottone. Il
 * contatore dei punti Paradosso (la riserva, il ritmo, gli orologi, le
 * Presenze e i fatti fissati in scena); il menù del Narratore, dal 18/11/2026
 * il menù circolare per Sfere (menu-circolare-ui.js, al posto delle 65 voci a
 * cassetti); il controllo dei giocatori (un riquadro per mago con
 * lo status, gli effetti attivi del Paradosso, i passivi, la Magick in atto;
 * chi c'è lo decide il Narratore, nella Nuova sessione o trascinando un mago
 * dagli Attori sul Quadro, 25/9).
 * I conti puri stanno in menu-paradosso.js e menu-circolare.js.
 */
import { MODULE_ID } from "./constants.js";
import { BUSSOLA_SCALA_FLAG, BUSSOLA_SCENE_FLAG } from "./bussola.js";
import { activeCondizioni, findCondizione } from "./condizioni.js";
import { addQuintessenceToBalance, getMagickBalance } from "./magick-balance.js";
import { isMageActor, isNemicoActor } from "./mage-dice.js";
import { cartaMossa, chiaveTurno, FATTI_SETTING, fattoFissato, TURNO_SETTING, voceAddosso } from "./menu-circolare.js";
import { MenuCircolare } from "./menu-circolare-ui.js";
import {
  ADDOSSO_FLAG,
  addossoDopo,
  avanzaOrologio,
  contoRitmo,
  copiaDaCarta,
  copiaDaPotere,
  COPIA_FLAG,
  MAGHI_SETTING,
  MODI_QUADRO,
  POSTI,
  QUADRO_SETTING,
  recordAddosso,
  righeAddosso,
  SCENA_SETTING,
  SCENE_PARADOSSO,
  scenaById,
  svgOrologio,
  voceById
} from "./menu-paradosso.js";
import { datiNemico, NEMICO_FLAG, sogliaDagliAmbiti } from "./nemico.js";
import { prepareOngoingMagick } from "./ongoing-magick.js";
import { addPoints, getPool, LOBBY_FLAG, openSpendDialog, POOL_SETTING, premioDelDifetto, PREMIO_DIFETTO_FLAG, resetPool, setApriQuadro, spendPoints } from "./paradosso-narratore.js";
import { poteriDelPersonaggio } from "./poteri.js";
import { ROLL_CARD_FLAG } from "./roll-card.js";
import { getSalute, RICARICA_SCENA } from "./salute.js";
import { getSphereSelection } from "./spheres.js";
import { isChiaro, TEMA_CLASSE, TEMA_SETTING } from "./tema.js";

const RADICE = `modules/${MODULE_ID}/templates/quadro`;
/** Nel mondo: gli orologi del Paradosso aperti dal menù (specchiati nel modulo Orologio quando c'è). */
export const OROLOGI_SETTING = "orologiParadosso";
const OROLOGIO_MODULO = "orologio";

const ICONE_MODI = { contatore: "fa-solid fa-eye", menu: "fa-solid fa-book-open", giocatori: "fa-solid fa-users" };
const ICONE_FAMIGLIE = {
  tocchi: "fa-solid fa-hand-sparkles",
  comuni: "fa-solid fa-circle-nodes",
  scena: "fa-solid fa-clapperboard",
  scettro: "fa-solid fa-crown",
  presenze: "fa-solid fa-ghost",
  orologi: "fa-solid fa-clock",
  ancore: "fa-solid fa-anchor",
  grandi: "fa-solid fa-burst"
};
const ICONE_SCENE = {
  indagine: "fa-solid fa-magnifying-glass",
  trattativa: "fa-solid fa-handshake",
  infiltrazione: "fa-solid fa-user-secret",
  combattimento: "fa-solid fa-khanda",
  inseguimento: "fa-solid fa-person-running",
  rituale: "fa-solid fa-circle-notch",
  altrove: "fa-solid fa-door-open",
  santuario: "fa-solid fa-house",
  citta: "fa-solid fa-city"
};
/** Il fondo e il vuoto degli orologi disegnati, nel tema scuro e in quello chiaro. */
const FONDO_OROLOGI = { scuro: { sfondo: "#1b160f", vuoto: "#3a3328" }, chiaro: { sfondo: "#FBF8F0", vuoto: "#DCD6EC" } };

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/* ------------------------------------------------------------------ */
/*  Le impostazioni e i maghi del Quadro                               */
/* ------------------------------------------------------------------ */

export function getScena() {
  const stored = game.settings.get(MODULE_ID, SCENA_SETTING) ?? {};
  return {
    tipo: scenaById(stored.tipo) ? stored.tipo : "",
    posto: POSTI.includes(stored.posto) ? stored.posto : "normale",
    numero: count(stored.numero) || 1,
    // Il momento della Nuova sessione: i Volgari di prima non entrano nel menù.
    inizio: count(stored.inizio)
  };
}

async function setScena(changes) {
  return game.settings.set(MODULE_ID, SCENA_SETTING, { ...getScena(), ...changes });
}

/** I maghi che il Narratore ha messo nel Quadro, nell'ordine scelto. */
export function attoriDelQuadro() {
  const ids = game.settings.get(MODULE_ID, MAGHI_SETTING)?.ids ?? [];
  return ids.map((id) => game.actors?.get(id)).filter((actor) => actor && isMageActor(actor));
}

async function setMaghi(ids) {
  return game.settings.set(MODULE_ID, MAGHI_SETTING, { ids: [...new Set(ids.map(String))] });
}

/**
 * Un attore lasciato sul Quadro (Blue, 25/9): entra in coda ai giocatori se è
 * un mago del mondo che non c'è già. Un PNG che non è mago, un mago già
 * dentro o un attore di compendio non entrano e dicono perché (`motivo`);
 * il resto (un oggetto, un dato rotto) resta muto.
 */
export async function accogliTrascinato(data) {
  if (data?.type !== "Actor" || !data.uuid) return { ok: false, motivo: "" };
  const uuid = String(data.uuid);
  const actor = await Promise.resolve().then(() => globalThis.fromUuid?.(uuid)).catch(() => null);
  const name = String(actor?.name ?? uuid);
  if (uuid.startsWith("Compendium.") || actor?.pack) return { ok: false, motivo: "compendio", name };
  if (!actor) return { ok: false, motivo: "" };
  if (!isMageActor(actor)) return { ok: false, motivo: "nonMago", name };
  if (attoriDelQuadro().some((dentro) => dentro.id === actor.id)) return { ok: false, motivo: "giaDentro", name };
  return { ok: true, actor, name };
}

/** I dati di un trascinamento (l'attore dalla barra): il lettore di Foundry se c'è, altrimenti il JSON del dataTransfer. */
function leggiTrascinato(event) {
  const lettore = foundry.applications?.ux?.TextEditor?.implementation ?? globalThis.TextEditor;
  if (typeof lettore?.getDragEventData === "function") return lettore.getDragEventData(event);
  try {
    return JSON.parse(event?.dataTransfer?.getData?.("text/plain") || "null");
  } catch {
    return null;
  }
}

export function getOrologi() {
  const stored = game.settings.get(MODULE_ID, OROLOGI_SETTING) ?? {};
  return Object.values(stored).filter((c) => c && typeof c === "object").sort((a, b) => (a.ordine ?? 0) - (b.ordine ?? 0));
}

async function setOrologi(orologi) {
  const byId = Object.fromEntries(orologi.map((c) => [c.id, c]));
  return game.settings.set(MODULE_ID, OROLOGI_SETTING, byId);
}

function orologioModuloAttivo() {
  return Boolean(game.modules?.get(OROLOGIO_MODULO)?.active) && game.settings?.settings?.has(`${OROLOGIO_MODULO}.orologi`);
}

/** Lo specchio nel modulo Orologio di Blue: lo stesso orologio, nel suo pannello. */
async function specchiaOrologio(orologio, { elimina = false } = {}) {
  if (!orologioModuloAttivo()) return;
  try {
    const tutti = foundry.utils.deepClone(game.settings.get(OROLOGIO_MODULO, "orologi") ?? {});
    if (elimina) delete tutti[orologio.id];
    else tutti[orologio.id] = { ...(tutti[orologio.id] ?? {}), ...orologio };
    await game.settings.set(OROLOGIO_MODULO, "orologi", tutti);
  } catch (error) {
    console.warn("wod5e-mage | non riesco a scrivere nel modulo Orologio", error);
  }
}

function isActiveGM() {
  return Boolean(game.user?.isGM) && (game.users?.activeGM?.id ?? game.user.id) === game.user.id;
}

function localizer() {
  return game.i18n.localize.bind(game.i18n);
}

/* ------------------------------------------------------------------ */
/*  Lo status di un mago                                               */
/* ------------------------------------------------------------------ */

function utentiDi(actor) {
  return (game.users?.contents ?? [])
    .filter((user) => !user.isGM && actor.testUserPermission?.(user, "OWNER"))
    .map((user) => ({ name: user.name, active: Boolean(user.active) }));
}

function volonta(actor) {
  const w = actor?.system?.willpower ?? {};
  const max = count(w.max);
  const danni = count(w.superficial) + count(w.aggravated);
  return { max, resta: Math.max(max - danni, 0) };
}

export function statusMago(actor, { localize = (key) => key, aperto = false, scena = 0, riserva = null } = {}) {
  const salute = getSalute(actor);
  const balance = getMagickBalance(actor);
  const vol = volonta(actor);
  // Le Condizioni accese col grado in numeri romani (29/9): «Offuscato II», «Contuso».
  const condizioni = [...activeCondizioni(actor.items ?? []).entries()]
    .map(([id, item]) => {
      const entry = findCondizione(id);
      return entry ? `${item?.name ?? entry.name}${entry.numeral ? ` ${entry.numeral}` : ""}` : item?.name ?? id;
    });
  const attivi = righeAddosso(actor.getFlag(MODULE_ID, ADDOSSO_FLAG) ?? {}).map((riga) => ({
    ...riga,
    durataLabel: localize(`WOD5E_MAGE.Menu.Durata.${riga.durata}`),
    icona: ICONE_FAMIGLIE[riga.famiglia] ?? "fa-solid fa-bolt"
  }));
  const passivi = poteriDelPersonaggio(actor).filter((power) => power.type === "passivo").map((power) => ({ id: power.id, nome: power.name }));
  const magick = prepareOngoingMagick(actor, localize).filter((row) => row.active).map((row) => ({
    id: row.id,
    nome: row.nameSpheres || row.composition,
    vulgar: row.vulgar,
    threshold: row.threshold,
    tipo: localize(row.vulgar ? "WOD5E_MAGE.Menu.Volgare" : "WOD5E_MAGE.Menu.Accidentale")
  }));
  const utenti = utentiDi(actor);
  // Il Premio del Difetto (il Sistema): una volta per sessione, finché la riserva ha punti.
  const premioPreso = Boolean(actor.getFlag?.(MODULE_ID, PREMIO_DIFETTO_FLAG));
  const riservaVuota = riserva !== null && count(riserva) <= 0;
  return {
    id: actor.id,
    name: actor.name,
    img: actor.img,
    utenti,
    collegato: utenti.some((user) => user.active),
    salute: { resta: Math.max(salute.max - salute.total, 0), max: salute.max },
    volonta: vol,
    quintessenza: count(balance.quintessence),
    ruota: count(balance.paradox),
    condizioni,
    attivi,
    passivi,
    magick,
    aperto,
    premioDifetto: {
      preso: premioPreso,
      spento: premioPreso || riservaVuota,
      hint: localize(premioPreso ? "WOD5E_MAGE.Menu.PremioDifettoPreso" : (riservaVuota ? "WOD5E_MAGE.Menu.PremioDifettoVuota" : "WOD5E_MAGE.Menu.PremioDifettoHint"))
    },
    vuoto: !attivi.length && !passivi.length && !magick.length
  };
}

/* ------------------------------------------------------------------ */
/*  La finestra                                                        */
/* ------------------------------------------------------------------ */

export class QuadroNarratore extends HandlebarsApplicationMixin(ApplicationV2) {
  /** La finestra aperta, una sola. */
  static aperto = null;

  #maghiAperti = new Set();
  #registro = false;
  /** Il menù circolare (17-18/11/2026): lo stato resta col Quadro, il DOM si rifà quando si torna nel modo. */
  #menu = null;
  /** La grandezza della finestra prima del menù, che chiede più spazio: si rimette uscendo dal modo. */
  #primaDelMenu = null;
  /** La pagina della Nuova sessione (Blue, 27/9): prende il posto del modo in uso finché si inizia o si annulla. */
  #sessione = false;

  constructor(options = {}) {
    super({ id: "wod5e-mage-quadro", ...options });
  }

  static DEFAULT_OPTIONS = {
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-quadro"],
    window: {
      title: "WOD5E_MAGE.Menu.QuadroTitle",
      icon: "fa-solid fa-table-cells-large",
      resizable: true,
      contentClasses: ["wod5e-mage-quadro-contenuto"]
    },
    position: { width: 720, height: 840 },
    actions: {
      modo: QuadroNarratore.#onModo,
      meno: QuadroNarratore.#onMeno,
      piu: QuadroNarratore.#onPiu,
      visibile: QuadroNarratore.#onVisibile,
      azzera: QuadroNarratore.#onAzzera,
      registro: QuadroNarratore.#onRegistro,
      magickParadosso: QuadroNarratore.#onMagickParadosso,
      nuovaSessione: QuadroNarratore.#onNuovaSessione,
      sessioneInizia: QuadroNarratore.#onSessioneInizia,
      sessioneAnnulla: QuadroNarratore.#onSessioneAnnulla,
      cambioScena: QuadroNarratore.#onCambioScena,
      orologioAvanti: QuadroNarratore.#onOrologioAvanti,
      orologioChiudi: QuadroNarratore.#onOrologioChiudi,
      scardina: QuadroNarratore.#onScardina,
      mago: QuadroNarratore.#onMago,
      magoTogli: QuadroNarratore.#onMagoTogli,
      attivoTogli: QuadroNarratore.#onAttivoTogli,
      schedaApri: QuadroNarratore.#onSchedaApri,
      premioDifetto: QuadroNarratore.#onPremioDifetto
    }
  };

  static PARTS = {
    testa: { template: `${RADICE}/testa.hbs` },
    contatore: { template: `${RADICE}/contatore.hbs`, scrollable: [""] },
    menu: { template: `${RADICE}/menu.hbs` },
    giocatori: { template: `${RADICE}/giocatori.hbs`, scrollable: [""] },
    sessione: { template: `${RADICE}/sessione.hbs`, scrollable: [""] }
  };

  static get stato() {
    const stored = game.settings.get(MODULE_ID, QUADRO_SETTING) ?? {};
    return { modo: MODI_QUADRO.includes(stored.modo) ? stored.modo : "contatore" };
  }

  get modo() {
    return QuadroNarratore.stato.modo;
  }

  /** La pagina della Nuova sessione al posto del modo in uso (Blue, 27/9). */
  apriSessione() {
    this.#sessione = true;
  }

  get sessioneAperta() {
    return this.#sessione;
  }

  /** Apre il Quadro (o lo porta davanti), nel modo chiesto. */
  static async apri(modo = null) {
    if (!game.user?.isGM) return null;
    if (modo && MODI_QUADRO.includes(modo)) await game.settings.set(MODULE_ID, QUADRO_SETTING, { ...QuadroNarratore.stato, modo });
    const app = QuadroNarratore.aperto ?? new QuadroNarratore();
    QuadroNarratore.aperto = app;
    await app.render({ force: true });
    app.bringToFront?.();
    return app;
  }

  /**
   * Ridisegna il Quadro coi dati nuovi. Nel menù circolare si rifà solo la
   * testa, e il menù si aggiorna da sé: così l'anello non riparte e i campi
   * tengono il fuoco mentre arrivano la riserva, la chat e i token.
   */
  static aggiorna() {
    const app = QuadroNarratore.aperto;
    if (!app?.rendered) return;
    if (app.menuVivo) {
      app.render({ parts: ["testa"], soloTesta: true });
      app.menuCircolare.disegna();
      return;
    }
    app.render();
  }

  /** Solo il menù circolare, quando cambiano i token, il turno, i nemici in scena. */
  static aggiornaMenu() {
    const app = QuadroNarratore.aperto;
    if (app?.rendered && app.menuVivo) app.menuCircolare.disegna();
  }

  /** Il menù circolare del Quadro, creato alla prima richiesta e tenuto finché la finestra vive. */
  get menuCircolare() {
    this.#menu ??= new MenuCircolare(fonteDelQuadro());
    return this.#menu;
  }

  /** Vero quando il menù circolare è montato nella finestra. */
  get menuVivo() {
    return Boolean(this.#menu?.montato) && this.modo === "menu" && !this.#sessione;
  }

  _configureRenderOptions(options) {
    super._configureRenderOptions(options);
    // Nel menù circolare i dati nuovi rifanno solo la testa (aggiorna): il menù resta montato.
    options.soloTesta = Boolean(options.soloTesta) && this.menuVivo;
    options.parts = options.soloTesta ? ["testa"] : ["testa", this.#sessione ? "sessione" : this.modo];
  }

  /** Un modo alla volta: la PART del modo di prima esce dalla finestra quando si cambia modo. */
  _replaceHTML(result, content, options) {
    super._replaceHTML(result, content, options);
    if (options.soloTesta) return;
    for (const parte of content.querySelectorAll("[data-application-part]")) {
      if (!options.parts.includes(parte.dataset.applicationPart)) parte.remove();
    }
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const localize = localizer();
    const pool = getPool();
    const scena = getScena();
    const scenaDati = scenaById(scena.tipo);
    const modo = this.modo;
    const base = {
      gm: true,
      points: pool.points,
      visible: pool.visible,
      modi: MODI_QUADRO.map((id) => ({ id, label: localize(`WOD5E_MAGE.Menu.Modi.${id}`), icona: ICONE_MODI[id], attivo: id === modo && !this.#sessione })),
      scena: { ...scena, nome: scenaDati ? scenaDati.nome : localize("WOD5E_MAGE.Menu.NessunaScena"), icona: ICONE_SCENE[scena.tipo] ?? "fa-solid fa-clapperboard" },
      posto: scena.posto === "normale" ? "" : localize(`WOD5E_MAGE.Menu.Posti.${scena.posto}`),
      round: count(game.combat?.round),
      // Gli orologi aperti, in miniatura, in ogni modo: così si trovano sempre (Blue, 25/9).
      orologiMini: getOrologi().map((c) => ({ id: c.id, titolo: c.titolo, pieni: count(c.pieni), segmenti: count(c.segmenti), svg: svgOrologio(c, { size: 26, ...this.#fondoOrologi() }) }))
    };
    if (modo === "contatore") Object.assign(base, this.#contestoContatore(pool, scena, localize));
    if (modo === "giocatori") Object.assign(base, this.#contestoGiocatori(scena, localize));
    if (this.#sessione) Object.assign(base, this.#contestoSessione(scena, localize), { sessione: true });
    return Object.assign(context, base);
  }

  #fondoOrologi() {
    return isChiaro(game.settings.get(MODULE_ID, TEMA_SETTING)) ? FONDO_OROLOGI.chiaro : FONDO_OROLOGI.scuro;
  }

  #contestoContatore(pool, scena, localize) {
    const ritmo = contoRitmo(pool.log, { scena: scena.numero, round: count(game.combat?.round) });
    const maghi = attoriDelQuadro();
    const orologi = getOrologi().map((c) => ({
      ...c,
      svg: svgOrologio(c, { size: 48, ...this.#fondoOrologi() }),
      formaLabel: `${localize(`WOD5E_MAGE.Menu.Forme.${c.forma}`)} ${localize(`WOD5E_MAGE.Menu.Colori.${c.colore}`)}`,
      pieno: count(c.pieni) >= count(c.segmenti),
      scattaLabel: c.paradosso?.scatta ?? ""
    }));
    const presenze = [];
    const ancore = [];
    for (const actor of maghi) {
      for (const riga of righeAddosso(actor.getFlag(MODULE_ID, ADDOSSO_FLAG) ?? {})) {
        if (riga.famiglia === "presenze" || voceById(riga.voce)?.presenza) presenze.push({ ...riga, actorName: actor.name });
        if (riga.famiglia === "ancore") ancore.push({ ...riga, actorName: actor.name });
      }
    }
    const fissati = getFissati().map((f) => ({ ...f, testo: game.i18n.format("WOD5E_MAGE.MenuCircolare.Fissati.voce", { nome: f.nome, sfera: f.sferaNome || f.sfera, s: f.soglia }) }));
    const log = pool.log.slice(-12).reverse().map((entry) => ({
      ...entry,
      sign: entry.amount > 0 ? `+${entry.amount}` : String(entry.amount),
      text: testoRegistro(entry, localize)
    }));
    return {
      ritmo: {
        turno: ritmo.turno,
        scena: ritmo.scena,
        perMago: maghi.map((actor) => ({ name: actor.name, n: ritmo.perMago[actor.id] ?? 0 }))
      },
      orologi,
      presenze,
      ancore,
      fissati,
      inScena: orologi.length + presenze.length + ancore.length + fissati.length,
      registro: this.#registro,
      log
    };
  }

  #contestoGiocatori(scena, localize) {
    const riserva = getPool().points;
    const maghi = attoriDelQuadro().map((actor) => statusMago(actor, { localize, aperto: this.#maghiAperti.has(actor.id), scena: scena.numero, riserva }));
    return { maghi, nessunMago: !maghi.length };
  }

  /** La pagina della Nuova sessione (27/9): i maghi del Quadro in breve, la prima scena, il posto, la riserva. */
  #contestoSessione(scena, localize) {
    const maghi = attoriDelQuadro().map((actor) => ({ id: actor.id, name: actor.name, img: actor.img, utenti: utentiDi(actor) }));
    return {
      maghi,
      nessunMago: !maghi.length,
      scene: SCENE_PARADOSSO.map((s) => ({ id: s.id, nome: s.nome, selected: s.id === scena.tipo })),
      posti: POSTI.map((id) => ({ id, label: localize(`WOD5E_MAGE.Menu.Posti.${id}`), selected: id === scena.posto })),
      points: getPool().points
    };
  }

  _onRender(context, options) {
    super._onRender?.(context, options);
    QuadroNarratore.aperto = this;
    this.#collegaTrascinamento();
    this.element.classList.toggle(TEMA_CLASSE, isChiaro(game.settings.get(MODULE_ID, TEMA_SETTING)));
    if (options?.soloTesta) return;
    // Il menù circolare (17-18/11/2026): si monta nel suo riquadro, con lo stato che aveva.
    const nelMenu = this.modo === "menu" && !this.#sessione;
    this.#misuraPerIlMenu(nelMenu);
    if (nelMenu) this.menuCircolare.monta(this.element.querySelector("[data-role=menu-circolare]"));
    else this.#menu?.smonta();
  }

  /** Il menù circolare vuole spazio: la finestra si allarga entrando nel modo, e torna com'era uscendo. */
  #misuraPerIlMenu(nelMenu) {
    const pos = this.position ?? {};
    if (nelMenu && !this.#primaDelMenu) {
      this.#primaDelMenu = { width: pos.width, height: pos.height };
      const larga = Math.min(1240, (globalThis.innerWidth ?? 1280) - 60);
      const alta = Math.min(860, (globalThis.innerHeight ?? 900) - 40);
      if (Number(pos.width) < larga || Number(pos.height) < alta) {
        this.setPosition?.({ width: Math.max(Number(pos.width) || 0, larga), height: Math.max(Number(pos.height) || 0, alta) });
      }
    } else if (!nelMenu && this.#primaDelMenu) {
      const prima = this.#primaDelMenu;
      this.#primaDelMenu = null;
      if (Number(prima.width) && Number(prima.height)) this.setPosition?.({ width: prima.width, height: prima.height });
    }
  }

  _onClose(options) {
    super._onClose?.(options);
    // Una spesa ancora nei suoi cinque secondi parte adesso: chiudere non la perde.
    this.#menu?.sfuggi();
    this.#menu?.smonta();
    if (QuadroNarratore.aperto === this) QuadroNarratore.aperto = null;
  }

  /* ---------------------------------------------------------------- */
  /* I clic                                                            */
  /* ---------------------------------------------------------------- */

  static async #onModo(event, target) {
    event.preventDefault();
    const modo = target.dataset.modo;
    if (!MODI_QUADRO.includes(modo)) return;
    this.#sessione = false;
    await game.settings.set(MODULE_ID, QUADRO_SETTING, { ...QuadroNarratore.stato, modo });
    await this.render();
  }

  static async #onMeno(event) {
    event.preventDefault();
    const pool = getPool();
    await game.settings.set(MODULE_ID, POOL_SETTING, spendPoints(pool, 1, { kind: "manual" }) ?? pool);
  }

  static async #onPiu(event) {
    event.preventDefault();
    await game.settings.set(MODULE_ID, POOL_SETTING, addPoints(getPool(), 1, { kind: "manual" }));
  }

  static async #onVisibile(event) {
    event.preventDefault();
    const pool = getPool();
    await game.settings.set(MODULE_ID, POOL_SETTING, { ...pool, visible: !pool.visible });
  }

  static async #onAzzera(event) {
    event.preventDefault();
    const pool = getPool();
    await game.settings.set(MODULE_ID, POOL_SETTING, { ...pool, points: 0, log: [...pool.log, { kind: "reset", amount: -pool.points, when: Date.now() }] });
  }

  static async #onRegistro(event) {
    event.preventDefault();
    this.#registro = !this.#registro;
    await this.render();
  }

  static async #onMagickParadosso(event) {
    event.preventDefault();
    await openSpendDialog();
  }

  static async #onNuovaSessione(event) {
    event.preventDefault();
    this.apriSessione();
    await this.render();
  }

  /** Inizia dalla pagina: legge la prima scena e il posto dalle tendine; a sessione partita la pagina si chiude. */
  static async #onSessioneInizia(event, target) {
    event.preventDefault();
    const radice = target?.closest?.(".wod5e-mage-quadro-sessione") ?? this.element;
    const scelta = {
      tipo: radice?.querySelector?.("[name=scena]")?.value ?? "",
      posto: radice?.querySelector?.("[name=posto]")?.value ?? "normale"
    };
    if (await iniziaSessione(scelta)) this.#sessione = false;
    await this.render();
  }

  static async #onSessioneAnnulla(event) {
    event.preventDefault();
    this.#sessione = false;
    await this.render();
  }

  static async #onCambioScena(event) {
    event.preventDefault();
    await cambioScena();
  }

  static async #onOrologioAvanti(event, target) {
    event.preventDefault();
    await avanzaOrologioParadosso(target.dataset.id, { manuale: true });
  }

  static async #onOrologioChiudi(event, target) {
    event.preventDefault();
    await chiudiOrologioParadosso(target.dataset.id);
  }

  /** Un fatto fissato scardinato dai maghi: esce dal Quadro (dal contatore o dalla fascia del menù). */
  static async #onScardina(event, target) {
    event.preventDefault();
    await scardinaFatto(target.dataset.id);
  }

  static async #onMago(event, target) {
    event.preventDefault();
    const id = target.dataset.id;
    if (this.#maghiAperti.has(id)) this.#maghiAperti.delete(id);
    else this.#maghiAperti.add(id);
    await this.render();
  }

  /** Il Premio del Difetto: 1 punto in meno nella riserva, il segno sul mago, e la carta in chat per il tavolo. */
  static async #onPremioDifetto(event, target) {
    event.preventDefault();
    if (!game.user?.isGM) return;
    const actor = game.actors?.get(target.dataset.id);
    if (!actor) return;
    const localize = game.i18n.localize.bind(game.i18n);
    const preso = Boolean(actor.getFlag(MODULE_ID, PREMIO_DIFETTO_FLAG));
    const nuovo = premioDelDifetto(getPool(), { preso, nome: actor.name });
    if (!nuovo) {
      ui.notifications.warn(localize(preso ? "WOD5E_MAGE.Menu.PremioDifettoPreso" : "WOD5E_MAGE.Menu.PremioDifettoVuota"));
      return;
    }
    await game.settings.set(MODULE_ID, POOL_SETTING, nuovo);
    await actor.setFlag(MODULE_ID, PREMIO_DIFETTO_FLAG, { quando: Date.now() });
    const testo = game.i18n.format("WOD5E_MAGE.Menu.PremioDifettoCarta", { name: foundry.utils.escapeHTML(actor.name) });
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content: `<div class="wod5e-mage-roll-card wod5e-mage-premio-difetto"><b>${localize("WOD5E_MAGE.Menu.PremioDifetto")}</b><p>${testo}</p></div>`
    });
    await this.render();
  }

  static async #onMagoTogli(event, target) {
    event.preventDefault();
    const ids = attoriDelQuadro().map((actor) => actor.id).filter((id) => id !== target.dataset.id);
    await setMaghi(ids);
  }

  /**
   * Il trascinamento dagli Attori (25/9): mentre un attore passa sul Quadro la
   * cornice s'accende d'oro, il drop lo accoglie. Si collega una volta per
   * elemento: la cornice resta la stessa attraverso i render.
   */
  #collegaTrascinamento() {
    const root = this.element;
    if (!root?.addEventListener || root.dataset?.trascinamento === "1") return;
    if (root.dataset) root.dataset.trascinamento = "1";
    // dragleave arriva anche passando da un figlio all'altro della finestra: si conta, e la cornice si spegne solo all'ultimo.
    let dentro = 0;
    const accendi = (on) => {
      if (!on) dentro = 0;
      root.classList?.toggle("trascinando", on);
    };
    root.addEventListener("dragenter", (event) => {
      if (!game.user?.isGM) return;
      event.preventDefault();
      dentro += 1;
      accendi(true);
    });
    root.addEventListener("dragover", (event) => {
      if (!game.user?.isGM) return;
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
    });
    root.addEventListener("dragleave", () => {
      dentro = Math.max(dentro - 1, 0);
      if (!dentro) accendi(false);
    });
    root.addEventListener("drop", async (event) => {
      event.preventDefault();
      accendi(false);
      if (!game.user?.isGM) return;
      await this.accogli(leggiTrascinato(event));
    });
  }

  /** Cosa fa il Quadro di un attore lasciato sopra: lo mette in coda ai giocatori, o avvisa perché no. */
  async accogli(data) {
    const esito = await accogliTrascinato(data);
    if (!esito.ok) {
      if (esito.motivo) ui.notifications.warn(game.i18n.format(`WOD5E_MAGE.Menu.Trascina.${esito.motivo}`, { name: esito.name }));
      return esito;
    }
    await setMaghi([...attoriDelQuadro().map((actor) => actor.id), esito.actor.id]);
    return esito;
  }

  static async #onAttivoTogli(event, target) {
    event.preventDefault();
    const actor = game.actors?.get(target.dataset.actor);
    if (!actor) return;
    await actor.update({ [`flags.${MODULE_ID}.${ADDOSSO_FLAG}.-=${target.dataset.id}`]: null });
  }

  static async #onSchedaApri(event, target) {
    event.preventDefault();
    game.actors?.get(target.dataset.id)?.sheet?.render(true);
  }
}

function testoRegistro(entry, localize) {
  const format = game.i18n.format.bind(game.i18n);
  switch (entry.kind) {
    case "given": return format("WOD5E_MAGE.Paradosso.LogGiven", { name: entry.from ?? "" });
    case "sforzo": return format("WOD5E_MAGE.Paradosso.LogSforzo", { name: entry.from ?? "" });
    case "copia": return format("WOD5E_MAGE.Menu.LogCopia", { name: entry.from ?? "", kind: localize(entry.testimoni ? "WOD5E_MAGE.Menu.ConTestimoni" : (entry.volgare === false ? "WOD5E_MAGE.Menu.Accidentale" : "WOD5E_MAGE.Menu.Volgare")) });
    case "menu": return entry.actorName ? `${entry.text} · ${entry.actorName}` : String(entry.text ?? "");
    case "spend": return entry.text ? entry.text : localize("WOD5E_MAGE.Paradosso.LogSpend");
    case "manual": return localize("WOD5E_MAGE.Paradosso.LogManual");
    case "difetto": return format("WOD5E_MAGE.Paradosso.LogDifetto", { name: entry.from ?? "" });
    case "reset": return localize("WOD5E_MAGE.Paradosso.LogReset");
    case "session": return localize("WOD5E_MAGE.Paradosso.LogSession");
    case "scena": return format("WOD5E_MAGE.Menu.LogScena", { n: entry.scena ?? "" });
    default: return "";
  }
}

/* ------------------------------------------------------------------ */
/*  Gli orologi: avanti, scatto, chiusura                              */
/* ------------------------------------------------------------------ */

async function avanzaOrologioParadosso(id, { manuale = false } = {}) {
  const orologi = getOrologi();
  const index = orologi.findIndex((c) => c.id === id);
  if (index < 0) return;
  const { orologio, scattato } = avanzaOrologio(orologi[index]);
  orologi[index] = orologio;
  await setOrologi(orologi);
  await specchiaOrologio(orologio);
  if (scattato) await scattaOrologio(orologio);
  if (!manuale) QuadroNarratore.aggiorna();
}

/** L'orologio è pieno: il Paradosso agisce, e lo dice in chat. */
async function scattaOrologio(orologio) {
  const localize = localizer();
  const format = game.i18n.format.bind(game.i18n);
  const voce = voceById(orologio.paradosso?.voce);
  const nascosta = !orologio.visibile;
  await ChatMessage.create({
    speaker: { alias: localize("WOD5E_MAGE.Paradosso.Speaker") },
    content: `<div class="wod5e-mage-paradosso-card wod5e-mage-menu-card"><p class="wod5e-mage-roll-victory wod5e-mage-paradosso-banner">${localize("WOD5E_MAGE.Paradosso.CardTitle")} · ${foundry.utils.escapeHTML(orologio.titolo)}</p><div class="wod5e-mage-roll-card"><div class="wod5e-mage-roll-row"><b class="wod5e-mage-roll-key">${localize("WOD5E_MAGE.Menu.OrologioPieno")}</b><span class="wod5e-mage-roll-value">${foundry.utils.escapeHTML(orologio.paradosso?.scatta || voce?.effetto || "")}</span></div></div></div>`,
    whisper: nascosta ? game.users.filter((user) => user.isGM).map((user) => user.id) : [],
    flags: { [MODULE_ID]: { paradossoOrologio: { id: orologio.id, voce: orologio.paradosso?.voce ?? "" } } }
  });
  ui.notifications.info(format("WOD5E_MAGE.Menu.Scattato", { nome: orologio.titolo }));
}

async function chiudiOrologioParadosso(id) {
  const orologi = getOrologi();
  const orologio = orologi.find((c) => c.id === id);
  if (!orologio) return;
  await setOrologi(orologi.filter((c) => c.id !== id));
  await specchiaOrologio(orologio, { elimina: true });
}

/** Gli orologi di Carica e Nascosto avanzano coi Volgari; quelli di Arrivo e Scadenza coi giri. */
async function avanzaOrologiPer(evento) {
  for (const orologio of getOrologi()) {
    const voce = orologio.paradosso?.voce ?? "";
    const perVolgare = ["carica", "nascosto"].includes(voce);
    const perGiro = ["arrivo", "scadenza"].includes(voce) || Boolean(voceById(voce)?.presenza);
    const perScena = voce === "ancora" || voce === "il-ritmo";
    if ((evento === "volgare" && perVolgare) || (evento === "giro" && perGiro) || (evento === "scena" && perScena)) {
      if (count(orologio.pieni) < count(orologio.segmenti)) await avanzaOrologioParadosso(orologio.id);
    }
  }
}

/* ------------------------------------------------------------------ */
/*  Nuova sessione, Cambio scena                                       */
/* ------------------------------------------------------------------ */

/**
 * La Nuova sessione del Narratore (24/9; 26/9, Blue: la finestra di scelta
 * dei personaggi «va eliminata»; 27/9, Blue: niente finestra, una pagina del
 * Quadro che prende il posto del modo in uso): apre il Quadro sulla pagina
 * della sessione, coi maghi del Quadro in breve, dove si trascinano dagli
 * Attori quelli che mancano, si scelgono la prima scena e il posto, e
 * Inizia fa partire la sessione (`iniziaSessione`).
 */
export async function nuovaSessione() {
  if (!game.user?.isGM) return false;
  const app = await QuadroNarratore.apri();
  if (!app) return false;
  app.apriSessione();
  await app.render();
  return true;
}

/**
 * L'inizio della sessione: giocano i maghi che stanno nel Quadro; senza
 * maghi avvisa e non parte. Gli effetti della sessione prima e la lobby
 * vecchia si puliscono, gli orologi si chiudono, la scena riparte da 1 col
 * posto scelto, la riserva torna a zero.
 */
export async function iniziaSessione({ tipo = "", posto = "normale" } = {}) {
  if (!game.user?.isGM) return false;
  const localize = localizer();
  const maghi = attoriDelQuadro();
  if (!maghi.length) {
    ui.notifications.warn(localize("WOD5E_MAGE.Menu.NessunMagoSessione"));
    return false;
  }
  const ids = maghi.map((actor) => actor.id);
  // Gli effetti della sessione scaduta e la lobby vecchia si puliscono.
  for (const actor of game.actors?.contents ?? []) {
    if (!isMageActor(actor)) continue;
    const update = {};
    if (actor.getFlag(MODULE_ID, ADDOSSO_FLAG)) update[`flags.${MODULE_ID}.-=${ADDOSSO_FLAG}`] = null;
    if (actor.getFlag(MODULE_ID, LOBBY_FLAG)) update[`flags.${MODULE_ID}.-=${LOBBY_FLAG}`] = null;
    // Il Premio del Difetto torna disponibile: vale una volta per sessione.
    if (actor.getFlag(MODULE_ID, PREMIO_DIFETTO_FLAG)) update[`flags.${MODULE_ID}.-=${PREMIO_DIFETTO_FLAG}`] = null;
    // La Bussola (la scala del 16/11): la scena è nuova, e le Convinzioni servite ripartono dalla prima volta.
    if (actor.getFlag(MODULE_ID, BUSSOLA_SCENE_FLAG)) update[`flags.${MODULE_ID}.-=${BUSSOLA_SCENE_FLAG}`] = null;
    const scala = actor.getFlag(MODULE_ID, BUSSOLA_SCALA_FLAG);
    if (scala?.favore) update[`flags.${MODULE_ID}.${BUSSOLA_SCALA_FLAG}.-=favore`] = null;
    if (scala?.scena) update[`flags.${MODULE_ID}.${BUSSOLA_SCALA_FLAG}.-=scena`] = null;
    if (Object.keys(update).length) await actor.update(update);
  }
  for (const orologio of getOrologi()) await specchiaOrologio(orologio, { elimina: true });
  await game.settings.set(MODULE_ID, OROLOGI_SETTING, {});
  await setMaghi(ids);
  await setScena({
    tipo: SCENE_PARADOSSO.some((scena) => scena.id === tipo) ? tipo : "",
    posto: POSTI.includes(posto) ? posto : "normale",
    numero: 1,
    inizio: Date.now()
  });
  await game.settings.set(MODULE_ID, POOL_SETTING, resetPool(getPool()));
  ui.notifications.info(game.i18n.format("WOD5E_MAGE.Menu.SessioneIniziata", { n: ids.length }));
  QuadroNarratore.aggiorna();
  return true;
}

/**
 * La ricarica della scena dal Quadro (Blue, 30/9): +1 Quintessenza a ogni
 * mago del Quadro, nelle caselle libere della Ruota. Torna quanti l'hanno
 * presa. Il Cambio Scena della scheda, per i maghi del Quadro, non la ridà.
 */
export async function ricaricaDelQuadro(maghi = attoriDelQuadro()) {
  let presi = 0;
  for (const actor of maghi) {
    const ricarica = addQuintessenceToBalance(getMagickBalance(actor), RICARICA_SCENA);
    if (ricarica.gained <= 0) continue;
    await actor.setFlag(MODULE_ID, "magickBalance", { quintessence: ricarica.quintessence, paradox: ricarica.paradox });
    presi += 1;
  }
  return presi;
}

/** Il Cambio scena: la scena dopo e il posto; finisce quello che dura una scena; l'orologio dell'Ancora avanza; +1 Quintessenza ai maghi del Quadro. */
export async function cambioScena() {
  if (!game.user?.isGM) return false;
  const localize = localizer();
  const scena = getScena();
  const finiscono = [];
  for (const actor of attoriDelQuadro()) {
    for (const riga of righeAddosso(actor.getFlag(MODULE_ID, ADDOSSO_FLAG) ?? {})) {
      if (["lancio", "turno", "scena"].includes(riga.durata)) finiscono.push(`${riga.nome} · ${actor.name}`);
    }
  }
  const content = await foundry.applications.handlebars.renderTemplate(`modules/${MODULE_ID}/templates/dialogs/cambio-scena.hbs`, {
    // La domanda è sulla scena dopo.
    numero: scena.numero + 1,
    finiscono,
    scene: SCENE_PARADOSSO.map((s) => ({ id: s.id, nome: s.nome, selected: s.id === scena.tipo })),
    posti: POSTI.map((id) => ({ id, label: localize(`WOD5E_MAGE.Menu.Posti.${id}`), selected: id === scena.posto }))
  });
  let scelta = null;
  const answer = await foundry.applications.api.DialogV2.wait({
    window: { title: localize("WOD5E_MAGE.Menu.CambioScena"), icon: "fa-solid fa-clapperboard" },
    content,
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-quadro-dialogo"],
    position: { width: 460, height: "auto" },
    buttons: [
      {
        action: "cambia",
        icon: "fa-solid fa-clapperboard",
        label: localize("WOD5E_MAGE.Menu.Cambia"),
        default: true,
        callback: (_event, _button, dialog) => {
          scelta = {
            tipo: dialog.element.querySelector("[name=scena]")?.value ?? "",
            posto: dialog.element.querySelector("[name=posto]")?.value ?? "normale"
          };
          return "cambia";
        }
      },
      { action: "cancel", icon: "fas fa-times", label: localize("WOD5E.Cancel") }
    ]
  }).catch(() => null);
  if (answer !== "cambia" || !scelta) return false;
  for (const actor of attoriDelQuadro()) {
    const addosso = actor.getFlag(MODULE_ID, ADDOSSO_FLAG) ?? {};
    const dopo = addossoDopo(addosso, "scena");
    if (Object.keys(dopo).length !== Object.keys(addosso).length) await actor.setFlag(MODULE_ID, ADDOSSO_FLAG, dopo);
  }
  await avanzaOrologiPer("scena");
  const ricaricati = await ricaricaDelQuadro();
  if (ricaricati > 0) ui.notifications.info(game.i18n.format("WOD5E_MAGE.Menu.Ricarica", { n: ricaricati }));
  const pool = getPool();
  await game.settings.set(MODULE_ID, POOL_SETTING, { ...pool, log: [...pool.log, { kind: "scena", amount: 0, when: Date.now(), scena: scena.numero + 1 }] });
  await setScena({ tipo: scelta.tipo, posto: scelta.posto, numero: scena.numero + 1 });
  QuadroNarratore.aggiorna();
  return true;
}

/* ------------------------------------------------------------------ */
/*  I ganci: la copia dei Volgari, le scadenze, il pannello            */
/* ------------------------------------------------------------------ */

const copiando = new Set();

/** Un lancio chiuso in chat: la copia del Paradosso preso nella riserva (dal 29/9 anche dell'Accidentale pagato in Paradosso), l'orologio di Carica che avanza sui Volgari, i Tocchi «al lancio dopo» che si spengono. */
async function suLancio(message) {
  if (!isActiveGM()) return;
  const flags = message?.flags?.[MODULE_ID] ?? {};
  const card = flags?.[ROLL_CARD_FLAG];
  // Anche un potere pagato in Paradosso porta la sua copia (il Sistema): dalla carta di un tiro
  // di Abilità, o dalla carta del potere usato dalla scheda, che non è un lancio.
  const potere = copiaDaPotere(flags);
  if (!card && !potere) return;
  const actor = game.actors?.get(message?.speaker?.actor);
  // I Tocchi che duravano fino al lancio dopo se ne vanno con questo lancio.
  if (card && !card.skill && actor && actor.getFlag(MODULE_ID, ADDOSSO_FLAG)) {
    const addosso = actor.getFlag(MODULE_ID, ADDOSSO_FLAG);
    const dopo = addossoDopo(addosso, "lancio");
    if (Object.keys(dopo).length !== Object.keys(addosso).length) await actor.setFlag(MODULE_ID, ADDOSSO_FLAG, dopo);
  }
  const copia = card ? copiaDaCarta(flags) : potere;
  if (!copia || copiando.has(message.id)) return;
  copiando.add(message.id);
  try {
    const pool = getPool();
    await game.settings.set(MODULE_ID, POOL_SETTING, addPoints(pool, copia.points, { kind: "copia", from: actor?.name ?? message?.speaker?.alias ?? "", testimoni: copia.testimoni, volgare: copia.volgare, messageId: message.id }));
    await message.update({ flags: { [MODULE_ID]: { [COPIA_FLAG]: true } } });
    if (copia.volgare) await avanzaOrologiPer("volgare");
    ui.notifications.info(game.i18n.format(copia.volgare ? "WOD5E_MAGE.Menu.Copiato" : "WOD5E_MAGE.Menu.CopiatoAccidentale", { points: copia.points, name: actor?.name ?? "" }));
  } finally {
    copiando.delete(message.id);
  }
}

/** Un giro di combattimento in più: cadono gli effetti «al turno dopo», avanzano Arrivo e Scadenza. */
async function suGiro() {
  if (!isActiveGM()) return;
  for (const actor of attoriDelQuadro()) {
    const addosso = actor.getFlag(MODULE_ID, ADDOSSO_FLAG) ?? {};
    const dopo = addossoDopo(addosso, "turno");
    if (Object.keys(dopo).length !== Object.keys(addosso).length) await actor.setFlag(MODULE_ID, ADDOSSO_FLAG, dopo);
  }
  await avanzaOrologiPer("giro");
}

/* ------------------------------------------------------------------ */
/*  Il menù circolare (17-18/11/2026): quello che legge e scrive        */
/* ------------------------------------------------------------------ */

/** Le Sfere segnate di un mago (quelle che la scheda mostra). */
function sfereDelMago(actor) {
  return Object.entries(getSphereSelection(actor)).filter(([, on]) => on).map(([id]) => id);
}

/** L'Areté scritta sulla scheda di un mago, come la legge arete.js (un numero o { value }). */
function areteDelMago(actor) {
  const stored = actor?.getFlag?.(MODULE_ID, "arete");
  return Math.max(count(typeof stored === "object" && stored !== null ? stored.value : stored), 1);
}

/**
 * I PNG della scena in vista: i token senza giocatori. Del nemico contano le
 * Sfere della sua Magick, se è accesa; di un PNG fatto con la scheda del Mago
 * le Sfere segnate. Gli altri agiscono senza Sfere.
 */
export function pngInScena() {
  const tokens = globalThis.canvas?.scene?.tokens;
  const out = [];
  for (const doc of tokens?.contents ?? tokens ?? []) {
    const actor = doc?.actor;
    if (!actor || actor.hasPlayerOwner) continue;
    let sfere = [];
    let magick = false;
    let arete = 1;
    if (isNemicoActor(actor)) {
      const dati = datiNemico(actor.getFlag(MODULE_ID, NEMICO_FLAG) ?? {});
      magick = dati.magick.on;
      sfere = magick ? Object.keys(dati.magick.domini) : [];
      arete = dati.magick.arete;
    } else if (isMageActor(actor)) {
      magick = true;
      sfere = sfereDelMago(actor);
      arete = areteDelMago(actor);
    }
    out.push({ id: doc.id, nome: doc.name || actor.name, actorId: actor.id, sfere, magick, arete });
  }
  return out;
}

/** Chi fa la mossa: il PNG del token selezionato; senza token (o col token di un giocatore) agisce il Paradosso. */
export function attoreScelto() {
  const doc = globalThis.canvas?.tokens?.controlled?.[0]?.document;
  if (!doc) return null;
  return pngInScena().find((p) => p.id === doc.id) ?? null;
}

/** Scegliere dal menù è come selezionare il token sulla mappa; il Paradosso li lascia tutti. */
async function scegliToken(id) {
  const layer = globalThis.canvas?.tokens;
  if (!layer) return;
  if (!id) {
    layer.releaseAll?.();
    return;
  }
  const token = layer.get?.(id) ?? layer.placeables?.find((t) => t.id === id);
  token?.control?.({ releaseOthers: true });
}

/** I fatti fissati nel mondo, nell'ordine in cui sono entrati. */
export function getFissati() {
  const salvati = game.settings.get(MODULE_ID, FATTI_SETTING) ?? {};
  return Object.values(salvati)
    .filter((f) => f && typeof f === "object" && f.id)
    .sort((a, b) => (a.quando ?? 0) - (b.quando ?? 0));
}

async function setFissati(fatti) {
  await game.settings.set(MODULE_ID, FATTI_SETTING, Object.fromEntries(fatti.map((f) => [f.id, f])));
}

/** Un fatto scardinato esce dal mondo. */
export async function scardinaFatto(id) {
  const fatti = getFissati();
  const fatto = fatti.find((f) => f.id === id);
  if (!fatto) return false;
  await setFissati(fatti.filter((f) => f.id !== id));
  ui.notifications?.info(game.i18n.format("WOD5E_MAGE.MenuCircolare.Fissati.scardinato", { nome: fatto.nome }));
  return true;
}

/**
 * Il turno della spesa di Combattimento: con lo scontro avviato è il turno del
 * tracker; senza, un turno a mano che il Narratore fa avanzare dal menù.
 */
export function statoTurno() {
  const salvato = game.settings.get(MODULE_ID, TURNO_SETTING) ?? {};
  const usato = String(salvato.usato ?? "");
  const combat = game.combat;
  if (combat?.started) return { combattimento: true, chiave: chiaveTurno(combat), r: count(combat.round), t: count(combat.turn) + 1, usato };
  const n = Math.max(count(salvato.manuale), 1);
  return { combattimento: false, chiave: `manuale:${n}`, n, usato };
}

async function nuovoTurnoMenu() {
  const salvato = game.settings.get(MODULE_ID, TURNO_SETTING) ?? {};
  await game.settings.set(MODULE_ID, TURNO_SETTING, { ...salvato, manuale: Math.max(count(salvato.manuale), 1) + 1 });
}

/**
 * La spesa del menù circolare: la riserva scende subito e il registro segna la
 * mossa, la Sfera, su chi e chi la fa; la mossa che fissa entra fra i fatti
 * fissati con la sua soglia; su un mago del Quadro resta fra i suoi effetti
 * attivi; sul lato Combattimento segna la spesa del turno.
 */
export async function spendiMossa(spesa = {}) {
  const pool = getPool();
  const prezzo = count(spesa.paga);
  if (!prezzo) return { ok: false };
  if (prezzo > pool.points) {
    ui.notifications?.warn(game.i18n.format("WOD5E_MAGE.MenuCircolare.Avvisi.troppo", { p: prezzo, n: pool.points }));
    return { ok: false, motivo: "troppo" };
  }
  const scena = getScena();
  const round = count(game.combat?.round);
  const mago = spesa.suChi?.id ? (game.actors?.get(spesa.suChi.id) ?? null) : null;
  const next = spendPoints(pool, prezzo, {
    kind: "menu",
    voce: spesa.riga || spesa.nome || "",
    text: [spesa.sferaNome, spesa.nome].filter(Boolean).join(" · "),
    actorId: mago?.id ?? "",
    actorName: mago?.name ?? "",
    daName: spesa.da?.nome ?? "",
    sfera: spesa.sfera ?? "",
    lato: spesa.lato ?? "",
    soglia: count(spesa.soglia),
    nota: String(spesa.nota ?? ""),
    scena: scena.numero,
    round
  });
  if (!next) return { ok: false };
  await game.settings.set(MODULE_ID, POOL_SETTING, next);
  if (spesa.fissa) await setFissati([...getFissati(), fattoFissato(spesa, { scena: scena.numero })]);
  if (mago) {
    const quando = Number(spesa.quando) || Date.now();
    const id = `${spesa.riga || "mossa"}-${quando}`;
    const addosso = foundry.utils.deepClone(mago.getFlag(MODULE_ID, ADDOSSO_FLAG) ?? {});
    addosso[id] = recordAddosso(voceAddosso(spesa), { id, scena: scena.numero, round, testo: spesa.nota ?? "", quando });
    await mago.setFlag(MODULE_ID, ADDOSSO_FLAG, addosso);
  }
  if (spesa.lato === "s" && spesa.chiaveTurno) {
    await game.settings.set(MODULE_ID, TURNO_SETTING, { ...(game.settings.get(MODULE_ID, TURNO_SETTING) ?? {}), usato: spesa.chiaveTurno });
  }
  return { ok: true, resto: next.points };
}

/** La carta «Il Paradosso agisce»: al tavolo dopo i cinque secondi, o solo ai Narratori se nascosta. */
export async function dichiaraMossa(spesa = {}, { nascosta = false } = {}) {
  const localize = (key) => game.i18n.localize(key);
  return ChatMessage.create({
    speaker: { alias: localize("WOD5E_MAGE.Paradosso.Speaker") },
    content: cartaMossa(spesa, { nascosta, localize }),
    whisper: nascosta ? game.users.filter((user) => user.isGM).map((user) => user.id) : [],
    flags: {
      [MODULE_ID]: {
        paradossoMenu: {
          mossa: spesa.riga || spesa.nome || "",
          sfera: spesa.sfera ?? "",
          lato: spesa.lato ?? "",
          prezzo: count(spesa.paga),
          soglia: count(spesa.soglia),
          fissa: Boolean(spesa.fissa),
          actorId: spesa.suChi?.id ?? "",
          da: spesa.da?.nome ?? "",
          nascosta: Boolean(nascosta)
        }
      }
    }
  });
}

/**
 * Quello che il menù circolare legge e scrive nel mondo: menu-circolare-ui.js
 * non tocca Foundry, passa tutto da qui.
 */
export function fonteDelQuadro() {
  return {
    localize: (key) => game.i18n.localize(key),
    format: (key, data) => game.i18n.format(key, data),
    nomeSfera: (id) => {
      const chiave = `WOD5E_MAGE.Spheres.${id}`;
      const nome = game.i18n.localize(chiave);
      return nome === chiave ? "" : nome;
    },
    riserva: () => getPool().points,
    maghi: () => attoriDelQuadro().map((actor) => ({ id: actor.id, nome: actor.name, sfere: sfereDelMago(actor) })),
    png: () => pngInScena(),
    attore: () => attoreScelto(),
    seleziona: (id) => scegliToken(id),
    fissati: () => getFissati(),
    scardina: (id) => scardinaFatto(id),
    turno: () => statoTurno(),
    nuovoTurno: () => nuovoTurnoMenu(),
    sogliaDagliAmbiti: (livelli, arete) => sogliaDagliAmbiti(livelli, arete).soglia,
    avvisa: (testo) => ui.notifications?.warn(testo),
    spendi: (spesa) => spendiMossa(spesa),
    dichiara: (spesa, opzioni) => dichiaraMossa(spesa, opzioni)
  };
}

/** Un ritardo breve: i ganci dei token arrivano a raffica (uno per token selezionato o lasciato). */
function aRaffica(fn, ms = 60) {
  let timer = null;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
}

export function registerQuadroNarratore() {
  game.settings.register(MODULE_ID, SCENA_SETTING, { scope: "world", config: false, type: Object, default: { tipo: "", posto: "normale", numero: 1 }, onChange: () => QuadroNarratore.aggiorna() });
  game.settings.register(MODULE_ID, MAGHI_SETTING, { scope: "world", config: false, type: Object, default: { ids: [] }, onChange: () => QuadroNarratore.aggiorna() });
  game.settings.register(MODULE_ID, OROLOGI_SETTING, { scope: "world", config: false, type: Object, default: {}, onChange: () => QuadroNarratore.aggiorna() });
  game.settings.register(MODULE_ID, QUADRO_SETTING, { scope: "client", config: false, type: Object, default: { modo: "contatore" } });
  // Il menù circolare: i fatti fissati (per id, finché non li scardinano) e la spesa del turno di Combattimento.
  game.settings.register(MODULE_ID, FATTI_SETTING, { scope: "world", config: false, type: Object, default: {}, onChange: () => QuadroNarratore.aggiorna() });
  game.settings.register(MODULE_ID, TURNO_SETTING, { scope: "world", config: false, type: Object, default: {}, onChange: () => QuadroNarratore.aggiornaMenu() });

  Hooks.once("ready", () => {
    if (!game.user?.isGM) return;
    Hooks.on("createChatMessage", (message) => suLancio(message));
    Hooks.on("updateCombat", (combat, changes) => {
      if (changes && Object.hasOwn(changes, "round")) suGiro();
    });
    Hooks.on("updateActor", (_actor, changes) => {
      const flags = changes?.flags?.[MODULE_ID];
      if (flags && (ADDOSSO_FLAG in flags || `-=${ADDOSSO_FLAG}` in flags || "magickBalance" in flags || "salute" in flags || "ongoingMagick" in flags)) QuadroNarratore.aggiorna();
    });
    Hooks.on("createChatMessage", () => QuadroNarratore.aggiorna());
    Hooks.on("updateSetting", (setting) => {
      if (setting?.key === `${MODULE_ID}.${POOL_SETTING}`) QuadroNarratore.aggiorna();
    });
    // Il menù circolare segue il token scelto, i PNG della scena, il turno dello scontro e le Sfere dei nemici.
    const menu = aRaffica(() => QuadroNarratore.aggiornaMenu());
    for (const gancio of ["controlToken", "canvasReady", "createToken", "deleteToken", "updateCombat", "deleteCombat", "combatStart"]) Hooks.on(gancio, menu);
    Hooks.on("updateToken", (_doc, changes) => {
      if (changes && ("name" in changes || "actorId" in changes || "actorLink" in changes || "delta" in changes)) menu();
    });
    Hooks.on("updateActor", (_actor, changes) => {
      const flags = changes?.flags?.[MODULE_ID];
      if (flags && (NEMICO_FLAG in flags || "selectedSpheres" in flags || "spheres" in flags || "arete" in flags)) menu();
    });
  });
  setApriQuadro((modo) => QuadroNarratore.apri(modo));
}
