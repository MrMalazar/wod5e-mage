import { MODULE_ID } from "./constants.js";

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

export async function prepareAffinitySphere(
  actor,
  {
    resolveUuid = globalThis.fromUuid,
    getPack = (packId) => globalThis.game?.packs?.get?.(packId),
    lang = globalThis.game?.i18n?.lang
  } = {}
) {
  const stored = actor.getFlag(MODULE_ID, AFFINITY_SPHERE_FLAG);
  const id = typeof stored === "string"
    ? stored
    : String(stored?.id ?? "");
  const uuid = typeof stored === "string"
    ? ""
    : String(stored?.uuid ?? "");

  // Resolve by logical ID from the pack for the active language. The UUID is
  // retained only as a fallback for actors saved by earlier module versions.
  if (id && typeof getPack === "function") {
    const pack = getPack(getAffinitySpherePackId(lang));
    const documents = await pack?.getDocuments?.();
    const item = documents?.find(
      (document) => readAffinityData(document)?.id === id
    );
    const sphere = affinitySphereFromItem(item);
    if (sphere) return sphere;
  }

  if (!uuid || typeof resolveUuid !== "function") return null;

  const item = await resolveUuid(uuid);
  return affinitySphereFromItem(item);
}
