import { MAGE_SHEET_ID, MODULE_ID, NEMICO_SHEET_ID } from "./constants.js";
import { NEMICO_FLAG, vociCreazione } from "./nemico.js";

/**
 * Foundry's standard Actor creation dialog, with two additions of the module.
 *
 * 1. A Mortal/Mage sheet choice for the `mortal` type.
 * 2. The M6 NPC, one entry per Nature (Blue, 1/10): «quando creo l'attore
 *    direttamente nella barra destra di Foundry». Each entry creates an `spc`
 *    actor that is born with the enemy sheet and its Nature, so the Narratore
 *    never has to go through the sheet configuration.
 *
 * The native system's Actor types and data models remain untouched. The chosen
 * sheet is persisted through Foundry's standard flags.core.sheetClass field.
 *
 * UN SOLO CAMPO PER NOME (1.33.1). Foundry legge la finestra con
 * FormDataExtended, e quando due campi hanno lo stesso nome ne fa una lista
 * coi valori di tutti e due, anche se uno è spento. Nella 1.33.0 la scelta
 * Mortale/Mago e il PNG di M6 portavano ognuno il suo `flags.core.sheetClass`:
 * la scheda arrivava come lista, Foundry non la riconosceva e apriva quella di
 * serie, per il PNG di M6 come per il Mago. Per questo quel che si vede (la
 * tendina Mortale/Mago, le voci del PNG di M6) qui non ha nome: i dati partono
 * da due campi nascosti, uno per nome, riempiti da `datiDiCreazione`.
 */

/** I campi che la finestra può aggiungere ai dati di Actor.create, col nome che hanno per Foundry. */
export const CAMPI_CREAZIONE = Object.freeze({
  scheda: "flags.core.sheetClass",
  natura: `flags.${MODULE_ID}.${NEMICO_FLAG}.natura`
});

/**
 * Cosa parte verso Actor.create, oltre a nome, tipo e cartella, per la scelta
 * fatta nella finestra. Un PNG di M6 porta la scheda del nemico e la sua
 * Natura (nella bandiera del modulo: lo spcType del sistema resta quello di
 * ogni PNG); un mortale porta la scheda del Mago solo se è stata scelta; ogni
 * altro tipo non porta niente.
 */
export function datiDiCreazione({ tipo = "", schedaMortale = "", natura = "" } = {}) {
  if (natura) return { [CAMPI_CREAZIONE.scheda]: NEMICO_SHEET_ID, [CAMPI_CREAZIONE.natura]: String(natura) };
  if (tipo === "mortal" && schedaMortale) return { [CAMPI_CREAZIONE.scheda]: String(schedaMortale) };
  return {};
}

export function registerActorCreationChoice() {
  Hooks.on("renderDialogV2", (_dialog, element) => {
    if (element.querySelector(`[data-module="${MODULE_ID}"]`)) return;

    const typeSelect = element.querySelector('select[name="type"]');
    const typeGroup = typeSelect?.closest(".form-group");
    if (!typeSelect || !typeGroup) return;

    const scelta = aggiungiSceltaScheda(typeSelect, typeGroup);
    const png = aggiungiPngDiM6(typeSelect, typeGroup);
    if (!scelta && !png) return;

    const campi = campiNascosti(typeGroup);

    const aggiorna = () => {
      const voce = typeSelect.selectedOptions?.[0];
      const natura = voce?.dataset?.m6Natura ?? "";
      const mortale = !natura && typeSelect.value === "mortal";

      if (scelta) {
        scelta.group.hidden = !mortale;
        scelta.select.disabled = !mortale;
        if (!mortale) scelta.select.value = "";
      }
      if (png) png.hint.hidden = !natura;

      const dati = datiDiCreazione({ tipo: typeSelect.value, schedaMortale: scelta?.select.value ?? "", natura });
      for (const [chiave, nome] of Object.entries(CAMPI_CREAZIONE)) {
        campi[chiave].disabled = !(nome in dati);
        campi[chiave].value = dati[nome] ?? "";
      }
    };

    typeSelect.addEventListener("change", aggiorna);
    scelta?.select.addEventListener("change", aggiorna);
    aggiorna();
  });
}

/** I campi nascosti, uno per nome: spenti finché la scelta non li riempie. */
function campiNascosti(typeGroup) {
  const campi = {};
  for (const [chiave, nome] of Object.entries(CAMPI_CREAZIONE)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = nome;
    input.value = "";
    input.disabled = true;
    input.dataset.module = MODULE_ID;
    typeGroup.append(input);
    campi[chiave] = input;
  }
  return campi;
}

/**
 * The Mortal/Mage sheet choice, shown only while the type is `mortal`. La
 * tendina non ha nome: è solo quel che si vede, il dato lo porta il campo
 * nascosto della scheda.
 */
function aggiungiSceltaScheda(typeSelect, typeGroup) {
  if (!typeSelect.querySelector('option[value="mortal"]')) return null;

  const sheetGroup = document.createElement("div");
  sheetGroup.classList.add("form-group");
  sheetGroup.dataset.module = MODULE_ID;

  const label = document.createElement("label");
  label.textContent = game.i18n.localize("WOD5E_MAGE.Creation.SheetType.Name");

  const fields = document.createElement("div");
  fields.classList.add("form-fields");

  const sheetSelect = document.createElement("select");
  sheetSelect.setAttribute("aria-label", game.i18n.localize("WOD5E_MAGE.Creation.SheetType.Name"));

  const mortal = document.createElement("option");
  mortal.value = "";
  mortal.textContent = game.i18n.localize("WOD5E_MAGE.Creation.SheetType.Mortal");

  const mage = document.createElement("option");
  mage.value = MAGE_SHEET_ID;
  mage.textContent = game.i18n.localize("WOD5E_MAGE.Creation.SheetType.Mage");

  sheetSelect.append(mortal, mage);
  fields.append(sheetSelect);

  const hint = document.createElement("p");
  hint.classList.add("hint");
  hint.textContent = game.i18n.localize("WOD5E_MAGE.Creation.SheetType.Hint");

  sheetGroup.append(label, fields, hint);
  typeGroup.insertAdjacentElement("afterend", sheetGroup);

  return { group: sheetGroup, select: sheetSelect };
}

/**
 * Il PNG di M6 nella lista dei tipi: un gruppo in fondo, una voce per Natura.
 * Ogni voce vale `spc` per Foundry; la Natura sta sulla voce (`data-m6-natura`)
 * e da lì passa al suo campo nascosto. Sotto il tipo, una riga dice con che
 * scheda nasce.
 */
function aggiungiPngDiM6(typeSelect, typeGroup) {
  if (!typeSelect.querySelector('option[value="spc"]')) return null;

  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);

  const gruppo = document.createElement("optgroup");
  gruppo.label = localize("WOD5E_MAGE.Creation.Nemico.Gruppo");
  gruppo.dataset.module = MODULE_ID;
  for (const voce of vociCreazione({ localize, format })) {
    const option = document.createElement("option");
    option.value = "spc";
    option.textContent = voce.label;
    option.dataset.m6Natura = voce.natura;
    gruppo.append(option);
  }
  typeSelect.append(gruppo);

  // Al cambio del tipo Foundry riscrive la PRIMA nota del gruppo (la sua, quella
  // del tipo scelto): se non c'è ancora gliela si lascia pronta, vuota, così la
  // nota del PNG di M6 resta la seconda e nessuno gliela cancella.
  if (!typeGroup.querySelector(".hint")) {
    const delTipo = document.createElement("p");
    delTipo.classList.add("hint");
    typeGroup.append(delTipo);
  }

  const hint = document.createElement("p");
  hint.classList.add("hint");
  hint.dataset.module = MODULE_ID;
  hint.textContent = localize("WOD5E_MAGE.Creation.Nemico.Hint");
  hint.hidden = true;
  typeGroup.append(hint);

  return { hint };
}
