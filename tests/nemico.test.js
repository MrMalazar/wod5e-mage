import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  ambitiAMano,
  bloccoDellaNatura,
  CAMPI,
  dadiDelTiro,
  danniMagick,
  DISPOSIZIONI_ORDINE,
  disposizioneDi,
  effettoDaFormula,
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
  puoAlzare,
  PUNTEGGIO_MAX,
  puntiAlClic,
  righeOrdinate,
  riservaScalata,
  segnoDi,
  sogliaDagliAmbiti,
  sogliaDelCampo,
  valoreVoce,
  tipoDelPotere,
  versoDi,
  vociCreazione,
  vociTesto,
  datiNemico,
  magickDelNemico
} from "../scripts/nemico.js";
import { dannoDelNemico, testoEsito } from "../scripts/nemico-chat.js";
import { SCOPES_PER_CAST, scopeLensIds } from "../scripts/scopes.js";

// La scheda del nemico (Blue, 25/9): i conti in funzioni pure.

// Il tiro (il Sistema): si tira tutta la riserva, la soglia non toglie dadi; una Condizione di grado 2 la dimezza, per difetto.
assert.equal(dadiDelTiro(7), 7);
assert.equal(dadiDelTiro("6"), 6);
assert.equal(dadiDelTiro(7, { meta: true }), 3);
assert.equal(dadiDelTiro(-2), 0);

// La lettura della soglia: con una riserva da 6 dadi, quante volte su 100 si fanno i successi che servono
// (la scintilla vale uno, le stelline quattro a coppia). Sono i numeri della pagina «Prima e dopo del tiro».
assert.deepEqual(letturaSoglia(3), { soglia: 3, riserva: 6, percento: 67 });
assert.deepEqual([4, 5, 6].map((soglia) => letturaSoglia(soglia).percento), [39, 18, 8]);
assert.deepEqual(letturaSoglia(0), { soglia: 1, riserva: 6, percento: 98 }, "una soglia non scende sotto 1");
assert.deepEqual(letturaSoglia(2, 4), { soglia: 2, riserva: 4, percento: 69 });
assert.equal(probabilitaSuccesso(1), 0.5);
assert.equal(probabilitaSuccesso(0), 0);
assert.equal(Math.round(probabilitaSuccesso(2, 3) * 100), 1, "due dadi a soglia 3: solo la coppia di stelline");
assert.equal(Math.round(probabilitaSuccesso(8, 2) * 100), 96);

// La soglia di un campo: quella scritta; non scritta, la soglia fissa (metà della riserva, per eccesso).
assert.deepEqual(sogliaDelCampo(4, 9), { value: 4, fissa: false });
assert.deepEqual(sogliaDelCampo(0, 5), { value: 3, fissa: true }, "con 5 dadi la soglia è 3");
assert.deepEqual(sogliaDelCampo("", 0), { value: 1, fissa: true }, "mai sotto 1");

// La riserva scalata dalle Condizioni: il numero già scalato e le voci che lo spiegano.
const pistola = riservaScalata(7, [{ nome: "Atterrato", value: -2 }]);
assert.deepEqual([pistola.base, pistola.malus, pistola.totale, pistola.cambiata], [7, -2, 5, true]);
assert.deepEqual(pistola.voci, [{ nome: "Atterrato", value: -2 }]);
assert.equal(pistola.testo, "7 -2 Atterrato");
const ferma = riservaScalata(5, []);
assert.deepEqual([ferma.totale, ferma.cambiata, ferma.testo], [5, false, "5"]);
assert.equal(riservaScalata(1, [{ nome: "Atterrato", value: -2 }]).totale, 0, "mai sotto zero");
assert.equal(riservaScalata(4, [{ nome: "Bonus", value: 2 }]).totale, 4, "i bonus non contano: la riserva resta quella scritta");
// Una Condizione di grado 2 dimezza la riserva: una volta sola, per ultima, per difetto.
const offuscato = riservaScalata(7, [{ nome: "Atterrato", value: -2 }, { nome: "Offuscato", value: 0, meta: true }, { nome: "Avvelenato", value: 0, meta: true }]);
assert.deepEqual([offuscato.totale, offuscato.dimezzata, offuscato.cambiata, offuscato.testo], [2, true, true, "7 -2 Atterrato ½ Offuscato ½ Avvelenato"], "7 meno 2 fa 5, la metà è 2");
assert.deepEqual([riservaScalata(6, []).dimezzata, riservaScalata(6, [{ nome: "Offuscato", meta: true }]).totale], [false, 3]);
assert.equal(valoreVoce({ nome: "Offuscato", value: 0, meta: true }), "½");

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

// La soglia dagli Ambiti (il Sistema): fa da base il più alto, Epicità compresa (almeno 1), e ogni altro
// Ambito aggiunge 1 se sta sopra l'Areté; al massimo tre Ambiti alzati; il conto si ferma a 10.
assert.deepEqual(sogliaDagliAmbiti({ potency: 3, range: 2 }), { soglia: 4, epicita: 1, ambiti: [{ id: "epic", level: 1 }, { id: "range", level: 2 }, { id: "potency", level: 3 }], base: "potency", aggiunte: ["range"], fuoriTetto: [] });
assert.equal(sogliaDagliAmbiti({ potency: 3, range: 2 }, 2).soglia, 3, "con Areté 2 la Portata 2 non aggiunge niente");
assert.deepEqual([sogliaDagliAmbiti({ potency: 4, epic: 3, targets: 2 }, 2).soglia, sogliaDagliAmbiti({ potency: 4, epic: 3, targets: 2 }, 2).aggiunte], [5, ["epic"]], "l'esempio del Sistema: Potenza 4, Epicità 3, Bersagli 2 con Areté 2 fanno 5");
assert.equal(sogliaDagliAmbiti({ potency: 3, range: 2, epic: 7 }).soglia, 9, "un viaggio nel tempo: l'Epicità fa da base, gli altri due aggiungono 1");
assert.deepEqual(sogliaDagliAmbiti({}).ambiti, [{ id: "epic", level: 1 }]);
assert.equal(sogliaDagliAmbiti({}).soglia, 1);
const quattro = sogliaDagliAmbiti({ targets: 1, duration: 2, range: 1, potency: 3, epic: 2 });
assert.equal(quattro.ambiti.length, SCOPES_PER_CAST + 1, "oltre il tetto non si conta; l'Epicità sta fuori dal tetto");
assert.deepEqual(quattro.fuoriTetto, ["potency"]);
assert.equal(quattro.soglia, 3, "l'Epicità 2 fa da base, la Durata 2 sta sopra l'Areté e aggiunge 1; i due Ambiti a 1 no");
assert.equal(sogliaDagliAmbiti({ potency: 9 }).soglia, 7, "un livello fuori scala si riporta a 7");
assert.equal(sogliaDagliAmbiti({ impact: 4, potency: 2 }).soglia, 2, "l'Impatto (tolto il 29/9) non conta più");
assert.equal(sogliaDagliAmbiti({ potency: -2, range: 0 }).soglia, 1);
// L'Epicità si alza sempre; gli altri dentro il tetto dei tre, l'Epicità a parte.
assert.equal(puoAlzare({ targets: 1, range: 2, potency: 3 }, "epic", 5), true);
assert.equal(puoAlzare({ epic: 4, targets: 1, range: 2 }, "potency", 3), true);
assert.equal(puoAlzare({ targets: 1, range: 2, potency: 3 }, "duration", 1), false);

// I danni della Magick (il Sistema): un dado dei danni per livello di Potenza; l'Areté non c'entra.
assert.equal(danniMagick(3), 3);
assert.equal(danniMagick("2"), 2);
assert.equal(danniMagick(null), 0);

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

// Le lenti a mano (29/9, 2/10): la Potenza ne ha tre, la terza è l'Influenza,
// che non fa danni; Condizioni e Precisione due; l'Epicità una.
assert.deepEqual(scopeLensIds("potency"), ["potencyDamage", "potencyWeight", "potencyInfluence"]);
assert.deepEqual(scopeLensIds("conditions"), ["conditionsMalus", "conditionsComplexity"]);
assert.deepEqual(scopeLensIds("precision"), ["precision", "precisionInfo"]);
assert.deepEqual(scopeLensIds("range"), ["range", "rangeNarrative", "rangeBond"]);
assert.deepEqual(scopeLensIds("epic"), ["epic"]);
const aMano = (lenti) => ambitiAMano({ livelli: { potency: 3 }, lenti }, { arete: 2 });
assert.deepEqual([aMano({}).righe.find((r) => r.id === "potency").lente.id, aMano({}).danni], ["potencyDamage", 3], "tre dadi dei danni: la Potenza 3, senza l'Areté");
assert.deepEqual([aMano({ potency: 2 }).righe.find((r) => r.id === "potency").lente.id, aMano({ potency: 2 }).danni], ["potencyInfluence", null]);
assert.equal(aMano({ potency: 9 }).righe.find((r) => r.id === "potency").lente.id, "potencyInfluence", "un indice oltre le lenti si ferma all'ultima");
assert.equal(aMano({ range: 1 }).righe.find((r) => r.id === "range").lente.id, "rangeNarrative");
assert.equal(aMano({ range: 2 }).righe.find((r) => r.id === "range").lente.id, "rangeBond", "la Portata ne ha tre: la terza è il Legame (3/10)");
assert.equal(aMano({ range: 9 }).righe.find((r) => r.id === "range").lente.id, "rangeBond", "un indice oltre le lenti si ferma all'ultima");
// La mano (2/10): l'Epicità in cima, staccata, a 1 da sola; sette numeri per riga, niente 0.
{
  const mano = ambitiAMano({ livelli: { potency: 3 } }, { arete: 2, localize: (k) => k.split(".").pop() });
  assert.deepEqual(mano.righe.map((r) => r.id), ["epic", "targets", "conditions", "duration", "range", "potency", "precision"]);
  const epica = mano.righe[0];
  assert.deepEqual([epica.base, epica.level, epica.alto, epica.lente.label, epica.lente.altra], [true, 1, false, "", false]);
  assert.deepEqual(epica.pallini.map((p) => [p.value, p.on]), [[1, true], [2, false], [3, false], [4, false], [5, false], [6, false], [7, false]]);
  assert.equal(mano.righe.every((r) => r.pallini.length === 7 && r.pallini[0].value === 1), true, "niente pallino dello 0");
  assert.deepEqual([mano.soglia, mano.conto], [3, "potency 3"], "la Potenza 3 fa da base; l'Epicità 1 non aggiunge niente");
  assert.equal(Object.hasOwn(mano, "impossibile"), false);
  const prodigio = ambitiAMano({ livelli: { epic: 4, potency: 3 } }, { arete: 2, localize: (k) => k.split(".").pop() });
  assert.deepEqual([prodigio.righe[0].level, prodigio.righe[0].alto, prodigio.soglia, prodigio.conto], [4, true, 5, "epic 4 +1 potency"], "l'Epicità 4 fa da base, la Potenza 3 sta sopra l'Areté 2");
}
// La soglia di un effetto si conta sui suoi Ambiti con l'Areté del nemico: quella scritta alla vecchia non vale più.
// Un effetto scritto prima del 29/9 con l'Impatto: l'Impatto non conta, e l'Epicità 1 si vede fra gli Ambiti.
const vecchio = magickDelNemico(datiNemico({ magick: { on: true, arete: 2, effetti: { v: { nome: "Vecchio", soglia: 6, ambiti: { impact: 3, duration: 1, potency: 2 }, lentePotenza: "danni" } } } }));
assert.deepEqual([vecchio.effetti[0].soglia, vecchio.effetti[0].ambiti.map((a) => a.id), vecchio.effetti[0].danni], [2, ["epic", "duration", "potency"], 2], "la Potenza 2 fa da base, la Durata 1 non aggiunge; due dadi dei danni");
// Un vecchio effetto impossibile: il +5 di allora è l'Epicità 6, che fa da base.
const vecchioImpossibile = magickDelNemico(datiNemico({ magick: { on: true, arete: 2, effetti: { v: { nome: "Vecchio", soglia: 8, impossibile: true, ambiti: { impact: 3, potency: 2 } } } } }));
assert.deepEqual([vecchioImpossibile.effetti[0].soglia, vecchioImpossibile.effetti[0].ambiti.map((a) => [a.id, a.level])], [6, [["epic", 6], ["potency", 2]]]);
const scritto = magickDelNemico(datiNemico({ magick: { on: true, arete: 2, effetti: { v: { nome: "Scritto", soglia: 9, impossibile: true, ambiti: { potency: 4 } } } } }));
assert.deepEqual([scritto.effetti[0].soglia, scritto.effetti[0].ambiti.map((a) => [a.id, a.level]), Object.hasOwn(scritto.effetti[0], "impossibile")], [7, [["epic", 6], ["potency", 4]], false], "l'Epicità 6 fa da base, la Potenza 4 sta sopra l'Areté");
// Un effetto senza Ambiti tiene la soglia scritta, mai sotto 1.
const senzaAmbiti = magickDelNemico(datiNemico({ magick: { on: true, arete: 2, effetti: { a: { nome: "A mano", soglia: 4, ambiti: {} }, b: { nome: "Vuoto", soglia: 0, ambiti: {} } } } }));
assert.deepEqual(senzaAmbiti.effetti.map((e) => e.soglia).sort(), [1, 4]);
// La soglia a mano del Narratore: vale quando la scheda l'ha salvata diversa dal conto di allora (`conto`).
// Uguale al conto di allora, segue il conto di oggi (qui l'Areté è scesa a 2, e la Portata 3 aggiunge 1).
{
  const due = magickDelNemico(datiNemico({ magick: { on: true, arete: 2, effetti: { a: { nome: "A mano", soglia: 5, conto: 3, ambiti: { potency: 3 }, sort: 1 }, b: { nome: "Col conto", soglia: 3, conto: 3, ambiti: { potency: 3, range: 3 }, sort: 2 } } } }));
  assert.deepEqual(due.effetti.map((e) => [e.nome, e.soglia, e.conto, e.aMano]), [["A mano", 5, 3, true], ["Col conto", 4, 4, false]]);
  assert.match(due.effetti[0].sogliaHint, /SogliaEffettoMano/);
  assert.match(due.effetti[1].sogliaHint, /SogliaEffettoConto/);
}
// Il danno di un colpo riuscito del nemico: quello dell'arma più il margine; senza danno scritto, niente.
assert.deepEqual([dannoDelNemico({ danno: 4 }, 2), dannoDelNemico({ danno: 4 }, 0), dannoDelNemico({ danno: 0 }, 3), dannoDelNemico({}, 1)], [6, 4, 0, 0]);
{
  const parole = (k) => k.split(".").pop();
  const conDati = (k, d) => `${parole(k)} ${JSON.stringify(d)}`;
  assert.equal(testoEsito({ danno: 4, condizione: "Atterrato" }, 2, { localize: parole, format: conDati }), 'DannoMargine {"danno":6,"tipo":"Superficiali","arma":4,"margine":2} · Atterrato');
  assert.equal(testoEsito({ danno: 4, aggravato: true }, 0, { localize: parole, format: conDati }), 'DannoEsito {"danno":4,"tipo":"Aggravati"}');
  assert.equal(testoEsito({ condizione: "Offuscato" }, 3, { localize: parole, format: conDati }), "Offuscato");
}
const nuovo = magickDelNemico(datiNemico({ magick: { on: true, arete: 2, effetti: { v: { nome: "Nuovo", soglia: 6, ambiti: { potency: 2, epic: 3, range: 1 } } } } }));
assert.deepEqual([nuovo.effetti[0].soglia, nuovo.effetti[0].ambiti.map((a) => [a.id, a.level])], [3, [["epic", 3], ["range", 1], ["potency", 2]]]);
// Dal Grimorio (2/10): la Formula non ha ancora un'Epicità sua, e parte dall'1 di ogni lancio.
{
  const formula = { id: "danneggiare", name: "Danneggiare", use: "In genere", intro: "", thresholds: [{ base: 3, scopes: { potency: 3 } }] };
  const effetto = effettoDaFormula(formula);
  assert.deepEqual([effetto.soglia, effetto.ambiti, Object.hasOwn(effetto, "impossibile")], [3, { epic: 1, potency: 3 }, false]);
  // Costruire (Potenza 2, Durata 3): 4 con Areté 1, 3 con Areté 2, come nella pagina «Prima e dopo del tiro».
  const costruire = { id: "costruire", name: "Costruire", thresholds: [{ base: 5, scopes: { potency: 2, duration: 3 } }] };
  assert.deepEqual([effettoDaFormula(costruire).soglia, effettoDaFormula(costruire, { arete: 2 }).soglia], [4, 3]);
}
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

// Il CSS contro le regole dei moduli di Foundry (1.33.3), che stanno in un layer sotto quello dei moduli: vincono
// solo sulle proprietà che il modulo non nomina. I tasti nudi tolgono anche l'outline (Foundry lo mette a ogni
// button.active e a ogni button:focus: la linguetta accesa portava sempre un filo arancio); la tendina ha l'anello
// della scheda anche col clic; il quadretto della spunta è carta nei due temi, col suo bordo.
const css = readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8");
assert.match(css, /\.wod5e-mage-nemico \.window-content :where\(\.wod5e-mage-nemico-testa, \.wod5e-mage-nemico-corpo\) :where\(button\):where\(:not\([^)]*\)\) \{[^}]*\boutline: none;/s, "i tasti nudi della scheda del nemico tolgono l'outline di Foundry");
assert.match(css, /:is\(button, input, select, textarea, summary\):focus-visible,\s*[^{}]*\bselect:focus \{\s*outline: 2px solid var\(--nemico-fuoco\);/s, "la tendina col fuoco ha l'anello della scheda");
assert.match(css, /\.wod5e-mage-nemico \.window-content input\[type="checkbox"\] \{[^}]*--checkbox-background-color: transparent;[^}]*background: var\(--nemico-carta\);[^}]*border: 1px solid var\(--nemico-carta-bordo\);/s, "il quadretto della spunta è carta, col bordo della carta");

console.log("nemico, conti: ok");
