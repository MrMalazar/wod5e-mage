import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Handlebars from "handlebars";
import { POTERI } from "../scripts/data/poteri.js";
import { pastiglieDelleSfere, prepareCatalogoCompleto, prepareCatalogoPoteri, prezzoDelPotere, testoPrerequisiti, tipiDelPotere } from "../scripts/catalogo-poteri.js";

// La finestra «Aggiungi» (24/9 sera; 25/9: «i poteri sono acquistabili a
// principio dalla gerarchia», niente quota sui pallini): tutti i poteri che
// la Sfera apre, in ordine di grado e poi di nome, in due gruppi, la spunta
// su chi si conosce, il lucchetto su chi ha prerequisiti che mancano.
const localize = (key) => key;
const owned = [{ catalogId: "guasto" }];
const materia = prepareCatalogoPoteri("matter", { catalog: POTERI, owned, localize });
assert.equal(materia.sphereLabel, "WOD5E_MAGE.Spheres.matter");
assert.equal(materia.totale, materia.propri.length + materia.qualsiasi.length);
assert.equal(materia.totale, POTERI.filter((p) => p.spheres.includes("matter") || p.spheres.includes("any")).length, "tutti i poteri che Materia apre, nessuno fuori");
assert.ok(materia.propri.every((riga) => !riga.any) && materia.qualsiasi.every((riga) => riga.any));
const gradi = materia.propri.map((riga) => riga.dot || 99);
assert.deepEqual(gradi, [...gradi].sort((a, b) => a - b), "in ordine di grado, quelli da assegnare in coda");
assert.ok(materia.propri[0].dot > 0 && materia.propri.at(-1).dot === 0);
assert.equal(materia.chiusi, 0, "senza prerequisiti scritti niente lucchetti");
assert.deepEqual(materia.gruppi.map((g) => [g.id, g.righe.length]), [["propri", materia.propri.length], ["qualsiasi", materia.qualsiasi.length]]);
const guasto = materia.propri.find((riga) => riga.id === "guasto");
assert.deepEqual([guasto.known, guasto.locked, guasto.cost, guasto.tipi, guasto.formulaName], [true, false, "1 WOD5E_MAGE.Poteri.QuintessenzaBreve", { attivo: true, passivo: false }, "Creare e Distruggere"]);
assert.ok(guasto.blocchi.length >= 1 && guasto.blocchi[0].titolo === "Effetto attivo");
assert.equal(materia.conosciuti, 1);
// I prerequisiti scritti chiudono la riga e dicono cosa serve.
const catalogo = POTERI.map((p) => (p.id === "baratto" ? { ...p, prerequisiti: { numero: 2, poteri: ["guasto", "bottino"] } } : p));
const conChiusi = prepareCatalogoPoteri("matter", { catalog: catalogo, owned, tutti: owned, localize });
const baratto = conChiusi.propri.find((riga) => riga.id === "baratto");
assert.deepEqual([conChiusi.chiusi, baratto.locked, baratto.chiuso], [1, true, { numero: 2, poteri: ["bottino"] }]);
assert.equal(baratto.lockedHint, "WOD5E_MAGE.Poteri.Prerequisito.numero · WOD5E_MAGE.Poteri.Prerequisito.poteri".replace("{n}", "2"));
assert.equal(testoPrerequisiti({ numero: 2, poteri: ["bottino"] }, catalogo.find((p) => p.id === "baratto"), (k) => ({ "WOD5E_MAGE.Poteri.Prerequisito.numero": "{n} poteri di {sphere}", "WOD5E_MAGE.Poteri.Prerequisito.poteri": "richiede {names}", "WOD5E_MAGE.Spheres.matter": "Materia" }[k] ?? k), new Map([["bottino", "Bottino"]])), "2 poteri di Materia · richiede Bottino");
// Il grado col prezzo in Esperienza (25/9 sera: «nell'elenco non è capibile»): per 5 di famiglia, per 7 esterno.
assert.deepEqual(prezzoDelPotere(2, true), { grado: 2, famiglia: 10, esterno: 14, pe: 10 });
assert.deepEqual(prezzoDelPotere(3, false).pe, 21);
assert.deepEqual(prezzoDelPotere(0, true), null, "senza grado non si sa");
assert.equal(prezzoDelPotere(1).pe, null, "fuori da un Dominio del personaggio tutti e due i prezzi");
const famiglia = prepareCatalogoPoteri("matter", { catalog: catalogo, owned, tutti: owned, localize, family: true });
assert.deepEqual([famiglia.family, famiglia.dominioLabel], [true, "WOD5E_MAGE.Poteri.DominioFamiglia".replace("{n}", "5")]);
assert.equal(materia.dominioLabel, "WOD5E_MAGE.Poteri.DominioEsterno".replace("{n}", "7"));
const conGrado = famiglia.propri.find((riga) => riga.dot > 0 && riga.id !== "baratto");
assert.deepEqual([conGrado.gradoLabel, conGrado.prezzoLabel, conGrado.serve], ["WOD5E_MAGE.Poteri.GradoN".replace("{n}", String(conGrado.dot)), "WOD5E_MAGE.Poteri.PrezzoPE".replace("{pe}", String(conGrado.dot * 5)), ""]);
// Guasto è una proposta senza grado: «grado da assegnare», nessun prezzo.
const guastoFamiglia = famiglia.propri.find((riga) => riga.id === "guasto");
assert.deepEqual([guastoFamiglia.gradoLabel, guastoFamiglia.prezzoLabel], ["WOD5E_MAGE.Poteri.GradoNessuno", ""]);
// I prerequisiti si scrivono sempre: col lucchetto se mancano, con la spunta se ci sono già.
const barattoFamiglia = famiglia.propri.find((riga) => riga.id === "baratto");
assert.deepEqual([barattoFamiglia.serve, barattoFamiglia.serveOk, barattoFamiglia.locked], ["WOD5E_MAGE.Poteri.Prerequisito.numero · WOD5E_MAGE.Poteri.Prerequisito.poteri".replace("{n}", "2"), false, true]);
const conTutto = prepareCatalogoPoteri("matter", { catalog: catalogo, owned: [{ catalogId: "guasto" }, { catalogId: "bottino" }], tutti: [{ catalogId: "guasto" }, { catalogId: "bottino" }], localize, family: true });
const barattoAperto = conTutto.propri.find((riga) => riga.id === "baratto");
assert.deepEqual([barattoAperto.serveOk, barattoAperto.locked, barattoAperto.lockedHint, conTutto.conPrerequisiti], [true, false, "", 1]);
// I tipi: attivo, passivo, tutti e due.
assert.deepEqual(tipiDelPotere("attivo e passivo"), { attivo: true, passivo: true });
assert.deepEqual(tipiDelPotere("passivo"), { attivo: false, passivo: true });
assert.deepEqual(tipiDelPotere("", "attivo"), { attivo: true, passivo: false });
const tasca = prepareCatalogoPoteri("correspondence", { catalog: POTERI, localize }).propri.find((riga) => riga.id === "tasca-di-mary");
assert.deepEqual([tasca.tipi, tasca.typeLabel], [{ attivo: true, passivo: true }, "WOD5E_MAGE.Poteri.Tipo.attivo · WOD5E_MAGE.Poteri.Tipo.passivo"]);
const pronto = prepareCatalogoPoteri("life", { catalog: POTERI, owned: [], localize }).propri.find((riga) => riga.id === "pronto-soccorso");
assert.deepEqual([pronto.uses, pronto.proposal, pronto.search.includes("guarire")], ["WOD5E_MAGE.Poteri.Usi.bersaglio", true, true]);
// Le pastiglie delle Sfere: il conto dei poteri e l'attiva.
const pastiglie = pastiglieDelleSfere([{ id: "forces", conto: 1 }, { id: "matter", conto: 2 }], { localize, attiva: "matter" });
assert.deepEqual(pastiglie.map((p) => [p.id, p.conto, p.attiva]), [["forces", 1, false], ["matter", 2, true]]);

// Il Catalogo completo: tutti i 187, un gruppo per Sfera più «qualsiasi», da leggere, in ordine di grado.
const completo = prepareCatalogoCompleto({ catalog: POTERI, owned, localize });
assert.equal(completo.tutto, true);
assert.equal(completo.totale, POTERI.length);
assert.equal(completo.gruppi.at(-1).id, "qualsiasi");
assert.equal(completo.gruppi.at(-1).righe.length, POTERI.filter((p) => p.spheres.includes("any")).length);
assert.ok(completo.gruppi.find((g) => g.id === "matter").righe.some((riga) => riga.id === "guasto" && riga.known));
assert.ok(completo.gruppi.find((g) => g.id === "time").righe.some((riga) => riga.id === "velocista"), "Velocista sta sotto Tempo");
assert.ok(completo.gruppi.find((g) => g.id === "forces").righe.some((riga) => riga.id === "velocista"), "e sotto Forze");

// Il dialogo si compila: le pastiglie, la cerca, i gruppi, le righe con Aggiungi e il testo; il lucchetto sui chiusi; nel completo niente tasti.
Handlebars.registerHelper("localize", (key, options) => {
  const hash = options?.hash ?? {};
  return Object.keys(hash).length ? `${key}(${Object.entries(hash).map(([k, v]) => `${k}=${v}`).join(",")})` : String(key);
});
const template = Handlebars.compile(readFileSync(new URL("../templates/dialogs/catalogo-poteri.hbs", import.meta.url), "utf8"));
const html = template({ ...materia, pastiglie, icon: "m.png" });
for (const marker of ['data-role="catalogoSfera" data-sphere="forces"', 'wod5e-mage-catalogo-sfera attiva" role="tab" aria-selected="true" data-role="catalogoSfera" data-sphere="matter"', "WOD5E_MAGE.Poteri.CatalogoConosciuti(known&#x3D;2)", 'data-role="catalogoSearch"', 'data-role="catalogoConto"', 'data-catalogo-gruppo="propri"', 'data-catalogo-gruppo="qualsiasi"', 'wod5e-mage-catalogo-row known"', 'data-catalogo="guasto"', 'data-role="catalogoAggiungi" data-catalogo="guasto" disabled', "WOD5E_MAGE.Poteri.Conosciuto", "Creare e Distruggere", "Effetto attivo", "WOD5E_MAGE.Poteri.Carta.Paradosso", 'wod5e-mage-catalogo-proposta', '<small class="attivo">', "WOD5E_MAGE.Poteri.Grado"]) {
  assert.ok(html.includes(marker), `manca ${marker}`);
}
assert.ok(html.includes('<small class="grado" title="WOD5E_MAGE.Poteri.Grado">WOD5E_MAGE.Poteri.GradoN') && html.includes("WOD5E_MAGE.Poteri.PrezzoPE") && html.includes("wod5e-mage-catalogo-dominio") && html.includes("WOD5E_MAGE.Poteri.DominioEsterno"), "il grado col prezzo su ogni riga, e il Dominio in testa");
assert.equal((html.match(/data-role="catalogoAggiungi"/g) ?? []).length, materia.totale, "un tasto per potere");
assert.equal((html.match(/<details /g) ?? []).length, materia.totale, "tutti i poteri della Sfera in lista");
assert.ok(!html.includes("CatalogoChiusi") && !html.includes("catalogo-row chiusa") && !html.includes("CatalogoPosti") && !html.includes("CatalogoPieno"), "niente avvisi di quota");
const htmlChiusi = template({ ...conChiusi, pastiglie, icon: "m.png" });
assert.ok(htmlChiusi.includes("WOD5E_MAGE.Poteri.CatalogoChiusi(n&#x3D;1)") && htmlChiusi.includes('wod5e-mage-catalogo-row chiusa"') && htmlChiusi.includes("wod5e-mage-catalogo-lucchetto") && htmlChiusi.includes("WOD5E_MAGE.Poteri.Prerequisito.Label"), "la riga chiusa col lucchetto e cosa serve");
assert.ok(/data-role="catalogoAggiungi" data-catalogo="baratto" disabled title="/.test(htmlChiusi), "il tasto spento dice cosa serve");
assert.ok(htmlChiusi.includes('<small class="serve manca"'), "la pastiglia dei prerequisiti che mancano");
const htmlAperto = template({ ...conTutto, pastiglie, icon: "m.png" });
assert.ok(htmlAperto.includes('<small class="serve ok"') && htmlAperto.includes("wod5e-mage-catalogo-serve ok") && !htmlAperto.includes("catalogo-row chiusa"), "i prerequisiti soddisfatti con la spunta");
const htmlCompleto = template({ ...completo });
assert.ok(!htmlCompleto.includes('data-role="catalogoAggiungi"') && !htmlCompleto.includes("catalogoSfera") && htmlCompleto.includes("wod5e-mage-catalogo-spunta"), "il completo si legge e basta");
console.log("catalogo dei poteri: ok");
