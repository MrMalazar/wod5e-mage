/**
 * L'icona propria di un oggetto (23/9). Nella pagina Tratti la riga di un
 * Background, un Pregio o un Difetto mostra l'immagine dell'oggetto (il
 * Rifugio ha la sua, dall'archivio); la lettera nel disco (B, P, D) resta
 * solo per chi ha l'icona generica di Foundry o del sistema. Blue, 23/9:
 * «non mi esce più la piccola icona del rifugio» (la 1.1.0 l'aveva
 * sostituita con la lettera).
 */

/** Le icone generiche: con queste vale la lettera, non l'immagine. */
export const ICONE_GENERICHE = Object.freeze([
  "icons/svg/item-bag.svg",
  "icons/svg/mystery-man.svg",
  "systems/wod5e/assets/icons/items/item-default.svg",
  "systems/wod5e/assets/icons/items/feature.svg",
  "systems/wod5e/assets/icons/items/boon.svg"
]);

const GENERICHE = new Set(ICONE_GENERICHE);

/** Vero se l'immagine è dell'oggetto e non un segnaposto. */
export function iconaPropria(img) {
  const path = typeof img === "string" ? img.trim() : "";
  if (!path) return false;
  return !GENERICHE.has(path.replace(/^\/+/, ""));
}

/** L'helper di Handlebars: {{#if (mageIconaPropria item.img)}}. */
export function registraHelperIcone(handlebars) {
  handlebars?.registerHelper?.("mageIconaPropria", (img) => iconaPropria(img));
}
