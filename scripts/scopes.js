import { SPHERES } from "./spheres.js";

/**
 * Gli Ambiti sono le sei colonne della Tabella dei Successi Extra (5.8).
 * Sono liberi per tutti: nessuna Sfera li sblocca o li vieta. La scheda non
 * tiene più contatori per Ambito; mostra soltanto dove la Sfera d'Affinità
 * regala successi automatici, e il listino completo del manuale.
 */
export const SCOPES = Object.freeze([
  "potency",
  "duration",
  "area",
  "targets",
  "conditions",
  "range"
]);

/** I tracciati su cui il Dono lavora quando non lavora su un Ambito. */
export const GIFT_TRACKS = Object.freeze(["health", "willpower", "wisdom"]);

/** Colonne del listino: sette gradini di successi extra. */
export const SCOPE_TABLE_STEPS = 7;

/** «Le Sfere che lo prediligono», come nel listino completo del 5.8. */
export const SCOPE_FAVORED_SPHERES = Object.freeze({
  potency: ["forces", "prime", "spirit", "life"],
  duration: ["matter", "prime", "time"],
  area: ["correspondence", "forces", "matter"],
  targets: ["entropy", "mind", "life"],
  conditions: ["entropy", "mind", "time"],
  range: ["correspondence", "spirit"]
});

/**
 * Il Dono della Sfera d'Affinità: la quarta abilità del compendio parla o di
 * un Ambito (successi automatici pari ad Areté) o di un tracciato.
 */
export function prepareAffinityGift(affinitySphere, arete = 0) {
  if (!affinitySphere) return null;

  const abilities = Array.isArray(affinitySphere.abilities) ? affinitySphere.abilities : [];
  const gift = abilities.find((ability) => SCOPES.includes(ability.id))
    ?? abilities.find((ability) => GIFT_TRACKS.includes(ability.id));
  if (!gift) return null;

  const successes = Math.max(Math.trunc(Number(arete)) || 0, 0);

  if (SCOPES.includes(gift.id)) {
    return {
      kind: "scope",
      isScope: true,
      id: gift.id,
      label: `WOD5E_MAGE.Scopes.${gift.id}`,
      successes,
      sphereName: String(affinitySphere.name ?? ""),
      sphereImg: String(affinitySphere.img ?? "")
    };
  }

  return {
    kind: "track",
    isScope: false,
    id: gift.id,
    label: String(gift.label ?? gift.id),
    successes: 0,
    sphereName: String(affinitySphere.name ?? ""),
    sphereImg: String(affinitySphere.img ?? "")
  };
}

/**
 * Il listino completo (5.8): sei righe per sette gradini, con le Sfere che
 * prediligono ogni Ambito. La riga del Dono viene segnata per accendersi.
 */
export function prepareScopeTable({ gift = null, localize = (key) => key } = {}) {
  const steps = Array.from({ length: SCOPE_TABLE_STEPS }, (_, index) => index + 1);

  return {
    steps,
    rows: SCOPES.map((id) => ({
      id,
      label: `WOD5E_MAGE.Scopes.${id}`,
      gift: gift?.kind === "scope" && gift.id === id,
      cells: steps.map((step) => ({
        step,
        label: `WOD5E_MAGE.Scopes.Table.${id}.${step}`
      })),
      spheres: SCOPE_FAVORED_SPHERES[id]
        .filter((sphere) => SPHERES.includes(sphere))
        .map((sphere) => localize(`WOD5E_MAGE.Spheres.${sphere}`))
        .join(", ")
    }))
  };
}
