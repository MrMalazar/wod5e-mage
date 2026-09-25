// GENERATO da tools/genera-dati.mjs (sorgenti: tools/dati/poteri.json, dal libretto dei poteri e dai poteri nuovi del 23-24/9;
// tools/dati/effetti_poteri.json, gli effetti sul tiro scritti a mano dal testo, tappa 3 del 24/9;
// tools/dati/prerequisiti_poteri.json, i prerequisiti d'acquisto, 25/9).
// Non si scrive a mano. Il catalogo dei poteri delle Sfere: ogni voce ha le Sfere che la aprono
// (`spheres`, con "any" per Qualsiasi), la matrice di provenienza, il testo intero, il costo in
// Quintessenza, il limite d'uso, `effects` (gli effetti sul tiro: poteri.js li applica), `scelta`
// (cosa il giocatore sceglie all'acquisto: un Ambito, un'Abilità, un incantesimo) e `prerequisiti`
// (le condizioni d'acquisto, una per riga: numero, potere o testo; null = nessuna).
export const POTERI = Object.freeze([
  {
    "id": "da-qualche-parte",
    "spheres": [
      "correspondence"
    ],
    "name": "Da qualche parte",
    "dot": 1,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Quando ti nascondi in scena non dichiari dove sei: scegli il punto esatto quando agisci o quando qualcuno ti trova, purché ci potessi arrivare.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Mi cercavi? Ero qui.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "varcare",
    "formulaName": "Varcare",
    "link": "verbo",
    "page": "Corrispondenza",
    "hooks": [],
    "effects": [],
    "scelta": null,
    "prerequisiti": null
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
    "text": "Effetto attivo: Azione minore: recuperi all'istante un oggetto dall'inventario.\nPaga 2 Quintessenza: per una scena la tasca vale anche per un contenitore grande quanto un baule.\n\nEffetto passivo: Accesso con Corrispondenza: nelle tue tasche hai sempre più di quello che la gente possa immaginare: accumuli infiniti oggetti senza considerare il peso, purché entrino nella tasca. Con Corrispondenza 3 valgono anche contenitori come uno zaino. La riserva di spazio è una sola, a prescindere da quanti jeans o zaini cambi. Quello che nascondi nella tasca o in uno spazio piegato, nessun tiro di Allerta o Investigare lo trova; chi lo cerca con la Magick tira all'8 (Tasca doppia).\n\nEffetto Amalgama: Accesso con Materia: l'oggetto è troppo grande? Si può ridimensionare: nella tasca entra anche quello che è più grande di lei (un fucile, una sedia, una bicicletta).\nAccesso con Primordio: hai di tutto in tasca, anche quello che non c'era prima: una volta per scena tiri fuori un oggetto comune che non ci avevi messo (una torcia, una corda, un accendino).\nAccesso con Tempo: ma quello non è lo stesso snack di 5 minuti fa? Una volta per scena ritrovi in tasca una cosa che hai appena consumato (lo snack, la sigaretta, la gomma da masticare).",
    "amalgam": "matter",
    "amalgams": [
      "matter",
      "prime",
      "time"
    ],
    "amalgamText": "Accesso con Materia: l'oggetto è troppo grande? Si può ridimensionare: nella tasca entra anche quello che è più grande di lei (un fucile, una sedia, una bicicletta).\nAccesso con Primordio: hai di tutto in tasca, anche quello che non c'era prima: una volta per scena tiri fuori un oggetto comune che non ci avevi messo (una torcia, una corda, un accendino).\nAccesso con Tempo: ma quello non è lo stesso snack di 5 minuti fa? Una volta per scena ritrovi in tasca una cosa che hai appena consumato (lo snack, la sigaretta, la gomma da masticare).",
    "flavor": "«Le tue tasche sono più grandi di casa tua.»",
    "cost": "2 Quintessenza",
    "costValue": 2,
    "uses": {
      "per": "scena",
      "n": 1
    },
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
    "prerequisiti": null
  },
  {
    "id": "torna-sempre",
    "spheres": [
      "correspondence",
      "matter"
    ],
    "name": "Torna sempre",
    "dot": 1,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Un oggetto tuo che perdi o che ti rubano torna da te entro la sessione dopo. Come torna lo decide il Narratore (te lo riporta qualcuno, lo ritrovi dove non l'avevi lasciato, arriva per posta).",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Quello che è mio torna da me.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, basso rischio effetto passivo.",
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
    "prerequisiti": null
  },
  {
    "id": "armonia-a-distanza",
    "spheres": [
      "correspondence"
    ],
    "name": "Armonia a distanza",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Dai e ricevi dadi di Armonia con compagni che non sono in scena, nei tiri di Abilità. Il tetto di 3 resta.\n\nEffetto Amalgama: Accesso con Primordio: i dadi di Armonia a distanza valgono anche nei lanci di Magick.",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "Accesso con Primordio: i dadi di Armonia a distanza valgono anche nei lanci di Magick.",
    "flavor": "«Non serve che io sia lì.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo; con Primordio segue il lancio.",
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
        "roll": "abilita",
        "nota": "Dai e ricevi dadi di Armonia con compagni che non sono in scena, nei tiri di Abilità. Il tetto di 3 resta."
      },
      {
        "on": "nota",
        "roll": "magick",
        "requires": "prime",
        "nota": "Accesso con Primordio: i dadi di Armonia a distanza valgono anche nei lanci di Magick."
      }
    ],
    "scelta": null,
    "prerequisiti": null
  },
  {
    "id": "conosco-un-posto",
    "spheres": [
      "correspondence"
    ],
    "name": "Conosco un posto",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione dichiari che conosci in città un posto che serve al gruppo (un rifugio, un'uscita sul retro, un passaggio): il Narratore lo fa esistere dove ha senso.\n\nEffetto Amalgama: Accesso con Entropia: il posto c'è per caso anche dove non sei mai stato.",
    "amalgam": "entropy",
    "amalgams": [
      "entropy"
    ],
    "amalgamText": "Accesso con Entropia: il posto c'è per caso anche dove non sei mai stato.",
    "flavor": "«Fidati, conosco un posto.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
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
    "prerequisiti": null
  },
  {
    "id": "planimetria",
    "spheres": [
      "correspondence"
    ],
    "name": "Planimetria",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena un dettaglio già descritto della pianta del luogo diventa un altro (la porta è una finestra, la scala sta dall'altra parte, il condotto è più largo). Il Narratore adatta il resto della scena.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Quella non è una porta, è una finestra.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
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
    "prerequisiti": null
  },
  {
    "id": "rifornimento",
    "spheres": [
      "correspondence",
      "matter"
    ],
    "name": "Rifornimento",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione il gruppo si rifornisce come se passasse dal Santuario (munizioni, medicine, vestiti).",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Munizioni, garze, un cambio pulito: ci sono.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
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
    "prerequisiti": null
  },
  {
    "id": "schieramento",
    "spheres": [
      "correspondence"
    ],
    "name": "Schieramento",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: All'inizio di uno scontro, prima del primo turno, metti ogni compagno dove vuoi, entro pochi metri da dov'era.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Tu a sinistra, lei dietro di me.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
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
    "prerequisiti": null
  },
  {
    "id": "pedina",
    "spheres": [
      "correspondence"
    ],
    "name": "Pedina",
    "dot": 3,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: All'inizio di uno scontro metti un nemico dove vuoi, purché ci sia potuto arrivare.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Sei esattamente dove ti volevo.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
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
    "prerequisiti": null
  },
  {
    "id": "strada-facendo",
    "spheres": [
      "correspondence",
      "time"
    ],
    "name": "Strada facendo",
    "dot": 3,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: I viaggi del gruppo non fanno avanzare gli orologi del Narratore.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Il viaggio non conta, conta arrivare.»",
    "cost": "",
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
    "prerequisiti": null
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
    "prerequisiti": null
  },
  {
    "id": "uscita-d-emergenza",
    "spheres": [
      "correspondence"
    ],
    "name": "Uscita d'emergenza",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione la scena finisce col gruppo già fuori, in salvo. Il Narratore sceglie cosa è rimasto indietro (un oggetto, un indizio, un PNG).",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Fuori. Adesso.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
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
    "prerequisiti": null
  },
  {
    "id": "colpo-di-fortuna",
    "spheres": [
      "entropy"
    ],
    "name": "Colpo di fortuna",
    "dot": 1,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Quando in un tuo tiro riuscito escono due 10, aggiungi un effetto a scelta: 1 danno in più, una Condizione al bersaglio o un'informazione dal Narratore.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Oggi gira bene.»",
    "cost": "",
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
        "nota": "Quando in un tuo tiro riuscito escono due 10, aggiungi un effetto a scelta: 1 danno in più, una Condizione al bersaglio o un'informazione dal Narratore."
      }
    ],
    "scelta": null,
    "prerequisiti": null
  },
  {
    "id": "il-dado-e-tratto",
    "spheres": [
      "entropy"
    ],
    "name": "Il dado è tratto",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: A inizio sessione tiri un dado e lo metti da parte. Una volta nella sessione, a tiro fatto, lo metti al posto di un dado di chiunque in un tiro di Abilità, anche di un nemico.\n\nEffetto Amalgama: Accesso con Primordio: vale anche nei lanci di Magick.",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "Accesso con Primordio: vale anche nei lanci di Magick.",
    "flavor": "«Questo lo tengo da parte.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
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
    "prerequisiti": null
  },
  {
    "id": "inseparabili",
    "spheres": [
      "entropy"
    ],
    "name": "Inseparabili",
    "dot": 1,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: A inizio sessione scegli un compagno: il Narratore non vi divide in scene diverse se voi non volete.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Dove vai tu, vengo io.»",
    "cost": "",
    "costValue": 0,
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
    "prerequisiti": null
  },
  {
    "id": "non-tutto-il-male",
    "spheres": [
      "entropy"
    ],
    "name": "Non tutto il male",
    "dot": 1,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Quando paghi un Prezzo, il Narratore ti dà anche un piccolo vantaggio (un'informazione, un'occasione, un oggetto).",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Almeno una cosa buona c'è.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
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
    "prerequisiti": null
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
    "text": "Effetto attivo: Una volta per scena, prima di un tiro di Abilità, dichiari pari o dispari: se il primo dado ti dà ragione hai 2 dadi in più al tuo prossimo tiro, se no 2 in meno.\n\nEffetto passivo: Negli scontri di dadi (iniziativa, contese) vinci i pareggi.\n\nEffetto Amalgama: Accesso con Primordio: l'effetto attivo vale anche per i lanci di Magick.",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "Accesso con Primordio: l'effetto attivo vale anche per i lanci di Magick.",
    "flavor": "«Pari o dispari, e via.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
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
        "nota": "Una volta per scena, prima di un tiro di Abilità, dichiari pari o dispari: se il primo dado ti dà ragione hai 2 dadi in più al tuo prossimo tiro, se no 2 in meno."
      },
      {
        "mode": "attivo",
        "on": "nota",
        "roll": "magick",
        "requires": "prime",
        "nota": "Accesso con Primordio: l'effetto attivo vale anche per i lanci di Magick."
      },
      {
        "on": "nota",
        "roll": "any",
        "nota": "Negli scontri di dadi (iniziativa, contese) vinci i pareggi."
      }
    ],
    "scelta": null,
    "prerequisiti": null
  },
  {
    "id": "angolo-morto",
    "spheres": [
      "entropy"
    ],
    "name": "Angolo morto",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena, quando ti sparano, dichiari che fra te e chi spara c'è qualcosa in mezzo (una colonna, un'auto, un bancone): l'attacco non parte, e per spararti deve prima spendere un'azione a spostarsi.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Per fortuna c'era la colonna.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
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
    "prerequisiti": null
  },
  {
    "id": "chi-la-fa-l-aspetti",
    "spheres": [
      "entropy"
    ],
    "name": "Chi la fa l'aspetti",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Segni chi ti ha ferito. Quando lo riaffronti, il Narratore ti dà un vantaggio su di lui (un punto debole, un'occasione, un alleato).",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Me lo ricordo, il tuo nome.»",
    "cost": "",
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
    "prerequisiti": null
  },
  {
    "id": "fortuna-del-principiante",
    "spheres": [
      "entropy"
    ],
    "name": "Fortuna del principiante",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione un tiro di un'Abilità in cui hai un solo pallino riesce.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Non l'avevo mai fatto prima.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
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
        "mode": "attivo",
        "on": "autoSuccess",
        "roll": "abilita",
        "when": "abilita1",
        "nota": "Una volta per sessione un tiro di un'Abilità in cui hai un solo pallino riesce."
      }
    ],
    "scelta": null,
    "prerequisiti": null
  },
  {
    "id": "il-banco-vince",
    "spheres": [
      "entropy"
    ],
    "name": "Il banco vince",
    "dot": 2,
    "type": "",
    "kind": "",
    "text": "Effetto Amalgama: Accesso con Primordio: quando a qualcun altro in scena scoppia un dado rosso, prendi 1 Quintessenza.",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "Accesso con Primordio: quando a qualcun altro in scena scoppia un dado rosso, prendi 1 Quintessenza.",
    "flavor": "«Il banco vince sempre.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "drenare",
    "formulaName": "Drenare",
    "link": "regola",
    "page": "Entropia",
    "hooks": [
      "tiro",
      "quintessenza",
      "paradosso",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
  },
  {
    "id": "si-trova-tutto",
    "spheres": [
      "entropy"
    ],
    "name": "Si trova tutto",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Fra una sessione e l'altra trovi l'oggetto che cerchi. Il Narratore ti dice il prezzo, in soldi o in un favore.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Ho un cugino che ce l'ha.»",
    "cost": "",
    "costValue": 0,
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
    "prerequisiti": null
  },
  {
    "id": "tiri-gemelli",
    "spheres": [
      "entropy"
    ],
    "name": "Tiri gemelli",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena leghi il tuo tiro di Abilità a quello di un compagno nello stesso turno: fatti i due tiri, tutti e due valgono il migliore.\n\nEffetto Amalgama: Accesso con Primordio: vale anche se uno dei due tiri è un lancio di Magick.",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "Accesso con Primordio: vale anche se uno dei due tiri è un lancio di Magick.",
    "flavor": "«Stesso tiro, stessa sorte.»",
    "cost": "",
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
    "prerequisiti": null
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
    "prerequisiti": null
  },
  {
    "id": "fuori-dai-piedi",
    "spheres": [
      "entropy"
    ],
    "name": "Fuori dai piedi",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione nomini un PNG: salta la scena dopo, e il perché lo decide il Narratore.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Oggi non viene, fidati.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
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
    "prerequisiti": null
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
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione indichi un oggetto in scena: quando lo usi, entro la sessione, il tiro riesce.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Quel fucile sul muro, prima o poi, spara.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
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
        "mode": "attivo",
        "on": "autoSuccess",
        "roll": "any",
        "nota": "Una volta per sessione indichi un oggetto in scena: quando lo usi, entro la sessione, il tiro riesce."
      }
    ],
    "scelta": null,
    "prerequisiti": null
  },
  {
    "id": "ladro-di-fortuna",
    "spheres": [
      "entropy"
    ],
    "name": "Ladro di fortuna",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena togli un dado riuscito a un tiro di Abilità appena fatto, e lo aggiungi al tuo prossimo tiro.\n\nEffetto Amalgama: Accesso con Primordio: vale anche coi lanci di Magick, sia per togliere il dado sia per metterlo.",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "Accesso con Primordio: vale anche coi lanci di Magick, sia per togliere il dado sia per metterlo.",
    "flavor": "«Grazie, questo lo prendo io.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
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
        "mode": "attivo",
        "on": "dice",
        "value": 1,
        "roll": "abilita",
        "nota": "Una volta per scena togli un dado riuscito a un tiro di Abilità appena fatto, e lo aggiungi al tuo prossimo tiro."
      },
      {
        "mode": "attivo",
        "on": "dice",
        "value": 1,
        "roll": "magick",
        "requires": "prime",
        "nota": "Accesso con Primordio: vale anche coi lanci di Magick, sia per togliere il dado sia per metterlo."
      }
    ],
    "scelta": null,
    "prerequisiti": null
  },
  {
    "id": "lascia-o-raddoppia",
    "spheres": [
      "entropy"
    ],
    "name": "Lascia o raddoppia",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena, dopo un tiro di Abilità riuscito, ritiri. Se riesci ancora, raddoppia la parte dell'effetto che si conta (i danni, la durata, i bersagli), e cosa si può raddoppiare lo dice il Narratore; se fallisci, perdi anche la prima riuscita.\n\nEffetto Amalgama: Accesso con Primordio: vale anche dopo un lancio di Magick riuscito.",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "Accesso con Primordio: vale anche dopo un lancio di Magick riuscito.",
    "flavor": "«Tutto o niente.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo; con Primordio segue il lancio.",
    "formula": "ritoccare",
    "formulaName": "Ritoccare",
    "link": "regola",
    "page": "Entropia",
    "hooks": [
      "uso",
      "tiro",
      "salute",
      "narratore"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null
  },
  {
    "id": "porto-sfortuna-io",
    "spheres": [
      "entropy"
    ],
    "name": "Porto sfortuna io",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena un tiro di Abilità fallito di un compagno diventa riuscito. In cambio, un tuo tiro della sessione fallirà senza tirare, e il Narratore sceglie quale.\n\nEffetto Amalgama: Accesso con Primordio: vale anche per i lanci di Magick.",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "Accesso con Primordio: vale anche per i lanci di Magick.",
    "flavor": "«La sfortuna la porto io.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo; con Primordio segue il lancio.",
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
    "prerequisiti": null
  },
  {
    "id": "roulette",
    "spheres": [
      "entropy"
    ],
    "name": "Roulette",
    "dot": 3,
    "type": "",
    "kind": "",
    "text": "Effetto Amalgama: Accesso con Primordio: quando prendi Paradosso tiri un dado. Pari non lo prendi tu: va da qualche parte, e il Narratore dice dove. Dispari lo prendi doppio.",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "Accesso con Primordio: quando prendi Paradosso tiri un dado. Pari non lo prendi tu: va da qualche parte, e il Narratore dice dove. Dispari lo prendi doppio.",
    "flavor": "«Rosso o nero?»",
    "cost": "",
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
    "prerequisiti": null
  },
  {
    "id": "scommessa",
    "spheres": [
      "entropy"
    ],
    "name": "Scommessa",
    "dot": 3,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione, a inizio scena, scommetti su come finisce (chi vince, chi scappa, cosa si rompe). La posta dipende dalla Sfera d'Amalgama.\n\nEffetto Amalgama: Accesso con Primordio: se vinci prendi 3 Quintessenza, se perdi prendi 3 Paradosso.\nAccesso con Materia: se vinci prendi un oggetto, se perdi ne perdi uno.\nvinci una cosa del loro campo, a discrezione del Narratore, e se perdi ne perdi una dello stesso tipo.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "Accesso con Primordio: se vinci prendi 3 Quintessenza, se perdi prendi 3 Paradosso.\nAccesso con Materia: se vinci prendi un oggetto, se perdi ne perdi uno.\nvinci una cosa del loro campo, a discrezione del Narratore, e se perdi ne perdi una dello stesso tipo.",
    "flavor": "«Scommettiamo?»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
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
    "prerequisiti": null
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
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione, quando al gruppo manca una cosa per andare avanti (una chiave, un documento, un pezzo), ce l'hai tu, e il Narratore dice quanto ti è costata.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Cercavate questa?»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
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
    "prerequisiti": null
  },
  {
    "id": "nerf",
    "spheres": [
      "entropy"
    ],
    "name": "Nerf",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena un'azione che un nemico ha già fatto nella sessione gli fallisce, senza tiro.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Questa l'ho già vista.»",
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
      "combattimento",
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null
  },
  {
    "id": "tarocchi",
    "spheres": [
      "entropy"
    ],
    "name": "Tarocchi",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: A inizio sessione il Narratore ti dà tre carte: una persona, un luogo, un evento. Una volta nella sessione ne giochi una, e il Narratore la mette in scena.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Le carte non mentono.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
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
    "prerequisiti": null
  },
  {
    "id": "il-narratore-ti-ascolta",
    "spheres": [
      "entropy"
    ],
    "name": "Il Narratore ti ascolta",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione proponi una svolta nella scena, e il Narratore la mette in gioco. Con Entropia la svolta è un imprevisto (un incidente, un colpo di fortuna, un guasto).\n\nEffetto Amalgama: Accesso con Corrispondenza: un arrivo o una partenza.\nAccesso con Forza: un'esplosione, un blackout, un incendio.\nAccesso con Materia: un oggetto che salta fuori o che si rompe.\nAccesso con Mente: una notizia, una confessione, un'idea.\nAccesso con Primordio: un'ondata di Quintessenza o di Paradosso.\nAccesso con Spirito: una presenza, un segno, un morto che parla.\nAccesso con Tempo: un ritardo, un anticipo, una scadenza.\nAccesso con Vita: una malattia, una nascita, una ferita.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "Accesso con Corrispondenza: un arrivo o una partenza.\nAccesso con Forza: un'esplosione, un blackout, un incendio.\nAccesso con Materia: un oggetto che salta fuori o che si rompe.\nAccesso con Mente: una notizia, una confessione, un'idea.\nAccesso con Primordio: un'ondata di Quintessenza o di Paradosso.\nAccesso con Spirito: una presenza, un segno, un morto che parla.\nAccesso con Tempo: un ritardo, un anticipo, una scadenza.\nAccesso con Vita: una malattia, una nascita, una ferita.",
    "flavor": "«E se proprio adesso...»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
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
    "prerequisiti": null
  },
  {
    "id": "scambio-di-sorte",
    "spheres": [
      "entropy"
    ],
    "name": "Scambio di sorte",
    "dot": 5,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione scambi l'esito del tuo tiro di Abilità con quello di un altro in scena, anche di un nemico.\n\nEffetto Amalgama: Accesso con Primordio: vale anche per i lanci di Magick.",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "Accesso con Primordio: vale anche per i lanci di Magick.",
    "flavor": "«Facciamo cambio?»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
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
    "prerequisiti": null
  },
  {
    "id": "a-stordire",
    "spheres": [
      "forces"
    ],
    "name": "A stordire",
    "dot": 1,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Quando un tuo colpo non fa danni, puoi barattare la sua Potenza con la Condizione stordito: il bersaglio resta stordito 1 turno per livello di Potenza.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Dormi, che è meglio.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
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
    "prerequisiti": null
  },
  {
    "id": "mi-metto-in-mezzo",
    "spheres": [
      "forces"
    ],
    "name": "Mi metto in mezzo",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Quando un compagno vicino a te viene attaccato, ti metti in mezzo: l'attacco prende te al posto suo.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Dietro di me.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
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
    "prerequisiti": null
  },
  {
    "id": "brucia-ancora",
    "spheres": [
      "forces"
    ],
    "name": "Brucia ancora",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: I danni da fuoco o da elettricità che fai continuano: ogni turno il bersaglio prende la metà del danno di partenza, per difetto, finché non spende un'azione per spegnersi.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Brucia ancora, eh?»",
    "cost": "",
    "costValue": 0,
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
    "prerequisiti": null
  },
  {
    "id": "bruciature",
    "spheres": [
      "forces"
    ],
    "name": "Bruciature",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: I danni dei tuoi lanci di Forza non si curano con Medicina fino a fine scena.\n\nEffetto Amalgama: Accesso con Vita: non guariscono neanche da sole, col riposo o con le rigenerazioni, fino a fine scena.\nAccesso con Primordio: non si curano neanche con la Magick fino a fine scena.",
    "amalgam": "prime",
    "amalgams": [
      "prime",
      "life"
    ],
    "amalgamText": "Accesso con Vita: non guariscono neanche da sole, col riposo o con le rigenerazioni, fino a fine scena.\nAccesso con Primordio: non si curano neanche con la Magick fino a fine scena.",
    "flavor": "«Questa non te la chiudi tanto presto.»",
    "cost": "",
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
    "prerequisiti": null
  },
  {
    "id": "nessuno-scappa",
    "spheres": [
      "correspondence",
      "forces"
    ],
    "name": "Nessuno scappa",
    "dot": 3,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Quando un nemico prova a lasciare la scena, un tuo colpo riuscito lo tiene in scena.\nAccesso con Forza: lo butti giù o gli sbarri la strada.\nAccesso con Corrispondenza: la via di fuga non porta fuori.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Dove credi di andare?»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo; con Corrispondenza basso rischio effetto passivo.",
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
    "prerequisiti": null
  },
  {
    "id": "onda-d-urto",
    "spheres": [
      "forces"
    ],
    "name": "Onda d'urto",
    "dot": 3,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Quando un tuo colpo manda a terra il bersaglio, il danno che avanza passa al più vicino.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Uno giù, e il prossimo.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
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
    "prerequisiti": null
  },
  {
    "id": "perforante",
    "spheres": [
      "forces",
      "matter"
    ],
    "name": "Perforante",
    "dot": 3,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: I danni dei tuoi lanci di Forza o di Materia ignorano armature e riduzioni.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Il giubbotto non ti salva.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo; il passivo segue il lancio.",
    "formula": "danneggiare",
    "formulaName": "Danneggiare",
    "link": "regola",
    "page": "Forza",
    "hooks": [
      "salute"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null
  },
  {
    "id": "semplice-violenza",
    "spheres": [
      "forces"
    ],
    "name": "Semplice violenza",
    "dot": 4,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: I danni dei tuoi lanci di Forza con Potenza 3 o più sono aggravati.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Niente di elegante: solo violenza.»",
    "cost": "",
    "costValue": 0,
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
        "roll": "magick",
        "when": "potenza3",
        "nota": "I danni dei tuoi lanci di Forza con Potenza 3 o più sono aggravati."
      }
    ],
    "scelta": null,
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
  },
  {
    "id": "fai-da-te",
    "spheres": [
      "matter"
    ],
    "name": "Fai da te",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena paga 1 Quintessenza: metti insieme due oggetti in scena e ne fai uno che serve (una fionda, un grimaldello, un fumogeno), senza tirare.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Dammi due minuti e un po' di nastro.»",
    "cost": "1 Quintessenza",
    "costValue": 1,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Basso rischio effetto attivo, nessuno effetto passivo.",
    "formula": "costruire",
    "formulaName": "Costruire",
    "link": "effetto",
    "page": "Materia",
    "hooks": [
      "uso",
      "tiro",
      "quintessenza"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null
  },
  {
    "id": "il-giusto-attrezzo",
    "spheres": [
      "matter"
    ],
    "name": "Il giusto attrezzo",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena, se l'attrezzo che usi c'entra col tiro (un piede di porco, un grimaldello, un bisturi), non paghi il Prezzo della riuscita.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Serve l'attrezzo giusto.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
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
        "mode": "attivo",
        "on": "nota",
        "roll": "abilita",
        "nota": "Una volta per scena, se l'attrezzo che usi c'entra col tiro (un piede di porco, un grimaldello, un bisturi), non paghi il Prezzo della riuscita."
      }
    ],
    "scelta": null,
    "prerequisiti": null
  },
  {
    "id": "tutto-e-un-arma",
    "spheres": [
      "matter"
    ],
    "name": "Tutto è un'arma",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Un oggetto che impugni fa i danni di un'arma vera della sua misura (una bottiglia come un coltello, una sedia come una mazza, un ombrello come un bastone).",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Tutto può fare male.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "potenziare",
    "formulaName": "Potenziare",
    "link": "verbo",
    "page": "Materia",
    "hooks": [
      "salute"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null
  },
  {
    "id": "fatto-da-me",
    "spheres": [
      "matter",
      "mind"
    ],
    "name": "Fatto da me",
    "dot": 3,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Un compagno che usa un oggetto fatto da te tira con la tua Abilità al posto della sua.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«L'ho fatto io, fidati.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "potenziare",
    "formulaName": "Potenziare",
    "link": "verbo",
    "page": "Materia",
    "hooks": [
      "altri"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null
  },
  {
    "id": "opera",
    "spheres": [
      "matter"
    ],
    "name": "Opera",
    "dot": 4,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Fra una sessione e l'altra un oggetto fatto da te prende una qualità: non si inceppa, non si trova o non si rompe.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Ci ho messo le mani, e si vede.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, basso rischio per l'oggetto che non si rompe.",
    "formula": "potenziare",
    "formulaName": "Potenziare",
    "link": "verbo",
    "page": "Materia",
    "hooks": [
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null
  },
  {
    "id": "oggetto-sacrificale",
    "spheres": [
      "matter"
    ],
    "name": "Oggetto Sacrificale",
    "dot": 5,
    "type": "",
    "kind": "",
    "text": "Effetto Amalgama: Accesso con Primordio: una volta per sessione, quando un Contraccolpo scoppia, l'Ustione va su un oggetto importante per il personaggio (un ricordo, un'arma di famiglia, il suo Strumento). L'oggetto si distrugge, e non si potrà mai più ricreare.",
    "amalgam": "prime",
    "amalgams": [
      "prime"
    ],
    "amalgamText": "Accesso con Primordio: una volta per sessione, quando un Contraccolpo scoppia, l'Ustione va su un oggetto importante per il personaggio (un ricordo, un'arma di famiglia, il suo Strumento). L'oggetto si distrugge, e non si potrà mai più ricreare.",
    "flavor": "«Prendi questo, non me.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Lavora sul Contraccolpo, non ne fa di suo.",
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
    "prerequisiti": null
  },
  {
    "id": "ho-letto-qualcosa",
    "spheres": [
      "mind"
    ],
    "name": "Ho letto qualcosa",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione, in un tiro di conoscenza, hai 3 dadi in più.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«L'ho letto da qualche parte.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
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
        "mode": "attivo",
        "on": "dice",
        "value": 3,
        "roll": "abilita",
        "nota": "Una volta per sessione, in un tiro di conoscenza, hai 3 dadi in più."
      }
    ],
    "scelta": null,
    "prerequisiti": null
  },
  {
    "id": "il-mondo-e-piccolo",
    "spheres": [
      "mind"
    ],
    "name": "Il mondo è piccolo",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione un PNG appena entrato in scena è qualcuno che conosci già; il Narratore dice da dove.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Ma tu non sei...?»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
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
    "prerequisiti": null
  },
  {
    "id": "l-ho-sentito-dire",
    "spheres": [
      "mind"
    ],
    "name": "L'ho sentito dire",
    "dot": 1,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per sessione il personaggio sa una cosa che sai tu giocatore.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Me l'ha detto un uccellino.»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "sessione",
      "n": 1
    },
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
    "prerequisiti": null
  },
  {
    "id": "mai-colto-di-sorpresa",
    "spheres": [
      "mind"
    ],
    "name": "Mai colto di sorpresa",
    "dot": 1,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Negli agguati tesi da una creatura (una persona, una bestia, uno spirito) non sei mai sorpreso: nel primo turno agisci come tutti.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Ti ho sentito arrivare.»",
    "cost": "",
    "costValue": 0,
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
    "prerequisiti": null
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
    "kind": "attivo",
    "text": "Effetto attivo: Quando un compagno che vedi prende una Condizione, la prendi tu al posto suo.\nAccesso con Mente: le Condizioni mentali.\nAccesso con Vita: le Condizioni fisiche.\nAccesso con Spirito: le Condizioni soprannaturali.\n\nEffetto Amalgama: prendi le Condizioni di tutti i loro tipi.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "prendi le Condizioni di tutti i loro tipi.",
    "flavor": "«Dalla a me.»",
    "cost": "",
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
    "prerequisiti": null
  },
  {
    "id": "conto-degli-indizi",
    "spheres": [
      "mind"
    ],
    "name": "Conto degli indizi",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: A fine scena d'indagine il Narratore ti dice quanti indizi hai trovato e quanti ce n'erano, e te ne dà uno di quelli che ti sono sfuggiti.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Manca ancora qualcosa.»",
    "cost": "",
    "costValue": 0,
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
    "prerequisiti": null
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
    "prerequisiti": null
  },
  {
    "id": "pace",
    "spheres": [
      "mind",
      "spirit"
    ],
    "name": "Pace",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Se nella sessione il personaggio ha una scena di pace (una preghiera, una cena, un luogo sacro), a fine sessione:\nAccesso con Mente: recupera tutta la Volontà.\nAccesso con Spirito: cura una Macchia.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Un momento solo, per me.»",
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
      "scena"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null
  },
  {
    "id": "pane-e-sale",
    "spheres": [
      "mind"
    ],
    "name": "Pane e sale",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Chi mangia alla tua tavola non ti attacca finché non è uscito di casa tua.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Siediti, mangia qualcosa.»",
    "cost": "",
    "costValue": 0,
    "uses": null,
    "paradox": "Nessuno effetto attivo, nessuno effetto passivo.",
    "formula": "vincolare",
    "formulaName": "Vincolare",
    "link": "verbo",
    "page": "Mente",
    "hooks": [
      "combattimento"
    ],
    "effects": [],
    "scelta": null,
    "prerequisiti": null
  },
  {
    "id": "pensiero-laterale",
    "spheres": [
      "mind"
    ],
    "name": "Pensiero laterale",
    "dot": 2,
    "type": "attivo",
    "kind": "attivo",
    "text": "Effetto attivo: Una volta per scena spieghi al tavolo il ragionamento che risolve il problema per un'altra strada: se regge, tiri con l'Abilità di quella strada al posto di quella chiesta.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«E se lo guardassimo da un'altra parte?»",
    "cost": "",
    "costValue": 0,
    "uses": {
      "per": "scena",
      "n": 1
    },
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
    "prerequisiti": null
  },
  {
    "id": "valvola-di-sfogo",
    "spheres": [
      "mind"
    ],
    "name": "Valvola di sfogo",
    "dot": 2,
    "type": "passivo",
    "kind": "passivo",
    "text": "Effetto passivo: Quando prendi danni mentali, puoi prendere una Condizione (arrabbiato, distratto, scosso) al posto dei danni.",
    "amalgam": "",
    "amalgams": [],
    "amalgamText": "",
    "flavor": "«Adesso urlo, poi passa.»",
    "cost": "",
    "costValue": 0,
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "text": "Effetto passivo: Un tuo tiro sociale riuscito può infliggere una Condizione mentale (spaventato, confuso, ossessionato), senza Magick.",
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
        "nota": "Un tuo tiro sociale riuscito può infliggere una Condizione mentale (spaventato, confuso, ossessionato), senza Magick."
      }
    ],
    "scelta": null,
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "text": "Effetto passivo: Un oggetto che porti da almeno una sessione diventa una reliquia: finché lo porti, ti protegge da una Condizione che scegli tu. Se lo perdi, perdi 1 Volontà.",
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "text": "Effetto passivo: Una Condizione fisica che hai già preso nella sessione non la prendi più fino a fine sessione.",
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "text": "Effetto passivo: Accesso con Mente: quando sei sotto metà Salute, i lanci di Mente su te stesso hanno soglia meno 2 e le Condizioni mentali pregresse vengono ignorate per la scena.\nAccesso con Spirito: quando sei sotto metà Salute, i lanci di Spirito su te stesso hanno soglia meno 2 e le Condizioni soprannaturali pregresse vengono ignorate per la scena.\nAccesso con Vita: quando sei sotto metà Salute, i lanci di Vita su te stesso hanno soglia meno 2 e le Condizioni fisiche pregresse vengono ignorate per la scena.\n\nEffetto Amalgama: Per ognuna delle Sfere aggiunte ottieni la protezione dalle Condizioni di quel tipo.\nAccesso con Primordio: se le Condizioni derivano da anomalie paradossali, sono messe in pausa per la scena.",
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "text": "Effetto attivo: Paga 3 Quintessenza e una sessione di cure: togli a un compagno una cosa che la medicina dava per perduta, senza tirare. Una volta per bersaglio nella campagna.\nAccesso con Vita: una cicatrice che pesa, un arto che non regge, un aggravato che non si chiude.\nAccesso con Mente: una fobia, un vuoto di memoria, una Condizione mentale che non passa.\nAccesso con Spirito: una Macchia.\nAccesso con Tempo: come se non fosse mai successo: niente traccia, e nessun ricordo del male.\n\nEffetto Amalgama: Accesso con Primordio: vale anche su una casella bloccata dal Paradosso.",
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "text": "Effetto attivo: Paga 2 Quintessenza: un compagno che tocchi recupera subito l'ultimo danno che ha appena subito, meno uno (un colpo da tre ne rende due), senza tirare; paga 4 e uno di quei danni può essere aggravato. Una volta per scena a bersaglio.\nAccesso con Vita: ferite, veleni, febbre.\nAccesso con Mente: la Volontà, e una Condizione mentale (Spaventato, Confuso).\n\nEffetto passivo: In una scena di cure, un compagno recupera un danno superficiale in più per ogni potere che conosci nella Sfera.\n\nEffetto Amalgama: Accesso con Spirito: vale anche su uno spirito, o su un compagno posseduto.",
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
    "prerequisiti": null
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
    "prerequisiti": null
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
    "prerequisiti": null
  }
]);
