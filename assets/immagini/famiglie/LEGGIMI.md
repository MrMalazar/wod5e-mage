# Le immagini delle Famiglie

La creazione guidata (passo 2) mostra una carta per Famiglia e una per via, con l'immagine grande sopra il nome. Finché l'immagine manca, la carta mostra un segnaposto (le righe in diagonale e l'iniziale).

Per farle comparire basta mettere qui i file, in formato WebP, con questi nomi:

- una Famiglia: `<id>.webp`, per esempio `verbena.webp`, `hermes.webp`, `ngoma.webp`;
- una via (Sottofamiglia): `<famiglia>-<via>.webp`, per esempio `verbena-streghe.webp`, `hermes-verdicta.webp`.

Gli id sono quelli di `scripts/famiglie.js` (`FAMIGLIE`). Le carte sono larghe circa 170 pixel e alte 112: va bene un'immagine 340×224 (o più grande, in proporzione); la carta la ritaglia al centro.

Il modulo non va toccato: le immagini si leggono da sole al render successivo.
