// La scheda del nemico nella finta Foundry, i tasti (1/10): la finestra vera
// (sheets/nemico-sheet.js) su un attore finto, e le sue azioni chiamate come
// le chiama Foundry. I due modi con la bandiera del modulo, la mano del
// Narratore, i punti dell'armatura, gli effetti e i poteri del manuale dal
// catalogo, i casi, la Magick, la disposizione sul token, i numeri dei campi.
// Uso: node --import ./tests/finta/register.mjs tests/finta/nemico-scheda.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Handlebars from "handlebars";

const MODULE = "wod5e-mage";
const ROOT = new URL("../../", import.meta.url);
const it = JSON.parse(readFileSync(new URL("lang/it.json", ROOT), "utf8"));
const leggi = (chiave) => chiave.split(".").reduce((nodo, parte) => (nodo && typeof nodo === "object" ? nodo[parte] : undefined), it);
const localize = (key) => { const v = leggi(key); return typeof v === "string" ? v : key; };
const format = (key, data = {}) => Object.entries(data).reduce((t, [a, b]) => t.replaceAll(`{${a}}`, String(b)), localize(key));

Handlebars.registerHelper("localize", (key, options) => format(key, options?.hash ?? {}));
Handlebars.registerHelper("eq", (a, b) => a === b);
Handlebars.registerHelper("concat", (...args) => args.slice(0, -1).join(""));
const compilati = new Map();
async function renderTemplate(path, context) {
  const file = path.replace(`modules/${MODULE}/`, "");
  if (!compilati.has(file)) compilati.set(file, Handlebars.compile(readFileSync(new URL(file, ROOT), "utf8")));
  return compilati.get(file)(context);
}

// --- la finta Foundry
const sim = { notifiche: [], dialoghi: [] };
let seme = 0;
globalThis.foundry = {
  applications: {
    api: { HandlebarsApplicationMixin: (Base) => class extends Base {}, ApplicationV2: class {}, DialogV2: { wait: async (config) => { sim.dialoghi.push(config); return "close"; }, input: async () => null } },
    handlebars: { renderTemplate },
    apps: {},
    ux: {}
  },
  utils: { randomID: () => `id${++seme}`, escapeHTML: (v) => String(v), getProperty: (o, p) => p.split(".").reduce((n, k) => n?.[k], o) },
  canvas: { layers: { InteractionLayer: class { static get layerOptions() { return {}; } } } }
};
globalThis.CONFIG = { Canvas: { layers: {} } };
globalThis.Hooks = { on() {}, once() {} };
globalThis.CSS = { escape: (v) => String(v) };
globalThis.ui = { notifications: { info: (m) => sim.notifiche.push(m), warn: (m) => sim.notifiche.push(`!${m}`), error: (m) => sim.notifiche.push(`!!${m}`) } };
globalThis.game = { i18n: { localize, format, lang: "it" }, settings: { get: () => ({}) }, user: { isGM: true }, actors: [] };

/** Scrive un aggiornamento coi punti nei nomi, come Foundry: `a.b.c` va in fondo, `a.-=b` toglie b. */
function applica(dati, changes) {
  for (const [path, value] of Object.entries(changes)) {
    const parti = path.split(".");
    let nodo = dati;
    for (const parte of parti.slice(0, -1)) nodo = (nodo[parte] ??= {});
    const ultima = parti.at(-1);
    if (ultima.startsWith("-=")) delete nodo[ultima.slice(2)];
    else if (value && typeof value === "object" && !Array.isArray(value) && nodo[ultima] && typeof nodo[ultima] === "object") Object.assign(nodo[ultima], structuredClone(value));
    else nodo[ultima] = value && typeof value === "object" ? structuredClone(value) : value;
  }
}

function oggetto(id, type, name, system = {}, flags = {}) {
  const item = { id, type, name, system, flags: { [MODULE]: flags }, aggiornamenti: [] };
  item.update = async (changes) => { item.aggiornamenti.push(changes); applica(item, changes); return item; };
  return item;
}

function attore({ nemico = {}, system = {}, items = [], isOwner = true, isToken = false, token = null, disposition = -1 } = {}) {
  const actor = {
    id: "n1", name: "Rade", img: "icons/svg/mystery-man.svg", type: "spc", isOwner, isToken, token,
    prototypeToken: { disposition },
    flags: { [MODULE]: { nemico: structuredClone(nemico) } },
    system: { spcType: "mortal", locked: false, headers: { concept: "" }, health: { max: 5 }, biography: "", standarddicepools: { physical: { value: 1 }, social: { value: 1 }, mental: { value: 1 } }, exceptionaldicepools: {}, ...structuredClone(system) },
    aggiornamenti: []
  };
  actor.getFlag = (scope, key) => actor.flags[scope]?.[key];
  actor.update = async (changes) => { actor.aggiornamenti.push(changes); applica(actor, changes); return actor; };
  actor.items = { contents: items, get: (id) => items.find((item) => item.id === id), [Symbol.iterator]: () => items[Symbol.iterator]() };
  return actor;
}

const { NemicoSheet, MISURA_NEMICO, corniceDelNemico } = await import("../../scripts/sheets/nemico-sheet.js");
const azioni = NemicoSheet.DEFAULT_OPTIONS.actions;
const evento = { preventDefault() {}, stopPropagation() {} };
const tasto = (dataset = {}) => ({ dataset });
const scheda = (actor, options = {}) => new NemicoSheet({ document: actor, ...options });
const bandiera = (actor) => actor.flags[MODULE].nemico;

assert.deepEqual(MISURA_NEMICO, { width: 960, height: 770 });
assert.deepEqual(Object.keys(NemicoSheet.PARTS), ["testa", "gioco", "oggetti", "note", "limited"], "la Magick non ha più una pagina sua");
for (const vecchia of ["magickAccendi", "nemicoArete", "nemicoTipoMagick", "armaturaColpo", "armaturaPunto"]) assert.ok(!Object.hasOwn(azioni, vecchia), `l'azione ${vecchia} non c'è più`);
for (const nuova of ["nemicoModo", "nemicoMano", "nemicoArmatura", "nemicoEffettoApri", "nemicoCassettoVia", "magickSpegni"]) assert.equal(typeof azioni[nuova], "function", nuova);

// --- i due modi: un nemico vuoto si apre in Scrivi; il tasto scrive la bandiera, e toglie il lucchetto del sistema
{
  const actor = attore({ system: { locked: true } });
  const sheet = scheda(actor);
  assert.deepEqual([sheet.contesto().modo, sheet.contesto().puoScrivere], ["scrivi", true]);
  sheet._stato.aperte.add("z1");
  sheet._stato.cassetto = "mano";
  await azioni.nemicoModo.call(sheet, evento, tasto({ modo: "gioca" }));
  assert.deepEqual(actor.aggiornamenti.at(-1), { "flags.wod5e-mage.nemico.modo": "gioca", "system.locked": false });
  assert.deepEqual([sheet.contesto().modo, sheet._stato.aperte.size, sheet._stato.cassetto, actor.system.locked], ["gioca", 0, "", false]);
  await azioni.nemicoModo.call(sheet, evento, tasto({ modo: "scrivi" }));
  assert.deepEqual(actor.aggiornamenti.at(-1), { "flags.wod5e-mage.nemico.modo": "scrivi" }, "senza lucchetto si scrive solo il modo");
  const prima = actor.aggiornamenti.length;
  sheet._stato.aperte.add("z1");
  await azioni.nemicoModo.call(sheet, evento, tasto({ modo: "boh" }));
  await azioni.nemicoModo.call(sheet, evento, tasto({ modo: "scrivi" }));
  assert.deepEqual([actor.aggiornamenti.length, sheet._stato.aperte.has("z1")], [prima, true], "un modo che non esiste, o quello di adesso, non scrive niente e lascia le righe come sono");
}

// --- chi non possiede la scheda la vede in Gioca e non cambia niente
{
  const actor = attore({ nemico: { modo: "scrivi" }, isOwner: false });
  const sheet = scheda(actor);
  assert.deepEqual([sheet.contesto().modo, sheet.contesto().puoScrivere], ["gioca", false]);
  await azioni.nemicoModo.call(sheet, evento, tasto({ modo: "gioca" }));
  await azioni.nemicoMano.call(sheet, evento, tasto({ delta: "1" }));
  await azioni.nemicoEffettoNuovo.call(sheet, evento, tasto());
  assert.equal(actor.aggiornamenti.length, 0);
  assert.equal(sim.notifiche.length, 3);
  sim.notifiche.length = 0;
}

// --- la mano del Narratore: meno e più, fra −10 e +10
{
  const actor = attore({ nemico: { soglie: { physical: 3 }, manoNarratore: 9 } });
  const sheet = scheda(actor);
  await azioni.nemicoMano.call(sheet, evento, tasto({ delta: "1" }));
  assert.equal(bandiera(actor).manoNarratore, 10);
  const prima = actor.aggiornamenti.length;
  await azioni.nemicoMano.call(sheet, evento, tasto({ delta: "1" }));
  assert.deepEqual([bandiera(actor).manoNarratore, actor.aggiornamenti.length], [10, prima], "al tetto non scrive");
  await azioni.nemicoMano.call(sheet, evento, tasto({ delta: "-1" }));
  assert.equal(bandiera(actor).manoNarratore, 9);
  assert.equal(sheet.contesto().carte[0].riserva.totale, 10, "1 dado di Fisico più 9 di mano");
}

// --- i punti dell'armatura: il conto va dove dice il punto; l'armatura che non ricorda il suo pieno lo prende da prima
{
  const tuta = oggetto("a1", "armor", "Tuta", { armorvalue: 3 });
  const actor = attore({ nemico: { soglie: { physical: 3 } }, system: { locked: true }, items: [tuta] });
  const sheet = scheda(actor);
  assert.deepEqual(sheet.contesto().armature[0].pips.map((p) => p.punti), [1, 2, 2], "tre pieni: il clic sul terzo ne toglie uno");
  await azioni.nemicoArmatura.call(sheet, evento, tasto({ itemId: "a1", punti: "1" }));
  assert.deepEqual([tuta.system.armorvalue, tuta.flags[MODULE].armaturaPiena], [1, 3], "anche col lucchetto del sistema: la scheda del nemico ha i suoi modi");
  assert.deepEqual(sheet.contesto().armature[0].conto, "1/3");
  await azioni.nemicoArmatura.call(sheet, evento, tasto({ itemId: "a1", punti: "3" }));
  assert.deepEqual([tuta.system.armorvalue, tuta.aggiornamenti.at(-1)], [3, { "system.armorvalue": 3 }], "il pieno è già scritto: non si riscrive");
  const prima = tuta.aggiornamenti.length;
  await azioni.nemicoArmatura.call(sheet, evento, tasto({ itemId: "a1", punti: "3" }));
  await azioni.nemicoArmatura.call(sheet, evento, tasto({ itemId: "non-c-e", punti: "1" }));
  assert.equal(tuta.aggiornamenti.length, prima);
}

// --- gli effetti: la pastiglia si apre; uno nuovo nasce aperto; togliendolo si richiude
{
  const actor = attore({ nemico: { modo: "scrivi" } });
  const sheet = scheda(actor);
  await azioni.nemicoEffettoNuovo.call(sheet, evento, tasto());
  const [id] = Object.keys(bandiera(actor).effetti);
  assert.deepEqual([bandiera(actor).effetti[id].nome, bandiera(actor).effetti[id].tipo, sheet._stato.aperte.has(`effetto:${id}`), sheet.contesto().effetti[0].aperta], ["Nuovo effetto", "passivo", true, true]);
  await azioni.nemicoEffettoApri.call(sheet, evento, tasto({ effetto: id }));
  assert.deepEqual([sheet._stato.aperte.has(`effetto:${id}`), sheet.renders.at(-1)], [false, { parts: ["gioco"] }]);
  await azioni.nemicoEffettoApri.call(sheet, evento, tasto({ effetto: id }));
  await azioni.nemicoEffettoTogli.call(sheet, evento, tasto({ effetto: id }));
  assert.deepEqual([Object.keys(bandiera(actor).effetti), sheet._stato.aperte.size], [[], 0]);
}

// --- i poteri del manuale: il catalogo intero con «Aggiungi»; il potere va sulla scheda con la sua chiave, una volta sola
{
  const actor = attore({ nemico: { natura: "vampire", modo: "scrivi", effetti: { e1: { nome: "Tempra", tipo: "passivo", catalogo: "tempra", sort: 1 } } } });
  const sheet = scheda(actor);
  sim.dialoghi.length = 0;
  await azioni.nemicoEffettoCatalogo.call(sheet, evento, tasto());
  const dialogo = sim.dialoghi.at(-1);
  assert.equal(dialogo.window.title, "I poteri del manuale per Rade");
  assert.ok(dialogo.classes.includes("wod5e-mage-catalogo-nemico"));
  const html = dialogo.content.replaceAll("&#x27;", "'");
  for (const marker of ['data-role="catalogoAggiungi" data-catalogo="doppio-cuore" >', 'data-role="catalogoAggiungi" data-catalogo="tempra" disabled>', "Già suo", "poteri, 1 suoi", 'data-role="catalogoSearch"']) assert.ok(html.includes(marker), `catalogo: manca ${marker}`);
  for (const frase of ["Lo conosci già", "poteri, ne conosci"]) assert.ok(!html.includes(frase), `il catalogo del PNG non parla al giocatore: «${frase}»`);
  // La finestra, finta: si prendono i suoi ascolti e si clicca «Aggiungi» su Doppio cuore (Duro a morire, che c'era
  // prima, è tolto dal 1/10: è il passivo di Doppio cuore).
  const ascolti = {};
  const bottone = { disabled: false, dataset: { catalogo: "doppio-cuore" }, innerHTML: "", closest: () => ({ classList: { add() {} } }) };
  const conto = { textContent: "" };
  const radice = {
    addEventListener: (tipo, fn) => { ascolti[tipo] = fn; },
    querySelector: (sel) => (sel === "[data-role=catalogoConto]" ? conto : sel === "[data-role=catalogoSearch]" ? { value: "", focus() {} } : null),
    querySelectorAll: (sel) => (sel.includes("catalogoAggiungi") ? [bottone] : [])
  };
  dialogo.render({}, { element: radice });
  const clic = { ...evento, target: { closest: (sel) => (sel === "[data-role=catalogoAggiungi]" ? bottone : null) } };
  await ascolti.click(clic);
  const presi = Object.values(bandiera(actor).effetti).map((row) => [row.nome, row.tipo, row.catalogo]);
  assert.deepEqual(presi, [["Tempra", "passivo", "tempra"], ["Doppio cuore", "attivo", "doppio-cuore"]]);
  assert.deepEqual([bottone.disabled, bottone.innerHTML.includes("Già suo"), conto.textContent], [true, true, "226 poteri, 2 suoi"]);
  // Nel blocco dei Poteri, col testo letto dal catalogo.
  assert.deepEqual(sheet.contesto().poteri.map((p) => [p.nome, p.potere.grado]), [["Tempra", 1], ["Doppio cuore", 4]]);
  // Un secondo clic sullo stesso potere non lo raddoppia.
  bottone.disabled = false;
  await ascolti.click(clic);
  assert.deepEqual([Object.keys(bandiera(actor).effetti).length, bottone.disabled], [2, false]);
}

// --- i casi: quello scritto si cancella; quello a dadi del sistema si spegne
{
  const actor = attore({ nemico: { modo: "scrivi", casi: { k1: { nome: "Da lontano", campo: "physical", soglia: 4 } } }, system: { exceptionaldicepools: { firearms: { value: 7, active: true } } } });
  const sheet = scheda(actor);
  assert.deepEqual(sheet.contesto().casi.map((k) => k.id), ["skill:firearms", "k1"]);
  await azioni.nemicoCasoTogli.call(sheet, evento, tasto({ caso: "skill:firearms" }));
  assert.deepEqual(actor.aggiornamenti.at(-1), { "system.exceptionaldicepools.firearms.active": false });
  await azioni.nemicoCasoTogli.call(sheet, evento, tasto({ caso: "k1" }));
  assert.deepEqual([sheet.contesto().casi.length, actor.system.exceptionaldicepools.firearms.value], [0, 7]);
}

// --- le azioni: una nuova nasce aperta; «Usa» accende e spegne; togliendola se ne va anche l'accensione
{
  const actor = attore({ nemico: { modo: "scrivi" } });
  const sheet = scheda(actor);
  await azioni.nemicoAzioneNuova.call(sheet, evento, tasto());
  const [id] = Object.keys(bandiera(actor).azioni);
  assert.deepEqual([bandiera(actor).azioni[id].nome, sheet._stato.aperte.has(id)], ["Nuova azione", true]);
  await azioni.nemicoAzioneUsa.call(sheet, evento, tasto({ azione: id }));
  assert.equal(bandiera(actor).attive[id], true);
  await azioni.nemicoAzioneTogli.call(sheet, evento, tasto({ azione: id }));
  assert.deepEqual([Object.keys(bandiera(actor).azioni), Object.keys(bandiera(actor).attive), sheet._stato.aperte.size], [[], [], 0]);
}

// --- la Magick nel blocco della Natura: le Sfere, il cassetto con le due strade, una Formula, un effetto a mano
{
  const actor = attore({ nemico: { natura: "risvegliato", modo: "scrivi", magick: { arete: 2 } } });
  const sheet = scheda(actor);
  assert.deepEqual([sheet.contesto().blocco.tipo, sheet.contesto().grimorio, sheet.contesto().mano], ["magick", null, null]);
  await azioni.nemicoDominio.call(sheet, evento, tasto({ sfera: "mind" }));
  await azioni.nemicoDominio.call(sheet, evento, tasto({ sfera: "forces" }));
  await azioni.nemicoDominio.call(sheet, evento, tasto({ sfera: "boh" }));
  assert.deepEqual(Object.keys(bandiera(actor).magick.domini).sort(), ["forces", "mind"]);
  await azioni.nemicoDominio.call(sheet, evento, tasto({ sfera: "forces" }));
  assert.deepEqual(Object.keys(bandiera(actor).magick.domini), ["mind"]);
  // «Effetto» apre il cassetto dal Grimorio; le due strade lo cambiano senza chiuderlo; un altro clic lo chiude.
  await azioni.nemicoCassetto.call(sheet, evento, tasto({ cassetto: "grimorio" }));
  assert.deepEqual([sheet._stato.cassetto, sheet.renders.at(-1), Boolean(sheet.contesto().grimorio)], ["grimorio", { parts: ["gioco"] }, true]);
  await azioni.nemicoCassettoVia.call(sheet, evento, tasto({ cassetto: "mano" }));
  assert.deepEqual([sheet._stato.cassetto, Boolean(sheet.contesto().mano), sheet.contesto().grimorio], ["mano", true, null]);
  const disegni = sheet.renders.length;
  await azioni.nemicoCassettoVia.call(sheet, evento, tasto({ cassetto: "mano" }));
  await azioni.nemicoCassettoVia.call(sheet, evento, tasto({ cassetto: "altro" }));
  assert.equal(sheet.renders.length, disegni, "la strada già scelta, o una che non c'è, non ridisegna");
  // Una Formula dal Grimorio: la soglia base e i suoi Ambiti, la resistenza da scrivere.
  await azioni.nemicoFormula.call(sheet, evento, tasto({ formula: "suggestionare", indice: "0" }));
  const [formula] = Object.values(bandiera(actor).magick.effetti);
  assert.deepEqual([formula.nome, formula.da, formula.formula, formula.resiste], ["Suggestionare", "grimorio", "suggestionare", { attribute: "", skill: "", testo: "" }]);
  // Un effetto a mano: i livelli nella memoria della scheda, la soglia sommata, e il cassetto si richiude.
  await azioni.nemicoAmbito.call(sheet, evento, tasto({ scope: "potency", level: "3" }));
  await azioni.nemicoAmbito.call(sheet, evento, tasto({ scope: "range", level: "2" }));
  await azioni.nemicoManoScelta.call(sheet, evento, tasto({ campo: "come", value: "volgare" }));
  sheet._stato.mano.nome = "Scarica";
  await azioni.nemicoManoAggiungi.call(sheet, evento, tasto());
  const mano = Object.values(bandiera(actor).magick.effetti).find((row) => row.da === "mano");
  assert.deepEqual([mano.nome, mano.soglia, mano.ambiti, mano.come, mano.lentePotenza, sheet._stato.cassetto], ["Scarica", 5, { range: 2, potency: 3 }, "volgare", "danni", ""]);
  assert.equal(sheet.contesto().magick.effetti.find((e) => e.nome === "Scarica").danni, 5, "Areté 2 più Potenza 3");
  // Un effetto si apre e si toglie.
  const idMano = Object.entries(bandiera(actor).magick.effetti).find(([, row]) => row.da === "mano")[0];
  await azioni.nemicoMagickApri.call(sheet, evento, tasto({ effetto: idMano }));
  assert.ok(sheet._stato.aperte.has(idMano));
  await azioni.nemicoMagickTogli.call(sheet, evento, tasto({ effetto: idMano }));
  assert.deepEqual([Object.keys(bandiera(actor).magick.effetti).length, sheet._stato.aperte.has(idMano)], [1, false]);
}

// --- la Magick accesa col vecchio tasto su un'altra Natura: «Togli la Magick» la spegne, gli effetti restano scritti
{
  const actor = attore({ nemico: { natura: "vampire", modo: "scrivi", magick: { on: true, arete: 2, effetti: { m1: { nome: "Vecchio", soglia: 3 } } } } });
  const sheet = scheda(actor);
  assert.deepEqual([sheet.contesto().blocco.tipo, sheet.contesto().blocco.eredita], ["magick", true]);
  await azioni.magickSpegni.call(sheet, evento, tasto());
  assert.deepEqual([sheet.contesto().blocco.tipo, sheet.contesto().blocco.punteggio.nome, Object.keys(bandiera(actor).magick.effetti)], ["poteri", "Potenza del Sangue", ["m1"]]);
}

// --- la disposizione: senza token va sul prototipo; la scheda di un token non collegato cambia il suo token e lascia il prototipo
{
  const actor = attore({ nemico: { modo: "scrivi" } });
  const sheet = scheda(actor);
  assert.equal(sheet.contesto().disposizione.id, "ostile");
  await sheet.cambiaDisposizione("1");
  assert.deepEqual([actor.prototypeToken.disposition, sheet.contesto().disposizione.id], [1, "amichevole"]);
  const prima = actor.aggiornamenti.length;
  await sheet.cambiaDisposizione("7");
  await sheet.cambiaDisposizione("1");
  assert.equal(actor.aggiornamenti.length, prima, "una disposizione che non esiste, o quella di adesso, non scrive");

  const token = { disposition: 0, aggiornamenti: [] };
  token.update = async (changes) => { token.aggiornamenti.push(changes); Object.assign(token, changes); return token; };
  const sintetico = attore({ nemico: { modo: "scrivi" }, isToken: true, token, disposition: -1 });
  const schedaToken = scheda(sintetico);
  assert.equal(schedaToken.contesto().disposizione.id, "neutrale", "la disposizione del token vince su quella del prototipo");
  await schedaToken.cambiaDisposizione("-2");
  assert.deepEqual([token.disposition, sintetico.prototypeToken.disposition, sintetico.aggiornamenti.length, schedaToken.renders.at(-1)], [-2, -1, 0, { parts: ["testa"] }]);
  assert.equal(schedaToken.contesto().disposizione.id, "segreto");
}

// --- i numeri dei campi: vuoto vale il minimo (o 0), e resta fra il minimo e il massimo; il resto passa com'è
{
  const actor = attore({ nemico: { modo: "scrivi", casi: { k1: { nome: "Da lontano", campo: "physical", soglia: 4 } } } });
  const sheet = scheda(actor);
  const campo = (name, value, extra = {}) => ({ target: { tagName: "INPUT", type: "number", name, value, min: "0", max: "20", ...extra } });
  await NemicoSheet.onSubmitNemicoForm.call(sheet, campo("flags.wod5e-mage.nemico.casi.k1.soglia", ""), null, null);
  assert.equal(bandiera(actor).casi.k1.soglia, 0);
  assert.equal(sheet.contesto().carte[0].casi[0].aSoglia, true, "la soglia svuotata resta una soglia: il caso non passa fra quelli a dadi");
  await NemicoSheet.onSubmitNemicoForm.call(sheet, campo("flags.wod5e-mage.nemico.magick.arete", "9", { min: "1", max: "5" }), null, null);
  await NemicoSheet.onSubmitNemicoForm.call(sheet, campo("system.health.max", "", { min: "1", max: "20" }), null, null);
  await NemicoSheet.onSubmitNemicoForm.call(sheet, campo("flags.wod5e-mage.nemico.soglie.physical", "3"), null, null);
  assert.deepEqual([bandiera(actor).magick.arete, actor.system.health.max, bandiera(actor).soglie.physical], [5, 1, 3]);
  await NemicoSheet.onSubmitNemicoForm.call(sheet, { target: { tagName: "INPUT", type: "text", name: "flags.wod5e-mage.nemico.fazione", value: "Il Recupero" } }, null, null);
  await NemicoSheet.onSubmitNemicoForm.call(sheet, { target: { tagName: "INPUT", type: "checkbox", name: "flags.wod5e-mage.nemico.azioni.z1.senzaTiro", checked: true } }, null, null);
  assert.deepEqual([bandiera(actor).fazione, bandiera(actor).azioni.z1.senzaTiro], ["Il Recupero", true]);
}

// --- il contesto della finestra: tre pagine; una scheda rimasta sulla pagina Magick torna a In gioco
{
  const actor = attore({ nemico: { natura: "risvegliato", soglie: { physical: 3 } } });
  const sheet = scheda(actor);
  sheet.tabGroups.primary = "magick";
  const context = await sheet._prepareContext({});
  assert.deepEqual([sheet.tabGroups.primary, context.tabAttiva, Object.keys(sheet.tabs), context.pagine.map((p) => p.id), context.modo, context.isGM], ["gioco", "gioco", ["gioco", "oggetti", "note"], ["gioco", "oggetti", "note"], "gioca", true]);
  assert.equal(sheet.title, "Scheda del nemico (M6): Rade");
}

// --- un nemico appena creato resta in Scrivi mentre lo si scrive (1.33.2). Senza un modo scelto col tasto la finestra
// tiene quello con cui si è aperta: nella 1.33.1 la prima soglia lo rendeva «scritto» e la scheda passava a Gioca da sola.
{
  const actor = attore();
  const sheet = scheda(actor);
  assert.equal(sheet.contesto().modo, "scrivi");
  await NemicoSheet.onSubmitNemicoForm.call(sheet, { target: { tagName: "INPUT", type: "number", name: "flags.wod5e-mage.nemico.soglie.physical", value: "4", min: "0", max: "20" } }, null, null);
  assert.deepEqual([bandiera(actor).soglie.physical, bandiera(actor).modo, sheet.contesto().modo, sheet.contesto().scrivi], [4, undefined, "scrivi", true], "dopo la prima soglia è ancora Scrivi, e nessuno ha scritto il modo");
  await azioni.nemicoEffettoNuovo.call(sheet, evento, tasto());
  assert.equal(sheet.contesto().modo, "scrivi");
  // «Scrivi» è già il modo di adesso: il tasto non scrive niente. «Gioca» sì.
  const prima = actor.aggiornamenti.length;
  await azioni.nemicoModo.call(sheet, evento, tasto({ modo: "scrivi" }));
  assert.equal(actor.aggiornamenti.length, prima);
  await azioni.nemicoModo.call(sheet, evento, tasto({ modo: "gioca" }));
  assert.deepEqual([bandiera(actor).modo, sheet.contesto().modo], ["gioca", "gioca"]);

  // Chiusa senza aver scelto un modo e riaperta: è un nemico scritto, e si apre in Gioca.
  const altro = attore();
  const finestra = scheda(altro);
  finestra.contesto();
  await altro.update({ "flags.wod5e-mage.nemico.soglie.physical": 3 });
  assert.equal(finestra.contesto().modo, "scrivi");
  finestra._onClose({});
  assert.equal(finestra.contesto().modo, "gioca");
  // Un nemico già scritto aperto in Gioca non passa a Scrivi da solo se lo si svuota.
  const scritto = attore({ nemico: { soglie: { physical: 3 } } });
  const aperta = scheda(scritto);
  assert.equal(aperta.contesto().modo, "gioca");
  await scritto.update({ "flags.wod5e-mage.nemico.soglie.physical": 0 });
  assert.equal(aperta.contesto().modo, "gioca");
  // Chi non possiede la scheda non ha memoria da tenere: sempre Gioca.
  const altrui = scheda(attore({ isOwner: false }));
  assert.deepEqual([altrui.contesto().modo, altrui._stato.modo], ["gioca", ""]);
}

// --- due nemici aperti insieme, su pagine diverse (1.33.2): ognuno rende accesa la sua. Il sistema scrive sulle
// linguette quale è accesa (getTabs): con gli stessi oggetti per tutte le schede, la seconda cambiava la pagina alla prima.
{
  const primo = scheda(attore({ nemico: { soglie: { physical: 3 } } }));
  const secondo = scheda(attore({ nemico: { soglie: { physical: 3 } } }));
  primo.tabGroups.primary = "note";
  secondo.tabGroups.primary = "oggetti";
  const [contestoPrimo, contestoSecondo] = await Promise.all([primo._prepareContext({}), secondo._prepareContext({})]);
  const accesa = async (sheet, context) => {
    const accese = [];
    for (const parte of ["gioco", "oggetti", "note"]) if ((await sheet._preparePartContext(parte, context, {})).tab.cssClass === "active") accese.push(parte);
    return accese;
  };
  assert.deepEqual([await accesa(primo, contestoPrimo), await accesa(secondo, contestoSecondo)], [["note"], ["oggetti"]]);
  assert.notEqual(primo.tabs.gioco, secondo.tabs.gioco, "le linguette sono oggetti di ogni finestra");
  assert.ok(Object.values(NemicoSheet.LINGUETTE).every((linguetta) => Object.isFrozen(linguetta)), "il modello delle linguette non si scrive");
  assert.deepEqual(Object.keys(NemicoSheet.linguette()), ["gioco", "oggetti", "note"]);
}

// --- la cornice (1.33.2): il sistema veste la finestra con la linea dell'attore (lo spcType che il PNG di M6 porta dalla
// nascita), la scheda del nemico la riporta a quella dei mortali, uguale per ogni Natura.
{
  const classi = (...iniziali) => {
    const insieme = new Set(iniziali);
    return { insieme, classList: { add: (...c) => c.forEach((x) => insieme.add(x)), remove: (...c) => c.forEach((x) => insieme.delete(x)), toggle: (c, on) => (on ? insieme.add(c) : insieme.delete(c)), contains: (c) => insieme.has(c) } };
  };
  for (const linea of ["vampire", "werewolf", "hunter", "mortal"]) {
    const finestra = classi("application", "sheet", "wod5e", "actor", "spc", "wod5e-mage", "wod5e-mage-nemico", linea);
    corniceDelNemico(finestra.classList);
    assert.deepEqual([...finestra.insieme].filter((c) => ["vampire", "werewolf", "hunter", "mortal"].includes(c)), ["mortal"], linea);
    assert.ok(finestra.insieme.has("wod5e-mage-nemico") && finestra.insieme.has("spc"), "le altre classi restano");
  }
  // La finta scheda del sistema fa come quella vera: un attore con spcType vampire mette `vampire` sulla finestra.
  const { SPCActorSheet, lineaDelSistema } = await import("./stubs/spc-actor-sheet.mjs");
  assert.deepEqual(["mortal", "vampire", "ghoul", "werewolf", "spirit", "hunter", ""].map((spcType) => lineaDelSistema({ system: { spcType } })), ["mortal", "vampire", "vampire", "werewolf", "werewolf", "hunter", "mortal"]);
  const finestra = classi("sheet", "mortal");
  const delSistema = new SPCActorSheet({ document: attore({ system: { spcType: "vampire" } }) });
  delSistema.element = { classList: finestra.classList };
  delSistema._onRender();
  assert.deepEqual([finestra.insieme.has("vampire"), finestra.insieme.has("mortal")], [true, false]);
  corniceDelNemico(finestra.classList);
  assert.deepEqual([finestra.insieme.has("vampire"), finestra.insieme.has("mortal")], [false, true]);
}

console.log(`finta Foundry, i tasti della scheda del nemico: ok, ${sim.dialoghi.length} finestre`);
