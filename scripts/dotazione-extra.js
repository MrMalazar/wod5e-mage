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
 * e il tipo dell'arma, il valore dell'armatura (i campi del sistema), e dal
 * 25/9 la spunta dell'Aggravato sull'arma (Blue: «lasciamo che sia
 * personalizzabile il danno con una spunta»).
 */
export const CAMPI_OGGETTO = Object.freeze({
  [`flags.${MODULE_ID}.dettagli`]: "testo",
  [`flags.${MODULE_ID}.aggravato`]: "spunta",
  "system.weaponvalue": "numero",
  "system.weaponType": "tipoArma",
  "system.armorvalue": "armatura"
});

/** I punti armatura: da 0 a 7 per le regole (Blue, 25/9); il pieno, se l'oggetto non lo ricorda, è 7. */
export const ARMATURA_MASSIMA = 7;

export const TIPI_ARMA = Object.freeze(["melee", "ranged", "supernatural"]);

/** Il valore da scrivere sull'oggetto, pulito per campo; null se il campo non è fra quelli in riga. */
export function valoreCampoOggetto(field, raw) {
  const kind = CAMPI_OGGETTO[field];
  if (!kind) return null;
  if (kind === "numero" || kind === "armatura") {
    const n = Math.trunc(Number(raw));
    // Il danno fino a 9; l'armatura fino a 7 (Blue, 25/9: «può arrivare fino a 7 punti armatura»).
    const max = kind === "armatura" ? ARMATURA_MASSIMA : 9;
    return Number.isFinite(n) ? Math.min(Math.max(n, 0), max) : 0;
  }
  if (kind === "tipoArma") return TIPI_ARMA.includes(String(raw)) ? String(raw) : TIPI_ARMA[0];
  if (kind === "spunta") return raw === true || raw === "true" || raw === 1 || raw === "1";
  return String(raw ?? "").trim();
}

/**
 * L'armatura (Blue, 25/9): «ogni volta che un'armatura assorbe un colpo,
 * riduci il punteggio armatura di 1». La riparazione (la fisica) o la scena
 * che la ricostruisce (la mentale) rimette un punto alla volta, fino al pieno.
 */
export function armaturaDopoColpo(value) {
  const n = Math.trunc(Number(value));
  return Number.isFinite(n) ? Math.max(n - 1, 0) : 0;
}

export function armaturaDopoPunto(value, piena) {
  const n = Math.max(Math.trunc(Number(value)) || 0, 0);
  const full = Math.trunc(Number(piena));
  const cap = Number.isFinite(full) && full > 0 ? full : ARMATURA_MASSIMA;
  return Math.min(n + 1, Math.max(cap, n));
}

function armaturaPiena(item) {
  const value = Math.trunc(Number(foundry.utils.getProperty(item, `flags.${MODULE_ID}.armaturaPiena`)));
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function armaturaDellaRiga(sheet, target) {
  const actor = sheet.actor;
  const item = actor?.items?.get?.(String(target?.dataset?.itemId ?? ""));
  if (!item || item.type !== "armor" || !canEdit(actor)) return null;
  return item;
}

/** Il tasto ▼ sulla riga dell'armatura: il colpo assorbito le toglie un punto. */
export async function onArmaturaColpo(event, target) {
  event?.preventDefault?.();
  const item = armaturaDellaRiga(this, target);
  if (!item) return;
  const current = Math.max(Math.trunc(Number(item.system?.armorvalue)) || 0, 0);
  const next = armaturaDopoColpo(current);
  if (next === current) return;
  const update = { "system.armorvalue": next };
  // Un'armatura che non ricorda il suo pieno lo prende dal punteggio di prima del colpo.
  if (!armaturaPiena(item)) update[`flags.${MODULE_ID}.armaturaPiena`] = current;
  await item.update(update);
}

/** Il tasto ▲: un punto torna, fino al pieno dell'armatura. */
export async function onArmaturaPunto(event, target) {
  event?.preventDefault?.();
  const item = armaturaDellaRiga(this, target);
  if (!item) return;
  const current = Math.max(Math.trunc(Number(item.system?.armorvalue)) || 0, 0);
  const next = armaturaDopoPunto(current, armaturaPiena(item));
  if (next === current) return;
  await item.update({ "system.armorvalue": next });
}

export async function onItemFieldChange(event, target) {
  const actor = this.actor;
  const item = actor?.items?.get?.(String(target?.dataset?.itemId ?? ""));
  if (!item || !canEdit(actor)) return;
  const field = String(target.dataset.itemField ?? "");
  // La spunta dice checked, le caselle dicono value.
  const raw = target?.type === "checkbox" ? Boolean(target.checked) : target.value;
  const value = valoreCampoOggetto(field, raw);
  if (value === null) return;
  const current = foundry.utils.getProperty(item, field);
  if (current === value || (current == null && value === "")) return;
  const update = { [field]: value };
  // Il punteggio dell'armatura scritto a mano oltre il pieno: il pieno sale con lui.
  if (field === "system.armorvalue" && value > armaturaPiena(item)) update[`flags.${MODULE_ID}.armaturaPiena`] = value;
  await item.update(update);
}
