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
    t = testo.strip()
    if m := re.match(r"^(\d+) punt[oi]$", t):
        return {"testo": t, "tipo": "fisso", "valore": int(m.group(1))}
    if m := re.match(r"^(\d+) punt[oi] a pallino, fino a (\w+)$", t):
        return {"testo": t, "tipo": "pallino", "valore": int(m.group(1)), "massimo": {"uno": 1, "due": 2, "tre": 3}[m.group(2)]}
    if m := re.match(r"^(\d+) punt[oi], più il rimbalzo$", t):
        return {"testo": t, "tipo": "orologioRimbalzo", "valore": int(m.group(1))}
    if m := re.match(r"^(\d+) punt[oi], più l'orologio$", t):
        return {"testo": t, "tipo": "fisso", "valore": int(m.group(1)), "orologio": True}
    if m := re.match(r"^la sua soglia(?:, intorno a (\d+))?$", t):
        return {"testo": t, "tipo": "suaSoglia", "valore": int(m.group(1)) if m.group(1) else 0}
    if t in ("la soglia", "la soglia dell'effetto"):
        return {"testo": t, "tipo": "soglia", "valore": 0}
    raise SystemExit(f"prezzo che non so leggere: {t}")


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
    scene = [{"id": sid, "nome": nome, **sottotitoli.get(sid, {"sotto": "", "testo": ""}), "facce": facce_famiglia.get(sid, {})} for nome, sid in SCENE.items()]
    testa = (
        "// Generato da tools/build-menu-paradosso.py dal sorgente del menù (tools/dati/menu_paradosso.md, il testo del PDF del 24/9/2026): non toccare a mano.\n"
        "// Le 65 voci del menù del Paradosso: famiglia, scena, modo (annunciato, immediato, nascosto, scoppio), prezzo, la scheda (quando, segno, effetto, mosse, poi, esempio),\n"
        "// la faccia delle comuni in ogni scena e la durata addosso al mago (lancio, turno, scena, sessione; vuota se la voce non sta addosso a nessuno).\n\n"
    )
    js = testa
    js += "export const FAMIGLIE_PARADOSSO = Object.freeze([\"tocchi\", \"comuni\", \"scena\", \"scettro\", \"presenze\", \"orologi\", \"ancore\", \"grandi\"]);\n\n"
    js += "export const SCENE_PARADOSSO = Object.freeze(" + json.dumps(scene, ensure_ascii=False, indent=2) + ");\n\n"
    js += "export const MENU_PARADOSSO = Object.freeze(" + json.dumps(voci, ensure_ascii=False, indent=2) + ");\n"
    OUT.write_text(js, encoding="utf-8")
    print(f"scritto {OUT.relative_to(ROOT)} · voci: {len(voci)} · scene: {len(scene)}")


if __name__ == "__main__":
    main()
