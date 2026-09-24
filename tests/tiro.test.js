import assert from "node:assert/strict";
import {
  bumpDifficulty,
  clearTiro,
  contoTiro,
  DADI_ADJUST_CAP,
  emptyTiro,
  EXTRA_DICE_CAP,
  hasDifficulty,
  isMagick,
  livelloContato,
  loadSpell,
  pickAttribute,
  pickPower,
  pickSkill,
  pickSpecialty,
  pillsOf,
  powerSphere,
  QUINTESSENCE_BASE_CAP,
  quintessenceDice,
  removePill,
  setDadi,
  setDifficulty,
  setExtra,
  setKind,
  setQuintessence,
  setScope,
  TIRO_KINDS,
  tiroSize,
  toggleArete,
  togglePrize,
  toggleSforza,
  toggleSphere,
  toggleTrait
} from "../scripts/tiro.js";

// Lo stato vuoto: niente in catena, difficoltà calcolata, tiro di Abilità.
const vuoto = emptyTiro();
assert.equal(tiroSize(vuoto), 0);
assert.equal(isMagick(vuoto), false);
assert.equal(vuoto.difficulty, null);
assert.deepEqual(TIRO_KINDS, ["accidentale", "volgare", "testimoni"]);

// L'Areté cliccato fa la Magick e accende il premio; un secondo clic spegne tutto.
let tiro = toggleArete(vuoto);
assert.equal(isMagick(tiro), true);
assert.equal(tiro.prize, true);
tiro = togglePrize(tiro);
assert.equal(tiro.prize, false, "il Narratore può dire di no al premio");
tiro = toggleSphere(tiro, "forces");
tiro = setScope(tiro, "potency", 4);
tiro = pickPower(tiro, "forces-1-1");
tiro = setKind(tiro, "volgare");
tiro = toggleArete(tiro);
assert.equal(isMagick(tiro), false);
assert.deepEqual([tiro.spheres, tiro.scopes, tiro.power, tiro.kind, tiro.prize], [[], {}, null, null, false]);

// Una Sfera, un Ambito o un potere in catena accendono l'Areté da soli.
assert.equal(isMagick(toggleSphere(vuoto, "mind")), true);
assert.equal(isMagick(setScope(vuoto, "range", 3)), true);
assert.equal(isMagick(pickPower(vuoto, "mind-2-1")), true);
assert.equal(togglePrize(vuoto).prize, false, "senza Areté il premio non si accende");

// Le Sfere entrano ed escono; l'Ambito si dichiara col numero, lo stesso numero lo toglie.
tiro = toggleSphere(toggleSphere(vuoto, "forces"), "mind");
assert.deepEqual(tiro.spheres, ["forces", "mind"]);
assert.deepEqual(toggleSphere(tiro, "forces").spheres, ["mind"]);
tiro = setScope(setScope(vuoto, "potency", 4), "range", 3);
assert.deepEqual(tiro.scopes, { potency: 4, range: 3 });
assert.deepEqual(setScope(tiro, "range", 3).scopes, { potency: 4 });
assert.deepEqual(setScope(tiro, "range", 5).scopes, { potency: 4, range: 5 });
assert.equal(setScope(vuoto, "targets", 12).scopes.targets, 7, "il livello di un Ambito arriva a 7");
assert.deepEqual(setScope(vuoto, "area", 3).scopes, { targets: 3 }, "l'Area di ieri è il livello dei Bersagli (23/9)");

// L'Attributo e l'Abilità sono uno l'uno; cambiare Abilità azzera la Specializzazione.
tiro = pickAttribute(vuoto, "dexterity");
assert.equal(tiro.attribute, "dexterity");
assert.equal(pickAttribute(tiro, "dexterity").attribute, null);
assert.equal(pickAttribute(tiro, "wits").attribute, "wits");
tiro = pickSpecialty(tiro, "skill:athletics", "parkour");
assert.deepEqual([tiro.skill, tiro.specialty], ["skill:athletics", "parkour"]);
assert.deepEqual([pickSpecialty(tiro, "skill:athletics", "parkour").skill, pickSpecialty(tiro, "skill:athletics", "parkour").specialty], ["skill:athletics", null]);
assert.deepEqual([pickSkill(tiro, "skill:occult").skill, pickSkill(tiro, "skill:occult").specialty], ["skill:occult", null]);
assert.deepEqual([pickSkill(tiro, "skill:athletics").skill, pickSkill(tiro, "skill:athletics").specialty], [null, null]);

// I Tratti sono più d'uno; il potere è uno solo.
tiro = toggleTrait(toggleTrait(vuoto, "pregio-1"), "background-2");
assert.deepEqual(tiro.traits, ["pregio-1", "background-2"]);
assert.deepEqual(toggleTrait(tiro, "pregio-1").traits, ["background-2"]);
tiro = pickPower(vuoto, "forces-1-1");
assert.equal(pickPower(tiro, "forces-2-1").power, "forces-2-1", "un altro potere sostituisce il primo");
assert.equal(pickPower(tiro, "forces-1-1").power, null);
// Il potere porta con sé la sua Sfera (16/9 sera); togliere il potere non la toglie.
assert.deepEqual([powerSphere("forces-2-1"), powerSphere("mind-1-2"), powerSphere("boh"), powerSphere("")], ["forces", "mind", "", ""]);
assert.deepEqual(tiro.spheres, ["forces"]);
assert.deepEqual(pickPower(toggleSphere(vuoto, "forces"), "forces-1-1").spheres, ["forces"], "la Sfera già in catena non si raddoppia");
assert.deepEqual(pickPower(tiro, "forces-1-1").spheres, ["forces"]);
assert.deepEqual(pickPower(toggleSphere(vuoto, "mind"), "forces-3-2").spheres, ["mind", "forces"]);

// Un incantesimo del Grimorio entra tutto insieme (16/9 sera): Areté, le sue
// Sfere (solo quelle possedute), gli Ambiti, Attributo e Abilità, premio e tipo.
const incantesimo = { name: "Lama", prize: true, magickType: "vulgar", spheres: { forces: 3, prime: 2, spirit: 0 }, scopes: { potency: 4, range: 2, duration: 0 }, traits: [{ field: "attributeTrait", key: "attribute:dexterity", label: "Destrezza" }, { field: "primaryTrait", key: "skill:occult", label: "Velo" }] };
tiro = loadSpell(toggleTrait(vuoto, "pregio-1"), "s1", incantesimo, { owned: ["forces", "mind"] });
assert.deepEqual([tiro.arete, tiro.prize, tiro.spheres, tiro.scopes, tiro.attribute, tiro.skill, tiro.kind, tiro.spell, tiro.traits], [true, true, ["forces"], { potency: 4, range: 2 }, "dexterity", "skill:occult", "volgare", "s1", []]);
assert.equal(isMagick(tiro), true);
assert.deepEqual(loadSpell(vuoto, "s2", { ...incantesimo, prize: false, magickType: "", traits: [{ key: "custom:k1", label: "Cucina" }] }).skill, "custom:k1");
assert.deepEqual(loadSpell(vuoto, "s2", { ...incantesimo, magickType: "witnesses" }).kind, "testimoni");
assert.deepEqual(loadSpell(vuoto, "s2", incantesimo).spheres, ["forces", "prime"], "senza l'elenco delle possedute entrano tutte quelle con livello");
// Lo stesso incantesimo cliccato di nuovo si toglie: tutto vuoto.
assert.deepEqual(loadSpell(tiro, "s1", incantesimo), emptyTiro());
// Un pezzo cambiato a mano tiene l'incantesimo caricato; Azzera lo toglie.
assert.equal(toggleSphere(tiro, "mind").spell, "s1");
assert.equal(clearTiro().spell, null);

// La Difficoltà a mano: un numero la fissa, il più e il meno partono dal conto.
assert.equal(setDifficulty(vuoto, 4).difficulty, 4);
assert.equal(setDifficulty(setDifficulty(vuoto, 4), null).difficulty, null);
assert.equal(bumpDifficulty(vuoto, 1, 5).difficulty, 6, "senza numero scritto si parte dal conto");
assert.equal(bumpDifficulty(setDifficulty(vuoto, 2), -1).difficulty, 1);
assert.equal(bumpDifficulty(setDifficulty(vuoto, 0), -1).difficulty, 0, "mai sotto zero");
assert.equal(setQuintessence(vuoto, 3).quintessence, 3);
assert.equal(EXTRA_DICE_CAP, 3);
assert.equal(setExtra(vuoto, 2).extra, 2);
assert.equal(setExtra(vuoto, 9).extra, 3, "i dadi extra si fermano a tre");
assert.equal(setExtra(vuoto, -1).extra, 0);
assert.equal(toggleSforza(vuoto).sforza, true);
assert.equal(setKind(vuoto, "testimoni").kind, "testimoni");
assert.equal(setKind(vuoto, "altro").kind, null);

// La × sulle pillole toglie solo quel pezzo; Azzera svuota tutto.
tiro = pickSpecialty(pickAttribute(setScope(toggleSphere(toggleArete(vuoto), "forces"), "potency", 4), "dexterity"), "skill:occult", "rituali");
tiro = toggleTrait(pickPower(tiro, "forces-1-2"), "pregio-1");
assert.equal(tiroSize(tiro), 8);
assert.equal(removePill(tiro, { kind: "sphere", id: "forces" }).spheres.length, 0);
assert.deepEqual(removePill(tiro, { kind: "scope", id: "potency" }).scopes, {});
assert.equal(removePill(tiro, { kind: "attribute", id: "dexterity" }).attribute, null);
assert.equal(removePill(tiro, { kind: "specialty", id: "rituali", skill: "skill:occult" }).specialty, null);
assert.equal(removePill(tiro, { kind: "specialty", id: "rituali", skill: "skill:occult" }).skill, "skill:occult");
assert.equal(removePill(tiro, { kind: "skill", id: "skill:occult" }).skill, null);
assert.equal(removePill(tiro, { kind: "power", id: "forces-1-2" }).power, null);
assert.deepEqual(removePill(tiro, { kind: "trait", id: "pregio-1" }).traits, []);
assert.equal(isMagick(removePill(tiro, { kind: "arete" })), false);
assert.deepEqual(clearTiro(), emptyTiro());

// La catena a pillole, nell'ordine della scheda, coi nomi e i valori dati.
const names = {
  arete: { label: "Areté", value: 4 },
  spheres: { forces: "Forze" },
  scopes: { potency: "Potenza" },
  attributes: { dexterity: { label: "Destrezza", value: 4 } },
  skills: { "skill:occult": { label: "Velo", value: 5 } },
  power: { "forces-1-2": "Forze 1 · 2" },
  traits: { "pregio-1": { label: "Occhio di lince", value: 1 } }
};
const pills = pillsOf(tiro, names);
assert.deepEqual(pills.map((pill) => pill.kind), ["arete", "sphere", "scope", "attribute", "skill", "specialty", "power", "trait"]);
assert.deepEqual(pills.map((pill) => pill.label), ["Areté", "Forze", "Potenza", "Destrezza", "Velo", "rituali", "Forze 1 · 2", "Occhio di lince"]);
assert.equal(pills[2].level, 4);
assert.equal(pills[3].value, 4);
assert.equal(pills[5].value, 1, "la Specializzazione vale un dado");
assert.equal(pillsOf(vuoto, names).length, 0);
assert.equal(pillsOf(toggleSphere(vuoto, "spirit"), names)[1].label, "spirit", "senza nome resta l'id");

// La Quintessenza: quanta si chiede, quanta c'è, il tetto 2 + Areté.
assert.equal(QUINTESSENCE_BASE_CAP, 2);
assert.equal(quintessenceDice(5, { available: 9, arete: 2 }), 4);
assert.equal(quintessenceDice(5, { available: 3, arete: 5 }), 3);
assert.equal(quintessenceDice(1, { available: 0, arete: 5 }), 0);

// Il conto: la soglia è la SOMMA degli Ambiti (Potenza 4, Portata 3 e
// Bersagli 1 fanno 8: dalla tavola del 23/9 anche il primo livello vale il
// suo numero), le Sfere non contano, l'Areté col premio si sottrae.
let magick = toggleArete(vuoto);
magick = toggleSphere(magick, "forces");
magick = setScope(setScope(setScope(magick, "potency", 4), "range", 3), "targets", 1);
magick = pickSkill(pickAttribute(magick, "dexterity"), "skill:occult");
let conto = contoTiro(magick, { arete: 2, attributeValue: 4, skillValue: 5 });
assert.equal(conto.magick, true);
assert.equal(conto.scopeThreshold, 8);
assert.equal(conto.prize, 2);
assert.equal(conto.computed, 6);
assert.equal(conto.difficulty, 6);
assert.equal(conto.pool, 9);
assert.equal(conto.dice, 3);
assert.equal(conto.successFrom, 6, "Accidentale e Volgare riescono col 6");
assert.equal(conto.manual, false);
assert.equal(conto.impossible, false);

// Il premio spento: la soglia resta piena. L'Ibrida non lo prende mai.
assert.equal(contoTiro(togglePrize(magick), { arete: 2, attributeValue: 4, skillValue: 5 }).difficulty, 8);
assert.equal(contoTiro(magick, { arete: 2, attributeValue: 4, skillValue: 5, form: "ibrida" }).prize, 0);
// L'Areté oltre la soglia la porta a zero, non sotto.
assert.equal(contoTiro(setScope(setScope(magick, "potency", 0), "range", 0), { arete: 5, attributeValue: 4, skillValue: 5 }).difficulty, 0);
assert.equal(contoTiro(setScope(setScope(magick, "potency", 0), "range", 0), { arete: 0, attributeValue: 4, skillValue: 5 }).difficulty, 1, "Bersagli 1 vale uno");

// Volgare con testimoni: si riesce con l'8. I tiri di Abilità restano al 6.
assert.equal(contoTiro(setKind(magick, "testimoni"), { arete: 2 }).successFrom, 8);
assert.equal(contoTiro(setKind(magick, "volgare"), { arete: 2 }).successFrom, 6);
assert.equal(contoTiro(pickSkill(pickAttribute(vuoto, "wits"), "skill:awareness"), { attributeValue: 3, skillValue: 2 }).successFrom, 6);

// Il tiro di Abilità: niente soglia dagli Ambiti, la Difficoltà solo a mano.
const abilita = pickSpecialty(pickAttribute(vuoto, "dexterity"), "skill:athletics", "parkour");
conto = contoTiro(abilita, { attributeValue: 3, skillValue: 2, arete: 4, quintessenceAvailable: 5 });
assert.deepEqual([conto.magick, conto.pool, conto.difficulty, conto.dice, conto.specialtyDice, conto.quintessence], [false, 6, 0, 6, 1, 0]);
conto = contoTiro(setDifficulty(abilita, 4), { attributeValue: 3, skillValue: 2 });
assert.deepEqual([conto.manual, conto.difficulty, conto.dice], [true, 4, 2]);

// Senza Difficoltà il tiro non parte (16/9 sera): l'Abilità la vuole a mano,
// la Magick la prende dagli Ambiti dichiarati (anche a 1) o a mano.
assert.equal(hasDifficulty(abilita), false);
assert.equal(contoTiro(abilita, { attributeValue: 3, skillValue: 2 }).difficultySet, false);
assert.equal(hasDifficulty(setDifficulty(abilita, 0)), true, "uno zero scritto a mano è una Difficoltà");
assert.equal(hasDifficulty(setDifficulty(abilita, null)), false);
assert.equal(hasDifficulty(toggleArete(vuoto)), false);
assert.equal(hasDifficulty(setScope(toggleArete(vuoto), "targets", 1)), true);
assert.equal(hasDifficulty(magick), true);
assert.equal(contoTiro(magick, { arete: 2 }).difficultySet, true);
assert.equal(hasDifficulty(setScope(setScope(setScope(magick, "potency", 0), "range", 0), "targets", 0)), false);

// La Difficoltà scritta a mano sovrascrive il conto, anche nella Magick.
conto = contoTiro(setDifficulty(magick, 9), { arete: 2, attributeValue: 4, skillValue: 5 });
assert.deepEqual([conto.computed, conto.difficulty, conto.dice, conto.impossible], [6, 9, 0, true]);

// La Quintessenza, la Bussola, i dadi extra col tetto +3 e i Tratti per intero entrano nella riserva.
conto = contoTiro(setQuintessence(magick, 9), { arete: 2, attributeValue: 4, skillValue: 5, quintessenceAvailable: 9, bussola: 1, harmony: 5, traitDice: 4 });
assert.equal(conto.quintessence, 4, "tetto 2 + Areté");
assert.equal(conto.bussolaDice, 1);
assert.equal(conto.extra, 3, "l'Armonia data dal programma si ferma a tre");
assert.equal(conto.pool, 9 + 4 + 1 + 3 + 4);
conto = contoTiro(setExtra(magick, 2), { arete: 2, attributeValue: 4, skillValue: 5 });
assert.deepEqual([conto.extra, conto.pool], [2, 11], "i dadi extra della scheda entrano nella riserva");
conto = contoTiro(setExtra(magick, 3), { arete: 2, attributeValue: 4, skillValue: 5, harmony: 2 });
assert.equal(conto.extra, 3, "scheda e Armonia insieme non passano il tetto");

// Un potere con effetti tocca il conto; un segnaposto non fa niente.
const sconto = { id: "forces-2-1", sphere: "forces", dot: 2, slot: 1, name: "Dono della forza", text: "", effects: [{ on: "threshold", value: -1 }] };
conto = contoTiro(pickPower(magick, "forces-2-1"), { arete: 2, attributeValue: 4, skillValue: 5, power: sconto });
assert.deepEqual([conto.computed, conto.difficulty, conto.dice], [5, 5, 4]);
assert.deepEqual(conto.powerNotes, [{ on: "threshold", value: -1, nota: "" }]);
const segnaposto = { id: "forces-1-1", sphere: "forces", dot: 1, slot: 1, name: "", text: "", effects: [] };
conto = contoTiro(pickPower(magick, "forces-1-1"), { arete: 2, attributeValue: 4, skillValue: 5, power: segnaposto });
assert.deepEqual([conto.computed, conto.dice, conto.powerNotes], [6, 3, []]);

// Il ritocco dei Dadi (23/9): sul totale, fuori dal tetto, anche in meno, entro ±10; azzerato da Azzera.
assert.equal(emptyTiro().dadi, 0);
assert.deepEqual([setDadi(magick, 2).dadi, setDadi(magick, -3).dadi, setDadi(magick, 40).dadi, setDadi(magick, -40).dadi], [2, -3, DADI_ADJUST_CAP, -DADI_ADJUST_CAP]);
{
  const base = contoTiro(magick, { arete: 2, attributeValue: 4, skillValue: 5 });
  const piu = contoTiro(setDadi(magick, 2), { arete: 2, attributeValue: 4, skillValue: 5 });
  const meno = contoTiro(setDadi(magick, -2), { arete: 2, attributeValue: 4, skillValue: 5 });
  assert.deepEqual([piu.riserva, piu.pool, piu.dice, piu.adjust], [base.riserva, base.pool + 2, base.dice + 2, 2]);
  assert.deepEqual([meno.riserva, meno.pool, meno.dice, meno.adjust], [base.riserva, base.pool - 2, base.dice - 2, -2]);
  // La riserva mostrata non cambia col ritocco: è Attributo + Abilità + bonus.
  assert.equal(base.riserva, base.pool);
  // Il ritocco non porta la riserva sotto zero.
  assert.equal(contoTiro(setDadi(emptyTiro(), -5), { attributeValue: 1, skillValue: 1 }).pool, 0);
}
// L'incantesimo sta in testa alla catena, e la sua × svuota tutto.
{
  const conSpell = loadSpell(magick, "s1", { name: "Lama di fuoco", spheres: ["forces"], scopes: { potency: 3 } }, { owned: ["forces"] });
  const pills = pillsOf(conSpell, { ...names, spells: { s1: "Lama di fuoco" } });
  assert.deepEqual([pills[0].kind, pills[0].label], ["spell", "Lama di fuoco"]);
  assert.equal(tiroSize(removePill(conSpell, { kind: "spell", id: "s1" })), 0);
}

// Gli effetti dei poteri sul tiro (tappa 3, 24/9).
{
  const numeri = { arete: 2, attributeValue: 4, skillValue: 5 };
  // Una Magick pulita: Areté, Forze, Destrezza e Occulto, senza Ambiti.
  const pulita = pickSkill(pickAttribute(toggleSphere(toggleArete(emptyTiro()), "forces"), "dexterity"), "skill:occult");
  // Un potere che vale nei tiri di Abilità entra senza accendere l'Areté, e resta quando l'Areté si spegne.
  const abilita = pickPower(pickSkill(pickAttribute(emptyTiro(), "dexterity"), "skill:athletics"), "r-mestiere", "mind", { any: true });
  assert.deepEqual([abilita.arete, abilita.spheres, abilita.power, abilita.powerAny], [false, [], "r-mestiere", true]);
  assert.equal(toggleArete(toggleArete(abilita)).power, "r-mestiere", "spento l'Areté il potere resta");
  assert.equal(toggleArete(pickPower(toggleArete(emptyTiro()), "r-x", "forces")).power, null, "un potere della Magick esce con l'Areté");
  assert.deepEqual([pickPower(abilita, "r-mestiere").power, pickPower(abilita, "r-mestiere").powerAny], [null, false]);
  assert.equal(livelloContato(5, 4), 1);
  assert.equal(livelloContato(3, 4), 0);

  // Appoggio: Potenza 5 e Portata 2, la Potenza conta 1 sopra il 4: soglia 3, meno il premio 2.
  const appoggio = { id: "r-appoggio", sphere: "forces", name: "Appoggio", effects: [{ on: "freeScope", scope: "potency", value: 4, nota: "leva" }] };
  const conAppoggio = contoTiro(setScope(setScope(pickPower(pulita, "r-appoggio", "forces"), "potency", 5), "range", 2), { ...numeri, power: appoggio });
  assert.deepEqual([conAppoggio.scopeThreshold, conAppoggio.computed, conAppoggio.powerNotes[0].scope], [7, 1, "potency"]);

  // Voce dell'Avatar: il premio doppio passa il tetto dell'Areté.
  const voce = { id: "r-voce", sphere: "spirit", name: "Voce", effects: [{ mode: "attivo", on: "prizeDouble", nota: "doppio" }] };
  const conVoce = contoTiro(setScope(pickPower(pulita, "r-voce", "spirit"), "potency", 6), { ...numeri, power: voce });
  assert.deepEqual([conVoce.prize, conVoce.computed, conVoce.powerActive], [4, 2, true]);

  // Anche a mani nude: la Quintessenza dà dadi anche nel tiro di Abilità, dentro il tetto 2 + Areté.
  const mani = { id: "r-mani", sphere: "prime", name: "Mani nude", effects: [{ on: "quintessenceOnSkills", roll: "abilita", nota: "punti" }] };
  const conMani = contoTiro(setQuintessence(setDifficulty(pickPower(pickSkill(pickAttribute(emptyTiro(), "dexterity"), "skill:athletics"), "r-mani", "prime", { any: true }), 2), 9), { ...numeri, quintessenceAvailable: 9, power: mani });
  assert.deepEqual([conMani.magick, conMani.quintessenceAllowed, conMani.quintessence, conMani.pool], [false, true, 4, 9 + 4]);
  assert.equal(contoTiro(setQuintessence(setDifficulty(pickSkill(pickAttribute(emptyTiro(), "dexterity"), "skill:athletics"), 2), 9), { ...numeri, quintessenceAvailable: 9 }).quintessence, 0, "senza il potere, niente Quintessenza fuori dalla Magick");

  // Niente al caso: riesce senza tirare con almeno due dadi dopo la soglia; con uno no, e il riquadro dice perché.
  const niente = { id: "r-niente", sphere: "entropy", name: "Niente al caso", effects: [{ mode: "attivo", on: "autoSuccess", roll: "abilita", when: "dadi2", nota: "due dadi" }] };
  const tiroNiente = pickPower(pickSkill(pickAttribute(emptyTiro(), "dexterity"), "skill:athletics"), "r-niente", "entropy", { any: true });
  const nienteOk = contoTiro(setDifficulty(tiroNiente, 7), { ...numeri, power: niente });
  assert.deepEqual([nienteOk.dice, nienteOk.autoSuccess, nienteOk.powerActive], [2, true, true]);
  const nienteNo = contoTiro(setDifficulty(tiroNiente, 8), { ...numeri, power: niente });
  assert.deepEqual([nienteNo.dice, nienteNo.autoSuccess, nienteNo.autoSuccessMotivo], [1, false, "dadi2"]);
  // A zero dadi il tiro è impossibile, salvo che riesca senza tirare.
  const fucile = { id: "r-fucile", sphere: "matter", name: "Fucile", effects: [{ mode: "attivo", on: "autoSuccess", roll: "any", nota: "riesce" }] };
  const conFucile = contoTiro(setDifficulty(pickPower(pickSkill(pickAttribute(emptyTiro(), "dexterity"), "skill:athletics"), "r-fucile", "matter", { any: true }), 12), { ...numeri, power: fucile });
  assert.deepEqual([conFucile.dice, conFucile.autoSuccess, conFucile.impossible], [0, true, false]);

  // Un effetto della Magick scelto in un tiro di Abilità resta fuori, col perché.
  const conFuori = contoTiro(setDifficulty(pickPower(pickSkill(pickAttribute(emptyTiro(), "dexterity"), "skill:athletics"), "r-appoggio", "forces", { any: true }), 3), { ...numeri, power: appoggio });
  assert.deepEqual([conFuori.powerNotes, conFuori.powerSkipped], [[], [{ motivo: "tiro:magick", nota: "leva" }]]);

  // La variante «attivo» arriva nell'id: la riga la spezza, il conto la passa agli effetti.
  const casa = { id: "r-casa", sphere: "forces", name: "Casa", scelta: "potency", effects: [{ on: "freeScope", scope: "scelta", value: { from: "poteri" }, nota: "fino ai poteri" }, { mode: "attivo", on: "freeScope", scope: "scelta", value: 7, nota: "tutto" }] };
  const tiroCasa = setScope(pickPower(pulita, "r-casa", "forces"), "potency", 6);
  assert.equal(contoTiro(tiroCasa, { ...numeri, power: casa, powerCtx: { poteriConti: { forces: 2 } } }).computed, 6 - 2 - 2);
  const tiroCasaAttiva = setScope(pickPower(pulita, "r-casa#attivo", "forces"), "potency", 6);
  const conCasaAttiva = contoTiro(tiroCasaAttiva, { ...numeri, power: casa, powerCtx: { poteriConti: { forces: 2 } } });
  assert.deepEqual([conCasaAttiva.computed, conCasaAttiva.powerActive], [0, true]);
  assert.equal(pillsOf(tiroCasaAttiva, names).find((pill) => pill.kind === "power").id, "r-casa#attivo", "la pillola porta l'id con la variante");
}

console.log("tiro: ok");
