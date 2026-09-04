import { MODULE_ID } from "./constants.js";

// I due compendi delle Sfere (it, en) portano ancora la chiave storica
// `affinitySphere`: oggi contengono i poteri passivi da cui si scelgono le
// Specialità delle Sfere (vedi sphere-specialties.js).

export const AFFINITY_SPHERE_FLAG = "affinitySphere";
export const AFFINITY_SPHERE_PACK_ID = `${MODULE_ID}.mage-spheres`;
export const AFFINITY_SPHERE_PACK_IDS = Object.freeze({
  it: AFFINITY_SPHERE_PACK_ID,
  en: `${MODULE_ID}.mage-spheres-en`
});

export function getAffinitySpherePackId(lang = globalThis.game?.i18n?.lang) {
  return String(lang ?? "it").toLowerCase().startsWith("en")
    ? AFFINITY_SPHERE_PACK_IDS.en
    : AFFINITY_SPHERE_PACK_IDS.it;
}

function readAffinityData(item) {
  if (typeof item?.getFlag === "function") {
    return item.getFlag(MODULE_ID, AFFINITY_SPHERE_FLAG);
  }

  return item?.flags?.[MODULE_ID]?.[AFFINITY_SPHERE_FLAG];
}

export function affinitySphereFromItem(item) {
  const source = readAffinityData(item);
  if (!source?.id || !Array.isArray(source.abilities)) return null;

  return {
    id: String(source.id),
    uuid: String(item.uuid ?? ""),
    name: String(item.name ?? source.id),
    img: String(item.img ?? ""),
    intro: String(source.intro ?? ""),
    abilities: source.abilities.map((ability) => ({
      id: String(ability.id ?? ""),
      label: String(ability.label ?? ""),
      kind: String(ability.kind ?? ""),
      description: String(ability.description ?? "")
    }))
  };
}
