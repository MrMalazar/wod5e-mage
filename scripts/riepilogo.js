import { MODULE_ID } from "./constants.js";
import { CHIAVI_VIVE } from "./abilita-essenziali.js";
import { ATTRIBUTE_KEYS } from "./tratti-icone.js";
import { PERSONAGGIO_TABLES } from "./personaggio-extra.js";
import { getSphereSelection, SPHERES } from "./spheres.js";
import { FOCUS_TOOL_IDS } from "./focus.js";
import { CONCEPT_CHALLENGE_GROUPS } from "./concept-challenge.js";

/**
 * I gradi delle partenze avanzate (LIBRO 4.10, «Partenze avanzate»): pallini
 * in più sopra la creazione base, e l'Areté pieno. Il Neofita è la base.
 */
export const GRADI = Object.freeze([
  Object.freeze({ id: "neofita", arete: 1, spheres: 0, attributes: 0, skills: 0, merits: 0, flaws: 0 }),
  Object.freeze({ id: "risvegliato", arete: 2, spheres: 1, attributes: 0, skills: 2, merits: 0, flaws: 1 }),
  Object.freeze({ id: "discepolo", arete: 3, spheres: 2, attributes: 1, skills: 3, merits: 2, flaws: 2 }),
  Object.freeze({ id: "anziano", arete: 3, spheres: 3, attributes: 1, skills: 5, merits: 5, flaws: 3 }),
  Object.freeze({ id: "maestro", arete: 4, spheres: 4, attributes: 2, skills: 7, merits: 7, flaws: 4 })
]);

/** I profili delle Abilità (LIBRO, «Le Abilità»): quanti pallini danno. */
export const PROFILI_ABILITA = Object.freeze([
  Object.freeze({ id: "bilanciato", dots: 26 }),
  Object.freeze({ id: "factotum", dots: 29 }),
  Object.freeze({ id: "specialista", dots: 22 }),
  Object.freeze({ id: "libero", dots: 25 })
]);

/** La creazione base: 22 Attributi, 7 fra Background e Pregi (9 con due gruppi della Sfida), 2 Difetti, 6 Sfere (7 con la Sfida completa). */
export const BASE_CREAZIONE = Object.freeze({ attributes: 22, merits: 7, flaws: 2, spheres: 6 });

/** I traguardi della creazione per grado, profilo e gruppi della Sfida completati. */
export function creationTargets(gradoId = "neofita", profiloId = "bilanciato", groupsDone = 0) {
  const grado = GRADI.find((g) => g.id === gradoId) ?? GRADI[0];
  const profilo = PROFILI_ABILITA.find((p) => p.id === profiloId) ?? PROFILI_ABILITA[0];
  return {
    grado: grado.id,
    profilo: profilo.id,
    arete: grado.arete,
    attributes: BASE_CREAZIONE.attributes + grado.attributes,
    skills: profilo.dots + grado.skills,
    merits: BASE_CREAZIONE.merits + (groupsDone >= 2 ? 2 : 0) + grado.merits,
    flaws: BASE_CREAZIONE.flaws + grado.flaws,
    spheres: BASE_CREAZIONE.spheres + (groupsDone >= 3 ? 1 : 0) + grado.spheres
  };
}

/** Rosso sotto, giallo sopra, verde pari (verdetto di Blue, 7/9). */
export function compareCount(value, target) {
  if (!Number.isFinite(target)) return "";
  if (value < target) return "under";
  if (value > target) return "over";
  return "exact";
}

/** Quanti gruppi della Sfida del Concetto sono completi (tutte le sette voci scritte). */
export function conceptGroupsDone(actor) {
  const stored = actor.getFlag(MODULE_ID, "conceptChallenge") ?? {};
  return CONCEPT_CHALLENGE_GROUPS.filter((group) => group.fields.every((id) => String(stored?.[id] ?? "").trim() !== "")).length;
}

/**
 * Il memo di creazione in fondo ai Tratti: conta i pallini della scheda
 * (Attributi, Abilità, Background, Vantaggi, Difetti del personaggio, Sfere)
 * e verifica che Concetto, Ancore e Convinzioni abbiano almeno una voce.
 * Solo lettura: uno specchio, non una regola.
 */
function sumDots(source, keys) {
  return keys.reduce(
    (sum, key) => sum + Math.max(Math.trunc(Number(source?.[key]?.value) || 0), 0),
    0
  );
}

function featureDots(items, featuretype) {
  return items
    .filter((item) => item?.type === "feature" && item?.system?.featuretype === featuretype)
    .reduce((sum, item) => sum + Math.max(Math.trunc(Number(item.system?.points) || 0), 0), 0);
}

function hasRow(stored, fields) {
  return Object.values(stored ?? {}).some((row) =>
    fields.some((field) => String(row?.[field] ?? "").trim() !== "")
  );
}

/** Ramo A: ogni Sfera sbloccata ha il suo Strumento fra i ventidue. */
function everySphereHasInstrument(actor) {
  const selection = getSphereSelection(actor);
  const unlocked = SPHERES.filter((id) => selection[id]);
  if (!unlocked.length) return false;
  const rows = actor.getFlag(MODULE_ID, "focus")?.sphereInstruments ?? {};
  return unlocked.every((id) => FOCUS_TOOL_IDS.includes(rows[id]?.tool));
}

export function prepareCreationSummary(actor, areteValue = null) {
  const system = actor.system ?? {};
  const items = actor.items ? Array.from(actor.items) : [];
  const sphereValues = actor.getFlag(MODULE_ID, "spheres") ?? {};
  const creazione = actor.getFlag(MODULE_ID, "creazione") ?? {};
  const groupsDone = conceptGroupsDone(actor);
  const targets = creationTargets(creazione.grado, creazione.profilo, groupsDone);

  const backgrounds = featureDots(items, "background");
  const merits = featureDots(items, "merit");
  const raw = [
    { id: "attributes", label: "WOD5E_MAGE.Riepilogo.Attributes", value: sumDots(system.attributes, ATTRIBUTE_KEYS), target: targets.attributes },
    { id: "skills", label: "WOD5E_MAGE.Riepilogo.Skills", value: sumDots(system.skills, [...CHIAVI_VIVE]), target: targets.skills },
    { id: "backgrounds", label: "WOD5E_MAGE.Riepilogo.Backgrounds", value: backgrounds, target: null },
    // Background e Pregi si contano insieme: sette punti (LIBRO, «I Vantaggi»).
    { id: "merits", label: "WOD5E_MAGE.Riepilogo.Merits", hint: "WOD5E_MAGE.Riepilogo.MeritsHint", value: backgrounds + merits, target: targets.merits },
    { id: "flaws", label: "WOD5E_MAGE.Riepilogo.Flaws", value: featureDots(items, "flaw"), target: targets.flaws },
    {
      id: "spheres",
      label: "WOD5E_MAGE.Riepilogo.Spheres",
      value: SPHERES.reduce(
        (sum, id) => sum + Math.min(Math.max(Math.trunc(Number(sphereValues[id]) || 0), 0), 5),
        0
      ),
      target: targets.spheres
    }
  ];
  const counts = raw.map((count) => ({ ...count, state: count.target === null ? "" : compareCount(count.value, count.target) }));
  const grades = GRADI.map((g) => ({ id: g.id, label: `WOD5E_MAGE.Riepilogo.Grades.${g.id}`, selected: g.id === targets.grado }));
  const profiles = PROFILI_ABILITA.map((p) => ({ id: p.id, label: `WOD5E_MAGE.Riepilogo.Profiles.${p.id}`, dots: p.dots, selected: p.id === targets.profilo }));

  const checks = [
    {
      id: "concept",
      label: "WOD5E_MAGE.Riepilogo.Concept",
      ok: String(system.headers?.concept ?? "").trim() !== ""
    },
    {
      id: "anchors",
      label: "WOD5E_MAGE.Riepilogo.Anchors",
      ok: hasRow(actor.getFlag(MODULE_ID, PERSONAGGIO_TABLES.anchors), ["name", "description"])
    },
    {
      id: "convictions",
      label: "WOD5E_MAGE.Riepilogo.Convictions",
      ok: hasRow(actor.getFlag(MODULE_ID, PERSONAGGIO_TABLES.convictions), ["text"])
    },
    {
      id: "instruments",
      label: "WOD5E_MAGE.Riepilogo.Instruments",
      ok: everySphereHasInstrument(actor)
    }
  ];
  // L'Areté del grado è un valore pieno (LIBRO 4.10): Neofita 1, Risvegliato 2, Discepolo e Anziano 3, Maestro 4.
  if (areteValue !== null) {
    checks.push({ id: "arete", label: "WOD5E_MAGE.Riepilogo.Arete", ok: Number(areteValue) === targets.arete, target: targets.arete });
  }

  return { counts, checks, targets, grades, profiles, groupsDone };
}
