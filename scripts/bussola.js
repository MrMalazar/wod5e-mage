import { MODULE_ID } from "./constants.js";
import { getMagickBalance, MAGICK_TRACK_MAX } from "./magick-balance.js";
import { prepareConvictions } from "./personaggio-extra.js";

/**
 * «Rispetta la Bussola?» (ordine di Blue, 11/9 pomeriggio): su qualunque
 * tiro, Magick o Abilità, il giocatore può dire che il gesto serve la sua
 * Bussola e scegliere cosa: l'Ambizione, il Desiderio o una Convinzione
 * fra quelle in scheda. Vale un dado in più su quel tiro e, a tiro fatto,
 * un punto di Quintessenza sulla Ruota. Una volta per scena, come la
 * Convinzione rispettata del 9/9 che questa sostituisce: Cambio Scena la
 * riarma. Il flag di scena resta quello vecchio, così la scheda non cambia.
 */

export const BUSSOLA_SCENE_FLAG = "convinzioneScena";
export const BUSSOLA_DICE = 1;

function clean(value) {
  return String(value ?? "").trim();
}

/** Le voci della Bussola fra cui scegliere: Ambizione, Desiderio, le Convinzioni scritte. */
export function prepareBussolaChoice(actor) {
  const localize = globalThis.game?.i18n?.localize?.bind(globalThis.game.i18n) ?? ((key) => key);
  const options = [];
  const ambition = clean(actor.system?.headers?.ambition);
  const desire = clean(actor.system?.headers?.desire);
  if (ambition) options.push({ id: "ambizione", kind: "ambizione", label: `${localize("WOD5E_MAGE.Bussola.Ambition")}: ${ambition}` });
  if (desire) options.push({ id: "desiderio", kind: "desiderio", label: `${localize("WOD5E_MAGE.Bussola.Desire")}: ${desire}` });
  for (const row of prepareConvictions(actor)) {
    const text = clean(row.text);
    if (!text) continue;
    const group = [...(row.groups ?? []), ...(row.credos ?? [])].find((entry) => entry.selected);
    options.push({ id: `convinzione:${row.id}`, kind: "convinzione", label: `${localize("WOD5E_MAGE.Bussola.Conviction")}${group ? ` (${group.label})` : ""}: ${text}` });
  }
  const used = actor.getFlag(MODULE_ID, BUSSOLA_SCENE_FLAG);
  return { options, used: Boolean(used), usedLabel: clean(used?.label) };
}

/** La voce scelta nella finestra, se la casella è spuntata e la scena non l'ha già vista. */
export function bussolaChoice(result, bussola) {
  if (!bussola || bussola.used) return null;
  const checked = result?.bussola === true || result?.bussola === "on" || result?.bussola === "true";
  if (!checked) return null;
  return bussola.options.find((option) => option.id === String(result?.bussolaId ?? "")) ?? null;
}

/** Lo stesso, letto dal DOM della finestra (la conferma dei tiri di Abilità). */
export function readBussola(form, bussola) {
  const box = form?.querySelector?.("[name=\"bussola\"]");
  const pick = form?.querySelector?.("[name=\"bussolaId\"]");
  if (!box?.checked) return null;
  return bussolaChoice({ bussola: true, bussolaId: pick?.value ?? "" }, bussola);
}

/** I dadi in più della Bussola: uno, se la casella è spuntata. */
export function bussolaDice(form) {
  return form?.querySelector?.("[name=\"bussola\"]")?.checked ? BUSSOLA_DICE : 0;
}

/**
 * La Quintessenza della Bussola: a tiro fatto un punto risale sulla Ruota,
 * fino alle celle libere dal Paradosso. Torna il conto nuovo e se è salito.
 */
export function quintessenceAfterBussola(balance) {
  const taken = Math.max(Math.trunc(Number(balance?.paradox) || 0), Math.trunc(Number(balance?.floor) || 0), 0);
  const room = MAGICK_TRACK_MAX - taken;
  const current = Math.max(Math.trunc(Number(balance?.quintessence) || 0), 0);
  const next = Math.min(current + 1, room);
  return { quintessence: Math.max(next, Math.min(current, room)), gained: next > current };
}

export async function grantBussolaQuintessence(actor, option) {
  if (!option || !actor?.isOwner) return false;
  if (actor.getFlag(MODULE_ID, BUSSOLA_SCENE_FLAG)) return false;
  const balance = getMagickBalance(actor);
  const { quintessence, gained } = quintessenceAfterBussola(balance);
  await actor.setFlag(MODULE_ID, BUSSOLA_SCENE_FLAG, { used: true, label: option.label });
  if (!gained) {
    ui.notifications.info(game.i18n.localize("WOD5E_MAGE.Bussola.Full"));
    return false;
  }
  await actor.setFlag(MODULE_ID, "magickBalance", { quintessence, paradox: balance.paradox });
  ui.notifications.info(game.i18n.format("WOD5E_MAGE.Bussola.Gained", { label: option.label }));
  return true;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/**
 * Il blocco della finestra, uguale nel tiro di Areté e nella conferma dei
 * tiri di Abilità: la casella «Rispetta la Bussola?», la tendina di quale
 * voce, oppure la riga «già usata in questa scena» col tasto Nuova scena.
 */
export function renderBussolaBlock(bussola, localize = (key) => key) {
  const label = escapeHtml(localize("WOD5E_MAGE.Bussola.Ask"));
  if (!bussola?.options?.length) {
    return `<div class="wod5e-mage-bussola" title="${escapeHtml(localize("WOD5E_MAGE.Bussola.Hint"))}"><span class="wod5e-mage-arete-row-label">${label}</span> <em>${escapeHtml(localize("WOD5E_MAGE.Bussola.None"))}</em></div>`;
  }
  const options = bussola.options.map((option) => `<option value="${escapeHtml(option.id)}">${escapeHtml(option.label)}</option>`).join("");
  return `<div class="wod5e-mage-bussola" title="${escapeHtml(localize("WOD5E_MAGE.Bussola.Hint"))}">
    <div data-role="bussolaFresh"${bussola.used ? " hidden" : ""}>
        <label class="wod5e-mage-arete-conto-row wod5e-mage-bussola-toggle">
            <span class="wod5e-mage-arete-conto-control"><input type="checkbox" name="bussola" id="wod5e-mage-bussola"></span>
            <span class="wod5e-mage-arete-row-label">${label} <small>${escapeHtml(localize("WOD5E_MAGE.Bussola.Short"))}</small></span>
        </label>
        <select name="bussolaId" id="wod5e-mage-bussola-id" class="hidden" aria-label="${escapeHtml(localize("WOD5E_MAGE.Bussola.Pick"))}">${options}</select>
    </div>
    <div data-role="bussolaUsed" class="wod5e-mage-bussola-used"${bussola.used ? "" : " hidden"}>
        <span class="wod5e-mage-arete-row-label">${label}</span>
        <em>${escapeHtml(localize("WOD5E_MAGE.Bussola.Used"))}</em>
        <button type="button" data-role="bussolaReset" title="${escapeHtml(localize("WOD5E_MAGE.Bussola.NewSceneHint"))}"><i class="fa-solid fa-clapperboard" aria-hidden="true"></i> ${escapeHtml(localize("WOD5E_MAGE.Bussola.NewScene"))}</button>
    </div>
</div>`;
}

/**
 * La casella nella finestra: spuntata mostra la tendina di quale voce;
 * «Nuova scena» riarma. `onChange` avvisa chi tiene il conto dei dadi.
 */
export function wireBussola(root, actor, onChange = () => {}) {
  const box = root?.querySelector?.("[name=\"bussola\"]");
  const pick = root?.querySelector?.("[name=\"bussolaId\"]");
  if (box && pick) {
    box.addEventListener("change", () => {
      pick.classList.toggle("hidden", !box.checked);
      onChange();
    });
  }
  const reset = root?.querySelector?.("[data-role=bussolaReset]");
  reset?.addEventListener("click", async (event) => {
    event.preventDefault();
    if (!actor?.isOwner) return;
    await actor.unsetFlag(MODULE_ID, BUSSOLA_SCENE_FLAG);
    root.querySelector("[data-role=bussolaUsed]")?.setAttribute("hidden", "");
    root.querySelector("[data-role=bussolaFresh]")?.removeAttribute("hidden");
  });
}
