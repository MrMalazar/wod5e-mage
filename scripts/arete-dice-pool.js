/**
 * Split an Areté pool into normal and Paradox dice. Paradox replaces normal
 * dice and can never exceed the total number of dice being rolled.
 */
export function calculateAreteDicePool(totalDice, paradoxRating) {
  const total = Math.max(Math.trunc(Number(totalDice) || 0), 1);
  const paradox = Math.min(
    Math.max(Math.trunc(Number(paradoxRating) || 0), 0),
    total
  );

  return {
    basicDice: total - paradox,
    paradoxDice: paradox,
    totalDice: total
  };
}

/**
 * Trasferisce dadi tra la parte Mage e la parte Paradosso senza modificare
 * il totale della pool. Il Paradosso non puo' superare i dadi disponibili.
 */
export function shiftParadoxDice(basicDice, paradoxDice, delta) {
  const basic = Math.max(Math.trunc(Number(basicDice) || 0), 0);
  const paradox = Math.max(Math.trunc(Number(paradoxDice) || 0), 0);
  const total = basic + paradox;
  const shiftedParadox = Math.min(
    Math.max(paradox + Math.trunc(Number(delta) || 0), 0),
    total
  );

  return {
    basicDice: total - shiftedParadox,
    paradoxDice: shiftedParadox,
    totalDice: total
  };
}

/**
 * Conta i successi di un tiro di Arete senza creare coppie critiche con i
 * dadi Paradosso. Ogni risultato 6-10 vale un successo; soltanto le coppie di
 * 10 ottenute dai dadi Mage aggiungono due successi ulteriori.
 */
export function calculateAreteSuccesses(basicResults = [], paradoxResults = []) {
  const isActive = (result) => result?.active !== false && !result?.discarded;
  const activeBasic = basicResults.filter(isActive);
  const activeParadox = paradoxResults.filter(isActive);
  const baseSuccesses = [...activeBasic, ...activeParadox]
    .filter((result) => Number(result.result) >= 6)
    .length;
  const basicTens = activeBasic
    .filter((result) => Number(result.result) === 10)
    .length;

  return baseSuccesses + Math.floor(basicTens / 2) * 2;
}
