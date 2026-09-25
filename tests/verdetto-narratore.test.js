import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  applicaVerdetto,
  cablaVerdetto,
  chiediVerdetto,
  contestoVerdetto,
  dadiVerdetto,
  dalNarratore,
  destinatari,
  finestraAperta,
  leggiVerdetto,
  narratoriAttivi,
  notaVerdetto,
  onSocketVerdetto,
  perMe,
  riceviVerdetto,
  richiestaTiro,
  scriviDalNarratore,
  secondiRimasti,
  serveVerdetto,
  SOCKET_NAME,
  TIPO_RICHIESTA,
  TIPO_VERDETTO,
  TIRO_NARRATORE_SETTING,
  tiroInAttesa,
  VERDETTO_ATTESA_MS,
  VERDETTO_SECONDI,
  verdettoTiro
} from "../scripts/verdetto-narratore.js";

// Cinque secondi al Narratore (Blue, 27/9: erano dieci), il giocatore aspetta qualcosa in più; il canale è quello del modulo.
assert.equal(VERDETTO_SECONDI, 5);
assert.equal(VERDETTO_ATTESA_MS, 10000);
assert.equal(TIRO_NARRATORE_SETTING, "tiroDalNarratore");
assert.equal(SOCKET_NAME, "module.wod5e-mage");
assert.match(readFileSync(new URL("../module.json", import.meta.url), "utf8"), /"socket": true/);

// I Narratori collegati, tutti (Blue, 27/9), meno chi tira; il verdetto serve solo se chi tira lo vuole e non è un Narratore.
const utenti = [{ id: "gm1", name: "Anna", active: true, isGM: true }, { id: "gm2", name: "Blue", active: true, isGM: true }, { id: "gm3", active: false, isGM: true }, { id: "p1", active: true, isGM: false }];
assert.deepEqual(narratoriAttivi(utenti, { id: "p1" }).map((u) => u.id), ["gm1", "gm2"], "tutti i Narratori collegati, non quello spento");
assert.deepEqual(narratoriAttivi(utenti, { id: "gm1" }).map((u) => u.id), ["gm2"]);
assert.deepEqual([narratoriAttivi({ contents: utenti }, { id: "p1" }).length, narratoriAttivi(new Set(utenti), { id: "p1" }).length, narratoriAttivi(null).length], [2, 2, 0]);
assert.equal(serveVerdetto({ user: { id: "p1" }, narratori: narratoriAttivi(utenti, { id: "p1" }) }), true);
assert.equal(serveVerdetto({ user: { id: "gm1", isGM: true }, narratori: narratoriAttivi(utenti, { id: "gm1" }) }), false, "un Narratore che tira non aspetta nessuno");
assert.equal(serveVerdetto({ user: { id: "p1" }, narratori: [] }), false);
assert.equal(serveVerdetto({ user: { id: "p1" }, narratori: narratoriAttivi(utenti, { id: "p1" }), scelto: false }), false, "«Dal Narratore» spento: il tiro parte subito");
assert.equal(serveVerdetto({}), false);
assert.deepEqual([destinatari({ to: ["gm1", "gm2"] }), destinatari({ to: "gm" }), destinatari({}), perMe({ to: ["gm1", "gm2"] }, "gm2"), perMe({ to: "p1" }, "gm2"), perMe({ to: ["gm1"] }, "")], [["gm1", "gm2"], ["gm"], [], true, false, false]);

// «Dal Narratore»: l'impostazione del client, sì se manca.
globalThis.game = { settings: { get: () => undefined } };
assert.equal(dalNarratore(), true);
globalThis.game = { settings: { get: () => false } };
assert.equal(dalNarratore(), false);
{
  let scritto = null;
  globalThis.game = { settings: { get: () => scritto ?? true, set: async (_m, key, value) => { assert.equal(key, TIRO_NARRATORE_SETTING); scritto = value; } } };
  assert.equal(await scriviDalNarratore(false), false);
  assert.equal(await scriviDalNarratore(true), true);
}
delete globalThis.game;

// La richiesta porta i numeri del conto, puliti, e va a tutti i Narratori.
const richiesta = richiestaTiro({ id: "r1", from: "p1", to: ["gm1", "gm2"], actorId: "a1", actorName: "Ianira", title: "Destrezza + Velo", magick: true, kind: "volgare", pool: 9, difficulty: 5, successFrom: 6 });
assert.deepEqual(richiesta, { type: TIPO_RICHIESTA, id: "r1", from: "p1", to: ["gm1", "gm2"], actorId: "a1", actorName: "Ianira", title: "Destrezza + Velo", magick: true, kind: "volgare", pool: 9, difficulty: 5, successFrom: 6 });
assert.deepEqual([richiestaTiro({ pool: -3, difficulty: "x" }).pool, richiestaTiro({ pool: -3, difficulty: "x" }).difficulty, richiestaTiro({}).successFrom, richiestaTiro({ to: "gm" }).to], [0, 0, 6, ["gm"]]);

// Il verdetto: com'era, o ritoccato; torna a chi ha chiesto, e dice quale Narratore ha risposto.
let verdetto = verdettoTiro(richiesta, {});
assert.deepEqual(verdetto, { type: TIPO_VERDETTO, id: "r1", from: "gm1", fromName: "", to: "p1", difficulty: 5, dice: 0, touched: false });
assert.deepEqual([verdettoTiro(richiesta, {}, { from: "gm2", fromName: "Blue" }).from, verdettoTiro(richiesta, {}, { from: "gm2", fromName: "Blue" }).fromName], ["gm2", "Blue"]);
verdetto = verdettoTiro(richiesta, { difficulty: "7", dice: "-1" });
assert.deepEqual([verdetto.difficulty, verdetto.dice, verdetto.touched], [7, -1, true]);
assert.equal(verdettoTiro(richiesta, { difficulty: "", dice: "" }).touched, false);
assert.equal(verdettoTiro(richiesta, { difficulty: 5, dice: 2 }).touched, true);

// I dadi che si tirano: riserva più i dadi del Narratore meno la Difficoltà, mai sotto zero.
assert.equal(dadiVerdetto({ pool: 9, difficulty: 5 }), 4);
assert.equal(dadiVerdetto({ pool: 9, difficulty: 5, dice: 2 }), 6);
assert.equal(dadiVerdetto({ pool: 3, difficulty: 5, dice: 1 }), 0);

// Il conto col verdetto sopra: senza ritocchi resta lo stesso oggetto.
const conto = { pool: 9, difficulty: 5, dice: 4, impossible: false, successFrom: 6 };
assert.equal(applicaVerdetto(conto, null), conto);
assert.equal(applicaVerdetto(conto, verdettoTiro(richiesta, {})), conto);
const ritoccato = applicaVerdetto(conto, verdettoTiro(richiesta, { difficulty: 7, dice: -1 }));
assert.deepEqual([ritoccato.pool, ritoccato.difficulty, ritoccato.dice, ritoccato.impossible, ritoccato.successFrom], [8, 7, 1, false, 6]);
assert.deepEqual(ritoccato.narratore, { difficultyBefore: 5, difficulty: 7, dice: -1, name: "" });
assert.equal(applicaVerdetto(conto, verdettoTiro(richiesta, { dice: 1 }, { from: "gm2", fromName: "Blue" })).narratore.name, "Blue");
assert.equal(applicaVerdetto(conto, verdettoTiro(richiesta, { difficulty: 12 })).impossible, true);

// La nota in carta dice cosa ha toccato.
const format = (key, data) => `${key.split(".").at(-1)}(${Object.values(data).join(",")})`;
assert.equal(notaVerdetto(conto, format), "");
assert.equal(notaVerdetto(ritoccato, format), "Note(NoteDifficulty(5,7) · NoteDice(-1))");
assert.equal(notaVerdetto(applicaVerdetto(conto, verdettoTiro(richiesta, { dice: 2 })), format), "Note(NoteDice(+2))");
assert.equal(notaVerdetto(applicaVerdetto(conto, verdettoTiro(richiesta, { dice: 2 }, { from: "gm2", fromName: "Blue" })), format), "NoteChi(Blue,NoteDice(+2))", "col nome di chi ha risposto");
assert.equal(notaVerdetto(applicaVerdetto(conto, verdettoTiro(richiesta, {}, { from: "gm2", fromName: "Blue" })), format), "", "senza ritocchi niente nota, anche col nome");

// Il conto alla rovescia.
assert.equal(secondiRimasti(1000, 1000), 5);
assert.equal(secondiRimasti(1000, 4999), 2);
assert.equal(secondiRimasti(1000, 6000), 0);
assert.equal(secondiRimasti(1000, 99000), 0);

// Il contesto della finestra.
const ctx = contestoVerdetto(richiesta, (key) => key.split(".").at(-1), format);
assert.deepEqual(ctx, { altri: 1, altriTesto: "Altri(1)", actorName: "Ianira", title: "Destrezza + Velo", kindLabel: "KindMagick · volgare", pool: 9, difficulty: 5, dice: 4, successFrom: 6, seconds: 5 });
assert.deepEqual([contestoVerdetto(richiestaTiro({ magick: false }), (key) => key).kindLabel, contestoVerdetto(richiestaTiro({ to: "gm" })).altriTesto], ["WOD5E_MAGE.Tiro.KindSkill", ""]);

// La finestra: il meno e il più, i dadi ricalcolati, il conto che allo scadere preme OK.
function finestra(richiesta) {
  const inputs = { difficulty: { value: String(richiesta.difficulty) }, dice: { value: "0" } };
  const dadi = { textContent: "" };
  const secondi = { textContent: "" };
  const listeners = {};
  const root = {
    isConnected: true,
    querySelector: (selector) => ({ "[name=difficulty]": inputs.difficulty, "[name=dice]": inputs.dice, "[data-role=dadi]": dadi, "[data-role=secondi]": secondi })[selector] ?? null,
    addEventListener: (type, fn) => { listeners[type] = fn; }
  };
  const click = (campo, delta) => listeners.click({ target: { closest: () => ({ dataset: { campo, delta: String(delta) } }) }, preventDefault() {} });
  return { root, inputs, dadi, secondi, click };
}
{
  const f = finestra(richiesta);
  let now = 1000;
  let ticker = null;
  let submitted = 0;
  const ferma = cablaVerdetto(f.root, richiesta, () => { submitted += 1; }, { now: () => now, tick: (fn) => { ticker = fn; return 1; }, stop: () => { ticker = null; } });
  assert.equal(f.dadi.textContent, "4");
  f.click("difficulty", 1); f.click("difficulty", 1);
  assert.deepEqual([f.inputs.difficulty.value, f.dadi.textContent], ["7", "2"]);
  f.click("dice", -1);
  assert.deepEqual([f.inputs.dice.value, f.dadi.textContent], ["-1", "1"]);
  f.click("difficulty", -20);
  assert.equal(f.inputs.difficulty.value, "0", "la Difficoltà non va sotto zero");
  assert.deepEqual(leggiVerdetto(f.root), { difficulty: "0", dice: "-1" });
  now = 4000; ticker();
  assert.deepEqual([f.secondi.textContent, submitted], ["2", 0]);
  now = 6000; ticker();
  assert.deepEqual([f.secondi.textContent, submitted, ticker], ["0", 1, null], "allo scadere preme OK una volta e si ferma");
  ferma();
}
{
  // La finestra chiusa prima: il conto si ferma da solo.
  const f = finestra(richiesta);
  let ticker = null;
  let submitted = 0;
  cablaVerdetto(f.root, richiesta, () => { submitted += 1; }, { now: () => 1000, tick: (fn) => { ticker = fn; return 1; }, stop: () => { ticker = null; } });
  f.root.isConnected = false; f.root.ownerDocument = {};
  ticker();
  assert.deepEqual([submitted, ticker], [0, null]);
}

// Il giro sul socket: il giocatore chiede a tutti i Narratori, uno risponde, il giocatore riceve.
{
  const emitted = [];
  let scelta = true;
  globalThis.game = { user: { id: "p1" }, users: utenti, settings: { get: () => scelta }, socket: { emit: (name, payload) => emitted.push([name, payload]) }, i18n: { format: (key, data) => `${key} ${data.seconds}/${data.count}` } };
  const infos = [];
  globalThis.ui = { notifications: { info: (m) => infos.push(m) } };
  globalThis.foundry = { utils: { randomID: () => "r9" } };
  const actor = { id: "a1", name: "Ianira" };
  const promessa = chiediVerdetto({ actor, title: "Destrezza + Velo", magick: true, kind: "volgare", conto: { pool: 9, difficulty: 5, successFrom: 6 } });
  assert.equal(tiroInAttesa("a1"), true);
  assert.deepEqual(emitted, [[SOCKET_NAME, richiestaTiro({ id: "r9", from: "p1", to: ["gm1", "gm2"], actorId: "a1", actorName: "Ianira", title: "Destrezza + Velo", magick: true, kind: "volgare", pool: 9, difficulty: 5, successFrom: 6 })]], "la richiesta va a tutti e due i Narratori");
  assert.deepEqual(infos, ["WOD5E_MAGE.Verdetto.SentMany 5/2"]);
  // Un verdetto per un altro id non chiude niente; quello giusto sì, da qualunque Narratore.
  assert.equal(riceviVerdetto({ id: "altro" }), false);
  const risposta = verdettoTiro(emitted[0][1], { difficulty: 6, dice: 0 }, { from: "gm2", fromName: "Blue" });
  await onSocketVerdetto({ ...risposta, to: "qualcun altro" });
  assert.equal(tiroInAttesa("a1"), true, "un verdetto per un altro giocatore non chiude l'attesa");
  await onSocketVerdetto(risposta);
  assert.equal(tiroInAttesa("a1"), false);
  assert.deepEqual(await promessa, risposta);
  // Un Narratore che tira, nessun Narratore collegato, o «Dal Narratore» spento: niente giro.
  globalThis.game.user = { id: "gm1", isGM: true };
  assert.equal(await chiediVerdetto({ actor, conto: {} }), null);
  globalThis.game.user = { id: "p1" }; globalThis.game.users = [{ id: "p1", active: true, isGM: false }, { id: "gm3", active: false, isGM: true }];
  assert.equal(await chiediVerdetto({ actor, conto: {} }), null);
  globalThis.game.users = utenti; scelta = false;
  assert.equal(await chiediVerdetto({ actor, conto: {} }), null, "«Dal Narratore» spento: parte subito");
  scelta = true;
  assert.equal(emitted.length, 1);
  // Con un solo Narratore collegato l'avviso è al singolare.
  globalThis.game.users = [utenti[1], utenti[3]];
  const singolo = chiediVerdetto({ actor, conto: { pool: 4, difficulty: 1 } });
  assert.deepEqual([emitted[1][1].to, infos.at(-1)], [["gm2"], "WOD5E_MAGE.Verdetto.Sent 5/1"]);
  await onSocketVerdetto(verdettoTiro(emitted[1][1], {}, { from: "gm2", fromName: "Blue" }));
  await singolo;
  // Senza risposta il giocatore tira da solo allo scadere (timer accorciato dal collaudo).
  globalThis.game.users = utenti;
  const realSetTimeout = globalThis.setTimeout;
  globalThis.setTimeout = (fn) => realSetTimeout(fn, 5);
  const muta = chiediVerdetto({ actor, conto: { pool: 4, difficulty: 1 } });
  globalThis.setTimeout = realSetTimeout;
  assert.equal(await muta, null);
  assert.equal(tiroInAttesa("a1"), false);
}

// Due Narratori (Blue, 27/9): la finestra si apre a tutti; il primo che risponde la chiude agli altri, senza un secondo verdetto.
{
  const emitted = [];
  const infos = [];
  let renderCb = null;
  let waitOptions = null;
  let risolvi = null;
  const elemento = (valori) => ({ isConnected: true, querySelector: (sel) => ({ "[name=difficulty]": { value: valori.difficulty }, "[name=dice]": { value: valori.dice } })[sel] ?? null, addEventListener() {} });
  globalThis.game = { user: { id: "gm1", name: "Anna", isGM: true }, users: utenti, socket: { emit: (name, payload) => emitted.push([name, payload]) }, i18n: { localize: (key) => key, format: (key, data) => `${key} ${Object.values(data).join(",")}` } };
  globalThis.ui = { notifications: { info: (m) => infos.push(m) } };
  globalThis.foundry = { utils: { randomID: () => "r9" }, applications: { handlebars: { renderTemplate: async () => "<div></div>" }, api: { DialogV2: { wait: (options) => new Promise((resolve) => { risolvi = resolve; waitOptions = options; renderCb = options.render; }) } } } };
  // Una richiesta non per me non apre niente.
  await onSocketVerdetto(richiestaTiro({ id: "r0", from: "p1", to: ["gm2"] }));
  assert.equal(finestraAperta("r0"), false);
  // La mia finestra su r2; poi passa di qui il verdetto di gm2 al giocatore: si chiude, da me non parte niente.
  const richiesta2 = richiestaTiro({ id: "r2", from: "p1", to: ["gm1", "gm2"], actorName: "Ianira", pool: 6, difficulty: 2 });
  const aperta = onSocketVerdetto(richiesta2);
  await new Promise((r) => setImmediate(r));
  let chiusa = 0;
  const dialog2 = { element: elemento({ difficulty: "2", dice: "0" }), close: () => { chiusa += 1; risolvi(null); } };
  renderCb({}, dialog2);
  assert.equal(finestraAperta("r2"), true);
  await onSocketVerdetto(verdettoTiro(richiesta2, { difficulty: 3 }, { from: "gm2", fromName: "Blue" }));
  await aperta;
  assert.deepEqual([chiusa, finestraAperta("r2"), emitted.length], [1, false, 0]);
  assert.deepEqual(infos, ["WOD5E_MAGE.Verdetto.Altrui Ianira,Blue"]);
  // Il mio stesso verdetto, se mai tornasse, non chiude niente; un id sconosciuto nemmeno.
  assert.equal(await onSocketVerdetto({ type: TIPO_VERDETTO, id: "r2", from: "gm1", to: "p1" }), undefined);
  // Da solo su r3: OK manda il verdetto col mio nome, letto dalla finestra.
  const richiesta3 = richiestaTiro({ id: "r3", from: "p1", to: ["gm1"], actorName: "Ianira", pool: 6, difficulty: 2 });
  const aperta3 = onSocketVerdetto(richiesta3);
  await new Promise((r) => setImmediate(r));
  const dialog3 = { element: elemento({ difficulty: "3", dice: "1" }), close: () => risolvi(null) };
  renderCb({}, dialog3);
  risolvi(waitOptions.buttons[0].callback({}, {}, dialog3));
  const mandato = await aperta3;
  assert.deepEqual(mandato, { type: TIPO_VERDETTO, id: "r3", from: "gm1", fromName: "Anna", to: "p1", difficulty: 3, dice: 1, touched: true });
  assert.deepEqual(emitted, [[SOCKET_NAME, mandato]]);
  assert.equal(finestraAperta("r3"), false);
}

// La finestra del Narratore esiste, col conto alla rovescia e i due numeri.
const hbs = readFileSync(new URL("../templates/dialogs/verdetto-narratore.hbs", import.meta.url), "utf8");
assert.match(hbs, /name="difficulty"[\s\S]*name="dice"[\s\S]*data-role="dadi"[\s\S]*data-role="secondi"/);
assert.match(hbs, /data-campo="difficulty" data-delta="-1"[\s\S]*data-campo="dice" data-delta="1"/);
assert.match(hbs, /\{\{#if altriTesto\}\}/, "la finestra dice quanti altri Narratori la vedono");
// Il lancio chiede il verdetto dopo il conto e prima di tirare, e mette la nota in carta.
const scheda = readFileSync(new URL("../scripts/tiro-scheda.js", import.meta.url), "utf8");
assert.match(scheda, /const verdetto = await chiediVerdetto\(\{ actor, title: rollLabel, magick, kind: tiro\.kind \?\? "", conto \}\);\n\s+conto = applicaVerdetto\(conto, verdetto\);/);
assert.match(scheda, /if \(tiroInAttesa\(actor\.id\)\)/);
assert.match(scheda, /notaVerdetto\(conto, format\)/);
const mainSource = readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8");
assert.match(mainSource, /registraSocketVerdetto\(\);/);
assert.match(mainSource, /game\.settings\.register\(MODULE_ID, TIRO_NARRATORE_SETTING, \{ scope: "client", config: false, type: Boolean, default: true \}\);/, "«Dal Narratore» è un'impostazione del client, sì di partenza");
// «Dal Narratore» nel riquadro del Tiro: il tasto sotto TIRA, non per il Narratore; l'azione lo gira e ridisegna.
assert.match(scheda, /narratore: game\.user\?\.isGM \? null : \{/);
assert.match(scheda, /export async function onTiroNarratore\(event\) \{\n\s+event\.preventDefault\(\);\n\s+await scriviDalNarratore\(!dalNarratore\(\)\);/);
assert.match(readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8"), /tiroNarratore: onTiroNarratore,/);
// Senza Difficoltà il tiro non parte: il conto lo dice e il riquadro spegne i tasti.
const tiroHbs = readFileSync(new URL("../templates/actor/parts/stat-tiro.hbs", import.meta.url), "utf8");
assert.match(tiroHbs, /wod5e-mage-tiro-difficolta\{\{#if tiro\.manual\}\} a-mano\{\{\/if\}\}\{\{#if tiro\.needsDifficulty\}\} manca\{\{\/if\}\}/);
assert.match(tiroHbs, /\{\{#if tiro\.needsDifficulty\}\}\?\{\{else\}\}\{\{tiro\.difficulty\}\}\{\{\/if\}\}/);
assert.match(tiroHbs, /WOD5E_MAGE\.Tiro\.DifficultyMissing/);
assert.match(tiroHbs, /\{\{#if tiro\.narratore\}\}[\s\S]*class="wod5e-mage-tiro-narratore\{\{#if tiro\.narratore\.on\}\} acceso\{\{\/if\}\}" data-action="tiroNarratore"[\s\S]*WOD5E_MAGE\.Verdetto\.DalNarratore/);
assert.match(scheda, /ready: Boolean\(attribute \|\| skill\) && conto\.difficultySet,\n\s+needsDifficulty: Boolean\(attribute \|\| skill\) && !conto\.difficultySet/);
assert.match(scheda, /if \(!conto\.difficultySet\) \{\n\s+ui\.notifications\.warn\(localize\("WOD5E_MAGE\.Tiro\.DifficultyWarning"\)\);/);

console.log("Verdetto del Narratore tests passed.");
