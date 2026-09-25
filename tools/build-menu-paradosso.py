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
# Blue, 24/9 sera: «I Tocchi non si può sentire»: nel modulo la famiglia si chiama
# Conseguenze Magick. Il PDF segue alla sua prossima revisione; qui si rinomina
# alla costruzione, in ogni testo (in ordine: prima le forme con l'articolo).
RINOMINE = [("un Tocco", "una Conseguenza"), ("i Tocchi", "le Conseguenze"), ("I Tocchi", "Le Conseguenze"), ("Tocchi", "Conseguenze"), ("Tocco", "Conseguenza")]
# La riga breve di ogni voce (24/9 sera, Blue: «una descrizione veloce, tipo
# Tremore −2 al prossimo lancio del PG»; 25/9: «velocemente consultabili ad
# occhio»): l'effetto in poche parole, il numero per primo, al massimo una riga.
BREVI = {
    "tremore": "−2 dadi al prossimo lancio",
    "rigidita": "prossimo Volgare: riesce solo con l'8",
    "fragile": "prossimo Volgare: i rossi scoppiano col 2",
    "fiacco": "max 6 dadi per la scena",
    "scottatura": "1 danno superficiale",
    "condizione": "Abbagliato o Ovattato, 1 turno",
    "ritorno": "l'effetto svanisce, l'ostacolo torna",
    "residuo": "l'effetto continua da solo, per la scena",
    "specchio": "un loro incantesimo si ritorce contro",
    "testimone": "i prossimi Volgari sono con testimoni",
    "in-mezzo": "un Dormiente finisce nell'effetto",
    "il-luogo": "zona che morde: 1 danno a turno, o Condizione",
    "ombra": "entra un'Ombra: vuole una cosa piccola",
    "esattore": "entra l'Esattore: vuole l'effetto disfatto",
    "ospite": "entra un testimone: Volgari con testimoni",
    "carica": "a ogni Volgare → il rimbalzo che hai scelto",
    "scadenza": "a ogni turno → l'effetto cade",
    "arrivo": "a ogni turno → entra una Presenza",
    "nascosto": "a ogni Volgare, invisibile → il rimbalzo",
    "ciclo": "a ogni giro, col timer → una Conseguenza gratis",
    "ancora": "a ogni scena → il guaio dell'Ancora",
    "la-chiamata": "l'Ancora chiama: si va da lei, o parte l'orologio",
    "l-incrocio": "due Ancore nello stesso guaio",
    "in-scena": "l'Ancora entra nell'effetto: In mezzo + Testimone",
    "il-bersaglio-sbagliato": "l'effetto colpisce l'Ancora, storpiato",
    "il-ritmo": "orologio sull'Ancora: pieno, La chiamata gratis",
    "indagine-mezza-verita": "risposta vera, manca un pezzo",
    "indagine-sorvegliato": "il bersaglio si sente cercato, cambia mosse",
    "indagine-domande": "un PNG fa domande scomode, Mente non le toglie",
    "indagine-senza-prove": "la prova si cancella da sola",
    "trattativa-ripensamento": "a fine scena l'accordo salta",
    "trattativa-garanzia": "promessa legata: con Magick l'effetto fallisce",
    "trattativa-concorrenza": "un terzo in gara, favorito dal caso",
    "trattativa-ora-o-mai": "ora fissa: la Magick sul tempo fallisce",
    "infiltrazione-telecamera": "registrazione: Volgari con testimoni",
    "infiltrazione-sistema": "l'edificio reagisce: allarme, porte, luci",
    "infiltrazione-uscita": "l'uscita si chiude",
    "infiltrazione-ronda": "guardia immune alla Magick",
    "combattimento-anticipo": "il Volgare arriva a fine turno",
    "combattimento-rinforzo": "al 2° segmento entra un rinforzo",
    "combattimento-stop": "1 turno senza Magick, per tutti",
    "combattimento-ritirata": "i nemici si ritirano, la Magick non li segue",
    "combattimento-fuga": "fuga soprannaturale: non si ritrova",
    "inseguimento-svolta": "chi scappa sparisce dalla Magick, 1 turno",
    "inseguimento-scambio": "hanno preso quello sbagliato",
    "inseguimento-ostacolo": "ostacolo che la Magick non passa",
    "inseguimento-fine-corsa": "la corsa finisce tra la gente",
    "rituale-disturbo": "un Passo del rito si guasta",
    "rituale-prezzo-in-piu": "il rito chiede una cosa in più",
    "rituale-ospite": "entra un Ospite nel rito: Volgari con testimoni",
    "rituale-sbavatura": "l'effetto sbava fuori dal cerchio, 2 scene",
    "altrove-pedaggio": "ogni Volgare costa 1 Quintessenza in più",
    "altrove-la-voce": "una voce chiama: −2 dadi a chi non va",
    "altrove-stranezza": "Abbagliato o Ovattato per la scena",
    "santuario-falla": "la protezione cede",
    "santuario-il-nodo-storto": "Nodo senza Quintessenza, Volgari con l'8",
    "santuario-visita": "qualcuno entra oltre le protezioni e vede",
    "citta-intoppo": "la scorciatoia sbaglia posto, con gente",
    "citta-controllo": "il controllo vede attraverso la Magick",
    "citta-folla": "la folla si chiude: tutto con testimoni",
    "citta-chiusura": "porta o cancello che la Magick non apre",
    "anomalia": "Difetto Echi: +1 dado a chi lo cerca, per pallino",
    "macchia": "metà Ustione sulla Saggezza",
    "spirito-del-paradosso": "un'entità riscuote nella sessione dopo",
    "regno-del-paradosso": "bolla fuori dal mondo: uscirne è la sessione dopo",
}
NUMERI = {"uno": 1, "due": 2, "tre": 3}
# I nove cassetti del menù (Blue, 27/9): le voci raggruppate per «su cosa
# rimbalza il Paradosso», nell'ordine del menù. Ogni voce sta in un cassetto
# e uno solo; la famiglia resta e guida la spesa, la carta, gli orologi.
CASSETTI = {
    "mago": ["tremore", "rigidita", "fragile", "fiacco", "scottatura", "condizione", "altrove-stranezza", "combattimento-anticipo", "rituale-disturbo", "rituale-prezzo-in-piu"],
    "incantesimo": ["ritorno", "residuo", "specchio", "rituale-sbavatura", "infiltrazione-uscita", "santuario-falla", "trattativa-ripensamento", "indagine-mezza-verita", "inseguimento-svolta", "inseguimento-scambio", "citta-intoppo", "indagine-senza-prove", "indagine-sorvegliato"],
    "dormienti": ["testimone", "in-mezzo", "infiltrazione-telecamera", "citta-folla", "indagine-domande", "infiltrazione-ronda", "citta-controllo", "santuario-visita", "trattativa-concorrenza"],
    "presenze": ["ombra", "esattore", "ospite", "rituale-ospite", "combattimento-rinforzo"],
    "posto": ["il-luogo", "infiltrazione-sistema", "santuario-il-nodo-storto", "altrove-pedaggio", "citta-chiusura", "inseguimento-ostacolo"],
    "scontro": ["combattimento-stop", "combattimento-ritirata", "combattimento-fuga", "inseguimento-fine-corsa", "trattativa-ora-o-mai", "trattativa-garanzia"],
    "orologi": ["carica", "nascosto", "scadenza", "arrivo", "ciclo"],
    "ancore": ["la-chiamata", "l-incrocio", "in-scena", "il-bersaglio-sbagliato", "il-ritmo", "ancora", "altrove-la-voce"],
    "scoppio": ["anomalia", "macchia", "spirito-del-paradosso", "regno-del-paradosso"],
}
# Le voci che il PDF consiglia per ogni scena (27/9): i tre momenti della
# pagina della scena più la Conseguenza della tavola «Le famiglie in questa scena».
CONSIGLIATE = {
    "indagine": ["indagine-mezza-verita", "indagine-sorvegliato", "rigidita", "testimone", "indagine-domande", "indagine-senza-prove", "il-bersaglio-sbagliato", "ritorno", "esattore", "ancora"],
    "trattativa": ["testimone", "indagine-sorvegliato", "rigidita", "trattativa-ripensamento", "trattativa-garanzia", "trattativa-concorrenza", "trattativa-ora-o-mai", "ritorno"],
    "infiltrazione": ["infiltrazione-telecamera", "condizione", "tremore", "infiltrazione-sistema", "infiltrazione-ronda", "infiltrazione-uscita", "ritorno", "residuo", "ombra"],
    "combattimento": ["tremore", "rigidita", "scottatura", "condizione", "combattimento-anticipo", "ritorno", "specchio", "residuo", "in-mezzo", "il-luogo", "combattimento-stop", "combattimento-rinforzo", "combattimento-ritirata", "combattimento-fuga", "carica"],
    "inseguimento": ["tremore", "fiacco", "inseguimento-ostacolo", "inseguimento-svolta", "inseguimento-scambio", "specchio", "inseguimento-fine-corsa", "ritorno", "combattimento-fuga"],
    "rituale": ["rituale-disturbo", "fiacco", "rituale-prezzo-in-piu", "rituale-ospite", "rituale-sbavatura", "ritorno", "specchio", "esattore"],
    "altrove": ["altrove-stranezza", "altrove-pedaggio", "specchio", "altrove-la-voce", "il-luogo", "ritorno", "ospite", "ciclo", "rigidita"],
    "santuario": ["residuo", "santuario-il-nodo-storto", "tremore", "santuario-falla", "santuario-visita", "la-chiamata", "l-incrocio", "il-ritmo"],
    "citta": ["citta-intoppo", "rigidita", "testimone", "citta-controllo", "citta-folla", "citta-chiusura", "ritorno"],
}
# I nomi che cambiano qui, non nel sorgente (27/9): l'id resta, perché lo
# usano il Cambio scena e il testo di cosa scatta.
RINOMINA_VOCI = {"ancora": "L'orologio dell'Ancora"}


def cassetto_di_voce():
    """La tavola id → cassetto; una voce in due cassetti è un errore."""
    tavola = {}
    for cassetto, ids in CASSETTI.items():
        for vid in ids:
            if vid in tavola:
                raise SystemExit(f"la voce {vid} sta in due cassetti: {tavola[vid]} e {cassetto}")
            tavola[vid] = cassetto
    return tavola

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
    """Il prezzo letto dal testo, col suo `breve` per la riga della lista («1 pt», «la soglia», «1 pt + rimbalzo»)."""
    t = testo.strip()
    if m := re.match(r"^(\d+) punt[oi]$", t):
        return {"testo": t, "breve": f"{m.group(1)} pt", "tipo": "fisso", "valore": int(m.group(1))}
    if m := re.match(r"^(\d+) punt[oi] a pallino, fino a (\w+)$", t):
        return {"testo": t, "breve": f"{m.group(1)} pt a pallino", "tipo": "pallino", "valore": int(m.group(1)), "massimo": NUMERI[m.group(2)]}
    if m := re.match(r"^(\d+) punt[oi], più il rimbalzo$", t):
        return {"testo": t, "breve": f"{m.group(1)} pt + rimbalzo", "tipo": "orologioRimbalzo", "valore": int(m.group(1))}
    if m := re.match(r"^(\d+) punt[oi], più l'orologio$", t):
        return {"testo": t, "breve": f"{m.group(1)} pt + orologio", "tipo": "fisso", "valore": int(m.group(1)), "orologio": True}
    if m := re.match(r"^la sua soglia(?:, intorno a (\d+))?$", t):
        return {"testo": t, "breve": f"la sua soglia (≈{m.group(1)})" if m.group(1) else "la sua soglia", "tipo": "suaSoglia", "valore": int(m.group(1)) if m.group(1) else 0}
    if t in ("la soglia", "la soglia dell'effetto"):
        return {"testo": t, "breve": "la soglia", "tipo": "soglia", "valore": 0}
    raise SystemExit(f"prezzo che non so leggere: {t}")


def rinomina(valore):
    """Le rinomine di Blue in ogni testo (stringhe, liste e dizionari, in profondità)."""
    if isinstance(valore, str):
        for vecchio, nuovo in RINOMINE:
            valore = valore.replace(vecchio, nuovo)
        return valore
    if isinstance(valore, list):
        return [rinomina(v) for v in valore]
    if isinstance(valore, dict):
        return {k: rinomina(v) for k, v in valore.items()}
    return valore


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
    cassetti = cassetto_di_voce()
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
            vid = (f"{scena}-" if scena else "") + slug(nome)
            if vid not in cassetti:
                raise SystemExit(f"la voce {vid} non ha un cassetto")
            voci.append({
                "id": vid,
                "nome": RINOMINA_VOCI.get(vid, nome),
                "famiglia": fam,
                "cassetto": cassetti[vid],
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
            voci[-1]["breve"] = BREVI[voci[-1]["id"]]
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
    if set(BREVI) - {v["id"] for v in voci}:
        raise SystemExit(f"righe brevi di voci che non ci sono: {sorted(set(BREVI) - {v['id'] for v in voci})}")
    ids_voci = {v["id"] for v in voci}
    if set(cassetti) - ids_voci:
        raise SystemExit(f"cassetti con voci che non ci sono: {sorted(set(cassetti) - ids_voci)}")
    for sid, ids in CONSIGLIATE.items():
        if sid not in SCENE.values():
            raise SystemExit(f"consigliate di una scena che non c'è: {sid}")
        if set(ids) - ids_voci:
            raise SystemExit(f"consigliate che non ci sono ({sid}): {sorted(set(ids) - ids_voci)}")
    scene = [{"id": sid, "nome": nome, **sottotitoli.get(sid, {"sotto": "", "testo": ""}), "facce": facce_famiglia.get(sid, {}), "consigliate": list(CONSIGLIATE.get(sid, []))} for nome, sid in SCENE.items()]
    voci = rinomina(voci)
    scene = rinomina(scene)
    testa = (
        "// Generato da tools/build-menu-paradosso.py dal sorgente del menù (tools/dati/menu_paradosso.md, il testo del PDF del 24/9/2026): non toccare a mano.\n"
        "// Le 65 voci del menù del Paradosso: famiglia, scena, modo (annunciato, immediato, nascosto, scoppio), prezzo (col suo breve), la riga breve, la scheda (quando, segno, effetto, mosse, poi, esempio),\n"
        "// la faccia delle comuni in ogni scena e la durata addosso al mago (lancio, turno, scena, sessione; vuota se la voce non sta addosso a nessuno).\n"
        "// I Tocchi si chiamano Conseguenze Magick (Blue, 24/9 sera): la rinomina è fatta qui, il PDF segue.\n"
        "// Dal 27/9 ogni voce ha il suo cassetto (su cosa rimbalza il Paradosso: mago, incantesimo, dormienti, presenze, posto, scontro, orologi, ancore, scoppio) e ogni scena le sue voci consigliate.\n\n"
    )
    js = testa
    js += "export const FAMIGLIE_PARADOSSO = Object.freeze([\"tocchi\", \"comuni\", \"scena\", \"scettro\", \"presenze\", \"orologi\", \"ancore\", \"grandi\"]);\n\n"
    js += "export const CASSETTI_PARADOSSO = Object.freeze(" + json.dumps(list(CASSETTI), ensure_ascii=False) + ");\n\n"
    js += "export const SCENE_PARADOSSO = Object.freeze(" + json.dumps(scene, ensure_ascii=False, indent=2) + ");\n\n"
    js += "export const MENU_PARADOSSO = Object.freeze(" + json.dumps(voci, ensure_ascii=False, indent=2) + ");\n"
    OUT.write_text(js, encoding="utf-8")
    print(f"scritto {OUT.relative_to(ROOT)} · voci: {len(voci)} · scene: {len(scene)}")


if __name__ == "__main__":
    main()
