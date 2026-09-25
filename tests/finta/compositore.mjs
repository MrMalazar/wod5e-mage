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
// Senza una lettura scelta (21/9) la Potenza, che ne ha due, non stampa nessuna lettura: solo il numero.
assert.deepEqual([rows.find((r) => r.id === "potency").reading, rows.find((r) => r.id === "potency").steps[3].tip], ["", "4"]);
// Ma lo 0 legge sempre (Blue, 26/9 sera: «Bersagli 0 dirà 1 Bersaglio»): senza
// lente scelta, la base di ogni lente col suo nome; il sorvolo parte da «0 · ».
const potenzaZero = rows.find((r) => r.id === "potency").zero;
assert.match(potenzaZero.reading, /Table\.potencyWeight\.0/);
assert.match(potenzaZero.reading, /Sub\.potencyDamage: /, "la lente dei Danni col suo nome");
assert.ok(potenzaZero.reading.includes(" · "), "le due lenti, separate");
assert.ok(potenzaZero.tip.startsWith(`0 · ${potenzaZero.reading}`));
// La lettura («lente») dell'Ambito (16/9 sera; tavola del 23/9: due lenti l'uno): la prima della tavola, o quella scelta col tastino.
const potenza = rows.find((r) => r.id === "potency");
assert.deepEqual([potenza.mode, potenza.modeCount, potenza.modeLabel, potenza.nextModeLabel], ["potencyDamage", 2, "WOD5E_MAGE.Scopes.Sub.potencyDamage", "WOD5E_MAGE.Scopes.Sub.potencyWeight"]);
assert.equal(potenza.reading, "", "nessuna lettura scelta: niente testo");
const potenzaPeso = S.prepareScopeRows(tiro, (k) => strings[k] ?? k, { arete: 3, modes: { potency: "potencyWeight" } }).find((r) => r.id === "potency");
assert.match(potenzaPeso.reading, /Table\.potencyWeight\.4/);
assert.match(potenzaPeso.steps[3].tip, /^4 · .*Table\.potencyWeight\.4/);
// I pallini partono dall'1: lo 0 è la base (23/9), e la riga a riposo la legge.
const portataRiposo = S.prepareScopeRows(T.emptyTiro(), (k) => strings[k] ?? k, { arete: 3, modes: { range: "range" } }).find((r) => r.id === "range");
assert.deepEqual([portataRiposo.level, portataRiposo.reading, portataRiposo.steps.length, portataRiposo.steps[0].value], [0, "WOD5E_MAGE.Scopes.Table.range.0", 7, 1]);
// Lo 0 è il primo pallino (Blue, 26/9): fisso, con la lettura della base nel sorvolo; i sette dopo restano quelli.
assert.deepEqual([portataRiposo.zero.value, portataRiposo.zero.reading, portataRiposo.zero.tip.startsWith("0 · ")], [0, "WOD5E_MAGE.Scopes.Table.range.0", true]);
assert.equal(rows.every((r) => r.modeCount === 2), true, "ogni Ambito ha due lenti (23/9)");
const conDanni = S.prepareScopeRows(tiro, (k) => strings[k] ?? k, { arete: 3, modes: { potency: "potencyDamage", targets: "boh" } }).find((r) => r.id === "potency");
assert.deepEqual([conDanni.mode, conDanni.nextModeLabel], ["potencyDamage", "WOD5E_MAGE.Scopes.Sub.potencyWeight"], "dai Danni si passa al Peso");
assert.equal(conDanni.reading, "Areté WOD5E_MAGE.Scopes.Table.potencyDamage.4", "i Danni: l'Areté più il numero del quarto pallino (la finta traduce solo Areté)");
// Il tastino: chi possiede scrive la bandiera; la scheda rilegge la bandiera.
const sheetModi = { actor, _tiro: T.emptyTiro(), render: async () => {} };
await S.onScopeMode.call(sheetModi, { preventDefault() {} }, { dataset: { scope: "potency" } });
assert.equal(flags["wod5e-mage"].scopeModes.potency, "potencyWeight");
await S.onScopeMode.call(sheetModi, { preventDefault() {} }, { dataset: { scope: "potency" } });
assert.equal(flags["wod5e-mage"].scopeModes.potency, "potencyDamage");
assert.deepEqual(S.scopeModesOf(sheetModi), { potency: "potencyDamage" });
await S.onScopeMode.call(sheetModi, { preventDefault() {} }, { dataset: { scope: "boh" } });
assert.equal(flags["wod5e-mage"].scopeModes.boh, undefined, "un Ambito che non c'è non scrive niente");
// La tendina delle letture (20/9 sera): la lettura chiesta per nome, e la riga sa se è scelta.
await S.onScopeMode.call(sheetModi, { preventDefault() {} }, { dataset: { scope: "potency", mode: "potencyWeight" } });
assert.equal(flags["wod5e-mage"].scopeModes.potency, "potencyWeight", "dalla tendina arriva la lettura chiesta");
await S.onScopeMode.call(sheetModi, { preventDefault() {} }, { dataset: { scope: "potency", mode: "boh" } });
assert.equal(flags["wod5e-mage"].scopeModes.potency, "potencyWeight", "una lettura che non esiste non cambia niente");
const righeTendina = S.prepareScopeRows(tiro, (k) => strings[k] ?? k, { arete: 3, modes: { potency: "potencyWeight" } });
const potenzaTendina = righeTendina.find((r) => r.id === "potency");
assert.deepEqual([potenzaTendina.multi, potenzaTendina.modeChosen, potenzaTendina.modes.map((m) => m.id), potenzaTendina.modes.find((m) => m.selected).id], [true, true, ["potencyDamage", "potencyWeight"], "potencyWeight"]);
const durataTendina = righeTendina.find((r) => r.id === "duration");
assert.deepEqual([durataTendina.multi, durataTendina.modeChosen, durataTendina.modeShown, durataTendina.steps.length, durataTendina.steps[2].tip, durataTendina.steps[2].reading, durataTendina.modes.some((m) => m.selected)], [true, false, false, 7, "3", "", false], "più letture, nessuna scelta (21/9): i pallini ci sono lo stesso, col solo numero, e nessuna pastiglia accesa");
assert.equal(potenzaTendina.steps[3].tip.startsWith("4 · "), true, "con la lettura il tooltip dice livello e lettura");
const durataScelta = S.prepareScopeRows(tiro, (k) => strings[k] ?? k, { arete: 3, modes: { duration: "duration" } }).find((r) => r.id === "duration");
assert.deepEqual([durataScelta.modeChosen, durataScelta.modeShown], [true, durataScelta.level === 0], "scelta la lettura: i pallini, e la lettura in piccolo finché non c'è il livello");
// Tre Ambiti per lancio (23/9): il quarto pallino cliccato non si accende, e la scheda avvisa.
{
  const tre = T.setScope(T.setScope(T.setScope(T.toggleArete(T.emptyTiro()), "potency", 1), "range", 1), "duration", 1);
  const sheetTre = { actor, _tiro: tre, render: async () => {} };
  const primaWarn = infos.length;
  await S.onTiroScope.call(sheetTre, { preventDefault() {} }, { dataset: { scope: "targets", level: "2" } });
  assert.deepEqual([sheetTre._tiro.scopes.targets, infos.length - primaWarn, infos.at(-1)], [undefined, 1, "WARN WOD5E_MAGE.Tiro.ScopeCapWarning"]);
  await S.onTiroScope.call(sheetTre, { preventDefault() {} }, { dataset: { scope: "range", level: "4" } });
  assert.equal(sheetTre._tiro.scopes.range, 4, "un Ambito già alzato si alza ancora");
  await S.onTiroScope.call(sheetTre, { preventDefault() {} }, { dataset: { scope: "range", level: "4" } });
  assert.equal(sheetTre._tiro.scopes.range, undefined, "lo stesso pallino lo toglie");
  await S.onTiroScope.call(sheetTre, { preventDefault() {} }, { dataset: { scope: "targets", level: "2" } });
  assert.equal(sheetTre._tiro.scopes.targets, 2, "tolto uno, il posto si libera");
}

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
assert.deepEqual([spellRows[0].name, spellRows[0].coda, spellRows[0].chosen], ["Lama di fuoco", "Forze, WOD5E_MAGE.Spheres.prime", false]);
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

// Gli effetti dei poteri sul tiro (tappa 3, 24/9), coi poteri del catalogo.
{
  strings["WOD5E_MAGE.Tiro.PotereNote.dice"] = "{name}: {value} dadi";
  strings["WOD5E_MAGE.Tiro.PotereNote.freeScope"] = "{name}: {scope} non conta fino a {value}";
  strings["WOD5E_MAGE.Tiro.PotereEscluso.dadi2"] = "servono due dadi";
  strings["WOD5E_MAGE.Tiro.RiesceSenzaTirare"] = "Riesce senza tirare: {name}";
  strings["WOD5E_MAGE.Poteri.Tipo.attivo"] = "attivo";
  strings["WOD5E_MAGE.Poteri.Usi.scena"] = "per scena";
  strings["WOD5E_MAGE.Poteri.UsiFiniti"] = "usi finiti";
  flags["wod5e-mage"].poteri.pmest = { sphere: "mind", name: "Mestiere", dot: 0, type: "attivo", source: "catalogo", catalogId: "mestiere", scelta: "skill:athletics" };
  flags["wod5e-mage"].poteri.pniente = { sphere: "forces", name: "Niente al caso", dot: 0, type: "attivo", source: "catalogo", catalogId: "niente-al-caso", uses: { per: "scena", n: 1 } };
  flags["wod5e-mage"].poteri.pcasa = { sphere: "forces", name: "Ambito di Casa", dot: 0, type: "attivo", source: "catalogo", catalogId: "ambito-di-casa", costValue: 4, scelta: "potency" };
  flags["wod5e-mage"].poteri.pappoggio = { sphere: "forces", name: "Appoggio", dot: 0, type: "attivo", source: "catalogo", catalogId: "appoggio", costValue: 2 };
  delete flags["wod5e-mage"].poteriUsi;
  flags["wod5e-mage"].magickBalance = { quintessence: 6, paradox: 1 };

  // La tendina: Mestiere vale fuori dalla Magick; Ambito di casa ha la riga «· attivo» col costo.
  const righe = S.preparePoteriRows(actor, T.emptyTiro(), (k) => strings[k] ?? k);
  const mestiereRiga = righe.find((r) => r.id === "pmest");
  assert.deepEqual([mestiereRiga.any, mestiereRiga.roll, mestiereRiga.variant], [true, "abilita", ""]);
  const casaAttiva = righe.find((r) => r.id === "pcasa#attivo");
  assert.deepEqual([casaAttiva.any, casaAttiva.attivo, casaAttiva.label, casaAttiva.nota, casaAttiva.hint, casaAttiva.ok], [false, true, "Ambito di Casa · attivo", "4 WOD5E_MAGE.Poteri.QuintessenzaBreve", "4 WOD5E_MAGE.Poteri.QuintessenzaBreve", true]);
  assert.deepEqual([righe.find((r) => r.id === "pcasa").attivo, righe.find((r) => r.id === "pappoggio#attivo")], [false, undefined], "Appoggio non ha attivi sul tiro: una riga sola");

  // Mestiere in un tiro di Abilità: Forze e Mente sono le Sfere conosciute, due dadi in più su Atletica.
  const sheetPotere = { actor, _tiro: T.setDifficulty(T.pickSkill(T.pickAttribute(T.emptyTiro(), "dexterity"), "skill:athletics"), 2), render: async () => {} };
  await S.onTiroPower.call(sheetPotere, { preventDefault() {} }, { dataset: { power: "pmest", sphere: "mind", any: "true" } });
  const conMestiere = sheetPotere._tiro;
  assert.deepEqual([conMestiere.arete, conMestiere.power, conMestiere.powerAny], [false, "pmest", true], "niente Areté: resta un tiro di Abilità");
  const ctxMestiere = S.prepareTiroContext(actor, conMestiere);
  assert.deepEqual([ctxMestiere.magick, ctxMestiere.pool, ctxMestiere.dice, ctxMestiere.potere.note], [false, 6 + 2, 6, ["Mestiere: +2 dadi · Quando tiri quell'Abilità non a scopo di Magick ottieni un dado in più per ogni tua Sfera di cui riesci a giustificare l'utilizzo, fino a 3."]]);
  globalThis.__sim.faces = [6, 6, 6, 6, 6, 6];
  const mMestiere = await S.launchTiro(actor, conMestiere);
  assert.equal(globalThis.__sim.rolls.at(-1).formula, "6dmcs>5 + 0dpcs>5", "riserva 8 meno Difficoltà 2");
  assert.match(mMestiere.flavor, /Mestiere: \+2 dadi/);
  assert.match(mMestiere.flavor, /\+2/, "i dadi del potere stanno nel numero della carta");
  assert.equal(mMestiere.getFlag("wod5e-mage", ROLL_CARD_FLAG).tiro.power, "pmest");

  // Niente al caso: riesce senza tirare con due dadi; l'uso per scena si conta, e il secondo non parte.
  const tiroNiente = T.pickPower(T.setDifficulty(T.pickSkill(T.pickAttribute(T.emptyTiro(), "dexterity"), "skill:athletics"), 4), "pniente", "forces", { any: true });
  const ctxNiente = S.prepareTiroContext(actor, tiroNiente);
  assert.deepEqual([ctxNiente.dice, ctxNiente.potere.autoSuccess, ctxNiente.potere.active], [2, true, true]);
  const primaDiNiente = globalThis.__sim.rolls.length;
  const mNiente = await S.launchTiro(actor, tiroNiente);
  assert.equal(globalThis.__sim.rolls.length, primaDiNiente, "nessun dado tirato");
  assert.match(mNiente.content, /Riesce senza tirare: Niente al caso/);
  assert.deepEqual([mNiente.getFlag("wod5e-mage", ROLL_CARD_FLAG).total, mNiente.getFlag("wod5e-mage", ROLL_CARD_FLAG).bought], [1, true]);
  assert.deepEqual(flags["wod5e-mage"].poteriUsi, { pniente: { scena: 1 } }, "l'uso si conta");
  assert.equal(await S.launchTiro(actor, tiroNiente), null, "una volta per scena");
  assert.equal(infos.at(-1), "WARN usi finiti");
  // Con un dado solo dopo la soglia non riesce: si tira come sempre.
  const ctxNienteNo = S.prepareTiroContext(actor, T.setDifficulty(tiroNiente, 5));
  assert.deepEqual([ctxNienteNo.dice, ctxNienteNo.potere.autoSuccess, ctxNienteNo.potere.autoSuccessMotivo], [1, false, "servono due dadi"]);

  // Appoggio nella Magick: Potenza 5 conta 1 sopra il 4, meno il premio 3: soglia 0.
  const tiroAppoggio = T.setScope(T.pickPower(T.pickSkill(T.pickAttribute(T.toggleArete(T.emptyTiro()), "dexterity"), "skill:occult"), "pappoggio", "forces"), "potency", 5);
  const ctxAppoggio = S.prepareTiroContext(actor, tiroAppoggio);
  assert.deepEqual([ctxAppoggio.magick, ctxAppoggio.computed, ctxAppoggio.prize.value, ctxAppoggio.potere.note[0]], [true, 0, 3, "Appoggio: Potenza non conta fino a 4 · Il punteggio dell'Ambito di Potenza non conta sino al 4° pallino quando la tua Sfera trova la sua leva già in scena"]);

  // Ambito di casa attivo: paga 4 Quintessenza (la Ruota ne ha 2: la riga lo sa, e il lancio non parte).
  flags["wod5e-mage"].magickBalance = { quintessence: 2, paradox: 1 };
  const righePovere = S.preparePoteriRows(actor, T.emptyTiro(), (k) => strings[k] ?? k);
  assert.deepEqual([righePovere.find((r) => r.id === "pcasa#attivo").ok, righePovere.find((r) => r.id === "pcasa").ok], [false, true]);
  const tiroCasa = T.setKind(T.setScope(T.pickPower(T.pickSkill(T.pickAttribute(T.toggleArete(T.emptyTiro()), "dexterity"), "skill:occult"), "pcasa#attivo", "forces"), "potency", 6), "accidentale");
  assert.equal(S.prepareTiroContext(actor, tiroCasa).computed, 0, "l'Ambito scelto non conta a nessun livello");
  assert.equal(await S.launchTiro(actor, tiroCasa), null, "senza la Quintessenza del potere non si tira");
  // Con la Quintessenza: il lancio paga il costo del potere oltre ai dadi, e conta niente (nessun limite d'uso).
  flags["wod5e-mage"].magickBalance = { quintessence: 6, paradox: 0 };
  const ctxCasa = S.prepareTiroContext(actor, T.setQuintessence(tiroCasa, 1));
  assert.deepEqual([ctxCasa.quintessence.available, ctxCasa.quintessence.dice, ctxCasa.potere.cost], [2, 1, 4], "in dadi resta quello che avanza dal costo");
  globalThis.__sim.faces = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
  const mCasa = await S.launchTiro(actor, T.setQuintessence(tiroCasa, 1));
  assert.ok(mCasa);
  assert.equal(flags["wod5e-mage"].magickBalance.quintessence, 6 - 4 - 1, "4 del potere e 1 in dadi");
  assert.equal(flags["wod5e-mage"].poteriUsi.pcasa, undefined);
}

// La pagina Magick (poteri-scheda.js) con le righe che chiedono una scelta: la
// tendina dell'Ambito, delle Abilità e degli incantesimi. (Nella 1.7.0 e 1.7.1
// una variabile con lo stesso nome di `scelte` rompeva la pagina: la scheda
// non si apriva più. Blue, 24/9 sera.)
{
  const P = await import(new URL("../../scripts/poteri-scheda.js", import.meta.url).href);
  flags["wod5e-mage"].poteri.ppratica = { sphere: "mind", name: "La Pratica rende Perfetti", dot: 0, type: "attivo", source: "catalogo", catalogId: "la-pratica-rende-perfetti", scelta: "s1" };
  const pagina = P.preparePoteriPagina(actor, { _poteriInModifica: new Set() }, { localize: (k) => strings[k] ?? k, locale: "it" });
  // Una semplice lista (Blue, 24/9 sera): in ordine di nome, col sigillo della Sfera e i tipi.
  const lista = pagina.poteriLista;
  assert.equal(lista.length, pagina.poteriTotale);
  assert.deepEqual(lista.map((p) => p.label), [...lista.map((p) => p.label)].sort((a, b) => a.localeCompare(b, "it")), "in ordine di nome");
  assert.ok(lista.every((p) => p.sphereIcon && p.sphereLabel && p.tipi && typeof p.tipi.attivo === "boolean"), "sigillo e tipi su ogni riga");
  const casaRiga = lista.find((p) => p.catalogId === "ambito-di-casa");
  assert.deepEqual([casaRiga.sphere, casaRiga.tipi], ["forces", { attivo: true, passivo: true }]);
  assert.deepEqual([casaRiga.sceltaCampo.kind, casaRiga.sceltaCampo.options.map((o) => o.value), casaRiga.sceltaCampo.options.find((o) => o.selected)?.value], ["ambito", ["potency", "range"], "potency"]);
  assert.equal(lista.find((p) => p.catalogId === "appoggio").sceltaCampo, null, "Appoggio non chiede niente");
  const mestiereRiga = lista.find((p) => p.catalogId === "mestiere");
  assert.deepEqual([mestiereRiga.sceltaCampo.kind, mestiereRiga.sceltaCampo.options.map((o) => o.value), mestiereRiga.sceltaCampo.options.find((o) => o.selected)?.value], ["abilita", ["skill:athletics", "skill:occult"], "skill:athletics"]);
  const praticaRiga = lista.find((p) => p.catalogId === "la-pratica-rende-perfetti");
  assert.deepEqual([praticaRiga.sceltaCampo.kind, praticaRiga.sceltaCampo.options.map((o) => [o.value, o.label, o.selected])], ["incantesimo", [["s1", "Lama di fuoco", true]]]);
  assert.ok(lista.every((p) => p.options?.pallini?.length === 5), "le tendine dei pallini restano");
  // Le Sfere conosciute con il conto dei poteri; niente quota (25/9: i pallini sono un promemoria).
  const forze = pagina.sfereConosciute.find((s) => s.id === "forces");
  assert.ok(forze && typeof forze.conto === "number" && forze.pieno === undefined);
  assert.equal(forze.conto, lista.filter((p) => p.sphere === "forces").length);
  assert.ok(P.sferePerCatalogo(actor).every((s) => s.id && Array.isArray(s.owned) && s.rating === undefined));
  assert.equal(P.quotaDellaSfera, undefined, "la quota non c'è più");
  // Le due schede della prima pagina (Blue, 25/9): Poteri attivi e Poteri passivi, col testo dell'effetto.
  const filtri = P.preparePoteriFiltri(actor, S.preparePoteriRows(actor, T.emptyTiro(), (k) => strings[k] ?? k), { localize: (k) => strings[k] ?? k, locale: "it" });
  assert.deepEqual(filtri.map((r) => r.name), [...filtri.map((r) => r.name)].sort((a, b) => a.localeCompare(b, "it")), "in ordine di nome");
  const casaAttivo = filtri.find((r) => r.id === "pcasa" && r.kind === "attivi");
  const casaPassivo = filtri.find((r) => r.id === "pcasa" && r.kind === "passivi");
  assert.ok(casaAttivo && casaPassivo, "Ambito di casa sta in tutte e due le schede");
  assert.equal(casaAttivo.pick, "pcasa#attivo", "l'attivo sceglie la riga «· attivo» per il tiro");
  assert.equal(casaPassivo.pick, "pcasa");
  assert.ok(casaAttivo.blocchi.every((b) => b.kind === "attivo") && casaPassivo.blocchi.every((b) => b.kind === "passivo" || b.kind === "amalgama"));
  assert.ok(casaAttivo.search.includes("Ambito di Casa") && casaAttivo.sphereIcon.endsWith("/forces.png"));
  assert.ok(filtri.every((r) => ["attivi", "passivi"].includes(r.kind) && Array.isArray(r.blocchi)));
  delete flags["wod5e-mage"].poteri.ppratica;
}

console.log("compositore: ok,", globalThis.__sim.messages.length, "messaggi");
