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
 */
export function registerActorCreationChoice() {
  Hooks.on("renderDialogV2", (_dialog, element) => {
    if (element.querySelector(`[data-module="${MODULE_ID}"]`)) return;

    const typeSelect = element.querySelector('select[name="type"]');
    const typeGroup = typeSelect?.closest(".form-group");
    if (!typeSelect || !typeGroup) return;

    aggiungiSceltaScheda(typeSelect, typeGroup);
    aggiungiPngDiM6(typeSelect, typeGroup);
  });
}

/** The Mortal/Mage sheet choice, shown only while the type is `mortal`. */
function aggiungiSceltaScheda(typeSelect, typeGroup) {
  if (!typeSelect.querySelector('option[value="mortal"]')) return;

  const sheetGroup = document.createElement("div");
  sheetGroup.classList.add("form-group");
  sheetGroup.dataset.module = MODULE_ID;

  const label = document.createElement("label");
  label.textContent = game.i18n.localize("WOD5E_MAGE.Creation.SheetType.Name");

  const fields = document.createElement("div");
  fields.classList.add("form-fields");

  const sheetSelect = document.createElement("select");
  sheetSelect.name = "flags.core.sheetClass";

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

  const updateVisibility = () => {
    const isMortal = typeSelect.value === "mortal";
    sheetGroup.hidden = !isMortal;
    sheetSelect.disabled = !isMortal;
    if (!isMortal) sheetSelect.value = "";
  };

  typeSelect.addEventListener("change", updateVisibility);
  updateVisibility();
}

/**
 * Il PNG di M6 nella lista dei tipi: un gruppo in fondo, una voce per Natura.
 * Ogni voce vale `spc` per Foundry; la differenza la fanno tre campi nascosti,
 * accesi solo quando la voce scelta è una di queste: la scheda del nemico, la
 * Natura nella bandiera del modulo e, se la Natura ne ha uno, lo spcType del
 * sistema. Con un altro tipo scelto i campi sono spenti e non entrano nei dati.
 */
function aggiungiPngDiM6(typeSelect, typeGroup) {
  if (!typeSelect.querySelector('option[value="spc"]')) return;

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
    option.dataset.m6SpcType = voce.spcType;
    gruppo.append(option);
  }
  typeSelect.append(gruppo);

  const campo = (name, value = "") => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    input.disabled = true;
    input.dataset.module = MODULE_ID;
    typeGroup.append(input);
    return input;
  };
  const scheda = campo("flags.core.sheetClass", NEMICO_SHEET_ID);
  const natura = campo(`flags.${MODULE_ID}.${NEMICO_FLAG}.natura`);
  const spcType = campo("system.spcType");

  const hint = document.createElement("p");
  hint.classList.add("hint");
  hint.dataset.module = MODULE_ID;
  hint.textContent = localize("WOD5E_MAGE.Creation.Nemico.Hint");
  hint.hidden = true;
  typeGroup.append(hint);

  const aggiorna = () => {
    const scelta = typeSelect.selectedOptions?.[0];
    const m6 = Boolean(scelta?.dataset?.m6Natura);
    scheda.disabled = !m6;
    natura.disabled = !m6;
    natura.value = m6 ? scelta.dataset.m6Natura : "";
    spcType.disabled = !m6 || !scelta.dataset.m6SpcType;
    spcType.value = m6 ? scelta.dataset.m6SpcType : "";
    hint.hidden = !m6;
  };

  typeSelect.addEventListener("change", aggiorna);
  aggiorna();
}
