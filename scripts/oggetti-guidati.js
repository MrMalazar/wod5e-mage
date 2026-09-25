import { _onCreateItem } from "/systems/wod5e/system/actor/scripts/item-actions.js";
import { MODULE_ID } from "./constants.js";

/**
 * L'inserimento guidato: quando il giocatore preme il + di armi, armature,
 * oggetti, Pregi, Difetti e Background, una finestra gli chiede i campi che
 * servono (nome, valore, descrizione) e crea l'oggetto già compilato. Per
 * gli altri tipi passa la mano al sistema.
 */
export const GUIDED_TYPES = Object.freeze(["weapon", "armor", "gear", "feature"]);
export const WEAPON_TYPES = Object.freeze(["melee", "ranged", "supernatural"]);
export const FEATURE_TYPES = Object.freeze(["merit", "flaw", "background"]);
/** L'armatura fisica si ripara, la mentale si ricostruisce (Blue, 25/9). */
export const ARMOR_KINDS = Object.freeze(["fisica", "mentale"]);

/** Il pezzo di `system` che l'oggetto nuovo riceve, dal modulo compilato. */
export function buildGuidedItemData(type, subtype, form = {}) {
  const number = (value, min = 0, max = 99) => Math.min(Math.max(Math.trunc(Number(value) || 0), min), max);
  const description = String(form.description ?? "").trim();
  const data = { description: description ? `<p>${foundry?.utils?.escapeHTML?.(description) ?? description}</p>` : "" };

  if (type === "weapon") {
    data.weaponType = WEAPON_TYPES.includes(form.weaponType) ? form.weaponType : (WEAPON_TYPES.includes(subtype) ? subtype : "melee");
    data.weaponvalue = number(form.value, 0, 20);
  } else if (type === "armor") {
    // L'armatura arriva fino a 7 punti (Blue, 25/9).
    data.armorvalue = number(form.value, 0, 7);
  } else if (type === "gear") {
    data.quantity = number(form.quantity, 1, 999);
  } else if (type === "feature") {
    data.featuretype = FEATURE_TYPES.includes(subtype) ? subtype : "background";
    data.points = number(form.points, 0, 5);
  }
  return data;
}

/**
 * I flag del modulo sull'oggetto nuovo (25/9): per l'arma la spunta
 * dell'Aggravato, per l'armatura se è fisica o mentale e il suo pieno (il
 * tasto ▲ della riga rimette i punti fino a lì).
 */
export function buildGuidedItemFlags(type, form = {}) {
  if (type === "weapon") {
    const spunta = form.aggravato;
    return { aggravato: spunta === true || spunta === "true" || spunta === "on" };
  }
  if (type === "armor") {
    const value = Math.min(Math.max(Math.trunc(Number(form.value) || 0), 0), 7);
    return { armatura: ARMOR_KINDS.includes(form.armatura) ? form.armatura : ARMOR_KINDS[0], armaturaPiena: value };
  }
  return {};
}

/**
 * La matita di Background, Pregi, Difetti e Dotazione apre la scheda
 * dell'oggetto. Il sistema wod5e la chiamava `itemEdit` fino alla 5.3.19 e
 * `itemOpen` dalla 5.3.26 (il server di Sans, 10/9): il modulo si porta la
 * sua, così la matita funziona con tutte e due.
 */
export function guidedItemId(target) {
  const holder = target?.closest?.("[data-item-id]") ?? target;
  return String(holder?.getAttribute?.("data-item-id") ?? holder?.dataset?.itemId ?? "");
}

export async function onGuidedItemEdit(event, target) {
  event?.preventDefault?.();
  const item = this.actor?.items?.get(guidedItemId(target));
  if (!item) return;
  await item.sheet?.render(true);
}

export async function onGuidedItemCreate(event, target) {
  const type = String(target.getAttribute("data-type") ?? "");
  const subtype = String(target.getAttribute("data-subtype") ?? "");
  if (!GUIDED_TYPES.includes(type)) return _onCreateItem.call(this, event, target);

  event.preventDefault();
  const actor = this.actor;
  const localize = game.i18n.localize.bind(game.i18n);
  const kindKey = type === "feature" ? (FEATURE_TYPES.includes(subtype) ? subtype : "background") : type;
  const content = await foundry.applications.handlebars.renderTemplate(
    "modules/wod5e-mage/templates/dialogs/item-create.hbs",
    {
      type,
      kindKey,
      isWeapon: type === "weapon",
      isArmor: type === "armor",
      isGear: type === "gear",
      isFeature: type === "feature",
      weaponTypes: WEAPON_TYPES.map((id) => ({ id, label: localize(`WOD5E_MAGE.Items.WeaponTypes.${id}`), selected: id === subtype })),
      armorKinds: ARMOR_KINDS.map((id) => ({ id, label: localize(`WOD5E_MAGE.Items.ArmorKinds.${id}`) })),
      points: [0, 1, 2, 3, 4, 5]
    }
  );

  const result = await foundry.applications.api.DialogV2.input({
    window: { title: localize(`WOD5E_MAGE.Items.Titles.${kindKey}`) },
    content,
    ok: { icon: "fas fa-check", label: localize("WOD5E.Add") },
    buttons: [{ action: "cancel", icon: "fas fa-times", label: localize("WOD5E.Cancel") }],
    classes: ["wod5e", "wod5e-mage", "mage", actor.system.gamesystem, "wod5e-mage-roll-dialog"],
    position: { width: 480, height: "auto" }
  });
  if (!result || result === "cancel") return;

  const name = String(result.name ?? "").trim();
  if (!name) {
    ui.notifications.warn(localize("WOD5E_MAGE.Items.NameMissing"));
    return;
  }

  const flags = buildGuidedItemFlags(type, result);
  await Item.create(
    {
      name,
      type,
      system: buildGuidedItemData(type, subtype, result),
      ...(Object.keys(flags).length ? { flags: { [MODULE_ID]: flags } } : {})
    },
    { parent: actor }
  );
}
