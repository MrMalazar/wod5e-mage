#!/usr/bin/env python3
"""Costruisce il compendio dell'Equipaggiamento dalla lista di Blue.

Uso: python3 tools/build-equipaggiamento.py [tools/dati/equipaggiamento.md]

La lista (25/9) è il file `tools/dati/equipaggiamento.md`: le regole in testa,
la legenda della Rarità e una tavola sola, «## Lista», con le colonne Oggetto,
Tipo, Cosa fa, Usi, Rarità, Background. Ogni riga diventa un oggetto del pack
`mage-equipaggiamento`, del tipo che il sistema wod5e conosce:

- arma (weapon): Mischia e Improvvisata in mischia, Distanza e Speciale a
  distanza; il danno è il primo «danno N» della riga (0 se non ce n'è), e
  «Aggravati» accende la spunta dell'Aggravato (Blue, 25/9: «personalizzabile
  il danno con una spunta»); la Portata va nei dettagli in riga;
- armatura (armor): Protezione e Protezione mentale; i punti sono il numero
  davanti a «punti armatura», e il pieno si ricorda per il tasto che li rimette;
- oggetto (gear): tutto il resto.

Gli usi diventano gli usi del sistema; Rarità e Grado stanno nel flag
dell'archivio, e il Grado si legge accanto al nome nella finestra.
"""
import hashlib
import html
import json
import re
import sys
from pathlib import Path

MODULE = "wod5e-mage"
HERE = Path(__file__).resolve().parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else HERE / "dati" / "equipaggiamento.md"
OUT = HERE.parent / "packs"
PACK = "mage-equipaggiamento"
IMG = "systems/wod5e/assets/icons/items/item-default.svg"
SOURCE = {"book": "M6 · L'equipaggiamento", "page": ""}

# Il Tipo della lista porta al tipo di oggetto del sistema (e, per le armi, al tipo d'arma).
WEAPONS = {"Mischia": "melee", "Improvvisata": "melee", "Distanza": "ranged", "Speciale": "ranged"}
ARMORS = {"Protezione": "fisica", "Protezione mentale": "mentale"}
GEAR = {
    "Proiettili", "Cura", "Cura della mente", "Droga", "Attrezzo", "Sensi", "Sorveglianza",
    "Comunicazione", "Movimento", "Contenimento", "Documenti", "Servizio", "Trama"
}
KIND = {"weapon": "equip-weapon", "armor": "equip-armor", "gear": "equip-gear"}

# Le parole della Portata, dalla tavola degli Ambiti.
PORTATE = ["A contatto", "Due passi", "La stanza", "Un tiro di pistola", "La strada",
           "Un tiro di fucile", "Un tiro lungo", "Un cecchino"]
PORTATA = re.compile(r"portata (" + "|".join(re.escape(p) for p in PORTATE) + r")")
DANNO = re.compile(r"\bdanno (\d+)( Aggravati)?")
PUNTI = re.compile(r"\b(\d+) punt[oi] armatura")


def doc_id(*parts):
    h = hashlib.sha1("|".join(parts).encode("utf-8")).hexdigest()
    return "".join(c for c in h if c.isalnum())[:16]


def read_rows(md):
    """Le righe della tavola sotto «## Lista», come dizionari."""
    rows, head, inside = [], None, False
    for raw in md.splitlines():
        line = raw.rstrip()
        if line.startswith("## "):
            inside = line[3:].strip() == "Lista"
            head = None
            continue
        if not inside or not line.startswith("|"):
            continue
        if re.match(r"^\|\s*:?-", line):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if head is None:
            head = cells
            continue
        if len(cells) != len(head):
            sys.exit(f"Riga con {len(cells)} celle invece di {len(head)}: {line[:80]}")
        rows.append(dict(zip(head, cells)))
    return rows


def grade(cell):
    m = re.match(r"^Grado (\d)$", cell)
    if m:
        return int(m.group(1))
    if cell in ("nessuno", ""):
        return 0
    sys.exit(f"Background non letto: «{cell}»")


def uses(cell):
    if not cell:
        return None
    if not cell.isdigit():
        sys.exit(f"Usi non letti: «{cell}»")
    return int(cell)


def sentence(text):
    text = text.strip()
    return (text[:1].upper() + text[1:]) if text else text


def description(row, tipo, rarita, grado, n_usi, kind):
    parts = [f"<p>{html.escape(sentence(row['Cosa fa']), quote=False)}.</p>"]
    if kind == "armor":
        parts.append("<p>Ogni colpo che assorbe le toglie 1 punto.</p>")
    meta = [f"<strong>Tipo</strong> {html.escape(tipo)}"]
    if rarita:
        meta.append(f"<strong>Rarità</strong> {html.escape(rarita)}")
    meta.append(f"<strong>Background</strong> {'Grado ' + str(grado) if grado else 'nessuno'}")
    if n_usi:
        meta.append(f"<strong>Usi</strong> {n_usi}")
    parts.append("<p>" + " · ".join(meta) + "</p>")
    return "".join(parts)


def build(md):
    docs, ids = [], set()
    for i, row in enumerate(read_rows(md)):
        name, tipo, cosa = row["Oggetto"], row["Tipo"], row["Cosa fa"]
        rarita, grado, n_usi = row["Rarità"], grade(row["Background"]), uses(row["Usi"])
        flags = {"tipo": tipo, "rarita": rarita, "grado": grado}
        if tipo in WEAPONS:
            kind = "weapon"
            m = DANNO.search(cosa)
            valore = int(m.group(1)) if m else 0
            p = PORTATA.search(cosa)
            flags["aggravato"] = bool(m and m.group(2))
            flags["dettagli"] = p.group(1) if p else ""
            system = {"weaponType": WEAPONS[tipo], "weaponvalue": valore}
        elif tipo in ARMORS:
            kind = "armor"
            m = PUNTI.search(cosa)
            if not m:
                sys.exit(f"Armatura senza punti: {name}")
            punti = int(m.group(1))
            flags["armatura"] = ARMORS[tipo]
            flags["armaturaPiena"] = punti
            system = {"armorvalue": punti}
        elif tipo in GEAR:
            kind = "gear"
            system = {}
        else:
            sys.exit(f"Tipo sconosciuto «{tipo}» per {name}")
        if kind != "armor":
            system["uses"] = {"current": n_usi or 0, "max": n_usi or 0, "enabled": bool(n_usi)}
            system["dicepool"] = {}
        elif n_usi:
            sys.exit(f"Le armature non hanno usi nel sistema: {name}")
        system.update({
            "description": description(row, tipo, rarita, grado, n_usi, kind),
            "macroid": "",
            "bonuses": [],
            "dataItemId": "",
            "source": dict(SOURCE),
            "quantity": 1
        })
        flags["archivio"] = {
            "kind": KIND[kind],
            "group": tipo,
            "name": name,
            # Accanto al nome, nella finestra dell'archivio: il Grado consigliato.
            "cost": f"Grado {grado}" if grado else "",
            # Per la ricerca: il tipo, la rarità, il grado.
            "text": " ".join(x for x in (tipo, rarita, f"Grado {grado}" if grado else "") if x)
        }
        doc = {
            "_id": doc_id("equip", tipo, name),
            "name": name,
            "type": kind,
            "img": IMG,
            "system": system,
            "effects": [],
            "folder": None,
            "sort": (i + 1) * 10,
            "ownership": {"default": 0},
            "flags": {MODULE: flags}
        }
        if doc["_id"] in ids:
            sys.exit(f"id doppio per {name}")
        ids.add(doc["_id"])
        docs.append(doc)
    return docs


def write_pack(name, docs):
    OUT.mkdir(exist_ok=True)
    text = "".join(json.dumps(d, ensure_ascii=False) + "\n" for d in docs)
    with (OUT / f"{name}.db").open("w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    counts = {}
    for d in docs:
        counts[d["type"]] = counts.get(d["type"], 0) + 1
    print(f"{name}: {len(docs)} voci ({', '.join(f'{k} {v}' for k, v in sorted(counts.items()))})")


if __name__ == "__main__":
    if not SRC.exists():
        sys.exit(f"Lista non trovata: {SRC}")
    docs = build(SRC.read_text(encoding="utf-8"))
    if len(docs) != 118:
        sys.exit(f"Voci: attese 118, trovate {len(docs)}")
    write_pack(PACK, docs)
