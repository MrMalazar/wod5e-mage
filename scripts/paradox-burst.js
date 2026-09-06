import { MODULE_ID } from "./constants.js";
import { getMagickBalance, getParadoxFloor } from "./magick-balance.js";
import { renderRollNote, ROLL_CARD_FLAG } from "./roll-card.js";
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

/** La Ruota si scarica di un punto per danno, mai sotto il pavimento. */
export function paradoxAfterBurst(paradox, damage, floor = 0) {
  const current = Math.max(Math.trunc(Number(paradox) || 0), 0);
  const bottom = Math.max(Math.trunc(Number(floor) || 0), 0);
  return Math.max(current - Math.max(Math.trunc(Number(damage) || 0), 0), bottom);
}

function paradoxResults(message) {
  const roll = message?.rolls?.[0];
  const term = roll?.terms?.find((candidate) => candidate?.denomination === "p" || candidate?.constructor?.DENOMINATION === "p");
  const results = term?.results ?? roll?.advancedDice?.results ?? [];
  return results.filter((result) => result?.active !== false && !result?.discarded).map((result) => Number(result.result));
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
      <p class="wod5e-mage-burst-dice">${game.i18n.format("WOD5E_MAGE.Burst.Dice", { dice: balance.paradox })}</p>
    </div>`,
    ok: { icon: "fas fa-dice", label: game.i18n.localize("WOD5E_MAGE.Burst.Roll") },
    buttons: [{ action: "cancel", icon: "fas fa-times", label: game.i18n.localize("WOD5E.Cancel") }]
  }).catch(() => null);
  if (!answer || answer === "cancel") return;
  const threshold = Math.max(Math.trunc(Number(answer.threshold) || 0), 0);

  const { rollAreteWithParadox } = await import("./paradox-dice.js");
  const title = game.i18n.localize("WOD5E_MAGE.Burst.Title");
  let message = null;
  try {
    message = await rollAreteWithParadox({
      actor,
      data: actor.system,
      dicePool: balance.paradox,
      paradoxRating: balance.paradox,
      onlyParadox: true,
      difficulty: 0,
      burn: threshold,
      title,
      flavor: renderRollNote(game.i18n.format("WOD5E_MAGE.Burst.Flavor", { dice: balance.paradox, threshold })),
      card: { symbols: [], burst: true }
    });
  } catch (error) {
    console.warn("wod5e-mage | Scoppio interrotto.", error);
  }
  if (!message || message === "cancel" || !message.rolls) return;

  const results = paradoxResults(message);
  const eyes = results.filter((value) => value === 1 || value === 10).length;
  const tens = results.filter((value) => value === 10).length;
  if (eyes <= 0) return;

  const damage = burstDamage({ eyes, tens, threshold });
  const after = getMagickBalance(actor);
  const paradox = paradoxAfterBurst(after.paradox, damage.total, getParadoxFloor(actor));
  const updates = {};
  if (damage.total > 0) await addSaluteDamage(actor, { ps: damage.ps, pa: damage.pa });
  if (paradox !== after.paradox) {
    updates[`flags.${MODULE_ID}.magickBalance`] = { quintessence: after.quintessence, paradox };
  }
  if (Object.keys(updates).length) await actor.update(updates);

  const note = game.i18n.format("WOD5E_MAGE.Burst.Result", {
    eyes,
    total: damage.total,
    aggravated: damage.pa,
    discharged: after.paradox - paradox
  });
  ui.notifications.warn(note);
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    flavor: title,
    content: renderRollNote(note, "backlash"),
    flags: { [MODULE_ID]: { [ROLL_CARD_FLAG]: { symbols: [], burstResult: true } } }
  });
}
