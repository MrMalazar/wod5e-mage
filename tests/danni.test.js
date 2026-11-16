import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dadiDeiDanni, danniDellaCarta, leggiDanni, LENTE_DANNI, renderDanni, renderDanniButton } from "../scripts/danni.js";
import { danniMagick } from "../scripts/nemico.js";

// Il dado dei danni (il Sistema, voce Potenza): un dado per livello di Potenza con la lente Danni;
// la vuota non fa danni, la scintilla ne fa 2, la stellina 4. L'Areté non c'entra.
const dado = (result) => ({ result, active: true });

assert.equal(LENTE_DANNI, "potencyDamage");
assert.deepEqual([dadiDeiDanni(3), dadiDeiDanni(3, "potencyDamage"), dadiDeiDanni(0), dadiDeiDanni(9), dadiDeiDanni("x")], [3, 3, 0, 7, 0]);
assert.deepEqual([dadiDeiDanni(3, "potencyWeight"), dadiDeiDanni(5, "potencyInfluence"), dadiDeiDanni(2, undefined)], [0, 0, 2], "il Peso e l'Influenza non feriscono; senza lente scelta vale la prima, i Danni");

// Quattro dadi: una vuota, due scintille e una stellina fanno 2 + 2 + 4 = 8 danni.
assert.deepEqual(leggiDanni([dado(3), dado(6), dado(9), dado(10)]), { dadi: 4, vuote: 1, scintille: 2, stelline: 1, danni: 8 });
assert.deepEqual(leggiDanni([dado(1), dado(5)]), { dadi: 2, vuote: 2, scintille: 0, stelline: 0, danni: 0 });
assert.equal(leggiDanni([dado(10), dado(10)]).danni, 8, "le stelline dei danni non fanno coppia: 4 l'una");
assert.equal(leggiDanni([]).danni, 0);

// Il nemico: i dadi dei danni di un suo effetto sono la Potenza, non più l'Areté più la Potenza.
assert.deepEqual([danniMagick(3), danniMagick(0), danniMagick(12)], [3, 0, 7]);

// Il tasto compare sotto un lancio riuscito che porta dadi dei danni.
const carta = { sistema: true, danni: 3, total: 4, difficulty: 3 };
assert.equal(danniDellaCarta(carta), 3);
assert.equal(danniDellaCarta({ ...carta, total: 2 }), 0, "a lancio fallito niente danni");
assert.equal(danniDellaCarta({ ...carta, total: 2, priced: true }), 3, "riuscito a un prezzo: i danni ci sono");
assert.equal(danniDellaCarta({ ...carta, total: 0, forced: true }), 3, "indulgendo l'incantesimo riesce");
assert.equal(danniDellaCarta({ ...carta, danni: 0 }), 0);
assert.equal(danniDellaCarta({ ...carta, skill: true }), 0);
assert.equal(danniDellaCarta({}), 0);

// La carta in chat e il tasto, coi testi italiani.
const it = JSON.parse(readFileSync(new URL("../lang/it.json", import.meta.url), "utf8"));
const localize = (key) => key.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), it) ?? key;
const format = (key, data = {}) => String(localize(key)).replace(/\{(\w+)\}/g, (_, k) => String(data[k]));
const html = renderDanni({ titolo: "Fulmine", risultati: [dado(3), dado(7), dado(10)] }, localize, format);
assert.match(html, /wod5e-mage-danni-carta/);
assert.match(html, /<b>Danni<\/b><small>Fulmine<\/small>/);
assert.equal((html.match(/wod5e-mage-danni-dado/g) ?? []).length, 3);
assert.match(html, /wod5e-mage-danni-dado vuoto/);
assert.match(html, /magick-scintilla\.svg" alt="2"/);
assert.match(html, /magick-stellina\.svg" alt="4"/);
assert.match(html, /<div class="wod5e-mage-danni-totale"><b>6<\/b><span>danni · dadi 3: scintille 1, stelline 1<\/span><\/div>/);
assert.doesNotMatch(renderDanni({ titolo: "<b>x</b>", risultati: [] }, localize, format), /<small><b>/, "il titolo non porta codice in chat");
assert.match(renderDanniButton(3, localize, format), /data-danni="tira" title="Dadi dei danni della Potenza: 3\.[^"]*">Tira i danni <b>3<\/b><\/button>/);

// La macchina: la carta del lancio porta i dadi, il tasto è registrato, il nemico li tira dalla sua carta.
const tiro = readFileSync(new URL("../scripts/tiro-scheda.js", import.meta.url), "utf8");
assert.match(tiro, /danni: dadiDeiDanni\(tiro\.scopes\?\.potency, scopeModeOf\(tavolaAmbiti, "potency", modiAmbiti\.potency\)\?\.id\),/);
assert.match(readFileSync(new URL("../scripts/main.js", import.meta.url), "utf8"), /registerDanni\(\);/);
const nemicoChat = readFileSync(new URL("../scripts/nemico-chat.js", import.meta.url), "utf8");
assert.match(nemicoChat, /await tiraDanni\(\{ dadi, actor: [^}]*bersaglio \}\);/);
assert.match(readFileSync(new URL("../styles/wod5e-mage.css", import.meta.url), "utf8"), /\.wod5e-mage-roll-actions > \.wod5e-mage-danni-button\s*\{/);
for (const lang of ["it", "en"]) {
  const strings = JSON.parse(readFileSync(new URL(`../lang/${lang}.json`, import.meta.url), "utf8")).WOD5E_MAGE;
  for (const key of ["Titolo", "Tira", "Hint", "Conto", "Applica", "Applicati"]) assert.equal(typeof strings.Danni[key], "string", `${lang} Danni.${key}`);
  for (const key of ["DadiDanni", "DadiDanniCarta", "TiraDanni"]) assert.equal(typeof strings.Nemico[key], "string", `${lang} Nemico.${key}`);
  assert.equal(strings.Nemico.DanniMagick, undefined, "i danni non sono più l'Areté più la Potenza");
}

console.log("Dado dei danni: test passati.");
