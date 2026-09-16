/**
 * La modalità chiara della scheda (Blue, 16/9): la scheda del Mago coi
 * colori del manuale (01_DECISIONI/stile/Palette_M6.html). Il tema è
 * un'impostazione del giocatore (`sheetTheme`) e si gira dal tasto accanto
 * ai tre pallini della finestra, oltre che dalle Impostazioni.
 *
 * Il tema è solo CSS: la classe `wod5e-mage-chiara` sulla finestra accende
 * il blocco chiaro del foglio di stile, senza render. Qui la parte senza
 * Foundry: i due temi, il giro, il tasto; la finestra la veste
 * `applicaTema`, che tocca solo classi e attributi.
 */
export const TEMA_SETTING = "sheetTheme";
export const TEMA_SCURO = "scuro";
export const TEMA_CHIARO = "chiaro";
export const TEMI = Object.freeze([TEMA_SCURO, TEMA_CHIARO]);
/** La classe sulla finestra che accende il blocco chiaro del CSS. */
export const TEMA_CLASSE = "wod5e-mage-chiara";
/** La classe del tasto nella barra del titolo. */
export const TEMA_TASTO_CLASSE = "wod5e-mage-tema";
/** L'azione del tasto (data-action). */
export const TEMA_AZIONE = "temaToggle";

/** L'icona che porta a ciascun tema: il sole verso il chiaro, la luna verso lo scuro. */
const ICONE = Object.freeze({ [TEMA_SCURO]: "fa-moon", [TEMA_CHIARO]: "fa-sun" });
const ETICHETTE = Object.freeze({ [TEMA_SCURO]: "WOD5E_MAGE.Tema.Scuro", [TEMA_CHIARO]: "WOD5E_MAGE.Tema.Chiaro" });

/** Un valore qualsiasi (anche vecchio o vuoto) riportato a uno dei due temi. */
export function normalizeTema(value) {
  return TEMI.includes(value) ? value : TEMA_SCURO;
}

export function isChiaro(tema) {
  return normalizeTema(tema) === TEMA_CHIARO;
}

/** Il tema opposto: è quello a cui porta il tasto. */
export function altroTema(tema) {
  return isChiaro(tema) ? TEMA_SCURO : TEMA_CHIARO;
}

/**
 * Com'è il tasto col tema corrente: mostra dove porta, non dove si è. Sul
 * tema scuro il sole («Modalità chiara»), sul chiaro la luna («Modalità
 * scura»).
 */
export function temaTasto(tema) {
  const next = altroTema(tema);
  return { next, icon: ICONE[next], label: ETICHETTE[next] };
}

/**
 * Veste la finestra col tema: la classe sul frame e, se c'è, il tasto nella
 * barra del titolo (icona, etichetta, stato). Non renderizza niente.
 * `element` è il frame della scheda (o un finto con classList e
 * querySelector, nelle prove).
 */
export function applicaTema(element, tema, { localize = (key) => key } = {}) {
  if (!element) return;
  const chiaro = isChiaro(tema);
  element.classList.toggle(TEMA_CLASSE, chiaro);
  const button = element.querySelector?.(`.${TEMA_TASTO_CLASSE}`);
  if (!button) return;
  const { icon, label } = temaTasto(tema);
  for (const old of Object.values(ICONE)) button.classList.remove(old);
  button.classList.add(icon);
  const text = localize(label);
  button.setAttribute("aria-label", text);
  button.setAttribute("data-tooltip", text);
  button.setAttribute("aria-pressed", String(chiaro));
}
