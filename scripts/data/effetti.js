// Generato da tools/build-effetti.py dalle nove tavole di Sfera del LIBRO (06_2_1 … 06_2_9): non toccare a mano.
// Il Grimorio: gli effetti del manuale, Sfera per Sfera e livello per livello, con le Sfere in più che il testo chiede.

export const EFFETTI = Object.freeze([
  {
    "id": "correspondence-1-leggere-lo-spazio",
    "name": "Leggere lo spazio",
    "sphere": "correspondence",
    "level": 1,
    "extras": [],
    "text": "La tua percezione spaziale ti consente di sentire e misurare ogni centimetro dello spazio intorno a te, rivelando nascondigli, intercapedini e via dicendo. All'opposto, sai quando ce n'è poco: se ce n'è poco, qualcosa o qualcuno lo occupa.",
    "pairings": [],
    "scopes": "Area per misurare un luogo."
  },
  {
    "id": "correspondence-1-sapere-dove-sei",
    "name": "Sapere dove sei",
    "sphere": "correspondence",
    "level": 1,
    "extras": [],
    "text": "Sai sempre dov'è casa, il nord, l'uscita: l'orientamento non ti lascia nemmeno sottoterra o al buio.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "sai dov'è «meglio» che tu sia.",
        "required": false
      }
    ],
    "scopes": "Durata 2 ti copre la scena."
  },
  {
    "id": "correspondence-1-mappare-la-zona",
    "name": "Mappare la zona",
    "sphere": "correspondence",
    "level": 1,
    "extras": [],
    "text": "Percepisci e mappi l'ambiente intorno a te. A seconda della Sfera collegata, sai anche cosa c'è di specifico.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "nodi del fato, eventi della sorte, luoghi fortunati e sfortunati etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "circuiti elettrici, fonti di calore, dove si muove l'energia etc..",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "oggetti, edifici, planimetrie, un oggetto specifico etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "un sogno specifico, quanto è propagata un'idea etc..",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Magick nell'area, dove tocca, Quintessenza etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "anime, crepe nell'Umbra, creature spirituali etc..",
        "required": false
      },
      {
        "sphere": "time",
        "text": "anomalie, alterazioni del flusso nell'ambiente etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "insetti, piante, animali, persone etc..",
        "required": false
      }
    ],
    "scopes": "Area per le dimensioni dell'effetto. Precisione per sapere più informazioni. Durata per tenerlo nella scena."
  },
  {
    "id": "correspondence-2-accorciare-la-strada",
    "name": "Accorciare la strada",
    "sphere": "correspondence",
    "level": 2,
    "extras": [],
    "text": "Stringi lo spazio davanti a te: il corridoio, il vicolo, il tratto di strada che hai davanti si accorcia, e i tuoi passi valgono doppio. Non sparisci e non riappari: cammini, e arrivi prima di quanto chiunque si aspetti. Pieghi un tratto alla volta, non un quartiere.",
    "pairings": [],
    "scopes": "Area per quanto tratto stringi. Durata 1 per la fuga, 2 per la scena. Bersagli per chi cammina con te."
  },
  {
    "id": "correspondence-2-agire-su-cio-che-non-vedi",
    "name": "Agire su ciò che non vedi",
    "sphere": "correspondence",
    "level": 2,
    "extras": [],
    "text": "Getti un ponte fino a un luogo lontano, e l'altra Sfera lavora da là come se fossi sul posto. La Corrispondenza porta, l'altra Sfera fa.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "far inceppare la pistola nella stanza accanto etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "spegnere le luci del magazzino in fondo alla via etc..",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "aprire la cassaforte dall'altra parte della città etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "sussurrare un pensiero a chi dorme a chilometri da te etc..",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "attingere Quintessenza da un Nodo lontano etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "parlare con lo spirito del fiume senza andarci etc..",
        "required": false
      },
      {
        "sphere": "time",
        "text": "rallentare il corridoio dove passeranno i sicari etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "chiudere la ferita del compagno rimasto indietro etc..",
        "required": false
      }
    ],
    "scopes": "Portata per la distanza. Gli altri Ambiti li dichiara l'effetto dell'altra Sfera."
  },
  {
    "id": "correspondence-2-chiaroveggenza",
    "name": "Chiaroveggenza",
    "sphere": "correspondence",
    "level": 2,
    "extras": [],
    "text": "Apri una finestra su un luogo lontano e lo guardi adesso: vedi e senti, non tocchi. La Precisione dice quanto a fondo: 1 la stanza, 3 il foglio sulla scrivania, 5 il numero di serie sulla pistola.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "più finestre insieme.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "la finestra guarda com'era ieri.",
        "required": false
      }
    ],
    "scopes": "Portata per la distanza. Precisione per i dettagli. Durata 1 per lo scontro, 2 per la scena."
  },
  {
    "id": "correspondence-2-marchiare-un-bersaglio",
    "name": "Marchiare un bersaglio",
    "sphere": "correspondence",
    "level": 2,
    "extras": [],
    "text": "Leghi un filo invisibile a qualcuno o a qualcosa: ovunque vada, sai dov'è. Il filo corre in due sensi: chi sa cercarlo risale fino a te. La Sfera compagna dice cosa marchi, e cosa senti lungo il filo.",
    "pairings": [
      {
        "sphere": "life",
        "text": "marchi il corpo: sai dov'è, e se è ferito, vivo o morto etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "marchi la mente: sai dov'è e come sta, paura, fretta, calma etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "marchi l'anima: lo segui anche nell'Umbra, e oltre la morte.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "marchi l'energia che porta: il telefono acceso, l'auto in moto etc..",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "marchi un oggetto addosso a lui: l'anello, la giacca, la pistola etc.. Se lo lascia, il filo resta sull'oggetto.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto canta il marchio (7 per la cronaca). Bersagli per più marchi in un colpo. Portata per quanto lontano lo senti."
  },
  {
    "id": "correspondence-2-schermare-un-luogo",
    "name": "Schermare un luogo",
    "sphere": "correspondence",
    "level": 2,
    "extras": [],
    "text": "Ispessisci lo spazio attorno a un luogo: chi scruta o divina da fuori perde successi, chi vuole entrarci con un salto trova il muro più spesso.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "lo schermo morde chi lo tocca.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "chi guarda dentro vede quello che vuoi tu.",
        "required": false
      }
    ],
    "scopes": "Area 1 la stanza, 2 l'edificio. Durata per quanto regge. Condizioni se morde, o se lascia passare solo i tuoi."
  },
  {
    "id": "correspondence-2-sentire-il-filo",
    "name": "Sentire il filo",
    "sphere": "correspondence",
    "level": 2,
    "extras": [],
    "text": "Ti accorgi di essere marchiato, osservato o cercato, e sai da che distanza arriva il filo.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "sai anche chi.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "sai con quale Magick.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per vegliare tutta la scena. Precisione per il punto esatto da cui parte il filo."
  },
  {
    "id": "correspondence-3-affacciarti-oltre-il-varco",
    "name": "Affacciarti oltre il varco",
    "sphere": "correspondence",
    "level": 3,
    "extras": [],
    "text": "Apri un varco quanto un braccio e la tua mano lavora dall'altra parte: gira la maniglia, preme il tasto, afferra etc..",
    "pairings": [
      {
        "sphere": "life",
        "text": "ci passa la tua mano, ed è una mano.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "ci passa un oggetto al posto della mano.",
        "required": false
      }
    ],
    "scopes": "Portata per la distanza. Durata 1 per il tempo di girare la maniglia."
  },
  {
    "id": "correspondence-3-disperdere-oggetti-lontano",
    "name": "Disperdere oggetti lontano",
    "sphere": "correspondence",
    "level": 3,
    "extras": [],
    "text": "Quel che hai davanti si sparpaglia in nascondigli sparsi entro dieci chilometri.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "il caso sceglie i nascondigli, e nessuno sa dove, nemmeno tu.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "i nascondigli li scegli tu.",
        "required": false
      }
    ],
    "scopes": "Bersagli per quante cose. Portata per quanto lontano finiscono. Potenza (peso) se sono pesanti."
  },
  {
    "id": "correspondence-3-estrarre-senza-bisturi",
    "name": "Estrarre senza bisturi",
    "sphere": "correspondence",
    "level": 3,
    "extras": [],
    "text": "Il proiettile, la scheggia, il chip lasciano il ferito da soli. Da solo è uno strappo, Volgare.",
    "pairings": [
      {
        "sphere": "life",
        "text": "sembra medicina.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "sembra fatto da un congegno.",
        "required": false
      }
    ],
    "scopes": "Precisione per la scheggia giusta e non il resto. Bersagli per più feriti."
  },
  {
    "id": "correspondence-3-richiamare-un-oggetto-distante",
    "name": "Richiamare un oggetto distante",
    "sphere": "correspondence",
    "level": 3,
    "extras": [],
    "text": "Tiri il filo e la cosa arriva in mano tua, da dove sta. Da solo è uno strappo, Volgare.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "arriva pulita, per quello che è.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "arriva un corpo vivo.",
        "required": false
      }
    ],
    "scopes": "Portata per la distanza (6 dall'altra parte del mondo). Potenza (peso) per quanto pesa. Precisione se la cosa è una fra tante."
  },
  {
    "id": "correspondence-3-scambiare-due-cose-di-posto",
    "name": "Scambiare due cose di posto",
    "sphere": "correspondence",
    "level": 3,
    "extras": [],
    "text": "Quello che era lì è qui, e viceversa: nessuno ha viaggiato. Senza Sfere compagne sono due strappi, Volgare.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "due oggetti si scambiano per quello che sono.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "due corpi.",
        "required": false
      }
    ],
    "scopes": "Portata per la distanza fra i due. Potenza (peso). Bersagli 2 per due persone."
  },
  {
    "id": "correspondence-3-teletrasportarti",
    "name": "Teletrasportarti",
    "sphere": "correspondence",
    "level": 3,
    "extras": [],
    "text": "Sparisci qui e riappari là, con quel che porti addosso. Volgare se qualcuno guarda. Gruppi e veicoli chiedono il quarto pallino.",
    "pairings": [
      {
        "sphere": "life",
        "text": "il corpo passa restando un corpo, e il gesto si spiega.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "passa anche il carico, intero.",
        "required": false
      }
    ],
    "scopes": "Portata per la distanza. Bersagli per i compagni. Potenza (peso) per il carico."
  },
  {
    "id": "correspondence-4-ancorare-un-bersaglio",
    "name": "Ancorare un bersaglio",
    "sphere": "correspondence",
    "level": 4,
    "extras": [],
    "text": "Lo spazio attorno a lui si rifiuta di aprirsi: nessun varco, salto o richiamo lo porta via. Contro chi vuole strapparlo vince la Potenza più alta.",
    "pairings": [
      {
        "sphere": "life",
        "text": "ancori un corpo.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "ancori un oggetto.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "ancori uno spirito fuori dall'Umbra.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto regge. Potenza (epicità) nel braccio di ferro. Bersagli per più persone."
  },
  {
    "id": "correspondence-4-aprire-un-portale-stabile",
    "name": "Aprire un portale stabile",
    "sphere": "correspondence",
    "level": 4,
    "extras": [],
    "text": "Una soglia spalancata tra due punti: chi ci passa, passa, senza contare i Bersagli.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "ci passa un tir intero.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "chi non sa che c'è non lo vede.",
        "required": false
      }
    ],
    "scopes": "Portata per la distanza. Durata per quanto resta aperto (4 la sessione). Potenza (peso) per tenerlo largo. Condizioni 1 se si apre solo per i tuoi."
  },
  {
    "id": "correspondence-4-piegare-una-strada",
    "name": "Piegare una strada",
    "sphere": "correspondence",
    "level": 4,
    "extras": [],
    "text": "Chi la percorre arriva dove hai deciso tu, convinto di aver camminato dritto.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "non si accorge nemmeno del tempo perso.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "ci arriva quando dici tu.",
        "required": false
      }
    ],
    "scopes": "Area per il tratto di strada. Durata per quanto dura. Condizioni se vale solo per certi passi."
  },
  {
    "id": "correspondence-4-sigillare-una-tasca-spaziale",
    "name": "Sigillare una tasca spaziale",
    "sphere": "correspondence",
    "level": 4,
    "extras": [],
    "text": "Chiudi una stanza fuori dalla geometria del mondo: da fuori non c'è, da dentro non si esce finché non riapri.",
    "pairings": [
      {
        "sphere": "time",
        "text": "dentro il tempo corre diverso.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "dentro la Quintessenza non si disperde.",
        "required": false
      }
    ],
    "scopes": "Area per la grandezza. Durata per quanto resta chiusa. Condizioni 1 se si riapre all'alba."
  },
  {
    "id": "correspondence-5-riscrivere-la-geometria",
    "name": "Riscrivere la geometria",
    "sphere": "correspondence",
    "level": 5,
    "extras": [],
    "text": "Fondi due luoghi, sposti un edificio, avvicini due continenti etc..: la mappa cambia perché l'hai deciso tu. Volgare con testimoni per forza di cose.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "quel che sposti resta intero.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "il mondo ricorda che è sempre stato così.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "chi ci vive ricorda che è sempre stato così.",
        "required": false
      }
    ],
    "scopes": "Area, Potenza (peso ed epicità), Durata: tutti alti."
  },
  {
    "id": "entropy-1-individuare-il-punto-debole",
    "name": "Individuare il punto debole",
    "sphere": "entropy",
    "level": 1,
    "extras": [],
    "text": "Guardi una cosa e vedi dove cederà: la crepa nel muro, il passaggio morto del piano, la frase dell'alibi che non regge. Non la rompi: sai dove spingere, e quanto poco basta.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "il punto esatto della struttura: la saldatura vecchia, il pilastro stanco, il bullone che gioca etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "il punto debole di un corpo: il ginocchio operato, la spalla che esce, il fiato corto etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "il punto debole di una persona: la paura, l'orgoglio, il segreto che non deve uscire etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "dove cede un impianto: il fusibile, il cavo scoperto, la valvola sotto pressione etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "dove cede uno spirito o una soglia: il patto non rispettato, il nome che non vuole sentire etc..",
        "required": false
      },
      {
        "sphere": "time",
        "text": "sai anche quando cederà, non solo dove.",
        "required": false
      }
    ],
    "scopes": "Precisione per un punto solo e non l'insieme (1 il muro, 3 il mattone). Bersagli per più cose alla volta. Durata 2 per tenere l'occhio acceso tutta la scena."
  },
  {
    "id": "entropy-1-fiutare-la-menzogna",
    "name": "Fiutare la menzogna",
    "sphere": "entropy",
    "level": 1,
    "extras": [],
    "text": "Senti quando un racconto stona: la nota falsa, mai il testo. Sai che sta mentendo, non su cosa. Le menti si difendono con la Volontà.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "sai anche cosa nasconde, e perché.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "senti quando a mentire è un oggetto: il documento falso, la moneta contraffatta, l'etichetta cambiata etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "senti la bugia di uno spirito e il patto detto a metà.",
        "required": false
      }
    ],
    "scopes": "Bersagli per ascoltare più bocche insieme. Durata 2 per un interrogatorio intero. Precisione per la frase esatta che stona."
  },
  {
    "id": "entropy-1-pesare-le-probabilita",
    "name": "Pesare le probabilità",
    "sphere": "entropy",
    "level": 1,
    "extras": [],
    "text": "Chiedi al mondo quanto è probabile una cosa e il mondo ti risponde con un numero: che piova, che il banco sballi, che tu esca vivo da quella stanza etc.. È anche il tuo fiuto per il pericolo: sai quanto è pericoloso un posto prima di entrarci.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "quanto è probabile che una persona faccia una cosa: che ceda, che tradisca, che spari etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "quanto è probabile che un corpo regga: che sopravviva, che guarisca, che la ferita si infetti etc..",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "quanto è probabile che una cosa regga: il ponte, la corda, il paracadute etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "quanto è probabile che un impianto regga: che scarichi, che prenda fuoco, che salti la luce etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "quanto è probabile che lo spirito accetti, che la soglia si apra, che il rito riesca etc..",
        "required": false
      },
      {
        "sphere": "time",
        "text": "la probabilità di adesso e quella di fra un'ora: la sorte in movimento.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "pesi le probabilità di un luogo che non vedi.",
        "required": false
      }
    ],
    "scopes": "Precisione per una domanda sola e precisa invece del quadro. Area per pesare un luogo intero. Durata 2 per tenere il fiuto acceso tutta la scena."
  },
  {
    "id": "entropy-1-leggere-il-conto-alla-rovescia",
    "name": "Leggere il conto alla rovescia",
    "sphere": "entropy",
    "level": 1,
    "extras": [],
    "text": "Sai quanto manca: all'oggetto che si romperà, all'accordo che salterà, alla malattia che si dichiarerà. In giorni, mesi o anni, e più successi hai più la cifra è esatta.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "il conto di un oggetto o di una struttura: la lavatrice, il ponte, il tetto etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "il conto di un corpo: quanto gli resta, quando cadrà malato, quando la ferita si chiuderà etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "il conto di un legame o di una decisione: quando lascerà, quando cederà, quando cambierà idea etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "il conto di un impianto: quando muore il generatore, quando si scarica la batteria etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "il conto di un patto o di uno spirito: quando si scioglie, quando si disfa etc..",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "il conto di un incantesimo: quanto regge la Magick di un altro.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "la cifra diventa una data, con ora e minuto.",
        "required": false
      }
    ],
    "scopes": "Precisione per la cifra esatta e non l'ordine di grandezza. Bersagli per più conti insieme. Durata 2 per leggere tutta la scena."
  },
  {
    "id": "entropy-2-far-durare",
    "name": "Far durare",
    "sphere": "entropy",
    "level": 2,
    "extras": [],
    "text": "L'Entropia al contrario: la corda regge, il motore parte, la cosa vecchia arriva a fine giornata. Non ripari niente: fai in modo che non ceda proprio adesso.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "tieni in piedi anche ciò che è già rotto: il motore fuso fa un altro giro.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "il corpo regge: il ferito arriva all'ospedale, il malato arriva a domani etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "la batteria, la torcia, il generatore reggono oltre la carica etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "reggono la calma, la bugia, il coraggio fino a fine scena etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "lo spirito evocato non si disfa, il patto regge un altro giorno etc..",
        "required": false
      },
      {
        "sphere": "time",
        "text": "fissi fino a quando: reggerà esattamente fino a mezzanotte.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto deve reggere (1 la fuga, 2 la scena, 4 la sessione). Bersagli per più cose insieme. Potenza (peso) se è grosso: il ponte, non la corda."
  },
  {
    "id": "entropy-2-inclinare-una-scelta",
    "name": "Inclinare una scelta",
    "sphere": "entropy",
    "level": 2,
    "extras": [],
    "text": "Sposti le probabilità attorno a una decisione: quando sceglierà, l'opzione che vuoi tu è quella che gli capita davanti, quella comoda, quella che gli torna in mente per prima. Non decidi per lui: apparecchi il caso.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "la Mente gli mette l'idea in testa, l'Entropia fa in modo che sia proprio quella a tornargli in mente al momento giusto: sceglie l'errore convinto di averlo scelto.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "il corpo gli dà ragione: la stanchezza, la fame, il sonno gli fanno preferire l'opzione facile etc..",
        "required": false
      },
      {
        "sphere": "time",
        "text": "scegli l'istante in cui la scelta gli si presenta.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "inclini la scelta di chi non vedi.",
        "required": false
      }
    ],
    "scopes": "Condizioni 1 per legarla a un momento: quando glielo chiederanno. Bersagli per più teste. Potenza (epicità) per quanto pesa la scelta: 1 il tavolo al ristorante, 4 il voto in consiglio."
  },
  {
    "id": "entropy-2-passare-inosservato",
    "name": "Passare inosservato",
    "sphere": "entropy",
    "level": 2,
    "extras": [],
    "text": "Gli sguardi scivolano altrove: chi guarda verso di te trova sempre qualcosa di meglio da guardare, la telecamera gira nel momento sbagliato, la guardia starnutisce. Nessuno ricorda di averti visto. Non sei invisibile: sei improbabile.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "chi ti vede lo dimentica subito.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "la telecamera, il sensore, il faro sbagliano insieme agli sguardi etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "nemmeno il cane ti fiuta.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "passi inosservato anche agli spiriti e a chi guarda dall'Umbra.",
        "required": false
      }
    ],
    "scopes": "Durata 1 per attraversare la stanza, 2 per la scena. Bersagli per la Cabala intera. Area per un luogo dove nessuno nota niente."
  },
  {
    "id": "entropy-2-provocare-un-guasto",
    "name": "Provocare un guasto",
    "sphere": "entropy",
    "level": 2,
    "extras": [],
    "text": "Una cosa che poteva rompersi si rompe adesso: l'auto tace, la serratura si inceppa, il ponte radio cade. Serve una crepa vera da spingere: quello che è nuovo e sano non ne ha, e senza crepa il guasto non è tuo.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "guasti anche ciò che è sano: la Materia lo indebolisce, il caso sceglie l'istante.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "guasti l'impianto: il quadro elettrico, il generatore, la rete etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "il corpo sbaglia: la caviglia cede, arriva il crampo, manca il fiato etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "il guasto è in testa: la parola dimenticata, il numero sbagliato, il nome che non torna etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "il rito degli altri si inceppa, lo spirito non risponde alla chiamata etc..",
        "required": false
      },
      {
        "sphere": "time",
        "text": "scegli l'istante esatto: si rompe quando lo tocca lui.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "guasti quello che non vedi.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto è grosso quel che cede: 1 la serratura, 3 l'auto, 5 la casa. Condizioni 1 per farlo scattare al momento giusto: quando gira la chiave. Precisione per il pezzo giusto e non l'insieme. Bersagli per più cose."
  },
  {
    "id": "entropy-2-seminare-gli-inseguitori",
    "name": "Seminare gli inseguitori",
    "sphere": "entropy",
    "level": 2,
    "extras": [],
    "text": "Chi ti segue colleziona sfortuna: gomme a terra, semafori rossi, il furgone che si mette di traverso. Tu non vai più veloce: sono loro che non arrivano.",
    "pairings": [
      {
        "sphere": "forces",
        "text": "la loro auto si spegne, la radio gracchia, il navigatore sbaglia strada etc..",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "la strada stessa gli va contro: la buca, il cancello chiuso, il tombino aperto etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "perdono la tua traccia e si convincono di un'altra strada.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "il cane perde l'odore, il segugio si stanca etc..",
        "required": false
      }
    ],
    "scopes": "Bersagli per quanti ti seguono (zero se stanno tutti sulla stessa auto). Durata 1 per la fuga, 2 per tutta la scena. Area per un quartiere intero che gli va contro."
  },
  {
    "id": "entropy-2-truccare-la-fortuna",
    "name": "Truccare la fortuna",
    "sphere": "entropy",
    "level": 2,
    "extras": [],
    "text": "Il dado, la carta, la pallina della roulette, l'ingranaggio che si inceppa al momento giusto: le piccole probabilità di un istante cadono come dici tu. Un colpo alla volta: la serata intera è il terzo pallino.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "trucchi anche l'oggetto che non lascia niente al caso: il dado piombato, la slot programmata etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "trucchi la macchina: il generatore di numeri, la lotteria elettronica etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "l'altro giocatore sbaglia proprio la mossa giusta.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "scegli il momento in cui la fortuna gira.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "trucchi il tavolo che non vedi.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più giocatori o più tavoli. Condizioni 1 per legarla a una mano precisa. Precisione per il risultato esatto e non «vinco»: il sette, il doppio sei."
  },
  {
    "id": "entropy-3-deviare-la-malasorte",
    "name": "Deviare la malasorte",
    "sphere": "entropy",
    "level": 3,
    "extras": [],
    "text": "Ogni colpo ti manca per un soffio, e sembra sempre fortuna: la pallottola sfiora, il tetto cede un passo dietro di te, il vetro cade dall'altra parte. Non sei più resistente: sei difficile da colpire.",
    "pairings": [
      {
        "sphere": "life",
        "text": "devii anche le disgrazie del corpo: il contagio, il veleno, l'infarto etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "devii le energie: il fulmine, la scarica, la fiammata etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "chi ti tende una trappola sbaglia sempre qualcosa.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "devii le maledizioni degli spiriti e i colpi dall'Umbra.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "anche la Magick altrui sbaglia bersaglio.",
        "required": false
      }
    ],
    "scopes": "Durata 1 per lo scontro, 2 per la scena, 4 per la sessione. Bersagli per proteggere altri. Condizioni 1 se scatta da sola quando sparano, 2 se chi ti manca si inceppa pure."
  },
  {
    "id": "entropy-3-distribuire-fortuna-e-sfortuna",
    "name": "Distribuire fortuna e sfortuna",
    "sphere": "entropy",
    "level": 3,
    "extras": [],
    "text": "Pieghi una serata intera: la bisca ti ama, il rivale colleziona disastri, i tuoi trovano parcheggio e i loro trovano la polizia. Quello che dai a uno lo togli a un altro: il conto resta in pari, e sei tu a decidere chi paga.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "la fortuna sceglie anche le teste: le tue idee arrivano, le loro no.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "la fortuna nei corpi: i tuoi non si ammalano, i loro sì.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "la fortuna negli impianti: le vostre macchine partono, le loro no.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "la fortuna nelle cose: quello che vi serve è nel cassetto, quello che gli serve è rotto.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "gli spiriti del luogo prendono la tua parte.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "scegli quando la marea gira.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "la serata che pieghi è dall'altra parte della città.",
        "required": false
      }
    ],
    "scopes": "Area per quanto è grande la serata (1 la bisca, 2 l'edificio, 3 il quartiere). Durata 1 la serata, 3 il mese. Bersagli per chi vince e chi perde. Condizioni 1 per una regola: solo i tuoi, solo al tavolo grande."
  },
  {
    "id": "entropy-3-ferire-uno-spirito",
    "name": "Ferire uno spirito",
    "sphere": "entropy",
    "level": 3,
    "extras": [],
    "text": "Disfi un'effimera dall'interno: le probabilità che la tengono insieme cadono e lo spirito si sfalda. L'Entropia da sola non tocca l'Umbra: serve una Sfera che ti ci porti.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "disfi la Quintessenza di cui è fatto: perde forma, poi sostanza.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "la via diretta: lo colpisci nell'Umbra o attraverso la soglia.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "lo spirito legato a un oggetto si disfa con l'oggetto: il feticcio, la statua, la reliquia etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "lo spirito legato a un'energia si disfa con lei: il fuoco, la corrente, la tempesta etc..",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto ferisce. Bersagli per più spiriti. Precisione per colpire quello giusto in uno sciame."
  },
  {
    "id": "entropy-3-ridurre-in-polvere-un-oggetto",
    "name": "Ridurre in polvere un oggetto",
    "sphere": "entropy",
    "level": 3,
    "extras": [],
    "text": "Anni di decadimento in un istante: la ruggine vince, il legno marcisce, la corda si sfilaccia, e resta la polvere. Da sola l'Entropia sceglie solo cosa cede per primo: per far correre gli anni serve una compagna.",
    "pairings": [
      {
        "sphere": "time",
        "text": "gli anni cadono tutti insieme: l'oggetto invecchia davanti a te.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "la via diretta: la materia si disfa per quello che è.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "la polvere di un impianto: i circuiti si ossidano, i cavi si sbriciolano etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "quello che era vivo marcisce: il legno, il cibo, il raccolto etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "riduci in polvere quello che non vedi.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto è grosso: 1 la chiave, 3 l'auto, 5 la casa. Precisione per la parte giusta e non l'insieme: la canna, non la pistola. Bersagli per più oggetti."
  },
  {
    "id": "entropy-3-rompere-la-catena",
    "name": "Rompere la catena",
    "sphere": "entropy",
    "level": 3,
    "extras": [],
    "text": "Isoli un guasto perché smetta di propagarsi: il disastro si ferma dov'è. Il cortocircuito non arriva al quadro, il pettegolezzo non arriva alla stampa, il contagio si ferma al primo malato.",
    "pairings": [
      {
        "sphere": "forces",
        "text": "la catena è un impianto: il blackout resta nel palazzo.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "la catena è un contagio: l'epidemia si ferma alla prima stanza.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "la catena è una voce: la notizia muore prima di uscire dalla stanza.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "la catena è una struttura: il crollo si ferma al primo piano.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "la catena è una maledizione o un patto che passa di mano in mano.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "la catena è un incantesimo che si propaga.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "fermi il primo anello prima che scatti.",
        "required": false
      }
    ],
    "scopes": "Area per quanto è ampio il perimetro in cui il guasto resta chiuso. Durata per quanto tieni chiusa la porta (2 la scena, 4 la sessione). Precisione per l'anello esatto da spezzare."
  },
  {
    "id": "entropy-3-scegliere-il-domani-piu-comodo",
    "name": "Scegliere il domani più comodo",
    "sphere": "entropy",
    "level": 3,
    "extras": [
      {
        "sphere": "time",
        "level": 1,
        "required": true
      }
    ],
    "text": "Tra i futuri possibili spingi il mondo verso quello che preferisci: non una probabilità alla volta, ma una direzione. Da sola l'Entropia piega solo l'adesso: il domani intero chiede il Tempo.",
    "pairings": [
      {
        "sphere": "time",
        "text": "la via obbligata: vedi i rami e scegli quello.",
        "required": true
      },
      {
        "sphere": "mind",
        "text": "il domani più comodo per una persona: la strada che prenderà.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "il domani di un luogo lontano.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto è lontano quel domani (fuori gioco: 1 il giorno, 3 il mese, 5 l'anno). Potenza (epicità) per quanto pesa il domani che scegli: 2 tocca la scena, 5 stravolge il capitolo. Precisione per un esito preciso e non «meglio»."
  },
  {
    "id": "entropy-3-spezzare-una-maledizione",
    "name": "Spezzare una maledizione",
    "sphere": "entropy",
    "level": 3,
    "extras": [],
    "text": "Disfi il nodo di sfortuna stretto da altri: la malasorte cucita addosso a qualcuno si scioglie e la fortuna torna a cadere come cade a tutti. La Sfera con cui è stata stretta aiuta a trovare il nodo.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "riconosci la Magick con cui è stata stretta e la disfi alla radice.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "la maledizione viene da uno spirito o da un patto: sciogli il patto.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "la maledizione ha messo radici nel corpo: la togli anche da lì.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "la maledizione vive nella convinzione di chi la porta: lo liberi anche da quella.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "sciogli il nodo di chi è lontano.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) nel braccio di ferro: contro una maledizione più forte vince la Potenza più alta. Bersagli per più persone maledette. Precisione per il nodo giusto fra molti."
  },
  {
    "id": "entropy-4-benedire-o-maledire",
    "name": "Benedire o maledire",
    "sphere": "entropy",
    "level": 4,
    "extras": [],
    "text": "Riscrivi il destino di un vivente: la fortuna gli si cuce addosso, o la malasorte, e lo segue ovunque vada per tutto il tempo che decidi. Contro un Risvegliato o una creatura densa senza la sua Sfera di Modello l'effetto strappa: nasce Volgare.",
    "pairings": [
      {
        "sphere": "life",
        "text": "la sorte lo raggiunge per le vie del corpo: cede dove i corpi cedono, guarisce dove guariscono, e la scena resta pulita.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "la sorte gli entra in testa: le decisioni gli riescono tutte, o gli falliscono tutte.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "benedici o maledici uno spirito, o passi dallo spirito che veglia su di lui.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "la benedizione ha una data: scatta al compleanno, finisce a mezzanotte etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "riscrivi il destino di chi non vedi.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto dura (fuori gioco: 3 il mese, 7 per sempre). Condizioni 1 per legarla: solo quando impugna un'arma, solo la sua famiglia etc.. Potenza (epicità) per il peso: 2 tocca la scena, 6 impatta sulla storia. Bersagli per una famiglia intera."
  },
  {
    "id": "entropy-4-creare-fortuna-dal-nulla",
    "name": "Creare fortuna dal nulla",
    "sphere": "entropy",
    "level": 4,
    "extras": [
      {
        "sphere": "prime",
        "level": 1,
        "required": true
      }
    ],
    "text": "Aggiungi al conto invece di spostarlo: la fortuna che dai non manca a nessuno, la sfortuna che cancelli non finisce da nessun'altra parte. Serve il Primordio: da sola l'Entropia sposta soltanto. Il mondo se ne accorge, e il resto lo reclamerà quando vuole lui.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "la via obbligata: la fortuna nasce dalla Quintessenza, oppure la paghi.",
        "required": true
      },
      {
        "sphere": "life",
        "text": "la fortuna nuova in un corpo: la guarigione che non era probabile.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "la fortuna nuova in una testa: l'idea che nessuno avrebbe avuto.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "la fortuna nuova nelle cose: il biglietto vincente, la vena d'oro, il pezzo di ricambio nel cassetto etc..",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) per quanta fortuna: 1 un dettaglio, 4 impatta sul capitolo. Durata per quanto dura. Bersagli per chi la riceve."
  },
  {
    "id": "entropy-4-far-marcire-un-corpo",
    "name": "Far marcire un corpo",
    "sphere": "entropy",
    "level": 4,
    "extras": [
      {
        "sphere": "life",
        "level": 1,
        "required": true
      }
    ],
    "text": "La mortalità accelera nella carne: le ferite si infettano, gli organi cedono, la pelle si apre. Da sola l'Entropia tiene la rovina attorno al corpo, incidenti e contagi probabili; per entrare nella carne serve la Vita.",
    "pairings": [
      {
        "sphere": "life",
        "text": "la via obbligata: la carne marcisce dall'interno.",
        "required": true
      },
      {
        "sphere": "time",
        "text": "gli anni della carne cadono in un istante: invecchia davanti a te.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "marcisce anche l'effimera di uno spirito incarnato.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "marcisce chi non vedi.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto ferisce. Durata per quanto continua a marcire. Condizioni 1 se scatta solo quando fa una cosa. Bersagli per più corpi."
  },
  {
    "id": "entropy-4-rendere-un-luogo-immune-al-caso",
    "name": "Rendere un luogo immune al caso",
    "sphere": "entropy",
    "level": 4,
    "extras": [],
    "text": "Dentro quel perimetro gli incidenti smettono di capitare, e la fortuna pure: nessuna scala cede, nessun colpo sfiora, nessun dado cade bene o male. Il caso non entra, né il tuo né quello altrui.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "il perimetro respinge anche l'Entropia di un altro mago.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "nemmeno le macchine sbagliano: niente guasti, niente scariche.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "chi entra non si accorge che la fortuna ha smesso.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "vale anche nell'Umbra del luogo.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "il perimetro si accende a orari: solo di notte.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "il perimetro è lontano, o segue chi lo porta.",
        "required": false
      }
    ],
    "scopes": "Area per il perimetro (1 la stanza, 2 l'edificio, 3 il quartiere). Durata per quanto regge. Condizioni 1 per chi entra: i tuoi tengono la fortuna, gli altri no."
  },
  {
    "id": "entropy-5-intrecciare-destini",
    "name": "Intrecciare destini",
    "sphere": "entropy",
    "level": 5,
    "extras": [],
    "text": "Leghi due vite: quello che capita a una capita all'altra, nel bene e nella rovina. La fortuna dell'uno è la fortuna dell'altro, e la malasorte pure, per sempre o per quanto decidi.",
    "pairings": [
      {
        "sphere": "life",
        "text": "il legame passa anche nel corpo: la ferita dell'uno sanguina nell'altro.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "il legame passa nei pensieri: sanno l'uno dell'altro.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "il legame regge anche oltre la morte.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "il legame ha una scadenza, o si accende in un giorno preciso.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "i due sono lontani e non si sono mai visti.",
        "required": false
      }
    ],
    "scopes": "Durata (7 per sempre). Bersagli 2, o di più per una Cabala intera. Condizioni 1 per una regola: finché vivono nella stessa città, finché uno non tradisce etc.. Potenza (epicità) per quanto pesa il legame."
  },
  {
    "id": "entropy-5-riscrivere-un-destino-da-zero",
    "name": "Riscrivere un destino da zero",
    "sphere": "entropy",
    "level": 5,
    "extras": [
      {
        "sphere": "prime",
        "level": 1,
        "required": true
      }
    ],
    "text": "La vita che non era prevista: la carriera impossibile, la sopravvivenza che nessun conto ammetteva, il nome che nessuno avrebbe mai fatto. Non sposti fortuna: la inventi, e il conto si sbilancia. Il resto lo presenta lui, quando vuole. Serve il Primordio.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "la via obbligata: il destino nuovo nasce dalla Quintessenza.",
        "required": true
      },
      {
        "sphere": "mind",
        "text": "il destino nuovo passa dalle sue scelte: prenderà sempre la strada che porta lì.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "il destino nuovo passa dal corpo: vivrà quanto serve per arrivarci.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "fissi quando il destino si compie.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) per quanto è grande il destino: 5 stravolge il capitolo, 7 impatta sull'intera ambientazione. Durata 7. Bersagli per una stirpe."
  },
  {
    "id": "entropy-5-sigillare-un-giuramento",
    "name": "Sigillare un Giuramento",
    "sphere": "entropy",
    "level": 5,
    "extras": [],
    "text": "Il patto punisce da solo chi lo spezza: la sfortuna aspetta il primo passo fuori dalla parola data e poi cade, senza che tu muova un dito, anche se sei morto, anche se hai dimenticato.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "chi giura sa cosa lo aspetta, e lo sente ogni volta che pensa di tradire.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "il patto vale anche per spiriti e creature dell'Umbra, e loro lo riconoscono.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "la punizione passa dal corpo: si ammala, cade, non guarisce etc..",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "il patto lega anche la Magick: chi tradisce non lancia più.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "il patto ha un termine, o si sveglia in una data.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "il patto lo trova ovunque vada.",
        "required": false
      }
    ],
    "scopes": "Condizioni 1 per ogni clausola, e Complessità per quanto è lungo il contratto (7 livello contratto). Durata 7 per sempre. Bersagli per quanti giurano. Potenza (epicità) per quanto pesa la punizione."
  },
  {
    "id": "forces-1-allargare-lo-spettro",
    "name": "Allargare lo spettro",
    "sphere": "forces",
    "level": 1,
    "extras": [],
    "text": "Vedi e senti quello che i sensi umani tagliano: infrarossi, ultravioletti, onde radio, correnti, radiazioni etc.. Il buio ti si apre, perché il buio è solo luce che l'occhio non prende.",
    "pairings": [
      {
        "sphere": "life",
        "text": "i tuoi occhi cambiano per davvero, e lo spettro resta aperto senza doverlo tenere su.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "leggi anche l'energia di un cervello: se dorme, se sogna, se è sveglio.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "capisci di cosa è fatto quello che l'energia attraversa.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "vedi anche la Quintessenza, l'energia dietro all'energia.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "vedi l'energia dell'Umbra dove sfiora il mondo.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per tutta la scena. Precisione (dettaglio) per la frequenza esatta e non la banda."
  },
  {
    "id": "forces-1-leggere-il-calore-rimasto",
    "name": "Leggere il calore rimasto",
    "sphere": "forces",
    "level": 1,
    "extras": [],
    "text": "Il calore racconta: chi era seduto lì, quale motore è ancora tiepido, quale tazza è stata svuotata per ultima, e quanto tempo fa.",
    "pairings": [
      {
        "sphere": "time",
        "text": "la traccia ti dice l'ora esatta, e la segui indietro più a lungo.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "dal calore riconosci il corpo: alto o basso, sano o febbricitante, uomo o cane etc..",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "dal calore capisci cosa c'era appoggiato: una tazza, un'arma, un portatile etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "leggi il calore rimasto in una stanza che non vedi.",
        "required": false
      }
    ],
    "scopes": "Precisione (dettaglio) per la traccia singola fra tante. Precisione (informazione) per quanto pesa nella trama quel che cerchi. Area per leggere un palazzo intero."
  },
  {
    "id": "forces-1-sentire-la-corrente",
    "name": "Sentire la corrente",
    "sphere": "forces",
    "level": 1,
    "extras": [],
    "text": "Segui la corrente dentro i muri: dove passa, dove è staccata, chi la sta usando e per cosa. Cavi, tubi del gas, fibre, antenne: ogni rete che porta energia o segnale ti si disegna davanti.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "senti anche cosa passa nel segnale: la telefonata, il file, il messaggio etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "segui la rete oltre il palazzo, fino alla centrale.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "senti il cavo per quello che è: rame, fibra, dove è consumato etc..",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "senti dove la rete sta per cedere.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "senti quando è passata l'ultima corrente, e quando tornerà.",
        "required": false
      }
    ],
    "scopes": "Area per la rete intera (1 la stanza, 2 il palazzo, 3 il quartiere). Durata 2 per la scena. Precisione (dettaglio) per un filo solo."
  },
  {
    "id": "forces-1-vedere-attraverso-i-muri",
    "name": "Vedere attraverso i muri",
    "sphere": "forces",
    "level": 1,
    "extras": [],
    "text": "Leggi le radiazioni oltre la parete: sagome nitide nella stanza accanto, il metallo che portano addosso, la corrente nei muri. Non vedi i colori: vedi le energie.",
    "pairings": [
      {
        "sphere": "life",
        "text": "le sagome diventano corpi: quanti, quali, come stanno.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "vedi anche gli oggetti freddi: il mobile, la cassaforte, l'arma nel cassetto etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "guardi attraverso più muri, fino in fondo al palazzo.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "sai anche cosa stanno facendo: dormono, aspettano, ti aspettano etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "vedi chi sta oltre il muro ma non nel mondo.",
        "required": false
      }
    ],
    "scopes": "Precisione (dettaglio) per i particolari: 1 le sagome, 3 l'arma in mano. Durata 1 per un'occhiata, 2 per la scena. Area per tutto il piano."
  },
  {
    "id": "forces-2-amplificare-o-spegnere-un-suono",
    "name": "Amplificare o spegnere un suono",
    "sphere": "forces",
    "level": 2,
    "extras": [],
    "text": "Il sussurro attraversa la sala, il grido resta in gola, la porta si chiude in silenzio: alzi o abbassi il volume di quello che c'è. Non crei suoni: pieghi quelli che esistono.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "il suono lo sente solo chi scegli tu.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "il suono arriva dove non arriverebbe: la tua voce nella stanza in fondo al corridoio.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "spegni o alzi la voce di qualcuno alla fonte, nella gola.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "il suono attraversa il muro, o il muro lo blocca del tutto.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "il suono nasce dal nulla: una voce, un motore, un colpo di pistola etc..",
        "required": false
      }
    ],
    "scopes": "Area per la stanza o la sala. Durata 1 per un attimo, 2 per la scena. Bersagli per zittire più bocche. Condizioni (malus 1) se il suono serve a distrarre."
  },
  {
    "id": "forces-2-curvare-la-luce-o-il-suono",
    "name": "Curvare la luce o il suono",
    "sphere": "forces",
    "level": 2,
    "extras": [],
    "text": "Pieghi la luce attorno a qualcosa e gli occhi la scavalcano, oppure pieghi il suono e nessuno la sente. Su qualcosa di fermo bastano le Forze; su un vivente che si muove serve la Vita, o la piega non gli sta dietro.",
    "pairings": [
      {
        "sphere": "life",
        "text": "la piega segue il corpo in movimento: sparisci mentre corri.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "la piega si cuce a un oggetto: l'auto, la porta, la cassa etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "chi guarda non si accorge nemmeno del vuoto che lasci.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "chi potrebbe vederti comunque guarda altrove.",
        "required": false
      }
    ],
    "scopes": "Durata 1 per attraversare, 2 per la scena. Bersagli per la Cabala. Area per nascondere un luogo. Precisione (dettaglio) se pieghi solo un colore, solo una voce."
  },
  {
    "id": "forces-2-deviare-un-proiettile",
    "name": "Deviare un proiettile",
    "sphere": "forces",
    "level": 2,
    "extras": [],
    "text": "Acceleri o rallenti la massa in volo: la pallottola perde il bersaglio, la freccia cade corta, il sasso torna indietro etc.. Serve vederlo partire, o sapere che parte.",
    "pairings": [
      {
        "sphere": "time",
        "text": "lo vedi partire in anticipo e la deviazione è pronta prima dello sparo.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "il colpo finisce da solo nel muro giusto.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "devii il colpo sparato a qualcuno lontano da te.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "la pallottola si deforma in volo, oltre a deviare.",
        "required": false
      }
    ],
    "scopes": "Durata 1 per lo scontro, 2 per la scena. Bersagli per coprire i compagni. Potenza (peso) per quello che devii: 1 la pallottola, 3 l'auto lanciata. Condizioni 1 per farlo scattare da solo: ogni colpo diretto a te."
  },
  {
    "id": "forces-2-dirigere-l-energia-in-scena",
    "name": "Dirigere l'energia in scena",
    "sphere": "forces",
    "level": 2,
    "extras": [],
    "text": "Fuoco, vento, corrente, acqua che scorre: c'è già, e lo pieghi. La fiamma si allunga verso di lui, il vento cambia lato, la scarica del quadro elettrico salta dove dici tu. Non crei energia: la guidi.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "l'energia che dirigi la evochi dal nulla.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "l'energia e la sua materia insieme: l'acqua, la sabbia, il fumo etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "la corrente che guidi entra in un corpo e lo muove: i muscoli rispondono a te.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "dirigi l'energia in una stanza che non vedi.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "l'energia trova da sola il punto debole: il cavo scoperto, la tenda, il serbatoio etc..",
        "required": false
      },
      {
        "sphere": "time",
        "text": "la fiamma rallenta o corre.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto brucia o scarica. Area per quanta energia governi (1 il camino, 2 l'incendio del piano). Durata 1 per lo scontro, 2 per la scena. Precisione (dettaglio) per guidarla in un punto solo."
  },
  {
    "id": "forces-2-governare-l-attrito",
    "name": "Governare l'attrito",
    "sphere": "forces",
    "level": 2,
    "extras": [],
    "text": "Il pavimento diventa ghiaccio, o colla: chi corre scivola, chi vuole fuggire resta incollato, la corda non scivola più dalle mani. Cambi quanto le cose si aggrappano l'una all'altra.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "l'attrito cambia insieme alla superficie: il pavimento è davvero ghiaccio, o davvero colla.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "la pelle di qualcuno non fa più presa: gli scivola tutto dalle mani, o gli resta attaccato.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "scivola solo chi deve scivolare.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "il corridoio che rendi ghiaccio è due piani sotto.",
        "required": false
      }
    ],
    "scopes": "Area per la superficie (1 la stanza, 2 il palazzo). Durata 1 per un turno, 2 per la scena. Condizioni (malus 2, ostacolare) per chi ci cade. Bersagli per far scivolare solo loro."
  },
  {
    "id": "forces-2-proiettare-luce-e-suono",
    "name": "Proiettare luce e suono",
    "sphere": "forces",
    "level": 2,
    "extras": [
      {
        "sphere": "prime",
        "level": 1,
        "required": true
      }
    ],
    "text": "Con il Primordio accanto fai nascere luce e suono dal nulla: un'immagine vera, visibile a chiunque, telecamere incluse; una voce vera, registrabile. Senza il Primordio puoi solo piegare luce e suono che ci sono già.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "la via obbligata: la luce e il suono nascono dal nulla.",
        "required": true
      },
      {
        "sphere": "mind",
        "text": "l'immagine vive solo negli occhi che scegli, e nessuno strumento la registra.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "l'immagine si appoggia a un oggetto vero: l'ologramma sul tavolo, la voce dalla radio etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "la proiezione appare in un luogo che non vedi.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "la proiezione sei tu: la tua voce, la tua faccia, dove non sei.",
        "required": false
      }
    ],
    "scopes": "Area per quanto è grande (1 la stanza). Durata 1 per un attimo, 2 per la scena. Precisione (dettaglio) per i particolari: 1 una sagoma, 3 un volto che si riconosce. Condizioni (malus 1, distrarre) se serve a ingannare."
  },
  {
    "id": "forces-2-rubare-il-calore",
    "name": "Rubare il calore",
    "sphere": "forces",
    "level": 2,
    "extras": [],
    "text": "Il gelo improvviso in una stanza, il caffè che ghiaccia in mano, il motore che si blocca dal freddo: prendi il calore che c'è. Va comunque da qualche parte: nella stanza accanto, addosso a te, nel muro. Dove, lo decidi tu.",
    "pairings": [
      {
        "sphere": "life",
        "text": "rubi il calore a un corpo: assideramento, dita blu, il cuore che rallenta etc..",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "il freddo entra nella materia: il metallo si spacca, l'acqua diventa ghiaccio solido.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "il calore che rubi sparisce davvero, senza andare da nessuna parte.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "rubi il calore a una stanza che non vedi.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "il freddo colpisce la cosa più fragile: la tubatura, il serbatoio, il vetro etc..",
        "required": false
      }
    ],
    "scopes": "Area per la stanza o il palazzo. Potenza (danni) per quanto ferisce il gelo. Durata 2 per tenere il gelo tutta la scena. Bersagli per gelare solo loro."
  },
  {
    "id": "forces-2-spegnere-e-ravvivare",
    "name": "Spegnere e ravvivare",
    "sphere": "forces",
    "level": 2,
    "extras": [],
    "text": "La fiamma divampa o muore, il motore riparte, la torcia si spegne, il quadro torna in tensione: accendi e spegni quello che c'è. Dal nulla non parte niente: serve una scintilla, una brace, una batteria, oppure il Primordio.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "accendi dal nulla: la fiamma senza innesco, la scarica senza rete.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "ravvivi un motore rotto, o spegni un incendio togliendogli ciò che brucia.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "la fiamma si spegne o riparte proprio nel momento giusto per te.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "spegni le luci del piano di sotto.",
        "required": false
      }
    ],
    "scopes": "Area per quante fiamme o luci (1 la stanza, 2 il palazzo). Potenza (danni) se la fiamma divampa addosso a qualcuno. Bersagli per più fuochi scelti. Condizioni 1 per farlo scattare dopo: quando entra."
  },
  {
    "id": "forces-2-vestire-uno-scudo-di-forza",
    "name": "Vestire uno scudo di forza",
    "sphere": "forces",
    "level": 2,
    "extras": [],
    "text": "Un'armatura invisibile di energia smorza i colpi in arrivo: pugni, pallottole, cadute etc.. Sta addosso a te e a chi decidi.",
    "pairings": [
      {
        "sphere": "life",
        "text": "lo scudo entra nella carne e il corpo resiste per quello che è: la pelle non brucia, le ossa non si rompono.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "lo scudo veste un oggetto: l'auto, la porta, il muro etc..",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "lo scudo ferma anche la Magick.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "lo scudo ferma i colpi dall'Umbra.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "chi colpisce lo scudo sbaglia anche il colpo dopo.",
        "required": false
      }
    ],
    "scopes": "Durata 1 per lo scontro, 2 per la scena, 4 per la sessione. Bersagli per la Cabala. Potenza (danni) per quanto toglie ai colpi."
  },
  {
    "id": "forces-3-camminare-dove-non-si-cammina",
    "name": "Camminare dove non si cammina",
    "sphere": "forces",
    "level": 3,
    "extras": [],
    "text": "Attrito e gravità insieme: sali la parete verticale, cammini sul soffitto, attraversi il lago sulla superficie dell'acqua. I tuoi piedi trovano presa dove per gli altri non c'è.",
    "pairings": [
      {
        "sphere": "life",
        "text": "diventa del corpo: i piedi si aggrappano da soli, anche se corri o combatti.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "la superficie ti viene incontro: l'acqua si fa solida sotto il piede, il muro fa gradini.",
        "required": false
      }
    ],
    "scopes": "Durata 1 per la salita, 2 per la scena. Bersagli per chi viene con te. Potenza (peso) per quello che porti."
  },
  {
    "id": "forces-3-convertire-un-energia",
    "name": "Convertire un'energia",
    "sphere": "forces",
    "level": 3,
    "extras": [],
    "text": "Luce in calore, suono in urto, corrente in luce: l'energia che c'è cambia natura. La scarica che dreni dall'ambiente diventa il tuo fulmine; il rumore della sala diventa una spinta.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "converti la Quintessenza in energia, e viceversa.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "converti materia in energia ed energia in materia: il ghiaccio in vapore, il fumo in fiamma etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "la conversione avviene lontano.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "la conversione finisce nel posto peggiore per loro.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per l'energia che ne esce. Area per quanta energia converti (1 la stanza). Durata 1 per il colpo, 2 per tenere aperta la conversione."
  },
  {
    "id": "forces-3-evocare-energia-dal-nulla",
    "name": "Evocare energia dal nulla",
    "sphere": "forces",
    "level": 3,
    "extras": [
      {
        "sphere": "prime",
        "level": 1,
        "required": true
      }
    ],
    "text": "Con il Primordio fai nascere il fulmine senza rete e la fiamma senza innesco: energia nuova, che non hai preso a nessuno. Terra e acqua sono materia, e chiedono la Materia oltre al Primordio.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "la via obbligata.",
        "required": true
      },
      {
        "sphere": "matter",
        "text": "con Materia e Primordio evochi anche terra, acqua, aria, ghiaccio etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "l'energia nasce dove non sei.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "l'energia nasce dentro un corpo: la scarica nel cuore.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "nasce già puntata sul punto debole.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto colpisce. Area per quanta ne evochi (1 la stanza in fiamme). Durata 1 per una scarica, 2 per tenerla accesa. Precisione (dettaglio) per l'energia esatta: la frequenza, la temperatura."
  },
  {
    "id": "forces-3-fermare-cio-che-corre",
    "name": "Fermare ciò che corre",
    "sphere": "forces",
    "level": 3,
    "extras": [],
    "text": "L'auto in corsa, il treno, il corpo lanciato, la valanga: la cinetica gli viene tolta e si fermano dove sono. L'energia che togli va da qualche parte: nel calore, nel rumore, nel muro.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "fermi senza strappi: l'auto si ferma intera, senza deformarsi.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "fermi un corpo senza fargli male: chi cade atterra piano.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "fermi ciò che corre lontano da te.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "fermi solo quello che deve fermarsi: l'auto sì, il bambino che attraversa no.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto fermi: 2 una persona, 3 l'auto, 4 il tir. Bersagli per più cose in corsa. Durata 1 per tenerlo fermo un turno, 2 per la scena."
  },
  {
    "id": "forces-3-levitare-e-volare",
    "name": "Levitare e volare",
    "sphere": "forces",
    "level": 3,
    "extras": [],
    "text": "Il peso ti obbedisce: sali dolcemente, resti a mezz'aria, o fendi il cielo di fretta. Chi ti guarda vede un uomo in volo: Volgare, se non hai una spiegazione addosso.",
    "pairings": [
      {
        "sphere": "life",
        "text": "il corpo vola per quello che è: niente vertigini, niente freddo, il fiato regge in quota.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "voli con l'auto, con il carico, con la barca etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "chi ti vede volare trova una spiegazione da solo.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "il vento gira sempre a tuo favore.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "voli anche nell'Umbra.",
        "required": false
      }
    ],
    "scopes": "Durata 1 per il salto, 2 per la scena, 4 per la traversata. Bersagli per chi vola con te. Potenza (peso) per il carico: 1 lo zaino, 3 l'auto."
  },
  {
    "id": "forces-3-onda-d-urto",
    "name": "Onda d'urto",
    "sphere": "forces",
    "level": 3,
    "extras": [],
    "text": "Il suono si fa pugno: tutto attorno al punto d'impatto vola, i vetri esplodono, la gente cade. Un colpo solo, largo.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "l'onda spacca anche il muro portante, non solo i vetri.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "l'onda colpisce i corpi e risparmia le cose, o l'inverso.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "l'onda parte da un punto lontano da te.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "l'onda sceglie: chi deve cadere cade, chi no resta in piedi.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "l'onda nasce dal nulla, senza un rumore da cui partire.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto colpisce. Area per il raggio (1 la stanza, 2 il palazzo). Bersagli per chi risparmiare. Condizioni (malus 4, stordire) per chi ci finisce dentro."
  },
  {
    "id": "forces-3-spegnere-l-elettronica",
    "name": "Spegnere l'elettronica",
    "sphere": "forces",
    "level": 3,
    "extras": [],
    "text": "Un impulso muto frigge ogni circuito nella stanza: telefoni, telecamere, auto moderne, pacemaker etc.. Quello che era acceso è morto, e non torna.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "i circuiti fondono per davvero; oppure restano intatti, solo spenti, e si riaccendono.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "l'impulso parte in un luogo che non vedi.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "friggi solo quello che deve friggere: i loro telefoni sì, il tuo no.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "risparmi quello che tiene in vita: il pacemaker, il respiratore.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "l'impulso scatta dopo, quando decidi.",
        "required": false
      }
    ],
    "scopes": "Area per il raggio (1 la stanza, 2 il palazzo, 3 il quartiere). Bersagli per scegliere cosa risparmiare. Condizioni 1 per farlo scattare da solo: quando aprono la porta."
  },
  {
    "id": "forces-3-telecinesi",
    "name": "Telecinesi",
    "sphere": "forces",
    "level": 3,
    "extras": [],
    "text": "La cinetica obbedisce: sollevi, scagli, blocchi, spingi, senza toccare. Muovi la massa che c'è, non la forma.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "quello che sollevi lo plasmi anche: la sbarra si piega mentre vola.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "un corpo si muove come un corpo, non come un burattino rigido.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "muovi quello che non vedi.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "quello che scagli colpisce sempre nel punto giusto.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "nessun gesto, e nessuno capisce da dove viene.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "la cosa si muove più lenta o più veloce di come dovrebbe.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto sollevi: 1 lo zaino, 2 una persona, 3 l'auto, 4 il tir. Potenza (danni) se scagli. Bersagli per più cose insieme. Durata 1 per un turno, 2 per la scena. Precisione (dettaglio) per un lavoro fine: la chiave nella toppa."
  },
  {
    "id": "forces-4-accendere-un-piccolo-sole",
    "name": "Accendere un piccolo sole",
    "sphere": "forces",
    "level": 4,
    "extras": [
      {
        "sphere": "prime",
        "level": 1,
        "required": true
      }
    ],
    "text": "Con il Primordio crei una fonte stabile e autonoma: luce, calore, corrente che nessuna rete alimenta e che non si spegne finché non lo decidi. Il santuario che non ha bisogno di nulla.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "la via obbligata.",
        "required": true
      },
      {
        "sphere": "matter",
        "text": "la fonte ha un corpo: la lampada, la pietra, il cuore del reattore etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "la fonte alimenta anche chi è lontano.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "la fonte brilla anche nell'Umbra.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "la fonte la vedono solo i tuoi.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto resta acceso (fuori gioco: 3 il mese, 7 per sempre). Area per quanto illumina e scalda (1 la stanza, 2 il palazzo)."
  },
  {
    "id": "forces-4-concentrare-ogni-energia",
    "name": "Concentrare ogni energia",
    "sphere": "forces",
    "level": 4,
    "extras": [],
    "text": "Tutta l'energia in scena, in un punto solo: la luce, il calore, la corrente, il moto di tutto quello che c'è convergono dove dici tu. Quello che regge, dopo, è poco.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "il punto è un oggetto e l'energia lo trasforma: la lama che fonde e si ricompone.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "il punto è lontano.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "resta in piedi esattamente quello che vuoi tu.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "concentri anche la Quintessenza del luogo.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "il punto è un corpo, e la carne prende l'energia come colpo o come nutrimento.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto colpisce. Area per quanta energia raccogli (2 il palazzo, 3 il quartiere). Precisione (dettaglio) per il punto esatto."
  },
  {
    "id": "forces-4-dominare-il-meteo",
    "name": "Dominare il meteo",
    "sphere": "forces",
    "level": 4,
    "extras": [],
    "text": "Pioggia, nebbia, gelo, vento, sole su un perimetro intero: il cielo fa quello che dici. Lavori con quello che il cielo ha, la nuvola che c'è, l'umidità che c'è; per la tempesta a ciel sereno serve il Primordio.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "il meteo nasce dal nulla: la tempesta a ciel sereno.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "governi anche l'acqua e la neve come materia: la grandine, il ghiaccio sulla strada.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "il meteo colpisce solo i loro campi.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "cambia anche nell'Umbra, e gli spiriti del cielo obbediscono.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "il perimetro è lontano.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "il meteo arriva a orari: la nebbia ogni notte alle tre.",
        "required": false
      }
    ],
    "scopes": "Area per il perimetro (3 il quartiere, 4 la città, 5 la regione). Durata (fuori gioco: 1 il giorno, 2 la settimana). Potenza (danni) se la tempesta ferisce. Condizioni 1 per legarlo a un evento."
  },
  {
    "id": "forces-4-proiettare-una-scena-intera",
    "name": "Proiettare una scena intera",
    "sphere": "forces",
    "level": 4,
    "extras": [
      {
        "sphere": "mind",
        "level": 1,
        "required": true
      },
      {
        "sphere": "prime",
        "level": 1,
        "required": true
      }
    ],
    "text": "Con Mente e Primordio costruisci una scena finta che tutti vedono, sentono e toccano: la stanza vuota sembra un ricevimento, il vicolo sembra un muro. Le Forze fanno la luce e il suono veri, la Mente convince, il Primordio dà la sostanza.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "la via obbligata per la convinzione.",
        "required": true
      },
      {
        "sphere": "prime",
        "text": "la via obbligata per la sostanza.",
        "required": true
      },
      {
        "sphere": "matter",
        "text": "la scena ha un tocco vero: il tavolo regge il bicchiere.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "la scena ha corpi caldi che respirano.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "la scena appare dove non sei.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "la scena mostra com'era ieri.",
        "required": false
      }
    ],
    "scopes": "Area per quanto è grande (1 la stanza, 2 il palazzo). Durata 2 per la scena, 4 per la sessione. Precisione (dettaglio) per i particolari: 3 le facce, 5 il testo sui documenti. Bersagli per chi invece deve vedere la verità."
  },
  {
    "id": "forces-4-scatenare-la-tempesta",
    "name": "Scatenare la tempesta",
    "sphere": "forces",
    "level": 4,
    "extras": [],
    "text": "Scagli una tempesta: vento che spacca, fulmini, pioggia che acceca su un'area intera. Se c'è già un temporale lo governi e basta; a ciel sereno serve il Primordio. Tifone e tempesta di fuoco costano in Area e Potenza.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "a ciel sereno.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "la tempesta porta grandine, sabbia, detriti etc..",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "i fulmini cadono dove servono a te.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "i tuoi non sentono la tempesta addosso.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "la tempesta cade lontano.",
        "required": false
      }
    ],
    "scopes": "Area per l'estensione (2 il palazzo, 3 il quartiere, 4 la città). Potenza (danni) per quanto colpisce. Durata 2 per la scena. Bersagli per chi risparmiare."
  },
  {
    "id": "forces-4-togliere-l-energia-a-un-area",
    "name": "Togliere l'energia a un'area",
    "sphere": "forces",
    "level": 4,
    "extras": [],
    "text": "Buio, silenzio, gelo e immobilità su un isolato: la Sfera al contrario. Niente brucia, niente scorre, niente si muove in fretta; le auto si fermano, le voci non arrivano. Dove va tutta quell'energia lo decidi tu.",
    "pairings": [
      {
        "sphere": "life",
        "text": "i corpi si raffreddano e rallentano.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "la materia si irrigidisce insieme: l'acqua è ghiaccio, il metallo è fragile.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "togli anche la Quintessenza: niente Magick nel perimetro.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "l'Umbra del luogo si spegne con lui.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "il perimetro è lontano.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "dentro resta acceso solo quello che vuoi tu.",
        "required": false
      }
    ],
    "scopes": "Area per il perimetro (2 il palazzo, 3 il quartiere). Durata 2 per la scena, 4 per la sessione. Condizioni 1 per chi è esente: i tuoi. Potenza (danni) se il gelo e il buio feriscono."
  },
  {
    "id": "forces-5-inventare-un-energia-nuova",
    "name": "Inventare un'energia nuova",
    "sphere": "forces",
    "level": 5,
    "extras": [],
    "text": "Inventi nuove regole su come funziona l'energia: il fuoco freddo, la luce che nutre, la gravità laterale, il suono che si vede etc.. Non pieghi l'energia che c'è: ne scrivi una che il mondo non aveva, e il mondo la tiene finché la tieni tu.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "l'energia nuova nasce dal nulla e resta anche senza di te.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "l'energia nuova ha una materia che la porta: il cristallo che emette fuoco freddo.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "l'energia nuova vive in un corpo: il mago che brilla, il sangue che scalda le stanze.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "l'energia nuova risponde al pensiero.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "l'energia nuova vale anche nell'Umbra.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "l'energia nuova ha un orologio suo.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) per quanto pesa l'invenzione: 5 stravolge il capitolo, 7 impatta sull'intera ambientazione. Durata per quanto il mondo la tiene (7 per sempre). Area per dove vale."
  },
  {
    "id": "matter-1-analizzare-un-oggetto",
    "name": "Analizzare un oggetto",
    "sphere": "matter",
    "level": 1,
    "extras": [],
    "text": "composizione, doppi fondi, il punto dove cederà",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-1-sapere-cosa-c-era-prima",
    "name": "Sapere cosa c'era prima",
    "sphere": "matter",
    "level": 1,
    "extras": [],
    "text": "il residuo parla: cosa conteneva, chi l'ha usato, quanto tempo fa",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-1-riconoscere-il-commestibile",
    "name": "Riconoscere il commestibile",
    "sphere": "matter",
    "level": 1,
    "extras": [
      {
        "sphere": "life",
        "level": 1,
        "required": true
      }
    ],
    "text": "+ Vita ●: un'occhiata dice se il piatto nutre, marcisce o avvelena",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-2-aprire-appigli-nella-parete",
    "name": "Aprire appigli nella parete",
    "sphere": "matter",
    "level": 2,
    "extras": [],
    "text": "la facciata liscia germoglia maniglie su misura per le tue mani",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-2-ferire-un-vampiro",
    "name": "Ferire un vampiro",
    "sphere": "matter",
    "level": 2,
    "extras": [
      {
        "sphere": "life",
        "level": 3,
        "required": false
      }
    ],
    "text": "carne morta: la tocchi come materia. Via Vita: + Vita ●●●",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-2-invecchiare-un-oggetto",
    "name": "Invecchiare un oggetto",
    "sphere": "matter",
    "level": 2,
    "extras": [
      {
        "sphere": "time",
        "level": 3,
        "required": true
      }
    ],
    "text": "+ Tempo ●●●: ruggine e polvere di decenni in un minuto",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-2-modellare-un-passe-partout",
    "name": "Modellare un passe-partout",
    "sphere": "matter",
    "level": 2,
    "extras": [],
    "text": "la chiave sbagliata cola e si riassesta nei denti giusti",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-2-riforgiare-le-munizioni",
    "name": "Riforgiare le munizioni",
    "sphere": "matter",
    "level": 2,
    "extras": [],
    "text": "i proiettili in canna cambiano lega: argento, gomma, sale",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-2-rimettere-a-posto",
    "name": "Rimettere a posto",
    "sphere": "matter",
    "level": 2,
    "extras": [],
    "text": "la crepa si chiude, l'ingranaggio torna in tolleranza, lo strappo si richiude",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-2-trasformare-l-aria-in-sonnifero",
    "name": "Trasformare l'aria in sonnifero",
    "sphere": "matter",
    "level": 2,
    "extras": [],
    "text": "l'aria della stanza si fa dolciastra, e la sala si addormenta",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-2-trasmutare-una-sostanza",
    "name": "Trasmutare una sostanza",
    "sphere": "matter",
    "level": 2,
    "extras": [],
    "text": "piombo in oro: forma, volume e stato intatti; i preziosi costano successi",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-3-alzare-un-muro-dal-terreno",
    "name": "Alzare un muro dal terreno",
    "sphere": "matter",
    "level": 3,
    "extras": [],
    "text": "l'asfalto si solleva e ti fa da barricata",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-3-animare-ossa-nude",
    "name": "Animare ossa nude",
    "sphere": "matter",
    "level": 3,
    "extras": [
      {
        "sphere": "prime",
        "level": 2,
        "required": true
      },
      {
        "sphere": "life",
        "level": 3,
        "required": true
      },
      {
        "sphere": "prime",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Primordio ●●: lo scheletro si alza, struttura senz'anima; cadavere intero: + Vita ●●● + Primordio ●●",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-3-appesantire-o-alleggerire",
    "name": "Appesantire o alleggerire",
    "sphere": "matter",
    "level": 3,
    "extras": [],
    "text": "la refurtiva pesa piume, la porta del nemico pesa tonnellate",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-3-evocare-un-oggetto-dal-nulla",
    "name": "Evocare un oggetto dal nulla",
    "sphere": "matter",
    "level": 3,
    "extras": [
      {
        "sphere": "prime",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Primordio ●●: il coltello che prima non c'era; congegni complessi: ●●●●",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-3-guastare-senza-rompere",
    "name": "Guastare senza rompere",
    "sphere": "matter",
    "level": 3,
    "extras": [],
    "text": "l'oggetto sembra intatto e smette di funzionare: nessuno capisce perché",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-3-rimodellare-o-disintegrare",
    "name": "Rimodellare o disintegrare",
    "sphere": "matter",
    "level": 3,
    "extras": [
      {
        "sphere": "entropy",
        "level": 3,
        "required": false
      },
      {
        "sphere": "time",
        "level": 2,
        "required": false
      }
    ],
    "text": "la serranda cola. Per disintegrare anche: + Entropia ●●● + Tempo ●●",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-3-rinforzare-gli-abiti",
    "name": "Rinforzare gli abiti",
    "sphere": "matter",
    "level": 3,
    "extras": [],
    "text": "la giacca pesa uguale e ferma i coltelli come maglia d'acciaio",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-4-costruire-macchinari-complessi",
    "name": "Costruire macchinari complessi",
    "sphere": "matter",
    "level": 4,
    "extras": [],
    "text": "dal rottame al motore funzionante, con la tua firma",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-4-innestare-la-macchina-nella-carne",
    "name": "Innestare la macchina nella carne",
    "sphere": "matter",
    "level": 4,
    "extras": [
      {
        "sphere": "life",
        "level": 4,
        "required": true
      },
      {
        "sphere": "prime",
        "level": 3,
        "required": true
      }
    ],
    "text": "+ Vita ●●●● + Primordio ●●●: il metallo entra nel corpo, e il corpo lo accetta come suo",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-4-rifare-un-edificio",
    "name": "Rifare un edificio",
    "sphere": "matter",
    "level": 4,
    "extras": [],
    "text": "la struttura si riassesta: pareti spostate, piani aggiunti, la casa che cambia pianta",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-4-sigillare-per-sempre",
    "name": "Sigillare per sempre",
    "sphere": "matter",
    "level": 4,
    "extras": [],
    "text": "la porta smette di essere una porta: muro pieno, senza giunzione",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-5-creare-una-lega-impossibile",
    "name": "Creare una lega impossibile",
    "sphere": "matter",
    "level": 5,
    "extras": [],
    "text": "leggera come stoffa e dura come nient'altro, e nessun laboratorio saprà dire cos'è",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "matter-5-rendere-permanente-il-mutamento",
    "name": "Rendere permanente il mutamento",
    "sphere": "matter",
    "level": 5,
    "extras": [],
    "text": "quello che hai trasformato smette di poter tornare indietro",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-1-leggere-aure-ed-emozioni",
    "name": "Leggere aure ed emozioni",
    "sphere": "mind",
    "level": 1,
    "extras": [],
    "text": "la paura sotto il sorriso; la profondità la comprano i successi",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-1-leggere-pensieri-e-ricordi",
    "name": "Leggere pensieri e ricordi",
    "sphere": "mind",
    "level": 1,
    "extras": [],
    "text": "fino al sepolto, coi successi; le menti resistono con la Volontà",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-1-sentire-la-stanza",
    "name": "Sentire la stanza",
    "sphere": "mind",
    "level": 1,
    "extras": [],
    "text": "l'umore collettivo di una folla o di un luogo, e da dove sta arrivando",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-2-blindare-un-ricordo",
    "name": "Blindare un ricordo",
    "sphere": "mind",
    "level": 2,
    "extras": [],
    "text": "quel ricordo diventa cassaforte: nessuna lettura, nessuna riscrittura",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-2-impiantare-un-illusione-mentale",
    "name": "Impiantare un'illusione mentale",
    "sphere": "mind",
    "level": 2,
    "extras": [
      {
        "sphere": "life",
        "level": 2,
        "required": false
      }
    ],
    "text": "la vedono solo i bersagli scelti; che ferisce: ●●● (+ Vita ●● per gli Aggravati)",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-2-non-restare-in-memoria",
    "name": "Non restare in memoria",
    "sphere": "mind",
    "level": 2,
    "extras": [],
    "text": "ti vedono, ti parlano, e mezz'ora dopo saprebbero descrivere soltanto un tipo qualunque",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-2-pilotare-l-umore",
    "name": "Pilotare l'umore",
    "sphere": "mind",
    "level": 2,
    "extras": [],
    "text": "accendi o spegni un'emozione che c'è già",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-2-schermare-i-tuoi-pensieri",
    "name": "Schermare i tuoi pensieri",
    "sphere": "mind",
    "level": 2,
    "extras": [],
    "text": "mura attorno alla tua psiche: chi legge perde successi",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-2-seminare-un-idea",
    "name": "Seminare un'idea",
    "sphere": "mind",
    "level": 2,
    "extras": [
      {
        "sphere": "entropy",
        "level": 2,
        "required": false
      }
    ],
    "text": "gliela metti in testa, e da lì in poi è una fra le tante. + Entropia ●● perché sia proprio quella a tornargli in mente",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-3-addormentare",
    "name": "Addormentare",
    "sphere": "mind",
    "level": 3,
    "extras": [
      {
        "sphere": "life",
        "level": 3,
        "required": false
      }
    ],
    "text": "le palpebre del bersaglio si arrendono in tre respiri; anche + Vita ●●●",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-3-assalto-psichico",
    "name": "Assalto psichico",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "danno alla Volontà, mente contro mente",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-3-entrare-e-dirigere-i-sogni",
    "name": "Entrare e dirigere i sogni",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "il sonno altrui diventa il tuo palcoscenico",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-3-legare-le-menti-della-squadra",
    "name": "Legare le menti della squadra",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "la Cabala pensa in coro: ognuno sente ciò che serve agli altri",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-3-risanare-la-volonta",
    "name": "Risanare la Volontà",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "1 successo per livello; Aggravati: +1 Quintessenza; la tua: ●●",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-3-sciogliere-la-lingua",
    "name": "Sciogliere la lingua",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "il bersaglio dice tutto ciò che pensa, e si stupisce di dirlo",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-3-telepatia-piena",
    "name": "Telepatia piena",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "dialogo completo, mente a mente",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-3-tradurre-le-lingue",
    "name": "Tradurre le lingue",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "il significato ti arriva prima delle parole",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-4-comandare-una-mente",
    "name": "Comandare una mente",
    "sphere": "mind",
    "level": 4,
    "extras": [],
    "text": "ordini assoluti; ben eseguito, il bersaglio razionalizza",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-4-dare-una-facolta-che-non-aveva",
    "name": "Dare una facoltà che non aveva",
    "sphere": "mind",
    "level": 4,
    "extras": [
      {
        "sphere": "prime",
        "level": 3,
        "required": true
      }
    ],
    "text": "+ Primordio ●●●: creatività, orecchio, coraggio: materia nuova invece che materia piegata",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-4-inceppare-una-mente",
    "name": "Inceppare una mente",
    "sphere": "mind",
    "level": 4,
    "extras": [],
    "text": "nella sua testa resta un solo compito assurdo: il mondo può attendere",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-4-mostrarti-in-corpo-di-luce",
    "name": "Mostrarti in corpo di luce",
    "sphere": "mind",
    "level": 4,
    "extras": [
      {
        "sphere": "spirit",
        "level": 3,
        "required": true
      },
      {
        "sphere": "prime",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Spirito ●●● + Primordio ●●: la tua forma astrale si stacca e si mostra ai presenti",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-4-riscrivere-ricordi",
    "name": "Riscrivere ricordi",
    "sphere": "mind",
    "level": 4,
    "extras": [],
    "text": "cancelli e cuci; la personalità intera: ●●●●●",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-4-seminare-un-ordine-dormiente",
    "name": "Seminare un ordine dormiente",
    "sphere": "mind",
    "level": 4,
    "extras": [],
    "text": "l'istruzione resta latente per mesi e si sveglia alla parola convenuta",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-5-accendere-un-intelletto",
    "name": "Accendere un intelletto",
    "sphere": "mind",
    "level": 5,
    "extras": [
      {
        "sphere": "prime",
        "level": 3,
        "required": true
      }
    ],
    "text": "+ Primordio ●●●: una coscienza dove non ce n'era: la macchina che pensa, il luogo che sa di esistere",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "mind-5-riforgiare-una-personalita",
    "name": "Riforgiare una personalità",
    "sphere": "mind",
    "level": 5,
    "extras": [],
    "text": "la persona che esce è coerente, funzionante e diversa, e non lo sospetta",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-1-percepire-la-magia",
    "name": "Percepire la magia",
    "sphere": "prime",
    "level": 1,
    "extras": [],
    "text": "l'incantesimo ancora caldo, la firma di chi ha lanciato",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-1-vedere-quanto-e-carico",
    "name": "Vedere quanto è carico",
    "sphere": "prime",
    "level": 1,
    "extras": [],
    "text": "quanta Quintessenza resta a un Nodo, a una Meraviglia, a un mago",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-1-consacrare-un-oggetto",
    "name": "Consacrare un oggetto",
    "sphere": "prime",
    "level": 1,
    "extras": [],
    "text": "legato a te, ti segue in ogni trasformazione",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-1-leggere-le-aure",
    "name": "Leggere le aure",
    "sphere": "prime",
    "level": 1,
    "extras": [
      {
        "sphere": "life",
        "level": 1,
        "required": true
      }
    ],
    "text": "+ Vita ●: l'alone dei vivi si accende: più forte la vita, più brilla",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-1-vedere-l-avatar",
    "name": "Vedere l'Avatar",
    "sphere": "prime",
    "level": 1,
    "extras": [
      {
        "sphere": "spirit",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Spirito ●●: la scintilla che rende Risvegliato un Risvegliato: forma, colore, e quanto è sveglia",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-2-bruciare-l-attrito-in-anticipo",
    "name": "Bruciare l'attrito in anticipo",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "spendi Quintessenza e togli Paradosso quando decidi tu (5.6)",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-2-creare-dal-nulla",
    "name": "Creare dal nulla",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "+ la Sfera del Modello, Regola del Nulla: tu porti la materia prima, l'altra Sfera la forma",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-2-creare-grezzo",
    "name": "Creare grezzo",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "energia grezza, che si spegne quando molli la presa. Volgare con Testimoni, sempre",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-2-destabilizzare-un-modello",
    "name": "Destabilizzare un Modello",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "scuoti la trama stessa del bersaglio: danno diretto al Modello delle cose",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-2-forgiare-costrutti-di-pura-energia",
    "name": "Forgiare costrutti di pura energia",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "dardi e lame di luce, finché la Quintessenza regge",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-2-incantare-un-arma",
    "name": "Incantare un'arma",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "danni Aggravati nel filo della lama; morde anche gli spiriti",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-2-mascherare-la-tua-aura",
    "name": "Mascherare la tua aura",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "la tua firma si spegne o mente: per i sensi mistici sei un altro",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-3-assorbire-e-incanalare",
    "name": "Assorbire e incanalare",
    "sphere": "prime",
    "level": 3,
    "extras": [],
    "text": "da Nodi altrui alla tua Ruota, o dove serve",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-3-innestare-la-macchina-nella-carne",
    "name": "Innestare la macchina nella carne",
    "sphere": "prime",
    "level": 3,
    "extras": [
      {
        "sphere": "matter",
        "level": 4,
        "required": true
      },
      {
        "sphere": "life",
        "level": 4,
        "required": true
      }
    ],
    "text": "+ Materia ●●●● + Vita ●●●●: la tua energia salda l'acciaio al battito",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-3-rianimare-un-morto-recente",
    "name": "Rianimare un morto recente",
    "sphere": "prime",
    "level": 3,
    "extras": [
      {
        "sphere": "life",
        "level": 4,
        "required": true
      },
      {
        "sphere": "spirit",
        "level": 4,
        "required": true
      }
    ],
    "text": "+ Vita ●●●● + Spirito ●●●●: la scintilla riaccesa nel Modello spento; Volgare, sempre",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-3-travasare-a-un-altro-mago",
    "name": "Travasare a un altro mago",
    "sphere": "prime",
    "level": 3,
    "extras": [],
    "text": "la tua energia entra nella sua Ruota, se lì c'è posto",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-4-creare-un-feticcio",
    "name": "Creare un Feticcio",
    "sphere": "prime",
    "level": 4,
    "extras": [
      {
        "sphere": "spirit",
        "level": 4,
        "required": false
      }
    ],
    "text": "spirito consenziente: la tua energia gli fa da casa. A forza: + Spirito ●●●●",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-4-deviare-il-contraccolpo",
    "name": "Deviare il Contraccolpo",
    "sphere": "prime",
    "level": 4,
    "extras": [],
    "text": "lo attutisci, lo assorbi in Quintessenza, o lo trasli su un altro (5.6)",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-4-drenare-un-nodo",
    "name": "Drenare un Nodo",
    "sphere": "prime",
    "level": 4,
    "extras": [],
    "text": "strappi la sorgente, e il luogo appassisce",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-4-drenare-una-creatura",
    "name": "Drenare una creatura",
    "sphere": "prime",
    "level": 4,
    "extras": [],
    "text": "+ la Sfera del bersaglio: l'energia esce da ciò che la portava. Sui viventi lascia Macchie",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-4-levare-un-campo-di-negazione",
    "name": "Levare un campo di negazione",
    "sphere": "prime",
    "level": 4,
    "extras": [],
    "text": "nell'area la Magick altrui nasce già stanca: ogni effetto si smorza",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-4-spegnere-una-meraviglia",
    "name": "Spegnere una Meraviglia",
    "sphere": "prime",
    "level": 4,
    "extras": [],
    "text": "le togli la carica: l'oggetto resta, e smette di essere speciale",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-5-creare-un-nodo",
    "name": "Creare un Nodo",
    "sphere": "prime",
    "level": 5,
    "extras": [],
    "text": "una sorgente nuova nel mondo, dove prima il mondo era ordinario",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-5-produrre-quintessenza",
    "name": "Produrre Quintessenza",
    "sphere": "prime",
    "level": 5,
    "extras": [],
    "text": "la fai nascere dove non ce n'era: il gesto che nessuna spesa e nessun furto sostituiscono",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-5-radicare-un-incantesimo-per-sempre",
    "name": "Radicare un incantesimo per sempre",
    "sphere": "prime",
    "level": 5,
    "extras": [],
    "text": "l'effetto entra nell'Arazzo e smette di dipendere da te",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "prime-5-rifiutare-il-contraccolpo",
    "name": "Rifiutare il Contraccolpo",
    "sphere": "prime",
    "level": 5,
    "extras": [],
    "text": "sai con cosa hanno costruito il Paradosso, e puoi dirgli di no (5.6)",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-1-vedere-oltre-il-velo",
    "name": "Vedere oltre il Velo",
    "sphere": "spirit",
    "level": 1,
    "extras": [],
    "text": "la Penumbra, lo spessore della parete, le cariche mistiche negli oggetti",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-1-sapere-cosa-e-morto-qui",
    "name": "Sapere cosa è morto qui",
    "sphere": "spirit",
    "level": 1,
    "extras": [],
    "text": "il luogo racconta chi se n'è andato, quando, e se è rimasto qualcosa",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-1-leggere-l-anima",
    "name": "Leggere l'anima",
    "sphere": "spirit",
    "level": 1,
    "extras": [],
    "text": "quanto è integra una persona, cosa si porta addosso e da quanto tempo",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-1-leggere-la-geografia-di-la",
    "name": "Leggere la geografia di là",
    "sphere": "spirit",
    "level": 1,
    "extras": [],
    "text": "la mappa dell'altro lato in quel punto: dove si passa, dove porta, chi comanda",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-1-guardare-lontano",
    "name": "Guardare lontano",
    "sphere": "spirit",
    "level": 1,
    "extras": [],
    "text": "la vista si stacca dal luogo e va dove nessuno ha mappato. Chi guarda tanto, prima o poi, viene guardato",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-1-riconoscere-il-sovrannaturale",
    "name": "Riconoscere il sovrannaturale",
    "sphere": "spirit",
    "level": 1,
    "extras": [
      {
        "sphere": "life",
        "level": 1,
        "required": true
      }
    ],
    "text": "+ Vita ●: uno sguardo dice cosa hai davanti: vampiro, mutaforma, morto, peggio",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-2-aprire-una-trattativa",
    "name": "Aprire una trattativa",
    "sphere": "spirit",
    "level": 2,
    "extras": [],
    "text": "l'offerta formale: dichiari cosa porti e cosa chiedi, e da lì si contratta",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-2-chiamare-il-tuo-alleato",
    "name": "Chiamare il tuo alleato",
    "sphere": "spirit",
    "level": 2,
    "extras": [],
    "text": "la voce del famiglio o del patrono ti risponde, ovunque sia",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-2-ispessire-o-assottigliare-il-velo",
    "name": "Ispessire o assottigliare il Velo",
    "sphere": "spirit",
    "level": 2,
    "extras": [],
    "text": "apri la strada ai tuoi, la sbarri agli altri",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-2-parlare-con-chi-sta-di-la",
    "name": "Parlare con chi sta di là",
    "sphere": "spirit",
    "level": 2,
    "extras": [],
    "text": "la tua voce attraversa la parete sottile",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-3-attraversare-il-velo",
    "name": "Attraversare il Velo",
    "sphere": "spirit",
    "level": 3,
    "extras": [],
    "text": "in carne e ossa; occhio alla barriera locale",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-3-chiudere-un-passaggio",
    "name": "Chiudere un passaggio",
    "sphere": "spirit",
    "level": 3,
    "extras": [],
    "text": "il varco che qualcuno usava smette di esistere, e chi lo stava usando resta dov'è",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-3-colpire-l-anima",
    "name": "Colpire l'anima",
    "sphere": "spirit",
    "level": 3,
    "extras": [
      {
        "sphere": "life",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Vita ●● su un vivente: danno alla Saggezza, uno dei pochissimi modi che esistano",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-3-ferire-l-immateriale",
    "name": "Ferire l'immateriale",
    "sphere": "spirit",
    "level": 3,
    "extras": [
      {
        "sphere": "entropy",
        "level": 3,
        "required": false
      },
      {
        "sphere": "prime",
        "level": 2,
        "required": false
      }
    ],
    "text": "colpisci l'effimera come fosse carne; anche + Entropia ●●● + Primordio ●●",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-3-ferire-un-mutaforma",
    "name": "Ferire un mutaforma",
    "sphere": "spirit",
    "level": 3,
    "extras": [
      {
        "sphere": "life",
        "level": 2,
        "required": true
      },
      {
        "sphere": "life",
        "level": 3,
        "required": true
      },
      {
        "sphere": "spirit",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Vita ●●: il loro Modello è ibrido; a scelta: + Vita ●●● + Spirito ●●",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-3-mostrarti-in-corpo-di-luce",
    "name": "Mostrarti in corpo di luce",
    "sphere": "spirit",
    "level": 3,
    "extras": [
      {
        "sphere": "mind",
        "level": 4,
        "required": true
      },
      {
        "sphere": "prime",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Mente ●●●● + Primordio ●●: la tua forma astrale si mostra ai presenti",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-3-aprire-la-prova-dell-anima",
    "name": "Aprire la prova dell'anima",
    "sphere": "spirit",
    "level": 3,
    "extras": [
      {
        "sphere": "life",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Vita ●●: non cancelli niente da solo, apri una porta. Lo aspetta una prova cucita sulle sue Convinzioni; se la supera, ogni Macchia se ne va. Una sola per cronaca, a testa",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-3-svegliare-cio-che-dorme-in-un-oggetto",
    "name": "Svegliare ciò che dorme in un oggetto",
    "sphere": "spirit",
    "level": 3,
    "extras": [],
    "text": "il vecchio fucile si ricorda di avere un'opinione, e ti è amico",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-4-creare-un-feticcio",
    "name": "Creare un Feticcio",
    "sphere": "spirit",
    "level": 4,
    "extras": [
      {
        "sphere": "prime",
        "level": 4,
        "required": false
      }
    ],
    "text": "l'entità legata nell'oggetto; consenziente: + Primordio ●●●●",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-4-esiliare-oltre-il-velo",
    "name": "Esiliare oltre il Velo",
    "sphere": "spirit",
    "level": 4,
    "extras": [],
    "text": "il bersaglio precipita dall'altro lato, e il ritorno è affar suo",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-4-esorcizzare-un-posseduto",
    "name": "Esorcizzare un posseduto",
    "sphere": "spirit",
    "level": 4,
    "extras": [],
    "text": "il corpo torna libero, l'ospite torna di là",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-4-evocare-e-vincolare",
    "name": "Evocare e vincolare",
    "sphere": "spirit",
    "level": 4,
    "extras": [
      {
        "sphere": "mind",
        "level": 2,
        "required": false
      }
    ],
    "text": "l'entità risponde all'appello; per comandarla: + Mente ●●",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-4-imprigionare-un-avatar",
    "name": "Imprigionare un Avatar",
    "sphere": "spirit",
    "level": 4,
    "extras": [],
    "text": "la scintilla di un Risvegliato resta chiusa fuori dalla sua portata, finché reggi il vincolo",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-4-intrappolare",
    "name": "Intrappolare",
    "sphere": "spirit",
    "level": 4,
    "extras": [],
    "text": "la trappola scatta: niente poteri, niente fuga, finché la mantieni",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-4-rianimare-un-morto-recente",
    "name": "Rianimare un morto recente",
    "sphere": "spirit",
    "level": 4,
    "extras": [
      {
        "sphere": "life",
        "level": 4,
        "required": true
      },
      {
        "sphere": "prime",
        "level": 3,
        "required": true
      }
    ],
    "text": "+ Vita ●●●● + Primordio ●●●: richiami l'anima oltre il Velo; Volgare, sempre, ovunque",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-5-aprire-un-regno",
    "name": "Aprire un Regno",
    "sphere": "spirit",
    "level": 5,
    "extras": [],
    "text": "un luogo nuovo di là, con le sue leggi e i suoi confini, che resta quando te ne vai",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-5-dare-corpo-a-una-presenza",
    "name": "Dare corpo a una presenza",
    "sphere": "spirit",
    "level": 5,
    "extras": [
      {
        "sphere": "prime",
        "level": 3,
        "required": true
      }
    ],
    "text": "+ Primordio ●●●: un'entità dove non ce n'era: nasce con una fame, e la fame la scegli tu",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-5-il-gilgul",
    "name": "Il Gilgul",
    "sphere": "spirit",
    "level": 5,
    "extras": [],
    "text": "spezzi l'Avatar di un Risvegliato. Si fa una volta sola, e chi lo fa smette di essere quello di prima",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "spirit-5-provocare-un-risveglio",
    "name": "Provocare un Risveglio",
    "sphere": "spirit",
    "level": 5,
    "extras": [],
    "text": "apri gli occhi a un Dormiente. Non è un dono e non si chiede permesso: è una porta spalancata addosso a qualcuno che dormiva",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-1-leggere-il-flusso",
    "name": "Leggere il flusso",
    "sphere": "time",
    "level": 1,
    "extras": [],
    "text": "ora esatta, anomalie, la linea del luogo a ritroso; la profondità la comprano i successi",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-1-leggere-la-linea-di-una-persona",
    "name": "Leggere la linea di una persona",
    "sphere": "time",
    "level": 1,
    "extras": [],
    "text": "il suo passato addosso a lei, e i rami che le partono da adesso",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-1-trovare-le-cuciture",
    "name": "Trovare le cuciture",
    "sphere": "time",
    "level": 1,
    "extras": [],
    "text": "i punti in cui il tempo è stato rifatto da qualcuno prima di te",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-2-il-vantaggio-del-primo-istante",
    "name": "Il vantaggio del primo istante",
    "sphere": "time",
    "level": 2,
    "extras": [],
    "text": "quando la violenza esplode, tu eri pronto da un attimo",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-2-vedere-e-proiettare-passato-o-futuro",
    "name": "Vedere e proiettare passato o futuro",
    "sphere": "time",
    "level": 2,
    "extras": [
      {
        "sphere": "correspondence",
        "level": 2,
        "required": false
      }
    ],
    "text": "la scena rivive, nitida e mostrabile; lontano da qui: + Corrispondenza ●●",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-2-vegliare-sui-futuri-prossimi",
    "name": "Vegliare sui futuri prossimi",
    "sphere": "time",
    "level": 2,
    "extras": [
      {
        "sphere": "entropy",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Entropia ●●: tieni d'occhio i prossimi istanti: niente ti coglie di sorpresa",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-3-accelerare-e-rallentare",
    "name": "Accelerare e rallentare",
    "sphere": "time",
    "level": 3,
    "extras": [],
    "text": "tu doppio, lui a metà; l'Ora Rubata vive qui (5.9): un'azione extra per turno, finché regge",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-3-far-maturare-in-un-ora",
    "name": "Far maturare in un'ora",
    "sphere": "time",
    "level": 3,
    "extras": [
      {
        "sphere": "life",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Vita ●●: la vigna fa in un pomeriggio la sua stagione intera",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-3-invecchiare-qualcuno",
    "name": "Invecchiare qualcuno",
    "sphere": "time",
    "level": 3,
    "extras": [
      {
        "sphere": "life",
        "level": 2,
        "required": true
      },
      {
        "sphere": "matter",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Vita ●●: decenni scaricati nel corpo; un oggetto: + Materia ●●",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-3-riavvolgere-la-scena",
    "name": "Riavvolgere la scena",
    "sphere": "time",
    "level": 3,
    "extras": [],
    "text": "gli ultimi istanti tornano indietro; per ricordarlo: + Mente",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-3-riavvolgere-un-corpo",
    "name": "Riavvolgere un corpo",
    "sphere": "time",
    "level": 3,
    "extras": [
      {
        "sphere": "life",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Vita ●●: le ferite si richiudono a ritroso, come un nastro mandato indietro",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-3-ridurre-in-polvere-un-oggetto",
    "name": "Ridurre in polvere un oggetto",
    "sphere": "time",
    "level": 3,
    "extras": [
      {
        "sphere": "entropy",
        "level": 2,
        "required": true
      },
      {
        "sphere": "matter",
        "level": 3,
        "required": true
      }
    ],
    "text": "+ Entropia ●●: anni di decadimento in un istante; via diretta: + Materia ●●●",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-3-saltare-l-attimo-del-colpo",
    "name": "Saltare l'attimo del colpo",
    "sphere": "time",
    "level": 3,
    "extras": [],
    "text": "un passo nel futuro immediato: l'attacco attraversa il punto dove eri",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-4-ancorare-il-presente",
    "name": "Ancorare il presente",
    "sphere": "time",
    "level": 4,
    "extras": [],
    "text": "fissi un punto fermo nel flusso: la base di viaggi e ritorni",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-4-avvertire-il-te-di-ieri",
    "name": "Avvertire il te di ieri",
    "sphere": "time",
    "level": 4,
    "extras": [
      {
        "sphere": "mind",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Mente ●●: un ricordo torna indietro di minuti e cambia la scena",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-4-chiudere-un-area-in-un-anello",
    "name": "Chiudere un'area in un anello",
    "sphere": "time",
    "level": 4,
    "extras": [
      {
        "sphere": "mind",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Mente ●●: gli stessi tre minuti, ancora e ancora, finché non decidi tu",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-4-fermare-il-tempo-in-un-area",
    "name": "Fermare il tempo in un'area",
    "sphere": "time",
    "level": 4,
    "extras": [],
    "text": "la stanza in stasi, con tutto ciò che contiene",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-4-sospendere-un-incantesimo",
    "name": "Sospendere un incantesimo",
    "sphere": "time",
    "level": 4,
    "extras": [],
    "text": "l'effetto dorme fuori dal flusso e attende la condizione",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-5-rifare-un-evento",
    "name": "Rifare un evento",
    "sphere": "time",
    "level": 5,
    "extras": [],
    "text": "non la scena di poco fa, ma il fatto: quello che è successo smette di essere successo",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-5-smettere-di-invecchiare",
    "name": "Smettere di invecchiare",
    "sphere": "time",
    "level": 5,
    "extras": [],
    "text": "gli anni ti scorrono accanto: resti quello che eri il giorno in cui hai imparato",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "time-5-viaggiare-nel-tempo",
    "name": "Viaggiare nel tempo",
    "sphere": "time",
    "level": 5,
    "extras": [],
    "text": "vai e torni davvero, col corpo. Quello che trovi al ritorno è affar tuo",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-1-percepire-salute-e-condizioni",
    "name": "Percepire salute e condizioni",
    "sphere": "life",
    "level": 1,
    "extras": [],
    "text": "età vera, emorragie interne, il farmaco che mente",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-1-leggere-la-storia-di-un-corpo",
    "name": "Leggere la storia di un corpo",
    "sphere": "life",
    "level": 1,
    "extras": [],
    "text": "vecchie fratture, cicatrici che non si vedono, il mestiere che ha fatto",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-1-riconoscere-il-sovrannaturale",
    "name": "Riconoscere il sovrannaturale",
    "sphere": "life",
    "level": 1,
    "extras": [
      {
        "sphere": "spirit",
        "level": 1,
        "required": true
      }
    ],
    "text": "+ Spirito ●: uno sguardo dice se quello davanti a te è umano",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-2-curare-o-causare-malattie",
    "name": "Curare o causare malattie",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "nella vita semplice e in te stesso; su un altro: ●●●",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-2-fingere-la-morte",
    "name": "Fingere la morte",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "battito e respiro scendono a zero apparente: i becchini ci cascano",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-2-guarire-te-stesso",
    "name": "Guarire te stesso",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "1 successo per livello; Aggravati: +1 Quintessenza ciascuno",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-2-immunizzarti",
    "name": "Immunizzarti",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "il tuo sangue impara il veleno prima che faccia danno",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-2-ritoccarti-i-connotati",
    "name": "Ritoccarti i connotati",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "capelli, lineamenti, dettagli: il tuo Modello, di un soffio",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-2-smettere-di-aver-bisogno",
    "name": "Smettere di aver bisogno",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "fame, sete, sonno e respiro si mettono in pausa finché reggi l'effetto",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-3-accelerare-una-guarigione-naturale",
    "name": "Accelerare una guarigione naturale",
    "sphere": "life",
    "level": 3,
    "extras": [],
    "text": "il corpo fa in una notte il lavoro di due settimane, e chiede da mangiare",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-3-addormentare",
    "name": "Addormentare",
    "sphere": "life",
    "level": 3,
    "extras": [
      {
        "sphere": "mind",
        "level": 3,
        "required": false
      }
    ],
    "text": "il corpo del bersaglio decide che è notte fonda; anche + Mente ●●●",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-3-animare-un-cadavere",
    "name": "Animare un cadavere",
    "sphere": "life",
    "level": 3,
    "extras": [
      {
        "sphere": "prime",
        "level": 2,
        "required": true
      },
      {
        "sphere": "matter",
        "level": 3,
        "required": true
      },
      {
        "sphere": "prime",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Primordio ●●: si muove senz'anima; ossa nude: + Materia ●●● + Primordio ●●",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-3-ferire-un-mutaforma",
    "name": "Ferire un mutaforma",
    "sphere": "life",
    "level": 3,
    "extras": [
      {
        "sphere": "spirit",
        "level": 2,
        "required": true
      },
      {
        "sphere": "spirit",
        "level": 3,
        "required": true
      },
      {
        "sphere": "life",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Spirito ●●: il loro Modello è ibrido; a scelta: + Spirito ●●● + Vita ●●",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-3-ferire-un-vampiro",
    "name": "Ferire un vampiro",
    "sphere": "life",
    "level": 3,
    "extras": [],
    "text": "carne morta animata; via Materia: ●●",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-3-guarire-o-ferire-un-altro",
    "name": "Guarire o ferire un altro",
    "sphere": "life",
    "level": 3,
    "extras": [],
    "text": "la Regola del Sé al lavoro: il Modello altrui chiede il terzo pallino",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-3-potenziare-il-fisico",
    "name": "Potenziare il fisico",
    "sphere": "life",
    "level": 3,
    "extras": [],
    "text": "attributi accresciuti, artigli, branchie, corazza: il tuo corpo risponde",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-4-diventare-interamente-altro",
    "name": "Diventare interamente altro",
    "sphere": "life",
    "level": 4,
    "extras": [],
    "text": "il tuo Modello cambia da capo, e ci resti finché paghi la Durata",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-4-guarire-l-inguaribile",
    "name": "Guarire l'inguaribile",
    "sphere": "life",
    "level": 4,
    "extras": [],
    "text": "ciò che la medicina dichiara irreversibile torna indietro. Il corpo regge; il resto è affar suo",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-4-innestare-la-macchina-nella-carne",
    "name": "Innestare la macchina nella carne",
    "sphere": "life",
    "level": 4,
    "extras": [
      {
        "sphere": "matter",
        "level": 4,
        "required": true
      },
      {
        "sphere": "prime",
        "level": 3,
        "required": true
      }
    ],
    "text": "+ Materia ●●●● + Primordio ●●●: il metallo entra nel corpo, e il corpo lo accetta come suo",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-4-riscrivere-il-corpo-di-un-altro",
    "name": "Riscrivere il corpo di un altro",
    "sphere": "life",
    "level": 4,
    "extras": [],
    "text": "forma, proporzioni, funzioni: esce diverso da come è entrato",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-4-trasformare-in-animale",
    "name": "Trasformare in animale",
    "sphere": "life",
    "level": 4,
    "extras": [],
    "text": "il Modello passa a un'altra specie, con quello che comporta pensarci dentro",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-5-creare-un-organismo",
    "name": "Creare un organismo",
    "sphere": "life",
    "level": 5,
    "extras": [
      {
        "sphere": "prime",
        "level": 3,
        "required": true
      }
    ],
    "text": "+ Primordio ●●●: vita nuova, con una forma che decidi tu e una fame che decide lei",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-5-metamorfosi-senza-limiti",
    "name": "Metamorfosi senza limiti",
    "sphere": "life",
    "level": 5,
    "extras": [],
    "text": "massa, specie e scala smettono di essere un problema",
    "pairings": [],
    "scopes": ""
  },
  {
    "id": "life-5-rendere-permanente-il-mutamento",
    "name": "Rendere permanente il mutamento",
    "sphere": "life",
    "level": 5,
    "extras": [],
    "text": "quello che hai riscritto smette di poter tornare indietro, e diventa il suo Modello vero",
    "pairings": [],
    "scopes": ""
  }
]);
