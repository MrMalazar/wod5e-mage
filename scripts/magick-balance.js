import { MODULE_ID } from "./constants.js";
import { lockedParadox } from "./ongoing-magick.js";

export const MAGICK_TRACK_MAX = 9;

// Nove nodi su un SEMICERCHIO VERO (raggio 150 su viewBox 400x190),
// dal primo a sinistra (Quintessenza) all'ultimo a destra (Paradosso).
const NODE_POSITIONS = Object.freeze([
  { x: 12.5, y: 89.5 },
  { x: 15.4, y: 59.3 },
  { x: 23.5, y: 33.6 },
  { x: 35.6, y: 16.5 },
  { x: 50, y: 10.5 },
  { x: 64.4, y: 16.5 },
  { x: 76.5, y: 33.6 },
  { x: 84.6, y: 59.3 },
  { x: 87.5, y: 89.5 }
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

/**
 * Il Paradosso permanente è il pavimento della Ruota (tronco del 3/9/2026):
 * le celle di Paradosso non scendono mai sotto quel numero. Dal 6/9 il
 * pavimento somma il permanente scritto a mano e i punti bloccati dalle
 * Magick in atto volgari.
 */
export function getParadoxFloor(actor) {
  return Math.min(getPersistentMagickResources(actor).permanentParadox + lockedParadox(actor), MAGICK_TRACK_MAX);
}

export function getMagickBalance(actor) {
  const stored = actor.getFlag(MODULE_ID, "magickBalance") ?? {};
  const floor = getParadoxFloor(actor);

  // The two values share the same nine cells. Quintessence is clamped first,
  // then Paradox is limited to the cells that remain available on the right.
  // Old versions stored a transient `pending` value: it is intentionally
  // ignored because the current state is now completely described by the two
  // visible counters.
  // Il pavimento vince sulla Quintessenza: le celle permanenti restano rosse.
  const quintessence = Math.min(
    Math.max(Number(stored.quintessence) || 0, 0),
    MAGICK_TRACK_MAX - floor
  );
  const paradox = Math.min(
    Math.max(Number(stored.paradox) || 0, floor),
    MAGICK_TRACK_MAX - quintessence
  );

  return { quintessence, paradox, floor };
}

export function prepareMagickTrack(actor) {
  const balance = getMagickBalance(actor);
  const cells = NODE_POSITIONS.map((position, index) => {
    const hasQuintessence = index < balance.quintessence;
    const hasParadox = index >= MAGICK_TRACK_MAX - balance.paradox;
    const isPermanent = index >= MAGICK_TRACK_MAX - balance.floor;
    let state = "empty";
    if (hasQuintessence) state = "quintessence";
    else if (isPermanent) state = "paradox permanent";
    else if (hasParadox) state = "paradox";

    return {
      index,
      number: index + 1,
      position: `--track-x: ${position.x}%; --track-y: ${position.y}%;`,
      state
    };
  });

  return { ...balance, cells, max: MAGICK_TRACK_MAX, locked: lockedParadox(actor) };
}

export function applyMagickBalanceDelta(balance, resource, delta, floor = 0) {
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
  const paradoxFloor = Math.max(Math.trunc(Number(floor) || 0), 0);

  // Minus always removes one filled cell from the selected side immediately.
  // Il Paradosso non scende sotto il pavimento del Permanente.
  if (delta < 0) {
    const bottom = resource === "paradox" ? paradoxFloor : 0;
    next[resource] = Math.max(next[resource] - 1, bottom);
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
  const opposingBottom = opposingResource === "paradox" ? paradoxFloor : 0;
  if (next[opposingResource] > opposingBottom) {
    next[opposingResource] -= 1;
  }

  return next;
}

/**
 * Quanto Paradosso porta il tipo di Magick dichiarato nel tiro di Areté.
 * Volgare vale 1, volgare con testimoni vale 2; i due non si sommano perché
 * la finestra li tratta come una scelta sola.
 */
export function paradoxGainForMagickType({ vulgar = false, witnesses = false } = {}) {
  if (witnesses) return 2;
  if (vulgar) return 1;
  return 0;
}

/**
 * Aggiunge Paradosso passando dalla stessa logica del pulsante +, un passo
 * alla volta: se la Ruota è piena il primo passo libera una cella dalla
 * Quintessenza e il secondo la riempie di Paradosso.
 */
export function addParadoxToBalance(balance, amount) {
  const steps = Math.max(Math.trunc(Number(amount)) || 0, 0);
  let next = {
    quintessence: balance.quintessence,
    paradox: balance.paradox
  };

  for (let step = 0; step < steps; step += 1) {
    next = applyMagickBalanceDelta(next, "paradox", 1);
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
  const next = applyMagickBalanceDelta(balance, resource, delta, balance.floor);

  if (
    next.quintessence === balance.quintessence
    && next.paradox === balance.paradox
  ) {
    if (delta > 0) {
      ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.MagickBalance.SideFull"));
    } else if (resource === "paradox" && balance.floor > 0) {
      ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.MagickBalance.FloorReached"));
    }
    return;
  }

  await actor.setFlag(MODULE_ID, "magickBalance", next);
}
