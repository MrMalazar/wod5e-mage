import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CONDIZIONI } from "../scripts/data/condizioni.js";
import {
  activeCondizioni,
  CONDIZIONI_GROUPS,
  condizioneItemData,
  customConditions,
  findCondizione,
  onCondizioneToggle,
  prepareCondizioni
} from "../scripts/condizioni.js";

// Le venticinque, nei sette gruppi della bozza, tutte con simbolo e id unici.
assert.equal(CONDIZIONI.length, 25);
assert.deepEqual(CONDIZIONI_GROUPS, ["Corpo", "Strumenti tagliati", "Vista", "Udito", "Testa", "Maledizione", "Ambiente"]);
assert.equal(new Set(CONDIZIONI.map((entry) => entry.id)).size, 25);
assert.equal(findCondizione("a-secco").name, "A secco");
assert.equal(findCondizione("niente"), null);

// Gli oggetti di lista si riconoscono dalla bandiera; gli altri restano nella lista classica.
const flagged = (id, extra = {}) => ({ id: `item-${id}`, type: "condition", flags: { "wod5e-mage": { condizione: id } }, system: { suppressed: false }, ...extra });
const custom = { id: "x", type: "condition", flags: {}, system: { suppressed: false } };
const items = [flagged("cieco"), flagged("scosso", { system: { suppressed: true } }), custom, { id: "m", type: "feature", flags: { "wod5e-mage": { condizione: "muto" } } }];
assert.deepEqual([...activeCondizioni(items).keys()], ["cieco", "scosso"]);
assert.deepEqual(customConditions(items.filter((item) => item.type === "condition")), [custom]);

// I quadratini: accesi, sospesi, coi dadi tolti e la spiegazione nel titolo.
const groups = prepareCondizioni(items);
assert.equal(groups.length, 7);
const vista = groups.find((group) => group.group === "Vista");
const cieco = vista.entries.find((entry) => entry.id === "cieco");
assert.equal(cieco.active, true);
assert.equal(cieco.dice, "");
assert.match(cieco.title, /^Cieco · Non vedi\. /);
const scosso = groups.find((group) => group.group === "Testa").entries.find((entry) => entry.id === "scosso");
assert.deepEqual([scosso.active, scosso.suppressed, scosso.dice], [true, true, "-1"]);
assert.match(scosso.title, /^Scosso \(-1\) · /);
assert.equal(vista.entries.find((entry) => entry.id === "abbagliato").active, false);

// L'oggetto che nasce quando il quadratino si accende: «condition» del sistema con i modificatori.
const data = condizioneItemData(findCondizione("offuscato"));
assert.equal(data.type, "condition");
assert.deepEqual(data.system.bonuses.map((b) => [b.value, b.paths]), [["-2", ["all"]]]);
assert.equal(data.flags["wod5e-mage"].condizione, "offuscato");
assert.equal(data.system.suppressed, false);

// Il clic: crea se manca, cancella se c'è; senza permessi avvisa.
globalThis.game = { i18n: { format: (key) => key } };
globalThis.ui = { notifications: { warn() { warned = true; } } };
let warned = false;
const calls = [];
const actor = {
  isOwner: true,
  name: "Test",
  items: [flagged("cieco")],
  async createEmbeddedDocuments(type, docs) { calls.push(["create", type, docs[0].name]); },
  async deleteEmbeddedDocuments(type, ids) { calls.push(["delete", type, ids[0]]); }
};
await onCondizioneToggle.call({ actor }, { preventDefault() {} }, { dataset: { condizione: "cieco" } });
await onCondizioneToggle.call({ actor }, { preventDefault() {} }, { dataset: { condizione: "muto" } });
await onCondizioneToggle.call({ actor }, { preventDefault() {} }, { dataset: { condizione: "boh" } });
assert.deepEqual(calls, [["delete", "Item", "item-cieco"], ["create", "Item", "Muto"]]);
await onCondizioneToggle.call({ actor: { ...actor, isOwner: false } }, { preventDefault() {} }, { dataset: { condizione: "muto" } });
assert.equal(warned, true);
assert.equal(calls.length, 2);

// La scheda: i quadratini nella cella, l'azione registrata.
const tratti = readFileSync(new URL("../templates/actor/parts/tratti.hbs", import.meta.url), "utf8");
assert.match(tratti, /data-action="condizioneToggle" data-condizione="\{\{entry\.id\}\}"/);
assert.doesNotMatch(tratti, /data-kind="condizione"/);
const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheet, /condizioneToggle: onCondizioneToggle/);
assert.match(sheet, /context\.condizioni = prepareCondizioni\(actor\.items\)/);

console.log("Condizioni tests passed.");
