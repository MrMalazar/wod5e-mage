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
// `concat` è di Foundry (HandlebarsHelpers.concat): incolla gli argomenti.
Handlebars.registerHelper("concat", (...args) => args.slice(0, -1).join(""));
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
  // I poteri inseriti dal giocatore (21/9): due su Forze (Conduttore scelto per il lancio), nessuno su Vita.
  spheres: [{ id: "forces", label: "WOD5E_MAGE.Spheres.forces", icon: "s.png", value: 3, family: true, chosen: true, poteri: [{ id: "forces-1-1", sphere: "forces", sphereLabel: "Forze", dot: 3, type: "passivo", label: "Vestire lo scudo", short: "Vestire lo scudo", text: "Difesa", selected: false, any: true, ok: true, hint: "" }, { id: "forces-1-2", sphere: "forces", sphereLabel: "Forze", dot: 2, type: "passivo", label: "Conduttore", short: "Conduttore", text: "", selected: true, any: false, ok: true, hint: "" }, { id: "forces-1-2#attivo", sphere: "forces", sphereLabel: "Forze", dot: 2, type: "passivo", label: "Conduttore · attivo", short: "Conduttore · attivo", text: "", selected: false, variant: "attivo", any: false, ok: false, nota: "0/1 per scena", hint: "0/1 per scena\nusi finiti" }], potere: { id: "forces-1-2", short: "Conduttore" } }, { id: "life", label: "WOD5E_MAGE.Spheres.life", icon: "s.png", value: 0, family: false, chosen: false, poteri: [], potere: null }],
  scopeRows: [{ id: "potency", label: "Potenza", faIcon: "fa-solid fa-burst", level: 4, reading: "Peso: un'auto", hint: "", mode: "potencyWeight", modeLabel: "Peso", modeShort: "Peso", modeCount: 2, nextModeLabel: "Danni", multi: true, modeChosen: true, modeShown: false, modes: [{ id: "potencyDamage", label: "Danni", selected: false }, { id: "potencyWeight", label: "Peso", selected: true }], zero: { value: 0, reading: "Peso: una mano", hint: "", tip: "0 · Peso: una mano" }, steps: [1, 2, 3, 4, 5, 6, 7].map((v) => ({ value: v, active: v === 4, lit: v <= 4, reading: `lettura ${v}`, hint: "", tip: `${v} · lettura ${v}` })) }, { id: "targets", label: "Bersagli", faIcon: "fa-solid fa-user", level: 0, reading: "Un bersaglio", hint: "", mode: "targets", modeLabel: "Effetto", modeShort: "Effetto", modeCount: 2, nextModeLabel: "Area", multi: true, modeChosen: true, modeShown: true, modes: [{ id: "targets", label: "Effetto", selected: true }, { id: "targetsArea", label: "Area", selected: false }], zero: { value: 0, reading: "Un bersaglio", hint: "", tip: "0 · Un bersaglio" }, steps: [1, 2, 3, 4, 5, 6, 7].map((v) => ({ value: v, active: false, lit: false, reading: `+${v}`, hint: "", tip: `${v} · +${v}` })) }, { id: "duration", label: "Durata", faIcon: "fa-solid fa-hourglass", level: 0, reading: "", hint: "", mode: "duration", modeLabel: "Gioco", modeShort: "Gioco", modeCount: 2, nextModeLabel: "Mondo", multi: true, modeChosen: false, modeShown: false, modes: [{ id: "duration", label: "Gioco", selected: false }, { id: "durationWorld", label: "Mondo", selected: false }], zero: { value: 0, reading: "", hint: "", tip: "0" }, steps: [1, 2, 3, 4, 5, 6, 7].map((v) => ({ value: v, active: false, lit: false, reading: "", hint: "", tip: String(v) })) }],
  poteri: [{ id: "forces-1-1", sphere: "forces", sphereLabel: "Forze", dot: 3, type: "passivo", label: "Vestire lo scudo", short: "Vestire lo scudo", text: "Difesa", selected: false }],
  incantesimi: [{ id: "s1", name: "Lama di fuoco", icon: "s.png", coda: "Forze 3", hint: "Obiettivo", chosen: true }],
  skillsFlat: false,
  attributeGroups: [{ id: "physical", label: "Fisico", rows: [{ id: "strength", displayName: "Forza", value: 3, icon: "i.png", chosen: false }, { id: "dexterity", displayName: "Destrezza", value: 4, icon: "i.png", chosen: true }] }],
  skillGroups: [{ id: "mental", label: "Mentale", rows: [{ id: "occult", key: "skill:occult", displayName: "Velo", value: 5, icon: "i.png", chosen: true, spec: { slots: 3, free: 2, chosen: "rituali", scritte: [{ index: 0, name: "rituali", chosen: true }], suggestions: ["Cosmologia", "Vampiri"] }, specialtyChosen: "rituali" }] }],
  customSkills: [{ id: "k1", name: "Cucina", value: 2, chosen: false }],
  traitRows: [{ id: "i1", name: "Occhio di lince", img: "m.png", kind: "merit", kindLabel: "Pregi", dice: "+1", chosen: true, hint: "h" }],
  traitKinds: [{ id: "background", label: "Background", short: "Background", empty: "Nessun Background", active: false }, { id: "merit", label: "Pregi", short: "Pregi", empty: "Nessun Pregio", active: true }, { id: "grimorio", label: "Grimorio", short: "Grimorio", empty: "Nessun incantesimo", active: false }],
  trattiScheda: "merit",
  wisdom: { max: 6, base: 6, extra: 0, attribute: "charisma", attributeLabel: "Charisma", attributeValue: 3, chosen: "", superficial: 1, aggravated: 1, segnato: false, cells: [{ index: 0, state: "a", label: "a" }, { index: 1, state: "s", label: "s" }, { index: 2, state: "", label: "e" }, { index: 3, state: "", label: "e" }, { index: 4, state: "", label: "e" }, { index: 5, state: "", label: "e" }] },
  tiro: { magick: true, size: 6, empty: false, kindLabel: "Tiro di Magick", pills: [{ kind: "spell", id: "s1", text: "Lama di fuoco" }, { kind: "arete", id: "arete", text: "Areté 3" }, { kind: "sphere", id: "forces", text: "Forze" }, { kind: "scope", id: "potency", text: "Potenza 4", level: 4 }, { kind: "attribute", id: "dexterity", text: "Destrezza 4" }, { kind: "skill", id: "skill:occult", text: "Velo 5" }, { kind: "specialty", id: "rituali", skill: "skill:occult", text: "rituali 1" }, { kind: "trait", id: "i1", text: "Occhio di lince +1" }], extra: { value: 1, dice: 1, cap: 3 }, riserva: 10, pool: 10, computed: 1, difficulty: 1, manual: false, dice: 9, dadi: { value: 0, label: "0" }, impossible: false, successFrom: 6, prize: { on: true, value: 3, arete: 3 }, quintessence: { value: 0, dice: 0, available: 4, allowed: true }, potere: { name: "Conduttore", note: ["Conduttore: +1 dadi · Un dado in più."], esclusi: ["Conduttore: vale nei tiri di Abilità"], autoSuccess: false, autoSuccessMotivo: "", active: false, cost: 0 }, sforza: false, kinds: [{ kind: "accidentale", label: "Accidentale", hint: "h" }, { kind: "volgare", label: "Volgare", hint: "h" }, { kind: "testimoni", label: "Volgare con testimoni", hint: "h" }], ready: true },
  creationSummary: { grades: [{ id: "a", label: "x", selected: true }], counts: [{ state: "ok", value: 1, target: 2, label: "l", hint: "" }], checks: [{ ok: true, label: "l", target: "" }] },
  // Il memo come spunta (23/9), acceso: i conti sui titoli e i premi della Sfida nella barra.
  memo: { on: true, sfida: { done: 1, total: 3, complete: false, prizes: [{ bonus: 1, label: "Abilità", earned: true }, { bonus: 2, label: "Vantaggi", earned: false }, { bonus: 1, label: "Sfera", earned: false }] }, boxes: { identita: { state: "under", concetto: false }, attributi: { text: "12/22", state: "under", sfida: 0 }, abilita: { text: "20/20", state: "exact", sfida: 1, tetto: { ok: false, target: 3 } }, magick: { state: "exact", arete: { ok: true, target: 1 }, sfere: { text: "6/6", state: "exact", sfida: 0 } }, tratti: { state: "under", vantaggi: { text: "5/7", state: "under", sfida: 0 }, difetti: { text: "2/2", state: "exact" } } }, tabs: { personaggio: { state: "under" }, focus: { state: "exact" }, conceptChallenge: { state: "" }, dotazione: { state: "under" } } },
  bonuses: []
};
const html = stat(context);
for (const marker of ["wod5e-mage-riq-identita", "wod5e-mage-riq-risorse", "wod5e-mage-riq-magick", "wod5e-mage-riq-attributi", "wod5e-mage-riq-tratti", "wod5e-mage-riq-abilita", "wod5e-mage-riq-tiro", 'data-action="tiroArete"', 'data-action="tiroScope" data-scope="potency" data-level="4" data-tooltip="4 · lettura 4"', 'data-action="tiroScope" data-scope="duration" data-level="3" data-tooltip="3"', 'class="wod5e-mage-pallino-ambito lit" data-action="tiroScope" data-scope="potency" data-level="4"', 'class="wod5e-mage-pallino-ambito" data-action="tiroScope" data-scope="potency" data-level="5"', 'data-tooltip="7 · lettura 7"', '<small class="wod5e-mage-ambito-tag" title="Peso">Peso</small></button>', '<span>Durata</span><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>', 'wod5e-mage-riga-nome wod5e-mage-riga-nome-ambito" data-action="cassettoToggle"', 'data-action="scopeMode" data-scope="potency" data-mode="potencyWeight"', 'wod5e-mage-pastiglia wod5e-mage-pastiglia-modo scelta" data-action="scopeMode" data-scope="potency" data-mode="potencyWeight"', 'data-action="ventaglioToggle"', 'wod5e-mage-pillola tipo-spell', 'data-action="tiroPill" data-kind="specialty" data-id="rituali" data-skill="skill:occult"', 'wod5e-mage-tiro-numero riserva', 'wod5e-mage-tiro-numero soglia', 'wod5e-mage-tiro-numero dadi', 'data-action="tiroDadi" data-delta="1"', 'wod5e-mage-potere-voce scelta" role="checkbox" aria-checked="true" data-action="tiroPower" data-power="forces-1-2" data-sphere="forces"', 'wod5e-mage-casella spuntata"', 'wod5e-mage-sfera-potere pieno" data-action="cassettoToggle"', '<span>Conduttore</span>', 'wod5e-mage-sfera-conto vuoto"', 'data-action="tiroIncantesimo" data-row="s1"', "wod5e-mage-riga wod5e-mage-riga-oggetto wod5e-mage-riga-incantesimo scelta", 'wod5e-mage-riq-tratti" data-scheda="merit"', 'wod5e-mage-filtro wod5e-mage-scheda active" role="tab" data-kind="merit"', 'data-kind="grimorio"', 'data-action="skillsFlatToggle"', 'data-action="tiroRoll" data-kind="testimoni"', "data-action=\"tiroExtra\"", "wod5e-mage-riga-saggezza con-ventaglio", 'data-action="wisdomAttributePick"', 'wod5e-mage-inchiostro-cella" data-state="a" data-action="wisdomCellChange" data-index="0"', 'data-action="wisdomSegna"', 'data-action="wisdomCura"', 'data-action="wisdomReset"', 'wod5e-mage-ruota-tasto quintessence meno', 'wod5e-mage-ruota-tasto paradox piu', 'wod5e-mage-ventaglio wod5e-mage-ventaglio-sei', 'data-action="saluteExtraChange" data-delta="1"', 'data-action="wisdomResourceChange" data-resource-action="plus"', "wod5e-mage-condizioni-occhiello", 'data-action="ritrattoNext"', "1/2", 'data-action="specialtyDelete" data-skill="occult" data-index="0"', 'wod5e-mage-riga-abilita scelta con-specializzazioni aperta" data-skill="occult"', 'class="wod5e-mage-abilita-apri piena" data-action="specialtyToggle" aria-expanded="true" title="WOD5E_MAGE.Specialties.Apri" aria-label="Velo: WOD5E_MAGE.Specialties.Apri"><small>1</small><i class="fa-solid fa-chevron-down"', 'wod5e-mage-pastiglia wod5e-mage-pastiglia-spec scelta', 'data-action="tiroSpecialty" data-key="skill:occult" data-specialty="rituali" aria-pressed="true"', 'class="wod5e-mage-pastiglia-scrivi" list="wod5e-mage-spec--occult" data-specialty-add="occult" data-skill-label="Velo"', '<datalist id="wod5e-mage-spec--occult"><option value="Cosmologia"></option><option value="Vampiri"></option></datalist>', "wod5e-mage-riga wod5e-mage-riga-tratto scelta", "WOD5E_MAGE.Tiro.Difficulty", "wod5e-mage-stat-creazione"]) {
  assert.ok(html.includes(marker), `manca ${marker}`);
}
// Il memo acceso (23/9): la barra con la spunta, il grado e la Sfida; i conti sui titoli, colorati.
for (const marker of ["wod5e-mage-creazione-barra acceso", "name=\"flags.wod5e-mage.creazione.memo\" checked", "wod5e-mage-memo-premio preso\">+1 Abilità", "wod5e-mage-memo-premio\">+2 Vantaggi", "data-reset=\"all\"", 'wod5e-mage-riq-title memo-under', 'wod5e-mage-riq-title memo-exact', '<b class="wod5e-mage-memo-conto" title="WOD5E_MAGE.Riepilogo.Attributes">12/22</b>', 'WOD5E_MAGE.Riepilogo.SkillCapBreve 3', 'fa-circle-xmark']) {
  assert.ok(html.includes(marker), `manca ${marker}`);
}
assert.ok(!html.includes("wod5e-mage-riepilogo-chip") && !html.includes("wod5e-mage-riepilogo-checks"), "niente chip né spunte del memo vecchio");
{
  // Spento: nessun conto e nessun colore sui titoli.
  const spento = stat({ ...context, memo: { ...context.memo, on: false } });
  assert.ok(!spento.includes("wod5e-mage-memo-conto") && !spento.includes("memo-under") && !spento.includes("wod5e-mage-memo-grado"), "memo spento: titoli puliti");
}
assert.ok(!html.includes("wod5e-mage-tiro-tira"), "con l'Areté acceso il tasto TIRA non c'è: ci sono i tre tasti");
assert.ok(!html.includes("wod5e-mage-riq-salute") && !html.includes("wod5e-mage-riq-poteri") && !html.includes("wod5e-mage-ambito-livello") && !html.includes("wod5e-mage-riq-grimorio"), "niente riquadri vecchi");
assert.equal((html.match(/data-action="scopeMode"/g) ?? []).length, 6, "le pastiglie delle lenti (23/9): due per Potenza, due per Bersagli, due per Durata");
assert.equal((html.match(/data-action="cassettoToggle"/g) ?? []).length, 4, "le tendine: Potenza, Bersagli e Durata dal nome, il potere di Forze (le Specializzazioni stanno in riga dal 26/9)");
assert.ok(!html.includes('data-action="specialtyAdd"') && !html.includes("wod5e-mage-abilita-tendina"), "niente finestra né tendina per le Specializzazioni (26/9)");
const sfereHtml = html.slice(html.indexOf("wod5e-mage-sfere-lista"), html.indexOf("wod5e-mage-ambiti-lista"));
assert.ok(!sfereHtml.includes("dotCounterChange") && !sfereHtml.includes("resource-value-step"), "niente pallini sulle Sfere della prima pagina (20/9 sera)");
assert.equal((sfereHtml.match(/wod5e-mage-potere-voce/g) ?? []).length, 3 + 1, "la tendina di Forze: una casella per potere, più la riga «· attivo» (con la sua nota in piccolo)");
// Gli effetti sul tiro (tappa 3): la riga dice se vale fuori dalla Magick, la variante attiva porta la nota e si spegne se non si può; il Tiro stampa le note del potere.
for (const marker of ['data-power="forces-1-1" data-sphere="forces" data-any="true"', 'wod5e-mage-potere-voce variante spenta" role="checkbox" aria-checked="false" data-action="tiroPower" data-power="forces-1-2#attivo"', '<small class="wod5e-mage-potere-voce-nota">0/1 per scena</small>', 'wod5e-mage-tiro-potere">', '<p class="wod5e-mage-tiro-potere-nota">Conduttore: +1 dadi · Un dado in più.</p>', '<p class="wod5e-mage-tiro-potere-fuori">Conduttore: vale nei tiri di Abilità</p>', 'data-action="tiroQuintessence" data-delta="1"']) {
  assert.ok(html.includes(marker), `manca ${marker}`);
}
{
  const riesce = stat({ ...context, tiro: { ...context.tiro, potere: { ...context.tiro.potere, autoSuccess: true, cost: 2 } } });
  assert.ok(riesce.includes('wod5e-mage-tiro-potere riesce"') && riesce.includes("WOD5E_MAGE.Tiro.RiesceSenzaTirare(name&#x3D;Conduttore)") && riesce.includes("WOD5E_MAGE.Tiro.PotereCosto(points&#x3D;2)"), "la riuscita senza tirare e il costo del potere");
  const senzaQ = stat({ ...context, tiro: { ...context.tiro, magick: false, quintessence: { ...context.tiro.quintessence, allowed: false } } });
  assert.ok(!senzaQ.includes('data-action="tiroQuintessence"'), "fuori dalla Magick la Quintessenza c'è solo se un potere lo dice");
}
assert.equal((html.match(/data-action="ventaglioToggle"/g) ?? []).length, 2, "il tastino della ruota su Salute e Saggezza");
// I pallini (21/9): tutti li hanno, anche la Durata senza lettura scelta (col solo numero nel tooltip).
const ambiti = html.slice(html.indexOf("wod5e-mage-ambiti-lista"), html.indexOf("wod5e-mage-riq-tiro"));
assert.equal((ambiti.match(/data-action="tiroScope" data-scope="potency"/g) ?? []).length, 7);
// Lo 0 davanti (26/9): un pallino fisso per Ambito, senza azione, col testo della base e la spiegazione nel sorvolo.
assert.equal((ambiti.match(/wod5e-mage-pallino-ambito zero lit" data-tooltip="/g) ?? []).length, 3);
assert.ok(ambiti.includes('class="wod5e-mage-pallino-ambito zero lit" data-tooltip="0 · Un bersaglio&#10;WOD5E_MAGE.Scopes.Zero"'), "il pallino dello 0 dei Bersagli legge la base");
assert.equal((ambiti.match(/data-action="tiroScope" data-scope="targets"/g) ?? []).length, 7);
assert.ok(!ambiti.includes('data-scope="area"'), "l'Area non è più un Ambito: è una lente dei Bersagli (23/9)");
assert.ok(ambiti.includes("title=\"Un bersaglio\""), "a riposo la riga legge lo 0, la base");
assert.equal((ambiti.match(/data-action="tiroScope" data-scope="duration"/g) ?? []).length, 7);
assert.ok(!ambiti.includes("wod5e-mage-ambito-scegli") && !ambiti.includes("ScopeModeChoose"), "«Scegli la lettura» non c'è più");
assert.ok(!ambiti.includes("wod5e-mage-pastiglia-modo scelta\" data-action=\"scopeMode\" data-scope=\"duration\""), "nessuna pastiglia accesa finché la lettura non è scelta");
assert.ok(!ambiti.includes("pallino-ambito lit scelta") && !ambiti.includes("pallino-ambito scelta"), "niente pallino viola: il livello è il conto degli accesi");
assert.ok(!ambiti.includes("wod5e-mage-livello") && !ambiti.includes("wod5e-mage-riga-modo"), "via la tendina dei livelli e il tastino della lettura");
assert.ok(!ambiti.includes("wod5e-mage-ambito-lettura"), "niente seconda linea sotto l'Ambito (23/9)");
assert.ok(ambiti.includes("title=\"Peso: un&#x27;auto\""), "la lettura del livello resta nel tooltip della riga");
// Le Risorse nell'ordine di Blue (20/9): Salute, Saggezza, Quintessenza,
// Paradosso, Ruota, Condizioni; le colonne: Identità, Attributi, Abilità, Magick.
assert.ok(html.indexOf("wod5e-mage-riq-attributi") < html.indexOf("wod5e-mage-riq-abilita") && html.indexOf("wod5e-mage-riq-abilita") < html.indexOf("wod5e-mage-riq-magick"), "ordine delle colonne");
const risorseHtml = html.slice(html.indexOf("wod5e-mage-riq-risorse"), html.indexOf("wod5e-mage-riq-attributi"));
const posti = ["wod5e-mage-salute-track", "wod5e-mage-saggezza-track", "wod5e-mage-riga-conto quintessence", "wod5e-mage-riga-conto paradox", "wod5e-mage-magick-track-stat", "wod5e-mage-condizioni-box"].map((m) => risorseHtml.indexOf(m));
assert.ok(posti.every((p, i) => p >= 0 && (i === 0 || p > posti[i - 1])), `ordine delle Risorse: ${posti.join(", ")}`);
// Il meno e il più sulle righe dei conti, non sull'arco; niente ventaglio al sorvolo (solo la classe aperto).
assert.ok(!/wod5e-mage-magick-track-stat[\s\S]*?wod5e-mage-ruota-tasto[\s\S]*?wod5e-mage-ruota-dettagli/.test(risorseHtml), "l'arco non porta tasti");
assert.equal((risorseHtml.match(/data-action="ventaglioToggle"/g) ?? []).length, 2, "un tastino della ruota per Salute e Saggezza");
assert.equal((risorseHtml.match(/wod5e-mage-ventaglio wod5e-mage-ventaglio-sei/g) ?? []).length, 2, "due ruote a sei comandi (23/9)");
assert.equal((risorseHtml.match(/wod5e-mage-inchiostro-cella/g) ?? []).length, 6, "sei caselle d'inchiostro");
// Le Abilità in fila: niente occhielli delle famiglie, le Specifiche in mezzo alle altre.
const flat = stat({ ...context, skillsFlat: true, skillGroups: [{ id: "tutte", label: "", rows: [{ id: "athletics", key: "skill:athletics", displayName: "Atletica", value: 2, icon: "i.png", chosen: false, spec: { slots: 1, free: 1, chosen: "", scritte: [], suggestions: [] } }, { id: "k1", name: "Cucina", displayName: "Cucina", value: 2, chosen: false, custom: true }, { id: "occult", key: "skill:occult", displayName: "Velo", value: 5, icon: "i.png", chosen: false, spec: { slots: 3, free: 3, chosen: "", scritte: [], suggestions: [] } }] }], customSkills: [] });
const abilitaFlat = flat.slice(flat.indexOf("wod5e-mage-riq-abilita"), flat.indexOf("wod5e-mage-riq-magick"));
assert.ok(!abilitaFlat.includes("wod5e-mage-riq-occhiello"), "in fila niente occhielli");
assert.ok(abilitaFlat.indexOf("Atletica") < abilitaFlat.indexOf('customSkills.k1.name') && abilitaFlat.indexOf('customSkills.k1.name') < abilitaFlat.indexOf("Velo"), "la Specifica sta in mezzo, in ordine alfabetico");
assert.ok(abilitaFlat.includes("fa-layer-group"), "il tasto acceso riporta alle famiglie");
const skillRoll = stat({ ...context, tiro: { ...context.tiro, magick: false, kindLabel: "Tiro di Abilità", empty: true, size: 0, ready: false } });
assert.ok(skillRoll.includes("wod5e-mage-tiro-tira") && skillRoll.includes("disabled"), "senza tratti TIRA c'è ed è spento");
assert.ok(!skillRoll.includes('data-kind="testimoni"'));
assert.ok(header({}).includes("wod5e-mage-header-vuota"));
console.log("template della prima pagina: ok,", html.length, "caratteri");
