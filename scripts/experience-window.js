import { MODULE_ID } from "./constants.js";
import { poteriDelPersonaggio } from "./poteri.js";
import { prepareSpheres } from "./spheres.js";

/**
 * Il listino dettato da Blue il 21/9/2026 (supera 05_10): si paga il pallino
 * a cui vuoi arrivare, moltiplicato per il tratto. Le Sfere non si comprano
 * più a pallini: si compra l'accesso al Dominio (15, una volta: «puoi fare
 * Magick su quell'aspetto della realtà») e poi ogni potere di quel Dominio,
 * al pallino richiesto dal potere per 5 (Dominio di famiglia) o per 7
 * (esterno): «avere un potere di 1 e Dominio nuovo costa 20». La casella di
 * Salute costa quante caselle hai già. Pregi e Background sono un Tratto.
 */
export const EXPERIENCE_COSTS = Object.freeze({
  attribute: { multiplier: 4 },
  skill: { multiplier: 2, firstDot: 3 },
  arete: { multiplier: 10 },
  dominio: { flat: 15 },
  potereFamiglia: { multiplier: 5 },
  potereEsterno: { multiplier: 7 },
  // La Volontà è caduta: c'è un tracciato solo, la Salute. La casella nuova
  // costa quante caselle hai già (da 8 a 9 costa 8).
  health: { current: true },
  trait: { multiplier: 3 }
});

/**
 * Costo per passare da `from` a `to`, pallino per pallino. Un Dominio è una
 * cosa sola (`flat`): da 0 a 1 costa 15, poi niente. Matematica pura:
 * testabile fuori da Foundry.
 */
export function experienceCost(kind, from, to) {
  const rule = EXPERIENCE_COSTS[kind];
  if (!rule) throw new Error(`Tratto sconosciuto: ${kind}`);

  const start = Math.max(0, Math.floor(Number(from) || 0));
  const end = Math.floor(Number(to) || 0);
  if (end <= start) return { total: 0, steps: [] };

  const steps = [];
  for (let dot = start + 1; dot <= end; dot += 1) {
    let cost;
    if (rule.flat !== undefined) cost = dot === 1 ? rule.flat : 0;
    else if (rule.current) cost = dot - 1;
    else if (dot === 1 && rule.firstDot !== undefined) cost = rule.firstDot;
    else cost = dot * rule.multiplier;
    steps.push({ dot, cost });
  }

  return { total: steps.reduce((sum, step) => sum + step.cost, 0), steps };
}

/** Il prezzo di un potere inserito: il pallino richiesto per 5 o per 7; senza pallino non si sa. */
export function potereCost(power, family) {
  const dot = Math.max(Math.trunc(Number(power?.dot) || 0), 0);
  if (!dot) return null;
  return dot * EXPERIENCE_COSTS[family ? "potereFamiglia" : "potereEsterno"].multiplier;
}

/** Le righe del listino, con etichetta e formula già localizzate. */
function experienceRows() {
  const localize = game.i18n.localize.bind(game.i18n);
  const perDot = localize("WOD5E_MAGE.Experience.PerDot");
  const firstDot = localize("WOD5E_MAGE.Experience.New");

  return Object.entries(EXPERIENCE_COSTS).map(([kind, rule]) => {
    let formula;
    if (rule.flat !== undefined) formula = `${localize("WOD5E_MAGE.Experience.Once")} ${rule.flat}`;
    else if (rule.current) formula = localize("WOD5E_MAGE.Experience.PerBox");
    else if (rule.firstDot !== undefined) formula = `${firstDot} ${rule.firstDot} · ${perDot} × ${rule.multiplier}`;
    else formula = `${perDot} × ${rule.multiplier}`;
    return { kind, label: localize(`WOD5E_MAGE.Experience.Kinds.${kind}`), formula };
  });
}

/** La bandiera delle spese proposte messe da parte («Ignora»). */
export const EXP_IGNORED_FLAG = "experienceIgnored";

/**
 * Le spese proposte (mock del 21/9): i Domini presi e i poteri inseriti che
 * non compaiono ancora fra le spese (si cerca il testo della spesa) e non
 * sono stati ignorati. Niente si scala da solo: «Segna» scrive la riga,
 * «Ignora» la mette da parte (le Sfere della creazione sono gratis).
 */
export function prepareExperienceProposals(actor, { log = [], localize = (key) => key, format = null } = {}) {
  const fmt = format ?? ((key, data) => Object.entries(data ?? {}).reduce((out, [k, v]) => out.replace(`{${k}}`, String(v)), localize(key)));
  const ignored = actor?.getFlag?.(MODULE_ID, EXP_IGNORED_FLAG) ?? {};
  const written = (log ?? []).map((row) => String(row.what ?? "").trim().toLowerCase()).filter(Boolean);
  const spheres = prepareSpheres(actor, { localize }).selected;
  const proposals = [];
  for (const sphere of spheres) {
    const label = localize(sphere.label);
    const what = fmt("WOD5E_MAGE.Experience.DominioDi", { sphere: label });
    if (ignored[`dominio:${sphere.id}`] || written.includes(what.toLowerCase())) continue;
    proposals.push({ id: `dominio:${sphere.id}`, kind: "dominio", what, cost: EXPERIENCE_COSTS.dominio.flat, icon: sphere.icon, hint: "" });
  }
  const family = Object.fromEntries(spheres.map((sphere) => [sphere.id, Boolean(sphere.family)]));
  const icons = Object.fromEntries(spheres.map((sphere) => [sphere.id, sphere.icon]));
  const labels = Object.fromEntries(spheres.map((sphere) => [sphere.id, localize(sphere.label)]));
  for (const power of poteriDelPersonaggio(actor)) {
    if (!power.name || !(power.sphere in family)) continue;
    const what = fmt("WOD5E_MAGE.Experience.PotereDi", { power: power.name, sphere: labels[power.sphere] });
    if (ignored[`potere:${power.id}`] || written.includes(what.toLowerCase())) continue;
    const cost = potereCost(power, family[power.sphere]);
    proposals.push({
      id: `potere:${power.id}`,
      kind: family[power.sphere] ? "potereFamiglia" : "potereEsterno",
      what,
      cost,
      icon: icons[power.sphere],
      hint: cost === null ? localize("WOD5E_MAGE.Experience.SenzaPallino") : ""
    });
  }
  return proposals;
}

function readMoneyRows(actor, flagKey, textField) {
  const stored = actor.getFlag(MODULE_ID, flagKey) ?? {};

  return Object.entries(stored).map(([id, row]) => {
    const cost = Math.trunc(Number(row?.cost));
    return {
      id,
      cost: Number.isFinite(cost) ? Math.max(cost, 0) : 0,
      [textField]: String(row?.[textField] ?? "")
    };
  });
}

/**
 * La pagina Esperienza: il Totale è la somma delle PRESE (una riga per
 * sessione), la Spesa è la somma del registro degli acquisti, e i Rimanenti
 * sono la differenza. Niente numeri a mano: si sommano da soli. Sotto le
 * spese, le spese proposte dalle altre pagine.
 */
export function prepareExperiencePage(actor, { localize = null, format = null } = {}) {
  const gains = readMoneyRows(actor, "experienceGains", "when");
  const log = readMoneyRows(actor, "experienceLog", "what");
  const total = gains.reduce((sum, row) => sum + row.cost, 0);
  const spent = log.reduce((sum, row) => sum + row.cost, 0);
  const loc = localize ?? globalThis.game?.i18n?.localize?.bind(globalThis.game.i18n) ?? ((key) => key);

  return {
    total,
    spent,
    remaining: total - spent,
    gains,
    log,
    proposals: prepareExperienceProposals(actor, { log, localize: loc, format }),
    rows: experienceRows()
  };
}

/** Cabla il calcolatore della finestra: da X a Y, passo per passo. */
export function bindExperienceCalculator(root) {
  const el = root?.querySelector?.(".wod5e-mage-exp");
  if (!el) return;

  const kind = el.querySelector("[name=kind]");
  const from = el.querySelector("[name=from]");
  const to = el.querySelector("[name=to]");
  const total = el.querySelector("[data-role=total]");
  const steps = el.querySelector("[data-role=steps]");
  if (!kind || !from || !to || !total || !steps) return;

  const update = () => {
    const f = Math.max(0, Math.trunc(Number(from.value) || 0));
    const t = Math.max(f + 1, Math.trunc(Number(to.value) || f + 1));
    to.value = String(t);
    const result = experienceCost(kind.value, f, t);
    total.textContent = String(result.total);
    // I passi: «1 → 2 costa 4 · 2 → 3 costa 6».
    const format = (data) => globalThis.game?.i18n?.format?.("WOD5E_MAGE.Experience.Step", data)
      ?? `${data.from} → ${data.to} costa ${data.cost}`;
    steps.textContent = result.steps
      .map((step) => format({ from: step.dot - 1, to: step.dot, cost: step.cost }))
      .join(" · ");
  };

  for (const input of [kind, from, to]) input.addEventListener("input", update);
  update();
}

function canEditExperience(actor) {
  if (!actor.isOwner) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.NoSufficientPermission", {
        string: actor.name
      })
    );
    return false;
  }

  if (actor.system.locked) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.CannotModifyResourceString", {
        string: actor.name
      })
    );
    return false;
  }

  return true;
}

const EXP_TABLES = Object.freeze({
  experienceGains: { when: "" },
  experienceLog: { what: "" }
});

function expTableFlag(target) {
  const table = target.dataset.table;
  return Object.hasOwn(EXP_TABLES, table) ? table : null;
}

export async function onExperienceLogAdd(event, target) {
  event.preventDefault();

  const actor = this.actor;
  const flagKey = expTableFlag(target);
  if (!flagKey || !canEditExperience(actor)) return;

  const rows = { ...(actor.getFlag(MODULE_ID, flagKey) ?? {}) };
  let rowId = foundry.utils.randomID();
  while (rows[rowId]) rowId = foundry.utils.randomID();

  rows[rowId] = { cost: 0, ...EXP_TABLES[flagKey] };

  await actor.setFlag(MODULE_ID, flagKey, rows);
}

export async function onExperienceLogDelete(event, target) {
  event.preventDefault();

  const actor = this.actor;
  const flagKey = expTableFlag(target);
  if (!flagKey || !canEditExperience(actor)) return;

  const rowId = target.dataset.row;
  const rows = { ...(actor.getFlag(MODULE_ID, flagKey) ?? {}) };
  if (!Object.hasOwn(rows, rowId)) return;

  // La sintassi -= di Foundry toglie la riga senza rifondere le altre.
  await actor.update({
    [`flags.${MODULE_ID}.${flagKey}.-=${rowId}`]: null
  });
}

/** «Segna»: la spesa proposta diventa una riga del registro, col prezzo del listino. */
export async function onExperienceProposalMark(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEditExperience(actor)) return;
  const what = String(target.dataset.what ?? "").trim();
  const cost = Math.max(Math.trunc(Number(target.dataset.cost) || 0), 0);
  if (!what) return;
  const rows = { ...(actor.getFlag(MODULE_ID, "experienceLog") ?? {}) };
  let rowId = foundry.utils.randomID();
  while (rows[rowId]) rowId = foundry.utils.randomID();
  rows[rowId] = { cost, what };
  await actor.setFlag(MODULE_ID, "experienceLog", rows);
}

/** «Ignora»: la proposta va da parte (le Sfere e i poteri della creazione non si pagano). */
export async function onExperienceProposalIgnore(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEditExperience(actor)) return;
  const id = String(target.dataset.proposal ?? "");
  if (!id) return;
  await actor.setFlag(MODULE_ID, EXP_IGNORED_FLAG, { ...(actor.getFlag(MODULE_ID, EXP_IGNORED_FLAG) ?? {}), [id]: true });
}
