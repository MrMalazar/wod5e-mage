// La finta Foundry (16/9): i moduli del sistema wod5e (`/systems/wod5e/...`)
// non esistono fuori da Foundry, e questo gancio li rimpiazza coi finti di
// `stubs/`. Si usa con `node --import tests/finta/register.mjs <prova>`.
const MAP = {
  "/systems/wod5e/system/actor/mortal-actor-sheet.js": "./stubs/mortal-actor-sheet.mjs",
  "/systems/wod5e/system/actor/scripts/counters.js": "./stubs/counters.mjs",
  "/systems/wod5e/system/actor/scripts/item-actions.js": "./stubs/item-actions.mjs",
  "/systems/wod5e/system/actor/spc-actor-sheet.js": "./stubs/spc-actor-sheet.mjs",
  "/systems/wod5e/system/api/def/dice.js": "./stubs/dice.mjs",
  "/systems/wod5e/system/dice/splat-dice.js": "./stubs/splat-dice.mjs",
  "/systems/wod5e/system/scripts/rolls/situational-modifiers.js": "./stubs/situational-modifiers.mjs",
  "/systems/wod5e/system/scripts/system-rolls.js": "./stubs/system-rolls.mjs"
};
export async function resolve(specifier, context, next) {
  if (MAP[specifier]) return { url: new URL(MAP[specifier], import.meta.url).href, shortCircuit: true };
  return next(specifier, context);
}
