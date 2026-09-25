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
// L'ordine delle colonne (Blue, 20/9): Identità, Attributi, Abilità, Magick;
// sotto, Risorse, Tratti, Grimorio, Il Tiro.
// Dal 23/9 il Grimorio sta dentro i Tratti e Il Tiro prende due colonne.
for (const [riq, area] of [["identita", "1 / 1 / 2 / 2"], ["risorse", "2 / 1 / 4 / 2"], ["attributi", "1 / 2 / 3 / 3"], ["tratti", "3 / 2 / 4 / 3"], ["abilita", "1 / 3 / 3 / 4"], ["magick", "1 / 4 / 3 / 5"], ["tiro", "3 / 3 / 4 / 5"]]) {
  assert.match(css, new RegExp(`\\.wod5e-mage-riq-${riq} \\{ grid-area: ${area.replace(/\//g, "\\/")}; \\}`), `area di ${riq}`);
}
assert.doesNotMatch(css, /wod5e-mage-riq-salute|wod5e-mage-riq-poteri|wod5e-mage-ambito-livell|wod5e-mage-riq-grimorio/);
// Gli otto riquadri stanno in stat.hbs nell'ordine delle colonne; la testata è vuota e nascosta.
assert.match(statTemplate, /stat-identita\.hbs[\s\S]*stat-risorse\.hbs[\s\S]*stat-attributi\.hbs[\s\S]*stat-tratti\.hbs[\s\S]*stat-abilita\.hbs[\s\S]*stat-magick\.hbs[\s\S]*stat-tiro\.hbs/);
assert.doesNotMatch(statTemplate, /stat-grimorio\.hbs/);
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
// I pallini degli Ambiti (20/9 sera): come quelli delle Sfere, oro pieno fino al
// livello, niente viola; a riposo al 40%; «Scegli la lettura» al loro posto
// finché una lettura non c'è; la pastiglia della lettura sotto il nome, la
// lettura del livello centrata e in grassetto.
assert.match(css, /\.wod5e-mage-pallino-ambito\.lit\s*\{[^}]*background:\s*var\(--mage-dot-color\);/s);
assert.doesNotMatch(css, /\.wod5e-mage-pallino-ambito\.scelta/);
assert.match(css, /\.wod5e-mage-riga-ambito:not\(\.scelta\):not\(:hover\) \.wod5e-mage-ambito-pallini\s*\{\s*opacity: 0\.4;/);
// «Scegli la lettura» non c'è più (21/9): i pallini ci sono sempre, la lettura è facoltativa.
assert.doesNotMatch(css, /\.wod5e-mage-ambito-scegli/);
// La seconda linea con la lettura non c'è più (23/9): la pastiglia sta dopo il nome, sulla stessa linea.
assert.doesNotMatch(css, /\.wod5e-mage-ambito-lettura/);
assert.match(css, /\.wod5e-mage-riga-nome-ambito > \.wod5e-mage-ambito-tag\s*\{\s*margin-left: 2px;/);
assert.match(css, /\.wod5e-mage-ambito-tag\s*\{[^}]*text-transform: uppercase;/s);
assert.match(css, /\.wod5e-mage-riga-tastini\s*\{[^}]*margin-left:\s*auto;/s);
assert.match(css, /\.wod5e-mage-cassetto-modi\s*\{[^}]*flex-wrap:\s*wrap;/s);
assert.doesNotMatch(css, /wod5e-mage-cassetto-ambito|wod5e-mage-livello-lettura/);
assert.match(css, /\.wod5e-mage-riga\.aperto > \.wod5e-mage-cassetto\s*\{\s*display: flex;/);
// Le tendine degli Ambiti non si aprono al sorvolo: nessuna regola :hover su con-tendina.
assert.doesNotMatch(css, /con-tendina[^{]*:hover[^{]*\.wod5e-mage-cassetto/);
assert.doesNotMatch(css, /wod5e-mage-riga-modo/);
assert.doesNotMatch(css, /pastiglia-livello/);
assert.match(css, /\.wod5e-mage-riga\.con-cassetto:hover > \.wod5e-mage-cassetto[^{]*\{\s*display: flex;/);
assert.match(css, /\.wod5e-mage-riga\.cassetto-su > \.wod5e-mage-cassetto\s*\{[^}]*bottom: calc\(100% - 2px\);[^}]*top: auto;/s);
// La tendina dei poteri (20/9 sera) si apre col clic, non al sorvolo: una colonna di caselle.
assert.doesNotMatch(css, /con-cassetto:hover > \.wod5e-mage-cassetto-poteri/);
assert.match(css, /\.wod5e-mage-cassetto-poteri\s*\{[^}]*flex-direction: column;/s);
assert.match(css, /\.wod5e-mage-casella\.spuntata::before \{\s*content: "\\2713";/);
// La misura del testo: una scala sul contenuto della finestra.
assert.match(css, /\.window-content\s*\{\s*position: relative;\s*zoom: var\(--mage-scala, 1\);/);
// La scheda minimizzata resta richiudibile; sotto i 1280 le quattro colonne si
// accavallavano (16/9), e la minima segue la scala dello schermo (16/9 sera).
assert.match(
  css,
  /\.sheet:not\(\.minimized\)\s*\{[^}]*min-width:\s*calc\(1280px \* var\(--mage-scala, 1\)\);/s
);
// La finestra parte della misura che sta nello schermo e si riadatta al ridimensionamento.
assert.match(sheetSource, /_initializeApplicationOptions\(options\) \{[\s\S]*misuraFinestra\(game\.settings\.get\(MODULE_ID, SCALA_SETTING\), window\)/);
assert.match(sheetSource, /static adattaAlloSchermo\(\)[\s\S]*sporgeDalloSchermo\(app\.position, window\)[\s\S]*app\.setPosition\(misuraFinestra\(scala, window\)\)/);
assert.match(sheetSource, /window\.addEventListener\("resize"/);
assert.match(sheetSource, /viewport: window \}\);\n\s+MageActorSheet\.agganciaSchermo\(\);/);
// La pagina si vede solo quando è la linguetta accesa; senza Areté niente
// tre tasti. Il Tiro largo due colonne (23/9): a sinistra la catena a
// pillole con la × (torna), a destra Riserva, Soglia e Dadi col meno e il più.
assert.match(css, /\.wod5e-mage-stat:not\(\.active\)\s*\{\s*display: none;/);
assert.match(css, /\.wod5e-mage-stat\.active\s*\{[^}]*display: flex;/s);
const tiroTemplate = stat("stat-tiro.hbs");
// Tre colonne (Blue, 27/9): chi dà dadi con le opzioni, chi dà la soglia, i numeri.
assert.match(tiroTemplate, /wod5e-mage-tiro-corpo[\s\S]*wod5e-mage-tiro-sinistra[\s\S]*wod5e-mage-tiro-colonna-testa">\{\{localize "WOD5E_MAGE\.Tiro\.CatenaDadi"\}\}[\s\S]*wod5e-mage-tiro-catena wod5e-mage-tiro-catena-dadi[\s\S]*\{\{#each tiro\.pillsDadi as \|pill\|\}\}[\s\S]*wod5e-mage-pillola tipo-\{\{pill\.kind\}\}[\s\S]*data-action="tiroPill" data-kind="\{\{pill\.kind\}\}" data-id="\{\{pill\.id\}\}"[\s\S]*wod5e-mage-tiro-opzioni[\s\S]*data-action="tiroPrize"[\s\S]*data-action="tiroQuintessence"[\s\S]*data-action="tiroSforza"[\s\S]*wod5e-mage-tiro-centro[\s\S]*wod5e-mage-tiro-colonna-testa">\{\{localize "WOD5E_MAGE\.Tiro\.CatenaSoglia"\}\}[\s\S]*wod5e-mage-tiro-catena wod5e-mage-tiro-catena-soglia[\s\S]*\{\{#each tiro\.pillsSoglia as \|pill\|\}\}[\s\S]*wod5e-mage-tiro-destra[\s\S]*wod5e-mage-tiro-numero riserva[\s\S]*data-action="tiroExtra" data-delta="-1"[\s\S]*\{\{tiro\.riserva\}\}[\s\S]*data-action="tiroExtra" data-delta="1"[\s\S]*wod5e-mage-tiro-numero soglia[\s\S]*data-action="tiroDifficulty" data-delta="-1"[\s\S]*data-action="tiroDifficulty" data-delta="1"[\s\S]*wod5e-mage-tiro-numero dadi[\s\S]*data-action="tiroDadi" data-delta="-1"[\s\S]*\{\{tiro\.dice\}\}[\s\S]*data-action="tiroDadi" data-delta="1"[\s\S]*data-action="tiroRoll" data-kind="\{\{kind\.kind\}\}"/);
assert.doesNotMatch(tiroTemplate, /wod5e-mage-tiro-conto|wod5e-mage-tiro-slot|wod5e-mage-tiro-extra"/);
assert.match(css, /\.wod5e-mage-tiro-corpo\s*\{[^}]*grid-template-columns: minmax\(0, 1\.1fr\) minmax\(0, 0\.7fr\) minmax\(0, 1\.2fr\);/s);
assert.match(css, /\.wod5e-mage-tiro-tasti \.wod5e-mage-tiro-tasto-testimoni\s*\{[^}]*grid-column: 1 \/ -1;/s, "il tasto dei testimoni largo, sotto gli altri due");
assert.match(sheetSource, /tiroDadi: onTiroDadi/);
assert.match(stat("grimorio.hbs"), /data-action="grimorioClose"/);
// Le Risorse a righe (Blue, 20/9): Salute e Saggezza col tastino che apre il
// ventaglio (lo stesso cassettoToggle degli Ambiti, solo col clic), poi
// Quintessenza e Paradosso col meno e il più ai lati del numero, la Ruota
// nuda, le Condizioni in fondo.
const risorseRiq = stat("stat-risorse.hbs");
assert.match(risorseRiq, /wod5e-mage-risorse-righe[\s\S]*parts\/salute\.hbs[\s\S]*wod5e-mage-riga-saggezza con-ventaglio[\s\S]*wod5e-mage-ventaglio-tasto" data-action="ventaglioToggle"[\s\S]*wod5e-mage-saggezza-track wod5e-mage-inchiostro-fila[\s\S]*wod5e-mage-inchiostro-cella" data-state="\{\{cell\.state\}\}" data-action="wisdomCellChange" data-index="\{\{cell\.index\}\}"[\s\S]*wod5e-mage-ventaglio wod5e-mage-ventaglio-sei[\s\S]*style="--voce: 5" data-action="wisdomRoll"[\s\S]*style="--voce: 4" data-action="wisdomSegna"[\s\S]*style="--voce: 1" data-action="wisdomCura"[\s\S]*style="--voce: 2" data-action="wisdomReset"[\s\S]*style="--voce: 0" data-action="wisdomResourceChange" data-resource-action="minus"[\s\S]*style="--voce: 3" data-action="wisdomResourceChange" data-resource-action="plus"[\s\S]*wod5e-mage-riga-conto quintessence[\s\S]*data-resource="quintessence" data-delta="-1"[\s\S]*magickTrack\.quintessence[\s\S]*data-resource="quintessence" data-delta="1"[\s\S]*wod5e-mage-riga-conto paradox[\s\S]*data-action="paradoxBurst"[\s\S]*data-resource="paradox" data-delta="-1"[\s\S]*magickTrack\.paradox[\s\S]*data-resource="paradox" data-delta="1"[\s\S]*parts\/stat-ruota\.hbs[\s\S]*parts\/stat-condizioni\.hbs/);
assert.doesNotMatch(risorseRiq, /wod5e-mage-saggezza-tendina|parts\/wisdom\.hbs|squareCounterChange|resource-counter-step/);
// La ruota della Salute (23/9): il meno a sinistra (0), il più a destra (3), Riposo e Relax sopra (5, 4), Danni e Reset sotto (1, 2).
const saluteRiga = stat("salute.hbs");
for (const [voce, action] of [["5", 'data-action="saluteRiposo"'], ["4", 'data-action="saluteRelax"'], ["2", 'data-action="saluteReset"'], ["1", 'data-action="saluteDanni"'], ["0", 'data-action="saluteExtraChange" data-delta="-1"'], ["3", 'data-action="saluteExtraChange" data-delta="1"']]) {
  assert.ok(saluteRiga.includes(`style="--voce: ${voce}" ${action}`), `ruota della Salute: ${action} al posto ${voce}`);
}
assert.doesNotMatch(stat("stat-ruota.hbs"), /wod5e-mage-magick-end/);
// La Ruota dentro le Risorse: il mezzo cerchio vero senza tasti né conti né
// etichetta, i Dettagli della Ruota chiusi e centrati.
const risorse = stat("stat-ruota.hbs");
assert.match(risorse, /A150 150 0 0 1[\s\S]*preserveAspectRatio="xMidYMid meet"|preserveAspectRatio="xMidYMid meet"[\s\S]*A150 150 0 0 1/);
assert.match(risorse, /wod5e-mage-magick-track-stat[\s\S]*wod5e-mage-magick-node/);
assert.doesNotMatch(risorse, /wod5e-mage-ruota-tasto|wod5e-mage-ruota-conti|wod5e-mage-ruota-conto|wod5e-mage-riq-occhiello|magickBalanceChange/);
assert.doesNotMatch(css, /\.wod5e-mage-magick-track-stat \.wod5e-mage-ruota-tasto/);
assert.match(css, /\.wod5e-mage-ruota-dettagli > summary \{\s*text-align: center;/);
assert.match(risorse, /<details class="wod5e-mage-ruota-dettagli">[\s\S]*generatedQuintessence[\s\S]*permanentParadox[\s\S]*data-action="contraccolpoNega"[\s\S]*data-action="wheelModeToggle"/);
// La ruota dei comandi (20/9 sera): la sorgente nella riga non si vede mai,
// niente :hover; il resto sta in tests/ventaglio.test.js.
assert.match(css, /\.wod5e-mage-ventaglio \{\s*display: none;/);
assert.doesNotMatch(css, /con-ventaglio[^{]*:hover[^{]*\.wod5e-mage-ventaglio/);
assert.match(sheetSource, /ventaglioToggle: onVentaglioToggle/);
assert.match(sheetSource, /function onCassettoToggle\(event, target\) \{[\s\S]*?closest\?\.\("\.wod5e-mage-riga\.con-tendina, \.wod5e-mage-riga\.con-cassetto"\)/);
assert.doesNotMatch(risorse, /data-action="areteRoll"|wod5e-mage-header-arete/);
// Magick: le Sfere col cassetto dei poteri, gli Ambiti con la lettura e il cassetto dei livelli.
const magickRiq = stat("stat-magick.hbs");
// La Sfera (20/9 sera, cambio di direttiva): niente pallini; il sigillo, il conto
// dei poteri conosciuti, il nome, il tasto del potere che apre la tendina a
// caselle (un potere per riga, la casella spuntata su quello scelto).
assert.match(magickRiq, /wod5e-mage-riga-sfera[^"]*\{\{#if sphere\.poteri\.length\}\} con-tendina[\s\S]*wod5e-mage-sfera-sigillo[\s\S]*wod5e-mage-sfera-conto[^>]*>\{\{sphere\.poteri\.length\}\}<\/b>[\s\S]*wod5e-mage-riga-nome" data-action="tiroSphere"[\s\S]*wod5e-mage-sfera-potere\{\{#if sphere\.potere\}\} pieno\{\{\/if\}\}" data-action="cassettoToggle"[\s\S]*\{\{sphere\.potere\.short\}\}[\s\S]*Stat\.PotereScegli[\s\S]*wod5e-mage-cassetto wod5e-mage-cassetto-poteri[\s\S]*wod5e-mage-potere-voce\{\{#if power\.selected\}\} scelta[\s\S]*role="checkbox" aria-checked="\{\{power\.selected\}\}" data-action="tiroPower" data-power="\{\{power\.id\}\}"[\s\S]*wod5e-mage-casella\{\{#if power\.selected\}\} spuntata[\s\S]*\{\{power\.label\}\}/);
assert.doesNotMatch(magickRiq, /resource-value-step|dotCounterChange|wod5e-mage-pastiglia-potere/);
// L'Ambito (20/9 sera): il nome col chevron se ha più letture (il clic apre la
// tendina delle letture, una pastiglia per lettura), i sette pallini in fondo
// alla testa quando la lettura è scelta (il sorvolo dice livello e lettura),
// sotto la lettura del livello scelto, centrata, con la lettura dell'Ambito in piccolo.
// La riga dell'Ambito (21/9): il nome (tendina delle letture se ne ha più d'una), i sette pallini SEMPRE
// (col tooltip del livello e, se la lettura è scelta, della lettura), la lettura sotto solo se c'è.
assert.match(magickRiq, /wod5e-mage-riga-ambito\{\{#if scope\.multi\}\} con-tendina\{\{\/if\}\}\{\{#if scope\.level\}\} scelta[\s\S]*wod5e-mage-riga-testa[\s\S]*\{\{#if scope\.multi\}\}[\s\S]*wod5e-mage-riga-nome wod5e-mage-riga-nome-ambito\{\{#if scope\.modeChosen\}\} con-lente\{\{\/if\}\}" data-action="cassettoToggle"[\s\S]*\{\{else\}\}[\s\S]*wod5e-mage-riga-nome-fermo[\s\S]*\{\{\/if\}\}\s*<span class="wod5e-mage-ambito-pallini"[\s\S]*wod5e-mage-pallino-ambito\{\{#if step\.lit\}\} lit\{\{\/if\}\}" data-action="tiroScope" data-scope="\{\{scope\.id\}\}" data-level="\{\{step\.value\}\}" data-tooltip="\{\{step\.tip\}\}" data-tooltip-class="wod5e-mage-tooltip-righe"[\s\S]*wod5e-mage-cassetto wod5e-mage-cassetto-modi[\s\S]*wod5e-mage-pastiglia wod5e-mage-pastiglia-modo\{\{#if mode\.selected\}\} scelta\{\{\/if\}\}" data-action="scopeMode" data-scope="\{\{scope\.id\}\}" data-mode="\{\{mode\.id\}\}"/);
assert.doesNotMatch(magickRiq, /wod5e-mage-ambito-scegli|ScopeModeChoose/);
// La pastiglia della lente dentro il nome (23/9), col nome corto, al posto
// del chevron quando la lente è scelta; niente seconda linea.
assert.match(magickRiq, /wod5e-mage-riga-nome-ambito\{\{#if scope\.modeChosen\}\} con-lente\{\{\/if\}\}" data-action="cassettoToggle"[^>]*><span>\{\{scope\.label\}\}<\/span>\{\{#if scope\.modeChosen\}\}<small class="wod5e-mage-ambito-tag" title="\{\{scope\.modeLabel\}\}">\{\{scope\.modeShort\}\}<\/small>\{\{else\}\}<i class="fa-solid fa-chevron-down" aria-hidden="true"><\/i>\{\{\/if\}\}<\/button>/);
assert.doesNotMatch(magickRiq, /wod5e-mage-ambito-lettura/);
assert.doesNotMatch(magickRiq, /wod5e-mage-riga-modo|wod5e-mage-cassetto-ambito|wod5e-mage-livello|title="\{\{step\.reading\}\}"/);
assert.doesNotMatch(magickRiq, /riga-ambito con-cassetto/);
const sheetJs = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheetJs, /scopeMode: onScopeMode,\n\s+cassettoToggle: onCassettoToggle/);
assert.match(sheetJs, /addEventListener\("pointerdown"[\s\S]*classList\.remove\("aperto"\)/);
assert.match(sheetJs, /modes: scopeModesOf\(this\)/);
assert.doesNotMatch(magickRiq, /wod5e-mage-ambito-livello/);
// Il Grimorio dentro i Tratti a schede (23/9): le schede sono i filtri di specie in testa,
// gli incantesimi sono righe della stessa lista con data-kind="grimorio", il libro apre la pagina.
const trattiRiq = stat("stat-tratti.hbs");
assert.match(trattiRiq, /wod5e-mage-riq-tratti" data-scheda="\{\{trattiScheda\}\}"[\s\S]*wod5e-mage-riq-title wod5e-mage-riq-schede[\s\S]*data-filters="tratti"[\s\S]*wod5e-mage-filtro wod5e-mage-scheda\{\{#if kind\.active\}\} active\{\{\/if\}\}" role="tab" data-kind="\{\{kind\.id\}\}"[\s\S]*data-filter="tratti"[\s\S]*data-action="tiroGrimorio"[\s\S]*data-list="tratti"[\s\S]*data-action="tiroTrait"[\s\S]*\{\{#each poteriFiltri as \|p\|\}\}[\s\S]*wod5e-mage-riga-potere-filtro\{\{#if p\.chosen\}\} scelta\{\{\/if\}\}" data-action="tiroPower" data-power="\{\{p\.pick\}\}" data-sphere="\{\{p\.sphere\}\}" data-any="\{\{p\.any\}\}" data-kind="\{\{p\.kind\}\}" data-search="\{\{p\.search\}\}"[\s\S]*wod5e-mage-riga-effetto[\s\S]*data-action="tiroIncantesimo" data-row="\{\{spell\.id\}\}" data-kind="grimorio"/);
// Niente righe di vuoto in corsivo (Blue, 25/9).
assert.doesNotMatch(trattiRiq, /wod5e-mage-tratti-vuoto|wod5e-mage-riq-vuoto/);
assert.doesNotMatch(trattiRiq, /data-kind=""|Stat\.Tutti|data-list="incantesimi"/);
assert.match(sheetJs, /SCHEDE_TRATTI = Object\.freeze\(\["tratti", "equipment", "attivi", "passivi", "other", "grimorio"\]\)/);
assert.match(sheetJs, /context\.trattiScheda = schedaTratti\(this\._filters\?\.tratti\)/);
assert.match(sheetJs, /box\.dataset\.scheda = kind/);
// Le Abilità: il tasto accanto al + le mette tutte in fila.
const abilitaTemplate = stat("stat-abilita.hbs");
assert.match(abilitaTemplate, /data-action="skillsFlatToggle"[\s\S]*data-action="customSkillAdd"/);
assert.match(abilitaTemplate, /\{\{#if group\.label\}\}<span class="wod5e-mage-riq-occhiello">/);
// Le Specializzazioni stanno in riga sotto l'Abilità (Blue, 26/9: via la finestra e la tendina): la riga è
// `con-specializzazioni` e va a capo, sotto le pastiglie e la casella che ne scrive una; niente tendina.
// La freccetta in fondo (26/9 sera) apre e chiude la riga (`aperta`), che nasce aperta con la Specializzazione nel Tiro.
assert.match(abilitaTemplate, /wod5e-mage-riga-abilita\{\{#if skill\.chosen\}\} scelta\{\{\/if\}\}\{\{#if skill\.spec\.slots\}\} con-specializzazioni\{\{#if skill\.spec\.chosen\}\} aperta\{\{\/if\}\}\{\{\/if\}\}" data-skill="\{\{skill\.id\}\}">\s*<button type="button" class="wod5e-mage-riga-nome" data-action="tiroSkill"[\s\S]*<button type="button" class="wod5e-mage-abilita-apri\{\{#if skill\.spec\.scritte\.length\}\} piena\{\{\/if\}\}" data-action="specialtyToggle" aria-expanded="[\s\S]*<div class="wod5e-mage-specializzazioni" role="group"[\s\S]*data-action="tiroSpecialty"[\s\S]*data-specialty-add="\{\{skill\.id\}\}"/);
assert.doesNotMatch(abilitaTemplate, /con-cassetto|con-tendina|cassettoToggle|wod5e-mage-cassetto/);
// Le tendine delle righe si ricordano per chiave e il render le riapre (Blue, 25/9 sera: coi pallini «si chiudono da sole»).
for (const [file, key] of [["stat-magick.hbs", 'data-cassetto="sfera-{{sphere.id}}"'], ["stat-magick.hbs", 'data-cassetto="ambito-{{scope.id}}"'], ["strumento-riga.hbs", 'data-cassetto="strumento-{{row.id}}"']]) {
  assert.ok(readFileSync(new URL(`../templates/actor/parts/${file}`, import.meta.url), "utf8").includes(key), `${file}: ${key}`);
}
assert.match(sheetJs, /const aperte = \(this\._cassettiAperti \?\?= new Set\(\)\);[\s\S]*aperte\[open \? "add" : "delete"\]\(row\.dataset\.cassetto\)/);
assert.match(sheetJs, /function riapriCassetti\(sheet\)[\s\S]*row\.classList\.add\("aperto"\);\s*flipCassetto\(row\);/);
assert.match(sheetJs, /riapriPoteri\(this\);\s*riapriCassetti\(this\);/);
// Le Specializzazioni in riga (26/9): la scheda prepara la riga di ogni Abilità con `rigaSpecializzazioni`.
assert.match(sheetJs, /const spec = rigaSpecializzazioni\(skill\.id, skill\.value, specialtyNames\[skill\.id\] \?\? \[\], \{ chosen: tiro\.skill === key \? tiro\.specialty \?\? "" : "" \}\);/);
// La carta del potere in chat va a capo (Blue, 25/9: «mi esce tagliata»): colonna sola, non la griglia del tiro.
assert.match(css, /\.wod5e-mage-roll-card\.wod5e-mage-potere-chat \{\s*display: flex;\s*flex-direction: column;/);
assert.doesNotMatch(magickTemplate, /wod5e-mage-scopes\b|wod5e-mage-persistent-resources/);
// La pagina Magick (21/9, dal mock): a sinistra le Sfere e le Magick in atto,
// a destra i poteri conosciuti, in fondo la tendina della tavola degli Ambiti.
// Le Specialità delle Sfere, il selettore a cerchietti e la colonna Influenza non ci sono più.
assert.match(css, /\.wod5e-mage-magick-layout\s*\{[^}]*"sinistra poteri"\s*"ambiti ambiti";[^}]*grid-template-columns: 440px minmax\(0, 1fr\);/s);
assert.match(css, /\.wod5e-mage-magick-sinistra\s*\{[^}]*grid-area: sinistra;/s);
assert.match(css, /\.wod5e-mage-riq-conosciuti\s*\{\s*grid-area: poteri;/);
assert.match(css, /\.wod5e-mage-riq-ambiti-tavola\s*\{\s*grid-area: ambiti;/);
assert.match(css, /\.wod5e-mage-riq\.wod5e-mage-riq-pagina\s*\{[^}]*overflow: visible;/s);
assert.doesNotMatch(css, /wod5e-mage-sphere-specialt|wod5e-mage-sphere-selector|wod5e-mage-sphere-choice|wod5e-mage-sphere-influence|wod5e-mage-spheres-panel|wod5e-mage-ongoing-magick-grid|grid-area:\s*table;/);
assert.match(magickTemplate, /wod5e-mage-magick-sinistra[\s\S]*wod5e-mage-riq-sfere[\s\S]*wod5e-mage-ongoing-magick[\s\S]*wod5e-mage-riq-conosciuti[\s\S]*<details class="wod5e-mage-riq wod5e-mage-riq-pagina wod5e-mage-riq-ambiti-tavola">[\s\S]*parts\/scope-table\.hbs/);
assert.doesNotMatch(magickTemplate, /SphereSpecialties|Spheres\.Influence|Spheres\.Selector|wod5e-mage-sphere-choice/);
// La lista delle Sfere (Blue, 25/9 sera): come nella prima pagina, niente livelli. Il segno dell'accesso
// apre e chiude il Dominio, poi il sigillo, il conto dei poteri conosciuti, il nome, la casetta; le altre spente.
assert.match(magickTemplate, /wod5e-mage-riga wod5e-mage-riga-sfera-pagina\{\{#if sphere\.family\}\} family\{\{\/if\}\}">\s*<button type="button" class="wod5e-mage-sfera-accesso acceso" data-action="sphereSelectionChange" data-sphere="\{\{sphere\.id\}\}" data-selected="true" title="\{\{localize 'WOD5E_MAGE\.Poteri\.DominioChiudi'\}\}"[^>]*><img class="wod5e-mage-riga-icona wod5e-mage-sfera-sigillo"[\s\S]*?wod5e-mage-sfera-conto\{\{#unless sphere\.conto\}\} vuoto\{\{\/unless\}\}"[\s\S]*?wod5e-mage-riga-nome wod5e-mage-riga-nome-fermo[\s\S]*?wod5e-mage-sfera-casa\{\{#if sphere\.family\}\} on\{\{\/if\}\}" data-action="familySphereToggle"[\s\S]*Poteri\.AltreSfere[\s\S]*wod5e-mage-riga-sfera-pagina spenta">\s*<button type="button" class="wod5e-mage-sfera-accesso" data-action="sphereSelectionChange" data-sphere="\{\{sphere\.id\}\}" data-selected="false" title="\{\{localize 'WOD5E_MAGE\.Poteri\.DominioApri'\}\}"[^>]*><img class="wod5e-mage-riga-icona wod5e-mage-sfera-sigillo"/, "il sigillo è il tasto (Blue, 25/9 sera)");
assert.doesNotMatch(magickTemplate, /fa-circle-check|fa-circle"/);
assert.doesNotMatch(magickTemplate, /sphereDotChange|resource-value-step|wod5e-mage-sfera-prendi/);
assert.doesNotMatch(readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8"), /sphereDotChange/);
// I poteri conosciuti (24/9 sera): una lista sola, senza la divisione per Sfere; in testa il conto, il
// Catalogo completo e Aggiungi (la finestra con le pastiglie delle Sfere); la riga del potere a colonne
// (sigillo della Sfera, pallino, nome, le pastiglie del tipo, Amalgama, costo, la freccia che è un tasto),
// il testo che si apre, «Usa» o «Mostra», Modifica e Togli. Niente tendina sotto la Sfera, niente sezioni.
assert.match(magickTemplate, /wod5e-mage-riq-conosciuti[\s\S]*data-action="potereCatalogoCompleto"[\s\S]*wod5e-mage-poteri-aggiungi" data-action="potereCatalogo"[\s\S]*wod5e-mage-poteri-lista[\s\S]*\{\{#each poteriLista as \|p\|\}\}/);
assert.doesNotMatch(magickTemplate, /wod5e-mage-cassetto-catalogo|potereDaCatalogo|poteriSezioni|wod5e-mage-poteri-penna|cassettoToggle" title="\{\{localize 'WOD5E_MAGE\.Poteri\.AggiungiHint'/);
assert.match(magickTemplate, /wod5e-mage-potere-riga\{\{#if p\.editing\}\} aperta modifica\{\{\/if\}\}" data-row="\{\{p\.id\}\}"[\s\S]*wod5e-mage-potere-testa[\s\S]*wod5e-mage-potere-sfera" src="\{\{p\.sphereIcon\}\}"[\s\S]*wod5e-mage-potere-pallino[\s\S]*wod5e-mage-potere-nome" data-action="potereApri"[\s\S]*wod5e-mage-potere-tipi[\s\S]*wod5e-mage-potere-tipo attivo[\s\S]*wod5e-mage-potere-tipo passivo[\s\S]*wod5e-mage-potere-amalgama[\s\S]*wod5e-mage-potere-costo[\s\S]*<button type="button" class="wod5e-mage-potere-usa\{\{#unless p\.usa\.ok\}\} spento\{\{\/unless\}\}\{\{#unless p\.tipi\.attivo\}\} mostra\{\{\/unless\}\}" data-action="potereUsa" data-row="\{\{p\.id\}\}"[\s\S]*Poteri\.Mostra[\s\S]*<button type="button" class="wod5e-mage-potere-chevron" data-action="potereApri"[\s\S]*wod5e-mage-potere-spiega[\s\S]*name="flags\.wod5e-mage\.poteri\.\{\{p\.id\}\}\.name"[\s\S]*name="flags\.wod5e-mage\.poteri\.\{\{p\.id\}\}\.dot" data-dtype="Number"[\s\S]*\.type"[\s\S]*\.cost"[\s\S]*\.text"[\s\S]*\.amalgam"[\s\S]*\.amalgamText"[\s\S]*\.flavor"[\s\S]*\{\{#each p\.blocchi as \|b\|\}\}[\s\S]*wod5e-mage-potere-blocco\{\{#if b\.kind\}\} \{\{b\.kind\}\}\{\{\/if\}\}[\s\S]*wod5e-mage-potere-blocco-titolo[\s\S]*\{\{#each b\.voci as \|v\|\}\}[\s\S]*<b>\{\{v\.chiave\}\}:<\/b>[\s\S]*\{\{#if p\.conAmalgama\}\}[\s\S]*wod5e-mage-potere-con\{\{#unless p\.amalgamOwned\}\} manca\{\{\/unless\}\}"[\s\S]*wod5e-mage-potere-fondo[\s\S]*data-action="potereModifica" data-row="\{\{p\.id\}\}"[\s\S]*data-action="potereTogli" data-row="\{\{p\.id\}\}"/);
// «Usa» sta nella testa, non nel fondo (Blue, 25/9: senza aprire la tendina); il testo è a blocchi, non un paragrafo solo.
assert.doesNotMatch(magickTemplate, /wod5e-mage-potere-fondo">\s*\{\{!--[\s\S]*?--\}\}\s*<button type="button" class="wod5e-mage-potere-usa/);
assert.doesNotMatch(magickTemplate, /<p class="wod5e-mage-potere-testo"><span class="wod5e-mage-potere-k">\{\{localize "WOD5E_MAGE\.Poteri\.CosaFa"\}\}<\/span>\{\{#if p\.text\}\}/);
assert.match(css, /\.wod5e-mage-potere-testa\s*\{[^}]*display: grid;[^}]*grid-template-columns: 22px 20px minmax\(0, 1fr\) auto 24px minmax\(0, 110px\) auto 18px;/s);
assert.match(css, /\.wod5e-mage-potere-riga\.aperta > \.wod5e-mage-potere-spiega\s*\{\s*display: flex;/);
const sheetPoteri = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheetPoteri, /potereNuovo: onPotereNuovo,\n\s+potereDaCatalogo: onPotereDaCatalogo,\n[\s\S]{0,160}potereCatalogo: onPotereCatalogo,\n\s+potereCatalogoCompleto: onPotereCatalogoCompleto,\n\s+potereModifica: onPotereModifica,\n\s+potereTogli: onPotereTogli,\n\s+potereApri: onPotereApri,/);
assert.match(sheetPoteri, /Object\.assign\(context, preparePoteriPagina\(actor, this, \{/);
assert.doesNotMatch(sheetPoteri, /prepareSphereSpecialties|loadSpherePowers/);

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
assert.match(abilita, /skillGroups[\s\S]*data-action="tiroSkill" data-key="\{\{skill\.key\}\}"[\s\S]*data-action="essentialSkillDotChange"[\s\S]*wod5e-mage-specializzazioni[\s\S]*data-action="tiroSpecialty"[\s\S]*data-specialty-add="\{\{skill\.id\}\}"/);
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

// L'Esperienza a due colonne (Blue, 25/9: «gli spazi sono molto sfasati»): a sinistra il conto, le prese e il
// listino; a destra le spese con le proposte. Sotto i 900 px tutto in colonna.
assert.match(css, /\.wod5e-mage-esperienza-layout \{[^}]*grid-template-areas:\s*"conto spese"\s*"prese spese"\s*"listino spese";[^}]*grid-template-columns: minmax\(0, 0\.85fr\) minmax\(0, 1\.15fr\);/s);
console.log("Esperienza a due colonne: ok");
