/**
 * La scheda del nemico (Blue, 25/9, dal mock docs/mock_scheda_nemico_25-9.html):
 * i conti e i contesti delle pagine, tutti in funzioni pure, senza Foundry.
 * La scheda (sheets/nemico-sheet.js) li chiama e li stampa; le prove
 * (tests/nemico.test.js, tests/finta/nemico.mjs) li controllano da sole.
 *
 * Il nemico è un attore `spc` del sistema. Quello che il sistema ha già si
 * legge dal sistema (le tre riserve `standarddicepools`, i casi a dadi
 * `exceptionaldicepools`, la Salute con `health.max`, il concetto, lo
 * `spcType`, la biografia, gli oggetti); il resto sta nella bandiera
 * `flags.wod5e-mage.nemico`:
 *
 *   natura     una delle NATURE (parte dallo spcType del sistema)
 *   fazione    testo libero
 *   soglie     { physical, social, mental }: i dadi che toglie a chi agisce contro di lui
 *   casi       { id: { nome, campo, soglia | dadi, skill, sort } }: una soglia o una riserva per una cosa precisa
 *   azioni     { id: { nome, testo, riserva, senzaTiro, danno, aggravato, portata, condizione, limite, soglia,
 *                      note, bonusSoglia, bonusA, sort } }; le azioni nate da un'arma hanno l'id «arma:<idOggetto>»
 *              e nella bandiera stanno solo i campi cambiati a mano
 *   attive     { idAzione: true }: le azioni senza tiro accese («Usa»)
 *   effetti    { id: { nome, testo, tipo, catalogo, sort } }: quello che ha di suo senza tirare
 *   magick     { on, arete, domini: { sfera: true }, tipo, effetti: { id: EFFETTO } }
 *   note       { vuole, molla }
 *
 * Un EFFETTO di Magick: { nome, breve, testo, resiste: { attribute, skill, testo },
 * dominio, come, da, formula, ambiti: { ambito: livello }, soglia, impossibile, sort }.
 * La soglia è quella scritta (dalla Formula, o dagli Ambiti a mano): il PG la
 * resiste col tiro scritto sull'effetto. Il Narratore non tira mai.
 */
import { CHIAVI_VIVE, RINOMINATE } from "./abilita-essenziali.js";
import { MODULE_ID } from "./constants.js";
import { CONDIZIONI } from "./data/condizioni.js";
import { ATTRIBUTE_KEYS } from "./tratti-icone.js";
import { formulaThresholds, prepareGrimorioFormule } from "./grimorio.js";
import { IMPOSSIBLE_SURCHARGE, SCOPES, SCOPES_PER_CAST, SCOPE_ICONS, SCOPE_MAX_LEVEL, scopeModes } from "./scopes.js";
import { SPHERES } from "./spheres.js";

export const NEMICO_FLAG = "nemico";

/** I tre campi delle riserve e delle soglie, nell'ordine delle carte. */
export const CAMPI = Object.freeze(["physical", "social", "mental"]);

export const CAMPO_ICONE = Object.freeze({ physical: "fa-solid fa-hand-fist", social: "fa-solid fa-comments", mental: "fa-solid fa-brain" });

/** Il gruppo di ogni Abilità del sistema (i tre percorsi di wod5e). */
export const GRUPPI_ABILITA = Object.freeze({
  athletics: "physical", brawl: "physical", craft: "physical", drive: "physical", firearms: "physical", larceny: "physical", melee: "physical", stealth: "physical", survival: "physical",
  animalken: "social", etiquette: "social", insight: "social", intimidation: "social", leadership: "social", performance: "social", persuasion: "social", streetwise: "social", subterfuge: "social",
  academics: "mental", awareness: "mental", finance: "mental", investigation: "mental", medicine: "mental", occult: "mental", politics: "mental", science: "mental", technology: "mental"
});

/**
 * Le Nature: le cinque del sistema (lo `spcType`) con la parola di M6, più
 * Risvegliato e Fatato, che il sistema non ha. La chiave è quella che si salva.
 */
export const NATURE = Object.freeze([
  { id: "mortal", spcType: "mortal", label: "WOD5E_MAGE.Nemico.Nature.mortal" },
  { id: "vampire", spcType: "vampire", label: "WOD5E_MAGE.Nemico.Nature.vampire" },
  { id: "werewolf", spcType: "werewolf", label: "WOD5E_MAGE.Nemico.Nature.werewolf" },
  { id: "hunter", spcType: "hunter", label: "WOD5E_MAGE.Nemico.Nature.hunter" },
  { id: "spirit", spcType: "spirit", label: "WOD5E_MAGE.Nemico.Nature.spirit" },
  { id: "risvegliato", spcType: "", label: "WOD5E_MAGE.Nemico.Nature.risvegliato" },
  { id: "fatato", spcType: "", label: "WOD5E_MAGE.Nemico.Nature.fatato" }
]);

/** La Natura del nemico: quella scritta nella bandiera, altrimenti quella dello spcType del sistema. */
export function naturaDi(flag = {}, spcType = "mortal") {
  const scritta = String(flag?.natura ?? "");
  if (NATURE.some((natura) => natura.id === scritta)) return scritta;
  return NATURE.find((natura) => natura.spcType && natura.spcType === String(spcType ?? ""))?.id ?? "mortal";
}

/** I tipi di Magick del nemico, come sulla scheda del mago. */
export const TIPI_MAGICK = Object.freeze(["magick", "tecnomagick", "ibrida"]);

/** I tipi di un effetto senza tiro. */
export const TIPI_EFFETTO = Object.freeze(["passivo", "attivo", "reazione"]);

/** Come si lancia: Accidentale o Volgare (per il nemico è solo un'etichetta). */
export const COME_MAGICK = Object.freeze(["accidentale", "volgare"]);

/**
 * La disposizione del token prototipo (CONST.TOKEN_DISPOSITIONS: segreto −2,
 * ostile −1, neutrale 0, amichevole 1): il filo in cima alla finestra e
 * l'etichetta in testa prendono il suo colore.
 */
export const DISPOSIZIONI = Object.freeze({
  "-2": { id: "segreto", label: "WOD5E_MAGE.Nemico.Disposizioni.segreto" },
  "-1": { id: "ostile", label: "WOD5E_MAGE.Nemico.Disposizioni.ostile" },
  0: { id: "neutrale", label: "WOD5E_MAGE.Nemico.Disposizioni.neutrale" },
  1: { id: "amichevole", label: "WOD5E_MAGE.Nemico.Disposizioni.amichevole" }
});

export function disposizioneDi(value) {
  return DISPOSIZIONI[String(Math.trunc(Number(value) || 0))] ?? DISPOSIZIONI["-1"];
}

const intero = (value, min = 0) => Math.max(Math.trunc(Number(value) || 0), min);
const testo = (value) => String(value ?? "").trim();
const oggetto = (value) => (value && typeof value === "object" && !Array.isArray(value) ? value : {});

/** Il tiro: riserva meno soglia uguale dadi; basta un successo, dal 6; a zero dadi non si tira. */
export const RIESCE_DAL = 6;

export function dadiDelTiro(riserva, soglia = 0) {
  return Math.max(intero(riserva) - intero(soglia), 0);
}

/** Con N dadi che riescono dal 6, la probabilità di almeno un successo: 1 − 0,5^N. */
export function probabilitaSuccesso(dadi) {
  const n = intero(dadi);
  return n <= 0 ? 0 : 1 - Math.pow(0.5, n);
}

/**
 * La lettura di una soglia (il sorvolo sul numero chiaro): contro una riserva
 * da 6 restano N dadi, e riesce X volte su 100.
 */
export function letturaSoglia(soglia, riserva = 6) {
  const dadi = dadiDelTiro(riserva, soglia);
  return { soglia: intero(soglia), riserva: intero(riserva), dadi, percento: Math.round(probabilitaSuccesso(dadi) * 100) };
}

/**
 * Una riserva scalata dai malus delle Condizioni: il numero che si stampa (già
 * scalato, in viola se è cambiato) e le voci che lo spiegano («5, −2 Atterrato»).
 * `voci` sono { nome, value } col value negativo. `mano` è la mano del
 * Narratore, { nome, value } con segno (Blue, 27/9): l'unico ritocco in più o
 * in meno oltre alle Condizioni, che entra nel conto e si legge fra le voci.
 */
export function riservaScalata(base, voci = [], mano = null) {
  const partenza = intero(base);
  const negative = (voci ?? []).filter((voce) => Math.trunc(Number(voce?.value) || 0) < 0).map((voce) => ({ nome: String(voce.nome ?? ""), value: Math.trunc(Number(voce.value) || 0) }));
  const malus = negative.reduce((sum, voce) => sum + voce.value, 0);
  const ritocco = Math.trunc(Number(mano?.value) || 0);
  const tutte = ritocco ? [...negative, { nome: String(mano?.nome ?? ""), value: ritocco }] : negative;
  const totale = Math.max(partenza + malus + ritocco, 0);
  const cambiata = malus !== 0 || ritocco !== 0;
  return {
    base: partenza,
    malus,
    mano: ritocco,
    totale,
    cambiata,
    voci: tutte,
    // «7 -2 Atterrato +2 Mano del Narratore»: il conto come si legge sulla carta.
    testo: cambiata ? `${partenza} ${vociTesto(tutte)}`.trim() : String(partenza)
  };
}

/**
 * La soglia di un effetto di Magick scritto a mano: la somma dei livelli degli
 * Ambiti sopra lo 0 (al massimo SCOPES_PER_CAST Ambiti alzati: gli altri non
 * contano e si segnalano), più IMPOSSIBLE_SURCHARGE per l'impresa impossibile.
 */
export function sogliaDagliAmbiti(livelli = {}, { impossibile = false } = {}) {
  const alzati = SCOPES
    .map((id) => ({ id, level: Math.min(intero(livelli?.[id]), SCOPE_MAX_LEVEL) }))
    .filter((entry) => entry.level > 0);
  const contati = alzati.slice(0, SCOPES_PER_CAST);
  const somma = contati.reduce((sum, entry) => sum + entry.level, 0);
  const extra = impossibile ? IMPOSSIBLE_SURCHARGE : 0;
  return {
    soglia: somma + extra,
    ambiti: contati,
    fuoriTetto: alzati.slice(SCOPES_PER_CAST).map((entry) => entry.id),
    impossibile: Boolean(impossibile),
    extra
  };
}

/** I danni di un effetto di Magick con la lente Danni: l'Areté più il livello di Potenza. */
export function danniMagick(arete, potenza) {
  return intero(arete) + intero(potenza);
}

/** Un id nuovo che non c'è ancora fra le chiavi (senza foundry.utils.randomID, per le prove). */
export function idNuovo(usati = {}, genera = () => Math.random().toString(36).slice(2, 10)) {
  let id = genera();
  while (usati && Object.hasOwn(usati, id)) id = genera();
  return id;
}

/** Le righe di una tavola a chiavi (casi, azioni, effetti) in ordine di `sort` e poi di nome. */
export function righeOrdinate(tavola = {}, lang = "it") {
  return Object.entries(tavola ?? {})
    .filter(([, row]) => row && typeof row === "object")
    .map(([id, row]) => ({ id, ...row }))
    .sort((a, b) => (Number(a.sort) || 0) - (Number(b.sort) || 0) || String(a.nome ?? "").localeCompare(String(b.nome ?? ""), lang));
}

/* ------------------------------------------------------------------ i dati */

/** La bandiera letta con i suoi valori di partenza: mai un campo che manca. */
export function datiNemico(flag = {}) {
  const f = oggetto(flag);
  const magick = oggetto(f.magick);
  const soglie = oggetto(f.soglie);
  return {
    natura: testo(f.natura),
    fazione: testo(f.fazione),
    soglie: Object.fromEntries(CAMPI.map((campo) => [campo, intero(soglie[campo])])),
    casi: oggetto(f.casi),
    azioni: oggetto(f.azioni),
    attive: oggetto(f.attive),
    effetti: oggetto(f.effetti),
    magick: {
      on: Boolean(magick.on),
      arete: Math.min(Math.max(intero(magick.arete), 0), 5) || 1,
      domini: Object.fromEntries(SPHERES.filter((id) => oggetto(magick.domini)[id]).map((id) => [id, true])),
      tipo: TIPI_MAGICK.includes(magick.tipo) ? magick.tipo : "magick",
      effetti: oggetto(magick.effetti)
    },
    note: { vuole: testo(oggetto(f.note).vuole), molla: testo(oggetto(f.note).molla) },
    // La mano del Narratore (Blue, 27/9: «solo la mano del master che modifica il tiro»):
    // i dadi in più o in meno su ogni tiro di questo nemico, fra −10 e +10.
    manoNarratore: Math.max(Math.min(Math.trunc(Number(f.manoNarratore) || 0), 10), -10)
  };
}

/** Il segno davanti a un numero, come si legge sulla carta: «+2», «-2», «0». */
export function segnoDi(value) {
  const n = Math.trunc(Number(value) || 0);
  return n > 0 ? `+${n}` : String(n);
}

/** Le voci di una riserva scalata in una riga: «-2 Atterrato +2 Mano del Narratore». */
export function vociTesto(voci = []) {
  return (voci ?? []).map((voce) => `${segnoDi(voce.value)} ${voce.nome}`).join(" ");
}

/** La mano del Narratore come voce della riserva: il nome e il ritocco (0 se non c'è). */
export function manoDelNarratore(dati = datiNemico(), localize = (k) => k) {
  return { nome: localize("WOD5E_MAGE.Nemico.ManoNarratore"), value: Math.trunc(Number(dati?.manoNarratore) || 0) };
}

/** Il nome M6 di un'Abilità dalla chiave del sistema: le rinominate dal modulo, le altre dal sistema. */
export function nomeAbilita(key, { nomi = {}, localize = (k) => k } = {}) {
  if (RINOMINATE[key]) return String(localize(RINOMINATE[key]));
  const voce = nomi?.[key];
  const nome = typeof voce === "string" ? voce : voce?.displayName ?? voce?.label ?? "";
  return String(nome || key);
}

/**
 * I malus delle Condizioni addosso, per campo: dagli oggetti `condition`
 * (i `bonuses` con `paths` physical, social, mental o all), solo i negativi,
 * mai quelli spenti (`suppressed`). Torna { physical, social, mental } con
 * le voci { nome, value }.
 */
export function malusCondizioni(items = []) {
  const per = Object.fromEntries(CAMPI.map((campo) => [campo, []]));
  for (const item of items ?? []) {
    if (item?.type !== "condition" || item.system?.suppressed) continue;
    for (const bonus of item.system?.bonuses ?? []) {
      const value = Math.trunc(Number(bonus?.value) || 0);
      if (value >= 0) continue;
      const paths = Array.isArray(bonus?.paths) ? bonus.paths.map(String) : [];
      const campi = paths.includes("all") ? CAMPI : CAMPI.filter((campo) => paths.includes(campo));
      for (const campo of campi) per[campo].push({ nome: String(bonus?.source || item.name || ""), value });
    }
  }
  return per;
}

/**
 * Le Condizioni in testa: simbolo, nome, il malus in viola («−2 fisico», «−1 a
 * tutto»), la × che le toglie, l'effetto nel sorvolo.
 */
export function condizioniTestata(items = [], { localize = (k) => k, format = (k, d) => `${k} ${JSON.stringify(d)}` } = {}) {
  const righe = [];
  for (const item of items ?? []) {
    if (item?.type !== "condition") continue;
    const malus = [];
    for (const bonus of item.system?.bonuses ?? []) {
      const value = Math.trunc(Number(bonus?.value) || 0);
      if (value >= 0) continue;
      const paths = Array.isArray(bonus?.paths) ? bonus.paths.map(String) : [];
      const campo = paths.includes("all") ? localize("WOD5E_MAGE.Nemico.MalusTutto") : CAMPI.filter((c) => paths.includes(c)).map((c) => String(localize(`WOD5E_MAGE.Nemico.Campi.${c}`)).toLowerCase()).join(", ");
      malus.push(format("WOD5E_MAGE.Nemico.Malus", { value: `−${Math.abs(value)}`, campo }));
    }
    const descrizione = String(item.system?.description ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    righe.push({
      id: String(item.id ?? item._id ?? ""),
      nome: String(item.name ?? ""),
      img: String(item.img ?? ""),
      condizione: String(item.flags?.[MODULE_ID]?.condizione ?? ""),
      malus: malus.join(" · "),
      title: descrizione,
      suppressed: Boolean(item.system?.suppressed)
    });
  }
  return righe;
}

/**
 * I casi: quelli a dadi del sistema (le riserve eccezionali accese, col nome
 * M6 dell'Abilità e la carta decisa dal gruppo dell'Abilità) e quelli scritti
 * nella bandiera (una soglia o una riserva, con l'Abilità facoltativa).
 */
export function casiDelNemico(system = {}, dati = datiNemico(), { nomi = {}, localize = (k) => k, lang = "it" } = {}) {
  const casi = [];
  for (const [key, pool] of Object.entries(oggetto(system?.exceptionaldicepools))) {
    if (!pool?.active) continue;
    casi.push({ id: `skill:${key}`, nome: nomeAbilita(key, { nomi, localize }), campo: GRUPPI_ABILITA[key] ?? "physical", soglia: null, dadi: intero(pool.value), skill: key, dalSistema: true });
  }
  for (const row of righeOrdinate(dati.casi, lang)) {
    const campo = CAMPI.includes(row.campo) ? row.campo : GRUPPI_ABILITA[row.skill] ?? "physical";
    const aSoglia = row.soglia !== null && row.soglia !== undefined && row.soglia !== "";
    casi.push({ id: row.id, nome: testo(row.nome) || localize("WOD5E_MAGE.Nemico.Caso"), campo, soglia: aSoglia ? intero(row.soglia) : null, dadi: aSoglia ? null : intero(row.dadi), skill: testo(row.skill), dalSistema: false });
  }
  return casi;
}

/** I bonus delle azioni senza tiro accese: a chi vanno («physical» o «caso:<id>») e quanto. */
export function bonusAttivi(dati = datiNemico()) {
  const bonus = {};
  for (const [id, on] of Object.entries(dati.attive)) {
    if (!on) continue;
    const azione = dati.azioni[id];
    const quanto = Math.trunc(Number(azione?.bonusSoglia) || 0);
    const a = testo(azione?.bonusA);
    if (!azione || !quanto || !a) continue;
    bonus[a] = (bonus[a] ?? 0) + quanto;
  }
  return bonus;
}

/**
 * Le tre carte: soglia (col sorvolo dei dadi che restano), riserva scalata dai
 * malus, e sotto i casi (una soglia con l'eventuale bonus, o i dadi già scalati).
 */
export function carteCampi(system = {}, dati = datiNemico(), { casi = [], malus = malusCondizioni([]), localize = (k) => k, format = (k, d) => `${k} ${JSON.stringify(d)}` } = {}) {
  const bonus = bonusAttivi(dati);
  const pools = oggetto(system?.standarddicepools);
  const mano = manoDelNarratore(dati, localize);
  return CAMPI.map((campo) => {
    const sogliaBase = dati.soglie[campo];
    const alza = bonus[campo] ?? 0;
    const soglia = Math.max(sogliaBase + alza, 0);
    const lettura = letturaSoglia(soglia);
    const riserva = riservaScalata(pools[campo]?.value, malus[campo], mano);
    return {
      id: campo,
      label: localize(`WOD5E_MAGE.Nemico.Campi.${campo}`),
      icona: CAMPO_ICONE[campo],
      soglia: { value: soglia, base: sogliaBase, bonus: alza, mod: alza !== 0, hint: format("WOD5E_MAGE.Nemico.SogliaHint", { riserva: lettura.riserva, dadi: lettura.dadi, percento: lettura.percento }) },
      riserva: {
        ...riserva,
        hint: riserva.cambiata
          ? format("WOD5E_MAGE.Nemico.TiraScalataHint", { nome: localize(`WOD5E_MAGE.Nemico.Campi.${campo}`), base: riserva.base, voci: vociTesto(riserva.voci), dadi: riserva.totale })
          : format("WOD5E_MAGE.Nemico.TiraHint", { nome: localize(`WOD5E_MAGE.Nemico.Campi.${campo}`), conto: riserva.totale })
      },
      casi: casi.filter((caso) => caso.campo === campo).map((caso) => {
        if (caso.soglia !== null) {
          const alzaCaso = bonus[`caso:${caso.id}`] ?? 0;
          const value = Math.max(caso.soglia + alzaCaso, 0);
          const letturaCaso = letturaSoglia(value);
          return { ...caso, aSoglia: true, value, mod: alzaCaso !== 0, hint: format("WOD5E_MAGE.Nemico.SogliaHint", { riserva: letturaCaso.riserva, dadi: letturaCaso.dadi, percento: letturaCaso.percento }) };
        }
        const scalata = riservaScalata(caso.dadi, malus[campo], mano);
        return { ...caso, aSoglia: false, value: scalata.totale, mod: scalata.cambiata, riserva: scalata, hint: scalata.cambiata ? format("WOD5E_MAGE.Nemico.TiraScalataHint", { nome: caso.nome, base: scalata.base, voci: vociTesto(scalata.voci), dadi: scalata.totale }) : format("WOD5E_MAGE.Nemico.TiraHint", { nome: caso.nome, conto: scalata.totale }) };
      })
    };
  });
}

/** Le portate delle armi (le parole dell'Ambito Portata, lente Scontro): come stanno nei dettagli dell'arma. */
export const PORTATE_ARMA = Object.freeze(["A contatto", "Due passi", "La stanza", "Un tiro di pistola", "La strada", "Un tiro di fucile", "Un tiro lungo", "Un cecchino"]);

/**
 * L'azione che nasce da un'arma addosso: «Spara» a distanza, «Colpisce» in
 * mischia (e si cambia); la riserva è il caso col nome dell'arma se c'è,
 * altrimenti il Fisico; danno, Aggravato e portata vengono dall'arma.
 */
export function azioneDaArma(item, { casi = [], localize = (k) => k } = {}) {
  const nome = testo(item?.name);
  const tipo = String(item?.system?.weaponType ?? "");
  const caso = casi.find((c) => c.dadi !== null && c.nome.toLowerCase() === nome.toLowerCase());
  return {
    id: `arma:${item?.id ?? item?._id ?? ""}`,
    nome: localize(tipo === "ranged" ? "WOD5E_MAGE.Nemico.Spara" : "WOD5E_MAGE.Nemico.Colpisce"),
    testo: "",
    riserva: caso ? `caso:${caso.id}` : "physical",
    senzaTiro: false,
    danno: intero(item?.system?.weaponvalue),
    aggravato: Boolean(item?.flags?.[MODULE_ID]?.aggravato),
    portata: testo(item?.flags?.[MODULE_ID]?.dettagli),
    condizione: "",
    limite: "",
    soglia: 0,
    note: "",
    bonusSoglia: 0,
    bonusA: "",
    arma: String(item?.id ?? item?._id ?? ""),
    armaNome: nome,
    sort: 0
  };
}

/** La riserva di un'azione letta per nome e numero: un campo, o un caso (anche del sistema). */
export function riservaDellAzione(riservaId, { casi = [], system = {}, localize = (k) => k } = {}) {
  const id = testo(riservaId) || "physical";
  if (id.startsWith("caso:") || id.startsWith("skill:")) {
    const caso = casi.find((c) => (id.startsWith("caso:") ? c.id === id.slice(5) : c.id === id) && c.dadi !== null);
    if (caso) return { id, label: caso.nome, base: caso.dadi, campo: caso.campo };
  }
  const campo = CAMPI.includes(id) ? id : "physical";
  return { id: campo, label: localize(`WOD5E_MAGE.Nemico.Campi.${campo}`), base: intero(oggetto(system?.standarddicepools)[campo]?.value), campo };
}

/** Le scelte della tendina «Riserva» di un'azione: i tre campi e i casi a dadi. */
export function sceltaRiserve(casi = [], localize = (k) => k) {
  return [
    ...CAMPI.map((campo) => ({ id: campo, label: localize(`WOD5E_MAGE.Nemico.Campi.${campo}`) })),
    ...casi.filter((caso) => caso.dadi !== null).map((caso) => ({ id: caso.id.startsWith("skill:") ? caso.id : `caso:${caso.id}`, label: caso.nome }))
  ];
}

/**
 * Le azioni: quelle scritte a mano e quelle nate dalle armi (coi campi
 * cambiati a mano sopra), ognuna col testo in breve, la riserva col numero
 * già scalato, e se è senza tiro il tasto Usa e il suo stato.
 */
export function azioniDelNemico(dati = datiNemico(), items = [], { system = {}, casi = [], malus = malusCondizioni([]), aperte = new Set(), localize = (k) => k, format = (k, d) => `${k} ${JSON.stringify(d)}`, lang = "it" } = {}) {
  const righe = [];
  const armi = (items ?? []).filter((item) => item?.type === "weapon");
  for (const item of armi) {
    const base = azioneDaArma(item, { casi, localize });
    const scritti = oggetto(dati.azioni[base.id]);
    // Danno, Aggravato e portata restano dell'arma: a mano si cambia il resto.
    const { danno: _d, aggravato: _a, portata: _p, arma: _arma, ...cambiati } = scritti;
    righe.push({ ...base, ...cambiati, nome: testo(cambiati.nome) || base.nome });
  }
  for (const [index, row] of righeOrdinate(dati.azioni, lang).entries()) {
    if (row.id.startsWith("arma:")) continue;
    righe.push({ ...azioneDaArma(null, { localize }), id: row.id, arma: "", armaNome: "", nome: testo(row.nome) || localize("WOD5E_MAGE.Nemico.AzioneNuova"), ...row, sort: 1 + index });
  }
  // Prima le azioni delle armi (il mock: Spara in testa), poi quelle scritte a mano nel loro ordine.
  righe.sort((a, b) => (Number(a.sort) || 0) - (Number(b.sort) || 0) || String(a.nome).localeCompare(String(b.nome), lang));
  const mano = manoDelNarratore(dati, localize);
  return righe.map((azione) => {
    const senzaTiro = Boolean(azione.senzaTiro);
    const riserva = riservaDellAzione(azione.riserva, { casi, system, localize });
    const scalata = riservaScalata(riserva.base, malus[riserva.campo], mano);
    const danno = intero(azione.danno);
    const aggravato = Boolean(azione.aggravato);
    const pezzi = [];
    if (danno) pezzi.push(format(aggravato ? "WOD5E_MAGE.Nemico.DannoAggravatoBreve" : "WOD5E_MAGE.Nemico.DannoBreve", { danno }));
    const condizione = testo(azione.condizione);
    const portata = testo(azione.portata);
    return {
      ...azione,
      senzaTiro,
      danno,
      aggravato,
      condizione,
      portata,
      limite: testo(azione.limite),
      soglia: intero(azione.soglia),
      note: testo(azione.note),
      bonusSoglia: Math.trunc(Number(azione.bonusSoglia) || 0),
      bonusA: testo(azione.bonusA),
      attiva: Boolean(dati.attive[azione.id]),
      aperta: aperte.has(azione.id),
      daArma: Boolean(azione.arma),
      testo: testo(azione.testo),
      // Il testo in breve, quando non è scritto a mano: danno · Condizione · portata.
      breve: { pezzi, condizione, portata },
      riserva: { ...riserva, ...scalata, dadi: dadiDelTiro(scalata.totale, azione.soglia), hint: scalata.cambiata ? format("WOD5E_MAGE.Nemico.TiraScalataHint", { nome: riserva.label, base: scalata.base, voci: vociTesto(scalata.voci), dadi: dadiDelTiro(scalata.totale, azione.soglia) }) : format("WOD5E_MAGE.Nemico.TiraHint", { nome: riserva.label, conto: dadiDelTiro(scalata.totale, azione.soglia) }) }
    };
  });
}

/** Gli effetti senza tiro: nome, testo, tipo. */
export function effettiDelNemico(dati = datiNemico(), { localize = (k) => k, lang = "it" } = {}) {
  return righeOrdinate(dati.effetti, lang).map((row) => {
    const tipo = TIPI_EFFETTO.includes(row.tipo) ? row.tipo : "passivo";
    return { id: row.id, nome: testo(row.nome) || localize("WOD5E_MAGE.Nemico.EffettoNuovo"), testo: testo(row.testo), tipo, tipoLabel: localize(`WOD5E_MAGE.Nemico.Tipi.${tipo}`), catalogo: testo(row.catalogo) };
  });
}

/** Il testo del tiro di resistenza: quello scritto, o Attributo + Abilità coi loro nomi. */
export function resistenzaTesto(resiste = {}, { attributi = {}, abilita = {}, localize = (k) => k } = {}) {
  const r = oggetto(resiste);
  if (testo(r.testo)) return testo(r.testo);
  const nomeTratto = (chiave) => {
    const id = String(chiave ?? "").replace(/^(attribute|skill):/, "");
    if (!id) return "";
    if (String(chiave).startsWith("skill:")) return String(abilita[id] ?? nomeAbilita(id, { localize }));
    if (attributi[id]) return String(attributi[id]);
    return String(abilita[id] ?? nomeAbilita(id, { localize }));
  };
  return [nomeTratto(r.attribute), nomeTratto(r.skill)].filter(Boolean).join(" + ");
}

/** L'effetto di Magick che nasce da una Formula del Grimorio: la soglia base e i suoi Ambiti, il tiro di resistenza da scrivere. */
export function effettoDaFormula(formula, { indice = 0 } = {}) {
  if (!formula) return null;
  const soglia = formula.thresholds?.[Math.min(Math.max(intero(indice), 0), (formula.thresholds?.length ?? 1) - 1)] ?? { base: 0, scopes: {} };
  return {
    nome: String(formula.name ?? ""),
    breve: String(formula.use ?? ""),
    testo: String(formula.intro ?? ""),
    resiste: { attribute: "", skill: "", testo: "" },
    dominio: "",
    come: "accidentale",
    da: "grimorio",
    formula: String(formula.id ?? ""),
    ambiti: Object.fromEntries(Object.entries(soglia.scopes ?? {}).map(([id, level]) => [id, intero(level)])),
    soglia: intero(soglia.base),
    impossibile: false
  };
}

/**
 * Le Formule che i Domini del nemico aprono, per il cassetto «dal Grimorio»:
 * nome, Sfere d'Accesso, gli Ambiti della soglia base, la soglia, e se è già
 * nella scheda.
 */
export function formuleDeiDomini(domini = {}, { effetti = {}, localize = (k) => k, cerca = "" } = {}) {
  const livelli = Object.fromEntries(Object.keys(oggetto(domini)).map((id) => [id, 1]));
  if (!Object.keys(livelli).length) return [];
  const prese = new Set(Object.values(oggetto(effetti)).map((effetto) => String(effetto?.formula ?? "")).filter(Boolean));
  const needle = testo(cerca).toLowerCase();
  return prepareGrimorioFormule(livelli, localize)
    .filter((formula) => formula.open)
    .filter((formula) => !needle || `${formula.name} ${formula.use} ${formula.intro}`.toLowerCase().includes(needle))
    .map((formula) => ({
      id: formula.id,
      name: formula.name,
      use: formula.use,
      access: formula.access,
      soglie: formula.thresholds.map((t, index) => ({ index, base: t.base, text: t.text, ambiti: t.scopes.map((s) => `${s.label} ${s.level}`).join(" · ") })),
      presa: prese.has(formula.id)
    }));
}

/** Le lenti degli Ambiti per il cassetto a mano: la scelta per Ambito (0 la prima, 1 la seconda). */
export function ambitiAMano(mano = {}, { arete = 1, localize = (k) => k } = {}) {
  const tavola = scopeModes(localize, { arete });
  const livelli = oggetto(mano.livelli);
  const lenti = oggetto(mano.lenti);
  const conto = sogliaDagliAmbiti(livelli, { impossibile: Boolean(mano.impossibile) });
  const righe = SCOPES.map((id) => {
    const opzioni = tavola[id] ?? [];
    const indice = opzioni.length > 1 && intero(lenti[id]) === 1 ? 1 : 0;
    const lente = opzioni[indice] ?? { readings: [], hints: [], short: "", label: "" };
    const level = Math.min(intero(livelli[id]), SCOPE_MAX_LEVEL);
    return {
      id,
      label: localize(`WOD5E_MAGE.Scopes.${id}`),
      faIcon: SCOPE_ICONS[id] ?? "",
      lente: { indice, id: lente.id ?? "", label: lente.short || lente.label || "", altra: opzioni.length > 1 },
      level,
      alto: level > 0,
      lettura: lente.readings?.[level] ?? "",
      pallini: Array.from({ length: SCOPE_MAX_LEVEL + 1 }, (_, value) => ({ value, on: value > 0 && value <= level, zero: value === 0, title: lente.readings?.[value] ?? "" }))
    };
  });
  const potenza = righe.find((riga) => riga.id === "potency");
  const danni = potenza?.lente?.indice === 0 && potenza.level >= 0 ? danniMagick(arete, potenza.level) : null;
  return {
    righe,
    potenza: potenza?.level ?? 0,
    soglia: conto.soglia,
    ambiti: conto.ambiti,
    conto: conto.ambiti.length ? conto.ambiti.map((entry) => `${localize(`WOD5E_MAGE.Scopes.${entry.id}`)} ${entry.level}`).join(" + ") + (conto.extra ? ` + ${conto.extra}` : "") : localize("WOD5E_MAGE.Nemico.TuttiZero"),
    impossibile: Boolean(mano.impossibile),
    extra: IMPOSSIBLE_SURCHARGE,
    danni,
    fuoriTetto: conto.fuoriTetto
  };
}

/** Un livello che sale sopra lo 0 su un Ambito nuovo: solo se gli alzati sono meno di tre. */
export function puoAlzare(livelli = {}, id, level) {
  const attuale = intero(oggetto(livelli)[id]);
  if (intero(level) === 0 || attuale > 0) return true;
  const alzati = SCOPES.filter((scope) => scope !== id && intero(oggetto(livelli)[scope]) > 0).length;
  return alzati < SCOPES_PER_CAST;
}

/** La Magick del nemico: la fascia (Areté, Domini, Tipo) e gli effetti come soglie. */
export function magickDelNemico(dati = datiNemico(), { aperte = new Set(), attributi = {}, abilita = {}, localize = (k) => k, format = (k, d) => `${k} ${JSON.stringify(d)}`, lang = "it" } = {}) {
  const magick = dati.magick;
  const domini = SPHERES.map((id) => ({ id, label: localize(`WOD5E_MAGE.Spheres.${id}`), icon: `modules/${MODULE_ID}/assets/icons/sheet/${id}.png`, on: Boolean(magick.domini[id]) }))
    .sort((a, b) => a.label.localeCompare(b.label, lang));
  const effetti = righeOrdinate(magick.effetti, lang).map((row) => {
    const ambiti = Object.entries(oggetto(row.ambiti)).filter(([id, level]) => SCOPES.includes(id) && intero(level) > 0).map(([id, level]) => ({ id, level: intero(level), label: localize(`WOD5E_MAGE.Scopes.${id}`), faIcon: SCOPE_ICONS[id] ?? "" }));
    const resiste = resistenzaTesto(row.resiste, { attributi, abilita, localize });
    const come = COME_MAGICK.includes(row.come) ? row.come : "accidentale";
    const da = row.da === "grimorio" ? "grimorio" : "mano";
    const dominio = testo(row.dominio);
    return {
      id: row.id,
      nome: testo(row.nome) || localize("WOD5E_MAGE.Nemico.EffettoNuovo"),
      breve: testo(row.breve),
      testo: testo(row.testo),
      soglia: intero(row.soglia),
      ambiti,
      ambitiTesto: ambiti.map((a) => `${a.label} ${a.level}`).join(", "),
      resiste: oggetto(row.resiste),
      resisteTesto: resiste,
      resisteLabel: resiste ? format("WOD5E_MAGE.Nemico.ResisteCon", { tiro: resiste }) : localize("WOD5E_MAGE.Nemico.ResistenzaDaScrivere"),
      come,
      comeLabel: localize(come === "volgare" ? "WOD5E_MAGE.Nemico.Volgare" : "WOD5E_MAGE.Nemico.Accidentale"),
      da,
      daLabel: localize(da === "grimorio" ? "WOD5E_MAGE.Nemico.DaGrimorio" : "WOD5E_MAGE.Nemico.DaMano"),
      dominio,
      dominioLabel: dominio ? (SPHERES.includes(dominio) ? localize(`WOD5E_MAGE.Spheres.${dominio}`) : dominio) : "",
      formula: testo(row.formula),
      impossibile: Boolean(row.impossibile),
      danni: Object.hasOwn(oggetto(row.ambiti), "potency") && intero(oggetto(row.ambiti).potency) > 0 && row.lentePotenza !== "peso" ? danniMagick(magick.arete, oggetto(row.ambiti).potency) : null,
      aperta: aperte.has(row.id)
    };
  });
  return {
    on: magick.on,
    arete: magick.arete,
    areteDots: Array.from({ length: 5 }, (_, index) => ({ value: index + 1, on: index + 1 <= magick.arete })),
    domini,
    dominiScelti: domini.filter((d) => d.on),
    dominiTesto: domini.filter((d) => d.on).map((d) => d.label).join(", "),
    tipo: magick.tipo,
    tipi: TIPI_MAGICK.map((id) => ({ id, label: localize(`WOD5E_MAGE.Nemico.TipiMagick.${id}`), on: id === magick.tipo })),
    effetti
  };
}

/** Gli oggetti addosso in tre gruppi: armi, protezioni, oggetti, ognuno con cosa fa e una nota breve. */
export function oggettiDelNemico(items = [], { azioni = [], localize = (k) => k, format = (k, d) => `${k} ${JSON.stringify(d)}`, lang = "it" } = {}) {
  const pulisci = (html) => String(html ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const righe = { weapon: [], armor: [], gear: [] };
  for (const item of items ?? []) {
    if (!Object.hasOwn(righe, item?.type)) continue;
    const id = String(item.id ?? item._id ?? "");
    const uuid = String(item.uuid ?? "");
    const flags = oggetto(item.flags?.[MODULE_ID]);
    if (item.type === "weapon") {
      const danno = intero(item.system?.weaponvalue);
      const azione = azioni.find((a) => a.arma === id);
      righe.weapon.push({ id, uuid, name: String(item.name ?? ""), testo: [danno ? format(flags.aggravato ? "WOD5E_MAGE.Nemico.DannoAggravatoBreve" : "WOD5E_MAGE.Nemico.DannoBreve", { danno }) : "", testo(flags.dettagli), pulisci(item.system?.description)].filter(Boolean).join(" · "), nota: azione ? format("WOD5E_MAGE.Nemico.CreaAzione", { azione: azione.nome }) : "" });
    } else if (item.type === "armor") {
      const punti = intero(item.system?.armorvalue);
      const pieno = Math.max(intero(flags.armaturaPiena), punti);
      righe.armor.push({ id, uuid, name: String(item.name ?? ""), punti, pieno, mentale: flags.armatura === "mentale", testo: [format("WOD5E_MAGE.Nemico.PuntiArmatura", { punti: pieno }), localize(flags.armatura === "mentale" ? "WOD5E_MAGE.Nemico.Mentale" : "WOD5E_MAGE.Nemico.Fisica"), pulisci(item.system?.description)].filter(Boolean).join(" · "), nota: localize("WOD5E_MAGE.Nemico.ArmaturaNota") });
    } else {
      righe.gear.push({ id, uuid, name: String(item.name ?? ""), testo: pulisci(item.system?.description) || testo(flags.dettagli), nota: "" });
    }
  }
  for (const lista of Object.values(righe)) lista.sort((a, b) => a.name.localeCompare(b.name, lang));
  return righe;
}

/** Le protezioni in testa: i punti pieni e vuoti, il nome, il conto, i tasti. */
export function armatureTestata(items = [], { format = (k, d) => `${k} ${JSON.stringify(d)}`, localize = (k) => k } = {}) {
  return (items ?? []).filter((item) => item?.type === "armor").map((item) => {
    const flags = oggetto(item.flags?.[MODULE_ID]);
    const restano = intero(item.system?.armorvalue);
    const pieno = Math.max(intero(flags.armaturaPiena), restano, 1);
    return {
      id: String(item.id ?? item._id ?? ""),
      name: String(item.name ?? ""),
      restano,
      pieno,
      mentale: flags.armatura === "mentale",
      kindLabel: localize(flags.armatura === "mentale" ? "WOD5E_MAGE.Nemico.Mentale" : "WOD5E_MAGE.Nemico.Fisica"),
      conto: format("WOD5E_MAGE.Nemico.ArmaturaConto", { restano, pieno }),
      pips: Array.from({ length: pieno }, (_, index) => ({ pieno: index < restano }))
    };
  });
}

/** I punti armatura che un bersaglio porta addosso (fisici e mentali), per la carta. */
export function armaturaDi(items = []) {
  let fisica = 0;
  let mentale = 0;
  for (const item of items ?? []) {
    if (item?.type !== "armor") continue;
    const punti = intero(item.system?.armorvalue);
    if (item.flags?.[MODULE_ID]?.armatura === "mentale") mentale += punti; else fisica += punti;
  }
  return { fisica, mentale, totale: fisica + mentale };
}

/**
 * Il contesto di tutta la scheda: la testata (chi è, Salute, Armatura,
 * Condizioni, disposizione), le linguette, e le quattro pagine. `salute` e
 * `items` arrivano da fuori (la Salute la legge salute.js, gli oggetti sono
 * gli Item dell'attore); `stato` è la memoria della scheda (le righe aperte,
 * il cassetto, il modulo a mano).
 */
export function prepareNemicoContext({ actor = {}, items = [], salute = null, stato = {}, nomi = {}, attributi = null, abilita = null, condizioniScelta = [], localize = (k) => k, format = (k, d) => `${k} ${JSON.stringify(d)}`, lang = "it" } = {}) {
  const system = oggetto(actor.system);
  // I nomi degli Attributi e delle Abilità, per il tiro di resistenza e i casi.
  const nomiAttributi = attributi ?? Object.fromEntries(ATTRIBUTE_KEYS.map((id) => [id, String(localize(`WOD5E_MAGE.Nemico.Attributi.${id}`))]));
  const nomiAbilita = abilita ?? Object.fromEntries(CHIAVI_VIVE.map((key) => [key, nomeAbilita(key, { nomi, localize })]));
  const attributiScelta = ATTRIBUTE_KEYS.map((id) => ({ id, label: nomiAttributi[id] ?? id }));
  const abilitaScelta = CHIAVI_VIVE.map((key) => ({ id: key, label: nomiAbilita[key] ?? key })).sort((a, b) => a.label.localeCompare(b.label, lang));
  // Il secondo tratto della resistenza: un Attributo (Fermezza + Autocontrollo) o un'Abilità, con la chiave prefissata.
  const secondoTratto = [
    ...attributiScelta.map((a) => ({ id: `attribute:${a.id}`, label: a.label, gruppo: "attributi" })),
    ...abilitaScelta.map((s) => ({ id: `skill:${s.id}`, label: s.label, gruppo: "abilita" }))
  ];
  const flag = actor.getFlag?.(MODULE_ID, NEMICO_FLAG) ?? actor.flags?.[MODULE_ID]?.[NEMICO_FLAG] ?? {};
  const dati = datiNemico(flag);
  const aperte = stato.aperte instanceof Set ? stato.aperte : new Set(stato.aperte ?? []);
  const casi = casiDelNemico(system, dati, { nomi, localize, lang });
  const malus = malusCondizioni(items);
  const azioni = azioniDelNemico(dati, items, { system, casi, malus, aperte, localize, format, lang });
  const magick = magickDelNemico(dati, { aperte, attributi: nomiAttributi, abilita: nomiAbilita, localize, format, lang });
  const natura = naturaDi(dati, system.spcType);
  const disposizione = disposizioneDi(actor.prototypeToken?.disposition);
  const effettiMagick = magick.effetti.length;
  return {
    nome: String(actor.name ?? ""),
    img: String(actor.img ?? ""),
    concetto: testo(oggetto(system.headers).concept),
    natura,
    nature: NATURE.map((n) => ({ id: n.id, label: localize(n.label), on: n.id === natura })),
    naturaLabel: localize(NATURE.find((n) => n.id === natura)?.label ?? NATURE[0].label),
    fazione: dati.fazione,
    appartenenza: [localize(NATURE.find((n) => n.id === natura)?.label ?? NATURE[0].label), dati.fazione].filter(Boolean).join(" · "),
    disposizione: { ...disposizione, label: localize(disposizione.label) },
    salute,
    saluteMax: intero(oggetto(system.health).max, 1) || 1,
    armature: armatureTestata(items, { format, localize }),
    condizioni: condizioniTestata(items, { localize, format }),
    // La mano del Narratore (27/9): il ritocco ± che entra in ogni tiro, in testa sotto le Condizioni.
    manoNarratore: {
      value: dati.manoNarratore,
      segno: segnoDi(dati.manoNarratore),
      on: dati.manoNarratore !== 0,
      meno: dati.manoNarratore < 0,
      dadiTesto: format("WOD5E_MAGE.Nemico.ManoNarratoreDadi", { dadi: segnoDi(dati.manoNarratore) })
    },
    soglie: dati.soglie,
    carte: carteCampi(system, dati, { casi, malus, localize, format }),
    casi,
    riserve: sceltaRiserve(casi, localize),
    azioni,
    effetti: effettiDelNemico(dati, { localize, lang }),
    magick,
    magickEffetti: effettiMagick,
    pagine: [
      { id: "gioco", label: localize("WOD5E_MAGE.Nemico.Pagine.gioco") },
      ...(magick.on ? [{ id: "magick", label: localize("WOD5E_MAGE.Nemico.Pagine.magick"), conto: effettiMagick }] : []),
      { id: "oggetti", label: localize("WOD5E_MAGE.Nemico.Pagine.oggetti") },
      { id: "note", label: localize("WOD5E_MAGE.Nemico.Pagine.note") }
    ],
    cassetto: testo(stato.cassetto),
    grimorio: stato.cassetto === "grimorio" ? { cerca: testo(stato.cerca), formule: formuleDeiDomini(dati.magick.domini, { effetti: dati.magick.effetti, localize, cerca: stato.cerca }), dominiTesto: magick.dominiTesto, senzaDomini: !magick.dominiScelti.length } : null,
    mano: stato.cassetto === "mano" ? { ...oggetto(stato.mano), ambiti: ambitiAMano(stato.mano, { arete: dati.magick.arete, localize }), domini: magick.dominiScelti.map((d) => ({ ...d, on: d.id === testo(oggetto(stato.mano).dominio) })), come: COME_MAGICK.map((id) => ({ id, label: localize(id === "volgare" ? "WOD5E_MAGE.Nemico.Volgare" : "WOD5E_MAGE.Nemico.Accidentale"), on: id === (testo(oggetto(stato.mano).come) || "accidentale") })) } : null,
    oggetti: oggettiDelNemico(items, { azioni, localize, format, lang }),
    oggettiGruppi: gruppiOggetti(oggettiDelNemico(items, { azioni, localize, format, lang }), localize),
    note: dati.note,
    biografia: String(system.biography ?? ""),
    // Le liste dei template: le portate, i tipi, gli Attributi e le Abilità, le Condizioni, a chi va un bonus.
    portate: PORTATE_ARMA,
    tipiEffetto: TIPI_EFFETTO.map((id) => ({ id, label: localize(`WOD5E_MAGE.Nemico.Tipi.${id}`) })),
    attributiScelta,
    abilitaScelta,
    secondoTratto,
    condizioniNomi: CONDIZIONI.map((entry) => entry.name),
    condizioniScelta,
    bersagliBonus: [
      ...CAMPI.map((campo) => ({ id: campo, label: localize(`WOD5E_MAGE.Nemico.Campi.${campo}`) })),
      ...casi.filter((caso) => caso.soglia !== null).map((caso) => ({ id: `caso:${caso.id}`, label: caso.nome }))
    ],
    extraImpossibile: IMPOSSIBLE_SURCHARGE,
    dati
  };
}

/** Gli oggetti in tre gruppi coi loro nomi, per la pagina Oggetti. */
export function gruppiOggetti(oggetti, localize = (k) => k) {
  return [
    { id: "weapon", label: localize("WOD5E_MAGE.Nemico.Armi"), righe: oggetti?.weapon ?? [] },
    { id: "armor", label: localize("WOD5E_MAGE.Nemico.Protezioni"), righe: oggetti?.armor ?? [] },
    { id: "gear", label: localize("WOD5E_MAGE.Nemico.OggettiLabel"), righe: oggetti?.gear ?? [] }
  ];
}

/**
 * Il contesto della carta del tiro di un'azione o di una riserva: il titolo
 * («Spara · su Guendalina»), il conto («Pistola 7 −2 Atterrato = 5 dadi ·
 * riesce dal 6»), e cosa applicare se riesce.
 */
export function contoDelTiro({ nome = "", riserva = null, soglia = 0, bersaglio = null, danno = 0, aggravato = false, condizione = "", localize = (k) => k, format = (k, d) => `${k} ${JSON.stringify(d)}` } = {}) {
  const scalata = riserva ?? riservaScalata(0, []);
  const dadi = dadiDelTiro(scalata.totale, soglia);
  const titolo = bersaglio?.name ? format("WOD5E_MAGE.Nemico.TiroSu", { azione: nome, bersaglio: bersaglio.name }) : format("WOD5E_MAGE.Nemico.TiroTitolo", { azione: nome });
  const parti = [`${scalata.label ?? ""} ${scalata.base}`.trim(), ...scalata.voci.map((v) => `${segnoDi(v.value)} ${v.nome}`)];
  if (intero(soglia)) parti.push(`− ${intero(soglia)} ${localize("WOD5E_MAGE.Nemico.Soglia")}`);
  const conto = scalata.cambiata || intero(soglia)
    ? format("WOD5E_MAGE.Nemico.Conto", { conto: parti.join(" "), dadi, dal: RIESCE_DAL })
    : format("WOD5E_MAGE.Nemico.ContoSemplice", { nome: scalata.label ?? "", dadi, dal: RIESCE_DAL });
  const esito = [];
  if (intero(danno)) esito.push(format("WOD5E_MAGE.Nemico.DannoEsito", { danno: intero(danno), tipo: localize(aggravato ? "WOD5E_MAGE.Nemico.Aggravati" : "WOD5E_MAGE.Nemico.Superficiali") }));
  if (testo(condizione)) esito.push(testo(condizione));
  return { titolo, conto, dadi, esito: esito.join(" · "), danno: intero(danno), aggravato: Boolean(aggravato), condizione: testo(condizione), bersaglio: bersaglio ? { uuid: String(bersaglio.uuid ?? ""), name: String(bersaglio.name ?? "") } : null };
}
