import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  ADDOSSO_FLAG,
  addossoDopo,
  avanzaOrologio,
  campiSpesa,
  cassettiPerScena,
  contoRitmo,
  COPIA_FLAG,
  copiaDaCarta,
  COPPIE_OROLOGIO,
  coppiaLibera,
  etichettaVolgare,
  FAMIGLIE_PARADOSSO,
  inizioSessione,
  isOrologioParadosso,
  MAGHI_SETTING,
  MENU_PARADOSSO,
  MODI_QUADRO,
  nuovoOrologioParadosso,
  prezzoVoce,
  QUADRO_SETTING,
  recordAddosso,
  renderCartaVoce,
  righeAddosso,
  SCENA_SETTING,
  SCENE_PARADOSSO,
  scattaPredefinito,
  scenaById,
  voceById,
  volgariRecenti
} from "../scripts/menu-paradosso.js";

// Il menù del Paradosso (24/9): le 65 voci del PDF, otto famiglie, nove scene.
assert.equal(MENU_PARADOSSO.length, 65);
assert.deepEqual([...FAMIGLIE_PARADOSSO], ["tocchi", "comuni", "scena", "scettro", "presenze", "orologi", "ancore", "grandi"]);
assert.equal(SCENE_PARADOSSO.length, 9);
assert.deepEqual([...MODI_QUADRO], ["contatore", "menu", "giocatori"]);
assert.equal(ADDOSSO_FLAG, "paradossoAddosso");
assert.equal(COPIA_FLAG, "paradossoCopiato");
assert.equal(SCENA_SETTING, "scenaParadosso");
assert.equal(MAGHI_SETTING, "quadroMaghi");
assert.equal(QUADRO_SETTING, "quadroParadosso");
{
  const conto = {};
  for (const voce of MENU_PARADOSSO) conto[voce.famiglia] = (conto[voce.famiglia] ?? 0) + 1;
  assert.deepEqual(conto, { tocchi: 6, comuni: 6, presenze: 3, orologi: 6, ancore: 5, scena: 14, scettro: 21, grandi: 4 });
  const ids = MENU_PARADOSSO.map((voce) => voce.id);
  assert.equal(new Set(ids).size, ids.length, "id doppi nel menù");
  for (const voce of MENU_PARADOSSO) {
    assert.ok(["immediato", "annunciato", "nascosto", "scoppio"].includes(voce.modo), `${voce.id}: modo ${voce.modo}`);
    assert.ok(["fisso", "soglia", "suaSoglia", "pallino", "orologioRimbalzo"].includes(voce.prezzo.tipo), `${voce.id}: prezzo ${voce.prezzo.tipo}`);
    assert.ok(voce.quando && voce.effetto, `${voce.id}: senza quando o effetto`);
    // La riga breve e il prezzo breve (24/9 notte): ogni voce li ha, corti.
    assert.ok(voce.breve && voce.breve.length <= 90, `${voce.id}: riga breve ${voce.breve}`);
    assert.ok(voce.prezzo.breve && voce.prezzo.breve.length <= 22, `${voce.id}: prezzo breve ${voce.prezzo.breve}`);
    // I Tocchi si chiamano Conseguenze Magick: la parola vecchia non resta in nessun testo.
    assert.ok(!/\bTocc[oh]/.test(JSON.stringify(voce)), `${voce.id}: c'è ancora «Tocco»`);
    assert.ok(voce.mosse.length >= 1 && voce.mosse.length <= 3, `${voce.id}: da una a tre mosse`);
    assert.ok(["", "lancio", "turno", "scena", "sessione"].includes(voce.durata), `${voce.id}: durata ${voce.durata}`);
    if (voce.famiglia === "grandi") assert.equal(voce.modo, "scoppio", `${voce.id}: i Grandi arrivano allo scoppio`);
    if (voce.famiglia === "scena" || voce.famiglia === "scettro") assert.ok(voce.scena, `${voce.id}: senza scena`);
    else assert.equal(voce.scena, "", `${voce.id}: una comune con la scena`);
  }
  // Le comuni hanno la faccia in tutte e nove le scene.
  for (const voce of MENU_PARADOSSO.filter((v) => v.famiglia === "comuni")) {
    assert.equal(Object.keys(voce.facce).length, 9, `${voce.id}: facce ${Object.keys(voce.facce).length}`);
  }
  // Ogni scena ha la faccia delle quattro famiglie richiamate (Tocco, Presenza, Orologio, Ancora).
  for (const scena of SCENE_PARADOSSO) {
    assert.deepEqual(Object.keys(scena.facce).sort(), ["ancore", "orologi", "presenze", "tocchi"], `${scena.id}: facce di famiglia`);
  }
  // Le Presenze si pagano con la loro soglia e aprono l'orologio dell'arrivo.
  for (const voce of MENU_PARADOSSO.filter((v) => v.presenza)) {
    assert.equal(voce.prezzo.tipo, "suaSoglia", `${voce.id}: una Presenza costa la sua soglia`);
    assert.equal(voce.durata, "", `${voce.id}: una Presenza non sta addosso`);
  }
}

// La lista per scena: i cassetti nell'ordine delle famiglie, le voci della scena e le facce.
{
  const cassetti = cassettiPerScena("combattimento");
  assert.deepEqual(cassetti.map((c) => c.famiglia), [...FAMIGLIE_PARADOSSO]);
  const scettro = cassetti.find((c) => c.famiglia === "scettro");
  assert.ok(scettro.voci.some((v) => v.id === "combattimento-rinforzo"), "Rinforzo sta nello scettro di Combattimento");
  assert.ok(scettro.voci.every((v) => v.scena === "combattimento"), "solo lo scettro di Combattimento");
  assert.equal(cassetti.find((c) => c.famiglia === "scena").conto, 0, "in Combattimento le cinque voci sono tutte scettro");
  const rituale = cassettiPerScena("rituale").find((c) => c.famiglia === "scena");
  assert.ok(rituale.voci.some((v) => v.id === "rituale-ospite") && rituale.voci.every((v) => v.scena === "rituale"), "le voci di Rituale");
  const comuni = cassetti.find((c) => c.famiglia === "comuni");
  assert.ok(comuni.voci.every((v) => v.faccia && v.faccia.testo), "le comuni portano la faccia della scena");
  assert.ok(cassetti.find((c) => c.famiglia === "tocchi").faccia, "la faccia di famiglia dei Tocchi");
  // Senza scena: niente voci di scena, nessuna faccia.
  const senza = cassettiPerScena("");
  assert.equal(senza.find((c) => c.famiglia === "scena").conto, 0);
  assert.equal(senza.find((c) => c.famiglia === "scettro").conto, 0);
  assert.ok(senza.find((c) => c.famiglia === "comuni").voci.every((v) => v.faccia === null));
  // La cerca tiene solo i cassetti con qualcosa dentro.
  const cerca = cassettiPerScena("rituale", { cerca: "ospite" });
  assert.ok(cerca.length >= 1 && cerca.every((c) => c.conto > 0));
  assert.ok(cerca.some((c) => c.voci.some((v) => v.id === "rituale-ospite")));
  assert.equal(scenaById("citta").nome, "Città");
  assert.equal(scenaById("nessuna"), null);
  assert.equal(voceById("niente"), null);
}

// Il prezzo: fisso, la soglia del Volgare, la soglia di chi entra, a pallini, più il rimbalzo.
{
  const tocco = MENU_PARADOSSO.find((v) => v.famiglia === "tocchi");
  assert.equal(prezzoVoce(tocco), tocco.prezzo.valore);
  const soglia = MENU_PARADOSSO.find((v) => v.prezzo.tipo === "soglia");
  assert.equal(prezzoVoce(soglia), null, "senza il Volgare il prezzo manca");
  assert.equal(prezzoVoce(soglia, { soglia: 5 }), 5);
  const presenza = MENU_PARADOSSO.find((v) => v.presenza);
  assert.equal(prezzoVoce(presenza, { suaSoglia: 4 }), 4);
  assert.equal(prezzoVoce(presenza, { suaSoglia: 0 }), null);
  const pallino = MENU_PARADOSSO.find((v) => v.prezzo.tipo === "pallino");
  assert.equal(prezzoVoce(pallino, { pallini: 2 }), pallino.prezzo.valore * 2);
  assert.equal(prezzoVoce(pallino, { pallini: 99 }), pallino.prezzo.valore * pallino.prezzo.massimo, "non oltre il massimo");
  assert.equal(prezzoVoce(pallino, { pallini: 0 }), pallino.prezzo.valore, "almeno un pallino");
  const carica = MENU_PARADOSSO.find((v) => v.prezzo.tipo === "orologioRimbalzo");
  assert.equal(prezzoVoce(carica, { rimbalzo: 3 }), carica.prezzo.valore + 3);
  assert.equal(prezzoVoce({ prezzo: { tipo: "boh" } }), null);
  // I campi che la spesa chiede.
  assert.deepEqual(campiSpesa(soglia), { soglia: true, suaSoglia: false, pallini: false, rimbalzo: false, orologio: Boolean(soglia.prezzo.orologio), ancora: false, vuole: false });
  const campiPresenza = campiSpesa(presenza);
  assert.ok(campiPresenza.suaSoglia && campiPresenza.orologio && campiPresenza.vuole, "una Presenza chiede la soglia, l'orologio e cosa vuole");
  assert.ok(campiSpesa(MENU_PARADOSSO.find((v) => v.famiglia === "orologi")).orologio);
  assert.ok(campiSpesa(MENU_PARADOSSO.find((v) => v.famiglia === "ancore")).ancora);
  assert.ok(campiSpesa(carica).rimbalzo);
}

// Gli ultimi Volgari in chat, dal più recente, dopo la Nuova sessione.
{
  const carta = (id, extra = {}) => ({
    id,
    timestamp: extra.timestamp ?? 1000,
    speaker: { actor: extra.actor ?? "a1", alias: extra.alias ?? "Guendalina" },
    flavor: "<b>Muro di ghiaccio</b>\nAltro",
    flags: { "wod5e-mage": { rollCard: { vulgar: extra.vulgar ?? true, advancedDifficulty: extra.testimoni ?? false, threshold: extra.threshold ?? 5, title: extra.title, round: extra.round ?? 0 } } }
  });
  const volgari = volgariRecenti([carta("m1", { timestamp: 500 }), carta("m2", { title: "Fulmine", threshold: 3, testimoni: true, round: 2 }), { id: "m3", flags: {} }, carta("m4", { vulgar: false })], { dal: 800 });
  assert.equal(volgari.length, 1, "i lanci di prima della sessione e i non Volgari non contano");
  assert.deepEqual(volgari[0], { messageId: "m2", actorId: "a1", actorName: "Guendalina", titolo: "Fulmine", soglia: 3, testimoni: true, quando: 1000, round: 2 });
  const senzaTitolo = volgariRecenti([carta("m5")]);
  assert.equal(senzaTitolo[0].titolo, "Muro di ghiaccio", "senza titolo vale la prima riga del flavor, senza tag");
  const flavorACapo = { ...carta("m6"), flavor: "<div class=\"x\">\n  <b>Lama</b> di fuoco<br>altro</div>" };
  assert.equal(volgariRecenti([flavorACapo])[0].titolo, "Lama di fuoco", "la prima riga piena, non quella vuota prima del tag");
  // L'etichetta della tendina: senza i pezzi vuoti (il «Al · · Volgare» del collaudo del 24/9 notte).
  assert.equal(etichettaVolgare({ actorName: "Guendalina", titolo: "Fulmine", testimoni: true, soglia: 5 }, (k) => k.split(".").pop()), "Guendalina · Fulmine · ConTestimoni · Soglia 5");
  assert.equal(etichettaVolgare({ actorName: "", titolo: "", testimoni: false, soglia: 7 }, (k) => k.split(".").pop()), "Volgare · Soglia 7");
  assert.equal(volgariRecenti([carta("a"), carta("b"), carta("c")], { massimo: 2 }).length, 2);
  assert.equal(volgariRecenti([carta("a"), carta("b")])[0].messageId, "b", "dal più recente");
  // La copia automatica: 1 punto per un Volgare, 2 con testimoni, niente se già copiato o non Volgare.
  assert.deepEqual(copiaDaCarta({ rollCard: { vulgar: true } }), { points: 1, testimoni: false });
  assert.deepEqual(copiaDaCarta({ rollCard: { vulgar: true, advancedDifficulty: true } }), { points: 2, testimoni: true });
  assert.equal(copiaDaCarta({ rollCard: { vulgar: true }, paradossoCopiato: true }), null);
  assert.equal(copiaDaCarta({ rollCard: { vulgar: false } }), null);
  assert.equal(copiaDaCarta({}), null);
}

// Gli effetti addosso al mago: la riga, quando scade, l'ordine.
{
  const tremore = voceById("tremore");
  assert.equal(tremore.durata, "lancio");
  const riga = recordAddosso(tremore, { id: "r1", scena: 2, round: 3, risponde: "Fulmine", quando: 10 });
  assert.equal(riga.id, "r1");
  assert.equal(riga.voce, "tremore");
  assert.equal(riga.durata, "lancio");
  assert.equal(riga.scena, 2);
  assert.equal(riga.round, 3);
  assert.equal(riga.risponde, "Fulmine");
  const senzaId = recordAddosso(tremore, { quando: 10 });
  assert.equal(senzaId.id, "tremore-10");
  assert.equal(recordAddosso({ id: "x", durata: "boh" }, { quando: 1 }).durata, "scena", "una durata ignota vale per la scena");
  const addosso = {
    a: recordAddosso(tremore, { id: "a", quando: 1 }),
    b: recordAddosso(voceById("condizione"), { id: "b", quando: 2 }),
    c: recordAddosso(voceById("fiacco"), { id: "c", quando: 3 }),
    d: recordAddosso(voceById("scottatura"), { id: "d", quando: 4 })
  };
  assert.deepEqual(Object.keys(addossoDopo(addosso, "lancio")), ["b", "c", "d"], "un lancio spegne il Tremore");
  assert.deepEqual(Object.keys(addossoDopo(addosso, "turno")), ["c", "d"]);
  assert.deepEqual(Object.keys(addossoDopo(addosso, "scena")), ["d"]);
  assert.deepEqual(Object.keys(addossoDopo(addosso, "sessione")), []);
  assert.deepEqual(Object.keys(addossoDopo(addosso, "boh")), ["a", "b", "c", "d"], "un evento ignoto non spegne niente");
  assert.deepEqual(righeAddosso({ d: addosso.d, a: addosso.a, x: null }).map((r) => r.id), ["a", "d"]);
}

// Gli orologi del Paradosso: coppie colore e forma mai uguali, il formato del modulo Orologio, l'avanzata.
{
  assert.equal(COPPIE_OROLOGIO.length, 6);
  assert.equal(new Set(COPPIE_OROLOGIO.map((c) => c.colore)).size, 6, "sei colori diversi");
  assert.equal(new Set(COPPIE_OROLOGIO.map((c) => c.forma)).size, 6, "sei forme diverse");
  assert.deepEqual(coppiaLibera([]), { colore: "viola", forma: "cerchio" });
  assert.deepEqual(coppiaLibera([{ colore: "viola", forma: "cerchio" }]), { colore: "ambra", forma: "quadrato" });
  assert.deepEqual(coppiaLibera([{ colore: "viola", forma: "quadrato" }]), { colore: "ambra", forma: "quadrato" }, "un colore già in uso si evita anche con un'altra forma");
  assert.deepEqual(coppiaLibera(COPPIE_OROLOGIO.map((c) => ({ ...c }))), { colore: "viola", forma: "cerchio" }, "sei orologi aperti: si ricomincia");
  const orologio = nuovoOrologioParadosso({ id: "o1", titolo: "Carica", segmenti: 4, visibile: false, colore: "ambra", forma: "quadrato", scatta: "il rimbalzo", voce: "carica", actorId: "a1", ordine: 7 });
  assert.equal(orologio.id, "o1");
  assert.equal(orologio.segmenti, 4);
  assert.equal(orologio.pieni, 0);
  assert.equal(orologio.senzaTimer, true);
  assert.equal(orologio.manualeScatena, true);
  assert.equal(orologio.visibile, false);
  assert.equal(orologio.colore, "ambra");
  assert.equal(orologio.forma, "quadrato");
  assert.equal(orologio.nomi.length, 4);
  assert.equal(orologio.durate.length, 4);
  assert.deepEqual(orologio.eventi, { "4": [{ tipo: "chat", bersaglio: "", testo: "il rimbalzo", soloNarratore: true }] }, "l'evento in chat sull'ultimo segmento, solo ai Narratori se nascosto");
  assert.deepEqual(orologio.paradosso, { voce: "carica", scatta: "il rimbalzo", actorId: "a1" });
  assert.ok(isOrologioParadosso(orologio));
  assert.ok(!isOrologioParadosso({ id: "x" }));
  assert.equal(nuovoOrologioParadosso({ segmenti: 1, ordine: 3 }).segmenti, 3, "almeno tre segmenti");
  assert.equal(nuovoOrologioParadosso({ segmenti: 40, ordine: 3 }).segmenti, 16, "al massimo sedici");
  assert.equal(nuovoOrologioParadosso({ ordine: 3 }).id, "paradosso-3");
  // Cosa scatta, precompilato per la voce.
  const l = (k) => k.split(".").pop();
  const f = (k, d) => `${k.split(".").pop()}:${d.nome}`;
  assert.equal(scattaPredefinito(voceById("carica"), { rimbalzo: "Residuo" }, l, f), "Residuo");
  assert.equal(scattaPredefinito(voceById("nascosto"), {}, l, f), "", "senza rimbalzo scelto resta vuoto");
  assert.equal(scattaPredefinito(voceById("ombra"), { chi: "l'Ombra di Guendalina" }, l, f), "ScattaEntra:l'Ombra di Guendalina");
  assert.equal(scattaPredefinito(voceById("ombra"), {}, l, f), "ScattaEntra:Ombra");
  assert.equal(scattaPredefinito(voceById("arrivo"), {}, l, f), "ScattaEntra:presenze");
  assert.equal(scattaPredefinito(voceById("scadenza"), { risponde: "Fulmine" }, l, f), "ScattaCade:Fulmine");
  assert.equal(scattaPredefinito(voceById("ancora"), {}, l, f), "ScattaChiamata");
  assert.equal(scattaPredefinito(voceById("il-ritmo"), {}, l, f), "ScattaChiamata");
  assert.equal(scattaPredefinito(voceById("ciclo"), {}, l, f), "ScattaTocco");
  assert.equal(scattaPredefinito(voceById("combattimento-rinforzo"), {}, l, f), "ScattaEntra:Rinforzo");
  assert.equal(scattaPredefinito(null), "");
  assert.deepEqual(nuovoOrologioParadosso({ ordine: 3 }).eventi, {}, "senza testo, niente evento");
  let passo = avanzaOrologio({ ...orologio, segmenti: 2 });
  assert.equal(passo.orologio.pieni, 1);
  assert.equal(passo.scattato, false);
  passo = avanzaOrologio(passo.orologio);
  assert.equal(passo.orologio.pieni, 2);
  assert.equal(passo.scattato, true);
  passo = avanzaOrologio(passo.orologio);
  assert.equal(passo.orologio.pieni, 2, "pieno resta pieno");
  assert.equal(passo.scattato, false);
}

// La carta in chat: il banner col modo, il Segno solo se annunciata, le mosse come chip, il Poi; niente prezzo.
{
  const ritorno = voceById("ritorno");
  assert.equal(ritorno.modo, "annunciato");
  const html = renderCartaVoce(ritorno, { risponde: "Muro di ghiaccio · Guendalina", suChi: "Guendalina", dettagli: [{ chiave: "Orologio", valore: "4 segmenti" }, { chiave: "Vuoto", valore: "" }], testo: "il muro <sfarfalla>" });
  assert.ok(html.includes("wod5e-mage-menu-card") && html.includes("wod5e-mage-paradosso-banner"));
  assert.ok(html.includes("WOD5E_MAGE.Paradosso.CardTitle · Ritorno <small>WOD5E_MAGE.Menu.Modo.annunciato</small>"));
  assert.ok(html.includes("WOD5E_MAGE.Menu.Risponde") && html.includes("Muro di ghiaccio · Guendalina"));
  assert.ok(html.includes("WOD5E_MAGE.Menu.SuChi"));
  assert.ok(html.includes("WOD5E_MAGE.Menu.Segno") && html.includes(`<em>${ritorno.segno.replace(/"/g, "&quot;")}</em>`), "il Segno di un'annunciata");
  assert.ok(html.includes("WOD5E_MAGE.Menu.EffettoDopo"));
  assert.ok(html.includes("4 segmenti") && !html.includes("Vuoto"), "i dettagli vuoti non vanno in carta");
  assert.ok(html.includes("il muro &lt;sfarfalla&gt;"), "il testo del Narratore è protetto");
  assert.equal((html.match(/wod5e-mage-menu-mossa/g) ?? []).length, 3, "le tre mosse");
  assert.ok(html.includes("wod5e-mage-menu-poi"));
  assert.ok(!html.includes(ritorno.prezzo.testo), "il prezzo non va in chat");
  const residuo = voceById("residuo");
  assert.equal(residuo.modo, "immediato");
  const subito = renderCartaVoce(residuo, {}, (key) => key.split(".").pop());
  assert.ok(subito.includes("Effetto") && !subito.includes("Segno") && !subito.includes("Risponde"));
  assert.ok(subito.includes("· Residuo <small>immediato</small>"));
}

// Il ritmo: le spese del menù in questa scena, per mago, e in questo giro.
{
  const log = [
    { kind: "session", when: 100 },
    { kind: "menu", scena: 1, round: 0, actorId: "a" },
    { kind: "menu", scena: 2, round: 3, actorId: "a" },
    { kind: "menu", scena: 2, round: 3, actorId: "b" },
    { kind: "menu", scena: 2, round: 4, actorId: "a" },
    { kind: "spend", scena: 2, round: 4 },
    { kind: "session", when: 200 }
  ];
  assert.deepEqual(contoRitmo(log, { scena: 2, round: 3 }), { scena: 3, perMago: { a: 2, b: 1 }, turno: 2 });
  assert.deepEqual(contoRitmo(log, { scena: 2 }), { scena: 3, perMago: { a: 2, b: 1 }, turno: 0 }, "senza combattimento il giro non conta");
  assert.deepEqual(contoRitmo([], { scena: 1 }), { scena: 0, perMago: {}, turno: 0 });
  assert.equal(inizioSessione(log), 200, "l'ultima Nuova sessione");
  assert.equal(inizioSessione([{ kind: "menu" }]), 0);
}

// La finestra (quadro-narratore.js): tre modi con un bottone, le famiglie chiuse, gli effetti attivi per mago (Blue, 24/9).
{
  const quadro = readFileSync(new URL("../scripts/quadro-narratore.js", import.meta.url), "utf8");
  assert.ok(quadro.includes('modo: QuadroNarratore.#modo') || quadro.includes("modo:"), "l'azione del modo");
  assert.ok(quadro.includes('options.parts = ["testa", this.modo]'), "una PART per modo, dietro la testa");
  assert.ok(quadro.includes("#cassetti = new Set()"), "le famiglie partono chiuse");
  assert.ok(quadro.includes("setApriQuadro("), "la barra apre il Quadro senza importarlo");
  const testa = readFileSync(new URL("../templates/quadro/testa.hbs", import.meta.url), "utf8");
  assert.equal((testa.match(/data-action="modo"/g) ?? []).length, 1, "i modi in un {{#each}}");
  const menu = readFileSync(new URL("../templates/quadro/menu.hbs", import.meta.url), "utf8");
  assert.ok(menu.includes('data-action="cassetto"') && menu.includes('data-action="spendi"') && menu.includes('data-testo="{{voce.testoCerca}}"'));
  for (const marker of ['<span class="breve">{{voce.breve}}</span>', 'data-role="titolo"', 'wod5e-mage-menu-segmenti', 'data-role="scatta"', 'data-nome="{{r.nome}}"', "{{#each voce.bersagli as |m|}}", "WOD5E_MAGE.Menu.NessunaVoceQui"]) {
    assert.ok(menu.includes(marker), `menu.hbs: manca ${marker}`);
  }
  assert.ok(!menu.includes("{{lowercase"), "niente helper che Foundry non ha");
  const giocatori = readFileSync(new URL("../templates/quadro/giocatori.hbs", import.meta.url), "utf8");
  for (const marker of ['data-action="magoAggiungi"', 'data-action="attivoTogli"', 'data-action="schedaApri"', "WOD5E_MAGE.Menu.Attivi", "WOD5E_MAGE.Menu.Passivi", "WOD5E_MAGE.Menu.MagickInAtto"]) {
    assert.ok(giocatori.includes(marker), `giocatori.hbs: manca ${marker}`);
  }
  const sessione = readFileSync(new URL("../templates/dialogs/nuova-sessione-narratore.hbs", import.meta.url), "utf8");
  assert.ok(sessione.includes('name="mago"') && sessione.includes('name="scena"'), "la Nuova sessione: il Narratore sceglie i maghi");
  // Le chiavi di lingua usate dal Quadro esistono in it.json e en.json.
  const it = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8")).WOD5E_MAGE;
  const en = JSON.parse(readFileSync(new URL("../lang/en.json", import.meta.url), "utf8")).WOD5E_MAGE;
  const sorgenti = ["scripts/quadro-narratore.js", "scripts/menu-paradosso.js", "scripts/paradosso-narratore.js", "templates/quadro/testa.hbs", "templates/quadro/contatore.hbs", "templates/quadro/menu.hbs", "templates/quadro/giocatori.hbs", "templates/dialogs/nuova-sessione-narratore.hbs", "templates/dialogs/cambio-scena.hbs", "templates/dialogs/aggiungi-maghi.hbs"]
    .map((file) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8")).join("\n");
  const chiavi = new Set([...sorgenti.matchAll(/WOD5E_MAGE\.((?:Menu|Paradosso)\.[A-Za-z0-9_.]*[A-Za-z0-9_])/g)].map((m) => m[1]));
  const leggi = (albero, chiave) => chiave.split(".").reduce((nodo, parte) => (nodo && typeof nodo === "object" ? nodo[parte] : undefined), albero);
  for (const chiave of chiavi) {
    assert.ok(leggi(it, chiave) !== undefined, `it.json: manca WOD5E_MAGE.${chiave}`);
    assert.ok(leggi(en, chiave) !== undefined, `en.json: manca WOD5E_MAGE.${chiave}`);
  }
  for (const gruppo of ["Modi", "Posti", "Famiglie", "Modo", "Forme", "Colori", "Durata"]) {
    assert.deepEqual(Object.keys(en.Menu[gruppo]), Object.keys(it.Menu[gruppo]), `Menu.${gruppo}: le stesse chiavi nelle due lingue`);
  }
  assert.deepEqual(Object.keys(en.Menu), Object.keys(it.Menu), "Menu: le stesse chiavi nelle due lingue");
  assert.equal(it.Menu.Famiglie.tocchi, "Conseguenze Magick", "Blue, 24/9 notte: «I Tocchi non si può sentire»");
  // Il CSS: i tasti della cornice non prendono il font dei bottoni del Quadro; i riquadri del corpo non si schiacciano; la carta in chat a righe.
  const css = readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8");
  assert.doesNotMatch(css, /\.application\.wod5e-mage-quadro button \{/, "niente regola su tutti i bottoni della finestra: spegneva la X della cornice");
  assert.match(css, /\.application\.wod5e-mage-quadro \.wod5e-mage-quadro-corpo > \* \{\s*flex: 0 0 auto;/);
  assert.match(css, /\.wod5e-mage-menu-card \.wod5e-mage-roll-row \{\s*display: block;/);
}

console.log("Menu paradosso tests passed.");
