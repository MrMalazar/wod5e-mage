import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import {
  appendText,
  ARCHIVI,
  archivioKind,
  backgroundItemData,
  BELONGING_ARCHIVI,
  BELONGING_KIND_BY_ARCHIVIO,
  belongingRowFromEntry,
  costLevels,
  entryFromDocument,
  FEATURE_KINDS,
  groupEntries,
  hasLevels,
  matchesLevel,
  matchesSearch,
  rowFromEntry
} from "../scripts/archivi.js";

// Nove archivi, e il sottotipo del sistema porta al suo.
assert.deepEqual(Object.keys(ARCHIVI), ["pregio", "difetto", "background", "credo", "concetto", "ambizione", "desiderio", "ancora", "convinzione", "condizione"]);
assert.equal(archivioKind("ambizione"), "ambizione");
assert.equal(archivioKind("altro"), null);
assert.equal(FEATURE_KINDS.merit, "pregio");
assert.equal(FEATURE_KINDS.flaw, "difetto");

// Accodare: dopo quello che c'è, mai due volte la stessa cosa.
assert.equal(appendText("", "Trovare mia sorella."), "Trovare mia sorella.");
assert.equal(appendText("Vendicarmi.", "Trovare mia sorella."), "Vendicarmi. · Trovare mia sorella.");
assert.equal(appendText("Vendicarmi. · Trovare mia sorella.", "Trovare mia sorella."), "Vendicarmi. · Trovare mia sorella.");
assert.equal(appendText("Vendicarmi.", ""), "Vendicarmi.");

// Le righe di Ancore e Convinzioni.
assert.deepEqual(rowFromEntry("ancora", { text: "Il partner", description: "La normalità." }), { name: "Il partner", description: "La normalità." });
// La Convinzione porta i due momenti; il gruppo dell'archivio diventa la chiave della tendina (o il Credo).
assert.deepEqual(rowFromEntry("convinzione", { group: "Morte", text: "Nessuno decide.", gloss: "lasci andare" }), { group: "morte", text: "Nessuno decide.", serve: "lasci andare", cross: "" });
assert.deepEqual(rowFromEntry("convinzione", { group: "Tutto è Arte", credo: "arte", text: "Il bello non si spiega.", gloss: "taci", cross: "spieghi" }), { group: "arte", text: "Il bello non si spiega.", serve: "taci", cross: "spieghi" });
assert.equal(rowFromEntry("convinzione", { group: "Verità", text: "x" }).group, "verita");
assert.equal(rowFromEntry("convinzione", { group: "Altro", text: "x" }).group, "");
assert.equal(rowFromEntry("ambizione", {}), null);

// Il Background sulla scheda: appunti veloci, chi e tipo, non il papiro.
const short = backgroundItemData({ name: "Alleati", lead: "Le persone che ti rispondono." }, { who: "Ludovica", type: "Mentore" });
assert.equal(short.name, "Alleati: Ludovica");
assert.equal(short.description, "<p><em>Le persone che ti rispondono.</em></p><p><strong>Chi:</strong> Ludovica</p><p><strong>Tipo:</strong> Mentore</p>");
assert.deepEqual(backgroundItemData({ name: "Fama", lead: "" }, {}), { name: "Fama", description: "" });

// I gruppi restano nell'ordine dell'archivio.
const grouped = groupEntries([{ name: "a", group: "Legami" }, { name: "b", group: "Potere" }, { name: "c", group: "Legami" }]);
assert.deepEqual(grouped.map((group) => [group.name, group.entries.length]), [["Legami", 2], ["Potere", 1]]);

// La ricerca ignora accenti e maiuscole e guarda anche il testo.
assert.equal(matchesSearch({ name: "La Ricerca", text: "Trovare chi ha fatto sparire mia sorella" }, "SORELLA"), true);
assert.equal(matchesSearch({ name: "Città" }, "citta"), true);
assert.equal(matchesSearch({ name: "La Ricerca" }, "xyz"), false);
assert.equal(matchesSearch({ name: "La Ricerca" }, ""), true);

// Dal documento del compendio alla voce.
const item = entryFromDocument({
  _id: "abc", uuid: "Compendium.x.abc", name: "Ambidestro", sort: 10,
  system: { description: "<p>testo</p>" },
  flags: { "wod5e-mage": { archivio: { kind: "pregio", group: "Fisici", cost: "• / •••", points: 1 } } }
});
assert.equal(item.group, "Fisici");
assert.equal(item.cost, "• / •••");
assert.equal(item.content, "<p>testo</p>");
const entry = entryFromDocument({
  _id: "j", uuid: "Compendium.x.j", name: "La Ricerca", sort: 0,
  pages: [{ text: { content: "<p>c</p>" } }],
  flags: { "wod5e-mage": { archivio: { kind: "ambizione", group: "Legami", text: "Trovare…" } } }
});
assert.equal(entry.text, "Trovare…");
assert.equal(entry.content, "<p>c</p>");

// I nove compendi esistono, sono JSON riga per riga e portano la bandiera.
const manifest = JSON.parse(readFileSync(new URL("../module.json", import.meta.url), "utf8"));
const expected = { "mage-pregi": 90, "mage-difetti": 85, "mage-background": 18, "mage-credi": 13, "mage-concetti": 24, "mage-ambizioni": 120, "mage-desideri": 120, "mage-ancore": 12, "mage-convinzioni": 110, "mage-condizioni": 25, "mage-strumenti": 22 };
for (const [name, minimum] of Object.entries(expected)) {
  const pack = manifest.packs.find((candidate) => candidate.name === name);
  assert.ok(pack, name);
  assert.equal(pack.path, `packs/${name}`);
  assert.ok(manifest.packFolders[0].packs.includes(name), `${name} nella cartella`);
  const file = new URL(`../packs/${name}.db`, import.meta.url);
  assert.ok(existsSync(file), `${name}.db`);
  const lines = readFileSync(file, "utf8").split("\n").filter(Boolean);
  assert.ok(lines.length >= minimum, `${name}: ${lines.length} voci`);
  const ids = new Set();
  for (const line of lines) {
    const doc = JSON.parse(line);
    assert.match(doc._id, /^[A-Za-z0-9]{16}$/, `${name} id`);
    assert.ok(!ids.has(doc._id), `${name} id doppio ${doc._id}`);
    ids.add(doc._id);
    assert.equal(typeof doc.flags["wod5e-mage"].archivio.kind, "string");
    if (name === "mage-condizioni") {
      // Le Condizioni: Item «condition» del sistema, col simbolo della bozza e i dadi tolti nei modificatori.
      assert.equal(doc.type, "condition");
      const icon = doc.img.replace("modules/wod5e-mage/", "");
      assert.match(icon, /icons\/condizioni\/cond_[a-z_]+\.svg$/);
      assert.ok(existsSync(new URL(`../${icon}`, import.meta.url)), icon);
      assert.equal(doc.system.suppressed, false);
      assert.ok(Array.isArray(doc.system.bonuses));
      continue;
    }
    if (name === "mage-strumenti") {
      // Gli Strumenti per la Magick (6/9): oggetti «gear» dell'Equipaggiamento, uno per ognuno dei ventidue.
      assert.equal(doc.type, "gear");
      assert.match(doc.flags["wod5e-mage"].strumento.id, /^[a-zA-Z]+$/);
      assert.ok(["object", "word", "machine", "substance", "body"].includes(doc.flags["wod5e-mage"].strumento.family), doc.name);
      assert.match(doc.system.description, /Per esempio/);
      continue;
    }
    if (pack.type === "Item") {
      assert.equal(doc.type, "feature");
      // Ogni oggetto ha la sua icona: per gruppo i Pregi e i Difetti, una a testa i Background.
      const icon = doc.img.replace("modules/wod5e-mage/", "");
      assert.ok(existsSync(new URL(`../${icon}`, import.meta.url)), icon);
      if (name === "mage-background") {
        assert.match(icon, /archivi\/bg-[a-z-]+\.svg$/);
        assert.equal(typeof doc.flags["wod5e-mage"].archivio.lead, "string");
      } else {
        assert.match(icon, /archivi\/(pregio|difetto)-(fisici|mentali|sociali|soprannaturali)\.svg$/);
      }
      assert.ok(["merit", "flaw", "background"].includes(doc.system.featuretype));
      assert.ok(doc.system.points >= 1);
    } else {
      assert.equal(doc.pages.length, 1);
      assert.ok(doc.pages[0].text.content.length > 0);
    }
  }
}

// Le voci dei Credi: tredici, con l'id della tendina.
const credi = readFileSync(new URL("../packs/mage-credi.db", import.meta.url), "utf8").split("\n").filter(Boolean).map((line) => JSON.parse(line));
assert.deepEqual(credi.map((doc) => doc.flags["wod5e-mage"].archivio.credo).sort(), ["arte", "caos", "dati", "fede", "illusione", "legge", "macchina", "polvere", "potere", "sacro", "scienza", "suono", "vivo"]);

// Le Convinzioni dei Credi hanno le due glosse.
const convinzioni = readFileSync(new URL("../packs/mage-convinzioni.db", import.meta.url), "utf8").split("\n").filter(Boolean).map((line) => JSON.parse(line));
assert.ok(convinzioni.some((doc) => doc.flags["wod5e-mage"].archivio.credo === "arte" && doc.flags["wod5e-mage"].archivio.cross));
// Anche le cinquanta del catalogo portano i due momenti (4/9 notte).
const catalogo = convinzioni.filter((doc) => !doc.flags["wod5e-mage"].archivio.credo);
assert.equal(catalogo.length, 50);
assert.ok(catalogo.every((doc) => doc.flags["wod5e-mage"].archivio.gloss && doc.flags["wod5e-mage"].archivio.cross));
// Le Condizioni: Abbagliato toglie un dado a ogni tiro, Atterrato due alle fisiche, Cieco non tocca i dadi.
const condizioni = readFileSync(new URL("../packs/mage-condizioni.db", import.meta.url), "utf8").split("\n").filter(Boolean).map((line) => JSON.parse(line));
const byName = Object.fromEntries(condizioni.map((doc) => [doc.name, doc]));
assert.deepEqual(byName.Abbagliato.system.bonuses.map((b) => [b.value, b.paths]), [["-1", ["all"]]]);
assert.deepEqual(byName.Atterrato.system.bonuses.map((b) => [b.value, b.paths]), [["-2", ["physical"]]]);
assert.deepEqual(byName.Cieco.system.bonuses, []);
assert.equal(byName["A secco"].flags["wod5e-mage"].archivio.group, "Strumenti tagliati");
assert.deepEqual([...new Set(condizioni.map((doc) => doc.flags["wod5e-mage"].archivio.group))], ["Corpo", "Strumenti tagliati", "Vista", "Udito", "Testa", "Maledizione", "Ambiente"]);


// La scheda: il libro accanto a ogni voce, distinto dal +.
const personaggio = readFileSync(new URL("../templates/actor/parts/personaggio.hbs", import.meta.url), "utf8");
for (const kind of ["concetto", "ambizione", "desiderio", "ancora", "convinzione"]) {
  assert.match(personaggio, new RegExp(`data-action="archivioOpen" data-kind="${kind}"`), kind);
}
// Il libro del Credo sta in testata, con la tendina (4/9 notte).
const appartenenza = readFileSync(new URL("../templates/actor/parts/appartenenza.hbs", import.meta.url), "utf8");
assert.match(appartenenza, /data-action="archivioOpen" data-kind="credo"/);
const features = readFileSync(new URL("../templates/actor/parts/core-features.hbs", import.meta.url), "utf8");
assert.match(features, /data-action="archivioOpen" data-subtype="\{\{key\}\}"[\s\S]*data-action="createItem"/);
const dotazione = readFileSync(new URL("../templates/actor/parts/dotazione.hbs", import.meta.url), "utf8");
assert.match(dotazione, /modules\/wod5e-mage\/templates\/actor\/parts\/core-features\.hbs/);
const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheet, /archivioOpen: onArchivioOpen/);
assert.match(sheet, /parts\/core-features\.hbs/);
const notes = readFileSync(new URL("../templates/dialogs/archivio-background.hbs", import.meta.url), "utf8");
assert.match(notes, /name="who"[\s\S]*name="typeChoice"[\s\S]*name="type"/);
const dialog = readFileSync(new URL("../templates/dialogs/archivio.hbs", import.meta.url), "utf8");
assert.match(dialog, /data-role="archivioSearch"[\s\S]*data-role="archivioGroup"[\s\S]*data-role="archivioEntry"[\s\S]*data-role="archivioToggle"[\s\S]*data-role="archivioAdd"/);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8"));
  assert.equal(Object.keys(strings.WOD5E_MAGE.Archivi.Kinds).length, 10, lang);
  assert.equal(typeof strings.WOD5E_MAGE.Focus.Credos.vivo, "string", lang);
}

console.log("Archivi tests passed.");

// Il livello di un Pregio o Difetto dal costo a pallini (9/9): fisso, a forbice, a scelta.
assert.deepEqual(costLevels("••"), [2]);
assert.deepEqual(costLevels("•–•••"), [1, 2, 3]);
assert.deepEqual(costLevels("•• / ••••"), [2, 4]);
assert.deepEqual(costLevels("• / ••• / ••••"), [1, 3, 4]);
assert.deepEqual(costLevels("••/••••"), [2, 4]);
assert.deepEqual(costLevels("•••–•••••"), [3, 4, 5]);
assert.deepEqual(costLevels("", 1), [1]);
assert.deepEqual(costLevels(undefined, 3), [3]);
// Il filtro «a 3»: chi vale 3, o chi ci arriva; 0 lascia passare tutti.
assert.equal(matchesLevel({ cost: "•–•••" }, 3), true);
assert.equal(matchesLevel({ cost: "•• / ••••" }, 3), false);
assert.equal(matchesLevel({ cost: "••" }, 0), true);
assert.equal(matchesLevel({ cost: "", points: 2 }, 2), true);
assert.equal(hasLevels([{ cost: "" }, { cost: "••" }]), true);
assert.equal(hasLevels([{ name: "a" }]), false);
{
  const dialog = readFileSync(new URL("../templates/dialogs/archivio.hbs", import.meta.url), "utf8");
  assert.match(dialog, /data-role="archivioFold"/);
  assert.match(dialog, /\{\{#if levels\.length\}\}[\s\S]*data-role="archivioLevel" data-level="0"[\s\S]*\{\{#each levels as \|level\|\}\}/);
  assert.match(dialog, /<details class="wod5e-mage-archivio-group" data-role="archivioGroup" open>\s*<summary>/);
  const archivi = readFileSync(new URL("../scripts/archivi.js", import.meta.url), "utf8");
  assert.match(archivi, /levels: hasLevels\(entries\) \? \[1, 2, 3, 4, 5\] : \[\]/);
  assert.match(archivi, /matchesSearch\(entry \?\? \{\}, query\) && matchesLevel\(entry \?\? \{\}, level\)/);
}

// Gli Elementi in comune e di Storia dall'archivio (10/9): la voce diventa una
// riga tipo · nome · livello. Il livello: quello del filtro se la voce lo ha,
// altrimenti il più basso del costo; il Background prende il nome breve.
assert.deepEqual([...BELONGING_ARCHIVI], ["background", "pregio", "difetto"]);
assert.deepEqual(BELONGING_KIND_BY_ARCHIVIO, { background: "background", pregio: "advantage", difetto: "flaw" });
assert.deepEqual(belongingRowFromEntry("pregio", { name: "Concentrazione", cost: "•–•••" }), { kind: "advantage", name: "Concentrazione", value: 1 });
assert.deepEqual(belongingRowFromEntry("pregio", { name: "Concentrazione", cost: "•–•••" }, { level: 3 }), { kind: "advantage", name: "Concentrazione", value: 3 }, "col filtro a 3");
assert.deepEqual(belongingRowFromEntry("difetto", { name: "Zoppo", cost: "•• / ••••" }, { level: 3 }), { kind: "flaw", name: "Zoppo", value: 2 }, "il filtro non vale per la voce: il livello più basso");
assert.deepEqual(belongingRowFromEntry("background", { name: "Maschera", points: 2 }, { name: "Maschera: Anna" }), { kind: "background", name: "Maschera: Anna", value: 2 });
assert.deepEqual(belongingRowFromEntry("credo", { name: "x" }), { kind: "", name: "x", value: 1 });
{
  const dialog = readFileSync(new URL("../templates/dialogs/archivio.hbs", import.meta.url), "utf8");
  assert.match(dialog, /\{\{#if kinds\.length\}\}[\s\S]*data-role="archivioKind" data-kind="\{\{tab\.id\}\}"[\s\S]*\{\{\/if\}\}\s*<div class="wod5e-mage-archivio-head">/);
  const archivi = readFileSync(new URL("../scripts/archivi.js", import.meta.url), "utf8");
  assert.match(archivi, /export async function openArchivio\(actor, kind, \{ table = "", kinds = \[\] \} = \{\}\)/);
  assert.match(archivi, /addFromArchivio\(actor, kind, entry, \{ table, level \}\)/);
  const dotazione = readFileSync(new URL("../templates/actor/parts/dotazione.hbs", import.meta.url), "utf8");
  assert.match(dotazione, /data-action="belongingArchivio" data-table="\{\{table\.flag\}\}"[\s\S]*data-action="belongingAdd" data-table="\{\{table\.flag\}\}"/);
  assert.match(readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8"), /belongingArchivio: onBelongingArchivio/);
  for (const lang of ["it", "en"]) {
    const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8"));
    assert.equal(typeof strings.WOD5E_MAGE.Belongings.Archivio, "string", lang);
    assert.equal(typeof strings.WOD5E_MAGE.Archivi.KindTabs, "string", lang);
  }
}

// La matita di Background, Pregi, Difetti e Dotazione (10/9): il sistema la chiama
// itemEdit (5.3.19) o itemOpen (5.3.26, il server di Sans); il modulo si porta la sua.
{
  const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
  assert.match(sheet, /itemEdit: onGuidedItemEdit/);
  const guided = readFileSync(new URL("../scripts/oggetti-guidati.js", import.meta.url), "utf8");
  assert.match(guided, /export async function onGuidedItemEdit\(event, target\)[\s\S]*this\.actor\?\.items\?\.get\(guidedItemId\(target\)\)[\s\S]*item\.sheet\?\.render\(true\)/);
  for (const part of ["core-features", "equipment-list"]) {
    const template = readFileSync(new URL(`../templates/actor/parts/${part}.hbs`, import.meta.url), "utf8");
    assert.match(template, /class="item-control item-edit[^"]*" data-action="itemEdit" data-item-id="\{\{item\._id\}\}"/, part);
  }
}

console.log("Archivi degli Elementi e matita: test passati.");
