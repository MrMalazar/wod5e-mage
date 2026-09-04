#!/usr/bin/env python3
"""Costruisce i consigli degli Strumenti dalle sorgenti del LIBRO M5.

Uso: python3 tools/build-strumenti.py "<cartella della casa MAGHI M5>"

Legge la pagina «Gli Strumenti d'esempio» dei tredici studi dei Credi
(tavola Sfera per Sfera, chiave Magick e Tecnomagick) e le righe ⚙ delle
sette del capitolo 03 (Strumenti per Oggetto, Parola, Macchina, Sostanza,
Corpo) più la riga «Strumenti» dei consigli di ogni Tradizione, e scrive
scripts/data/strumenti.js: un modulo generato, da non toccare a mano.
"""
import json
import re
import sys
from pathlib import Path

CASA = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("../MAGHI M5")
STUDI = CASA / "01_DECISIONI/studi"
FAZIONI = CASA / "02_LIBRO/sorgenti/03_le_fazioni"
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "scripts/data/strumenti.js"

SPHERES = {
    "Corrispondenza": "correspondence", "Entropia": "entropy", "Forza": "forces",
    "Vita": "life", "Materia": "matter", "Mente": "mind", "Primordio": "prime",
    "Spirito": "spirit", "Tempo": "time",
}
TOOLS = {
    "Armi": "weapons", "Attrezzi": "tradeTools", "Simboli": "symbols", "Scritti": "writings",
    "Strumenti musicali": "musicalInstruments", "Preghiere": "prayers", "Comandi": "commands",
    "Formule": "formulas", "Canti": "songs", "Racconti": "tales", "Dispositivi": "devices",
    "Apparecchi": "tradeApparatus", "Innesti": "implants", "Congegni": "contraptions",
    "Erbe": "herbs", "Preparati": "preparations", "Fluidi": "fluids", "Minerali": "minerals",
    "Gesti": "gestures", "Movimenti": "movements", "Fiato": "breath", "Trance": "trance",
}
CATEGORIES = {"Oggetto": "object", "Parola": "word", "Macchina": "machine", "Sostanza": "substance", "Corpo": "body"}
CREDO_NAMES = {
    "Tutto è Arte": "arte", "Tutto è Caos": "caos", "Tutto è Dati": "dati", "Tutto è Fede": "fede",
    "Tutto è Illusione": "illusione", "Tutto è Legge": "legge", "Tutto è Macchina": "macchina",
    "Tutto è Polvere": "polvere", "Tutto è Potere": "potere", "Tutto è Sacro": "sacro",
    "Tutto è Scienza": "scienza", "Tutto è Suono": "suono", "Tutto è Vivo": "vivo",
}


def norm(label):
    label = label.strip().lower()
    label = label.replace("\u2019", "'")
    label = re.sub(r"^(?:(?:gli|le|la|il|lo|i)\s+|l')", "", label)
    return re.sub(r"\s+", " ", label)


def famiglie_ids():
    """Gli id delle Famiglie e delle sette, letti da scripts/famiglie.js."""
    src = (ROOT / "scripts/famiglie.js").read_text(encoding="utf-8")
    out = {}
    for match in re.finditer(r'id:\s*"([^"]+)",\s*(?:fazione:\s*"[^"]+",\s*)?label:\s*"([^"]+)"', src):
        out[norm(match.group(2))] = match.group(1)
    return out


def cell(text):
    """«Fiato → fischio, richiamo» → (breath, «fischio, richiamo»)."""
    text = text.strip()
    if "→" not in text:
        return None
    tool, examples = [part.strip() for part in text.split("→", 1)]
    if tool not in TOOLS:
        raise SystemExit(f"Strumento sconosciuto: {tool!r}")
    return {"tool": TOOLS[tool], "examples": examples}


def build_credi():
    credi = {}
    for path in sorted(STUDI.glob("credo_tutto_e_*.md")):
        text = path.read_text(encoding="utf-8")
        section = re.search(r"^## Gli Strumenti d'esempio\n(.*?)(?=^## )", text, flags=re.S | re.M)
        if not section:
            continue
        body = section.group(1)
        credo_id = path.stem.replace("credo_tutto_e_", "")
        # Il mestiere: «Attrezzi da Artista» / «Apparecchi da Artista».
        profession = ""
        job = re.search(r"\|\s*(?:Attrezzi|Apparecchi) da ([^|]+?)\s*\|", body)
        if job:
            profession = job.group(1).strip()
        spheres = {}
        table = re.search(r"^\| Sfera \| Magick \| Tecnomagick \|\n\|[^\n]*\n((?:\|[^\n]*\n)+)", body, flags=re.M)
        if not table:
            raise SystemExit(f"Tavola delle Sfere mancante in {path.name}")
        for row in table.group(1).strip().split("\n"):
            cols = [col.strip() for col in row.strip().strip("|").split("|")]
            if len(cols) < 3 or cols[0] not in SPHERES:
                raise SystemExit(f"Riga strana in {path.name}: {row!r}")
            spheres[SPHERES[cols[0]]] = {"magick": cell(cols[1]), "tecnomagick": cell(cols[2])}
        credi[credo_id] = {"profession": profession, "spheres": spheres}
    return credi


def parse_gear(line):
    """La riga ⚙: Credo, Forma e gli Strumenti per categoria (il Mondo si lascia)."""
    line = line.strip().strip("*").rstrip(".")
    out = {"credo": "", "forma": "", "tools": {}}
    credo = re.search(r"Credo:\s*([^·]+)", line)
    if credo:
        out["credo"] = CREDO_NAMES.get(credo.group(1).strip(), "")
    forma = re.search(r"Forma:\s*([^·]+)", line)
    if forma:
        out["forma"] = forma.group(1).strip()
    tools = line.split("Strumenti:", 1)
    if len(tools) == 2:
        for part in tools[1].split("·"):
            if ":" not in part:
                continue
            cat, value = [piece.strip() for piece in part.split(":", 1)]
            if cat in CATEGORIES and value:
                out["tools"][CATEGORIES[cat]] = value
    return out


def build_famiglie(ids):
    famiglie = {}
    sottofamiglie = {}
    trad = (FAZIONI / "03_1_le_tradizioni.md").read_text(encoding="utf-8")
    current = None
    lines = trad.split("\n")
    for index, line in enumerate(lines):
        heading = re.match(r"^# (.+)$", line)
        if heading:
            current = ids.get(norm(heading.group(1)))
            continue
        consigli = re.match(r"^\| \*\*Strumenti\*\* \| (.+?) \|$", line)
        if consigli and current:
            famiglie[current] = {"list": [item.strip() for item in consigli.group(1).split("·")]}
            continue
        sub = re.match(r"^\*\*(.+?) · ⊕ ", line)
        if sub:
            sub_id = ids.get(norm(sub.group(1)))
            if not sub_id:
                raise SystemExit(f"Setta sconosciuta: {sub.group(1)!r}")
            gear = next((l for l in lines[index + 1:index + 4] if l.startswith("*⚙")), "")
            sottofamiglie[sub_id] = parse_gear(gear)
    craft = (FAZIONI / "03_3_i_disparati.md").read_text(encoding="utf-8")
    current = None
    lines = craft.split("\n")
    for index, line in enumerate(lines):
        heading = re.match(r"^### (.+)$", line)
        if heading:
            current = ids.get(norm(heading.group(1)))
            continue
        if line.startswith("*⚙") and current:
            gear = parse_gear(line)
            famiglie[current] = {"list": [], **gear}
    return famiglie, sottofamiglie


SFERE_OUT = ROOT / "scripts/data/credo-sfere.js"


def build_credo_sfere():
    """«Le nove Sfere in questa ottica»: una riga per Sfera, per ogni Credo che le ha."""
    out = {}
    for path in sorted(STUDI.glob("credo_tutto_e_*.md")):
        text = path.read_text(encoding="utf-8")
        section = re.search(r"^## Le Sfere affini\n(.*?)(?=^## )", text, flags=re.S | re.M)
        if not section:
            continue
        credo_id = path.stem.replace("credo_tutto_e_", "")
        spheres = {}
        for line in section.group(1).split("\n"):
            m = re.match(r"^- (Corrispondenza|Entropia|Forza|Vita|Materia|Mente|Primordio|Spirito|Tempo)\b(.*)$", line.strip())
            if not m:
                continue
            spheres[SPHERES[m.group(1)]] = (m.group(1) + m.group(2)).strip()
        if spheres:
            out[credo_id] = spheres
    SFERE_OUT.write_text(
        "// Generato da tools/build-strumenti.py dagli studi dei Credi: non toccare a mano.\n"
        "// Cos'è ogni Sfera nell'ottica di un Credo («Le nove Sfere in questa ottica»).\n\n"
        f"export const CREDO_SFERE = Object.freeze({json.dumps(out, ensure_ascii=False, indent=2)});\n",
        encoding="utf-8", newline="\n")
    print(f"Credi con le nove Sfere: {len(out)} → {SFERE_OUT.relative_to(ROOT)}")


def main():
    build_credo_sfere()
    ids = famiglie_ids()
    credi = build_credi()
    famiglie, sottofamiglie = build_famiglie(ids)
    if len(credi) != 13:
        raise SystemExit(f"Credi letti: {len(credi)}, attesi 13")
    if len(sottofamiglie) != 36:
        raise SystemExit(f"Sette lette: {len(sottofamiglie)}, attese 36")
    dump = lambda value: json.dumps(value, ensure_ascii=False, indent=2)
    OUT.write_text(
        "// Generato da tools/build-strumenti.py dalle sorgenti del LIBRO M5: non toccare a mano.\n"
        "// Gli Strumenti d'esempio dei tredici Credi (Sfera per Sfera, Magick e Tecnomagick),\n"
        "// gli Strumenti delle nove Tradizioni e delle dieci Craft, e quelli delle trentasei sette.\n\n"
        f"export const CREDO_STRUMENTI = Object.freeze({dump(credi)});\n\n"
        f"export const FAMIGLIA_STRUMENTI = Object.freeze({dump(famiglie)});\n\n"
        f"export const SOTTOFAMIGLIA_STRUMENTI = Object.freeze({dump(sottofamiglie)});\n",
        encoding="utf-8", newline="\n",
    )
    print(f"Credi {len(credi)}, Famiglie {len(famiglie)}, sette {len(sottofamiglie)} → {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
