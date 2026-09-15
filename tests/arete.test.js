import assert from "node:assert/strict";
import {
  bonusDiceExcess,
  calculateAretePrize,
  calculateAreteTraitPool,
  calculateAutomaticSuccesses,
  calculateMagickThreshold,
  capBonusDice,
  getArete,
  normalizeMagickRollOptions,
  prepareAreteTraits,
  quintessenceAfterFailedVulgar,
  ramoCPool
} from "../scripts/arete.js";

function actorWithFlag(value) {
  return {
    getFlag: () => value,
    system: {}
  };
}

assert.equal(getArete(actorWithFlag(undefined)).value, 1);
assert.equal(getArete(actorWithFlag({ value: 3 })).value, 3);
assert.equal(getArete(actorWithFlag({ value: 99 })).value, 5);
assert.equal(getArete(actorWithFlag({ value: 0 })).value, 1);

// La riserva del ramo A: due tratti, l'Areté non tira.
assert.equal(calculateAreteTraitPool(4, 2), 6);
assert.equal(calculateAreteTraitPool(1, 0), 1);
// Attributo, Abilità, Abilità: ne basta uno, gli altri si sommano.
assert.equal(calculateAreteTraitPool(3, 2, 2), 7);
assert.equal(calculateAreteTraitPool(3), 3);
assert.equal(calculateAreteTraitPool(), 0);

// Il premio riduce la soglia dell'Areté intera, anche oltre 3; mai all'Ibrida.
assert.equal(calculateAretePrize(2, "magick"), 2);
assert.equal(calculateAretePrize(5, "tecnomagick"), 5);
assert.equal(calculateAretePrize(4, ""), 4);
assert.equal(calculateAretePrize(5, "ibrida"), 0);
assert.equal(capBonusDice(5), 3);
assert.equal(capBonusDice(-1), 0);

// Il tetto +3 conta Armonia e modificatori positivi insieme;
// i negativi non c'entrano.
assert.equal(bonusDiceExcess(3, []), 0);
assert.equal(bonusDiceExcess(2, [{ value: "+2" }, { value: "-1" }]), 1);
assert.equal(bonusDiceExcess(0, [{ value: 1 }, { value: 1 }]), 0);
assert.equal(bonusDiceExcess(3, [{ value: "+3" }]), 3);

// La soglia somma gli Ambiti sopra 1, senza contributo delle Sfere.
assert.equal(calculateMagickThreshold(), 0);
assert.equal(calculateMagickThreshold({ sphereLevels: [3] }), 0);
assert.equal(calculateMagickThreshold({ sphereLevels: [3], scopeLevels: [4] }), 4);
assert.equal(calculateMagickThreshold({ sphereLevels: [3], scopeLevels: [4, 2] }), 6);
assert.equal(calculateMagickThreshold({ sphereLevels: [3, 2], scopeLevels: [1] }), 0);
assert.equal(calculateMagickThreshold({ sphereLevels: [3, 2, 1], scopeLevels: [1] }), 0);
// Il livello del singolo Ambito arriva a 7, ma la somma non ha tetto.
assert.equal(calculateMagickThreshold({ sphereLevels: [5, 4, 4], scopeLevels: [7, 7, 7] }), 21);
assert.equal(calculateMagickThreshold({ sphereLevels: [5, 4, 4], scopeLevels: [7] }), 7);
// Un Ambito a 1 non contribuisce alla somma.
assert.equal(calculateMagickThreshold({ sphereLevels: [5], scopeLevels: [7, 1] }), 7);
assert.equal(calculateMagickThreshold({ sphereLevels: [2], scopeLevels: [1, 1] }), 0);
assert.equal(calculateMagickThreshold({ sphereLevels: [2], scopeLevels: [2, 1] }), 2);
assert.equal(calculateMagickThreshold({ sphereLevels: [2], scopeLevels: [2, 2] }), 4);
assert.equal(calculateMagickThreshold({ sphereLevels: [], scopeLevels: [1] }), 0);
// Un livello di Ambito fuori scala si riporta fra 0 e 7: lo zero non conta.
assert.equal(calculateMagickThreshold({ sphereLevels: [1], scopeLevels: [0] }), 0);
assert.equal(calculateMagickThreshold({ sphereLevels: [1], scopeLevels: [9] }), 7);

// Le Specialità non toccano più la soglia (verdetto di Blue, 4/9 notte):
// Mente 3 con Bersagli 4 e Portata 4 fa 8, con o senza Specialità.
assert.equal(calculateMagickThreshold({
  sphereLevels: [{ id: "mind", level: 3 }],
  scopeLevels: [{ id: "targets", level: 4 }, { id: "range", level: 4 }],
  specialties: { mind: "targets" }
}), 8);
// Il premio si sottrae una volta sola, senza far diventare negativa la soglia.
assert.equal(calculateMagickThreshold({ scopeLevels: [1, 2, 4], prize: 3 }), 3);
assert.equal(calculateMagickThreshold({ scopeLevels: [1, 2, 4], prize: 0 }), 6);
assert.equal(calculateMagickThreshold({ scopeLevels: [1, 2, 4], prize: 5 }), 1);
assert.equal(calculateMagickThreshold({ scopeLevels: [1, 2], prize: 5 }), 0);
assert.equal(calculateMagickThreshold({ scopeLevels: [1, 1], prize: 3 }), 0);
assert.equal(calculateMagickThreshold({ scopeLevels: ["1", "2", "4"], prize: "3" }), 3);
assert.equal(calculateMagickThreshold({ scopeLevels: [2, 4], prize: calculateAretePrize(5, "ibrida") }), 6);
// Nel ramo C danno DADI pari all'Areté (PROPOSTA dell'11/9) quando la
// Sfera è nel lancio e l'Ambito è dichiarato; una volta sola; senza la
// coppia, niente. Il conto torna col nome di prima.
assert.deepEqual(calculateAutomaticSuccesses({
  sphereLevels: [{ id: "forces", level: 3 }],
  scopeLevels: [{ id: "power", level: 7 }],
  specialties: { forces: "power" },
  arete: 2
}), { successes: 2, pairs: [{ sphere: "forces", scope: "power" }] });
assert.deepEqual(calculateAutomaticSuccesses({
  sphereLevels: [{ id: "forces", level: 3 }, { id: "mind", level: 2 }],
  scopeLevels: [{ id: "power", level: 7 }, { id: "targets", level: 2 }],
  specialties: { forces: "power", mind: "targets" },
  arete: 3
}).successes, 3);
assert.equal(calculateAutomaticSuccesses({ sphereLevels: [{ id: "forces", level: 3 }], scopeLevels: [{ id: "range", level: 2 }], specialties: { forces: "power" }, arete: 2 }).successes, 0);
assert.equal(calculateAutomaticSuccesses({ sphereLevels: [{ id: "mind", level: 3 }], scopeLevels: [{ id: "power", level: 2 }], specialties: { forces: "power" }, arete: 2 }).successes, 0);
assert.equal(calculateAutomaticSuccesses({ sphereLevels: [{ id: "forces", level: 3 }], scopeLevels: [{ id: "power", level: 2 }], specialties: { forces: "power" }, arete: 0 }).successes, 0);

// La riserva del ramo C (11/9): tratti, dadi in più col tetto, dadi delle
// Specialità, Quintessenza sotto il prezzo; meno la soglia, restano i dadi.
// L'esempio dello studio: Intelligenza 3 e Occulto 3, Forze 3 con Potenza 3.
assert.deepEqual(ramoCPool({ traits: 6, threshold: 3 }), { pool: 6, threshold: 3, dice: 3, spend: { spent: 0, price: 0, bought: false, dice: 0 } });
// Soglia 5: un dado. Soglia 7: zero dadi, si lancia solo col premio.
assert.equal(ramoCPool({ traits: 6, threshold: 5 }).dice, 1);
assert.equal(ramoCPool({ traits: 6, threshold: 7 }).dice, 0);
assert.equal(ramoCPool({ traits: 6, bonus: 2, threshold: 7 }).dice, 1, "l'Armonia aggiunge dadi");
// Il premio cambia la soglia, non la riserva; non consuma il tetto dei bonus
// e non crea dadi aggiuntivi quando la soglia è già zero.
const rewarded = ramoCPool({
  traits: 6, bonus: 3,
  threshold: calculateMagickThreshold({ scopeLevels: [1, 2, 4], prize: 3 })
});
assert.deepEqual([rewarded.pool, rewarded.threshold, rewarded.dice], [9, 3, 6]);
const zeroThreshold = ramoCPool({
  traits: 6,
  threshold: calculateMagickThreshold({ scopeLevels: [1], prize: 5 })
});
assert.deepEqual([zeroThreshold.pool, zeroThreshold.threshold, zeroThreshold.dice], [6, 0, 6]);
assert.equal(ramoCPool({ traits: 6, bonus: 5, threshold: 0 }).pool, 9, "tetto +3 sui dadi in più");
// La Quintessenza: un dado per punto sotto il prezzo; al prezzo della Sfera compra la riuscita.
assert.deepEqual(ramoCPool({ traits: 6, quintessence: 2, sphereMax: 3, threshold: 3 }).spend, { spent: 2, price: 3, bought: false, dice: 2 });
assert.equal(ramoCPool({ traits: 6, quintessence: 2, sphereMax: 3, threshold: 3 }).dice, 5);
const bought = ramoCPool({ traits: 6, quintessence: 3, sphereMax: 3, threshold: 3 });
assert.equal(bought.spend.bought, true);
assert.equal(bought.dice, 3, "comprata: i punti non sono dadi");
assert.equal(ramoCPool({ traits: 2, specialtyDice: 2, threshold: 3 }).dice, 1, "i dadi della Specialità");

// Il Volgare fallito (11/9): un punto di Quintessenza sale sulla Ruota, come col +.
assert.deepEqual(quintessenceAfterFailedVulgar({ quintessence: 2, paradox: 3, floor: 0 }), { quintessence: 3, paradox: 3, gained: true });
assert.deepEqual(quintessenceAfterFailedVulgar({ quintessence: 4, paradox: 5, floor: 0 }), { quintessence: 4, paradox: 4, gained: true }, "Ruota piena: prima si libera una cella dal Paradosso");
assert.deepEqual(quintessenceAfterFailedVulgar({ quintessence: 4, paradox: 5, floor: 5 }), { quintessence: 4, paradox: 5, gained: false }, "mai sotto il pavimento");

// Il premio e l'Armonia entrano solo se il giocatore li dichiara.
assert.deepEqual(normalizeMagickRollOptions(), {
  usePrize: false,
  harmony: 0,
  coincidental: false,
  vulgar: false,
  witnesses: false
});
assert.equal(normalizeMagickRollOptions({ prize: "on" }).usePrize, true);
assert.equal(normalizeMagickRollOptions({ prize: true }).usePrize, true);
assert.equal(normalizeMagickRollOptions({ prize: "false" }).usePrize, false);
assert.equal(normalizeMagickRollOptions({ harmony: "2" }).harmony, 2);
assert.equal(normalizeMagickRollOptions({ harmony: 5 }).harmony, 5);
assert.equal(normalizeMagickRollOptions({ harmony: 40 }).harmony, 9);
assert.equal(normalizeMagickRollOptions({ harmony: -3 }).harmony, 0);

assert.deepEqual(normalizeMagickRollOptions({ vulgar: false, witnesses: true }), {
  usePrize: false,
  harmony: 0,
  coincidental: false,
  vulgar: false,
  witnesses: true
});

// Il tipo di Magick è una scelta sola: vince sempre la più grave.
assert.deepEqual(normalizeMagickRollOptions({
  coincidental: true,
  vulgar: true,
  witnesses: false
}), {
  usePrize: false,
  harmony: 0,
  coincidental: false,
  vulgar: true,
  witnesses: false
});
assert.deepEqual(normalizeMagickRollOptions({
  coincidental: true,
  vulgar: true,
  witnesses: true
}), {
  usePrize: false,
  harmony: 0,
  coincidental: false,
  vulgar: false,
  witnesses: true
});

const traits = prepareAreteTraits({
  system: {
    sortedAttributes: {
      custom: [{ id: "focus", displayName: "Focus", value: 4 }]
    },
    sortedSkills: {
      custom: [
        { id: "occult", displayName: "Ritual", value: 2 },
        { id: "melee", displayName: "Melee", value: 5 }
      ]
    }
  }
});

assert.deepEqual(traits.attributes[0], {
  key: "attribute:focus",
  id: "focus",
  type: "attribute",
  category: "custom",
  label: "Focus",
  value: 4
});
// Il Velo prende il nome dal lang (11/9): senza i18n resta la chiave.
assert.deepEqual(traits.skills[0], {
  key: "skill:occult",
  id: "occult",
  type: "skill",
  label: "WOD5E_MAGE.Skills.Veil",
  value: 2
});
// Mischia (melee) è una chiave assorbita dall'11/9: non entra nel tiro.
assert.equal(traits.skills.some((trait) => trait.id === "melee"), false);


// Rispetta la Bussola? (11/9, al posto della Convinzione del 9/9): Ambizione, Desiderio e
// Convinzioni in tendina, la scelta, +1 dado e +1 Quintessenza una volta per scena.
{
  const { readFileSync } = await import("node:fs");
  const { CONVICTION_SCENE_FLAG, SKILL_SPECIALTY_DICE, skillSpecialtyNames } = await import("../scripts/arete.js");
  const { BUSSOLA_DICE, BUSSOLA_SCENE_FLAG, bussolaChoice, prepareBussolaChoice, quintessenceAfterBussola, renderBussolaBlock, readBussola, bussolaDice } = await import("../scripts/bussola.js");
  const flags = {
    convinzioni: {
      a1: { group: "verita", text: " Mai mentire a chi si fida di me. ", serve: "", cross: "" },
      a2: { group: "illusione", text: "Da un sogno si esce.", serve: "", cross: "" },
      a3: { group: "", text: "   ", serve: "", cross: "" }
    }
  };
  const actor = { getFlag: (_m, key) => flags[key], system: { headers: { ambition: " Salvare il faro ", desire: "" } } };
  const choice = prepareBussolaChoice(actor);
  assert.deepEqual(choice.options.map((option) => [option.id, option.kind, option.label]), [
    ["ambizione", "ambizione", "WOD5E_MAGE.Bussola.Ambition: Salvare il faro"],
    ["convinzione:a1", "convinzione", "WOD5E_MAGE.Bussola.Conviction (WOD5E_MAGE.Personaggio.ConvictionGroups.verita): Mai mentire a chi si fida di me."],
    ["convinzione:a2", "convinzione", "WOD5E_MAGE.Bussola.Conviction (WOD5E_MAGE.Focus.Credos.illusione): Da un sogno si esce."]
  ]);
  assert.equal(choice.used, false);
  assert.equal(BUSSOLA_SCENE_FLAG, "convinzioneScena");
  assert.equal(CONVICTION_SCENE_FLAG, BUSSOLA_SCENE_FLAG, "il Cambio Scena riarma lo stesso flag");
  assert.equal(BUSSOLA_DICE, 1);
  assert.equal(SKILL_SPECIALTY_DICE, 1);
  assert.deepEqual(bussolaChoice({ bussola: true, bussolaId: "convinzione:a2" }, choice).id, "convinzione:a2");
  assert.equal(bussolaChoice({ bussola: false, bussolaId: "ambizione" }, choice), null);
  assert.equal(bussolaChoice({ bussola: "on", bussolaId: "nope" }, choice), null);
  flags.convinzioneScena = { used: true, label: "x" };
  const used = prepareBussolaChoice(actor);
  assert.equal(used.used, true);
  assert.equal(bussolaChoice({ bussola: true, bussolaId: "ambizione" }, used), null, "una volta per scena");
  assert.deepEqual(quintessenceAfterBussola({ quintessence: 3, paradox: 2, floor: 2 }), { quintessence: 4, gained: true });
  assert.deepEqual(quintessenceAfterBussola({ quintessence: 7, paradox: 2, floor: 0 }), { quintessence: 7, gained: false }, "le celle sono in comune col Paradosso: la Ruota è piena");
  assert.deepEqual(quintessenceAfterBussola({ quintessence: 9, paradox: 0, floor: 0 }), { quintessence: 9, gained: false });
  // Il blocco della finestra: casella, tendina nascosta, riga «già usata» col tasto.
  const block = renderBussolaBlock(choice, (k) => k);
  assert.match(block, /<input type="checkbox" name="bussola" id="wod5e-mage-bussola">[\s\S]*<select name="bussolaId" id="wod5e-mage-bussola-id" class="hidden"[\s\S]*<option value="convinzione:a1">[\s\S]*data-role="bussolaReset"/);
  assert.match(renderBussolaBlock({ options: [], used: false }, (k) => k), /WOD5E_MAGE\.Bussola\.None/);
  assert.equal(bussolaDice({ querySelector: () => ({ checked: true }) }), 1);
  assert.equal(bussolaDice({ querySelector: () => ({ checked: false }) }), 0);
  assert.equal(readBussola({ querySelector: (sel) => sel.includes("bussolaId") ? { value: "ambizione" } : { checked: true } }, choice).id, "ambizione");
  // Le Specializzazioni sulle opzioni della tendina dell'Abilità.
  assert.deepEqual(skillSpecialtyNames({ system: { skills: { brawl: { bonuses: [{ source: "Lame" }, { source: " Lotta " }] }, occult: { bonuses: [] } } } }), { brawl: ["Lame", "Lotta"] });
  const dialog = readFileSync(new URL("../templates/dialogs/arete-roll.hbs", import.meta.url), "utf8");
    // Dal 10/9 notte: Armonia e Quintessenza coi numeri, poi Altro con la Convinzione.
  assert.match(dialog, /name="harmony"[\s\S]*name="quintessence"[\s\S]*Arete\.Other"[\s\S]*\{\{\{bussolaHtml\}\}\}[\s\S]*\{\{\/unless\}\}/);
  // La seconda Abilità non c'è più: al suo posto la Specializzazione come casella (+1).
  assert.match(dialog, /name="primaryTrait"[\s\S]*data-specialties="\{\{trait\.specialties\}\}"[\s\S]*<input type="checkbox" name="skillSpecialty">[\s\S]*data-role="specialtyNames"/);
  assert.doesNotMatch(dialog, /<select id="wod5e-mage-arete-secondary"/);
  const arete = readFileSync(new URL("../scripts/arete.js", import.meta.url), "utf8");
  assert.equal((arete.match(/await grantBussolaQuintessence\(actor, bussolaKept\);/g) ?? []).length, 1, "a tiro fatto (ramo C: un'uscita sola)");
  assert.match(arete, /const extraDice = specialtyDie \+ \(bussolaKept \? BUSSOLA_DICE : 0\);/);
  // La conferma dei tiri di Abilità porta lo stesso blocco.
  const confirm = readFileSync(new URL("../templates/dialogs/arete-roll-confirm.hbs", import.meta.url), "utf8");
  assert.match(confirm, /\{\{\{bussolaHtml\}\}\}/);
  assert.match(readFileSync(new URL("../scripts/paradox-dice.js", import.meta.url), "utf8"), /getCustomModifierTotal\(form\) \+ bussolaDice\(form\)/);
  // Il ramo C in arete.js: la riserva meno la soglia, la riuscita comprata, il Volgare fallito.
  assert.match(arete, /rollAreteWithParadox\(\{\s*pool: conto\.pool,\s*threshold,/);
  assert.match(arete, /effect\.vulgar && Number\.isFinite\(total\) && total < 1/);
  assert.doesNotMatch(arete, /isAutomaticVictory|isOneStepShort|postAutomaticVictory/);
  const dialog2 = readFileSync(new URL("../templates/dialogs/arete-roll.hbs", import.meta.url), "utf8");
  assert.match(dialog2, /data-role="pool">0<\/strong> − <\/span>[\s\S]*data-role="threshold">0<\/strong>[\s\S]*data-role="dice">0<\/strong>/);
  assert.match(dialog2, /data-role="autoVictory">\{\{localize "WOD5E_MAGE\.RamoC\.Bought"\}\}/);
  assert.match(readFileSync(new URL("../scripts/salute.js", import.meta.url), "utf8"), /-=convinzioneScena/);
}

console.log("Areté tests passed.");
