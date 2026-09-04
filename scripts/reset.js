import { MODULE_ID } from "./constants.js";
import { CUSTOM_SKILLS_FLAG } from "./abilita-specifiche.js";
import { PERSONAGGIO_TABLES } from "./personaggio-extra.js";
import { SPHERE_SPECIALTIES_FLAG } from "./sphere-specialties.js";
import { SPHERES } from "./spheres.js";

/**
 * I tasti di reset in fondo al memo di creazione (verdetto di Blue, 4/9
 * notte): ognuno azzera una parte sola della scheda, dopo una conferma.
 * La Salute ha il suo sotto la barra.
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
        [`flags.${MODULE_ID}.-=${SPHERE_SPECIALTIES_FLAG}`]: null
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

/** I tasti, nell'ordine chiesto. */
export function prepareResets(localize = (key) => key) {
  return RESET_IDS.map((id) => ({ id, label: localize(RESETS[id].label), icon: RESETS[id].icon }));
}

/** Applica un reset: l'update e, se serve, la cancellazione degli oggetti. */
export async function applyReset(actor, id) {
  const reset = RESETS[id];
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
  if (!RESETS[id]) return;
  if (!actor.isOwner) {
    ui.notifications.warn(game.i18n.format("WOD5E.Notifications.NoSufficientPermission", { string: actor.name }));
    return;
  }
  const label = game.i18n.localize(RESETS[id].label);
  const confirmed = await foundry.applications.api.DialogV2.confirm({
    window: { title: label },
    content: `<p>${game.i18n.format("WOD5E_MAGE.Reset.Confirm", { label })}</p>`,
    rejectClose: false,
    modal: true
  });
  if (!confirmed) return;
  await applyReset(actor, id);
}
