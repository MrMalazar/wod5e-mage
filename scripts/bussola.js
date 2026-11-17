import { MODULE_ID } from "./constants.js";
import { getMagickBalance, MAGICK_TRACK_MAX } from "./magick-balance.js";
import { PERSONAGGIO_TABLES, prepareConvictions } from "./personaggio-extra.js";

/**
 * La Bussola sul tiro (il Sistema; la scala delle Convinzioni, Blue,
 * 16/11/2026; i premi a scelta, 17/11). Su qualunque tiro, Magick o
 * Abilità, il giocatore dichiara che il gesto segue la sua Bussola, e il
 * Narratore dà l'ok. Il premio lo sceglie lui: se serve una Convinzione,
 * 2 dadi in più, fuori dal tetto, oppure a tiro fatto 1 punto di
 * Quintessenza; se segue il Desiderio, a tiro fatto 1 punto di Volontà (un
 * danno mentale superficiale in meno: nel Sistema la Volontà è il ritiro
 * che costa quel danno) oppure 1 punto di Quintessenza; l'Ambizione dà lo
 * stesso, e la sua Volontà toglie anche un danno mentale aggravato. Ogni
 * premio vale una volta per scena, ognuno per conto suo: uno dalle
 * Convinzioni, uno dall'Ambizione, uno dal Desiderio. Il Cambio scena li
 * riarma (il flag di scena è quello di prima, ora con le tre voci).
 * Compiere il Desiderio o l'Ambizione dà Esperienza (2 e 5 punti): quella
 * la assegna il Narratore, fuori dal riquadro.
 *
 * Le Convinzioni vanno a scala. A favore: dalla seconda volta che il
 * personaggio serve la stessa Convinzione nella sessione, con un gesto
 * diverso dalla volta prima (lo dice il Narratore), il tiro prende anche
 * difficoltà −1; a ogni Nuova sessione si riparte dalla prima volta.
 * Contro: la prima volta 2 dadi in meno, la seconda anche difficoltà +1,
 * la terza, con gli stessi malus, la Convinzione si spegne. Le volte
 * contro si contano nella stessa storia (la Nuova storia le azzera), e
 * tornare a servire la Convinzione le azzera. Contro non ha il limite
 * della scena: conta ogni volta.
 *
 * Nella bandiera `bussolaScala`: `favore` (le volte che ogni Convinzione è
 * stata servita nella sessione), `contro` (le volte che è stata
 * attraversata nella storia) e `scena` (le Convinzioni già attraversate in
 * questa scena: l'atto della Saggezza che tradisce la stessa Convinzione
 * non la conta una seconda volta).
 */

export const BUSSOLA_SCENE_FLAG = "convinzioneScena";
export const BUSSOLA_SCALA_FLAG = "bussolaScala";
/** A favore: 2 dadi fuori dal tetto, oppure 1 punto di Quintessenza a tiro fatto. */
export const BUSSOLA_DADI = 2;
/** Contro: 2 dadi in meno; dalla seconda volta anche difficoltà +1. */
export const BUSSOLA_MALUS_DADI = 2;
/** Alla terza volta contro, la Convinzione si spegne. */
export const BUSSOLA_SPEGNE = 3;
export const BUSSOLA_VERSI = Object.freeze(["favore", "contro"]);
export const BUSSOLA_MODI = Object.freeze(["dadi", "volonta", "quintessenza"]);

const VOCE_CONVINZIONE = "convinzione:";

const NESSUN_EFFETTO = Object.freeze({
  attiva: false,
  verso: "",
  voce: "",
  riga: "",
  label: "",
  testo: "",
  modo: "",
  dadi: 0,
  difficolta: 0,
  volonta: 0,
  aggravato: false,
  quintessenza: 0,
  volta: 0,
  gesto: false,
  spegne: false
});

function clean(value) {
  return String(value ?? "").trim();
}

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

/** Le voci della Bussola: l'Ambizione, il Desiderio e le Convinzioni scritte, attive o spente. */
export function prepareBussolaChoice(actor) {
  const localize = globalThis.game?.i18n?.localize?.bind(globalThis.game.i18n) ?? ((key) => key);
  const options = [];
  const ambition = clean(actor.system?.headers?.ambition);
  const desire = clean(actor.system?.headers?.desire);
  if (ambition) options.push({ id: "ambizione", kind: "ambizione", rowId: "", text: ambition, spenta: false, label: `${localize("WOD5E_MAGE.Bussola.Ambition")}: ${ambition}` });
  if (desire) options.push({ id: "desiderio", kind: "desiderio", rowId: "", text: desire, spenta: false, label: `${localize("WOD5E_MAGE.Bussola.Desire")}: ${desire}` });
  for (const row of prepareConvictions(actor)) {
    const text = clean(row.text);
    if (!text) continue;
    const group = [...(row.groups ?? []), ...(row.credos ?? [])].find((entry) => entry.selected);
    options.push({
      id: `${VOCE_CONVINZIONE}${row.id}`,
      kind: "convinzione",
      rowId: row.id,
      text,
      spenta: Boolean(row.spenta),
      label: `${localize("WOD5E_MAGE.Bussola.Conviction")}${group ? ` (${group.label})` : ""}: ${text}`
    });
  }
  const usate = usateDellaScena(actor.getFlag(MODULE_ID, BUSSOLA_SCENE_FLAG));
  return { options, usate, used: Object.values(usate).some(Boolean) };
}

/**
 * Le voci che hanno già dato il premio in questa scena (Blue, 17/11): le
 * Convinzioni, l'Ambizione e il Desiderio, una volta per scena ciascuno. Il
 * segno di prima della 1.44.0, `used`, vale per le Convinzioni.
 */
export function usateDellaScena(stored) {
  const flag = stored && typeof stored === "object" ? stored : {};
  return { convinzione: Boolean(flag.convinzione || flag.used), ambizione: Boolean(flag.ambizione), desiderio: Boolean(flag.desiderio) };
}

/** I conti di una bandiera: solo gli interi sopra zero. */
function contatori(stored) {
  const out = {};
  for (const [id, value] of Object.entries(stored ?? {})) {
    const n = count(value);
    if (id && n > 0) out[id] = n;
  }
  return out;
}

/** La scala com'è nella bandiera, pulita: le volte a favore e contro per Convinzione, e le attraversate della scena. */
export function normalizeScala(stored) {
  const scena = {};
  for (const [id, value] of Object.entries(stored?.scena ?? {})) {
    if (id && value === true) scena[id] = true;
  }
  return { favore: contatori(stored?.favore), contro: contatori(stored?.contro), scena };
}

/** La Convinzione di una voce («convinzione:<id>»); vuoto per l'Ambizione e il Desiderio. */
export function rigaDellaVoce(voce) {
  const text = clean(voce);
  return text.startsWith(VOCE_CONVINZIONE) ? text.slice(VOCE_CONVINZIONE.length) : "";
}

/**
 * I premi fra cui si sceglie (Blue, 17/11): con una Convinzione 2 dadi o
 * 1 Quintessenza; con l'Ambizione o il Desiderio 1 Volontà o 1 Quintessenza.
 */
export function modiDellaVoce(voce) {
  return rigaDellaVoce(voce) ? ["dadi", "quintessenza"] : ["volonta", "quintessenza"];
}

/**
 * La scelta sul tiro, pulita, o null: la voce, il verso (a favore o
 * contro; contro vale solo per una Convinzione), il modo (il premio, solo
 * a favore: quelli della voce, e il primo se manca) e il gesto diverso,
 * che conta solo a favore di una Convinzione.
 */
export function normalizeBussolaTiro(value) {
  if (!value || typeof value !== "object") return null;
  const voce = clean(value.voce);
  const riga = rigaDellaVoce(voce);
  if (!riga && voce !== "ambizione" && voce !== "desiderio") return null;
  const verso = BUSSOLA_VERSI.includes(value.verso) ? value.verso : "favore";
  if (verso === "contro") return riga ? { voce, verso, modo: "", gesto: false } : null;
  const modi = modiDellaVoce(voce);
  const modo = modi.includes(value.modo) ? value.modo : modi[0];
  return { voce, verso, modo, gesto: Boolean(riga) && Boolean(value.gesto) };
}

/**
 * L'effetto della scelta sul tiro, dalla scala del personaggio. A favore:
 * il premio scelto (2 dadi, o a tiro fatto 1 Volontà o 1 Quintessenza) e,
 * dalla seconda volta nella sessione che si serve la stessa Convinzione,
 * col gesto diverso, difficoltà −1; se quella voce ha già dato in questa
 * scena non vale. Contro: 2 dadi in meno, dalla seconda volta
 * difficoltà +1, alla terza la Convinzione si spegne. Una voce che non c'è
 * più, o una Convinzione spenta, non vale. `volta` dice quale volta è;
 * `aggravato` che la Volontà, dell'Ambizione, toglie anche un aggravato.
 */
export function effettoBussola(value, { voci = [], usate = {}, scala = null } = {}) {
  const scelta = normalizeBussolaTiro(value);
  if (!scelta) return { ...NESSUN_EFFETTO };
  const voce = voci.find((option) => option.id === scelta.voce);
  if (!voce || voce.spenta) return { ...NESSUN_EFFETTO };
  const stato = normalizeScala(scala);
  const riga = rigaDellaVoce(scelta.voce);
  const base = { ...NESSUN_EFFETTO, attiva: true, verso: scelta.verso, voce: scelta.voce, riga, label: voce.label, testo: voce.text ?? "" };
  if (scelta.verso === "contro") {
    const volta = (stato.contro[riga] ?? 0) + 1;
    return { ...base, dadi: -BUSSOLA_MALUS_DADI, difficolta: volta >= 2 ? 1 : 0, volta, spegne: volta >= BUSSOLA_SPEGNE };
  }
  if (usate?.[voce.kind]) return { ...NESSUN_EFFETTO };
  const volta = riga ? (stato.favore[riga] ?? 0) + 1 : 1;
  const gesto = Boolean(riga) && volta >= 2 && scelta.gesto;
  return {
    ...base,
    modo: scelta.modo,
    dadi: scelta.modo === "dadi" ? BUSSOLA_DADI : 0,
    volonta: scelta.modo === "volonta" ? 1 : 0,
    aggravato: scelta.modo === "volonta" && voce.kind === "ambizione",
    quintessenza: scelta.modo === "quintessenza" ? 1 : 0,
    difficolta: gesto ? -1 : 0,
    volta,
    gesto
  };
}

/** Quello che effettoBussola e i menù chiedono, letto dalla scheda: le voci, quelle già servite nella scena, la scala. */
export function statoBussola(actor) {
  const choice = prepareBussolaChoice(actor);
  return { voci: choice.options, usate: choice.usate, scala: normalizeScala(actor?.getFlag?.(MODULE_ID, BUSSOLA_SCALA_FLAG)) };
}

/** Quale volta contro, a parole: la prima, la seconda, la terza. */
export function voltaContro(volta, localize = (key) => key) {
  return localize(`WOD5E_MAGE.Bussola.Volte.${Math.min(Math.max(count(volta), 1), BUSSOLA_SPEGNE)}`);
}

/** Cosa costa andare contro, la volta che sarebbe: 2 dadi in meno, poi anche difficoltà +1, alla terza si spegne. */
export function effettoContro(volta, localize = (key) => key) {
  const n = Math.min(Math.max(count(volta), 1), BUSSOLA_SPEGNE);
  return localize(`WOD5E_MAGE.Bussola.Contro.${n}`);
}

/**
 * Il primo menù del tasto Bussola: per cosa vale il tiro. A favore
 * l'Ambizione, il Desiderio e le Convinzioni attive, ognuna finché la sua
 * voce non ha già dato in questa scena; contro le Convinzioni attive, con
 * quello che costa la volta che sarebbe; in fondo «Nessuna». Lo stato di
 * ogni voce è «verso|voce». Senza niente da scegliere, il menù è vuoto.
 */
export function menuBussolaVoci(stato, localize = (key) => key, format = (key) => key) {
  const attive = (stato?.voci ?? []).filter((voce) => !voce.spenta);
  const scala = normalizeScala(stato?.scala);
  const out = [];
  for (const voce of attive) {
    if (stato?.usate?.[voce.kind]) continue;
    const chiave = voce.kind === "convinzione" ? "Serve" : (voce.kind === "ambizione" ? "Ambizione" : "Desiderio");
    out.push({ state: `favore|${voce.id}`, text: format(`WOD5E_MAGE.Bussola.Menu.${chiave}`, { testo: voce.text }), glyph: null });
  }
  for (const voce of attive) {
    if (voce.kind !== "convinzione") continue;
    const volta = (scala.contro[voce.rowId] ?? 0) + 1;
    out.push({ state: `contro|${voce.id}`, text: format("WOD5E_MAGE.Bussola.Menu.Contro", { testo: voce.text, effetto: effettoContro(volta, localize) }), glyph: null });
  }
  if (out.length) out.push({ state: "", text: localize("WOD5E_MAGE.Bussola.Menu.Nessuna"), glyph: null });
  return out;
}

/**
 * Il secondo menù, a favore: il premio. Con una Convinzione 2 dadi o 1
 * Quintessenza, e dalla seconda volta che il personaggio la serve nella
 * sessione anche le stesse due col gesto diverso, che aggiungono
 * difficoltà −1; con l'Ambizione o il Desiderio 1 Volontà o 1
 * Quintessenza. Lo stato è «modo», o «modo|gesto».
 */
export function menuBussolaModi(voce, stato, localize = (key) => key) {
  const riga = rigaDellaVoce(voce);
  const scala = normalizeScala(stato?.scala);
  const modi = modiDellaVoce(voce);
  const out = modi.map((modo) => ({ state: modo, text: localize(`WOD5E_MAGE.Bussola.Menu.Modi.${chiaveDelModo(voce, modo)}`), glyph: null }));
  if (riga && (scala.favore[riga] ?? 0) >= 1) {
    for (const modo of modi) out.push({ state: `${modo}|gesto`, text: localize(`WOD5E_MAGE.Bussola.Menu.Gesto.${modo}`), glyph: null });
  }
  return out;
}

/** La chiave delle parole di un premio: la Volontà dell'Ambizione toglie anche un aggravato, e lo dice. */
function chiaveDelModo(voce, modo) {
  return clean(voce) === "ambizione" && modo === "volonta" ? "volontaAmbizione" : modo;
}

/** La scelta dai due menù: «verso|voce», poi (a favore) «modo» o «modo|gesto». */
export function sceltaDalMenu(voceStato, modoStato = "") {
  const [verso, ...resto] = String(voceStato ?? "").split("|");
  const [modo, gesto] = String(modoStato ?? "").split("|");
  return normalizeBussolaTiro({ voce: resto.join("|"), verso, modo, gesto: gesto === "gesto" });
}

/** Lo stato del primo menù per una scelta già fatta: la spunta sulla voce in uso. */
export function statoDelMenu(value) {
  const scelta = normalizeBussolaTiro(value);
  return scelta ? `${scelta.verso}|${scelta.voce}` : "";
}

/**
 * Le parole della scelta nel riquadro e sulla carta: il nome sul tasto
 * (corto, perché la riga delle opzioni è stretta: «Bussola», o «Contro»),
 * il nome della riga nelle colonne e la nota lunga (il sorvolo e la riga
 * sotto i dadi), che dice la voce, cosa si prende o quanto costa.
 */
export function testoBussola(effetto, localize = (key) => key, format = (key) => key) {
  if (!effetto?.attiva) return { tasto: localize("WOD5E_MAGE.Tiro.Bussola"), riga: "", nota: "" };
  if (effetto.verso === "contro") {
    return {
      tasto: localize("WOD5E_MAGE.Tiro.BussolaContro"),
      riga: localize("WOD5E_MAGE.Tiro.BussolaControRiga"),
      nota: format("WOD5E_MAGE.Bussola.Nota.Contro", { testo: effetto.testo, volta: voltaContro(effetto.volta, localize), effetto: effettoContro(effetto.volta, localize) })
    };
  }
  const chiave = effetto.riga ? "Serve" : (effetto.voce === "ambizione" ? "Ambizione" : "Desiderio");
  const cosa = localize(`WOD5E_MAGE.Bussola.Nota.${effetto.gesto ? "ModiGesto" : "Modi"}.${chiaveDelModo(effetto.voce, effetto.modo)}`);
  return {
    tasto: localize("WOD5E_MAGE.Tiro.Bussola"),
    riga: localize("WOD5E_MAGE.Tiro.Bussola"),
    nota: format(`WOD5E_MAGE.Bussola.Nota.${chiave}`, { testo: effetto.testo, cosa })
  };
}

/**
 * La Quintessenza della Bussola: a tiro fatto un punto risale sulla Ruota,
 * fino alle celle libere dal Paradosso. Torna il conto nuovo e se è salito.
 */
export function quintessenceAfterBussola(balance) {
  const taken = Math.max(Math.trunc(Number(balance?.paradox) || 0), Math.trunc(Number(balance?.floor) || 0), 0);
  const room = MAGICK_TRACK_MAX - taken;
  const current = Math.max(Math.trunc(Number(balance?.quintessence) || 0), 0);
  const next = Math.min(current + 1, room);
  return { quintessence: Math.max(next, Math.min(current, room)), gained: next > current };
}

/**
 * Il punto di Volontà della Bussola: un danno mentale in meno sulla Salute.
 * Quella del Desiderio toglie un superficiale; quella dell'Ambizione anche
 * un aggravato, e se ce n'è uno toglie quello. Le caselle in debito del
 * Sacrificio non si curano, come nel Riposo. Torna il segno tolto (ms o
 * ma) e quanti ne restano, o null se non c'è niente da togliere.
 */
export function curaVolonta(salute, { aggravato = false } = {}) {
  const liberi = (segno) => count(salute?.[segno]) - Math.min(count(salute?.debito?.[segno]), count(salute?.[segno]));
  if (aggravato && liberi("ma") > 0) return { segno: "ma", resta: count(salute.ma) - 1 };
  if (liberi("ms") > 0) return { segno: "ms", resta: count(salute.ms) - 1 };
  return null;
}

/** Il percorso della Convinzione spenta nell'aggiornamento della scheda. */
export function spentaPath(riga) {
  return `flags.${MODULE_ID}.${PERSONAGGIO_TABLES.convictions}.${riga}.spenta`;
}

/**
 * L'aggiornamento della scheda a tiro fatto, puro. A favore: il segno della
 * scena e, per una Convinzione, una volta in più nella sessione e le volte
 * contro azzerate. Contro: il segno della Convinzione nella scena e una
 * volta in più nella storia; alla terza la Convinzione si spegne e il conto
 * riparte da capo.
 */
export function aggiornamentoBussola(effetto, scala = null) {
  const update = {};
  if (!effetto?.attiva) return update;
  const stato = normalizeScala(scala);
  const radice = `flags.${MODULE_ID}.${BUSSOLA_SCALA_FLAG}`;
  const riga = clean(effetto.riga);
  if (effetto.verso !== "contro") {
    // Il segno della scena per la voce che ha dato: le Convinzioni, l'Ambizione o il Desiderio.
    update[`flags.${MODULE_ID}.${BUSSOLA_SCENE_FLAG}.${riga ? "convinzione" : clean(effetto.voce)}`] = true;
    if (riga) {
      update[`${radice}.favore.${riga}`] = (stato.favore[riga] ?? 0) + 1;
      if (stato.contro[riga]) update[`${radice}.contro.-=${riga}`] = null;
    }
    return update;
  }
  if (!riga) return update;
  const volta = (stato.contro[riga] ?? 0) + 1;
  update[`${radice}.scena.${riga}`] = true;
  if (volta >= BUSSOLA_SPEGNE) {
    update[`${radice}.contro.-=${riga}`] = null;
    update[spentaPath(riga)] = true;
  } else {
    update[`${radice}.contro.${riga}`] = volta;
  }
  return update;
}

/**
 * L'atto della Saggezza che tradisce una Convinzione (wisdom.js): conta
 * come una volta contro, salvo che un tiro di questa scena l'abbia già
 * contata per la stessa Convinzione. Alla terza la spegne. Puro: torna
 * l'aggiornamento, se è contata, quale volta è e se si spegne.
 */
export function aggiornamentoTradimento(riga, scala = null) {
  const id = clean(riga);
  const stato = normalizeScala(scala);
  if (!id) return { update: {}, contata: false, volta: 0, spegne: false };
  if (stato.scena[id]) return { update: {}, contata: false, volta: stato.contro[id] ?? 0, spegne: false };
  const volta = (stato.contro[id] ?? 0) + 1;
  return { update: aggiornamentoBussola({ attiva: true, verso: "contro", riga: id }, stato), contata: true, volta, spegne: volta >= BUSSOLA_SPEGNE };
}

/**
 * A tiro fatto: la scala si aggiorna e arriva il premio che il giocatore
 * ha scelto, 1 Quintessenza sulla Ruota o 1 Volontà (un danno mentale in
 * meno, aggravato compreso per l'Ambizione). La Convinzione che si spegne
 * lo dice.
 */
export async function registraBussola(actor, effetto) {
  if (!effetto?.attiva || !actor?.isOwner) return null;
  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const update = aggiornamentoBussola(effetto, actor.getFlag(MODULE_ID, BUSSOLA_SCALA_FLAG));
  const quintessenza = effetto.verso === "favore" && effetto.quintessenza > 0;
  const volonta = effetto.verso === "favore" && effetto.volonta > 0;
  let gained = false;
  let cura = null;
  if (quintessenza) {
    const balance = getMagickBalance(actor);
    const next = quintessenceAfterBussola(balance);
    gained = next.gained;
    if (gained) update[`flags.${MODULE_ID}.magickBalance`] = { quintessence: next.quintessence, paradox: balance.paradox };
  }
  if (volonta) {
    // La Salute si legge da salute.js, che a sua volta legge questo file: l'import resta dentro la funzione.
    const { getSalute } = await import("./salute.js");
    cura = curaVolonta(getSalute(actor), { aggravato: effetto.aggravato });
    if (cura) update[`flags.${MODULE_ID}.salute.${cura.segno}`] = cura.resta;
  }
  if (Object.keys(update).length) await actor.update(update);
  if (quintessenza) ui.notifications.info(gained ? format("WOD5E_MAGE.Bussola.Gained", { testo: effetto.testo }) : localize("WOD5E_MAGE.Bussola.Full"));
  if (volonta) ui.notifications.info(cura ? format(`WOD5E_MAGE.Bussola.Volonta.${cura.segno}`, { testo: effetto.testo }) : localize("WOD5E_MAGE.Bussola.Volonta.Piena"));
  if (update[spentaPath(effetto.riga)]) ui.notifications.info(format("WOD5E_MAGE.Bussola.Spenta", { testo: effetto.testo }));
  return update;
}
