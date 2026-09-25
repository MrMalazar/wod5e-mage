import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { conMod, modDelMondo, POTERI_MOD_SETTING, pulisciMod, senzaMod } from "../scripts/poteri-mod.js";

// La modifica di base dei poteri (Blue, 27/9): il magazzino per id, solo le parti scritte.
assert.equal(POTERI_MOD_SETTING, "poteriModificati");
assert.equal(pulisciMod({ prerequisiti: " ", attivo: "", passivo: "" }), null);
assert.deepEqual(pulisciMod({ attivo: " Fa di più. ", grado: 9 }), { attivo: "Fa di più." });
const store = conMod({}, "il-banco-vince", { passivo: "Il banco paga sempre.", attivo: "" });
assert.deepEqual(Object.keys(store), ["il-banco-vince"]);
assert.equal(store["il-banco-vince"].passivo, "Il banco paga sempre.");
assert.ok(store["il-banco-vince"].quando > 0);
assert.deepEqual(modDelMondo("il-banco-vince", store).passivo, "Il banco paga sempre.");
assert.equal(modDelMondo("altro", store), null);
assert.equal(modDelMondo("", store), null);
// Campi vuoti (o null): la modifica se ne va; il magazzino non è lo stesso oggetto.
assert.deepEqual(conMod(store, "il-banco-vince", { passivo: "" }), {});
assert.deepEqual(senzaMod(store, "il-banco-vince"), {});
assert.deepEqual(Object.keys(store), ["il-banco-vince"], "il magazzino dato non si tocca");
assert.deepEqual(conMod(null, "", { attivo: "x" }), {}, "senza id niente");
// La finestra: le tre parti, il grado che non si tocca, dove vale.
const finestra = readFileSync(new URL("../templates/dialogs/potere-modifica.hbs", import.meta.url), "utf8");
for (const marker of ['name="prerequisiti"', 'name="attivo"', 'name="passivo"', "WOD5E_MAGE.Poteri.Grado", "{{dove}}", "WOD5E_MAGE.Poteri.ModificaNota"]) assert.ok(finestra.includes(marker), `manca ${marker}`);
assert.ok(!finestra.includes('name="grado"') && !finestra.includes('name="dot"'), "il grado non si scrive");
// L'impostazione del mondo è registrata, e le schede aperte si ridisegnano.
const main = readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8");
assert.match(main, /game\.settings\.register\(MODULE_ID, POTERI_MOD_SETTING, \{\s*scope: "world"/);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8")).WOD5E_MAGE.Poteri;
  for (const key of ["Prerequisiti", "PrerequisitiNessuno", "EffettoAttivo", "EffettoPassivo", "EffettoNessuno", "ModificaTitolo", "ModificaMondo", "ModificaScheda", "ModificaNota", "ModificaBase", "ModificaBaseHint", "Salva", "TornaBase", "ModificatoMondo", "ModificatoScheda", "ModificaSalvata", "ModificaTolta"]) assert.equal(typeof strings[key], "string", `${lang} ${key}`);
  assert.ok(!strings.DominioFamiglia.includes("{n}") && !strings.DominioEsterno.includes("{n}"), `${lang}: la nota del Dominio non dice più il prezzo (27/9)`);
}
console.log("poteri, modifica di base: ok");
