import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  applicaVerdetto,
  cablaVerdetto,
  chiediVerdetto,
  contestoVerdetto,
  dadiVerdetto,
  leggiVerdetto,
  notaVerdetto,
  onSocketVerdetto,
  riceviVerdetto,
  richiestaTiro,
  secondiRimasti,
  serveVerdetto,
  SOCKET_NAME,
  TIPO_RICHIESTA,
  TIPO_VERDETTO,
  tiroInAttesa,
  VERDETTO_ATTESA_MS,
  VERDETTO_SECONDI,
  verdettoTiro
} from "../scripts/verdetto-narratore.js";

// Dieci secondi al Narratore, il giocatore aspetta qualcosa in più; il canale è quello del modulo.
assert.equal(VERDETTO_SECONDI, 10);
assert.equal(VERDETTO_ATTESA_MS, 15000);
assert.equal(SOCKET_NAME, "module.wod5e-mage");
assert.match(readFileSync(new URL("../module.json", import.meta.url), "utf8"), /"socket": true/);

// Serve solo con un Narratore attivo che non è chi tira.
assert.equal(serveVerdetto({ user: { id: "p1" }, activeGM: { id: "gm" } }), true);
assert.equal(serveVerdetto({ user: { id: "gm" }, activeGM: { id: "gm" } }), false);
assert.equal(serveVerdetto({ user: { id: "p1" }, activeGM: null }), false);
assert.equal(serveVerdetto({}), false);

// La richiesta porta i numeri del conto, puliti.
const richiesta = richiestaTiro({ id: "r1", from: "p1", to: "gm", actorId: "a1", actorName: "Ianira", title: "Destrezza + Velo", magick: true, kind: "volgare", pool: 9, difficulty: 5, successFrom: 6 });
assert.deepEqual(richiesta, { type: TIPO_RICHIESTA, id: "r1", from: "p1", to: "gm", actorId: "a1", actorName: "Ianira", title: "Destrezza + Velo", magick: true, kind: "volgare", pool: 9, difficulty: 5, successFrom: 6 });
assert.deepEqual([richiestaTiro({ pool: -3, difficulty: "x" }).pool, richiestaTiro({ pool: -3, difficulty: "x" }).difficulty, richiestaTiro({}).successFrom], [0, 0, 6]);

// Il verdetto: com'era, o ritoccato; torna a chi ha chiesto.
let verdetto = verdettoTiro(richiesta, {});
assert.deepEqual(verdetto, { type: TIPO_VERDETTO, id: "r1", from: "gm", to: "p1", difficulty: 5, dice: 0, touched: false });
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
assert.deepEqual(ritoccato.narratore, { difficultyBefore: 5, difficulty: 7, dice: -1 });
assert.equal(applicaVerdetto(conto, verdettoTiro(richiesta, { difficulty: 12 })).impossible, true);

// La nota in carta dice cosa ha toccato.
const format = (key, data) => `${key.split(".").at(-1)}(${Object.values(data).join(",")})`;
assert.equal(notaVerdetto(conto, format), "");
assert.equal(notaVerdetto(ritoccato, format), "Note(NoteDifficulty(5,7) · NoteDice(-1))");
assert.equal(notaVerdetto(applicaVerdetto(conto, verdettoTiro(richiesta, { dice: 2 })), format), "Note(NoteDice(+2))");

// Il conto alla rovescia.
assert.equal(secondiRimasti(1000, 1000), 10);
assert.equal(secondiRimasti(1000, 4999), 7);
assert.equal(secondiRimasti(1000, 11000), 0);
assert.equal(secondiRimasti(1000, 99000), 0);

// Il contesto della finestra.
const ctx = contestoVerdetto(richiesta, (key) => key.split(".").at(-1));
assert.deepEqual(ctx, { actorName: "Ianira", title: "Destrezza + Velo", kindLabel: "KindMagick · volgare", pool: 9, difficulty: 5, dice: 4, successFrom: 6, seconds: 10 });
assert.equal(contestoVerdetto(richiestaTiro({ magick: false }), (key) => key).kindLabel, "WOD5E_MAGE.Tiro.KindSkill");

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
  assert.deepEqual([f.secondi.textContent, submitted], ["7", 0]);
  now = 11000; ticker();
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

// Il giro sul socket: il giocatore chiede, il Narratore risponde, il giocatore riceve.
{
  const emitted = [];
  globalThis.game = { user: { id: "p1" }, users: { activeGM: { id: "gm" } }, socket: { emit: (name, payload) => emitted.push([name, payload]) }, i18n: { format: (key, data) => `${key} ${data.seconds}` } };
  const infos = [];
  globalThis.ui = { notifications: { info: (m) => infos.push(m) } };
  globalThis.foundry = { utils: { randomID: () => "r9" } };
  const actor = { id: "a1", name: "Ianira" };
  const promessa = chiediVerdetto({ actor, title: "Destrezza + Velo", magick: true, kind: "volgare", conto: { pool: 9, difficulty: 5, successFrom: 6 } });
  assert.equal(tiroInAttesa("a1"), true);
  assert.deepEqual(emitted, [[SOCKET_NAME, richiestaTiro({ id: "r9", from: "p1", to: "gm", actorId: "a1", actorName: "Ianira", title: "Destrezza + Velo", magick: true, kind: "volgare", pool: 9, difficulty: 5, successFrom: 6 })]]);
  assert.deepEqual(infos, ["WOD5E_MAGE.Verdetto.Sent 10"]);
  // Un verdetto per un altro id non chiude niente; quello giusto sì.
  assert.equal(riceviVerdetto({ id: "altro" }), false);
  const risposta = verdettoTiro(emitted[0][1], { difficulty: 6, dice: 0 });
  await onSocketVerdetto({ ...risposta, to: "qualcun altro" });
  assert.equal(tiroInAttesa("a1"), true, "un verdetto per un altro giocatore non chiude l'attesa");
  await onSocketVerdetto(risposta);
  assert.equal(tiroInAttesa("a1"), false);
  assert.deepEqual(await promessa, risposta);
  // Il Narratore che tira, o nessun Narratore: niente giro.
  globalThis.game.user = { id: "gm" };
  assert.equal(await chiediVerdetto({ actor, conto: {} }), null);
  globalThis.game.user = { id: "p1" }; globalThis.game.users = { activeGM: null };
  assert.equal(await chiediVerdetto({ actor, conto: {} }), null);
  assert.equal(emitted.length, 1);
  // Senza risposta il giocatore tira da solo allo scadere (timer accorciato dal collaudo).
  globalThis.game.users = { activeGM: { id: "gm" } };
  const realSetTimeout = globalThis.setTimeout;
  globalThis.setTimeout = (fn) => realSetTimeout(fn, 5);
  const muta = chiediVerdetto({ actor, conto: { pool: 4, difficulty: 1 } });
  globalThis.setTimeout = realSetTimeout;
  assert.equal(await muta, null);
  assert.equal(tiroInAttesa("a1"), false);
}

// La finestra del Narratore esiste, col conto alla rovescia e i due numeri.
const hbs = readFileSync(new URL("../templates/dialogs/verdetto-narratore.hbs", import.meta.url), "utf8");
assert.match(hbs, /name="difficulty"[\s\S]*name="dice"[\s\S]*data-role="dadi"[\s\S]*data-role="secondi"/);
assert.match(hbs, /data-campo="difficulty" data-delta="-1"[\s\S]*data-campo="dice" data-delta="1"/);
// Il lancio chiede il verdetto dopo il conto e prima di tirare, e mette la nota in carta.
const scheda = readFileSync(new URL("../scripts/tiro-scheda.js", import.meta.url), "utf8");
assert.match(scheda, /const verdetto = await chiediVerdetto\(\{ actor, title: rollLabel, magick, kind: tiro\.kind \?\? "", conto \}\);\n\s+conto = applicaVerdetto\(conto, verdetto\);/);
assert.match(scheda, /if \(tiroInAttesa\(actor\.id\)\)/);
assert.match(scheda, /notaVerdetto\(conto, format\)/);
assert.match(readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8"), /registraSocketVerdetto\(\);/);
// Senza Difficoltà il tiro non parte: il conto lo dice e il riquadro spegne i tasti.
const tiroHbs = readFileSync(new URL("../templates/actor/parts/stat-tiro.hbs", import.meta.url), "utf8");
assert.match(tiroHbs, /wod5e-mage-tiro-difficolta\{\{#if tiro\.manual\}\} a-mano\{\{\/if\}\}\{\{#if tiro\.needsDifficulty\}\} manca\{\{\/if\}\}/);
assert.match(tiroHbs, /\{\{#if tiro\.needsDifficulty\}\}\?\{\{else\}\}\{\{tiro\.difficulty\}\}\{\{\/if\}\}/);
assert.match(tiroHbs, /WOD5E_MAGE\.Tiro\.DifficultyMissing/);
assert.match(scheda, /ready: Boolean\(attribute \|\| skill\) && conto\.difficultySet,\n\s+needsDifficulty: Boolean\(attribute \|\| skill\) && !conto\.difficultySet/);
assert.match(scheda, /if \(!conto\.difficultySet\) \{\n\s+ui\.notifications\.warn\(localize\("WOD5E_MAGE\.Tiro\.DifficultyWarning"\)\);/);

console.log("Verdetto del Narratore tests passed.");
