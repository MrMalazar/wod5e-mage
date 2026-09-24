import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Handlebars from "handlebars";
import { POTERI } from "../scripts/data/poteri.js";
import { prepareCatalogoPoteri } from "../scripts/catalogo-poteri.js";

// La finestra del catalogo (24/9 sera): i poteri della Sfera e quelli di
// qualsiasi Sfera, in ordine alfabetico, con la spunta di chi li conosce e
// il lucchetto di chi chiede più pallini.
const localize = (key) => key;
const owned = [{ catalogId: "appoggio" }, { catalogId: "guasto" }];
const materia = prepareCatalogoPoteri("matter", { catalog: POTERI, rating: 2, owned, localize });
assert.equal(materia.sphereLabel, "WOD5E_MAGE.Spheres.matter");
assert.equal(materia.totale, materia.propri.length + materia.qualsiasi.length);
assert.ok(materia.propri.length > 10 && materia.qualsiasi.length === POTERI.filter((p) => p.spheres.includes("any")).length);
assert.ok(materia.propri.every((riga) => !riga.any) && materia.qualsiasi.every((riga) => riga.any));
const nomi = materia.propri.map((riga) => riga.name);
assert.deepEqual(nomi, [...nomi].sort((a, b) => a.localeCompare(b, "it")), "in ordine alfabetico");
assert.deepEqual(materia.gruppi.map((g) => [g.id, g.righe.length]), [["propri", materia.propri.length], ["qualsiasi", materia.qualsiasi.length]]);
assert.equal(materia.gruppi[0].label, "WOD5E_MAGE.Poteri.CatalogoDiSfera".replace("{sphere}", "WOD5E_MAGE.Spheres.matter"));
const guasto = materia.propri.find((riga) => riga.id === "guasto");
assert.deepEqual([guasto.known, guasto.locked, guasto.cost, guasto.typeLabel, guasto.formulaName], [true, false, "1 WOD5E_MAGE.Poteri.QuintessenzaBreve", "WOD5E_MAGE.Poteri.Tipo.attivo", "Creare e Distruggere"]);
assert.ok(guasto.blocchi.length >= 1 && guasto.blocchi[0].titolo === "Effetto attivo");
assert.equal(materia.conosciuti, 2, "Appoggio (qualsiasi) e Guasto");
const chiusi = materia.propri.concat(materia.qualsiasi).filter((riga) => riga.locked);
assert.equal(chiusi.length, materia.chiusi);
assert.ok(chiusi.every((riga) => riga.dot > 2 && riga.lockedHint), "il lucchetto sopra i pallini della Sfera");
const pronto = prepareCatalogoPoteri("life", { catalog: POTERI, rating: 1, owned: [], localize }).propri.find((riga) => riga.id === "pronto-soccorso");
assert.deepEqual([pronto.uses, pronto.proposal, pronto.search.includes("guarire")], ["WOD5E_MAGE.Poteri.Usi.bersaglio", true, true]);
// Tempo: Velocista sta fra i propri, con la matrice.
assert.ok(prepareCatalogoPoteri("time", { catalog: POTERI, localize }).propri.some((riga) => riga.id === "velocista" && riga.formulaName === "Accelerare e Rallentare"));

// Il dialogo si compila: la cerca, il conto, i due gruppi, le righe con Aggiungi e il testo.
Handlebars.registerHelper("localize", (key, options) => {
  const hash = options?.hash ?? {};
  return Object.keys(hash).length ? `${key}(${Object.entries(hash).map(([k, v]) => `${k}=${v}`).join(",")})` : String(key);
});
const template = Handlebars.compile(readFileSync(new URL("../templates/dialogs/catalogo-poteri.hbs", import.meta.url), "utf8"));
const html = template({ ...materia, icon: "m.png" });
for (const marker of ['data-role="catalogoSearch"', 'data-role="catalogoConto"', 'data-catalogo-gruppo="propri"', 'data-catalogo-gruppo="qualsiasi"', 'wod5e-mage-catalogo-row known"', 'wod5e-mage-catalogo-row chiusa"', 'data-catalogo="guasto"', 'data-role="catalogoAggiungi" data-catalogo="guasto" disabled', "WOD5E_MAGE.Poteri.Conosciuto", "Creare e Distruggere", "Effetto attivo", "WOD5E_MAGE.Poteri.Carta.Paradosso", 'wod5e-mage-catalogo-proposta']) {
  assert.ok(html.includes(marker), `manca ${marker}`);
}
assert.equal((html.match(/data-role="catalogoAggiungi"/g) ?? []).length, materia.totale, "un tasto per potere");
console.log("catalogo dei poteri: ok");
