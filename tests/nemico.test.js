import assert from "node:assert/strict";
import {
  CAMPI,
  dadiDelTiro,
  danniMagick,
  disposizioneDi,
  idNuovo,
  letturaSoglia,
  NATURE,
  naturaDi,
  probabilitaSuccesso,
  righeOrdinate,
  riservaScalata,
  sogliaDagliAmbiti
} from "../scripts/nemico.js";
import { IMPOSSIBLE_SURCHARGE, SCOPES_PER_CAST } from "../scripts/scopes.js";

// La scheda del nemico (Blue, 25/9): i conti in funzioni pure.

// Il tiro: riserva meno soglia uguale dadi, mai sotto zero.
assert.equal(dadiDelTiro(7, 2), 5);
assert.equal(dadiDelTiro(3, 5), 0);
assert.equal(dadiDelTiro("6", "0"), 6);

// La lettura della soglia: contro una riserva da 6, i dadi che restano e quante volte su 100 riesce (1 − 0,5^N).
assert.deepEqual(letturaSoglia(3), { soglia: 3, riserva: 6, dadi: 3, percento: 88 });
assert.deepEqual(letturaSoglia(0), { soglia: 0, riserva: 6, dadi: 6, percento: 98 });
assert.deepEqual(letturaSoglia(6), { soglia: 6, riserva: 6, dadi: 0, percento: 0 });
assert.deepEqual(letturaSoglia(4, 8), { soglia: 4, riserva: 8, dadi: 4, percento: 94 });
assert.equal(probabilitaSuccesso(1), 0.5);
assert.equal(probabilitaSuccesso(0), 0);

// La riserva scalata dalle Condizioni: il numero già scalato e le voci che lo spiegano.
const pistola = riservaScalata(7, [{ nome: "Atterrato", value: -2 }]);
assert.deepEqual([pistola.base, pistola.malus, pistola.totale, pistola.cambiata], [7, -2, 5, true]);
assert.deepEqual(pistola.voci, [{ nome: "Atterrato", value: -2 }]);
assert.equal(pistola.testo, "7 -2 Atterrato");
const ferma = riservaScalata(5, []);
assert.deepEqual([ferma.totale, ferma.cambiata, ferma.testo], [5, false, "5"]);
assert.equal(riservaScalata(1, [{ nome: "Atterrato", value: -2 }]).totale, 0, "mai sotto zero");
assert.equal(riservaScalata(4, [{ nome: "Bonus", value: 2 }]).totale, 4, "i bonus non contano: la riserva resta quella scritta");

// La soglia a mano: la somma degli Ambiti alzati, al massimo tre, più 5 per l'impresa impossibile.
assert.deepEqual(sogliaDagliAmbiti({ potency: 3, range: 2 }), { soglia: 5, ambiti: [{ id: "range", level: 2 }, { id: "potency", level: 3 }], fuoriTetto: [], impossibile: false, extra: 0 });
assert.equal(sogliaDagliAmbiti({ potency: 3, range: 2 }, { impossibile: true }).soglia, 5 + IMPOSSIBLE_SURCHARGE);
assert.deepEqual(sogliaDagliAmbiti({}).ambiti, []);
assert.equal(sogliaDagliAmbiti({}).soglia, 0);
const quattro = sogliaDagliAmbiti({ targets: 1, duration: 2, impact: 1, potency: 3 });
assert.equal(quattro.ambiti.length, SCOPES_PER_CAST, "oltre il tetto non si conta");
assert.deepEqual(quattro.fuoriTetto, ["potency"]);
assert.equal(sogliaDagliAmbiti({ potency: 9 }).soglia, 7, "un livello fuori scala si riporta a 7");
assert.equal(sogliaDagliAmbiti({ potency: -2, range: 0 }).soglia, 0);

// I danni della Magick: l'Areté più la Potenza.
assert.equal(danniMagick(2, 3), 5);
assert.equal(danniMagick("3", null), 3);

// La Natura: quella scritta, o quella dello spcType del sistema; Risvegliato e Fatato sono in più.
assert.equal(NATURE.length, 7);
assert.equal(naturaDi({}, "hunter"), "hunter");
assert.equal(naturaDi({ natura: "fatato" }, "mortal"), "fatato");
assert.equal(naturaDi({ natura: "boh" }, "spirit"), "spirit");
assert.equal(naturaDi({}, "gatto"), "mortal");
assert.deepEqual(CAMPI, ["physical", "social", "mental"]);

// La disposizione del token: il colore del filo in cima.
assert.deepEqual([disposizioneDi(-1).id, disposizioneDi(0).id, disposizioneDi(1).id, disposizioneDi(-2).id, disposizioneDi("x").id, disposizioneDi(7).id], ["ostile", "neutrale", "amichevole", "segreto", "neutrale", "ostile"]);

// Gli id nuovi e le righe in ordine.
let n = 0;
assert.equal(idNuovo({ a: 1, b: 1 }, () => ["a", "b", "c"][n++]), "c");
assert.deepEqual(righeOrdinate({ x: { nome: "Zeta", sort: 0 }, y: { nome: "Alfa", sort: 0 }, z: { nome: "Beta", sort: -1 }, w: null }).map((row) => row.id), ["z", "y", "x"]);

console.log("nemico, conti: ok");
