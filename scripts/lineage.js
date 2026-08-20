import { MODULE_ID } from "./constants.js";

/**
 * L'appartenenza del Mago: Fazione, e la coppia Famiglia · Sottofamiglia
 * (che vanno insieme). Vivono come flag del modulo, si scrivono nella
 * pagina Personaggio e compaiono sotto il nome in testata.
 */
export function getLineage(actor) {
  const stored = actor.getFlag(MODULE_ID, "lineage") ?? {};

  const fazione = String(stored.fazione ?? "").trim();
  const famiglia = String(stored.famiglia ?? "").trim();
  const sottofamiglia = String(stored.sottofamiglia ?? "").trim();

  // Sotto il nome sta la coppia; la fazione completa vive nel titolo.
  const riga = [famiglia, sottofamiglia].filter(Boolean).join(" · ");
  const completa = [fazione, famiglia, sottofamiglia].filter(Boolean).join(" · ");

  return { fazione, famiglia, sottofamiglia, riga, completa };
}
