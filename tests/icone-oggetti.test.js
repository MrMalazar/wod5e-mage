import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { ICONE_GENERICHE, iconaPropria, registraHelperIcone } from "../scripts/icone-oggetti.js";

// L'icona propria di un oggetto (23/9): il Rifugio ha la sua, la lettera
// resta solo col segnaposto.
assert.equal(iconaPropria("modules/wod5e-mage/assets/icons/archivi/bg-rifugio.svg"), true);
for (const generica of ICONE_GENERICHE) assert.equal(iconaPropria(generica), false, generica);
assert.equal(iconaPropria("/icons/svg/item-bag.svg"), false);
assert.equal(iconaPropria(""), false);
assert.equal(iconaPropria(undefined), false);

// L'helper si registra su Handlebars col nome che usa il template.
const registrati = {};
registraHelperIcone({ registerHelper: (name, fn) => { registrati[name] = fn; } });
assert.equal(registrati.mageIconaPropria("a.svg"), true);
registraHelperIcone(undefined);

const template = readFileSync(new URL("../templates/actor/parts/core-features.hbs", import.meta.url), "utf8");
assert.match(template, /\{\{#if \(mageIconaPropria item\.img\)\}\}\s*<a class="wod5e-mage-oggetto-icona clickable" data-action="itemChat" data-item-id="\{\{item\._id\}\}"[^>]*><img src="\{\{item\.img\}\}" alt=""><\/a>\s*\{\{else\}\}\s*<a class="wod5e-mage-lettera clickable"/);
assert.match(readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8"), /registraHelperIcone\(globalThis\.Handlebars\)/);

console.log("Icone degli oggetti: test passati.");
