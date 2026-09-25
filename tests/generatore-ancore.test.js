import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  COGNOMI,
  COGNOMI_RISERVA,
  COSA_NON_SA,
  COSA_TI_DA,
  DOVE_MORDE,
  MESTIERI,
  NOMI_DONNA,
  NOMI_UOMO,
  RUOLI
} from "../scripts/data/generatore-ancore.js";
import {
  CAMPI_ANCORA,
  CAMPI_GENERATI,
  completaAncora,
  definizioneRuolo,
  ETA_MAX,
  ETA_MIN,
  generaAncora,
  opzioniRuolo,
  tiraCampo,
  tiraEta,
  tiraNome
} from "../scripts/generatore-ancore.js";

// Un rng col seme, per prove ripetibili (mulberry32).
function seme(n) {
  let a = n >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Le liste della Bussola rifatta (25/9): cento e cento nomi, cento cognomi più la riserva, cento mestieri, venti ruoli, dieci e dieci e dieci.
assert.equal(NOMI_DONNA.length, 100);
assert.equal(NOMI_UOMO.length, 100);
assert.equal(COGNOMI.length, 100);
assert.equal(COGNOMI_RISERVA.length, 45);
assert.equal(MESTIERI.length, 100);
assert.equal(RUOLI.length, 20);
assert.equal(COSA_TI_DA.length, 10);
assert.equal(COSA_NON_SA.length, 10);
assert.equal(DOVE_MORDE.length, 10);
for (const list of [NOMI_DONNA, NOMI_UOMO, COGNOMI, MESTIERI]) {
  assert.equal(new Set(list).size, list.length, "niente doppi");
  assert.ok(list.every((v) => typeof v === "string" && v.trim() === v && v.length > 1));
}
assert.equal(new Set([...COGNOMI, ...COGNOMI_RISERVA]).size, 145, "la riserva non ripete la tavola");
// I mestieri sono una parola o due, senza la frase d'epigrafe (Blue, 25/9).
assert.ok(MESTIERI.every((m) => !m.includes(",")), "mestieri senza virgole");
// I trenta ritratti aprono le liste.
assert.equal(NOMI_DONNA[0], "Wanda");
assert.equal(NOMI_UOMO[0], "Samir");
assert.equal(COGNOMI[0], "Cislaghi");
assert.equal(MESTIERI[0], "portinaia");
// I ruoli: i dodici confermati più gli otto aggiunti, ognuno con la definizione.
assert.deepEqual(RUOLI.slice(0, 12).map((r) => r.id), ["partner", "coniuge", "figlio o figlia", "genitore", "fratello o sorella", "nonno o nonna", "migliore amico", "amico d'infanzia", "collega", "vicino di casa", "ex", "chi ti ha cresciuto"]);
assert.ok(RUOLI.every((r) => r.definizione.length > 10));
assert.equal(definizioneRuolo("collega"), "chi divide con te il posto di lavoro; ti copre, e non sa da cosa");
assert.equal(definizioneRuolo("boh"), "");
assert.equal(opzioniRuolo("ex").filter((o) => o.selected).map((o) => o.id).join(), "ex");

// I campi: sette righe più la Convinzione; il dado non tocca la Convinzione.
assert.deepEqual(CAMPI_ANCORA, ["name", "role", "job", "age", "gives", "conviction", "unknown", "bites"]);
assert.deepEqual(CAMPI_GENERATI, ["name", "role", "job", "age", "gives", "unknown", "bites"]);

// L'età: un d100, sotto il 6 e sopra il 90 si rilancia.
assert.equal(ETA_MIN, 6);
assert.equal(ETA_MAX, 90);
const rng = seme(7);
for (let i = 0; i < 500; i += 1) {
  const eta = tiraEta(rng);
  assert.ok(Number.isInteger(eta) && eta >= 6 && eta <= 90, `età ${eta}`);
}
assert.equal(tiraEta(() => 0.999), 90, "il 100 si rilancia finché resta nel tetto");
assert.equal(tiraEta(() => 0), 6, "l'1 si rilancia e alla fine cade sul minimo");

// Il nome: donna o uomo a scelta, o a caso.
assert.ok(NOMI_DONNA.includes(tiraNome(seme(1), "donna")));
assert.ok(NOMI_UOMO.includes(tiraNome(seme(1), "uomo")));
const nomeCompleto = tiraCampo("name", seme(3));
assert.match(nomeCompleto, /^\S.+ \S.+$/, "nome e cognome");
assert.ok([...NOMI_DONNA, ...NOMI_UOMO].some((n) => nomeCompleto.startsWith(n + " ")));
assert.ok([...COGNOMI, ...COGNOMI_RISERVA].some((c) => nomeCompleto.endsWith(" " + c)));

// Un'Ancora intera: tutti i campi pieni, la Convinzione vuota, le note vuote.
const ancora = generaAncora({ rng: seme(11) });
for (const campo of CAMPI_GENERATI) assert.ok(String(ancora[campo]).trim(), campo);
assert.equal(ancora.conviction, "");
assert.equal(ancora.description, "");
assert.ok(RUOLI.some((r) => r.id === ancora.role));
assert.ok(MESTIERI.includes(ancora.job));
assert.ok(COSA_TI_DA.includes(ancora.gives));
assert.ok(COSA_NON_SA.includes(ancora.unknown));
assert.ok(DOVE_MORDE.includes(ancora.bites));
assert.ok(Number(ancora.age) >= 6 && Number(ancora.age) <= 90);
// Lo stesso seme dà la stessa Ancora.
assert.deepEqual(generaAncora({ rng: seme(11) }), ancora);

// Completa: riempie solo i campi vuoti; la Convinzione e le note restano.
const mezza = { name: "Giacomo", role: "", job: "barista", age: "", gives: "", conviction: "c1", unknown: "cosa sei", bites: "", description: "il pulsante rosso" };
const piena = completaAncora(mezza, { rng: seme(5) });
assert.equal(piena.name, "Giacomo");
assert.equal(piena.job, "barista");
assert.equal(piena.unknown, "cosa sei");
assert.equal(piena.conviction, "c1");
assert.equal(piena.description, "il pulsante rosso");
assert.ok(piena.role && piena.age && piena.gives && piena.bites, "i vuoti sono stati tirati");
assert.equal(completaAncora(undefined, { rng: seme(5) }).conviction, undefined, "una riga nuova non inventa la Convinzione");

// Il file dati è generato dalla Bussola: la testa lo dice, e il costruttore esiste.
const dati = readFileSync(new URL("../scripts/data/generatore-ancore.js", import.meta.url), "utf8");
assert.match(dati, /Generato da tools\/build-bussola\.py/);
const costruttore = readFileSync(new URL("../tools/build-bussola.py", import.meta.url), "utf8");
assert.match(costruttore, /mage-ancore/);
assert.match(costruttore, /generatore-ancore\.js/);

// La scheda e il passo 12 hanno il dado e le sette righe.
const personaggio = readFileSync(new URL("../templates/actor/parts/personaggio.hbs", import.meta.url), "utf8");
const passo = readFileSync(new URL("../templates/guidata/passi/ancore.hbs", import.meta.url), "utf8");
for (const source of [personaggio, passo]) {
  assert.match(source, /data-action="ancoraGenera"/);
  for (const campo of CAMPI_ANCORA) assert.match(source, new RegExp(`flags\\.wod5e-mage\\.ancore\\.\\{\\{row\\.id\\}\\}\\.${campo}`), campo);
}
const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheet, /ancoraGenera: onAncoraGenera/);
const finestra = readFileSync(new URL("../scripts/creazione-guidata-finestra.js", import.meta.url), "utf8");
assert.match(finestra, /ancoraGenera: CreazioneGuidata\.#onAncoraGenera/);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8"));
  for (const key of ["AnchorRole", "AnchorJob", "AnchorAge", "AnchorGives", "AnchorConviction", "AnchorUnknown", "AnchorBites", "AnchorGenerate", "AnchorGenerateNew"]) {
    assert.ok(strings.WOD5E_MAGE.Personaggio[key], `${lang} ${key}`);
  }
  for (const key of ["Ruolo", "Mestiere", "Eta", "CosaTiDa", "Convinzione", "CosaNonSa", "DoveMorde", "Genera", "GeneraRiga", "Montate", "Legame"]) {
    assert.ok(strings.WOD5E_MAGE.Guidata.Ancore[key], `${lang} Guidata.Ancore.${key}`);
  }
}

console.log("generatore-ancore: ok");
