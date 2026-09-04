import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  CREDO_SPHERES,
  credoSphereBadges,
  FAMIGLIE,
  findFamiglia,
  findSottofamiglia,
  isBlankNote,
  lineageSphereChanges,
  lineageSpheres,
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
// La Sottofamiglia di un'altra Famiglia si azzera quando cambia la Famiglia.
assert.deepEqual(
  lineageSphereChanges({ ...empty, lineage: { famiglia: "hermes", sottofamiglia: "verdicta" } }, { flags: { "wod5e-mage": { lineage: { famiglia: "verbena" } } } }),
  { lineage: { sottofamiglia: "" }, selectedSpheres: { life: true }, familySpheres: { life: true }, spheres: { life: 1 } }
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
assert.deepEqual(arte.familySpheres, { matter: true, mind: true });
assert.deepEqual(Object.keys(arte.focus.sphereNotes).sort(), ["correspondence", "entropy", "life", "matter", "mind", "prime", "spirit"]);
assert.match(arte.focus.sphereNotes.correspondence, /^<p>Corrispondenza è la Tela\./);
// Potere è sciolto sulle Sfere di famiglia, ma ha le sue nove righe.
const potere = lineageSphereChanges(empty, { flags: { "wod5e-mage": { focus: { credo: "potere" } } } });
assert.equal(potere.selectedSpheres, undefined);
assert.equal(Object.keys(potere.focus.sphereNotes).length, 9);
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
