import { MODULE_ID } from "./constants.js";

const TEXT_FIELDS = Object.freeze([
  "nameSpheres",
  "status",
  "triggerEffect"
]);

export function prepareOngoingMagick(actor) {
  const stored = actor.getFlag(MODULE_ID, "ongoingMagick") ?? {};

  return Object.entries(stored).map(([id, row]) => ({
    id,
    ...Object.fromEntries(
      TEXT_FIELDS.map((field) => [field, String(row?.[field] ?? "")])
    )
  }));
}

function canEditOngoingMagick(actor) {
  if (!actor.isOwner) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.NoSufficientPermission", {
        string: actor.name
      })
    );
    return false;
  }

  if (actor.system.locked) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.CannotModifyResourceString", {
        string: actor.name
      })
    );
    return false;
  }

  return true;
}

export async function onOngoingMagickAdd(event) {
  event.preventDefault();

  const actor = this.actor;
  if (!canEditOngoingMagick(actor)) return;

  const rows = { ...(actor.getFlag(MODULE_ID, "ongoingMagick") ?? {}) };
  let rowId = foundry.utils.randomID();
  while (rows[rowId]) rowId = foundry.utils.randomID();

  rows[rowId] = {
    nameSpheres: "",
    status: "",
    triggerEffect: ""
  };

  await actor.setFlag(MODULE_ID, "ongoingMagick", rows);
}

export async function onOngoingMagickDelete(event, target) {
  event.preventDefault();

  const actor = this.actor;
  if (!canEditOngoingMagick(actor)) return;

  const rowId = target.dataset.row;
  const rows = { ...(actor.getFlag(MODULE_ID, "ongoingMagick") ?? {}) };
  if (!Object.hasOwn(rows, rowId)) return;

  // Foundry's -= update syntax removes the selected nested row instead of
  // merging the remaining object back over it.
  await actor.update({
    [`flags.${MODULE_ID}.ongoingMagick.-=${rowId}`]: null
  });
}
