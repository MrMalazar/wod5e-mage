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
 * compendio delle Sfere; il quarto e il quinto pallino ne danno un'altra
 * l'uno (tre a Sfera piena). Non esiste più la Sfera affine. Il potere
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

/** Quante Specialità dà una Sfera: una al terzo pallino, poi una per pallino. */
export function specialtySlots(rating) {
  return Math.max(Math.trunc(Number(rating) || 0) - (SPECIALTY_MIN_RATING - 1), 0);
}

/**
 * Le scelte salvate: Sfera → lista degli id dei poteri, uno per slot.
 * Le schede vecchie tenevano una stringa sola: vale come primo slot.
 */
export function getSphereSpecialtyChoices(actor) {
  const stored = actor.getFlag(MODULE_ID, SPHERE_SPECIALTIES_FLAG);
  if (!stored || typeof stored !== "object") return {};
  return Object.fromEntries(
    Object.entries(stored).map(([sphereId, choice]) => {
      if (typeof choice === "string") return [sphereId, [choice]];
      if (!choice || typeof choice !== "object") return [sphereId, []];
      const list = Object.keys(choice)
        .sort((left, right) => Number(left) - Number(right))
        .map((slot) => String(choice[slot] ?? ""));
      return [sphereId, list];
    })
  );
}

/**
 * Le righe della scheda: una per Sfera sbloccata con almeno tre pallini,
 * con uno slot per Specialità (tre a cinque pallini), la tendina dei poteri
 * e la descrizione di quello scelto. Un potere preso in uno slot non si
 * ripete negli altri.
 */
export function prepareSphereSpecialties(actor, { powers = {}, localize = (key) => key, locale } = {}) {
  const choices = getSphereSpecialtyChoices(actor);
  const spheres = prepareSpheres(actor, { localize, locale }).selected;

  return spheres
    .filter((sphere) => sphere.value >= SPECIALTY_MIN_RATING)
    .map((sphere) => {
      const abilities = powers[sphere.id]?.abilities ?? [];
      const known = (id) => abilities.some((ability) => ability.id === id);
      const picked = (choices[sphere.id] ?? []).map((id) => (known(id) ? id : ""));
      const slots = Array.from({ length: specialtySlots(sphere.value) }, (_, index) => {
        const choice = picked[index] ?? "";
        const chosen = abilities.find((ability) => ability.id === choice) ?? null;
        return {
          index: index + 1,
          choice,
          options: abilities.map((ability) => ({
            id: ability.id,
            label: ability.label,
            kind: ability.kind,
            selected: ability.id === choice,
            taken: ability.id !== choice && picked.includes(ability.id)
          })),
          chosen: chosen
            ? { label: chosen.label, kind: chosen.kind, description: chosen.description }
            : null
        };
      });
      return {
        id: sphere.id,
        label: sphere.label,
        icon: sphere.icon,
        value: sphere.value,
        hasPowers: abilities.length > 0,
        slots
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
    const picked = (choices[sphere.id] ?? []).slice(0, specialtySlots(sphere.value));
    const ability = (powers[sphere.id]?.abilities ?? [])
      .find((entry) => picked.includes(entry.id) && ["ambito", "scope"].includes(entry.kind));
    if (ability) map[sphere.id] = ability.id;
  }
  return map;
}
