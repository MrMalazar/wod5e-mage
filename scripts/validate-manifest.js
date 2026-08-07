import { readFile } from "node:fs/promises";

const manifestUrl = new URL("../module.json", import.meta.url);
const manifest = JSON.parse(await readFile(manifestUrl, "utf8"));
const requiredFields = ["id", "title", "description", "version"];
const missingFields = requiredFields.filter((field) => !manifest[field]);

if (missingFields.length > 0) {
  throw new Error(`Missing required manifest fields: ${missingFields.join(", ")}`);
}

if (manifest.id !== "wod5e-mage") {
  throw new Error("The manifest id must match the module directory name: wod5e-mage.");
}

console.log(`Validated ${manifest.id} v${manifest.version}.`);
