/**
 * Il traduttore del Vathrâ dentro Foundry (Blue, 25/9: «scrivo una frase
 * dentro e la traduce mostrando anche le scritte»). È la pagina di
 * 03_FABBRICA/vathra portata nel modulo:
 *
 * - la finestra, per tutti: Traduttore (la frase, i glifi nelle due mani, la
 *   lettura col ▶, chi capisce, Manda; particelle e manopole chiuse),
 *   Frasario (le frasi di scena e le cento da tavolo), Radice (i sette
 *   Modi), Alfabeto (la tavola, coi suoni registrati);
 * - la carta in chat: glifi e lettura col ▶ per tutti; il senso in italiano
 *   per il Narratore, per chi scrive e per i giocatori accesi all'invio (li
 *   si accende anche dopo, dal tasto piccolo della carta);
 *
 * La forma è quella semplificata chiesta da Blue il 25/9 («riduci il
 * bombardamento informativo»): come si legge e la glossa stanno nei
 * suggerimenti al passaggio del mouse, non a schermo.
 * - il tasto nella barra dei token e il comando «/vathra <frase>»;
 * - le due mani fra i caratteri di Foundry, per i diari e il Testo sulla mappa.
 *
 * Il senso viaggia nella bandiera del messaggio, che arriva a tutti i client:
 * a schermo compare solo a chi capisce, ma un giocatore che apre la console
 * del browser lo può leggere.
 */
import { MODULE_ID } from "../constants.js";
import { isChiaro, TEMA_CLASSE, TEMA_SETTING } from "../tema.js";
import { LETTERE, REGOLE, SUONI } from "./dati.js";
import { perLaVoce } from "./lettura.js";
import {
  capisce, datiCarta, fraseCorrisponde, fraseDelFrasario, frasarioTradotto, leggiComando, MANOPOLE, MANOPOLE_TENDINA,
  normalizzaOpzioni, OPZIONI_BASE, opzioniFrase, PAGINE, radice, registrazione, statoGettoni,
  toggleCapisce, toggleGettone, traduciTesto, VATHRA_FLAG
} from "./vathra.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

const RADICE_MODULO = `modules/${MODULE_ID}`;
const CARTELLA = `${RADICE_MODULO}/assets/vathra`;
const TEMPLATE_FINESTRA = `${RADICE_MODULO}/templates/vathra/finestra.hbs`;
const TEMPLATE_CARTA = `${RADICE_MODULO}/templates/vathra/carta.hbs`;

const localize = (key) => game.i18n.localize(key);
const format = (key, data) => game.i18n.format(key, data);
/** Il suggerimento della lettura: «Come si legge: va-ca-RIL-mi …». */
const titoloLegge = (legge) => (legge ? `${localize("WOD5E_MAGE.Vathra.ComeSiLegge")}: ${legge}` : "");
const escape = (testo) => String(testo ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ------------------------------------------------------------------ */
/*  La voce                                                            */
/* ------------------------------------------------------------------ */

let inAscolto = null;

function volumeInterfaccia() {
  try {
    const v = Number(game.settings.get("core", "globalInterfaceVolume"));
    return Number.isFinite(v) ? Math.min(Math.max(v, 0), 1) : 0.5;
  } catch {
    return 0.5;
  }
}

/** Suona un file della cartella voce/, solo per chi preme. */
export function suonaFile(nome) {
  try {
    inAscolto?.pause?.();
    globalThis.speechSynthesis?.cancel?.();
    const audio = new Audio(`${CARTELLA}/voce/${nome}`);
    audio.volume = volumeInterfaccia();
    inAscolto = audio;
    audio.play()?.catch?.(() => null);
    return audio;
  } catch {
    return null;
  }
}

/**
 * Dice una lettura: la registrazione se è una delle dieci, se no la voce
 * italiana del computer sulla riga riscritta da `perLaVoce`.
 */
export function diLettura(romanizzazione) {
  const t = String(romanizzazione ?? "").trim();
  if (!t) return false;
  const file = registrazione(t);
  if (file) return Boolean(suonaFile(file));
  const synth = globalThis.speechSynthesis;
  const Utterance = globalThis.SpeechSynthesisUtterance;
  if (!synth || !Utterance) {
    ui.notifications?.warn(localize("WOD5E_MAGE.Vathra.SenzaVoce"));
    return false;
  }
  inAscolto?.pause?.();
  synth.cancel();
  const u = new Utterance(perLaVoce(t));
  const italiane = synth.getVoices().filter((v) => /^it/i.test(v.lang));
  if (italiane.length) u.voice = italiane[0];
  u.lang = "it-IT";
  u.rate = 0.82;
  u.pitch = 0.9;
  u.volume = volumeInterfaccia();
  synth.speak(u);
  return true;
}

/* ------------------------------------------------------------------ */
/*  Chi scrive e chi capisce                                           */
/* ------------------------------------------------------------------ */

/** Il nome con cui parla chi manda: il token scelto, o il personaggio, o l'utente. */
export function nomeDiChiParla() {
  try {
    const speaker = ChatMessage.getSpeaker();
    return String(speaker?.alias || game.user?.name || "");
  } catch {
    return String(game.user?.name ?? "");
  }
}

function tuttiGliUtenti() {
  const users = game.users;
  if (!users) return [];
  return Array.isArray(users) ? users : (users.contents ?? [...users]);
}

/** I giocatori da accendere: tutti tranne il Narratore e chi scrive. */
export function giocatoriDaAccendere(scelti = new Set(), autoreId = game.user?.id) {
  return tuttiGliUtenti()
    .filter((u) => !u.isGM && u.id !== autoreId)
    .map((u) => ({ id: u.id, nome: u.name, personaggio: u.character?.name ?? "", attivo: Boolean(u.active), scelto: scelti.has(u.id) }));
}

/* ------------------------------------------------------------------ */
/*  La carta in chat                                                   */
/* ------------------------------------------------------------------ */

/** Manda la frase in chat. Torna il messaggio, o null se la frase è vuota. */
export async function mandaVathra({ testo = "", opzioni = {}, mano = "filata", capiscono = [] } = {}) {
  const traduzione = traduciTesto(testo, opzioni);
  if (traduzione.vuoto) {
    ui.notifications?.warn(localize("WOD5E_MAGE.Vathra.Vuoto"));
    return null;
  }
  const dati = datiCarta({ testo, traduzione, mano, capiscono, autoreId: game.user?.id ?? null });
  const content = await foundry.applications.handlebars.renderTemplate(TEMPLATE_CARTA, { ...dati, leggeTitolo: titoloLegge(dati.legge) });
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker(),
    content,
    flags: { [MODULE_ID]: { [VATHRA_FLAG]: dati } }
  });
}

function autoreDi(message) {
  return message?.author?.id ?? message?.user?.id ?? message?._source?.author ?? message?._source?.user ?? null;
}

/** Le carte di cui il Narratore (o chi ha scritto) ha aperto la riga dei giocatori: restano aperte dopo un clic. */
const chiAperti = new Set();

function bottone(doc, classe, icona, etichetta) {
  const b = doc.createElement("button");
  b.type = "button";
  b.className = classe;
  b.setAttribute("aria-label", etichetta);
  b.title = etichetta;
  b.innerHTML = `<i class="${icona}" aria-hidden="true"></i>`;
  return b;
}

/**
 * La carta, per chi la guarda. Per tutti il ▶ accanto alla lettura; per chi
 * capisce il senso in una riga (la glossa al passaggio del mouse); per il
 * Narratore e per chi l'ha scritta un tasto piccolo col numero di chi
 * capisce, che apre i giocatori da accendere o spegnere anche dopo l'invio
 * (un tiro riuscito di Poliglotta, per esempio).
 */
export function decoraCartaVathra(message, html) {
  const dati = message?.getFlag?.(MODULE_ID, VATHRA_FLAG);
  if (!dati || !html?.querySelector) return false;
  const carta = html.querySelector(".wod5e-mage-vathra-carta");
  if (!carta || carta.querySelector(".wod5e-mage-vathra-carta-play")) return false;
  const user = game.user;
  const autoreId = autoreDi(message);
  const doc = carta.ownerDocument ?? globalThis.document;
  // Le carte della 1.26.0 non hanno la riga della lettura: il ▶ va in fondo alla carta.
  const riga = carta.querySelector(".wod5e-mage-vathra-carta-lettura") ?? carta;

  const play = bottone(doc, "wod5e-mage-vathra-carta-play", "fa-solid fa-play", localize("WOD5E_MAGE.Vathra.Ascolta"));
  play.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    diLettura(dati.romanizzazione);
  });
  riga.append(play);

  const capiscono = dati.capiscono ?? [];
  const puoCambiare = Boolean(user?.isGM) || Boolean(autoreId && user?.id === autoreId);
  const giocatori = puoCambiare ? tuttiGliUtenti().filter((u) => !u.isGM && u.id !== autoreId) : [];
  let rigaChi = null;
  if (giocatori.length) {
    const quanti = capiscono.filter((id) => giocatori.some((u) => u.id === id)).length;
    const tasto = bottone(doc, "wod5e-mage-vathra-carta-chi-tasto", "fa-solid fa-user-check", localize("WOD5E_MAGE.Vathra.Carta.Capiscono"));
    tasto.innerHTML += `<span>${quanti}</span>`;
    riga.append(tasto);
    rigaChi = doc.createElement("div");
    rigaChi.className = "wod5e-mage-vathra-carta-chi";
    const aperta = chiAperti.has(message.id);
    rigaChi.hidden = !aperta;
    tasto.setAttribute("aria-expanded", String(aperta));
    tasto.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      rigaChi.hidden = !rigaChi.hidden;
      tasto.setAttribute("aria-expanded", String(!rigaChi.hidden));
      if (rigaChi.hidden) chiAperti.delete(message.id); else chiAperti.add(message.id);
    });
    for (const u of giocatori) {
      const acceso = capiscono.includes(u.id);
      const chip = doc.createElement("button");
      chip.type = "button";
      chip.className = `wod5e-mage-vathra-chip${acceso ? " scelto" : ""}`;
      chip.dataset.user = u.id;
      chip.setAttribute("aria-pressed", String(acceso));
      chip.textContent = u.name;
      if (u.character?.name) chip.title = u.character.name;
      chip.addEventListener("click", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        chip.disabled = true;
        chiAperti.add(message.id);
        await message.update({ [`flags.${MODULE_ID}.${VATHRA_FLAG}.capiscono`]: toggleCapisce(capiscono, u.id) }).catch(() => {
          chip.disabled = false;
        });
      });
      rigaChi.append(chip);
    }
  }

  if (capisce({ userId: user?.id, isGM: Boolean(user?.isGM), autoreId, capiscono })) {
    const senso = doc.createElement("div");
    senso.className = "wod5e-mage-vathra-senso";
    senso.innerHTML = `<i class="fa-solid fa-eye" aria-hidden="true"></i> `;
    const testo = doc.createElement("span");
    testo.textContent = dati.italiano ?? "";
    senso.append(testo);
    if (dati.glossa) senso.title = dati.glossa;
    carta.append(senso);
  }
  if (rigaChi) carta.append(rigaChi);
  return true;
}

/* ------------------------------------------------------------------ */
/*  La finestra                                                        */
/* ------------------------------------------------------------------ */

export class VathraTraduttore extends HandlebarsApplicationMixin(ApplicationV2) {
  /**
   * La finestra, una sola per client. Chiusa e riaperta resta la stessa: la
   * frase, le manopole, la mano e chi capisce restano come li hai lasciati.
   */
  static aperto = null;

  #testo = "";
  #opzioni = { ...OPZIONI_BASE };
  #mano = "filata";
  #pagina = "traduttore";
  #capiscono = new Set();
  #parola = "fuoco";
  #filtro = "";
  /** I gruppi del frasario aperti prima di una ricerca: tornano così quando la casella si svuota. */
  #apertiPrima = null;

  constructor(options = {}) {
    super({ id: "wod5e-mage-vathra", ...options });
  }

  static DEFAULT_OPTIONS = {
    classes: ["wod5e-mage", "wod5e-mage-vathra"],
    window: {
      title: "WOD5E_MAGE.Vathra.Titolo",
      icon: "fa-solid fa-language",
      resizable: true,
      contentClasses: ["wod5e-mage-vathra-contenuto"]
    },
    position: { width: 560, height: 520 },
    actions: {
      pagina: VathraTraduttore.#onPagina,
      gettone: VathraTraduttore.#onGettone,
      mano: VathraTraduttore.#onMano,
      ascolta: VathraTraduttore.#onAscolta,
      copia: VathraTraduttore.#onCopia,
      capisce: VathraTraduttore.#onCapisce,
      manda: VathraTraduttore.#onManda,
      frase: VathraTraduttore.#onFrase,
      fraseAscolta: VathraTraduttore.#onFraseAscolta,
      suono: VathraTraduttore.#onSuono
    }
  };

  static PARTS = {
    corpo: { template: TEMPLATE_FINESTRA, scrollable: [".wod5e-mage-vathra-pagina"] }
  };

  /** Apre il traduttore (o lo porta davanti); con un testo, lo mette nella casella. */
  static async apri(testo = "") {
    const app = VathraTraduttore.aperto ?? new VathraTraduttore();
    VathraTraduttore.aperto = app;
    if (testo) app.caricaTesto(testo);
    await app.render({ force: true });
    app.bringToFront?.();
    return app;
  }

  get testo() { return this.#testo; }
  get opzioni() { return { ...this.#opzioni }; }
  get mano() { return this.#mano; }
  get pagina() { return this.#pagina; }
  get capiscono() { return [...this.#capiscono]; }

  /** Un testo nuovo nella casella, sulla pagina del Traduttore. */
  caricaTesto(testo, opzioni = null) {
    this.#testo = String(testo ?? "");
    if (opzioni) this.#opzioni = normalizzaOpzioni(opzioni);
    this.#pagina = "traduttore";
    if (this.rendered) this.#riempiTraduttore();
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const uscita = traduciTesto(this.#testo, this.#opzioni);
    uscita.leggeTitolo = titoloLegge(uscita.legge);
    const sciolta = this.#mano === "sciolta";
    const r = radice(this.#parola);
    return Object.assign(context, {
      pagina: this.#pagina,
      pagine: PAGINE.map((id) => ({ id, label: localize(`WOD5E_MAGE.Vathra.Pagine.${id}`), attiva: id === this.#pagina })),
      testo: this.#testo,
      uscita,
      sciolta,
      manoAltra: localize(sciolta ? "WOD5E_MAGE.Vathra.Mano.PassaFilata" : "WOD5E_MAGE.Vathra.Mano.PassaSciolta"),
      gettoni: statoGettoni(this.#testo, this.#opzioni).map((g) => (g.sep ? g : {
        ...g,
        label: localize(`WOD5E_MAGE.Vathra.Gettoni.${g.k}.${g.v}`),
        eco: g.eco,
        ecoLabel: g.eco ? localize("WOD5E_MAGE.Vathra.Gettoni.Eco") : ""
      })),
      manopole: MANOPOLE_TENDINA.map((k) => [k, MANOPOLE[k]]).map(([k, valori]) => ({
        k,
        label: localize(`WOD5E_MAGE.Vathra.Manopole.${k}.Nome`),
        scelte: valori.map((v) => ({ v, label: localize(`WOD5E_MAGE.Vathra.Manopole.${k}.${v}`), scelto: this.#opzioni[k] === v }))
      })),
      giocatori: giocatoriDaAccendere(this.#capiscono),
      parlaLabel: format("WOD5E_MAGE.Vathra.MandaCome", { nome: nomeDiChiParla() }),
      isGM: Boolean(game.user?.isGM),
      parola: this.#parola,
      radiceHtml: radiceHtml(r),
      regole: REGOLE,
      alfabeto: alfabetoConSuoni(),
      filtro: this.#filtro,
      frasario: frasarioTradotto().map((g, n) => {
        const frasi = g.frasi.map((f) => ({ ...f, nascosta: !fraseCorrisponde(f.cerca, this.#filtro) }));
        const trovate = frasi.some((f) => !f.nascosta);
        const cercando = Boolean(this.#filtro.trim());
        return { ...g, frasi, aperto: cercando ? trovate : n === 0, nascosto: cercando && !trovate };
      })
    });
  }

  _onRender(context, options) {
    super._onRender?.(context, options);
    const root = this.element;
    if (!root) return;
    try {
      root.classList.toggle(TEMA_CLASSE, isChiaro(game.settings.get(MODULE_ID, TEMA_SETTING)));
    } catch {
      /* il tema non è registrato (prove) */
    }
    const testo = root.querySelector("textarea[name=testo]");
    testo?.addEventListener("input", (event) => {
      this.#testo = event.currentTarget.value;
      this.#aggiornaUscita();
    });
    // Appena aperto si scrive subito: il cursore sta nella casella.
    if (options?.isFirstRender && this.#pagina === "traduttore") testo?.focus?.();
    for (const select of root.querySelectorAll("select[data-manopola]")) {
      select.addEventListener("change", (event) => {
        this.#opzioni = normalizzaOpzioni({ ...this.#opzioni, [event.currentTarget.dataset.manopola]: event.currentTarget.value });
        this.#aggiornaUscita();
      });
    }
    root.querySelector("input[name=parola]")?.addEventListener("input", (event) => {
      this.#parola = event.currentTarget.value;
      const box = root.querySelector("[data-ruolo=radice]");
      if (box) box.innerHTML = radiceHtml(radice(this.#parola));
    });
    root.querySelector("input[name=filtro]")?.addEventListener("input", (event) => {
      this.#filtro = event.currentTarget.value;
      this.#filtraFrasario();
    });
    // Le frasi si prendono anche da tastiera: Invio o spazio sulla riga.
    for (const riga of root.querySelectorAll(".wod5e-mage-vathra-frase")) {
      riga.addEventListener("keydown", (event) => {
        if (event.target !== riga || (event.key !== "Enter" && event.key !== " ")) return;
        event.preventDefault();
        riga.click();
      });
    }
  }

  /** Il nome di chi parla, quando si sceglie un altro token. */
  aggiornaParla() {
    const box = this.element?.querySelector?.("[data-ruolo=parla]");
    if (box) box.textContent = format("WOD5E_MAGE.Vathra.MandaCome", { nome: nomeDiChiParla() });
  }

  /** Riscrive la traduzione senza render: il cursore resta dov'è. */
  #aggiornaUscita() {
    const root = this.element;
    if (!root) return;
    const uscita = traduciTesto(this.#testo, this.#opzioni);
    // Come si legge e la glossa stanno nel suggerimento (title, testo semplice).
    const metti = (ruolo, valore, suggerimento) => {
      const box = root.querySelector(`[data-ruolo=${ruolo}]`);
      if (!box) return;
      box.textContent = valore;
      box.title = suggerimento;
    };
    metti("glifi", uscita.glifi, uscita.glossa);
    metti("roman", uscita.romanizzazione, titoloLegge(uscita.legge));
    root.querySelector("[data-ruolo=uscita]")?.classList.toggle("vuota", uscita.vuoto);
    const manda = root.querySelector("[data-action=manda]");
    if (manda) manda.disabled = uscita.vuoto;
    const stato = statoGettoni(this.#testo, this.#opzioni).filter((g) => !g.sep);
    for (const g of stato) {
      const bottone = root.querySelector(`[data-action=gettone][data-k="${g.k}"][data-v="${g.v}"]`);
      if (!bottone) continue;
      bottone.classList.toggle("acceso", g.acceso);
      bottone.classList.toggle("eco", g.eco);
      bottone.setAttribute("aria-pressed", String(g.acceso));
      bottone.title = g.eco ? localize("WOD5E_MAGE.Vathra.Gettoni.Eco") : "";
    }
    for (const select of root.querySelectorAll("select[data-manopola]")) {
      const valore = this.#opzioni[select.dataset.manopola];
      if (valore !== undefined && select.value !== valore) select.value = valore;
    }
  }

  /** Dopo una frase caricata: la casella, le manopole, la pagina del Traduttore. */
  #riempiTraduttore() {
    const root = this.element;
    if (!root) return;
    const casella = root.querySelector("textarea[name=testo]");
    if (casella) casella.value = this.#testo;
    this.#mostraPagina();
    this.#aggiornaUscita();
    casella?.focus?.();
  }

  #mostraPagina() {
    const root = this.element;
    if (!root) return;
    for (const bottone of root.querySelectorAll("[data-action=pagina]")) {
      const attiva = bottone.dataset.pagina === this.#pagina;
      bottone.classList.toggle("attiva", attiva);
      bottone.setAttribute("aria-selected", String(attiva));
    }
    for (const sezione of root.querySelectorAll("section[data-pagina]")) {
      sezione.classList.toggle("attiva", sezione.dataset.pagina === this.#pagina);
    }
  }

  #filtraFrasario() {
    const root = this.element;
    if (!root) return;
    const cercando = Boolean(this.#filtro.trim());
    const gruppi = [...root.querySelectorAll(".wod5e-mage-vathra-gruppo")];
    if (cercando && !this.#apertiPrima) this.#apertiPrima = new Set(gruppi.filter((g) => g.open).map((g) => g.dataset.gruppo));
    for (const gruppo of gruppi) {
      let visibili = 0;
      for (const riga of gruppo.querySelectorAll(".wod5e-mage-vathra-frase")) {
        const si = fraseCorrisponde(riga.dataset.cerca, this.#filtro);
        riga.hidden = !si;
        if (si) visibili += 1;
      }
      gruppo.hidden = visibili === 0;
      if (cercando) gruppo.open = visibili > 0;
      else if (this.#apertiPrima) gruppo.open = this.#apertiPrima.has(gruppo.dataset.gruppo);
    }
    if (!cercando) this.#apertiPrima = null;
  }

  static #onPagina(event, target) {
    event?.preventDefault?.();
    const pagina = target?.dataset?.pagina;
    if (!PAGINE.includes(pagina)) return;
    this.#pagina = pagina;
    this.#mostraPagina();
  }

  static #onGettone(event, target) {
    event?.preventDefault?.();
    this.#opzioni = toggleGettone(this.#opzioni, target?.dataset?.k, target?.dataset?.v);
    this.#aggiornaUscita();
  }

  static #onMano(event) {
    event?.preventDefault?.();
    this.#mano = this.#mano === "sciolta" ? "filata" : "sciolta";
    const sciolta = this.#mano === "sciolta";
    const root = this.element;
    root?.querySelector(".wod5e-mage-vathra-corpo")?.classList.toggle("mano-sciolta", sciolta);
    const bottone = root?.querySelector("[data-ruolo=mano]");
    if (bottone) {
      const testo = localize(sciolta ? "WOD5E_MAGE.Vathra.Mano.PassaFilata" : "WOD5E_MAGE.Vathra.Mano.PassaSciolta");
      bottone.dataset.tooltip = testo;
      bottone.setAttribute("aria-label", testo);
      bottone.classList.toggle("acceso", sciolta);
    }
  }

  static #onAscolta(event) {
    event?.preventDefault?.();
    diLettura(traduciTesto(this.#testo, this.#opzioni).romanizzazione);
  }

  static async #onCopia(event, target) {
    event?.preventDefault?.();
    const uscita = traduciTesto(this.#testo, this.#opzioni);
    const cosa = target?.dataset?.cosa;
    const testo = cosa === "roman" ? uscita.romanizzazione : cosa === "legge" ? uscita.legge : uscita.glifi;
    if (!testo) return;
    try {
      await (game.clipboard?.copyPlainText?.(testo) ?? navigator.clipboard.writeText(testo));
      ui.notifications?.info(localize("WOD5E_MAGE.Vathra.Copiato"));
    } catch {
      ui.notifications?.warn(localize("WOD5E_MAGE.Vathra.CopiaNo"));
    }
  }

  static #onCapisce(event, target) {
    event?.preventDefault?.();
    const id = target?.dataset?.user;
    if (!id) return;
    this.#capiscono = new Set(toggleCapisce([...this.#capiscono], id));
    const acceso = this.#capiscono.has(id);
    target.classList.toggle("scelto", acceso);
    target.setAttribute("aria-pressed", String(acceso));
  }

  static async #onManda(event, target) {
    event?.preventDefault?.();
    if (target) target.disabled = true;
    try {
      const message = await mandaVathra({ testo: this.#testo, opzioni: this.#opzioni, mano: this.#mano, capiscono: [...this.#capiscono] });
      if (message) ui.notifications?.info(localize("WOD5E_MAGE.Vathra.Mandato"));
    } finally {
      if (target) target.disabled = traduciTesto(this.#testo, this.#opzioni).vuoto;
    }
  }

  static #onFrase(event, target) {
    event?.preventDefault?.();
    const frase = fraseDelFrasario(target?.dataset?.gruppo, target?.dataset?.indice);
    if (!frase) return;
    this.caricaTesto(frase.it, opzioniFrase(frase));
  }

  static #onFraseAscolta(event, target) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    const frase = fraseDelFrasario(target?.dataset?.gruppo, target?.dataset?.indice);
    if (frase) diLettura(traduciTesto(frase.it, opzioniFrase(frase)).romanizzazione);
  }

  static #onSuono(event, target) {
    event?.preventDefault?.();
    const indice = Number(target?.dataset?.indice);
    if (Number.isInteger(indice) && SUONI[indice]) suonaFile(`L${indice}.mp3`);
  }
}

/** La tavola dei Modi di una radice (HTML: si riscrive a ogni tasto nella casella). */
export function radiceHtml(r) {
  if (!r) return "";
  const fonte = localize(r.dalLessico ? "WOD5E_MAGE.Vathra.Radice.DalLessico" : "WOD5E_MAGE.Vathra.Radice.DallaMutazione");
  const righe = r.modi.map((m) => `<tr><td class="modo" title="${escape(m.senso)}">${escape(m.nome)}</td>`
    + `<td class="vathra" title="${escape(m.legge)}">${escape(m.vathra)}</td>`
    + `<td class="glifi">${escape(m.glifi)}</td></tr>`).join("");
  return `<div class="wod5e-mage-vathra-radice" title="${escape(fonte)}">${escape(r.radice)}</div>`
    + `<table class="wod5e-mage-vathra-modi"><tbody>${righe}</tbody></table>`;
}

/** La tavola dei segni: a chi ha un suono registrato va il ▶ (voce/L<indice>.mp3). */
export function alfabetoConSuoni() {
  const perSegno = new Map(SUONI.map((suono, indice) => [suono.seg.replace(/'/g, "\u02BC"), { indice, parola: suono.parola }]));
  return LETTERE.map((g) => ({
    titolo: g.titolo,
    lettere: g.lettere.map(([glifo, roman, nota]) => ({ glifo, roman, nota, suono: perSegno.get(roman) ?? null }))
  }));
}

/** Apre il traduttore; con un testo, lo porta dentro. */
export function apriVathra(testo = "") {
  return VathraTraduttore.apri(testo);
}

/**
 * In init: le due mani fra i caratteri di Foundry (diari, Testo sulla mappa),
 * il tasto nella barra dei token, il comando in chat, la carta.
 */
export function registraVathra() {
  globalThis.CONFIG.fontDefinitions ??= {};
  globalThis.CONFIG.fontDefinitions["Vathra Filata"] = { editor: true, fonts: [{ urls: [`${CARTELLA}/VathraFilata-Regular.ttf`] }] };
  globalThis.CONFIG.fontDefinitions["Vathra Sciolta"] = { editor: true, fonts: [{ urls: [`${CARTELLA}/VathraSciolta-Regular.ttf`] }] };

  Hooks.on("getSceneControlButtons", (controls) => {
    const tokens = controls?.tokens ?? controls?.token;
    if (!tokens?.tools) return;
    tokens.tools.vathra = {
      name: "vathra",
      title: "WOD5E_MAGE.Vathra.Controllo",
      icon: "fa-solid fa-language",
      order: Object.keys(tokens.tools).length + 1,
      button: true,
      visible: true,
      onChange: () => apriVathra()
    };
  });

  Hooks.on("chatMessage", (_chatLog, messaggio) => {
    const comando = leggiComando(messaggio);
    if (!comando) return undefined;
    apriVathra(comando.testo);
    return false;
  });

  Hooks.on("renderChatMessageHTML", (message, html) => {
    decoraCartaVathra(message, html);
  });

  Hooks.on("controlToken", () => VathraTraduttore.aperto?.aggiornaParla());

  // La voce del computer carica l'elenco delle voci alla prima richiesta.
  Hooks.once("ready", () => {
    try {
      globalThis.speechSynthesis?.getVoices?.();
    } catch {
      /* niente voce */
    }
  });
}

