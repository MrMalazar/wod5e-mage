/**
 * La modifica dei poteri in Foundry (Blue, 27/9): il Narratore cambia il
 * testo di base di un potere del catalogo (Prerequisiti, Effetto attivo,
 * Effetto passivo) e vale per tutti, sul catalogo e su ogni scheda; sta
 * nell'impostazione del mondo `poteriModificati`, per id di potere. Il
 * giocatore cambia il testo solo sulla sua scheda: quello sta nella riga
 * del potere (`attivo`, `passivo`, `prerequisitiTesto`) e lo fa la scheda.
 * Le funzioni pure (il magazzino) stanno in testa; la finestra in coda.
 */
import { MODULE_ID } from "./constants.js";
import { nuovoPotere, quattroParti } from "./poteri.js";

export const POTERI_MOD_SETTING = "poteriModificati";
export const PARTI_MODIFICABILI = Object.freeze(["prerequisiti", "attivo", "passivo"]);

function testo(value) {
  return String(value ?? "").trim();
}

/** Le tre parti ripulite; null se sono tutte vuote (niente da salvare). */
export function pulisciMod(campi = {}) {
  const mod = {};
  for (const parte of PARTI_MODIFICABILI) if (testo(campi?.[parte])) mod[parte] = testo(campi[parte]);
  return Object.keys(mod).length ? mod : null;
}

/** Il magazzino con la modifica di un potere scritta (o tolta, con campi vuoti o null). */
export function conMod(store = {}, id, campi) {
  const next = { ...(store && typeof store === "object" ? store : {}) };
  const key = testo(id);
  if (!key) return next;
  const mod = pulisciMod(campi ?? {});
  if (mod) next[key] = { ...mod, quando: Date.now() };
  else delete next[key];
  return next;
}

/** La modifica di un potere nel magazzino dato (o in quello del mondo). */
export function modDelMondo(id, store = null) {
  const tutti = store ?? globalThis.game?.settings?.get?.(MODULE_ID, POTERI_MOD_SETTING) ?? {};
  const mod = tutti?.[testo(id)];
  return mod && typeof mod === "object" ? mod : null;
}

/** Scrive (o toglie) la modifica di base di un potere: solo il Narratore. Torna true se l'ha scritta. */
export async function scriviModDelMondo(id, campi) {
  if (!game.user?.isGM) return false;
  const store = game.settings.get(MODULE_ID, POTERI_MOD_SETTING) ?? {};
  await game.settings.set(MODULE_ID, POTERI_MOD_SETTING, conMod(store, id, campi));
  return true;
}

/** Il magazzino senza il potere: nessuna modifica scritta (pure). */
export function senzaMod(store = {}, id) {
  return conMod(store, id, null);
}

/**
 * La finestra della modifica: il grado (che non si tocca), le tre parti da
 * scrivere già piene del testo che vale adesso, e dove vale (per tutti, o su
 * questa scheda). `onSalva(campi)` riceve le tre parti; `onBase()` riporta
 * al testo di base. Le parti uguali alla base non si salvano.
 */
export async function apriModificaPotere({ name = "", grado = 0, parti = {}, base = {}, mondo = false, onSalva = null, onBase = null } = {}) {
  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const content = await foundry.applications.handlebars.renderTemplate(`modules/${MODULE_ID}/templates/dialogs/potere-modifica.hbs`, {
    name,
    gradoLabel: grado ? localize("WOD5E_MAGE.Poteri.GradoN").replace("{n}", String(grado)) : localize("WOD5E_MAGE.Poteri.GradoNessuno"),
    mondo,
    dove: localize(mondo ? "WOD5E_MAGE.Poteri.ModificaMondo" : "WOD5E_MAGE.Poteri.ModificaScheda"),
    parti: { prerequisiti: testo(parti.prerequisiti), attivo: testo(parti.attivo), passivo: testo(parti.passivo) },
    base: { prerequisiti: testo(base.prerequisiti), attivo: testo(base.attivo), passivo: testo(base.passivo) }
  });
  let scelta = null;
  const leggi = (dialog) => {
    const campi = {};
    for (const parte of PARTI_MODIFICABILI) {
      const valore = testo(dialog.element.querySelector(`[name=${parte}]`)?.value);
      // Uguale alla base: niente da salvare per questa parte.
      campi[parte] = valore === testo(base[parte]) ? "" : valore;
    }
    return campi;
  };
  const answer = await foundry.applications.api.DialogV2.wait({
    window: { title: format("WOD5E_MAGE.Poteri.ModificaTitolo", { name }), icon: "fa-solid fa-pen" },
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-roll-dialog", "wod5e-mage-potere-modifica-finestra"],
    position: { width: 560, height: "auto" },
    content,
    buttons: [
      { action: "salva", icon: "fa-solid fa-check", label: localize("WOD5E_MAGE.Poteri.Salva"), default: true, callback: (_event, _button, dialog) => { scelta = leggi(dialog); return "salva"; } },
      { action: "base", icon: "fa-solid fa-rotate-left", label: localize("WOD5E_MAGE.Poteri.TornaBase") },
      { action: "cancel", icon: "fas fa-times", label: localize("WOD5E.Cancel") }
    ],
    rejectClose: false
  }).catch(() => null);
  if (answer === "salva" && scelta) {
    await onSalva?.(scelta);
    return scelta;
  }
  if (answer === "base") {
    await onBase?.();
    return null;
  }
  return undefined;
}

/**
 * La modifica di base di una voce del catalogo: la finestra parte dal testo
 * che vale adesso per tutti (la base, o la modifica già scritta), non da
 * quello di una scheda; Salva scrive nel mondo, «Torna al testo di base»
 * toglie la modifica. Torna true se ha scritto o tolto qualcosa.
 */
export async function modificaBaseDelPotere(entry) {
  if (!entry || !game.user?.isGM) return false;
  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const sfera = Array.isArray(entry.spheres) ? entry.spheres.find((id) => id !== "any") ?? "" : "";
  const pulita = nuovoPotere(sfera, entry);
  const adesso = quattroParti(pulita, { entry, mod: modDelMondo(entry.id), localize });
  const base = quattroParti(pulita, { entry, mod: null, localize });
  const esito = await apriModificaPotere({
    name: entry.name,
    grado: adesso.grado,
    parti: { prerequisiti: adesso.prerequisiti.testo, attivo: adesso.attivo.testo, passivo: adesso.passivo.testo },
    base: { prerequisiti: base.prerequisiti.testo, attivo: base.attivo.testo, passivo: base.passivo.testo },
    mondo: true,
    onSalva: async (campi) => {
      await scriviModDelMondo(entry.id, campi);
      ui.notifications.info(format("WOD5E_MAGE.Poteri.ModificaSalvata", { name: entry.name }));
    },
    onBase: async () => {
      await scriviModDelMondo(entry.id, null);
      ui.notifications.info(format("WOD5E_MAGE.Poteri.ModificaTolta", { name: entry.name }));
    }
  });
  return esito !== undefined;
}
