/**
 * La ruota dei comandi della Salute e della Saggezza (20/9, seconda
 * passata: «raddoppiare la dimensione, a ruota intorno al bottone, con un
 * fondo»). Non sta dentro la riga: il corpo del riquadro taglia quel che
 * esce, e una ruota intorno a un tastino in fondo alla riga esce di sicuro.
 * Si appende al contenuto della finestra, col centro sul tastino; qui i
 * conti puri, senza DOM, così si provano.
 */

/** I comandi in cerchio: sei ogni 60°, tre ogni 120°, partendo da sinistra. */
export function passoRuota(voci) {
  const n = Math.max(Number(voci) || 0, 1);
  return 360 / n;
}

/**
 * Il centro del tastino nello spazio del contenuto della finestra. Il
 * contenuto può avere lo zoom della misura del testo: il rettangolo sullo
 * schermo è già scalato, la larghezza di layout no, e il rapporto fra le
 * due è lo zoom in atto.
 */
export function posizioneRuota(tastino, contenuto, larghezzaLayout) {
  const zoom = larghezzaLayout > 0 && contenuto.width > 0 ? contenuto.width / larghezzaLayout : 1;
  return {
    x: (tastino.left + tastino.width / 2 - contenuto.left) / zoom,
    y: (tastino.top + tastino.height / 2 - contenuto.top) / zoom,
    zoom
  };
}

/** Il nome della classe della ruota: sei comandi o tre. */
export function classeRuota(voci) {
  return Number(voci) === 3 ? "tre" : "sei";
}
