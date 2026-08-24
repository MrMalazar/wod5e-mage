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
    SCOPES.map((id) => {
      const value = Number(stored?.[id]);
      return [id, Number.isFinite(value) ? Math.max(0, Math.trunc(value)) : 0];
    })
  );
}

export function prepareScopes(actor) {
  const selection = getScopeSelection(actor);

  return SCOPES.map((id) => ({
    id,
    label: `WOD5E_MAGE.Scopes.${id}`,
    value: selection[id]
  }));
}
