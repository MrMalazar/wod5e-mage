import { MODULE_ID } from "./constants.js";
import { CREDO_STRUMENTI, FAMIGLIA_STRUMENTI, SOTTOFAMIGLIA_STRUMENTI } from "./data/strumenti.js";
import { findFamiglia, findSottofamiglia } from "./famiglie.js";
import { FOCUS_TOOLS } from "./focus.js";
import { SPHERES } from "./spheres.js";
import { getLineage } from "./lineage.js";

/**
 * I consigli sugli Strumenti (verdetto di Blue, 4/9 notte): per ogni Sfera,
 * gli Strumenti d'esempio del Credo (Sfera per Sfera, chiave Magick e
 * Tecnomagick, dagli studi) e quelli della Famiglia e della Sottofamiglia
 * (capitolo 03). Sono consigli: lo Strumento resta libero.
 */

/** Le chiavi del Credo che il Tipo di Magick lascia vedere. */
export function keysForForm(form) {
  if (form === "magick") return ["magick"];
  if (form === "tecnomagick") return ["tecnomagick"];
  return ["magick", "tecnomagick"];
}

/**
 * I consigli per una Sfera, dato Credo, Famiglia, Sottofamiglia e Tipo.
 * Funzione pura: `localize` traduce le chiavi.
 */
export function suggestInstruments({ credo = "", famiglia = "", sottofamiglia = "", form = "", sphereId = "" } = {}, localize = (key) => key) {
  const out = { credo: null, famiglia: null, sottofamiglia: null, empty: true };

  const credoData = CREDO_STRUMENTI[credo];
  if (credoData) {
    const bySphere = credoData.spheres?.[sphereId] ?? {};
    const entries = keysForForm(form)
      .map((key) => ({ key, cell: bySphere[key] }))
      .filter(({ cell }) => cell && cell.tool)
      .map(({ key, cell }) => {
        const definition = FOCUS_TOOLS.find((tool) => tool.id === cell.tool);
        const profession = definition?.profession ? credoData.profession ?? "" : "";
        const toolLabel = localize(`WOD5E_MAGE.Focus.Tools.${cell.tool}`);
        return {
          key,
          keyLabel: localize(`WOD5E_MAGE.Focus.Forms.${key}`),
          tool: cell.tool,
          toolLabel: profession ? toolLabel.replace(/ da .*$/, ` da ${profession}`) : toolLabel,
          profession,
          examples: cell.examples,
          name: cell.examples.split(",")[0].trim()
        };
      });
    out.credo = { label: localize(`WOD5E_MAGE.Focus.Credos.${credo}`), entries };
  }

  const family = findFamiglia(famiglia);
  const familyData = FAMIGLIA_STRUMENTI[famiglia];
  if (family && familyData) {
    out.famiglia = {
      label: family.label,
      list: familyData.list ?? [],
      tools: categoryEntries(familyData.tools, localize)
    };
  }

  const sub = findSottofamiglia(famiglia, sottofamiglia);
  const subData = SOTTOFAMIGLIA_STRUMENTI[sottofamiglia];
  if (sub && subData) {
    out.sottofamiglia = { label: sub.label, list: [], tools: categoryEntries(subData.tools, localize) };
  }

  out.empty = !(out.credo?.entries.length || out.famiglia?.list.length || out.famiglia?.tools.length || out.sottofamiglia?.tools.length);
  return out;
}

function categoryEntries(tools, localize) {
  return Object.entries(tools ?? {}).map(([family, text]) => ({
    family,
    familyLabel: localize(`WOD5E_MAGE.Focus.Families.${family}`),
    name: text
  }));
}

/** Il clic sulla lampadina di una riga: i consigli per quella Sfera. */
export async function onStrumentiSuggest(event, target) {
  event.preventDefault();
  const actor = this.actor;
  const sphereId = target.dataset.sphere;
  if (!SPHERES.includes(sphereId)) return;
  const focus = actor.getFlag(MODULE_ID, "focus") ?? {};
  const lineage = getLineage(actor);
  const localize = game.i18n.localize.bind(game.i18n);
  const suggestions = suggestInstruments({
    credo: String(focus.credo ?? ""),
    famiglia: lineage.famiglia,
    sottofamiglia: lineage.sottofamiglia,
    form: String(focus.practiceForm ?? ""),
    sphereId
  }, localize);
  const canEdit = actor.isOwner && !actor.system.locked;
  const content = await foundry.applications.handlebars.renderTemplate(
    `modules/${MODULE_ID}/templates/dialogs/strumenti-consigli.hbs`,
    { sphere: localize(`WOD5E_MAGE.Spheres.${sphereId}`), suggestions, canEdit }
  );
  return foundry.applications.api.DialogV2.wait({
    window: { title: game.i18n.format("WOD5E_MAGE.Focus.SuggestTitle", { sphere: localize(`WOD5E_MAGE.Spheres.${sphereId}`) }) },
    position: { width: 520, height: "auto" },
    content,
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-archivio-dialog"],
    buttons: [{ action: "close", icon: "fas fa-times", label: localize("WOD5E.Close"), default: true }],
    render: (_event, dialog) => wireSuggestions(dialog, actor, sphereId)
  });
}

function wireSuggestions(dialog, actor, sphereId) {
  const root = dialog?.element;
  if (!root) return;
  for (const button of root.querySelectorAll("[data-role=suggestApply]")) {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const { tool = "", profession = "", name = "" } = button.dataset;
      const update = { name };
      if (tool) update.tool = tool;
      if (tool && profession) update.profession = profession;
      await actor.update({ [`flags.${MODULE_ID}.focus.sphereInstruments.${sphereId}`]: update });
      dialog.close();
    });
  }
}
