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
  blocchiDelTesto,
  cartaPotere,
  contoPoteri,
  findPotere,
  idVarianteAttiva,
  nuovoPotere,
  POTERE_DOTS,
  POTERE_TIPI,
  POTERI,
  POTERI_FLAG,
  POTERI_USI_FLAG,
  poteriDelPersonaggio,
  poteriOfSphere,
  potereLabel,
  condizioniDelPotere,
  prerequisitiMancanti,
  puoUsare,
  registraUso,
  ruotaDopoUso,
  sceltaDelPotere,
  usiDelPotere,
  voceDelCatalogo
} from "./poteri.js";
import { chiusoAllaCreazione, openCatalogoCompleto, openCatalogoPoteri, tipiDelPotere } from "./catalogo-poteri.js";
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
function scelte(localize, aperte = []) {
  return {
    pallini: Array.from({ length: POTERE_DOTS }, (_, index) => ({ value: index + 1, label: String(index + 1) })),
    tipi: POTERE_TIPI.map((type) => ({ value: type, label: localize(`WOD5E_MAGE.Poteri.Tipo.${type}`) })),
    sfere: SPHERES.map((sphere) => ({ value: sphere, label: localize(`WOD5E_MAGE.Spheres.${sphere}`) })),
    // Le Sfere aperte (25/9 sera): dove un potere di qualsiasi Sfera si può segnare.
    sfereAperte: aperte.filter((sphere) => SPHERES.includes(sphere)).map((sphere) => ({ value: sphere, label: localize(`WOD5E_MAGE.Spheres.${sphere}`) }))
  };
}

/** Un potere di qualsiasi Sfera (25/9 sera): si segna in una Sfera aperta, e conta come suo potere conosciuto. */
export function universale(power) {
  const voce = voceDelCatalogo(power);
  return Array.isArray(voce?.spheres) && voce.spheres.includes("any");
}

/** Le Sfere fra cui spostare il segno di un potere di qualsiasi Sfera: quelle aperte, più quella di adesso. */
export function sfereDelSegno(power, aperte = [], localize = (key) => key) {
  const ids = [...new Set([...(aperte ?? []), power?.sphere].filter((sphere) => SPHERES.includes(sphere)))];
  return ids.map((sphere) => ({ value: sphere, label: localize(`WOD5E_MAGE.Spheres.${sphere}`), selected: sphere === power?.sphere }));
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
  const aperte = sphereData.all.filter((sphere) => sphere.selected).map((sphere) => sphere.id);
  const options = scelte(localize, aperte);
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

  // Il conto dei poteri per Sfera; i pallini della Sfera sono un promemoria, non una quota (25/9).
  const righe = sphereData.all.map((sphere) => ({ ...sphere, conto: conti[sphere.id] ?? 0 }));
  // La lista dei poteri (Blue, 24/9 sera: «una semplice lista», senza la
  // divisione per Sfere): in ordine di nome, ogni riga col sigillo della sua
  // Sfera e i tipi (attivo, passivo, tutti e due) come pastiglie.
  const lista = [...poteri].sort((a, b) => potereLabel(a, localize).localeCompare(potereLabel(b, localize), locale)).map((power) => {
    const tipi = tipiDelPotere(voceDelCatalogo(power)?.kind, power.type);
    // Il testo a blocchi (Blue, 25/9): Effetto attivo, Effetto passivo, Effetto
    // Amalgama, con le righe «Accesso con X» in evidenza; il riquadro «Con
    // Sfera» resta solo per il testo scritto a mano, senza il blocco Amalgama.
    const blocchi = blocchiDelTesto(power.text || voceDelCatalogo(power)?.text);
    return {
      ...power,
      blocchi,
      conAmalgama: Boolean(power.amalgam) && !blocchi.some((blocco) => blocco.kind === "amalgama"),
      label: potereLabel(power, localize),
      sphereIcon: SPHERE_ICON(power.sphere),
      sphereLabel: power.sphere ? localize(`WOD5E_MAGE.Spheres.${power.sphere}`) : "",
      dotShown: power.dot ? String(power.dot) : "",
      tipi,
      typeLabel: power.type ? localize(`WOD5E_MAGE.Poteri.Tipo.${power.type}`) : "",
      amalgamIcon: power.amalgam ? SPHERE_ICON(power.amalgam) : "",
      amalgamLabel: power.amalgam ? localize(`WOD5E_MAGE.Spheres.${power.amalgam}`) : "",
      amalgamOwned: power.amalgam ? Boolean(selezione[power.amalgam]) : false,
      usesLabel: power.uses?.per ? localize(`WOD5E_MAGE.Poteri.Usi.${power.uses.per}`) : "",
      usa: usaContesto(power, usi, quintessence, localize),
      sceltaCampo: sceltaCampo(power),
      // Di qualsiasi Sfera (25/9 sera): il tag sulla riga, e in modifica la tendina per spostare il segno.
      universale: universale(power),
      sfereSegno: universale(power) ? sfereDelSegno(power, aperte, localize) : [],
      editing: editing.has(power.id),
      options
    };
  });

  return {
    sfereConosciute: righe.filter((sphere) => sphere.selected),
    sfereAltre: righe.filter((sphere) => !sphere.selected),
    poteriLista: lista,
    poteriTotale: poteri.length
  };
}

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

/** Le Sfere conosciute per la finestra del catalogo: id e le righe che il personaggio ha in quella Sfera. */
export function sferePerCatalogo(actor) {
  const rows = poteriDelPersonaggio(actor);
  // `family` dice il prezzo dei poteri nella finestra: per 5 di famiglia, per 7 esterno (25/9 sera).
  return prepareSpheres(actor).selected.map((sphere) => ({ id: sphere.id, owned: poteriOfSphere(rows, sphere.id), family: Boolean(sphere.family) }));
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
export async function aggiungiDalCatalogo(actor, sphere, catalogId, { creazione = false } = {}) {
  const entry = POTERI.find((power) => power.id === String(catalogId ?? ""));
  if (!entry) return false;
  const rows = { ...(actor.getFlag(MODULE_ID, POTERI_FLAG) ?? {}) };
  if (Object.values(rows).some((row) => row?.catalogId === entry.id)) return false;
  const dove = SPHERES.includes(sphere) ? sphere : entry.sphere;
  // I prerequisiti (25/9): tanti poteri della Sfera, o poteri specifici; il grado non chiude niente.
  const owned = poteriOfSphere(Object.entries(rows).map(([id, row]) => ({ id, ...row })), dove);
  const mancano = prerequisitiMancanti(entry, { owned, tutti: Object.values(rows) });
  if (mancano) {
    ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.Poteri.PrerequisitiMancano"));
    return false;
  }
  // Alla creazione (25/9 sera): un potere di base o di qualsiasi Sfera, senza prerequisiti.
  const chiuso = creazione ? chiusoAllaCreazione(entry, condizioniDelPotere(entry, { owned, tutti: Object.values(rows) })) : "";
  if (chiuso) {
    ui.notifications.warn(game.i18n.localize(chiuso === "grado" ? "WOD5E_MAGE.Poteri.CreazioneGrado" : "WOD5E_MAGE.Poteri.CreazionePrerequisiti"));
    return false;
  }
  await actor.setFlag(MODULE_ID, POTERI_FLAG, { ...rows, [idNuovo(rows)]: nuovoPotere(dove, entry) });
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
  const spheres = sferePerCatalogo(actor);
  if (!spheres.length) {
    ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.Spheres.Empty"));
    return;
  }
  const sheet = this;
  await openCatalogoPoteri({
    spheres,
    sphere: String(target.dataset.sphere ?? ""),
    onAdd: (sphere, catalogId) => aggiungiDalCatalogo(actor, sphere, catalogId),
    onMano: (sphere) => onPotereNuovo.call(sheet, { preventDefault() {} }, { dataset: { sphere } })
  });
}

/** Il Catalogo completo (24/9 sera): tutti i poteri, Sfera per Sfera, da leggere. */
export async function onPotereCatalogoCompleto(event) {
  event.preventDefault();
  await openCatalogoCompleto({ owned: poteriDelPersonaggio(this.actor) });
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
  // La riga ricorda com'era attraverso i render (Blue, 25/9: i pallini della
  // Sfera chiudevano tutte le tendine): l'insieme sta sulla scheda.
  const aperte = poteriAperti(this);
  if (aperta) aperte.add(String(riga.dataset.row ?? ""));
  else aperte.delete(String(riga.dataset.row ?? ""));
}

/** Le righe dei poteri aperte, tenute sulla scheda finché è aperta. */
export function poteriAperti(sheet) {
  if (!(sheet._poteriAperti instanceof Set)) sheet._poteriAperti = new Set();
  return sheet._poteriAperti;
}

/** Dopo un render: le righe che erano aperte tornano aperte. */
export function riapriPoteri(sheet) {
  const aperte = poteriAperti(sheet);
  // Anche le carte delle Ancore (26/9): la freccia apre le note, e restano aperte attraverso i render.
  for (const riga of sheet.element?.querySelectorAll(".wod5e-mage-potere-riga[data-row], .wod5e-mage-riga-apribile[data-row]") ?? []) {
    if (!aperte.has(String(riga.dataset.row))) continue;
    riga.classList.add("aperta");
    riga.querySelector(".wod5e-mage-potere-nome, .wod5e-mage-ancora-apri")?.setAttribute("aria-expanded", "true");
  }
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

/**
 * I poteri nel riquadro dei Tratti della prima pagina (Blue, 25/9): due
 * schede, «Poteri attivi» e «Poteri passivi», con il testo dell'effetto sotto
 * il nome, per ricordare quali effetti passivi si hanno e quali attivi si
 * possono fare. Un potere con tutte e due le parti sta in tutte e due le
 * schede, ognuna col suo blocco; l'Amalgama va con i passivi (o con gli
 * attivi, se passivi non ce ne sono); il testo scritto a mano, senza titoli,
 * va intero nella scheda del suo tipo. Il clic sceglie il potere per il tiro
 * come la tendina del Tiro (`righe` sono le righe di `preparePoteriRows`:
 * per l'attivo, la riga «· attivo» se il potere ce l'ha).
 */
export function preparePoteriFiltri(actor, righe, { localize = (key) => key, locale = "it" } = {}) {
  const rows = [];
  for (const power of poteriDelPersonaggio(actor)) {
    const tipi = tipiDelPotere(voceDelCatalogo(power)?.kind, power.type);
    const blocchi = blocchiDelTesto(power.text || voceDelCatalogo(power)?.text);
    const senzaTitoli = !blocchi.some((blocco) => blocco.kind);
    const del = (kind) => (senzaTitoli ? blocchi : blocchi.filter((blocco) => blocco.kind === kind));
    const amalgama = blocchi.filter((blocco) => blocco.kind === "amalgama");
    const base = righe.find((riga) => riga.id === power.id) ?? null;
    const attiva = righe.find((riga) => riga.id === idVarianteAttiva(power.id)) ?? base;
    const comune = {
      id: power.id,
      name: potereLabel(power, localize),
      sphere: power.sphere,
      sphereLabel: power.sphere ? localize(`WOD5E_MAGE.Spheres.${power.sphere}`) : "",
      sphereIcon: SPHERE_ICON(power.sphere),
      cost: String(power.cost ?? ""),
      usesLabel: power.uses?.per ? localize(`WOD5E_MAGE.Poteri.Usi.${power.uses.per}`) : "",
      amalgamOwned: power.amalgam ? Boolean(prepareSpheres(actor).selected.some((sphere) => sphere.id === power.amalgam)) : true
    };
    const riga = (kind, scelta, blocchiRiga) => ({
      ...comune,
      kind,
      pick: scelta?.id ?? power.id,
      any: Boolean(scelta?.any),
      chosen: Boolean(scelta?.selected),
      nota: scelta?.nota ?? "",
      hint: [comune.sphereLabel, scelta?.hint ?? "", localize("WOD5E_MAGE.Tiro.PoteriHint")].filter(Boolean).join("\n"),
      blocchi: blocchiRiga,
      search: [comune.name, comune.sphereLabel, ...blocchiRiga.flatMap((blocco) => blocco.righe)].join(" ")
    });
    if (tipi.attivo) rows.push(riga("attivi", attiva, [...del("attivo"), ...(tipi.passivo ? [] : amalgama)]));
    if (tipi.passivo) rows.push(riga("passivi", base, [...del("passivo"), ...amalgama]));
  }
  return rows.sort((a, b) => a.name.localeCompare(b.name, locale) || a.kind.localeCompare(b.kind, locale));
}
