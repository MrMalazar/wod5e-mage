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

/** Apre la finestra dell'Esperienza: listino, calcolatore e storico. */
export async function onExperienceOpen(event) {
  event?.preventDefault?.();

  const actor = this.actor;
  const content = await foundry.applications.handlebars.renderTemplate(
    `modules/${MODULE_ID}/templates/dialogs/experience.hbs`,
    {
      exp: actor.system.exp,
      experiences: actor.system.experiences ?? [],
      costs: EXPERIENCE_COSTS
    }
  );

  return foundry.applications.api.DialogV2.prompt({
    window: { title: game.i18n.localize("WOD5E.Tabs.Experience") },
    content,
    classes: ["wod5e", "wod5e-mage", "mage"],
    ok: { icon: "fas fa-check", label: game.i18n.localize("WOD5E.Close") }
  });
}
