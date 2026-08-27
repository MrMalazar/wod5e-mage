import { MODULE_ID } from "./constants.js";

/**
 * I Bonus del Mago: righe libere accanto ad Areté, «+3 · Ambito Forza ·
 * quando lancio col mio strumento». Tre campi per riga, nessun effetto sui
 * tiri: sono un promemoria per il tavolo, salvato nei flag del modulo.
 */
const FIELDS = Object.freeze(["kind", "description"]);

export function prepareBonuses(actor) {
  const stored = actor.getFlag(MODULE_ID, "bonuses") ?? {};

  return Object.entries(stored).map(([id, row]) => {
    const value = Math.trunc(Number(row?.value));
    return {
      id,
      value: Number.isFinite(value) ? value : 0,
      ...Object.fromEntries(
        FIELDS.map((field) => [field, String(row?.[field] ?? "")])
      )
    };
  });
}

function canEditBonuses(actor) {
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

export async function onBonusAdd(event) {
  event.preventDefault();

  const actor = this.actor;
  if (!canEditBonuses(actor)) return;

  const rows = { ...(actor.getFlag(MODULE_ID, "bonuses") ?? {}) };
  let rowId = foundry.utils.randomID();
  while (rows[rowId]) rowId = foundry.utils.randomID();

  rows[rowId] = { value: 1, kind: "", description: "" };

  await actor.setFlag(MODULE_ID, "bonuses", rows);
}

export async function onBonusDelete(event, target) {
  event.preventDefault();

  const actor = this.actor;
  if (!canEditBonuses(actor)) return;

  const rowId = target.dataset.row;
  const rows = { ...(actor.getFlag(MODULE_ID, "bonuses") ?? {}) };
  if (!Object.hasOwn(rows, rowId)) return;

  // La sintassi -= di Foundry toglie la riga senza rifondere le altre.
  await actor.update({
    [`flags.${MODULE_ID}.bonuses.-=${rowId}`]: null
  });
}
