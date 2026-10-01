/**
 * Il tiro composto sulla scheda (16/9): la parte che parla con Foundry.
 * Lo stato vive nella scheda (`sheet._tiro`), puro (tiro.js); qui stanno
 * i clic dei nove riquadri, il contesto per il riquadro del Tiro e il
 * lancio, che passa dal motore del ramo C senza finestra di conferma.
 */
import { MODULE_ID } from "./constants.js";
import { applicaVerdetto, chiediVerdetto, dalNarratore, notaVerdetto, scriviDalNarratore, tiroInAttesa, VERDETTO_SECONDI } from "./verdetto-narratore.js";
import {
  calculateAretePrize,
  getArete,
  normalizeMagickRollOptions,
  prepareAreteTraits,
  recordEffect,
  THRESHOLD_CAP
} from "./arete.js";
import { FOCUS_FORMS } from "./focus.js";
import { addParadoxToBalance, getMagickBalance } from "./magick-balance.js";
import { costoLancio, pagamentoDelLancio, testoCosto } from "./ramo-c.js";
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
import { condizioniDelTiro, testoCondizioniDelTiro, tipoDelTiro } from "./condizioni.js";
import { traitIcon } from "./tratti-icone.js";

export { poteriOfSphere };
import { renderRollCard, rollSymbols } from "./roll-card.js";
import { canRaiseScope, nextScopeMode, SCOPE_ICONS, SCOPES, scopeModeOf, scopeModes, SCOPES_PER_CAST, zeroReading } from "./scopes.js";
import { prepareSpheres } from "./spheres.js";
import {
  bumpSoglia,
  clearTiro,
  contoTiro,
  DADI_ADJUST_CAP,
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
  setKind,
  setPay,
  setQuintessence,
  setScope,
  setSoglia,
  SOGLIA_MANO_CAP,
  sogliaAMano,
  TIRO_KINDS,
  tiroSize,
  toggleArete,
  toggleCondizioneTiro,
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

/**
 * La resistenza a un effetto del nemico (27/9): il Tiro della prima pagina
 * con la soglia già scritta e, se ci sono, l'Attributo e l'Abilità già messi.
 * Non tocca il comportamento del Tiro di oggi: è solo un tiro preparato.
 */
export async function caricaResistenza(sheet, { soglia = 0, attribute = "", skill = "" } = {}) {
  let tiro = emptyTiro();
  const secondo = String(skill ?? "");
  if (attribute) tiro = pickAttribute(tiro, String(attribute).replace(/^attribute:/, ""));
  else if (secondo.startsWith("attribute:")) tiro = pickAttribute(tiro, secondo.slice("attribute:".length));
  // Il Tiro tiene un Attributo e un'Abilità: un secondo Attributo (Fermezza + Autocontrollo) lo sceglie il giocatore.
  if (secondo && !secondo.startsWith("attribute:")) tiro = pickSkill(tiro, secondo.includes(":") ? secondo : `skill:${secondo}`);
  // La soglia del nemico è tutta a mano (30/9): in un tiro di Abilità non c'è conto sotto.
  tiro = setSoglia(tiro, Math.max(Math.trunc(Number(soglia) || 0), 0));
  sheet._tiro = tiro;
  sheet.changeTab?.("stats", "primary");
  await sheet.render({ parts: ["stats"] });
  return tiro;
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
  // Le Condizioni (29/9): quelle che pesano sul tipo del tiro, meno quelle tolte a mano.
  const tipo = tipoDelTiro({ attribute, skill });
  return {
    known,
    attribute,
    skill,
    tipo,
    inputs: {
      condizioni: condizioniDelTiro(actor.items ?? [], tipo, tiro.condizioni),
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

/** I pezzi della catena che fanno la soglia: l'incantesimo, le Sfere, gli Ambiti (Blue, 27/9). */
export const KINDS_SOGLIA = Object.freeze(["spell", "sphere", "scope"]);

/** Un numero com'è: «3», «−2», «0». */
function numero(value) {
  const n = Math.trunc(Number(value) || 0);
  return n < 0 ? `−${-n}` : String(n);
}

/** Un numero col segno davanti: «+1», «−2», «0». */
function conSegno(value) {
  const n = Math.trunc(Number(value) || 0);
  if (n > 0) return `+${n}`;
  return n < 0 ? `−${-n}` : "0";
}

/** La chiave di un'Abilità senza il tipo davanti («skill:athletics» → «athletics»); le Specifiche non hanno sigillo. */
function skillIconOf(key) {
  const [type, id] = String(key ?? "").split(":", 2);
  return type === "skill" ? traitIcon(id) : "";
}

/**
 * Le sei righe degli Ambiti nella Soglia della Magick (Blue, 1/10: «nella
 * soglia deve comparire solo il simbolo dell'ambito e la descrizione del
 * livello dell'ambito nella quale è stato scelto»). In ordine alfabetico,
 * ognuna col simbolo dell'Ambito, la lettura del livello dichiarato nella
 * lente che vale (quella scelta sulla scheda, o la prima della tavola) e il
 * livello; a zero la riga è spenta e legge la base. Il nome dell'Ambito, la
 * lente e la spiegazione lunga stanno nel sorvolo; la × solo sugli alzati.
 */
export function righeAmbiti(tiro, localize = (key) => key, { tavola = null, modi = {}, arete = null } = {}) {
  const table = tavola ?? scopeModes(localize, { arete });
  return SCOPES.map((id) => {
    const label = String(localize(`WOD5E_MAGE.Scopes.${id}`));
    const level = count(tiro?.scopes?.[id]);
    const mode = scopeModeOf(table, id, modi?.[id]);
    const reading = String(mode?.readings?.[level] ?? "");
    const spiegazione = String(mode?.hints?.[level] ?? "");
    const lente = mode?.short || mode?.label || "";
    const titolo = lente ? `${label} · ${lente} ${level}` : `${label} ${level}`;
    return {
      kind: "scope",
      id,
      fa: SCOPE_ICONS[id] ?? "",
      label,
      name: reading || String(level),
      value: numero(level),
      spenta: level === 0,
      hint: spiegazione ? `${titolo}: ${spiegazione}` : titolo,
      via: level > 0
    };
  }).sort((a, b) => a.label.localeCompare(b.label, globalThis.game?.i18n?.lang ?? "it"));
}

/**
 * Il contesto del riquadro del Tiro, rifatto sul mock del 30/9 (Blue: «troppo
 * bombardamento informativo», «voglio anche i simboli correlati a quello che
 * viene messo», solo «Soglia», il ritocco resta anche al giocatore) e sulla
 * quarta passata dell'1/10 («meno parole ci sono, meglio è»).
 *
 * In testa il tipo di tiro a parole e, nella Magick, la Sfera col sigillo e
 * l'incantesimo (l'Areté resta fra le pillole, ma non si stampa: il tipo lo
 * dice già). Sotto, due colonne: la Riserva (chi dà dadi: Attributo,
 * Abilità, Specializzazione, premio dell'Areté, potere, Tratti, Condizioni
 * in meno) e la Soglia (chi toglie dadi). Nella Magick la Soglia mostra
 * sempre i sei Ambiti, in ordine alfabetico: il simbolo, la lettura del
 * livello scelto nella lente che vale (quella scelta, o la prima) e il
 * livello; a zero la riga è spenta. Il nome dell'Ambito, la lente e la
 * spiegazione lunga stanno nel sorvolo. Ogni riga porta il simbolo del
 * pezzo com'è nella scheda, il nome, il valore e la × per toglierlo. In
 * fondo a ogni colonna un numero solo, il totale, col meno e il più: nella
 * Riserva il ritocco (dentro il totale, la matita dice di quanto), nella
 * Soglia quanto si alza o si abbassa sopra il conto degli Ambiti, e
 * nell'Abilità la soglia intera. Poi, in una riga, l'esito (i dadi che si
 * tirano, dal 6 o dall'8), la coppia Quintessenza | Paradosso, Sforza la
 * realtà e Dal Narratore; infine i tasti col solo nome, che spenti dicono
 * cosa manca.
 */
export function prepareTiroContext(actor, tiro, { traits = null } = {}) {
  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const { known, attribute, skill, inputs, tipo } = contoInputs(actor, tiro, { traits });
  const conto = contoTiro(tiro, inputs);
  const arete = getArete(actor);
  const magick = isMagick(tiro);
  const potere = notePotere(conto, inputs.power, localize, format);
  const nomi = pillNames(actor, tiro, { known, inputs });
  const pills = pillsOf(tiro, nomi);
  const sfere = Object.fromEntries(prepareSpheres(actor).all.map((sphere) => [sphere.id, { label: localize(sphere.label), icon: sphere.icon }]));
  // La lente di ogni Ambito: quella scelta sulla scheda, o la prima della tavola.
  const modiAmbiti = actor.getFlag?.(MODULE_ID, SCOPE_MODES_FLAG) ?? {};
  const tavolaAmbiti = scopeModes(localize, { arete: arete.value });

  const testa = { tipo: magick ? "magick" : (tiro.attribute || tiro.skill ? "abilita" : ""), label: "", hint: "", arete: null, spheres: [], spell: null };
  testa.label = localize(magick ? "WOD5E_MAGE.Tiro.KindMagick" : "WOD5E_MAGE.Tiro.KindSkill");
  if (!magick && tipo) testa.hint = localize(`WOD5E_MAGE.Condizioni.Tipi.${tipo}`);
  const riserva = [];
  // La Soglia della Magick (1/10): i sei Ambiti, sempre, in ordine alfabetico. La riga legge il livello
  // dichiarato con la lente che vale; la × c'è solo su quelli alzati (riporta a zero).
  const soglia = magick ? righeAmbiti(tiro, localize, { tavola: tavolaAmbiti, modi: modiAmbiti }) : [];
  for (const pill of pills) {
    switch (pill.kind) {
      case "spell":
        testa.spell = { id: pill.id, name: pill.label, hint: localize("WOD5E_MAGE.Tiro.IncantesimoHint") };
        break;
      case "arete":
        testa.arete = { value: pill.value, label: `${pill.label} ${pill.value}`, hint: localize("WOD5E_MAGE.Tiro.AreteHint") };
        break;
      case "sphere":
        testa.spheres.push({ id: pill.id, label: sfere[pill.id]?.label ?? pill.label, icon: sfere[pill.id]?.icon ?? "", hint: localize("WOD5E_MAGE.Tiro.SphereHint") });
        break;
      case "scope":
        // Gli Ambiti stanno già nella Soglia, tutti e sei.
        break;
      case "attribute":
        riserva.push({ kind: "attribute", id: pill.id, img: traitIcon(pill.id), name: pill.label, value: numero(pill.value), hint: localize("WOD5E_MAGE.Tiro.AttributeHint"), via: true });
        break;
      case "skill":
        riserva.push({ kind: "skill", id: pill.id, img: skillIconOf(pill.id), name: pill.label, value: numero(pill.value), hint: localize("WOD5E_MAGE.Tiro.SkillHint"), via: true });
        break;
      case "specialty":
        riserva.push({ kind: "specialty", id: pill.id, skill: pill.skill, img: skillIconOf(pill.skill), name: pill.label, value: numero(pill.value), hint: localize("WOD5E_MAGE.Tiro.SpecialtyHint"), indent: true, via: true });
        break;
      case "trait": {
        const item = actor.items?.get?.(pill.id);
        riserva.push({ kind: "trait", id: pill.id, img: String(item?.img ?? ""), name: pill.label, value: pill.value ? numero(pill.value) : "", hint: pill.value ? format("WOD5E_MAGE.Tiro.TraitHintDice", { dice: conSegno(pill.value) }) : localize("WOD5E_MAGE.Tiro.TraitHint"), via: true });
        break;
      }
      case "power": {
        // Il potere (tappa 3): una riga dove pesa, coi dadi nella Riserva e la soglia nella Soglia;
        // se non tocca i numeri sta nella Riserva col solo nome. Le sue note nel sorvolo.
        const power = inputs.power;
        const icon = power?.sphere ? sfere[power.sphere]?.icon ?? "" : "";
        const hint = [...potere.note, ...potere.esclusi].join("\n");
        const sogliaPotere = conto.computed - conto.scopeThreshold;
        const righe = [];
        if (conto.powerDice > 0) righe.push(riserva);
        if (sogliaPotere !== 0) righe.push(soglia);
        if (!righe.length) righe.push(riserva);
        for (const colonna of righe) {
          const value = colonna === soglia ? conSegno(sogliaPotere) : (conto.powerDice > 0 ? numero(conto.powerDice) : "");
          colonna.push({ kind: "power", id: pill.id, img: icon, disc: Boolean(icon), name: pill.label, value, hint, via: true });
        }
        break;
      }
      default:
        break;
    }
  }
  // Il premio dell'Areté (Blue, 27/9): dadi nella riserva, con la spunta; spento mostra quanto darebbe.
  if (magick) {
    const on = Boolean(tiro.prize);
    riserva.push({ kind: "prize", id: "prize", img: `modules/${MODULE_ID}/assets/icons/ui/arete.svg`, name: localize("WOD5E_MAGE.Arete.Prize"), value: numero(on ? conto.prize : calculateAretePrize(arete.value, inputs.form)), check: { action: "tiroPrize", on }, off: !on, hint: format("WOD5E_MAGE.Arete.PrizeHint", { arete: arete.value }) });
  }
  // Le Condizioni sul tiro (29/9): la spunta le tiene; tolte, restano spente sulla riga.
  const cond = inputs.condizioni;
  for (const riga of cond.righe) {
    riserva.push({ kind: "condizione", id: riga.id, mask: riga.icon, numeral: riga.numeral, name: riga.name, value: riga.peso, meno: true, check: { action: "tiroCondizione", on: riga.on }, off: !riga.on, hint: format(riga.on ? "WOD5E_MAGE.Condizioni.TiroTogli" : "WOD5E_MAGE.Condizioni.TiroRimetti", { name: riga.name }) });
  }
  // La Quintessenza in dadi: solo coi poteri che lo dicono (Anche a mani nude).
  if (conto.quintessenceAllowed) {
    riserva.push({ kind: "quintessence", id: "quintessence", fa: "fa-solid fa-droplet", name: localize("WOD5E_MAGE.MagickBalance.Quintessence"), stepper: { action: "tiroQuintessence", value: numero(tiro.quintessence), min: !tiro.quintessence, max: tiro.quintessence >= inputs.quintessenceAvailable, extra: `/ ${inputs.quintessenceAvailable}` }, hint: localize("WOD5E_MAGE.Tiro.QuintessenceHint") });
  }

  // Chi paga il lancio (29/9): la Quintessenza libera è quella che resta dopo il costo del potere attivo.
  const quintessenzaLibera = conto.powerActive ? inputs.quintessenceAvailable : getMagickBalance(actor).quintessence;
  const pay = pagamentoDelLancio(tiro.pay, quintessenzaLibera);
  const haTratto = Boolean(attribute || skill);
  const sogliaSet = conto.difficultySet;
  const size = tiroSize(tiro);
  // Il tasto spento dice cosa manca (Blue, 16/9 sera: senza tratto o senza soglia il tiro non parte).
  const blocco = !haTratto ? localize("WOD5E_MAGE.Tiro.MancaTratto") : (!sogliaSet ? localize("WOD5E_MAGE.Tiro.MancaSoglia") : "");
  const senzaTirare = Boolean(inputs.power) && conto.autoSuccess;
  return {
    magick,
    size,
    empty: size === 0,
    kindLabel: localize(magick ? "WOD5E_MAGE.Tiro.KindMagick" : (tiro.attribute || tiro.skill ? "WOD5E_MAGE.Tiro.KindSkill" : "WOD5E_MAGE.Tiro.KindNone")),
    testa,
    pills,
    riserva: {
      righe: riserva,
      vuote: { attributo: !tiro.attribute, abilita: !tiro.skill },
      // Il totale (1/10): la riserva col ritocco dentro (riserva − Condizioni + ritocco, mai sotto zero). Il meno
      // e il più sono il ritocco, libero anche in meno; la matita dice di quanto. Senza tratti il numero è spento.
      totale: {
        value: conto.pool,
        label: numero(conto.pool),
        vuoto: !haTratto,
        ritocco: conto.adjust ? conSegno(conto.adjust) : "",
        meno: conto.pool <= 0 || conto.adjust <= -DADI_ADJUST_CAP,
        piu: conto.adjust >= DADI_ADJUST_CAP,
        hint: localize("WOD5E_MAGE.Tiro.RitoccoHint")
      },
      hint: localize("WOD5E_MAGE.Tiro.RiservaHint")
    },
    soglia: {
      righe: soglia,
      // A riquadro vuoto il posto degli Ambiti resta segnato; nella Magick le sei righe ci sono sempre.
      vuota: size === 0 && !soglia.length,
      // Il totale (1/10): la soglia, «?» finché manca del tutto. Il meno e il più la alzano o abbassano sopra il
      // conto degli Ambiti (nell'Abilità la fanno); la matita dice di quanto, nella Magick.
      totale: {
        value: sogliaSet ? conto.difficulty : null,
        label: sogliaSet ? numero(conto.difficulty) : "?",
        vuoto: !sogliaSet,
        ritocco: magick && conto.sogliaMano ? conSegno(conto.sogliaMano) : "",
        meno: sogliaSet && conto.difficulty <= 0,
        piu: conto.sogliaMano >= SOGLIA_MANO_CAP,
        hint: localize(magick ? "WOD5E_MAGE.Tiro.SogliaManoHint" : "WOD5E_MAGE.Tiro.SogliaManoAbilitaHint")
      },
      hint: localize("WOD5E_MAGE.Tiro.SogliaHint")
    },
    // L'esito (1/10), nella riga delle opzioni: i dadi che si tirano e da che faccia riescono; senza soglia
    // i dadi non si sanno («?»); la riuscita senza tirare e il tiro che fallisce prendono il suo posto.
    esito: {
      dadi: sogliaSet ? conto.dice : (haTratto ? "?" : 0),
      parola: localize(sogliaSet && conto.dice === 1 ? "WOD5E_MAGE.Tiro.DadoParola" : "WOD5E_MAGE.Tiro.DadiParola"),
      dal: conto.successFrom,
      spento: !haTratto || !sogliaSet,
      impossibile: conto.impossible && size > 0 && !senzaTirare,
      fallisce: conto.fallisce,
      fallisceTesto: conto.fallisce ? format("WOD5E_MAGE.Condizioni.TiroFallisce", { names: cond.perche.join(", ") }) : "",
      riesce: senzaTirare ? format("WOD5E_MAGE.Tiro.RiesceSenzaTirare", { name: potereLabel(inputs.power, localize) }) : ""
    },
    riservaTotale: conto.riservaTotale,
    pool: conto.pool,
    computed: conto.computed,
    difficulty: conto.difficulty,
    manual: conto.manual,
    dice: conto.dice,
    dadi: { value: conto.adjust, label: conSegno(conto.adjust) },
    impossible: conto.impossible && size > 0,
    successFrom: conto.successFrom,
    prize: { on: Boolean(tiro.prize) && magick, value: conto.prize, arete: arete.value },
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
    // «Dal Narratore» (Blue, 27/9): il tiro passa dai Narratori collegati (cinque secondi per
    // ritoccarlo) o parte subito; è una scelta di chi tira, e il Narratore non la vede.
    narratore: game.user?.isGM ? null : {
      on: dalNarratore(),
      hint: dalNarratore() ? format("WOD5E_MAGE.Verdetto.DalNarratoreHint", { seconds: VERDETTO_SECONDI }) : localize("WOD5E_MAGE.Verdetto.SenzaNarratoreHint")
    },
    // Il costo del lancio (Blue, 29/9): ogni lancio si paga, e si può sempre lanciare.
    // La scelta sta nelle opzioni; il prezzo di ogni tipo sta nel sorvolo del tasto (1/10: sul tasto solo il nome).
    costo: magick ? {
      pay,
      quintessenza: pay === "quintessenza",
      canQuintessenza: quintessenzaLibera >= 1,
      libera: quintessenzaLibera
    } : null,
    kinds: TIRO_KINDS.map((kind) => {
      const costo = costoLancio(kind, pay);
      const prezzo = testoCosto(costo, localize, format);
      return {
        kind,
        label: localize(`WOD5E_MAGE.Tiro.Kinds.${kind}`),
        hint: `${localize(`WOD5E_MAGE.Tiro.KindHints.${kind}`)} ${format("WOD5E_MAGE.Costo.Tasto", { prezzo })}`,
        costo
      };
    }),
    // Il tiro parte con almeno un tratto (Attributo o Abilità) e con la
    // soglia inserita (Blue, 16/9 sera); spento, il tasto dice cosa manca.
    ready: !blocco,
    blocco,
    needsDifficulty: haTratto && !sogliaSet,
    attributeLabel: attribute?.label ?? "",
    skillLabel: skill?.label ?? ""
  };
}

/**
 * Le righe degli Ambiti per il riquadro della Magick: otto pallini, il
 * primo è lo 0 (la base che non costa, acceso sempre, non si clicca: Blue,
 * 26/9) e poi i sette livelli, quello dichiarato acceso. Ogni Ambito ha due o tre lenti (la tavola del 23/9, rifatta il 29/9): la
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
    // Sul pallino solo la voce del livello (Blue, 27/9: «la scritta è eccessiva,
    // massimo tre parole»): la lettura della lente scelta, o il numero.
    const tipOf = (step) => readingOf(step) || String(step);
    // Lo 0 legge sempre (Blue, 26/9 sera: «Bersagli 0 dirà 1 Bersaglio»): con
    // la lente scelta la sua base, senza, la base della prima lente.
    const zeroReadingOf = () => (modeChosen ? readingOf(0) : String(options[0]?.readings?.[0] ?? zeroReading(id, localize, { arete })));
    const zeroTip = () => zeroReadingOf() || "0";
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
 * La lettura dell'Ambito (Peso, Influenza, Danni…). Dalla tendina delle
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
  // Come si paga (29/9) è una scelta di chi tira: resta anche dopo Azzera.
  return repaint(this, setPay(clearTiro(), tiroOf(this).pay));
}

/** Come si paga il lancio (Blue, 29/9): Quintessenza o Paradosso; la scelta resta finché non si cambia. */
export async function onTiroPaga(event, target) {
  event.preventDefault();
  return repaint(this, setPay(tiroOf(this), target.dataset.pay));
}

/** La soglia a mano (30/9): il meno e il più la alzano o abbassano sopra il conto degli Ambiti; `data-reset` la toglie. */
export async function onTiroSoglia(event, target) {
  event.preventDefault();
  const tiro = tiroOf(this);
  if (target.dataset.reset !== undefined) return repaint(this, setSoglia(tiro, null));
  return repaint(this, bumpSoglia(tiro, Number(target.dataset.delta) || 0));
}

export async function onTiroQuintessence(event, target) {
  event.preventDefault();
  const tiro = tiroOf(this);
  const available = getMagickBalance(this.actor).quintessence;
  const next = Math.min(Math.max(tiro.quintessence + (Number(target.dataset.delta) || 0), 0), available);
  return repaint(this, setQuintessence(tiro, next));
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

/** Una Condizione sul tiro (29/9): un clic la toglie perché non c'entra, un altro la rimette. */
export async function onTiroCondizione(event, target) {
  event.preventDefault();
  return repaint(this, toggleCondizioneTiro(tiroOf(this), target.dataset.condizione));
}

/** «Dal Narratore» (27/9): acceso, il tiro passa dai Narratori; spento, parte subito. Vale per questo client. */
export async function onTiroNarratore(event) {
  event.preventDefault();
  await scriviDalNarratore(!dalNarratore());
  return repaint(this, tiroOf(this));
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
  if (outcome) await repaint(this, setPay(clearTiro(), tiro.pay));
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

  // Il verdetto del Narratore (Blue, 16/9 sera): il tiro compare com'è a
  // tutti i Narratori collegati, il primo ha cinque secondi per ritoccare
  // Difficoltà e dadi o dire OK; poi si tira coi suoi numeri. Con «Dal
  // Narratore» spento parte subito. Un tiro già mandato non si rimanda.
  if (tiroInAttesa(actor.id)) {
    ui.notifications.warn(localize("WOD5E_MAGE.Verdetto.Pending"));
    return null;
  }
  const condizioniTesto = testoCondizioniDelTiro(inputs.condizioni);
  const verdetto = await chiediVerdetto({ actor, title: rollLabel, magick, kind: tiro.kind ?? "", conto, condizioni: { testo: condizioniTesto, fuori: inputs.condizioni.fuori, fallisce: conto.fallisce, dadi: conto.condizioni.dadi, successFromSenza: conto.condizioni.successFromSenza } });
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
  // Le Condizioni (29/9): in carta quelle che hanno pesato, quelle tolte a mano, e il tiro che fallisce;
  // se il Narratore ha detto che non contano, lo dice la sua nota.
  if (!conto.condizioniVia) {
    if (condizioniTesto) notes.push(format("WOD5E_MAGE.Condizioni.CartaPesano", { list: condizioniTesto }));
    if (conto.fallisce) notes.push(format("WOD5E_MAGE.Condizioni.TiroFallisce", { names: conto.condizioni.perche.join(", ") }));
  }
  if (inputs.condizioni.fuori.length) notes.push(format("WOD5E_MAGE.Condizioni.CartaFuori", { list: inputs.condizioni.fuori.join(", ") }));
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
        // Una Condizione che fa fallire (29/9): niente dadi, la carta dice il perché.
        pool: conto.fallisce ? 0 : conto.pool,
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
  if (conto.manual && conto.sogliaMano) notes.push(format("WOD5E_MAGE.Tiro.ManualDifficultyNote", { computed: conto.computed, difficulty: conto.difficulty, mano: `${conto.sogliaMano > 0 ? "+" : "−"}${Math.abs(conto.sogliaMano)}` }));

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

  // Il costo del lancio (Blue, 29/9): ogni lancio si paga, 1 Quintessenza oppure
  // il Paradosso del tipo (Accidentale 1, Volgare 2, con testimoni 3); chi paga
  // in Quintessenza prende lo stesso il Paradosso del Volgare.
  const balanceBefore = getMagickBalance(actor);
  const powerSpesa = conto.powerActive ? count(inputs.powerCost) : 0;
  const pay = pagamentoDelLancio(tiro.pay, balanceBefore.quintessence - powerSpesa - count(conto.quintessence));
  const costo = costoLancio(tiro.kind, pay);
  const paradoxGain = costo.paradosso;
  notes.unshift(format("WOD5E_MAGE.Costo.Nota", { prezzo: testoCosto(costo, localize, format) }));
  // La Ruota paga subito: il costo del lancio, quello del potere attivo e la
  // Quintessenza in dadi di un potere scendono; il Paradosso del costo sale.
  const spesa = costo.quintessenza + conto.quintessence + powerSpesa;
  let balanceMoved = false;
  if ((spesa > 0 || paradoxGain > 0) && actor.isOwner) {
    const spent = { quintessence: Math.max(balanceBefore.quintessence - spesa, 0), paradox: balanceBefore.paradox };
    const balanceAfter = addParadoxToBalance(spent, paradoxGain);
    if (balanceAfter.paradox !== balanceBefore.paradox || balanceAfter.quintessence !== balanceBefore.quintessence) {
      await actor.setFlag(MODULE_ID, "magickBalance", balanceAfter);
      balanceMoved = true;
      ui.notifications.info(format("WOD5E_MAGE.Costo.Pagato", { prezzo: testoCosto({ quintessenza: spesa, paradosso: paradoxGain }, localize, format) }));
    }
  }
  // I rossi a parte (29/9): solo nei Volgari, uno per punto sulla Ruota dopo il pagamento.
  const paradoxRating = options.coincidental ? 0 : getMagickBalance(actor).paradox;

  let outcome = null;
  try {
    outcome = await rollRamoCDirect({
      actor,
      data: actor.system,
      pool: conto.fallisce ? 0 : conto.pool,
      threshold: conto.difficulty,
      successFrom: conto.successFrom,
      // Il tiro che fallisce per una Condizione non tira nemmeno i rossi: non può riuscire.
      paradoxRating: conto.fallisce ? 0 : paradoxRating,
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
        // Il costo del lancio (29/9): il Narratore copia il Paradosso preso, qualunque sia il tipo.
        kind: tiro.kind,
        costo,
        paradossoPreso: paradoxGain,
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
  // Il Volgare fallito non rende più Quintessenza (rifondazione del 14/9, ribadito il 29/9).
  // La Durata dichiarata scrive il lancio fra le Magick in atto.
  await recordEffect(actor, { maintained: false, maintainedName: "" }, effect);
  return outcome;
}
