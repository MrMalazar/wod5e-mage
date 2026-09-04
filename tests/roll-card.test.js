import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  renderAutoVictoryBanner,
  renderAutoVictoryContent,
  renderRollCard,
  renderRollNote,
  renderRollSymbols,
  rollSymbols,
  rollOutcome
} from "../scripts/roll-card.js";
import { SCOPE_ICONS, SCOPES } from "../scripts/scopes.js";

const it = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8"));
const localize = (key) => key.split(".").reduce((node, part) => node?.[part], it) ?? key;

// Ogni Ambito ha il suo simbolo.
for (const scope of SCOPES) assert.match(SCOPE_ICONS[scope], /^fa-solid fa-/, scope);

// I simboli: premio, Sfere col livello, Ambiti col livello, in quest'ordine.
const symbols = rollSymbols({
  prize: 3,
  spheres: [{ id: "forces", level: 3 }, { id: "life", level: 2 }],
  scopes: [{ id: "potency", level: 2 }, { id: "precision", level: 1 }]
});
assert.deepEqual(symbols.map((symbol) => [symbol.kind, symbol.id, symbol.value]), [
  ["arete", "arete", "+3"],
  ["sphere", "forces", "3"],
  ["sphere", "life", "2"],
  ["scope", "potency", "2"],
  ["scope", "precision", "1"]
]);
assert.match(symbols[1].icon, /assets\/icons\/sheet\/forces\.png$/);
assert.equal(symbols[3].faIcon, SCOPE_ICONS.potency);
assert.deepEqual(rollSymbols({}), []);
assert.equal(renderRollSymbols([]), "");

const symbolsHtml = renderRollSymbols(symbols, localize);
assert.match(symbolsHtml, /^<div class="wod5e-mage-roll-symbols">/);
assert.match(symbolsHtml, /wod5e-mage-roll-symbol-sphere" title="Forze"><img src="[^"]*forces\.png" alt="Forze"><b>3<\/b>/);
assert.match(symbolsHtml, /wod5e-mage-roll-symbol-scope" title="Potenza"><i class="fa-solid fa-burst" aria-hidden="true"><\/i><b>2<\/b>/);
assert.match(symbolsHtml, /wod5e-mage-roll-symbol-arete"[^>]*><img [^>]*arete\.svg[^>]*><b>\+3<\/b>/);

// La scritta grande, in chiaro.
assert.equal(renderAutoVictoryBanner(localize), '<p class="wod5e-mage-roll-victory">Vittoria automatica</p>');

// Il conto: una riga per voce, il nome in oro; i nomi liberi vanno protetti.
const card = renderRollCard({
  traits: [{ label: "Forza", value: 3 }, { label: "Lancio <coltelli>", value: 2 }],
  bonusParts: ["premio 3"],
  threshold: 4,
  magickType: "Accidentale",
  spheres: [{ label: "WOD5E_MAGE.Spheres.forces", level: 3 }],
  scopes: [{ label: "WOD5E_MAGE.Scopes.potency", level: 2 }]
}, localize);
assert.equal(
  card,
  '<div class="wod5e-mage-roll-card">'
  + "<p><b>Riserva</b> Forza 3 + Lancio &lt;coltelli&gt; 2 + premio 3</p>"
  + "<p><b>Soglia</b> 4</p>"
  + "<p><b>Tipologia</b> Accidentale</p>"
  + "<p><b>Sfere Effetto</b> Forze 3</p>"
  + "<p><b>Ambiti</b> Potenza 2</p>"
  + "</div>"
);
assert.doesNotMatch(renderRollCard({ traits: [{ label: "Forza", value: 3 }], threshold: 1, magickType: "x" }), /Sfere|Ambiti/);

// Le note: una riga in corsivo, il Contraccolpo in rosso.
assert.equal(renderRollNote("Tetto +3: 1 dadi in meno."), '<p class="wod5e-mage-roll-note">Tetto +3: 1 dadi in meno.</p>');
assert.match(renderRollNote("CONTRACCOLPO", "backlash"), /wod5e-mage-roll-note wod5e-mage-roll-note-backlash/);

// La vittoria senza dadi: scritta, simboli, conto, note.
const content = renderAutoVictoryContent({ symbols, card, notes: [renderRollNote("nota")] }, localize);
assert.match(content, /^<p class="wod5e-mage-roll-victory">Vittoria automatica<\/p><div class="wod5e-mage-roll-symbols">[\s\S]*<div class="wod5e-mage-roll-card">[\s\S]*<p class="wod5e-mage-roll-note">nota<\/p>$/);

// Il tiro scrive la bandiera e la chat la legge sopra i dadi.
const arete = readFileSync(new URL("../scripts/arete.js", import.meta.url), "utf8");
assert.match(arete, /card: \{ symbols, automatic \}/);
assert.match(arete, /renderAutoVictoryContent/);
assert.doesNotMatch(arete, /Arete\.RollFlavor|Arete\.SpherePlan|Arete\.ScopePlan/);
const paradox = readFileSync(new URL("../scripts/paradox-dice.js", import.meta.url), "utf8");
assert.match(paradox, /\[ROLL_CARD_FLAG\]: card/);
assert.match(paradox, /renderRollNote\(game\.i18n\.format\("WOD5E_MAGE\.Arete\.Backlash"/);
const main = readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8");
assert.match(main, /registerRollCardRendering\(\)/);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8"));
  assert.equal(typeof strings.WOD5E_MAGE.Arete.AutoVictoryBanner, "string", lang);
}

// Il dialogo del tiro: simbolo a sinistra di ogni Sfera e di ogni Ambito,
// i pallini partono dalla stessa colonna, a sinistra.
const dialog = readFileSync(new URL("../templates/dialogs/arete-roll.hbs", import.meta.url), "utf8");
assert.match(dialog, /data-kind="sphere"[^>]*>\s*<img class="wod5e-mage-arete-row-icon" src="\{\{sphere\.icon\}\}"/);
assert.match(dialog, /data-kind="scope"[^>]*>\s*<i class="wod5e-mage-arete-row-icon \{\{scope\.faIcon\}\}"/);
assert.match(dialog, /wod5e-mage-arete-row-label-full">\{\{localize "WOD5E_MAGE\.Arete\.Prize"\}\}/);
const css = readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8");
assert.match(css, /\.wod5e-mage-arete-dots-column\s*\{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*18px max-content minmax\(0, 1fr\);/s);
assert.match(css, /\.wod5e-mage-arete-dotrow\s*\{[^}]*display:\s*contents;/s);
assert.match(css, /\.wod5e-mage-arete-prize,\s*\.wod5e-mage-arete-harmony-row\s*\{[^}]*justify-content:\s*space-between;/s);
assert.match(css, /\.wod5e-mage-roll-victory\s*\{[^}]*text-transform:\s*uppercase;/s);

console.log("Roll card tests passed.");

// Il conto del Mago in chat: totale vero (successi automatici compresi) contro la soglia.
const fmt = (key, data) => `${key.split(".").pop()} ${data.string}`;
assert.deepEqual(rollOutcome(5, 3, fmt), { total: 5, cssClass: "success", text: "SuccessBy 2" });
assert.deepEqual(rollOutcome(2, 3, fmt), { total: 2, cssClass: "failure", text: "FailureBy 1" });
assert.deepEqual(rollOutcome(4, 0, fmt), { total: 4, cssClass: "", text: "" });
assert.match(readFileSync(new URL("../scripts/paradox-dice.js", import.meta.url), "utf8"), /total: roll\._total, difficulty, autoSuccesses/);
