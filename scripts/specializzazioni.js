import { prepareEssentialSkillList } from "./abilita-essenziali.js";
import { SPECIALIZZAZIONI, SPECIALIZZAZIONI_PER_VOCE, specialtySuggestions } from "./data/specializzazioni.js";

/**
 * Le Specializzazioni delle Abilità (26/9, senza più la finestra: Blue, «un
 * menù a pop anti intuitivo e scomodo»): stanno in riga sotto l'Abilità,
 * nella prima pagina e nel passo Abilità della creazione guidata. Ogni
 * Specializzazione è una pastiglia (sulla scheda il clic la mette nel tiro;
 * la × la toglie); finché c'è un posto libero, in coda c'è una casella
 * vuota: si scrive il nome, o si sceglie fra i sei del catalogo che la
 * casella suggerisce, e a Invio (o uscendo dal campo) si salva. Scrivono
 * dove scrive il sistema, cioè nei `bonuses` dell'Abilità (+1 dado, sempre
 * in mostra), così il sistema le conta nei tiri e la S accanto al nome si
 * accende da sola.
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

/** I nomi delle Specializzazioni di ogni Abilità, dai bonuses del sistema. */
export function nomiSpecializzazioni(actor) {
  const out = {};
  for (const [id, skill] of Object.entries(actor?.system?.skills ?? {})) {
    const names = (skill?.bonuses ?? []).map((bonus) => String(bonus?.source ?? "").trim()).filter(Boolean);
    if (names.length) out[id] = names;
  }
  return out;
}

/**
 * La riga delle Specializzazioni di un'Abilità, per la scheda e la guidata:
 * le scritte (con l'indice per toglierle, e `chosen` su quella nel tiro), i
 * posti (una a 1, due a 3, tre a 5), quanti ne restano liberi, e i sei
 * suggerimenti del catalogo in ordine alfabetico per la casella vuota.
 */
export function rigaSpecializzazioni(skillId, value, names = [], { chosen = "" } = {}) {
  const slots = specialtySlots(value);
  const wanted = String(chosen ?? "").trim();
  const scritte = (names ?? []).map((name, index) => ({ index, name: String(name), chosen: Boolean(wanted) && String(name) === wanted }));
  return {
    slots,
    scritte,
    free: Math.max(slots - scritte.length, 0),
    suggestions: [...specialtySuggestions(skillId)].sort((a, b) => a.localeCompare(b, "it")),
    chosen: scritte.find((entry) => entry.chosen)?.name ?? ""
  };
}

/** I bonuses con una Specializzazione in più: il nome pulito, il posto libero, niente doppioni. */
export function conSpecializzazione(bonuses, skillId, value, source) {
  const name = String(source ?? "").trim();
  const list = [...(bonuses ?? [])];
  if (!name) return { ok: false, motivo: "vuoto", bonuses: list };
  const stesso = (bonus) => String(bonus?.source ?? "").trim().toLocaleLowerCase("it") === name.toLocaleLowerCase("it");
  if (list.some(stesso)) return { ok: false, motivo: "doppione", bonuses: list };
  if (list.length >= specialtySlots(value)) return { ok: false, motivo: "pieno", bonuses: list };
  return { ok: true, motivo: "", bonuses: [...list, specialtyBonus(skillId, name)] };
}

/** I bonuses senza la Specializzazione all'indice dato; com'erano se l'indice non c'è. */
export function senzaSpecializzazione(bonuses, index) {
  const list = [...(bonuses ?? [])];
  const i = Math.trunc(Number(index));
  if (!Number.isInteger(i) || i < 0 || i >= list.length) return list;
  list.splice(i, 1);
  return list;
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

/**
 * Scrive una Specializzazione sull'Abilità (dalla casella vuota): salva nei
 * bonuses e torna true; avvisa e torna false se il posto manca, se c'è già,
 * o se la scheda non si può scrivere.
 */
export async function scriviSpecializzazione(actor, skillId, source, { label = "" } = {}) {
  if (!canEditSpecialties(actor)) return false;
  const id = String(skillId ?? "");
  const skill = actor.system?.skills?.[id];
  if (!skill) return false;
  const esito = conSpecializzazione(skill.bonuses, id, skill.value, source);
  if (!esito.ok) {
    if (esito.motivo === "pieno") ui.notifications.warn(game.i18n.format("WOD5E_MAGE.Specialties.Full", { skill: label || id, slots: specialtySlots(skill.value) }));
    else if (esito.motivo === "doppione") ui.notifications.warn(game.i18n.format("WOD5E_MAGE.Specialties.Doppione", { name: String(source ?? "").trim() }));
    return false;
  }
  await actor.update({ [`system.skills.${id}.bonuses`]: esito.bonuses });
  return true;
}

/** Toglie la Specializzazione all'indice dato (la × della pastiglia). */
export async function togliSpecializzazione(actor, skillId, index) {
  if (!canEditSpecialties(actor)) return false;
  const id = String(skillId ?? "");
  const bonuses = actor.system?.skills?.[id]?.bonuses ?? [];
  const dopo = senzaSpecializzazione(bonuses, index);
  if (dopo.length === bonuses.length) return false;
  await actor.update({ [`system.skills.${id}.bonuses`]: dopo });
  return true;
}

/**
 * Le caselle vuote (`input[data-specialty-add]`): Invio o l'uscita dal campo
 * scrivono; se non si può, il testo resta nella casella per correggerlo. Il
 * cambio non risale al form della scheda: scrive solo la Specializzazione.
 * Va chiamata a ogni render, sulla scheda e sulla finestra guidata.
 */
export function wireSpecialtyInputs(root, actor) {
  for (const input of root?.querySelectorAll?.("input[data-specialty-add]") ?? []) {
    input.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      input.blur();
    });
    input.addEventListener("change", async (event) => {
      event.stopPropagation();
      if (!input.value.trim()) return;
      const ok = await scriviSpecializzazione(actor, input.dataset.specialtyAdd, input.value, { label: input.dataset.skillLabel ?? "" });
      if (!ok) input.focus();
    });
  }
}

export async function onSpecialtyDelete(event, target) {
  event.preventDefault();
  await togliSpecializzazione(this.actor, String(target.dataset.skill ?? ""), target.dataset.index);
}

export { SPECIALIZZAZIONI, SPECIALIZZAZIONI_PER_VOCE, specialtySuggestions };
