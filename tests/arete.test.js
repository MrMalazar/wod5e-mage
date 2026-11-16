import assert from "node:assert/strict";
import {
  bonusDiceExcess,
  calculateAretePrize,
  calculateAreteTraitPool,
  calculateMagickThreshold,
  SCOPE_COUNTS_FROM,
  capBonusDice,
  getArete,
  normalizeMagickRollOptions,
  prepareAreteTraits
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

// Il premio vale l'Areté intera: la soglia scende di tanto (il Sistema);
// non guarda il Tipo di Magick: dal 2/10 lo prende anche l'Ibrida.
assert.equal(calculateAretePrize(2), 2);
assert.equal(calculateAretePrize(5), 5);
assert.equal(calculateAretePrize(0), 0);
assert.equal(calculateAretePrize(-1), 0);
assert.equal(calculateAretePrize.length, 1, "il premio non ha più il Tipo fra gli argomenti");
assert.equal(capBonusDice(5), 3);
assert.equal(capBonusDice(-1), 0);

// Il tetto +3 conta Armonia e modificatori positivi insieme;
// i negativi non c'entrano.
assert.equal(bonusDiceExcess(3, []), 0);
assert.equal(bonusDiceExcess(2, [{ value: "+2" }, { value: "-1" }]), 1);
assert.equal(bonusDiceExcess(0, [{ value: 1 }, { value: 1 }]), 0);
assert.equal(bonusDiceExcess(3, [{ value: "+3" }]), 3);

// La somma dei livelli degli Ambiti: era la soglia dei lanci fino alla 1.40.0, e
// resta per il prezzo degli effetti della Scheda del Paradosso del Narratore.
// Lo 0 è la base gratis e ogni livello dal primo in su vale il suo numero.
assert.equal(SCOPE_COUNTS_FROM, 1, "il primo pallino conta (tavola del 23/9)");
assert.equal(calculateMagickThreshold(), 0);
assert.equal(calculateMagickThreshold({ sphereLevels: [3] }), 0);
assert.equal(calculateMagickThreshold({ sphereLevels: [3], scopeLevels: [4] }), 4);
assert.equal(calculateMagickThreshold({ sphereLevels: [3], scopeLevels: [4, 2] }), 6);
assert.equal(calculateMagickThreshold({ sphereLevels: [3, 2], scopeLevels: [1] }), 1);
assert.equal(calculateMagickThreshold({ sphereLevels: [3, 2, 1], scopeLevels: [1] }), 1);
// Il livello del singolo Ambito arriva a 7, ma la somma non ha tetto.
assert.equal(calculateMagickThreshold({ sphereLevels: [5, 4, 4], scopeLevels: [7, 7, 7] }), 21);
assert.equal(calculateMagickThreshold({ sphereLevels: [5, 4, 4], scopeLevels: [7] }), 7);
// Un Ambito a 1 vale uno.
assert.equal(calculateMagickThreshold({ sphereLevels: [5], scopeLevels: [7, 1] }), 8);
assert.equal(calculateMagickThreshold({ sphereLevels: [2], scopeLevels: [1, 1] }), 2);
assert.equal(calculateMagickThreshold({ sphereLevels: [2], scopeLevels: [2, 1] }), 3);
assert.equal(calculateMagickThreshold({ sphereLevels: [2], scopeLevels: [2, 2] }), 4);
assert.equal(calculateMagickThreshold({ sphereLevels: [], scopeLevels: [1] }), 1);
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
// La soglia è la somma degli Ambiti e basta: il premio non la tocca più (Blue, 27/9).
assert.equal(calculateMagickThreshold({ scopeLevels: [1, 2, 4] }), 7);
assert.equal(calculateMagickThreshold({ scopeLevels: [1, 2, 4], prize: 3 }), 7, "il premio non entra nella soglia");
assert.equal(calculateMagickThreshold({ scopeLevels: [1, 2] }), 3);
assert.equal(calculateMagickThreshold({ scopeLevels: [1, 1] }), 2);
assert.equal(calculateMagickThreshold({ scopeLevels: ["1", "2", "4"] }), 7);
assert.equal(calculateMagickThreshold({ scopeLevels: [] }), 0);
// La Specialità dell'Ambito è uscita (il Sistema): dava dadi quanto l'Areté, e
// l'Areté nella riserva non entra. La riserva della finestra è caduta col tiro
// della finestra: col Sistema si lancia dal riquadro del Tiro.
{
  const mod = await import("../scripts/arete.js");
  assert.equal(mod.calculateAutomaticSuccesses, undefined);
  assert.equal(mod.ramoCPool, undefined);
  assert.equal(mod.tipoDallaFinestra, undefined);
  assert.equal(typeof mod.caricaDalGrimorio, "function");
}

// Il Volgare fallito non rende più Quintessenza (14/9, ribadito il 29/9): la funzione non c'è più.

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
  // La finestra scrive soltanto: Armonia, «Paga con» e Bussola li conta il riquadro del Tiro.
  assert.doesNotMatch(dialog, /name="harmony"|name="pagaCon"|bussolaHtml/);
  assert.match(dialog, /Arete\.Other"[\s\S]*name="maintained"[\s\S]*name="prize"/);
  // La seconda Abilità non c'è più: al suo posto la Specializzazione come casella (+1).
  assert.match(dialog, /name="primaryTrait"[\s\S]*data-specialties="\{\{trait\.specialties\}\}"[\s\S]*<input type="checkbox" name="skillSpecialty">[\s\S]*data-role="specialtyNames"/);
  assert.doesNotMatch(dialog, /<select id="wod5e-mage-arete-secondary"/);
  const arete = readFileSync(new URL("../scripts/arete.js", import.meta.url), "utf8");
  assert.doesNotMatch(arete, /grantBussolaQuintessence|bussolaKept|rollAreteWithParadox|costoLancio|pagamentoDelLancio/, "la finestra non tira più");
  // La conferma dei tiri di Abilità porta lo stesso blocco.
  const confirm = readFileSync(new URL("../templates/dialogs/arete-roll-confirm.hbs", import.meta.url), "utf8");
  assert.match(confirm, /\{\{\{bussolaHtml\}\}\}/);
  assert.match(readFileSync(new URL("../scripts/paradox-dice.js", import.meta.url), "utf8"), /getCustomModifierTotal\(form\) \+ bussolaDice\(form\)/);
  // Lanciare passa dal riquadro (il Sistema): il modo «roll» carica l'incantesimo nel Tiro della prima pagina.
  assert.match(arete, /if \(mode !== "save"\) return caricaDalGrimorio\(actor, preset\);/);
  assert.match(arete, /const id = spell\.formula \? `formula:\$\{spell\.formula\}` : `grimorio:\$\{spell\.sharedId \?\? spell\.name \?\? ""\}`;\s*await caricaNelTiro\(sheet, id, spell\);/);
  assert.match(arete, /export async function onAreteRoll[\s\S]*return caricaDalGrimorio\(this\.actor\);/);
  // Il conto vivo: la soglia degli Ambiti contata col Sistema, col premio che la abbassa; niente sottrazione.
  assert.match(arete, /const soglia = sogliaMagick\(\{ ambiti: readDotRows\(root, "scope"\), arete: areteValue, premio \}\)\.soglia;/);
  assert.doesNotMatch(arete, /isAutomaticVictory|isOneStepShort|postAutomaticVictory/);
  const dialog2 = readFileSync(new URL("../templates/dialogs/arete-roll.hbs", import.meta.url), "utf8");
  assert.match(dialog2, /data-role="pool">0<\/strong> · <\/span>[\s\S]*data-role="threshold">0<\/strong>/);
  assert.doesNotMatch(dialog2, /data-role="dice"|RamoC\.Dice/);
  assert.match(dialog2, /wod5e-mage-arete-toggle-value">−\{\{prize\.dice\}\}<\/span>/, "il premio abbassa la soglia");
  assert.doesNotMatch(dialog2, /autoVictory|buySuccess|Compra\./);
  assert.doesNotMatch(arete, /buySuccess|spend\.bought|Compra\./);
  assert.match(readFileSync(new URL("../scripts/salute.js", import.meta.url), "utf8"), /-=convinzioneScena/);
}

console.log("Areté tests passed.");
