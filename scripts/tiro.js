/**
 * Il tiro composto (verdetti di Blue del 16/9/2026): la prima pagina della
 * scheda è un selettore. Il giocatore clicca l'Areté, le Sfere, i livelli
 * degli Ambiti, un Attributo, un'Abilità, una Specializzazione, i Tratti
 * che vuole e un solo potere; il riquadro del Tiro elenca la catena, fa il
 * conto e tira. Qui stanno lo stato e il conto, puri: la scheda li disegna
 * (tiro-scheda.js) e il lancio passa da paradox-dice.js.
 *
 * Le regole del conto sono quelle del Sistema (14/11/2026; sistema.js):
 * - si tira TUTTA la riserva: Attributo più Abilità, il dado della
 *   Specializzazione, i bonus e i malus; la soglia non toglie più dadi, è
 *   il numero di successi che servono;
 * - i bonus stanno dentro un tetto di +3 dadi: l'Armonia, i dadi dati al
 *   tavolo e la Quintessenza spesa nei lanci (un dado per punto; Blue,
 *   15/11: dentro il tetto). Fuori dal tetto il dado della Bussola e i dadi
 *   dei Vantaggi, fino a 5;
 * - nei tiri di Abilità la soglia la dice il Narratore, da 1 a 7, e si
 *   scrive a mano: senza, il tiro non parte (Blue, 16/9 sera);
 * - nella Magick la soglia è il conto degli Ambiti: il più alto, Epicità
 *   compresa, più 1 per ogni altro Ambito sopra il livello dell'Areté, e
 *   si ferma a 10; la soglia a mano è la difficoltà che il Narratore alza o
 *   abbassa, liberamente (Blue, 15/11): oltre +3 o −3 il numero diventa
 *   rosso, a ricordare che si è fuori dal metro delle penalità;
 * - il premio dell'Areté abbassa la soglia di quant'è l'Areté, quando la
 *   narrazione lo merita e il Narratore dà l'ok: la casella resta, accesa
 *   quando si clicca l'Areté; la soglia di un lancio non scende sotto 1;
 * - un dado riesce sempre dal 6: il dado che riusciva dall'8 è uscito dal
 *   gioco, coi testimoni e con le Condizioni;
 * - un potere solo per lancio: i suoi effetti li applica poteri.js, e il
 *   potere porta con sé la sua Sfera. Finché il catalogo non passa al
 *   Sistema, la soglia che un potere spostava si gira in dadi (uno sconto
 *   di 2 sono 2 dadi in più), e la riuscita dall'8 che dava non c'è più;
 * - un incantesimo del Grimorio entra tutto insieme (Blue, 16/9 sera):
 *   Areté, Sfere, Ambiti, Attributo, Abilità, premio e tipo com'erano
 *   scritti;
 * - le Condizioni che pesano sul tipo del tiro: al primo grado tolgono 2
 *   dadi (1 le lievi), al secondo dimezzano la riserva, per difetto e per
 *   ultima, al terzo il tiro fallisce; ognuna si toglie con un clic quando
 *   non c'entra.
 */
import { calculateAretePrize, capBonusDice, SKILL_SPECIALTY_DICE, THRESHOLD_CAP } from "./arete.js";
import { BUSSOLA_DICE } from "./bussola.js";
import { applyPotere, riuscitaSenzaTirare, spezzaIdPotere } from "./poteri.js";
import { ambitiDelLancio, normalizeScopeLevels, SCOPE_ALIASES } from "./scopes.js";
import {
  BONUS_MAX,
  contoAmbiti,
  MALUS_DIFFICOLTA_MAX,
  oltreIlMetro,
  RIUSCITA_DA,
  SOGLIA_ABILITA_MAX,
  SOGLIA_MAGICK_MAX,
  SOGLIA_MIN,
  sogliaMagick,
  VANTAGGI_MAX
} from "./sistema.js";

/** I tre tasti del tiro di Magick, nell'ordine della scheda. */
export const TIRO_KINDS = Object.freeze(["accidentale", "volgare", "testimoni"]);

/** I dadi extra per lancio: l'Armonia e i dadi dati al tavolo. Stanno nel tetto dei +3, con la Quintessenza. */
export const EXTRA_DICE_CAP = BONUS_MAX;

/** Il ritocco dei Dadi (23/9): dadi in più o in meno sul totale, fuori dalla riserva e dal tetto, entro ±10. */
export const DADI_ADJUST_CAP = 10;

/** La soglia a mano nella Magick: la difficoltà che il Narratore alza o abbassa sopra il conto degli Ambiti. È libera (Blue, 15/11): ±20 è solo il fondo corsa del tasto. */
export const SOGLIA_MANO_CAP = 20;

/** Il metro delle penalità sulla difficoltà: oltre ±3 la soglia a mano si segna in rosso. */
export const SOGLIA_MANO_METRO = MALUS_DIFFICOLTA_MAX;

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
    // Il potere vale anche fuori dalla Magick (tappa 3): non accende l'Areté e resta quando si spegne.
    powerAny: false,
    // La soglia a mano (30/9): null finché non si tocca; poi l'addendo sopra il conto degli Ambiti.
    soglia: null,
    quintessence: 0,
    // La dissonanza (il Sistema): il lancio stride con la realtà intorno, e un Volgare dà 1 Paradosso in più.
    dissonanza: false,
    extra: 0,
    dadi: 0,
    // L'Indulgere (3/10): "", oppure il lato dichiarato, "hubris" o "silenzio".
    indulgi: "",
    kind: null,
    spell: null,
    // L'effetto caricato che non sta nel Grimorio (una Formula dalla pagina, 26/9): viaggia qui.
    spellData: null,
    // Le Condizioni tolte a mano da questo tiro (29/9): { id: false }; le altre pesano.
    condizioni: {}
  };
}

function clone(tiro) {
  return {
    ...emptyTiro(),
    ...(tiro ?? {}),
    spheres: [...(tiro?.spheres ?? [])],
    // Gli Ambiti coi nomi di oggi: l'Area di ieri è il livello dei Bersagli (23/9).
    scopes: normalizeScopeLevels(tiro?.scopes ?? {}),
    traits: [...(tiro?.traits ?? [])],
    condizioni: { ...(tiro?.condizioni ?? {}) }
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
 * Sfere, Ambiti, potere, tipo, premio. Resta il potere che vale anche
 * nei tiri di Abilità (tappa 3).
 */
export function toggleArete(tiro) {
  const next = clone(tiro);
  if (next.arete) {
    next.arete = false;
    next.prize = false;
    next.spheres = [];
    next.scopes = {};
    if (!next.powerAny) next.power = null;
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
 * L'Epicità tolta torna a 1, il minimo di ogni lancio (2/10): il conto la
 * mette da sé.
 */
export function setScope(tiro, id, level) {
  const next = clone(tiro);
  const key = SCOPE_ALIASES[String(id ?? "")] ?? String(id ?? "");
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
 * Con `any` (tappa 3: il potere vale anche nei tiri di Abilità) il potere
 * entra da solo: niente Areté acceso, niente Sfera in catena.
 */
export function pickPower(tiro, id, sphere = "", { any = false } = {}) {
  const next = clone(tiro);
  const key = String(id ?? "");
  if (!key || next.power === key) {
    next.power = null;
    next.powerAny = false;
    return next;
  }
  next.power = key;
  next.powerAny = Boolean(any);
  if (any) return next;
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
  // Gli Ambiti dell'incantesimo coi nomi di oggi (l'Area di ieri sta nei Bersagli).
  for (const [scope, level] of Object.entries(normalizeScopeLevels(spell?.scopes ?? {}))) {
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
  next.spellData = spell ? { ...spell } : null;
  return next;
}

/** La soglia a mano c'è: il meno o il più l'hanno toccata (anche a zero). */
export function sogliaAMano(tiro) {
  return tiro?.soglia !== null && tiro?.soglia !== undefined;
}

/**
 * La soglia c'è (Blue, 16/9 sera: senza, il tiro non parte): scritta a mano
 * col meno e il più, oppure, nella Magick, sempre: l'Epicità (2/10) vale
 * almeno 1 in ogni lancio. Un tiro di Abilità la vuole sempre a mano.
 */
export function hasSoglia(tiro) {
  if (sogliaAMano(tiro)) return true;
  return isMagick(tiro);
}

/**
 * La soglia a mano; null la toglie. In un tiro di Abilità è la soglia
 * intera, quella che dice il Narratore: da 1 a 7, mai sotto e mai sopra.
 * Nella Magick è la difficoltà in più o in meno sopra il conto degli
 * Ambiti: il Narratore la sposta liberamente (il tasto arriva a ±20).
 */
export function setSoglia(tiro, value) {
  const next = clone(tiro);
  if (value === null || value === undefined || value === "") {
    next.soglia = null;
    return next;
  }
  const wanted = Math.trunc(Number(value) || 0);
  next.soglia = isMagick(next)
    ? Math.max(Math.min(wanted, SOGLIA_MANO_CAP), -SOGLIA_MANO_CAP)
    : Math.max(Math.min(wanted, SOGLIA_ABILITA_MAX), SOGLIA_MIN);
  return next;
}

/** Il più e il meno della soglia a mano: da zero, se non è ancora stata toccata. */
export function bumpSoglia(tiro, delta) {
  const start = sogliaAMano(tiro) ? Math.trunc(Number(tiro.soglia) || 0) : 0;
  return setSoglia(tiro, start + Math.trunc(Number(delta) || 0));
}

export function setQuintessence(tiro, value) {
  const next = clone(tiro);
  next.quintessence = count(value);
  return next;
}

/**
 * La dissonanza con la realtà intorno (il Sistema: «evocare acqua in un
 * vulcano»): aggrava un lancio Volgare di 1 punto di Paradosso. Senza
 * valore si gira; l'Accidentale non la sente.
 */
export function setDissonanza(tiro, on) {
  const next = clone(tiro);
  next.dissonanza = on === undefined ? !next.dissonanza : Boolean(on);
  return next;
}

/** I dadi extra: da zero a EXTRA_DICE_CAP. */
export function setExtra(tiro, value) {
  const next = clone(tiro);
  next.extra = Math.min(count(value), EXTRA_DICE_CAP);
  return next;
}

/** L'Indulgere (3/10): il lato dichiarato prima del lancio, o niente. */
export function setIndulgi(tiro, lato) {
  const next = clone(tiro);
  next.indulgi = lato === "hubris" || lato === "silenzio" ? lato : "";
  return next;
}

/**
 * Una Condizione sul tiro (29/9): un clic la toglie da questo tiro, perché
 * non c'entra con quello che il personaggio fa; un altro la rimette.
 */
export function toggleCondizioneTiro(tiro, id) {
  const next = clone(tiro);
  const key = String(id ?? "");
  if (!key) return next;
  if (next.condizioni[key] === false) delete next.condizioni[key];
  else next.condizioni[key] = false;
  return next;
}

/**
 * Il ritocco dei Dadi (Blue, 23/9: «più e meno modificabili manualmente a
 * ognuno degli elementi»): dadi in più o in meno sul totale, fuori dalla
 * riserva e dal tetto +3, come i dadi che il Narratore dà col verdetto.
 */
export function setDadi(tiro, value) {
  const next = clone(tiro);
  const wanted = Math.trunc(Number(value) || 0);
  next.dadi = Math.max(Math.min(wanted, DADI_ADJUST_CAP), -DADI_ADJUST_CAP);
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
    // L'incantesimo ha caricato tutto: la sua × svuota il compositore.
    case "spell": return clearTiro();
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
  // L'incantesimo del Grimorio, in testa: la sua × svuota tutto.
  if (tiro?.spell) {
    pills.unshift({ kind: "spell", id: tiro.spell, ...name(names.spells, tiro.spell) });
  }
  return pills;
}

/**
 * La Quintessenza che entra davvero in dadi: quanta se ne chiede, quanta ce
 * n'è sulla Ruota, e il posto che resta nel tetto dei +3 dopo i dadi extra.
 * Sono anche i punti che si spendono: oltre il tetto non serve pagarla.
 */
export function quintessenceDice(requested, { available = 0, extra = 0 } = {}) {
  return Math.min(count(requested), count(available), Math.max(BONUS_MAX - count(extra), 0));
}

/**
 * La lettura di «non conta sino al livello N» (tappa 3): i livelli fino a
 * N non contano, sopra N conta l'eccedenza (Potenza 5 con N 4 vale 1).
 * L'altra lettura (sopra N l'Ambito conta per intero) aspetta il verdetto
 * di Blue: qui si cambia in un punto solo.
 */
export function livelloContato(level, free) {
  return Math.max(count(level) - count(free), 0);
}

/**
 * Il conto del tiro composto. Prende lo stato e i numeri della scheda:
 * arete, attributeValue, skillValue, traitDice (la somma dei Tratti scelti),
 * harmony, bussola (1 se rispettata), quintessenceAvailable, power (il
 * potere scelto, per i suoi effetti) e powerCtx (quello che le sue condizioni
 * chiedono: Sfere conosciute, poteri per Sfera, Salute sotto metà).
 * Torna la riserva, i dadi che si tirano (`pool` e `dice`: tutta la riserva),
 * la soglia (`difficulty`: i successi che servono), il conto degli Ambiti,
 * il premio, la Quintessenza spesa in dadi, le note del potere, gli effetti
 * esclusi col motivo, la riuscita senza tirare e se il potere è entrato
 * «attivo» (si paga il suo costo e si conta l'uso). `condizioni` è il conto
 * delle Condizioni sul tiro (condizioniDelTiro): i dadi che tolgono, la
 * riserva dimezzata, il tiro che fallisce.
 */
export function contoTiro(tiro, {
  arete = 0,
  attributeValue = 0,
  skillValue = 0,
  traitDice = 0,
  harmony = 0,
  bussola = 0,
  quintessenceAvailable = 0,
  power = null,
  powerCtx = {},
  condizioni = null
} = {}) {
  const magick = isMagick(tiro);
  const areteValue = count(arete);
  const specialtyDice = tiro?.skill && tiro?.specialty ? SKILL_SPECIALTY_DICE : 0;
  const bussolaDice = count(bussola) > 0 ? BUSSOLA_DICE : 0;

  // Il potere scelto (tappa 3): i suoi effetti, giudicati su questo tiro.
  const ctx = {
    ...powerCtx,
    magick,
    variant: spezzaIdPotere(tiro?.power).variant,
    skillValue: count(skillValue),
    skill: tiro?.skill ?? "",
    spell: tiro?.spell ?? "",
    scopes: tiro?.scopes ?? {}
  };
  // Il premio dell'Areté (il Sistema): abbassa la soglia di quant'è l'Areté. Vale per ogni
  // Tipo di Magick, l'Ibrida compresa (Blue, 2/10); il premio doppio (Voce dell'Avatar) la abbassa del doppio.
  const prizeBase = magick && tiro?.prize ? calculateAretePrize(areteValue) : 0;
  const powered = applyPotere({ threshold: 0, dice: 0, difficulty: null, prize: prizeBase }, power, ctx);
  const prize = magick ? count(powered.prize) : 0;

  // Dentro il tetto dei +3: l'Armonia e i dadi dati al tavolo, poi la Quintessenza (Blue, 15/11).
  // La Quintessenza dà dadi nei lanci di Magick; in un tiro di Abilità solo col potere che lo dice.
  const extra = capBonusDice(count(harmony) + count(tiro?.extra));
  const quintessenceAllowed = magick || Boolean(powered.quintessenceOnSkills);
  const quintessence = quintessenceAllowed ? quintessenceDice(tiro?.quintessence, { available: quintessenceAvailable, extra }) : 0;
  // Fuori dal tetto: la Specializzazione, la Bussola e i Vantaggi, che arrivano a 5 (in meno non hanno tetto).
  const vantaggi = Math.min(Math.trunc(Number(traitDice) || 0), VANTAGGI_MAX);
  const traits = count(attributeValue) + count(skillValue);
  const bonus = extra + quintessence + vantaggi + specialtyDice + bussolaDice;
  const riserva = Math.max(traits + bonus, 0);
  // Il potere, finché il catalogo non passa al Sistema: i suoi dadi, e la soglia che spostava girata in dadi.
  const powerDice = count(powered.dice) - Math.trunc(Number(powered.thresholdDelta) || 0);

  // Il ritocco dei Dadi (23/9): sul totale, fuori dal tetto, anche in meno.
  const adjust = Math.max(Math.min(Math.trunc(Number(tiro?.dadi) || 0), DADI_ADJUST_CAP), -DADI_ADJUST_CAP);
  // Le Condizioni: i dadi in meno, la riserva dimezzata (per ultima, per difetto), il tiro che fallisce.
  const condDadi = Math.min(Math.trunc(Number(condizioni?.dadi) || 0), 0);
  const dimezza = Boolean(condizioni?.dimezza);
  const fallisce = Boolean(condizioni?.fallisce);
  // La riserva com'è nella colonna del riquadro: i tratti, i bonus, i dadi del potere e le Condizioni
  // in meno; il ritocco sta a parte, nella riga del totale.
  const riservaTotale = Math.max(riserva + powerDice + condDadi, 0);
  const senzaCondizioni = Math.max(riserva + powerDice + adjust, 0);
  const prima = Math.max(riserva + powerDice + condDadi + adjust, 0);
  const dadi = dimezza ? Math.floor(prima / 2) : prima;

  // La soglia. Nella Magick il conto degli Ambiti (gli Ambiti che il potere fa saltare fino a un
  // livello contano per l'eccedenza), la difficoltà a mano e il premio; nell'Abilità quella a mano.
  const scopeLevels = magick ? ambitiDelLancio(tiro?.scopes) : [];
  const countedLevels = scopeLevels.map(({ id, level }) => ({ id, level: livelloContato(level, powered.freeScopes[id]) }));
  const manual = sogliaAMano(tiro);
  const sogliaMano = manual ? Math.trunc(Number(tiro.soglia) || 0) : 0;
  const scopeThreshold = magick ? contoAmbiti(scopeLevels, areteValue).soglia : 0;
  const lancio = magick
    ? sogliaMagick({ ambiti: countedLevels, arete: areteValue, premio: prize, mano: sogliaMano })
    : null;
  // La soglia senza la mano del Narratore: serve a chi deve dire di quanto la si è spostata.
  const sogliaSenzaMano = magick ? Math.max(sogliaMagick({ ambiti: countedLevels, arete: areteValue, premio: prize }).soglia, SOGLIA_MIN) : 0;
  // Il conto degli Ambiti col potere dentro, prima della difficoltà a mano e del premio.
  const computed = lancio ? Math.min(lancio.grezzo, SOGLIA_MAGICK_MAX) : 0;
  const difficulty = magick
    ? Math.max(lancio.soglia, SOGLIA_MIN)
    : (manual ? Math.max(Math.min(sogliaMano, SOGLIA_ABILITA_MAX), SOGLIA_MIN) : 0);

  // La riuscita senza tirare, a conto fatto (le condizioni sui dadi si giudicano qui).
  const riuscitaConto = riuscitaSenzaTirare(powered.autoSuccess, dadi);
  // Una Condizione che fa fallire vince anche sulla riuscita senza tirare.
  const riuscita = fallisce ? { ok: false, nota: "", motivo: "" } : riuscitaConto;

  return {
    magick,
    traits,
    bonus,
    specialtyDice,
    bussolaDice,
    vantaggi,
    quintessence,
    quintessenceAllowed,
    extra,
    // La riserva com'è (Attributo + Abilità + bonus), prima del potere, delle Condizioni e del ritocco.
    riserva,
    riservaTotale,
    // I dadi che si tirano: tutta la riserva. La soglia non ne toglie.
    pool: dadi,
    scopeThreshold,
    prize,
    computed,
    manual,
    sogliaMano,
    // La mano del Narratore oltre il metro delle penalità (±3): il numero va in rosso.
    sogliaManoOltre: magick && oltreIlMetro(sogliaMano),
    sogliaSenzaMano,
    difficultySet: hasSoglia(tiro),
    difficulty,
    dice: fallisce ? 0 : dadi,
    adjust,
    impossible: fallisce || (dadi === 0 && !riuscita.ok),
    successFrom: RIUSCITA_DA,
    // Le Condizioni sul tiro: i dadi tolti, la riserva dimezzata, chi fa fallire, e i dadi
    // che tornerebbero, per il Narratore che decide che non contano.
    condizioni: { dadi: condDadi, dimezza, fallisce, perche: [...(condizioni?.perche ?? [])], dadiSenza: senzaCondizioni },
    fallisce,
    powerNotes: powered.notes ?? [],
    powerSkipped: (powered.esclusi ?? []).filter((entry) => entry.motivo !== "attivo").map((entry) => ({ motivo: entry.motivo, nota: entry.effect?.nota ?? "" })),
    powerActive: Boolean(powered.attivo),
    powerDice,
    autoSuccess: riuscita.ok,
    autoSuccessNota: riuscita.nota,
    autoSuccessMotivo: riuscita.motivo
  };
}
