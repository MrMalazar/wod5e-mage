import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CONDIZIONI } from "../scripts/data/condizioni.js";
import { condizioneItemData, findCondizione, findCondizioneByName } from "../scripts/condizioni.js";

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

// La scheda: il + della cella apre l'archivio (per categoria), la lente resta; niente quadratini.
const tratti = readFileSync(new URL("../templates/actor/parts/tratti.hbs", import.meta.url), "utf8");
assert.match(tratti, /data-action="searchItem"[\s\S]*data-action="archivioOpen" data-kind="condizione"/);
assert.doesNotMatch(tratti, /condizioneToggle|wod5e-mage-condizioni/);
const archivi = readFileSync(new URL("../scripts/archivi.js", import.meta.url), "utf8");
assert.match(archivi, /kind === "condizione"[\s\S]*findCondizioneByName\(entry\.name\)[\s\S]*condizioneItemData/);

console.log("Condizioni tests passed.");
