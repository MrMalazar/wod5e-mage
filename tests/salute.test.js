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
  saluteDamageOutcome,
  saluteWithDamage,
  saluteWithMentalAggravated,
  normalizeDamageChoice
} from "../scripts/salute.js";

function actor({ stamina = 2, resolve = 3, salute } = {}) {
  return {
    system: { attributes: { stamina: { value: stamina }, resolve: { value: resolve } } },
    getFlag: (_m, key) => (key === "salute" ? salute : undefined)
  };
}

// Un tracciato solo: 2 + Costituzione + Fermezza (11/9; era 1), più le caselle in più.
assert.equal(saluteMax(actor()), 7);
assert.equal(saluteMax(actor({ stamina: 0, resolve: 0 })), 2);
assert.equal(saluteMax(actor(), 2), 9);
assert.equal(saluteMax(actor(), -9), 1);

// Nuova sessione: i superficiali mentali guariscono, un fisico se ne va.
assert.deepEqual(saluteAfterSession({ pa: 1, ps: 3, ma: 2, ms: 2 }), { pa: 1, ps: 2, ma: 2, ms: 0 });
assert.deepEqual(saluteAfterSession({ pa: 0, ps: 0, ma: 0, ms: 4 }), { pa: 0, ps: 0, ma: 0, ms: 0 });
// Nuova sessione (ramo C, 11/9): la Ruota si azzera e riparte dalla Quintessenza generata; senza, da zero.
assert.equal(quintessenceGained(""), 0);
assert.equal(quintessenceGained("0"), 0);
assert.equal(quintessenceGained("3"), 3);
assert.equal(quintessenceGained(" 2 "), 2);
assert.match(readFileSync(new URL("../scripts/salute.js", import.meta.url), "utf8"), /magickBalance`\] = balanceAfterSession\(balance, getPersistentMagickResources\(actor\)\.generatedQuintessence\);/);

// I conti stanno dentro il tracciato, aggravati per primi.
assert.deepEqual(clampSalute({ pa: 2, ps: 3, ma: 2, ms: 1 }, 6), { pa: 2, ps: 3, ma: 1, ms: 0 });
assert.deepEqual(clampSalute({ pa: 9 }, 4), { pa: 4, ps: 0, ma: 0, ms: 0 });

// Le caselle si dipingono da sinistra: X, /, ◎, o, vuote.
let salute = getSalute(actor({ salute: { pa: 1, ps: 2, ma: 1, ms: 1 } }));
assert.equal(salute.max, 7);
// I fisici da sinistra, i mentali da destra (6/9).
assert.deepEqual(salute.cells.map((cell) => cell.state), ["pa", "ps", "ps", "", "", "ms", "ma"]);
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

// La Salute nostra sta nel riquadro Risorse della prima pagina (16/9 sera:
// Condizioni, Salute, Saggezza, Ruota), non nei partial di Salute e Volontà
// del sistema; la testata è vuota.
const statPage = readFileSync(new URL("../templates/actor/parts/stat.hbs", import.meta.url), "utf8");
assert.match(statPage, /stat-identita\.hbs[\s\S]*parts\/stat-risorse\.hbs/);
assert.doesNotMatch(statPage, /health\.hbs|willpower\.hbs|riq-salute/);
const risorsePage = readFileSync(new URL("../templates/actor/parts/stat-risorse.hbs", import.meta.url), "utf8");
// L'ordine del 20/9: Salute, Saggezza, Quintessenza, Paradosso, Ruota, Condizioni.
assert.match(risorsePage, /wod5e-mage-riq-risorse[\s\S]*parts\/salute\.hbs[\s\S]*wod5e-mage-riga-saggezza[\s\S]*wod5e-mage-riga-conto quintessence[\s\S]*wod5e-mage-riga-conto paradox[\s\S]*parts\/stat-ruota\.hbs[\s\S]*parts\/stat-condizioni\.hbs/);
const header = readFileSync(new URL("../templates/actor/mage-header.hbs", import.meta.url), "utf8");
assert.doesNotMatch(header, /health\.hbs|willpower\.hbs|salute\.hbs/);
const track = readFileSync(new URL("../templates/actor/parts/salute.hbs", import.meta.url), "utf8");
assert.match(track, /data-action="saluteCellChange"[\s\S]*data-index="\{\{cell\.index\}\}"/);
// La riga (20/9): la testa col cuore, il nome, il conto e il tastino che apre
// il ventaglio; nel ventaglio i sei comandi, meno e più delle caselle compresi.
assert.match(track, /wod5e-mage-riga-salute con-ventaglio[\s\S]*wod5e-mage-riga-testa[\s\S]*salute\.max[\s\S]*wod5e-mage-ventaglio-tasto" data-action="ventaglioToggle"[\s\S]*wod5e-mage-salute-track[\s\S]*wod5e-mage-ventaglio wod5e-mage-ventaglio-sei[\s\S]*data-action="saluteRiposo"[\s\S]*data-action="saluteRelax"[\s\S]*data-action="saluteReset"[\s\S]*data-action="saluteDanni"[\s\S]*data-action="saluteExtraChange" data-delta="-1"[\s\S]*data-action="saluteExtraChange" data-delta="1"/);
assert.doesNotMatch(track, /wod5e-mage-salute-buttons|resource-control/);
// Niente legenda sotto il tracciato: il menù di ogni casella dice il nome
// accanto al segno.
assert.doesNotMatch(track, /Salute\.LegendPhysical|Salute\.LegendMental|wod5e-mage-salute-legend/);
// Il Reset sta nel ventaglio; Nuova sessione e Cambio Scena stanno nell'Identità (16/9), sul ritratto (20/9).
assert.match(track, /data-action="saluteReset"/);
assert.doesNotMatch(track, /data-action="saluteNewSession"/);
assert.match(readFileSync(new URL("../templates/actor/parts/stat-identita.hbs", import.meta.url), "utf8"), /wod5e-mage-ritratto">[\s\S]*wod5e-mage-identita-tasti[\s\S]*wod5e-mage-new-session" data-action="saluteNewSession"[\s\S]*data-action="saluteCambioScena"[\s\S]*<\/div>\s*<\/div>\s*<div class="wod5e-mage-names">/);
const saluteScript = readFileSync(new URL("../scripts/salute.js", import.meta.url), "utf8");
assert.match(saluteScript, /wod5e-mage-salute-menu-text/);
const risorse = readFileSync(new URL("../templates/actor/parts/stat-ruota.hbs", import.meta.url), "utf8");
assert.match(risorse, /data-action="contraccolpoNega"/);
assert.doesNotMatch(risorse, /contraccolpoReset/);


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

// Danni subiti (9/9): il tasto a destra di Reset, la finestra coi quattro segni.
assert.match(track, /data-action="saluteReset"[\s\S]*data-action="saluteDanni"/);
{
  const dialog = readFileSync(new URL("../templates/dialogs/salute-danni.hbs", import.meta.url), "utf8");
  assert.doesNotMatch(dialog.replace(/\{\{!--[\s\S]*?--\}\}/g, ""), /<form/);
  assert.match(dialog, /name="amount"[\s\S]*<input type="hidden" name="state" value="\{\{chosen\}\}">[\s\S]*data-role="danniSign" data-state="\{\{sign\.state\}\}"/);
  const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
  assert.match(sheet, /saluteDanni: onSaluteDanni/);
}
assert.deepEqual(normalizeDamageChoice({ amount: "3", state: "ma" }), { state: "ma", amount: 3 });
assert.deepEqual(normalizeDamageChoice({ amount: "-2", state: "boh" }), { state: "", amount: 0 });
// Quel che entra riempie le caselle libere; gli aggravati per primi.
assert.deepEqual(saluteDamageOutcome({ pa: 0, ps: 2, ma: 0, ms: 0 }, 6, { ps: 2 }), { counts: { pa: 0, ps: 4, ma: 0, ms: 0 }, converted: 0 });
// La conversione (LIBRO, «La conversione»): tracciato pieno, ogni danno di
// troppo trasforma un superficiale in aggravato, dalla prima casella.
assert.deepEqual(saluteDamageOutcome({ pa: 0, ps: 6, ma: 0, ms: 0 }, 6, { ps: 3 }), { counts: { pa: 3, ps: 3, ma: 0, ms: 0 }, converted: 3 });
// Due caselle libere e quattro danni: due entrano, due convertono.
assert.deepEqual(saluteDamageOutcome({ pa: 0, ps: 2, ma: 0, ms: 2 }, 6, { ms: 4 }), { counts: { pa: 0, ps: 2, ma: 2, ms: 2 }, converted: 2 });
// Prima dal lato del colpo, poi dall'altro; qualunque sia il tipo del colpo.
assert.deepEqual(saluteDamageOutcome({ pa: 0, ps: 3, ma: 0, ms: 3 }, 6, { ms: 2 }), { counts: { pa: 0, ps: 3, ma: 2, ms: 1 }, converted: 2 });
assert.deepEqual(saluteDamageOutcome({ pa: 0, ps: 1, ma: 0, ms: 5 }, 6, { pa: 2 }), { counts: { pa: 1, ps: 0, ma: 1, ms: 4 }, converted: 2 });
// Tutto aggravato: non c'è più niente da convertire.
assert.deepEqual(saluteDamageOutcome({ pa: 6, ps: 0, ma: 0, ms: 0 }, 6, { ps: 2 }), { counts: { pa: 6, ps: 0, ma: 0, ms: 0 }, converted: 0 });
assert.deepEqual(saluteWithDamage({ pa: 0, ps: 6, ma: 0, ms: 0 }, 6, { ma: 1 }), { pa: 1, ps: 5, ma: 0, ms: 0 });
console.log("Salute tests passed.");
