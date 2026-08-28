import { MODULE_ID } from "./constants.js";
import { prepareSpheres } from "./spheres.js";

// Sette Strumenti per tutti, dal primo giorno: il vecchio conto «2 + Areté»
// è canone superato, gli slot non crescono più con l'Areté.
export const FOCUS_INSTRUMENT_COUNT = 7;

// Le sei famiglie del manuale (05_071): ogni Strumento si scrive a due
// livelli, prima la famiglia e poi il tuo di preciso.
export const FOCUS_INSTRUMENT_FAMILIES = Object.freeze([
  "body",
  "machine",
  "object",
  "substance",
  "word",
  "world"
]);

// I tre modi di fare Magick (05_065): la Forma si dichiara accanto al nome
// della Pratica.
export const FOCUS_FORMS = Object.freeze(["magick", "tecnomagick", "ibrida"]);

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
  const localize = globalThis.game?.i18n?.localize?.bind(globalThis.game.i18n)
    ?? ((key) => key);

  // Le famiglie in tendina, in ordine alfabetico nella lingua attiva.
  const families = FOCUS_INSTRUMENT_FAMILIES
    .map((id) => ({ id, label: localize(`WOD5E_MAGE.Focus.Families.${id}`) }))
    .sort((left, right) => left.label.localeCompare(right.label));

  // Nel Focus parlano solo le Sfere che il Mago ha sbloccato in Magick:
  // di quelle che non ha, non c'è niente da scrivere.
  const spheres = await Promise.all(
    prepareSpheres(actor).selected.map(async (sphere) => {
      const notes = String(sphereNotes[sphere.id] ?? "");
      return {
        ...sphere,
        notes,
        enrichedNotes: await enrich(notes)
      };
    })
  );

  const practiceForm = String(stored.practiceForm ?? "");

  return {
    instrumentCount,
    paradigm: String(stored.paradigm ?? ""),
    practice: String(stored.practice ?? ""),
    practiceForm,
    forms: FOCUS_FORMS.map((id) => ({
      id,
      label: localize(`WOD5E_MAGE.Focus.Forms.${id}`),
      selected: id === practiceForm
    })),
    instruments: Array.from({ length: instrumentCount }, (_, index) => {
      const id = `slot${index + 1}`;
      const kind = String(instruments[id]?.kind ?? "");
      return {
        id,
        selected: Boolean(instruments[id]?.selected),
        name: String(instruments[id]?.name ?? ""),
        kind,
        families: families.map((family) => ({
          ...family,
          selected: family.id === kind
        }))
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
