import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { NOTE_DEFAULT, NOTE_FLAG, bindNoteBoard, noteBoardHeight, onNoteAdd, onNoteDelete, prepareNote } from "../scripts/note.js";

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

// La lavagna (6/9): ogni riquadro ha posizione e misura; chi non ce l'ha
// si mette in cascata; l'altezza della lavagna segue il riquadro più basso.
const board = prepareNote(actor({ [NOTE_FLAG]: { a: { title: "A", text: "", sort: 10 }, b: { title: "B", text: "", sort: 20, x: 400, y: 50, w: 200, h: 150 }, c: { title: "C", text: "", sort: 30, w: 10, h: 10 } } }));
assert.deepEqual(board.map((row) => [row.x, row.y, row.w, row.h]), [[0, 0, NOTE_DEFAULT.w, NOTE_DEFAULT.h], [400, 50, 200, 150], [48, 48, NOTE_DEFAULT.minW, NOTE_DEFAULT.minH]]);
assert.equal(noteBoardHeight(board), 48 + NOTE_DEFAULT.minH + 40 > NOTE_DEFAULT.h + 40 ? 48 + NOTE_DEFAULT.minH + 40 : NOTE_DEFAULT.h + 40);
assert.equal(noteBoardHeight([]), 240);
// Senza lavagna nel DOM (o chiusa a chiave) il cablaggio non fa nulla.
bindNoteBoard({ element: { querySelector: () => null } });
bindNoteBoard({ element: { querySelector: () => ({ dataset: { locked: "true" } }) } });

// Il + aggiunge in cascata, il meno toglie.
let a = actor({ [NOTE_FLAG]: { a: { title: "Prima", text: "x", sort: 10 } } });
await onNoteAdd.call({ actor: a }, { preventDefault() {} });
assert.deepEqual(a.updates, [{ "flags.wod5e-mage.note.nuovo": { title: "", text: "", sort: 20, x: NOTE_DEFAULT.step, y: NOTE_DEFAULT.step, w: NOTE_DEFAULT.w, h: NOTE_DEFAULT.h } }]);
a = actor({ [NOTE_FLAG]: { a: { title: "Prima", text: "x", sort: 10 } } });
await onNoteDelete.call({ actor: a }, { preventDefault() {} }, { dataset: { row: "a" } });
assert.deepEqual(a.updates, [{ "flags.wod5e-mage.note.-=a": null }]);
// Chiusa a chiave, niente.
a = actor(); a.system.locked = true;
await onNoteAdd.call({ actor: a }, { preventDefault() {} });
assert.deepEqual(a.updates, []);

// La pagina: titolo e testo per riquadro, niente campi del sistema; le Note stanno dopo l'Esperienza.
const note = readFileSync(new URL("../templates/actor/parts/note.hbs", import.meta.url), "utf8");
assert.match(note, /data-action="noteAdd"[\s\S]*wod5e-mage-note-board[\s\S]*style="left: \{\{row\.x\}\}px; top: \{\{row\.y\}\}px; width: \{\{row\.w\}\}px; height: \{\{row\.h\}\}px;"[\s\S]*wod5e-mage-note-grip[\s\S]*flags\.wod5e-mage\.note\.\{\{row\.id\}\}\.title[\s\S]*data-action="noteDelete"[\s\S]*flags\.wod5e-mage\.note\.\{\{row\.id\}\}\.text[\s\S]*wod5e-mage-note-resize/);
assert.doesNotMatch(note, /prose-mirror|system\.biography/);
const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheet, /esperienza: \{[\s\S]*?id: "esperienza"[\s\S]*?\},[\s\S]*?note: \{[\s\S]*?id: "note"/);
assert.match(sheet, /noteAdd: onNoteAdd/);
assert.match(sheet, /bindNoteBoard\(this\)/);

console.log("Note tests passed.");
