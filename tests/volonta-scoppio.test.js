import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { burstDamage, paradoxAfterBurst } from "../scripts/paradox-burst.js";
import { pickRerollDice, recountCard, systemTotal, volontaState, REROLL_MAX, AGGRAVATED_BONUS } from "../scripts/volonta.js";
import { saluteWithDamage } from "../scripts/salute.js";
import { getMagickBalance, getParadoxFloor } from "../scripts/magick-balance.js";

// Lo Scoppio: danni pari alla soglia, ogni due 10 un aggravato, la Ruota scarica.
assert.deepEqual(burstDamage({ eyes: 0, tens: 0, threshold: 5 }), { total: 0, pa: 0, ps: 0 });
assert.deepEqual(burstDamage({ eyes: 1, tens: 0, threshold: 4 }), { total: 4, pa: 0, ps: 4 });
assert.deepEqual(burstDamage({ eyes: 3, tens: 2, threshold: 4 }), { total: 4, pa: 1, ps: 3 });
assert.deepEqual(burstDamage({ eyes: 4, tens: 4, threshold: 1 }), { total: 1, pa: 1, ps: 0 });
assert.equal(paradoxAfterBurst(6, 4, 0), 2);
assert.equal(paradoxAfterBurst(6, 9, 3), 3);
assert.equal(paradoxAfterBurst(2, 0, 0), 2);

// Il pavimento della Ruota somma il permanente scritto e i blocchi delle Magick in atto.
const actor = {
  getFlag: (_m, key) => ({
    magickBalance: { quintessence: 5, paradox: 0 },
    persistentMagickResources: { permanentParadox: 1 },
    ongoingMagick: { a: { lock: 1, vulgar: true }, b: { lock: 0 } }
  })[key]
};
assert.equal(getParadoxFloor(actor), 2);
assert.deepEqual(getMagickBalance(actor), { quintessence: 5, paradox: 2, floor: 2 });

// La Volontà: si ritirano i falliti più bassi, mai i rossi, al massimo tre.
const dice = [{ result: 7 }, { result: 2 }, { result: 5 }, { result: 1, discarded: true }, { result: 3 }, { result: 4 }];
assert.deepEqual(pickRerollDice(dice, 1), [1]);
assert.deepEqual(pickRerollDice(dice, 2), [1, 4]);
assert.deepEqual(pickRerollDice(dice, 3), [1, 4, 5]);
assert.deepEqual(pickRerollDice(dice, 9), [1, 4, 5]);
assert.equal(REROLL_MAX, 3);
assert.equal(systemTotal([{ result: 10 }, { result: 6 }, { result: 2 }], [{ result: 10 }]), 5);
assert.equal(recountCard({ autoSuccesses: 2, volontaBonus: 2 }, [{ result: 8 }], []), 5);
assert.equal(AGGRAVATED_BONUS, 2);

// I tasti compaiono a tiro fallito (o senza soglia), una volta sola, mai sullo Scoppio.
assert.equal(volontaState({ total: 2, difficulty: 4, failedCount: 2 }).show, true);
assert.deepEqual(volontaState({ total: 2, difficulty: 4, failedCount: 2 }).options.map((o) => o.enabled), [true, true, false]);
assert.equal(volontaState({ total: 4, difficulty: 4, failedCount: 2 }).show, false);
assert.equal(volontaState({ total: 0, difficulty: 0, failedCount: 1 }).show, true);
assert.equal(volontaState({ total: 0, difficulty: 3, failedCount: 1, used: { kind: "reroll" } }).show, false);
assert.equal(volontaState({ total: 0, difficulty: 3, failedCount: 1, burst: true }).show, false);

// I danni sulla Salute, dentro il tracciato.
assert.deepEqual(saluteWithDamage({ pa: 0, ps: 1, ma: 0, ms: 0 }, 6, { ps: 3, pa: 1 }), { pa: 1, ps: 4, ma: 0, ms: 0 });
assert.deepEqual(saluteWithDamage({ pa: 0, ps: 0, ma: 0, ms: 0 }, 3, { ms: 1, ma: 1 }), { pa: 0, ps: 0, ma: 1, ms: 1 });

// La scheda: la parola PARADOSSO sulla Ruota è lo Scoppio; le righe delle Magick in atto portano i segni.
const ruota = readFileSync(new URL("../templates/actor/parts/ruota.hbs", import.meta.url), "utf8");
assert.equal((ruota.match(/data-action="paradoxBurst"/g) ?? []).length, 2);
assert.match(ruota, /magickTrack\.locked/);
const spheres = readFileSync(new URL("../templates/actor/parts/spheres.hbs", import.meta.url), "utf8");
assert.match(spheres, /wod5e-mage-ongoing-marks[\s\S]*row\.lock[\s\S]*row\.duration[\s\S]*row\.threshold/);
assert.doesNotMatch(spheres, /SphereSpecialties\.Slot/);
const main = readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8");
assert.match(main, /registerVolonta\(\)/);
const arete = readFileSync(new URL("../scripts/arete.js", import.meta.url), "utf8");
assert.match(arete, /export async function recordEffect[\s\S]*shouldRecordEffect\(\{ maintained, duration: effect\.duration \}\)/);
assert.match(arete, /lastThreshold/);

console.log("Volontà e Scoppio: test passati.");
