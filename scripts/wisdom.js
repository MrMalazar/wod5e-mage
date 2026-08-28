import { MODULE_ID } from "./constants.js";
import { dressNextRollDialogAsMage, isMageActor } from "./mage-dice.js";

const DEFAULT_WISDOM = Object.freeze({
  max: 5,
  superficial: 0,
  aggravated: 0
});

export function getWisdom(actor) {
  const stored = actor.getFlag(MODULE_ID, "wisdom") ?? {};
  const storedMax = Number(stored.max);
  const max = Number.isFinite(storedMax)
    ? Math.max(storedMax, 0)
    : DEFAULT_WISDOM.max;
  const superficial = Math.min(Math.max(Number(stored.superficial) || 0, 0), max);
  const aggravated = Math.min(
    Math.max(Number(stored.aggravated) || 0, 0),
    Math.max(max - superficial, 0)
  );

  // La fila piena ha un nome (04_95): da lì scattano i quattro effetti.
  const segnato = max > 0 && superficial + aggravated >= max;

  return { max, superficial, aggravated, segnato };
}

export async function onWisdomResourceChange(event, target) {
  event.preventDefault();

  const actor = this.actor;
  if (!actor.isOwner) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.NoSufficientPermission", {
        string: actor.name
      })
    );
    return;
  }

  if (actor.system.locked) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.CannotModifyResourceString", {
        string: actor.name
      })
    );
    return;
  }

  const wisdom = getWisdom(actor);
  if (target.dataset.resourceAction === "plus") wisdom.max += 1;
  if (target.dataset.resourceAction === "minus") wisdom.max = Math.max(wisdom.max - 1, 0);

  if (wisdom.superficial + wisdom.aggravated > wisdom.max) {
    wisdom.aggravated = Math.max(wisdom.max - wisdom.superficial, 0);
    wisdom.superficial = Math.min(wisdom.superficial, wisdom.max);
  }

  await actor.setFlag(MODULE_ID, "wisdom", wisdom);
}

export async function onWisdomRoll(event) {
  event.preventDefault();

  const actor = this.actor;
  const wisdom = getWisdom(actor);
  const dicePool = Math.max(wisdom.max - wisdom.aggravated - wisdom.superficial, 1);

  if (isMageActor(actor)) dressNextRollDialogAsMage();

  await WOD5E.api.Roll({
    basicDice: dicePool,
    title: game.i18n.localize("WOD5E_MAGE.Wisdom.Rolling"),
    selectors: ["wisdom"],
    actor,
    data: actor.system,
    quickRoll: false,
    disableAdvancedDice: true
  });
}
