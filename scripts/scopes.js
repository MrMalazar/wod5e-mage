import { MODULE_ID } from "./constants.js";

export const SCOPES = Object.freeze([
  "potency",
  "duration",
  "targets",
  "area",
  "conditions",
  "range"
]);

export function getScopeSelection(actor) {
  const stored = actor.getFlag(MODULE_ID, "scopes");

  return Object.fromEntries(
    SCOPES.map((id) => [id, Boolean(stored?.[id])])
  );
}

export function prepareScopes(actor) {
  const selection = getScopeSelection(actor);

  return SCOPES.map((id) => ({
    id,
    label: `WOD5E_MAGE.Scopes.${id}`,
    selected: selection[id]
  }));
}

export async function onScopeChange(event, target) {
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

  const scopeId = target.dataset.scope;
  if (!SCOPES.includes(scopeId)) return;

  // Every Scope is an independent yes/no switch. Updating the complete flag
  // keeps all six choices together without adding fields to the native system.
  const selection = getScopeSelection(actor);
  selection[scopeId] = target.dataset.selected !== "true";
  await actor.setFlag(MODULE_ID, "scopes", selection);
}
