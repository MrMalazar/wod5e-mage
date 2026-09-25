/**
 * I poteri delle Sfere (raccolta del 14/9/2026, rifatta il 21/9): le Sfere
 * non hanno gradi di potere, sono contenitori. Un potere modifica un numero,
 * un tiro, una risorsa o una regola del lancio; un potere solo per lancio
 * (Blue, 16/9).
 *
 * Dal 21/9 (Blue: «si devono contare i poteri che inserisce il giocatore,
 * non gli slot disponibili, perché quando il giocatore li comprerà con
 * l'esperienza starà a lui inserirne») i poteri stanno sul personaggio,
 * nella bandiera `poteri`: una riga per potere, con la Sfera, il nome, il
 * pallino richiesto, il tipo (attivo o passivo), Cosa fa, l'Amalgama (la
 * seconda Sfera e cosa sblocca), il Flavor, il costo, e da dove viene
 * (il catalogo di data/poteri.js, o la mano del giocatore). Il conto dei
 * poteri conosciuti di una Sfera è il numero di queste righe.
 *
 * Gli effetti sul tiro (tappa 3, 24/9) stanno nel catalogo, in `effects`
 * (scritti a mano dal testo in tools/dati/effetti_poteri.json): una lista
 * di { on, value, scope, roll, mode, requires, when, nota }, che applyPotere
 * mette nel conto del tiro composto. Tutto qui è puro.
 */
import { MODULE_ID } from "./constants.js";
import { SPHERES } from "./spheres.js";
import { POTERI } from "./data/poteri.js";

export { POTERI };

/** La bandiera del personaggio coi poteri inseriti. */
export const POTERI_FLAG = "poteri";

/** I pallini di una Sfera: il pallino richiesto da un potere va da 1 a 5. */
export const POTERE_DOTS = 5;

/** I due tipi (foglio, colonna Tipo): attivo lo decide il giocatore e paga qualcosa, passivo scatta da solo. */
export const POTERE_TIPI = Object.freeze(["attivo", "passivo"]);

/**
 * I ganci degli effetti sul tiro: dadi in più, soglia, da che numero si
 * riesce, riuscita senza tirare, un Ambito che non conta fino a un livello,
 * la Quintessenza anche nei tiri di Abilità, il premio dell'Areté doppio,
 * e la sola nota in carta.
 */
export const POTERE_EFFECTS = Object.freeze(["dice", "threshold", "successFrom", "autoSuccess", "freeScope", "quintessenceOnSkills", "prizeDouble", "nota"]);

/** Le condizioni che il modulo sa controllare da sé (le altre le vede il Narratore in carta). */
export const POTERE_CONDIZIONI = Object.freeze(["saluteMeta", "abilita1", "dadi1", "dadi2", "incantesimoScelto", "abilitaScelta", "potenza3"]);

/** Le condizioni sui dadi si controllano a conto fatto: le altre prima. */
const CONDIZIONI_SUI_DADI = Object.freeze(["dadi1", "dadi2"]);

/** Cosa si sceglie all'acquisto: un Ambito (Ambito di casa), un'Abilità (Mestiere), un incantesimo (La Pratica rende Perfetti). */
export const POTERE_SCELTE = Object.freeze(["ambito", "abilita", "incantesimo"]);

/** La variante «attivo» di un potere nel lancio: l'id della riga più questo suffisso. */
export const VARIANTE_ATTIVA = "attivo";
const SEPARATORE_VARIANTE = "#";

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

function testo(value) {
  return String(value ?? "").trim();
}

function sfera(value) {
  const id = testo(value);
  return SPHERES.includes(id) ? id : "";
}

/** Una riga della bandiera letta pulita: ogni campo al suo posto e del suo tipo. */
export function normalizzaPotere(id, row = {}) {
  const dot = Math.min(count(row?.dot), POTERE_DOTS);
  const type = testo(row?.type);
  return {
    id: String(id ?? ""),
    sphere: sfera(row?.sphere),
    name: testo(row?.name),
    dot,
    type: POTERE_TIPI.includes(type) ? type : "",
    text: testo(row?.text),
    amalgam: sfera(row?.amalgam),
    amalgamText: testo(row?.amalgamText),
    flavor: testo(row?.flavor),
    cost: testo(row?.cost),
    source: row?.source === "catalogo" ? "catalogo" : "mano",
    catalogId: testo(row?.catalogId),
    // Dal catalogo del 24/9: la matrice di provenienza, il legame, il costo e il limite d'uso.
    formula: testo(row?.formula),
    formulaName: testo(row?.formulaName),
    link: testo(row?.link),
    costValue: count(row?.costValue),
    uses: row?.uses && typeof row.uses === "object" ? { per: testo(row.uses.per), n: Math.max(count(row.uses.n), 1) } : null,
    paradox: testo(row?.paradox),
    effects: Array.isArray(row?.effects) ? row.effects : [],
    // La scelta fatta all'acquisto (tappa 3): l'Ambito, l'Abilità o l'incantesimo che il potere chiede.
    scelta: testo(row?.scelta)
  };
}

/** L'ordine delle righe: per Sfera (come `order`), poi per pallino, poi per nome. */
export function ordinaPoteri(rows, order = SPHERES) {
  const rank = new Map((order ?? SPHERES).map((sphere, index) => [sphere, index]));
  return [...rows].sort((a, b) =>
    (rank.get(a.sphere) ?? 99) - (rank.get(b.sphere) ?? 99)
    || (a.dot || 99) - (b.dot || 99)
    || a.name.localeCompare(b.name, "it"));
}

/**
 * I poteri che un personaggio ha inserito, puliti e in ordine. `order` è la
 * fila delle Sfere della scheda (in alfabetico nella lingua in uso).
 */
export function poteriDelPersonaggio(actor, { order = null } = {}) {
  const stored = actor?.getFlag?.(MODULE_ID, POTERI_FLAG) ?? {};
  const rows = Object.entries(stored ?? {})
    .filter(([, row]) => row && typeof row === "object")
    .map(([id, row]) => normalizzaPotere(id, row));
  return ordinaPoteri(rows, order ?? SPHERES);
}

/** I poteri di una Sfera sola. */
export function poteriOfSphere(rows, sphere) {
  return (rows ?? []).filter((power) => power.sphere === sphere);
}

/** Il conto per Sfera: { forces: 3, life: 0, … }, tutte e nove le Sfere. */
export function contoPoteri(rows) {
  const conti = Object.fromEntries(SPHERES.map((sphere) => [sphere, 0]));
  for (const power of rows ?? []) {
    if (power.sphere in conti) conti[power.sphere] += 1;
  }
  return conti;
}

/** Un potere per id, fra le righe date (quelle del personaggio). */
export function findPotere(id, rows = []) {
  const key = String(id ?? "");
  return (rows ?? []).find((power) => power.id === key) ?? null;
}

/** Il nome che si stampa: quello scritto, o «(senza nome)» finché non c'è. */
export function potereLabel(power, localize = (key) => key) {
  if (!power) return "";
  return testo(power.name) || localize("WOD5E_MAGE.Poteri.SenzaNome");
}

/**
 * La riga nuova da scrivere nella bandiera: vuota, sulla Sfera data (il
 * giocatore la riempie a mano), oppure copiata da una voce del catalogo.
 */
export function nuovoPotere(sphere, entry = null) {
  const base = {
    sphere: sfera(sphere) || sfera(entry?.sphere),
    name: "",
    dot: 0,
    type: "",
    text: "",
    amalgam: "",
    amalgamText: "",
    flavor: "",
    cost: "",
    source: "mano",
    catalogId: ""
  };
  if (!entry) return base;
  return {
    ...base,
    // La Sfera è quella scelta nella tendina (il catalogo del 24/9 ne apre più d'una).
    sphere: sfera(sphere) || sfera(entry.sphere) || sfera(entry.spheres?.[0]),
    name: testo(entry.name),
    dot: Math.min(count(entry.dot), POTERE_DOTS),
    type: POTERE_TIPI.includes(testo(entry.type)) ? testo(entry.type) : "",
    text: testo(entry.text),
    amalgam: sfera(entry.amalgam),
    amalgamText: testo(entry.amalgamText),
    flavor: testo(entry.flavor),
    cost: testo(entry.cost),
    source: "catalogo",
    catalogId: testo(entry.id),
    formula: testo(entry.formula),
    formulaName: testo(entry.formulaName),
    link: testo(entry.link),
    costValue: count(entry.costValue),
    uses: entry.uses && typeof entry.uses === "object" ? { per: testo(entry.uses.per), n: Math.max(count(entry.uses.n), 1) } : null,
    paradox: testo(entry.paradox),
    effects: Array.isArray(entry.effects) ? entry.effects : []
  };
}

/** Le Sfere che aprono una voce del catalogo: `spheres` (con «any» per tutte), o la vecchia `sphere` sola. */
export function sfereDellaVoce(entry) {
  if (Array.isArray(entry?.spheres) && entry.spheres.length) {
    return entry.spheres.includes("any") ? [...SPHERES] : entry.spheres.filter((sphere) => SPHERES.includes(sphere));
  }
  const one = sfera(entry?.sphere);
  return one ? [one] : [];
}

/**
 * Le voci del catalogo per la tendina «Aggiungi» di una Sfera: in ordine di
 * pallino, `known` se il personaggio ce l'ha già (stesso id di catalogo),
 * `locked` se chiede più pallini di quelli della Sfera (`rating`). Un
 * catalogo vuoto dà una lista vuota: resta la scrittura a mano.
 */
/**
 * I prerequisiti d'acquisto di una voce (Blue, 25/9: «i poteri sono
 * acquistabili a principio dalla gerarchia»; 25/9 sera: «li scriviamo in più
 * righe, una riga per ogni condizione»). `entry.prerequisiti` è una lista di
 * condizioni, una per riga: `{ numero: N }` (tanti poteri della stessa Sfera
 * già conosciuti), `{ potere: id }` (un potere preciso, anche di un'altra
 * Sfera), `{ testo: "…" }` (una condizione che giudica il tavolo: il modulo
 * la scrive e basta). Il vecchio formato `{ numero, poteri }` si legge ancora.
 * Torna una riga per condizione: { kind, n, id, testo, ok } con ok true
 * (c'è), false (manca) o null (la giudica il tavolo). Il grado (`dot`) non
 * chiude niente da solo. `owned` sono le righe del personaggio nella Sfera,
 * `tutti` tutte le sue righe.
 */
export function condizioniDelPotere(entry, { owned = [], tutti = null } = {}) {
  const voce = entry?.prerequisiti;
  if (!voce || typeof voce !== "object") return [];
  const lista = Array.isArray(voce)
    ? voce
    : [...(count(voce.numero) ? [{ numero: count(voce.numero) }] : []), ...((voce.poteri ?? []).map((id) => ({ potere: id })))];
  const conosciuti = (owned ?? []).filter((power) => power?.catalogId !== entry.id).length;
  const have = new Set((tutti ?? owned ?? []).map((power) => power?.catalogId).filter(Boolean));
  const righe = [];
  for (const condizione of lista) {
    if (!condizione || typeof condizione !== "object") continue;
    if (count(condizione.numero)) righe.push({ kind: "numero", n: count(condizione.numero), id: "", testo: "", ok: conosciuti >= count(condizione.numero) });
    else if (testo(condizione.potere)) righe.push({ kind: "potere", n: 0, id: testo(condizione.potere), testo: "", ok: have.has(testo(condizione.potere)) });
    else if (testo(condizione.testo)) righe.push({ kind: "testo", n: 0, id: "", testo: testo(condizione.testo), ok: null });
  }
  return righe;
}

/** Cosa manca per prendere il potere: le condizioni non soddisfatte, o null se si può prendere. */
export function prerequisitiMancanti(entry, { owned = [], tutti = null } = {}) {
  const mancano = condizioniDelPotere(entry, { owned, tutti }).filter((riga) => riga.ok === false);
  return mancano.length ? mancano : null;
}

/**
 * Il catalogo di una Sfera: tutte le voci che la Sfera apre (le sue, e
 * quelle di Qualsiasi Sfera), in ordine di grado e poi di nome, con `known`
 * (già sul personaggio) e `chiuso` (i prerequisiti che mancano, o null).
 * Niente quota sui pallini (25/9): i livelli della Sfera sono un promemoria.
 */
/** Il grado per l'ordine delle liste: senza grado si va in coda. */
export function gradoPerOrdine(dot) {
  const grado = Math.trunc(Number(dot) || 0);
  return grado > 0 ? grado : 99;
}

export function catalogoDellaSfera(sphere, { catalog = POTERI, owned = [], tutti = null } = {}) {
  // La spunta guarda tutte le righe del personaggio (25/9 sera): un potere si prende una volta sola,
  // e resta segnato nella Sfera in cui lo si è preso (`knownSphere`), anche se è di qualsiasi Sfera.
  const dove = new Map();
  for (const power of tutti ?? owned ?? []) {
    if (power?.catalogId && !dove.has(power.catalogId)) dove.set(power.catalogId, sfera(power.sphere));
  }
  return (catalog ?? [])
    .filter((entry) => sfereDellaVoce(entry).includes(sphere))
    .map((entry) => {
      // Le condizioni, una per riga (25/9 sera); chiuso se una manca.
      const condizioni = condizioniDelPotere(entry, { owned, tutti });
      const chiuso = condizioni.filter((riga) => riga.ok === false);
      return {
        id: entry.id,
        name: testo(entry.name),
        dot: Math.min(count(entry.dot), POTERE_DOTS),
        type: testo(entry.type),
        amalgam: sfera(entry.amalgam),
        formulaName: testo(entry.formulaName),
        proposal: entry.link === "proposta",
        known: dove.has(entry.id),
        knownSphere: dove.get(entry.id) ?? "",
        condizioni,
        chiuso: chiuso.length ? chiuso : null,
        locked: chiuso.length > 0
      };
    })
    // In ordine di grado e poi di nome; i poteri col grado ancora da assegnare in coda (25/9 sera).
    .sort((a, b) => gradoPerOrdine(a.dot) - gradoPerOrdine(b.dot) || a.name.localeCompare(b.name, "it"));
}

/* ------------------------------------------------------------------ */
/* Gli effetti sul tiro (tappa 3, 24/9). Il potere scelto nel lancio    */
/* porta i suoi effetti nel conto: quelli passivi sempre, quelli attivi */
/* se il giocatore sceglie la variante «attivo» (o se il potere non ha  */
/* effetti passivi sul tiro: allora sceglierlo È attivarlo). Un effetto  */
/* attivo costa la Quintessenza del potere e conta un uso.               */
/* ------------------------------------------------------------------ */

/** L'id scelto nel lancio, spezzato: «riga#attivo» → la riga e la variante. */
export function spezzaIdPotere(id) {
  const [base, variant = ""] = String(id ?? "").split(SEPARATORE_VARIANTE);
  return { id: base, variant: variant === VARIANTE_ATTIVA ? VARIANTE_ATTIVA : "" };
}

/** L'id della variante «attivo» di una riga. */
export function idVarianteAttiva(id) {
  return `${String(id ?? "")}${SEPARATORE_VARIANTE}${VARIANTE_ATTIVA}`;
}

/** La voce del catalogo da cui viene la riga, se c'è. */
export function voceDelCatalogo(power, catalog = POTERI) {
  const id = testo(power?.catalogId);
  return id ? (catalog ?? []).find((entry) => entry.id === id) ?? null : null;
}

function normalizzaEffetto(effect) {
  const on = testo(effect?.on);
  if (!POTERE_EFFECTS.includes(on)) return null;
  const value = effect?.value && typeof effect.value === "object"
    ? { from: testo(effect.value.from), sphere: sfera(effect.value.sphere), max: count(effect.value.max) }
    : Math.trunc(Number(effect?.value) || 0);
  return {
    on,
    value,
    scope: testo(effect?.scope),
    roll: ["magick", "abilita", "any"].includes(effect?.roll) ? effect.roll : "magick",
    mode: effect?.mode === "attivo" ? "attivo" : "passivo",
    requires: [].concat(effect?.requires ?? []).map(sfera).filter(Boolean),
    when: [].concat(effect?.when ?? []).map(testo).filter((w) => POTERE_CONDIZIONI.includes(w)),
    nota: testo(effect?.nota)
  };
}

/**
 * Gli effetti sul tiro di una riga: quelli del catalogo, se la riga viene
 * da lì (il catalogo è il sorgente: si aggiorna coi dati), altrimenti
 * quelli scritti nella riga. Puliti: ganci, tiri e condizioni conosciuti.
 */
export function effettiDelPotere(power, catalog = POTERI) {
  const voce = voceDelCatalogo(power, catalog);
  const lista = Array.isArray(voce?.effects) && voce.effects.length ? voce.effects : (power?.effects ?? []);
  return lista.map(normalizzaEffetto).filter(Boolean);
}

/** La scelta che il potere chiede all'acquisto ({ kind, options }), dal catalogo; null se non ne chiede. */
export function sceltaDelPotere(power, catalog = POTERI) {
  const scelta = voceDelCatalogo(power, catalog)?.scelta;
  if (!scelta || !POTERE_SCELTE.includes(scelta.kind)) return null;
  return { kind: scelta.kind, options: scelta.options ?? null };
}

/** Le opzioni della scelta «ambito» per la Sfera della riga: gli Ambiti fra cui scegliere. */
export function ambitiDellaScelta(power, catalog = POTERI) {
  const scelta = sceltaDelPotere(power, catalog);
  if (scelta?.kind !== "ambito") return [];
  return [...(scelta.options?.[power?.sphere] ?? [])];
}

/**
 * Le varianti del potere nel lancio: `passivo` se ha effetti passivi sul
 * tiro, `attivo` se ne ha di attivi. Con tutti e due, la tendina offre due
 * righe (il potere, e «potere · attivo»); con i soli attivi, sceglierlo
 * è attivarlo; con i soli passivi, o senza effetti, una riga sola.
 */
export function variantiDelPotere(power, catalog = POTERI) {
  const effetti = effettiDelPotere(power, catalog);
  return {
    passivo: effetti.some((effect) => effect.mode === "passivo"),
    attivo: effetti.some((effect) => effect.mode === "attivo")
  };
}

/** Il potere scelto attiva i suoi effetti attivi? Con la variante «attivo», o se non ha passivi. */
export function attivaEffetti(power, variant = "", catalog = POTERI) {
  const varianti = variantiDelPotere(power, catalog);
  if (!varianti.attivo) return false;
  return variant === VARIANTE_ATTIVA || !varianti.passivo;
}

/**
 * In che tiri entra il potere con quella variante: «magick», «abilita»,
 * «any» (in tutti e due), oppure «» se non ha effetti sul tiro. Contano
 * gli effetti che la variante porta: gli attivi se la attiva, i passivi
 * altrimenti. La scheda accende l'Areté solo per «magick» (e per «»:
 * un potere senza effetti resta della Magick, come dal 16/9).
 */
export function tiroDelPotere(power, variant = "", catalog = POTERI) {
  const attivo = attivaEffetti(power, variant, catalog);
  const effetti = effettiDelPotere(power, catalog).filter((effect) => (effect.mode === "attivo") === attivo);
  if (!effetti.length) return "";
  const tiri = new Set(effetti.map((effect) => effect.roll));
  if (tiri.has("any") || (tiri.has("magick") && tiri.has("abilita"))) return "any";
  return tiri.has("abilita") ? "abilita" : "magick";
}

/** Il numero di un valore: fisso, oppure «i poteri conosciuti nella Sfera» o «le Sfere conosciute, fino a max». */
export function valoreEffetto(value, power, ctx = {}) {
  if (typeof value !== "object" || value === null) return Math.trunc(Number(value) || 0);
  if (value.from === "poteri") return count(ctx.poteriConti?.[value.sphere || power?.sphere]);
  if (value.from === "sfere") {
    const sfere = count((ctx.spheresOwned ?? []).length);
    return value.max > 0 ? Math.min(sfere, value.max) : sfere;
  }
  return 0;
}

/**
 * Una condizione vale? `ctx` porta quello che serve: saluteMeta (sotto
 * metà Salute), skillValue, dice (a conto fatto), spell e skill del tiro,
 * scopes, e la scelta della riga. Una condizione sui dadi senza i dadi
 * nel contesto non si giudica ancora (torna null).
 */
export function condizioneVale(when, power, ctx = {}) {
  switch (when) {
    case "saluteMeta": return Boolean(ctx.saluteMeta);
    case "abilita1": return count(ctx.skillValue) === 1;
    case "dadi1": return ctx.dice === undefined || ctx.dice === null ? null : count(ctx.dice) >= 1;
    case "dadi2": return ctx.dice === undefined || ctx.dice === null ? null : count(ctx.dice) >= 2;
    case "incantesimoScelto": return Boolean(power?.scelta) && testo(ctx.spell) === testo(power.scelta);
    case "abilitaScelta": return Boolean(power?.scelta) && testo(ctx.skill) === testo(power.scelta);
    case "potenza3": return count(ctx.scopes?.potency) >= 3;
    default: return false;
  }
}

/**
 * Gli effetti che entrano in questo tiro, e quelli che restano fuori col
 * perché: il tipo di tiro (magick o abilita), la variante scelta, le Sfere
 * richieste (le Amalgame), le condizioni che si giudicano prima dei dadi.
 * Torna { applicati, esclusi: [{ effect, motivo }] }; motivo è «tiro»,
 * «attivo», «sfera:<id>» o la condizione che non vale.
 */
export function effettiApplicabili(power, ctx = {}, catalog = POTERI) {
  const magick = Boolean(ctx.magick);
  const attivo = attivaEffetti(power, ctx.variant ?? "", catalog);
  const owned = new Set(ctx.spheresOwned ?? []);
  const applicati = [];
  const esclusi = [];
  for (const effect of effettiDelPotere(power, catalog)) {
    if (effect.roll !== "any" && (effect.roll === "magick") !== magick) { esclusi.push({ effect, motivo: `tiro:${effect.roll}` }); continue; }
    if (effect.mode === "attivo" && !attivo) { esclusi.push({ effect, motivo: "attivo" }); continue; }
    const manca = effect.requires.find((sphere) => !owned.has(sphere));
    if (manca) { esclusi.push({ effect, motivo: `sfera:${manca}` }); continue; }
    const caduta = effect.when.filter((when) => !CONDIZIONI_SUI_DADI.includes(when)).find((when) => !condizioneVale(when, power, ctx));
    if (caduta) { esclusi.push({ effect, motivo: caduta }); continue; }
    applicati.push(effect);
  }
  return { applicati, esclusi, attivo };
}

/**
 * Gli effetti del potere sul conto. `conto` porta soglia (dagli Ambiti,
 * già col premio), dadi, difficoltà (da che numero si riesce) e premio;
 * `ctx` quello che le condizioni e i valori chiedono (vedi condizioneVale
 * e valoreEffetto), più `magick` e `variant`.
 *
 * Torna il conto toccato: `threshold` (mai sotto zero), `dice` (in più
 * sulla riserva), `difficulty`, `prize` (doppio con prizeDouble),
 * `freeScopes` ({ ambito: livelli che non contano }: il chiamante li
 * toglie dalla soglia prima, perché la soglia si rifà dagli Ambiti),
 * `quintessenceOnSkills`, `autoSuccess` (la lista delle riuscite senza
 * tirare, ognuna con le condizioni sui dadi ancora da giudicare), le note
 * per la carta ({ on, value, scope, nota }), gli esclusi col motivo, e
 * `attivo` (gli effetti attivi sono entrati: si paga e si conta l'uso).
 * Un potere senza effetti non cambia niente.
 */
export function applyPotere(conto, power, ctx = {}) {
  const next = {
    threshold: count(conto?.threshold),
    // La somma dei ritocchi alla soglia, a parte: chi rifà la soglia dagli Ambiti la somma dopo.
    thresholdDelta: 0,
    dice: Math.trunc(Number(conto?.dice) || 0),
    difficulty: conto?.difficulty ?? null,
    prize: count(conto?.prize),
    freeScopes: {},
    quintessenceOnSkills: false,
    autoSuccess: [],
    notes: [],
    esclusi: [],
    attivo: false
  };
  if (!power) return next;
  const { applicati, esclusi, attivo } = effettiApplicabili(power, ctx);
  next.esclusi = esclusi;
  next.attivo = attivo;
  for (const effect of applicati) {
    const value = valoreEffetto(effect.value, power, ctx);
    switch (effect.on) {
      case "threshold":
        next.threshold = Math.max(next.threshold + value, 0);
        next.thresholdDelta += value;
        next.notes.push({ on: "threshold", value, nota: effect.nota });
        break;
      case "dice":
        next.dice += value;
        next.notes.push({ on: "dice", value, nota: effect.nota });
        break;
      case "successFrom":
        if (value > 0) {
          next.difficulty = value;
          next.notes.push({ on: "successFrom", value, nota: effect.nota });
        }
        break;
      case "freeScope": {
        // L'Ambito scelto nella riga, o quello scritto nell'effetto.
        const scope = effect.scope === "scelta" ? testo(power.scelta) : effect.scope;
        if (!scope) { next.esclusi.push({ effect, motivo: "scelta" }); break; }
        next.freeScopes[scope] = Math.max(count(next.freeScopes[scope]), value);
        next.notes.push({ on: "freeScope", value, scope, nota: effect.nota });
        break;
      }
      case "quintessenceOnSkills":
        next.quintessenceOnSkills = true;
        next.notes.push({ on: "quintessenceOnSkills", value: 0, nota: effect.nota });
        break;
      case "prizeDouble":
        next.prize = next.prize * 2;
        next.notes.push({ on: "prizeDouble", value: next.prize, nota: effect.nota });
        break;
      case "autoSuccess":
        next.autoSuccess.push({ when: effect.when.filter((when) => CONDIZIONI_SUI_DADI.includes(when)), nota: effect.nota });
        break;
      case "nota":
        next.notes.push({ on: "nota", value: 0, nota: effect.nota });
        break;
      default:
        break;
    }
  }
  return next;
}

/**
 * La riuscita senza tirare, a conto fatto: vale se almeno una delle
 * riuscite del potere passa le sue condizioni sui dadi. Torna la nota
 * della riuscita che vale, oppure il motivo della prima che non vale.
 */
export function riuscitaSenzaTirare(autoSuccess, dice) {
  let motivo = "";
  for (const auto of autoSuccess ?? []) {
    const caduta = (auto.when ?? []).find((when) => condizioneVale(when, null, { dice }) === false);
    if (!caduta) return { ok: true, nota: auto.nota ?? "", motivo: "" };
    motivo ||= caduta;
  }
  return { ok: false, nota: "", motivo };
}

/* ------------------------------------------------------------------ */
/* Il tasto «Usa» (tappa 2, 24/9): il potere si usa senza tirare. Il    */
/* modulo conta gli usi («una volta per scena», «per sessione», «per    */
/* campagna»), scala il costo in Quintessenza e manda la carta in chat; */
/* quello che la carta dice lo applica il Narratore. Tutto qui è puro.  */
/* ------------------------------------------------------------------ */

/** La bandiera degli usi: { [id della riga]: { scena: n, sessione: n, campagna: n } }. */
export const POTERI_USI_FLAG = "poteriUsi";

/** I periodi che il modulo riarma da solo: la scena (Cambio Scena) e la sessione (Nuova sessione). */
export const USI_RIARMATI = Object.freeze(["scena", "sessione", "campagna"]);

/**
 * Gli usi di un potere nel periodo corrente: null se il potere non ha un
 * limite che il modulo conta («una volta per turno» o «per bersaglio» si
 * contano al tavolo). Altrimenti quanti ne restano.
 */
export function usiDelPotere(power, usi = {}) {
  const per = testo(power?.uses?.per);
  if (!USI_RIARMATI.includes(per)) return null;
  const max = Math.max(count(power.uses?.n), 1);
  const usati = count(usi?.[power.id]?.[per]);
  return { per, max, usati, restanti: Math.max(max - usati, 0) };
}

/**
 * Si può usare adesso? Serve un uso nel periodo, e la Quintessenza che il
 * potere costa. Torna il motivo del no: «usi» o «quintessenza».
 */
export function puoUsare(power, { usi = {}, quintessence = 0 } = {}) {
  const conto = usiDelPotere(power, usi);
  if (conto && conto.restanti <= 0) return { ok: false, motivo: "usi", usi: conto };
  if (count(power?.costValue) > count(quintessence)) return { ok: false, motivo: "quintessenza", usi: conto };
  return { ok: true, motivo: "", usi: conto };
}

/** Un uso in più del potere nel suo periodo; senza periodo contato la bandiera non cambia. */
export function registraUso(usi, power) {
  const per = testo(power?.uses?.per);
  if (!USI_RIARMATI.includes(per)) return { ...(usi ?? {}) };
  const riga = { ...(usi?.[power.id] ?? {}) };
  riga[per] = count(riga[per]) + 1;
  return { ...(usi ?? {}), [power.id]: riga };
}

/**
 * Il riarmo: Cambio Scena azzera gli usi per scena; Nuova sessione anche
 * quelli per sessione; «campagna» solo a mano. Torna la bandiera nuova.
 */
export function riarmaUsi(usi, per) {
  const azzera = per === "sessione" ? ["scena", "sessione"] : per === "campagna" ? [...USI_RIARMATI] : ["scena"];
  const next = {};
  for (const [id, riga] of Object.entries(usi ?? {})) {
    const pulita = Object.fromEntries(Object.entries(riga ?? {}).filter(([chiave, valore]) => !azzera.includes(chiave) && count(valore) > 0));
    if (Object.keys(pulita).length) next[id] = pulita;
  }
  return next;
}

/** La Ruota dopo l'uso: la Quintessenza scende del costo, mai sotto zero. */
export function ruotaDopoUso(balance, power) {
  return {
    quintessence: Math.max(count(balance?.quintessence) - count(power?.costValue), 0),
    paradox: count(balance?.paradox)
  };
}

/**
 * I blocchi del testo di un potere: «Effetto attivo: …», «Effetto passivo: …»,
 * «Effetto Amalgama: …», ognuno col titolo, il genere (attivo, passivo,
 * amalgama, o niente per il testo scritto a mano), le righe come stanno, e le
 * voci: la riga spezzata in chiave e testo quando comincia con «Accesso con
 * X:», «Paga N …:» o «Con N poteri:», così la scheda, la finestra e la carta
 * mettono la chiave in evidenza (Blue, 25/9: «non si distingue»).
 */
const GENERI_BLOCCO = Object.freeze({ attivo: "attivo", passivo: "passivo", amalgama: "amalgama" });

export function voceDellaRiga(riga) {
  const m = String(riga ?? "").match(/^((?:Accesso con|Con) [^:]{1,40}|Paga [^:]{1,30}):\s*([\s\S]*)$/);
  return m ? { chiave: m[1].trim(), testo: m[2].trim() } : { chiave: "", testo: String(riga ?? "").trim() };
}

export function blocchiDelTesto(text) {
  return String(text ?? "")
    .split(/\n\s*\n/)
    .map((blocco) => blocco.trim())
    .filter(Boolean)
    .map((blocco) => {
      const m = blocco.match(/^(Effetto (attivo|passivo|Amalgama)):\s*([\s\S]*)$/i);
      const corpo = m ? m[3] : blocco;
      const righe = corpo.split("\n").map((riga) => riga.trim()).filter(Boolean);
      return { titolo: m ? m[1] : "", kind: m ? GENERI_BLOCCO[m[2].toLowerCase()] : "", righe, voci: righe.map(voceDellaRiga) };
    });
}

/** I blocchi di un genere (attivo, passivo, amalgama) nel testo del potere. */
export function blocchiDelGenere(text, kind) {
  return blocchiDelTesto(text).filter((blocco) => blocco.kind === kind);
}

/**
 * La carta in chat: nome, Sfera, matrice, tipo, il costo pagato, gli usi
 * che restano, i blocchi del testo, Paradosso e Flavor.
 */
export function cartaPotere(power, { sphereLabel = "", usi = null, spent = 0, localize = (key) => key } = {}) {
  return {
    name: potereLabel(power, localize),
    sphere: sphereLabel,
    formula: testo(power?.formulaName),
    kind: power?.type ? localize(`WOD5E_MAGE.Poteri.Tipo.${power.type}`) : "",
    spent: count(spent),
    usi: usi ? { ...usi, label: localize(`WOD5E_MAGE.Poteri.Usi.${usi.per}`) } : null,
    blocchi: blocchiDelTesto(power?.text),
    amalgamText: testo(power?.amalgamText),
    paradox: testo(power?.paradox),
    flavor: testo(power?.flavor)
  };
}
