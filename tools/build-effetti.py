#!/usr/bin/env python3
"""Costruisce il Grimorio degli effetti dalle nove tavole di Sfera del LIBRO.

Uso: python3 tools/build-effetti.py "<cartella della casa MAGHI M6>"

Legge, in ogni 06_2_N (le nove Sfere), la tavola «Quanto vedi, quando
guardi» (il primo pallino) e «Gli effetti, livello per livello» (dal
secondo al quinto), e scrive scripts/data/effetti.js: ogni effetto col nome,
la Sfera, il livello, le Sfere in più chieste dal testo («+ Primordio ●●»,
obbligatorie se aprono la riga, altrimenti a seconda del caso) e il come.
Dal 6/9 legge anche i blocchi nuovi (formato dettato da Blue): `#### Nome`,
la descrizione, le Sfere compagne a elenco (`pairings`) e gli Ambiti
consigliati (`scopes`). Un modulo generato, da non toccare a mano.
"""
import json
import re
import sys
import unicodedata
from pathlib import Path

CASA = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("../MAGHI M6")
MAGICK = CASA / "02_LIBRO/sorgenti/06_la_magick"
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "scripts/data/effetti.js"

SPHERES = {
    "Corrispondenza": "correspondence", "Entropia": "entropy", "Forza": "forces",
    "Vita": "life", "Materia": "matter", "Mente": "mind", "Primordio": "prime",
    "Spirito": "spirit", "Tempo": "time",
}
FILES = {
    "06_2_1_corrispondenza.md": "correspondence", "06_2_2_entropia.md": "entropy",
    "06_2_3_forza.md": "forces", "06_2_4_materia.md": "matter", "06_2_5_mente.md": "mind",
    "06_2_6_primordio.md": "prime", "06_2_7_spirito.md": "spirit", "06_2_8_tempo.md": "time",
    "06_2_9_vita.md": "life",
}
EXTRA = re.compile(r"\*\*(\+ )?(" + "|".join(SPHERES) + r") (●+)\*\*")
LEVEL_HEAD = re.compile(r"^\*\*(●+) ([^*]+)\*\*")


def slug(text):
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def plain(text):
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    return re.sub(r"\s+", " ", text).strip()


SPHERE_NAMES = {**SPHERES, "Forze": "forces"}
PAIRING = re.compile(r"^- \*\*\+ (" + "|".join(SPHERE_NAMES) + r")( \((?:obbligata|diretta)\))?:\*\*\s*(.*)$")
SCOPES_LINE = re.compile(r"^\*Ambiti consigliati:\*\s*(.*)$")
# La Formula (6/9, dal lavoro del ramo B): la parola universale che l'effetto
# incarna nella sua Sfera. Una riga sotto il nome, anche più Formule a virgola.
FORMULA_LINE = re.compile(r"^\*Formula:\*\s*(.*)$")
FORMULE_DOC = CASA / "01_DECISIONI/studi/formule_sfere.md"
FORMULA_HEAD = re.compile(r"^### (.+?) · (\d)\s*$")
FORMULA_BREVE = re.compile(r"^\*\*In breve\.\*\*\s*(.*)$")


def parse_formule(path):
    """Le 53 Formule del ramo B: nome, grado, glossa, e il soggetto per Sfera."""
    formule = []
    current = None
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        head = FORMULA_HEAD.match(line)
        if head:
            current = {"id": slug(head.group(1)), "name": head.group(1), "grade": int(head.group(2)), "text": "", "subjects": {}}
            formule.append(current)
            continue
        if current is None:
            continue
        breve = FORMULA_BREVE.match(line)
        if breve:
            current["text"] = plain(breve.group(1))
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")] if line.startswith("|") else []
        if len(cells) == 2 and cells[0] in SPHERES:
            current["subjects"][SPHERES[cells[0]]] = plain(cells[1])
    return formule


def parse(path, sphere):
    """Legge una tavola di Sfera in due formati: le tavole vecchie (una riga
    per effetto, «Come funziona» in una cella) e i blocchi nuovi (6/9,
    formato dettato da Blue: `#### Nome`, la descrizione, le Sfere compagne
    a elenco `- **+ Sfera:** …`, e `*Ambiti consigliati:* …`)."""
    entries = []
    level = 0
    section = None
    block = None

    def close():
        nonlocal block
        if block is None:
            return
        block["text"] = " ".join(block["text"]).strip()
        entries.append(block)
        block = None

    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if line.startswith("## "):
            close()
            title = line[3:]
            section = "effects" if title.startswith("Quanto vedi") or title.startswith("Gli effetti") else None
            continue
        if section != "effects":
            continue
        head = LEVEL_HEAD.match(line)
        if head:
            close()
            level = len(head.group(1))
            continue
        # I blocchi nuovi.
        if line.startswith("#### "):
            close()
            name = plain(line[5:])
            block = {
                "id": f"{sphere}-{level}-{slug(name)}",
                "name": name,
                "sphere": sphere,
                "level": level,
                "extras": [],
                "text": [],
                "pairings": [],
                "scopes": "",
                "formule": [],
            }
            continue
        if block is not None:
            pairing = PAIRING.match(line)
            scopes = SCOPES_LINE.match(line)
            formula = FORMULA_LINE.match(line)
            if formula:
                block["formule"] = [slug(part) for part in formula.group(1).split(",") if part.strip()]
            elif pairing:
                text = plain(pairing.group(3))
                extra_sphere = SPHERE_NAMES[pairing.group(1)]
                # «(diretta)» (6/9): la compagna che fa il lavoro diretto. Senza,
                # l'effetto riesce di lato e sale di un grado (regola del ponte).
                # Nei blocchi il livello non si scrive: basta averla.
                required = bool(pairing.group(2))
                block["pairings"].append({"sphere": extra_sphere, "text": text, "required": required})
                if required:
                    block["extras"].append({"sphere": extra_sphere, "level": 1, "required": True})
            elif scopes:
                # Gli Ambiti consigliati chiudono il blocco.
                block["scopes"] = plain(scopes.group(1))
                close()
            elif line.startswith("|") or line.startswith("<!--"):
                close()
            elif line:
                block["text"].append(plain(line))
            continue
        # Le tavole vecchie.
        if not line.startswith("|") or line.startswith("| Effetto") or line.startswith("| :--") or line.startswith("| Successi"):
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if len(cells) < 2 or level == 0 or cells[0].startswith("**"):
            continue
        name, how = cells[0], cells[1]
        extras = []
        for match in EXTRA.finditer(how):
            plus, extra_sphere, dots = match.groups()
            if not plus:
                continue
            required = how.startswith("**+")
            extras.append({"sphere": SPHERES[extra_sphere], "level": len(dots), "required": required})
        entries.append({
            "id": f"{sphere}-{level}-{slug(name)}",
            "name": plain(name),
            "sphere": sphere,
            "level": level,
            "extras": extras,
            "text": plain(how),
            "pairings": [],
            "scopes": "",
            "formule": [],
        })
    close()
    return entries


def main():
    effetti = []
    for filename, sphere in FILES.items():
        path = MAGICK / filename
        if not path.exists():
            raise SystemExit(f"Manca {path}")
        effetti.extend(parse(path, sphere))
    ids = [entry["id"] for entry in effetti]
    if len(ids) != len(set(ids)):
        dupes = sorted({i for i in ids if ids.count(i) > 1})
        raise SystemExit(f"Id doppi: {dupes}")
    formule = parse_formule(FORMULE_DOC) if FORMULE_DOC.exists() else []
    known = {f["id"] for f in formule}
    unknown = sorted({f for entry in effetti for f in entry["formule"] if f not in known})
    if unknown:
        raise SystemExit(f"Formule sconosciute: {unknown}")
    body = json.dumps(effetti, ensure_ascii=False, indent=2)
    body_formule = json.dumps(formule, ensure_ascii=False, indent=2)
    OUT.write_text(
        "// Generato da tools/build-effetti.py dalle nove tavole di Sfera del LIBRO (06_2_1 … 06_2_9): non toccare a mano.\n"
        "// Il Grimorio: gli effetti del manuale, Sfera per Sfera e livello per livello, con le Sfere in più che il testo chiede.\n"
        "// Le Formule (dal ramo B, 01_DECISIONI/studi/formule_sfere.md): le parole universali; ogni effetto ne porta una o più.\n\n"
        f"export const EFFETTI = Object.freeze({body});\n\n"
        f"export const FORMULE = Object.freeze({body_formule});\n",
        encoding="utf-8",
    )
    print(f"Formule: {len(formule)}; effetti senza Formula: {sum(1 for e in effetti if not e['formule'])}")
    per_sphere = {}
    for entry in effetti:
        per_sphere[entry["sphere"]] = per_sphere.get(entry["sphere"], 0) + 1
    print(f"Scritti {len(effetti)} effetti: {per_sphere}")


if __name__ == "__main__":
    main()
