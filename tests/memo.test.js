import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { prepareMemo, statoInsieme } from "../scripts/memo.js";

// Il memo di creazione come spunta (Blue, 23/9): da un riepilogo, lo stato
// di ogni riquadro della prima pagina e di ogni linguetta.
const summary = {
  counts: [
    { id: "attributes", value: 12, target: 22, state: "under", sfida: 0 },
    { id: "skills", value: 20, target: 20, state: "exact", sfida: 1 },
    { id: "backgrounds", value: 3, target: null, state: "", sfida: 0 },
    { id: "merits", value: 9, target: 9, state: "exact", sfida: 2 },
    { id: "flaws", value: 3, target: 2, state: "over", sfida: 0 },
    { id: "domini", value: 3, target: null, state: "", sfida: 0 },
    { id: "poteri", value: 3, target: 3, state: "exact", sfida: 0 }
  ],
  checks: [
    { id: "skillCap", ok: true, target: 3 },
    { id: "concept", ok: false },
    { id: "anchors", ok: true },
    { id: "convictions", ok: false },
    { id: "instruments", ok: true },
    { id: "arete", ok: true, target: 1 }
  ],
  sfida: { done: 2, total: 3, complete: false, prizes: [{ count: "skills", bonus: 1, earned: true }, { count: "merits", bonus: 2, earned: true }, { count: "poteri", bonus: 1, earned: false }] }
};

const memo = prepareMemo(summary, { on: true });
assert.equal(memo.on, true);
assert.deepEqual([memo.boxes.attributi.text, memo.boxes.attributi.state], ["12/22", "under"]);
assert.deepEqual([memo.boxes.abilita.text, memo.boxes.abilita.state, memo.boxes.abilita.sfida, memo.boxes.abilita.tetto.ok], ["20/20", "exact", 1, true]);
assert.deepEqual([memo.boxes.identita.state, memo.boxes.identita.concetto], ["under", false]);
// La Magick (25/9): i Domini aperti senza traguardo, i poteri uno per Dominio.
assert.deepEqual([memo.boxes.magick.state, memo.boxes.magick.arete.ok, memo.boxes.magick.domini.text, memo.boxes.magick.poteri.text], ["exact", true, "3", "3/3"]);
// I Tratti: i Vantaggi pari ma i Difetti sopra il traguardo: giallo.
assert.deepEqual([memo.boxes.tratti.state, memo.boxes.tratti.vantaggi.text, memo.boxes.tratti.vantaggi.sfida, memo.boxes.tratti.difetti.state], ["over", "9/9", 2, "over"]);
// Le linguette: la Bussola rossa (manca la Convinzione), il Credo verde, la Sfida senza colore finché non è completa, i Tratti come il riquadro.
assert.deepEqual([memo.tabs.personaggio.state, memo.tabs.focus.state, memo.tabs.conceptChallenge.state, memo.tabs.dotazione.state], ["under", "exact", "", "over"]);
assert.deepEqual([memo.tabs.conceptChallenge.done, memo.tabs.conceptChallenge.total], [2, 3]);
assert.equal(memo.sfida.done, 2);

// Il tetto sforato fa rosso il riquadro delle Abilità anche a conto pari.
const sforato = prepareMemo({ ...summary, checks: summary.checks.map((c) => (c.id === "skillCap" ? { ...c, ok: false } : c)) }, { on: true });
assert.equal(sforato.boxes.abilita.state, "under");
// La Sfida completa colora la linguetta di verde.
assert.equal(prepareMemo({ ...summary, sfida: { ...summary.sfida, done: 3, complete: true } }, { on: true }).tabs.conceptChallenge.state, "exact");
// Spento: nessun colore sui riquadri (i template guardano memo.on).
assert.equal(prepareMemo(summary, { on: false }).on, false);
assert.equal(prepareMemo(undefined).on, false);
assert.deepEqual([statoInsieme(["exact", "under"]), statoInsieme(["exact", "over"]), statoInsieme(["exact", ""]), statoInsieme([])], ["under", "over", "exact", ""]);

// I template: la barra del memo, i conti sui titoli, le linguette con lookup.
const read = (name) => readFileSync(new URL(`../templates/actor/parts/${name}`, import.meta.url), "utf8");
assert.match(read("stat.hbs"), /wod5e-mage-creazione-barra\{\{#if memo\.on\}\} acceso\{\{\/if\}\}[\s\S]*name="flags\.wod5e-mage\.creazione\.memo"[\s\S]*wod5e-mage-stat-bonus/);
for (const [file, box] of [["stat-attributi.hbs", "attributi"], ["stat-abilita.hbs", "abilita"], ["stat-magick.hbs", "magick"], ["stat-tratti.hbs", "tratti"], ["stat-identita.hbs", "identita"]]) {
  assert.match(read(file), new RegExp(`wod5e-mage-riq-title[a-z0-9 -]*\\{\\{#if memo\\.on\\}\\} memo-\\{\\{memo\\.boxes\\.${box}\\.state\\}\\}\\{\\{\\/if\\}\\}`), file);
  assert.match(read(file), /wod5e-mage-memo-conto/, file);
}
assert.match(read("tab-navigation.hbs"), /\{\{#with \(lookup @root\.memo\.tabs tab\.id\) as \|stato\|\}\}[\s\S]*wod5e-mage-tab-memo memo-\{\{stato\.state\}\}/);
const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheet, /context\.memo = prepareMemo\(context\.creationSummary, \{ on: Boolean\(creazione\.memo\) \}\)/);
// La stessa spunta accende i tasti di reset (Blue, 23/9).
assert.match(sheet, /context\.creazioneReset = context\.memo\.on \|\| Boolean\(creazione\.reset\)/);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8")).WOD5E_MAGE.Riepilogo;
  for (const key of ["MemoHint", "SfidaHint", "ConceptBreve", "SkillCapBreve"]) assert.equal(typeof strings[key], "string", `${lang} ${key}`);
  assert.deepEqual(Object.keys(strings.SfidaPremi), ["skills", "merits", "poteri"], lang);
}
const css = readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8");
for (const rule of ["wod5e-mage-riq-title.memo-under", "wod5e-mage-riq-title.memo-exact", "wod5e-mage-riq-title.memo-over", "wod5e-mage-tab-memo.memo-under::after", "wod5e-mage-memo-premio.preso"]) assert.ok(css.includes(rule), rule);

console.log("Memo di creazione: test passati.");
