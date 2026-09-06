import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { EFFETTI } from "../scripts/data/effetti.js";
import { effectAvailable, effectSphereLevels, findEffetto, prepareGrimorio } from "../scripts/grimorio.js";
import { ustioneSplit, normalizeEffectKind } from "../scripts/paradox-burst.js";
import { paintSalute } from "../scripts/salute.js";
import { renderRollCard } from "../scripts/roll-card.js";

// Il Grimorio: le nove Sfere del manuale, livelli da 1 a 5, id unici.
assert.ok(EFFETTI.length > 200);
assert.equal(new Set(EFFETTI.map((e) => e.id)).size, EFFETTI.length);
assert.deepEqual([...new Set(EFFETTI.map((e) => e.sphere))].sort(), ["correspondence", "entropy", "forces", "life", "matter", "mind", "prime", "spirit", "time"]);
assert.ok(EFFETTI.every((e) => e.level >= 1 && e.level <= 5 && e.name && e.text));
const proiettare = findEffetto("forces-2-proiettare-luce-e-suono");
assert.deepEqual(proiettare.extras, [{ sphere: "prime", level: 2, required: true }]);
const curvare = findEffetto("forces-2-curvare-la-luce-o-il-suono");
assert.equal(curvare.extras[0].required, false);

// Si apre solo con le Sfere giuste: la principale al livello, le obbligatorie al loro.
assert.equal(effectAvailable(proiettare, { forces: 2 }), false);
assert.equal(effectAvailable(proiettare, { forces: 2, prime: 2 }), true);
assert.equal(effectAvailable(curvare, { forces: 2 }), true);
assert.equal(effectAvailable(curvare, { forces: 1 }), false);
assert.deepEqual(effectSphereLevels(proiettare), { forces: 2, prime: 2 });
assert.deepEqual(effectSphereLevels(curvare), { forces: 2 });

const grimorio = prepareGrimorio({ forces: 2, mind: 1 });
assert.deepEqual(grimorio.map((g) => g.sphere), ["forces", "mind"]);
assert.deepEqual(grimorio[0].levels.map((l) => l.level), [1, 2]);
assert.ok(grimorio[0].levels[1].entries.some((e) => e.id === curvare.id));
assert.ok(!grimorio[0].levels[1].entries.some((e) => e.id === proiettare.id));
assert.equal(prepareGrimorio({}).length, 0);

// L'Ustione va dove dice l'Effetto: fisico, mentale, metà e metà per difetto.
assert.equal(normalizeEffectKind("boh"), "");
assert.deepEqual(ustioneSplit({ threshold: 5, tens: 2, kind: "physical" }), { total: 5, applied: 5, pa: 1, ps: 4, ma: 0, ms: 0, kind: "physical" });
assert.deepEqual(ustioneSplit({ threshold: 5, tens: 0, kind: "" }), { total: 5, applied: 5, pa: 0, ps: 5, ma: 0, ms: 0, kind: "" });
assert.deepEqual(ustioneSplit({ threshold: 4, tens: 3, kind: "mental" }), { total: 4, applied: 4, pa: 0, ps: 0, ma: 1, ms: 3, kind: "mental" });
assert.deepEqual(ustioneSplit({ threshold: 5, tens: 4, kind: "variable" }), { total: 5, applied: 4, pa: 2, ps: 0, ma: 0, ms: 2, kind: "variable" });

// La Salute: fisici da sinistra, mentali da destra.
assert.deepEqual(paintSalute({ pa: 1, ps: 1, ma: 1, ms: 2 }, 7), ["pa", "ps", "", "", "ms", "ms", "ma"]);
assert.deepEqual(paintSalute({ pa: 0, ps: 3, ma: 0, ms: 3 }, 5), ["ps", "ps", "ps", "ms", "ms"]);

// La carta porta Obiettivo ed Effetto; il dialogo li chiede sopra le Sfere, con la Quintessenza sotto l'Armonia.
const card = renderRollCard({ goal: "Invisibilità", effectKind: "WOD5E_MAGE.Arete.EffectKinds.physical", threshold: 2 }, (k) => k);
assert.match(card, /WOD5E_MAGE\.Arete\.Goal<\/b> Invisibilità[\s\S]*WOD5E_MAGE\.Arete\.EffectKind<\/b> WOD5E_MAGE\.Arete\.EffectKinds\.physical/);
const dialog = readFileSync(new URL("../templates/dialogs/arete-roll.hbs", import.meta.url), "utf8");
assert.match(dialog, /name="harmony"[\s\S]*name="quintessence"[\s\S]*name="goal"[\s\S]*data-role="grimorioOpen"[\s\S]*name="effectKind"[\s\S]*Arete\.Spheres/);
const grimorioTemplate = readFileSync(new URL("../templates/dialogs/grimorio.hbs", import.meta.url), "utf8");
assert.match(grimorioTemplate, /data-role="grimorioSearch"[\s\S]*data-effetto="\{\{entry\.id\}\}"/);
const arete = readFileSync(new URL("../scripts/arete.js", import.meta.url), "utf8");
assert.match(arete, /const autoSuccesses = automatic_\.successes \+ quintessence;/);
assert.match(arete, /quintessence: Math\.max\(balanceBefore\.quintessence - quintessence, 0\)/);
assert.match(arete, /effectKind,\n\s+arete: arete\.value/);
const dice = readFileSync(new URL("../scripts/paradox-dice.js", import.meta.url), "utf8");
assert.match(dice, /applyUstione\(actor, \{ threshold: burn, tens, kind: effectKind \}\)/);

console.log("Grimorio, Ustione e Salute: test passati.");
