import { MODULE_ID } from "./constants.js";
import { INCANTESIMI_FLAG, prepareIncantesimo } from "./incantesimi.js";

/**
 * Il Grimorio comune (richiesta di Blue, 6/9/2026): un compendio del mondo,
 * aperto ai giocatori, dove ogni incantesimo scritto sulle schede si può
 * versare e dove tutti possono pescare. Le combinazioni di Sfere, Credi e
 * Strumenti sono troppe per scriverle a tavolino: le raccoglie il tavolo.
 * Ogni voce è un oggetto «feature» col testo leggibile e, nella bandiera
 * `wod5e-mage.incantesimo`, i dati per riempire la finestra del tiro.
 */

export const SHARED_PACK_NAME = "grimorio-comune";
export const SPELL_FLAG = "incantesimo";

function packId() {
  return `world.${SHARED_PACK_NAME}`;
}

export function sharedPack() {
  return game.packs?.get(packId()) ?? null;
}

/** Il compendio, creato dal Master la prima volta (i giocatori ci scrivono). */
export async function ensureSharedPack({ create = game.user?.isGM } = {}) {
  const existing = sharedPack();
  if (existing) return existing;
  if (!create) return null;
  const Collection = foundry.documents?.collections?.CompendiumCollection ?? globalThis.CompendiumCollection;
  const pack = await Collection.createCompendium({
    type: "Item",
    label: game.i18n.localize("WOD5E_MAGE.GrimorioComune.Label"),
    name: SHARED_PACK_NAME
  });
  // Aperto ai giocatori: ci scrivono loro.
  await pack.configure({ locked: false, ownership: { PLAYER: "OWNER", TRUSTED: "OWNER", ASSISTANT: "OWNER" } });
  return pack;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Il testo leggibile della voce, dalle etichette della pagina. */
export function spellDescription(row, localize = (key) => key) {
  const line = (label, value) => value ? `<p><strong>${escapeHtml(localize(label))}:</strong> ${escapeHtml(value)}</p>` : "";
  return [
    line("WOD5E_MAGE.GrimorioComune.Author", row.author),
    line("WOD5E_MAGE.Focus.Credo", row.credo),
    line("WOD5E_MAGE.Focus.Type", row.practiceForm),
    line("WOD5E_MAGE.Incantesimi.Instrument", row.instruments),
    line("WOD5E_MAGE.Arete.Pool", row.traits),
    line("WOD5E_MAGE.Arete.Spheres", row.spheres.map((s) => `${s.label} ${s.level}`).join(", ")),
    line("WOD5E_MAGE.Scopes.Label", row.scopes.map((s) => `${s.label} ${s.level}`).join(", ")),
    line("WOD5E_MAGE.Arete.MagickType", row.magickType),
    line("WOD5E_MAGE.Arete.EffectKind", row.effectKind),
    line("WOD5E_MAGE.Arete.Goal", row.goal),
    line("WOD5E_MAGE.Incantesimi.Narrative", row.narrative)
  ].join("");
}

/** L'oggetto da versare nel compendio. */
export function sharedItemData(spell, { author = "", localize = (key) => key, sharedId = null } = {}) {
  const row = prepareIncantesimo(sharedId ?? "", spell, localize);
  row.author = author;
  const firstSphere = row.spheres[0]?.id;
  return {
    name: row.name,
    type: "feature",
    img: firstSphere ? `modules/${MODULE_ID}/assets/icons/sheet/${firstSphere}.png` : `modules/${MODULE_ID}/assets/icons/ui/arete.svg`,
    system: { description: spellDescription(row, localize), source: { book: "M6 · Grimorio comune", page: "" } },
    flags: { [MODULE_ID]: { [SPELL_FLAG]: { ...spell, author, sharedAt: Date.now() } } }
  };
}

/** Versa un incantesimo della scheda nel Grimorio comune (o aggiorna la sua voce). */
export async function shareSpell(actor, id) {
  const spells = actor.getFlag(MODULE_ID, INCANTESIMI_FLAG) ?? {};
  const spell = spells[id];
  if (!spell) return null;
  const pack = await ensureSharedPack();
  if (!pack) {
    ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.GrimorioComune.Missing"));
    return null;
  }
  const localize = game.i18n.localize.bind(game.i18n);
  const data = sharedItemData(spell, { author: actor.name, localize });
  let item = spell.sharedId ? await pack.getDocument(spell.sharedId).catch(() => null) : null;
  if (item) {
    await item.update({ name: data.name, img: data.img, system: data.system, flags: data.flags });
  } else {
    [item] = await pack.documentClass.createDocuments([data], { pack: pack.collection });
    await actor.update({ [`flags.${MODULE_ID}.${INCANTESIMI_FLAG}.${id}.sharedId`]: item.id });
  }
  ui.notifications.info(game.i18n.format("WOD5E_MAGE.GrimorioComune.Shared", { name: data.name }));
  return item;
}

/** Le voci del compendio, con le etichette, raggruppate per Credo. */
export async function loadSharedSpells(localize = (key) => key) {
  const pack = sharedPack();
  if (!pack) return [];
  const documents = await pack.getDocuments();
  return documents
    .map((item) => {
      const spell = item.getFlag(MODULE_ID, SPELL_FLAG);
      if (!spell) return null;
      const row = prepareIncantesimo(item.id, spell, localize);
      row.author = String(spell.author ?? "");
      row.uuid = item.uuid;
      return row;
    })
    .filter(Boolean)
    .sort((a, b) => a.credo.localeCompare(b.credo) || a.name.localeCompare(b.name));
}

export function groupSharedSpells(rows, localize = (key) => key) {
  const groups = new Map();
  for (const row of rows) {
    const key = row.credo || localize("WOD5E_MAGE.GrimorioComune.NoCredo");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }
  return [...groups.entries()].map(([credo, spells]) => ({ credo, spells }));
}

/** La finestra del Grimorio comune: cerca, copia nel tuo, lancia. */
export async function openGrimorioComune(actor) {
  const localize = game.i18n.localize.bind(game.i18n);
  const pack = await ensureSharedPack();
  if (!pack) {
    ui.notifications.warn(localize("WOD5E_MAGE.GrimorioComune.Missing"));
    return;
  }
  const rows = await loadSharedSpells(localize);
  const content = await foundry.applications.handlebars.renderTemplate(
    `modules/${MODULE_ID}/templates/dialogs/grimorio-comune.hbs`,
    { groups: groupSharedSpells(rows, localize), count: rows.length }
  );
  const byId = new Map(rows.map((row) => [row.id, row]));
  await foundry.applications.api.DialogV2.wait({
    window: { title: localize("WOD5E_MAGE.GrimorioComune.Label") },
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-roll-dialog", "wod5e-mage-grimorio"],
    position: { width: 680 },
    content,
    buttons: [{ action: "close", icon: "fas fa-times", label: localize("WOD5E.Close"), default: true }],
    rejectClose: false,
    render: (_event, dialog) => {
      const root = dialog.element;
      const search = root.querySelector("[data-role=grimorioSearch]");
      search?.addEventListener("input", () => {
        const wanted = search.value.trim().toLowerCase();
        root.querySelectorAll("[data-spell]").forEach((card) => {
          card.hidden = Boolean(wanted) && !card.textContent.toLowerCase().includes(wanted);
        });
      });
      root.addEventListener("click", async (event) => {
        const button = event.target.closest?.("[data-shared-action]");
        if (!button) return;
        event.preventDefault();
        const row = byId.get(button.closest("[data-spell]")?.dataset.spell);
        if (!row) return;
        const item = await pack.getDocument(row.id);
        const spell = item?.getFlag(MODULE_ID, SPELL_FLAG);
        if (!spell) return;
        if (button.dataset.sharedAction === "copy") {
          if (!actor?.isOwner) return;
          const mine = actor.getFlag(MODULE_ID, INCANTESIMI_FLAG) ?? {};
          let id = foundry.utils.randomID();
          while (mine[id]) id = foundry.utils.randomID();
          const { sharedId, author, sharedAt, ...copy } = spell;
          await actor.update({ [`flags.${MODULE_ID}.${INCANTESIMI_FLAG}.${id}`]: { ...copy, sort: Object.keys(mine).length } });
          ui.notifications.info(game.i18n.format("WOD5E_MAGE.Incantesimi.Saved", { name: row.name }));
        } else if (button.dataset.sharedAction === "roll") {
          dialog.close();
          const { launchArete } = await import("./arete.js");
          await launchArete(actor, { mode: "roll", preset: spell });
        }
      });
    }
  }).catch(() => null);
}

/** Dalla pagina: versa; il libro apre il comune. */
export async function onIncantesimoShare(event, target) {
  event.preventDefault();
  if (!this.actor.isOwner) return;
  return shareSpell(this.actor, target.dataset.row);
}

export async function onGrimorioComuneOpen(event) {
  event?.preventDefault?.();
  return openGrimorioComune(this.actor);
}

/** Al ready il Master crea il compendio, così i giocatori lo trovano. */
export function registerGrimorioComune() {
  Hooks.once("ready", () => {
    if (game.user?.isGM) ensureSharedPack().catch((error) => console.warn("wod5e-mage | Grimorio comune", error));
  });
}
