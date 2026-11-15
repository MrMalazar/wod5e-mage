import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { cartaCoiRossi, renderRossiButton, rossiPresi, rossiState, ROSSI_PRESI, successiDellaCarta } from "../scripts/rossi.js";
import { notaParadossale } from "../scripts/roll-card.js";
import { recountCard } from "../scripts/volonta.js";

// I rossi presi (il Sistema, voce Rossi): il giocatore può prendere i successi dei rossi e
// aggiungerli al tiro, che diventa paradossale; con un 10 sui rossi la scelta non c'è.
const dado = (result, extra = {}) => ({ result, active: true, ...extra });
const carta = { ramo: "C", sistema: true, rossiAParte: true, difficulty: 3, total: 2, margin: 0 };
const riserva = [dado(8), dado(7), dado(3), dado(2)];

assert.deepEqual(ROSSI_PRESI, ["scelta", "obbligo"]);
// Due successi a soglia 3, e sui rossi un 9: prendendolo il tiro riesce.
assert.deepEqual(rossiState(carta, riserva, [dado(9), dado(4)]), { show: true, presi: "", guadagno: 1, successi: 3 });
// Senza successi sui rossi non c'è niente da prendere: l'1 è l'occhio, non un successo.
assert.deepEqual(rossiState(carta, riserva, [dado(1), dado(5)]), { show: false, presi: "", guadagno: 0, successi: 2 });
assert.deepEqual(rossiState(carta, riserva, []), { show: false, presi: "", guadagno: 0, successi: 0 }, "senza rossi niente tasto");
// Le stelline dei rossi contano come le altre: il 10 rosso fa coppia col 10 della riserva.
assert.equal(rossiState(carta, [dado(10), dado(3)], [dado(10)]).guadagno, 3, "da 1 successo a 4: la coppia vale quattro");
// Un rosso scartato non conta.
assert.equal(rossiState(carta, riserva, [dado(9, { active: false, discarded: true })]).show, false);
// Presi una volta, il tasto non torna; e nemmeno dopo la Vittoria a un prezzo.
assert.deepEqual(rossiState({ ...carta, paradossale: true, rossiPresi: "scelta" }, riserva, [dado(9)]), { show: false, presi: "scelta", guadagno: 1, successi: 3 });
assert.equal(rossiState({ ...carta, priced: true }, riserva, [dado(9)]).show, false);
// Il tasto c'è anche a tiro riuscito: i successi in più sono margine.
assert.equal(rossiState({ ...carta, total: 4 }, [dado(8), dado(7), dado(6), dado(9)], [dado(6)]).show, true);
// Valgono solo i lanci del Sistema: niente carte di prima, tiri di Abilità, Scoppi, riuscite senza tirare, Saggezza.
for (const fuori of [{ sistema: false }, { skill: true }, { burst: true }, { burstResult: true }, { bought: true }, { automatic: true }, { saggezza: true }]) {
  assert.equal(rossiState({ ...carta, ...fuori }, riserva, [dado(9)]).show, false, JSON.stringify(fuori));
}

assert.equal(rossiPresi(carta), "");
assert.equal(rossiPresi({ paradossale: true }), "scelta");
assert.equal(rossiPresi({ paradossale: true, rossiPresi: "obbligo" }), "obbligo");

// La carta dopo la presa: totale coi rossi, margine nuovo, il segno del tiro paradossale.
const presa = cartaCoiRossi(carta, riserva, [dado(9), dado(6)]);
assert.deepEqual([presa.total, presa.margin, presa.paradossale, presa.rossiPresi], [4, 1, true, "scelta"]);
assert.equal(cartaCoiRossi(carta, riserva, [dado(10)], "obbligo").rossiPresi, "obbligo");
// Fallito anche coi rossi: resta fallito, ma è paradossale lo stesso.
const fallita = cartaCoiRossi({ ...carta, difficulty: 6 }, riserva, [dado(9)]);
assert.deepEqual([fallita.total, fallita.margin, fallita.paradossale], [3, 0, true]);

// Il conto della carta: i rossi dentro solo se presi. Lo usa il ritiro con la Volontà.
assert.equal(successiDellaCarta(carta, riserva, [dado(9)]), 2);
assert.equal(successiDellaCarta(presa, riserva, [dado(9)]), 3);
assert.equal(recountCard(presa, [...riserva, dado(6)], [dado(9), dado(6)]), 5, "dopo il ritiro i rossi presi restano nel conto");
assert.equal(recountCard(carta, [...riserva, dado(6)], [dado(9), dado(6)]), 3, "non presi, restano a parte");

// La nota sulla carta: col Sistema la dice il segno; sulle carte di prima i dadi.
assert.equal(notaParadossale(carta, [dado(9)]), "", "un rosso a successo non basta: va preso");
assert.equal(notaParadossale(presa, []), "WOD5E_MAGE.RamoC.Paradossale");
assert.equal(notaParadossale({ ...presa, rossiPresi: "obbligo" }, []), "WOD5E_MAGE.RamoC.ParadossaleObbligo");
assert.equal(notaParadossale({ ramo: "C", rossiAParte: true, total: 1, successFrom: 6 }, [dado(7)]), "WOD5E_MAGE.RamoC.SuccessoParadossale", "le carte di prima si rileggono come allora");

// Il tasto: il nome e il guadagno, col prezzo nel sorvolo.
const it = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8"));
const localize = (key) => key.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), it) ?? key;
const format = (key, data = {}) => String(localize(key)).replace(/\{(\w+)\}/g, (_, k) => String(data[k]));
const tasto = renderRossiButton({ show: true, guadagno: 2 }, localize, format);
assert.match(tasto, /data-rossi="prendi" title="Successi dei rossi: \+2\. Se li prendi il tiro diventa paradossale[^"]*">Prendi i rossi <b>\+2<\/b><\/button>/);

// La macchina: il 10 sui rossi si prende al lancio; il tasto è registrato fra la Volontà e gli altri; le facce 3D.
const dice = readFileSync(new URL("../scripts/paradox-dice.js", import.meta.url), "utf8");
assert.match(dice, /if \(!skill && !onlyParadox && !bought && leggiRossi\(redResults\)\.obbligo\) \{\s*Object\.assign\(cardData, cartaCoiRossi\(cardData, basicResults, redResults, "obbligo"\)\);/);
assert.equal((dice.match(/red-success-dsn\.png/g) ?? []).length, 4, "in 3D i rossi mostrano la scintilla dal 6 al 9");
assert.equal((dice.match(/red-fail-dsn\.png/g) ?? []).length, 4, "e la vuota dal 2 al 5");
const main = readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8");
assert.match(main, /registerVolonta\(\);[\s\S]{0,200}registerRossi\(\);/);
const fonte = readFileSync(new URL("../scripts/rossi.js", import.meta.url), "utf8");
assert.match(fonte, /if \(!isMageActor\(actor\) \|\| !actor\.isOwner\) return false;/, "il tasto è di chi ha il mago");
assert.match(readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8"), /\.wod5e-mage-roll-actions > \.wod5e-mage-rossi-button\s*\{/);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8")).WOD5E_MAGE;
  for (const key of ["Prendi", "Hint", "Title", "Ask", "Yes", "No", "Done"]) assert.equal(typeof strings.Rossi[key], "string", `${lang} Rossi.${key}`);
  for (const key of ["RossiAParte", "Paradossale", "ParadossaleObbligo", "SuccessoParadossale"]) assert.equal(typeof strings.RamoC[key], "string", `${lang} RamoC.${key}`);
  assert.equal(typeof strings.Menu.Paradossale, "string");
}

console.log("Rossi presi: test passati.");
