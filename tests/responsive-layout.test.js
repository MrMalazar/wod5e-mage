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
const stat = (file) => readFileSync(new URL(`../templates/actor/parts/${file}`, import.meta.url), "utf8");
const statTemplate = stat("stat.hbs");
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

// La prima pagina a otto riquadri (16/9 sera): quattro colonne, due riquadri
// ciascuna; le colonne sono trasparenti alla griglia e ogni riquadro ha la
// sua area, così la fascia bassa (Grimorio, Tratti, Il Tiro) sta su una riga
// sola e le Risorse prendono le due righe sotto l'Identità.
assert.match(css, /\.wod5e-mage-stat-grid\s*\{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\);[^}]*grid-template-rows:\s*auto minmax\(0, 1fr\) minmax\(0, 1\.45fr\);[^}]*min-height:\s*0;/s);
assert.match(css, /\.wod5e-mage-stat\.active\s*\{[^}]*flex:\s*1 1 auto;[^}]*min-height:\s*0;/s);
assert.match(css, /\.wod5e-mage-riq-body\s*\{[^}]*overflow-y:\s*auto;/s);
assert.match(css, /\.wod5e-mage-stat-col\s*\{[^}]*display:\s*contents;/s);
for (const [riq, area] of [["identita", "1 / 1 / 2 / 2"], ["risorse", "2 / 1 / 4 / 2"], ["magick", "1 / 2 / 3 / 3"], ["grimorio", "3 / 2 / 4 / 3"], ["attributi", "1 / 3 / 3 / 4"], ["tratti", "3 / 3 / 4 / 4"], ["abilita", "1 / 4 / 3 / 5"], ["tiro", "3 / 4 / 4 / 5"]]) {
  assert.match(css, new RegExp(`\\.wod5e-mage-riq-${riq} \\{ grid-area: ${area.replace(/\//g, "\\/")}; \\}`), `area di ${riq}`);
}
assert.doesNotMatch(css, /wod5e-mage-riq-salute|wod5e-mage-riq-poteri|wod5e-mage-ambito-livell/);
// Gli otto riquadri stanno in stat.hbs nell'ordine delle colonne; la testata è vuota e nascosta.
assert.match(statTemplate, /stat-identita\.hbs[\s\S]*stat-risorse\.hbs[\s\S]*stat-magick\.hbs[\s\S]*stat-grimorio\.hbs[\s\S]*stat-attributi\.hbs[\s\S]*stat-tratti\.hbs[\s\S]*stat-abilita\.hbs[\s\S]*stat-tiro\.hbs/);
assert.doesNotMatch(statTemplate, /stat-poteri\.hbs|riq-salute/);
assert.match(mageHeader, /<header class="actor-header wod5e-mage-header wod5e-mage-header-vuota" aria-hidden="true"><\/header>/);
assert.match(css, /\.wod5e-mage-header-vuota\s*\{\s*display: none;/);
// La finestra parte larga per le quattro colonne.
const sheetSource = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheetSource, /position: \{\s*width: 1340,\s*height: 1080\s*\}/);
// Le righe scelte sono viola; il livello dell'Ambito scelto è viola nel
// cassetto e nel cerchio sulla riga; il cassetto si apre al sorvolo su ogni
// riga che ce l'ha (Abilità, Sfere, Ambiti) e sopra quando sotto non c'è posto.
assert.match(css, /\.wod5e-mage-riga\.scelta\s*\{[^}]*background:\s*var\(--mage-viola\);/s);
assert.match(css, /\.wod5e-mage-pastiglia-livello\.scelta\s*\{[^}]*background:\s*var\(--mage-viola\);/s);
assert.match(css, /\.wod5e-mage-ambito-lettura > b\s*\{[^}]*background:\s*var\(--mage-viola\);/s);
assert.match(css, /\.wod5e-mage-riga\.con-cassetto:hover > \.wod5e-mage-cassetto[^{]*\{\s*display: flex;/);
assert.match(css, /\.wod5e-mage-riga\.con-cassetto\.cassetto-su > \.wod5e-mage-cassetto\s*\{[^}]*bottom: calc\(100% - 2px\);[^}]*top: auto;/s);
assert.match(css, /\.wod5e-mage-riga\.con-cassetto:hover > \.wod5e-mage-cassetto-poteri[^{]*\{\s*display: grid;/);
// La misura del testo: una scala sul contenuto della finestra.
assert.match(css, /\.window-content\s*\{\s*zoom: var\(--mage-scala, 1\);/);
// La scheda minimizzata resta richiudibile; sotto i 1280 le quattro colonne si accavallavano (16/9).
assert.match(
  css,
  /\.sheet:not\(\.minimized\)\s*\{[^}]*min-width:\s*1280px;/s
);
// La pagina si vede solo quando è la linguetta accesa; senza Areté niente
// tre tasti; la catena non si stampa più; i dadi extra hanno la loro riga.
assert.match(css, /\.wod5e-mage-stat:not\(\.active\)\s*\{\s*display: none;/);
assert.match(css, /\.wod5e-mage-stat\.active\s*\{[^}]*display: flex;/s);
const tiroTemplate = stat("stat-tiro.hbs");
assert.doesNotMatch(tiroTemplate, /tiro\.pills|wod5e-mage-pillola/);
assert.match(tiroTemplate, /data-action="tiroExtra" data-delta="-1"[\s\S]*data-action="tiroExtra" data-delta="1"/);
assert.match(stat("grimorio.hbs"), /data-action="grimorioClose"/);
assert.match(stat("stat-risorse.hbs"), /wod5e-mage-saggezza-tendina[\s\S]*parts\/wisdom\.hbs/);
assert.doesNotMatch(stat("stat-ruota.hbs"), /wod5e-mage-magick-end/);
// La Ruota dentro le Risorse: il mezzo cerchio vero, il meno e il più ai
// lati del primo nodo di ciascuno (sull'arco e sulla barra), i due conti
// senza tasti, i Dettagli della Ruota chiusi.
const risorse = stat("stat-ruota.hbs");
assert.match(risorse, /A150 150 0 0 1[\s\S]*preserveAspectRatio="xMidYMid meet"|preserveAspectRatio="xMidYMid meet"[\s\S]*A150 150 0 0 1/);
assert.match(risorse, /wod5e-mage-magick-track-stat[\s\S]*wod5e-mage-magick-node[\s\S]*wod5e-mage-ruota-tasto quintessence meno" data-action="magickBalanceChange" data-resource="quintessence" data-delta="-1"[\s\S]*wod5e-mage-ruota-tasto quintessence piu"[\s\S]*wod5e-mage-ruota-tasto paradox meno"[\s\S]*wod5e-mage-ruota-tasto paradox piu" data-action="magickBalanceChange" data-resource="paradox" data-delta="1"/);
assert.match(risorse, /wod5e-mage-magick-bar-stat[\s\S]*ruota-tasto quintessence meno[\s\S]*ruota-tasto quintessence piu[\s\S]*wod5e-mage-magick-cell [\s\S]*ruota-tasto paradox meno[\s\S]*ruota-tasto paradox piu/);
assert.match(risorse, /wod5e-mage-ruota-conto quintessence">\s*<span class="wod5e-mage-ruota-conto-nome">[\s\S]*wod5e-mage-ruota-conto paradox">\s*<button[^>]*data-action="paradoxBurst"/);
assert.doesNotMatch(risorse, /wod5e-mage-ruota-conto[^>]*>\s*<button type="button" data-action="magickBalanceChange"/);
assert.match(css, /\.wod5e-mage-magick-track-stat \.wod5e-mage-ruota-tasto\.quintessence\.meno \{ left: calc\(12\.5% - 25px\); \}/);
assert.match(css, /\.wod5e-mage-magick-track-stat \.wod5e-mage-ruota-tasto\.paradox\.piu \{ left: calc\(87\.5% \+ 25px\); \}/);
assert.match(risorse, /<details class="wod5e-mage-ruota-dettagli">[\s\S]*generatedQuintessence[\s\S]*permanentParadox[\s\S]*data-action="contraccolpoNega"[\s\S]*data-action="wheelModeToggle"/);
assert.doesNotMatch(risorse, /data-action="areteRoll"|wod5e-mage-header-arete/);
// Magick: le Sfere col cassetto dei poteri, gli Ambiti con la lettura e il cassetto dei livelli.
const magickRiq = stat("stat-magick.hbs");
assert.match(magickRiq, /wod5e-mage-riga-sfera[^"]*\{\{#if sphere\.poteri\.length\}\} con-cassetto[\s\S]*wod5e-mage-cassetto wod5e-mage-cassetto-poteri[\s\S]*data-action="tiroPower" data-power="\{\{power\.id\}\}"[^>]*>\{\{power\.short\}\}/);
assert.match(magickRiq, /wod5e-mage-riga-ambito con-cassetto[\s\S]*wod5e-mage-ambito-lettura[\s\S]*<b>\{\{scope\.level\}\}<\/b>[\s\S]*\{\{scope\.reading\}\}[\s\S]*wod5e-mage-cassetto wod5e-mage-cassetto-ambito[\s\S]*wod5e-mage-pastiglia wod5e-mage-pastiglia-livello[^>]*data-action="tiroScope" data-scope="\{\{scope\.id\}\}" data-level="\{\{step\.value\}\}"[^>]*title="\{\{step\.reading\}\}"/);
assert.doesNotMatch(magickRiq, /wod5e-mage-ambito-livello/);
// Il Grimorio al posto dei Poteri: gli incantesimi cliccabili per il lancio, il libro apre la pagina.
const grimorioRiq = stat("stat-grimorio.hbs");
assert.match(grimorioRiq, /wod5e-mage-riq-grimorio[\s\S]*data-action="tiroGrimorio"[\s\S]*data-filter="incantesimi"[\s\S]*data-list="incantesimi"[\s\S]*data-action="tiroIncantesimo" data-row="\{\{spell\.id\}\}"/);
// Le Abilità: il tasto accanto al + le mette tutte in fila.
const abilitaTemplate = stat("stat-abilita.hbs");
assert.match(abilitaTemplate, /data-action="skillsFlatToggle"[\s\S]*data-action="customSkillAdd"/);
assert.match(abilitaTemplate, /\{\{#if group\.label\}\}<span class="wod5e-mage-riq-occhiello">/);
assert.doesNotMatch(magickTemplate, /wod5e-mage-scopes\b|wod5e-mage-persistent-resources/);
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
assert.deepEqual(Object.values(itShort), ["Stat", "Tratti", "Magick", "Formule", "Credo", "Bussola", "Sfida", "Exp", "Note"]);
assert.match(sheetTabs, /stats: \{[\s\S]*?dotazione: \{[\s\S]*?magick: \{\s*id: "magick",\s*groupStart: true,[\s\S]*?grimorio: \{[\s\S]*?focus: \{[\s\S]*?personaggio: \{\s*id: "personaggio",\s*groupStart: true,[\s\S]*?conceptChallenge: \{[\s\S]*?esperienza: \{[\s\S]*?note: \{/);
assert.match(tabNavigation, /\{\{#if tab\.groupStart\}\}<hr class="wod5e-mage-tabs-divider"/);
assert.match(css, /\.wod5e-mage-tabs-divider \{[^}]*border-top: 1px solid var\(--mage-oro-scuro\);/s);
assert.doesNotMatch(css, /:is\(\[data-tab="magick"\], \[data-tab="focus"\], \[data-tab="conceptChallenge"\]\) \.navicon \{/);
assert.match(css, /\.sheet-tabs > \[data-tab\] \.navicon,\s*\.wod5e-mage\.wod5e\.actor\.sheet \.sheet-tabs \.lock-btn \{[^}]*background-color: var\(--mage-incavo\);/s);
// Gli Attributi e le Abilità nei loro riquadri (16/9): per famiglia, il nome
// è il tasto che li mette nel tiro, i pallini restano quelli della scheda.
const attributi = stat("stat-attributi.hbs");
const abilita = stat("stat-abilita.hbs");
assert.match(attributi, /attributeGroups[\s\S]*data-action="tiroAttribute" data-attribute="\{\{attribute\.id\}\}"[\s\S]*data-action="dotCounterChange"/);
assert.match(abilita, /skillGroups[\s\S]*data-action="tiroSkill" data-key="\{\{skill\.key\}\}"[\s\S]*data-action="essentialSkillDotChange"[\s\S]*wod5e-mage-cassetto[\s\S]*data-action="tiroSpecialty"[\s\S]*data-action="specialtyAdd" data-skill="\{\{skill\.id\}\}"/);
assert.match(attributi, /wod5e-mage-riga-icona[\s\S]*attribute\.icon/);
assert.match(abilita, /wod5e-mage-riga-icona[\s\S]*skill\.icon/);
assert.doesNotMatch(readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8"), /traitsLayoutToggle|traitsOrderToggle|parts\/tratti\.hbs|parts\/ruota\.hbs/);
// I nodi della Ruota sono 26 px.
assert.match(css, /\.wod5e-mage-magick-node \{[^}]*height: 26px;[^}]*width: 26px;/s);
assert.match(css, /\.wod5e-mage-magick-track-compact \.wod5e-mage-magick-node \{[^}]*height: 26px;[^}]*width: 26px;/s);
assert.ok(Object.values(itShort).every((label) => label.length <= 7), "nomi corti entro sette lettere");

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
// L'ordine di Blue (10/9 notte): Obiettivo, Effetto | Sfere | Ambiti; tratti | Tipologia Effetto | Armonia, Quintessenza | Altro.
assert.match(areteDialog, /wod5e-mage-arete-layout[\s\S]*wod5e-mage-arete-dots-column[\s\S]*name="spellName"[\s\S]*name="goal"[\s\S]*name="effectKind"[\s\S]*<hr class="wod5e-mage-arete-rule">[\s\S]*data-kind="sphere"[\s\S]*name="sphere-\{\{sphere\.id\}\}"[\s\S]*wod5e-mage-arete-sphere-dot[\s\S]*<hr class="wod5e-mage-arete-rule">[\s\S]*data-kind="scope"[\s\S]*name="scope-\{\{scope\.id\}\}"[\s\S]*wod5e-mage-arete-side[\s\S]*name="attributeTrait"[\s\S]*name="narrative"[\s\S]*<hr class="wod5e-mage-arete-rule">[\s\S]*wod5e-mage-arete-types[\s\S]*Arete\.MagickTypeHead[\s\S]*<hr class="wod5e-mage-arete-rule">[\s\S]*name="harmony"[\s\S]*name="quintessence"[\s\S]*<hr class="wod5e-mage-arete-rule">[\s\S]*Arete\.Other[\s\S]*name="maintained"[\s\S]*name="prize"/);
assert.match(css, /\.wod5e-mage-arete-layout\s*\{[^}]*grid-template-columns: minmax\(250px, 1\.1fr\) minmax\(230px, 0\.9fr\);/s);
// Nel Grimorio degli effetti la testata di ogni Sfera è il nome al centro,
// senza simbolo: il simbolo sta nei tasti in cima (verdetto di Blue, 7/9).
assert.match(css, /\.wod5e-mage-grimorio-sphere > summary > h3\s*\{[^}]*text-align: center;/s);
assert.doesNotMatch(readFileSync(new URL("../templates/dialogs/grimorio.hbs", import.meta.url), "utf8"), /<h3><img src="\{\{group\.icon\}\}"/);
// Le file a pallini non portano più la classe della vecchia riga flex.
assert.doesNotMatch(areteDialog, /wod5e-mage-arete-dotrow wod5e-mage-arete-sphere"/);
assert.match(areteDialog, /data-specialty="\{\{sphere\.specialtyScope\}\}"/);
assert.doesNotMatch(areteDialog, /scopeRowTemplate|data-role="scopeAdd"|wod5e-mage-arete-sphere-box|ScopeSuccesses/);
// La riserva (11/9): Attributo, Abilità e la Specializzazione come casella (+1);
// la seconda Abilità non c'è più; l'Areté non tira, entra come premio (mai per l'Ibrida).
assert.match(areteDialog, /RollSelection\.Attribute"[\s\S]*name="attributeTrait"[\s\S]*RollSelection\.Ability"[\s\S]*name="primaryTrait"[\s\S]*Arete\.SkillSpecialty"[\s\S]*name="skillSpecialty"/);
assert.match(areteDialog, /data-role="scopeTableOpen"/);
assert.doesNotMatch(areteDialog, /name="primarySkill"|name="arete"|Arete\.Include/);
// Il conto (10/9 notte): i numeri (Armonia, Quintessenza), poi Altro (Bussola, Effetto Mantenuto, Premio).
assert.match(areteDialog, /data-role="pool"[\s\S]*data-role="threshold"[\s\S]*wod5e-mage-arete-conto wod5e-mage-arete-conto-numbers"[\s\S]*name="harmony"[\s\S]*name="quintessence"[\s\S]*wod5e-mage-arete-altro"[\s\S]*\{\{\{bussolaHtml\}\}\}[\s\S]*name="maintained"[\s\S]*name="prize"[\s\S]*Arete\.Prize"[\s\S]*Arete\.PrizeHybrid/);
// L'Armonia è un numero: i dadi degli altri Maghi, contati al tavolo.
assert.match(areteDialog, /name="harmony"[^>]*type="number"|type="number"[^>]*name="harmony"/);
// Le spiegazioni della Tipologia stanno nei titoli delle caselle (10/9): niente testo a destra.
assert.match(areteDialog, /wod5e-mage-arete-type-grid[\s\S]*title="\{\{localize 'WOD5E_MAGE\.Arete\.CoincidentalHint'\}\}"[\s\S]*Arete\.Coincidental"[\s\S]*title="\{\{localize 'WOD5E_MAGE\.Arete\.VulgarHint'\}\}"[\s\S]*title="\{\{localize 'WOD5E_MAGE\.Arete\.WitnessesHint'\}\}"/);
assert.doesNotMatch(areteDialog, /<em>\{\{localize "WOD5E_MAGE\.Arete\.(Coincidental|Vulgar|Witnesses)Hint"\}\}<\/em>|Arete\.ThresholdShort|Arete\.HarmonyShort|Arete\.QuintessenceShort|carry\.traitLabels/);
// Una lettura alla volta accanto ai pallini degli Ambiti, col tasto che cambia (10/9).
assert.match(areteDialog, /data-role="dotReading"[^>]*><button type="button" class="wod5e-mage-arete-reading-switch" data-role="readingSwitch"[^>]*>[\s\S]*?<\/button><span data-role="readingText"><\/span>/);
assert.doesNotMatch(areteDialog, /wod5e-mage-arete-sphere-list|wod5e-mage-arete-sphere-row\b/);
assert.match(css, /\.wod5e-mage-arete-layout\s*\{[^}]*grid-template-columns:/s);
assert.match(css, /\.wod5e-mage-arete-sphere-dot\.active\s*\{[^}]*var\(--mage-oro\)/s);
assert.match(css, /\.wod5e-mage-arete-type-grid\s*\{[^}]*grid-template-columns:/s);
assert.match(css, /\.wod5e-mage-arete-type-grid > em\s*\{[^}]*font-style: italic;/s);

console.log("Responsive Mage sheet layout tests passed.");
