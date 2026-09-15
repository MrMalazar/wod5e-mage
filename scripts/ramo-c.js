/**
 * Il ramo C (verdetti di Blue, 11/9/2026, dallo studio ramo-c-regole): il
 * tiro dell'alpha di Vampiri portato sulla Magick e sulle Abilità. La
 * soglia si toglie dalla riserva e restano i dadi che tiri; un dado con 8
 * o più è la riuscita, ne basta uno; i successi in più non esistono, salvo
 * il margine dei tiri di Abilità (il danno: arma più successi oltre il
 * primo) e i confronti. I rossi sono pari al Paradosso sulla Ruota e si
 * tirano sempre, anche a riserva azzerata: si convertono dai dadi rimasti
 * e, se sono di più, quelli in più si aggiungono e contano anche loro
 * (verdetto di Blue dell'11/9 pomeriggio: la PROPOSTA «solo per l'occhio»
 * è caduta). Dalla 0.87.0 il modulo è in ramo C di default, senza
 * interruttore (ordine di Blue: «vorrei ora andassimo in Default C»).
 * Tutto qui è puro: si prova fuori da Foundry.
 */

export const RAMO = "C";

/** La riuscita: 8 o più (verdetto: «lo mettiamo anche noi a difficoltà 8»). */
export const ORIGINAL_SUCCESS_FROM = 6;
export const ADVANCED_SUCCESS_FROM = 8;

// Rimane esportata per compatibilita con le carte create prima della scelta.
export const SUCCESS_FROM = ADVANCED_SUCCESS_FROM;

/** Il modificatore di Foundry per contare i successi: `cs>7`. */
export const SUCCESS_MODIFIER = `cs>${SUCCESS_FROM - 1}`;

/** Difficoltà originale: 6+. Volgare con testimoni: difficoltà avanzata, 8+. */
export function successThreshold(advancedDifficulty = false) {
  return advancedDifficulty ? ADVANCED_SUCCESS_FROM : ORIGINAL_SUCCESS_FROM;
}

/** Solo la Magick volgare con testimoni attiva automaticamente la difficoltà avanzata. */
export function usesAdvancedDifficulty({ witnesses = false, skill = false, onlyParadox = false } = {}) {
  return witnesses === true && !skill && !onlyParadox;
}

/** Il modificatore Foundry corrispondente alla soglia scelta. */
export function successModifier(successFrom = SUCCESS_FROM) {
  const threshold = Math.max(Math.trunc(Number(successFrom) || ORIGINAL_SUCCESS_FROM), 1);
  return `cs>${threshold - 1}`;
}

/**
 * Le vecchie carte non hanno la scelta salvata e mantengono la loro soglia 8.
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
 * I successi del ramo C: 8 o più sui bianchi, 8 o più sui rossi ma solo
 * fino ai rossi che contano (gli altri sono per l'occhio). Niente coppie
 * di dieci: nel ramo C i critici non esistono.
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
 * La Quintessenza nel lancio (verdetti dell'11/9): un punto vale un dado;
 * punti pari al livello della Sfera usata (la più alta, PROPOSTA) comprano
 * la riuscita senza tirare. Sotto quel prezzo ogni punto è un dado.
 */
export function quintessenceSpend(points, sphereMax) {
  const spent = count(points);
  const price = count(sphereMax);
  const bought = price > 0 && spent >= price;
  return { spent, price, bought, dice: bought ? 0 : spent };
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
