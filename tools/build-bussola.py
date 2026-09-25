#!/usr/bin/env python3
"""Costruisce dalla Bussola rifatta (tools/dati/bussola.md, i verdetti di Blue
del 25/9/2026) i compendi delle Ambizioni, dei Desideri e delle Ancore, e il
file dati del generatore delle Ancore.

Uso: python3 tools/build-bussola.py

Legge tools/dati/bussola.md e scrive:
- packs/mage-ambizioni.db   le 50 generali per gruppo e le 78 per Credo
- packs/mage-desideri.db    le 52 generali per gruppo e le 78 per Credo
- packs/mage-ancore.db      le dodici Ancore montate (ruolo, cosa ti dà,
                            cosa non sa, dove morde)
- scripts/data/generatore-ancore.js  nomi, cognomi, mestieri, ruoli e le tre
                            tavole del concetto, per il tasto «Genera»

Dal 25/9 tools/build-archivi.py non scrive più questi tre compendi.
"""
import hashlib
import html
import json
import re
import sys
from pathlib import Path

MODULE = "wod5e-mage"
ROOT = Path(__file__).resolve().parent.parent
SORGENTE = ROOT / "tools" / "dati" / "bussola.md"
PACKS = ROOT / "packs"
DATI_JS = ROOT / "scripts" / "data" / "generatore-ancore.js"

CREDO_IDS = {
    "Tutto è Arte": "arte", "Tutto è Caos": "caos", "Tutto è Dati": "dati", "Tutto è Fede": "fede",
    "Tutto è Illusione": "illusione", "Tutto è Legge": "legge", "Tutto è Macchina": "macchina",
    "Tutto è Polvere": "polvere", "Tutto è Potere": "potere", "Tutto è Sacro": "sacro",
    "Tutto è Scienza": "scienza", "Tutto è Suono": "suono", "Tutto è Vivo": "vivo",
}


# ---------------------------------------------------------------- lettura
def read_source():
    if not SORGENTE.exists():
        sys.exit(f"Sorgente non trovata: {SORGENTE}")
    return SORGENTE.read_text(encoding="utf-8")


def sections(md, level):
    """[(titolo, corpo), …] per le intestazioni di un livello (## o ###)."""
    marker = "#" * level + " "
    out = []
    parts = re.split(r"^(?=" + re.escape(marker) + r"(?!#))", md, flags=re.M)
    for part in parts:
        if not part.startswith(marker):
            continue
        head, _, body = part.partition("\n")
        out.append((head[len(marker):].strip(), body))
    return out


def find_section(md, level, title_prefix):
    for title, body in sections(md, level):
        if title.startswith(title_prefix):
            return body
    sys.exit(f"Sezione «{title_prefix}» non trovata nella Bussola")


def table_rows(md_block):
    """Le celle nude delle righe di tavola, senza intestazione e separatore."""
    rows = []
    for line in md_block.splitlines():
        line = line.strip()
        if not line.startswith("|"):
            continue
        cells = [c.strip() for c in line.strip("|").split("|")]
        if all(re.fullmatch(r":?-+:?", c) for c in cells if c):
            continue
        rows.append(cells)
    return rows[1:] if rows else []


def plain(text):
    return text.replace("**", "").replace("*", "").strip()


def d100_list(md_block):
    """Le tavole d100: righe «| 01-10 | 1 Wanda · 2 Giusy … |» → la lista in ordine."""
    values = []
    for cells in table_rows(md_block):
        if len(cells) < 2:
            continue
        for item in cells[1].split("·"):
            item = re.sub(r"^\s*\d+\s+", "", item).strip()
            if item:
                values.append(item)
    return values


def riserva_cognomi(md_block):
    m = re.search(r"Riserva di cognomi[^:]*:\s*(.+?)\.\s*$", md_block, flags=re.M | re.S)
    if not m:
        return []
    return [c.strip() for c in m.group(1).replace("\n", " ").split(",") if c.strip()]


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


def write_pack(name, docs):
    PACKS.mkdir(exist_ok=True)
    path = PACKS / f"{name}.db"
    with path.open("w", encoding="utf-8", newline="\n") as f:
        for d in docs:
            f.write(json.dumps(d, ensure_ascii=False) + "\n")
    print(f"{name}: {len(docs)} voci")


# --------------------------------------------------- Ambizioni e Desideri
def build_frasi(md, kind, capitolo, generali_prefix, credo_prefix, pack, attesi):
    corpo = find_section(md, 2, capitolo)
    docs, sort = [], 0
    generali = find_section(corpo, 3, generali_prefix)
    for gruppo, blocco in sections(generali, 4):
        gruppo = re.sub(r"\s*\(\d+\)\s*$", "", gruppo)
        for cells in table_rows(blocco):
            if len(cells) < 2 or not cells[0]:
                continue
            title, text = plain(cells[0]), plain(cells[1])
            content = f"<p><em>{html.escape(title, quote=False)}</em></p><p>{html.escape(text, quote=False)}</p>"
            docs.append(journal(title, content, kind, gruppo, sort, {"text": text, "title": title}))
            sort += 10
    n_generali = len(docs)
    per_credo = find_section(corpo, 3, credo_prefix)
    for credo_label, blocco in sections(per_credo, 4):
        credo_id = CREDO_IDS.get(credo_label.strip())
        if not credo_id:
            sys.exit(f"Credo sconosciuto nella Bussola: {credo_label}")
        for cells in table_rows(blocco):
            if len(cells) < 2 or not cells[0]:
                continue
            title, text = plain(cells[0]), plain(cells[1])
            content = f"<p><em>{html.escape(title, quote=False)}</em></p><p>{html.escape(text, quote=False)}</p>"
            docs.append(journal(title, content, kind, credo_label.strip(), sort, {"text": text, "title": title, "credo": credo_id}))
            sort += 10
    if (n_generali, len(docs) - n_generali) != attesi:
        sys.exit(f"{pack}: attese {attesi}, trovate ({n_generali}, {len(docs) - n_generali})")
    write_pack(pack, docs)


# ------------------------------------------------------------- Ancore
def parse_generatore(md):
    corpo = find_section(md, 2, "Ancore")
    dati = {
        "nomiF": d100_list(find_section(corpo, 3, "Nome, donna")),
        "nomiM": d100_list(find_section(corpo, 3, "Nome, uomo")),
        "cognomi": d100_list(find_section(corpo, 3, "Cognome")),
        "cognomiRiserva": riserva_cognomi(find_section(corpo, 3, "Cognome")),
        "mestieri": d100_list(find_section(corpo, 3, "Mestiere")),
        "ruoli": [],
        "cosaTiDa": [],
        "cosaNonSa": [],
        "doveMorde": [],
        "montate": [],
    }
    for cells in table_rows(find_section(corpo, 3, "Ruolo")):
        if len(cells) >= 3 and cells[1]:
            dati["ruoli"].append({"nome": plain(cells[1]), "definizione": plain(cells[2])})
    for cells in table_rows(find_section(corpo, 3, "Cosa ti dà")):
        if len(cells) >= 4 and cells[1]:
            dati["cosaTiDa"].append(plain(cells[1]))
            dati["cosaNonSa"].append(plain(cells[2]))
            dati["doveMorde"].append(plain(cells[3]))
    for cells in table_rows(find_section(corpo, 3, "Dodici Ancore montate")):
        if len(cells) >= 4 and cells[0]:
            dati["montate"].append({
                "ruolo": plain(cells[0]), "cosaTiDa": plain(cells[1]),
                "cosaNonSa": plain(cells[2]), "doveMorde": plain(cells[3]),
            })
    attese = {"nomiF": 100, "nomiM": 100, "cognomi": 100, "mestieri": 100, "ruoli": 20, "cosaTiDa": 10, "cosaNonSa": 10, "doveMorde": 10, "montate": 12}
    for chiave, n in attese.items():
        if len(dati[chiave]) != n:
            sys.exit(f"generatore: {chiave} attesi {n}, trovati {len(dati[chiave])}")
    return dati


RUOLI_MONTATE = {
    "partner": "partner", "genitore": "genitore", "figlia": "figlio o figlia", "figlio": "figlio o figlia",
    "amico d'infanzia": "amico d'infanzia", "fratello": "fratello o sorella", "sorella": "fratello o sorella",
    "chi ti serve ogni giorno": "chi ti serve ogni giorno", "nonno": "nonno o nonna", "nonna": "nonno o nonna",
    "ex": "ex", "collega": "collega", "vicina di casa": "vicino di casa", "vicino di casa": "vicino di casa",
    "migliore amico": "migliore amico", "chi ti cura": "chi ti cura",
}


def ruolo_id(ruolo_cell, ruoli):
    """«genitore (la madre che dimentica)» → il ruolo del d20 «genitore»; «figlia» → «figlio o figlia»."""
    base = re.sub(r"\s*\(.*\)\s*$", "", ruolo_cell).strip().lower()
    nomi = {r["nome"].lower(): r["nome"] for r in ruoli}
    if base in nomi:
        return nomi[base]
    if base in RUOLI_MONTATE and RUOLI_MONTATE[base].lower() in nomi:
        return nomi[RUOLI_MONTATE[base].lower()]
    sys.exit(f"Ancora montata senza ruolo del d20: {ruolo_cell}")


ARTICOLI_MONTATE = {
    "partner": "Il", "figlia": "La", "fratello": "Il", "ex": "L'", "collega": "Il", "vicina di casa": "La",
    "amico d'infanzia": "L'", "nonno": "Il", "migliore amico": "Il", "genitore": "Il", "chi ti serve ogni giorno": "",
    "chi ti cura": "",
}


def nome_montata(ruolo_cell):
    """«genitore (la madre che dimentica)» → «La madre che dimentica»; «nonno (in ospizio)» → «Il nonno in ospizio»;
    «partner» → «Il partner»."""
    m = re.match(r"^(.*?)\s*\((.*)\)\s*$", ruolo_cell.strip())
    base = (m.group(1) if m else ruolo_cell).strip()
    dentro = m.group(2).strip() if m else ""
    if dentro and re.match(r"^(la|il|lo|l')\b", dentro, flags=re.I):
        return dentro[0].upper() + dentro[1:]
    articolo = ARTICOLI_MONTATE.get(base, "")
    testa = f"{articolo}{base}" if articolo.endswith("'") else f"{articolo} {base}".strip()
    nome = f"{testa} {dentro}".strip()
    return nome[0].upper() + nome[1:]


def build_ancore(dati):
    docs = []
    for i, m in enumerate(dati["montate"]):
        ruolo = ruolo_id(m["ruolo"], dati["ruoli"])
        name = nome_montata(m["ruolo"])
        content = (
            f"<p><em>{html.escape(name, quote=False)}</em> · {html.escape(ruolo, quote=False)}</p>"
            f"<p><strong>Cosa ti dà:</strong> {html.escape(m['cosaTiDa'], quote=False)}. "
            f"<strong>Cosa non sa:</strong> {html.escape(m['cosaNonSa'], quote=False)}. "
            f"<strong>Dove morde:</strong> {html.escape(m['doveMorde'], quote=False)}.</p>"
        )
        docs.append(journal(name, content, "ancora", "Ancore", i * 10, {
            "text": name,
            "role": ruolo,
            "gives": m["cosaTiDa"],
            "unknown": m["cosaNonSa"],
            "bites": m["doveMorde"],
            "description": f"{m['cosaTiDa']} · {m['cosaNonSa']} · {m['doveMorde']}",
        }))
    write_pack("mage-ancore", docs)


def js_list(values, indent="  "):
    return ",\n".join(indent + json.dumps(v, ensure_ascii=False) for v in values)


def write_generatore(dati):
    ruoli = ",\n".join(
        f"  {{ id: {json.dumps(r['nome'], ensure_ascii=False)}, definizione: {json.dumps(r['definizione'], ensure_ascii=False)} }}"
        for r in dati["ruoli"]
    )
    testo = f"""// Generato da tools/build-bussola.py da tools/dati/bussola.md (la Bussola
// rifatta, verdetti di Blue del 25/9/2026). Non si scrive a mano: si corregge
// la sorgente e si rilancia lo script.
//
// Le liste del generatore delle Ancore: cento nomi di donna, cento di uomo,
// cento cognomi in tavola più la riserva, cento mestieri, i venti ruoli con
// la loro definizione e le tre tavole del concetto (cosa ti dà, cosa non sa,
// dove morde). Nomi, cognomi, mestieri ed età vengono dai trenta ritratti
// dello studio dei PNG del Narratore.

export const NOMI_DONNA = Object.freeze([
{js_list(dati['nomiF'])}
]);

export const NOMI_UOMO = Object.freeze([
{js_list(dati['nomiM'])}
]);

export const COGNOMI = Object.freeze([
{js_list(dati['cognomi'])}
]);

export const COGNOMI_RISERVA = Object.freeze([
{js_list(dati['cognomiRiserva'])}
]);

export const MESTIERI = Object.freeze([
{js_list(dati['mestieri'])}
]);

/** I venti ruoli del d20, con cosa vuol dire quel legame per il mago. */
export const RUOLI = Object.freeze([
{ruoli}
]);

export const COSA_TI_DA = Object.freeze([
{js_list(dati['cosaTiDa'])}
]);

export const COSA_NON_SA = Object.freeze([
{js_list(dati['cosaNonSa'])}
]);

export const DOVE_MORDE = Object.freeze([
{js_list(dati['doveMorde'])}
]);
"""
    DATI_JS.write_text(testo, encoding="utf-8", newline="\n")
    print(f"{DATI_JS.relative_to(ROOT)}: {len(dati['nomiF'])} + {len(dati['nomiM'])} nomi, {len(dati['cognomi'])} + {len(dati['cognomiRiserva'])} cognomi, {len(dati['mestieri'])} mestieri, {len(dati['ruoli'])} ruoli")


if __name__ == "__main__":
    md = read_source()
    build_frasi(md, "ambizione", "Ambizioni", "Ambizioni generali", "Ambizioni per Credo", "mage-ambizioni", (50, 78))
    build_frasi(md, "desiderio", "Desideri", "Desideri generali", "Desideri per Credo", "mage-desideri", (52, 78))
    dati = parse_generatore(md)
    build_ancore(dati)
    write_generatore(dati)
