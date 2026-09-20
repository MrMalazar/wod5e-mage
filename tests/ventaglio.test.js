import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { classeRuota, passoRuota, posizioneRuota } from "../scripts/ventaglio.js";

// Sei comandi ogni 60°, tre ogni 120°.
assert.equal(passoRuota(6), 60);
assert.equal(passoRuota(3), 120);
assert.equal(classeRuota(6), "sei");
assert.equal(classeRuota(3), "tre");

// Il centro del tastino nello spazio del contenuto, senza zoom.
const senza = posizioneRuota({ left: 300, top: 400, width: 20, height: 20 }, { left: 100, top: 50, width: 1340 }, 1340);
assert.deepEqual(senza, { x: 210, y: 360, zoom: 1 });
// Con la misura grande (zoom 1.12) il rettangolo sullo schermo è scalato: si divide.
const grande = posizioneRuota({ left: 100 + 224, top: 50 + 336, width: 22.4, height: 22.4 }, { left: 100, top: 50, width: 1340 * 1.12 }, 1340);
assert.ok(Math.abs(grande.x - 210) < 0.01 && Math.abs(grande.y - 310) < 0.01 && Math.abs(grande.zoom - 1.12) < 0.001);
// Senza larghezza di layout (il contenuto non è ancora misurato) niente divisione.
assert.equal(posizioneRuota({ left: 10, top: 10, width: 0, height: 0 }, { left: 0, top: 0, width: 0 }, 0).zoom, 1);

// La scheda: il tastino apre la ruota (ventaglioToggle), la ruota si appende
// al contenuto della finestra, si chiude col tasto al centro, con un clic
// altrove, con Esc e a ogni render.
const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
assert.match(sheet, /ventaglioToggle: onVentaglioToggle,\n\s+ventaglioChiudi: onVentaglioChiudi/);
assert.match(sheet, /function onVentaglioToggle\(event, target\)[\s\S]*querySelector\("\.window-content"\)[\s\S]*posizioneRuota\(target\.getBoundingClientRect\(\), content\.getBoundingClientRect\(\), content\.offsetWidth\)[\s\S]*content\.appendChild\(ruota\)/);
assert.match(sheet, /function chiudiRuote\(sheet\)/);
assert.match(sheet, /_onRender\(context, options\) \{\n\s+super\._onRender\?\.\(context, options\);\n\s+chiudiRuote\(this\);/);
assert.match(sheet, /event\.key === "Escape"[^\n]*chiudiRuote/);
const salute = readFileSync(new URL("../templates/actor/parts/salute.hbs", import.meta.url), "utf8");
assert.match(salute, /wod5e-mage-ventaglio-tasto" data-action="ventaglioToggle"/);
assert.match(salute, /wod5e-mage-ventaglio wod5e-mage-ventaglio-sei[\s\S]*Salute\.DanniBreve[\s\S]*Salute\.ExtraMenoBreve[\s\S]*Salute\.ExtraPiuBreve/);
const risorse = readFileSync(new URL("../templates/actor/parts/stat-risorse.hbs", import.meta.url), "utf8");
assert.match(risorse, /wod5e-mage-riga-saggezza con-ventaglio[\s\S]*data-action="ventaglioToggle"[\s\S]*wod5e-mage-ventaglio wod5e-mage-ventaglio-tre/);
// Il CSS: la sorgente nella riga non si vede mai; la ruota ha il disco di
// fondo, i comandi da 48 px in cerchio, il tasto al centro.
const css = readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8");
assert.match(css, /\.wod5e-mage-ventaglio \{\s*display: none;/);
assert.match(css, /\.wod5e-mage-ruota-comandi::before \{[^}]*border-radius: 50%;/s);
assert.match(css, /\.wod5e-mage-ruota-comandi > \.wod5e-mage-ventaglio-voce \{[^}]*height: 48px;[^}]*transform: rotate\(var\(--angolo\)\) translate\(var\(--raggio\)\) rotate\(calc\(-1 \* var\(--angolo\)\)\);[^}]*width: 48px;/s);
assert.match(css, /\.wod5e-mage-ruota-comandi\.tre > \.wod5e-mage-ventaglio-voce \{\s*--passo: 120deg;/);
assert.match(css, /\.wod5e-mage-ruota-chiudi \{/);
assert.match(css, /\.window-content \{[^}]*position: relative;/s);

console.log("Ruota dei comandi: test passati.");
