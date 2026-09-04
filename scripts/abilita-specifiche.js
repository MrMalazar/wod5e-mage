import { MODULE_ID } from "./constants.js";

/**
 * Le Abilità Specifiche: Abilità intere che il giocatore aggiunge da sé
 * sotto le diciotto essenziali, col nome e i pallini. Vivono nelle
 * bandiere del modulo e tirano come le altre (i pallini entrano nella
 * riserva come dadi piatti).
 */
export const CUSTOM_SKILLS_FLAG = "customSkills";

function dots(value) {
  return Math.min(Math.max(Math.trunc(Number(value) || 0), 0), 5);
}

export function prepareCustomSkills(actor) {
  const stored = actor.getFlag(MODULE_ID, CUSTOM_SKILLS_FLAG) ?? {};
  return Object.entries(stored)
    .map(([id, row]) => ({
      id,
      name: String(row?.name ?? ""),
      value: dots(row?.value)
    }))
    .sort((left, right) => left.name.localeCompare(right.name, globalThis.game?.i18n?.lang ?? "it"));
}

/** Le Abilità Specifiche come tratti per le finestre di tiro. */
export function customSkillTraits(actor) {
  return prepareCustomSkills(actor).map((skill) => ({
    key: `custom:${skill.id}`,
    id: skill.id,
    type: "custom",
    label: skill.name || "?",
    value: skill.value
  }));
}

function canEdit(actor) {
  if (!actor.isOwner) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.NoSufficientPermission", { string: actor.name })
    );
    return false;
  }
  if (actor.system.locked) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.CannotModifyResourceString", { string: actor.name })
    );
    return false;
  }
  return true;
}

export async function onCustomSkillAdd(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;

  const rows = { ...(actor.getFlag(MODULE_ID, CUSTOM_SKILLS_FLAG) ?? {}) };
  let rowId = foundry.utils.randomID();
  while (rows[rowId]) rowId = foundry.utils.randomID();
  rows[rowId] = { name: "", value: 0 };
  await actor.setFlag(MODULE_ID, CUSTOM_SKILLS_FLAG, rows);
}

export async function onCustomSkillDelete(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;

  const rowId = String(target.dataset.row ?? "");
  const rows = actor.getFlag(MODULE_ID, CUSTOM_SKILLS_FLAG) ?? {};
  if (!Object.hasOwn(rows, rowId)) return;
  await actor.update({ [`flags.${MODULE_ID}.${CUSTOM_SKILLS_FLAG}.-=${rowId}`]: null });
}
