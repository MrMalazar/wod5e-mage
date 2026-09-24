#!/usr/bin/env python3
"""Costruisce i compendi dei Vantaggi (Pregi, Difetti, Background) dal catalogo aggiornato.

Uso: python3 tools/build-vantaggi.py [tools/dati/vantaggi.md]

Dal 24/9 il catalogo dei Vantaggi non è più quello del capitolo 08 del LIBRO:
è il file `tools/dati/vantaggi.md`, l'elenco riscritto coi verdetti di Blue
(dadi, soglia e vittoria automatica al posto dei modificatori vecchi). Le sue
tavole diventano i tre pack:

- mage-pregi: i Pregi, i duali e i reinterpretabili, e i Pregi abbinati ai Background;
- mage-difetti: i Difetti, i duali e i reinterpretabili, e i Difetti abbinati;
- mage-background: i Background, coi tipi degli Alleati e le domande della finestra.

Gli altri archivi (Credi, Concetti, Ancore, Condizioni, Strumenti…) restano a
build-archivi.py, che legge le sorgenti del LIBRO.
"""
import hashlib
import html
import json
import re
import sys
from pathlib import Path

MODULE = "wod5e-mage"
HERE = Path(__file__).resolve().parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else HERE / "dati" / "vantaggi.md"
OUT = HERE.parent / "packs"
DOT = "•"

# Le due domande della finestra «metti sulla scheda», una per Background
# (6/9, verdetto di Blue: «Chi o cosa» e «Tipo» non si capivano).
BG_PROMPTS = {
    "Alleati": ("Chi è", "Il nome della persona o del gruppo: Ludovica, il turno di notte al Niguarda", "Che tipo di alleato", "Se non è in tendina, scrivilo qui"),
    "Fama": ("Per cosa sei famoso", "Il campo: musica, cronaca nera, chirurgia", "Dove ti conoscono", "Il quartiere, la città, il settore"),
    "Influenza": ("L'ambito", "L'ufficio, l'istituzione o il settore: un commissariato, un assessorato, una multinazionale", "Come ci arrivi", "Il ruolo o la persona che ti dà peso lì"),
    "Rifugio": ("Dov'è", "Il posto: il seminterrato in via Padova, la baita sopra il lago", "Cos'è", "Un appartamento, un'officina, una barca"),
    "Risorse": ("Da dove vengono", "Lo stipendio, l'eredità, il giro d'affari", "Come si vedono", "La casa, l'auto, i vestiti"),
    "Arcano": ("Come ti dimenticano", "Il volto che non resta, il nome che sbagliano, la foto che viene mossa", "Cosa resta di te", "Quel che, nonostante tutto, la gente ricorda"),
    "Biblioteca": ("Cosa contiene", "Grimori, tesi non pubblicate, hard disk cifrati, registrazioni", "Dove sta", "La stanza, il server, la cassetta di sicurezza"),
    "Congegni e Meraviglie": ("L'oggetto", "Cos'è e cosa fa", "Da dove viene", "Costruito da te, ereditato, rubato"),
    "Culto": ("Chi ti venera", "Il gruppo: quanti sono e dove si riuniscono", "Cosa credono che tu sia", "Il santo, il profeta, l'alieno, il guaritore"),
    "Destino": ("Cosa pende su di te", "La profezia, il ruolo, l'appuntamento, per quel che ne sai", "Chi te l'ha detto", "La voce nel sogno, la vecchia del mercato, il tuo Mentore"),
    "Famiglio": ("La creatura", "Il nome e la forma", "Cosa sa fare", "Il suo talento: vede, porta, avverte"),
    "Il Sogno": ("A cosa attingi", "L'archetipo o la vita che sogni: il chirurgo, il pilota, il ladro", "Come arriva", "Nel sonno, in trance, con un rito"),
    "Maschera": ("Chi diventi", "Il nome dell'altra identità", "Cosa la regge", "I documenti, un lavoro, una casa"),
    "Nodo": ("Dov'è il Nodo", "Il luogo: la sorgente, la cripta, il server", "Con chi lo dividi", "Solo tuo, con la Cabala, con la setta"),
    "Potenziamento": ("L'innesto", "Cos'è e dov'è nel corpo", "Chi te l'ha messo", "La clinica, la Convenzione, tu stesso"),
    "Santuario": ("Dov'è", "Il luogo e i suoi confini", "La vocazione", "Magick oppure Tecnomagick"),
    "Status": ("In quale società", "La Tradizione e la città", "Il titolo", "Come ti chiamano lì"),
}
BG_TYPES = {"Santuario": ["Magick", "Tecnomagick"]}

# L'icona dei Pregi e dei Difetti dice il gruppo: fisici, mentali, sociali,
# soprannaturali (Paradosso, Duali, Reinterpretabili e abbinati stanno coi soprannaturali,
# salvo gli abbinati dei Background che può avere chiunque, che sono sociali).
GROUP_ICONS = {"Fisici": "fisici", "Mentali": "mentali", "Sociali": "sociali"}
BG_DORMIENTE = {"Alleati", "Fama", "Influenza", "Rifugio", "Risorse"}


# ---------------------------------------------------------------- utilità
def doc_id(*parts):
    h = hashlib.sha1("|".join(parts).encode("utf-8")).hexdigest()
    return "".join(c for c in h if c.isalnum())[:16]


def slug(text):
    t = text.lower()
    for a, b in (("à", "a"), ("è", "e"), ("é", "e"), ("ì", "i"), ("ò", "o"), ("ù", "u")):
        t = t.replace(a, b)
    return re.sub(r"[^a-z0-9]+", "-", t).strip("-")


def inline(text):
    text = html.escape(text, quote=False)
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    return text


def cell_html(text):
    """Una cella del catalogo: le righe a capo (<br>) diventano paragrafi, quelle coi pallini in testa una lista."""
    out, bullets = [], []

    def flush():
        if bullets:
            out.append("<ul>" + "".join(f"<li>{b}</li>" for b in bullets) + "</ul>")
            bullets.clear()

    for line in text.split("<br>"):
        line = line.strip()
        if not line:
            continue
        if line.startswith(DOT):
            m = re.match(r"^(•+)\s*(.*)$", line)
            bullets.append(f"<strong>{m.group(1)}</strong> {inline(m.group(2))}")
        else:
            flush()
            out.append(f"<p>{inline(line)}</p>")
    flush()
    return "".join(out)


def plain(text):
    t = re.sub(r"<[^>]+>", " ", text.replace("<br>", " "))
    return re.sub(r"\s+", " ", t.replace("**", "")).strip()


def points_of(cost):
    """Il primo gradino della scala: «• / •••» vale 1, «•••–•••••» vale 3, «da fissare» vale 1."""
    first = re.split(r"[/–]", cost)[0] if cost else ""
    return first.count(DOT) or 1


def name_of(cell):
    m = re.match(r"^\*\*(.+?)\*\*", cell.strip())
    return m.group(1).strip() if m else plain(cell)


# ---------------------------------------------------------------- lettura
def read_tables(md):
    """Ogni tavola del file con la sua sezione (##), il gruppo (###) e la famiglia (####)."""
    tables, current, head = [], None, None
    section = group = family = ""
    for raw in md.splitlines():
        line = raw.rstrip()
        if line.startswith("## "):
            section, group, family = line[3:].strip(), "", ""
        elif line.startswith("### "):
            group, family = line[4:].strip(), ""
        elif line.startswith("#### "):
            family = line[5:].strip()
        if line.startswith("|"):
            if re.match(r"^\|\s*:?-", line):
                continue
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            if current is None:
                head = cells
                current = {"section": section, "group": group, "family": family, "head": head, "rows": []}
                tables.append(current)
            else:
                current["rows"].append(dict(zip(head, cells)))
        else:
            current = None
    return tables


def feature(name, content, featuretype, points, kind, group, sort, icon, extra=None):
    flag = {"kind": kind, "group": group, "name": name, "points": points}
    if extra:
        flag.update(extra)
    return {
        "_id": doc_id(kind, group, name),
        "name": name,
        "type": "feature",
        "img": f"modules/{MODULE}/assets/icons/archivi/{icon}.svg",
        "system": {
            "description": content,
            "bonuses": [],
            "source": {"book": "M6 · I Vantaggi", "page": ""},
            "points": points,
            "featuretype": featuretype
        },
        "effects": [],
        "folder": None,
        "sort": sort,
        "ownership": {"default": 0},
        "flags": {MODULE: {"archivio": flag}}
    }


def write_pack(name, docs):
    OUT.mkdir(exist_ok=True)
    ids = set()
    for d in docs:
        if d["_id"] in ids:
            sys.exit(f"{name}: id doppio per {d['name']}")
        ids.add(d["_id"])
    with (OUT / f"{name}.db").open("w", encoding="utf-8", newline="\n") as f:
        for d in docs:
            f.write(json.dumps(d, ensure_ascii=False) + "\n")
    print(f"{name}: {len(docs)} voci")


# ------------------------------------------------------------ costruzione
def trait_docs(rows, kind, group, family, sort_from, cost_key="Costo"):
    """Le righe di una tavola di Pregi o Difetti come documenti del pack."""
    docs = []
    for i, row in enumerate(rows):
        name = name_of(next(iter(row.values())))
        cost = plain(row.get(cost_key, ""))
        content = ""
        if cost:
            content += f"<p><strong>Costo:</strong> {html.escape(cost)}</p>"
        content += cell_html(row.get("Cosa fa", ""))
        icon = f"{kind}-{GROUP_ICONS.get(group, 'soprannaturali')}"
        extra = {"cost": cost}
        if family:
            extra["family"] = family
        featuretype = "merit" if kind == "pregio" else "flaw"
        docs.append(feature(name, content, featuretype, points_of(cost), kind, group, sort_from + i * 10, icon, extra))
    return docs


def build(md):
    tables = read_tables(md)
    pregi, difetti, backgrounds = [], [], []
    alleati_rows = []

    for t in tables:
        sec, group, family, head, rows = t["section"], t["group"], t["family"], t["head"], t["rows"]
        if sec == "Background" and head[0] == "Tipo":
            alleati_rows = rows
        elif sec == "Background" and head[0] == "Background":
            backgrounds += rows
        elif sec == "Pregi" and head[0] == "Pregio":
            pregi += trait_docs(rows, "pregio", group, family, len(pregi) * 10)
        elif sec == "Difetti" and head[0] == "Difetto":
            for row in rows:
                # «Setta Compatibile / Setta Divergente» è un pregio e un difetto: due voci.
                if name_of(row["Difetto"]).startswith("Setta Compatibile"):
                    testo = row["Cosa fa"]
                    comp = re.sub(r"<br>Divergente:.*?(?=<br>|$)", "", testo)
                    div = re.sub(r"<br>Compatibile:.*?(?=<br>|$)", "", testo)
                    pregi += trait_docs([{"Pregio": "**Setta Compatibile**", "Costo": "•", "Cosa fa": comp}], "pregio", "Soprannaturali", family, len(pregi) * 10)
                    difetti += trait_docs([{"Difetto": "**Setta Divergente**", "Costo": "•", "Cosa fa": div}], "difetto", group, family, len(difetti) * 10)
                else:
                    difetti += trait_docs([row], "difetto", group, family, len(difetti) * 10)
        elif sec in ("Duali", "Reinterpretabili") and head[0] == "Tratto":
            pregi += trait_docs(rows, "pregio", sec, "", len(pregi) * 10)
            difetti += trait_docs(rows, "difetto", sec, "", len(difetti) * 10)
        elif sec == "Abbinati" and head[0] == "Voce":
            for row in rows:
                cost = plain(row["Costo"])
                if cost.startswith("sospeso"):
                    continue
                kind = "pregio" if cost.startswith("pregio") else "difetto"
                cost = re.sub(r"^(pregio|difetto)\s*", "", cost)
                requires = plain(row["Con"])
                bg = re.sub(r"^rovescio di\s+", "", requires)
                bg = re.sub(r"\s*\(.*\)$", "", bg)
                sociale = bg.split(" o ")[0] in BG_DORMIENTE
                icon = f"{kind}-{'sociali' if sociale else 'soprannaturali'}"
                content = f"<p><strong>Costo:</strong> {html.escape(cost)}</p>" if cost else ""
                content += f"<p><strong>Con:</strong> {html.escape(requires)}</p>" + cell_html(row["Cosa fa"])
                name = name_of(row["Voce"])
                target = pregi if kind == "pregio" else difetti
                target.append(feature(name, content, "merit" if kind == "pregio" else "flaw", points_of(cost), kind, "Abbinati", len(target) * 10, icon, {"cost": cost, "requires": requires}))

    # I Background: la scala e il testo, più i tipi degli Alleati e le domande della finestra.
    docs = []
    for i, row in enumerate(backgrounds):
        name = name_of(row["Background"])
        scala = row.get("Scala", "")
        cosa = row.get("Cosa fa", "")
        content = cell_html(cosa)
        if scala:
            content = "<h4>Scala</h4>" + cell_html(scala) + "<h4>In gioco</h4>" + content
        types = []
        if name == "Alleati" and alleati_rows:
            types = [name_of(r["Tipo"]) for r in alleati_rows]
            content += "<h4>I tipi</h4><table><thead><tr><th>Tipo</th><th>Scala</th><th>Cosa fa</th><th>In cambio</th></tr></thead><tbody>"
            for r in alleati_rows:
                content += "<tr>" + "".join(f"<td>{cell_html(r[k])}</td>" for k in ("Tipo", "Scala", "Cosa fa", "In cambio")) + "</tr>"
            content += "</tbody></table>"
        if name in BG_TYPES:
            types = BG_TYPES[name]
        lead = plain(cosa).split(". ")[0].rstrip(".") + "."
        who, who_hint, kind, kind_hint = BG_PROMPTS.get(name, ("", "", "", ""))
        prompts = {"who": who, "whoHint": who_hint, "type": kind, "typeHint": kind_hint}
        docs.append(feature(name, content, "background", 1, "background", "Background", i * 10, f"bg-{slug(name)}",
                            {"cost": "•–•••••", "lead": lead, "types": types, "prompts": prompts}))
    return pregi, difetti, docs


if __name__ == "__main__":
    if not SRC.exists():
        sys.exit(f"Catalogo non trovato: {SRC}")
    pregi, difetti, backgrounds = build(SRC.read_text(encoding="utf-8"))
    if len(backgrounds) != 17:
        sys.exit(f"Background: attesi 17, trovati {len(backgrounds)}")
    write_pack("mage-pregi", pregi)
    write_pack("mage-difetti", difetti)
    write_pack("mage-background", backgrounds)
