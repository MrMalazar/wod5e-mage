#!/usr/bin/env python3
"""Costruisce il compendio dei Concetti (packs/mage-concetti.db) dal dato
unico tools/dati/concetti.md (i verdetti di Blue del 2-3/10/2026).

Uso: python3 tools/build-concetti.py

Ogni tavola del sorgente è un gruppo dell'archivio; ogni riga è un Concetto
in due parole legate: il mestiere di prima (dal generatore delle Ancore) e
quello che il Risveglio ne ha fatto. La colonna «Come» è la parola che le
lega: vuota vuol dire la sola virgola, «e» le tiene insieme («ed» davanti a
una e), le altre («ora», «in realtà», «già») stanno dopo la virgola.

Dal 3/10 tools/build-archivi.py non scrive più questo compendio (resta
dietro `--vecchi-concetti`, per il confronto col LIBRO).
"""
import hashlib
import html
import json
import re
import sys
from pathlib import Path

MODULE = "wod5e-mage"
ROOT = Path(__file__).resolve().parent.parent
SORGENTE = ROOT / "tools" / "dati" / "concetti.md"
PACKS = ROOT / "packs"


def doc_id(*parts):
    h = hashlib.sha1("|".join(parts).encode("utf-8")).hexdigest()
    return "".join(c for c in h if c.isalnum())[:16]


def journal(name, content, kind, group, sort, extra=None):
    flag = {"kind": kind, "group": group, "name": name}
    if extra:
        flag.update(extra)
    return {
        "_id": doc_id(kind, group, name),
        "name": name,
        "pages": [{
            "_id": doc_id("page", kind, group, name),
            "name": name,
            "type": "text",
            "title": {"show": False, "level": 1},
            "text": {"format": 1, "content": content},
            "sort": 0,
            "ownership": {"default": -1},
            "flags": {}
        }],
        "folder": None,
        "sort": sort,
        "ownership": {"default": 0},
        "flags": {MODULE: {"archivio": flag}}
    }


def componi(prima, come, dopo):
    """La riga del Concetto: «Infermiera, medico dell'occulto», «Barbiere e confessore»."""
    testa = prima[:1].upper() + prima[1:]
    if come == "e":
        legame = " ed " if dopo[:1].lower() == "e" else " e "
        return f"{testa}{legame}{dopo}"
    if come:
        return f"{testa}, {come} {dopo}"
    return f"{testa}, {dopo}"


def leggi(md):
    """[(gruppo, [(prima, come, dopo), …]), …] dalle tavole sotto le intestazioni ##."""
    gruppi = []
    for parte in re.split(r"^(?=## )", md, flags=re.M):
        if not parte.startswith("## "):
            continue
        titolo, _, corpo = parte.partition("\n")
        righe = []
        for riga in corpo.splitlines():
            if not riga.startswith("|"):
                continue
            celle = [c.strip() for c in riga.strip().strip("|").split("|")]
            if len(celle) != 3 or celle[0] in ("Prima", "") or set(celle[0]) <= set(":- "):
                continue
            righe.append(tuple(celle))
        gruppi.append((titolo[3:].strip(), righe))
    return gruppi


def main():
    if not SORGENTE.exists():
        sys.exit(f"Sorgente non trovata: {SORGENTE}")
    gruppi = leggi(SORGENTE.read_text(encoding="utf-8"))
    docs, nomi, sort = [], set(), 0
    for gruppo, righe in gruppi:
        if not righe:
            sys.exit(f"Gruppo senza Concetti: {gruppo}")
        for prima, come, dopo in righe:
            if come not in ("", "e", "ora", "in realtà", "già"):
                sys.exit(f"Legame sconosciuto «{come}» in {gruppo}: {prima}")
            nome = componi(prima, come, dopo)
            if nome in nomi:
                sys.exit(f"Concetto doppio: {nome}")
            nomi.add(nome)
            contenuto = f"<p>{html.escape(nome, quote=False)}</p>"
            docs.append(journal(nome, contenuto, "concetto", gruppo, sort, {"text": nome, "prima": prima, "dopo": dopo}))
            sort += 10
    PACKS.mkdir(exist_ok=True)
    path = PACKS / "mage-concetti.db"
    with path.open("w", encoding="utf-8", newline="\n") as f:
        for d in docs:
            f.write(json.dumps(d, ensure_ascii=False) + "\n")
    print(f"mage-concetti: {len(docs)} voci in {len(gruppi)} gruppi")


if __name__ == "__main__":
    main()
