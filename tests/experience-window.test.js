import assert from "node:assert/strict";
import { experienceCost } from "../scripts/experience-window.js";

// L'esempio scritto nel manuale: Attributo da 2 a 3 = 4 × 3 = 12.
assert.equal(experienceCost("attribute", 2, 3).total, 12);
// Sfera d'Affinità da 3 a 4 = 4 × 5.
assert.equal(experienceCost("affinitySphere", 3, 4).total, 20);
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

console.log("experience-window.test.js: 10 asserzioni superate");
