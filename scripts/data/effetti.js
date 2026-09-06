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
        "text": "Sapere dov'è «meglio» che tu sia.",
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
        "text": "Nodi del fato, eventi della sorte, luoghi fortunati e sfortunati etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Circuiti elettrici, fonti di calore, dove si muove l'energia etc..",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Oggetti, edifici, planimetrie, un oggetto specifico etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Un sogno specifico, quanto è propagata un'idea etc..",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Magick nell'area, dove tocca, Quintessenza etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Anime, crepe nell'Umbra, creature spirituali etc..",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Anomalie, alterazioni del flusso nell'ambiente etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Insetti, piante, animali, persone etc..",
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
        "text": "Far inceppare la pistola nella stanza accanto etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Spegnere le luci del magazzino in fondo alla via etc..",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Aprire la cassaforte dall'altra parte della città etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Sussurrare un pensiero a chi dorme a chilometri da te etc..",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Attingere Quintessenza da un Nodo lontano etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Parlare con lo spirito del fiume senza andarci etc..",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Rallentare il corridoio dove passeranno i sicari etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Chiudere la ferita del compagno rimasto indietro etc..",
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
        "text": "Aprire più finestre insieme.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Guardare com'era ieri.",
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
        "text": "Marchiare il corpo: sai dov'è, se è ferito, vivo o morto etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Marchiare la mente: sai dov'è e come sta: paura, fretta, calma etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Marchiare l'anima: lo segui anche nell'Umbra e oltre la morte.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Marchiare l'energia che porta: il telefono acceso, l'auto in moto etc..",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Marchiare un oggetto addosso a lui: l'anello, la giacca, la pistola etc.. Se lo lascia, il filo resta sull'oggetto.",
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
        "text": "Ferire chi tocca lo schermo.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Mostrare a chi guarda dentro quello che vuoi tu.",
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
        "text": "Sapere anche chi ti cerca.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Sapere con quale Magick.",
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
        "text": "Passare la mano viva dall'altra parte, e usarla come una mano.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Passare un oggetto al posto della mano.",
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
        "text": "Lasciare al caso i nascondigli: nessuno sa dove, nemmeno tu.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Scegliere tu i nascondigli.",
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
        "text": "Far uscire la scheggia per le vie del corpo: sembra medicina.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Far uscire la scheggia come farebbe un congegno.",
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
        "text": "Richiamare l'oggetto per quello che è: arriva intero, senza strappo.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Richiamare un corpo vivo.",
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
        "text": "Scambiare due oggetti per quello che sono, senza strappo.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Scambiare due corpi.",
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
        "text": "Passare restando un corpo: il gesto si spiega.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Portare anche il carico, intero.",
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
        "text": "Ancorare un corpo.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Ancorare un oggetto.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Ancorare uno spirito fuori dall'Umbra.",
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
        "text": "Far passare un tir intero.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Nascondere il portale a chi non sa che c'è.",
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
        "text": "Fargli dimenticare il tempo perso.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Farlo arrivare quando dici tu.",
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
        "text": "Far correre il tempo diverso, là dentro.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Tenere la Quintessenza dentro, senza disperderla.",
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
        "text": "Tenere intero quel che sposti.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far ricordare al mondo che è sempre stato così.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far ricordare a chi ci vive che è sempre stato così.",
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
        "text": "Trovare il punto esatto della struttura: la saldatura vecchia, il pilastro stanco, il bullone che gioca etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Trovare il punto debole di un corpo: il ginocchio operato, la spalla che esce, il fiato corto etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Trovare il punto debole di una persona: la paura, l'orgoglio, il segreto che non deve uscire etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Trovare dove cede un impianto: il fusibile, il cavo scoperto, la valvola sotto pressione etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Trovare dove cede uno spirito o una soglia: il patto non rispettato, il nome che non vuole sentire etc..",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Sapere anche quando cederà, non solo dove.",
        "required": false
      }
    ],
    "scopes": "Precisione (dettaglio) per un punto solo e non l'insieme: 1 il muro, 3 il mattone. Bersagli per più cose alla volta. Durata 2 per tenere l'occhio acceso tutta la scena."
  },
  {
    "id": "entropy-1-fiutare-la-menzogna",
    "name": "Fiutare la menzogna",
    "sphere": "entropy",
    "level": 1,
    "extras": [],
    "text": "Senti quando un racconto stona: sai che sta mentendo, non su cosa. Le menti si difendono con la Volontà.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Sapere anche cosa nasconde, e perché.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Sentire quando a mentire è un oggetto: il documento falso, la moneta contraffatta, l'etichetta cambiata etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Sentire la bugia di uno spirito e il patto detto a metà.",
        "required": false
      }
    ],
    "scopes": "Bersagli per ascoltare più bocche insieme. Durata 2 per un interrogatorio intero. Precisione (dettaglio) per la frase esatta che stona."
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
        "text": "Pesare quanto è probabile che una persona faccia una cosa: che ceda, che tradisca, che spari etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Pesare quanto è probabile che un corpo regga: che sopravviva, che guarisca, che la ferita si infetti etc..",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Pesare quanto è probabile che una cosa regga: il ponte, la corda, il paracadute etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Pesare quanto è probabile che un impianto regga: che scarichi, che prenda fuoco, che salti la luce etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Pesare quanto è probabile che lo spirito accetti, che la soglia si apra, che il rito riesca etc..",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Pesare la probabilità di adesso e quella di fra un'ora.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Pesare le probabilità di un luogo che non vedi.",
        "required": false
      }
    ],
    "scopes": "Precisione (dettaglio) per una domanda sola e precisa invece del quadro. Area per pesare un luogo intero. Durata 2 per tenere il fiuto acceso tutta la scena."
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
        "text": "Leggere il conto di un oggetto o di una struttura: la lavatrice, il ponte, il tetto etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Leggere il conto di un corpo: quanto gli resta, quando cadrà malato, quando la ferita si chiuderà etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Leggere il conto di un legame o di una decisione: quando lascerà, quando cederà, quando cambierà idea etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Leggere il conto di un impianto: quando muore il generatore, quando si scarica la batteria etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Leggere il conto di un patto o di uno spirito: quando si scioglie, quando si disfa etc..",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Leggere il conto di un incantesimo: quanto regge la Magick di un altro.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Avere una data, con ora e minuto, al posto della cifra.",
        "required": false
      }
    ],
    "scopes": "Precisione (dettaglio) per la cifra esatta e non l'ordine di grandezza. Bersagli per più conti insieme. Durata 2 per leggere tutta la scena."
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
        "text": "Tenere in piedi anche ciò che è già rotto: il motore fuso fa un altro giro.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far reggere un corpo: il ferito arriva all'ospedale, il malato arriva a domani etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Far reggere la batteria, la torcia, il generatore oltre la carica etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far reggere la calma, la bugia, il coraggio fino a fine scena etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Far reggere lo spirito evocato, il patto, un altro giorno etc..",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Fissare fino a quando regge: esattamente fino a mezzanotte.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto deve reggere: 1 la fuga, 2 la scena, 4 la sessione. Bersagli per più cose insieme. Potenza (peso) se è grosso: il ponte, non la corda."
  },
  {
    "id": "entropy-2-inclinare-una-scelta",
    "name": "Inclinare una scelta",
    "sphere": "entropy",
    "level": 2,
    "extras": [],
    "text": "Sposti le probabilità attorno a una decisione: quando sceglierà, l'opzione che vuoi tu è quella che gli capita davanti, quella comoda, quella che gli torna in mente per prima. Non decidi per lui: prepari il caso.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Mettergli l'idea in testa, e far sì che sia proprio quella a tornargli in mente al momento giusto: sceglie l'errore convinto di averlo scelto.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far dare ragione al corpo: la stanchezza, la fame, il sonno gli fanno preferire l'opzione facile etc..",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Scegliere l'istante in cui la scelta gli si presenta.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Inclinare la scelta di chi non vedi.",
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
    "text": "Gli sguardi scivolano altrove: chi guarda verso di te trova sempre qualcosa di meglio da guardare, la telecamera gira nel momento sbagliato, la guardia starnutisce. Nessuno ricorda di averti visto. Non sei invisibile: chi ti vede è improbabile.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Farti dimenticare subito da chi ti vede.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Far sbagliare anche la telecamera, il sensore, il faro etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Non farti fiutare nemmeno dal cane.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Passare inosservato anche agli spiriti e a chi guarda dall'Umbra.",
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
        "text": "Guastare anche ciò che è sano: la Materia lo indebolisce, il caso sceglie l'istante.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Guastare l'impianto: il quadro elettrico, il generatore, la rete etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far sbagliare il corpo: la caviglia cede, arriva il crampo, manca il fiato etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Guastare in testa: la parola dimenticata, il numero sbagliato, il nome che non torna etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Inceppare il rito degli altri, o lo spirito che non risponde alla chiamata etc..",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Scegliere l'istante esatto: si rompe quando lo tocca lui.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Guastare quello che non vedi.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto è grosso quel che cede: 1 la serratura, 3 l'auto, 5 la casa. Condizioni 1 per farlo scattare al momento giusto: quando gira la chiave. Precisione (dettaglio) per il pezzo giusto e non l'insieme. Bersagli per più cose."
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
        "text": "Spegnere la loro auto, far gracchiare la radio, far sbagliare strada al navigatore etc..",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Mettergli contro la strada: la buca, il cancello chiuso, il tombino aperto etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Fargli perdere la tua traccia e convincerli di un'altra strada.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far perdere l'odore al cane, stancare il segugio etc..",
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
        "text": "Truccare anche l'oggetto che non lascia niente al caso: il dado piombato, la slot programmata etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Truccare la macchina: il generatore di numeri, la lotteria elettronica etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far sbagliare all'altro giocatore proprio la mossa giusta.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Scegliere il momento in cui la fortuna gira.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Truccare il tavolo che non vedi.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più giocatori o più tavoli. Condizioni 1 per legarla a una mano precisa. Precisione (dettaglio) per il risultato esatto e non «vinco»: il sette, il doppio sei."
  },
  {
    "id": "entropy-3-deviare-la-malasorte",
    "name": "Deviare la malasorte",
    "sphere": "entropy",
    "level": 3,
    "extras": [],
    "text": "Ogni colpo ti manca per un soffio, e sembra sempre fortuna: la pallottola sfiora, il tetto cede un passo dietro di te, il vetro cade dall'altra parte. Non diventi più resistente: i colpi ti mancano.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Deviare anche le disgrazie del corpo: il contagio, il veleno, l'infarto etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Deviare le energie: il fulmine, la scarica, la fiammata etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far sbagliare qualcosa a chi ti tende una trappola.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Deviare le maledizioni degli spiriti e i colpi dall'Umbra.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far sbagliare bersaglio anche alla Magick altrui.",
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
        "text": "Distribuire la fortuna nelle teste: le tue idee arrivano, le loro no.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Distribuire la fortuna nei corpi: i tuoi non si ammalano, i loro sì.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Distribuire la fortuna negli impianti: le vostre macchine partono, le loro no.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Distribuire la fortuna nelle cose: quello che vi serve è nel cassetto, quello che gli serve è rotto.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Mettere gli spiriti del luogo dalla tua parte.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Scegliere quando la marea gira.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Piegare la serata dall'altra parte della città.",
        "required": false
      }
    ],
    "scopes": "Area per quanto è grande la serata: 1 la bisca, 2 l'edificio, 3 il quartiere. Durata 1 la serata, 3 il mese. Bersagli per chi vince e chi perde. Condizioni 1 per una regola: solo i tuoi, solo al tavolo grande."
  },
  {
    "id": "entropy-3-ferire-uno-spirito",
    "name": "Ferire uno spirito",
    "sphere": "entropy",
    "level": 3,
    "extras": [],
    "text": "Disfi un'effimera dall'interno: le probabilità che la tengono insieme cadono e lo spirito si sfalda. Serve una Sfera che ti porti fino a lui: il Primordio o lo Spirito.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Disfare la Quintessenza di cui è fatto: perde forma, poi sostanza.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Colpirlo nell'Umbra o attraverso la soglia.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Disfare lo spirito legato a un oggetto insieme all'oggetto: il feticcio, la statua, la reliquia etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Disfare lo spirito legato a un'energia insieme a lei: il fuoco, la corrente, la tempesta etc..",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto ferisce. Bersagli per più spiriti. Precisione (dettaglio) per colpire quello giusto in uno sciame."
  },
  {
    "id": "entropy-3-ridurre-in-polvere-un-oggetto",
    "name": "Ridurre in polvere un oggetto",
    "sphere": "entropy",
    "level": 3,
    "extras": [],
    "text": "Anni di decadimento in un istante: la ruggine vince, il legno marcisce, la corda si sfilaccia, e resta la polvere. Da sola l'Entropia sceglie solo cosa cede per primo: per far correre gli anni serve il Tempo o la Materia.",
    "pairings": [
      {
        "sphere": "time",
        "text": "Far cadere gli anni tutti insieme: l'oggetto invecchia davanti a te.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Disfare la materia per quello che è.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Ridurre in polvere un impianto: i circuiti si ossidano, i cavi si sbriciolano etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far marcire quello che era vivo: il legno, il cibo, il raccolto etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Ridurre in polvere quello che non vedi.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto è grosso: 1 la chiave, 3 l'auto, 5 la casa. Precisione (dettaglio) per la parte giusta e non l'insieme: la canna, non la pistola. Bersagli per più oggetti."
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
        "text": "Fermare una catena di impianti: il blackout resta nel palazzo.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Fermare un contagio: l'epidemia si ferma alla prima stanza.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Fermare una voce: la notizia muore prima di uscire dalla stanza.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Fermare un crollo: si ferma al primo piano.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Fermare una maledizione o un patto che passa di mano in mano.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Fermare un incantesimo che si propaga.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Fermare il primo anello prima che scatti.",
        "required": false
      }
    ],
    "scopes": "Area per quanto è ampio il perimetro in cui il guasto resta chiuso. Durata per quanto tieni chiusa la porta: 2 la scena, 4 la sessione. Precisione (dettaglio) per l'anello esatto da spezzare."
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
    "text": "Tra i futuri possibili spingi il mondo verso quello che preferisci: non una probabilità alla volta, ma una direzione. Serve il Tempo: da sola l'Entropia piega solo l'adesso.",
    "pairings": [
      {
        "sphere": "time",
        "text": "Vedere i rami del domani e scegliere quello.",
        "required": true
      },
      {
        "sphere": "mind",
        "text": "Scegliere il domani di una persona: la strada che prenderà.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Scegliere il domani di un luogo lontano.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto è lontano quel domani (fuori gioco: 1 il giorno, 3 il mese, 5 l'anno). Potenza (epicità) per quanto pesa il domani che scegli: 2 tocca la scena, 5 stravolge il capitolo. Precisione (dettaglio) per un esito preciso e non «meglio»."
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
        "text": "Riconoscere la Magick con cui è stata stretta e disfarla alla radice.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Sciogliere il patto, se la maledizione viene da uno spirito.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Togliere la maledizione anche dal corpo, dove ha messo radici.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Liberare anche la testa di chi la porta, dalla convinzione di essere maledetto.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Sciogliere il nodo di chi è lontano.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) nel braccio di ferro: contro una maledizione più forte vince la Potenza più alta. Bersagli per più persone maledette. Precisione (dettaglio) per il nodo giusto fra molti."
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
        "text": "Far arrivare la sorte per le vie del corpo: cede dove i corpi cedono, guarisce dove guariscono, e la scena resta pulita.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far entrare la sorte in testa: le decisioni gli riescono tutte, o gli falliscono tutte.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Benedire o maledire uno spirito, o passare dallo spirito che veglia su di lui.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Dare una data alla benedizione: scatta al compleanno, finisce a mezzanotte etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Riscrivere il destino di chi non vedi.",
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
        "text": "Far nascere la fortuna dalla Quintessenza, oppure pagarla.",
        "required": true
      },
      {
        "sphere": "life",
        "text": "Creare fortuna in un corpo: la guarigione che non era probabile.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Creare fortuna in una testa: l'idea che nessuno avrebbe avuto.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Creare fortuna nelle cose: il biglietto vincente, la vena d'oro, il pezzo di ricambio nel cassetto etc..",
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
    "text": "La mortalità accelera nella carne: le ferite si infettano, gli organi cedono, la pelle si apre. Serve la Vita: da sola l'Entropia tiene la rovina attorno al corpo, incidenti e contagi probabili, senza entrare nella carne.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Far marcire la carne dall'interno.",
        "required": true
      },
      {
        "sphere": "time",
        "text": "Far cadere gli anni della carne in un istante: invecchia davanti a te.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Far marcire anche l'effimera di uno spirito incarnato.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Far marcire chi non vedi.",
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
        "text": "Respingere anche l'Entropia di un altro mago.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Fermare anche i guasti e le scariche delle macchine.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Nascondere a chi entra che la fortuna ha smesso.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Rendere immune anche l'Umbra del luogo.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Accendere il perimetro a orari: solo di notte.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Mettere il perimetro lontano, o farlo seguire chi lo porta.",
        "required": false
      }
    ],
    "scopes": "Area per il perimetro: 1 la stanza, 2 l'edificio, 3 il quartiere. Durata per quanto regge. Condizioni 1 per chi entra: i tuoi tengono la fortuna, gli altri no."
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
        "text": "Far passare il legame anche nel corpo: la ferita dell'uno sanguina nell'altro.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far passare il legame nei pensieri: sanno l'uno dell'altro.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Far reggere il legame anche oltre la morte.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Dare al legame una scadenza, o un giorno preciso in cui si accende.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Legare due persone lontane che non si sono mai viste.",
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
        "text": "Far nascere il destino nuovo dalla Quintessenza.",
        "required": true
      },
      {
        "sphere": "mind",
        "text": "Far passare il destino nuovo dalle sue scelte: prenderà sempre la strada che porta lì.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far passare il destino nuovo dal corpo: vivrà quanto serve per arrivarci.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Fissare quando il destino si compie.",
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
        "text": "Far sapere a chi giura cosa lo aspetta, ogni volta che pensa di tradire.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Far valere il patto anche per spiriti e creature dell'Umbra.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far passare la punizione dal corpo: si ammala, cade, non guarisce etc..",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Legare anche la Magick: chi tradisce non lancia più.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Dare al patto un termine, o una data in cui si sveglia.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Far trovare il traditore ovunque vada.",
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
        "text": "Cambiare gli occhi per davvero: lo spettro resta aperto senza doverlo tenere su.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Leggere anche l'energia di un cervello: se dorme, se sogna, se è sveglio.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Capire di cosa è fatto quello che l'energia attraversa.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Vedere anche la Quintessenza.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Vedere l'energia dell'Umbra dove sfiora il mondo.",
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
        "text": "Avere l'ora esatta della traccia, e seguirla indietro più a lungo.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Riconoscere il corpo dal calore: alto o basso, sano o febbricitante, uomo o cane etc..",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Capire dal calore cosa c'era appoggiato: una tazza, un'arma, un portatile etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Leggere il calore rimasto in una stanza che non vedi.",
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
        "text": "Sentire anche cosa passa nel segnale: la telefonata, il file, il messaggio etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Seguire la rete oltre il palazzo, fino alla centrale.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Sentire il cavo per quello che è: rame, fibra, dove è consumato etc..",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Sentire dove la rete sta per cedere.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Sentire quando è passata l'ultima corrente, e quando tornerà.",
        "required": false
      }
    ],
    "scopes": "Area per la rete intera: 1 la stanza, 2 il palazzo, 3 il quartiere. Durata 2 per la scena. Precisione (dettaglio) per un filo solo."
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
        "text": "Vedere corpi al posto delle sagome: quanti, quali, come stanno.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Vedere anche gli oggetti freddi: il mobile, la cassaforte, l'arma nel cassetto etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Guardare attraverso più muri, fino in fondo al palazzo.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Sapere anche cosa stanno facendo: dormono, aspettano, ti aspettano etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Vedere chi sta oltre il muro ma non nel mondo.",
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
        "text": "Far sentire il suono solo a chi scegli tu.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Portare il suono dove non arriverebbe: la tua voce nella stanza in fondo al corridoio.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Spegnere o alzare la voce di qualcuno alla fonte, nella gola.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Far passare il suono attraverso il muro, o farlo bloccare del tutto dal muro.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far nascere il suono dal nulla: una voce, un motore, un colpo di pistola etc..",
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
        "text": "Far seguire la piega al corpo in movimento: sparisci mentre corri.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Cucire la piega a un oggetto: l'auto, la porta, la cassa etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Nascondere anche il vuoto che lasci a chi guarda.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far guardare altrove chi potrebbe vederti comunque.",
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
        "text": "Vederlo partire in anticipo: la deviazione è pronta prima dello sparo.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far finire il colpo da solo nel muro giusto.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Deviare il colpo sparato a qualcuno lontano da te.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Deformare la pallottola in volo, oltre a deviarla.",
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
        "text": "Evocare dal nulla l'energia che dirigi.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Dirigere l'energia insieme alla sua materia: l'acqua, la sabbia, il fumo etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far entrare la corrente in un corpo e muoverlo: i muscoli rispondono a te.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Dirigere l'energia in una stanza che non vedi.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far trovare all'energia il punto debole da sola: il cavo scoperto, la tenda, il serbatoio etc..",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Rallentare o accelerare la fiamma.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto brucia o scarica. Area per quanta energia governi: 1 il camino, 2 l'incendio del piano. Durata 1 per lo scontro, 2 per la scena. Precisione (dettaglio) per guidarla in un punto solo."
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
        "text": "Cambiare anche la superficie: il pavimento è davvero ghiaccio, o davvero colla.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Togliere la presa alla pelle di qualcuno: gli scivola tutto dalle mani, o gli resta attaccato.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far scivolare solo chi deve scivolare.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Rendere ghiaccio il corridoio due piani sotto.",
        "required": false
      }
    ],
    "scopes": "Area per la superficie: 1 la stanza, 2 il palazzo. Durata 1 per un turno, 2 per la scena. Condizioni (malus 2, ostacolare) per chi ci cade. Bersagli per far scivolare solo loro."
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
    "text": "Fai nascere luce e suono dal nulla: un'immagine vera, visibile a chiunque, telecamere incluse; una voce vera, registrabile. Serve il Primordio: senza, puoi solo piegare luce e suono che ci sono già.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Far nascere la luce e il suono dal nulla.",
        "required": true
      },
      {
        "sphere": "mind",
        "text": "Far vivere l'immagine solo negli occhi che scegli: nessuno strumento la registra.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Appoggiare l'immagine a un oggetto vero: l'ologramma sul tavolo, la voce dalla radio etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Far apparire la proiezione in un luogo che non vedi.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Proiettare te stesso: la tua voce, la tua faccia, dove non sei.",
        "required": false
      }
    ],
    "scopes": "Area per quanto è grande: 1 la stanza. Durata 1 per un attimo, 2 per la scena. Precisione (dettaglio) per i particolari: 1 una sagoma, 3 un volto che si riconosce. Condizioni (malus 1, distrarre) se serve a ingannare."
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
        "text": "Rubare il calore a un corpo: assideramento, dita blu, il cuore che rallenta etc..",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Far entrare il freddo nella materia: il metallo si spacca, l'acqua diventa ghiaccio solido.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far sparire davvero il calore che rubi, senza mandarlo da nessuna parte.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Rubare il calore a una stanza che non vedi.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far colpire il freddo alla cosa più fragile: la tubatura, il serbatoio, il vetro etc..",
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
        "text": "Accendere dal nulla: la fiamma senza innesco, la scarica senza rete.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Ravvivare un motore rotto, o spegnere un incendio togliendogli ciò che brucia.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far spegnere o ripartire la fiamma proprio nel momento giusto per te.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Spegnere le luci del piano di sotto.",
        "required": false
      }
    ],
    "scopes": "Area per quante fiamme o luci: 1 la stanza, 2 il palazzo. Potenza (danni) se la fiamma divampa addosso a qualcuno. Bersagli per più fuochi scelti. Condizioni 1 per farlo scattare dopo: quando entra."
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
        "text": "Far entrare lo scudo nella carne: la pelle non brucia, le ossa non si rompono.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Vestire un oggetto con lo scudo: l'auto, la porta, il muro etc..",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Fermare anche la Magick.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Fermare i colpi dall'Umbra.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sbagliare anche il colpo dopo a chi colpisce lo scudo.",
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
        "text": "Far aggrappare i piedi da soli, anche se corri o combatti.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Far venire incontro la superficie: l'acqua si fa solida sotto il piede, il muro fa gradini.",
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
        "text": "Convertire la Quintessenza in energia, e viceversa.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Convertire materia in energia ed energia in materia: il ghiaccio in vapore, il fumo in fiamma etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Convertire l'energia lontano da te.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far finire la conversione nel posto peggiore per loro.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per l'energia che ne esce. Area per quanta energia converti: 1 la stanza. Durata 1 per il colpo, 2 per tenere aperta la conversione."
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
    "text": "Fai nascere il fulmine senza rete e la fiamma senza innesco: energia nuova, che non hai preso a nessuno. Serve il Primordio. Terra e acqua sono materia, e chiedono anche la Materia.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Far nascere l'energia dal nulla.",
        "required": true
      },
      {
        "sphere": "matter",
        "text": "Evocare anche terra, acqua, aria, ghiaccio etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Far nascere l'energia dove non sei.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far nascere l'energia dentro un corpo: la scarica nel cuore.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Farla nascere già puntata sul punto debole.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto colpisce. Area per quanta ne evochi: 1 la stanza in fiamme. Durata 1 per una scarica, 2 per tenerla accesa. Precisione (dettaglio) per l'energia esatta: la frequenza, la temperatura."
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
        "text": "Fermare senza strappi: l'auto si ferma intera, senza deformarsi.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Fermare un corpo senza fargli male: chi cade atterra piano.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Fermare ciò che corre lontano da te.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Fermare solo quello che deve fermarsi: l'auto sì, il bambino che attraversa no.",
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
        "text": "Far volare il corpo per quello che è: niente vertigini, niente freddo, il fiato regge in quota.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Volare con l'auto, con il carico, con la barca etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far trovare una spiegazione da solo a chi ti vede volare.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far girare il vento sempre a tuo favore.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Volare anche nell'Umbra.",
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
    "text": "Il suono si fa pugno: tutto attorno al punto d'impatto vola, i vetri esplodono, la gente cade. Un colpo solo, su un'area.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Spaccare anche il muro portante, non solo i vetri.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Colpire i corpi e risparmiare le cose, o l'inverso.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Far partire l'onda da un punto lontano da te.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far cadere chi deve cadere, e lasciare in piedi gli altri.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far nascere l'onda dal nulla, senza un rumore da cui partire.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto colpisce. Area per il raggio: 1 la stanza, 2 il palazzo. Bersagli per chi risparmiare. Condizioni (malus 4, stordire) per chi ci finisce dentro."
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
        "text": "Fondere i circuiti per davvero; oppure lasciarli intatti, solo spenti, e riaccenderli.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Far partire l'impulso in un luogo che non vedi.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Friggere solo quello che deve friggere: i loro telefoni sì, il tuo no.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Risparmiare quello che tiene in vita: il pacemaker, il respiratore.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far scattare l'impulso dopo, quando decidi.",
        "required": false
      }
    ],
    "scopes": "Area per il raggio: 1 la stanza, 2 il palazzo, 3 il quartiere. Bersagli per scegliere cosa risparmiare. Condizioni 1 per farlo scattare da solo: quando aprono la porta."
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
        "text": "Plasmare anche quello che sollevi: la sbarra si piega mentre vola.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Muovere un corpo come un corpo, non come un burattino rigido.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Muovere quello che non vedi.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far colpire quello che scagli sempre nel punto giusto.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Muovere senza gesti: nessuno capisce da dove viene.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Muovere la cosa più lenta o più veloce di come dovrebbe.",
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
    "text": "Crei una fonte stabile e autonoma: luce, calore, corrente che nessuna rete alimenta e che non si spegne finché non lo decidi. Serve il Primordio.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Far nascere la fonte dal nulla e tenerla accesa da sola.",
        "required": true
      },
      {
        "sphere": "matter",
        "text": "Dare un corpo alla fonte: la lampada, la pietra, il cuore del reattore etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Alimentare anche chi è lontano.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Far brillare la fonte anche nell'Umbra.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far vedere la fonte solo ai tuoi.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto resta acceso (fuori gioco: 3 il mese, 7 per sempre). Area per quanto illumina e scalda: 1 la stanza, 2 il palazzo."
  },
  {
    "id": "forces-4-concentrare-ogni-energia",
    "name": "Concentrare ogni energia",
    "sphere": "forces",
    "level": 4,
    "extras": [],
    "text": "Tutta l'energia in scena, in un punto solo: la luce, il calore, la corrente, il moto di tutto quello che c'è convergono dove dici tu. Nel punto d'arrivo regge poco.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Trasformare l'oggetto nel punto d'arrivo con l'energia: la lama che fonde e si ricompone.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Mettere il punto d'arrivo lontano.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Lasciare in piedi esattamente quello che vuoi tu.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Concentrare anche la Quintessenza del luogo.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Mettere il punto d'arrivo in un corpo: la carne prende l'energia come colpo o come nutrimento.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto colpisce. Area per quanta energia raccogli: 2 il palazzo, 3 il quartiere. Precisione (dettaglio) per il punto esatto."
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
        "text": "Far nascere il meteo dal nulla: la tempesta a ciel sereno.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Governare anche l'acqua e la neve come materia: la grandine, il ghiaccio sulla strada.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far colpire il meteo solo i loro campi.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Cambiare il meteo anche nell'Umbra, e farsi obbedire dagli spiriti del cielo.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Mettere il perimetro lontano.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far arrivare il meteo a orari: la nebbia ogni notte alle tre.",
        "required": false
      }
    ],
    "scopes": "Area per il perimetro: 3 il quartiere, 4 la città, 5 la regione. Durata (fuori gioco: 1 il giorno, 2 la settimana). Potenza (danni) se la tempesta ferisce. Condizioni 1 per legarlo a un evento."
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
    "text": "Costruisci una scena finta che tutti vedono, sentono e toccano: la stanza vuota sembra un ricevimento, il vicolo sembra un muro. Le Forze fanno la luce e il suono veri; servono la Mente, che convince, e il Primordio, che dà la sostanza.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Convincere chi guarda che la scena è vera.",
        "required": true
      },
      {
        "sphere": "prime",
        "text": "Dare sostanza alla scena.",
        "required": true
      },
      {
        "sphere": "matter",
        "text": "Dare alla scena un tocco vero: il tavolo regge il bicchiere.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Mettere nella scena corpi caldi che respirano.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Far apparire la scena dove non sei.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Mostrare com'era ieri.",
        "required": false
      }
    ],
    "scopes": "Area per quanto è grande: 1 la stanza, 2 il palazzo. Durata 2 per la scena, 4 per la sessione. Precisione (dettaglio) per i particolari: 3 le facce, 5 il testo sui documenti. Bersagli per chi invece deve vedere la verità."
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
        "text": "Scatenarla a ciel sereno.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Far portare alla tempesta grandine, sabbia, detriti etc..",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far cadere i fulmini dove servono a te.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Non far sentire la tempesta addosso ai tuoi.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Far cadere la tempesta lontano.",
        "required": false
      }
    ],
    "scopes": "Area per l'estensione: 2 il palazzo, 3 il quartiere, 4 la città. Potenza (danni) per quanto colpisce. Durata 2 per la scena. Bersagli per chi risparmiare."
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
        "text": "Raffreddare e rallentare anche i corpi.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Irrigidire anche la materia: l'acqua è ghiaccio, il metallo è fragile.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Togliere anche la Quintessenza: niente Magick nel perimetro.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Spegnere anche l'Umbra del luogo.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Mettere il perimetro lontano.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Lasciare acceso dentro solo quello che vuoi tu.",
        "required": false
      }
    ],
    "scopes": "Area per il perimetro: 2 il palazzo, 3 il quartiere. Durata 2 per la scena, 4 per la sessione. Condizioni 1 per chi è esente: i tuoi. Potenza (danni) se il gelo e il buio feriscono."
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
        "text": "Far nascere l'energia nuova dal nulla, e farla restare anche senza di te.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Dare all'energia nuova una materia che la porta: il cristallo che emette fuoco freddo.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far vivere l'energia nuova in un corpo: il mago che brilla, il sangue che scalda le stanze.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far rispondere l'energia nuova al pensiero.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Far valere l'energia nuova anche nell'Umbra.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Dare all'energia nuova un orologio suo.",
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
    "text": "Guardi una cosa e la cosa ti dice cos'è: composizione, doppi fondi, saldature, il punto dove cederà. Sai se la parete è portante, se la cassaforte ha un secondo scomparto, se la lega è quella che dicono.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "Sapere anche quando cederà, e quanto poco basta.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Sapere cosa ci passa dentro: corrente, calore, segnale etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Fare la stessa lettura sulla carne morta, e sul confine col vivo: il proiettile nella gamba.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Sapere se l'oggetto porta Magick: la Meraviglia, il talismano, l'oggetto incantato etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Sapere se dentro c'è qualcosa che vuole.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Sapere quanti anni ha davvero, e da quando è così.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Analizzare l'oggetto che non hai in mano.",
        "required": false
      }
    ],
    "scopes": "Precisione (dettaglio) per andare a fondo: 1 l'auto, 3 la vite, 5 la lega. Precisione (informazione) per quanto pesa saperlo. Bersagli per più oggetti in un colpo."
  },
  {
    "id": "matter-1-sapere-cosa-c-era-prima",
    "name": "Sapere cosa c'era prima",
    "sphere": "matter",
    "level": 1,
    "extras": [],
    "text": "Il residuo parla: cosa conteneva la bottiglia, chi ha impugnato la pistola, cosa è passato su quel tavolo, e quanto tempo fa.",
    "pairings": [
      {
        "sphere": "time",
        "text": "Avere una data al posto del «quanto tempo fa», e seguire la traccia più indietro.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Risalire dal residuo al corpo: il sangue di chi, il capello di chi etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Sapere in che stato era chi l'ha usata: fretta, rabbia, calma etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Sapere dal residuo dov'è finita la cosa che manca.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Sapere cosa è andato storto, lì sopra.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Sapere cosa ci si è posato che non era di questo mondo.",
        "required": false
      }
    ],
    "scopes": "Precisione (informazione) per quanto pesa nella trama quel che cerchi. Precisione (dettaglio) per una traccia sola fra tante. Durata 2 per leggere tutta la scena."
  },
  {
    "id": "matter-1-riconoscere-il-commestibile",
    "name": "Riconoscere il commestibile",
    "sphere": "matter",
    "level": 1,
    "extras": [],
    "text": "Un'occhiata dice se il piatto nutre, marcisce o avvelena, se l'acqua è potabile, se la pillola è quella giusta. Da sola la Materia legge la sostanza; con la Vita sai cosa farà a un corpo.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Sapere cosa farà a chi lo mangia: nutre, avvelena, cura, e a chi in particolare.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Sapere quanto manca perché vada a male.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Sapere da quanto è lì.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Sapere se è stato toccato dalla Magick.",
        "required": false
      }
    ],
    "scopes": "Bersagli per un banchetto intero. Precisione (dettaglio) per la sostanza esatta: 1 c'è veleno, 3 quale veleno, 5 quanto."
  },
  {
    "id": "matter-2-aprire-appigli-nella-parete",
    "name": "Aprire appigli nella parete",
    "sphere": "matter",
    "level": 2,
    "extras": [],
    "text": "La facciata liscia germoglia maniglie su misura per le tue mani; il muro fa gradini, la lastra di vetro tiene.",
    "pairings": [
      {
        "sphere": "forces",
        "text": "Far tenere gli appigli anche sotto il peso che non dovrebbero: attrito e gravità dalla tua parte.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Cambiare anche le tue mani: si aggrappano da sole.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Far nascere gli appigli sulla parete che non vedi ancora.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Nascondere gli appigli a chi viene dopo di te.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far reggere gli appigli finché ti servono, e farli cedere sotto chi ti segue.",
        "required": false
      }
    ],
    "scopes": "Area per quanta parete: 1 il muro, 2 la facciata. Durata 1 per la salita, 2 per la scena. Bersagli per chi sale con te."
  },
  {
    "id": "matter-2-ferire-un-vampiro",
    "name": "Ferire un vampiro",
    "sphere": "matter",
    "level": 2,
    "extras": [],
    "text": "La carne morta è materia: la tocchi come tocchi il legno, e la spacchi come spacchi il legno. Da sola la Materia lavora sul cadavere che cammina; con la Vita passi per le vie del corpo.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Aprire la ferita come a un vivo, per le vie del corpo.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Far bruciare la ferita: il fuoco entra dove la materia si è aperta.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Colpire dove il corpo morto è più stanco.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Ferire anche quello che lo abita.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Ferire il vampiro che non vedi.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto ferisce. Precisione (dettaglio) per il punto esatto: il cuore. Bersagli per più cadaveri."
  },
  {
    "id": "matter-2-invecchiare-un-oggetto",
    "name": "Invecchiare un oggetto",
    "sphere": "matter",
    "level": 2,
    "extras": [
      {
        "sphere": "time",
        "level": 1,
        "required": true
      }
    ],
    "text": "Ruggine e polvere di decenni in un minuto: la serratura si blocca, il legno marcisce, la corda si sfilaccia. Serve il Tempo: da sola la Materia consuma la sostanza, ma gli anni non corrono.",
    "pairings": [
      {
        "sphere": "time",
        "text": "Far correre gli anni: l'oggetto invecchia davanti a te.",
        "required": true
      },
      {
        "sphere": "entropy",
        "text": "Far invecchiare per primo il pezzo che regge tutto.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Invecchiare anche quello che era vivo: il legno verde, il cuoio, il cibo etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Invecchiare quello che non vedi.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto è grosso: 1 la serratura, 3 l'auto, 5 la casa. Precisione (dettaglio) per il pezzo solo: la canna, non la pistola. Bersagli per più oggetti."
  },
  {
    "id": "matter-2-modellare-un-passe-partout",
    "name": "Modellare un passe-partout",
    "sphere": "matter",
    "level": 2,
    "extras": [],
    "text": "La chiave sbagliata cola e si riassesta nei denti giusti; la tessera prende il codice della porta, il chiavistello scorre. Serve una chiave da modellare, e una serratura da leggere.",
    "pairings": [
      {
        "sphere": "forces",
        "text": "Aprire anche le serrature elettroniche: il segnale giusto, la corrente giusta.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Sapere che chiave serve senza averla mai vista.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Modellare la chiave per la porta che non hai davanti.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far girare la chiave al primo colpo, anche se la serratura è vecchia.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far tornare la chiave com'era dopo che sei passato.",
        "required": false
      }
    ],
    "scopes": "Precisione (dettaglio) per la serratura difficile: 1 la porta di casa, 3 la cassaforte. Bersagli per più porte con la stessa chiave. Durata per quanto resta chiave: 1 per passare, 7 per sempre."
  },
  {
    "id": "matter-2-riforgiare-le-munizioni",
    "name": "Riforgiare le munizioni",
    "sphere": "matter",
    "level": 2,
    "extras": [],
    "text": "I proiettili in canna cambiano lega: argento, gomma, sale, legno etc.. Il caricatore resta pieno, e ogni colpo è quello che serve.",
    "pairings": [
      {
        "sphere": "forces",
        "text": "Caricare i proiettili di energia: bruciano, folgorano etc..",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Caricare i proiettili di Quintessenza: mordono la Magick.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Far ferire i proiettili anche nell'Umbra.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Caricare i proiettili di un veleno, un sedativo, un farmaco etc..",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sì che i proiettili non si inceppino mai.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Riforgiare le munizioni nell'arma del compagno lontano.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più armi. Durata per quanto restano così (7 per sempre). Precisione (dettaglio) per la lega esatta."
  },
  {
    "id": "matter-2-rimettere-a-posto",
    "name": "Rimettere a posto",
    "sphere": "matter",
    "level": 2,
    "extras": [],
    "text": "La crepa si chiude, l'ingranaggio torna in tolleranza, lo strappo si richiude, l'auto riparte: ripari senza attrezzi quello che è rotto. Serve la cosa intera, anche in pezzi: il pezzo che manca non lo inventi.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Riparare anche quello che manca: il pezzo nasce dal nulla.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Riportare la cosa a com'era ieri, prima del danno.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Riparare anche l'elettronica: i circuiti tornano a funzionare.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Riparare quel che sta nel corpo: la protesi, la placca, il pacemaker etc..",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far tenere la riparazione: non si rompe più lì.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Riparare quello che non hai in mano.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto è grosso: 1 l'orologio, 3 l'auto, 5 la casa. Precisione (dettaglio) per il pezzo esatto. Bersagli per più cose."
  },
  {
    "id": "matter-2-trasformare-l-aria-in-sonnifero",
    "name": "Trasformare l'aria in sonnifero",
    "sphere": "matter",
    "level": 2,
    "extras": [],
    "text": "L'aria della stanza si fa dolciastra e la sala si addormenta: cambi la sostanza di quello che respirano. Da sola la Materia fa il gas; cosa fa esattamente a un corpo lo dice la Vita.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Decidere cosa fa il gas ai corpi: dormono, tossiscono, si calmano etc.., e risparmiare chi vuoi.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far dimenticare tutto a chi si sveglia.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Muovere il gas dove dici tu: verso la porta, lontano da te.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Riempire di gas la stanza in cui non sei.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far agire il gas dopo: quando si siedono.",
        "required": false
      }
    ],
    "scopes": "Area per la stanza o il palazzo. Bersagli per chi respira aria buona. Condizioni (malus 3, addormentare) per quanto pesa. Durata 1 per un attimo di gas, 2 per la scena."
  },
  {
    "id": "matter-2-trasmutare-una-sostanza",
    "name": "Trasmutare una sostanza",
    "sphere": "matter",
    "level": 2,
    "extras": [],
    "text": "Piombo in oro, acqua in vino, cemento in sabbia: la sostanza cambia, forma, volume e stato restano. I preziosi costano di più.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Trasmutare in qualcosa che il mondo non aveva, o partire dal nulla.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Far passare la trasmutazione per il calore o la corrente: il mondo vede una fornace.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Trasmutare anche l'organico: il pane in carne, il legno in osso.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far reggere la trasmutazione, o farla disfare quando decidi tu.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far arrivare la trasmutazione col tempo: il muro che diventa sabbia in un mese.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Trasmutare quello che non vedi.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanta sostanza: 1 lo zaino, 3 l'auto, 5 la casa. Precisione (dettaglio) per la sostanza esatta: 1 un metallo, 3 oro, 5 oro a ventiquattro carati. Durata per quanto resta (7 per sempre)."
  },
  {
    "id": "matter-3-alzare-un-muro-dal-terreno",
    "name": "Alzare un muro dal terreno",
    "sphere": "matter",
    "level": 3,
    "extras": [],
    "text": "L'asfalto si solleva e ti fa da barricata, il pavimento fa una parete, la roccia si alza dal fianco della collina. Materia che c'è, spostata in fretta. Quello che alzi resta finché qualcuno non lo disfa.",
    "pairings": [
      {
        "sphere": "forces",
        "text": "Alzare il muro in mezzo alla corsa e fargli reggere l'urto dell'auto.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Alzare il muro dove non c'era terreno.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Alzare il muro esattamente dove li ferma.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Alzare il muro nel corridoio in cui non sei.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Alzare un muro vivo: radici, rami, edera etc..",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto muro: 3 due tonnellate, 5 una casa. Area per quanto è lungo: 1 la stanza, 2 il palazzo."
  },
  {
    "id": "matter-3-animare-ossa-nude",
    "name": "Animare ossa nude",
    "sphere": "matter",
    "level": 3,
    "extras": [
      {
        "sphere": "prime",
        "level": 1,
        "required": true
      }
    ],
    "text": "Lo scheletro si alza e cammina: una struttura senz'anima che esegue e basta. Serve il Primordio; un cadavere intero chiede anche la Vita.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Dare alle ossa il moto che la materia non ha.",
        "required": true
      },
      {
        "sphere": "life",
        "text": "Alzare il cadavere intero, carne compresa.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Mettere dentro qualcosa che vuole: la struttura ha opinioni.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far capire al congegno d'ossa ordini complessi.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Far muovere le ossa in fretta e colpire forte.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Alzare le ossa nel cimitero in cui non sei.",
        "required": false
      }
    ],
    "scopes": "Bersagli per quanti scheletri. Durata per quanto camminano: 2 la scena, 4 la sessione. Condizioni 1 per l'ordine che eseguono: proteggi la porta. Potenza (danni) se colpiscono."
  },
  {
    "id": "matter-3-appesantire-o-alleggerire",
    "name": "Appesantire o alleggerire",
    "sphere": "matter",
    "level": 3,
    "extras": [],
    "text": "La refurtiva pesa piume, la porta del nemico pesa tonnellate, la corda regge un'auto: cambi la densità di quello che tocchi, e la forma resta.",
    "pairings": [
      {
        "sphere": "forces",
        "text": "Far volare quello che pesa poco, far sfondare quello che pesa tanto.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Appesantire o alleggerire un corpo: chi ti insegue non alza più i piedi.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Alleggerire il carico che non è qui.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far pesare la cosa il giusto proprio nel momento in cui conta.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far tornare la cosa al suo peso quando dici tu.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto vale la cosa che cambi: 1 lo zaino, 3 l'auto, 5 la casa. Bersagli per più cose. Durata se vuoi che finisca da sola (2 la scena); altrimenti resta finché non la disfi."
  },
  {
    "id": "matter-3-evocare-un-oggetto-dal-nulla",
    "name": "Evocare un oggetto dal nulla",
    "sphere": "matter",
    "level": 3,
    "extras": [
      {
        "sphere": "prime",
        "level": 1,
        "required": true
      }
    ],
    "text": "Il coltello che prima non c'era, la corda, la chiave: tu dai la forma, il Primordio la sostanza. Cose semplici; i congegni complessi sono il quarto pallino.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Dare sostanza a quello che non c'era.",
        "required": true
      },
      {
        "sphere": "forces",
        "text": "Far nascere l'oggetto già carico: la torcia accesa, la batteria piena.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far nascere qualcosa di organico: il pane, il siero, la benda già medicata etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far nascere l'oggetto che chi guarda si aspetta di vedere.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Far nascere l'oggetto in mano al compagno lontano.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far nascere l'oggetto quando serve, non adesso.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto pesa: 1 lo zaino, 2 cento chili. Precisione (dettaglio) per quanto è fine: 1 un coltello, 3 una chiave precisa, 5 un meccanismo. Durata per quanto resta al mondo (7 per sempre)."
  },
  {
    "id": "matter-3-guastare-senza-rompere",
    "name": "Guastare senza rompere",
    "sphere": "matter",
    "level": 3,
    "extras": [],
    "text": "L'oggetto sembra intatto e smette di funzionare: il motore non parte, la pistola non spara, la serratura non gira, e chi lo apre non trova niente.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "Far arrivare il guasto nel momento giusto per te.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Guastare l'elettronica senza bruciarla: circuiti perfetti che non conducono.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far durare il guasto quanto decidi, poi tutto riparte.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Guastare la macchina che non vedi.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far sì che chi lo ripara non capisca mai cosa cercare.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto è grosso: 1 la pistola, 3 l'auto, 5 la centrale. Condizioni 1 per farlo scattare da solo: quando la impugna lui. Bersagli per più cose. Precisione (dettaglio) per il pezzo solo."
  },
  {
    "id": "matter-3-rimodellare-o-disintegrare",
    "name": "Rimodellare o disintegrare",
    "sphere": "matter",
    "level": 3,
    "extras": [],
    "text": "La serranda cola, la sbarra si piega, il muro si apre in una porta: plasmi la forma, la densità e lo stato di quello che tocchi. Per disintegrare, ridurre una cosa a niente, servono l'Entropia e il Tempo insieme.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "Disfare la cosa fino alla polvere, insieme al Tempo.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Disintegrare, insieme all'Entropia; da solo, far tornare la cosa com'era quando decidi.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Rimodellare col calore: il mondo vede una fucina.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Rimodellare anche la carne morta e l'osso.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Rimodellare quello che non vedi.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Rimodellare aggiungendo materia che non c'era.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto rimodelli: 1 la serratura, 3 l'auto, 5 la casa. Precisione (dettaglio) per un lavoro fine: 3 la vite, 5 il meccanismo. Area per una parete intera."
  },
  {
    "id": "matter-3-rinforzare-gli-abiti",
    "name": "Rinforzare gli abiti",
    "sphere": "matter",
    "level": 3,
    "extras": [],
    "text": "La giacca pesa uguale e ferma i coltelli come maglia d'acciaio, la camicia regge la pallottola, gli stivali non temono il fuoco. Cambi la sostanza del tessuto senza cambiarne l'aspetto.",
    "pairings": [
      {
        "sphere": "forces",
        "text": "Far fermare agli abiti anche il fuoco e la corrente.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far fermare agli abiti la Magick.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Far fermare agli abiti i colpi dall'Umbra.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Rinforzare anche la pelle sotto: gli abiti e il corpo insieme.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Nascondere che l'abito è cambiato: sembra stoffa.",
        "required": false
      }
    ],
    "scopes": "Bersagli per la Cabala. Potenza (danni) per quanto tolgono ai colpi. Durata solo se vuoi che finisca; altrimenti restano così finché non li disfi."
  },
  {
    "id": "matter-4-costruire-macchinari-complessi",
    "name": "Costruire macchinari complessi",
    "sphere": "matter",
    "level": 4,
    "extras": [],
    "text": "Dal rottame al motore funzionante, dalla lamiera al drone, dai pezzi sparsi alla radio: costruisci il complesso, e regge, con la tua firma dentro. Serve la materia da cui partire; dal nulla è il Primordio.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Far nascere la macchina dal nulla.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Far nascere la macchina già alimentata: funziona senza rete.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far pensare la macchina: esegue ordini, riconosce i tuoi.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Mettere dentro la macchina qualcosa che vuole.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sì che la macchina non si guasti mai.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far fare alla macchina in un'ora quello che farebbe in un giorno.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto è grossa: 1 la radio, 3 l'auto, 4 il tir. Precisione (dettaglio) per quanto è fine: 3 un motore, 5 un microchip. Durata per quanto resta al mondo (7 per sempre)."
  },
  {
    "id": "matter-4-innestare-la-macchina-nella-carne",
    "name": "Innestare la macchina nella carne",
    "sphere": "matter",
    "level": 4,
    "extras": [
      {
        "sphere": "life",
        "level": 1,
        "required": true
      },
      {
        "sphere": "prime",
        "level": 1,
        "required": true
      }
    ],
    "text": "Il metallo entra nel corpo e il corpo lo accetta come suo: la lama nell'avambraccio, l'occhio di vetro che vede, la placca che non rigetta. La Materia dà l'innesto; servono la Vita e il Primordio.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Far accettare l'innesto al corpo.",
        "required": true
      },
      {
        "sphere": "prime",
        "text": "Far vivere l'innesto.",
        "required": true
      },
      {
        "sphere": "forces",
        "text": "Far alimentare l'innesto dal corpo, e fargli portare corrente.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far rispondere l'innesto al pensiero.",
        "required": false
      }
    ],
    "scopes": "Durata 7: l'innesto resta. Potenza (epicità) per quanto pesa: 2 una placca, 5 un braccio nuovo. Precisione (dettaglio) per quanto è fine l'innesto."
  },
  {
    "id": "matter-4-rifare-un-edificio",
    "name": "Rifare un edificio",
    "sphere": "matter",
    "level": 4,
    "extras": [],
    "text": "La struttura si riassesta: pareti spostate, piani aggiunti, la casa che cambia pianta mentre ci sei dentro. La materia è la stessa; la disponi tu.",
    "pairings": [
      {
        "sphere": "forces",
        "text": "Spostare gli impianti con le pareti: luce, acqua, gas seguono.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Collegare le stanze dove non dovrebbero: la porta che dà tre piani più su.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far credere a chi ci abita che sia sempre stato così.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Aggiungere materia che non c'era: il piano in più non lo rubi a niente.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far reggere la casa nuova, o farla cedere quando dici tu.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Dare un'anima alla casa nuova, o tenerla fuori.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto è grosso: 5 una casa, 6 un grattacielo. Area per quanto rifai: 1 la stanza, 2 l'edificio. Precisione (dettaglio) per i particolari: 1 le pareti, 3 gli infissi, 5 i fregi."
  },
  {
    "id": "matter-4-sigillare-per-sempre",
    "name": "Sigillare per sempre",
    "sphere": "matter",
    "level": 4,
    "extras": [],
    "text": "La porta smette di essere una porta: muro pieno, senza giunzione, senza cardini. La cassaforte diventa un blocco. Quello che chiudi non ha più un'apertura da forzare.",
    "pairings": [
      {
        "sphere": "correspondence",
        "text": "Sigillare anche lo spazio: nessun varco, nessun salto lo attraversa.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Sigillare anche nell'Umbra.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Respingere la Magick di chi vuole riaprire.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far dimenticare a tutti che lì c'era una porta.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far trovare a chi forza sempre la parte più dura.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far aprire il sigillo da solo a una data.",
        "required": false
      }
    ],
    "scopes": "Durata 7. Potenza (epicità) nel braccio di ferro con chi vuole aprire. Area per quanto sigilli: 1 la stanza, 2 l'edificio. Condizioni 1 se si apre per qualcuno: solo per te."
  },
  {
    "id": "matter-5-creare-una-lega-impossibile",
    "name": "Creare una lega impossibile",
    "sphere": "matter",
    "level": 5,
    "extras": [],
    "text": "Leggera come stoffa e dura come nient'altro, trasparente e opaca a comando, che non fonde e non arrugginisce: inventi un materiale che la chimica rifiuta.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Far nascere la lega dal nulla, e farla restare senza di te.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Far condurre, isolare, brillare la lega come decidi tu.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far vivere la lega: cresce, si ripara, si innesta.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far rispondere la lega al pensiero.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Far esistere la lega anche nell'Umbra.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Decidere se e come la lega invecchia.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) per quanto pesa l'invenzione: 5 stravolge il capitolo, 7 impatta sull'intera ambientazione. Potenza (peso) per quanta ne fai. Durata per quanto resta al mondo (7 per sempre)."
  },
  {
    "id": "matter-5-rendere-permanente-il-mutamento",
    "name": "Rendere permanente il mutamento",
    "sphere": "matter",
    "level": 5,
    "extras": [],
    "text": "Quello che hai trasformato smette di poter tornare indietro: nessuna Magick lo disfa, nessun tempo lo consuma. L'oro resta oro, il muro resta muro, il sigillo resta sigillo, per tutti.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Far entrare il mutamento nell'Arazzo: nemmeno il Paradosso lo disfa.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far valere il mutamento anche nel passato: è sempre stato così.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sì che il mutamento non decada mai.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Far valere il mutamento anche nell'Umbra.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Far valere il mutamento ovunque quella cosa vada.",
        "required": false
      }
    ],
    "scopes": "Durata 7, e basta. Potenza (epicità) per quanto pesa: 6 impatta sulla storia, 7 sull'intera ambientazione. Bersagli per più cose rese permanenti."
  },
  {
    "id": "mind-1-leggere-aure-ed-emozioni",
    "name": "Leggere aure ed emozioni",
    "sphere": "mind",
    "level": 1,
    "extras": [],
    "text": "Vedi cosa prova davvero chi hai davanti: la paura sotto il sorriso, la rabbia sotto la calma, la bugia sotto la sicurezza. La superficie subito; la profondità la danno i successi.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Leggere anche il corpo che va con l'emozione: il battito, il sudore, il tremore etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Leggere le emozioni di chi pensa senza cervello: spiriti, fantasmi etc..",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Sapere quale emozione lo farà cedere.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Leggere le emozioni di chi non vedi.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Leggere le emozioni che aveva ieri, in questa stanza.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Riconoscere le emozioni messe lì dalla Magick di un altro.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più persone insieme. Durata 2 per tenere la lettura tutta la scena. Precisione (dettaglio) per un'emozione sola e precisa: 1 ha paura, 3 di cosa."
  },
  {
    "id": "mind-1-leggere-pensieri-e-ricordi",
    "name": "Leggere pensieri e ricordi",
    "sphere": "mind",
    "level": 1,
    "extras": [],
    "text": "Entri in una testa e leggi: quello che pensa adesso in superficie, e con più successi quello che ricorda, fino al sepolto. Le menti resistono con la Volontà.",
    "pairings": [
      {
        "sphere": "spirit",
        "text": "Leggere chi pensa senza cervello.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Leggere la mente di chi non vedi.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Leggere il ricordo com'era quando è nato, prima che lo riscrivesse.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Trovare il ricordo che non torna, la bugia che si racconta.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Leggere il pensiero degli animali.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Riconoscere i ricordi piantati dalla Magick.",
        "required": false
      }
    ],
    "scopes": "Precisione (dettaglio) per il pensiero esatto e non il rumore: 1 a cosa pensa, 3 il numero, 5 il ricordo sepolto. Precisione (informazione) per quanto pesa quel che cerchi. Bersagli per più teste. Durata 2 per restare in ascolto tutta la scena."
  },
  {
    "id": "mind-1-sentire-la-stanza",
    "name": "Sentire la stanza",
    "sphere": "mind",
    "level": 1,
    "extras": [],
    "text": "Senti l'umore di una folla o di un luogo: la paura che sale nella sala, la rabbia che monta allo stadio, la tristezza che resta in una casa, e da dove sta arrivando.",
    "pairings": [
      {
        "sphere": "correspondence",
        "text": "Sentire la stanza in cui non sei.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Sentire anche gli umori dell'Umbra del luogo.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Sapere quando l'umore scoppia.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Sentire l'umore di ieri, di dieci anni fa.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Sentire se l'umore l'ha messo lì una Magick.",
        "required": false
      }
    ],
    "scopes": "Area per quanto è grande la stanza: 1 la sala, 2 il palazzo, 3 il quartiere. Durata 2 per la scena. Precisione (dettaglio) per la testa da cui parte l'umore."
  },
  {
    "id": "mind-2-blindare-un-ricordo",
    "name": "Blindare un ricordo",
    "sphere": "mind",
    "level": 2,
    "extras": [],
    "text": "Quel ricordo diventa una cassaforte: nessuna lettura lo apre, nessuna riscrittura lo tocca. Il tuo, o quello di un altro.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Far respingere alla cassaforte anche la Magick più alta.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Blindare il ricordo di uno spirito, o oltre la morte.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Blindare il ricordo com'era in una data: nemmeno il tempo lo consuma.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Blindare il ricordo di chi non vedi.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Blindare anche il ricordo del corpo: il gesto imparato, il riflesso.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto resta blindato (7 per sempre). Bersagli per più ricordi o più teste. Condizioni 1 per la chiave che lo apre: solo tu, solo con quella parola."
  },
  {
    "id": "mind-2-impiantare-un-illusione-mentale",
    "name": "Impiantare un'illusione mentale",
    "sphere": "mind",
    "level": 2,
    "extras": [],
    "text": "Scrivi in una testa una cosa che non c'è: la vede, la sente, la tocca, solo lui. Nessuna telecamera la riprende. Se ferisce, è il terzo pallino, e per i danni Aggravati serve la Vita. Scriverla in venti teste nello stesso istante è uno strappo: Volgare, senza le Forze.",
    "pairings": [
      {
        "sphere": "forces",
        "text": "Fare l'illusione di luce e suono veri: la vedono tutti, telecamere comprese.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far ferire l'illusione anche il corpo: danni Aggravati.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Impiantare l'illusione in chi pensa senza cervello.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Impiantare l'illusione in chi non vedi.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far comparire l'illusione nel momento peggiore per lui.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Impiantare l'illusione di un momento passato: lo rivive.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più teste. Durata 1 per un attimo, 2 per la scena. Precisione (dettaglio) per i particolari: 1 una sagoma, 3 un volto, 5 un documento leggibile. Potenza (danni) se ferisce, dal terzo pallino."
  },
  {
    "id": "mind-2-non-restare-in-memoria",
    "name": "Non restare in memoria",
    "sphere": "mind",
    "level": 2,
    "extras": [],
    "text": "Ti vedono, ti parlano, e mezz'ora dopo saprebbero descrivere soltanto un tipo qualunque. Non sparisci: chi ti ha visto non riesce a trattenerti.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "Far sì che nessuno ti guardi abbastanza da ricordarti.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Non restare nemmeno nelle registrazioni: la telecamera ti sfoca.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Farti dimenticare da chi ti ha visto da lontano.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Non restare in memoria nemmeno agli spiriti.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Farti dimenticare anche da chi ti ha visto ieri.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena, 4 per la sessione. Bersagli per la Cabala. Area per un luogo intero: nessuno ricorda chi è passato."
  },
  {
    "id": "mind-2-pilotare-l-umore",
    "name": "Pilotare l'umore",
    "sphere": "mind",
    "level": 2,
    "extras": [],
    "text": "Accendi o spegni un'emozione che c'è già: la paura sale fino al panico, la rabbia si spegne, la fiducia cresce. Non crei niente: giri la manopola.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Pilotare anche la chimica: il tremore, il battito, il sudore seguono l'umore.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far girare l'umore nel momento giusto.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Pilotare l'umore di chi non vedi.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Pilotare l'umore di uno spirito.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Accendere un'emozione che non aveva.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Riaccendere l'umore che aveva ieri.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più persone. Area per una folla intera. Durata 1 per un attimo, 2 per la scena. Condizioni (malus 1, distrarre) se l'umore serve a distrarlo. Potenza (epicità) per quanto pesa: 1 un dettaglio, 3 stravolge la scena."
  },
  {
    "id": "mind-2-schermare-i-tuoi-pensieri",
    "name": "Schermare i tuoi pensieri",
    "sphere": "mind",
    "level": 2,
    "extras": [],
    "text": "Alzi mura attorno alla tua psiche: chi legge perde successi, chi vuole entrare trova la porta chiusa. Vale per te e per chi decidi.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Far respingere alle mura anche la Magick che vuole entrare.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Schermare anche dagli spiriti e da chi legge dall'Umbra.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far leggere a chi ci prova la cosa sbagliata.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Schermare chi è lontano.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Schermare anche il corpo: niente sudore, niente battito che ti tradisce.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena, 4 per la sessione, 7 per sempre. Bersagli per la Cabala. Potenza (epicità) nel braccio di ferro con chi legge."
  },
  {
    "id": "mind-2-seminare-un-idea",
    "name": "Seminare un'idea",
    "sphere": "mind",
    "level": 2,
    "extras": [],
    "text": "Gli metti un'idea in testa, e da lì in poi è una fra le tante: che affiori stanotte o mai lo decide la sua testa. Per farla affiorare al momento giusto serve l'Entropia.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "Far tornare proprio quell'idea, al momento giusto: la segue convinto di averla scelta.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Seminare l'idea in chi non vedi.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Seminare l'idea in uno spirito.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far germogliare l'idea in una data.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far arrivare l'idea come un bisogno del corpo: sete, fame, sonno.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Seminare un'idea che nessuna testa poteva avere.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più teste. Durata per quanto resta (7 per sempre). Condizioni 1 per quando affiora: quando vede la moglie. Precisione (dettaglio) per un'idea esatta e non vaga."
  },
  {
    "id": "mind-3-addormentare",
    "name": "Addormentare",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "Le palpebre del bersaglio si arrendono in tre respiri: dorme dove sta, e non si sveglia finché non decidi tu, o finché qualcuno non lo scuote. Da sola la Mente spegne la veglia; con la Vita spegni il corpo.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Addormentare il corpo, non solo la mente: nessuno lo sveglia a scossoni.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Farlo addormentare nel momento giusto: al volante no, sul divano sì.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Addormentare chi non vedi.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Addormentare uno spirito.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Farlo dormire fino a un'ora precisa.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più persone. Area per una sala intera. Durata 1 per un turno, 2 per la scena. Condizioni (malus 3, addormentare) per quanto è profondo il sonno."
  },
  {
    "id": "mind-3-assalto-psichico",
    "name": "Assalto psichico",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "Colpisci una mente con la tua: danno alla Volontà, mente contro mente. Chi crolla resta lucido ma vuoto; con la Vita il corpo paga insieme.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Far pagare anche il corpo: danni Aggravati.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Assalire uno spirito.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Assalire chi non vedi.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Colpire dove la mente è già crepata.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Far vedere l'assalto: la luce che acceca, il suono che stordisce.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far mordere l'assalto anche le difese magiche.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto ferisce. Bersagli per più menti. Condizioni (malus 4, stordire) per lasciarlo stordito."
  },
  {
    "id": "mind-3-entrare-e-dirigere-i-sogni",
    "name": "Entrare e dirigere i sogni",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "Il sonno altrui diventa il tuo palcoscenico: entri nel sogno, lo guardi, lo cambi, ci parli dentro. Chi dorme ti sente come parte del sogno.",
    "pairings": [
      {
        "sphere": "correspondence",
        "text": "Entrare nel sogno di chi dorme lontano.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Entrare nel sogno come in un luogo: l'Umbra dei sogni.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Fargli rivivere una notte passata, o mostrargli quella che verrà.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far restare al risveglio quello che è successo nel sogno: la ferita, la stanchezza.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Fargli sognare quello che teme di più.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Lanciare Magick da dentro il sogno.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più dormienti insieme. Durata 2 per la notte. Precisione (dettaglio) per il sogno esatto. Condizioni 1 per legarlo: solo quando sogna lei."
  },
  {
    "id": "mind-3-legare-le-menti-della-squadra",
    "name": "Legare le menti della squadra",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "La Cabala pensa in coro: ognuno sente ciò che serve agli altri, dove sono, cosa vedono, cosa stanno per fare. Niente parole.",
    "pairings": [
      {
        "sphere": "correspondence",
        "text": "Legare le menti a qualunque distanza.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Legare anche uno spirito o un fantasma alla squadra.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Condividere anche i sensi: vedere con gli occhi dell'altro.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far arrivare a ognuno esattamente il pensiero che gli serve.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Condividere anche i ricordi della giornata.",
        "required": false
      }
    ],
    "scopes": "Bersagli per quanti sono. Durata 2 per la scena, 4 per la sessione. Portata per quanto lontano regge il legame."
  },
  {
    "id": "mind-3-risanare-la-volonta",
    "name": "Risanare la Volontà",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "Ripari una mente lacerata: un successo per livello di Volontà; gli Aggravati chiedono anche una Quintessenza ciascuno. La tua chiede solo il secondo pallino.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Risanare insieme il corpo: la fatica, il tremore etc..",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Risanare gli Aggravati con la Quintessenza del luogo.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Risanare la Volontà di uno spirito, o di un morto.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Risanare chi non vedi.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Riportare la mente a com'era prima del trauma.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sì che la crepa non si riapra lì.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanta Volontà torna. Bersagli per più menti."
  },
  {
    "id": "mind-3-sciogliere-la-lingua",
    "name": "Sciogliere la lingua",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "Il bersaglio dice tutto ciò che pensa, e si stupisce di dirlo: la verità, il segreto, il nome che non doveva fare. Le menti resistono con la Volontà.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "Fargli dire proprio la cosa che non voleva dire.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Fargli dire tutto senza che il corpo lo tradisca: voce calma, mani ferme.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Sciogliere la lingua di chi non vedi.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Sciogliere la lingua di uno spirito.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Fargli dire quello che sapeva ieri e ha già dimenticato.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Far sentire quello che dice solo a te.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più bocche. Durata 1 per una domanda, 2 per l'interrogatorio. Precisione (informazione) per quanto pesa quel che deve dire. Condizioni 1 se parla solo con te."
  },
  {
    "id": "mind-3-telepatia-piena",
    "name": "Telepatia piena",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "Dialogo completo, mente a mente: parole, immagini, sensazioni, senza aprire bocca. In due sensi, se vuoi.",
    "pairings": [
      {
        "sphere": "correspondence",
        "text": "Parlare mente a mente con chi è lontano.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Parlare con chi pensa senza cervello.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Parlare con gli animali.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Parlare con chi era qui ieri, o con chi ci sarà.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Far arrivare il dialogo anche a una macchina: la radio, il telefono.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più interlocutori. Durata 1 per una frase, 2 per la scena. Portata per la distanza. Condizioni 1 se parla solo lui a te."
  },
  {
    "id": "mind-3-tradurre-le-lingue",
    "name": "Tradurre le lingue",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "Il significato ti arriva prima delle parole: capisci qualunque lingua, parlata o scritta, e ti fai capire. Non impari: comprendi, finché dura.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Tradurre anche i versi degli animali.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Tradurre le lingue dell'Umbra.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Tradurre le lingue morte e quelle che non esistono ancora.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Tradurre anche i segni su un oggetto: il codice, l'incisione, il marchio etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Tradurre un segnale: il codice radio, il flusso di dati etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Tradurre a distanza.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena, 4 per la sessione. Bersagli per far capire anche ai compagni. Precisione (dettaglio) per la sfumatura: 1 il senso, 3 le parole, 5 il tono e le allusioni."
  },
  {
    "id": "mind-4-comandare-una-mente",
    "name": "Comandare una mente",
    "sphere": "mind",
    "level": 4,
    "extras": [],
    "text": "Ordini assoluti: quello che dici lo fa. Ben eseguito, il bersaglio razionalizza e crede di averlo voluto; eseguito male, lascia le crepe che un altro esperto di Mente legge.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Comandare anche il corpo: fa quello che dici anche se non vuole.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Comandare uno spirito.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Comandare chi non vedi.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far arrivare l'ordine nel momento giusto.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far scattare l'ordine a un'ora precisa.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far valere l'ordine anche contro la Magick che lo protegge.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più persone. Durata 1 per un ordine, 2 per la scena, 4 per la sessione. Condizioni 1 per ogni clausola dell'ordine. Potenza (epicità) per quanto pesa l'ordine: 1 un dettaglio, 4 impatta sul capitolo."
  },
  {
    "id": "mind-4-dare-una-facolta-che-non-aveva",
    "name": "Dare una facoltà che non aveva",
    "sphere": "mind",
    "level": 4,
    "extras": [
      {
        "sphere": "prime",
        "level": 1,
        "required": true
      }
    ],
    "text": "Creatività, orecchio assoluto, coraggio, memoria fotografica: materia nuova invece che materia piegata. Serve il Primordio: da sola la Mente dirige quello che c'è.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Creare la facoltà dal nulla.",
        "required": true
      },
      {
        "sphere": "life",
        "text": "Dare una facoltà del corpo: la vista del falco, l'orecchio del cane etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Dare la facoltà a uno spirito.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Dare la facoltà per un tempo preciso, o farla nascere in una data.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far arrivare la facoltà quando serve.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Dare la facoltà a chi non vedi.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto resta (7 per sempre). Bersagli per più persone. Potenza (epicità) per quanto pesa la facoltà: 2 un talento, 5 un genio."
  },
  {
    "id": "mind-4-inceppare-una-mente",
    "name": "Inceppare una mente",
    "sphere": "mind",
    "level": 4,
    "extras": [],
    "text": "Nella sua testa resta un solo compito assurdo: contare le piastrelle, cercare la parola, finire il calcolo. Il mondo può attendere.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Inceppare anche il corpo: fermo, come la testa.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Inceppare uno spirito.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Inceppare chi non vedi.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Fargli trovare il compito da solo, e non finirlo mai.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Farlo restare inceppato fino a un'ora.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più persone. Durata 1 per un turno, 2 per la scena. Condizioni (malus 4, inabilitare) per quanto pesa: 4 non agisce, 7 non gioca."
  },
  {
    "id": "mind-4-mostrarti-in-corpo-di-luce",
    "name": "Mostrarti in corpo di luce",
    "sphere": "mind",
    "level": 4,
    "extras": [
      {
        "sphere": "spirit",
        "level": 1,
        "required": true
      },
      {
        "sphere": "prime",
        "level": 1,
        "required": true
      }
    ],
    "text": "La tua forma astrale si stacca e si mostra ai presenti: la vedono, la sentono parlare. Servono lo Spirito e il Primordio.",
    "pairings": [
      {
        "sphere": "spirit",
        "text": "Staccare la forma astrale dal corpo.",
        "required": true
      },
      {
        "sphere": "prime",
        "text": "Dare sostanza alla forma perché la vedano.",
        "required": true
      },
      {
        "sphere": "correspondence",
        "text": "Mostrarti lontano da dove sei.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Farti vedere anche dalle telecamere: luce vera.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Far toccare la forma: apre porte, prende oggetti.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far sembrare la forma un corpo vivo.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena. Portata per quanto lontano ti mostri. Precisione (dettaglio) per quanto sei nitido: 1 una luce, 3 la tua faccia."
  },
  {
    "id": "mind-4-riscrivere-ricordi",
    "name": "Riscrivere ricordi",
    "sphere": "mind",
    "level": 4,
    "extras": [],
    "text": "Cancelli e cuci: il ricordo di stasera non c'è più, al suo posto una cena tranquilla. La persona resta la stessa; cambia quello che sa di aver vissuto. La personalità intera è il quinto pallino.",
    "pairings": [
      {
        "sphere": "time",
        "text": "Riscrivere anche i ricordi vecchi di anni, coerenti con tutto il resto.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Riscrivere i ricordi di chi non vedi.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Riscrivere i ricordi di uno spirito o di un morto.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far tornare i conti al ricordo nuovo: nessuna crepa, nessuna stonatura.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Riscrivere anche la memoria del corpo: la cicatrice non fa più male, il gesto si dimentica.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più teste. Durata per quanto regge la riscrittura (7 per sempre). Precisione (dettaglio) per un ricordo solo e preciso: 1 la serata, 3 un volto, 5 una frase. Potenza (epicità) per quanto pesa: 2 una serata, 5 un anno di vita."
  },
  {
    "id": "mind-4-seminare-un-ordine-dormiente",
    "name": "Seminare un ordine dormiente",
    "sphere": "mind",
    "level": 4,
    "extras": [],
    "text": "L'istruzione resta latente per mesi e si sveglia alla parola convenuta: allora esegue, e non sa perché.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "Far arrivare la parola convenuta da sola, per caso.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far svegliare l'ordine a una data, senza parola.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Seminare l'ordine in chi non vedi.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Seminare l'ordine in uno spirito.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far svegliare l'ordine anche nel corpo: il gesto parte da solo.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far scattare l'ordine anche contro la Magick che lo protegge.",
        "required": false
      }
    ],
    "scopes": "Condizioni 1 per la parola o l'evento che lo sveglia, e Complessità per quanto è lungo l'ordine. Durata (fuori gioco) per quanto resta dormiente: 3 il mese, 5 l'anno. Bersagli per più persone."
  },
  {
    "id": "mind-5-accendere-un-intelletto",
    "name": "Accendere un intelletto",
    "sphere": "mind",
    "level": 5,
    "extras": [
      {
        "sphere": "prime",
        "level": 1,
        "required": true
      }
    ],
    "text": "Una coscienza dove non ce n'era: la macchina che pensa, il luogo che sa di esistere, la statua che ricorda. Serve il Primordio.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Creare la coscienza dal nulla.",
        "required": true
      },
      {
        "sphere": "matter",
        "text": "Accendere un oggetto: la macchina, la statua, la casa etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Accendere un'energia: la rete, la tempesta, il fuoco etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Dare alla coscienza nuova un'anima, e un posto nell'Umbra.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Accendere un vivente senza cervello: la pianta, la muffa, lo sciame etc..",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Accendere la coscienza in una data, o darle una scadenza.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto resta sveglia (7 per sempre). Potenza (epicità) per quanto pesa: 4 impatta sul capitolo, 7 sull'intera ambientazione. Precisione (dettaglio) per quanto è fine l'intelletto: 1 un cane, 3 un bambino, 5 un genio."
  },
  {
    "id": "mind-5-riforgiare-una-personalita",
    "name": "Riforgiare una personalità",
    "sphere": "mind",
    "level": 5,
    "extras": [],
    "text": "La persona che esce è coerente, funzionante e diversa, e non lo sospetta: i gusti, le paure, i legami, la storia che si racconta. Nessuna crepa.",
    "pairings": [
      {
        "sphere": "time",
        "text": "Riforgiare anche il passato che ricorda: coerente da sempre.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Riforgiare anche il corpo che va con la persona nuova: la postura, la voce, i gesti.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Riforgiare l'anima insieme: nemmeno un morto la riconoscerebbe.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far tornare i conti a tutti: nessuno nota la differenza.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Riforgiare chi non vedi.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far reggere la personalità nuova contro qualunque Magick.",
        "required": false
      }
    ],
    "scopes": "Durata 7. Potenza (epicità) per quanto pesa: 5 stravolge il capitolo, 7 sull'intera ambientazione. Bersagli per più persone. Precisione (dettaglio) per un tratto solo o la persona intera."
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
