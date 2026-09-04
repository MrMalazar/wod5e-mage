import { MODULE_ID } from "./constants.js";
import { CHIAVI_VIVE } from "./abilita-essenziali.js";
import { ATTRIBUTE_KEYS } from "./tratti-icone.js";
import { PERSONAGGIO_TABLES } from "./personaggio-extra.js";
import { getSphereSelection, SPHERES } from "./spheres.js";
import { FOCUS_TOOL_IDS } from "./focus.js";

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

export function prepareCreationSummary(actor) {
  const system = actor.system ?? {};
  const items = actor.items ? Array.from(actor.items) : [];
  const sphereValues = actor.getFlag(MODULE_ID, "spheres") ?? {};

  const counts = [
    { id: "attributes", label: "WOD5E_MAGE.Riepilogo.Attributes", value: sumDots(system.attributes, ATTRIBUTE_KEYS) },
    { id: "skills", label: "WOD5E_MAGE.Riepilogo.Skills", value: sumDots(system.skills, [...CHIAVI_VIVE]) },
    { id: "backgrounds", label: "WOD5E_MAGE.Riepilogo.Backgrounds", value: featureDots(items, "background") },
    { id: "merits", label: "WOD5E_MAGE.Riepilogo.Merits", value: featureDots(items, "merit") },
    { id: "flaws", label: "WOD5E_MAGE.Riepilogo.Flaws", value: featureDots(items, "flaw") },
    {
      id: "spheres",
      label: "WOD5E_MAGE.Riepilogo.Spheres",
      value: SPHERES.reduce(
        (sum, id) => sum + Math.min(Math.max(Math.trunc(Number(sphereValues[id]) || 0), 0), 5),
        0
      )
    }
  ];

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

  return { counts, checks };
}
