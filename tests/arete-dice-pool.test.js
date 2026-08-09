import assert from "node:assert/strict";
import {
  calculateAreteDicePool,
  shiftParadoxDice
} from "../scripts/arete-dice-pool.js";

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

// Manual controls transfer dice without changing the maximum pool.
assert.deepEqual(shiftParadoxDice(5, 3, 1), {
  basicDice: 4,
  paradoxDice: 4,
  totalDice: 8
});

assert.deepEqual(shiftParadoxDice(5, 3, -1), {
  basicDice: 6,
  paradoxDice: 2,
  totalDice: 8
});

// Transfers stop at zero and at the current total pool.
assert.deepEqual(shiftParadoxDice(5, 3, 20), {
  basicDice: 0,
  paradoxDice: 8,
  totalDice: 8
});

assert.deepEqual(shiftParadoxDice(5, 3, -20), {
  basicDice: 8,
  paradoxDice: 0,
  totalDice: 8
});

console.log("Areté Paradox dice-pool tests passed.");
