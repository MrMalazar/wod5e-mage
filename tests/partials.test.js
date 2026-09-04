import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";

// Ogni partial del modulo usato in un template deve stare nelle `templates` di
// una PART: se manca, la scheda non si apre (successo il 4/9 notte con appartenenza.hbs).
const sheet = readFileSync(new URL("../scripts/sheets/mage-actor-sheet.js", import.meta.url), "utf8");
const registered = new Set([...sheet.matchAll(/\$\{MODULE\}\/(parts\/[a-z0-9-]+\.hbs)/g)].map((m) => m[1]));
const dir = new URL("../templates/actor/", import.meta.url);
const files = [
  ...readdirSync(dir).filter((name) => name.endsWith(".hbs")).map((name) => name),
  ...readdirSync(new URL("parts/", dir)).filter((name) => name.endsWith(".hbs")).map((name) => `parts/${name}`)
];
for (const file of files) {
  const source = readFileSync(new URL(file, dir), "utf8");
  for (const match of source.matchAll(/\{\{>\s*"modules\/wod5e-mage\/templates\/actor\/(parts\/[a-z0-9-]+\.hbs)"/g)) {
    assert.ok(registered.has(match[1]), `${file} usa ${match[1]} che non è registrato nelle PARTS`);
  }
}

console.log("Partials tests passed.");
