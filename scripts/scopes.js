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
  "range"
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
    rows: SCOPES.map((id) => ({
      id,
      label: `WOD5E_MAGE.Scopes.${id}`,
      cells: steps.map((step) => ({
        step,
        label: `WOD5E_MAGE.Scopes.Table.${id}.${step}`,
        icon: id === "duration"
          ? `modules/wod5e-mage/assets/icons/sheet/tempo/${DURATION_ICONS[step]}.svg`
          : ""
      }))
    }))
  };
}
