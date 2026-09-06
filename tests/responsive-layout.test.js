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
  /@container tratti\s*\(max-width:\s*900px\)[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s*250px/
);
assert.match(
  css,
  /@container tratti\s*\(max-width:\s*800px\)[\s\S]*"attributes"[\s\S]*"conditions"[\s\S]*"skills"[\s\S]*"specialties"[\s\S]*"ruota"[\s\S]*"bonus"/
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
  /\.wod5e-mage-magick-layout\s*\{[^}]*"ongoing ongoing"\s*"table table";/s
);
assert.match(css, /\.wod5e-mage-scope-table\s*\{[^}]*grid-area:\s*table;/s);

// Le Specialità delle Sfere a destra delle Sfere; i Magick in atto sotto, a tutta larghezza.
assert.match(
  css,
  /\.wod5e-mage-magick-layout\s*\{[^}]*"spheres specialties"[^}]*"ongoing ongoing"[^}]*"table table";/s
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

// La sidebar (6/9): 64px, icona centrata e sotto il nome corto della pagina;
// le pagine si scostano di altrettanto.
assert.match(
  css,
  /\.wod5e-mage-tabs\s+\.sheet-tabs\s*\{[^}]*width:\s*64px;/s
);
assert.match(
  css,
  /\.sheet-tabs\s*>\s*\[data-tab\][^{]*\{[^}]*border:\s*0;[^}]*flex-direction:\s*column;[^}]*height:\s*58px;[^}]*width:\s*64px;/s
);
assert.match(css, /\.window-content \.tab \{\s*margin-left:\s*62px;/);
assert.match(css, /\.wod5e-mage-tab-label \{[^}]*text-transform:\s*uppercase;/s);
assert.match(tabNavigation, /<span class="wod5e-mage-tab-label">\{\{localize tab\.short\}\}<\/span>/);
assert.doesNotMatch(tabNavigation, /class="navlabel"/);
const sheetTabs = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.equal((sheetTabs.match(/short: "WOD5E_MAGE\.Tabs\.Short\./g) ?? []).length, 9);
const itShort = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8")).WOD5E_MAGE.Tabs.Short;
// Le pagine a gruppi (6/9): chi sei | la Magick | la storia, con un
// divisorio davanti a Magick e a Bussola; accesa SOLO la pagina in cui sei.
assert.deepEqual(Object.values(itShort), ["Tratti", "Oggetti", "Magick", "Incanti", "Credo", "Bussola", "Sfida", "Ascesa", "Note"]);
assert.match(sheetTabs, /stats: \{[\s\S]*?dotazione: \{[\s\S]*?magick: \{\s*id: "magick",\s*groupStart: true,[\s\S]*?grimorio: \{[\s\S]*?focus: \{[\s\S]*?personaggio: \{\s*id: "personaggio",\s*groupStart: true,[\s\S]*?conceptChallenge: \{[\s\S]*?esperienza: \{[\s\S]*?note: \{/);
assert.match(tabNavigation, /\{\{#if tab\.groupStart\}\}<hr class="wod5e-mage-tabs-divider"/);
assert.match(css, /\.wod5e-mage-tabs-divider \{[^}]*border-top: 1px solid var\(--mage-oro-scuro\);/s);
assert.doesNotMatch(css, /:is\(\[data-tab="magick"\], \[data-tab="focus"\], \[data-tab="conceptChallenge"\]\) \.navicon \{/);
assert.match(css, /\.sheet-tabs > \[data-tab\] \.navicon,\s*\.wod5e-mage\.wod5e\.actor\.sheet \.sheet-tabs \.lock-btn \{[^}]*background-color: var\(--mage-incavo\);/s);
// I Tratti a colonne (6/9): tre colonne sulla stessa riga, Attributi |
// Abilità (due colonne da nove) | il pannello di destra; il tasto sta nel
// titolo degli Attributi e l'impostazione è del giocatore.
assert.match(css, /\.wod5e-mage-tratti-columns > \.stats-content \{[^}]*"attributes skills conditions"[^}]*"attributes skills specialties"[^}]*"ruota ruota bonus"/s);
assert.match(css, /\.wod5e-mage-tratti-columns \.wod5e-mage-tratti-skills > \.stats-container > \.stats-content \{[^}]*grid-auto-flow: column;[^}]*grid-template-rows: repeat\(9, auto\);/s);
assert.match(css, /\.wod5e-mage-tratti-columns \.stats-footer \{[^}]*display: none;/s);
// I pallini a colonne respirano col contenitore (cqw) e sotto gli 820 px
// dei Tratti lasciano il posto al numero grande; le query hanno il nome
// del contenitore giusto (`tratti`, `lista`).
assert.match(css, /\.wod5e-mage-tratti \{[^}]*container: tratti \/ inline-size;/s);
assert.match(css, /--dot: clamp\(11px, 2\.6cqw, 24px\);/);
assert.match(css, /@container tratti \(max-width: 820px\) \{\s*\.wod5e-mage\.wod5e\.actor\.sheet \.wod5e-mage-tratti-columns \.stats-list > :is\(\.attribute, \.skill\) > \.resource-value \{\s*display: none !important;/);
assert.match(css, /\.wod5e-mage-trait-number \{[^}]*font-size: 1\.35rem;/s);
const trattiTemplate = readFileSync(new URL("../templates/actor/parts/tratti.hbs", import.meta.url), "utf8");
assert.match(trattiTemplate, /wod5e-mage-tratti\{\{#if traitsColumns\}\} wod5e-mage-tratti-columns\{\{\/if\}\}[\s\S]*data-action="traitsLayoutToggle"/);
assert.match(readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8"), /register\(MODULE_ID, "traitsLayout"/);
// Il sigillo dell'Areté in alto a destra della testata tira da ogni pagina;
// il numero accanto ai pallini dell'Areté non c'è più; i nodi della Ruota
// sono 26 px.
assert.match(mageHeader, /<button type="button" class="wod5e-mage-header-arete-roll wod5e-mage-arete-roll" data-action="areteRoll"[\s\S]*arete\.svg[\s\S]*<div class="header-fields">/);
assert.match(css, /button\.wod5e-mage-header-arete-roll \{[^}]*position: absolute;[^}]*right: 0\.5rem;/s);
const ruota = readFileSync(new URL("../templates/actor/parts/ruota.hbs", import.meta.url), "utf8");
assert.doesNotMatch(ruota, /wod5e-mage-header-arete-value/);
assert.match(css, /\.wod5e-mage-magick-node \{[^}]*height: 26px;[^}]*width: 26px;/s);
assert.match(css, /\.wod5e-mage-magick-track-compact \.wod5e-mage-magick-node \{[^}]*height: 26px;[^}]*width: 26px;/s);
assert.ok(Object.values(itShort).every((label) => label.length <= 7), "nomi corti entro sette lettere");

// Come nella 0.9.4, il profilo rimane fra due colonne header-fields:
// lo spacer destro impedisce al ritratto di slittare sul bordo.
assert.match(
  mageHeader,
  /<div class="header-fields">[\s\S]*<div class="header-profile">[\s\S]*<div class="header-fields wod5e-mage-header-spacer">[\s\S]*appartenenza\.hbs/
);

// Abilità e Attributi: pallini a misura fissa con aria fra loro, e due
// colonne quando il contenitore non regge più le tre.
assert.match(
  css,
  /\.stats-list\s*>\s*:is\(\.attribute,\s*\.skill\)\s*>\s*\.resource-value\s*\{[^}]*gap:\s*5px;/s
);
assert.match(
  css,
  /\.resource-value\s*>\s*:is\(\.resource-value-step,\s*\.resource-value-empty\)\s*\{[^}]*flex:\s*0 0 18px;[^}]*min-width:\s*18px;/s
);
assert.match(
  css,
  /\.skills-attributes\s*>\s*\.stats-container\s*\{[^}]*container: lista \/ inline-size;/s
);
assert.match(
  css,
  /@container lista\s*\(max-width:\s*720px\)\s*\{[^{]*\.skills-attributes\s*>\s*\.stats-container\s*>\s*\.stats-content\s*\{[^}]*repeat\(2,\s*minmax\(0,\s*1fr\)\);/s
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
// Due colonne (6/9): a sinistra nome, Obiettivo, Effetto e i pallini di
// Sfere e Ambiti (un campo nascosto per riga, la Specialità segnata sulla
// Sfera che ce l'ha); a destra la riserva, la narrativa, il premio e la
// Tipologia.
assert.match(areteDialog, /wod5e-mage-arete-layout[\s\S]*wod5e-mage-arete-dots-column[\s\S]*name="spellName"[\s\S]*name="effectKind"[\s\S]*data-kind="sphere"[\s\S]*name="sphere-\{\{sphere\.id\}\}"[\s\S]*wod5e-mage-arete-sphere-dot[\s\S]*name="goal"[\s\S]*data-kind="scope"[\s\S]*name="scope-\{\{scope\.id\}\}"[\s\S]*wod5e-mage-arete-side[\s\S]*name="attributeTrait"[\s\S]*name="narrative"[\s\S]*name="harmony"[\s\S]*wod5e-mage-arete-types[\s\S]*name="maintained"/);
assert.match(css, /\.wod5e-mage-arete-layout\s*\{[^}]*grid-template-columns: minmax\(250px, 1\.1fr\) minmax\(230px, 0\.9fr\);/s);
// Nel Grimorio degli effetti la testata di ogni Sfera sta al centro:
// simbolo sopra, nome sotto.
assert.match(css, /\.wod5e-mage-grimorio-sphere > summary > h3\s*\{[^}]*flex-direction: column;[^}]*text-align: center;/s);
// Le file a pallini non portano più la classe della vecchia riga flex.
assert.doesNotMatch(areteDialog, /wod5e-mage-arete-dotrow wod5e-mage-arete-sphere"/);
assert.match(areteDialog, /data-specialty="\{\{sphere\.specialtyScope\}\}"/);
assert.doesNotMatch(areteDialog, /scopeRowTemplate|data-role="scopeAdd"|wod5e-mage-arete-sphere-box|ScopeSuccesses/);
// La riserva del ramo A: la prima tendina è un'Abilità, la seconda Abilità
// o Attributo; l'Areté non tira, entra come premio (mai per l'Ibrida).
assert.match(areteDialog, /RollSelection\.Attribute"[\s\S]*name="attributeTrait"[\s\S]*RollSelection\.Ability"[\s\S]*name="primaryTrait"[\s\S]*RollSelection\.Ability"[\s\S]*name="secondaryTrait"/);
assert.match(areteDialog, /data-role="scopeTableOpen"/);
assert.doesNotMatch(areteDialog, /name="primarySkill"|name="arete"|Arete\.Include/);
assert.match(areteDialog, /data-role="pool"[\s\S]*data-role="threshold"[\s\S]*data-role="autoVictory"[\s\S]*Arete\.Prize"[\s\S]*name="prize"[\s\S]*Arete\.PrizeHybrid[\s\S]*name="harmony"/);
// L'Armonia è un numero: i dadi degli altri Maghi, contati al tavolo.
assert.match(areteDialog, /name="harmony"[^>]*type="number"|type="number"[^>]*name="harmony"/);
// Le spiegazioni della Tipologia vivono in una colonna staccata a destra.
assert.match(areteDialog, /wod5e-mage-arete-type-grid[\s\S]*Arete\.Coincidental\b[\s\S]*Arete\.CoincidentalHint[\s\S]*Arete\.VulgarHint[\s\S]*Arete\.WitnessesHint/);
assert.doesNotMatch(areteDialog, /wod5e-mage-arete-sphere-list|wod5e-mage-arete-sphere-row\b/);
assert.match(css, /\.wod5e-mage-arete-layout\s*\{[^}]*grid-template-columns:/s);
assert.match(css, /\.wod5e-mage-arete-sphere-dot\.active\s*\{[^}]*var\(--mage-oro\)/s);
assert.match(css, /\.wod5e-mage-arete-type-grid\s*\{[^}]*grid-template-columns:/s);
assert.match(css, /\.wod5e-mage-arete-type-grid > em\s*\{[^}]*font-style: italic;/s);

console.log("Responsive Mage sheet layout tests passed.");
