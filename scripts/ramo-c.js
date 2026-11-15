/**
 * Quel che resta del ramo C (11/9/2026) dopo il Sistema del 14/11: il tiro
 * non toglie più la soglia dalla riserva e non riesce più con un successo
 * solo, e le sue regole stanno in sistema.js (tutta la riserva, successi
 * pari alla soglia, stelline a coppie, margine oltre la soglia). Qui restano
 * tre cose: i tipi di lancio e il loro costo (del 29/9, ancora da portare sul
 * Sistema), i rossi a parte, e le letture che servono alle carte di prima,
 * che in chat si rileggono con le regole di allora (riuscita dal 6 o
 * dall'8, niente coppie). Tutto qui è puro: si prova fuori da Foundry.
 */

export const RAMO = "C";

/** La riuscita: dal 6 (Accidentale, Volgare, Abilità) o dall'8 (Volgare con testimoni). */
export const ORIGINAL_SUCCESS_FROM = 6;
export const ADVANCED_SUCCESS_FROM = 8;

/**
 * Le carte di prima della 0.91.0 non portano scritta la riuscita: erano
 * tutte all'8, e all'8 restano. Serve solo come ripiego.
 */
export const SUCCESS_FROM = ADVANCED_SUCCESS_FROM;

/** Da che numero riusciva una carta di prima: 6, oppure 8 con la difficoltà avanzata. */
export function successThreshold(advancedDifficulty = false) {
  return advancedDifficulty ? ADVANCED_SUCCESS_FROM : ORIGINAL_SUCCESS_FROM;
}

/** Il modificatore di Foundry che conta i successi da quel numero in su: `cs>5` per il 6, `cs>7` per l'8. */
export function successModifier(successFrom = ORIGINAL_SUCCESS_FROM) {
  const threshold = Math.max(Math.trunc(Number(successFrom) || ORIGINAL_SUCCESS_FROM), 1);
  return `cs>${threshold - 1}`;
}

/**
 * La riuscita scritta sulla carta, se c'è; altrimenti dalla difficoltà
 * avanzata segnata; altrimenti il ripiego (le carte vecchie: 8).
 */
export function resolveSuccessFrom(options = {}, fallback = SUCCESS_FROM) {
  const explicit = Math.trunc(Number(options?.successFrom));
  if (Number.isFinite(explicit) && explicit > 0) return explicit;
  if (typeof options?.advancedDifficulty === "boolean") {
    return successThreshold(options.advancedDifficulty);
  }
  return Math.max(Math.trunc(Number(fallback) || SUCCESS_FROM), 1);
}

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

const isActive = (result) => result?.active !== false && !result?.discarded;

export function isSuccess(result, { successFrom = SUCCESS_FROM } = {}) {
  return Number(result?.result ?? result) >= successFrom;
}

/**
 * Come si dividono i dadi (verdetto di Blue del 29/9/2026: «il paradosso non
 * si sostituisce più ai dadi che fai per tirare, ma viene tirato a parte»):
 * la riserva tira tutti i suoi dadi e decide se l'effetto riesce; i rossi,
 * tanti quanto il Paradosso, si tirano accanto e decidono solo lo scoppio
 * (1 o 10). Non contano per la riuscita. Fino alla 1.27.0 i rossi si
 * convertivano dai dadi rimasti e contavano anche loro.
 */
export function splitRamoCDice(dice, paradox) {
  const rolled = count(dice);
  const reds = count(paradox);
  return {
    basicDice: rolled,
    paradoxDice: reds,
    countedParadox: 0,
    eyeOnly: reds,
    totalDice: rolled + reds
  };
}

/** Come si paga il lancio (verdetto di Blue del 29/9/2026): in Quintessenza o in Paradosso. */
export const PAGAMENTI = Object.freeze(["quintessenza", "paradosso"]);

/** I tre tipi di lancio dei tre tasti, dal più sicuro al più caro. */
export const TIPI_LANCIO = Object.freeze(["accidentale", "volgare", "testimoni"]);

/** Il tipo di lancio dalle caselle della finestra: con testimoni, Volgare, oppure Accidentale. */
export function tipoDaOpzioni({ vulgar = false, witnesses = false } = {}) {
  if (witnesses) return "testimoni";
  if (vulgar) return "volgare";
  return "accidentale";
}

/** Il Paradosso che il tipo porta da sé: Accidentale 0, Volgare 1, Volgare con testimoni 2. */
export function paradossoDelTipo(kind) {
  if (kind === "testimoni") return 2;
  if (kind === "volgare") return 1;
  return 0;
}

/**
 * Il costo del lancio (verdetti di Blue del 29/9/2026): ogni lancio di
 * Magick si paga, e si può sempre lanciare. Il giocatore sceglie: 1
 * Quintessenza, oppure il Paradosso del tipo (Accidentale 1, Volgare 2,
 * Volgare con testimoni 3). La Quintessenza copre solo il costo: chi la
 * paga prende lo stesso il Paradosso del Volgare (1, o 2 coi testimoni).
 * Il Narratore riceve la copia di ogni punto Paradosso preso.
 */
export function costoLancio(kind, pay) {
  const base = paradossoDelTipo(kind);
  if (pay === "quintessenza") return { pay: "quintessenza", quintessenza: 1, paradosso: base };
  return { pay: "paradosso", quintessenza: 0, paradosso: base + 1 };
}

/**
 * Il costo del lancio in parole (29/9), per il tasto, la carta e l'avviso:
 * «1 Quintessenza e 1 Paradosso», «2 Paradosso». `localize` e `format` sono
 * quelli di Foundry; fuori da Foundry tornano le chiavi.
 */
export function testoCosto(costo, localize = (key) => key, format = (key) => key) {
  const parti = [];
  if (count(costo?.quintessenza) > 0) parti.push(format("WOD5E_MAGE.Costo.PuntiQuintessenza", { points: count(costo.quintessenza) }));
  if (count(costo?.paradosso) > 0) parti.push(format("WOD5E_MAGE.Costo.PuntiParadosso", { points: count(costo.paradosso) }));
  return parti.join(` ${localize("WOD5E_MAGE.Costo.E")} `);
}

/**
 * Chi paga il lancio: la scelta del giocatore, se si può fare. La
 * Quintessenza vuole almeno un punto libero sulla Ruota (dopo il costo di un
 * potere attivo); senza, si paga in Paradosso, che si può sempre prendere.
 * Senza scelta: la Quintessenza quando c'è.
 */
export function pagamentoDelLancio(scelta, quintessenzaLibera = 0) {
  if (scelta === "paradosso") return "paradosso";
  return count(quintessenzaLibera) >= 1 ? "quintessenza" : "paradosso";
}

/**
 * I successi di una carta di prima del Sistema: dalla riuscita in su sui
 * bianchi, lo stesso sui rossi ma solo fino ai rossi che contano (gli altri
 * sono per l'occhio; dal 29/9 i rossi tirati a parte non contano mai:
 * `countedParadox` 0). Niente coppie di dieci. Le carte del Sistema si
 * contano con contaSuccessi (sistema.js).
 */
export function calculateRamoCSuccesses(basicResults = [], paradoxResults = [], countedParadox = Infinity, { successFrom = SUCCESS_FROM } = {}) {
  const succeeds = (result) => isSuccess(result, { successFrom });
  const basic = basicResults.filter(isActive).filter(succeeds).length;
  const paradox = paradoxResults.filter(isActive).filter(succeeds).length;
  const cap = countedParadox === Infinity ? paradox : count(countedParadox);
  return basic + Math.min(paradox, cap);
}

/**
 * Il successo paradossale (Blue, 30/9: «lo teniamo ed anzi rimane il
 * principio»). La riuscita la fanno i dadi della riserva (29/9); se il lancio
 * riesce e almeno un rosso mostra un successo, il successo è paradossale e
 * l'effetto lo racconta il Narratore. Vale per le carte coi rossi a parte,
 * non per i tiri di Abilità né per lo Scoppio. Torna quanti rossi hanno fatto
 * successo, o 0. Il lancio riesce quando i successi arrivano alla soglia
 * scritta sulla carta (1 sulle carte di prima). Vale solo per le carte di
 * prima del Sistema: col Sistema il tiro è paradossale quando il giocatore
 * prende i successi dei rossi, e lo dice la carta (rossi.js).
 */
export function successoParadossale(card = {}, redResults = []) {
  if (card?.sistema) return 0;
  if (card?.ramo !== RAMO || card.rossiAParte !== true || card.skill || card.burst || card.burstResult) return 0;
  if (count(card.total) < Math.max(count(card.difficulty), 1)) return 0;
  const successFrom = resolveSuccessFrom({ successFrom: card.successFrom, advancedDifficulty: card.advancedDifficulty }, ORIGINAL_SUCCESS_FROM);
  return (Array.isArray(redResults) ? redResults : []).filter(isActive).filter((result) => isSuccess(result, { successFrom })).length;
}

/**
 * La Quintessenza nel lancio (Blue, 16/9): un punto vale un dado, e basta.
 * La riuscita comprata coi punti pari alla Sfera (11/9) è caduta con la
 * rifondazione: niente successi automatici. `price` e `bought` restano a
 * zero e falso per chi legge ancora il conto vecchio.
 */
export function quintessenceSpend(points) {
  const spent = count(points);
  return { spent, price: 0, bought: false, dice: spent };
}
