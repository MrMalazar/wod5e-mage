import { MODULE_ID } from "./constants.js";

export const SPHERES = Object.freeze([
  "correspondence",
  "entropy",
  "forces",
  "life",
  "matter",
  "mind",
  "prime",
  "spirit",
  "time"
]);

export const INFLUENCE_LABELS = Object.freeze([
  "WOD5E_MAGE.Spheres.Influence.None",
  "WOD5E_MAGE.Spheres.Influence.Perceive",
  "WOD5E_MAGE.Spheres.Influence.Touch",
  "WOD5E_MAGE.Spheres.Influence.Control",
  "WOD5E_MAGE.Spheres.Influence.Command",
  "WOD5E_MAGE.Spheres.Influence.Revolutionize"
]);

function clampSphereValue(value) {
  return Math.min(Math.max(Number(value) || 0, 0), 5);
}

export function sortSpheresAlphabetically(spheres, localize, locale) {
  const getLabel = typeof localize === "function"
    ? (sphere) => localize(sphere.label)
    : (sphere) => sphere.id;

  return [...spheres].sort((left, right) => getLabel(left).localeCompare(
    getLabel(right),
    locale,
    { sensitivity: "base" }
  ));
}

export function getSphereSelection(actor) {
  const storedSelection = actor.getFlag(MODULE_ID, "selectedSpheres");
  if (storedSelection && typeof storedSelection === "object") {
    return Object.fromEntries(
      SPHERES.map((id) => [id, Boolean(storedSelection[id])])
    );
  }

  // Preserve existing characters when upgrading: any Sphere that already has
  // dots is initially treated as selected. A stored selection takes precedence
  // afterwards, so a deliberately hidden Sphere stays hidden.
  const values = actor.getFlag(MODULE_ID, "spheres") ?? {};
  return Object.fromEntries(
    SPHERES.map((id) => [id, clampSphereValue(values[id]) > 0])
  );
}

/**
 * Le Sfere di famiglia (verdetto del 4/9/2026): Famiglia, Sottofamiglia e
 * Credo sbloccano le Sfere «di famiglia», che costano meno delle esterne.
 * Sulla scheda si segnano a mano, Sfera per Sfera.
 */
export function getFamilySpheres(actor) {
  const stored = actor.getFlag(MODULE_ID, "familySpheres") ?? {};
  return Object.fromEntries(SPHERES.map((id) => [id, Boolean(stored?.[id])]));
}

export function prepareSpheres(actor, options = {}) {
  const values = actor.getFlag(MODULE_ID, "spheres") ?? {};
  const selection = getSphereSelection(actor);
  const family = getFamilySpheres(actor);

  const unsorted = SPHERES.map((id) => {
    const value = clampSphereValue(values[id]);
    return {
      id,
      label: `WOD5E_MAGE.Spheres.${id}`,
      icon: `modules/${MODULE_ID}/assets/icons/sheet/${id}.png`,
      selected: selection[id],
      family: family[id],
      value,
      influenceLabel: INFLUENCE_LABELS[value]
    };
  });

  const i18n = globalThis.game?.i18n;
  const all = sortSpheresAlphabetically(
    unsorted,
    options.localize ?? i18n?.localize?.bind(i18n),
    options.locale ?? i18n?.lang
  );

  return {
    all,
    selected: all.filter((sphere) => sphere.selected)
  };
}

export async function onSphereSelectionChange(event, target) {
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

  const sphereId = target.dataset.sphere;
  if (!SPHERES.includes(sphereId)) return;

  const selection = getSphereSelection(actor);
  selection[sphereId] = target.dataset.selected !== "true";
  await actor.setFlag(MODULE_ID, "selectedSpheres", selection);
}

/** Il clic sulla casetta: la Sfera diventa di famiglia, o torna esterna. */
export async function onFamilySphereToggle(event, target) {
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

  const sphereId = target.dataset.sphere;
  if (!SPHERES.includes(sphereId)) return;

  const family = getFamilySpheres(actor);
  family[sphereId] = !family[sphereId];
  await actor.setFlag(MODULE_ID, "familySpheres", family);
}

/**
 * Il clic su un pallino della Sfera (Blue, 25/9): un pallino vuoto accende
 * fino a lì; un pallino acceso più in basso riporta lì (da 4, il secondo fa
 * 2); l'ultimo pallino acceso si spegne (da 4, il quarto fa 3). Prima per
 * togliere l'ultimo si doveva cliccare quello prima.
 */
export function nextSphereValue(currentValue, clickedIndex) {
  const current = clampSphereValue(currentValue);
  const clicked = Math.min(Math.max(Math.trunc(Number(clickedIndex) || 0), 0), 4) + 1;
  return clicked === current ? current - 1 : clicked;
}

export async function onSphereDotChange(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!actor.isOwner) {
    ui.notifications.warn(game.i18n.format("WOD5E.Notifications.NoSufficientPermission", { string: actor.name }));
    return;
  }
  if (actor.system.locked) {
    ui.notifications.warn(game.i18n.format("WOD5E.Notifications.CannotModifyResourceString", { string: actor.name }));
    return;
  }
  const sphereId = String(target.dataset.sphere ?? "");
  if (!SPHERES.includes(sphereId)) return;
  const values = { ...(actor.getFlag(MODULE_ID, "spheres") ?? {}) };
  const next = nextSphereValue(values[sphereId], target.dataset.index);
  if (next === clampSphereValue(values[sphereId])) return;
  await actor.setFlag(MODULE_ID, "spheres", { ...values, [sphereId]: next });
}
