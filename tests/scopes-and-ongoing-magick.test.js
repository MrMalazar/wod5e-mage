import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  SCOPES,
  SCOPE_TABLE_STEPS,
  damageBonus,
  prepareScopeTable,
  scopeReadings
} from "../scripts/scopes.js";
import {
  lockedParadox,
  maintainedEffectRow,
  onOngoingMagickAdd,
  onOngoingMagickDelete,
  prepareOngoingMagick,
  shouldRecordEffect
} from "../scripts/ongoing-magick.js";

function mageActor(flags = {}) {
  return {
    getFlag(_moduleId, key) {
      return flags[key];
    }
  };
}

// Gli Ambiti sono le sei colonne del listino, nell'ordine del manuale.
assert.deepEqual([...SCOPES], ["potency", "duration", "area", "targets", "conditions", "range", "precision"]);

const scopeTableTemplate = readFileSync(
  new URL("../templates/actor/parts/scope-table.hbs", import.meta.url),
  "utf8"
);
// La tavola: sei righe per sette livelli, senza righe accese.
const table = prepareScopeTable();
assert.equal(table.steps.length, SCOPE_TABLE_STEPS);
assert.deepEqual(table.steps, [1, 2, 3, 4, 5, 6, 7]);
// Dodici righe: i sette Ambiti, con la Potenza in tre (Peso, Epicità, Danni),
// la Durata in narrativa e fuori gioco, le Condizioni in quantità, malus e
// complessità (6/9).
assert.equal(table.rows.length, 13);
assert.deepEqual(table.rows.map((row) => row.id), ["potency", "potencyEpic", "potencyDamage", "duration", "durationNarrative", "area", "targets", "conditions", "conditionsDebuff", "conditionsComplexity", "range", "precision", "precisionInfo"]);
assert.equal(table.rows[0].label, "WOD5E_MAGE.Scopes.PotencyWeight");
// La tavola per gruppi (6/9): Ambiti in ordine alfabetico della lingua, chi
// ha più letture porta la riga di titolo e le letture col solo loro nome.
const itScopes = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8")).WOD5E_MAGE.Scopes;
const tableIt = prepareScopeTable((key) => key.startsWith("WOD5E_MAGE.Scopes.")
  ? (key.slice("WOD5E_MAGE.Scopes.".length).split(".").reduce((node, part) => node?.[part], itScopes) ?? key)
  : key);
assert.deepEqual(tableIt.groups.map((group) => group.name), ["Area", "Bersagli", "Condizioni", "Durata", "Portata", "Potenza", "Precisione"]);
assert.deepEqual(tableIt.groups.map((group) => group.header), [false, false, true, true, false, true, true]);
// Le letture in ordine alfabetico: Danni, Epicità, Peso.
assert.deepEqual(tableIt.groups.find((group) => group.scope === "potency").rows.map((row) => row.title), ["WOD5E_MAGE.Scopes.Sub.potencyDamage", "WOD5E_MAGE.Scopes.Sub.potencyEpic", "WOD5E_MAGE.Scopes.Sub.potency"]);
assert.deepEqual(tableIt.groups.find((group) => group.scope === "conditions").rows.map((row) => row.id), ["conditionsComplexity", "conditionsDebuff", "conditions"]);
assert.deepEqual(tableIt.groups.find((group) => group.scope === "duration").rows.map((row) => row.id), ["durationNarrative", "duration"]);
assert.equal(tableIt.groups.find((group) => group.scope === "area").rows[0].title, "WOD5E_MAGE.Scopes.area");
assert.deepEqual(Object.values(itScopes.Sub), ["Peso", "Epicità", "Danni", "Narrativa", "Fuori gioco", "Quantità", "Malus", "Complessità", "Dettaglio", "Informazione"]);
assert.equal(itScopes.Table.conditionsDebuff["7"], "Non giochi");
assert.equal(itScopes.Table.conditionsComplexity["7"], "Livello contratto");
assert.match(scopeTableTemplate, /wod5e-mage-scope-table-note[\s\S]*Scopes\.TableNote/);
// Due colonne di testa (7/9): il nome dell'Ambito su tutte le sue righe, poi la lettura.
assert.match(scopeTableTemplate, /Scopes\.TableReading[\s\S]*scopeTable\.groups[\s\S]*group\.rows[\s\S]*@first[\s\S]*wod5e-mage-scope-group" rowspan="\{\{group\.span\}\}"[\s\S]*wod5e-mage-scope-reading[\s\S]*row\.title/);
assert.equal(tableIt.groups.find((group) => group.scope === "potency").span, 3);
assert.equal(tableIt.groups.find((group) => group.scope === "area").span, 1);
assert.equal(table.rows[1].label, "WOD5E_MAGE.Scopes.PotencyEpic");
assert.equal(table.rows[1].scope, "potency");
assert.equal(table.rows[2].scope, "potency");
assert.equal(table.rows[4].scope, "duration");
// La Potenza (Danni) è l'Areté più il numero (al primo livello l'Areté e
// basta), senza casella; i Bersagli portano la persona, le Condizioni
// l'elenco, Durata narrativa e Area un simbolo per cella.
assert.equal(table.rows[0].cells[0].arete, false);
assert.equal(table.rows[1].cells[0].arete, false);
assert.equal(table.rows[2].cells[0].arete, true);
assert.equal(table.rows[2].cells[0].hideLabel, true);
assert.equal(table.rows[2].cells[1].hideLabel, false);
assert.equal(table.rows[2].cells[0].glyph, undefined);
assert.equal(table.rows[6].cells[0].faIcon, "fa-solid fa-user");
assert.equal(table.rows[7].cells[0].faIcon, "fa-solid fa-list-check");
assert.equal(table.rows[4].cells[6].faIcon, "fa-solid fa-infinity");
assert.equal(table.rows[5].cells[0].faIcon, "fa-solid fa-door-open");
assert.equal(table.rows[0].cells[0].label, "WOD5E_MAGE.Scopes.Table.potency.1");
assert.equal(table.rows[1].cells[0].label, "WOD5E_MAGE.Scopes.Table.potencyEpic.1");
assert.equal(table.rows[2].cells[0].label, "WOD5E_MAGE.Scopes.Table.potencyDamage.1");
assert.equal(table.rows[10].cells[6].label, "WOD5E_MAGE.Scopes.Table.range.7");
// La Durata porta il simbolo del tempo, gli altri Ambiti no.
// La Durata (6/9): 1 = entro 3 turni, 2 = una scena, 3 = due scene.
assert.match(table.rows[3].cells[0].icon, /tempo_turno\.svg$/);
assert.match(table.rows[3].cells[1].icon, /tempo_scena\.svg$/);
const itLang = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8"));
assert.deepEqual([1, 2, 3].map((n) => itLang.WOD5E_MAGE.Scopes.Table.duration[String(n)]), ["3", "1", "2"]);
assert.match(table.rows[3].cells[3].icon, /tempo_sessione\.svg$/);
assert.match(table.rows[3].cells[6].icon, /tempo_cronaca\.svg$/);
assert.equal(table.rows[0].cells[0].icon, "");
assert.equal(table.rows[4].cells[0].icon, "");
// La colonna delle Sfere non esiste più: solo Ambito e sette gradini.
assert.equal(table.rows[0].spheres, undefined);
assert.equal(table.rows[0].cells[0].text, true);
assert.equal(table.rows.every((row) => row.gift === undefined), true);

// Le 70 celle della tavola hanno una voce in tutte e due le lingue.
// La Potenza (Peso) parla in chili e tonnellate, la Precisione segue
// un'auto sola dal vago all'atomo (6/9).
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8"));
  const cells = strings.WOD5E_MAGE.Scopes.Table;
  // La Portata parla chiaro (6/9): «Lo vedi (entro 100 m)» … «Ovunque sia».
  assert.equal(cells.range["6"], lang === "it" ? "In un altro continente" : "On another continent");
  assert.match(cells.range["1"], /100 m/);
  assert.match(cells.potency["2"], /100 kg/);
  assert.match(cells.potency["6"], /500[.,]000 t/);
  assert.equal(typeof strings.WOD5E_MAGE.Scopes.PotencyWeight, "string");
  assert.equal(typeof strings.WOD5E_MAGE.Scopes.PotencyEpic, "string");
  assert.equal(strings.WOD5E_MAGE.Scopes.PotencyEffect, undefined);
  for (const scope of table.rows.map((row) => row.id)) {
    for (let step = 1; step <= SCOPE_TABLE_STEPS; step += 1) {
      assert.equal(typeof cells[scope][String(step)], "string", `${lang} ${scope} ${step}`);
    }
  }
}

// La tavola in scheda: niente colonna delle Sfere, niente riga del Dono.
assert.match(scopeTableTemplate, /scopeTable\.steps[\s\S]*scopeTable\.groups[\s\S]*row\.cells/);
assert.doesNotMatch(scopeTableTemplate, /gift/);
// Le colonne invisibili: ogni riga dice le sue, e la cella le rispetta.
assert.deepEqual(table.rows.map((row) => row.layout), ["text", "text", "symbol-number", "symbol-number", "symbol-text", "symbol-text", "symbol-number", "symbol-number", "text", "text", "text", "text", "text"]);
assert.equal(table.rows[2].cells[0].number, false);
assert.equal(table.rows[2].cells[1].number, true);
assert.equal(table.rows[11].small, true);
assert.equal(table.rows[11].cells[0].text, true);
assert.match(scopeTableTemplate, /wod5e-mage-scope-cell" data-layout="\{\{cell\.layout\}\}"/);
assert.match(scopeTableTemplate, /wod5e-mage-scope-row-small/);
assert.doesNotMatch(scopeTableTemplate, /row\.spheres|TableSpheres/);

let rows = prepareOngoingMagick(mageActor());
assert.equal(rows.length, 0);

rows = prepareOngoingMagick(mageActor({
  ongoingMagick: {
    row2: {
      nameSpheres: "Ward - Forces 2",
      status: "Active",
      triggerEffect: "At sunset"
    }
  }
}));
assert.equal(rows[0].nameSpheres, "Ward - Forces 2");
assert.equal(rows[0].status, "Active");
assert.equal(rows[0].triggerEffect, "At sunset");
assert.deepEqual([rows[0].vulgar, rows[0].duration, rows[0].threshold, rows[0].lock], [false, 0, 0, 0]);

// Le Magick in atto (6/9): il Volgare in piedi blocca 1 Paradosso permanente;
// si segna quando è mantenuto o ha una Durata.
const vulgarRow = maintainedEffectRow({ name: "Fiamma", vulgar: true, duration: 2, threshold: 4, maintained: true, status: "Mantenuto" });
assert.deepEqual([vulgarRow.lock, vulgarRow.duration, vulgarRow.threshold, vulgarRow.vulgar, vulgarRow.nameSpheres], [1, 2, 4, true, "Fiamma"]);
assert.equal(maintainedEffectRow({ name: "Sussurro", vulgar: false, duration: 1 }).lock, 0);
assert.equal(shouldRecordEffect({ maintained: false, duration: 0 }), false);
assert.equal(shouldRecordEffect({ maintained: true, duration: 0 }), true);
assert.equal(shouldRecordEffect({ maintained: false, duration: 3 }), true);
assert.equal(lockedParadox(mageActor({ ongoingMagick: { a: { lock: 1 }, b: { lock: 0 }, c: vulgarRow } })), 2);
// On/Off (6/9): la riga nasce accesa; spenta non blocca Paradosso, e porta l'Effetto (l'Obiettivo).
assert.equal(vulgarRow.active, true);
assert.equal(maintainedEffectRow({ name: "Velo", effect: "sparire alla vista" }).triggerEffect, "sparire alla vista");
assert.equal(lockedParadox(mageActor({ ongoingMagick: { a: { lock: 1, active: false }, c: vulgarRow } })), 1);
assert.equal(prepareOngoingMagick(mageActor({ ongoingMagick: { a: { lock: 1, active: false }, b: { lock: 1 } } })).map((row) => row.active).join(","), "false,true");
const spheresOngoing = readFileSync(new URL("../templates/actor/parts/spheres.hbs", import.meta.url), "utf8");
assert.match(spheresOngoing, /data-action="ongoingMagickToggle" data-row="\{\{row\.id\}\}"[\s\S]*OngoingMagick\.On[\s\S]*ongoingMagick\.\{\{row\.id\}\}\.nameSpheres[\s\S]*ongoingMagick\.\{\{row\.id\}\}\.triggerEffect/);
assert.doesNotMatch(spheresOngoing, /ongoingMagick\.\{\{row\.id\}\}\.status/);
assert.equal(lockedParadox(mageActor()), 0);

globalThis.foundry = {
  utils: {
    randomID: () => "newRow"
  }
};

let storedRows = {};
const editableActor = {
  isOwner: true,
  name: "Mage",
  system: { locked: false },
  getFlag() {
    return storedRows;
  },
  async setFlag(_moduleId, _key, value) {
    storedRows = value;
  },
  async update(data) {
    this.lastUpdate = data;
  }
};
const event = { preventDefault() {} };

await onOngoingMagickAdd.call({ actor: editableActor }, event);
assert.deepEqual(storedRows.newRow, {
  nameSpheres: "",
  status: "",
  triggerEffect: "",
  active: true
});

await onOngoingMagickDelete.call(
  { actor: editableActor },
  event,
  { dataset: { row: "newRow" } }
);
assert.deepEqual(editableActor.lastUpdate, {
  "flags.wod5e-mage.ongoingMagick.-=newRow": null
});

// Le letture accanto ai pallini (9/9, 10/9): i Danni della Potenza sono l'Areté
// più il numero; con l'Areté del personaggio il conto è già fatto, e la somma
// sta nella nota. Il tasto che cambia lettura sta PRIMA della voce.
{
  const it = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8"));
  const localize = (key) => key.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), it) ?? key;
  assert.equal(damageBonus("+3"), 3);
  assert.equal(damageBonus("+0"), 0);
  assert.equal(damageBonus("Città"), null);
  const plain = scopeReadings(localize);
  assert.deepEqual(plain.potency[2][0], { sub: "Danni", text: "Areté +3", hint: "" }, "senza Areté resta la formula");
  const mine = scopeReadings(localize, { arete: 3 });
  assert.deepEqual(mine.potency[2][0], { sub: "Danni", text: "6 danni", hint: "Areté 3 +3" }, "Areté 3 al terzo pallino: 6 danni");
  assert.deepEqual(mine.potency[0][0], { sub: "Danni", text: "3 danni", hint: "Areté 3 +0" });
  assert.equal(mine.potency[2][1].text, plain.potency[2][1].text, "le altre letture non cambiano");
  assert.deepEqual(mine.area[3], [{ sub: "", text: "Città", hint: "" }]);
  assert.equal(mine.duration[4][0].text, "Un anno");
  const dialog = readFileSync(new URL("../templates/dialogs/arete-roll.hbs", import.meta.url), "utf8");
  assert.match(dialog, /data-role="dotReading"[^>]*><button type="button" class="wod5e-mage-arete-reading-switch" data-role="readingSwitch"[^>]*hidden>[\s\S]*?<\/button><span data-role="readingText"><\/span><\/span>/);
  const arete = readFileSync(new URL("../scripts/arete.js", import.meta.url), "utf8");
  assert.match(arete, /dotReadings\(localize, \{ arete: arete\.value \}\)/);
  // Il nome della lettura non si scrive più (10/9 notte): sta nella nota, col conto («Danni: Areté 3 +3»).
  assert.match(arete, /piece\.title = part\.sub \? `\$\{part\.sub\}: \$\{detail\}` : detail;/);
  assert.doesNotMatch(arete, /wod5e-mage-arete-reading-sub/);
}

console.log("Scopes and ongoing Magick tests passed.");
