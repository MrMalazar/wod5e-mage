/**
 * Il ramo C (verdetti di Blue, 11/9/2026, dallo studio ramo-c-regole; la
 * rifondazione del 14/9 e i verdetti del 16/9): il tiro dell'alpha di
 * Vampiri portato sulla Magick e sulle Abilità. La soglia si toglie dalla
 * riserva e restano i dadi che tiri; un dado sopra la difficoltà è la
 * riuscita, ne basta uno; la difficoltà la fa il tipo di tiro (Accidentale
 * e Volgare 6, Volgare con testimoni 8, tiri di Abilità 6). Dal 29/9 (verdetti
 * di Blue) i rossi si tirano a parte: tanti quanto il Paradosso sulla Ruota
 * dopo aver pagato il lancio, solo nei Volgari; non tolgono dadi alla
 * riserva e decidono solo lo scoppio. E ogni lancio si paga (costoLancio).
 * Dalla 0.87.0 il modulo è in ramo C di default, senza interruttore. Tutto
 * qui è puro: si prova fuori da Foundry.
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

/** Da che numero si riesce: 6, oppure 8 con la difficoltà avanzata. */
export function successThreshold(advancedDifficulty = false) {
  return advancedDifficulty ? ADVANCED_SUCCESS_FROM : ORIGINAL_SUCCESS_FROM;
}

/**
 * La difficoltà avanzata (l'8) scatta da sola e solo col Volgare con
 * testimoni (Blue, 14/9 e 16/9): «un messaggio al giocatore: non farlo
 * così». I tiri di Abilità e lo Scoppio restano al 6.
 */
export function usesAdvancedDifficulty({ witnesses = false, skill = false, onlyParadox = false } = {}) {
  return witnesses === true && !skill && !onlyParadox;
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

/** I dadi che tiri: la riserva meno la soglia, mai sotto zero. */
export function ramoCDice(pool, threshold) {
  const reserve = count(pool);
  const goal = count(threshold);
  return { pool: reserve, threshold: goal, dice: Math.max(reserve - goal, 0) };
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
 * I successi del ramo C: dalla riuscita in su sui bianchi, lo stesso sui
 * rossi ma solo fino ai rossi che contano (gli altri sono per l'occhio;
 * dal 29/9 i rossi tirati a parte non contano mai: `countedParadox` 0).
 * Niente coppie di dieci: nel ramo C i critici non esistono.
 */
export function calculateRamoCSuccesses(basicResults = [], paradoxResults = [], countedParadox = Infinity, { successFrom = SUCCESS_FROM } = {}) {
  const succeeds = (result) => isSuccess(result, { successFrom });
  const basic = basicResults.filter(isActive).filter(succeeds).length;
  const paradox = paradoxResults.filter(isActive).filter(succeeds).length;
  const cap = countedParadox === Infinity ? paradox : count(countedParadox);
  return basic + Math.min(paradox, cap);
}

/** Il margine dei tiri di Abilità: i successi oltre il primo (il danno: arma più margine). */
export function ramoCMargin(total) {
  return Math.max(count(total) - 1, 0);
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

/** L'Ustione del ramo C: pari alla soglia, senza tetto (il tetto Areté più tre è cancellato). */
export function ustioneAmount(threshold) {
  return count(threshold);
}

/** Il prezzo di Sforzare la realtà nel ramo C: la soglia in Paradosso. */
export function sforzoCost(threshold) {
  return count(threshold);
}

/** La vittoria a un prezzo nel ramo C: su ogni fallimento con almeno un dado tirato. */
export function prezzoAllowed({ total = 0, dice = 0 } = {}) {
  return count(total) < 1 && count(dice) >= 1;
}

/**
 * La nota dei dadi sulla carta: «6 − 3 = 3». Con la riuscita comprata
 * dalla Quintessenza non si tira, e la nota lo dice.
 */
export function diceNote({ pool = 0, threshold = 0, dice = 0 } = {}) {
  return `${count(pool)} − ${count(threshold)} = ${count(dice)}`;
}
