import { MODULE_ID } from "./constants.js";
import { SCOPE_ICONS } from "./scopes.js";

/**
 * La carta del tiro in chat: sopra i dadi i simboli di quel che si tira
 * (Sfere e Ambiti col livello, il premio dell'Areté), sotto le righe del
 * conto, una per voce. La vittoria automatica si dichiara a caratteri
 * grandi. Le funzioni di testo sono pure: si provano fuori da Foundry.
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
 * tradotte al momento di disegnare.
 */
export function rollSymbols({ spheres = [], scopes = [], prize = 0 } = {}) {
  const symbols = [];
  if (prize > 0) {
    symbols.push({
      kind: "arete",
      id: "arete",
      label: "WOD5E_MAGE.Arete.Prize",
      value: `+${prize}`,
      icon: ARETE_SIGIL
    });
  }
  for (const sphere of spheres) {
    symbols.push({
      kind: "sphere",
      id: sphere.id,
      label: `WOD5E_MAGE.Spheres.${sphere.id}`,
      value: String(sphere.level),
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

/** La fila dei simboli, da mettere sopra i dadi. Vuota se non c'è niente. */
export function renderRollSymbols(symbols, localize = (key) => key) {
  if (!symbols?.length) return "";
  const items = symbols.map((symbol) => {
    const title = escapeHtml(localize(symbol.label));
    const picture = symbol.icon
      ? `<img src="${escapeHtml(symbol.icon)}" alt="${title}">`
      : `<i class="${escapeHtml(symbol.faIcon)}" aria-hidden="true"></i>`;
    return `<span class="wod5e-mage-roll-symbol wod5e-mage-roll-symbol-${symbol.kind}" title="${title}">${picture}<b>${escapeHtml(symbol.value)}</b></span>`;
  });
  return `<div class="wod5e-mage-roll-symbols">${items.join("")}</div>`;
}

/** La scritta grande della vittoria automatica. */
export function renderAutoVictoryBanner(localize = (key) => key) {
  return `<p class="wod5e-mage-roll-victory">${escapeHtml(localize("WOD5E_MAGE.Arete.AutoVictoryBanner"))}</p>`;
}

/** Una nota sotto il conto: a un passo, tetto, Contraccolpo. */
export function renderRollNote(text, kind = "") {
  const extra = kind ? ` wod5e-mage-roll-note-${kind}` : "";
  return `<p class="wod5e-mage-roll-note${extra}">${escapeHtml(text)}</p>`;
}

/**
 * Le righe del conto: riserva, soglia e tipo, Sfere, Ambiti. Ogni voce
 * sulla sua riga, il nome in oro.
 */
export function renderRollCard({
  traits = [],
  bonusParts = [],
  threshold = 0,
  magickType = "",
  goal = "",
  effectKind = "",
  spheres = [],
  scopes = []
} = {}, localize = (key) => key) {
  const line = (label, body) => `<p><b>${escapeHtml(localize(label))}</b> ${body}</p>`;
  const pool = [
    ...traits.map((trait) => `${escapeHtml(trait.label)} ${escapeHtml(trait.value)}`),
    ...bonusParts.map((part) => escapeHtml(part))
  ].join(" + ");
  // Una voce per riga: nome, descrizione, a capo.
  const lines = [];
  if (goal) lines.push(line("WOD5E_MAGE.Arete.Goal", escapeHtml(goal)));
  lines.push(
    line("WOD5E_MAGE.Arete.Pool", pool),
    line("WOD5E_MAGE.Arete.Threshold", escapeHtml(threshold)),
    line("WOD5E_MAGE.Arete.MagickType", escapeHtml(magickType))
  );
  if (effectKind) lines.push(line("WOD5E_MAGE.Arete.EffectKind", escapeHtml(localize(effectKind))));
  if (spheres.length) {
    lines.push(line(
      "WOD5E_MAGE.Arete.Spheres",
      spheres.map((sphere) => `${escapeHtml(localize(sphere.label))} ${escapeHtml(sphere.level)}`).join(", ")
    ));
  }
  if (scopes.length) {
    lines.push(line(
      "WOD5E_MAGE.Scopes.Label",
      scopes.map((scope) => `${escapeHtml(localize(scope.label))} ${escapeHtml(scope.level)}`).join(", ")
    ));
  }
  return `<div class="wod5e-mage-roll-card">${lines.join("")}</div>`;
}

/**
 * Il messaggio della vittoria automatica senza dadi: scritta grande,
 * simboli, conto.
 */
export function renderAutoVictoryContent({ symbols, card, notes = [] }, localize = (key) => key) {
  return [
    renderAutoVictoryBanner(localize),
    renderRollSymbols(symbols, localize),
    card,
    ...notes
  ].join("");
}

/**
 * In chat, sopra i dadi: i simboli del tiro e, se serve, la vittoria
 * automatica. Legge la bandiera del messaggio scritta dal tiro di Areté.
 */
/**
 * Il conto del Mago in chat (4/9 notte): il sistema somma i dadi a modo
 * suo; il tiro di Areté conta le coppie di dieci solo fra i dadi Mage e
 * aggiunge i successi automatici delle Specialità. La carta porta il totale
 * vero e la soglia, e qui si riscrivono numero ed esito.
 */
export function rollOutcome(total, difficulty, format = (key, data) => `${key} ${data?.string ?? ""}`) {
  const successes = Math.max(Math.trunc(Number(total) || 0), 0);
  const goal = Math.max(Math.trunc(Number(difficulty) || 0), 0);
  if (goal <= 0) return { total: successes, cssClass: "", text: "" };
  return successes >= goal
    ? { total: successes, cssClass: "success", text: format("WOD5E.RollList.SuccessBy", { string: successes - goal }) }
    : { total: successes, cssClass: "failure", text: format("WOD5E.RollList.FailureBy", { string: goal - successes }) };
}

function applyMageTotal(html, data) {
  if (!Number.isFinite(Number(data.total))) return;
  const outcome = rollOutcome(data.total, data.difficulty, game.i18n.format.bind(game.i18n));
  const totalOut = html.querySelector(".total-contents");
  if (totalOut) totalOut.textContent = String(outcome.total);
  const label = html.querySelector(".roll-result-label");
  if (label && outcome.text) {
    label.classList.remove("success", "failure");
    label.classList.add(outcome.cssClass);
    label.textContent = outcome.text;
  }
}

export function decorateRollCard(message, html) {
  const data = message?.getFlag?.(MODULE_ID, ROLL_CARD_FLAG);
  if (!data || !html?.querySelector) return false;
  applyMageTotal(html, data);
  const icons = html.querySelector(".dice-result .dice-icons");
  if (!icons || icons.parentElement.querySelector(".wod5e-mage-roll-top")) return false;

  const localize = game.i18n.localize.bind(game.i18n);
  const top = document.createElement("div");
  top.className = "wod5e-mage-roll-top";
  top.innerHTML = [
    data.automatic ? renderAutoVictoryBanner(localize) : "",
    renderRollSymbols(data.symbols ?? [], localize)
  ].join("");
  if (!top.innerHTML) return false;
  icons.before(top);
  return true;
}

export function registerRollCardRendering() {
  Hooks.on("renderChatMessageHTML", decorateRollCard);
}
