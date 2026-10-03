/**
 * Gli Ambiti della Magick (la tavola del 23/9/2026, «due modi, livello 0»,
 * rifatta coi verdetti di Blue del 29/9 e del 2/10). In cima l'Epicità
 * (Blue, 2/10: «come impatto sopra con gli altri, però leggermente
 * distaccato»): dice cosa fa l'effetto, quanto in fondo arriva il gesto, da
 * 1 a 7, e c'è in ogni lancio (almeno 1); sta fuori dal tetto dei tre e
 * prende il posto del +5 delle imprese impossibili, che diventano il 6 e il
 * 7. Sotto, i sei Ambiti che dicono quanto: Bersagli, Condizioni, Durata,
 * Portata, Potenza, Precisione, ognuno da 0 a 7, letto con una, due o tre
 * lenti (misure alternative della stessa cosa: in un lancio se ne usa una).
 * Lo 0 è la base e non costa niente, ogni livello vale il suo numero; la
 * soglia è l'Epicità più la somma degli Ambiti. Nella Portata la prima
 * riga vale nello scontro e la seconda fuori; la terza, il Legame (Blue,
 * 3/10), quando arrivi al bersaglio attraverso quello che vi lega, e non
 * misura la distanza ma quanto ti è vicino; nella Potenza i Danni servono
 * nello scontro; nella Durata la prima riga conta il tempo di gioco, la
 * seconda quello del mondo; le altre lenti sono libere. Dal 2/10 Malus e
 * Beneficio sono una lente sola (Malus e bonus), e Scontro e Narrativa
 * della Precisione anche (Dettaglio, come la chiama il libro).
 */
export const EPIC_SCOPE = "epic";

export const SCOPES = Object.freeze([
  EPIC_SCOPE,
  "targets",
  "conditions",
  "duration",
  "range",
  "potency",
  "precision"
]);

/** Il livello più alto di un Ambito. */
export const SCOPE_MAX_LEVEL = 7;

/** Quanti Ambiti si alzano sopra lo 0 in un lancio (la tavola del 23/9: al massimo tre). L'Epicità non conta. */
export const SCOPES_PER_CAST = 3;

/** L'Epicità più bassa: ogni lancio ne ha almeno 1 (Blue, 2/10). */
export const EPIC_MIN = 1;

/**
 * Il simbolo di ogni Ambito: sta a sinistra del nome nel dialogo del tiro e
 * sopra i dadi in chat, col livello dichiarato.
 */
export const SCOPE_ICONS = Object.freeze({
  epic: "fa-solid fa-wand-magic-sparkles",
  targets: "fa-solid fa-user",
  conditions: "fa-solid fa-list-check",
  duration: "fa-solid fa-hourglass-half",
  range: "fa-solid fa-location-crosshairs",
  potency: "fa-solid fa-burst",
  precision: "fa-solid fa-bullseye"
});

/**
 * Gli Ambiti di ieri che oggi sono una lente: l'Area sta nei Bersagli.
 * L'Impatto (tolto il 29/9) non ha un erede: i suoi livelli cadono.
 * Le lenti tolte il 2/10 (Beneficio, la Narrativa della Precisione) non
 * hanno bisogno di nomi nuovi: una lente che non c'è più torna la prima.
 */
export const SCOPE_ALIASES = Object.freeze({ area: "targets" });

/**
 * Le righe della tavola: due o tre lenti per Ambito, nell'ordine della
 * tavola (la prima è quella che vale se il giocatore non sceglie). Ogni riga dichiara
 * le sue colonne invisibili (layout): simbolo, numero, testo. Dentro una
 * colonna della tavola le celle si allineano.
 */
export const SCOPE_TABLE_ROWS = Object.freeze([
  // L'Epicità (2/10): una lente sola, il gesto, da 1 a 7 (niente 0); in
  // cima alla tavola, staccata dagli altri.
  { id: "epic", scope: "epic", sublabel: "", layout: "text", base: true },
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
  // Condizioni: Malus e bonus (2/10, una lente sola: il bonus è il malus
  // girato) dice quanto pesa quello che l'effetto lascia addosso, coi gradi
  // delle Condizioni del 29/9; la Complessità sono le clausole che lo regolano.
  { id: "conditionsMalus", scope: "conditions", sublabel: "WOD5E_MAGE.Scopes.Sub.conditionsMalus", layout: "text" },
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
  // Portata: nello scontro e fuori; poi il Legame (Blue, 3/10), la terza
  // lente, che non misura la distanza ma quanto ti è vicino il bersaglio:
  // dal sangue (1) al filo più esile (7). Con un legame arrivi al bersaglio
  // ovunque sia, anche senza Corrispondenza; senza nemmeno il filo del 7 serve
  // la Corrispondenza. Lo 0 è lo stesso delle altre lenti: lo tocchi.
  { id: "range", scope: "range", sublabel: "WOD5E_MAGE.Scopes.Sub.range", layout: "text" },
  { id: "rangeNarrative", scope: "range", sublabel: "WOD5E_MAGE.Scopes.Sub.rangeNarrative", layout: "text" },
  { id: "rangeBond", scope: "range", sublabel: "WOD5E_MAGE.Scopes.Sub.rangeBond", layout: "text" },
  // Potenza: i Danni sono l'Areté (allo 0) più il numero; il Peso dice
  // quanto pesa quello che l'effetto muove; l'Influenza quanto cambia una
  // persona, dalle emozioni (1) fino a pilotarla (7). Non è una Condizione.
  { id: "potencyDamage", scope: "potency", sublabel: "WOD5E_MAGE.Scopes.Sub.potencyDamage", arete: true, layout: "symbol-number" },
  { id: "potencyWeight", scope: "potency", sublabel: "WOD5E_MAGE.Scopes.Sub.potencyWeight", layout: "text" },
  { id: "potencyInfluence", scope: "potency", sublabel: "WOD5E_MAGE.Scopes.Sub.potencyInfluence", layout: "text", small: true },
  // Precisione: il Dettaglio (2/10, una lente sola, una parola per casella)
  // dice quanto è fine quello che l'effetto sceglie o trova, nello scontro e
  // fuori; l'Informazione quanto è rara la cosa che scopri (chi la sa).
  { id: "precision", scope: "precision", sublabel: "WOD5E_MAGE.Scopes.Sub.precision", layout: "text" },
  { id: "precisionInfo", scope: "precision", sublabel: "WOD5E_MAGE.Scopes.Sub.precisionInfo", layout: "text", small: true }
]);

/** Le lenti di un Ambito, nell'ordine della tavola: una, due o tre. */
export function scopeLensIds(scope) {
  return SCOPE_TABLE_ROWS.filter((row) => row.scope === scope).map((row) => row.id);
}

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
    base: Boolean(row.base),
    cells: SCOPE_LEVELS.map((step) => {
      const label = `WOD5E_MAGE.Scopes.Table.${row.id}.${step}`;
      const zeroText = Boolean(row.zeroText) && step === 0;
      // L'Epicità non ha lo 0: la casella resta vuota.
      if (row.base && step < EPIC_MIN) {
        return { step, label: "", hint: "", empty: true, layout: row.layout, number: false, text: false, arete: false, hideLabel: false, faIcon: "", icon: "" };
      }
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
 * La tavola degli Ambiti: in cima l'Epicità (2/10), poi gli Ambiti in
 * ordine alfabetico (nella lingua del giocatore: `localize`), ognuno con la
 * riga di titolo e sotto le sue lenti, nell'ordine della tavola (la prima è
 * quella che vale se non si sceglie: nella Portata lo scontro). `groups` è
 * quel che il template stampa; `rows` resta la lista piatta delle righe coi
 * loro gradini, da 0 a 7 (l'Epicità senza lo 0).
 */
export function prepareScopeTable(localize = (key) => key) {
  // La spiegazione della cella («Cosa vuol dire», «Esempi»), se la lingua
  // ce l'ha: sta nel sorvolo della cella.
  const rows = tableRows().map((row) => ({
    ...row,
    cells: row.cells.map((cell) => {
      if (cell.empty) return { ...cell, tip: "" };
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
        // L'Epicità sta in cima, staccata dagli Ambiti (2/10).
        base: scopeRows.some((row) => row.base),
        span: scopeRows.length,
        rows: scopeRows.map((row) => ({ ...row, title: row.sublabel }))
      };
    })
    .sort((a, b) => Number(b.base) - Number(a.base) || a.name.localeCompare(b.name));

  // `span`: quante colonne ha la tavola (il nome, la lente, gli otto livelli), per lo stacco sotto l'Epicità.
  return { steps: [...SCOPE_LEVELS], rows, groups, span: SCOPE_LEVELS.length + 2 };
}

/**
 * Le letture di ogni livello, per il dialogo del tiro: a destra dei pallini
 * di un Ambito compare la voce della tavola del livello scelto («Città» al
 * quarto pallino dell'Area). Ogni Ambito porta le sue lenti, nell'ordine
 * della tavola, col nome della lente davanti. I Danni sono l'Areté più il
 * numero: con l'Areté del personaggio (`arete`) il conto è già fatto.
 * Torna { [ambito]: otto liste (dal livello 0 al 7) di { sub, text, hint } }.
 */
export function scopeReadings(localize = (key) => key, { arete = null } = {}) {
  const { groups } = prepareScopeTable(localize);
  const out = {};
  for (const group of groups) {
    out[group.scope] = SCOPE_LEVELS.map((level) => group.rows.map((row) => ({
      sub: row.title ? String(localize(row.title)) : "",
      ...scopeReadingText(row, level, localize, arete)
    })));
  }
  return out;
}

/**
 * Le lenti di ogni Ambito una per una (la «lettura» dell'Ambito): per ogni
 * Ambito le sue righe della tavola (due o tre) nell'ordine in cui sono scritte,
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

/**
 * La lettura dello 0 di un Ambito quando nessuna lente è scelta (Blue, 26/9
 * sera: «Bersagli 0 dirà 1 Bersaglio»): la base di ogni lente col nome della
 * lente («Effetto: Un bersaglio · Area: Un punto»), o una sola se coincidono.
 */
export function zeroReading(scope, localize = (key) => key, { arete = null } = {}) {
  const lenti = scopeModes(localize, { arete })[scope] ?? [];
  const letture = lenti.map((lens) => ({ nome: lens.short || lens.label, testo: lens.readings?.[0] ?? "" })).filter((entry) => entry.testo);
  if (!letture.length) return "";
  if (new Set(letture.map((entry) => entry.testo)).size === 1) return letture[0].testo;
  return letture.map((entry) => (entry.nome ? `${entry.nome}: ${entry.testo}` : entry.testo)).join(" · ");
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

/**
 * L'ordine delle righe degli Ambiti nelle liste (scheda, Tiro, finestre,
 * nemico): l'Epicità in cima, gli altri per nome nella lingua in uso.
 */
export function ordinaAmbiti(a, b, lang = "it") {
  return Number(b.id === EPIC_SCOPE) - Number(a.id === EPIC_SCOPE) || String(a.label ?? "").localeCompare(String(b.label ?? ""), lang);
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

/** Quanti Ambiti stanno sopra lo 0 (l'Epicità non conta: c'è sempre). */
export function raisedScopes(scopes = {}) {
  return Object.entries(normalizeScopeLevels(scopes)).filter(([id, level]) => id !== EPIC_SCOPE && level > 0).length;
}

/**
 * Si può alzare questo Ambito? Sì se è già sopra lo 0, o se gli Ambiti
 * alzati sono meno del tetto (tre per lancio). L'Epicità si alza sempre.
 */
export function canRaiseScope(scopes = {}, id, limit = SCOPES_PER_CAST) {
  if (id === EPIC_SCOPE) return true;
  const levels = normalizeScopeLevels(scopes);
  if ((levels[id] ?? 0) > 0) return true;
  return raisedScopes(levels) < limit;
}

/** L'Epicità di un lancio: quella dichiarata, mai sotto 1 (Blue, 2/10: ogni lancio parte almeno da 1). */
export function epicita(scopes = {}) {
  const level = Math.trunc(Number(scopes?.[EPIC_SCOPE]) || 0);
  return Math.min(Math.max(level, EPIC_MIN), SCOPE_MAX_LEVEL);
}

/** I livelli di un lancio di Magick coi nomi di oggi e l'Epicità messa, almeno 1. */
export function livelliDelLancio(scopes = {}) {
  const levels = normalizeScopeLevels(scopes);
  return { ...levels, [EPIC_SCOPE]: epicita(levels) };
}

/**
 * Gli Ambiti di un lancio di Magick in fila, come li contano la soglia, la
 * carta in chat e le Magick in atto: l'Epicità per prima (almeno 1), poi
 * quelli sopra lo 0, nell'ordine della tavola. Torna [{ id, level }].
 */
export function ambitiDelLancio(scopes = {}) {
  const levels = livelliDelLancio(scopes);
  return SCOPES.map((id) => ({ id, level: levels[id] ?? 0 })).filter((entry) => entry.level > 0);
}

/** Il pallino più basso di un Ambito: 1 per l'Epicità, 0 per gli altri. */
export function scopeMin(id) {
  return id === EPIC_SCOPE ? EPIC_MIN : 0;
}

function scopeReadingText(row, level, localize, arete = null) {
  const cell = row.cells[level] ?? {};
  // L'Epicità non ha lo 0: niente da leggere.
  if (cell.empty) return { text: "", hint: "" };
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
