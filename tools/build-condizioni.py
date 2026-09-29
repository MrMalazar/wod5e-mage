#!/usr/bin/env python3
"""Le Condizioni di M6 dalla guida per il Narratore (la regola di base del
29/9/2026, verdetto di Blue), copiata in tools/dati/condizioni.md.

Uso: python3 tools/build-condizioni.py [percorso della guida]

Scrive:
- scripts/data/condizioni.js  le famiglie, le scale e le Condizioni, coi
                              gradi, i tipi di tiro e il peso di ognuna
- packs/mage-condizioni.db    le stesse come oggetti «condition» del sistema

Le regole che il modulo applica da qui:
- grado 1: −2 dadi; grado 2: −2 dadi e difficoltà 8; grado 3: il tiro
  fallisce; solo sui tipi di tiro della scala (la riga «Tiri» della guida);
- i sinonimi del grado 3 (la tavola dei Sinonimi) falliscono sui tiri loro;
- i lievi tolgono un dado ciascuno sui tiri del loro tipo;
- il Controllo non tocca i dadi: toglie le scelte;
- l'icona è quella della famiglia (Corpo, Sensi, Mente, Soprannaturale)
  col grado in numeri romani (Blue, 29/9).

Dal 29/9 tools/build-archivi.py non scrive più le Condizioni.
"""
import hashlib
import html
import json
import re
import sys
from pathlib import Path

MODULE = "wod5e-mage"
ROOT = Path(__file__).resolve().parent.parent
SORGENTE = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "tools" / "dati" / "condizioni.md"
DATI_JS = ROOT / "scripts" / "data" / "condizioni.js"
PACK = ROOT / "packs" / "mage-condizioni.db"
ICONE = f"modules/{MODULE}/assets/icons/condizioni"

FAMIGLIE = [("sensi", "Sensi"), ("corpo", "Corpo"), ("mente", "Mente"), ("soprannaturale", "Soprannaturale")]
FAMIGLIA_ID = {label: fid for fid, label in FAMIGLIE}
TUTTI = ["physical", "social", "mental"]
RADICI = (("fisic", "physical"), ("social", "social"), ("mental", "mental"))
ROMANI = {1: "I", 2: "II", 3: "III"}
PESO_DEL_GRADO = {1: "meno2", 2: "otto", 3: "fallisce"}

# La Sventura aspetta di essere riscritta (lo dice la guida): intanto restano
# le due voci della bozza del 4/9, senza dadi.
SVENTURA = [
    ("Sfortunato", "Il caso ti gira contro.", "Il tuo critico non scatta."),
    ("Maledetto", "Le ferite non si chiudono.", "Non guarisci in nessun modo, né col riposo né con le cure né con la Magick, finché la causa resta."),
]


def doc_id(*parts):
    h = hashlib.sha1("|".join(parts).encode("utf-8")).hexdigest()
    return "".join(c for c in h if c.isalnum())[:16]


def slug(text):
    t = text.lower()
    for a, b in (("à", "a"), ("è", "e"), ("é", "e"), ("ì", "i"), ("ò", "o"), ("ù", "u")):
        t = t.replace(a, b)
    return re.sub(r"[^a-z0-9]+", "-", t).strip("-")


def nudo(text):
    """Il testo senza grassetti né corsivi."""
    return re.sub(r"\*\*(.+?)\*\*", r"\1", str(text)).strip()


def nome_e_proposta(cell):
    """«Rauco*» è un nome proposto: torna il nome pulito e se ha l'asterisco."""
    name = nudo(cell)
    proposed = name.endswith("*")
    return name.rstrip("*").strip(), proposed


def maiuscola(text):
    text = text.strip()
    return text[:1].upper() + text[1:] if text else text


def punto(text):
    text = text.strip()
    return text if not text or text.endswith((".", "!", "?")) else f"{text}."


def tipi_di(text):
    """I tipi di tiro nominati in un testo: fisici, sociali, mentali, tutti, nessuno."""
    t = text.lower()
    if re.search(r"\bnessun", t):
        return []
    if re.search(r"\btutti\b", t):
        return list(TUTTI)
    return [code for radice, code in RADICI if radice in t]


def righe(block):
    """Le righe di una tavola, celle nude, senza la testa e il separatore."""
    out = []
    for line in block.splitlines():
        if not line.startswith("|") or re.match(r"^\|\s*:?-", line):
            continue
        out.append([c.strip() for c in line.strip().strip("|").split("|")])
    return out[1:]


def html_voce(entry):
    """La descrizione dell'oggetto: scala e grado, com'è, cosa fa, da cosa nasce."""
    testa = entry["scaleLabel"] + (f" {entry['numeral']}" if entry["numeral"] else "")
    parti = [f"<p><strong>{html.escape(testa, quote=False)}</strong> · {html.escape(entry['familyLabel'], quote=False)}</p>"]
    if entry["what"]:
        parti.append(f"<p><em>{html.escape(entry['what'], quote=False)}</em></p>")
    parti.append(f"<p>{html.escape(punto(maiuscola(entry['effect'])), quote=False)}</p>")
    if entry["intro"]:
        parti.append(f"<p>{html.escape(entry['intro'], quote=False)}</p>")
    return "".join(parti)


def bonus_di(entry):
    """I dadi tolti nei «modificatori» del sistema: −2 ai gradi 1 e 2, −1 ai lievi."""
    value = {"meno2": "-2", "otto": "-2", "lieve": "-1"}.get(entry["weight"])
    if not value or not entry["tipi"]:
        return []
    return [{"source": entry["name"], "value": value, "paths": list(entry["tipi"]), "displayWhenInactive": False,
             "activeWhen": {"check": "always", "path": "", "value": ""}}]


def icona(family, grade):
    return f"{ICONE}/{family}-{grade}.svg" if grade in ROMANI else f"{ICONE}/{family}.svg"


def voce(name, proposed, *, family, scale, scale_label, grade, weight, tipi, tiri_text, what, effect, intro="", section="scala"):
    label = dict(FAMIGLIE)[family]
    entry = {
        "id": slug(name),
        "name": name,
        "proposed": proposed,
        "family": family,
        "familyLabel": label,
        "scale": scale,
        "scaleLabel": scale_label,
        "section": section,
        "grade": grade,
        "numeral": ROMANI.get(grade, ""),
        "weight": weight,
        "tipi": tipi,
        "tiriText": tiri_text,
        "what": what,
        "effect": effect,
        "intro": intro,
        "icon": icona(family, grade),
        "familyIcon": icona(family, 0),
    }
    entry["description"] = html_voce(entry)
    entry["bonuses"] = bonus_di(entry)
    return entry


def effetto_grado(weight, tiri_text):
    if weight == "meno2":
        return f"−2 dadi sui tiri {tiri_text}"
    if weight == "otto":
        return f"−2 dadi e difficoltà 8 sui tiri {tiri_text}"
    if weight == "fallisce":
        return f"falliscono i tiri {tiri_text}"
    return tiri_text


def main():
    raw = SORGENTE.read_text(encoding="utf-8")
    raw = re.sub(r"^---\n.*?\n---\n", "", raw, count=1, flags=re.S)
    prima, _, elenco = raw.partition("\n# Elenco")
    if not elenco:
        sys.exit("Nella guida manca la parte «# Elenco».")

    # I sinonimi del grado 3: chi fallisce su quali tiri.
    m = re.search(r"^## Sinonimi\n(.*?)(?=^## )", prima, flags=re.S | re.M)
    sinonimi = {nudo(r[0]): nudo(r[1]) for r in righe(m.group(1))} if m else {}
    if not sinonimi:
        sys.exit("Nella guida manca la tavola dei Sinonimi.")

    voci, scale = [], []
    for fm in re.finditer(r"^## (.+?)\n(.*?)(?=^## |\Z)", elenco, flags=re.S | re.M):
        titolo, corpo = fm.group(1).strip(), fm.group(2)
        if titolo in FAMIGLIA_ID:
            family = FAMIGLIA_ID[titolo]
            for sm in re.finditer(r"^### (.+?)\n(.*?)(?=^### |\Z)", corpo, flags=re.S | re.M):
                scale_label, testo = sm.group(1).strip(), sm.group(2)
                scale_id = slug(scale_label)
                intro = next((p.strip() for p in testo.split("\n\n") if p.strip().startswith("Nasce")), "")
                tm = re.search(r"^\*\*Tiri:\*\*\s*(.+)$", testo, flags=re.M)
                tiri_riga = tm.group(1).strip() if tm else ""
                tiri_text = re.split(r"\.\s", tiri_riga + " ", maxsplit=1)[0].strip().rstrip(".")
                fermi = set(re.findall(r"Da (\w+) non agisci", tiri_riga))
                tipi = tipi_di(tiri_text)
                scale.append({"id": scale_id, "label": scale_label, "family": family, "intro": intro, "tiri": tiri_riga})
                tavola = re.search(r"^\| Grado \| Condizione \|.*?(?:\n\|.*)+", testo, flags=re.M)
                if tavola:
                    for row in righe(tavola.group(0)):
                        grade = int(nudo(row[0]))
                        name, proposed = nome_e_proposta(row[1])
                        what = nudo(row[2])
                        if scale_id == "controllo":
                            weight, voce_tipi, effect = "scelte", [], "nessun dado: toglie le scelte"
                        elif grade == 3 and name in sinonimi:
                            weight, voce_tipi = "fallisce", tipi_di(sinonimi[name])
                            effect = f"falliscono {sinonimi[name]}"
                        elif grade == 3 and name in fermi:
                            weight, voce_tipi, effect = "fallisce", list(TUTTI), "non agisci: falliscono tutti i tiri"
                        else:
                            weight, voce_tipi = PESO_DEL_GRADO[grade], list(tipi)
                            effect = effetto_grado(weight, tiri_text)
                        voci.append(voce(name, proposed, family=family, scale=scale_id, scale_label=scale_label, grade=grade,
                                         weight=weight, tipi=voce_tipi, tiri_text=tiri_text, what=what, effect=effect, intro=intro))
                else:
                    # Rotto: una voce sola, fuori dalle scale, col peso del grado 3.
                    rm = re.search(r"^\*\*(\w+)\.\*\*\s*(.+)$", testo, flags=re.M)
                    if not rm:
                        sys.exit(f"Scala senza tavola e senza voce: {scale_label}")
                    name, what = rm.group(1), rm.group(2).strip()
                    effect = f"falliscono {sinonimi.get(name, tiri_text)}"
                    voci.append(voce(name, False, family=family, scale=scale_id, scale_label=scale_label, grade=3,
                                     weight="fallisce", tipi=tipi_di(sinonimi.get(name, tiri_text)), tiri_text=tiri_text,
                                     what=what, effect=effect, intro=intro, section="sola"))
            if family == "soprannaturale" and re.search(r"Sventura", corpo):
                scale.append({"id": "sventura", "label": "Sventura", "family": family, "intro": "", "tiri": ""})
                for name, what, effect in SVENTURA:
                    voci.append(voce(name, False, family=family, scale="sventura", scale_label="Sventura", grade=0,
                                     weight="nessuno", tipi=[], tiri_text="", what=what, effect=effect, section="da-riscrivere"))
        elif titolo == "Lievi":
            scale.append({"id": "lievi", "label": "Lievi", "family": "", "intro": "", "tiri": ""})
            for row in righe(corpo):
                name, proposed = nome_e_proposta(row[0])
                tipi = tipi_di(row[1])
                family = "corpo" if tipi == ["physical"] else "mente"
                voci.append(voce(name, proposed, family=family, scale="lievi", scale_label="Lievi", grade=0, weight="lieve",
                                 tipi=tipi, tiri_text=nudo(row[1]), what=punto(maiuscola(nudo(row[2]))),
                                 effect=f"−1 dado sui tiri {nudo(row[1])}", section="lievi"))
        elif titolo == "Scontro":
            scale.append({"id": "scontro", "label": "Scontro", "family": "", "intro": "", "tiri": ""})
            coda = next((p.strip() for p in corpo.split("\n\n") if p.strip() and not p.strip().startswith("|")), "")
            for row in righe(corpo):
                effetto, tiri_cell, finisce = nudo(row[2]), nudo(row[1]), nudo(row[3])
                if effetto == "−1":
                    weight, text = "lieve", f"−1 dado sui tiri {tiri_cell}"
                elif effetto == "falliscono":
                    weight, text = "fallisce", f"falliscono {tiri_cell}"
                elif "azione" in effetto:
                    weight, text = "azione", effetto
                else:
                    weight, text = "nessuno", effetto
                tipi = tipi_di(tiri_cell) if weight in ("lieve", "fallisce") else []
                for pezzo in nudo(row[0]).split(","):
                    name, proposed = nome_e_proposta(pezzo)
                    effect = f"{text}; finisce {finisce}"
                    if name == "Stordito" and coda:
                        # «Stordito ha la sua via d'uscita: invece di perdere l'azione…»: resta la regola.
                        effect = f"{effect}. {maiuscola(nudo(coda).split(': ', 1)[-1])}"
                    voci.append(voce(name, proposed, family="corpo", scale="scontro", scale_label="Scontro", grade=0,
                                     weight=weight, tipi=tipi, tiri_text=tiri_cell, what="", effect=effect, section="scontro"))

    ids = [v["id"] for v in voci]
    doppi = sorted({i for i in ids if ids.count(i) > 1})
    if doppi:
        sys.exit(f"Condizioni doppie: {', '.join(doppi)}")

    famiglie = [{"id": fid, "label": label, "icon": icona(fid, 0)} for fid, label in FAMIGLIE]
    testa = (
        "// Generato da tools/build-condizioni.py dalla guida del Narratore (tools/dati/condizioni.md,\n"
        "// la regola di base del 29/9/2026): non toccare a mano.\n"
        "// Ogni Condizione ha famiglia, scala, grado (1, 2, 3; 0 per lievi, scontro e Sventura), i tipi di\n"
        "// tiro su cui pesa (physical, social, mental) e il peso: meno2 (−2 dadi), otto (−2 dadi e difficoltà 8),\n"
        "// fallisce (il tiro fallisce), lieve (−1 dado), scelte (il Controllo: nessun dado), azione, nessuno.\n\n"
    )
    DATI_JS.write_text(
        testa
        + f"export const FAMIGLIE_CONDIZIONI = Object.freeze({json.dumps(famiglie, ensure_ascii=False, indent=2)});\n\n"
        + f"export const SCALE_CONDIZIONI = Object.freeze({json.dumps(scale, ensure_ascii=False, indent=2)});\n\n"
        + f"export const CONDIZIONI = Object.freeze({json.dumps(voci, ensure_ascii=False, indent=2)});\n",
        encoding="utf-8", newline="\n")

    docs = []
    for sort, entry in enumerate(voci):
        gruppo = {"lievi": "Lievi", "scontro": "Scontro"}.get(entry["section"], entry["familyLabel"])
        docs.append({
            "_id": doc_id("condizione", entry["family"], entry["name"]),
            "name": entry["name"],
            "type": "condition",
            "img": entry["icon"],
            "system": {"description": entry["description"], "bonuses": entry["bonuses"],
                       "source": {"book": "M6 · Le Condizioni", "page": ""}, "effects": {}, "suppressed": False},
            "effects": [], "folder": None, "sort": sort * 10, "ownership": {"default": 0},
            "flags": {MODULE: {"condizione": entry["id"],
                               "archivio": {"kind": "condizione", "group": gruppo, "name": entry["name"],
                                            "text": entry["what"], "description": punto(maiuscola(entry["effect"]))}}}
        })
    with PACK.open("w", encoding="utf-8", newline="\n") as f:
        for d in docs:
            f.write(json.dumps(d, ensure_ascii=False) + "\n")
    print(f"condizioni.js: {len(voci)} voci, {len(scale)} scale · mage-condizioni: {len(docs)} voci")


if __name__ == "__main__":
    main()
