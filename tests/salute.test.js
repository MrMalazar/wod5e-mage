import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  applySaluteStateChange,
  clampSalute,
  getSalute,
  saluteAfterSession,
  quintessenceGained,
  saluteMax,
  saluteStatus,
  saluteAfterRelax,
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
// Nuova sessione (6/9): la Ruota sale della Quintessenza generata, almeno di 1.
assert.equal(quintessenceGained(""), 1);
assert.equal(quintessenceGained("0"), 1);
assert.equal(quintessenceGained("3"), 3);
assert.equal(quintessenceGained(" 2 "), 2);
assert.match(readFileSync(new URL("../scripts/salute.js", import.meta.url), "utf8"), /magickBalance`\] = \{\s*quintessence: Math\.min\(balance\.quintessence \+ gained, MAGICK_TRACK_MAX - balance\.floor\)/);

// I conti stanno dentro il tracciato, aggravati per primi.
assert.deepEqual(clampSalute({ pa: 2, ps: 3, ma: 2, ms: 1 }, 6), { pa: 2, ps: 3, ma: 1, ms: 0 });
assert.deepEqual(clampSalute({ pa: 9 }, 4), { pa: 4, ps: 0, ma: 0, ms: 0 });

// Le caselle si dipingono da sinistra: X, /, ◎, o, vuote.
let salute = getSalute(actor({ salute: { pa: 1, ps: 2, ma: 1, ms: 1 } }));
assert.equal(salute.max, 6);
// I fisici da sinistra, i mentali da destra (6/9).
assert.deepEqual(salute.cells.map((cell) => cell.state), ["pa", "ps", "ps", "", "ms", "ma"]);
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
// Niente legenda sotto il tracciato: il menù di ogni casella dice il nome
// accanto al segno.
assert.doesNotMatch(track, /Salute\.LegendPhysical|Salute\.LegendMental|wod5e-mage-salute-legend/);
// Il Reset resta sotto la barra; Nuova sessione sta in alto a sinistra dei Tratti (4/9 notte).
assert.match(track, /data-action="saluteReset"/);
assert.doesNotMatch(track, /data-action="saluteNewSession"/);
assert.match(readFileSync(new URL("../templates/actor/mage-header.hbs", import.meta.url), "utf8"), /wod5e-mage-new-session" data-action="saluteNewSession"/);
assert.doesNotMatch(readFileSync(new URL("../templates/actor/parts/tratti.hbs", import.meta.url), "utf8"), /saluteNewSession/);
const saluteScript = readFileSync(new URL("../scripts/salute.js", import.meta.url), "utf8");
assert.match(saluteScript, /wod5e-mage-salute-menu-text/);
const ruota = readFileSync(new URL("../templates/actor/parts/ruota.hbs", import.meta.url), "utf8");
assert.match(ruota, /data-action="contraccolpoNega"/);
assert.doesNotMatch(ruota, /contraccolpoReset/);

console.log("Salute tests passed.");

// Nuova sessione: i punti esperienza della sessione diventano una Presa.
{
  const { experienceGainRow } = await import("../scripts/salute.js");
  assert.deepEqual(experienceGainRow("4", " sessione del 4/9 "), { cost: 4, when: "sessione del 4/9" });
  assert.deepEqual(experienceGainRow("x", ""), { cost: 0, when: "" });
  const dialog = readFileSync(new URL("../templates/dialogs/new-session.hbs", import.meta.url), "utf8");
  assert.match(dialog, /name="experience"[\s\S]*name="when"/);
}

// Relax (4/9 notte): un successo un superficiale mentale, due successi un aggravato; almeno una casella.
assert.deepEqual(saluteAfterRelax({ pa: 1, ps: 2, ma: 2, ms: 3 }, 0), { pa: 1, ps: 2, ma: 2, ms: 2 });
assert.deepEqual(saluteAfterRelax({ pa: 1, ps: 2, ma: 2, ms: 3 }, 2), { pa: 1, ps: 2, ma: 2, ms: 1 });
assert.deepEqual(saluteAfterRelax({ pa: 1, ps: 2, ma: 2, ms: 3 }, 5), { pa: 1, ps: 2, ma: 1, ms: 0 });
assert.deepEqual(saluteAfterRelax({ pa: 0, ps: 0, ma: 2, ms: 0 }, 0), { pa: 0, ps: 0, ma: 1, ms: 0 });
assert.deepEqual(saluteAfterRelax({ pa: 0, ps: 0, ma: 2, ms: 0 }, 3), { pa: 0, ps: 0, ma: 1, ms: 0 });
assert.deepEqual(saluteAfterRelax({ pa: 0, ps: 1, ma: 0, ms: 0 }, 4), { pa: 0, ps: 1, ma: 0, ms: 0 });
assert.match(track, /data-action="saluteRiposo"[\s\S]*data-action="saluteRelax"[\s\S]*data-action="saluteReset"/);
