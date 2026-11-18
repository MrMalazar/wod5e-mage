// Il Quadro del Narratore nella finta Foundry (24/9): la Nuova sessione coi
// maghi scelti dal Narratore, i tre modi (contatore, menù, giocatori) col
// loro contesto e i loro template, le spese dal menù circolare (18/11/2026)
// con la fonte vera del Quadro (i token, i fatti fissati, il turno), la
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
globalThis.ChatMessage = { getSpeaker: ({ actor } = {}) => ({ actor: actor?.id, alias: actor?.name }), create: async (data) => { const m = { id: `m${sim.messages.length + 1}`, timestamp: Date.now(), ...data }; sim.messages.push(m); return m; } };

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
const { registerQuadroNarratore, QuadroNarratore, nuovaSessione, iniziaSessione, cambioScena, getScena, getOrologi, attoriDelQuadro, statusMago, OROLOGI_SETTING, fonteDelQuadro, pngInScena, attoreScelto, getFissati, statoTurno } = await import(new URL("scripts/quadro-narratore.js", ROOT).href);
const { getMagickBalance } = await import(new URL("scripts/magick-balance.js", ROOT).href);
const { ADDOSSO_FLAG, MAGHI_SETTING, QUADRO_SETTING, SCENA_SETTING, nuovoOrologioParadosso } = await import(new URL("scripts/menu-paradosso.js", ROOT).href);
const { MenuCircolare, foglioIcone } = await import(new URL("scripts/menu-circolare-ui.js", ROOT).href);
const { righeDelLato, FATTI_SETTING, TURNO_SETTING } = await import(new URL("scripts/menu-circolare.js", ROOT).href);
const { MENU_SFERE } = await import(new URL("scripts/data/menu-sfere.js", ROOT).href);
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

// 4. Il menù circolare (18/11/2026): il modo del menù porta solo il riquadro, che il menù riempie da sé;
// la fonte del Quadro gli dà i maghi con le loro Sfere, i PNG della scena, il token scelto.
const NEMICO_SHEET = `${MODULE}.NemicoSheet`;
function nemico(id, name, magick) {
  const dati = { [MODULE]: { nemico: { magick } }, core: { sheetClass: NEMICO_SHEET } };
  return { id, name, hasPlayerOwner: false, getFlag: (scope, key) => dati[scope]?.[key] };
}
const sgherro = nemico("n2", "Sgherro", { on: true, arete: 2, domini: { entropy: true, spirit: true } });
const tokens = [{ id: "t1", name: "Sgherro", actor: sgherro }, { id: "t2", name: "Guendalina", actor: guendalina }, { id: "t3", name: "Guardia", actor: png }];
let controllati = [];
globalThis.canvas = {
  scene: { tokens: { contents: tokens } },
  tokens: {
    get controlled() { return controllati; },
    releaseAll() { controllati = []; },
    get: (id) => ({ id, control: () => { controllati = [{ document: tokens.find((t) => t.id === id) }]; } })
  }
};
await guendalina.setFlag(MODULE, "selectedSpheres", { forces: true, mind: true });
{
  const { ctx, html } = await contesto("menu");
  assert.equal(ctx.modi.find((m) => m.attivo)?.id, "menu");
  assert.match(html, /<div class="wod5e-mage-quadro-mc" data-role="menu-circolare"><\/div>/);
  assert.ok(!html.includes("wod5e-mage-menu-cassetto") && !html.includes('data-action="voce"'), "il menù a 65 voci non c'è più");
  const fonte = fonteDelQuadro();
  assert.deepEqual(fonte.maghi().map((m) => [m.nome, m.sfere]), [["Guendalina", ["forces", "mind"]], ["Luca", []]], "le Sfere segnate dei maghi del Quadro");
  assert.deepEqual(pngInScena().map((p) => [p.nome, p.sfere, p.magick, p.arete]), [["Sgherro", ["entropy", "spirit"], true, 2], ["Guardia", [], false, 1]], "i token dei giocatori non agiscono per il Paradosso");
  assert.equal(attoreScelto(), null, "senza token agisce il Paradosso");
  controllati = [{ document: tokens[1] }];
  assert.equal(attoreScelto(), null, "col token di un giocatore agisce lo stesso il Paradosso");
  await fonte.seleziona("t1");
  assert.equal(attoreScelto()?.nome, "Sgherro", "il token scelto dal menù è quello selezionato sulla mappa");
  assert.equal(fonte.nomeSfera("forces"), "Forze", "i nomi delle Sfere della scheda");
  assert.equal(fonte.riserva(), 9);
  assert.deepEqual(statoTurno(), { combattimento: false, chiave: "manuale:1", n: 1, usato: "" });
  const vista = new MenuCircolare(fonte).vista();
  assert.match(vista, /mc-sph c-t[^"]*" [^>]*data-a="2"/, "Forza è al tavolo, con Guendalina");
  assert.match(vista, /mc-sph c-n[^"]*" [^>]*data-a="1"/, "Entropia è del nemico in scena");
  assert.match(vista, /mc-sph c-f[^"]*" [^>]*data-a="7"/, "Tempo è fuori dal tavolo");
  assert.match(vista, /<small>Fatta da<\/small><b>Sgherro<\/b>/);
}

// 5. Le spese dal menù circolare, con la fonte vera: la riserva scende subito, la carta parte dopo i cinque secondi.
const corrispondenza = MENU_SFERE[0];
const entra = righeDelLato(corrispondenza, "n")[0];
const reEsc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const menuQuadro = new MenuCircolare(fonteDelQuadro());
const chiudiTimer = () => { clearInterval(menuQuadro.tick); clearTimeout(menuQuadro.via); };
{
  // Corrispondenza, Narrativa, la prima mossa: 5 punti su Guendalina, fatta dallo Sgherro.
  await menuQuadro.esegui("sfera", "0");
  await menuQuadro.esegui("lato", "n");
  await menuQuadro.esegui("riga", entra.id);
  for (let n = 0; n < 4; n++) await menuQuadro.esegui("paga", "1");
  await menuQuadro.esegui("chi", "a1");
  const messaggiPrima = sim.messages.length;
  assert.equal(await menuQuadro.spendi(), true);
  chiudiTimer();
  assert.equal(getPool().points, 4, "9 − 5, subito");
  const voce = getPool().log.at(-1);
  assert.deepEqual([voce.kind, voce.amount, voce.actorName, voce.daName, voce.sfera, voce.lato, voce.soglia, voce.scena], ["menu", -5, "Guendalina", "Sgherro", "correspondence", "n", 5, 1]);
  assert.equal(voce.text, `Corrispondenza · ${entra.nome}`);
  const addosso = Object.values(guendalina.getFlag(MODULE, ADDOSSO_FLAG));
  assert.equal(addosso.length, 1, "la mossa resta addosso al mago scelto");
  assert.deepEqual([addosso[0].nome, addosso[0].durata, addosso[0].famiglia], [entra.nome, "scena", "correspondence"]);
  assert.equal(sim.messages.length, messaggiPrima, "la carta aspetta i cinque secondi");
  await menuQuadro.chiudiPop(false);
  chiudiTimer();
  const carta = sim.messages.at(-1);
  assert.equal(sim.messages.length, messaggiPrima + 1);
  assert.deepEqual(carta.whisper, [], "al tavolo");
  assert.match(carta.content, new RegExp(`Il Paradosso agisce · ${reEsc(entra.nome)}`));
  assert.match(carta.content, /Fatta da<\/b><span class="wod5e-mage-roll-value">Sgherro/);
  assert.match(carta.content, /Soglia per scardinare<\/b><span class="wod5e-mage-roll-value">5/);
  assert.deepEqual(carta.flags[MODULE].paradossoMenu, { mossa: entra.id, sfera: "correspondence", lato: "n", prezzo: 5, soglia: 5, fissa: false, actorId: "a1", da: "Sgherro", nascosta: false });
}
{
  // Entropia, Destino Scritto: fissa un fatto (soglia 2 + 3), nascosta col pop-up, senza mago.
  await fonteDelQuadro().seleziona(null);
  assert.equal(attoreScelto(), null);
  await menuQuadro.esegui("vai", "1", "n", "entropy-destino-scritto");
  await menuQuadro.esegui("paga", "1");
  menuQuadro.stato.nota = "per la Cabala di stasera";
  assert.equal(await menuQuadro.spendi(), true);
  await menuQuadro.nascondi();
  chiudiTimer();
  assert.equal(getPool().points, 2, "4 − 2");
  const fatti = getFissati();
  assert.equal(fatti.length, 1);
  assert.deepEqual([fatti[0].nome, fatti[0].sfera, fatti[0].sferaNome, fatti[0].soglia, fatti[0].scena], ["Destino Scritto", "entropy", "Entropia", 5, 1]);
  const carta = sim.messages.at(-1);
  assert.deepEqual(carta.whisper, ["gm"], "nascosta: solo ai Narratori");
  assert.match(carta.content, /per la Cabala di stasera/, "la nota sta nella carta nascosta");
  assert.match(carta.content, /Resta fissato finché non lo scardinano/);
  assert.equal(Object.values(guendalina.getFlag(MODULE, ADDOSSO_FLAG)).length, 1, "senza mago non va addosso a nessuno");
}
{
  // Lo scontro: una spesa del lato Combattimento per turno del tracker.
  game.combat = { started: true, id: "c1", round: 2, turn: 0 };
  await menuQuadro.esegui("sfera", "0");
  await menuQuadro.esegui("lato", "s");
  const colpo = righeDelLato(corrispondenza, "s")[0];
  await menuQuadro.esegui("riga", colpo.id);
  assert.equal(await menuQuadro.spendi(), true);
  await menuQuadro.chiudiPop(false);
  chiudiTimer();
  assert.equal(getPool().points, 1, "2 − 1");
  assert.equal(statoTurno().usato, "c1:2:0", "la spesa del turno è fatta");
  await menuQuadro.esegui("riga", righeDelLato(corrispondenza, "s")[1].id);
  assert.match(menuQuadro.vista(), /data-mc="spendi" disabled/);
  assert.equal(await menuQuadro.spendi(), false);
  assert.match(sim.notifiche.at(-1), /^!Spesa del turno già fatta/);
  game.combat.turn = 1;
  assert.match(menuQuadro.vista(), /data-mc="spendi"(?! disabled)/, "il turno dopo si spende di nuovo");
  // Non bastano i punti: la spesa si ferma con l'avviso.
  await menuQuadro.esegui("paga", "1");
  menuQuadro.stato.paga = 2;
  assert.equal(await menuQuadro.spendi(), false);
  assert.match(sim.notifiche.at(-1), /^!Prezzo 2, punti 1/);
  assert.equal(getPool().points, 1);
  game.combat = null;
  menuQuadro.allAnello();
}
// L'orologio di Carica (fino alla 1.44.0 lo apriva il menù a 65 voci; gli orologi aperti restano nel Quadro).
await game.settings.set(MODULE, OROLOGI_SETTING, { "carica-1": nuovoOrologioParadosso({ id: "carica-1", titolo: "Carica · Guendalina", segmenti: 3, visibile: false, colore: "viola", forma: "cerchio", scatta: "Residuo", voce: "carica", actorId: "a1", ordine: 1 }) });
{
  // Il contatore li mostra in scena: l'orologio disegnato a segmenti e il fatto fissato col suo tasto per scardinarlo.
  const { ctx, html } = await contesto("contatore");
  assert.equal(ctx.inScena, 2);
  assert.match(html, /<svg class="wod5e-mage-orologio" viewBox="0 0 100 100" width="48" height="48"/);
  assert.match(html, /<circle cx="50" cy="50" r="46"/);
  assert.equal((html.match(/clip-path="url\(#oro-/g) ?? []).length, 3 + 3, "tre spicchi grandi nel contatore e tre in miniatura in testa");
  assert.match(html, /aria-label="Carica · Guendalina 0\/3"/);
  assert.match(html, /cerchio viola/);
  assert.match(html, /Scatta: Residuo/);
  assert.match(html, /data-action="orologioAvanti" data-id="/);
  assert.match(html, /wod5e-mage-quadro-orologi-mini/);
  assert.match(html, /<li class="fissato">[\s\S]*Destino Scritto · Entropia · soglia 5[\s\S]*data-action="scardina" data-id="entropy-destino-scritto-/);
  const menu = await contesto("menu");
  assert.match(menu.html, /wod5e-mage-quadro-orologi-mini/, "anche nel menù");
  assert.match(menu.html, /width="26" height="26"/);
  assert.match(menuQuadro.vista(), /mc-fissati[\s\S]*Destino Scritto · Entropia · soglia 5/, "e la fascia dei fatti fissati nel menù");
}

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
  assert.deepEqual(g.attivi.map((a) => a.nome), [entra.nome], "la mossa del menù circolare fra gli effetti attivi");
  assert.equal(g.attivi[0].durataLabel, "per la scena");
  assert.deepEqual(g.passivi.map((p) => p.nome), ["Quadrante"]);
  assert.deepEqual(g.magick.map((m) => m.nome), ["Muro di ghiaccio"], "solo la Magick accesa");
  assert.equal(g.magick[0].tipo, "Volgare");
  assert.deepEqual(g.utenti, [{ name: "Sara", active: true }]);
  assert.equal(l.collegato, false);
  assert.ok(l.vuoto);
  assert.match(html, /In gioco: 2/);
  assert.match(html, /wod5e-mage-quadro-mago aperto/);
  assert.match(html, new RegExp(`data-action="attivoTogli" data-actor="a1" data-id="${entra.id}-`));
  assert.match(html, /Quadrante/);
  assert.match(html, /Muro di ghiaccio <small>Volgare · soglia 5<\/small>/);
  assert.match(html, /niente addosso/);
  assert.doesNotMatch(html, /magoAggiungi/, "via il tasto Aggiungi e la sua finestra (25/9)");
  assert.match(html, /wod5e-mage-quadro-trascina[\s\S]*trascina qui un mago dagli Attori/, "in testa, l'invito a trascinare");
  const stato = statusMago(ianira, { localize });
  assert.deepEqual(stato.utenti, []);
  assert.ok(stato.vuoto);
}

// 7a. Il Premio del Difetto (il Sistema): il tasto nella riga di stato toglie 1 punto alla riserva,
// segna il mago per la sessione e manda la carta in chat; la seconda volta avvisa e non toglie.
{
  const prima = getPool().points;
  assert.ok(prima > 0, "la riserva ha punti");
  const { html } = await contesto("giocatori");
  assert.match(html, /data-action="premioDifetto" data-id="a1"/);
  await QuadroNarratore.DEFAULT_OPTIONS.actions.premioDifetto.call(app, { preventDefault() {} }, { dataset: { id: "a1" } });
  assert.equal(getPool().points, prima - 1, "1 punto in meno");
  assert.equal(getPool().log.at(-1).kind, "difetto");
  assert.ok(guendalina.getFlag(MODULE, "premioDifetto"), "il segno della sessione");
  assert.match(String(sim.messages.at(-1).content), /wod5e-mage-premio-difetto/);
  await QuadroNarratore.DEFAULT_OPTIONS.actions.premioDifetto.call(app, { preventDefault() {} }, { dataset: { id: "a1" } });
  assert.equal(getPool().points, prima - 1, "una volta per sessione");
  const stato = statusMago(guendalina, { localize, riserva: getPool().points });
  assert.ok(stato.premioDifetto.preso && stato.premioDifetto.spento);
  assert.ok(statusMago(luca, { localize, riserva: 0 }).premioDifetto.spento, "a riserva vuota il tasto è spento");
  await guendalina.setFlag(MODULE, "premioDifetto", undefined);
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

// 8. Il Cambio scena: la mossa del menù (per la scena) finisce, la scena diventa la 2, Rituale;
// dal 30/9 (Blue) ogni mago del Quadro prende +1 Quintessenza.
const primaDelCambio = attoriDelQuadro().map((a) => ({ id: a.id, q: getMagickBalance(a).quintessence }));
rispondi("cambia", elementoDialogo({ scena: "rituale", posto: "normale" }));
assert.equal(await cambioScena(), true);
assert.match(sim.dialoghi.at(-1).content, /Scena 2: dove andate\?/);
assert.match(sim.dialoghi.at(-1).content, /Ogni mago del Quadro prende \+1 Quintessenza/);
for (const { id, q } of primaDelCambio) assert.equal(getMagickBalance(game.actors.get(id)).quintessence, q + 1, `+1 Quintessenza a ${id} col Cambio scena del Quadro`);
assert.ok(sim.notifiche.includes(`Cambio scena: +1 Quintessenza a ${primaDelCambio.length} maghi del Quadro.`), "l'avviso della ricarica");
assert.match(sim.dialoghi.at(-1).content, new RegExp(`${reEsc(entra.nome)} · Guendalina`));
assert.deepEqual(Object.keys(guendalina.getFlag(MODULE, ADDOSSO_FLAG) ?? {}), [], "la mossa finisce con la scena");
assert.equal(getScena().tipo, "rituale");
assert.equal(getScena().numero, 2);
assert.equal(getPool().log.at(-1).kind, "scena");
// Il fatto fissato resta col Cambio scena: se ne va solo quando lo scardinano.
assert.equal(getFissati().length, 1);
{
  const fatto = getFissati()[0];
  await QuadroNarratore.DEFAULT_OPTIONS.actions.scardina.call(app, { preventDefault() {} }, { dataset: { id: fatto.id } });
  assert.deepEqual(getFissati(), []);
  assert.equal(sim.notifiche.at(-1), "Scardinato: Destino Scritto.");
  assert.deepEqual(game.settings.get(MODULE, FATTI_SETTING), {});
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
  // Il menù circolare com'è dopo una Sfera, un lato e una mossa: il disegno dentro il suo riquadro.
  const pagina = new MenuCircolare(fonteDelQuadro());
  pagina.imposta({ W: Number(process.env.QUADRO_W ?? 1180), H: Number(process.env.QUADRO_H ?? 640) });
  writeFileSync(`${dir}/menu-anello.html`, `<div class="wod5e-mage-mc">${foglioIcone()}<div class="mc-vivo">${pagina.vista()}</div></div>`);
  await pagina.esegui("sfera", "1");
  await pagina.esegui("lato", "n");
  await pagina.esegui("riga", "entropy-destino-scritto");
  writeFileSync(`${dir}/menu-mossa.html`, `<div class="wod5e-mage-mc">${foglioIcone()}<div class="mc-vivo">${pagina.vista()}</div></div>`);
  await pagina.esegui("riga", "_componi");
  writeFileSync(`${dir}/menu-lancio.html`, `<div class="wod5e-mage-mc">${foglioIcone()}<div class="mc-vivo">${pagina.vista()}</div></div>`);
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
