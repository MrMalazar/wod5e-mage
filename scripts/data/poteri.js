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
    "kind": "attivo e passivo",
    "text": "Effetto attivo (3 Quintessenza): Scambi due spazi grandi al massimo quanto una stanza: quello in cui sei e uno in un posto dove sei già stato. Finché resti dentro, la stanza è quell'altro posto (la sua aria, la sua luce, quello che c'è), e chi ci entra da una parte esce dall'altra. Quando esci tu, finisce.\n\nEffetto passivo (Sempre): In un posto dove passi del tempo impari, poco a poco, distanze e spazi, fino a conoscerlo a fondo: sai dove muoverti senza guardare, e senti chi entra e chi esce. Vale per un posto grande fino a un'Area pari ai poteri che conosci in Corrispondenza (con 4 poteri, una città).",
    "attivo": "Scambi due spazi grandi al massimo quanto una stanza: quello in cui sei e uno in un posto dove sei già stato. Finché resti dentro, la stanza è quell'altro posto (la sua aria, la sua luce, quello che c'è), e chi ci entra da una parte esce dall'altra. Quando esci tu, finisce.",
    "passivo": "In un posto dove passi del tempo impari, poco a poco, distanze e spazi, fino a conoscerlo a fondo: sai dove muoverti senza guardare, e senti chi entra e chi esce. Vale per un posto grande fino a un'Area pari ai poteri che conosci in Corrispondenza (con 4 poteri, una città).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Ci vediamo da me.»",
    "cost": "3 Quintessenza",
    "costValue": 3,
    "uses": null,
    "paradox": "Volgare effetto attivo, nessuno effetto passivo.",
    "formula": "varcare",
    "formulaName": "Varcare",
    "link": "tavolo",
    "page": "Corrispondenza",
    "hooks": [
      "uso"
    ],
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
    "id": "finestra",
    "spheres": [
      "correspondence"
    ],
    "name": "Finestra",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Per la scena apri una finestra su un posto, come una videocamera: vedi e senti come se fossi lì. Il posto deve stare entro una Portata pari ai poteri che conosci in Corrispondenza (con 3 poteri lontano, con 5 nel continente, con 7 ovunque sia), e ci devi avere almeno un legame superficiale (ci sei passato, ne hai una foto, ci vive qualcuno che conosci etc..).\n\nEffetto passivo (Sempre): Quando una Magick o un potere soprannaturale ti cerca o ti guarda da lontano (una chiaroveggenza, una localizzazione, un occhio che ti segue etc..), deve superare una soglia pari ai poteri che conosci in Corrispondenza. Se la supera ti vede, ma tu senti che qualcuno ti guarda. Se non la supera decidi tu: gli neghi la visione, o la lasci andare avanti sapendolo.\nCon Mente: gli fai vedere quello che vuoi tu.",
    "attivo": "Per la scena apri una finestra su un posto, come una videocamera: vedi e senti come se fossi lì. Il posto deve stare entro una Portata pari ai poteri che conosci in Corrispondenza (con 3 poteri lontano, con 5 nel continente, con 7 ovunque sia), e ci devi avere almeno un legame superficiale (ci sei passato, ne hai una foto, ci vive qualcuno che conosci etc..).",
    "passivo": "Quando una Magick o un potere soprannaturale ti cerca o ti guarda da lontano (una chiaroveggenza, una localizzazione, un occhio che ti segue etc..), deve superare una soglia pari ai poteri che conosci in Corrispondenza. Se la supera ti vede, ma tu senti che qualcuno ti guarda. Se non la supera decidi tu: gli neghi la visione, o la lasci andare avanti sapendolo.\nCon Mente: gli fai vedere quello che vuoi tu.",
    "amalgama": "",
    "amalgam": "mind",
    "amalgams": [
      "mind"
    ],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Volgare effetto attivo se qualcuno guarda, basso rischio effetto passivo.",
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
    "costoAttivo": "1 Quintessenza",
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
    "id": "scatto",
    "spheres": [
      "correspondence",
      "spirit"
    ],
    "name": "Scatto",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza, più 1 a persona che porti): Ricompari dove vedi, anche lontano (in fondo alla strada, sul tetto di fronte, sull'altra sponda del fiume etc..), e porti con te chi tocchi: 1 Quintessenza in più a persona. Chi non vuole venire lo porti solo se lo tieni stretto, o se è legato.\n\nEffetto passivo (Una volta per scena): Fai un passo piccolo nello spazio, o nel Velo, ed esci poco più in là: al posto del tuo movimento sparisci e ricompari fino a Portata 2 (la stanza), in un punto che vedi, anche oltre un ostacolo (un bancone, una ringhiera, una porta a vetri etc..).",
    "attivo": "Ricompari dove vedi, anche lontano (in fondo alla strada, sul tetto di fronte, sull'altra sponda del fiume etc..), e porti con te chi tocchi: 1 Quintessenza in più a persona. Chi non vuole venire lo porti solo se lo tieni stretto, o se è legato.",
    "passivo": "Fai un passo piccolo nello spazio, o nel Velo, ed esci poco più in là: al posto del tuo movimento sparisci e ricompari fino a Portata 2 (la stanza), in un punto che vedi, anche oltre un ostacolo (un bancone, una ringhiera, una porta a vetri etc..).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza, più 1 a persona che porti",
    "costValue": 0,
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
    "costoAttivo": "1 Quintessenza, più 1 a persona che porti",
    "cadenzaPassivo": "Una volta per scena",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "adunata",
    "spheres": [
      "correspondence"
    ],
    "name": "Adunata",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza a testa): Porti accanto a te i compagni che vuoi, con quello che hanno addosso, purché stiano entro una Portata pari ai poteri che conosci in Corrispondenza (con 4 poteri molto lontano, con 7 ovunque siano). Chi non vuole venire resta dov'è.\n\nEffetto passivo (Sempre): Le persone e le creature con cui hai almeno un legame superficiale sentono quando le chiami, dovunque siano: sanno che le cerchi e da che parte, e vengono coi loro mezzi, se vogliono.",
    "attivo": "Porti accanto a te i compagni che vuoi, con quello che hanno addosso, purché stiano entro una Portata pari ai poteri che conosci in Corrispondenza (con 4 poteri molto lontano, con 7 ovunque siano). Chi non vuole venire resta dov'è.",
    "passivo": "Le persone e le creature con cui hai almeno un legame superficiale sentono quando le chiami, dovunque siano: sanno che le cerchi e da che parte, e vengono coi loro mezzi, se vogliono.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza a testa",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio in tutte e due le forme; Volgare se qualcuno vede comparire i compagni.",
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
    "costoAttivo": "1 Quintessenza a testa",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
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
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Quando qualcosa si mette fra te e l'azione per cui ti sei preparato (una porta che si chiude, una guardia in più, la pioggia sulla miccia etc..), il caso lo toglie di mezzo, o almeno ti viene incontro: la porta si riapre, la guardia si gira, la miccia era asciutta. Il tiro dell'azione lo fai come sempre.\nCon Primordio: se ti sei preparato, nel lancio di Magick non puoi subire ostacoli (dadi tolti, soglia alzata, un contrasto etc..).\n\nEffetto passivo (Sempre): Quando ti prepari a un'azione (prendi la mira, studi la serratura, conti le guardie etc..), al tiro che la fa hai 2 dadi in più.",
    "attivo": "Quando qualcosa si mette fra te e l'azione per cui ti sei preparato (una porta che si chiude, una guardia in più, la pioggia sulla miccia etc..), il caso lo toglie di mezzo, o almeno ti viene incontro: la porta si riapre, la guardia si gira, la miccia era asciutta. Il tiro dell'azione lo fai come sempre.\nCon Primordio: se ti sei preparato, nel lancio di Magick non puoi subire ostacoli (dadi tolti, soglia alzata, un contrasto etc..).",
    "passivo": "Quando ti prepari a un'azione (prendi la mira, studi la serratura, conti le guardie etc..), al tiro che la fa hai 2 dadi in più.",
    "amalgama": "",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "",
    "flavor": "«L'avevo provato cento volte.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
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
        "on": "dice",
        "value": 2,
        "roll": "any",
        "nota": "Quando ti prepari a un'azione (prendi la mira, studi la serratura, conti le guardie etc..), al tiro che la fa hai 2 dadi in più"
      },
      {
        "mode": "attivo",
        "on": "nota",
        "roll": "magick",
        "requires": "prime",
        "nota": "se ti sei preparato, nel lancio di Magick non puoi subire ostacoli"
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
    "id": "malocchio",
    "spheres": [
      "entropy"
    ],
    "name": "Malocchio",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (3 Quintessenza): Maledici chi vedi: gli infliggi una Condizione a tua scelta (Sfortunato, Muto, Rotto etc..), e non passa da sola. Resta finché non fa la cosa che hai scelto per scioglierla (chiederti scusa, restituire quello che ha preso, mantenere un giuramento etc..), o finché non la sciogli tu. La cosa la dici al Narratore, e deve essere plausibile: una cosa che può fare davvero. Se la sua soglia (fisica, mentale o sociale, secondo la Condizione) è più alta dei poteri che conosci in Entropia, paghi 1 Quintessenza in più per ogni punto di differenza.\n\nEffetto passivo (Sempre): Quando qualcuno ti infligge una Condizione (una maledizione, una paura, un veleno etc..), la prende anche lui, se la sua soglia (fisica, mentale o sociale, secondo la Condizione) è pari o più bassa dei poteri che conosci in Entropia.",
    "attivo": "Maledici chi vedi: gli infliggi una Condizione a tua scelta (Sfortunato, Muto, Rotto etc..), e non passa da sola. Resta finché non fa la cosa che hai scelto per scioglierla (chiederti scusa, restituire quello che ha preso, mantenere un giuramento etc..), o finché non la sciogli tu. La cosa la dici al Narratore, e deve essere plausibile: una cosa che può fare davvero. Se la sua soglia (fisica, mentale o sociale, secondo la Condizione) è più alta dei poteri che conosci in Entropia, paghi 1 Quintessenza in più per ogni punto di differenza.",
    "passivo": "Quando qualcuno ti infligge una Condizione (una maledizione, una paura, un veleno etc..), la prende anche lui, se la sua soglia (fisica, mentale o sociale, secondo la Condizione) è pari o più bassa dei poteri che conosci in Entropia.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "3 Quintessenza",
    "costValue": 3,
    "uses": null,
    "paradox": "Basso rischio in tutte e due le forme.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Entropia",
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
    "id": "era-scritto",
    "spheres": [
      "entropy"
    ],
    "name": "Era scritto",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (da 1 a 7 Quintessenza): Scegli una cosa che deve succedere entro la sessione (un incontro, una lettera che arriva, un crollo etc..). Il Narratore ti dice quanto pesa sulla trama e sull'ambientazione, da 1 a 7 come un Ambito: se paghi tanta Quintessenza, succede.\n\nEffetto passivo (Sempre): Senti i nodi del destino: le cose che devono succedere, e che nessuno può togliere. Quando ne incontri uno (una persona, un luogo, un evento etc..), il Narratore te lo dice.",
    "attivo": "Scegli una cosa che deve succedere entro la sessione (un incontro, una lettera che arriva, un crollo etc..). Il Narratore ti dice quanto pesa sulla trama e sull'ambientazione, da 1 a 7 come un Ambito: se paghi tanta Quintessenza, succede.",
    "passivo": "Senti i nodi del destino: le cose che devono succedere, e che nessuno può togliere. Quando ne incontri uno (una persona, un luogo, un evento etc..), il Narratore te lo dice.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "da 1 a 7 Quintessenza",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Entropia",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 4
      }
    ],
    "rifatto": true,
    "costoAttivo": "da 1 a 7 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 7
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
      "forces",
      "entropy"
    ],
    "name": "Colpo decisivo",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Quintessenza pari alla distanza dalla sua soglia fisica, almeno 1): Dichiari il colpo prima di colpire, e paghi tanta Quintessenza quanta è la distanza fra la sua soglia fisica e i poteri che conosci in Forza o in Entropia, almeno 1. Il colpo va a segno da solo: non si schiva e non si para. Conta solo la sua armatura, se ce l'ha.\n\nEffetto passivo (Sempre): Le tue Specialità di Mira e di Mischia valgono doppio: nei tiri in cui contano, ti danno il doppio dei dadi.",
    "attivo": "Dichiari il colpo prima di colpire, e paghi tanta Quintessenza quanta è la distanza fra la sua soglia fisica e i poteri che conosci in Forza o in Entropia, almeno 1. Il colpo va a segno da solo: non si schiva e non si para. Conta solo la sua armatura, se ce l'ha.",
    "passivo": "Le tue Specialità di Mira e di Mischia valgono doppio: nei tiri in cui contano, ti danno il doppio dei dadi.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Finisce qui.»",
    "cost": "Quintessenza pari alla distanza dalla sua soglia fisica, almeno 1",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
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
    "prerequisiti": [
      {
        "numero": 4
      }
    ],
    "rifatto": true,
    "costoAttivo": "Quintessenza pari alla distanza dalla sua soglia fisica, almeno 1",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
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
    "id": "carica",
    "spheres": [
      "forces"
    ],
    "name": "Carica",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza, più 1 a gradino): Il colpo va tirato come sempre, e se va a segno paghi: lo scagli lontano, fino a Portata 2 (l'altro capo della stanza), e per ogni Quintessenza in più un gradino di Portata in più (un tiro di pistola, la strada). Se sbatte contro un muro, un'auto o una colonna prende tanti danni in più quanti sono i poteri che conosci in Forza; se finisce addosso a qualcuno, li prende anche lui.\n\nEffetto passivo (Sempre): Quando ti muovi e colpisci nello stesso turno, chi colpisci finisce Atterrato (1 dado in meno nei tiri fisici, finché non si rialza). E travolgi chi ti sta sulla strada: finiscono Atterrati anche loro.",
    "attivo": "Il colpo va tirato come sempre, e se va a segno paghi: lo scagli lontano, fino a Portata 2 (l'altro capo della stanza), e per ogni Quintessenza in più un gradino di Portata in più (un tiro di pistola, la strada). Se sbatte contro un muro, un'auto o una colonna prende tanti danni in più quanti sono i poteri che conosci in Forza; se finisce addosso a qualcuno, li prende anche lui.",
    "passivo": "Quando ti muovi e colpisci nello stesso turno, chi colpisci finisce Atterrato (1 dado in meno nei tiri fisici, finché non si rialza). E travolgi chi ti sta sulla strada: finiscono Atterrati anche loro.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza, più 1 a gradino",
    "costValue": 0,
    "uses": null,
    "paradox": "Volgare effetto attivo, nessuno effetto passivo.",
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
    "costoAttivo": "1 Quintessenza, più 1 a gradino",
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
    "id": "a-grandi-balzi",
    "spheres": [
      "forces"
    ],
    "name": "A grandi balzi",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Quintessenza pari alla Portata): Copri una grande distanza in pochi minuti, di corsa e a balzi. Paghi tanta Quintessenza quanto il livello di Portata, nella lettura narrativa: 2 nei dintorni (in fondo al quartiere), 3 lontano (l'altra parte della città), 4 molto lontano (il paese vicino) etc..\n\nEffetto passivo (Sempre): Ti muovi come se il peso contasse poco: salti lunghi, scatti larghi, ti stacchi appena da terra (levitare di poco, non volare). Nei tiri fisici di movimento (correre, saltare, arrampicarti, schivare etc..) hai tanti dadi in più quanti sono i poteri che conosci in Forza.",
    "attivo": "Copri una grande distanza in pochi minuti, di corsa e a balzi. Paghi tanta Quintessenza quanto il livello di Portata, nella lettura narrativa: 2 nei dintorni (in fondo al quartiere), 3 lontano (l'altra parte della città), 4 molto lontano (il paese vicino) etc..",
    "passivo": "Ti muovi come se il peso contasse poco: salti lunghi, scatti larghi, ti stacchi appena da terra (levitare di poco, non volare). Nei tiri fisici di movimento (correre, saltare, arrampicarti, schivare etc..) hai tanti dadi in più quanti sono i poteri che conosci in Forza.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "Quintessenza pari alla Portata",
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
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "Quintessenza pari alla Portata",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
  },
  {
    "id": "come-una-foglia",
    "spheres": [
      "forces"
    ],
    "name": "Come una foglia",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Con la tua reazione (ne hai una per turno) annulli i danni di un urto che stai per prendere (un pugno, una caduta, un'auto che ti investe etc..). Vale solo per l'urto: elettricità, fuoco e simili passano.\n\nEffetto passivo (Sempre): Riduci i danni d'urto (un pugno, una caduta, un'auto che ti investe etc..) di tanti punti quanti sono i poteri che conosci in Forza.",
    "attivo": "Con la tua reazione (ne hai una per turno) annulli i danni di un urto che stai per prendere (un pugno, una caduta, un'auto che ti investe etc..). Vale solo per l'urto: elettricità, fuoco e simili passano.",
    "passivo": "Riduci i danni d'urto (un pugno, una caduta, un'auto che ti investe etc..) di tanti punti quanti sono i poteri che conosci in Forza.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Volgare effetto attivo, nessuno effetto passivo.",
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
    "text": "Effetto attivo (Azione, una volta per sessione): Crei zone di buio nella stanza in cui sei (un angolo, una porta, metà della sala, tutta la stanza), e restano fino a fine scena. Chi sta dentro è come Cieco: non vede, i tiri che passano dagli occhi (mirare, cercare, leggere, riconoscere) falliscono, e si muove toccando o guidato. Non è una Condizione che gli infliggi: finisce appena esce dal buio. Oppure, con la luce, abbagli chi vuoi fra quelli che vedi: è Abbagliato fino a fine scena.\n\nEffetto passivo (Sempre): Muovi come vuoi la luce e le ombre della stanza in cui sei: illumini quello che vuoi far vedere e metti in ombra quello che vuoi nascondere (un volto, un'uscita, un'arma etc..). Quando le ombre ti aiutano in un tiro (il volto in ombra mentre minacci, la luce bassa dove stai per farti notare di meno etc..), il Narratore può darti un vantaggio, di solito 2 dadi in più.",
    "attivo": "Crei zone di buio nella stanza in cui sei (un angolo, una porta, metà della sala, tutta la stanza), e restano fino a fine scena. Chi sta dentro è come Cieco: non vede, i tiri che passano dagli occhi (mirare, cercare, leggere, riconoscere) falliscono, e si muove toccando o guidato. Non è una Condizione che gli infliggi: finisce appena esce dal buio. Oppure, con la luce, abbagli chi vuoi fra quelli che vedi: è Abbagliato fino a fine scena.",
    "passivo": "Muovi come vuoi la luce e le ombre della stanza in cui sei: illumini quello che vuoi far vedere e metti in ombra quello che vuoi nascondere (un volto, un'uscita, un'arma etc..). Quando le ombre ti aiutano in un tiro (il volto in ombra mentre minacci, la luce bassa dove stai per farti notare di meno etc..), il Narratore può darti un vantaggio, di solito 2 dadi in più.",
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
    "id": "suoni-e-silenzi",
    "spheres": [
      "forces"
    ],
    "name": "Suoni e silenzi",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Per la scena manipoli il suono e ottieni quello che vuoi (un silenzio che non lascia uscire niente, una voce che non c'è, un rumore lontano etc..), e finché dura lo cambi: imiti voci, sposti rumori, spegni e riaccendi. Fin dove arrivi lo dicono i poteri che conosci in Forza: Area, Portata e Precisione fino a quel numero (con 3 poteri un quartiere, un tiro di pistola, una voce sola in mezzo alla folla).\n\nEffetto passivo (Sempre): Controlli sempre i suoni che fai: passi che non si sentono, la voce che arriva in fondo alla sala o solo all'orecchio di chi vuoi. Nei tiri dove conta (muoverti di nascosto con Criminalità, farti sentire da una folla, sussurrare a uno solo etc..) hai 2 dadi in più.",
    "attivo": "Per la scena manipoli il suono e ottieni quello che vuoi (un silenzio che non lascia uscire niente, una voce che non c'è, un rumore lontano etc..), e finché dura lo cambi: imiti voci, sposti rumori, spegni e riaccendi. Fin dove arrivi lo dicono i poteri che conosci in Forza: Area, Portata e Precisione fino a quel numero (con 3 poteri un quartiere, un tiro di pistola, una voce sola in mezzo alla folla).",
    "passivo": "Controlli sempre i suoni che fai: passi che non si sentono, la voce che arriva in fondo alla sala o solo all'orecchio di chi vuoi. Nei tiri dove conta (muoverti di nascosto con Criminalità, farti sentire da una folla, sussurrare a uno solo etc..) hai 2 dadi in più.",
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
    "id": "meteorologo",
    "spheres": [
      "forces"
    ],
    "name": "Meteorologo",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Quintessenza secondo l'Area): Decidi il tempo intorno a te, e come si svolge. Paghi Quintessenza pari al livello d'Area che copri.\n\nEffetto passivo (Sempre): Sai sempre come va il tempo. Una volta per scena lo cambi di un passo intorno a te, secondo quello che c'è: dal nuvolo alla pioggia, o a un po' di sole; dalla pioggia al nuvolo etc..",
    "attivo": "Decidi il tempo intorno a te, e come si svolge. Paghi Quintessenza pari al livello d'Area che copri.",
    "passivo": "Sai sempre come va il tempo. Una volta per scena lo cambi di un passo intorno a te, secondo quello che c'è: dal nuvolo alla pioggia, o a un po' di sole; dalla pioggia al nuvolo etc..",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "Quintessenza secondo l'Area",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo (Volgare se il tempo è impossibile per la stagione, come la neve d'estate), basso rischio effetto passivo.",
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
    "costoAttivo": "Quintessenza secondo l'Area",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
  },
  {
    "id": "amico-della-gravita",
    "spheres": [
      "forces"
    ],
    "name": "Amico della gravità",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza per livello d'Area o di Bersagli): Decidi tu la gravità in un'area, o su dei bersagli, e tutto si comporta di conseguenza. Paghi 1 Quintessenza per ogni livello d'Area, o di Bersagli.\n\nEffetto passivo (Sempre): La gravità su di te vale solo se vuoi, e decidi tu verso dove tira: così cammini e ti muovi dove di solito non potresti (una parete, un soffitto etc..). Non la rallenti, ne cambi il verso: a seconda di come la usi, puoi andare molto veloce.",
    "attivo": "Decidi tu la gravità in un'area, o su dei bersagli, e tutto si comporta di conseguenza. Paghi 1 Quintessenza per ogni livello d'Area, o di Bersagli.",
    "passivo": "La gravità su di te vale solo se vuoi, e decidi tu verso dove tira: così cammini e ti muovi dove di solito non potresti (una parete, un soffitto etc..). Non la rallenti, ne cambi il verso: a seconda di come la usi, puoi andare molto veloce.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza per livello d'Area o di Bersagli",
    "costValue": 0,
    "uses": null,
    "paradox": "Volgare effetto attivo, Volgare effetto passivo se qualcuno guarda.",
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
    "costoAttivo": "1 Quintessenza per livello d'Area o di Bersagli",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
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
    "id": "dentro-la-macchina",
    "spheres": [
      "matter"
    ],
    "name": "Dentro la macchina",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Finché tocchi un oggetto che contiene qualcosa (un libro, un fascicolo, un registro, una cassaforte etc..) ne sfogli il contenuto, come se lo leggessi in fretta, anche se è chiuso. Se lo lasci, quello che non ti sei segnato lo perdi. Con 1 Quintessenza in più lo leggi da cima a fondo, anche quello che è cifrato o nascosto. Un contenuto chiuso dalla Magick lo apri solo se la sua soglia non è più alta dei poteri che conosci in Materia.\nCon Forza: anche i congegni (un telefono, un computer, un'auto etc..): file, messaggi, l'ultima chiamata, l'ultima strada fatta, anche dietro una password.\n\nEffetto passivo (Sempre): Toccando un oggetto sai cos'è e a cosa serve, e se è chiuso o protetto: una serratura, un codice, un sigillo di Magick.",
    "attivo": "Finché tocchi un oggetto che contiene qualcosa (un libro, un fascicolo, un registro, una cassaforte etc..) ne sfogli il contenuto, come se lo leggessi in fretta, anche se è chiuso. Se lo lasci, quello che non ti sei segnato lo perdi. Con 1 Quintessenza in più lo leggi da cima a fondo, anche quello che è cifrato o nascosto. Un contenuto chiuso dalla Magick lo apri solo se la sua soglia non è più alta dei poteri che conosci in Materia.\nCon Forza: anche i congegni (un telefono, un computer, un'auto etc..): file, messaggi, l'ultima chiamata, l'ultima strada fatta, anche dietro una password.",
    "passivo": "Toccando un oggetto sai cos'è e a cosa serve, e se è chiuso o protetto: una serratura, un codice, un sigillo di Magick.",
    "amalgama": "",
    "amalgam": "forces",
    "amalgams": [
      "forces"
    ],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
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
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (da 1 a 3 Quintessenza): Dai la carica: i compagni in scena, alla loro prossima azione, hanno 1 dado in più per ogni Quintessenza che paghi. Se non agiscono entro la fine della scena, il bonus si perde.\n\nEffetto passivo (Sempre): Finché i compagni sono in scena con te, ogni volta che prendono danni mentali ne prendono 1 in meno.",
    "attivo": "Dai la carica: i compagni in scena, alla loro prossima azione, hanno 1 dado in più per ogni Quintessenza che paghi. Se non agiscono entro la fine della scena, il bonus si perde.",
    "passivo": "Finché i compagni sono in scena con te, ogni volta che prendono danni mentali ne prendono 1 in meno.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Forza, ragazzi.»",
    "cost": "da 1 a 3 Quintessenza",
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
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza per Volontà): Spendi Quintessenza al posto della Volontà, tua o di un compagno entro Portata 1, 1 per 1.\n\nEffetto passivo (Sempre): Quando un compagno entro Portata 1 da te spende Volontà, puoi spenderla tu al posto suo.",
    "attivo": "Spendi Quintessenza al posto della Volontà, tua o di un compagno entro Portata 1, 1 per 1.",
    "passivo": "Quando un compagno entro Portata 1 da te spende Volontà, puoi spenderla tu al posto suo.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Dai, riprova. Ci penso io.»",
    "cost": "1 Quintessenza per Volontà",
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
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza per Volontà",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "chiodo-fisso",
    "spheres": [
      "mind"
    ],
    "name": "Chiodo fisso",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Ignori una Condizione mentale (si aggiornerà a catena col rifacimento delle Condizioni) finché il Desiderio in più non è soddisfatto.\n\nEffetto passivo (A sessione nuova): A inizio sessione scegli un Desiderio in più e lo dichiari al Narratore: vale per recuperare Volontà, ma non per perderla. Se a fine sessione non l'hai soddisfatto, prendi 1 danno mentale aggravato, che non guarisce fino alla sessione dopo.",
    "attivo": "Ignori una Condizione mentale (si aggiornerà a catena col rifacimento delle Condizioni) finché il Desiderio in più non è soddisfatto.",
    "passivo": "A inizio sessione scegli un Desiderio in più e lo dichiari al Narratore: vale per recuperare Volontà, ma non per perderla. Se a fine sessione non l'hai soddisfatto, prendi 1 danno mentale aggravato, che non guarisce fino alla sessione dopo.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Non mollo finché non ce l'ho.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
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
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "A sessione nuova",
    "costoVariabile": null
  },
  {
    "id": "come-da-piano",
    "spheres": [
      "mind"
    ],
    "name": "Come da piano",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Quando qualcosa ostacola il piano, il Narratore ti dice come superarlo: ci avevi già pensato, e il modo ce l'hai pronto.\n\nEffetto passivo (Sempre): Se il gruppo accetta un piano che hai spiegato prima della scena, e lo segue, per quella scena ognuno ha 2 dadi in più nei tiri di Abilità.\nCon Primordio: quando un compagno lancia seguendo il piano, o le indicazioni che gli hai dato (il gesto, lo Strumento, le parole), prende il premio dell'Areté.",
    "attivo": "Quando qualcosa ostacola il piano, il Narratore ti dice come superarlo: ci avevi già pensato, e il modo ce l'hai pronto.",
    "passivo": "Se il gruppo accetta un piano che hai spiegato prima della scena, e lo segue, per quella scena ognuno ha 2 dadi in più nei tiri di Abilità.\nCon Primordio: quando un compagno lancia seguendo il piano, o le indicazioni che gli hai dato (il gesto, lo Strumento, le parole), prende il premio dell'Areté.",
    "amalgama": "",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "",
    "flavor": "«Tutto come previsto.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo; con Primordio segue il lancio.",
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
        "nota": "per quella scena ognuno ha 2 dadi in più nei tiri di Abilità"
      }
    ],
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
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Quando vinci una contesa sociale, l'avversario prende il doppio del danno sociale.\n\nEffetto passivo (Sempre): Nelle contese sociali tiri dopo l'avversario, sapendo il suo risultato, e puoi ritirarti senza perdere.",
    "attivo": "Quando vinci una contesa sociale, l'avversario prende il doppio del danno sociale.",
    "passivo": "Nelle contese sociali tiri dopo l'avversario, sapendo il suo risultato, e puoi ritirarti senza perdere.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Stai bluffando.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
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
    "id": "alle-strette",
    "spheres": [
      "mind"
    ],
    "name": "Alle strette",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): In un tiro mentale contro un nemico vinci in automatico, se la sua soglia è pari o più bassa dei poteri che conosci in Mente.\n\nEffetto passivo (Sempre): Percepisci quanto vale la soglia di un nemico nei tiri mentali, e le difese o le resistenze che ci ha.",
    "attivo": "In un tiro mentale contro un nemico vinci in automatico, se la sua soglia è pari o più bassa dei poteri che conosci in Mente.",
    "passivo": "Percepisci quanto vale la soglia di un nemico nei tiri mentali, e le difese o le resistenze che ci ha.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Adesso dimmi la verità.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
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
    "prerequisiti": [
      {
        "numero": 3
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
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
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Quando qualcuno sta per tirare, gli fai perdere il tiro, se i poteri che conosci in Mente sono più della sua soglia sociale o mentale.\n\nEffetto passivo (Sempre): Disturbi di continuo quello che hai intorno, con gesti, parole o come scegli tu, e la confusione distrae gli altri: chi ti sta intorno ha 1 dado in meno nei tiri che chiedono attenzione.",
    "attivo": "Quando qualcuno sta per tirare, gli fai perdere il tiro, se i poteri che conosci in Mente sono più della sua soglia sociale o mentale.",
    "passivo": "Disturbi di continuo quello che hai intorno, con gesti, parole o come scegli tu, e la confusione distrae gli altri: chi ti sta intorno ha 1 dado in meno nei tiri che chiedono attenzione.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Ehi, guarda là!»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
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
        "nota": "Quando qualcuno sta per tirare, gli fai perdere il tiro, se i poteri che conosci in Mente sono più della sua soglia sociale o mentale"
      }
    ],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 3
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "parole-che-pesano",
    "spheres": [
      "mind"
    ],
    "name": "Parole che pesano",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (da 1 a 3 Quintessenza): Quando lanci un effetto di Magick, gli aggiungi una Condizione mentale che abbia senso con l'effetto (si aggiornerà a catena col rifacimento delle Condizioni). Quanto paghi lo dice il Narratore, secondo la Condizione.\n\nEffetto passivo (Sempre): Un tuo tiro sociale riuscito, senza Magick, può infliggere una Condizione mentale con un grado in più (si aggiornerà a catena col rifacimento delle Condizioni).",
    "attivo": "Quando lanci un effetto di Magick, gli aggiungi una Condizione mentale che abbia senso con l'effetto (si aggiornerà a catena col rifacimento delle Condizioni). Quanto paghi lo dice il Narratore, secondo la Condizione.",
    "passivo": "Un tuo tiro sociale riuscito, senza Magick, può infliggere una Condizione mentale con un grado in più (si aggiornerà a catena col rifacimento delle Condizioni).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Le parole fanno male.»",
    "cost": "da 1 a 3 Quintessenza",
    "costValue": 0,
    "uses": null,
    "paradox": "Segue il lancio effetto attivo, nessuno effetto passivo.",
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
        "nota": "Un tuo tiro sociale riuscito, senza Magick, può infliggere una Condizione mentale con un grado in più"
      }
    ],
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
    "id": "goccia-a-goccia",
    "spheres": [
      "mind"
    ],
    "name": "Goccia a goccia",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (da 1 a 3 Quintessenza): In un tiro sociale hai 1 dado in più per ogni Quintessenza che paghi.\n\nEffetto passivo (Sempre): Ogni scena in cui parli con una persona senza farle danni, perché non sta perdendo un conflitto con te, ti dà 1 dado in più nei tiri sociali verso di lei e verso chi c'era. I dadi si sommano scena dopo scena.",
    "attivo": "In un tiro sociale hai 1 dado in più per ogni Quintessenza che paghi.",
    "passivo": "Ogni scena in cui parli con una persona senza farle danni, perché non sta perdendo un conflitto con te, ti dà 1 dado in più nei tiri sociali verso di lei e verso chi c'era. I dadi si sommano scena dopo scena.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Piano piano, ti convinco.»",
    "cost": "da 1 a 3 Quintessenza",
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
        "nota": "ti dà 1 dado in più nei tiri sociali verso di lei e verso chi c'era"
      },
      {
        "mode": "attivo",
        "on": "nota",
        "roll": "abilita",
        "nota": "In un tiro sociale hai 1 dado in più per ogni Quintessenza che paghi"
      }
    ],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 4
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
    "id": "il-mio-disastro",
    "spheres": [
      "prime"
    ],
    "name": "Il mio disastro",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Il Paradosso in più che prendi): Peggiori lo scoppio prendendo Paradosso in più, e in cambio scegli tu, dal menù del Paradosso, come va.\n\nEffetto passivo (Sempre): Quando il Paradosso ti scoppia, puoi chiedere al Narratore di raccontarlo tu: decidi cosa ti succede, o almeno proponi quello che puoi subire.",
    "attivo": "Peggiori lo scoppio prendendo Paradosso in più, e in cambio scegli tu, dal menù del Paradosso, come va.",
    "passivo": "Quando il Paradosso ti scoppia, puoi chiedere al Narratore di raccontarlo tu: decidi cosa ti succede, o almeno proponi quello che puoi subire.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Almeno il disastro lo scelgo io.»",
    "cost": "Il Paradosso in più che prendi",
    "costValue": 0,
    "uses": null,
    "paradox": "Lavora sul Paradosso, non ne fa di suo; nell'attivo il Paradosso in più è il prezzo.",
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
        "on": "nota",
        "roll": "magick",
        "nota": "Quando il Paradosso ti scoppia, puoi chiedere al Narratore di raccontarlo tu"
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "Il Paradosso in più che prendi",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "niente-di-perso",
    "spheres": [
      "prime"
    ],
    "name": "Niente di perso",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza in più, una volta per scena): Quando paghi un lancio in Quintessenza, puoi pagarne 1 in più: se il lancio va male, ti torna tutta la Quintessenza che hai speso, come se non l'avessi mai usata.\n\nEffetto passivo (Sempre): Quando lanci con l'Armonia dei compagni, o dai la tua Armonia a un compagno, e il lancio fallisce, i dadi non vanno persi: i compagni li hanno per il loro prossimo lancio di Magick.",
    "attivo": "Quando paghi un lancio in Quintessenza, puoi pagarne 1 in più: se il lancio va male, ti torna tutta la Quintessenza che hai speso, come se non l'avessi mai usata.",
    "passivo": "Quando lanci con l'Armonia dei compagni, o dai la tua Armonia a un compagno, e il lancio fallisce, i dadi non vanno persi: i compagni li hanno per il loro prossimo lancio di Magick.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Non l'avete sprecata.»",
    "cost": "1 Quintessenza in più, una volta per scena",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
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
    "rifatto": true,
    "costoAttivo": "1 Quintessenza in più, una volta per scena",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "pulito",
    "spheres": [
      "prime"
    ],
    "name": "Pulito",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza per Paradosso): Ti togli Paradosso: 1 punto per ogni Quintessenza che spendi.\n\nEffetto passivo (A sessione nuova): Se chiudi la sessione senza Paradosso, la sessione dopo cominci con 5 Quintessenza.",
    "attivo": "Ti togli Paradosso: 1 punto per ogni Quintessenza che spendi.",
    "passivo": "Se chiudi la sessione senza Paradosso, la sessione dopo cominci con 5 Quintessenza.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Neanche una macchia.»",
    "cost": "1 Quintessenza per Paradosso",
    "costValue": 0,
    "uses": null,
    "paradox": "Lavora sul Paradosso, non ne fa di suo.",
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
    "rifatto": true,
    "costoAttivo": "1 Quintessenza per Paradosso",
    "cadenzaPassivo": "A sessione nuova",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "risarcimento",
    "spheres": [
      "prime"
    ],
    "name": "Risarcimento",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza per punto): Quando il Narratore spende punti Paradosso contro di te, ogni Quintessenza che paghi gliene annulla uno: la sua mossa gli costa di più.\n\nEffetto passivo (Sempre): Quando il Narratore spende contro di te più di 5 punti Paradosso in una volta, prendi 1 Quintessenza.",
    "attivo": "Quando il Narratore spende punti Paradosso contro di te, ogni Quintessenza che paghi gliene annulla uno: la sua mossa gli costa di più.",
    "passivo": "Quando il Narratore spende contro di te più di 5 punti Paradosso in una volta, prendi 1 Quintessenza.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Almeno pagami.»",
    "cost": "1 Quintessenza per punto",
    "costValue": 0,
    "uses": null,
    "paradox": "Lavora sul Paradosso, non ne fa di suo.",
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
    "rifatto": true,
    "costoAttivo": "1 Quintessenza per punto",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
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
    "text": "Effetto attivo (Il costo del potere, una volta per scena): Paghi tu il costo del potere di un compagno.\n\nEffetto passivo (Sempre): Puoi passare la tua Quintessenza a un compagno.",
    "attivo": "Paghi tu il costo del potere di un compagno.",
    "passivo": "Puoi passare la tua Quintessenza a un compagno.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Tieni, ti serve più che a me.»",
    "cost": "Il costo del potere, una volta per scena",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
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
    "rifatto": true,
    "costoAttivo": "Il costo del potere, una volta per scena",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "anche-a-mani-nude",
    "spheres": [
      "prime"
    ],
    "name": "Anche a mani nude",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Un tuo colpo senza armi fa solo danni aggravati.\n\nEffetto passivo (Sempre): Finché hai almeno 3 Quintessenza, i tuoi colpi senza armi fanno danni pari ai poteri che conosci in Primordio.",
    "attivo": "Un tuo colpo senza armi fa solo danni aggravati.",
    "passivo": "Finché hai almeno 3 Quintessenza, i tuoi colpi senza armi fanno danni pari ai poteri che conosci in Primordio.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«La Quintessenza non serve solo alla Magick.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Volgare effetto attivo, nessuno effetto passivo.",
    "formula": "potenziare",
    "formulaName": "Potenziare",
    "link": "regola",
    "page": "Primordio",
    "hooks": [
      "tiro",
      "quintessenza"
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
    "id": "bussola-comune",
    "spheres": [
      "prime",
      "mind"
    ],
    "name": "Bussola comune",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Una volta per sessione): Scegli una Convinzione, tua o di un compagno: per la scena l'avete tutti e due, nel bene e nel male, e rispettarla vi dà dadi e Quintessenza come sempre. Più di tre Convinzioni non se ne hanno: chi ne ha già tre condivide una delle sue.\n\nEffetto passivo (Sempre): Quando un compagno rispetta una sua Convinzione, ne condividi il bonus di dadi e prendi anche tu 1 Quintessenza. Quando ne rispetti una tu, vale lo stesso per lui.",
    "attivo": "Scegli una Convinzione, tua o di un compagno: per la scena l'avete tutti e due, nel bene e nel male, e rispettarla vi dà dadi e Quintessenza come sempre. Più di tre Convinzioni non se ne hanno: chi ne ha già tre condivide una delle sue.",
    "passivo": "Quando un compagno rispetta una sua Convinzione, ne condividi il bonus di dadi e prendi anche tu 1 Quintessenza. Quando ne rispetti una tu, vale lo stesso per lui.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Andiamo nella stessa direzione.»",
    "cost": "Una volta per sessione",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
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
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "Una volta per sessione",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "cambiavalute",
    "spheres": [
      "prime"
    ],
    "name": "Cambiavalute",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Il Sacrificio, una volta per sessione): Il danno aggravato che dai col Sacrificio non è paradossale: non resta bloccato.\n\nEffetto passivo (Sempre): Col Sacrificio, un danno aggravato ti dà 4 Quintessenza invece di 3.",
    "attivo": "Il danno aggravato che dai col Sacrificio non è paradossale: non resta bloccato.",
    "passivo": "Col Sacrificio, un danno aggravato ti dà 4 Quintessenza invece di 3.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Tutto ha il suo cambio.»",
    "cost": "Il Sacrificio, una volta per sessione",
    "costValue": 0,
    "uses": {
      "per": "sessione",
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
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "Il Sacrificio, una volta per sessione",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "coro",
    "spheres": [
      "prime"
    ],
    "name": "Coro",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Quando dai la tua Armonia a un compagno, conti come una persona in più.\n\nEffetto passivo (Sempre): Quando i compagni ti danno l'Armonia, hai 1 dado in più per ognuno di loro, dentro il tetto di 3.",
    "attivo": "Quando dai la tua Armonia a un compagno, conti come una persona in più.",
    "passivo": "Quando i compagni ti danno l'Armonia, hai 1 dado in più per ognuno di loro, dentro il tetto di 3.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Tutti insieme.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Segue il lancio in tutte e due le forme.",
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
        "nota": "Quando i compagni ti danno l'Armonia, hai 1 dado in più per ognuno di loro, dentro il tetto di 3"
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
    "id": "pila",
    "spheres": [
      "prime"
    ],
    "name": "Pila",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (La Quintessenza della pila): Paghi un costo in Quintessenza con quella della pila, invece che con la tua riserva.\n\nEffetto passivo (Sempre): Hai una scorta di Quintessenza in un oggetto (una batteria, una pietra, un anello etc..), che porti con te da una sessione all'altra: ci metti la tua Quintessenza, fino ai poteri che conosci in Primordio.",
    "attivo": "Paghi un costo in Quintessenza con quella della pila, invece che con la tua riserva.",
    "passivo": "Hai una scorta di Quintessenza in un oggetto (una batteria, una pietra, un anello etc..), che porti con te da una sessione all'altra: ci metti la tua Quintessenza, fino ai poteri che conosci in Primordio.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Tengo una scorta.»",
    "cost": "La Quintessenza della pila",
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
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "La Quintessenza della pila",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
  },
  {
    "id": "prendo-io",
    "spheres": [
      "prime"
    ],
    "name": "Prendo io",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (L'Ustione che prendi): Quando il Paradosso scoppia a un alleato o a un compagno, prendi tu l'Ustione al posto suo, e i danni non sono paradossali.\n\nEffetto passivo (Sempre): Sai sempre quando il Paradosso scoppia, e cosa sta per fare a chi l'ha fatto scoppiare: l'idea che ha il Narratore.",
    "attivo": "Quando il Paradosso scoppia a un alleato o a un compagno, prendi tu l'Ustione al posto suo, e i danni non sono paradossali.",
    "passivo": "Sai sempre quando il Paradosso scoppia, e cosa sta per fare a chi l'ha fatto scoppiare: l'idea che ha il Narratore.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Lascia, prendo io.»",
    "cost": "L'Ustione che prendi",
    "costValue": 0,
    "uses": null,
    "paradox": "Lavora sul Paradosso, non ne fa di suo.",
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
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "L'Ustione che prendi",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "tenuta",
    "spheres": [
      "prime",
      "mind"
    ],
    "name": "Tenuta",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Vinci in automatico il tiro per resistere e tenere un effetto che mantieni.\n\nEffetto passivo (Sempre): Quando un colpo, un trauma o una Condizione (si aggiornerà a catena col rifacimento delle Condizioni) ti farebbe perdere un effetto che mantieni, hai 2 dadi in più nel tiro per resistere e tenerlo.",
    "attivo": "Vinci in automatico il tiro per resistere e tenere un effetto che mantieni.",
    "passivo": "Quando un colpo, un trauma o una Condizione (si aggiornerà a catena col rifacimento delle Condizioni) ti farebbe perdere un effetto che mantieni, hai 2 dadi in più nel tiro per resistere e tenerlo.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Non mollo la presa.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Segue l'effetto mantenuto, in tutte e due le forme.",
    "formula": "fissare",
    "formulaName": "Fissare",
    "link": "regola",
    "page": "Primordio",
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
    "id": "a-credito",
    "spheres": [
      "prime"
    ],
    "name": "A credito",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Fino a 2 Quintessenza che non hai): Spendi Quintessenza che non hai, fino a 2. Se a fine sessione non l'hai ripagata, prendi danni aggravati paradossali pari a quella che manca.\n\nEffetto passivo (Sempre): Per te la Ruota della Quintessenza è più larga di 2: 2 caselle in più verso la Quintessenza, e 2 verso il Paradosso.",
    "attivo": "Spendi Quintessenza che non hai, fino a 2. Se a fine sessione non l'hai ripagata, prendi danni aggravati paradossali pari a quella che manca.",
    "passivo": "Per te la Ruota della Quintessenza è più larga di 2: 2 caselle in più verso la Quintessenza, e 2 verso il Paradosso.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Segna, pago dopo.»",
    "cost": "Fino a 2 Quintessenza che non hai",
    "costValue": 0,
    "uses": null,
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
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "Fino a 2 Quintessenza che non hai",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
  },
  {
    "id": "sifone",
    "spheres": [
      "prime"
    ],
    "name": "Sifone",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Paradosso per Quintessenza drenata): Quando dreni Quintessenza, ogni 2 che prendi ne hai 1 in più, e prendi 1 Paradosso per ogni Quintessenza che dreni.\n\nEffetto passivo (Sempre): Quando un nemico spende Quintessenza in tua vista, ne prendi 1. Ogni 2 che prendi così, prendi 1 Paradosso.",
    "attivo": "Quando dreni Quintessenza, ogni 2 che prendi ne hai 1 in più, e prendi 1 Paradosso per ogni Quintessenza che dreni.",
    "passivo": "Quando un nemico spende Quintessenza in tua vista, ne prendi 1. Ogni 2 che prendi così, prendi 1 Paradosso.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Quella la prendo io.»",
    "cost": "1 Paradosso per Quintessenza drenata",
    "costValue": 0,
    "uses": null,
    "paradox": "Il Paradosso è già il prezzo, in tutte e due le forme; non ne fanno altro di loro.",
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
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Paradosso per Quintessenza drenata",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
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
    "id": "forgia",
    "spheres": [
      "prime"
    ],
    "name": "Forgia",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Metà della Quintessenza della Meraviglia): Quando crei una Meraviglia (un oggetto che porta un tuo effetto di Magick), paghi metà della Quintessenza che costa, e hai 2 dadi in più.\n\nEffetto passivo (Sempre): I tuoi oggetti incantati si ricaricano da soli: 1 Quintessenza a ogni cambio scena.",
    "attivo": "Quando crei una Meraviglia (un oggetto che porta un tuo effetto di Magick), paghi metà della Quintessenza che costa, e hai 2 dadi in più.",
    "passivo": "I tuoi oggetti incantati si ricaricano da soli: 1 Quintessenza a ogni cambio scena.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "Metà della Quintessenza della Meraviglia",
    "costValue": 0,
    "uses": null,
    "paradox": "Segue il lancio effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Primordio",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 4
      }
    ],
    "rifatto": true,
    "costoAttivo": "Metà della Quintessenza della Meraviglia",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
  },
  {
    "id": "di-la-non-contano",
    "spheres": [
      "spirit"
    ],
    "name": "Di là non contano",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Quando lanci un effetto di qua verso il di là del Velo, hai 2 dadi in più.\n\nEffetto passivo (Sempre): Puoi lanciare effetti di qua verso il di là del Velo senza le penalità che il Velo dà di solito.",
    "attivo": "Quando lanci un effetto di qua verso il di là del Velo, hai 2 dadi in più.",
    "passivo": "Puoi lanciare effetti di qua verso il di là del Velo senza le penalità che il Velo dà di solito.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Di là nessuno ci fa caso.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Segue il lancio in tutte e due le forme.",
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
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "interprete",
    "spheres": [
      "spirit"
    ],
    "name": "Interprete",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Per la scena fai da interprete fra i compagni e uno spirito: nei tiri sociali con lui vale il più alto fra i vostri.\n\nEffetto passivo (Sempre): Capisci sempre la lingua degli spiriti.",
    "attivo": "Per la scena fai da interprete fra i compagni e uno spirito: nei tiri sociali con lui vale il più alto fra i vostri.",
    "passivo": "Capisci sempre la lingua degli spiriti.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Lascia parlare me.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
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
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "pellegrino",
    "spheres": [
      "spirit",
      "prime"
    ],
    "name": "Pellegrino",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Quintessenza secondo la risonanza): Prendi gli effetti della risonanza del luogo in cui sei, come se il luogo ti accogliesse. Paghi secondo il tipo di risonanza.\n\nEffetto passivo (Sempre): La prima volta che entri in un luogo sacro (una chiesa, un Nodo, una tomba etc..), prendi 1 Quintessenza.",
    "attivo": "Prendi gli effetti della risonanza del luogo in cui sei, come se il luogo ti accogliesse. Paghi secondo il tipo di risonanza.",
    "passivo": "La prima volta che entri in un luogo sacro (una chiesa, un Nodo, una tomba etc..), prendi 1 Quintessenza.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Ogni luogo sacro ha qualcosa da darti.»",
    "cost": "Quintessenza secondo la risonanza",
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
    "rifatto": true,
    "costoAttivo": "Quintessenza secondo la risonanza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
  },
  {
    "id": "reliquia",
    "spheres": [
      "spirit"
    ],
    "name": "Reliquia",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Togli la Condizione da cui la reliquia ti protegge (si aggiornerà a catena col rifacimento delle Condizioni).\n\nEffetto passivo (Sempre): Un oggetto che porti da almeno una sessione diventa una reliquia: finché lo porti, ti protegge da una Condizione che scegli tu (si aggiornerà a catena col rifacimento delle Condizioni). Se lo perdi, perdi 1 Volontà.",
    "attivo": "Togli la Condizione da cui la reliquia ti protegge (si aggiornerà a catena col rifacimento delle Condizioni).",
    "passivo": "Un oggetto che porti da almeno una sessione diventa una reliquia: finché lo porti, ti protegge da una Condizione che scegli tu (si aggiornerà a catena col rifacimento delle Condizioni). Se lo perdi, perdi 1 Volontà.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Me l'ha data mia nonna.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
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
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza per livello del favore): Chiedi un favore a uno spirito, e lo fa per te. Paghi 2 Quintessenza per ogni livello del favore che chiedi.\n\nEffetto passivo (Sempre): I tuoi Background valgono anche con gli spiriti: sanno che paghi, e sono ben disposti a farti favori.",
    "attivo": "Chiedi un favore a uno spirito, e lo fa per te. Paghi 2 Quintessenza per ogni livello del favore che chiedi.",
    "passivo": "I tuoi Background valgono anche con gli spiriti: sanno che paghi, e sono ben disposti a farti favori.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Me ne devi uno.»",
    "cost": "2 Quintessenza per livello del favore",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
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
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza per livello del favore",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 2,
      "max": 0
    }
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
    "id": "il-ritorno",
    "spheres": [
      "spirit"
    ],
    "name": "Il ritorno",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Una volta per cronaca): Quando muori, il tuo corpo non conta più (distrutto, dilaniato etc..): la tua anima prende forma fisica e continui ad agire. Entro la fine della scena scegli un corpo nuovo.\n\nEffetto passivo (Sempre): Quando sei staccato dal tuo corpo resti te stesso, e allora la tua Salute la possono ferire solo gli spiriti o gli effetti mentali. Persino nel sonno resti tutt'uno.",
    "attivo": "Quando muori, il tuo corpo non conta più (distrutto, dilaniato etc..): la tua anima prende forma fisica e continui ad agire. Entro la fine della scena scegli un corpo nuovo.",
    "passivo": "Quando sei staccato dal tuo corpo resti te stesso, e allora la tua Salute la possono ferire solo gli spiriti o gli effetti mentali. Persino nel sonno resti tutt'uno.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Mi avete dato per morto troppo presto.»",
    "cost": "Una volta per cronaca",
    "costValue": 0,
    "uses": {
      "per": "campagna",
      "n": 1
    },
    "paradox": "Volgare effetto attivo se qualcuno guarda, nessuno effetto passivo.",
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
    "prerequisiti": [
      {
        "numero": 4
      }
    ],
    "rifatto": true,
    "costoAttivo": "Una volta per cronaca",
    "cadenzaPassivo": "Sempre",
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
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Il patto): Chiedi qualcosa a un'entità, e te la dà subito: in cambio stringi un patto con lei.\n\nEffetto passivo (Sempre): Non puoi subire Pregi, Difetti o altro che ti darebbe un marchio, o un effetto simile.",
    "attivo": "Chiedi qualcosa a un'entità, e te la dà subito: in cambio stringi un patto con lei.",
    "passivo": "Non puoi subire Pregi, Difetti o altro che ti darebbe un marchio, o un effetto simile.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Firma qui.»",
    "cost": "Il patto",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo: il prezzo è il patto.",
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
    "prerequisiti": [
      {
        "numero": 4
      }
    ],
    "rifatto": true,
    "costoAttivo": "Il patto",
    "cadenzaPassivo": "Sempre",
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
    "id": "catene",
    "spheres": [
      "spirit",
      "mind",
      "entropy"
    ],
    "name": "Catene",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (3 Quintessenza): Se la soglia mentale di uno spirito con cui hai un patto è pari o più bassa dei poteri che conosci in Spirito, in Mente o in Entropia, non deve solo mantenere la parola: a seguito del patto obbedisce anche ai tuoi ordini più semplici.\n\nEffetto passivo (Sempre): Una promessa fra te e uno spirito lega tutti e due: lui la deve mantenere, come la devi mantenere tu.",
    "attivo": "Se la soglia mentale di uno spirito con cui hai un patto è pari o più bassa dei poteri che conosci in Spirito, in Mente o in Entropia, non deve solo mantenere la parola: a seguito del patto obbedisce anche ai tuoi ordini più semplici.",
    "passivo": "Una promessa fra te e uno spirito lega tutti e due: lui la deve mantenere, come la devi mantenere tu.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "3 Quintessenza",
    "costValue": 3,
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
        "numero": 3
      }
    ],
    "rifatto": true,
    "costoAttivo": "3 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "cavalcare",
    "spheres": [
      "spirit"
    ],
    "name": "Cavalcare",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Quintessenza pari alla soglia mentale dello spirito): Prendi tu il controllo di uno spirito che hai nel corpo: sei tu che cavalchi lui, e per la scena hai qualcuno dei suoi tratti o delle sue caratteristiche.\n\nEffetto passivo (Sempre): Nessuno ti possiede: chi prova a entrare nel tuo corpo o nella tua mente ha 2 dadi in meno oppure soglia +2.",
    "attivo": "Prendi tu il controllo di uno spirito che hai nel corpo: sei tu che cavalchi lui, e per la scena hai qualcuno dei suoi tratti o delle sue caratteristiche.",
    "passivo": "Nessuno ti possiede: chi prova a entrare nel tuo corpo o nella tua mente ha 2 dadi in meno oppure soglia +2.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "Quintessenza pari alla soglia mentale dello spirito",
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
        "numero": 3
      }
    ],
    "rifatto": true,
    "costoAttivo": "Quintessenza pari alla soglia mentale dello spirito",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
  },
  {
    "id": "il-prezzo-prima",
    "spheres": [
      "time"
    ],
    "name": "Il prezzo prima",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza per variante): Addolcisci il Prezzo: per ogni Quintessenza il Narratore te ne propone una variante, dello stesso peso, e scegli tu quale pagare.\n\nEffetto passivo (Sempre): Prima di tirare sai che tipo di Prezzo ti chiede il Narratore per vincere la prova; e quando una cosa è fuori portata, sai quale Prezzo ti manca per arrivarci.",
    "attivo": "Addolcisci il Prezzo: per ogni Quintessenza il Narratore te ne propone una variante, dello stesso peso, e scegli tu quale pagare.",
    "passivo": "Prima di tirare sai che tipo di Prezzo ti chiede il Narratore per vincere la prova; e quando una cosa è fuori portata, sai quale Prezzo ti manca per arrivarci.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Prima dimmi quanto costa.»",
    "cost": "1 Quintessenza per variante",
    "costValue": 0,
    "uses": null,
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
    "rifatto": true,
    "costoAttivo": "1 Quintessenza per variante",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "pronto-all-uso",
    "spheres": [
      "time",
      "matter"
    ],
    "name": "Pronto all'uso",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Nel turno fai un'azione in più per usare l'oggetto che hai a portata di mano. L'azione in più non può essere Magick.\n\nEffetto passivo (Sempre): Estrarre, ricaricare o cambiare arma non ti costa mai azioni. E l'oggetto che ti serve ce l'hai sempre a portata di mano, come se l'avessi preparato la scena prima, purché sia nel tuo inventario.",
    "attivo": "Nel turno fai un'azione in più per usare l'oggetto che hai a portata di mano. L'azione in più non può essere Magick.",
    "passivo": "Estrarre, ricaricare o cambiare arma non ti costa mai azioni. E l'oggetto che ti serve ce l'hai sempre a portata di mano, come se l'avessi preparato la scena prima, purché sia nel tuo inventario.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Sempre carica.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
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
    "rifatto": true,
    "costoAttivo": "2 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "puntuale",
    "spheres": [
      "time"
    ],
    "name": "Puntuale",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Scegli tu quando entri in scena e quando ne esci: compari o te ne vai quando vuoi, se puoi muoverti (non sei legato, bloccato, immobilizzato etc..). Oppure chi sta per arrivare in scena arriva due turni dopo.\n\nEffetto passivo (Sempre): Sai quando qualcuno arriverà in scena, o se non arriverà, purché abbia un legame con te, anche superficiale.",
    "attivo": "Scegli tu quando entri in scena e quando ne esci: compari o te ne vai quando vuoi, se puoi muoverti (non sei legato, bloccato, immobilizzato etc..). Oppure chi sta per arrivare in scena arriva due turni dopo.",
    "passivo": "Sai quando qualcuno arriverà in scena, o se non arriverà, purché abbia un legame con te, anche superficiale.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Arrivo sempre al momento giusto.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
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
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "quadrante",
    "spheres": [
      "time"
    ],
    "name": "Quadrante",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza per segmento): Fai avanzare o tornare indietro un orologio del Narratore, di un segmento per ogni Quintessenza che paghi.\n\nEffetto passivo (Sempre): Vedi sempre gli orologi del Narratore, anche quelli nascosti.",
    "attivo": "Fai avanzare o tornare indietro un orologio del Narratore, di un segmento per ogni Quintessenza che paghi.",
    "passivo": "Vedi sempre gli orologi del Narratore, anche quelli nascosti.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«So quanto manca.»",
    "cost": "1 Quintessenza per segmento",
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
    "rifatto": true,
    "costoAttivo": "1 Quintessenza per segmento",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "straordinari",
    "spheres": [
      "time"
    ],
    "name": "Straordinari",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Durante la sessione rifai la cosa in più del passivo, come se l'avessi fatta nel frattempo: il risultato ce l'hai adesso.\n\nEffetto passivo (A sessione nuova): Fra una sessione e l'altra fai una cosa in più, che si risolve dietro le quinte: tenere vivi i tuoi Background, usarli, oppure un'azione da concordare col Narratore.",
    "attivo": "Durante la sessione rifai la cosa in più del passivo, come se l'avessi fatta nel frattempo: il risultato ce l'hai adesso.",
    "passivo": "Fra una sessione e l'altra fai una cosa in più, che si risolve dietro le quinte: tenere vivi i tuoi Background, usarli, oppure un'azione da concordare col Narratore.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Stanotte non dormo.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
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
    "rifatto": true,
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "A sessione nuova",
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
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Agisci due volte di fila, e il turno dopo salti il tuo momento.\n\nEffetto passivo (Sempre): Chi prova a ritardare il tuo momento, o a usare altri effetti di Tempo sulle tue azioni, ha 2 dadi in meno oppure soglia +2.",
    "attivo": "Agisci due volte di fila, e il turno dopo salti il tuo momento.",
    "passivo": "Chi prova a ritardare il tuo momento, o a usare altri effetti di Tempo sulle tue azioni, ha 2 dadi in meno oppure soglia +2.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Il dopo lo spendo adesso.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
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
    "id": "allo-scadere",
    "spheres": [
      "time"
    ],
    "name": "Allo scadere",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Quando un orologio scatta, anche ognuno dei tuoi compagni ha l'azione del passivo.\n\nEffetto passivo (Sempre): Quando un orologio del Narratore scatta, hai subito un'azione per prepararti, anche di combattimento.",
    "attivo": "Quando un orologio scatta, anche ognuno dei tuoi compagni ha l'azione del passivo.",
    "passivo": "Quando un orologio del Narratore scatta, hai subito un'azione per prepararti, anche di combattimento.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Un secondo, ancora uno.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
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
    "id": "ci-penso-domani",
    "spheres": [
      "time"
    ],
    "name": "Ci penso domani",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Una volta per sessione): Una conseguenza (una ferita, un debito, un arresto) la paghi nella scena dopo. Se la rimandi alla sessione dopo, arriva più grave.\n\nEffetto passivo (Sempre): Quando una cosa che ti riguarda va chiusa entro la fine della scena o della sessione (saldare un debito etc..), la puoi chiudere nella scena dopo, o nella sessione dopo. Chiuderla devi comunque, e più in là non la rimandi, a meno di pagarne il doppio in Quintessenza, che raddoppia di nuovo a ogni rinvio.",
    "attivo": "Una conseguenza (una ferita, un debito, un arresto) la paghi nella scena dopo. Se la rimandi alla sessione dopo, arriva più grave.",
    "passivo": "Quando una cosa che ti riguarda va chiusa entro la fine della scena o della sessione (saldare un debito etc..), la puoi chiudere nella scena dopo, o nella sessione dopo. Chiuderla devi comunque, e più in là non la rimandi, a meno di pagarne il doppio in Quintessenza, che raddoppia di nuovo a ogni rinvio.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Adesso no, dopo.»",
    "cost": "Una volta per sessione",
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
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "Una volta per sessione",
    "cadenzaPassivo": "Sempre",
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
    "id": "montaggio-alternato",
    "spheres": [
      "time"
    ],
    "name": "Montaggio alternato",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Fra le scene che il Narratore ti propone, scegli tu quale si gioca per prima, anche se dovrebbe venire dopo.\n\nEffetto passivo (Sempre): Conosci l'ordine delle scene, e hai un vago sentore di quello che succede.",
    "attivo": "Fra le scene che il Narratore ti propone, scegli tu quale si gioca per prima, anche se dovrebbe venire dopo.",
    "passivo": "Conosci l'ordine delle scene, e hai un vago sentore di quello che succede.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Stacco. Intanto, dall'altra parte...»",
    "cost": "1 Quintessenza",
    "costValue": 1,
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
    "id": "primo-istante",
    "spheres": [
      "time"
    ],
    "name": "Primo istante",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza, o 5 per un turno in più): Decidi tu in che ordine agiscono gli altri, anche prima di te. Con 5 Quintessenza, invece, hai un turno in più.\n\nEffetto passivo (Sempre): Agisci sempre per primo nel turno, senza tirare iniziativa. Se altri hanno questo potere, agite insieme.",
    "attivo": "Decidi tu in che ordine agiscono gli altri, anche prima di te. Con 5 Quintessenza, invece, hai un turno in più.",
    "passivo": "Agisci sempre per primo nel turno, senza tirare iniziativa. Se altri hanno questo potere, agite insieme.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Prima di tutti, sempre.»",
    "cost": "2 Quintessenza, o 5 per un turno in più",
    "costValue": 0,
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
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza, o 5 per un turno in più",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 2,
      "max": 0
    }
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
    "kind": "attivo e passivo",
    "text": "Effetto attivo (I Passi che hai preparato): I Passi di Rituale che fai nel tuo Santuario li porti con te, e li spendi in un lancio fuori, entro la sessione.\n\nEffetto passivo (Sempre): Accumuli un Rituale senza che ti dia penalità.",
    "attivo": "I Passi di Rituale che fai nel tuo Santuario li porti con te, e li spendi in un lancio fuori, entro la sessione.",
    "passivo": "Accumuli un Rituale senza che ti dia penalità.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Il rito l'ho cominciato a casa.»",
    "cost": "I Passi che hai preparato",
    "costValue": 0,
    "uses": null,
    "paradox": "Segue il lancio in tutte e due le forme.",
    "formula": "fissare",
    "formulaName": "Fissare",
    "link": "regola",
    "page": "Tempo",
    "hooks": [
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "I Passi che hai preparato",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "salto",
    "spheres": [
      "time"
    ],
    "name": "Salto",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza per gradino di Portata): Dichiari finita la tua scena e passi subito in quella di un altro giocatore, senza l'aggancio fra l'una e l'altra. Oppure salti avanti nel tempo: sparisci dalla scena e ricompari in quella dopo, senza sapere cosa è successo nel frattempo. Paghi 1 Quintessenza per ogni gradino di Portata fra dove sei e dove compari.\nCon Mente: quando salti avanti hai un'idea di dove devi andare, o di come è previsto che vada.\nCon Entropia: quando salti avanti hai un'idea di dove devi andare, o di come è previsto che vada.\n\nEffetto passivo (Sempre): Sai l'ordine delle scene.",
    "attivo": "Dichiari finita la tua scena e passi subito in quella di un altro giocatore, senza l'aggancio fra l'una e l'altra. Oppure salti avanti nel tempo: sparisci dalla scena e ricompari in quella dopo, senza sapere cosa è successo nel frattempo. Paghi 1 Quintessenza per ogni gradino di Portata fra dove sei e dove compari.\nCon Mente: quando salti avanti hai un'idea di dove devi andare, o di come è previsto che vada.\nCon Entropia: quando salti avanti hai un'idea di dove devi andare, o di come è previsto che vada.",
    "passivo": "Sai l'ordine delle scene.",
    "amalgama": "",
    "amalgam": "mind",
    "amalgams": [
      "mind",
      "entropy"
    ],
    "amalgamText": "",
    "flavor": "«Saltiamo la parte noiosa.»",
    "cost": "1 Quintessenza per gradino di Portata",
    "costValue": 0,
    "uses": null,
    "paradox": "Volgare effetto attivo se qualcuno guarda, nessuno effetto passivo.",
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
    "prerequisiti": [
      {
        "numero": 3
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza per gradino di Portata",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "slancio",
    "spheres": [
      "time"
    ],
    "name": "Slancio",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza, una volta per turno): Quando metti a terra o sconfiggi un nemico, fai subito un'altra azione.\n\nEffetto passivo (Sempre): Quando metti a terra o sconfiggi un nemico, hai 2 dadi in più nel tiro dopo, non di Magick.",
    "attivo": "Quando metti a terra o sconfiggi un nemico, fai subito un'altra azione.",
    "passivo": "Quando metti a terra o sconfiggi un nemico, hai 2 dadi in più nel tiro dopo, non di Magick.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Il prossimo.»",
    "cost": "1 Quintessenza, una volta per turno",
    "costValue": 0,
    "uses": null,
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
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza, una volta per turno",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "flash-forward",
    "spheres": [
      "time"
    ],
    "name": "Flash forward",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Quintessenza secondo la Durata): Si gioca una breve scena del futuro: quello che succede lì dovrà succedere, e il gruppo ci deve arrivare. Paghi Quintessenza pari al livello di Durata fra adesso e quella scena.\n\nEffetto passivo (Sempre): Sai quante sessioni, o quante scene, mancano alla scena del futuro che hai giocato. Il Narratore può spendere punti Paradosso per allungare l'attesa.",
    "attivo": "Si gioca una breve scena del futuro: quello che succede lì dovrà succedere, e il gruppo ci deve arrivare. Paghi Quintessenza pari al livello di Durata fra adesso e quella scena.",
    "passivo": "Sai quante sessioni, o quante scene, mancano alla scena del futuro che hai giocato. Il Narratore può spendere punti Paradosso per allungare l'attesa.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Lo vedo già.»",
    "cost": "Quintessenza secondo la Durata",
    "costValue": 0,
    "uses": null,
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
    "prerequisiti": [
      {
        "numero": 3
      }
    ],
    "rifatto": true,
    "costoAttivo": "Quintessenza secondo la Durata",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
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
    "id": "c-ho-ripensato",
    "spheres": [
      "time"
    ],
    "name": "C'ho ripensato",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza più la Durata): Un'azione non è mai accaduta, e la scena va avanti di conseguenza, a discrezione del Narratore. Paghi 2 Quintessenza più il livello di Durata che serve per tornare indietro fino a quell'azione.\n\nEffetto passivo (Sempre): Le anomalie del tempo che questo potere può causare non ti toccano: sei protetto tu, il gruppo no.",
    "attivo": "Un'azione non è mai accaduta, e la scena va avanti di conseguenza, a discrezione del Narratore. Paghi 2 Quintessenza più il livello di Durata che serve per tornare indietro fino a quell'azione.",
    "passivo": "Le anomalie del tempo che questo potere può causare non ti toccano: sei protetto tu, il gruppo no.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«No, aspetta: ci ho ripensato.»",
    "cost": "2 Quintessenza più la Durata",
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
    "prerequisiti": [
      {
        "numero": 4
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza più la Durata",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 2,
      "max": 0
    }
  },
  {
    "id": "presagio",
    "spheres": [
      "time"
    ],
    "name": "Presagio",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Quintessenza pari alla Precisione): Vai più a fondo nel presagio: chiedi una visione di quello che sta arrivando, e più paghi più è precisa (chi è, cosa vuole, quando arriva, da dove, cosa porta con sé). Il Narratore fissa il livello di Precisione, da 1 a 7, e paghi tanta Quintessenza quanto quel livello.\n\nEffetto passivo (Al cambio di scena): Il Narratore ti dice da dove arriva il pericolo più vicino, se ce n'è uno: una direzione, una persona o un'ora (dalla porta sul retro, dall'uomo col cappotto, prima di mezzanotte etc..). Può essere vago, ma non falso.",
    "attivo": "Vai più a fondo nel presagio: chiedi una visione di quello che sta arrivando, e più paghi più è precisa (chi è, cosa vuole, quando arriva, da dove, cosa porta con sé). Il Narratore fissa il livello di Precisione, da 1 a 7, e paghi tanta Quintessenza quanto quel livello.",
    "passivo": "Il Narratore ti dice da dove arriva il pericolo più vicino, se ce n'è uno: una direzione, una persona o un'ora (dalla porta sul retro, dall'uomo col cappotto, prima di mezzanotte etc..). Può essere vago, ma non falso.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "Quintessenza pari alla Precisione",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Tempo",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "Quintessenza pari alla Precisione",
    "cadenzaPassivo": "Al cambio di scena",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
  },
  {
    "id": "psicometria",
    "spheres": [
      "time"
    ],
    "name": "Psicometria",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza a domanda): Tieni l'oggetto e fai al Narratore una domanda chiusa e precisa sul suo passato, che chiede un fatto (chi l'ha impugnato per ultimo? era in quella casa martedì notte?), non una domanda aperta (cosa gli è successo?). Ogni domanda costa 1 Quintessenza, e il Narratore risponde con quello che l'oggetto ha vissuto, non con quello che sa lui.\n\nEffetto passivo (Sempre): Toccando un oggetto senti l'ultima emozione forte di chi l'ha tenuto (paura, rabbia, amore, colpa etc..), senza sapere di chi è.",
    "attivo": "Tieni l'oggetto e fai al Narratore una domanda chiusa e precisa sul suo passato, che chiede un fatto (chi l'ha impugnato per ultimo? era in quella casa martedì notte?), non una domanda aperta (cosa gli è successo?). Ogni domanda costa 1 Quintessenza, e il Narratore risponde con quello che l'oggetto ha vissuto, non con quello che sa lui.",
    "passivo": "Toccando un oggetto senti l'ultima emozione forte di chi l'ha tenuto (paura, rabbia, amore, colpa etc..), senza sapere di chi è.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza a domanda",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Tempo",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza a domanda",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "pisolino",
    "spheres": [
      "life",
      "mind"
    ],
    "name": "Pisolino",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza per compagno): Il riposo del passivo vale anche per i compagni che riposano con te.\n\nEffetto passivo (Una volta per sessione): Una scena di riposo vale per te come un riposo completo.",
    "attivo": "Il riposo del passivo vale anche per i compagni che riposano con te.",
    "passivo": "Una scena di riposo vale per te come un riposo completo.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Cinque minuti e sono come nuovo.»",
    "cost": "1 Quintessenza per compagno",
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
    "rifatto": true,
    "costoAttivo": "1 Quintessenza per compagno",
    "cadenzaPassivo": "Una volta per sessione",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
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
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza per punto): Per ogni 2 Quintessenza che spendi hai 1 punto in più in un Attributo fisico, fino a fine scena.\n\nEffetto passivo (A sessione nuova): A ogni sessione sposti come preferisci i punti dei tuoi Attributi fisici, senza scendere sotto 1 né salire sopra 5.",
    "attivo": "Per ogni 2 Quintessenza che spendi hai 1 punto in più in un Attributo fisico, fino a fine scena.",
    "passivo": "A ogni sessione sposti come preferisci i punti dei tuoi Attributi fisici, senza scendere sotto 1 né salire sopra 5.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Ho lavorato sulle gambe.»",
    "cost": "2 Quintessenza per punto",
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
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza per punto",
    "cadenzaPassivo": "A sessione nuova",
    "costoVariabile": {
      "min": 2,
      "max": 0
    }
  },
  {
    "id": "buona-forchetta",
    "spheres": [
      "life"
    ],
    "name": "Buona forchetta",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza, una volta per sessione): Un buon pasto ti dà gli effetti di un riposo.\n\nEffetto passivo (Sempre): Quello che mangi non ti dà mai stati alterati né altri effetti. Mangi anche cose che non si mangiano, e ne ricavi nutrimento: sopravvivi e sei sazio.",
    "attivo": "Un buon pasto ti dà gli effetti di un riposo.",
    "passivo": "Quello che mangi non ti dà mai stati alterati né altri effetti. Mangi anche cose che non si mangiano, e ne ricavi nutrimento: sopravvivi e sei sazio.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«A stomaco pieno si ragiona meglio.»",
    "cost": "1 Quintessenza, una volta per sessione",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
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
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza, una volta per sessione",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "il-dolore-sveglia",
    "spheres": [
      "life",
      "mind"
    ],
    "name": "Il dolore sveglia",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Quando prendi danni, paghi e diventa uno scambio: per ogni danno fisico che prendi ne guarisci uno mentale superficiale, o il contrario.\n\nEffetto passivo (Sempre): Quando prendi danni fisici, guarisci 1 danno mentale superficiale; quando prendi danni mentali, guarisci 1 danno fisico superficiale.",
    "attivo": "Quando prendi danni, paghi e diventa uno scambio: per ogni danno fisico che prendi ne guarisci uno mentale superficiale, o il contrario.",
    "passivo": "Quando prendi danni fisici, guarisci 1 danno mentale superficiale; quando prendi danni mentali, guarisci 1 danno fisico superficiale.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Il dolore mi tiene sveglio.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
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
    "id": "sangue-per-sangue",
    "spheres": [
      "life"
    ],
    "name": "Sangue per sangue",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 danno superficiale): Quando curi qualcuno, puoi prendere tu 1 danno superficiale: la cura su di lui raddoppia, ma il passivo su di te non vale.\n\nEffetto passivo (Sempre): Quando curi un'altra persona, guarisci anche tu della stessa quantità.",
    "attivo": "Quando curi qualcuno, puoi prendere tu 1 danno superficiale: la cura su di lui raddoppia, ma il passivo su di te non vale.",
    "passivo": "Quando curi un'altra persona, guarisci anche tu della stessa quantità.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Prendi un po' del mio.»",
    "cost": "1 danno superficiale",
    "costValue": 0,
    "uses": null,
    "paradox": "Segue il lancio in tutte e due le forme; fuori dalla Magick, basso rischio.",
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
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 danno superficiale",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": null
  },
  {
    "id": "vaccino",
    "spheres": [
      "life"
    ],
    "name": "Vaccino",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Ne scegli un'altra, sempre fra quelle che hai già preso, e vale lo stesso anche per lei.\n\nEffetto passivo (Una volta per sessione): Scegli una Condizione fisica che hai già preso (si aggiornerà a catena col rifacimento delle Condizioni): fino a fine sessione non te la possono più infliggere.",
    "attivo": "Ne scegli un'altra, sempre fra quelle che hai già preso, e vale lo stesso anche per lei.",
    "passivo": "Scegli una Condizione fisica che hai già preso (si aggiornerà a catena col rifacimento delle Condizioni): fino a fine sessione non te la possono più infliggere.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Questa l'ho già avuta.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
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
    "id": "bisturi",
    "spheres": [
      "life"
    ],
    "name": "Bisturi",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Per un tiro di Medicina i poteri che conosci in Vita prendono il posto dell'Abilità; così non hai Specialità.\n\nEffetto passivo (Sempre): Anche con pochi materiali fai il pronto soccorso, e tiri Medicina per tutto quello che serve a trattare le ferite.",
    "attivo": "Per un tiro di Medicina i poteri che conosci in Vita prendono il posto dell'Abilità; così non hai Specialità.",
    "passivo": "Anche con pochi materiali fai il pronto soccorso, e tiri Medicina per tutto quello che serve a trattare le ferite.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Tienilo fermo.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
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
    "id": "memoria-muscolare",
    "spheres": [
      "life"
    ],
    "name": "Memoria muscolare",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (da 1 a 3 Quintessenza): In un tiro d'Abilità fisico che il personaggio sa già fare, con l'Abilità che serve, hai 1 dado in più per ogni Quintessenza che paghi.\n\nEffetto passivo (Sempre): Un tiro fisico che ti è già riuscito nella scena, se lo rifai, riesce senza tirare.",
    "attivo": "In un tiro d'Abilità fisico che il personaggio sa già fare, con l'Abilità che serve, hai 1 dado in più per ogni Quintessenza che paghi.",
    "passivo": "Un tiro fisico che ti è già riuscito nella scena, se lo rifai, riesce senza tirare.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Il corpo se lo ricorda.»",
    "cost": "da 1 a 3 Quintessenza",
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
    "rifatto": true,
    "costoAttivo": "da 1 a 3 Quintessenza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 3
    }
  },
  {
    "id": "parassita",
    "spheres": [
      "life"
    ],
    "name": "Parassita",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Per un colpo il rapporto diventa 1 a 1: ogni danno che fai te ne cura uno superficiale.\n\nEffetto passivo (Sempre): Quando ferisci con Vita, ogni 2 danni che fai te ne curano 1 superficiale.",
    "attivo": "Per un colpo il rapporto diventa 1 a 1: ogni danno che fai te ne cura uno superficiale.",
    "passivo": "Quando ferisci con Vita, ogni 2 danni che fai te ne curano 1 superficiale.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Il tuo sangue, la mia salute.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Segue il lancio in tutte e due le forme.",
    "formula": "drenare",
    "formulaName": "Drenare",
    "link": "regola",
    "page": "Vita",
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
    "costoAttivo": "1 Quintessenza",
    "cadenzaPassivo": "Sempre",
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
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza per livello): Quando scatta il passivo, risani subito 1 livello di Salute per ogni Quintessenza che paghi.\n\nEffetto passivo (Una volta per sessione): Quando un colpo ti ucciderebbe, invece ti lascia con 1 livello di Salute.",
    "attivo": "Quando scatta il passivo, risani subito 1 livello di Salute per ogni Quintessenza che paghi.",
    "passivo": "Quando un colpo ti ucciderebbe, invece ti lascia con 1 livello di Salute.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Il cuore batte ancora.»",
    "cost": "1 Quintessenza per livello",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio in tutte e due le forme.",
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
    "prerequisiti": [
      {
        "numero": 3
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza per livello",
    "cadenzaPassivo": "Una volta per sessione",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "mutaforma",
    "spheres": [
      "life"
    ],
    "name": "Mutaforma",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (3 Quintessenza): Per la scena prendi la forma di una creatura che hai toccato, e ne hai i benefici: finché dura usi la sua scheda, e non la tua, con tutto quello che ne consegue. I suoi poteri e le sue doti speciali li prendi solo se hai una Sfera che li copre.\nCon Spirito: puoi prendere anche la forma di una creatura di fuori (uno spirito, un'entità etc..).\nCon Primordio: prendi anche i suoi poteri e le sue doti speciali, quali che siano.\nCon Forza: puoi prendere anche la forma pura di un elemento (vento, fuoco, acqua etc..): per la scheda sei uno spirito di quell'elemento, i colpi fisici ti passano attraverso, e l'elemento intorno a te lo comandi tutto, anche quando è grande (un incendio, un fiume in piena, una bufera etc..).\n\nEffetto passivo (Sempre): Di scena in scena cambi a piacere il tuo volto e il tuo aspetto in quelli di un'altra persona. I vestiti li cambi a mano.\nCon Materia: cambiano anche i vestiti.",
    "attivo": "Per la scena prendi la forma di una creatura che hai toccato, e ne hai i benefici: finché dura usi la sua scheda, e non la tua, con tutto quello che ne consegue. I suoi poteri e le sue doti speciali li prendi solo se hai una Sfera che li copre.\nCon Spirito: puoi prendere anche la forma di una creatura di fuori (uno spirito, un'entità etc..).\nCon Primordio: prendi anche i suoi poteri e le sue doti speciali, quali che siano.\nCon Forza: puoi prendere anche la forma pura di un elemento (vento, fuoco, acqua etc..): per la scheda sei uno spirito di quell'elemento, i colpi fisici ti passano attraverso, e l'elemento intorno a te lo comandi tutto, anche quando è grande (un incendio, un fiume in piena, una bufera etc..).",
    "passivo": "Di scena in scena cambi a piacere il tuo volto e il tuo aspetto in quelli di un'altra persona. I vestiti li cambi a mano.\nCon Materia: cambiano anche i vestiti.",
    "amalgama": "",
    "amalgam": "matter",
    "amalgams": [
      "matter",
      "spirit",
      "prime",
      "forces"
    ],
    "amalgamText": "",
    "flavor": "",
    "cost": "3 Quintessenza",
    "costValue": 3,
    "uses": null,
    "paradox": "Volgare effetto attivo se qualcuno guarda, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Vita",
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
    "id": "sensi-animali",
    "spheres": [
      "life"
    ],
    "name": "Sensi animali",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza a senso): Per la scena un tuo senso diventa quello di un animale, e fa quello che fa il suo: col fiuto del cane senti gli odori da lontano e segui una traccia; con gli occhi del gatto vedi al buio; con l'eco del pipistrello senti la forma delle cose intorno a te, anche di quelle che non vedi (dietro un angolo, nel fumo, al buio). Nei tiri che usano quel senso hai 2 dadi in più, e fai quello che coi sensi di sempre non potresti. Paghi 1 Quintessenza per ogni senso.\n\nEffetto passivo (Sempre): Scegli un senso: quando lo usi hai 2 dadi in più nel tiro che ci va, di solito Allerta.",
    "attivo": "Per la scena un tuo senso diventa quello di un animale, e fa quello che fa il suo: col fiuto del cane senti gli odori da lontano e segui una traccia; con gli occhi del gatto vedi al buio; con l'eco del pipistrello senti la forma delle cose intorno a te, anche di quelle che non vedi (dietro un angolo, nel fumo, al buio). Nei tiri che usano quel senso hai 2 dadi in più, e fai quello che coi sensi di sempre non potresti. Paghi 1 Quintessenza per ogni senso.",
    "passivo": "Scegli un senso: quando lo usi hai 2 dadi in più nel tiro che ci va, di solito Allerta.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza a senso",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Vita",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "1 Quintessenza a senso",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "parola-alle-bestie",
    "spheres": [
      "life"
    ],
    "name": "Parola alle bestie",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza ad animale, o pari all'Area): Un animale che vedi esegue un tuo ordine di una frase, alla lettera e senza capire i sottintesi (fai la guardia alla porta, segui quell'uomo, porta via le chiavi etc..), fino a fine scena o finché non l'ha fatto. Per ogni Quintessenza in più l'ordine lo prende un altro animale; oppure paghi l'Area (1 la stanza, 2 l'edificio, 3 il quartiere) e lo prendono tutti quelli di un tipo che ci stanno. L'ordine non manda un animale a morire. Con 1 Quintessenza in più l'ordine può essere un messaggio: l'animale va da una persona che conosci, o di cui hai un oggetto, e le ripete il messaggio con la tua voce (al massimo un minuto di parole); se non la trova entro la notte, il messaggio si perde. Un animale legato a qualcuno (un famiglio, il cane di un mago, una bestia di uno spirito) può resistere. Se la sua soglia mentale è più alta dei poteri che conosci in Vita, paghi 1 Quintessenza in più per ogni punto di differenza.\n\nEffetto passivo (Sempre): Capisci gli animali e loro capiscono te, a grandi linee: un cane ti dice che qui è passato qualcuno, un gatto che in casa c'è un estraneo, un piccione che sta per piovere. Non ti obbediscono: si fanno capire. Quello che sanno dipende dall'animale (un cane ricorda un odore per giorni, un piccione dimentica tutto in un'ora).",
    "attivo": "Un animale che vedi esegue un tuo ordine di una frase, alla lettera e senza capire i sottintesi (fai la guardia alla porta, segui quell'uomo, porta via le chiavi etc..), fino a fine scena o finché non l'ha fatto. Per ogni Quintessenza in più l'ordine lo prende un altro animale; oppure paghi l'Area (1 la stanza, 2 l'edificio, 3 il quartiere) e lo prendono tutti quelli di un tipo che ci stanno. L'ordine non manda un animale a morire. Con 1 Quintessenza in più l'ordine può essere un messaggio: l'animale va da una persona che conosci, o di cui hai un oggetto, e le ripete il messaggio con la tua voce (al massimo un minuto di parole); se non la trova entro la notte, il messaggio si perde. Un animale legato a qualcuno (un famiglio, il cane di un mago, una bestia di uno spirito) può resistere. Se la sua soglia mentale è più alta dei poteri che conosci in Vita, paghi 1 Quintessenza in più per ogni punto di differenza.",
    "passivo": "Capisci gli animali e loro capiscono te, a grandi linee: un cane ti dice che qui è passato qualcuno, un gatto che in casa c'è un estraneo, un piccione che sta per piovere. Non ti obbediscono: si fanno capire. Quello che sanno dipende dall'animale (un cane ricorda un odore per giorni, un piccione dimentica tutto in un'ora).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza ad animale, o pari all'Area",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Vita",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "1 Quintessenza ad animale, o pari all'Area",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "richiamo",
    "spheres": [
      "life"
    ],
    "name": "Richiamo",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Quintessenza pari all'Area, più 1 a tipo): Chiami in tuo soccorso gli animali di un tipo (cani, corvi, ratti, gatti etc..) che stanno nell'area che paghi: 1 la stanza o il cortile, 2 l'edificio o l'isolato, 3 il quartiere etc.. Arrivano appena possono, e per la scena ti aiutano come sanno: attaccano chi ti minaccia, ti fanno strada, si mettono in mezzo, distraggono. Ne arrivano quanti ce ne sono: in un parco i piccioni sono centinaia, in un ufficio i ratti sono tre. Con 1 Quintessenza in più per tipo ne chiami anche un altro.\n\nEffetto passivo (Sempre): Gli animali ti sono amici: non ti attaccano mai, a meno che qualcuno non li costringa (un padrone che li aizza, un potere, una gabbia in cui li chiudono con te).",
    "attivo": "Chiami in tuo soccorso gli animali di un tipo (cani, corvi, ratti, gatti etc..) che stanno nell'area che paghi: 1 la stanza o il cortile, 2 l'edificio o l'isolato, 3 il quartiere etc.. Arrivano appena possono, e per la scena ti aiutano come sanno: attaccano chi ti minaccia, ti fanno strada, si mettono in mezzo, distraggono. Ne arrivano quanti ce ne sono: in un parco i piccioni sono centinaia, in un ufficio i ratti sono tre. Con 1 Quintessenza in più per tipo ne chiami anche un altro.",
    "passivo": "Gli animali ti sono amici: non ti attaccano mai, a meno che qualcuno non li costringa (un padrone che li aizza, un potere, una gabbia in cui li chiudono con te).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "Quintessenza pari all'Area, più 1 a tipo",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo (Volgare se qualcuno vede le bestie obbedirti), nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Vita",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "Quintessenza pari all'Area, più 1 a tipo",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
  },
  {
    "id": "parti-di-bestia",
    "spheres": [
      "life"
    ],
    "name": "Parti di bestia",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza a parte): Una parte del tuo corpo diventa di un animale fino a fine scena, e ti dà la sua capacità vera: ali di pipistrello per planare, branchie per respirare sott'acqua, il naso di un cane per seguire una traccia, la coda di un gatto per l'equilibrio etc.. Dove la capacità da sola non basta, nei tiri in cui quella parte ti aiuta hai 2 dadi in più. Con artigli o fauci il danno del passivo è aggravato. Si vede: chi ti guarda vede una zampa, non una mano.\n\nEffetto passivo (Sempre): I tuoi colpi senza armi fanno danno pari ai poteri che conosci in Vita, più 1: unghie dure, nocche come sassi, denti che stringono. Non si vede.",
    "attivo": "Una parte del tuo corpo diventa di un animale fino a fine scena, e ti dà la sua capacità vera: ali di pipistrello per planare, branchie per respirare sott'acqua, il naso di un cane per seguire una traccia, la coda di un gatto per l'equilibrio etc.. Dove la capacità da sola non basta, nei tiri in cui quella parte ti aiuta hai 2 dadi in più. Con artigli o fauci il danno del passivo è aggravato. Si vede: chi ti guarda vede una zampa, non una mano.",
    "passivo": "I tuoi colpi senza armi fanno danno pari ai poteri che conosci in Vita, più 1: unghie dure, nocche come sassi, denti che stringono. Non si vede.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza a parte",
    "costValue": 0,
    "uses": null,
    "paradox": "Volgare effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Vita",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza a parte",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "spezzaossa",
    "spheres": [
      "life",
      "forces"
    ],
    "name": "Spezzaossa",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Se il tuo colpo mirato va a segno, paghi, e la parte che miravi prende la Condizione che cercavi, senza altri tiri: la mano Rotta, la caviglia Slogata, il fianco Sanguinante etc.. Vale se la sua soglia fisica è pari o più bassa dei poteri che conosci in Vita o in Forza; se è più alta, la Condizione non scatta da sola, e resta solo il colpo.\n\nEffetto passivo (Sempre): Quando miri una parte del corpo (il ginocchio, la mano, la gola etc..), sai dove fa più male: nel tiro hai 2 dadi in più, e se colpisci fai 1 danno in più. Quei dadi ti aiutano anche quando col colpo vuoi dargli una Condizione.",
    "attivo": "Se il tuo colpo mirato va a segno, paghi, e la parte che miravi prende la Condizione che cercavi, senza altri tiri: la mano Rotta, la caviglia Slogata, il fianco Sanguinante etc.. Vale se la sua soglia fisica è pari o più bassa dei poteri che conosci in Vita o in Forza; se è più alta, la Condizione non scatta da sola, e resta solo il colpo.",
    "passivo": "Quando miri una parte del corpo (il ginocchio, la mano, la gola etc..), sai dove fa più male: nel tiro hai 2 dadi in più, e se colpisci fai 1 danno in più. Quei dadi ti aiutano anche quando col colpo vuoi dargli una Condizione.",
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
    "page": "Vita",
    "hooks": [],
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
    "id": "aculei-corporei",
    "spheres": [
      "life"
    ],
    "name": "Aculei corporei",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Fino a fine scena sei coperto di aculei. Chi ti ferisce in mischia prende metà del danno che fa a te, per difetto e dopo le tue riduzioni, e l'arma che ti colpisce si rovina: da lì in poi fa 1 danno in meno, finché non la riparano. Puoi pagarlo anche quando ti colpiscono: vale da quel colpo. Con 2 Quintessenza in più il danno gli torna tutto, non la metà.\n\nEffetto passivo (Sempre): Quando qualcuno ti colpisce a mani nude (un pugno, un morso, una presa), dalla pelle escono aculei: prende 1 danno superficiale.",
    "attivo": "Fino a fine scena sei coperto di aculei. Chi ti ferisce in mischia prende metà del danno che fa a te, per difetto e dopo le tue riduzioni, e l'arma che ti colpisce si rovina: da lì in poi fa 1 danno in meno, finché non la riparano. Puoi pagarlo anche quando ti colpiscono: vale da quel colpo. Con 2 Quintessenza in più il danno gli torna tutto, non la metà.",
    "passivo": "Quando qualcuno ti colpisce a mani nude (un pugno, un morso, una presa), dalla pelle escono aculei: prende 1 danno superficiale.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Volgare effetto attivo, Volgare effetto passivo se qualcuno guarda.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Vita",
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
    "id": "appoggio",
    "spheres": [
      "any"
    ],
    "name": "Appoggio",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Vale come leva anche una cosa che hai messo tu in scena, prima: la benzina che hai versato, se vuoi un incendio; la voce che hai fatto girare, se vuoi che la folla si agiti; il cavo che hai scoperto, se vuoi una scarica.\n\nEffetto passivo (Sempre): L'Ambito di Potenza di un tuo lancio non conta fino al livello 4, se in scena c'è una leva: qualcosa che fa già una parte del lavoro, e tu lo spingi, non lo crei. Un temporale in arrivo, se vuoi un fulmine; un pilastro già incrinato, se vuoi che crolli il soffitto; la rabbia che la guardia prova già, se vuoi che attacchi il suo capo.",
    "attivo": "Vale come leva anche una cosa che hai messo tu in scena, prima: la benzina che hai versato, se vuoi un incendio; la voce che hai fatto girare, se vuoi che la folla si agiti; il cavo che hai scoperto, se vuoi una scarica.",
    "passivo": "L'Ambito di Potenza di un tuo lancio non conta fino al livello 4, se in scena c'è una leva: qualcosa che fa già una parte del lavoro, e tu lo spingi, non lo crei. Un temporale in arrivo, se vuoi un fulmine; un pilastro già incrinato, se vuoi che crolli il soffitto; la rabbia che la guardia prova già, se vuoi che attacchi il suo capo.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Datemi una leva.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Segue il lancio in tutte e due le forme.",
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
        "nota": "L'Ambito di Potenza di un tuo lancio non conta fino al livello 4, se in scena c'è una leva"
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
    "id": "coperto",
    "spheres": [
      "any"
    ],
    "name": "Coperto",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (4 Quintessenza): Il Narratore fa diventare Accidentale il tuo lancio, anche se va oltre il normale. In un posto Dissonante non vale: lì ogni lancio è Volgare.\n\nEffetto passivo (Sempre): La tua Magick si nasconde in quello che c'è già. Se in scena qualcosa può spiegare il tuo effetto a un Dormiente (un temporale, una folla, un cavo scoperto etc..), il Narratore può contare Accidentale il lancio anche se va oltre il normale: cosa basta, lo decide lui.",
    "attivo": "Il Narratore fa diventare Accidentale il tuo lancio, anche se va oltre il normale. In un posto Dissonante non vale: lì ogni lancio è Volgare.",
    "passivo": "La tua Magick si nasconde in quello che c'è già. Se in scena qualcosa può spiegare il tuo effetto a un Dormiente (un temporale, una folla, un cavo scoperto etc..), il Narratore può contare Accidentale il lancio anche se va oltre il normale: cosa basta, lo decide lui.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Nessuno ha visto niente. Nemmeno tu, ufficialmente.»",
    "cost": "4 Quintessenza",
    "costValue": 4,
    "uses": null,
    "paradox": "Accidentale effetto attivo, Accidentale se il Narratore lo concede effetto passivo; in un posto Dissonante, Volgare tutti e due.",
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
    "rifatto": true,
    "costoAttivo": "4 Quintessenza",
    "cadenzaPassivo": "Sempre",
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
    "text": "Effetto attivo (1 Quintessenza, 3 per la scena): Quando reagisci a un lancio col passivo, su di te o su un compagno vicino a te, la difesa conta di più: chi lancia ha i dadi dimezzati per difetto oppure soglia +3. Con 3 Quintessenza vale fino a fine scena, contro tutti i suoi lanci.\n\nEffetto passivo (Sempre): Quando qualcuno lancia una Sfera che conosci su di te o intorno a te, lo percepisci subito, e puoi scegliere di reagire a quell'effetto (con la tua reazione: ne hai una per turno).",
    "attivo": "Quando reagisci a un lancio col passivo, su di te o su un compagno vicino a te, la difesa conta di più: chi lancia ha i dadi dimezzati per difetto oppure soglia +3. Con 3 Quintessenza vale fino a fine scena, contro tutti i suoi lanci.",
    "passivo": "Quando qualcuno lancia una Sfera che conosci su di te o intorno a te, lo percepisci subito, e puoi scegliere di reagire a quell'effetto (con la tua reazione: ne hai una per turno).",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Conosci la tua Sfera e non fai entrare gli estranei.»",
    "cost": "1 Quintessenza, 3 per la scena",
    "costValue": 0,
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
    "rifatto": true,
    "costoAttivo": "1 Quintessenza, 3 per la scena",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
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
    "text": "Effetto attivo (2 Quintessenza): Quando quello a cui hai legato l'effetto sta per venire meno, lo sposti su un'altra cosa o un'altra condizione.\n\nEffetto passivo (Sempre): L'Ambito di Durata di un tuo effetto non conta fino al livello 4, se lo leghi a qualcosa: una cosa o una condizione precisa (finché la candela brucia, finché lei non torna, finché porti l'anello etc..). Quando quello a cui l'hai legato viene meno, l'effetto finisce. In pratica baratti la Durata con una condizione.",
    "attivo": "Quando quello a cui hai legato l'effetto sta per venire meno, lo sposti su un'altra cosa o un'altra condizione.",
    "passivo": "L'Ambito di Durata di un tuo effetto non conta fino al livello 4, se lo leghi a qualcosa: una cosa o una condizione precisa (finché la candela brucia, finché lei non torna, finché porti l'anello etc..). Quando quello a cui l'hai legato viene meno, l'effetto finisce. In pratica baratti la Durata con una condizione.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Se lo appoggi a qualcosa di vero, resta.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Segue il lancio in tutte e due le forme.",
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
        "nota": "L'Ambito di Durata di un tuo effetto non conta fino al livello 4, se lo leghi a qualcosa"
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "2 Quintessenza",
    "cadenzaPassivo": "Sempre",
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
    "text": "Effetto attivo (2 Quintessenza): Il tratto comune lo scegli tu, anche da poco, purché ci sia davvero (chi porta una giacca rossa, chi è sceso dallo stesso treno, chi ha bevuto dalla stessa bottiglia etc..).\n\nEffetto passivo (Sempre): L'Ambito di Bersagli di un tuo lancio non conta fino al livello 4, se i bersagli hanno un legame che conta: qualcosa che li unisce davvero, con sostanza e peso nella loro vita (i credenti di una chiesa, i soldati di un reparto, i membri di una famiglia etc..). Un tratto da poco non basta: tutti quelli che portano le scarpe, no.",
    "attivo": "Il tratto comune lo scegli tu, anche da poco, purché ci sia davvero (chi porta una giacca rossa, chi è sceso dallo stesso treno, chi ha bevuto dalla stessa bottiglia etc..).",
    "passivo": "L'Ambito di Bersagli di un tuo lancio non conta fino al livello 4, se i bersagli hanno un legame che conta: qualcosa che li unisce davvero, con sostanza e peso nella loro vita (i credenti di una chiesa, i soldati di un reparto, i membri di una famiglia etc..). Un tratto da poco non basta: tutti quelli che portano le scarpe, no.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Uno o cento, per te è lo stesso lavoro.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Segue il lancio in tutte e due le forme.",
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
        "nota": "L'Ambito di Bersagli di un tuo lancio non conta fino al livello 4, se i bersagli hanno un legame che conta"
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "2 Quintessenza",
    "cadenzaPassivo": "Sempre",
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
    "text": "Effetto attivo (Quintessenza pari alla soglia): L'effetto scelto riesce senza tirare: paghi tanta Quintessenza quanta è la sua soglia. Il tiro deve essere possibile: dopo la soglia ti resta almeno un dado.\n\nEffetto passivo (Sempre): All'acquisto scegli un effetto di Magick del tuo Grimorio, uno già pronto o uno tuo: quando lo lanci ha soglia -2, senza scendere sotto zero. Le Sfere che chiede ti servono lo stesso.",
    "attivo": "L'effetto scelto riesce senza tirare: paghi tanta Quintessenza quanta è la sua soglia. Il tiro deve essere possibile: dopo la soglia ti resta almeno un dado.",
    "passivo": "All'acquisto scegli un effetto di Magick del tuo Grimorio, uno già pronto o uno tuo: quando lo lanci ha soglia -2, senza scendere sotto zero. Le Sfere che chiede ti servono lo stesso.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Nel tuo campo non c'è gara.»",
    "cost": "Quintessenza pari alla soglia",
    "costValue": 0,
    "uses": null,
    "paradox": "Segue il lancio in tutte e due le forme.",
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
        "nota": "quando lo lanci ha soglia -2, senza scendere sotto zero"
      },
      {
        "mode": "attivo",
        "on": "autoSuccess",
        "when": [
          "incantesimoScelto",
          "dadi1"
        ],
        "nota": "L'effetto scelto riesce senza tirare: paghi tanta Quintessenza quanta è la sua soglia"
      }
    ],
    "scelta": {
      "kind": "incantesimo"
    },
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "Quintessenza pari alla soglia",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
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
    "text": "Effetto attivo (2 Quintessenza): Con un legame da poco (una foto, il suo nome, averlo visto una volta) ne fai uno vero, che vale fino a fine sessione.\n\nEffetto passivo (Sempre): L'Ambito di Portata di un tuo lancio non conta fino al livello 4 verso ciò con cui hai un legame: qualcosa che ti unisce al bersaglio anche da lontano (un pezzo di lui che tieni con te, un conto aperto fra voi, un posto dove sei già stato etc..). Il legame fa anche da ponte: salti la Regola del Ponte, quella che chiede Corrispondenza per agire su ciò che non vedi.",
    "attivo": "Con un legame da poco (una foto, il suo nome, averlo visto una volta) ne fai uno vero, che vale fino a fine sessione.",
    "passivo": "L'Ambito di Portata di un tuo lancio non conta fino al livello 4 verso ciò con cui hai un legame: qualcosa che ti unisce al bersaglio anche da lontano (un pezzo di lui che tieni con te, un conto aperto fra voi, un posto dove sei già stato etc..). Il legame fa anche da ponte: salti la Regola del Ponte, quella che chiede Corrispondenza per agire su ciò che non vedi.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Per te la distanza è un dettaglio.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
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
        "nota": "L'Ambito di Portata di un tuo lancio non conta fino al livello 4 verso ciò con cui hai un legame"
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
    "id": "mestiere",
    "spheres": [
      "any"
    ],
    "name": "Mestiere",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Sposti il passivo su un'altra Abilità, che prende il posto di quella di prima.\n\nEffetto passivo (Sempre): All'acquisto scegli un'Abilità. Quando la tiri fuori dalla Magick hai 1 dado in più per ogni tua Sfera che c'entra, fino a 3: con Convincere, Tempo e Mente ti dicono cosa dirà e cosa penserà l'altro, e i dadi in più sono 2. Se sullo stesso tiro vale anche Sesto senso, prendi il più alto dei due.",
    "attivo": "Sposti il passivo su un'altra Abilità, che prende il posto di quella di prima.",
    "passivo": "All'acquisto scegli un'Abilità. Quando la tiri fuori dalla Magick hai 1 dado in più per ogni tua Sfera che c'entra, fino a 3: con Convincere, Tempo e Mente ti dicono cosa dirà e cosa penserà l'altro, e i dadi in più sono 2. Se sullo stesso tiro vale anche Sesto senso, prendi il più alto dei due.",
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
        "nota": "Quando la tiri fuori dalla Magick hai 1 dado in più per ogni tua Sfera che c'entra, fino a 3"
      }
    ],
    "scelta": {
      "kind": "abilita"
    },
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
    "id": "modello",
    "spheres": [
      "any"
    ],
    "name": "Modello",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Per un lancio vale anche su un altro tipo di bersaglio, fra quelli che chiedono una Sfera compagna.\n\nEffetto passivo (Sempre): All'acquisto scegli un tipo di bersaglio che di solito chiede una Sfera compagna (la seconda Sfera, quella che tocca il bersaglio per ciò che è: per colpire con Vita un vampiro, che è carne morta, serve Materia). Su quel bersaglio lavori come se l'avessi, perché ne conosci il Modello, la trama che fa di una cosa quello che è. Salti la Regola del Bersaglio; il lancio può essere Volgare lo stesso.",
    "attivo": "Per un lancio vale anche su un altro tipo di bersaglio, fra quelli che chiedono una Sfera compagna.",
    "passivo": "All'acquisto scegli un tipo di bersaglio che di solito chiede una Sfera compagna (la seconda Sfera, quella che tocca il bersaglio per ciò che è: per colpire con Vita un vampiro, che è carne morta, serve Materia). Su quel bersaglio lavori come se l'avessi, perché ne conosci il Modello, la trama che fa di una cosa quello che è. Salti la Regola del Bersaglio; il lancio può essere Volgare lo stesso.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Qualunque cosa sia, ha un Modello.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Segue il lancio in tutte e due le forme.",
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
    "id": "segnale",
    "spheres": [
      "any"
    ],
    "name": "Segnale",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Fai scattare subito un tuo effetto che aspetta il suo segnale.\n\nEffetto passivo (Sempre): L'Ambito di Condizioni di un tuo lancio non conta fino al livello 4, se il segnale è preciso. Il segnale è la condizione che dice all'effetto quando scattare, su chi o fino a quando; è preciso se le tue Sfere lo riconoscono da sole (qualcuno varca la porta, scatta un allarme, il bersaglio pensa a te etc..). Gli altri segnali contano come sempre.",
    "attivo": "Fai scattare subito un tuo effetto che aspetta il suo segnale.",
    "passivo": "L'Ambito di Condizioni di un tuo lancio non conta fino al livello 4, se il segnale è preciso. Il segnale è la condizione che dice all'effetto quando scattare, su chi o fino a quando; è preciso se le tue Sfere lo riconoscono da sole (qualcuno varca la porta, scatta un allarme, il bersaglio pensa a te etc..). Gli altri segnali contano come sempre.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«A mezzanotte in punto. Non un secondo prima.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
    "paradox": "Segue il lancio in tutte e due le forme.",
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
        "nota": "L'Ambito di Condizioni di un tuo lancio non conta fino al livello 4, se il segnale è preciso"
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
    "id": "sesto-senso",
    "spheres": [
      "any"
    ],
    "name": "Sesto senso",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Quintessenza pari alla Precisione): Fai al Narratore una domanda su quello che senti, e hai la risposta senza tirare. Il prezzo segue la precisione della risposta, come se pagassi l'Ambito: il Narratore fissa il livello di Precisione, da 1 a 7, e paghi tanta Quintessenza quanto quel livello.\n\nEffetto passivo (Sempre): Percepisci senza tirare quello che le tue Sfere sanno vedere (con Forza l'energia che c'è, con Vita come sta un corpo, con Spirito le presenze oltre il Velo etc..). Quando un tiro di Abilità si appoggia a quello che percepisci, il Narratore può darti 2 dadi in più oppure soglia -2.",
    "attivo": "Fai al Narratore una domanda su quello che senti, e hai la risposta senza tirare. Il prezzo segue la precisione della risposta, come se pagassi l'Ambito: il Narratore fissa il livello di Precisione, da 1 a 7, e paghi tanta Quintessenza quanto quel livello.",
    "passivo": "Percepisci senza tirare quello che le tue Sfere sanno vedere (con Forza l'energia che c'è, con Vita come sta un corpo, con Spirito le presenze oltre il Velo etc..). Quando un tiro di Abilità si appoggia a quello che percepisci, il Narratore può darti 2 dadi in più oppure soglia -2.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Non guardi: sai.»",
    "cost": "Quintessenza pari alla Precisione",
    "costValue": 0,
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
        "nota": "Quando un tiro di Abilità si appoggia a quello che percepisci, il Narratore può darti 2 dadi in più oppure soglia -2"
      }
    ],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "Quintessenza pari alla Precisione",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
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
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Per la scena ignori una Condizione fisica (si aggiornerà a catena col rifacimento delle Condizioni), oppure le penalità del dolore quando sei Menomato.\nCon Mente: la Condizione può essere anche mentale.\nCon Spirito: la Condizione può essere anche soprannaturale.\nCon Primordio: la Condizione può essere anche una che viene dal Paradosso.\n\nEffetto passivo (Sempre): Quando sei sotto metà Salute, nei tiri fisici hai 2 dadi in più.",
    "attivo": "Per la scena ignori una Condizione fisica (si aggiornerà a catena col rifacimento delle Condizioni), oppure le penalità del dolore quando sei Menomato.\nCon Mente: la Condizione può essere anche mentale.\nCon Spirito: la Condizione può essere anche soprannaturale.\nCon Primordio: la Condizione può essere anche una che viene dal Paradosso.",
    "passivo": "Quando sei sotto metà Salute, nei tiri fisici hai 2 dadi in più.",
    "amalgama": "",
    "amalgam": "mind",
    "amalgams": [
      "mind",
      "spirit",
      "prime"
    ],
    "amalgamText": "",
    "flavor": "«Quando fa davvero male, funzioni meglio.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
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
        "on": "dice",
        "value": 2,
        "roll": "abilita",
        "when": "saluteMeta",
        "nota": "Quando sei sotto metà Salute, nei tiri fisici hai 2 dadi in più"
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
    "text": "Effetto attivo (1 Quintessenza per livello in più): Per un lancio vai oltre: per ogni Quintessenza che paghi, l'Ambito scelto non lo paghi per un livello in più.\n\nEffetto passivo (Sempre): All'acquisto scegli un Ambito, uno solo. Nei tuoi lanci non lo paghi fino al livello pari ai poteri che conosci nella Sfera che stai lanciando, al massimo fino al 7: con 3 poteri di Forza, in un lancio di Forza lo paghi dal livello 4; con 5 di Tempo, in un lancio di Tempo dal 6.",
    "attivo": "Per un lancio vai oltre: per ogni Quintessenza che paghi, l'Ambito scelto non lo paghi per un livello in più.",
    "passivo": "All'acquisto scegli un Ambito, uno solo. Nei tuoi lanci non lo paghi fino al livello pari ai poteri che conosci nella Sfera che stai lanciando, al massimo fino al 7: con 3 poteri di Forza, in un lancio di Forza lo paghi dal livello 4; con 5 di Tempo, in un lancio di Tempo dal 6.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "(da scrivere)",
    "cost": "1 Quintessenza per livello in più",
    "costValue": 0,
    "uses": null,
    "paradox": "Segue il lancio in tutte e due le forme.",
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
        "nota": "Nei tuoi lanci non lo paghi fino al livello pari ai poteri che conosci nella Sfera che stai lanciando, al massimo fino al 7"
      },
      {
        "mode": "attivo",
        "on": "nota",
        "roll": "magick",
        "nota": "per ogni Quintessenza che paghi, l'Ambito scelto non lo paghi per un livello in più"
      }
    ],
    "scelta": {
      "kind": "ambito",
      "options": {
        "correspondence": [
          "targets",
          "conditions",
          "duration",
          "range",
          "potency",
          "precision"
        ],
        "entropy": [
          "targets",
          "conditions",
          "duration",
          "range",
          "potency",
          "precision"
        ],
        "forces": [
          "targets",
          "conditions",
          "duration",
          "range",
          "potency",
          "precision"
        ],
        "matter": [
          "targets",
          "conditions",
          "duration",
          "range",
          "potency",
          "precision"
        ],
        "mind": [
          "targets",
          "conditions",
          "duration",
          "range",
          "potency",
          "precision"
        ],
        "time": [
          "targets",
          "conditions",
          "duration",
          "range",
          "potency",
          "precision"
        ],
        "life": [
          "targets",
          "conditions",
          "duration",
          "range",
          "potency",
          "precision"
        ]
      }
    },
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza per livello in più",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "rigenerazione",
    "spheres": [
      "mind",
      "life"
    ],
    "name": "Rigenerazione",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza): Il passivo scatta subito, senza aspettare il cambio di scena.\n\nEffetto passivo (Al cambio di scena): Guarisci tanti danni superficiali quanti sono i poteri che conosci in Vita, se sono fisici, o in Mente, se sono mentali. Puoi spenderne 2 per guarire 1 danno aggravato.\nCon Primordio: guarisci anche le caselle bloccate dal Paradosso.\nCon Tempo: guarisci il doppio.",
    "attivo": "Il passivo scatta subito, senza aspettare il cambio di scena.",
    "passivo": "Guarisci tanti danni superficiali quanti sono i poteri che conosci in Vita, se sono fisici, o in Mente, se sono mentali. Puoi spenderne 2 per guarire 1 danno aggravato.\nCon Primordio: guarisci anche le caselle bloccate dal Paradosso.\nCon Tempo: guarisci il doppio.",
    "amalgama": "",
    "amalgam": "prime",
    "amalgams": [
      "prime",
      "time"
    ],
    "amalgamText": "",
    "flavor": "«Sai che ti farai male, almeno, sei già pronto!»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": null,
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
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza",
    "cadenzaPassivo": "Al cambio di scena",
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
    "text": "Effetto attivo (2 Quintessenza, poi 3, poi 4): Fai ritirare un tiro a un compagno, o lo ritiri tu. Nella stessa sessione, ogni volta che lo usi il costo sale di 1: la prima volta 2 Quintessenza, la seconda 3, la terza 4, e così via.\n\nEffetto passivo (Una volta per sessione): Ritiri un dado gratis, senza dichiararlo prima.",
    "attivo": "Fai ritirare un tiro a un compagno, o lo ritiri tu. Nella stessa sessione, ogni volta che lo usi il costo sale di 1: la prima volta 2 Quintessenza, la seconda 3, la terza 4, e così via.",
    "passivo": "Ritiri un dado gratis, senza dichiararlo prima.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Il primo tiro era una prova.»",
    "cost": "2 Quintessenza, poi 3, poi 4",
    "costValue": 0,
    "uses": null,
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
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza, poi 3, poi 4",
    "cadenzaPassivo": "Una volta per sessione",
    "costoVariabile": {
      "min": 2,
      "max": 0
    }
  },
  {
    "id": "disfare",
    "spheres": [
      "any"
    ],
    "name": "Disfare",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Quintessenza pari alla distanza): Disfi un effetto di Magick, se conosci più della metà delle Sfere che usa (su tre, almeno due). Paghi 1 Quintessenza per ogni punto fra la sua soglia e i poteri che conosci nella più alta delle sue Sfere che hai; se ci arrivi già, 1 Quintessenza.\n\nEffetto passivo (Sempre): Senti gli effetti di Magick in atto intorno a te, e a grandi linee che soglia hanno.",
    "attivo": "Disfi un effetto di Magick, se conosci più della metà delle Sfere che usa (su tre, almeno due). Paghi 1 Quintessenza per ogni punto fra la sua soglia e i poteri che conosci nella più alta delle sue Sfere che hai; se ci arrivi già, 1 Quintessenza.",
    "passivo": "Senti gli effetti di Magick in atto intorno a te, e a grandi linee che soglia hanno.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "Quintessenza pari alla distanza",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Generali",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 3
      }
    ],
    "rifatto": true,
    "costoAttivo": "Quintessenza pari alla distanza",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
  },
  {
    "id": "anonimo",
    "spheres": [
      "any"
    ],
    "name": "Anonimo",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza a effetto, o pari all'Area): Cancelli le tracce che hai lasciato: 2 Quintessenza per ogni tuo effetto di cui le cancelli, oppure Quintessenza pari al livello d'Area del posto in cui sei, e le cancelli tutte lì.\n\nEffetto passivo (Sempre): Chi cerca le tracce della tua Magick (la Risonanza, i residui, un'indagine etc..) non arriva a te, a meno che non sia Magick con una soglia più alta dei poteri che conosci nella Sfera.",
    "attivo": "Cancelli le tracce che hai lasciato: 2 Quintessenza per ogni tuo effetto di cui le cancelli, oppure Quintessenza pari al livello d'Area del posto in cui sei, e le cancelli tutte lì.",
    "passivo": "Chi cerca le tracce della tua Magick (la Risonanza, i residui, un'indagine etc..) non arriva a te, a meno che non sia Magick con una soglia più alta dei poteri che conosci nella Sfera.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "2 Quintessenza a effetto, o pari all'Area",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Generali",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 3
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza a effetto, o pari all'Area",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 2,
      "max": 0
    }
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
      "mind"
    ],
    "name": "Miraggio",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (Quintessenza pari alla Precisione, o ai Bersagli): Crei un'illusione che si vede, si sente e si tocca, e dura la scena: una cosa che non c'è (un'ombra dietro la finestra, una voce oltre la porta, una porta dove c'era il muro etc..). Più poteri conosci in Mente, più può essere complessa: con 2 o 3 una cosa ferma (un muro, una cassa, un cartello), con 4 o 5 una cosa che si muove o fa rumore (un cane che abbaia, un'auto che passa), da 6 una persona che parla e risponde, o una scena intera. Se è su un oggetto o una cosa semplice paghi la Precisione, cioè quanto è fedele, e il livello lo fissa il Narratore; se copre un'area paghi i Bersagli, cioè quante persone la vedono. Invece di una cosa sola puoi spargere piccole allucinazioni ai margini dei sensi (un sussurro, un movimento con la coda dell'occhio, un odore che passa): chi le subisce è Confuso per la scena, e paghi 1 Quintessenza a persona. Chi ha un motivo per dubitarne (la tocca a lungo, ci passa attraverso, la mette alla prova) può scoprire l'inganno: il tiro lo sceglie il Narratore (per esempio Fermezza + Allerta, contro una soglia pari al tuo Areté più i poteri che conosci in Mente).\nCon Forza: è luce e suono veri: la vedono tutti, anche le telecamere.\nCon Tempo: è una scena di ieri che non è andata così, per chi guarda nel passato.\nCon Corrispondenza: la metti in un posto che vedi da lontano.\n\nEffetto passivo (Sempre): Un oggetto che tieni con te (un tesserino, una valigetta, la pistola che hai in mano etc..) sembra un altro a chi lo guarda: il biglietto del tram è un pass, la pistola un ombrello. Uno alla volta, e non per forza piccolo. Chi lo prende in mano e lo guarda bene vede quello che è.",
    "attivo": "Crei un'illusione che si vede, si sente e si tocca, e dura la scena: una cosa che non c'è (un'ombra dietro la finestra, una voce oltre la porta, una porta dove c'era il muro etc..). Più poteri conosci in Mente, più può essere complessa: con 2 o 3 una cosa ferma (un muro, una cassa, un cartello), con 4 o 5 una cosa che si muove o fa rumore (un cane che abbaia, un'auto che passa), da 6 una persona che parla e risponde, o una scena intera. Se è su un oggetto o una cosa semplice paghi la Precisione, cioè quanto è fedele, e il livello lo fissa il Narratore; se copre un'area paghi i Bersagli, cioè quante persone la vedono. Invece di una cosa sola puoi spargere piccole allucinazioni ai margini dei sensi (un sussurro, un movimento con la coda dell'occhio, un odore che passa): chi le subisce è Confuso per la scena, e paghi 1 Quintessenza a persona. Chi ha un motivo per dubitarne (la tocca a lungo, ci passa attraverso, la mette alla prova) può scoprire l'inganno: il tiro lo sceglie il Narratore (per esempio Fermezza + Allerta, contro una soglia pari al tuo Areté più i poteri che conosci in Mente).\nCon Forza: è luce e suono veri: la vedono tutti, anche le telecamere.\nCon Tempo: è una scena di ieri che non è andata così, per chi guarda nel passato.\nCon Corrispondenza: la metti in un posto che vedi da lontano.",
    "passivo": "Un oggetto che tieni con te (un tesserino, una valigetta, la pistola che hai in mano etc..) sembra un altro a chi lo guarda: il biglietto del tram è un pass, la pistola un ombrello. Uno alla volta, e non per forza piccolo. Chi lo prende in mano e lo guarda bene vede quello che è.",
    "amalgama": "",
    "amalgam": "forces",
    "amalgams": [
      "forces",
      "time",
      "correspondence"
    ],
    "amalgamText": "",
    "flavor": "«Guarda meglio. No, ancora meglio.»",
    "cost": "Quintessenza pari alla Precisione, o ai Bersagli",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo (Volgare con Forza, se qualcuno guarda), nessuno effetto passivo.",
    "formula": "ingannare",
    "formulaName": "Ingannare",
    "link": "proposta",
    "page": "Mente",
    "hooks": [
      "tiro",
      "quintessenza"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "Quintessenza pari alla Precisione, o ai Bersagli",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 0,
      "max": 0
    }
  },
  {
    "id": "dimenticato",
    "spheres": [
      "mind"
    ],
    "name": "Dimenticato",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza, più 1 per ogni punto di soglia che ti manca): Scegli come ti dimentica una persona (non ricorda il tuo volto, ti ricorda come un altro, scorda quello che hai fatto etc..). Se la sua soglia mentale è più alta dei poteri che conosci in Mente, paghi 1 Quintessenza in più per ogni punto di differenza.\n\nEffetto passivo (Sempre): Chi non ti conosce già, finita la scena, si scorda il tuo volto e il tuo nome, a meno che tu non voglia.",
    "attivo": "Scegli come ti dimentica una persona (non ricorda il tuo volto, ti ricorda come un altro, scorda quello che hai fatto etc..). Se la sua soglia mentale è più alta dei poteri che conosci in Mente, paghi 1 Quintessenza in più per ogni punto di differenza.",
    "passivo": "Chi non ti conosce già, finita la scena, si scorda il tuo volto e il tuo nome, a meno che tu non voglia.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza, più 1 per ogni punto di soglia che ti manca",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Mente",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 4
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza, più 1 per ogni punto di soglia che ti manca",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "lettore-d-aure",
    "spheres": [
      "mind",
      "spirit"
    ],
    "name": "Lettore d'aure",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Leggi l'aura fino in fondo: il Narratore ti dice che creatura è (un vampiro, uno spirito, un mutaforma etc..).\nCon Mente: distingui anche cosa prova in quel momento (paura, rabbia, fame, desiderio etc..).\n\nEffetto passivo (Sempre): Quando hai davanti una creatura, ne vedi l'aura: hai un'idea di cosa sia, e se non è una persona lo sai di sicuro.",
    "attivo": "Leggi l'aura fino in fondo: il Narratore ti dice che creatura è (un vampiro, uno spirito, un mutaforma etc..).\nCon Mente: distingui anche cosa prova in quel momento (paura, rabbia, fame, desiderio etc..).",
    "passivo": "Quando hai davanti una creatura, ne vedi l'aura: hai un'idea di cosa sia, e se non è una persona lo sai di sicuro.",
    "amalgama": "",
    "amalgam": "mind",
    "amalgams": [
      "mind"
    ],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Mente",
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
    "id": "doppio-senso",
    "spheres": [
      "mind"
    ],
    "name": "Doppio senso",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza a persona): Per la scena, quando parli, le persone che scegli sentono un'altra frase, quella che vuoi tu, mentre gli altri sentono il discorso di sempre. Paghi 1 Quintessenza per ogni persona che deve capire. Chi non è dei tuoi e sospetta qualcosa può accorgersi che c'è un secondo messaggio, ma non di cosa dice: il tiro lo sceglie il Narratore, secondo il caso (per esempio Prontezza + Allerta, contro una soglia pari ai poteri che conosci in Mente).\n\nEffetto passivo (Sempre): Capisci quando una frase ha un secondo senso, e quale: una minaccia velata, un messaggio in codice, un invito che non è un invito. Quando lo usi (rispondi a tono, smascheri il messaggio, parli in codice), nei tiri di Abilità hai 2 dadi in più.",
    "attivo": "Per la scena, quando parli, le persone che scegli sentono un'altra frase, quella che vuoi tu, mentre gli altri sentono il discorso di sempre. Paghi 1 Quintessenza per ogni persona che deve capire. Chi non è dei tuoi e sospetta qualcosa può accorgersi che c'è un secondo messaggio, ma non di cosa dice: il tiro lo sceglie il Narratore, secondo il caso (per esempio Prontezza + Allerta, contro una soglia pari ai poteri che conosci in Mente).",
    "passivo": "Capisci quando una frase ha un secondo senso, e quale: una minaccia velata, un messaggio in codice, un invito che non è un invito. Quando lo usi (rispondi a tono, smascheri il messaggio, parli in codice), nei tiri di Abilità hai 2 dadi in più.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza a persona",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Mente",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": null,
    "rifatto": true,
    "costoAttivo": "1 Quintessenza a persona",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "ammaliare",
    "spheres": [
      "mind"
    ],
    "name": "Ammaliare",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza): Per la scena, nei tiri sociali hai 2 dadi in più anche con chi ti è ostile: chi ti odia, chi ti teme, chi ha già deciso di dirti di no.\n\nEffetto passivo (Sempre): Quando tiri per convincere qualcuno (persuadere, sedurre, trattare etc..), le tue Specialità valgono doppio: ti danno il doppio dei dadi.",
    "attivo": "Per la scena, nei tiri sociali hai 2 dadi in più anche con chi ti è ostile: chi ti odia, chi ti teme, chi ha già deciso di dirti di no.",
    "passivo": "Quando tiri per convincere qualcuno (persuadere, sedurre, trattare etc..), le tue Specialità valgono doppio: ti danno il doppio dei dadi.",
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
    "page": "Mente",
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
    "id": "telepatia",
    "spheres": [
      "mind"
    ],
    "name": "Telepatia",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza, più la soglia che ti manca, più la Precisione): Senti per la scena i pensieri di superficie di una persona che vedi: quello che pensa in quel momento, a parole o a immagini (ha paura, mente sul nome, pensa alla pistola nel cassetto etc..). Se la sua soglia mentale è più alta dei poteri che conosci in Mente, paghi 1 Quintessenza in più per ogni punto di differenza. Per andare più a fondo (un nome, un posto, un ricordo, quello che sa e non sta pensando) paghi anche la Precisione: il Narratore fissa il livello, da 1 a 7. Non se ne accorge, a meno che non conosca anche lui Mente.\n\nEffetto passivo (Sempre): Parli mente a mente coi compagni che vedi: frasi brevi, immagini, sensazioni. Loro ti rispondono allo stesso modo, se vogliono, e nessun altro vi sente.",
    "attivo": "Senti per la scena i pensieri di superficie di una persona che vedi: quello che pensa in quel momento, a parole o a immagini (ha paura, mente sul nome, pensa alla pistola nel cassetto etc..). Se la sua soglia mentale è più alta dei poteri che conosci in Mente, paghi 1 Quintessenza in più per ogni punto di differenza. Per andare più a fondo (un nome, un posto, un ricordo, quello che sa e non sta pensando) paghi anche la Precisione: il Narratore fissa il livello, da 1 a 7. Non se ne accorge, a meno che non conosca anche lui Mente.",
    "passivo": "Parli mente a mente coi compagni che vedi: frasi brevi, immagini, sensazioni. Loro ti rispondono allo stesso modo, se vogliono, e nessun altro vi sente.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza, più la soglia che ti manca, più la Precisione",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Mente",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza, più la soglia che ti manca, più la Precisione",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "ordine",
    "spheres": [
      "mind"
    ],
    "name": "Ordine",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza, più 1 per ogni punto di soglia che ti manca): Dai un ordine di una frase a una persona che può capirti (fermati, lascia la pistola, aprimi, vattene etc..): lo deve eseguire, alla lettera, nel suo prossimo momento, se la sua soglia mentale è pari o più bassa dei poteri che conosci in Mente; se è più alta, paghi 1 Quintessenza in più per ogni punto di differenza. Non gli fai dire quello che nasconde, e non lo mandi a farsi male. L'ordine può anche essere «fai il contrario»: dice o fa l'opposto di quello che voleva. Con 1 Quintessenza in più l'ordine aspetta un segnale (una parola, un'ora, una persona che entra) e scatta quando arriva, entro la sessione; con 1 in più a persona lo prendono altri che ti sentono.\n\nEffetto passivo (Sempre): Chi sta eseguendo un tuo ordine, o ti deve obbedienza (un tuo dipendente, un soldato del tuo reparto, il tuo autista etc..), resta tuo: chi prova a fargli fare altro (con un ordine, un potere, la Magick) deve superare la tua soglia, pari ai poteri che conosci in Mente, e non la sua.",
    "attivo": "Dai un ordine di una frase a una persona che può capirti (fermati, lascia la pistola, aprimi, vattene etc..): lo deve eseguire, alla lettera, nel suo prossimo momento, se la sua soglia mentale è pari o più bassa dei poteri che conosci in Mente; se è più alta, paghi 1 Quintessenza in più per ogni punto di differenza. Non gli fai dire quello che nasconde, e non lo mandi a farsi male. L'ordine può anche essere «fai il contrario»: dice o fa l'opposto di quello che voleva. Con 1 Quintessenza in più l'ordine aspetta un segnale (una parola, un'ora, una persona che entra) e scatta quando arriva, entro la sessione; con 1 in più a persona lo prendono altri che ti sentono.",
    "passivo": "Chi sta eseguendo un tuo ordine, o ti deve obbedienza (un tuo dipendente, un soldato del tuo reparto, il tuo autista etc..), resta tuo: chi prova a fargli fare altro (con un ordine, un potere, la Magick) deve superare la tua soglia, pari ai poteri che conosci in Mente, e non la sua.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza, più 1 per ogni punto di soglia che ti manca",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Mente",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza, più 1 per ogni punto di soglia che ti manca",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "faccia-qualunque",
    "spheres": [
      "mind"
    ],
    "name": "Faccia qualunque",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza, più 1 a compagno): Per la scena, agli occhi e alle orecchie di chi ti incontra sei un'altra persona, quella che scegli tu: un volto che hai visto, una divisa, un'età diversa, e anche la voce è la sua. Con 1 Quintessenza in più a compagno copri anche chi ti sta vicino, ognuno con la faccia che sceglie. Chi ti conosce bene e ti parla da vicino può accorgersene: il tiro lo sceglie il Narratore (per esempio Prontezza + Allerta, contro una soglia pari ai poteri che conosci in Mente). Le telecamere vedono te: l'inganno sta nella testa di chi guarda.\n\nEffetto passivo (Sempre): Dove c'è gente sembri uno che ci sta (il cameriere a una festa, l'impiegato in ufficio, l'operaio in cantiere etc..): finché fai quello che farebbe lui, nessuno ti chiede chi sei. Non ti dà un tesserino: a un controllo dei documenti sei quello che sei.",
    "attivo": "Per la scena, agli occhi e alle orecchie di chi ti incontra sei un'altra persona, quella che scegli tu: un volto che hai visto, una divisa, un'età diversa, e anche la voce è la sua. Con 1 Quintessenza in più a compagno copri anche chi ti sta vicino, ognuno con la faccia che sceglie. Chi ti conosce bene e ti parla da vicino può accorgersene: il tiro lo sceglie il Narratore (per esempio Prontezza + Allerta, contro una soglia pari ai poteri che conosci in Mente). Le telecamere vedono te: l'inganno sta nella testa di chi guarda.",
    "passivo": "Dove c'è gente sembri uno che ci sta (il cameriere a una festa, l'impiegato in ufficio, l'operaio in cantiere etc..): finché fai quello che farebbe lui, nessuno ti chiede chi sei. Non ti dà un tesserino: a un controllo dei documenti sei quello che sei.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza, più 1 a compagno",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Mente",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza, più 1 a compagno",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "sguardo-paralizzante",
    "spheres": [
      "mind"
    ],
    "name": "Sguardo paralizzante",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (1 Quintessenza, più 1 per ogni punto di soglia che ti manca): Agganci lo sguardo di una persona che ti guarda e le infliggi una Condizione mentale che uno sguardo può dare (Intimorita, Confusa, Emotiva etc..), fino a fine scena. Se la sua soglia mentale è più alta dei poteri che conosci in Mente, paghi 1 Quintessenza in più per ogni punto di differenza.\n\nEffetto passivo (Sempre): Quando vuoi l'attenzione delle persone, ce l'hai: ti guardano e ti ascoltano, anche in mezzo al rumore, e finché parli non riescono a guardare altrove.",
    "attivo": "Agganci lo sguardo di una persona che ti guarda e le infliggi una Condizione mentale che uno sguardo può dare (Intimorita, Confusa, Emotiva etc..), fino a fine scena. Se la sua soglia mentale è più alta dei poteri che conosci in Mente, paghi 1 Quintessenza in più per ogni punto di differenza.",
    "passivo": "Quando vuoi l'attenzione delle persone, ce l'hai: ti guardano e ti ascoltano, anche in mezzo al rumore, e finché parli non riescono a guardare altrove.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "1 Quintessenza, più 1 per ogni punto di soglia che ti manca",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Mente",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 1
      }
    ],
    "rifatto": true,
    "costoAttivo": "1 Quintessenza, più 1 per ogni punto di soglia che ti manca",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 1,
      "max": 0
    }
  },
  {
    "id": "occhi-altrui",
    "spheres": [
      "mind"
    ],
    "name": "Occhi altrui",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza, più 1 per ogni punto di soglia che ti manca): Tocchi una persona: per la scena vedi e senti coi suoi sensi, ovunque vada, e lei non se ne accorge. Se hai un legame forte con lei non serve toccarla. Se la sua soglia mentale è più alta dei poteri che conosci in Mente, paghi 1 Quintessenza in più per ogni punto di differenza. Finché senti da due punti insieme hai 1 dado in meno in tutti i tiri. Con 1 Quintessenza in più dura fino a fine sessione.\n\nEffetto passivo (Sempre): Senti quello che sente un compagno con cui hai un legame forte, se lui vuole: vedi coi suoi occhi e senti con le sue orecchie, anche lontano, e i tuoi sensi restano tuoi.",
    "attivo": "Tocchi una persona: per la scena vedi e senti coi suoi sensi, ovunque vada, e lei non se ne accorge. Se hai un legame forte con lei non serve toccarla. Se la sua soglia mentale è più alta dei poteri che conosci in Mente, paghi 1 Quintessenza in più per ogni punto di differenza. Finché senti da due punti insieme hai 1 dado in meno in tutti i tiri. Con 1 Quintessenza in più dura fino a fine sessione.",
    "passivo": "Senti quello che sente un compagno con cui hai un legame forte, se lui vuole: vedi coi suoi occhi e senti con le sue orecchie, anche lontano, e i tuoi sensi restano tuoi.",
    "amalgama": "",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "",
    "cost": "2 Quintessenza, più 1 per ogni punto di soglia che ti manca",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Mente",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza, più 1 per ogni punto di soglia che ti manca",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 2,
      "max": 0
    }
  },
  {
    "id": "fili",
    "spheres": [
      "mind"
    ],
    "name": "Fili",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo e passivo",
    "text": "Effetto attivo (2 Quintessenza a coppia, più 1 per ogni punto di soglia che ti manca): Per la scena rinsaldi o tagli il legame fra due persone che vedi. Rinsaldato: si trattano da alleati, e quando si aiutano o si proteggono hanno 2 dadi in più. Tagliato: non si danno aiuto né dadi di Armonia, e quando provano a proteggersi hanno 2 dadi in meno. Se la soglia sociale più alta fra le due è più alta dei poteri che conosci in Mente, paghi 1 Quintessenza in più per ogni punto di differenza. Con 3 Quintessenza invece di 2 tagli una persona da tutti i suoi: per la scena non dà e non riceve aiuto, e i suoi legami forti non valgono.\nCon Entropia: il legame che rinsaldi o tagli resta così per sempre, anche quando il tempo passa.\n\nEffetto passivo (Sempre): In scena senti i legami fra le persone: chi tiene a chi, chi odia chi, chi deve qualcosa a chi. Il Narratore te lo dice a grandi linee.",
    "attivo": "Per la scena rinsaldi o tagli il legame fra due persone che vedi. Rinsaldato: si trattano da alleati, e quando si aiutano o si proteggono hanno 2 dadi in più. Tagliato: non si danno aiuto né dadi di Armonia, e quando provano a proteggersi hanno 2 dadi in meno. Se la soglia sociale più alta fra le due è più alta dei poteri che conosci in Mente, paghi 1 Quintessenza in più per ogni punto di differenza. Con 3 Quintessenza invece di 2 tagli una persona da tutti i suoi: per la scena non dà e non riceve aiuto, e i suoi legami forti non valgono.\nCon Entropia: il legame che rinsaldi o tagli resta così per sempre, anche quando il tempo passa.",
    "passivo": "In scena senti i legami fra le persone: chi tiene a chi, chi odia chi, chi deve qualcosa a chi. Il Narratore te lo dice a grandi linee.",
    "amalgama": "",
    "amalgam": "entropy",
    "amalgams": [
      "entropy"
    ],
    "amalgamText": "",
    "flavor": "",
    "cost": "2 Quintessenza a coppia, più 1 per ogni punto di soglia che ti manca",
    "costValue": 0,
    "uses": null,
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": null,
    "formulaName": "",
    "link": "",
    "page": "Mente",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": [
      {
        "numero": 2
      }
    ],
    "rifatto": true,
    "costoAttivo": "2 Quintessenza a coppia, più 1 per ogni punto di soglia che ti manca",
    "cadenzaPassivo": "Sempre",
    "costoVariabile": {
      "min": 2,
      "max": 0
    }
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
  },
  "due-mosse-avanti": {
    "name": "Due mosse avanti",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «due mosse avanti lo possiamo fondere a come da piano, perché effettivamente sono simili tra di loro»."
  },
  "casa-dolce-casa": {
    "name": "Casa dolce casa",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «con casa dolce casa, rimuovilo»."
  },
  "tabu": {
    "name": "Tabù",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «il tabù, cancellalo»."
  },
  "recupero": {
    "name": "Recupero",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «Recupero, cancellalo»."
  },
  "scuola": {
    "name": "Scuola",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «lo possiamo fondere là, con il fatto di seguire il piano. Facciamo un amalgama primordio»: entra in Come da piano, come riga di Primordio."
  },
  "terra-sacra": {
    "name": "Terra sacra",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «terra sacra, cancellalo»."
  },
  "voce-dell-avatar": {
    "name": "Voce dell'Avatar",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «Voce dell'avatar rimuovi»."
  },
  "prestito-dal-futuro": {
    "name": "Prestito dal futuro",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «Non si è preso l'effetto. Se era quello che potevi prendere o spostare una cosa da avanti o indietro, non si capisce. Cancellalo.»"
  },
  "sotto-tiro": {
    "name": "Sotto tiro",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «sai che non è un effetto di tempo? Di là l'abbiamo però già fatto in materia, cancella sottotiro»."
  },
  "contrattempo": {
    "name": "Contrattempo",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «Contrattempo come potere invece lo possiamo fondere a livello di puntuale»: entra in Puntuale, come opzione in più dell'attivo."
  },
  "l-avevo-preparata": {
    "name": "L'avevo preparata",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «l'avevo preparata. Esatto, togliela»."
  },
  "ero-gia-li": {
    "name": "Ero già lì",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «si può fondere in realtà all'altra scena che abbiamo fatto, che potevi spostarti e decidere delle scene. Possiamo già metterlo di là»: entra in Salto."
  },
  "minute-man": {
    "name": "Minute Man",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «abbiamo già fatto il potere che fa avanzare gli orologi, glielo fondiamo dietro»: entra in Quadrante."
  },
  "infermeria": {
    "name": "Infermeria",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «infermeria, toglilo, è un effetto di background»."
  },
  "stesso-sangue": {
    "name": "Stesso sangue",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «Stesso sangue cancellalo, che l'abbiamo messo prima»: lo fa il passivo di Sangue per sangue."
  },
  "canto-del-cigno": {
    "name": "Canto del cigno",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «Per quanto riguarda invece canto del cigno, rimuovilo»."
  },
  "in-piedi": {
    "name": "In piedi!",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «per invece il potere in piedi, in cancellalo»."
  },
  "duro-a-morire": {
    "name": "Duro a morire",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «Dura morire l'abbiamo fuso prima»: è il passivo di Doppio cuore."
  },
  "non-sotto-il-mio-turno": {
    "name": "Non sotto il mio turno",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «Non sotto il mio turno cancellalo»."
  },
  "incassare": {
    "name": "Incassare",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «ferro nel sangue e incassare. Vanno fusi e modellati perché così non funziona»: è dentro Ferro nel sangue."
  },
  "sentinella": {
    "name": "Sentinella",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «Sentinella in realtà lo possiamo fondersi a difendersi nella sfera»: il passivo era già in Difendersi dalla Sfera, e il compagno coperto entra nel suo attivo."
  },
  "bussola-doppia": {
    "name": "Bussola doppia",
    "data": "1/10/2026",
    "motivo": "Blue, 1/10: «Per la bussola doppia, l'effetto passivo, ok, ma l'effetto attivo... Non mi piace, perché vai a condizionare le convinzioni. Quindi, bussola doppia, cancellalo»."
  }
});

/** L'impronta del catalogo: cambia quando cambia un potere, e allora le schede si riallineano (poteri-allinea.js). */
export const POTERI_VERSIONE = "b0b0d4a3";
