#!/usr/bin/env python3
"""Costruisce i compendi degli archivi del Mago dalle sorgenti del LIBRO M5.

Uso: python3 tools/build-archivi.py "<cartella della casa MAGHI M5>"

Legge i Cataloghi (capitolo 08), i Concetti (05_011) e gli studi dei Credi
e scrive in packs/ un file .db (NeDB, una riga per documento) per archivio:
Pregi, Difetti, Background (Item feature), Credi, Concetti, Ambizioni,
Desideri, Ancore, Convinzioni (JournalEntry). Solo italiano.
"""
import hashlib
import html
import json
import re
import sys
from pathlib import Path

MODULE = "wod5e-mage"
CASA = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("../MAGHI M5")
CAT = CASA / "02_LIBRO/sorgenti/08_i_cataloghi"
PERS = CASA / "02_LIBRO/sorgenti/05_il_personaggio"
STUDI = CASA / "01_DECISIONI/studi"
OUT = Path(__file__).resolve().parent.parent / "packs"


# ---------------------------------------------------------------- markdown
def strip_comments(text):
    return re.sub(r"<!--.*?-->", "", text, flags=re.S)


def inline(text):
    text = html.escape(text, quote=False)
    text = re.sub(r"\[\[([^\]|]+)\|([^\]]+)\]\]", r"\2", text)
    text = re.sub(r"\[\[([^\]]+)\]\]", r"\1", text)
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?!\w)", r"<em>\1</em>", text)
    text = re.sub(r"(?<![\w_])_(?!\s)(.+?)(?<!\s)_(?!\w)", r"<em>\1</em>", text)
    text = text.replace("&lt;p class=&quot;lead&quot;&gt;", "").replace("&lt;/p&gt;", "")
    text = re.sub(r"&lt;p class=\"lead\"&gt;", "", text)
    return text


def md_to_html(md, drop_titles=True):
    """Un convertitore piccolo per la prosa dei Cataloghi."""
    md = strip_comments(md)
    md = re.sub(r"^---\n.*?\n---\n", "", md, flags=re.S)
    out, para, bullets, table = [], [], [], []

    def flush_para():
        if para:
            out.append("<p>" + inline(" ".join(s.strip() for s in para)) + "</p>")
            para.clear()

    def flush_bullets():
        if bullets:
            out.append("<ul>" + "".join(f"<li>{inline(b)}</li>" for b in bullets) + "</ul>")
            bullets.clear()

    def flush_table():
        if table:
            rows = [r for r in table if not re.match(r"^\|?\s*:?-{2,}", r)]
            cells = [[c.strip() for c in r.strip().strip("|").split("|")] for r in rows]
            cells = [c for c in cells if any(c)]
            if cells:
                head, body = cells[0], cells[1:]
                if not any(head):
                    head, body = None, cells
                h = "<table>"
                if head:
                    h += "<thead><tr>" + "".join(f"<th>{inline(c)}</th>" for c in head) + "</tr></thead>"
                h += "<tbody>" + "".join("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>" for r in body) + "</tbody></table>"
                out.append(h)
            table.clear()

    for raw in md.splitlines():
        line = raw.rstrip()
        if line.startswith("|"):
            flush_para(); flush_bullets(); table.append(line); continue
        flush_table()
        if not line.strip():
            flush_para(); flush_bullets(); continue
        if line.startswith("![") or line.startswith("<p class=\"lead\">") and False:
            continue
        if line.startswith("!["):
            continue
        m = re.match(r"^(#{1,6})\s+(.*)$", line)
        if m:
            flush_para(); flush_bullets()
            level = len(m.group(1))
            if level == 1 and drop_titles:
                continue
            tag = "h2" if level <= 2 else ("h3" if level == 3 else "h4")
            out.append(f"<{tag}>{inline(m.group(2))}</{tag}>")
            continue
        if re.match(r"^\s*[-*]\s+", line):
            flush_para()
            bullets.append(re.sub(r"^\s*[-*]\s+", "", line))
            continue
        if line.startswith(">"):
            flush_para(); flush_bullets()
            out.append(f"<blockquote>{inline(line.lstrip('> ').strip())}</blockquote>")
            continue
        if line.startswith("<p class=\"lead\">"):
            flush_para(); flush_bullets()
            body = re.sub(r"</?p[^>]*>", "", line)
            out.append(f"<p class=\"lead\"><em>{inline(body)}</em></p>")
            continue
        para.append(line)
    flush_para(); flush_bullets(); flush_table()
    return "".join(out)


def plain(md):
    """Il testo nudo di una cella: niente asterischi, niente tag."""
    t = re.sub(r"<[^>]+>", "", md)
    t = t.replace("**", "").replace("*", "").replace("_", "")
    return t.strip()


def doc_id(*parts):
    h = hashlib.sha1("|".join(parts).encode("utf-8")).hexdigest()
    return "".join(c for c in h if c.isalnum())[:16]


def section(md, title_regex):
    """Il corpo di una sezione ## … fino alla prossima ##."""
    m = re.search(r"^## " + title_regex + r"[^\n]*\n(.*?)(?=^## |\Z)", strip_comments(md), flags=re.S | re.M)
    return m.group(1) if m else ""


def read(path):
    return path.read_text(encoding="utf-8")


def title_of(md):
    m = re.search(r"^# (.+)$", strip_comments(md), flags=re.M)
    return m.group(1).strip() if m else ""


# ------------------------------------------------------------ documenti
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


def feature(name, content, featuretype, points, kind, group, sort, extra=None):
    flag = {"kind": kind, "group": group, "name": name, "points": points}
    if extra:
        flag.update(extra)
    return {
        "_id": doc_id(kind, group, name),
        "name": name,
        "type": "feature",
        "img": f"modules/{MODULE}/assets/icons/archivi/{kind}.svg",
        "system": {
            "description": content,
            "bonuses": [],
            "source": {"book": "M5 · I Cataloghi", "page": ""},
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
    path = OUT / f"{name}.db"
    with path.open("w", encoding="utf-8", newline="\n") as f:
        for d in docs:
            f.write(json.dumps(d, ensure_ascii=False) + "\n")
    print(f"{name}: {len(docs)} voci")


# -------------------------------------------------------- Pregi e Difetti
DOT = "•"


def parse_traits(path, group):
    """Le voci #### di un catalogo di Pregi o Difetti."""
    md = strip_comments(read(path))
    entries = []
    blocks = re.split(r"^#### ", md, flags=re.M)[1:]
    for block in blocks:
        head, _, body = block.partition("\n")
        head = head.strip()
        # Nome e costo: il costo è tutto ciò che contiene i pallini.
        m = re.match(r"^(.*?)\s*(?:·\s*(Pregio o Difetto))?\s*([•–/\s\d]*•[•–/\s\d]*)\s*$", head)
        if m:
            name, dual, cost = m.group(1).strip(" ·"), m.group(2), m.group(3).strip()
        else:
            name, dual, cost = head, None, ""
        first = re.split(r"[/–]", cost)[0] if cost else ""
        points = first.count(DOT) or 1
        body = re.split(r"^## ", body, flags=re.M)[0]
        content = ""
        if cost:
            content += f"<p><strong>Costo:</strong> {html.escape(cost)}</p>"
        content += md_to_html(body)
        entries.append({"name": name, "cost": cost, "points": points, "content": content, "dual": bool(dual), "group": group})
    return entries


def build_traits():
    pregi, difetti = [], []
    groups = [("060", "Fisici"), ("061", "Mentali"), ("062", "Sociali"), ("063", "Soprannaturali"), ("064", "Paradosso")]
    for code, group in groups:
        for p in sorted(CAT.glob(f"08_{code}_*.md")):
            pregi += parse_traits(p, group)
    groups = [("065", "Fisici"), ("066", "Mentali"), ("067", "Sociali"), ("068", "Soprannaturali"), ("069", "Paradosso")]
    for code, group in groups:
        for p in sorted(CAT.glob(f"08_{code}_*.md")):
            difetti += parse_traits(p, group)
    both = []
    for p in sorted(CAT.glob("08_070_*.md")):
        both += parse_traits(p, "Duali")
    for p in sorted(CAT.glob("08_071_*.md")):
        both += parse_traits(p, "Reinterpretabili")
    docs = []
    for i, e in enumerate(pregi + both):
        docs.append(feature(e["name"], e["content"], "merit", e["points"], "pregio", e["group"], i * 10, {"cost": e["cost"]}))
    write_pack("mage-pregi", docs)
    docs = []
    for i, e in enumerate(difetti + both):
        docs.append(feature(e["name"], e["content"], "flaw", e["points"], "difetto", e["group"], i * 10, {"cost": e["cost"]}))
    write_pack("mage-difetti", docs)


# ------------------------------------------------------------ Background
def build_backgrounds():
    docs = []
    for i, p in enumerate(sorted(CAT.glob("08_0[789][0-9]_bg_*.md"))):
        raw = read(p)
        name = title_of(raw)
        m = re.search(r"<!--canone:[^\n]*·\s*([^\n]*?)\s*-->", raw)
        cost = ""
        if m:
            c = re.search(r"([•–/\s]*•[•–/\s]*)\s*$", m.group(1))
            cost = c.group(1).strip() if c else ""
        content = ""
        if cost:
            content += f"<p><strong>Costo:</strong> {html.escape(cost)}</p>"
        content += md_to_html(raw)
        docs.append(feature(name, content, "background", 1, "background", "Background", i * 10, {"cost": cost}))
    write_pack("mage-background", docs)


# ------------------------------------------------------------------ Credi
CREDO_IDS = {
    "arte": "Tutto è Arte", "caos": "Tutto è Caos", "dati": "Tutto è Dati", "fede": "Tutto è Fede",
    "illusione": "Tutto è Illusione", "legge": "Tutto è Legge", "macchina": "Tutto è Macchina",
    "polvere": "Tutto è Polvere", "potere": "Tutto è Potere", "sacro": "Tutto è Sacro",
    "scienza": "Tutto è Scienza", "suono": "Tutto è Suono", "vivo": "Tutto è Vivo"
}


def credo_files():
    for credo_id in CREDO_IDS:
        p = STUDI / f"credo_tutto_e_{credo_id}.md"
        if p.exists():
            yield credo_id, read(p)


def table_rows(md_block):
    """Le righe | *Titolo* | testo | … di una tavola: liste di celle nude."""
    rows = []
    for line in md_block.splitlines():
        if not line.startswith("|") or re.match(r"^\|\s*:?-", line):
            continue
        cells = [plain(c) for c in line.strip().strip("|").split("|")]
        rows.append(cells)
    return rows


def build_credi():
    docs = []
    for i, (credo_id, raw) in enumerate(credo_files()):
        name = title_of(raw) or CREDO_IDS[credo_id]
        content = md_to_html(raw)
        docs.append(journal(name, content, "credo", "Credi", i * 10, {"credo": credo_id}))
    write_pack("mage-credi", docs)


# --------------------------------------------------------------- Concetti
def build_concetti():
    raw = strip_comments(read(next(PERS.glob("05_011_*.md"))))
    m = re.search(r"^\*Prendine.*?\n\n(.+?)\n\n", raw, flags=re.S | re.M)
    line = m.group(1) if m else ""
    items = [plain(s) for s in line.replace("\n", " ").split(" · ") if s.strip()]
    items = [s.rstrip(".") for s in items]
    docs = []
    for i, text in enumerate(items):
        content = f"<p>{html.escape(text, quote=False)}</p>"
        docs.append(journal(text, content, "concetto", "Concetti", i * 10, {"text": text}))
    write_pack("mage-concetti", docs)


# ------------------------------------------- Ambizioni, Desideri, Convinzioni
def catalogue_groups(md):
    """Le tavole #### Gruppo del catalogo: [(gruppo, [[celle], …]), …]."""
    md = strip_comments(md)
    m = re.search(r"^## Il catalogo.*?$", md, flags=re.M)
    if not m:
        return []
    body = md[m.end():]
    body = re.split(r"^## ", body, flags=re.M)[0]
    groups = []
    for block in re.split(r"^#### ", body, flags=re.M)[1:]:
        head, _, rest = block.partition("\n")
        groups.append((head.strip(), table_rows(rest)))
    return groups


def spunti(kind, file_glob, credo_section_title, journal_group_label):
    docs = []
    sort = 0
    raw = read(next(CAT.glob(file_glob)))
    for group, rows in catalogue_groups(raw):
        for title, text, *rest in [r for r in rows if len(r) >= 2 and r[0]]:
            if title.lower() in ("ambizione", "desiderio"):
                continue
            content = f"<p><em>{html.escape(title, quote=False)}</em></p><p>{html.escape(text, quote=False)}</p>"
            docs.append(journal(title, content, kind, group, sort, {"text": text, "title": title}))
            sort += 10
    for credo_id, credo_md in credo_files():
        block = section(credo_md, "Ambizioni e Desideri")
        for tab in re.split(r"\n\n(?=\|)", block):
            rows = table_rows(tab)
            if not rows or rows[0][0].lower() != credo_section_title.lower():
                continue
            for title, text, *rest in rows[1:]:
                if not title:
                    continue
                content = f"<p><em>{html.escape(title, quote=False)}</em></p><p>{html.escape(text, quote=False)}</p>"
                docs.append(journal(title, content, kind, CREDO_IDS[credo_id], sort, {"text": text, "title": title, "credo": credo_id}))
                sort += 10
    write_pack(f"mage-{journal_group_label}", docs)


def build_convinzioni():
    docs, sort = [], 0
    raw = read(next(CAT.glob("08_098_*.md")))
    for group, rows in catalogue_groups(raw):
        for text, gloss, *rest in [r for r in rows if len(r) >= 2 and r[0]]:
            if text.lower() == "convinzione":
                continue
            content = f"<p><em>{html.escape(text, quote=False)}</em></p><p>{html.escape(gloss, quote=False)}</p>"
            docs.append(journal(text, content, "convinzione", group, sort, {"text": text, "gloss": gloss}))
            sort += 10
    for credo_id, credo_md in credo_files():
        block = section(credo_md, "Le Convinzioni")
        rows = table_rows(block)
        for row in rows:
            if len(row) < 2 or not row[0] or row[0].lower() == "convinzione":
                continue
            text = row[0]
            serve = row[1] if len(row) > 1 else ""
            cross = row[2] if len(row) > 2 else ""
            content = f"<p><em>{html.escape(text, quote=False)}</em></p>"
            if cross:
                content += f"<p><strong>La servi quando</strong> {html.escape(serve, quote=False)}.</p><p><strong>La attraversi quando</strong> {html.escape(cross, quote=False)}.</p>"
            else:
                content += f"<p>{html.escape(serve, quote=False)}</p>"
            docs.append(journal(text, content, "convinzione", CREDO_IDS[credo_id], sort, {"text": text, "gloss": serve, "cross": cross, "credo": credo_id}))
            sort += 10
    write_pack("mage-convinzioni", docs)


def build_ancore():
    docs = []
    raw = strip_comments(read(next(CAT.glob("08_099_*.md"))))
    m = re.search(r"^## Il catalogo.*?$", raw, flags=re.M)
    rows = table_rows(raw[m.end():]) if m else []
    for i, row in enumerate(rows):
        if len(row) < 2 or not row[0] or row[0].lower().startswith("l'ancora"):
            continue
        name, text = row[0], row[1]
        content = f"<p><em>{html.escape(name, quote=False)}</em></p><p>{html.escape(text, quote=False)}</p>"
        docs.append(journal(name, content, "ancora", "Ancore", i * 10, {"text": name, "description": text}))
    write_pack("mage-ancore", docs)


if __name__ == "__main__":
    if not CAT.exists():
        sys.exit(f"Cartella dei Cataloghi non trovata: {CAT}")
    build_traits()
    build_backgrounds()
    build_credi()
    build_concetti()
    spunti("ambizione", "08_095_*.md", "Ambizioni", "ambizioni")
    spunti("desiderio", "08_096_*.md", "Desideri", "desideri")
    build_convinzioni()
    build_ancore()
