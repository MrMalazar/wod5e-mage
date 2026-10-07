import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import {
  CELLE,
  FINE,
  GRADINI,
  LATI,
  PASSI,
  SAGGEZZA_SUCCESS_FROM,
  applicaAncora,
  applicaRisplende,
  cancello,
  celleSaggezza,
  clampPasso,
  dadiSaggezza,
  esitoAtto,
  esitoIndulgere,
  fineDi,
  getWisdom,
  mettiSegno,
  normalizeAncora,
  normalizeAtto,
  normalizeLato,
  normalizeRisplende,
  normalizeSaggezza,
  passoLabel,
  passoTesto,
  renderEsitoSaggezza,
  riservaSaggezza,
  spostaSegno,
  tavolaGradini,
  testoEsito,
  wisdomAfterSession
} from "../scripts/wisdom.js";

// La Saggezza come bilancia (Blue, 3/10): nove caselle, Caduto a sinistra e
// Folle a destra, due segni indipendenti che partono dal centro; il quarto
// passo è la fine. La riserva è Fermezza + Autocontrollo, un 8 riesce.
assert.deepEqual([...LATI], ["hubris", "silenzio"]);
assert.deepEqual([PASSI, FINE, GRADINI, SAGGEZZA_SUCCESS_FROM, CELLE], [3, 4, 7, 8, 9]);
assert.deepEqual([clampPasso(-2), clampPasso("2"), clampPasso(9), clampPasso(undefined)], [0, 2, 4, 0]);
assert.deepEqual([normalizeLato("hubris"), normalizeLato("silenzio"), normalizeLato("x"), normalizeLato()], ["hubris", "silenzio", "", ""]);

// La bandiera letta: niente, la fila vecchia con le macchie, i due segni.
assert.deepEqual(normalizeSaggezza(undefined), { hubris: 0, silenzio: 0, risplende: false, ancore: {} });
assert.deepEqual(normalizeSaggezza({ superficial: 2, aggravated: 1, max: 8 }), { hubris: 0, silenzio: 0, risplende: false, ancore: {} }, "le macchie di prima si ignorano: si riparte dal centro");
assert.deepEqual(normalizeSaggezza({ hubris: "2", silenzio: 7, risplende: 1, ancore: { a1: true, a2: false, a3: 1 } }), { hubris: 2, silenzio: 4, risplende: true, ancore: { a1: true, a3: true } });

const actor = (attributes, wisdom, extra = {}) => ({
  system: { attributes },
  getFlag: (_module, key) => (key === "wisdom" ? wisdom : extra[key])
});
assert.equal(riservaSaggezza(actor({ resolve: { value: 3 }, composure: { value: 2 } })), 5);
assert.equal(riservaSaggezza(actor({})), 0);
// I dadi: la riserva meno la soglia; con 10 e un atto del 7 restano 3; sotto zero non si para.
assert.deepEqual([dadiSaggezza(10, 7), dadiSaggezza(5, 5), dadiSaggezza(3, 6), dadiSaggezza(4, 0)], [3, 0, 0, 4]);

// Il cancello: il segno scende solo se il gradino supera il passo dove sta.
assert.equal(cancello(1, 0), true);
assert.equal(cancello(2, 2), false);
assert.equal(cancello(3, 2), true);
assert.equal(cancello(7, 3), true);
assert.equal(cancello(0, 0), false, "senza gradino niente");

const centro = normalizeSaggezza();
assert.deepEqual(spostaSegno(centro, "hubris", 1), { ...centro, hubris: 1 });
assert.deepEqual(spostaSegno({ ...centro, silenzio: 4 }, "silenzio", 1).silenzio, 4, "oltre la fine non si va");
assert.deepEqual(spostaSegno({ ...centro, hubris: 1 }, "hubris", -3).hubris, 0, "sotto il centro non si va");
assert.deepEqual(spostaSegno(centro, "x", 1), centro, "senza lato niente si muove");
assert.deepEqual(mettiSegno(centro, "silenzio", 3), { ...centro, silenzio: 3 });
assert.deepEqual(mettiSegno(centro, "hubris", 9).hubris, 4);
assert.deepEqual([fineDi(centro), fineDi({ hubris: 4 }), fineDi({ silenzio: 4 }), fineDi({ hubris: 3, silenzio: 3 })], ["", "hubris", "silenzio", ""]);

// L'atto: il cancello tiene, nessuna Convinzione copre, la Convinzione copre e il tiro va o no.
assert.deepEqual(esitoAtto({ ...centro, hubris: 2 }, { lato: "hubris", gradino: 2 }), { esito: "cancello", sposta: false, lato: "hubris", passo: 2, next: { ...centro, hubris: 2 } });
assert.deepEqual(esitoAtto(centro, { lato: "silenzio", gradino: 1 }), { esito: "scoperto", sposta: true, lato: "silenzio", passo: 1, next: { ...centro, silenzio: 1 } });
assert.deepEqual(esitoAtto(centro, { lato: "hubris", gradino: 3, copre: true, successi: 1 }), { esito: "coperto", sposta: false, lato: "hubris", passo: 0, next: centro });
assert.deepEqual(esitoAtto(centro, { lato: "hubris", gradino: 3, copre: true, successi: 0 }), { esito: "fallito", sposta: true, lato: "hubris", passo: 1, next: { ...centro, hubris: 1 } });
assert.equal(esitoAtto({ ...centro, hubris: 3 }, { lato: "hubris", gradino: 7 }).next.hubris, 4, "dal terzo passo l'atto grave porta alla fine: Caduto");
assert.equal(esitoAtto(centro, { gradino: 5 }).esito, "cancello", "senza lato niente si muove");
// Il segno dell'altro lato non c'entra: i due sono indipendenti.
assert.deepEqual(esitoAtto({ ...centro, silenzio: 3 }, { lato: "hubris", gradino: 1 }).next, { ...centro, silenzio: 3, hubris: 1 });

// L'Indulgere: niente cancello, il tiro fallito è sempre un passo verso quel lato.
assert.deepEqual(esitoIndulgere({ ...centro, hubris: 3 }, { lato: "hubris", successi: 0 }), { esito: "fallito", sposta: true, lato: "hubris", passo: 4, next: { ...centro, hubris: 4 } });
assert.deepEqual(esitoIndulgere({ ...centro, hubris: 3 }, { lato: "hubris", successi: 2 }), { esito: "coperto", sposta: false, lato: "hubris", passo: 3, next: { ...centro, hubris: 3 } });
assert.equal(esitoIndulgere(centro, { lato: "", successi: 0 }).sposta, false);

// Risplende: un passo indietro e la bandiera della sessione; al centro riaccende e basta.
assert.deepEqual(applicaRisplende({ ...centro, silenzio: 2 }, "silenzio"), { ...centro, silenzio: 1, risplende: true, tornato: true });
assert.deepEqual(applicaRisplende(centro, "hubris"), { ...centro, risplende: true, tornato: false });
// L'Ancora: riuscito il tiro (o concesso) il segno torna indietro; comunque l'Ancora è usata per la storia.
assert.deepEqual(applicaAncora({ ...centro, hubris: 2 }, "hubris", "a1", { riuscito: true }), { ...centro, hubris: 1, ancore: { a1: true }, tornato: true });
assert.deepEqual(applicaAncora({ ...centro, hubris: 2, ancore: { a0: true } }, "hubris", "a1", { riuscito: false }), { ...centro, hubris: 2, ancore: { a0: true, a1: true }, tornato: false });
assert.deepEqual(wisdomAfterSession({ hubris: 1, silenzio: 0, risplende: true, ancore: { a1: true } }), { hubris: 1, silenzio: 0, risplende: false, ancore: { a1: true } }, "la nuova sessione ridà il Risplende e lascia le Ancore");

// Le nove caselle: da Caduto (0) a Folle (8), il centro in mezzo, i segni sopra.
{
  const cells = celleSaggezza({ hubris: 2, silenzio: 0 });
  assert.equal(cells.length, 9);
  assert.deepEqual(cells.map((c) => c.lato), ["hubris", "hubris", "hubris", "hubris", "centro", "silenzio", "silenzio", "silenzio", "silenzio"]);
  assert.deepEqual(cells.map((c) => c.passo), [4, 3, 2, 1, 0, 1, 2, 3, 4]);
  assert.deepEqual(cells.filter((c) => c.fine).map((c) => c.index), [0, 8]);
  assert.deepEqual(cells.filter((c) => c.hubris).map((c) => c.index), [2], "il segno dell'Hubris al secondo passo sta sulla terza casella");
  assert.deepEqual(cells.filter((c) => c.silenzio).map((c) => c.index), [4], "quello del Silenzio al centro");
  const entrambi = celleSaggezza(centro)[4];
  assert.ok(entrambi.hubris && entrambi.silenzio, "al centro i due segni stanno sulla stessa casella");
  assert.deepEqual(celleSaggezza({ silenzio: 4 }).filter((c) => c.silenzio).map((c) => c.index), [8], "Folle è l'ultima casella");
}

assert.deepEqual(passoLabel("hubris", 0), { key: "WOD5E_MAGE.Wisdom.Passi.centro", n: 0 });
assert.deepEqual(passoLabel("hubris", 2), { key: "WOD5E_MAGE.Wisdom.Passi.passo", n: 2 });
assert.deepEqual(passoLabel("hubris", 4), { key: "WOD5E_MAGE.Wisdom.Passi.fineHubris", n: 4 });
assert.deepEqual(passoLabel("silenzio", 4), { key: "WOD5E_MAGE.Wisdom.Passi.fineSilenzio", n: 4 });

// Le lingue, e le frasi fatte con l'italiano vero.
const it = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8"));
const en = JSON.parse(readFileSync(new URL("../lang/en.json", import.meta.url), "utf8"));
const localize = (key) => key.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), it) ?? key;
const format = (key, data = {}) => String(localize(key)).replace(/\{(\w+)\}/g, (_, k) => String(data[k]));
assert.equal(passoTesto("hubris", 0, localize, format), "al centro");
assert.equal(passoTesto("hubris", 3, localize, format), "passo 3");
assert.equal(passoTesto("hubris", 4, localize, format), "Caduto");
assert.equal(passoTesto("silenzio", 4, localize, format), "Folle");
assert.equal(testoEsito("cancello", { lato: "hubris", passo: 2, gradino: 2 }, localize, format), "Atto del gradino 2, Hubris: il cancello tiene, il segno resta passo 2.");
assert.equal(testoEsito("scoperto", { lato: "silenzio", passo: 1, gradino: 1 }, localize, format), "Atto del gradino 1, Silenzio: nessuna Convinzione copre, il segno scende: passo 1.");
assert.equal(testoEsito("coperto", { lato: "hubris", passo: 0, convinzione: "Mai per potere" }, localize, format), "«Mai per potere» ti copre: il segno dell'Hubris resta al centro.");
assert.equal(testoEsito("fallito", { lato: "hubris", passo: 4, convinzione: "Mai per potere" }, localize, format), "«Mai per potere» non basta: il segno dell'Hubris scende: Caduto.");
assert.equal(testoEsito("boh", {}, localize, format), "");

// La scheda: il contesto della riga, con la riserva, le caselle coi titoli, lo stato dei due lati.
{
  const w = getWisdom(actor({ resolve: { value: 3 }, composure: { value: 2 } }, { hubris: 1, silenzio: 0 }));
  assert.deepEqual([w.hubris, w.silenzio, w.resolve, w.composure, w.riserva, w.fine, w.fineLabel, w.cells.length], [1, 0, 3, 2, 5, "", "", 9]);
  assert.deepEqual(w.stato.hubris, { passo: 1, fine: false, text: "WOD5E_MAGE.Wisdom.Passi.passo", riga: "WOD5E_MAGE.Wisdom.StatoRiga" }, "senza game.i18n le chiavi restano chiavi");
  assert.deepEqual(w.stato.silenzio.passo, 0);
  assert.equal(w.cells[4].title, "WOD5E_MAGE.Wisdom.Cella.centro");
  assert.equal(w.cells[0].title, "WOD5E_MAGE.Wisdom.Cella.fine");
  assert.equal(w.cells[3].title, "WOD5E_MAGE.Wisdom.Cella.passo");
  assert.ok(w.cells[3].hubris && !w.cells[4].hubris && w.cells[4].silenzio);
  assert.deepEqual([w.convinzioni, w.ancore], [[], []]);
  const caduto = getWisdom(actor({}, { hubris: 4 }));
  assert.deepEqual([caduto.fine, caduto.fineLabel, caduto.stato.hubris.fine], ["hubris", "WOD5E_MAGE.Wisdom.Passi.fineHubris", true]);
  // Le Convinzioni con lo stato e le Ancore con la spunta di chi è già stata usata.
  const pieno = getWisdom(actor({}, { ancore: { a1: true } }, { convinzioni: { c1: { text: "Mai per potere", spenta: false }, c2: { text: "Proteggo i miei", spenta: true }, c3: { text: "" } }, ancore: { a1: { name: "Nonna" }, a2: { name: "Il bar", role: "casa" } } }));
  assert.deepEqual(pieno.convinzioni, [{ id: "c1", text: "Mai per potere", spenta: false }, { id: "c2", text: "Proteggo i miei", spenta: true }]);
  assert.deepEqual(pieno.ancore.map((a) => [a.id, a.usata]), [["a1", true], ["a2", false]]);
}

// Le finestre: i campi letti e puliti; la tavola dei sette gradini del LIBRO.
assert.deepEqual(normalizeAtto({ gradino: "3", lato: "hubris", copre: "c1", tradisce: "" }), { gradino: 3, lato: "hubris", copre: "c1", tradisce: "" });
assert.deepEqual(normalizeAtto({ gradino: 0, lato: "x" }), { gradino: 1, lato: "", copre: "", tradisce: "" });
assert.deepEqual(normalizeAtto({ gradino: 99 }).gradino, 7);
assert.deepEqual(normalizeRisplende({ convinzione: "c1", lato: "silenzio", concesso: "on" }), { convinzione: "c1", lato: "silenzio", concesso: true });
assert.deepEqual(normalizeRisplende({}), { convinzione: "", lato: "", concesso: false });
assert.deepEqual(normalizeAncora({ ancora: "a1", lato: "hubris" }), { ancora: "a1", lato: "hubris", concesso: false });
{
  const tavola = tavolaGradini(localize);
  assert.equal(tavola.length, 7);
  assert.deepEqual(tavola.map((r) => r.gradino), [1, 2, 3, 4, 5, 6, 7]);
  assert.equal(tavola[4].generico, "omicidio a sangue freddo");
  assert.equal(tavola[6].hubris, "distruggere un Avatar, sacrificare un'Ancora per potere");
  for (const row of tavola) assert.ok(row.hubris && row.generico && row.silenzio, `gradino ${row.gradino}`);
}

// La nota sotto i dadi del tiro di Saggezza.
assert.equal(renderEsitoSaggezza({ esito: "fallito", testo: "scende <b>" }, localize), '<p class="wod5e-mage-roll-note wod5e-mage-roll-note-saggezza scende"><b class="wod5e-mage-saggezza-label">Saggezza</b> <span>scende &lt;b&gt;</span></p>');
assert.equal(renderEsitoSaggezza({ esito: "coperto", testo: "resta" }, localize), '<p class="wod5e-mage-roll-note wod5e-mage-roll-note-saggezza resta"><b class="wod5e-mage-saggezza-label">Saggezza</b> <span>resta</span></p>');
assert.equal(renderEsitoSaggezza({}, localize), "");

// Il resto della macchina: la scheda, i template, le lingue, il CSS, la sessione.
const read = (name) => readFileSync(new URL(`../${name}`, import.meta.url), "utf8");
const source = read("scripts/wisdom.js");
assert.match(source, /successFrom: SAGGEZZA_SUCCESS_FROM/, "il tiro di Saggezza riesce dall'8, qualunque sia la soglia");
assert.match(source, /paradoxRating: 0,\s*skill: true/, "niente rossi: è un tiro d'Abilità per la macchina");
assert.match(source, /"-=superficial": null,\s*"-=aggravated": null,\s*"-=extra": null,\s*"-=attribute": null,\s*"-=max": null/, "la bandiera vecchia si pulisce");
assert.match(source, /spenta: true \}/, "tradire spegne la Convinzione");
assert.match(source, /if \(stato\.risplende && !scelta\.concesso\)/, "il Risplende una volta per sessione, salvo concessione");
assert.match(source, /if \(ancora\.usata && !game\.user\?\.isGM\)/, "l'Ancora una volta per storia, salvo il Narratore");
assert.match(source, /if \(scelta\.concesso && game\.user\?\.isGM\)/, "il Narratore concede senza tirare");
assert.match(source, /result === "riarma"/, "il tasto Nuova storia riarma le Ancore");
const sheet = read("scripts/sheets/mage-actor-sheet.js");
assert.match(sheet, /wisdomCellChange: \{ handler: onWisdomCellChange, buttons: \[0, 2\] \}/);
for (const action of ["wisdomAtto: onWisdomAtto", "wisdomRisplende: onWisdomRisplende", "wisdomAncora: onWisdomAncora", "wisdomReset: onWisdomReset", "convinzioneToggle: onConvinzioneToggle"]) assert.ok(sheet.includes(action), action);
for (const via of ["wisdomSegna", "wisdomCura", "faiCadereInchiostro", "wisdomAttributePick", "wisdomResourceChange", "wisdomRoll"]) assert.ok(!sheet.includes(via), `${via} tolto`);
const risorse = read("templates/actor/parts/stat-risorse.hbs");
assert.match(risorse, /wod5e-mage-riga-saggezza con-ventaglio\{\{#if wisdom\.fine\}\} finita\{\{\/if\}\}[\s\S]*wod5e-mage-saggezza-track wod5e-mage-bilancia[\s\S]*\{\{#each wisdom\.cells as \|cell\|\}\}[\s\S]*wod5e-mage-bilancia-cella lato-\{\{cell\.lato\}\}\{\{#if cell\.fine\}\} fine\{\{\/if\}\}\{\{#if cell\.hubris\}\} segno-hubris\{\{\/if\}\}\{\{#if cell\.silenzio\}\} segno-silenzio\{\{\/if\}\}" data-action="wisdomCellChange" data-index="\{\{cell\.index\}\}" data-lato="\{\{cell\.lato\}\}" data-passo="\{\{cell\.passo\}\}"[\s\S]*wod5e-mage-bilancia-segno hubris[\s\S]*wod5e-mage-bilancia-segno silenzio[\s\S]*wod5e-mage-bilancia-stato[\s\S]*wod5e-mage-ventaglio wod5e-mage-ventaglio-quattro[\s\S]*data-action="wisdomAtto"[\s\S]*data-action="wisdomRisplende"[\s\S]*data-action="wisdomAncora"[\s\S]*data-action="wisdomReset"/);
assert.doesNotMatch(risorse, /inchiostro|wisdomSegna|wisdomCura|wisdomAttributePick|wisdomResourceChange|squareCounterChange|resource-counter-step|ventaglio-sei[\s\S]*ventaglio-sei/);
assert.ok(!existsSync(new URL("../templates/dialogs/saggezza-macchie.hbs", import.meta.url)), "la finestra delle macchie è tolta");
assert.ok(!existsSync(new URL("../scripts/sforzo.js", import.meta.url)), "lo Sforzare la realtà è tolto");
assert.match(read("templates/dialogs/saggezza-atto.hbs"), /name="gradino"[\s\S]*name="lato"[\s\S]*name="copre"[\s\S]*name="tradisce"/);
assert.match(read("templates/dialogs/saggezza-risplende.hbs"), /name="convinzione"[\s\S]*name="lato"[\s\S]*name="concesso"/);
assert.match(read("templates/dialogs/saggezza-ancora.hbs"), /name="ancora"[\s\S]*name="lato"[\s\S]*name="concesso"/);
// La Convinzione nella pagina Personaggio ha l'interruttore attiva/spenta.
assert.match(read("templates/actor/parts/personaggio.hbs"), /wod5e-mage-conviction\{\{#if row\.spenta\}\} spenta\{\{\/if\}\}[\s\S]*data-action="convinzioneToggle" data-row="\{\{row\.id\}\}"/);
assert.match(read("scripts/personaggio-extra.js"), /spenta: Boolean\(row\?\.spenta\)/);
// La nuova sessione ridà il Risplende; main registra la riga sotto i dadi.
assert.match(read("scripts/salute.js"), /\[`flags\.\$\{MODULE_ID\}\.wisdom\.risplende`\]: false/);
assert.match(read("scripts/main.js"), /registerIndulgere\(\);[\s\S]*registerSaggezza\(\);/);
const css = read("styles/wod5e-mage.css");
for (const rule of [".wod5e-mage-bilancia {", ".wod5e-mage-bilancia-cella {", ".wod5e-mage-bilancia-cella.lato-centro", ".wod5e-mage-bilancia-cella.fine", ".wod5e-mage-bilancia-cella.segno-hubris > .wod5e-mage-bilancia-segno.hubris", ".wod5e-mage-bilancia-cella.segno-silenzio > .wod5e-mage-bilancia-segno.silenzio", ".wod5e-mage-bilancia-stato", ".wod5e-mage-conviction-stato", ".wod5e-mage-ruota-comandi.quattro > .wod5e-mage-ventaglio-voce"]) assert.ok(css.includes(rule), rule);
for (const via of ["wod5e-mage-inchiostro", "wod5e-mage-goccia-cade", "wod5e-mage-macchia-allarga", "wod5e-mage-sforzo-button"]) assert.ok(!css.includes(via), `${via} tolto dal CSS`);
for (const [lang, strings] of [["it", it], ["en", en]]) {
  const w = strings.WOD5E_MAGE.Wisdom;
  for (const key of ["Label", "Hint", "RiservaHint", "VentaglioHint", "Tira", "Roll", "Rolling", "Risplende", "RisplendeHint", "Ancora", "AncoraHint", "Reset", "ResetHint", "ClickHint", "StatoRiga"]) assert.equal(typeof w[key], "string", `${lang} ${key}`);
  assert.deepEqual(Object.keys(w.Lati), ["hubris", "silenzio"], lang);
  assert.deepEqual(Object.keys(w.Passi), ["centro", "passo", "fineHubris", "fineSilenzio"], lang);
  assert.deepEqual(Object.keys(w.Esiti), ["cancello", "scoperto", "coperto", "fallito", "tradita"], lang);
  assert.deepEqual(Object.keys(w.Tavola), ["1", "2", "3", "4", "5", "6", "7"], lang);
  for (const key of ["States", "Stati", "Segna", "Cura", "Extra", "MaxMenoBreve"]) assert.equal(w[key], undefined, `${lang} ${key} tolta`);
  assert.equal(strings.WOD5E_MAGE.Sforzo, undefined, `${lang} Sforzo tolto`);
}
// Le chiavi della Saggezza e dell'Indulgere pari fra le due lingue.
const chiavi = (o, prefix = "") => Object.entries(o).flatMap(([k, v]) => (v && typeof v === "object" ? chiavi(v, `${prefix}${k}.`) : [`${prefix}${k}`]));
assert.deepEqual(chiavi(en.WOD5E_MAGE.Wisdom), chiavi(it.WOD5E_MAGE.Wisdom), "Wisdom: stesse chiavi in it e en");
assert.deepEqual(chiavi(en.WOD5E_MAGE.Indulgere), chiavi(it.WOD5E_MAGE.Indulgere), "Indulgere: stesse chiavi in it e en");

console.log("Saggezza, la bilancia: test passati.");
