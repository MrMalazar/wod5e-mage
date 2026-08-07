import { MODULE_ID } from "./constants.js";

export const CONCEPT_CHALLENGE_GROUPS = Object.freeze([
  Object.freeze({
    id: "portrait",
    fields: Object.freeze([
      "description",
      "mask",
      "routine",
      "livelihood",
      "spark",
      "cracks",
      "outlet"
    ])
  }),
  Object.freeze({
    id: "background",
    fields: Object.freeze([
      "roots",
      "skeleton",
      "monster",
      "pressure",
      "redLine",
      "refuge",
      "superstition"
    ])
  }),
  Object.freeze({
    id: "bonds",
    fields: Object.freeze([
      "beacon",
      "thorn",
      "securityBlanket",
      "lastSupper",
      "drive",
      "embodiment",
      "distance"
    ])
  })
]);

export async function prepareConceptChallenge(actor, enrichHTML) {
  const stored = actor.getFlag(MODULE_ID, "conceptChallenge") ?? {};
  const enrich = enrichHTML
    ?? globalThis.foundry?.applications?.ux?.TextEditor?.implementation?.enrichHTML
    ?? ((value) => value);

  return Promise.all(CONCEPT_CHALLENGE_GROUPS.map(async (group) => ({
    id: group.id,
    label: `WOD5E_MAGE.ConceptChallenge.Groups.${group.id}`,
    fields: await Promise.all(group.fields.map(async (id) => {
      const value = String(stored?.[id] ?? "");
      return {
        id,
        label: `WOD5E_MAGE.ConceptChallenge.Fields.${id}.Label`,
        prompt: `WOD5E_MAGE.ConceptChallenge.Fields.${id}.Prompt`,
        value,
        enrichedValue: await enrich(value)
      };
    }))
  })));
}
