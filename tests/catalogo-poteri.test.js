import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Handlebars from "handlebars";
import { POTERI } from "../scripts/data/poteri.js";
import { pastiglieDelleSfere, prepareCatalogoCompleto, prepareCatalogoPoteri, tipiDelPotere } from "../scripts/catalogo-poteri.js";

// La finestra «Aggiungi» (24/9 sera): solo i poteri che si possono prendere
// adesso con la Sfera (il pallino richiesto entro i pallini della Sfera), in
// due gruppi in ordine alfabetico, la spunta su chi si conosce, e la quota:
// tanti poteri quanti i pallini.
const localize = (key) => key;
const owned = [{ catalogId: "guasto" }];
const materia = prepareCatalogoPoteri("matter", { catalog: POTERI, rating: 2, owned, localize });
assert.equal(materia.sphereLabel, "WOD5E_MAGE.Spheres.matter");
assert.equal(materia.totale, materia.propri.length + materia.qualsiasi.length);
assert.ok(materia.propri.length > 5 && materia.qualsiasi.length > 5);
assert.ok(materia.propri.every((riga) => !riga.any && !riga.locked && riga.dot <= 2) && materia.qualsiasi.every((riga) => riga.any && riga.dot <= 2), "solo quelli che si possono prendere adesso");
assert.ok(materia.chiusi > 0, "quelli che chiedono più pallini restano fuori, contati");
const nomi = materia.propri.map((riga) => riga.name);
assert.deepEqual(nomi, [...nomi].sort((a, b) => a.localeCompare(b, "it")), "in ordine alfabetico");
assert.deepEqual(materia.gruppi.map((g) => [g.id, g.righe.length]), [["propri", materia.propri.length], ["qualsiasi", materia.qualsiasi.length]]);
const guasto = materia.propri.find((riga) => riga.id === "guasto");
assert.deepEqual([guasto.known, guasto.cost, guasto.tipi, guasto.formulaName], [true, "1 WOD5E_MAGE.Poteri.QuintessenzaBreve", { attivo: true, passivo: false }, "Creare e Distruggere"]);
assert.ok(guasto.blocchi.length >= 1 && guasto.blocchi[0].titolo === "Effetto attivo");
// La quota: due pallini, un potere: un posto ancora; con due poteri è piena.
assert.deepEqual([materia.conosciuti, materia.rating, materia.posti, materia.pieno], [1, 2, 1, false]);
const piena = prepareCatalogoPoteri("matter", { catalog: POTERI, rating: 2, owned: [{ catalogId: "guasto" }, { catalogId: "baratto" }], localize });
assert.deepEqual([piena.conosciuti, piena.posti, piena.pieno], [2, 0, true]);
// I tipi: attivo, passivo, tutti e due.
assert.deepEqual(tipiDelPotere("attivo e passivo"), { attivo: true, passivo: true });
assert.deepEqual(tipiDelPotere("passivo"), { attivo: false, passivo: true });
assert.deepEqual(tipiDelPotere("", "attivo"), { attivo: true, passivo: false });
const tasca = prepareCatalogoPoteri("correspondence", { catalog: POTERI, rating: 5, localize }).propri.find((riga) => riga.id === "tasca-di-mary");
assert.deepEqual([tasca.tipi, tasca.typeLabel], [{ attivo: true, passivo: true }, "WOD5E_MAGE.Poteri.Tipo.attivo · WOD5E_MAGE.Poteri.Tipo.passivo"]);
const pronto = prepareCatalogoPoteri("life", { catalog: POTERI, rating: 1, owned: [], localize }).propri.find((riga) => riga.id === "pronto-soccorso");
assert.deepEqual([pronto.uses, pronto.proposal, pronto.search.includes("guarire")], ["WOD5E_MAGE.Poteri.Usi.bersaglio", true, true]);
// Le pastiglie delle Sfere: il conto, la piena, l'attiva.
const pastiglie = pastiglieDelleSfere([{ id: "forces", conto: 1, rating: 3 }, { id: "matter", conto: 2, rating: 2 }], { localize, attiva: "matter" });
assert.deepEqual(pastiglie.map((p) => [p.id, p.conto, p.rating, p.pieno, p.attiva]), [["forces", 1, 3, false, false], ["matter", 2, 2, true, true]]);

// Il Catalogo completo: tutti i 187, un gruppo per Sfera più «qualsiasi», da leggere.
const completo = prepareCatalogoCompleto({ catalog: POTERI, owned, localize });
assert.equal(completo.tutto, true);
assert.equal(completo.totale, POTERI.length);
assert.equal(completo.gruppi.at(-1).id, "qualsiasi");
assert.equal(completo.gruppi.at(-1).righe.length, POTERI.filter((p) => p.spheres.includes("any")).length);
assert.ok(completo.gruppi.find((g) => g.id === "matter").righe.some((riga) => riga.id === "guasto" && riga.known));
assert.ok(completo.gruppi.find((g) => g.id === "time").righe.some((riga) => riga.id === "velocista"), "Velocista sta sotto Tempo");
assert.ok(completo.gruppi.find((g) => g.id === "forces").righe.some((riga) => riga.id === "velocista"), "e sotto Forze");

// Il dialogo si compila: le pastiglie, la cerca, la quota, i gruppi, le righe con Aggiungi e il testo; nel completo niente tasti.
Handlebars.registerHelper("localize", (key, options) => {
  const hash = options?.hash ?? {};
  return Object.keys(hash).length ? `${key}(${Object.entries(hash).map(([k, v]) => `${k}=${v}`).join(",")})` : String(key);
});
const template = Handlebars.compile(readFileSync(new URL("../templates/dialogs/catalogo-poteri.hbs", import.meta.url), "utf8"));
const html = template({ ...materia, pastiglie, icon: "m.png" });
for (const marker of ['data-role="catalogoSfera" data-sphere="forces"', 'wod5e-mage-catalogo-sfera attiva piena" role="tab" aria-selected="true" data-role="catalogoSfera" data-sphere="matter"', 'data-role="catalogoSearch"', 'data-role="catalogoConto"', "WOD5E_MAGE.Poteri.CatalogoPosti(", "WOD5E_MAGE.Poteri.CatalogoChiusi(", 'data-catalogo-gruppo="propri"', 'data-catalogo-gruppo="qualsiasi"', 'wod5e-mage-catalogo-row known"', 'data-catalogo="guasto"', 'data-role="catalogoAggiungi" data-catalogo="guasto" disabled', "WOD5E_MAGE.Poteri.Conosciuto", "Creare e Distruggere", "Effetto attivo", "WOD5E_MAGE.Poteri.Carta.Paradosso", 'wod5e-mage-catalogo-proposta', '<small class="attivo">']) {
  assert.ok(html.includes(marker), `manca ${marker}`);
}
assert.equal((html.match(/data-role="catalogoAggiungi"/g) ?? []).length, materia.totale, "un tasto per potere");
assert.ok(!html.includes("catalogo-row chiusa") && (html.match(/<details /g) ?? []).length === materia.totale, "i chiusi non stanno nella lista: solo il conto");
const htmlPiena = template({ ...piena, pastiglie, icon: "m.png" });
assert.ok(htmlPiena.includes("WOD5E_MAGE.Poteri.CatalogoPieno("), "a quota piena l'avviso");
assert.equal((htmlPiena.match(/data-role="catalogoAggiungi" data-catalogo="[a-z-]+" disabled/g) ?? []).length, piena.totale, "a quota piena tutti i tasti spenti");
const htmlCompleto = template({ ...completo });
assert.ok(!htmlCompleto.includes('data-role="catalogoAggiungi"') && !htmlCompleto.includes("catalogoSfera") && htmlCompleto.includes("wod5e-mage-catalogo-spunta"), "il completo si legge e basta");
console.log("catalogo dei poteri: ok");
