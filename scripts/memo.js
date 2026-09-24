/**
 * Il memo di creazione come spunta (Blue, 23/9): «una casella che posso
 * spuntare o despuntare; quando la spunto mi compare nel posto adatto dove è
 * l'operazione mancante e dov'è il contatore». Da spuntata, ogni riquadro
 * della prima pagina porta il suo conto a destra del titolo (Attributi
 * 12/22) e il titolo si colora: rosso sotto il traguardo, verde pari, giallo
 * sopra (i tre stati del 7/9); le pagine che stanno fuori dalla prima (la
 * Bussola con Ancore e Convinzioni, il Credo con gli Strumenti, la Sfida, i
 * Tratti) colorano la loro linguetta. Da spenta, tutto torna al suo colore.
 * Conti puri sul riepilogo di prepareCreationSummary: si provano senza
 * Foundry.
 */

/** Lo stato di un conto: `under`, `exact`, `over`; di una spunta: `under` o `exact`. */
function statoSpunta(ok) {
  return ok ? "exact" : "under";
}

/** Il peggiore fra più stati: basta un rosso perché il titolo sia rosso. */
export function statoInsieme(stati) {
  const list = (stati ?? []).filter(Boolean);
  if (!list.length) return "";
  if (list.includes("under")) return "under";
  if (list.includes("over")) return "over";
  return "exact";
}

function conto(count) {
  if (!count) return null;
  return {
    id: count.id,
    value: count.value,
    target: count.target,
    state: count.state,
    sfida: count.sfida ?? 0,
    label: count.label,
    text: count.target === null || count.target === undefined ? String(count.value) : `${count.value}/${count.target}`
  };
}

/**
 * Il memo per i riquadri e le linguette.
 *
 * @param {object} summary - il riepilogo di prepareCreationSummary.
 * @param {object} [opzioni]
 * @param {boolean} [opzioni.on] - la spunta del memo.
 * @returns {{on: boolean, boxes: object, tabs: object, sfida: object, arete: object}}
 */
export function prepareMemo(summary, { on = false } = {}) {
  const counts = Object.fromEntries((summary?.counts ?? []).map((count) => [count.id, count]));
  const checks = Object.fromEntries((summary?.checks ?? []).map((check) => [check.id, check]));
  const attributi = conto(counts.attributes);
  const abilita = conto(counts.skills);
  const vantaggi = conto(counts.merits);
  const difetti = conto(counts.flaws);
  // I Domini e i poteri (25/9): al posto dei pallini delle Sfere.
  const domini = conto(counts.domini);
  const poteri = conto(counts.poteri);
  const tetto = checks.skillCap ? { ok: Boolean(checks.skillCap.ok), target: checks.skillCap.target } : null;
  const arete = checks.arete ? { ok: Boolean(checks.arete.ok), target: checks.arete.target } : null;
  const concetto = checks.concept ? Boolean(checks.concept.ok) : null;
  const ancore = checks.anchors ? Boolean(checks.anchors.ok) : null;
  const convinzioni = checks.convictions ? Boolean(checks.convictions.ok) : null;
  const strumenti = checks.instruments ? Boolean(checks.instruments.ok) : null;
  const sfida = summary?.sfida ?? { done: 0, total: 3, complete: false, prizes: [] };

  const boxes = {
    identita: { state: concetto === null ? "" : statoSpunta(concetto), concetto },
    attributi: { ...attributi, state: attributi?.state ?? "" },
    // Le Abilità: il conto, e il tetto (nessuna oltre il terzo pallino).
    abilita: {
      ...abilita,
      tetto,
      state: statoInsieme([abilita?.state, tetto ? statoSpunta(tetto.ok) : ""])
    },
    // La Magick: l'Areté del grado, i Domini a cui si ha accesso, i poteri.
    magick: {
      arete,
      domini,
      poteri,
      state: statoInsieme([domini?.state, poteri?.state, arete ? statoSpunta(arete.ok) : ""])
    },
    // I Tratti: Background e Pregi insieme, e i Difetti.
    tratti: {
      vantaggi,
      difetti,
      state: statoInsieme([vantaggi?.state, difetti?.state])
    }
  };

  const tabs = {
    // La Bussola: almeno un'Ancora e almeno una Convinzione.
    personaggio: { state: statoInsieme([ancore === null ? "" : statoSpunta(ancore), convinzioni === null ? "" : statoSpunta(convinzioni)]), ancore, convinzioni },
    // Il Credo: uno Strumento per Sfera.
    focus: { state: strumenti === null ? "" : statoSpunta(strumenti), strumenti },
    // La Sfida: i gruppi completi (facoltativa: mai rossa, verde da completa).
    conceptChallenge: { state: sfida.complete ? "exact" : "", done: sfida.done, total: sfida.total },
    // I Tratti: come il riquadro della prima pagina.
    dotazione: { state: boxes.tratti.state }
  };

  return { on: Boolean(on), boxes, tabs, sfida, arete };
}
