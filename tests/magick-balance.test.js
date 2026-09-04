import assert from "node:assert/strict";
import {
  addParadoxToBalance,
  applyMagickBalanceDelta,
  getPersistentMagickResources,
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
  getFlag: (_m, key) => (key === "magickBalance" ? { quintessence: 5, paradox: 5 } : undefined)
};
const track = prepareMagickTrack(actor);
assert.equal(track.cells.length, 9);
assert.equal(track.quintessence, 5);
assert.equal(track.paradox, 4);
assert.equal(track.cells.filter((cell) => cell.state === "quintessence").length, 5);
assert.equal(track.cells.filter((cell) => cell.state === "paradox").length, 4);
assert.equal(track.cells.filter((cell) => cell.state === "empty").length, 0);

const persistentResources = getPersistentMagickResources({
  getFlag: () => ({ generatedQuintessence: "Nodo 3", permanentParadox: "2" })
});
assert.deepEqual(persistentResources, {
  generatedQuintessence: "Nodo 3",
  permanentParadox: 2
});

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

// Il Paradosso permanente è il pavimento: il meno si ferma lì, la
// Quintessenza non lo scalza, e le celle permanenti si distinguono.
balance = applyMagickBalanceDelta({ quintessence: 3, paradox: 2 }, "paradox", -1, 2);
assert.deepEqual(balance, { quintessence: 3, paradox: 2 });
balance = applyMagickBalanceDelta({ quintessence: 7, paradox: 2 }, "quintessence", 1, 2);
assert.deepEqual(balance, { quintessence: 7, paradox: 2 });
balance = applyMagickBalanceDelta({ quintessence: 6, paradox: 3 }, "quintessence", 1, 2);
assert.deepEqual(balance, { quintessence: 6, paradox: 2 });
{
  const { getMagickBalance } = await import("../scripts/magick-balance.js");
  const floored = {
    getFlag: (_m, key) => key === "magickBalance"
      ? { quintessence: 8, paradox: 0 }
      : { permanentParadox: 3 }
  };
  assert.deepEqual(getMagickBalance(floored), { quintessence: 6, paradox: 3, floor: 3 });
  const flooredTrack = prepareMagickTrack(floored);
  assert.equal(flooredTrack.cells.filter((cell) => cell.state === "paradox permanent").length, 3);
  assert.equal(flooredTrack.cells.filter((cell) => cell.state === "quintessence").length, 6);
}
