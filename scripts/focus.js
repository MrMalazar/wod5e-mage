import { MODULE_ID } from "./constants.js";
import { prepareSpheres } from "./spheres.js";

// Le cinque famiglie degli Strumenti (ramo A, 4/9/2026): il Mondo è cancellato.
export const FOCUS_INSTRUMENT_FAMILIES = Object.freeze([
  "object",
  "word",
  "machine",
  "substance",
  "body"
]);

// I ventidue Strumenti per la Magick, famiglia per famiglia. Ognuno regge
// un'immagine con tutte e nove le Sfere; i due «da [Professione]» chiedono
// anche il mestiere, che deve corrispondere a un'Abilità del personaggio.
export const FOCUS_TOOLS = Object.freeze([
  { id: "weapons", family: "object" },
  { id: "tradeTools", family: "object", profession: true },
  { id: "symbols", family: "object" },
  { id: "writings", family: "object" },
  { id: "musicalInstruments", family: "object" },
  { id: "prayers", family: "word" },
  { id: "commands", family: "word" },
  { id: "formulas", family: "word" },
  { id: "songs", family: "word" },
  { id: "tales", family: "word" },
  { id: "devices", family: "machine" },
  { id: "tradeApparatus", family: "machine", profession: true },
  { id: "implants", family: "machine" },
  { id: "contraptions", family: "machine" },
  { id: "herbs", family: "substance" },
  { id: "preparations", family: "substance" },
  { id: "fluids", family: "substance" },
  { id: "minerals", family: "substance" },
  { id: "gestures", family: "body" },
  { id: "movements", family: "body" },
  { id: "breath", family: "body" },
  { id: "trance", family: "body" }
]);

export const FOCUS_TOOL_IDS = Object.freeze(FOCUS_TOOLS.map((tool) => tool.id));

// I dodici Credi del manuale, in tendina; il testo libero resta accanto.
export const FOCUS_CREDOS = Object.freeze([
  "arte",
  "caos",
  "dati",
  "fede",
  "illusione",
  "legge",
  "macchina",
  "polvere",
  "potere",
  "sacro",
  "scienza",
  "suono",
  "vivo"
]);

// I tre Tipi di Magick. Il Tipo decide le famiglie di Strumenti che il Mago
// può usare (tavola dei Tipi, ramo A): Oggetto e Sostanza per tutti, Parola e
// Corpo solo alla Magick, Macchina solo alla Tecnomagick, l'Ibrida tutto.
export const FOCUS_FORMS = Object.freeze(["magick", "tecnomagick", "ibrida"]);

const FAMILIES_BY_FORM = Object.freeze({
  magick: Object.freeze(["object", "substance", "word", "body"]),
  tecnomagick: Object.freeze(["object", "substance", "machine"]),
  ibrida: FOCUS_INSTRUMENT_FAMILIES,
  "": FOCUS_INSTRUMENT_FAMILIES
});

/** Le famiglie ammesse dal Tipo dichiarato (tutte, se il Tipo manca). */
export function familiesForForm(form) {
  return FAMILIES_BY_FORM[form] ?? FOCUS_INSTRUMENT_FAMILIES;
}

function getTextEnricher(enrichHTML) {
  return enrichHTML
    ?? globalThis.foundry?.applications?.ux?.TextEditor?.implementation?.enrichHTML
    ?? ((value) => value);
}

/**
 * I sei slot della scheda vecchia (uno per famiglia) si riversano nelle
 * righe di Sfera, in ordine, finché il giocatore non salva la prima volta:
 * il vecchio nome finisce nel «tuo di preciso» con la famiglia davanti, così
 * si vede da dove viene e si sistema a mano.
 */
export function legacyInstrumentNames(legacyInstruments, localize) {
  return Object.keys(legacyInstruments ?? {})
    .filter((key) => /^slot\d+$/.test(key))
    .sort((left, right) => Number(left.slice(4)) - Number(right.slice(4)))
    .map((key) => legacyInstruments[key] ?? {})
    .filter((slot) => String(slot.name ?? "").trim() || String(slot.kind ?? "").trim())
    .map((slot) => {
      const name = String(slot.name ?? "").trim();
      const kind = String(slot.kind ?? "").trim();
      const family = kind ? localize(`WOD5E_MAGE.Focus.Families.${kind}`) : "";
      if (family && name) return `${family} · ${name}`;
      return family || name;
    });
}

/**
 * Le righe degli Strumenti: una per Sfera sbloccata, con lo Strumento scelto
 * fra i ventidue, il mestiere quando serve e il tuo di preciso.
 */
export function prepareSphereInstruments(actor, { localize, spheres, form } = {}) {
  const stored = actor.getFlag(MODULE_ID, "focus") ?? {};
  const rowsStored = stored.sphereInstruments;
  const hasRows = rowsStored && typeof rowsStored === "object";
  const legacyNames = hasRows ? [] : legacyInstrumentNames(stored.instruments, localize);
  const allowedFamilies = familiesForForm(form);

  const rows = spheres.map((sphere, index) => {
    const row = hasRows ? (rowsStored[sphere.id] ?? {}) : {};
    const tool = FOCUS_TOOL_IDS.includes(row.tool) ? row.tool : "";
    const definition = FOCUS_TOOLS.find((entry) => entry.id === tool);
    return {
      id: sphere.id,
      label: sphere.label,
      icon: sphere.icon,
      value: sphere.value,
      tool,
      family: definition?.family ?? "",
      needsProfession: Boolean(definition?.profession),
      profession: String(row.profession ?? ""),
      name: hasRows ? String(row.name ?? "") : String(legacyNames[index] ?? ""),
      outsideForm: Boolean(definition) && !allowedFamilies.includes(definition.family),
      sharedWith: [],
      sharedList: ""
    };
  });

  // Lo stesso Strumento su due Sfere è possibile e pericoloso: la riga lo dice.
  rows.forEach((row) => {
    if (!row.tool) return;
    row.sharedWith = rows
      .filter((other) => other !== row && other.tool === row.tool)
      .map((other) => localize(other.label));
    row.sharedList = row.sharedWith.join(", ");
  });

  const families = FOCUS_INSTRUMENT_FAMILIES.map((familyId) => ({
    id: familyId,
    label: localize(`WOD5E_MAGE.Focus.Families.${familyId}`),
    allowed: allowedFamilies.includes(familyId),
    tools: FOCUS_TOOLS
      .filter((entry) => entry.family === familyId)
      .map((entry) => ({
        id: entry.id,
        label: localize(`WOD5E_MAGE.Focus.Tools.${entry.id}`)
      }))
  }));

  return rows.map((row) => ({
    ...row,
    families: families.map((family) => ({
      ...family,
      tools: family.tools.map((entry) => ({ ...entry, selected: entry.id === row.tool }))
    }))
  }));
}

export async function prepareFocus(actor, enrichHTML) {
  const stored = actor.getFlag(MODULE_ID, "focus") ?? {};
  const sphereNotes = stored.sphereNotes ?? {};
  const enrich = getTextEnricher(enrichHTML);
  const localize = globalThis.game?.i18n?.localize?.bind(globalThis.game.i18n)
    ?? ((key) => key);

  // Nel Credo parlano solo le Sfere che il Mago ha sbloccato in Magick:
  // di quelle che non ha, non c'è niente da scrivere.
  const selectedSpheres = prepareSpheres(actor).selected;
  const spheres = await Promise.all(
    selectedSpheres.map(async (sphere) => {
      const notes = String(sphereNotes[sphere.id] ?? "");
      return {
        ...sphere,
        notes,
        enrichedNotes: await enrich(notes)
      };
    })
  );

  const practiceForm = FOCUS_FORMS.includes(stored.practiceForm) ? stored.practiceForm : "";
  const credo = FOCUS_CREDOS.includes(stored.credo) ? stored.credo : "";

  return {
    credo,
    credoLabel: FOCUS_CREDOS.includes(credo) ? localize(`WOD5E_MAGE.Focus.Credos.${credo}`) : "",
    credos: FOCUS_CREDOS.map((id) => ({
      id,
      label: localize(`WOD5E_MAGE.Focus.Credos.${id}`),
      selected: id === credo
    })),
    paradigm: String(stored.paradigm ?? ""),
    practiceForm,
    forms: FOCUS_FORMS.map((id) => ({
      id,
      label: localize(`WOD5E_MAGE.Focus.Forms.${id}`),
      selected: id === practiceForm
    })),
    instruments: prepareSphereInstruments(actor, {
      localize,
      spheres: selectedSpheres,
      form: practiceForm
    }),
    spheres
  };
}
