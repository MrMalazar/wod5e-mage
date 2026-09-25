// Ricopia il motore del Vathrâ nel modulo (Blue, 25/9): prende il sorgente
// di MAGHI M6 (03_FABBRICA/vathra/sorgenti/vathra-core.js), lo lascia com'è e
// ci aggiunge in fondo l'export del modulo ES. Si usa dopo una correzione al
// lessico:
//   node tools/copia-vathra.mjs "<percorso>/vathra-core.js"
// poi `node tests/vathra.test.js` per vedere che niente si è rotto.
import { readFileSync, writeFileSync } from "node:fs";

const sorgente = process.argv[2];
if (!sorgente) {
  console.error("Serve il percorso di vathra-core.js.");
  process.exit(1);
}
const testa = [
  "/*",
  " * Il motore del Vathrâ: copia di 03_FABBRICA/vathra/sorgenti/vathra-core.js",
  " * (MAGHI M6), identica fino all'ultima riga; qui in fondo c'è solo l'export",
  " * del modulo ES. Una correzione al lessico si fa nel sorgente, poi si ricopia",
  " * qui (tools/copia-vathra.mjs) e si rilanciano le prove (tests/vathra.test.js).",
  " */"
].join("\n");
const corpo = readFileSync(sorgente, "utf8").replace(/\s+$/, "");
if (!/const VATHRA = \(function \(\) \{/.test(corpo)) {
  console.error("Non sembra il motore del Vathrâ: manca «const VATHRA = (function () {».");
  process.exit(1);
}
const destinazione = new URL("../scripts/vathra/vathra-core.js", import.meta.url);
writeFileSync(destinazione, `${testa}\n${corpo}\n\nexport { VATHRA };\n\nexport default VATHRA;\n`);
console.log("Motore ricopiato in scripts/vathra/vathra-core.js");
