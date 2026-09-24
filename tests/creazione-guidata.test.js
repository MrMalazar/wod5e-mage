import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  CREDO_ICONE,
  credoConsigliato,
  famiglieDelCredo,
  formaAttributi,
  notaScheda,
  PASSI,
  passiFatti,
  passoSalvato,
  praticaDi,
  prepareGuidata,
  testoPerche,
  tettoSfera
} from "../scripts/creazione-guidata.js";
import { prepareCreationSummary } from "../scripts/riepilogo.js";
import { FOCUS_CREDOS } from "../scripts/focus.js";

const it = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8"));
const localize = (key) => key.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), it) ?? key;

const ATTRIBUTI = { strength: 2, dexterity: 3, stamina: 2, charisma: 4, manipulation: 2, composure: 3, intelligence: 3, wits: 2, resolve: 1 };
const ABILITA = { awareness: 3, performance: 0, athletics: 2, academics: 3, persuasion: 3, larceny: 1, investigation: 2, craft: 0, medicine: 1, firearms: 0, brawl: 2, survival: 0, subterfuge: 2, occult: 0 };
const NOMI = { strength: "Forza", dexterity: "Destrezza", stamina: "Costituzione", charisma: "Carisma", manipulation: "Persuasione", composure: "Autocontrollo", intelligence: "Intelligenza", wits: "Prontezza", resolve: "Fermezza" };

function attore({ flags = {}, headers = {}, attributes = ATTRIBUTI, skills = ABILITA, items = [] } = {}) {
  const attrs = Object.fromEntries(Object.entries(attributes).map(([id, value]) => [id, { value }]));
  const skillMap = Object.fromEntries(Object.entries(skills).map(([id, value]) => [id, { value, bonuses: [] }]));
  const sorted = (keys) => keys.map((id) => ({ id, displayName: NOMI[id] ?? id, value: attributes[id] ?? skills[id] ?? 0 }));
  return {
    name: "Ianira",
    items,
    system: {
      headers,
      attributes: attrs,
      skills: skillMap,
      sortedAttributes: { physical: sorted(["strength", "dexterity", "stamina"]), social: sorted(["charisma", "manipulation", "composure"]), mental: sorted(["intelligence", "wits", "resolve"]) },
      sortedSkills: {
        physical: ["athletics", "brawl", "craft", "firearms", "larceny", "survival"].map((id) => ({ id, displayName: id, value: skills[id] ?? 0 })),
        social: ["performance", "persuasion", "subterfuge"].map((id) => ({ id, displayName: id, value: skills[id] ?? 0 })),
        mental: ["academics", "awareness", "investigation", "medicine", "occult"].map((id) => ({ id, displayName: id, value: skills[id] ?? 0 }))
      }
    },
    getFlag: (_module, key) => flags[key]
  };
}

function feature(name, featuretype, points) {
  return { id: name, name, type: "feature", img: "", system: { featuretype, points } };
}

// I tredici passi dell'ordine del 5/9 (il mock del 23/9).
assert.deepEqual([...PASSI], ["credo", "famiglia", "bussola", "tipo", "concetto", "sfere", "strumenti", "arete", "attributi", "abilita", "vantaggi", "ancore", "controllo"]);
for (const id of PASSI) {
  for (const key of ["Label", "Domanda", "Sotto", "Perche", "PercheDue"]) {
    assert.equal(typeof it.WOD5E_MAGE.Guidata.Passi[id][key], "string", `${id}.${key}`);
  }
}
for (const credo of FOCUS_CREDOS) assert.match(CREDO_ICONE[credo], /^fa-solid fa-/, credo);

// Il passo salvato: il primo senza niente, quello scritto, il primo se è fuori scala.
assert.equal(passoSalvato(attore()), 1);
assert.equal(passoSalvato(attore({ flags: { creazione: { guidata: { passo: 5 } } } })), 5);
assert.equal(passoSalvato(attore({ flags: { creazione: { guidata: { passo: 40 } } } })), 1);

// Il tetto delle Sfere alla creazione: Areté + 2, mai sopra 5.
assert.deepEqual([tettoSfera(1), tettoSfera(3), tettoSfera(5), tettoSfera(0)], [3, 5, 5, 3]);

// La forma fissa degli Attributi (05_090): uno a 4, tre a 3, quattro a 2, uno a 1.
assert.equal(formaAttributi(ATTRIBUTI).ok, true);
const storta = formaAttributi({ ...ATTRIBUTI, resolve: 2 });
assert.equal(storta.ok, false);
assert.deepEqual(storta.rows.map((row) => [row.value, row.have, row.state]), [[4, 1, "exact"], [3, 3, "exact"], [2, 5, "over"], [1, 0, "under"]]);

// Il capitolo 03: il Credo che la via consiglia, la pratica e il Tipo di macchina.
assert.equal(credoConsigliato("verbena", "streghe"), "sacro");
assert.equal(credoConsigliato("hermes", "quaesitor"), "");
assert.equal(credoConsigliato("ngoma"), "fede");
assert.deepEqual(praticaDi("adepti", "elite"), { forma: "Cibernetica", tipo: "tecnomagick" });
assert.deepEqual(praticaDi("verbena", "streghe"), { forma: "Sciamanesimo", tipo: "" });
assert.deepEqual(praticaDi("solificati"), { forma: "Alchimia", tipo: "" });
assert.ok(famiglieDelCredo("sacro").includes("verbena"));
assert.ok(famiglieDelCredo("sacro").includes("taftani"));
assert.ok(!famiglieDelCredo("sacro").includes("hermes"));
assert.deepEqual(famiglieDelCredo(""), []);

// Il perché: il testo della lingua, o quello riscritto dal Narratore.
const libro = testoPerche("credo", {}, localize);
assert.equal(libro.proprio, false);
assert.match(libro.html, /^<p class="wod5e-mage-guidata-lead">Cosa credi che la realtà sia/);
assert.match(libro.html, /<p>Ogni setta respira/);
const mio = testoPerche("credo", { credo: { perche: "<p>Il mio testo</p>" } }, localize);
assert.deepEqual(mio, { html: "<p>Il mio testo</p>", proprio: true });
assert.equal(testoPerche("credo", { credo: { perche: "<p></p>" } }, localize).proprio, false, "un editor svuotato torna al LIBRO");

// Il passo 1 su un personaggio vuoto: tredici carte in ordine alfabetico, niente scelto.
const vuoto = attore();
const g1 = prepareGuidata(vuoto, { passo: 1, localize, lang: "it" });
assert.equal(g1.passo.id, "credo");
assert.equal(g1.passi.length, 13);
assert.deepEqual([g1.passi[0].qui, g1.passi[0].fatto, g1.passi[1].qui], [true, false, false]);
assert.equal(g1.corpo.credi.length, 13);
assert.deepEqual(g1.corpo.credi.slice(0, 3).map((c) => c.label), ["Tutto è Arte", "Tutto è Caos", "Tutto è Dati"]);
assert.equal(g1.corpo.chosen, null);
assert.equal(g1.corpo.credi.find((c) => c.id === "potere").free, true);
assert.deepEqual(g1.corpo.credi.find((c) => c.id === "vivo").spheres.map((s) => s.label), ["Vita", "Forze"]);
assert.equal(g1.corpo.credi.find((c) => c.id === "vivo").profession, "Erborista");
assert.equal(g1.indietro, null);
assert.deepEqual(g1.avanti, { n: 2, label: "Famiglia" });
assert.equal(g1.nota, "Sulla scheda: niente ancora");
assert.equal(g1.grado, "neofita");
assert.equal(g1.gradi.find((g) => g.selected).id, "neofita");
assert.equal(g1.canEdit, true);
assert.equal(g1.perche.chiave, "guidaTesti.credo.perche");

// Col Credo scelto: le Sfere affini, il mestiere, le Famiglie che lo consigliano, la nota.
const conCredo = attore({ flags: { focus: { credo: "sacro" } } });
const g1b = prepareGuidata(conCredo, { passo: 1, localize });
assert.equal(g1b.corpo.chosen.id, "sacro");
assert.deepEqual(g1b.corpo.spheres.map((s) => s.id), ["spirit", "forces"]);
assert.ok(g1b.corpo.famiglie.includes("Verbena"));
assert.equal(g1b.nota, "Sulla scheda: Tutto è Sacro, scritto nel Credo");
assert.equal(g1b.passi[0].fatto, true);
// Un Credo sciolto è fatto solo con le due Sfere scelte.
assert.equal(prepareGuidata(attore({ flags: { focus: { credo: "potere" } } }), { passo: 1, localize }).passi[0].fatto, false);
const potere = prepareGuidata(attore({ flags: { focus: { credo: "potere", credoSpheres: { first: "forces", second: "mind" } } } }), { passo: 1, localize });
assert.equal(potere.passi[0].fatto, true);
assert.equal(potere.corpo.chosen.choices.length, 2);
assert.equal(potere.corpo.chosen.choices[0].value, "forces");

// Il passo 2: le Famiglie per fazione, quelle col Credo davanti; la via dopo la Famiglia.
const g2 = prepareGuidata(conCredo, { passo: 2, localize });
assert.equal(g2.passo.id, "famiglia");
assert.deepEqual(g2.corpo.gruppi.map((g) => g.id), ["tradizioni", "disparati"]);
assert.equal(g2.corpo.gruppi[0].famiglie.length, 9);
assert.equal(g2.corpo.gruppi[1].famiglie.length, 10);
assert.equal(g2.corpo.gruppi[0].famiglie[0].delCredo, true, "le Famiglie che consigliano il Credo vengono prima");
assert.equal(g2.corpo.gruppi[0].famiglie.at(-1).delCredo, false);
assert.equal(g2.corpo.family, null);
assert.deepEqual(g2.corpo.sottofamiglie, []);
assert.match(g2.corpo.gruppi[0].famiglie[0].image, /assets\/immagini\/famiglie\/[a-z]+\.webp$/);
const verbena = attore({ flags: { focus: { credo: "sacro" }, lineage: { famiglia: "verbena", sottofamiglia: "streghe" } } });
const g2b = prepareGuidata(verbena, { passo: 2, localize });
assert.deepEqual([g2b.corpo.family.id, g2b.corpo.family.subKind, g2b.corpo.family.sphere.label], ["verbena", "Circolo", "Vita"]);
assert.equal(g2b.corpo.sottofamiglie.length, 4);
const streghe = g2b.corpo.sottofamiglie.find((s) => s.id === "streghe");
assert.deepEqual([streghe.selected, streghe.delCredo, streghe.credoLabel, streghe.pratica, streghe.sphere.label], [true, true, "Tutto è Sacro", "Sciamanesimo", "Spirito"]);
assert.deepEqual(g2b.corpo.dotted.map((s) => s.id), ["life", "spirit"]);
assert.equal(g2b.nota, "Sulla scheda: Appartenenza Verbena · Streghe della Siepe, con le sue Sfere a 1");
assert.equal(g2b.passi[1].fatto, true);
assert.equal(prepareGuidata(attore({ flags: { lineage: { famiglia: "verbena" } } }), { passo: 2, localize }).passi[1].fatto, false, "senza la via non è fatto");
assert.equal(prepareGuidata(attore({ flags: { lineage: { famiglia: "ngoma" } } }), { passo: 2, localize }).passi[1].fatto, true, "una Craft non ha vie");
assert.equal(prepareGuidata(attore({ flags: { lineage: { famiglia: "ngoma" } } }), { passo: 2, localize }).corpo.family.craft, true);

// Il passo 3: le proposte del Credo prima; senza Credo le voci comuni.
const cataloghi = {
  ambizione: [{ uuid: "a1", name: "La Ricerca", text: "Trovare chi ha fatto sparire mia sorella", group: "Legami" }, { uuid: "a2", name: "L'Opera", text: "Finire l'opera", group: "Tutto è Sacro", credo: "sacro" }],
  desiderio: [{ uuid: "d1", name: "Il perdono", text: "Farmi perdonare", group: "Legami" }],
  convinzione: [{ uuid: "c1", name: "Nessuno decide", text: "Nessuno decide chi vive e chi muore.", group: "Morte", gloss: "rifiuti", cross: "uccidi" }]
};
const g3 = prepareGuidata(attore({ flags: { focus: { credo: "sacro" }, convinzioni: { r1: { group: "morte", text: "Nessuno decide", serve: "rifiuti", cross: "uccidi" } } }, headers: { ambition: "Trovare mia sorella" } }), { passo: 3, localize, cataloghi });
assert.equal(g3.corpo.ambition, "Trovare mia sorella");
assert.deepEqual(g3.corpo.proposte.ambizione.map((p) => [p.name, p.delCredo]), [["L'Opera", true]]);
assert.deepEqual(g3.corpo.proposte.desiderio.map((p) => p.name), ["Il perdono"]);
assert.equal(g3.corpo.convinzioni[0].groupLabel, "Morte");
assert.equal(g3.corpo.caricati, true);
assert.equal(g3.passi[2].fatto, false, "manca il Desiderio");
assert.equal(prepareGuidata(attore({ flags: { convinzioni: { r1: { text: "x" } } }, headers: { ambition: "a", desire: "b" } }), { passo: 3, localize }).passi[2].fatto, true);

// Il passo 4: tre Tipi; la pratica di macchina consiglia la Tecnomagick.
const g4 = prepareGuidata(attore({ flags: { focus: { practiceForm: "magick" }, lineage: { famiglia: "adepti", sottofamiglia: "elite" } } }), { passo: 4, localize });
assert.deepEqual(g4.corpo.tipi.map((t) => [t.id, t.selected, t.consigliato, t.premio]), [["magick", true, false, true], ["tecnomagick", false, true, true], ["ibrida", false, false, false]]);
assert.deepEqual([g4.corpo.pratica, g4.corpo.praticaTipo], ["Cibernetica", "Tecnomagick"]);
assert.deepEqual(g4.corpo.tipi[0].famiglie, ["Oggetto", "Sostanza", "Parola", "Corpo"]);
assert.equal(g4.nota, "Sulla scheda: Tipo di Magick Magick");

// Il passo 5: il Concetto, i gruppi della Sfida e i premi.
const g5 = prepareGuidata(attore({ flags: { conceptChallenge: { description: "a", mask: "b", routine: "c", livelihood: "d", spark: "e", cracks: "f", outlet: "g" } }, headers: { concept: "Infermiera" } }), { passo: 5, localize, cataloghi: { concetto: [{ uuid: "k1", name: "Infermiera di corsia", text: "Infermiera di corsia", group: "Concetti" }] } });
assert.equal(g5.corpo.concept, "Infermiera");
assert.deepEqual(g5.corpo.gruppi.map((g) => [g.done, g.complete]), [[7, true], [0, false], [0, false]]);
assert.deepEqual(g5.corpo.premi.map((p) => p.earned), [true, false, false]);
assert.equal(g5.corpo.proposte[0].name, "Infermiera di corsia");
assert.equal(g5.passi[4].fatto, true);

// Il passo 6, i Domini (25/9): le nove Sfere con l'accesso, un potere per Dominio aperto, il livello solo promemoria.
const g6 = prepareGuidata(attore({ flags: { arete: { value: 1 }, spheres: { life: 1, spirit: 1, forces: 2 }, selectedSpheres: { life: true, spirit: true, forces: true }, familySpheres: { life: true, spirit: true }, poteri: { a: { sphere: "life", catalogId: "pronto-soccorso", name: "Pronto soccorso", dot: 1 }, b: { sphere: "forces", catalogId: "faro", name: "Faro", dot: 2 } } } }), { passo: 6, localize, lang: "it" });
assert.equal(g6.corpo.spheres.length, 9);
assert.deepEqual([g6.corpo.conto.domini.value, g6.corpo.conto.domini.target, g6.corpo.conto.domini.text], [3, null, "3"]);
assert.deepEqual([g6.corpo.conto.poteri.value, g6.corpo.conto.poteri.target, g6.corpo.conto.poteri.state, g6.corpo.conto.poteri.text], [2, 3, "under", "2/3"]);
const forze = g6.corpo.spheres.find((s) => s.id === "forces");
assert.deepEqual([forze.selected, forze.level, forze.vuoto, forze.poteri.map((p) => [p.id, p.label, p.dot])], [true, 2, false, [["b", "Faro", 2]]]);
const spirito = g6.corpo.spheres.find((s) => s.id === "spirit");
assert.deepEqual([spirito.selected, spirito.family, spirito.vuoto, spirito.poteri], [true, true, true, []], "Spirito è aperto ma senza il suo potere");
assert.equal(g6.corpo.spheres.find((s) => s.id === "matter").selected, false);
assert.equal(g6.corpo.extra, 0);
assert.equal(g6.passi[5].fatto, false);
// Col potere di Spirito il passo è fatto; il grado Discepolo chiede due poteri in più.
const g6b = prepareGuidata(attore({ flags: { arete: { value: 1 }, selectedSpheres: { life: true }, poteri: { a: { sphere: "life", catalogId: "pronto-soccorso", name: "Pronto soccorso" } } } }), { passo: 6, localize, lang: "it" });
assert.deepEqual([g6b.corpo.conto.poteri.text, g6b.passi[5].fatto], ["1/1", true]);
const g6c = prepareGuidata(attore({ flags: { arete: { value: 3 }, creazione: { grado: "discepolo" }, selectedSpheres: { life: true }, poteri: { a: { sphere: "life", catalogId: "pronto-soccorso", name: "Pronto soccorso" } } } }), { passo: 6, localize, lang: "it" });
assert.deepEqual([g6c.corpo.conto.poteri.text, g6c.corpo.extra, g6c.passi[5].fatto], ["1/3", 2, false]);

// Il passo 7: uno Strumento per Sfera aperta e quello di Percepire; il consiglio del Credo per Sfera.
const g7 = prepareGuidata(attore({ flags: { focus: { credo: "vivo", practiceForm: "magick", sphereInstruments: { life: { tool: "herbs", name: "la salvia del balcone" } } }, spheres: { life: 1, forces: 2 }, selectedSpheres: { life: true, forces: true } } }), { passo: 7, localize, lang: "it" });
assert.deepEqual(g7.corpo.strumenti.map((r) => r.id), ["forces", "life", "percepire"]);
assert.equal(g7.corpo.strumenti[1].tool, "herbs");
assert.equal(g7.corpo.strumenti[1].consigli.length, 1, "col Tipo Magick un consiglio solo");
assert.deepEqual([g7.corpo.strumenti[1].consigli[0].tool, g7.corpo.strumenti[1].consigli[0].family, g7.corpo.strumenti[1].consigli[0].toolLabel, g7.corpo.strumenti[1].consigli[0].name], ["gestures", "body", "Gesti", "la mano sulla corteccia"]);
assert.deepEqual([g7.corpo.fatti, g7.corpo.totale], [1, 2]);
assert.equal(g7.corpo.strumenti[2].perceive, true);
assert.equal(g7.passi[6].fatto, false);

// Il passo 8: l'Areté del grado, Quintessenza e Paradosso.
const g8 = prepareGuidata(attore({ flags: { arete: { value: 2 }, magickBalance: { quintessence: 3, paradox: 0 } } }), { passo: 8, localize });
assert.deepEqual([g8.corpo.arete, g8.corpo.target, g8.corpo.ok, g8.corpo.cap, g8.corpo.quintessence, g8.corpo.paradox], [2, 1, false, 4, 3, 0]);
assert.equal(g8.corpo.steps.find((s) => s.target).value, 1);
assert.equal(prepareGuidata(attore({ flags: { arete: { value: 3 }, creazione: { grado: "discepolo" } } }), { passo: 8, localize }).corpo.ok, true);
assert.equal(g8.nota, "Sulla scheda: Areté 2");

// Il passo 9: i tre gruppi, la forma, le statistiche di base (05_100).
const g9 = prepareGuidata(vuoto, { passo: 9, localize });
assert.deepEqual(g9.corpo.gruppi.map((g) => [g.id, g.attributi.length]), [["physical", 3], ["social", 3], ["mental", 3]]);
assert.equal(g9.corpo.gruppi[0].attributi[0].label, "Forza");
assert.equal(g9.corpo.forma.ok, true);
assert.deepEqual(g9.corpo.statistiche, { salute: 5, volonta: 4, saggezza: 7 });
assert.deepEqual([g9.corpo.conto.value, g9.corpo.conto.state], [22, "exact"]);
assert.equal(g9.passi[8].fatto, true);

// Il passo 10: le quattordici Abilità, il tetto, il conto (19 pallini).
const g10 = prepareGuidata(vuoto, { passo: 10, localize });
assert.equal(g10.corpo.gruppi.reduce((sum, g) => sum + g.abilita.length, 0), 14);
assert.deepEqual([g10.corpo.conto.value, g10.corpo.conto.target, g10.corpo.cap, g10.corpo.tettoOk], [19, 19, 3, true]);
assert.equal(g10.passi[9].fatto, true);
const troppo = prepareGuidata(attore({ skills: { ...ABILITA, occult: 4 } }), { passo: 10, localize });
assert.deepEqual([troppo.corpo.tettoOk, troppo.corpo.oltre], [false, ["occult"]]);
assert.equal(troppo.corpo.gruppi[2].abilita.find((s) => s.id === "occult").oltre, true);

// Il passo 11: Background, Pregi e Difetti coi conti.
const g11 = prepareGuidata(attore({ items: [feature("Alleati", "background", 3), feature("Ambidestro", "merit", 2), feature("Contatti", "background", 2), feature("Dipendenza", "flaw", 2)] }), { passo: 11, localize });
assert.deepEqual(g11.corpo.background.map((i) => i.name), ["Alleati", "Contatti"]);
assert.deepEqual([g11.corpo.conto.vantaggi.text, g11.corpo.conto.vantaggi.state, g11.corpo.conto.difetti.text, g11.corpo.conto.difetti.state], ["7/7", "exact", "2/2", "exact"]);
assert.deepEqual(g11.corpo.pregi[0].steps.map((s) => s.lit), [true, true, false, false, false]);
assert.equal(g11.passi[10].fatto, true);

// Il passo 12: le Ancore, con le proposte del catalogo.
const g12 = prepareGuidata(attore({ flags: { ancore: { x1: { name: "Il partner", description: "non sa niente" } } } }), { passo: 12, localize, cataloghi: { ancora: [{ uuid: "n1", name: "La madre che dimentica", text: "La madre che dimentica", description: "…", group: "Ancore" }] } });
assert.equal(g12.corpo.ancore.length, 1);
assert.equal(g12.corpo.fatte, 1);
assert.equal(g12.corpo.proposte[0].name, "La madre che dimentica");
assert.equal(g12.passi[11].fatto, true);
assert.deepEqual(g12.avanti, { n: 13, label: "Controllo" });

// Il passo 13 e i passi fatti: un personaggio intero è tutto verde.
const intero = attore({
  flags: {
    focus: { credo: "vivo", practiceForm: "magick", sphereInstruments: { life: { tool: "herbs" }, forces: { tool: "gestures" }, spirit: { tool: "prayers" } } },
    lineage: { famiglia: "verbena", sottofamiglia: "streghe" },
    arete: { value: 1 },
    spheres: { life: 3, forces: 2, spirit: 1 },
    selectedSpheres: { life: true, forces: true, spirit: true },
    // Un potere per Dominio aperto (25/9).
    poteri: { a: { sphere: "life", catalogId: "pronto-soccorso", name: "Pronto soccorso" }, b: { sphere: "forces", catalogId: "faro", name: "Faro" }, c: { sphere: "spirit", catalogId: "coro", name: "Coro" } },
    ancore: { x1: { name: "Il partner", description: "" } },
    convinzioni: { r1: { text: "Nessuno decide", group: "morte" } }
  },
  headers: { concept: "Infermiera", ambition: "a", desire: "b" },
  items: [feature("Alleati", "background", 3), feature("Ambidestro", "merit", 4), feature("Dipendenza", "flaw", 2)]
});
const done = passiFatti(intero, prepareCreationSummary(intero, 1));
assert.deepEqual(Object.entries(done).filter(([, ok]) => !ok), [], "tutti i passi fatti");
const g13 = prepareGuidata(intero, { passo: 13, localize });
assert.equal(g13.passo.id, "controllo");
assert.equal(g13.corpo.pronto, true);
assert.equal(g13.corpo.mancano, 0);
assert.equal(g13.corpo.voci.length, 12);
assert.equal(g13.corpo.conti.every((c) => c.state === "exact"), true);
assert.equal(g13.avanti, null);
assert.equal(g13.ultimo, true);
assert.equal(g13.done.controllo, true);
const g13v = prepareGuidata(vuoto, { passo: 13, localize });
assert.equal(g13v.corpo.pronto, false);
assert.ok(g13v.corpo.mancano > 0);
assert.equal(notaScheda("controllo", vuoto, { localize }), "Sulla scheda: il memo di creazione resta acceso sui titoli");

// Chi non può scrivere: la finestra si legge e basta.
assert.equal(prepareGuidata(vuoto, { passo: 1, localize, canEdit: false }).canEdit, false);
assert.equal(prepareGuidata(vuoto, { passo: 99, localize }).passo.n, 13, "un passo fuori scala si ferma all'ultimo");

// La finestra e i template: tredici partial, il perché, i tasti in testata, l'apertura sul Mago nuovo.
const finestra = readFileSync(new URL("../scripts/creazione-guidata-finestra.js", import.meta.url), "utf8");
assert.match(finestra, /templates: \[`\$\{RADICE\}\/perche\.hbs`, \.\.\.PASSI\.map\(\(id\) => `\$\{RADICE\}\/passi\/\$\{id\}\.hbs`\)\]/);
assert.match(finestra, /Hooks\.on\("createActor"/);
assert.match(finestra, /game\.settings\.register\(MODULE_ID, GUIDA_TESTI_SETTING/);
for (const id of PASSI) readFileSync(new URL(`../templates/guidata/passi/${id}.hbs`, import.meta.url), "utf8");
// Il passo dei Domini (25/9): l'accesso, il più che apre la finestra Aggiungi, il potere con la ×, niente pallini.
const sfereHbs = readFileSync(new URL("../templates/guidata/passi/sfere.hbs", import.meta.url), "utf8");
for (const marker of ['data-action="dominioAccesso" data-sphere="{{sphere.id}}"', 'data-action="dominioPotere" data-sphere="{{sphere.id}}"', 'data-action="dominioPotereTogli" data-row="{{p.id}}"', "wod5e-mage-guidata-dominio-livello", "WOD5E_MAGE.Guidata.Sfere.Scegli"]) assert.ok(sfereHbs.includes(marker), `manca ${marker}`);
assert.ok(!sfereHbs.includes("sferaPallino") && !sfereHbs.includes("wod5e-mage-guidata-pallino"), "niente pallini di Sfera");
assert.match(finestra, /dominioAccesso: CreazioneGuidata\.#onDominioAccesso,\s+dominioPotere: CreazioneGuidata\.#onDominioPotere,\s+dominioPotereTogli: CreazioneGuidata\.#onDominioPotereTogli/);
assert.ok(!finestra.includes("sferaPallino"));
const corpo = readFileSync(new URL("../templates/guidata/corpo.hbs", import.meta.url), "utf8");
assert.match(corpo, /\{\{> \(lookup passo "partial"\)\}\}/);
const perche = readFileSync(new URL("../templates/guidata/perche.hbs", import.meta.url), "utf8");
assert.match(perche, /<prose-mirror name="\{\{perche\.chiave\}\}"/);
const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheet, /guidataApri: onGuidataApri/);
assert.match(sheet, /wod5e-mage-guidata-testata/);
const main = readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8");
assert.match(main, /registraCreazioneGuidata\(\);/);

console.log("Creazione guidata: test passati.");
