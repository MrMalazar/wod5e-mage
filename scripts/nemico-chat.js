/**
 * Le carte in chat del nemico (Blue, 25/9, dal mock): il tiro di un'azione o
 * di una riserva (ritratto e nome, «Spara · su Guendalina», il conto, i dadi
 * del modulo, l'esito, e il tasto che applica il danno o la Condizione al
 * bersaglio) e il lancio di Magick (la soglia in grande con gli Ambiti, cosa
 * fa, i danni, «Resiste con …», il tasto Resisti che apre il Tiro del PG con
 * la soglia già dentro). Il bersaglio è il token preso di mira dal Narratore.
 *
 * Il tiro passa da rollRamoCDirect (paradox-dice.js), come i tiri di Abilità
 * del mago: la carta è quella del modulo, i dadi hanno le sue facce, e i
 * tasti del mago (Volontà, Sforzo, Prezzo, Ustione) non compaiono perché
 * l'attore non è un Mago. Quello che serve al tasto «Applica» sta nella
 * bandiera della carta, sotto `nemico`.
 */
import { activeCondizioni, findCondizioneByName, toggleCondizione } from "./condizioni.js";
import { MODULE_ID } from "./constants.js";
import { isMageActor } from "./mage-dice.js";
import { armaturaDi, contoDelTiro, RIESCE_DAL } from "./nemico.js";
import { renderRollCard, ROLL_CARD_FLAG, rollActionsBox } from "./roll-card.js";
import { addSaluteDamage } from "./salute.js";

export const NEMICO_MAGICK_FLAG = "nemicoMagick";

/** Il bersaglio: il primo token preso di mira da chi tira (il Narratore), se ha un attore. */
export function bersaglioPreso(user = globalThis.game?.user) {
  const token = [...(user?.targets ?? [])][0];
  const actor = token?.actor;
  if (!actor) return null;
  return { uuid: String(actor.uuid ?? ""), name: String(token.name ?? actor.name ?? ""), actor };
}

/**
 * Il tiro del nemico: la riserva già scalata dalle Condizioni meno la soglia
 * del bersaglio, riesce dal 6; a zero dadi non si tira. Torna il messaggio.
 */
export async function tiraNemico(actor, { nome = "", riserva, soglia = 0, danno = 0, aggravato = false, condizione = "" } = {}) {
  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const bersaglio = bersaglioPreso();
  const conto = contoDelTiro({ nome, riserva, soglia, bersaglio, danno, aggravato, condizione, localize, format });
  if (conto.dadi <= 0) {
    ui.notifications.warn(localize("WOD5E_MAGE.Nemico.ZeroDadi"));
    return null;
  }
  const armatura = bersaglio?.actor ? armaturaDi(bersaglio.actor.items?.contents ?? [...(bersaglio.actor.items ?? [])]) : null;
  const notes = armatura?.totale ? [format("WOD5E_MAGE.Nemico.ArmaturaBersaglio", { bersaglio: bersaglio.name, punti: armatura.totale })] : [];
  const flavor = renderRollCard({
    traits: [{ label: riserva.label ?? "", value: riserva.base }],
    bonusParts: (riserva.voci ?? []).map((voce) => `${voce.value} ${voce.nome}`),
    threshold: Math.max(Math.trunc(Number(soglia) || 0), 0)
  }, localize);
  const { rollRamoCDirect } = await import("./paradox-dice.js");
  return rollRamoCDirect({
    actor,
    data: actor.system,
    pool: riserva.totale,
    threshold: soglia,
    successFrom: RIESCE_DAL,
    paradoxRating: 0,
    skill: true,
    title: conto.titolo,
    flavor,
    card: {
      symbols: [],
      traits: [{ id: String(riserva.id ?? ""), type: "nemico", label: riserva.label ?? "", value: riserva.totale }],
      nemico: { ...conto, bersaglio: conto.bersaglio, armatura: armatura?.totale ?? 0, applicato: false }
    },
    activeModifiers: (riserva.voci ?? []).map((voce) => ({ label: voce.nome, value: String(voce.value) })),
    notes
  });
}

/** Il lancio di Magick del nemico: la carta con la soglia, cosa fa, i danni e il tiro di resistenza. */
export async function lanciaNemico(actor, effetto) {
  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const bersaglio = bersaglioPreso();
  const titolo = bersaglio ? format("WOD5E_MAGE.Nemico.LanciaSu", { effetto: effetto.nome, bersaglio: bersaglio.name }) : format("WOD5E_MAGE.Nemico.LanciaSolo", { effetto: effetto.nome });
  const content = await foundry.applications.handlebars.renderTemplate(`modules/${MODULE_ID}/templates/chat/nemico-magick.hbs`, {
    nemico: { name: actor.name, img: actor.img },
    effetto,
    titolo,
    sogliaTesto: format("WOD5E_MAGE.Nemico.SogliaCarta", { ambiti: effetto.ambitiTesto || localize("WOD5E_MAGE.Nemico.TuttiZero") }),
    danniTesto: effetto.danni ? format("WOD5E_MAGE.Nemico.DannoEsito", { danno: effetto.danni, tipo: localize("WOD5E_MAGE.Nemico.Superficiali") }) : "",
    resisteLabel: effetto.resisteTesto ? format("WOD5E_MAGE.Nemico.ResistiCon", { tiro: effetto.resisteTesto }) : localize("WOD5E_MAGE.Nemico.ResistenzaDaScrivere")
  });
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content,
    flags: { [MODULE_ID]: { [NEMICO_MAGICK_FLAG]: { nome: effetto.nome, soglia: effetto.soglia, resiste: { ...(effetto.resiste ?? {}) }, resisteTesto: effetto.resisteTesto ?? "", bersaglio: bersaglio ? { uuid: bersaglio.uuid, name: bersaglio.name } : null } } }
  });
}

/** Chi può premere un tasto sul bersaglio: il Narratore, o chi possiede l'attore. */
function puoToccare(actor) {
  return Boolean(game.user?.isGM || actor?.isOwner);
}

/** La carta del tiro: il conto e l'esito in chiaro, e il tasto «Applica a <bersaglio>» se riesce. */
async function decoraCartaTiro(message, html) {
  const card = message?.getFlag?.(MODULE_ID, ROLL_CARD_FLAG);
  const nemico = card?.nemico;
  if (!nemico || !html?.querySelector) return false;
  const result = html.querySelector(".dice-result");
  if (!result || result.querySelector(".wod5e-mage-nemico-conto")) return false;
  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  const riga = document.createElement("div");
  riga.className = "wod5e-mage-nemico-conto";
  riga.textContent = nemico.conto ?? "";
  const icons = result.querySelector(".dice-icons");
  if (icons) icons.before(riga); else result.prepend(riga);
  const riuscito = Number(card.total) >= 1;
  if (riuscito && nemico.esito) {
    const esito = document.createElement("div");
    esito.className = "wod5e-mage-nemico-esito";
    esito.textContent = `${localize("WOD5E_MAGE.Nemico.Riesce")} · ${nemico.esito}`;
    result.querySelector(".wod5e-mage-roll-actions")?.before(esito) ?? result.append(esito);
  }
  const bersaglio = nemico.bersaglio;
  if (!riuscito || !bersaglio?.uuid || (!nemico.danno && !nemico.condizione) || nemico.applicato) return true;
  const target = await fromUuid(bersaglio.uuid).catch(() => null);
  if (!target || !puoToccare(target)) return true;
  const box = rollActionsBox(result);
  const button = document.createElement("button");
  button.type = "button";
  button.className = "wod5e-mage-nemico-applica";
  button.dataset.nemicoApplica = "1";
  button.textContent = nemico.danno
    ? format("WOD5E_MAGE.Nemico.Applica", { bersaglio: bersaglio.name })
    : format("WOD5E_MAGE.Nemico.ApplicaCondizione", { condizione: nemico.condizione, bersaglio: bersaglio.name });
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    button.disabled = true;
    await applicaAlBersaglio(target, nemico, { localize, format });
    if (message.isOwner || game.user.isGM) await message.update({ [`flags.${MODULE_ID}.${ROLL_CARD_FLAG}.nemico.applicato`]: true }).catch(() => null);
    button.remove();
  });
  box.append(button);
  return true;
}

/** Il danno sulla Salute del bersaglio coi conti di salute.js, o la Condizione accesa. */
export async function applicaAlBersaglio(target, nemico, { localize = (k) => k, format = (k, d) => `${k} ${JSON.stringify(d)}` } = {}) {
  const danno = Math.max(Math.trunc(Number(nemico?.danno) || 0), 0);
  if (danno) {
    await addSaluteDamage(target, nemico.aggravato ? { pa: danno } : { ps: danno });
    ui.notifications.info(format("WOD5E_MAGE.Nemico.Applicato", { bersaglio: target.name, danno, tipo: localize(nemico.aggravato ? "WOD5E_MAGE.Nemico.Aggravati" : "WOD5E_MAGE.Nemico.Superficiali") }));
  }
  const nome = String(nemico?.condizione ?? "").trim();
  if (nome) {
    const entry = findCondizioneByName(nome);
    if (entry && !activeCondizioni(target.items).get(entry.id)) await toggleCondizione(target, entry);
    ui.notifications.info(format("WOD5E_MAGE.Nemico.CondizioneMessa", { bersaglio: target.name, condizione: nome }));
  }
}

/** La carta del lancio: il tasto «Resisti · <bersaglio>» per chi possiede il bersaglio. */
async function decoraCartaMagick(message, html) {
  const dati = message?.getFlag?.(MODULE_ID, NEMICO_MAGICK_FLAG);
  if (!dati || !html?.querySelector) return false;
  const carta = html.querySelector(".wod5e-mage-nemico-carta");
  if (!carta || carta.querySelector("[data-nemico-resisti]")) return false;
  const bersaglio = dati.bersaglio;
  if (!bersaglio?.uuid) return true;
  const target = await fromUuid(bersaglio.uuid).catch(() => null);
  if (!target || !puoToccare(target)) return true;
  const format = game.i18n.format.bind(game.i18n);
  const button = document.createElement("button");
  button.type = "button";
  button.className = "wod5e-mage-nemico-resisti";
  button.dataset.nemicoResisti = "1";
  button.innerHTML = `<i class="fa-solid fa-shield-halved" aria-hidden="true"></i> ${format("WOD5E_MAGE.Nemico.ResistiSu", { bersaglio: bersaglio.name })}`;
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    await apriResistenza(target, dati);
  });
  carta.append(button);
  return true;
}

/** Il Tiro del PG con la soglia già scritta e, se c'è, Attributo + Abilità già messi. */
export async function apriResistenza(target, dati) {
  const localize = game.i18n.localize.bind(game.i18n);
  const format = game.i18n.format.bind(game.i18n);
  if (!isMageActor(target)) {
    ui.notifications.warn(format("WOD5E_MAGE.Nemico.ResistiSenzaScheda", { bersaglio: target.name }));
    return false;
  }
  const sheet = target.sheet;
  await sheet.render(true);
  const { caricaResistenza } = await import("./tiro-scheda.js");
  await caricaResistenza(sheet, { soglia: dati.soglia, attribute: dati.resiste?.attribute ?? "", skill: dati.resiste?.skill ?? "" });
  ui.notifications.info(format("WOD5E_MAGE.Nemico.ResistiAperto", { bersaglio: target.name, soglia: dati.soglia }));
  return true;
}

/**
 * Le azioni senza tiro accese si spengono al turno dopo del nemico, se c'è un
 * combattimento aperto: lo scrive il Narratore attivo, una volta sola.
 */
function spegniAttiveAlTurno(combat, change) {
  if (!("turn" in (change ?? {})) && !("round" in (change ?? {}))) return;
  if (game.users?.activeGM && game.users.activeGM !== game.user) return;
  const actor = combat?.combatant?.actor;
  const attive = actor?.getFlag?.(MODULE_ID, "nemico")?.attive;
  if (!attive || !Object.keys(attive).length) return;
  actor.update({ [`flags.${MODULE_ID}.nemico.-=attive`]: null }).catch(() => null);
}

export function registraNemicoChat() {
  Hooks.on("renderChatMessageHTML", (message, html) => { decoraCartaTiro(message, html); decoraCartaMagick(message, html); });
  Hooks.on("updateCombat", spegniAttiveAlTurno);
}
