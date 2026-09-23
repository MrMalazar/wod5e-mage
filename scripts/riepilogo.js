import { MODULE_ID } from "./constants.js";
import { CHIAVI_VIVE, TETTO_CREAZIONE, skillsOverCap } from "./abilita-essenziali.js";
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

/**
 * La creazione base: 22 Attributi, 19 pallini di Abilità liberi col tetto a 3
 * (V6: 18 su tredici voci; qui una voce in più vale un pallino in più, verdetto
 * di Blue dell'11/9; le tre ripartizioni del 18/8 non esistono più), 7 fra Background
 * e Pregi, 2 Difetti, 6 Sfere. Sopra la base i premi della Sfida (PREMI_SFIDA)
 * e i pallini del grado.
 */
export const BASE_CREAZIONE = Object.freeze({ attributes: 22, skills: 19, skillCap: TETTO_CREAZIONE, merits: 7, flaws: 2, spheres: 6 });

/**
 * I premi della Sfida del Concetto (LIBRO 05_015, «i premi si sommano»): un
 * gruppo completo dà +1 punto Abilità, due gruppi +2 punti Vantaggio, tutti e
 * tre un potere in più (il LIBRO diceva «+1 punto Sfera»; Blue, 23/9: «è più
 * un potere», perché col listino del 21/9 le Sfere non si comprano più a
 * pallini). Nel memo si deve vedere l'aumento che viene dalla Sfida (il
 * modulo dava solo gli ultimi due). Il potere in più non alza nessun conto:
 * i poteri li inserisce il giocatore.
 */
export const PREMI_SFIDA = Object.freeze([
  Object.freeze({ groups: 1, count: "skills", bonus: 1, label: "WOD5E_MAGE.Riepilogo.SfidaPremi.skills" }),
  Object.freeze({ groups: 2, count: "merits", bonus: 2, label: "WOD5E_MAGE.Riepilogo.SfidaPremi.merits" }),
  Object.freeze({ groups: 3, count: "poteri", bonus: 1, label: "WOD5E_MAGE.Riepilogo.SfidaPremi.poteri" })
]);

/** Quanto la Sfida aggiunge a ogni conto coi gruppi completati. */
export function sfidaBonuses(groupsDone = 0) {
  const done = Math.max(Math.trunc(Number(groupsDone) || 0), 0);
  const bonuses = { skills: 0, merits: 0, spheres: 0, poteri: 0 };
  for (const premio of PREMI_SFIDA) if (done >= premio.groups) bonuses[premio.count] += premio.bonus;
  return bonuses;
}

/** I traguardi della creazione per grado e gruppi della Sfida completati. */
export function creationTargets(gradoId = "neofita", groupsDone = 0) {
  const grado = GRADI.find((g) => g.id === gradoId) ?? GRADI[0];
  const sfida = sfidaBonuses(groupsDone);
  return {
    grado: grado.id,
    arete: grado.arete,
    attributes: BASE_CREAZIONE.attributes + grado.attributes,
    skills: BASE_CREAZIONE.skills + sfida.skills + grado.skills,
    skillCap: BASE_CREAZIONE.skillCap,
    merits: BASE_CREAZIONE.merits + sfida.merits + grado.merits,
    flaws: BASE_CREAZIONE.flaws + grado.flaws,
    spheres: BASE_CREAZIONE.spheres + grado.spheres,
    poteri: sfida.poteri
  };
}

/**
 * La riga della Sfida per il memo: quanti gruppi sono completi e i tre premi,
 * ognuno con `earned` (già preso) e il conto che alza.
 */
export function sfidaSummary(groupsDone = 0) {
  const done = Math.max(Math.trunc(Number(groupsDone) || 0), 0);
  return {
    done,
    total: CONCEPT_CHALLENGE_GROUPS.length,
    complete: done >= CONCEPT_CHALLENGE_GROUPS.length,
    prizes: PREMI_SFIDA.map((premio) => ({ ...premio, earned: done >= premio.groups }))
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
  const targets = creationTargets(creazione.grado, groupsDone);

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
  const sfidaBonus = sfidaBonuses(groupsDone);
  const counts = raw.map((count) => ({
    ...count,
    state: count.target === null ? "" : compareCount(count.value, count.target),
    // Quanto del traguardo viene dalla Sfida (23/9): si scrive accanto al conto.
    sfida: sfidaBonus[count.id] ?? 0
  }));
  const grades = GRADI.map((g) => ({ id: g.id, label: `WOD5E_MAGE.Riepilogo.Grades.${g.id}`, selected: g.id === targets.grado }));

  const overCap = skillsOverCap(system.skills, targets.skillCap);
  const checks = [
    // Nessuna Abilità oltre il tetto della creazione (V6: tre pallini).
    { id: "skillCap", label: "WOD5E_MAGE.Riepilogo.SkillCap", ok: overCap.length === 0, target: targets.skillCap },
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

  return { counts, checks, targets, grades, groupsDone, sfida: sfidaSummary(groupsDone) };
}
