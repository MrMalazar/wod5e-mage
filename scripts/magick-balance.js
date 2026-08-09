import { MODULE_ID } from "./constants.js";

export const MAGICK_TRACK_MAX = 9;

const NODE_POSITIONS = Object.freeze([
  { x: 4, y: 78 },
  { x: 9, y: 51 },
  { x: 20, y: 29 },
  { x: 34, y: 14 },
  { x: 50, y: 8 },
  { x: 66, y: 14 },
  { x: 80, y: 29 },
  { x: 91, y: 51 },
  { x: 96, y: 78 }
]);

/** Read the two persistent fields displayed below the Magick wheel. */
export function getPersistentMagickResources(actor) {
  const stored = actor.getFlag(MODULE_ID, "persistentMagickResources") ?? {};

  return {
    generatedQuintessence: String(stored.generatedQuintessence ?? ""),
    permanentParadox: Math.max(
      Math.trunc(Number(stored.permanentParadox) || 0),
      0
    )
  };
}

export function getMagickBalance(actor) {
  const stored = actor.getFlag(MODULE_ID, "magickBalance") ?? {};

  // The two values share the same nine cells. Quintessence is clamped first,
  // then Paradox is limited to the cells that remain available on the right.
  // Old versions stored a transient `pending` value: it is intentionally
  // ignored because the current state is now completely described by the two
  // visible counters.
  const quintessence = Math.min(
    Math.max(Number(stored.quintessence) || 0, 0),
    MAGICK_TRACK_MAX
  );
  const paradox = Math.min(
    Math.max(Number(stored.paradox) || 0, 0),
    MAGICK_TRACK_MAX - quintessence
  );

  return { quintessence, paradox };
}

export function prepareMagickTrack(actor) {
  const balance = getMagickBalance(actor);
  const cells = NODE_POSITIONS.map((position, index) => {
    const hasQuintessence = index < balance.quintessence;
    const hasParadox = index >= MAGICK_TRACK_MAX - balance.paradox;
    let state = "empty";
    if (hasQuintessence) state = "quintessence";
    else if (hasParadox) state = "paradox";

    return {
      index,
      number: index + 1,
      position: `--track-x: ${position.x}%; --track-y: ${position.y}%;`,
      state
    };
  });

  return { ...balance, cells, max: MAGICK_TRACK_MAX };
}

export function applyMagickBalanceDelta(balance, resource, delta) {
  if (!['quintessence', 'paradox'].includes(resource) || ![-1, 1].includes(delta)) {
    return {
      quintessence: balance.quintessence,
      paradox: balance.paradox
    };
  }

  // Never carry the obsolete pending/contested state into a new update.
  const next = {
    quintessence: balance.quintessence,
    paradox: balance.paradox
  };

  // Minus always removes one filled cell from the selected side immediately.
  if (delta < 0) {
    next[resource] = Math.max(next[resource] - 1, 0);
    return next;
  }

  const opposingResource = resource === "quintessence" ? "paradox" : "quintessence";
  const total = next.quintessence + next.paradox;

  // If at least one cell is empty, Plus fills it from the selected side now.
  // Example: 5 Quintessence / 3 Paradox becomes 6 / 3 with + Quintessence.
  if (total < MAGICK_TRACK_MAX) {
    next[resource] = Math.min(next[resource] + 1, MAGICK_TRACK_MAX);
    return next;
  }

  // If all nine cells are occupied, Plus first removes one cell from the
  // opposite side. A later Plus sees the empty cell and fills it normally.
  // Example: 5 / 4 -> 5 / 3 -> 6 / 3. No contested state is persisted.
  if (next[opposingResource] > 0) {
    next[opposingResource] -= 1;
  }

  return next;
}

export async function onMagickBalanceChange(event, target) {
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

  const resource = target.dataset.resource;
  const delta = Number(target.dataset.delta) || 0;
  if (!['quintessence', 'paradox'].includes(resource) || ![-1, 1].includes(delta)) return;

  const balance = getMagickBalance(actor);
  const next = applyMagickBalanceDelta(balance, resource, delta);

  if (
    next.quintessence === balance.quintessence
    && next.paradox === balance.paradox
  ) {
    if (delta > 0) {
      ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.MagickBalance.SideFull"));
    }
    return;
  }

  await actor.setFlag(MODULE_ID, "magickBalance", next);
}
