import assert from "node:assert/strict";
import {
  bumpDifficulty,
  clearTiro,
  contoTiro,
  emptyTiro,
  EXTRA_DICE_CAP,
  hasDifficulty,
  isMagick,
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
assert.equal(setScope(vuoto, "area", 12).scopes.area, 7, "il livello di un Ambito arriva a 7");

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

// Il conto: la soglia è la SOMMA degli Ambiti (Potenza 4 e Portata 3 fanno 7),
// gli Ambiti a 1 valgono zero, le Sfere non contano, l'Areté col premio si sottrae.
let magick = toggleArete(vuoto);
magick = toggleSphere(magick, "forces");
magick = setScope(setScope(setScope(magick, "potency", 4), "range", 3), "area", 1);
magick = pickSkill(pickAttribute(magick, "dexterity"), "skill:occult");
let conto = contoTiro(magick, { arete: 2, attributeValue: 4, skillValue: 5 });
assert.equal(conto.magick, true);
assert.equal(conto.scopeThreshold, 7);
assert.equal(conto.prize, 2);
assert.equal(conto.computed, 5);
assert.equal(conto.difficulty, 5);
assert.equal(conto.pool, 9);
assert.equal(conto.dice, 4);
assert.equal(conto.successFrom, 6, "Accidentale e Volgare riescono col 6");
assert.equal(conto.manual, false);
assert.equal(conto.impossible, false);

// Il premio spento: la soglia resta piena. L'Ibrida non lo prende mai.
assert.equal(contoTiro(togglePrize(magick), { arete: 2, attributeValue: 4, skillValue: 5 }).difficulty, 7);
assert.equal(contoTiro(magick, { arete: 2, attributeValue: 4, skillValue: 5, form: "ibrida" }).prize, 0);
// L'Areté oltre la soglia la porta a zero, non sotto.
assert.equal(contoTiro(setScope(setScope(magick, "potency", 0), "range", 0), { arete: 5, attributeValue: 4, skillValue: 5 }).difficulty, 0);

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
assert.equal(hasDifficulty(setScope(toggleArete(vuoto), "area", 1)), true);
assert.equal(hasDifficulty(magick), true);
assert.equal(contoTiro(magick, { arete: 2 }).difficultySet, true);
assert.equal(hasDifficulty(setScope(setScope(setScope(magick, "potency", 0), "range", 0), "area", 0)), false);

// La Difficoltà scritta a mano sovrascrive il conto, anche nella Magick.
conto = contoTiro(setDifficulty(magick, 9), { arete: 2, attributeValue: 4, skillValue: 5 });
assert.deepEqual([conto.computed, conto.difficulty, conto.dice, conto.impossible], [5, 9, 0, true]);

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
assert.deepEqual([conto.computed, conto.difficulty, conto.dice], [4, 4, 5]);
assert.deepEqual(conto.powerNotes, [{ on: "threshold", value: -1 }]);
const segnaposto = { id: "forces-1-1", sphere: "forces", dot: 1, slot: 1, name: "", text: "", effects: [] };
conto = contoTiro(pickPower(magick, "forces-1-1"), { arete: 2, attributeValue: 4, skillValue: 5, power: segnaposto });
assert.deepEqual([conto.computed, conto.dice, conto.powerNotes], [5, 4, []]);

console.log("tiro: ok");
