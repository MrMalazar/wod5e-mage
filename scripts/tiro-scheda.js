/**
 * Il tiro composto sulla scheda (16/9): la parte che parla con Foundry.
 * Lo stato vive nella scheda (`sheet._tiro`), puro (tiro.js); qui stanno
 * i clic dei nove riquadri, il contesto per il riquadro del Tiro e il
 * lancio, che passa dal motore del ramo C senza finestra di conferma.
 */
import { MODULE_ID } from "./constants.js";
import { applicaVerdetto, chiediVerdetto, notaVerdetto, tiroInAttesa } from "./verdetto-narratore.js";
import {
  getArete,
  normalizeMagickRollOptions,
  prepareAreteTraits,
  recordEffect,
  THRESHOLD_CAP
} from "./arete.js";
import { FOCUS_FORMS } from "./focus.js";
import { addParadoxToBalance, getMagickBalance, paradoxGainForMagickType } from "./magick-balance.js";
import { INCANTESIMI_FLAG, prepareIncantesimi } from "./incantesimi.js";
import { FORMULE_M6 } from "./data/formule.js";
import { scopesInParole } from "./ongoing-magick.js";
import { findMageRollTrait, selectorsForMageRollTrait, skillRollCard } from "./mage-roll-selection.js";
import {
  attivaEffetti,
  contoPoteri,
  findPotere,
  idVarianteAttiva,
  POTERI_USI_FLAG,
  potereLabel,
  poteriDelPersonaggio,
  poteriOfSphere,
  puoUsare,
  registraUso,
  spezzaIdPotere,
  tiroDelPotere,
  VARIANTE_ATTIVA,
  variantiDelPotere
} from "./poteri.js";
import { getSalute } from "./salute.js";

export { poteriOfSphere };
import { renderRollCard, ROLL_CARD_FLAG, rollSymbols } from "./roll-card.js";
import { canRaiseScope, nextScopeMode, SCOPE_ICONS, SCOPES, scopeModeOf, scopeModes, SCOPES_PER_CAST, zeroReading } from "./scopes.js";
import { prepareSpheres } from "./spheres.js";
import {
  bumpDifficulty,
  clearTiro,
  contoTiro,
  emptyTiro,
  EXTRA_DICE_CAP,
  isMagick,
  loadSpell,
  pickAttribute,
  pickPower,
  pickSkill,
  pickSpecialty,
  pillsOf,
  removePill,
  setDadi,
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

/** La bandiera con la lettura scelta di ogni Ambito (16/9 sera). */
export const SCOPE_MODES_FLAG = "scopeModes";

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

/**
 * L'incantesimo in catena: quello scritto nel Grimorio, o quello che viaggia
 * nello stato del tiro (una Formula caricata dalla pagina Formule, 26/9).
 */
export function spellOf(actor, tiro) {
  if (!tiro?.spell) return null;
  const stored = actor.getFlag(MODULE_ID, INCANTESIMI_FLAG) ?? {};
  return stored[tiro.spell] ?? tiro.spellData ?? null;
}

/**
 * Un effetto entra nel Tiro della prima pagina (Blue, 26/9: «lanciabile come
 * lancio attivo fatto dalla scheda prendendo i valori preparati
 * nell'effetto»): Areté, Sfere, Ambiti, Attributo e Abilità com'erano
 * scritti, il premio e il tipo; la scheda va alla prima pagina, e lì si tira
 * coi tre tasti. Entra sempre da capo: il compositore si svuota prima.
 */
export async function caricaNelTiro(sheet, id, spell) {
  const owned = prepareSpheres(sheet.actor).selected.map((sphere) => sphere.id);
  sheet._tiro = loadSpell(emptyTiro(), id, spell, { owned });
  sheet.changeTab("stats", "primary");
  await sheet.render({ parts: ["stats"] });
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

/** Sotto metà Salute (Adrenalina): le caselle libere sono meno della metà. */
export function saluteSottoMeta(actor) {
  const salute = getSalute(actor);
  return salute.max > 0 && (salute.max - salute.total) < salute.max / 2;
}

/**
 * I numeri della scheda che il conto vuole: Areté, Attributo, Abilità,
 * Tratti, Quintessenza sulla Ruota, Tipo del Credo, potere scelto (con
 * la variante «attivo» e quello che i suoi effetti chiedono: le Sfere
 * conosciute, i poteri per Sfera, la Salute). Con un potere attivo la
 * Quintessenza spendibile in dadi è quella che resta dopo il suo costo.
 */
export function contoInputs(actor, tiro, { traits = null } = {}) {
  const known = traits ?? prepareAreteTraits(actor, { localize: game.i18n.localize.bind(game.i18n), lang: game.i18n.lang });
  const attribute = tiro.attribute ? findMageRollTrait(known, `attribute:${tiro.attribute}`) : null;
  const skill = tiro.skill ? findMageRollTrait(known, tiro.skill) : null;
  // Il potere scelto, fra quelli che il personaggio ha inserito (21/9); l'id porta la variante (tappa 3).
  const rows = poteriDelPersonaggio(actor);
  const { id: powerId, variant } = spezzaIdPotere(tiro.power);
  const power = tiro.power ? findPotere(powerId, rows) : null;
  const powerCost = power && attivaEffetti(power, variant) ? count(power.costValue) : 0;
  return {
    known,
    attribute,
    skill,
    inputs: {
      arete: getArete(actor).value,
      attributeValue: attribute?.value ?? 0,
      skillValue: skill?.value ?? 0,
      traitDice: traitDiceOf(actor, tiro.traits),
      quintessenceAvailable: Math.max(getMagickBalance(actor).quintessence - powerCost, 0),
      form: practiceForm(actor),
      power,
      powerCost,
      powerCtx: power ? {
        spheresOwned: prepareSpheres(actor).selected.map((sphere) => sphere.id),
        poteriConti: contoPoteri(rows),
        saluteMeta: saluteSottoMeta(actor)
      } : {}
    }
  };
}

/** Il testo di una nota del potere per la scheda e la carta: il numero e la frase del libretto. */
export function testoNotaPotere(note, name, localize, format) {
  const scope = note.scope ? localize(`WOD5E_MAGE.Scopes.${note.scope}`) : "";
  const value = note.value > 0 && ["dice", "threshold"].includes(note.on) ? `+${note.value}` : String(note.value ?? "");
  const testa = note.on === "nota" ? name : format(`WOD5E_MAGE.Tiro.PotereNote.${note.on}`, { name, value, scope });
  return note.nota ? `${testa} · ${note.nota}` : testa;
}

/** Il perché un effetto resta fuori: il tipo di tiro, una Sfera che manca, una condizione, la scelta da fare. */
export function testoEsclusoPotere(entry, name, localize, format) {
  const motivo = String(entry?.motivo ?? "");
  let perche;
  if (motivo.startsWith("sfera:")) perche = format("WOD5E_MAGE.Tiro.PotereEscluso.sfera", { sphere: localize(`WOD5E_MAGE.Spheres.${motivo.slice("sfera:".length)}`) });
  else if (motivo.startsWith("tiro:")) perche = localize(`WOD5E_MAGE.Tiro.PotereEscluso.tiro.${motivo.slice("tiro:".length)}`);
  else perche = localize(`WOD5E_MAGE.Tiro.PotereEscluso.${motivo}`);
  return `${name}: ${perche}`;
}

/** Le righe del potere per il riquadro e la carta: le note che valgono, e gli effetti rimasti fuori col perché. */
export function notePotere(conto, power, localize, format) {
  if (!power) return { note: [], esclusi: [] };
  const name = potereLabel(power, localize);
  return {
    note: (conto.powerNotes ?? []).map((note) => testoNotaPotere(note, name, localize, format)),
    esclusi: (conto.powerSkipped ?? []).map((entry) => testoEsclusoPotere(entry, name, localize, format))
  };
}

/**
 * I nomi dei pezzi in catena, per le pillole: Areté col valore, Sfere,
 * Ambiti, Attributi e Abilità col valore, il potere, i Tratti coi dadi,
 * l'incantesimo col nome.
 */
function pillNames(actor, tiro, { known, inputs }) {
  const localize = game.i18n.localize.bind(game.i18n);
  const arete = getArete(actor);
  const spell = spellOf(actor, tiro);
  return {
    arete: { label: localize("WOD5E_MAGE.Arete.Label"), value: arete.value },
    spheres: Object.fromEntries(prepareSpheres(actor).all.map((sphere) => [sphere.id, localize(sphere.label)])),
    scopes: Object.fromEntries(SCOPES.map((id) => [id, localize(`WOD5E_MAGE.Scopes.${id}`)])),
    attributes: Object.fromEntries((known?.attributes ?? []).map((trait) => [trait.id, { label: trait.label, value: trait.value }])),
    skills: Object.fromEntries((known?.skills ?? []).map((trait) => [trait.key, { label: trait.label, value: trait.value }])),
    // Il potere, con «· attivo» se è la variante attiva (tappa 3).
    power: tiro.power && inputs?.power ? { [tiro.power]: spezzaIdPotere(tiro.power).variant ? `${potereLabel(inputs.power, localize)} · ${localize("WOD5E_MAGE.Poteri.Tipo.attivo")}` : potereLabel(inputs.power, localize) } : {},
    traits: Object.fromEntries((tiro.traits ?? []).map((id) => {
      const item = actor.items?.get?.(id);
      const dice = traitDiceOf(actor, [id]);
      return [id, { label: item?.name ?? id, value: dice || null }];
    })),
    spells: tiro.spell ? { [tiro.spell]: String(spell?.name ?? "").trim() || localize("WOD5E_MAGE.Tabs.Grimorio") } : {}
  };
}

/**
 * Il contesto del riquadro del Tiro (23/9, largo due colonne): a sinistra
 * la catena a pillole coi nomi veri (torna, con la × per togliere ogni
 * pezzo), a destra i tre numeri col meno e il più: Riserva (i dadi extra
 * dentro la riserva, tetto 3), Soglia (la Difficoltà, calcolata o a mano) e
 * Dadi (il ritocco sul totale, fuori dal tetto); sotto il premio, la
 * Quintessenza, Sforza la realtà e i tasti.
 */
export function prepareTiroContext(actor, tiro, { traits = null } = {}) {
  const localize = game.i18n.localize.bind(game.i18n);
  const { known, attribute, skill, inputs } = contoInputs(actor, tiro, { traits });
  const conto = contoTiro(tiro, inputs);
  const arete = getArete(actor);
  const magick = isMagick(tiro);
  const format = game.i18n.format.bind(game.i18n);
  const potere = notePotere(conto, inputs.power, localize, format);
  const pills = pillsOf(tiro, pillNames(actor, tiro, { known, inputs })).map((pill) => ({
    ...pill,
    text: pill.kind === "scope"
      ? `${pill.label} ${pill.level}`
      : (pill.value !== null && pill.value !== undefined ? `${pill.label} ${pill.kind === "trait" && pill.value > 0 ? "+" : ""}${pill.value}` : pill.label)
  }));
  return {
    magick,
    size: tiroSize(tiro),
    empty: tiroSize(tiro) === 0,
    kindLabel: localize(magick ? "WOD5E_MAGE.Tiro.KindMagick" : (tiro.attribute || tiro.skill ? "WOD5E_MAGE.Tiro.KindSkill" : "WOD5E_MAGE.Tiro.KindNone")),
    pills,
    riserva: conto.riserva,
    pool: conto.pool,
    computed: conto.computed,
    difficulty: conto.difficulty,
    manual: conto.manual,
    dice: conto.dice,
    dadi: { value: conto.adjust, label: `${conto.adjust > 0 ? "+" : ""}${conto.adjust}` },
    impossible: conto.impossible && tiroSize(tiro) > 0,
    successFrom: conto.successFrom,
    prize: { on: Boolean(tiro.prize) && magick, value: conto.prize, arete: arete.value },
    // La Quintessenza: nella Magick, o nei tiri di Abilità se il potere lo dice (Anche a mani nude).
    quintessence: { value: tiro.quintessence, dice: conto.quintessence, available: inputs.quintessenceAvailable, allowed: conto.quintessenceAllowed },
    // Il potere scelto (tappa 3): le sue note, gli effetti fuori, la riuscita senza tirare, il costo.
    potere: inputs.power ? {
      name: potereLabel(inputs.power, localize),
      note: potere.note,
      esclusi: potere.esclusi,
      autoSuccess: conto.autoSuccess,
      autoSuccessMotivo: conto.autoSuccessMotivo ? localize(`WOD5E_MAGE.Tiro.PotereEscluso.${conto.autoSuccessMotivo}`) : "",
      active: conto.powerActive,
      cost: inputs.powerCost
    } : null,
    extra: { value: tiro.extra, dice: conto.extra, cap: EXTRA_DICE_CAP },
    sforza: Boolean(tiro.sforza),
    kinds: TIRO_KINDS.map((kind) => ({ kind, label: localize(`WOD5E_MAGE.Tiro.Kinds.${kind}`), hint: localize(`WOD5E_MAGE.Tiro.KindHints.${kind}`) })),
    // Il tiro parte con almeno un tratto (Attributo o Abilità) e con la
    // Difficoltà inserita (Blue, 16/9 sera).
    ready: Boolean(attribute || skill) && conto.difficultySet,
    needsDifficulty: Boolean(attribute || skill) && !conto.difficultySet,
    attributeLabel: attribute?.label ?? "",
    skillLabel: skill?.label ?? ""
  };
}

/**
 * Le righe degli Ambiti per il riquadro della Magick: otto pallini, il
 * primo è lo 0 (la base che non costa, acceso sempre, non si clicca: Blue,
 * 26/9) e poi i sette livelli, quello dichiarato acceso. Ogni Ambito ha due lenti (la tavola del 23/9): la
 * riga legge con quella scelta dalla tendina, o con la prima.
 */
export function prepareScopeRows(tiro, localize = (key) => key, { arete = null, modes = {} } = {}) {
  const table = scopeModes(localize, { arete });
  return SCOPES.map((id) => {
    const level = count(tiro?.scopes?.[id]);
    // La lettura («lente») dell'Ambito (16/9 sera): quella scelta col
    // tastino, o la prima; la riga e la tendina parlano solo con lei.
    const options = table[id] ?? [];
    const mode = scopeModeOf(table, id, modes?.[id]);
    const next = nextScopeMode(table, id, mode?.id);
    // La riga (20/9, seconda passata; 21/9): chi ha più letture le sceglie
    // dalla tendina (il clic sul nome), ma i sette pallini ci sono sempre
    // (Blue, 21/9: «lasciamo solo i pallini: se vuole l'utente può
    // specificare il sottotipo, ma può anche solo cliccare i pallini
    // necessari e via»). La lettura si stampa solo se è scelta: chi ne ha
    // una sola ce l'ha sempre.
    const multi = options.length > 1;
    const modeChosen = !multi || options.some((option) => option.id === modes?.[id]);
    const readingOf = (step) => (modeChosen ? mode?.readings?.[step] ?? "" : "");
    const hintOf = (step) => (modeChosen ? mode?.hints?.[step] ?? "" : "");
    // Sul pallino: il livello e la lettura, e a capo la spiegazione della tavola.
    const tipOf = (step) => [readingOf(step) ? `${step} · ${readingOf(step)}` : String(step), hintOf(step)].filter(Boolean).join("\n");
    // Lo 0 legge sempre (Blue, 26/9 sera: «Bersagli 0 dirà 1 Bersaglio»): con
    // la lente scelta la sua base, senza, la base di ogni lente col suo nome.
    const zeroReadingOf = () => (modeChosen ? readingOf(0) : zeroReading(id, localize, { arete }));
    const zeroTip = () => [zeroReadingOf() ? `0 · ${zeroReadingOf()}` : "0", hintOf(0)].filter(Boolean).join("\n");
    return {
      id,
      label: localize(`WOD5E_MAGE.Scopes.${id}`),
      faIcon: SCOPE_ICONS[id] ?? "",
      level,
      // La lettura del livello dichiarato; a riposo quella dello 0, la base.
      reading: readingOf(level),
      hint: hintOf(level),
      mode: mode?.id ?? "",
      modeLabel: mode?.label ?? "",
      modeShort: mode?.short || mode?.label || "",
      modeCount: options.length,
      nextModeLabel: next?.label ?? "",
      multi,
      modeChosen,
      modeShown: multi && modeChosen && !level,
      modes: options.map((option) => ({ id: option.id, label: option.label, selected: modeChosen && option.id === mode?.id })),
      // Il primo pallino è lo 0 (Blue, 26/9): l'effetto di base, acceso sempre e
      // non cliccabile, col suo testo nel sorvolo; i sette dopo si dichiarano.
      zero: { value: 0, reading: zeroReadingOf(), hint: hintOf(0), tip: zeroTip() },
      steps: Array.from({ length: THRESHOLD_CAP }, (_, index) => ({
        value: index + 1,
        active: index + 1 === level,
        lit: index + 1 <= level,
        reading: readingOf(index + 1),
        hint: hintOf(index + 1),
        tip: tipOf(index + 1)
      }))
    };
  }).sort((a, b) => a.label.localeCompare(b.label, game.i18n?.lang ?? "it"));
}

/** Le letture scelte per Ambito: la bandiera del personaggio, e sopra quel che la scheda ricorda se non può scrivere. */
export function scopeModesOf(sheet) {
  return { ...(sheet.actor?.getFlag?.(MODULE_ID, SCOPE_MODES_FLAG) ?? {}), ...(sheet._scopeModes ?? {}) };
}

/**
 * La lettura dell'Ambito (Peso, Epicità, Danni…). Dalla tendina delle
 * letture (20/9, seconda passata) arriva quella scelta, `data-mode`; senza,
 * gira alla successiva (il tastino del 16/9 sera). Si scrive sul
 * personaggio, così resta; chi non può scriverlo la tiene nella scheda
 * finché è aperta.
 */
export async function onScopeMode(event, target) {
  event.preventDefault();
  const scope = String(target.dataset.scope ?? "");
  const localize = game.i18n.localize.bind(game.i18n);
  const table = scopeModes(localize);
  const current = scopeModesOf(this)[scope];
  const wanted = String(target.dataset.mode ?? "");
  const next = wanted ? (table[scope] ?? []).find((option) => option.id === wanted) : nextScopeMode(table, scope, current);
  if (!scope || !next) return;
  if (this.actor.isOwner) {
    await this.actor.setFlag(MODULE_ID, SCOPE_MODES_FLAG, { ...(this.actor.getFlag(MODULE_ID, SCOPE_MODES_FLAG) ?? {}), [scope]: next.id });
    return;
  }
  this._scopeModes = { ...(this._scopeModes ?? {}), [scope]: next.id };
  await this.render({ parts: ["stats"] });
}

/**
 * I poteri del personaggio per il riquadro: quelli che ha inserito nella
 * pagina Magick (Blue, 21/9: il conto è dei poteri inseriti, non degli
 * slot), nell'ordine delle Sfere della scheda, col nome e lo stato «scelto».
 * Dalla tappa 3 ogni riga dice in che tiri entra (`any`: anche fuori dalla
 * Magick), e un potere con effetti passivi e attivi sul tiro ha una
 * seconda riga, «· attivo», che costa la Quintessenza del potere e conta
 * un uso: la riga sa se si può (usi e Quintessenza).
 */
export function preparePoteriRows(actor, tiro, localize = (key) => key) {
  const order = prepareSpheres(actor).selected.map((sphere) => sphere.id);
  const usi = actor.getFlag?.(MODULE_ID, POTERI_USI_FLAG) ?? {};
  const quintessence = getMagickBalance(actor).quintessence;
  const rows = [];
  for (const power of poteriDelPersonaggio(actor, { order })) {
    const label = potereLabel(power, localize);
    const varianti = variantiDelPotere(power);
    const riga = (id, variant) => {
      const attivo = attivaEffetti(power, variant);
      const verdetto = attivo ? puoUsare(power, { usi, quintessence }) : { ok: true, motivo: "", usi: null };
      const parti = [];
      if (attivo && verdetto.usi) parti.push(`${verdetto.usi.restanti}/${verdetto.usi.max} ${localize(`WOD5E_MAGE.Poteri.Usi.${verdetto.usi.per}`)}`);
      if (attivo && count(power.costValue)) parti.push(`${count(power.costValue)} ${localize("WOD5E_MAGE.Poteri.QuintessenzaBreve")}`);
      const tiro3 = tiroDelPotere(power, variant);
      return {
        id,
        sphere: power.sphere,
        sphereLabel: localize(`WOD5E_MAGE.Spheres.${power.sphere}`),
        dot: power.dot,
        type: power.type,
        label: variant ? `${label} · ${localize("WOD5E_MAGE.Poteri.Tipo.attivo")}` : label,
        // Nella pastiglia della Sfera il nome della Sfera è già sulla riga: resta il nome del potere.
        short: variant ? `${label} · ${localize("WOD5E_MAGE.Poteri.Tipo.attivo")}` : label,
        text: power.text,
        selected: tiro?.power === id,
        variant,
        attivo,
        // In che tiri entra: «abilita» e «any» non accendono l'Areté.
        roll: tiro3,
        any: tiro3 === "abilita" || tiro3 === "any",
        ok: verdetto.ok,
        // In piccolo sulla riga: gli usi e il costo; nel sorvolo anche il perché non si può.
        nota: parti.join(" · "),
        hint: [parti.join(" · "), verdetto.ok ? "" : localize(verdetto.motivo === "usi" ? "WOD5E_MAGE.Poteri.UsiFiniti" : "WOD5E_MAGE.Poteri.QuintessenzaManca")].filter(Boolean).join("\n")
      };
    };
    rows.push(riga(power.id, ""));
    if (varianti.passivo && varianti.attivo) rows.push(riga(idVarianteAttiva(power.id), VARIANTE_ATTIVA));
  }
  return rows;
}

/**
 * Gli incantesimi del Grimorio per il riquadro (Blue, 16/9 sera): nome,
 * sigillo della Sfera più alta, la coda con le Sfere e i livelli, la nota
 * con l'Obiettivo e gli Ambiti, e lo stato «scelto» (caricato nel tiro).
 */
export function prepareIncantesimiRows(actor, tiro, localize = (key) => key) {
  const lang = globalThis.game?.i18n?.lang ?? "it";
  // In ordine di nome come le altre schede del riquadro (Blue, 26/9), non nell'ordine in cui sono scritti.
  return [...prepareIncantesimi(actor, localize)].sort((a, b) => a.name.localeCompare(b.name, lang)).map((row) => {
    const top = [...row.spheres].sort((a, b) => b.level - a.level)[0];
    // Le Sfere senza numero (25/9 sera: niente livelli).
    const spheresText = row.spheres.map((sphere) => sphere.label).join(", ");
    const scopesText = row.scopes.map((scope) => `${scope.label} ${scope.level}`).join(", ");
    return {
      id: row.id,
      name: row.name,
      icon: top?.icon ?? "",
      coda: spheresText,
      hint: [row.goal, scopesText, localize("WOD5E_MAGE.Tiro.IncantesimoHint")].filter(Boolean).join("\n"),
      chosen: tiro?.spell === row.id
    };
  });
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

/**
 * Il clic su un pallino dichiara il livello dell'Ambito. In un lancio si
 * alzano sopra lo 0 al massimo tre Ambiti (la tavola del 23/9): il quarto
 * non si accende, e la scheda lo dice.
 */
export async function onTiroScope(event, target) {
  event.preventDefault();
  const tiro = tiroOf(this);
  const scope = String(target.dataset.scope ?? "");
  const level = count(target.dataset.level);
  if (level > 0 && !canRaiseScope(tiro.scopes, scope, SCOPES_PER_CAST)) {
    ui.notifications?.warn?.(game.i18n.format("WOD5E_MAGE.Tiro.ScopeCapWarning", { n: SCOPES_PER_CAST }));
    return;
  }
  return repaint(this, setScope(tiro, scope, level));
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
  // La casella porta la sua Sfera (21/9: gli id dei poteri non la dicono più)
  // e dice se il potere vale anche fuori dalla Magick (tappa 3).
  return repaint(this, pickPower(tiroOf(this), target.dataset.power, target.dataset.sphere, { any: target.dataset.any === "true" }));
}

/**
 * Un incantesimo del Grimorio cliccato entra nel compositore com'era
 * scritto (Sfere solo fra quelle che il personaggio ha); lo stesso
 * incantesimo cliccato di nuovo si toglie.
 */
export async function onTiroIncantesimo(event, target) {
  event.preventDefault();
  const id = String(target.dataset.row ?? "");
  const stored = this.actor.getFlag(MODULE_ID, INCANTESIMI_FLAG) ?? {};
  const spell = Object.hasOwn(stored, id) ? stored[id] : null;
  if (!spell) return repaint(this, clearTiro());
  const owned = prepareSpheres(this.actor).selected.map((sphere) => sphere.id);
  return repaint(this, loadSpell(tiroOf(this), id, spell, { owned }));
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

/** Il ritocco dei Dadi (23/9): più o meno sul totale, fuori dal tetto. */
export async function onTiroDadi(event, target) {
  event.preventDefault();
  const tiro = tiroOf(this);
  if (target.dataset.reset !== undefined) return repaint(this, setDadi(tiro, 0));
  return repaint(this, setDadi(tiro, (Number(tiro.dadi) || 0) + (Number(target.dataset.delta) || 0)));
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

/**
 * Il potere a tiro fatto (tappa 3): l'uso dell'attivo si conta nella
 * bandiera; la Quintessenza (i dadi, e il costo dell'attivo) scende, salvo
 * che la Ruota abbia già pagato (`pagato`: il lancio di Magick paga prima).
 */
export async function pagaPotere(actor, conto, inputs, { pagato = false } = {}) {
  if (!actor.isOwner) return;
  const update = {};
  const power = inputs?.power;
  if (power && conto.powerActive) {
    update[`flags.${MODULE_ID}.${POTERI_USI_FLAG}`] = registraUso(actor.getFlag(MODULE_ID, POTERI_USI_FLAG) ?? {}, power);
  }
  const spesa = pagato ? 0 : count(conto.quintessence) + (power && conto.powerActive ? count(inputs.powerCost) : 0);
  if (spesa > 0) {
    const balance = getMagickBalance(actor);
    update[`flags.${MODULE_ID}.magickBalance`] = { quintessence: Math.max(balance.quintessence - spesa, 0), paradox: balance.paradox };
    ui.notifications.info(game.i18n.format("WOD5E_MAGE.Arete.QuintessenceSpent", { points: spesa }));
  }
  if (Object.keys(update).length) await actor.update(update);
}

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
  let conto = contoTiro(tiro, inputs);
  if (!conto.difficultySet) {
    ui.notifications.warn(localize("WOD5E_MAGE.Tiro.DifficultyWarning"));
    return null;
  }
  // Il potere entrato «attivo» (tappa 3): serve un uso nel periodo e la sua Quintessenza.
  const power = inputs.power;
  if (power && conto.powerActive) {
    const verdetto = puoUsare(power, { usi: actor.getFlag(MODULE_ID, POTERI_USI_FLAG) ?? {}, quintessence: getMagickBalance(actor).quintessence });
    if (!verdetto.ok) {
      ui.notifications.warn(localize(verdetto.motivo === "usi" ? "WOD5E_MAGE.Poteri.UsiFiniti" : "WOD5E_MAGE.Poteri.QuintessenzaManca"));
      return null;
    }
  }
  const arete = getArete(actor);
  // L'incantesimo caricato dal Grimorio (o la Formula di passaggio) dà il nome e l'Obiettivo al lancio.
  const spell = spellOf(actor, tiro);
  const spellName = String(spell?.name ?? "").trim();
  const traitLabel = selectedTraits.map((trait) => trait.label).join(" + ") + (tiro.specialty ? ` · ${tiro.specialty}` : "");
  const rollLabel = spellName ? `${spellName} · ${traitLabel}` : traitLabel;

  // Il verdetto del Narratore (Blue, 16/9 sera): il tiro gli compare com'è,
  // ha dieci secondi per ritoccare Difficoltà e dadi o dire OK; poi si tira
  // coi suoi numeri. Un tiro già mandato non si rimanda.
  if (tiroInAttesa(actor.id)) {
    ui.notifications.warn(localize("WOD5E_MAGE.Verdetto.Pending"));
    return null;
  }
  const verdetto = await chiediVerdetto({ actor, title: rollLabel, magick, kind: tiro.kind ?? "", conto });
  conto = applicaVerdetto(conto, verdetto);
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
  const notaNarratore = notaVerdetto(conto, format);
  if (notaNarratore) notes.push(notaNarratore);
  // Il potere scelto: il nome, le sue note, gli effetti rimasti fuori col perché (tappa 3).
  if (power) {
    notes.push(format("WOD5E_MAGE.Tiro.PowerNote", { name: potereLabel(power, localize) }));
    const potereNote = notePotere(conto, power, localize, format);
    notes.push(...potereNote.note, ...potereNote.esclusi);
    if (conto.powerActive && inputs.powerCost > 0) notes.push(format("WOD5E_MAGE.Tiro.PotereCosto", { points: inputs.powerCost }));
  }
  // La riuscita senza tirare: la fascia della carta lo dice col nome del potere.
  const senzaTirare = Boolean(power) && conto.autoSuccess;
  const banner = senzaTirare ? format("WOD5E_MAGE.Tiro.RiesceSenzaTirare", { name: potereLabel(power, localize) }) : "";

  if (conto.extra > 0) bonusParts.push(format("WOD5E_MAGE.Tiro.ExtraFlavor", { dice: conto.extra }));
  // Il ritocco dei Dadi (23/9): in carta, perché si sappia.
  if (conto.adjust) notes.push(format("WOD5E_MAGE.Tiro.DadiNote", { dice: `${conto.adjust > 0 ? "+" : ""}${conto.adjust}` }));

  // Il tiro di Abilità: niente rossi, riuscita dal 6, la Difficoltà solo a mano.
  if (!magick) {
    if (conto.quintessence > 0) bonusParts.push(format("WOD5E_MAGE.Arete.QuintessenceFlavor", { points: conto.quintessence }));
    // I dadi del potere stanno nel numero in carta, con gli altri bonus.
    const card = skillRollCard({ traits: traitRows, flatMod: conto.bonus + conto.powerDice }, localize);
    let esito = null;
    try {
      esito = await rollRamoCDirect({
        actor,
        data: actor.system,
        pool: conto.pool,
        threshold: conto.difficulty,
        successFrom: conto.successFrom,
        paradoxRating: 0,
        skill: true,
        bought: senzaTirare,
        banner,
        title: rollLabel,
        flavor: card,
        card: { symbols: [], traits: traitRows, tiro: { power: tiro.power ?? "", traits: chosenTraits.map((item) => item.id), specialty: tiro.specialty ?? "" } },
        activeModifiers: chosenTraits.map((item) => ({ label: item.name, value: `${traitDiceOf(actor, [item.id]) >= 0 ? "+" : ""}${traitDiceOf(actor, [item.id])}` })),
        notes
      });
    } catch (error) {
      console.warn("wod5e-mage | Tiro di Abilità interrotto.", error);
      return null;
    }
    // A tiro fatto: la Quintessenza spesa (in dadi, o per il potere attivo) scende, l'uso si conta.
    if (esito) await pagaPotere(actor, conto, inputs);
    return esito;
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
  // I dadi del potere (tappa 3) fra i bonus della carta.
  if (conto.powerDice > 0) bonusParts.push(format("WOD5E_MAGE.Tiro.PotereDadiFlavor", { name: potereLabel(power, localize), dice: conto.powerDice }));
  if (conto.manual && conto.difficulty !== conto.computed) notes.push(format("WOD5E_MAGE.Tiro.ManualDifficultyNote", { computed: conto.computed, difficulty: conto.difficulty }));

  const card = renderRollCard({
    traits: traitRows,
    bonusParts,
    threshold: conto.difficulty,
    prize: conto.prize,
    magickType,
    goal: String(spell?.goal ?? ""),
    effectKind: spell?.effectKind ? `WOD5E_MAGE.Arete.EffectKinds.${spell.effectKind}` : "",
    spheres: sphereEntries.map((entry) => ({ id: entry.id, label: `WOD5E_MAGE.Spheres.${entry.id}`, level: entry.level })),
    scopes: scopeLevels.map((entry) => ({ id: entry.id, label: `WOD5E_MAGE.Scopes.${entry.id}`, level: entry.level }))
  }, localize);
  const symbols = rollSymbols({ spheres: sphereEntries, scopes: scopeLevels, prize: conto.prize });
  // La riga fra le Magick in atto (25/9 sera): chi lancia, com'è composta (le Sfere, la matrice,
  // il potere), gli Ambiti della soglia in parole con la lettura scelta, i bonus e i malus.
  const modiAmbiti = actor.getFlag(MODULE_ID, SCOPE_MODES_FLAG) ?? {};
  const tavolaAmbiti = scopeModes(localize, { arete: arete.value });
  const letture = Object.fromEntries(scopeLevels.map((entry) => [entry.id, scopeModeOf(tavolaAmbiti, entry.id, modiAmbiti[entry.id])?.readings?.[entry.level] ?? ""]).filter(([, reading]) => reading));
  const composizione = [
    sphereEntries.map((entry) => localize(`WOD5E_MAGE.Spheres.${entry.id}`)).join(" + "),
    spell?.formula ? `${localize("WOD5E_MAGE.Incantesimi.Formula")}: ${FORMULE_M6.find((formula) => formula.id === spell.formula)?.name ?? spell.formula}` : "",
    power ? `${localize("WOD5E_MAGE.Poteri.Uno")}: ${potereLabel(power, localize)}${conto.powerActive ? ` (${localize("WOD5E_MAGE.Poteri.Tipo.attivo")})` : ""}` : ""
  ].filter(Boolean).join(" · ");
  const effect = {
    vulgar: options.vulgar || options.witnesses,
    duration: count(tiro.scopes?.duration),
    threshold: conto.difficulty,
    goal: String(spell?.goal ?? ""),
    fallbackName: spellName || sphereEntries.map((entry) => localize(`WOD5E_MAGE.Spheres.${entry.id}`)).join(", ") || rollLabel,
    caster: String(actor.name ?? ""),
    spheres: sphereEntries.map((entry) => entry.id),
    scopes: Object.fromEntries(scopeLevels.map((entry) => [entry.id, entry.level])),
    composition: composizione,
    scopesText: scopesInParole(Object.fromEntries(scopeLevels.map((entry) => [entry.id, entry.level])), localize, letture),
    modifiers: [...bonusParts, ...notes].join(" · ")
  };
  const sphereMax = Math.max(0, ...sphereEntries.map((entry) => entry.level));
  if (actor.isOwner) await actor.update({ [`flags.${MODULE_ID}.lastThreshold`]: conto.difficulty });

  // La Ruota paga subito: la Quintessenza spesa (in dadi, e il costo del
  // potere attivo) scende, il Volgare sale verso il Paradosso.
  const paradoxGain = paradoxGainForMagickType(options);
  const balanceBefore = getMagickBalance(actor);
  const spesa = conto.quintessence + (conto.powerActive ? count(inputs.powerCost) : 0);
  let balanceMoved = false;
  if ((spesa > 0 || paradoxGain > 0) && actor.isOwner) {
    const spent = { quintessence: Math.max(balanceBefore.quintessence - spesa, 0), paradox: balanceBefore.paradox };
    const balanceAfter = addParadoxToBalance(spent, paradoxGain);
    if (balanceAfter.paradox !== balanceBefore.paradox || balanceAfter.quintessence !== balanceBefore.quintessence) {
      await actor.setFlag(MODULE_ID, "magickBalance", balanceAfter);
      balanceMoved = true;
      if (spesa > 0) ui.notifications.info(format("WOD5E_MAGE.Arete.QuintessenceSpent", { points: spesa }));
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
      bought: senzaTirare,
      banner,
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
  // A tiro fatto: l'uso del potere attivo si conta (la Ruota ha già pagato).
  await pagaPotere(actor, conto, inputs, { pagato: true });
  // La Durata dichiarata scrive il lancio fra le Magick in atto.
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
