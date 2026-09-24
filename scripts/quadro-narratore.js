/**
 * Il Quadro del Narratore (Blue, 24/9/2026, terza proposta, «montalo su
 * Foundry»): una finestra sola che cambia in tre modi con un bottone. Il
 * contatore dei punti Paradosso (la riserva, il ritmo, gli orologi e le
 * Presenze in scena); il menù del Paradosso (le 65 voci a cassetti per
 * famiglia, chiusi, con la scena in tendina: si apre una voce, si legge la
 * scheda, si spende); il controllo dei giocatori (un riquadro per mago con
 * lo status, gli effetti attivi del Paradosso, i passivi, la Magick in atto;
 * chi c'è lo decide il Narratore, nella Nuova sessione o con «aggiungi»).
 * I conti puri stanno in menu-paradosso.js.
 */
import { MODULE_ID } from "./constants.js";
import { activeCondizioni, findCondizione } from "./condizioni.js";
import { getMagickBalance } from "./magick-balance.js";
import { isMageActor } from "./mage-dice.js";
import {
  ADDOSSO_FLAG,
  addossoDopo,
  avanzaOrologio,
  campiSpesa,
  cassettiPerScena,
  contoRitmo,
  copiaDaCarta,
  COPIA_FLAG,
  coppiaLibera,
  etichettaVolgare,
  inizioSessione,
  MAGHI_SETTING,
  MODI_QUADRO,
  nuovoOrologioParadosso,
  POSTI,
  prezzoVoce,
  QUADRO_SETTING,
  recordAddosso,
  renderCartaVoce,
  righeAddosso,
  SCENA_SETTING,
  SCENE_PARADOSSO,
  scattaPredefinito,
  scenaById,
  voceById,
  volgariRecenti
} from "./menu-paradosso.js";
import { prepareOngoingMagick } from "./ongoing-magick.js";
import { addPoints, getPool, LOBBY_FLAG, openSpendDialog, POOL_SETTING, resetPool, setApriQuadro, spendPoints } from "./paradosso-narratore.js";
import { prepareAnchors } from "./personaggio-extra.js";
import { poteriDelPersonaggio } from "./poteri.js";
import { ROLL_CARD_FLAG } from "./roll-card.js";
import { getSalute } from "./salute.js";
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
const ICONE_MODO_VOCE = { immediato: "fa-solid fa-bolt", annunciato: "fa-regular fa-eye", nascosto: "fa-solid fa-eye-slash", scoppio: "fa-solid fa-burst" };
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
/** Le forme degli orologi, disegnate a tracciati (viewBox 0 0 24 24). */
const FORME = {
  cerchio: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z",
  quadrato: "M4 4h16v16H4z",
  esagono: "M12 2.5 20.2 7.25v9.5L12 21.5 3.8 16.75v-9.5z",
  triangolo: "M12 3 21.5 20h-19z",
  rombo: "M12 2 22 12 12 22 2 12z",
  ottagono: "M8.2 2.5h7.6l5.7 5.7v7.6l-5.7 5.7H8.2l-5.7-5.7V8.2z"
};
const COLORI = { rosso: "#c0392b", ambra: "#d68910", verde: "#27ae60", azzurro: "#2e86c1", viola: "#8e44ad", avorio: "#e8e2d0" };

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

export function statusMago(actor, { localize = (key) => key, aperto = false, scena = 0 } = {}) {
  const salute = getSalute(actor);
  const balance = getMagickBalance(actor);
  const vol = volonta(actor);
  const condizioni = [...activeCondizioni(actor.items ?? []).entries()]
    .map(([id, item]) => findCondizione(id)?.name ?? item?.name ?? id);
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
    vuoto: !attivi.length && !passivi.length && !magick.length
  };
}

/* ------------------------------------------------------------------ */
/*  La finestra                                                        */
/* ------------------------------------------------------------------ */

export class QuadroNarratore extends HandlebarsApplicationMixin(ApplicationV2) {
  /** La finestra aperta, una sola. */
  static aperto = null;

  #cassetti = new Set();
  #voceAperta = "";
  #maghiAperti = new Set();
  #cerca = "";
  #registro = false;

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
      cambioScena: QuadroNarratore.#onCambioScena,
      orologioAvanti: QuadroNarratore.#onOrologioAvanti,
      orologioChiudi: QuadroNarratore.#onOrologioChiudi,
      cassetto: QuadroNarratore.#onCassetto,
      voce: QuadroNarratore.#onVoce,
      spendi: QuadroNarratore.#onSpendi,
      mago: QuadroNarratore.#onMago,
      magoAggiungi: QuadroNarratore.#onMagoAggiungi,
      magoTogli: QuadroNarratore.#onMagoTogli,
      attivoTogli: QuadroNarratore.#onAttivoTogli,
      schedaApri: QuadroNarratore.#onSchedaApri
    }
  };

  static PARTS = {
    testa: { template: `${RADICE}/testa.hbs` },
    contatore: { template: `${RADICE}/contatore.hbs`, scrollable: [""] },
    menu: { template: `${RADICE}/menu.hbs`, scrollable: [""] },
    giocatori: { template: `${RADICE}/giocatori.hbs`, scrollable: [""] }
  };

  static get stato() {
    const stored = game.settings.get(MODULE_ID, QUADRO_SETTING) ?? {};
    return { modo: MODI_QUADRO.includes(stored.modo) ? stored.modo : "contatore" };
  }

  get modo() {
    return QuadroNarratore.stato.modo;
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

  static aggiorna() {
    if (QuadroNarratore.aperto?.rendered) QuadroNarratore.aperto.render();
  }

  _configureRenderOptions(options) {
    super._configureRenderOptions(options);
    options.parts = ["testa", this.modo];
  }

  /** Un modo alla volta: la PART del modo di prima esce dalla finestra quando si cambia modo. */
  _replaceHTML(result, content, options) {
    super._replaceHTML(result, content, options);
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
      modi: MODI_QUADRO.map((id) => ({ id, label: localize(`WOD5E_MAGE.Menu.Modi.${id}`), icona: ICONE_MODI[id], attivo: id === modo })),
      scena: { ...scena, nome: scenaDati ? scenaDati.nome : localize("WOD5E_MAGE.Menu.NessunaScena"), icona: ICONE_SCENE[scena.tipo] ?? "fa-solid fa-clapperboard" },
      posto: scena.posto === "normale" ? "" : localize(`WOD5E_MAGE.Menu.Posti.${scena.posto}`),
      round: count(game.combat?.round)
    };
    if (modo === "contatore") Object.assign(base, this.#contestoContatore(pool, scena, localize));
    if (modo === "menu") Object.assign(base, this.#contestoMenu(pool, scena, localize));
    if (modo === "giocatori") Object.assign(base, this.#contestoGiocatori(scena, localize));
    return Object.assign(context, base);
  }

  #contestoContatore(pool, scena, localize) {
    const ritmo = contoRitmo(pool.log, { scena: scena.numero, round: count(game.combat?.round) });
    const maghi = attoriDelQuadro();
    const orologi = getOrologi().map((c) => ({
      ...c,
      colore: COLORI[c.colore] ?? COLORI.viola,
      tracciato: FORME[c.forma] ?? FORME.cerchio,
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
      inScena: orologi.length + presenze.length + ancore.length,
      registro: this.#registro,
      log
    };
  }

  #contestoMenu(pool, scena, localize) {
    const volgari = volgariRecenti(game.messages?.contents ?? [], { dal: scena.inizio || inizioSessione(pool.log) });
    const maghi = attoriDelQuadro().map((actor) => ({ id: actor.id, name: actor.name }));
    const cassetti = cassettiPerScena(scena.tipo, { cerca: this.#cerca }).map((cassetto) => ({
      ...cassetto,
      label: localize(`WOD5E_MAGE.Menu.Famiglie.${cassetto.famiglia}`),
      icona: ICONE_FAMIGLIE[cassetto.famiglia],
      aperto: this.#cassetti.has(cassetto.famiglia) || Boolean(this.#cerca),
      voci: cassetto.voci.map((voce) => this.#rigaVoce(voce, { volgari, maghi, pool, localize }))
    }));
    return {
      scene: SCENE_PARADOSSO.map((s) => ({ id: s.id, nome: s.nome, selected: s.id === scena.tipo })),
      cerca: this.#cerca,
      cassetti,
      nessunaVoce: cassetti.every((cassetto) => cassetto.conto === 0)
    };
  }

  #rigaVoce(voce, { volgari, maghi, pool, localize }) {
    const aperta = this.#voceAperta === voce.id;
    const campi = campiSpesa(voce);
    const primo = volgari[0] ?? null;
    const soglia = primo?.soglia ?? 0;
    const stima = prezzoVoce(voce, { soglia, suaSoglia: voce.prezzo.valore || 2, pallini: 1, rimbalzo: 0 });
    const scoppio = voce.modo === "scoppio";
    // «Su chi»: i maghi del Quadro, più chi ha lanciato un Volgare recente anche se sta fuori dal Quadro.
    const bersagli = maghi.map((m) => ({ ...m, fuori: false }));
    for (const v of volgari) {
      if (!v.actorId || bersagli.some((b) => b.id === v.actorId)) continue;
      const actor = game.actors?.get(v.actorId);
      if (actor && isMageActor(actor)) bersagli.push({ id: actor.id, name: actor.name, fuori: true });
    }
    const rimbalzi = aperta && campi.rimbalzo ? this.#rimbalziPossibili(soglia) : [];
    const rispondeLabel = primo ? etichettaVolgare(primo, localize) : "";
    return {
      ...voce,
      aperta,
      testoCerca: `${voce.nome} ${voce.breve} ${voce.effetto} ${voce.quando}`.toLowerCase(),
      iconaModo: ICONE_MODO_VOCE[voce.modo] ?? "fa-solid fa-bolt",
      modoLabel: localize(`WOD5E_MAGE.Menu.Modo.${voce.modo}`),
      prezzoLabel: voce.prezzo.breve || voce.prezzo.testo,
      scoppio,
      scettro: voce.famiglia === "scettro",
      campi,
      volgari: volgari.map((v, index) => ({ ...v, selected: index === 0, label: etichettaVolgare(v, localize) })),
      bersagli: bersagli.map((b) => ({ ...b, selected: b.id === primo?.actorId, label: b.fuori ? `${b.name} (${localize("WOD5E_MAGE.Menu.FuoriQuadro")})` : b.name })),
      suChiVuoto: !bersagli.some((b) => b.id === primo?.actorId),
      ancore: aperta && campi.ancora ? this.#ancoreDi(primo?.actorId ?? maghi[0]?.id) : [],
      rimbalzi,
      pallini: campi.pallini ? Array.from({ length: voce.prezzo.massimo || 1 }, (_, index) => ({ value: index + 1, label: String(index + 1) })) : [],
      suaSogliaDefault: voce.prezzo.valore || 2,
      // L'orologio precompilato: il titolo, i segmenti a scelta rapida, cosa scatta.
      titoloDefault: voce.nome,
      segmentiDefault: voce.presenza ? 3 : 4,
      segmentiScelte: [3, 4, 6, 8].map((n) => ({ n, attivo: n === (voce.presenza ? 3 : 4) })),
      scattaDefault: aperta && campi.orologio ? scattaPredefinito(voce, { rimbalzo: rimbalzi[0]?.nome ?? "", risponde: rispondeLabel }, localize, game.i18n.format.bind(game.i18n)) : "",
      stima: stima ?? "",
      troppo: stima !== null && stima > pool.points
    };
  }

  #ancoreDi(actorId) {
    const actor = game.actors?.get(actorId);
    if (!actor) return [];
    return prepareAnchors(actor).filter((row) => row.name).map((row) => ({ id: row.id, name: row.name }));
  }

  #rimbalziPossibili(soglia) {
    return cassettiPerScena(getScena().tipo)
      .filter((cassetto) => ["comuni", "presenze", "scena", "tocchi"].includes(cassetto.famiglia))
      .sort((a, b) => ["comuni", "presenze", "scena", "tocchi"].indexOf(a.famiglia) - ["comuni", "presenze", "scena", "tocchi"].indexOf(b.famiglia))
      .flatMap((cassetto) => cassetto.voci)
      .filter((voce) => voce.famiglia !== "orologi" && voce.modo !== "scoppio")
      .map((voce) => ({ id: voce.id, nome: voce.nome, prezzo: prezzoVoce(voce, { soglia, suaSoglia: voce.prezzo.valore || 2 }) ?? 0 }))
      .filter((riga) => riga.prezzo > 0);
  }

  #contestoGiocatori(scena, localize) {
    const maghi = attoriDelQuadro().map((actor) => statusMago(actor, { localize, aperto: this.#maghiAperti.has(actor.id), scena: scena.numero }));
    return { maghi, nessunMago: !maghi.length };
  }

  _onRender(context, options) {
    super._onRender?.(context, options);
    QuadroNarratore.aperto = this;
    this.element.classList.toggle(TEMA_CLASSE, isChiaro(game.settings.get(MODULE_ID, TEMA_SETTING)));
    const scena = this.element.querySelector("[data-role=scena]");
    scena?.addEventListener("change", async (event) => {
      await setScena({ tipo: event.target.value });
    });
    const cerca = this.element.querySelector("[data-role=cerca]");
    cerca?.addEventListener("input", (event) => {
      this.#cerca = String(event.target.value ?? "");
      this.#filtra();
    });
    // La tendina «su chi» segue il Volgare scelto, e le Ancore seguono il mago.
    for (const select of this.element.querySelectorAll("[data-role=rispondeA]")) {
      select.addEventListener("change", (event) => {
        const actorId = event.target.selectedOptions[0]?.dataset.actor ?? "";
        const box = event.target.closest(".wod5e-mage-menu-spesa");
        const suChi = box?.querySelector("[data-role=suChi]");
        if (suChi && actorId && [...suChi.options].some((option) => option.value === actorId)) suChi.value = actorId;
        this.#aggiornaPrezzo(box);
      });
    }
    for (const input of this.element.querySelectorAll(".wod5e-mage-menu-spesa [data-prezzo]")) {
      input.addEventListener("change", (event) => this.#aggiornaPrezzo(event.target.closest(".wod5e-mage-menu-spesa")));
      input.addEventListener("input", (event) => this.#aggiornaPrezzo(event.target.closest(".wod5e-mage-menu-spesa")));
    }
    for (const box of this.element.querySelectorAll(".wod5e-mage-menu-spesa")) this.#aggiornaPrezzo(box);
    // I segmenti a scelta rapida scrivono nel numero; il rimbalzo scelto riscrive cosa scatta.
    for (const tasto of this.element.querySelectorAll(".wod5e-mage-menu-segmenti button")) {
      tasto.addEventListener("click", (event) => {
        event.preventDefault();
        const box = tasto.closest(".wod5e-mage-menu-spesa");
        const numero = box?.querySelector("[data-role=segmenti]");
        if (numero) numero.value = tasto.dataset.n;
        for (const altro of tasto.parentElement.querySelectorAll("button")) altro.classList.toggle("attivo", altro === tasto);
      });
    }
    for (const numero of this.element.querySelectorAll(".wod5e-mage-menu-spesa [data-role=segmenti]")) {
      numero.addEventListener("input", () => {
        for (const tasto of numero.closest(".wod5e-mage-menu-spesa")?.querySelectorAll(".wod5e-mage-menu-segmenti button") ?? []) tasto.classList.toggle("attivo", tasto.dataset.n === String(numero.value));
      });
    }
    for (const select of this.element.querySelectorAll(".wod5e-mage-menu-spesa [data-role=rimbalzo]")) {
      select.addEventListener("change", () => {
        const scatta = select.closest(".wod5e-mage-menu-spesa")?.querySelector("[data-role=scatta]");
        const nome = select.selectedOptions[0]?.dataset.nome ?? "";
        if (scatta && nome) scatta.value = nome;
      });
    }
  }

  _onClose(options) {
    super._onClose?.(options);
    if (QuadroNarratore.aperto === this) QuadroNarratore.aperto = null;
  }

  /** La cerca filtra le righe senza ridisegnare, così il campo tiene il fuoco. */
  #filtra() {
    const filtro = this.#cerca.trim().toLowerCase();
    for (const cassetto of this.element.querySelectorAll("[data-famiglia]")) {
      let visibili = 0;
      for (const riga of cassetto.querySelectorAll("[data-voce]")) {
        const passa = !filtro || (riga.dataset.testo ?? "").includes(filtro);
        riga.classList.toggle("nascosta", !passa);
        if (passa) visibili += 1;
      }
      cassetto.classList.toggle("aperto", Boolean(filtro) ? visibili > 0 : this.#cassetti.has(cassetto.dataset.famiglia));
      cassetto.classList.toggle("nascosta", Boolean(filtro) && visibili === 0);
    }
  }

  /** Il prezzo vivo dentro la voce aperta: legge i campi e lo riscrive. */
  #aggiornaPrezzo(box) {
    if (!box) return;
    const voce = voceById(box.dataset.voce);
    if (!voce) return;
    const lettura = this.#leggiSpesa(box, voce);
    const out = box.querySelector("[data-role=prezzoVivo]");
    const dopo = box.querySelector("[data-role=riservaDopo]");
    const points = getPool().points;
    if (out) out.textContent = lettura.prezzo === null ? "?" : String(lettura.prezzo);
    if (dopo) dopo.textContent = lettura.prezzo === null ? "" : String(points - lettura.prezzo);
    box.classList.toggle("troppo", lettura.prezzo !== null && lettura.prezzo > points);
    const tasto = box.querySelector("[data-action=spendi]");
    if (tasto) tasto.disabled = lettura.prezzo === null || lettura.prezzo > points;
  }

  #leggiSpesa(box, voce) {
    const q = (role) => box.querySelector(`[data-role=${role}]`);
    const rispondeA = q("rispondeA");
    const opzione = rispondeA?.selectedOptions?.[0];
    const messageId = rispondeA?.value ?? "";
    const soglia = count(opzione?.dataset.soglia);
    const suChi = q("suChi")?.value ?? "";
    const vede = q("vede")?.value ?? "tutti";
    const suaSoglia = count(q("suaSoglia")?.value);
    const pallini = count(q("pallini")?.value) || 1;
    const segmenti = count(q("segmenti")?.value) || 4;
    const rimbalzoId = q("rimbalzo")?.value ?? "";
    const rimbalzoPrezzo = count(q("rimbalzo")?.selectedOptions?.[0]?.dataset.prezzo);
    const ancoraId = q("ancora")?.value ?? "";
    const ancoraNome = q("ancora")?.selectedOptions?.[0]?.textContent?.trim() ?? "";
    const vuole = String(q("vuole")?.value ?? "").trim();
    const nota = String(q("nota")?.value ?? "").trim();
    const titolo = String(q("titolo")?.value ?? "").trim();
    const scatta = String(q("scatta")?.value ?? "").trim();
    const prezzo = prezzoVoce(voce, { soglia, suaSoglia, pallini, rimbalzo: rimbalzoPrezzo });
    return {
      messageId, soglia, suChi, vede, suaSoglia, pallini, segmenti, rimbalzoId, rimbalzoPrezzo, ancoraId, ancoraNome, vuole, nota, titolo, scatta, prezzo,
      risponde: opzione && messageId ? opzione.textContent.trim() : "",
      actorDelVolgare: opzione?.dataset.actor ?? ""
    };
  }

  /* ---------------------------------------------------------------- */
  /* La spesa                                                          */
  /* ---------------------------------------------------------------- */

  async #spendi(voceId) {
    const voce = voceById(voceId);
    const box = this.element.querySelector(`.wod5e-mage-menu-spesa[data-voce="${voceId}"]`);
    if (!voce || !box) return;
    const localize = localizer();
    const format = game.i18n.format.bind(game.i18n);
    if (voce.modo === "scoppio") {
      ui.notifications.warn(localize("WOD5E_MAGE.Menu.SoloScoppio"));
      return;
    }
    const lettura = this.#leggiSpesa(box, voce);
    if (lettura.prezzo === null) {
      ui.notifications.warn(localize("WOD5E_MAGE.Menu.PrezzoManca"));
      return;
    }
    const pool = getPool();
    if (lettura.prezzo > pool.points) {
      ui.notifications.warn(format("WOD5E_MAGE.Paradosso.SpendTooMuch", { price: lettura.prezzo, points: pool.points }));
      return;
    }
    const scena = getScena();
    const round = count(game.combat?.round);
    const target = lettura.suChi ? (game.actors?.get(lettura.suChi) ?? null) : null;
    const campi = campiSpesa(voce);
    const dettagli = [];
    const quando = Date.now();
    const idSpesa = `${voce.id}-${quando}`;

    // Chi entra e cosa vuole; l'Ancora; i segmenti.
    if (campi.suaSoglia && lettura.suaSoglia) dettagli.push({ chiave: localize("WOD5E_MAGE.Menu.SuaSoglia"), valore: String(lettura.suaSoglia) });
    if (campi.vuole && lettura.vuole) dettagli.push({ chiave: localize("WOD5E_MAGE.Menu.Vuole"), valore: lettura.vuole });
    if (campi.ancora && lettura.ancoraNome) dettagli.push({ chiave: localize("WOD5E_MAGE.Menu.Ancora"), valore: lettura.ancoraNome });
    if (campi.pallini) dettagli.push({ chiave: localize("WOD5E_MAGE.Menu.Pallini"), valore: String(lettura.pallini) });

    // L'orologio del Paradosso: aperto nel Quadro e specchiato nel modulo Orologio.
    let orologio = null;
    if (campi.orologio) {
      const esistenti = [...getOrologi(), ...(orologioModuloAttivo() ? Object.values(game.settings.get(OROLOGIO_MODULO, "orologi") ?? {}) : [])];
      const coppia = coppiaLibera(esistenti);
      const rimbalzo = lettura.rimbalzoId ? voceById(lettura.rimbalzoId) : null;
      const scatta = lettura.scatta || scattaPredefinito(voce, { rimbalzo: rimbalzo?.nome ?? "", risponde: lettura.risponde, chi: lettura.vuole }, localize, format);
      const base = lettura.titolo || voce.nome;
      orologio = nuovoOrologioParadosso({
        id: idSpesa,
        titolo: target && !base.includes(target.name) ? `${base} · ${target.name}` : base,
        segmenti: lettura.segmenti,
        visibile: voce.modo !== "nascosto" && lettura.vede !== "narratori",
        colore: coppia.colore,
        forma: coppia.forma,
        scatta,
        voce: voce.id,
        actorId: target?.id ?? "",
        ordine: quando
      });
      await setOrologi([...getOrologi(), orologio]);
      await specchiaOrologio(orologio);
      dettagli.push({ chiave: localize("WOD5E_MAGE.Menu.Orologio"), valore: `${orologio.segmenti} ${localize("WOD5E_MAGE.Menu.Segmenti")} · ${localize(`WOD5E_MAGE.Menu.Forme.${coppia.forma}`)} ${localize(`WOD5E_MAGE.Menu.Colori.${coppia.colore}`)}` });
    }

    // La riserva scende; il registro segna la voce, il mago, la scena e il giro.
    const next = spendPoints(pool, lettura.prezzo, {
      kind: "menu",
      voce: voce.id,
      text: voce.nome,
      actorId: target?.id ?? "",
      actorName: target?.name ?? "",
      scena: scena.numero,
      round
    });
    if (!next) return;
    await game.settings.set(MODULE_ID, POOL_SETTING, next);

    // L'effetto resta addosso al mago finché non scade.
    if (target && voce.durata) {
      const addosso = foundry.utils.deepClone(target.getFlag(MODULE_ID, ADDOSSO_FLAG) ?? {});
      addosso[idSpesa] = recordAddosso(voce, { id: idSpesa, scena: scena.numero, round, risponde: lettura.risponde, testo: lettura.vuole || lettura.nota, quando });
      await target.setFlag(MODULE_ID, ADDOSSO_FLAG, addosso);
    }

    // La carta in chat: a tutti, o solo ai Narratori.
    const nascosta = voce.modo === "nascosto" || lettura.vede === "narratori";
    await ChatMessage.create({
      speaker: { alias: localize("WOD5E_MAGE.Paradosso.Speaker") },
      content: renderCartaVoce(voce, { risponde: lettura.risponde, suChi: target?.name ?? "", dettagli, testo: lettura.nota }, localize),
      whisper: nascosta ? game.users.filter((user) => user.isGM).map((user) => user.id) : [],
      flags: { [MODULE_ID]: { paradossoMenu: { voce: voce.id, id: idSpesa, actorId: target?.id ?? "", prezzo: lettura.prezzo } } }
    });
    ui.notifications.info(format("WOD5E_MAGE.Menu.Speso", { nome: voce.nome, prezzo: lettura.prezzo, resto: next.points }));
    if (orologio) ui.notifications.info(format("WOD5E_MAGE.Menu.OrologioAperto", { nome: orologio.titolo, forma: localize(`WOD5E_MAGE.Menu.Forme.${orologio.forma}`), colore: localize(`WOD5E_MAGE.Menu.Colori.${orologio.colore}`) }));
    this.#voceAperta = "";
    await this.render();
  }

  /* ---------------------------------------------------------------- */
  /* I clic                                                            */
  /* ---------------------------------------------------------------- */

  static async #onModo(event, target) {
    event.preventDefault();
    const modo = target.dataset.modo;
    if (!MODI_QUADRO.includes(modo)) return;
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
    await nuovaSessione();
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

  static async #onCassetto(event, target) {
    event.preventDefault();
    const famiglia = target.dataset.famiglia;
    if (this.#cassetti.has(famiglia)) this.#cassetti.delete(famiglia);
    else this.#cassetti.add(famiglia);
    await this.render();
  }

  static async #onVoce(event, target) {
    event.preventDefault();
    const id = target.dataset.voce;
    this.#voceAperta = this.#voceAperta === id ? "" : id;
    await this.render();
  }

  static async #onSpendi(event, target) {
    event.preventDefault();
    await this.#spendi(target.dataset.voce);
  }

  static async #onMago(event, target) {
    event.preventDefault();
    const id = target.dataset.id;
    if (this.#maghiAperti.has(id)) this.#maghiAperti.delete(id);
    else this.#maghiAperti.add(id);
    await this.render();
  }

  static async #onMagoAggiungi(event) {
    event.preventDefault();
    await aggiungiMaghi();
  }

  static async #onMagoTogli(event, target) {
    event.preventDefault();
    const ids = attoriDelQuadro().map((actor) => actor.id).filter((id) => id !== target.dataset.id);
    await setMaghi(ids);
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
    case "copia": return format("WOD5E_MAGE.Menu.LogCopia", { name: entry.from ?? "", kind: localize(entry.testimoni ? "WOD5E_MAGE.Menu.ConTestimoni" : "WOD5E_MAGE.Menu.Volgare") });
    case "menu": return entry.actorName ? `${entry.text} · ${entry.actorName}` : String(entry.text ?? "");
    case "spend": return entry.text ? entry.text : localize("WOD5E_MAGE.Paradosso.LogSpend");
    case "manual": return localize("WOD5E_MAGE.Paradosso.LogManual");
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
/*  Nuova sessione, Cambio scena, aggiungi                             */
/* ------------------------------------------------------------------ */

function maghiDelMondo() {
  return (game.actors?.contents ?? [])
    .filter((actor) => isMageActor(actor))
    .map((actor) => ({ id: actor.id, name: actor.name, img: actor.img, utenti: utentiDi(actor), giocatore: Boolean(actor.hasPlayerOwner) }))
    .sort((a, b) => Number(b.giocatore) - Number(a.giocatore) || a.name.localeCompare(b.name, "it"));
}

function leggiScelti(root) {
  return [...root.querySelectorAll("input[name=mago]:checked")].map((input) => input.value);
}

/** La Nuova sessione del Narratore: chi gioca (lo decide lui), la prima scena, il posto; la riserva a zero. */
export async function nuovaSessione() {
  if (!game.user?.isGM) return false;
  const localize = localizer();
  const attuali = new Set(attoriDelQuadro().map((actor) => actor.id));
  const content = await foundry.applications.handlebars.renderTemplate(`modules/${MODULE_ID}/templates/dialogs/nuova-sessione-narratore.hbs`, {
    maghi: maghiDelMondo().map((mago) => ({ ...mago, checked: attuali.size ? attuali.has(mago.id) : mago.giocatore, collegato: mago.utenti.some((user) => user.active) })),
    scene: SCENE_PARADOSSO.map((scena) => ({ id: scena.id, nome: scena.nome })),
    posti: POSTI.map((id) => ({ id, label: localize(`WOD5E_MAGE.Menu.Posti.${id}`) })),
    points: getPool().points
  });
  let scelta = null;
  const answer = await foundry.applications.api.DialogV2.wait({
    window: { title: localize("WOD5E_MAGE.Paradosso.NewSession"), icon: "fa-solid fa-sun" },
    content,
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-quadro-dialogo"],
    position: { width: 520, height: "auto" },
    buttons: [
      {
        action: "inizia",
        icon: "fa-solid fa-play",
        label: localize("WOD5E_MAGE.Menu.Inizia"),
        default: true,
        callback: (_event, _button, dialog) => {
          scelta = {
            ids: leggiScelti(dialog.element),
            tipo: dialog.element.querySelector("[name=scena]")?.value ?? "",
            posto: dialog.element.querySelector("[name=posto]")?.value ?? "normale"
          };
          return "inizia";
        }
      },
      { action: "cancel", icon: "fas fa-times", label: localize("WOD5E.Cancel") }
    ]
  }).catch(() => null);
  if (answer !== "inizia" || !scelta) return false;
  // Gli effetti della sessione scaduta e la lobby vecchia si puliscono.
  for (const actor of game.actors?.contents ?? []) {
    if (!isMageActor(actor)) continue;
    const update = {};
    if (actor.getFlag(MODULE_ID, ADDOSSO_FLAG)) update[`flags.${MODULE_ID}.-=${ADDOSSO_FLAG}`] = null;
    if (actor.getFlag(MODULE_ID, LOBBY_FLAG)) update[`flags.${MODULE_ID}.-=${LOBBY_FLAG}`] = null;
    if (Object.keys(update).length) await actor.update(update);
  }
  for (const orologio of getOrologi()) await specchiaOrologio(orologio, { elimina: true });
  await game.settings.set(MODULE_ID, OROLOGI_SETTING, {});
  await setMaghi(scelta.ids);
  await setScena({ tipo: scelta.tipo, posto: scelta.posto, numero: 1, inizio: Date.now() });
  await game.settings.set(MODULE_ID, POOL_SETTING, resetPool(getPool()));
  ui.notifications.info(game.i18n.format("WOD5E_MAGE.Menu.SessioneIniziata", { n: scelta.ids.length }));
  QuadroNarratore.aggiorna();
  return true;
}

/** Il Cambio scena: la scena dopo e il posto; finisce quello che dura una scena; l'orologio dell'Ancora avanza. */
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
  const pool = getPool();
  await game.settings.set(MODULE_ID, POOL_SETTING, { ...pool, log: [...pool.log, { kind: "scena", amount: 0, when: Date.now(), scena: scena.numero + 1 }] });
  await setScena({ tipo: scelta.tipo, posto: scelta.posto, numero: scena.numero + 1 });
  QuadroNarratore.aggiorna();
  return true;
}

/** «aggiungi» nel riquadro dei giocatori: i maghi del mondo che non sono nel Quadro. */
export async function aggiungiMaghi() {
  if (!game.user?.isGM) return false;
  const localize = localizer();
  const dentro = new Set(attoriDelQuadro().map((actor) => actor.id));
  const fuori = maghiDelMondo().filter((mago) => !dentro.has(mago.id)).map((mago) => ({ ...mago, checked: false, collegato: mago.utenti.some((user) => user.active) }));
  if (!fuori.length) {
    ui.notifications.info(localize("WOD5E_MAGE.Menu.NessunoDaAggiungere"));
    return false;
  }
  const content = await foundry.applications.handlebars.renderTemplate(`modules/${MODULE_ID}/templates/dialogs/aggiungi-maghi.hbs`, { maghi: fuori });
  let ids = [];
  const answer = await foundry.applications.api.DialogV2.wait({
    window: { title: localize("WOD5E_MAGE.Menu.Aggiungi"), icon: "fa-solid fa-plus" },
    content,
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-quadro-dialogo"],
    position: { width: 460, height: "auto" },
    buttons: [
      { action: "aggiungi", icon: "fa-solid fa-plus", label: localize("WOD5E_MAGE.Menu.Aggiungi"), default: true, callback: (_event, _button, dialog) => { ids = leggiScelti(dialog.element); return "aggiungi"; } },
      { action: "cancel", icon: "fas fa-times", label: localize("WOD5E.Cancel") }
    ]
  }).catch(() => null);
  if (answer !== "aggiungi" || !ids.length) return false;
  await setMaghi([...dentro, ...ids]);
  return true;
}

/* ------------------------------------------------------------------ */
/*  I ganci: la copia dei Volgari, le scadenze, il pannello            */
/* ------------------------------------------------------------------ */

const copiando = new Set();

/** Un Volgare chiuso in chat: la copia nella riserva, l'orologio di Carica che avanza, i Tocchi «al lancio dopo» che si spengono. */
async function suLancio(message) {
  if (!isActiveGM()) return;
  const flags = message?.flags?.[MODULE_ID] ?? {};
  const card = flags?.[ROLL_CARD_FLAG];
  if (!card || card.skill) return;
  const actor = game.actors?.get(message?.speaker?.actor);
  // I Tocchi che duravano fino al lancio dopo se ne vanno con questo lancio.
  if (actor && actor.getFlag(MODULE_ID, ADDOSSO_FLAG)) {
    const addosso = actor.getFlag(MODULE_ID, ADDOSSO_FLAG);
    const dopo = addossoDopo(addosso, "lancio");
    if (Object.keys(dopo).length !== Object.keys(addosso).length) await actor.setFlag(MODULE_ID, ADDOSSO_FLAG, dopo);
  }
  const copia = copiaDaCarta(flags);
  if (!copia || copiando.has(message.id)) return;
  copiando.add(message.id);
  try {
    const pool = getPool();
    await game.settings.set(MODULE_ID, POOL_SETTING, addPoints(pool, copia.points, { kind: "copia", from: actor?.name ?? message?.speaker?.alias ?? "", testimoni: copia.testimoni, messageId: message.id }));
    await message.update({ flags: { [MODULE_ID]: { [COPIA_FLAG]: true } } });
    await avanzaOrologiPer("volgare");
    ui.notifications.info(game.i18n.format("WOD5E_MAGE.Menu.Copiato", { points: copia.points, name: actor?.name ?? "" }));
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

export function registerQuadroNarratore() {
  game.settings.register(MODULE_ID, SCENA_SETTING, { scope: "world", config: false, type: Object, default: { tipo: "", posto: "normale", numero: 1 }, onChange: () => QuadroNarratore.aggiorna() });
  game.settings.register(MODULE_ID, MAGHI_SETTING, { scope: "world", config: false, type: Object, default: { ids: [] }, onChange: () => QuadroNarratore.aggiorna() });
  game.settings.register(MODULE_ID, OROLOGI_SETTING, { scope: "world", config: false, type: Object, default: {}, onChange: () => QuadroNarratore.aggiorna() });
  game.settings.register(MODULE_ID, QUADRO_SETTING, { scope: "client", config: false, type: Object, default: { modo: "contatore" } });

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
  });
  setApriQuadro((modo) => QuadroNarratore.apri(modo));
}
