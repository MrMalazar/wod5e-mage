import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { compraPrice, compraState, renderCompraButton, renderBought } from "../scripts/compra.js";

// Comprare la riuscita a tiro fallito (11/9): il prezzo è la Sfera più alta.
assert.equal(compraPrice({ sphereMax: 3 }), 3);
assert.equal(compraPrice({}), 0);

// Il tasto: solo ramo C, tiro fallito, con una Sfera; acceso se la Quintessenza basta.
assert.deepEqual(compraState({ total: 0, difficulty: 1, ramo: "C", sphereMax: 3, quintessence: 5 }), { show: true, enabled: true, price: 3, quintessence: 5 });
assert.deepEqual(compraState({ total: 0, difficulty: 1, ramo: "C", sphereMax: 3, quintessence: 2 }), { show: true, enabled: false, price: 3, quintessence: 2 });
assert.equal(compraState({ total: 1, difficulty: 1, ramo: "C", sphereMax: 3, quintessence: 5 }).show, false);
assert.equal(compraState({ total: 0, difficulty: 1, ramo: "A", sphereMax: 3, quintessence: 5 }).show, false);
assert.equal(compraState({ total: 0, difficulty: 1, ramo: "C", sphereMax: 0, quintessence: 5 }).show, false);
for (const flag of ["forced", "priced", "burst", "automatic", "skill"]) {
  assert.equal(compraState({ total: 0, difficulty: 1, ramo: "C", sphereMax: 2, quintessence: 5, [flag]: true }).show, false, flag);
}

const localize = (key) => key.split(".").pop();
const format = (key, data) => `${key.split(".").pop()}:${JSON.stringify(data)}`;
const on = renderCompraButton({ show: true, enabled: true, price: 2, quintessence: 4 }, localize, format);
assert.match(on, /data-compra="go"/);
assert.doesNotMatch(on, /disabled/);
assert.match(on, /Button <b>−2<\/b>/);
assert.match(renderCompraButton({ show: true, enabled: false, price: 2, quintessence: 1 }, localize, format), /disabled[^>]*title="HintPoor/);
assert.match(renderBought({ price: 2 }, format, localize), /wod5e-mage-roll-note-compra[\s\S]*Done:\{"price":2\}/);

// La finestra dell'Areté ha il tasto vivo col conto, e main lo registra.
const dialog = readFileSync(new URL("../templates/dialogs/arete-roll.hbs", import.meta.url), "utf8");
assert.match(dialog, /data-role="buySuccess"[\s\S]*data-role="buyPrice"/);
assert.match(readFileSync(new URL("../scripts/arete.js", import.meta.url), "utf8"), /buyButton\.disabled = quintessenceMax < sphereMax/);
assert.match(readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8"), /registerCompra\(\)/);

console.log("Compra la riuscita: test passati.");
