#!/usr/bin/env python3
"""Costruisce le voci del menù del Paradosso dal suo sorgente.

Uso: python3 tools/build-menu-paradosso.py

Legge tools/dati/menu_paradosso.md (lo stesso testo del PDF «Il menù del
Paradosso», bozza del 24/9/2026) e scrive scripts/data/menu-paradosso.js:
le 65 voci con famiglia, scena, modo, prezzo, i campi della scheda (quando,
segno, effetto, mosse, poi, esempio), la faccia che le famiglie comuni
prendono in ogni scena e la durata dell'effetto sul mago. Il testo resta
il sorgente: le correzioni passano dal PDF e il modulo si rigenera.
Un modulo generato, da non toccare a mano.
"""
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "tools/dati/menu_paradosso.md"
OUT = ROOT / "scripts/data/menu-paradosso.js"

# Le sezioni del sorgente e la famiglia che danno alle loro voci.
FAMIGLIE_SEZIONI = {
    "I Tocchi": "tocchi",
    "Le opzioni comuni": "comuni",
    "Le Presenze": "presenze",
    "Gli orologi del Paradosso": "orologi",
    "Le Ancore": "ancore",
    "Quando un dado rosso scoppia": "grandi",
}
SCENE = {
    "Indagine": "indagine", "Trattativa": "trattativa", "Infiltrazione": "infiltrazione",
    "Combattimento": "combattimento", "Inseguimento": "inseguimento", "Rituale": "rituale",
    "Altrove": "altrove", "Santuario": "santuario", "Città": "citta",
}
# Le voci dello scettro potenziato (la tavola del sorgente): gratis è la
# versione di sempre, pagata diventa soprannaturale.
SCETTRO = {
    "Domande", "Senza prove", "Garanzia", "Concorrenza", "Ora o mai", "Ronda", "Anticipo",
    "Rinforzo", "Stop", "Ritirata", "Fuga", "Ostacolo", "Fine corsa", "Pedaggio", "La voce",
    "Stranezza", "Visita", "Intoppo", "Controllo", "Folla", "Chiusura",
}
# Le voci di scena che sono Presenze (si pagano con la loro soglia).
PRESENZE_DI_SCENA = {"Rinforzo", "Ospite"}
# Le famiglie comuni richiamate nelle tavole «Le famiglie in questa scena».
FACCE_FAMIGLIA = {"Tocco": "tocchi", "Presenza": "presenze", "Orologio": "orologi", "Ancora": "ancore"}
# Quanto dura l'effetto addosso al mago: fino al lancio dopo, al turno dopo,
# alla fine della scena, alla fine della sessione. Le voci che aprono un
# orologio o mettono qualcuno in scena non stanno addosso a nessuno.
DURATE = {
    "Tremore": "lancio", "Rigidità": "lancio", "Fragile": "lancio", "Condizione": "turno",
    "Fiacco": "scena", "Scottatura": "sessione",
    "Ritorno": "turno", "In mezzo": "turno", "Anticipo": "turno", "Stop": "turno",
    "Anomalia": "sessione", "Macchia": "sessione", "Spirito del Paradosso": "sessione",
    "Regno del Paradosso": "sessione", "Il bersaglio sbagliato": "sessione",
}
MODI = {"immediato": "immediato", "annunciato": "annunciato", "nascosto": "nascosto", "allo scoppio": "scoppio"}
# Blue, 24/9 sera: «I Tocchi non si può sentire»: nel modulo la famiglia si chiama
# Conseguenze Magick. Il PDF segue alla sua prossima revisione; qui si rinomina
# alla costruzione, in ogni testo (in ordine: prima le forme con l'articolo).
RINOMINE = [("un Tocco", "una Conseguenza"), ("i Tocchi", "le Conseguenze"), ("I Tocchi", "Le Conseguenze"), ("Tocchi", "Conseguenze"), ("Tocco", "Conseguenza")]
# La riga breve di ogni voce (24/9 sera, Blue: «una descrizione veloce, tipo
# Tremore −2 al prossimo lancio del PG»): l'effetto in una riga, per la lista.
BREVI = {
    "tremore": "−2 dadi al prossimo lancio di Magick",
    "rigidita": "il prossimo Volgare riesce solo con l'8",
    "fragile": "al prossimo Volgare i rossi scoppiano anche col 2",
    "fiacco": "al massimo 6 dadi fino a fine scena",
    "scottatura": "1 danno superficiale, il segno resta",
    "condizione": "Abbagliato o Ovattato per un turno",
    "ritorno": "al turno dopo l'effetto finisce e l'ostacolo torna",
    "residuo": "l'effetto fa di testa sua fino a fine scena",
    "specchio": "un loro incantesimo torna contro di loro, storpiato",
    "testimone": "da qui in poi i Volgari contano con testimoni",
    "in-mezzo": "un Dormiente finisce dentro l'effetto: salvarlo costa un'azione",
    "il-luogo": "il posto morde: 1 danno a fine turno, o una Condizione a tutti",
    "ombra": "entra un'Ombra che copia il mago e vuole una cosa piccola",
    "esattore": "entra chi vuole l'effetto disfatto, o un prezzo al posto suo",
    "ospite": "entra un testimone che conta: ogni Volgare è con testimoni",
    "carica": "orologio: si riempie coi Volgari, pieno scatta il rimbalzo scelto",
    "scadenza": "orologio: un segmento a turno, pieno l'effetto cade",
    "arrivo": "orologio: un segmento a turno, pieno entra una Presenza",
    "nascosto": "come Carica, ma l'orologio lo vede solo chi ha Quadrante",
    "ciclo": "orologio: a ogni giro pieno, una Conseguenza gratis a chi ha lanciato Volgare",
    "ancora": "orologio: un segmento a scena, pieno il guaio dell'Ancora arriva",
    "la-chiamata": "l'Ancora chiama: il gruppo va da lei, o si apre l'orologio",
    "l-incrocio": "le Ancore di due maghi nello stesso guaio",
    "in-scena": "l'Ancora entra nell'effetto: In mezzo e Testimone insieme",
    "il-bersaglio-sbagliato": "l'effetto è andato sull'Ancora, storpiato",
    "il-ritmo": "orologio sull'Ancora: ogni Volgare un segmento, pieno scatta La chiamata",
    "indagine-mezza-verita": "la risposta è vera ma manca un pezzo",
    "indagine-sorvegliato": "il bersaglio sente lo sguardo e cambia le mosse",
    "indagine-domande": "un PNG fa le domande che i maghi non sanno spiegare, e Mente non le toglie",
    "indagine-senza-prove": "la prova si cancella da sola, anche rifatta con la Magick",
    "trattativa-ripensamento": "a fine scena l'accordo torna com'era prima",
    "trattativa-garanzia": "la promessa è legata: romperla con la Magick fa fallire l'effetto",
    "trattativa-concorrenza": "un terzo entra in gara, e la coincidenza lavora per lui",
    "trattativa-ora-o-mai": "l'ora è fissa: la Magick sul tempo fallisce, poi l'accordo salta",
    "infiltrazione-telecamera": "il sistema ha registrato: i Volgari nel palazzo sono con testimoni",
    "infiltrazione-sistema": "l'edificio reagisce: allarme, porte chiuse, luci a caso",
    "infiltrazione-uscita": "l'uscita si chiude: non è più l'entrata",
    "infiltrazione-ronda": "la guardia è sorda alla Magick: si evita da Dormienti",
    "combattimento-anticipo": "il Volgare di questo turno arriva a fine turno",
    "combattimento-rinforzo": "al secondo segmento entra un rinforzo uscito dalla loro Magick",
    "combattimento-stop": "al turno dopo, per un turno, nessuna Magick in scena",
    "combattimento-ritirata": "i nemici si ritirano e la Magick non li segue",
    "combattimento-fuga": "scappa in modo soprannaturale: Corrispondenza e Tempo non lo trovano",
    "inseguimento-svolta": "chi scappa sparisce dalla Magick per un turno, non dagli occhi",
    "inseguimento-scambio": "hanno preso quello sbagliato: quello giusto corre ancora",
    "inseguimento-ostacolo": "un ostacolo che non si scavalca con la Magick, solo da Dormienti",
    "inseguimento-fine-corsa": "la corsa finisce in mezzo alla gente: da lì con testimoni",
    "rituale-disturbo": "un Passo del rito si guasta: si tiene senza i suoi dadi, o si rifà",
    "rituale-prezzo-in-piu": "il rito chiede una cosa in più: un Passo, una Quintessenza, un oggetto",
    "rituale-ospite": "entra un Ospite che vuole un posto nel rito: ogni Volgare è con testimoni",
    "rituale-sbavatura": "l'effetto sbava fuori dal cerchio, per questa scena e quella dopo",
    "altrove-pedaggio": "ogni Volgare costa 1 Quintessenza in più fino a fine scena",
    "altrove-la-voce": "una voce chiama: −2 dadi a chi non le va incontro",
    "altrove-stranezza": "un dettaglio sbagliato morde: Abbagliato o Ovattato per la scena",
    "santuario-falla": "la protezione cede: quello che teneva fuori può entrare",
    "santuario-il-nodo-storto": "il Nodo non dà Quintessenza e in casa i Volgari riescono con l'8",
    "santuario-visita": "qualcuno entra oltre le protezioni, e ha visto",
    "citta-intoppo": "la scorciatoia arriva nel posto sbagliato, con gente intorno",
    "citta-controllo": "il controllo vede: la Magick su documento, targa e faccia salta",
    "citta-folla": "la folla si chiude: nessun posto senza testimoni per la scena",
    "citta-chiusura": "la chiusura tiene: Materia, Forza e Corrispondenza scivolano",
    "anomalia": "il mago prende il Difetto Echi: un dado a chi lo cerca, per pallino",
    "macchia": "metà dell'Ustione va sulla Saggezza",
    "spirito-del-paradosso": "un'entità viene a riscuotere nella sessione dopo",
    "regno-del-paradosso": "il mago finisce in una bolla fuori dal mondo: uscirne è la sessione dopo",
}
NUMERI = {"uno": 1, "due": 2, "tre": 3}

BLOCCO = re.compile(r"^::: *(\w+)(?: +([^\n]*))?\n(.*?)^:::\s*$", re.M | re.S)


def slug(text):
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def campi(corpo):
    out = {}
    for riga in corpo.strip().splitlines():
        if ":" in riga:
            k, v = riga.split(":", 1)
            out[k.strip()] = v.strip()
    return out


def prezzo(testo):
    """Il prezzo letto dal testo, col suo `breve` per la riga della lista («1 pt», «la soglia», «1 pt + rimbalzo»)."""
    t = testo.strip()
    if m := re.match(r"^(\d+) punt[oi]$", t):
        return {"testo": t, "breve": f"{m.group(1)} pt", "tipo": "fisso", "valore": int(m.group(1))}
    if m := re.match(r"^(\d+) punt[oi] a pallino, fino a (\w+)$", t):
        return {"testo": t, "breve": f"{m.group(1)} pt a pallino", "tipo": "pallino", "valore": int(m.group(1)), "massimo": NUMERI[m.group(2)]}
    if m := re.match(r"^(\d+) punt[oi], più il rimbalzo$", t):
        return {"testo": t, "breve": f"{m.group(1)} pt + rimbalzo", "tipo": "orologioRimbalzo", "valore": int(m.group(1))}
    if m := re.match(r"^(\d+) punt[oi], più l'orologio$", t):
        return {"testo": t, "breve": f"{m.group(1)} pt + orologio", "tipo": "fisso", "valore": int(m.group(1)), "orologio": True}
    if m := re.match(r"^la sua soglia(?:, intorno a (\d+))?$", t):
        return {"testo": t, "breve": f"la sua soglia (≈{m.group(1)})" if m.group(1) else "la sua soglia", "tipo": "suaSoglia", "valore": int(m.group(1)) if m.group(1) else 0}
    if t in ("la soglia", "la soglia dell'effetto"):
        return {"testo": t, "breve": "la soglia", "tipo": "soglia", "valore": 0}
    raise SystemExit(f"prezzo che non so leggere: {t}")


def rinomina(valore):
    """Le rinomine di Blue in ogni testo (stringhe, liste e dizionari, in profondità)."""
    if isinstance(valore, str):
        for vecchio, nuovo in RINOMINE:
            valore = valore.replace(vecchio, nuovo)
        return valore
    if isinstance(valore, list):
        return [rinomina(v) for v in valore]
    if isinstance(valore, dict):
        return {k: rinomina(v) for k, v in valore.items()}
    return valore


def mosse(testo):
    parti = [p.strip() for p in re.split(r",\s*(?![^()]*\))", testo.rstrip(".")) if p.strip()]
    return parti


def main():
    testo = SRC.read_text(encoding="utf-8")
    sezioni = re.split(r"(?m)^## (.+)$", testo)
    voci = []
    facce = {}          # scena -> nome voce -> {testo, prezzo}
    facce_famiglia = {} # scena -> famiglia -> testo
    sottotitoli = {}
    ordine = 0
    for i in range(1, len(sezioni), 2):
        titolo = sezioni[i].strip()
        corpo = sezioni[i + 1]
        famiglia = FAMIGLIE_SEZIONI.get(titolo)
        scena = SCENE.get(titolo, "")
        if not famiglia and not scena:
            continue
        for m in BLOCCO.finditer(corpo):
            tipo, testa, dentro = m.group(1), (m.group(2) or "").strip(), m.group(3)
            if tipo == "scena":
                d = campi(dentro)
                sottotitoli[scena] = {"sotto": d.get("sotto", ""), "testo": d.get("testo", "")}
                continue
            if tipo == "facce":
                for riga in dentro.strip().splitlines():
                    parti = [p.strip() for p in riga.split("|")]
                    if len(parti) < 3:
                        continue
                    nome, faccia, pr = parti[0], parti[1], parti[2]
                    if nome in FACCE_FAMIGLIA:
                        facce_famiglia.setdefault(scena, {})[FACCE_FAMIGLIA[nome]] = faccia
                    else:
                        facce.setdefault(scena, {})[nome] = {"testo": faccia, "prezzo": pr}
                continue
            if tipo == "momenti":
                continue
            if tipo != "voce":
                raise SystemExit(f"blocco ignoto: {tipo}")
            parti = [p.strip() for p in testa.split("|")]
            nome, pr = parti[0], parti[1]
            modo = MODI[parti[2]] if len(parti) > 2 else "immediato"
            d = campi(dentro)
            fam = famiglia
            if scena:
                fam = "scettro" if nome in SCETTRO else "scena"
            ordine += 1
            voci.append({
                "id": (f"{scena}-" if scena else "") + slug(nome),
                "nome": nome,
                "famiglia": fam,
                "scena": scena,
                "presenza": fam == "presenze" or nome in PRESENZE_DI_SCENA,
                "modo": modo,
                "prezzo": prezzo(pr),
                "quando": d.get("quando", ""),
                "segno": d.get("segno", ""),
                "effetto": d.get("effetto", ""),
                "mosse": mosse(d.get("mosse", "")),
                "poi": d.get("poi", ""),
                "esempio": d.get("esempio", ""),
                "durata": DURATE.get(nome, "" if fam in ("orologi",) or nome in PRESENZE_DI_SCENA or fam == "presenze" else "scena"),
                "ordine": ordine,
            })
            voci[-1]["breve"] = BREVI[voci[-1]["id"]]
    # Le facce delle comuni, scena per scena.
    per_nome = {v["nome"]: v for v in voci if v["famiglia"] == "comuni"}
    for scena, righe in facce.items():
        for nome, faccia in righe.items():
            if nome not in per_nome:
                raise SystemExit(f"faccia di una voce che non c'è: {nome} ({scena})")
            per_nome[nome].setdefault("facce", {})[scena] = faccia
    for v in voci:
        v.setdefault("facce", {})
    if len(voci) != 65:
        raise SystemExit(f"attese 65 voci, trovate {len(voci)}")
    if set(BREVI) - {v["id"] for v in voci}:
        raise SystemExit(f"righe brevi di voci che non ci sono: {sorted(set(BREVI) - {v['id'] for v in voci})}")
    scene = [{"id": sid, "nome": nome, **sottotitoli.get(sid, {"sotto": "", "testo": ""}), "facce": facce_famiglia.get(sid, {})} for nome, sid in SCENE.items()]
    voci = rinomina(voci)
    scene = rinomina(scene)
    testa = (
        "// Generato da tools/build-menu-paradosso.py dal sorgente del menù (tools/dati/menu_paradosso.md, il testo del PDF del 24/9/2026): non toccare a mano.\n"
        "// Le 65 voci del menù del Paradosso: famiglia, scena, modo (annunciato, immediato, nascosto, scoppio), prezzo (col suo breve), la riga breve, la scheda (quando, segno, effetto, mosse, poi, esempio),\n"
        "// la faccia delle comuni in ogni scena e la durata addosso al mago (lancio, turno, scena, sessione; vuota se la voce non sta addosso a nessuno).\n"
        "// I Tocchi si chiamano Conseguenze Magick (Blue, 24/9 sera): la rinomina è fatta qui, il PDF segue.\n\n"
    )
    js = testa
    js += "export const FAMIGLIE_PARADOSSO = Object.freeze([\"tocchi\", \"comuni\", \"scena\", \"scettro\", \"presenze\", \"orologi\", \"ancore\", \"grandi\"]);\n\n"
    js += "export const SCENE_PARADOSSO = Object.freeze(" + json.dumps(scene, ensure_ascii=False, indent=2) + ");\n\n"
    js += "export const MENU_PARADOSSO = Object.freeze(" + json.dumps(voci, ensure_ascii=False, indent=2) + ");\n"
    OUT.write_text(js, encoding="utf-8")
    print(f"scritto {OUT.relative_to(ROOT)} · voci: {len(voci)} · scene: {len(scene)}")


if __name__ == "__main__":
    main()
