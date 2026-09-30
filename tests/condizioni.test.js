import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { CONDIZIONI, FAMIGLIE_CONDIZIONI, SCALE_CONDIZIONI } from "../scripts/data/condizioni.js";
import {
  aggiornamentoCondizione,
  applicaCondizione,
  condizioneItemData,
  condizioniDelTiro,
  definizioneDi,
  findCondizione,
  findCondizioneByName,
  gradoDopoIlColpo,
  prepareCondizioni,
  prepareConditionRows,
  riallineaCondizioni,
  testoCondizioniDelTiro,
  tipoDelTiro,
  toggleCondizione
} from "../scripts/condizioni.js";
import { assignCondizione, listCondizioni, prepareMasterCondizioni, selectedActors } from "../scripts/condizioni-master.js";

// La regola di base del 29/9: quattro famiglie, le scale con tre gradi, Rotto a parte, la Sventura
// ancora da riscrivere, i lievi e lo scontro. Id unici, nomi senza asterisco.
assert.deepEqual(FAMIGLIE_CONDIZIONI.map((f) => f.id), ["sensi", "corpo", "mente", "soprannaturale"]);
assert.deepEqual(SCALE_CONDIZIONI.map((s) => s.id), ["vista", "udito", "voce", "respiro", "emorragia", "avvelenamento", "rotto", "paura", "rabbia", "sonno", "controllo", "sventura", "lievi", "scontro"]);
assert.equal(CONDIZIONI.length, 46);
assert.equal(new Set(CONDIZIONI.map((entry) => entry.id)).size, CONDIZIONI.length);
assert.ok(CONDIZIONI.every((entry) => !entry.name.includes("*")));
for (const scala of ["vista", "udito", "voce", "respiro", "emorragia", "avvelenamento", "paura", "rabbia", "sonno", "controllo"]) {
  assert.deepEqual(CONDIZIONI.filter((e) => e.scale === scala).map((e) => [e.grade, e.numeral]), [[1, "I"], [2, "II"], [3, "III"]], scala);
}
// I gradi: −2, poi −2 e 8, poi il tiro fallisce; il Controllo non tocca i dadi.
const vista = CONDIZIONI.filter((e) => e.scale === "vista");
assert.deepEqual(vista.map((e) => [e.name, e.weight, e.tipi]), [["Abbagliato", "meno2", ["physical", "mental"]], ["Offuscato", "otto", ["physical", "mental"]], ["Cieco", "fallisce", ["physical", "mental"]]]);
assert.deepEqual(CONDIZIONI.filter((e) => e.scale === "controllo").map((e) => [e.name, e.weight, e.tipi]), [["Suggestionato", "scelte", []], ["Ammaliato", "scelte", []], ["Posseduto", "scelte", []]]);
// I sinonimi del grado 3 falliscono sui tiri loro (la tavola dei Sinonimi).
assert.deepEqual(["svenuto", "paralizzato", "rotto", "muto", "morente", "addormentato"].map((id) => [id, findCondizione(id).weight, findCondizione(id).tipi]), [
  ["svenuto", "fallisce", ["physical", "social", "mental"]],
  ["paralizzato", "fallisce", ["physical", "social"]],
  ["rotto", "fallisce", ["physical"]],
  ["muto", "fallisce", ["social"]],
  ["morente", "fallisce", ["physical"]],
  ["addormentato", "fallisce", ["physical", "social", "mental"]]
]);
// I lievi: −1 sul loro tipo, nella famiglia del corpo o della mente; lo scontro senza Bloccato.
assert.deepEqual(CONDIZIONI.filter((e) => e.section === "lievi").map((e) => [e.name, e.family, e.tipi.join("+")]), [
  ["Contuso", "corpo", "physical"], ["Slogato", "corpo", "physical"], ["Stanco", "corpo", "physical"],
  ["Scosso", "mente", "social+mental"], ["Emotivo", "mente", "social"], ["In ansia", "mente", "mental"], ["Sovrappensiero", "mente", "mental"], ["Confuso", "mente", "mental"]
]);
assert.deepEqual(CONDIZIONI.filter((e) => e.section === "scontro").map((e) => [e.name, e.weight]), [["Atterrato", "lieve"], ["Disarmato", "nessuno"], ["Legato", "fallisce"], ["Immobilizzato", "fallisce"], ["Stordito", "azione"]]);
assert.equal(findCondizione("bloccato"), null);
// I nomi proposti (l'asterisco della guida).
assert.deepEqual(CONDIZIONI.filter((e) => e.proposed).map((e) => e.name), ["Rauco", "Afono", "Affannato", "Soffocato", "Dissanguato", "Morente", "Intossicato", "Intimorito", "Nervoso", "Furioso", "Assonnato"]);
// Le icone: la famiglia col grado per l'oggetto, la famiglia sola per la scheda; esistono tutte.
assert.equal(findCondizione("offuscato").icon, "modules/wod5e-mage/assets/icons/condizioni/sensi-2.svg");
assert.equal(findCondizione("offuscato").familyIcon, "modules/wod5e-mage/assets/icons/condizioni/sensi.svg");
assert.equal(findCondizione("contuso").icon, "modules/wod5e-mage/assets/icons/condizioni/corpo.svg");
for (const entry of CONDIZIONI) {
  for (const path of [entry.icon, entry.familyIcon]) assert.ok(existsSync(new URL(`../${path.replace("modules/wod5e-mage/", "")}`, import.meta.url)), path);
}
for (const file of ["corpo", "sensi", "mente", "soprannaturale"].flatMap((f) => [`${f}.svg`, `${f}-1.svg`, `${f}-2.svg`, `${f}-3.svg`])) {
  const svg = readFileSync(new URL(`../assets/icons/condizioni/${file}`, import.meta.url), "utf8");
  assert.match(svg, /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 64 64"/, file);
  // Il grado in numeri romani: tante aste quante il grado, sulla targhetta.
  const grado = Number(file.match(/-(\d)\.svg$/)?.[1] ?? 0);
  assert.equal((svg.match(/height="10" fill="#f5e7b2"/g) ?? []).length, grado, file);
}

// La ricerca: per id, per nome (anche «Rotto (braccio sinistro)»), e la voce di un oggetto.
assert.equal(findCondizioneByName("in ansia").id, "in-ansia");
assert.equal(findCondizioneByName("Rotto (braccio sinistro)").id, "rotto");
assert.equal(findCondizioneByName("boh"), null);
const conBandiera = { type: "condition", name: "x", flags: { "wod5e-mage": { condizione: "offuscato" } }, system: {} };
assert.equal(definizioneDi(conBandiera).id, "offuscato");
assert.equal(definizioneDi({ type: "condition", name: "Abbagliato", system: {} }).id, "abbagliato", "senza bandiera, dal nome");
assert.equal(definizioneDi({ type: "condition", name: "Bloccato", flags: { "wod5e-mage": { condizione: "bloccato" } }, system: {} }), null, "uscita dalla lista: fuori lista");
assert.equal(definizioneDi({ type: "feature", name: "Abbagliato" }), null);

// L'oggetto che va addosso al personaggio: «condition» del sistema, coi modificatori del sistema.
const data = condizioneItemData(findCondizione("offuscato"));
assert.equal(data.type, "condition");
assert.deepEqual(data.system.bonuses.map((b) => [b.value, b.paths]), [["-2", ["physical", "mental"]]]);
assert.deepEqual(condizioneItemData(findCondizione("atterrato")).system.bonuses.map((b) => [b.value, b.paths]), [["-1", ["physical"]]]);
assert.deepEqual(condizioneItemData(findCondizione("cieco")).system.bonuses, []);
assert.equal(data.flags["wod5e-mage"].condizione, "offuscato");
assert.equal(data.system.suppressed, false);
assert.equal(data.img, "modules/wod5e-mage/assets/icons/condizioni/sensi-2.svg");
assert.match(data.system.description, /<strong>Vista II<\/strong> · Sensi/);

// Le righe accese: l'icona della famiglia col grado, il nome dell'oggetto, il peso; le fuori lista dal loro oggetto.
const rows = prepareConditionRows([
  { id: "a", type: "condition", name: "Offuscato", img: "x.svg", flags: { "wod5e-mage": { condizione: "offuscato" } }, system: { suppressed: false, bonuses: [] } },
  { id: "b", type: "condition", name: "Mia", img: "y.svg", flags: {}, system: { suppressed: true, description: "<p>Una cosa <b>mia</b></p>", bonuses: [{ value: "-1" }] } },
  { id: "r", type: "condition", name: "Rotto (braccio sinistro)", img: "z.svg", flags: { "wod5e-mage": { condizione: "rotto" } }, system: {} },
  { id: "c", type: "feature", name: "no" }
]);
assert.equal(rows.length, 3);
assert.deepEqual([rows[0].name, rows[0].dice, rows[0].numeral, rows[0].img, rows[0].scale, rows[0].list], ["Offuscato", "−2 e 8", "II", "modules/wod5e-mage/assets/icons/condizioni/sensi.svg", "Vista", true]);
assert.equal(rows[0].effect, "−2 dadi e difficoltà 8 sui tiri fisici quando miri, mentali quando cerchi o leggi.");
assert.deepEqual([rows[1].name, rows[1].dice, rows[1].what, rows[1].suppressed, rows[1].list, rows[1].img], ["Mia", "−1", "Una cosa mia", true, false, "y.svg"]);
assert.deepEqual([rows[2].name, rows[2].dice, rows[2].numeral, rows[2].condizione], ["Rotto (braccio sinistro)", "fallisce", "III", "rotto"]);
assert.equal(rows[0].condizione, "offuscato");
assert.equal(rows[1].condizione, "");

// La scelta: le quattro famiglie con le scale, poi i lievi e lo scontro.
const scelta = prepareCondizioni([{ id: "a", type: "condition", flags: { "wod5e-mage": { condizione: "offuscato" } }, system: { suppressed: true } }]);
assert.deepEqual(scelta.map((s) => s.id), ["sensi", "corpo", "mente", "soprannaturale", "lievi", "scontro"]);
assert.deepEqual(scelta[0].scale.map((s) => [s.label, s.voci.map((v) => `${v.numeral} ${v.name}`)]), [["Vista", ["I Abbagliato", "II Offuscato", "III Cieco"]], ["Udito", ["I Ovattato", "II Assordato", "III Sordo"]]]);
assert.deepEqual(scelta[4].scale.map((s) => [s.label, s.voci.length]), [["Corpo", 3], ["Mente", 5]]);
const offuscato = scelta.flatMap((s) => s.scale.flatMap((sc) => sc.voci)).find((e) => e.id === "offuscato");
assert.deepEqual([offuscato.active, offuscato.suppressed, offuscato.dice], [true, true, "−2 e 8"]);
assert.match(offuscato.title, /^Offuscato II · Vista · Vedi solo forme/);
assert.equal(scelta.flatMap((s) => s.scale.flatMap((sc) => sc.voci)).filter((e) => e.active).length, 1);

// Un personaggio finto per le prove che scrivono.
function fakeActor(name, ids) {
  const actor = { name, uuid: `Actor.${name}`, items: ids.map((id, i) => ({ id: `${name}${i}`, type: "condition", name: findCondizione(id)?.name ?? id, flags: { "wod5e-mage": { condizione: id } }, system: {} })) };
  let n = actor.items.length;
  actor.createEmbeddedDocuments = async (_t, docs) => { for (const d of docs) actor.items.push({ id: `${name}${n++}`, type: "condition", name: d.name, img: d.img, flags: d.flags, system: d.system }); };
  actor.deleteEmbeddedDocuments = async (_t, ids) => { actor.items = actor.items.filter((i) => !ids.includes(i.id)); };
  actor.updateEmbeddedDocuments = async (_t, updates) => { actor.aggiornati = updates; };
  return actor;
}
const ids = (actor) => actor.items.map((item) => item.flags["wod5e-mage"].condizione).sort();

// Accendere su una scala prende il posto dell'altro grado; un altro clic spegne.
{
  const pg = fakeActor("P", ["abbagliato", "contuso"]);
  assert.equal(await toggleCondizione(pg, findCondizione("cieco")), true);
  assert.deepEqual(ids(pg), ["cieco", "contuso"], "su una scala si sta a un gradino solo");
  assert.equal(await toggleCondizione(pg, findCondizione("slogato")), true);
  assert.deepEqual(ids(pg), ["cieco", "contuso", "slogato"], "i lievi si sommano");
  assert.equal(await toggleCondizione(pg, findCondizione("cieco")), false);
  assert.deepEqual(ids(pg), ["contuso", "slogato"]);
}

// Il colpo (il tasto «Applica» del nemico): sale di un gradino, o arriva al grado del colpo, mai sopra il 3.
assert.deepEqual([gradoDopoIlColpo(0, 1), gradoDopoIlColpo(1, 1), gradoDopoIlColpo(1, 3), gradoDopoIlColpo(2, 1), gradoDopoIlColpo(3, 1), gradoDopoIlColpo(null, 2)], [1, 2, 3, 3, 3, 2]);
{
  const bersaglio = fakeActor("B", ["abbagliato"]);
  assert.equal((await applicaCondizione(bersaglio, findCondizione("abbagliato"))).id, "offuscato");
  assert.deepEqual(ids(bersaglio), ["offuscato"]);
  assert.equal((await applicaCondizione(bersaglio, findCondizione("abbagliato"))).id, "cieco");
  assert.equal((await applicaCondizione(bersaglio, findCondizione("abbagliato"))).id, "cieco", "al 3 resta al 3");
  assert.deepEqual(ids(bersaglio), ["cieco"]);
  assert.equal((await applicaCondizione(bersaglio, findCondizione("contuso"))).id, "contuso");
  assert.equal((await applicaCondizione(bersaglio, findCondizione("contuso"))).id, "contuso", "un lieve già addosso non raddoppia");
  assert.deepEqual(ids(bersaglio), ["cieco", "contuso"]);
}

// Il tipo del tiro: dall'Attributo, o dal gruppo dell'Abilità.
assert.equal(tipoDelTiro({ attribute: { category: "social" }, skill: { id: "firearms" } }), "social");
assert.equal(tipoDelTiro({ skill: { id: "firearms" } }), "physical");
assert.equal(tipoDelTiro({ skill: { id: "k1", type: "custom" } }), "");
assert.equal(tipoDelTiro({}), "");

// Le Condizioni sul tiro: quelle del suo tipo, coi pesi; si sommano, l'8 non si somma, una fa fallire.
{
  const items = fakeActor("T", ["offuscato", "contuso", "slogato", "ammaliato", "nervoso"]).items;
  const fisico = condizioniDelTiro(items, "physical");
  assert.deepEqual(fisico.righe.map((r) => [r.name, r.peso, r.dadi, r.on]), [["Offuscato", "−2 e 8", -2, true], ["Contuso", "−1", -1, true], ["Slogato", "−1", -1, true]]);
  assert.deepEqual([fisico.dadi, fisico.otto, fisico.fallisce], [-4, true, false]);
  assert.equal(testoCondizioniDelTiro(fisico), "Offuscato −2 e 8, Contuso −1, Slogato −1");
  const sociale = condizioniDelTiro(items, "social");
  assert.deepEqual(sociale.righe.map((r) => r.name), ["Nervoso"], "l'Ammaliato non toglie dadi");
  // Tolte a mano: non pesano, e si sa chi è stata tolta.
  const tolte = condizioniDelTiro(items, "physical", { offuscato: false });
  assert.deepEqual([tolte.dadi, tolte.otto, tolte.fuori], [-2, false, ["Offuscato"]]);
  assert.deepEqual(condizioniDelTiro(items, ""), { tipo: "", righe: [], dadi: 0, otto: false, fallisce: false, perche: [], fuori: [] });
  const cieco = condizioniDelTiro(fakeActor("C", ["cieco", "stordito"]).items, "mental");
  assert.deepEqual([cieco.fallisce, cieco.perche, cieco.dadi], [true, ["Cieco"], 0]);
  const spenta = condizioniDelTiro([{ ...fakeActor("S", ["sanguinante"]).items[0], system: { suppressed: true } }], "physical");
  assert.equal(spenta.righe.length, 0, "una Condizione spenta dal sistema non pesa");
}

// Il riallineamento del 29/9: le Condizioni accese prima prendono simbolo, dadi e testo di oggi.
{
  const vecchia = { id: "v1", type: "condition", name: "Scosso", img: "modules/wod5e-mage/assets/icons/condizioni/cond_scosso.svg", flags: { "wod5e-mage": { condizione: "scosso" } }, system: { description: "<p>vecchia</p>", bonuses: [{ source: "Scosso", value: "-1", paths: ["all"] }] } };
  const update = aggiornamentoCondizione(vecchia);
  assert.equal(update.img, "modules/wod5e-mage/assets/icons/condizioni/mente.svg");
  assert.deepEqual(update["system.bonuses"].map((b) => [b.value, b.paths]), [["-1", ["social", "mental"]]]);
  assert.ok(!("name" in update), "il nome resta dell'oggetto");
  const nuova = { id: "n1", type: "condition", ...condizioneItemData(findCondizione("scosso")) };
  assert.equal(aggiornamentoCondizione(nuova), null, "già a posto");
  assert.equal(aggiornamentoCondizione({ type: "condition", name: "Bloccato", flags: { "wod5e-mage": { condizione: "bloccato" } }, system: {} }), null);
  const senzaBandiera = aggiornamentoCondizione({ type: "condition", name: "Abbagliato", img: "x", system: {} });
  assert.equal(senzaBandiera["flags.wod5e-mage.condizione"], "abbagliato");
  const attore = fakeActor("M", []);
  attore.items.push(vecchia, nuova);
  assert.equal(await riallineaCondizioni({ actors: [attore, attore], tokens: [{ actor: attore }] }), 1, "una volta per attore");
  assert.deepEqual(attore.aggiornati.map((u) => u._id), ["v1"]);
}

// La scheda: in fondo alle Risorse l'occhiello col più che apre la scelta per famiglia e per scala (con
// la lente per quelle fuori lista); sotto, una riga per Condizione accesa: l'icona col grado spegne, il
// nome apre e chiude la spiegazione (la scala, com'è, cosa fa), il peso in fondo.
const tratti = readFileSync(new URL("../templates/actor/parts/stat-condizioni.hbs", import.meta.url), "utf8");
assert.match(tratti, /wod5e-mage-condizioni-occhiello[\s\S]*<details class="wod5e-mage-condizioni-drawer">[\s\S]*Condizioni\.AddHint[\s\S]*fa-plus[\s\S]*sezione\.scale[\s\S]*wod5e-mage-cond-voce\{\{#if entry\.active\}\} lit[\s\S]*data-action="condizioneToggle" data-condizione="\{\{entry\.id\}\}"[\s\S]*entry\.numeral[\s\S]*data-action="searchItem"[\s\S]*<\/details>[\s\S]*condizioniRows[\s\S]*wod5e-mage-condizione-riga[\s\S]*wod5e-mage-condizione-spegni" data-action="condizioneToggle" data-condizione="\{\{row\.condizione\}\}" data-item-id="\{\{row\.id\}\}"[\s\S]*mask-image: url\(\{\{row\.img\}\}\)[\s\S]*row\.numeral[\s\S]*wod5e-mage-condizione-nome" data-action="condizioneApri"[\s\S]*\{\{row\.name\}\}[\s\S]*wod5e-mage-condizione-dadi">\{\{row\.dice\}\}[\s\S]*wod5e-mage-condizione-spiega[\s\S]*\{\{row\.what\}\}[\s\S]*\{\{row\.effect\}\}/);
assert.doesNotMatch(tratti, /data-kind="condizione"|wod5e-mage-condizioni-strip|wod5e-mage-condizione-on|Condizioni\.All|group\.group/);
const condCss = readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8");
// La spiegazione sta chiusa finché il nome non la apre: solo una classe sulla riga.
assert.match(condCss, /\.wod5e-mage-condizione-spiega \{[^}]*display: none;/s);
assert.match(condCss, /\.wod5e-mage-condizione-riga\.aperta \.wod5e-mage-condizione-spiega \{\s*display: block;/);
// L'icona è una maschera col colore del tema, il grado su una targhetta; il tema chiaro ha i suoi colori.
assert.match(condCss, /\.wod5e-mage \.wod5e-mage-cond-icona > i \{[^}]*background: var\(--mage-cond-segno[^}]*mask-size: contain;/s);
assert.match(condCss, /\.wod5e-mage-chiara[\s\S]{0,200}--mage-cond-segno: #3B336B;/);
const sheetJs = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheetJs, /condizioneApri: onCondizioneApri/);
assert.match(sheetJs, /tiroCondizione: onTiroCondizione/);
assert.match(sheetJs, /function onCondizioneApri[\s\S]*classList\.toggle\("aperta", open\)/);

// Il Tiro (30/9): le Condizioni del suo tipo sono righe della Riserva con la spunta, l'icona della famiglia
// col grado e il peso; la spunta le toglie e le rimette; il tiro che fallisce lo dice la riga del conto.
const tiroHbs = readFileSync(new URL("../templates/actor/parts/stat-tiro.hbs", import.meta.url), "utf8");
assert.match(tiroHbs, /wod5e-mage-tiro-voce tipo-\{\{voce\.kind\}\}\{\{#if voce\.indent\}\} rientro\{\{\/if\}\}\{\{#if voce\.off\}\} fuori\{\{\/if\}\}"[\s\S]*data-action="\{\{voce\.check\.action\}\}" data-condizione="\{\{voce\.id\}\}"[\s\S]*wod5e-mage-cond-icona wod5e-mage-tiro-voce-icona[\s\S]*voce\.numeral[\s\S]*wod5e-mage-tiro-voce-valore\{\{#if voce\.meno\}\} meno\{\{\/if\}\}[\s\S]*tiro\.conto\.fallisceTesto/);
const schedaTiro = readFileSync(new URL("../scripts/tiro-scheda.js", import.meta.url), "utf8");
assert.match(schedaTiro, /kind: "condizione", id: riga\.id, mask: riga\.icon, numeral: riga\.numeral, name: riga\.name, value: riga\.peso, meno: true, check: \{ action: "tiroCondizione", on: riga\.on \}/);

// Il Master: coi personaggi scelti, un clic accende a tutti, se l'hanno tutti spegne.
const a = fakeActor("A", ["offuscato"]);
const b = fakeActor("B", []);
const vociMaster = (actors) => prepareMasterCondizioni(actors).flatMap((s) => s.scale.flatMap((sc) => sc.voci));
const master = vociMaster([a, b]).find((e) => e.id === "offuscato");
assert.deepEqual([master.count, master.all, master.some, master.badge], [1, false, true, "1"]);
assert.equal(await assignCondizione([a, b], findCondizione("offuscato")), 2);
assert.equal(vociMaster([a, b]).find((e) => e.id === "offuscato").all, true);
assert.equal(await assignCondizione([a, b], findCondizione("offuscato")), 0);
assert.equal(a.items.length + b.items.length, 0);
assert.equal(selectedActors([{ actor: a }, { actor: a }, { actor: b }, {}]).length, 2);
assert.deepEqual(listCondizioni().find((e) => e.id === "offuscato"), { id: "offuscato", name: "Offuscato", family: "sensi", scale: "vista", grade: 2, weight: "otto", tipi: ["physical", "mental"], dice: "−2 e 8" });
const masterTemplate = readFileSync(new URL("../templates/dialogs/condizioni-master.hbs", import.meta.url), "utf8");
assert.match(masterTemplate, /data-role="targets"[\s\S]*sezione\.scale[\s\S]*data-condizione="\{\{entry\.id\}\}"[\s\S]*entry\.numeral[\s\S]*entry\.dice[\s\S]*data-role="count"/);
const macros = readFileSync(new URL("../packs/mage-macros.db", import.meta.url), "utf8").split("\n").filter(Boolean).map((line) => JSON.parse(line));
assert.equal(macros.length, 1);
assert.match(macros[0].command, /api\.condizioni\.assign\(\)/);
const manifest = JSON.parse(readFileSync(new URL("../module.json", import.meta.url), "utf8"));
assert.equal(manifest.packs.find((p) => p.name === "mage-macros").type, "Macro");
const mainJs = readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8");
assert.match(mainJs, /condizioni: Object\.freeze\(\{[\s\S]*assign: openCondizioniMaster/);
assert.match(mainJs, /CONDIZIONI_VERSIONE_SETTING[\s\S]*riallineaCondizioni\(/);
const archivi = readFileSync(new URL("../scripts/archivi.js", import.meta.url), "utf8");
assert.match(archivi, /kind === "condizione"[\s\S]*findCondizioneByName\(entry\.name\)[\s\S]*activeCondizioni\(actor\.items\)\.has\(definition\.id\)[\s\S]*toggleCondizione\(actor, definition\)/);

console.log("Condizioni tests passed.");
