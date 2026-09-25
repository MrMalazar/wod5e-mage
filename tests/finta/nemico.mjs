// La scheda del nemico nella finta Foundry (27/9): il contesto puro di
// nemico.js su un attore finto come l'Agente Grigi del mock, i sei template
// compilati con Handlebars (le quattro pagine, la testata, la vista limitata)
// e la carta del lancio; con NEMICO_PAGINA=<cartella> scrive le pagine in
// HTML, da fotografare con Playwright e confrontare col mock.
// Uso: node tests/finta/nemico.mjs   (senza il loader: nemico.js non tocca il sistema)
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Handlebars from "handlebars";

const ROOT = new URL("../../", import.meta.url);
const MODULE = "wod5e-mage";
const it = JSON.parse(readFileSync(new URL("lang/it.json", ROOT), "utf8"));
const WOD5E = { AttributesList: { Strength: "Forza" }, SkillsList: {} };

function tradotta(key) {
  const percorso = String(key).split(".");
  let nodo = percorso[0] === "WOD5E" ? WOD5E : it;
  for (const parte of percorso.slice(percorso[0] === "WOD5E" ? 1 : 0)) {
    nodo = nodo && typeof nodo === "object" ? nodo[parte] : undefined;
  }
  return typeof nodo === "string" ? nodo : String(key);
}

function format(key, hash = {}) {
  let s = tradotta(key);
  for (const [k, v] of Object.entries(hash ?? {})) s = s.replaceAll(`{${k}}`, String(v));
  return s;
}

Handlebars.registerHelper("localize", (key, options) => format(key, options?.hash ?? {}));
Handlebars.registerHelper("eq", (a, b) => a === b);
Handlebars.registerHelper("gt", (a, b) => a > b);
Handlebars.registerHelper("concat", (...args) => args.slice(0, -1).join(""));

const compila = (file) => Handlebars.compile(readFileSync(new URL(file, ROOT), "utf8"), { strict: false });
const T = {
  testa: compila("templates/nemico/testa.hbs"),
  gioco: compila("templates/nemico/gioco.hbs"),
  magick: compila("templates/nemico/magick.hbs"),
  oggetti: compila("templates/nemico/oggetti.hbs"),
  note: compila("templates/nemico/note.hbs"),
  limitata: compila("templates/nemico/limitata.hbs"),
  carta: compila("templates/chat/nemico-magick.hbs"),
  caso: compila("templates/dialogs/nemico-caso.hbs"),
  catalogo: compila("templates/dialogs/nemico-catalogo.hbs"),
  dai: compila("templates/dialogs/nemico-dai.hbs")
};

const N = await import("../../scripts/nemico.js");
const { prepareCondizioni, condizioneItemData, findCondizione } = await import("../../scripts/condizioni.js");
const { getSalute } = await import("../../scripts/salute.js");

// L'Agente Grigi del mock: Uomo in Nero, Risvegliato, Atterrato, una pistola, un tessuto balistico, la Magick con Mente e Forze.
const atterrato = { id: "c1", ...condizioneItemData(findCondizione("atterrato")) };
const items = [
  { id: "w1", uuid: "Actor.g1.Item.w1", type: "weapon", name: "Pistola", system: { weaponvalue: 4, weaponType: "ranged", description: "<p>Si nasconde</p>" }, flags: { [MODULE]: { aggravato: false, dettagli: "Un tiro di pistola" } } },
  { id: "a1", uuid: "Actor.g1.Item.a1", type: "armor", name: "Tessuto balistico", system: { armorvalue: 2, description: "<p>Non si vede</p>" }, flags: { [MODULE]: { armaturaPiena: 3, armatura: "fisica" } } },
  { id: "o1", uuid: "Actor.g1.Item.o1", type: "gear", name: "Manette", system: { description: "<p>Immobilizzato a chi non può opporsi</p>" }, flags: {} },
  atterrato
];
const flags = {
  [MODULE]: {
    salute: { pa: 0, ps: 2, ma: 0, ms: 1, extra: 0, paradosso: { p: 0, m: 0 } },
    nemico: {
      natura: "risvegliato",
      fazione: "Unione Tecnocratica",
      soglie: { physical: 3, social: 3, mental: 4 },
      casi: { k1: { nome: "Da lontano", campo: "physical", soglia: 4, sort: 1 }, k2: { nome: "Mentirgli", campo: "social", soglia: 5, sort: 2 }, k3: { nome: "Leggergli la mente", campo: "mental", soglia: 6, sort: 3 } },
      azioni: {
        "arma:w1": { nome: "Spara", riserva: "skill:firearms" },
        z1: { nome: "Afferra", riserva: "physical", condizione: "Bloccato", portata: "A contatto", sort: 2 },
        z2: { nome: "Minaccia", riserva: "social", condizione: "Scosso", limite: "una volta a bersaglio", sort: 3 },
        z3: { nome: "Al riparo", senzaTiro: true, testo: "Da lontano +2 fino al suo turno", bonusSoglia: 2, bonusA: "caso:k1", sort: 4 }
      },
      attive: { z3: true },
      effetti: { e1: { nome: "Occhiali schermati", testo: "Abbagliato e Offuscato non lo prendono", tipo: "passivo", sort: 1 }, e2: { nome: "Mai colto di sorpresa", testo: "negli agguati agisce nel primo turno come tutti", tipo: "passivo", catalogo: "x", sort: 2 }, e3: { nome: "Ultimo ordine", testo: "una volta per scena: a tracciato pieno fa un'ultima azione, poi cade", tipo: "reazione", sort: 3 } },
      magick: {
        on: true,
        arete: 2,
        domini: { mind: true, forces: true },
        tipo: "tecnomagick",
        effetti: {
          m1: { nome: "Suggestionare", breve: "inclina una scelta", soglia: 3, ambiti: { impact: 2, duration: 1 }, resiste: { attribute: "resolve", skill: "attribute:composure" }, da: "grimorio", formula: "suggestionare", come: "accidentale", dominio: "mind", sort: 1 },
          m2: { nome: "Cancellare", breve: "toglie un ricordo", testo: "Toglie a Guendalina il ricordo di quello che ha visto stanotte.", soglia: 5, ambiti: { impact: 4, precision: 1 }, resiste: { attribute: "resolve", skill: "attribute:composure" }, da: "grimorio", formula: "cancellare", come: "accidentale", dominio: "mind", sort: 2 },
          m3: { nome: "Scarica del guanto", breve: "5 danni nella stanza", soglia: 5, ambiti: { potency: 3, range: 2 }, resiste: { attribute: "dexterity", skill: "skill:athletics" }, da: "mano", come: "volgare", dominio: "forces", sort: 3 }
        }
      },
      note: { vuole: "Riportare in sede il disco rigido prima dell'alba.", molla: "Se resta solo o perde gli occhiali: si ritira e chiama la squadra." }
    }
  }
};
const actor = {
  id: "g1",
  name: "Agente Grigi",
  img: "icons/svg/mystery-man.svg",
  type: "spc",
  prototypeToken: { disposition: -1 },
  flags,
  system: {
    spcType: "mortal",
    headers: { concept: "Uomo in Nero del Nuovo Ordine Mondiale" },
    health: { max: 7 },
    biography: "<p>Un agente.</p>",
    standarddicepools: { physical: { value: 5 }, social: { value: 5 }, mental: { value: 6 } },
    exceptionaldicepools: { firearms: { value: 7, active: true }, intimidation: { value: 7, active: true }, awareness: { value: 7, active: true }, drive: { value: 3, active: false } }
  },
  getFlag: (scope, key) => flags[scope]?.[key]
};
const nomi = { intimidation: { displayName: "Intimidire" }, awareness: { displayName: "Allerta" }, athletics: { displayName: "Atletica" }, firearms: { displayName: "Armi da fuoco" }, medicine: { displayName: "Medicina" } };
const localize = (key) => tradotta(key);
const salute = getSalute(actor);
assert.deepEqual([salute.max, salute.total, salute.cells.length], [7, 3, 7], "le caselle sono system.health.max, e tre segnate");

const ctx = (stato) => ({
  ...N.prepareNemicoContext({ actor, items, salute, stato, nomi, condizioniScelta: prepareCondizioni(items), localize, format, lang: "it" }),
  locked: false,
  biografiaArricchita: "<p>Un agente.</p>",
  isGM: true,
  tabAttiva: stato?.tab ?? "gioco",
  tabs: {},
  tab: { id: "gioco", group: "primary", cssClass: "active" }
});

// --- il contesto
const c = ctx({ aperte: new Set(["arma:w1", "m2"]), cassetto: "mano", mano: { nome: "Scarica del guanto", cosa: "Una scarica dal guanto colpisce un bersaglio nella stanza.", attribute: "dexterity", skill: "skill:athletics", dominio: "forces", come: "volgare", livelli: { potency: 3, range: 2 }, lenti: {} } });
assert.equal(c.appartenenza, "Risvegliato · Unione Tecnocratica");
assert.equal(c.disposizione.id, "ostile");
assert.deepEqual(c.carte.map((carta) => [carta.id, carta.soglia.value, carta.riserva.totale, carta.riserva.cambiata]), [["physical", 3, 3, true], ["social", 3, 5, false], ["mental", 4, 6, false]], "Atterrato toglie 2 al Fisico");
const fisico = c.carte[0];
assert.deepEqual(fisico.casi.map((k) => [k.nome, k.aSoglia, k.value, k.mod]), [["Mira", false, 5, true], ["Da lontano", true, 6, true]], "la Pistola scalata in viola; Al riparo alza Da lontano a 6");
assert.equal(fisico.soglia.hint, "Contro una riserva da 6 restano 3 dadi: riesce 88 volte su 100");
assert.deepEqual(c.carte[1].casi.map((k) => [k.nome, k.value]), [["Intimidire", 7], ["Mentirgli", 5]], "il nome dal sistema quando il modulo non lo rinomina");
assert.deepEqual(c.azioni.map((a) => [a.id, a.nome, a.riserva.label, a.riserva.dadi, a.senzaTiro, a.attiva, a.daArma]), [["arma:w1", "Spara", "Mira", 5, false, false, true], ["z1", "Afferra", "Fisico", 3, false, false, false], ["z2", "Minaccia", "Sociale", 5, false, false, false], ["z3", "Al riparo", "Fisico", 3, true, true, false]]);
assert.deepEqual(c.azioni[0].breve, { pezzi: ["danno 4"], condizione: "", portata: "Un tiro di pistola" }, "l'azione nata dalla Pistola legge danno e portata dall'arma");
assert.equal(c.azioni[0].aperta, true);
assert.deepEqual(c.condizioni.map((r) => [r.nome, r.malus]), [["Atterrato", "−2 fisico"]]);
assert.deepEqual(c.armature.map((a) => [a.conto, a.pips.filter((p) => p.pieno).length]), [["2/3", 2]]);
assert.deepEqual(c.pagine.map((p) => p.id), ["gioco", "magick", "oggetti", "note"]);
assert.equal(c.pagine[1].conto, 3);
assert.equal(c.magick.dominiTesto, "Forze, Mente");
assert.deepEqual(c.magick.effetti.map((e) => [e.nome, e.soglia, e.resisteTesto, e.daLabel, e.comeLabel]), [["Suggestionare", 3, "Fermezza + Autocontrollo", "Grimorio", "Accidentale"], ["Cancellare", 5, "Fermezza + Autocontrollo", "Grimorio", "Accidentale"], ["Scarica del guanto", 5, "Destrezza + Atletica", "a mano", "Volgare"]]);
assert.equal(c.magick.effetti[2].danni, 5, "Areté 2 + Potenza 3");
assert.deepEqual([c.mano.ambiti.soglia, c.mano.ambiti.conto, c.mano.ambiti.danni], [5, "Portata 2 + Potenza 3", 5]);
assert.equal(N.resistenzaTesto({ attribute: "resolve", skill: "composure" }, { attributi: { resolve: "Fermezza", composure: "Autocontrollo" } }), "Fermezza + Autocontrollo", "un secondo Attributo senza prefisso si legge fra gli Attributi");
assert.deepEqual(c.oggettiGruppi.map((g) => [g.id, g.righe.map((r) => r.name)]), [["weapon", ["Pistola"]], ["armor", ["Tessuto balistico"]], ["gear", ["Manette"]]]);
assert.equal(c.oggetti.weapon[0].nota, "crea Spara");
assert.equal(c.saluteMax, 7);
assert.ok(c.abilitaScelta.some((s) => s.label === "Mira") && c.attributiScelta.some((a) => a.label === "Fermezza"));
assert.ok(c.condizioniNomi.includes("Bloccato") && c.condizioniScelta.length >= 5);

// --- i template
const testa = T.testa(c);
for (const marker of ['data-disposizione="ostile"', "Ostile", 'name="name" value="Agente Grigi"', 'name="system.headers.concept" value="Uomo in Nero del Nuovo Ordine Mondiale"', 'name="flags.wod5e-mage.nemico.natura"', '<option value="risvegliato" selected>Risvegliato</option>', 'name="flags.wod5e-mage.nemico.fazione" value="Unione Tecnocratica"', 'data-action="saluteCellChange" data-index="0"', 'name="system.health.max" value="7"', 'data-action="ventaglioToggle"', 'data-action="saluteDanni"', 'data-action="saluteReset"', 'data-action="armaturaColpo" data-item-id="a1"', "2/3", "Tessuto balistico", 'data-action="condizioneToggle" data-condizione="atterrato" data-item-id="c1"', "−2 fisico", 'class="wod5e-mage-nemico-pagine tabs" data-group="primary"', 'data-action="tab" data-group="primary" data-tab="gioco"', 'data-tab="magick"', '<span class="wod5e-mage-nemico-conto">3</span>', 'data-action="ritrattoCambia"', "wod5e-mage-nemico-condizioni-tendina", 'data-action="condizioneToggle" data-condizione="bloccato"', 'name="flags.wod5e-mage.nemico.manoNarratore" value="0"', "nessun ritocco"]) {
  assert.ok(testa.includes(marker), `testa: manca ${marker}`);
}
assert.ok(!testa.includes('data-action="magickAccendi"'), "con la Magick accesa niente «+ Magick»");
assert.equal((testa.match(/data-action="saluteCellChange"/g) ?? []).length, 7);

const gioco = T.gioco({ ...c, tab: { id: "gioco", group: "primary", cssClass: "active" } });
for (const marker of ['data-campo="physical"', 'name="flags.wod5e-mage.nemico.soglie.physical" value="3"', 'data-action="nemicoTira" data-riserva="physical"', "<b>3</b>", 'name="system.standarddicepools.physical.value" value="5"', 'data-action="nemicoCasoNuovo" data-campo="social"', 'data-action="nemicoTira" data-riserva="skill:firearms"', 'wod5e-mage-nemico-caso-s mod" title="Contro una riserva da 6 restano 0 dadi: riesce 0 volte su 100">soglia<b>6</b>', 'data-action="nemicoCasoTogli" data-caso="k1"', 'data-action="nemicoAzioneApri" data-azione="arma:w1"', "danno 4 · Un tiro di pistola", 'data-action="nemicoAzioneTira" data-azione="arma:w1"', 'name="flags.wod5e-mage.nemico.azioni.arma:w1.riserva"', '<option value="skill:firearms" selected>Mira</option>', 'wod5e-mage-nemico-cn">Bloccato</span> · A contatto', 'data-action="nemicoAzioneUsa" data-azione="z3"', ">Attivo<", "senza tiro", 'data-action="nemicoAzioneNuova"', 'data-action="nemicoEffettoCatalogo"', 'name="flags.wod5e-mage.nemico.effetti.e1.nome" value="Occhiali schermati"', '<option value="reazione" selected>reazione</option>', 'wod5e-mage-nemico-libro', 'data-action="nemicoEffettoTogli" data-effetto="e3"']) {
  assert.ok(gioco.includes(marker), `gioco: manca ${marker}`);
}
assert.ok(!gioco.includes('name="flags.wod5e-mage.nemico.azioni.arma:w1.danno"'), "il danno dell'azione nata dall'arma non si scrive: è dell'arma");

const magick = T.magick({ ...c, tab: { id: "magick", group: "primary", cssClass: "active" } });
for (const marker of ['data-action="nemicoArete" data-level="2"', 'wod5e-mage-nemico-d on" data-action="nemicoArete" data-level="2"', 'wod5e-mage-nemico-dominio on" data-action="nemicoDominio" data-sfera="forces"', 'wod5e-mage-nemico-pastiglia on" data-action="nemicoTipoMagick" data-tipo="tecnomagick"', 'data-action="nemicoCassetto" data-cassetto="grimorio"', 'class="attivo" data-action="nemicoCassetto" data-cassetto="mano"', 'data-action="nemicoMagickApri" data-effetto="m2"', "toglie un ricordo", "· resiste con Fermezza + Autocontrollo", "soglia<b class=\"chiaro\">5</b>", 'data-action="nemicoLancia" data-effetto="m2"', "Impatto 4 · ", "Precisione 1", 'name="flags.wod5e-mage.nemico.magick.effetti.m2.resiste.attribute"', '<option value="resolve" selected>Fermezza</option>', 'data-cassetto="mano"', 'data-mano="nome" value="Scarica del guanto"', 'wod5e-mage-nemico-pastiglia on" data-action="nemicoManoScelta" data-campo="dominio" data-value="forces"', 'data-action="nemicoLente" data-scope="potency"', 'wod5e-mage-nemico-ambito alto" data-scope="potency"', 'class="on" data-action="nemicoAmbito" data-scope="potency" data-level="3"', 'class=" zero" data-action="nemicoAmbito" data-scope="potency" data-level="0"', '<div class="wod5e-mage-nemico-grande">5</div>', "Portata 2 + Potenza 3 · danni 5 (Areté 2 + Potenza 3)", 'data-mano="impossibile"', "impresa impossibile, +5", 'data-action="nemicoManoAggiungi"']) {
  assert.ok(magick.includes(marker), `magick: manca ${marker}`);
}
assert.ok(!magick.includes('<div class="wod5e-mage-nemico-cassetto" data-cassetto="grimorio">'), "un cassetto alla volta");
const conGrimorio = T.magick({ ...ctx({ cassetto: "grimorio", cerca: "" }), tab: { id: "magick", group: "primary", cssClass: "active" } });
for (const marker of ['data-cassetto="grimorio"', 'data-nemico-cerca="grimorio"', "cerca fra le Formule di Forze, Mente…", 'data-nemico-lista="grimorio"', 'data-action="nemicoFormula" data-formula="cancellare" data-indice="0"', "wod5e-mage-nemico-bt viola\" data-action=\"nemicoFormula\" data-formula=\"cancellare\"", 'data-action="nemicoFormula" data-formula="suggestionare" data-indice="0"']) {
  assert.ok(conGrimorio.includes(marker), `grimorio: manca ${marker}`);
}
assert.ok(!conGrimorio.includes('data-formula="annientare"'), "grimorio: Annientare non si apre con Mente e Forze");
const senzaMagick = ctx({});
senzaMagick.magick = { ...senzaMagick.magick, on: false };
senzaMagick.pagine = senzaMagick.pagine.filter((p) => p.id !== "magick");
const testaSenza = T.testa(senzaMagick);
assert.ok(testaSenza.includes('data-action="magickAccendi"') && !testaSenza.includes('data-tab="magick"'), "senza Magick: «+ Magick» e niente linguetta");
assert.ok(!T.magick({ ...senzaMagick, tab: { id: "magick", group: "primary", cssClass: "" } }).includes("wod5e-mage-nemico-magick-testa"));

const oggetti = T.oggetti({ ...c, tab: { id: "oggetti", group: "primary", cssClass: "active" } });
for (const marker of ["Armi", "Protezioni", "Oggetti", 'data-action="archivioOpen" data-kind="equip-weapon" data-kinds="equip-weapon,equip-armor,equip-gear"', 'data-action="createItem" data-type="armor"', 'data-item-id="w1" data-drag="true" data-document-uuid="Actor.g1.Item.w1"', "danno 4 · Un tiro di pistola · Si nasconde", "crea Spara", "3 punti armatura · fisica · Non si vede", "armatura", 'data-action="nemicoDai" data-item-id="o1"', 'data-action="itemEdit" data-item-id="o1"', 'data-action="itemDelete" data-item-id="o1"']) {
  assert.ok(oggetti.includes(marker), `oggetti: manca ${marker}`);
}
const note = T.note({ ...c, tab: { id: "note", group: "primary", cssClass: "active" } });
for (const marker of ['name="flags.wod5e-mage.nemico.note.vuole"', "Riportare in sede il disco rigido", 'name="flags.wod5e-mage.nemico.note.molla"', '<prose-mirror name="system.biography" value="&lt;p&gt;Un agente.&lt;/p&gt;" toggled="true" compact="true">', "<p>Un agente.</p>", "Le vede solo il Narratore."]) {
  assert.ok(note.includes(marker), `note: manca ${marker}`);
}
assert.ok(!T.note({ ...c, isGM: false, tab: { id: "note", group: "primary", cssClass: "" } }).includes('name="flags.wod5e-mage.nemico.note.vuole"'), "le Note le vede solo il Narratore");
const limitata = T.limitata(c);
assert.ok(limitata.includes("<h2>Agente Grigi</h2>") && limitata.includes("Un nemico. Il Narratore sa il resto."));

// --- la carta del lancio
const effetto = c.magick.effetti[1];
const carta = T.carta({ nemico: { name: actor.name, img: actor.img }, effetto, titolo: format("WOD5E_MAGE.Nemico.LanciaSu", { effetto: effetto.nome, bersaglio: "Guendalina" }), sogliaTesto: format("WOD5E_MAGE.Nemico.SogliaCarta", { ambiti: effetto.ambitiTesto }), danniTesto: "", resisteLabel: format("WOD5E_MAGE.Nemico.ResistiCon", { tiro: effetto.resisteTesto }) });
for (const marker of ["lancia Cancellare su Guendalina", "<b>5</b><span>soglia · Impatto 4, Precisione 1</span>", "Toglie a Guendalina il ricordo", "Resiste con Fermezza + Autocontrollo", "Accidentale · Mente"]) {
  assert.ok(carta.includes(marker), `carta: manca ${marker}`);
}
// Il conto del tiro di Spara su Guendalina: Mira 7, −2 Atterrato, 5 dadi, riesce dal 6.
const conto = N.contoDelTiro({ nome: "Spara", riserva: c.azioni[0].riserva, soglia: 0, bersaglio: { uuid: "Actor.pg", name: "Guendalina" }, danno: 4, aggravato: false, localize, format });
assert.deepEqual([conto.titolo, conto.conto, conto.dadi, conto.esito], ["Spara · su Guendalina", "Mira 7 -2 Atterrato = 5 dadi · riesce dal 6", 5, "danno 4 Superficiali"]);

// La mano del Narratore (Blue, 27/9): +2 sulla scheda entra in ogni riserva, nei casi a dadi, nelle azioni e nel conto della carta.
const attoreConMano = { ...actor, getFlag: (scope, key) => (scope === MODULE && key === "nemico" ? { ...flags[MODULE].nemico, manoNarratore: 2 } : flags[scope]?.[key]) };
const conMano = N.prepareNemicoContext({ actor: attoreConMano, items, salute, stato: {}, nomi, condizioniScelta: prepareCondizioni(items), localize, format, lang: "it" });
assert.deepEqual(conMano.carte.map((carta) => [carta.id, carta.riserva.totale, carta.riserva.cambiata]), [["physical", 5, true], ["social", 7, true], ["mental", 8, true]], "la mano entra nelle tre riserve");
assert.deepEqual(conMano.carte[0].casi.map((k) => [k.nome, k.value]), [["Mira", 7], ["Da lontano", 6]], "nei casi a dadi sì, nelle soglie no");
assert.equal(conMano.carte[0].riserva.hint, "Tira Fisico: 5 -2 Atterrato +2 Mano del Narratore = 5 dadi");
assert.deepEqual([conMano.manoNarratore.value, conMano.manoNarratore.segno, conMano.manoNarratore.on, conMano.manoNarratore.meno, conMano.manoNarratore.dadiTesto], [2, "+2", true, false, "+2 dadi a ogni tiro"]);
const contoMano = N.contoDelTiro({ nome: "Spara", riserva: conMano.azioni[0].riserva, soglia: 0, localize, format });
assert.deepEqual([contoMano.conto, contoMano.dadi], ["Mira 7 -2 Atterrato +2 Mano del Narratore = 7 dadi · riesce dal 6", 7]);
const testaConMano = T.testa({ ...conMano, locked: false, isGM: true, tabAttiva: "gioco", tabs: {}, tab: { id: "gioco", group: "primary", cssClass: "active" } });
for (const marker of ['name="flags.wod5e-mage.nemico.manoNarratore" value="2"', 'wod5e-mage-nemico-mano-segno piu">+2 dadi a ogni tiro</b>']) {
  assert.ok(testaConMano.includes(marker), `testa con la mano: manca ${marker}`);
}

// --- i dialoghi
assert.ok(T.caso({ abilita: c.abilitaScelta }).includes('<option value="firearms">Mira</option>'));
assert.ok(T.catalogo({ poteri: [{ id: "p1", name: "Occhio di lince", breve: "vede", testo: "vede", sfere: [], tipoLabel: "passivo", search: "occhio" }] }).includes('data-role="nemicoCatalogoAggiungi" data-potere="p1"'));
assert.ok(T.dai({ personaggi: [{ id: "a", name: "Guendalina" }] }).includes('<option value="a">Guendalina</option>'));

if (process.env.NEMICO_PAGINA) {
  const { mkdirSync, writeFileSync } = await import("node:fs");
  const dir = process.env.NEMICO_PAGINA;
  mkdirSync(dir, { recursive: true });
  const pagina = (nome, corpo, tab) => writeFileSync(`${dir}/${nome}.html`, T.testa({ ...c, tabAttiva: tab }) + corpo);
  pagina("gioco", gioco, "gioco");
  pagina("magick", magick, "magick");
  pagina("magick-grimorio", conGrimorio, "magick");
  pagina("oggetti", oggetti, "oggetti");
  pagina("note", note, "note");
  writeFileSync(`${dir}/carta.html`, carta);
  console.log(`pagine scritte in ${dir}`);
}
console.log("finta Foundry, la scheda del nemico: ok");
