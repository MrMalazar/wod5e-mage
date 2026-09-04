import { MODULE_ID } from "./constants.js";

/**
 * Il listino del manuale: si paga il pallino a cui vuoi arrivare,
 * moltiplicato per il tratto. (05_10_personaggi_avanzati)
 */
export const EXPERIENCE_COSTS = Object.freeze({
  attribute: { multiplier: 4 },
  skill: { multiplier: 2, firstDot: 3 },
  affinitySphere: { multiplier: 5, firstDot: 8 },
  sphere: { multiplier: 7, firstDot: 8 },
  arete: { multiplier: 10 },
  // La Volontà è caduta: c'è un tracciato solo, la Salute.
  health: { multiplier: 1 },
  merit: { multiplier: 3 },
  background: { multiplier: 3 }
});

/**
 * Costo per passare da `from` a `to`, pallino per pallino.
 * Matematica pura: testabile fuori da Foundry.
 */
export function experienceCost(kind, from, to) {
  const rule = EXPERIENCE_COSTS[kind];
  if (!rule) throw new Error(`Tratto sconosciuto: ${kind}`);

  const start = Math.max(0, Math.floor(Number(from) || 0));
  const end = Math.floor(Number(to) || 0);
  if (end <= start) return { total: 0, steps: [] };

  const steps = [];
  for (let dot = start + 1; dot <= end; dot += 1) {
    const cost = dot === 1 && rule.firstDot !== undefined
      ? rule.firstDot
      : dot * rule.multiplier;
    steps.push({ dot, cost });
  }

  return { total: steps.reduce((sum, step) => sum + step.cost, 0), steps };
}

/** Le righe del listino, con etichetta e formula già localizzate. */
function experienceRows() {
  const localize = game.i18n.localize.bind(game.i18n);
  const perDot = localize("WOD5E_MAGE.Experience.PerDot");
  const firstDot = localize("WOD5E_MAGE.Experience.New");

  return Object.entries(EXPERIENCE_COSTS).map(([kind, rule]) => ({
    kind,
    label: localize(`WOD5E_MAGE.Experience.Kinds.${kind}`),
    formula: rule.firstDot !== undefined
      ? `${firstDot} ${rule.firstDot} · ${perDot} × ${rule.multiplier}`
      : `${perDot} × ${rule.multiplier}`
  }));
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
    steps.textContent = result.steps
      .map((step) => `${step.dot}° = ${step.cost}`)
      .join("  +  ");
  };

  for (const input of [kind, from, to]) input.addEventListener("input", update);
  update();
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
 * sono la differenza. Niente numeri a mano: si sommano da soli.
 */
export function prepareExperiencePage(actor) {
  const gains = readMoneyRows(actor, "experienceGains", "when");
  const log = readMoneyRows(actor, "experienceLog", "what");
  const total = gains.reduce((sum, row) => sum + row.cost, 0);
  const spent = log.reduce((sum, row) => sum + row.cost, 0);

  return {
    total,
    spent,
    remaining: total - spent,
    gains,
    log,
    rows: experienceRows()
  };
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
