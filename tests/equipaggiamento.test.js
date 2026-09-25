import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { ARCHIVI, EQUIP_ARCHIVI, entryFromDocument, filterByItemTypes, hasLevels, kindsFromDataset } from "../scripts/archivi.js";

// L'Equipaggiamento (Blue, 25/9): la lista unica diventa il compendio
// mage-equipaggiamento, un oggetto del sistema per riga.
const docs = readFileSync(new URL("../packs/mage-equipaggiamento.db", import.meta.url), "utf8")
  .split("\n")
  .filter(Boolean)
  .map((line) => JSON.parse(line));

assert.equal(docs.length, 118, "le 118 voci della lista");
const count = (type) => docs.filter((doc) => doc.type === type).length;
assert.deepEqual([count("weapon"), count("armor"), count("gear")], [31, 13, 74], "armi, armature, oggetti");

const ids = new Set();
for (const doc of docs) {
  const flags = doc.flags["wod5e-mage"];
  assert.match(doc._id, /^[A-Za-z0-9]{16}$/, doc.name);
  assert.ok(!ids.has(doc._id), `id doppio ${doc._id}`);
  ids.add(doc._id);
  assert.equal(flags.archivio.kind, `equip-${doc.type}`, doc.name);
  assert.equal(flags.archivio.group, flags.tipo, doc.name);
  assert.equal(flags.archivio.name, doc.name);
  assert.ok(Number.isInteger(flags.grado) && flags.grado >= 0 && flags.grado <= 5, doc.name);
  assert.equal(flags.archivio.cost, flags.grado ? `Grado ${flags.grado}` : "", "accanto al nome, il Grado");
  assert.match(doc.system.description, /<strong>Tipo<\/strong>/, doc.name);
  assert.doesNotMatch(doc.system.description, /—/, "niente trattino lungo");
  assert.equal(doc.system.source.book, "M6 · L'equipaggiamento");
  assert.equal(doc.system.quantity, 1);
  if (doc.type === "weapon") {
    assert.ok(["melee", "ranged"].includes(doc.system.weaponType), doc.name);
    assert.ok(Number.isInteger(doc.system.weaponvalue) && doc.system.weaponvalue >= 0 && doc.system.weaponvalue <= 7, doc.name);
    assert.equal(typeof flags.aggravato, "boolean", doc.name);
  }
  if (doc.type === "armor") {
    assert.ok(doc.system.armorvalue >= 1 && doc.system.armorvalue <= 7, doc.name);
    assert.equal(flags.armaturaPiena, doc.system.armorvalue, "il pieno è il punteggio della lista");
    assert.ok(["fisica", "mentale"].includes(flags.armatura), doc.name);
    assert.equal(doc.system.uses, undefined, "l'armatura del sistema non ha usi");
  } else {
    assert.equal(doc.system.uses.enabled, doc.system.uses.max > 0, doc.name);
    assert.equal(doc.system.uses.current, doc.system.uses.max, doc.name);
  }
}

const byName = Object.fromEntries(docs.map((doc) => [doc.name, doc]));
// Il danno è Superficiale; la spunta dell'Aggravato è accesa solo dove la lista lo scrive.
assert.deepEqual(
  docs.filter((doc) => doc.flags["wod5e-mage"].aggravato).map((doc) => doc.name),
  ["Motosega", "Fucile anti-materiale", "Lanciafiamme", "Esplosivo plastico"]
);
assert.equal(byName.Pistola.system.weaponvalue, 4);
assert.equal(byName.Pistola.system.weaponType, "ranged");
assert.equal(byName.Pistola.flags["wod5e-mage"].dettagli, "Un tiro di pistola", "la Portata nei dettagli in riga");
assert.equal(byName["Fucile di precisione"].system.weaponvalue, 7);
assert.equal(byName["Granata EMP"].system.weaponvalue, 0, "senza danno");
assert.equal(byName["Mani nude"].system.weaponType, "melee");
assert.equal(byName["Tenuta tattica completa"].system.armorvalue, 7);
assert.equal(byName.Seduta.flags["wod5e-mage"].armatura, "mentale");
assert.equal(docs.filter((doc) => doc.flags["wod5e-mage"].armatura === "mentale").length, 6);
assert.match(byName["Giubbotto con piastre"].system.description, /Ogni colpo che assorbe le toglie 1 punto/);
assert.equal(byName["Kit medico"].system.uses.max, 3);
assert.equal(byName["Kit medico"].type, "gear");
// L'ipertecnologia chiede il Grado 5 (Blue, 25/9).
const iper = docs.filter((doc) => doc.system.description.includes("ipertecnologia"));
assert.equal(iper.length, 7);
assert.ok(iper.every((doc) => doc.flags["wod5e-mage"].grado === 5));
assert.deepEqual(docs.map((doc) => doc.sort), docs.map((_, index) => (index + 1) * 10), "l'ordine della lista");

// Il compendio nel manifest, nella cartella Mage; la lista e lo script stanno nel repo.
const manifest = JSON.parse(readFileSync(new URL("../module.json", import.meta.url), "utf8"));
const pack = manifest.packs.find((candidate) => candidate.name === "mage-equipaggiamento");
assert.ok(pack);
assert.equal(pack.type, "Item");
assert.equal(pack.path, "packs/mage-equipaggiamento");
assert.ok(manifest.packFolders[0].packs.includes("mage-equipaggiamento"));
assert.ok(existsSync(new URL("../tools/dati/equipaggiamento.md", import.meta.url)));
assert.ok(existsSync(new URL("../tools/build-equipaggiamento.py", import.meta.url)));

// Tre archivi sullo stesso compendio, uno per tipo d'oggetto, con le linguette.
assert.deepEqual([...EQUIP_ARCHIVI], ["equip-weapon", "equip-armor", "equip-gear"]);
for (const kind of EQUIP_ARCHIVI) {
  assert.equal(ARCHIVI[kind].pack, "mage-equipaggiamento");
  assert.equal(ARCHIVI[kind].add, "item");
}
assert.deepEqual(filterByItemTypes(docs, ARCHIVI["equip-armor"].itemTypes).map((doc) => doc.type), Array(13).fill("armor"));
assert.equal(filterByItemTypes(docs, ARCHIVI["equip-gear"].itemTypes).length, 74);
assert.equal(filterByItemTypes(docs, undefined).length, 118, "senza filtro, tutto");
assert.deepEqual(kindsFromDataset("equip-weapon, equip-armor,equip-gear,altro"), ["equip-weapon", "equip-armor", "equip-gear"]);
assert.deepEqual(kindsFromDataset(undefined), []);
const entries = docs.map((doc) => entryFromDocument(doc));
assert.equal(entries[0].group, "Mischia");
assert.equal(entries.find((entry) => entry.name === "Pistola").cost, "Grado 2");
assert.equal(hasLevels(entries), false, "niente linguette dei livelli: il Grado si legge accanto al nome");

// Il libro nell'occhiello dell'Inventario, e le sue parole.
const inventario = readFileSync(new URL("../templates/actor/parts/equipment-list.hbs", import.meta.url), "utf8");
assert.match(inventario, /data-action="archivioOpen" data-kind="equip-\{\{key\}\}" data-kinds="equip-weapon,equip-armor,equip-gear"/);
const archivi = readFileSync(new URL("../scripts/archivi.js", import.meta.url), "utf8");
assert.match(archivi, /openArchivio\(this\.actor, kind, \{ kinds: kindsFromDataset\(target\.dataset\.kinds\) \}\)/);
assert.match(archivi, /return filterByItemTypes\(docs, config\.itemTypes\)/);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8")).WOD5E_MAGE;
  for (const kind of EQUIP_ARCHIVI) assert.equal(typeof strings.Archivi.Kinds[kind], "string", `${lang} ${kind}`);
  assert.equal(typeof strings.Archivi.OpenEquip, "string", lang);
}

console.log("Equipaggiamento: test passati.");
