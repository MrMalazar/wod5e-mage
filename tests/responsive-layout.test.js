import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8");
const tabNavigation = readFileSync(
  new URL("../templates/actor/parts/tab-navigation.hbs", import.meta.url),
  "utf8"
);
const mageHeader = readFileSync(
  new URL("../templates/actor/mage-header.hbs", import.meta.url),
  "utf8"
);
const traitsTemplate = readFileSync(
  new URL("../templates/actor/parts/tratti.hbs", import.meta.url),
  "utf8"
);
const magickTemplate = readFileSync(
  new URL("../templates/actor/parts/spheres.hbs", import.meta.url),
  "utf8"
);

// La scheda minimizzata non può ereditare un pavimento che impedisca a
// Foundry di richiuderla tramite doppio clic sulla barra del titolo.
assert.match(
  css,
  /\.wod5e-mage\.wod5e\.actor\.sheet\.minimized\s*\{[^}]*min-height:\s*0;/s
);
assert.doesNotMatch(
  css,
  /\.wod5e-mage\.wod5e\.actor\.sheet\s*\{[^}]*min-height:/s
);

// La griglia esterna cambia disposizione senza alterare il responsive
// interno delle tabelle Attributi e Abilita.
assert.match(
  css,
  /\.wod5e-mage-tratti\s*>\s*\.stats-content\s*\{[^}]*display:\s*grid;[^}]*"attributes conditions"[^}]*"skills specialties"[^}]*"ruota bonus";/s
);
assert.match(
  css,
  /@container\s*\(max-width:\s*900px\)[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s*250px/
);
assert.match(
  css,
  /@container\s*\(max-width:\s*800px\)[\s\S]*"attributes"[\s\S]*"conditions"[\s\S]*"skills"[\s\S]*"specialties"[\s\S]*"ruota"[\s\S]*"bonus"/
);
assert.match(
  css,
  /\.skills-attributes\s*>\s*\.stats-container\s*>\s*\.stats-content\s*\{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);/s
);

// Il wrapping è ammesso fra i riquadri, mai fra nome e pallini della stessa
// voce. La finestra aperta si ferma prima di raggiungere quella soglia.
assert.match(
  css,
  /\.stats-list\s*>\s*:is\(\.attribute,\s*\.skill\)\s*\{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*20px minmax\(0,\s*1fr\)\s+max-content;[^}]*white-space:\s*nowrap;/s
);
assert.match(
  css,
  /\.sheet:not\(\.minimized\)\s*\{[^}]*min-width:\s*820px;/s
);
assert.match(
  css,
  /\.stats-list\s*>\s*:is\(\.attribute,\s*\.skill\)\s*>\s*\.resource-value\s*\{[^}]*display:\s*flex;[^}]*justify-self:\s*end;[^}]*white-space:\s*nowrap;/s
);

// Ruota e Ambiti condividono il blocco a sinistra del pannello laterale, ma
// il riquadro del Dono sta accanto senza scale ridotte: l'esagono non c'è più.
assert.match(
  css,
  /\.wod5e-mage-arcana-cell\s*\{[^}]*display:\s*flex;[^}]*grid-area:\s*ruota;[^}]*width:\s*100%;/s
);
// La Ruota prende tutta la colonna delle Abilità, coi nodi in grande.
assert.match(
  css,
  /\.wod5e-mage-header-wheel-inner\s*\{[^}]*width:\s*100%;/s
);
assert.match(
  css,
  /\.wod5e-mage-magick-track-compact\s*\{[^}]*height:\s*176px;[^}]*width:\s*370px;/s
);
assert.doesNotMatch(css, /zoom:\s*0\.75|wod5e-mage-scopes-wheel|wod5e-mage-scope-choice|wod5e-mage-scope-gift/);
// Il sigillo apre ogni voce: colonna dedicata e aria uguale per tutti.
assert.match(
  css,
  /\.stats-list\s*>\s*:is\(\.attribute,\s*\.skill\)\s*\{[^}]*grid-template-columns:\s*20px minmax\(0, 1fr\) max-content;/s
);
assert.match(
  css,
  /\.stats-container\.skills \.skill,\s*\n\.wod5e-mage\.wod5e\.actor\.sheet \.stats-container\.attributes \.attribute\s*\{[^}]*margin-bottom:\s*0\.45rem;/s
);
assert.match(traitsTemplate, /wod5e-mage-trait-icon[\s\S]*attribute\.icon[\s\S]*wod5e-mage-trait-icon[\s\S]*skill\.icon/);
assert.doesNotMatch(
  css,
  /\.wod5e-mage-ruota-cell[^,{]*\{[^}]*zoom:/s
);
// I Bonus vivono nel pannello destro, sotto i Tiri personalizzati; la Ruota
// tiene per sé Quintessenza generata e Paradosso permanente.
assert.match(traitsTemplate, /Conditions[\s\S]*parts\/bonuses\.hbs/);
assert.match(traitsTemplate, /parts\/ruota\.hbs/);
assert.doesNotMatch(traitsTemplate, /parts\/scopes\.hbs|wod5e-mage-arcana-side/);
assert.doesNotMatch(magickTemplate, /wod5e-mage-scopes\b|wod5e-mage-persistent-resources/);
const ruotaTemplate = readFileSync(
  new URL("../templates/actor/parts/ruota.hbs", import.meta.url),
  "utf8"
);
assert.match(ruotaTemplate, /wod5e-mage-persistent-resources[\s\S]*generatedQuintessence[\s\S]*permanentParadox/);
// Il semicerchio è vero (raggio unico, mai schiacciato), con le due parole
// agli estremi; la parola ARETÉ tira, e il vecchio bottone non esiste più.
assert.match(ruotaTemplate, /A150 150 0 0 1[\s\S]*preserveAspectRatio="xMidYMid meet"|preserveAspectRatio="xMidYMid meet"[\s\S]*A150 150 0 0 1/);
assert.match(ruotaTemplate, /wod5e-mage-magick-end quintessence[\s\S]*wod5e-mage-magick-end paradox/);
assert.match(ruotaTemplate, /button[^>]*wod5e-mage-arete-roll[^>]*data-action="areteRoll"/);
assert.doesNotMatch(ruotaTemplate, /wod5e-mage-header-roll|Arete\.Roll"/);
// Il listino dei Successi Extra chiude la pagina Magick, a tutta larghezza.
assert.match(magickTemplate, /wod5e-mage-sphere-specialties[\s\S]*parts\/scope-table\.hbs/);
assert.match(
  css,
  /\.wod5e-mage-magick-layout\s*\{[^}]*"specialties specialties"\s*"table table";/s
);
assert.match(css, /\.wod5e-mage-scope-table\s*\{[^}]*grid-area:\s*table;/s);

// The Specialities section stays below Spheres and Ongoing Magick.
assert.match(
  css,
  /\.wod5e-mage-magick-layout\s*\{[^}]*"spheres ongoing"[^}]*"specialties specialties"[^}]*"table table";/s
);
assert.match(
  css,
  /\.wod5e-mage-spheres-panel\s*\{[^}]*grid-area:\s*spheres;/s
);
assert.match(
  css,
  /\.wod5e-mage-sphere-specialties\s*\{[^}]*grid-area:\s*specialties;/s
);
assert.match(
  css,
  /\.wod5e-mage-ongoing-magick\s*\{[^}]*grid-area:\s*ongoing;/s
);
assert.match(
  magickTemplate,
  /wod5e-mage-spheres-panel[\s\S]*wod5e-mage-ongoing-magick[\s\S]*wod5e-mage-sphere-specialties/
);

// La sidebar conserva le tab aggiuntive del Mago, ma usa la geometria nativa:
// 50px, icona centrata e nessun riquadro applicato all'intera voce.
assert.match(
  css,
  /\.wod5e-mage-tabs\s+\.sheet-tabs\s*\{[^}]*width:\s*50px;/s
);
assert.match(
  css,
  /\.sheet-tabs\s*>\s*\[data-tab\][^{]*\{[^}]*border:\s*0;[^}]*height:\s*50px;[^}]*width:\s*50px;/s
);
assert.match(
  css,
  /\.sheet-tabs\s*>\s*\[data-tab\]\s+\.navicon,[^{]*\{[^}]*height:\s*100%;[^}]*justify-content:\s*center;[^}]*width:\s*100%;/s
);
assert.doesNotMatch(tabNavigation, /class="navlabel"/);

// Come nella 0.9.4, il profilo rimane fra due colonne header-fields:
// lo spacer destro impedisce al ritratto di slittare sul bordo.
assert.match(
  mageHeader,
  /<div class="header-fields">[\s\S]*<div class="header-profile">[\s\S]*<div class="header-fields wod5e-mage-header-spacer" aria-hidden="true"><\/div>/
);

// Abilità e Attributi: pallini a misura fissa con aria fra loro, e due
// colonne quando il contenitore non regge più le tre.
assert.match(
  css,
  /\.stats-list\s*>\s*:is\(\.attribute,\s*\.skill\)\s*>\s*\.resource-value\s*\{[^}]*gap:\s*5px;/s
);
assert.match(
  css,
  /\.resource-value\s*>\s*:is\(\.resource-value-step,\s*\.resource-value-empty\)\s*\{[^}]*flex:\s*0 0 14px;[^}]*min-width:\s*14px;/s
);
assert.match(
  css,
  /\.skills-attributes\s*>\s*\.stats-container\s*\{[^}]*container-type:\s*inline-size;/s
);
assert.match(
  css,
  /@container\s*\(max-width:\s*720px\)\s*\{[^{]*\.skills-attributes\s*>\s*\.stats-container\s*>\s*\.stats-content\s*\{[^}]*repeat\(2,\s*minmax\(0,\s*1fr\)\);/s
);

// La Ruota ad arco accende i nodi con i token della palette, non con
// variabili definite in un contenitore che non esiste più.
assert.match(
  css,
  /\.wod5e-mage-magick-node\.quintessence\s*\{[^}]*background:\s*var\(--mage-oro\);/s
);
assert.match(
  css,
  /\.wod5e-mage-magick-node\.paradox\s*\{[^}]*background:\s*var\(--mage-rosso\);/s
);
assert.doesNotMatch(css, /var\(--quintessence-color\)|var\(--paradox-color\)/);

// I pallini di Arete respirano rispetto alla parola cliccabile.
assert.match(
  css,
  /\.wod5e-mage-header-arete > \.wod5e-mage-arete-dots\s*\{[^}]*margin-left:/s
);

// Il dialogo del tiro di Arete segue il mockup: una riga per Sfera con
// tendina Ambito e campo N.S., e la Tipologia con le spiegazioni in corsivo.
const areteDialog = readFileSync(
  new URL("../templates/dialogs/arete-roll.hbs", import.meta.url),
  "utf8"
);
// Sfere e Ambiti: due colonne a pallini, un campo nascosto per riga, la
// Specialità segnata sulla Sfera che ce l'ha.
assert.match(areteDialog, /wod5e-mage-arete-columns[\s\S]*data-kind="sphere"[\s\S]*name="sphere-\{\{sphere\.id\}\}"[\s\S]*wod5e-mage-arete-sphere-dot[\s\S]*data-kind="scope"[\s\S]*name="scope-\{\{scope\.id\}\}"/);
assert.match(areteDialog, /data-specialty="\{\{sphere\.specialtyScope\}\}"/);
assert.doesNotMatch(areteDialog, /scopeRowTemplate|data-role="scopeAdd"|wod5e-mage-arete-sphere-box|ScopeSuccesses/);
// La riserva del ramo A: la prima tendina è un'Abilità, la seconda Abilità
// o Attributo; l'Areté non tira, entra come premio (mai per l'Ibrida).
assert.match(areteDialog, /RollSelection\.Attribute"[\s\S]*name="attributeTrait"[\s\S]*RollSelection\.Ability"[\s\S]*name="primaryTrait"[\s\S]*RollSelection\.Ability"[\s\S]*name="secondaryTrait"/);
assert.match(areteDialog, /data-role="scopeTableOpen"/);
assert.doesNotMatch(areteDialog, /name="primarySkill"|name="arete"|Arete\.Include/);
assert.match(areteDialog, /Arete\.Prize"[\s\S]*name="prize"[\s\S]*Arete\.PrizeHybrid[\s\S]*name="harmony"[\s\S]*data-role="pool"[\s\S]*data-role="threshold"[\s\S]*data-role="autoVictory"/);
// L'Armonia è un numero: i dadi degli altri Maghi, contati al tavolo.
assert.match(areteDialog, /name="harmony"[^>]*type="number"|type="number"[^>]*name="harmony"/);
// Le spiegazioni della Tipologia vivono in una colonna staccata a destra.
assert.match(areteDialog, /wod5e-mage-arete-type-grid[\s\S]*Arete\.Coincidental\b[\s\S]*Arete\.CoincidentalHint[\s\S]*Arete\.VulgarHint[\s\S]*Arete\.WitnessesHint/);
assert.doesNotMatch(areteDialog, /wod5e-mage-arete-sphere-list|wod5e-mage-arete-sphere-row\b/);
assert.match(css, /\.wod5e-mage-arete-columns\s*\{[^}]*grid-template-columns:/s);
assert.match(css, /\.wod5e-mage-arete-sphere-dot\.active\s*\{[^}]*var\(--mage-oro\)/s);
assert.match(css, /\.wod5e-mage-arete-type-grid\s*\{[^}]*grid-template-columns:/s);
assert.match(css, /\.wod5e-mage-arete-type-grid > em\s*\{[^}]*font-style: italic;/s);

console.log("Responsive Mage sheet layout tests passed.");
