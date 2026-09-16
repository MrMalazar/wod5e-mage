import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { altraScala, altroTema, applicaScala, applicaTema, isChiaro, normalizeScala, normalizeTema, SCALA_AZIONE, SCALA_FATTORI, SCALA_SETTING, SCALA_TASTO_CLASSE, scalaFattore, scalaTasto, SCALE, TEMA_AZIONE, TEMA_CLASSE, TEMA_SETTING, TEMA_TASTO_CLASSE, temaTasto, TEMI } from "../scripts/tema.js";

// I due temi; un valore vecchio o vuoto torna allo scuro.
assert.deepEqual(TEMI, ["scuro", "chiaro"]);
assert.equal(normalizeTema("chiaro"), "chiaro");
assert.equal(normalizeTema(undefined), "scuro");
assert.equal(normalizeTema("dark"), "scuro");
assert.equal(isChiaro("chiaro"), true);
assert.equal(isChiaro(""), false);
assert.equal(altroTema("scuro"), "chiaro");
assert.equal(altroTema("chiaro"), "scuro");
assert.equal(altroTema(null), "chiaro");

// Il tasto mostra dove porta: il sole sullo scuro, la luna sul chiaro.
assert.deepEqual(temaTasto("scuro"), { next: "chiaro", icon: "fa-sun", label: "WOD5E_MAGE.Tema.Chiaro" });
assert.deepEqual(temaTasto("chiaro"), { next: "scuro", icon: "fa-moon", label: "WOD5E_MAGE.Tema.Scuro" });

// Un finto frame: la classe sulla finestra, icona e attributi sul tasto.
function fakeElement(withButton = true) {
  const classes = new Set();
  const attrs = {};
  const button = {
    classList: { add: (...c) => c.forEach((x) => classes.add(x)), remove: (...c) => c.forEach((x) => classes.delete(x)), has: (c) => classes.has(c) },
    setAttribute: (k, v) => { attrs[k] = v; },
    attrs,
    classes
  };
  const frame = new Set();
  return {
    classList: { toggle: (c, on) => { on ? frame.add(c) : frame.delete(c); return on; }, has: (c) => frame.has(c) },
    querySelector: (selector) => (withButton && selector === `.${TEMA_TASTO_CLASSE}` ? button : null),
    button,
    frame
  };
}
const localize = (key) => ({ "WOD5E_MAGE.Tema.Chiaro": "Modalità chiara", "WOD5E_MAGE.Tema.Scuro": "Modalità scura" })[key] ?? key;

let el = fakeElement();
applicaTema(el, "chiaro", { localize });
assert.ok(el.frame.has(TEMA_CLASSE));
assert.ok(el.button.classes.has("fa-moon") && !el.button.classes.has("fa-sun"));
assert.equal(el.button.attrs["aria-label"], "Modalità scura");
assert.equal(el.button.attrs["data-tooltip"], "Modalità scura");
assert.equal(el.button.attrs["aria-pressed"], "true");

// Tornando allo scuro la classe sparisce e il tasto torna al sole.
applicaTema(el, "scuro", { localize });
assert.ok(!el.frame.has(TEMA_CLASSE));
assert.ok(el.button.classes.has("fa-sun") && !el.button.classes.has("fa-moon"));
assert.equal(el.button.attrs["aria-label"], "Modalità chiara");
assert.equal(el.button.attrs["aria-pressed"], "false");

// Senza tasto (o senza finestra) non si rompe niente.
el = fakeElement(false);
applicaTema(el, "chiaro");
assert.ok(el.frame.has(TEMA_CLASSE));
applicaTema(null, "chiaro");

// La misura del testo (16/9 sera): tre misure in giro, una scala per ciascuna.
assert.deepEqual(SCALE, ["piccolo", "medio", "grande"]);
assert.deepEqual(SCALA_FATTORI, { piccolo: 0.88, medio: 1, grande: 1.12 });
assert.equal(normalizeScala("grande"), "grande");
assert.equal(normalizeScala("enorme"), "medio");
assert.equal(scalaFattore(undefined), 1);
assert.deepEqual([altraScala("piccolo"), altraScala("medio"), altraScala("grande"), altraScala(null)], ["medio", "grande", "piccolo", "grande"]);
assert.deepEqual(scalaTasto("medio"), { current: "medio", next: "grande", label: "WOD5E_MAGE.Scala.Medio", nextLabel: "WOD5E_MAGE.Scala.Grande" });

function fakeFrame(withButton = true) {
  const vars = {};
  const attrs = {};
  const button = { setAttribute: (k, v) => { attrs[k] = v; }, attrs };
  return {
    style: { setProperty: (k, v) => { vars[k] = v; } },
    dataset: {},
    querySelector: (selector) => (withButton && selector === `.${SCALA_TASTO_CLASSE}` ? button : null),
    vars,
    button
  };
}
const fmt = (key, data) => `${key}:${data.current}>${data.next}`;
let frame = fakeFrame();
applicaScala(frame, "grande", { localize: (key) => key.split(".").pop().toLowerCase(), format: fmt });
assert.equal(frame.vars["--mage-scala"], "1.12");
assert.equal(frame.dataset.scala, "grande");
assert.equal(frame.button.attrs["data-tooltip"], "WOD5E_MAGE.Scala.Tasto:grande>piccolo");
assert.equal(frame.button.attrs["aria-label"], "WOD5E_MAGE.Scala.Tasto:grande>piccolo");
applicaScala(frame, "boh", { format: fmt });
assert.equal(frame.vars["--mage-scala"], "1");
frame = fakeFrame(false);
applicaScala(frame, "piccolo");
assert.equal(frame.vars["--mage-scala"], "0.88");
applicaScala(null, "piccolo");

// La scheda: i due tasti entrano nella cornice a sinistra dei tre pallini
// (prima la misura, poi il tema), le azioni sono registrate, tema e misura
// si applicano a ogni render; main.js registra le impostazioni col cambio
// che riveste le schede aperte.
const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheet, /async _renderFrame\(options\)/);
assert.match(sheet, /this\.window\?\.controls \?\? this\.window\?\.close/);
assert.match(sheet, /anchor\.before\(scala, tema\)/);
assert.match(sheet, /"fa-text-height", SCALA_TASTO_CLASSE/);
assert.match(sheet, /\[TEMA_AZIONE\]: onTemaToggle,\n\s+\[SCALA_AZIONE\]: onScalaToggle/);
assert.match(sheet, /static applicaTemaOvunque\(/);
assert.match(sheet, /static applicaScalaOvunque\(/);
assert.match(sheet, /applicaTema\(this\.element, game\.settings\.get\(MODULE_ID, TEMA_SETTING\)/);
assert.match(sheet, /applicaScala\(this\.element, game\.settings\.get\(MODULE_ID, SCALA_SETTING\)/);
// Cambiando misura la finestra cresce o cala in proporzione, entro lo schermo.
assert.match(sheet, /const ratio = scalaFattore\(next\) \/ scalaFattore\(current\);[\s\S]*this\.setPosition\(\{[\s\S]*Math\.round\(width \* ratio\)[\s\S]*window\.innerWidth/);
const main = readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8");
assert.match(main, /game\.settings\.register\(MODULE_ID, TEMA_SETTING, \{/);
assert.match(main, /scope: "client",\n\s+config: true,\n\s+type: String,\n\s+choices: \{\n\s+\[TEMA_SCURO\]/);
assert.match(main, /onChange: \(value\) => MageActorSheet\.applicaTemaOvunque\(value\)/);
assert.match(main, /game\.settings\.register\(MODULE_ID, SCALA_SETTING, \{[\s\S]*choices: \{\n\s+piccolo: "WOD5E_MAGE\.Scala\.Piccolo",\n\s+medio: "WOD5E_MAGE\.Scala\.Medio",\n\s+grande: "WOD5E_MAGE\.Scala\.Grande"[\s\S]*onChange: \(value\) => MageActorSheet\.applicaScalaOvunque\(value\)/);
assert.match(main, /game\.settings\.register\(MODULE_ID, "skillsFlat", \{[\s\S]*type: Boolean,\n\s+default: false/);
assert.equal(TEMA_SETTING, "sheetTheme");
assert.equal(TEMA_AZIONE, "temaToggle");
assert.equal(SCALA_SETTING, "sheetScale");
assert.equal(SCALA_AZIONE, "scalaToggle");

// Le parole, in tutte e due le lingue.
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8")).WOD5E_MAGE;
  assert.deepEqual(Object.keys(strings.Settings.SheetTheme), ["Name", "Hint", "Scuro", "Chiaro"], lang);
  assert.deepEqual(Object.keys(strings.Settings.SheetScale), ["Name", "Hint"], lang);
  assert.deepEqual(Object.keys(strings.Tema), ["Chiaro", "Scuro"], lang);
  assert.deepEqual(Object.keys(strings.Scala), ["Piccolo", "Medio", "Grande", "Tasto"], lang);
  assert.match(strings.Scala.Tasto, /\{current\}[\s\S]*\{next\}/, lang);
  for (const key of ["CercaIncantesimo", "IncantesimiVuoti", "AbilitaInFila", "AbilitaFamiglie"]) assert.ok(strings.Stat[key], `${lang} Stat.${key}`);
  for (const key of ["ScopeHint", "PoteriHint", "IncantesimoHint"]) assert.ok(strings.Tiro[key], `${lang} Tiro.${key}`);
  assert.ok(!strings.Stat.CercaPotere && !strings.Stat.PoteriVuoti, `${lang}: le chiavi del riquadro Poteri sono sparite`);
}

// Il CSS: il blocco chiaro coi colori del manuale, agganciato alla classe.
const css = readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8");
assert.match(css, /\.wod5e-mage\.wod5e\.actor\.sheet\.wod5e-mage-chiara \{\n\s+--mortal-color-1: #282051;/);
assert.match(css, /\.wod5e-mage-chiara \{[^}]*--mage-oro: #B3924A;/);
assert.match(css, /\.wod5e-mage-chiara \{[^}]*--mage-rosso: #A4444A;/);
assert.match(css, /\.wod5e-mage-chiara \{[^}]*--mage-riq-fondo: #F6F2E6;/);
assert.match(css, /\.wod5e-mage-chiara \.window-header \{\n\s+background: #282051;/);
assert.match(css, /\.window-header \.wod5e-mage-tema,\n\.wod5e-mage\.wod5e\.actor\.sheet \.window-header \.wod5e-mage-scala \{/);
// Niente bianco puro nel tema chiaro (Blue, 16/9 sera): crema del manuale; il piede è .sheet-banner del sistema.
const chiara = css.slice(css.indexOf("LA MODALITÀ CHIARA"), css.indexOf("/* Pallini pieni in oro acceso."));
assert.doesNotMatch(chiara, /#FFFFFF|#fff\b/i);
assert.match(chiara, /--mage-carta: #FBF8F0;/);
assert.match(chiara, /\.wod5e-mage-chiara \.sheet-banner \{/);
assert.doesNotMatch(chiara, /type-banner/);
assert.match(chiara, /\.wod5e-mage-chiara \.window-content \.resource \{\n\s+background-color: #F6F2E6;/);

console.log("tema: ok");
