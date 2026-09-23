/**
 * I sette Ambiti della Magick (la tavola del 23/9/2026, «due modi, livello
 * 0»): Bersagli, Condizioni, Durata, Impatto, Portata, Potenza, Precisione.
 * Ogni Ambito si legge con due sottoambiti (le «lenti»), misure alternative
 * della stessa cosa, su una scala da 0 a 7: lo 0 è la base e non costa
 * niente, ogni livello vale il suo numero, la soglia è la somma dei livelli
 * degli Ambiti usati. In Portata e Precisione la prima riga vale nello
 * scontro e la seconda fuori; nella Potenza i Danni servono nello scontro,
 * il Peso in tutti e due; nella Durata la prima riga conta il tempo di
 * gioco, la seconda quello del mondo; Bersagli, Condizioni e Impatto hanno
 * due lenti libere. L'Area non è più un Ambito a sé: è la seconda lente dei
 * Bersagli. L'Impatto (Epicità e Informazione) è nato staccato dalla
 * Potenza il 23/9 sera.
 */
export const SCOPES = Object.freeze([
  "targets",
  "conditions",
  "duration",
  "impact",
  "range",
  "potency",
  "precision"
]);

/** Il livello più alto di un Ambito. */
export const SCOPE_MAX_LEVEL = 7;

/** Quanti Ambiti si alzano sopra lo 0 in un lancio (la tavola del 23/9: al massimo tre). */
export const SCOPES_PER_CAST = 3;

/** Il sovrapprezzo dell'impresa impossibile, dopo il conto (a mano, dal Narratore). */
export const IMPOSSIBLE_SURCHARGE = 5;

/**
 * Il simbolo di ogni Ambito: sta a sinistra del nome nel dialogo del tiro e
 * sopra i dadi in chat, col livello dichiarato.
 */
export const SCOPE_ICONS = Object.freeze({
  targets: "fa-solid fa-user",
  conditions: "fa-solid fa-list-check",
  duration: "fa-solid fa-hourglass-half",
  impact: "fa-solid fa-stamp",
  range: "fa-solid fa-location-crosshairs",
  potency: "fa-solid fa-burst",
  precision: "fa-solid fa-bullseye"
});

/** Gli Ambiti di ieri che oggi sono una lente: l'Area sta nei Bersagli. */
export const SCOPE_ALIASES = Object.freeze({ area: "targets" });

/**
 * Le righe della tavola: due lenti per Ambito, nell'ordine della tavola (la
 * prima è quella che vale se il giocatore non sceglie). Ogni riga dichiara
 * le sue colonne invisibili (layout): simbolo, numero, testo. Dentro una
 * colonna della tavola le celle si allineano.
 */
export const SCOPE_TABLE_ROWS = Object.freeze([
  // Bersagli: l'Effetto conta i bersagli uno per uno (allo 0 uno, poi +N);
  // l'Area prende tutto quello che sta dentro uno spazio.
  { id: "targets", scope: "targets", sublabel: "WOD5E_MAGE.Scopes.Sub.targets", faIcon: "fa-solid fa-user", layout: "symbol-number", zeroText: true },
  {
    id: "targetsArea",
    scope: "targets",
    sublabel: "WOD5E_MAGE.Scopes.Sub.targetsArea",
    faIcons: ["fa-solid fa-location-dot", "fa-solid fa-door-open", "fa-solid fa-building", "fa-solid fa-house-chimney", "fa-solid fa-city", "fa-solid fa-map", "fa-solid fa-earth-europe", "fa-solid fa-globe"],
    layout: "symbol-text"
  },
  // Condizioni: il Malus è la Condizione che l'effetto mette addosso, la
  // Complessità sono le clausole che lo regolano.
  { id: "conditionsMalus", scope: "conditions", sublabel: "WOD5E_MAGE.Scopes.Sub.conditionsMalus", layout: "text", small: true },
  { id: "conditionsComplexity", scope: "conditions", sublabel: "WOD5E_MAGE.Scopes.Sub.conditionsComplexity", layout: "text" },
  // Durata: in gioco (turni, scene, sessioni, storia, cronaca, col simbolo
  // del tempo dal manuale) e nel mondo (dall'ora al permanente).
  { id: "duration", scope: "duration", sublabel: "WOD5E_MAGE.Scopes.Sub.duration", icons: true, layout: "symbol-number" },
  {
    id: "durationWorld",
    scope: "duration",
    sublabel: "WOD5E_MAGE.Scopes.Sub.durationWorld",
    faIcons: ["fa-solid fa-clock", "fa-solid fa-sun", "fa-solid fa-calendar-week", "fa-solid fa-calendar-days", "fa-solid fa-leaf", "fa-solid fa-calendar-check", "fa-solid fa-hourglass-half", "fa-solid fa-infinity"],
    layout: "symbol-text"
  },
  // Impatto: quanto pesa sulla storia quello che l'effetto cambia
  // (Epicità) o fa sapere (Informazione).
  { id: "impactEpic", scope: "impact", sublabel: "WOD5E_MAGE.Scopes.Sub.impactEpic", layout: "text", small: true },
  { id: "impactInfo", scope: "impact", sublabel: "WOD5E_MAGE.Scopes.Sub.impactInfo", layout: "text", small: true },
  // Portata: nello scontro e fuori.
  { id: "range", scope: "range", sublabel: "WOD5E_MAGE.Scopes.Sub.range", layout: "text" },
  { id: "rangeNarrative", scope: "range", sublabel: "WOD5E_MAGE.Scopes.Sub.rangeNarrative", layout: "text" },
  // Potenza: i Danni sono l'Areté (allo 0) più il numero; il Peso dice
  // quanto pesa quello che l'effetto muove.
  { id: "potencyDamage", scope: "potency", sublabel: "WOD5E_MAGE.Scopes.Sub.potencyDamage", arete: true, layout: "symbol-number" },
  { id: "potencyWeight", scope: "potency", sublabel: "WOD5E_MAGE.Scopes.Sub.potencyWeight", layout: "text" },
  // Precisione: nello scontro il punto da colpire, fuori il particolare da
  // trovare o da toccare.
  { id: "precision", scope: "precision", sublabel: "WOD5E_MAGE.Scopes.Sub.precision", layout: "text", small: true },
  { id: "precisionNarrative", scope: "precision", sublabel: "WOD5E_MAGE.Scopes.Sub.precisionNarrative", layout: "text", small: true }
]);

/** Le colonne della tavola: i livelli da 0 a 7. */
export const SCOPE_TABLE_STEPS = SCOPE_MAX_LEVEL;
export const SCOPE_LEVELS = Object.freeze(Array.from({ length: SCOPE_MAX_LEVEL + 1 }, (_, index) => index));

/** La Durata in gioco si scrive col numero e il simbolo del tempo (dal manuale). */
const DURATION_ICONS = Object.freeze({
  0: "tempo_turno",
  1: "tempo_turno",
  2: "tempo_scena",
  3: "tempo_scena",
  4: "tempo_sessione",
  5: "tempo_sessione",
  6: "tempo_storia",
  7: "tempo_cronaca"
});

/** Le righe della tavola con le loro celle, dal livello 0 al 7. */
function tableRows() {
  return SCOPE_TABLE_ROWS.map((row) => ({
    id: row.id,
    scope: row.scope,
    label: `WOD5E_MAGE.Scopes.${row.scope}`,
    sublabel: row.sublabel ?? "",
    layout: row.layout,
    small: Boolean(row.small),
    cells: SCOPE_LEVELS.map((step) => {
      const label = `WOD5E_MAGE.Scopes.Table.${row.id}.${step}`;
      const zeroText = Boolean(row.zeroText) && step === 0;
      return {
        step,
        label,
        hint: `WOD5E_MAGE.Scopes.Hint.${row.id}.${step}`,
        // Allo 0 i Bersagli parlano («Un bersaglio»): la cella si dispone a testo.
        layout: zeroText ? "symbol-text" : row.layout,
        // Le colonne invisibili: dove va il testo della cella. Allo 0 i
        // Bersagli dicono «un bersaglio» a parole; i Danni allo 0 sono
        // l'Areté e basta.
        number: row.layout.includes("number") && !zeroText && !(Boolean(row.arete) && step === 0),
        text: row.layout.includes("text") || zeroText,
        arete: Boolean(row.arete),
        hideLabel: Boolean(row.arete) && step === 0,
        faIcon: row.faIcons ? row.faIcons[step] : (row.faIcon ?? ""),
        icon: row.icons
          ? `modules/wod5e-mage/assets/icons/sheet/tempo/${DURATION_ICONS[step]}.svg`
          : ""
      };
    })
  }));
}

/**
 * La tavola degli Ambiti: gli Ambiti in ordine alfabetico (nella lingua del
 * giocatore: `localize`), ognuno con la riga di titolo e sotto le sue due
 * lenti, nell'ordine della tavola (la prima è quella che vale se non si
 * sceglie: in Portata e Precisione lo scontro). `groups` è quel che il
 * template stampa; `rows` resta la lista piatta delle righe coi loro
 * gradini, da 0 a 7.
 */
export function prepareScopeTable(localize = (key) => key) {
  // La spiegazione della cella («Cosa vuol dire», «Esempi»), se la lingua
  // ce l'ha: sta nel sorvolo della cella.
  const rows = tableRows().map((row) => ({
    ...row,
    cells: row.cells.map((cell) => {
      const hinted = String(localize(cell.hint));
      return { ...cell, tip: hinted === cell.hint ? "" : hinted };
    })
  }));
  const byScope = new Map();
  for (const row of rows) {
    if (!byScope.has(row.scope)) byScope.set(row.scope, []);
    byScope.get(row.scope).push(row);
  }
  const groups = [...byScope.entries()]
    .map(([scope, scopeRows]) => {
      const label = `WOD5E_MAGE.Scopes.${scope}`;
      return {
        scope,
        label,
        desc: `WOD5E_MAGE.Scopes.Desc.${scope}`,
        name: String(localize(label)),
        header: true,
        span: scopeRows.length,
        rows: scopeRows.map((row) => ({ ...row, title: row.sublabel }))
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return { steps: [...SCOPE_LEVELS], rows, groups };
}

/**
 * Le letture di ogni livello, per il dialogo del tiro: a destra dei pallini
 * di un Ambito compare la voce della tavola del livello scelto («Città» al
 * quarto pallino dell'Area). Ogni Ambito porta le due lenti, nell'ordine
 * della tavola, col nome della lente davanti. I Danni sono l'Areté più il
 * numero: con l'Areté del personaggio (`arete`) il conto è già fatto.
 * Torna { [ambito]: otto liste (dal livello 0 al 7) di { sub, text, hint } }.
 */
export function scopeReadings(localize = (key) => key, { arete = null } = {}) {
  const { groups } = prepareScopeTable(localize);
  const out = {};
  for (const group of groups) {
    out[group.scope] = SCOPE_LEVELS.map((level) => group.rows.map((row) => ({
      sub: String(localize(row.title)),
      ...scopeReadingText(row, level, localize, arete)
    })));
  }
  return out;
}

/**
 * Le lenti di ogni Ambito una per una (la «lettura» dell'Ambito): per ogni
 * Ambito le sue due righe della tavola nell'ordine in cui sono scritte,
 * ognuna col suo nome e le otto letture (dal livello 0 al 7) e le otto
 * spiegazioni. La prima è quella che la scheda mostra finché il giocatore
 * non ne sceglie un'altra.
 * Torna { [ambito]: [{ id, label, short, readings: [otto testi], hints: [otto testi] }] }.
 */
export function scopeModes(localize = (key) => key, { arete = null } = {}) {
  const { rows } = prepareScopeTable(localize);
  const out = {};
  for (const row of rows) {
    const letture = SCOPE_LEVELS.map((level) => scopeReadingText(row, level, localize, arete));
    const shortKey = `WOD5E_MAGE.Scopes.SubShort.${row.id}`;
    const shortLabel = String(localize(shortKey));
    (out[row.scope] ??= []).push({
      id: row.id,
      label: row.sublabel ? String(localize(row.sublabel)) : "",
      // Il nome corto della lente, per la pastiglia nella riga stretta
      // della scheda (23/9); senza, il nome intero.
      short: shortLabel === shortKey ? (row.sublabel ? String(localize(row.sublabel)) : "") : shortLabel,
      readings: letture.map((entry) => entry.text),
      hints: letture.map((entry) => entry.hint)
    });
  }
  return out;
}

/** La lente scelta di un Ambito: quella chiesta se c'è, altrimenti la prima. */
export function scopeModeOf(modes, scope, chosen) {
  const options = modes?.[scope] ?? [];
  return options.find((option) => option.id === chosen) ?? options[0] ?? null;
}

/** La lente dopo quella scelta, in giro. */
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

/**
 * I livelli degli Ambiti come li tiene il personaggio o l'incantesimo, coi
 * nomi di oggi: l'Area di ieri diventa il livello dei Bersagli (il più
 * alto dei due se ci sono tutti e due); le chiavi sconosciute cadono.
 */
export function normalizeScopeLevels(scopes = {}) {
  const out = {};
  for (const [key, value] of Object.entries(scopes ?? {})) {
    const id = SCOPE_ALIASES[key] ?? key;
    if (!SCOPES.includes(id)) continue;
    const level = Math.min(Math.max(Math.trunc(Number(value) || 0), 0), SCOPE_MAX_LEVEL);
    out[id] = Math.max(out[id] ?? 0, level);
  }
  return out;
}

/** Quanti Ambiti stanno sopra lo 0. */
export function raisedScopes(scopes = {}) {
  return Object.values(normalizeScopeLevels(scopes)).filter((level) => level > 0).length;
}

/**
 * Si può alzare questo Ambito? Sì se è già sopra lo 0, o se gli Ambiti
 * alzati sono meno del tetto (tre per lancio).
 */
export function canRaiseScope(scopes = {}, id, limit = SCOPES_PER_CAST) {
  const levels = normalizeScopeLevels(scopes);
  if ((levels[id] ?? 0) > 0) return true;
  return raisedScopes(levels) < limit;
}

function scopeReadingText(row, level, localize, arete = null) {
  const cell = row.cells[level] ?? {};
  const label = String(localize(cell.label ?? `WOD5E_MAGE.Scopes.Table.${row.id}.${level}`));
  const hintKey = cell.hint ?? `WOD5E_MAGE.Scopes.Hint.${row.id}.${level}`;
  const hinted = String(localize(hintKey));
  // Un suggerimento che non c'è nella lingua torna com'è: allora è vuoto.
  const hint = hinted === hintKey ? "" : hinted;
  const areteLabel = String(localize("WOD5E_MAGE.Arete.Label"));
  // I Danni: l'Areté (allo 0) più il numero. Con l'Areté del personaggio il
  // conto è già fatto («6 danni» per Areté 3 al terzo livello) e la formula
  // sta nel suggerimento.
  if (cell.arete) {
    const bonus = level === 0 ? 0 : damageBonus(label);
    const formula = level === 0 ? areteLabel : `${areteLabel} ${label}`;
    const value = arete !== null && Number.isFinite(Number(arete)) ? Math.max(Math.trunc(Number(arete)), 0) : null;
    // Senza il numero nella lingua (o senza l'Areté) resta la formula.
    if (value !== null && bonus !== null) {
      return {
        text: String(localize("WOD5E_MAGE.Scopes.DamageReading")).replace("{n}", String(value + bonus)),
        hint: [`${areteLabel} ${value}${bonus ? ` ${label}` : ""}`, hint].filter(Boolean).join(" · ")
      };
    }
    return { text: formula, hint };
  }
  // La Durata in gioco: numero e unità.
  if (cell.icon) return { text: `${label} ${localize(`WOD5E_MAGE.Scopes.DurationUnits.${level}`)}`, hint };
  return { text: label, hint };
}
