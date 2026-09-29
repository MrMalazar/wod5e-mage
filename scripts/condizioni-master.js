import { MODULE_ID } from "./constants.js";
import { CONDIZIONI } from "./data/condizioni.js";
import { activeCondizioni, condizioneDice, findCondizione, nomeColGrado, prepareCondizioni, toggleCondizione } from "./condizioni.js";

/**
 * La finestra del Master (richiesta di Blue, 4/9 notte; la regola di base
 * del 29/9): coi personaggi selezionati sulla scena, un clic su una
 * Condizione la accende a tutti (o la spegne, se l'hanno già tutti); su una
 * scala prende il posto dell'altro grado. Le Condizioni stanno per famiglia
 * e per scala, col grado in numeri romani e il peso; la scala, com'è e
 * cosa fa al passaggio del mouse. Si apre dalla macro «Condizioni
 * (Master)» del compendio o da
 * game.modules.get("wod5e-mage").api.condizioni.assign().
 */

/** I personaggi selezionati sulla scena, senza doppioni. */
export function selectedActors(tokens) {
  const seen = new Set();
  const actors = [];
  for (const token of tokens ?? []) {
    const actor = token?.actor;
    if (!actor) continue;
    const key = actor.uuid ?? actor.id ?? actor;
    if (seen.has(key)) continue;
    seen.add(key);
    actors.push(actor);
  }
  return actors;
}

/** Per ogni Condizione: quanti dei personaggi scelti la portano. */
export function prepareMasterCondizioni(actors) {
  const counts = new Map();
  for (const actor of actors ?? []) {
    for (const id of activeCondizioni(actor.items).keys()) counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  const total = (actors ?? []).length;
  return prepareCondizioni([]).map((sezione) => ({
    ...sezione,
    scale: sezione.scale.map((scala) => ({
      ...scala,
      voci: scala.voci.map((entry) => {
        const count = counts.get(entry.id) ?? 0;
        const definition = findCondizione(entry.id);
        return {
          ...entry,
          what: definition?.what ?? "",
          count,
          badge: count > 0 && total > 1 ? String(count) : "",
          all: total > 0 && count === total,
          some: count > 0 && count < total
        };
      })
    }))
  }));
}

/** Tutte le voci della finestra in fila, per chi le cerca per id. */
function vociDelMaster(actors) {
  return prepareMasterCondizioni(actors).flatMap((sezione) => sezione.scale.flatMap((scala) => scala.voci));
}

/**
 * Il clic del Master: se tutti i personaggi la portano, la spegne a tutti;
 * altrimenti la accende a chi non ce l'ha. Torna quanti la portano dopo.
 */
export async function assignCondizione(actors, entry) {
  const carriers = actors.filter((actor) => activeCondizioni(actor.items).has(entry.id));
  const everyone = carriers.length === actors.length;
  for (const actor of actors) {
    const has = activeCondizioni(actor.items).has(entry.id);
    if (everyone && has) await toggleCondizione(actor, entry);
    else if (!everyone && !has) await toggleCondizione(actor, entry);
  }
  return everyone ? 0 : actors.length;
}

function targetNames(actors) {
  return actors.map((actor) => actor.name).join(", ");
}

async function renderContent(actors) {
  return foundry.applications.handlebars.renderTemplate(
    `modules/${MODULE_ID}/templates/dialogs/condizioni-master.hbs`,
    { groups: prepareMasterCondizioni(actors), targets: targetNames(actors), count: actors.length }
  );
}

/** Apre la finestra. I personaggi si rileggono a ogni clic: cambiare selezione basta. */
export async function openCondizioniMaster() {
  if (!game.user.isGM) {
    ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.Condizioni.MasterOnly"));
    return null;
  }
  const actors = selectedActors(canvas?.tokens?.controlled);
  if (!actors.length) ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.Condizioni.MasterNoTargets"));

  const content = await renderContent(actors);
  return foundry.applications.api.DialogV2.wait({
    window: { title: game.i18n.localize("WOD5E_MAGE.Condizioni.MasterTitle") },
    classes: ["wod5e-mage", "wod5e-mage-condizioni-master"],
    position: { width: 720 },
    content,
    buttons: [{ action: "close", label: "WOD5E_MAGE.Condizioni.MasterClose", default: true }],
    rejectClose: false,
    render: (event, dialog) => bindMaster(dialog.element ?? dialog)
  });
}

function bindMaster(root) {
  const element = root?.querySelector ? root : root?.element;
  if (!element) return;
  element.addEventListener("click", async (event) => {
    const button = event.target.closest?.("[data-condizione]");
    if (!button) return;
    event.preventDefault();
    const entry = findCondizione(button.dataset.condizione);
    const actors = selectedActors(canvas?.tokens?.controlled);
    if (!entry) return;
    if (!actors.length) {
      ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.Condizioni.MasterNoTargets"));
      return;
    }
    const carriers = await assignCondizione(actors, entry);
    refreshMaster(element, actors);
    const dice = condizioneDice(entry);
    ui.notifications.info(game.i18n.format(carriers ? "WOD5E_MAGE.Condizioni.MasterOn" : "WOD5E_MAGE.Condizioni.MasterOff", {
      name: `${nomeColGrado(entry)}${dice ? ` (${dice})` : ""}`,
      targets: targetNames(actors)
    }));
  });
}

/** Rilegge chi porta cosa e ridipinge i simboli, senza riaprire la finestra. */
function refreshMaster(element, actors) {
  const targets = element.querySelector("[data-role=targets]");
  if (targets) targets.textContent = targetNames(actors);
  for (const entry of vociDelMaster(actors)) {
    const button = element.querySelector(`[data-condizione="${entry.id}"]`);
    if (!button) continue;
    button.classList.toggle("lit", entry.all);
    button.classList.toggle("partial", entry.some);
    const badge = button.querySelector("[data-role=count]");
    if (badge) badge.textContent = entry.badge;
  }
}

/** Le Condizioni di lista, per chi vuole costruire qualcosa sopra: famiglia, scala, grado, peso, tipi di tiro. */
export function listCondizioni() {
  return CONDIZIONI.map((entry) => ({
    id: entry.id,
    name: entry.name,
    family: entry.family,
    scale: entry.scale,
    grade: entry.grade,
    weight: entry.weight,
    tipi: [...entry.tipi],
    dice: condizioneDice(entry)
  }));
}
