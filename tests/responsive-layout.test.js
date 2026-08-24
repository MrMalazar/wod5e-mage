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
  /\.wod5e-mage-tratti\s*>\s*\.stats-content\s*\{[^}]*display:\s*grid;[^}]*"main side"[^}]*"arcana side";/s
);
assert.match(
  css,
  /@container\s*\(max-width:\s*900px\)[\s\S]*"main main"[\s\S]*"arcana side"/
);
assert.match(
  css,
  /@container\s*\(max-width:\s*800px\)[\s\S]*"main"[\s\S]*"arcana"[\s\S]*"side"/
);
assert.match(
  css,
  /\.skills-attributes\s*>\s*\.stats-container\s*>\s*\.stats-content\s*\{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);/s
);

// Il wrapping è ammesso fra i riquadri, mai fra nome e pallini della stessa
// voce. La finestra aperta si ferma prima di raggiungere quella soglia.
assert.match(
  css,
  /\.stats-list\s*>\s*:is\(\.attribute,\s*\.skill\)\s*\{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+max-content;[^}]*white-space:\s*nowrap;/s
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
// soltanto gli Ambiti vengono ridotti di circa il 25%.
assert.match(
  css,
  /\.wod5e-mage-arcana-cell\s*\{[^}]*display:\s*flex;[^}]*grid-area:\s*arcana;/s
);
assert.match(
  css,
  /\.wod5e-mage-arcana-cell\s*>\s*\.wod5e-mage-scopes\s*\{[^}]*zoom:\s*0\.75;/s
);
assert.doesNotMatch(
  css,
  /\.wod5e-mage-ruota-cell[^,{]*\{[^}]*zoom:/s
);
assert.match(traitsTemplate, /parts\/ruota\.hbs[\s\S]*parts\/scopes\.hbs/);
assert.doesNotMatch(magickTemplate, /wod5e-mage-scopes/);

// The affinity section stays below Spheres and Ongoing Magick.
assert.match(
  css,
  /\.wod5e-mage-magick-layout\s*\{[^}]*"resources \."[^}]*"spheres ongoing"[^}]*"affinity affinity";/s
);
assert.match(
  css,
  /\.wod5e-mage-persistent-resources\s*\{[^}]*grid-area:\s*resources;/s
);
assert.match(
  css,
  /\.wod5e-mage-spheres-panel\s*\{[^}]*grid-area:\s*spheres;/s
);
assert.match(
  css,
  /\.wod5e-mage-affinity-sphere\s*\{[^}]*grid-area:\s*affinity;/s
);
assert.match(
  css,
  /\.wod5e-mage-ongoing-magick\s*\{[^}]*grid-area:\s*ongoing;/s
);
assert.match(
  magickTemplate,
  /wod5e-mage-persistent-resources[\s\S]*wod5e-mage-spheres-panel[\s\S]*wod5e-mage-ongoing-magick[\s\S]*wod5e-mage-affinity-sphere/
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

console.log("Responsive Mage sheet layout tests passed.");
