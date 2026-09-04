/**
 * I sei Ambiti della Magick. Nel ramo A si dichiarano a livelli da 1 a 7 e
 * fanno soglia con la Sfera più alta; la scheda mostra la tavola dei livelli
 * e la riga del Dono della Sfera d'Affinità (in attesa delle Specialità).
 */
export const SCOPES = Object.freeze([
  "potency",
  "duration",
  "area",
  "targets",
  "conditions",
  "range"
]);

/** I tracciati su cui il Dono lavora quando non lavora su un Ambito. */
export const GIFT_TRACKS = Object.freeze(["health", "willpower", "wisdom"]);

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
 * Il Dono della Sfera d'Affinità: la quarta abilità del compendio parla o di
 * un Ambito o di un tracciato. I successi automatici sono pari ai PALLINI
 * della Sfera affine (canone di Blue del 28/8), non all'Areté.
 */
export function prepareAffinityGift(affinitySphere, sphereRating = 0) {
  if (!affinitySphere) return null;

  const abilities = Array.isArray(affinitySphere.abilities) ? affinitySphere.abilities : [];
  const gift = abilities.find((ability) => SCOPES.includes(ability.id))
    ?? abilities.find((ability) => GIFT_TRACKS.includes(ability.id));
  if (!gift) return null;

  const successes = Math.max(Math.trunc(Number(sphereRating)) || 0, 0);

  if (SCOPES.includes(gift.id)) {
    return {
      kind: "scope",
      isScope: true,
      id: gift.id,
      label: `WOD5E_MAGE.Scopes.${gift.id}`,
      successes,
      sphereName: String(affinitySphere.name ?? ""),
      sphereImg: String(affinitySphere.img ?? "")
    };
  }

  return {
    kind: "track",
    isScope: false,
    id: gift.id,
    label: String(gift.label ?? gift.id),
    successes: 0,
    sphereName: String(affinitySphere.name ?? ""),
    sphereImg: String(affinitySphere.img ?? "")
  };
}

/**
 * La tavola degli Ambiti: sei righe per sette livelli (Potenza a danni per
 * livello, dal 4/9/2026). La riga del Dono viene segnata per accendersi.
 */
export function prepareScopeTable({ gift = null } = {}) {
  const steps = Array.from({ length: SCOPE_TABLE_STEPS }, (_, index) => index + 1);

  return {
    steps,
    rows: SCOPES.map((id) => {
      const isGiftRow = gift?.kind === "scope" && gift.id === id;
      return {
        id,
        label: `WOD5E_MAGE.Scopes.${id}`,
        gift: isGiftRow,
        cells: steps.map((step) => ({
          step,
          label: `WOD5E_MAGE.Scopes.Table.${id}.${step}`,
          // Il Dono accende solo i gradini coperti dai pallini della Sfera.
          gift: isGiftRow && step <= (gift?.successes ?? 0),
          icon: id === "duration"
            ? `modules/wod5e-mage/assets/icons/sheet/tempo/${DURATION_ICONS[step]}.svg`
            : ""
        }))
      };
    })
  };
}
