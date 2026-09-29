import { CONDIZIONI, FAMIGLIE_CONDIZIONI, SCALE_CONDIZIONI } from "./data/condizioni.js";
import { MODULE_ID } from "./constants.js";

/**
 * Le Condizioni di M6 (la regola di base del 29/9/2026, verdetto di Blue).
 * Ogni Condizione sta in una famiglia (Sensi, Corpo, Mente, Soprannaturale)
 * e quasi sempre su una scala di tre gradi: il grado 1 toglie due dadi, il
 * 2 due dadi e porta la difficoltà a 8, il 3 fa fallire il tiro; solo sui
 * tipi di tiro della scala (fisici, sociali, mentali). I lievi tolgono un
 * dado ciascuno e si sommano; il Controllo non tocca i dadi. L'icona è
 * quella della famiglia, col grado in numeri romani.
 *
 * Sulla scheda: sotto la Ruota una riga per Condizione accesa, e il più
 * che apre la scelta per famiglia e per scala; un clic accende, un altro
 * spegne, e su una scala si sta a un gradino solo. Accesa, la Condizione è
 * un oggetto «condition» del sistema addosso al personaggio; i dadi li
 * conta il riquadro del Tiro dai dati del modulo, e lì ognuna si toglie con
 * un clic quando non c'entra (la discrezione del Narratore).
 */

export const CONDIZIONE_FLAG = "condizione";

/** I tre tipi di tiro, detti dall'Attributo della riserva. */
export const TIPI_TIRO = Object.freeze(["physical", "social", "mental"]);

/**
 * Il gruppo di ogni Abilità del sistema (i tre percorsi di wod5e): dice il
 * tipo del tiro quando nella riserva non c'è un Attributo.
 */
export const GRUPPI_ABILITA = Object.freeze({
  athletics: "physical", brawl: "physical", craft: "physical", drive: "physical", firearms: "physical", larceny: "physical", melee: "physical", stealth: "physical", survival: "physical",
  animalken: "social", etiquette: "social", insight: "social", intimidation: "social", leadership: "social", performance: "social", persuasion: "social", streetwise: "social", subterfuge: "social",
  academics: "mental", awareness: "mental", finance: "mental", investigation: "mental", medicine: "mental", occult: "mental", politics: "mental", science: "mental", technology: "mental"
});

/**
 * Il tipo del tiro (la guida, «Tiri»): lo dice l'Attributo della riserva
 * (Forza, Destrezza, Costituzione fisici; Carisma, Persuasione,
 * Autocontrollo sociali; Intelligenza, Prontezza, Fermezza mentali); senza
 * Attributo, il gruppo dell'Abilità; altrimenti non si sa ("").
 */
export function tipoDelTiro({ attribute = null, skill = null } = {}) {
  const dalla = String(attribute?.category ?? "");
  if (TIPI_TIRO.includes(dalla)) return dalla;
  const gruppo = GRUPPI_ABILITA[String(skill?.id ?? "")] ?? "";
  return TIPI_TIRO.includes(gruppo) ? gruppo : "";
}

/** Il peso in breve, per le righe, le pillole e le carte. */
export const PESO_BREVE = Object.freeze({ meno2: "−2", otto: "−2 e 8", fallisce: "fallisce", lieve: "−1", scelte: "", azione: "", nessuno: "" });

/** I pesi che il Tiro conta da solo. */
export const PESI_DEL_TIRO = Object.freeze(["meno2", "otto", "fallisce", "lieve"]);

/** I dadi tolti da un peso: −2 ai gradi 1 e 2, −1 ai lievi. */
export function dadiDelPeso(weight) {
  if (weight === "meno2" || weight === "otto") return -2;
  if (weight === "lieve") return -1;
  return 0;
}

export function pesoBreve(entry) {
  return PESO_BREVE[entry?.weight] ?? "";
}

/** Per chi si aspetta ancora i «dadi» di una Condizione: il peso in breve. */
export function condizioneDice(entry) {
  return pesoBreve(entry);
}

function maiuscola(text) {
  const t = String(text ?? "").trim();
  return t ? t[0].toUpperCase() + t.slice(1) : t;
}

function punto(text) {
  const t = String(text ?? "").trim();
  return !t || /[.!?]$/.test(t) ? t : `${t}.`;
}

/** Il nome senza la parte tra parentesi e senza l'asterisco: «Rotto (braccio sinistro)» è Rotto. */
function nomePulito(name) {
  return String(name ?? "").replace(/\(.*?\)/g, "").replace(/\*/g, "").trim().toLowerCase();
}

export function findCondizione(id) {
  const key = String(id ?? "");
  return key ? CONDIZIONI.find((entry) => entry.id === key) ?? null : null;
}

export function findCondizioneByName(name) {
  const wanted = nomePulito(name);
  return wanted ? CONDIZIONI.find((entry) => entry.name.toLowerCase() === wanted) ?? null : null;
}

/** L'id della Condizione di lista che un oggetto porta nella bandiera, o "". */
export function condizioneIdOf(item) {
  const flags = item?.flags?.[MODULE_ID] ?? {};
  return String(flags[CONDIZIONE_FLAG] ?? "");
}

/**
 * La voce di lista di un oggetto «condition»: dalla bandiera, o dal nome
 * se la bandiera non c'è (le Condizioni trascinate dal compendio di prima).
 * Una bandiera che non è più in lista (Bloccato, Rallentato…) lascia
 * l'oggetto fuori lista, coi dati suoi.
 */
export function definizioneDi(item) {
  if (item?.type !== "condition") return null;
  const id = condizioneIdOf(item);
  if (id) return findCondizione(id);
  return findCondizioneByName(item.name);
}

/** Gli oggetti «condition» del personaggio che sono Condizioni di lista, per id. */
export function activeCondizioni(items) {
  const active = new Map();
  for (const item of items ?? []) {
    const entry = definizioneDi(item);
    if (entry && !active.has(entry.id)) active.set(entry.id, item);
  }
  return active;
}

/** Il nome col grado: «Offuscato II», «Contuso». */
export function nomeColGrado(entry) {
  return entry?.numeral ? `${entry.name} ${entry.numeral}` : String(entry?.name ?? "");
}

/** Il titolo del sorvolo: nome e grado, la scala, com'è e cosa fa. */
export function condizioneTitle(entry) {
  const scala = entry.section === "scala" || entry.section === "sola" ? `${entry.scaleLabel} · ` : "";
  const what = entry.what ? `${punto(entry.what)} ` : "";
  return `${nomeColGrado(entry)} · ${scala}${what}${punto(maiuscola(entry.effect))}`.trim();
}

function voceScelta(entry, active) {
  const item = active.get(entry.id);
  return {
    id: entry.id,
    name: entry.name,
    numeral: entry.numeral,
    grade: entry.grade,
    family: entry.family,
    icon: entry.familyIcon,
    active: Boolean(item),
    suppressed: Boolean(item?.system?.suppressed),
    dice: pesoBreve(entry),
    weight: entry.weight,
    proposed: Boolean(entry.proposed),
    title: condizioneTitle(entry)
  };
}

/**
 * La scelta, nell'ordine della guida: le quattro famiglie con le loro
 * scale (ogni scala una riga coi suoi gradi), poi i lievi del corpo e della
 * mente, poi lo scontro. Ogni voce sa se è accesa.
 */
export function prepareCondizioni(items) {
  const active = activeCondizioni(items);
  const sezioni = FAMIGLIE_CONDIZIONI.map((famiglia) => ({
    id: famiglia.id,
    label: famiglia.label,
    icon: famiglia.icon,
    scale: SCALE_CONDIZIONI
      .filter((scala) => scala.family === famiglia.id)
      .map((scala) => ({ id: scala.id, label: scala.label, voci: CONDIZIONI.filter((entry) => entry.scale === scala.id).map((entry) => voceScelta(entry, active)) }))
      .filter((scala) => scala.voci.length)
  }));
  const lievi = CONDIZIONI.filter((entry) => entry.section === "lievi");
  sezioni.push({
    id: "lievi",
    label: SCALE_CONDIZIONI.find((scala) => scala.id === "lievi")?.label ?? "Lievi",
    icon: "",
    scale: FAMIGLIE_CONDIZIONI
      .map((famiglia) => ({ id: `lievi-${famiglia.id}`, label: famiglia.label, voci: lievi.filter((entry) => entry.family === famiglia.id).map((entry) => voceScelta(entry, active)) }))
      .filter((scala) => scala.voci.length)
  });
  sezioni.push({
    id: "scontro",
    label: SCALE_CONDIZIONI.find((scala) => scala.id === "scontro")?.label ?? "Scontro",
    icon: "",
    scale: [{ id: "scontro", label: "", voci: CONDIZIONI.filter((entry) => entry.section === "scontro").map((entry) => voceScelta(entry, active)) }]
  });
  return sezioni;
}

/** L'oggetto che va addosso al personaggio, sempre dai dati del modulo. */
export function condizioneItemData(entry) {
  return {
    name: entry.name,
    type: "condition",
    img: entry.icon,
    system: {
      description: entry.description,
      bonuses: entry.bonuses.map((bonus) => ({ ...bonus, paths: [...bonus.paths], activeWhen: { ...bonus.activeWhen } })),
      source: { book: "M6 · Le Condizioni", page: "" },
      effects: {},
      suppressed: false
    },
    flags: { [MODULE_ID]: { [CONDIZIONE_FLAG]: entry.id } }
  };
}

/** Il testo di una descrizione, senza i tag, per una riga corta. */
function plainText(html) {
  return String(html ?? "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

/** I dadi scritti su un oggetto fuori lista: «−2», «−1 −1», "". */
function dadiScritti(item) {
  return (item?.system?.bonuses ?? [])
    .map((bonus) => Number(bonus?.value) || 0)
    .filter((value) => value !== 0)
    .map((value) => (value > 0 ? `+${value}` : `−${Math.abs(value)}`))
    .join(" ");
}

/**
 * Le righe delle Condizioni accese: l'icona della famiglia col grado, il
 * nome (quello dell'oggetto: «Rotto (braccio sinistro)»), il peso, e
 * aperta la spiegazione, com'è e cosa fa. Le Condizioni di lista leggono
 * dal modulo, le altre dal loro oggetto.
 */
export function prepareConditionRows(items) {
  const rows = [];
  for (const item of items ?? []) {
    if (item?.type !== "condition") continue;
    const definition = definizioneDi(item);
    const dice = definition ? pesoBreve(definition) : dadiScritti(item);
    const what = definition ? definition.what : plainText(item.system?.description).slice(0, 90);
    const effect = definition ? punto(maiuscola(definition.effect)) : "";
    const name = String(item.name ?? definition?.name ?? "");
    rows.push({
      id: item.id ?? item._id,
      uuid: item.uuid ?? "",
      img: definition?.familyIcon ?? item.img,
      numeral: definition?.numeral ?? "",
      family: definition?.family ?? "",
      name,
      what,
      effect,
      dice,
      weight: definition?.weight ?? "",
      list: Boolean(definition),
      condizione: definition?.id ?? "",
      scale: definition && (definition.section === "scala" || definition.section === "sola") ? definition.scaleLabel : "",
      title: definition ? condizioneTitle({ ...definition, name }) : `${name}${dice ? ` (${dice})` : ""}${what ? ` · ${what}` : ""}`,
      suppressed: Boolean(item.system?.suppressed)
    });
  }
  return rows;
}

/** La Condizione accesa su una scala (una sola per scala), con l'oggetto che la porta. */
export function gradoSullaScala(items, scala) {
  for (const [id, item] of activeCondizioni(items)) {
    const entry = findCondizione(id);
    if (entry?.section === "scala" && entry.scale === scala) return { entry, item };
  }
  return null;
}

/** Gli oggetti delle altre Condizioni della stessa scala: su una scala si sta a un gradino solo. */
function altriGradi(items, entry) {
  if (entry?.section !== "scala") return [];
  const out = [];
  for (const [id, item] of activeCondizioni(items)) {
    const other = findCondizione(id);
    if (other && other.id !== entry.id && other.section === "scala" && other.scale === entry.scale) out.push(item);
  }
  return out;
}

function idsOf(items) {
  return items.map((item) => item.id ?? item._id).filter(Boolean);
}

/**
 * Accende o spegne una Condizione di lista (la scelta sulla scheda e dal
 * Master): accesa, prende il posto dell'altro grado della sua scala.
 * Torna true se accesa.
 */
export async function toggleCondizione(actor, entry) {
  const current = activeCondizioni(actor.items).get(entry.id);
  if (current) {
    await actor.deleteEmbeddedDocuments("Item", idsOf([current]));
    return false;
  }
  const others = idsOf(altriGradi(actor.items, entry));
  if (others.length) await actor.deleteEmbeddedDocuments("Item", others);
  await actor.createEmbeddedDocuments("Item", [condizioneItemData(entry)]);
  return true;
}

/**
 * Il grado dopo un colpo (la guida: «un altro colpo dello stesso tipo fa
 * salire la Condizione di un gradino»; su una scala si sta a un gradino
 * solo): senza niente sulla scala entra quella del colpo; con qualcosa sale
 * di uno, o arriva al grado del colpo se è più alto; mai sopra il 3.
 */
export function gradoDopoIlColpo(corrente, colpo) {
  const arrivo = Math.max(Number(colpo) || 0, 1);
  if (!corrente) return Math.min(arrivo, 3);
  return Math.min(Math.max((Number(corrente) || 0) + 1, arrivo), 3);
}

/**
 * Il colpo che mette una Condizione (il tasto «Applica» del nemico): fuori
 * dalle scale si accende se manca; su una scala sale di un gradino.
 * Torna la voce che il bersaglio porta dopo.
 */
export async function applicaCondizione(actor, entry) {
  const active = activeCondizioni(actor.items);
  if (entry.section !== "scala") {
    if (!active.has(entry.id)) await actor.createEmbeddedDocuments("Item", [condizioneItemData(entry)]);
    return entry;
  }
  const current = gradoSullaScala(actor.items, entry.scale);
  const grado = gradoDopoIlColpo(current?.entry.grade, entry.grade);
  const target = CONDIZIONI.find((other) => other.section === "scala" && other.scale === entry.scale && other.grade === grado) ?? entry;
  if (current?.entry.id === target.id) return target;
  if (current) await actor.deleteEmbeddedDocuments("Item", idsOf([current.item]));
  await actor.createEmbeddedDocuments("Item", [condizioneItemData(target)]);
  return target;
}

/**
 * Le Condizioni sul tiro (la guida, «Tiri» e «Somme»): quelle accese che
 * pesano sul tipo del tiro (fisico, sociale, mentale, dall'Attributo della
 * riserva), ognuna col suo peso. `scelte` dice quali sono state tolte a
 * mano ({ id: false }): la Condizione pesa solo se c'entra con quello che
 * il personaggio fa, e lo decide il tavolo. I dadi tolti si sommano, l'8
 * non si somma, una che fa fallire fa fallire il tiro.
 */
export function condizioniDelTiro(items, tipo, scelte = {}) {
  const vuoto = { tipo: TIPI_TIRO.includes(tipo) ? tipo : "", righe: [], dadi: 0, otto: false, fallisce: false, perche: [], fuori: [] };
  if (!TIPI_TIRO.includes(tipo)) return vuoto;
  const viste = new Set();
  const righe = [];
  for (const item of items ?? []) {
    const entry = definizioneDi(item);
    if (!entry || viste.has(entry.id) || item.system?.suppressed) continue;
    if (!PESI_DEL_TIRO.includes(entry.weight) || !entry.tipi.includes(tipo)) continue;
    viste.add(entry.id);
    righe.push({
      id: entry.id,
      name: String(item.name ?? entry.name),
      numeral: entry.numeral,
      family: entry.family,
      icon: entry.familyIcon,
      weight: entry.weight,
      peso: pesoBreve(entry),
      dadi: dadiDelPeso(entry.weight),
      on: scelte?.[entry.id] !== false
    });
  }
  const accese = righe.filter((riga) => riga.on);
  return {
    ...vuoto,
    righe,
    dadi: accese.reduce((total, riga) => total + riga.dadi, 0),
    otto: accese.some((riga) => riga.weight === "otto"),
    fallisce: accese.some((riga) => riga.weight === "fallisce"),
    perche: accese.filter((riga) => riga.weight === "fallisce").map((riga) => riga.name),
    fuori: righe.filter((riga) => !riga.on).map((riga) => riga.name)
  };
}

/** Le Condizioni del tiro in una riga, per la carta e per il Narratore: «Offuscato −2 e 8, Contuso −1». */
export function testoCondizioniDelTiro(conto) {
  return (conto?.righe ?? []).filter((riga) => riga.on).map((riga) => `${riga.name} ${riga.peso}`.trim()).join(", ");
}

/**
 * Il riallineamento di un oggetto di lista ai dati di oggi (le Condizioni
 * accese prima del 29/9 portano i dadi e il simbolo di prima): torna
 * l'aggiornamento da fare, o null se è già a posto. Il nome si tiene
 * («Rotto (braccio sinistro)»).
 */
export function aggiornamentoCondizione(item) {
  const entry = definizioneDi(item);
  if (!entry) return null;
  const data = condizioneItemData(entry);
  const update = {};
  if (item.img !== data.img) update.img = data.img;
  if (JSON.stringify(item.system?.bonuses ?? []) !== JSON.stringify(data.system.bonuses)) update["system.bonuses"] = data.system.bonuses;
  if (String(item.system?.description ?? "") !== data.system.description) update["system.description"] = data.system.description;
  if (condizioneIdOf(item) !== entry.id) update[`flags.${MODULE_ID}.${CONDIZIONE_FLAG}`] = entry.id;
  return Object.keys(update).length ? update : null;
}

/** L'impostazione del mondo che ricorda fin dove le Condizioni sono state riallineate. */
export const CONDIZIONI_VERSIONE_SETTING = "condizioniVersione";
/** La versione delle Condizioni di oggi: la regola di base del 29/9/2026. */
export const CONDIZIONI_VERSIONE = "2026-09-29";

/**
 * Il riallineamento del mondo (una volta, dal Narratore): le Condizioni di
 * lista già accese sui personaggi e sui token non collegati prendono il
 * simbolo, i dadi e la descrizione di oggi. Torna quante ne ha toccate.
 */
export async function riallineaCondizioni({ actors = [], tokens = [] } = {}) {
  let toccate = 0;
  const attori = [...actors, ...tokens.map((token) => token?.actor).filter(Boolean)];
  const visti = new Set();
  for (const actor of attori) {
    const key = actor?.uuid ?? actor;
    if (visti.has(key)) continue;
    visti.add(key);
    const updates = [];
    for (const item of actor.items ?? []) {
      const update = aggiornamentoCondizione(item);
      if (update) updates.push({ _id: item.id ?? item._id, ...update });
    }
    if (!updates.length) continue;
    try {
      await actor.updateEmbeddedDocuments("Item", updates);
      toccate += updates.length;
    } catch (error) {
      console.warn(`wod5e-mage | Le Condizioni di ${actor?.name ?? "?"} non si sono riallineate.`, error);
    }
  }
  return toccate;
}

/**
 * Il clic su una Condizione, nella scelta o sulla riga accesa: accende o
 * spegne quella di lista; un oggetto fuori lista si toglie e basta.
 */
export async function onCondizioneToggle(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!actor.isOwner) {
    ui.notifications.warn(game.i18n.format("WOD5E.Notifications.NoSufficientPermission", { string: actor.name }));
    return;
  }
  const entry = findCondizione(target.dataset.condizione);
  if (entry) {
    await toggleCondizione(actor, entry);
    return;
  }
  const itemId = target.dataset.itemId;
  if (itemId && actor.items.get(itemId)) await actor.deleteEmbeddedDocuments("Item", [itemId]);
}
