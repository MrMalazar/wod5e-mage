#!/usr/bin/env python3
"""Le icone delle Condizioni (Blue, 29/9/2026: «per famiglia», col grado in
numeri romani): una per famiglia, Corpo, Sensi, Mente, Soprannaturale, e per
ognuna le tre col grado I, II, III in una targhetta scura in basso a destra.

Uso: python3 tools/build-icone-condizioni.py

Scrive in assets/icons/condizioni/: <famiglia>.svg (senza grado: la usano
i lievi, lo scontro e la Sventura, e la scheda, che il grado lo stampa da
sé) e <famiglia>-1.svg, -2.svg, -3.svg (l'immagine degli oggetti).

La mano è quella delle icone degli archivi: viewBox 64, tratto 3,5, capi e
giunti tondi, un colore (l'oro degli archivi). Vietati, per non confondersi coi sigilli: l'occhio
aperto (il Paradosso), la stella a quattro punte (la Difficoltà), i pallini
(i punteggi).
"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "assets" / "icons" / "condizioni"
# L'oro delle icone degli archivi: si legge sul fondo scuro di Foundry. Sulla
# scheda l'icona si colora col tema (la maschera CSS), e il grado lo stampa lei.
TRATTO = "#d9a827"
TARGA = "#1d1a14"
CIFRA = "#f5e7b2"

# Il segno di ogni famiglia, in tratti.
SEGNI = {
    # Corpo: il battito, la traccia del cuore.
    "corpo": '<path d="M5 34h12l5-16 8 30 7-24 4 10h18"/>',
    # Sensi: l'orecchio, col padiglione e la spirale di dentro.
    "sensi": (
        '<path d="M19 27c0-11 8-19 18-19s18 8 18 18c0 8-5 12-9 16-4 5-3 10-8 14-5 3-11 1-12-4"/>'
        '<path d="M29 28c0-6 4-10 9-10s9 4 9 9c0 4-3 6-6 8"/>'
    ),
    # Mente: la testa di profilo.
    "mente": '<path d="M22 58V47c-6-4-10-10-10-19C12 15 21 6 33 6s20 8 20 18l5 9-5 2v6c0 4-3 6-7 6h-5v11"/>',
    # Soprannaturale: la falce di luna.
    "soprannaturale": '<path d="M42 8a25 25 0 1 0 15 39A20 20 0 1 1 42 8z"/>',
}


def targa(n):
    """La targhetta col grado: n aste coi due filetti, come un numero romano inciso."""
    passo, asta = 5.5, 3.2
    larghezza = 8 + (n - 1) * passo + asta + 6
    x0 = 62 - larghezza
    y0, altezza = 40, 22
    parti = [f'<rect x="{x0:.1f}" y="{y0}" width="{larghezza:.1f}" height="{altezza}" rx="4" fill="{TARGA}" stroke="{TRATTO}" stroke-width="2"/>']
    primo = x0 + 7
    for i in range(n):
        x = primo + i * passo
        parti.append(f'<rect x="{x:.1f}" y="{y0 + 6}" width="{asta}" height="{altezza - 12}" fill="{CIFRA}"/>')
    # I due filetti, sopra e sotto, che legano le aste.
    fine = primo + (n - 1) * passo + asta
    for y in (y0 + 4.4, y0 + altezza - 6):
        parti.append(f'<rect x="{primo - 1.6:.1f}" y="{y:.1f}" width="{fine - primo + 3.2:.1f}" height="1.6" fill="{CIFRA}"/>')
    return "".join(parti)


def svg(segno, grado=0):
    corpo = f'<g fill="none" stroke="{TRATTO}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">{segno}</g>'
    if grado:
        corpo += targa(grado)
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">{corpo}</svg>\n'


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for famiglia, segno in SEGNI.items():
        (OUT / f"{famiglia}.svg").write_text(svg(segno), encoding="utf-8", newline="\n")
        for grado in (1, 2, 3):
            (OUT / f"{famiglia}-{grado}.svg").write_text(svg(segno, grado), encoding="utf-8", newline="\n")
    print(f"icone delle Condizioni: {len(SEGNI) * 4} file in {OUT}")


if __name__ == "__main__":
    main()
