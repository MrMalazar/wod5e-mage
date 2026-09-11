import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  renderUstioneButtons,
  renderUstioneDone,
  renderUstioneWaiting,
  USTIONE_CHOICES,
  ustioneState
} from "../scripts/ustione.js";
import { getSalute, locksAfterScene, normalizeParadoxLocks, paintParadoxLocks, balanceAfterSession, quintessenceGained } from "../scripts/salute.js";

// L'Ustione a scelta (Blue, 11/9): i due tasti finché il giocatore non sceglie, poi la riga.
assert.deepEqual(USTIONE_CHOICES, ["brucia", "narratore"]);
assert.deepEqual(ustioneState({ threshold: 3, choice: "" }), { show: true, chosen: "", threshold: 3 });
assert.deepEqual(ustioneState({ threshold: 3, choice: "brucia" }), { show: false, chosen: "brucia", threshold: 3 });
assert.deepEqual(ustioneState({ threshold: 0 }), { show: false, chosen: "", threshold: 0 });
assert.deepEqual(ustioneState(undefined), { show: false, chosen: "", threshold: 0 });
assert.deepEqual(ustioneState({ threshold: 2, choice: "boh" }), { show: true, chosen: "", threshold: 2 });

const it = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8"));
const localize = (key) => key.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), it) ?? key;
const format = (key, data = {}) => String(localize(key)).replace(/\{(\w+)\}/g, (_, k) => String(data[k]));
const buttons = renderUstioneButtons({ show: true, threshold: 3 }, localize, format);
assert.match(buttons, /data-ustione="brucia"[^>]*>Brucia <b>3<\/b><\/button>/);
assert.match(buttons, /data-ustione="narratore"[^>]*>Dai al Narratore <b>3<\/b><\/button>/);
assert.doesNotMatch(buttons, /Cedi|gettone|token/i);
assert.match(renderUstioneDone({ choice: "narratore", threshold: 3, given: 3, discharged: 2 }, format, localize), /3 punti Paradosso al Narratore\. La Ruota scarica 2\./);
assert.match(renderUstioneDone({ choice: "brucia", threshold: 3 }, format, localize), /3 danni segnati sulla Salute\./);
assert.match(renderUstioneDone({ choice: "brucia", threshold: 3, applied: { applied: 3, pa: 1, ps: 2, ma: 0, ms: 0, discharged: 3 } }, format, localize), /Ustione 3 segnata sulla Salute: 3 fisici \(1 aggravato\)\. La Ruota scarica 3\./);
assert.equal(renderUstioneDone({ choice: "" }, format, localize), "");
assert.match(renderUstioneWaiting({ threshold: 4 }, format), /Ustione 4: il giocatore sceglie/);

// Le caselle bloccate dall'Ustione (11/9): rosse per la scena, mai più dei danni del loro lato.
assert.deepEqual(normalizeParadoxLocks({ p: 3, m: 2 }, { pa: 1, ps: 1, ma: 0, ms: 1 }), { p: 2, m: 1 });
assert.deepEqual(normalizeParadoxLocks(undefined, { pa: 1 }), { p: 0, m: 0 });
assert.deepEqual(paintParadoxLocks(["pa", "ps", "ps", "", "ms", "ma"], { p: 2, m: 1 }), [true, true, false, false, false, true]);
assert.deepEqual(locksAfterScene({ p: 2, m: 1 }), { p: 1, m: 1 });
assert.deepEqual(locksAfterScene({ p: 0, m: 1 }), { p: 0, m: 0 });
assert.deepEqual(locksAfterScene({ p: 0, m: 0 }), { p: 0, m: 0 });
const actor = {
  system: { attributes: { stamina: { value: 2 }, resolve: { value: 2 } } },
  getFlag: (_m, key) => ({ salute: { pa: 0, ps: 2, ma: 0, ms: 1, paradosso: { p: 1, m: 5 } } })[key]
};
const salute = getSalute(actor);
assert.deepEqual(salute.paradosso, { p: 1, m: 1 });
assert.equal(salute.locked, 2);
assert.deepEqual(salute.cells.map((cell) => cell.locked), [true, false, false, false, true]);

// Nuova sessione (11/9): la Quintessenza si azzera e riparte dalla generata.
assert.equal(quintessenceGained(""), 0);
assert.equal(quintessenceGained("2"), 2);
assert.deepEqual(balanceAfterSession({ quintessence: 5, paradox: 3, floor: 1 }, "2"), { quintessence: 2, paradox: 3 });
assert.deepEqual(balanceAfterSession({ quintessence: 5, paradox: 8, floor: 0 }, "4"), { quintessence: 1, paradox: 8 }, "dentro le celle libere");
assert.deepEqual(balanceAfterSession({ quintessence: 5, paradox: 0, floor: 0 }, ""), { quintessence: 0, paradox: 0 });

// La macchina: i tasti registrati, il Cambio Scena in testata, le caselle bloccate nel template e nel CSS.
assert.match(readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8"), /registerUstione\(\);\s*registerParadossoNarratore\(\);/);
const header = readFileSync(new URL("../templates/actor/mage-header.hbs", import.meta.url), "utf8");
assert.match(header, /data-action="saluteNewSession"[\s\S]*data-action="saluteCambioScena"/);
assert.match(readFileSync(new URL("../templates/actor/parts/salute.hbs", import.meta.url), "utf8"), /wod5e-mage-salute-locked/);
const css = readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8");
assert.match(css, /\.wod5e-mage-salute-cell\.wod5e-mage-salute-locked\s*\{/);
assert.match(css, /\.wod5e-mage-roll-actions > \.wod5e-mage-ustione-brucia\s*\{/);
assert.match(css, /\.wod5e-mage-roll-actions > \.wod5e-mage-ustione-narratore\s*\{/);
const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheet, /saluteCambioScena: onSaluteCambioScena/);
const source = readFileSync(new URL("../scripts/ustione.js", import.meta.url), "utf8");
assert.match(source, /applyUstione\(actor, \{ threshold: state\.threshold, tens: card\.ustione\.tens, kind: card\.ustione\.kind, lock: true \}\)/);
assert.match(source, /collectGivenParadox\(message\)/);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8"));
  for (const key of ["Label", "Pending", "Burn", "Give", "BurnHint", "GiveHint", "BurnedShort", "Given", "Waiting", "BurnDone", "GiveDone"]) {
    assert.equal(typeof strings.WOD5E_MAGE.Ustione[key], "string", `${lang} Ustione.${key}`);
  }
  for (const key of ["CambioScena", "CambioScenaHint", "CambioScenaDone", "CambioScenaNone", "LockedHint"]) {
    assert.equal(typeof strings.WOD5E_MAGE.Salute[key], "string", `${lang} Salute.${key}`);
  }
}

console.log("Ustione a scelta: test passati.");
