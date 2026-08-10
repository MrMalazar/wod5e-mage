import assert from "node:assert/strict";
import {
  addParadoxToBalance,
  applyMagickBalanceDelta,
  paradoxGainForMagickType,
  prepareMagickTrack
} from "../scripts/magick-balance.js";

// Full track: the first Plus removes one opposing cell; the second Plus fills
// the newly empty cell from the selected side.
let balance = { quintessence: 5, paradox: 4 };
balance = applyMagickBalanceDelta(balance, "quintessence", 1);
assert.deepEqual(balance, { quintessence: 5, paradox: 3 });
balance = applyMagickBalanceDelta(balance, "quintessence", 1);
assert.deepEqual(balance, { quintessence: 6, paradox: 3 });

// The exact mixed sequence requested for Quintessence.
balance = { quintessence: 5, paradox: 4 };
balance = applyMagickBalanceDelta(balance, "quintessence", 1);
assert.deepEqual(balance, { quintessence: 5, paradox: 3 });
balance = applyMagickBalanceDelta(balance, "quintessence", -1);
assert.deepEqual(balance, { quintessence: 4, paradox: 3 });
balance = applyMagickBalanceDelta(balance, "paradox", 1);
assert.deepEqual(balance, { quintessence: 4, paradox: 4 });

// The same full-track behavior is symmetrical for Paradox.
balance = { quintessence: 4, paradox: 5 };
balance = applyMagickBalanceDelta(balance, "paradox", 1);
assert.deepEqual(balance, { quintessence: 3, paradox: 5 });
balance = applyMagickBalanceDelta(balance, "paradox", 1);
assert.deepEqual(balance, { quintessence: 3, paradox: 6 });

// Legacy pending data is discarded and never affects the visible result.
balance = applyMagickBalanceDelta(
  { quintessence: 4, paradox: 4, pending: "quintessence" },
  "paradox",
  -1
);
assert.deepEqual(balance, { quintessence: 4, paradox: 3 });

const actor = {
  getFlag: () => ({ quintessence: 5, paradox: 5 })
};
const track = prepareMagickTrack(actor);
assert.equal(track.cells.length, 9);
assert.equal(track.quintessence, 5);
assert.equal(track.paradox, 4);
assert.equal(track.cells.filter((cell) => cell.state === "quintessence").length, 5);
assert.equal(track.cells.filter((cell) => cell.state === "paradox").length, 4);
assert.equal(track.cells.filter((cell) => cell.state === "empty").length, 0);

// Il tipo di Magick dichiarato nel tiro di Areté: accidentale non muove nulla,
// volgare vale 1, con testimoni vale 2 e i due non si sommano.
assert.equal(paradoxGainForMagickType(), 0);
assert.equal(paradoxGainForMagickType({ coincidental: true }), 0);
assert.equal(paradoxGainForMagickType({ vulgar: true }), 1);
assert.equal(paradoxGainForMagickType({ witnesses: true }), 2);
assert.equal(paradoxGainForMagickType({ vulgar: true, witnesses: true }), 2);

// Il Paradosso automatico passa dalla stessa logica del pulsante +.
assert.deepEqual(
  addParadoxToBalance({ quintessence: 2, paradox: 1 }, 1),
  { quintessence: 2, paradox: 2 }
);
assert.deepEqual(
  addParadoxToBalance({ quintessence: 2, paradox: 1 }, 2),
  { quintessence: 2, paradox: 3 }
);
assert.deepEqual(
  addParadoxToBalance({ quintessence: 2, paradox: 1 }, 0),
  { quintessence: 2, paradox: 1 }
);
// Ruota piena: il primo passo libera una cella dalla Quintessenza, il secondo
// la riempie di Paradosso.
assert.deepEqual(
  addParadoxToBalance({ quintessence: 5, paradox: 4 }, 2),
  { quintessence: 4, paradox: 5 }
);
assert.deepEqual(
  addParadoxToBalance({ quintessence: 5, paradox: 4 }, 1),
  { quintessence: 4, paradox: 4 }
);

console.log("Magick balance behavior validated.");
