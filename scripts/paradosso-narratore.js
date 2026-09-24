import { calculateMagickThreshold, THRESHOLD_CAP } from "./arete.js";
import { MODULE_ID } from "./constants.js";
import { isMageActor } from "./mage-dice.js";
import { ROLL_CARD_FLAG } from "./roll-card.js";
import { SCOPE_ICONS, SCOPES } from "./scopes.js";
import { SPHERES } from "./spheres.js";

/**
 * I punti Paradosso del Narratore (ramo C, verdetti di Blue dell'11/9/2026):
 * la riserva che si riempie quando un giocatore, a Contraccolpo scattato,
 * sceglie «Dai al Narratore». È una pila libera dentro la sessione, senza
 * scadenza a scena; a fine sessione si azzera, come la Quintessenza dei
 * giocatori. La vede il Narratore, e decide lui se i giocatori la vedono.
 * Sta in un pannello sul tavolo, acceso e spento dall'icona nella barra di
 * sinistra (come l'orologio). Con la riserva il Narratore compra effetti di
 * Magick dalla Scheda del Paradosso, al prezzo della soglia: la Scheda è,
 * per ogni Sfera, il livello più alto fra i personaggi in lobby, e in
 * lobby si entra premendo «Nuova sessione» sulla propria scheda. Gli
 * interventi di scena a prezzo fisso sono DA FARE (ordine di Blue).
 * Al tavolo e sulla carta si chiamano punti Paradosso, e basta (verdetto di Blue).
 */

export const POOL_SETTING = "paradossoNarratore";
export const PANEL_SETTING = "pannelloParadosso";
/** Sull'attore: in lobby da «Nuova sessione», finché il Narratore non apre la sua. */
export const LOBBY_FLAG = "sessione";
export const LOG_MAX = 30;
export const CONTROL_NAME = "wod5e-mage-paradosso";

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

/* ------------------------------------------------------------------ */
/*  La riserva: funzioni pure                                          */
/* ------------------------------------------------------------------ */

export function normalizePool(stored = {}) {
  return {
    points: count(stored?.points),
    visible: Boolean(stored?.visible),
    log: Array.isArray(stored?.log) ? stored.log.slice(-LOG_MAX) : []
  };
}

function logEntry(kind, amount, extra = {}) {
  return { kind, amount: Math.trunc(Number(amount) || 0), when: Date.now(), ...extra };
}

/** I punti entrano (l'Ustione data al Narratore, o il tasto +). */
export function addPoints(pool, amount, extra = {}) {
  const base = normalizePool(pool);
  const gained = count(amount);
  if (gained <= 0) return base;
  return {
    ...base,
    points: base.points + gained,
    log: [...base.log, logEntry(extra.kind ?? "gain", gained, extra)].slice(-LOG_MAX)
  };
}

/** I punti escono: null se non bastano. */
export function spendPoints(pool, price, extra = {}) {
  const base = normalizePool(pool);
  const cost = count(price);
  if (cost > base.points) return null;
  return {
    ...base,
    points: base.points - cost,
    log: [...base.log, logEntry(extra.kind ?? "spend", -cost, extra)].slice(-LOG_MAX)
  };
}

/** A fine sessione: zero punti, il registro ricomincia. */
export function resetPool(pool) {
  const base = normalizePool(pool);
  return { ...base, points: 0, log: [logEntry("session", 0)] };
}

/* ------------------------------------------------------------------ */
/*  La lobby e la Scheda del Paradosso                                 */
/* ------------------------------------------------------------------ */

export function isInLobby(actor) {
  return Boolean(actor?.getFlag?.(MODULE_ID, LOBBY_FLAG)?.attiva);
}

/** I personaggi in lobby: i Maghi che hanno premuto «Nuova sessione». */
export function lobbyActors(actors = []) {
  return [...actors].filter((actor) => isMageActor(actor) && isInLobby(actor));
}

/**
 * La Scheda del Paradosso: per ogni Sfera, il livello più alto fra i
 * personaggi in lobby, col nome di chi lo ha «regalato» alla realtà.
 */
export function schedaParadosso(actors = []) {
  const rows = [];
  for (const id of SPHERES) {
    let level = 0;
    let from = "";
    for (const actor of actors) {
      const value = Math.min(count(actor?.getFlag?.(MODULE_ID, "spheres")?.[id]), 5);
      if (value > level) {
        level = value;
        from = String(actor?.name ?? "");
      }
    }
    if (level > 0) rows.push({ id, level, from, label: `WOD5E_MAGE.Spheres.${id}`, icon: `modules/${MODULE_ID}/assets/icons/sheet/${id}.png` });
  }
  return rows;
}

/** Il prezzo di un effetto della Scheda: la soglia, dalla stessa tavola dei giocatori. */
export function spendPrice({ sphereLevels = [], scopeLevels = [] } = {}) {
  return calculateMagickThreshold({ sphereLevels, scopeLevels });
}

/** Le Sfere e gli Ambiti scelti nella finestra di spesa, dentro i tetti della Scheda. */
export function readSpendChoice(result = {}, scheda = []) {
  const spheres = [];
  for (const row of scheda) {
    const level = Math.min(count(result[`sphere-${row.id}`]), row.level);
    if (level > 0) spheres.push({ id: row.id, level });
  }
  const scopes = [];
  for (const id of SCOPES) {
    const level = Math.min(count(result[`scope-${id}`]), THRESHOLD_CAP);
    if (level > 0) scopes.push({ id, level });
  }
  return {
    spheres,
    scopes,
    price: spendPrice({ sphereLevels: spheres, scopeLevels: scopes }),
    text: String(result.text ?? "").trim(),
    whisper: result.whisper === true || result.whisper === "on" || result.whisper === "true"
  };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** La carta in chat della spesa: Sfere, Ambiti, prezzo, e cosa fa la realtà. */
export function renderSpendCard(choice, localize = (key) => key) {
  const rows = [];
  if (choice.spheres.length) {
    rows.push(`<div class="wod5e-mage-roll-row wod5e-mage-roll-row-spheres"><b class="wod5e-mage-roll-key">${escapeHtml(localize("WOD5E_MAGE.RollCard.Spheres"))}</b><span class="wod5e-mage-roll-value">${choice.spheres.map((entry) => `<span class="wod5e-mage-roll-symbol wod5e-mage-roll-symbol-sphere" title="${escapeHtml(localize(`WOD5E_MAGE.Spheres.${entry.id}`))} ${entry.level}"><img src="modules/${MODULE_ID}/assets/icons/sheet/${entry.id}.png" alt=""><b>${entry.level}</b></span>`).join("")}</span></div>`);
  }
  if (choice.scopes.length) {
    rows.push(`<div class="wod5e-mage-roll-row wod5e-mage-roll-row-scopes"><b class="wod5e-mage-roll-key">${escapeHtml(localize("WOD5E_MAGE.RollCard.Scopes"))}</b><span class="wod5e-mage-roll-value">${choice.scopes.map((entry) => `<span class="wod5e-mage-roll-symbol wod5e-mage-roll-symbol-scope" title="${escapeHtml(localize(`WOD5E_MAGE.Scopes.${entry.id}`))} ${entry.level}"><i class="${escapeHtml(SCOPE_ICONS[entry.id] ?? "")}" aria-hidden="true"></i><b>${entry.level}</b></span>`).join("")}</span></div>`);
  }
  rows.push(`<div class="wod5e-mage-roll-row wod5e-mage-roll-row-threshold"><b class="wod5e-mage-roll-key">${escapeHtml(localize("WOD5E_MAGE.Paradosso.Price"))}</b><span class="wod5e-mage-roll-value">${choice.price}</span></div>`);
  if (choice.text) {
    rows.push(`<div class="wod5e-mage-roll-row wod5e-mage-roll-row-goal"><b class="wod5e-mage-roll-key">${escapeHtml(localize("WOD5E_MAGE.Paradosso.What"))}</b><span class="wod5e-mage-roll-value">${escapeHtml(choice.text)}</span></div>`);
  }
  return `<div class="wod5e-mage-paradosso-card"><p class="wod5e-mage-roll-victory wod5e-mage-paradosso-banner">${escapeHtml(localize("WOD5E_MAGE.Paradosso.CardTitle"))}</p><div class="wod5e-mage-roll-card">${rows.join("")}</div></div>`;
}

/* ------------------------------------------------------------------ */
/*  Foundry: impostazioni, raccolta, pannello, barra                   */
/* ------------------------------------------------------------------ */

export function getPool() {
  return normalizePool(game.settings.get(MODULE_ID, POOL_SETTING));
}

async function setPool(pool) {
  return game.settings.set(MODULE_ID, POOL_SETTING, normalizePool(pool));
}

function isActiveGM() {
  return Boolean(game.user?.isGM) && (game.users?.activeGM?.id ?? game.user.id) === game.user.id;
}

/**
 * La raccolta: un messaggio con «Dai al Narratore» non ancora raccolto porta
 * i suoi punti nella riserva. Lo fa il client del Narratore attivo, quando
 * il messaggio nasce, cambia, o al suo arrivo al tavolo.
 */
const collecting = new Set();
/** Il nome del flag di Sforzare la realtà (lo stesso di sforzo.js, ripetuto per non importare il modulo). */
const SFORZO_FLAG = "sforzo";

/**
 * Cosa c'è da raccogliere su un messaggio: l'Ustione data al Narratore
 * (`rollCard.ustione`) e, dall'11/9, la realtà sforzata (`sforzo.given`:
 * il Narratore riceve quanto ha pagato il giocatore). Puro.
 */
export function pendingGifts(flags = {}) {
  const gifts = [];
  const ustione = flags?.[ROLL_CARD_FLAG]?.ustione;
  if (ustione && ustione.choice === "narratore" && !ustione.collected && count(ustione.given) > 0) {
    gifts.push({ kind: "given", points: count(ustione.given), from: ustione.actorName ?? "" });
  }
  const sforzo = flags?.[SFORZO_FLAG];
  if (sforzo && !sforzo.collected && count(sforzo.given) > 0) {
    gifts.push({ kind: "sforzo", points: count(sforzo.given), from: sforzo.actorName ?? "" });
  }
  return gifts;
}

export async function collectGivenParadox(message) {
  if (!isActiveGM()) return false;
  const flags = message?.flags?.[MODULE_ID] ?? {};
  const gifts = pendingGifts(flags);
  if (!gifts.length) return false;
  // Due ganci sullo stesso messaggio (create e update, o l'update del
  // giocatore e quello del Narratore) non devono contare due volte (11/9 sera: +6 due volte).
  if (collecting.has(message.id)) return false;
  collecting.add(message.id);
  try {
    let pool = getPool();
    const update = {};
    for (const gift of gifts) {
      pool = addPoints(pool, gift.points, { kind: gift.kind, from: gift.from, messageId: message.id });
      if (gift.kind === "given") update[ROLL_CARD_FLAG] = { symbols: [], ...flags[ROLL_CARD_FLAG], ustione: { ...flags[ROLL_CARD_FLAG].ustione, collected: true } };
      if (gift.kind === "sforzo") update[SFORZO_FLAG] = { ...flags[SFORZO_FLAG], collected: true };
      ui.notifications.info(game.i18n.format("WOD5E_MAGE.Paradosso.Collected", { points: gift.points, name: gift.from }));
    }
    await setPool(pool);
    await message.update({ flags: { [MODULE_ID]: update } });
    return true;
  } finally {
    collecting.delete(message.id);
  }
}

async function collectAll() {
  if (!isActiveGM()) return;
  for (const message of (game.messages?.contents ?? []).slice(-100)) {
    await collectGivenParadox(message);
  }
}

class PannelloParadosso {
  static el = null;
  static shownPoints = null;
  static #drag = null;

  static get state() {
    const stored = game.settings.get(MODULE_ID, PANEL_SETTING) ?? {};
    return {
      open: Boolean(stored.open),
      left: Number.isFinite(stored.left) ? stored.left : 120,
      top: Number.isFinite(stored.top) ? stored.top : 80,
      scheda: stored.scheda !== false
    };
  }

  static async save(changes) {
    await game.settings.set(MODULE_ID, PANEL_SETTING, { ...PannelloParadosso.state, ...changes });
  }

  static init() {
    if (PannelloParadosso.el) return;
    const el = document.createElement("div");
    el.id = "wod5e-mage-paradosso-panel";
    el.classList.add("nascosto");
    document.body.append(el);
    PannelloParadosso.el = el;
    el.addEventListener("click", PannelloParadosso.#onClick);
    el.addEventListener("pointerdown", PannelloParadosso.#onPointerDown);
    PannelloParadosso.render();
  }

  static async toggle() {
    const gm = game.user.isGM;
    if (!gm && !getPool().visible) {
      ui.notifications.info(game.i18n.localize("WOD5E_MAGE.Paradosso.Hidden"));
      return;
    }
    await PannelloParadosso.save({ open: !PannelloParadosso.state.open });
    PannelloParadosso.render();
  }

  static async render() {
    const el = PannelloParadosso.el;
    if (!el) return;
    const gm = game.user.isGM;
    const pool = getPool();
    const state = PannelloParadosso.state;
    const show = state.open && (gm || pool.visible);
    el.classList.toggle("nascosto", !show);
    el.classList.toggle("narratore", gm);
    if (!show) {
      el.innerHTML = "";
      PannelloParadosso.shownPoints = null;
      return;
    }
    const localize = game.i18n.localize.bind(game.i18n);
    const lobby = lobbyActors(game.actors?.contents ?? []);
    const scheda = schedaParadosso(lobby).map((row) => ({ ...row, label: localize(row.label) }));
    const log = pool.log.slice(-8).reverse().map((entry) => ({
      ...entry,
      sign: entry.amount > 0 ? `+${entry.amount}` : String(entry.amount),
      text: logText(entry, localize)
    }));
    el.innerHTML = await foundry.applications.handlebars.renderTemplate(
      `modules/${MODULE_ID}/templates/paradosso-pannello.hbs`,
      { gm, points: pool.points, visible: pool.visible, lobby: lobby.map((actor) => actor.name), scheda, showScheda: state.scheda, log }
    );
    el.style.left = `${Math.max(0, state.left)}px`;
    el.style.top = `${Math.max(0, state.top)}px`;
    PannelloParadosso.animateNumber(pool.points);
  }

  /** Il numero sale a vista: conta da dove era a dove arriva, e pulsa. */
  static animateNumber(points) {
    const out = PannelloParadosso.el?.querySelector("[data-role=points]");
    if (!out) return;
    const from = PannelloParadosso.shownPoints;
    PannelloParadosso.shownPoints = points;
    if (from === null || from === points) {
      out.textContent = String(points);
      return;
    }
    out.classList.remove("rising", "falling");
    void out.offsetWidth;
    out.classList.add(points > from ? "rising" : "falling");
    const start = performance.now();
    const duration = 700;
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      out.textContent = String(Math.round(from + (points - from) * eased));
      if (t < 1) requestAnimationFrame(step);
      else out.textContent = String(points);
    };
    requestAnimationFrame(step);
  }

  static #onClick = async (event) => {
    const button = event.target.closest("[data-azione]");
    if (!button) return;
    event.preventDefault();
    const azione = button.dataset.azione;
    if (azione === "chiudi") return PannelloParadosso.toggle();
    if (azione === "scheda") {
      await PannelloParadosso.save({ scheda: !PannelloParadosso.state.scheda });
      return PannelloParadosso.render();
    }
    if (!game.user.isGM) return;
    const pool = getPool();
    if (azione === "piu") return setPool(addPoints(pool, 1, { kind: "manual" }));
    if (azione === "meno") return setPool(spendPoints(pool, 1, { kind: "manual" }) ?? pool);
    if (azione === "visibile") return setPool({ ...pool, visible: !pool.visible });
    if (azione === "azzera") return setPool({ ...pool, points: 0, log: [...pool.log, logEntry("reset", -pool.points)] });
    if (azione === "spendi") return openSpendDialog();
    if (azione === "nuovaSessione") return newSession();
    return null;
  };

  static #onPointerDown = (event) => {
    if (!event.target.closest(".wod5e-mage-paradosso-presa") || event.target.closest("[data-azione]")) return;
    event.preventDefault();
    const rect = PannelloParadosso.el.getBoundingClientRect();
    PannelloParadosso.#drag = { dx: event.clientX - rect.left, dy: event.clientY - rect.top, moved: false };
    window.addEventListener("pointermove", PannelloParadosso.#onPointerMove);
    window.addEventListener("pointerup", PannelloParadosso.#onPointerUp, { once: true });
  };

  static #onPointerMove = (event) => {
    const d = PannelloParadosso.#drag;
    if (!d) return;
    d.moved = true;
    const left = Math.max(0, Math.min(window.innerWidth - 60, event.clientX - d.dx));
    const top = Math.max(0, Math.min(window.innerHeight - 40, event.clientY - d.dy));
    PannelloParadosso.el.style.left = `${left}px`;
    PannelloParadosso.el.style.top = `${top}px`;
  };

  static #onPointerUp = () => {
    window.removeEventListener("pointermove", PannelloParadosso.#onPointerMove);
    const d = PannelloParadosso.#drag;
    PannelloParadosso.#drag = null;
    if (!d?.moved) return;
    PannelloParadosso.save({
      left: Number.parseInt(PannelloParadosso.el.style.left, 10) || 0,
      top: Number.parseInt(PannelloParadosso.el.style.top, 10) || 0
    });
  };
}

function logText(entry, localize) {
  const format = game.i18n.format.bind(game.i18n);
  switch (entry.kind) {
    case "given": return format("WOD5E_MAGE.Paradosso.LogGiven", { name: entry.from ?? "" });
    case "sforzo": return format("WOD5E_MAGE.Paradosso.LogSforzo", { name: entry.from ?? "" });
    case "spend": return entry.text ? entry.text : localize("WOD5E_MAGE.Paradosso.LogSpend");
    case "manual": return localize("WOD5E_MAGE.Paradosso.LogManual");
    case "reset": return localize("WOD5E_MAGE.Paradosso.LogReset");
    case "session": return localize("WOD5E_MAGE.Paradosso.LogSession");
    default: return "";
  }
}

/** La Nuova sessione del Narratore: la lobby si svuota, la riserva si azzera. */
export async function newSession() {
  if (!game.user.isGM) return false;
  const localize = game.i18n.localize.bind(game.i18n);
  const ok = await foundry.applications.api.DialogV2.confirm({
    window: { title: localize("WOD5E_MAGE.Paradosso.NewSession") },
    content: `<p>${localize("WOD5E_MAGE.Paradosso.NewSessionAsk")}</p>`,
    rejectClose: false,
    modal: true
  });
  if (!ok) return false;
  for (const actor of lobbyActors(game.actors?.contents ?? [])) {
    await actor.update({ [`flags.${MODULE_ID}.-=${LOBBY_FLAG}`]: null });
  }
  await setPool(resetPool(getPool()));
  ui.notifications.info(localize("WOD5E_MAGE.Paradosso.NewSessionDone"));
  return true;
}

/** Il giocatore entra in lobby: lo chiama «Nuova sessione» della scheda. */
export async function joinLobby(actor) {
  if (!actor?.isOwner) return false;
  await actor.setFlag(MODULE_ID, LOBBY_FLAG, { attiva: true, quando: Date.now() });
  return true;
}

function wireSpendDots(root, onChange) {
  root.querySelectorAll("[data-role=spendRow]").forEach((row) => {
    const input = row.querySelector("input[type=hidden]");
    const dots = [...row.querySelectorAll(".wod5e-mage-arete-sphere-dot")];
    const paint = () => {
      const level = count(input.value);
      dots.forEach((dot) => dot.classList.toggle("active", Number(dot.dataset.level) <= level));
      row.classList.toggle("chosen", level > 0);
    };
    dots.forEach((dot) => {
      dot.addEventListener("click", (event) => {
        event.preventDefault();
        const level = count(dot.dataset.level);
        input.value = String(Number(input.value) === level ? 0 : level);
        paint();
        onChange();
      });
    });
    paint();
  });
}

function readSpendForm(root, scheda) {
  const result = {};
  root.querySelectorAll("input[type=hidden][name]").forEach((input) => { result[input.name] = input.value; });
  result.text = root.querySelector("[name=text]")?.value ?? "";
  result.whisper = root.querySelector("[name=whisper]")?.checked ?? false;
  return readSpendChoice(result, scheda);
}

/** La finestra di spesa: Sfere della Scheda, Ambiti, prezzo vivo, cosa fa la realtà. */
export async function openSpendDialog() {
  if (!game.user.isGM) return null;
  const localize = game.i18n.localize.bind(game.i18n);
  const pool = getPool();
  const scheda = schedaParadosso(lobbyActors(game.actors?.contents ?? []));
  const content = await foundry.applications.handlebars.renderTemplate(
    `modules/${MODULE_ID}/templates/dialogs/paradosso-spesa.hbs`,
    {
      points: pool.points,
      spheres: scheda.map((row) => ({ ...row, steps: Array.from({ length: row.level }, (_, index) => ({ value: index + 1 })) })),
      scopes: SCOPES.map((id) => ({ id, label: `WOD5E_MAGE.Scopes.${id}`, faIcon: SCOPE_ICONS[id] ?? "", steps: Array.from({ length: THRESHOLD_CAP }, (_, index) => ({ value: index + 1 })) }))
    }
  );
  let choice = null;
  const answer = await foundry.applications.api.DialogV2.wait({
    window: { title: localize("WOD5E_MAGE.Paradosso.SpendTitle") },
    content,
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-roll-dialog", "wod5e-mage-paradosso-dialog"],
    // 820 di larghezza (25/9): a 720 la colonna di destra usciva dalla finestra.
    position: { width: 820, height: "auto" },
    buttons: [
      {
        action: "spend",
        icon: "fa-solid fa-eye",
        label: localize("WOD5E_MAGE.Paradosso.SpendOk"),
        default: true,
        callback: (_event, _button, dialog) => {
          choice = readSpendForm(dialog.element, scheda);
          return "spend";
        }
      },
      { action: "cancel", icon: "fas fa-times", label: localize("WOD5E.Cancel") }
    ],
    render: (_event, dialog) => {
      const root = dialog.element;
      const priceOut = root.querySelector("[data-role=price]");
      const update = () => {
        const current = readSpendForm(root, scheda);
        if (priceOut) priceOut.textContent = String(current.price);
        root.querySelector("[data-role=priceBox]")?.classList.toggle("too-much", current.price > pool.points);
      };
      wireSpendDots(root, update);
      update();
    }
  }).catch(() => null);
  if (answer !== "spend" || !choice) return null;
  if (choice.price <= 0) {
    ui.notifications.warn(localize("WOD5E_MAGE.Paradosso.SpendNothing"));
    return null;
  }
  const next = spendPoints(getPool(), choice.price, { kind: "spend", text: choice.text });
  if (!next) {
    ui.notifications.warn(game.i18n.format("WOD5E_MAGE.Paradosso.SpendTooMuch", { price: choice.price, points: getPool().points }));
    return null;
  }
  await setPool(next);
  await ChatMessage.create({
    speaker: { alias: localize("WOD5E_MAGE.Paradosso.Speaker") },
    content: renderSpendCard(choice, localize),
    whisper: choice.whisper ? game.users.filter((user) => user.isGM).map((user) => user.id) : [],
    flags: { [MODULE_ID]: { paradossoSpesa: choice } }
  });
  return choice;
}

let previousControl = "tokens";

function backToPreviousControl() {
  const name = previousControl in (ui.controls?.controls ?? {}) ? previousControl : "tokens";
  window.setTimeout(() => {
    try {
      ui.controls.activate({ control: name });
    } catch (error) {
      console.warn("wod5e-mage | non riesco a tornare al controllo precedente", error);
    }
  }, 0);
}

/** In init: impostazioni, livello e barra. In ready: pannello e raccolta. */
export function registerParadossoNarratore() {
  game.settings.register(MODULE_ID, POOL_SETTING, {
    scope: "world",
    config: false,
    type: Object,
    default: { points: 0, visible: false, log: [] },
    onChange: () => PannelloParadosso.render()
  });
  game.settings.register(MODULE_ID, PANEL_SETTING, {
    scope: "client",
    config: false,
    type: Object,
    default: { open: false, left: 120, top: 80, scheda: true }
  });
  // Un livello vuoto: serve solo a dare un'icona alla barra di sinistra (come l'orologio).
  class ParadossoLayer extends foundry.canvas.layers.InteractionLayer {
    static get layerOptions() {
      return foundry.utils.mergeObject(super.layerOptions, { name: CONTROL_NAME, zIndex: 901 });
    }
  }
  CONFIG.Canvas.layers[CONTROL_NAME] = { layerClass: ParadossoLayer, group: "interface" };

  Hooks.on("renderSceneControls", (app) => {
    const name = app.control?.name ?? app.activeControl;
    if (name && name !== CONTROL_NAME) previousControl = name;
  });

  Hooks.on("getSceneControlButtons", (controls) => {
    const gm = game.user?.isGM ?? false;
    controls[CONTROL_NAME] = {
      name: CONTROL_NAME,
      title: gm ? "WOD5E_MAGE.Paradosso.ControlGM" : "WOD5E_MAGE.Paradosso.ControlPlayer",
      icon: "fa-solid fa-eye",
      order: 91,
      visible: true,
      layer: CONTROL_NAME,
      activeTool: "pannello",
      onChange: (_event, active) => {
        if (!active) return;
        PannelloParadosso.toggle();
        backToPreviousControl();
      },
      tools: {
        pannello: {
          name: "pannello",
          title: "WOD5E_MAGE.Paradosso.Panel",
          icon: "fa-solid fa-eye",
          order: 1,
          button: true,
          visible: true,
          onChange: () => PannelloParadosso.toggle()
        },
        spendi: {
          name: "spendi",
          title: "WOD5E_MAGE.Paradosso.Spend",
          icon: "fa-solid fa-wand-sparkles",
          order: 2,
          button: true,
          visible: gm,
          onChange: () => openSpendDialog()
        }
      }
    };
  });

  Hooks.once("ready", () => {
    PannelloParadosso.init();
    collectAll();
    Hooks.on("createChatMessage", (message) => collectGivenParadox(message));
    Hooks.on("updateChatMessage", (message) => collectGivenParadox(message));
    // La lobby e le Sfere cambiano sulle schede: il pannello segue.
    Hooks.on("updateActor", (_actor, changes) => {
      const flags = changes?.flags?.[MODULE_ID];
      if (flags && (LOBBY_FLAG in flags || `-=${LOBBY_FLAG}` in flags || "spheres" in flags)) PannelloParadosso.render();
    });
  });
}

export { PannelloParadosso };
