/**
 * Il menù circolare del Narratore nella finestra del Quadro (Blue, 17-18/11/2026),
 * portato dal mock approvato: lo stato, il disegno in HTML e le azioni.
 *
 * Il disegno si rifà a ogni cambio di stato e si «innesta» sul DOM che c'è
 * (innesta, più sotto): gli elementi restano gli stessi e cambiano solo stile e
 * classi, così le transizioni dell'anello e del pannello girano come nel mock e
 * i campi non perdono il fuoco mentre si scrive.
 *
 * Qui non si tocca Foundry: tutto quello che viene dal mondo (la riserva, i maghi
 * del Quadro, i PNG in scena, il token scelto, i fatti fissati, il turno, la
 * spesa e la carta in chat) passa dalla «fonte» che il Quadro gli dà
 * (fonteDelQuadro in quadro-narratore.js). Nelle prove la fonte è finta.
 */
import { SCOPE_ICONS } from "./scopes.js";
import { MENU_ICONE, MENU_ICONE_LATI, MENU_ICONE_VIEWBOX, MENU_SFERE } from "./data/menu-sfere.js";
import {
  AMBITI_LANCIO,
  AMBITI_MAX,
  ambitiNuovi,
  cerchiDelleSfere,
  COMPONI,
  disegno,
  EFFETTI_LANCIO,
  formulaM6,
  formuleDellaSfera,
  idEffettoMagick,
  isEffettoMagick,
  LATI,
  latoEtichetta,
  MISURE,
  palliniRiserva,
  piuVicina,
  posizioneSfera,
  posizioniLati,
  posizioniVentaglio,
  riassuntoAmbiti,
  rigaMenu,
  righeDelLato,
  rotazionePer,
  sogliaPerScardinare,
  toccaAmbito
} from "./menu-circolare.js";

const PREFISSO = "wod5e-mage-mc-";
const SECONDI = 5;
const CHIAVE = "WOD5E_MAGE.MenuCircolare";

/** Il testo dentro l'HTML, sia nei nodi sia negli attributi. */
export function esc(valore) {
  return String(valore ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/** Un'icona di Game-icons dal foglio di simboli in testa al menù. */
function icona(nome, classe = "") {
  if (!nome || !MENU_ICONE[nome]) return "";
  return `<svg class="mc-ico${classe ? ` ${classe}` : ""}" viewBox="${MENU_ICONE_VIEWBOX}" aria-hidden="true" focusable="false"><use href="#${PREFISSO}${nome}"></use></svg>`;
}

/** Il foglio di simboli: le icone una volta sola, poi ogni mossa le richiama con <use>. */
export function foglioIcone() {
  const simboli = Object.entries(MENU_ICONE).map(([nome, d]) => `<symbol id="${PREFISSO}${nome}" viewBox="${MENU_ICONE_VIEWBOX}"><path d="${d}"></path></symbol>`).join("");
  return `<svg class="mc-foglio" aria-hidden="true" focusable="false"><defs>${simboli}</defs></svg>`;
}

const fa = (classi) => `<i class="${classi}" aria-hidden="true"></i>`;
const OCCHIO = `<svg class="mc-occhio" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="M8 50 Q50 14 92 50 Q50 86 8 50 Z"></path><circle cx="50" cy="50" r="14"></circle></svg>`;
const r2 = (v) => Math.round(v * 100) / 100;
const norm = (t) => String(t ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export class MenuCircolare {
  constructor(fonte) {
    this.fonte = fonte;
    this.stato = {
      W: 1100, H: 700, s: null, side: null, row: null, hov: null,
      rot: 0, gen: 0, fgen: 0, fdl: 0, mgen: 0, mdl: 0,
      paga: 1, chi: "", durata: "scena", nota: "", pop: null, q: "",
      actOpen: false, legOpen: false,
      gq: "", fsel: null, win: false, wObj: "", wEff: "", wSf: 1, wAmb: ambitiNuovi(), wFrom: null, wNota: false, cast: null
    };
    this.root = null;
    this.vivo = null;
    this.osservatore = null;
    this.palco = null;
    this.tick = null;
    this.via = null;
    this.ascolti = [];
  }

  /* ---------------------------------------------------------------- */
  /* Le parole                                                         */
  /* ---------------------------------------------------------------- */

  t(chiave, dati = null) {
    const k = `${CHIAVE}.${chiave}`;
    return dati ? this.fonte.format(k, dati) : this.fonte.localize(k);
  }

  mosse(n) {
    return n === 1 ? this.t("Mossa") : this.t("Mosse", { n });
  }

  nomeSfera(id) {
    return this.fonte.nomeSfera?.(id) || MENU_SFERE.find((s) => s.id === id)?.nome || id;
  }

  /* ---------------------------------------------------------------- */
  /* I dati del mondo, una lettura per disegno                         */
  /* ---------------------------------------------------------------- */

  dati() {
    const f = this.fonte;
    const maghi = f.maghi?.() ?? [];
    const png = f.png?.() ?? [];
    const attore = f.attore?.() ?? null;
    const turno = f.turno?.() ?? { chiave: "", usato: "" };
    return {
      riserva: Math.max(Math.trunc(Number(f.riserva?.()) || 0), 0),
      maghi,
      png,
      attore,
      cerchi: cerchiDelleSfere({ alTavolo: maghi.flatMap((m) => m.sfere ?? []), delNemico: png.filter((p) => p.magick).flatMap((p) => p.sfere ?? []) }),
      fissati: f.fissati?.() ?? [],
      turno,
      turnoBloccato: Boolean(turno.chiave) && turno.usato === turno.chiave
    };
  }

  /* ---------------------------------------------------------------- */
  /* Le azioni (come nel mock)                                         */
  /* ---------------------------------------------------------------- */

  imposta(upd) {
    Object.assign(this.stato, upd);
    this.disegna();
  }

  libera() {
    return { row: null, hov: null, fsel: null, gq: "", win: false, cast: null, wFrom: null, wNota: false };
  }

  scelta() {
    return { paga: 1, chi: "", durata: "scena", nota: "" };
  }

  allAnello() {
    this.imposta({ ...this.libera(), s: null, side: null, rot: piuVicina(this.stato.rot, 0) });
  }

  sfera(i) {
    const st = this.stato;
    if (!(i >= 0 && i < MENU_SFERE.length)) return;
    if (st.s === i) {
      if (st.side) this.imposta({ ...this.libera(), side: null, mgen: st.mgen + 1, mdl: 0 });
      else this.allAnello();
      return;
    }
    this.imposta({ ...this.libera(), s: i, rot: piuVicina(st.rot, rotazionePer(i)), gen: st.gen + 1, fgen: st.fgen + 1, fdl: st.s === null ? 650 : 420, mgen: st.mgen + 1, mdl: 300, paga: 1, q: "" });
  }

  lato(side) {
    const st = this.stato;
    if (st.s === null || st.side === side || !LATI.includes(side)) return;
    this.imposta({ ...this.libera(), side, fgen: st.fgen + 1, fdl: 200, mgen: st.mgen + 1, mdl: 0, paga: 1 });
  }

  alternaLato(side) {
    const st = this.stato;
    if (st.side === side) this.imposta({ ...this.libera(), side: null, mgen: st.mgen + 1, mdl: 0 });
    else this.lato(side);
  }

  indietro() {
    const st = this.stato;
    if (st.actOpen) this.imposta({ actOpen: false });
    else if (st.win) this.imposta({ win: false, wNota: false });
    else if (st.cast) this.imposta({ cast: null });
    else if (st.fsel) this.imposta({ fsel: null });
    else if (st.row) this.imposta(this.libera());
    else if (st.side) this.imposta({ ...this.libera(), side: null, mgen: st.mgen + 1, mdl: 0 });
    else if (st.s !== null) this.allAnello();
  }

  riga(id) {
    if (this.stato.row === id) {
      this.imposta(this.libera());
      return;
    }
    const upd = { ...this.libera(), row: id, ...this.scelta() };
    if (id === COMPONI) Object.assign(upd, { win: true, wObj: "", wEff: "", wSf: 1, wAmb: ambitiNuovi() });
    this.imposta(upd);
  }

  formula(id) {
    this.imposta({ fsel: id, ...this.scelta() });
  }

  apriFinestra(fid = null) {
    const st = this.stato;
    if (st.s === null) return;
    const sf = MENU_SFERE[st.s];
    const f = fid ? formulaM6(fid) : null;
    const pre = f?.thresholds?.[0]?.scopes ?? null;
    this.imposta({ win: true, wFrom: f ? f.id : null, wObj: f ? `${f.name}: ${f.bySphere?.[sf.id] || f.intro}` : "", wEff: "", wSf: 1, wAmb: ambitiNuovi(pre), wNota: false, cast: null });
  }

  dalGrimorio() {
    const st = this.stato;
    if (st.s === null) return;
    this.imposta({ ...this.libera(), row: idEffettoMagick(MENU_SFERE[st.s].id), ...this.scelta() });
  }

  ambito(id, n) {
    const { livelli, rifiutato } = toccaAmbito(this.stato.wAmb, id, n);
    this.imposta({ wAmb: livelli, wNota: rifiutato });
  }

  /** La soglia del lancio per il PNG scelto (la regola dei nemici: gli Ambiti e la sua Areté); senza PNG con la Magick non c'è. */
  sogliaPng(dati = this.dati()) {
    const a = dati.attore;
    if (!a?.magick || !this.fonte.sogliaDagliAmbiti) return null;
    return this.fonte.sogliaDagliAmbiti(this.stato.wAmb, a.arete);
  }

  lancia() {
    const st = this.stato;
    const obj = st.wObj.trim();
    if (st.s === null || !obj) return;
    const sf = MENU_SFERE[st.s];
    const f = formulaM6(st.wFrom);
    const parti = [obj, `${this.nomeSfera(sf.id)} ${st.wSf}`, riassuntoAmbiti(st.wAmb, this.fonte.localize)];
    if (st.wEff) parti.push(this.t("Lancio.effettoParola", { e: this.t(`Lancio.effetti.${st.wEff}`).toLowerCase() }));
    const soglia = this.sogliaPng();
    if (soglia !== null) parti.push(this.t("Grimorio.soglia", { s: soglia }));
    this.imposta({ win: false, wNota: false, cast: { nome: f ? f.name : this.t("Lancio.composto"), testo: parti.join(" · ") }, paga: 1 });
  }

  /** Cosa si spende adesso: l'incantesimo composto, la Formula scelta o la riga. */
  spendibile() {
    const st = this.stato;
    if (st.s === null) return null;
    const sf = MENU_SFERE[st.s];
    if (st.cast) return { id: st.cast.nome, nome: st.cast.nome, testo: st.cast.testo, fissa: false, spell: true, prezzo: null };
    if (isEffettoMagick(st.row)) {
      const f = formulaM6(st.fsel);
      if (!f) return null;
      const per = f.bySphere?.[sf.id];
      return { id: f.id, nome: f.name, testo: per ? `${this.nomeSfera(sf.id)}: ${per}` : f.intro, fissa: false, spell: true, prezzo: null };
    }
    if (st.row && st.row !== COMPONI) {
      const r = rigaMenu(sf, st.row);
      return r ? { id: r.id, nome: r.nome, testo: r.testo, fissa: r.fissa, spell: false, prezzo: r.prezzo } : null;
    }
    return null;
  }

  /** Dalla cerca: la Sfera, il lato e la riga in un colpo. */
  vaiRiga(i, side, id) {
    const st = this.stato;
    const stessa = st.s === i;
    this.imposta({
      ...this.libera(),
      s: i, side, row: id, q: "", rot: piuVicina(st.rot, rotazionePer(i)),
      gen: stessa ? st.gen : st.gen + 1,
      fgen: stessa && st.side === side ? st.fgen : st.fgen + 1,
      fdl: stessa ? 200 : (st.s === null ? 650 : 420),
      mgen: stessa && st.side === side ? st.mgen : st.mgen + 1, mdl: stessa ? 0 : 300,
      ...this.scelta()
    });
  }

  paga(delta) {
    const riserva = this.dati().riserva;
    this.imposta({ paga: Math.min(Math.max(1, riserva), Math.max(1, this.stato.paga + delta)) });
  }

  /**
   * La spesa: la riserva scende subito (la fonte paga, segna il registro, il
   * fatto fissato, l'effetto sul mago e il turno); il pop-up dà cinque secondi
   * per nasconderla, poi la carta va al tavolo.
   */
  async spendi() {
    const st = this.stato;
    const sp = this.spendibile();
    if (!sp) return false;
    const dati = this.dati();
    if (st.paga < 1 || st.paga > dati.riserva) {
      this.fonte.avvisa?.(this.t("Avvisi.troppo", { p: st.paga, n: dati.riserva }));
      return false;
    }
    if (st.side === "s" && dati.turnoBloccato) {
      this.fonte.avvisa?.(this.t("Avvisi.turno"));
      return false;
    }
    const sf = MENU_SFERE[st.s];
    const durata = st.side === "n" ? (st.durata === "lunga" ? "lunga" : "scena") : (sp.spell ? "incantesimo" : "riga");
    const mago = dati.maghi.find((m) => m.id === st.chi) ?? null;
    const spesa = {
      sfera: sf.id,
      sferaNome: this.nomeSfera(sf.id),
      lato: st.side,
      riga: st.row ?? "",
      nome: sp.nome,
      testo: sp.testo,
      fissa: Boolean(sp.fissa),
      spell: Boolean(sp.spell),
      paga: st.paga,
      soglia: sogliaPerScardinare(st.paga, sp.fissa),
      durata,
      durataTesto: this.t(`Durate.${durata}`),
      suChi: mago ? { id: mago.id, nome: mago.nome } : null,
      da: dati.attore ? { id: dati.attore.id, nome: dati.attore.nome } : null,
      nota: st.nota.trim(),
      chiaveTurno: dati.turno.chiave ?? "",
      quando: Date.now()
    };
    // Un pop-up ancora in conto parte subito: due spese di fila non se ne perdono una.
    await this.sfuggi();
    const esito = await this.fonte.spendi?.(spesa);
    if (!esito?.ok) return false;
    this.imposta({ ...this.libera(), ...this.scelta(), pop: { ...spesa, secs: SECONDI, stato: "conto" } });
    this.conta();
    return true;
  }

  conta() {
    clearInterval(this.tick);
    clearTimeout(this.via);
    this.tick = setInterval(() => {
      const p = this.stato.pop;
      if (!p || p.stato !== "conto") {
        clearInterval(this.tick);
        return;
      }
      if (p.secs <= 1) this.chiudiPop(false);
      else this.imposta({ pop: { ...p, secs: p.secs - 1 } });
    }, 1000);
  }

  /** La fine del conto: dichiarata al tavolo, o nascosta e solo ai Narratori. */
  async chiudiPop(nascosta) {
    const p = this.stato.pop;
    if (!p || p.stato !== "conto") return;
    clearInterval(this.tick);
    clearTimeout(this.via);
    this.imposta({ pop: { ...p, secs: 0, stato: nascosta ? "nascosta" : "dichiarata" } });
    this.via = setTimeout(() => this.imposta({ pop: null }), 2600);
    await this.fonte.dichiara?.(p, { nascosta });
  }

  nascondi() {
    return this.chiudiPop(true);
  }

  /** Se un pop-up conta ancora, la carta parte adesso (la finestra si chiude, arriva un'altra spesa). */
  async sfuggi() {
    if (this.stato.pop?.stato === "conto") await this.chiudiPop(false);
  }

  /* ---------------------------------------------------------------- */
  /* Il disegno                                                        */
  /* ---------------------------------------------------------------- */

  vista() {
    const st = this.stato;
    const dati = this.dati();
    const W = st.W;
    const H = st.H;
    const focus = st.s !== null;
    const S = focus ? MENU_SFERE[st.s] : null;
    const cerchioDi = (sf) => dati.cerchi[sf?.id] ?? "f";
    const rowSel = focus ? st.row : null;
    const d = disegno({ W, H, sfera: st.s, lato: st.side, riga: rowSel, rot: st.rot });
    const { k, stretto, largo } = d;
    const hubR = d.mozzo / 2;
    const riserva = dati.riserva;

    // L'anello: ogni Sfera col suo raggio, il nome sotto (sfumato), il suggerimento al passaggio.
    const anello = MENU_SFERE.map((sf, i) => {
      const a = -90 + 40 * i;
      const on = focus && st.s === i;
      const sz = on ? d.scelta : d.nodo;
      const rr = sz / 2;
      const nascosta = stretto && !on;
      const ts = latoEtichetta(a + st.rot);
      const tx = ts === "r" ? rr + 10 : ts === "l" ? -(rr + 10) : 0;
      const ty = ts === "t" ? -(rr + 8) : ts === "b" ? rr + 8 : 0;
      const cer = cerchioDi(sf);
      const nome = this.nomeSfera(sf.id);
      return `<div class="mc-spoke${on ? " on" : ""}" style="transform: rotate(${a}deg) translateX(${r2(hubR + 6)}px); width: ${r2(Math.max(0, d.R - hubR - rr - 12))}px; opacity: ${nascosta ? 0 : 1}"></div>`
        + `<div class="mc-rn${focus && !on ? " dim" : ""}" style="transform: rotate(${a}deg) translateX(${d.R}px) rotate(${-(a + st.rot)}deg); opacity: ${nascosta ? 0 : 1}; pointer-events: ${nascosta ? "none" : "auto"}">`
        + `<button type="button" class="mc-sph c-${cer}${on ? " on" : ""}" style="transform: scale(${r2(sz / MISURE.base)})" data-mc="sfera" data-a="${i}" aria-label="${esc(this.t("Aria.sfera", { nome, dominio: sf.dominio, breve: this.t(`Cerchi.${cer}.breve`) }))}" aria-pressed="${on}">`
        + `<span class="mc-sg mc-sg-${sf.id}"></span>${cer === "f" ? '<span class="mc-piu" aria-hidden="true">+</span>' : ""}${cer === "n" ? `<span class="mc-skl" aria-hidden="true">${fa("fa-solid fa-skull")}</span>` : ""}</button>`
        + `<span class="mc-snm${focus ? " off" : ""}" style="top: ${r2(rr + 6)}px" aria-hidden="true">${esc(nome)}</span>`
        + `<span class="mc-tip mc-tip-${ts}${on ? " off" : ""}" style="left: ${r2(tx)}px; top: ${r2(ty)}px"><b>${esc(nome)}</b>${esc(sf.dominio)}</span>`
        + "</div>";
    }).join("");

    // La legenda in basso a sinistra; se tocca l'anello diventa un bottone.
    const box = { x0: 24, y0: H - 180, x1: 364, y1: H - 20 };
    let legOk = H >= 500 && !(focus && !largo);
    for (let i = 0; legOk && i < MENU_SFERE.length; i++) {
      if (stretto && !(focus && st.s === i)) continue;
      const p = posizioneSfera(d, i, st.s);
      const lw = focus ? 0 : this.nomeSfera(MENU_SFERE[i].id).length * 3.3 + 8;
      const bx0 = Math.min(p.x - p.r, p.x - lw);
      const bx1 = Math.max(p.x + p.r, p.x + lw);
      const by0 = p.y - p.r;
      const by1 = p.y + p.r + (focus ? 0 : 26);
      if (bx1 > box.x0 && bx0 < box.x1 && by1 > box.y0 && by0 < box.y1) legOk = false;
    }
    const legBtn = !legOk && !(focus && !largo);
    const legCls = legOk ? "" : (st.legOpen && legBtn ? "over" : "hide");

    // I due lati sulla linea, con le linee che li legano alla Sfera.
    const nRighe = (side) => righeDelLato(S, side).length;
    const lati = focus ? posizioniLati(d, st.side).map((m) => {
      const n = nRighe(m.lato);
      const nome = this.t(`Lati.${m.lato}`);
      return `<div class="mc-conn" style="transform: rotate(${m.angolo}deg) translateX(${m.inizio}px)"><div class="mc-conn-l${m.scelto ? " on" : ""} ${st.mgen % 2 ? "mc-a" : "mc-b"}" style="width: ${m.lunghezza}px; animation-delay: ${st.mdl}ms"></div></div>`
        + `<div class="mc-mpos" style="transform: translate(${m.x}px, ${m.y}px)">`
        + `<button type="button" class="mc-mode${m.scelto ? " on" : m.altro ? " off" : ""} ${st.gen % 2 ? "in-a" : "in-b"}" style="width: ${r2(m.r * 2)}px; height: ${r2(m.r * 2)}px; left: ${r2(-m.r)}px; top: ${r2(-m.r)}px" data-mc="lato" data-a="${m.lato}" aria-label="${esc(this.t("Aria.lato", { lato: nome, n: this.mosse(n) }))}" aria-pressed="${m.scelto}">${icona(MENU_ICONE_LATI[m.lato])}</button>`
        + `<span class="mc-mode-l mc-mode-l-${m.lato === "n" ? "t" : "b"} ${st.gen % 2 ? "in-a" : "in-b"}${m.altro && k < 0.75 ? " mute" : ""}" style="left: ${r2(18 * Math.max(k, 0.6))}px; top: ${r2(m.lato === "n" ? -(m.r + 6) : m.r + 6)}px"><b>${esc(nome)}</b>${esc(this.mosse(n))}</span>`
        + "</div>";
    }).join("") : "";

    // Il ventaglio delle mosse del lato scelto, con Componi in fondo.
    const componi = { id: COMPONI, nome: this.t("Componi.nome"), testo: this.t("Componi.testo"), prezzo: null, fissa: false, icona: MENU_ICONE_LATI.componi };
    const lista = focus && st.side ? [...righeDelLato(S, st.side), componi] : [];
    const posti = posizioniVentaglio(d, lista.length);
    const fanAnim = st.fgen % 2 ? "fan-a" : "fan-b";
    const ventaglio = lista.map((r, j) => {
      const p = posti[j];
      const on = rowSel === r.id;
      const hov = st.hov === r.id && !on;
      const dl = Math.round(st.fdl + j * 35);
      const aria = [r.nome, r.prezzo === 1 ? this.t("Aria.uno") : "", r.fissa ? this.t("Aria.fissa") : ""].filter(Boolean).join(", ");
      return `<div class="mc-conn" data-k="c-${esc(r.id)}" style="transform: rotate(${p.angolo}deg) translateX(${p.inizio}px)"><div class="mc-conn-l${on ? " on" : hov ? " hov" : ""} ${fanAnim}" style="width: ${p.lunghezza}px; animation-delay: ${dl}ms"></div></div>`
        + `<div class="mc-fi ${fanAnim}" data-k="f-${esc(r.id)}" style="transform: translate(${p.x}px, ${p.y}px) scale(1); animation-delay: ${dl}ms">`
        + `<button type="button" class="mc-fbt${r.id === COMPONI ? " comp" : ""}${on ? " on" : ""}${hov ? " hov" : ""}" style="left: ${r2(-d.mossa / 2)}px; top: ${r2(-d.mossa / 2)}px" data-mc="riga" data-a="${esc(r.id)}" data-hov="${esc(r.id)}" aria-label="${esc(aria)}" aria-pressed="${on}">`
        + `<span class="mc-fc" style="width: ${d.mossa}px; height: ${d.mossa}px">${icona(r.icona)}${r.prezzo === 1 ? '<span class="mc-bdg">1</span>' : ""}${r.fissa ? `<span class="mc-bdg mc-bdg-f">${fa("fa-solid fa-thumbtack")}</span>` : ""}</span>`
        + (d.nomi ? `<span class="mc-fl" style="font-size: ${d.nomiPx}px">${esc(r.nome)}</span>` : "")
        + "</button></div>";
    }).join("");

    const hub = `<button type="button" class="mc-hub${focus ? " back" : ""}" data-k="hub" style="transform: translate(${d.cx}px, ${d.cy}px) scale(${r2(d.mozzo / MISURE.mozzoBase)}); opacity: ${stretto ? 0 : 1}; pointer-events: ${stretto ? "none" : "auto"}" data-mc="mozzo" aria-label="${esc(focus ? this.t("Mozzo.torna") : this.t("Mozzo.aria", { n: riserva }))}">${OCCHIO}<span class="mc-hub-n">${riserva}</span><span class="mc-hub-l">${esc(this.t("Mozzo.riserva"))}</span></button>`;

    const palco = `<main class="mc-stage" data-k="stage">`
      + `<div class="mc-ring" data-k="ring" style="transform: translate(${d.cx}px, ${d.cy}px) rotate(${st.rot}deg)"><div class="mc-orbit" style="width: ${r2(d.R * 2)}px; height: ${r2(d.R * 2)}px; opacity: ${stretto ? 0 : (focus ? 0.8 : 1)}"></div>${anello}</div>`
      + hub
      + (focus ? `<div class="mc-anchor" data-k="anchor" style="transform: translate(${d.sx}px, ${d.sy}px)">${lati}</div>` : "")
      + (lista.length ? `<div class="mc-fan" data-k="fan" style="transform: translate(${d.mx}px, ${d.my}px)">${ventaglio}</div>` : "")
      + (legBtn ? `<button type="button" class="mc-leg-btn" data-k="legbtn" data-mc="legenda" aria-expanded="${Boolean(st.legOpen)}">${esc(this.t("Legenda.bottone"))}</button>` : "")
      + `<div class="mc-leg ${legCls}" data-k="leg">`
      + `<div class="mc-leg-r"><span class="mc-lg mc-lg-t"></span>${esc(this.t("Legenda.t"))}</div>`
      + `<div class="mc-leg-r"><span class="mc-lg mc-lg-n">${fa("fa-solid fa-skull")}</span>${esc(this.t("Legenda.n"))}</div>`
      + `<div class="mc-leg-r"><span class="mc-lg mc-lg-f">+</span>${esc(this.t("Legenda.f"))}</div>`
      + `<p class="mc-leg-k">${esc(this.t("Legenda.tasti"))}</p></div>`
      + `<aside class="mc-panel${largo ? "" : " sheet"}${focus ? " on" : ""}" data-k="panel" style="width: ${largo ? d.P : W}px; height: ${d.foglio}px" aria-label="${esc(this.t("Spesa.aria"))}">${focus ? this.pannello(S, dati, cerchioDi(S)) : ""}</aside>`
      + this.pop(d)
      + (focus && st.win ? this.finestra(S, dati, W) : "")
      + "</main>";

    return this.barra(S, dati, d) + this.fissati(dati) + palco;
  }

  barra(S, dati, d) {
    const st = this.stato;
    const focus = Boolean(S);
    const effRow = isEffettoMagick(st.row);
    const isComp = st.row === COMPONI;
    const rowObj = focus && st.row && !isComp && !effRow ? rigaMenu(S, st.row) : null;
    const fsel = effRow ? formulaM6(st.fsel) : null;
    const crumbs = [{ id: "sfere", label: this.t("Sfere"), cur: !focus }];
    if (focus) crumbs.push({ id: "sfera", label: this.nomeSfera(S.id), cur: !st.side });
    if (focus && st.side) crumbs.push({ id: "lato", label: this.t(`Lati.${st.side}`), cur: !st.row });
    if (focus && st.row) {
      const sub = fsel || st.cast;
      crumbs.push({ id: "riga", label: isComp ? this.t("Componi.nome") : (effRow ? this.t("Grimorio.titolo") : (rowObj?.nome ?? "")), cur: !sub });
      if (sub) crumbs.push({ id: "fine", label: st.cast ? st.cast.nome : fsel.name, cur: true });
    }
    const briciole = crumbs.map((c) => `<button type="button" class="mc-crumb${c.cur ? " cur" : ""}" data-mc="briciola" data-a="${c.id}"${c.cur ? ' aria-current="step"' : ""}>${esc(c.label)}</button>`).join("");

    // «Fatta da»: in Foundry il token selezionato; senza token agisce il Paradosso.
    const a = dati.attore;
    const voce = (p, on) => `<button type="button" class="mc-act-o${on ? " on" : ""}" data-mc="attore" data-a="${esc(p.id)}" aria-pressed="${on}"><span class="mc-act-oi">${fa("fa-solid fa-user")}</span><span class="mc-act-ot"><b>${esc(p.nome)}</b><small>${esc(p.sfere?.length ? this.t("Attore.sfere", { sfere: p.sfere.map((id) => this.nomeSfera(id)).join(", ") }) : this.t("Attore.senzaSfere"))}</small></span></button>`;
    const menuAttore = st.actOpen ? `<div class="mc-act-m">`
      + `<div class="mc-act-g"><span class="mc-act-gl">${esc(this.t("Attore.narratore"))}</span><button type="button" class="mc-act-o${a ? "" : " on"}" data-mc="attore" data-a="" aria-pressed="${!a}"><span class="mc-act-oi">${fa("fa-solid fa-eye")}</span><span class="mc-act-ot"><b>${esc(this.t("Attore.paradosso"))}</b><small>${esc(this.t("Attore.paradossoSotto"))}</small></span></button></div>`
      + `<div class="mc-act-g"><span class="mc-act-gl">${esc(this.t("Attore.png"))}</span>${dati.png.length ? dati.png.map((p) => voce(p, a?.id === p.id)).join("") : `<p class="mc-act-n">${esc(this.t("Attore.nessunPng"))}</p>`}</div>`
      + `<p class="mc-act-n">${esc(this.t("Attore.nota"))}</p></div>` : "";
    const attore = `<div class="mc-act"><button type="button" class="mc-act-b${a ? " npc" : ""}" data-mc="attoreMenu" aria-expanded="${Boolean(st.actOpen)}"><span class="mc-act-ic">${fa(a ? "fa-solid fa-user" : "fa-solid fa-eye")}</span><span class="mc-act-t"><small>${esc(this.t("Attore.fattaDa"))}</small><b>${esc(a ? a.nome : this.t("Attore.paradosso"))}</b></span>${fa("fa-solid fa-chevron-down mc-act-dn")}</button>${menuAttore}</div>`;

    // La cerca di una mossa per nome: le prime otto, con la Sfera e il lato.
    const qn = norm(st.q.trim());
    const res = [];
    if (qn.length >= 2) {
      MENU_SFERE.forEach((sf, i) => {
        for (const r of sf.righe) {
          if (res.length < 8 && norm(r.nome).includes(qn)) {
            const side = r.lato === "ns" ? (st.side || "n") : r.lato;
            res.push(`<li><button type="button" class="mc-res-i" data-mc="vai" data-a="${i}" data-b="${side}" data-c="${esc(r.id)}">${icona(r.icona)}<span class="mc-res-n">${esc(r.nome)}</span><span class="mc-res-m">${esc(`${this.nomeSfera(sf.id)} · ${r.lato === "ns" ? this.t("Entrambi") : this.t(`Lati.${r.lato}`)}`)}</span></button></li>`);
          }
        }
      });
    }
    const risultati = res.length ? `<ul class="mc-res">${res.join("")}</ul>` : (qn.length >= 2 ? `<div class="mc-res mc-res-vuoto">${esc(this.t("Barra.nessuna"))}</div>` : "");
    const cerca = `<div class="mc-bar-c"><label class="mc-cerca">${fa("fa-solid fa-magnifying-glass")}<input type="search" data-mc-in="q" value="${esc(st.q)}" placeholder="${esc(this.t("Barra.cerca"))}" aria-label="${esc(this.t("Barra.cerca"))}" autocomplete="off"></label>${risultati}</div>`;

    // Il turno: si vede sul lato Combattimento o dopo una spesa del turno.
    const tu = dati.turno;
    const mostraTurno = st.side === "s" || dati.turnoBloccato;
    const etichetta = tu.combattimento ? this.t("Barra.giro", { r: tu.r, t: tu.t }) : this.t("Barra.turno", { n: tu.n ?? 1 });
    const turno = mostraTurno ? `<div class="mc-turno"><span><b>${esc(etichetta)}</b> · ${esc(this.t(dati.turnoBloccato ? "Barra.spesaFatta" : "Barra.spesaLibera"))}</span>${tu.combattimento ? "" : `<button type="button" class="mc-btn-s" data-mc="nuovoTurno">${esc(this.t("Spesa.nuovoTurno"))}</button>`}</div>` : "";
    const ris = d.stretto ? `<div class="mc-ris">${OCCHIO}<span class="mc-ris-n">${dati.riserva}</span><span class="mc-ris-l">${esc(this.t("Mozzo.riserva"))}</span></div>` : "";

    return `<header class="mc-bar" data-k="bar"><nav class="mc-crumbs" aria-label="${esc(this.t("Dove"))}">${briciole}</nav>${attore}${cerca}<div class="mc-bar-r">${turno}${ris}</div></header>`;
  }

  fissati(dati) {
    if (!dati.fissati.length) return "";
    const voci = dati.fissati.map((f) => `<span class="mc-fx" data-k="fx-${esc(f.id)}">${fa("fa-solid fa-thumbtack")}<span>${esc(this.t("Fissati.voce", { nome: f.nome, sfera: f.sferaNome || this.nomeSfera(f.sfera), s: f.soglia }))}</span><button type="button" class="mc-fx-x" data-mc="scardina" data-a="${esc(f.id)}" aria-label="${esc(this.t("Fissati.via", { nome: f.nome }))}">${fa("fa-solid fa-xmark")}</button></span>`).join("");
    return `<div class="mc-fissati" data-k="fissati"><span class="mc-fx-l">${esc(this.t("Fissati.titolo"))}</span>${voci}</div>`;
  }

  pannello(S, dati, cer) {
    const st = this.stato;
    const effRow = isEffettoMagick(st.row);
    const isComp = st.row === COMPONI;
    const rowObj = st.row && !isComp && !effRow ? rigaMenu(S, st.row) : null;
    const fsel = effRow ? formulaM6(st.fsel) : null;
    const nome = this.nomeSfera(S.id);
    const testa = `<div class="mc-c-top"><span class="mc-sg mc-sg-${S.id}"></span><span>${esc(`${nome} · ${st.side ? this.t(`Lati.${st.side}`) : ""}`)}</span><span class="mc-cer mc-cer-${cer}">${esc(this.t(`Cerchi.${cer}.chip`))}</span></div>`;
    const testaCarta = (ico, titolo, sotto = "") => `<div class="mc-c-head"><span class="mc-c-ic">${ico}</span><div><h2 class="mc-c-ttl">${esc(titolo)}</h2>${sotto ? `<p class="mc-p-d">${esc(sotto)}</p>` : ""}</div></div>`;
    const effIcona = (rigaMenu(S, idEffettoMagick(S.id)) ?? {}).icona ?? "";
    const parti = [];

    if (!st.side) {
      // La Sfera: il suo cerchio, i due lati, chi agisce.
      const a = dati.attore;
      const attore = a ? (a.sfere?.includes(S.id) ? this.t("AgisceSua", { nome: a.nome }) : (a.sfere?.length ? this.t("AgisceAltre", { nome: a.nome, sfere: a.sfere.map((id) => this.nomeSfera(id)).join(" e ") }) : this.t("AgisceSenza", { nome: a.nome }))) : "";
      parti.push(`<div class="mc-p-h"><span class="mc-p-sg c-${cer}"><span class="mc-sg mc-sg-${S.id}"></span></span><div><h2 class="mc-p-t">${esc(nome)}</h2><p class="mc-p-d">${esc(S.dominio)}</p></div></div>`
        + `<div class="mc-blk"><span class="mc-cer mc-cer-${cer}">${esc(this.t(`Cerchi.${cer}.titolo`))}</span><p>${esc(this.t(`Cerchi.${cer}.testo`))}</p></div>`
        + `<div class="mc-blk"><span class="mc-c-lab">${esc(this.t("ScegliLato"))}</span><div class="mc-lati">`
        + LATI.map((side) => `<button type="button" class="mc-lato" data-mc="lato" data-a="${side}">${icona(MENU_ICONE_LATI[side])}<span><b>${esc(this.t(`Lati.${side}`))}</b><small>${esc(this.mosse(righeDelLato(S, side).length))}</small></span></button>`).join("")
        + `</div><p class="mc-sm mc-mut">${esc(this.t(S.autore === "Blue" ? "AutoreBlue" : "AutoreProposta"))}</p>${attore ? `<p class="mc-sm">${esc(attore)}</p>` : ""}</div>`);
      return parti.join("");
    }

    if (!st.row) {
      // Il lato: le sue due regole, o l'anteprima della mossa sotto il mouse.
      const hov = st.hov ? (st.hov === COMPONI ? { id: COMPONI, nome: this.t("Componi.nome"), testo: this.t("Componi.testo"), icona: MENU_ICONE_LATI.componi, prezzo: null, fissa: false } : rigaMenu(S, st.hov)) : null;
      if (hov) {
        const prezzo = hov.id === COMPONI || isEffettoMagick(hov.id) || hov.prezzo !== 1 ? this.t("PrezzoX") : this.t("CostoUno");
        parti.push(`<div class="mc-prev-h"><span class="mc-prev-ic">${icona(hov.icona)}</span><h2 class="mc-prev-t">${esc(hov.nome)}</h2></div><p class="mc-c-txt">${esc(hov.testo)}</p><p class="mc-c-meta">${esc(prezzo)}</p><p class="mc-c-meta">${esc(this.t("SogliaAnteprima", { r: this.t(hov.fissa ? "SogliaPiuTre" : "SogliaPari") }))}</p>`);
      } else {
        parti.push(`<h2 class="mc-p-t">${esc(this.t(`Lati.${st.side}`))}</h2><p class="mc-p-d">${esc(`${nome}, ${S.dominio}`)}</p>`
          + `<div class="mc-blk"><p>${esc(this.t(`Regole.${st.side}1`))}</p><p>${esc(this.t(`Regole.${st.side}2`))}</p></div>`
          + `<div class="mc-blk"><p class="mc-mut">${esc(this.t("Passa"))}</p><div class="mc-leg-b"><span class="mc-bdg">1</span>${esc(this.t("BadgeUno"))}</div><div class="mc-leg-b"><span class="mc-bdg mc-bdg-f">${fa("fa-solid fa-thumbtack")}</span>${esc(this.t("BadgeFissa"))}</div></div>`);
      }
      return parti.join("");
    }

    if (st.cast) {
      parti.push(testa + testaCarta(icona(MENU_ICONE_LATI.componi), st.cast.nome) + `<p class="mc-c-txt">${esc(st.cast.testo)}</p><button type="button" class="mc-back-l" data-mc="riapri">${fa("fa-solid fa-up-right-from-square")}${esc(this.t("Lancio.riapri"))}</button>`);
    } else if (rowObj) {
      parti.push(testa + testaCarta(icona(rowObj.icona), rowObj.nome) + `<p class="mc-c-txt">${esc(rowObj.testo)}</p>`);
    } else if (effRow && !fsel) {
      // Il Grimorio della Sfera: le Formule che la usano, con la cerca.
      const tutte = formuleDellaSfera(S.id);
      const trovate = formuleDellaSfera(S.id, st.gq);
      const lista = trovate.map((f) => `<li data-k="fr-${esc(f.id)}"><button type="button" class="mc-fr" data-mc="formula" data-a="${esc(f.id)}"><span class="mc-fr-n">${esc(f.nome)}</span><span class="mc-fr-s">${esc(this.t("Grimorio.soglia", { s: f.soglia }))}</span><span class="mc-fr-t">${esc(f.per || f.intro)}</span></button></li>`).join("");
      parti.push(testa + testaCarta(icona(effIcona), this.t("Grimorio.titolo"), this.t("Grimorio.sfera", { sfera: nome }))
        + `<label class="mc-cerca mc-cerca-p">${fa("fa-solid fa-magnifying-glass")}<input type="search" data-mc-in="gq" value="${esc(st.gq)}" placeholder="${esc(this.t("Grimorio.cerca"))}" aria-label="${esc(this.t("Grimorio.cerca"))}" autocomplete="off"></label>`
        + `<p class="mc-sm mc-mut">${esc(tutte.length === 1 ? this.t("Grimorio.conto1", { sfera: nome }) : this.t("Grimorio.conto", { n: tutte.length, sfera: nome }))}</p>`
        + `<ul class="mc-fl-list">${lista}</ul>${trovate.length ? "" : `<p class="mc-sm mc-mut">${esc(this.t("Grimorio.vuoto"))}</p>`}`
        + `<button type="button" class="mc-btn-s mc-btn-w" data-mc="finestra">${fa("fa-solid fa-up-right-from-square")}${esc(this.t("Grimorio.finestra"))}</button>`);
    } else if (fsel) {
      const per = fsel.bySphere?.[S.id];
      const meta = [this.t("Grimorio.meta", { s: fsel.thresholdText }), fsel.limit ? this.t("Grimorio.limite", { l: fsel.limit }) : ""].filter(Boolean).join(". ");
      parti.push(testa + `<button type="button" class="mc-back-l" data-mc="formulaVia">${fa("fa-solid fa-arrow-left")}${esc(this.t("Grimorio.lista"))}</button>`
        + testaCarta(icona(effIcona), fsel.name)
        + (per ? `<p class="mc-c-txt">${esc(this.t("Grimorio.con", { sfera: nome, per }))}</p>` : "")
        + `<p class="mc-c-meta">${esc(fsel.intro)}</p><p class="mc-c-meta">${esc(meta)}</p>`);
    } else if (st.row === COMPONI) {
      parti.push(testa + testaCarta(icona(MENU_ICONE_LATI.componi), this.t("Componi.nome")) + `<p class="mc-c-txt">${esc(this.t("Componi.carta"))}</p>`
        + `<button type="button" class="mc-spendi" data-mc="finestra">${esc(this.t("Componi.apri"))}</button>`
        + `<button type="button" class="mc-btn-s mc-btn-w" data-mc="grimorio">${fa("fa-solid fa-book")}${esc(this.t("Componi.grimorio"))}</button>`);
    }

    const sp = this.spendibile();
    if (sp) parti.push(this.blocco(sp, dati, cer));
    if (fsel && !st.cast) parti.push(`<button type="button" class="mc-btn-s mc-btn-w" data-mc="finestraFormula">${fa("fa-solid fa-up-right-from-square")}${esc(this.t("Grimorio.apri"))}</button>`);
    return parti.join("");
  }

  /** Il blocco della spesa, uguale per righe, Formule e incantesimi composti. */
  blocco(sp, dati, cer) {
    const st = this.stato;
    const a = dati.attore;
    const riserva = dati.riserva;
    const soglia = sogliaPerScardinare(st.paga, sp.fissa);
    const restano = riserva - st.paga;
    const bloccoTurno = st.side === "s" && dati.turnoBloccato;
    const vuota = riserva < 1;
    const spento = vuota || st.paga > riserva || bloccoTurno;
    let etichetta = restano === 1 ? this.t("Spesa.spendi1", { p: st.paga }) : this.t("Spesa.spendi", { p: st.paga, r: restano });
    if (vuota) etichetta = this.t("Spesa.vuota");
    else if (bloccoTurno) etichetta = this.t("Spesa.turnoFatto");
    const pallini = palliniRiserva(riserva, st.paga);
    const chi = [...dati.maghi.map((m) => ({ id: m.id, l: m.nome })), { id: "", l: this.t("Spesa.nessuno") }];
    const nota = this.t(`Cerchi.${cer}.nota`);
    return `<div class="mc-spesa">`
      + `<p class="mc-c-da${a ? " npc" : ""}">${esc(a ? this.t("Spesa.da", { nome: a.nome }) : this.t("Spesa.daParadosso"))}</p>`
      + `<p class="mc-c-meta">${esc(sp.prezzo === 1 ? this.t("Spesa.prezzoUno") : this.t("Spesa.prezzoX"))}</p>`
      + (cer !== "t" && nota ? `<p class="mc-c-nota">${esc(nota)}</p>` : "")
      + `<div class="mc-c-grid">`
      + `<div class="mc-c-field"><span class="mc-c-lab">${esc(this.t("Spesa.paghi"))}</span><div class="mc-step" role="group" aria-label="${esc(this.t("Spesa.paghi"))}"><button type="button" class="mc-st-b" data-mc="paga" data-a="-1"${st.paga <= 1 ? " disabled" : ""} aria-label="${esc(this.t("Spesa.meno"))}">${fa("fa-solid fa-minus")}</button><span class="mc-st-n">${st.paga}</span><button type="button" class="mc-st-b" data-mc="paga" data-a="1"${st.paga >= riserva ? " disabled" : ""} aria-label="${esc(this.t("Spesa.piu"))}">${fa("fa-solid fa-plus")}</button></div></div>`
      + `<div class="mc-c-field"><span class="mc-c-lab">${esc(this.t("Spesa.soglia"))}</span><span class="mc-sog-n">${soglia}</span><span class="mc-sog-r">${esc(this.t(sp.fissa ? "Spesa.sogliaFissa" : "Spesa.sogliaPari"))}</span></div>`
      + `</div>`
      + (pallini.length ? `<div class="mc-c-field"><span class="mc-c-lab">${esc(this.t("Spesa.pallini"))}</span><div class="mc-pips">${pallini.map((p) => `<span class="mc-pip${p ? " paid" : ""}"></span>`).join("")}</div></div>` : "")
      + `<div class="mc-c-field"><span class="mc-c-lab">${esc(this.t("Spesa.suChi"))}</span><div class="mc-chips">${chi.map((c) => `<button type="button" class="mc-chip${st.chi === c.id ? " on" : ""}" data-mc="chi" data-a="${esc(c.id)}" aria-pressed="${st.chi === c.id}">${esc(c.l)}</button>`).join("")}</div></div>`
      + (st.side === "n" ? `<div class="mc-c-field"><span class="mc-c-lab">${esc(this.t("Spesa.durata"))}</span><div class="mc-chips">${["scena", "lunga"].map((id) => `<button type="button" class="mc-chip${st.durata === id ? " on" : ""}" data-mc="durata" data-a="${id}" aria-pressed="${st.durata === id}">${esc(this.t(`Spesa.durate.${id}`))}</button>`).join("")}</div></div>` : "")
      + `<div class="mc-c-field"><label class="mc-c-lab">${esc(this.t("Spesa.nota"))}<input class="mc-inp" type="text" data-mc-in="nota" value="${esc(st.nota)}" placeholder="${esc(this.t("Spesa.notaPh"))}" autocomplete="off"></label></div>`
      + (bloccoTurno ? `<div class="mc-c-warn"><span>${esc(this.t("Spesa.turnoAvviso"))}</span>${dati.turno.combattimento ? "" : `<button type="button" class="mc-btn-s" data-mc="nuovoTurno">${esc(this.t("Spesa.nuovoTurno"))}</button>`}</div>` : "")
      + `<button type="button" class="mc-spendi" data-mc="spendi"${spento ? " disabled" : ""}>${esc(etichetta)}</button>`
      + `<p class="mc-c-quando">${esc(this.t(st.side === "n" ? "Spesa.quandoN" : "Spesa.quandoS"))}</p>`
      + `</div>`;
  }

  pop(d) {
    const p = this.stato.pop;
    if (!p) return "";
    const conto = p.stato === "conto";
    const titolo = `${this.t("Pop.titolo")}${p.suChi ? ` · ${p.suChi.nome}` : ""}`;
    const destra = d.focus && d.largo ? d.P + 20 : 16;
    const sotto = d.focus && !d.largo ? d.foglio + 12 : 20;
    return `<div class="mc-pop st-${p.stato}" data-k="pop" style="right: ${destra}px; bottom: ${sotto}px" role="status">`
      + `<div class="mc-pop-top"><span class="mc-pop-t">${esc(titolo)}</span><span class="mc-pop-s">${conto ? esc(this.t("Pop.parte", { s: p.secs })) : ""}</span></div>`
      + `<div class="mc-pop-n">${esc(`${p.sferaNome} · ${p.nome}`)}</div><p class="mc-pop-x">${esc(p.testo)}</p>`
      + `<div class="mc-pop-m">${esc(this.t("Pop.meta", { s: p.soglia, durata: p.durataTesto }))}</div>`
      + (p.da ? `<div class="mc-pop-m">${esc(this.t("Spesa.da", { nome: p.da.nome }))}</div>` : "")
      + (p.nota ? `<div class="mc-pop-m">${esc(this.t("Pop.nota", { nota: p.nota }))}</div>` : "")
      + (conto ? `<button type="button" class="mc-pop-b" data-mc="nascondi">${fa("fa-solid fa-eye-slash")}${esc(this.t("Pop.nascondi"))}</button>` : `<div class="mc-pop-f">${esc(this.t(p.stato === "nascosta" ? "Pop.nascosta" : "Pop.dichiarata"))}</div>`)
      + `<div class="mc-pop-bar" style="width: ${conto ? Math.round((p.secs / SECONDI) * 100) : 0}%"></div>`
      + "</div>";
  }

  /** La finestra del lancio, ridotta: Obiettivo e Grimorio, Effetto, la Sfera, gli Ambiti. */
  finestra(S, dati, W) {
    const st = this.stato;
    const amb = ambitiNuovi(st.wAmb);
    const alzati = AMBITI_LANCIO.filter((id) => id !== "epic" && amb[id] > 0).length;
    const fw = formulaM6(st.wFrom);
    const nome = this.nomeSfera(S.id);
    const a = dati.attore;
    const sotto = [fw ? fw.name : this.t("Lancio.nuovo"), nome, a ? this.t("Lancio.lancia", { nome: a.nome }) : ""].filter(Boolean).join(" · ");
    const soglia = this.sogliaPng(dati);
    const puntini = (n, scelti, azione, arg, etichetta) => Array.from({ length: n }, (_, i) => `<button type="button" class="mc-dot${i + 1 <= scelti ? " on" : ""}" data-mc="${azione}" data-a="${arg}" data-b="${i + 1}" aria-label="${esc(`${etichetta} ${i + 1}`)}"></button>`).join("");
    const ambiti = AMBITI_LANCIO.map((id) => {
      const etichetta = this.fonte.localize(`WOD5E_MAGE.Scopes.${id}`);
      return `<div class="mc-dr${id === "epic" ? " epic" : ""}${amb[id] > 0 ? " su" : ""}">${fa(`${SCOPE_ICONS[id] ?? "fa-solid fa-circle"} mc-dr-ic`)}<span class="mc-dr-l">${esc(etichetta)}</span><span class="mc-dots">${puntini(7, amb[id], "ambito", id, etichetta)}</span><span class="mc-dr-n">${amb[id]}</span></div>`;
    }).join("");
    return `<div class="mc-wv" data-k="wv"><div class="mc-wv-bg" data-mc="finestraChiudi"></div>`
      + `<div class="mc-wv-box" style="width: ${Math.max(280, Math.min(640, W - 32))}px" role="dialog" aria-modal="true" aria-label="${esc(this.t("Lancio.titolo"))}">`
      + `<div class="mc-wv-head"><div><h2 class="mc-wv-t">${esc(this.t("Lancio.titolo"))}</h2><p class="mc-wv-s">${esc(sotto)}</p></div><button type="button" class="mc-wv-x" data-mc="finestraChiudi" aria-label="${esc(this.t("Lancio.chiudi"))}">${fa("fa-solid fa-xmark")}</button></div>`
      + `<div class="mc-c-field"><div class="mc-wv-row"><span class="mc-c-lab">${esc(this.t("Lancio.obiettivo"))}</span><button type="button" class="mc-btn-s mc-btn-i" data-mc="grimorio">${fa("fa-solid fa-book")}${esc(this.t("Lancio.grimorio"))}</button></div><textarea class="mc-inp" data-mc-in="obj" placeholder="${esc(this.t("Lancio.obiettivoPh"))}" aria-label="${esc(this.t("Lancio.obiettivo"))}">${esc(st.wObj)}</textarea></div>`
      + `<div class="mc-c-field"><span class="mc-c-lab">${esc(this.t("Lancio.effetto"))}</span><div class="mc-chips">${EFFETTI_LANCIO.map((id) => `<button type="button" class="mc-chip${st.wEff === id ? " on" : ""}" data-mc="effetto" data-a="${id}" aria-pressed="${st.wEff === id}">${esc(this.t(`Lancio.effetti.${id}`))}</button>`).join("")}</div></div>`
      + `<div class="mc-c-field"><span class="mc-c-lab">${esc(this.t("Lancio.sfereEffetto"))}</span><div class="mc-dr su"><span class="mc-sg mc-sg-${S.id} mc-dr-sg"></span><span class="mc-dr-l">${esc(nome)}</span><span class="mc-dots">${puntini(5, st.wSf, "sferaEffetto", "", nome)}</span><span class="mc-dr-n">${st.wSf}</span></div></div>`
      + `<div class="mc-c-field"><span class="mc-c-lab">${esc(this.t("Lancio.ambiti"))}</span>${ambiti}<p class="mc-sm mc-mut mc-amb-n${st.wNota ? " warn" : ""}">${esc(alzati >= AMBITI_MAX ? this.t("Lancio.notaMax") : this.t("Lancio.notaBase"))}</p></div>`
      + `<div class="mc-wv-foot"><p class="mc-sm mc-mut">${esc(soglia !== null ? this.t("Lancio.sogliaPng", { nome: a.nome, s: soglia }) : this.t("Lancio.piede"))}</p><button type="button" class="mc-spendi mc-wv-go" data-mc="lancia"${st.wObj.trim() ? "" : " disabled"}>${esc(this.t("Lancio.vai"))}</button></div>`
      + "</div></div>";
  }

  /* ---------------------------------------------------------------- */
  /* Il DOM: montare, innestare, ascoltare                              */
  /* ---------------------------------------------------------------- */

  monta(contenitore) {
    this.smonta();
    if (!contenitore) return;
    contenitore.innerHTML = `<div class="wod5e-mage-mc" tabindex="-1">${foglioIcone()}<div class="mc-vivo"></div></div>`;
    this.root = contenitore.firstElementChild;
    this.vivo = this.root.querySelector(".mc-vivo");
    const su = (tipo, fn) => {
      this.root.addEventListener(tipo, fn);
      this.ascolti.push([tipo, fn]);
    };
    su("click", (event) => this.clic(event));
    su("input", (event) => this.scrivi(event));
    su("keydown", (event) => this.tasto(event));
    su("mouseover", (event) => this.sopra(event));
    su("mouseout", (event) => this.fuori(event));
    su("focusin", (event) => this.sopra(event));
    su("focusout", (event) => this.fuori(event));
    this.disegna();
  }

  smonta() {
    this.osservatore?.disconnect();
    this.osservatore = null;
    this.palco = null;
    if (this.root) for (const [tipo, fn] of this.ascolti) this.root.removeEventListener(tipo, fn);
    this.ascolti = [];
    this.root = null;
    this.vivo = null;
  }

  get montato() {
    return Boolean(this.vivo?.isConnected);
  }

  disegna() {
    if (!this.vivo?.isConnected) return;
    const tpl = document.createElement("template");
    tpl.innerHTML = `<div class="mc-vivo">${this.vista()}</div>`;
    innestaFigli(this.vivo, tpl.content.firstElementChild);
    this.osserva();
  }

  /** Il palco si misura da sé: la finestra si allarga, il menù si ridisegna. */
  osserva() {
    const palco = this.vivo?.querySelector(".mc-stage");
    if (!palco || palco === this.palco) return;
    this.osservatore?.disconnect();
    this.palco = palco;
    const misura = () => {
      const W = palco.clientWidth;
      const H = palco.clientHeight;
      if (W > 0 && H > 0 && (Math.abs(W - this.stato.W) > 1 || Math.abs(H - this.stato.H) > 1)) this.imposta({ W, H });
    };
    if (typeof ResizeObserver !== "undefined") {
      this.osservatore = new ResizeObserver(misura);
      this.osservatore.observe(palco);
    }
    setTimeout(misura, 0);
  }

  async clic(event) {
    const el = event.target.closest?.("[data-mc]");
    if (!el || !this.root?.contains(el) || el.disabled) {
      // Un clic fuori dal menù di «Fatta da» lo chiude.
      if (this.stato.actOpen && !event.target.closest?.(".mc-act")) this.imposta({ actOpen: false });
      return;
    }
    event.preventDefault();
    const { mc, a = "", b = "", c = "" } = el.dataset;
    if (this.stato.actOpen && mc !== "attoreMenu" && mc !== "attore") this.imposta({ actOpen: false });
    await this.esegui(mc, a, b, c);
  }

  /** Le azioni per nome: le chiamano i clic e, nelle prove, la fonte finta. */
  async esegui(mc, a = "", b = "", c = "") {
    const st = this.stato;
    switch (mc) {
      case "sfera": return this.sfera(Number(a));
      case "lato": return this.alternaLato(a);
      case "riga": return this.riga(a);
      case "mozzo": return st.s !== null ? this.allAnello() : undefined;
      case "briciola":
        if (a === "sfere") return this.allAnello();
        if (a === "sfera" && st.side) return this.imposta({ ...this.libera(), side: null, mgen: st.mgen + 1, mdl: 0 });
        if (a === "lato" && st.row) return this.imposta(this.libera());
        if (a === "riga") return this.imposta({ fsel: null, cast: null });
        return undefined;
      case "attoreMenu": return this.imposta({ actOpen: !st.actOpen });
      case "attore":
        this.stato.actOpen = false;
        await this.fonte.seleziona?.(a || null);
        return this.disegna();
      case "vai": return this.vaiRiga(Number(a), b, c);
      case "nuovoTurno":
        await this.fonte.nuovoTurno?.();
        return this.disegna();
      case "scardina":
        await this.fonte.scardina?.(a);
        return this.disegna();
      case "legenda": return this.imposta({ legOpen: !st.legOpen });
      case "paga": return this.paga(Number(a));
      case "chi": return this.imposta({ chi: a });
      case "durata": return this.imposta({ durata: a === "lunga" ? "lunga" : "scena" });
      case "spendi": return this.spendi();
      case "nascondi": return this.nascondi();
      case "formula": return this.formula(a);
      case "formulaVia": return this.imposta({ fsel: null });
      case "finestra": return this.apriFinestra(null);
      case "finestraFormula": return this.apriFinestra(st.fsel);
      case "finestraChiudi": return this.imposta({ win: false, wNota: false });
      case "grimorio": return this.dalGrimorio();
      case "riapri": return this.imposta({ win: true });
      case "effetto": return this.imposta({ wEff: st.wEff === a ? "" : a });
      case "sferaEffetto": return this.imposta({ wSf: Math.min(Math.max(Number(b) || 1, 1), 5) });
      case "ambito": return this.ambito(a, Number(b));
      case "lancia": return this.lancia();
      default: return undefined;
    }
  }

  scrivi(event) {
    const campo = event.target?.dataset?.mcIn;
    if (!campo) return;
    const valore = String(event.target.value ?? "");
    if (campo === "q") this.imposta({ q: valore });
    else if (campo === "gq") this.imposta({ gq: valore });
    else if (campo === "nota") this.stato.nota = valore;
    else if (campo === "obj") this.imposta({ wObj: valore });
  }

  /** La tastiera (come nel mock): Esc torna indietro, da 1 a 9 si sceglie, N e C per il lato. */
  tasto(event) {
    const st = this.stato;
    const key = event.key;
    const ferma = () => {
      event.preventDefault();
      event.stopPropagation();
    };
    if (st.actOpen && key === "Escape") {
      ferma();
      this.imposta({ actOpen: false });
      return;
    }
    if (st.win) {
      if (key === "Escape") {
        ferma();
        this.imposta({ win: false, wNota: false });
      }
      return;
    }
    const tag = String(event.target?.tagName ?? "").toLowerCase();
    if (tag === "input" || tag === "textarea") {
      if (key === "Escape" && event.target.dataset?.mcIn === "q") {
        ferma();
        this.imposta({ q: "" });
      }
      return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (key === "Escape") {
      // Sull'anello non c'è più niente da chiudere: l'Esc torna a Foundry, che chiude la finestra.
      if (st.s === null) return;
      ferma();
      this.indietro();
      return;
    }
    if (/^[1-9]$/.test(key)) {
      ferma();
      const n = Number(key) - 1;
      if (st.s !== null && st.side) {
        const lista = [...righeDelLato(MENU_SFERE[st.s], st.side).map((r) => r.id), COMPONI];
        if (lista[n]) this.riga(lista[n]);
      } else this.sfera(n);
      return;
    }
    if ((key === "n" || key === "N") && st.s !== null) {
      ferma();
      this.lato("n");
    } else if ((key === "c" || key === "C") && st.s !== null) {
      ferma();
      this.lato("s");
    }
  }

  sopra(event) {
    const el = event.target.closest?.("[data-hov]");
    if (!el || this.stato.hov === el.dataset.hov) return;
    this.imposta({ hov: el.dataset.hov });
  }

  fuori(event) {
    const el = event.target.closest?.("[data-hov]");
    if (!el) return;
    const verso = event.relatedTarget?.closest?.("[data-hov]");
    if (verso === el) return;
    if (this.stato.hov === el.dataset.hov) this.imposta({ hov: verso?.dataset?.hov ?? null });
  }
}

/* ------------------------------------------------------------------ */
/*  L'innesto: il DOM nuovo sopra quello vecchio, elemento per elemento */
/* ------------------------------------------------------------------ */

function stesso(a, b) {
  if (a.nodeType !== b.nodeType) return false;
  if (a.nodeType !== 1) return true;
  return a.tagName === b.tagName && a.getAttribute("data-k") === b.getAttribute("data-k");
}

function innesta(vivo, nuovo) {
  for (const attr of [...vivo.attributes]) {
    if (!nuovo.hasAttribute(attr.name)) vivo.removeAttribute(attr.name);
  }
  for (const attr of [...nuovo.attributes]) {
    if (vivo.getAttribute(attr.name) !== attr.value) vivo.setAttribute(attr.name, attr.value);
  }
  const attivo = vivo.ownerDocument?.activeElement === vivo;
  if (vivo.tagName === "TEXTAREA") {
    if (!attivo && vivo.value !== nuovo.value) vivo.value = nuovo.value;
    return;
  }
  if (vivo.tagName === "INPUT") {
    const valore = nuovo.getAttribute("value") ?? "";
    if (!attivo && vivo.value !== valore) vivo.value = valore;
    return;
  }
  if (vivo.tagName === "use" || (vivo.tagName === "svg" && vivo.classList.contains("mc-occhio"))) return;
  innestaFigli(vivo, nuovo);
}

function innestaFigli(vivo, nuovo) {
  let a = vivo.firstChild;
  let b = nuovo.firstChild;
  while (b) {
    const dopo = b.nextSibling;
    if (!a) {
      vivo.appendChild(b);
    } else if (stesso(a, b)) {
      if (a.nodeType === 1) innesta(a, b);
      else if (a.nodeValue !== b.nodeValue) a.nodeValue = b.nodeValue;
      a = a.nextSibling;
    } else {
      // Con una chiave si cerca più avanti lo stesso elemento: si sposta, non si rifà.
      const chiave = b.nodeType === 1 ? b.getAttribute("data-k") : null;
      let trovato = null;
      if (chiave !== null) {
        for (let c = a.nextSibling; c; c = c.nextSibling) {
          if (c.nodeType === 1 && c.tagName === b.tagName && c.getAttribute("data-k") === chiave) {
            trovato = c;
            break;
          }
        }
      }
      if (trovato) {
        vivo.insertBefore(trovato, a);
        innesta(trovato, b);
      } else {
        vivo.insertBefore(b, a);
      }
    }
    b = dopo;
  }
  while (a) {
    const dopo = a.nextSibling;
    vivo.removeChild(a);
    a = dopo;
  }
}
