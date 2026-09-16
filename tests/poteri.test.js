import assert from "node:assert/strict";
import {
  applyPotere,
  findPotere,
  POTERE_DOTS,
  POTERE_EFFECTS,
  POTERI,
  POTERI_PER_PALLINO,
  potereId,
  potereLabel,
  poteriOf,
  poteriSegnaposto
} from "../scripts/poteri.js";
import { SPHERES } from "../scripts/spheres.js";

// Novanta segnaposto: nove Sfere, cinque pallini, due posti l'uno.
assert.equal(POTERI_PER_PALLINO, 2);
assert.equal(POTERE_DOTS, 5);
assert.equal(POTERI.length, 90);
assert.equal(new Set(POTERI.map((power) => power.id)).size, 90, "gli id sono unici");
assert.deepEqual(POTERE_EFFECTS, ["threshold", "dice", "successFrom"]);
for (const sphere of SPHERES) {
  assert.equal(POTERI.filter((power) => power.sphere === sphere).length, 10);
}
assert.deepEqual(POTERI[0], { id: "correspondence-1-1", sphere: "correspondence", dot: 1, slot: 1, name: "", text: "", effects: [] });
assert.equal(potereId("forces", 3, 2), "forces-3-2");
assert.equal(poteriSegnaposto(["forces"]).length, 10);
assert.equal(findPotere("forces-3-2").dot, 3);
assert.equal(findPotere("forces-9-9"), null);

// Un personaggio ha i poteri delle Sfere che possiede, fino al pallino raggiunto.
const owned = poteriOf({ forces: 3, mind: 1, spirit: 0 });
assert.equal(owned.length, 6 + 2);
assert.deepEqual(owned.filter((power) => power.sphere === "forces").map((power) => power.dot), [1, 1, 2, 2, 3, 3]);
assert.equal(owned.some((power) => power.sphere === "spirit"), false);
assert.deepEqual(poteriOf({}), []);
// L'ordine delle Sfere si può imporre (quello alfabetico della lingua, per esempio).
assert.deepEqual(poteriOf({ forces: 1, mind: 1 }, { order: ["mind", "forces"] }).map((power) => power.sphere), ["mind", "mind", "forces", "forces"]);

// Il nome: quello scritto, oppure «Sfera pallino · posto» per un segnaposto.
const localize = (key) => ({ "WOD5E_MAGE.Spheres.forces": "Forze" }[key] ?? key);
assert.equal(potereLabel(findPotere("forces-3-2"), localize), "Forze 3 · 2");
assert.equal(potereLabel({ ...findPotere("forces-3-2"), name: "Dono della forza" }, localize), "Dono della forza");
assert.equal(potereLabel(null, localize), "");

// Gli effetti sul conto: soglia (mai sotto zero), dadi, riuscita da. Un segnaposto non tocca niente.
const conto = { threshold: 5, dice: 0, difficulty: null };
assert.deepEqual(applyPotere(conto, findPotere("forces-1-1")), { threshold: 5, dice: 0, difficulty: null, notes: [] });
const sconto = { ...findPotere("forces-2-1"), effects: [{ on: "threshold", value: -2 }, { on: "dice", value: 1 }] };
assert.deepEqual(applyPotere(conto, sconto), { threshold: 3, dice: 1, difficulty: null, notes: [{ on: "threshold", value: -2 }, { on: "dice", value: 1 }] });
assert.equal(applyPotere({ threshold: 1 }, { effects: [{ on: "threshold", value: -4 }] }).threshold, 0);
assert.equal(applyPotere(conto, { effects: [{ on: "successFrom", value: 8 }] }).difficulty, 8);
assert.equal(applyPotere(conto, { effects: [{ on: "successFrom", value: 0 }] }).difficulty, null);
assert.equal(applyPotere(conto, { effects: [{ on: "altro", value: 3 }] }).threshold, 5, "un gancio sconosciuto non fa niente");
assert.deepEqual(applyPotere(undefined, null), { threshold: 0, dice: 0, difficulty: null, notes: [] });

console.log("poteri: ok");
