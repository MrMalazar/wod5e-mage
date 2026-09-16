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
  spheres: [{ id: "forces", label: "WOD5E_MAGE.Spheres.forces", icon: "s.png", value: 3, family: true, chosen: true }],
  scopeRows: [{ id: "potency", label: "Potenza", faIcon: "fa-solid fa-burst", level: 4, reading: "Peso: un'auto", steps: [1, 2, 3, 4, 5, 6, 7].map((v) => ({ value: v, active: v === 4, lit: v <= 4 })) }],
  poteri: [{ id: "forces-1-1", sphere: "forces", sphereLabel: "Forze", dot: 1, label: "Forze 1 · 1", placeholder: true, text: "", selected: false }],
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
for (const marker of ["wod5e-mage-riq-identita", "wod5e-mage-riq-salute", "wod5e-mage-riq-risorse", "wod5e-mage-riq-magick", "wod5e-mage-riq-poteri", "wod5e-mage-riq-attributi", "wod5e-mage-riq-tratti", "wod5e-mage-riq-abilita", "wod5e-mage-riq-tiro", 'data-action="tiroArete"', 'data-action="tiroScope" data-scope="potency" data-level="4"', 'class="wod5e-mage-ambito-livello active lit"', 'data-action="tiroRoll" data-kind="testimoni"', "data-action=\"tiroExtra\"", "wod5e-mage-saggezza-tendina", 'data-action="ritrattoNext"', "1/2", 'data-action="specialtyDelete" data-skill="occult" data-index="0"', 'data-action="specialtyAdd" data-skill="occult"', "wod5e-mage-riga wod5e-mage-riga-tratto scelta", "WOD5E_MAGE.Tiro.Difficulty", "wod5e-mage-stat-creazione"]) {
  assert.ok(html.includes(marker), `manca ${marker}`);
}
assert.ok(!html.includes("wod5e-mage-tiro-tira"), "con l'Areté acceso il tasto TIRA non c'è: ci sono i tre tasti");
const skillRoll = stat({ ...context, tiro: { ...context.tiro, magick: false, kindLabel: "Tiro di Abilità", empty: true, size: 0, ready: false } });
assert.ok(skillRoll.includes("wod5e-mage-tiro-tira") && skillRoll.includes("disabled"), "senza tratti TIRA c'è ed è spento");
assert.ok(!skillRoll.includes('data-kind="testimoni"'));
assert.ok(header({}).includes("wod5e-mage-header-vuota"));
console.log("template della prima pagina: ok,", html.length, "caratteri");
