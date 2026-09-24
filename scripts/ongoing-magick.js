import { MODULE_ID } from "./constants.js";
import { SCOPES } from "./scopes.js";
import { SPHERES } from "./spheres.js";

/**
 * I campi di testo della riga (Blue, 25/9 sera: la Magick in atto «deve
 * segnare diversi elementi»): il nome, lo stato, l'effetto; chi l'ha lanciata
 * e chi la mantiene; com'è composta (Sfere, matrice, potere); gli Ambiti
 * della soglia in parole; i bonus e i malus del lancio.
 */
const TEXT_FIELDS = Object.freeze([
  "nameSpheres",
  "status",
  "triggerEffect",
  "caster",
  "maintainer",
  "composition",
  "scopesText",
  "modifiers"
]);

function ids(list, valid) {
  return (Array.isArray(list) ? list : []).map((id) => String(id)).filter((id, index, all) => valid.includes(id) && all.indexOf(id) === index);
}

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

/**
 * Le Magick in atto (verdetto di Blue, 6/9/2026): ogni effetto Volgare che
 * resta in piedi, mantenuto o con una Durata dichiarata, tiene BLOCCATO un
 * punto di Paradosso permanente sulla Ruota finché la riga non si cancella.
 * La riga porta anche il tipo, la Durata e la soglia del lancio.
 */
export function prepareOngoingMagick(actor, localize = (key) => key) {
  const stored = actor.getFlag(MODULE_ID, "ongoingMagick") ?? {};

  return Object.entries(stored).map(([id, row]) => {
    const spheres = ids(row?.spheres, SPHERES);
    const scopes = Object.fromEntries(SCOPES.map((scope) => [scope, count(row?.scopes?.[scope])]).filter(([, level]) => level > 0));
    return {
      id,
      ...Object.fromEntries(
        TEXT_FIELDS.map((field) => [field, String(row?.[field] ?? "")])
      ),
      vulgar: Boolean(row?.vulgar),
      duration: count(row?.duration),
      threshold: count(row?.threshold),
      lock: count(row?.lock),
      // Dal tiro (25/9 sera): la riga scritta dal modulo a lancio fatto, o a mano.
      fromRoll: Boolean(row?.fromRoll),
      maintained: Boolean(row?.maintained),
      // Le Sfere del lancio coi sigilli, e gli Ambiti coi livelli.
      spheres: spheres.map((sphere) => ({ id: sphere, label: localize(`WOD5E_MAGE.Spheres.${sphere}`), icon: `modules/${MODULE_ID}/assets/icons/sheet/${sphere}.png` })),
      scopes: Object.entries(scopes).map(([scope, level]) => ({ id: scope, label: localize(`WOD5E_MAGE.Scopes.${scope}`), level })),
      // On/Off (6/9): un effetto spento resta scritto ma non è in piedi.
      active: isActive(row)
    };
  });
}

/** Una riga è accesa finché nessuno la spegne. */
export function isActive(row) {
  return row?.active !== false;
}

/** I punti di Paradosso permanente bloccati dagli effetti in piedi (accesi). */
export function lockedParadox(actor) {
  const stored = actor?.getFlag?.(MODULE_ID, "ongoingMagick") ?? {};
  return Object.values(stored).reduce((total, row) => total + (isActive(row) ? count(row?.lock) : 0), 0);
}

/**
 * La riga di un effetto appena lanciato: il nome, lo stato, il tipo, la
 * Durata e la soglia; se è Volgare blocca un punto di Paradosso.
 */
export function maintainedEffectRow({ name, vulgar = false, duration = 0, threshold = 0, maintained = false, status = "", effect = "", caster = "", spheres = [], scopes = {}, composition = "", scopesText = "", modifiers = "" } = {}) {
  return {
    nameSpheres: String(name ?? "").trim(),
    status,
    // L'Effetto (6/9): l'Obiettivo del lancio, quel che l'incantesimo fa.
    triggerEffect: String(effect ?? "").trim(),
    vulgar: Boolean(vulgar),
    duration: count(duration),
    threshold: count(threshold),
    maintained: Boolean(maintained),
    lock: vulgar ? 1 : 0,
    active: true,
    // Dal tiro (25/9 sera): chi l'ha lanciata, chi la mantiene, com'è composta,
    // gli Ambiti della soglia in parole, i bonus e i malus.
    fromRoll: true,
    caster: String(caster ?? "").trim(),
    maintainer: maintained ? String(caster ?? "").trim() : "",
    spheres: ids(spheres, SPHERES),
    scopes: Object.fromEntries(Object.entries(scopes ?? {}).map(([scope, level]) => [scope, count(level)]).filter(([scope, level]) => SCOPES.includes(scope) && level > 0)),
    composition: String(composition ?? "").trim(),
    scopesText: String(scopesText ?? "").trim(),
    modifiers: String(modifiers ?? "").trim()
  };
}

/** Gli Ambiti della soglia in parole: «Potenza 3, Portata 1», con la lettura scelta se c'è. */
export function scopesInParole(scopes = {}, localize = (key) => key, readings = {}) {
  return Object.entries(scopes ?? {})
    .filter(([scope, level]) => SCOPES.includes(scope) && count(level) > 0)
    .map(([scope, level]) => {
      const reading = String(readings?.[scope] ?? "").trim();
      return `${localize(`WOD5E_MAGE.Scopes.${scope}`)} ${count(level)}${reading ? ` (${reading})` : ""}`;
    })
    .join(", ");
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
    triggerEffect: "",
    caster: "",
    maintainer: "",
    composition: "",
    scopesText: "",
    modifiers: "",
    fromRoll: false,
    active: true
  };

  await actor.setFlag(MODULE_ID, "ongoingMagick", rows);
}

/** Il Paradosso permanente (25/9 sera): il lucchetto si accende e si spegne a mano, 1 punto bloccato. */
export async function onOngoingMagickLock(event, target) {
  event.preventDefault();

  const actor = this.actor;
  if (!canEditOngoingMagick(actor)) return;

  const rowId = target.dataset.row;
  const rows = actor.getFlag(MODULE_ID, "ongoingMagick") ?? {};
  if (!Object.hasOwn(rows, rowId)) return;

  await actor.update({
    [`flags.${MODULE_ID}.ongoingMagick.${rowId}.lock`]: count(rows[rowId]?.lock) > 0 ? 0 : 1
  });
}

/** On/Off (6/9): spento, l'effetto non è in piedi e non blocca Paradosso. */
export async function onOngoingMagickToggle(event, target) {
  event.preventDefault();

  const actor = this.actor;
  if (!canEditOngoingMagick(actor)) return;

  const rowId = target.dataset.row;
  const rows = actor.getFlag(MODULE_ID, "ongoingMagick") ?? {};
  if (!Object.hasOwn(rows, rowId)) return;

  await actor.update({
    [`flags.${MODULE_ID}.ongoingMagick.${rowId}.active`]: !isActive(rows[rowId])
  });
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
