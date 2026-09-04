import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { NOTE_FLAG, onNoteAdd, onNoteDelete, prepareNote } from "../scripts/note.js";

globalThis.game = { i18n: { format: (key) => key, localize: (key) => key } };
globalThis.ui = { notifications: { warn() {} } };
globalThis.foundry = { utils: { randomID: () => "nuovo" } };

const actor = (flags = {}) => ({
  isOwner: true, name: "Test", system: { locked: false }, updates: [],
  getFlag: (scope, key) => flags[key],
  async update(data) { this.updates.push(data); }
});

// I riquadri nell'ordine in cui sono stati aggiunti.
assert.deepEqual(prepareNote(actor()), []);
assert.deepEqual(prepareNote(actor({ [NOTE_FLAG]: { b: { title: "Dopo", text: "y", sort: 20 }, a: { title: "Prima", text: "x", sort: 10 } } })).map((row) => row.title), ["Prima", "Dopo"]);

// Il + aggiunge in fondo, il meno toglie.
let a = actor({ [NOTE_FLAG]: { a: { title: "Prima", text: "x", sort: 10 } } });
await onNoteAdd.call({ actor: a }, { preventDefault() {} });
assert.deepEqual(a.updates, [{ "flags.wod5e-mage.note.nuovo": { title: "", text: "", sort: 20 } }]);
a = actor({ [NOTE_FLAG]: { a: { title: "Prima", text: "x", sort: 10 } } });
await onNoteDelete.call({ actor: a }, { preventDefault() {} }, { dataset: { row: "a" } });
assert.deepEqual(a.updates, [{ "flags.wod5e-mage.note.-=a": null }]);
// Chiusa a chiave, niente.
a = actor(); a.system.locked = true;
await onNoteAdd.call({ actor: a }, { preventDefault() {} });
assert.deepEqual(a.updates, []);

// La pagina: titolo e testo per riquadro, niente campi del sistema; le Note stanno dopo l'Esperienza.
const note = readFileSync(new URL("../templates/actor/parts/note.hbs", import.meta.url), "utf8");
assert.match(note, /data-action="noteAdd"[\s\S]*flags\.wod5e-mage\.note\.\{\{row\.id\}\}\.title[\s\S]*data-action="noteDelete"[\s\S]*flags\.wod5e-mage\.note\.\{\{row\.id\}\}\.text/);
assert.doesNotMatch(note, /prose-mirror|system\.biography/);
const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheet, /esperienza: \{[\s\S]*?id: "esperienza"[\s\S]*?\},[\s\S]*?note: \{[\s\S]*?id: "note"/);
assert.match(sheet, /noteAdd: onNoteAdd/);

console.log("Note tests passed.");
