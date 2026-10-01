import assert from "node:assert/strict";
import {
  ambitiAMano,
  bloccoDellaNatura,
  CAMPI,
  dadiDelTiro,
  danniMagick,
  DISPOSIZIONI_ORDINE,
  disposizioneDi,
  effettoDaPotere,
  idNuovo,
  letturaSoglia,
  modoDelNemico,
  NATURE,
  naturaDi,
  nemicoVuoto,
  numeroDelCampo,
  partiDelPotere,
  probabilitaSuccesso,
  profiloNatura,
  PUNTEGGIO_MAX,
  puntiAlClic,
  righeOrdinate,
  riservaScalata,
  segnoDi,
  sogliaDagliAmbiti,
  tipoDelPotere,
  versoDi,
  vociCreazione,
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

// La Natura: quella scritta, o quella dello spcType del sistema; Sonnambulo, Risvegliato e Fatato sono in più.
assert.equal(NATURE.length, 8);
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

// --- il rifacimento dell'1/10

// Lo standard delle Nature (Blue, 1/10): ogni Natura dice il blocco che accende e come si chiama il suo punteggio.
assert.deepEqual(NATURE.map((n) => [n.id, n.blocco, n.punteggio]), [
  ["mortal", "", ""],
  ["sonnambulo", "poteri", ""],
  ["risvegliato", "magick", "arete"],
  ["vampire", "poteri", "potenzaSangue"],
  ["werewolf", "poteri", "gnosi"],
  ["hunter", "poteri", ""],
  ["spirit", "poteri", "potere"],
  ["fatato", "poteri", ""]
]);
assert.ok(NATURE.every((n) => n.label === `WOD5E_MAGE.Nemico.Nature.${n.id}`));
assert.deepEqual([profiloNatura("werewolf").punteggio, profiloNatura("boh").id, profiloNatura(null).id], ["gnosi", "mortal", "mortal"]);
assert.equal(naturaDi({ natura: "sonnambulo" }, "vampire"), "sonnambulo", "la Natura scritta vince sullo spcType");

// Il blocco della Natura. Le parole vengono dai file di lingua: qui la chiave fa da parola.
const parola = (key) => key.split(".").pop();
const blocco = (natura, flag = {}) => bloccoDellaNatura(natura, datiNemico(flag), { localize: parola });
// Un PNG qualunque: nessun blocco.
assert.deepEqual([blocco("mortal").tipo, blocco("mortal").punteggio.on, blocco("mortal").magick], ["", false, false]);
// Il Risvegliato: la Magick con l'Areté (da 1 a 5), il nome non si riscrive.
const risvegliato = blocco("risvegliato", { magick: { arete: 3 }, punteggio: { nome: "Altro", valore: 9 } });
assert.deepEqual([risvegliato.tipo, risvegliato.titolo, risvegliato.magick, risvegliato.eredita], ["magick", "magick", true, false]);
assert.deepEqual(risvegliato.punteggio, { on: true, arete: true, nome: "arete", nomeScritto: "", nomeBase: "arete", valore: 3, campo: "magick.arete", min: 1, max: 5 });
// Il licantropo: i Poteri con la Gnosi; il nome scritto a mano vince su quello di partenza.
assert.deepEqual(blocco("werewolf", { punteggio: { valore: 4 } }).punteggio, { on: true, arete: false, nome: "gnosi", nomeScritto: "", nomeBase: "gnosi", valore: 4, campo: "punteggio.valore", min: 0, max: PUNTEGGIO_MAX });
assert.deepEqual([blocco("werewolf", { punteggio: { nome: "Rabbia", valore: 99 } }).punteggio.nome, blocco("werewolf", { punteggio: { nome: "Rabbia", valore: 99 } }).punteggio.valore], ["Rabbia", PUNTEGGIO_MAX]);
// Il cacciatore, il fatato, il sonnambulo: il punteggio non ha un nome di partenza, e senza nome non si mostra.
for (const id of ["hunter", "fatato", "sonnambulo"]) {
  assert.deepEqual([blocco(id).tipo, blocco(id).punteggio.on, blocco(id).punteggio.nomeBase], ["poteri", false, ""], id);
  assert.deepEqual([blocco(id, { punteggio: { nome: "Convinzione", valore: 2 } }).punteggio.on, blocco(id, { punteggio: { nome: "Convinzione", valore: 2 } }).punteggio.nome], [true, "Convinzione"], id);
}
// La Magick accesa col vecchio tasto resta anche con un'altra Natura, finché il Narratore non la toglie.
assert.deepEqual([blocco("vampire", { magick: { on: true, arete: 2 } }).tipo, blocco("vampire", { magick: { on: true, arete: 2 } }).eredita, blocco("mortal", { magick: { on: true } }).tipo, blocco("risvegliato", { magick: { on: true } }).eredita], ["magick", true, "magick", false]);

// I due modi: quello scelto; se nessuno l'ha scelto, Scrivi su un nemico vuoto e Gioca su uno scritto; chi non scrive vede Gioca.
assert.equal(nemicoVuoto(datiNemico({})), true);
assert.equal(nemicoVuoto(datiNemico({ natura: "vampire", fazione: "Anarchici", note: { vuole: "x" } })), true, "Natura, fazione e note non riempiono la scheda");
for (const flag of [{ soglie: { social: 2 } }, { casi: { a: {} } }, { azioni: { a: {} } }, { effetti: { a: {} } }, { magick: { effetti: { a: {} } } }]) assert.equal(nemicoVuoto(datiNemico(flag)), false);
assert.deepEqual([modoDelNemico(datiNemico({})), modoDelNemico(datiNemico({ soglie: { physical: 3 } })), modoDelNemico(datiNemico({ modo: "gioca" })), modoDelNemico(datiNemico({ soglie: { physical: 3 }, modo: "scrivi" })), modoDelNemico(datiNemico({ modo: "boh" }))], ["scrivi", "gioca", "gioca", "scrivi", "scrivi"]);
assert.equal(modoDelNemico(datiNemico({ modo: "scrivi" }), { puoScrivere: false }), "gioca");
// Il modo con cui la finestra si è aperta (1.33.2) vale finché nessuno ne sceglie uno: un nemico che si sta scrivendo
// resta in Scrivi anche quando non è più vuoto. Il modo scritto sulla scheda vince; chi non può scrivere vede Gioca.
assert.deepEqual([
  modoDelNemico(datiNemico({ soglie: { physical: 3 } }), { aperto: "scrivi" }),
  modoDelNemico(datiNemico({}), { aperto: "gioca" }),
  modoDelNemico(datiNemico({ soglie: { physical: 3 }, modo: "gioca" }), { aperto: "scrivi" }),
  modoDelNemico(datiNemico({ soglie: { physical: 3 } }), { aperto: "boh" }),
  modoDelNemico(datiNemico({}), { aperto: "scrivi", puoScrivere: false })
], ["scrivi", "gioca", "gioca", "gioca", "gioca"]);

// La freccia sul tasto: giù se il numero è sceso sotto quello scritto, su se è salito.
assert.deepEqual([versoDi(3, 5), versoDi(7, 5), versoDi(5, 5), versoDi("x", 0)], ["giu", "su", "", ""]);
// I punti dell'armatura: il clic porta lì il conto; sull'ultimo pieno ne toglie uno, così si arriva a zero.
assert.deepEqual([puntiAlClic(2, 3), puntiAlClic(3, 1), puntiAlClic(2, 2), puntiAlClic(1, 1), puntiAlClic(0, 1)], [3, 1, 1, 0, 1]);
// Un numero scritto in un campo: vuoto vale il minimo (o 0), e resta fra il minimo e il massimo.
assert.deepEqual([numeroDelCampo("", { min: "0", max: "20" }), numeroDelCampo("", { min: "1", max: "5" }), numeroDelCampo("9", { min: "1", max: "5" }), numeroDelCampo("-3", { min: "0", max: "20" }), numeroDelCampo("", { min: "-10", max: "10" }), numeroDelCampo("-4", { min: "-10", max: "10" }), numeroDelCampo("7"), numeroDelCampo("abc"), numeroDelCampo("3.9", { min: "0" })], [0, 1, 5, 0, 0, -4, 7, 0, 3]);
// La tendina della disposizione in Scrivi: dall'ostile al segreto.
assert.deepEqual(DISPOSIZIONI_ORDINE.map((key) => disposizioneDi(key).id), ["ostile", "neutrale", "amichevole", "segreto"]);
assert.deepEqual([disposizioneDi(-1).icona, disposizioneDi(1).value], ["fa-solid fa-skull", 1]);

// I poteri del manuale sul nemico: le parti si leggono dal catalogo di adesso, con la modifica del Narratore che vale per tutti.
const catalogo = [
  { id: "occhio", name: "Occhio di lince", spheres: ["mind", "any"], dot: 2, type: "attivo", kind: "attivo e passivo", text: "Effetto attivo (1 Quintessenza): Vedi nel buio.\nAccesso con Forze: anche nella nebbia.\n\nEffetto passivo (Sempre): Non sei mai Abbagliato.", attivo: "Vedi nel buio.\nAccesso con Forze: anche nella nebbia.", passivo: "Non sei mai Abbagliato.", amalgama: "", costoAttivo: "1 Quintessenza", cadenzaPassivo: "Sempre" },
  { id: "pelle", name: "Pelle dura", spheres: ["life"], dot: 1, type: "passivo", kind: "passivo", text: "Effetto passivo (Sempre): Un punto di armatura.", attivo: "", passivo: "Un punto di armatura.", amalgama: "", costoAttivo: "", cadenzaPassivo: "Sempre" }
];
const occhio = partiDelPotere("occhio", { catalog: catalogo, localize: parola });
assert.deepEqual([occhio.nome, occhio.grado, occhio.sfereTesto, occhio.attivo.misura, occhio.passivo.misura, occhio.attivo.vuota, occhio.passivo.vuota], ["Occhio di lince", 2, "mind", "1 Quintessenza", "Sempre", false, false]);
assert.deepEqual(occhio.attivo.voci, [{ chiave: "", testo: "Vedi nel buio.", accesso: false, con: false, sfere: [] }, { chiave: "Accesso con Forze", testo: "anche nella nebbia.", accesso: true, con: false, sfere: ["forces"] }]);
assert.deepEqual(partiDelPotere("pelle", { catalog: catalogo }).attivo.vuota, true);
assert.equal(partiDelPotere("occhio", { catalog: catalogo, mod: { passivo: "Riscritto dal Narratore." } }).passivo.testo, "Riscritto dal Narratore.");
assert.equal(partiDelPotere("non-c-e", { catalog: catalogo }), null, "un potere che non è nel catalogo non ha parti");
// La riga che il potere lascia sulla scheda: il nome, il tipo, la chiave del catalogo e il primo blocco del testo.
assert.deepEqual(effettoDaPotere(catalogo[0], { sort: 7 }), { nome: "Occhio di lince", testo: "Effetto attivo (1 Quintessenza): Vedi nel buio. Accesso con Forze: anche nella nebbia.", tipo: "attivo", catalogo: "occhio", sort: 7 });
assert.deepEqual([tipoDelPotere(catalogo[1]), effettoDaPotere(catalogo[1]).tipo, effettoDaPotere(null)], ["passivo", "passivo", null]);

// Il PNG di M6 nella finestra «Crea attore»: una voce per Natura. Lo spcType del sistema non c'entra (1.33.2).
const voci = vociCreazione({ localize: parola, format: (key, data) => `${parola(key)}:${data.natura}` });
assert.deepEqual(voci.map((v) => [v.natura, v.label]), [
  ["mortal", "Voce:mortal"],
  ["sonnambulo", "Voce:sonnambulo"],
  ["risvegliato", "Voce:risvegliato"],
  ["vampire", "Voce:vampire"],
  ["werewolf", "Voce:werewolf"],
  ["hunter", "Voce:hunter"],
  ["spirit", "Voce:spirit"],
  ["fatato", "Voce:fatato"]
]);
assert.ok(voci.every((v) => !("spcType" in v)));

console.log("nemico, conti: ok");
