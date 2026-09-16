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
  // La Potenza in tre righe (6/9): il Peso dice quanto pesa ciò che muovi,
  // l'Epicità quanto è grande l'impresa (scala alternativa), i Danni sono
  // l'Areté più il numero (sigillo e numero, niente casella).
  { id: "potency", scope: "potency", label: "WOD5E_MAGE.Scopes.PotencyWeight", sublabel: "WOD5E_MAGE.Scopes.Sub.potency", layout: "text" },
  { id: "potencyEpic", scope: "potency", label: "WOD5E_MAGE.Scopes.PotencyEpic", sublabel: "WOD5E_MAGE.Scopes.Sub.potencyEpic", layout: "text" },
  { id: "potencyDamage", scope: "potency", label: "WOD5E_MAGE.Scopes.PotencyDamage", sublabel: "WOD5E_MAGE.Scopes.Sub.potencyDamage", arete: true, layout: "symbol-number" },
  { id: "duration", scope: "duration", label: "WOD5E_MAGE.Scopes.DurationPlay", sublabel: "WOD5E_MAGE.Scopes.Sub.duration", icons: true, layout: "symbol-number" },
  {
    id: "durationNarrative",
    scope: "duration",
    label: "WOD5E_MAGE.Scopes.DurationNarrative",
    sublabel: "WOD5E_MAGE.Scopes.Sub.durationNarrative",
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
  // Le Condizioni in due letture (6/9): quante ne infliggi, e il Debuff,
  // che sale di potenza a ogni gradino.
  { id: "conditions", scope: "conditions", label: "WOD5E_MAGE.Scopes.conditions", sublabel: "WOD5E_MAGE.Scopes.Sub.conditions", faIcon: "fa-solid fa-list-check", layout: "symbol-number" },
  { id: "conditionsDebuff", scope: "conditions", label: "WOD5E_MAGE.Scopes.ConditionsDebuff", sublabel: "WOD5E_MAGE.Scopes.Sub.conditionsDebuff", layout: "text" },
  // La Complessità (6/9): da «assente» a «livello contratto».
  { id: "conditionsComplexity", scope: "conditions", label: "WOD5E_MAGE.Scopes.ConditionsComplexity", sublabel: "WOD5E_MAGE.Scopes.Sub.conditionsComplexity", layout: "text" },
  { id: "range", scope: "range", label: "WOD5E_MAGE.Scopes.range", layout: "text" },
  // La Precisione in due letture (6/9): il Dettaglio (quanto è piccolo ciò
  // che cerchi) e l'Informazione (quanto pesa saperla nella trama). Parla per
  // frasi: carattere piccolo, per non allargare le colonne.
  { id: "precision", scope: "precision", label: "WOD5E_MAGE.Scopes.PrecisionDetail", sublabel: "WOD5E_MAGE.Scopes.Sub.precision", layout: "text", small: true },
  { id: "precisionInfo", scope: "precision", label: "WOD5E_MAGE.Scopes.PrecisionInfo", sublabel: "WOD5E_MAGE.Scopes.Sub.precisionInfo", layout: "text", small: true }
]);

/** Colonne della tavola: i sette livelli di un Ambito. */
export const SCOPE_TABLE_STEPS = 7;

/** La Durata si scrive col numero e il simbolo del tempo (dal manuale). */
const DURATION_ICONS = Object.freeze({
  1: "tempo_turno",
  2: "tempo_scena",
  3: "tempo_scena",
  4: "tempo_sessione",
  5: "tempo_sessione",
  6: "tempo_storia",
  7: "tempo_cronaca"
});

/**
 * La tavola degli Ambiti (6/9): gli Ambiti in ordine alfabetico (nella
 * lingua del giocatore: `localize`), e chi ha più letture (la Potenza tre,
 * la Durata due) porta una riga di titolo e sotto le sue righe, col solo
 * nome della lettura. `groups` è quel che il template stampa; `rows` resta
 * la lista piatta delle righe coi loro gradini.
 */
export function prepareScopeTable(localize = (key) => key) {
  const steps = Array.from({ length: SCOPE_TABLE_STEPS }, (_, index) => index + 1);
  const rows = SCOPE_TABLE_ROWS.map((row) => ({
    id: row.id,
    scope: row.scope,
    label: row.label,
    sublabel: row.sublabel ?? "",
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
  }));

  // Per Ambito, in ordine alfabetico del nome tradotto.
  const byScope = new Map();
  for (const row of rows) {
    if (!byScope.has(row.scope)) byScope.set(row.scope, []);
    byScope.get(row.scope).push(row);
  }
  const groups = [...byScope.entries()]
    .map(([scope, scopeRows]) => {
      const label = `WOD5E_MAGE.Scopes.${scope}`;
      const many = scopeRows.length > 1;
      return {
        scope,
        label,
        name: String(localize(label)),
        // Con una lettura sola la riga porta il nome dell'Ambito; con più
        // letture c'è la riga di titolo e sotto le letture col loro nome.
        header: many,
        // Quante righe occupa il nome dell'Ambito nella prima colonna (7/9).
        span: scopeRows.length,
        rows: scopeRows
          .map((row) => ({ ...row, title: many ? (row.sublabel || row.label) : label }))
          // Le letture in ordine alfabetico della lingua (6/9).
          .sort((a, b) => many ? String(localize(a.title)).localeCompare(String(localize(b.title))) : 0)
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return { steps, rows, groups };
}

/**
 * Le letture di ogni livello, per il dialogo del tiro (9/9): a destra dei
 * pallini di un Ambito compare la voce della tavola del livello scelto
 * («Città» al quarto pallino dell'Area). Chi ha più letture le porta tutte,
 * nell'ordine della tavola, col nome della lettura davanti. La Durata in
 * gioco parla in turni, scene, sessioni; i Danni sono l'Areté più il numero:
 * con l'Areté del personaggio (`arete`) il conto è già fatto («6 danni» per
 * Areté 3 al terzo pallino), e la somma sta nella nota (`hint`).
 * Torna { [ambito]: sette liste di { sub, text, hint } }.
 */
export function scopeReadings(localize = (key) => key, { arete = null } = {}) {
  const { groups } = prepareScopeTable(localize);
  const out = {};
  for (const group of groups) {
    out[group.scope] = Array.from({ length: SCOPE_TABLE_STEPS }, (_, index) => group.rows.map((row) => ({
      sub: group.header ? String(localize(row.title)) : "",
      ...scopeReadingText(row, index + 1, localize, arete)
    })));
  }
  return out;
}

/**
 * Le letture di ogni Ambito una per una (la «modalità» dell'Ambito, Blue
 * 16/9 sera): per ogni Ambito le sue righe della tavola nell'ordine in cui
 * sono scritte (la Potenza: Peso, Epicità, Danni; la Durata: in gioco,
 * narrativa; le Condizioni: quante, Debuff, Complessità; la Precisione:
 * Dettaglio, Informazione), ognuna col suo nome e le sette letture. La
 * prima è quella che la scheda mostra finché il giocatore non gira il
 * tastino; chi ha una lettura sola non ha nome né tastino.
 * Torna { [ambito]: [{ id, label, readings: [sette testi] }] }.
 */
export function scopeModes(localize = (key) => key, { arete = null } = {}) {
  const { rows } = prepareScopeTable(localize);
  const out = {};
  for (const row of rows) {
    (out[row.scope] ??= []).push({
      id: row.id,
      label: row.sublabel ? String(localize(row.sublabel)) : "",
      readings: Array.from({ length: SCOPE_TABLE_STEPS }, (_, index) => scopeReadingText(row, index + 1, localize, arete).text)
    });
  }
  return out;
}

/** La lettura scelta di un Ambito: quella chiesta se c'è, altrimenti la prima. */
export function scopeModeOf(modes, scope, chosen) {
  const options = modes?.[scope] ?? [];
  return options.find((option) => option.id === chosen) ?? options[0] ?? null;
}

/** La lettura dopo quella scelta, in giro: il tastino gira così. */
export function nextScopeMode(modes, scope, chosen) {
  const options = modes?.[scope] ?? [];
  if (!options.length) return null;
  const index = Math.max(options.findIndex((option) => option.id === chosen), 0);
  return options[(index + 1) % options.length];
}

/** «+3» → 3; «+0» → 0; un testo qualunque → null. */
export function damageBonus(label) {
  const match = /^\s*([+-]?\s*\d+)\s*$/.exec(String(label ?? ""));
  return match ? Number(match[1].replace(/\s+/g, "")) : null;
}

function scopeReadingText(row, step, localize, arete = null) {
  const cell = row.cells[step - 1] ?? {};
  const label = String(localize(cell.label ?? `WOD5E_MAGE.Scopes.Table.${row.id}.${step}`));
  const areteLabel = String(localize("WOD5E_MAGE.Arete.Label"));
  // I Danni: l'Areté più il numero. Con l'Areté del personaggio, il totale (10/9).
  if (cell.arete) {
    const bonus = damageBonus(label);
    const value = Number.isFinite(Number(arete)) && arete !== null && bonus !== null ? Math.max(Math.trunc(Number(arete)), 0) : null;
    if (value !== null) return { text: String(localize("WOD5E_MAGE.Scopes.DamageReading")).replace("{n}", String(value + bonus)), hint: `${areteLabel} ${value} ${label}` };
    return { text: `${areteLabel} ${label}`, hint: "" };
  }
  // La Durata in gioco: numero e unità.
  if (cell.icon) return { text: `${label} ${localize(`WOD5E_MAGE.Scopes.DurationUnits.${step}`)}`, hint: "" };
  return { text: label, hint: "" };
}
