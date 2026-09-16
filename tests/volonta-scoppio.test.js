import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { burstDamage, paradoxAfterBurst } from "../scripts/paradox-burst.js";
import { pickRerollDice, recountCard, rerollableDice, renderRerollButton, renderUsed, systemTotal, volontaState, REROLL_MAX } from "../scripts/volonta.js";
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
// Nel ramo C (11/9) è fallito anche il 7.
const dice = [{ result: 7 }, { result: 2 }, { result: 5 }, { result: 1, discarded: true }, { result: 3 }, { result: 4 }];
assert.deepEqual(pickRerollDice(dice, 1), [1]);
assert.deepEqual(pickRerollDice(dice, 2), [1, 4]);
assert.deepEqual(pickRerollDice(dice, 3), [1, 4, 5]);
assert.deepEqual(pickRerollDice(dice, 9), [1, 4, 5]);
assert.equal(REROLL_MAX, 3);
// Il giocatore sceglie (6/9): i bianchi falliti e i rossi falliti; dall'11/9
// anche il rosso che ha fatto 1 (l'occhio resta), mai il 10 (è un successo).
assert.deepEqual(rerollableDice(dice, [{ result: 1 }, { result: 10 }, { result: 3 }, { result: 8 }, { result: 4, discarded: true }]), [
  { kind: "basic", index: 0 }, { kind: "basic", index: 1 }, { kind: "basic", index: 2 }, { kind: "basic", index: 4 }, { kind: "basic", index: 5 },
  { kind: "paradox", index: 0 }, { kind: "paradox", index: 2 }
]);
// L'occhio già uscito resta anche dopo il ritiro: il codice non tocca un'ustione esistente, la aggiorna solo nei conti.
assert.match(readFileSync(new URL("../scripts/volonta.js", import.meta.url), "utf8"), /if \(!card\.ustione\) \{[\s\S]*\} else if \(!card\.ustione\.choice\) \{/);
assert.equal(volontaState({ total: 2, difficulty: 4, failedCount: 5 }).max, 3);
assert.equal(volontaState({ total: 2, difficulty: 4, failedCount: 1 }).max, 1);
const volontaSource = readFileSync(new URL("../scripts/volonta.js", import.meta.url), "utf8");
assert.match(volontaSource, /wod5e-mage-volonta-pick[\s\S]*picked\.length < state\.max[\s\S]*rerollDice\(message, actor, picked\.slice\(\)\)/);
assert.match(volontaSource, /kind === "paradox" && \(result\.result === 1 \|\| result\.result === 10\)/);
assert.equal(systemTotal([{ result: 10 }, { result: 6 }, { result: 2 }], [{ result: 10 }]), 5);
assert.equal(recountCard({ autoSuccesses: 2 }, [{ result: 8 }], []), 3);
// L'aggravato che comprava due successi non esiste più (Blue, 10/9 notte): né nel codice né nelle lingue.
assert.doesNotMatch(volontaSource, /AGGRAVATED_BONUS|spendAggravated|volontaBonus|data-volonta="aggravato"|Volonta\.Aggravated/);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8"));
  for (const key of ["Aggravated", "AggravatedHint", "UsedAggravated", "AggravatedDone"]) assert.equal(strings.WOD5E_MAGE.Volonta[key], undefined, `${lang} ${key} tolta`);
  for (const key of ["Label", "Reroll", "RerollHint", "NoDice", "PickFirst", "UsedReroll", "RerollDone", "RerollEyes"]) assert.equal(typeof strings.WOD5E_MAGE.Volonta[key], "string", `${lang} ${key}`);
}
assert.equal(renderUsed({ kind: "aggravato", bonus: 2 }, (k) => k), "", "i messaggi vecchi con l'aggravato non scrivono più niente");
assert.match(renderUsed({ kind: "reroll", dice: 2, eyes: 1 }, (k, d) => `${k}:${JSON.stringify(d)}`), /^<p class="wod5e-mage-roll-note wod5e-mage-roll-note-volonta">WOD5E_MAGE\.Volonta\.UsedReroll:\{"dice":2\} WOD5E_MAGE\.Volonta\.RerollEyes:\{"eyes":1\}<\/p>$/);
// Il tasto nella fila dei tre: «Ritira con Volontà 0/3», spento finché non si sceglie un dado.
assert.equal(renderRerollButton({ show: true, max: 3 }, (k) => k), '<button type="button" class="wod5e-mage-roll-action wod5e-mage-volonta-reroll" data-volonta="reroll" title="WOD5E_MAGE.Volonta.RerollHint">WOD5E_MAGE.Volonta.Reroll <small><b data-role="picked">0</b>/3</small></button>');
assert.match(renderRerollButton({ show: true, max: 0 }, (k) => k), /data-volonta="reroll" disabled title="WOD5E_MAGE\.Volonta\.NoDice"/);
assert.match(volontaSource, /if \(!picked\.length\) return ui\.notifications\.warn\(game\.i18n\.localize\("WOD5E_MAGE\.Volonta\.PickFirst"\)\);/);

// I tasti compaiono a tiro fallito (o senza soglia), una volta sola, mai sullo Scoppio.
assert.deepEqual(volontaState({ total: 2, difficulty: 4, failedCount: 2 }), { show: true, max: 2 });
assert.deepEqual(volontaState({ total: 2, difficulty: 4, failedCount: 0 }), { show: true, max: 0 }, "senza dadi da ritirare il tasto c'è, spento");
assert.equal(volontaState({ total: 4, difficulty: 4, failedCount: 2 }).show, false);
assert.equal(volontaState({ total: 0, difficulty: 0, failedCount: 1 }).show, true);
assert.equal(volontaState({ total: 0, difficulty: 3, failedCount: 1, used: { kind: "reroll" } }).show, false);
assert.equal(volontaState({ total: 0, difficulty: 3, failedCount: 1, burst: true }).show, false);

// I danni sulla Salute, dentro il tracciato.
assert.deepEqual(saluteWithDamage({ pa: 0, ps: 1, ma: 0, ms: 0 }, 6, { ps: 3, pa: 1 }), { pa: 1, ps: 4, ma: 0, ms: 0 });
assert.deepEqual(saluteWithDamage({ pa: 0, ps: 0, ma: 0, ms: 0 }, 3, { ms: 1, ma: 1 }), { pa: 0, ps: 0, ma: 1, ms: 1 });

// La scheda: la parola PARADOSSO sulla Ruota è lo Scoppio; le righe delle Magick in atto portano i segni.
const ruota = readFileSync(new URL("../templates/actor/parts/stat-risorse.hbs", import.meta.url), "utf8");
assert.equal((ruota.match(/data-action="paradoxBurst"/g) ?? []).length, 1, "la parola PARADOSSO nel conto sotto la Ruota (16/9)");
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
