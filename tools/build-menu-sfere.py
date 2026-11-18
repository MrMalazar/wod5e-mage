"""Costruisce scripts/data/menu-sfere.js, i dati del menù circolare del Narratore.

Sorgenti in tools/dati:
  menu_sfere.json        le nove Sfere coi blocchi Narrativa, Combattimento e
                         Narrativa/Combattimento (la stesura del 24/10/2026)
  menu_sfere_icone.json  l'icona di ogni riga (nomi di Game-icons)
  icone_game_icons.json  i tracciati delle icone usate, con fonte e licenza

Si lancia dalla radice del repo: python tools/build-menu-sfere.py
"""
import json
from pathlib import Path

RADICE = Path(__file__).resolve().parent.parent
DATI = RADICE / "tools" / "dati"
USCITA = RADICE / "scripts" / "data" / "menu-sfere.js"
LATI = {"n", "s", "ns"}


def main():
    menu = json.loads((DATI / "menu_sfere.json").read_text(encoding="utf-8"))
    icone = json.loads((DATI / "menu_sfere_icone.json").read_text(encoding="utf-8"))
    tracciati = json.loads((DATI / "icone_game_icons.json").read_text(encoding="utf-8"))
    percorsi = tracciati["icone"]

    sfere = []
    for sfera in menu["sfere"]:
        righe = []
        for riga in sfera["righe"]:
            if riga["lato"] not in LATI:
                raise SystemExit(f"lato sconosciuto in {riga['id']}: {riga['lato']}")
            nome_icona = icone.get(riga["id"], icone["_effetto"])
            righe.append({
                "id": riga["id"],
                "nome": riga["nome"],
                "lato": riga["lato"],
                "testo": riga["testo"],
                "prezzo": riga.get("prezzo"),
                "fissa": bool(riga.get("fissa")),
                "icona": nome_icona,
            })
        sfere.append({
            "id": sfera["id"],
            "nome": sfera["nome"],
            "dominio": sfera.get("dominio", ""),
            "autore": sfera.get("autore", ""),
            "righe": righe,
        })

    usate = sorted({r["icona"] for s in sfere for r in s["righe"]} | {icone["_narrativa"], icone["_combattimento"], icone["_componi"]})
    mancanti = [n for n in usate if n not in percorsi]
    if mancanti:
        raise SystemExit(f"icone senza tracciato: {mancanti}")

    testa = (
        "// GENERATO da tools/build-menu-sfere.py: non si scrive a mano.\n"
        "// Le righe del menù circolare del Narratore per Sfera (stesura del 24/10/2026,\n"
        "// Corrispondenza scritta da Blue, le altre otto proposte da provare al tavolo).\n"
        f"// Icone: {tracciati['fonte']}. Licenza {tracciati['licenza']}.\n"
        f"// Autori: {tracciati['autori']}.\n"
    )
    corpo = (
        f"export const MENU_SFERE = Object.freeze({json.dumps(sfere, ensure_ascii=False, indent=1)});\n\n"
        f"export const MENU_ICONE_LATI = Object.freeze({json.dumps({'n': icone['_narrativa'], 's': icone['_combattimento'], 'componi': icone['_componi']})});\n\n"
        f"export const MENU_ICONE_VIEWBOX = {json.dumps(tracciati['viewBox'])};\n\n"
        f"export const MENU_ICONE = Object.freeze({json.dumps({n: percorsi[n] for n in usate}, ensure_ascii=False)});\n"
    )
    USCITA.write_text(testa + corpo, encoding="utf-8")
    print(f"scritto {USCITA.relative_to(RADICE)}: {len(sfere)} Sfere, {sum(len(s['righe']) for s in sfere)} righe, {len(usate)} icone")


if __name__ == "__main__":
    main()
