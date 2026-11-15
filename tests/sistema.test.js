import assert from "node:assert/strict";
import {
  ARETE_MAX,
  BONUS_MAX,
  cerchiaAperta,
  condizioniSulTiro,
  confronto,
  contaDanni,
  contaSuccessi,
  contoAmbiti,
  dadiAvanzamenti,
  dadiDelTiro,
  dadiRitirabili,
  dadiRossi,
  dannoDelColpo,
  esito,
  faccia,
  leggiRossi,
  paradossoDelLancio,
  prezzoAmmesso,
  PX_ARETE,
  quintessenzaDelSacrificio,
  RITIRO_MAX,
  SCALA_DIFFICOLTA,
  SOGLIA_MAGICK_MAX,
  sogliaAbilita,
  sogliaFissa,
  sogliaMagick,
  sogliaSaggezza,
  successiDelLancio,
  ustione
} from "../scripts/sistema.js";

// Il dado: la vuota da 1 a 5, la scintilla da 6 a 9, la stellina sul 10.
assert.deepEqual([1, 5, 6, 9, 10].map(faccia), ["vuota", "vuota", "scintilla", "scintilla", "stellina"]);
assert.equal(faccia({ result: 7 }), "scintilla", "anche i dadi di Foundry, col loro result");

// Le stelline contano a coppie: ogni coppia 4 successi, la spaiata uno.
assert.equal(contaSuccessi([10]).successi, 1);
assert.equal(contaSuccessi([10, 10]).successi, 4);
assert.equal(contaSuccessi([10, 10, 10]).successi, 5, "tre stelline fanno 5 successi");
assert.equal(contaSuccessi([10, 10, 10, 10]).successi, 8, "quattro ne fanno 8");
assert.equal(contaSuccessi([6, 9, 10, 10, 3]).successi, 6);
assert.equal(contaSuccessi([{ result: 9 }, { result: 9, active: false }, { result: 8, discarded: true }]).successi, 1, "i dadi scartati non contano");

// Il cancello di Marco: Destrezza 4, Atletica 3, il Parkour. Riserva 8, soglia 2.
{
  const dadi = dadiDelTiro({ tratti: 7, specializzazione: 1 });
  assert.equal(dadi.dadi, 8);
  const tiro = contaSuccessi([1, 2, 3, 4, 5, 5, 7, 9]);
  assert.equal(tiro.successi, 2, "il 7 e il 9 sono scintille");
  assert.deepEqual(esito({ successi: tiro.successi, soglia: 2 }), { successi: 2, soglia: 2, riuscito: true, margine: 0, mancano: 0 });
}

// Il margine: con 3 successi a soglia 2 è 1; il coltello fa i suoi danni più 1.
assert.equal(esito({ successi: 3, soglia: 2 }).margine, 1);
assert.equal(dannoDelColpo(2, esito({ successi: 3, soglia: 2 }).margine), 3);

// Il fallimento, e la Volontà che ritira fino a tre dadi falliti.
{
  const dadi = [1, 2, 3, 3, 4, 5, 5, 8];
  const primo = esito({ successi: contaSuccessi(dadi).successi, soglia: 2 });
  assert.equal(primo.riuscito, false);
  assert.equal(primo.mancano, 1, "c'è una scintilla sola, e ne servivano due");
  assert.equal(RITIRO_MAX, 3);
  assert.deepEqual(dadiRitirabili(dadi), [0, 1, 2, 3, 4, 5, 6], "si ritirano solo i falliti");
  // Marco ritira un 3, il 4 e un 5: escono 2, 4, 8.
  const dopo = [1, 2, 3, 2, 4, 5, 8, 8];
  assert.equal(esito({ successi: contaSuccessi(dopo).successi, soglia: 2 }).riuscito, true);
  assert.deepEqual(dadiRitirabili([{ result: 2, rosso: true }, { result: 3 }]), [1], "mai i rossi");
}

// La Vittoria a un prezzo: solo a chi ha tirato almeno un dado e ha fallito.
assert.equal(prezzoAmmesso({ dadi: 8, riuscito: false }), true);
assert.equal(prezzoAmmesso({ dadi: 0, riuscito: false }), false, "chi non ha tirato non la può avere");
assert.equal(prezzoAmmesso({ dadi: 8, riuscito: true }), false);

// La soglia dei tiri di Abilità: da 1 a 7, mai sotto e mai sopra.
assert.equal(sogliaAbilita(0), 1);
assert.equal(sogliaAbilita(4), 4);
assert.equal(sogliaAbilita(9), 7);
assert.equal(Object.keys(SCALA_DIFFICOLTA).length, 7);

// Bonus: fino a +3 dadi; fuori dal tetto la Bussola e i Vantaggi (fino a 5).
assert.equal(BONUS_MAX, 3);
assert.equal(dadiDelTiro({ tratti: 6, specializzazione: 1, bonus: 1 }).dadi, 8, "la corda col gancio di Marco");
assert.equal(dadiDelTiro({ tratti: 6, bonus: 5 }).dadi, 9, "oltre +3 i bonus non contano");
assert.equal(dadiDelTiro({ tratti: 6, bonus: 5 }).bonusPersi, 2);
assert.equal(dadiDelTiro({ tratti: 6, bonus: 3, bussola: 1, vantaggi: 7 }).dadi, 15, "Bussola e Vantaggi stanno fuori dal tetto");
assert.equal(dadiDelTiro({ tratti: 6, bonus: 2, quintessenza: 3 }).dadi, 9, "la Quintessenza spesa sta nel tetto");

// Malus: i dadi in meno non hanno tetto; la riserva dimezzata si conta per ultima, per difetto.
assert.equal(dadiDelTiro({ tratti: 7, malus: 2 }).dadi, 5, "Marco ferito tira con 2 dadi in meno");
assert.equal(dadiDelTiro({ tratti: 7, malus: -2 }).dadi, 5);
assert.equal(dadiDelTiro({ tratti: 3, malus: 9 }).dadi, 0);
assert.equal(dadiDelTiro({ tratti: 7, dimezza: true }).dadi, 3);
assert.equal(dadiDelTiro({ tratti: 7, malus: 2, dimezza: true }).dadi, 2);

// Le Condizioni: 2 dadi in meno, riserva dimezzata, tiro fallito; le lievi un dado l'una.
assert.deepEqual(condizioniSulTiro([1]), { dadi: -2, dimezza: false, fallisce: false });
assert.deepEqual(condizioniSulTiro([2]), { dadi: 0, dimezza: true, fallisce: false });
assert.deepEqual(condizioniSulTiro([3]), { dadi: 0, dimezza: false, fallisce: true });
assert.deepEqual(condizioniSulTiro(["lieve", "lieve", 1]), { dadi: -4, dimezza: false, fallisce: false });

// Il confronto: la soglia fissa è metà della riserva, per eccesso.
assert.equal(sogliaFissa(5), 3, "con una riserva di 5 dadi la soglia è 3");
assert.equal(sogliaFissa(4), 2);
assert.equal(sogliaFissa(0), 1);
assert.deepEqual(confronto(4, 2), { vince: "agisce", margine: 2 });
assert.deepEqual(confronto(2, 2), { vince: "pari", margine: 0 });

// Il conto degli Ambiti, in piccolo: Areté 1, Epicità 2, Precisione 1. Soglia 2.
{
  const conto = contoAmbiti([{ id: "epicita", level: 2 }, { id: "precisione", level: 1 }, { id: "bersagli", level: 0 }], 1);
  assert.equal(conto.base, 2);
  assert.equal(conto.baseId, "epicita");
  assert.deepEqual(conto.aggiunte, [], "la Precisione è pari all'Areté e non aggiunge niente");
  assert.equal(conto.soglia, 2);
}

// In grande: Areté 2, Potenza 4, Epicità 3, Bersagli 2. Soglia 5, 3 col premio.
{
  const ambiti = [{ id: "epicita", level: 3 }, { id: "bersagli", level: 2 }, { id: "potenza", level: 4 }];
  const conto = contoAmbiti(ambiti, 2);
  assert.equal(conto.baseId, "potenza");
  assert.deepEqual(conto.aggiunte, ["epicita"], "l'Epicità sta sopra l'Areté; i Bersagli no");
  assert.equal(conto.soglia, 5);
  assert.equal(sogliaMagick({ ambiti, arete: 2 }).soglia, 5);
  assert.equal(sogliaMagick({ ambiti, arete: 2, premio: true }).soglia, 3, "il premio la abbassa di quant'è l'Areté");
}

// Con Areté 3 gli Ambiti a 1, 2 e 3 non aggiungono niente, dal 4 in su aggiungono 1.
assert.equal(contoAmbiti([{ id: "a", level: 5 }, { id: "b", level: 3 }, { id: "c", level: 2 }, { id: "d", level: 4 }], 3).soglia, 6);
// Il conto si ferma a 10, e la soglia non scende sotto 1.
assert.equal(SOGLIA_MAGICK_MAX, 10);
assert.equal(contoAmbiti(["a", "b", "c", "d", "e", "f", "g"].map((id) => ({ id, level: 7 })), 1).grezzo, 13);
assert.equal(contoAmbiti(["a", "b", "c", "d", "e", "f", "g"].map((id) => ({ id, level: 7 })), 1).soglia, 10);
assert.equal(sogliaMagick({ ambiti: [{ id: "epicita", level: 1 }], arete: 5, premio: true }).soglia, 1);
assert.equal(sogliaMagick({ ambiti: [], arete: 1 }).soglia, 0, "senza Ambiti non c'è conto");
// Il Volgare aggravato alza la difficoltà fino a +3; gli altri sconti si fermano a −3.
assert.equal(sogliaMagick({ ambiti: [{ id: "epicita", level: 4 }], arete: 1, aggravio: 5 }).soglia, 7);
assert.equal(sogliaMagick({ ambiti: [{ id: "epicita", level: 6 }], arete: 1, sconto: 9 }).soglia, 3);

// Il Paradosso del lancio: l'Accidentale niente; il Volgare 1, +1 coi testimoni, +1 con la dissonanza.
assert.equal(paradossoDelLancio({}), 0);
assert.equal(paradossoDelLancio({ testimoni: true }), 0, "senza Volgare i testimoni non contano");
assert.equal(paradossoDelLancio({ volgare: true }), 1);
assert.equal(paradossoDelLancio({ volgare: true, testimoni: true }), 2);
assert.equal(paradossoDelLancio({ volgare: true, testimoni: true, dissonanza: true }), 3);

// I rossi: solo nei Volgari, tanti quante le celle di Paradosso dopo il lancio.
assert.equal(dadiRossi({ paradossoSullaRuota: 4, volgare: true }), 4);
assert.equal(dadiRossi({ paradossoSullaRuota: 4, volgare: false }), 0);
{
  const lettura = leggiRossi([1, 4, 7, 10]);
  assert.equal(lettura.occhi, 2, "l'occhio sta sull'1 e sul 10");
  assert.equal(lettura.contraccolpo, true);
  assert.equal(lettura.obbligo, true, "con un 10 i successi si prendono");
  assert.equal(lettura.successi, 2);
  assert.equal(leggiRossi([3, 6, 8]).contraccolpo, false);
  assert.equal(leggiRossi([10, 10, 10]).aggravati, 1, "ogni due 10 un danno diventa aggravato");
}
{
  // Il giocatore sceglie se prendere i successi dei rossi: se li prende il tiro è paradossale.
  const riserva = [2, 3, 7, 10];
  const rossi = [6, 8];
  assert.equal(successiDelLancio(riserva, rossi).successi, 2);
  assert.equal(successiDelLancio(riserva, rossi).paradossale, false);
  assert.equal(successiDelLancio(riserva, rossi, { prende: true }).successi, 4);
  assert.equal(successiDelLancio(riserva, rossi, { prende: true }).paradossale, true);
  // Col 10 la scelta non c'è, e le stelline dei rossi fanno coppia con le altre.
  const obbligato = successiDelLancio(riserva, [10, 2]);
  assert.equal(obbligato.paradossale, true);
  assert.equal(obbligato.successi, 5, "una scintilla e una coppia di stelline");
  assert.equal(successiDelLancio(riserva, []).paradossale, false, "senza rossi niente da prendere");
}

// L'Ustione vale la soglia; sceglie il Narratore; la Ruota si scarica in tutti e due i modi.
assert.deepEqual(ustione({ soglia: 5, dieci: 2, modo: "brucia", paradosso: 6, permanente: 1 }),
  { vale: 5, modo: "brucia", superficiali: 4, aggravati: 1, alNarratore: 0, scarica: 5 });
assert.deepEqual(ustione({ soglia: 5, dieci: 2, modo: "prende", paradosso: 3, permanente: 1 }),
  { vale: 5, modo: "prende", superficiali: 0, aggravati: 0, alNarratore: 5, scarica: 2 });

// Il dado dei danni: la vuota niente, la scintilla 2, la stellina 4.
assert.equal(contaDanni([3, 6, 10]), 6);

// Le Formule: +1 dado a 2 avanzamenti, +2 a 4, +3 a 7.
assert.deepEqual([0, 1, 2, 3, 4, 6, 7, 12].map(dadiAvanzamenti), [0, 0, 1, 1, 2, 2, 3, 3]);

// L'Areté: da 1 a 5, 15 PX a pallino; con Areté 1 la seconda cerchia, poi una per pallino.
assert.equal(ARETE_MAX, 5);
assert.equal(PX_ARETE, 15);
assert.deepEqual([1, 2, 3, 4, 5].map(cerchiaAperta), [2, 3, 4, 5, 5]);

// Il Sacrificio: un superficiale vale 1 punto di Quintessenza, un aggravato 3.
assert.equal(quintessenzaDelSacrificio("superficiale"), 1);
assert.equal(quintessenzaDelSacrificio("aggravato"), 3);

// Il premio come numero: un potere che lo raddoppia dice lui di quanto scende la soglia.
{
  const grande = [{ id: "potency", level: 4 }, { id: "epic", level: 3 }, { id: "targets", level: 2 }];
  assert.equal(sogliaMagick({ ambiti: grande, arete: 2, premio: true }).soglia, 3);
  assert.equal(sogliaMagick({ ambiti: grande, arete: 2, premio: 2 }).soglia, 3);
  assert.equal(sogliaMagick({ ambiti: grande, arete: 2, premio: 4 }).soglia, 1, "il premio doppio, e mai sotto 1");
  assert.equal(sogliaMagick({ ambiti: grande, arete: 2, premio: 0 }).soglia, 5);
  assert.equal(sogliaMagick({ ambiti: grande, arete: 2, premio: false }).soglia, 5);
}

// Il tiro di Saggezza (Blue, 15/11): successi pari al gradino dell'atto, da 1 a 7.
assert.deepEqual([0, 1, 4, 7, 9].map(sogliaSaggezza), [1, 1, 4, 7, 7]);
assert.equal(esito({ successi: 3, soglia: sogliaSaggezza(3) }).riuscito, true);
assert.equal(esito({ successi: 2, soglia: sogliaSaggezza(3) }).mancano, 1);

console.log("Sistema: test passati.");
