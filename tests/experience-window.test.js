import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { EXPERIENCE_COSTS, experienceCost, potereCost, prepareExperiencePage, prepareExperienceProposals } from "../scripts/experience-window.js";

// Il listino di Blue del 21/9/2026. Attributo da 2 a 3 = 3 × 4 = 12.
assert.equal(experienceCost("attribute", 2, 3).total, 12);
// Abilità da 2 a 3 = 3 × 2; nuova fino a 3: 3 + 4 + 6.
assert.equal(experienceCost("skill", 2, 3).total, 6);
assert.equal(experienceCost("skill", 0, 3).total, 13);
// Areté da 2 a 3 = 3 × 10.
assert.equal(experienceCost("arete", 2, 3).total, 30);
// Il Dominio (l'accesso a una Sfera) costa 15, una volta: da 0 a 1 = 15, poi niente.
assert.equal(experienceCost("dominio", 0, 1).total, 15);
assert.deepEqual(experienceCost("dominio", 0, 3).steps, [{ dot: 1, cost: 15 }, { dot: 2, cost: 0 }, { dot: 3, cost: 0 }]);
// Il potere: il pallino richiesto per 5 (Dominio di famiglia) o per 7 (esterno). «Un potere di 1 e Dominio nuovo costa 20».
assert.equal(experienceCost("potereFamiglia", 0, 1).total, 5);
assert.equal(experienceCost("potereEsterno", 2, 3).total, 21);
assert.equal(experienceCost("dominio", 0, 1).total + potereCost({ dot: 1 }, true), 20);
assert.equal(potereCost({ dot: 3 }, false), 21);
assert.equal(potereCost({ dot: 0 }, true), null, "senza pallino il prezzo non si sa");
// La casella di Salute costa quante caselle hai già: da 8 a 9 = 8, da 8 a 10 = 8 + 9.
assert.equal(experienceCost("health", 8, 9).total, 8);
assert.equal(experienceCost("health", 8, 10).total, 17);
// Il Tratto (Pregio o Background): il pallino per 3.
assert.equal(experienceCost("trait", 1, 2).total, 6);
// Le Sfere a pallini e le due voci vecchie non ci sono più.
assert.deepEqual(Object.keys(EXPERIENCE_COSTS), ["attribute", "skill", "arete", "dominio", "potereFamiglia", "potereEsterno", "health", "trait"]);
// Nessun passo indietro, nessun costo.
assert.deepEqual(experienceCost("attribute", 3, 3), { total: 0, steps: [] });
assert.deepEqual(experienceCost("attribute", 3, 1), { total: 0, steps: [] });
// Il dettaglio pallino per pallino serve al calcolatore.
assert.deepEqual(experienceCost("skill", 0, 2).steps, [{ dot: 1, cost: 3 }, { dot: 2, cost: 4 }]);
assert.throws(() => experienceCost("inesistente", 1, 2));
assert.throws(() => experienceCost("sphereOutside", 0, 1));

// La pagina in scheda: la Spesa è la somma del registro, il resto è resto.
globalThis.game = globalThis.game ?? { i18n: { localize: (key) => key, lang: "it" } };
const flags = {
  experienceGains: { g1: { cost: 20, when: "inizio" }, g2: { cost: "10", when: "sessione 2" } },
  experienceLog: { a: { cost: "12", what: "Forza 2 -> 3" }, b: { cost: 5.9, what: "" } },
  spheres: { forces: 3, mind: 1 },
  selectedSpheres: { forces: true, mind: true },
  familySpheres: { forces: true },
  poteri: { p1: { sphere: "forces", name: "Conduttore", dot: 2 }, p2: { sphere: "mind", name: "Testa dura", dot: 0 }, p3: { sphere: "forces", name: "", dot: 1 } }
};
const actor = { system: {}, getFlag: (_m, key) => flags[key] };
const page = prepareExperiencePage(actor);
assert.equal(page.total, 30);
assert.equal(page.gains.length, 2);
assert.equal(page.spent, 17);
assert.equal(page.remaining, 13);
assert.equal(page.log.length, 2);
// Otto voci: Attributo, Abilità, Areté, Dominio, i due poteri, la Salute, il Tratto.
assert.equal(page.rows.length, 8);

// Le spese proposte: i Domini presi (15) e i poteri inseriti (pallino × 5 di famiglia, × 7 esterno; senza pallino «?»),
// non quelli già segnati fra le spese né quelli ignorati; il potere senza nome non si propone.
const proposals = prepareExperienceProposals(actor, { log: page.log, localize: (key) => key });
assert.deepEqual(proposals.map((row) => [row.id, row.cost]), [["dominio:forces", 15], ["dominio:mind", 15], ["potere:p1", 10], ["potere:p2", null]]);
assert.equal(proposals[3].hint, "WOD5E_MAGE.Experience.SenzaPallino");
assert.equal(proposals[0].what, "WOD5E_MAGE.Experience.DominioDi", "senza format il testo resta la chiave: la scheda passa game.i18n.format");
const conFormat = prepareExperienceProposals(actor, {
  log: [{ cost: 15, what: "Dominio di WOD5E_MAGE.Spheres.forces" }],
  localize: (key) => key,
  format: (key, data) => (key === "WOD5E_MAGE.Experience.DominioDi" ? `Dominio di ${data.sphere}` : `${data.power} (potere di ${data.sphere})`)
});
assert.deepEqual(conFormat.map((row) => row.what), ["Dominio di WOD5E_MAGE.Spheres.mind", "Conduttore (potere di WOD5E_MAGE.Spheres.forces)", "Testa dura (potere di WOD5E_MAGE.Spheres.mind)"], "il Dominio già segnato non si ripropone");
const ignorato = prepareExperienceProposals({ ...actor, getFlag: (_m, key) => (key === "experienceIgnored" ? { "dominio:mind": true, "potere:p2": true } : flags[key]) }, { log: [], localize: (key) => key });
assert.deepEqual(ignorato.map((row) => row.id), ["dominio:forces", "potere:p1"]);

// Il template: il conto, le prese, le spese con le proposte (Segna e Ignora), il listino col calcolatore.
const template = readFileSync(new URL("../templates/actor/parts/esperienza.hbs", import.meta.url), "utf8");
assert.match(template, /wod5e-mage-riq-exp-conto[\s\S]*Experience\.Taken[\s\S]*Experience\.Spent[\s\S]*Experience\.Remains[\s\S]*wod5e-mage-riq-exp-prese[\s\S]*data-action="experienceLogAdd" data-table="experienceGains"[\s\S]*experienceGains\.\{\{row\.id\}\}\.cost[\s\S]*experienceGains\.\{\{row\.id\}\}\.when[\s\S]*wod5e-mage-riq-exp-spese[\s\S]*experienceLog\.\{\{row\.id\}\}\.what[\s\S]*Experience\.Proposte[\s\S]*data-action="experienceProposalMark" data-what="\{\{row\.what\}\}" data-cost="\{\{row\.cost\}\}"[\s\S]*data-action="experienceProposalIgnore" data-proposal="\{\{row\.id\}\}"[\s\S]*wod5e-mage-riq-exp-listino[\s\S]*<select name="kind"[\s\S]*name="from"[\s\S]*name="to"[\s\S]*data-role="total"[\s\S]*data-role="steps"[\s\S]*wod5e-mage-riga-listino/);
assert.doesNotMatch(template, /<table|wod5e-mage-exp-k/);
const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheet, /experienceProposalMark: onExperienceProposalMark,\n\s+experienceProposalIgnore: onExperienceProposalIgnore/);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8")).WOD5E_MAGE.Experience;
  assert.deepEqual(Object.keys(strings.Kinds), Object.keys(EXPERIENCE_COSTS), lang);
  for (const key of ["Once", "PerBox", "Proposte", "DominioDi", "PotereDi", "SenzaPallino", "Mark", "Ignore", "Step"]) assert.equal(typeof strings[key], "string", `${lang} ${key}`);
}

console.log("experience-window.test.js: listino del 21/9, proposte e pagina superati");
