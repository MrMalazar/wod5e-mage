/**
 * Il tiro composto (verdetti di Blue del 16/9/2026): la prima pagina della
 * scheda è un selettore. Il giocatore clicca l'Areté, le Sfere, i livelli
 * degli Ambiti, un Attributo, un'Abilità, una Specializzazione, i Tratti
 * che vuole e un solo potere; il riquadro del Tiro elenca la catena, fa il
 * conto e tira. Qui stanno lo stato e il conto, puri: la scheda li disegna
 * (tiro-scheda.js) e il lancio passa da paradox-dice.js.
 *
 * Le regole del conto:
 * - la soglia è la SOMMA dei livelli degli Ambiti dichiarati (Potenza 4 e
 *   Portata 3 fanno 7); un Ambito a 1 vale zero; le Sfere non contano;
 * - l'Areté si sottrae alla soglia, fino a zero, quando la narrazione lo
 *   merita e il Narratore dà l'ok: la casella del premio resta, accesa
 *   quando si clicca l'Areté, e si spegne se il Narratore dice di no;
 * - la difficoltà la fa il tipo di tiro: Accidentale e Volgare riescono
 *   col 6, Volgare con testimoni con l'8; i tiri di Abilità col 6;
 * - la Quintessenza dà dadi e basta, col tetto 2 + Areté per lancio;
 * - i dadi extra (l'Armonia, i dadi dati al tavolo) entrano fino a +3;
 *   i Tratti scelti entrano per intero;
 * - un potere solo per lancio: i suoi effetti li applica poteri.js, e il
 *   potere porta con sé la sua Sfera;
 * - un incantesimo del Grimorio entra tutto insieme (Blue, 16/9 sera):
 *   Areté, Sfere, Ambiti, Attributo, Abilità, premio e tipo com'erano
 *   scritti; poi si tira coi tre tasti;
 * - la Difficoltà scritta a mano sovrascrive quella calcolata;
 * - senza Difficoltà (a mano, o dagli Ambiti nella Magick) il tiro non
 *   parte (Blue, 16/9 sera).
 */
import { calculateAretePrize, calculateMagickThreshold, capBonusDice, SKILL_SPECIALTY_DICE, THRESHOLD_CAP } from "./arete.js";
import { BUSSOLA_DICE } from "./bussola.js";
import { applyPotere } from "./poteri.js";
import { ramoCDice, successThreshold, usesAdvancedDifficulty } from "./ramo-c.js";

/** I tre tasti del tiro di Magick, nell'ordine della scheda. */
export const TIRO_KINDS = Object.freeze(["accidentale", "volgare", "testimoni"]);

/** La Quintessenza per lancio: fino a 2 + Areté (raccolta del 14/9). */
export const QUINTESSENCE_BASE_CAP = 2;

/** I dadi extra per lancio: l'Armonia e i dadi dati al tavolo, fino a +3 (il tetto del tronco). */
export const EXTRA_DICE_CAP = 3;

/** Lo stato vuoto: niente cliccato, niente scritto a mano. */
export function emptyTiro() {
  return {
    arete: false,
    prize: false,
    spheres: [],
    scopes: {},
    attribute: null,
    skill: null,
    specialty: null,
    traits: [],
    power: null,
    difficulty: null,
    quintessence: 0,
    extra: 0,
    sforza: false,
    kind: null,
    spell: null
  };
}

function clone(tiro) {
  return {
    ...emptyTiro(),
    ...(tiro ?? {}),
    spheres: [...(tiro?.spheres ?? [])],
    scopes: { ...(tiro?.scopes ?? {}) },
    traits: [...(tiro?.traits ?? [])]
  };
}

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

/** L'Areté cliccato fa il tiro di Magick; senza, è un tiro di Abilità. */
export function isMagick(tiro) {
  return Boolean(tiro?.arete);
}

/**
 * L'Areté: acceso, il tiro è di Magick e il premio parte acceso (il
 * Narratore può spegnerlo). Spento, la Magick esce tutta dalla catena:
 * Sfere, Ambiti, potere, tipo, premio.
 */
export function toggleArete(tiro) {
  const next = clone(tiro);
  if (next.arete) {
    next.arete = false;
    next.prize = false;
    next.spheres = [];
    next.scopes = {};
    next.power = null;
    next.kind = null;
    return next;
  }
  next.arete = true;
  next.prize = true;
  return next;
}

/** La casella del premio: l'Areté sulla soglia, sì o no. Solo con l'Areté acceso. */
export function togglePrize(tiro) {
  const next = clone(tiro);
  if (!next.arete) return next;
  next.prize = !next.prize;
  return next;
}

function withMagick(next) {
  if (!next.arete) {
    next.arete = true;
    next.prize = true;
  }
  return next;
}

/** Una Sfera cliccata entra o esce; una Sfera in catena accende l'Areté. */
export function toggleSphere(tiro, id) {
  const next = clone(tiro);
  const key = String(id ?? "");
  if (!key) return next;
  if (next.spheres.includes(key)) {
    next.spheres = next.spheres.filter((sphere) => sphere !== key);
    return next;
  }
  next.spheres = [...next.spheres, key];
  return withMagick(next);
}

/**
 * Il livello di un Ambito si dichiara cliccando il numero: lo stesso numero
 * una seconda volta lo toglie. Un Ambito in catena accende l'Areté.
 */
export function setScope(tiro, id, level) {
  const next = clone(tiro);
  const key = String(id ?? "");
  const value = Math.min(count(level), THRESHOLD_CAP);
  if (!key) return next;
  if (!value || next.scopes[key] === value) {
    delete next.scopes[key];
    return next;
  }
  next.scopes[key] = value;
  return withMagick(next);
}

/** L'Attributo è uno: un secondo clic sullo stesso lo toglie. */
export function pickAttribute(tiro, id) {
  const next = clone(tiro);
  const key = String(id ?? "");
  next.attribute = next.attribute === key ? null : (key || null);
  return next;
}

/** L'Abilità è una (chiave `skill:id` o `custom:id`); cambiarla azzera la Specializzazione. */
export function pickSkill(tiro, key) {
  const next = clone(tiro);
  const value = String(key ?? "");
  if (next.skill === value || !value) {
    next.skill = null;
    next.specialty = null;
    return next;
  }
  next.skill = value;
  next.specialty = null;
  return next;
}

/** La Specializzazione dal cassetto: sceglie anche la sua Abilità; lo stesso nome la toglie. */
export function pickSpecialty(tiro, skillKey, name) {
  const next = clone(tiro);
  const key = String(skillKey ?? "");
  const value = String(name ?? "").trim();
  if (!key || !value) return next;
  if (next.skill === key && next.specialty === value) {
    next.specialty = null;
    return next;
  }
  next.skill = key;
  next.specialty = value;
  return next;
}

/** I Tratti sono più d'uno: ognuno entra o esce da sé. */
export function toggleTrait(tiro, id) {
  const next = clone(tiro);
  const key = String(id ?? "");
  if (!key) return next;
  next.traits = next.traits.includes(key)
    ? next.traits.filter((trait) => trait !== key)
    : [...next.traits, key];
  return next;
}

/** La Sfera di un potere dal suo id, quando l'id la dice («forces-2-1» → «forces»; gli id dei poteri inseriti dal 21/9 non la dicono: arriva a parte). */
export function powerSphere(id) {
  const match = /^([a-z]+)-\d+-\d+$/.exec(String(id ?? ""));
  return match ? match[1] : "";
}

/**
 * Il potere è uno solo per lancio: un altro lo sostituisce, lo stesso lo
 * toglie. Il potere porta con sé la sua Sfera (dal cassetto della Sfera,
 * 16/9 sera): se non è in catena, entra. La Sfera arriva con `sphere`
 * (la casella la porta); senza, si legge dall'id se è di quella forma.
 */
export function pickPower(tiro, id, sphere = "") {
  const next = clone(tiro);
  const key = String(id ?? "");
  if (!key || next.power === key) {
    next.power = null;
    return next;
  }
  next.power = key;
  const owner = String(sphere ?? "") || powerSphere(key);
  if (owner && !next.spheres.includes(owner)) next.spheres = [...next.spheres, owner];
  return withMagick(next);
}

/** Il tipo di tiro con cui un incantesimo è stato scritto, nei nomi dei tre tasti. */
const KIND_OF_MAGICK_TYPE = Object.freeze({ coincidental: "accidentale", vulgar: "volgare", witnesses: "testimoni" });

/**
 * Un incantesimo del Grimorio entra nel compositore tutto insieme: Areté
 * acceso, le sue Sfere (solo quelle che il personaggio ha, se `owned` le
 * elenca), i suoi Ambiti, l'Attributo e l'Abilità com'erano scritti, il
 * premio e il tipo (i tre tasti restano da premere). Lo stesso incantesimo
 * cliccato di nuovo si toglie: torna tutto vuoto.
 */
export function loadSpell(tiro, id, spell, { owned = null } = {}) {
  const key = String(id ?? "");
  if (!key || tiro?.spell === key) return clearTiro();
  const next = clearTiro();
  next.arete = true;
  next.prize = Boolean(spell?.prize);
  next.spheres = Object.entries(spell?.spheres ?? {})
    .filter(([sphere, level]) => count(level) > 0 && (!Array.isArray(owned) || owned.includes(sphere)))
    .map(([sphere]) => sphere);
  for (const [scope, level] of Object.entries(spell?.scopes ?? {})) {
    const value = Math.min(count(level), THRESHOLD_CAP);
    if (value > 0) next.scopes[scope] = value;
  }
  for (const trait of spell?.traits ?? []) {
    const traitKey = String(trait?.key ?? "");
    if (traitKey.startsWith("attribute:")) next.attribute ??= traitKey.slice("attribute:".length) || null;
    else if (traitKey.startsWith("skill:") || traitKey.startsWith("custom:")) next.skill ??= traitKey;
  }
  next.kind = KIND_OF_MAGICK_TYPE[String(spell?.magickType ?? "")] ?? null;
  next.spell = key;
  return next;
}

/**
 * La Difficoltà c'è (Blue, 16/9 sera: senza, il tiro non parte): un numero
 * scritto a mano col meno e il più, oppure, nella Magick, almeno un Ambito
 * dichiarato (la soglia la fanno gli Ambiti). Un tiro di Abilità la vuole
 * sempre a mano.
 */
export function hasDifficulty(tiro) {
  const manual = tiro?.difficulty !== null && tiro?.difficulty !== undefined;
  if (manual) return true;
  if (!isMagick(tiro)) return false;
  return Object.values(tiro?.scopes ?? {}).some((level) => count(level) >= 1);
}

/** La Difficoltà a mano: un numero la fissa, null torna al conto. */
export function setDifficulty(tiro, value) {
  const next = clone(tiro);
  next.difficulty = value === null || value === undefined || value === "" ? null : count(value);
  return next;
}

/** Il più e il meno della Difficoltà partono dal conto, se non c'è ancora un numero scritto. */
export function bumpDifficulty(tiro, delta, computed = 0) {
  const start = tiro?.difficulty === null || tiro?.difficulty === undefined ? count(computed) : count(tiro.difficulty);
  return setDifficulty(tiro, Math.max(start + Math.trunc(Number(delta) || 0), 0));
}

export function setQuintessence(tiro, value) {
  const next = clone(tiro);
  next.quintessence = count(value);
  return next;
}

/** I dadi extra: da zero a EXTRA_DICE_CAP. */
export function setExtra(tiro, value) {
  const next = clone(tiro);
  next.extra = Math.min(count(value), EXTRA_DICE_CAP);
  return next;
}

export function toggleSforza(tiro) {
  const next = clone(tiro);
  next.sforza = !next.sforza;
  return next;
}

/** Il tipo di tiro di Magick, dai tre tasti. */
export function setKind(tiro, kind) {
  const next = clone(tiro);
  next.kind = TIRO_KINDS.includes(kind) ? kind : null;
  return next;
}

/** La × su una pillola: toglie quel pezzo e basta. */
export function removePill(tiro, pill) {
  switch (pill?.kind) {
    case "arete": return toggleArete(tiro);
    case "sphere": return toggleSphere(tiro, pill.id);
    case "scope": return setScope(tiro, pill.id, 0);
    case "attribute": return pickAttribute(tiro, pill.id);
    case "skill": return pickSkill(tiro, pill.id);
    case "specialty": return pickSpecialty(tiro, pill.skill, pill.id);
    case "trait": return toggleTrait(tiro, pill.id);
    case "power": return pickPower(tiro, pill.id);
    default: return clone(tiro);
  }
}

/** Azzera: tutto vuoto, come all'apertura. */
export function clearTiro() {
  return emptyTiro();
}

/** Quanti pezzi sono in catena: zero vuol dire niente da tirare. */
export function tiroSize(tiro) {
  return (tiro?.arete ? 1 : 0)
    + (tiro?.spheres?.length ?? 0)
    + Object.keys(tiro?.scopes ?? {}).length
    + (tiro?.attribute ? 1 : 0)
    + (tiro?.skill ? 1 : 0)
    + (tiro?.specialty ? 1 : 0)
    + (tiro?.traits?.length ?? 0)
    + (tiro?.power ? 1 : 0);
}

/**
 * La catena a pillole, nell'ordine in cui la scheda la stampa: Areté,
 * Sfere, Ambiti col livello, Attributo, Abilità, Specializzazione, potere,
 * Tratti. `names` dice come si chiama ogni pezzo e quanto vale:
 * { arete: {label, value}, spheres: {id: label}, scopes: {id: label},
 *   attributes: {id: {label, value}}, skills: {key: {label, value}},
 *   power: {id: label}, traits: {id: {label, value}} }.
 * Torna [{ kind, id, label, value?, level?, skill? }].
 */
export function pillsOf(tiro, names = {}) {
  const pills = [];
  const name = (table, id, fallback = id) => {
    const entry = table?.[id];
    if (entry === undefined || entry === null) return { label: String(fallback), value: null };
    if (typeof entry === "object") return { label: String(entry.label ?? fallback), value: entry.value ?? null };
    return { label: String(entry), value: null };
  };
  if (tiro?.arete) {
    pills.push({ kind: "arete", id: "arete", label: String(names.arete?.label ?? "arete"), value: names.arete?.value ?? null });
  }
  for (const id of tiro?.spheres ?? []) {
    pills.push({ kind: "sphere", id, ...name(names.spheres, id) });
  }
  for (const [id, level] of Object.entries(tiro?.scopes ?? {})) {
    pills.push({ kind: "scope", id, ...name(names.scopes, id), level: count(level) });
  }
  if (tiro?.attribute) {
    pills.push({ kind: "attribute", id: tiro.attribute, ...name(names.attributes, tiro.attribute) });
  }
  if (tiro?.skill) {
    pills.push({ kind: "skill", id: tiro.skill, ...name(names.skills, tiro.skill) });
  }
  if (tiro?.skill && tiro?.specialty) {
    pills.push({ kind: "specialty", id: tiro.specialty, skill: tiro.skill, label: tiro.specialty, value: SKILL_SPECIALTY_DICE });
  }
  if (tiro?.power) {
    pills.push({ kind: "power", id: tiro.power, ...name(names.power, tiro.power) });
  }
  for (const id of tiro?.traits ?? []) {
    pills.push({ kind: "trait", id, ...name(names.traits, id) });
  }
  return pills;
}

/** La Quintessenza che entra davvero: quanta se ne chiede, quanta c'è sulla Ruota, il tetto 2 + Areté. */
export function quintessenceDice(requested, { available = 0, arete = 0 } = {}) {
  const cap = QUINTESSENCE_BASE_CAP + count(arete);
  return Math.min(count(requested), count(available), cap);
}

/**
 * Il conto del tiro composto. Prende lo stato e i numeri della scheda:
 * arete, attributeValue, skillValue, traitDice (la somma dei Tratti scelti),
 * harmony, bussola (1 se rispettata), quintessenceAvailable, form (il Tipo
 * di Magick del Credo: l'Ibrida non prende il premio), power (il potere
 * scelto, per i suoi effetti).
 * Torna riserva, soglia dagli Ambiti, premio, soglia calcolata, difficoltà
 * effettiva (scritta a mano o calcolata), dadi, riuscita da (6 o 8),
 * Quintessenza spesa e la nota del potere.
 */
export function contoTiro(tiro, {
  arete = 0,
  attributeValue = 0,
  skillValue = 0,
  traitDice = 0,
  harmony = 0,
  bussola = 0,
  quintessenceAvailable = 0,
  form = "",
  power = null
} = {}) {
  const magick = isMagick(tiro);
  const areteValue = count(arete);
  const specialtyDice = tiro?.skill && tiro?.specialty ? SKILL_SPECIALTY_DICE : 0;
  const bussolaDice = count(bussola) > 0 ? BUSSOLA_DICE : 0;
  const quintessence = magick ? quintessenceDice(tiro?.quintessence, { available: quintessenceAvailable, arete: areteValue }) : 0;
  const extra = capBonusDice(count(harmony) + count(tiro?.extra));
  const traits = count(attributeValue) + count(skillValue);
  const bonus = extra + Math.trunc(Number(traitDice) || 0) + specialtyDice + bussolaDice + quintessence;
  const pool = Math.max(traits + bonus, 0);

  const scopeLevels = Object.entries(tiro?.scopes ?? {}).map(([id, level]) => ({ id, level: count(level) }));
  const scopeThreshold = magick ? calculateMagickThreshold({ scopeLevels }) : 0;
  const prize = magick && tiro?.prize ? calculateAretePrize(areteValue, form) : 0;
  const base = magick ? calculateMagickThreshold({ scopeLevels, prize }) : 0;
  const powered = magick && power ? applyPotere({ threshold: base, dice: 0, difficulty: null }, power) : { threshold: base, dice: 0, difficulty: null, notes: [] };
  const computed = count(powered.threshold);
  const manual = tiro?.difficulty !== null && tiro?.difficulty !== undefined;
  const difficulty = manual ? count(tiro.difficulty) : computed;
  const conto = ramoCDice(pool + count(powered.dice), difficulty);
  const successFrom = powered.difficulty ?? successThreshold(magick && usesAdvancedDifficulty({ witnesses: tiro?.kind === "testimoni" }));

  return {
    magick,
    traits,
    bonus,
    specialtyDice,
    bussolaDice,
    quintessence,
    extra,
    pool: conto.pool,
    scopeThreshold,
    prize,
    computed,
    manual,
    difficultySet: hasDifficulty(tiro),
    difficulty,
    dice: conto.dice,
    impossible: conto.dice === 0,
    successFrom,
    powerNotes: powered.notes ?? []
  };
}
