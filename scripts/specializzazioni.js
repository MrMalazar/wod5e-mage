import { prepareEssentialSkillList } from "./abilita-essenziali.js";
import { SPECIALIZZAZIONI, specialtySuggestions } from "./data/specializzazioni.js";

/**
 * Le Specializzazioni delle Abilità, in un pannello dei Tratti: una riga
 * per specializzazione (Abilità e nome), il + per aggiungerne una, il
 * cestino per toglierla. Scrivono dove scrive il sistema, cioè nei
 * `bonuses` dell'Abilità (+1 dado, sempre in mostra), così il sistema le
 * conta nei tiri e la S accanto al nome si accende da sola.
 */
export const SPECIALTY_VALUE = 1;

/**
 * Le Specializzazioni si prendono a 1, 3 e 5 pallini dell'Abilità, come i
 * focus di V6 (verdetto di Blue, 11/9; prima, dal 9/9, dal terzo pallino).
 */
export const SPECIALTY_STEPS = Object.freeze([1, 3, 5]);

/** Quante Specializzazioni tiene un'Abilità a quel valore: una a 1, due a 3, tre a 5. */
export function specialtySlots(value) {
  const dots = Math.max(Math.trunc(Number(value) || 0), 0);
  return SPECIALTY_STEPS.filter((step) => dots >= step).length;
}

function skillList(actor, { localize, lang } = {}) {
  return prepareEssentialSkillList(actor.system?.sortedSkills, { localize, lang })
    .map((skill) => ({ id: skill.id, label: String(skill.displayName ?? skill.id), value: Math.max(Math.trunc(Number(skill.value) || 0), 0) }));
}

/**
 * Le Abilità che possono prendere un'altra Specializzazione: quelle con un
 * posto libero (`used` è quante ne hanno già). Ogni voce porta `slots` e `used`.
 */
export function specialtySkillChoices(skills, used = {}) {
  return (skills ?? [])
    .map((skill) => ({ ...skill, slots: specialtySlots(skill.value), used: Math.max(Math.trunc(Number(used[skill.id]) || 0), 0) }))
    .filter((skill) => skill.used < skill.slots);
}

/** Quante Specializzazioni ha già ogni Abilità (i bonuses del sistema). */
export function specialtyCounts(rows) {
  const counts = {};
  for (const row of rows ?? []) counts[row.skill] = (counts[row.skill] ?? 0) + 1;
  return counts;
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

/**
 * I suggerimenti del catalogo, in ordine alfabetico (Blue, 11/9: la tendina
 * nativa era storta e non ordinata). `filter` tiene solo quelli che cominciano
 * con quel che si sta scrivendo. Torna le voci `<li>`.
 */
export function suggestionOptions(skillId, filter = "", lang = "it") {
  const needle = String(filter ?? "").trim().toLocaleLowerCase(lang);
  return [...specialtySuggestions(skillId)]
    .sort((a, b) => a.localeCompare(b, lang))
    .filter((name) => !needle || name.toLocaleLowerCase(lang).startsWith(needle))
    .map((name) => `<li data-value="${name}">${name}</li>`)
    .join("");
}

/** La tendina di casa sotto il campo: si riempie dall'Abilità scelta, si filtra scrivendo, un clic sceglie. */
function wireSuggestions(root) {
  const select = root?.querySelector?.("select[name=\"skill\"]");
  const input = root?.querySelector?.("input[name=\"source\"]");
  const list = root?.querySelector?.("[data-role=\"suggest\"]");
  if (!select || !input || !list) return;
  const lang = game.i18n?.lang ?? "it";
  const refresh = () => {
    list.innerHTML = suggestionOptions(select.value, input.value, lang);
    list.hidden = !list.children.length;
  };
  select.addEventListener("change", refresh);
  input.addEventListener("input", refresh);
  input.addEventListener("focus", refresh);
  input.addEventListener("blur", () => setTimeout(() => { list.hidden = true; }, 150));
  list.addEventListener("mousedown", (event) => {
    const item = event.target.closest("li[data-value]");
    if (!item) return;
    event.preventDefault();
    input.value = item.dataset.value;
    list.hidden = true;
  });
  list.hidden = true;
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

export async function onSpecialtyAdd(event, target = null) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEditSpecialties(actor)) return;

  const localize = game.i18n.localize.bind(game.i18n);
  // Solo le Abilità con un posto libero: una a 1, due a 3, tre a 5 (verdetto di Blue, 11/9).
  const prepared = prepareSpecialties(actor, { localize, lang: game.i18n.lang });
  // Dal posto vuoto del cassetto (16/9) l'Abilità arriva già scelta.
  const preset = String(target?.dataset?.skill ?? "");
  const skills = specialtySkillChoices(prepared.skills, specialtyCounts(prepared.rows))
    .map((skill) => ({ ...skill, selected: skill.id === preset }));
  const content = await foundry.applications.handlebars.renderTemplate(
    "modules/wod5e-mage/templates/dialogs/specialty-add.hbs",
    { skills, steps: SPECIALTY_STEPS.join(", ") }
  );

  const result = await foundry.applications.api.DialogV2.input({
    window: { title: localize("WOD5E_MAGE.Specialties.Add") },
    content,
    ok: { icon: "fas fa-check", label: localize("WOD5E.Add") },
    buttons: [{ action: "cancel", icon: "fas fa-times", label: localize("WOD5E.Cancel") }],
    classes: ["wod5e", "wod5e-mage", "mage", actor.system.gamesystem],
    position: { width: "auto", height: "auto" },
    render: (event, dialog) => wireSuggestions(dialog.element)
  });
  if (!result || result === "cancel") return;

  const skillId = String(result.skill ?? "");
  const source = String(result.source ?? "").trim();
  if (!skills.some((skill) => skill.id === skillId) || !source) {
    ui.notifications.warn(localize("WOD5E_MAGE.Specialties.Incomplete"));
    return;
  }

  const bonuses = [...(actor.system.skills?.[skillId]?.bonuses ?? [])];
  const chosen = skills.find((skill) => skill.id === skillId);
  if (bonuses.length >= chosen.slots) {
    ui.notifications.warn(game.i18n.format("WOD5E_MAGE.Specialties.Full", { skill: chosen.label, slots: chosen.slots }));
    return;
  }
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

export { SPECIALIZZAZIONI };
