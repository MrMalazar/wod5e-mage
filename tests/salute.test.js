import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  applySaluteStateChange,
  clampSalute,
  getSalute,
  saluteAfterSession,
  saluteMax,
  saluteStatus,
  saluteWithMentalAggravated
} from "../scripts/salute.js";

function actor({ stamina = 2, resolve = 3, salute } = {}) {
  return {
    system: { attributes: { stamina: { value: stamina }, resolve: { value: resolve } } },
    getFlag: (_m, key) => (key === "salute" ? salute : undefined)
  };
}

// Un tracciato solo: 1 + Costituzione + Fermezza, più le caselle in più.
assert.equal(saluteMax(actor()), 6);
assert.equal(saluteMax(actor({ stamina: 0, resolve: 0 })), 1);
assert.equal(saluteMax(actor(), 2), 8);
assert.equal(saluteMax(actor(), -9), 1);

// Nuova sessione: i superficiali mentali guariscono, un fisico se ne va.
assert.deepEqual(saluteAfterSession({ pa: 1, ps: 3, ma: 2, ms: 2 }), { pa: 1, ps: 2, ma: 2, ms: 0 });
assert.deepEqual(saluteAfterSession({ pa: 0, ps: 0, ma: 0, ms: 4 }), { pa: 0, ps: 0, ma: 0, ms: 0 });

// I conti stanno dentro il tracciato, aggravati per primi.
assert.deepEqual(clampSalute({ pa: 2, ps: 3, ma: 2, ms: 1 }, 6), { pa: 2, ps: 3, ma: 1, ms: 0 });
assert.deepEqual(clampSalute({ pa: 9 }, 4), { pa: 4, ps: 0, ma: 0, ms: 0 });

// Le caselle si dipingono da sinistra: X, /, ◎, o, vuote.
let salute = getSalute(actor({ salute: { pa: 1, ps: 2, ma: 1, ms: 1 } }));
assert.equal(salute.max, 6);
assert.deepEqual(salute.cells.map((cell) => cell.state), ["pa", "ps", "ps", "ma", "ms", ""]);
assert.equal(salute.total, 5);
assert.equal(salute.status, "");

// Il cambio di una casella muove i conti e non esce dal tracciato.
assert.deepEqual(applySaluteStateChange(salute, 6, "", "ps"), { pa: 1, ps: 3, ma: 1, ms: 1 });
assert.deepEqual(applySaluteStateChange(salute, 6, "ps", "pa"), { pa: 2, ps: 1, ma: 1, ms: 1 });
assert.deepEqual(applySaluteStateChange(salute, 6, "ma", ""), { pa: 1, ps: 2, ma: 0, ms: 1 });

// Menomato a tracciato coperto; KO a tutte aggravate, morte o shock.
assert.equal(saluteStatus({ pa: 2, ps: 2, ma: 1, ms: 1 }, 6), "WOD5E_MAGE.Salute.Impaired");
assert.equal(saluteStatus({ pa: 4, ps: 0, ma: 2, ms: 0 }, 6), "WOD5E_MAGE.Salute.KoDeath");
assert.equal(saluteStatus({ pa: 2, ps: 0, ma: 4, ms: 0 }, 6), "WOD5E_MAGE.Salute.KoShock");
assert.equal(saluteStatus({ pa: 0, ps: 0, ma: 0, ms: 0 }, 6), "");

// Negare il Contraccolpo: l'aggravato mentale va in una casella vuota,
// altrimenti su un superficiale; a tracciato tutto aggravato, niente.
assert.deepEqual(saluteWithMentalAggravated({ pa: 1, ps: 1, ma: 0, ms: 0 }, 6), { pa: 1, ps: 1, ma: 1, ms: 0 });
assert.deepEqual(saluteWithMentalAggravated({ pa: 1, ps: 2, ma: 0, ms: 3 }, 6), { pa: 1, ps: 2, ma: 1, ms: 2 });
assert.deepEqual(saluteWithMentalAggravated({ pa: 1, ps: 5, ma: 0, ms: 0 }, 6), { pa: 1, ps: 4, ma: 1, ms: 0 });
assert.equal(saluteWithMentalAggravated({ pa: 3, ps: 0, ma: 3, ms: 0 }, 6), null);

// La testata usa la Salute nostra, non i partial di Salute e Volontà del sistema.
const header = readFileSync(new URL("../templates/actor/mage-header.hbs", import.meta.url), "utf8");
assert.match(header, /parts\/salute\.hbs/);
assert.doesNotMatch(header, /health\.hbs|willpower\.hbs/);
const track = readFileSync(new URL("../templates/actor/parts/salute.hbs", import.meta.url), "utf8");
assert.match(track, /data-action="saluteCellChange"[\s\S]*data-index="\{\{cell\.index\}\}"/);
assert.match(track, /data-action="saluteExtraChange"/);
assert.match(track, /Salute\.LegendPhysical[\s\S]*Salute\.LegendMental[\s\S]*data-action="saluteNewSession"[\s\S]*data-action="saluteReset"/);
const ruota = readFileSync(new URL("../templates/actor/parts/ruota.hbs", import.meta.url), "utf8");
assert.match(ruota, /data-action="contraccolpoNega"/);
assert.doesNotMatch(ruota, /contraccolpoReset/);

console.log("Salute tests passed.");
