import assert from "node:assert/strict";
import {
  ambitiAMano,
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
  segnoDi,
  sogliaDagliAmbiti,
  vociTesto,
  datiNemico,
  magickDelNemico
} from "../scripts/nemico.js";
import { IMPOSSIBLE_SURCHARGE, SCOPES_PER_CAST, scopeLensIds } from "../scripts/scopes.js";

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

// La mano del Narratore (Blue, 27/9): l'unico ritocco in più o in meno oltre alle Condizioni; entra nel conto e fra le voci, col segno.
const mano = riservaScalata(5, [{ nome: "Atterrato", value: -2 }], { nome: "Mano del Narratore", value: 2 });
assert.deepEqual([mano.totale, mano.mano, mano.cambiata, mano.testo], [5, 2, true, "5 -2 Atterrato +2 Mano del Narratore"]);
assert.deepEqual(mano.voci, [{ nome: "Atterrato", value: -2 }, { nome: "Mano del Narratore", value: 2 }]);
assert.equal(riservaScalata(4, [], { nome: "Mano del Narratore", value: -1 }).testo, "4 -1 Mano del Narratore");
assert.equal(riservaScalata(1, [], { nome: "Mano del Narratore", value: -3 }).totale, 0, "mai sotto zero");
assert.deepEqual([riservaScalata(4, [], { nome: "Mano del Narratore", value: 0 }).cambiata, riservaScalata(4, [], null).voci], [false, []]);
assert.deepEqual([segnoDi(2), segnoDi(-2), segnoDi(0), segnoDi("x")], ["+2", "-2", "0", "0"]);
assert.equal(vociTesto([{ nome: "A", value: -1 }, { nome: "B", value: 3 }]), "-1 A +3 B");
// Nella bandiera: un intero fra −10 e +10, 0 se manca.
assert.deepEqual([datiNemico({ manoNarratore: "2" }).manoNarratore, datiNemico({ manoNarratore: -30 }).manoNarratore, datiNemico({}).manoNarratore, datiNemico({ manoNarratore: 2.7 }).manoNarratore], [2, -10, 0, 2]);

// La soglia a mano: la somma degli Ambiti alzati, al massimo tre, più 5 per l'impresa impossibile.
assert.deepEqual(sogliaDagliAmbiti({ potency: 3, range: 2 }), { soglia: 5, ambiti: [{ id: "range", level: 2 }, { id: "potency", level: 3 }], fuoriTetto: [], impossibile: false, extra: 0 });
assert.equal(sogliaDagliAmbiti({ potency: 3, range: 2 }, { impossibile: true }).soglia, 5 + IMPOSSIBLE_SURCHARGE);
assert.deepEqual(sogliaDagliAmbiti({}).ambiti, []);
assert.equal(sogliaDagliAmbiti({}).soglia, 0);
const quattro = sogliaDagliAmbiti({ targets: 1, duration: 2, range: 1, potency: 3 });
assert.equal(quattro.ambiti.length, SCOPES_PER_CAST, "oltre il tetto non si conta");
assert.deepEqual(quattro.fuoriTetto, ["potency"]);
assert.equal(sogliaDagliAmbiti({ potency: 9 }).soglia, 7, "un livello fuori scala si riporta a 7");
assert.equal(sogliaDagliAmbiti({ impact: 4, potency: 2 }).soglia, 2, "l'Impatto (tolto il 29/9) non conta più");
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

// Le lenti a mano (29/9): Potenza, Condizioni e Precisione ne hanno tre; la
// terza della Potenza è l'Influenza, che non fa danni.
assert.deepEqual(scopeLensIds("potency"), ["potencyDamage", "potencyWeight", "potencyInfluence"]);
assert.deepEqual(scopeLensIds("conditions"), ["conditionsMalus", "conditionsComplexity", "conditionsBenefit"]);
assert.deepEqual(scopeLensIds("precision"), ["precision", "precisionNarrative", "precisionInfo"]);
assert.deepEqual(scopeLensIds("range"), ["range", "rangeNarrative"]);
const aMano = (lenti) => ambitiAMano({ livelli: { potency: 3 }, lenti }, { arete: 2 });
assert.deepEqual([aMano({}).righe.find((r) => r.id === "potency").lente.id, aMano({}).danni], ["potencyDamage", 5]);
assert.deepEqual([aMano({ potency: 2 }).righe.find((r) => r.id === "potency").lente.id, aMano({ potency: 2 }).danni], ["potencyInfluence", null]);
assert.equal(aMano({ potency: 9 }).righe.find((r) => r.id === "potency").lente.id, "potencyInfluence", "un indice oltre le lenti si ferma all'ultima");
assert.equal(aMano({ range: 2 }).righe.find((r) => r.id === "range").lente.id, "rangeNarrative", "la Portata ne ha due");
// Un effetto scritto prima del 29/9 con l'Impatto: la soglia si rifà sugli Ambiti che restano.
const vecchio = magickDelNemico(datiNemico({ magick: { on: true, arete: 2, effetti: { v: { nome: "Vecchio", soglia: 6, ambiti: { impact: 3, duration: 1, potency: 2 }, lentePotenza: "danni" } } } }));
assert.deepEqual([vecchio.effetti[0].soglia, vecchio.effetti[0].ambiti.map((a) => a.id), vecchio.effetti[0].danni], [3, ["duration", "potency"], 4]);
const influenza = magickDelNemico(datiNemico({ magick: { on: true, arete: 2, effetti: { v: { nome: "Pilota", soglia: 7, ambiti: { potency: 7 }, lentePotenza: "influenza" } } } }));
assert.deepEqual([influenza.effetti[0].soglia, influenza.effetti[0].danni], [7, null], "l'Influenza non fa danni");

console.log("nemico, conti: ok");
