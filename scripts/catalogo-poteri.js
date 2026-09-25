/**
 * Il catalogo dei poteri in una finestra (24/9 sera, Blue: la tendina sotto
 * la Sfera «è orribile, bisogna cambiare drasticamente»; 25/9: «i poteri sono
 * acquistabili a principio dalla gerarchia», niente quota sui pallini).
 *
 * Due finestre. Quella di «Aggiungi» (pagina Magick): in testa le pastiglie
 * delle Sfere conosciute (col conto dei poteri che si hanno), la cerca e il
 * conto; sotto, tutti i poteri che quella Sfera apre, in ordine di grado e
 * poi di nome, in due gruppi (della Sfera, di qualsiasi Sfera), una riga per
 * potere che si apre sul testo intero; una riga coi prerequisiti che mancano
 * (tanti poteri della Sfera, o poteri specifici) sta col lucchetto e dice
 * cosa serve; «Aggiungi» mette la voce sul personaggio senza chiudere la
 * finestra. Quella del «Catalogo completo»: tutti i 187, Sfera per Sfera, da
 * leggere e basta, con la cerca. Qui la parte pura (le righe) e le finestre.
 */
import { MODULE_ID } from "./constants.js";
import { EXPERIENCE_COSTS } from "./experience-window.js";
import { blocchiDelTesto, catalogoDellaSfera, condizioniDelPotere, gradoPerOrdine, POTERE_DOTS, POTERI, sfereDellaVoce } from "./poteri.js";
import { SPHERES } from "./spheres.js";

function testo(value) {
  return String(value ?? "").trim();
}

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

/**
 * Il grado dei poteri «di base» (Blue, 25/9 sera: «per ogni dominio al quale
 * ha accesso ha di default un potere di base correlato o universale»): alla
 * creazione si prende un potere di grado 1 della Sfera, o uno di qualsiasi
 * Sfera; niente prerequisiti («scelto a condizione quel potere non abbia
 * prerequisiti»).
 */
export const GRADO_BASE = 1;

/** Perché un potere non si prende alla creazione: il grado, o i prerequisiti; "" se si prende. */
export function chiusoAllaCreazione(entry, condizioni = []) {
  const any = Array.isArray(entry?.spheres) && entry.spheres.includes("any");
  if (!any && count(entry?.dot) !== GRADO_BASE) return "grado";
  if ((condizioni ?? []).length) return "prerequisiti";
  return "";
}

/** I due tipi di un potere: attivo, passivo, o tutti e due (dal `kind` del catalogo, o dal tipo della riga). */
export function tipiDelPotere(kind, type = "") {
  const k = testo(kind) || testo(type);
  return {
    attivo: k === "attivo" || k === "attivo e passivo",
    passivo: k === "passivo" || k === "attivo e passivo"
  };
}

/**
 * Il prezzo in Esperienza di un potere del catalogo: il grado per 5 in un
 * Dominio di famiglia, per 7 in uno esterno (il listino del 21/9); senza
 * grado non si sa. `family` è null quando la Sfera non è del personaggio
 * (il Catalogo completo): si scrivono tutti e due i prezzi.
 */
export function prezzoDelPotere(dot, family = null) {
  const grado = count(dot);
  if (!grado) return null;
  const famiglia = grado * EXPERIENCE_COSTS.potereFamiglia.multiplier;
  const esterno = grado * EXPERIENCE_COSTS.potereEsterno.multiplier;
  return { grado, famiglia, esterno, pe: family === null ? null : (family ? famiglia : esterno) };
}

/**
 * La voce intera per la riga della finestra: le colonne della testa e il
 * testo a blocchi. Dal 25/9 sera (Blue: «nell'elenco non è capibile») la
 * riga scrive per esteso il grado col suo prezzo in Esperienza, e i
 * prerequisiti anche quando ci sono già (la spunta), non solo quando
 * mancano (il lucchetto).
 */
function rigaDelCatalogo(voce, entry, localize, family = null, creazione = false, sphere = "") {
  const uses = entry?.uses?.per ? localize(`WOD5E_MAGE.Poteri.Usi.${entry.uses.per}`) : "";
  // Alla creazione (25/9 sera): solo i poteri di base o di qualsiasi Sfera, senza prerequisiti.
  const creazioneChiuso = creazione ? chiusoAllaCreazione(entry, voce.condizioni ?? []) : "";
  const locked = Boolean(voce.locked) || Boolean(creazioneChiuso);
  const cost = count(entry?.costValue) ? `${count(entry.costValue)} ${localize("WOD5E_MAGE.Poteri.QuintessenzaBreve")}` : "";
  const tipi = tipiDelPotere(entry?.kind, voce.type);
  const prezzo = prezzoDelPotere(voce.dot, family);
  // Le condizioni, una riga ciascuna (25/9 sera), con la spunta, il lucchetto o il punto del tavolo.
  const condizioni = (voce.condizioni ?? []).map((riga) => ({
    ...riga,
    testo: testoCondizione(riga, entry, localize, catalogoPerNome),
    stato: riga.ok === true ? "ok" : riga.ok === false ? "manca" : "tavolo",
    icona: riga.ok === true ? "fa-check" : riga.ok === false ? "fa-lock" : "fa-circle-dot"
  }));
  const serve = condizioni.map((riga) => riga.testo).join(" · ");
  return {
    ...voce,
    locked,
    creazioneChiuso,
    tipi,
    typeLabel: [tipi.attivo ? localize("WOD5E_MAGE.Poteri.Tipo.attivo") : "", tipi.passivo ? localize("WOD5E_MAGE.Poteri.Tipo.passivo") : ""].filter(Boolean).join(" · "),
    cost,
    uses,
    // Il grado scritto per esteso, e quanto costa in Esperienza in questo Dominio.
    gradoLabel: prezzo ? localize("WOD5E_MAGE.Poteri.GradoN").replace("{n}", String(prezzo.grado)) : localize("WOD5E_MAGE.Poteri.GradoNessuno"),
    prezzo,
    prezzoLabel: prezzo
      ? (prezzo.pe === null
        ? localize("WOD5E_MAGE.Poteri.PrezzoDue").replace("{famiglia}", String(prezzo.famiglia)).replace("{esterno}", String(prezzo.esterno))
        : localize("WOD5E_MAGE.Poteri.PrezzoPE").replace("{pe}", String(prezzo.pe)))
      : "",
    // I prerequisiti scritti nei dati: la riga li dice sempre, una condizione per riga; `locked` dice se ne manca una.
    condizioni,
    serve,
    serveOk: Boolean(serve) && !voce.locked,
    serveConto: condizioni.length ? `${condizioni.filter((riga) => riga.ok !== false).length}/${condizioni.length}` : "",
    // Il potere di «Qualsiasi» Sfera sta nel secondo gruppo.
    any: Array.isArray(entry?.spheres) && entry.spheres.includes("any"),
    // Conosciuto (25/9 sera): anche se preso in un'altra Sfera; il tasto dice dove sta segnato.
    knownAltrove: Boolean(voce.known) && Boolean(voce.knownSphere) && Boolean(sphere) && voce.knownSphere !== sphere,
    knownHint: voce.known
      ? (voce.knownSphere ? localize("WOD5E_MAGE.Poteri.ConosciutoIn").replace("{sphere}", localize(`WOD5E_MAGE.Spheres.${voce.knownSphere}`)) : localize("WOD5E_MAGE.Poteri.Conosciuto"))
      : "",
    blocchi: blocchiDelTesto(entry?.text),
    paradox: testo(entry?.paradox),
    flavor: testo(entry?.flavor),
    search: `${voce.name} ${voce.formulaName}`.toLowerCase(),
    lockedHint: creazioneChiuso
      ? localize(creazioneChiuso === "grado" ? "WOD5E_MAGE.Poteri.CreazioneGrado" : "WOD5E_MAGE.Poteri.CreazionePrerequisiti")
      : (voce.chiuso ? testoPrerequisiti(voce.chiuso, entry, localize, catalogoPerNome) : "")
  };
}

let catalogoPerNome = null;

/** Una condizione in parole: «2 poteri di Forze», «richiede Incassare», o il testo del tavolo. */
export function testoCondizione(riga, entry, localize = (key) => key, nomi = null) {
  if (riga?.kind === "numero") {
    const sphere = Array.isArray(entry?.spheres) && entry.spheres[0] && entry.spheres[0] !== "any" ? localize(`WOD5E_MAGE.Spheres.${entry.spheres[0]}`) : localize("WOD5E_MAGE.Poteri.CatalogoQualsiasi");
    return localize("WOD5E_MAGE.Poteri.Prerequisito.numero").replace("{n}", String(riga.n)).replace("{sphere}", sphere);
  }
  if (riga?.kind === "potere") return localize("WOD5E_MAGE.Poteri.Prerequisito.poteri").replace("{names}", nomi?.get?.(riga.id) ?? riga.id);
  return String(riga?.testo ?? "");
}

/** Cosa manca per prendere il potere, in parole, una condizione dopo l'altra. */
export function testoPrerequisiti(mancano, entry, localize = (key) => key, nomi = null) {
  return (Array.isArray(mancano) ? mancano : []).map((riga) => testoCondizione(riga, entry, localize, nomi)).join(" · ");
}

/**
 * Le righe della finestra «Aggiungi» per una Sfera: tutti i poteri che la
 * Sfera apre, in ordine di grado e poi di nome, in due gruppi, `propri` (i
 * poteri che la Sfera apre da sola) e `qualsiasi`, con `known` (già sul
 * personaggio) e `locked` (mancano i prerequisiti: la riga resta, col
 * lucchetto e cosa serve). `owned` sono le righe del personaggio per quella
 * Sfera, `tutti` tutte le sue righe. `chiusi` conta le righe col lucchetto.
 */
export function prepareCatalogoPoteri(sphere, { catalog = POTERI, owned = [], tutti = null, localize = (key) => key, family = false, creazione = false } = {}) {
  const voci = catalogoDellaSfera(sphere, { catalog, owned, tutti });
  const perId = new Map((catalog ?? []).map((entry) => [entry.id, entry]));
  catalogoPerNome = new Map((catalog ?? []).map((entry) => [entry.id, testo(entry.name)]));
  const righe = voci.map((voce) => rigaDelCatalogo(voce, perId.get(voce.id), localize, Boolean(family), Boolean(creazione), sphere));
  const sphereLabel = localize(`WOD5E_MAGE.Spheres.${sphere}`);
  const propri = righe.filter((riga) => !riga.any);
  const qualsiasi = righe.filter((riga) => riga.any);
  const perGrado = EXPERIENCE_COSTS[family ? "potereFamiglia" : "potereEsterno"].multiplier;
  return {
    sphere,
    sphereLabel,
    // Il Dominio è di famiglia o esterno: da qui il prezzo di ogni grado (25/9 sera).
    family: Boolean(family),
    creazione: Boolean(creazione),
    dominioLabel: localize(family ? "WOD5E_MAGE.Poteri.DominioFamiglia" : "WOD5E_MAGE.Poteri.DominioEsterno").replace("{n}", String(perGrado)),
    conPrerequisiti: righe.filter((riga) => riga.serve).length,
    conosciuti: count((owned ?? []).length),
    propri,
    qualsiasi,
    gruppi: [
      { id: "propri", label: localize("WOD5E_MAGE.Poteri.CatalogoDiSfera").replace("{sphere}", sphereLabel), righe: propri },
      // I poteri di qualsiasi Sfera si segnano nella Sfera in cui si prendono (25/9 sera): il gruppo lo dice.
      { id: "qualsiasi", label: localize("WOD5E_MAGE.Poteri.CatalogoQualsiasi"), nota: localize("WOD5E_MAGE.Poteri.QualsiasiSegnato").replace("{sphere}", sphereLabel), righe: qualsiasi }
    ].filter((gruppo) => gruppo.righe.length || gruppo.id === "propri"),
    totale: righe.length,
    chiusi: righe.filter((riga) => riga.locked).length
  };
}

/**
 * Il Catalogo completo: tutti i poteri, un gruppo per Sfera (nell'ordine del
 * modulo) e in coda quelli di qualsiasi Sfera, da leggere. `owned` sono
 * tutte le righe del personaggio (la spunta su quelli che ha).
 */
export function prepareCatalogoCompleto({ catalog = POTERI, owned = [], localize = (key) => key } = {}) {
  const dove = new Map();
  for (const power of owned ?? []) {
    if (power?.catalogId && !dove.has(power.catalogId)) dove.set(power.catalogId, String(power.sphere ?? ""));
  }
  const riga = (entry) => rigaDelCatalogo({
    id: entry.id,
    name: testo(entry.name),
    dot: Math.min(count(entry.dot), POTERE_DOTS),
    type: testo(entry.type),
    amalgam: "",
    formulaName: testo(entry.formulaName),
    proposal: entry.link === "proposta",
    known: dove.has(entry.id),
    knownSphere: dove.get(entry.id) ?? "",
    condizioni: condizioniDelPotere(entry, { owned: [], tutti: owned }),
    chiuso: null,
    locked: false
  }, entry, localize);
  // In ordine di grado e poi di nome: la gerarchia si legge (25/9).
  const ordina = (righe) => righe.sort((a, b) => gradoPerOrdine(a.dot) - gradoPerOrdine(b.dot) || a.name.localeCompare(b.name, "it"));
  const gruppi = SPHERES.map((sphere) => ({
    id: sphere,
    label: localize(`WOD5E_MAGE.Spheres.${sphere}`),
    righe: ordina((catalog ?? []).filter((entry) => Array.isArray(entry.spheres) && !entry.spheres.includes("any") && sfereDellaVoce(entry).includes(sphere)).map(riga))
  }));
  gruppi.push({ id: "qualsiasi", label: localize("WOD5E_MAGE.Poteri.CatalogoQualsiasi"), righe: ordina((catalog ?? []).filter((entry) => Array.isArray(entry.spheres) && entry.spheres.includes("any")).map(riga)) });
  return {
    tutto: true,
    gruppi: gruppi.filter((gruppo) => gruppo.righe.length),
    totale: (catalog ?? []).length,
    conosciuti: dove.size
  };
}

/** Le pastiglie delle Sfere conosciute per la testa della finestra: il conto dei poteri che si hanno. */
export function pastiglieDelleSfere(spheres, { localize = (key) => key, attiva = "" } = {}) {
  return (spheres ?? []).map((sphere) => ({
    id: sphere.id,
    label: localize(`WOD5E_MAGE.Spheres.${sphere.id}`),
    icon: `modules/${MODULE_ID}/assets/icons/sheet/${sphere.id}.png`,
    conto: count(sphere.conto),
    attiva: sphere.id === attiva
  }));
}

const CLASSI = ["wod5e", "wod5e-mage", "mage", "wod5e-mage-roll-dialog", "wod5e-mage-grimorio", "wod5e-mage-catalogo"];

/**
 * La finestra «Aggiungi». `spheres` sono le Sfere conosciute: [{ id, owned }]
 * (le righe del personaggio per Sfera); `sphere` quella aperta all'inizio;
 * `onAdd(sphere, id)` aggiunge la voce al personaggio (torna true se l'ha
 * messa); `onMano(sphere)` apre una riga vuota da scrivere a mano e chiude
 * la finestra. Le pastiglie in testa cambiano Sfera senza chiudere; la
 * finestra resta aperta dopo un'aggiunta.
 */
export async function openCatalogoPoteri({ spheres = [], sphere = "", onAdd = null, onMano = null, creazione = false } = {}) {
  const localize = game.i18n.localize.bind(game.i18n);
  const stato = { sphere: spheres.some((entry) => entry.id === sphere) ? sphere : (spheres[0]?.id ?? ""), spheres: spheres.map((entry) => ({ ...entry, owned: [...(entry.owned ?? [])] })) };
  const corpo = async () => {
    const attuale = stato.spheres.find((entry) => entry.id === stato.sphere);
    const tutti = stato.spheres.flatMap((entry) => entry.owned);
    const dati = attuale ? prepareCatalogoPoteri(attuale.id, { owned: attuale.owned, tutti, localize, family: Boolean(attuale.family), creazione: Boolean(creazione) }) : null;
    return foundry.applications.handlebars.renderTemplate(`modules/${MODULE_ID}/templates/dialogs/catalogo-poteri.hbs`, {
      ...(dati ?? { gruppi: [], totale: 0, conosciuti: 0 }),
      pastiglie: pastiglieDelleSfere(stato.spheres.map((entry) => ({ id: entry.id, conto: entry.owned.length })), { localize, attiva: stato.sphere }),
      icon: attuale ? `modules/${MODULE_ID}/assets/icons/sheet/${attuale.id}.png` : ""
    });
  };
  const buttons = [];
  if (onMano) buttons.push({ action: "mano", icon: "fa-solid fa-pen", label: localize("WOD5E_MAGE.Poteri.ScriviMano"), callback: () => onMano(stato.sphere) });
  buttons.push({ action: "close", icon: "fas fa-times", label: localize("WOD5E.Close"), default: true });
  await foundry.applications.api.DialogV2.wait({
    window: { title: localize("WOD5E_MAGE.Poteri.CatalogoTitolo") },
    classes: CLASSI,
    position: { width: 720 },
    content: `<div data-role="catalogoCorpo">${await corpo()}</div>`,
    buttons,
    rejectClose: false,
    render: (_event, dialog) => {
      const root = dialog.element;
      const contenitore = () => root.querySelector("[data-role=catalogoCorpo]");
      const ridisegna = async () => {
        const box = contenitore();
        if (box) box.innerHTML = await corpo();
        box?.querySelector("[data-role=catalogoSearch]")?.focus();
      };
      // La cerca: nome o matrice; i gruppi senza righe visibili si nascondono.
      root.addEventListener("input", (event) => {
        const search = event.target.closest?.("[data-role=catalogoSearch]");
        if (!search) return;
        const wanted = String(search.value ?? "").trim().toLowerCase();
        root.querySelectorAll(".wod5e-mage-catalogo-row").forEach((row) => {
          row.hidden = Boolean(wanted) && !String(row.dataset.search ?? "").includes(wanted);
        });
        root.querySelectorAll("[data-catalogo-gruppo]").forEach((gruppo) => {
          gruppo.hidden = !gruppo.querySelector(".wod5e-mage-catalogo-row:not([hidden])");
        });
      });
      root.addEventListener("click", async (event) => {
        // La pastiglia di un'altra Sfera: la finestra cambia lista.
        const pastiglia = event.target.closest?.("[data-role=catalogoSfera]");
        if (pastiglia) {
          event.preventDefault();
          if (pastiglia.dataset.sphere && pastiglia.dataset.sphere !== stato.sphere) {
            stato.sphere = pastiglia.dataset.sphere;
            await ridisegna();
          }
          return;
        }
        // «Aggiungi»: la voce va sul personaggio, la riga prende la spunta, la finestra resta.
        const button = event.target.closest?.("[data-role=catalogoAggiungi]");
        if (!button) return;
        event.preventDefault();
        event.stopPropagation();
        if (button.disabled || !onAdd) return;
        button.disabled = true;
        const ok = await onAdd(stato.sphere, button.dataset.catalogo);
        if (!ok) {
          button.disabled = false;
          return;
        }
        const attuale = stato.spheres.find((entry) => entry.id === stato.sphere);
        attuale?.owned.push({ catalogId: button.dataset.catalogo });
        await ridisegna();
      });
      contenitore()?.querySelector("[data-role=catalogoSearch]")?.focus();
    }
  });
}

/** Il Catalogo completo: tutti i poteri, Sfera per Sfera, da leggere. `owned` sono le righe del personaggio. */
export async function openCatalogoCompleto({ owned = [] } = {}) {
  const localize = game.i18n.localize.bind(game.i18n);
  const content = await foundry.applications.handlebars.renderTemplate(
    `modules/${MODULE_ID}/templates/dialogs/catalogo-poteri.hbs`,
    prepareCatalogoCompleto({ owned, localize })
  );
  await foundry.applications.api.DialogV2.wait({
    window: { title: localize("WOD5E_MAGE.Poteri.CatalogoCompletoTitolo") },
    classes: [...CLASSI, "wod5e-mage-catalogo-completo"],
    position: { width: 720 },
    content,
    buttons: [{ action: "close", icon: "fas fa-times", label: localize("WOD5E.Close"), default: true }],
    rejectClose: false,
    render: (_event, dialog) => {
      const root = dialog.element;
      const search = root.querySelector("[data-role=catalogoSearch]");
      search?.addEventListener("input", () => {
        const wanted = String(search.value ?? "").trim().toLowerCase();
        root.querySelectorAll(".wod5e-mage-catalogo-row").forEach((row) => {
          row.hidden = Boolean(wanted) && !String(row.dataset.search ?? "").includes(wanted);
        });
        root.querySelectorAll("[data-catalogo-gruppo]").forEach((gruppo) => {
          gruppo.hidden = !gruppo.querySelector(".wod5e-mage-catalogo-row:not([hidden])");
        });
      });
      search?.focus();
    }
  });
}
