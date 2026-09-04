import { prepareEssentialSkillList } from "./abilita-essenziali.js";

/**
 * Le Specializzazioni delle Abilità, in un pannello dei Tratti: una riga
 * per specializzazione (Abilità e nome), il + per aggiungerne una, il
 * cestino per toglierla. Scrivono dove scrive il sistema, cioè nei
 * `bonuses` dell'Abilità (+1 dado, sempre in mostra), così il sistema le
 * conta nei tiri e la S accanto al nome si accende da sola.
 */
export const SPECIALTY_VALUE = 1;

function skillList(actor, { localize, lang } = {}) {
  return prepareEssentialSkillList(actor.system?.sortedSkills, { localize, lang })
    .map((skill) => ({ id: skill.id, label: String(skill.displayName ?? skill.id) }));
}

export function prepareSpecialties(actor, { localize = (key) => key, lang = "it" } = {}) {
  const skills = skillList(actor, { localize, lang });
  const rows = [];
  for (const skill of skills) {
    const bonuses = actor.system?.skills?.[skill.id]?.bonuses;
    if (!Array.isArray(bonuses)) continue;
    bonuses.forEach((bonus, index) => {
      rows.push({
        skill: skill.id,
        skillLabel: skill.label,
        index,
        source: String(bonus?.source ?? ""),
        value: Number(bonus?.value) || 0
      });
    });
  }
  return { rows, skills };
}

/** Il bonus che il sistema scrive per una specializzazione. */
export function specialtyBonus(skillId, source) {
  return {
    source: String(source ?? "").trim(),
    value: SPECIALTY_VALUE,
    paths: [`skills.${skillId}`],
    displayWhenInactive: true
  };
}

function canEditSpecialties(actor) {
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

export async function onSpecialtyAdd(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEditSpecialties(actor)) return;

  const localize = game.i18n.localize.bind(game.i18n);
  const { skills } = prepareSpecialties(actor, { localize, lang: game.i18n.lang });
  const content = await foundry.applications.handlebars.renderTemplate(
    "modules/wod5e-mage/templates/dialogs/specialty-add.hbs",
    { skills }
  );

  const result = await foundry.applications.api.DialogV2.input({
    window: { title: localize("WOD5E_MAGE.Specialties.Add") },
    content,
    ok: { icon: "fas fa-check", label: localize("WOD5E.Add") },
    buttons: [{ action: "cancel", icon: "fas fa-times", label: localize("WOD5E.Cancel") }],
    classes: ["wod5e", "wod5e-mage", "mage", actor.system.gamesystem],
    position: { width: "auto", height: "auto" }
  });
  if (!result || result === "cancel") return;

  const skillId = String(result.skill ?? "");
  const source = String(result.source ?? "").trim();
  if (!skills.some((skill) => skill.id === skillId) || !source) {
    ui.notifications.warn(localize("WOD5E_MAGE.Specialties.Incomplete"));
    return;
  }

  const bonuses = [...(actor.system.skills?.[skillId]?.bonuses ?? [])];
  bonuses.push(specialtyBonus(skillId, source));
  await actor.update({ [`system.skills.${skillId}.bonuses`]: bonuses });
}

export async function onSpecialtyDelete(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEditSpecialties(actor)) return;

  const skillId = String(target.dataset.skill ?? "");
  const index = Math.trunc(Number(target.dataset.index));
  const bonuses = [...(actor.system.skills?.[skillId]?.bonuses ?? [])];
  if (!Number.isInteger(index) || index < 0 || index >= bonuses.length) return;

  bonuses.splice(index, 1);
  await actor.update({ [`system.skills.${skillId}.bonuses`]: bonuses });
}
