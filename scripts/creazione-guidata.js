/**
 * La creazione guidata (Blue, 21/9 e 23/9): una finestra a parte, come il
 * charactermancer di D&D 5e in Roll20, che guida il giocatore nuovo passo
 * passo nell'ordine del 5/9 e scrive subito sulla scheda, che resta dietro,
 * viva. Ogni passo ha la stessa grammatica (il mock del 23/9, approvato):
 * a sinistra COSA scegli (le carte, con l'immagine), a destra PERCHÉ (poche
 * righe dal LIBRO, che il Narratore può riscrivere con l'editor) e COSA CI
 * GUADAGNI (i numeri che cambiano sulla scheda). In fondo la nota di quel
 * che è già scritto sulla scheda, Indietro e Avanti.
 *
 * Qui stanno i conti puri (si provano senza Foundry); la finestra è in
 * creazione-guidata-finestra.js.
 */
import { MODULE_ID } from "./constants.js";
import { CHIAVI_VIVE, prepareEssentialSkillsByGroup, skillsOverCap } from "./abilita-essenziali.js";
import { getArete } from "./arete.js";
import { CONCEPT_CHALLENGE_GROUPS } from "./concept-challenge.js";
import { CREDO_STRUMENTI, FAMIGLIA_STRUMENTI, SOTTOFAMIGLIA_STRUMENTI } from "./data/strumenti.js";
import {
  alphabetical,
  credoSpheresFor,
  FAMIGLIE,
  FAZIONI,
  findFamiglia,
  findSottofamiglia,
  isFreeCredo,
  sphereBadge
} from "./famiglie.js";
import { familiesForForm, FOCUS_CREDOS, FOCUS_FORMS, FOCUS_TOOLS, PERCEIVE_TOOL_ID, preparePerceiveInstrument, prepareSphereInstruments } from "./focus.js";
import { getLineage } from "./lineage.js";
import { getMagickBalance, MAGICK_TRACK_MAX } from "./magick-balance.js";
import { prepareMemo } from "./memo.js";
import { PERSONAGGIO_TABLES, prepareAnchors, prepareConvictions } from "./personaggio-extra.js";
import { GRADI, prepareCreationSummary } from "./riepilogo.js";
import { prepareSpheres, SPHERES } from "./spheres.js";
import { ATTRIBUTE_KEYS, traitIcon } from "./tratti-icone.js";

/** I tredici passi, nell'ordine del 5/9 (il mock del 23/9). */
export const PASSI = Object.freeze([
  "credo",
  "famiglia",
  "bussola",
  "tipo",
  "concetto",
  "sfere",
  "strumenti",
  "arete",
  "attributi",
  "abilita",
  "vantaggi",
  "ancore",
  "controllo"
]);

/** Dove la finestra ricorda a che passo era: flags.wod5e-mage.creazione.guidata. */
export const GUIDATA_FLAG = "creazione";

/** L'impostazione del mondo coi testi riscritti dal Narratore (il «perché» di ogni passo). */
export const GUIDA_TESTI_SETTING = "guidaTesti";

/** Il simbolo di ogni Credo, finché non ci sono le immagini (il mock del 23/9). */
export const CREDO_ICONE = Object.freeze({
  arte: "fa-solid fa-palette",
  caos: "fa-solid fa-tornado",
  dati: "fa-solid fa-code",
  fede: "fa-solid fa-hands-praying",
  illusione: "fa-solid fa-masks-theater",
  legge: "fa-solid fa-scale-balanced",
  macchina: "fa-solid fa-gears",
  polvere: "fa-solid fa-hourglass-half",
  potere: "fa-solid fa-crown",
  sacro: "fa-solid fa-sun",
  scienza: "fa-solid fa-flask",
  suono: "fa-solid fa-music",
  vivo: "fa-solid fa-seedling"
});

/** Il simbolo dei tre Tipi di Magick. */
export const TIPO_ICONE = Object.freeze({
  magick: "fa-solid fa-hand-sparkles",
  tecnomagick: "fa-solid fa-microchip",
  ibrida: "fa-solid fa-yin-yang"
});

/**
 * Le pratiche di macchina (capitolo 03): chi le segue passa per la
 * Tecnomagick. Le altre pratiche non dicono un Tipo: là il consiglio non
 * c'è, e la scelta è del giocatore (il capitolo 03 non ha ancora i dati).
 */
export const PRATICHE_TECNO = Object.freeze(["Cibernetica", "Hacking della Realtà", "Scienza Bizzarra"]);

/** Le immagini delle Famiglie e delle Sottofamiglie: chi le mette qui le vede sulle carte. */
export const IMMAGINI_FAMIGLIE = `modules/${MODULE_ID}/assets/immagini/famiglie/`;

/** La forma fissa degli Attributi (LIBRO 05_090): uno a 4, tre a 3, quattro a 2, uno a 1. */
export const FORMA_ATTRIBUTI = Object.freeze([
  { value: 4, count: 1 },
  { value: 3, count: 3 },
  { value: 2, count: 4 },
  { value: 1, count: 1 }
]);

/** Alla creazione (LIBRO 05_080): Quintessenza 3, Paradosso 0, e il tetto di ogni Sfera è Areté + 2. */
export const QUINTESSENZA_INIZIALE = 3;
export const SFERA_SOPRA_ARETE = 2;

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

export function indicePasso(id) {
  const index = PASSI.indexOf(String(id ?? ""));
  return index < 0 ? 0 : index;
}

/** Il passo salvato sul personaggio (1..13), o il primo. */
export function passoSalvato(actor) {
  const stored = actor?.getFlag?.(MODULE_ID, GUIDATA_FLAG)?.guidata ?? {};
  const n = Math.trunc(Number(stored.passo) || 0);
  return n >= 1 && n <= PASSI.length ? n : 1;
}

/** Il tetto di una Sfera alla creazione: Areté + 2 (LIBRO 05_080), mai sopra 5. */
export function tettoSfera(arete) {
  return Math.min(Math.max(count(arete), 1) + SFERA_SOPRA_ARETE, 5);
}

/**
 * La forma fissa degli Attributi (05_090) confrontata coi valori: per ogni
 * riga quanti Attributi stanno a quel valore, e se il conto torna.
 */
export function formaAttributi(values = {}) {
  const list = ATTRIBUTE_KEYS.map((key) => count(values?.[key]));
  const rows = FORMA_ATTRIBUTI.map((row) => {
    const have = list.filter((value) => value === row.value).length;
    return { value: row.value, count: row.count, have, state: have === row.count ? "exact" : (have > row.count ? "over" : "under") };
  });
  return { rows, ok: rows.every((row) => row.state === "exact") };
}

/** Il Credo che la Sottofamiglia (o la Craft) consiglia, dal capitolo 03. */
export function credoConsigliato(famigliaId, sottofamigliaId = "") {
  const sub = SOTTOFAMIGLIA_STRUMENTI[String(sottofamigliaId ?? "")];
  if (sub && String(sub.credo ?? "")) return String(sub.credo);
  const fam = FAMIGLIA_STRUMENTI[String(famigliaId ?? "")];
  return String(fam?.credo ?? "");
}

/** La pratica della Sottofamiglia (o della Craft), e il Tipo che consiglia se è di macchina. */
export function praticaDi(famigliaId, sottofamigliaId = "") {
  const sub = SOTTOFAMIGLIA_STRUMENTI[String(sottofamigliaId ?? "")];
  const fam = FAMIGLIA_STRUMENTI[String(famigliaId ?? "")];
  const forma = String(sub?.forma ?? fam?.forma ?? "");
  return { forma, tipo: PRATICHE_TECNO.includes(forma) ? "tecnomagick" : "" };
}

/** Le Famiglie che il Credo scelto consiglia: quelle con almeno una via che lo nomina. */
export function famiglieDelCredo(credo) {
  const id = String(credo ?? "");
  if (!id) return [];
  return FAMIGLIE.filter((famiglia) => famiglia.sottofamiglie.length
    ? famiglia.sottofamiglie.some((sub) => credoConsigliato(famiglia.id, sub.id) === id)
    : credoConsigliato(famiglia.id) === id).map((famiglia) => famiglia.id);
}

/* ---------------------------------------------------------------- */
/* Lo stato del personaggio, passo per passo                          */
/* ---------------------------------------------------------------- */

function focusOf(actor) {
  return actor?.getFlag?.(MODULE_ID, "focus") ?? {};
}

function hasText(value) {
  return String(value ?? "").trim() !== "";
}

/**
 * Ogni passo dice se è fatto: la spia in oro sulla barra dei passi. Non è
 * un vincolo (si va avanti lo stesso), è un promemoria.
 */
export function passiFatti(actor, summary) {
  const focus = focusOf(actor);
  const lineage = getLineage(actor);
  const family = findFamiglia(lineage.famiglia);
  const memo = prepareMemo(summary, { on: true });
  const counts = Object.fromEntries((summary?.counts ?? []).map((entry) => [entry.id, entry]));
  const checks = Object.fromEntries((summary?.checks ?? []).map((entry) => [entry.id, entry]));
  const headers = actor?.system?.headers ?? {};
  const convinzioni = Object.values(actor?.getFlag?.(MODULE_ID, PERSONAGGIO_TABLES.convictions) ?? {}).some((row) => hasText(row?.text));
  const done = {
    credo: FOCUS_CREDOS.includes(focus.credo) && (!isFreeCredo(focus.credo) || credoSpheresFor(focus.credo, focus.credoSpheres).length === 2),
    famiglia: Boolean(family) && (!family.sottofamiglie.length || Boolean(findSottofamiglia(lineage.famiglia, lineage.sottofamiglia))),
    bussola: hasText(headers.ambition) && hasText(headers.desire) && convinzioni,
    tipo: FOCUS_FORMS.includes(focus.practiceForm),
    concetto: Boolean(checks.concept?.ok),
    sfere: counts.spheres?.state === "exact",
    strumenti: Boolean(checks.instruments?.ok),
    arete: Boolean(checks.arete?.ok),
    attributi: counts.attributes?.state === "exact",
    abilita: memo.boxes.abilita.state === "exact",
    vantaggi: memo.boxes.tratti.state === "exact",
    ancore: Boolean(checks.anchors?.ok)
  };
  done.controllo = PASSI.filter((id) => id !== "controllo").every((id) => done[id]);
  return done;
}

/* ---------------------------------------------------------------- */
/* I passi                                                            */
/* ---------------------------------------------------------------- */

function credoCard(id, { localize, focus, choices }) {
  const spheres = credoSpheresFor(id, focus.credoSpheres);
  return {
    id,
    label: localize(`WOD5E_MAGE.Focus.Credos.${id}`),
    icon: CREDO_ICONE[id] ?? "fa-solid fa-circle",
    selected: focus.credo === id,
    free: isFreeCredo(id),
    spheres: spheres.map((sphere) => sphereBadge(sphere, localize)).filter(Boolean),
    // Il mestiere che il Credo consiglia (dagli Strumenti del Credo).
    profession: String(CREDO_STRUMENTI[id]?.profession ?? ""),
    choices: isFreeCredo(id) && focus.credo === id ? choices : []
  };
}

/** Passo 1: i tredici Credi, uno solo; Potere e Scienza chiedono le due Sfere. */
export function passoCredo(actor, { localize = (key) => key, lang = "it" } = {}) {
  const focus = focusOf(actor);
  const picks = { first: String(focus.credoSpheres?.first ?? ""), second: String(focus.credoSpheres?.second ?? "") };
  const choices = ["first", "second"].map((slot) => ({
    slot,
    value: picks[slot],
    options: SPHERES.map((id) => ({ id, label: localize(`WOD5E_MAGE.Spheres.${id}`), selected: picks[slot] === id }))
  }));
  const credi = alphabetical(FOCUS_CREDOS.map((id) => credoCard(id, { localize, focus, choices })), lang);
  const chosen = credi.find((credo) => credo.selected) ?? null;
  return {
    credi,
    chosen,
    spheres: chosen ? credoSpheresFor(chosen.id, focus.credoSpheres).map((id) => sphereBadge(id, localize)).filter(Boolean) : [],
    famiglie: chosen ? famiglieDelCredo(chosen.id).map((id) => findFamiglia(id)?.label ?? id) : []
  };
}

function famigliaCard(famiglia, { localize, lineage, credo }) {
  const consigliate = famiglia.sottofamiglie.filter((sub) => credoConsigliato(famiglia.id, sub.id) === credo);
  const delCredo = credo ? (famiglia.sottofamiglie.length ? consigliate.length > 0 : credoConsigliato(famiglia.id) === credo) : false;
  return {
    id: famiglia.id,
    label: famiglia.label,
    fazione: famiglia.fazione,
    sphere: sphereBadge(famiglia.sphere, localize),
    image: `${IMMAGINI_FAMIGLIE}${famiglia.id}.webp`,
    initial: famiglia.label.replace(/^(L'|Le |I |Gli |Il |La |Ordine di |Figli dell'|Coro |Adepti |Sorelle di |Cavalieri del )/u, "").charAt(0).toUpperCase(),
    selected: lineage.famiglia === famiglia.id,
    delCredo,
    subKind: famiglia.subKind ?? "",
    hasSubfamilies: famiglia.sottofamiglie.length > 0,
    craft: famiglia.fazione === "disparati",
    pratica: famiglia.sottofamiglie.length ? "" : praticaDi(famiglia.id).forma
  };
}

/** Passo 2: la Famiglia (le nove Tradizioni e le dieci Craft) e sotto la via, con le Sfere che portano. */
export function passoFamiglia(actor, { localize = (key) => key, lang = "it" } = {}) {
  const focus = focusOf(actor);
  const credo = FOCUS_CREDOS.includes(focus.credo) ? focus.credo : "";
  const lineage = getLineage(actor);
  const gruppi = Object.entries(FAZIONI).map(([fazione, label]) => {
    const cards = alphabetical(FAMIGLIE.filter((famiglia) => famiglia.fazione === fazione).map((famiglia) => famigliaCard(famiglia, { localize, lineage, credo })), lang);
    // Col Credo scelto, le Famiglie che lo consigliano vengono prima.
    const ordered = credo ? [...cards.filter((card) => card.delCredo), ...cards.filter((card) => !card.delCredo)] : cards;
    return { id: fazione, label: localize(label), famiglie: ordered };
  });
  const family = findFamiglia(lineage.famiglia);
  const sottofamiglie = family
    ? alphabetical(family.sottofamiglie.map((sub) => ({
      id: sub.id,
      label: sub.label,
      sphere: sphereBadge(sub.sphere, localize),
      image: `${IMMAGINI_FAMIGLIE}${family.id}-${sub.id}.webp`,
      initial: sub.label.replace(/^(L'|Le |I |Gli |Il |La |Casa |Comitato per il |Commissione per gli )/u, "").charAt(0).toUpperCase(),
      selected: lineage.sottofamiglia === sub.id,
      delCredo: Boolean(credo) && credoConsigliato(family.id, sub.id) === credo,
      credo: credoConsigliato(family.id, sub.id),
      credoLabel: credoConsigliato(family.id, sub.id) ? localize(`WOD5E_MAGE.Focus.Credos.${credoConsigliato(family.id, sub.id)}`) : "",
      pratica: praticaDi(family.id, sub.id).forma
    })), lang)
    : [];
  const sub = findSottofamiglia(lineage.famiglia, lineage.sottofamiglia);
  return {
    credo,
    credoLabel: credo ? localize(`WOD5E_MAGE.Focus.Credos.${credo}`) : "",
    gruppi,
    family: family ? { id: family.id, label: family.label, subKind: family.subKind ?? "", sphere: sphereBadge(family.sphere, localize), craft: family.fazione === "disparati" } : null,
    sottofamiglie,
    sub: sub ? { id: sub.id, label: sub.label, sphere: sphereBadge(sub.sphere, localize) } : null,
    // Cosa ci guadagni: le due Sfere a 1 (la Craft ne porta una), e il resto dopo.
    dotted: [family?.sphere, sub?.sphere].filter((id, index, all) => id && all.indexOf(id) === index).map((id) => sphereBadge(id, localize)).filter(Boolean),
    pratica: praticaDi(lineage.famiglia, lineage.sottofamiglia).forma
  };
}

/** Le voci del catalogo che il Credo propone (i gruppi «Tutto è X»), o le prime dei gruppi comuni. */
function proposte(entries, credo, limit = 8) {
  const list = Array.isArray(entries) ? entries : [];
  const own = credo ? list.filter((entry) => String(entry.credo ?? "") === credo) : [];
  return (own.length ? own : list.filter((entry) => !entry.credo)).slice(0, limit).map((entry) => ({
    uuid: String(entry.uuid ?? ""),
    name: String(entry.name ?? ""),
    text: String(entry.text ?? entry.name ?? ""),
    group: String(entry.group ?? ""),
    gloss: String(entry.gloss ?? ""),
    cross: String(entry.cross ?? ""),
    delCredo: Boolean(credo) && String(entry.credo ?? "") === credo
  }));
}

/** Passo 3: la Bussola, Ambizione, Desiderio e Convinzioni, con le proposte del Credo. */
export function passoBussola(actor, { localize = (key) => key, cataloghi = {} } = {}) {
  const focus = focusOf(actor);
  const credo = FOCUS_CREDOS.includes(focus.credo) ? focus.credo : "";
  const headers = actor?.system?.headers ?? {};
  const convinzioni = prepareConvictions(actor).map((row) => ({
    ...row,
    groupLabel: row.group
      ? (FOCUS_CREDOS.includes(row.group) ? localize(`WOD5E_MAGE.Focus.Credos.${row.group}`) : localize(`WOD5E_MAGE.Personaggio.ConvictionGroups.${row.group}`))
      : ""
  }));
  return {
    credo,
    credoLabel: credo ? localize(`WOD5E_MAGE.Focus.Credos.${credo}`) : "",
    ambition: String(headers.ambition ?? ""),
    desire: String(headers.desire ?? ""),
    convinzioni,
    proposte: {
      ambizione: proposte(cataloghi.ambizione, credo),
      desiderio: proposte(cataloghi.desiderio, credo),
      convinzione: proposte(cataloghi.convinzione, credo, 6)
    },
    caricati: Boolean(cataloghi.ambizione || cataloghi.desiderio || cataloghi.convinzione)
  };
}

/** Passo 4: il Tipo di Magick, tre carte; le famiglie di Strumenti che ognuno apre, e il consiglio della pratica. */
export function passoTipo(actor, { localize = (key) => key } = {}) {
  const focus = focusOf(actor);
  const lineage = getLineage(actor);
  const pratica = praticaDi(lineage.famiglia, lineage.sottofamiglia);
  const tipi = FOCUS_FORMS.map((id) => ({
    id,
    label: localize(`WOD5E_MAGE.Focus.Forms.${id}`),
    icon: TIPO_ICONE[id],
    selected: focus.practiceForm === id,
    consigliato: pratica.tipo === id,
    famiglie: familiesForForm(id).map((family) => localize(`WOD5E_MAGE.Focus.Families.${family}`)),
    // L'Ibrida non prende il premio dell'Areté (arete.js).
    premio: id !== "ibrida"
  }));
  return { tipi, chosen: tipi.find((tipo) => tipo.selected) ?? null, pratica: pratica.forma, praticaTipo: pratica.tipo ? localize(`WOD5E_MAGE.Focus.Forms.${pratica.tipo}`) : "" };
}

/** Passo 5: il Concetto in una riga, e la Sfida a tre gruppi coi premi. */
export function passoConcetto(actor, summary, { localize = (key) => key, cataloghi = {} } = {}) {
  const stored = actor?.getFlag?.(MODULE_ID, "conceptChallenge") ?? {};
  const gruppi = CONCEPT_CHALLENGE_GROUPS.map((group) => {
    const done = group.fields.filter((id) => hasText(stored[id])).length;
    return { id: group.id, label: localize(`WOD5E_MAGE.ConceptChallenge.Groups.${group.id}`), done, total: group.fields.length, complete: done === group.fields.length };
  });
  return {
    concept: String(actor?.system?.headers?.concept ?? ""),
    proposte: proposte(cataloghi.concetto, "", 12),
    gruppi,
    sfida: summary?.sfida ?? { done: 0, total: 3, complete: false, prizes: [] },
    premi: (summary?.sfida?.prizes ?? []).map((premio) => ({ ...premio, text: localize(premio.label) }))
  };
}

/** Passo 6: le nove Sfere coi pallini, il tetto Areté + 2, il conto del memo. */
export function passoSfere(actor, summary, { localize = (key) => key, locale = "it" } = {}) {
  const arete = getArete(actor).value;
  const cap = tettoSfera(arete);
  const counts = Object.fromEntries((summary?.counts ?? []).map((entry) => [entry.id, entry]));
  const conto = counts.spheres ?? { value: 0, target: 6, state: "under" };
  const spheres = prepareSpheres(actor, { localize, locale }).all.map((sphere) => ({
    ...sphere,
    label: localize(sphere.label),
    steps: Array.from({ length: 5 }, (_, index) => ({
      value: index + 1,
      lit: index + 1 <= sphere.value,
      // Oltre il tetto della creazione il pallino non si prende.
      oltre: index + 1 > cap
    }))
  }));
  return { spheres, cap, arete, conto: { ...conto, text: `${conto.value}/${conto.target}` }, sfida: summary?.sfida?.done ?? 0 };
}

/** Passo 7: uno Strumento per ogni Sfera sbloccata, e quello di Percepire; il consiglio del Credo. */
export function passoStrumenti(actor, { localize = (key) => key, locale = "it" } = {}) {
  const focus = focusOf(actor);
  const form = FOCUS_FORMS.includes(focus.practiceForm) ? focus.practiceForm : "";
  const lineage = getLineage(actor);
  const selected = prepareSpheres(actor, { localize, locale }).selected;
  const rows = prepareSphereInstruments(actor, { localize, spheres: selected, form });
  const credo = FOCUS_CREDOS.includes(focus.credo) ? focus.credo : "";
  const credoData = CREDO_STRUMENTI[credo];
  const keys = form === "tecnomagick" ? ["tecnomagick"] : (form === "magick" ? ["magick"] : ["magick", "tecnomagick"]);
  const famData = FAMIGLIA_STRUMENTI[lineage.famiglia];
  const subData = SOTTOFAMIGLIA_STRUMENTI[lineage.sottofamiglia];
  const perceiveRow = preparePerceiveInstrument(actor, { localize, spheres: selected, form });
  const strumenti = [...rows, ...(perceiveRow ? [perceiveRow] : [])].map((row) => {
    const cell = credoData?.spheres?.[row.id] ?? {};
    const consigli = keys.map((key) => cell[key]).filter((entry) => entry && entry.tool).map((entry) => {
      const definition = FOCUS_TOOLS.find((tool) => tool.id === entry.tool);
      return {
        tool: entry.tool,
        toolLabel: localize(`WOD5E_MAGE.Focus.Tools.${entry.tool}`),
        family: definition?.family ?? "",
        familyLabel: definition ? localize(`WOD5E_MAGE.Focus.Families.${definition.family}`) : "",
        profession: definition?.profession ? String(credoData.profession ?? "") : "",
        examples: String(entry.examples ?? ""),
        name: String(entry.examples ?? "").split(",")[0].trim()
      };
    });
    return { ...row, label: localize(row.label), consigli };
  });
  return {
    form,
    formLabel: form ? localize(`WOD5E_MAGE.Focus.Forms.${form}`) : "",
    credo,
    credoLabel: credo ? localize(`WOD5E_MAGE.Focus.Credos.${credo}`) : "",
    strumenti,
    // Gli Strumenti della Famiglia e della via, come li dice il capitolo 03.
    famiglia: famData ? { label: findFamiglia(lineage.famiglia)?.label ?? "", list: famData.list ?? [], tools: Object.entries(famData.tools ?? {}).map(([family, text]) => ({ familyLabel: localize(`WOD5E_MAGE.Focus.Families.${family}`), text })) } : null,
    sottofamiglia: subData ? { label: findSottofamiglia(lineage.famiglia, lineage.sottofamiglia)?.label ?? "", tools: Object.entries(subData.tools ?? {}).map(([family, text]) => ({ familyLabel: localize(`WOD5E_MAGE.Focus.Families.${family}`), text })) } : null,
    fatti: strumenti.filter((row) => row.tool && !row.perceive).length,
    totale: strumenti.filter((row) => !row.perceive).length,
    percepireId: PERCEIVE_TOOL_ID
  };
}

/** Passo 8: l'Areté del grado, la Quintessenza e il Paradosso di partenza. */
export function passoArete(actor, summary, { localize = (key) => key } = {}) {
  const arete = getArete(actor);
  const target = summary?.targets?.arete ?? 1;
  const balance = getMagickBalance(actor);
  return {
    arete: arete.value,
    target,
    ok: arete.value === target,
    steps: arete.steps.map((step) => ({ ...step, target: step.value === target })),
    cap: tettoSfera(arete.value),
    quintessence: balance.quintessence,
    paradox: balance.paradox,
    quintessenzaIniziale: QUINTESSENZA_INIZIALE,
    max: MAGICK_TRACK_MAX,
    grado: summary?.targets?.grado ?? "neofita",
    gradoLabel: localize(`WOD5E_MAGE.Riepilogo.Grades.${summary?.targets?.grado ?? "neofita"}`)
  };
}

const GRUPPI_ATTRIBUTI = Object.freeze({ physical: "WOD5E.SPC.Physical", social: "WOD5E.SPC.Social", mental: "WOD5E.SPC.Mental" });

/** Passo 9: i nove Attributi a pallini, la forma fissa e le statistiche di base. */
export function passoAttributi(actor, summary, { localize = (key) => key } = {}) {
  const system = actor?.system ?? {};
  const sorted = system.sortedAttributes ?? {};
  const values = Object.fromEntries(ATTRIBUTE_KEYS.map((key) => [key, count(system.attributes?.[key]?.value)]));
  const gruppi = Object.entries(GRUPPI_ATTRIBUTI).map(([id, label]) => ({
    id,
    label: localize(label),
    attributi: (sorted[id] ?? []).map((trait) => ({
      id: trait.id,
      label: String(trait.displayName ?? trait.id),
      icon: traitIcon(trait.id),
      value: values[trait.id] ?? count(trait.value),
      steps: Array.from({ length: 5 }, (_, index) => ({ value: index + 1, lit: index + 1 <= (values[trait.id] ?? count(trait.value)) }))
    }))
  })).filter((gruppo) => gruppo.attributi.length);
  const counts = Object.fromEntries((summary?.counts ?? []).map((entry) => [entry.id, entry]));
  const conto = counts.attributes ?? { value: 0, target: 22, state: "under" };
  const stamina = values.stamina;
  const composure = values.composure;
  const resolve = values.resolve;
  const charisma = values.charisma;
  return {
    gruppi,
    forma: formaAttributi(values),
    conto: { ...conto, text: `${conto.value}/${conto.target}` },
    // Le statistiche di base (LIBRO 05_100): Salute = Costituzione + 3,
    // Volontà = Autocontrollo + Fermezza, Saggezza = 3 + il più alto fra Carisma e Fermezza.
    statistiche: {
      salute: stamina + 3,
      volonta: composure + resolve,
      saggezza: 3 + Math.max(charisma, resolve)
    }
  };
}

const GRUPPI_ABILITA = Object.freeze({ physical: "WOD5E.SPC.Physical", social: "WOD5E.SPC.Social", mental: "WOD5E.SPC.Mental" });

/** Passo 10: le quattordici Abilità a pallini, col tetto della creazione e il conto. */
export function passoAbilita(actor, summary, { localize = (key) => key, lang = "it" } = {}) {
  const system = actor?.system ?? {};
  const byGroup = prepareEssentialSkillsByGroup(system.sortedSkills ?? {}, { localize, lang });
  const cap = summary?.targets?.skillCap ?? 3;
  const gruppi = Object.entries(GRUPPI_ABILITA).map(([id, label]) => ({
    id,
    label: localize(label),
    abilita: (byGroup[id] ?? []).map((skill) => {
      const value = count(system.skills?.[skill.id]?.value ?? skill.value);
      return {
        id: skill.id,
        label: String(skill.displayName ?? skill.id),
        icon: traitIcon(skill.id),
        value,
        oltre: value > cap,
        steps: Array.from({ length: 5 }, (_, index) => ({ value: index + 1, lit: index + 1 <= value, oltre: index + 1 > cap }))
      };
    })
  })).filter((gruppo) => gruppo.abilita.length);
  const counts = Object.fromEntries((summary?.counts ?? []).map((entry) => [entry.id, entry]));
  const conto = counts.skills ?? { value: 0, target: 19, state: "under", sfida: 0 };
  const over = skillsOverCap(system.skills, cap);
  return {
    gruppi,
    cap,
    conto: { ...conto, text: `${conto.value}/${conto.target}` },
    oltre: over,
    tettoOk: over.length === 0,
    vive: CHIAVI_VIVE.length
  };
}

function featureRows(items, featuretype) {
  return items
    .filter((item) => item?.type === "feature" && item?.system?.featuretype === featuretype)
    .map((item) => ({
      id: String(item.id ?? item._id ?? ""),
      name: String(item.name ?? ""),
      img: String(item.img ?? ""),
      points: count(item.system?.points),
      steps: Array.from({ length: 5 }, (_, index) => ({ value: index + 1, lit: index + 1 <= count(item.system?.points) }))
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
}

/** Passo 11: Background, Pregi e Difetti del personaggio, coi conti del memo. */
export function passoVantaggi(actor, summary) {
  const items = actor?.items ? Array.from(actor.items) : [];
  const counts = Object.fromEntries((summary?.counts ?? []).map((entry) => [entry.id, entry]));
  const vantaggi = counts.merits ?? { value: 0, target: 7, state: "under", sfida: 0 };
  const difetti = counts.flaws ?? { value: 0, target: 2, state: "under" };
  return {
    background: featureRows(items, "background"),
    pregi: featureRows(items, "merit"),
    difetti: featureRows(items, "flaw"),
    conto: {
      vantaggi: { ...vantaggi, text: `${vantaggi.value}/${vantaggi.target}` },
      difetti: { ...difetti, text: `${difetti.value}/${difetti.target}` }
    }
  };
}

/** Passo 12: le Ancore, da una a tre persone. */
export function passoAncore(actor, { cataloghi = {} } = {}) {
  const ancore = prepareAnchors(actor);
  return {
    ancore,
    proposte: proposte(cataloghi.ancora, "", 9),
    fatte: ancore.filter((row) => hasText(row.name) || hasText(row.description)).length
  };
}

/** Passo 13: il controllo finale, il memo intero in una lista, tutto verde quando la scheda è pronta. */
export function passoControllo(actor, summary, { localize = (key) => key } = {}) {
  const done = passiFatti(actor, summary);
  const memo = prepareMemo(summary, { on: true });
  const voci = PASSI.filter((id) => id !== "controllo").map((id, index) => ({
    id,
    n: index + 1,
    label: localize(`WOD5E_MAGE.Guidata.Passi.${id}.Label`),
    ok: Boolean(done[id])
  }));
  const conti = (summary?.counts ?? []).filter((entry) => entry.target !== null).map((entry) => ({
    id: entry.id,
    label: localize(entry.label),
    text: `${entry.value}/${entry.target}`,
    state: entry.state
  }));
  return { voci, conti, memo, pronto: Boolean(done.controllo), mancano: voci.filter((voce) => !voce.ok).length };
}

/* ---------------------------------------------------------------- */
/* La finestra: il contesto intero                                    */
/* ---------------------------------------------------------------- */

/** La nota in fondo: quel che il passo ha già scritto sulla scheda. */
export function notaScheda(id, actor, { localize = (key) => key } = {}) {
  const focus = focusOf(actor);
  const lineage = getLineage(actor);
  const headers = actor?.system?.headers ?? {};
  const t = (key, data) => {
    let text = localize(`WOD5E_MAGE.Guidata.Note.${key}`);
    for (const [name, value] of Object.entries(data ?? {})) text = text.replace(`{${name}}`, String(value));
    return text;
  };
  switch (id) {
    case "credo":
      return FOCUS_CREDOS.includes(focus.credo) ? t("credo", { credo: localize(`WOD5E_MAGE.Focus.Credos.${focus.credo}`) }) : t("vuoto");
    case "famiglia":
      return lineage.riga ? t("famiglia", { riga: lineage.riga }) : t("vuoto");
    case "bussola":
      return hasText(headers.ambition) || hasText(headers.desire) ? t("bussola") : t("vuoto");
    case "tipo":
      return FOCUS_FORMS.includes(focus.practiceForm) ? t("tipo", { tipo: localize(`WOD5E_MAGE.Focus.Forms.${focus.practiceForm}`) }) : t("vuoto");
    case "concetto":
      return hasText(headers.concept) ? t("concetto") : t("vuoto");
    case "sfere":
      return t("sfere");
    case "strumenti":
      return t("strumenti");
    case "arete":
      return t("arete", { arete: getArete(actor).value });
    case "attributi":
      return t("attributi");
    case "abilita":
      return t("abilita");
    case "vantaggi":
      return t("vantaggi");
    case "ancore":
      return t("ancore");
    default:
      return t("controllo");
  }
}

/**
 * Il testo del «perché» di un passo: quello riscritto dal Narratore
 * nell'impostazione del mondo, se c'è, altrimenti quello della lingua.
 */
export function testoPerche(id, testi = {}, localize = (key) => key) {
  const proprio = String(testi?.[id]?.perche ?? "").trim();
  if (proprio && proprio !== "<p></p>") return { html: proprio, proprio: true };
  const lead = localize(`WOD5E_MAGE.Guidata.Passi.${id}.Perche`);
  const resto = localize(`WOD5E_MAGE.Guidata.Passi.${id}.PercheDue`);
  const parti = [`<p class="wod5e-mage-guidata-lead">${lead}</p>`];
  if (resto && resto !== `WOD5E_MAGE.Guidata.Passi.${id}.PercheDue`) parti.push(`<p>${resto}</p>`);
  return { html: parti.join(""), proprio: false };
}

/**
 * Il contesto della finestra per un passo: la barra dei passi, il grado,
 * il corpo del passo, il perché, la nota della scheda, i due tasti.
 *
 * @param {object} actor
 * @param {object} opzioni
 * @param {number} opzioni.passo - il passo in corso (1..13).
 * @param {function} opzioni.localize
 * @param {string} opzioni.lang
 * @param {object} opzioni.cataloghi - le voci dei compendi già caricate ({ ambizione, desiderio, convinzione, concetto, ancora }).
 * @param {object} opzioni.testi - i testi riscritti dal Narratore.
 * @param {boolean} opzioni.canEdit - il giocatore può scrivere sul personaggio.
 * @param {boolean} opzioni.narratore - chi guarda è il Narratore (può riscrivere il perché con l'editor).
 */
export function prepareGuidata(actor, { passo = 1, localize = (key) => key, lang = "it", cataloghi = {}, testi = {}, canEdit = true, narratore = false } = {}) {
  const n = Math.min(Math.max(Math.trunc(Number(passo) || 1), 1), PASSI.length);
  const id = PASSI[n - 1];
  const summary = prepareCreationSummary(actor, getArete(actor).value);
  const done = passiFatti(actor, summary);
  const passi = PASSI.map((stepId, index) => ({
    id: stepId,
    n: index + 1,
    label: localize(`WOD5E_MAGE.Guidata.Passi.${stepId}.Label`),
    qui: index + 1 === n,
    fatto: Boolean(done[stepId]),
    prima: index + 1 < n
  }));
  const grado = summary.targets.grado;
  const options = { localize, lang, locale: lang, cataloghi };
  let corpo;
  switch (id) {
    case "credo": corpo = passoCredo(actor, options); break;
    case "famiglia": corpo = passoFamiglia(actor, options); break;
    case "bussola": corpo = passoBussola(actor, options); break;
    case "tipo": corpo = passoTipo(actor, options); break;
    case "concetto": corpo = passoConcetto(actor, summary, options); break;
    case "sfere": corpo = passoSfere(actor, summary, options); break;
    case "strumenti": corpo = passoStrumenti(actor, options); break;
    case "arete": corpo = passoArete(actor, summary, options); break;
    case "attributi": corpo = passoAttributi(actor, summary, options); break;
    case "abilita": corpo = passoAbilita(actor, summary, options); break;
    case "vantaggi": corpo = passoVantaggi(actor, summary); break;
    case "ancore": corpo = passoAncore(actor, options); break;
    default: corpo = passoControllo(actor, summary, options);
  }
  const perche = testoPerche(id, testi, localize);
  return {
    passo: { id, n, label: localize(`WOD5E_MAGE.Guidata.Passi.${id}.Label`), domanda: localize(`WOD5E_MAGE.Guidata.Passi.${id}.Domanda`), sotto: localize(`WOD5E_MAGE.Guidata.Passi.${id}.Sotto`) },
    passi,
    totale: PASSI.length,
    corpo,
    perche: { ...perche, chiave: `${GUIDA_TESTI_SETTING}.${id}.perche` },
    nota: notaScheda(id, actor, { localize }),
    indietro: n > 1 ? { n: n - 1, label: localize(`WOD5E_MAGE.Guidata.Passi.${PASSI[n - 2]}.Label`) } : null,
    avanti: n < PASSI.length ? { n: n + 1, label: localize(`WOD5E_MAGE.Guidata.Passi.${PASSI[n]}.Label`) } : null,
    ultimo: n === PASSI.length,
    grado,
    gradi: GRADI.map((entry) => ({ id: entry.id, label: localize(`WOD5E_MAGE.Riepilogo.Grades.${entry.id}`), selected: entry.id === grado })),
    canEdit: Boolean(canEdit),
    narratore: Boolean(narratore),
    summary,
    done
  };
}
