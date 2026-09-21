/**
 * La pagina Magick (Blue, 21/9/2026, dal mock `docs/mock_pagina_magick_21-9.html`):
 * a sinistra le nove Sfere in una lista sola (il sigillo prende la Sfera, i
 * pallini, la casetta di famiglia, il conto dei poteri conosciuti), a destra
 * i poteri che il giocatore ha inserito, Sfera per Sfera, col testo che si
 * apre al clic e la tendina «Aggiungi» (dal catalogo, o a mano). Le
 * Specialità delle Sfere non esistono più.
 *
 * Qui il contesto della pagina e i clic. Le righe stanno nella bandiera
 * `poteri` del personaggio (poteri.js); i campi in modifica sono input col
 * nome della bandiera, e li salva il foglio da solo (come le Magick in atto).
 */
import { MODULE_ID } from "./constants.js";
import {
  catalogoDellaSfera,
  contoPoteri,
  nuovoPotere,
  POTERE_DOTS,
  POTERE_TIPI,
  POTERI,
  POTERI_FLAG,
  poteriDelPersonaggio,
  poteriOfSphere,
  potereLabel
} from "./poteri.js";
import { prepareSpheres, SPHERES } from "./spheres.js";

const SPHERE_ICON = (sphere) => `modules/${MODULE_ID}/assets/icons/sheet/${sphere}.png`;

/** I poteri in modifica: un insieme di id tenuto sulla scheda finché è aperta. */
function inModifica(sheet) {
  if (!(sheet._poteriInModifica instanceof Set)) sheet._poteriInModifica = new Set();
  return sheet._poteriInModifica;
}

/** Le tendine dei pallini (1-5) e dei tipi per gli input in modifica. */
function scelte(localize) {
  return {
    pallini: Array.from({ length: POTERE_DOTS }, (_, index) => ({ value: index + 1, label: String(index + 1) })),
    tipi: POTERE_TIPI.map((type) => ({ value: type, label: localize(`WOD5E_MAGE.Poteri.Tipo.${type}`) })),
    sfere: SPHERES.map((sphere) => ({ value: sphere, label: localize(`WOD5E_MAGE.Spheres.${sphere}`) }))
  };
}

/**
 * Il contesto della pagina: le Sfere conosciute e le altre, le sezioni dei
 * poteri (una per Sfera conosciuta), il totale.
 */
export function preparePoteriPagina(actor, sheet, { localize = (key) => key, locale = "it" } = {}) {
  const sphereData = prepareSpheres(actor, { localize, locale });
  const order = sphereData.all.map((sphere) => sphere.id);
  const poteri = poteriDelPersonaggio(actor, { order });
  const conti = contoPoteri(poteri);
  const selezione = Object.fromEntries(sphereData.all.map((sphere) => [sphere.id, sphere.selected]));
  const editing = inModifica(sheet);
  const options = scelte(localize);

  const righe = sphereData.all.map((sphere) => ({ ...sphere, conto: conti[sphere.id] ?? 0 }));
  const sezioni = sphereData.selected.map((sphere) => ({
    ...sphere,
    conto: conti[sphere.id] ?? 0,
    steps: Array.from({ length: POTERE_DOTS }, (_, index) => ({ lit: index + 1 <= sphere.value })),
    catalogo: catalogoDellaSfera(sphere.id, { catalog: POTERI, rating: sphere.value, owned: poteriOfSphere(poteri, sphere.id) })
      .map((entry) => ({ ...entry, lockedHint: entry.locked ? localize("WOD5E_MAGE.Poteri.Chiuso").replace("{dot}", String(entry.dot)) : "" })),
    poteri: poteriOfSphere(poteri, sphere.id).map((power) => ({
      ...power,
      label: potereLabel(power, localize),
      dotShown: power.dot ? String(power.dot) : "",
      typeLabel: power.type ? localize(`WOD5E_MAGE.Poteri.Tipo.${power.type}`) : "",
      amalgamIcon: power.amalgam ? SPHERE_ICON(power.amalgam) : "",
      amalgamLabel: power.amalgam ? localize(`WOD5E_MAGE.Spheres.${power.amalgam}`) : "",
      amalgamOwned: power.amalgam ? Boolean(selezione[power.amalgam]) : false,
      editing: editing.has(power.id),
      options
    }))
  }));

  return {
    sfereConosciute: righe.filter((sphere) => sphere.selected),
    sfereAltre: righe.filter((sphere) => !sphere.selected),
    poteriSezioni: sezioni,
    poteriTotale: poteri.length
  };
}

function canEdit(actor) {
  if (!actor.isOwner) {
    ui.notifications.warn(game.i18n.format("WOD5E.Notifications.NoSufficientPermission", { string: actor.name }));
    return false;
  }
  if (actor.system.locked) {
    ui.notifications.warn(game.i18n.format("WOD5E.Notifications.CannotModifyResourceString", { string: actor.name }));
    return false;
  }
  return true;
}

function idNuovo(rows) {
  let id = foundry.utils.randomID();
  while (rows[id]) id = foundry.utils.randomID();
  return id;
}

/** «Scrivi un potere a mano»: una riga vuota sulla Sfera, subito in modifica. */
export async function onPotereNuovo(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const sphere = String(target.dataset.sphere ?? "");
  if (!SPHERES.includes(sphere)) return;
  const rows = { ...(actor.getFlag(MODULE_ID, POTERI_FLAG) ?? {}) };
  const id = idNuovo(rows);
  inModifica(this).add(id);
  await actor.setFlag(MODULE_ID, POTERI_FLAG, { ...rows, [id]: nuovoPotere(sphere) });
}

/** Una voce del catalogo: entra com'è scritta, già chiusa. */
export async function onPotereDaCatalogo(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const entry = POTERI.find((power) => power.id === String(target.dataset.catalogo ?? ""));
  if (!entry) return;
  const rows = { ...(actor.getFlag(MODULE_ID, POTERI_FLAG) ?? {}) };
  if (Object.values(rows).some((row) => row?.catalogId === entry.id)) return;
  await actor.setFlag(MODULE_ID, POTERI_FLAG, { ...rows, [idNuovo(rows)]: nuovoPotere(entry.sphere, entry) });
}

/** Modifica / Fatto: la riga passa agli input e torna al testo. */
export async function onPotereModifica(event, target) {
  event.preventDefault();
  if (!this.actor.isOwner) return;
  const id = String(target.dataset.row ?? "");
  const editing = inModifica(this);
  if (editing.has(id)) editing.delete(id);
  else editing.add(id);
  await this.render({ parts: ["magick"] });
}

/** Togli: la riga sparisce dal personaggio. */
export async function onPotereTogli(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const id = String(target.dataset.row ?? "");
  const rows = actor.getFlag(MODULE_ID, POTERI_FLAG) ?? {};
  if (!Object.hasOwn(rows, id)) return;
  inModifica(this).delete(id);
  await actor.update({ [`flags.${MODULE_ID}.${POTERI_FLAG}.-=${id}`]: null });
}

/**
 * Il clic sul nome: il testo del potere (o di qualunque riga apribile: le
 * Sfere del Credo, i Vantaggi e l'inventario dei Tratti) si apre e si
 * chiude, senza ridisegnare. Nella scheda è anche `rigaApri`.
 */
export function onPotereApri(event, target) {
  event.preventDefault();
  const riga = target.closest(".wod5e-mage-potere-riga, .wod5e-mage-riga-apribile");
  if (!riga) return;
  const aperta = riga.classList.toggle("aperta");
  target.setAttribute("aria-expanded", String(aperta));
}
