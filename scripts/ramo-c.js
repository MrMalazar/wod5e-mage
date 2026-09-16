/**
 * Il ramo C (verdetti di Blue, 11/9/2026, dallo studio ramo-c-regole; la
 * rifondazione del 14/9 e i verdetti del 16/9): il tiro dell'alpha di
 * Vampiri portato sulla Magick e sulle Abilità. La soglia si toglie dalla
 * riserva e restano i dadi che tiri; un dado sopra la difficoltà è la
 * riuscita, ne basta uno; la difficoltà la fa il tipo di tiro (Accidentale
 * e Volgare 6, Volgare con testimoni 8, tiri di Abilità 6). I rossi sono
 * pari al Paradosso sulla Ruota e si tirano sempre, anche a riserva
 * azzerata: si convertono dai dadi rimasti e, se sono di più, quelli in
 * più si aggiungono e contano anche loro. Dalla 0.87.0 il modulo è in ramo
 * C di default, senza interruttore. Tutto qui è puro: si prova fuori da
 * Foundry.
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
 * Come si dividono i dadi: i rossi sono tanti quanto il Paradosso e si
 * tirano sempre; si convertono dai dadi rimasti dopo la soglia, e quelli
 * oltre i dadi rimasti si aggiungono. Contano tutti (11/9 pomeriggio).
 */
export function splitRamoCDice(dice, paradox) {
  const rolled = count(dice);
  const reds = count(paradox);
  const converted = Math.min(reds, rolled);
  // Tutti i rossi contano (Blue, 11/9 pomeriggio: «3 10 10 8, su 4 dadi
  // dovrebbe essere 3 successi»): la PROPOSTA «solo per l'occhio» è caduta.
  return {
    basicDice: rolled - converted,
    paradoxDice: reds,
    countedParadox: reds,
    eyeOnly: 0,
    totalDice: rolled - converted + reds
  };
}

/**
 * I successi del ramo C: dalla riuscita in su sui bianchi, lo stesso sui
 * rossi ma solo fino ai rossi che contano (gli altri sono per l'occhio).
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
