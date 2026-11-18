// Il menù circolare del Narratore (17-18/11/2026): i dati per Sfera, i conti
// puri (cerchi, soglie, disegno, finestra del lancio) e il controllo con una
// fonte finta al posto di Foundry, lungo i percorsi del mock approvato.
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { MENU_ICONE, MENU_ICONE_LATI, MENU_SFERE } from "../scripts/data/menu-sfere.js";
import {
  ambitiNuovi,
  cartaMossa,
  cerchiDelleSfere,
  chiaveTurno,
  COMPONI,
  disegno,
  durataAddosso,
  fattoFissato,
  formuleDellaSfera,
  idEffettoMagick,
  isEffettoMagick,
  palliniRiserva,
  piuVicina,
  posizioniLati,
  posizioniVentaglio,
  riassuntoAmbiti,
  righeDelLato,
  rotazionePer,
  sferaMenu,
  sogliaPerScardinare,
  toccaAmbito,
  voceAddosso
} from "../scripts/menu-circolare.js";
import { esc, foglioIcone, MenuCircolare } from "../scripts/menu-circolare-ui.js";

const ROOT = new URL("../", import.meta.url);
const leggiJson = (file) => JSON.parse(readFileSync(new URL(file, ROOT), "utf8"));
const it = leggiJson("lang/it.json");
const en = leggiJson("lang/en.json");
const nodo = (albero, chiave) => chiave.split(".").reduce((n, p) => (n && typeof n === "object" ? n[p] : undefined), albero);
const traduttore = (lingua, mancanti) => {
  const localize = (k) => {
    const v = nodo(lingua, k);
    if (typeof v !== "string") {
      mancanti.add(k);
      return k;
    }
    return v;
  };
  const format = (k, data = {}) => Object.entries(data).reduce((t, [a, b]) => t.replaceAll(`{${a}}`, String(b)), localize(k));
  return { localize, format };
};

/* ------------------------------------------------------------------ i dati */

assert.deepEqual(MENU_SFERE.map((s) => s.id), ["correspondence", "entropy", "forces", "matter", "mind", "prime", "spirit", "time", "life"], "l'anello nell'ordine del mock");
assert.equal(MENU_SFERE.reduce((n, s) => n + s.righe.length, 0), 94, "le righe della stesura del 24/10");
assert.equal(MENU_SFERE.find((s) => s.id === "correspondence").autore, "Blue", "Corrispondenza l'ha scritta Blue");
for (const sfera of MENU_SFERE) {
  assert.ok(sfera.nome && sfera.dominio, `${sfera.id}: nome e dominio`);
  const ids = new Set(sfera.righe.map((r) => r.id));
  assert.equal(ids.size, sfera.righe.length, `${sfera.id}: id unici`);
  for (const riga of sfera.righe) {
    assert.ok(["n", "s", "ns"].includes(riga.lato), `${riga.id}: il lato`);
    assert.ok(riga.nome && riga.testo, `${riga.id}: nome e testo`);
    assert.ok(MENU_ICONE[riga.icona], `${riga.id}: l'icona ${riga.icona} ha il tracciato`);
    assert.ok(riga.prezzo === null || riga.prezzo === 1, `${riga.id}: prezzo X o Costo 1 Fisso`);
  }
  const ultima = sfera.righe.at(-1);
  assert.equal(ultima.id, idEffettoMagick(sfera.id), `${sfera.id}: l'Effetto di Magick in fondo`);
  assert.ok(isEffettoMagick(ultima.id) && ultima.lato === "ns");
  // Il ventaglio di un lato: le sue righe più quelle dei due lati, nell'ordine della stesura.
  for (const lato of ["n", "s"]) {
    const righe = righeDelLato(sfera, lato);
    assert.deepEqual(righe.map((r) => r.id), sfera.righe.filter((r) => r.lato === lato || r.lato === "ns").map((r) => r.id));
    assert.ok(righe.length >= 4 && righe.length <= 8, `${sfera.id}/${lato}: ${righe.length} mosse`);
  }
}
for (const nome of Object.values(MENU_ICONE_LATI)) assert.ok(MENU_ICONE[nome], `l'icona ${nome}`);
assert.equal(righeDelLato(null, "n").length, 0);
assert.equal(righeDelLato(sferaMenu("time"), "x").length, 0);
// I crediti di Game-icons stanno in testa al file generato e nel README.
const generato = readFileSync(new URL("scripts/data/menu-sfere.js", ROOT), "utf8");
assert.match(generato, /^\/\/ GENERATO da tools\/build-menu-sfere\.py/);
assert.match(generato, /CC BY 3\.0/);
assert.match(readFileSync(new URL("README.md", ROOT), "utf8"), /Game-icons[\s\S]*CC BY 3\.0/, "la licenza delle icone nei crediti del README");

/* ------------------------------------------------------------------ i conti */

{
  const cerchi = cerchiDelleSfere({ alTavolo: ["forces", "mind"], delNemico: ["mind", "entropy"] });
  assert.equal(cerchi.forces, "t");
  assert.equal(cerchi.mind, "t", "il tavolo vince sul nemico");
  assert.equal(cerchi.entropy, "n");
  assert.equal(cerchi.time, "f");
  assert.equal(Object.keys(cerchi).length, 9);
}
assert.equal(sogliaPerScardinare(3, false), 3, "pari al pagato");
assert.equal(sogliaPerScardinare(3, true), 6, "il pagato più 3 per quello che fissa");
assert.equal(sogliaPerScardinare(-2), 0);
assert.equal(rotazionePer(0), 90, "Corrispondenza dall'alto alla linea");
assert.equal(rotazionePer(4), -70);
assert.equal(piuVicina(0, 270), -90, "si gira dalla parte corta");
assert.equal(piuVicina(350, 10), 370);
assert.deepEqual(palliniRiserva(5, 2), [true, true, false, false, false]);
assert.deepEqual(palliniRiserva(25, 2), [], "oltre 20 si dice il numero e basta");
assert.deepEqual(palliniRiserva(0, 1), []);
assert.equal(chiaveTurno(null), "");
assert.equal(chiaveTurno({ started: false, id: "c1", round: 1, turn: 0 }), "");
assert.equal(chiaveTurno({ started: true, id: "c1", round: 2, turn: 3 }), "c1:2:3");

// Le Formule della Sfera: quelle che l'hanno fra gli Accessi, con la cerca senza accenti.
{
  const tutte = formuleDellaSfera("correspondence");
  assert.ok(tutte.length >= 10, `${tutte.length} Formule con Corrispondenza`);
  assert.ok(tutte.every((f) => f.nome && f.soglia), "nome e soglia");
  const cerca = formuleDellaSfera("forces", "ACCELERARE");
  assert.ok(cerca.some((f) => f.id === "accelerare-e-rallentare"));
  assert.ok(formuleDellaSfera("forces", "xyzxyz").length === 0);
  assert.ok(formuleDellaSfera("time", "rallentàre").some((f) => f.id === "accelerare-e-rallentare"), "la cerca ignora gli accenti");
}

// Gli Ambiti della finestra: l'Epicità da 1 a 7, sopra lo 0 al massimo tre.
{
  assert.deepEqual(ambitiNuovi(), { epic: 1, targets: 0, conditions: 0, duration: 0, range: 0, potency: 0, precision: 0 });
  assert.equal(ambitiNuovi({ epic: 0, duration: 9 }).epic, 1);
  assert.equal(ambitiNuovi({ duration: 9 }).duration, 7);
  let l = ambitiNuovi();
  l = toccaAmbito(l, "epic", 0).livelli;
  assert.equal(l.epic, 1, "l'Epicità non scende sotto 1");
  for (const id of ["targets", "duration", "range"]) l = toccaAmbito(l, id, 2).livelli;
  const quarto = toccaAmbito(l, "potency", 1);
  assert.equal(quarto.rifiutato, true, "il quarto Ambito non entra");
  assert.equal(quarto.livelli.potency, 0);
  assert.equal(toccaAmbito(l, "range", 2).livelli.range, 0, "ritoccato torna a 0");
  assert.equal(toccaAmbito(l, "range", 5).livelli.range, 5, "uno già alzato si sposta");
  assert.equal(riassuntoAmbiti(l, (k) => k.split(".").pop()), "epic 1 · targets 2 · duration 2 · range 2");
}

// Il disegno: largo col pannello a destra, stretto col foglio dal basso, compatto sotto misura.
{
  const anello = disegno({ W: 1280, H: 760 });
  assert.equal(anello.focus, false);
  assert.equal(anello.cx, 640);
  assert.equal(anello.cy, 380);
  const scelta = disegno({ W: 1280, H: 760, sfera: 2, lato: "n" });
  assert.equal(scelta.largo, true);
  assert.equal(scelta.P, 358, "il pannello: il 28% fra 300 e 420");
  assert.equal(scelta.aW, 1280 - 358);
  assert.ok(scelta.k > 0.5 && scelta.k <= 1);
  assert.ok(Math.abs(scelta.sx - (scelta.cx + scelta.R)) < 0.02, "la Sfera scelta sta a destra dell'anello");
  const foglio = disegno({ W: 760, H: 700, sfera: 0, riga: "x" });
  assert.equal(foglio.largo, false);
  assert.equal(foglio.foglio, 434, "il foglio al 62% con una riga scelta");
  assert.equal(disegno({ W: 760, H: 700, sfera: 0 }).foglio, 252, "al 36% senza");
  const piccolo = disegno({ W: 420, H: 360, sfera: 0, lato: "n" });
  assert.equal(piccolo.stretto, true, "sotto misura il palco si compatta");
  assert.equal(piccolo.nomi, false);
  const lati = posizioniLati(scelta, "n");
  assert.deepEqual(lati.map((m) => [m.lato, m.scelto, m.altro]), [["n", true, false], ["s", false, true]]);
  assert.equal(lati[0].y, 0, "il lato scelto va sulla linea");
  assert.ok(lati[1].r < lati[0].r, "l'altro si fa più piccolo");
  const ventaglio = posizioniVentaglio(scelta, 7);
  assert.equal(ventaglio.length, 7);
  assert.equal(ventaglio[3].angolo, 0, "centrato sulla linea");
  assert.ok(Math.abs(ventaglio[0].angolo) <= 52 && Math.abs(ventaglio[6].angolo) <= 52, "al massimo 104 gradi");
}

/* ------------------------------------------------------------------ la spesa */

{
  const spesa = { sfera: "entropy", sferaNome: "Entropia", lato: "n", riga: "entropy-x", nome: "Destino <scritto>", testo: "Il fato si piega.", fissa: true, paga: 3, soglia: 6, durata: "lunga", durataTesto: "dura più a lungo", suChi: { id: "a1", nome: "Guendalina" }, da: { id: "t1", nome: "Sgherro" }, nota: "solo per me", quando: 1000 };
  const { localize } = traduttore(it, new Set());
  const html = cartaMossa(spesa, { localize });
  assert.match(html, /Il Paradosso agisce · Destino &lt;scritto&gt;/);
  assert.match(html, /Entropia · Narrativa/);
  assert.match(html, /Guendalina/);
  assert.match(html, /Sgherro/);
  assert.match(html, /Soglia per scardinare<\/b><span class="wod5e-mage-roll-value">6/);
  assert.match(html, /dura più a lungo/);
  assert.match(html, /Resta fissato finché non lo scardinano/);
  assert.ok(!html.includes("solo per me"), "la nota del Narratore non va al tavolo");
  assert.match(cartaMossa(spesa, { localize, nascosta: true }), /solo per me/, "nella carta nascosta sì");
  assert.ok(html.includes("wod5e-mage-menu-card"), "la veste delle carte del menù");
  const fatto = fattoFissato(spesa, { scena: 2 });
  assert.deepEqual(fatto, { id: "entropy-x-1000", nome: "Destino <scritto>", sfera: "entropy", sferaNome: "Entropia", soglia: 6, da: "Sgherro", scena: 2, quando: 1000 });
  assert.equal(durataAddosso("lunga"), "sessione");
  assert.equal(durataAddosso("scena"), "scena");
  assert.equal(durataAddosso("riga"), "scena");
  assert.deepEqual(voceAddosso(spesa), { id: "entropy-x", nome: "Destino <scritto>", famiglia: "entropy", modo: "immediato", durata: "sessione", effetto: "Il fato si piega." });
}

/* ------------------------------------------------------------------ il controllo, con una fonte finta */

function fonteFinta(lingua, mancanti, opzioni = {}) {
  const { localize, format } = traduttore(lingua, mancanti);
  const traccia = { spese: [], carte: [], avvisi: [], scelti: [], scardinati: [], turni: 0 };
  const stato = {
    riserva: opzioni.riserva ?? 7,
    maghi: [{ id: "a1", nome: "Guendalina", sfere: ["forces", "mind"] }, { id: "a2", nome: "Luca", sfere: ["correspondence", "life"] }],
    png: [{ id: "t1", nome: "Sgherro", sfere: ["entropy", "spirit"], magick: true, arete: 2 }, { id: "t2", nome: "Guardia", sfere: [], magick: false, arete: 1 }],
    attore: null,
    fissati: [{ id: "f0", nome: "Destino Scritto", sfera: "entropy", sferaNome: "Entropia", soglia: 6 }],
    turno: { combattimento: false, chiave: "manuale:1", n: 1, usato: "" }
  };
  const fonte = {
    localize,
    format,
    nomeSfera: (id) => nodo(lingua, `WOD5E_MAGE.Spheres.${id}`) ?? "",
    riserva: () => stato.riserva,
    maghi: () => stato.maghi,
    png: () => stato.png,
    attore: () => stato.attore,
    seleziona: (id) => {
      traccia.scelti.push(id);
      stato.attore = stato.png.find((p) => p.id === id) ?? null;
    },
    fissati: () => stato.fissati,
    scardina: (id) => {
      traccia.scardinati.push(id);
      stato.fissati = stato.fissati.filter((f) => f.id !== id);
    },
    turno: () => stato.turno,
    nuovoTurno: () => {
      traccia.turni += 1;
      stato.turno = { ...stato.turno, n: stato.turno.n + 1, chiave: `manuale:${stato.turno.n + 1}` };
    },
    sogliaDagliAmbiti: (livelli, arete) => Math.max(...Object.values(livelli)) + arete,
    avvisa: (t) => traccia.avvisi.push(t),
    spendi: async (spesa) => {
      if (spesa.paga > stato.riserva) return { ok: false };
      traccia.spese.push(spesa);
      stato.riserva -= spesa.paga;
      if (spesa.lato === "s") stato.turno = { ...stato.turno, usato: spesa.chiaveTurno };
      return { ok: true };
    },
    dichiara: async (spesa, { nascosta }) => traccia.carte.push({ nome: spesa.nome, nascosta })
  };
  return { fonte, stato, traccia };
}

// Il timer dei cinque secondi non deve tenere vivo node: lo si chiude a mano.
async function senzaTimer(menu, fn) {
  await fn();
  clearInterval(menu.tick);
  clearTimeout(menu.via);
}

for (const [nomeLingua, lingua] of [["it", it], ["en", en]]) {
  const mancanti = new Set();
  const { fonte, stato, traccia } = fonteFinta(lingua, mancanti);
  const menu = new MenuCircolare(fonte);
  const giro = () => menu.vista();

  // L'anello: nove Sfere coi sigilli, il nome sotto, i tre cerchi con forma e segno.
  let html = giro();
  assert.equal((html.match(/class="mc-sph /g) ?? []).length, 9);
  assert.equal((html.match(/class="mc-snm"/g) ?? []).length, 9, "il nome sotto ogni Sfera");
  assert.match(html, /mc-sph c-t[^"]*" [^>]*data-a="2"/, "Forza al tavolo (Guendalina)");
  assert.match(html, /mc-sph c-n[^"]*" [^>]*data-a="1"/, "Entropia del nemico (Sgherro)");
  assert.match(html, /mc-sph c-f[^"]*" [^>]*data-a="7"/, "Tempo fuori dal tavolo");
  assert.equal((html.match(/class="mc-skl"/g) ?? []).length, 2, "il teschio sulle due Sfere del nemico");
  assert.equal((html.match(/class="mc-piu"/g) ?? []).length, 3, "il + sulle tre fuori dal tavolo");
  assert.match(html, /mc-hub-n">7</, "la riserva nel mozzo");
  assert.match(html, /mc-fissati[\s\S]*data-mc="scardina" data-a="f0"/, "i fatti fissati sotto la barra");
  assert.ok(!html.includes('data-k="anchor"') && !html.includes('data-k="fan"'), "niente lati né ventaglio prima della Sfera");
  if (nomeLingua === "it") {
    assert.match(html, /Anello doppio col teschio/);
    assert.match(html, />Corrispondenza<\/span>/);
    assert.match(html, />Fatta da<\/small><b>Il Paradosso<\/b>/, "senza token agisce il Paradosso");
  }

  // La Sfera: l'anello gira, la Sfera va sulla linea, si aprono i due lati.
  await menu.esegui("sfera", "1");
  assert.equal(menu.stato.s, 1);
  assert.equal(menu.stato.rot, 50);
  html = giro();
  assert.match(html, /data-k="anchor"/);
  assert.equal((html.match(/data-mc="lato" data-a="[ns]"/g) ?? []).length, 4, "i due lati sulla linea e nel pannello");
  assert.match(html, /mc-panel on/);
  assert.match(html, /mc-snm off/, "i nomi si spengono quando c'è la Sfera");
  if (nomeLingua === "it") {
    assert.match(html, /Del nemico in scena/);
    assert.match(html, /La mossa la fa il nemico: la ragioni dalla sua parte/);
    assert.match(html, /Righe proposte, da provare al tavolo/);
  }
  // Rifare clic sulla stessa Sfera torna all'anello.
  await menu.esegui("sfera", "1");
  assert.equal(menu.stato.s, null);
  assert.equal(menu.stato.rot, 0);

  // Corrispondenza, Combattimento: il ventaglio con Componi in fondo e il turno in vista.
  await menu.esegui("sfera", "0");
  await menu.esegui("lato", "s");
  const sfera = MENU_SFERE[0];
  const mosseS = righeDelLato(sfera, "s");
  html = giro();
  assert.equal((html.match(/data-mc="riga"/g) ?? []).length, mosseS.length + 1);
  assert.match(html, new RegExp(`data-mc="riga" data-a="${COMPONI}"`));
  assert.match(html, /mc-fi fan-[ab]/);
  assert.match(html, /class="mc-turno"/);
  assert.match(html, /<use href="#wod5e-mage-mc-/, "le icone dal foglio di simboli");
  if (nomeLingua === "it") assert.match(html, /Una spesa per turno/);
  // Il passaggio del mouse legge la mossa nel pannello.
  menu.imposta({ hov: mosseS[0].id });
  assert.ok(giro().includes(esc(mosseS[0].testo)));
  menu.imposta({ hov: null });

  // Una mossa: il blocco della spesa, Paghi, la soglia, i pallini, su chi.
  const uno = mosseS.find((r) => r.prezzo === 1) ?? mosseS[0];
  await menu.esegui("riga", uno.id);
  html = giro();
  assert.match(html, /data-mc="spendi"(?! disabled)/);
  assert.equal((html.match(/class="mc-pip( paid)?"/g) ?? []).length, 7, "un pallino per punto");
  assert.match(html, /data-mc="paga" data-a="-1" disabled/, "non si scende sotto 1");
  await menu.esegui("paga", "1");
  assert.equal(menu.stato.paga, 2);
  html = giro();
  assert.equal((html.match(/mc-pip paid/g) ?? []).length, 2, "i vuoti sono quelli che spendi");
  assert.match(html, /mc-sog-n">2</);
  assert.ok(!html.includes('data-mc="durata"'), "la durata si sceglie solo in Narrativa");
  await menu.esegui("chi", "a1");

  // Lo Sgherro selezionato (in Foundry, il token): la spesa è sua.
  await menu.esegui("attoreMenu");
  html = giro();
  assert.match(html, /class="mc-act-m"/);
  assert.match(html, /data-mc="attore" data-a="t1"/);
  await menu.esegui("attore", "t1");
  assert.deepEqual(traccia.scelti, ["t1"]);
  assert.equal(menu.stato.actOpen, false);
  html = giro();
  assert.match(html, /mc-act-b npc/);
  assert.match(html, /mc-c-da npc/);

  await senzaTimer(menu, () => menu.esegui("spendi"));
  assert.equal(traccia.spese.length, 1);
  const [prima] = traccia.spese;
  assert.equal(prima.sfera, "correspondence");
  assert.equal(prima.lato, "s");
  assert.equal(prima.riga, uno.id);
  assert.equal(prima.paga, 2);
  assert.equal(prima.soglia, 2 + (uno.fissa ? 3 : 0));
  assert.deepEqual(prima.suChi, { id: "a1", nome: "Guendalina" });
  assert.deepEqual(prima.da, { id: "t1", nome: "Sgherro" });
  assert.equal(prima.durata, "riga");
  assert.equal(prima.chiaveTurno, "manuale:1");
  assert.equal(stato.riserva, 5);
  assert.equal(menu.stato.pop.stato, "conto", "il pop-up conta");
  assert.equal(menu.stato.row, null, "la scelta si libera");
  html = giro();
  assert.match(html, /mc-pop st-conto/);
  assert.match(html, /data-mc="nascondi"/);
  assert.match(html, /mc-pop-bar" style="width: 100%"/);
  // Nascondi: la carta va solo ai Narratori.
  await senzaTimer(menu, () => menu.esegui("nascondi"));
  assert.deepEqual(traccia.carte, [{ nome: uno.nome, nascosta: true }]);
  assert.equal(menu.stato.pop.stato, "nascosta");

  // Il turno è speso: in Combattimento il bottone si spegne e la spesa non parte.
  await menu.esegui("riga", mosseS[1].id);
  html = giro();
  assert.match(html, /data-mc="spendi" disabled/);
  assert.match(html, /class="mc-c-warn"/);
  assert.equal(await menu.spendi(), false);
  assert.equal(traccia.avvisi.length, 1);
  await menu.esegui("nuovoTurno");
  assert.equal(traccia.turni, 1);
  assert.match(giro(), /data-mc="spendi"(?! disabled)/, "turno nuovo, spesa libera");

  // Componi: la finestra del lancio, già sulla Sfera; il PNG cambia la soglia.
  await menu.esegui("riga", COMPONI);
  assert.equal(menu.stato.win, true);
  html = giro();
  assert.match(html, /class="mc-wv"/);
  assert.match(html, /data-mc="lancia" disabled/, "senza Obiettivo non si lancia");
  assert.equal((html.match(/data-mc="ambito"/g) ?? []).length, 49, "sette Ambiti, sette pallini");
  assert.equal((html.match(/data-mc="sferaEffetto"/g) ?? []).length, 5);
  menu.imposta({ wObj: "Portare i rinforzi" });
  await menu.esegui("ambito", "duration", "2");
  await menu.esegui("effetto", "physical");
  html = giro();
  assert.match(html, /data-mc="lancia"(?! disabled)/);
  if (nomeLingua === "it") assert.match(html, /Soglia del lancio per Sgherro: 4/, "gli Ambiti e l'Areté del PNG");
  await menu.esegui("lancia");
  assert.equal(menu.stato.win, false);
  assert.ok(menu.stato.cast?.testo.startsWith("Portare i rinforzi · "));
  const cast = menu.spendibile();
  assert.equal(cast.spell, true);
  html = giro();
  assert.match(html, /data-mc="riapri"/);
  await senzaTimer(menu, () => menu.spendi());
  assert.equal(traccia.spese.at(-1).durata, "incantesimo");
  assert.equal(traccia.spese.at(-1).nome, menu.t("Lancio.composto"));
  // Una spesa nuova fa partire la carta di quella prima, se contava ancora.
  assert.equal(menu.stato.pop.stato, "conto");

  // L'Effetto di Magick: il Grimorio della Sfera, con la cerca, poi la finestra già compilata.
  await menu.esegui("lato", "n");
  await menu.esegui("riga", idEffettoMagick("correspondence"));
  html = giro();
  const formule = formuleDellaSfera("correspondence");
  assert.equal((html.match(/data-mc="formula"/g) ?? []).length, formule.length);
  assert.match(html, /data-mc-in="gq"/);
  menu.imposta({ gq: "xyzxyz" });
  assert.equal((giro().match(/data-mc="formula"/g) ?? []).length, 0);
  menu.imposta({ gq: "" });
  await menu.esegui("formula", formule[0].id);
  html = giro();
  assert.match(html, /data-mc="formulaVia"/);
  assert.match(html, /data-mc="finestraFormula"/);
  assert.match(html, /data-mc="spendi"/, "la Formula si spende anche senza finestra");
  await menu.esegui("finestraFormula");
  assert.equal(menu.stato.win, true);
  assert.ok(menu.stato.wObj.startsWith(`${formule[0].nome}: `), "l'Obiettivo dalla Formula");
  await menu.esegui("finestraChiudi");
  // In Narrativa la durata si sceglie, e «più a lungo» passa nella spesa.
  await menu.esegui("durata", "lunga");
  await senzaTimer(menu, () => menu.spendi());
  assert.equal(traccia.spese.at(-1).durata, "lunga");
  assert.equal(traccia.spese.at(-1).nome, formule[0].nome);
  assert.deepEqual(traccia.carte.at(-1), { nome: menu.t("Lancio.composto"), nascosta: false }, "la carta di prima è partita al tavolo");

  // Una mossa che fissa: la soglia è il pagato più 3.
  const fissa = MENU_SFERE.flatMap((s, i) => s.righe.map((r) => ({ r, i }))).find(({ r }) => r.fissa && r.lato !== "s");
  if (fissa) {
    await menu.esegui("vai", String(fissa.i), fissa.r.lato === "ns" ? "n" : fissa.r.lato, fissa.r.id);
    assert.equal(menu.stato.row, fissa.r.id);
    assert.match(giro(), /mc-sog-n">4</);
    await senzaTimer(menu, () => menu.spendi());
    assert.equal(traccia.spese.at(-1).fissa, true);
    assert.equal(traccia.spese.at(-1).soglia, 4);
  }

  // La cerca di una mossa per nome, e la tastiera.
  menu.imposta({ q: "pedina" });
  html = giro();
  assert.match(html, /data-mc="vai"/);
  menu.imposta({ q: "" });
  const tasto = (key, tagName = "BUTTON") => {
    const ev = { key, target: { tagName, dataset: {} }, fermo: false, preventDefault() {}, stopPropagation() { this.fermo = true; } };
    menu.tasto(ev);
    return ev;
  };
  menu.allAnello();
  assert.ok(tasto("3").fermo, "i numeri non arrivano alla barra delle macro di Foundry");
  assert.equal(menu.stato.s, 2);
  tasto("c");
  assert.equal(menu.stato.side, "s");
  tasto("1");
  assert.equal(menu.stato.row, righeDelLato(MENU_SFERE[2], "s")[0].id);
  tasto("Escape");
  assert.equal(menu.stato.row, null);
  tasto("Escape");
  assert.equal(menu.stato.side, null);
  tasto("Escape");
  assert.equal(menu.stato.s, null);
  assert.equal(tasto("5", "INPUT").fermo, false, "nei campi i tasti restano al campo");

  // Il fatto scardinato esce.
  await menu.esegui("scardina", "f0");
  assert.deepEqual(traccia.scardinati, ["f0"]);
  assert.ok(!giro().includes('data-k="fissati"'));

  // La riserva vuota spegne la spesa.
  stato.riserva = 0;
  await menu.esegui("sfera", "4");
  await menu.esegui("lato", "n");
  await menu.esegui("riga", righeDelLato(MENU_SFERE[4], "n")[0].id);
  assert.match(giro(), /data-mc="spendi" disabled/);

  // La finestra stretta: il pannello sale dal basso, la legenda diventa un bottone.
  menu.imposta({ W: 700, H: 600 });
  html = giro();
  assert.match(html, /mc-panel sheet on/);
  menu.allAnello();
  menu.imposta({ W: 520, H: 440 });
  assert.match(giro(), /data-mc="legenda"/);

  clearInterval(menu.tick);
  clearTimeout(menu.via);
  assert.deepEqual([...mancanti], [], `${nomeLingua}.json: chiavi che mancano`);
}

// Le stesse chiavi del menù circolare nelle due lingue, e niente trattino lungo nei testi (Blue).
{
  const chiavi = (albero, pre = "") => Object.entries(albero).flatMap(([k, v]) => (v && typeof v === "object" ? chiavi(v, `${pre}${k}.`) : [`${pre}${k}`]));
  assert.deepEqual(chiavi(en.WOD5E_MAGE.MenuCircolare).sort(), chiavi(it.WOD5E_MAGE.MenuCircolare).sort());
  assert.ok(!JSON.stringify(it.WOD5E_MAGE.MenuCircolare).includes("—"), "niente trattino lungo");
  const sorgenti = ["scripts/menu-circolare-ui.js", "scripts/menu-circolare.js", "scripts/quadro-narratore.js", "templates/quadro/contatore.hbs"].map((f) => readFileSync(new URL(f, ROOT), "utf8")).join("\n");
  const usate = new Set([...sorgenti.matchAll(/(?:this\.t|L)\("([A-Za-z0-9.]+)"/g)].map((m) => m[1]));
  for (const m of sorgenti.matchAll(/WOD5E_MAGE\.MenuCircolare\.([A-Za-z0-9.]*[A-Za-z0-9])/g)) usate.add(m[1]);
  for (const chiave of usate) {
    assert.ok(typeof nodo(it.WOD5E_MAGE.MenuCircolare, chiave) === "string", `it.json: manca MenuCircolare.${chiave}`);
    assert.ok(typeof nodo(en.WOD5E_MAGE.MenuCircolare, chiave) === "string", `en.json: manca MenuCircolare.${chiave}`);
  }
}

// Il foglio di simboli: un simbolo per icona, con l'id che le mosse richiamano.
{
  const foglio = foglioIcone();
  assert.equal((foglio.match(/<symbol /g) ?? []).length, Object.keys(MENU_ICONE).length);
  assert.match(foglio, /id="wod5e-mage-mc-quill-ink"/);
}

// Il template e il CSS: il riquadro del menù, i tre cerchi a forme diverse, i sigilli dal modulo.
{
  const menu = readFileSync(new URL("templates/quadro/menu.hbs", ROOT), "utf8");
  assert.match(menu, /data-role="menu-circolare"/);
  assert.ok(!menu.includes("data-action=\"voce\""), "il menù a 65 voci non c'è più");
  const css = readFileSync(new URL("styles/wod5e-mage.css", ROOT), "utf8");
  assert.match(css, /\.wod5e-mage-mc \.mc-sph\.c-n \{[^}]*border-style: double;/);
  assert.match(css, /\.wod5e-mage-mc \.mc-sph\.c-f \{[^}]*border-style: dashed;/);
  assert.match(css, /\.wod5e-mage-mc \.mc-snm \{/);
  assert.match(css, /\.wod5e-mage-mc \.mc-pip\.paid \{[^}]*border-style: dashed;/);
  assert.match(css, /\.wod5e-mage-quadro\.wod5e-mage-chiara \.wod5e-mage-mc \{/, "il tema chiaro");
  assert.match(css, /prefers-reduced-motion[\s\S]*\.wod5e-mage-mc \*/);
  for (const sfera of MENU_SFERE) {
    const url = `../assets/icons/sheet/${sfera.id}.png`;
    assert.ok(css.includes(`.mc-sg-${sfera.id} { mask-image: url("${url}")`), `il sigillo di ${sfera.id}`);
    assert.ok(existsSync(new URL(`assets/icons/sheet/${sfera.id}.png`, ROOT)), `il file di ${sfera.id}`);
  }
  assert.ok(!/\.wod5e-mage-menu-(cassetto|voce|spesa|testa)\b/.test(css), "via gli stili del menù a 65 voci");
}

console.log("Menu circolare tests passed.");
