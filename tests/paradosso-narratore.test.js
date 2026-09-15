import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  addPoints,
  CONTROL_NAME,
  isInLobby,
  LOBBY_FLAG,
  LOG_MAX,
  lobbyActors,
  normalizePool,
  pendingGifts,
  POOL_SETTING,
  readSpendChoice,
  renderSpendCard,
  resetPool,
  schedaParadosso,
  spendPoints,
  spendPrice
} from "../scripts/paradosso-narratore.js";

// La riserva del Narratore (11/9): pila libera nella sessione, azzerata a nuova sessione.
assert.equal(POOL_SETTING, "paradossoNarratore");
assert.equal(LOBBY_FLAG, "sessione");
assert.equal(CONTROL_NAME, "wod5e-mage-paradosso");
assert.deepEqual(normalizePool(undefined), { points: 0, visible: false, log: [] });
assert.deepEqual(normalizePool({ points: "3", visible: 1, log: "no" }), { points: 3, visible: true, log: [] });
let pool = addPoints(normalizePool(), 3, { kind: "given", from: "Olivio" });
assert.equal(pool.points, 3);
assert.equal(pool.log.length, 1);
assert.equal(pool.log[0].kind, "given");
assert.equal(pool.log[0].amount, 3);
assert.equal(pool.log[0].from, "Olivio");
assert.deepEqual(addPoints(pool, 0), pool, "zero non entra");
const spent = spendPoints(pool, 2, { kind: "spend", text: "La pioggia cade al contrario" });
assert.equal(spent.points, 1);
assert.equal(spent.log.at(-1).amount, -2);
assert.equal(spendPoints(pool, 4), null, "non bastano");
for (let index = 0; index < LOG_MAX + 5; index += 1) pool = addPoints(pool, 1);
assert.equal(pool.log.length, LOG_MAX, "il registro non cresce all'infinito");
const reset = resetPool(pool);
assert.equal(reset.points, 0);
assert.equal(reset.log.length, 1);
assert.equal(reset.log[0].kind, "session");
assert.equal(reset.visible, pool.visible, "la visibilità resta com'era");

// La lobby: i Maghi che hanno premuto Nuova sessione; la Scheda del Paradosso è il massimo per Sfera.
const mage = (name, spheres, attiva = true) => ({
  name,
  getFlag: (scope, key) => {
    if (scope === "core" && key === "sheetClass") return "wod5e-mage.MageActorSheet";
    if (key === "spheres") return spheres;
    if (key === LOBBY_FLAG) return attiva ? { attiva: true, quando: 1 } : undefined;
    return undefined;
  }
});
const olivio = mage("Olivio", { forces: 5, mind: 2 });
const sara = mage("Sara", { forces: 3, life: 4, prime: 1 });
const fuori = mage("Fuori", { time: 5 }, false);
const mortal = { name: "Mortale", getFlag: () => undefined };
assert.equal(isInLobby(olivio), true);
assert.equal(isInLobby(fuori), false);
assert.deepEqual(lobbyActors([olivio, sara, fuori, mortal]).map((actor) => actor.name), ["Olivio", "Sara"]);
const scheda = schedaParadosso(lobbyActors([olivio, sara, fuori, mortal]));
assert.deepEqual(scheda.map((row) => [row.id, row.level, row.from]), [["forces", 5, "Olivio"], ["life", 4, "Sara"], ["mind", 2, "Olivio"], ["prime", 1, "Sara"]]);
assert.match(scheda[0].icon, /assets\/icons\/sheet\/forces\.png$/);
assert.equal(scheda[0].label, "WOD5E_MAGE.Spheres.forces");
assert.deepEqual(schedaParadosso([]), []);

// Il prezzo: la soglia dalla stessa tavola dei giocatori.
assert.equal(spendPrice({ sphereLevels: [{ id: "forces", level: 3 }], scopeLevels: [{ id: "potency", level: 3 }, { id: "duration", level: 4 }] }), 7);
const choice = readSpendChoice({ "sphere-forces": "9", "sphere-life": "2", "scope-potency": "3", text: " Il lampione esplode ", whisper: "on" }, scheda);
assert.deepEqual(choice.spheres, [{ id: "forces", level: 5 }, { id: "life", level: 2 }], "dentro il tetto della Scheda");
assert.deepEqual(choice.scopes, [{ id: "potency", level: 3 }]);
assert.equal(choice.price, 3);
assert.equal(choice.text, "Il lampione esplode");
assert.equal(choice.whisper, true);
assert.equal(readSpendChoice({ "sphere-time": "3" }, scheda).spheres.length, 0, "una Sfera fuori dalla Scheda non entra");
const card = renderSpendCard(choice, (key) => key);
assert.match(card, /wod5e-mage-paradosso-banner">WOD5E_MAGE\.Paradosso\.CardTitle</);
assert.match(card, /forces\.png" alt=""><b>5<\/b>/);
assert.match(card, /WOD5E_MAGE\.Paradosso\.Price<\/b><span class="wod5e-mage-roll-value">3</);
assert.match(card, /Il lampione esplode/);

// La macchina: impostazione di mondo, icona nella barra, raccolta dal messaggio, pannello, lingue, CSS.
const source = readFileSync(new URL("../scripts/paradosso-narratore.js", import.meta.url), "utf8");
assert.match(source, /game\.settings\.register\(MODULE_ID, POOL_SETTING, \{\s*scope: "world"/);
assert.match(source, /Hooks\.on\("getSceneControlButtons"/);
assert.match(source, /ui\.controls\.activate\(\{ control: name \}\)/);
// Cosa si raccoglie (11/9): l'Ustione data e la realtà sforzata, una volta l'una.
assert.deepEqual(pendingGifts({}), []);
assert.deepEqual(pendingGifts({ rollCard: { ustione: { choice: "narratore", given: 3, actorName: "Al" } }, sforzo: { given: 4, actorName: "Al" } }), [
  { kind: "given", points: 3, from: "Al" }, { kind: "sforzo", points: 4, from: "Al" }
]);
assert.deepEqual(pendingGifts({ rollCard: { ustione: { choice: "narratore", given: 3, collected: true } }, sforzo: { given: 4, collected: true } }), []);
assert.deepEqual(pendingGifts({ rollCard: { ustione: { choice: "brucia", given: 3 } }, sforzo: { given: 0 } }), []);
assert.match(source, /const gifts = pendingGifts\(flags\)/);
assert.match(source, /out\.classList\.add\(points > from \? "rising" : "falling"\)/);
assert.match(source, /InteractionLayer/);
assert.match(readFileSync(new URL("../scripts/salute.js", import.meta.url), "utf8"), /await joinLobby\(actor\);/);
const pannello = readFileSync(new URL("../templates/paradosso-pannello.hbs", import.meta.url), "utf8");
assert.match(pannello, /data-role="points"/);
for (const azione of ["visibile", "chiudi", "meno", "piu", "spendi", "nuovaSessione", "azzera", "scheda"]) assert.match(pannello, new RegExp(`data-azione="${azione}"`));
const spesa = readFileSync(new URL("../templates/dialogs/paradosso-spesa.hbs", import.meta.url), "utf8");
assert.match(spesa, /data-role="spendRow" data-kind="sphere"/);
assert.match(spesa, /data-role="price"/);
assert.match(spesa, /Paradosso\.InterventionsTodo/);
const css = readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8");
assert.match(css, /#wod5e-mage-paradosso-panel\s*\{/);
assert.match(css, /@keyframes wod5e-mage-paradosso-rise/);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8"));
  for (const key of ["Title", "Points", "ControlGM", "ControlPlayer", "Panel", "Hidden", "Visible", "HideHint", "ShowHint", "Minus", "Plus", "Spend", "SpendHint", "SpendTitle", "SpendOk", "SpendNothing", "SpendTooMuch", "Price", "Available", "What", "WhatHint", "Whisper", "Interventions", "InterventionsTodo", "CardTitle", "Speaker", "NewSession", "NewSessionHint", "NewSessionAsk", "NewSessionDone", "Reset", "ResetHint", "Scheda", "SchedaHint", "SchedaEmpty", "Lobby", "LobbyEmpty", "Collected", "LogGiven", "LogSpend", "LogManual", "LogReset", "LogSession"]) {
    assert.equal(typeof strings.WOD5E_MAGE.Paradosso[key], "string", `${lang} Paradosso.${key}`);
  }
}

console.log("Punti Paradosso del Narratore: test passati.");
