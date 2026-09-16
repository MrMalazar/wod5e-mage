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
 *
 * Accanto, a sinistra, la misura del testo (Blue, 16/9 sera): piccolo,
 * medio, grande. Non è un corpo unico per tutto: è una scala (`zoom` sul
 * contenuto della finestra), così ogni cosa (il nome, l'Areté, un
 * titoletto come Appartenenza) tiene la sua misura e cresce o cala in
 * proporzione. Anche questa è un'impostazione del giocatore (`sheetScale`).
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

/* ------------------------------------------------------------------ */
/* La misura del testo.                                                */
/* ------------------------------------------------------------------ */
export const SCALA_SETTING = "sheetScale";
export const SCALE = Object.freeze(["piccolo", "medio", "grande"]);
export const SCALA_PREDEFINITA = "medio";
/** Il fattore di ogni misura: lo zoom sul contenuto della finestra. */
export const SCALA_FATTORI = Object.freeze({ piccolo: 0.88, medio: 1, grande: 1.12 });
/** La classe del tasto nella barra del titolo. */
export const SCALA_TASTO_CLASSE = "wod5e-mage-scala";
/** L'azione del tasto (data-action). */
export const SCALA_AZIONE = "scalaToggle";
const SCALA_ETICHETTE = Object.freeze({ piccolo: "WOD5E_MAGE.Scala.Piccolo", medio: "WOD5E_MAGE.Scala.Medio", grande: "WOD5E_MAGE.Scala.Grande" });

export function normalizeScala(value) {
  return SCALE.includes(value) ? value : SCALA_PREDEFINITA;
}

/** Il fattore della misura (1 per il medio). */
export function scalaFattore(scala) {
  return SCALA_FATTORI[normalizeScala(scala)];
}

/** Il giro del tasto: piccolo, medio, grande, e da capo. */
export function altraScala(scala) {
  const index = SCALE.indexOf(normalizeScala(scala));
  return SCALE[(index + 1) % SCALE.length];
}

/** Com'è il tasto: dice la misura di adesso e dove porta il clic. */
export function scalaTasto(scala) {
  const current = normalizeScala(scala);
  return { current, next: altraScala(current), label: SCALA_ETICHETTE[current], nextLabel: SCALA_ETICHETTE[altraScala(current)] };
}

/**
 * Veste la finestra con la misura: la variabile `--mage-scala` sul frame
 * (il CSS la usa come zoom del contenuto) e, se c'è, il tasto in testata.
 */
export function applicaScala(element, scala, { localize = (key) => key, format = (key, data) => `${key} ${JSON.stringify(data)}` } = {}) {
  if (!element) return;
  const current = normalizeScala(scala);
  element.style?.setProperty?.("--mage-scala", String(scalaFattore(current)));
  element.dataset && (element.dataset.scala = current);
  const button = element.querySelector?.(`.${SCALA_TASTO_CLASSE}`);
  if (!button) return;
  const { label, nextLabel } = scalaTasto(current);
  const text = format("WOD5E_MAGE.Scala.Tasto", { current: localize(label), next: localize(nextLabel) });
  button.setAttribute("aria-label", text);
  button.setAttribute("data-tooltip", text);
}
