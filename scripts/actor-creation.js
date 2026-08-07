import { MAGE_SHEET_ID, MODULE_ID } from "./constants.js";

/**
 * Add a Mortal/Mage sheet choice to Foundry's standard Actor creation dialog.
 *
 * The native system's Actor types and data models remain untouched. The chosen
 * sheet is persisted through Foundry's standard flags.core.sheetClass field.
 */
export function registerActorCreationChoice() {
  Hooks.on("renderDialogV2", (_dialog, element) => {
    if (element.querySelector(`[data-module="${MODULE_ID}"]`)) return;

    const typeSelect = element.querySelector('select[name="type"]');
    const mortalOption = typeSelect?.querySelector('option[value="mortal"]');
    if (!typeSelect || !mortalOption) return;

    const typeGroup = typeSelect.closest(".form-group");
    if (!typeGroup) return;

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
  });
}
