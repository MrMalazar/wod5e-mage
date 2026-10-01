// La scheda del nemico nella finta Foundry (27/9; rifatta l'1/10): il contesto
// puro di nemico.js su un attore finto, l'Agente Grigi, e i template compilati
// con Handlebars (la testata, le tre pagine, la vista limitata) nei due modi,
// Gioca e Scrivi; poi lo standard delle Nature su tre nemici brevi (un
// vampiro, un cacciatore, un dormiente) e la carta del lancio. Con
// NEMICO_PAGINA=<cartella> scrive le pagine in HTML, da fotografare con
// Playwright e confrontare col mock (docs/mock_scheda_nemico_1-10.html).
// Uso: node tests/finta/nemico.mjs   (senza il loader: nemico.js non tocca il sistema)
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Handlebars from "handlebars";

const ROOT = new URL("../../", import.meta.url);
const MODULE = "wod5e-mage";
const it = JSON.parse(readFileSync(new URL("lang/it.json", ROOT), "utf8"));
const WOD5E = { AttributesList: { Strength: "Forza" }, SkillsList: {}, Edit: "Modifica" };

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
  oggetti: compila("templates/nemico/oggetti.hbs"),
  note: compila("templates/nemico/note.hbs"),
  limitata: compila("templates/nemico/limitata.hbs"),
  carta: compila("templates/chat/nemico-magick.hbs"),
  caso: compila("templates/dialogs/nemico-caso.hbs"),
  dai: compila("templates/dialogs/nemico-dai.hbs")
};

const N = await import("../../scripts/nemico.js");
const { prepareCondizioni, condizioneItemData, findCondizione } = await import("../../scripts/condizioni.js");
const { getSalute } = await import("../../scripts/salute.js");

const localize = (key) => tradotta(key);
const nomi = { intimidation: { displayName: "Intimidire" }, awareness: { displayName: "Allerta" }, athletics: { displayName: "Atletica" }, firearms: { displayName: "Armi da fuoco" }, medicine: { displayName: "Medicina" } };

/** Un attore finto dai suoi pezzi: la bandiera del nemico, la Salute, il sistema, la disposizione del prototipo. */
function attore({ id = "g1", name = "", nemico = {}, salute = null, system = {}, disposition = -1 } = {}) {
  const flags = { [MODULE]: { salute: salute ?? { pa: 0, ps: 0, ma: 0, ms: 0, extra: 0, paradosso: { p: 0, m: 0 } }, nemico } };
  return {
    id,
    name,
    img: "icons/svg/mystery-man.svg",
    type: "spc",
    prototypeToken: { disposition },
    flags,
    system: { spcType: "mortal", headers: { concept: "" }, health: { max: 5 }, biography: "", standarddicepools: { physical: { value: 1 }, social: { value: 1 }, mental: { value: 1 } }, exceptionaldicepools: {}, ...system },
    getFlag: (scope, key) => flags[scope]?.[key]
  };
}

/** Il contesto come lo prepara la scheda: nemico.js più quello che aggiunge la finestra. */
function contesto(actor, items = [], stato = {}, extra = {}) {
  return {
    ...N.prepareNemicoContext({ actor, items, salute: getSalute(actor), stato, nomi, condizioniScelta: prepareCondizioni(items), localize, format, lang: "it", ...extra }),
    biografiaArricchita: actor.system.biography,
    isGM: true,
    tabAttiva: stato?.tab ?? "gioco",
    tabs: {},
    tab: { id: stato?.tab ?? "gioco", group: "primary", cssClass: "active" }
  };
}

// Handlebars scrive l'apostrofo e l'uguale come entità: per i confronti si rileggono come sono.
const leggibile = (html) => String(html).replaceAll("&#x27;", "'").replaceAll("&#x3D;", "=");
const conTutti = (html, markers, dove) => { const testo = leggibile(html); for (const marker of markers) assert.ok(testo.includes(marker), `${dove}: manca ${marker}`); };
const senza = (html, markers, dove) => { const testo = leggibile(html); for (const marker of markers) assert.ok(!testo.includes(marker), `${dove}: non ci dev'essere ${marker}`); };

// L'Agente Grigi: Uomo in Nero, Risvegliato, Sanguinante (il −2 fisico di Emorragia I), una pistola, un tessuto
// balistico, la Magick con Mente e Forze, un potere del manuale (Da qualche parte) e due effetti scritti a mano.
const sanguinante = { id: "c1", ...condizioneItemData(findCondizione("sanguinante")) };
const items = [
  { id: "w1", uuid: "Actor.g1.Item.w1", type: "weapon", name: "Pistola", system: { weaponvalue: 4, weaponType: "ranged", description: "<p>Si nasconde</p>" }, flags: { [MODULE]: { aggravato: false, dettagli: "Un tiro di pistola" } } },
  { id: "a1", uuid: "Actor.g1.Item.a1", type: "armor", name: "Tessuto balistico", system: { armorvalue: 2, description: "<p>Non si vede</p>" }, flags: { [MODULE]: { armaturaPiena: 3, armatura: "fisica" } } },
  { id: "o1", uuid: "Actor.g1.Item.o1", type: "gear", name: "Manette", system: { description: "<p>Immobilizzato a chi non può opporsi</p>" }, flags: {} },
  sanguinante
];
const nemicoGrigi = {
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
  effetti: {
    e1: { nome: "Occhiali schermati", testo: "Abbagliato e Offuscato non lo prendono", tipo: "passivo", sort: 1 },
    e2: { nome: "Da qualche parte", testo: "testo copiato il giorno della presa", tipo: "attivo", catalogo: "da-qualche-parte", sort: 2 },
    e3: { nome: "Ultimo ordine", testo: "una volta per scena: a tracciato pieno fa un'ultima azione, poi cade", tipo: "reazione", sort: 3 },
    e4: { nome: "Un potere tolto", testo: "il testo copiato resta", tipo: "passivo", catalogo: "non-c-e-piu", sort: 4 }
  },
  magick: {
    on: true,
    arete: 2,
    domini: { mind: true, forces: true },
    tipo: "tecnomagick",
    effetti: {
      m1: { nome: "Suggestionare", breve: "inclina una scelta", soglia: 3, ambiti: { impact: 2, duration: 1 }, resiste: { attribute: "resolve", skill: "attribute:composure" }, da: "grimorio", formula: "suggestionare", come: "accidentale", dominio: "mind", sort: 1 },
      m2: { nome: "Cancellare", breve: "toglie un ricordo", testo: "Toglie a Guendalina il ricordo di quello che ha visto stanotte.", soglia: 5, ambiti: { impact: 4, precision: 1 }, resiste: { attribute: "resolve", skill: "attribute:composure" }, da: "grimorio", formula: "cancellare", come: "accidentale", dominio: "mind", sort: 2 },
      m3: { nome: "Scarica del guanto", breve: "5 danni nella stanza", soglia: 5, ambiti: { potency: 3, range: 2 }, resiste: {}, da: "mano", come: "volgare", dominio: "forces", sort: 3 }
    }
  },
  note: { vuole: "Riportare in sede il disco rigido prima dell'alba.", molla: "Se resta solo o perde gli occhiali: si ritira e chiama la squadra." }
};
const sistemaGrigi = {
  spcType: "mortal",
  headers: { concept: "Uomo in Nero del Nuovo Ordine Mondiale" },
  health: { max: 7 },
  biography: "<p>Un agente.</p>",
  standarddicepools: { physical: { value: 5 }, social: { value: 5 }, mental: { value: 6 } },
  exceptionaldicepools: { firearms: { value: 7, active: true }, intimidation: { value: 7, active: true }, awareness: { value: 7, active: true }, drive: { value: 3, active: false } }
};
const saluteGrigi = { pa: 0, ps: 2, ma: 0, ms: 1, extra: 0, paradosso: { p: 0, m: 0 } };
const grigi = (nemico = {}) => attore({ name: "Agente Grigi", nemico: { ...nemicoGrigi, ...nemico }, salute: saluteGrigi, system: sistemaGrigi });
const actor = grigi();
const salute = getSalute(actor);
assert.deepEqual([salute.max, salute.total, salute.cells.length], [7, 3, 7], "le caselle sono system.health.max, e tre segnate");

// --- il contesto, in Gioca (un nemico già scritto si apre in Gioca)
const aperte = new Set(["arma:w1", "m2", "effetto:e2", "effetto:e3"]);
const c = contesto(actor, items, { aperte });
assert.deepEqual([c.modo, c.scrivi, c.puoScrivere, c.modi.map((m) => [m.id, m.label, m.on])], ["gioca", false, true, [["gioca", "Gioca", true], ["scrivi", "Scrivi", false]]]);
assert.equal(c.appartenenza, "Risvegliato · Unione Tecnocratica");
assert.deepEqual([c.disposizione.id, c.disposizione.icona, c.disposizione.label], ["ostile", "fa-solid fa-skull", "Ostile"]);
assert.deepEqual(c.disposizioni.map((d) => [d.value, d.label, d.on]), [[-1, "Ostile", true], [0, "Neutrale", false], [1, "Amichevole", false], [-2, "Segreto", false]]);
assert.deepEqual(c.carte.map((carta) => [carta.id, carta.soglia.value, carta.riserva.totale, carta.riserva.cambiata, carta.riserva.verso]), [["physical", 3, 3, true, "giu"], ["social", 3, 5, false, ""], ["mental", 4, 6, false, ""]], "Sanguinante toglie 2 al Fisico, e la freccia lo dice");
const fisico = c.carte[0];
assert.deepEqual(fisico.casi.map((k) => [k.nome, k.aSoglia, k.value, k.mod, k.verso ?? ""]), [["Mira", false, 5, true, "giu"], ["Da lontano", true, 6, true, ""]], "la Mira scalata; Al riparo alza Da lontano a 6");
assert.equal(fisico.soglia.hint, "Contro una riserva da 6 restano 3 dadi: riesce 88 volte su 100");
assert.deepEqual(c.carte[1].casi.map((k) => [k.nome, k.value]), [["Intimidire", 7], ["Mentirgli", 5]], "il nome dal sistema quando il modulo non lo rinomina");
assert.deepEqual(c.azioni.map((a) => [a.id, a.nome, a.riserva.label, a.riserva.dadi, a.riserva.verso, a.senzaTiro, a.attiva, a.daArma]), [["arma:w1", "Spara", "Mira", 5, "giu", false, false, true], ["z1", "Afferra", "Fisico", 3, "giu", false, false, false], ["z2", "Minaccia", "Sociale", 5, "", false, false, false], ["z3", "Al riparo", "Fisico", 3, "giu", true, true, false]]);
assert.deepEqual(c.azioni[0].breve, { pezzi: ["danno 4"], condizione: "", portata: "Un tiro di pistola" }, "l'azione nata dalla Pistola legge danno e portata dall'arma");
assert.deepEqual(c.condizioni.map((r) => [r.nome, r.malus]), [["Sanguinante", "−2 fisico"]]);
// I punti dell'armatura si cliccano: 2 su 3; il clic sul secondo (l'ultimo pieno) lo toglie, sul terzo lo riempie.
assert.deepEqual(c.armature.map((a) => [a.conto, a.pips.map((p) => [p.n, p.pieno, p.punti])]), [["2/3", [[1, true, 1], [2, true, 1], [3, false, 3]]]]);
// La Magick non ha più una pagina sua.
assert.deepEqual(c.pagine.map((p) => p.id), ["gioco", "oggetti", "note"]);
// Il blocco della Natura: per il Risvegliato la Magick con l'Areté.
assert.deepEqual([c.blocco.tipo, c.blocco.titolo, c.blocco.magick, c.blocco.eredita, c.blocco.punteggio.on, c.blocco.punteggio.nome, c.blocco.punteggio.valore, c.blocco.punteggio.campo], ["magick", "Magick", true, false, true, "Areté", 2, "magick.arete"]);
// I poteri del manuale stanno nel blocco, gli effetti scritti a mano negli Effetti.
assert.deepEqual(c.effetti.map((e) => [e.id, e.icona, e.aperta]), [["e1", "", false], ["e3", "fa-solid fa-reply", true]]);
assert.deepEqual(c.poteri.map((p) => [p.id, p.catalogo, Boolean(p.potere), p.aperta]), [["e2", "da-qualche-parte", true, true], ["e4", "non-c-e-piu", false, false]]);
const daQualcheParte = c.poteri[0].potere;
assert.deepEqual([daQualcheParte.nome, daQualcheParte.grado, daQualcheParte.sfereTesto, daQualcheParte.attivo.misura, daQualcheParte.passivo.misura], ["Da qualche parte", 1, "Corrispondenza", "1 Quintessenza", "Sempre"]);
assert.ok(daQualcheParte.attivo.voci[0].testo.startsWith("Ti chiudi in una piega dello spazio") && daQualcheParte.passivo.voci[0].testo.startsWith("Sei sempre un po' altrove"));
assert.equal(c.magick.dominiTesto, "Forze, Mente");
// Suggestionare e Cancellare sono scritti prima del 29/9, con l'Impatto: la soglia si rifà sugli Ambiti che restano.
assert.deepEqual(c.magick.effetti.map((e) => [e.nome, e.soglia, e.resisteTesto, e.daLabel, e.comeLabel, e.sfera?.id]), [["Suggestionare", 1, "Fermezza + Autocontrollo", "Grimorio", "Accidentale", "mind"], ["Cancellare", 1, "Fermezza + Autocontrollo", "Grimorio", "Accidentale", "mind"], ["Scarica del guanto", 5, "", "a mano", "Volgare", "forces"]]);
assert.equal(c.magick.effetti[2].danni, 5, "Areté 2 + Potenza 3");
assert.equal(N.resistenzaTesto({ attribute: "resolve", skill: "composure" }, { attributi: { resolve: "Fermezza", composure: "Autocontrollo" } }), "Fermezza + Autocontrollo", "un secondo Attributo senza prefisso si legge fra gli Attributi");
assert.deepEqual(c.oggettiGruppi.map((g) => [g.id, g.righe.map((r) => r.name)]), [["weapon", ["Pistola"]], ["armor", ["Tessuto balistico"]], ["gear", ["Manette"]]]);
assert.equal(c.oggetti.weapon[0].nota, "crea Spara");
assert.equal(c.saluteMax, 7);
assert.ok(c.abilitaScelta.some((s) => s.label === "Mira") && c.attributiScelta.some((a) => a.label === "Fermezza"));
assert.ok(c.condizioniNomi.includes("Sanguinante") && !c.condizioniNomi.includes("Bloccato") && c.condizioniScelta.length === 6);
// La Condizione di un'azione che non è più in lista (Bloccato, dal 29/9) resta scritta e la tendina la mostra.
assert.deepEqual(c.azioni.map((a) => [a.id, a.condizioneFuori]), [["arma:w1", false], ["z1", true], ["z2", false], ["z3", false]]);
assert.deepEqual(c.condizioniGruppi.map((g) => g.label), ["Sensi", "Corpo", "Mente", "Soprannaturale", "Lievi", "Scontro"]);

// --- Gioca: la testata è testo fermo, lo stato si clicca
const testa = T.testa(c);
conTutti(testa, [
  'data-disposizione="ostile" data-modo="gioca"',
  '<h1 class="wod5e-mage-nemico-nome">Agente Grigi</h1>',
  '<p class="wod5e-mage-nemico-concetto">Uomo in Nero del Nuovo Ordine Mondiale</p>',
  '<span class="wod5e-mage-nemico-disp"><i class="fa-solid fa-skull" aria-hidden="true"></i>Ostile</span>',
  '<span class="wod5e-mage-nemico-appartenenza">Risvegliato · Unione Tecnocratica</span>',
  'wod5e-mage-nemico-modo on" data-action="nemicoModo" data-modo="gioca"',
  'wod5e-mage-nemico-modo" data-action="nemicoModo" data-modo="scrivi"',
  'data-action="saluteCellChange" data-index="0"',
  '<span class="wod5e-mage-nemico-conto">3/7</span>',
  'data-action="ventaglioToggle"', 'data-action="saluteDanni"', 'data-action="saluteRiposo"', 'data-action="saluteReset"',
  'wod5e-mage-nemico-punto on" data-action="nemicoArmatura" data-item-id="a1" data-punti="1" aria-label="Tessuto balistico: punto 2 di 3" aria-pressed="true"',
  'wod5e-mage-nemico-punto" data-action="nemicoArmatura" data-item-id="a1" data-punti="3" aria-label="Tessuto balistico: punto 3 di 3" aria-pressed="false"',
  '<span class="wod5e-mage-nemico-conto">2/3</span>',
  'data-action="condizioneToggle" data-condizione="sanguinante" data-item-id="c1"', "−2 fisico",
  "wod5e-mage-nemico-condizioni-tendina", 'data-action="condizioneToggle" data-condizione="offuscato"',
  '<b class="wod5e-mage-cond-grado">II</b><span>Offuscato</span>',
  'wod5e-mage-cond-voce lit" data-action="condizioneToggle" data-condizione="sanguinante"',
  'class="wod5e-mage-nemico-pagine tabs" data-group="primary"',
  'wod5e-mage-nemico-pagina active" data-action="tab" data-group="primary" data-tab="gioco"', 'data-tab="oggetti"', 'data-tab="note"'
], "testa, Gioca");
senza(testa, ['name="name"', 'name="system.headers.concept"', 'name="flags.wod5e-mage.nemico.natura"', 'name="system.health.max"', 'data-action="ritrattoCambia"', 'data-tab="magick"', 'data-action="magickAccendi"', "manoNarratore"], "testa, Gioca");
assert.equal((testa.match(/data-action="saluteCellChange"/g) ?? []).length, 7);
assert.equal((testa.match(/data-action="nemicoArmatura"/g) ?? []).length, 3);
// Chi non può scrivere non ha il tasto dei modi.
senza(T.testa(contesto(actor, items, {}, { puoScrivere: false })), ['data-action="nemicoModo"'], "testa, chi guarda");

// --- Gioca: In gioco. Le soglie ferme, le riserve che tirano, le righe che si aprono, il blocco della Natura.
const gioco = T.gioco(c);
conTutti(gioco, [
  'data-campo="physical"',
  '<span class="wod5e-mage-nemico-soglia" title="Contro una riserva da 6 restano 3 dadi: riesce 88 volte su 100">3</span>',
  'data-action="nemicoTira" data-riserva="physical" title="Tira Fisico: 5 -2 Sanguinante = 3 dadi" aria-label="Tira Fisico: 5 -2 Sanguinante = 3 dadi"><i class="fa-solid fa-arrow-down" aria-hidden="true"></i><b>3</b></button>',
  'data-action="nemicoTira" data-riserva="social" title="Tira Sociale: 5 dadi" aria-label="Tira Sociale: 5 dadi"><b>5</b></button>',
  'wod5e-mage-nemico-tira piccolo" data-action="nemicoTira" data-riserva="skill:firearms"',
  '<span class="wod5e-mage-nemico-soglia piccola mod" title="Contro una riserva da 6 restano 0 dadi: riesce 0 volte su 100">6</span>',
  'data-action="nemicoMano" data-delta="-1" aria-label="Mano del Narratore: un dado in meno"', "<b>0</b>", 'data-action="nemicoMano" data-delta="1"',
  'wod5e-mage-nemico-pastiglia" data-action="nemicoEffettoApri" data-effetto="e1" aria-expanded="false" title="passivo">Occhiali schermati</button>',
  'wod5e-mage-nemico-pastiglia on" data-action="nemicoEffettoApri" data-effetto="e3" aria-expanded="true" title="reazione"><i class="fa-solid fa-reply" aria-hidden="true"></i>Ultimo ordine</button>',
  "una volta per scena: a tracciato pieno fa un'ultima azione, poi cade",
  'data-action="nemicoAzioneApri" data-azione="arma:w1" aria-expanded="true"', "<b>Spara</b>", ">Pistola</span>",
  '<span class="wod5e-mage-nemico-dato">danno <b>4</b></span>',
  'wod5e-mage-nemico-tira stretto" data-action="nemicoAzioneTira" data-azione="arma:w1"',
  "<p>danno 4 · Un tiro di pistola</p>", "tira Mira",
  'wod5e-mage-nemico-usa on" data-action="nemicoAzioneUsa" data-azione="z3"', ">Attivo<",
  'data-blocco="magick"', '<h3 class="wod5e-mage-nemico-titolo">Magick</h3>',
  '<span class="wod5e-mage-nemico-tenue">Areté</span><b>2</b>', "<span>Tecnomagick</span>",
  'modules/wod5e-mage/assets/icons/sheet/forces.png" alt=""></span>Forze</span>',
  'data-action="nemicoMagickApri" data-effetto="m2" aria-expanded="true"',
  '<span class="wod5e-mage-nemico-disco on" title="Mente"><img src="modules/wod5e-mage/assets/icons/sheet/mind.png" alt="Mente"></span><b>Cancellare</b>',
  '<span class="wod5e-mage-nemico-dato">soglia <b class="oro">1</b></span>',
  'data-action="nemicoLancia" data-effetto="m2" title="Lancia Cancellare: la carta in chat con la soglia e il tiro di resistenza">Lancia</button>',
  "<p>toglie un ricordo</p>", "Accidentale · resiste con Fermezza + Autocontrollo",
  '<h4 class="wod5e-mage-nemico-sottotitolo">Poteri</h4>',
  'wod5e-mage-nemico-pastiglia on" data-action="nemicoEffettoApri" data-effetto="e2" aria-expanded="true">Da qualche parte</button>',
  "Grado 1 · Corrispondenza", "<b>Effetto attivo<small>1 Quintessenza</small></b>", "Ti chiudi in una piega dello spazio", "<b>Effetto passivo<small>Sempre</small></b>",
  'data-action="nemicoEffettoApri" data-effetto="e4" aria-expanded="false">Un potere tolto</button>'
], "gioco, Gioca");
// In Gioca niente si riscrive: nessun campo col nome, nessun «aggiungi», nessun cassetto.
senza(gioco, ['name="flags.', 'name="system.', 'data-action="nemicoCasoNuovo"', 'data-action="nemicoAzioneNuova"', 'data-action="nemicoEffettoNuovo"', 'data-action="nemicoEffettoCatalogo"', 'data-action="nemicoDominio"', 'data-action="nemicoCassetto"', 'data-action="nemicoAzioneTogli"', "testo copiato il giorno della presa"], "gioco, Gioca");
// Un potere che non è più nel catalogo: resta il testo copiato.
conTutti(T.gioco(contesto(actor, items, { aperte: new Set(["effetto:e4"]) })), ["Non è più nel catalogo: resta il testo copiato", "<p>il testo copiato resta</p>"], "gioco, potere tolto");

// --- Scrivi: la testata è carta
const scrivi = grigi({ modo: "scrivi" });
const cs = contesto(scrivi, items, { aperte: new Set(["arma:w1", "z3", "m3", "effetto:e1", "effetto:e2"]), cassetto: "mano", mano: { nome: "Scarica del guanto", cosa: "Una scarica dal guanto colpisce un bersaglio nella stanza.", attribute: "dexterity", skill: "skill:athletics", dominio: "forces", come: "volgare", livelli: { potency: 3, range: 2 }, lenti: {} } });
assert.deepEqual([cs.modo, cs.scrivi], ["scrivi", true]);
assert.deepEqual([cs.mano.ambiti.soglia, cs.mano.ambiti.conto, cs.mano.ambiti.danni], [5, "Portata 2 + Potenza 3", 5]);
const testaScrivi = T.testa(cs);
conTutti(testaScrivi, [
  'data-modo="scrivi"', 'data-action="ritrattoCambia"',
  'name="name" value="Agente Grigi"', 'name="system.headers.concept" value="Uomo in Nero del Nuovo Ordine Mondiale"',
  "<select data-nemico-disposizione>", '<option value="-1" selected>Ostile</option>', '<option value="-2" >Segreto</option>',
  'name="flags.wod5e-mage.nemico.natura"', '<option value="sonnambulo" >Sonnambulo</option>', '<option value="risvegliato" selected>Risvegliato</option>',
  'name="flags.wod5e-mage.nemico.fazione" value="Unione Tecnocratica"',
  'name="system.health.max" value="7"',
  'wod5e-mage-nemico-modo on" data-action="nemicoModo" data-modo="scrivi"',
  'data-action="saluteCellChange" data-index="6"', 'data-action="nemicoArmatura" data-item-id="a1"'
], "testa, Scrivi");
senza(testaScrivi, ['<h1 class="wod5e-mage-nemico-nome">', 'data-action="ventaglioToggle"'], "testa, Scrivi");

// --- Scrivi: In gioco. Un numero, una casella; una matita per riga; un posto vuoto per lista.
const giocoScrivi = T.gioco(cs);
conTutti(giocoScrivi, [
  'wod5e-mage-nemico-numeri scrivi"',
  'name="flags.wod5e-mage.nemico.soglie.physical" value="3"', 'name="system.standarddicepools.physical.value" value="5"',
  'name="system.exceptionaldicepools.firearms.value" value="7"', 'data-action="nemicoCasoTogli" data-caso="skill:firearms"',
  'name="flags.wod5e-mage.nemico.casi.k1.nome" value="Da lontano"', 'name="flags.wod5e-mage.nemico.casi.k1.soglia" value="4"', 'data-action="nemicoCasoTogli" data-caso="k1"',
  'data-action="nemicoCasoNuovo" data-campo="social"',
  'data-action="nemicoEffettoNuovo"',
  'name="flags.wod5e-mage.nemico.effetti.e1.nome" value="Occhiali schermati"', '<option value="passivo" selected>passivo</option>', 'data-action="nemicoEffettoTogli" data-effetto="e1"',
  '<span class="wod5e-mage-nemico-dato">dadi <b>7</b></span>', 'wod5e-mage-nemico-matita" data-action="nemicoAzioneApri" data-azione="arma:w1"',
  'name="flags.wod5e-mage.nemico.azioni.arma:w1.riserva"', '<option value="skill:firearms" selected>Mira</option>', "Nasce da",
  'name="flags.wod5e-mage.nemico.azioni.z3.bonusSoglia" value="2"', '<option value="caso:k1" selected>Da lontano</option>', 'data-action="nemicoAzioneTogli" data-azione="z3"',
  'data-action="nemicoAzioneNuova"',
  'name="flags.wod5e-mage.nemico.magick.arete" value="2" min="1" max="5"', 'name="flags.wod5e-mage.nemico.magick.tipo"', '<option value="tecnomagick" selected>Tecnomagick</option>',
  'wod5e-mage-nemico-disco on" data-action="nemicoDominio" data-sfera="forces" title="Forze" aria-label="Forze" aria-pressed="true"',
  'wod5e-mage-nemico-disco" data-action="nemicoDominio" data-sfera="time" title="Tempo" aria-label="Tempo" aria-pressed="false"',
  'name="flags.wod5e-mage.nemico.magick.effetti.m3.soglia" value="5"',
  'wod5e-mage-nemico-manca" data-action="nemicoMagickApri" data-effetto="m3"', "resistenza</button>",
  'name="flags.wod5e-mage.nemico.magick.effetti.m3.nome" value="Scarica del guanto"', 'name="flags.wod5e-mage.nemico.magick.effetti.m3.breve" value="5 danni nella stanza"',
  'name="flags.wod5e-mage.nemico.magick.effetti.m3.resiste.attribute"', 'data-action="nemicoMagickTogli" data-effetto="m3"', "Volgare · Ambiti: Potenza 3 · Portata 2 · a mano · danno 5",
  'wod5e-mage-nemico-aggiungi on" data-action="nemicoCassetto" data-cassetto="mano" aria-expanded="true"',
  'wod5e-mage-nemico-pastiglia on" data-action="nemicoCassettoVia" data-cassetto="mano" aria-pressed="true"', 'data-action="nemicoCassettoVia" data-cassetto="grimorio" aria-pressed="false"',
  'data-mano="nome" value="Scarica del guanto"',
  'wod5e-mage-nemico-pastiglia on" data-action="nemicoManoScelta" data-campo="dominio" data-value="forces"',
  'data-action="nemicoLente" data-scope="potency"', 'wod5e-mage-nemico-ambito alto" data-scope="potency"',
  'class="on" data-action="nemicoAmbito" data-scope="potency" data-level="3"', 'class=" zero" data-action="nemicoAmbito" data-scope="potency" data-level="0"',
  '<b class="wod5e-mage-nemico-grande">5</b>', "Portata 2 + Potenza 3 · danni 5 (Areté 2 + Potenza 3)",
  'data-mano="impossibile"', "impresa impossibile, +5", 'data-action="nemicoManoAggiungi"',
  'data-action="nemicoEffettoCatalogo"', 'data-action="nemicoEffettoTogli" data-effetto="e2"', "Togli il potere"
], "gioco, Scrivi");
// In Scrivi non si tira e non si lancia; il danno dell'azione nata dall'arma non si scrive (è dell'arma); la mano del Narratore è di Gioca.
senza(giocoScrivi, ['data-action="nemicoTira"', 'data-action="nemicoAzioneTira"', 'data-action="nemicoLancia"', 'data-action="nemicoMano"', 'name="flags.wod5e-mage.nemico.azioni.arma:w1.danno"', 'data-nemico-cerca="grimorio"', 'data-action="magickSpegni"'], "gioco, Scrivi");
// Suggestionare ha già il suo tiro di resistenza: il posto vuoto «resistenza» c'è solo sulla Scarica.
assert.equal((giocoScrivi.match(/wod5e-mage-nemico-manca"/g) ?? []).length, 1);
// Afferra aperta: la tendina della Condizione tiene Bloccato (fuori lista dal 29/9) e le Condizioni per famiglia col grado.
conTutti(T.gioco(contesto(scrivi, items, { aperte: new Set(["z1"]) })), ['<option value="Bloccato" selected>Bloccato</option><optgroup label="Sensi">', '<option value="Offuscato" >Offuscato II</option>', '<optgroup label="Scontro">', 'name="flags.wod5e-mage.nemico.azioni.z1.danno"'], "gioco, Afferra");
// Il cassetto dal Grimorio: le Formule che Mente e Forze aprono, una strada per volta.
const conGrimorio = T.gioco(contesto(scrivi, items, { cassetto: "grimorio", cerca: "" }));
conTutti(conGrimorio, ['data-cassetto="grimorio"', 'data-nemico-cerca="grimorio"', "cerca fra le Formule di Forze, Mente…", 'data-nemico-lista="grimorio"', 'wod5e-mage-nemico-prendi presa" data-action="nemicoFormula" data-formula="cancellare" data-indice="0"', 'data-action="nemicoFormula" data-formula="suggestionare" data-indice="0"', 'wod5e-mage-nemico-pastiglia on" data-action="nemicoCassettoVia" data-cassetto="grimorio"'], "grimorio");
senza(conGrimorio, ['data-formula="annientare"', 'data-mano="nome"'], "grimorio");

// --- le altre due pagine, nei due modi
const oggetti = T.oggetti({ ...c, tab: { id: "oggetti", group: "primary", cssClass: "active" } });
conTutti(oggetti, ['<h3 class="wod5e-mage-nemico-titolo">Armi</h3>', "Protezioni", "Oggetti", 'data-item-id="w1" data-drag="true" data-document-uuid="Actor.g1.Item.w1"', "danno 4 · Un tiro di pistola · Si nasconde", "crea Spara", "3 punti armatura · fisica · Non si vede", "in testata: 2/3", 'data-action="nemicoDai" data-item-id="o1"', ">Dai</button>"], "oggetti, Gioca");
senza(oggetti, ['data-action="itemEdit"', 'data-action="itemDelete"', 'data-action="archivioOpen"', 'data-action="createItem"'], "oggetti, Gioca");
const oggettiScrivi = T.oggetti({ ...cs, tab: { id: "oggetti", group: "primary", cssClass: "active" } });
conTutti(oggettiScrivi, ['data-action="itemEdit" data-item-id="o1"', 'data-action="itemDelete" data-item-id="o1"', 'data-action="archivioOpen" data-kind="equip-weapon" data-kinds="equip-weapon,equip-armor,equip-gear"', "<b>Arma</b><small>dal compendio</small>", 'data-action="createItem" data-type="armor">a mano</button>', "<b>Oggetto</b>"], "oggetti, Scrivi");
const note = T.note({ ...c, tab: { id: "note", group: "primary", cssClass: "active" } });
conTutti(note, ['<p class="wod5e-mage-nemico-testo">Riportare in sede il disco rigido prima dell\'alba.</p>', "Se resta solo o perde gli occhiali", '<div class="wod5e-mage-nemico-testo"><p>Un agente.</p></div>', "Le vede solo il Narratore."], "note, Gioca");
senza(note, ["<textarea", "<prose-mirror"], "note, Gioca");
const noteScrivi = T.note({ ...cs, tab: { id: "note", group: "primary", cssClass: "active" } });
conTutti(noteScrivi, ['name="flags.wod5e-mage.nemico.note.vuole"', "Riportare in sede il disco rigido", 'name="flags.wod5e-mage.nemico.note.molla"', '<prose-mirror name="system.biography" value="&lt;p&gt;Un agente.&lt;/p&gt;" toggled="true" compact="true">'], "note, Scrivi");
senza(T.note({ ...cs, isGM: false, tab: { id: "note", group: "primary", cssClass: "" } }), ['name="flags.wod5e-mage.nemico.note.vuole"', "Riportare in sede"], "le Note le vede solo il Narratore");
const limitata = T.limitata(c);
assert.ok(limitata.includes("<h2>Agente Grigi</h2>") && limitata.includes("Un nemico. Il Narratore sa il resto."));

// --- lo standard delle Nature (Blue, 1/10): ogni Natura accende il suo blocco e chiama il suo punteggio; i poteri sono quelli del manuale
const effettiBrevi = { p1: { nome: "Da qualche parte", tipo: "attivo", catalogo: "da-qualche-parte", sort: 1 }, h1: { nome: "Occhio allenato", testo: "Riconosce un'arma nascosta a colpo d'occhio.", tipo: "passivo", sort: 2 } };
const breve = (nemico, system = {}) => attore({ name: "Rade", nemico: { soglie: { physical: 4 }, effetti: effettiBrevi, ...nemico }, system });
// Il vampiro: la Natura viene dallo spcType del sistema; il punteggio si chiama Potenza del Sangue finché il Narratore non lo riscrive.
const vampiro = contesto(breve({ punteggio: { valore: 3 } }, { spcType: "vampire" }), [], {});
assert.deepEqual([vampiro.natura, vampiro.modo, vampiro.blocco.tipo, vampiro.blocco.titolo, vampiro.blocco.punteggio.on, vampiro.blocco.punteggio.nome, vampiro.blocco.punteggio.valore, vampiro.blocco.punteggio.max], ["vampire", "gioca", "poteri", "Poteri", true, "Potenza del Sangue", 3, 10]);
assert.deepEqual([vampiro.poteri.map((p) => p.id), vampiro.effetti.map((e) => e.id)], [["p1"], ["h1"]]);
const giocoVampiro = T.gioco(vampiro);
conTutti(giocoVampiro, ['data-blocco="poteri"', '<h3 class="wod5e-mage-nemico-titolo">Poteri</h3>', '<span class="wod5e-mage-nemico-tenue">Potenza del Sangue</span><b>3</b>', 'data-action="nemicoEffettoApri" data-effetto="p1" aria-expanded="false">Da qualche parte</button>', 'data-effetto="h1"'], "vampiro, Gioca");
senza(giocoVampiro, ["wod5e-mage-nemico-domini", 'data-action="nemicoLancia"', "wod5e-mage-nemico-sottotitolo", "Tecnomagick"], "vampiro, Gioca");
const vampiroScrivi = T.gioco(contesto(breve({ modo: "scrivi", punteggio: { nome: "Generazione", valore: 9 } }, { spcType: "vampire" }), [], {}));
conTutti(vampiroScrivi, ['name="flags.wod5e-mage.nemico.punteggio.nome" value="Generazione" placeholder="Potenza del Sangue"', 'name="flags.wod5e-mage.nemico.punteggio.valore" value="9" min="0" max="10"', 'data-action="nemicoEffettoCatalogo"'], "vampiro, Scrivi");
senza(vampiroScrivi, ['name="flags.wod5e-mage.nemico.magick.arete"', 'data-action="nemicoDominio"'], "vampiro, Scrivi");
// Un Risvegliato senza poteri del manuale: in Gioca la Magick non porta il sottotitolo vuoto; in Scrivi sì, col posto per aggiungerne.
const soloMagick = (modo) => T.gioco(contesto(breve({ natura: "risvegliato", modo, effetti: {}, magick: { arete: 1 } }), [], {}));
senza(soloMagick("gioca"), ["wod5e-mage-nemico-sottotitolo", 'data-action="nemicoEffettoApri"'], "Risvegliato senza poteri, Gioca");
conTutti(soloMagick("scrivi"), ['<h4 class="wod5e-mage-nemico-sottotitolo">Poteri</h4>', 'data-action="nemicoEffettoCatalogo"'], "Risvegliato senza poteri, Scrivi");
// Un vampiro senza poteri: il blocco resta, e dice che non ne ha.
const vampiroSenza = T.gioco(contesto(breve({ natura: "vampire", effetti: {} }), [], {}));
conTutti(vampiroSenza, ['data-blocco="poteri"'], "vampiro senza poteri");
assert.equal((vampiroSenza.match(/<span class="wod5e-mage-nemico-nessuna">nessuno<\/span>/g) ?? []).length, 2, "«nessuno» due volte: negli Effetti e nei Poteri");
// Il licantropo chiama Gnosi il suo punteggio.
assert.equal(contesto(breve({ natura: "werewolf" }), [], {}).blocco.punteggio.nome, "Gnosi");
// Il cacciatore non ha un nome di partenza: finché il Narratore non lo scrive, il punteggio non si vede.
const cacciatore = contesto(breve({ natura: "hunter", punteggio: { valore: 2 } }), [], {});
assert.deepEqual([cacciatore.blocco.tipo, cacciatore.blocco.punteggio.on, cacciatore.blocco.punteggio.nome], ["poteri", false, ""]);
senza(T.gioco(cacciatore), ['<span class="wod5e-mage-nemico-tenue"></span><b>2</b>'], "cacciatore, Gioca");
conTutti(T.gioco(contesto(breve({ natura: "hunter", modo: "scrivi" }), [], {})), ['name="flags.wod5e-mage.nemico.punteggio.nome" value="" placeholder="nome del punteggio"'], "cacciatore, Scrivi");
// Il dormiente non ha blocco: tutto resta negli Effetti, anche una riga presa dal catalogo prima.
const dormiente = contesto(breve({ natura: "mortal" }), [], {});
assert.deepEqual([dormiente.blocco.tipo, dormiente.poteri.length, dormiente.effetti.map((e) => e.id)], ["", 0, ["p1", "h1"]]);
senza(T.gioco(dormiente), ["data-blocco=", "wod5e-mage-nemico-blocco"], "dormiente");
senza(T.gioco(contesto(breve({ natura: "mortal", modo: "scrivi" }), [], {})), ['data-action="nemicoEffettoCatalogo"'], "dormiente, Scrivi");
// La Magick accesa col vecchio tasto resta anche con un'altra Natura, e in Scrivi si toglie.
const ereditata = contesto(breve({ natura: "vampire", modo: "scrivi", magick: { on: true, arete: 3, domini: { time: true } } }), [], {});
assert.deepEqual([ereditata.blocco.tipo, ereditata.blocco.eredita, ereditata.blocco.punteggio.nome, ereditata.blocco.punteggio.valore], ["magick", true, "Areté", 3]);
conTutti(T.gioco(ereditata), ['data-blocco="magick"', 'data-action="magickSpegni"', "Togli la Magick"], "Magick ereditata");
// Un nemico su cui non è scritto niente si apre in Scrivi, coi posti vuoti e gli esempi dei casi.
const nuovo = contesto(attore({ name: "" }), [], {});
assert.deepEqual([nuovo.modo, nuovo.natura, nuovo.blocco.tipo], ["scrivi", "mortal", ""]);
conTutti(T.gioco(nuovo), ["<small>Da lontano, Pistola, Atletica</small>", "<small>Mentirgli, Interrogare, Convincere</small>", "<b>Azione</b><small>un'arma negli Oggetti crea la sua da sola</small>", 'wod5e-mage-nemico-pastiglia vuota" data-action="nemicoEffettoNuovo"'], "nemico nuovo");

// --- la carta del lancio
const effetto = c.magick.effetti[1];
const carta = T.carta({ nemico: { name: actor.name, img: actor.img }, effetto, titolo: format("WOD5E_MAGE.Nemico.LanciaSu", { effetto: effetto.nome, bersaglio: "Guendalina" }), sogliaTesto: format("WOD5E_MAGE.Nemico.SogliaCarta", { ambiti: effetto.ambitiTesto }), danniTesto: "", resisteLabel: format("WOD5E_MAGE.Nemico.ResistiCon", { tiro: effetto.resisteTesto }) });
conTutti(carta, ["lancia Cancellare su Guendalina", "<b>1</b><span>soglia · Precisione 1</span>", "Toglie a Guendalina il ricordo", "Resiste con Fermezza + Autocontrollo", "Accidentale · Mente"], "carta");
// Il conto del tiro di Spara su Guendalina: Mira 7, −2 Sanguinante, 5 dadi, riesce dal 6.
const conto = N.contoDelTiro({ nome: "Spara", riserva: c.azioni[0].riserva, soglia: 0, bersaglio: { uuid: "Actor.pg", name: "Guendalina" }, danno: 4, aggravato: false, localize, format });
assert.deepEqual([conto.titolo, conto.conto, conto.dadi, conto.esito], ["Spara · su Guendalina", "Mira 7 -2 Sanguinante = 5 dadi · riesce dal 6", 5, "danno 4 Superficiali"]);

// La mano del Narratore (Blue, 27/9): +2 sulla scheda entra in ogni riserva, nei casi a dadi, nelle azioni e nel conto della carta.
const conMano = contesto(grigi({ manoNarratore: 2 }), items, {});
assert.deepEqual(conMano.carte.map((carta) => [carta.id, carta.riserva.totale, carta.riserva.cambiata, carta.riserva.verso]), [["physical", 5, true, ""], ["social", 7, true, "su"], ["mental", 8, true, "su"]], "la mano entra nelle tre riserve; sul Fisico pareggia la Condizione");
assert.deepEqual(conMano.carte[0].casi.map((k) => [k.nome, k.value]), [["Mira", 7], ["Da lontano", 6]], "nei casi a dadi sì, nelle soglie no");
assert.equal(conMano.carte[0].riserva.hint, "Tira Fisico: 5 -2 Sanguinante +2 Mano del Narratore = 5 dadi");
assert.deepEqual([conMano.manoNarratore.value, conMano.manoNarratore.segno, conMano.manoNarratore.on, conMano.manoNarratore.meno, conMano.manoNarratore.dadiTesto], [2, "+2", true, false, "+2 dadi a ogni tiro"]);
const contoMano = N.contoDelTiro({ nome: "Spara", riserva: conMano.azioni[0].riserva, soglia: 0, localize, format });
assert.deepEqual([contoMano.conto, contoMano.dadi], ["Mira 7 -2 Sanguinante +2 Mano del Narratore = 7 dadi · riesce dal 6", 7]);
conTutti(T.gioco(conMano), ["<b>+2</b>", '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i><b>7</b>'], "gioco con la mano");

// --- un solo campo per nome in tutta la finestra (1.33.1). Testata e pagine stanno nello stesso form, e Foundry, di due
// campi con lo stesso nome, fa una lista coi valori di tutti e due: al primo cambio la scheda salverebbe una lista.
const linguetta = (id) => ({ id, group: "primary", cssClass: "" });
const tuttaLaFinestra = (ctx) => T.testa(ctx) + T.gioco(ctx) + T.oggetti({ ...ctx, tab: linguetta("oggetti") }) + T.note({ ...ctx, tab: linguetta("note") });
const nomiDeiCampi = (html) => [...leggibile(html).matchAll(/<(?:input|select|textarea|prose-mirror)\b[^>]*?\bname="([^"]+)"/g)].map((m) => m[1]);
const tutteAperte = new Set(["arma:w1", "z1", "z2", "z3", "m1", "m2", "m3", "effetto:e1", "effetto:e2", "effetto:e3", "effetto:e4"]);
const finestre = [
  ["Gioca", c],
  ["Gioca, tutto aperto", contesto(actor, items, { aperte: tutteAperte })],
  ["Scrivi", cs],
  ["Scrivi, tutto aperto", contesto(scrivi, items, { aperte: tutteAperte })],
  ["Scrivi, tutto aperto, col Grimorio", contesto(scrivi, items, { aperte: tutteAperte, cassetto: "grimorio", cerca: "" })],
  ["Scrivi, tutto aperto, a mano", contesto(scrivi, items, { aperte: tutteAperte, cassetto: "mano" })],
  ["vampiro, Scrivi", contesto(breve({ modo: "scrivi", punteggio: { nome: "Generazione", valore: 9 } }, { spcType: "vampire" }), items, { aperte: new Set(["effetto:p1", "effetto:h1"]) })],
  ["Magick ereditata, Scrivi", ereditata],
  ["nemico nuovo", nuovo]
];
for (const [dove, ctx] of finestre) {
  const nomiCampi = nomiDeiCampi(tuttaLaFinestra(ctx));
  assert.deepEqual(nomiCampi.filter((nome, i) => nomiCampi.indexOf(nome) !== i), [], `${dove}: campi con lo stesso nome`);
}
assert.equal(nomiDeiCampi(tuttaLaFinestra(c)).length, 0, "in Gioca la scheda non ha campi: lo stato si cambia coi tasti");
assert.ok(nomiDeiCampi(tuttaLaFinestra(contesto(scrivi, items, { aperte: tutteAperte }))).length > 40, "in Scrivi, a righe aperte, i campi ci sono e la prova li conta");

// --- i dialoghi
assert.ok(T.caso({ abilita: c.abilitaScelta }).includes('<option value="firearms">Mira</option>'));
assert.ok(T.dai({ personaggi: [{ id: "a", name: "Guendalina" }] }).includes('<option value="a">Guendalina</option>'));

if (process.env.NEMICO_PAGINA) {
  const { mkdirSync, writeFileSync } = await import("node:fs");
  const dir = process.env.NEMICO_PAGINA;
  mkdirSync(dir, { recursive: true });
  const pagina = (nome, ctx, corpo, tab) => writeFileSync(`${dir}/${nome}.html`, `<!-- disposizione: ${ctx.disposizione.id} · modo: ${ctx.modo} -->\n` + T.testa({ ...ctx, tabAttiva: tab }) + corpo);
  pagina("gioco", c, gioco, "gioco");
  pagina("gioco-scrivi", cs, giocoScrivi, "gioco");
  pagina("gioco-grimorio", cs, conGrimorio, "gioco");
  pagina("oggetti", c, oggetti, "oggetti");
  pagina("oggetti-scrivi", cs, oggettiScrivi, "oggetti");
  pagina("note", c, note, "note");
  pagina("note-scrivi", cs, noteScrivi, "note");
  pagina("vampiro", vampiro, giocoVampiro, "gioco");
  pagina("nuovo", nuovo, T.gioco(nuovo), "gioco");
  writeFileSync(`${dir}/carta.html`, carta);
  console.log(`pagine scritte in ${dir}`);
}
console.log("finta Foundry, la scheda del nemico: ok");
