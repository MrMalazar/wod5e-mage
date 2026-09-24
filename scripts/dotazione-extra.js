import { MODULE_ID } from "./constants.js";
import { BELONGING_ARCHIVI, openArchivio } from "./archivi.js";

/**
 * Gli Elementi oltre l'inventario: Background, Vantaggi e Difetti che non
 * stanno sui punti del personaggio — quelli IN COMUNE con altri giocatori e
 * quelli DI STORIA, ottenuti (o subiti) in gioco, anche temporanei.
 * Righe libere nei flag del modulo, col livello a pallini come ogni tratto.
 */
export const BELONGING_TABLES = Object.freeze({
  shared: "sharedBelongings",
  story: "storyBelongings",
  // Gli Altri oggetti (6/9): righe libere nell'inventario, nome e nota.
  items: "altriOggetti"
});

export const BELONGING_KINDS = Object.freeze(["background", "advantage", "flaw"]);

function readRows(actor, flagKey, localize) {
  const stored = actor.getFlag(MODULE_ID, flagKey) ?? {};

  return Object.entries(stored).map(([id, row]) => {
    const kind = String(row?.kind ?? "");
    const value = Math.trunc(Number(row?.value));
    return {
      id,
      kind,
      name: String(row?.name ?? ""),
      value: Number.isFinite(value) ? Math.min(Math.max(value, 0), 5) : 0,
      kinds: BELONGING_KINDS.map((kindId) => ({
        id: kindId,
        label: localize(`WOD5E_MAGE.Belongings.Kinds.${kindId}`),
        selected: kindId === kind
      }))
    };
  });
}

/** Gli Altri oggetti: nome e nota, nell'ordine in cui sono stati aggiunti. */
export function prepareAltriOggetti(actor) {
  const stored = actor.getFlag(MODULE_ID, BELONGING_TABLES.items) ?? {};
  return Object.entries(stored).map(([id, row]) => ({
    id,
    name: String(row?.name ?? ""),
    note: String(row?.note ?? "")
  }));
}

export function prepareBelongings(actor) {
  const localize = globalThis.game?.i18n?.localize?.bind(globalThis.game.i18n)
    ?? ((key) => key);

  return {
    shared: readRows(actor, BELONGING_TABLES.shared, localize),
    story: readRows(actor, BELONGING_TABLES.story, localize),
    items: prepareAltriOggetti(actor)
  };
}

function canEdit(actor) {
  if (!actor.isOwner) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.NoSufficientPermission", {
        string: actor.name
      })
    );
    return false;
  }

  if (actor.system.locked) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.CannotModifyResourceString", {
        string: actor.name
      })
    );
    return false;
  }

  return true;
}

function tableFlag(target) {
  const table = target.dataset.table;
  return Object.values(BELONGING_TABLES).includes(table) ? table : null;
}

export async function onBelongingAdd(event, target) {
  event.preventDefault();

  const actor = this.actor;
  const flagKey = tableFlag(target);
  if (!flagKey || !canEdit(actor)) return;

  const rows = { ...(actor.getFlag(MODULE_ID, flagKey) ?? {}) };
  let rowId = foundry.utils.randomID();
  while (rows[rowId]) rowId = foundry.utils.randomID();

  rows[rowId] = flagKey === BELONGING_TABLES.items ? { name: "", note: "" } : { kind: "", name: "", value: 0 };

  await actor.setFlag(MODULE_ID, flagKey, rows);
}

/**
 * Il libro accanto al + (10/9): l'archivio dei Background, dei Pregi o dei
 * Difetti, con le linguette per passare dall'uno all'altro; la voce scelta
 * diventa una riga della tavola, tipo · nome · livello. Le tavole degli
 * Elementi soltanto: gli Altri oggetti non hanno un archivio.
 */
export function belongingArchivioTable(target) {
  const table = tableFlag(target);
  return table && table !== BELONGING_TABLES.items ? table : null;
}

export async function onBelongingArchivio(event, target) {
  event.preventDefault();
  const actor = this.actor;
  const table = belongingArchivioTable(target);
  if (!table || !canEdit(actor)) return;
  const kind = BELONGING_ARCHIVI.includes(target.dataset.kind) ? target.dataset.kind : BELONGING_ARCHIVI[0];
  await openArchivio(actor, kind, { table, kinds: [...BELONGING_ARCHIVI] });
}

export async function onBelongingDelete(event, target) {
  event.preventDefault();

  const actor = this.actor;
  const flagKey = tableFlag(target);
  if (!flagKey || !canEdit(actor)) return;

  const rowId = target.dataset.row;
  const rows = { ...(actor.getFlag(MODULE_ID, flagKey) ?? {}) };
  if (!Object.hasOwn(rows, rowId)) return;

  // La sintassi -= di Foundry toglie la riga senza rifondere le altre.
  await actor.update({
    [`flags.${MODULE_ID}.${flagKey}.-=${rowId}`]: null
  });
}

/**
 * I dettagli in riga dei Tratti (Blue, 24/9 sera): accanto al Background, al
 * Pregio, all'arma, una casella che scrive sull'oggetto senza aprirlo. Solo
 * i campi qui elencati: il testo dei dettagli (nel flag del modulo), il danno
 * e il tipo dell'arma, il valore dell'armatura (i campi del sistema).
 */
export const CAMPI_OGGETTO = Object.freeze({
  [`flags.${MODULE_ID}.dettagli`]: "testo",
  "system.weaponvalue": "numero",
  "system.weaponType": "tipoArma",
  "system.armorvalue": "numero"
});

export const TIPI_ARMA = Object.freeze(["melee", "ranged", "supernatural"]);

/** Il valore da scrivere sull'oggetto, pulito per campo; null se il campo non è fra quelli in riga. */
export function valoreCampoOggetto(field, raw) {
  const kind = CAMPI_OGGETTO[field];
  if (!kind) return null;
  if (kind === "numero") {
    const n = Math.trunc(Number(raw));
    return Number.isFinite(n) ? Math.min(Math.max(n, 0), 9) : 0;
  }
  if (kind === "tipoArma") return TIPI_ARMA.includes(String(raw)) ? String(raw) : TIPI_ARMA[0];
  return String(raw ?? "").trim();
}

export async function onItemFieldChange(event, target) {
  const actor = this.actor;
  const item = actor?.items?.get?.(String(target?.dataset?.itemId ?? ""));
  if (!item || !canEdit(actor)) return;
  const field = String(target.dataset.itemField ?? "");
  const value = valoreCampoOggetto(field, target.value);
  if (value === null) return;
  const current = foundry.utils.getProperty(item, field);
  if (current === value || (current == null && value === "")) return;
  await item.update({ [field]: value });
}
