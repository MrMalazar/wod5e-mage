import { MODULE_ID } from "./constants.js";
import { CREDO_SFERE } from "./data/credo-sfere.js";
import { getSphereSelection, SPHERES } from "./spheres.js";

/**
 * Famiglie e Sottofamiglie del Mago, con le Sfere che portano (capitolo 03
 * del LIBRO: le nove Tradizioni con le loro sette, le dieci Craft dei
 * Disparati), e le Sfere affini di ogni Credo (studi dei Credi, verdetto
 * del 31/8). Scegliere Famiglia e Sottofamiglia sblocca le loro Sfere a 1;
 * scegliere il Credo sblocca le sue, senza segnare il pallino (4/9 notte).
 */
export const FAMIGLIE = Object.freeze([
  {
    id: "hermes", fazione: "tradizioni", label: "Ordine di Hermes", sphere: "forces", subKind: "Casa",
    sottofamiglie: [
      { id: "verdicta", label: "Casa Verdicta", sphere: "mind" },
      { id: "quaesitor", label: "Casa Quaesitor", sphere: "correspondence" },
      { id: "imperator", label: "Casa Imperator", sphere: "entropy" },
      { id: "verditius", label: "Casa Verditius", sphere: "prime" }
    ]
  },
  {
    id: "verbena", fazione: "tradizioni", label: "Verbena", sphere: "life", subKind: "Circolo",
    sottofamiglie: [
      { id: "giardinieri", label: "Giardinieri dell'Albero", sphere: "prime" },
      { id: "streghe", label: "Streghe della Siepe", sphere: "spirit" },
      { id: "figlie", label: "Figlie della Tempesta", sphere: "forces" },
      { id: "tessitori", label: "Tessitori di Carne", sphere: "matter" }
    ]
  },
  {
    id: "adepti", fazione: "tradizioni", label: "Adepti Virtuali", sphere: "correspondence", subKind: "Fazione",
    sottofamiglie: [
      { id: "elite", label: "L'Elite Mercuriale", sphere: "mind" },
      { id: "caotici", label: "I Caotici", sphere: "entropy" },
      { id: "naviganti", label: "I Naviganti", sphere: "spirit" },
      { id: "sentinelle", label: "Le Sentinelle", sphere: "forces" }
    ]
  },
  {
    id: "coro", fazione: "tradizioni", label: "Coro Celeste", sphere: "prime", subKind: "Voce",
    sottofamiglie: [
      { id: "culto", label: "Comitato per il Culto", sphere: "spirit" },
      { id: "eminentiari", label: "Eminentiari", sphere: "forces" },
      { id: "messianici", label: "Messianici", sphere: "mind" },
      { id: "affariTerreni", label: "Commissione per gli Affari Terreni", sphere: "life" }
    ]
  },
  {
    id: "akashayana", fazione: "tradizioni", label: "Akashayana", sphere: "mind", subKind: "Scuola",
    sottofamiglie: [
      { id: "jnani", label: "Jnani", sphere: "spirit" },
      { id: "vajrapani", label: "Vajrapani", sphere: "forces" },
      { id: "wulong", label: "Wūlóng", sphere: "life" },
      { id: "censori", label: "Censori", sphere: "matter" }
    ]
  },
  {
    id: "sahajiya", fazione: "tradizioni", label: "Sahajiya", sphere: "time", subKind: "Corrente",
    sottofamiglie: [
      { id: "sahaja", label: "I Sahaja", sphere: "life" },
      { id: "techEcstatics", label: "I Tech-Ecstatics", sphere: "mind" },
      { id: "tantrika", label: "I Tantrika", sphere: "prime" },
      { id: "fate", label: "Le Fate", sphere: "entropy" }
    ]
  },
  {
    id: "khavadi", fazione: "tradizioni", label: "Kha'vadi", sphere: "spirit", subKind: "Via",
    sottofamiglie: [
      { id: "howahkan", label: "Gli Howahkan", sphere: "life" },
      { id: "guaritori", label: "I Guaritori", sphere: "mind" },
      { id: "cemento", label: "I Portavoce del Cemento", sphere: "matter" },
      { id: "ronda", label: "La Ronda", sphere: "forces" }
    ]
  },
  {
    id: "euthanatoi", fazione: "tradizioni", label: "Euthanatoi", sphere: "entropy", subKind: "Lignaggio",
    sottofamiglie: [
      { id: "chakravanti", label: "I Chakravanti", sphere: "spirit" },
      { id: "madzimbabwe", label: "I Madzimbabwe", sphere: "life" },
      { id: "melograni", label: "I Melograni", sphere: "matter" },
      { id: "esattori", label: "Gli Esattori", sphere: "time" }
    ]
  },
  {
    id: "etere", fazione: "tradizioni", label: "Figli dell'Etere", sphere: "matter", subKind: "Dipartimento",
    sottofamiglie: [
      { id: "assiomatici", label: "Gli Assiomatici", sphere: "prime" },
      { id: "filantropica", label: "La Società Filantropica", sphere: "mind" },
      { id: "eteronauti", label: "Gli Eteronauti", sphere: "spirit" },
      { id: "arsenale", label: "L'Arsenale", sphere: "forces" }
    ]
  },
  // Le dieci Craft: una Sfera sola, nessuna Sottofamiglia.
  { id: "ngoma", fazione: "disparati", label: "Ngoma", sphere: "prime", sottofamiglie: [] },
  { id: "cavalieri", fazione: "disparati", label: "Cavalieri del Tempio di Salomone", sphere: "forces", sottofamiglie: [] },
  { id: "taftani", fazione: "disparati", label: "Taftâni", sphere: "spirit", sottofamiglie: [] },
  { id: "hollow", fazione: "disparati", label: "Hollow Ones", sphere: "", sottofamiglie: [] },
  { id: "batin", fazione: "disparati", label: "Ahl-i-Batin", sphere: "correspondence", sottofamiglie: [] },
  { id: "kahu", fazione: "disparati", label: "Kahu", sphere: "spirit", sottofamiglie: [] },
  { id: "ippolita", fazione: "disparati", label: "Sorelle di Ippolita", sphere: "life", sottofamiglie: [] },
  { id: "wuLung", fazione: "disparati", label: "Wu Lung", sphere: "matter", sottofamiglie: [] },
  { id: "bataa", fazione: "disparati", label: "Bata'a", sphere: "spirit", sottofamiglie: [] },
  { id: "solificati", fazione: "disparati", label: "Solificati", sphere: "matter", sottofamiglie: [] }
]);

export const FAZIONI = Object.freeze({
  tradizioni: "WOD5E_MAGE.Lineage.Factions.tradizioni",
  disparati: "WOD5E_MAGE.Lineage.Factions.disparati"
});

/** Le Sfere affini di ogni Credo: la prima prende il punto, la seconda si apre a zero. Potere e Scienza sono sciolti. */
export const CREDO_SPHERES = Object.freeze({
  arte: ["matter", "mind"],
  caos: ["entropy", "correspondence"],
  dati: ["correspondence", "prime"],
  fede: ["entropy", "life"],
  illusione: ["mind", "correspondence"],
  legge: ["prime", "entropy"],
  macchina: ["time", "matter"],
  polvere: ["time", "life"],
  potere: [],
  sacro: ["spirit", "forces"],
  scienza: [],
  suono: ["forces", "spirit"],
  vivo: ["life", "forces"]
});

/** I Credi «sciolti»: Potere e Scienza non hanno Sfere fisse, le sceglie il giocatore. */
export function isFreeCredo(credo) {
  return Object.hasOwn(CREDO_SPHERES, credo) && CREDO_SPHERES[credo].length === 0;
}

/** Le due Sfere scelte per un Credo sciolto (flag focus.credoSpheres), pulite. */
export function chosenCredoSpheres(choice) {
  const picks = [choice?.first, choice?.second].map((id) => String(id ?? "")).filter((id) => SPHERES.includes(id));
  return picks.filter((id, index) => picks.indexOf(id) === index);
}

/** Le Sfere di famiglia del Credo: le sue fisse, o le due scelte se è sciolto. */
export function credoSpheresFor(credo, choice) {
  if (isFreeCredo(credo)) return chosenCredoSpheres(choice);
  return [...(CREDO_SPHERES[credo] ?? [])];
}

export function findFamiglia(id) {
  return FAMIGLIE.find((famiglia) => famiglia.id === id) ?? null;
}

export function findSottofamiglia(famigliaId, id) {
  return findFamiglia(famigliaId)?.sottofamiglie.find((sub) => sub.id === id) ?? null;
}

/**
 * Le Sfere che l'appartenenza porta: Famiglia e Sottofamiglia a 1,
 * il Credo di sola presenza.
 */
export function lineageSpheres({ famiglia = "", sottofamiglia = "", credo = "", credoSpheres = null } = {}) {
  const dotted = [];
  const family = findFamiglia(famiglia);
  if (family?.sphere) dotted.push(family.sphere);
  const sub = findSottofamiglia(famiglia, sottofamiglia);
  if (sub?.sphere && !dotted.includes(sub.sphere)) dotted.push(sub.sphere);
  const present = credoSpheresFor(credo, credoSpheres).filter((id) => !dotted.includes(id));
  return { dotted, present };
}

/**
 * I cambi da fondere in un aggiornamento dell'attore quando cambia
 * l'appartenenza o il Credo: sblocca le Sfere (di famiglia) e, per Famiglia
 * e Sottofamiglia, segna il primo pallino se manca. Niente viene tolto.
 * `before` è lo stato dell'attore, `changes` il diff dell'update.
 */
export function lineageSphereChanges(before, changes) {
  const flags = changes?.flags?.[MODULE_ID] ?? {};
  const lineageChange = flags.lineage ?? null;
  const credoChange = flags.focus && Object.hasOwn(flags.focus, "credo") ? String(flags.focus.credo ?? "") : null;
  // Le due Sfere scelte per un Credo sciolto (Potere, Scienza).
  const choiceChange = flags.focus && Object.hasOwn(flags.focus, "credoSpheres") ? flags.focus.credoSpheres : null;
  if (!lineageChange && credoChange === null && choiceChange === null) return null;

  const current = before.lineage ?? {};
  const famiglia = lineageChange && Object.hasOwn(lineageChange, "famiglia") ? String(lineageChange.famiglia ?? "") : String(current.famiglia ?? "");
  const requestedSub = lineageChange && Object.hasOwn(lineageChange, "sottofamiglia") ? String(lineageChange.sottofamiglia ?? "") : String(current.sottofamiglia ?? "");
  let sottofamiglia = requestedSub;
  const familyChanged = famiglia !== String(current.famiglia ?? "");
  // La Sottofamiglia segue la Famiglia: se non è sua, si azzera.
  if (sottofamiglia && !findSottofamiglia(famiglia, sottofamiglia)) sottofamiglia = "";
  const subChanged = sottofamiglia !== String(current.sottofamiglia ?? "");
  const credo = credoChange ?? String(before.credo ?? "");
  const credoChanged = credoChange !== null && credo !== String(before.credo ?? "");
  const choice = { ...(before.credoSpheres ?? {}), ...(choiceChange ?? {}) };
  const choiceChanged = choiceChange !== null && chosenCredoSpheres(choice).join() !== chosenCredoSpheres(before.credoSpheres).join();

  const out = { lineage: {}, selectedSpheres: {}, familySpheres: {}, spheres: {} };
  if (sottofamiglia !== requestedSub) out.lineage.sottofamiglia = sottofamiglia;

  const values = before.spheres ?? {};
  const unlock = (id, withDot) => {
    if (!SPHERES.includes(id)) return;
    out.selectedSpheres[id] = true;
    out.familySpheres[id] = true;
    if (withDot && !(Number(values[id]) > 0)) out.spheres[id] = 1;
  };
  if (familyChanged) unlock(findFamiglia(famiglia)?.sphere, true);
  if (subChanged) unlock(findSottofamiglia(famiglia, sottofamiglia)?.sphere, true);
  if (credoChanged || (choiceChanged && isFreeCredo(credo))) for (const id of credoSpheresFor(credo, choice)) unlock(id, false);

  // Il Credo scelto scrive cos'è ogni Sfera nella sua ottica (studi dei Credi),
  // solo nelle caselle vuote: le parole del giocatore restano sue.
  if (credoChanged && CREDO_SFERE[credo]) {
    const notesNow = { ...(before.sphereNotes ?? {}), ...(flags.focus?.sphereNotes ?? {}) };
    const sphereNotes = {};
    for (const [id, text] of Object.entries(CREDO_SFERE[credo])) {
      if (!SPHERES.includes(id) || !isBlankNote(notesNow[id])) continue;
      sphereNotes[id] = `<p>${escapeHtml(text)}</p>`;
    }
    if (Object.keys(sphereNotes).length) out.focus = { sphereNotes };
  }

  const result = {};
  for (const [key, value] of Object.entries(out)) {
    if (Object.keys(value).length) result[key] = value;
  }
  return Object.keys(result).length ? result : null;
}

/** Una nota vuota: niente, o solo un paragrafo senza parole. */
export function isBlankNote(value) {
  return !String(value ?? "").replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Le tendine della pagina Personaggio. */
export function prepareLineageChoices(lineage, localize = (key) => key) {
  const groups = Object.entries(FAZIONI).map(([fazione, label]) => ({
    id: fazione,
    label: localize(label),
    famiglie: FAMIGLIE.filter((famiglia) => famiglia.fazione === fazione).map((famiglia) => ({
      id: famiglia.id,
      label: famiglia.label,
      selected: famiglia.id === lineage.famiglia
    }))
  }));
  const family = findFamiglia(lineage.famiglia);
  const sottofamiglie = (family?.sottofamiglie ?? []).map((sub) => ({
    id: sub.id,
    label: sub.label,
    selected: sub.id === lineage.sottofamiglia
  }));
  const sub = findSottofamiglia(lineage.famiglia, lineage.sottofamiglia);
  return {
    groups,
    sottofamiglie,
    subKind: family?.subKind ?? "",
    hasSubfamilies: sottofamiglie.length > 0,
    // Il simbolo della Sfera che la scelta porta, a sinistra della tendina.
    familySphere: sphereBadge(family?.sphere, localize),
    subSphere: sphereBadge(sub?.sphere, localize)
  };
}

/** I simboli delle due Sfere affini del Credo (Potere e Scienza: nessuno). */
export function credoSphereBadges(credo, localize = (key) => key, choice = null) {
  return credoSpheresFor(credo, choice).map((id) => sphereBadge(id, localize)).filter(Boolean);
}

/** Le tendine delle due Sfere per un Credo sciolto: tutte e nove, con la scelta segnata. */
export function prepareCredoSphereChoices(choice, localize = (key) => key) {
  const picks = { first: String(choice?.first ?? ""), second: String(choice?.second ?? "") };
  return ["first", "second"].map((slot) => ({
    slot,
    options: SPHERES.map((id) => ({ id, label: localize(`WOD5E_MAGE.Spheres.${id}`), selected: picks[slot] === id }))
  }));
}

export function sphereBadge(id, localize) {
  if (!id || !SPHERES.includes(id)) return null;
  return { id, label: localize(`WOD5E_MAGE.Spheres.${id}`), icon: `modules/${MODULE_ID}/assets/icons/sheet/${id}.png` };
}

/** L'attore com'è adesso, per lineageSphereChanges. */
export function lineageStateOf(actor) {
  const focus = actor.getFlag(MODULE_ID, "focus") ?? {};
  return {
    lineage: actor.getFlag(MODULE_ID, "lineage") ?? {},
    credo: focus.credo ?? "",
    credoSpheres: focus.credoSpheres ?? {},
    sphereNotes: focus.sphereNotes ?? {},
    spheres: actor.getFlag(MODULE_ID, "spheres") ?? {}
  };
}

/** Prima dell'aggiornamento: le Sfere dell'appartenenza entrano nello stesso update. */
export function registerLineageSpheres() {
  Hooks.on("preUpdateActor", (actor, changes) => {
    if (!actor?.getFlag) return;
    const extra = lineageSphereChanges(lineageStateOf(actor), changes);
    if (!extra) return;
    // Senza una selezione salvata, la scrittura parziale nasconderebbe le
    // altre Sfere: si scrive la selezione intera, com'è oggi.
    if (extra.selectedSpheres && !actor.getFlag(MODULE_ID, "selectedSpheres")) {
      extra.selectedSpheres = { ...getSphereSelection(actor), ...extra.selectedSpheres };
    }
    // Fusione profonda: le note del Credo si aggiungono a quelle già nel diff.
    foundry.utils.mergeObject(changes, foundry.utils.expandObject({ [`flags.${MODULE_ID}`]: extra }), { inplace: true });
  });
}
