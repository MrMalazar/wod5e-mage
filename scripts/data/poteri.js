// GENERATO da tools/genera-dati.mjs (sorgenti: tools/dati/poteri.json, dal libretto dei poteri e dai poteri nuovi del 23-24/9;
// tools/dati/effetti_poteri.json, gli effetti sul tiro scritti a mano dal testo, tappa 3 del 24/9;
// tools/dati/prerequisiti_poteri.json, i prerequisiti d'acquisto, 25/9; dal 27/9 attivo, passivo e amalgama separati, per le quattro parti del testo).
// Non si scrive a mano. Il catalogo dei poteri delle Sfere: ogni voce ha le Sfere che la aprono
// (`spheres`, con "any" per Qualsiasi), la matrice di provenienza, il testo intero, il costo in
// Quintessenza, il limite d'uso, `effects` (gli effetti sul tiro: poteri.js li applica), `scelta`
// (cosa il giocatore sceglie all'acquisto: un Ambito, un'Abilità, un incantesimo) e `prerequisiti`
// (le condizioni d'acquisto, una per riga: numero, potere o testo; null = nessuna).
// Dal 30/9 anche tools/dati/rifacimento.json, i poteri rifatti e decisi nella pagina «Poteri delle Sfere»:
// `rifatto` true, `costoAttivo` e `cadenzaPassivo` scritti per esteso, `costoVariabile` ({ min, max },
// max 0 = senza tetto) quando la Quintessenza dell'attivo la sceglie chi lo usa.
export const POTERI = Object.freeze([
  {
    "id": "da-qualche-parte",
    "spheres": [
      "correspondence"
    ],
    "name": "Da qualche parte",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Ti chiudi in una piega dello spazio nel punto in cui sei (la piega è spazio compresso: resti lì, avvolto come in una tasca). Finché ci resti nessuno ti percepisce senza la Magick o un potere soprannaturale: né a vista, né a orecchio, né con una telecamera. Tu vedi e senti la scena, ma non ti muovi. Esci con la tua prossima azione, che parte dal punto in cui eri, e al cambio di scena la piega si apre da sola. Se qualcuno grande quanto una persona passa per il punto esatto in cui sei (un passante, una guardia, un cane grosso etc..), lui ti percepisce, mentre per gli altri resti nascosto.\n\nEffetto passivo (Sempre): Sei sempre un po' altrove: gli effetti di Magick che ti cercano o ti seguono (un marchio, una localizzazione, un occhio che ti segue da lontano etc..) su di te durano un gradino di Durata in meno, per esempio una sessione diventa due scene e una scena diventa tre turni. Sotto un turno non si scende.",
    "attivo": "Ti chiudi in una piega dello spazio nel punto in cui sei (la piega è spazio compresso: resti lì, avvolto come in una tasca). Finché ci resti nessuno ti percepisce senza la Magick o un potere soprannaturale: né a vista, né a orecchio, né con una telecamera. Tu vedi e senti la scena, ma non ti muovi. Esci con la tua prossima azione, che parte dal punto in cui eri, e al cambio di scena la piega si apre da sola. Se qualcuno grande quanto una persona passa per il punto esatto in cui sei (un passante, una guardia, un cane grosso etc..), lui ti percepisce, mentre per gli altri resti nascosto.",
    "passivo": "Sei sempre un po' altrove: gli effetti di Magick che ti cercano o ti seguono (un marchio, una localizzazione, un occhio che ti segue da lontano etc..) su di te durano un gradino di Durata in meno, per esempio una sessione diventa due scene e una scena diventa tre turni. Sotto un turno non si scende.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Mi cercavi? Ero qui.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Basso rischio effetto attivo (Volgare se qualcuno ti guarda sparire), nessuno effetto passivo.",
    "formula": "varcare",
    "formulaName": "Varcare",
    "link": "verbo",
    "page": "Corrispondenza",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "tasca-di-mary",
    "spheres": [
      "correspondence"
    ],
    "name": "Tasca di Mary",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Tocchi un oggetto grande al massimo quanto una persona (una bicicletta, una valigia, una sedia etc..), purché nessuno lo tenga in mano, e lo fai entrare nella tasca. Un insieme di cose conta come un oggetto solo (una pila di scatole, una cassa di bottiglie, una rastrelliera etc..). In tutto, nella tasca ci sta al massimo mezza tonnellata. Quando ti serve lo tiri fuori con la tua azione, e ti compare in mano o accanto a te.\n\nEffetto passivo (Sempre): Le tue tasche sono più grandi dentro che fuori. Quello che passa dall'apertura ci sta tutto, senza peso (un coltello, un telefono, un mazzo di chiavi etc..), e sulla scheda resta Addosso. Lo spazio è uno solo, anche se cambi giacca. Quello che tieni in tasca non lo trova nessun tiro comune (una perquisizione, un metal detector, un cane etc..): lo trova solo la Magick.",
    "attivo": "Tocchi un oggetto grande al massimo quanto una persona (una bicicletta, una valigia, una sedia etc..), purché nessuno lo tenga in mano, e lo fai entrare nella tasca. Un insieme di cose conta come un oggetto solo (una pila di scatole, una cassa di bottiglie, una rastrelliera etc..). In tutto, nella tasca ci sta al massimo mezza tonnellata. Quando ti serve lo tiri fuori con la tua azione, e ti compare in mano o accanto a te.",
    "passivo": "Le tue tasche sono più grandi dentro che fuori. Quello che passa dall'apertura ci sta tutto, senza peso (un coltello, un telefono, un mazzo di chiavi etc..), e sulla scheda resta Addosso. Lo spazio è uno solo, anche se cambi giacca. Quello che tieni in tasca non lo trova nessun tiro comune (una perquisizione, un metal detector, un cane etc..): lo trova solo la Magick.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Le tue tasche sono più grandi di casa tua.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Volgare effetto attivo se qualcuno guarda, basso rischio effetto passivo.",
    "formula": "barriera",
    "formulaName": "Barriera",
    "link": "effetto",
    "page": "Corrispondenza",
    "hooks": [
      "uso",
      "tiro",
      "quintessenza",
      "combattimento"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "torna-sempre",
    "spheres": [
      "correspondence",
      "matter"
    ],
    "name": "Torna sempre",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Richiami un oggetto tuo abbastanza piccolo da tenerlo con una mano: dovunque sia (a casa, nella tasca di un ladro, nel deposito della polizia etc..), ti compare in mano, purché nessuno lo stia impugnando.\n\nEffetto passivo (A sessione nuova): Quello che è tuo e hai perso, o che ti hanno rubato o sequestrato, torna da te, se non è stato distrutto. Tuo vuol dire che con l'oggetto hai almeno un legame superficiale, il filo più sottile che ti lega a una cosa (l'hai comprato, te l'hanno regalato, l'hai costruito etc..). Come torna lo decide il Narratore (te lo riporta qualcuno, lo ritrovi dove non l'avevi lasciato, arriva per posta).",
    "attivo": "Richiami un oggetto tuo abbastanza piccolo da tenerlo con una mano: dovunque sia (a casa, nella tasca di un ladro, nel deposito della polizia etc..), ti compare in mano, purché nessuno lo stia impugnando.",
    "passivo": "Quello che è tuo e hai perso, o che ti hanno rubato o sequestrato, torna da te, se non è stato distrutto. Tuo vuol dire che con l'oggetto hai almeno un legame superficiale, il filo più sottile che ti lega a una cosa (l'hai comprato, te l'hanno regalato, l'hai costruito etc..). Come torna lo decide il Narratore (te lo riporta qualcuno, lo ritrovi dove non l'avevi lasciato, arriva per posta).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Quello che è mio torna da me.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Basso rischio effetto attivo (Volgare se qualcuno lo vede comparire), basso rischio effetto passivo.",
    "formula": "spostare",
    "formulaName": "Spostare",
    "link": "effetto",
    "page": "Corrispondenza",
    "hooks": [
      "narratore",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "A sessione nuova",
    "costoVariabile": null
  },
  {
    "id": "armonia-a-distanza",
    "spheres": [
      "correspondence",
      "prime"
    ],
    "name": "Armonia a distanza",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Per la scena fai da ponte: i compagni in scena con te possono dare e ricevere dadi di Armonia con un compagno lontano, purché tu abbia un legame con lui, lo stia guardando o ci stia parlando. Anche così il tetto è 3.\n\nEffetto passivo (Sempre): Dai e ricevi dadi di Armonia anche con un compagno che non è in scena, se hai un legame con lui, lo stai guardando o ci stai parlando (un marchio, una chiaroveggenza, una telefonata etc..). Vale nei tiri di Abilità e nei lanci di Magick, e il tetto di 3 resta.",
    "attivo": "Per la scena fai da ponte: i compagni in scena con te possono dare e ricevere dadi di Armonia con un compagno lontano, purché tu abbia un legame con lui, lo stia guardando o ci stia parlando. Anche così il tetto è 3.",
    "passivo": "Dai e ricevi dadi di Armonia anche con un compagno che non è in scena, se hai un legame con lui, lo stai guardando o ci stai parlando (un marchio, una chiaroveggenza, una telefonata etc..). Vale nei tiri di Abilità e nei lanci di Magick, e il tetto di 3 resta.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Non serve che io sia lì.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo; quando i dadi vanno in un lancio di Magick, segue il lancio.",
    "formula": "comunicare",
    "formulaName": "Comunicare",
    "link": "regola",
    "page": "Corrispondenza",
    "hooks": [
      "tiro",
      "altri"
    ],
    "effects": [
      {
        "on": "nota",
        "roll": "any",
        "nota": "Dai e ricevi dadi di Armonia anche con un compagno che non è in scena, se hai un legame con lui, lo stai guardando o ci stai parlando (un marchio, una chiaroveggenza, una telefonata etc..)."
      }
    ],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "conosco-un-posto",
    "spheres": [
      "correspondence",
      "entropy"
    ],
    "name": "Conosco un posto",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Dichiari che conosci un posto che serve al gruppo (un rifugio, un'uscita sul retro, un passaggio etc..), anche in una città dove non sei mai stato: c'è per caso, e il Narratore lo fa esistere dove ha senso.\n\nEffetto passivo (Sempre): Ogni posto in cui sei stato almeno una volta conta per te come un legame forte (il filo che ti unisce a un posto anche quando sei lontano), in ogni effetto che chiede un legame.",
    "attivo": "Dichiari che conosci un posto che serve al gruppo (un rifugio, un'uscita sul retro, un passaggio etc..), anche in una città dove non sei mai stato: c'è per caso, e il Narratore lo fa esistere dove ha senso.",
    "passivo": "Ogni posto in cui sei stato almeno una volta conta per te come un legame forte (il filo che ti unisce a un posto anche quando sei lontano), in ogni effetto che chiede un legame.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Fidati, conosco un posto.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "sapere",
    "formulaName": "Sapere",
    "link": "verbo",
    "page": "Corrispondenza",
    "hooks": [
      "uso",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "planimetria",
    "spheres": [
      "correspondence"
    ],
    "name": "Planimetria",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (da 1 a 3 Quintessenza): Cambi la pianta dell'edificio in cui sei, e la disegni tu (una stanza più grande, un corridoio più lungo, una scala dall'altra parte etc..). Paghi 1 Quintessenza per una stanza, 2 per un piano, 3 per l'edificio intero. Cambiano le misure e i collegamenti, non le cose di cui è fatto: il muro resta muro e la porta resta porta. La pianta nuova dura fino al cambio di scena.\nCon Materia: cambi anche le cose di cui è fatto (la porta diventa una finestra, il muro diventa vetro, il pavimento diventa una grata etc..), e la casa resta ridisegnata anche dopo la scena.\n\nEffetto passivo (Sempre): Quando entri in un edificio la pianta ti si stampa in testa d'istinto, come se ci avessi sempre vissuto: sai dove muoverti, dove passare e dove trovare quello che ti serve (la cucina, il quadro elettrico, l'uscita di servizio etc..). Le cose nascoste le devi cercare lo stesso, ma quando le cerchi hai dadi in più pari ai poteri che conosci in Corrispondenza.",
    "attivo": "Cambi la pianta dell'edificio in cui sei, e la disegni tu (una stanza più grande, un corridoio più lungo, una scala dall'altra parte etc..). Paghi 1 Quintessenza per una stanza, 2 per un piano, 3 per l'edificio intero. Cambiano le misure e i collegamenti, non le cose di cui è fatto: il muro resta muro e la porta resta porta. La pianta nuova dura fino al cambio di scena.\nCon Materia: cambi anche le cose di cui è fatto (la porta diventa una finestra, il muro diventa vetro, il pavimento diventa una grata etc..), e la casa resta ridisegnata anche dopo la scena.",
    "passivo": "Quando entri in un edificio la pianta ti si stampa in testa d'istinto, come se ci avessi sempre vissuto: sai dove muoverti, dove passare e dove trovare quello che ti serve (la cucina, il quadro elettrico, l'uscita di servizio etc..). Le cose nascoste le devi cercare lo stesso, ma quando le cerchi hai dadi in più pari ai poteri che conosci in Corrispondenza.",
    "amalgama": "",
    "amalgam": "matter",
    "amalgams": [
      "matter"
    ],
    "amalgamText": "",
    "flavor": "«Quella non è una porta, è una finestra.»",
    "cost": "da 1 a 3 Quintessenza",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo se la pianta nuova sembra normale, Volgare anche senza testimoni se non torna (una stanza più grande della casa, due stanze lontane che si toccano, un corridoio che gira su se stesso etc..); nessuno effetto passivo.",
    "formula": "trasformare",
    "formulaName": "Trasformare",
    "link": "effetto",
    "page": "Corrispondenza",
    "hooks": [
      "uso",
      "altri",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "da 1 a 3 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 3
    }
  },
  {
    "id": "rifornimento",
    "spheres": [
      "correspondence"
    ],
    "name": "Rifornimento",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Una cosa che hai finito o consumato torna (le cariche del kit medico, le fascette, il nastro adesivo etc..). Con la sola Corrispondenza la cosa arriva da dove si trova (un negozio, un magazzino, un'ambulanza etc..), e lì manca.\nCon Forza: l'energia torna da sola (la batteria, il serbatoio, la bombola etc..), senza toglierla a nessuno.\nCon Materia: gli oggetti si rigenerano sul posto, senza toglierli a nessuno.\nCon Primordio: quello che manca nasce sul posto, nuovo, senza toglierlo a nessuno; e una Meraviglia o una reliquia la ricarichi o la richiami, pagando a parte la Quintessenza che la ricarica.\nCon Vita: quello che viene dal vivo si rigenera sul posto (il cibo, le erbe, il sangue per una trasfusione etc..), senza toglierlo a nessuno.\n\nEffetto passivo (Una volta per sessione): Il gruppo si rifornisce come se passasse dal Santuario (munizioni, medicine, vestiti etc..), nel momento che scegli tu.",
    "attivo": "Una cosa che hai finito o consumato torna (le cariche del kit medico, le fascette, il nastro adesivo etc..). Con la sola Corrispondenza la cosa arriva da dove si trova (un negozio, un magazzino, un'ambulanza etc..), e lì manca.\nCon Forza: l'energia torna da sola (la batteria, il serbatoio, la bombola etc..), senza toglierla a nessuno.\nCon Materia: gli oggetti si rigenerano sul posto, senza toglierli a nessuno.\nCon Primordio: quello che manca nasce sul posto, nuovo, senza toglierlo a nessuno; e una Meraviglia o una reliquia la ricarichi o la richiami, pagando a parte la Quintessenza che la ricarica.\nCon Vita: quello che viene dal vivo si rigenera sul posto (il cibo, le erbe, il sangue per una trasfusione etc..), senza toglierlo a nessuno.",
    "passivo": "Il gruppo si rifornisce come se passasse dal Santuario (munizioni, medicine, vestiti etc..), nel momento che scegli tu.",
    "amalgama": "",
    "amalgam": "forces",
    "amalgams": [
      "forces",
      "matter",
      "prime",
      "life"
    ],
    "amalgamText": "",
    "flavor": "«Munizioni, garze, un cambio pulito: ci sono.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Basso rischio effetto attivo (Volgare se qualcuno vede le cose comparire), nessuno effetto passivo.",
    "formula": "spostare",
    "formulaName": "Spostare",
    "link": "verbo",
    "page": "Corrispondenza",
    "hooks": [
      "uso",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza",
    "cadenzaPassivo": "Una volta per sessione",
    "costoVariabile": null
  },
  {
    "id": "schieramento",
    "spheres": [
      "correspondence"
    ],
    "name": "Schieramento",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Sposti un compagno dove vuoi, in un punto che percepisci, purché sia un posto sicuro, dove può stare senza farsi male (non a mezz'aria, non nel fuoco, non in mezzo al traffico etc..). Se il compagno non vuole, fai il lancio come per spostare chiunque, con la soglia normale della Magick, e con questo potere hai 2 dadi in più.\n\nEffetto passivo (Una volta per combattimento): All'inizio di uno scontro, prima del primo turno, metti ogni compagno dove vuoi, entro pochi metri da dov'era.",
    "attivo": "Sposti un compagno dove vuoi, in un punto che percepisci, purché sia un posto sicuro, dove può stare senza farsi male (non a mezz'aria, non nel fuoco, non in mezzo al traffico etc..). Se il compagno non vuole, fai il lancio come per spostare chiunque, con la soglia normale della Magick, e con questo potere hai 2 dadi in più.",
    "passivo": "All'inizio di uno scontro, prima del primo turno, metti ogni compagno dove vuoi, entro pochi metri da dov'era.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Tu a sinistra, lei dietro di me.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Basso rischio effetto attivo (Volgare se qualcuno lo vede sparire), nessuno effetto passivo.",
    "formula": "spostare",
    "formulaName": "Spostare",
    "link": "verbo",
    "page": "Corrispondenza",
    "hooks": [
      "combattimento",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Una volta per combattimento",
    "costoVariabile": null
  },
  {
    "id": "pedina",
    "spheres": [
      "correspondence"
    ],
    "name": "Pedina",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Sposti un nemico dove vuoi, in un punto che percepisci dove non muore sul colpo, anche se è pericolosissimo: non dentro un vulcano attivo, ma sul bordo sì, dove poi basta una spinta. Puoi anche scambiarti di posto con lui. Il nemico non è mai d'accordo: fai sempre il lancio come per spostare chiunque, con la soglia normale della Magick, e con questo potere hai 2 dadi in più.\n\nEffetto passivo (Una volta per combattimento): All'inizio di uno scontro metti un nemico dove vuoi, purché ci sia potuto arrivare.",
    "attivo": "Sposti un nemico dove vuoi, in un punto che percepisci dove non muore sul colpo, anche se è pericolosissimo: non dentro un vulcano attivo, ma sul bordo sì, dove poi basta una spinta. Puoi anche scambiarti di posto con lui. Il nemico non è mai d'accordo: fai sempre il lancio come per spostare chiunque, con la soglia normale della Magick, e con questo potere hai 2 dadi in più.",
    "passivo": "All'inizio di uno scontro metti un nemico dove vuoi, purché ci sia potuto arrivare.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Sei esattamente dove ti volevo.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Basso rischio effetto attivo (Volgare se qualcuno lo vede sparire), nessuno effetto passivo.",
    "formula": "spostare",
    "formulaName": "Spostare",
    "link": "verbo",
    "page": "Corrispondenza",
    "hooks": [
      "combattimento",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Una volta per combattimento",
    "costoVariabile": null
  },
  {
    "id": "strada-facendo",
    "spheres": [
      "correspondence",
      "time"
    ],
    "name": "Strada facendo",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (da 1 a 3 Quintessenza): Dichiari un'azione che di solito prende tempo (fare benzina, comprare un ricambio, passare in farmacia etc..) e la consideri fatta: è successa sullo sfondo, mentre la scena andava avanti. Il costo va da 1 a 3 Quintessenza secondo l'azione, e lo decide il Narratore. Se l'azione chiede un tiro, il tiro si fa lo stesso: risparmi il tempo, non il tiro.\n\nEffetto passivo (Sempre): I viaggi del gruppo non fanno avanzare gli orologi del Narratore.",
    "attivo": "Dichiari un'azione che di solito prende tempo (fare benzina, comprare un ricambio, passare in farmacia etc..) e la consideri fatta: è successa sullo sfondo, mentre la scena andava avanti. Il costo va da 1 a 3 Quintessenza secondo l'azione, e lo decide il Narratore. Se l'azione chiede un tiro, il tiro si fa lo stesso: risparmi il tempo, non il tiro.",
    "passivo": "I viaggi del gruppo non fanno avanzare gli orologi del Narratore.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Il viaggio non conta, conta arrivare.»",
    "cost": "da 1 a 3 Quintessenza",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "varcare",
    "formulaName": "Varcare",
    "link": "verbo",
    "page": "Corrispondenza",
    "hooks": [
      "narratore",
      "orologi"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "da 1 a 3 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 3
    }
  },
  {
    "id": "giochiamo-in-casa",
    "spheres": [
      "correspondence"
    ],
    "name": "Giochiamo in casa",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione scegli il luogo della scena dopo, fra quelli dove la storia può andare.\n\nEffetto Amalgama: Accesso con Entropia: l'arrivo è accidentale: ci finite per caso, anche se nessuno ci voleva andare.",
    "attivo": "Una volta per sessione scegli il luogo della scena dopo, fra quelli dove la storia può andare.",
    "passivo": "",
    "amalgama": "Con Entropia: l'arrivo è accidentale: ci finite per caso, anche se nessuno ci voleva andare.",
    "amalgam": "entropy",
    "amalgams": [
      "entropy"
    ],
    "amalgamText": "Accesso con Entropia: l'arrivo è accidentale: ci finite per caso, anche se nessuno ci voleva andare.",
    "flavor": "«Ci vediamo da me.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "varcare",
    "formulaName": "Varcare",
    "link": "tavolo",
    "page": "Corrispondenza",
    "hooks": [
      "uso"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "uscita-d-emergenza",
    "spheres": [
      "correspondence"
    ],
    "name": "Uscita d'emergenza",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza a testa): Porti in salvo chi vuoi (i compagni, un ostaggio, un passante etc..) per l'uscita che conosci, anche da un Regno del Paradosso: la strada si accorcia, e con due passi siete fuori, al sicuro (in strada, nel cortile, sul tetto accanto etc..). Tu esci gratis, ogni altro che porti con te costa 1 Quintessenza, e chi non vuole venire resta dov'è.\n\nEffetto passivo (Sempre): Sai sempre come si esce da qualunque posto, anche da uno in cui non sei mai stato (la porta di servizio, la finestra del bagno, il condotto dell'aria etc..). In un Regno del Paradosso e nei reami degli spiriti serve l'Amalgama.\nCon Entropia: sai anche qual è l'uscita migliore (quella dove non ti aspetta nessuno, quella che non crolla, quella che porta più lontano etc..).\nCon Primordio: vale anche in un Regno del Paradosso (la bolla fuori dal mondo in cui il Paradosso chiude un mago): sai come uscirne, e il Narratore ti facilita la strada.\nCon Spirito: vale anche nell'Umbra e negli altri reami degli spiriti.",
    "attivo": "Porti in salvo chi vuoi (i compagni, un ostaggio, un passante etc..) per l'uscita che conosci, anche da un Regno del Paradosso: la strada si accorcia, e con due passi siete fuori, al sicuro (in strada, nel cortile, sul tetto accanto etc..). Tu esci gratis, ogni altro che porti con te costa 1 Quintessenza, e chi non vuole venire resta dov'è.",
    "passivo": "Sai sempre come si esce da qualunque posto, anche da uno in cui non sei mai stato (la porta di servizio, la finestra del bagno, il condotto dell'aria etc..). In un Regno del Paradosso e nei reami degli spiriti serve l'Amalgama.\nCon Entropia: sai anche qual è l'uscita migliore (quella dove non ti aspetta nessuno, quella che non crolla, quella che porta più lontano etc..).\nCon Primordio: vale anche in un Regno del Paradosso (la bolla fuori dal mondo in cui il Paradosso chiude un mago): sai come uscirne, e il Narratore ti facilita la strada.\nCon Spirito: vale anche nell'Umbra e negli altri reami degli spiriti.",
    "amalgama": "",
    "amalgam": "entropy",
    "amalgams": [
      "entropy",
      "prime",
      "spirit"
    ],
    "amalgamText": "",
    "flavor": "«Fuori. Adesso.»",
    "cost": "1 Quintessenza a testa",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo (Volgare se qualcuno vi vede sparire), nessuno effetto passivo.",
    "formula": "aprire-e-bloccare",
    "formulaName": "Aprire e Bloccare",
    "link": "effetto",
    "page": "Corrispondenza",
    "hooks": [
      "uso",
      "altri",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 4
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza a testa",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "filo-rosso",
    "spheres": [
      "correspondence"
    ],
    "name": "Filo rosso",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Raggiungi all'istante quello con cui hai un legame forte (una persona, un posto, una cosa): gli mandi un messaggio, ci arrivi tu, o gli mandi un oggetto piccolo che tieni in mano. Oppure richiami a te un oggetto piccolo con cui hai un legame forte, e ti compare in mano.\n\nEffetto passivo (Sempre): Sai sempre dov'è quello con cui hai un legame forte: in che direzione e quanto lontano. Nei lanci di Magick che spostano te, o una cosa, verso un tuo legame forte hai 2 dadi in più.",
    "attivo": "Raggiungi all'istante quello con cui hai un legame forte (una persona, un posto, una cosa): gli mandi un messaggio, ci arrivi tu, o gli mandi un oggetto piccolo che tieni in mano. Oppure richiami a te un oggetto piccolo con cui hai un legame forte, e ti compare in mano.",
    "passivo": "Sai sempre dov'è quello con cui hai un legame forte: in che direzione e quanto lontano. Nei lanci di Magick che spostano te, o una cosa, verso un tuo legame forte hai 2 dadi in più.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Basso rischio effetto attivo (Volgare se qualcuno vede sparire o comparire te o l'oggetto); il passivo segue il lancio.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Corrispondenza",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "traccia",
    "spheres": [
      "correspondence"
    ],
    "name": "Traccia",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Segui la traccia di chi è sparito da un posto passando per lo spazio (un teletrasporto, un portale, una piega etc..): passi dallo stesso varco e arrivi dove è arrivato lui, tu e chi tocchi.\n\nEffetto passivo (Sempre): In ogni posto in cui entri sai chi ci è arrivato o se n'è andato passando per lo spazio, di recente, nella giornata, e da che parte. Quando indaghi su chi è passato così, hai 2 dadi in più.\nCon Tempo: sai anche quanto tempo fa, e con più dettagli.",
    "attivo": "Segui la traccia di chi è sparito da un posto passando per lo spazio (un teletrasporto, un portale, una piega etc..): passi dallo stesso varco e arrivi dove è arrivato lui, tu e chi tocchi.",
    "passivo": "In ogni posto in cui entri sai chi ci è arrivato o se n'è andato passando per lo spazio, di recente, nella giornata, e da che parte. Quando indaghi su chi è passato così, hai 2 dadi in più.\nCon Tempo: sai anche quanto tempo fa, e con più dettagli.",
    "amalgama": "",
    "amalgam": "time",
    "amalgams": [
      "time"
    ],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Volgare effetto attivo se qualcuno guarda, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Corrispondenza",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "fuori-tiro",
    "spheres": [
      "correspondence"
    ],
    "name": "Fuori tiro",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Per la scena i colpi e gli effetti che partono da oltre Portata 2 hanno la soglia più alta: in più, tanto quanti sono i poteri che conosci in Corrispondenza.\n\nEffetto passivo (Sempre): Chi ti attacca da oltre Portata 2 (un cecchino, una granata, un lancio di Magick da lontano etc..) fallisce.",
    "attivo": "Per la scena i colpi e gli effetti che partono da oltre Portata 2 hanno la soglia più alta: in più, tanto quanti sono i poteri che conosci in Corrispondenza.",
    "passivo": "Chi ti attacca da oltre Portata 2 (un cecchino, una granata, un lancio di Magick da lontano etc..) fallisce.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Basso rischio in tutte e due le forme.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Corrispondenza",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "recinto",
    "spheres": [
      "correspondence"
    ],
    "name": "Recinto",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Sigilli un posto con cui hai un legame: per la scena nessuno ci arriva o ne parte passando per lo spazio (un teletrasporto, un portale, una piega etc..), nemmeno tu, a meno che non sia Magick con una soglia più alta dei poteri che conosci in Corrispondenza. Da lì si entra e si esce solo a piedi, come tutti.\n\nEffetto passivo (Sempre): Chi prova a spostarti nello spazio contro la tua volontà (un teletrasporto, uno scambio di posto, un portale etc..) deve superare una soglia: la più alta fra i poteri che conosci in Corrispondenza e quella del suo effetto.",
    "attivo": "Sigilli un posto con cui hai un legame: per la scena nessuno ci arriva o ne parte passando per lo spazio (un teletrasporto, un portale, una piega etc..), nemmeno tu, a meno che non sia Magick con una soglia più alta dei poteri che conosci in Corrispondenza. Da lì si entra e si esce solo a piedi, come tutti.",
    "passivo": "Chi prova a spostarti nello spazio contro la tua volontà (un teletrasporto, uno scambio di posto, un portale etc..) deve superare una soglia: la più alta fra i poteri che conosci in Corrispondenza e quella del suo effetto.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Corrispondenza",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "labirinto",
    "spheres": [
      "correspondence"
    ],
    "name": "Labirinto",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (3 Quintessenza): Crei un labirinto dimensionale vero e proprio, che chiude in un posto le creature che scegli: per la scena non ne escono, a meno che non sia Magick con una soglia più alta dei poteri che conosci in Corrispondenza.\n\nEffetto passivo (Sempre): In un inseguimento chi ti segue perde il tiro senza tirare, a meno che non usi la Magick. Non perde le tue tracce: in quel momento non ti trova, ma può restarti dietro, e prima o poi capire che qualcosa non va.",
    "attivo": "Crei un labirinto dimensionale vero e proprio, che chiude in un posto le creature che scegli: per la scena non ne escono, a meno che non sia Magick con una soglia più alta dei poteri che conosci in Corrispondenza.",
    "passivo": "In un inseguimento chi ti segue perde il tiro senza tirare, a meno che non usi la Magick. Non perde le tue tracce: in quel momento non ti trova, ma può restarti dietro, e prima o poi capire che qualcosa non va.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "3 Quintessenza",
    "costValue": 3,
    "uses": null,
    "paradox": "Volgare effetto attivo, basso rischio effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Corrispondenza",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 3
      }
    ],
    "rifatto": true,
    "costoAttivo": "3 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "braccio-lungo",
    "spheres": [
      "correspondence"
    ],
    "name": "Braccio lungo",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Per la scena muovi gli oggetti che vedi come se li toccassi con le tue mani: li prendi, li apri, li sposti (la pistola sul tavolo in fondo alla sala, l'interruttore oltre il vetro, il cassetto dall'altra parte della stanza etc..).\n\nEffetto passivo (Sempre): Con la tua azione prendi un oggetto piccolo che vedi, fino all'altro capo della stanza, come se fosse sul tavolo davanti a te.",
    "attivo": "Per la scena muovi gli oggetti che vedi come se li toccassi con le tue mani: li prendi, li apri, li sposti (la pistola sul tavolo in fondo alla sala, l'interruttore oltre il vetro, il cassetto dall'altra parte della stanza etc..).",
    "passivo": "Con la tua azione prendi un oggetto piccolo che vedi, fino all'altro capo della stanza, come se fosse sul tavolo davanti a te.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Volgare se qualcuno guarda, in tutte e due le forme.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Corrispondenza",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "ubiquita",
    "spheres": [
      "correspondence"
    ],
    "name": "Ubiquità",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (3 Quintessenza): Per la scena ti sdoppi e fai due cose insieme, anche in due posti diversi: dividi i dadi fra le due.\nCon Vita + Mente: le due versioni di te sono due corpi, collegati fra loro, e non dividi i dadi.\n\nEffetto passivo (Sempre): Coi tuoi legami la Portata non conta: nei tuoi lanci verso una persona, un posto o una cosa con cui hai un legame, la Portata non si paga.",
    "attivo": "Per la scena ti sdoppi e fai due cose insieme, anche in due posti diversi: dividi i dadi fra le due.\nCon Vita + Mente: le due versioni di te sono due corpi, collegati fra loro, e non dividi i dadi.",
    "passivo": "Coi tuoi legami la Portata non conta: nei tuoi lanci verso una persona, un posto o una cosa con cui hai un legame, la Portata non si paga.",
    "amalgama": "",
    "amalgam": "life",
    "amalgams": [
      "life",
      "mind"
    ],
    "amalgamText": "",
    "flavor": "",
    "cost": "3 Quintessenza",
    "costValue": 3,
    "uses": null,
    "paradox": "Volgare effetto attivo; il passivo segue il lancio.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Corrispondenza",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 4
      }
    ],
    "rifatto": true,
    "costoAttivo": "3 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "colpo-di-fortuna",
    "spheres": [
      "entropy"
    ],
    "name": "Colpo di fortuna",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza, poi 2, poi 3): Subito dopo un tuo tiro di Abilità, ritiri tutti i dadi che hai appena tirato, per 1 Quintessenza. Se il tiro ritirato fallisce puoi ritirare ancora, e ogni volta il costo sale di 1: il secondo ritiro costa 2, il terzo 3, e così via.\n\nEffetto passivo (Sempre): Quando in un tuo tiro escono due 10, il Narratore aggiunge un effetto che descrive lui, come vuole, purché dia qualcosa in più alla scena (un danno in più, una Condizione al bersaglio, un'informazione etc..).",
    "attivo": "Subito dopo un tuo tiro di Abilità, ritiri tutti i dadi che hai appena tirato, per 1 Quintessenza. Se il tiro ritirato fallisce puoi ritirare ancora, e ogni volta il costo sale di 1: il secondo ritiro costa 2, il terzo 3, e così via.",
    "passivo": "Quando in un tuo tiro escono due 10, il Narratore aggiunge un effetto che descrive lui, come vuole, purché dia qualcosa in più alla scena (un danno in più, una Condizione al bersaglio, un'informazione etc..).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Oggi gira bene.»",
    "cost": "1 Quintessenza, poi 2, poi 3",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "ritoccare",
    "formulaName": "Ritoccare",
    "link": "regola",
    "page": "Entropia",
    "hooks": [
      "tiro",
      "salute",
      "condizione",
      "combattimento",
      "altri",
      "narratore"
    ],
    "effects": [
      {
        "on": "nota",
        "roll": "any",
        "nota": "Quando in un tuo tiro escono due 10, il Narratore aggiunge un effetto che descrive lui, come vuole, purché dia qualcosa in più alla scena (un danno in più, una Condizione al bersaglio, un'informazione etc..)."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "1 Quintessenza, poi 2, poi 3",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "il-dado-e-tratto",
    "spheres": [
      "entropy"
    ],
    "name": "Il dado è tratto",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Quando qualcuno prova a manomettere un tuo tiro che deve ancora avvenire (una Magick che ti ostacola, un potere che ti cambia i dadi, una contesa truccata etc..), paghi 1 Quintessenza e i suoi bonus non contano.\nCon Primordio: l'attivo e il passivo valgono anche nei lanci di Magick.\n\nEffetto passivo (Sempre): Quando un tuo tiro riesce, quello che hai fatto resta fatto: chi prova ad andarci contro (a riaprire la porta che hai chiuso, a far cambiare idea a chi hai convinto, a riparare quello che hai rotto etc..) ha 1 dado in meno oppure soglia +1.",
    "attivo": "Quando qualcuno prova a manomettere un tuo tiro che deve ancora avvenire (una Magick che ti ostacola, un potere che ti cambia i dadi, una contesa truccata etc..), paghi 1 Quintessenza e i suoi bonus non contano.\nCon Primordio: l'attivo e il passivo valgono anche nei lanci di Magick.",
    "passivo": "Quando un tuo tiro riesce, quello che hai fatto resta fatto: chi prova ad andarci contro (a riaprire la porta che hai chiuso, a far cambiare idea a chi hai convinto, a riparare quello che hai rotto etc..) ha 1 dado in meno oppure soglia +1.",
    "amalgama": "",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "",
    "flavor": "«Questo lo tengo da parte.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo; con Primordio segue il lancio.",
    "formula": "ritoccare",
    "formulaName": "Ritoccare",
    "link": "regola",
    "page": "Entropia",
    "hooks": [
      "uso",
      "tiro",
      "altri",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "inseparabili",
    "spheres": [
      "entropy"
    ],
    "name": "Inseparabili",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Per la scena il tuo destino e quello del compagno che hai scelto vanno insieme: quando uno dei due prende un vantaggio (dadi in più, un'occasione, un'informazione etc..), lo prende anche l'altro.\n\nEffetto passivo (A sessione nuova): Alla fine di ogni sessione dichiari chi è il tuo compagno per la sessione dopo, così il Narratore può prepararsi; se il Narratore preferisce, lo dichiari all'inizio. Per quella sessione il Narratore non vi divide in scene diverse se voi non volete.",
    "attivo": "Per la scena il tuo destino e quello del compagno che hai scelto vanno insieme: quando uno dei due prende un vantaggio (dadi in più, un'occasione, un'informazione etc..), lo prende anche l'altro.",
    "passivo": "Alla fine di ogni sessione dichiari chi è il tuo compagno per la sessione dopo, così il Narratore può prepararsi; se il Narratore preferisce, lo dichiari all'inizio. Per quella sessione il Narratore non vi divide in scene diverse se voi non volete.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Dove vai tu, vengo io.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "vincolare",
    "formulaName": "Vincolare",
    "link": "verbo",
    "page": "Entropia",
    "hooks": [
      "altri",
      "narratore",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "A sessione nuova",
    "costoVariabile": null
  },
  {
    "id": "non-tutto-il-male",
    "spheres": [
      "entropy"
    ],
    "name": "Non tutto il male...",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza e 2 Paradosso): Su un tuo tiro fallito paghi 2 Quintessenza e prendi 2 punti Paradosso. Il tiro resta fallito e le cose non vanno come ti immaginavi, ma alla fine ti portano dove volevi arrivare, o dove dovevi, e lo decide il Narratore.\n\nEffetto passivo (Sempre): Quando paghi un Prezzo, il Narratore ti dà anche un vantaggio (un'informazione, un'occasione, un oggetto etc..).",
    "attivo": "Su un tuo tiro fallito paghi 2 Quintessenza e prendi 2 punti Paradosso. Il tiro resta fallito e le cose non vanno come ti immaginavi, ma alla fine ti portano dove volevi arrivare, o dove dovevi, e lo decide il Narratore.",
    "passivo": "Quando paghi un Prezzo, il Narratore ti dà anche un vantaggio (un'informazione, un'occasione, un oggetto etc..).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Almeno una cosa buona c'è.»",
    "cost": "2 Quintessenza e 2 Paradosso",
    "costValue": 2,
    "uses": null,
    "paradox": "Nessuno effetto attivo oltre ai 2 punti che paghi, nessuno effetto passivo.",
    "formula": "benedire-e-maledire",
    "formulaName": "Benedire e Maledire",
    "link": "verbo",
    "page": "Entropia",
    "hooks": [
      "combattimento",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "2 Quintessenza e 2 Paradosso",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "testa-o-croce",
    "spheres": [
      "entropy"
    ],
    "name": "Testa o croce",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Prima di un tuo tiro di Abilità dichiari pari o dispari: se il primo dado ti dà ragione hai 2 dadi in più al tuo prossimo tiro, se no 2 in meno.\nCon Primordio: l'attivo vale anche per i lanci di Magick.\n\nEffetto passivo (Una volta per scena): Davanti a una scelta fra due strade (due porte, due sospetti, due fili da tagliare etc..), lanci una moneta: il Narratore ti dice quale delle due, in quel momento, è la migliore per te, dal suo punto di vista.",
    "attivo": "Prima di un tuo tiro di Abilità dichiari pari o dispari: se il primo dado ti dà ragione hai 2 dadi in più al tuo prossimo tiro, se no 2 in meno.\nCon Primordio: l'attivo vale anche per i lanci di Magick.",
    "passivo": "Davanti a una scelta fra due strade (due porte, due sospetti, due fili da tagliare etc..), lanci una moneta: il Narratore ti dice quale delle due, in quel momento, è la migliore per te, dal suo punto di vista.",
    "amalgama": "",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "",
    "flavor": "«Pari o dispari, e via.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo; con Primordio segue il lancio.",
    "formula": "ritoccare",
    "formulaName": "Ritoccare",
    "link": "regola",
    "page": "Entropia",
    "hooks": [
      "uso",
      "tiro",
      "combattimento"
    ],
    "effects": [
      {
        "mode": "attivo",
        "on": "nota",
        "roll": "abilita",
        "nota": "Prima di un tuo tiro di Abilità dichiari pari o dispari: se il primo dado ti dà ragione hai 2 dadi in più al tuo prossimo tiro, se no 2 in meno."
      },
      {
        "mode": "attivo",
        "on": "nota",
        "roll": "magick",
        "requires": "prime",
        "nota": "l'attivo vale anche per i lanci di Magick."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Una volta per scena",
    "costoVariabile": null
  },
  {
    "id": "angolo-morto",
    "spheres": [
      "entropy"
    ],
    "name": "Angolo morto",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Quando qualcuno ti prende di mira (ti spara, ti lancia qualcosa, ti punta contro un'arma etc..), fra voi due si mette in mezzo qualcosa (una colonna, un'auto, un bancone etc..): l'attacco non parte, e per colpirti deve prima spendere un'azione a spostarsi.\n\nEffetto passivo (Una volta per combattimento): All'inizio di ogni scontro parti riparato dal caso: c'è sempre qualcosa che ti copre (un muretto, un'auto parcheggiata, una colonna etc..), e chi ti attacca ha 1 dado in meno oppure soglia +1. La copertura dura poco: sparisce appena un nemico si sposta.",
    "attivo": "Quando qualcuno ti prende di mira (ti spara, ti lancia qualcosa, ti punta contro un'arma etc..), fra voi due si mette in mezzo qualcosa (una colonna, un'auto, un bancone etc..): l'attacco non parte, e per colpirti deve prima spendere un'azione a spostarsi.",
    "passivo": "All'inizio di ogni scontro parti riparato dal caso: c'è sempre qualcosa che ti copre (un muretto, un'auto parcheggiata, una colonna etc..), e chi ti attacca ha 1 dado in meno oppure soglia +1. La copertura dura poco: sparisce appena un nemico si sposta.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Per fortuna c'era la colonna.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "proteggere",
    "formulaName": "Proteggere",
    "link": "verbo",
    "page": "Entropia",
    "hooks": [
      "uso",
      "combattimento"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Una volta per combattimento",
    "costoVariabile": null
  },
  {
    "id": "chi-la-fa-l-aspetti",
    "spheres": [
      "entropy"
    ],
    "name": "Chi la fa l'aspetti",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (da 1 a 3 Quintessenza): Chi ti ha fatto del male subisce la stessa cosa che ha fatto a te, entro la fine della sessione: se ti ha sparato, un colpo di pistola arriva anche a lui. Il costo va da 1 a 3 Quintessenza secondo quello che hai subito, e lo decide il Narratore, che decide anche come e quando il caso lo raggiunge.\n\nEffetto passivo (Sempre): Quando qualcuno ti fa del male, in qualunque modo (una ferita, un torto, un danno ai tuoi affari etc..), la prima volta che agisci contro di lui hai 2 dadi in più.",
    "attivo": "Chi ti ha fatto del male subisce la stessa cosa che ha fatto a te, entro la fine della sessione: se ti ha sparato, un colpo di pistola arriva anche a lui. Il costo va da 1 a 3 Quintessenza secondo quello che hai subito, e lo decide il Narratore, che decide anche come e quando il caso lo raggiunge.",
    "passivo": "Quando qualcuno ti fa del male, in qualunque modo (una ferita, un torto, un danno ai tuoi affari etc..), la prima volta che agisci contro di lui hai 2 dadi in più.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Me lo ricordo, il tuo nome.»",
    "cost": "da 1 a 3 Quintessenza",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "benedire-e-maledire",
    "formulaName": "Benedire e Maledire",
    "link": "verbo",
    "page": "Entropia",
    "hooks": [
      "altri",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "da 1 a 3 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 3
    }
  },
  {
    "id": "fortuna-del-principiante",
    "spheres": [
      "entropy"
    ],
    "name": "Fortuna del principiante",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Un tuo tiro di un'Abilità in cui hai un solo pallino riesce, senza tirare.\n\nEffetto passivo (Sempre): Quando provi per la prima volta una cosa che non hai mai fatto (guidare un camion, scassinare una cassaforte, parlare in tribunale etc..), hai 2 dadi in più.\nCon Primordio: vale anche la prima volta che lanci un effetto di Magick nuovo per te.",
    "attivo": "Un tuo tiro di un'Abilità in cui hai un solo pallino riesce, senza tirare.",
    "passivo": "Quando provi per la prima volta una cosa che non hai mai fatto (guidare un camion, scassinare una cassaforte, parlare in tribunale etc..), hai 2 dadi in più.\nCon Primordio: vale anche la prima volta che lanci un effetto di Magick nuovo per te.",
    "amalgama": "",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "",
    "flavor": "«Non l'avevo mai fatto prima.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo; con Primordio segue il lancio.",
    "formula": "benedire-e-maledire",
    "formulaName": "Benedire e Maledire",
    "link": "regola",
    "page": "Entropia",
    "hooks": [
      "uso",
      "tiro"
    ],
    "effects": [
      {
        "on": "dice",
        "value": 2,
        "roll": "abilita",
        "nota": "Quando provi per la prima volta una cosa che non hai mai fatto (guidare un camion, scassinare una cassaforte, parlare in tribunale etc..), hai 2 dadi in più."
      },
      {
        "on": "dice",
        "value": 2,
        "roll": "magick",
        "requires": "prime",
        "nota": "vale anche la prima volta che lanci un effetto di Magick nuovo per te."
      },
      {
        "mode": "attivo",
        "on": "autoSuccess",
        "roll": "abilita",
        "when": "abilita1",
        "nota": "Un tuo tiro di un'Abilità in cui hai un solo pallino riesce, senza tirare."
      }
    ],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "il-banco-vince",
    "spheres": [
      "entropy"
    ],
    "name": "Il banco vince...",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Azione, senza Quintessenza): Quando agisci, dichiari che la tua azione è lucrare sulla sfortuna: se in quell'azione prendi 2 punti Paradosso o più, guadagni 1 Quintessenza. Non costa Quintessenza: è l'eccezione di questo potere.\n\nEffetto passivo (Sempre): Quando a qualcun altro in scena va male un tiro di Abilità, al tuo prossimo tiro di Abilità hai 2 dadi in più, qualunque sia: non lo scegli tu.\nCon Primordio: quando a qualcun altro in scena fallisce un lancio di Magick, recuperi 1 Quintessenza.",
    "attivo": "Quando agisci, dichiari che la tua azione è lucrare sulla sfortuna: se in quell'azione prendi 2 punti Paradosso o più, guadagni 1 Quintessenza. Non costa Quintessenza: è l'eccezione di questo potere.",
    "passivo": "Quando a qualcun altro in scena va male un tiro di Abilità, al tuo prossimo tiro di Abilità hai 2 dadi in più, qualunque sia: non lo scegli tu.\nCon Primordio: quando a qualcun altro in scena fallisce un lancio di Magick, recuperi 1 Quintessenza.",
    "amalgama": "",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "",
    "flavor": "«...sempre.»",
    "cost": "Azione, senza Quintessenza",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "drenare",
    "formulaName": "Drenare",
    "link": "regola",
    "page": "Entropia",
    "hooks": [
      "tiro",
      "abilita",
      "quintessenza",
      "paradosso",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "Azione, senza Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
  },
  {
    "id": "legge-di-murphy",
    "spheres": [
      "entropy"
    ],
    "name": "Legge di Murphy",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena, quando un nemico fallisce un tiro, paga anche un Prezzo, scelto dal Narratore.",
    "attivo": "Una volta per scena, quando un nemico fallisce un tiro, paga anche un Prezzo, scelto dal Narratore.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Se può andare storto, a lui va storto.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "benedire-e-maledire",
    "formulaName": "Benedire e Maledire",
    "link": "verbo",
    "page": "Entropia",
    "hooks": [
      "uso",
      "altri",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "niente-al-caso",
    "spheres": [
      "entropy"
    ],
    "name": "Niente al caso",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena, se nella scena prima ti sei preparato (uno studio, un sopralluogo, una prova), in un tiro di Abilità non tiri: se hai almeno 2 dadi, riesci.\n\nEffetto Amalgama: Accesso con Primordio: vale anche nei lanci di Magick, se dopo la soglia ti restano almeno 2 dadi.",
    "attivo": "Una volta per scena, se nella scena prima ti sei preparato (uno studio, un sopralluogo, una prova), in un tiro di Abilità non tiri: se hai almeno 2 dadi, riesci.",
    "passivo": "",
    "amalgama": "Con Primordio: vale anche nei lanci di Magick, se dopo la soglia ti restano almeno 2 dadi.",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "Accesso con Primordio: vale anche nei lanci di Magick, se dopo la soglia ti restano almeno 2 dadi.",
    "flavor": "«L'avevo provato cento volte.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo; con Primordio segue il lancio.",
    "formula": "dominare",
    "formulaName": "Dominare",
    "link": "verbo",
    "page": "Entropia",
    "hooks": [
      "uso",
      "tiro"
    ],
    "effects": [
      {
        "mode": "attivo",
        "on": "autoSuccess",
        "roll": "abilita",
        "when": "dadi2",
        "nota": "in un tiro di Abilità non tiri: se hai almeno 2 dadi, riesci"
      },
      {
        "mode": "attivo",
        "on": "autoSuccess",
        "roll": "magick",
        "when": "dadi2",
        "requires": "prime",
        "nota": "Accesso con Primordio: vale anche nei lanci di Magick, se dopo la soglia ti restano almeno 2 dadi."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "si-trova-tutto",
    "spheres": [
      "entropy"
    ],
    "name": "Si trova tutto",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Sai subito dove trovare quello che ti serve, nel punto più vicino, e il caso ti ci porta; se ti serve una persona, può essere lei a venire da te. Devi sapere cosa ti serve: non puoi chiedere cose a caso.\n\nEffetto passivo (A sessione nuova): Fra una sessione e l'altra trovi l'oggetto che cerchi, a un prezzo che di solito decide il Narratore (in soldi o in un favore).",
    "attivo": "Sai subito dove trovare quello che ti serve, nel punto più vicino, e il caso ti ci porta; se ti serve una persona, può essere lei a venire da te. Devi sapere cosa ti serve: non puoi chiedere cose a caso.",
    "passivo": "Fra una sessione e l'altra trovi l'oggetto che cerchi, a un prezzo che di solito decide il Narratore (in soldi o in un favore).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Ho un cugino che ce l'ha.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "condizionare",
    "formulaName": "Condizionare",
    "link": "verbo",
    "page": "Entropia",
    "hooks": [
      "narratore",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "A sessione nuova",
    "costoVariabile": null
  },
  {
    "id": "tiri-gemelli",
    "spheres": [
      "entropy"
    ],
    "name": "Tiri gemelli",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Azione, una volta per scena): In un tiro in cui tu e un compagno vi aiutate, oltre all'Attributo e all'Abilità migliori avete anche 2 dadi in più.\n\nEffetto passivo (Sempre): Quando tu e un compagno fate lo stesso tiro di Abilità e uno dei due aiuta l'altro, il tiro si fa con l'Attributo migliore e con l'Abilità migliore fra i vostri.\nCon Primordio: vale anche quando il tiro è un lancio di Magick, e con lui l'attivo.",
    "attivo": "In un tiro in cui tu e un compagno vi aiutate, oltre all'Attributo e all'Abilità migliori avete anche 2 dadi in più.",
    "passivo": "Quando tu e un compagno fate lo stesso tiro di Abilità e uno dei due aiuta l'altro, il tiro si fa con l'Attributo migliore e con l'Abilità migliore fra i vostri.\nCon Primordio: vale anche quando il tiro è un lancio di Magick, e con lui l'attivo.",
    "amalgama": "",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "",
    "flavor": "«Stesso tiro, stessa sorte.»",
    "cost": "Azione, una volta per scena",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo; con Primordio segue il lancio.",
    "formula": "benedire-e-maledire",
    "formulaName": "Benedire e Maledire",
    "link": "regola",
    "page": "Entropia",
    "hooks": [
      "uso",
      "combattimento",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "Azione, una volta per scena",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "contagio",
    "spheres": [
      "entropy"
    ],
    "name": "Contagio",
    "dot": 3,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Una Condizione che infliggi con Entropia passa anche a chi tocca il bersaglio.\n\nEffetto Amalgama: Accesso con Vita: passano anche le Condizioni fisiche.\nAccesso con Mente: passano anche le Condizioni mentali.\nAccesso con Spirito: passano anche le Condizioni soprannaturali.",
    "attivo": "",
    "passivo": "Una Condizione che infliggi con Entropia passa anche a chi tocca il bersaglio.",
    "amalgama": "Con Vita: passano anche le Condizioni fisiche.\nCon Mente: passano anche le Condizioni mentali.\nCon Spirito: passano anche le Condizioni soprannaturali.",
    "amalgam": "mind",
    "amalgams": [
      "mind",
      "spirit",
      "life"
    ],
    "amalgamText": "Accesso con Vita: passano anche le Condizioni fisiche.\nAccesso con Mente: passano anche le Condizioni mentali.\nAccesso con Spirito: passano anche le Condizioni soprannaturali.",
    "flavor": "«Stagli lontano, è contagioso.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo; il passivo segue il lancio che ha dato la Condizione.",
    "formula": "benedire-e-maledire",
    "formulaName": "Benedire e Maledire",
    "link": "verbo",
    "page": "Entropia",
    "hooks": [
      "condizione",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "fuori-dai-piedi",
    "spheres": [
      "entropy"
    ],
    "name": "Fuori dai piedi",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (da 1 a 4 Quintessenza): Qualcuno in scena che non vuoi lì viene spinto via, subito, da una ragione qualunque (una telefonata, un ordine, un imprevisto etc..). Il costo va da 1 a 4 Quintessenza e lo decide il Narratore, che decide anche come esce di scena.\n\nEffetto passivo (A sessione nuova): Nomini qualcuno che non vuoi vedere (un creditore, un rivale, un ex etc..): per la sessione il caso fa in modo che le vostre strade non si incrocino, finché non vai a cercarlo tu.",
    "attivo": "Qualcuno in scena che non vuoi lì viene spinto via, subito, da una ragione qualunque (una telefonata, un ordine, un imprevisto etc..). Il costo va da 1 a 4 Quintessenza e lo decide il Narratore, che decide anche come esce di scena.",
    "passivo": "Nomini qualcuno che non vuoi vedere (un creditore, un rivale, un ex etc..): per la sessione il caso fa in modo che le vostre strade non si incrocino, finché non vai a cercarlo tu.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Oggi non viene, fidati.»",
    "cost": "da 1 a 4 Quintessenza",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "condizionare",
    "formulaName": "Condizionare",
    "link": "verbo",
    "page": "Entropia",
    "hooks": [
      "uso",
      "altri",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "da 1 a 4 Quintessenza",
    "cadenzaPassivo": "A sessione nuova",
    "costoVariabile": {
      "min": 1,
      "max": 4
    }
  },
  {
    "id": "il-fucile-di-echov",
    "spheres": [
      "entropy",
      "matter"
    ],
    "name": "Il fucile di Čechov",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (da 1 a 3 Quintessenza): Quando usi l'oggetto che hai dichiarato, per quello a cui serve, paghi da 1 a 3 Quintessenza e il tiro riesce senza tirare. Quanto paghi lo decide il Narratore, secondo il tiro.\n\nEffetto passivo (A sessione nuova): A inizio sessione dichiari un oggetto per la sessione (il tuo coltello, la corda nello zaino, l'accendino di tuo padre etc..). Quando lo usi per quello a cui serve, e non per altro (un coltello per tagliare, una corda per legare o per arrampicarti), hai 2 dadi in più.",
    "attivo": "Quando usi l'oggetto che hai dichiarato, per quello a cui serve, paghi da 1 a 3 Quintessenza e il tiro riesce senza tirare. Quanto paghi lo decide il Narratore, secondo il tiro.",
    "passivo": "A inizio sessione dichiari un oggetto per la sessione (il tuo coltello, la corda nello zaino, l'accendino di tuo padre etc..). Quando lo usi per quello a cui serve, e non per altro (un coltello per tagliare, una corda per legare o per arrampicarti), hai 2 dadi in più.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Quel fucile sul muro, prima o poi, spara.»",
    "cost": "da 1 a 3 Quintessenza",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "benedire-e-maledire",
    "formulaName": "Benedire e Maledire",
    "link": "verbo",
    "page": "Entropia",
    "hooks": [
      "uso",
      "tiro"
    ],
    "effects": [
      {
        "on": "dice",
        "value": 2,
        "roll": "any",
        "nota": "Quando lo usi per quello a cui serve, e non per altro (un coltello per tagliare, una corda per legare o per arrampicarti), hai 2 dadi in più."
      },
      {
        "mode": "attivo",
        "on": "autoSuccess",
        "roll": "any",
        "nota": "Quando usi l'oggetto che hai dichiarato, per quello a cui serve, paghi da 1 a 3 Quintessenza e il tiro riesce senza tirare."
      }
    ],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "da 1 a 3 Quintessenza",
    "cadenzaPassivo": "A sessione nuova",
    "costoVariabile": {
      "min": 1,
      "max": 3
    }
  },
  {
    "id": "ladro-di-fortuna",
    "spheres": [
      "entropy"
    ],
    "name": "Ladro di fortuna",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza ogni 2 dadi): Paghi Quintessenza su un tiro appena fatto da un nemico: per ogni Quintessenza gli togli 2 dadi riusciti, e li aggiungi al tuo prossimo tiro.\nCon Primordio: vale anche coi lanci di Magick, sia per togliere il dado sia per metterlo, nell'attivo e nel passivo.\n\nEffetto passivo (Una volta per scena): Togli un dado riuscito a un tiro appena fatto da qualcuno che non ti è nemico (un compagno, un alleato, un passante etc..), e lo aggiungi al tuo prossimo tiro.",
    "attivo": "Paghi Quintessenza su un tiro appena fatto da un nemico: per ogni Quintessenza gli togli 2 dadi riusciti, e li aggiungi al tuo prossimo tiro.\nCon Primordio: vale anche coi lanci di Magick, sia per togliere il dado sia per metterlo, nell'attivo e nel passivo.",
    "passivo": "Togli un dado riuscito a un tiro appena fatto da qualcuno che non ti è nemico (un compagno, un alleato, un passante etc..), e lo aggiungi al tuo prossimo tiro.",
    "amalgama": "",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "",
    "flavor": "«Grazie, questo lo prendo io.»",
    "cost": "1 Quintessenza ogni 2 dadi",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo; con Primordio segue il lancio.",
    "formula": "drenare",
    "formulaName": "Drenare",
    "link": "effetto",
    "page": "Entropia",
    "hooks": [
      "uso",
      "tiro"
    ],
    "effects": [
      {
        "on": "dice",
        "value": 1,
        "roll": "abilita",
        "nota": "Togli un dado riuscito a un tiro appena fatto da qualcuno che non ti è nemico (un compagno, un alleato, un passante etc..), e lo aggiungi al tuo prossimo tiro."
      },
      {
        "on": "dice",
        "value": 1,
        "roll": "magick",
        "requires": "prime",
        "nota": "vale anche coi lanci di Magick, sia per togliere il dado sia per metterlo, nell'attivo e nel passivo."
      }
    ],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza ogni 2 dadi",
    "cadenzaPassivo": "Una volta per scena",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "porto-sfortuna-io",
    "spheres": [
      "entropy"
    ],
    "name": "Porto sfortuna io",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (da 1 a 3 Quintessenza): Quando qualcuno fallisce un tiro in tua presenza, paghi Quintessenza: la Condizione la scegli tu, purché plausibile (si aggiornerà a catena col rifacimento delle Condizioni), e per ogni Quintessenza che paghi prende anche 2 danni Superficiali, fino a 3 Quintessenza.\n\nEffetto passivo (Sempre): Quando qualcuno fallisce un tiro in tua presenza, compagni compresi, il Narratore gli dà anche una Condizione o dei danni, a sua scelta.\nCon Primordio: il passivo e l'attivo valgono anche quando qualcuno fallisce un lancio di Magick.",
    "attivo": "Quando qualcuno fallisce un tiro in tua presenza, paghi Quintessenza: la Condizione la scegli tu, purché plausibile (si aggiornerà a catena col rifacimento delle Condizioni), e per ogni Quintessenza che paghi prende anche 2 danni Superficiali, fino a 3 Quintessenza.",
    "passivo": "Quando qualcuno fallisce un tiro in tua presenza, compagni compresi, il Narratore gli dà anche una Condizione o dei danni, a sua scelta.\nCon Primordio: il passivo e l'attivo valgono anche quando qualcuno fallisce un lancio di Magick.",
    "amalgama": "",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "",
    "flavor": "«La sfortuna la porto io.»",
    "cost": "da 1 a 3 Quintessenza",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "drenare",
    "formulaName": "Drenare",
    "link": "effetto",
    "page": "Entropia",
    "hooks": [
      "uso",
      "tiro",
      "altri",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "da 1 a 3 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 3
    }
  },
  {
    "id": "roulette",
    "spheres": [
      "entropy",
      "prime"
    ],
    "name": "Roulette",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Il rischio: Paradosso doppio e 1 Aggravato): Quando prendi Paradosso puoi tirare un dado. Pari non lo prendi tu: va da qualche parte, e il Narratore dice dove. Dispari lo prendi doppio, e in più subisci 1 danno Aggravato paradossale, che resta bloccato fino a fine scena come quelli dell'Ustione: nessuna Magick lo chiude.\n\nEffetto passivo (Una volta per scena): Quando un tuo dado rosso del Paradosso fa 1 o 10, puoi ritirarlo, e vale il secondo risultato.",
    "attivo": "Quando prendi Paradosso puoi tirare un dado. Pari non lo prendi tu: va da qualche parte, e il Narratore dice dove. Dispari lo prendi doppio, e in più subisci 1 danno Aggravato paradossale, che resta bloccato fino a fine scena come quelli dell'Ustione: nessuna Magick lo chiude.",
    "passivo": "Quando un tuo dado rosso del Paradosso fa 1 o 10, puoi ritirarlo, e vale il secondo risultato.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Rosso o nero?»",
    "cost": "Il rischio: Paradosso doppio e 1 Aggravato",
    "costValue": 0,
    "uses": null,
    "paradox": "Lavora sul Paradosso, non ne fa di suo.",
    "formula": "proteggere",
    "formulaName": "Proteggere",
    "link": "verbo",
    "page": "Entropia",
    "hooks": [
      "tiro",
      "paradosso",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "Il rischio: Paradosso doppio e 1 Aggravato",
    "cadenzaPassivo": "Una volta per scena",
    "costoVariabile": null
  },
  {
    "id": "scommessa",
    "spheres": [
      "entropy",
      "prime"
    ],
    "name": "Scommessa",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (La posta, una volta per sessione): A inizio scena scommetti su come finisce (chi vince, chi scappa, cosa si rompe, chi sbaglia un lancio di Magick etc..) e dici quanta Quintessenza vuoi vincere. Se ci prendi la guadagni; se sbagli prendi 2 punti Paradosso per ogni Quintessenza che volevi vincere: 3 Quintessenza in palio sono 6 punti Paradosso. Puoi darti da fare perché vada come hai detto, ma la scommessa deve essere incerta: una scommessa già vinta il Narratore non la accetta. Con un'Amalgama scommetti anche su una parte della scena che tocca quella Sfera.\nCon Corrispondenza: chi arriva, chi se ne va, dove va a finire una cosa.\nCon Forza: cosa esplode, cosa prende fuoco, cosa resta al buio.\nCon Materia: cosa si rompe, cosa salta fuori, in mano a chi finisce un oggetto.\nCon Mente: chi cambia idea, chi crolla, chi dice la verità.\nCon Spirito: cosa fanno gli spiriti e i morti della scena.\nCon Tempo: quando succede una cosa: chi arriva prima, quanto dura, entro quando.\nCon Vita: chi resta ferito, chi cade, chi si salva.\n\nEffetto passivo (Una volta per scena): Chiedi al Narratore le quote di una cosa che sta per succedere (uno scontro, una corsa, una trattativa etc..): ti dice chi è favorito, e di quanto (di poco, di molto, senza storia).",
    "attivo": "A inizio scena scommetti su come finisce (chi vince, chi scappa, cosa si rompe, chi sbaglia un lancio di Magick etc..) e dici quanta Quintessenza vuoi vincere. Se ci prendi la guadagni; se sbagli prendi 2 punti Paradosso per ogni Quintessenza che volevi vincere: 3 Quintessenza in palio sono 6 punti Paradosso. Puoi darti da fare perché vada come hai detto, ma la scommessa deve essere incerta: una scommessa già vinta il Narratore non la accetta. Con un'Amalgama scommetti anche su una parte della scena che tocca quella Sfera.\nCon Corrispondenza: chi arriva, chi se ne va, dove va a finire una cosa.\nCon Forza: cosa esplode, cosa prende fuoco, cosa resta al buio.\nCon Materia: cosa si rompe, cosa salta fuori, in mano a chi finisce un oggetto.\nCon Mente: chi cambia idea, chi crolla, chi dice la verità.\nCon Spirito: cosa fanno gli spiriti e i morti della scena.\nCon Tempo: quando succede una cosa: chi arriva prima, quanto dura, entro quando.\nCon Vita: chi resta ferito, chi cade, chi si salva.",
    "passivo": "Chiedi al Narratore le quote di una cosa che sta per succedere (uno scontro, una corsa, una trattativa etc..): ti dice chi è favorito, e di quanto (di poco, di molto, senza storia).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Scommettiamo?»",
    "cost": "La posta, una volta per sessione",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Il Paradosso è la posta, non ne fa altro di suo.",
    "formula": "destinare",
    "formulaName": "Destinare",
    "link": "tavolo",
    "page": "Entropia",
    "hooks": [
      "uso",
      "quintessenza",
      "paradosso",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "La posta, una volta per sessione",
    "cadenzaPassivo": "Una volta per scena",
    "costoVariabile": null
  },
  {
    "id": "il-pezzo-mancante",
    "spheres": [
      "entropy",
      "matter",
      "time"
    ],
    "name": "Il pezzo mancante",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (da 1 a 3 Quintessenza): Quando al gruppo manca una cosa per andare avanti (una chiave, un documento, un pezzo etc..), ce l'hai tu. Il Narratore dice come l'hai avuta e quanto ti è costata: da 1 a 3 Quintessenza, secondo quanto conta la cosa.\n\nEffetto passivo (Una volta per scena): Capisci sempre cosa manca per andare avanti: chiedi al Narratore cosa serve alla scena per procedere, e lui te lo dice (un nome, una prova, un permesso etc..).",
    "attivo": "Quando al gruppo manca una cosa per andare avanti (una chiave, un documento, un pezzo etc..), ce l'hai tu. Il Narratore dice come l'hai avuta e quanto ti è costata: da 1 a 3 Quintessenza, secondo quanto conta la cosa.",
    "passivo": "Capisci sempre cosa manca per andare avanti: chiedi al Narratore cosa serve alla scena per procedere, e lui te lo dice (un nome, una prova, un permesso etc..).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Cercavate questa?»",
    "cost": "da 1 a 3 Quintessenza",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "trovare",
    "formulaName": "Trovare",
    "link": "tavolo",
    "page": "Entropia",
    "hooks": [
      "uso",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 3
      }
    ],
    "rifatto": true,
    "costoAttivo": "da 1 a 3 Quintessenza",
    "cadenzaPassivo": "Una volta per scena",
    "costoVariabile": {
      "min": 1,
      "max": 3
    }
  },
  {
    "id": "nerf",
    "spheres": [
      "entropy"
    ],
    "name": "Nerf",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1, 2 o 3 Quintessenza): Quando un nemico prova di nuovo un'azione che ha già fatto nella sessione (lo stesso colpo, lo stesso trucco, la stessa minaccia etc..), gli fallisce senza tiro. Paghi 1 Quintessenza se è un tiro di Abilità, 2 se è un tiro di combattimento (un attacco, una parata etc..).\nCon Primordio: vale anche su un lancio di Magick, per 3 Quintessenza.\n\nEffetto passivo (Sempre): Un nemico a pochi passi da te non prende bonus ai suoi tiri: niente dadi in più né soglia più bassa, da nessuna fonte (un'arma migliore, l'aiuto di un compagno, un potere etc..).\nCon Primordio: vale anche nei suoi lanci di Magick.",
    "attivo": "Quando un nemico prova di nuovo un'azione che ha già fatto nella sessione (lo stesso colpo, lo stesso trucco, la stessa minaccia etc..), gli fallisce senza tiro. Paghi 1 Quintessenza se è un tiro di Abilità, 2 se è un tiro di combattimento (un attacco, una parata etc..).\nCon Primordio: vale anche su un lancio di Magick, per 3 Quintessenza.",
    "passivo": "Un nemico a pochi passi da te non prende bonus ai suoi tiri: niente dadi in più né soglia più bassa, da nessuna fonte (un'arma migliore, l'aiuto di un compagno, un potere etc..).\nCon Primordio: vale anche nei suoi lanci di Magick.",
    "amalgama": "",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "",
    "flavor": "«Questa l'ho già vista.»",
    "cost": "1, 2 o 3 Quintessenza",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "benedire-e-maledire",
    "formulaName": "Benedire e Maledire",
    "link": "verbo",
    "page": "Entropia",
    "hooks": [
      "uso",
      "combattimento",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 3
      }
    ],
    "rifatto": true,
    "costoAttivo": "1, 2 o 3 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 3
    }
  },
  {
    "id": "tarocchi",
    "spheres": [
      "entropy"
    ],
    "name": "Tarocchi",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Durante la sessione rifai la lettura, se hai il tempo di farla: ti prende una scena intera. Hai nuovi indizi e altre tre domande, e le carte ti danno qualcosa in cambio, scelto dal Narratore, fino a fine sessione: un alleato, un Background, un Pregio, qualcosa che ti serve.\n\nEffetto passivo (A sessione nuova): A inizio sessione il Narratore ti fa una lettura dei tarocchi: ti dà degli indizi in forma di carte (una persona, un luogo, un evento etc..), cose che nella sessione dovrebbero manifestarsi. Poi puoi fargli tre domande sulla trama.",
    "attivo": "Durante la sessione rifai la lettura, se hai il tempo di farla: ti prende una scena intera. Hai nuovi indizi e altre tre domande, e le carte ti danno qualcosa in cambio, scelto dal Narratore, fino a fine sessione: un alleato, un Background, un Pregio, qualcosa che ti serve.",
    "passivo": "A inizio sessione il Narratore ti fa una lettura dei tarocchi: ti dà degli indizi in forma di carte (una persona, un luogo, un evento etc..), cose che nella sessione dovrebbero manifestarsi. Poi puoi fargli tre domande sulla trama.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Le carte non mentono.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "destinare",
    "formulaName": "Destinare",
    "link": "tavolo",
    "page": "Entropia",
    "hooks": [
      "uso",
      "narratore",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 3
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza",
    "cadenzaPassivo": "A sessione nuova",
    "costoVariabile": null
  },
  {
    "id": "il-narratore-ti-ascolta",
    "spheres": [
      "entropy"
    ],
    "name": "Il Narratore ti ascolta",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (da 1 a 5 Quintessenza): Proponi una svolta nella scena, e il Narratore la mette in gioco: è un imprevisto (un incidente, un colpo di fortuna, un guasto etc..). Paghi da 1 a 5 Quintessenza, secondo quanto chiedi, e decide il Narratore. Con un'Amalgama la svolta può essere d'altro tipo.\nCon Corrispondenza: un arrivo o una partenza.\nCon Forza: un'esplosione, un blackout, un incendio.\nCon Materia: un oggetto che salta fuori o che si rompe.\nCon Mente: una notizia, una confessione, un'idea.\nCon Primordio: un'ondata di Quintessenza o di Paradosso.\nCon Spirito: una presenza, un segno, un morto che parla.\nCon Tempo: un ritardo, un anticipo, una scadenza.\nCon Vita: una malattia, una nascita, una ferita.\n\nEffetto passivo (Una volta per scena): Quando il Narratore fissa un Prezzo (quello che costa ribaltare un tiro fallito), o sceglie dal menù del Paradosso cosa succede a un tuo compagno, puoi proporlo tu: il Narratore ti ascolta, e se la proposta regge la usa.",
    "attivo": "Proponi una svolta nella scena, e il Narratore la mette in gioco: è un imprevisto (un incidente, un colpo di fortuna, un guasto etc..). Paghi da 1 a 5 Quintessenza, secondo quanto chiedi, e decide il Narratore. Con un'Amalgama la svolta può essere d'altro tipo.\nCon Corrispondenza: un arrivo o una partenza.\nCon Forza: un'esplosione, un blackout, un incendio.\nCon Materia: un oggetto che salta fuori o che si rompe.\nCon Mente: una notizia, una confessione, un'idea.\nCon Primordio: un'ondata di Quintessenza o di Paradosso.\nCon Spirito: una presenza, un segno, un morto che parla.\nCon Tempo: un ritardo, un anticipo, una scadenza.\nCon Vita: una malattia, una nascita, una ferita.",
    "passivo": "Quando il Narratore fissa un Prezzo (quello che costa ribaltare un tiro fallito), o sceglie dal menù del Paradosso cosa succede a un tuo compagno, puoi proporlo tu: il Narratore ti ascolta, e se la proposta regge la usa.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«E se proprio adesso...»",
    "cost": "da 1 a 5 Quintessenza",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "rivoluzionare",
    "formulaName": "Rivoluzionare",
    "link": "tavolo",
    "page": "Entropia",
    "hooks": [
      "uso",
      "quintessenza",
      "paradosso",
      "combattimento",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 4
      }
    ],
    "rifatto": true,
    "costoAttivo": "da 1 a 5 Quintessenza",
    "cadenzaPassivo": "Una volta per scena",
    "costoVariabile": {
      "min": 1,
      "max": 5
    }
  },
  {
    "id": "scambio-di-sorte",
    "spheres": [
      "entropy"
    ],
    "name": "Scambio di sorte",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza, 2 sulla Magick): Prima di un tuo tiro di Abilità, scambi il suo esito con quello di un tiro che farà un altro bersaglio in scena, anche un nemico (la sua riuscita diventa tua, il tuo fallimento suo, o viceversa). Il Narratore tira in segreto per entrambi e rivela gli esiti.\nCon Primordio: l'attivo e il passivo valgono anche per i lanci di Magick, e lì l'attivo costa 2 Quintessenza.\n\nEffetto passivo (Una volta per scena): In una contesa (tu contro qualcuno, tiro contro tiro), dopo i tiri scambi un tuo dado con uno dell'altro, per esempio il suo migliore col tuo peggiore.",
    "attivo": "Prima di un tuo tiro di Abilità, scambi il suo esito con quello di un tiro che farà un altro bersaglio in scena, anche un nemico (la sua riuscita diventa tua, il tuo fallimento suo, o viceversa). Il Narratore tira in segreto per entrambi e rivela gli esiti.\nCon Primordio: l'attivo e il passivo valgono anche per i lanci di Magick, e lì l'attivo costa 2 Quintessenza.",
    "passivo": "In una contesa (tu contro qualcuno, tiro contro tiro), dopo i tiri scambi un tuo dado con uno dell'altro, per esempio il suo migliore col tuo peggiore.",
    "amalgama": "",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "",
    "flavor": "«Facciamo cambio?»",
    "cost": "1 Quintessenza, 2 sulla Magick",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo; con Primordio segue il lancio.",
    "formula": "drenare",
    "formulaName": "Drenare",
    "link": "effetto",
    "page": "Entropia",
    "hooks": [
      "uso",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 3
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza, 2 sulla Magick",
    "cadenzaPassivo": "Una volta per scena",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "a-stordire",
    "spheres": [
      "forces"
    ],
    "name": "Lascia il segno",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Per un turno, quando fai danni, infliggi anche una Condizione, purché plausibile col colpo (si aggiornerà a catena col rifacimento delle Condizioni).\n\nEffetto passivo (Sempre): Quando conti gli Ambiti di un tuo lancio di Forza, puoi sempre barattare la Potenza con le Condizioni, purché lo dichiari prima del tiro: il livello che metti in una vale per l'altra (Potenza 3 può diventare Condizioni 3, e il contrario).",
    "attivo": "Per un turno, quando fai danni, infliggi anche una Condizione, purché plausibile col colpo (si aggiornerà a catena col rifacimento delle Condizioni).",
    "passivo": "Quando conti gli Ambiti di un tuo lancio di Forza, puoi sempre barattare la Potenza con le Condizioni, purché lo dichiari prima del tiro: il livello che metti in una vale per l'altra (Potenza 3 può diventare Condizioni 3, e il contrario).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Dormi, che è meglio.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Segue il lancio in tutte e due le forme; con un'arma o a mani nude, nessuno.",
    "formula": "danneggiare",
    "formulaName": "Danneggiare",
    "link": "regola",
    "page": "Forza",
    "hooks": [
      "salute",
      "condizione",
      "combattimento",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "mi-metto-in-mezzo",
    "spheres": [
      "forces"
    ],
    "name": "Mi metto in mezzo",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (La Quintessenza del potere, o 1 per la Magick): Quando un attacco fisico sta per colpire te o un compagno vicino, agisci subito, anche fuori dal tuo momento: attivi un tuo potere che difende, pagandone la Quintessenza, oppure paghi 1 Quintessenza e lanci subito una Magick per difendere te o lui (uno scudo, una barriera, una spinta etc..). Vale contro quello che un effetto fisico può fermare (un proiettile, un pugno, una frana etc..), non contro un effetto astratto (una maledizione, un'influenza sulla mente etc..).\n\nEffetto passivo (Sempre): Con la tua reazione (ne hai una per turno), quando qualcuno attacca un compagno vicino a te, ti metti in mezzo: il colpo prende te al posto suo, e da lì in poi è un attacco contro di te (ti difendi tu, coi tuoi tiri e le tue difese).",
    "attivo": "Quando un attacco fisico sta per colpire te o un compagno vicino, agisci subito, anche fuori dal tuo momento: attivi un tuo potere che difende, pagandone la Quintessenza, oppure paghi 1 Quintessenza e lanci subito una Magick per difendere te o lui (uno scudo, una barriera, una spinta etc..). Vale contro quello che un effetto fisico può fermare (un proiettile, un pugno, una frana etc..), non contro un effetto astratto (una maledizione, un'influenza sulla mente etc..).",
    "passivo": "Con la tua reazione (ne hai una per turno), quando qualcuno attacca un compagno vicino a te, ti metti in mezzo: il colpo prende te al posto suo, e da lì in poi è un attacco contro di te (ti difendi tu, coi tuoi tiri e le tue difese).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Dietro di me.»",
    "cost": "La Quintessenza del potere, o 1 per la Magick",
    "costValue": 0,
    "uses": null,
    "paradox": "L'attivo segue la Magick o il potere che usi; nessuno effetto passivo.",
    "formula": "proteggere",
    "formulaName": "Proteggere",
    "link": "verbo",
    "page": "Forza",
    "hooks": [
      "combattimento",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "La Quintessenza del potere, o 1 per la Magick",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
  },
  {
    "id": "brucia-ancora",
    "spheres": [
      "forces"
    ],
    "name": "Brucia ancora",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): I danni da fuoco o da elettricità di un tuo lancio di Forza continuano per tutta la sua Durata: il bersaglio subisce di nuovo i danni della Potenza a ogni turno, se si gioca col metro del combattimento, o a ogni scena, se si gioca col metro narrativo. Il metro lo sceglie il Narratore.\n\nEffetto passivo (Sempre): I danni da fuoco o da elettricità che fai si ripetono una volta da soli, nel turno dopo.",
    "attivo": "I danni da fuoco o da elettricità di un tuo lancio di Forza continuano per tutta la sua Durata: il bersaglio subisce di nuovo i danni della Potenza a ogni turno, se si gioca col metro del combattimento, o a ogni scena, se si gioca col metro narrativo. Il metro lo sceglie il Narratore.",
    "passivo": "I danni da fuoco o da elettricità che fai si ripetono una volta da soli, nel turno dopo.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Brucia ancora, eh?»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Nessuno effetto attivo; il passivo segue il lancio che ha fatto il danno.",
    "formula": "danneggiare",
    "formulaName": "Danneggiare",
    "link": "regola",
    "page": "Forza",
    "hooks": [
      "salute",
      "combattimento",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "bruciature",
    "spheres": [
      "forces"
    ],
    "name": "Bruciature",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza a gradino): Per ogni Quintessenza che paghi, il blocco dei danni di un tuo lancio di Forza dura un gradino di Durata in più.\n\nEffetto passivo (Sempre): I danni dei tuoi lanci di Forza non si curano per un tempo pari alla Durata dello stesso livello della Potenza: se hai usato Potenza 3, non si curano finché non passa il tempo di Durata 3. Li chiude prima solo un effetto contrario di Vita e Forza insieme, o un potere fatto apposta.",
    "attivo": "Per ogni Quintessenza che paghi, il blocco dei danni di un tuo lancio di Forza dura un gradino di Durata in più.",
    "passivo": "I danni dei tuoi lanci di Forza non si curano per un tempo pari alla Durata dello stesso livello della Potenza: se hai usato Potenza 3, non si curano finché non passa il tempo di Durata 3. Li chiude prima solo un effetto contrario di Vita e Forza insieme, o un potere fatto apposta.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Questa non te la chiudi tanto presto.»",
    "cost": "1 Quintessenza a gradino",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo; il passivo segue il lancio.",
    "formula": "danneggiare",
    "formulaName": "Danneggiare",
    "link": "regola",
    "page": "Forza",
    "hooks": [
      "salute",
      "combattimento",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza a gradino",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "nessuno-scappa",
    "spheres": [
      "correspondence",
      "forces"
    ],
    "name": "Nessuno scappa",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Quando un nemico prova a lasciare la scena, paghi 1 Quintessenza e un tuo colpo riuscito lo tiene in scena: con Forza lo butti giù o gli sbarri la strada, con Corrispondenza la via di fuga non porta fuori.\n\nEffetto passivo (Sempre): Chi colpisci con un tuo lancio di Forza o di Corrispondenza resta dov'è: nel suo prossimo momento può agire, ma non spostarsi.",
    "attivo": "Quando un nemico prova a lasciare la scena, paghi 1 Quintessenza e un tuo colpo riuscito lo tiene in scena: con Forza lo butti giù o gli sbarri la strada, con Corrispondenza la via di fuga non porta fuori.",
    "passivo": "Chi colpisci con un tuo lancio di Forza o di Corrispondenza resta dov'è: nel suo prossimo momento può agire, ma non spostarsi.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Dove credi di andare?»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Basso rischio effetto attivo con Corrispondenza, nessuno con Forza; il passivo segue il lancio.",
    "formula": "aprire-e-bloccare",
    "formulaName": "Aprire e Bloccare",
    "link": "verbo",
    "page": "Forza",
    "hooks": [
      "tiro",
      "combattimento",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "onda-d-urto",
    "spheres": [
      "forces"
    ],
    "name": "Onda d'urto",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Un tuo lancio di Forza colpisce altri bersagli, tanti quanto il suo livello di Potenza, senza pagare l'Ambito Bersagli: con Potenza 3, tre bersagli in più.\n\nEffetto passivo (Sempre): Quando un tuo lancio di Forza infligge una Condizione che un'onda porta con sé (si aggiornerà a catena col rifacimento delle Condizioni), la puoi infliggere anche agli altri bersagli nell'area dell'effetto. E quando colpisci ad area, l'area conta un gradino più grande, senza pagarlo.",
    "attivo": "Un tuo lancio di Forza colpisce altri bersagli, tanti quanto il suo livello di Potenza, senza pagare l'Ambito Bersagli: con Potenza 3, tre bersagli in più.",
    "passivo": "Quando un tuo lancio di Forza infligge una Condizione che un'onda porta con sé (si aggiornerà a catena col rifacimento delle Condizioni), la puoi infliggere anche agli altri bersagli nell'area dell'effetto. E quando colpisci ad area, l'area conta un gradino più grande, senza pagarlo.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Uno giù, e il prossimo.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Segue il lancio effetto attivo, segue il lancio effetto passivo.",
    "formula": "danneggiare",
    "formulaName": "Danneggiare",
    "link": "effetto",
    "page": "Forza",
    "hooks": [
      "salute",
      "combattimento",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "perforante",
    "spheres": [
      "forces",
      "matter"
    ],
    "name": "Perforante",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Tanta Quintessenza quanto vale l'armatura): Paghi tanta Quintessenza quanto vale l'armatura del bersaglio, e un tuo lancio di Forza o di Materia la ignora.\n\nEffetto passivo (Sempre): Contro i tuoi lanci di Forza o di Materia, l'armatura di chi colpisci vale meno, di tanti punti quanti sono i poteri che conosci in Forza (o in Materia, se lanci con Materia).",
    "attivo": "Paghi tanta Quintessenza quanto vale l'armatura del bersaglio, e un tuo lancio di Forza o di Materia la ignora.",
    "passivo": "Contro i tuoi lanci di Forza o di Materia, l'armatura di chi colpisci vale meno, di tanti punti quanti sono i poteri che conosci in Forza (o in Materia, se lanci con Materia).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Il giubbotto non ti salva.»",
    "cost": "Tanta Quintessenza quanto vale l'armatura",
    "costValue": 0,
    "uses": null,
    "paradox": "Segue il lancio effetto attivo, segue il lancio effetto passivo.",
    "formula": "danneggiare",
    "formulaName": "Danneggiare",
    "link": "regola",
    "page": "Forza",
    "hooks": [
      "salute"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "Tanta Quintessenza quanto vale l'armatura",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
  },
  {
    "id": "semplice-violenza",
    "spheres": [
      "forces"
    ],
    "name": "Semplice violenza",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Paghi 2 Quintessenza: i danni di un tuo colpo (un lancio, un'arma, un pugno etc..) sono tutti Aggravati, anche quelli che sarebbero Superficiali.\n\nEffetto passivo (Sempre): Quando il Narratore decide se un tuo danno è Superficiale o Aggravato, propende per l'Aggravato, anche quando colpisci con effetti che non sono di Forza.",
    "attivo": "Paghi 2 Quintessenza: i danni di un tuo colpo (un lancio, un'arma, un pugno etc..) sono tutti Aggravati, anche quelli che sarebbero Superficiali.",
    "passivo": "Quando il Narratore decide se un tuo danno è Superficiale o Aggravato, propende per l'Aggravato, anche quando colpisci con effetti che non sono di Forza.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Niente di elegante: solo violenza.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Nessuno effetto attivo; il passivo segue il lancio.",
    "formula": "danneggiare",
    "formulaName": "Danneggiare",
    "link": "regola",
    "page": "Forza",
    "hooks": [
      "ambiti",
      "salute"
    ],
    "effects": [
      {
        "on": "nota",
        "roll": "any",
        "nota": "Quando il Narratore decide se un tuo danno è Superficiale o Aggravato, propende per l'Aggravato, anche quando colpisci con effetti che non sono di Forza."
      },
      {
        "mode": "attivo",
        "on": "nota",
        "roll": "any",
        "nota": "Paghi 2 Quintessenza: i danni di un tuo colpo (un lancio, un'arma, un pugno etc..) sono tutti Aggravati, anche quelli che sarebbero Superficiali."
      }
    ],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 3
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "colpo-decisivo",
    "spheres": [
      "forces"
    ],
    "name": "Colpo decisivo",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione dichiari il colpo decisivo: se va a segno, i nemici rimasti si arrendono o fuggono.",
    "attivo": "Una volta per sessione dichiari il colpo decisivo: se va a segno, i nemici rimasti si arrendono o fuggono.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Finisce qui.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "danneggiare",
    "formulaName": "Danneggiare",
    "link": "tavolo",
    "page": "Forza",
    "hooks": [
      "uso",
      "combattimento",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "baricentro",
    "spheres": [
      "forces"
    ],
    "name": "Baricentro",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Azione per il primo bersaglio, 1 Quintessenza per ogni altro): Scegli un bersaglio o un oggetto che vedi e lo fissi come un punto fermo nello spazio. Nessuna forza lo sposta, lo spinge o lo fa cadere, a meno che non sia Magick con una soglia più alta dei poteri che conosci in Forza, e lui non prende le Condizioni che ne verrebbero (si aggiornerà a catena col rifacimento delle Condizioni). Intanto non si muove neanche lui da quel punto. Dura finché non lo lasci andare, al massimo fino a fine scena. Non ferma le cose in movimento: fissa solo un punto.\n\nEffetto passivo (Sempre): Chi prova a spingerti, farti cadere o sbalzarti ha 2 dadi in meno oppure soglia +2, e il terreno (ghiaccio, olio, un tetto bagnato) non ti fa cadere.",
    "attivo": "Scegli un bersaglio o un oggetto che vedi e lo fissi come un punto fermo nello spazio. Nessuna forza lo sposta, lo spinge o lo fa cadere, a meno che non sia Magick con una soglia più alta dei poteri che conosci in Forza, e lui non prende le Condizioni che ne verrebbero (si aggiornerà a catena col rifacimento delle Condizioni). Intanto non si muove neanche lui da quel punto. Dura finché non lo lasci andare, al massimo fino a fine scena. Non ferma le cose in movimento: fissa solo un punto.",
    "passivo": "Chi prova a spingerti, farti cadere o sbalzarti ha 2 dadi in meno oppure soglia +2, e il terreno (ghiaccio, olio, un tetto bagnato) non ti fa cadere.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "Azione per il primo bersaglio, 1 Quintessenza per ogni altro",
    "costValue": 0,
    "uses": null,
    "paradox": "Volgare effetto attivo se qualcuno guarda, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Forza",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "Azione per il primo bersaglio, 1 Quintessenza per ogni altro",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
  },
  {
    "id": "deviare",
    "spheres": [
      "forces"
    ],
    "name": "Deviare",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza ogni 2 dadi): Quando rimandi un colpo col passivo, paghi Quintessenza per dare dadi in più a quel tiro, 2 per ogni Quintessenza, così prende proprio chi vuoi tu.\n\nEffetto passivo (Sempre): Con la tua reazione (ne hai una per turno), quando un effetto fisico arriva verso di te (un pugno, un proiettile, un oggetto lanciato etc..), lo mandi in un'altra direzione che scegli tu. Se lo mandi contro qualcuno, vale il tiro di chi ti ha attaccato, contro la soglia del nuovo bersaglio: se basta, prende lui i danni che avrebbe fatto a te. Funziona solo se sai dove mandarlo, e se i poteri che conosci in Forza non sono meno della soglia del colpo.",
    "attivo": "Quando rimandi un colpo col passivo, paghi Quintessenza per dare dadi in più a quel tiro, 2 per ogni Quintessenza, così prende proprio chi vuoi tu.",
    "passivo": "Con la tua reazione (ne hai una per turno), quando un effetto fisico arriva verso di te (un pugno, un proiettile, un oggetto lanciato etc..), lo mandi in un'altra direzione che scegli tu. Se lo mandi contro qualcuno, vale il tiro di chi ti ha attaccato, contro la soglia del nuovo bersaglio: se basta, prende lui i danni che avrebbe fatto a te. Funziona solo se sai dove mandarlo, e se i poteri che conosci in Forza non sono meno della soglia del colpo.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza ogni 2 dadi",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, Volgare effetto passivo se qualcuno guarda (un colpo che cambia strada da solo).",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Forza",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza ogni 2 dadi",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "calamita",
    "spheres": [
      "forces"
    ],
    "name": "Calamita",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (da 1 a 5 Quintessenza): Muovi il metallo col magnetismo: lo sposti, lo spingi, lo schiacci a terra, e con lui chi lo tocca o lo porta (una pistola, un'auto, una guardia in armatura etc..). Il costo va da 1 a 5 Quintessenza, secondo l'impresa, e lo decide il Narratore.\n\nEffetto passivo (Sempre): Nessuno ti disarma: il metallo che hai addosso resta con te. Senti sempre il metallo intorno a te, e quanto ce n'è; se hai l'Abilità che serve a riconoscerlo (le armi, gli attrezzi, le serrature etc..) ne riconosci spesso le forme più comuni, se no ne senti solo la presenza.",
    "attivo": "Muovi il metallo col magnetismo: lo sposti, lo spingi, lo schiacci a terra, e con lui chi lo tocca o lo porta (una pistola, un'auto, una guardia in armatura etc..). Il costo va da 1 a 5 Quintessenza, secondo l'impresa, e lo decide il Narratore.",
    "passivo": "Nessuno ti disarma: il metallo che hai addosso resta con te. Senti sempre il metallo intorno a te, e quanto ce n'è; se hai l'Abilità che serve a riconoscerlo (le armi, gli attrezzi, le serrature etc..) ne riconosci spesso le forme più comuni, se no ne senti solo la presenza.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "da 1 a 5 Quintessenza",
    "costValue": 0,
    "uses": null,
    "paradox": "Volgare effetto attivo se qualcuno guarda, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Forza",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "da 1 a 5 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 5
    }
  },
  {
    "id": "zona-franca",
    "spheres": [
      "forces"
    ],
    "name": "Zona franca",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza a bersaglio): In un effetto ad area (un'esplosione, un'onda, un incendio etc..), tuo o di altri, ogni bersaglio che vuoi lasciare fuori ti costa 1 Quintessenza: per lui è come se fosse al riparo con te, e l'area non lo tocca.\n\nEffetto passivo (Sempre): Intorno a te c'è un guscio: i colpi d'energia (il fuoco, una scarica, un'onda d'urto etc..) non ti arrivano, a meno che non siano Magick con una soglia più alta dei poteri che conosci in Forza.",
    "attivo": "In un effetto ad area (un'esplosione, un'onda, un incendio etc..), tuo o di altri, ogni bersaglio che vuoi lasciare fuori ti costa 1 Quintessenza: per lui è come se fosse al riparo con te, e l'area non lo tocca.",
    "passivo": "Intorno a te c'è un guscio: i colpi d'energia (il fuoco, una scarica, un'onda d'urto etc..) non ti arrivano, a meno che non siano Magick con una soglia più alta dei poteri che conosci in Forza.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza a bersaglio",
    "costValue": 0,
    "uses": null,
    "paradox": "Volgare se qualcuno guarda, in tutte e due le forme.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Forza",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza a bersaglio",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "peso-piuma",
    "spheres": [
      "forces"
    ],
    "name": "Peso piuma",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Quintessenza pari al Peso): Cambi il peso di un oggetto che tocchi, per la scena: leggero come una piuma o pesante come un'auto (sollevi una cassaforte, blocchi una porta, porti via un ferito etc..). Paghi tanta Quintessenza quanto il livello di Peso che serve, sulla tabella della Potenza.\n\nEffetto passivo (Sempre): Nei tiri per sollevare, spingere o trascinare conti come se il tuo Attributo Forza avesse tanti pallini in più quanti sono i poteri che conosci nella Sfera Forza. In combattimento non vale in modo diretto: lanciare un'auto si può, tirare un pugno più forte no.",
    "attivo": "Cambi il peso di un oggetto che tocchi, per la scena: leggero come una piuma o pesante come un'auto (sollevi una cassaforte, blocchi una porta, porti via un ferito etc..). Paghi tanta Quintessenza quanto il livello di Peso che serve, sulla tabella della Potenza.",
    "passivo": "Nei tiri per sollevare, spingere o trascinare conti come se il tuo Attributo Forza avesse tanti pallini in più quanti sono i poteri che conosci nella Sfera Forza. In combattimento non vale in modo diretto: lanciare un'auto si può, tirare un pugno più forte no.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "Quintessenza pari al Peso",
    "costValue": 0,
    "uses": null,
    "paradox": "Volgare effetto attivo se qualcuno guarda, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Forza",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "Quintessenza pari al Peso",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
  },
  {
    "id": "interferenza",
    "spheres": [
      "forces"
    ],
    "name": "Interferenza",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Per la scena manipoli i congegni che vedi e gli fai percepire o fare quello che ti serve (una telecamera che guarda altrove, un sensore che non scatta, un microfono che sente un'altra voce etc..).\n\nEffetto passivo (Sempre): Dove passi tu, i congegni (sensori, microfoni, telecamere etc..) sono sempre disturbati.",
    "attivo": "Per la scena manipoli i congegni che vedi e gli fai percepire o fare quello che ti serve (una telecamera che guarda altrove, un sensore che non scatta, un microfono che sente un'altra voce etc..).",
    "passivo": "Dove passi tu, i congegni (sensori, microfoni, telecamere etc..) sono sempre disturbati.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Forza",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "centralina",
    "spheres": [
      "forces"
    ],
    "name": "Centralina",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Per la scena un congegno, o l'impianto dell'edificio in cui sei, fa da solo quello che vuoi tu, senza che tu debba dargli ordini.\n\nEffetto passivo (Sempre): Comandi a distanza qualunque tecnologia che accetta un comando (una porta automatica, un ascensore, una radio, un'auto etc..), come se fossi tu il telecomando. Contro la Tecnomagia, o contro un bersaglio legato a lei, funziona solo se i poteri che conosci in Forza non sono meno della sua soglia.",
    "attivo": "Per la scena un congegno, o l'impianto dell'edificio in cui sei, fa da solo quello che vuoi tu, senza che tu debba dargli ordini.",
    "passivo": "Comandi a distanza qualunque tecnologia che accetta un comando (una porta automatica, un ascensore, una radio, un'auto etc..), come se fossi tu il telecomando. Contro la Tecnomagia, o contro un bersaglio legato a lei, funziona solo se i poteri che conosci in Forza non sono meno della sua soglia.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Basso rischio in tutte e due le forme.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Forza",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 3
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "luci-e-ombre",
    "spheres": [
      "forces"
    ],
    "name": "Luci e ombre",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Azione, una volta per sessione): Con la luce infliggi una Condizione a chi vuoi fra quelli che vedi (si aggiornerà a catena col rifacimento delle Condizioni), oppure togli tutta la luce da un ambiente e lo lasci al buio completo, per la scena.\n\nEffetto passivo (Sempre): Muovi come vuoi la luce e le ombre della stanza in cui sei: illumini quello che vuoi far vedere e metti in ombra quello che vuoi nascondere (un volto, un'uscita, un'arma etc..).",
    "attivo": "Con la luce infliggi una Condizione a chi vuoi fra quelli che vedi (si aggiornerà a catena col rifacimento delle Condizioni), oppure togli tutta la luce da un ambiente e lo lasci al buio completo, per la scena.",
    "passivo": "Muovi come vuoi la luce e le ombre della stanza in cui sei: illumini quello che vuoi far vedere e metti in ombra quello che vuoi nascondere (un volto, un'uscita, un'arma etc..).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "Azione, una volta per sessione",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Volgare effetto attivo se qualcuno guarda, basso rischio effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Forza",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "Azione, una volta per sessione",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "baratto",
    "spheres": [
      "matter"
    ],
    "name": "Baratto",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Fra una sessione e l'altra cambi un oggetto che hai con uno di pari valore, senza tirare.",
    "attivo": "Fra una sessione e l'altra cambi un oggetto che hai con uno di pari valore, senza tirare.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Te lo cambio con questo.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "trasmutare",
    "formulaName": "Trasmutare",
    "link": "verbo",
    "page": "Materia",
    "hooks": [
      "tiro",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "bottino",
    "spheres": [
      "matter"
    ],
    "name": "Bottino",
    "dot": 1,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: A fine scena prendi un oggetto di un nemico sconfitto: è tuo e funziona.",
    "attivo": "",
    "passivo": "A fine scena prendi un oggetto di un nemico sconfitto: è tuo e funziona.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Questo a te non serve più.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "riparare",
    "formulaName": "Riparare",
    "link": "tavolo",
    "page": "Materia",
    "hooks": [
      "altri",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "ce-l-ho",
    "spheres": [
      "matter"
    ],
    "name": "Ce l'ho",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena hai con te un oggetto comune che ti serve (una torcia, una corda, un accendino): ce l'avevi già.",
    "attivo": "Una volta per scena hai con te un oggetto comune che ti serve (una torcia, una corda, un accendino): ce l'avevi già.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Ce l'ho, ce l'ho.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "creare-e-distruggere",
    "formulaName": "Creare e Distruggere",
    "link": "effetto",
    "page": "Materia",
    "hooks": [
      "uso"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "il-giusto-attrezzo",
    "spheres": [
      "matter"
    ],
    "name": "Il giusto attrezzo",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Quintessenza secondo la soglia del tiro): Quando ribalti un tiro fallito fatto con l'attrezzo giusto (un piede di porco, un grimaldello, un bisturi etc..), al posto del Prezzo paghi Quintessenza secondo il tiro: di solito tanta quanta è la sua soglia, e almeno 1.\n\nEffetto passivo (Sempre): Quello che hai in mano fa da attrezzo giusto per il lavoro (un cacciavite fa da grimaldello, un coltellino da bisturi, una graffetta da chiave etc..): il tiro va come se avessi l'attrezzo vero.",
    "attivo": "Quando ribalti un tiro fallito fatto con l'attrezzo giusto (un piede di porco, un grimaldello, un bisturi etc..), al posto del Prezzo paghi Quintessenza secondo il tiro: di solito tanta quanta è la sua soglia, e almeno 1.",
    "passivo": "Quello che hai in mano fa da attrezzo giusto per il lavoro (un cacciavite fa da grimaldello, un coltellino da bisturi, una graffetta da chiave etc..): il tiro va come se avessi l'attrezzo vero.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Serve l'attrezzo giusto.»",
    "cost": "Quintessenza secondo la soglia del tiro",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, basso rischio effetto passivo.",
    "formula": "potenziare",
    "formulaName": "Potenziare",
    "link": "regola",
    "page": "Materia",
    "hooks": [
      "uso",
      "tiro"
    ],
    "effects": [
      {
        "on": "nota",
        "roll": "abilita",
        "nota": "Quello che hai in mano fa da attrezzo giusto per il lavoro (un cacciavite fa da grimaldello, un coltellino da bisturi, una graffetta da chiave etc..): il tiro va come se avessi l'attrezzo vero."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "Quintessenza secondo la soglia del tiro",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
  },
  {
    "id": "tutto-e-un-arma",
    "spheres": [
      "matter"
    ],
    "name": "Tutto è un'arma",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Per la scena anche gli oggetti che lanci colpiscono come un'arma da fuoco, anche da lontano (una chiave inglese, una sedia, un bullone etc..), con lo stesso danno base del passivo.\n\nEffetto passivo (Sempre): Un oggetto che impugni (una bottiglia, una sedia, un ombrello etc..) diventa un'arma vera: il suo danno base è pari ai poteri che conosci in Materia, e con tre poteri una bottiglia fa 3 danni.",
    "attivo": "Per la scena anche gli oggetti che lanci colpiscono come un'arma da fuoco, anche da lontano (una chiave inglese, una sedia, un bullone etc..), con lo stesso danno base del passivo.",
    "passivo": "Un oggetto che impugni (una bottiglia, una sedia, un ombrello etc..) diventa un'arma vera: il suo danno base è pari ai poteri che conosci in Materia, e con tre poteri una bottiglia fa 3 danni.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Tutto può fare male.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "potenziare",
    "formulaName": "Potenziare",
    "link": "verbo",
    "page": "Materia",
    "hooks": [
      "salute"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "fatto-da-me",
    "spheres": [
      "matter",
      "mind"
    ],
    "name": "Fatto da me",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Costruisci o ripari in pochi minuti quello che di solito chiede giorni di lavoro, purché tu abbia i pezzi (un'auto rimessa in strada, una radio da campo, una trappola per la porta etc..). Se il lavoro chiede un tiro, il tiro si fa lo stesso: risparmi il tempo, non il tiro.\n\nEffetto passivo (Sempre): Un compagno che usa un oggetto fatto da te tira con la tua Abilità al posto della sua.",
    "attivo": "Costruisci o ripari in pochi minuti quello che di solito chiede giorni di lavoro, purché tu abbia i pezzi (un'auto rimessa in strada, una radio da campo, una trappola per la porta etc..). Se il lavoro chiede un tiro, il tiro si fa lo stesso: risparmi il tempo, non il tiro.",
    "passivo": "Un compagno che usa un oggetto fatto da te tira con la tua Abilità al posto della sua.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«L'ho fatto io, fidati.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "potenziare",
    "formulaName": "Potenziare",
    "link": "verbo",
    "page": "Materia",
    "hooks": [
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "opera",
    "spheres": [
      "matter"
    ],
    "name": "Opera",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Per la scena un oggetto fatto da te fa quello che farebbe un oggetto di due Gradi più alto (la tua pistola colpisce come un'arma militare, la tua auto regge come una blindata, il tuo kit medico cura come un ospedale da campo etc..).\n\nEffetto passivo (A sessione nuova): Fra una sessione e l'altra un oggetto fatto da te prende una qualità: non si inceppa, non si trova o non si rompe.",
    "attivo": "Per la scena un oggetto fatto da te fa quello che farebbe un oggetto di due Gradi più alto (la tua pistola colpisce come un'arma militare, la tua auto regge come una blindata, il tuo kit medico cura come un ospedale da campo etc..).",
    "passivo": "Fra una sessione e l'altra un oggetto fatto da te prende una qualità: non si inceppa, non si trova o non si rompe.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Ci ho messo le mani, e si vede.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Basso rischio in tutte e due le forme.",
    "formula": "potenziare",
    "formulaName": "Potenziare",
    "link": "verbo",
    "page": "Materia",
    "hooks": [
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 3
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza",
    "cadenzaPassivo": "A sessione nuova",
    "costoVariabile": null
  },
  {
    "id": "oggetto-sacrificale",
    "spheres": [
      "matter",
      "prime"
    ],
    "name": "Oggetto Sacrificale",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (L'oggetto, una volta per sessione): Quando scoppia un Contraccolpo, l'Ustione va su un oggetto importante per te (un ricordo, un'arma di famiglia, il tuo Strumento etc..) invece che su di te. L'oggetto si distrugge, e non si potrà mai più ricreare.\n\nEffetto passivo (Una volta per scena): Quando prendi Paradosso, puoi farne passare 1 punto su un oggetto che porti: l'oggetto si incrina (il vetro si crepa, il metallo si scurisce, la carta ingiallisce etc..), e al terzo punto si rompe.",
    "attivo": "Quando scoppia un Contraccolpo, l'Ustione va su un oggetto importante per te (un ricordo, un'arma di famiglia, il tuo Strumento etc..) invece che su di te. L'oggetto si distrugge, e non si potrà mai più ricreare.",
    "passivo": "Quando prendi Paradosso, puoi farne passare 1 punto su un oggetto che porti: l'oggetto si incrina (il vetro si crepa, il metallo si scurisce, la carta ingiallisce etc..), e al terzo punto si rompe.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Prendi questo, non me.»",
    "cost": "L'oggetto, una volta per sessione",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Lavora sul Contraccolpo e sul Paradosso, non ne fa di suo.",
    "formula": "proteggere",
    "formulaName": "Proteggere",
    "link": "verbo",
    "page": "Materia",
    "hooks": [
      "uso",
      "paradosso",
      "combattimento"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 4
      }
    ],
    "rifatto": true,
    "costoAttivo": "L'oggetto, una volta per sessione",
    "cadenzaPassivo": "Una volta per scena",
    "costoVariabile": null
  },
  {
    "id": "giocattoli",
    "spheres": [
      "matter"
    ],
    "name": "Giocattoli",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza ad arma): Per la scena le armi che vedi diventano innocue: la pistola di plastica, il coltello di gomma, il fucile di cartone etc.. Paghi 1 Quintessenza per ogni arma.\n\nEffetto passivo (Sempre): Sai chi è armato in scena e con cosa (una pistola sotto la giacca, un coltello nello stivale, una lama di ceramica etc..).",
    "attivo": "Per la scena le armi che vedi diventano innocue: la pistola di plastica, il coltello di gomma, il fucile di cartone etc.. Paghi 1 Quintessenza per ogni arma.",
    "passivo": "Sai chi è armato in scena e con cosa (una pistola sotto la giacca, un coltello nello stivale, una lama di ceramica etc..).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza ad arma",
    "costValue": 0,
    "uses": null,
    "paradox": "Volgare effetto attivo se qualcuno guarda, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Materia",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza ad arma",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "vetro",
    "spheres": [
      "matter"
    ],
    "name": "Vetro",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Per la scena i muri di una stanza diventano vetro da un lato solo: voi vedete dentro, chi è dentro non vede fuori.\n\nEffetto passivo (Sempre): Vedi attraverso muri, porte e casse fino a Portata 1.",
    "attivo": "Per la scena i muri di una stanza diventano vetro da un lato solo: voi vedete dentro, chi è dentro non vede fuori.",
    "passivo": "Vedi attraverso muri, porte e casse fino a Portata 1.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Volgare effetto attivo se qualcuno guarda, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Materia",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "nascondiglio",
    "spheres": [
      "matter"
    ],
    "name": "Nascondiglio",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (da 1 a 3 Quintessenza): Apri uno spazio nascosto in un muro, in un pavimento o in un'auto, che si richiude senza lasciare segni e resta finché non lo riapri tu: una nicchia per un oggetto (1 Quintessenza), un posto per una persona (2), una stanza per il gruppo (3).\n\nEffetto passivo (Sempre): Toccando un muro o un mobile trovi quello che nasconde (un doppio fondo, una stanza segreta, una cassaforte a muro etc..).",
    "attivo": "Apri uno spazio nascosto in un muro, in un pavimento o in un'auto, che si richiude senza lasciare segni e resta finché non lo riapri tu: una nicchia per un oggetto (1 Quintessenza), un posto per una persona (2), una stanza per il gruppo (3).",
    "passivo": "Toccando un muro o un mobile trovi quello che nasconde (un doppio fondo, una stanza segreta, una cassaforte a muro etc..).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "da 1 a 3 Quintessenza",
    "costValue": 0,
    "uses": null,
    "paradox": "Volgare effetto attivo se qualcuno guarda, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Materia",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "da 1 a 3 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 3
    }
  },
  {
    "id": "passe-partout",
    "spheres": [
      "matter"
    ],
    "name": "Passe-partout",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza a testa): Tu e chi ti tiene per mano attraversate un muro, una porta o un pavimento, come se fosse acqua. Paghi 1 Quintessenza per ognuno che passa, te compreso.\n\nEffetto passivo (Sempre): Le serrature meccaniche (una chiave, un lucchetto, una combinazione etc..) si aprono al tuo tocco.",
    "attivo": "Tu e chi ti tiene per mano attraversate un muro, una porta o un pavimento, come se fosse acqua. Paghi 1 Quintessenza per ognuno che passa, te compreso.",
    "passivo": "Le serrature meccaniche (una chiave, un lucchetto, una combinazione etc..) si aprono al tuo tocco.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza a testa",
    "costValue": 0,
    "uses": null,
    "paradox": "Volgare effetto attivo se qualcuno guarda, basso rischio effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Materia",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza a testa",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "presa",
    "spheres": [
      "matter"
    ],
    "name": "Presa",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Incolli due cose, e fino a fine scena non si possono separare (una porta al telaio, l'arma alla fondina del nemico, l'auto all'asfalto etc..), a meno che non sia Magick con una soglia più alta dei poteri che conosci in Materia.\n\nEffetto passivo (Sempre): Mani e scarpe fanno presa su ogni superficie: cammini sui muri e sui soffitti come per terra.",
    "attivo": "Incolli due cose, e fino a fine scena non si possono separare (una porta al telaio, l'arma alla fondina del nemico, l'auto all'asfalto etc..), a meno che non sia Magick con una soglia più alta dei poteri che conosci in Materia.",
    "passivo": "Mani e scarpe fanno presa su ogni superficie: cammini sui muri e sui soffitti come per terra.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Volgare se qualcuno guarda, in tutte e due le forme.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Materia",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "passerella",
    "spheres": [
      "matter"
    ],
    "name": "Passerella",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (da 1 a 3 Quintessenza): Trasformi in un ponte anche quello che non dovrebbe reggere (l'aria, una tenda, un getto d'acqua etc..) e ci cammini sopra per raggiungere un punto, anche in salita fino a 45 gradi, come su un sentiero di montagna. Il ponte regge fino a fine scena: te (1 Quintessenza), il gruppo (2), un'auto (3).\n\nEffetto passivo (Sempre): Cammini sull'acqua, sul fango e sulla neve fresca come sulla pietra.",
    "attivo": "Trasformi in un ponte anche quello che non dovrebbe reggere (l'aria, una tenda, un getto d'acqua etc..) e ci cammini sopra per raggiungere un punto, anche in salita fino a 45 gradi, come su un sentiero di montagna. Il ponte regge fino a fine scena: te (1 Quintessenza), il gruppo (2), un'auto (3).",
    "passivo": "Cammini sull'acqua, sul fango e sulla neve fresca come sulla pietra.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "da 1 a 3 Quintessenza",
    "costValue": 0,
    "uses": null,
    "paradox": "Volgare se qualcuno guarda, in tutte e due le forme.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Materia",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "da 1 a 3 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 3
    }
  },
  {
    "id": "passaggio-di-stato",
    "spheres": [
      "matter"
    ],
    "name": "Passaggio di stato",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (da 1 a 3 Quintessenza): Per la scena cambi lo stato di una cosa che vedi (la porta diventa acqua, il pavimento diventa fango sotto i nemici, il fumo diventa sabbia che cade etc..). Paghi secondo la grandezza: 1 un oggetto, 2 una porta o un tratto di pavimento, 3 una stanza.\n\nEffetto passivo (Sempre): Niente ti trattiene: manette, catene e sbarre in mano tua si ammorbidiscono, e con un'azione te ne liberi.",
    "attivo": "Per la scena cambi lo stato di una cosa che vedi (la porta diventa acqua, il pavimento diventa fango sotto i nemici, il fumo diventa sabbia che cade etc..). Paghi secondo la grandezza: 1 un oggetto, 2 una porta o un tratto di pavimento, 3 una stanza.",
    "passivo": "Niente ti trattiene: manette, catene e sbarre in mano tua si ammorbidiscono, e con un'azione te ne liberi.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "da 1 a 3 Quintessenza",
    "costValue": 0,
    "uses": null,
    "paradox": "Volgare effetto attivo se qualcuno guarda, basso rischio effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Materia",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 3
      }
    ],
    "rifatto": true,
    "costoAttivo": "da 1 a 3 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 3
    }
  },
  {
    "id": "alchimia",
    "spheres": [
      "matter"
    ],
    "name": "Alchimia",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (3 Quintessenza): Trasformi per sempre quello che tocchi, grande fino a una stanza, in un'altra materia (il muro in vetro, il pavimento in sabbia, l'acciaio della cassaforte in cera etc..).\n\nEffetto passivo (Sempre): Le tue Magick di Materia che cambiano una materia in un'altra durano per sempre, senza pagare la Durata.",
    "attivo": "Trasformi per sempre quello che tocchi, grande fino a una stanza, in un'altra materia (il muro in vetro, il pavimento in sabbia, l'acciaio della cassaforte in cera etc..).",
    "passivo": "Le tue Magick di Materia che cambiano una materia in un'altra durano per sempre, senza pagare la Durata.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "3 Quintessenza",
    "costValue": 3,
    "uses": null,
    "paradox": "Volgare effetto attivo se qualcuno guarda; il passivo segue il lancio.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Materia",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 4
      }
    ],
    "rifatto": true,
    "costoAttivo": "3 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "ho-letto-qualcosa",
    "spheres": [
      "mind"
    ],
    "name": "Ho letto qualcosa",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Anche senza la conoscenza o l'Abilità adatta, per un tiro hai tanti pallini quanti sono i poteri che conosci in Mente, fino a 5, al posto di quelli dell'Abilità.\n\nEffetto passivo (Sempre): Davanti a un compito o a un lavoro sai sempre che tipo di conoscenza ti servirebbe; se è fra le tue, hai 1 dado in più al tiro.",
    "attivo": "Anche senza la conoscenza o l'Abilità adatta, per un tiro hai tanti pallini quanti sono i poteri che conosci in Mente, fino a 5, al posto di quelli dell'Abilità.",
    "passivo": "Davanti a un compito o a un lavoro sai sempre che tipo di conoscenza ti servirebbe; se è fra le tue, hai 1 dado in più al tiro.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«L'ho letto da qualche parte.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "sapere",
    "formulaName": "Sapere",
    "link": "regola",
    "page": "Mente",
    "hooks": [
      "uso",
      "tiro"
    ],
    "effects": [
      {
        "on": "dice",
        "value": 1,
        "roll": "abilita",
        "nota": "Davanti a un compito o a un lavoro sai sempre che tipo di conoscenza ti servirebbe; se è fra le tue, hai 1 dado in più al tiro."
      },
      {
        "mode": "attivo",
        "on": "nota",
        "roll": "abilita",
        "nota": "Anche senza la conoscenza o l'Abilità adatta, per un tiro hai tanti pallini quanti sono i poteri che conosci in Mente, fino a 5, al posto di quelli dell'Abilità."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "il-mondo-e-piccolo",
    "spheres": [
      "mind"
    ],
    "name": "Non ti ricordi di me?",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Quintessenza pari al grado di conoscenza): Forzi una persona a un imprinting immediato: ti conosce, come se ci fosse sempre stato un rapporto fra voi, e può fidarsi subito di te. Più Quintessenza spendi, più ti conosce (1 ti ha già visto, 2 sa chi sei, 3 ti conosce bene). Quello che sa di te è vero, con quello che ne consegue.\n\nEffetto passivo (Sempre): Se vuoi, resti impresso: la gente non si scorda di te, e chi prova a cancellarti dalla memoria di qualcuno (con la Magick, con una droga etc..) ha 2 dadi in meno oppure soglia +2.",
    "attivo": "Forzi una persona a un imprinting immediato: ti conosce, come se ci fosse sempre stato un rapporto fra voi, e può fidarsi subito di te. Più Quintessenza spendi, più ti conosce (1 ti ha già visto, 2 sa chi sei, 3 ti conosce bene). Quello che sa di te è vero, con quello che ne consegue.",
    "passivo": "Se vuoi, resti impresso: la gente non si scorda di te, e chi prova a cancellarti dalla memoria di qualcuno (con la Magick, con una droga etc..) ha 2 dadi in meno oppure soglia +2.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Ma tu non sei...?»",
    "cost": "Quintessenza pari al grado di conoscenza",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "trovare",
    "formulaName": "Trovare",
    "link": "verbo",
    "page": "Mente",
    "hooks": [
      "uso",
      "altri",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "Quintessenza pari al grado di conoscenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
  },
  {
    "id": "l-ho-sentito-dire",
    "spheres": [
      "spirit"
    ],
    "name": "Rompere la quarta parete",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Usi il passivo un'altra volta: l'Avatar ti suggerisce un'altra cosa che sai tu.\n\nEffetto passivo (Una volta per sessione): Il tuo personaggio sa una cosa che sai tu, giocatore: in scena è il tuo Avatar a suggerirtela, e ti rivela una verità.",
    "attivo": "Usi il passivo un'altra volta: l'Avatar ti suggerisce un'altra cosa che sai tu.",
    "passivo": "Il tuo personaggio sa una cosa che sai tu, giocatore: in scena è il tuo Avatar a suggerirtela, e ti rivela una verità.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Me l'ha detto un uccellino.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "sapere",
    "formulaName": "Sapere",
    "link": "tavolo",
    "page": "Spirito",
    "hooks": [
      "uso"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Una volta per sessione",
    "costoVariabile": null
  },
  {
    "id": "mai-colto-di-sorpresa",
    "spheres": [
      "mind"
    ],
    "name": "Mai colto di sorpresa",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Anticipi i pensieri di chi ti sta intorno: sai cosa vuole fare nei prossimi turni, e a cosa punta (colpirti, scappare, prendere un oggetto etc..).\n\nEffetto passivo (Sempre): Negli agguati tesi da una creatura (una persona, una bestia, uno spirito) non sei mai sorpreso: nel primo turno agisci come tutti.",
    "attivo": "Anticipi i pensieri di chi ti sta intorno: sai cosa vuole fare nei prossimi turni, e a cosa punta (colpirti, scappare, prendere un oggetto etc..).",
    "passivo": "Negli agguati tesi da una creatura (una persona, una bestia, uno spirito) non sei mai sorpreso: nel primo turno agisci come tutti.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Ti ho sentito arrivare.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "prevedere",
    "formulaName": "Prevedere",
    "link": "effetto",
    "page": "Mente",
    "hooks": [
      "combattimento"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "al-posto-tuo",
    "spheres": [
      "mind",
      "spirit",
      "life"
    ],
    "name": "Al posto tuo",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (La Condizione che prendi): Quando un compagno che vedi prende una Condizione del tipo della tua Sfera (mentale con Mente, fisica con Vita, soprannaturale con Spirito), la prendi tu al posto suo (si aggiornerà a catena col rifacimento delle Condizioni). Con l'Amalgama delle altre due Sfere prendi le Condizioni di tutti i tipi.\n\nEffetto passivo (Sempre): Quando stai entro Portata 1 da un compagno e subisci una Condizione del tipo della tua Sfera, chi te la infligge ha 2 dadi in meno oppure soglia +2 (si aggiornerà a catena col rifacimento delle Condizioni).",
    "attivo": "Quando un compagno che vedi prende una Condizione del tipo della tua Sfera (mentale con Mente, fisica con Vita, soprannaturale con Spirito), la prendi tu al posto suo (si aggiornerà a catena col rifacimento delle Condizioni). Con l'Amalgama delle altre due Sfere prendi le Condizioni di tutti i tipi.",
    "passivo": "Quando stai entro Portata 1 da un compagno e subisci una Condizione del tipo della tua Sfera, chi te la infligge ha 2 dadi in meno oppure soglia +2 (si aggiornerà a catena col rifacimento delle Condizioni).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Dalla a me.»",
    "cost": "La Condizione che prendi",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "guarire",
    "formulaName": "Guarire",
    "link": "verbo",
    "page": "Mente",
    "hooks": [
      "condizione",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "La Condizione che prendi",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "conto-degli-indizi",
    "spheres": [
      "mind"
    ],
    "name": "Momento da Sherlock",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Fai una domanda al Narratore su quello che il tuo personaggio sa (i suoi studi, il suo mestiere, quello che ha visto etc..): se il personaggio lo può sapere, il Narratore ti risponde.\n\nEffetto passivo (Al cambio di scena): A fine scena d'indagine il Narratore ti dice quanti indizi hai trovato e quanti ce n'erano, e te ne dà uno di quelli che ti sono sfuggiti.",
    "attivo": "Fai una domanda al Narratore su quello che il tuo personaggio sa (i suoi studi, il suo mestiere, quello che ha visto etc..): se il personaggio lo può sapere, il Narratore ti risponde.",
    "passivo": "A fine scena d'indagine il Narratore ti dice quanti indizi hai trovato e quanti ce n'erano, e te ne dà uno di quelli che ti sono sfuggiti.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Manca ancora qualcosa.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "rivelare",
    "formulaName": "Rivelare",
    "link": "tavolo",
    "page": "Mente",
    "hooks": [
      "narratore",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Al cambio di scena",
    "costoVariabile": null
  },
  {
    "id": "morale",
    "spheres": [
      "mind"
    ],
    "name": "Morale",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Finché sei in scena, a fine scena ogni compagno recupera 1 Volontà superficiale.",
    "attivo": "",
    "passivo": "Finché sei in scena, a fine scena ogni compagno recupera 1 Volontà superficiale.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Forza, ragazzi.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "guarire",
    "formulaName": "Guarire",
    "link": "effetto",
    "page": "Mente",
    "hooks": [
      "salute",
      "altri",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "pace",
    "spheres": [
      "mind",
      "spirit"
    ],
    "name": "Pace forzata",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Con la tua reazione (ne hai una per turno), quando qualcuno sta per fare un'azione offensiva, la neghi: per quel turno non fa niente per ferire, ma può difendersi e fare il resto.\n\nEffetto passivo (Sempre): Chi vuole cominciare uno scontro in tua presenza, o fare un'azione offensiva per ferire, deve prima superare una soglia pari ai poteri che conosci nella Sfera. Chi mangia alla tua tavola non ti attacca finché non è uscito di casa tua.",
    "attivo": "Con la tua reazione (ne hai una per turno), quando qualcuno sta per fare un'azione offensiva, la neghi: per quel turno non fa niente per ferire, ma può difendersi e fare il resto.",
    "passivo": "Chi vuole cominciare uno scontro in tua presenza, o fare un'azione offensiva per ferire, deve prima superare una soglia pari ai poteri che conosci nella Sfera. Chi mangia alla tua tavola non ti attacca finché non è uscito di casa tua.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Un momento solo, per me.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "guarire",
    "formulaName": "Guarire",
    "link": "effetto",
    "page": "Mente",
    "hooks": [
      "salute",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "pensiero-laterale",
    "spheres": [
      "mind"
    ],
    "name": "Pensiero laterale",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Chiedi al Narratore una soluzione in più: un'idea che prima non avevi avuto.\n\nEffetto passivo (Sempre): Quando spieghi al tavolo il ragionamento che risolve il problema per un'altra strada, e regge, tiri con l'Abilità di quella strada al posto di quella chiesta, e hai 2 dadi in più.",
    "attivo": "Chiedi al Narratore una soluzione in più: un'idea che prima non avevi avuto.",
    "passivo": "Quando spieghi al tavolo il ragionamento che risolve il problema per un'altra strada, e regge, tiri con l'Abilità di quella strada al posto di quella chiesta, e hai 2 dadi in più.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«E se lo guardassimo da un'altra parte?»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "sapere",
    "formulaName": "Sapere",
    "link": "tavolo",
    "page": "Mente",
    "hooks": [
      "uso"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "valvola-di-sfogo",
    "spheres": [
      "mind"
    ],
    "name": "Valvola di sfogo",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Quando prendi una Condizione mentale, paghi e non la prendi (si aggiornerà a catena col rifacimento delle Condizioni).\n\nEffetto passivo (Sempre): Quando prendi danni mentali, puoi prendere una Condizione mentale al posto dei danni (si aggiornerà a catena col rifacimento delle Condizioni).",
    "attivo": "Quando prendi una Condizione mentale, paghi e non la prendi (si aggiornerà a catena col rifacimento delle Condizioni).",
    "passivo": "Quando prendi danni mentali, puoi prendere una Condizione mentale al posto dei danni (si aggiornerà a catena col rifacimento delle Condizioni).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Adesso urlo, poi passa.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "resistere",
    "formulaName": "Resistere",
    "link": "verbo",
    "page": "Mente",
    "hooks": [
      "salute",
      "condizione"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "volonta-prestata",
    "spheres": [
      "mind"
    ],
    "name": "Volontà prestata",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Spendi 1 Volontà tua: un compagno ritira come se l'avesse spesa lui.",
    "attivo": "Spendi 1 Volontà tua: un compagno ritira come se l'avesse spesa lui.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Dai, riprova. Ci penso io.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "vincolare",
    "formulaName": "Vincolare",
    "link": "verbo",
    "page": "Mente",
    "hooks": [
      "tiro",
      "salute",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "chiodo-fisso",
    "spheres": [
      "mind"
    ],
    "name": "Chiodo fisso",
    "dot": 3,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: A inizio sessione scegli un obiettivo: la Volontà che spendi per lui ti torna a fine scena.",
    "attivo": "",
    "passivo": "A inizio sessione scegli un obiettivo: la Volontà che spendi per lui ti torna a fine scena.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Non mollo finché non ce l'ho.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "guarire",
    "formulaName": "Guarire",
    "link": "regola",
    "page": "Mente",
    "hooks": [
      "salute",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "come-da-piano",
    "spheres": [
      "mind"
    ],
    "name": "Come da piano",
    "dot": 3,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Se il gruppo segue un piano che hai spiegato prima della scena, per quella scena ognuno ha 2 dadi in più nei tiri di Abilità.",
    "attivo": "",
    "passivo": "Se il gruppo segue un piano che hai spiegato prima della scena, per quella scena ognuno ha 2 dadi in più nei tiri di Abilità.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Tutto come previsto.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "potenziare",
    "formulaName": "Potenziare",
    "link": "regola",
    "page": "Mente",
    "hooks": [
      "tiro"
    ],
    "effects": [
      {
        "on": "dice",
        "value": 2,
        "roll": "abilita",
        "nota": "Se il gruppo segue un piano che hai spiegato prima della scena, per quella scena ognuno ha 2 dadi in più nei tiri di Abilità."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "due-mosse-avanti",
    "spheres": [
      "mind"
    ],
    "name": "Due mosse avanti",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena, prima che qualcuno agisca, il Narratore ti dice cosa farà, e agisci tu prima di lui.",
    "attivo": "Una volta per scena, prima che qualcuno agisca, il Narratore ti dice cosa farà, e agisci tu prima di lui.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Sapevo che l'avresti fatto.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "prevedere",
    "formulaName": "Prevedere",
    "link": "effetto",
    "page": "Mente",
    "hooks": [
      "uso",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "tre-ipotesi",
    "spheres": [
      "mind"
    ],
    "name": "Tre ipotesi",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione il Narratore ti dà tre ipotesi sul mistero: una è quella vera.",
    "attivo": "Una volta per sessione il Narratore ti dà tre ipotesi sul mistero: una è quella vera.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Una di queste è giusta.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "rivelare",
    "formulaName": "Rivelare",
    "link": "tavolo",
    "page": "Mente",
    "hooks": [
      "uso",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "vedo-il-bluff",
    "spheres": [
      "mind"
    ],
    "name": "Vedo il bluff",
    "dot": 3,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Nelle contese sociali tiri dopo l'avversario, sapendo il suo risultato, e puoi ritirarti senza perdere.",
    "attivo": "",
    "passivo": "Nelle contese sociali tiri dopo l'avversario, sapendo il suo risultato, e puoi ritirarti senza perdere.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Stai bluffando.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "sapere",
    "formulaName": "Sapere",
    "link": "verbo",
    "page": "Mente",
    "hooks": [
      "tiro"
    ],
    "effects": [
      {
        "on": "nota",
        "roll": "abilita",
        "nota": "Nelle contese sociali tiri dopo l'avversario, sapendo il suo risultato, e puoi ritirarti senza perdere."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "alle-strette",
    "spheres": [
      "mind"
    ],
    "name": "Alle strette",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena, quando sai che un PNG ti mente e la sua Fermezza è più bassa dei poteri che conosci in Mente, senza tiro confessa o se ne va.",
    "attivo": "Una volta per scena, quando sai che un PNG ti mente e la sua Fermezza è più bassa dei poteri che conosci in Mente, senza tiro confessa o se ne va.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Adesso dimmi la verità.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "condizionare",
    "formulaName": "Condizionare",
    "link": "effetto",
    "page": "Mente",
    "hooks": [
      "uso",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "distrazione",
    "spheres": [
      "mind"
    ],
    "name": "Distrazione",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena, quando qualcuno sta per tirare, un tuo tiro sociale riuscito gli fa perdere il tiro.",
    "attivo": "Una volta per scena, quando qualcuno sta per tirare, un tuo tiro sociale riuscito gli fa perdere il tiro.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Ehi, guarda là!»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "confondere",
    "formulaName": "Confondere",
    "link": "effetto",
    "page": "Mente",
    "hooks": [
      "uso",
      "tiro"
    ],
    "effects": [
      {
        "mode": "attivo",
        "on": "nota",
        "roll": "abilita",
        "nota": "Una volta per scena, quando qualcuno sta per tirare, un tuo tiro sociale riuscito gli fa perdere il tiro."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "parole-che-pesano",
    "spheres": [
      "mind"
    ],
    "name": "Parole che pesano",
    "dot": 4,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Un tuo tiro sociale riuscito può infliggere una Condizione mentale (si aggiornerà a catena col rifacimento delle Condizioni), senza Magick.",
    "attivo": "",
    "passivo": "Un tuo tiro sociale riuscito può infliggere una Condizione mentale (si aggiornerà a catena col rifacimento delle Condizioni), senza Magick.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Le parole fanno male.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "suggestionare",
    "formulaName": "Suggestionare",
    "link": "effetto",
    "page": "Mente",
    "hooks": [
      "tiro",
      "condizione"
    ],
    "effects": [
      {
        "on": "nota",
        "roll": "abilita",
        "nota": "Un tuo tiro sociale riuscito può infliggere una Condizione mentale (si aggiornerà a catena col rifacimento delle Condizioni), senza Magick."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "goccia-a-goccia",
    "spheres": [
      "mind"
    ],
    "name": "Goccia a goccia",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Con un PNG che hai incontrato in tre scene diverse, un tiro sociale riuscito lo cambia per sempre: diventa amico, alleato o debitore.",
    "attivo": "Con un PNG che hai incontrato in tre scene diverse, un tiro sociale riuscito lo cambia per sempre: diventa amico, alleato o debitore.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Piano piano, ti convinco.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "dominare",
    "formulaName": "Dominare",
    "link": "verbo",
    "page": "Mente",
    "hooks": [
      "tiro",
      "altri"
    ],
    "effects": [
      {
        "on": "nota",
        "roll": "abilita",
        "nota": "Con un PNG che hai incontrato in tre scene diverse, un tiro sociale riuscito lo cambia per sempre: diventa amico, alleato o debitore."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "il-mio-disastro",
    "spheres": [
      "prime"
    ],
    "name": "Il mio disastro",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione descrivi tu come scoppia un tuo dado rosso, e il racconto non deve farti comodo.",
    "attivo": "Una volta per sessione descrivi tu come scoppia un tuo dado rosso, e il racconto non deve farti comodo.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Almeno il disastro lo scelgo io.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Lavora sul Contraccolpo, non ne fa di suo.",
    "formula": "proteggere",
    "formulaName": "Proteggere",
    "link": "tavolo",
    "page": "Primordio",
    "hooks": [
      "uso",
      "tiro",
      "paradosso"
    ],
    "effects": [
      {
        "mode": "attivo",
        "on": "nota",
        "roll": "magick",
        "nota": "Una volta per sessione descrivi tu come scoppia un tuo dado rosso, e il racconto non deve farti comodo."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "niente-di-perso",
    "spheres": [
      "prime"
    ],
    "name": "Niente di perso",
    "dot": 1,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Quando il lancio con l'Armonia dei compagni fallisce, i dadi tornano a chi te li ha dati, per un suo tiro nella scena.",
    "attivo": "",
    "passivo": "Quando il lancio con l'Armonia dei compagni fallisce, i dadi tornano a chi te li ha dati, per un suo tiro nella scena.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Non l'avete sprecata.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "spostare",
    "formulaName": "Spostare",
    "link": "regola",
    "page": "Primordio",
    "hooks": [
      "tiro",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "pulito",
    "spheres": [
      "prime"
    ],
    "name": "Pulito",
    "dot": 1,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Se chiudi la sessione a Paradosso zero, la sessione dopo cominci con 2 Quintessenza in più.",
    "attivo": "",
    "passivo": "Se chiudi la sessione a Paradosso zero, la sessione dopo cominci con 2 Quintessenza in più.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Neanche una macchia.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "riparare",
    "formulaName": "Riparare",
    "link": "regola",
    "page": "Primordio",
    "hooks": [
      "quintessenza",
      "paradosso",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "risarcimento",
    "spheres": [
      "prime"
    ],
    "name": "Risarcimento",
    "dot": 1,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Quando il Narratore spende la Scheda del Paradosso contro di te, prendi 1 Quintessenza.",
    "attivo": "",
    "passivo": "Quando il Narratore spende la Scheda del Paradosso contro di te, prendi 1 Quintessenza.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Almeno pagami.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "drenare",
    "formulaName": "Drenare",
    "link": "regola",
    "page": "Primordio",
    "hooks": [
      "quintessenza",
      "paradosso",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "strumento-di-fortuna",
    "spheres": [
      "prime"
    ],
    "name": "Strumento di fortuna",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Paga 1 Quintessenza: per un lancio usi uno Strumento che non è il tuo come se fosse tuo. Il premio dell'Areté lo decide sempre il Narratore.",
    "attivo": "Paga 1 Quintessenza: per un lancio usi uno Strumento che non è il tuo come se fosse tuo. Il premio dell'Areté lo decide sempre il Narratore.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Va bene anche questo.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Segue il lancio effetto attivo, nessuno effetto passivo.",
    "formula": "vincolare",
    "formulaName": "Vincolare",
    "link": "regola",
    "page": "Primordio",
    "hooks": [
      "tiro",
      "quintessenza",
      "narratore"
    ],
    "effects": [
      {
        "mode": "attivo",
        "on": "nota",
        "roll": "magick",
        "nota": "Paga 1 Quintessenza: per un lancio usi uno Strumento che non è il tuo come se fosse tuo. Il premio dell'Areté lo decide sempre il Narratore."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "travaso",
    "spheres": [
      "prime"
    ],
    "name": "Travaso",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Passi 1 Quintessenza a un compagno in vista come azione libera; se conosci 3 poteri di Primordio ne passi quanti vuoi, ma è un'azione.\n\nEffetto passivo: Puoi spendere la tua Quintessenza nei lanci di un compagno che tocchi, dentro il suo tetto.",
    "attivo": "Passi 1 Quintessenza a un compagno in vista come azione libera; se conosci 3 poteri di Primordio ne passi quanti vuoi, ma è un'azione.",
    "passivo": "Puoi spendere la tua Quintessenza nei lanci di un compagno che tocchi, dentro il suo tetto.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Tieni, ti serve più che a me.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "spostare",
    "formulaName": "Spostare",
    "link": "effetto",
    "page": "Primordio",
    "hooks": [
      "tiro",
      "quintessenza",
      "combattimento",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "anche-a-mani-nude",
    "spheres": [
      "prime"
    ],
    "name": "Anche a mani nude",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Spendi Quintessenza anche nei tiri di Abilità: ogni punto è un dado, dentro il tetto.",
    "attivo": "",
    "passivo": "Spendi Quintessenza anche nei tiri di Abilità: ogni punto è un dado, dentro il tetto.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«La Quintessenza non serve solo alla Magick.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "potenziare",
    "formulaName": "Potenziare",
    "link": "regola",
    "page": "Primordio",
    "hooks": [
      "tiro",
      "quintessenza"
    ],
    "effects": [
      {
        "on": "quintessenceOnSkills",
        "roll": "abilita",
        "nota": "Spendi Quintessenza anche nei tiri di Abilità: ogni punto è un dado, dentro il tetto."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "bussola-comune",
    "spheres": [
      "prime"
    ],
    "name": "Bussola comune",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Quando un compagno rispetta la sua Bussola, la tua si riarma. Se avete una credenza in comune, prendi anche tu 1 Quintessenza.",
    "attivo": "",
    "passivo": "Quando un compagno rispetta la sua Bussola, la tua si riarma. Se avete una credenza in comune, prendi anche tu 1 Quintessenza.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Andiamo nella stessa direzione.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "benedire-e-maledire",
    "formulaName": "Benedire e Maledire",
    "link": "regola",
    "page": "Primordio",
    "hooks": [
      "quintessenza",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "cambiavalute",
    "spheres": [
      "prime"
    ],
    "name": "Cambiavalute",
    "dot": 2,
    "type": "",
    "kind": "",
    "text": "Effetto Amalgama: Accesso con Mente: una volta per scena cambi 1 Volontà in 1 Quintessenza, o il contrario.\nAccesso con Vita: una volta per scena cambi 1 livello di Salute in 1 Quintessenza, e la casella resta bloccata dal Paradosso.",
    "attivo": "",
    "passivo": "",
    "amalgama": "Con Mente: una volta per scena cambi 1 Volontà in 1 Quintessenza, o il contrario.\nCon Vita: una volta per scena cambi 1 livello di Salute in 1 Quintessenza, e la casella resta bloccata dal Paradosso.",
    "amalgam": "mind",
    "amalgams": [
      "mind",
      "life"
    ],
    "amalgamText": "Accesso con Mente: una volta per scena cambi 1 Volontà in 1 Quintessenza, o il contrario.\nAccesso con Vita: una volta per scena cambi 1 livello di Salute in 1 Quintessenza, e la casella resta bloccata dal Paradosso.",
    "flavor": "«Tutto ha il suo cambio.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "spostare",
    "formulaName": "Spostare",
    "link": "verbo",
    "page": "Primordio",
    "hooks": [
      "uso",
      "quintessenza",
      "paradosso",
      "salute"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "casa-dolce-casa",
    "spheres": [
      "mind",
      "prime",
      "spirit"
    ],
    "name": "Casa dolce casa",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Quando torni al Santuario dopo una sessione passata fuori:\nAccesso con Primordio: recuperi la Quintessenza fino a 3.\nAccesso con Mente: recuperi tutta la Volontà.\nAccesso con Spirito: cancelli una Macchia.",
    "attivo": "",
    "passivo": "Quando torni al Santuario dopo una sessione passata fuori:\nAccesso con Primordio: recuperi la Quintessenza fino a 3.\nAccesso con Mente: recuperi tutta la Volontà.\nAccesso con Spirito: cancelli una Macchia.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Casa, finalmente.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "riparare",
    "formulaName": "Riparare",
    "link": "regola",
    "page": "Primordio",
    "hooks": [
      "quintessenza",
      "salute",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "coro",
    "spheres": [
      "prime"
    ],
    "name": "Coro",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: I dadi di Armonia che ricevi in un lancio valgono 1 più il numero di chi partecipa.",
    "attivo": "",
    "passivo": "I dadi di Armonia che ricevi in un lancio valgono 1 più il numero di chi partecipa.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Tutti insieme.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo; il passivo segue il lancio.",
    "formula": "potenziare",
    "formulaName": "Potenziare",
    "link": "regola",
    "page": "Primordio",
    "hooks": [
      "tiro"
    ],
    "effects": [
      {
        "on": "nota",
        "roll": "magick",
        "nota": "I dadi di Armonia che ricevi in un lancio valgono 1 più il numero di chi partecipa."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "pila",
    "spheres": [
      "prime"
    ],
    "name": "Pila",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Metti in un oggetto (una batteria, una pietra, un anello) Quintessenza fino ai poteri che conosci in Primordio, e la riprendi in un'altra scena.",
    "attivo": "Metti in un oggetto (una batteria, una pietra, un anello) Quintessenza fino ai poteri che conosci in Primordio, e la riprendi in un'altra scena.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Tengo una scorta.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "riparare",
    "formulaName": "Riparare",
    "link": "effetto",
    "page": "Primordio",
    "hooks": [
      "quintessenza"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "prendo-io",
    "spheres": [
      "prime"
    ],
    "name": "Prendo io",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Quando a un compagno scoppia un dado rosso, puoi prendere tu l'Ustione.",
    "attivo": "Quando a un compagno scoppia un dado rosso, puoi prendere tu l'Ustione.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Lascia, prendo io.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Lavora sul Contraccolpo, non ne fa di suo.",
    "formula": "proteggere",
    "formulaName": "Proteggere",
    "link": "effetto",
    "page": "Primordio",
    "hooks": [
      "tiro",
      "paradosso",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "tabu",
    "spheres": [
      "prime"
    ],
    "name": "Tabù",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: A inizio sessione scegli un tabù: se lo rispetti fino a fine sessione prendi 3 Quintessenza, se lo rompi perdi 2 Volontà.\n\nEffetto Amalgama: Accesso con Mente: un tabù di condotta (non mentire, non alzare la voce, non chiedere aiuto).\nAccesso con Spirito: un tabù rituale (non toccare ferro, non mangiare carne, non varcare una soglia senza invito).",
    "attivo": "",
    "passivo": "A inizio sessione scegli un tabù: se lo rispetti fino a fine sessione prendi 3 Quintessenza, se lo rompi perdi 2 Volontà.",
    "amalgama": "Con Mente: un tabù di condotta (non mentire, non alzare la voce, non chiedere aiuto).\nCon Spirito: un tabù rituale (non toccare ferro, non mangiare carne, non varcare una soglia senza invito).",
    "amalgam": "mind",
    "amalgams": [
      "mind",
      "spirit"
    ],
    "amalgamText": "Accesso con Mente: un tabù di condotta (non mentire, non alzare la voce, non chiedere aiuto).\nAccesso con Spirito: un tabù rituale (non toccare ferro, non mangiare carne, non varcare una soglia senza invito).",
    "flavor": "«Quello non lo faccio. Mai.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "vincolare",
    "formulaName": "Vincolare",
    "link": "verbo",
    "page": "Primordio",
    "hooks": [
      "tiro",
      "quintessenza",
      "salute",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "tenuta",
    "spheres": [
      "prime"
    ],
    "name": "Tenuta",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: I tuoi effetti mantenuti restano quando prendi danni o perdi i sensi.\n\nEffetto Amalgama: Accesso con Mente: restano anche quando ti distraggono o ti influenzano.",
    "attivo": "",
    "passivo": "I tuoi effetti mantenuti restano quando prendi danni o perdi i sensi.",
    "amalgama": "Con Mente: restano anche quando ti distraggono o ti influenzano.",
    "amalgam": "mind",
    "amalgams": [
      "mind"
    ],
    "amalgamText": "Accesso con Mente: restano anche quando ti distraggono o ti influenzano.",
    "flavor": "«Non mollo la presa.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo; il passivo segue l'effetto mantenuto.",
    "formula": "fissare",
    "formulaName": "Fissare",
    "link": "regola",
    "page": "Primordio",
    "hooks": [
      "salute"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "a-credito",
    "spheres": [
      "prime"
    ],
    "name": "A credito",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione spendi fino a 3 Quintessenza che non hai, e la ripaghi doppia appena la guadagni. Se a fine sessione non l'hai ripagata, prendi danni aggravati pari a quella che manca.",
    "attivo": "Una volta per sessione spendi fino a 3 Quintessenza che non hai, e la ripaghi doppia appena la guadagni. Se a fine sessione non l'hai ripagata, prendi danni aggravati pari a quella che manca.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Segna, pago dopo.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "creare-e-distruggere",
    "formulaName": "Creare e Distruggere",
    "link": "regola",
    "page": "Primordio",
    "hooks": [
      "uso",
      "quintessenza",
      "salute",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "recupero",
    "spheres": [
      "prime"
    ],
    "name": "Recupero",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Una volta per sessione, invece di 1 Quintessenza ne recuperi 3.\n\nEffetto passivo: Accesso con Primordio: recuperi 1 Quintessenza quando un lancio Volgare riesce senza scoppio.\n\nEffetto Amalgama: Accesso con Corrispondenza: recuperi 1 punto in più se correggi anomalie spaziali.\nAccesso con Entropia: ottieni un punto in più quando rubi la fortuna altrui.\nAccesso con Forza: ottieni un punto in più quando dreni un'energia.\nAccesso con Materia: ottieni un punto in più se dissolvi l'oggetto bersaglio.\nAccesso con Mente: recuperi 1 punto in più se ferisci o cancelli parti della psiche del bersaglio.\nAccesso con Spirito: se ferisci una creatura dell'Umbra infliggendole danni, recuperi 1 punto in più.\nAccesso con Tempo: recuperi 1 punto in più se correggi un'anomalia temporale.\nAccesso con Vita: se ferisci una creatura vivente infliggendole danni, recuperi 1 punto in più.",
    "attivo": "Una volta per sessione, invece di 1 Quintessenza ne recuperi 3.",
    "passivo": "Accesso con Primordio: recuperi 1 Quintessenza quando un lancio Volgare riesce senza scoppio.",
    "amalgama": "Con Corrispondenza: recuperi 1 punto in più se correggi anomalie spaziali.\nCon Entropia: ottieni un punto in più quando rubi la fortuna altrui.\nCon Forza: ottieni un punto in più quando dreni un'energia.\nCon Materia: ottieni un punto in più se dissolvi l'oggetto bersaglio.\nCon Mente: recuperi 1 punto in più se ferisci o cancelli parti della psiche del bersaglio.\nCon Spirito: se ferisci una creatura dell'Umbra infliggendole danni, recuperi 1 punto in più.\nCon Tempo: recuperi 1 punto in più se correggi un'anomalia temporale.\nCon Vita: se ferisci una creatura vivente infliggendole danni, recuperi 1 punto in più.",
    "amalgam": "any",
    "amalgams": [
      "any"
    ],
    "amalgamText": "Accesso con Corrispondenza: recuperi 1 punto in più se correggi anomalie spaziali.\nAccesso con Entropia: ottieni un punto in più quando rubi la fortuna altrui.\nAccesso con Forza: ottieni un punto in più quando dreni un'energia.\nAccesso con Materia: ottieni un punto in più se dissolvi l'oggetto bersaglio.\nAccesso con Mente: recuperi 1 punto in più se ferisci o cancelli parti della psiche del bersaglio.\nAccesso con Spirito: se ferisci una creatura dell'Umbra infliggendole danni, recuperi 1 punto in più.\nAccesso con Tempo: recuperi 1 punto in più se correggi un'anomalia temporale.\nAccesso con Vita: se ferisci una creatura vivente infliggendole danni, recuperi 1 punto in più.",
    "flavor": "«Ogni goccia torna al fiume.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "spostare",
    "formulaName": "Spostare",
    "link": "effetto",
    "page": "Primordio",
    "hooks": [
      "uso",
      "tiro",
      "quintessenza",
      "paradosso",
      "salute",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "scuola",
    "spheres": [
      "prime"
    ],
    "name": "Scuola",
    "dot": 3,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Quando un compagno lancia seguendo le indicazioni che gli hai dato (il gesto, lo Strumento, le parole), prende il premio dell'Areté.",
    "attivo": "",
    "passivo": "Quando un compagno lancia seguendo le indicazioni che gli hai dato (il gesto, lo Strumento, le parole), prende il premio dell'Areté.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Fai come ti ho insegnato.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo; il passivo segue il lancio.",
    "formula": "benedire-e-maledire",
    "formulaName": "Benedire e Maledire",
    "link": "regola",
    "page": "Primordio",
    "hooks": [
      "tiro",
      "combattimento",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "sifone",
    "spheres": [
      "prime"
    ],
    "name": "Sifone",
    "dot": 3,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Quando un nemico spende Quintessenza in tua vista, ne prendi 1. Ogni 2 che prendi così, prendi 1 Paradosso.",
    "attivo": "",
    "passivo": "Quando un nemico spende Quintessenza in tua vista, ne prendi 1. Ogni 2 che prendi così, prendi 1 Paradosso.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Quella la prendo io.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo; nel passivo il Paradosso è già il prezzo.",
    "formula": "drenare",
    "formulaName": "Drenare",
    "link": "effetto",
    "page": "Primordio",
    "hooks": [
      "quintessenza",
      "paradosso",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "terra-sacra",
    "spheres": [
      "prime"
    ],
    "name": "Terra sacra",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Paga 1 Quintessenza: per la sessione un luogo vale come un tuo Santuario. Con 3 Quintessenza resta per sempre.\n\nEffetto Amalgama: Accesso con Spirito: lì i tuoi lanci verso l'effimera hanno dadi in più pari ai poteri che conosci in Spirito.",
    "attivo": "Paga 1 Quintessenza: per la sessione un luogo vale come un tuo Santuario. Con 3 Quintessenza resta per sempre.",
    "passivo": "",
    "amalgama": "Con Spirito: lì i tuoi lanci verso l'effimera hanno dadi in più pari ai poteri che conosci in Spirito.",
    "amalgam": "spirit",
    "amalgams": [
      "spirit"
    ],
    "amalgamText": "Accesso con Spirito: lì i tuoi lanci verso l'effimera hanno dadi in più pari ai poteri che conosci in Spirito.",
    "flavor": "«Questo posto adesso è mio.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "inventare",
    "formulaName": "Inventare",
    "link": "effetto",
    "page": "Primordio",
    "hooks": [
      "uso",
      "tiro",
      "quintessenza",
      "scena"
    ],
    "effects": [
      {
        "on": "dice",
        "value": {
          "from": "poteri",
          "sphere": "spirit"
        },
        "roll": "magick",
        "requires": "spirit",
        "nota": "Accesso con Spirito: lì i tuoi lanci verso l'effimera hanno dadi in più pari ai poteri che conosci in Spirito."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "pagare-in-paradosso",
    "spheres": [
      "prime"
    ],
    "name": "Pagare in Paradosso",
    "dot": 4,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Un costo in Quintessenza lo paghi prendendo Paradosso, punto per punto.",
    "attivo": "",
    "passivo": "Un costo in Quintessenza lo paghi prendendo Paradosso, punto per punto.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Pago col Paradosso.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Il Paradosso è il prezzo, non ne fa altro di suo.",
    "formula": "spostare",
    "formulaName": "Spostare",
    "link": "regola",
    "page": "Primordio",
    "hooks": [
      "quintessenza",
      "paradosso"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "parafulmine",
    "spheres": [
      "prime"
    ],
    "name": "Parafulmine",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga X Quintessenza: per ogni Quintessenza pagata riduci l'Ustione di 2.\n\nEffetto passivo: Accesso con Primordio: quando un Contraccolpo scoppia, la Quintessenza che avevi speso nel lancio torna a te (Terra bruciata).",
    "attivo": "Paga X Quintessenza: per ogni Quintessenza pagata riduci l'Ustione di 2.",
    "passivo": "Accesso con Primordio: quando un Contraccolpo scoppia, la Quintessenza che avevi speso nel lancio torna a te (Terra bruciata).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Il Paradosso non ha pietà, ma puoi rabbonirlo.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Lavora sul Contraccolpo, non ne fa di suo, in tutte e due le forme.",
    "formula": "proteggere",
    "formulaName": "Proteggere",
    "link": "effetto",
    "page": "Primordio",
    "hooks": [
      "quintessenza",
      "paradosso",
      "combattimento"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "doppia-modifica",
    "spheres": [
      "prime"
    ],
    "name": "Doppia modifica",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione applichi due poteri allo stesso lancio.",
    "attivo": "Una volta per sessione applichi due poteri allo stesso lancio.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Perché scegliere?»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Segue il lancio effetto attivo, nessuno effetto passivo.",
    "formula": "potenziare",
    "formulaName": "Potenziare",
    "link": "regola",
    "page": "Primordio",
    "hooks": [
      "uso"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "di-la-non-contano",
    "spheres": [
      "spirit"
    ],
    "name": "Di là non contano",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena un tuo lancio Volgare fatto per intero nell'Umbra non conta come Volgare.",
    "attivo": "Una volta per scena un tuo lancio Volgare fatto per intero nell'Umbra non conta come Volgare.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Di là nessuno ci fa caso.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Segue il lancio effetto attivo, che conta come Accidentale; nessuno effetto passivo.",
    "formula": "celare",
    "formulaName": "Celare",
    "link": "regola",
    "page": "Spirito",
    "hooks": [
      "uso"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "interprete",
    "spheres": [
      "spirit"
    ],
    "name": "Interprete",
    "dot": 1,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Quando un compagno tratta con uno spirito, tirate tutti e due il tiro sociale e vale il più alto; il favore resta a lui.",
    "attivo": "",
    "passivo": "Quando un compagno tratta con uno spirito, tirate tutti e due il tiro sociale e vale il più alto; il favore resta a lui.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Lascia parlare me.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "comunicare",
    "formulaName": "Comunicare",
    "link": "effetto",
    "page": "Spirito",
    "hooks": [
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "pellegrino",
    "spheres": [
      "spirit"
    ],
    "name": "Pellegrino",
    "dot": 1,
    "type": "",
    "kind": "",
    "text": "Effetto Amalgama: Accesso con Primordio: la prima volta che entri in un luogo sacro nuovo (una chiesa, un Nodo, una tomba), prendi 1 Quintessenza.",
    "attivo": "",
    "passivo": "",
    "amalgama": "Con Primordio: la prima volta che entri in un luogo sacro nuovo (una chiesa, un Nodo, una tomba), prendi 1 Quintessenza.",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "Accesso con Primordio: la prima volta che entri in un luogo sacro nuovo (una chiesa, un Nodo, una tomba), prendi 1 Quintessenza.",
    "flavor": "«Ogni luogo sacro ha qualcosa da darti.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "drenare",
    "formulaName": "Drenare",
    "link": "verbo",
    "page": "Spirito",
    "hooks": [
      "quintessenza"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "reliquia",
    "spheres": [
      "spirit"
    ],
    "name": "Reliquia",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Un oggetto che porti da almeno una sessione diventa una reliquia: finché lo porti, ti protegge da una Condizione che scegli tu (si aggiornerà a catena col rifacimento delle Condizioni). Se lo perdi, perdi 1 Volontà.",
    "attivo": "",
    "passivo": "Un oggetto che porti da almeno una sessione diventa una reliquia: finché lo porti, ti protegge da una Condizione che scegli tu (si aggiornerà a catena col rifacimento delle Condizioni). Se lo perdi, perdi 1 Volontà.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Me l'ha data mia nonna.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, basso rischio effetto passivo.",
    "formula": "proteggere",
    "formulaName": "Proteggere",
    "link": "verbo",
    "page": "Spirito",
    "hooks": [
      "salute",
      "condizione"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "segni",
    "spheres": [
      "spirit"
    ],
    "name": "Segni",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: A inizio sessione il Narratore ti dà un segno (una frase, un'immagine). Quando lo riconosci in gioco prendi un premio del campo di Spirito, a discrezione del Narratore (un avvertimento, un aiuto da uno spirito, un segno in più).\n\nEffetto Amalgama: Accesso con Primordio: il premio è 1 Quintessenza.\nil premio è una cosa del loro campo, a discrezione del Narratore.",
    "attivo": "",
    "passivo": "A inizio sessione il Narratore ti dà un segno (una frase, un'immagine). Quando lo riconosci in gioco prendi un premio del campo di Spirito, a discrezione del Narratore (un avvertimento, un aiuto da uno spirito, un segno in più).",
    "amalgama": "Con Primordio: il premio è 1 Quintessenza.\nil premio è una cosa del loro campo, a discrezione del Narratore.",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "Accesso con Primordio: il premio è 1 Quintessenza.\nil premio è una cosa del loro campo, a discrezione del Narratore.",
    "flavor": "«L'avevo sognato.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "prevedere",
    "formulaName": "Prevedere",
    "link": "tavolo",
    "page": "Spirito",
    "hooks": [
      "quintessenza",
      "narratore",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "favori",
    "spheres": [
      "spirit"
    ],
    "name": "Favori",
    "dot": 3,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Ogni spirito che aiuti ti deve un favore: il Narratore lo segna, e tu lo riscuoti quando vuoi.",
    "attivo": "",
    "passivo": "Ogni spirito che aiuti ti deve un favore: il Narratore lo segna, e tu lo riscuoti quando vuoi.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Me ne devi uno.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "vincolare",
    "formulaName": "Vincolare",
    "link": "verbo",
    "page": "Spirito",
    "hooks": [
      "altri",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "lascio-fare-a-lui",
    "spheres": [
      "spirit"
    ],
    "name": "Lascio fare a lui",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena lasci il comando al tuo totem: il Narratore sceglie la tua azione, e l'azione riesce.",
    "attivo": "Una volta per scena lasci il comando al tuo totem: il Narratore sceglie la tua azione, e l'azione riesce.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Fai tu.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo; se l'azione è un lancio, segue il lancio.",
    "formula": "evocare",
    "formulaName": "Evocare",
    "link": "verbo",
    "page": "Spirito",
    "hooks": [
      "uso",
      "tiro",
      "combattimento",
      "narratore"
    ],
    "effects": [
      {
        "mode": "attivo",
        "on": "autoSuccess",
        "roll": "any",
        "nota": "Una volta per scena lasci il comando al tuo totem: il Narratore sceglie la tua azione, e l'azione riesce."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "l-avatar-reagisce",
    "spheres": [
      "spirit"
    ],
    "name": "L'Avatar reagisce",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione, quando non puoi agire (svenuto, legato, paralizzato), fai un'azione lo stesso: la guida l'Avatar.",
    "attivo": "Una volta per sessione, quando non puoi agire (svenuto, legato, paralizzato), fai un'azione lo stesso: la guida l'Avatar.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Anche quando dormo, qualcuno resta sveglio.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "possedere",
    "formulaName": "Possedere",
    "link": "tavolo",
    "page": "Spirito",
    "hooks": [
      "uso",
      "combattimento"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "angelo-custode",
    "spheres": [
      "spirit"
    ],
    "name": "Angelo custode",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione, quando stai per morire, ti salva una creatura dell'oltre (uno spirito, un morto, un'entità). Le devi qualcosa, e il Narratore lo segna.",
    "attivo": "Una volta per sessione, quando stai per morire, ti salva una creatura dell'oltre (uno spirito, un morto, un'entità). Le devi qualcosa, e il Narratore lo segna.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Non era ancora la tua ora.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "evocare",
    "formulaName": "Evocare",
    "link": "verbo",
    "page": "Spirito",
    "hooks": [
      "uso",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "voce-dell-avatar",
    "spheres": [
      "spirit"
    ],
    "name": "Voce dell'Avatar",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione il Narratore ti dice la cosa giusta da fare nella scena; se la fai, il premio dell'Areté vale doppio.",
    "attivo": "Una volta per sessione il Narratore ti dice la cosa giusta da fare nella scena; se la fai, il premio dell'Areté vale doppio.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Ascolta.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Segue il lancio effetto attivo, nessuno effetto passivo.",
    "formula": "sapere",
    "formulaName": "Sapere",
    "link": "tavolo",
    "page": "Spirito",
    "hooks": [
      "uso",
      "tiro",
      "narratore"
    ],
    "effects": [
      {
        "mode": "attivo",
        "on": "prizeDouble",
        "roll": "magick",
        "nota": "Una volta per sessione il Narratore ti dice la cosa giusta da fare nella scena; se la fai, il premio dell'Areté vale doppio."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "il-ritorno",
    "spheres": [
      "spirit"
    ],
    "name": "Il ritorno",
    "dot": 5,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Una volta per campagna, se il personaggio muore, torna nella sessione dopo, cambiato; il Narratore sceglie come.",
    "attivo": "",
    "passivo": "Una volta per campagna, se il personaggio muore, torna nella sessione dopo, cambiato; il Narratore sceglie come.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Mi avete dato per morto troppo presto.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "campagna",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, basso rischio effetto passivo.",
    "formula": "resuscitare",
    "formulaName": "Resuscitare",
    "link": "verbo",
    "page": "Spirito",
    "hooks": [
      "uso",
      "narratore",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "patto-col-diavolo",
    "spheres": [
      "spirit"
    ],
    "name": "Patto col diavolo",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per campagna un'entità potente ti dà subito quello che chiedi (una vita salvata, un'impresa, un segreto). Il Narratore segna il debito, e prima o poi viene a riscuoterlo.",
    "attivo": "Una volta per campagna un'entità potente ti dà subito quello che chiedi (una vita salvata, un'impresa, un segreto). Il Narratore segna il debito, e prima o poi viene a riscuoterlo.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Firma qui.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "campagna",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo: il prezzo è il debito.",
    "formula": "evocare",
    "formulaName": "Evocare",
    "link": "verbo",
    "page": "Spirito",
    "hooks": [
      "uso",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "passo-di-la",
    "spheres": [
      "spirit"
    ],
    "name": "Passo di là",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza, di più per andare lontano): Passi di là, nell'Umbra, in carne e ossa, con tutti quelli che tieni per mano, e vi porti subito dove vuoi, di là. Paghi 1 Quintessenza per tutti; per andare più lontano il costo può salire, e lo dice il Narratore. Tornate di qua con la tua azione.\n\nEffetto passivo (Sempre): Attraversare il Velo, per te, non ha i rischi che ha per gli altri (le ferite che non guariscono, l'attrito del luogo etc..).",
    "attivo": "Passi di là, nell'Umbra, in carne e ossa, con tutti quelli che tieni per mano, e vi porti subito dove vuoi, di là. Paghi 1 Quintessenza per tutti; per andare più lontano il costo può salire, e lo dice il Narratore. Tornate di qua con la tua azione.",
    "passivo": "Attraversare il Velo, per te, non ha i rischi che ha per gli altri (le ferite che non guariscono, l'attrito del luogo etc..).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza, di più per andare lontano",
    "costValue": 0,
    "uses": null,
    "paradox": "Volgare effetto attivo se qualcuno guarda, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Spirito",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "1 Quintessenza, di più per andare lontano",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "anima-delle-cose",
    "spheres": [
      "spirit"
    ],
    "name": "Anima delle cose",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (da 1 a 3 Quintessenza): Svegli lo spirito di un oggetto che tocchi: per la scena fa quello che può, per quello che è, e ti aiuta (la corda lega, la porta non si apre, il cane di pietra fa la guardia). Paghi secondo la grandezza: 1 un oggetto, 2 un mobile o una porta, 3 una statua o un cancello.\n\nEffetto passivo (Sempre): Toccando un oggetto gli puoi parlare, e se vuole ti risponde. Dipende da quanto è vecchio: un oggetto vecchio ha più facilmente uno spirito, uno nuovo è fresco, e l'effimera non vi si è ancora saldata.",
    "attivo": "Svegli lo spirito di un oggetto che tocchi: per la scena fa quello che può, per quello che è, e ti aiuta (la corda lega, la porta non si apre, il cane di pietra fa la guardia). Paghi secondo la grandezza: 1 un oggetto, 2 un mobile o una porta, 3 una statua o un cancello.",
    "passivo": "Toccando un oggetto gli puoi parlare, e se vuole ti risponde. Dipende da quanto è vecchio: un oggetto vecchio ha più facilmente uno spirito, uno nuovo è fresco, e l'effimera non vi si è ancora saldata.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "da 1 a 3 Quintessenza",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo (Volgare se qualcuno vede la cosa muoversi da sola), nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Spirito",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "da 1 a 3 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 3
    }
  },
  {
    "id": "invocazione",
    "spheres": [
      "spirit"
    ],
    "name": "Invocazione",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (da 1 a 3 Quintessenza): Invochi uno spirito offrendogli Quintessenza: arriva, e per la scena fa una cosa per te (va a vedere, porta un messaggio, spaventa, combatte etc..). Paghi secondo quello che gli chiedi, e decide il Narratore.\n\nEffetto passivo (Sempre): Gli spiriti sanno che paghi: nelle trattative con loro hai 2 dadi in più.",
    "attivo": "Invochi uno spirito offrendogli Quintessenza: arriva, e per la scena fa una cosa per te (va a vedere, porta un messaggio, spaventa, combatte etc..). Paghi secondo quello che gli chiedi, e decide il Narratore.",
    "passivo": "Gli spiriti sanno che paghi: nelle trattative con loro hai 2 dadi in più.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "da 1 a 3 Quintessenza",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Spirito",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "da 1 a 3 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 3
    }
  },
  {
    "id": "esorcista",
    "spheres": [
      "spirit"
    ],
    "name": "Esorcista",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Quintessenza secondo lo spirito): Butti fuori dalla realtà uno spirito che sta in un corpo, in un oggetto o in un posto: torna oltre il Velo. Paghi Quintessenza secondo la difficoltà dello spirito, che dice il Narratore.\n\nEffetto passivo (Sempre): Riconosci sempre chi ha uno spirito nel corpo, o chi è stato toccato dagli spiriti.",
    "attivo": "Butti fuori dalla realtà uno spirito che sta in un corpo, in un oggetto o in un posto: torna oltre il Velo. Paghi Quintessenza secondo la difficoltà dello spirito, che dice il Narratore.",
    "passivo": "Riconosci sempre chi ha uno spirito nel corpo, o chi è stato toccato dagli spiriti.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "Quintessenza secondo lo spirito",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Spirito",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "Quintessenza secondo lo spirito",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
  },
  {
    "id": "caccia-agli-spiriti",
    "spheres": [
      "spirit"
    ],
    "name": "Caccia agli spiriti",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Per la scena i tuoi colpi (un'arma, un pugno, un lancio etc..) feriscono gli spiriti e i fantasmi come se fossero carne, anche attraverso il Velo.\n\nEffetto passivo (Sempre): Gli spiriti ostili ti temono: quelli che ti attaccano hanno 2 dadi in meno oppure soglia +2.",
    "attivo": "Per la scena i tuoi colpi (un'arma, un pugno, un lancio etc..) feriscono gli spiriti e i fantasmi come se fossero carne, anche attraverso il Velo.",
    "passivo": "Gli spiriti ostili ti temono: quelli che ti attaccano hanno 2 dadi in meno oppure soglia +2.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Spirito",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "il-prezzo-prima",
    "spheres": [
      "time"
    ],
    "name": "Il prezzo prima",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena, prima di tirare, il Narratore ti dice il Prezzo che rischi.",
    "attivo": "Una volta per scena, prima di tirare, il Narratore ti dice il Prezzo che rischi.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Prima dimmi quanto costa.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "prevedere",
    "formulaName": "Prevedere",
    "link": "verbo",
    "page": "Tempo",
    "hooks": [
      "uso",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "prestito-dal-futuro",
    "spheres": [
      "time"
    ],
    "name": "Prestito dal futuro",
    "dot": 1,
    "type": "",
    "kind": "",
    "text": "Effetto Amalgama: Accesso con Entropia: una volta per scena sposti 2 dadi dal tuo prossimo tiro di Abilità a questo.\nAccesso con Entropia + Primordio: vale anche fra lanci di Magick.",
    "attivo": "",
    "passivo": "",
    "amalgama": "Con Entropia: una volta per scena sposti 2 dadi dal tuo prossimo tiro di Abilità a questo.\nCon Entropia + Primordio: vale anche fra lanci di Magick.",
    "amalgam": "entropy",
    "amalgams": [
      "entropy",
      "prime"
    ],
    "amalgamText": "Accesso con Entropia: una volta per scena sposti 2 dadi dal tuo prossimo tiro di Abilità a questo.\nAccesso con Entropia + Primordio: vale anche fra lanci di Magick.",
    "flavor": "«Me li ridò dopo.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo; con Primordio segue il lancio.",
    "formula": "accelerare-e-rallentare",
    "formulaName": "Accelerare e Rallentare",
    "link": "regola",
    "page": "Tempo",
    "hooks": [
      "uso",
      "tiro"
    ],
    "effects": [
      {
        "mode": "attivo",
        "on": "dice",
        "value": 2,
        "roll": "abilita",
        "requires": "entropy",
        "nota": "Accesso con Entropia: una volta per scena sposti 2 dadi dal tuo prossimo tiro di Abilità a questo."
      },
      {
        "mode": "attivo",
        "on": "dice",
        "value": 2,
        "roll": "magick",
        "requires": [
          "entropy",
          "prime"
        ],
        "nota": "Accesso con Entropia + Primordio: vale anche fra lanci di Magick."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "pronto-all-uso",
    "spheres": [
      "time"
    ],
    "name": "Pronto all'uso",
    "dot": 1,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Estrarre, ricaricare o cambiare arma non ti costa azioni.\n\nEffetto Amalgama: Accesso con Materia: vale anche per gli attrezzi (un grimaldello, un kit medico, una torcia).",
    "attivo": "",
    "passivo": "Estrarre, ricaricare o cambiare arma non ti costa azioni.",
    "amalgama": "Con Materia: vale anche per gli attrezzi (un grimaldello, un kit medico, una torcia).",
    "amalgam": "matter",
    "amalgams": [
      "matter"
    ],
    "amalgamText": "Accesso con Materia: vale anche per gli attrezzi (un grimaldello, un kit medico, una torcia).",
    "flavor": "«Sempre carica.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "accelerare-e-rallentare",
    "formulaName": "Accelerare e Rallentare",
    "link": "verbo",
    "page": "Tempo",
    "hooks": [
      "combattimento"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "puntuale",
    "spheres": [
      "time"
    ],
    "name": "Puntuale",
    "dot": 1,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Quando stai andando verso una scena, scegli tu in che momento entri, anche a metà.",
    "attivo": "",
    "passivo": "Quando stai andando verso una scena, scegli tu in che momento entri, anche a metà.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Arrivo sempre al momento giusto.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "accelerare-e-rallentare",
    "formulaName": "Accelerare e Rallentare",
    "link": "tavolo",
    "page": "Tempo",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "quadrante",
    "spheres": [
      "time"
    ],
    "name": "Quadrante",
    "dot": 1,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Vedi sempre gli orologi del Narratore, anche quelli nascosti.",
    "attivo": "",
    "passivo": "Vedi sempre gli orologi del Narratore, anche quelli nascosti.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«So quanto manca.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "percepire",
    "formulaName": "Percepire",
    "link": "tavolo",
    "page": "Tempo",
    "hooks": [
      "narratore",
      "orologi"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "sotto-tiro",
    "spheres": [
      "time"
    ],
    "name": "Sotto tiro",
    "dot": 1,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Finché tieni un'arma puntata su qualcuno, se lui agisce spari tu per primo.",
    "attivo": "",
    "passivo": "Finché tieni un'arma puntata su qualcuno, se lui agisce spari tu per primo.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Muoviti e sparo.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "accelerare-e-rallentare",
    "formulaName": "Accelerare e Rallentare",
    "link": "verbo",
    "page": "Tempo",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "straordinari",
    "spheres": [
      "time"
    ],
    "name": "Straordinari",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Fra una sessione e l'altra fai una cosa in più.\n\nEffetto Amalgama: la cosa in più si fa con lei (Materia per costruire, Mente per studiare, Vita per curarti).",
    "attivo": "Fra una sessione e l'altra fai una cosa in più.",
    "passivo": "",
    "amalgama": "la cosa in più si fa con lei (Materia per costruire, Mente per studiare, Vita per curarti).",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "la cosa in più si fa con lei (Materia per costruire, Mente per studiare, Vita per curarti).",
    "flavor": "«Stanotte non dormo.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "accelerare-e-rallentare",
    "formulaName": "Accelerare e Rallentare",
    "link": "verbo",
    "page": "Tempo",
    "hooks": [
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "adesso-e-non-dopo",
    "spheres": [
      "time"
    ],
    "name": "Adesso e non dopo",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena agisci due volte di fila, e salti il turno dopo.",
    "attivo": "Una volta per scena agisci due volte di fila, e salti il turno dopo.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Il dopo lo spendo adesso.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "accelerare-e-rallentare",
    "formulaName": "Accelerare e Rallentare",
    "link": "effetto",
    "page": "Tempo",
    "hooks": [
      "uso",
      "combattimento"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "allo-scadere",
    "spheres": [
      "time"
    ],
    "name": "Allo scadere",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Quando un orologio del Narratore sta per riempirsi, fai un'ultima azione prima che scatti.",
    "attivo": "",
    "passivo": "Quando un orologio del Narratore sta per riempirsi, fai un'ultima azione prima che scatti.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Un secondo, ancora uno.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "accelerare-e-rallentare",
    "formulaName": "Accelerare e Rallentare",
    "link": "tavolo",
    "page": "Tempo",
    "hooks": [
      "combattimento",
      "narratore",
      "orologi"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "ci-penso-domani",
    "spheres": [
      "time"
    ],
    "name": "Ci penso domani",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione una conseguenza (una ferita, un debito, un arresto) la paghi nella scena dopo. Se la rimandi alla sessione dopo, arriva più grave.",
    "attivo": "Una volta per sessione una conseguenza (una ferita, un debito, un arresto) la paghi nella scena dopo. Se la rimandi alla sessione dopo, arriva più grave.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Adesso no, dopo.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "accelerare-e-rallentare",
    "formulaName": "Accelerare e Rallentare",
    "link": "verbo",
    "page": "Tempo",
    "hooks": [
      "uso",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "colpo-in-canna",
    "spheres": [
      "time"
    ],
    "name": "Colpo in canna",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Tieni la tua azione e la usi quando vuoi nel turno, anche a metà di quella di un altro.\n\nEffetto Amalgama: per tenere un'azione serve la sua Sfera (Forza per sparare, Mente per parlare, Corrispondenza per spostarti).",
    "attivo": "",
    "passivo": "Tieni la tua azione e la usi quando vuoi nel turno, anche a metà di quella di un altro.",
    "amalgama": "per tenere un'azione serve la sua Sfera (Forza per sparare, Mente per parlare, Corrispondenza per spostarti).",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "per tenere un'azione serve la sua Sfera (Forza per sparare, Mente per parlare, Corrispondenza per spostarti).",
    "flavor": "«Aspetto il momento giusto.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "aprire-e-bloccare",
    "formulaName": "Aprire e Bloccare",
    "link": "verbo",
    "page": "Tempo",
    "hooks": [
      "combattimento",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "contrattempo",
    "spheres": [
      "time"
    ],
    "name": "Contrattempo",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena, chi sta per arrivare in scena arriva due turni dopo.",
    "attivo": "Una volta per scena, chi sta per arrivare in scena arriva due turni dopo.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Si è fermato al semaforo.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "accelerare-e-rallentare",
    "formulaName": "Accelerare e Rallentare",
    "link": "effetto",
    "page": "Tempo",
    "hooks": [
      "uso"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "l-avevo-preparata",
    "spheres": [
      "time"
    ],
    "name": "L'avevo preparata",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione, in un luogo dove sei stato, dichiari la trappola che avevi lasciato. Il tipo di trappola dipende dall'Amalgama.\n\nEffetto Amalgama: Accesso con Materia: una trappola meccanica (un filo, una porta bloccata, un barattolo di chiodi).\nAccesso con Forza: una carica, un corto circuito.\nAccesso con Entropia: un guasto pronto a scattare.",
    "attivo": "Una volta per sessione, in un luogo dove sei stato, dichiari la trappola che avevi lasciato. Il tipo di trappola dipende dall'Amalgama.",
    "passivo": "",
    "amalgama": "Con Materia: una trappola meccanica (un filo, una porta bloccata, un barattolo di chiodi).\nCon Forza: una carica, un corto circuito.\nCon Entropia: un guasto pronto a scattare.",
    "amalgam": "matter",
    "amalgams": [
      "matter"
    ],
    "amalgamText": "Accesso con Materia: una trappola meccanica (un filo, una porta bloccata, un barattolo di chiodi).\nAccesso con Forza: una carica, un corto circuito.\nAccesso con Entropia: un guasto pronto a scattare.",
    "flavor": "«Attento a dove metti i piedi.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "comunicare",
    "formulaName": "Comunicare",
    "link": "tavolo",
    "page": "Tempo",
    "hooks": [
      "uso"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "montaggio-alternato",
    "spheres": [
      "time"
    ],
    "name": "Montaggio alternato",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Col gruppo diviso, decidi tu quando il Narratore stacca da una scena all'altra.\n\nEffetto Amalgama: Accesso con Entropia: allo stacco aggiungi un dettaglio alla scena che lasci (un rumore, un arrivo, un guasto).",
    "attivo": "",
    "passivo": "Col gruppo diviso, decidi tu quando il Narratore stacca da una scena all'altra.",
    "amalgama": "Con Entropia: allo stacco aggiungi un dettaglio alla scena che lasci (un rumore, un arrivo, un guasto).",
    "amalgam": "entropy",
    "amalgams": [
      "entropy"
    ],
    "amalgamText": "Accesso con Entropia: allo stacco aggiungi un dettaglio alla scena che lasci (un rumore, un arrivo, un guasto).",
    "flavor": "«Stacco. Intanto, dall'altra parte...»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "aprire-e-bloccare",
    "formulaName": "Aprire e Bloccare",
    "link": "tavolo",
    "page": "Tempo",
    "hooks": [
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "primo-istante",
    "spheres": [
      "time"
    ],
    "name": "Primo istante",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga 2 Quintessenza: nel primo turno della scena agisci prima di tutti, anche di chi ha questo potere, e la tua prima azione non può essere interrotta.\n\nEffetto passivo: Accesso con Tempo: agisci sempre per primo nel turno, senza tirare iniziativa. Se altri hanno questo potere, agite insieme (Riflessi Inumani).",
    "attivo": "Paga 2 Quintessenza: nel primo turno della scena agisci prima di tutti, anche di chi ha questo potere, e la tua prima azione non può essere interrotta.",
    "passivo": "Accesso con Tempo: agisci sempre per primo nel turno, senza tirare iniziativa. Se altri hanno questo potere, agite insieme (Riflessi Inumani).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Prima di tutti, sempre.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "accelerare-e-rallentare",
    "formulaName": "Accelerare e Rallentare",
    "link": "effetto",
    "page": "Tempo",
    "hooks": [
      "tiro",
      "quintessenza",
      "combattimento"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "ciak-si-gira",
    "spheres": [
      "time"
    ],
    "name": "Ciak si gira",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Paga 3 Quintessenza: resti nella stessa scena, ma scatta tutto quello che scatta a un cambio scena (la Bussola si riarma, le caselle si sbloccano, le rigenerazioni).",
    "attivo": "Paga 3 Quintessenza: resti nella stessa scena, ma scatta tutto quello che scatta a un cambio scena (la Bussola si riarma, le caselle si sbloccano, le rigenerazioni).",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Stop. Si riparte.»",
    "cost": "3 Quintessenza",
    "costValue": 3,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "ripetere",
    "formulaName": "Ripetere",
    "link": "verbo",
    "page": "Tempo",
    "hooks": [
      "quintessenza",
      "salute",
      "combattimento",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "l-avevo-previsto",
    "spheres": [
      "time"
    ],
    "name": "L'avevo previsto",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione dichiari cosa avevi preparato per quello che sta succedendo (un complice, un messaggio, un'uscita): il Narratore lo accetta se era possibile.",
    "attivo": "Una volta per sessione dichiari cosa avevi preparato per quello che sta succedendo (un complice, un messaggio, un'uscita): il Narratore lo accetta se era possibile.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Lo sapevo che finiva così.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "prevedere",
    "formulaName": "Prevedere",
    "link": "tavolo",
    "page": "Tempo",
    "hooks": [
      "uso",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "preparato-a-casa",
    "spheres": [
      "prime",
      "time"
    ],
    "name": "Preparato a casa",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: I Passi di Rituale che fai nel tuo Santuario li porti con te, e li spendi in un lancio fuori, entro la sessione.",
    "attivo": "I Passi di Rituale che fai nel tuo Santuario li porti con te, e li spendi in un lancio fuori, entro la sessione.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Il rito l'ho cominciato a casa.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Segue il lancio effetto attivo, nessuno effetto passivo.",
    "formula": "fissare",
    "formulaName": "Fissare",
    "link": "regola",
    "page": "Tempo",
    "hooks": [
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "salto",
    "spheres": [
      "time"
    ],
    "name": "Salto",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione salti una scena di attesa o di ricerca, e ne hai il risultato come se fosse riuscita.",
    "attivo": "Una volta per sessione salti una scena di attesa o di ricerca, e ne hai il risultato come se fosse riuscita.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Saltiamo la parte noiosa.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "accelerare-e-rallentare",
    "formulaName": "Accelerare e Rallentare",
    "link": "verbo",
    "page": "Tempo",
    "hooks": [
      "uso",
      "tiro"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "slancio",
    "spheres": [
      "time"
    ],
    "name": "Slancio",
    "dot": 3,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Quando metti a terra un nemico, fai subito un'altra azione, una volta per turno.",
    "attivo": "",
    "passivo": "Quando metti a terra un nemico, fai subito un'altra azione, una volta per turno.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Il prossimo.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "turno",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "accelerare-e-rallentare",
    "formulaName": "Accelerare e Rallentare",
    "link": "verbo",
    "page": "Tempo",
    "hooks": [
      "uso",
      "combattimento",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "ero-gia-li",
    "spheres": [
      "time"
    ],
    "name": "Ero già lì",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione eri già, dall'inizio della scena, in un luogo dove sei stato: paghi 1 Quintessenza per ogni gradino di Portata fra dove sei e dove eri.",
    "attivo": "Una volta per sessione eri già, dall'inizio della scena, in un luogo dove sei stato: paghi 1 Quintessenza per ogni gradino di Portata fra dove sei e dove eri.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Ero qui da un pezzo.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "varcare",
    "formulaName": "Varcare",
    "link": "verbo",
    "page": "Tempo",
    "hooks": [
      "uso",
      "quintessenza"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "flash-forward",
    "spheres": [
      "time"
    ],
    "name": "Flash forward",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione si gioca una breve scena del futuro: quello che succede lì dovrà succedere, e il gruppo ci deve arrivare.",
    "attivo": "Una volta per sessione si gioca una breve scena del futuro: quello che succede lì dovrà succedere, e il gruppo ci deve arrivare.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Lo vedo già.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "prevedere",
    "formulaName": "Prevedere",
    "link": "verbo",
    "page": "Tempo",
    "hooks": [
      "uso"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "flashback",
    "spheres": [
      "time"
    ],
    "name": "Flashback",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione giochi una breve scena del passato che cambia il presente. Il Narratore chiede da 3 a 7 Quintessenza, secondo quanto è improbabile.",
    "attivo": "Una volta per sessione giochi una breve scena del passato che cambia il presente. Il Narratore chiede da 3 a 7 Quintessenza, secondo quanto è improbabile.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Tre giorni prima...»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "cancellare",
    "formulaName": "Cancellare",
    "link": "verbo",
    "page": "Tempo",
    "hooks": [
      "uso",
      "quintessenza",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "minute-man",
    "spheres": [
      "time"
    ],
    "name": "Minute Man",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione fai avanzare o tornare indietro un orologio del Narratore: 1 Quintessenza per segmento.",
    "attivo": "Una volta per sessione fai avanzare o tornare indietro un orologio del Narratore: 1 Quintessenza per segmento.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Ancora un minuto.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "accelerare-e-rallentare",
    "formulaName": "Accelerare e Rallentare",
    "link": "tavolo",
    "page": "Tempo",
    "hooks": [
      "uso",
      "quintessenza",
      "narratore",
      "orologi"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "c-ho-ripensato",
    "spheres": [
      "time"
    ],
    "name": "C'ho ripensato",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Un'azione degli ultimi 3 turni non è mai accaduta. La scena va avanti di conseguenza, a discrezione del Narratore.",
    "attivo": "Un'azione degli ultimi 3 turni non è mai accaduta. La scena va avanti di conseguenza, a discrezione del Narratore.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«No, aspetta: ci ho ripensato.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "riavvolgere",
    "formulaName": "Riavvolgere",
    "link": "effetto",
    "page": "Tempo",
    "hooks": [
      "combattimento",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "pisolino",
    "spheres": [
      "life"
    ],
    "name": "Pisolino",
    "dot": 1,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Un'ora di sonno vale per te come una notte intera.",
    "attivo": "",
    "passivo": "Un'ora di sonno vale per te come una notte intera.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Cinque minuti e sono come nuovo.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "guarire",
    "formulaName": "Guarire",
    "link": "verbo",
    "page": "Vita",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "piu-forte-di-prima",
    "spheres": [
      "life"
    ],
    "name": "Più forte di prima",
    "dot": 1,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Quando guarisci da un aggravato, nella sessione dopo hai 1 livello di Salute in più.",
    "attivo": "",
    "passivo": "Quando guarisci da un aggravato, nella sessione dopo hai 1 livello di Salute in più.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Guarito, e più duro di prima.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "potenziare",
    "formulaName": "Potenziare",
    "link": "verbo",
    "page": "Vita",
    "hooks": [
      "salute",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "tempra",
    "spheres": [
      "life"
    ],
    "name": "Tempra",
    "dot": 1,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Fra una sessione e l'altra guarisci tutti i danni superficiali e 1 aggravato, anche senza cure.",
    "attivo": "",
    "passivo": "Fra una sessione e l'altra guarisci tutti i danni superficiali e 1 aggravato, anche senza cure.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Mi rimetto da solo.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "guarire",
    "formulaName": "Guarire",
    "link": "effetto",
    "page": "Vita",
    "hooks": [
      "salute",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "allenamento",
    "spheres": [
      "life"
    ],
    "name": "Allenamento",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Fra una sessione e l'altra sposti 1 punto fra i tuoi Attributi fisici.\n\nEffetto Amalgama: Accesso con Primordio: hai anche un pallino di Attributo in più, per la sessione.",
    "attivo": "Fra una sessione e l'altra sposti 1 punto fra i tuoi Attributi fisici.",
    "passivo": "",
    "amalgama": "Con Primordio: hai anche un pallino di Attributo in più, per la sessione.",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "Accesso con Primordio: hai anche un pallino di Attributo in più, per la sessione.",
    "flavor": "«Ho lavorato sulle gambe.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "potenziare",
    "formulaName": "Potenziare",
    "link": "effetto",
    "page": "Vita",
    "hooks": [
      "uso",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "buona-forchetta",
    "spheres": [
      "life"
    ],
    "name": "Buona forchetta",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Un pasto vero in scena vale per il tuo corpo come un cambio scena: scattano le cure e le rigenerazioni del cambio scena.",
    "attivo": "",
    "passivo": "Un pasto vero in scena vale per il tuo corpo come un cambio scena: scattano le cure e le rigenerazioni del cambio scena.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«A stomaco pieno si ragiona meglio.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "guarire",
    "formulaName": "Guarire",
    "link": "verbo",
    "page": "Vita",
    "hooks": [
      "salute",
      "combattimento",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "il-dolore-sveglia",
    "spheres": [
      "life"
    ],
    "name": "Il dolore sveglia",
    "dot": 2,
    "type": "",
    "kind": "",
    "text": "Effetto Amalgama: Accesso con Mente: ogni livello di Salute che perdi in scena ti dà 1 Volontà, fino a 3.",
    "attivo": "",
    "passivo": "",
    "amalgama": "Con Mente: ogni livello di Salute che perdi in scena ti dà 1 Volontà, fino a 3.",
    "amalgam": "mind",
    "amalgams": [
      "mind"
    ],
    "amalgamText": "Accesso con Mente: ogni livello di Salute che perdi in scena ti dà 1 Volontà, fino a 3.",
    "flavor": "«Il dolore mi tiene sveglio.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "spostare",
    "formulaName": "Spostare",
    "link": "verbo",
    "page": "Vita",
    "hooks": [
      "salute"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "infermeria",
    "spheres": [
      "life"
    ],
    "name": "Infermeria",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione, un compagno che passa 2 scene nel tuo Santuario torna con tutta la Salute.",
    "attivo": "Una volta per sessione, un compagno che passa 2 scene nel tuo Santuario torna con tutta la Salute.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Stai giù e lasciati curare.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "guarire",
    "formulaName": "Guarire",
    "link": "effetto",
    "page": "Vita",
    "hooks": [
      "uso",
      "salute",
      "altri",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "sangue-per-sangue",
    "spheres": [
      "life"
    ],
    "name": "Sangue per sangue",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Quando curi un altro con Vita, puoi prendere tu 1 danno superficiale per curargliene 2 in più.",
    "attivo": "Quando curi un altro con Vita, puoi prendere tu 1 danno superficiale per curargliene 2 in più.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Prendi un po' del mio.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Segue il lancio effetto attivo, nessuno effetto passivo.",
    "formula": "guarire",
    "formulaName": "Guarire",
    "link": "regola",
    "page": "Vita",
    "hooks": [
      "salute",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "stesso-sangue",
    "spheres": [
      "life"
    ],
    "name": "Stesso sangue",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Scegli un compagno: quando uno dei due viene curato, l'altro cura 1 danno superficiale.",
    "attivo": "",
    "passivo": "Scegli un compagno: quando uno dei due viene curato, l'altro cura 1 danno superficiale.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Quello che fa bene a te fa bene a me.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "vincolare",
    "formulaName": "Vincolare",
    "link": "verbo",
    "page": "Vita",
    "hooks": [
      "salute",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "vaccino",
    "spheres": [
      "life"
    ],
    "name": "Vaccino",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Una Condizione fisica che hai già preso nella sessione non la prendi più fino a fine sessione (si aggiornerà a catena col rifacimento delle Condizioni).",
    "attivo": "",
    "passivo": "Una Condizione fisica che hai già preso nella sessione non la prendi più fino a fine sessione (si aggiornerà a catena col rifacimento delle Condizioni).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Questa l'ho già avuta.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "resistere",
    "formulaName": "Resistere",
    "link": "effetto",
    "page": "Vita",
    "hooks": [
      "condizione",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "bisturi",
    "spheres": [
      "life"
    ],
    "name": "Bisturi",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Fuori dalla Magick, con Medicina curi anche 1 aggravato per scena.",
    "attivo": "Fuori dalla Magick, con Medicina curi anche 1 aggravato per scena.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Tienilo fermo.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "guarire",
    "formulaName": "Guarire",
    "link": "regola",
    "page": "Vita",
    "hooks": [
      "salute"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "canto-del-cigno",
    "spheres": [
      "mind",
      "life"
    ],
    "name": "Canto del cigno",
    "dot": 3,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Quando vai a terra, fai ancora un'azione prima di cadere.\nAccesso con Vita: quando vai a terra per danni fisici.\nAccesso con Mente: quando crolli per danni mentali.",
    "attivo": "",
    "passivo": "Quando vai a terra, fai ancora un'azione prima di cadere.\nAccesso con Vita: quando vai a terra per danni fisici.\nAccesso con Mente: quando crolli per danni mentali.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Non ancora.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "resistere",
    "formulaName": "Resistere",
    "link": "verbo",
    "page": "Vita",
    "hooks": [
      "salute",
      "combattimento"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "ferro-nel-sangue",
    "spheres": [
      "life"
    ],
    "name": "Ferro nel sangue",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Paga 1 Quintessenza: gli aggravati di un colpo da causa naturale (fuoco, veleno, cadute) diventano superficiali.",
    "attivo": "Paga 1 Quintessenza: gli aggravati di un colpo da causa naturale (fuoco, veleno, cadute) diventano superficiali.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Ne ho prese di peggio.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "resistere",
    "formulaName": "Resistere",
    "link": "effetto",
    "page": "Vita",
    "hooks": [
      "quintessenza",
      "salute",
      "combattimento"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "in-piedi",
    "spheres": [
      "life"
    ],
    "name": "In piedi!",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena, con un'azione, rimetti in piedi un compagno a terra con 1 livello di Salute, anche se sta morendo.",
    "attivo": "Una volta per scena, con un'azione, rimetti in piedi un compagno a terra con 1 livello di Salute, anche se sta morendo.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«In piedi, non è finita.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "guarire",
    "formulaName": "Guarire",
    "link": "effetto",
    "page": "Vita",
    "hooks": [
      "uso",
      "salute",
      "combattimento",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "memoria-muscolare",
    "spheres": [
      "life"
    ],
    "name": "Memoria muscolare",
    "dot": 3,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Un tiro fisico che ti è già riuscito nella scena, se lo rifai, riesce senza tirare.",
    "attivo": "",
    "passivo": "Un tiro fisico che ti è già riuscito nella scena, se lo rifai, riesce senza tirare.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Il corpo se lo ricorda.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "ripetere",
    "formulaName": "Ripetere",
    "link": "regola",
    "page": "Vita",
    "hooks": [
      "tiro"
    ],
    "effects": [
      {
        "on": "autoSuccess",
        "roll": "abilita",
        "nota": "Un tiro fisico che ti è già riuscito nella scena, se lo rifai, riesce senza tirare."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "parassita",
    "spheres": [
      "life"
    ],
    "name": "Parassita",
    "dot": 3,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Quando ferisci con Vita, ogni 2 danni che fai te ne curano 1 superficiale.",
    "attivo": "",
    "passivo": "Quando ferisci con Vita, ogni 2 danni che fai te ne curano 1 superficiale.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Il tuo sangue, la mia salute.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo; il passivo segue il lancio.",
    "formula": "drenare",
    "formulaName": "Drenare",
    "link": "regola",
    "page": "Vita",
    "hooks": [
      "salute"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "doppio-cuore",
    "spheres": [
      "life"
    ],
    "name": "Doppio cuore",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione, quando muori, muori davvero solo a fine scena: fino ad allora agisci.",
    "attivo": "Una volta per sessione, quando muori, muori davvero solo a fine scena: fino ad allora agisci.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Il cuore batte ancora.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "invulnerabilita",
    "formulaName": "Invulnerabilità",
    "link": "verbo",
    "page": "Vita",
    "hooks": [
      "uso",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "duro-a-morire",
    "spheres": [
      "life"
    ],
    "name": "Duro a morire",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena, paga 3 Quintessenza: un danno fisico che ti ucciderebbe ti lascia a 1 livello di Salute.",
    "attivo": "Una volta per scena, paga 3 Quintessenza: un danno fisico che ti ucciderebbe ti lascia a 1 livello di Salute.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Non oggi.»",
    "cost": "3 Quintessenza",
    "costValue": 3,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "invulnerabilita",
    "formulaName": "Invulnerabilità",
    "link": "verbo",
    "page": "Vita",
    "hooks": [
      "uso",
      "quintessenza",
      "salute"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "non-sotto-il-mio-turno",
    "spheres": [
      "life"
    ],
    "name": "Non sotto il mio turno",
    "dot": 5,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Finché sei in scena, un compagno che hai curato nella sessione non muore: resta a 1 livello di Salute.",
    "attivo": "",
    "passivo": "Finché sei in scena, un compagno che hai curato nella sessione non muore: resta a 1 livello di Salute.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Qui non muore nessuno.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "guarire",
    "formulaName": "Guarire",
    "link": "verbo",
    "page": "Vita",
    "hooks": [
      "salute",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "appoggio",
    "spheres": [
      "any"
    ],
    "name": "Appoggio",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga 2 Quintessenza: vale come leva anche qualcosa che hai creato tu in questa scena.\n\nEffetto passivo: Il punteggio dell'Ambito di Potenza non conta sino al 4° pallino quando la tua Sfera trova la sua leva già in scena (qualcosa che fa già una parte del lavoro: tu lo spingi, non lo crei).\nAccesso con Corrispondenza: un punto d'arrivo che aspetta ciò che sposti (la mano di un compagno, un contenitore aperto, la tua tasca).\nAccesso con Entropia: una crepa che c'è già (il pilastro stanco, il matrimonio finito, il socio che aspettava un pretesto).\nAccesso con Forza: un'energia già in scena da cavalcare (un temporale, un quadro elettrico, un incendio).\nAccesso con Materia: muovi o sollevi qualcosa con un appoggio già in scena (una leva, una carrucola, un piano inclinato).\nAccesso con Mente: un'emozione che il bersaglio prova già (rabbia, paura, desiderio).\nAccesso con Primordio: plasmi Quintessenza pura dentro un Nodo o con del Tass in mano.\nAccesso con Spirito: un punto dove il Velo è sottile (un cimitero, una corsia d'ospedale di notte, una casa dove è morto qualcuno).\nAccesso con Tempo: invecchi o ringiovanisci qualcosa avendo davanti com'era o come sarà (una foto, un oggetto di quell'epoca, il padre o il figlio).\nAccesso con Vita: la direzione che il corpo sta già prendendo (una ferita che si chiude, una febbre che sale, una gravidanza).",
    "attivo": "Paga 2 Quintessenza: vale come leva anche qualcosa che hai creato tu in questa scena.",
    "passivo": "Il punteggio dell'Ambito di Potenza non conta sino al 4° pallino quando la tua Sfera trova la sua leva già in scena (qualcosa che fa già una parte del lavoro: tu lo spingi, non lo crei).\nAccesso con Corrispondenza: un punto d'arrivo che aspetta ciò che sposti (la mano di un compagno, un contenitore aperto, la tua tasca).\nAccesso con Entropia: una crepa che c'è già (il pilastro stanco, il matrimonio finito, il socio che aspettava un pretesto).\nAccesso con Forza: un'energia già in scena da cavalcare (un temporale, un quadro elettrico, un incendio).\nAccesso con Materia: muovi o sollevi qualcosa con un appoggio già in scena (una leva, una carrucola, un piano inclinato).\nAccesso con Mente: un'emozione che il bersaglio prova già (rabbia, paura, desiderio).\nAccesso con Primordio: plasmi Quintessenza pura dentro un Nodo o con del Tass in mano.\nAccesso con Spirito: un punto dove il Velo è sottile (un cimitero, una corsia d'ospedale di notte, una casa dove è morto qualcuno).\nAccesso con Tempo: invecchi o ringiovanisci qualcosa avendo davanti com'era o come sarà (una foto, un oggetto di quell'epoca, il padre o il figlio).\nAccesso con Vita: la direzione che il corpo sta già prendendo (una ferita che si chiude, una febbre che sale, una gravidanza).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Datemi una leva.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Segue il lancio effetto attivo, segue il lancio effetto passivo.",
    "formula": "potenziare",
    "formulaName": "Potenziare",
    "link": "regola",
    "page": "Generali",
    "hooks": [
      "ambiti",
      "quintessenza",
      "altri"
    ],
    "effects": [
      {
        "on": "freeScope",
        "scope": "potency",
        "value": 4,
        "nota": "Il punteggio dell'Ambito di Potenza non conta sino al 4° pallino quando la tua Sfera trova la sua leva già in scena"
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "coperto",
    "spheres": [
      "any"
    ],
    "name": "Coperto",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga 4 Quintessenza: con un aggancio in scena il lancio è Accidentale anche se va oltre il normale (un incidente grave e strano, un fulmine che cade proprio su di lui).\n\nEffetto passivo: Quando la tua Sfera ha un aggancio in scena (qualcosa che c'era già e che può spiegare l'effetto a un Dormiente), il Narratore può contare il lancio come Accidentale anche se va oltre il normale.\nAccesso con Corrispondenza: dove ci si perde di vista (una stazione affollata, un labirinto di corridoi, un palazzo pieno di fumo).\nAccesso con Entropia: il lancio può passare per un incidente (un cavo che cede, una tegola che cade, un motore che si inceppa).\nAccesso con Forza: un luogo già pieno di energia (una centrale, un concerto, un temporale).\nAccesso con Materia: dove la materia si lavora già (un laboratorio chimico, una fonderia, un'officina).\nAccesso con Mente: chi è già fuori di sé (un ubriaco, uno che non dorme da giorni, due che stanno litigando).\nAccesso con Primordio: dentro un Nodo (una chiesa antica, una sorgente, un bosco sacro).\nAccesso con Spirito: dove la gente crede già agli spiriti (una seduta spiritica, una casa che dicono infestata, una veglia funebre).\nAccesso con Tempo: dove si perde il senso del tempo (una festa, una sala d'attesa, un turno di notte).\nAccesso con Vita: curi o alteri un corpo con le mani addosso e la pelle coperta (una benda, un lenzuolo, un camice).",
    "attivo": "Paga 4 Quintessenza: con un aggancio in scena il lancio è Accidentale anche se va oltre il normale (un incidente grave e strano, un fulmine che cade proprio su di lui).",
    "passivo": "Quando la tua Sfera ha un aggancio in scena (qualcosa che c'era già e che può spiegare l'effetto a un Dormiente), il Narratore può contare il lancio come Accidentale anche se va oltre il normale.\nAccesso con Corrispondenza: dove ci si perde di vista (una stazione affollata, un labirinto di corridoi, un palazzo pieno di fumo).\nAccesso con Entropia: il lancio può passare per un incidente (un cavo che cede, una tegola che cade, un motore che si inceppa).\nAccesso con Forza: un luogo già pieno di energia (una centrale, un concerto, un temporale).\nAccesso con Materia: dove la materia si lavora già (un laboratorio chimico, una fonderia, un'officina).\nAccesso con Mente: chi è già fuori di sé (un ubriaco, uno che non dorme da giorni, due che stanno litigando).\nAccesso con Primordio: dentro un Nodo (una chiesa antica, una sorgente, un bosco sacro).\nAccesso con Spirito: dove la gente crede già agli spiriti (una seduta spiritica, una casa che dicono infestata, una veglia funebre).\nAccesso con Tempo: dove si perde il senso del tempo (una festa, una sala d'attesa, un turno di notte).\nAccesso con Vita: curi o alteri un corpo con le mani addosso e la pelle coperta (una benda, un lenzuolo, un camice).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Nessuno ha visto niente. Nemmeno tu, ufficialmente.»",
    "cost": "4 Quintessenza",
    "costValue": 4,
    "uses": null,
    "paradox": "Accidentale effetto attivo, Accidentale se il Narratore lo concede effetto passivo.",
    "formula": "celare",
    "formulaName": "Celare",
    "link": "regola",
    "page": "Generali",
    "hooks": [
      "quintessenza",
      "salute",
      "combattimento",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "difendersi-dalla-sfera",
    "spheres": [
      "any"
    ],
    "name": "Difendersi dalla Sfera",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga 1 Quintessenza: chi lancia quella Sfera su di te ha i dadi dimezzati per difetto oppure lancia a soglia +3, a seconda del tiro.\nPaga 3 Quintessenza: la protezione dura una scena.\n\nEffetto passivo: Chi lancia effetti di quella Sfera su di te contro la tua volontà ha 2 dadi in meno oppure soglia +2.\n\nEffetto Amalgama: Avere questo potere in più Sfere copre anche dalle altre Sfere.",
    "attivo": "Paga 1 Quintessenza: chi lancia quella Sfera su di te ha i dadi dimezzati per difetto oppure lancia a soglia +3, a seconda del tiro.\nPaga 3 Quintessenza: la protezione dura una scena.",
    "passivo": "Chi lancia effetti di quella Sfera su di te contro la tua volontà ha 2 dadi in meno oppure soglia +2.",
    "amalgama": "Avere questo potere in più Sfere copre anche dalle altre Sfere.",
    "amalgam": "any",
    "amalgams": [
      "any"
    ],
    "amalgamText": "Avere questo potere in più Sfere copre anche dalle altre Sfere.",
    "flavor": "«Conosci la tua Sfera e non fai entrare gli estranei.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "contrastare",
    "formulaName": "Contrastare",
    "link": "effetto",
    "page": "Generali",
    "hooks": [
      "tiro",
      "quintessenza",
      "salute"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "fatto-per-durare",
    "spheres": [
      "any"
    ],
    "name": "Fatto per durare",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga 2 Quintessenza: quando l'appoggio sta per cedere, sposti l'effetto su un nuovo appoggio della tua Sfera.\n\nEffetto passivo: Il punteggio dell'Ambito di Durata non conta sino al 4° pallino, ma l'effetto dura solo finché regge l'appoggio della tua Sfera (la cosa a cui leghi l'effetto, che lo tiene in piedi al posto tuo). Se l'appoggio cede, l'effetto finisce in anticipo.\nAccesso con Corrispondenza: finché esiste il varco o il luogo su cui l'hai appoggiato, che deve esserci già (una porta, un arco, una stanza).\nAccesso con Entropia: finché resta vera una condizione che fissi col Narratore quando lanci (finché lei non torna, finché la candela brucia, finché nessuno dice il suo nome).\nAccesso con Forza: finché non si interrompe il flusso di energia che lo alimenta (un cavo sotto tensione, un fuoco acceso, il vento).\nAccesso con Materia: finché dura l'oggetto catalizzatore che crei per lui (un anello, una statuetta, un chiodo).\nAccesso con Mente: finché chi lo subisce non se ne accorge (una prova, uno specchio, una voce che conosce).\nAccesso con Primordio: finché riceve energia da una fonte (un Nodo, del Tass, un Talismano carico).\nAccesso con Spirito: finché uno spirito lo tiene per te e tu rispetti il patto (un'offerta, un divieto, un favore).\nAccesso con Tempo: finché non si ferma l'orologio a cui lo leghi (una pendola, una clessidra da girare, un metronomo).\nAccesso con Vita: finché vive l'essere a cui lo leghi (una pianta, un animale, una persona).",
    "attivo": "Paga 2 Quintessenza: quando l'appoggio sta per cedere, sposti l'effetto su un nuovo appoggio della tua Sfera.",
    "passivo": "Il punteggio dell'Ambito di Durata non conta sino al 4° pallino, ma l'effetto dura solo finché regge l'appoggio della tua Sfera (la cosa a cui leghi l'effetto, che lo tiene in piedi al posto tuo). Se l'appoggio cede, l'effetto finisce in anticipo.\nAccesso con Corrispondenza: finché esiste il varco o il luogo su cui l'hai appoggiato, che deve esserci già (una porta, un arco, una stanza).\nAccesso con Entropia: finché resta vera una condizione che fissi col Narratore quando lanci (finché lei non torna, finché la candela brucia, finché nessuno dice il suo nome).\nAccesso con Forza: finché non si interrompe il flusso di energia che lo alimenta (un cavo sotto tensione, un fuoco acceso, il vento).\nAccesso con Materia: finché dura l'oggetto catalizzatore che crei per lui (un anello, una statuetta, un chiodo).\nAccesso con Mente: finché chi lo subisce non se ne accorge (una prova, uno specchio, una voce che conosce).\nAccesso con Primordio: finché riceve energia da una fonte (un Nodo, del Tass, un Talismano carico).\nAccesso con Spirito: finché uno spirito lo tiene per te e tu rispetti il patto (un'offerta, un divieto, un favore).\nAccesso con Tempo: finché non si ferma l'orologio a cui lo leghi (una pendola, una clessidra da girare, un metronomo).\nAccesso con Vita: finché vive l'essere a cui lo leghi (una pianta, un animale, una persona).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Se lo appoggi a qualcosa di vero, resta.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Segue il lancio effetto attivo, segue il lancio effetto passivo.",
    "formula": "fissare",
    "formulaName": "Fissare",
    "link": "regola",
    "page": "Generali",
    "hooks": [
      "ambiti",
      "quintessenza",
      "condizione",
      "narratore",
      "orologi"
    ],
    "effects": [
      {
        "on": "freeScope",
        "scope": "duration",
        "value": 4,
        "nota": "Il punteggio dell'Ambito di Durata non conta sino al 4° pallino, ma l'effetto dura solo finché regge l'appoggio della tua Sfera"
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "folla",
    "spheres": [
      "any"
    ],
    "name": "Folla",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga 2 Quintessenza: vale come tratto comune anche qualcosa che hai creato tu in questa scena.\n\nEffetto passivo: Il punteggio dell'Ambito di Bersagli non conta sino al 4° pallino quando per la tua Sfera la folla è una cosa sola (hanno già un tratto comune: qualcosa che li lega tutti, e da lì la tua Sfera li raggiunge insieme).\nAccesso con Corrispondenza: i Bersagli sparsi in luoghi diversi hanno qualcosa in comune che tieni in mano (lo stesso sangue, un oggetto di ciascuno, una lista coi nomi): paghi la Portata del più lontano.\nAccesso con Entropia: lanci su una folla o su un'area senza scegliere uno per uno (un mercato, una tribuna, un ingorgo): paghi solo l'Area.\nAccesso con Forza: la stessa energia li tocca tutti (un pavimento sotto tensione, la musica di un concerto, la luce dei riflettori).\nAccesso con Materia: hanno addosso lo stesso tipo di oggetto (le pistole d'ordinanza, le divise, i telefoni).\nAccesso con Mente: li tiene insieme la stessa emozione (il panico di una fuga, il tifo di uno stadio, la devozione di una setta).\nAccesso con Primordio: portano la stessa Risonanza (chi ha bevuto allo stesso Nodo, i Talismani caricati dalla stessa mano, i presenti a uno stesso rito).\nAccesso con Spirito: veglia su di loro lo stesso spirito (il protettore di una famiglia, lo spirito di una nave, il patrono di un paese).\nAccesso con Tempo: hanno vissuto lo stesso momento (gli invitati di una festa, i testimoni di un incidente, i nati nello stesso giorno).\nAccesso con Vita: guarisci più feriti nella stessa stanza, anche senza toccarli.",
    "attivo": "Paga 2 Quintessenza: vale come tratto comune anche qualcosa che hai creato tu in questa scena.",
    "passivo": "Il punteggio dell'Ambito di Bersagli non conta sino al 4° pallino quando per la tua Sfera la folla è una cosa sola (hanno già un tratto comune: qualcosa che li lega tutti, e da lì la tua Sfera li raggiunge insieme).\nAccesso con Corrispondenza: i Bersagli sparsi in luoghi diversi hanno qualcosa in comune che tieni in mano (lo stesso sangue, un oggetto di ciascuno, una lista coi nomi): paghi la Portata del più lontano.\nAccesso con Entropia: lanci su una folla o su un'area senza scegliere uno per uno (un mercato, una tribuna, un ingorgo): paghi solo l'Area.\nAccesso con Forza: la stessa energia li tocca tutti (un pavimento sotto tensione, la musica di un concerto, la luce dei riflettori).\nAccesso con Materia: hanno addosso lo stesso tipo di oggetto (le pistole d'ordinanza, le divise, i telefoni).\nAccesso con Mente: li tiene insieme la stessa emozione (il panico di una fuga, il tifo di uno stadio, la devozione di una setta).\nAccesso con Primordio: portano la stessa Risonanza (chi ha bevuto allo stesso Nodo, i Talismani caricati dalla stessa mano, i presenti a uno stesso rito).\nAccesso con Spirito: veglia su di loro lo stesso spirito (il protettore di una famiglia, lo spirito di una nave, il patrono di un paese).\nAccesso con Tempo: hanno vissuto lo stesso momento (gli invitati di una festa, i testimoni di un incidente, i nati nello stesso giorno).\nAccesso con Vita: guarisci più feriti nella stessa stanza, anche senza toccarli.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Uno o cento, per te è lo stesso lavoro.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Segue il lancio effetto attivo, segue il lancio effetto passivo.",
    "formula": "vincolare",
    "formulaName": "Vincolare",
    "link": "regola",
    "page": "Generali",
    "hooks": [
      "tiro",
      "ambiti",
      "quintessenza",
      "salute"
    ],
    "effects": [
      {
        "on": "freeScope",
        "scope": "targets",
        "value": 4,
        "nota": "Il punteggio dell'Ambito di Bersagli non conta sino al 4° pallino quando per la tua Sfera la folla è una cosa sola"
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "impresa-impossibile",
    "spheres": [
      "any"
    ],
    "name": "Impresa impossibile",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione un tuo lancio di quella Sfera ignora il +5 statico delle imprese impossibili.\nAccesso con Corrispondenza: creare uno spazio nuovo, come lo spazio per un altro continente (Atlantide).\nAccesso con Entropia: spezzare un destino già scritto (una profezia, la maledizione di una stirpe, una morte annunciata) (Uno su un milione).\nAccesso con Forza: creare un buco nero (Buco nero).\nAccesso con Materia: un materiale nuovo con proprietà uniche (Elemento 119).\nAccesso con Mente: creare una coscienza (Pinocchio).\nAccesso con Primordio: toccare il Paradosso, fare quello che può fare il Narratore (Dietro lo schermo).\nAccesso con Spirito: creare un'anima (Pigmalione).\nAccesso con Tempo: viaggiare nel tempo (Viaggiatore Temporale).\nAccesso con Vita: la resurrezione (Segreto della Resurrezione).",
    "attivo": "Una volta per sessione un tuo lancio di quella Sfera ignora il +5 statico delle imprese impossibili.\nAccesso con Corrispondenza: creare uno spazio nuovo, come lo spazio per un altro continente (Atlantide).\nAccesso con Entropia: spezzare un destino già scritto (una profezia, la maledizione di una stirpe, una morte annunciata) (Uno su un milione).\nAccesso con Forza: creare un buco nero (Buco nero).\nAccesso con Materia: un materiale nuovo con proprietà uniche (Elemento 119).\nAccesso con Mente: creare una coscienza (Pinocchio).\nAccesso con Primordio: toccare il Paradosso, fare quello che può fare il Narratore (Dietro lo schermo).\nAccesso con Spirito: creare un'anima (Pigmalione).\nAccesso con Tempo: viaggiare nel tempo (Viaggiatore Temporale).\nAccesso con Vita: la resurrezione (Segreto della Resurrezione).",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Impossibile è una parola per chi non ha studiato abbastanza.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Volgare effetto attivo (il lancio è l'impresa), nessuno effetto passivo.",
    "formula": "rivoluzionare",
    "formulaName": "Rivoluzionare",
    "link": "regola",
    "page": "Generali",
    "hooks": [
      "uso",
      "paradosso",
      "altri",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "la-pratica-rende-perfetti",
    "spheres": [
      "any"
    ],
    "name": "La Pratica rende Perfetti",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Una volta per sessione, paga 2 Quintessenza: l'effetto scelto riesce senza tirare, purché il tiro sia possibile (dopo la soglia ti resta almeno un dado).\n\nEffetto passivo: Scegli un effetto di Magick nel tuo Grimorio (già pronto o che tu abbia creato): quell'effetto ottiene permanentemente -2 alla soglia, senza scendere sotto zero. Devi comunque possedere le Sfere.",
    "attivo": "Una volta per sessione, paga 2 Quintessenza: l'effetto scelto riesce senza tirare, purché il tiro sia possibile (dopo la soglia ti resta almeno un dado).",
    "passivo": "Scegli un effetto di Magick nel tuo Grimorio (già pronto o che tu abbia creato): quell'effetto ottiene permanentemente -2 alla soglia, senza scendere sotto zero. Devi comunque possedere le Sfere.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Nel tuo campo non c'è gara.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Segue il lancio effetto attivo, segue il lancio effetto passivo.",
    "formula": "ripetere",
    "formulaName": "Ripetere",
    "link": "regola",
    "page": "Generali",
    "hooks": [
      "uso",
      "tiro",
      "quintessenza"
    ],
    "effects": [
      {
        "on": "threshold",
        "value": -2,
        "when": "incantesimoScelto",
        "nota": "quell'effetto ottiene permanentemente -2 alla soglia, senza scendere sotto zero"
      },
      {
        "mode": "attivo",
        "on": "autoSuccess",
        "when": [
          "incantesimoScelto",
          "dadi1"
        ],
        "nota": "l'effetto scelto riesce senza tirare, purché il tiro sia possibile (dopo la soglia ti resta almeno un dado)"
      }
    ],
    "scelta": {
      "kind": "incantesimo"
    },
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "legame",
    "spheres": [
      "any"
    ],
    "name": "Legame",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga 2 Quintessenza: crei sul momento un legame con un bersaglio con cui hai un legame superficiale (una foto, averlo incontrato una volta, il suo nome), e vale per la sessione.\n\nEffetto passivo: Il punteggio dell'Ambito di Portata non conta sino al 4° pallino verso ciò con cui hai un legame (quello che ti unisce al bersaglio anche quando è lontano). Il legame fa anche da ponte: salti la Regola del Ponte per lo spazio (quella che chiede Corrispondenza per agire su ciò che non vedi).\nAccesso con Corrispondenza: un luogo dove sei già stato, un punto che vedi se ti teletrasporti lì, chi hai marcato toccandolo in questa sessione.\nAccesso con Entropia: un conto aperto fra voi (un debito da saldare, una scommessa persa, una maledizione che gli hai lanciato).\nAccesso con Forza: un oggetto che porta l'energia scelta (un cavo, una tubatura, una ringhiera di ferro) fino al bersaglio, se è un conduttore naturale.\nAccesso con Materia: un pezzo dell'oggetto che tieni con te (una scheggia della statua, un bullone della macchina, l'altra metà di una banconota).\nAccesso con Mente: una mente legata alla tua (chi hai letto nel pensiero, chi ti ha fatto una promessa, chi ti sta pensando in questo momento).\nAccesso con Primordio: un compagno con cui hai condiviso Quintessenza in questa sessione, una volta a scena.\nAccesso con Spirito: uno spirito che hai già incontrato, anche senza avere niente di suo.\nAccesso con Tempo: qualcuno con cui hai un appuntamento (una cena fissata, una partenza insieme, un duello all'alba).\nAccesso con Vita: un pezzo del suo corpo che tieni con te (una goccia di sangue, una ciocca di capelli, un'unghia).",
    "attivo": "Paga 2 Quintessenza: crei sul momento un legame con un bersaglio con cui hai un legame superficiale (una foto, averlo incontrato una volta, il suo nome), e vale per la sessione.",
    "passivo": "Il punteggio dell'Ambito di Portata non conta sino al 4° pallino verso ciò con cui hai un legame (quello che ti unisce al bersaglio anche quando è lontano). Il legame fa anche da ponte: salti la Regola del Ponte per lo spazio (quella che chiede Corrispondenza per agire su ciò che non vedi).\nAccesso con Corrispondenza: un luogo dove sei già stato, un punto che vedi se ti teletrasporti lì, chi hai marcato toccandolo in questa sessione.\nAccesso con Entropia: un conto aperto fra voi (un debito da saldare, una scommessa persa, una maledizione che gli hai lanciato).\nAccesso con Forza: un oggetto che porta l'energia scelta (un cavo, una tubatura, una ringhiera di ferro) fino al bersaglio, se è un conduttore naturale.\nAccesso con Materia: un pezzo dell'oggetto che tieni con te (una scheggia della statua, un bullone della macchina, l'altra metà di una banconota).\nAccesso con Mente: una mente legata alla tua (chi hai letto nel pensiero, chi ti ha fatto una promessa, chi ti sta pensando in questo momento).\nAccesso con Primordio: un compagno con cui hai condiviso Quintessenza in questa sessione, una volta a scena.\nAccesso con Spirito: uno spirito che hai già incontrato, anche senza avere niente di suo.\nAccesso con Tempo: qualcuno con cui hai un appuntamento (una cena fissata, una partenza insieme, un duello all'alba).\nAccesso con Vita: un pezzo del suo corpo che tieni con te (una goccia di sangue, una ciocca di capelli, un'unghia).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Per te la distanza è un dettaglio.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Basso rischio effetto attivo, segue il lancio effetto passivo.",
    "formula": "vincolare",
    "formulaName": "Vincolare",
    "link": "regola",
    "page": "Generali",
    "hooks": [
      "uso",
      "ambiti",
      "quintessenza",
      "salute",
      "altri"
    ],
    "effects": [
      {
        "on": "freeScope",
        "scope": "range",
        "value": 4,
        "nota": "Il punteggio dell'Ambito di Portata non conta sino al 4° pallino verso ciò con cui hai un legame"
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "mestiere",
    "spheres": [
      "any"
    ],
    "name": "Mestiere",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga 1 Quintessenza: si attiva anche per l'effetto di Magick.\n\nEffetto passivo: All'acquisto scegli un'Abilità. Quando tiri quell'Abilità non a scopo di Magick ottieni un dado in più per ogni tua Sfera di cui riesci a giustificare l'utilizzo, fino a 3. Se ad esempio scegli Convincere e hai Tempo e Mente, è facile prevedere che cosa dirà e che cosa penserà: per questo hai due dadi in più. Se sullo stesso tiro vale anche Sesto senso, prendi il più alto dei due.",
    "attivo": "Paga 1 Quintessenza: si attiva anche per l'effetto di Magick.",
    "passivo": "All'acquisto scegli un'Abilità. Quando tiri quell'Abilità non a scopo di Magick ottieni un dado in più per ogni tua Sfera di cui riesci a giustificare l'utilizzo, fino a 3. Se ad esempio scegli Convincere e hai Tempo e Mente, è facile prevedere che cosa dirà e che cosa penserà: per questo hai due dadi in più. Se sullo stesso tiro vale anche Sesto senso, prendi il più alto dei due.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Prima ancora della Magick, il mestiere.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Segue il lancio effetto attivo, nessuno effetto passivo: sono tiri di Abilità.",
    "formula": "sapere",
    "formulaName": "Sapere",
    "link": "regola",
    "page": "Generali",
    "hooks": [
      "tiro",
      "quintessenza"
    ],
    "effects": [
      {
        "on": "dice",
        "value": {
          "from": "sfere",
          "max": 3
        },
        "roll": "abilita",
        "when": "abilitaScelta",
        "nota": "Quando tiri quell'Abilità non a scopo di Magick ottieni un dado in più per ogni tua Sfera di cui riesci a giustificare l'utilizzo, fino a 3."
      },
      {
        "mode": "attivo",
        "on": "dice",
        "value": {
          "from": "sfere",
          "max": 3
        },
        "roll": "magick",
        "when": "abilitaScelta",
        "nota": "Paga 1 Quintessenza: si attiva anche per l'effetto di Magick."
      }
    ],
    "scelta": {
      "kind": "abilita"
    },
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "modello",
    "spheres": [
      "any"
    ],
    "name": "Modello",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga 2 Quintessenza: per un lancio vale anche su un altro tipo di bersaglio della tua Sfera, fra quelli che di solito chiedono una Sfera compagna.\n\nEffetto passivo: All'acquisto scegli un tipo di bersaglio che di solito chiede una Sfera compagna (la seconda Sfera, quella che tocca il bersaglio per ciò che è: per colpire con Vita un vampiro, che è carne morta, serve Materia). Su quel bersaglio lavori come se avessi anche la compagna, perché ne conosci il Modello (la trama che fa di una cosa quello che è). L'incantesimo può comunque essere Volgare, ma per bersagliare il soggetto salti la Regola del Bersaglio (quella che chiede tutte e due le Sfere quando l'effetto tocca due domini).",
    "attivo": "Paga 2 Quintessenza: per un lancio vale anche su un altro tipo di bersaglio della tua Sfera, fra quelli che di solito chiedono una Sfera compagna.",
    "passivo": "All'acquisto scegli un tipo di bersaglio che di solito chiede una Sfera compagna (la seconda Sfera, quella che tocca il bersaglio per ciò che è: per colpire con Vita un vampiro, che è carne morta, serve Materia). Su quel bersaglio lavori come se avessi anche la compagna, perché ne conosci il Modello (la trama che fa di una cosa quello che è). L'incantesimo può comunque essere Volgare, ma per bersagliare il soggetto salti la Regola del Bersaglio (quella che chiede tutte e due le Sfere quando l'effetto tocca due domini).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Qualunque cosa sia, ha un Modello.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Segue il lancio effetto attivo, segue il lancio effetto passivo.",
    "formula": "sapere",
    "formulaName": "Sapere",
    "link": "regola",
    "page": "Generali",
    "hooks": [
      "quintessenza",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "segnale",
    "spheres": [
      "any"
    ],
    "name": "Segnale",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga 2 Quintessenza: fai scattare subito un tuo effetto che aspetta il suo segnale.\n\nEffetto passivo: Il punteggio dell'Ambito di Condizioni non conta sino al 4° pallino quando il segnale è preciso (il segnale è una condizione che dice all'effetto quando scattare, su chi o fino a quando: è preciso se la tua Sfera lo riconosce da sola). Le condizioni che la tua Sfera non riconosce contano come sempre.\nAccesso con Corrispondenza: il segnale è qualcosa che entra, esce o arriva in un posto (qualcuno varca la porta, un'auto lascia il parcheggio, un pacco arriva a destinazione).\nAccesso con Entropia: il segnale lo dà il caso (un bicchiere che si rompe, la moneta che cade su testa, il primo passo falso).\nAccesso con Forza: il segnale è un'energia che cambia (si accende una luce, parte uno sparo, scatta un allarme).\nAccesso con Materia: prepari un oggetto che scatta a comando (esplode, si scioglie, crolla) e il comando è una tua parola o un tuo gesto.\nAccesso con Mente: il segnale è quello che pensa o prova chi lo subisce (pensa a te, sa di mentire, ha paura).\nAccesso con Primordio: il segnale è la Quintessenza che si muove (qualcuno la spende, qualcuno beve dal Nodo, si accende una Meraviglia).\nAccesso con Spirito: il segnale viene da oltre il Velo (uno spirito entra nella stanza, qualcuno passa nell'Umbra, un fantasma si mostra).\nAccesso con Tempo: la Condizione è un momento preciso (l'alba, mezzanotte, il rintocco di una campana).\nAccesso con Vita: il segnale viene dal corpo (il cuore accelera, cade la prima goccia di sangue, il bersaglio si addormenta).",
    "attivo": "Paga 2 Quintessenza: fai scattare subito un tuo effetto che aspetta il suo segnale.",
    "passivo": "Il punteggio dell'Ambito di Condizioni non conta sino al 4° pallino quando il segnale è preciso (il segnale è una condizione che dice all'effetto quando scattare, su chi o fino a quando: è preciso se la tua Sfera lo riconosce da sola). Le condizioni che la tua Sfera non riconosce contano come sempre.\nAccesso con Corrispondenza: il segnale è qualcosa che entra, esce o arriva in un posto (qualcuno varca la porta, un'auto lascia il parcheggio, un pacco arriva a destinazione).\nAccesso con Entropia: il segnale lo dà il caso (un bicchiere che si rompe, la moneta che cade su testa, il primo passo falso).\nAccesso con Forza: il segnale è un'energia che cambia (si accende una luce, parte uno sparo, scatta un allarme).\nAccesso con Materia: prepari un oggetto che scatta a comando (esplode, si scioglie, crolla) e il comando è una tua parola o un tuo gesto.\nAccesso con Mente: il segnale è quello che pensa o prova chi lo subisce (pensa a te, sa di mentire, ha paura).\nAccesso con Primordio: il segnale è la Quintessenza che si muove (qualcuno la spende, qualcuno beve dal Nodo, si accende una Meraviglia).\nAccesso con Spirito: il segnale viene da oltre il Velo (uno spirito entra nella stanza, qualcuno passa nell'Umbra, un fantasma si mostra).\nAccesso con Tempo: la Condizione è un momento preciso (l'alba, mezzanotte, il rintocco di una campana).\nAccesso con Vita: il segnale viene dal corpo (il cuore accelera, cade la prima goccia di sangue, il bersaglio si addormenta).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«A mezzanotte in punto. Non un secondo prima.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Segue il lancio effetto attivo, segue il lancio effetto passivo.",
    "formula": "condizionare",
    "formulaName": "Condizionare",
    "link": "regola",
    "page": "Generali",
    "hooks": [
      "ambiti",
      "quintessenza",
      "condizione",
      "combattimento",
      "altri"
    ],
    "effects": [
      {
        "on": "freeScope",
        "scope": "conditions",
        "value": 4,
        "nota": "Il punteggio dell'Ambito di Condizioni non conta sino al 4° pallino quando il segnale è preciso"
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "sentinella",
    "spheres": [
      "any"
    ],
    "name": "Sentinella",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga 1 Quintessenza: per una scena la Sentinella copre anche un altro bersaglio. È possibile coprire più bersagli pagando più Quintessenza.\n\nEffetto passivo: Quando qualcuno usa una Sfera che conosci su di te o intorno a te, te ne accorgi prima che il lancio sia completo e hai diritto a una reazione istintiva a soglia -2.\n\nEffetto Amalgama: Avere altre Sfere consente una protezione attiva anche per quelle Sfere.",
    "attivo": "Paga 1 Quintessenza: per una scena la Sentinella copre anche un altro bersaglio. È possibile coprire più bersagli pagando più Quintessenza.",
    "passivo": "Quando qualcuno usa una Sfera che conosci su di te o intorno a te, te ne accorgi prima che il lancio sia completo e hai diritto a una reazione istintiva a soglia -2.",
    "amalgama": "Avere altre Sfere consente una protezione attiva anche per quelle Sfere.",
    "amalgam": "any",
    "amalgams": [
      "any"
    ],
    "amalgamText": "Avere altre Sfere consente una protezione attiva anche per quelle Sfere.",
    "flavor": "«Non ti serve vedere: lo senti arrivare.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "percepire",
    "formulaName": "Percepire",
    "link": "effetto",
    "page": "Generali",
    "hooks": [
      "tiro",
      "quintessenza",
      "combattimento",
      "altri"
    ],
    "effects": [
      {
        "on": "threshold",
        "value": -2,
        "nota": "hai diritto a una reazione istintiva a soglia -2"
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "sesto-senso",
    "spheres": [
      "any"
    ],
    "name": "Sesto senso",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga 2 Quintessenza: fai una domanda precisa al Narratore su quello che il senso coglie (cosa, quanto, da dove) e hai la risposta senza tirare.\n\nEffetto passivo: Percepisci senza tirare quello che la tua Sfera sa vedere. Quando un tiro di Abilità è coerente con quello che percepisci nella scena, il Narratore può concederti soglia -2 oppure 2 dadi in più. Se ad esempio con Vita vedi che la guardia è avvelenata, può concederlo al tiro di Medicina per salvarla e anche a quello di Convincere per farti dire chi è stato.\nAccesso con Corrispondenza: sai sempre dove sei, con le coordinate X, Y, Z; percepisci le aree più vicine a te, quanto sono vicine e all'incirca cosa sono (una zona industriale, un rifugio montano, un lago).\nAccesso con Entropia: senti dove il caso pende (la serratura che cederà, la trave marcia, il tavolo truccato) e gli eventi fortunati o sfortunati in arrivo.\nAccesso con Forza: pensi a un tipo di energia (elettricità, calore, suono) e sai se c'è e a che intensità.\nAccesso con Materia: guardando un oggetto sai di cosa è fatto e a che cosa serve (una lega, una polvere, un congegno).\nAccesso con Mente: senti le emozioni di chi hai intorno (paura, rabbia, desiderio) e i residui psichici rimasti nei luoghi, e hai una memoria spiccata per quello che hai visto e sentito.\nAccesso con Primordio: percepisci i Risvegliati intorno a te dalla loro Risonanza, e dove c'è o non c'è Quintessenza in eccesso (un Nodo, del Tass, un Talismano).\nAccesso con Spirito: senti se in scena ci sono spiriti, effimera o presenze oltre il Velo, e dove il Velo è sottile.\nAccesso con Tempo: sai sempre che ore sono e che ore NON sono, e senti a pelle le anomalie temporali (un déjà-vu, un ciclo, un rallentamento).\nAccesso con Vita: guardando un corpo sai cosa ha (ferite, veleni, gravidanza).\n\nEffetto Amalgama: Combinando le sensazioni puoi avere una dinamica più precisa: ad esempio combinando Mente e Vita puoi distinguere le tipologie di persone, oppure con Materia e Corrispondenza sai che cosa potrebbero essere quegli edifici in lontananza. Ciononostante non hai un livello di precisione tale da sapere che 2 persone nella stessa stanza sono fratelli, oppure che c'è una bomba nel 3° edificio sulla strada: quella è Magick.",
    "attivo": "Paga 2 Quintessenza: fai una domanda precisa al Narratore su quello che il senso coglie (cosa, quanto, da dove) e hai la risposta senza tirare.",
    "passivo": "Percepisci senza tirare quello che la tua Sfera sa vedere. Quando un tiro di Abilità è coerente con quello che percepisci nella scena, il Narratore può concederti soglia -2 oppure 2 dadi in più. Se ad esempio con Vita vedi che la guardia è avvelenata, può concederlo al tiro di Medicina per salvarla e anche a quello di Convincere per farti dire chi è stato.\nAccesso con Corrispondenza: sai sempre dove sei, con le coordinate X, Y, Z; percepisci le aree più vicine a te, quanto sono vicine e all'incirca cosa sono (una zona industriale, un rifugio montano, un lago).\nAccesso con Entropia: senti dove il caso pende (la serratura che cederà, la trave marcia, il tavolo truccato) e gli eventi fortunati o sfortunati in arrivo.\nAccesso con Forza: pensi a un tipo di energia (elettricità, calore, suono) e sai se c'è e a che intensità.\nAccesso con Materia: guardando un oggetto sai di cosa è fatto e a che cosa serve (una lega, una polvere, un congegno).\nAccesso con Mente: senti le emozioni di chi hai intorno (paura, rabbia, desiderio) e i residui psichici rimasti nei luoghi, e hai una memoria spiccata per quello che hai visto e sentito.\nAccesso con Primordio: percepisci i Risvegliati intorno a te dalla loro Risonanza, e dove c'è o non c'è Quintessenza in eccesso (un Nodo, del Tass, un Talismano).\nAccesso con Spirito: senti se in scena ci sono spiriti, effimera o presenze oltre il Velo, e dove il Velo è sottile.\nAccesso con Tempo: sai sempre che ore sono e che ore NON sono, e senti a pelle le anomalie temporali (un déjà-vu, un ciclo, un rallentamento).\nAccesso con Vita: guardando un corpo sai cosa ha (ferite, veleni, gravidanza).",
    "amalgama": "Combinando le sensazioni puoi avere una dinamica più precisa: ad esempio combinando Mente e Vita puoi distinguere le tipologie di persone, oppure con Materia e Corrispondenza sai che cosa potrebbero essere quegli edifici in lontananza. Ciononostante non hai un livello di precisione tale da sapere che 2 persone nella stessa stanza sono fratelli, oppure che c'è una bomba nel 3° edificio sulla strada: quella è Magick.",
    "amalgam": "any",
    "amalgams": [
      "any"
    ],
    "amalgamText": "Combinando le sensazioni puoi avere una dinamica più precisa: ad esempio combinando Mente e Vita puoi distinguere le tipologie di persone, oppure con Materia e Corrispondenza sai che cosa potrebbero essere quegli edifici in lontananza. Ciononostante non hai un livello di precisione tale da sapere che 2 persone nella stessa stanza sono fratelli, oppure che c'è una bomba nel 3° edificio sulla strada: quella è Magick.",
    "flavor": "«Non guardi: sai.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "percepire",
    "formulaName": "Percepire",
    "link": "effetto",
    "page": "Generali",
    "hooks": [
      "tiro",
      "quintessenza",
      "combattimento",
      "narratore"
    ],
    "effects": [
      {
        "on": "dice",
        "value": 2,
        "roll": "abilita",
        "nota": "Quando un tiro di Abilità è coerente con quello che percepisci nella scena, il Narratore può concederti soglia -2 oppure 2 dadi in più."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "adrenalina",
    "spheres": [
      "mind",
      "spirit",
      "life"
    ],
    "name": "Adrenalina",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Accesso con Mente: quando sei sotto metà Salute, i lanci di Mente su te stesso hanno soglia meno 2 e le Condizioni mentali pregresse vengono ignorate per la scena (si aggiornerà a catena col rifacimento delle Condizioni).\nAccesso con Spirito: quando sei sotto metà Salute, i lanci di Spirito su te stesso hanno soglia meno 2 e le Condizioni soprannaturali pregresse vengono ignorate per la scena.\nAccesso con Vita: quando sei sotto metà Salute, i lanci di Vita su te stesso hanno soglia meno 2 e le Condizioni fisiche pregresse vengono ignorate per la scena.\n\nEffetto Amalgama: Per ognuna delle Sfere aggiunte ottieni la protezione dalle Condizioni di quel tipo.\nAccesso con Primordio: se le Condizioni derivano da anomalie paradossali, sono messe in pausa per la scena.",
    "attivo": "",
    "passivo": "Accesso con Mente: quando sei sotto metà Salute, i lanci di Mente su te stesso hanno soglia meno 2 e le Condizioni mentali pregresse vengono ignorate per la scena (si aggiornerà a catena col rifacimento delle Condizioni).\nAccesso con Spirito: quando sei sotto metà Salute, i lanci di Spirito su te stesso hanno soglia meno 2 e le Condizioni soprannaturali pregresse vengono ignorate per la scena.\nAccesso con Vita: quando sei sotto metà Salute, i lanci di Vita su te stesso hanno soglia meno 2 e le Condizioni fisiche pregresse vengono ignorate per la scena.",
    "amalgama": "Per ognuna delle Sfere aggiunte ottieni la protezione dalle Condizioni di quel tipo.\nCon Primordio: se le Condizioni derivano da anomalie paradossali, sono messe in pausa per la scena.",
    "amalgam": "mind",
    "amalgams": [
      "mind",
      "prime",
      "spirit",
      "life"
    ],
    "amalgamText": "Per ognuna delle Sfere aggiunte ottieni la protezione dalle Condizioni di quel tipo.\nAccesso con Primordio: se le Condizioni derivano da anomalie paradossali, sono messe in pausa per la scena.",
    "flavor": "«Quando fa davvero male, funzioni meglio.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, segue il lancio effetto passivo.",
    "formula": "potenziare",
    "formulaName": "Potenziare",
    "link": "regola",
    "page": "Generali",
    "hooks": [
      "tiro",
      "salute",
      "condizione"
    ],
    "effects": [
      {
        "on": "threshold",
        "value": -2,
        "when": "saluteMeta",
        "nota": "quando sei sotto metà Salute"
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "ambito-di-casa",
    "spheres": [
      "correspondence",
      "entropy",
      "forces",
      "matter",
      "mind",
      "time",
      "life"
    ],
    "name": "Ambito di Casa",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga 4 Quintessenza: per un lancio l'Ambito scelto non conta nella soglia, a qualunque livello.\n\nEffetto passivo: Scegli l'Ambito all'acquisto, si prende una volta sola. Nei lanci in cui usi la Sfera d'accesso, l'Ambito scelto non conta nella soglia fino a un livello pari al numero di poteri che conosci in quella Sfera. Se ad esempio conosci 3 poteri di Forza e hai scelto Potenza, hai sino a Potenza 3 gratis, da 4 si paga.\nAccesso con Corrispondenza: Portata o Area.\nAccesso con Entropia: Condizioni o Precisione.\nAccesso con Forza: Potenza o Portata.\nAccesso con Materia: Durata o Area.\nAccesso con Mente: Bersagli o Precisione.\nAccesso con Tempo: Durata o Condizioni.\nAccesso con Vita: Potenza o Bersagli.",
    "attivo": "Paga 4 Quintessenza: per un lancio l'Ambito scelto non conta nella soglia, a qualunque livello.",
    "passivo": "Scegli l'Ambito all'acquisto, si prende una volta sola. Nei lanci in cui usi la Sfera d'accesso, l'Ambito scelto non conta nella soglia fino a un livello pari al numero di poteri che conosci in quella Sfera. Se ad esempio conosci 3 poteri di Forza e hai scelto Potenza, hai sino a Potenza 3 gratis, da 4 si paga.\nAccesso con Corrispondenza: Portata o Area.\nAccesso con Entropia: Condizioni o Precisione.\nAccesso con Forza: Potenza o Portata.\nAccesso con Materia: Durata o Area.\nAccesso con Mente: Bersagli o Precisione.\nAccesso con Tempo: Durata o Condizioni.\nAccesso con Vita: Potenza o Bersagli.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "(da scrivere)",
    "cost": "4 Quintessenza",
    "costValue": 4,
    "uses": null,
    "paradox": "Segue il lancio effetto attivo, segue il lancio effetto passivo.",
    "formula": "ritoccare",
    "formulaName": "Ritoccare",
    "link": "regola",
    "page": "Generali",
    "hooks": [
      "tiro",
      "ambiti",
      "quintessenza",
      "condizione"
    ],
    "effects": [
      {
        "on": "freeScope",
        "scope": "scelta",
        "value": {
          "from": "poteri"
        },
        "nota": "Nei lanci in cui usi la Sfera d'accesso, l'Ambito scelto non conta nella soglia fino a un livello pari al numero di poteri che conosci in quella Sfera."
      },
      {
        "mode": "attivo",
        "on": "freeScope",
        "scope": "scelta",
        "value": 7,
        "nota": "Paga 4 Quintessenza: per un lancio l'Ambito scelto non conta nella soglia, a qualunque livello."
      }
    ],
    "scelta": {
      "kind": "ambito",
      "options": {
        "correspondence": [
          "range",
          "targets"
        ],
        "entropy": [
          "conditions",
          "precision"
        ],
        "forces": [
          "potency",
          "range"
        ],
        "matter": [
          "duration",
          "targets"
        ],
        "mind": [
          "targets",
          "precision"
        ],
        "time": [
          "duration",
          "conditions"
        ],
        "life": [
          "potency",
          "targets"
        ]
      }
    },
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "bussola-doppia",
    "spheres": [
      "entropy",
      "mind"
    ],
    "name": "Bussola doppia",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga 1 Quintessenza: per un lancio fuori dalla Bussola prendi lo stesso il dado in più.\n\nEffetto passivo: Quando rispetti la Bussola in un lancio della tua Sfera, i dadi in più diventano due.\n\nEffetto Amalgama: Accesso con Primordio: se il lancio riesce, la Quintessenza guadagnata è 2 invece di 1.",
    "attivo": "Paga 1 Quintessenza: per un lancio fuori dalla Bussola prendi lo stesso il dado in più.",
    "passivo": "Quando rispetti la Bussola in un lancio della tua Sfera, i dadi in più diventano due.",
    "amalgama": "Con Primordio: se il lancio riesce, la Quintessenza guadagnata è 2 invece di 1.",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "Accesso con Primordio: se il lancio riesce, la Quintessenza guadagnata è 2 invece di 1.",
    "flavor": "«Quando segui la tua stella, il mondo ti paga il doppio.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "benedire-e-maledire",
    "formulaName": "Benedire e Maledire",
    "link": "regola",
    "page": "Generali",
    "hooks": [
      "tiro",
      "quintessenza"
    ],
    "effects": [
      {
        "on": "nota",
        "roll": "magick",
        "nota": "Quando rispetti la Bussola in un lancio della tua Sfera, i dadi in più diventano due."
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "incassare",
    "spheres": [
      "forces",
      "matter",
      "mind",
      "spirit",
      "life"
    ],
    "name": "Incassare",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga 2 Quintessenza: per un colpo la riduzione raddoppia.\n\nEffetto passivo: Quando subisci danni li riduci del numero di poteri che conosci nella Sfera; se il danno scende sotto 2 è nullo.\nAccesso con Forza + Vita: danni fisici.\nAccesso con Materia: dichiara un oggetto che porti e ottieni Dadi armatura invece di ridurre il normale danno finché l'hai con te; si rinnova ogni cambio scena.\nAccesso con Mente: danni mentali.\nAccesso con Spirito: danni fisici o mentali causati da creature dell'effimera.\n\nEffetto Amalgama: Avendo più Sfere, ottieni la riduzione anche per quel tipo di danno.\nAccesso con Primordio: riduci anche i danni paradossali, fisici o mentali.",
    "attivo": "Paga 2 Quintessenza: per un colpo la riduzione raddoppia.",
    "passivo": "Quando subisci danni li riduci del numero di poteri che conosci nella Sfera; se il danno scende sotto 2 è nullo.\nAccesso con Forza + Vita: danni fisici.\nAccesso con Materia: dichiara un oggetto che porti e ottieni Dadi armatura invece di ridurre il normale danno finché l'hai con te; si rinnova ogni cambio scena.\nAccesso con Mente: danni mentali.\nAccesso con Spirito: danni fisici o mentali causati da creature dell'effimera.",
    "amalgama": "Avendo più Sfere, ottieni la riduzione anche per quel tipo di danno.\nCon Primordio: riduci anche i danni paradossali, fisici o mentali.",
    "amalgam": "forces",
    "amalgams": [
      "forces",
      "matter",
      "mind",
      "prime",
      "spirit",
      "life"
    ],
    "amalgamText": "Avendo più Sfere, ottieni la riduzione anche per quel tipo di danno.\nAccesso con Primordio: riduci anche i danni paradossali, fisici o mentali.",
    "flavor": "«Fa male, sì. Meno di quanto speravi tu.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, basso rischio effetto passivo se non osservato.",
    "formula": "proteggere",
    "formulaName": "Proteggere",
    "link": "effetto",
    "page": "Generali",
    "hooks": [
      "tiro",
      "quintessenza",
      "salute",
      "combattimento",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "rigenerazione",
    "spheres": [
      "matter",
      "mind",
      "spirit",
      "life"
    ],
    "name": "Rigenerazione",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga 2 Quintessenza, ottieni immediatamente l'effetto passivo.\n\nEffetto passivo: Accesso con Materia: se parte del tuo equipaggiamento si è rovinata o consumata, al cambio scena torna come nuova, purché ce l'abbia ancora tu (la lama scheggiata, le munizioni sparate, la batteria scarica). Quello che ti hanno preso non torna.\nAccesso con Mente: ogni cambio scena rigeneri livelli di Salute superficiale mentale pari al numero di poteri che conosci in Mente.\nAccesso con Spirito: una volta per sessione cancelli una Macchia dalla Saggezza.\nAccesso con Vita: ogni cambio scena rigeneri livelli di Salute superficiale fisica pari al numero di poteri che conosci in Vita.\nCon Mente o con Vita puoi scambiare 2 livelli di Salute superficiale per curare 1 aggravato.\n\nEffetto Amalgama: Accesso con Mente + Vita: al cambio scena rigeneri livelli pari al più alto fra Vita e Mente. Guarisci livelli fisici o mentali a tua scelta, anche spartendoli.\nAccesso con Primordio: guarisci anche le caselle bloccate dal Paradosso.\nAccesso con Tempo: guarisci il doppio dei livelli al cambio scena.",
    "attivo": "Paga 2 Quintessenza, ottieni immediatamente l'effetto passivo.",
    "passivo": "Accesso con Materia: se parte del tuo equipaggiamento si è rovinata o consumata, al cambio scena torna come nuova, purché ce l'abbia ancora tu (la lama scheggiata, le munizioni sparate, la batteria scarica). Quello che ti hanno preso non torna.\nAccesso con Mente: ogni cambio scena rigeneri livelli di Salute superficiale mentale pari al numero di poteri che conosci in Mente.\nAccesso con Spirito: una volta per sessione cancelli una Macchia dalla Saggezza.\nAccesso con Vita: ogni cambio scena rigeneri livelli di Salute superficiale fisica pari al numero di poteri che conosci in Vita.\nCon Mente o con Vita puoi scambiare 2 livelli di Salute superficiale per curare 1 aggravato.",
    "amalgama": "Con Mente + Vita: al cambio scena rigeneri livelli pari al più alto fra Vita e Mente. Guarisci livelli fisici o mentali a tua scelta, anche spartendoli.\nCon Primordio: guarisci anche le caselle bloccate dal Paradosso.\nCon Tempo: guarisci il doppio dei livelli al cambio scena.",
    "amalgam": "mind",
    "amalgams": [
      "mind",
      "prime",
      "time",
      "life"
    ],
    "amalgamText": "Accesso con Mente + Vita: al cambio scena rigeneri livelli pari al più alto fra Vita e Mente. Guarisci livelli fisici o mentali a tua scelta, anche spartendoli.\nAccesso con Primordio: guarisci anche le caselle bloccate dal Paradosso.\nAccesso con Tempo: guarisci il doppio dei livelli al cambio scena.",
    "flavor": "«Sai che ti farai male, almeno, sei già pronto!»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Volgare effetto attivo, basso rischio effetto passivo.",
    "formula": "guarire",
    "formulaName": "Guarire",
    "link": "effetto",
    "page": "Generali",
    "hooks": [
      "uso",
      "quintessenza",
      "paradosso",
      "salute",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "seconda-possibilita",
    "spheres": [
      "entropy",
      "mind",
      "time"
    ],
    "name": "Seconda possibilità",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Un tiro andato male si rifà, secondo la tua Sfera.\nAccesso con Entropia: in tutta la sessione ritiri fino a 5 dadi, spartiti come vuoi, mai i rossi (Buona stella); una volta per scena, a tiro fatto, cambi un dado normale tuo o di un compagno in un 8 pagando 2 Quintessenza (Dado fortunato).\nAccesso con Mente: quando ritiri con la Volontà, ritiri 2 dadi in più, normali (Volontà Plus).\nAccesso con Tempo: dopo un tiro fallito, tuo o di un compagno, lo fai ritirare spendendo 2 Quintessenza; non più di una volta per bersaglio (Un'altra chance).\n\nEffetto passivo: Una volta per sessione ritiri un dado gratis, senza dichiararlo prima.\n\nEffetto Amalgama: Accesso con Entropia + Primordio: il dado cambiato in 8 vale anche in un tiro di Magick.\nAccesso con Primordio + Tempo: una volta per scena dichiari un tiro, lo fai e vedi l'esito: se ti piace prosegui, altrimenti annulli e torni a prima del tiro (Prevedere il tiro).",
    "attivo": "Un tiro andato male si rifà, secondo la tua Sfera.\nAccesso con Entropia: in tutta la sessione ritiri fino a 5 dadi, spartiti come vuoi, mai i rossi (Buona stella); una volta per scena, a tiro fatto, cambi un dado normale tuo o di un compagno in un 8 pagando 2 Quintessenza (Dado fortunato).\nAccesso con Mente: quando ritiri con la Volontà, ritiri 2 dadi in più, normali (Volontà Plus).\nAccesso con Tempo: dopo un tiro fallito, tuo o di un compagno, lo fai ritirare spendendo 2 Quintessenza; non più di una volta per bersaglio (Un'altra chance).",
    "passivo": "Una volta per sessione ritiri un dado gratis, senza dichiararlo prima.",
    "amalgama": "Con Entropia + Primordio: il dado cambiato in 8 vale anche in un tiro di Magick.\nCon Primordio + Tempo: una volta per scena dichiari un tiro, lo fai e vedi l'esito: se ti piace prosegui, altrimenti annulli e torni a prima del tiro (Prevedere il tiro).",
    "amalgam": "entropy",
    "amalgams": [
      "entropy",
      "prime",
      "time"
    ],
    "amalgamText": "Accesso con Entropia + Primordio: il dado cambiato in 8 vale anche in un tiro di Magick.\nAccesso con Primordio + Tempo: una volta per scena dichiari un tiro, lo fai e vedi l'esito: se ti piace prosegui, altrimenti annulli e torni a prima del tiro (Prevedere il tiro).",
    "flavor": "«Il primo tiro era una prova.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "riavvolgere",
    "formulaName": "Riavvolgere",
    "link": "regola",
    "page": "Generali",
    "hooks": [
      "uso",
      "tiro",
      "ambiti",
      "quintessenza",
      "salute",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "senza-residuo",
    "spheres": [
      "matter",
      "spirit"
    ],
    "name": "Senza residuo",
    "dot": 0,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Paga 3 Quintessenza: una cosa che tocchi smette di esistere, senza tirare. Niente polvere, niente pezzi, niente da riparare.\nAccesso con Materia: un oggetto che tieni in mano (un'arma, una serratura, una prova).\nAccesso con Spirito: una presenza debole che tocchi (un fantasma appena nato, una Macchia lasciata su un oggetto, un'eco). Sugli spiriti veri serve la Magick.\n\nEffetto Amalgama: Accesso con Primordio: vale anche su un tuo effetto mantenuto, o su una Meraviglia scarica che tieni in mano.",
    "attivo": "Paga 3 Quintessenza: una cosa che tocchi smette di esistere, senza tirare. Niente polvere, niente pezzi, niente da riparare.\nAccesso con Materia: un oggetto che tieni in mano (un'arma, una serratura, una prova).\nAccesso con Spirito: una presenza debole che tocchi (un fantasma appena nato, una Macchia lasciata su un oggetto, un'eco). Sugli spiriti veri serve la Magick.",
    "passivo": "",
    "amalgama": "Con Primordio: vale anche su un tuo effetto mantenuto, o su una Meraviglia scarica che tieni in mano.",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "Accesso con Primordio: vale anche su un tuo effetto mantenuto, o su una Meraviglia scarica che tieni in mano.",
    "flavor": "«Non l'ho rotto. Non c'è mai stato.»",
    "cost": "3 Quintessenza",
    "costValue": 3,
    "uses": null,
    "paradox": "Volgare effetto attivo se qualcuno guarda, nessuno effetto passivo.",
    "formula": "annientare",
    "formulaName": "Annientare",
    "link": "proposta",
    "page": "Nuovi",
    "hooks": [
      "tiro",
      "quintessenza"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "guasto",
    "spheres": [
      "entropy",
      "forces",
      "matter"
    ],
    "name": "Guasto",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Paga 1 Quintessenza: un dispositivo che vedi smette di funzionare per la scena, senza tirare (una telecamera, un motore, un telefono).\nAccesso con Entropia: sembra un guasto qualunque, e nessuno ci vede la tua mano.\nAccesso con Forza: si spegne di colpo, e non si riaccende finché non lo dici tu.\nAccesso con Materia: si inceppa: per farlo ripartire serve un tiro di riparazione e un pezzo da sostituire.\n\nEffetto Amalgama: Accesso con Tempo: il guasto scatta quando dici tu, entro la sessione.",
    "attivo": "Paga 1 Quintessenza: un dispositivo che vedi smette di funzionare per la scena, senza tirare (una telecamera, un motore, un telefono).\nAccesso con Entropia: sembra un guasto qualunque, e nessuno ci vede la tua mano.\nAccesso con Forza: si spegne di colpo, e non si riaccende finché non lo dici tu.\nAccesso con Materia: si inceppa: per farlo ripartire serve un tiro di riparazione e un pezzo da sostituire.",
    "passivo": "",
    "amalgama": "Con Tempo: il guasto scatta quando dici tu, entro la sessione.",
    "amalgam": "time",
    "amalgams": [
      "time"
    ],
    "amalgamText": "Accesso con Tempo: il guasto scatta quando dici tu, entro la sessione.",
    "flavor": "«Si è rotto da solo. Succede.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "creare-e-distruggere",
    "formulaName": "Creare e Distruggere",
    "link": "proposta",
    "page": "Nuovi",
    "hooks": [
      "tiro",
      "quintessenza",
      "combattimento"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "miraggio",
    "spheres": [
      "forces",
      "mind",
      "time"
    ],
    "name": "Miraggio",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Paga 2 Quintessenza: per la scena crei un'illusione tangibile, una cosa che non c'è e che si vede, si sente e si tocca (un'ombra dietro la finestra, una voce oltre la porta, una porta dove c'era il muro). Chi la guarda ha diritto a una prova di Fermezza + Allerta, o Fermezza + Sotterfugio, contro una soglia pari al tuo Areté più i poteri che conosci nella Sfera: se la supera, scopre l'inganno.\nAccesso con Forza: è luce o suono, e la vedono tutti.\nAccesso con Mente: la vede solo chi scegli tu, e la crede.\nAccesso con Tempo: è una scena di ieri che non è andata così, per chi guarda nel passato.\n\nEffetto Amalgama: Accesso con Corrispondenza: la metti in un luogo che vedi da lontano.",
    "attivo": "Paga 2 Quintessenza: per la scena crei un'illusione tangibile, una cosa che non c'è e che si vede, si sente e si tocca (un'ombra dietro la finestra, una voce oltre la porta, una porta dove c'era il muro). Chi la guarda ha diritto a una prova di Fermezza + Allerta, o Fermezza + Sotterfugio, contro una soglia pari al tuo Areté più i poteri che conosci nella Sfera: se la supera, scopre l'inganno.\nAccesso con Forza: è luce o suono, e la vedono tutti.\nAccesso con Mente: la vede solo chi scegli tu, e la crede.\nAccesso con Tempo: è una scena di ieri che non è andata così, per chi guarda nel passato.",
    "passivo": "",
    "amalgama": "Con Corrispondenza: la metti in un luogo che vedi da lontano.",
    "amalgam": "correspondence",
    "amalgams": [
      "correspondence"
    ],
    "amalgamText": "Accesso con Corrispondenza: la metti in un luogo che vedi da lontano.",
    "flavor": "«Guarda meglio. No, ancora meglio.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "ingannare",
    "formulaName": "Ingannare",
    "link": "proposta",
    "page": "Nuovi",
    "hooks": [
      "tiro",
      "quintessenza"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "dettaglio",
    "spheres": [
      "forces",
      "matter",
      "life"
    ],
    "name": "Dettaglio",
    "dot": 1,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Una volta per scena cambi un dettaglio piccolo, senza tirare, e dura la scena.\nAccesso con Forza: il colore o il tono di una luce o di un suono (la lampada che vira al rosso, la voce più bassa, il motore che sembra un altro).\nAccesso con Materia: la forma di un oggetto piccolo che tieni in mano (la chiave che entra nella serratura, l'appiglio nel muro liscio, il proiettile del calibro giusto).\nAccesso con Vita: un connotato tuo (il colore degli occhi, i capelli, la voce).\n\nEffetto Amalgama: Accesso con Tempo: il dettaglio dura fino a fine sessione.",
    "attivo": "",
    "passivo": "Una volta per scena cambi un dettaglio piccolo, senza tirare, e dura la scena.\nAccesso con Forza: il colore o il tono di una luce o di un suono (la lampada che vira al rosso, la voce più bassa, il motore che sembra un altro).\nAccesso con Materia: la forma di un oggetto piccolo che tieni in mano (la chiave che entra nella serratura, l'appiglio nel muro liscio, il proiettile del calibro giusto).\nAccesso con Vita: un connotato tuo (il colore degli occhi, i capelli, la voce).",
    "amalgama": "Con Tempo: il dettaglio dura fino a fine sessione.",
    "amalgam": "time",
    "amalgams": [
      "time"
    ],
    "amalgamText": "Accesso con Tempo: il dettaglio dura fino a fine sessione.",
    "flavor": "«Un dettaglio. Nessuno se ne accorge.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "mutare",
    "formulaName": "Mutare",
    "link": "proposta",
    "page": "Nuovi",
    "hooks": [
      "uso",
      "tiro",
      "altri",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "convalescenza",
    "spheres": [
      "mind",
      "spirit",
      "time",
      "life"
    ],
    "name": "Convalescenza",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Paga 3 Quintessenza e una sessione di cure: togli a un compagno una cosa che la medicina dava per perduta, senza tirare. Una volta per bersaglio nella campagna.\nAccesso con Vita: una cicatrice che pesa, un arto che non regge, un aggravato che non si chiude.\nAccesso con Mente: una fobia, un vuoto di memoria, una Condizione mentale che non passa (si aggiornerà a catena col rifacimento delle Condizioni).\nAccesso con Spirito: una Macchia.\nAccesso con Tempo: come se non fosse mai successo: niente traccia, e nessun ricordo del male.\n\nEffetto Amalgama: Accesso con Primordio: vale anche su una casella bloccata dal Paradosso.",
    "attivo": "Paga 3 Quintessenza e una sessione di cure: togli a un compagno una cosa che la medicina dava per perduta, senza tirare. Una volta per bersaglio nella campagna.\nAccesso con Vita: una cicatrice che pesa, un arto che non regge, un aggravato che non si chiude.\nAccesso con Mente: una fobia, un vuoto di memoria, una Condizione mentale che non passa (si aggiornerà a catena col rifacimento delle Condizioni).\nAccesso con Spirito: una Macchia.\nAccesso con Tempo: come se non fosse mai successo: niente traccia, e nessun ricordo del male.",
    "passivo": "",
    "amalgama": "Con Primordio: vale anche su una casella bloccata dal Paradosso.",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "Accesso con Primordio: vale anche su una casella bloccata dal Paradosso.",
    "flavor": "«I medici avevano detto per sempre.»",
    "cost": "3 Quintessenza",
    "costValue": 3,
    "uses": {
      "per": "bersaglio",
      "n": 1
    },
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "risanare",
    "formulaName": "Risanare",
    "link": "proposta",
    "page": "Nuovi",
    "hooks": [
      "uso",
      "tiro",
      "quintessenza",
      "paradosso",
      "salute",
      "condizione",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "copertura",
    "spheres": [
      "entropy",
      "matter",
      "mind",
      "life"
    ],
    "name": "Copertura",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione, paga 2 Quintessenza: un falso regge a ogni controllo fino a fine sessione, senza tirare. Lo smaschera solo la Magick.\nAccesso con Entropia: un alibi (qualcuno ti ha visto altrove, lo scontrino ha l'ora giusta, la telecamera ti ha perso).\nAccesso con Materia: un oggetto o un documento (un badge, una banconota, una firma).\nAccesso con Mente: un'identità (un nome, una storia, un accento).\nAccesso con Vita: sembri morto, malato o ferito finché vuoi.\n\nEffetto Amalgama: Accesso con Tempo: il falso regge anche a chi guarda nel passato.",
    "attivo": "Una volta per sessione, paga 2 Quintessenza: un falso regge a ogni controllo fino a fine sessione, senza tirare. Lo smaschera solo la Magick.\nAccesso con Entropia: un alibi (qualcuno ti ha visto altrove, lo scontrino ha l'ora giusta, la telecamera ti ha perso).\nAccesso con Materia: un oggetto o un documento (un badge, una banconota, una firma).\nAccesso con Mente: un'identità (un nome, una storia, un accento).\nAccesso con Vita: sembri morto, malato o ferito finché vuoi.",
    "passivo": "",
    "amalgama": "Con Tempo: il falso regge anche a chi guarda nel passato.",
    "amalgam": "time",
    "amalgams": [
      "time"
    ],
    "amalgamText": "Accesso con Tempo: il falso regge anche a chi guarda nel passato.",
    "flavor": "«Controlla pure. È tutto in regola.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "simulare",
    "formulaName": "Simulare",
    "link": "proposta",
    "page": "Nuovi",
    "hooks": [
      "uso",
      "tiro",
      "quintessenza",
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "interruttore",
    "spheres": [
      "forces",
      "mind",
      "life"
    ],
    "name": "Interruttore",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Paga 1 Quintessenza: spegni una cosa sola per la scena, senza tirare.\nAccesso con Forza: una luce, un suono, una fiamma piccola (un lampione, un allarme, una candela).\nAccesso con Mente: un'emozione in una persona che vedi (la paura, la rabbia, il desiderio): resta lucida, e quella non la muove.\nAccesso con Vita: il dolore di un ferito: agisce senza malus, e la ferita resta.\n\nEffetto Amalgama: Accesso con Entropia: si spegne nel momento peggiore per chi ci contava.",
    "attivo": "Paga 1 Quintessenza: spegni una cosa sola per la scena, senza tirare.\nAccesso con Forza: una luce, un suono, una fiamma piccola (un lampione, un allarme, una candela).\nAccesso con Mente: un'emozione in una persona che vedi (la paura, la rabbia, il desiderio): resta lucida, e quella non la muove.\nAccesso con Vita: il dolore di un ferito: agisce senza malus, e la ferita resta.",
    "passivo": "",
    "amalgama": "Con Entropia: si spegne nel momento peggiore per chi ci contava.",
    "amalgam": "entropy",
    "amalgams": [
      "entropy"
    ],
    "amalgamText": "Accesso con Entropia: si spegne nel momento peggiore per chi ci contava.",
    "flavor": "«Basta. Spento.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "spegnere",
    "formulaName": "Spegnere",
    "link": "proposta",
    "page": "Nuovi",
    "hooks": [
      "tiro",
      "quintessenza"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "velocista",
    "spheres": [
      "forces",
      "time"
    ],
    "name": "Velocista",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga 2 Quintessenza: in questo turno fai un'azione in più.\n\nEffetto passivo: Ogni turno, in base a quanti poteri conosci in Tempo o in Forza (prendi il più alto), puoi fare qualcosa di più.\nCon 2 poteri: un'azione minore in più.\nCon 4 poteri: un'azione maggiore in più, non di Magick.\nCon 6 poteri: due azioni maggiori in più.",
    "attivo": "Paga 2 Quintessenza: in questo turno fai un'azione in più.",
    "passivo": "Ogni turno, in base a quanti poteri conosci in Tempo o in Forza (prendi il più alto), puoi fare qualcosa di più.\nCon 2 poteri: un'azione minore in più.\nCon 4 poteri: un'azione maggiore in più, non di Magick.\nCon 6 poteri: due azioni maggiori in più.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Quando tu hai finito di pensare, io ho già fatto.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "accelerare-e-rallentare",
    "formulaName": "Accelerare e Rallentare",
    "link": "proposta",
    "page": "Nuovi",
    "hooks": [
      "quintessenza",
      "combattimento"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "rallentare",
    "spheres": [
      "forces",
      "time"
    ],
    "name": "Rallentare",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Scegli un bersaglio che vedi.\nPaga 1 azione minore: il bersaglio agisce per ultimo nel turno.\nPaga 2 Quintessenza: non agisce in questo turno, ma in quello seguente ha +2 dadi ai tiri.\nPaga 4 Quintessenza: perde il turno.",
    "attivo": "Scegli un bersaglio che vedi.\nPaga 1 azione minore: il bersaglio agisce per ultimo nel turno.\nPaga 2 Quintessenza: non agisce in questo turno, ma in quello seguente ha +2 dadi ai tiri.\nPaga 4 Quintessenza: perde il turno.",
    "passivo": "",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Tu aspetta. Io no.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "accelerare-e-rallentare",
    "formulaName": "Accelerare e Rallentare",
    "link": "proposta",
    "page": "Nuovi",
    "hooks": [
      "tiro",
      "quintessenza",
      "combattimento",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "pronto-soccorso",
    "spheres": [
      "mind",
      "life"
    ],
    "name": "Pronto soccorso",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga 2 Quintessenza: un compagno che tocchi recupera subito l'ultimo danno che ha appena subito, meno uno (un colpo da tre ne rende due), senza tirare; paga 4 e uno di quei danni può essere aggravato. Una volta per scena a bersaglio.\nAccesso con Vita: ferite, veleni, febbre.\nAccesso con Mente: la Volontà, e una Condizione mentale (si aggiornerà a catena col rifacimento delle Condizioni).\n\nEffetto passivo: In una scena di cure, un compagno recupera un danno superficiale in più per ogni potere che conosci nella Sfera.\n\nEffetto Amalgama: Accesso con Spirito: vale anche su uno spirito, o su un compagno posseduto.",
    "attivo": "Paga 2 Quintessenza: un compagno che tocchi recupera subito l'ultimo danno che ha appena subito, meno uno (un colpo da tre ne rende due), senza tirare; paga 4 e uno di quei danni può essere aggravato. Una volta per scena a bersaglio.\nAccesso con Vita: ferite, veleni, febbre.\nAccesso con Mente: la Volontà, e una Condizione mentale (si aggiornerà a catena col rifacimento delle Condizioni).",
    "passivo": "In una scena di cure, un compagno recupera un danno superficiale in più per ogni potere che conosci nella Sfera.",
    "amalgama": "Con Spirito: vale anche su uno spirito, o su un compagno posseduto.",
    "amalgam": "spirit",
    "amalgams": [
      "spirit"
    ],
    "amalgamText": "Accesso con Spirito: vale anche su uno spirito, o su un compagno posseduto.",
    "flavor": "«Respira. Ci sono io.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": {
      "per": "bersaglio",
      "n": 1
    },
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "guarire",
    "formulaName": "Guarire",
    "link": "proposta",
    "page": "Nuovi",
    "hooks": [
      "uso",
      "tiro",
      "quintessenza",
      "salute",
      "condizione",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "sferzata",
    "spheres": [
      "entropy",
      "forces",
      "life"
    ],
    "name": "Sferzata",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga 2 Quintessenza: un bersaglio a contatto prende tanti danni superficiali quanti poteri conosci nella Sfera, senza tirare e senza difesa. Una volta per turno.\nAccesso con Forza: fuoco, scarica o urto, e si vede.\nAccesso con Vita: la carne cede sotto la mano, e sembra un colpo andato male.\nAccesso con Entropia: la caduta sbagliata, l'appoggio che manca, e sembra sfortuna.\n\nEffetto passivo: I tuoi colpi in mischia portano anche il tuo elemento: un danno in più, del tipo della Sfera.\n\nEffetto Amalgama: Accesso con Primordio: i danni dell'effetto attivo sono aggravati.",
    "attivo": "Paga 2 Quintessenza: un bersaglio a contatto prende tanti danni superficiali quanti poteri conosci nella Sfera, senza tirare e senza difesa. Una volta per turno.\nAccesso con Forza: fuoco, scarica o urto, e si vede.\nAccesso con Vita: la carne cede sotto la mano, e sembra un colpo andato male.\nAccesso con Entropia: la caduta sbagliata, l'appoggio che manca, e sembra sfortuna.",
    "passivo": "I tuoi colpi in mischia portano anche il tuo elemento: un danno in più, del tipo della Sfera.",
    "amalgama": "Con Primordio: i danni dell'effetto attivo sono aggravati.",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "Accesso con Primordio: i danni dell'effetto attivo sono aggravati.",
    "flavor": "«Non è il pugno che fa male. È quello che porta.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": {
      "per": "turno",
      "n": 1
    },
    "paradox": "Basso rischio effetto attivo (Volgare con Forza se qualcuno guarda), nessuno effetto passivo.",
    "formula": "danneggiare",
    "formulaName": "Danneggiare",
    "link": "proposta",
    "page": "Nuovi",
    "hooks": [
      "uso",
      "tiro",
      "quintessenza",
      "salute",
      "combattimento",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  },
  {
    "id": "bussola",
    "spheres": [
      "correspondence",
      "matter",
      "mind",
      "life"
    ],
    "name": "Bussola",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo: Paga 2 Quintessenza: sai anche la distanza, e se si sta muovendo. Paga 4 e la senti ovunque sia, per la sessione.\n\nEffetto passivo: Senti sempre la direzione di una cosa che hai toccato nella sessione, senza tirare, finché resta in città.\nAccesso con Corrispondenza: un luogo dove sei stato.\nAccesso con Mente: una persona.\nAccesso con Materia: un oggetto.\nAccesso con Vita: un vivente, anche un animale.\n\nEffetto Amalgama: Accesso con Tempo: sai anche dove era un'ora fa.",
    "attivo": "Paga 2 Quintessenza: sai anche la distanza, e se si sta muovendo. Paga 4 e la senti ovunque sia, per la sessione.",
    "passivo": "Senti sempre la direzione di una cosa che hai toccato nella sessione, senza tirare, finché resta in città.\nAccesso con Corrispondenza: un luogo dove sei stato.\nAccesso con Mente: una persona.\nAccesso con Materia: un oggetto.\nAccesso con Vita: un vivente, anche un animale.",
    "amalgama": "Con Tempo: sai anche dove era un'ora fa.",
    "amalgam": "time",
    "amalgams": [
      "time"
    ],
    "amalgamText": "Accesso con Tempo: sai anche dove era un'ora fa.",
    "flavor": "«Non so dov'è. So da che parte.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "trovare",
    "formulaName": "Trovare",
    "link": "proposta",
    "page": "Nuovi",
    "hooks": [
      "uso",
      "tiro",
      "quintessenza"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": false,
    "costoAttivo": "",
    "cadenzaPassivo": "",
    "costoVariabile": null
  }
]);

/** I poteri tolti dal rifacimento: id → { name, data, motivo }. */
export const POTERI_TOLTI = Object.freeze({
  "lascia-o-raddoppia": {
    "name": "Lascia o raddoppia",
    "data": "29/9/2026",
    "motivo": "Blue, 29/9: «lascia o raddoppia lo rimuoviamo»."
  },
  "fai-da-te": {
    "name": "Fai da te",
    "data": "29/9/2026",
    "motivo": "Blue, 29/9: si toglie, perché lo fa già Ce l'ho."
  },
  "pane-e-sale": {
    "name": "Pane e sale",
    "data": "30/9/2026",
    "motivo": "Blue, 30/9: «Lo possiamo fondere dentro a pace. L'effetto passivo lo spostiamo di là.»"
  }
});

/** L'impronta del catalogo: cambia quando cambia un potere, e allora le schede si riallineano (poteri-allinea.js). */
export const POTERI_VERSIONE = "fe7b9f55";
