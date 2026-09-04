import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import {
  appendText,
  ARCHIVI,
  backgroundItemData,
  archivioKind,
  entryFromDocument,
  FEATURE_KINDS,
  groupEntries,
  matchesSearch,
  rowFromEntry
} from "../scripts/archivi.js";

// Nove archivi, e il sottotipo del sistema porta al suo.
assert.deepEqual(Object.keys(ARCHIVI), ["pregio", "difetto", "background", "credo", "concetto", "ambizione", "desiderio", "ancora", "convinzione"]);
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
assert.deepEqual(rowFromEntry("convinzione", { group: "Morte", text: "Nessuno decide." }), { group: "Morte", text: "Nessuno decide." });
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
const expected = { "mage-pregi": 90, "mage-difetti": 85, "mage-background": 18, "mage-credi": 13, "mage-concetti": 24, "mage-ambizioni": 120, "mage-desideri": 120, "mage-ancore": 12, "mage-convinzioni": 110 };
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

// La scheda: il libro accanto a ogni voce, distinto dal +.
const personaggio = readFileSync(new URL("../templates/actor/parts/personaggio.hbs", import.meta.url), "utf8");
for (const kind of ["concetto", "ambizione", "desiderio", "ancora", "convinzione"]) {
  assert.match(personaggio, new RegExp(`data-action="archivioOpen" data-kind="${kind}"`), kind);
}
const focus = readFileSync(new URL("../templates/actor/parts/focus.hbs", import.meta.url), "utf8");
assert.match(focus, /data-action="archivioOpen" data-kind="credo"/);
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
  assert.equal(Object.keys(strings.WOD5E_MAGE.Archivi.Kinds).length, 9, lang);
  assert.equal(typeof strings.WOD5E_MAGE.Focus.Credos.vivo, "string", lang);
}

console.log("Archivi tests passed.");
