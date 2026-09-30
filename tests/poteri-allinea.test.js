import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  aggiornamentoPoteri,
  allineaPoteri,
  allineaRiga,
  CAMPI_ALLINEATI,
  copiaDelCatalogo,
  impronta,
  POTERI_ALLINEATI_SETTING,
  riallineaPoteri,
  valorePulito
} from "../scripts/poteri-allinea.js";
import { costoDelPotere, nuovoPotere, POTERI, spesaNeiLimiti } from "../scripts/poteri.js";
import { POTERI_TOLTI, POTERI_VERSIONE } from "../scripts/data/poteri.js";
import { STORIA_POTERI } from "../scripts/data/poteri-storia.js";

// Il rifacimento deciso (Blue, 30/9: «carica tutte quelle che abbiamo approvato e deciso su Foundry»):
// il catalogo porta i poteri rifatti, gli aggiunti, e non ha più i tolti.
const rifacimento = JSON.parse(readFileSync(new URL("../tools/dati/rifacimento.json", import.meta.url), "utf8"));
const perId = new Map(POTERI.map((entry) => [entry.id, entry]));
for (const [id, r] of [...Object.entries(rifacimento.poteri), ...Object.entries(rifacimento.aggiunti)]) {
  const entry = perId.get(id);
  assert.ok(entry, `${id} nel catalogo`);
  assert.equal(entry.rifatto, true, id);
  assert.equal(entry.dot, r.grado, id);
  assert.equal(entry.costoAttivo, r.attivo.costo, id);
  assert.equal(entry.cadenzaPassivo, r.passivo.cadenza, id);
  assert.equal(entry.kind, "attivo e passivo", id);
  assert.ok(entry.attivo.startsWith(r.attivo.testo), `${id}: il testo dell'attivo`);
  assert.ok(entry.passivo.startsWith(r.passivo.testo), `${id}: il testo del passivo`);
  for (const riga of r.attivo.con ?? []) assert.ok(entry.attivo.includes(`: ${riga.t}`) && /\nCon /.test(entry.attivo), `${id}: la riga d'Amalgama sotto l'attivo`);
  for (const riga of r.passivo.con ?? []) assert.ok(entry.passivo.includes(`: ${riga.t}`) && /\nCon /.test(entry.passivo), `${id}: la riga d'Amalgama sotto il passivo`);
  if (r.nome) assert.equal(entry.name, r.nome, id);
  // I prerequisiti in parole diventano il numero di poteri della Sfera (il grado N chiede N-1 poteri).
  const numero = String(r.prerequisiti).match(/^(\d+) /);
  assert.deepEqual(entry.prerequisiti, numero ? [{ numero: Number(numero[1]) }] : null, id);
}
for (const id of Object.keys(rifacimento.tolti)) {
  assert.equal(perId.has(id), false, `${id} tolto`);
  assert.ok(POTERI_TOLTI[id]?.name && POTERI_TOLTI[id]?.motivo, id);
}
assert.equal(POTERI.length, 187 - Object.keys(rifacimento.tolti).length + Object.keys(rifacimento.aggiunti).length);
// I nomi nuovi e le Sfere nuove.
assert.equal(perId.get("il-mondo-e-piccolo").name, "Non ti ricordi di me?");
assert.deepEqual(perId.get("l-ho-sentito-dire").spheres, ["spirit"]);
assert.deepEqual(perId.get("ubiquita").amalgams, ["life", "mind"]);
assert.match(perId.get("traccia").passivo, /\nCon Tempo: sai anche quanto tempo fa/);
// Il titolo del blocco porta il costo e la cadenza fra parentesi.
assert.match(perId.get("traccia").text, /^Effetto attivo \(1 Quintessenza\): Segui la traccia/);
assert.match(perId.get("traccia").text, /\n\nEffetto passivo \(Sempre\): In ogni posto/);
// I ritocchi delle Condizioni (29/9) sui poteri non ancora rifatti.
assert.match(perId.get("parole-che-pesano").text, /si aggiornerà a catena col rifacimento delle Condizioni/);
assert.equal(perId.get("parole-che-pesano").rifatto, false);
// Un potere non toccato resta com'era.
assert.equal(perId.get("velocista").rifatto, false);
assert.equal(POTERI_ALLINEATI_SETTING, "poteriAllineati");
assert.match(POTERI_VERSIONE, /^[0-9a-f]{8}$/);

// Il costo dell'attivo per il tasto «Usa»: fisso, variabile, o scritto e basta.
{
  const fisso = perId.get("traccia");
  assert.deepEqual([fisso.cost, fisso.costValue, fisso.costoVariabile, fisso.uses], ["1 Quintessenza", 1, null, null]);
  const variabile = perId.get("il-fucile-di-echov");
  assert.deepEqual([variabile.cost, variabile.costValue, variabile.costoVariabile], ["da 1 a 3 Quintessenza", 0, { min: 1, max: 3 }]);
  const riga = nuovoPotere("entropy", variabile);
  assert.deepEqual(costoDelPotere(riga, variabile), { fisso: 0, variabile: { min: 1, max: 3 }, testo: "da 1 a 3 Quintessenza" });
  assert.deepEqual(costoDelPotere(nuovoPotere("correspondence", fisso), fisso), { fisso: 1, variabile: null, testo: "1 Quintessenza" });
  assert.deepEqual([spesaNeiLimiti(0, { min: 1, max: 3 }), spesaNeiLimiti(2, { min: 1, max: 3 }), spesaNeiLimiti(9, { min: 1, max: 3 }), spesaNeiLimiti(9, { min: 1, max: 0 })], [1, 2, 3, 9]);
  // «Azione, una volta per scena»: niente Quintessenza, un uso per scena.
  const azione = POTERI.find((entry) => entry.costoAttivo === "Azione, una volta per scena");
  assert.deepEqual([azione.costValue, azione.costoVariabile, azione.uses], [0, null, { per: "scena", n: 1 }]);
  // «2 Quintessenza e 2 Paradosso»: la Quintessenza si scala da sola, il Paradosso lo segna il tavolo.
  const conParadosso = POTERI.find((entry) => entry.costoAttivo === "2 Quintessenza e 2 Paradosso");
  assert.deepEqual([conParadosso.costValue, conParadosso.costoVariabile], [2, null]);
  // «1 Quintessenza a bersaglio»: variabile, senza tetto.
  assert.deepEqual(POTERI.find((entry) => entry.costoAttivo === "1 Quintessenza a bersaglio").costoVariabile, { min: 1, max: 0 });
}

// L'impronta: la stessa per valori uguali, diversa per valori diversi, 8 cifre esadecimali.
assert.equal(impronta("a"), impronta("a"));
assert.notEqual(impronta("a"), impronta("b"));
assert.match(impronta({ per: "scena", n: 1 }), /^[0-9a-f]{8}$/);
assert.deepEqual([valorePulito("dot", "7"), valorePulito("name", "  X "), valorePulito("uses", { per: "scena", n: 0 }), valorePulito("effects", null)], [5, "X", { per: "scena", n: 1 }, []]);

// Una riga presa dal catalogo di ieri: i campi uguali a ieri prendono il valore di oggi, quelli cambiati a mano restano.
{
  const oggi = perId.get("pensiero-laterale");
  const ieri = { ...oggi, name: "Pensiero laterale", dot: 1, text: "Effetto attivo: Una volta per scena spieghi il ragionamento.", cost: "", costValue: 0, uses: { per: "scena", n: 1 }, effects: [] };
  const riga = { ...nuovoPotere("mind", ieri), catalogId: oggi.id };
  const storia = Object.fromEntries(CAMPI_ALLINEATI.map((campo) => [campo, [impronta(copiaDelCatalogo(ieri)[campo])]]));
  const cambi = allineaRiga(riga, oggi, storia);
  const attesa = copiaDelCatalogo(oggi, "mind");
  assert.equal(cambi.text, attesa.text);
  assert.equal(cambi.dot, attesa.dot);
  assert.equal(cambi.cost, "1 Quintessenza");
  assert.equal(cambi.costValue, 1);
  assert.equal(cambi.uses, null);
  // Il nome era già quello di oggi: non si tocca.
  assert.equal(Object.hasOwn(cambi, "name"), false);
  // Il Flavor cambiato a mano resta, anche se il catalogo lo cambia.
  const aMano = allineaRiga({ ...riga, flavor: "Il mio flavour." }, { ...oggi, flavor: "Quello nuovo." }, storia);
  assert.equal(Object.hasOwn(aMano, "flavor"), false);
  // Un campo che manca nella riga prende il valore di oggi.
  const { paradox, ...senzaParadosso } = riga;
  assert.equal(allineaRiga(senzaParadosso, oggi, storia).paradox, attesa.paradox);
  // Una riga già allineata non cambia.
  assert.deepEqual(allineaRiga({ ...riga, ...cambi }, oggi, storia), {});
}

// La storia vera (dal git log): una riga presa dal catalogo di ieri si riallinea sui poteri rifatti.
{
  const ids = ["da-qualche-parte", "pensiero-laterale", "al-posto-tuo", "tutto-e-un-arma", "il-banco-vince", "testa-o-croce"];
  for (const id of ids) assert.ok(STORIA_POTERI[id]?.text?.length, `${id}: la storia ha il testo di ieri`);
  assert.equal(STORIA_POTERI["fai-da-te"], undefined, "un potere tolto non ha storia: la sua riga non si riallinea");
  assert.equal(STORIA_POTERI["velocista"]?.text, undefined, "il testo di Velocista non è mai cambiato");
}

// Le righe di una scheda: solo quelle del catalogo; i poteri tolti e le Sfere che il potere non apre più si contano e restano.
{
  const oggi = perId.get("da-qualche-parte");
  const ieri = { ...oggi, text: "Effetto passivo: Vecchio testo." };
  const storia = { "da-qualche-parte": Object.fromEntries(CAMPI_ALLINEATI.map((campo) => [campo, [impronta(copiaDelCatalogo(ieri)[campo])]])) };
  const rows = {
    a: { ...nuovoPotere("correspondence", ieri) },
    b: { ...nuovoPotere("forces"), name: "Mio", text: "A mano." },
    c: { sphere: "entropy", name: "Fai da te", source: "catalogo", catalogId: "fai-da-te", text: "Il vecchio testo." },
    d: { ...nuovoPotere("mind", perId.get("l-ho-sentito-dire")), sphere: "mind" },
    rotta: null
  };
  const { cambi, tolti, fuori } = allineaPoteri(rows, { storia });
  assert.deepEqual(Object.keys(cambi), ["a"]);
  assert.equal(cambi.a.text, oggi.text);
  assert.deepEqual(tolti, ["c"]);
  assert.deepEqual(fuori, ["d"]);
  const update = aggiornamentoPoteri(cambi);
  assert.equal(update["flags.wod5e-mage.poteri.a.text"], oggi.text);
  assert.ok(Object.keys(update).every((key) => key.startsWith("flags.wod5e-mage.poteri.a.")));
}

// Il giro sul mondo: una scheda sola per attore (anche se torna dai token), i nomi dei tolti per l'avviso.
{
  const aggiornati = [];
  const attore = (id, rows) => ({ uuid: `Actor.${id}`, name: id, getFlag: (mod, key) => (mod === "wod5e-mage" && key === "poteri" ? rows : undefined), update: async (u) => { aggiornati.push([id, Object.keys(u).length]); } });
  const vecchia = { ...nuovoPotere("mind", perId.get("pensiero-laterale")), text: "Effetto attivo: Vecchio." };
  const storia = STORIA_POTERI["pensiero-laterale"]?.text ?? [];
  const conVecchio = storia.length ? attore("Rham", { r1: vecchia }) : null;
  const clank = attore("Clank", { r1: { sphere: "matter", name: "Fai da te", source: "catalogo", catalogId: "fai-da-te" } });
  const esito = await riallineaPoteri({ actors: [clank, clank], tokens: [{ actor: clank }] });
  assert.deepEqual(esito, { righe: 0, schede: 0, tolti: ["Fai da te"] });
  assert.deepEqual(aggiornati, []);
  if (conVecchio) {
    // «Effetto attivo: Vecchio.» non è un testo di ieri: resta (cambiato a mano); il resto si allinea se manca o era di ieri.
    const risultato = await riallineaPoteri({ actors: [conVecchio] });
    assert.equal(risultato.tolti.length, 0);
  }
}

// La scheda, il catalogo e la carta mostrano il costo e la cadenza accanto al titolo; la finestra del costo variabile c'è.
for (const tpl of ["templates/actor/parts/spheres.hbs", "templates/dialogs/catalogo-poteri.hbs", "templates/chat/potere.hbs"]) {
  assert.match(readFileSync(new URL(`../${tpl}`, import.meta.url), "utf8"), /wod5e-mage-potere-misura/, tpl);
}
assert.match(readFileSync(new URL("../templates/dialogs/potere-costo.hbs", import.meta.url), "utf8"), /name="spesa"/);
assert.match(readFileSync(new URL("../templates/actor/parts/spheres.hbs", import.meta.url), "utf8"), /\{\{#if p\.tolto\}\}<small class="wod5e-mage-potere-tipo tolto"/);
const it = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8")).WOD5E_MAGE.Poteri;
const en = JSON.parse(readFileSync(new URL("../lang/en.json", import.meta.url), "utf8")).WOD5E_MAGE.Poteri;
for (const lingua of [it, en]) {
  assert.ok(lingua.Allineati.includes("{righe}") && lingua.Allineati.includes("{schede}"));
  assert.ok(lingua.ToltiSulleSchede.includes("{nomi}"));
  assert.ok(lingua.ToltoHint.includes("{data}") && lingua.ToltoHint.includes("{motivo}"));
  assert.ok(lingua.CostoVariabile.Titolo && lingua.CostoVariabile.Paga && lingua.CostoVariabile.Hai.includes("{n}"));
  assert.ok(lingua.Carta.Costo);
}

console.log("poteri, riallineamento e rifacimento: ok");
