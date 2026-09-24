/**
 * Il catalogo dei poteri in una finestra (24/9 sera, Blue: la tendina sotto
 * la Sfera «è orribile, bisogna cambiare drasticamente»). Dal tasto
 * «Aggiungi» della pagina Magick si apre una finestra come il Grimorio: la
 * cerca in testa, due gruppi (i poteri della Sfera, poi quelli di qualsiasi
 * Sfera), una riga per potere col pallino, il nome, la matrice, il tipo, il
 * costo e il limite d'uso; la riga si apre sul testo intero (attivo, passivo,
 * Amalgama, Paradosso, Flavor) e il tasto «Aggiungi» lo mette sul
 * personaggio senza chiudere la finestra. Chi lo conosce già ha la spunta;
 * chi chiede più pallini della Sfera ha il lucchetto. In fondo, «Scrivi a
 * mano». Qui la parte pura (le righe) e l'apertura della finestra.
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

/** La voce intera per la riga della finestra: le colonne della testa e il testo a blocchi. */
function rigaDelCatalogo(voce, entry, sphere, localize) {
  const uses = entry?.uses?.per ? localize(`WOD5E_MAGE.Poteri.Usi.${entry.uses.per}`) : "";
  const cost = count(entry?.costValue) ? `${count(entry.costValue)} ${localize("WOD5E_MAGE.Poteri.QuintessenzaBreve")}` : "";
  return {
    ...voce,
    typeLabel: voce.type ? localize(`WOD5E_MAGE.Poteri.Tipo.${voce.type}`) : "",
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
 * Le righe della finestra per una Sfera: `propri` (i poteri che la Sfera
 * apre da sola) e `qualsiasi` (quelli di ogni Sfera), in ordine alfabetico,
 * con `known` (già sul personaggio) e `locked` (chiede più pallini di
 * `rating`). `owned` sono le righe del personaggio per quella Sfera.
 */
export function prepareCatalogoPoteri(sphere, { catalog = POTERI, rating = 0, owned = [], localize = (key) => key } = {}) {
  const voci = catalogoDellaSfera(sphere, { catalog, rating, owned });
  const perId = new Map((catalog ?? []).map((entry) => [entry.id, entry]));
  const righe = voci.map((voce) => rigaDelCatalogo(voce, perId.get(voce.id), sphere, localize));
  const sphereLabel = localize(`WOD5E_MAGE.Spheres.${sphere}`);
  const propri = righe.filter((riga) => !riga.any);
  const qualsiasi = righe.filter((riga) => riga.any);
  return {
    sphere,
    sphereLabel,
    rating: Math.min(count(rating), POTERE_DOTS),
    propri,
    qualsiasi,
    // I due gruppi della finestra, nell'ordine: prima i poteri della Sfera, poi quelli di qualsiasi Sfera.
    gruppi: [
      { id: "propri", label: localize("WOD5E_MAGE.Poteri.CatalogoDiSfera").replace("{sphere}", sphereLabel), righe: propri },
      { id: "qualsiasi", label: localize("WOD5E_MAGE.Poteri.CatalogoQualsiasi"), righe: qualsiasi }
    ].filter((gruppo) => gruppo.righe.length || gruppo.id === "propri"),
    totale: righe.length,
    conosciuti: righe.filter((riga) => riga.known).length,
    chiusi: righe.filter((riga) => riga.locked).length
  };
}

/** Le Sfere che una voce apre, per la finestra: l'ordine del modulo. */
export function sfereDiVoce(entry) {
  return sfereDellaVoce(entry).filter((sphere) => SPHERES.includes(sphere));
}

/**
 * La finestra del catalogo per una Sfera. `onAdd(id)` aggiunge la voce al
 * personaggio (torna true se l'ha messa); `onMano()` apre una riga vuota
 * da scrivere a mano e chiude la finestra. La finestra resta aperta dopo
 * un'aggiunta: la riga prende la spunta e il conto si aggiorna.
 */
export async function openCatalogoPoteri({ sphere, rating = 0, owned = [], onAdd = null, onMano = null } = {}) {
  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const dati = prepareCatalogoPoteri(sphere, { rating, owned, localize });
  const content = await foundry.applications.handlebars.renderTemplate(
    `modules/${MODULE_ID}/templates/dialogs/catalogo-poteri.hbs`,
    { ...dati, icon: `modules/${MODULE_ID}/assets/icons/sheet/${sphere}.png` }
  );
  const buttons = [];
  if (onMano) buttons.push({ action: "mano", icon: "fa-solid fa-pen", label: localize("WOD5E_MAGE.Poteri.ScriviMano"), callback: () => onMano() });
  buttons.push({ action: "close", icon: "fas fa-times", label: localize("WOD5E.Close"), default: true });
  await foundry.applications.api.DialogV2.wait({
    window: { title: format("WOD5E_MAGE.Poteri.CatalogoTitolo", { sphere: dati.sphereLabel }) },
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-roll-dialog", "wod5e-mage-grimorio", "wod5e-mage-catalogo"],
    position: { width: 720 },
    content,
    buttons,
    rejectClose: false,
    render: (_event, dialog) => {
      const root = dialog.element;
      const conto = root.querySelector("[data-role=catalogoConto]");
      const ripaintaConto = () => {
        if (!conto) return;
        const conosciuti = root.querySelectorAll(".wod5e-mage-catalogo-row.known").length;
        conto.textContent = format("WOD5E_MAGE.Poteri.CatalogoConto", { total: dati.totale, known: conosciuti });
      };
      // La cerca: nome o matrice; i gruppi senza righe visibili si nascondono.
      const search = root.querySelector("[data-role=catalogoSearch]");
      const filtra = () => {
        const wanted = String(search?.value ?? "").trim().toLowerCase();
        root.querySelectorAll(".wod5e-mage-catalogo-row").forEach((row) => {
          row.hidden = Boolean(wanted) && !String(row.dataset.search ?? "").includes(wanted);
        });
        root.querySelectorAll("[data-catalogo-gruppo]").forEach((gruppo) => {
          gruppo.hidden = !gruppo.querySelector(".wod5e-mage-catalogo-row:not([hidden])");
        });
      };
      search?.addEventListener("input", filtra);
      search?.focus();
      // «Aggiungi»: la voce va sul personaggio, la riga prende la spunta, la finestra resta.
      root.addEventListener("click", async (event) => {
        const button = event.target.closest?.("[data-role=catalogoAggiungi]");
        if (!button) return;
        event.preventDefault();
        event.stopPropagation();
        if (button.disabled || !onAdd) return;
        button.disabled = true;
        const ok = await onAdd(button.dataset.catalogo);
        const row = button.closest(".wod5e-mage-catalogo-row");
        if (ok) {
          row?.classList.add("known");
          button.innerHTML = `<i class="fa-solid fa-check" aria-hidden="true"></i> ${localize("WOD5E_MAGE.Poteri.Conosciuto")}`;
          ripaintaConto();
        } else {
          button.disabled = false;
        }
      });
    }
  });
}
