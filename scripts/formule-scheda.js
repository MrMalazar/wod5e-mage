/**
 * La pagina Formule (Blue, 26/9): due colonne a tutta pagina. A sinistra le
 * Formule, quelle accessibili dalle Sfere possedute o tutte (il tasto in
 * testa al riquadro), con la cerca; ogni riga è la matrice del Grimorio con
 * la scelta della Sfera d'Accesso, delle Amalgame e della soglia, e due
 * tasti: «Scrivi fra gli effetti» la salva nella colonna di destra, «Lancia
 * dal Tiro» la carica nel Tiro della prima pagina coi suoi valori. A destra
 * gli effetti di Magick scritti dal giocatore (incantesimi.js), a tendina:
 * chiusi resta l'Obiettivo, e il dado li carica nel Tiro allo stesso modo.
 *
 * Le scelte sulla riga sono tasti, non radio: la pagina sta nel form della
 * scheda, e un campo col nome finirebbe scritto sul personaggio.
 */
import { MODULE_ID } from "./constants.js";
import { findFormula, formulaPick, prepareGrimorioFormule } from "./grimorio.js";
import { INCANTESIMI_FLAG, spellFromFormula } from "./incantesimi.js";
import { prepareSpheres } from "./spheres.js";
import { caricaNelTiro } from "./tiro-scheda.js";

/** I Domini a cui il personaggio ha accesso: le Sfere conosciute col loro livello (anche 0). */
export function sfereAccessibili(actor) {
  return Object.fromEntries(prepareSpheres(actor).selected.map((sphere) => [sphere.id, sphere.value]));
}

/**
 * Il contesto della colonna delle Formule: le righe (le accessibili, o tutte
 * con `tutte`), quante si aprono e quante sono in tutto.
 */
export function prepareFormulePagina(sphereLevels = {}, { tutte = false, localize = (key) => key } = {}) {
  const righe = prepareGrimorioFormule(sphereLevels, localize);
  const aperte = righe.filter((formula) => formula.open);
  return { righe: tutte ? righe : aperte, aperte: aperte.length, totale: righe.length, tutte: Boolean(tutte) };
}

/** Le scelte fatte sulla riga: la Sfera d'Accesso (una), le Amalgame (anche più d'una), la soglia (l'indice). */
export function sceltaDellaRiga(row) {
  const scelti = (role) => [...(row?.querySelectorAll?.(`[data-role=${role}].scelta`) ?? [])];
  return {
    access: scelti("formulaAccess")[0]?.dataset?.sphere ?? "",
    amalgams: scelti("formulaAmalgam").map((button) => button.dataset.sphere),
    threshold: Number(scelti("formulaThreshold")[0]?.dataset?.index ?? 0) || 0
  };
}

/**
 * Un tasto di scelta si accende. Con `single` (l'Accesso, la soglia) i fratelli
 * dello stesso ruolo si spengono e una scelta resta sempre; le Amalgame vanno
 * e vengono una per una.
 */
export function accendiScelta(button, { single = true } = {}) {
  const row = button.closest("[data-formula]");
  const role = button.dataset.role;
  if (single) {
    for (const other of row?.querySelectorAll(`[data-role="${role}"]`) ?? []) {
      other.classList.remove("scelta");
      other.setAttribute("aria-pressed", "false");
    }
    button.classList.add("scelta");
    button.setAttribute("aria-pressed", "true");
    return true;
  }
  const on = !button.classList.contains("scelta");
  button.classList.toggle("scelta", on);
  button.setAttribute("aria-pressed", String(on));
  return on;
}

/**
 * Dopo il render: le righe ricordano se erano aperte, i tasti di scelta si
 * accendono al clic, e i due tasti in fondo restano spenti finché la Sfera
 * d'Accesso non è scelta (con una sola, è già scelta).
 */
export function wireFormule(sheet) {
  const root = sheet.element;
  if (!root) return;
  sheet._formuleAperte ??= {};
  for (const row of root.querySelectorAll(".wod5e-mage-formula[data-formula]")) {
    const id = row.dataset.formula;
    if (id in sheet._formuleAperte) row.open = sheet._formuleAperte[id];
    row.addEventListener("toggle", () => { sheet._formuleAperte[id] = row.open; });
    const paint = () => {
      const ready = Boolean(row.querySelector("[data-role=formulaAccess].scelta"));
      for (const button of row.querySelectorAll("[data-action=formulaScrivi], [data-action=formulaLancia]")) {
        if (button.dataset.fermo) continue;
        button.disabled = !ready;
      }
    };
    for (const button of row.querySelectorAll("[data-role=formulaAccess], [data-role=formulaAmalgam], [data-role=formulaThreshold]")) {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        accendiScelta(button, { single: button.dataset.role !== "formulaAmalgam" });
        paint();
      });
    }
    paint();
  }
}

/** La scelta della riga letta come scelta della matrice; null (con l'avviso) se manca la Sfera d'Accesso. */
function pickDallaRiga(sheet, target) {
  const row = target?.closest?.("[data-formula]");
  const formula = findFormula(String(row?.dataset?.formula ?? ""));
  if (!row || !formula) return null;
  const pick = formulaPick(formula, { ...sceltaDellaRiga(row), sphereLevels: sfereAccessibili(sheet.actor) });
  if (!pick) ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.Formule.ScegliAccesso"));
  return pick;
}

/** Il tasto in testa: tutte le Formule, o solo quelle che le Sfere aprono. */
export async function onFormuleTutte(event) {
  event.preventDefault();
  this._formuleTutte = !this._formuleTutte;
  await this.render({ parts: ["grimorio"] });
}

/** «Scrivi fra gli effetti»: la Formula com'è scelta diventa un effetto di Magick del giocatore. */
export async function onFormulaScrivi(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!actor.isOwner) {
    ui.notifications.warn(game.i18n.format("WOD5E.Notifications.NoSufficientPermission", { string: actor.name }));
    return;
  }
  const pick = pickDallaRiga(this, target);
  if (!pick) return;
  const spell = spellFromFormula(actor, pick, game.i18n.localize.bind(game.i18n));
  const stored = actor.getFlag(MODULE_ID, INCANTESIMI_FLAG) ?? {};
  let id = foundry.utils.randomID();
  while (stored[id]) id = foundry.utils.randomID();
  await actor.update({ [`flags.${MODULE_ID}.${INCANTESIMI_FLAG}.${id}`]: { ...spell, sort: Object.keys(stored).length } });
  ui.notifications.info(game.i18n.format("WOD5E_MAGE.Incantesimi.Saved", { name: spell.name }));
}

/** «Lancia dal Tiro»: la Formula com'è scelta entra nel Tiro della prima pagina, senza scriverla. */
export async function onFormulaLancia(event, target) {
  event.preventDefault();
  const pick = pickDallaRiga(this, target);
  if (!pick) return;
  const spell = spellFromFormula(this.actor, pick, game.i18n.localize.bind(game.i18n));
  await caricaNelTiro(this, `formula:${pick.formula.id}`, spell);
}
