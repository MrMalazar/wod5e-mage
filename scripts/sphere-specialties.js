import { MODULE_ID } from "./constants.js";
import {
  AFFINITY_SPHERE_FLAG,
  affinitySphereFromItem,
  getAffinitySpherePackId
} from "./affinity-sphere-data.js";
import { prepareSpheres } from "./spheres.js";

/**
 * Le Specialità delle Sfere (ramo A, 4/9/2026): al terzo pallino di una
 * Sfera il giocatore sceglie uno dei suoi poteri passivi, letti dal
 * compendio delle Sfere. Non esiste più la Sfera affine. Il potere
 * dell'Ambito fa contare quell'Ambito come il minore fra il livello della
 * Sfera e il suo, senza pesare come Ambito in più nella soglia.
 */
export const SPECIALTY_MIN_RATING = 3;
export const SPHERE_SPECIALTIES_FLAG = "sphereSpecialties";

function readPowers(item) {
  if (typeof item?.getFlag === "function") return item.getFlag(MODULE_ID, AFFINITY_SPHERE_FLAG);
  return item?.flags?.[MODULE_ID]?.[AFFINITY_SPHERE_FLAG];
}

/** I poteri passivi di ogni Sfera, dal compendio nella lingua attiva. */
export async function loadSpherePowers({
  getPack = (packId) => globalThis.game?.packs?.get?.(packId),
  lang = globalThis.game?.i18n?.lang
} = {}) {
  const pack = getPack?.(getAffinitySpherePackId(lang));
  const documents = (await pack?.getDocuments?.()) ?? [];
  const powers = {};
  for (const item of documents) {
    const sphere = affinitySphereFromItem(item);
    if (sphere) powers[sphere.id] = sphere;
  }
  return powers;
}

/** Le scelte salvate: Sfera → id del potere. */
export function getSphereSpecialtyChoices(actor) {
  const stored = actor.getFlag(MODULE_ID, SPHERE_SPECIALTIES_FLAG);
  if (!stored || typeof stored !== "object") return {};
  return Object.fromEntries(
    Object.entries(stored).map(([sphereId, choice]) => [sphereId, String(choice ?? "")])
  );
}

/**
 * Le righe della scheda: una per Sfera sbloccata con almeno tre pallini,
 * con la tendina dei poteri e la descrizione di quello scelto.
 */
export function prepareSphereSpecialties(actor, { powers = {}, localize = (key) => key, locale } = {}) {
  const choices = getSphereSpecialtyChoices(actor);
  const spheres = prepareSpheres(actor, { localize, locale }).selected;

  return spheres
    .filter((sphere) => sphere.value >= SPECIALTY_MIN_RATING)
    .map((sphere) => {
      const abilities = powers[sphere.id]?.abilities ?? [];
      const choice = abilities.some((ability) => ability.id === choices[sphere.id])
        ? choices[sphere.id]
        : "";
      const chosen = abilities.find((ability) => ability.id === choice) ?? null;
      return {
        id: sphere.id,
        label: sphere.label,
        icon: sphere.icon,
        value: sphere.value,
        choice,
        hasPowers: abilities.length > 0,
        options: abilities.map((ability) => ({
          id: ability.id,
          label: ability.label,
          kind: ability.kind,
          selected: ability.id === choice
        })),
        chosen: chosen
          ? { label: chosen.label, kind: chosen.kind, description: chosen.description }
          : null
      };
    });
}

/**
 * Per il tiro: le Sfere che hanno scelto il potere dell'Ambito, con
 * l'Ambito che coprono. Conta solo dal terzo pallino.
 */
export function specialtyScopes(actor, powers = {}) {
  const choices = getSphereSpecialtyChoices(actor);
  const spheres = prepareSpheres(actor).all;
  const map = {};
  for (const sphere of spheres) {
    if (sphere.value < SPECIALTY_MIN_RATING) continue;
    const ability = (powers[sphere.id]?.abilities ?? [])
      .find((entry) => entry.id === choices[sphere.id]);
    if (ability?.kind === "ambito") map[sphere.id] = ability.id;
  }
  return map;
}
