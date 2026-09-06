import { MODULE_ID } from "./constants.js";

const TEXT_FIELDS = Object.freeze([
  "nameSpheres",
  "status",
  "triggerEffect"
]);

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

/**
 * Le Magick in atto (verdetto di Blue, 6/9/2026): ogni effetto Volgare che
 * resta in piedi, mantenuto o con una Durata dichiarata, tiene BLOCCATO un
 * punto di Paradosso permanente sulla Ruota finché la riga non si cancella.
 * La riga porta anche il tipo, la Durata e la soglia del lancio.
 */
export function prepareOngoingMagick(actor) {
  const stored = actor.getFlag(MODULE_ID, "ongoingMagick") ?? {};

  return Object.entries(stored).map(([id, row]) => ({
    id,
    ...Object.fromEntries(
      TEXT_FIELDS.map((field) => [field, String(row?.[field] ?? "")])
    ),
    vulgar: Boolean(row?.vulgar),
    duration: count(row?.duration),
    threshold: count(row?.threshold),
    lock: count(row?.lock)
  }));
}

/** I punti di Paradosso permanente bloccati dagli effetti in piedi. */
export function lockedParadox(actor) {
  const stored = actor?.getFlag?.(MODULE_ID, "ongoingMagick") ?? {};
  return Object.values(stored).reduce((total, row) => total + count(row?.lock), 0);
}

/**
 * La riga di un effetto appena lanciato: il nome, lo stato, il tipo, la
 * Durata e la soglia; se è Volgare blocca un punto di Paradosso.
 */
export function maintainedEffectRow({ name, vulgar = false, duration = 0, threshold = 0, maintained = false, status = "" } = {}) {
  return {
    nameSpheres: String(name ?? "").trim(),
    status,
    triggerEffect: "",
    vulgar: Boolean(vulgar),
    duration: count(duration),
    threshold: count(threshold),
    maintained: Boolean(maintained),
    lock: vulgar ? 1 : 0
  };
}

/**
 * Un lancio va segnato fra le Magick in atto se il giocatore lo mantiene
 * (casella spuntata) oppure se ha dichiarato una Durata: anche senza
 * mantenerlo ne risponde lui, e la scheda lo tiene in vista.
 */
export function shouldRecordEffect({ maintained = false, duration = 0 } = {}) {
  return Boolean(maintained) || count(duration) > 0;
}

function canEditOngoingMagick(actor) {
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

export async function onOngoingMagickAdd(event) {
  event.preventDefault();

  const actor = this.actor;
  if (!canEditOngoingMagick(actor)) return;

  const rows = { ...(actor.getFlag(MODULE_ID, "ongoingMagick") ?? {}) };
  let rowId = foundry.utils.randomID();
  while (rows[rowId]) rowId = foundry.utils.randomID();

  rows[rowId] = {
    nameSpheres: "",
    status: "",
    triggerEffect: ""
  };

  await actor.setFlag(MODULE_ID, "ongoingMagick", rows);
}

export async function onOngoingMagickDelete(event, target) {
  event.preventDefault();

  const actor = this.actor;
  if (!canEditOngoingMagick(actor)) return;

  const rowId = target.dataset.row;
  const rows = { ...(actor.getFlag(MODULE_ID, "ongoingMagick") ?? {}) };
  if (!Object.hasOwn(rows, rowId)) return;

  // Foundry's -= update syntax removes the selected nested row instead of
  // merging the remaining object back over it.
  await actor.update({
    [`flags.${MODULE_ID}.ongoingMagick.-=${rowId}`]: null
  });
}
