import { MODULE_ID } from "./constants.js";
import { findFamiglia, findSottofamiglia } from "./famiglie.js";

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

  // Le tendine salvano gli id: il nome si legge dalla tavola delle Famiglie;
  // un testo vecchio scritto a mano resta com'è.
  const famigliaLabel = findFamiglia(famiglia)?.label ?? famiglia;
  const sottofamigliaLabel = findSottofamiglia(famiglia, sottofamiglia)?.label ?? sottofamiglia;

  // Sotto il nome sta la coppia; la fazione completa vive nel titolo.
  const riga = [famigliaLabel, sottofamigliaLabel].filter(Boolean).join(" · ");
  const completa = [fazione, famigliaLabel, sottofamigliaLabel].filter(Boolean).join(" · ");

  return { fazione, famiglia, sottofamiglia, famigliaLabel, sottofamigliaLabel, riga, completa };
}
