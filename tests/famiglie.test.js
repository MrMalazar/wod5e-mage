import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  alphabetical,
  chosenCredoSpheres,
  CREDO_SPHERES,
  credoSphereBadges,
  credoFamilySphere,
  credoSpheresFor,
  FAMIGLIE,
  findFamiglia,
  findSottofamiglia,
  isBlankNote,
  isFreeCredo,
  lineageSphereChanges,
  lineageSpheres,
  prepareCredoSphereChoices,
  prepareLineageChoices
} from "../scripts/famiglie.js";
import { SPHERES } from "../scripts/spheres.js";
import { FOCUS_CREDOS } from "../scripts/focus.js";

// Nove Tradizioni con quattro sette l'una, dieci Craft senza sette.
const tradizioni = FAMIGLIE.filter((famiglia) => famiglia.fazione === "tradizioni");
const craft = FAMIGLIE.filter((famiglia) => famiglia.fazione === "disparati");
assert.equal(tradizioni.length, 9);
assert.equal(craft.length, 10);
assert.ok(tradizioni.every((famiglia) => famiglia.sottofamiglie.length === 4));
assert.ok(craft.every((famiglia) => famiglia.sottofamiglie.length === 0));
// Le nove Sfere comuni delle Tradizioni sono nove Sfere diverse.
assert.deepEqual(tradizioni.map((famiglia) => famiglia.sphere).sort(), [...SPHERES].sort());
for (const famiglia of FAMIGLIE) {
  assert.ok(famiglia.sphere === "" || SPHERES.includes(famiglia.sphere), famiglia.id);
  for (const sub of famiglia.sottofamiglie) assert.ok(SPHERES.includes(sub.sphere), sub.id);
}
assert.equal(findFamiglia("hollow").sphere, "");
assert.equal(findSottofamiglia("hermes", "verdicta").sphere, "mind");
assert.equal(findSottofamiglia("verbena", "verdicta"), null);

// Ogni Credo della tendina ha la sua riga; Potere e Scienza sono sciolti.
assert.deepEqual(Object.keys(CREDO_SPHERES).sort(), [...FOCUS_CREDOS].sort());
assert.deepEqual(CREDO_SPHERES.arte, ["matter", "mind"]);
assert.deepEqual(CREDO_SPHERES.potere, []);

// Famiglia e Sottofamiglia a 1, il Credo di sola presenza (senza doppioni).
assert.deepEqual(lineageSpheres({ famiglia: "hermes", sottofamiglia: "verdicta", credo: "arte" }), { dotted: ["forces", "mind"], present: ["matter"] });
assert.deepEqual(lineageSpheres({ famiglia: "hollow" }), { dotted: [], present: [] });

// Il diff dell'update: scegliere la Famiglia sblocca la sua Sfera di famiglia a 1.
const empty = { lineage: {}, credo: "", spheres: {} };
assert.deepEqual(
  lineageSphereChanges(empty, { flags: { "wod5e-mage": { lineage: { famiglia: "hermes" } } } }),
  { selectedSpheres: { forces: true }, familySpheres: { forces: true }, spheres: { forces: 1 } }
);
// Con un pallino già messo, il valore non si tocca.
assert.deepEqual(
  lineageSphereChanges({ ...empty, spheres: { forces: 3 } }, { flags: { "wod5e-mage": { lineage: { famiglia: "hermes" } } } }),
  { selectedSpheres: { forces: true }, familySpheres: { forces: true } }
);
// La Sottofamiglia di un'altra Famiglia si azzera quando cambia la Famiglia; le
// Sfere di prima (Forze di Hermes, Mente di Verdicta) perdono il segno di famiglia
// e, con solo il pallino regalato, si spengono e tornano bloccate (9/9).
assert.deepEqual(
  lineageSphereChanges({ ...empty, lineage: { famiglia: "hermes", sottofamiglia: "verdicta" }, spheres: { forces: 1, mind: 1 } }, { flags: { "wod5e-mage": { lineage: { famiglia: "verbena" } } } }),
  { lineage: { sottofamiglia: "" }, selectedSpheres: { forces: false, mind: false, life: true }, familySpheres: { forces: false, mind: false, life: true }, spheres: { forces: 0, mind: 0, life: 1 } }
);
// I pallini comprati restano: Forze a 3 resta accesa e sbloccata, perde solo il segno di famiglia.
assert.deepEqual(
  lineageSphereChanges({ ...empty, lineage: { famiglia: "hermes" }, spheres: { forces: 3 } }, { flags: { "wod5e-mage": { lineage: { famiglia: "verbena" } } } }),
  { selectedSpheres: { life: true }, familySpheres: { forces: false, life: true }, spheres: { life: 1 } }
);
// Cambia solo la Sottofamiglia: via la Sfera della vecchia, dentro quella della nuova.
assert.deepEqual(
  lineageSphereChanges({ ...empty, lineage: { famiglia: "hermes", sottofamiglia: "verdicta" }, spheres: { forces: 1, mind: 1 } }, { flags: { "wod5e-mage": { lineage: { famiglia: "hermes", sottofamiglia: "quaesitor" } } } }),
  { selectedSpheres: { mind: false, correspondence: true }, familySpheres: { mind: false, correspondence: true }, spheres: { mind: 0, correspondence: 1 } }
);
// Cambia il Credo: le due Sfere del vecchio Credo tornano bloccate se erano di sola presenza;
// le due nuove si sbloccano, e di famiglia è solo quella scelta (11/9: nessuna, finché non si clicca).
{
  const cambio = lineageSphereChanges({ ...empty, credo: "arte", spheres: {} }, { flags: { "wod5e-mage": { focus: { credo: "dati" } } } });
  assert.deepEqual(cambio.familySpheres, { matter: false, mind: false, correspondence: false, prime: false });
  assert.deepEqual(cambio.selectedSpheres, { matter: false, mind: false, correspondence: true, prime: true });
  // Il clic sul simbolo: Corrispondenza di famiglia, Primordio no; un altro clic la spegne.
  const pick = lineageSphereChanges({ ...empty, credo: "dati" }, { flags: { "wod5e-mage": { focus: { credoFamily: "correspondence" } } } });
  assert.deepEqual(pick.familySpheres, { correspondence: true, prime: false });
  assert.deepEqual(pick.selectedSpheres, { correspondence: true, prime: true });
  const swap = lineageSphereChanges({ ...empty, credo: "dati", credoFamily: "correspondence" }, { flags: { "wod5e-mage": { focus: { credoFamily: "prime" } } } });
  assert.deepEqual(swap.familySpheres, { correspondence: false, prime: true });
  // Una Sfera che non è del Credo non vale come scelta.
  assert.equal(credoFamilySphere("dati", null, "forces"), "");
  assert.equal(credoFamilySphere("dati", null, "prime"), "prime");
  // Se il Credo cambia e la scelta non è più sua, si azzera.
  const via = lineageSphereChanges({ ...empty, credo: "dati", credoFamily: "prime" }, { flags: { "wod5e-mage": { focus: { credo: "arte" } } } });
  assert.equal(via.focus.credoFamily, "");
  assert.deepEqual(credoSphereBadges("dati", (k) => k, null, "prime").map((b) => [b.id, b.family]), [["correspondence", false], ["prime", true]]);
}
// La Sfera che resta di famiglia per un'altra via non si tocca: Verbena (Vita) → Sahajiya col Credo che porta la Vita.
assert.deepEqual(
  lineageSphereChanges({ ...empty, lineage: { famiglia: "verbena" }, credo: "vivo", spheres: { life: 1 } }, { flags: { "wod5e-mage": { lineage: { famiglia: "sahajiya" } } } }),
  { selectedSpheres: { time: true }, familySpheres: { time: true }, spheres: { time: 1 } }
);
// La Sottofamiglia scelta porta la sua Sfera a 1.
assert.deepEqual(
  lineageSphereChanges({ ...empty, lineage: { famiglia: "hermes" } }, { flags: { "wod5e-mage": { lineage: { famiglia: "hermes", sottofamiglia: "quaesitor" } } } }),
  { selectedSpheres: { correspondence: true }, familySpheres: { correspondence: true }, spheres: { correspondence: 1 } }
);
// Il Credo sblocca le sue due Sfere senza il pallino, e scrive cos'è ogni
// Sfera nella sua ottica nelle caselle vuote (le parole del giocatore restano).
const arte = lineageSphereChanges({ ...empty, sphereNotes: { forces: "<p>la mia</p>", mind: "<p></p>" } }, { flags: { "wod5e-mage": { focus: { credo: "arte", sphereNotes: { time: "scritta ora" } } } } });
assert.deepEqual(arte.selectedSpheres, { matter: true, mind: true });
assert.deepEqual(arte.familySpheres, { matter: false, mind: false }, "di famiglia solo la scelta (11/9)");
assert.deepEqual(Object.keys(arte.focus.sphereNotes).sort(), ["correspondence", "entropy", "life", "matter", "mind", "prime", "spirit"]);
assert.match(arte.focus.sphereNotes.correspondence, /^<p>Corrispondenza è la Tela\./);
// Potere è sciolto sulle Sfere di famiglia, ma ha le sue nove righe.
const potere = lineageSphereChanges(empty, { flags: { "wod5e-mage": { focus: { credo: "potere" } } } });
assert.equal(potere.selectedSpheres, undefined);
assert.equal(Object.keys(potere.focus.sphereNotes).length, 9);
// Potere e Scienza: le due Sfere le sceglie il giocatore (6/9); scelte, si sbloccano di sola presenza.
assert.equal(isFreeCredo("potere"), true);
assert.equal(isFreeCredo("arte"), false);
assert.deepEqual(chosenCredoSpheres({ first: "forces", second: "forces" }), ["forces"]);
assert.deepEqual(credoSpheresFor("scienza", { first: "matter", second: "life" }), ["matter", "life"]);
assert.deepEqual(credoSpheresFor("arte", { first: "matter" }), ["matter", "mind"]);
const scelta = lineageSphereChanges({ ...empty, credo: "potere" }, { flags: { "wod5e-mage": { focus: { credoSpheres: { first: "forces", second: "time" } } } } });
assert.deepEqual(scelta.selectedSpheres, { forces: true, time: true });
assert.deepEqual(scelta.familySpheres, { forces: false, time: false });
assert.equal(scelta.spheres, undefined);
assert.equal(lineageSphereChanges({ ...empty, credo: "arte" }, { flags: { "wod5e-mage": { focus: { credoSpheres: { first: "forces" } } } } }), null);
assert.deepEqual(credoSphereBadges("potere", (k) => k, { first: "forces", second: "" }).map((b) => b.id), ["forces"]);
assert.deepEqual(lineageSpheres({ credo: "scienza", credoSpheres: { first: "spirit", second: "prime" } }), { dotted: [], present: ["spirit", "prime"] });
assert.equal(prepareCredoSphereChoices({ first: "mind" })[0].options.find((o) => o.id === "mind").selected, true);
const appartenenzaSource = readFileSync(new URL("../templates/actor/parts/appartenenza.hbs", import.meta.url), "utf8");
assert.match(appartenenzaSource, /\{\{#if credoFree\}\}[\s\S]*focus\.credoSpheres\.\{\{pick\.slot\}\}/);
assert.match(appartenenzaSource, /wod5e-mage-credo-sphere-family[\s\S]*data-action="credoFamilyPick" data-sphere="\{\{sphere\.id\}\}"/);
assert.match(readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8"), /credoFamilyPick: onCredoFamilyPick/);
assert.equal(isBlankNote("<p>&nbsp;</p>"), true);
assert.equal(isBlankNote("<p>x</p>"), false);
// Niente cambia: niente da fondere.
assert.equal(lineageSphereChanges({ ...empty, lineage: { famiglia: "hermes" }, credo: "arte" }, { flags: { "wod5e-mage": { lineage: { famiglia: "hermes" }, focus: { credo: "arte" } } } }), null);
assert.equal(lineageSphereChanges(empty, { system: { headers: { concept: "x" } } }), null);

// Le tendine: due gruppi, le sette della Famiglia scelta.
const choices = prepareLineageChoices({ famiglia: "verbena", sottofamiglia: "streghe" });
assert.equal(choices.groups.length, 2);
assert.equal(choices.groups[0].famiglie.length, 9);
assert.equal(choices.sottofamiglie.length, 4);
assert.equal(choices.sottofamiglie.find((sub) => sub.selected).id, "streghe");
assert.equal(choices.subKind, "Circolo");
assert.equal(prepareLineageChoices({ famiglia: "ngoma" }).hasSubfamilies, false);
// Il simbolo della Sfera accanto alla tendina: Vita per Verbena, Spirito per le Streghe; niente per gli Hollow Ones.
assert.equal(choices.familySphere.id, "life");
assert.match(choices.familySphere.icon, /assets\/icons\/sheet\/life\.png$/);
assert.equal(choices.subSphere.id, "spirit");
assert.equal(prepareLineageChoices({ famiglia: "hollow" }).familySphere, null);
assert.equal(prepareLineageChoices({ famiglia: "hermes" }).subSphere, null);

// La pagina e l'avvio.
// Le tendine stanno in testata (appartenenza.hbs), non più nel Personaggio.
const appartenenza = readFileSync(new URL("../templates/actor/parts/appartenenza.hbs", import.meta.url), "utf8");
assert.match(appartenenza, /<select name="flags\.wod5e-mage\.lineage\.famiglia"[\s\S]*lineageChoices\.groups[\s\S]*<select name="flags\.wod5e-mage\.lineage\.sottofamiglia"/);
assert.doesNotMatch(appartenenza, /<input type="text" name="flags\.wod5e-mage\.lineage\.famiglia"/);
const main = readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8");
assert.match(main, /registerLineageSpheres\(\)/);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8"));
  assert.equal(typeof strings.WOD5E_MAGE.Lineage.Factions.tradizioni, "string", lang);
  assert.equal(typeof strings.WOD5E_MAGE.Lineage.SubfamilyEmpty, "string", lang);
}

// I simboli delle due Sfere del Credo, per la testata; Potere è sciolto.
assert.deepEqual(credoSphereBadges("arte").map((badge) => badge.id), ["matter", "mind"]);
assert.deepEqual(credoSphereBadges("potere"), []);
assert.deepEqual(credoSphereBadges(""), []);

console.log("Famiglie tests passed.");

// Le tendine dell'Appartenenza in ordine alfabetico (9/9): Famiglie dentro il loro gruppo, Sottofamiglie, e i Credi.
{
  const choices = prepareLineageChoices({ famiglia: "adepti", sottofamiglia: "" }, (key) => key, "it");
  const labels = choices.groups.map((group) => group.famiglie.map((famiglia) => famiglia.label));
  const collator = new Intl.Collator("it", { sensitivity: "base" });
  for (const list of labels) assert.deepEqual(list, [...list].sort(collator.compare));
  assert.equal(labels[0][0], "Adepti Virtuali");
  assert.deepEqual(choices.sottofamiglie.map((sub) => sub.label), ["I Caotici", "I Naviganti", "L'Elite Mercuriale", "Le Sentinelle"]);
  assert.deepEqual(alphabetical([{ label: "Età dell'Oro" }, { label: "Abbi Fede" }, { label: "Tutto è Dati" }], "it").map((row) => row.label), ["Abbi Fede", "Età dell'Oro", "Tutto è Dati"]);
  const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
  assert.match(sheet, /context\.credos = alphabetical\(/);
  assert.match(readFileSync(new URL("../scripts/focus.js", import.meta.url), "utf8"), /credos: alphabetical\(/);
}
