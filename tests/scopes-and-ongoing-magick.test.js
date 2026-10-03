import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  EPIC_MIN,
  EPIC_SCOPE,
  SCOPE_ALIASES,
  SCOPE_MAX_LEVEL,
  SCOPE_TABLE_STEPS,
  SCOPES,
  SCOPES_PER_CAST,
  ambitiDelLancio,
  canRaiseScope,
  damageBonus,
  epicita,
  livelliDelLancio,
  normalizeScopeLevels,
  ordinaAmbiti,
  prepareScopeTable,
  raisedScopes,
  scopeMin,
  scopeModes,
  scopeReadings
} from "../scripts/scopes.js";
import {
  lockedParadox,
  maintainedEffectRow,
  onOngoingMagickLock,
  scopesInParole,
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

// Gli Ambiti (la tavola del 23/9 rifatta il 29/9 e il 2/10): in cima
// l'Epicità, poi i sei; l'Area è una lente dei Bersagli; l'Impatto è uscito,
// e l'Informazione è tornata nella Precisione. Il +5 delle imprese
// impossibili non c'è più: sono l'Epicità 6 e 7.
assert.deepEqual([...SCOPES], ["epic", "targets", "conditions", "duration", "range", "potency", "precision"]);
assert.equal(EPIC_SCOPE, "epic");
assert.equal(EPIC_MIN, 1);
assert.equal(SCOPE_MAX_LEVEL, 7);
assert.equal(SCOPES_PER_CAST, 3);
assert.deepEqual(SCOPE_ALIASES, { area: "targets" });
assert.doesNotMatch(readFileSync(new URL("../scripts/scopes.js", import.meta.url), "utf8"), /IMPOSSIBLE_SURCHARGE/);

const scopeTableTemplate = readFileSync(
  new URL("../templates/actor/parts/scope-table.hbs", import.meta.url),
  "utf8"
);
// La tavola: otto colonne, dal livello 0 al 7.
const table = prepareScopeTable();
assert.equal(table.steps.length, SCOPE_TABLE_STEPS + 1);
assert.deepEqual(table.steps, [0, 1, 2, 3, 4, 5, 6, 7]);
// Quindici righe: l'Epicità, poi una, due o tre lenti per Ambito,
// nell'ordine della tavola (2/10: Malus e bonus in una, il Dettaglio in una;
// 3/10: il Legame, terza lente della Portata).
assert.equal(table.rows.length, 15);
assert.deepEqual(table.rows.map((row) => row.id), ["epic", "targets", "targetsArea", "conditionsMalus", "conditionsComplexity", "duration", "durationWorld", "range", "rangeNarrative", "rangeBond", "potencyDamage", "potencyWeight", "potencyInfluence", "precision", "precisionInfo"]);
const riga = (id) => table.rows.find((row) => row.id === id);
assert.equal(riga("targets").label, "WOD5E_MAGE.Scopes.targets");
assert.equal(table.rows.every((row) => row.cells.length === 8), true);
// L'Epicità non ha lo 0: la casella c'è, vuota; le altre sette parlano.
assert.equal(riga("epic").base, true);
assert.equal(riga("epic").sublabel, "");
assert.deepEqual([riga("epic").cells[0].empty, riga("epic").cells[0].label, riga("epic").cells[0].text], [true, "", false]);
assert.deepEqual([riga("epic").cells[1].empty, riga("epic").cells[1].label, riga("epic").cells[1].text], [undefined, "WOD5E_MAGE.Scopes.Table.epic.1", true]);
assert.equal(table.span, 10, "nome, lente e gli otto livelli");
// La tavola per gruppi (6/9): Ambiti in ordine alfabetico della lingua,
// ognuno con la riga di titolo (nel sorvolo dice cosa misura) e le due
// lenti col solo loro nome.
const itScopes = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8")).WOD5E_MAGE.Scopes;
const localizeIt = (key) => key.startsWith("WOD5E_MAGE.Scopes.")
  ? (key.slice("WOD5E_MAGE.Scopes.".length).split(".").reduce((node, part) => node?.[part], itScopes) ?? key)
  : key;
const tableIt = prepareScopeTable(localizeIt);
// L'Epicità in cima, staccata (Blue, 2/10: «come impatto sopra con gli altri,
// però leggermente distaccato»), poi gli Ambiti in ordine alfabetico.
assert.deepEqual(tableIt.groups.map((group) => group.name), ["Epicità", "Bersagli", "Condizioni", "Durata", "Portata", "Potenza", "Precisione"]);
assert.deepEqual(tableIt.groups.map((group) => group.base), [true, false, false, false, false, false, false]);
assert.equal(tableIt.groups.every((group) => group.header), true);
assert.deepEqual(Object.fromEntries(tableIt.groups.map((group) => [group.scope, group.span])), { epic: 1, targets: 2, conditions: 2, duration: 2, range: 3, potency: 3, precision: 2 });
assert.deepEqual(tableIt.groups.map((group) => group.desc), ["WOD5E_MAGE.Scopes.Desc.epic", ...SCOPES.filter((id) => id !== "epic").map((id) => `WOD5E_MAGE.Scopes.Desc.${id}`).sort((a, b) => localizeIt(a.replace(".Desc.", ".")).localeCompare(localizeIt(b.replace(".Desc.", "."))))]);
assert.match(scopeTableTemplate, /\{\{#if group\.base\}\}<tr class="wod5e-mage-scope-stacco" aria-hidden="true"><td colspan="\{\{@root\.scopeTable\.span\}\}"><\/td><\/tr>\{\{\/if\}\}/, "lo stacco sotto l'Epicità");
// Le lenti nell'ordine della tavola: la prima vale se il giocatore non sceglie.
assert.deepEqual(tableIt.groups.find((group) => group.scope === "potency").rows.map((row) => row.title), ["WOD5E_MAGE.Scopes.Sub.potencyDamage", "WOD5E_MAGE.Scopes.Sub.potencyWeight", "WOD5E_MAGE.Scopes.Sub.potencyInfluence"]);
assert.deepEqual(tableIt.groups.find((group) => group.scope === "conditions").rows.map((row) => row.id), ["conditionsMalus", "conditionsComplexity"]);
assert.deepEqual(tableIt.groups.find((group) => group.scope === "precision").rows.map((row) => row.id), ["precision", "precisionInfo"]);
assert.deepEqual(tableIt.groups.find((group) => group.scope === "epic").rows.map((row) => row.id), ["epic"]);
assert.deepEqual(tableIt.groups.find((group) => group.scope === "duration").rows.map((row) => row.id), ["duration", "durationWorld"]);
assert.deepEqual(tableIt.groups.find((group) => group.scope === "targets").rows.map((row) => row.id), ["targets", "targetsArea"]);
assert.deepEqual(tableIt.groups.find((group) => group.scope === "range").rows.map((row) => row.id), ["range", "rangeNarrative", "rangeBond"]);
assert.equal(tableIt.groups.some((group) => group.scope === "impact"), false);
assert.deepEqual(Object.values(itScopes.Sub), ["Effetto", "Area", "Malus e bonus", "Complessità", "Gioco", "Mondo", "Scontro", "Narrativa", "Legame", "Danni", "Peso", "Influenza", "Dettaglio", "Informazione"]);
// L'Epicità (2/10): sette gesti, dal trucco all'impossibile, con gli esempi nel sorvolo.
assert.equal(itScopes.epic, "Epicità");
assert.deepEqual(Object.entries(itScopes.Table.epic), [["1", "Trucco"], ["2", "Spinta"], ["3", "Mutamento"], ["4", "Prodigio"], ["5", "Creazione"], ["6", "Miracolo"], ["7", "Impossibile"]]);
assert.match(itScopes.Hint.epic["7"], /viaggiare nel tempo/);
assert.match(itScopes.Desc.epic, /almeno 1/);
// Malus e bonus (2/10): il bonus è il malus girato, coi gradi delle
// Condizioni; l'Influenza va dalle emozioni a pilotare la persona;
// l'Informazione misura la rarità (chi sa la cosa).
assert.deepEqual(Object.values(itScopes.Table.conditionsMalus), ["Niente", "Lieve", "Mezzo", "Grado 1", "Grado 2", "Grado 3", "Tipo", "Tutto"]);
assert.match(itScopes.Hint.conditionsMalus["4"], /−2 e difficoltà 8, o \+2 e mai 8/);
assert.equal(itScopes.Table.conditionsBenefit, undefined, "il Beneficio sta in Malus e bonus");
assert.equal(itScopes.Table.potencyInfluence["1"], "Le emozioni");
assert.equal(itScopes.Table.potencyInfluence["7"], "La piloti");
assert.equal(itScopes.Table.precisionInfo["1"], "Lo sanno tutti");
assert.equal(itScopes.Table.precisionInfo["7"], "Non l'ha mai saputo nessuno");
assert.match(itScopes.Desc.potency, /non è una Condizione/);
assert.match(itScopes.Desc.conditions, /il bonus è il malus girato, e non entra nei lanci di Magick/);
assert.doesNotMatch(JSON.stringify(itScopes), /Impatto|Beneficio|impresa impossibile|\+5 dopo il conto/);
assert.equal(itScopes.Zero, undefined, "il pallino dello 0 non c'è più (2/10)");
assert.equal(itScopes.Table.conditionsComplexity["7"], "Livello contratto");
// Il Legame (3/10): la terza lente della Portata, dal sangue al filo più
// esile; lo 0 è lo stesso delle altre lenti, il 7 è ancora un legame e senza
// nemmeno quello serve la Corrispondenza.
assert.deepEqual(Object.values(itScopes.Table.rangeBond), ["Lo tocchi", "Sangue", "Intimo", "Amico", "Conoscente", "Incontro", "Nome", "Filo"]);
assert.match(itScopes.Hint.rangeBond["1"], /sangue del tuo sangue/i);
assert.match(itScopes.Hint.rangeBond["7"], /serve la Corrispondenza/);
assert.match(itScopes.Desc.range, /Legame/);
assert.doesNotMatch(itScopes.Desc.range, /Regola del Ponte/);
// Il Dettaglio (2/10: Scontro e Narrativa in una lente, una parola per
// casella); gli esempi di tutti e due stanno nel sorvolo.
assert.deepEqual(Object.values(itScopes.Table.precision), ["Nessuno", "Corpo", "Parte", "Particolare", "Punto", "Granello", "Molecola", "Atomo"]);
assert.match(itScopes.Hint.precision["3"], /la mano che impugna/);
assert.match(itScopes.Hint.precision["3"], /la chiave nella toppa/);
assert.equal(itScopes.Table.precisionNarrative, undefined);
assert.doesNotMatch(scopeTableTemplate, /wod5e-mage-scope-table-note|Scopes\.TableHint|Scopes\.TableModes|Scopes\.TableNote/, "niente note in corsivo sotto la tavola (Blue, 25/9)");
// Due colonne di testa (7/9): il nome dell'Ambito su tutte le sue righe (col
// sorvolo che dice cosa misura), poi la lente; la colonna dello 0 in ombra.
assert.match(scopeTableTemplate, /Scopes\.TableReading[\s\S]*scopeTable\.groups[\s\S]*group\.rows[\s\S]*@first[\s\S]*wod5e-mage-scope-group" rowspan="\{\{group\.span\}\}" title="\{\{localize group\.desc\}\}"[\s\S]*wod5e-mage-scope-reading[\s\S]*row\.title/);
assert.match(scopeTableTemplate, /<th scope="col"\{\{#unless step\}\} class="wod5e-mage-scope-zero"\{\{\/unless\}\}>/);
assert.match(scopeTableTemplate, /<td\{\{#unless cell\.step\}\} class="wod5e-mage-scope-zero"\{\{\/unless\}\}\{\{#if cell\.tip\}\} title="\{\{cell\.tip\}\}"\{\{\/if\}\}>/);
assert.equal(riga("potencyDamage").scope, "potency");
assert.equal(riga("potencyInfluence").scope, "potency");
assert.equal(riga("durationWorld").scope, "duration");
// I Danni sono l'Areté più il numero (allo 0 l'Areté e basta), senza
// casella; i Bersagli portano la persona e allo 0 dicono «Un bersaglio» a
// parole; l'Area e la Durata del mondo un simbolo per cella.
assert.equal(riga("potencyDamage").cells[0].arete, true);
assert.equal(riga("potencyDamage").cells[0].hideLabel, true);
assert.equal(riga("potencyDamage").cells[0].number, false);
assert.equal(riga("potencyDamage").cells[1].hideLabel, false);
assert.equal(riga("potencyDamage").cells[1].number, true);
assert.equal(riga("potencyWeight").cells[0].arete, false);
assert.equal(riga("potencyInfluence").cells[0].arete, false);
assert.equal(riga("targets").cells[0].faIcon, "fa-solid fa-user");
assert.deepEqual([riga("targets").cells[0].number, riga("targets").cells[0].text, riga("targets").cells[1].number, riga("targets").cells[1].text], [false, true, true, false]);
assert.equal(riga("targetsArea").cells[0].faIcon, "fa-solid fa-location-dot");
assert.equal(riga("targetsArea").cells[1].faIcon, "fa-solid fa-door-open");
assert.equal(riga("targetsArea").cells[7].faIcon, "fa-solid fa-globe");
assert.equal(riga("durationWorld").cells[7].faIcon, "fa-solid fa-infinity");
assert.equal(riga("targets").cells[0].label, "WOD5E_MAGE.Scopes.Table.targets.0");
assert.equal(riga("potencyDamage").cells[1].label, "WOD5E_MAGE.Scopes.Table.potencyDamage.1");
assert.equal(riga("range").cells[7].label, "WOD5E_MAGE.Scopes.Table.range.7");
assert.equal(riga("range").cells[7].hint, "WOD5E_MAGE.Scopes.Hint.range.7");
// Il sorvolo della cella: la spiegazione della lingua, se c'è; senza, niente.
const rigaIt = (id) => tableIt.rows.find((row) => row.id === id);
assert.equal(riga("range").cells[7].tip, "");
assert.equal(rigaIt("range").cells[7].tip, itScopes.Hint.range["7"]);
assert.equal(rigaIt("durationWorld").cells[0].tip, "", "la Durata del mondo si spiega da sé");
assert.equal(rigaIt("durationWorld").cells[7].tip, itScopes.Hint.durationWorld["7"]);
assert.equal(rigaIt("potencyInfluence").cells[7].tip, itScopes.Hint.potencyInfluence["7"]);
assert.equal(rigaIt("precisionInfo").cells[5].tip, itScopes.Hint.precisionInfo["5"]);
// La Durata in gioco porta il simbolo del tempo: 0 = un turno, 1 = tre
// turni, 2 = una scena, 3 = due scene, 4 = una sessione, 5 = due sessioni,
// 6 = la storia, 7 = la cronaca.
assert.match(riga("duration").cells[0].icon, /tempo_turno\.svg$/);
assert.match(riga("duration").cells[1].icon, /tempo_turno\.svg$/);
assert.match(riga("duration").cells[2].icon, /tempo_scena\.svg$/);
assert.match(riga("duration").cells[4].icon, /tempo_sessione\.svg$/);
assert.match(riga("duration").cells[6].icon, /tempo_storia\.svg$/);
assert.match(riga("duration").cells[7].icon, /tempo_cronaca\.svg$/);
const itLang = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8"));
assert.deepEqual([0, 1, 2, 3, 4, 5, 6, 7].map((n) => itLang.WOD5E_MAGE.Scopes.Table.duration[String(n)]), ["1", "3", "1", "2", "1", "2", "1", "1"]);
assert.deepEqual(Object.values(itLang.WOD5E_MAGE.Scopes.DurationUnits), ["turno", "turni", "scena", "scene", "sessione", "sessioni", "storia", "cronaca"]);
assert.equal(riga("targets").cells[0].icon, "");
assert.equal(riga("durationWorld").cells[0].icon, "");
// La colonna delle Sfere non esiste più: solo Ambito, lente e otto gradini.
assert.equal(riga("targets").spheres, undefined);
assert.equal(table.rows.every((row) => row.gift === undefined), true);

// Le 128 celle della tavola hanno una voce in tutte e due le lingue (i
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
  assert.equal(strings.WOD5E_MAGE.Scopes.impact, undefined, "l'Impatto è uscito (29/9)");
  assert.equal(strings.WOD5E_MAGE.Scopes.Desc.impact, undefined);
  assert.equal(strings.WOD5E_MAGE.Scopes.PotencyWeight, undefined);
  assert.equal(strings.WOD5E_MAGE.Scopes.PotencyEpic, undefined);
  for (const scope of SCOPES) {
    assert.equal(typeof strings.WOD5E_MAGE.Scopes[scope], "string", `${lang} ${scope}`);
    assert.equal(typeof strings.WOD5E_MAGE.Scopes.Desc[scope], "string", `${lang} desc ${scope}`);
  }
  for (const row of table.rows) {
    // L'Epicità ha una lente sola, senza nome, e niente 0.
    if (row.sublabel) assert.equal(typeof strings.WOD5E_MAGE.Scopes.Sub[row.id], "string", `${lang} sub ${row.id}`);
    for (let step = row.base ? EPIC_MIN : 0; step <= SCOPE_TABLE_STEPS; step += 1) {
      assert.equal(typeof cells[row.id][String(step)], "string", `${lang} ${row.id} ${step}`);
    }
  }
  assert.equal(cells.epic["0"], undefined, `${lang}: l'Epicità parte da 1`);
  assert.equal(strings.WOD5E_MAGE.Scopes.Zero, undefined, `${lang}: niente pallino dello 0`);
  assert.equal(strings.WOD5E_MAGE.Nemico.Impossibile, undefined, `${lang}: niente +5`);
  // Le lingue hanno lo stesso mazzo di chiavi.
  assert.deepEqual(Object.keys(strings.WOD5E_MAGE.Scopes.Hint), Object.keys(itScopes.Hint), lang);
  for (const row of Object.keys(itScopes.Hint)) assert.deepEqual(Object.keys(strings.WOD5E_MAGE.Scopes.Hint[row]), Object.keys(itScopes.Hint[row]), `${lang} hint ${row}`);
}

// La tavola in scheda: niente colonna delle Sfere, niente riga del Dono.
assert.match(scopeTableTemplate, /scopeTable\.steps[\s\S]*scopeTable\.groups[\s\S]*row\.cells/);
assert.doesNotMatch(scopeTableTemplate, /gift/);
// Le colonne invisibili: ogni riga dice le sue, e la cella le rispetta.
assert.deepEqual(table.rows.map((row) => row.layout), ["text", "symbol-number", "symbol-text", "text", "text", "symbol-number", "symbol-text", "text", "text", "text", "symbol-number", "text", "text", "text", "text"]);
// Una parola per casella (2/10): il Dettaglio e Malus e bonus tornano al carattere pieno.
assert.equal(riga("precision").small, false);
assert.equal(riga("conditionsMalus").small, false);
assert.equal(riga("precision").cells[0].text, true);
assert.equal(riga("precisionInfo").small, true);
assert.match(scopeTableTemplate, /wod5e-mage-scope-cell" data-layout="\{\{cell\.layout\}\}"/);
assert.match(scopeTableTemplate, /wod5e-mage-scope-row-small/);
assert.doesNotMatch(scopeTableTemplate, /row\.spheres|TableSpheres/);

// I livelli coi nomi di oggi: l'Area di ieri è il livello dei Bersagli, il
// più alto dei due; le chiavi sconosciute cadono; il livello sta fra 0 e 7.
assert.deepEqual(normalizeScopeLevels({ area: 3, potency: 2 }), { targets: 3, potency: 2 });
assert.deepEqual(normalizeScopeLevels({ area: 3, targets: 1 }), { targets: 3 });
assert.deepEqual(normalizeScopeLevels({ area: 1, targets: 4, boh: 2, range: 12, precision: -1 }), { targets: 4, range: 7, precision: 0 });
assert.deepEqual(normalizeScopeLevels(), {});
assert.deepEqual(normalizeScopeLevels({ epic: 9, potency: 2 }), { epic: 7, potency: 2 });
// Tre Ambiti per lancio: il quarto non si alza, uno già alzato sì.
assert.equal(raisedScopes({ targets: 1, range: 2, potency: 0 }), 2);
assert.equal(canRaiseScope({ targets: 1, range: 2 }, "potency"), true);
assert.equal(canRaiseScope({ targets: 1, range: 2, potency: 3 }, "duration"), false);
assert.equal(canRaiseScope({ targets: 1, range: 2, potency: 3 }, "potency"), true);
assert.equal(canRaiseScope({ targets: 1, range: 2, potency: 3 }, "duration", 4), true);
assert.equal(canRaiseScope({ area: 1, range: 2, potency: 3 }, "targets"), true, "l'Area di ieri conta come Bersagli");
// L'Epicità sta fuori dal tetto: non conta fra gli alzati e si alza sempre.
assert.equal(raisedScopes({ epic: 5, targets: 1, range: 2 }), 2);
assert.equal(canRaiseScope({ epic: 5, targets: 1, range: 2 }, "potency"), true);
assert.equal(canRaiseScope({ targets: 1, range: 2, potency: 3 }, "epic"), true);
// Ogni lancio vale almeno 1 di Epicità; gli Ambiti del lancio in fila, l'Epicità per prima.
assert.equal(epicita({}), 1);
assert.equal(epicita({ epic: 0 }), 1);
assert.equal(epicita({ epic: 6 }), 6);
assert.equal(epicita({ epic: 12 }), 7);
assert.deepEqual(livelliDelLancio({ area: 2 }), { targets: 2, epic: 1 });
assert.deepEqual(ambitiDelLancio({ potency: 3, epic: 0, duration: 2 }), [{ id: "epic", level: 1 }, { id: "duration", level: 2 }, { id: "potency", level: 3 }]);
assert.deepEqual(ambitiDelLancio({ epic: 4 }), [{ id: "epic", level: 4 }]);
assert.deepEqual([scopeMin("epic"), scopeMin("potency")], [1, 0]);
assert.deepEqual([{ id: "range", label: "Portata" }, { id: "epic", label: "Epicità" }, { id: "targets", label: "Bersagli" }].sort((a, b) => ordinaAmbiti(a, b)).map((entry) => entry.id), ["epic", "targets", "range"]);

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
const vulgarRow = maintainedEffectRow({ name: "Fiamma", vulgar: true, duration: 2, threshold: 4, maintained: true, status: "Mantenuto", caster: "Guendalina", spheres: ["forces", "prime", "boh"], scopes: { potency: 3, duration: 2, boh: 9 }, composition: "Forze + Primordio · Formula: Danneggiare", scopesText: "Potenza 3, Durata 2", modifiers: "Armonia +1" });
assert.deepEqual([vulgarRow.lock, vulgarRow.duration, vulgarRow.threshold, vulgarRow.vulgar, vulgarRow.nameSpheres], [1, 2, 4, true, "Fiamma"]);
// La riga dal tiro (25/9 sera): chi l'ha lanciata e la mantiene, le Sfere, gli Ambiti, la composizione, i bonus.
assert.deepEqual([vulgarRow.fromRoll, vulgarRow.caster, vulgarRow.maintainer, vulgarRow.spheres, vulgarRow.scopes, vulgarRow.composition, vulgarRow.scopesText, vulgarRow.modifiers], [true, "Guendalina", "Guendalina", ["forces", "prime"], { potency: 3, duration: 2 }, "Forze + Primordio · Formula: Danneggiare", "Potenza 3, Durata 2", "Armonia +1"]);
assert.equal(maintainedEffectRow({ name: "Velo", caster: "Guendalina", maintained: false }).maintainer, "", "non mantenuta: nessuno la mantiene");
assert.equal(scopesInParole({ potency: 3, range: 1, boh: 4 }, (k) => k.split(".").pop(), { range: "Città" }), "potency 3, range 1 (Città)");
const rigaDalTiro = prepareOngoingMagick(mageActor({ ongoingMagick: { r: vulgarRow } }), (k) => k.split(".").pop())[0];
assert.deepEqual([rigaDalTiro.fromRoll, rigaDalTiro.caster, rigaDalTiro.spheres.map((s) => [s.id, s.label]), rigaDalTiro.scopes.map((s) => [s.id, s.level])], [true, "Guendalina", [["forces", "forces"], ["prime", "prime"]], [["duration", 2], ["potency", 3]]], "gli Ambiti nell'ordine della tavola");
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
assert.match(spheresOngoing, /data-action="ongoingMagickToggle" data-row="\{\{row\.id\}\}"[\s\S]*OngoingMagick\.On[\s\S]*ongoingMagick\.\{\{row\.id\}\}\.nameSpheres[\s\S]*data-action="ongoingMagickLock" data-row="\{\{row\.id\}\}"[\s\S]*ongoingMagick\.\{\{row\.id\}\}\.caster[\s\S]*ongoingMagick\.\{\{row\.id\}\}\.maintainer[\s\S]*wod5e-mage-atto-sigilli[\s\S]*ongoingMagick\.\{\{row\.id\}\}\.composition[\s\S]*ongoingMagick\.\{\{row\.id\}\}\.threshold[\s\S]*ongoingMagick\.\{\{row\.id\}\}\.scopesText[\s\S]*ongoingMagick\.\{\{row\.id\}\}\.modifiers[\s\S]*ongoingMagick\.\{\{row\.id\}\}\.triggerEffect/, "la carta della Magick in atto (25/9 sera)");
assert.match(readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8"), /ongoingMagickLock: onOngoingMagickLock/);
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
  caster: "",
  maintainer: "",
  composition: "",
  scopesText: "",
  modifiers: "",
  fromRoll: false,
  active: true
});
// Il lucchetto del Paradosso permanente (25/9 sera) si accende e si spegne a mano.
await onOngoingMagickLock.call({ actor: editableActor }, event, { dataset: { row: "newRow" } });
assert.deepEqual(editableActor.lastUpdate, { "flags.wod5e-mage.ongoingMagick.newRow.lock": 1 });
storedRows.newRow.lock = 1;
await onOngoingMagickLock.call({ actor: editableActor }, event, { dataset: { row: "newRow" } });
assert.deepEqual(editableActor.lastUpdate, { "flags.wod5e-mage.ongoingMagick.newRow.lock": 0 });

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
  // Le lenti per la scheda: una, due o tre per Ambito, otto letture e otto spiegazioni.
  const modes = scopeModes(localize, { arete: 2 });
  assert.deepEqual(modes.precision.map((mode) => mode.label), ["Dettaglio", "Informazione"]);
  assert.deepEqual(modes.potency.map((mode) => mode.label), ["Danni", "Peso", "Influenza"]);
  assert.deepEqual(modes.conditions.map((mode) => mode.label), ["Malus e bonus", "Complessità"]);
  assert.deepEqual(modes.conditions.map((mode) => mode.short), ["Malus", "Compl."], "nel lancio vale il malus: il bonus resta fuori");
  assert.deepEqual(modes.potency.map((mode) => mode.short), ["Danni", "Peso", "Infl."]);
  assert.equal(modes.impact, undefined);
  assert.equal(modes.precision[0].readings[3], "Particolare");
  assert.match(modes.precision[0].hints[3], /la mano che impugna/);
  // L'Epicità: una lente sola, senza nome; lo 0 non si legge.
  assert.deepEqual(modes.epic.map((mode) => [mode.id, mode.label, mode.short]), [["epic", "", ""]]);
  assert.deepEqual(modes.epic[0].readings, ["", "Trucco", "Spinta", "Mutamento", "Prodigio", "Creazione", "Miracolo", "Impossibile"]);
  assert.equal(modes.epic[0].hints[0], "");
  assert.deepEqual(plain.epic[2], [{ sub: "", text: "Spinta", hint: it.WOD5E_MAGE.Scopes.Hint.epic["2"] }]);
  assert.equal(modes.potency[0].readings[2], "4 danni");
  assert.equal(modes.durationWorld, undefined);
  assert.equal(modes.duration[1].hints[0], "", "senza spiegazione nella lingua, vuoto");
  const dialog = readFileSync(new URL("../templates/dialogs/arete-roll.hbs", import.meta.url), "utf8");
  // Via il pallino dello 0 (2/10): il campo parte dal minimo della fila (1 per l'Epicità), l'Epicità ha lo stacco.
  assert.doesNotMatch(dialog, /sphere-dot zero|Scopes\.Zero|scope\.zero/);
  assert.match(dialog, /wod5e-mage-arete-dotrow\{\{#if scope\.base\}\} base\{\{\/if\}\}" data-role="dotRow" data-kind="scope"[\s\S]*name="scope-\{\{scope\.id\}\}" value="\{\{scope\.min\}\}"/);
  assert.match(dialog, /data-role="dotReading"[^>]*><button type="button" class="wod5e-mage-arete-reading-switch" data-role="readingSwitch"[^>]*hidden>[\s\S]*?<\/button><span data-role="readingText"><\/span><\/span>/);
  const arete = readFileSync(new URL("../scripts/arete.js", import.meta.url), "utf8");
  // L'Epicità non scende sotto 1: il clic sul livello scelto la riporta lì, e la lettura la conta.
  assert.match(arete, /input\.value = String\(Number\(input\.value\) === level \? min : level\);/);
  assert.match(arete, /rowMin\(row\)\);\n    if \(level > 0\) entries\.push/);
  assert.match(arete, /setDots\("scope", EPIC_SCOPE, effectEpic\(entry\)\);/);
  assert.match(arete, /const scopeEntries = ambitiDelLancio\(/);
  assert.match(arete, /dotReadings\(localize, \{ arete: arete\.value \}\)/);
  // Il nome della lettura non si scrive più (10/9 notte): sta nella nota, col conto («Danni: Areté 3 +3»).
  assert.match(arete, /piece\.title = part\.sub \? `\$\{part\.sub\}: \$\{detail\}` : detail;/);
  assert.doesNotMatch(arete, /wod5e-mage-arete-reading-sub/);
}

console.log("Scopes and ongoing Magick tests passed.");
