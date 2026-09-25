// Il Quadro del Narratore nella finta Foundry (24/9): la Nuova sessione coi
// maghi scelti dal Narratore, i tre modi (contatore, menù, giocatori) col
// loro contesto e i loro template, una spesa dal menù con l'orologio, la
// copia automatica di un Volgare in chat, il Cambio scena che spegne gli
// effetti. Si usa con `node --import tests/finta/register.mjs tests/finta/quadro.mjs`.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Handlebars from "handlebars";

const MODULE = "wod5e-mage";
const ROOT = new URL("../../", import.meta.url);
const it = JSON.parse(readFileSync(new URL("lang/it.json", ROOT), "utf8"));
const leggi = (chiave) => chiave.split(".").reduce((nodo, parte) => (nodo && typeof nodo === "object" ? nodo[parte] : undefined), it);
const localize = (key) => { const v = leggi(key); return typeof v === "string" ? v : key; };
const format = (key, data = {}) => Object.entries(data).reduce((t, [a, b]) => t.replaceAll(`{${a}}`, String(b)), localize(key));

// Handlebars come Foundry: localize con l'hash, i confronti.
Handlebars.registerHelper("localize", (key, options) => format(key, options?.hash ?? {}));
Handlebars.registerHelper("gt", (a, b) => a > b);
Handlebars.registerHelper("eq", (a, b) => a === b);
const compilati = new Map();
async function renderTemplate(path, context) {
  const file = path.replace(`modules/${MODULE}/`, "");
  if (!compilati.has(file)) compilati.set(file, Handlebars.compile(readFileSync(new URL(file, ROOT), "utf8")));
  return compilati.get(file)(context);
}

// La finta Foundry: impostazioni, attori, utenti, messaggi, ganci.
const settings = new Map();
const registrate = new Map();
const hooks = {};
const sim = { messages: [], notifiche: [], dialoghi: [] };
class ApplicationV2 {
  constructor(options = {}) { this.options = options; this.rendered = false; this.element = null; }
  async render() { this.rendered = true; return this; }
  _configureRenderOptions() {}
  _replaceHTML() {}
  _onRender() {}
  _onClose() {}
  async _prepareContext() { return {}; }
}
const HandlebarsApplicationMixin = (Base) => class extends Base {};
globalThis.foundry = {
  applications: {
    api: { ApplicationV2, HandlebarsApplicationMixin, DialogV2: { wait: async (config) => sim.dialogo(config) } },
    handlebars: { renderTemplate }
  },
  utils: { deepClone: (v) => structuredClone(v), escapeHTML: (v) => String(v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])), mergeObject: (a, b) => ({ ...a, ...b }) },
  canvas: { layers: { InteractionLayer: class { static get layerOptions() { return {}; } } } }
};
globalThis.CONFIG = { Canvas: { layers: {} } };
globalThis.Hooks = {
  once(name, fn) { (hooks[name] ??= []).push(fn); },
  on(name, fn) { (hooks[name] ??= []).push(fn); },
  callAll(name, ...args) { for (const fn of hooks[name] ?? []) fn(...args); }
};
globalThis.ui = { notifications: { info: (m) => sim.notifiche.push(m), warn: (m) => sim.notifiche.push(`!${m}`), error: (m) => sim.notifiche.push(`!!${m}`) } };
globalThis.ChatMessage = { create: async (data) => { const m = { id: `m${sim.messages.length + 1}`, timestamp: Date.now(), ...data }; sim.messages.push(m); return m; } };

function attore(id, name, { isMage = true, owner = null, flags = {} } = {}) {
  const dati = { flags: { [MODULE]: { isMage, ...flags } } };
  const actor = {
    id, name, img: `${id}.png`, items: [], hasPlayerOwner: Boolean(owner),
    system: { willpower: { max: 6, superficial: 1, aggravated: 0 }, attributes: { stamina: { value: 2 }, resolve: { value: 2 } } },
    getFlag: (scope, key) => (scope === MODULE ? dati.flags[MODULE][key] : undefined),
    setFlag: async (scope, key, value) => { dati.flags[MODULE][key] = value; Hooks.callAll("updateActor", actor, { flags: { [MODULE]: { [key]: value } } }); return actor; },
    update: async (changes) => {
      for (const [path, value] of Object.entries(changes)) {
        const parti = path.split(".");
        if (parti[0] !== "flags" || parti[1] !== MODULE) continue;
        if (parti[2].startsWith("-=")) delete dati.flags[MODULE][parti[2].slice(2)];
        else if (parti.length === 4 && parti[3].startsWith("-=")) delete dati.flags[MODULE][parti[2]]?.[parti[3].slice(2)];
        else dati.flags[MODULE][parti[2]] = value;
      }
      return actor;
    },
    testUserPermission: (user) => user.id === owner,
    sheet: { render() {} }
  };
  return actor;
}
const guendalina = attore("a1", "Guendalina", { owner: "u1", flags: { magickBalance: { quintessence: 3, paradox: 4 }, ongoingMagick: { o1: { nameSpheres: "Muro di ghiaccio", vulgar: true, threshold: 5, active: true }, o2: { nameSpheres: "Spenta", vulgar: false, active: false } }, poteri: { "forces-1-1": { sphere: "forces", dot: 1, type: "passivo", name: "Quadrante" } }, personaggioAnchors: { k1: { name: "La sorella", description: "" } } } });
const luca = attore("a2", "Luca", { owner: "u2" });
const ianira = attore("a3", "Ianira", { owner: null });
const png = attore("n1", "Guardia", { isMage: false });
const actors = [guendalina, luca, ianira, png];
const users = [{ id: "gm", name: "Blue", isGM: true, active: true }, { id: "u1", name: "Sara", isGM: false, active: true }, { id: "u2", name: "Marco", isGM: false, active: false }];
globalThis.game = {
  user: users[0],
  users: Object.assign([...users], { activeGM: users[0], contents: users }),
  actors: { contents: actors, get: (id) => actors.find((a) => a.id === id) },
  messages: { contents: sim.messages },
  combat: null,
  modules: { get: () => null },
  i18n: { lang: "it", localize, format },
  settings: {
    settings: new Map(),
    register: (scope, key, config) => { registrate.set(`${scope}.${key}`, config); globalThis.game.settings.settings.set(`${scope}.${key}`, config); },
    get: (scope, key) => (settings.has(`${scope}.${key}`) ? structuredClone(settings.get(`${scope}.${key}`)) : structuredClone(registrate.get(`${scope}.${key}`)?.default)),
    set: async (scope, key, value) => { settings.set(`${scope}.${key}`, structuredClone(value)); registrate.get(`${scope}.${key}`)?.onChange?.(value); Hooks.callAll("updateSetting", { key: `${scope}.${key}`, value }); return value; }
  }
};

const { registerParadossoNarratore, getPool, POOL_SETTING, attoriScheda } = await import(new URL("scripts/paradosso-narratore.js", ROOT).href);
const { registerQuadroNarratore, QuadroNarratore, nuovaSessione, iniziaSessione, cambioScena, getScena, getOrologi, attoriDelQuadro, statusMago, OROLOGI_SETTING } = await import(new URL("scripts/quadro-narratore.js", ROOT).href);
const { ADDOSSO_FLAG, MAGHI_SETTING, QUADRO_SETTING, SCENA_SETTING } = await import(new URL("scripts/menu-paradosso.js", ROOT).href);
registerParadossoNarratore();
// Il pannello dei giocatori vuole il DOM: al ready passano solo i ganci del Quadro.
const readyPrima = (hooks.ready ?? []).length;
registerQuadroNarratore();
for (const fn of hooks.ready.slice(readyPrima)) fn();

// 0. La barra di sinistra: per il Narratore il tasto apre il Quadro (contatore), quello del menù apre il menù.
{
  const controls = {};
  Hooks.callAll("getSceneControlButtons", controls);
  const controllo = controls["wod5e-mage-paradosso"];
  assert.ok(controllo, "il controllo del Paradosso nella barra");
  assert.equal(controllo.tools.pannello.title, "WOD5E_MAGE.Menu.QuadroTitle");
  assert.equal(controllo.tools.spendi.visible, true);
  await controllo.tools.spendi.onChange();
  assert.ok(QuadroNarratore.aperto?.rendered, "il Quadro si apre");
  assert.equal(QuadroNarratore.aperto.modo, "menu");
  await controllo.tools.pannello.onChange();
  assert.equal(QuadroNarratore.aperto.modo, "contatore");
  assert.equal(game.settings.get(MODULE, QUADRO_SETTING).modo, "contatore");
}

// Il finto dialogo: legge i campi che i callback chiedono a dialog.element.
function elementoDialogo({ maghi = [], scena = "", posto = "normale" } = {}) {
  return {
    querySelectorAll: (sel) => (sel === "input[name=mago]:checked" ? maghi.map((value) => ({ value })) : []),
    querySelector: (sel) => (sel === "[name=scena]" ? { value: scena } : sel === "[name=posto]" ? { value: posto } : null)
  };
}
function rispondi(azione, element) {
  sim.dialogo = async (config) => {
    sim.dialoghi.push(config);
    const bottone = config.buttons.find((b) => b.action === azione);
    return bottone ? bottone.callback(null, null, { element }) : azione;
  };
}

// 1. La Nuova sessione: il Narratore spunta Guendalina e Luca, prima scena Combattimento; la riserva era a 4 e torna a zero.
await game.settings.set(MODULE, POOL_SETTING, { points: 4, visible: false, log: [{ kind: "manual", amount: 4, when: 1 }] });
await guendalina.setFlag(MODULE, ADDOSSO_FLAG, { vecchio: { id: "vecchio", voce: "fiacco", nome: "Fiacco", famiglia: "tocchi", durata: "scena", quando: 1 } });
await game.settings.set(MODULE, OROLOGI_SETTING, { vecchio: { id: "vecchio", titolo: "Vecchio", segmenti: 4, pieni: 1, paradosso: { voce: "carica" } } });
// Senza maghi nel Quadro (27/9) la Nuova sessione apre lo stesso la pagina del Quadro (i maghi
// ci si trascinano), ma Inizia non parte: avvisa. La vecchia finestra di scelta non c'è più.
const dialoghiPrima = sim.dialoghi.length;
assert.equal(await nuovaSessione(), true, "la pagina della sessione si apre");
assert.equal(sim.dialoghi.length, dialoghiPrima, "nessuna finestra");
const appSessione = QuadroNarratore.aperto;
assert.equal(appSessione.sessioneAperta, true);
{
  const options = {};
  appSessione._configureRenderOptions(options);
  assert.deepEqual(options.parts, ["testa", "sessione"], "la pagina prende il posto del modo in uso");
}
assert.equal(await iniziaSessione({ tipo: "combattimento", posto: "dissonante" }), false, "senza maghi non parte");
assert.match(sim.notifiche.at(-1), /Nessun mago nel Quadro/);
// Giocano i maghi del Quadro, quelli trascinati dagli Attori: Guendalina e Luca.
await game.settings.set(MODULE, MAGHI_SETTING, { ids: ["a1", "a2"] });
{
  const options = {};
  appSessione._configureRenderOptions(options);
  const ctx = await appSessione._prepareContext(options);
  assert.equal(ctx.sessione, true);
  assert.deepEqual(ctx.maghi.map((m) => m.name), ["Guendalina", "Luca"]);
  assert.equal(ctx.modi.some((m) => m.attivo), false, "nessun modo acceso mentre la pagina è aperta");
  const html = (await renderTemplate(`modules/${MODULE}/templates/quadro/testa.hbs`, ctx)) + (await renderTemplate(`modules/${MODULE}/templates/quadro/sessione.hbs`, ctx));
  assert.match(html, /wod5e-mage-quadro-sessione[\s\S]*Guendalina[\s\S]*Luca/);
  assert.ok(!html.includes("Ianira") && !html.includes('data-id="n1"'), "chi non è nel Quadro non compare");
  assert.match(html, /Sara/);
  for (const marker of ['data-role="trascina"', 'name="scena"', 'name="posto"', 'data-action="magoTogli" data-id="a1"', 'data-action="sessioneInizia"', 'data-action="sessioneAnnulla"']) assert.ok(html.includes(marker), `sessione.hbs: manca ${marker}`);
  assert.ok(!html.includes('data-action="sessioneInizia" disabled'), "con i maghi Inizia è acceso");
}
// Inizia dalla pagina: legge le tendine, parte, e la pagina si chiude sul modo di prima.
const tendine = { querySelector: (sel) => (sel === "[name=scena]" ? { value: "combattimento" } : sel === "[name=posto]" ? { value: "dissonante" } : null) };
await QuadroNarratore.DEFAULT_OPTIONS.actions.sessioneInizia.call(appSessione, { preventDefault() {} }, { closest: () => tendine });
assert.equal(appSessione.sessioneAperta, false, "a sessione iniziata la pagina si chiude");
assert.deepEqual(attoriDelQuadro().map((a) => a.id), ["a1", "a2"]);
assert.deepEqual(attoriScheda().map((a) => a.id), ["a1", "a2"], "la Scheda del Paradosso legge i maghi del Quadro");
assert.equal(getPool().points, 0);
assert.equal(getScena().tipo, "combattimento");
assert.equal(getScena().posto, "dissonante");
assert.equal(getScena().numero, 1);
assert.ok(getScena().inizio > 0, "la sessione segna il suo inizio");
assert.equal(guendalina.getFlag(MODULE, ADDOSSO_FLAG), undefined, "gli effetti della sessione prima se ne vanno");
assert.deepEqual(getOrologi(), [], "gli orologi vecchi si chiudono");
assert.ok(sim.notifiche.at(-1).includes("2 maghi"));
const inizioSessione = getScena().inizio;

// 2. Il contatore: il contesto e il template.
const app = new QuadroNarratore();
async function contesto(modo) {
  await game.settings.set(MODULE, QUADRO_SETTING, { ...game.settings.get(MODULE, QUADRO_SETTING), modo });
  const options = {};
  app._configureRenderOptions(options);
  assert.deepEqual(options.parts, ["testa", modo], "una PART per modo, dietro la testa");
  const ctx = await app._prepareContext(options);
  const html = (await renderTemplate(`modules/${MODULE}/templates/quadro/testa.hbs`, ctx)) + (await renderTemplate(`modules/${MODULE}/templates/quadro/${modo}.hbs`, ctx));
  return { ctx, html };
}
{
  const { ctx, html } = await contesto("contatore");
  assert.equal(ctx.points, 0);
  assert.equal(ctx.scena.nome, "Combattimento");
  assert.equal(ctx.posto, "Posto dissonante");
  assert.equal(ctx.inScena, 0);
  assert.equal(ctx.modi.filter((m) => m.attivo).map((m) => m.id).join(), "contatore");
  assert.match(html, /wod5e-mage-quadro-modo attivo" data-action="modo" data-modo="contatore"/);
  assert.match(html, /data-action="modo" data-modo="menu"/);
  assert.match(html, /Combattimento · 1/);
  assert.match(html, /Il Paradosso non ha niente in scena/);
  assert.match(html, /data-action="nuovaSessione"/);
  assert.match(html, /data-action="cambioScena"/);
}

// 3. Un Volgare con testimoni chiuso in chat: 2 punti copiati, una volta sola.
const cartaVolgare = { id: "v1", timestamp: inizioSessione + 10, speaker: { actor: "a1", alias: "Guendalina" }, flavor: "<b>Fulmine</b>", flags: { [MODULE]: { rollCard: { vulgar: true, advancedDifficulty: true, threshold: 5, title: "Fulmine", round: 0 } } }, update: async (changes) => { Object.assign(cartaVolgare.flags[MODULE], changes.flags[MODULE]); return cartaVolgare; } };
sim.messages.push(cartaVolgare);
for (const fn of hooks.createChatMessage) await fn(cartaVolgare);
assert.equal(getPool().points, 2, "la copia del Volgare con testimoni");
assert.equal(getPool().log.at(-1).kind, "copia");
for (const fn of hooks.createChatMessage) await fn(cartaVolgare);
assert.equal(getPool().points, 2, "la carta si copia una volta sola");
const cartaAbilita = { id: "s1", timestamp: inizioSessione + 11, speaker: { actor: "a2", alias: "Luca" }, flags: { [MODULE]: { rollCard: { vulgar: false, skill: true, threshold: 0 } } } };
for (const fn of hooks.createChatMessage) await fn(cartaAbilita);
assert.equal(getPool().points, 2, "un tiro di Abilità non porta punti");
await game.settings.set(MODULE, POOL_SETTING, { ...getPool(), points: 9 });

// 4. Il menù (25/9): tutte le famiglie in vista e apribili, le voci in ordine alfabetico senza sottotitoli di scena; il Volgare in tendina; la voce aperta coi comandi.
{
  const { ctx, html } = await contesto("menu");
  assert.equal(ctx.cassetti.length, 8);
  assert.equal(ctx.cassetti.reduce((n, c) => n + c.conto, 0), 65, "tutte le 65 voci in vista");
  assert.ok(ctx.cassetti.every((c) => !c.chiusa), "le famiglie partono aperte");
  const scettro = ctx.cassetti.find((c) => c.famiglia === "scettro");
  assert.equal(scettro.conto, 21);
  assert.deepEqual(scettro.voci.slice(0, 5).map((v) => v.nome), ["Anticipo", "Chiusura", "Concorrenza", "Controllo", "Domande"], "in ordine alfabetico, senza gruppi");
  assert.deepEqual(ctx.cassetti.find((c) => c.famiglia === "tocchi").voci.map((v) => v.nome), ["Condizione", "Fiacco", "Fragile", "Rigidità", "Scottatura", "Tremore"]);
  assert.match(html, /<option value="combattimento" selected>/);
  assert.ok(!html.includes("wod5e-mage-menu-spesa") && !html.includes('class="wod5e-mage-menu-info"'), "nessuna voce aperta, nessun testo");
  assert.match(html, /wod5e-mage-menu-famiglia" data-famiglia="tocchi"/);
  assert.ok(!html.includes("data-gruppo"), "niente sottotitoli di scena");
  assert.match(html, /data-action="famiglia" data-famiglia="tocchi" aria-expanded="true"/);
  assert.match(html, /data-action="testo" data-voce="tremore"/);
  assert.equal((html.match(/data-action="voce"/g) ?? []).length, 65);
  // Il Narratore chiude le Conseguenze: la famiglia resta col titolo, senza righe; la scelta resta nell'impostazione del client.
  await QuadroNarratore.DEFAULT_OPTIONS.actions.famiglia.call(app, { preventDefault() {} }, { dataset: { famiglia: "tocchi" } });
  const chiusa = await contesto("menu");
  assert.ok(chiusa.ctx.cassetti.find((c) => c.famiglia === "tocchi").chiusa);
  assert.match(chiusa.html, /wod5e-mage-menu-famiglia chiusa" data-famiglia="tocchi"/);
  assert.match(chiusa.html, /data-action="famiglia" data-famiglia="tocchi" aria-expanded="false"/);
  assert.deepEqual(game.settings.get(MODULE, QUADRO_SETTING).chiuse, ["tocchi"]);
  await QuadroNarratore.DEFAULT_OPTIONS.actions.famiglia.call(app, { preventDefault() {} }, { dataset: { famiglia: "tocchi" } });
  assert.deepEqual(game.settings.get(MODULE, QUADRO_SETTING).chiuse, []);
  // Il Narratore apre la voce Ritorno: la scheda e la spesa col Volgare di Guendalina.
  await QuadroNarratore.DEFAULT_OPTIONS.actions.voce.call(app, { preventDefault() {} }, { dataset: { voce: "ritorno" } });
  const aperto = await contesto("menu");
  const ritorno = aperto.ctx.cassetti.find((c) => c.famiglia === "comuni").voci.find((v) => v.id === "ritorno");
  assert.ok(ritorno.aperta);
  assert.equal(ritorno.volgari.length, 1);
  assert.match(ritorno.volgari[0].label, /Guendalina · Fulmine · Volgare con testimoni · soglia 5/);
  assert.ok(ritorno.bersagli.find((m) => m.id === "a1").selected, "su chi: il mago del Volgare");
  assert.equal(ritorno.suChiVuoto, false);
  assert.equal(ritorno.breve, "l'effetto svanisce, l'ostacolo torna");
  assert.equal(ritorno.prezzoLabel, "la soglia");
  assert.match(aperto.html, /<span class="breve">l&#x27;effetto svanisce, l&#x27;ostacolo torna<\/span>/);
  assert.match(aperto.html, /Conseguenze Magick/);
  assert.ok(!aperto.html.includes("I Tocchi"));
  assert.ok(!aperto.html.includes('class="wod5e-mage-menu-info"'), "il testo resta chiuso finché non si chiede");
  // La «i» apre il testo della voce, e resta aperto anche se la voce si chiude.
  await QuadroNarratore.DEFAULT_OPTIONS.actions.testo.call(app, { preventDefault() {} }, { dataset: { voce: "ritorno" } });
  const conTesto = await contesto("menu");
  assert.match(conTesto.html, /class="wod5e-mage-menu-info"/);
  assert.match(conTesto.html, /In questa scena\./, "la faccia della scena sta nel testo");
  await QuadroNarratore.DEFAULT_OPTIONS.actions.testo.call(app, { preventDefault() {} }, { dataset: { voce: "combattimento-stop" } });
  const testoScena = await contesto("menu");
  assert.match(testoScena.html, /Scena\.<\/b> Combattimento \(scena in corso\)/, "il testo di una voce di scena dice la sua scena");
  await QuadroNarratore.DEFAULT_OPTIONS.actions.testo.call(app, { preventDefault() {} }, { dataset: { voce: "combattimento-stop" } });
  assert.equal((conTesto.html.match(/wod5e-mage-menu-mossa/g) ?? []).length, 3);
  await QuadroNarratore.DEFAULT_OPTIONS.actions.testo.call(app, { preventDefault() {} }, { dataset: { voce: "ritorno" } });
  assert.equal(ritorno.stima, 5, "la soglia del Volgare");
  assert.match(aperto.html, /wod5e-mage-menu-spesa" data-voce="ritorno"/);
  assert.match(aperto.html, /data-role="vede" value="tutti"/);
  assert.match(aperto.html, /<option value="v1" data-actor="a1" data-soglia="5" selected>/);
  assert.match(aperto.html, /Il prezzo è la soglia del Volgare/);
  assert.match(aperto.html, /data-action="spendi" data-voce="ritorno"/);
}

// 4b. Un Volgare di Ianira (fuori dal Quadro), alias vuoto e flavor a capo: l'etichetta senza buchi, e lei fra i bersagli come «fuori dal Quadro».
{
  const fuori = { id: "v0", timestamp: inizioSessione + 12, speaker: { actor: "a3", alias: "" }, flavor: "<div>\n<b>Nebbia</b></div>", flags: { [MODULE]: { rollCard: { vulgar: true, advancedDifficulty: false, threshold: 4 } } }, update: async () => fuori };
  sim.messages.push(fuori);
  const { ctx, html } = await contesto("menu");
  const ritorno = ctx.cassetti.find((c) => c.famiglia === "comuni").voci.find((v) => v.id === "ritorno");
  assert.equal(ritorno.volgari[0].label, "Nebbia · Volgare · soglia 4", "niente «· ·» quando manca il nome");
  const ianira = ritorno.bersagli.find((b) => b.id === "a3");
  assert.ok(ianira?.fuori && ianira.selected, "chi ha lanciato entra fra i bersagli anche da fuori");
  assert.equal(ianira.label, "Ianira (fuori dal Quadro)");
  assert.equal(ritorno.suChiVuoto, false);
  assert.ok(html.includes("Ianira (fuori dal Quadro)"));
  sim.messages.pop();
}

// 4c. Una voce con l'orologio aperta: il riquadro precompilato (nome, segmenti a scelta rapida, cosa scatta dal rimbalzo).
{
  await QuadroNarratore.DEFAULT_OPTIONS.actions.voce.call(app, { preventDefault() {} }, { dataset: { voce: "carica" } });
  const { ctx, html } = await contesto("menu");
  const carica = ctx.cassetti.find((c) => c.famiglia === "orologi").voci.find((v) => v.id === "carica");
  assert.ok(carica.aperta && carica.campi.orologio && carica.campi.rimbalzo);
  assert.equal(carica.titoloDefault, "Carica");
  assert.equal(carica.segmentiDefault, 4);
  assert.deepEqual(carica.segmentiScelte.map((s) => `${s.n}${s.attivo ? "*" : ""}`), ["3", "4*", "6", "8"]);
  assert.ok(carica.rimbalzi.length > 0);
  assert.equal(carica.scattaDefault, carica.rimbalzi[0].nome, "cosa scatta parte dal primo rimbalzo");
  assert.match(html, /wod5e-mage-menu-orologio/);
  assert.match(html, /data-role="titolo" value="Carica"/);
  assert.match(html, /<button type="button" class="attivo" data-n="4">4<\/button>/);
  assert.match(html, new RegExp(`data-role="scatta" value="${carica.rimbalzi[0].nome}"`));
  assert.match(html, new RegExp(`data-nome="${carica.rimbalzi[0].nome}"`));
  const ombra = cassettiApertiPer("ombra");
  await ombra;
  await QuadroNarratore.DEFAULT_OPTIONS.actions.voce.call(app, { preventDefault() {} }, { dataset: { voce: "carica" } });
}
async function cassettiApertiPer(id) {
  await QuadroNarratore.DEFAULT_OPTIONS.actions.voce.call(app, { preventDefault() {} }, { dataset: { voce: id } });
  const { ctx } = await contesto("menu");
  const voce = ctx.cassetti.flatMap((c) => c.voci).find((v) => v.id === id);
  assert.equal(voce.segmentiDefault, 3, "una Presenza parte da tre segmenti");
  assert.equal(voce.scattaDefault, "Ombra entra in scena");
}

// 5. La spesa: Ritorno su Guendalina, risponde a Fulmine; poi Carica con l'orologio.
function scatolaSpesa(voceId, campi) {
  const el = (spec) => (spec == null ? null : { value: spec.value ?? "", textContent: spec.text ?? "", selectedOptions: [{ dataset: { actor: spec.actor ?? "", soglia: spec.soglia ?? "0", prezzo: spec.prezzo ?? "0" }, textContent: spec.text ?? "" }] });
  const box = {
    dataset: { voce: voceId },
    classList: { toggle() {} },
    querySelector: (sel) => { const m = sel.match(/\[data-role=(\w+)\]/); if (m) return el(campi[m[1]]); if (sel.includes("data-action=spendi")) return { disabled: false }; return null; }
  };
  app.element = { querySelector: (sel) => (sel.includes(`data-voce="${voceId}"`) ? box : null), querySelectorAll: () => [], classList: { toggle() {} } };
  return box;
}
scatolaSpesa("ritorno", { rispondeA: { value: "v1", actor: "a1", soglia: "5", text: "Guendalina · Fulmine · Volgare con testimoni · soglia 5" }, suChi: { value: "a1" }, vede: { value: "tutti" }, nota: { value: "il muro sfarfalla" } });
const messaggiPrima = sim.messages.length;
await QuadroNarratore.DEFAULT_OPTIONS.actions.spendi.call(app, { preventDefault() {} }, { dataset: { voce: "ritorno" } });
assert.equal(getPool().points, 4, "9 − 5");
assert.equal(getPool().log.at(-1).kind, "menu");
assert.equal(getPool().log.at(-1).actorName, "Guendalina");
assert.equal(getPool().log.at(-1).scena, 1);
{
  const addosso = guendalina.getFlag(MODULE, ADDOSSO_FLAG);
  const righe = Object.values(addosso);
  assert.equal(righe.length, 1);
  assert.equal(righe[0].voce, "ritorno");
  assert.equal(righe[0].durata, "turno");
  assert.equal(righe[0].risponde, "Guendalina · Fulmine · Volgare con testimoni · soglia 5");
  const carta = sim.messages.at(-1);
  assert.equal(sim.messages.length, messaggiPrima + 1);
  assert.deepEqual(carta.whisper, [], "a tutti");
  assert.match(carta.content, /Il Paradosso agisce · Ritorno <small>annunciato<\/small>/);
  assert.match(carta.content, /Risponde a/);
  assert.match(carta.content, /Segno\./);
  assert.match(carta.content, /il muro sfarfalla/);
  assert.equal((carta.content.match(/wod5e-mage-menu-mossa/g) ?? []).length, 3);
  assert.ok(!carta.content.includes("Prezzo") && !carta.content.includes("wod5e-mage-menu-conto"), "il prezzo non va in chat");
  assert.equal(carta.flags[MODULE].paradossoMenu.prezzo, 5);
}
// Carica: 1 punto più il rimbalzo scelto (Residuo, 2), l'orologio nascosto ai giocatori.
scatolaSpesa("carica", { rispondeA: { value: "v1", actor: "a1", soglia: "5", text: "Guendalina · Fulmine" }, suChi: { value: "a1" }, vede: { value: "narratori" }, segmenti: { value: "3" }, rimbalzo: { value: "residuo", prezzo: "2" }, nota: { value: "" } });
await QuadroNarratore.DEFAULT_OPTIONS.actions.spendi.call(app, { preventDefault() {} }, { dataset: { voce: "carica" } });
assert.equal(getPool().points, 1, "4 − 3");
{
  const orologi = getOrologi();
  assert.equal(orologi.length, 1);
  const [c] = orologi;
  assert.equal(c.titolo, "Carica · Guendalina");
  assert.equal(c.segmenti, 3);
  assert.equal(c.pieni, 0);
  assert.equal(c.visibile, false);
  assert.deepEqual([c.colore, c.forma], ["viola", "cerchio"]);
  assert.equal(c.paradosso.scatta, "Residuo");
  assert.equal(c.paradosso.voce, "carica");
  const carta = sim.messages.at(-1);
  assert.deepEqual(carta.whisper, ["gm"], "solo ai Narratori");
  assert.match(carta.content, /3 segmenti · cerchio viola/);
  // Il contatore lo mostra in scena, disegnato a segmenti (un cerchio viola, tre spicchi); la testa lo porta in miniatura in ogni modo.
  const { ctx, html } = await contesto("contatore");
  assert.equal(ctx.inScena, 1);
  assert.match(html, /<svg class="wod5e-mage-orologio" viewBox="0 0 100 100" width="48" height="48"/);
  assert.match(html, /<circle cx="50" cy="50" r="46"/);
  assert.equal((html.match(/clip-path="url\(#oro-/g) ?? []).length, 3 + 3, "tre spicchi grandi nel contatore e tre in miniatura in testa");
  assert.match(html, /aria-label="Carica · Guendalina 0\/3"/);
  assert.match(html, /cerchio viola/);
  assert.match(html, /Scatta: Residuo/);
  assert.match(html, /data-action="orologioAvanti" data-id="/);
  assert.match(html, /wod5e-mage-quadro-orologi-mini/);
  const menu = await contesto("menu");
  assert.match(menu.html, /wod5e-mage-quadro-orologi-mini/, "anche nel menù");
  assert.match(menu.html, /width="26" height="26"/);
}
// Non bastano i punti: la spesa si ferma con l'avviso.
scatolaSpesa("residuo", { rispondeA: { value: "", soglia: "0" }, suChi: { value: "a2" }, vede: { value: "tutti" } });
await QuadroNarratore.DEFAULT_OPTIONS.actions.spendi.call(app, { preventDefault() {} }, { dataset: { voce: "residuo" } });
assert.equal(getPool().points, 1);
assert.match(sim.notifiche.at(-1), /^!Prezzo 2, punti 1/);
// I Grandi non si comprano.
scatolaSpesa("anomalia", { rispondeA: { value: "", soglia: "0" }, suChi: { value: "" }, vede: { value: "tutti" } });
await QuadroNarratore.DEFAULT_OPTIONS.actions.spendi.call(app, { preventDefault() {} }, { dataset: { voce: "anomalia" } });
assert.match(sim.notifiche.at(-1), /non si compra/);

// 6. Un altro Volgare: l'orologio di Carica avanza da solo.
const cartaVolgare2 = { id: "v2", timestamp: Date.now(), speaker: { actor: "a2", alias: "Luca" }, flags: { [MODULE]: { rollCard: { vulgar: true, advancedDifficulty: false, threshold: 3, title: "Scatto" } } }, update: async (changes) => { Object.assign(cartaVolgare2.flags[MODULE], changes.flags[MODULE]); return cartaVolgare2; } };
sim.messages.push(cartaVolgare2);
for (const fn of hooks.createChatMessage) await fn(cartaVolgare2);
assert.equal(getPool().points, 2, "1 + 1");
assert.equal(getOrologi()[0].pieni, 1, "la Carica avanza col Volgare");

// 7. I giocatori: lo status di Guendalina, aperta, con Attivi, Passivi e Magick in atto; Luca chiuso coi conti.
{
  await QuadroNarratore.DEFAULT_OPTIONS.actions.mago.call(app, { preventDefault() {} }, { dataset: { id: "a1" } });
  const { ctx, html } = await contesto("giocatori");
  assert.equal(ctx.maghi.length, 2);
  const [g, l] = ctx.maghi;
  assert.equal(g.name, "Guendalina");
  assert.ok(g.aperto && !l.aperto);
  assert.deepEqual(g.salute, { resta: 6, max: 6 }, "2 + Costituzione + Fermezza");
  assert.deepEqual(g.volonta, { resta: 5, max: 6 });
  assert.equal(g.quintessenza, 3);
  assert.equal(g.ruota, 4);
  assert.deepEqual(g.attivi.map((a) => a.nome), ["Ritorno"]);
  assert.equal(g.attivi[0].durataLabel, "fino al giro dopo");
  assert.deepEqual(g.passivi.map((p) => p.nome), ["Quadrante"]);
  assert.deepEqual(g.magick.map((m) => m.nome), ["Muro di ghiaccio"], "solo la Magick accesa");
  assert.equal(g.magick[0].tipo, "Volgare");
  assert.deepEqual(g.utenti, [{ name: "Sara", active: true }]);
  assert.equal(l.collegato, false);
  assert.ok(l.vuoto);
  assert.match(html, /In gioco: 2/);
  assert.match(html, /wod5e-mage-quadro-mago aperto/);
  assert.match(html, /data-action="attivoTogli" data-actor="a1" data-id="ritorno-/);
  assert.match(html, /Quadrante/);
  assert.match(html, /Muro di ghiaccio <small>Volgare · soglia 5<\/small>/);
  assert.match(html, /niente addosso/);
  assert.doesNotMatch(html, /magoAggiungi/, "via il tasto Aggiungi e la sua finestra (25/9)");
  assert.match(html, /wod5e-mage-quadro-trascina[\s\S]*trascina qui un mago dagli Attori/, "in testa, l'invito a trascinare");
  const stato = statusMago(ianira, { localize });
  assert.deepEqual(stato.utenti, []);
  assert.ok(stato.vuoto);
}

// 7b. Il trascinamento dagli Attori (25/9): un mago del mondo entra in coda; un PNG che non è mago, un mago già dentro
// o un attore di compendio avvisano e non entrano; un oggetto resta muto.
{
  globalThis.fromUuid = async (uuid) => actors.find((a) => a.id === String(uuid).split(".").pop()) ?? null;
  const prima = sim.notifiche.length;
  assert.equal((await app.accogli({ type: "Actor", uuid: "Actor.n1" })).motivo, "nonMago");
  assert.match(sim.notifiche.at(-1), /^!Guardia non è un mago/);
  assert.equal((await app.accogli({ type: "Actor", uuid: "Actor.a1" })).motivo, "giaDentro");
  assert.match(sim.notifiche.at(-1), /^!Guendalina è già nel Quadro/);
  assert.equal((await app.accogli({ type: "Actor", uuid: "Compendium.wod5e-mage.maghi.Actor.a3" })).motivo, "compendio");
  assert.match(sim.notifiche.at(-1), /viene da un compendio/);
  assert.equal((await app.accogli({ type: "Item", uuid: "Item.x1" })).ok, false);
  assert.equal((await app.accogli(null)).ok, false);
  assert.equal(sim.notifiche.length, prima + 3, "solo i tre casi avvisano");
  assert.deepEqual(attoriDelQuadro().map((a) => a.id), ["a1", "a2"], "nessuno è entrato");
  const esito = await app.accogli({ type: "Actor", uuid: "Actor.a3" });
  assert.equal(esito.ok, true);
  assert.deepEqual(attoriDelQuadro().map((a) => a.id), ["a1", "a2", "a3"], "Ianira entra in coda");
  const { html } = await contesto("giocatori");
  assert.match(html, /In gioco: 3/);
  await QuadroNarratore.DEFAULT_OPTIONS.actions.magoTogli.call(app, { preventDefault() {} }, { dataset: { id: "a3" } });
  assert.deepEqual(attoriDelQuadro().map((a) => a.id), ["a1", "a2"]);
  delete globalThis.fromUuid;
}

// 8. Il Cambio scena: Ritorno (fino al giro dopo) finisce, la scena diventa la 2, Rituale.
rispondi("cambia", elementoDialogo({ scena: "rituale", posto: "normale" }));
assert.equal(await cambioScena(), true);
assert.match(sim.dialoghi.at(-1).content, /Scena 2: dove andate\?/);
assert.match(sim.dialoghi.at(-1).content, /Ritorno · Guendalina/);
assert.deepEqual(Object.keys(guendalina.getFlag(MODULE, ADDOSSO_FLAG) ?? {}), [], "il Ritorno finisce con la scena");
assert.equal(getScena().tipo, "rituale");
assert.equal(getScena().numero, 2);
assert.equal(getPool().log.at(-1).kind, "scena");
{
  const { ctx } = await contesto("menu");
  assert.ok(ctx.cassetti.find((c) => c.famiglia === "scena").voci.some((v) => v.id === "rituale-ospite"), "il menù segue la scena");
  assert.equal(ctx.cassetti.find((c) => c.famiglia === "comuni").voci[0].faccia.testo.length > 0, true, "la faccia di Rituale");
}

// 9. Togli un mago dal Quadro, e Nuova sessione annullata non cambia niente.
await QuadroNarratore.DEFAULT_OPTIONS.actions.magoTogli.call(app, { preventDefault() {} }, { dataset: { id: "a2" } });
assert.deepEqual(attoriDelQuadro().map((a) => a.id), ["a1"]);
assert.equal(await nuovaSessione(), true);
await QuadroNarratore.DEFAULT_OPTIONS.actions.sessioneAnnulla.call(QuadroNarratore.aperto, { preventDefault() {} });
assert.equal(QuadroNarratore.aperto.sessioneAperta, false, "Annulla chiude la pagina senza toccare niente");
assert.equal(getScena().numero, 2);
assert.equal(game.settings.get(MODULE, SCENA_SETTING).tipo, "rituale");
assert.deepEqual(game.settings.get(MODULE, MAGHI_SETTING).ids, ["a1"]);

console.log(`finta Foundry, il Quadro: ok, messaggi: ${sim.messages.length}, notifiche: ${sim.notifiche.length}`);

// Con QUADRO_PAGINA=<cartella>: scrive i tre modi in HTML (e una carta in chat) per guardarli in un browser con il CSS del modulo.
if (process.env.QUADRO_PAGINA) {
  const { mkdirSync, writeFileSync } = await import("node:fs");
  const dir = process.env.QUADRO_PAGINA;
  mkdirSync(dir, { recursive: true });
  await game.settings.set(MODULE, POOL_SETTING, { ...getPool(), points: 7 });
  await QuadroNarratore.DEFAULT_OPTIONS.actions.voce.call(app, { preventDefault() {} }, { dataset: { voce: "carica" } });
  await QuadroNarratore.DEFAULT_OPTIONS.actions.testo.call(app, { preventDefault() {} }, { dataset: { voce: "tremore" } });
  for (const modo of ["contatore", "menu", "giocatori"]) {
    const { html } = await contesto(modo);
    writeFileSync(`${dir}/${modo}.html`, html);
  }
  // La pagina della Nuova sessione (27/9), con Guendalina sola nel Quadro.
  app.apriSessione();
  {
    const options = {};
    app._configureRenderOptions(options);
    const ctx = await app._prepareContext(options);
    writeFileSync(`${dir}/sessione.html`, (await renderTemplate(`modules/${MODULE}/templates/quadro/testa.hbs`, ctx)) + (await renderTemplate(`modules/${MODULE}/templates/quadro/sessione.hbs`, ctx)));
  }
  writeFileSync(`${dir}/carta.html`, sim.messages.filter((m) => m.content).map((m) => m.content).join("\n"));
  console.log(`pagine scritte in ${dir}`);
}
