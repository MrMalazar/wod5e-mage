/**
 * Il catalogo dei poteri in una finestra (24/9 sera, Blue: la tendina sotto
 * la Sfera «è orribile, bisogna cambiare drasticamente»; poi: «solo quelli
 * che ho accesso con le Sfere attuali, per non creare sovraccarico visivo»,
 * e «i poteri selezionabili in una Sfera devono essere pari al numero dei
 * pallini»).
 *
 * Due finestre. Quella di «Aggiungi» (pagina Magick): in testa le pastiglie
 * delle Sfere conosciute (col conto «poteri / pallini»), la cerca e il conto;
 * sotto, solo i poteri che il personaggio può prendere adesso con quella
 * Sfera (il pallino richiesto non oltre i pallini della Sfera), in due
 * gruppi (della Sfera, di qualsiasi Sfera), una riga per potere che si apre
 * sul testo intero; «Aggiungi» lo mette sul personaggio senza chiudere la
 * finestra. Quando i poteri della Sfera sono quanti i pallini, i tasti si
 * spengono. Quella del «Catalogo completo»: tutti i 187, Sfera per Sfera, da
 * leggere e basta, con la cerca. Qui la parte pura (le righe) e le finestre.
 */
import { MODULE_ID } from "./constants.js";
import { blocchiDelTesto, catalogoDellaSfera, POTERE_DOTS, POTERI, sfereDellaVoce } from "./poteri.js";
import { SPHERES } from "./spheres.js";

function testo(value) {
  return String(value ?? "").trim();
}

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

/** I due tipi di un potere: attivo, passivo, o tutti e due (dal `kind` del catalogo, o dal tipo della riga). */
export function tipiDelPotere(kind, type = "") {
  const k = testo(kind) || testo(type);
  return {
    attivo: k === "attivo" || k === "attivo e passivo",
    passivo: k === "passivo" || k === "attivo e passivo"
  };
}

/** La voce intera per la riga della finestra: le colonne della testa e il testo a blocchi. */
function rigaDelCatalogo(voce, entry, localize) {
  const uses = entry?.uses?.per ? localize(`WOD5E_MAGE.Poteri.Usi.${entry.uses.per}`) : "";
  const cost = count(entry?.costValue) ? `${count(entry.costValue)} ${localize("WOD5E_MAGE.Poteri.QuintessenzaBreve")}` : "";
  const tipi = tipiDelPotere(entry?.kind, voce.type);
  return {
    ...voce,
    tipi,
    typeLabel: [tipi.attivo ? localize("WOD5E_MAGE.Poteri.Tipo.attivo") : "", tipi.passivo ? localize("WOD5E_MAGE.Poteri.Tipo.passivo") : ""].filter(Boolean).join(" · "),
    cost,
    uses,
    // Il potere di «Qualsiasi» Sfera sta nel secondo gruppo.
    any: Array.isArray(entry?.spheres) && entry.spheres.includes("any"),
    blocchi: blocchiDelTesto(entry?.text),
    paradox: testo(entry?.paradox),
    flavor: testo(entry?.flavor),
    search: `${voce.name} ${voce.formulaName}`.toLowerCase(),
    lockedHint: voce.locked ? localize("WOD5E_MAGE.Poteri.Chiuso").replace("{dot}", String(voce.dot)) : ""
  };
}

/**
 * Le righe della finestra «Aggiungi» per una Sfera: solo i poteri che si
 * possono prendere adesso (il pallino richiesto entro `rating`), in due
 * gruppi, `propri` (i poteri che la Sfera apre da sola) e `qualsiasi`, in
 * ordine alfabetico, con `known` (già sul personaggio). `owned` sono le
 * righe del personaggio per quella Sfera: se sono quante i pallini
 * (`pieno`), non se ne aggiungono altre. `chiusi` conta quelli che restano
 * fuori perché chiedono più pallini: si leggono nel Catalogo completo.
 */
export function prepareCatalogoPoteri(sphere, { catalog = POTERI, rating = 0, owned = [], localize = (key) => key } = {}) {
  const voci = catalogoDellaSfera(sphere, { catalog, rating, owned });
  const perId = new Map((catalog ?? []).map((entry) => [entry.id, entry]));
  const righe = voci.filter((voce) => !voce.locked).map((voce) => rigaDelCatalogo(voce, perId.get(voce.id), localize));
  const sphereLabel = localize(`WOD5E_MAGE.Spheres.${sphere}`);
  const propri = righe.filter((riga) => !riga.any);
  const qualsiasi = righe.filter((riga) => riga.any);
  const conosciuti = count((owned ?? []).length);
  const pallini = Math.min(count(rating), POTERE_DOTS);
  return {
    sphere,
    sphereLabel,
    rating: pallini,
    conosciuti,
    // Quanti se ne possono ancora prendere: i pallini della Sfera meno i poteri che ha.
    posti: Math.max(pallini - conosciuti, 0),
    pieno: conosciuti >= pallini,
    propri,
    qualsiasi,
    gruppi: [
      { id: "propri", label: localize("WOD5E_MAGE.Poteri.CatalogoDiSfera").replace("{sphere}", sphereLabel), righe: propri },
      { id: "qualsiasi", label: localize("WOD5E_MAGE.Poteri.CatalogoQualsiasi"), righe: qualsiasi }
    ].filter((gruppo) => gruppo.righe.length || gruppo.id === "propri"),
    totale: righe.length,
    chiusi: voci.filter((voce) => voce.locked).length
  };
}

/**
 * Il Catalogo completo: tutti i poteri, un gruppo per Sfera (nell'ordine del
 * modulo) e in coda quelli di qualsiasi Sfera, da leggere. `owned` sono
 * tutte le righe del personaggio (la spunta su quelli che ha).
 */
export function prepareCatalogoCompleto({ catalog = POTERI, owned = [], localize = (key) => key } = {}) {
  const have = new Set((owned ?? []).map((power) => power.catalogId).filter(Boolean));
  const riga = (entry) => rigaDelCatalogo({
    id: entry.id,
    name: testo(entry.name),
    dot: Math.min(count(entry.dot), POTERE_DOTS),
    type: testo(entry.type),
    amalgam: "",
    formulaName: testo(entry.formulaName),
    proposal: entry.link === "proposta",
    known: have.has(entry.id),
    locked: false
  }, entry, localize);
  const ordina = (righe) => righe.sort((a, b) => a.name.localeCompare(b.name, "it"));
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
    conosciuti: have.size
  };
}

/** Le pastiglie delle Sfere conosciute per la testa della finestra: il conto «poteri / pallini». */
export function pastiglieDelleSfere(spheres, { localize = (key) => key, attiva = "" } = {}) {
  return (spheres ?? []).map((sphere) => ({
    id: sphere.id,
    label: localize(`WOD5E_MAGE.Spheres.${sphere.id}`),
    icon: `modules/${MODULE_ID}/assets/icons/sheet/${sphere.id}.png`,
    conto: count(sphere.conto),
    rating: Math.min(count(sphere.rating), POTERE_DOTS),
    pieno: count(sphere.conto) >= Math.min(count(sphere.rating), POTERE_DOTS),
    attiva: sphere.id === attiva
  }));
}

const CLASSI = ["wod5e", "wod5e-mage", "mage", "wod5e-mage-roll-dialog", "wod5e-mage-grimorio", "wod5e-mage-catalogo"];

/**
 * La finestra «Aggiungi». `spheres` sono le Sfere conosciute: [{ id, rating,
 * owned }] (le righe del personaggio per Sfera); `sphere` quella aperta
 * all'inizio; `onAdd(sphere, id)` aggiunge la voce al personaggio (torna
 * true se l'ha messa); `onMano(sphere)` apre una riga vuota da scrivere a
 * mano e chiude la finestra. Le pastiglie in testa cambiano Sfera senza
 * chiudere; la finestra resta aperta dopo un'aggiunta.
 */
export async function openCatalogoPoteri({ spheres = [], sphere = "", onAdd = null, onMano = null } = {}) {
  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const stato = { sphere: spheres.some((entry) => entry.id === sphere) ? sphere : (spheres[0]?.id ?? ""), spheres: spheres.map((entry) => ({ ...entry, owned: [...(entry.owned ?? [])] })) };
  const corpo = async () => {
    const attuale = stato.spheres.find((entry) => entry.id === stato.sphere);
    const dati = attuale ? prepareCatalogoPoteri(attuale.id, { rating: attuale.rating, owned: attuale.owned, localize }) : null;
    return foundry.applications.handlebars.renderTemplate(`modules/${MODULE_ID}/templates/dialogs/catalogo-poteri.hbs`, {
      ...(dati ?? { gruppi: [], totale: 0, conosciuti: 0 }),
      pastiglie: pastiglieDelleSfere(stato.spheres.map((entry) => ({ id: entry.id, conto: entry.owned.length, rating: entry.rating })), { localize, attiva: stato.sphere }),
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
