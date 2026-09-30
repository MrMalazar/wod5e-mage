/**
 * Le schede si riallineano al catalogo dei poteri (Blue, 30/9/2026: «carica
 * tutte quelle che abbiamo approvato e deciso su Foundry, così intanto
 * cominciamo ad aggiornare una parte»).
 *
 * Un potere preso dal catalogo entra sulla scheda come copia (nuovoPotere):
 * nome, grado, testo, costo, usi, Paradosso, Flavor. Quando il catalogo
 * cambia (il rifacimento), le copie restano vecchie. Qui, al primo avvio del
 * mondo dopo un catalogo nuovo, il Narratore attivo le riallinea: un campo
 * della riga prende il valore di oggi solo se è ancora quello che il catalogo
 * aveva in una versione passata (lo dice la storia, scripts/data/poteri-storia.js,
 * impronte dei valori di ieri), o se nella riga manca. Un campo cambiato a
 * mano sulla scheda resta com'è. Le parti scritte sulla scheda (attivo,
 * passivo, prerequisitiTesto) non si toccano mai.
 *
 * La parte pura sta in testa (si prova in node); il giro sul mondo in coda.
 */
import { MODULE_ID } from "./constants.js";
import { normalizzaPotere, nuovoPotere, POTERI, POTERI_FLAG, sfereDellaVoce } from "./poteri.js";
import { POTERI_VERSIONE } from "./data/poteri.js";
import { STORIA_POTERI } from "./data/poteri-storia.js";

/** L'impostazione del mondo con l'impronta del catalogo a cui le schede sono allineate. */
export const POTERI_ALLINEATI_SETTING = "poteriAllineati";

/** I campi che la riga copia dal catalogo e che si riallineano. */
export const CAMPI_ALLINEATI = Object.freeze(["name", "dot", "type", "text", "amalgam", "amalgamText", "flavor", "cost", "formula", "formulaName", "link", "costValue", "uses", "paradox", "effects"]);

/** Un'impronta corta di un valore (FNV-1a a 32 bit sul JSON): la stessa di tools/genera-dati.mjs e tools/storia-poteri.mjs. */
export function impronta(valore) {
  const t = JSON.stringify(valore ?? null);
  let h = 0x811c9dc5;
  for (let i = 0; i < t.length; i += 1) {
    h ^= t.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

/** Il valore di un campo come lo legge la scheda (normalizzaPotere): così una riga salvata dal modulo e la copia del catalogo si confrontano. */
export function valorePulito(campo, valore) {
  return normalizzaPotere("", { [campo]: valore })[campo];
}

/** Quello che la riga avrebbe, presa oggi dal catalogo: la copia di nuovoPotere, campo per campo, pulita. */
export function copiaDelCatalogo(entry, sphere = "") {
  const dove = sphere || sfereDellaVoce(entry)[0] || "";
  const copia = nuovoPotere(dove, entry);
  return Object.fromEntries(CAMPI_ALLINEATI.map((campo) => [campo, valorePulito(campo, copia[campo])]));
}

/**
 * I campi da riscrivere in una riga: { campo: valore di oggi }. Un campo si
 * riscrive se manca nella riga, o se il suo valore è uno di quelli che il
 * catalogo aveva prima (`storia[campo]`, impronte); se è già quello di oggi,
 * o se è stato cambiato a mano, resta.
 */
export function allineaRiga(row, entry, storia = null) {
  if (!row || !entry) return {};
  const oggi = copiaDelCatalogo(entry, row.sphere);
  const cambi = {};
  for (const campo of CAMPI_ALLINEATI) {
    const nuovo = oggi[campo];
    if (!Object.hasOwn(row, campo) || row[campo] === undefined) {
      cambi[campo] = nuovo;
      continue;
    }
    const attuale = valorePulito(campo, row[campo]);
    if (impronta(attuale) === impronta(nuovo)) continue;
    if ((storia?.[campo] ?? []).includes(impronta(attuale))) cambi[campo] = nuovo;
  }
  return cambi;
}

/**
 * I cambi di tutte le righe di una scheda: { [id della riga]: { campo: valore } },
 * solo per le righe prese dal catalogo il cui potere c'è ancora. `tolti` sono
 * le righe col potere uscito dal catalogo, `fuori` quelle segnate in una Sfera
 * che il potere non apre più: si contano e si lasciano stare.
 */
export function allineaPoteri(rows = {}, { catalog = POTERI, storia = STORIA_POTERI } = {}) {
  const perId = new Map((catalog ?? []).map((entry) => [entry.id, entry]));
  const cambi = {};
  const tolti = [];
  const fuori = [];
  for (const [id, row] of Object.entries(rows ?? {})) {
    if (!row || typeof row !== "object" || row.source !== "catalogo" || !row.catalogId) continue;
    const entry = perId.get(String(row.catalogId));
    if (!entry) {
      tolti.push(id);
      continue;
    }
    if (row.sphere && !sfereDellaVoce(entry).includes(row.sphere)) fuori.push(id);
    const riga = allineaRiga(row, entry, storia?.[entry.id] ?? null);
    if (Object.keys(riga).length) cambi[id] = riga;
  }
  return { cambi, tolti, fuori };
}

/** L'aggiornamento di Foundry per i cambi: una chiave per campo, dentro la bandiera dei poteri. */
export function aggiornamentoPoteri(cambi = {}) {
  const update = {};
  for (const [id, campi] of Object.entries(cambi)) {
    for (const [campo, valore] of Object.entries(campi)) update[`flags.${MODULE_ID}.${POTERI_FLAG}.${id}.${campo}`] = valore;
  }
  return update;
}

/**
 * Il giro sul mondo: gli attori del mondo e quelli dei token non collegati
 * (come per le Condizioni del 29/9). Torna { righe, schede, tolti }: le righe
 * riscritte, le schede toccate, e i nomi dei poteri tolti che qualche scheda
 * ha ancora (per l'avviso al Narratore).
 */
export async function riallineaPoteri({ actors = [], tokens = [] } = {}) {
  let righe = 0;
  let schede = 0;
  const tolti = new Set();
  const attori = [...actors, ...tokens.map((token) => token?.actor).filter(Boolean)];
  const visti = new Set();
  for (const actor of attori) {
    const key = actor?.uuid ?? actor;
    if (visti.has(key)) continue;
    visti.add(key);
    const rows = actor?.getFlag?.(MODULE_ID, POTERI_FLAG);
    if (!rows || typeof rows !== "object") continue;
    const { cambi, tolti: senza } = allineaPoteri(rows);
    for (const id of senza) tolti.add(String(rows[id]?.name || rows[id]?.catalogId || id));
    const update = aggiornamentoPoteri(cambi);
    if (!Object.keys(update).length) continue;
    try {
      await actor.update(update);
      righe += Object.keys(cambi).length;
      schede += 1;
    } catch (error) {
      console.warn(`${MODULE_ID} | I poteri di ${actor?.name ?? "?"} non si sono riallineati.`, error);
    }
  }
  return { righe, schede, tolti: [...tolti] };
}

/** Al primo avvio dopo un catalogo nuovo: il Narratore attivo riallinea le schede, una volta per impronta. */
export async function riallineaPoteriDelMondo() {
  if (!game.user?.isGM || game.users?.activeGM?.id !== game.user.id) return null;
  if (game.settings.get(MODULE_ID, POTERI_ALLINEATI_SETTING) === POTERI_VERSIONE) return null;
  const tokens = (game.scenes?.contents ?? []).flatMap((scene) => (scene.tokens?.contents ?? []).filter((token) => !token.actorLink));
  const esito = await riallineaPoteri({ actors: game.actors?.contents ?? [], tokens });
  await game.settings.set(MODULE_ID, POTERI_ALLINEATI_SETTING, POTERI_VERSIONE);
  if (esito.righe) ui.notifications.info(game.i18n.format("WOD5E_MAGE.Poteri.Allineati", { righe: esito.righe, schede: esito.schede }));
  if (esito.tolti.length) ui.notifications.warn(game.i18n.format("WOD5E_MAGE.Poteri.ToltiSulleSchede", { nomi: esito.tolti.join(", ") }), { permanent: true });
  return esito;
}
