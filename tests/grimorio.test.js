import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { EFFETTI } from "../scripts/data/effetti.js";
import { effectAvailable, effectSphereLevels, findEffetto, prepareGrimorio, splitScopes } from "../scripts/grimorio.js";
import { ustioneSplit, normalizeEffectKind } from "../scripts/paradox-burst.js";
import { paintSalute } from "../scripts/salute.js";
import { renderRollCard } from "../scripts/roll-card.js";

// Il Grimorio: le nove Sfere del manuale, livelli da 1 a 5, id unici.
assert.ok(EFFETTI.length > 200);
assert.equal(new Set(EFFETTI.map((e) => e.id)).size, EFFETTI.length);
assert.deepEqual([...new Set(EFFETTI.map((e) => e.sphere))].sort(), ["correspondence", "entropy", "forces", "life", "matter", "mind", "prime", "spirit", "time"]);
assert.ok(EFFETTI.every((e) => e.level >= 1 && e.level <= 5 && e.name && e.text));
const proiettare = findEffetto("forces-2-proiettare-luce-e-suono");
// Nei blocchi (6/9) «(diretta)» segna la compagna che fa il lavoro diretto, senza livello.
assert.deepEqual(proiettare.extras, [{ sphere: "prime", level: 1, required: true }]);
assert.equal(proiettare.pairings.find((pairing) => pairing.sphere === "prime").required, true);
const curvare = findEffetto("forces-2-curvare-la-luce-o-il-suono");
assert.equal(curvare.extras.length, 0);

// Si apre con la Sfera che lo porta: la compagna diretta non chiude la porta (regola del ponte).
assert.equal(effectAvailable(proiettare, { forces: 2 }), true);
assert.equal(effectAvailable(proiettare, { forces: 2, prime: 1 }), true);
assert.equal(effectAvailable(curvare, { forces: 2 }), true);
assert.equal(effectAvailable(curvare, { forces: 1 }), false);
assert.deepEqual(effectSphereLevels(proiettare), { forces: 2, prime: 1 });
assert.deepEqual(effectSphereLevels(curvare), { forces: 2 });

const grimorio = prepareGrimorio({ forces: 2, mind: 1 });
assert.deepEqual(grimorio.map((g) => g.sphere), ["forces", "mind"]);
assert.deepEqual(grimorio[0].levels.map((l) => l.level), [1, 2]);
assert.ok(grimorio[0].levels[1].entries.some((e) => e.id === curvare.id));
assert.ok(grimorio[0].levels[1].entries.some((e) => e.id === proiettare.id));
assert.deepEqual(grimorio[0].levels[1].entries.find((e) => e.id === proiettare.id).missing, ["WOD5E_MAGE.Spheres.prime"]);
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
assert.equal(corr.length, 22);
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
assert.equal(entro.find((entry) => entry.id === "entropy-1-pesare-le-probabilita").pairings.length, 6);
assert.match(entro.find((entry) => entry.id === "entropy-5-sigillare-un-giuramento").scopes, /^Condizioni 1 per ogni clausola/);
assert.equal(entro.every((entry) => entry.pairings.length > 0 && entry.scopes), true);
// Forze nel formato nuovo (6/9): ventotto blocchi, tutti con compagne e Ambiti.
const forze = EFFETTI.filter((entry) => entry.sphere === "forces");
assert.equal(forze.length, 29);
assert.equal(forze.every((entry) => entry.pairings.length > 0 && entry.scopes), true);
assert.equal(forze.find((entry) => entry.id === "forces-3-telecinesi").pairings.length, 5);
// Materia nel formato nuovo (6/9): ventiquattro blocchi; «(obbligata)» nel nome segna la compagna necessaria.
const materia = EFFETTI.filter((entry) => entry.sphere === "matter");
assert.equal(materia.length, 25);
assert.equal(materia.every((entry) => entry.pairings.length > 0 && entry.scopes), true);
assert.deepEqual(materia.find((entry) => entry.id === "matter-4-innestare-la-macchina-nella-carne").extras.map((extra) => extra.sphere), ["life", "prime"]);
assert.equal(materia.some((entry) => entry.id === "matter-2-invecchiare-un-oggetto"), false);
assert.equal(materia.some((entry) => entry.id === "matter-3-rimodellare"), true);
// Mente nel formato nuovo (6/9): venticinque blocchi.
const mente = EFFETTI.filter((entry) => entry.sphere === "mind");
assert.equal(mente.length, 29);
assert.equal(mente.every((entry) => entry.pairings.length > 0 && entry.scopes), true);
assert.deepEqual(mente.find((entry) => entry.id === "mind-4-mostrarti-in-corpo-di-luce").extras.map((extra) => extra.sphere), ["spirit", "prime"]);
// Primordio nel formato nuovo (6/9): ventisei blocchi.
const primordio = EFFETTI.filter((entry) => entry.sphere === "prime");
assert.equal(primordio.length, 24);
assert.equal(primordio.every((entry) => entry.pairings.length > 0 && entry.scopes), true);
assert.equal(primordio.some((entry) => entry.id === "prime-3-rianimare-un-morto-recente"), false);
// Spirito nel formato nuovo (6/9): ventinove blocchi.
const spirito = EFFETTI.filter((entry) => entry.sphere === "spirit");
assert.equal(spirito.length, 30);
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
assert.equal(vita.length, 22);
assert.equal(vita.every((entry) => entry.pairings.length > 0 && entry.scopes), true);
assert.deepEqual(vita.find((entry) => entry.id === "life-3-animare-un-cadavere").extras.map((extra) => extra.sphere), ["prime"]);
assert.equal(EFFETTI.every((entry) => entry.scopes), true);
assert.equal(EFFETTI.filter((entry) => entry.pairings.length === 0).length, 2);
// Una copia sola per effetto (verdetto di Blue, 6/9), tranne le vie volute: Addormentare (Mente, Vita), Rendere permanente il mutamento (Materia, Vita), Riconoscere il sovrannaturale (Mente, Spirito).
const perNome = new Map();
for (const entry of EFFETTI) perNome.set(entry.name, (perNome.get(entry.name) ?? 0) + 1);
assert.deepEqual([...perNome].filter(([, n]) => n > 1).map(([name]) => name).sort(), ["Addormentare", "Rendere permanente il mutamento", "Riconoscere il sovrannaturale"]);
// Il giocatore vede solo le compagne che ha (verdetto di Blue, 6/9), e gli
// Ambiti consigliati una riga per Ambito.
const grimorioIt = prepareGrimorio({ correspondence: 2, life: 1, matter: 1 }, (k) => k);
const shown = grimorioIt[0].levels[1].entries.find((entry) => entry.name === "Marchiare un bersaglio");
assert.deepEqual(shown.pairings.map((pairing) => pairing.label), ["WOD5E_MAGE.Spheres.life", "WOD5E_MAGE.Spheres.matter"]);
assert.match(shown.pairings[0].icon, /life\.png$/);
assert.equal(Array.isArray(shown.scopes), true);
assert.equal(shown.scopes.length, 3);
// Le quattro compagne generali (Corrispondenza, Spirito, Tempo, Entropia) sono regole nel LIBRO: nelle tavole restano solo quando dicono di più.
assert.equal(EFFETTI.filter((entry) => entry.pairings.some((pairing) => pairing.sphere === "correspondence" && /non vedi\.$/.test(pairing.text))).length, 0);
assert.match(shown.scopes[0], /^Durata per quanto canta il marchio/);
assert.deepEqual(splitScopes("Area per un campo, un giardino, un raccolto. Durata per quanto dura. Potenza (danni) se la malattia ferisce. Condizioni (malus 2, ostacolare) per quanto pesa."), ["Area per un campo, un giardino, un raccolto.", "Durata per quanto dura.", "Potenza (danni) se la malattia ferisce.", "Condizioni (malus 2, ostacolare) per quanto pesa."]);
assert.deepEqual(prepareGrimorio({ correspondence: 2 }, (k) => k)[0].levels[1].entries.find((entry) => entry.name === "Marchiare un bersaglio").pairings, []);
assert.match(readFileSync(new URL("../templates/dialogs/grimorio.hbs", import.meta.url), "utf8"), /wod5e-mage-grimorio-pairings[\s\S]*pairing\.icon[\s\S]*wod5e-mage-grimorio-scopes[\s\S]*Grimorio\.Scopes/);
