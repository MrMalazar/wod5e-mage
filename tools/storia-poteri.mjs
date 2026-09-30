// La storia del catalogo dei poteri, per riallineare le schede (Blue, 30/9: i
// poteri rifatti e decisi entrano in Foundry). Per ogni versione passata di
// scripts/data/poteri.js (dal git log) si calcola la copia che una riga avrebbe
// preso dal catalogo (nuovoPotere), campo per campo, come impronta; restano solo
// le impronte diverse da quelle di oggi. Scrive scripts/data/poteri-storia.js,
// che scripts/poteri-allinea.js legge: un campo della riga uguale a un valore di
// ieri si riscrive, uno cambiato a mano resta.
// Uso, nel clone git, dopo node tools/genera-dati.mjs: node tools/storia-poteri.mjs
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const qui = path.dirname(fileURLToPath(import.meta.url));
const radice = path.resolve(qui, "..");
const uscita = path.join(radice, "scripts", "data", "poteri-storia.js");
// La prima volta il file non c'è ancora, e poteri-allinea.js lo importa.
if (!existsSync(uscita)) writeFileSync(uscita, "export const STORIA_POTERI = Object.freeze({});\n", "utf8");
const { CAMPI_ALLINEATI, copiaDelCatalogo, impronta } = await import(pathToFileURL(path.join(radice, "scripts", "poteri-allinea.js")).href);
const { POTERI } = await import(pathToFileURL(path.join(radice, "scripts", "data", "poteri.js")).href);

const git = (...args) => execFileSync("git", args, { cwd: radice, maxBuffer: 64 * 1024 * 1024 }).toString();
const versioni = git("log", "--format=%H", "--", "scripts/data/poteri.js").trim().split("\n").filter(Boolean);
const cartella = mkdtempSync(path.join(tmpdir(), "storia-poteri-"));
const storia = {};
const lette = [];
for (const h of versioni) {
  const file = path.join(cartella, `${h}.mjs`);
  writeFileSync(file, git("show", `${h}:scripts/data/poteri.js`), "utf8");
  let vecchi = null;
  try {
    ({ POTERI: vecchi } = await import(pathToFileURL(file).href));
  } catch {
    // Le versioni di prima del catalogo (le caselle segnaposto) importano altri file: niente da leggere.
    continue;
  }
  if (!Array.isArray(vecchi) || !vecchi.length) continue;
  lette.push(h.slice(0, 7));
  for (const entry of vecchi) {
    if (!entry?.id) continue;
    const copia = copiaDelCatalogo(entry);
    storia[entry.id] ??= {};
    for (const campo of CAMPI_ALLINEATI) {
      storia[entry.id][campo] ??= new Set();
      storia[entry.id][campo].add(impronta(copia[campo]));
    }
  }
}
rmSync(cartella, { recursive: true, force: true });

// Restano solo i valori di ieri: quelli uguali a oggi non servono, e i poteri tolti non si riallineano.
const oggi = new Map(POTERI.map((entry) => [entry.id, copiaDelCatalogo(entry)]));
const pulita = {};
let campi = 0;
for (const [id, perCampo] of Object.entries(storia)) {
  const adesso = oggi.get(id);
  if (!adesso) continue;
  for (const [campo, impronte] of Object.entries(perCampo)) {
    const vecchie = [...impronte].filter((x) => x !== impronta(adesso[campo])).sort();
    if (!vecchie.length) continue;
    pulita[id] ??= {};
    pulita[id][campo] = vecchie;
    campi += 1;
  }
}
writeFileSync(uscita,
  `// GENERATO da tools/storia-poteri.mjs: non si scrive a mano.\n// La storia del catalogo dei poteri (versioni ${lette.join(", ")} di scripts/data/poteri.js):\n// per potere e per campo, le impronte dei valori che il catalogo aveva prima e che oggi non ha più.\n// scripts/poteri-allinea.js riscrive un campo di una riga solo se è ancora uno di questi (o se manca).\nexport const STORIA_POTERI = Object.freeze(${JSON.stringify(pulita, null, 1)});\n`,
  "utf8");
console.log(`storia dei poteri: ${lette.length} versioni lette, ${Object.keys(pulita).length} poteri e ${campi} campi cambiati: scritto scripts/data/poteri-storia.js`);
