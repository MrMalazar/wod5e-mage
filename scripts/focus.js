import { MODULE_ID } from "./constants.js";
import { prepareSpheres } from "./spheres.js";

// Sette Strumenti per tutti, dal primo giorno: il vecchio conto «2 + Areté»
// è canone superato, gli slot non crescono più con l'Areté.
export const FOCUS_INSTRUMENT_COUNT = 7;

function getTextEnricher(enrichHTML) {
  return enrichHTML
    ?? globalThis.foundry?.applications?.ux?.TextEditor?.implementation?.enrichHTML
    ?? ((value) => value);
}

export async function prepareFocus(actor, enrichHTML) {
  const stored = actor.getFlag(MODULE_ID, "focus") ?? {};
  const instrumentCount = FOCUS_INSTRUMENT_COUNT;
  const instruments = stored.instruments ?? {};
  const sphereNotes = stored.sphereNotes ?? {};
  const enrich = getTextEnricher(enrichHTML);

  const spheres = await Promise.all(
    prepareSpheres(actor).all.map(async (sphere) => {
      const notes = String(sphereNotes[sphere.id] ?? "");
      // La parentesi col livello compare solo per le Sfere che il Mago ha
      // davvero: nasconderne una conserva i pallini, ma non la fa parlare.
      return {
        ...sphere,
        levelLabel: sphere.selected && sphere.value > 0 ? sphere.influenceLabel : "",
        notes,
        enrichedNotes: await enrich(notes)
      };
    })
  );

  return {
    instrumentCount,
    paradigm: String(stored.paradigm ?? ""),
    practice: String(stored.practice ?? ""),
    instruments: Array.from({ length: instrumentCount }, (_, index) => {
      const id = `slot${index + 1}`;
      return {
        id,
        selected: Boolean(instruments[id]?.selected),
        name: String(instruments[id]?.name ?? "")
      };
    }),
    spheres
  };
}

export async function onFocusInstrumentToggle(event, target) {
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

  const slotId = target.dataset.slot;
  if (!/^slot[1-7]$/.test(slotId)) return;

  await actor.update({
    [`flags.${MODULE_ID}.focus.instruments.${slotId}.selected`]:
      target.dataset.selected !== "true"
  });
}
