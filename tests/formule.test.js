import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Handlebars from "handlebars";
import { FORMULE_ALIAS, FORMULE_M6 } from "../scripts/data/formule.js";
import { POTERI } from "../scripts/data/poteri.js";
import { SCOPES } from "../scripts/scopes.js";
import { SPHERES } from "../scripts/spheres.js";
import { prepareGrimorio, prepareGrimorioFormule, prepareGrimorioSpheres } from "../scripts/grimorio.js";

// Le 48 matrici (Blue, 24/9): Sfere e Ambiti del modulo, soglia che torna,
// poteri che esistono, tre testi di Blue, quattro coppie fuse.
assert.equal(FORMULE_M6.length, 48);
assert.equal(new Set(FORMULE_M6.map((formula) => formula.id)).size, 48);
for (const formula of FORMULE_M6) {
  assert.ok(formula.name && formula.intro && formula.limit && formula.use, formula.id);
  assert.ok(formula.access.length >= 1 && formula.access.every((sphere) => SPHERES.includes(sphere)), formula.id);
  assert.ok(formula.amalgams.every((sphere) => SPHERES.includes(sphere) && !formula.access.includes(sphere)), formula.id);
  assert.ok(formula.thresholds.length >= 1, formula.id);
  for (const threshold of formula.thresholds) {
    const scopes = Object.entries(threshold.scopes);
    assert.ok(scopes.length >= 1 && scopes.length <= 3, formula.id);
    assert.ok(scopes.every(([scope, level]) => SCOPES.includes(scope) && level >= 1 && level <= 7), formula.id);
    assert.equal(scopes.reduce((sum, [, level]) => sum + level, 0), threshold.base, formula.id);
  }
  assert.ok(formula.powers.every((id) => POTERI.some((power) => power.id === id)), formula.id);
  // Ogni Sfera d'Accesso ha la sua riga nella Descrizione (Blue, 24/9).
  const righe = Object.keys(formula.bySphere).flatMap((key) => key.split("+"));
  assert.ok(formula.access.every((sphere) => righe.includes(sphere)), `${formula.id}: manca la riga di ${formula.access.find((sphere) => !righe.includes(sphere))}`);
}
assert.deepEqual(FORMULE_M6.filter((formula) => formula.byBlue).map((formula) => formula.name).sort(), ["Accelerare e Rallentare", "Annientare", "Guarire"]);
assert.deepEqual(FORMULE_M6.filter((formula) => formula.name.includes(" e ")).map((formula) => formula.name).sort(), ["Accelerare e Rallentare", "Aprire e Bloccare", "Benedire e Maledire", "Creare e Distruggere"]);
assert.equal(FORMULE_ALIAS.accelerare, "accelerare-e-rallentare");
assert.deepEqual(FORMULE_M6.find((formula) => formula.id === "guarire").thresholds, [{ base: 4, scopes: { potency: 3, impact: 1 } }]);
// I poteri: ognuno sta sotto la sua matrice, e la matrice lo elenca.
for (const power of POTERI) {
  const formula = FORMULE_M6.find((entry) => entry.id === power.formula);
  assert.ok(formula, `${power.id}: matrice ${power.formula}`);
  assert.ok(formula.powers.includes(power.id), `${power.id} non sta in ${formula.id}`);
}
assert.equal(POTERI.filter((power) => power.link === "proposta").length, 12);
// I poteri di rigenerazione stanno sotto Guarire (Riparare è per le cose, 24/9).
for (const id of ["rigenerazione", "tempra", "pisolino", "buona-forchetta", "chiodo-fisso"]) {
  assert.equal(POTERI.find((power) => power.id === id).formula, "guarire", id);
}
assert.deepEqual(POTERI.find((power) => power.id === "pila").formula, "riparare");

// Il dialogo del Grimorio si compila con le matrici dentro (la finta Foundry
// non lo apre): la vista per Formula, le scelte e i tasti ci sono.
Handlebars.registerHelper("localize", (key) => String(key));
Handlebars.registerHelper("eq", (a, b) => a === b);
Handlebars.registerHelper("gt", (a, b) => a > b);
const template = Handlebars.compile(readFileSync(new URL("../templates/dialogs/grimorio.hbs", import.meta.url), "utf8"));
const levels = { forces: 3, life: 2, matter: 1 };
const html = template({ groups: prepareGrimorio(levels), formule: prepareGrimorioFormule(levels), spheres: prepareGrimorioSpheres(levels), view: "formula", inSheet: true });
for (const marker of ['data-formula="guarire"', 'data-role="formulaAccess" value="life"', 'data-role="formulaAmalgam" value="matter"', 'data-role="formulaSave"', 'data-role="formulaRoll"', 'data-formula="annientare"', 'data-role="formulaThreshold" value="1"', "WOD5E_MAGE.Grimorio.NoAccess", "wod5e-mage-matrice-sfera-riga lit", "Pronto soccorso"]) {
  assert.ok(html.includes(marker), `manca ${marker}`);
}
// Guarire ha due Sfere d'Accesso e il personaggio ne ha una sola: la scelta è già fatta.
assert.match(html, /data-role="formulaAccess" value="life" checked/);
// Dal tiro (fuori dalla scheda) c'è solo «Scegli».
const dalTiro = template({ groups: [], formule: prepareGrimorioFormule(levels), spheres: [], view: "formula", inSheet: false });
assert.ok(dalTiro.includes('data-role="formulaPick"') && !dalTiro.includes('data-role="formulaSave"'));
console.log("Matrici e catalogo dei poteri: test passati.");
