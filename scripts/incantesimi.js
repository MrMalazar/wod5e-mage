import { MODULE_ID } from "./constants.js";
import { SCOPES, SCOPE_ICONS } from "./scopes.js";
import { SPHERES } from "./spheres.js";

/**
 * Il Grimorio del personaggio (richiesta di Blue, 6/9/2026): la pagina dove
 * il giocatore scrive i suoi incantesimi. Il + apre la stessa finestra del
 * tiro di Areté, ma invece di tirare salva: nome, riserva, tipo, Sfere,
 * Ambiti, Obiettivo, Effetto e la narrativa del lancio; la scheda ci
 * aggiunge da sé il Credo, il Tipo di Magick e gli Strumenti delle Sfere
 * usate, com'erano al momento di scrivere. Da ogni incantesimo si lancia
 * (la finestra si apre già riempita), si modifica, si manda in chat.
 */

export const INCANTESIMI_FLAG = "grimorio";

const MAGICK_TYPE_LABELS = Object.freeze({
  "": "WOD5E_MAGE.Arete.NoType",
  coincidental: "WOD5E_MAGE.Arete.Coincidental",
  vulgar: "WOD5E_MAGE.Arete.Vulgar",
  witnesses: "WOD5E_MAGE.Arete.VulgarWithWitnesses"
});

function level(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

/** Una riga del Grimorio, con le etichette pronte per la pagina. */
export function prepareIncantesimo(id, spell, localize = (key) => key) {
  const spheres = SPHERES
    .filter((sphere) => level(spell?.spheres?.[sphere]) > 0)
    .map((sphere) => ({
      id: sphere,
      label: localize(`WOD5E_MAGE.Spheres.${sphere}`),
      level: level(spell.spheres[sphere]),
      icon: `modules/${MODULE_ID}/assets/icons/sheet/${sphere}.png`
    }));
  const scopes = SCOPES
    .filter((scope) => level(spell?.scopes?.[scope]) > 0)
    .map((scope) => ({ id: scope, label: localize(`WOD5E_MAGE.Scopes.${scope}`), level: level(spell.scopes[scope]), faIcon: SCOPE_ICONS[scope] ?? "" }));
  const magickType = String(spell?.magickType ?? "");
  return {
    id,
    name: String(spell?.name ?? "").trim() || localize("WOD5E_MAGE.Incantesimi.Unnamed"),
    goal: String(spell?.goal ?? ""),
    narrative: String(spell?.narrative ?? ""),
    credo: spell?.credo ? localize(`WOD5E_MAGE.Focus.Credos.${spell.credo}`) : "",
    practiceForm: spell?.practiceForm ? localize(`WOD5E_MAGE.Focus.Forms.${spell.practiceForm}`) : "",
    instruments: Array.isArray(spell?.instruments) ? spell.instruments.join(", ") : "",
    traits: (spell?.traits ?? []).map((trait) => trait.label).join(" + "),
    magickType: localize(MAGICK_TYPE_LABELS[magickType] ?? MAGICK_TYPE_LABELS[""]),
    magickTypeId: magickType,
    effectKind: spell?.effectKind ? localize(`WOD5E_MAGE.Arete.EffectKinds.${spell.effectKind}`) : "",
    prize: Boolean(spell?.prize),
    maintained: Boolean(spell?.maintained),
    spheres,
    scopes,
    sort: Number(spell?.sort) || 0
  };
}

export function prepareIncantesimi(actor, localize = (key) => key) {
  const stored = actor.getFlag(MODULE_ID, INCANTESIMI_FLAG) ?? {};
  return Object.entries(stored)
    .map(([id, spell]) => prepareIncantesimo(id, spell, localize))
    .sort((a, b) => a.sort - b.sort || a.name.localeCompare(b.name));
}

/**
 * La pagina per Sfere (verdetto di Blue, 6/9): ogni incantesimo sta sotto la
 * Sfera più alta che usa; se due Sfere sono pari e le più alte, compare in
 * tutte e due. Chi non ha Sfere finisce in coda, «Senza Sfera».
 */
export function topSpheres(row) {
  const spheres = row?.spheres ?? [];
  const top = Math.max(0, ...spheres.map((sphere) => sphere.level));
  return spheres.filter((sphere) => sphere.level === top && top > 0).map((sphere) => sphere.id);
}

export function groupIncantesimiBySphere(rows, localize = (key) => key) {
  const groups = SPHERES.map((sphere) => ({
    sphere,
    label: localize(`WOD5E_MAGE.Spheres.${sphere}`),
    icon: `modules/${MODULE_ID}/assets/icons/sheet/${sphere}.png`,
    spells: rows.filter((row) => topSpheres(row).includes(sphere))
  })).filter((group) => group.spells.length);
  const loose = rows.filter((row) => topSpheres(row).length === 0);
  if (loose.length) groups.push({ sphere: "", label: localize("WOD5E_MAGE.Incantesimi.NoSphere"), icon: "", spells: loose });
  return groups;
}

/**
 * Un effetto del manuale diventa un incantesimo della scheda: nome e Obiettivo
 * dal Grimorio, le Sfere che chiede, Credo, Tipo e Strumenti dalla scheda;
 * il resto lo scrive il giocatore, nell'ottica del suo Credo.
 */
export function spellFromEffetto(actor, entry, sphereLevels, localize = (key) => key) {
  const focus = actor.getFlag(MODULE_ID, "focus") ?? {};
  const instruments = Object.keys(sphereLevels)
    .map((id) => {
      const row = focus.sphereInstruments?.[id] ?? {};
      const tool = row.tool ? localize(`WOD5E_MAGE.Focus.Tools.${row.tool}`) : "";
      const name = String(row.name ?? "").trim();
      if (tool && name) return `${tool} (${name})`;
      return tool || name;
    })
    .filter((item, index, all) => item && all.indexOf(item) === index);
  return {
    name: entry.name,
    goal: entry.text,
    narrative: "",
    effectKind: "",
    magickType: "",
    prize: false,
    maintained: false,
    traits: [],
    spheres: { ...sphereLevels },
    scopes: {},
    credo: String(focus.credo ?? ""),
    practiceForm: String(focus.practiceForm ?? ""),
    instruments,
    effetto: entry.id
  };
}

function canEdit(actor) {
  if (!actor.isOwner) {
    ui.notifications.warn(game.i18n.format("WOD5E.Notifications.NoSufficientPermission", { string: actor.name }));
    return false;
  }
  return true;
}

function storedSpell(actor, id) {
  const stored = actor.getFlag(MODULE_ID, INCANTESIMI_FLAG) ?? {};
  return Object.hasOwn(stored, id) ? stored[id] : null;
}

async function saveSpell(actor, id, spell) {
  await actor.update({ [`flags.${MODULE_ID}.${INCANTESIMI_FLAG}.${id}`]: spell });
}

/** Il +: la finestra del tiro in modo «salva». */
export async function onIncantesimoAdd(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const { launchArete } = await import("./arete.js");
  const spell = await launchArete(actor, { mode: "save" });
  if (!spell) return;
  const stored = actor.getFlag(MODULE_ID, INCANTESIMI_FLAG) ?? {};
  let id = foundry.utils.randomID();
  while (stored[id]) id = foundry.utils.randomID();
  await saveSpell(actor, id, { ...spell, sort: Object.keys(stored).length });
  ui.notifications.info(game.i18n.format("WOD5E_MAGE.Incantesimi.Saved", { name: spell.name }));
}

/** La matita: la stessa finestra, già riempita; salva sopra. */
export async function onIncantesimoEdit(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const id = target.dataset.row;
  const current = storedSpell(actor, id);
  if (!current) return;
  const { launchArete } = await import("./arete.js");
  const spell = await launchArete(actor, { mode: "save", preset: current });
  if (!spell) return;
  await saveSpell(actor, id, { ...spell, sort: current.sort ?? 0 });
}

export async function onIncantesimoDelete(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const id = target.dataset.row;
  if (!storedSpell(actor, id)) return;
  await actor.update({ [`flags.${MODULE_ID}.${INCANTESIMI_FLAG}.-=${id}`]: null });
}

/** Il dado: la finestra del tiro già riempita con l'incantesimo. */
export async function onIncantesimoRoll(event, target) {
  event.preventDefault();
  const actor = this.actor;
  const current = storedSpell(actor, target.dataset.row);
  if (!current) return;
  const { launchArete } = await import("./arete.js");
  return launchArete(actor, { mode: "roll", preset: current });
}

/** Il libro degli effetti: liste di effetti del manuale aggiunte alla scheda, da ritoccare poi. */
export async function onIncantesimoFromEffetti(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const { openGrimorio, effectSphereLevels } = await import("./grimorio.js");
  const { prepareSpheres } = await import("./spheres.js");
  const localize = game.i18n.localize.bind(game.i18n);
  const owned = Object.fromEntries(prepareSpheres(actor).selected.filter((sphere) => sphere.value > 0).map((sphere) => [sphere.id, sphere.value]));
  await openGrimorio(owned, {
    onPick: async (entry) => {
      const stored = actor.getFlag(MODULE_ID, INCANTESIMI_FLAG) ?? {};
      let id = foundry.utils.randomID();
      while (stored[id]) id = foundry.utils.randomID();
      const spell = spellFromEffetto(actor, entry, effectSphereLevels(entry), localize);
      await saveSpell(actor, id, { ...spell, sort: Object.keys(stored).length });
      ui.notifications.info(game.i18n.format("WOD5E_MAGE.Incantesimi.Saved", { name: spell.name }));
    }
  });
}

/** Il fumetto: l'incantesimo in chat, per il tavolo. */
export async function onIncantesimoChat(event, target) {
  event.preventDefault();
  const actor = this.actor;
  const current = storedSpell(actor, target.dataset.row);
  if (!current) return;
  const row = prepareIncantesimo(target.dataset.row, current, game.i18n.localize.bind(game.i18n));
  const content = await foundry.applications.handlebars.renderTemplate(
    `modules/${MODULE_ID}/templates/chat/incantesimo.hbs`,
    { spell: row }
  );
  return ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), content });
}
