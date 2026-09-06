import { MODULE_ID } from "./constants.js";
import { getMagickBalance, getParadoxFloor } from "./magick-balance.js";
import { renderRollNote } from "./roll-card.js";
import { addSaluteDamage } from "./salute.js";

/**
 * Lo Scoppio del Paradosso (verdetto di Blue, 6/9/2026): dalla parola
 * PARADOSSO sulla Ruota si tirano SOLO i dadi rossi, tanti quante le celle
 * di Paradosso. Se scoppia (un 1 o un 10 sui rossi) il Mago subisce danni
 * pari alla soglia dell'incantesimo che ha generato lo scoppio: la soglia si
 * chiede nella finestra, proposta dall'ultimo lancio. L'Ustione va sulla
 * Salute come superficiale fisico; ogni due 10 un punto diventa aggravato;
 * per ogni danno la Ruota scarica un punto di Paradosso, fino al pavimento.
 */

/** Il conto dell'Ustione: tetto della soglia, conversioni per coppie di 10. */
export function burstDamage({ eyes = 0, tens = 0, threshold = 0 } = {}) {
  const total = Math.max(Math.trunc(Number(threshold) || 0), 0);
  if (eyes <= 0 || total <= 0) return { total: 0, pa: 0, ps: 0 };
  const pa = Math.min(Math.floor(Math.max(Math.trunc(Number(tens) || 0), 0) / 2), total);
  return { total, pa, ps: total - pa };
}

/** I tipi di effetto: dicono dove va il Contraccolpo (verdetto di Blue, 6/9). */
export const EFFECT_KINDS = Object.freeze(["", "physical", "mental", "variable"]);

export function normalizeEffectKind(value) {
  const kind = String(value ?? "");
  return EFFECT_KINDS.includes(kind) ? kind : "";
}

/**
 * Dove va l'Ustione: fisico se l'effetto è fisico (o non dichiarato), mentale
 * se è mentale, metà e metà arrotondando per difetto se è variabile. Le
 * conversioni in aggravato (una ogni due 10) vanno prima sul fisico.
 */
export function ustioneSplit({ threshold = 0, tens = 0, kind = "", random = Math.random } = {}) {
  const total = Math.max(Math.trunc(Number(threshold) || 0), 0);
  let aggravated = Math.min(Math.floor(Math.max(Math.trunc(Number(tens) || 0), 0) / 2), total);
  const effect = normalizeEffectKind(kind);
  let physical = total;
  let mental = 0;
  if (effect === "mental") { physical = 0; mental = total; }
  // Variabile: a metà; il punto che avanza cade a caso (verdetto di Blue, 6/9).
  if (effect === "variable") {
    physical = Math.floor(total / 2);
    mental = Math.floor(total / 2);
    if (total % 2 === 1) {
      if (random() < 0.5) physical += 1;
      else mental += 1;
    }
  }
  const pa = Math.min(aggravated, physical);
  aggravated -= pa;
  const ma = Math.min(aggravated, mental);
  return { total, applied: physical + mental, pa, ps: physical - pa, ma, ms: mental - ma, kind: effect };
}

/** Segna l'Ustione sulla Salute e scarica la Ruota di un punto per danno. */
export async function applyUstione(actor, { threshold = 0, tens = 0, kind = "", random } = {}) {
  const split = ustioneSplit({ threshold, tens, kind, random });
  if (split.applied <= 0) return { ...split, discharged: 0 };
  await addSaluteDamage(actor, { pa: split.pa, ps: split.ps, ma: split.ma, ms: split.ms });
  const balance = getMagickBalance(actor);
  const paradox = paradoxAfterBurst(balance.paradox, split.applied, getParadoxFloor(actor));
  if (paradox !== balance.paradox) {
    await actor.setFlag(MODULE_ID, "magickBalance", { quintessence: balance.quintessence, paradox });
  }
  return { ...split, discharged: balance.paradox - paradox };
}

/** La riga in chat: quanto è andato dove, e quanto ha scaricato la Ruota. */
export function ustioneText(applied, format) {
  return format("WOD5E_MAGE.Burst.Applied", {
    total: applied.applied,
    physical: applied.pa + applied.ps,
    physicalAggravated: applied.pa,
    mental: applied.ma + applied.ms,
    mentalAggravated: applied.ma,
    discharged: applied.discharged
  });
}

/** La Ruota si scarica di un punto per danno, mai sotto il pavimento. */
export function paradoxAfterBurst(paradox, damage, floor = 0) {
  const current = Math.max(Math.trunc(Number(paradox) || 0), 0);
  const bottom = Math.max(Math.trunc(Number(floor) || 0), 0);
  return Math.max(current - Math.max(Math.trunc(Number(damage) || 0), 0), bottom);
}

export async function onParadoxBurst(event) {
  event?.preventDefault?.();
  const actor = this.actor;
  if (!actor.isOwner) {
    ui.notifications.warn(game.i18n.format("WOD5E.Notifications.NoSufficientPermission", { string: actor.name }));
    return;
  }
  const balance = getMagickBalance(actor);
  if (balance.paradox <= 0) {
    ui.notifications.warn(game.i18n.localize("WOD5E_MAGE.Burst.NoParadox"));
    return;
  }

  const suggested = Math.max(Math.trunc(Number(actor.getFlag(MODULE_ID, "lastThreshold")) || 0), 0);
  const answer = await foundry.applications.api.DialogV2.input({
    window: { title: game.i18n.localize("WOD5E_MAGE.Burst.Title") },
    classes: ["wod5e", "wod5e-mage", "mage", "wod5e-mage-roll-dialog"],
    content: `<div class="wod5e-mage-burst-ask">
      <label>${game.i18n.localize("WOD5E_MAGE.Burst.Threshold")}
        <input type="number" name="threshold" min="0" step="1" value="${suggested}" autofocus>
      </label>
      <label>${game.i18n.localize("WOD5E_MAGE.Arete.EffectKind")}
        <select name="effectKind">${EFFECT_KINDS.map((kind) => `<option value="${kind}">${game.i18n.localize(`WOD5E_MAGE.Arete.EffectKinds.${kind || "none"}`)}</option>`).join("")}</select>
      </label>
      <p class="wod5e-mage-burst-dice">${game.i18n.format("WOD5E_MAGE.Burst.Dice", { dice: balance.paradox })}</p>
    </div>`,
    ok: { icon: "fas fa-dice", label: game.i18n.localize("WOD5E_MAGE.Burst.Roll") },
    buttons: [{ action: "cancel", icon: "fas fa-times", label: game.i18n.localize("WOD5E.Cancel") }]
  }).catch(() => null);
  if (!answer || answer === "cancel") return;
  const threshold = Math.max(Math.trunc(Number(answer.threshold) || 0), 0);
  const effectKind = normalizeEffectKind(answer.effectKind);

  // Il tiro dei soli rossi: se scoppia, l'Ustione la segna il tiro stesso.
  const { rollAreteWithParadox } = await import("./paradox-dice.js");
  const title = game.i18n.localize("WOD5E_MAGE.Burst.Title");
  try {
    await rollAreteWithParadox({
      actor,
      data: actor.system,
      dicePool: balance.paradox,
      paradoxRating: balance.paradox,
      onlyParadox: true,
      difficulty: 0,
      burn: threshold,
      effectKind,
      title,
      flavor: renderRollNote(game.i18n.format("WOD5E_MAGE.Burst.Flavor", { dice: balance.paradox, threshold })),
      card: { symbols: [], burst: true }
    });
  } catch (error) {
    console.warn("wod5e-mage | Scoppio interrotto.", error);
  }
}
