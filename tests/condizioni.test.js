import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CONDIZIONI } from "../scripts/data/condizioni.js";
import { condizioneItemData, findCondizione, findCondizioneByName, prepareConditionRows } from "../scripts/condizioni.js";

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

// La scheda: il + della cella apre l'archivio (per categoria), la lente resta; niente quadratini.
const tratti = readFileSync(new URL("../templates/actor/parts/tratti.hbs", import.meta.url), "utf8");
assert.match(tratti, /data-action="searchItem"[\s\S]*data-action="archivioOpen" data-kind="condizione"/);
assert.doesNotMatch(tratti, /condizioneToggle|wod5e-mage-condizioni\b/);
assert.match(tratti, /condizioniRows[\s\S]*wod5e-mage-condition-row[\s\S]*row\.what[\s\S]*toggleConditionSuppression/);
const archivi = readFileSync(new URL("../scripts/archivi.js", import.meta.url), "utf8");
assert.match(archivi, /kind === "condizione"[\s\S]*findCondizioneByName\(entry\.name\)[\s\S]*condizioneItemData/);

console.log("Condizioni tests passed.");
