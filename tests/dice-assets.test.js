import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const assets = [
  "paradosso-scintilla.svg",
  "paradosso-occhio-completo.svg",
  "paradosso-occhio-vuoto.svg"
];

for (const name of assets) {
  const svg = readFileSync(
    new URL(`../assets/icons/dice/chat/${name}`, import.meta.url),
    "utf8"
  );

  assert.match(svg, /^<svg\b/);
  assert.match(svg, /viewBox="0 0 256 256"/);
  assert.match(svg, /stroke="#d0524a"/);
  assert.match(svg, /<path\b/);
  assert.match(svg, /<\/svg>\s*$/);
}

assert.match(
  readFileSync(
    new URL("../assets/icons/dice/chat/paradosso-occhio-completo.svg", import.meta.url),
    "utf8"
  ),
  /<circle\b/
);

console.log("Paradox SVG dice assets passed.");
