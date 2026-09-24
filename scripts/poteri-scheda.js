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
  ambitiDellaScelta,
  cartaPotere,
  contoPoteri,
  findPotere,
  nuovoPotere,
  POTERE_DOTS,
  POTERE_TIPI,
  POTERI,
  POTERI_FLAG,
  POTERI_USI_FLAG,
  poteriDelPersonaggio,
  poteriOfSphere,
  potereLabel,
  puoUsare,
  registraUso,
  ruotaDopoUso,
  sceltaDelPotere,
  usiDelPotere
} from "./poteri.js";
import { openCatalogoPoteri } from "./catalogo-poteri.js";
import { getMagickBalance } from "./magick-balance.js";
import { prepareIncantesimi } from "./incantesimi.js";
import { prepareMageRollTraits } from "./mage-roll-selection.js";
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
  // Il tasto «Usa» (24/9): gli usi del periodo e la Quintessenza sulla Ruota.
  const usi = actor.getFlag?.(MODULE_ID, POTERI_USI_FLAG) ?? {};
  const quintessence = getMagickBalance(actor).quintessence;
  // Le scelte all'acquisto (tappa 3): le Abilità e gli incantesimi del personaggio, letti una volta.
  const letti = { skills: null, spells: null };
  const sceltaCampo = (power) => {
    const scelta = sceltaDelPotere(power);
    if (!scelta) return null;
    let options = [];
    if (scelta.kind === "ambito") options = ambitiDellaScelta(power).map((scope) => ({ value: scope, label: localize(`WOD5E_MAGE.Scopes.${scope}`) }));
    else if (scelta.kind === "abilita") {
      letti.skills ??= prepareMageRollTraits(actor, { localize, lang: locale }).skills;
      options = letti.skills.map((trait) => ({ value: trait.key, label: trait.label }));
    } else {
      letti.spells ??= prepareIncantesimi(actor, localize);
      options = letti.spells.map((spell) => ({ value: spell.id, label: spell.name || localize("WOD5E_MAGE.Poteri.SenzaNome") }));
    }
    return {
      kind: scelta.kind,
      label: localize(`WOD5E_MAGE.Poteri.Scelta.${scelta.kind}`),
      options: options.map((option) => ({ ...option, selected: option.value === power.scelta }))
    };
  };

  const righe = sphereData.all.map((sphere) => ({ ...sphere, conto: conti[sphere.id] ?? 0 }));
  const sezioni = sphereData.selected.map((sphere) => ({
    ...sphere,
    conto: conti[sphere.id] ?? 0,
    steps: Array.from({ length: POTERE_DOTS }, (_, index) => ({ lit: index + 1 <= sphere.value })),
    poteri: poteriOfSphere(poteri, sphere.id).map((power) => ({
      ...power,
      label: potereLabel(power, localize),
      dotShown: power.dot ? String(power.dot) : "",
      typeLabel: power.type ? localize(`WOD5E_MAGE.Poteri.Tipo.${power.type}`) : "",
      amalgamIcon: power.amalgam ? SPHERE_ICON(power.amalgam) : "",
      amalgamLabel: power.amalgam ? localize(`WOD5E_MAGE.Spheres.${power.amalgam}`) : "",
      amalgamOwned: power.amalgam ? Boolean(selezione[power.amalgam]) : false,
      usesLabel: power.uses?.per ? localize(`WOD5E_MAGE.Poteri.Usi.${power.uses.per}`) : "",
      usa: usaContesto(power, usi, quintessence, localize),
      sceltaCampo: sceltaCampo(power),
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

/** Il tasto «Usa» della riga: se si può, quanti usi restano, cosa costa, perché no. */
export function usaContesto(power, usi = {}, quintessence = 0, localize = (key) => key) {
  const verdetto = puoUsare(power, { usi, quintessence });
  const conto = verdetto.usi;
  const costo = Math.max(Math.trunc(Number(power?.costValue) || 0), 0);
  const parti = [];
  if (conto) parti.push(`${conto.restanti}/${conto.max} ${localize(`WOD5E_MAGE.Poteri.Usi.${conto.per}`)}`);
  if (costo) parti.push(`${costo} ${localize("WOD5E_MAGE.Poteri.QuintessenzaBreve")}`);
  return {
    ok: verdetto.ok,
    motivo: verdetto.motivo,
    conto,
    costo,
    label: parti.join(" · "),
    hint: verdetto.ok
      ? localize("WOD5E_MAGE.Poteri.UsaHint")
      : localize(verdetto.motivo === "usi" ? "WOD5E_MAGE.Poteri.UsiFiniti" : "WOD5E_MAGE.Poteri.QuintessenzaManca")
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

/**
 * Una voce del catalogo entra sul personaggio com'è scritta, già chiusa, sulla
 * Sfera da cui si è scelta (il catalogo ne apre più d'una). Torna true se
 * l'ha messa; false se non c'è, o se il personaggio la conosce già.
 */
export async function aggiungiDalCatalogo(actor, sphere, catalogId) {
  const entry = POTERI.find((power) => power.id === String(catalogId ?? ""));
  if (!entry) return false;
  const rows = { ...(actor.getFlag(MODULE_ID, POTERI_FLAG) ?? {}) };
  if (Object.values(rows).some((row) => row?.catalogId === entry.id)) return false;
  await actor.setFlag(MODULE_ID, POTERI_FLAG, { ...rows, [idNuovo(rows)]: nuovoPotere(SPHERES.includes(sphere) ? sphere : entry.sphere, entry) });
  return true;
}

/** Una voce del catalogo da un tasto con `data-catalogo` e `data-sphere`. */
export async function onPotereDaCatalogo(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  await aggiungiDalCatalogo(actor, String(target.dataset.sphere ?? ""), String(target.dataset.catalogo ?? ""));
}

/**
 * «Aggiungi» (24/9 sera): la finestra del catalogo della Sfera, con la cerca,
 * i due gruppi e il testo di ogni potere; «Aggiungi» sulla riga lo mette sul
 * personaggio senza chiudere la finestra; «Scrivi a mano» apre una riga vuota.
 */
export async function onPotereCatalogo(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const sphere = String(target.dataset.sphere ?? "");
  if (!SPHERES.includes(sphere)) return;
  const sphereData = prepareSpheres(actor).all.find((entry) => entry.id === sphere);
  const sheet = this;
  await openCatalogoPoteri({
    sphere,
    rating: sphereData?.value ?? 0,
    owned: poteriOfSphere(poteriDelPersonaggio(actor), sphere),
    onAdd: (catalogId) => aggiungiDalCatalogo(actor, sphere, catalogId),
    onMano: () => onPotereNuovo.call(sheet, { preventDefault() {} }, { dataset: { sphere } })
  });
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

/**
 * «Usa» (tappa 2, 24/9): il potere si usa senza tirare. Si controlla il
 * limite d'uso e la Quintessenza, si scala il costo dalla Ruota, si conta
 * l'uso e la carta va in chat; quello che dice lo applica il Narratore.
 */
export async function onPotereUsa(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!actor.isOwner) {
    ui.notifications.warn(game.i18n.format("WOD5E.Notifications.NoSufficientPermission", { string: actor.name }));
    return;
  }
  const localize = game.i18n.localize.bind(game.i18n);
  const power = findPotere(String(target.dataset.row ?? ""), poteriDelPersonaggio(actor));
  if (!power) return;
  const usi = actor.getFlag(MODULE_ID, POTERI_USI_FLAG) ?? {};
  const balance = getMagickBalance(actor);
  const verdetto = puoUsare(power, { usi, quintessence: balance.quintessence });
  if (!verdetto.ok) {
    ui.notifications.warn(localize(verdetto.motivo === "usi" ? "WOD5E_MAGE.Poteri.UsiFiniti" : "WOD5E_MAGE.Poteri.QuintessenzaManca"));
    return;
  }
  const dopo = registraUso(usi, power);
  const update = { [`flags.${MODULE_ID}.${POTERI_USI_FLAG}`]: dopo };
  if (power.costValue > 0) update[`flags.${MODULE_ID}.magickBalance`] = ruotaDopoUso(balance, power);
  await actor.update(update);
  const carta = cartaPotere(power, {
    sphereLabel: power.sphere ? localize(`WOD5E_MAGE.Spheres.${power.sphere}`) : "",
    usi: usiDelPotere(power, dopo),
    spent: power.costValue,
    localize
  });
  const content = await foundry.applications.handlebars.renderTemplate(`modules/${MODULE_ID}/templates/chat/potere.hbs`, { carta });
  return ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), content });
}
