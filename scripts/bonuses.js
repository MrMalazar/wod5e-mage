import { MODULE_ID } from "./constants.js";

/**
 * I Bonus del Mago: righe libere sotto i Tiri personalizzati. Il tipo dice
 * su cosa lavora il bonus (Dado, Successo o Difficoltà), la descrizione dice
 * dove vale — a mano, come lo direbbe il giocatore. Nessun effetto sui tiri.
 */
export const BONUS_KINDS = Object.freeze(["dice", "success", "difficulty"]);

export function prepareBonuses(actor) {
  const stored = actor.getFlag(MODULE_ID, "bonuses") ?? {};

  const localize = globalThis.game?.i18n?.localize?.bind(globalThis.game.i18n)
    ?? ((key) => key);

  return Object.entries(stored).map(([id, row]) => {
    const value = Math.trunc(Number(row?.value));
    const kind = String(row?.kind ?? "");
    return {
      id,
      value: Number.isFinite(value) ? value : 0,
      kind,
      description: String(row?.description ?? ""),
      kinds: BONUS_KINDS.map((kindId) => ({
        id: kindId,
        label: localize(`WOD5E_MAGE.Bonuses.Kinds.${kindId}`),
        selected: kindId === kind
      }))
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
