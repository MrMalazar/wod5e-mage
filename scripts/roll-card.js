import { MODULE_ID } from "./constants.js";
import { SCOPE_ICONS } from "./scopes.js";
import { traitIcon } from "./tratti-icone.js";
import { RAMO, ramoCMargin } from "./ramo-c.js";

/**
 * La carta del tiro in chat, riletta con Blue (10/9 notte): in testa «Tiro
 * di» e i sigilli dell'Attributo e delle Abilità; i dadi; sotto le righe
 * del conto allineate, nome a sinistra e valore a destra (Obiettivo, Sfere
 * col glifo e il livello, Ambiti col simbolo e il livello, Soglia, Tipo,
 * Effetto, Riserva), dall'11/9 dentro una tendina chiusa «Dettagli»; la
 * fascia dice Successo o Fallimento; sotto i tre
 * tasti (Ritira con Volontà, Sforzare la realtà, Vittoria a un prezzo). La
 * vittoria automatica si dichiara a caratteri grandi. Le funzioni di testo
 * sono pure: si provano fuori da Foundry.
 */

const ARETE_SIGIL = `modules/${MODULE_ID}/assets/icons/ui/arete.svg`;

export const ROLL_CARD_FLAG = "rollCard";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * I simboli del tiro: il premio dell'Areté, ogni Sfera col livello usato,
 * ogni Ambito col livello dichiarato. Le etichette sono chiavi di lingua,
 * tradotte al momento di disegnare. Dalla 0.86.0 stanno nelle righe della
 * carta; la fila sopra i dadi resta per i messaggi vecchi.
 */
export function rollSymbols({ spheres = [], scopes = [], prize = 0 } = {}) {
  const symbols = [];
  if (prize > 0) {
    symbols.push({
      kind: "arete",
      id: "arete",
      label: "WOD5E_MAGE.Arete.Prize",
      value: `−${prize}`,
      icon: ARETE_SIGIL
    });
  }
  // Le Sfere senza numero (Blue, 25/9 sera: niente livelli): il sigillo e il nome al sorvolo.
  for (const sphere of spheres) {
    symbols.push({
      kind: "sphere",
      id: sphere.id,
      label: `WOD5E_MAGE.Spheres.${sphere.id}`,
      value: "",
      icon: `modules/${MODULE_ID}/assets/icons/sheet/${sphere.id}.png`
    });
  }
  for (const scope of scopes) {
    symbols.push({
      kind: "scope",
      id: scope.id,
      label: `WOD5E_MAGE.Scopes.${scope.id}`,
      value: String(scope.level),
      faIcon: SCOPE_ICONS[scope.id] ?? ""
    });
  }
  return symbols;
}

/** Un simbolo col suo numero: glifo (o icona) e livello, il nome al passaggio del mouse. */
function renderSymbol(symbol, localize) {
  const name = escapeHtml(localize(symbol.label));
  const title = symbol.value ? `${name} ${escapeHtml(symbol.value)}` : name;
  const picture = symbol.icon
    ? `<img src="${escapeHtml(symbol.icon)}" alt="${name}">`
    : `<i class="${escapeHtml(symbol.faIcon)}" aria-hidden="true"></i>`;
  return `<span class="wod5e-mage-roll-symbol wod5e-mage-roll-symbol-${symbol.kind}" title="${title}">${picture}${symbol.value ? `<b>${escapeHtml(symbol.value)}</b>` : ""}</span>`;
}

/** La fila dei simboli, da mettere sopra i dadi (messaggi vecchi). Vuota se non c'è niente. */
export function renderRollSymbols(symbols, localize = (key) => key) {
  if (!symbols?.length) return "";
  return `<div class="wod5e-mage-roll-symbols">${symbols.map((symbol) => renderSymbol(symbol, localize)).join("")}</div>`;
}

/**
 * La testata della carta (10/9 notte): «Tiro di», a capo, il sigillo di
 * ogni tratto della riserva col nome sotto, separati dal più.
 */
export function renderRollTitle(traits = [], localize = (key) => key) {
  const parts = traits.map((trait) => {
    const label = escapeHtml(trait.label);
    const icon = trait.type === "attribute" || trait.type === "skill" ? traitIcon(trait.id) : "";
    const picture = icon
      ? `<img src="${escapeHtml(icon)}" alt="">`
      : `<i class="fa-solid fa-circle-dot" aria-hidden="true"></i>`;
    const title = Number.isFinite(Number(trait.value)) ? `${label} ${escapeHtml(trait.value)}` : label;
    return `<span class="wod5e-mage-roll-trait" title="${title}">${picture}<small>${label}</small></span>`;
  });
  return `<span class="wod5e-mage-roll-of">${escapeHtml(localize("WOD5E_MAGE.RollCard.Of"))}</span><span class="wod5e-mage-roll-traits">${parts.join('<span class="wod5e-mage-roll-plus">+</span>')}</span>`;
}

/** La scritta grande: la vittoria automatica, o un'altra riuscita senza dadi (la riuscita comprata del ramo C). */
export function renderAutoVictoryBanner(localize = (key) => key, text = "") {
  return `<p class="wod5e-mage-roll-victory">${escapeHtml(text || localize("WOD5E_MAGE.Arete.AutoVictoryBanner"))}</p>`;
}

/** Una nota sotto il conto: tetto, vittoria automatica. */
export function renderRollNote(text, kind = "") {
  const extra = kind ? ` wod5e-mage-roll-note-${kind}` : "";
  return `<p class="wod5e-mage-roll-note${extra}">${escapeHtml(text)}</p>`;
}

/**
 * La nota del Contraccolpo (o dello Scoppio), leggibile (10/9 sera): il nome
 * in rosso, il testo in chiaro, una riga sola.
 */
export function renderBacklashNote(label, text) {
  return `<p class="wod5e-mage-roll-note wod5e-mage-roll-note-backlash"><b class="wod5e-mage-roll-backlash-label">${escapeHtml(label)}</b> <span class="wod5e-mage-roll-backlash-text">${escapeHtml(text)}</span></p>`;
}

/** Una riga della carta: nome a sinistra, valore a destra (già HTML). */
function renderRow(key, label, body) {
  return `<div class="wod5e-mage-roll-row wod5e-mage-roll-row-${key}"><b class="wod5e-mage-roll-key">${escapeHtml(label)}</b><span class="wod5e-mage-roll-value">${body}</span></div>`;
}

/**
 * Le righe del conto, nell'ordine di Blue (10/9 notte): Obiettivo, Sfere
 * (glifo e livello), Ambiti (simbolo e livello), Soglia, Tipo, Effetto,
 * Riserva. Nome a sinistra e valore a destra, allineati.
 */
export function renderRollCard({
  traits = [],
  bonusParts = [],
  threshold = 0,
  prize = 0,
  magickType = "",
  goal = "",
  effectKind = "",
  spheres = [],
  scopes = []
} = {}, localize = (key) => key) {
  const pool = [
    ...traits.map((trait) => `${escapeHtml(trait.label)} ${escapeHtml(trait.value)}`),
    ...bonusParts.map((part) => escapeHtml(part))
  ].join(" + ");
  const rows = [];
  if (goal) rows.push(renderRow("goal", localize("WOD5E_MAGE.RollCard.Goal"), escapeHtml(goal)));
  if (spheres.length) {
    const symbols = rollSymbols({ spheres: spheres.map((sphere) => ({ id: sphere.id, level: sphere.level })) });
    rows.push(renderRow("spheres", localize("WOD5E_MAGE.RollCard.Spheres"), symbols.map((symbol) => renderSymbol(symbol, localize)).join("")));
  }
  if (scopes.length) {
    const symbols = rollSymbols({ scopes: scopes.map((scope) => ({ id: scope.id, level: scope.level })) });
    rows.push(renderRow("scopes", localize("WOD5E_MAGE.RollCard.Scopes"), symbols.map((symbol) => renderSymbol(symbol, localize)).join("")));
  }
  // Un tiro di Abilità (ramo C) non ha né soglia fissa né Tipo: le righe si saltano.
  if (threshold !== null) rows.push(renderRow("threshold", localize("WOD5E_MAGE.RollCard.Threshold"), escapeHtml(threshold)));
  if (prize > 0) rows.push(renderRow("prize", localize("WOD5E_MAGE.Arete.Prize"), `−${escapeHtml(prize)}`));
  if (magickType) rows.push(renderRow("type", localize("WOD5E_MAGE.RollCard.Type"), escapeHtml(magickType)));
  if (effectKind) rows.push(renderRow("effect", localize("WOD5E_MAGE.RollCard.Effect"), escapeHtml(localize(effectKind))));
  rows.push(renderRow("pool", localize("WOD5E_MAGE.RollCard.Pool"), pool));
  // Le righe stanno in una tendina chiusa (Blue, 11/9): «sono dati che non
  // servono a primo impatto». Un clic su «Dettagli» le apre.
  return `<details class="wod5e-mage-roll-card-details"><summary>${escapeHtml(localize("WOD5E_MAGE.RollCard.Details"))}</summary><div class="wod5e-mage-roll-card">${rows.join("")}</div></details>`;
}

/**
 * Il messaggio della vittoria automatica senza dadi: scritta grande, conto
 * (coi glifi nelle righe), note.
 */
export function renderAutoVictoryContent({ card, notes = [] }, localize = (key) => key) {
  return [
    renderAutoVictoryBanner(localize),
    card,
    ...notes
  ].join("");
}

/**
 * Il conto del Mago in chat (4/9 notte): il sistema somma i dadi a modo
 * suo; il tiro di Areté conta le coppie di dieci solo fra i dadi Mage e
 * aggiunge i successi automatici delle Specialità. La carta porta il totale
 * vero e la soglia, e qui si riscrivono numero ed esito. La fascia dice una
 * parola (10/9 notte): Successo o Fallimento; con la realtà sforzata o la
 * vittoria a un prezzo, Successo con la sua ragione.
 */
export function rollOutcome(total, difficulty, localize = (key) => key, { forced = false, priced = false, bought = false, boughtText = "" } = {}) {
  const successes = Math.max(Math.trunc(Number(total) || 0), 0);
  const goal = Math.max(Math.trunc(Number(difficulty) || 0), 0);
  if (goal <= 0) return { total: successes, cssClass: "", text: "", missing: 0 };
  // La riuscita comprata con la Quintessenza (ramo C): riuscito senza tirare.
  if (bought) return { total: successes, cssClass: "success", text: boughtText || localize("WOD5E_MAGE.RollCard.Bought"), missing: 0 };
  if (forced) return { total: successes, cssClass: "success", text: localize("WOD5E_MAGE.RollCard.Forced"), missing: 0 };
  if (priced) return { total: successes, cssClass: "success", text: localize("WOD5E_MAGE.RollCard.Priced"), missing: 0 };
  if (successes >= goal) return { total: successes, cssClass: "success", text: localize("WOD5E_MAGE.RollCard.Success"), missing: 0 };
  return { total: successes, cssClass: "failure", text: localize("WOD5E_MAGE.RollCard.Failure"), missing: goal - successes };
}

function applyMageTotal(html, data) {
  if (!Number.isFinite(Number(data.total))) return;
  const outcome = rollOutcome(data.total, data.difficulty, game.i18n.localize.bind(game.i18n), { forced: Boolean(data.forced), priced: Boolean(data.priced), bought: Boolean(data.bought), boughtText: String(data.banner ?? "") });
  const totalOut = html.querySelector(".total-contents");
  if (totalOut) {
    totalOut.textContent = String(outcome.total);
    // Il margine dei tiri di Abilità (ramo C): i successi oltre il primo, per il danno.
    const margin = ramoCMargin(outcome.total);
    if (data.ramo === RAMO && data.skill && margin > 0) {
      totalOut.insertAdjacentHTML("beforeend", `<small class="wod5e-mage-roll-margin" title="${escapeHtml(game.i18n.localize("WOD5E_MAGE.RamoC.MarginHint"))}">+${margin}</small>`);
    }
  }
  // Nel ramo C la fascia legge «un successo basta»; il numero sotto Soglia è la soglia vera.
  const difficultyOut = html.querySelector(".difficulty-contents");
  if (difficultyOut && data.ramo === RAMO && Number.isFinite(Number(data.threshold))) difficultyOut.textContent = String(data.threshold);
  // I titoli del conto in parole del Mago: Successi e Soglia, non Totale e Difficoltà.
  const totalTitle = html.querySelector(".total-title");
  if (totalTitle) totalTitle.textContent = game.i18n.localize("WOD5E_MAGE.RollCard.Successes");
  const difficultyTitle = html.querySelector(".difficulty-title");
  if (difficultyTitle) difficultyTitle.textContent = game.i18n.localize("WOD5E_MAGE.RollCard.Threshold");
  const label = html.querySelector(".roll-result-label");
  if (label && outcome.text) {
    label.classList.remove("success", "failure");
    label.classList.add(outcome.cssClass, "wod5e-mage-roll-result");
    label.textContent = outcome.text;
  }
}

/** La testata: «Tiro di» e i sigilli dei tratti al posto del titolo del sistema. */
function applyMageTitle(html, data) {
  if (!data.traits?.length) return;
  const title = html.querySelector(".roll-label");
  if (!title || title.classList.contains("wod5e-mage-roll-title")) return;
  title.classList.add("wod5e-mage-roll-title");
  title.innerHTML = renderRollTitle(data.traits, game.i18n.localize.bind(game.i18n));
}

/**
 * Il posto dei tasti sotto la fascia (10/9 notte): Ritira con Volontà,
 * Sforzare la realtà, Vittoria a un prezzo, nell'ordine in cui i moduli si
 * registrano. Lo crea il primo che ne ha bisogno.
 */
export function rollActionsBox(target) {
  let box = target.querySelector(".wod5e-mage-roll-actions");
  if (!box) {
    box = target.ownerDocument.createElement("div");
    box.className = "wod5e-mage-roll-actions";
    target.append(box);
  }
  return box;
}

/**
 * La fascia in giallo (10/9 notte): il tiro è fallito ma si può ancora
 * ritirare con la Volontà o riuscire a un prezzo. La chiama chi mette il
 * tasto acceso.
 */
export function markRollOpen(html) {
  const label = html?.querySelector?.(".roll-result-label");
  if (label?.classList.contains("failure")) label.classList.add("wod5e-mage-roll-open");
}

/** Le tendine «Dettagli» aperte, per messaggio: sopravvivono ai render della chat. */
const openDetails = new Set();

/**
 * La tendina «Dettagli» si apre a mano (Blue, 11/9: «se clicco su dettagli
 * non si apre nulla»): il clic sul riassunto lo gestiamo noi, perché la chat
 * di Foundry lo intercetta e il <details> non cambia stato da solo.
 */
export function wireRollDetails(html, messageId) {
  const details = html?.querySelector?.("details.wod5e-mage-roll-card-details");
  const summary = details?.querySelector("summary");
  if (!details || !summary || summary.dataset.wired) return false;
  summary.dataset.wired = "1";
  details.open = openDetails.has(messageId);
  summary.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    details.open = !details.open;
    if (details.open) openDetails.add(messageId); else openDetails.delete(messageId);
  });
  return true;
}

export function decorateRollCard(message, html) {
  const data = message?.getFlag?.(MODULE_ID, ROLL_CARD_FLAG);
  if (!data || !html?.querySelector) return false;
  applyMageTotal(html, data);
  applyMageTitle(html, data);
  wireRollDetails(html, message.id);
  const icons = html.querySelector(".dice-result .dice-icons");
  if (!icons || icons.parentElement.querySelector(".wod5e-mage-roll-top")) return false;

  const localize = game.i18n.localize.bind(game.i18n);
  const top = document.createElement("div");
  top.className = "wod5e-mage-roll-top";
  top.innerHTML = [
    data.automatic ? renderAutoVictoryBanner(localize, data.bought ? (data.banner || localize("WOD5E_MAGE.RamoC.BoughtBanner")) : "") : "",
    // I messaggi di prima della 0.86.0 non hanno i glifi nelle righe: la fila resta a loro.
    data.traits ? "" : renderRollSymbols(data.symbols ?? [], localize)
  ].join("");
  if (!top.innerHTML) return false;
  icons.before(top);
  return true;
}

export function registerRollCardRendering() {
  Hooks.on("renderChatMessageHTML", decorateRollCard);
}
