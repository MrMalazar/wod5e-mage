import assert from "node:assert/strict";
import { experienceCost, prepareExperiencePage } from "../scripts/experience-window.js";

// L'esempio scritto nel manuale: Attributo da 2 a 3 = 4 × 3 = 12.
assert.equal(experienceCost("attribute", 2, 3).total, 12);
// Sfera d'Affinità da 3 a 4 = 4 × 5.
// Abilità da 2 a 3 = 3 × 2.
assert.equal(experienceCost("skill", 2, 3).total, 6);
// Abilità nuova fino a 3: 3 + 4 + 6.
assert.equal(experienceCost("skill", 0, 3).total, 13);
// Sfera nuova fino a 2: 8 + 14.
assert.equal(experienceCost("sphere", 0, 2).total, 22);
// Areté da 2 a 3 = 3 × 10.
assert.equal(experienceCost("arete", 2, 3).total, 30);
// Nessun passo indietro, nessun costo.
assert.deepEqual(experienceCost("attribute", 3, 3), { total: 0, steps: [] });
assert.deepEqual(experienceCost("attribute", 3, 1), { total: 0, steps: [] });
// Il dettaglio pallino per pallino serve alla finestra.
assert.deepEqual(experienceCost("skill", 0, 2).steps, [{ dot: 1, cost: 3 }, { dot: 2, cost: 4 }]);
assert.throws(() => experienceCost("inesistente", 1, 2));

// La pagina in scheda: la Spesa è la somma del registro, il resto è resto.
globalThis.game = globalThis.game ?? { i18n: { localize: (key) => key } };
const page = prepareExperiencePage({
  system: {},
  getFlag: (_m, key) => {
    if (key === "experienceGains") return { g1: { cost: 20, when: "inizio" }, g2: { cost: "10", when: "sessione 2" } };
    if (key === "experienceLog") return { a: { cost: "12", what: "Forza 2 -> 3" }, b: { cost: 5.9, what: "" } };
    return undefined;
  }
});
assert.equal(page.total, 30);
assert.equal(page.gains.length, 2);
assert.equal(page.spent, 17);
assert.equal(page.remaining, 13);
assert.equal(page.log.length, 2);
// Sette tipi: via la Volontà (tracciato unico) e la Sfera affine (Specialità).
assert.equal(page.rows.length, 7);

console.log("experience-window.test.js: pagina e 10 asserzioni superate");
