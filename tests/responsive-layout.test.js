import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8");

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

// I blocchi della tab Statistiche devono adattarsi per wrapping, non tramite
// una griglia rigida che si spezza quando la finestra diventa stretta.
assert.match(
  css,
  /\.wod5e-mage-tratti\s*>\s*\.stats-content\s*\{[^}]*display:\s*flex;[^}]*flex-wrap:\s*wrap;/s
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

// La Ruota occupa sempre una riga propria sotto gli altri riquadri.
assert.match(
  css,
  /\.wod5e-mage-ruota-cell\s*\{[^}]*flex:\s*0\s+0\s+100%;[^}]*order:\s*3;/s
);

console.log("Responsive Mage sheet layout tests passed.");
