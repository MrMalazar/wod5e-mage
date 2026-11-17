/**
 * Il Sistema (Blue, 11-14/11/2026; il testo intero sta nel documento di
 * progetto «Sistema»). Il tiro torna a successi contati: si tira TUTTA la
 * riserva e servono successi pari o superiori alla soglia. La soglia non
 * toglie più dadi, il dado che riusciva dall'8 è uscito dal gioco, le
 * stelline contano a coppie, il margine è quello che avanza oltre la soglia.
 *
 * Qui stanno le regole del tiro in funzioni pure, senza Foundry: sono il
 * motore su cui il modulo si riallinea, un pezzo per volta (ramo-c.js resta
 * finché ogni chiamata non è passata di qua). Si provano con
 * tests/sistema.test.js, sugli esempi del documento.
 */

/** La faccia vuota sta da 1 a 5, la scintilla da 6 a 9, la stellina sul 10. */
export const RIUSCITA_DA = 6;
export const STELLINA = 10;

/** Ogni coppia di stelline vale 4 successi; la stellina spaiata ne vale uno. */
export const SUCCESSI_PER_COPPIA = 4;

/** La soglia dei tiri di Abilità va da 1 a 7, mai sotto e mai sopra. */
export const SOGLIA_MIN = 1;
export const SOGLIA_ABILITA_MAX = 7;

/** Nei lanci di Magick il conto si ferma a 10 (Blue, 14/11). */
export const SOGLIA_MAGICK_MAX = 10;

/** I bonus si fermano in tutto a +3 dadi o a −3 alla difficoltà. */
export const BONUS_MAX = 3;

/** I dadi dei Vantaggi arrivano a 5, fuori dal tetto dei bonus. */
export const VANTAGGI_MAX = 5;

/** L'Areté va da 1 a 5 (Blue, 14/11) e ogni pallino costa 15 PX, sempre gli stessi. */
export const ARETE_MIN = 1;
export const ARETE_MAX = 5;
export const PX_ARETE = 15;

/** Una penalità toglie come minimo 2 dadi; una maggiore alza la difficoltà da +1 a +3. */
export const MALUS_DADI = 2;
export const MALUS_DIFFICOLTA_MAX = 3;

/** Con la Volontà si ritirano fino a tre dadi falliti, mai i rossi. */
export const RITIRO_MAX = 3;

/** La scala della difficoltà dei tiri di Abilità, dal compito di routine al limite dell'umano. */
export const SCALA_DIFFICOLTA = Object.freeze({
  1: "routine",
  2: "elementare",
  3: "moderata",
  4: "impegnativa",
  5: "difficile",
  6: "moltoDifficile",
  7: "limiteUmano"
});

function intero(value) {
  return Math.trunc(Number(value) || 0);
}

function conta(value) {
  return Math.max(intero(value), 0);
}

function stringi(value, min, max) {
  return Math.min(Math.max(intero(value), min), max);
}

const attivo = (dado) => dado?.active !== false && !dado?.discarded;
const numero = (dado) => Number(dado?.result ?? dado);

/** La faccia di un dado: «vuota», «scintilla» o «stellina». */
export function faccia(dado) {
  const value = numero(dado);
  if (value >= STELLINA) return "stellina";
  if (value >= RIUSCITA_DA) return "scintilla";
  return "vuota";
}

/**
 * I successi di una manciata di dadi. La vuota non vale niente, la scintilla
 * vale un successo, le stelline contano a coppie: ogni coppia 4 successi, la
 * spaiata uno. Tre stelline fanno 5 successi, quattro ne fanno 8.
 */
export function contaSuccessi(dadi = []) {
  const vivi = (Array.isArray(dadi) ? dadi : []).filter(attivo);
  const stelline = vivi.filter((dado) => faccia(dado) === "stellina").length;
  const scintille = vivi.filter((dado) => faccia(dado) === "scintilla").length;
  const coppie = Math.floor(stelline / 2);
  return {
    dadi: vivi.length,
    vuote: vivi.length - scintille - stelline,
    scintille,
    stelline,
    coppie,
    successi: scintille + coppie * SUCCESSI_PER_COPPIA + (stelline % 2)
  };
}

/**
 * L'esito: il tiro riesce quando i successi sono pari o superiori alla
 * soglia. Il margine sono i successi oltre la soglia; a tiro fallito
 * «mancano» dice quanti successi mancavano (il prezzo della Vittoria cresce
 * con loro).
 */
export function esito({ successi = 0, soglia = SOGLIA_MIN } = {}) {
  const fatti = conta(successi);
  const servono = Math.max(intero(soglia), SOGLIA_MIN);
  return {
    successi: fatti,
    soglia: servono,
    riuscito: fatti >= servono,
    margine: Math.max(fatti - servono, 0),
    mancano: Math.max(servono - fatti, 0)
  };
}

/** La soglia di un tiro di Abilità: la fissa il Narratore, da 1 a 7. */
export function sogliaAbilita(value) {
  return stringi(value, SOGLIA_MIN, SOGLIA_ABILITA_MAX);
}

/**
 * Il conto degli Ambiti (Blue, 11/11): fa da base l'Ambito più alto, Epicità
 * compresa; ogni altro Ambito usato aggiunge 1 se sta sopra il livello
 * dell'Areté, e niente se sta al suo livello o sotto. Lo 0 è la base
 * dell'Ambito e non conta mai. Il conto si ferma a 10.
 *
 * `ambiti` è una lista di { id, level }. Torna la base, chi la fa, gli
 * Ambiti che aggiungono, il conto grezzo e la soglia col tetto.
 */
export function contoAmbiti(ambiti = [], arete = ARETE_MIN) {
  const livello = stringi(arete, 0, ARETE_MAX);
  const usati = (Array.isArray(ambiti) ? ambiti : [])
    .map((entry) => ({ id: String(entry?.id ?? ""), level: conta(entry?.level) }))
    .filter((entry) => entry.level > 0);
  if (!usati.length) return { base: 0, baseId: "", aggiunte: [], grezzo: 0, soglia: 0 };
  const alto = usati.reduce((best, entry) => (entry.level > best.level ? entry : best), usati[0]);
  const aggiunte = usati.filter((entry) => entry !== alto && entry.level > livello).map((entry) => entry.id);
  const grezzo = alto.level + aggiunte.length;
  return {
    base: alto.level,
    baseId: alto.id,
    aggiunte,
    grezzo,
    soglia: Math.min(grezzo, SOGLIA_MAGICK_MAX)
  };
}

/**
 * La soglia di un lancio di Magick. Parte dal conto degli Ambiti; il premio
 * dell'Areté, quando il Narratore lo dà, la abbassa di quant'è l'Areté (fuori
 * dal tetto dei bonus); gli altri sconti si fermano a −3; un Volgare
 * aggravato la alza fino a +3. Resta fra 1 e 10.
 */
export function sogliaMagick({ ambiti = [], arete = ARETE_MIN, premio = false, sconto = 0, aggravio = 0, mano = 0, bussola = 0 } = {}) {
  const conto = contoAmbiti(ambiti, arete);
  // Il premio vale l'Areté; un numero lo dice chi lo cambia (un potere che lo raddoppia).
  const tolto = premio === true ? stringi(arete, 0, ARETE_MAX) : (premio === false ? 0 : conta(premio));
  const sconti = Math.min(conta(sconto), BONUS_MAX);
  const aggravi = Math.min(conta(aggravio), MALUS_DIFFICOLTA_MAX);
  // La mano del Narratore (Blue, 15/11): la difficoltà che alza o abbassa lui è libera, senza il tetto dei ±3.
  const aMano = intero(mano);
  // La Bussola (la scala del 16/11): −1 a favore col gesto diverso, +1 contro dalla seconda volta; fuori dal tetto.
  const daBussola = intero(bussola);
  const soglia = conto.soglia ? stringi(conto.soglia + aggravi - tolto - sconti + aMano + daBussola, SOGLIA_MIN, SOGLIA_MAGICK_MAX) : 0;
  return { ...conto, premio: tolto, sconto: sconti, aggravio: aggravi, mano: aMano, bussola: daBussola, soglia };
}

/**
 * La mano del Narratore sulla soglia va oltre il metro delle penalità
 * (Blue, 15/11): può farlo, ma oltre +3 o −3 il numero si segna in rosso,
 * a ricordarglielo.
 */
export function oltreIlMetro(mano) {
  return Math.abs(intero(mano)) > MALUS_DIFFICOLTA_MAX;
}

/**
 * Il Paradosso che un lancio dà al mago (Blue, 14/11): l'Accidentale niente;
 * il Volgare 1 punto, più 1 coi testimoni e più 1 con la dissonanza.
 */
export function paradossoDelLancio({ volgare = false, testimoni = false, dissonanza = false } = {}) {
  if (!volgare) return 0;
  return 1 + (testimoni ? 1 : 0) + (dissonanza ? 1 : 0);
}

/**
 * Le Condizioni sul tiro: il primo grado toglie 2 dadi, il secondo dimezza
 * la riserva, il terzo fa fallire il tiro; le lievi tolgono un dado
 * ciascuna e si sommano. `gradi` è la lista dei gradi accesi che pesano su
 * questo tiro: "lieve", 1, 2 o 3.
 */
export function condizioniSulTiro(gradi = []) {
  const lista = Array.isArray(gradi) ? gradi : [];
  const lievi = lista.filter((grado) => grado === "lieve").length;
  const primi = lista.filter((grado) => Number(grado) === 1).length;
  return {
    dadi: 0 - (lievi + primi * MALUS_DADI),
    dimezza: lista.some((grado) => Number(grado) === 2),
    fallisce: lista.some((grado) => Number(grado) === 3)
  };
}

/**
 * I dadi che si prendono in mano. La riserva è Attributo più Abilità, col
 * dado della Specializzazione quando c'entra. I bonus (circostanze, oggetti,
 * Supporto e Armonia, la Quintessenza spesa: Blue, 15/11) si fermano in tutto a +3; fuori
 * dal tetto stanno i dadi della Bussola (2 a favore; contro sono 2 in meno,
 * la scala del 16/11) e i dadi dei Vantaggi, fino a 5. I dadi in meno non
 * hanno tetto: si tolgono tutti. La riserva dimezzata si conta per ultima,
 * per difetto.
 */
export function dadiDelTiro({
  tratti = 0,
  specializzazione = 0,
  bonus = 0,
  quintessenza = 0,
  bussola = 0,
  vantaggi = 0,
  malus = 0,
  dimezza = false,
  ritocco = 0
} = {}) {
  const riserva = conta(tratti) + conta(specializzazione);
  const chiesti = conta(bonus) + conta(quintessenza);
  const dentro = Math.min(chiesti, BONUS_MAX);
  const daBussola = intero(bussola);
  const fuori = Math.max(daBussola, 0) + Math.min(conta(vantaggi), VANTAGGI_MAX);
  // I dadi in meno si possono scrivere «2» o «−2»: si tolgono comunque. La Bussola contro toglie i suoi.
  const tolti = Math.abs(intero(malus)) + Math.max(-daBussola, 0);
  const prima = Math.max(riserva + dentro + fuori - tolti + intero(ritocco), 0);
  return {
    riserva,
    bonus: dentro,
    bonusPersi: chiesti - dentro,
    fuoriTetto: fuori,
    malus: tolti,
    dimezzata: Boolean(dimezza),
    dadi: dimezza ? Math.floor(prima / 2) : prima
  };
}

/**
 * La soglia fissa di chi è preso di mira nelle scene veloci, nemico o mago:
 * metà della riserva con cui si difende, per eccesso. Con 5 dadi è 3.
 */
export function sogliaFissa(riserva) {
  return Math.max(Math.ceil(conta(riserva) / 2), SOGLIA_MIN);
}

/** Il confronto, quando lo scontro conta: tirano tutti e due e si confrontano i successi. */
export function confronto(successiChiAgisce, successiChiResiste) {
  const a = conta(successiChiAgisce);
  const b = conta(successiChiResiste);
  return { vince: a > b ? "agisce" : a < b ? "resiste" : "pari", margine: Math.abs(a - b) };
}

/** I danni di un colpo: quelli dell'arma più il margine. */
export function dannoDelColpo(arma, margine) {
  return conta(arma) + conta(margine);
}

/**
 * Il dado dei danni della Potenza: la vuota non fa danni, la scintilla ne fa
 * 2, la stellina 4.
 */
export function contaDanni(dadi = []) {
  const { scintille, stelline } = contaSuccessi(dadi);
  return scintille * 2 + stelline * 4;
}

/**
 * I dadi che la Volontà può ritirare: i falliti, fino a tre, mai i rossi.
 * Torna gli indici nella lista, nell'ordine in cui stanno.
 */
export function dadiRitirabili(dadi = []) {
  return (Array.isArray(dadi) ? dadi : [])
    .map((dado, index) => ({ dado, index }))
    .filter(({ dado }) => attivo(dado) && !dado?.rosso && faccia(dado) === "vuota")
    .map(({ index }) => index);
}

/** La Vittoria a un prezzo: il Narratore la può offrire solo a chi ha tirato almeno un dado e ha fallito. */
export function prezzoAmmesso({ dadi = 0, riuscito = false } = {}) {
  return conta(dadi) >= 1 && !riuscito;
}

/**
 * I rossi di un lancio Volgare: tanti quante le celle di Paradosso sulla
 * Ruota, contate dopo il Paradosso che il lancio ha dato.
 */
export function dadiRossi({ paradossoSullaRuota = 0, volgare = false } = {}) {
  return volgare ? conta(paradossoSullaRuota) : 0;
}

/**
 * La lettura dei rossi. L'occhio sta sull'1 e sul 10: se ne esce uno scatta
 * il Contraccolpo, che l'effetto sia riuscito o no. Con un 10 i successi dei
 * rossi si prendono per forza, e il tiro è paradossale. Ogni due 10 un danno
 * dell'Ustione diventa aggravato.
 */
export function leggiRossi(rossi = []) {
  const vivi = (Array.isArray(rossi) ? rossi : []).filter(attivo);
  const uni = vivi.filter((dado) => numero(dado) === 1).length;
  const dieci = vivi.filter((dado) => numero(dado) >= STELLINA).length;
  return {
    dadi: vivi.length,
    occhi: uni + dieci,
    contraccolpo: uni + dieci > 0,
    obbligo: dieci > 0,
    aggravati: Math.floor(dieci / 2),
    successi: contaSuccessi(vivi).successi
  };
}

/**
 * I successi del lancio. Il giocatore può prendere i successi dei rossi e
 * aggiungerli ai suoi: allora il tiro diventa paradossale, che riesca o che
 * fallisca, e le stelline dei rossi contano come le altre (fanno coppia con
 * quelle della riserva). Con un 10 sui rossi la scelta non c'è.
 */
export function successiDelLancio(riserva = [], rossi = [], { prende = false } = {}) {
  const lettura = leggiRossi(rossi);
  const presi = lettura.dadi > 0 && (prende || lettura.obbligo);
  const conto = contaSuccessi(presi ? [...riserva, ...rossi] : riserva);
  return { ...conto, paradossale: presi, obbligo: lettura.obbligo, contraccolpo: lettura.contraccolpo };
}

/**
 * L'Ustione del Contraccolpo vale quanto la soglia dell'incantesimo. Come
 * colpisce lo sceglie il Narratore: «brucia» (altrettanti danni superficiali
 * sulla Salute, uno aggravato ogni due 10 sui rossi) o «prende» (altrettanti
 * punti di Paradosso nella sua riserva). In tutti e due i modi la Ruota del
 * mago si scarica di altrettanti punti, fin dove ne ha; il permanente resta.
 */
export function ustione({ soglia = 0, dieci = 0, modo = "brucia", paradosso = 0, permanente = 0 } = {}) {
  const vale = conta(soglia);
  const aggravati = modo === "brucia" ? Math.min(Math.floor(conta(dieci) / 2), vale) : 0;
  const scaricabile = Math.max(conta(paradosso) - conta(permanente), 0);
  return {
    vale,
    modo: modo === "prende" ? "prende" : "brucia",
    superficiali: modo === "prende" ? 0 : vale - aggravati,
    aggravati,
    alNarratore: modo === "prende" ? vale : 0,
    scarica: Math.min(vale, scaricabile)
  };
}

/**
 * Gli avanzamenti di una Formula danno dadi al suo tiro: +1 a 2
 * avanzamenti, +2 a 4, +3 a 7. Nelle Formule il premio dell'Areté non vale.
 */
export function dadiAvanzamenti(avanzamenti) {
  const fatti = conta(avanzamenti);
  if (fatti >= 7) return 3;
  if (fatti >= 4) return 2;
  if (fatti >= 2) return 1;
  return 0;
}

/** La cerchia dei poteri che l'Areté apre: con Areté 1 la seconda, ogni pallino la successiva. */
export function cerchiaAperta(arete) {
  return Math.min(stringi(arete, ARETE_MIN, ARETE_MAX) + 1, ARETE_MAX);
}

/** Il Sacrificio: un danno superficiale vale 1 punto di Quintessenza, un aggravato ne vale 3. */
export function quintessenzaDelSacrificio(danno) {
  return danno === "aggravato" ? 3 : 1;
}

/**
 * Il tiro di Saggezza (verdetto di Blue del 15/11/2026): Fermezza più
 * Autocontrollo, tutta la riserva, e servono successi pari al gradino
 * dell'atto, da 1 a 7 come la tavola della gravità.
 */
export function sogliaSaggezza(gradino) {
  return stringi(gradino, SOGLIA_MIN, SOGLIA_ABILITA_MAX);
}
