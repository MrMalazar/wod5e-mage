import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import Handlebars from "handlebars";

const ROOT = new URL("../../templates/actor/", import.meta.url).pathname;
Handlebars.registerHelper("localize", (key, options) => {
  const hash = options?.hash ?? {};
  return Object.keys(hash).length ? `${key}(${Object.entries(hash).map(([k, v]) => `${k}=${v}`).join(",")})` : String(key);
});
Handlebars.registerHelper("numLoop", (num, options) => { let out = ""; for (let i = 0; i < Number(num); i += 1) out += options.fn(i); return out; });
Handlebars.registerHelper("eq", (a, b) => a === b);
for (const name of readdirSync(`${ROOT}parts`)) {
  if (name.endsWith(".hbs")) Handlebars.registerPartial(`modules/wod5e-mage/templates/actor/parts/${name}`, readFileSync(`${ROOT}parts/${name}`, "utf8"));
}
const stat = Handlebars.compile(readFileSync(`${ROOT}parts/stat.hbs`, "utf8"), { strict: false });
const header = Handlebars.compile(readFileSync(`${ROOT}mage-header.hbs`, "utf8"));

const context = {
  tab: { cssClass: "active", id: "stats", group: "primary" },
  locked: false, img: "a.png", name: "Ianira Vestri", actor: { name: "Ianira Vestri" }, playerName: "Blue",
  settings: { skillAttributeInputs: false },
  creazioneReset: true, resetsById: { attributes: { id: "attributes", label: "Reset", icon: "fa-rotate-left" }, skills: { id: "skills", label: "Reset", icon: "fa-rotate-left" }, spheres: { id: "spheres", label: "Reset", icon: "fa-rotate-left" }, lineage: { id: "lineage", label: "Reset", icon: "fa-rotate-left" }, all: { id: "all", label: "Reset tutto", icon: "fa-rotate-left" } },
  salute: { max: 6, locked: 1, cells: [{ index: 0, state: "ps", label: "x", locked: false }, { index: 1, state: "", label: "x", locked: true }], status: "" },
  condizioniRows: [{ id: "c1", condizione: "menomato", img: "c.png", name: "Menomato", title: "t", dice: "-1", suppressed: false }],
  condizioni: [{ group: "Corpo", entries: [{ id: "menomato", icon: "c.png", name: "Menomato", title: "t", dice: "-1", active: true, suppressed: false }] }],
  magickTrack: { quintessence: 4, paradox: 2, locked: 1, cells: [{ index: 0, number: 1, position: "--track-x: 10%; --track-y: 50%;", state: "quintessence" }] },
  persistentMagickResources: { generatedQuintessence: "1", permanentParadox: 0 },
  wheelAsBar: false, contraccolpo: { used: false },
  lineage: { completa: "Verbena" }, lineageChoices: { familySphere: { icon: "f.png", label: "Vita" }, subSphere: null, groups: [{ label: "Tradizioni", famiglie: [{ id: "verbena", label: "Verbena", selected: true }] }], hasSubfamilies: false, sottofamiglie: [], subKind: "" },
  credos: [{ id: "arte", label: "Tutto è Arte", selected: true }], credoLabel: "Tutto è Arte", credoSpheres: [{ id: "forces", icon: "s.png", label: "Forze", family: true }], credoFree: false, credoSphereChoices: [],
  ritratti: { list: ["a.png", "b.png"], index: 0, count: 2, position: 1, many: true },
  arete: { value: 3, steps: [{ value: 1, active: true }, { value: 2, active: true }, { value: 3, active: true }, { value: 4, active: false }, { value: 5, active: false }] },
  spheres: [{ id: "forces", label: "WOD5E_MAGE.Spheres.forces", icon: "s.png", value: 3, family: true, chosen: true, poteri: [{ id: "forces-1-1", sphere: "forces", sphereLabel: "Forze", dot: 1, label: "Forze 1 · 1", short: "1 · 1", placeholder: true, text: "", selected: false }, { id: "forces-1-2", sphere: "forces", sphereLabel: "Forze", dot: 1, label: "Forze 1 · 2", short: "1 · 2", placeholder: true, text: "", selected: true }], potere: { id: "forces-1-2", short: "1 · 2" } }, { id: "life", label: "WOD5E_MAGE.Spheres.life", icon: "s.png", value: 0, family: false, chosen: false, poteri: [], potere: null }],
  scopeRows: [{ id: "potency", label: "Potenza", faIcon: "fa-solid fa-burst", level: 4, reading: "Peso: un'auto", mode: "potency", modeLabel: "Peso", modeCount: 3, nextModeLabel: "Epicità", multi: true, modeChosen: true, modeShown: false, modes: [{ id: "potency", label: "Peso", selected: true }, { id: "potencyEpic", label: "Epicità", selected: false }, { id: "potencyDamage", label: "Danni", selected: false }], steps: [1, 2, 3, 4, 5, 6, 7].map((v) => ({ value: v, active: v === 4, lit: v <= 4, reading: `lettura ${v}` })) }, { id: "area", label: "Area", faIcon: "fa-solid fa-map", level: 0, reading: "", mode: "area", modeLabel: "", modeCount: 1, nextModeLabel: "", multi: false, modeChosen: true, modeShown: false, modes: [{ id: "area", label: "", selected: true }], steps: [1, 2, 3, 4, 5, 6, 7].map((v) => ({ value: v, active: false, lit: false, reading: `area ${v}` })) }, { id: "duration", label: "Durata", faIcon: "fa-solid fa-hourglass", level: 0, reading: "", mode: "duration", modeLabel: "In gioco", modeCount: 2, nextModeLabel: "Narrativa", multi: true, modeChosen: false, modeShown: false, modes: [{ id: "duration", label: "In gioco", selected: true }, { id: "durationNarrative", label: "Narrativa", selected: false }], steps: [] }],
  poteri: [{ id: "forces-1-1", sphere: "forces", sphereLabel: "Forze", dot: 1, label: "Forze 1 · 1", short: "1 · 1", placeholder: true, text: "", selected: false }],
  incantesimi: [{ id: "s1", name: "Lama di fuoco", icon: "s.png", coda: "Forze 3", hint: "Obiettivo", chosen: true }],
  skillsFlat: false,
  attributeGroups: [{ id: "physical", label: "Fisico", rows: [{ id: "strength", displayName: "Forza", value: 3, icon: "i.png", chosen: false }, { id: "dexterity", displayName: "Destrezza", value: 4, icon: "i.png", chosen: true }] }],
  skillGroups: [{ id: "mental", label: "Mentale", rows: [{ id: "occult", key: "skill:occult", displayName: "Velo", value: 5, icon: "i.png", chosen: true, hasSpecialties: true, slots: [{ index: 0, name: "rituali", chosen: true }, { index: 1, name: "", chosen: false }, { index: 2, name: "", chosen: false }] }] }],
  customSkills: [{ id: "k1", name: "Cucina", value: 2, chosen: false }],
  traitRows: [{ id: "i1", name: "Occhio di lince", img: "m.png", kind: "merit", kindLabel: "Pregi", dice: "+1", chosen: true, hint: "h" }],
  traitKinds: [{ id: "merit", label: "Pregi" }],
  wisdom: { max: 10, superficial: 0, aggravated: 0, segnato: false },
  tiro: { magick: true, size: 6, empty: false, kindLabel: "Tiro di Magick", extra: { value: 1, dice: 1, cap: 3 }, pool: 10, computed: 1, difficulty: 1, manual: false, dice: 9, impossible: false, successFrom: 6, prize: { on: true, value: 3, arete: 3 }, quintessence: { value: 0, dice: 0, available: 4 }, sforza: false, kinds: [{ kind: "accidentale", label: "Accidentale", hint: "h" }, { kind: "volgare", label: "Volgare", hint: "h" }, { kind: "testimoni", label: "Volgare con testimoni", hint: "h" }], ready: true },
  creationSummary: { grades: [{ id: "a", label: "x", selected: true }], counts: [{ state: "ok", value: 1, target: 2, label: "l", hint: "" }], checks: [{ ok: true, label: "l", target: "" }] },
  bonuses: []
};
const html = stat(context);
for (const marker of ["wod5e-mage-riq-identita", "wod5e-mage-riq-risorse", "wod5e-mage-riq-magick", "wod5e-mage-riq-grimorio", "wod5e-mage-riq-attributi", "wod5e-mage-riq-tratti", "wod5e-mage-riq-abilita", "wod5e-mage-riq-tiro", 'data-action="tiroArete"', 'data-action="tiroScope" data-scope="potency" data-level="4" data-tooltip="4 · lettura 4"', 'class="wod5e-mage-pallino-ambito lit" data-action="tiroScope" data-scope="potency" data-level="4"', 'class="wod5e-mage-pallino-ambito" data-action="tiroScope" data-scope="potency" data-level="5"', 'data-tooltip="7 · lettura 7"', '<small class="wod5e-mage-ambito-tag">Peso</small><span>Peso: un&#x27;auto</span>', 'wod5e-mage-ambito-scegli" data-action="cassettoToggle"', 'wod5e-mage-riga-nome wod5e-mage-riga-nome-ambito" data-action="cassettoToggle"', 'data-action="scopeMode" data-scope="potency" data-mode="potencyEpic"', 'wod5e-mage-pastiglia wod5e-mage-pastiglia-modo scelta" data-action="scopeMode" data-scope="potency" data-mode="potency"', 'data-action="ventaglioToggle"', 'class="wod5e-mage-tiro-slot"', 'wod5e-mage-potere-voce scelta segnaposto" role="checkbox" aria-checked="true" data-action="tiroPower" data-power="forces-1-2"', 'wod5e-mage-casella spuntata"', 'wod5e-mage-sfera-potere pieno" data-action="cassettoToggle"', '<span>1 · 2</span>', 'wod5e-mage-sfera-conto vuoto"', 'data-action="tiroIncantesimo" data-row="s1"', "wod5e-mage-riga wod5e-mage-riga-incantesimo scelta", 'data-action="skillsFlatToggle"', 'data-action="tiroRoll" data-kind="testimoni"', "data-action=\"tiroExtra\"", "wod5e-mage-riga-saggezza con-ventaglio", 'wod5e-mage-ruota-tasto quintessence meno', 'wod5e-mage-ruota-tasto paradox piu', 'wod5e-mage-ventaglio wod5e-mage-ventaglio-sei', 'data-action="saluteExtraChange" data-delta="1"', 'data-action="wisdomResourceChange" data-resource-action="plus"', "wod5e-mage-condizioni-occhiello", 'data-action="ritrattoNext"', "1/2", 'data-action="specialtyDelete" data-skill="occult" data-index="0"', 'data-action="specialtyAdd" data-skill="occult"', "wod5e-mage-riga wod5e-mage-riga-tratto scelta", "WOD5E_MAGE.Tiro.Difficulty", "wod5e-mage-stat-creazione"]) {
  assert.ok(html.includes(marker), `manca ${marker}`);
}
assert.ok(!html.includes("wod5e-mage-tiro-tira"), "con l'Areté acceso il tasto TIRA non c'è: ci sono i tre tasti");
assert.ok(!html.includes("wod5e-mage-riq-salute") && !html.includes("wod5e-mage-riq-poteri") && !html.includes("wod5e-mage-ambito-livello"), "niente riquadri vecchi");
assert.equal((html.match(/data-action="scopeMode"/g) ?? []).length, 5, "le pastiglie delle letture: tre per Potenza, due per Durata, nessuna per Area");
assert.equal((html.match(/data-action="cassettoToggle"/g) ?? []).length, 4, "le tendine: Potenza e Durata dal nome, «Scegli la lettura» sulla Durata, il potere di Forze");
const sfereHtml = html.slice(html.indexOf("wod5e-mage-sfere-lista"), html.indexOf("wod5e-mage-ambiti-lista"));
assert.ok(!sfereHtml.includes("dotCounterChange") && !sfereHtml.includes("resource-value-step"), "niente pallini sulle Sfere della prima pagina (20/9 sera)");
assert.equal((sfereHtml.match(/wod5e-mage-potere-voce/g) ?? []).length, 2, "la tendina di Forze: una casella per potere");
assert.equal((html.match(/data-action="ventaglioToggle"/g) ?? []).length, 2, "il tastino della ruota su Salute e Saggezza");
// I pallini: Potenza (lettura scelta) e Area (una lettura sola) li hanno, la Durata no finché non si sceglie la lettura.
const ambiti = html.slice(html.indexOf("wod5e-mage-ambiti-lista"), html.indexOf("wod5e-mage-riq-tiro"));
assert.equal((ambiti.match(/data-action="tiroScope" data-scope="potency"/g) ?? []).length, 7);
assert.equal((ambiti.match(/data-action="tiroScope" data-scope="area"/g) ?? []).length, 7);
assert.equal((ambiti.match(/data-action="tiroScope" data-scope="duration"/g) ?? []).length, 0);
assert.equal((ambiti.match(/wod5e-mage-ambito-scegli/g) ?? []).length, 1, "«Scegli la lettura» solo sulla Durata, che ha più letture e nessuna scelta");
assert.ok(!ambiti.includes("pallino-ambito lit scelta") && !ambiti.includes("pallino-ambito scelta"), "niente pallino viola: il livello è il conto degli accesi");
assert.ok(!ambiti.includes("wod5e-mage-livello") && !ambiti.includes("wod5e-mage-riga-modo"), "via la tendina dei livelli e il tastino della lettura");
// Le Risorse nell'ordine di Blue (20/9): Salute, Saggezza, Quintessenza,
// Paradosso, Ruota, Condizioni; le colonne: Identità, Attributi, Abilità, Magick.
assert.ok(html.indexOf("wod5e-mage-riq-attributi") < html.indexOf("wod5e-mage-riq-abilita") && html.indexOf("wod5e-mage-riq-abilita") < html.indexOf("wod5e-mage-riq-magick"), "ordine delle colonne");
const risorseHtml = html.slice(html.indexOf("wod5e-mage-riq-risorse"), html.indexOf("wod5e-mage-riq-attributi"));
const posti = ["wod5e-mage-salute-track", "wod5e-mage-saggezza-track", "wod5e-mage-riga-conto quintessence", "wod5e-mage-riga-conto paradox", "wod5e-mage-magick-track-stat", "wod5e-mage-condizioni-box"].map((m) => risorseHtml.indexOf(m));
assert.ok(posti.every((p, i) => p >= 0 && (i === 0 || p > posti[i - 1])), `ordine delle Risorse: ${posti.join(", ")}`);
// Il meno e il più sulle righe dei conti, non sull'arco; niente ventaglio al sorvolo (solo la classe aperto).
assert.ok(!/wod5e-mage-magick-track-stat[\s\S]*?wod5e-mage-ruota-tasto[\s\S]*?wod5e-mage-ruota-dettagli/.test(risorseHtml), "l'arco non porta tasti");
assert.equal((risorseHtml.match(/data-action="ventaglioToggle"/g) ?? []).length, 2, "un tastino della ruota per Salute e Saggezza");
// Le Abilità in fila: niente occhielli delle famiglie, le Specifiche in mezzo alle altre.
const flat = stat({ ...context, skillsFlat: true, skillGroups: [{ id: "tutte", label: "", rows: [{ id: "athletics", key: "skill:athletics", displayName: "Atletica", value: 2, icon: "i.png", chosen: false, hasSpecialties: false, slots: [] }, { id: "k1", name: "Cucina", displayName: "Cucina", value: 2, chosen: false, custom: true }, { id: "occult", key: "skill:occult", displayName: "Velo", value: 5, icon: "i.png", chosen: false, hasSpecialties: false, slots: [] }] }], customSkills: [] });
const abilitaFlat = flat.slice(flat.indexOf("wod5e-mage-riq-abilita"), flat.indexOf("wod5e-mage-riq-grimorio"));
assert.ok(!abilitaFlat.includes("wod5e-mage-riq-occhiello"), "in fila niente occhielli");
assert.ok(abilitaFlat.indexOf("Atletica") < abilitaFlat.indexOf('customSkills.k1.name') && abilitaFlat.indexOf('customSkills.k1.name') < abilitaFlat.indexOf("Velo"), "la Specifica sta in mezzo, in ordine alfabetico");
assert.ok(abilitaFlat.includes("fa-layer-group"), "il tasto acceso riporta alle famiglie");
const skillRoll = stat({ ...context, tiro: { ...context.tiro, magick: false, kindLabel: "Tiro di Abilità", empty: true, size: 0, ready: false } });
assert.ok(skillRoll.includes("wod5e-mage-tiro-tira") && skillRoll.includes("disabled"), "senza tratti TIRA c'è ed è spento");
assert.ok(!skillRoll.includes('data-kind="testimoni"'));
assert.ok(header({}).includes("wod5e-mage-header-vuota"));
console.log("template della prima pagina: ok,", html.length, "caratteri");
