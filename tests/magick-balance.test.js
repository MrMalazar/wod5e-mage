import assert from "node:assert/strict";
import {
  applyMagickBalanceDelta,
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

console.log("Magick balance behavior validated.");
