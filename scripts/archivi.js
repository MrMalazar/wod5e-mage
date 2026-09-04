import { MODULE_ID } from "./constants.js";

/**
 * Gli archivi del Mago: i Cataloghi del manuale in compendi (Pregi, Difetti,
 * Background come oggetti; Credi, Concetti, Ambizioni, Desideri, Ancore e
 * Convinzioni come voci di diario). Dalla scheda un'icona del libro apre
 * l'archivio della voce; il «+» accanto a una voce la mette sulla scheda.
 * Le funzioni pure stanno in cima: si provano fuori da Foundry.
 */

export const ARCHIVIO_FLAG = "archivio";

export const ARCHIVI = Object.freeze({
  pregio: { pack: "mage-pregi", type: "Item", add: "item", label: "WOD5E_MAGE.Archivi.Kinds.pregio" },
  difetto: { pack: "mage-difetti", type: "Item", add: "item", label: "WOD5E_MAGE.Archivi.Kinds.difetto" },
  background: { pack: "mage-background", type: "Item", add: "item", label: "WOD5E_MAGE.Archivi.Kinds.background" },
  credo: { pack: "mage-credi", type: "JournalEntry", add: "credo", label: "WOD5E_MAGE.Archivi.Kinds.credo" },
  concetto: { pack: "mage-concetti", type: "JournalEntry", add: "header", field: "concept", label: "WOD5E_MAGE.Archivi.Kinds.concetto" },
  ambizione: { pack: "mage-ambizioni", type: "JournalEntry", add: "header", field: "ambition", label: "WOD5E_MAGE.Archivi.Kinds.ambizione" },
  desiderio: { pack: "mage-desideri", type: "JournalEntry", add: "header", field: "desire", label: "WOD5E_MAGE.Archivi.Kinds.desiderio" },
  ancora: { pack: "mage-ancore", type: "JournalEntry", add: "row", table: "ancore", label: "WOD5E_MAGE.Archivi.Kinds.ancora" },
  convinzione: { pack: "mage-convinzioni", type: "JournalEntry", add: "row", table: "convinzioni", label: "WOD5E_MAGE.Archivi.Kinds.convinzione" }
});

/** Il «+» dei Pregi, Difetti e Background del sistema parla per sottotipo. */
export const FEATURE_KINDS = Object.freeze({ merit: "pregio", flaw: "difetto", background: "background" });

export function archivioKind(kind) {
  return Object.hasOwn(ARCHIVI, kind) ? kind : null;
}

/** Accodare: il testo nuovo dopo quello che c'è, col punto mediano in mezzo. */
export function appendText(existing, text) {
  const before = String(existing ?? "").trim();
  const after = String(text ?? "").trim();
  if (!after) return before;
  if (!before) return after;
  if (before.includes(after)) return before;
  return `${before} · ${after}`;
}

/** La riga della scheda che nasce da una voce d'archivio. */
export function rowFromEntry(kind, entry) {
  if (kind === "ancora") {
    return { name: String(entry.text ?? entry.name ?? ""), description: String(entry.description ?? "") };
  }
  if (kind === "convinzione") {
    return { group: String(entry.group ?? ""), text: String(entry.text ?? entry.name ?? "") };
  }
  return null;
}

/** Le voci raggruppate, nell'ordine dell'archivio. */
export function groupEntries(entries) {
  const groups = [];
  for (const entry of entries) {
    const name = String(entry.group ?? "");
    let group = groups.find((candidate) => candidate.name === name);
    if (!group) {
      group = { name, entries: [] };
      groups.push(group);
    }
    group.entries.push(entry);
  }
  return groups;
}

/** Il filtro della ricerca: nome, gruppo e testo, senza accenti e maiuscole. */
export function matchesSearch(entry, query) {
  const needle = normalize(query);
  if (!needle) return true;
  const hay = normalize([entry.name, entry.group, entry.text, entry.description, entry.gloss].filter(Boolean).join(" "));
  return hay.includes(needle);
}

function normalize(value) {
  return String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

/** Una voce d'archivio letta da un documento del compendio. */
export function entryFromDocument(doc) {
  const flag = doc?.flags?.[MODULE_ID]?.[ARCHIVIO_FLAG] ?? doc?.getFlag?.(MODULE_ID, ARCHIVIO_FLAG) ?? {};
  const page = doc?.pages?.contents?.[0] ?? doc?.pages?.[0];
  const content = doc?.system?.description ?? page?.text?.content ?? "";
  return {
    uuid: String(doc?.uuid ?? ""),
    id: String(doc?._id ?? doc?.id ?? ""),
    name: String(doc?.name ?? flag.name ?? ""),
    group: String(flag.group ?? ""),
    text: flag.text,
    description: flag.description,
    gloss: flag.gloss,
    cross: flag.cross,
    cost: flag.cost,
    points: flag.points,
    credo: flag.credo,
    sort: Number(doc?.sort) || 0,
    content: String(content ?? "")
  };
}

// ------------------------------------------------------------------ Foundry

function canEdit(actor) {
  return Boolean(actor?.isOwner) && !actor?.system?.locked;
}

export async function loadArchivio(kind) {
  const config = ARCHIVI[archivioKind(kind)];
  if (!config) return [];
  const pack = game.packs.get(`${MODULE_ID}.${config.pack}`);
  if (!pack) return [];
  const docs = await pack.getDocuments();
  return docs
    .map((doc) => entryFromDocument(doc))
    .sort((a, b) => a.sort - b.sort);
}

/** Mette la voce sulla scheda: oggetto, Credo, testo accodato o riga nuova. */
export async function addFromArchivio(actor, kind, entry) {
  const config = ARCHIVI[archivioKind(kind)];
  if (!config || !canEdit(actor)) return false;

  if (config.add === "item") {
    const doc = await fromUuid(entry.uuid);
    if (!doc) return false;
    const data = doc.toObject();
    delete data._id;
    data.system.points = Math.max(Number(entry.points) || 1, 1);
    await actor.createEmbeddedDocuments("Item", [data]);
    return true;
  }
  if (config.add === "credo") {
    if (!entry.credo) return false;
    await actor.update({ [`flags.${MODULE_ID}.focus.credo`]: entry.credo });
    return true;
  }
  if (config.add === "header") {
    const current = actor.system?.headers?.[config.field] ?? "";
    await actor.update({ [`system.headers.${config.field}`]: appendText(current, entry.text ?? entry.name) });
    return true;
  }
  if (config.add === "row") {
    const rows = { ...(actor.getFlag(MODULE_ID, config.table) ?? {}) };
    let rowId = foundry.utils.randomID();
    while (rows[rowId]) rowId = foundry.utils.randomID();
    rows[rowId] = rowFromEntry(kind, entry);
    await actor.setFlag(MODULE_ID, config.table, rows);
    return true;
  }
  return false;
}

/** La finestra dell'archivio: cerca, apri la voce, «+» per metterla sulla scheda. */
export async function openArchivio(actor, kind) {
  const config = ARCHIVI[archivioKind(kind)];
  if (!config) return;
  const entries = await loadArchivio(kind);
  const localize = game.i18n.localize.bind(game.i18n);
  const title = localize(config.label);
  const content = await foundry.applications.handlebars.renderTemplate(
    `modules/${MODULE_ID}/templates/dialogs/archivio.hbs`,
    { kind, title, groups: groupEntries(entries), count: entries.length, canAdd: canEdit(actor) }
  );

  return foundry.applications.api.DialogV2.wait({
    window: { title: game.i18n.format("WOD5E_MAGE.Archivi.WindowTitle", { title }) },
    position: { width: 640, height: 700 },
    content,
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-archivio-dialog"],
    buttons: [{ action: "close", icon: "fas fa-times", label: localize("WOD5E.Close"), default: true }],
    render: (_event, dialog) => wireArchivio(dialog, actor, kind, entries)
  });
}

function wireArchivio(dialog, actor, kind, entries) {
  const root = dialog?.element;
  if (!root) return;
  const search = root.querySelector("[data-role=archivioSearch]");
  const rows = [...root.querySelectorAll("[data-role=archivioEntry]")];
  const groups = [...root.querySelectorAll("[data-role=archivioGroup]")];

  search?.addEventListener("input", () => {
    const query = search.value;
    for (const row of rows) {
      const entry = entries.find((candidate) => candidate.uuid === row.dataset.uuid);
      row.hidden = !matchesSearch(entry ?? {}, query);
    }
    for (const group of groups) {
      group.hidden = ![...group.querySelectorAll("[data-role=archivioEntry]")].some((row) => !row.hidden);
    }
  });

  root.querySelectorAll("[data-role=archivioToggle]").forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      toggle.closest("[data-role=archivioEntry]")?.classList.toggle("open");
    });
  });

  root.querySelectorAll("[data-role=archivioAdd]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const row = button.closest("[data-role=archivioEntry]");
      const entry = entries.find((candidate) => candidate.uuid === row?.dataset.uuid);
      if (!entry) return;
      button.disabled = true;
      const done = await addFromArchivio(actor, kind, entry);
      button.disabled = false;
      if (done) {
        row.classList.add("added");
        ui.notifications.info(game.i18n.format("WOD5E_MAGE.Archivi.Added", { name: entry.name }));
      }
    });
  });
}

/** L'azione della scheda: l'icona del libro accanto a una voce. */
export async function onArchivioOpen(event, target) {
  event.preventDefault();
  const kind = archivioKind(target.dataset.kind) ?? FEATURE_KINDS[target.dataset.subtype];
  if (!kind) return;
  await openArchivio(this.actor, kind);
}
