import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { INDULGERE_FLAG, indulgereOptions, indulgereState, normalizeIndulgi, renderIndulgereButton, renderIndulto } from "../scripts/indulgere.js";
import { rollOutcome } from "../scripts/roll-card.js";
import { emptyTiro, setIndulgi } from "../scripts/tiro.js";

// L'Indulgere (Blue, 3/10) al posto dello Sforzare la realtà: dichiarato
// prima del lancio col lato che dice il Narratore, l'incantesimo riesce, e
// sotto la carta compare «Tira Saggezza»: Fermezza + Autocontrollo meno la
// soglia dell'incantesimo, un 8 riesce; fallito, il segno di quel lato scende.
assert.equal(INDULGERE_FLAG, "indulgere");
assert.deepEqual([normalizeIndulgi("hubris"), normalizeIndulgi("silenzio"), normalizeIndulgi(true), normalizeIndulgi("")], ["hubris", "silenzio", "", ""]);

// Il tasto c'è solo su un lancio indulto e non ancora pagato; la soglia è quella dell'incantesimo.
assert.deepEqual(indulgereState({ indulgi: "hubris", threshold: 4, total: 6 }), { show: true, lato: "hubris", soglia: 4 }, "anche se il lancio è riuscito da sé: indulgere si paga sempre");
assert.deepEqual(indulgereState({ indulgi: "silenzio", threshold: 0 }), { show: true, lato: "silenzio", soglia: 0 });
assert.deepEqual(indulgereState({ indulgi: "", threshold: 4 }), { show: false, lato: "", soglia: 0 });
assert.deepEqual(indulgereState({ threshold: 4, forced: true }), { show: false, lato: "", soglia: 0 }, "senza lato niente");
assert.deepEqual(indulgereState({ indulgi: "hubris", threshold: 4 }, { esito: "fallito" }), { show: false, lato: "", soglia: 0 }, "già pagato");
assert.deepEqual(indulgereState({ indulgi: "hubris", threshold: -2 }), { show: true, lato: "hubris", soglia: 0 });

const it = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8"));
const en = JSON.parse(readFileSync(new URL("../lang/en.json", import.meta.url), "utf8"));
const localize = (key) => key.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), it) ?? key;
const format = (key, data = {}) => String(localize(key)).replace(/\{(\w+)\}/g, (_, k) => String(data[k]));

// Il menù sul tasto Indulgi del Tiro: nell'Hubris, nel Silenzio, niente.
assert.deepEqual(indulgereOptions(localize), [
  { state: "hubris", text: "Indulgi nell'Hubris", glyph: null },
  { state: "silenzio", text: "Indulgi nel Silenzio", glyph: null },
  { state: "", text: "Non indulgere", glyph: null }
]);
assert.deepEqual(indulgereOptions().map((o) => o.text), ["WOD5E_MAGE.Indulgere.Nel.hubris", "WOD5E_MAGE.Indulgere.Nel.silenzio", "WOD5E_MAGE.Indulgere.No"]);

// Il tasto e la riga sotto la carta.
assert.equal(
  renderIndulgereButton({ show: true, lato: "hubris", soglia: 4 }, localize, format),
  '<button type="button" class="wod5e-mage-roll-action wod5e-mage-indulgere-button" data-indulgere="go" title="Hai indulto nell\'Hubris: l\'incantesimo è riuscito. Ora tiri Saggezza, Fermezza + Autocontrollo meno la soglia (4), e un 8 riesce. Fallito, il segno dell\'Hubris scende di un passo.">Tira Saggezza</button>'
);
assert.equal(
  renderIndulto({ esito: "fallito", testo: "Indulgere nell'Hubris: la Saggezza non tiene, il segno scende: passo 1." }, localize),
  '<p class="wod5e-mage-roll-note wod5e-mage-roll-note-indulgere scende"><b class="wod5e-mage-indulgere-label">Indulgere</b> <span>Indulgere nell\'Hubris: la Saggezza non tiene, il segno scende: passo 1.</span></p>'
);
assert.match(renderIndulto({ esito: "coperto", testo: "a <b>" }, localize), /wod5e-mage-roll-note-indulgere resta"><b class="wod5e-mage-indulgere-label">Indulgere<\/b> <span>a &lt;b&gt;<\/span>/);

// Il Tiro: il lato dichiarato sta nello stato, uno dei due o niente.
const vuoto = emptyTiro();
assert.equal(vuoto.indulgi, "");
assert.equal(setIndulgi(vuoto, "hubris").indulgi, "hubris");
assert.equal(setIndulgi(setIndulgi(vuoto, "hubris"), "").indulgi, "");
assert.equal(setIndulgi(vuoto, "boh").indulgi, "", "un lato che non esiste non si tiene");
assert.equal(vuoto.sforza, undefined, "lo Sforzare non c'è più nello stato");
// La fascia della carta: indulgendo il lancio riesce, qualunque sia il conto.
assert.deepEqual(rollOutcome(1, 5, localize, { forced: true }), { total: 1, cssClass: "success", text: "Successo indulgendo", missing: 0 });

// Il resto della macchina: la carta porta il lato e la riuscita, il tasto nel Tiro, la registrazione, le lingue, il CSS.
const read = (name) => readFileSync(new URL(`../${name}`, import.meta.url), "utf8");
const source = read("scripts/indulgere.js");
assert.match(source, /soglia: state\.soglia,/, "il tiro di Saggezza con la soglia dell'incantesimo");
assert.match(source, /esitoIndulgere\(stato, \{ lato: state\.lato, successi: tiro\.successi \}\)/, "fallito il segno scende, senza cancello");
assert.match(source, /if \(esito\.sposta\) await saveSaggezza\(actor, esito\.next\)/);
assert.match(source, /\[INDULGERE_FLAG\]: used/, "sul messaggio resta com'è andata");
assert.match(source, /if \(!isMageActor\(actor\) \|\| !actor\.isOwner\) return false;/, "il tasto solo a chi possiede il personaggio");
const scheda = read("scripts/tiro-scheda.js");
assert.match(scheda, /forced: Boolean\(tiro\.indulgi\)/, "la carta dice Successo indulgendo");
assert.match(scheda, /indulgi: tiro\.indulgi \?\? ""/);
assert.match(scheda, /WOD5E_MAGE\.Indulgere\.Nota/, "la nota del lancio dice che si indulge");
assert.ok(!scheda.includes("sforza") && !scheda.includes("Sforza"), "lo Sforzare non c'è più nel Tiro");
assert.match(read("templates/actor/parts/stat-tiro.hbs"), /wod5e-mage-tiro-indulgi\{\{#if tiro\.indulgi\}\} acceso\{\{\/if\}\}" data-action="tiroIndulgi"[\s\S]*\{\{tiro\.indulgi\.label\}\}[\s\S]*WOD5E_MAGE\.Tiro\.Indulgi/);
assert.match(read("scripts/sheets/mage-actor-sheet.js"), /tiroIndulgi: onTiroIndulgi/);
const main = read("scripts/main.js");
assert.match(main, /registerVolonta\(\);[\s\S]{0,400}registerIndulgere\(\);\s*registerSaggezza\(\);\s*registerPrezzo\(\);/, "i tasti sotto la carta: Volontà, Tira Saggezza, Vittoria a un prezzo");
assert.ok(!main.includes("registerSforzo") && !main.includes("sforzo.js"), "lo Sforzare non si registra più");
assert.match(read("scripts/volonta.js"), /if \(card\.saggezza\) return false;/, "sul tiro di Saggezza niente ritiro con la Volontà");
assert.match(read("scripts/paradox-dice.js"), /successFrom = null/, "la finestra del tiro accetta l'8 forzato");
assert.match(read("scripts/paradox-dice.js"), /const successFrom = forcedSuccessFrom \?\? successThreshold\(advancedDifficulty\)/);
assert.ok(!read("scripts/ramo-c.js").includes("sforzoCost"), "il prezzo dello Sforzare non c'è più");
const css = read("styles/wod5e-mage.css");
for (const rule of [".wod5e-mage-indulgere-button", ".wod5e-mage-roll-note-indulgere", ".wod5e-mage-indulgere-label", ".wod5e-mage-tiro-indulgi"]) assert.ok(css.includes(rule), rule);
for (const [lang, strings] of [["it", it], ["en", en]]) {
  const i = strings.WOD5E_MAGE.Indulgere;
  for (const key of ["Label", "Button", "Hint", "No", "Nota", "Rolling", "Riuscito", "Fallito"]) assert.equal(typeof i[key], "string", `${lang} ${key}`);
  assert.deepEqual(Object.keys(i.Nel), ["hubris", "silenzio"], lang);
  assert.equal(typeof strings.WOD5E_MAGE.Tiro.Indulgi, "string", `${lang} Tiro.Indulgi`);
  assert.equal(typeof strings.WOD5E_MAGE.Tiro.IndulgiHint, "string", `${lang} Tiro.IndulgiHint`);
  for (const key of ["Sforza", "SforzaHint", "SforzaNote"]) assert.equal(strings.WOD5E_MAGE.Tiro[key], undefined, `${lang} Tiro.${key} tolta`);
  assert.equal(strings.WOD5E_MAGE.Sforzo, undefined, `${lang} Sforzo tolto`);
}
assert.equal(it.WOD5E_MAGE.RollCard.Forced, "Successo indulgendo");

console.log("Indulgere: test passati.");
