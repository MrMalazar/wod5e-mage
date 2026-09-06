import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CONDIZIONI } from "../scripts/data/condizioni.js";
import { condizioneItemData, findCondizione, findCondizioneByName, prepareCondizioni, prepareConditionRows } from "../scripts/condizioni.js";
import { assignCondizione, prepareMasterCondizioni, selectedActors } from "../scripts/condizioni-master.js";

// Le venticinque della bozza, in sette gruppi, con simbolo e id unici.
assert.equal(CONDIZIONI.length, 25);
assert.deepEqual([...new Set(CONDIZIONI.map((entry) => entry.group))], ["Corpo", "Strumenti tagliati", "Vista", "Udito", "Testa", "Maledizione", "Ambiente"]);
assert.equal(new Set(CONDIZIONI.map((entry) => entry.id)).size, 25);
assert.equal(findCondizione("a-secco").name, "A secco");
assert.equal(findCondizioneByName("a secco").id, "a-secco");
assert.equal(findCondizioneByName("boh"), null);

// L'oggetto che va addosso al personaggio: «condition» del sistema, coi modificatori del sistema.
const data = condizioneItemData(findCondizione("offuscato"));
assert.equal(data.type, "condition");
assert.deepEqual(data.system.bonuses.map((b) => [b.value, b.paths]), [["-2", ["all"]]]);
assert.deepEqual(condizioneItemData(findCondizione("atterrato")).system.bonuses.map((b) => [b.value, b.paths]), [["-2", ["physical"]]]);
assert.deepEqual(condizioneItemData(findCondizione("cieco")).system.bonuses, []);
assert.equal(data.flags["wod5e-mage"].condizione, "offuscato");
assert.equal(data.system.suppressed, false);
assert.match(data.img, /icons\/condizioni\/cond_offuscato\.svg$/);

// Le righe della cella («strada 1»): simbolo, nome, cos'è e dadi; le fuori lista dal loro oggetto.
const rows = prepareConditionRows([
  { id: "a", type: "condition", name: "Offuscato", img: "x.svg", flags: { "wod5e-mage": { condizione: "offuscato" } }, system: { suppressed: false, bonuses: [] } },
  { id: "b", type: "condition", name: "Mia", img: "y.svg", flags: {}, system: { suppressed: true, description: "<p>Una cosa <b>mia</b></p>", bonuses: [{ value: "-1" }] } },
  { id: "c", type: "feature", name: "no" }
]);
assert.equal(rows.length, 2);
assert.deepEqual([rows[0].name, rows[0].dice, rows[0].what, rows[0].suppressed], ["Offuscato", "-2", "Distingui solo le forme", false]);
assert.deepEqual([rows[1].name, rows[1].dice, rows[1].what, rows[1].suppressed], ["Mia", "-1", "Una cosa mia", true]);

// La scheda (compromesso): sopra la striscia dei simboli accesi con la lente,
// sotto la tendina con tutte le venticinque per gruppo; un clic accende o spegne.
const tratti = readFileSync(new URL("../templates/actor/parts/tratti.hbs", import.meta.url), "utf8");
assert.match(tratti, /wod5e-mage-condizioni-strip[\s\S]*condizioniRows[\s\S]*data-action="condizioneToggle" data-condizione="\{\{row\.condizione\}\}" data-item-id="\{\{row\.id\}\}"[\s\S]*data-action="searchItem"[\s\S]*<details class="wod5e-mage-condizioni-drawer">[\s\S]*Condizioni\.All[\s\S]*group\.group[\s\S]*data-action="condizioneToggle" data-condizione="\{\{entry\.id\}\}"/);
assert.doesNotMatch(tratti, /data-kind="condizione"/);
// Ogni Condizione porta il nome sotto il simbolo (6/9); nella striscia
// le accese sono più grandi (74 px, simbolo 38 px, nome 0.62rem).
assert.match(tratti, /wod5e-mage-condizione-on[\s\S]*<span class="wod5e-mage-condizione-glyph">[\s\S]*row\.img[\s\S]*<span class="wod5e-mage-condizione-name">\{\{row\.name\}\}<\/span>[\s\S]*wod5e-mage-condizione\{\{#if entry\.active\}\} lit[\s\S]*<span class="wod5e-mage-condizione-name">\{\{entry\.name\}\}<\/span>/);
const condCss = readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8");
assert.match(condCss, /\.wod5e-mage-condizione-on \{[^}]*flex: 0 0 74px;/s);
assert.match(condCss, /\.wod5e-mage-condizione-on img \{[^}]*height: 38px;/s);
assert.match(condCss, /\.wod5e-mage-condizione-on \.wod5e-mage-condizione-name \{[^}]*font-size: 0\.62rem;/s);
const groups = prepareCondizioni([{ id: "a", type: "condition", flags: { "wod5e-mage": { condizione: "offuscato" } }, system: { suppressed: true } }]);
assert.equal(groups.length, 7);
const offuscato = groups.flatMap((g) => g.entries).find((e) => e.id === "offuscato");
assert.deepEqual([offuscato.active, offuscato.suppressed, offuscato.dice], [true, true, "-2"]);
assert.match(offuscato.title, /^Offuscato \(-2\) · Distingui solo le forme\./);
assert.equal(groups.flatMap((g) => g.entries).filter((e) => e.active).length, 1);
assert.equal(rows[0].condizione, "offuscato");
assert.equal(rows[1].condizione, "");

// Il Master: coi personaggi scelti, un clic accende a tutti, se l'hanno tutti spegne.
function fakeActor(name, ids) {
  const actor = { name, items: ids.map((id, i) => ({ id: `${name}${i}`, type: "condition", flags: { "wod5e-mage": { condizione: id } }, system: {} })) };
  actor.createEmbeddedDocuments = async (_t, docs) => { for (const d of docs) actor.items.push({ id: `${name}${actor.items.length}`, type: "condition", flags: d.flags, system: d.system }); };
  actor.deleteEmbeddedDocuments = async (_t, ids) => { actor.items = actor.items.filter((i) => !ids.includes(i.id)); };
  return actor;
}
const a = fakeActor("A", ["offuscato"]);
const b = fakeActor("B", []);
const master = prepareMasterCondizioni([a, b]).flatMap((g) => g.entries).find((e) => e.id === "offuscato");
assert.deepEqual([master.count, master.all, master.some, master.badge], [1, false, true, "1"]);
assert.equal(await assignCondizione([a, b], findCondizione("offuscato")), 2);
assert.equal(prepareMasterCondizioni([a, b]).flatMap((g) => g.entries).find((e) => e.id === "offuscato").all, true);
assert.equal(await assignCondizione([a, b], findCondizione("offuscato")), 0);
assert.equal(a.items.length + b.items.length, 0);
assert.equal(selectedActors([{ actor: a }, { actor: a }, { actor: b }, {}]).length, 2);
const masterTemplate = readFileSync(new URL("../templates/dialogs/condizioni-master.hbs", import.meta.url), "utf8");
assert.match(masterTemplate, /data-role="targets"[\s\S]*data-condizione="\{\{entry\.id\}\}"[\s\S]*entry\.what[\s\S]*data-role="count"/);
const macros = readFileSync(new URL("../packs/mage-macros.db", import.meta.url), "utf8").split("\n").filter(Boolean).map((line) => JSON.parse(line));
assert.equal(macros.length, 1);
assert.match(macros[0].command, /api\.condizioni\.assign\(\)/);
const manifest = JSON.parse(readFileSync(new URL("../module.json", import.meta.url), "utf8"));
assert.equal(manifest.packs.find((p) => p.name === "mage-macros").type, "Macro");
assert.match(readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8"), /condizioni: Object\.freeze\(\{[\s\S]*assign: openCondizioniMaster/);
const archivi = readFileSync(new URL("../scripts/archivi.js", import.meta.url), "utf8");
assert.match(archivi, /kind === "condizione"[\s\S]*findCondizioneByName\(entry\.name\)[\s\S]*condizioneItemData/);

console.log("Condizioni tests passed.");
