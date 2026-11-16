import assert from "node:assert/strict";
import {
  bumpSoglia,
  clearTiro,
  contoTiro,
  DADI_ADJUST_CAP,
  emptyTiro,
  EXTRA_DICE_CAP,
  hasSoglia,
  isMagick,
  livelloContato,
  loadSpell,
  pickAttribute,
  pickPower,
  pickSkill,
  pickSpecialty,
  pillsOf,
  powerSphere,
  quintessenceDice,
  removePill,
  setDadi,
  setSoglia,
  setExtra,
  setKind,
  setDissonanza,
  setQuintessence,
  setScope,
  TIRO_KINDS,
  tiroSize,
  toggleArete,
  toggleCondizioneTiro,
  togglePrize,
  setIndulgi,
  toggleSphere,
  toggleTrait
} from "../scripts/tiro.js";

// Lo stato vuoto: niente in catena, difficoltà calcolata, tiro di Abilità.
const vuoto = emptyTiro();
assert.equal(tiroSize(vuoto), 0);
assert.equal(isMagick(vuoto), false);
assert.equal(vuoto.soglia, null);
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

// La soglia a mano: un numero la fissa, il più e il meno partono da zero.
// Nell'Abilità è la soglia intera, da 1 a 7; nella Magick è la difficoltà sopra il conto degli Ambiti, e il Narratore la sposta liberamente.
assert.equal(setSoglia(vuoto, 4).soglia, 4);
assert.equal(setSoglia(setSoglia(vuoto, 4), null).soglia, null);
assert.equal(bumpSoglia(vuoto, 1).soglia, 1, "da zero, se non è ancora stata toccata");
assert.equal(bumpSoglia(setSoglia(vuoto, 2), -1).soglia, 1);
assert.equal(bumpSoglia(setSoglia(vuoto, 0), -1).soglia, 1, "nell'Abilità mai sotto 1");
assert.equal(bumpSoglia(toggleArete(vuoto), -1).soglia, -1, "nella Magick abbassa la difficoltà sopra il conto degli Ambiti");
assert.deepEqual([setSoglia(toggleArete(vuoto), 99).soglia, setSoglia(toggleArete(vuoto), -99).soglia], [20, -20], "libera: ±20 è solo il fondo corsa del tasto");
assert.equal(setQuintessence(vuoto, 3).quintessence, 3);
assert.equal(EXTRA_DICE_CAP, 3);
assert.equal(setExtra(vuoto, 2).extra, 2);
assert.equal(setExtra(vuoto, 9).extra, 3, "i dadi extra si fermano a tre");
assert.equal(setExtra(vuoto, -1).extra, 0);
assert.equal(setIndulgi(vuoto, "hubris").indulgi, "hubris", "l'Indulgere (3/10): il lato dichiarato prima del lancio");
assert.equal(setIndulgi(setIndulgi(vuoto, "silenzio"), "").indulgi, "");
assert.equal(vuoto.indulgi, "");
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

// La Quintessenza in dadi (il Sistema; Blue, 15/11): quanta si chiede, quanta c'è, e il posto che
// resta nel tetto dei +3 dopo i dadi extra.
assert.equal(quintessenceDice(5, { available: 9 }), 3);
assert.equal(quintessenceDice(5, { available: 9, extra: 2 }), 1);
assert.equal(quintessenceDice(2, { available: 9 }), 2);
assert.equal(quintessenceDice(5, { available: 1 }), 1);
assert.equal(quintessenceDice(1, { available: 0 }), 0);
assert.equal(quintessenceDice(5, { available: 9, extra: 3 }), 0);

// Il conto (il Sistema, 14/11): si tira tutta la riserva, e la soglia sono i successi che servono.
// La soglia della Magick è l'Ambito più alto, Epicità compresa, più 1 per ogni altro Ambito sopra
// l'Areté: Potenza 4, Portata 3, Bersagli 1 ed Epicità 1 con Areté 2 fanno 4 + 1 (la Portata) = 5.
// Le Sfere non contano; il premio dell'Areté abbassa la soglia di quant'è l'Areté.
let magick = toggleArete(vuoto);
magick = toggleSphere(magick, "forces");
magick = setScope(setScope(setScope(magick, "potency", 4), "range", 3), "targets", 1);
magick = pickSkill(pickAttribute(magick, "dexterity"), "skill:occult");
let conto = contoTiro(magick, { arete: 2, attributeValue: 4, skillValue: 5 });
assert.equal(conto.magick, true);
assert.equal(conto.scopeThreshold, 5);
assert.equal(conto.prize, 2);
assert.equal(conto.computed, 5);
assert.equal(conto.difficulty, 3, "5 del conto, meno il premio 2");
assert.equal(conto.pool, 9, "Destrezza 4 + Occulto 5: il premio non dà più dadi");
assert.equal(conto.dice, 9, "si tira tutta la riserva: la soglia non toglie dadi");
// L'Epicità dichiarata sale al posto dell'1: con Prodigio 4 gli Ambiti sono 4, 4, 3 e 1, cioè 4 + 1 + 1 = 6, e col premio 4.
assert.equal(contoTiro(setScope(magick, "epic", 4), { arete: 2, attributeValue: 4, skillValue: 5 }).difficulty, 4);
assert.equal(contoTiro(togglePrize(setScope(magick, "epic", 4)), { arete: 2, attributeValue: 4, skillValue: 5 }).difficulty, 6);
// Tolta, torna all'1; da sola fa la soglia di un trucco, e il premio non la porta sotto 1.
assert.deepEqual(setScope(setScope(magick, "epic", 4), "epic", 4).scopes, magick.scopes);
assert.equal(contoTiro(setScope(toggleArete(vuoto), "epic", 1), { arete: 1 }).difficulty, 1);
assert.equal(conto.successFrom, 6, "un dado riesce sempre dal 6");
assert.equal(conto.manual, false);
assert.equal(conto.impossible, false);

// Il premio spento: la soglia torna quella del conto, i dadi sono gli stessi.
const senzaPremio = contoTiro(togglePrize(magick), { arete: 2, attributeValue: 4, skillValue: 5 });
assert.deepEqual([senzaPremio.difficulty, senzaPremio.pool, senzaPremio.dice], [5, 9, 9]);
// Il premio acceso vale l'Areté per ogni Tipo di Magick, l'Ibrida compresa (Blue, 2/10).
assert.equal(contoTiro(magick, { arete: 2, attributeValue: 4, skillValue: 5 }).prize, 2);
// Con Areté 5 gli Ambiti a 1 non aggiungono niente: Bersagli 1 ed Epicità 1 fanno 1, e il premio non scende sotto 1.
const oltre = contoTiro(setScope(setScope(magick, "potency", 0), "range", 0), { arete: 5, attributeValue: 4, skillValue: 5 });
assert.deepEqual([oltre.difficulty, oltre.pool, oltre.dice], [1, 9, 9]);
assert.equal(contoTiro(setScope(setScope(magick, "potency", 0), "range", 0), { arete: 0, attributeValue: 4, skillValue: 5 }).difficulty, 2, "senza Areté ogni altro Ambito aggiunge 1");
// Il conto si ferma a 10: sette Ambiti a 7 con Areté 1 darebbero 13.
{
  let enorme = magick;
  for (const id of ["epic", "targets", "conditions", "duration", "range", "potency", "precision"]) enorme = setScope(enorme, id, 7);
  const tetto = contoTiro(togglePrize(enorme), { arete: 1, attributeValue: 4, skillValue: 5 });
  assert.deepEqual([tetto.computed, tetto.difficulty], [10, 10]);
  assert.equal(contoTiro(setSoglia(togglePrize(enorme), 3), { arete: 1 }).difficulty, 10, "nemmeno la difficoltà a mano passa il 10");
}

// Il dado che riusciva dall'8 è uscito dal gioco: coi testimoni si riesce dal 6, come sempre.
assert.equal(contoTiro(setKind(magick, "testimoni"), { arete: 2 }).successFrom, 6);
assert.equal(contoTiro(setKind(magick, "volgare"), { arete: 2 }).successFrom, 6);
assert.equal(contoTiro(pickSkill(pickAttribute(vuoto, "wits"), "skill:awareness"), { attributeValue: 3, skillValue: 2 }).successFrom, 6);

// Il tiro di Abilità: niente soglia dagli Ambiti, la soglia solo a mano; la Quintessenza non entra.
const abilita = pickSpecialty(pickAttribute(vuoto, "dexterity"), "skill:athletics", "parkour");
conto = contoTiro(abilita, { attributeValue: 3, skillValue: 2, arete: 4, quintessenceAvailable: 5 });
assert.deepEqual([conto.magick, conto.pool, conto.difficulty, conto.dice, conto.specialtyDice, conto.quintessence], [false, 6, 0, 6, 1, 0]);
conto = contoTiro(setSoglia(abilita, 4), { attributeValue: 3, skillValue: 2 });
assert.deepEqual([conto.manual, conto.difficulty, conto.dice], [true, 4, 6], "soglia 4: servono 4 successi, e i dadi restano 6");
// La soglia di un tiro di Abilità va da 1 a 7, mai sotto e mai sopra.
assert.deepEqual([setSoglia(abilita, 0).soglia, setSoglia(abilita, -3).soglia, setSoglia(abilita, 7).soglia, setSoglia(abilita, 12).soglia], [1, 1, 7, 7]);
assert.deepEqual([bumpSoglia(abilita, 1).soglia, bumpSoglia(abilita, -1).soglia, bumpSoglia(setSoglia(abilita, 7), 1).soglia], [1, 1, 7]);

// Senza soglia il tiro non parte (16/9 sera): l'Abilità la vuole a mano,
// la Magick la prende dagli Ambiti dichiarati (anche a 1).
assert.equal(hasSoglia(abilita), false);
assert.equal(contoTiro(abilita, { attributeValue: 3, skillValue: 2 }).difficultySet, false);
assert.equal(hasSoglia(setSoglia(abilita, 0)), true, "toccata, la soglia c'è: parte da 1");
assert.equal(hasSoglia(setSoglia(abilita, null)), false);
// Nella Magick la soglia c'è sempre (2/10): l'Epicità vale almeno 1.
assert.equal(hasSoglia(toggleArete(vuoto)), true);
assert.equal(hasSoglia(setScope(toggleArete(vuoto), "targets", 1)), true);
assert.equal(hasSoglia(magick), true);
assert.equal(contoTiro(magick, { arete: 2 }).difficultySet, true);
assert.equal(hasSoglia(setScope(setScope(setScope(magick, "potency", 0), "range", 0), "targets", 0)), true);
assert.equal(contoTiro(setScope(setScope(setScope(magick, "potency", 0), "range", 0), "targets", 0), { arete: 2 }).difficulty, 1, "a Ambiti tutti a 0 resta l'Epicità");

// La soglia a mano nella Magick è la difficoltà che dà il Narratore, e la sposta liberamente (Blue, 15/11):
// +4 fa 5 + 4 − 2 del premio = 7; in meno non porta la soglia sotto 1, in più non passa il 10.
// Oltre +3 o −3 il conto lo segna (`sogliaManoOltre`), e il riquadro mette il numero in rosso.
conto = contoTiro(setSoglia(magick, 4), { arete: 2, attributeValue: 4, skillValue: 5 });
assert.deepEqual([conto.computed, conto.sogliaMano, conto.difficulty, conto.dice, conto.impossible, conto.sogliaManoOltre, conto.sogliaSenzaMano], [5, 4, 7, 9, false, true, 3]);
assert.deepEqual([3, -3, 4, -4, 0].map((mano) => contoTiro(setSoglia(magick, mano), { arete: 2 }).sogliaManoOltre), [false, false, true, true, false], "il rosso scatta oltre +3 e oltre −3");
assert.deepEqual([setSoglia(magick, -9).soglia, contoTiro(setSoglia(magick, -9), { arete: 2 }).difficulty, contoTiro(setSoglia(magick, -1), { arete: 2 }).difficulty, contoTiro(setSoglia(magick, 15), { arete: 2 }).difficulty], [-9, 1, 2, 10]);
assert.equal(contoTiro(setSoglia(abilita, 7), { attributeValue: 3, skillValue: 2 }).sogliaManoOltre, false, "nei tiri di Abilità non c'è metro: la soglia la dice il Narratore");
assert.equal(contoTiro(magick, { arete: 2 }).sogliaMano, 0, "senza a mano, l'addendo è zero");

// Il tetto dei +3 tiene insieme l'Armonia, i dadi dati al tavolo e la Quintessenza (Blue, 15/11).
// Fuori dal tetto la Bussola e i Vantaggi, che arrivano a 5.
conto = contoTiro(setQuintessence(magick, 9), { arete: 2, attributeValue: 4, skillValue: 5, quintessenceAvailable: 9, bussola: 1, harmony: 5, traitDice: 4 });
assert.equal(conto.quintessenceAllowed, true, "nei lanci di Magick la Quintessenza dà dadi");
assert.equal(conto.extra, 3, "l'Armonia data dal programma si ferma a tre");
assert.equal(conto.quintessence, 0, "il tetto è già pieno: la Quintessenza non entra e non si spende");
assert.equal(conto.bussolaDice, 1);
assert.equal(conto.pool, 9 + 3 + 1 + 4, "l'extra, la Bussola e i Tratti; il premio sta nella soglia");
conto = contoTiro(setQuintessence(magick, 9), { arete: 2, attributeValue: 4, skillValue: 5, quintessenceAvailable: 9, harmony: 1 });
assert.deepEqual([conto.extra, conto.quintessence, conto.pool], [1, 2, 12], "un dado d'Armonia lascia posto a due di Quintessenza");
conto = contoTiro(setQuintessence(magick, 2), { arete: 2, attributeValue: 4, skillValue: 5, quintessenceAvailable: 1 });
assert.deepEqual([conto.quintessence, conto.pool], [1, 10], "non si spende più Quintessenza di quanta ce n'è");
conto = contoTiro(magick, { arete: 2, attributeValue: 4, skillValue: 5, traitDice: 8 });
assert.deepEqual([conto.vantaggi, conto.pool], [5, 14], "i dadi dei Vantaggi arrivano a 5");
conto = contoTiro(magick, { arete: 2, attributeValue: 4, skillValue: 5, traitDice: -6 });
assert.deepEqual([conto.vantaggi, conto.pool], [-6, 3], "in meno non hanno tetto");
// La dissonanza (il Sistema): lanciare non costa più, e nel riquadro resta da dire solo se il
// lancio stride con la realtà intorno. Spenta di partenza; senza valore si gira.
assert.equal(emptyTiro().dissonanza, false);
assert.equal("pay" in emptyTiro(), false, "«paga con» è uscito dal riquadro");
assert.equal(setDissonanza(magick).dissonanza, true);
assert.equal(setDissonanza(setDissonanza(magick)).dissonanza, false);
assert.equal(setDissonanza(setDissonanza(magick), false).dissonanza, false);
assert.equal(setDissonanza(magick, true).dissonanza, true);
conto = contoTiro(setExtra(magick, 2), { arete: 2, attributeValue: 4, skillValue: 5 });
assert.deepEqual([conto.extra, conto.pool], [2, 11], "i dadi extra della scheda entrano nella riserva");
conto = contoTiro(setExtra(magick, 3), { arete: 2, attributeValue: 4, skillValue: 5, harmony: 2 });
assert.equal(conto.extra, 3, "scheda e Armonia insieme non passano il tetto");

// Un potere con effetti tocca il conto; un segnaposto non fa niente. Finché il catalogo non passa al
// Sistema, la soglia che un potere spostava si gira in dadi: lo sconto di 1 è un dado in più.
const sconto = { id: "forces-2-1", sphere: "forces", dot: 2, slot: 1, name: "Dono della forza", text: "", effects: [{ on: "threshold", value: -1 }] };
conto = contoTiro(pickPower(magick, "forces-2-1"), { arete: 2, attributeValue: 4, skillValue: 5, power: sconto });
assert.deepEqual([conto.computed, conto.difficulty, conto.powerDice, conto.dice], [5, 3, 1, 10], "la soglia resta, il potere dà un dado");
assert.deepEqual(conto.powerNotes, [{ on: "threshold", value: -1, nota: "" }]);
const segnaposto = { id: "forces-1-1", sphere: "forces", dot: 1, slot: 1, name: "", text: "", effects: [] };
conto = contoTiro(pickPower(magick, "forces-1-1"), { arete: 2, attributeValue: 4, skillValue: 5, power: segnaposto });
assert.deepEqual([conto.computed, conto.dice, conto.powerNotes], [5, 9, []]);

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
  // Il ritocco non porta la riserva sotto zero, e a zero dadi il tiro non si può fare.
  const zero = contoTiro(setDadi(emptyTiro(), -5), { attributeValue: 1, skillValue: 1 });
  assert.deepEqual([zero.pool, zero.impossible], [0, true]);
}
// L'incantesimo sta in testa alla catena, e la sua × svuota tutto.
{
  const conSpell = loadSpell(magick, "s1", { name: "Lama di fuoco", spheres: ["forces"], scopes: { potency: 3 } }, { owned: ["forces"] });
  const pills = pillsOf(conSpell, { ...names, spells: { s1: "Lama di fuoco" } });
  assert.deepEqual([pills[0].kind, pills[0].label], ["spell", "Lama di fuoco"]);
  assert.equal(tiroSize(removePill(conSpell, { kind: "spell", id: "s1" })), 0);
}

// Gli effetti dei poteri sul tiro (tappa 3, 24/9), letti col conto del Sistema.
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

  // Appoggio: Potenza 5 e Portata 2. Senza il potere il conto è 5 (la Potenza; Portata ed Epicità non passano
  // l'Areté 2). Col potere la Potenza conta 1 sopra il 4: il più alto diventa la Portata, e il conto è 2.
  const appoggio = { id: "r-appoggio", sphere: "forces", name: "Appoggio", effects: [{ on: "freeScope", scope: "potency", value: 4, nota: "leva" }] };
  const conAppoggio = contoTiro(setScope(setScope(pickPower(pulita, "r-appoggio", "forces"), "potency", 5), "range", 2), { ...numeri, power: appoggio });
  assert.deepEqual([conAppoggio.scopeThreshold, conAppoggio.computed, conAppoggio.prize, conAppoggio.powerNotes[0].scope], [5, 2, 2, "potency"]);

  // Voce dell'Avatar: il premio doppio abbassa la soglia del doppio; il conto resta 6 (la Potenza), la soglia 2.
  const voce = { id: "r-voce", sphere: "spirit", name: "Voce", effects: [{ mode: "attivo", on: "prizeDouble", nota: "doppio" }] };
  const conVoce = contoTiro(setScope(pickPower(pulita, "r-voce", "spirit"), "potency", 6), { ...numeri, power: voce });
  assert.deepEqual([conVoce.prize, conVoce.computed, conVoce.difficulty, conVoce.powerActive], [4, 6, 2, true]);

  // Anche a mani nude: la Quintessenza dà dadi anche nel tiro di Abilità, dentro il tetto dei +3.
  const mani = { id: "r-mani", sphere: "prime", name: "Mani nude", effects: [{ on: "quintessenceOnSkills", roll: "abilita", nota: "punti" }] };
  const conMani = contoTiro(setQuintessence(setSoglia(pickPower(pickSkill(pickAttribute(emptyTiro(), "dexterity"), "skill:athletics"), "r-mani", "prime", { any: true }), 2), 9), { ...numeri, quintessenceAvailable: 9, power: mani });
  assert.deepEqual([conMani.magick, conMani.quintessenceAllowed, conMani.quintessence, conMani.pool], [false, true, 3, 9 + 3]);
  assert.equal(contoTiro(setQuintessence(setSoglia(pickSkill(pickAttribute(emptyTiro(), "dexterity"), "skill:athletics"), 2), 9), { ...numeri, quintessenceAvailable: 9 }).quintessence, 0, "senza il potere, niente Quintessenza fuori dalla Magick");

  // Niente al caso: riesce senza tirare se la riserva supera la soglia di almeno due dadi; di uno no, e il riquadro dice perché.
  const niente = { id: "r-niente", sphere: "entropy", name: "Niente al caso", effects: [{ mode: "attivo", on: "autoSuccess", roll: "abilita", when: "dadi2", nota: "due dadi" }] };
  const tiroNiente = setSoglia(pickPower(pickSkill(pickAttribute(emptyTiro(), "dexterity"), "skill:athletics"), "r-niente", "entropy", { any: true }), 3);
  const nienteOk = contoTiro(setDadi(tiroNiente, -4), { ...numeri, power: niente });
  assert.deepEqual([nienteOk.dice, nienteOk.difficulty, nienteOk.autoSuccess, nienteOk.powerActive], [5, 3, true, true]);
  const nienteNo = contoTiro(setDadi(tiroNiente, -5), { ...numeri, power: niente });
  assert.deepEqual([nienteNo.dice, nienteNo.autoSuccess, nienteNo.autoSuccessMotivo], [4, false, "dadi2"]);
  // A zero dadi il tiro è impossibile, salvo che riesca senza tirare.
  const fucile = { id: "r-fucile", sphere: "matter", name: "Fucile", effects: [{ mode: "attivo", on: "autoSuccess", roll: "any", nota: "riesce" }] };
  const conFucile = contoTiro(setDadi(setSoglia(pickPower(pickSkill(pickAttribute(emptyTiro(), "dexterity"), "skill:athletics"), "r-fucile", "matter", { any: true }), 3), -10), { ...numeri, power: fucile });
  assert.deepEqual([conFucile.dice, conFucile.autoSuccess, conFucile.impossible], [0, true, false]);

  // Un effetto della Magick scelto in un tiro di Abilità resta fuori, col perché.
  const conFuori = contoTiro(setSoglia(pickPower(pickSkill(pickAttribute(emptyTiro(), "dexterity"), "skill:athletics"), "r-appoggio", "forces", { any: true }), 3), { ...numeri, power: appoggio });
  assert.deepEqual([conFuori.powerNotes, conFuori.powerSkipped], [[], [{ motivo: "tiro:magick", nota: "leva" }]]);

  // La variante «attivo» arriva nell'id: la riga la spezza, il conto la passa agli effetti.
  const casa = { id: "r-casa", sphere: "forces", name: "Casa", scelta: "potency", effects: [{ on: "freeScope", scope: "scelta", value: { from: "poteri" }, nota: "fino ai poteri" }, { mode: "attivo", on: "freeScope", scope: "scelta", value: 7, nota: "tutto" }] };
  const tiroCasa = setScope(pickPower(pulita, "r-casa", "forces"), "potency", 6);
  assert.equal(contoTiro(tiroCasa, { ...numeri, power: casa, powerCtx: { poteriConti: { forces: 2 } } }).computed, 6 - 2, "la Potenza 6 conta dal 2 in su: 4, e l'Epicità 1 non aggiunge");
  const tiroCasaAttiva = setScope(pickPower(pulita, "r-casa#attivo", "forces"), "potency", 6);
  const conCasaAttiva = contoTiro(tiroCasaAttiva, { ...numeri, power: casa, powerCtx: { poteriConti: { forces: 2 } } });
  assert.deepEqual([conCasaAttiva.computed, conCasaAttiva.powerActive], [1, true], "la Potenza non conta, l'Epicità sì");
  assert.equal(pillsOf(tiroCasaAttiva, names).find((pill) => pill.kind === "power").id, "r-casa#attivo", "la pillola porta l'id con la variante");
}

// Le Condizioni sul tiro (il Sistema): al primo grado 2 dadi in meno (1 le lievi), al secondo la riserva
// dimezzata, per difetto e per ultima; al terzo il tiro fallisce, anche la riuscita senza tirare; un clic le toglie.
{
  const abilita = setSoglia(pickSkill(pickAttribute(emptyTiro(), "dexterity"), "skill:firearms"), 1);
  const senza = contoTiro(abilita, { attributeValue: 3, skillValue: 3 });
  assert.deepEqual([senza.pool, senza.dice, senza.successFrom, senza.fallisce], [6, 6, 6, false]);
  const primo = contoTiro(abilita, { attributeValue: 3, skillValue: 3, condizioni: { dadi: -2, dimezza: false, fallisce: false, perche: [] } });
  assert.deepEqual([primo.riserva, primo.riservaTotale, primo.pool, primo.dice], [6, 4, 4, 4], "Abbagliato: due dadi in meno");
  const secondo = contoTiro(abilita, { attributeValue: 3, skillValue: 3, condizioni: { dadi: 0, dimezza: true, fallisce: false, perche: [] } });
  assert.deepEqual([secondo.pool, secondo.dice, secondo.successFrom], [3, 3, 6], "Offuscato: la riserva dimezzata, e si riesce sempre dal 6");
  assert.equal(contoTiro(abilita, { attributeValue: 3, skillValue: 2, condizioni: { dadi: 0, dimezza: true } }).pool, 2, "cinque dadi dimezzati per difetto");
  const pesano = { dadi: -3, dimezza: true, fallisce: false, perche: [] };
  const con = contoTiro(abilita, { attributeValue: 3, skillValue: 3, condizioni: pesano });
  assert.deepEqual([con.riserva, con.pool, con.dice, con.successFrom, con.impossible], [6, 1, 1, 6, false], "tre dadi in meno, poi la metà di quello che resta");
  assert.deepEqual(con.condizioni, { dadi: -3, dimezza: true, fallisce: false, perche: [], dadiSenza: 6 });
  // Il ritocco entra prima della metà.
  assert.equal(contoTiro(setDadi(abilita, 2), { attributeValue: 3, skillValue: 3, condizioni: pesano }).pool, 2);
  const cieco = contoTiro(abilita, { attributeValue: 3, skillValue: 3, condizioni: { dadi: 0, dimezza: false, fallisce: true, perche: ["Cieco"] } });
  assert.deepEqual([cieco.dice, cieco.impossible, cieco.fallisce, cieco.autoSuccess], [0, true, true, false]);
  assert.deepEqual(cieco.condizioni.perche, ["Cieco"]);
  // Il clic: tolta, rimessa; lo stato vuoto non ne ha, e Azzera le rimette tutte.
  const tolta = toggleCondizioneTiro(abilita, "offuscato");
  assert.deepEqual(tolta.condizioni, { offuscato: false });
  assert.deepEqual(toggleCondizioneTiro(tolta, "offuscato").condizioni, {});
  assert.deepEqual(emptyTiro().condizioni, {});
  assert.deepEqual(clearTiro().condizioni, {});
  assert.deepEqual(pickSkill(tolta, "skill:melee").condizioni, { offuscato: false }, "cambiare tratto non rimette le Condizioni tolte");
}

console.log("tiro: ok");

// Una Formula caricata dalla pagina (26/9) non sta nel Grimorio: viaggia nello stato del tiro.
{
  const formula = { name: "Danneggiare", goal: "In genere…", spheres: { forces: 1 }, scopes: { potency: 3 }, magickType: "", prize: false, traits: [] };
  const caricato = loadSpell(emptyTiro(), "formula:danneggiare", formula, { owned: ["forces"] });
  assert.deepEqual([caricato.spell, caricato.spellData.name, caricato.spheres, caricato.scopes, caricato.arete, caricato.kind], ["formula:danneggiare", "Danneggiare", ["forces"], { potency: 3 }, true, null]);
  assert.equal(emptyTiro().spellData, null);
  assert.equal(removePill(caricato, { kind: "spell", id: "formula:danneggiare" }).spellData, null);
}
