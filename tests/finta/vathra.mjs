// Il Vathrâ nella finta Foundry (Blue, 25/9): i caratteri delle due mani, il
// tasto nella barra dei token, il comando «/vathra», la finestra (contesto e
// template), le azioni (gettoni, chi capisce, frase dal frasario, invio) e
// la carta in chat vista dal Narratore, da chi scrive, da chi è acceso e da
// chi no. Con VATHRA_PAGINA=<cartella> scrive la finestra e le carte in HTML,
// da guardare col CSS del modulo.
// Uso: node tests/finta/vathra.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Handlebars from "handlebars";

const MODULE = "wod5e-mage";
const ROOT = new URL("../../", import.meta.url);
const lingua = [JSON.parse(readFileSync(new URL("lang/it.json", ROOT), "utf8")), JSON.parse(readFileSync(new URL("lang/it-vathra.json", ROOT), "utf8"))];
const leggi = (chiave) => {
  for (const radice of [...lingua].reverse()) {
    const v = chiave.split(".").reduce((nodo, parte) => (nodo && typeof nodo === "object" ? nodo[parte] : undefined), radice);
    if (typeof v === "string") return v;
  }
  return undefined;
};
const localize = (key) => leggi(key) ?? key;
const format = (key, data = {}) => Object.entries(data).reduce((t, [a, b]) => t.replaceAll(`{${a}}`, String(b)), localize(key));

Handlebars.registerHelper("localize", (key, options) => format(key, options?.hash ?? {}));
Handlebars.registerHelper("eq", (a, b) => a === b);
const compilati = new Map();
async function renderTemplate(path, context) {
  const file = path.replace(`modules/${MODULE}/`, "");
  if (!compilati.has(file)) compilati.set(file, Handlebars.compile(readFileSync(new URL(file, ROOT), "utf8"), { strict: false }));
  return compilati.get(file)(context);
}

// Un DOM minimo, quanto basta alla carta: elementi con classi, figli, testo, attributi, clic.
class Elemento {
  constructor(tag, doc) { this.tagName = tag; this.ownerDocument = doc; this.children = []; this.dataset = {}; this.attributes = {}; this.listeners = {}; this._text = ""; this.className = ""; this.disabled = false; }
  get classList() { const el = this; return { contains: (c) => el.className.split(/\s+/).includes(c), toggle() {}, add(c) { el.className = `${el.className} ${c}`.trim(); } }; }
  append(...figli) { this.children.push(...figli); }
  addEventListener(tipo, fn) { (this.listeners[tipo] ??= []).push(fn); }
  async click() { for (const fn of this.listeners.click ?? []) await fn({ preventDefault() {}, stopPropagation() {} }); }
  setAttribute(k, v) { this.attributes[k] = String(v); }
  set textContent(v) { this._text = String(v); }
  get textContent() { return this._text + this.children.map((c) => c.textContent).join(""); }
  set innerHTML(v) { this._html = String(v); this._text = String(v).replace(/<[^>]+>/g, ""); }
  get innerHTML() { return this._html ?? ""; }
  *tutti() { for (const c of this.children) { yield c; yield* c.tutti(); } }
  querySelector(sel) { const classe = sel.replace(/^\./, ""); for (const el of this.tutti()) if (el.classList.contains(classe)) return el; return null; }
  querySelectorAll(sel) { const classe = sel.replace(/^\./, ""); return [...this.tutti()].filter((el) => el.classList.contains(classe)); }
}
class Documento { createElement(tag) { return new Elemento(tag, this); } }

// La finta Foundry.
const hooks = {};
const sim = { messaggi: [], notifiche: [], aperture: 0 };
class ApplicationV2 {
  constructor(options = {}) { this.options = options; this.rendered = false; this.element = null; }
  async render() { this.rendered = true; sim.aperture += 1; return this; }
  async _prepareContext() { return {}; }
  _onRender() {}
  _onClose() {}
}
const HandlebarsApplicationMixin = (Base) => class extends Base {};
globalThis.foundry = {
  applications: { api: { ApplicationV2, HandlebarsApplicationMixin }, handlebars: { renderTemplate } },
  utils: { deepClone: (v) => structuredClone(v) }
};
globalThis.CONFIG = { fontDefinitions: { Signika: { editor: true, fonts: [] } } };
globalThis.Hooks = {
  on(name, fn) { (hooks[name] ??= []).push(fn); },
  once(name, fn) { (hooks[name] ??= []).push(fn); },
  call(name, ...args) { for (const fn of hooks[name] ?? []) if (fn(...args) === false) return false; return true; },
  callAll(name, ...args) { for (const fn of hooks[name] ?? []) fn(...args); }
};
globalThis.ui = { notifications: { info: (m) => sim.notifiche.push(m), warn: (m) => sim.notifiche.push(`!${m}`) } };
const users = [
  { id: "gm", name: "Blue", isGM: true, active: true, character: null },
  { id: "u1", name: "Sara", isGM: false, active: true, character: { name: "Guendalina" } },
  { id: "u2", name: "Marco", isGM: false, active: false, character: { name: "Luca" } },
  { id: "u3", name: "Olivio", isGM: false, active: true, character: null }
];
let parla = "Blue";
globalThis.ChatMessage = {
  getSpeaker: () => ({ alias: parla }),
  create: async (data) => {
    const flags = structuredClone(data.flags ?? {});
    const m = {
      id: `m${sim.messaggi.length + 1}`, ...data, flags,
      author: game.user,
      getFlag: (scope, key) => flags[scope]?.[key],
      update: async (changes) => {
        for (const [path, value] of Object.entries(changes)) {
          const parti = path.split(".");
          let nodo = flags;
          for (const p of parti.slice(1, -1)) nodo = nodo[p] ??= {};
          nodo[parti.at(-1)] = value;
        }
        return m;
      }
    };
    sim.messaggi.push(m);
    return m;
  }
};
globalThis.game = {
  user: users[0],
  users,
  i18n: { lang: "it", localize, format },
  settings: { get: (scope, key) => (scope === MODULE && key === "sheetTheme" ? "scuro" : 0.5) },
  clipboard: { copyPlainText: async (t) => { sim.appunti = t; } }
};

const { registraVathra, VathraTraduttore, apriVathra, decoraCartaVathra, giocatoriDaAccendere, radiceHtml } = await import(new URL("scripts/vathra/traduttore.js", ROOT).href);
const { radice } = await import(new URL("scripts/vathra/vathra.js", ROOT).href);
registraVathra();

// 1. Le due mani fra i caratteri di Foundry, accanto a quelli che c'erano.
assert.ok(CONFIG.fontDefinitions.Signika, "i caratteri di prima restano");
for (const nome of ["Vathra Filata", "Vathra Sciolta"]) {
  const def = CONFIG.fontDefinitions[nome];
  assert.equal(def.editor, true, `${nome} nei diari`);
  assert.match(def.fonts[0].urls[0], /^modules\/wod5e-mage\/assets\/vathra\/Vathra(Filata|Sciolta)-Regular\.ttf$/);
}

// 2. Il tasto nella barra dei token, per tutti.
{
  const controls = { tokens: { name: "tokens", tools: { select: {}, target: {}, ruler: {} } } };
  Hooks.callAll("getSceneControlButtons", controls);
  const tasto = controls.tokens.tools.vathra;
  assert.ok(tasto, "il tasto del traduttore c'è");
  assert.equal(tasto.button, true);
  assert.equal(tasto.visible, true, "lo vedono tutti");
  assert.equal(tasto.order, 4);
  await tasto.onChange();
  assert.ok(VathraTraduttore.aperto?.rendered, "il tasto apre il traduttore");
  const primo = VathraTraduttore.aperto;
  await apriVathra();
  assert.equal(VathraTraduttore.aperto, primo, "una finestra sola");
  Hooks.callAll("getSceneControlButtons", {});
}

// 3. Il comando in chat.
{
  assert.equal(Hooks.call("chatMessage", {}, "ciao a tutti", {}), true, "i messaggi normali passano");
  assert.equal(Hooks.call("chatMessage", {}, "/vathra Chiamo il mio Avatar.", {}), false, "/vathra non va in chat");
  assert.equal(VathraTraduttore.aperto.testo, "Chiamo il mio Avatar.");
  assert.equal(VathraTraduttore.aperto.pagina, "traduttore");
}

const app = VathraTraduttore.aperto;
const azioni = VathraTraduttore.DEFAULT_OPTIONS.actions;
const evento = { preventDefault() {}, stopPropagation() {} };
const bottone = (dataset = {}) => ({ dataset, disabled: false, classList: { toggle() {} }, setAttribute() {} });

// 4. Il contesto e il template della finestra.
async function finestra() {
  const ctx = await app._prepareContext({});
  return { ctx, html: await renderTemplate(`modules/${MODULE}/templates/vathra/finestra.hbs`, ctx) };
}
{
  const { ctx, html } = await finestra();
  assert.deepEqual(ctx.pagine.map((p) => p.id), ["traduttore", "radice", "alfabeto", "frasario"]);
  assert.equal(ctx.uscita.romanizzazione, "vakharilmi î'shi'âr i mi.");
  assert.equal(ctx.uscita.legge, "va-ca-RIL-mi ìʼ-sci-ʼÀR i mi.");
  assert.deepEqual(ctx.giocatori.map((g) => g.id), ["u1", "u2", "u3"], "il Narratore non sta fra i giocatori da accendere");
  assert.equal(ctx.parlaLabel, "Parla: Blue");
  assert.equal(ctx.frasario.length, 11);
  assert.equal(ctx.frasario[0].aperto, true);
  assert.equal(ctx.manopole.length, 6);
  for (const marker of [
    'data-action="pagina" data-pagina="radice"', 'data-ruolo="glifi">vaxarilmi îʼciʼâr i mi<', 'data-ruolo="legge"',
    'data-action="gettone" data-k="consenso" data-v="volgare"', 'data-action="capisce" data-user="u1"', "Sara <small>Guendalina</small>",
    'wod5e-mage-vathra-chip assente" data-action="capisce" data-user="u2"', 'data-action="manda"', 'select name="testimone" data-manopola="testimone"',
    'data-action="frase" data-gruppo="scena" data-indice="0"', 'data-action="fraseAscolta" data-gruppo="scena" data-indice="0"',
    "wod5e-mage-vathra-play registrata", 'data-action="suono" data-indice="7"', "Le sette regole", "wod5e-mage-vathra-tavola"
  ]) {
    assert.ok(html.includes(marker), `manca ${marker}`);
  }
  assert.ok(!html.includes('data-action="manda" disabled'), "con una frase si può mandare");
  assert.ok(html.includes('class="wod5e-mage-vathra-pagina attiva" data-pagina="traduttore"'));
  assert.equal((html.match(/wod5e-mage-vathra-frase"/g) ?? []).length, 114);
}

// 5. Le azioni: la mano, un gettone, chi capisce, una frase dal frasario, la copia.
{
  await azioni.mano.call(app, evento, bottone());
  assert.equal(app.mano, "sciolta");
  await azioni.gettone.call(app, evento, bottone({ k: "consenso", v: "volgare" }));
  assert.equal(app.opzioni.consenso, "volgare");
  await azioni.capisce.call(app, evento, bottone({ user: "u1" }));
  await azioni.capisce.call(app, evento, bottone({ user: "u3" }));
  await azioni.capisce.call(app, evento, bottone({ user: "u3" }));
  assert.deepEqual(app.capiscono, ["u1"], "Sara accesa, Olivio acceso e spento");
  const { ctx } = await finestra();
  assert.ok(ctx.sciolta);
  assert.equal(ctx.uscita.romanizzazione, "vakharilmi î'shi'âr i mi thak.");
  assert.ok(ctx.giocatori.find((g) => g.id === "u1").scelto);

  await azioni.frase.call(app, evento, bottone({ gruppo: "scena", indice: "1" }));
  assert.equal(app.testo, "Apro la porta con la mia volontà.");
  assert.equal(app.opzioni.testimone, "occhi");
  assert.equal(app.opzioni.consenso, "volgare");
  await azioni.copia.call(app, evento, bottone({ cosa: "glifi" }));
  assert.equal(sim.appunti, "ʼafarilmi eʼofur eʼvalnâum i mi ne qak");
  await azioni.pagina.call(app, evento, bottone({ pagina: "frasario" }));
  assert.equal(app.pagina, "frasario");
}

// 6. L'invio: la carta con glifi e lettura; il senso nella bandiera.
let carta;
{
  await azioni.manda.call(app, evento, bottone());
  assert.equal(sim.messaggi.length, 1);
  carta = sim.messaggi[0];
  const dati = carta.flags[MODULE].vathra;
  assert.equal(dati.italiano, "Apro la porta con la mia volontà.");
  assert.equal(dati.romanizzazione, "'afarilmi e'ofur e'valnâum i mi ne thak.");
  assert.equal(dati.mano, "sciolta");
  assert.deepEqual(dati.capiscono, ["u1"]);
  assert.match(dati.glossa, /porta/);
  assert.ok(carta.content.includes('wod5e-mage-vathra-carta-glifi mano-sciolta">ʼafarilmi eʼofur eʼvalnâum i mi ne qak<'));
  assert.ok(carta.content.includes("ʼa-fa-RIL-mi e-ʼO-fur eʼ-val-NÀUM i mi ne tak."));
  assert.ok(!carta.content.includes("Apro la porta"), "il senso non sta nel testo della carta");
  assert.ok(sim.notifiche.includes("Frase mandata in chat."));
  // Una frase vuota non parte.
  app.caricaTesto("   ");
  await azioni.manda.call(app, evento, bottone());
  assert.equal(sim.messaggi.length, 1);
  assert.ok(sim.notifiche.includes("!Scrivi una frase prima di mandarla."));
}

// 7. La carta vista da ciascuno.
function cartaPer(user) {
  game.user = user;
  const doc = new Documento();
  const html = doc.createElement("li");
  const box = doc.createElement("div");
  box.className = "wod5e-mage-vathra-carta";
  html.append(box);
  assert.equal(decoraCartaVathra(carta, html), true);
  assert.equal(decoraCartaVathra(carta, html), false, "una volta sola");
  return box;
}
{
  const [gm, sara, marco, olivio] = users;
  const vistaGM = cartaPer(gm);
  assert.ok(vistaGM.querySelector(".wod5e-mage-vathra-carta-ascolta"), "Ascolta per tutti");
  assert.ok(vistaGM.querySelector(".wod5e-mage-vathra-senso")?.textContent.includes("Apro la porta con la mia volontà."), "il Narratore vede il senso");
  const chips = vistaGM.querySelectorAll(".wod5e-mage-vathra-chip");
  assert.deepEqual(chips.map((c) => c.dataset.user), ["u1", "u2", "u3"], "il Narratore può accendere i giocatori");
  assert.equal(chips[0].attributes["aria-pressed"], "true");

  const vistaSara = cartaPer(sara);
  assert.ok(vistaSara.querySelector(".wod5e-mage-vathra-senso"), "Sara è accesa: vede il senso");
  assert.equal(vistaSara.querySelector(".wod5e-mage-vathra-carta-chi"), null, "Sara non cambia chi capisce");

  const vistaOlivio = cartaPer(olivio);
  assert.equal(vistaOlivio.querySelector(".wod5e-mage-vathra-senso"), null, "Olivio vede solo i glifi");
  assert.ok(vistaOlivio.querySelector(".wod5e-mage-vathra-carta-ascolta"));

  // Il Narratore accende Olivio dalla carta (un tiro riuscito, per esempio).
  game.user = gm;
  const chipOlivio = cartaPer(gm).querySelectorAll(".wod5e-mage-vathra-chip").find((c) => c.dataset.user === "u3");
  await chipOlivio.click();
  assert.deepEqual(carta.flags[MODULE].vathra.capiscono, ["u1", "u3"]);
  assert.ok(cartaPer(olivio).querySelector(".wod5e-mage-vathra-senso"), "adesso Olivio capisce");
  assert.equal(cartaPer(marco).querySelector(".wod5e-mage-vathra-senso"), null, "Marco ancora no");
  game.user = gm;

  // Un messaggio qualsiasi non si tocca.
  const altro = { getFlag: () => undefined };
  assert.equal(decoraCartaVathra(altro, new Documento().createElement("li")), false);
}

// 8. Un giocatore che scrive: il Narratore non sta fra quelli da accendere, e nemmeno lui.
{
  game.user = users[1];
  assert.deepEqual(giocatoriDaAccendere(new Set()).map((g) => g.id), ["u2", "u3"]);
  game.user = users[0];
  assert.match(radiceHtml(radice("fuoco")), /<table class="wod5e-mage-vathra-modi">/);
  assert.equal(radiceHtml(null), "");
}

if (process.env.VATHRA_PAGINA) {
  const { mkdirSync, writeFileSync } = await import("node:fs");
  const dir = process.env.VATHRA_PAGINA;
  mkdirSync(dir, { recursive: true });
  app.caricaTesto("Ho visto che il Velo si assottiglia.");
  await azioni.mano.call(app, evento, bottone());
  for (const pagina of ["traduttore", "radice", "alfabeto", "frasario"]) {
    await azioni.pagina.call(app, evento, bottone({ pagina }));
    const { html } = await finestra();
    writeFileSync(`${dir}/${pagina}.html`, html);
  }
  writeFileSync(`${dir}/carta.html`, carta.content);
  console.log(`pagine scritte in ${dir}`);
}

console.log("Vathra finta Foundry passed.");
