// Il Vathrâ nel modulo (Blue, 25/9): il motore copiato da 03_FABBRICA regge
// come la sua verifica.js; il frasario rifà le frasi del documento di tavola
// con le loro manopole; «come si legge» rifà la colonna del documento; le
// regole della carta (chi capisce) e del traduttore (gettoni, comando).
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import VATHRA from "../scripts/vathra/vathra-core.js";
import { comeSiLegge, perLaVoce, sillabe } from "../scripts/vathra/lettura.js";
import { FRASARIO } from "../scripts/vathra/frasario.js";
import { REGISTRATE, SUONI } from "../scripts/vathra/dati.js";
import {
  capisce, datiCarta, fraseCorrisponde, frasarioTradotto, leggiComando, normalizzaOpzioni, OPZIONI_BASE, opzioniFrase,
  pulisciCapiscono, radice, registrazione, statoGettoni, toggleCapisce, toggleGettone, traduciTesto
} from "../scripts/vathra/vathra.js";

// 1. La verifica del motore, come 03_FABBRICA/vathra/sorgenti/verifica.js.
{
  for (const w of ["bicicletta", "metropolitana", "telefono", "ospedale", "fulmine", "chitarra", "cane", "poliziotto"]) {
    assert.equal(JSON.stringify(VATHRA.declina(w)), JSON.stringify(VATHRA.declina(w)), `instabile: ${w}`);
  }
  const CONS = new Set(["'", "b", "d", "f", "g", "h", "k", "kh", "l", "m", "n", "p", "r", "s", "sh", "t", "th", "v", "y", "z"]);
  for (const lemma in VATHRA.LESSICO) {
    for (const c of VATHRA.LESSICO[lemma].r) assert.ok(CONS.has(c), `consonante fuori inventario «${c}» in ${lemma}`);
  }
  const testi = [
    "Il mago spezza il sigillo del santuario nella notte di Milano.",
    "Non voglio pagare questo prezzo, e non lo pagherò mai.",
    "Guardami, ascoltami, e dimmi la verità sul Paradosso.",
    "La Tecnocrazia ha chiuso ogni nodo della città.",
    "Ricorderemo la Frattura finché la Tessitura reggerà."
  ];
  const tris = /(?:kh|sh|th|['bdfgklmnprstvyz]){3,}/;
  for (const t of testi) {
    const r = VATHRA.traduci(t, { testimone: "occhi", consenso: "volgare" }).romanizzazione;
    for (const w of r.split(/\s+/)) assert.ok(!tris.test(w.replace(/[.,!?]/g, "")), `grappolo in «${w}» da: ${t}`);
  }
  const AMMESSI = new Set("ptkbdgfshcqxmnrlvyzʼaeiouâêîôû .,!?-".split(""));
  for (const t of testi) {
    for (const ch of VATHRA.traduci(t, { testimone: "tessitura", consenso: "coincidente" }).glifi) assert.ok(AMMESSI.has(ch), `carattere senza glifo «${ch}» in: ${t}`);
  }
  assert.ok(Object.keys(VATHRA.LESSICO).length >= 700, "il lessico c'è tutto");
}

// 2. Le frasi del documento di tavola (e le dieci del frasario della pagina) escono com'erano scritte.
const attese = JSON.parse(readFileSync(new URL("./vathra-frasi.json", import.meta.url), "utf8"));
{
  let conLegge = 0;
  for (const f of attese) {
    const t = traduciTesto(f.it, opzioniFrase(f));
    if (f.va) assert.equal(t.romanizzazione, f.va, `«${f.it}»`);
    if (f.legge) {
      assert.equal(comeSiLegge(f.va), f.legge, `come si legge «${f.va}»`);
      assert.equal(t.legge, f.legge);
      conLegge += 1;
    }
  }
  assert.equal(conLegge, 111, "le 111 righe «come si legge» del documento");
  // Il frasario del modulo è fatto di quelle frasi, con le stesse manopole.
  const perTesto = new Map(attese.map((f) => [f.it, f]));
  let frasi = 0;
  for (const gruppo of FRASARIO) {
    for (const f of gruppo.frasi) {
      frasi += 1;
      const atteso = perTesto.get(f.it);
      assert.ok(atteso, `frase fuori dal documento: ${f.it}`);
      assert.deepEqual(opzioniFrase(f), opzioniFrase(atteso), `manopole di «${f.it}»`);
    }
  }
  assert.equal(frasi, 114, "quattordici di scena più le cento");
  assert.equal(FRASARIO[0].id, "scena");
}

// 3. Le dieci registrazioni corrispondono a frasi del frasario di scena.
{
  const scena = FRASARIO[0].frasi.map((f) => traduciTesto(f.it, opzioniFrase(f)).romanizzazione);
  REGISTRATE.forEach((va, i) => {
    assert.ok(scena.includes(va), `la registrazione F${i} non ha la sua frase`);
    assert.equal(registrazione(va), `F${i}.mp3`);
  });
  assert.equal(registrazione("man hu"), null);
  assert.equal(SUONI.length, 8);
  const tradotto = frasarioTradotto();
  assert.equal(tradotto[0].frasi.filter((f) => f.registrata).length, 10, "dieci frasi di scena col triangolo d'oro");
}

// 4. Come si legge: sillabe e accento.
{
  assert.deepEqual(sillabe("vakharilmi"), ["va", "kha", "ril", "mi"]);
  assert.deepEqual(sillabe("e'nakhthâath"), ["e'", "nakh", "thâath"]);
  assert.equal(comeSiLegge("khinâr hu"), "chi-NÀR hu");
  assert.equal(comeSiLegge("ûzavarilmi"), "Ù-za-va-ril-mi", "senza altre tenute, la û prende l'accento");
  assert.equal(comeSiLegge("î'nazkhâên"), "ìʼ-naz-cà-ÈN", "l'ultima tenuta vince");
  assert.equal(comeSiLegge(""), "");
  assert.equal(perLaVoce("vakharilmi î'shi'âr i mi va."), "vacarilmi ìsciàr i mi va.");
}

// 5. Il traduttore: manopole, gettoni, radice, frasario, comando.
{
  assert.deepEqual(normalizzaOpzioni({ testimone: "occhi", consenso: "boh", altro: 1 }), { ...OPZIONI_BASE, testimone: "occhi" });
  const vuota = traduciTesto("   ");
  assert.equal(vuota.vuoto, true);
  const t = traduciTesto("Apro la porta con la mia volontà.", { testimone: "occhi", consenso: "volgare" });
  assert.equal(t.romanizzazione, "'afarilmi e'ofur e'valnâum i mi ne thak.");
  assert.equal(t.glifi, "ʼafarilmi eʼofur eʼvalnâum i mi ne qak");
  assert.equal(t.legge, "ʼa-fa-RIL-mi e-ʼO-fur eʼ-val-NÀUM i mi ne tak.");
  assert.match(t.glossa, /cons:volgare/);

  let o = toggleGettone(OPZIONI_BASE, "consenso", "volgare");
  assert.equal(o.consenso, "volgare");
  o = toggleGettone(o, "consenso", "volgare");
  assert.equal(o.consenso, "nessuno", "il secondo clic spegne");
  assert.equal(toggleGettone(OPZIONI_BASE, "modo", "imperativo").modo, "auto", "modo non ha gettoni");

  const eco = statoGettoni("Ho visto che il Velo si assottiglia.", OPZIONI_BASE);
  assert.equal(eco.filter((g) => g.sep).length, 2);
  assert.ok(eco.find((g) => g.v === "occhi")?.eco, "«ho visto» accende l'eco di «l'ho visto»");
  assert.ok(!eco.find((g) => g.v === "occhi")?.acceso);
  const imposto = statoGettoni("Ho visto che il Velo si assottiglia.", { ...OPZIONI_BASE, testimone: "tessitura" });
  assert.ok(imposto.find((g) => g.v === "tessitura")?.acceso);
  assert.ok(!imposto.find((g) => g.v === "occhi")?.eco, "con una testimonianza imposta l'eco tace");

  const r = radice("fuoco");
  assert.equal(r.modi.length, 7);
  assert.equal(r.modi[0].id, "atto");
  assert.ok(r.radice.startsWith("√"));
  assert.equal(radice("  "), null);

  assert.ok(fraseCorrisponde("chiamo il mio avatar vakharilmi", "avatar"));
  assert.ok(fraseCorrisponde("chiamo il mio avatar vakharilmi", "AVATAR vakh"));
  assert.ok(!fraseCorrisponde("chiamo il mio avatar", "velo"));
  assert.ok(fraseCorrisponde("qualsiasi", ""));
  assert.ok(fraseCorrisponde("il paradosso ricorda ogni cosa rakharilsa i'nazkhaen", "nazkhâ"), "la ricerca ignora gli accenti");

  assert.deepEqual(leggiComando("/vathra"), { testo: "" });
  assert.deepEqual(leggiComando("/Vathra  Chiamo il mio Avatar. "), { testo: "Chiamo il mio Avatar." });
  assert.equal(leggiComando("/vathrax ciao"), null);
  assert.equal(leggiComando("ciao /vathra"), null);
}

// 6. La carta: chi vede il senso.
{
  const capiscono = ["u2"];
  assert.equal(capisce({ userId: "gm", isGM: true, autoreId: "u1", capiscono }), true, "il Narratore capisce sempre");
  assert.equal(capisce({ userId: "u1", autoreId: "u1", capiscono }), true, "chi scrive capisce sempre");
  assert.equal(capisce({ userId: "u2", autoreId: "u1", capiscono }), true, "chi è acceso capisce");
  assert.equal(capisce({ userId: "u3", autoreId: "u1", capiscono }), false, "gli altri vedono solo i glifi");
  assert.equal(capisce({ userId: null, autoreId: null, capiscono }), false);
  assert.deepEqual(pulisciCapiscono(["u2", "u2", "u1", "", null], "u1"), ["u2"]);
  assert.deepEqual(toggleCapisce(["u2"], "u3"), ["u2", "u3"]);
  assert.deepEqual(toggleCapisce(["u2", "u3"], "u2"), ["u3"]);
  const dati = datiCarta({ testo: " Chiamo il mio Avatar. ", traduzione: traduciTesto("Chiamo il mio Avatar.", { testimone: "nessuna", consenso: "coincidente" }), mano: "boh", capiscono: ["u2", "u1"], autoreId: "u1" });
  assert.equal(dati.italiano, "Chiamo il mio Avatar.");
  assert.equal(dati.romanizzazione, "vakharilmi î'shi'âr i mi va.");
  assert.equal(dati.mano, "filata", "una mano sconosciuta torna filata");
  assert.deepEqual(dati.capiscono, ["u2"], "l'autore non sta fra gli accesi");
}

// 7. Le lingue: le stesse chiavi in italiano e in inglese; il manifest le carica.
{
  const it = JSON.parse(readFileSync(new URL("../lang/it-vathra.json", import.meta.url), "utf8"));
  const en = JSON.parse(readFileSync(new URL("../lang/en-vathra.json", import.meta.url), "utf8"));
  const chiavi = (nodo, prefisso = "") => Object.entries(nodo).flatMap(([k, v]) => (typeof v === "object" ? chiavi(v, `${prefisso}${k}.`) : [`${prefisso}${k}`])).sort();
  assert.deepEqual(chiavi(en), chiavi(it));
  for (const [k, v] of Object.entries(it.WOD5E_MAGE.Vathra.Gettoni.testimone)) assert.ok(v && en.WOD5E_MAGE.Vathra.Gettoni.testimone[k]);
  const testiIt = JSON.stringify(it);
  assert.ok(!testiIt.includes("—"), "niente trattini lunghi nei testi (Blue)");
  const manifest = JSON.parse(readFileSync(new URL("../module.json", import.meta.url), "utf8"));
  assert.ok(manifest.styles.includes("styles/vathra.css"));
  assert.ok(manifest.languages.some((l) => l.lang === "it" && l.path === "lang/it-vathra.json"));
  assert.ok(manifest.languages.some((l) => l.lang === "en" && l.path === "lang/en-vathra.json"));
  // Il CSS non tocca i bottoni fuori da .window-content (i tasti della cornice di Foundry).
  const css = readFileSync(new URL("../styles/vathra.css", import.meta.url), "utf8");
  for (const [, selettore] of css.matchAll(/(^|})\s*([^{}@]+)\{/g)) {
    for (const parte of selettore.split(",")) {
      if (/\.application\.wod5e-mage-vathra[^,]*\bbutton\b/.test(parte)) assert.match(parte, /\.window-content/, `regola sui bottoni fuori dal contenuto: ${parte.trim()}`);
    }
  }
}

console.log("Vathra tests passed.");
