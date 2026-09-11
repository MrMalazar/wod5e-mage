import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  renderBacklashNote,
  renderAutoVictoryBanner,
  renderAutoVictoryContent,
  renderRollCard,
  renderRollNote,
  renderRollSymbols,
  renderRollTitle,
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

// La fila dei simboli (per i messaggi di prima della 0.86.0): nome e livello nel titolo.
const symbolsHtml = renderRollSymbols(symbols, localize);
assert.match(symbolsHtml, /^<div class="wod5e-mage-roll-symbols">/);
assert.match(symbolsHtml, /wod5e-mage-roll-symbol-sphere" title="Forze 3"><img src="[^"]*forces\.png" alt="Forze"><b>3<\/b>/);
assert.match(symbolsHtml, /wod5e-mage-roll-symbol-scope" title="Potenza 2"><i class="fa-solid fa-burst" aria-hidden="true"><\/i><b>2<\/b>/);
assert.match(symbolsHtml, /wod5e-mage-roll-symbol-arete"[^>]*><img [^>]*arete\.svg[^>]*><b>\+3<\/b>/);

// La scritta grande, in chiaro.
assert.equal(renderAutoVictoryBanner(localize), '<p class="wod5e-mage-roll-victory">Vittoria automatica</p>');

// La testata (10/9 notte): «Tiro di», poi il sigillo di ogni tratto col nome sotto, separati dal più.
const title = renderRollTitle([
  { id: "intelligence", type: "attribute", label: "Intelligenza", value: 3 },
  { id: "investigation", type: "skill", label: "Investigare", value: 2 },
  { id: "x1", type: "custom", label: "Lancio <coltelli>", value: 1 }
], localize);
assert.match(title, /^<span class="wod5e-mage-roll-of">Tiro di<\/span><span class="wod5e-mage-roll-traits">/);
assert.match(title, /<span class="wod5e-mage-roll-trait" title="Intelligenza 3"><img src="modules\/wod5e-mage\/assets\/icons\/sheet\/tratti\/intelligence\.svg" alt=""><small>Intelligenza<\/small><\/span><span class="wod5e-mage-roll-plus">\+<\/span><span class="wod5e-mage-roll-trait" title="Investigare 2"><img src="[^"]*investigation\.svg" alt=""><small>Investigare<\/small><\/span>/);
assert.match(title, /<span class="wod5e-mage-roll-plus">\+<\/span><span class="wod5e-mage-roll-trait" title="Lancio &lt;coltelli&gt; 1"><i class="fa-solid fa-circle-dot" aria-hidden="true"><\/i><small>Lancio &lt;coltelli&gt;<\/small><\/span><\/span>$/);
assert.equal((title.match(/wod5e-mage-roll-plus/g) ?? []).length, 2);

// Le righe (10/9 notte): Obiettivo, Sfere coi glifi, Ambiti coi simboli, Soglia, Tipo, Effetto, Riserva; i nomi liberi protetti.
const card = renderRollCard({
  traits: [{ label: "Forza", value: 3 }, { label: "Lancio <coltelli>", value: 2 }],
  bonusParts: ["premio 3"],
  threshold: 4,
  magickType: "Accidentale",
  goal: "Ferire con un'onda <d'urto>",
  effectKind: "WOD5E_MAGE.Arete.EffectKinds.physical",
  spheres: [{ id: "forces", label: "WOD5E_MAGE.Spheres.forces", level: 3 }],
  scopes: [{ id: "potency", label: "WOD5E_MAGE.Scopes.potency", level: 2 }]
}, localize);
const row = (key, label, body) => `<div class="wod5e-mage-roll-row wod5e-mage-roll-row-${key}"><b class="wod5e-mage-roll-key">${label}</b><span class="wod5e-mage-roll-value">${body}</span></div>`;
assert.equal(
  card,
  '<div class="wod5e-mage-roll-card">'
  + row("goal", "Obiettivo", "Ferire con un'onda &lt;d'urto&gt;")
  + row("spheres", "Sfere", '<span class="wod5e-mage-roll-symbol wod5e-mage-roll-symbol-sphere" title="Forze 3"><img src="modules/wod5e-mage/assets/icons/sheet/forces.png" alt="Forze"><b>3</b></span>')
  + row("scopes", "Ambiti", '<span class="wod5e-mage-roll-symbol wod5e-mage-roll-symbol-scope" title="Potenza 2"><i class="fa-solid fa-burst" aria-hidden="true"></i><b>2</b></span>')
  + row("threshold", "Soglia", "4")
  + row("type", "Tipo", "Accidentale")
  + row("effect", "Effetto", "Fisico")
  + row("pool", "Riserva", "Forza 3 + Lancio &lt;coltelli&gt; 2 + premio 3")
  + "</div>"
);
assert.doesNotMatch(renderRollCard({ traits: [{ label: "Forza", value: 3 }], threshold: 1, magickType: "x" }), /Sfere|Ambiti|Obiettivo|Effetto/);

// Le note: una riga in corsivo, il Contraccolpo in rosso.
assert.equal(renderRollNote("Tetto +3: 1 dadi in meno."), '<p class="wod5e-mage-roll-note">Tetto +3: 1 dadi in meno.</p>');
assert.match(renderRollNote("CONTRACCOLPO", "backlash"), /wod5e-mage-roll-note wod5e-mage-roll-note-backlash/);

// La vittoria senza dadi: scritta, conto (coi glifi nelle righe), note; niente fila di simboli in più.
const content = renderAutoVictoryContent({ symbols, card, notes: [renderRollNote("nota")] }, localize);
assert.match(content, /^<p class="wod5e-mage-roll-victory">Vittoria automatica<\/p><div class="wod5e-mage-roll-card">[\s\S]*<p class="wod5e-mage-roll-note">nota<\/p>$/);
assert.doesNotMatch(content, /wod5e-mage-roll-symbols/);

// Il tiro scrive la bandiera (coi tratti per la testata e l'Areté per la vittoria a un prezzo) e la chat la legge.
const arete = readFileSync(new URL("../scripts/arete.js", import.meta.url), "utf8");
assert.match(arete, /card: \{ symbols, traits: selectedTraits\.map\(\(trait\) => \(\{ id: trait\.id, type: trait\.type, label: trait\.label, value: trait\.value \}\)\), vulgar: effect\.vulgar \}/);
assert.match(arete, /spheres: sphereEntries\.map\(\(entry\) => \(\{ id: entry\.id, label:/);
// Nel ramo C la riuscita senza dadi (comprata) la scrive paradox-dice.js con la stessa scritta grande.
assert.doesNotMatch(arete, /renderAutoVictoryContent/);
assert.match(readFileSync(new URL("../scripts/paradox-dice.js", import.meta.url), "utf8"), /renderAutoVictoryBanner\(localize, banner\)/);
assert.equal(renderAutoVictoryBanner(localize, "Riuscita comprata"), '<p class="wod5e-mage-roll-victory">Riuscita comprata</p>');
assert.doesNotMatch(arete, /Arete\.RollFlavor|Arete\.SpherePlan|Arete\.ScopePlan/);
const paradox = readFileSync(new URL("../scripts/paradox-dice.js", import.meta.url), "utf8");
assert.match(paradox, /\[ROLL_CARD_FLAG\]: card/);
assert.match(paradox, /effectKind: effectKind \?\? "",\s*arete,/);
assert.doesNotMatch(paradox, /isOneStepShort|Arete\.OneStep/);
// Il Contraccolpo in una riga sola (10/9 sera): il nome in rosso, il testo in chiaro; l'Ustione scritta una volta.
assert.match(paradox, /renderBacklashNote\(localize\(onlyParadox \? "WOD5E_MAGE\.Burst\.Label" : "WOD5E_MAGE\.Arete\.BacklashLabel"\), `\$\{eyesText\}\.`\)/);
assert.doesNotMatch(paradox, /Arete\.Backlash"/);
assert.match(renderBacklashNote("Contraccolpo", "un occhio sui rossi: Ustione 5"), /^<p class="wod5e-mage-roll-note wod5e-mage-roll-note-backlash"><b class="wod5e-mage-roll-backlash-label">Contraccolpo<\/b> <span class="wod5e-mage-roll-backlash-text">un occhio sui rossi: Ustione 5<\/span><\/p>$/);
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
// Il conto (10/9): la casella col suo +N a sinistra, il nome a destra.
assert.match(dialog, /name="prize"[^>]*>\s*<span class="wod5e-mage-arete-toggle-value">\+\{\{prize\.dice\}\}<\/span>\s*<\/span>\s*<span class="wod5e-mage-arete-row-label">\{\{localize "WOD5E_MAGE\.Arete\.Prize"\}\}/);
assert.doesNotMatch(dialog, /wod5e-mage-arete-row-label-full/);
const css = readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8");
assert.match(css, /\.wod5e-mage-arete-dots-column\s*\{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*18px max-content max-content minmax\(0, 1fr\);/s);
assert.match(css, /\.wod5e-mage-arete-dotrow\s*\{[^}]*display:\s*contents;/s);
assert.match(css, /\.wod5e-mage-arete-body \.wod5e-mage-arete-conto-row\s*\{[^}]*grid-template-columns: 4rem minmax\(0, 1fr\);/s);
// Le Sfere in oro come gli Ambiti; l'Obiettivo sul fondo scuro; i titoli nell'oro, le voci in bianco sporco d'arancio (10/9 notte).
assert.match(css, /\.wod5e-mage-arete-body img\.wod5e-mage-arete-row-icon\s*\{[^}]*filter: brightness\(0\) invert\(93%\)/s);
assert.match(css, /\.wod5e-mage-arete-body \.wod5e-mage-arete-goal-box > textarea,[^{]*\{[^}]*background: var\(--mage-incavo, #15130f\);/s);
assert.match(css, /\.wod5e-mage-arete-body\s*\{[^}]*color: var\(--mage-oro, #d9a827\);/s);
assert.match(css, /\.wod5e-mage-arete-body\s*\{\s*--mage-arete-voce: #f3e4c8;\s*\}/);
assert.match(css, /\.wod5e-mage-arete-body hr\.wod5e-mage-arete-rule\s*\{[^}]*grid-column: 1 \/ -1;/s);
assert.doesNotMatch(css.slice(css.indexOf("Il dialogo dell'Areté riletto con Blue")), /--mage-oro-chiaro/);
assert.match(css, /\.wod5e-mage-roll-victory\s*\{[^}]*text-transform:\s*uppercase;/s);
// La carta: le righe in griglia, la fascia gialla, la fila dei tasti.
assert.match(css, /\.wod5e-mage-roll-card\s*\{[^}]*grid-template-columns: max-content minmax\(0, 1fr\);/s);
assert.match(css, /\.wod5e-mage-roll-row\s*\{\s*display: contents;/);
assert.match(css, /\.chat-message \.roll-result-label\.failure\.wod5e-mage-roll-open\s*\{[^}]*background-color: #c99a1e;/s);
assert.match(css, /\.wod5e-mage-roll-actions > \.wod5e-mage-roll-action\s*\{/);
assert.doesNotMatch(css, /\.wod5e-mage-volonta > button|\.wod5e-mage-sforzo > button|wod5e-mage-volonta-aggravato|roll-note-onestep/);

console.log("Roll card tests passed.");

// Il conto del Mago in chat: totale vero (successi automatici compresi) contro la soglia,
// e la fascia con una parola (10/9 notte): Successo o Fallimento, e il perché quando c'è.
assert.deepEqual(rollOutcome(5, 3, localize), { total: 5, cssClass: "success", text: "Successo", missing: 0 });
assert.deepEqual(rollOutcome(5, 5, localize), { total: 5, cssClass: "success", text: "Successo", missing: 0 });
assert.deepEqual(rollOutcome(2, 3, localize), { total: 2, cssClass: "failure", text: "Fallimento", missing: 1 });
assert.deepEqual(rollOutcome(3, 6, localize), { total: 3, cssClass: "failure", text: "Fallimento", missing: 3 });
assert.deepEqual(rollOutcome(3, 6, localize, { forced: true }), { total: 3, cssClass: "success", text: "Successo sforzando la realtà", missing: 0 });
assert.deepEqual(rollOutcome(3, 4, localize, { priced: true }), { total: 3, cssClass: "success", text: "Successo a un prezzo", missing: 0 });
assert.deepEqual(rollOutcome(4, 0, localize), { total: 4, cssClass: "", text: "", missing: 0 });
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8"));
  for (const key of ["Of", "Successes", "Threshold", "Goal", "Spheres", "Scopes", "Type", "Effect", "Pool", "Success", "Failure", "Forced", "Priced"]) assert.equal(typeof strings.WOD5E_MAGE.RollCard[key], "string", `${lang} ${key}`);
  for (const key of ["CountOne", "CountMany", "Won", "WonMargin", "Lost", "LostOne"]) assert.equal(strings.WOD5E_MAGE.RollCard[key], undefined, `${lang} ${key} tolta`);
  for (const key of ["BacklashLabel", "BacklashEyesOne", "BacklashEyes", "BacklashSign", "MagickTypeHead", "Other"]) assert.equal(typeof strings.WOD5E_MAGE.Arete[key], "string", `${lang} ${key}`);
  assert.equal(strings.WOD5E_MAGE.Arete.OneStep, undefined, `${lang} OneStep tolta`);
  for (const key of ["Label", "Physical", "PhysicalOne", "Mental", "MentalOne", "Aggravated", "AggravatedOne"]) assert.equal(typeof strings.WOD5E_MAGE.Burst[key], "string", `${lang} ${key}`);
}
const rollCard = readFileSync(new URL("../scripts/roll-card.js", import.meta.url), "utf8");
assert.match(rollCard, /totalTitle\.textContent = game\.i18n\.localize\("WOD5E_MAGE\.RollCard\.Successes"\)/);
assert.match(rollCard, /title\.innerHTML = renderRollTitle\(data\.traits, game\.i18n\.localize\.bind\(game\.i18n\)\)/);
assert.match(rollCard, /data\.traits \? "" : renderRollSymbols\(data\.symbols \?\? \[\], localize\)/);
assert.match(rollCard, /export function rollActionsBox\(target\)/);
assert.match(rollCard, /export function markRollOpen\(html\)/);
assert.match(paradox, /cardData\.total = roll\._total;/);

console.log("Roll outcome tests passed.");
