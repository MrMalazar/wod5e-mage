import assert from "node:assert/strict";
import { calculateAreteDicePool } from "../scripts/arete-dice-pool.js";

// Paradox replaces normal dice without increasing the total pool.
assert.deepEqual(calculateAreteDicePool(7, 3), {
  basicDice: 4,
  paradoxDice: 3,
  totalDice: 7
});

// As with Hunger, Paradox is capped by a pool smaller than its rating.
assert.deepEqual(calculateAreteDicePool(2, 5), {
  basicDice: 0,
  paradoxDice: 2,
  totalDice: 2
});

assert.deepEqual(calculateAreteDicePool(6, 0), {
  basicDice: 6,
  paradoxDice: 0,
  totalDice: 6
});

console.log("Areté Paradox dice-pool tests passed.");
