import { MODULE_ID } from "./constants.js";
import { anchorLabel, PERSONAGGIO_TABLES } from "./personaggio-extra.js";
import { renderRollNote, ROLL_CARD_FLAG } from "./roll-card.js";
import { askSegno } from "./salute.js";

/**
 * La Saggezza come bilancia (Blue, 3/10/2026, i cinque giri dello studio
 * `claude/saggezza_bilancia_3_10.md`): nove caselle, Caduto a sinistra e
 * Folle a destra, e due SEGNI indipendenti che partono dal centro: quello
 * dell'Hubris scende a sinistra con gli atti d'Hubris, quello del Silenzio a
 * destra con gli atti di Silenzio. Il quarto passo è la fine del personaggio.
 *
 * L'atto: il Narratore dice il gradino (da 1 a 7, la tavola del LIBRO) e il
 * lato. Il segno scende solo se il gradino supera il passo dove sta (il
 * cancello). Se una Convinzione attiva copre l'atto si tira Fermezza +
 * Autocontrollo meno il gradino, e un 8 riesce: riuscito il segno resta,
 * fallito scende di un passo; senza dadi non si para. Se nessuna Convinzione
 * copre, il segno scende in automatico. Tradire una Convinzione la spegne:
 * non copre più finché non torna attiva.
 *
 * Il ritorno: l'atto che fa risplendere una Convinzione (lo chiama il
 * Narratore, una volta per sessione per giocatore) la riaccende e fa tornare
 * indietro di un passo il segno del lato che contraddice; la scena con
 * un'Ancora (una per storia per ogni Ancora) fa ritirare Fermezza +
 * Autocontrollo meno il passo, e un 8 riporta il segno indietro di uno; in
 * casi eccezionali il Narratore lo concede senza tirare. Gli effetti dei
 * passi (±1, ±2, ±3) sono una leva del solo Narratore e non stanno in codice.
 *
 * Nella bandiera `wisdom`: `hubris` e `silenzio` (il passo di ogni segno, da
 * 0 a 4), `risplende` (già usato in questa sessione), `ancore` (le Ancore già
 * usate in questa storia, per id). Le macchie della fila vecchia (fino alla
 * 1.38.0) si ignorano: tutti ripartono coi segni al centro.
 */

export const LATI = Object.freeze(["hubris", "silenzio"]);
/** I passi prima della fine: 1, 2, 3; il quarto è Caduto o Folle. */
export const PASSI = 3;
export const FINE = 4;
/** La tavola della gravità degli atti: sette gradini. */
export const GRADINI = 7;
/** Il tiro di Saggezza riesce dall'8 (Blue, 3/10). */
export const SAGGEZZA_SUCCESS_FROM = 8;
/** Le nove caselle: quattro per lato e il centro. */
export const CELLE = 2 * FINE + 1;
const CENTRO = FINE;

const DEFAULT_SAGGEZZA = Object.freeze({ hubris: 0, silenzio: 0, risplende: false, ancore: {} });

function count(value) {
  return Math.max(Math.trunc(Number(value) || 0), 0);
}

/** Un passo sta fra il centro (0) e la fine (4). */
export function clampPasso(value) {
  return Math.min(count(value), FINE);
}

/** Il lato, se è uno dei due; altrimenti vuoto. */
export function normalizeLato(value) {
  return LATI.includes(value) ? value : "";
}

/** La bandiera letta: i due segni, il Risplende della sessione, le Ancore usate. */
export function normalizeSaggezza(stored) {
  const ancore = stored?.ancore && typeof stored.ancore === "object" ? stored.ancore : {};
  return {
    hubris: clampPasso(stored?.hubris),
    silenzio: clampPasso(stored?.silenzio),
    risplende: Boolean(stored?.risplende),
    ancore: Object.fromEntries(Object.entries(ancore).filter(([, used]) => used).map(([id]) => [id, true]))
  };
}

function attributeValue(actor, id) {
  return count(actor?.system?.attributes?.[id]?.value);
}

/** La riserva del tiro: Fermezza + Autocontrollo, senza niente in più. */
export function riservaSaggezza(actor) {
  return attributeValue(actor, "resolve") + attributeValue(actor, "composure");
}

/** I dadi che si tirano: la riserva meno la soglia, mai sotto zero. Zero: non si para. */
export function dadiSaggezza(riserva, soglia) {
  return Math.max(count(riserva) - count(soglia), 0);
}

/** Il cancello: l'atto sposta il segno solo se il suo gradino supera il passo dove sta. */
export function cancello(gradino, passo) {
  return count(gradino) > clampPasso(passo);
}

/** Il segno di un lato spostato di `delta` passi, fra il centro e la fine. */
export function spostaSegno(stato, lato, delta) {
  const side = normalizeLato(lato);
  if (!side) return { ...stato };
  return { ...stato, [side]: clampPasso(clampPasso(stato?.[side]) + Math.trunc(Number(delta) || 0)) };
}

/** Il segno di un lato messo a un passo preciso (il clic sulla casella). */
export function mettiSegno(stato, lato, passo) {
  const side = normalizeLato(lato);
  if (!side) return { ...stato };
  return { ...stato, [side]: clampPasso(passo) };
}

/** Il lato che è alla fine, se c'è: Caduto (Hubris) o Folle (Silenzio). */
export function fineDi(stato) {
  if (clampPasso(stato?.hubris) >= FINE) return "hubris";
  if (clampPasso(stato?.silenzio) >= FINE) return "silenzio";
  return "";
}

/**
 * L'esito di un atto, senza dadi di mezzo: `copre` dice se una Convinzione
 * attiva copre l'atto, `successi` i successi del tiro (solo se copre).
 * - cancello: il gradino non supera il passo, il segno resta;
 * - scoperto: nessuna Convinzione copre, il segno scende;
 * - coperto: il tiro è riuscito, il segno resta;
 * - fallito: il tiro è fallito (o senza dadi), il segno scende.
 */
export function esitoAtto(stato, { lato, gradino, copre = false, successi = 0 } = {}) {
  const side = normalizeLato(lato);
  const passo = clampPasso(stato?.[side]);
  if (!side || !cancello(gradino, passo)) return { esito: "cancello", sposta: false, lato: side, passo, next: { ...stato } };
  if (!copre) return { esito: "scoperto", sposta: true, lato: side, passo: clampPasso(passo + 1), next: spostaSegno(stato, side, 1) };
  if (count(successi) >= 1) return { esito: "coperto", sposta: false, lato: side, passo, next: { ...stato } };
  return { esito: "fallito", sposta: true, lato: side, passo: clampPasso(passo + 1), next: spostaSegno(stato, side, 1) };
}

/**
 * L'Indulgere (Blue, 3/10): dichiarato prima del lancio, l'incantesimo
 * riesce e poi si tira Saggezza con la soglia dell'incantesimo. Fallito, il
 * segno del lato scelto scende di un passo anche dove il cancello lo
 * fermerebbe: indulgere è sempre un passo verso quel lato.
 */
export function esitoIndulgere(stato, { lato, successi = 0 } = {}) {
  const side = normalizeLato(lato);
  if (!side) return { esito: "cancello", sposta: false, lato: side, passo: 0, next: { ...stato } };
  if (count(successi) >= 1) return { esito: "coperto", sposta: false, lato: side, passo: clampPasso(stato?.[side]), next: { ...stato } };
  const next = spostaSegno(stato, side, 1);
  return { esito: "fallito", sposta: true, lato: side, passo: next[side], next };
}

/** L'atto che fa risplendere: la Convinzione si riaccende, il segno del lato torna indietro di uno. */
export function applicaRisplende(stato, lato) {
  const side = normalizeLato(lato);
  const next = side ? spostaSegno(stato, side, -1) : { ...stato };
  return { ...next, risplende: true, tornato: side ? clampPasso(stato?.[side]) > 0 : false };
}

/** La scena con l'Ancora: riuscito il tiro (o concesso), il segno torna indietro di uno; l'Ancora è usata. */
export function applicaAncora(stato, lato, ancoraId, { riuscito = false } = {}) {
  const side = normalizeLato(lato);
  const next = side && riuscito ? spostaSegno(stato, side, -1) : { ...stato };
  const ancore = { ...(stato?.ancore ?? {}) };
  if (ancoraId) ancore[ancoraId] = true;
  return { ...next, ancore, tornato: Boolean(side && riuscito && clampPasso(stato?.[side]) > 0) };
}

/** La chiave di lingua del passo di un lato: al centro, passo n, Caduto o Folle. */
export function passoLabel(lato, passo) {
  const p = clampPasso(passo);
  if (p === 0) return { key: "WOD5E_MAGE.Wisdom.Passi.centro", n: 0 };
  if (p >= FINE) return { key: lato === "hubris" ? "WOD5E_MAGE.Wisdom.Passi.fineHubris" : "WOD5E_MAGE.Wisdom.Passi.fineSilenzio", n: p };
  return { key: "WOD5E_MAGE.Wisdom.Passi.passo", n: p };
}

/**
 * Le nove caselle da disegnare, da Caduto (indice 0) a Folle (indice 8): per
 * ognuna il lato, il passo e i segni che ci stanno sopra.
 */
export function celleSaggezza(stato) {
  const hubris = clampPasso(stato?.hubris);
  const silenzio = clampPasso(stato?.silenzio);
  const cells = [];
  for (let index = 0; index < CELLE; index += 1) {
    const lato = index < CENTRO ? "hubris" : (index > CENTRO ? "silenzio" : "centro");
    const passo = Math.abs(index - CENTRO);
    cells.push({
      index,
      lato,
      passo,
      fine: passo >= FINE,
      hubris: index === CENTRO - hubris,
      silenzio: index === CENTRO + silenzio
    });
  }
  return cells;
}

/** Le Convinzioni della scheda, con lo stato: attiva o spenta. */
export function convinzioniRighe(actor) {
  const stored = actor?.getFlag?.(MODULE_ID, PERSONAGGIO_TABLES.convictions) ?? {};
  return Object.entries(stored)
    .map(([id, row]) => ({ id, text: String(row?.text ?? "").trim(), spenta: Boolean(row?.spenta) }))
    .filter((row) => row.text);
}

/** Le Ancore della scheda, con la spunta di chi è già stata usata in questa storia. */
export function ancoreRighe(actor, stato) {
  const stored = actor?.getFlag?.(MODULE_ID, PERSONAGGIO_TABLES.anchors) ?? {};
  return Object.entries(stored)
    .map(([id, row]) => ({ id, text: anchorLabel(row), usata: Boolean(stato?.ancore?.[id]) }))
    .filter((row) => row.text);
}

export function getWisdom(actor) {
  const localize = globalThis.game?.i18n?.localize?.bind(globalThis.game.i18n) ?? ((key) => key);
  const format = globalThis.game?.i18n?.format?.bind(globalThis.game.i18n) ?? ((key) => key);
  const stato = normalizeSaggezza(actor.getFlag(MODULE_ID, "wisdom"));
  const resolve = attributeValue(actor, "resolve");
  const composure = attributeValue(actor, "composure");
  const fine = fineDi(stato);
  const statoLato = (lato) => {
    const passo = clampPasso(stato[lato]);
    const label = passoLabel(lato, passo);
    const text = label.n > 0 && passo < FINE ? format(label.key, { n: label.n }) : localize(label.key);
    return { passo, fine: passo >= FINE, text, riga: format("WOD5E_MAGE.Wisdom.StatoRiga", { lato: localize(`WOD5E_MAGE.Wisdom.Lati.${lato}`), passo: text }) };
  };
  const cells = celleSaggezza(stato).map((cell) => {
    let title;
    if (cell.lato === "centro") title = localize("WOD5E_MAGE.Wisdom.Cella.centro");
    else if (cell.fine) title = format("WOD5E_MAGE.Wisdom.Cella.fine", { lato: localize(`WOD5E_MAGE.Wisdom.Lati.${cell.lato}`), nome: localize(cell.lato === "hubris" ? "WOD5E_MAGE.Wisdom.Passi.fineHubris" : "WOD5E_MAGE.Wisdom.Passi.fineSilenzio") });
    else title = format("WOD5E_MAGE.Wisdom.Cella.passo", { lato: localize(`WOD5E_MAGE.Wisdom.Lati.${cell.lato}`), n: cell.passo });
    return { ...cell, title };
  });
  return {
    ...stato,
    resolve,
    composure,
    riserva: resolve + composure,
    fine,
    fineLabel: fine ? localize(fine === "hubris" ? "WOD5E_MAGE.Wisdom.Passi.fineHubris" : "WOD5E_MAGE.Wisdom.Passi.fineSilenzio") : "",
    stato: { hubris: statoLato("hubris"), silenzio: statoLato("silenzio") },
    cells,
    convinzioni: convinzioniRighe(actor),
    ancore: ancoreRighe(actor, stato)
  };
}

function canEdit(actor) {
  if (!actor.isOwner) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.NoSufficientPermission", { string: actor.name })
    );
    return false;
  }
  if (actor.system.locked) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.CannotModifyResourceString", { string: actor.name })
    );
    return false;
  }
  return true;
}

/** Scrive i due segni e il resto, e toglie le macchie della fila vecchia. */
export async function saveSaggezza(actor, stato) {
  const next = normalizeSaggezza(stato);
  await actor.setFlag(MODULE_ID, "wisdom", {
    hubris: next.hubris,
    silenzio: next.silenzio,
    risplende: next.risplende,
    ancore: next.ancore,
    "-=superficial": null,
    "-=aggravated": null,
    "-=extra": null,
    "-=attribute": null,
    "-=max": null
  });
}

function latoNome(lato, localize) {
  return localize(`WOD5E_MAGE.Wisdom.Lati.${normalizeLato(lato) || "hubris"}`);
}

/** Il nome del passo in parole: «al centro», «passo 2», «Caduto». */
export function passoTesto(lato, passo, localize, format) {
  const label = passoLabel(lato, passo);
  return label.key.endsWith(".passo") ? format(label.key, { n: label.n }) : localize(label.key);
}

/** Il messaggio in chat di un atto senza dadi (il cancello, o nessuna Convinzione). */
async function raccontaAtto(actor, testo) {
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    flavor: game.i18n.localize("WOD5E_MAGE.Wisdom.Label"),
    content: `<div class="wod5e-mage-saggezza-carta">${renderRollNote(testo, "saggezza")}</div>`
  });
}

/** La frase dell'esito, per la chat e l'avviso. */
export function testoEsito(esito, { lato, passo, gradino, convinzione = "" } = {}, localize, format) {
  const nomeLato = latoNome(lato, localize);
  const dove = passoTesto(lato, passo, localize, format);
  switch (esito) {
    case "cancello": return format("WOD5E_MAGE.Wisdom.Esiti.cancello", { gradino, lato: nomeLato, passo: dove });
    case "scoperto": return format("WOD5E_MAGE.Wisdom.Esiti.scoperto", { gradino, lato: nomeLato, passo: dove });
    case "coperto": return format("WOD5E_MAGE.Wisdom.Esiti.coperto", { convinzione, lato: nomeLato, passo: dove });
    case "fallito": return format("WOD5E_MAGE.Wisdom.Esiti.fallito", { convinzione, lato: nomeLato, passo: dove });
    default: return "";
  }
}

/** La fine del personaggio, se un segno è arrivato al quarto passo. */
function avvisoFine(stato, localize) {
  const fine = fineDi(stato);
  if (!fine) return "";
  return localize(`WOD5E_MAGE.Wisdom.Fine.${fine}`);
}

/**
 * Il tiro di Saggezza: Fermezza + Autocontrollo meno la soglia, un 8 riesce,
 * niente rossi. Passa dalla finestra del modulo come il Relax. Torna il
 * messaggio e i successi, oppure null se la finestra è stata chiusa.
 */
export async function rollSaggezza(actor, { soglia = 0, title = "", card = null, selectors = [] } = {}) {
  const { rollAreteWithParadox } = await import("./paradox-dice.js");
  let message = null;
  try {
    message = await rollAreteWithParadox({
      actor,
      data: actor.system,
      pool: riservaSaggezza(actor),
      threshold: count(soglia),
      paradoxRating: 0,
      skill: true,
      successFrom: SAGGEZZA_SUCCESS_FROM,
      title: title || game.i18n.localize("WOD5E_MAGE.Wisdom.Rolling"),
      card: { saggezza: { ...(card ?? {}) } },
      selectors: ["attributes", "attributes.resolve", "attributes.composure", "mental", ...selectors]
    });
  } catch (_error) {
    return null;
  }
  if (!message || message === "cancel") return null;
  const successi = count(message.getFlag?.(MODULE_ID, ROLL_CARD_FLAG)?.total);
  return { message, successi };
}

/** Scrive sulla carta del tiro come è andata, per la nota sotto i dadi. */
async function segnaEsitoSullaCarta(message, esito) {
  const card = message?.getFlag?.(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  await message.update({ flags: { [MODULE_ID]: { [ROLL_CARD_FLAG]: { ...card, saggezza: { ...(card.saggezza ?? {}), ...esito } } } } });
}

/**
 * Il clic sulla casella: il segno di quel lato va lì; il clic destro lo
 * riporta al centro. Sul centro un menù chiede quale segno riportare.
 */
export async function onWisdomCellChange(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const stato = normalizeSaggezza(actor.getFlag(MODULE_ID, "wisdom"));
  const cell = celleSaggezza(stato)[Math.trunc(Number(target.dataset.index))];
  if (!cell) return;
  if (cell.lato === "centro") {
    const picked = await askSegno(event, "", [
      { state: "hubris", label: "WOD5E_MAGE.Wisdom.CentroMenu.hubris", glyph: null },
      { state: "silenzio", label: "WOD5E_MAGE.Wisdom.CentroMenu.silenzio", glyph: null },
      { state: "entrambi", label: "WOD5E_MAGE.Wisdom.CentroMenu.entrambi", glyph: null }
    ]);
    if (!picked) return;
    const next = picked === "entrambi" ? { ...stato, hubris: 0, silenzio: 0 } : mettiSegno(stato, picked, 0);
    await saveSaggezza(actor, next);
    return;
  }
  const passo = event.button === 2 ? 0 : cell.passo;
  await saveSaggezza(actor, mettiSegno(stato, cell.lato, passo));
}

/** La tavola dei sette gradini per la finestra dell'atto. */
export function tavolaGradini(localize) {
  const rows = [];
  for (let gradino = 1; gradino <= GRADINI; gradino += 1) {
    rows.push({
      gradino,
      hubris: localize(`WOD5E_MAGE.Wisdom.Tavola.${gradino}.hubris`),
      generico: localize(`WOD5E_MAGE.Wisdom.Tavola.${gradino}.generico`),
      silenzio: localize(`WOD5E_MAGE.Wisdom.Tavola.${gradino}.silenzio`)
    });
  }
  return rows;
}

/** I campi della finestra dell'atto, letti e puliti. */
export function normalizeAtto(result = {}) {
  const gradino = Math.min(Math.max(Math.trunc(Number(result.gradino) || 0), 1), GRADINI);
  return {
    gradino,
    lato: normalizeLato(result.lato),
    copre: String(result.copre ?? ""),
    tradisce: String(result.tradisce ?? "")
  };
}

/**
 * L'atto (Tira): la finestra chiede gradino, lato, la Convinzione che
 * copre e quella tradita; poi il cancello, il tiro se una Convinzione
 * copre, il passo se non copre o se il tiro fallisce. Tradire spegne la
 * Convinzione, e l'atto non è coperto nemmeno da un'altra.
 */
export async function onWisdomAtto(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const wisdom = getWisdom(actor);
  const convinzioni = wisdom.convinzioni;
  const content = await foundry.applications.handlebars.renderTemplate(
    "modules/wod5e-mage/templates/dialogs/saggezza-atto.hbs",
    {
      tavola: tavolaGradini(localize),
      lati: LATI.map((id) => ({ id, label: localize(`WOD5E_MAGE.Wisdom.Lati.${id}`), passo: wisdom.stato[id].text })),
      attive: convinzioni.filter((row) => !row.spenta),
      spente: convinzioni.filter((row) => row.spenta),
      riserva: wisdom.riserva
    }
  );
  let result = null;
  try {
    result = await foundry.applications.api.DialogV2.input({
      window: { title: localize("WOD5E_MAGE.Wisdom.Atto.Title") },
      content,
      ok: { icon: "fa-solid fa-scale-balanced", label: localize("WOD5E_MAGE.Wisdom.Atto.Ok") },
      buttons: [{ action: "cancel", icon: "fas fa-times", label: localize("WOD5E.Cancel") }],
      classes: ["wod5e", "wod5e-mage", "mage", actor.system.gamesystem, "wod5e-mage-roll-dialog", "wod5e-mage-saggezza-dialog"],
      position: { width: 560, height: "auto" }
    });
  } catch (_error) {
    return;
  }
  if (!result || result === "cancel") return;
  const atto = normalizeAtto(result);
  if (!atto.lato) {
    ui.notifications.warn(localize("WOD5E_MAGE.Wisdom.Atto.LatoManca"));
    return;
  }

  const stato = normalizeSaggezza(actor.getFlag(MODULE_ID, "wisdom"));
  const righe = { ...(actor.getFlag(MODULE_ID, PERSONAGGIO_TABLES.convictions) ?? {}) };
  const tradita = atto.tradisce && righe[atto.tradisce] ? righe[atto.tradisce] : null;
  const copre = !tradita && atto.copre && righe[atto.copre] && !righe[atto.copre].spenta ? righe[atto.copre] : null;
  const parts = [];

  // Tradire spegne la Convinzione, qualunque cosa faccia il segno.
  if (tradita) {
    await actor.setFlag(MODULE_ID, PERSONAGGIO_TABLES.convictions, { ...righe, [atto.tradisce]: { ...tradita, spenta: true } });
    parts.push(format("WOD5E_MAGE.Wisdom.Esiti.tradita", { convinzione: String(tradita.text ?? "") }));
  }

  if (!copre || !cancello(atto.gradino, stato[atto.lato])) {
    const esito = esitoAtto(stato, { lato: atto.lato, gradino: atto.gradino, copre: false });
    if (esito.sposta) await saveSaggezza(actor, esito.next);
    parts.push(testoEsito(esito.esito, { lato: esito.lato, passo: esito.passo, gradino: atto.gradino }, localize, format));
    const fine = avvisoFine(esito.next, localize);
    if (fine) parts.push(fine);
    await raccontaAtto(actor, parts.join(" "));
    ui.notifications.info(parts.join(" "));
    return;
  }

  // Una Convinzione copre: si tira, con la soglia del gradino.
  const nome = String(copre.text ?? "");
  const tiro = await rollSaggezza(actor, {
    soglia: atto.gradino,
    title: format("WOD5E_MAGE.Wisdom.Atto.Rolling", { convinzione: nome }),
    card: { lato: atto.lato, gradino: atto.gradino, convinzione: nome, tradita: tradita ? String(tradita.text ?? "") : "" }
  });
  if (!tiro) return;
  const esito = esitoAtto(stato, { lato: atto.lato, gradino: atto.gradino, copre: true, successi: tiro.successi });
  if (esito.sposta) await saveSaggezza(actor, esito.next);
  const testo = testoEsito(esito.esito, { lato: esito.lato, passo: esito.passo, gradino: atto.gradino, convinzione: nome }, localize, format);
  const fine = avvisoFine(esito.next, localize);
  await segnaEsitoSullaCarta(tiro.message, { esito: esito.esito, passo: esito.passo, testo: [testo, fine].filter(Boolean).join(" ") });
  ui.notifications.info([...parts, testo, fine].filter(Boolean).join(" "));
}

/** I campi della finestra del Risplende, letti e puliti. */
export function normalizeRisplende(result = {}) {
  return {
    convinzione: String(result.convinzione ?? ""),
    lato: normalizeLato(result.lato),
    concesso: Boolean(result.concesso)
  };
}

/**
 * Risplende: l'atto che fa risplendere una Convinzione (lo chiama il
 * Narratore a fine scena, una volta per sessione per giocatore). La
 * Convinzione torna attiva e il segno del lato scelto torna indietro di un
 * passo; se quel segno è già al centro, riaccende e basta.
 */
export async function onWisdomRisplende(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const wisdom = getWisdom(actor);
  const content = await foundry.applications.handlebars.renderTemplate(
    "modules/wod5e-mage/templates/dialogs/saggezza-risplende.hbs",
    {
      convinzioni: wisdom.convinzioni,
      lati: LATI.map((id) => ({ id, label: localize(`WOD5E_MAGE.Wisdom.Lati.${id}`), passo: wisdom.stato[id].text, fermo: wisdom.stato[id].passo === 0 })),
      usato: wisdom.risplende
    }
  );
  let result = null;
  try {
    result = await foundry.applications.api.DialogV2.input({
      window: { title: localize("WOD5E_MAGE.Wisdom.RisplendeDialog.Title") },
      content,
      ok: { icon: "fa-solid fa-sun", label: localize("WOD5E_MAGE.Wisdom.RisplendeDialog.Ok") },
      buttons: [{ action: "cancel", icon: "fas fa-times", label: localize("WOD5E.Cancel") }],
      classes: ["wod5e", "wod5e-mage", "mage", actor.system.gamesystem, "wod5e-mage-roll-dialog", "wod5e-mage-saggezza-dialog"],
      position: { width: 460, height: "auto" }
    });
  } catch (_error) {
    return;
  }
  if (!result || result === "cancel") return;
  const scelta = normalizeRisplende(result);
  if (!scelta.lato) {
    ui.notifications.warn(localize("WOD5E_MAGE.Wisdom.Atto.LatoManca"));
    return;
  }
  const stato = normalizeSaggezza(actor.getFlag(MODULE_ID, "wisdom"));
  if (stato.risplende && !scelta.concesso) {
    ui.notifications.warn(localize("WOD5E_MAGE.Wisdom.RisplendeDialog.GiaUsato"));
    return;
  }
  const righe = { ...(actor.getFlag(MODULE_ID, PERSONAGGIO_TABLES.convictions) ?? {}) };
  const riga = scelta.convinzione && righe[scelta.convinzione] ? righe[scelta.convinzione] : null;
  const parts = [];
  if (riga) {
    if (riga.spenta) {
      await actor.setFlag(MODULE_ID, PERSONAGGIO_TABLES.convictions, { ...righe, [scelta.convinzione]: { ...riga, spenta: false } });
      parts.push(format("WOD5E_MAGE.Wisdom.RisplendeDialog.Riaccesa", { convinzione: String(riga.text ?? "") }));
    } else {
      parts.push(format("WOD5E_MAGE.Wisdom.RisplendeDialog.Tenuta", { convinzione: String(riga.text ?? "") }));
    }
  }
  const dopo = applicaRisplende(stato, scelta.lato);
  await saveSaggezza(actor, dopo);
  parts.push(dopo.tornato
    ? format("WOD5E_MAGE.Wisdom.RisplendeDialog.Tornato", { lato: latoNome(scelta.lato, localize), passo: passoTesto(scelta.lato, dopo[scelta.lato], localize, format) })
    : format("WOD5E_MAGE.Wisdom.RisplendeDialog.GiaAlCentro", { lato: latoNome(scelta.lato, localize) }));
  await raccontaAtto(actor, parts.join(" "));
  ui.notifications.info(parts.join(" "));
}

/** I campi della finestra dell'Ancora, letti e puliti. */
export function normalizeAncora(result = {}) {
  return {
    ancora: String(result.ancora ?? ""),
    lato: normalizeLato(result.lato),
    concesso: Boolean(result.concesso)
  };
}

/**
 * Ancora: la scena con un'Ancora, una volta per storia per ogni Ancora, fa
 * ritirare per recuperare un passo: Fermezza + Autocontrollo meno il passo
 * dove sta il segno, un 8 riesce, e il segno torna indietro di uno. In casi
 * eccezionali il Narratore lo concede senza tirare. Il tasto «Nuova storia»
 * riarma tutte le Ancore.
 */
export async function onWisdomAncora(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const wisdom = getWisdom(actor);
  if (!wisdom.ancore.length) {
    ui.notifications.warn(localize("WOD5E_MAGE.Wisdom.AncoraDialog.Nessuna"));
    return;
  }
  const content = await foundry.applications.handlebars.renderTemplate(
    "modules/wod5e-mage/templates/dialogs/saggezza-ancora.hbs",
    {
      ancore: wisdom.ancore,
      lati: LATI.map((id) => ({ id, label: localize(`WOD5E_MAGE.Wisdom.Lati.${id}`), passo: wisdom.stato[id].text, fermo: wisdom.stato[id].passo === 0 })),
      riserva: wisdom.riserva,
      narratore: Boolean(game.user?.isGM)
    }
  );
  let result = null;
  try {
    result = await foundry.applications.api.DialogV2.input({
      window: { title: localize("WOD5E_MAGE.Wisdom.AncoraDialog.Title") },
      content,
      ok: { icon: "fa-solid fa-anchor", label: localize("WOD5E_MAGE.Wisdom.AncoraDialog.Ok") },
      buttons: [
        { action: "riarma", icon: "fa-solid fa-book", label: localize("WOD5E_MAGE.Wisdom.AncoraDialog.Riarma") },
        { action: "cancel", icon: "fas fa-times", label: localize("WOD5E.Cancel") }
      ],
      classes: ["wod5e", "wod5e-mage", "mage", actor.system.gamesystem, "wod5e-mage-roll-dialog", "wod5e-mage-saggezza-dialog"],
      position: { width: 460, height: "auto" }
    });
  } catch (_error) {
    return;
  }
  if (!result || result === "cancel") return;
  const stato = normalizeSaggezza(actor.getFlag(MODULE_ID, "wisdom"));
  if (result === "riarma") {
    await saveSaggezza(actor, { ...stato, ancore: {} });
    ui.notifications.info(localize("WOD5E_MAGE.Wisdom.AncoraDialog.Riarmate"));
    return;
  }
  const scelta = normalizeAncora(result);
  const ancora = wisdom.ancore.find((row) => row.id === scelta.ancora);
  if (!ancora) {
    ui.notifications.warn(localize("WOD5E_MAGE.Wisdom.AncoraDialog.Nessuna"));
    return;
  }
  if (!scelta.lato) {
    ui.notifications.warn(localize("WOD5E_MAGE.Wisdom.Atto.LatoManca"));
    return;
  }
  if (ancora.usata && !game.user?.isGM) {
    ui.notifications.warn(format("WOD5E_MAGE.Wisdom.AncoraDialog.GiaUsata", { ancora: ancora.text }));
    return;
  }
  const passo = clampPasso(stato[scelta.lato]);
  if (passo === 0) {
    ui.notifications.info(format("WOD5E_MAGE.Wisdom.RisplendeDialog.GiaAlCentro", { lato: latoNome(scelta.lato, localize) }));
    return;
  }

  // Il Narratore concede senza tirare: il segno torna indietro.
  if (scelta.concesso && game.user?.isGM) {
    const dopo = applicaAncora(stato, scelta.lato, ancora.id, { riuscito: true });
    await saveSaggezza(actor, dopo);
    const testo = format("WOD5E_MAGE.Wisdom.AncoraDialog.Concesso", { ancora: ancora.text, lato: latoNome(scelta.lato, localize), passo: passoTesto(scelta.lato, dopo[scelta.lato], localize, format) });
    await raccontaAtto(actor, testo);
    ui.notifications.info(testo);
    return;
  }

  const tiro = await rollSaggezza(actor, {
    soglia: passo,
    title: format("WOD5E_MAGE.Wisdom.AncoraDialog.Rolling", { ancora: ancora.text }),
    card: { ancora: ancora.text, lato: scelta.lato, passo }
  });
  if (!tiro) return;
  const riuscito = tiro.successi >= 1;
  const dopo = applicaAncora(stato, scelta.lato, ancora.id, { riuscito });
  await saveSaggezza(actor, dopo);
  const testo = riuscito
    ? format("WOD5E_MAGE.Wisdom.AncoraDialog.Riuscito", { ancora: ancora.text, lato: latoNome(scelta.lato, localize), passo: passoTesto(scelta.lato, dopo[scelta.lato], localize, format) })
    : format("WOD5E_MAGE.Wisdom.AncoraDialog.Fallito", { ancora: ancora.text, lato: latoNome(scelta.lato, localize) });
  await segnaEsitoSullaCarta(tiro.message, { esito: riuscito ? "coperto" : "fallito", passo: dopo[scelta.lato], testo });
  ui.notifications.info(testo);
}

/** Reset: i due segni tornano al centro; le Convinzioni restano come sono. */
export async function onWisdomReset(event) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const stato = normalizeSaggezza(actor.getFlag(MODULE_ID, "wisdom"));
  await saveSaggezza(actor, { ...stato, hubris: 0, silenzio: 0 });
}

/** L'interruttore della Convinzione nella pagina Personaggio: attiva o spenta. */
export async function onConvinzioneToggle(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (!canEdit(actor)) return;
  const rowId = String(target?.dataset?.row ?? "");
  const righe = actor.getFlag(MODULE_ID, PERSONAGGIO_TABLES.convictions) ?? {};
  if (!rowId || !Object.hasOwn(righe, rowId)) return;
  await actor.setFlag(MODULE_ID, PERSONAGGIO_TABLES.convictions, { ...righe, [rowId]: { ...righe[rowId], spenta: !righe[rowId].spenta } });
}

/**
 * Nuova sessione: il Risplende torna disponibile (una volta per sessione).
 * Le Ancore si riarmano a parte, con la storia.
 */
export function wisdomAfterSession(stored) {
  return { ...normalizeSaggezza(stored), risplende: false };
}

/** La nota sotto i dadi di un tiro di Saggezza: com'è andata, e il passo. */
export function renderEsitoSaggezza(saggezza, localize) {
  if (!saggezza?.testo) return "";
  const label = localize("WOD5E_MAGE.Wisdom.Label");
  return `<p class="wod5e-mage-roll-note wod5e-mage-roll-note-saggezza ${saggezza.esito === "fallito" ? "scende" : "resta"}"><b class="wod5e-mage-saggezza-label">${label}</b> <span>${String(saggezza.testo).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span></p>`;
}

/** Sotto i dadi del tiro di Saggezza, la riga dell'esito, a ogni render. */
export function decorateSaggezza(message, html) {
  if (!html?.querySelector) return false;
  const card = message.getFlag?.(MODULE_ID, ROLL_CARD_FLAG) ?? {};
  if (!card.saggezza?.testo) return false;
  const target = html.querySelector(".dice-result") ?? html.querySelector(".message-content");
  if (!target || target.querySelector(".wod5e-mage-roll-note-saggezza")) return false;
  target.insertAdjacentHTML("beforeend", renderEsitoSaggezza(card.saggezza, game.i18n.localize.bind(game.i18n)));
  return true;
}

export function registerSaggezza() {
  Hooks.on("renderChatMessageHTML", decorateSaggezza);
}
