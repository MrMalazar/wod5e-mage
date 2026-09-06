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

// Ogni template deve chiudere i suoi blocchi: un {{else}} fuori posto o un
// {{/if}} in più rompono Handlebars e la scheda non si apre (successo il 6/9
// col Grimorio per Sfere).
function walk(dirUrl) {
  return readdirSync(dirUrl, { withFileTypes: true }).flatMap((entry) => {
    const url = new URL(entry.name + (entry.isDirectory() ? "/" : ""), dirUrl);
    return entry.isDirectory() ? walk(url) : (entry.name.endsWith(".hbs") ? [url] : []);
  });
}
function checkBlocks(source, name) {
  const stack = [];
  const tags = source.replace(/\{\{!--[\s\S]*?--\}\}/g, "").matchAll(/\{\{~?\s*([#\/])\s*([a-zA-Z]+)|\{\{~?\s*(else)\s*(if|unless)?\b/g);
  for (const tag of tags) {
    if (tag[3]) {
      const top = stack[stack.length - 1];
      assert.ok(top, `${name}: {{else}} fuori da un blocco`);
      // {{else if}} incatena; un secondo {{else}} nudo no.
      assert.ok(!top.hadElse, `${name}: due {{else}} nello stesso {{#${top.name}}}`);
      if (!tag[4]) top.hadElse = true;
      continue;
    }
    if (tag[1] === "#") stack.push({ name: tag[2], hadElse: false });
    else {
      const open = stack.pop();
      assert.equal(open?.name, tag[2], `${name}: {{/${tag[2]}}} chiude {{#${open?.name ?? "niente"}}}`);
    }
  }
  assert.equal(stack.length, 0, `${name}: blocchi aperti ${stack.map((b) => b.name).join(", ")}`);
}
for (const url of walk(new URL("../templates/", import.meta.url))) {
  checkBlocks(readFileSync(url, "utf8"), url.pathname.split("/templates/")[1]);
}

console.log("Partials tests passed.");
