/**
 * I sei Ambiti della Magick. Nel ramo A si dichiarano a livelli da 1 a 7 e
 * fanno soglia con la Sfera più alta; la scheda mostra la tavola dei livelli.
 */
export const SCOPES = Object.freeze([
  "potency",
  "duration",
  "area",
  "targets",
  "conditions",
  "range",
  "precision"
]);

/**
 * Il simbolo di ogni Ambito: sta a sinistra del nome nel dialogo del tiro e
 * sopra i dadi in chat, col livello dichiarato.
 */
export const SCOPE_ICONS = Object.freeze({
  potency: "fa-solid fa-burst",
  duration: "fa-solid fa-hourglass-half",
  area: "fa-solid fa-map",
  targets: "fa-solid fa-user",
  conditions: "fa-solid fa-list-check",
  range: "fa-solid fa-location-crosshairs",
  precision: "fa-solid fa-bullseye"
});

/**
 * Le righe della tavola: gli Ambiti, con la Durata sdoppiata in gioco
 * (scene, sessioni, storia, cronaca) e narrativa (sul calendario): al
 * lancio si dichiara su quale delle due corre.
 */
export const SCOPE_TABLE_ROWS = Object.freeze([
  // La Potenza: il danno è l'Areté più il numero del livello, e la cella
  // mostra il sigillo dell'Areté, il numero e la casella di Salute vuota.
  // Ogni riga dichiara le sue colonne invisibili (layout): simbolo, numero,
  // testo o casella. Dentro una colonna della tavola le celle si allineano.
  // La Potenza in due righe: l'Effetto dice quanto è grande l'impresa, i
  // Danni sono l'Areté più il numero (sigillo e numero, niente casella).
  { id: "potency", scope: "potency", label: "WOD5E_MAGE.Scopes.PotencyEffect", layout: "text" },
  { id: "potencyDamage", scope: "potency", label: "WOD5E_MAGE.Scopes.PotencyDamage", arete: true, layout: "symbol-number" },
  { id: "duration", scope: "duration", label: "WOD5E_MAGE.Scopes.DurationPlay", icons: true, layout: "symbol-number" },
  {
    id: "durationNarrative",
    scope: "duration",
    label: "WOD5E_MAGE.Scopes.DurationNarrative",
    faIcons: ["fa-solid fa-sun", "fa-solid fa-calendar-week", "fa-solid fa-calendar-days", "fa-solid fa-leaf", "fa-solid fa-calendar-check", "fa-solid fa-hourglass-half", "fa-solid fa-infinity"],
    layout: "symbol-text"
  },
  {
    id: "area",
    scope: "area",
    label: "WOD5E_MAGE.Scopes.area",
    faIcons: ["fa-solid fa-door-open", "fa-solid fa-building", "fa-solid fa-house-chimney", "fa-solid fa-city", "fa-solid fa-map", "fa-solid fa-earth-europe", "fa-solid fa-globe"],
    layout: "symbol-text"
  },
  { id: "targets", scope: "targets", label: "WOD5E_MAGE.Scopes.targets", faIcon: "fa-solid fa-user", layout: "symbol-number" },
  { id: "conditions", scope: "conditions", label: "WOD5E_MAGE.Scopes.conditions", faIcon: "fa-solid fa-list-check", layout: "symbol-number" },
  { id: "range", scope: "range", label: "WOD5E_MAGE.Scopes.range", layout: "text" },
  // La Precisione parla per frasi: carattere piccolo, per non allargare le colonne.
  { id: "precision", scope: "precision", label: "WOD5E_MAGE.Scopes.precision", layout: "text", small: true }
]);

/** Colonne della tavola: i sette livelli di un Ambito. */
export const SCOPE_TABLE_STEPS = 7;

/** La Durata si scrive col numero e il simbolo del tempo (dal manuale). */
const DURATION_ICONS = Object.freeze({
  1: "tempo_scena",
  2: "tempo_scena",
  3: "tempo_scena",
  4: "tempo_sessione",
  5: "tempo_sessione",
  6: "tempo_storia",
  7: "tempo_cronaca"
});

/**
 * La tavola degli Ambiti: sei righe per sette livelli (Potenza a danni per
 * livello, dal 4/9/2026).
 */
export function prepareScopeTable() {
  const steps = Array.from({ length: SCOPE_TABLE_STEPS }, (_, index) => index + 1);

  return {
    steps,
    rows: SCOPE_TABLE_ROWS.map((row) => ({
      id: row.id,
      scope: row.scope,
      label: row.label,
      layout: row.layout,
      small: Boolean(row.small),
      cells: steps.map((step) => {
        const label = `WOD5E_MAGE.Scopes.Table.${row.id}.${step}`;
        return {
          step,
          label,
          layout: row.layout,
          // Le colonne invisibili: dove va il testo della cella.
          number: row.layout.includes("number") && !(Boolean(row.arete) && step === 1),
          text: row.layout.includes("text"),
          // La Potenza: sigillo dell'Areté, numero, casella vuota.
          arete: Boolean(row.arete),
          // Al primo livello la Potenza è l'Areté e basta: niente numero.
          hideLabel: Boolean(row.arete) && step === 1,
          faIcon: row.faIcons ? row.faIcons[step - 1] : (row.faIcon ?? ""),
          icon: row.icons
            ? `modules/wod5e-mage/assets/icons/sheet/tempo/${DURATION_ICONS[step]}.svg`
            : ""
        };
      })
    }))
  };
}
