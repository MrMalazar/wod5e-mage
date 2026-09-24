import { MODULE_ID } from "./constants.js";
import { CHIAVI_VIVE, TETTO_CREAZIONE, skillsOverCap } from "./abilita-essenziali.js";
import { ATTRIBUTE_KEYS } from "./tratti-icone.js";
import { PERSONAGGIO_TABLES } from "./personaggio-extra.js";
import { getSphereSelection, SPHERES } from "./spheres.js";
import { poteriDelPersonaggio } from "./poteri.js";
import { credoFamilySphere, credoSpheresFor, findFamiglia, findSottofamiglia } from "./famiglie.js";
import { getLineage } from "./lineage.js";
import { FOCUS_TOOL_IDS } from "./focus.js";
import { CONCEPT_CHALLENGE_GROUPS } from "./concept-challenge.js";

/**
 * I gradi delle partenze avanzate (LIBRO 4.10, «Partenze avanzate»): pallini
 * in più sopra la creazione base, e l'Areté pieno. Il Neofita è la base.
 * Dal 25/9 (Blue: «non ha più pallini Sfere, ha pallini poteri») i pallini di
 * Sfera del grado sono poteri in più, da prendere nei Domini a cui si ha accesso.
 */
export const GRADI = Object.freeze([
  Object.freeze({ id: "neofita", arete: 1, poteri: 0, attributes: 0, skills: 0, merits: 0, flaws: 0 }),
  Object.freeze({ id: "risvegliato", arete: 2, poteri: 1, attributes: 0, skills: 2, merits: 0, flaws: 1 }),
  Object.freeze({ id: "discepolo", arete: 3, poteri: 2, attributes: 1, skills: 3, merits: 2, flaws: 2 }),
  Object.freeze({ id: "anziano", arete: 3, poteri: 3, attributes: 1, skills: 5, merits: 5, flaws: 3 }),
  Object.freeze({ id: "maestro", arete: 4, poteri: 4, attributes: 2, skills: 7, merits: 7, flaws: 4 })
]);

/**
 * La creazione base: 22 Attributi, 19 pallini di Abilità liberi col tetto a 3
 * (V6: 18 su tredici voci; qui una voce in più vale un pallino in più, verdetto
 * di Blue dell'11/9; le tre ripartizioni del 18/8 non esistono più). I Vantaggi
 * dal 24/9 (Blue): 5 punti di Pregi e 4 di Background, 2 Difetti obbligatori;
 * i Difetti in più, fino a 5 in tutto, rendono un punto ciascuno da mettere in
 * Pregi o in Background a scelta del giocatore (`flawsMax`, `flawsBase`).
 * Niente pallini di Sfera (Blue, 25/9): si ha accesso a tre Domini (25/9 sera:
 * quello della Famiglia, quello della via e uno a scelta fra i due del Credo;
 * una Craft senza vie ne ha due) e in ciascuno si prende un potere. Sopra la
 * base il potere della Sfida completa (PREMI_SFIDA) e i poteri in più del grado.
 */
export const BASE_CREAZIONE = Object.freeze({ attributes: 22, skills: 19, skillCap: TETTO_CREAZIONE, merits: 5, backgrounds: 4, flaws: 2, flawsMax: 5 });

/** I punti che i Difetti oltre i due obbligatori rendono: uno a uno, fino al tetto di cinque. */
export function flawsExtraPoints(flawsTaken = 0, gradoId = "neofita") {
  const grado = GRADI.find((g) => g.id === gradoId) ?? GRADI[0];
  const base = BASE_CREAZIONE.flaws + grado.flaws;
  const taken = Math.max(Math.trunc(Number(flawsTaken) || 0), 0);
  return Math.max(Math.min(taken, BASE_CREAZIONE.flawsMax + grado.flaws) - base, 0);
}

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
  const bonuses = { skills: 0, merits: 0, poteri: 0 };
  for (const premio of PREMI_SFIDA) if (done >= premio.groups) bonuses[premio.count] += premio.bonus;
  return bonuses;
}

/**
 * I traguardi della creazione per grado, gruppi della Sfida completati e
 * Difetti presi. `merits` è il conto dei Vantaggi insieme (Pregi più
 * Background): la base dei due, i due punti della Sfida e quelli resi dai
 * Difetti in più vanno dove vuole il giocatore, quindi si sommano lì;
 * `pregi` e `backgrounds` sono le due basi da sole.
 */
export function creationTargets(gradoId = "neofita", groupsDone = 0, flawsTaken = 0) {
  const grado = GRADI.find((g) => g.id === gradoId) ?? GRADI[0];
  const sfida = sfidaBonuses(groupsDone);
  const extra = flawsExtraPoints(flawsTaken, grado.id);
  return {
    grado: grado.id,
    arete: grado.arete,
    attributes: BASE_CREAZIONE.attributes + grado.attributes,
    skills: BASE_CREAZIONE.skills + sfida.skills + grado.skills,
    skillCap: BASE_CREAZIONE.skillCap,
    pregi: BASE_CREAZIONE.merits,
    backgrounds: BASE_CREAZIONE.backgrounds,
    merits: BASE_CREAZIONE.merits + BASE_CREAZIONE.backgrounds + sfida.merits + grado.merits + extra,
    flaws: BASE_CREAZIONE.flaws + grado.flaws,
    flawsMax: BASE_CREAZIONE.flawsMax + grado.flaws,
    flawsExtra: extra,
    // I poteri oltre l'uno per Dominio: quelli del grado e quello della Sfida.
    poteri: grado.poteri + sfida.poteri
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

/**
 * Lo stato di un conto del memo. I Difetti fra i due obbligatori e il tetto
 * non sono «sopra»: sono punti resi, quindi verdi. Le due basi dei Vantaggi
 * (`soft`) sono rosse sotto la base e senza colore sopra, perché i punti in
 * più vanno dove vuole il giocatore e li giudica il conto insieme.
 */
export function statoConto(count) {
  if (count.target === null || count.target === undefined) return "";
  if (count.id === "flaws" && count.value > count.target && count.value <= (count.max ?? count.target)) return "exact";
  const state = compareCount(count.value, count.target);
  if (count.soft && state === "over") return "";
  return state;
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

/**
 * I Domini della creazione (Blue, 25/9 sera): la Sfera della Famiglia, quella
 * della via e una a scelta fra le due del Credo. Torna le tre caselle (vuote
 * finché l'appartenenza non c'è), la scelta del Credo e il traguardo: tre, o
 * due per una Famiglia senza vie (le Craft).
 */
export function dominiDellaCreazione(actor) {
  const lineage = getLineage(actor);
  const focus = actor?.getFlag?.(MODULE_ID, "focus") ?? {};
  const family = findFamiglia(lineage.famiglia);
  const sub = findSottofamiglia(lineage.famiglia, lineage.sottofamiglia);
  const credo = String(focus.credo ?? "");
  const candidate = credoSpheresFor(credo, focus.credoSpheres);
  const scelta = credoFamilySphere(credo, focus.credoSpheres, focus.credoFamily);
  const conVia = !family || family.sottofamiglie.length > 0;
  return {
    famiglia: family?.sphere ?? "",
    via: sub?.sphere ?? "",
    credo: candidate,
    scelta,
    target: conVia ? 3 : 2
  };
}

export function prepareCreationSummary(actor, areteValue = null) {
  const system = actor.system ?? {};
  const items = actor.items ? Array.from(actor.items) : [];
  const selection = getSphereSelection(actor);
  const domini = SPHERES.filter((id) => selection[id]).length;
  const dominiCreazione = dominiDellaCreazione(actor);
  const poteriConosciuti = poteriDelPersonaggio(actor).length;
  const creazione = actor.getFlag(MODULE_ID, "creazione") ?? {};
  const groupsDone = conceptGroupsDone(actor);
  const flaws = featureDots(items, "flaw");
  const targets = creationTargets(creazione.grado, groupsDone, flaws);

  const backgrounds = featureDots(items, "background");
  const merits = featureDots(items, "merit");
  const raw = [
    { id: "attributes", label: "WOD5E_MAGE.Riepilogo.Attributes", value: sumDots(system.attributes, ATTRIBUTE_KEYS), target: targets.attributes },
    { id: "skills", label: "WOD5E_MAGE.Riepilogo.Skills", value: sumDots(system.skills, [...CHIAVI_VIVE]), target: targets.skills },
    // Le due basi (24/9: 4 di Background, 5 di Pregi) si guardano da sole, ma il conto che
    // deve tornare è quello dei Vantaggi insieme, perché i punti della Sfida e quelli
    // resi dai Difetti in più vanno dove vuole il giocatore.
    { id: "backgrounds", label: "WOD5E_MAGE.Riepilogo.Backgrounds", hint: "WOD5E_MAGE.Riepilogo.BackgroundsHint", value: backgrounds, target: targets.backgrounds, soft: true },
    { id: "pregi", label: "WOD5E_MAGE.Riepilogo.Pregi", hint: "WOD5E_MAGE.Riepilogo.PregiHint", value: merits, target: targets.pregi, soft: true },
    { id: "merits", label: "WOD5E_MAGE.Riepilogo.Merits", hint: "WOD5E_MAGE.Riepilogo.MeritsHint", value: backgrounds + merits, target: targets.merits, extra: targets.flawsExtra },
    // I Difetti: due obbligatori, fino a cinque; oltre i due ogni punto ne rende uno ai Vantaggi.
    { id: "flaws", label: "WOD5E_MAGE.Riepilogo.Flaws", hint: "WOD5E_MAGE.Riepilogo.FlawsHint", value: flaws, target: targets.flaws, max: targets.flawsMax },
    // I Domini a cui si ha accesso (le Sfere conosciute): tre alla creazione (25/9 sera), e i
    // poteri: uno per Dominio, più quelli del grado e della Sfida (25/9).
    { id: "domini", label: "WOD5E_MAGE.Riepilogo.Domini", hint: "WOD5E_MAGE.Riepilogo.DominiHint", value: domini, target: dominiCreazione.target },
    { id: "poteri", label: "WOD5E_MAGE.Riepilogo.Poteri", hint: "WOD5E_MAGE.Riepilogo.PoteriHint", value: poteriConosciuti, target: domini + targets.poteri }
  ];
  const sfidaBonus = sfidaBonuses(groupsDone);
  const counts = raw.map((count) => ({
    ...count,
    state: statoConto(count),
    // Quanto del traguardo viene dalla Sfida (23/9): si scrive accanto al conto.
    sfida: sfidaBonus[count.id] ?? 0
  }));
  const grades = GRADI.map((g) => ({ id: g.id, label: `WOD5E_MAGE.Riepilogo.Grades.${g.id}`, selected: g.id === targets.grado }));

  const overCap = skillsOverCap(system.skills, targets.skillCap);
  const checks = [
    // Nessuna Abilità oltre il tetto della creazione (V6: tre pallini).
    { id: "skillCap", label: "WOD5E_MAGE.Riepilogo.SkillCap", ok: overCap.length === 0, target: targets.skillCap },
    // Non più di cinque punti di Difetti (24/9).
    { id: "flawsCap", label: "WOD5E_MAGE.Riepilogo.FlawsCap", ok: flaws <= targets.flawsMax, target: targets.flawsMax },
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
