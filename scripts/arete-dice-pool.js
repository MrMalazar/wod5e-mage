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
