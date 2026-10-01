import assert from "node:assert/strict";
import { MAGE_SHEET_ID, MODULE_ID, NEMICO_SHEET_ID } from "../scripts/constants.js";
import { NATURE } from "../scripts/nemico.js";
import { CAMPI_CREAZIONE, datiDiCreazione, registerActorCreationChoice } from "../scripts/actor-creation.js";

// La finestra «Crea attore» (1.33.1). Due prove: i dati, in funzioni pure; e
// la finestra montata su un finto DOM e letta come la legge Foundry.

/* ------------------------------------------------------------------ i dati */

const SCHEDA = "flags.core.sheetClass";
const NATURA = `flags.${MODULE_ID}.nemico.natura`;
const SPC = "system.spcType";
assert.deepEqual(CAMPI_CREAZIONE, { scheda: SCHEDA, natura: NATURA, spcType: SPC });
assert.equal(new Set(Object.values(CAMPI_CREAZIONE)).size, 3, "tre campi, tre nomi diversi");

// Un PNG di M6 nasce con la scheda del nemico e la sua Natura; lo spcType solo se la Natura ne ha uno.
assert.deepEqual(datiDiCreazione({ tipo: "spc", natura: "vampire", spcType: "vampire" }), { [SCHEDA]: NEMICO_SHEET_ID, [NATURA]: "vampire", [SPC]: "vampire" });
assert.deepEqual(datiDiCreazione({ tipo: "spc", natura: "risvegliato", spcType: "" }), { [SCHEDA]: NEMICO_SHEET_ID, [NATURA]: "risvegliato" });
// Un mortale porta la scheda del Mago solo se è stata scelta.
assert.deepEqual(datiDiCreazione({ tipo: "mortal", schedaMortale: MAGE_SHEET_ID }), { [SCHEDA]: MAGE_SHEET_ID });
assert.deepEqual(datiDiCreazione({ tipo: "mortal", schedaMortale: "" }), {});
// Ogni altro tipo non porta niente, nemmeno se la tendina della scheda è rimasta sul Mago.
assert.deepEqual(datiDiCreazione({ tipo: "spc" }), {});
assert.deepEqual(datiDiCreazione({ tipo: "vampire", schedaMortale: MAGE_SHEET_ID }), {});
assert.deepEqual(datiDiCreazione(), {});

/* --------------------------------------------------------------- il finto DOM */

// Quel tanto di DOM che la finestra usa: elementi, classi, dataset, i selettori
// del modulo, il valore delle tendine, i listener.
class Nodo {
  constructor(tag) {
    this.tagName = String(tag).toUpperCase();
    this.children = [];
    this.parent = null;
    this.dataset = {};
    this.attrs = {};
    this.classi = new Set();
    this.classList = { add: (...c) => c.forEach((x) => this.classi.add(x)), contains: (c) => this.classi.has(c) };
    this.hidden = false;
    this.disabled = false;
    this.selected = false;
    this.textContent = "";
    this.name = "";
    this.label = "";
    this.type = "";
    this.valore = "";
    this.listeners = {};
  }
  append(...nodi) { for (const nodo of nodi) { nodo.parent = this; this.children.push(nodo); } }
  insertAdjacentElement(dove, nodo) {
    assert.equal(dove, "afterend");
    const fratelli = this.parent.children;
    fratelli.splice(fratelli.indexOf(this) + 1, 0, nodo);
    nodo.parent = this.parent;
  }
  setAttribute(chiave, valore) { this.attrs[chiave] = String(valore); }
  addEventListener(tipo, fn) { (this.listeners[tipo] ??= []).push(fn); }
  dispatch(tipo) { for (const fn of this.listeners[tipo] ?? []) fn({ type: tipo, target: this }); }
  *discendenti() { for (const figlio of this.children) { yield figlio; yield* figlio.discendenti(); } }
  matches(selettore) {
    const m = /^([a-z]*)(?:\.([\w-]+))?(?:\[([\w-]+)="([^"]*)"\])?$/.exec(selettore);
    assert.ok(m, `selettore non previsto dal finto DOM: ${selettore}`);
    const [, tag, classe, attributo, valore] = m;
    if (tag && this.tagName !== tag.toUpperCase()) return false;
    if (classe && !this.classi.has(classe)) return false;
    if (attributo) {
      const letto = attributo.startsWith("data-")
        ? this.dataset[attributo.slice(5).replace(/-(\w)/g, (_, c) => c.toUpperCase())]
        : (attributo === "value" ? this.value : this[attributo]);
      if (String(letto ?? "") !== valore || letto === undefined) return false;
    }
    return true;
  }
  querySelector(selettore) { for (const nodo of this.discendenti()) if (nodo.matches(selettore)) return nodo; return null; }
  closest(selettore) { for (let nodo = this; nodo; nodo = nodo.parent) if (nodo.matches(selettore)) return nodo; return null; }
  get options() { return [...this.discendenti()].filter((nodo) => nodo.tagName === "OPTION"); }
  get selectedOptions() { const scelta = this.options.find((o) => o.selected) ?? this.options[0]; return scelta ? [scelta] : []; }
  get value() { return this.tagName === "SELECT" ? (this.selectedOptions[0]?.value ?? "") : this.valore; }
  set value(v) {
    if (this.tagName !== "SELECT") { this.valore = String(v); return; }
    const scelta = this.options.find((o) => o.value === String(v));
    for (const o of this.options) o.selected = o === scelta;
  }
  /** Quel che fa chi usa la tendina: sceglie una voce, e parte il «change». */
  scegli(option) { for (const o of this.options) o.selected = o === option; this.dispatch("change"); }
}

const nodo = (tag, props = {}, figli = []) => { const n = new Nodo(tag); Object.assign(n, props); n.append(...figli); return n; };
const voce = (value, testo, selected = false) => { const o = nodo("option", { textContent: testo, selected }); o.value = value; return o; };

/** La finestra di Foundry 14 (templates/sidebar/document-create.html): nome, tipo con la sua nota, cartella. */
function finestra(tipi, { conNota = true } = {}) {
  const tipo = nodo("select", { name: "type" }, tipi.map(([value, testo]) => voce(value, testo, value === "mortal")));
  const gruppoTipo = nodo("div", {}, [nodo("label", { textContent: "Tipo" }), nodo("div", {}, [tipo])]);
  gruppoTipo.classi.add("form-group");
  if (conNota) { const nota = nodo("p"); nota.classi.add("hint"); gruppoTipo.append(nota); }
  const nome = nodo("div", {}, [nodo("input", { name: "name", type: "text" })]);
  nome.classi.add("form-group");
  const cartella = nodo("div", {}, [nodo("select", { name: "folder" }, [voce("", "")])]);
  cartella.classi.add("form-group");
  const form = nodo("form", {}, [nome, gruppoTipo, cartella]);
  return { radice: nodo("dialog", {}, [form]), form, tipo, gruppoTipo };
}

/**
 * Come Foundry 14 legge la finestra (FormDataExtended): i campi col nome, in
 * ordine; quello spento si salta; ma se più campi hanno lo stesso nome il
 * valore diventa la lista di tutti, spenti compresi. È la regola che nella
 * 1.33.0 faceva arrivare la scheda come lista.
 */
function lettaDaFoundry(form) {
  const campi = [...form.discendenti()].filter((n) => ["INPUT", "SELECT", "TEXTAREA"].includes(n.tagName));
  const dati = {};
  for (const campo of campi) {
    if (!campo.name || campo.name in dati || campo.disabled) continue;
    const omonimi = campi.filter((altro) => altro.name === campo.name);
    dati[campo.name] = omonimi.length > 1 ? omonimi.map((altro) => altro.value) : campo.value;
  }
  return dati;
}

/* ------------------------------------------------------- la finestra montata */

const parole = { "WOD5E_MAGE.Creation.Nemico.Voce": "PNG M6 · {natura}" };
const ganci = {};
globalThis.Hooks = { on: (nome, fn) => { ganci[nome] = fn; } };
globalThis.document = { createElement: (tag) => new Nodo(tag) };
globalThis.game = { i18n: {
  localize: (chiave) => parole[chiave] ?? chiave,
  format: (chiave, dati = {}) => Object.entries(dati).reduce((testo, [k, v]) => testo.replaceAll(`{${k}}`, String(v)), parole[chiave] ?? chiave)
} };
registerActorCreationChoice();
assert.equal(typeof ganci.renderDialogV2, "function");

const TIPI = [["hunter", "Cacciatore"], ["ghoul", "Ghoul"], ["werewolf", "Licantropo"], ["mortal", "Mortale"], ["spc", "PNG"], ["group", "Scheda di gruppo"], ["vampire", "Vampiro"]];
const f = finestra(TIPI);
ganci.renderDialogV2({}, f.radice);
const campiDopoUnGiro = [...f.form.discendenti()].length;
ganci.renderDialogV2({}, f.radice);
assert.equal([...f.form.discendenti()].length, campiDopoUnGiro, "un secondo render non raddoppia niente");

// Un solo campo per nome, sempre: è questo che tiene la scheda fuori dalle liste.
const nomi = [...f.form.discendenti()].map((n) => n.name).filter(Boolean);
assert.equal(new Set(nomi).size, nomi.length, `campi con lo stesso nome: ${nomi}`);
assert.deepEqual(nomi.filter((n) => n === SCHEDA), [SCHEDA]);

// La tendina Mortale/Mago e la nota del PNG di M6.
const gruppoScheda = f.form.children.find((n) => n.dataset.module === MODULE_ID && n.tagName === "DIV");
const tendinaScheda = gruppoScheda.querySelector("select");
assert.equal(tendinaScheda.name, "", "la tendina Mortale/Mago non ha nome: il dato lo porta il campo nascosto");
const note = f.gruppoTipo.children.filter((n) => n.classi.has("hint"));
assert.equal(note.length, 2, "sotto il tipo: la nota di Foundry e, dopo, quella del PNG di M6");
assert.equal(note[1].dataset.module, MODULE_ID);
assert.equal(f.gruppoTipo.querySelector(".hint"), note[0], "la prima nota resta quella di Foundry, che la riscrive a ogni cambio");

// Il gruppo «PNG di M6»: una voce per Natura, tutte `spc`.
const gruppoM6 = f.tipo.children.find((n) => n.tagName === "OPTGROUP");
assert.equal(gruppoM6.label, "WOD5E_MAGE.Creation.Nemico.Gruppo");
assert.deepEqual(gruppoM6.children.map((o) => [o.value, o.dataset.m6Natura, o.dataset.m6SpcType]), NATURE.map((n) => ["spc", n.id, n.spcType]));

// Alla prima apertura: mortale, scheda di serie, niente in più nei dati.
assert.deepEqual(lettaDaFoundry(f.form), { name: "", type: "mortal", folder: "" });
assert.equal(gruppoScheda.hidden, false);
assert.equal(note[1].hidden, true);

// Mortale con la scheda del Mago: la scheda è una stringa, mai una lista.
tendinaScheda.scegli(tendinaScheda.options[1]);
assert.deepEqual(lettaDaFoundry(f.form), { name: "", type: "mortal", [SCHEDA]: MAGE_SHEET_ID, folder: "" });

// Ogni PNG di M6: tipo spc, scheda del nemico, Natura, e lo spcType quando c'è.
for (const natura of NATURE) {
  f.tipo.scegli(gruppoM6.children.find((o) => o.dataset.m6Natura === natura.id));
  const attesi = { name: "", type: "spc", [SCHEDA]: NEMICO_SHEET_ID, [NATURA]: natura.id, folder: "" };
  if (natura.spcType) attesi[SPC] = natura.spcType;
  assert.deepEqual(lettaDaFoundry(f.form), attesi, `PNG M6, ${natura.id}`);
  assert.equal(gruppoScheda.hidden, true, "la scelta Mortale/Mago sparisce");
  assert.equal(note[1].hidden, false, "la nota del PNG di M6 compare");
}

// Il PNG del sistema, e gli altri tipi: niente scheda, niente Natura.
for (const [value] of TIPI.filter(([value]) => value !== "mortal")) {
  f.tipo.scegli(f.tipo.children.find((o) => o.value === value));
  assert.deepEqual(lettaDaFoundry(f.form), { name: "", type: value, folder: "" }, value);
  assert.equal(note[1].hidden, true);
}

// Tornando al mortale la tendina riparte dalla scheda di serie; poi il Mago, poi di nuovo un PNG di M6.
f.tipo.scegli(f.tipo.children.find((o) => o.value === "mortal"));
assert.deepEqual(lettaDaFoundry(f.form), { name: "", type: "mortal", folder: "" });
tendinaScheda.scegli(tendinaScheda.options[1]);
f.tipo.scegli(gruppoM6.children[0]);
assert.equal(lettaDaFoundry(f.form)[SCHEDA], NEMICO_SHEET_ID);
f.tipo.scegli(f.tipo.children.find((o) => o.value === "mortal"));
assert.deepEqual(lettaDaFoundry(f.form), { name: "", type: "mortal", folder: "" }, "dopo un PNG di M6 il mortale riparte pulito");

// Una finestra senza la nota di Foundry: il modulo gliela lascia pronta, e la sua resta la seconda.
const senza = finestra(TIPI, { conNota: false });
ganci.renderDialogV2({}, senza.radice);
const noteSenza = senza.gruppoTipo.children.filter((n) => n.classi.has("hint"));
assert.equal(noteSenza.length, 2);
assert.equal(noteSenza[0].dataset.module, undefined);
assert.equal(noteSenza[1].dataset.module, MODULE_ID);

// Una finestra che non è «Crea attore» (i tipi degli oggetti): il modulo non tocca niente.
const oggetti = finestra([["weapon", "Arma"], ["gear", "Oggetto"]]);
const prima = [...oggetti.form.discendenti()].length;
ganci.renderDialogV2({}, oggetti.radice);
assert.equal([...oggetti.form.discendenti()].length, prima);

// Solo PNG, senza mortale (una finestra coi tipi ristretti): le voci di M6 ci sono, la scelta Mortale/Mago no.
const soloPng = finestra([["spc", "PNG"]]);
ganci.renderDialogV2({}, soloPng.radice);
assert.equal(soloPng.form.children.some((n) => n.dataset.module === MODULE_ID && n.tagName === "DIV"), false);
const m6 = soloPng.tipo.children.find((n) => n.tagName === "OPTGROUP");
soloPng.tipo.scegli(m6.children.find((o) => o.dataset.m6Natura === "werewolf"));
assert.deepEqual(lettaDaFoundry(soloPng.form), { name: "", type: "spc", [SCHEDA]: NEMICO_SHEET_ID, [NATURA]: "werewolf", [SPC]: "werewolf", folder: "" });

console.log("crea attore: ok");
