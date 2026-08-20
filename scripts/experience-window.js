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
  health: { multiplier: 1 },
  willpower: { multiplier: 1 },
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

/** Apre la finestra dell'Esperienza: totali, calcolatore e listino. */
export async function onExperienceOpen(event) {
  event?.preventDefault?.();

  const actor = this.actor;
  const exp = actor.system.exp ?? {};
  const content = await foundry.applications.handlebars.renderTemplate(
    `modules/${MODULE_ID}/templates/dialogs/experience.hbs`,
    {
      remaining: Number(exp.value ?? 0),
      total: Number(exp.max ?? 0),
      rows: experienceRows()
    }
  );

  return foundry.applications.api.DialogV2.prompt({
    window: {
      title: game.i18n.localize("WOD5E.Tabs.Experience"),
      resizable: true
    },
    position: { width: "auto", height: "auto" },
    content,
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-experience-dialog"],
    ok: { icon: "fas fa-check", label: game.i18n.localize("WOD5E.Close") },
    render: (_event, dialog) => bindExperienceCalculator(dialog?.element ?? dialog)
  });
}
