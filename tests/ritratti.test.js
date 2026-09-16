import assert from "node:assert/strict";
import { addRitratto, nextRitratto, prepareRitratti, removeRitratto, ritrattoUpdate } from "../scripts/ritratti.js";

// Senza bandiera: l'immagine dell'attore è l'unico ritratto.
let r = prepareRitratti(undefined, "a.png");
assert.deepEqual([r.list, r.index, r.count, r.position, r.many], [["a.png"], 0, 1, 1, false]);
// L'immagine dell'attore entra sempre nella lista, e quel che si vede è lei.
r = prepareRitratti({ list: ["b.png", "c.png"], index: 1 }, "c.png");
assert.deepEqual([r.list, r.index, r.position, r.many], [["b.png", "c.png"], 1, 2, true]);
r = prepareRitratti({ list: ["b.png", "c.png"], index: 1 }, "z.png");
assert.deepEqual([r.list, r.index], [["z.png", "b.png", "c.png"], 0]);
// Doppioni e vuoti spariscono.
assert.deepEqual(prepareRitratti({ list: ["a.png", "", "a.png", " b.png "] }, "a.png").list, ["a.png", "b.png"]);

// Il giro: dall'ultimo si torna al primo.
r = prepareRitratti({ list: ["a.png", "b.png", "c.png"], index: 2 }, "c.png");
assert.deepEqual(nextRitratto(r), { list: ["a.png", "b.png", "c.png"], index: 0, img: "a.png" });
assert.deepEqual(nextRitratto(prepareRitratti({ list: ["a.png", "b.png"] }, "a.png")).img, "b.png");
assert.deepEqual(nextRitratto({ list: [], index: 0 }), { list: [], index: 0, img: "" });

// Aggiungere: il nuovo diventa quello che si vede; uno già in lista si sceglie e basta.
assert.deepEqual(addRitratto(r, "d.png"), { list: ["a.png", "b.png", "c.png", "d.png"], index: 3, img: "d.png" });
assert.deepEqual(addRitratto(r, "b.png"), { list: ["a.png", "b.png", "c.png"], index: 1, img: "b.png" });

// Togliere: via quello che si vede, resta il precedente; mai sotto uno.
assert.deepEqual(removeRitratto(r), { list: ["a.png", "b.png"], index: 1, img: "b.png" });
assert.deepEqual(removeRitratto(prepareRitratti({ list: ["a.png", "b.png"], index: 0 }, "a.png")), { list: ["b.png"], index: 0, img: "b.png" });
assert.deepEqual(removeRitratto(prepareRitratti({ list: ["a.png"] }, "a.png")), { list: ["a.png"], index: 0, img: "a.png" });

// L'aggiornamento tocca bandiera, immagine e token prototipo insieme.
assert.deepEqual(ritrattoUpdate({ list: ["a.png", "b.png"], index: 1, img: "b.png" }), {
  "flags.wod5e-mage.ritratti": { list: ["a.png", "b.png"], index: 1 },
  img: "b.png",
  "prototypeToken.texture.src": "b.png"
});
assert.deepEqual(Object.keys(ritrattoUpdate({ list: [], index: 0, img: "" })), ["flags.wod5e-mage.ritratti"]);

console.log("ritratti: ok");
