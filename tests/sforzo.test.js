import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  missingSuccesses,
  renderForced,
  renderSforzoButton,
  sforzoBalance,
  sforzoPrice,
  sforzoState,
  SFORZO_FLAG,
  SFORZO_SESSION_FLAG
} from "../scripts/sforzo.js";
import { volontaState } from "../scripts/volonta.js";

// Sforzare la realtà (Blue, 10/9 sera): a tiro fallito l'incantesimo riesce
// pagando in Paradosso i successi che mancano; dalla seconda volta in
// sessione anche un aggravato, dove dice l'Effetto.
assert.equal(SFORZO_FLAG, "sforzo");
assert.equal(SFORZO_SESSION_FLAG, "sforziSessione");
assert.equal(missingSuccesses(3, 8), 5);
assert.equal(missingSuccesses(5, 5), 0);
assert.equal(missingSuccesses(4, 0), 0, "senza soglia non manca niente");

// Il tasto: solo a tiro fallito, non sforzato, non Scoppio, non riuscita senza dadi.
// Le carte del ramo A pagano i successi mancanti; quelle del ramo C la soglia (vedi ramo-c.test.js).
assert.deepEqual(sforzoState({ total: 3, difficulty: 6 }), { show: true, missing: 3 });
assert.deepEqual(sforzoState({ total: 6, difficulty: 6 }), { show: false, missing: 0 });
assert.deepEqual(sforzoState({ total: 3, difficulty: 6, forced: true }), { show: false, missing: 0 });
assert.deepEqual(sforzoState({ total: 3, difficulty: 6, burst: true }), { show: false, missing: 0 });
assert.deepEqual(sforzoState({ total: 3, difficulty: 6, automatic: true }), { show: false, missing: 0 });

// Il prezzo: la prima volta solo Paradosso; poi l'aggravato secondo l'Effetto
// (fisico se non dichiarato, come l'Ustione; variabile a caso).
assert.deepEqual(sforzoPrice({ missing: 4, usesSoFar: 0, effectKind: "mental" }), { paradox: 4, damage: null, uses: 0 });
assert.deepEqual(sforzoPrice({ missing: 4, usesSoFar: 1, effectKind: "mental" }), { paradox: 4, damage: "ma", uses: 1 });
assert.deepEqual(sforzoPrice({ missing: 2, usesSoFar: 1, effectKind: "physical" }), { paradox: 2, damage: "pa", uses: 1 });
assert.deepEqual(sforzoPrice({ missing: 2, usesSoFar: 3, effectKind: "" }), { paradox: 2, damage: "pa", uses: 3 });
assert.equal(sforzoPrice({ missing: 2, usesSoFar: 1, effectKind: "variable", random: () => 0.2 }).damage, "pa");
assert.equal(sforzoPrice({ missing: 2, usesSoFar: 1, effectKind: "variable", random: () => 0.9 }).damage, "ma");

// La Ruota: i punti entrano; se è piena si annullano con la Quintessenza a coppie; il resto non entra.
assert.deepEqual(sforzoBalance({ quintessence: 2, paradox: 3 }, 4), { after: { quintessence: 2, paradox: 7 }, entered: 4, cancelled: 0, moved: 4, wasted: 0 });
assert.deepEqual(sforzoBalance({ quintessence: 5, paradox: 3 }, 3), { after: { quintessence: 4, paradox: 5 }, entered: 2, cancelled: 1, moved: 3, wasted: 0 });
assert.deepEqual(sforzoBalance({ quintessence: 0, paradox: 8 }, 3), { after: { quintessence: 0, paradox: 9 }, entered: 1, cancelled: 0, moved: 1, wasted: 2 });

// Con la realtà sforzata la Volontà non ha più tasti.
assert.deepEqual(volontaState({ total: 3, difficulty: 6, failedCount: 2, forced: true }), { show: false, max: 0 });
// E con la vittoria a un prezzo lo Sforzo tace.
assert.deepEqual(sforzoState({ total: 3, difficulty: 6, priced: true }), { show: false, missing: 0 });

// La riga in chat.
const it = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8"));
const localize = (key) => key.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), it) ?? key;
const format = (key, data = {}) => String(localize(key)).replace(/\{(\w+)\}/g, (_, k) => String(data[k]));
assert.equal(
  renderForced({ missing: 3, paradox: 3, wasted: 0, damage: null }, format, localize),
  '<p class="wod5e-mage-roll-note wod5e-mage-roll-note-sforzo"><b class="wod5e-mage-sforzo-label">Sforzare la realtà</b> <span>soglia 3, la Ruota sale di 3 in Paradosso.</span></p>'
);
assert.match(renderForced({ missing: 2, paradox: 1, wasted: 1, damage: "ma" }, format, localize), /aggravato mentale\. La Ruota era piena: 1 punti non sono entrati\./);

// Il resto della macchina: registrata in main, la carta porta l'Effetto, Nuova sessione azzera il conto.
assert.match(readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8"), /registerSforzo\(\)/);
assert.match(readFileSync(new URL("../scripts/paradox-dice.js", import.meta.url), "utf8"), /effectKind: effectKind \?\? "",/);
assert.match(readFileSync(new URL("../scripts/salute.js", import.meta.url), "utf8"), /-=sforziSessione/);
assert.match(readFileSync(new URL("../scripts/volonta.js", import.meta.url), "utf8"), /card\.forced \|\| card\.priced\) return false/);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8"));
  for (const key of ["Label", "Title", "Button", "Hint", "HintAgain", "Ask", "AskAgain", "AskNote", "Yes", "No", "Done", "DoneDamage", "DoneWasted", "DamagePhysical", "DamageMental"]) {
    assert.equal(typeof strings.WOD5E_MAGE.Sforzo[key], "string", `${lang} ${key}`);
  }
}
assert.match(readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8"), /\.wod5e-mage-roll-actions > \.wod5e-mage-sforzo-button\s*\{/);
// Il tasto sta nella fila dei tre (10/9 notte), col nome all'infinito: «Sforzare la realtà +N».
assert.equal(renderSforzoButton({ show: true, missing: 3 }, { paradox: 3, damage: null, uses: 0 }, localize, format), '<button type="button" class="wod5e-mage-roll-action wod5e-mage-sforzo-button" data-sforzo="go" title="Soglia: 3. L\'incantesimo riesce, la Ruota sale di 3 in Paradosso.">Sforzare la realtà <b>+3</b></button>');

console.log("Sforzare la realtà: test passati.");
