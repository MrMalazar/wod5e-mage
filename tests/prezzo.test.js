import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PREZZO_FLAG, prezzoState, renderPrezzoButton, renderPriced } from "../scripts/prezzo.js";
import { sforzoState } from "../scripts/sforzo.js";
import { volontaState } from "../scripts/volonta.js";

// La vittoria a un prezzo (10/9 notte): il terzo tasto sotto il tiro fallito,
// acceso solo quando mancano al massimo Areté successi; il prezzo lo decide il Narratore.
assert.equal(PREZZO_FLAG, "prezzo");
// Ramo C (11/9): su ogni fallimento con almeno un dado tirato; a zero dadi il tasto c'è ma è spento.
assert.deepEqual(prezzoState({ total: 0, difficulty: 1, dice: 3 }), { show: true, enabled: true, missing: 1, dice: 3 });
assert.deepEqual(prezzoState({ total: 0, difficulty: 1, dice: 0 }), { show: true, enabled: false, missing: 1, dice: 0 }, "senza dadi: il tasto c'è ma è spento");
assert.deepEqual(prezzoState({ total: 1, difficulty: 1, dice: 3 }), { show: false, enabled: false, missing: 0 });
assert.deepEqual(prezzoState({ total: 0, difficulty: 1, dice: 3, forced: true }), { show: false, enabled: false, missing: 0 });
assert.deepEqual(prezzoState({ total: 0, difficulty: 1, dice: 3, priced: true }), { show: false, enabled: false, missing: 0 });
assert.deepEqual(prezzoState({ total: 0, difficulty: 1, dice: 3, burst: true }), { show: false, enabled: false, missing: 0 });
assert.deepEqual(prezzoState({ total: 0, difficulty: 1, dice: 3, automatic: true }), { show: false, enabled: false, missing: 0 });
assert.deepEqual(prezzoState({ total: 0, difficulty: 0, dice: 3 }), { show: false, enabled: false, missing: 0 }, "senza soglia niente");

// Con la vittoria a un prezzo gli altri due tasti tacciono.
assert.deepEqual(sforzoState({ total: 3, difficulty: 5, priced: true }), { show: false, missing: 0 });
assert.deepEqual(volontaState({ total: 3, difficulty: 5, failedCount: 2, priced: true }), { show: false, max: 0 });

// Il tasto e la riga.
const it = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8"));
const localize = (key) => key.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), it) ?? key;
const format = (key, data = {}) => String(localize(key)).replace(/\{(\w+)\}/g, (_, k) => String(data[k]));
assert.equal(
  renderPrezzoButton({ show: true, enabled: true, missing: 1 }, 2, localize, format),
  '<button type="button" class="wod5e-mage-roll-action wod5e-mage-prezzo-button" data-prezzo="go" title="Dadi tirati: 2. L\'incantesimo può riuscire lo stesso: il prezzo lo decide il Narratore.">Vittoria a un prezzo</button>'
);
assert.match(renderPrezzoButton({ show: true, enabled: false, missing: 1 }, 0, localize, format), /data-prezzo="go" disabled title="Nessun dado tirato: senza dadi non c'è vittoria a un prezzo\."/);
assert.equal(
  renderPriced({ missing: 1, dice: 2 }, format, localize),
  '<p class="wod5e-mage-roll-note wod5e-mage-roll-note-prezzo"><b class="wod5e-mage-prezzo-label">Vittoria a un prezzo</b> <span>dadi tirati 2: il prezzo lo decide il Narratore.</span></p>'
);

// Il resto della macchina: registrata in main dopo la Volontà e lo Sforzo (l'ordine dei tasti), la carta porta i dadi tirati.
const main = readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8");
assert.match(main, /registerVolonta\(\);[\s\S]*registerSforzo\(\);\n\s*registerPrezzo\(\);/);
assert.match(readFileSync(new URL("../scripts/paradox-dice.js", import.meta.url), "utf8"), /dice: conto\.dice,/);
const source = readFileSync(new URL("../scripts/prezzo.js", import.meta.url), "utf8");
assert.match(source, /if \(state\.enabled\) \{\s*markRollOpen\(html\);/);
assert.match(source, /\[ROLL_CARD_FLAG\]: \{ symbols: \[\], \.\.\.card, priced: true \}/);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8"));
  for (const key of ["Label", "Title", "Button", "Hint", "HintFar", "Ask", "AskNote", "Yes", "No", "Done"]) {
    assert.equal(typeof strings.WOD5E_MAGE.Prezzo[key], "string", `${lang} ${key}`);
  }
}
assert.match(readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8"), /\.wod5e-mage-roll-actions > \.wod5e-mage-prezzo-button\s*\{/);

console.log("Vittoria a un prezzo: test passati.");
