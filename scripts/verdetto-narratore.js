/**
 * Il verdetto del Narratore (Blue, 16/9 sera): quando un giocatore lancia
 * il tiro, al Narratore compare una finestra col tiro com'è (chi, cosa,
 * Riserva, Difficoltà, dadi) e parte un conto alla rovescia di cinque
 * secondi (Blue, 27/9: erano dieci). In quei secondi il Narratore può
 * alzare o abbassare la Difficoltà o i dadi; può anche cliccare OK e il
 * tiro parte subito. Se non tocca niente, allo scadere il tiro prosegue
 * com'era.
 *
 * Il giro passa dal socket del modulo: il giocatore manda la richiesta a
 * tutti i Narratori collegati (27/9: non più a uno solo), il primo che
 * risponde manda il verdetto e chiude la finestra agli altri, il giocatore
 * tira. Se non c'è un Narratore collegato, o chi tira è un Narratore, o il
 * giocatore ha spento «Dal Narratore» nel riquadro del Tiro, il tiro parte
 * senza fermarsi. Se nessuno risponde entro il tempo (i moduli spenti, la
 * finestra chiusa male), il tiro parte lo stesso.
 *
 * Le funzioni pure stanno sopra e si collaudano da sole; quelle che
 * parlano con Foundry (socket, finestra) stanno sotto.
 */
import { MODULE_ID } from "./constants.js";

/** I secondi del conto alla rovescia del Narratore (Blue, 27/9: cinque, non più dieci). */
export const VERDETTO_SECONDI = 5;
/** Quanto aspetta il giocatore prima di tirare da solo: il conto più un margine. */
export const VERDETTO_ATTESA_MS = (VERDETTO_SECONDI + 5) * 1000;
/** L'impostazione (per client) «Dal Narratore»: il tiro passa dal Narratore, o parte subito. */
export const TIRO_NARRATORE_SETTING = "tiroDalNarratore";
/** Il canale del modulo. */
export const SOCKET_NAME = `module.${MODULE_ID}`;
/** I due messaggi. */
export const TIPO_RICHIESTA = "tiro:richiesta";
export const TIPO_VERDETTO = "tiro:verdetto";

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

function delta(value) {
  return Math.trunc(Number(value) || 0);
}

/** I Narratori collegati che non sono chi tira: a tutti loro va la richiesta (Blue, 27/9). */
export function narratoriAttivi(users, user = null) {
  const lista = Array.isArray(users) ? users : Array.isArray(users?.contents) ? users.contents : Array.from(users ?? []);
  return lista.filter((u) => u && u.active && u.isGM && String(u.id) !== String(user?.id ?? ""));
}

/** A chi va un messaggio: la lista dei destinatari, sempre come stringhe. */
export function destinatari(payload) {
  return [].concat(payload?.to ?? []).map((id) => String(id ?? "")).filter(Boolean);
}

/** Il messaggio è per me? */
export function perMe(payload, me) {
  return Boolean(me) && destinatari(payload).includes(String(me));
}

/**
 * Serve il verdetto? Solo se chi tira lo vuole («Dal Narratore» acceso),
 * c'è almeno un Narratore collegato, e non è un Narratore a tirare.
 */
export function serveVerdetto({ user, narratori = [], scelto = true } = {}) {
  return Boolean(scelto) && Boolean(user?.id) && !user?.isGM && (narratori?.length ?? 0) > 0;
}

/** «Dal Narratore» (Blue, 27/9): la scelta di chi tira, per client; senza impostazione vale sì. */
export function dalNarratore() {
  try {
    const value = globalThis.game?.settings?.get?.(MODULE_ID, TIRO_NARRATORE_SETTING);
    return value === undefined || value === null ? true : Boolean(value);
  } catch {
    return true;
  }
}

/** Accende o spegne «Dal Narratore» per questo client. */
export async function scriviDalNarratore(value) {
  try {
    await globalThis.game?.settings?.set?.(MODULE_ID, TIRO_NARRATORE_SETTING, Boolean(value));
  } catch {
    /* senza l'impostazione registrata resta il valore di partenza */
  }
  return dalNarratore();
}

/** La richiesta che il giocatore manda ai Narratori (`to`: tutti i loro id). */
export function richiestaTiro({ id, from, to, actorId = "", actorName = "", title = "", magick = false, kind = "", pool = 0, difficulty = 0, successFrom = 6 } = {}) {
  return {
    type: TIPO_RICHIESTA,
    id: String(id ?? ""),
    from: String(from ?? ""),
    to: destinatari({ to }),
    actorId: String(actorId ?? ""),
    actorName: String(actorName ?? ""),
    title: String(title ?? ""),
    magick: Boolean(magick),
    kind: String(kind ?? ""),
    pool: count(pool),
    difficulty: count(difficulty),
    successFrom: count(successFrom) || 6
  };
}

/**
 * Il verdetto che il Narratore rimanda: la Difficoltà com'è adesso e i dadi
 * in più o in meno; `from` e `fromName` dicono quale Narratore ha risposto.
 */
export function verdettoTiro(richiesta, { difficulty, dice } = {}, { from = "", fromName = "" } = {}) {
  const nuova = difficulty === null || difficulty === undefined || difficulty === "" ? count(richiesta?.difficulty) : count(difficulty);
  const dadi = delta(dice);
  return {
    type: TIPO_VERDETTO,
    id: String(richiesta?.id ?? ""),
    from: String(from || destinatari(richiesta)[0] || ""),
    fromName: String(fromName ?? ""),
    to: String(richiesta?.from ?? ""),
    difficulty: nuova,
    dice: dadi,
    touched: nuova !== count(richiesta?.difficulty) || dadi !== 0
  };
}

/** I dadi che si tirano con questi numeri (la riserva meno la Difficoltà, mai sotto zero). */
export function dadiVerdetto({ pool = 0, difficulty = 0, dice = 0 } = {}) {
  return Math.max(count(pool) + delta(dice) - count(difficulty), 0);
}

/**
 * Il conto del tiro col verdetto sopra: la riserva prende i dadi del
 * Narratore, la Difficoltà è la sua. Senza verdetto (o senza ritocchi) il
 * conto torna com'era.
 */
export function applicaVerdetto(conto, verdetto) {
  if (!verdetto?.touched) return conto;
  const pool = Math.max(count(conto?.pool) + delta(verdetto.dice), 0);
  const difficulty = count(verdetto.difficulty);
  return {
    ...conto,
    pool,
    difficulty,
    dice: Math.max(pool - difficulty, 0),
    impossible: Math.max(pool - difficulty, 0) === 0,
    narratore: { difficultyBefore: count(conto?.difficulty), difficulty, dice: delta(verdetto.dice), name: String(verdetto.fromName ?? "") }
  };
}

/** La nota in carta: cosa ha toccato il Narratore (col nome, se più d'uno può rispondere), o niente. */
export function notaVerdetto(conto, format = (key, data) => `${key} ${JSON.stringify(data)}`) {
  const n = conto?.narratore;
  if (!n) return "";
  const parti = [];
  if (n.difficulty !== n.difficultyBefore) parti.push(format("WOD5E_MAGE.Verdetto.NoteDifficulty", { before: n.difficultyBefore, after: n.difficulty }));
  if (n.dice) parti.push(format("WOD5E_MAGE.Verdetto.NoteDice", { dice: `${n.dice > 0 ? "+" : ""}${n.dice}` }));
  if (!parti.length) return "";
  return n.name
    ? format("WOD5E_MAGE.Verdetto.NoteChi", { name: n.name, changes: parti.join(" · ") })
    : format("WOD5E_MAGE.Verdetto.Note", { changes: parti.join(" · ") });
}

/** I secondi che restano, da quando è partito il conto. */
export function secondiRimasti(startMs, nowMs, total = VERDETTO_SECONDI) {
  const passed = Math.floor((Number(nowMs) - Number(startMs)) / 1000);
  return Math.max(total - Math.max(passed, 0), 0);
}

/* ------------------------------------------------------------------ */
/* Foundry: il socket e la finestra.                                   */
/* ------------------------------------------------------------------ */

/** Le richieste in attesa di verdetto, per id: chi risolve e il timer di sicurezza. */
const inAttesa = new Map();
/** I personaggi con un tiro già mandato al Narratore: niente doppio clic. */
const attoriInAttesa = new Set();

/** Un tiro di questo personaggio è già dal Narratore? */
export function tiroInAttesa(actorId) {
  return attoriInAttesa.has(String(actorId ?? ""));
}

/**
 * Il giocatore chiede il verdetto: manda la richiesta a tutti i Narratori
 * collegati e aspetta il primo che risponde. Torna il verdetto, o null se
 * non serve (nessun Narratore, è un Narratore a tirare, «Dal Narratore»
 * spento) o se nessuno risponde in tempo.
 */
export function chiediVerdetto({ actor, title = "", magick = false, kind = "", conto = {} } = {}) {
  const user = globalThis.game?.user;
  const narratori = narratoriAttivi(globalThis.game?.users, user);
  const socket = globalThis.game?.socket;
  if (!socket?.emit || !serveVerdetto({ user, narratori, scelto: dalNarratore() })) return Promise.resolve(null);
  const id = globalThis.foundry?.utils?.randomID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const richiesta = richiestaTiro({
    id,
    from: user.id,
    to: narratori.map((u) => u.id),
    actorId: actor?.id ?? "",
    actorName: actor?.name ?? "",
    title,
    magick,
    kind,
    pool: conto.pool,
    difficulty: conto.difficulty,
    successFrom: conto.successFrom
  });
  const actorKey = String(actor?.id ?? "");
  attoriInAttesa.add(actorKey);
  const format = globalThis.game?.i18n?.format?.bind(globalThis.game.i18n) ?? ((key) => key);
  globalThis.ui?.notifications?.info?.(format(narratori.length > 1 ? "WOD5E_MAGE.Verdetto.SentMany" : "WOD5E_MAGE.Verdetto.Sent", { seconds: VERDETTO_SECONDI, count: narratori.length }));
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      inAttesa.delete(id);
      attoriInAttesa.delete(actorKey);
      resolve(null);
    }, VERDETTO_ATTESA_MS);
    inAttesa.set(id, { resolve, timer, actorKey });
    socket.emit(SOCKET_NAME, richiesta);
  });
}

/** Il verdetto arrivato: chiude l'attesa di quella richiesta. */
export function riceviVerdetto(verdetto) {
  const pending = inAttesa.get(String(verdetto?.id ?? ""));
  if (!pending) return false;
  clearTimeout(pending.timer);
  inAttesa.delete(String(verdetto.id));
  attoriInAttesa.delete(pending.actorKey);
  pending.resolve(verdetto);
  return true;
}

/**
 * Il messaggio sul socket: la richiesta ai Narratori, il verdetto al
 * giocatore. Il verdetto di un altro Narratore passa anche da me: se ho
 * ancora la finestra su quel tiro, si chiude senza rispondere (27/9).
 */
export async function onSocketVerdetto(payload) {
  const me = globalThis.game?.user?.id;
  if (!payload || !me) return;
  if (payload.type === TIPO_RICHIESTA) {
    if (perMe(payload, me)) return apriFinestraVerdetto(payload);
    return;
  }
  if (payload.type === TIPO_VERDETTO) {
    if (perMe(payload, me)) { riceviVerdetto(payload); return; }
    if (String(payload.from ?? "") !== String(me)) chiudiFinestraVerdetto(payload.id, payload);
  }
}

/** Le finestre del verdetto aperte su questo client, per id del tiro. */
const finestre = new Map();

/** C'è una finestra aperta su questo tiro? */
export function finestraAperta(id) {
  return finestre.has(String(id ?? ""));
}

/** Un altro Narratore ha risposto: la finestra su quel tiro si chiude senza mandare niente. */
export function chiudiFinestraVerdetto(id, verdetto = null) {
  const stato = finestre.get(String(id ?? ""));
  if (!stato) return false;
  stato.altrui = verdetto ?? {};
  stato.ferma?.();
  stato.dialog?.close?.();
  return true;
}

/** Si aggancia al canale del modulo (main.js, a Foundry pronto). */
export function registraSocketVerdetto() {
  const socket = globalThis.game?.socket;
  if (!socket?.on) return false;
  socket.on(SOCKET_NAME, (payload) => { onSocketVerdetto(payload); });
  return true;
}

/** Il contesto della finestra del Narratore (con quanti altri la vedono). */
export function contestoVerdetto(richiesta, localize = (key) => key, format = (key, data) => `${key} ${JSON.stringify(data)}`) {
  const altri = Math.max(destinatari(richiesta).length - 1, 0);
  return {
    altri,
    altriTesto: altri ? format("WOD5E_MAGE.Verdetto.Altri", { count: altri }) : "",
    actorName: richiesta.actorName,
    title: richiesta.title,
    kindLabel: richiesta.magick
      ? `${localize("WOD5E_MAGE.Tiro.KindMagick")}${richiesta.kind ? ` · ${localize(`WOD5E_MAGE.Tiro.Kinds.${richiesta.kind}`)}` : ""}`
      : localize("WOD5E_MAGE.Tiro.KindSkill"),
    pool: richiesta.pool,
    difficulty: richiesta.difficulty,
    dice: dadiVerdetto(richiesta),
    successFrom: richiesta.successFrom,
    seconds: VERDETTO_SECONDI
  };
}

/** Legge la finestra: la Difficoltà scritta e i dadi in più o in meno. */
export function leggiVerdetto(root) {
  return {
    difficulty: root?.querySelector?.("[name=difficulty]")?.value,
    dice: root?.querySelector?.("[name=dice]")?.value
  };
}

/**
 * Cabla la finestra: il meno e il più sui due numeri, i dadi che si
 * tirano ricalcolati a ogni tocco, il conto alla rovescia che allo
 * scadere preme OK da solo. `now` e `tick` servono al collaudo.
 */
export function cablaVerdetto(root, richiesta, submit, { now = () => Date.now(), tick = (fn) => setInterval(fn, 250), stop = (h) => clearInterval(h) } = {}) {
  if (!root) return () => {};
  const difficolta = root.querySelector("[name=difficulty]");
  const dadi = root.querySelector("[name=dice]");
  const uscita = root.querySelector("[data-role=dadi]");
  const secondi = root.querySelector("[data-role=secondi]");
  const ricalcola = () => {
    if (uscita) uscita.textContent = String(dadiVerdetto({ pool: richiesta.pool, difficulty: difficolta?.value, dice: dadi?.value }));
  };
  root.addEventListener("click", (event) => {
    const button = event.target?.closest?.("[data-campo]");
    if (!button) return;
    event.preventDefault();
    const input = button.dataset.campo === "dice" ? dadi : difficolta;
    if (!input) return;
    const min = button.dataset.campo === "dice" ? -Infinity : 0;
    input.value = String(Math.max(delta(input.value) + delta(button.dataset.delta), min));
    ricalcola();
  });
  root.addEventListener("input", ricalcola);
  ricalcola();
  const start = now();
  let done = false;
  const handle = tick(() => {
    if (done) return;
    if (!root.isConnected && root.ownerDocument) { done = true; stop(handle); return; }
    const left = secondiRimasti(start, now());
    if (secondi) secondi.textContent = String(left);
    if (left <= 0) {
      done = true;
      stop(handle);
      submit?.();
    }
  });
  return () => { done = true; stop(handle); };
}

/**
 * La finestra del Narratore: OK o lo scadere del tempo rimandano il verdetto
 * al giocatore, col nome di chi ha risposto. Se nel frattempo ha risposto un
 * altro Narratore, la finestra si chiude e da qui non parte niente.
 */
export async function apriFinestraVerdetto(richiesta) {
  const localize = (key) => globalThis.game?.i18n?.localize?.(key) ?? key;
  const format = globalThis.game?.i18n?.format?.bind(globalThis.game.i18n) ?? ((key, data) => `${key} ${JSON.stringify(data)}`);
  const socket = globalThis.game?.socket;
  const id = String(richiesta?.id ?? "");
  const stato = { dialog: null, ferma: () => {}, altrui: null };
  finestre.set(id, stato);
  let letto = null;
  try {
    const content = await globalThis.foundry.applications.handlebars.renderTemplate(
      `modules/${MODULE_ID}/templates/dialogs/verdetto-narratore.hbs`,
      contestoVerdetto(richiesta, localize, format)
    );
    letto = await globalThis.foundry.applications.api.DialogV2.wait({
      window: { title: localize("WOD5E_MAGE.Verdetto.Title") },
      classes: ["wod5e-mage", "wod5e-mage-verdetto-finestra"],
      position: { width: 420 },
      content,
      buttons: [{
        action: "ok",
        label: "WOD5E_MAGE.Verdetto.Ok",
        icon: "fa-solid fa-check",
        default: true,
        callback: (event, button, dialog) => { stato.ferma(); return leggiVerdetto(dialog?.element ?? button?.form); }
      }],
      rejectClose: false,
      render: (event, dialog) => {
        const root = dialog?.element ?? dialog;
        stato.dialog = dialog;
        stato.ferma = cablaVerdetto(root, richiesta, () => root?.querySelector?.('button[data-action="ok"]')?.click());
        if (stato.altrui) dialog?.close?.();
      }
    });
  } catch (error) {
    console.warn("wod5e-mage | La finestra del verdetto non si è aperta: il tiro prosegue com'era.", error);
  }
  finestre.delete(id);
  if (stato.altrui) {
    globalThis.ui?.notifications?.info?.(format("WOD5E_MAGE.Verdetto.Altrui", { actor: String(richiesta?.actorName ?? ""), name: String(stato.altrui.fromName || "") || localize("WOD5E_MAGE.Verdetto.AltroNarratore") }));
    return null;
  }
  const me = globalThis.game?.user;
  const verdetto = verdettoTiro(richiesta, letto ?? {}, { from: me?.id ?? "", fromName: me?.name ?? "" });
  socket?.emit?.(SOCKET_NAME, verdetto);
  return verdetto;
}
