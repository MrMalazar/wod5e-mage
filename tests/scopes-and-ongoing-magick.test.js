import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  IMPOSSIBLE_SURCHARGE,
  SCOPE_ALIASES,
  SCOPE_MAX_LEVEL,
  SCOPE_TABLE_STEPS,
  SCOPES,
  SCOPES_PER_CAST,
  canRaiseScope,
  damageBonus,
  normalizeScopeLevels,
  prepareScopeTable,
  raisedScopes,
  scopeModes,
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

// I sette Ambiti della tavola del 23/9: l'Area è una lente dei Bersagli,
// l'Impatto è nato staccato dalla Potenza.
assert.deepEqual([...SCOPES], ["targets", "conditions", "duration", "impact", "range", "potency", "precision"]);
assert.equal(SCOPE_MAX_LEVEL, 7);
assert.equal(SCOPES_PER_CAST, 3);
assert.equal(IMPOSSIBLE_SURCHARGE, 5);
assert.deepEqual(SCOPE_ALIASES, { area: "targets" });

const scopeTableTemplate = readFileSync(
  new URL("../templates/actor/parts/scope-table.hbs", import.meta.url),
  "utf8"
);
// La tavola: otto colonne, dal livello 0 al 7.
const table = prepareScopeTable();
assert.equal(table.steps.length, SCOPE_TABLE_STEPS + 1);
assert.deepEqual(table.steps, [0, 1, 2, 3, 4, 5, 6, 7]);
// Quattordici righe: due lenti per Ambito, nell'ordine della tavola.
assert.equal(table.rows.length, 14);
assert.deepEqual(table.rows.map((row) => row.id), ["targets", "targetsArea", "conditionsMalus", "conditionsComplexity", "duration", "durationWorld", "impactEpic", "impactInfo", "range", "rangeNarrative", "potencyDamage", "potencyWeight", "precision", "precisionNarrative"]);
assert.equal(table.rows[0].label, "WOD5E_MAGE.Scopes.targets");
assert.equal(table.rows.every((row) => row.cells.length === 8), true);
// La tavola per gruppi (6/9): Ambiti in ordine alfabetico della lingua,
// ognuno con la riga di titolo (nel sorvolo dice cosa misura) e le due
// lenti col solo loro nome.
const itScopes = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8")).WOD5E_MAGE.Scopes;
const localizeIt = (key) => key.startsWith("WOD5E_MAGE.Scopes.")
  ? (key.slice("WOD5E_MAGE.Scopes.".length).split(".").reduce((node, part) => node?.[part], itScopes) ?? key)
  : key;
const tableIt = prepareScopeTable(localizeIt);
assert.deepEqual(tableIt.groups.map((group) => group.name), ["Bersagli", "Condizioni", "Durata", "Impatto", "Portata", "Potenza", "Precisione"]);
assert.equal(tableIt.groups.every((group) => group.header && group.span === 2), true);
assert.deepEqual(tableIt.groups.map((group) => group.desc), SCOPES.map((id) => `WOD5E_MAGE.Scopes.Desc.${id}`).sort((a, b) => localizeIt(a.replace(".Desc.", ".")).localeCompare(localizeIt(b.replace(".Desc.", ".")))));
// Le lenti nell'ordine della tavola: la prima vale se il giocatore non sceglie.
assert.deepEqual(tableIt.groups.find((group) => group.scope === "potency").rows.map((row) => row.title), ["WOD5E_MAGE.Scopes.Sub.potencyDamage", "WOD5E_MAGE.Scopes.Sub.potencyWeight"]);
assert.deepEqual(tableIt.groups.find((group) => group.scope === "conditions").rows.map((row) => row.id), ["conditionsMalus", "conditionsComplexity"]);
assert.deepEqual(tableIt.groups.find((group) => group.scope === "duration").rows.map((row) => row.id), ["duration", "durationWorld"]);
assert.deepEqual(tableIt.groups.find((group) => group.scope === "targets").rows.map((row) => row.id), ["targets", "targetsArea"]);
assert.deepEqual(tableIt.groups.find((group) => group.scope === "impact").rows.map((row) => row.id), ["impactEpic", "impactInfo"]);
assert.deepEqual(Object.values(itScopes.Sub), ["Effetto", "Area", "Malus", "Complessità", "Gioco", "Mondo", "Epicità", "Informazione", "Scontro", "Narrativa", "Danni", "Peso", "Scontro", "Narrativa"]);
assert.equal(itScopes.Table.conditionsMalus["7"], "Stravolge il personaggio");
assert.equal(itScopes.Table.conditionsComplexity["7"], "Livello contratto");
// Le scritte pulite (Blue, 23/9: «La mano che impugna» fa cagare): la
// Precisione nello scontro parla per cose, gli esempi stanno nel sorvolo.
assert.deepEqual(Object.values(itScopes.Table.precision), ["Dove capita", "Il corpo", "Un arto", "L'oggetto impegnato", "Il punto debole", "Un punto minuscolo", "La parte interna", "Un punto del Modello"]);
assert.match(itScopes.Hint.precision["3"], /la mano che impugna/);
assert.match(scopeTableTemplate, /wod5e-mage-scope-table-note[\s\S]*Scopes\.TableHint[\s\S]*Scopes\.TableModes[\s\S]*Scopes\.TableNote/);
// Due colonne di testa (7/9): il nome dell'Ambito su tutte le sue righe (col
// sorvolo che dice cosa misura), poi la lente; la colonna dello 0 in ombra.
assert.match(scopeTableTemplate, /Scopes\.TableReading[\s\S]*scopeTable\.groups[\s\S]*group\.rows[\s\S]*@first[\s\S]*wod5e-mage-scope-group" rowspan="\{\{group\.span\}\}" title="\{\{localize group\.desc\}\}"[\s\S]*wod5e-mage-scope-reading[\s\S]*row\.title/);
assert.match(scopeTableTemplate, /<th scope="col"\{\{#unless step\}\} class="wod5e-mage-scope-zero"\{\{\/unless\}\}>/);
assert.match(scopeTableTemplate, /<td\{\{#unless cell\.step\}\} class="wod5e-mage-scope-zero"\{\{\/unless\}\}\{\{#if cell\.tip\}\} title="\{\{cell\.tip\}\}"\{\{\/if\}\}>/);
assert.equal(table.rows[10].scope, "potency");
assert.equal(table.rows[11].scope, "potency");
assert.equal(table.rows[5].scope, "duration");
// I Danni sono l'Areté più il numero (allo 0 l'Areté e basta), senza
// casella; i Bersagli portano la persona e allo 0 dicono «Un bersaglio» a
// parole; l'Area e la Durata del mondo un simbolo per cella.
assert.equal(table.rows[10].cells[0].arete, true);
assert.equal(table.rows[10].cells[0].hideLabel, true);
assert.equal(table.rows[10].cells[0].number, false);
assert.equal(table.rows[10].cells[1].hideLabel, false);
assert.equal(table.rows[10].cells[1].number, true);
assert.equal(table.rows[11].cells[0].arete, false);
assert.equal(table.rows[0].cells[0].faIcon, "fa-solid fa-user");
assert.deepEqual([table.rows[0].cells[0].number, table.rows[0].cells[0].text, table.rows[0].cells[1].number, table.rows[0].cells[1].text], [false, true, true, false]);
assert.equal(table.rows[1].cells[0].faIcon, "fa-solid fa-location-dot");
assert.equal(table.rows[1].cells[1].faIcon, "fa-solid fa-door-open");
assert.equal(table.rows[1].cells[7].faIcon, "fa-solid fa-globe");
assert.equal(table.rows[5].cells[7].faIcon, "fa-solid fa-infinity");
assert.equal(table.rows[0].cells[0].label, "WOD5E_MAGE.Scopes.Table.targets.0");
assert.equal(table.rows[10].cells[1].label, "WOD5E_MAGE.Scopes.Table.potencyDamage.1");
assert.equal(table.rows[8].cells[7].label, "WOD5E_MAGE.Scopes.Table.range.7");
assert.equal(table.rows[8].cells[7].hint, "WOD5E_MAGE.Scopes.Hint.range.7");
// Il sorvolo della cella: la spiegazione della lingua, se c'è; senza, niente.
assert.equal(table.rows[8].cells[7].tip, "");
assert.equal(tableIt.rows[8].cells[7].tip, itScopes.Hint.range["7"]);
assert.equal(tableIt.rows[5].cells[0].tip, "", "la Durata del mondo si spiega da sé");
assert.equal(tableIt.rows[5].cells[7].tip, itScopes.Hint.durationWorld["7"]);
// La Durata in gioco porta il simbolo del tempo: 0 = un turno, 1 = tre
// turni, 2 = una scena, 3 = due scene, 4 = una sessione, 5 = due sessioni,
// 6 = la storia, 7 = la cronaca.
assert.match(table.rows[4].cells[0].icon, /tempo_turno\.svg$/);
assert.match(table.rows[4].cells[1].icon, /tempo_turno\.svg$/);
assert.match(table.rows[4].cells[2].icon, /tempo_scena\.svg$/);
assert.match(table.rows[4].cells[4].icon, /tempo_sessione\.svg$/);
assert.match(table.rows[4].cells[6].icon, /tempo_storia\.svg$/);
assert.match(table.rows[4].cells[7].icon, /tempo_cronaca\.svg$/);
const itLang = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8"));
assert.deepEqual([0, 1, 2, 3, 4, 5, 6, 7].map((n) => itLang.WOD5E_MAGE.Scopes.Table.duration[String(n)]), ["1", "3", "1", "2", "1", "2", "1", "1"]);
assert.deepEqual(Object.values(itLang.WOD5E_MAGE.Scopes.DurationUnits), ["turno", "turni", "scena", "scene", "sessione", "sessioni", "storia", "cronaca"]);
assert.equal(table.rows[0].cells[0].icon, "");
assert.equal(table.rows[5].cells[0].icon, "");
// La colonna delle Sfere non esiste più: solo Ambito, lente e otto gradini.
assert.equal(table.rows[0].spheres, undefined);
assert.equal(table.rows.every((row) => row.gift === undefined), true);

// Le 112 celle della tavola hanno una voce in tutte e due le lingue (i
// Danni allo 0 sono l'Areté e basta: la voce è vuota). Il Peso parla in
// chili e tonnellate, la Portata narrativa arriva «Ovunque sia».
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8"));
  const cells = strings.WOD5E_MAGE.Scopes.Table;
  assert.equal(cells.rangeNarrative["6"], lang === "it" ? "In un altro continente" : "On another continent");
  assert.equal(cells.rangeNarrative["7"], lang === "it" ? "Ovunque sia" : "Wherever it is");
  assert.match(cells.potencyWeight["2"], /100 kg/);
  assert.match(cells.potencyWeight["6"], /500[.,]000 t/);
  assert.equal(cells.potencyDamage["0"], "");
  assert.equal(typeof strings.WOD5E_MAGE.Scopes.impact, "string");
  assert.equal(strings.WOD5E_MAGE.Scopes.PotencyWeight, undefined);
  assert.equal(strings.WOD5E_MAGE.Scopes.PotencyEpic, undefined);
  for (const scope of SCOPES) {
    assert.equal(typeof strings.WOD5E_MAGE.Scopes[scope], "string", `${lang} ${scope}`);
    assert.equal(typeof strings.WOD5E_MAGE.Scopes.Desc[scope], "string", `${lang} desc ${scope}`);
  }
  for (const row of table.rows.map((entry) => entry.id)) {
    assert.equal(typeof strings.WOD5E_MAGE.Scopes.Sub[row], "string", `${lang} sub ${row}`);
    for (let step = 0; step <= SCOPE_TABLE_STEPS; step += 1) {
      assert.equal(typeof cells[row][String(step)], "string", `${lang} ${row} ${step}`);
    }
  }
  // Le lingue hanno lo stesso mazzo di chiavi.
  assert.deepEqual(Object.keys(strings.WOD5E_MAGE.Scopes.Hint), Object.keys(itScopes.Hint), lang);
  for (const row of Object.keys(itScopes.Hint)) assert.deepEqual(Object.keys(strings.WOD5E_MAGE.Scopes.Hint[row]), Object.keys(itScopes.Hint[row]), `${lang} hint ${row}`);
}

// La tavola in scheda: niente colonna delle Sfere, niente riga del Dono.
assert.match(scopeTableTemplate, /scopeTable\.steps[\s\S]*scopeTable\.groups[\s\S]*row\.cells/);
assert.doesNotMatch(scopeTableTemplate, /gift/);
// Le colonne invisibili: ogni riga dice le sue, e la cella le rispetta.
assert.deepEqual(table.rows.map((row) => row.layout), ["symbol-number", "symbol-text", "text", "text", "symbol-number", "symbol-text", "text", "text", "text", "text", "symbol-number", "text", "text", "text"]);
assert.equal(table.rows[12].small, true);
assert.equal(table.rows[12].cells[0].text, true);
assert.match(scopeTableTemplate, /wod5e-mage-scope-cell" data-layout="\{\{cell\.layout\}\}"/);
assert.match(scopeTableTemplate, /wod5e-mage-scope-row-small/);
assert.doesNotMatch(scopeTableTemplate, /row\.spheres|TableSpheres/);

// I livelli coi nomi di oggi: l'Area di ieri è il livello dei Bersagli, il
// più alto dei due; le chiavi sconosciute cadono; il livello sta fra 0 e 7.
assert.deepEqual(normalizeScopeLevels({ area: 3, potency: 2 }), { targets: 3, potency: 2 });
assert.deepEqual(normalizeScopeLevels({ area: 3, targets: 1 }), { targets: 3 });
assert.deepEqual(normalizeScopeLevels({ area: 1, targets: 4, boh: 2, range: 12, precision: -1 }), { targets: 4, range: 7, precision: 0 });
assert.deepEqual(normalizeScopeLevels(), {});
// Tre Ambiti per lancio: il quarto non si alza, uno già alzato sì.
assert.equal(raisedScopes({ targets: 1, range: 2, potency: 0 }), 2);
assert.equal(canRaiseScope({ targets: 1, range: 2 }, "potency"), true);
assert.equal(canRaiseScope({ targets: 1, range: 2, potency: 3 }, "duration"), false);
assert.equal(canRaiseScope({ targets: 1, range: 2, potency: 3 }, "potency"), true);
assert.equal(canRaiseScope({ targets: 1, range: 2, potency: 3 }, "duration", 4), true);
assert.equal(canRaiseScope({ area: 1, range: 2, potency: 3 }, "targets"), true, "l'Area di ieri conta come Bersagli");

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
  // Le letture sono indicizzate per livello, dallo 0 al 7 (la tavola del 23/9).
  const plain = scopeReadings(localize);
  assert.equal(plain.potency.length, 8);
  assert.deepEqual(plain.potency[3][0], { sub: "Danni", text: "Areté +3", hint: it.WOD5E_MAGE.Scopes.Hint.potencyDamage["3"] }, "senza Areté resta la formula");
  assert.deepEqual(plain.potency[0][0], { sub: "Danni", text: "Areté", hint: it.WOD5E_MAGE.Scopes.Hint.potencyDamage["0"] }, "allo 0 l'Areté e basta");
  const mine = scopeReadings(localize, { arete: 3 });
  assert.deepEqual(mine.potency[3][0], { sub: "Danni", text: "6 danni", hint: `Areté 3 +3 · ${it.WOD5E_MAGE.Scopes.Hint.potencyDamage["3"]}` }, "Areté 3 al terzo pallino: 6 danni");
  assert.deepEqual(mine.potency[0][0], { sub: "Danni", text: "3 danni", hint: `Areté 3 · ${it.WOD5E_MAGE.Scopes.Hint.potencyDamage["0"]}` });
  assert.equal(mine.potency[3][1].text, plain.potency[3][1].text, "le altre letture non cambiano");
  assert.deepEqual(mine.targets[4].map((part) => [part.sub, part.text]), [["Effetto", "+4"], ["Area", "Città"]]);
  assert.deepEqual(mine.targets[0].map((part) => part.text), ["Un bersaglio", "Un punto"]);
  assert.equal(mine.range[0][0].text, "A contatto");
  assert.equal(mine.duration[5][1].text, "Un anno");
  // La Durata in gioco: numero e unità («3 turni», «1 scena»).
  assert.deepEqual([0, 1, 2, 3, 7].map((level) => mine.duration[level][0].text), ["1 turno", "3 turni", "1 scena", "2 scene", "1 cronaca"]);
  // Le lenti per la scheda: due per Ambito, otto letture e otto spiegazioni.
  const modes = scopeModes(localize, { arete: 2 });
  assert.deepEqual(modes.precision.map((mode) => mode.label), ["Scontro", "Narrativa"]);
  assert.equal(modes.precision[0].readings[3], "L'oggetto impegnato");
  assert.match(modes.precision[0].hints[3], /la mano che impugna/);
  assert.equal(modes.potency[0].readings[2], "4 danni");
  assert.equal(modes.durationWorld, undefined);
  assert.equal(modes.duration[1].hints[0], "", "senza spiegazione nella lingua, vuoto");
  const dialog = readFileSync(new URL("../templates/dialogs/arete-roll.hbs", import.meta.url), "utf8");
  assert.match(dialog, /data-role="dotReading"[^>]*><button type="button" class="wod5e-mage-arete-reading-switch" data-role="readingSwitch"[^>]*hidden>[\s\S]*?<\/button><span data-role="readingText"><\/span><\/span>/);
  const arete = readFileSync(new URL("../scripts/arete.js", import.meta.url), "utf8");
  assert.match(arete, /dotReadings\(localize, \{ arete: arete\.value \}\)/);
  // Il nome della lettura non si scrive più (10/9 notte): sta nella nota, col conto («Danni: Areté 3 +3»).
  assert.match(arete, /piece\.title = part\.sub \? `\$\{part\.sub\}: \$\{detail\}` : detail;/);
  assert.doesNotMatch(arete, /wod5e-mage-arete-reading-sub/);
}

console.log("Scopes and ongoing Magick tests passed.");
