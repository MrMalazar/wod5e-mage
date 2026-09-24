import { MODULE_ID } from "./constants.js";
import { CUSTOM_SKILLS_FLAG } from "./abilita-specifiche.js";
import { PERSONAGGIO_TABLES } from "./personaggio-extra.js";
import { POTERI_FLAG } from "./poteri.js";
import { SPHERE_SPECIALTIES_FLAG } from "./sphere-specialties.js";
import { SPHERES } from "./spheres.js";

/**
 * I tasti di reset (verdetto di Blue, 4/9 notte; dall'11/9 ognuno sta
 * nella sua sezione, a sinistra del titolo, e si vede solo con la spunta
 * «Mostra i tasti di reset» del memo di creazione): ognuno azzera una parte
 * sola della scheda, dopo una conferma. La Salute ha il suo sotto la barra.
 */
export const RESETS = Object.freeze({
  attributes: {
    label: "WOD5E_MAGE.Reset.Attributes",
    icon: "fa-dumbbell",
    changes(actor) {
      // Gli Attributi tornano al pallino di partenza del sistema.
      const update = {};
      for (const id of Object.keys(actor.system?.attributes ?? {})) update[`system.attributes.${id}.value`] = 1;
      return update;
    }
  },
  skills: {
    label: "WOD5E_MAGE.Reset.Skills",
    icon: "fa-book",
    changes(actor) {
      // Le Abilità a zero, via le Specializzazioni e le Abilità Specifiche.
      const update = {};
      for (const id of Object.keys(actor.system?.skills ?? {})) {
        update[`system.skills.${id}.value`] = 0;
        update[`system.skills.${id}.bonuses`] = [];
      }
      update[`flags.${MODULE_ID}.-=${CUSTOM_SKILLS_FLAG}`] = null;
      return update;
    }
  },
  advantages: {
    label: "WOD5E_MAGE.Reset.Advantages",
    icon: "fa-gem",
    // Pregi, Difetti e Background: sono oggetti, si cancellano.
    items: (actor) => actor.items.filter((item) => item.type === "feature").map((item) => item.id)
  },
  spheres: {
    label: "WOD5E_MAGE.Reset.Spheres",
    icon: "fa-circle-nodes",
    changes() {
      const update = {
        [`flags.${MODULE_ID}.-=selectedSpheres`]: null,
        [`flags.${MODULE_ID}.-=familySpheres`]: null,
        [`flags.${MODULE_ID}.-=${SPHERE_SPECIALTIES_FLAG}`]: null,
        // I poteri inseriti (21/9) vanno via con le Sfere.
        [`flags.${MODULE_ID}.-=${POTERI_FLAG}`]: null
      };
      for (const id of SPHERES) update[`flags.${MODULE_ID}.spheres.${id}`] = 0;
      return update;
    }
  },
  credo: {
    label: "WOD5E_MAGE.Reset.Credo",
    icon: "fa-scroll",
    // Il Credo intero: tendina, testo, Tipo, Strumenti e note delle Sfere.
    changes: () => ({ [`flags.${MODULE_ID}.-=focus`]: null })
  },
  lineage: {
    label: "WOD5E_MAGE.Reset.Lineage",
    icon: "fa-people-group",
    changes: () => ({ [`flags.${MODULE_ID}.-=lineage`]: null })
  },
  compass: {
    label: "WOD5E_MAGE.Reset.Compass",
    icon: "fa-compass",
    // La Bussola: Ambizione, Desiderio, Convinzioni e Ancore.
    changes: () => ({
      "system.headers.ambition": "",
      "system.headers.desire": "",
      [`flags.${MODULE_ID}.-=ambitionTrigger`]: null,
      [`flags.${MODULE_ID}.-=desireTrigger`]: null,
      [`flags.${MODULE_ID}.-=${PERSONAGGIO_TABLES.convictions}`]: null,
      [`flags.${MODULE_ID}.-=${PERSONAGGIO_TABLES.anchors}`]: null
    })
  }
});

export const RESET_IDS = Object.freeze(Object.keys(RESETS));

/** Il reset della scheda intera: le sette parti, più Condizioni, Salute e Note. */
export const RESET_ALL = Object.freeze({
  label: "WOD5E_MAGE.Reset.All",
  icon: "fa-rotate-left",
  changes: () => ({
    [`flags.${MODULE_ID}.salute`]: { pa: 0, ps: 0, ma: 0, ms: 0, extra: 0 },
    [`flags.${MODULE_ID}.-=note`]: null,
    [`flags.${MODULE_ID}.-=player`]: null,
    [`flags.${MODULE_ID}.-=wisdomStatus`]: null
  }),
  items: (actor) => actor.items.filter((item) => item.type === "condition").map((item) => item.id)
});

/** I tasti, nell'ordine chiesto. */
export function prepareResets(localize = (key) => key) {
  return [
    ...RESET_IDS.map((id) => ({ id, label: localize(RESETS[id].label), icon: RESETS[id].icon })),
    { id: "all", label: localize(RESET_ALL.label), icon: RESET_ALL.icon, all: true }
  ];
}

/** Gli stessi tasti per id (11/9): ogni sezione pesca il suo. */
export function prepareResetsById(localize = (key) => key) {
  return Object.fromEntries(prepareResets(localize).map((reset) => [reset.id, reset]));
}

/** Applica un reset: l'update e, se serve, la cancellazione degli oggetti. */
export async function applyReset(actor, id) {
  if (id === "all") {
    for (const each of RESET_IDS) await applyReset(actor, each);
    await applyReset(actor, RESET_ALL);
    return true;
  }
  const reset = typeof id === "object" ? id : RESETS[id];
  if (!reset) return false;
  if (reset.changes) {
    const update = reset.changes(actor);
    if (Object.keys(update).length) await actor.update(update);
  }
  if (reset.items) {
    const ids = reset.items(actor);
    if (ids.length) await actor.deleteEmbeddedDocuments("Item", ids);
  }
  return true;
}

/** Il clic sul tasto: conferma, poi azzera. */
export async function onResetSection(event, target) {
  event.preventDefault();
  const actor = this.actor;
  const id = target.dataset.reset;
  if (!RESETS[id] && id !== "all") return;
  if (!actor.isOwner) {
    ui.notifications.warn(game.i18n.format("WOD5E.Notifications.NoSufficientPermission", { string: actor.name }));
    return;
  }
  const label = game.i18n.localize(id === "all" ? RESET_ALL.label : RESETS[id].label);
  const confirmed = id === "all" ? await confermaColNome(actor, label) : await foundry.applications.api.DialogV2.confirm({
    window: { title: label },
    content: `<p>${game.i18n.format("WOD5E_MAGE.Reset.Confirm", { label })}</p>`,
    rejectClose: false,
    modal: true
  });
  if (!confirmed) return;
  await applyReset(actor, id);
}

/** Il nome scritto vale se è quello del personaggio, senza badare a maiuscole e spazi. */
export function nomeConferma(typed, name) {
  const pulisci = (value) => String(value ?? "").trim().replace(/\s+/g, " ").toLocaleLowerCase("it");
  return pulisci(name) !== "" && pulisci(typed) === pulisci(name);
}

/**
 * Il reset della scheda intera chiede una seconda conferma (Blue, 25/9
 * sera): si scrive il nome del personaggio, così non si rifà la scheda per
 * sbaglio. Il tasto resta spento finché il nome non è quello.
 */
async function confermaColNome(actor, label) {
  const name = String(actor?.name ?? "");
  const testo = foundry.utils.escapeHTML(game.i18n.format("WOD5E_MAGE.Reset.ConfermaNome", { label, name }));
  const answer = await foundry.applications.api.DialogV2.wait({
    window: { title: label },
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-roll-dialog"],
    content: `<p>${testo}</p><input type="text" name="nome" class="wod5e-mage-reset-nome" autocomplete="off" placeholder="${foundry.utils.escapeHTML(name)}" aria-label="${foundry.utils.escapeHTML(game.i18n.localize("WOD5E_MAGE.Reset.ConfermaNomeCampo"))}">`,
    buttons: [
      { action: "reset", icon: "fa-solid fa-rotate-left", label: game.i18n.localize("WOD5E_MAGE.Reset.All"), callback: (_event, button) => nomeConferma(button.form?.elements?.nome?.value, name) },
      { action: "cancel", icon: "fas fa-times", label: game.i18n.localize("WOD5E.Cancel"), default: true, callback: () => false }
    ],
    rejectClose: false,
    modal: true,
    render: (_event, dialog) => {
      const root = dialog.element;
      const input = root.querySelector("input[name=nome]");
      const button = root.querySelector("button[data-action=reset]");
      if (!input || !button) return;
      button.disabled = true;
      input.addEventListener("input", () => { button.disabled = !nomeConferma(input.value, name); });
      input.focus();
    }
  });
  return answer === true;
}
