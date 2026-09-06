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
// Nei blocchi (6/9) «la via obbligata» segna la compagna necessaria, senza livello.
assert.deepEqual(proiettare.extras, [{ sphere: "prime", level: 1, required: true }]);
assert.equal(proiettare.pairings.find((pairing) => pairing.sphere === "prime").required, true);
const curvare = findEffetto("forces-2-curvare-la-luce-o-il-suono");
assert.equal(curvare.extras.length, 0);

// Si apre solo con le Sfere giuste: la principale al livello, le obbligatorie al loro.
assert.equal(effectAvailable(proiettare, { forces: 2 }), false);
assert.equal(effectAvailable(proiettare, { forces: 2, prime: 1 }), true);
assert.equal(effectAvailable(curvare, { forces: 2 }), true);
assert.equal(effectAvailable(curvare, { forces: 1 }), false);
assert.deepEqual(effectSphereLevels(proiettare), { forces: 2, prime: 1 });
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
// Variabile (6/9): il punto dispari cade a caso, sul fisico o sul mentale.
assert.deepEqual(ustioneSplit({ threshold: 5, tens: 4, kind: "variable", random: () => 0.1 }), { total: 5, applied: 5, pa: 2, ps: 1, ma: 0, ms: 2, kind: "variable" });
assert.deepEqual(ustioneSplit({ threshold: 5, tens: 4, kind: "variable", random: () => 0.9 }), { total: 5, applied: 5, pa: 2, ps: 0, ma: 0, ms: 3, kind: "variable" });
assert.deepEqual(ustioneSplit({ threshold: 4, tens: 0, kind: "variable", random: () => 0.9 }), { total: 4, applied: 4, pa: 0, ps: 2, ma: 0, ms: 2, kind: "variable" });

// La Salute: fisici da sinistra, mentali da destra.
assert.deepEqual(paintSalute({ pa: 1, ps: 1, ma: 1, ms: 2 }, 7), ["pa", "ps", "", "", "ms", "ms", "ma"]);
assert.deepEqual(paintSalute({ pa: 0, ps: 3, ma: 0, ms: 3 }, 5), ["ps", "ps", "ps", "ms", "ms"]);

// La carta porta Obiettivo ed Effetto; il dialogo li chiede sopra le Sfere, con la Quintessenza sotto l'Armonia.
const card = renderRollCard({ goal: "Invisibilità", effectKind: "WOD5E_MAGE.Arete.EffectKinds.physical", threshold: 2 }, (k) => k);
assert.match(card, /WOD5E_MAGE\.Arete\.Goal<\/b> Invisibilità[\s\S]*WOD5E_MAGE\.Arete\.EffectKind<\/b> WOD5E_MAGE\.Arete\.EffectKinds\.physical/);
const dialog = readFileSync(new URL("../templates/dialogs/arete-roll.hbs", import.meta.url), "utf8");
// L'Obiettivo sta sotto le Sfere Effetto e sopra gli Ambiti (6/9).
assert.match(dialog, /name="effectKind"[\s\S]*Arete\.Spheres[\s\S]*name="goal"[\s\S]*data-role="grimorioOpen"[\s\S]*Scopes\.Label[\s\S]*name="harmony"[\s\S]*name="quintessence"/);
const grimorioTemplate = readFileSync(new URL("../templates/dialogs/grimorio.hbs", import.meta.url), "utf8");
assert.match(grimorioTemplate, /data-role="grimorioSearch"[\s\S]*data-effetto="\{\{entry\.id\}\}"/);
const arete = readFileSync(new URL("../scripts/arete.js", import.meta.url), "utf8");
assert.match(arete, /const autoSuccesses = automatic_\.successes \+ quintessence;/);
assert.match(arete, /quintessence: Math\.max\(balanceBefore\.quintessence - quintessence, 0\)/);
assert.match(arete, /effectKind,\n\s+arete: arete\.value/);
const dice = readFileSync(new URL("../scripts/paradox-dice.js", import.meta.url), "utf8");
assert.match(dice, /applyUstione\(actor, \{ threshold: burn, tens, kind: effectKind \}\)/);

console.log("Grimorio, Ustione e Salute: test passati.");

// Il formato nuovo (6/9): Corrispondenza a blocchi, con le Sfere compagne e
// gli Ambiti consigliati; «Mappare la zona» ha assorbito «Cercare nell'area».
const corr = EFFETTI.filter((entry) => entry.sphere === "correspondence");
assert.equal(corr.length, 20);
const mappare = corr.find((entry) => entry.id === "correspondence-1-mappare-la-zona");
assert.equal(mappare.pairings.length, 8);
assert.equal(mappare.pairings[0].sphere, "entropy");
assert.match(mappare.scopes, /^Area per le dimensioni/);
assert.doesNotMatch(mappare.text, /Tutto questo, dal primo giorno/);
assert.equal(corr.find((entry) => entry.id === "correspondence-1-sapere-dove-sei").pairings[0].sphere, "entropy");
assert.equal(corr.some((entry) => entry.id === "correspondence-1-cercare-nell-area"), false);
// Entropia nel formato nuovo (6/9): ventiquattro blocchi, Pesare le probabilità
// assorbe Fiutare il pericolo, Sigillare un Giuramento chiude con gli Ambiti.
const entro = EFFETTI.filter((entry) => entry.sphere === "entropy");
assert.equal(entro.length, 24);
assert.equal(entro.some((entry) => entry.id === "entropy-1-fiutare-il-pericolo"), false);
assert.equal(entro.find((entry) => entry.id === "entropy-1-pesare-le-probabilita").pairings.length, 7);
assert.match(entro.find((entry) => entry.id === "entropy-5-sigillare-un-giuramento").scopes, /^Condizioni 1 per ogni clausola/);
assert.equal(entro.every((entry) => entry.pairings.length > 0 && entry.scopes), true);
// Forze nel formato nuovo (6/9): ventotto blocchi, tutti con compagne e Ambiti.
const forze = EFFETTI.filter((entry) => entry.sphere === "forces");
assert.equal(forze.length, 28);
assert.equal(forze.every((entry) => entry.pairings.length > 0 && entry.scopes), true);
assert.equal(forze.find((entry) => entry.id === "forces-3-telecinesi").pairings.length, 6);
// Materia nel formato nuovo (6/9): ventiquattro blocchi; «(obbligata)» nel nome segna la compagna necessaria.
const materia = EFFETTI.filter((entry) => entry.sphere === "matter");
assert.equal(materia.length, 24);
assert.equal(materia.every((entry) => entry.pairings.length > 0 && entry.scopes), true);
assert.deepEqual(materia.find((entry) => entry.id === "matter-4-innestare-la-macchina-nella-carne").extras.map((extra) => extra.sphere), ["life", "prime"]);
// Mente nel formato nuovo (6/9): venticinque blocchi.
const mente = EFFETTI.filter((entry) => entry.sphere === "mind");
assert.equal(mente.length, 25);
assert.equal(mente.every((entry) => entry.pairings.length > 0 && entry.scopes), true);
assert.deepEqual(mente.find((entry) => entry.id === "mind-4-mostrarti-in-corpo-di-luce").extras.map((extra) => extra.sphere), ["spirit", "prime"]);
// Primordio nel formato nuovo (6/9): ventisei blocchi.
const primordio = EFFETTI.filter((entry) => entry.sphere === "prime");
assert.equal(primordio.length, 26);
assert.equal(primordio.every((entry) => entry.pairings.length > 0 && entry.scopes), true);
assert.deepEqual(primordio.find((entry) => entry.id === "prime-3-rianimare-un-morto-recente").extras.map((extra) => extra.sphere), ["life", "spirit"]);
// Spirito nel formato nuovo (6/9): ventinove blocchi.
const spirito = EFFETTI.filter((entry) => entry.sphere === "spirit");
assert.equal(spirito.length, 29);
assert.equal(spirito.every((entry) => entry.pairings.length > 0 && entry.scopes), true);
assert.deepEqual(spirito.find((entry) => entry.id === "spirit-1-riconoscere-il-sovrannaturale").extras.map((extra) => extra.sphere), ["life"]);
// Tempo nel formato nuovo (6/9): ventuno blocchi.
const tempo = EFFETTI.filter((entry) => entry.sphere === "time");
assert.equal(tempo.length, 21);
assert.equal(tempo.every((entry) => entry.pairings.length > 0 && entry.scopes), true);
assert.deepEqual(tempo.find((entry) => entry.id === "time-4-avvertire-il-te-di-ieri").extras.map((extra) => extra.sphere), ["mind"]);
// Vita nel formato nuovo (6/9): ventiquattro blocchi. Tutte le nove Sfere sono a blocchi:
// ogni effetto ha gli Ambiti consigliati, e solo due di Corrispondenza stanno senza compagne.
const vita = EFFETTI.filter((entry) => entry.sphere === "life");
assert.equal(vita.length, 24);
assert.equal(vita.every((entry) => entry.pairings.length > 0 && entry.scopes), true);
assert.deepEqual(vita.find((entry) => entry.id === "life-3-animare-un-cadavere").extras.map((extra) => extra.sphere), ["prime"]);
assert.equal(EFFETTI.every((entry) => entry.scopes), true);
assert.equal(EFFETTI.filter((entry) => entry.pairings.length === 0).length, 2);
const grimorioIt = prepareGrimorio({ correspondence: 2 }, (k) => k);
const shown = grimorioIt[0].levels[1].entries.find((entry) => entry.name === "Marchiare un bersaglio");
assert.equal(shown.pairings.length, 5);
assert.match(shown.pairings[0].icon, /life\.png$/);
assert.match(readFileSync(new URL("../templates/dialogs/grimorio.hbs", import.meta.url), "utf8"), /wod5e-mage-grimorio-pairings[\s\S]*pairing\.icon[\s\S]*wod5e-mage-grimorio-scopes[\s\S]*Grimorio\.Scopes/);
