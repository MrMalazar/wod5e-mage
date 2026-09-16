/**
 * Il tiro composto sulla scheda (16/9): la parte che parla con Foundry.
 * Lo stato vive nella scheda (`sheet._tiro`), puro (tiro.js); qui stanno
 * i clic dei nove riquadri, il contesto per il riquadro del Tiro e il
 * lancio, che passa dal motore del ramo C senza finestra di conferma.
 */
import { MODULE_ID } from "./constants.js";
import {
  getArete,
  normalizeMagickRollOptions,
  prepareAreteTraits,
  recordEffect,
  THRESHOLD_CAP
} from "./arete.js";
import { FOCUS_FORMS } from "./focus.js";
import { addParadoxToBalance, getMagickBalance, paradoxGainForMagickType } from "./magick-balance.js";
import { findMageRollTrait, selectorsForMageRollTrait, skillRollCard } from "./mage-roll-selection.js";
import { findPotere, potereLabel, poteriOf } from "./poteri.js";
import { renderRollCard, ROLL_CARD_FLAG, rollSymbols } from "./roll-card.js";
import { SCOPE_ICONS, SCOPES, scopeReadings } from "./scopes.js";
import { prepareSpheres } from "./spheres.js";
import {
  bumpDifficulty,
  clearTiro,
  contoTiro,
  emptyTiro,
  EXTRA_DICE_CAP,
  isMagick,
  pickAttribute,
  pickPower,
  pickSkill,
  pickSpecialty,
  removePill,
  setDifficulty,
  setExtra,
  setKind,
  setQuintessence,
  setScope,
  TIRO_KINDS,
  tiroSize,
  toggleArete,
  togglePrize,
  toggleSforza,
  toggleSphere,
  toggleTrait
} from "./tiro.js";

/** Il tipo di tiro per i tre tasti: la casella del vecchio dialogo che accende. */
const KIND_OPTIONS = Object.freeze({
  accidentale: { coincidental: true },
  volgare: { vulgar: true },
  testimoni: { witnesses: true }
});

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

/** Lo stato del tiro della scheda, creato al primo uso. */
export function tiroOf(sheet) {
  sheet._tiro ??= emptyTiro();
  return sheet._tiro;
}

/** Il Tipo di Magick del Credo: l'Ibrida non prende il premio. */
function practiceForm(actor) {
  const stored = actor.getFlag(MODULE_ID, "focus")?.practiceForm;
  return FOCUS_FORMS.includes(stored) ? stored : "";
}

/** I dadi dei Tratti scelti: la somma dei bonus scritti sugli oggetti. */
export function traitDiceOf(actor, ids = []) {
  let total = 0;
  for (const id of ids) {
    const item = actor.items?.get?.(id);
    for (const bonus of item?.system?.bonuses ?? []) total += Math.trunc(Number(bonus?.value) || 0);
  }
  return total;
}

/**
 * I numeri della scheda che il conto vuole: Areté, Attributo, Abilità,
 * Tratti, Quintessenza sulla Ruota, Tipo del Credo, potere scelto.
 */
export function contoInputs(actor, tiro, { traits = null } = {}) {
  const known = traits ?? prepareAreteTraits(actor, { localize: game.i18n.localize.bind(game.i18n), lang: game.i18n.lang });
  const attribute = tiro.attribute ? findMageRollTrait(known, `attribute:${tiro.attribute}`) : null;
  const skill = tiro.skill ? findMageRollTrait(known, tiro.skill) : null;
  return {
    known,
    attribute,
    skill,
    inputs: {
      arete: getArete(actor).value,
      attributeValue: attribute?.value ?? 0,
      skillValue: skill?.value ?? 0,
      traitDice: traitDiceOf(actor, tiro.traits),
      quintessenceAvailable: getMagickBalance(actor).quintessence,
      form: practiceForm(actor),
      power: tiro.power ? findPotere(tiro.power) : null
    }
  };
}

/**
 * Il contesto del riquadro del Tiro: la catena a pillole coi nomi veri,
 * il conto, la Difficoltà (calcolata o a mano), la Quintessenza, i tasti.
 */
export function prepareTiroContext(actor, tiro, { traits = null } = {}) {
  const localize = game.i18n.localize.bind(game.i18n);
  const { known, attribute, skill, inputs } = contoInputs(actor, tiro, { traits });
  const conto = contoTiro(tiro, inputs);
  const arete = getArete(actor);
  // La catena non si stampa più (Blue, 16/9): quel che è scelto si vede
  // acceso nei riquadri, e in carta a tiro fatto.
  const magick = isMagick(tiro);
  return {
    magick,
    size: tiroSize(tiro),
    empty: tiroSize(tiro) === 0,
    kindLabel: localize(magick ? "WOD5E_MAGE.Tiro.KindMagick" : (tiro.attribute || tiro.skill ? "WOD5E_MAGE.Tiro.KindSkill" : "WOD5E_MAGE.Tiro.KindNone")),
    pool: conto.pool,
    computed: conto.computed,
    difficulty: conto.difficulty,
    manual: conto.manual,
    dice: conto.dice,
    impossible: conto.impossible && tiroSize(tiro) > 0,
    successFrom: conto.successFrom,
    prize: { on: Boolean(tiro.prize) && magick, value: conto.prize, arete: arete.value },
    quintessence: { value: tiro.quintessence, dice: conto.quintessence, available: inputs.quintessenceAvailable },
    extra: { value: tiro.extra, dice: conto.extra, cap: EXTRA_DICE_CAP },
    sforza: Boolean(tiro.sforza),
    kinds: TIRO_KINDS.map((kind) => ({ kind, label: localize(`WOD5E_MAGE.Tiro.Kinds.${kind}`), hint: localize(`WOD5E_MAGE.Tiro.KindHints.${kind}`) })),
    // Il tiro parte con almeno un tratto (Attributo o Abilità).
    ready: Boolean(attribute || skill),
    attributeLabel: attribute?.label ?? "",
    skillLabel: skill?.label ?? ""
  };
}

/** Le righe degli Ambiti per il riquadro della Magick: sette livelli, quello dichiarato acceso. */
export function prepareScopeRows(tiro, localize = (key) => key, { arete = null } = {}) {
  const readings = scopeReadings(localize, { arete });
  return SCOPES.map((id) => {
    const level = count(tiro?.scopes?.[id]);
    return {
      id,
      label: localize(`WOD5E_MAGE.Scopes.${id}`),
      faIcon: SCOPE_ICONS[id] ?? "",
      level,
      reading: level ? (readings[id]?.[level - 1] ?? []).map((entry) => (entry.sub ? `${entry.sub}: ${entry.text}` : entry.text)).join(" · ") : "",
      steps: Array.from({ length: THRESHOLD_CAP }, (_, index) => ({
        value: index + 1,
        active: index + 1 === level,
        lit: index + 1 <= level
      }))
    };
  }).sort((a, b) => a.label.localeCompare(b.label, game.i18n?.lang ?? "it"));
}

/** I poteri del personaggio per il riquadro: quelli delle Sfere che ha, col nome e lo stato «scelto». */
export function preparePoteriRows(actor, tiro, localize = (key) => key) {
  const spheres = prepareSpheres(actor).selected;
  const ratings = Object.fromEntries(spheres.map((sphere) => [sphere.id, sphere.value]));
  const order = spheres.map((sphere) => sphere.id);
  return poteriOf(ratings, { order }).map((power) => ({
    id: power.id,
    sphere: power.sphere,
    sphereLabel: localize(`WOD5E_MAGE.Spheres.${power.sphere}`),
    dot: power.dot,
    label: potereLabel(power, localize),
    placeholder: !String(power.name ?? "").trim(),
    text: power.text ?? "",
    selected: tiro?.power === power.id
  }));
}

/* ---------------------------------------------------------------- */
/* I clic della scheda: cambiano lo stato e ridisegnano la pagina.   */
/* ---------------------------------------------------------------- */

async function repaint(sheet, next) {
  sheet._tiro = next;
  await sheet.render({ parts: ["stats"] });
}

export async function onTiroArete(event) {
  event.preventDefault();
  return repaint(this, toggleArete(tiroOf(this)));
}

export async function onTiroPrize(event) {
  event.preventDefault();
  return repaint(this, togglePrize(tiroOf(this)));
}

export async function onTiroSphere(event, target) {
  event.preventDefault();
  return repaint(this, toggleSphere(tiroOf(this), target.dataset.sphere));
}

export async function onTiroScope(event, target) {
  event.preventDefault();
  return repaint(this, setScope(tiroOf(this), target.dataset.scope, target.dataset.level));
}

export async function onTiroAttribute(event, target) {
  event.preventDefault();
  return repaint(this, pickAttribute(tiroOf(this), target.dataset.attribute));
}

export async function onTiroSkill(event, target) {
  event.preventDefault();
  return repaint(this, pickSkill(tiroOf(this), target.dataset.key));
}

export async function onTiroSpecialty(event, target) {
  event.preventDefault();
  return repaint(this, pickSpecialty(tiroOf(this), target.dataset.key, target.dataset.specialty));
}

export async function onTiroTrait(event, target) {
  event.preventDefault();
  return repaint(this, toggleTrait(tiroOf(this), target.dataset.itemId));
}

export async function onTiroPower(event, target) {
  event.preventDefault();
  return repaint(this, pickPower(tiroOf(this), target.dataset.power));
}

export async function onTiroPill(event, target) {
  event.preventDefault();
  return repaint(this, removePill(tiroOf(this), { kind: target.dataset.kind, id: target.dataset.id, skill: target.dataset.skill }));
}

export async function onTiroClear(event) {
  event.preventDefault();
  return repaint(this, clearTiro());
}

/** Il più e il meno della Difficoltà partono dal conto; la matita azzera il numero scritto. */
export async function onTiroDifficulty(event, target) {
  event.preventDefault();
  const tiro = tiroOf(this);
  if (target.dataset.reset !== undefined) return repaint(this, setDifficulty(tiro, null));
  const { inputs } = contoInputs(this.actor, tiro);
  const computed = contoTiro(tiro, inputs).computed;
  return repaint(this, bumpDifficulty(tiro, Number(target.dataset.delta) || 0, computed));
}

export async function onTiroQuintessence(event, target) {
  event.preventDefault();
  const tiro = tiroOf(this);
  const available = getMagickBalance(this.actor).quintessence;
  const next = Math.min(Math.max(tiro.quintessence + (Number(target.dataset.delta) || 0), 0), available);
  return repaint(this, setQuintessence(tiro, next));
}

/** I dadi extra: l'Armonia e i dadi dati al tavolo, col più e il meno, fino a tre. */
export async function onTiroExtra(event, target) {
  event.preventDefault();
  const tiro = tiroOf(this);
  return repaint(this, setExtra(tiro, tiro.extra + (Number(target.dataset.delta) || 0)));
}

export async function onTiroSforza(event) {
  event.preventDefault();
  return repaint(this, toggleSforza(tiroOf(this)));
}

/** Apri il Grimorio: la pagina del Grimorio del personaggio. */
export async function onTiroGrimorio(event) {
  event.preventDefault();
  this.changeTab("grimorio", "primary");
}

/** La × del Grimorio: si torna alla prima pagina. */
export async function onGrimorioClose(event) {
  event.preventDefault();
  this.changeTab("stats", "primary");
}

/**
 * Il tiro: TIRA per l'Abilità, i tre tasti per la Magick (ognuno col suo
 * tipo). Il conto è quello del riquadro; niente finestra.
 */
export async function onTiroRoll(event, target) {
  event.preventDefault();
  const tiro = setKind(tiroOf(this), target.dataset.kind);
  const outcome = await launchTiro(this.actor, tiro);
  if (outcome) await repaint(this, clearTiro());
}

/* ---------------------------------------------------------------- */
/* Il lancio.                                                        */
/* ---------------------------------------------------------------- */

export async function launchTiro(actor, tiro) {
  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const { attribute, skill, inputs } = contoInputs(actor, tiro);
  const selectedTraits = [attribute, skill].filter(Boolean);
  if (!selectedTraits.length) {
    ui.notifications.warn(localize("WOD5E_MAGE.Arete.SelectTraitWarning"));
    return null;
  }
  const magick = isMagick(tiro);
  if (magick && !TIRO_KINDS.includes(tiro.kind)) {
    ui.notifications.warn(localize("WOD5E_MAGE.Tiro.KindWarning"));
    return null;
  }
  const conto = contoTiro(tiro, inputs);
  const arete = getArete(actor);
  const rollLabel = selectedTraits.map((trait) => trait.label).join(" + ") + (tiro.specialty ? ` · ${tiro.specialty}` : "");
  const selectors = [...new Set(selectedTraits.flatMap((trait) => selectorsForMageRollTrait(trait)))];
  const traitRows = selectedTraits.map((trait) => ({ id: trait.id, type: trait.type, label: trait.label, value: trait.value }));
  const chosenTraits = (tiro.traits ?? []).map((id) => actor.items?.get?.(id)).filter(Boolean);
  const { rollRamoCDirect } = await import("./paradox-dice.js");

  const bonusParts = [];
  if (conto.specialtyDice > 0) bonusParts.push(format("WOD5E_MAGE.Arete.SkillSpecialtyFlavor", { dice: conto.specialtyDice }));
  for (const item of chosenTraits) {
    const dice = traitDiceOf(actor, [item.id]);
    bonusParts.push(dice ? `${item.name} ${dice > 0 ? "+" : ""}${dice}` : item.name);
  }
  const notes = [];
  if (tiro.sforza) notes.push(localize("WOD5E_MAGE.Tiro.SforzaNote"));

  if (conto.extra > 0) bonusParts.push(format("WOD5E_MAGE.Tiro.ExtraFlavor", { dice: conto.extra }));

  // Il tiro di Abilità: niente rossi, riuscita dal 6, la Difficoltà solo a mano.
  if (!magick) {
    const card = skillRollCard({ traits: traitRows, flatMod: conto.bonus }, localize);
    try {
      return await rollRamoCDirect({
        actor,
        data: actor.system,
        pool: conto.pool,
        threshold: conto.difficulty,
        successFrom: conto.successFrom,
        paradoxRating: 0,
        skill: true,
        title: rollLabel,
        flavor: card,
        card: { symbols: [], traits: traitRows, tiro: { traits: chosenTraits.map((item) => item.id), specialty: tiro.specialty ?? "" } },
        activeModifiers: chosenTraits.map((item) => ({ label: item.name, value: `${traitDiceOf(actor, [item.id]) >= 0 ? "+" : ""}${traitDiceOf(actor, [item.id])}` })),
        notes
      });
    } catch (error) {
      console.warn("wod5e-mage | Tiro di Abilità interrotto.", error);
      return null;
    }
  }

  // La Magick: il tipo dai tre tasti, le Sfere senza livello, gli Ambiti a soglia.
  const options = normalizeMagickRollOptions(KIND_OPTIONS[tiro.kind] ?? {});
  const owned = prepareSpheres(actor).selected;
  const sphereEntries = (tiro.spheres ?? [])
    .map((id) => owned.find((sphere) => sphere.id === id))
    .filter(Boolean)
    .map((sphere) => ({ id: sphere.id, level: sphere.value }));
  const scopeLevels = Object.entries(tiro.scopes ?? {}).map(([id, level]) => ({ id, level: count(level) }));
  const magickType = localize(`WOD5E_MAGE.Tiro.Kinds.${tiro.kind}`);
  if (options.coincidental) selectors.push("magick.coincidental");
  if (options.vulgar) selectors.push("magick.vulgar");
  if (options.witnesses) selectors.push("magick.vulgar-with-witnesses");
  if (conto.quintessence > 0) bonusParts.push(format("WOD5E_MAGE.Arete.QuintessenceFlavor", { points: conto.quintessence }));
  const power = inputs.power;
  if (power) notes.push(format("WOD5E_MAGE.Tiro.PowerNote", { name: potereLabel(power, localize) }));
  if (conto.manual && conto.difficulty !== conto.computed) notes.push(format("WOD5E_MAGE.Tiro.ManualDifficultyNote", { computed: conto.computed, difficulty: conto.difficulty }));

  const card = renderRollCard({
    traits: traitRows,
    bonusParts,
    threshold: conto.difficulty,
    prize: conto.prize,
    magickType,
    goal: "",
    effectKind: "",
    spheres: sphereEntries.map((entry) => ({ id: entry.id, label: `WOD5E_MAGE.Spheres.${entry.id}`, level: entry.level })),
    scopes: scopeLevels.map((entry) => ({ id: entry.id, label: `WOD5E_MAGE.Scopes.${entry.id}`, level: entry.level }))
  }, localize);
  const symbols = rollSymbols({ spheres: sphereEntries, scopes: scopeLevels, prize: conto.prize });
  const effect = {
    vulgar: options.vulgar || options.witnesses,
    duration: count(tiro.scopes?.duration),
    threshold: conto.difficulty,
    goal: "",
    fallbackName: sphereEntries.map((entry) => localize(`WOD5E_MAGE.Spheres.${entry.id}`)).join(", ") || rollLabel
  };
  const sphereMax = Math.max(0, ...sphereEntries.map((entry) => entry.level));
  if (actor.isOwner) await actor.update({ [`flags.${MODULE_ID}.lastThreshold`]: conto.difficulty, [`flags.${MODULE_ID}.lastSphereMax`]: sphereMax });

  // La Ruota paga subito: la Quintessenza spesa scende, il Volgare sale verso il Paradosso.
  const paradoxGain = paradoxGainForMagickType(options);
  const balanceBefore = getMagickBalance(actor);
  let balanceMoved = false;
  if ((conto.quintessence > 0 || paradoxGain > 0) && actor.isOwner) {
    const spent = { quintessence: Math.max(balanceBefore.quintessence - conto.quintessence, 0), paradox: balanceBefore.paradox };
    const balanceAfter = addParadoxToBalance(spent, paradoxGain);
    if (balanceAfter.paradox !== balanceBefore.paradox || balanceAfter.quintessence !== balanceBefore.quintessence) {
      await actor.setFlag(MODULE_ID, "magickBalance", balanceAfter);
      balanceMoved = true;
      if (conto.quintessence > 0) ui.notifications.info(format("WOD5E_MAGE.Arete.QuintessenceSpent", { points: conto.quintessence }));
      if (paradoxGain > 0) ui.notifications.info(format("WOD5E_MAGE.MagickBalance.ParadoxGained", { amount: paradoxGain }));
    }
  }
  const paradoxRating = options.coincidental ? 0 : getMagickBalance(actor).paradox;

  let outcome = null;
  try {
    outcome = await rollRamoCDirect({
      actor,
      data: actor.system,
      pool: conto.pool,
      threshold: conto.difficulty,
      successFrom: conto.successFrom,
      paradoxRating,
      burn: conto.difficulty,
      sphereLevel: sphereMax,
      arete: arete.value,
      title: rollLabel,
      flavor: card,
      card: {
        symbols,
        traits: traitRows,
        vulgar: effect.vulgar,
        tiro: { power: tiro.power ?? "", traits: chosenTraits.map((item) => item.id), specialty: tiro.specialty ?? "", sforza: Boolean(tiro.sforza) }
      },
      activeModifiers: chosenTraits.map((item) => ({ label: item.name, value: `${traitDiceOf(actor, [item.id]) >= 0 ? "+" : ""}${traitDiceOf(actor, [item.id])}` })),
      notes
    });
  } catch (error) {
    console.warn("wod5e-mage | Tiro composto interrotto.", error);
  }
  if (!outcome) {
    if (balanceMoved) {
      await actor.setFlag(MODULE_ID, "magickBalance", balanceBefore);
      ui.notifications.info(localize("WOD5E_MAGE.MagickBalance.ParadoxReverted"));
    }
    return null;
  }
  // A tiro fatto: la Durata dichiarata scrive il lancio fra le Magick in atto.
  const total = Number(outcome?.getFlag?.(MODULE_ID, ROLL_CARD_FLAG)?.total);
  if (effect.vulgar && Number.isFinite(total) && total < 1 && actor.isOwner) {
    const { quintessenceAfterFailedVulgar } = await import("./arete.js");
    const balance = getMagickBalance(actor);
    const next = quintessenceAfterFailedVulgar(balance);
    if (next.gained) {
      await actor.setFlag(MODULE_ID, "magickBalance", { quintessence: next.quintessence, paradox: next.paradox });
      ui.notifications.info(localize("WOD5E_MAGE.RamoC.VulgarFailedQuintessence"));
    }
  }
  await recordEffect(actor, { maintained: false, maintainedName: "" }, effect);
  return outcome;
}
