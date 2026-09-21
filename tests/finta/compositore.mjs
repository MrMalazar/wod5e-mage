import assert from "node:assert/strict";
globalThis.__sim = { rolls: [], messages: [], faces: [], situational: [] };
const strings = { "WOD5E_MAGE.RamoC.DiceNote": "Dadi: {note}", "WOD5E_MAGE.RamoC.NoDice": "Nessun dado", "WOD5E_MAGE.Arete.Label": "Areté", "WOD5E_MAGE.Skills.Veil": "Velo", "WOD5E_MAGE.Spheres.forces": "Forze", "WOD5E_MAGE.Scopes.potency": "Potenza", "WOD5E_MAGE.Scopes.range": "Portata", "WOD5E_MAGE.Tiro.Kinds.testimoni": "Volgare con testimoni", "WOD5E_MAGE.Tiro.KindMagick": "Tiro di Magick", "WOD5E_MAGE.Tiro.KindSkill": "Tiro di Abilità", "WOD5E_MAGE.Tiro.KindNone": "Componi", "WOD5E_MAGE.Tiro.PowerNote": "Potere: {name}.", "WOD5E_MAGE.Arete.SkillSpecialtyFlavor": "Specializzazione +{dice}", "WOD5E_MAGE.Arete.QuintessenceFlavor": "Quintessenza {points}", "WOD5E_MAGE.Arete.QuintessenceSpent": "spesa {points}", "WOD5E_MAGE.MagickBalance.ParadoxGained": "+{amount} Paradosso", "WOD5E_MAGE.Tiro.ManualDifficultyNote": "a mano {difficulty} ({computed})" };
const fmt = (k, d = {}) => Object.entries(d).reduce((t, [a, b]) => t.replace(`{${a}}`, String(b)), strings[k] ?? k);
globalThis.game = { i18n: { lang: "it", localize: (k) => strings[k] ?? k, format: fmt }, settings: { get: () => "publicroll" } };
globalThis.CONFIG = { Dice: { terms: {}, rollModes: {} } };
globalThis.Hooks = { once() {} };
globalThis.ChatMessage = { getSpeaker: ({ actor }) => ({ alias: actor.name }), applyRollMode: (d) => d, create: async (d) => { const m = { ...d, getFlag: (s, k) => d.flags?.[s]?.[k] }; globalThis.__sim.messages.push(m); return m; } };
globalThis.foundry = { applications: { api: { DialogV2: {} }, handlebars: {} }, utils: { randomID: () => "id" + Math.random().toString(36).slice(2, 8) } };
const infos = []; globalThis.ui = { notifications: { info: (m) => infos.push(m), warn: (m) => infos.push("WARN " + m) } };

// I poteri inseriti dal giocatore (21/9): tre su Forze, uno su Mente, nessun segnaposto.
const flags = { "wod5e-mage": { arete: { value: 3 }, spheres: { forces: 3, mind: 1 }, sphereSelection: { forces: true, mind: true }, magickBalance: { quintessence: 4, paradox: 1 }, focus: { practiceForm: "magick" }, poteri: { pf1: { sphere: "forces", name: "Conduttore", dot: 2, type: "passivo" }, pf2: { sphere: "forces", name: "Vestire lo scudo", dot: 3, type: "passivo" }, pf3: { sphere: "forces", name: "Buco nero", dot: 5, type: "attivo", effects: [{ on: "threshold", value: -2 }] }, pm1: { sphere: "mind", name: "Testa dura", dot: 1, type: "passivo" } } } };
const items = new Map([["i1", { id: "i1", name: "Occhio di lince", type: "feature", img: "", system: { featuretype: "merit", bonuses: [{ value: 1 }] } }]]);
const actor = {
  name: "Ianira", isOwner: true, items,
  system: {
    locked: false,
    sortedAttributes: { physical: [{ id: "dexterity", displayName: "Destrezza", value: 4 }], social: [], mental: [{ id: "wits", displayName: "Prontezza", value: 2 }] },
    sortedSkills: { mental: [{ id: "occult", displayName: "Velo", value: 5 }], physical: [{ id: "athletics", displayName: "Atletica", value: 2 }], social: [] },
    skills: { occult: { value: 5, bonuses: [{ source: "rituali", value: 1 }] }, athletics: { value: 2, bonuses: [] } },
    attributes: { dexterity: { value: 4 }, wits: { value: 2 } }
  },
  getFlag: (scope, key) => flags[scope]?.[key],
  setFlag: async (scope, key, value) => { flags[scope][key] = value; },
  update: async (data) => { for (const [k, v] of Object.entries(data)) { const path = k.split("."); if (path[0] === "flags") { let node = flags; for (const p of path.slice(1, -1)) node[p] ??= {}, node = node[p]; node[path.at(-1)] = v; } } }
};
const spheresMod = await import(new URL("../../scripts/spheres.js", import.meta.url).href);
// prepareSpheres legge la selezione dalla bandiera: controlla che la finta la regga.
const sel = spheresMod.prepareSpheres(actor, { localize: (k) => strings[k] ?? k, locale: "it" });
assert.ok(sel.selected.some((s) => s.id === "forces"), "Forze selezionata nella finta");

const T = await import(new URL("../../scripts/tiro.js", import.meta.url).href);
const S = await import(new URL("../../scripts/tiro-scheda.js", import.meta.url).href);
const { ROLL_CARD_FLAG } = await import(new URL("../../scripts/roll-card.js", import.meta.url).href);

// Componi: Areté, Forze, Potenza 4, Portata 3, Destrezza, Velo con rituali, il Pregio.
let tiro = T.toggleArete(T.emptyTiro());
tiro = T.toggleSphere(tiro, "forces");
tiro = T.setScope(T.setScope(tiro, "potency", 4), "range", 3);
tiro = T.pickAttribute(tiro, "dexterity");
tiro = T.pickSpecialty(tiro, "skill:occult", "rituali");
tiro = T.toggleTrait(tiro, "i1");
const ctx = S.prepareTiroContext(actor, tiro);
assert.equal(ctx.magick, true);
assert.equal(ctx.size, 8, "otto pezzi in catena (la catena non si stampa, ma si conta)");
assert.deepEqual([ctx.pool, ctx.computed, ctx.difficulty, ctx.dice, ctx.successFrom, ctx.ready], [4 + 5 + 1 + 1, 7 - 3, 4, 7, 6, true]);
assert.deepEqual([ctx.extra.value, ctx.extra.cap], [0, 3]);
const conExtra = S.prepareTiroContext(actor, T.setExtra(tiro, 2));
assert.deepEqual([conExtra.extra.value, conExtra.extra.dice, conExtra.pool], [2, 2, 13], "i dadi extra entrano nella riserva");
assert.deepEqual([ctx.prize.on, ctx.prize.arete, ctx.quintessence.available], [true, 3, 4]);
const rows = S.prepareScopeRows(tiro, (k) => strings[k] ?? k, { arete: 3 });
assert.equal(rows.length, 7);
assert.equal(rows.find((r) => r.id === "potency").steps[3].active, true);
const poteri = S.preparePoteriRows(actor, tiro, (k) => strings[k] ?? k);
assert.equal(poteri.length, 3 + 1, "i poteri inseriti: tre su Forze e uno su Mente (21/9: non gli slot)");
assert.deepEqual(poteri.map((p) => p.label), ["Conduttore", "Vestire lo scudo", "Buco nero", "Testa dura"], "in ordine di Sfera e di pallino, col nome vero");
assert.equal(poteri[0].short, "Conduttore");
assert.deepEqual(S.poteriOfSphere(poteri, "mind").map((p) => p.id), ["pm1"], "la tendina di Mente ha il suo");
// Il potere scelto porta la sua Sfera (la casella la passa) e i suoi effetti entrano nel conto.
const conPotere = S.prepareTiroContext(actor, T.pickPower(T.toggleArete(T.emptyTiro()), "pf3", "forces"));
assert.deepEqual([conPotere.magick, conPotere.size], [true, 3], "Areté, Forze e il potere");
assert.equal(S.contoInputs(actor, T.pickPower(T.emptyTiro(), "pf3", "forces")).inputs.power.name, "Buco nero", "il potere si legge fra quelli del personaggio");
assert.equal(S.contoInputs(actor, T.pickPower(T.emptyTiro(), "zzz", "forces")).inputs.power, null);
assert.equal(rows.find((r) => r.id === "potency").steps[3].reading, rows.find((r) => r.id === "potency").reading, "la lettura sul numero è quella della riga");
// Senza una lettura scelta (21/9) la Potenza, che ne ha tre, non stampa nessuna lettura: solo il numero.
assert.deepEqual([rows.find((r) => r.id === "potency").reading, rows.find((r) => r.id === "potency").steps[3].tip], ["", "4"]);
// La lettura («modalità») dell'Ambito (16/9 sera): la prima della tavola, o quella scelta col tastino.
const potenza = rows.find((r) => r.id === "potency");
assert.deepEqual([potenza.mode, potenza.modeCount, potenza.modeLabel, potenza.nextModeLabel], ["potency", 3, "WOD5E_MAGE.Scopes.Sub.potency", "WOD5E_MAGE.Scopes.Sub.potencyEpic"]);
assert.equal(potenza.reading, "", "nessuna lettura scelta: niente testo");
const potenzaPeso = S.prepareScopeRows(tiro, (k) => strings[k] ?? k, { arete: 3, modes: { potency: "potency" } }).find((r) => r.id === "potency");
assert.match(potenzaPeso.reading, /Table\.potency\.4/);
assert.match(potenzaPeso.steps[3].tip, /^4 · .*Table\.potency\.4/);
const area = rows.find((r) => r.id === "area");
assert.deepEqual([area.modeCount, area.modeLabel, area.nextModeLabel], [1, "", ""], "l'Area ha una lettura sola: niente tastino");
const conDanni = S.prepareScopeRows(tiro, (k) => strings[k] ?? k, { arete: 3, modes: { potency: "potencyDamage", area: "boh" } }).find((r) => r.id === "potency");
assert.deepEqual([conDanni.mode, conDanni.nextModeLabel], ["potencyDamage", "WOD5E_MAGE.Scopes.Sub.potency"], "dai Danni si torna al Peso");
assert.equal(conDanni.reading, "Areté WOD5E_MAGE.Scopes.Table.potencyDamage.4", "i Danni: l'Areté più il numero del quarto pallino (la finta traduce solo Areté)");
// Il tastino: chi possiede scrive la bandiera; la scheda rilegge la bandiera.
const sheetModi = { actor, _tiro: T.emptyTiro(), render: async () => {} };
await S.onScopeMode.call(sheetModi, { preventDefault() {} }, { dataset: { scope: "potency" } });
assert.equal(flags["wod5e-mage"].scopeModes.potency, "potencyEpic");
await S.onScopeMode.call(sheetModi, { preventDefault() {} }, { dataset: { scope: "potency" } });
assert.equal(flags["wod5e-mage"].scopeModes.potency, "potencyDamage");
assert.deepEqual(S.scopeModesOf(sheetModi), { potency: "potencyDamage" });
await S.onScopeMode.call(sheetModi, { preventDefault() {} }, { dataset: { scope: "area" } });
assert.equal(flags["wod5e-mage"].scopeModes.area, "area", "con una lettura sola il giro resta lì");
// La tendina delle letture (20/9 sera): la lettura chiesta per nome, e la riga sa se è scelta.
await S.onScopeMode.call(sheetModi, { preventDefault() {} }, { dataset: { scope: "potency", mode: "potencyEpic" } });
assert.equal(flags["wod5e-mage"].scopeModes.potency, "potencyEpic", "dalla tendina arriva la lettura chiesta");
await S.onScopeMode.call(sheetModi, { preventDefault() {} }, { dataset: { scope: "potency", mode: "boh" } });
assert.equal(flags["wod5e-mage"].scopeModes.potency, "potencyEpic", "una lettura che non esiste non cambia niente");
const righeTendina = S.prepareScopeRows(tiro, (k) => strings[k] ?? k, { arete: 3, modes: { potency: "potencyEpic" } });
const potenzaTendina = righeTendina.find((r) => r.id === "potency");
assert.deepEqual([potenzaTendina.multi, potenzaTendina.modeChosen, potenzaTendina.modes.map((m) => m.id), potenzaTendina.modes.find((m) => m.selected).id], [true, true, ["potency", "potencyEpic", "potencyDamage"], "potencyEpic"]);
const areaTendina = righeTendina.find((r) => r.id === "area");
assert.deepEqual([areaTendina.multi, areaTendina.modeChosen, areaTendina.modeShown], [false, true, false], "una lettura sola: i pallini ci sono sempre, niente tendina");
const durataTendina = righeTendina.find((r) => r.id === "duration");
assert.deepEqual([durataTendina.multi, durataTendina.modeChosen, durataTendina.modeShown, durataTendina.steps.length, durataTendina.steps[2].tip, durataTendina.steps[2].reading, durataTendina.modes.some((m) => m.selected)], [true, false, false, 7, "3", "", false], "più letture, nessuna scelta (21/9): i pallini ci sono lo stesso, col solo numero, e nessuna pastiglia accesa");
assert.deepEqual([potenzaTendina.steps[3].tip.startsWith("4 · "), areaTendina.steps[0].tip.startsWith("1 · ")], [true, true], "con la lettura il tooltip dice livello e lettura");
const durataScelta = S.prepareScopeRows(tiro, (k) => strings[k] ?? k, { arete: 3, modes: { duration: "duration" } }).find((r) => r.id === "duration");
assert.deepEqual([durataScelta.modeChosen, durataScelta.modeShown], [true, durataScelta.level === 0], "scelta la lettura: i pallini, e la lettura in piccolo finché non c'è il livello");

// Il lancio: Volgare con testimoni, riuscita dall'8, la Ruota sale di 2, la Quintessenza chiesta scende.
tiro = T.setQuintessence(tiro, 2);
tiro = T.setKind(tiro, "testimoni");
globalThis.__sim.faces = [8, 8, 3, 3, 5, 6, 7, 10, 2];
const message = await S.launchTiro(actor, tiro);
assert.ok(message, "il tiro parte");
const card = message.getFlag("wod5e-mage", ROLL_CARD_FLAG);
const roll = globalThis.__sim.rolls.at(-1);
assert.equal(roll.formula, "6dmcs>7 + 3dpcs>7", "riserva 13 (11 + 2 di Quintessenza) meno 4 = 9 dadi; la Ruota paga prima del tiro (+2): 3 rossi convertiti");
assert.deepEqual([card.pool, card.threshold, card.dice, card.successFrom, card.total], [13, 4, 9, 8, 3]);
assert.equal(card.tiro.power, "");
assert.deepEqual(card.tiro.traits, ["i1"]);
assert.equal(flags["wod5e-mage"].magickBalance.paradox, 1 + 2, "Volgare con testimoni: +2 Paradosso");
assert.equal(flags["wod5e-mage"].magickBalance.quintessence, 4 - 2, "la Quintessenza spesa scende");
assert.equal(flags["wod5e-mage"].lastThreshold, 4);
assert.match(message.flavor, /Occhio di lince \+1/);

// Il tiro di Abilità: Destrezza + Atletica, Difficoltà 2 a mano, riuscita dal 6, niente rossi.
let abilita = T.pickSkill(T.pickAttribute(T.emptyTiro(), "dexterity"), "skill:athletics");
abilita = T.setDifficulty(abilita, 2);
const ctx2 = S.prepareTiroContext(actor, abilita);
assert.deepEqual([ctx2.magick, ctx2.pool, ctx2.difficulty, ctx2.dice, ctx2.manual], [false, 6, 2, 4, true]);
globalThis.__sim.faces = [6, 1, 1, 9];
const m2 = await S.launchTiro(actor, abilita);
const roll2 = globalThis.__sim.rolls.at(-1);
assert.equal(roll2.formula, "4dmcs>5 + 0dpcs>5");
assert.deepEqual([m2.getFlag("wod5e-mage", ROLL_CARD_FLAG).total, m2.getFlag("wod5e-mage", ROLL_CARD_FLAG).skill], [2, true]);

// Senza Difficoltà non si tira (16/9 sera): il riquadro spegne il tasto e lo dice.
const senza = T.pickSkill(T.pickAttribute(T.emptyTiro(), "dexterity"), "skill:athletics");
const ctxSenza = S.prepareTiroContext(actor, senza);
assert.deepEqual([ctxSenza.ready, ctxSenza.needsDifficulty], [false, true]);
assert.deepEqual([ctx2.needsDifficulty, ctx.needsDifficulty], [false, false]);
const primaDelSenza = globalThis.__sim.rolls.length;
assert.equal(await S.launchTiro(actor, senza), null);
assert.equal(globalThis.__sim.rolls.length, primaDelSenza);
// Senza tratti non si tira; con la Magick senza tipo nemmeno.
assert.equal(await S.launchTiro(actor, T.toggleArete(T.emptyTiro())), null);
assert.equal(await S.launchTiro(actor, T.toggleArete(T.pickAttribute(T.emptyTiro(), "dexterity"))), null);
assert.ok(infos.some((m) => m.startsWith("WARN")));
// Il Grimorio nel riquadro (16/9 sera): l'incantesimo scritto entra nel compositore com'è.
flags["wod5e-mage"].grimorio = { s1: { name: "Lama di fuoco", goal: "Una lama", prize: false, magickType: "vulgar", spheres: { forces: 3, prime: 1 }, scopes: { potency: 3 }, traits: [{ field: "attributeTrait", key: "attribute:wits", label: "Prontezza" }, { field: "primaryTrait", key: "skill:athletics", label: "Atletica" }], sort: 0 } };
const spellRows = S.prepareIncantesimiRows(actor, T.emptyTiro(), (k) => strings[k] ?? k);
assert.equal(spellRows.length, 1);
assert.deepEqual([spellRows[0].name, spellRows[0].coda, spellRows[0].chosen], ["Lama di fuoco", "Forze 3, WOD5E_MAGE.Spheres.prime 1", false]);
const sheetFinta = { actor, _tiro: T.emptyTiro(), render: async () => {} };
await S.onTiroIncantesimo.call(sheetFinta, { preventDefault() {} }, { dataset: { row: "s1" } });
const caricato = sheetFinta._tiro;
assert.deepEqual([caricato.arete, caricato.prize, caricato.spheres, caricato.scopes, caricato.attribute, caricato.skill, caricato.kind, caricato.spell], [true, false, ["forces"], { potency: 3 }, "wits", "skill:athletics", "volgare", "s1"], "Primordio non c'è sulla scheda: resta fuori");
assert.equal(S.prepareIncantesimiRows(actor, caricato, (k) => strings[k] ?? k)[0].chosen, true);
// Il verdetto del Narratore (16/9 sera): col Narratore collegato il tiro gli
// arriva sul socket; qui risponde subito alzando la Difficoltà di uno e dando
// un dado: si tira coi suoi numeri e la carta lo dice.
{
  const V = await import(new URL("../../scripts/verdetto-narratore.js", import.meta.url).href);
  const mandati = [];
  strings["WOD5E_MAGE.Verdetto.Note"] = "Narratore: {changes}.";
  strings["WOD5E_MAGE.Verdetto.NoteDifficulty"] = "Difficoltà {before} → {after}";
  strings["WOD5E_MAGE.Verdetto.NoteDice"] = "dadi {dice}";
  globalThis.game.user = { id: "p1" };
  globalThis.game.users = { activeGM: { id: "gm" } };
  globalThis.game.socket = {
    emit: (name, payload) => {
      mandati.push(payload);
      if (payload.type === V.TIPO_RICHIESTA) queueMicrotask(() => V.onSocketVerdetto(V.verdettoTiro(payload, { difficulty: payload.difficulty + 1, dice: 1 })));
    }
  };
  globalThis.__sim.faces = [7, 7, 7, 1];
  const conVerdetto = await S.launchTiro(actor, abilita);
  assert.equal(mandati[0].type, V.TIPO_RICHIESTA);
  assert.deepEqual([mandati[0].pool, mandati[0].difficulty, mandati[0].actorName], [6, 2, "Ianira"]);
  assert.equal(globalThis.__sim.rolls.at(-1).formula, "4dmcs>5 + 0dpcs>5", "riserva 7 meno Difficoltà 3: quattro dadi");
  assert.match(conVerdetto.flavor, /Narratore: Difficoltà 2 → 3 · dadi \+1\./, "la carta dice cosa ha toccato il Narratore");
  assert.equal(conVerdetto.getFlag("wod5e-mage", ROLL_CARD_FLAG).threshold, 3);
  delete globalThis.game.user; delete globalThis.game.users; delete globalThis.game.socket;
}
const ctxSpell = S.prepareTiroContext(actor, caricato);
assert.deepEqual([ctxSpell.magick, ctxSpell.pool, ctxSpell.computed, ctxSpell.ready], [true, 2 + 2, 3, true], "Prontezza 2 + Atletica 2; soglia 3 senza premio");
globalThis.__sim.faces = [9, 2, 4];
const m3 = await S.launchTiro(actor, caricato);
assert.ok(m3, "l'incantesimo caricato tira coi tre tasti (Volgare com'era scritto)");
assert.match(String(globalThis.__sim.rolls.at(-1).options.title), /^Lama di fuoco · Prontezza \+ Atletica$/, "il nome dell'incantesimo dà il titolo al tiro");
assert.match(m3.flavor, /Una lama/, "e l'Obiettivo va in carta");
await S.onTiroIncantesimo.call(sheetFinta, { preventDefault() {} }, { dataset: { row: "s1" } });
assert.equal(sheetFinta._tiro.spell, null, "lo stesso incantesimo cliccato di nuovo si toglie");
await S.onTiroIncantesimo.call(sheetFinta, { preventDefault() {} }, { dataset: { row: "nessuno" } });
assert.deepEqual(sheetFinta._tiro, T.emptyTiro());

console.log("compositore: ok,", globalThis.__sim.messages.length, "messaggi");
