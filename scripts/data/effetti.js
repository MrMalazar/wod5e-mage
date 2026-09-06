// Generato da tools/build-effetti.py dalle nove tavole di Sfera del LIBRO (06_2_1 … 06_2_9): non toccare a mano.
// Il Grimorio: gli effetti del manuale, Sfera per Sfera e livello per livello, con le Sfere in più che il testo chiede.
// Le Formule (dal ramo B, 01_DECISIONI/studi/formule_sfere.md): le parole universali; ogni effetto ne porta una o più.

export const EFFETTI = Object.freeze([
  {
    "id": "correspondence-1-leggere-lo-spazio",
    "name": "Leggere lo spazio",
    "sphere": "correspondence",
    "level": 1,
    "extras": [],
    "text": "La tua percezione spaziale ti consente di sentire e misurare ogni centimetro dello spazio intorno a te, rivelando nascondigli, intercapedini e via dicendo. All'opposto, sai quando ce n'è poco: se ce n'è poco, qualcosa o qualcuno lo occupa.",
    "pairings": [],
    "scopes": "Area per misurare un luogo.",
    "formule": [
      "percepire"
    ]
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
    "scopes": "Durata 2 ti copre la scena.",
    "formule": [
      "trovare"
    ]
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
    "scopes": "Area per le dimensioni dell'effetto. Precisione (dettaglio) per sapere più informazioni. Durata per tenerlo nella scena.",
    "formule": [
      "sapere"
    ]
  },
  {
    "id": "correspondence-2-accorciare-la-strada",
    "name": "Accorciare la strada",
    "sphere": "correspondence",
    "level": 2,
    "extras": [],
    "text": "Stringi lo spazio davanti a te: il corridoio, il vicolo, il tratto di strada che hai davanti si accorcia, e i tuoi passi valgono doppio. Non sparisci e non riappari: cammini, e arrivi prima di quanto chiunque si aspetti. Pieghi un tratto alla volta, non un quartiere.",
    "pairings": [],
    "scopes": "Area per quanto tratto stringi. Durata 1 per la fuga, 2 per la scena. Bersagli per chi cammina con te.",
    "formule": [
      "ritoccare"
    ]
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
    "scopes": "Portata per la distanza. Gli altri Ambiti li dichiara l'effetto dell'altra Sfera.",
    "formule": [
      "varcare"
    ]
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
    "scopes": "Portata per la distanza. Precisione (dettaglio) per i particolari. Durata 1 per lo scontro, 2 per la scena.",
    "formule": [
      "percepire"
    ]
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
    "scopes": "Durata per quanto canta il marchio (7 per la cronaca). Bersagli per più marchi in un colpo. Portata per quanto lontano lo senti.",
    "formule": [
      "vincolare",
      "trovare"
    ]
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
    "scopes": "Area 1 la stanza, 2 l'edificio. Durata per quanto regge. Condizioni se morde, o se lascia passare solo i tuoi.",
    "formule": [
      "proteggere",
      "celare"
    ]
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
    "scopes": "Durata 2 per vegliare tutta la scena. Precisione (dettaglio) per il punto esatto da cui parte il filo.",
    "formule": [
      "percepire"
    ]
  },
  {
    "id": "correspondence-2-parlare-nel-luogo-che-guardi",
    "name": "Parlare nel luogo che guardi",
    "sphere": "correspondence",
    "level": 2,
    "extras": [],
    "text": "La tua voce arriva nel luogo lontano che stai osservando, e senti chi risponde: parli con chi è là come se fossi sulla porta.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Parlare mente a mente con chi è là, senza voce.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Far arrivare la voce come suono vero, che tutti là sentono.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Parlare con chi sta di là, nel luogo che guardi.",
        "required": false
      }
    ],
    "scopes": "Portata per la distanza. Durata 1 per una frase, 2 per la scena. Bersagli per più interlocutori.",
    "formule": [
      "comunicare"
    ]
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
    "scopes": "Portata per la distanza. Durata 1 per il tempo di girare la maniglia.",
    "formule": [
      "varcare"
    ]
  },
  {
    "id": "correspondence-3-allargare-o-restringere-una-stanza",
    "name": "Allargare o restringere una stanza",
    "sphere": "correspondence",
    "level": 3,
    "extras": [],
    "text": "Lo spazio dentro un luogo cresce o si stringe: la cella diventa una sala, il corridoio un budello dove non si passa in due. Da fuori le pareti restano dove stavano.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Far seguire alle pareti lo spazio nuovo: la stanza è grande davvero, anche da fuori.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far sì che chi entra non trovi strano lo spazio che c'è.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Far arrivare luce e aria nello spazio in più.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Tenere stabile lo spazio nuovo senza mantenerlo.",
        "required": false
      }
    ],
    "scopes": "Area per quanto spazio: 1 la stanza, 2 il palazzo. Durata per quanto regge: 2 la scena, 4 la sessione, 7 per sempre. Potenza (epicità) per quanto cambia: 1 un dettaglio, 3 stravolge una scena.",
    "formule": [
      "trasformare"
    ]
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
    "scopes": "Bersagli per quante cose. Portata per quanto lontano finiscono. Potenza (peso) se sono pesanti.",
    "formule": [
      "spostare"
    ]
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
    "scopes": "Precisione (dettaglio) per la scheggia giusta e non il resto. Bersagli per più feriti.",
    "formule": [
      "spostare"
    ]
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
    "scopes": "Portata per la distanza (6 dall'altra parte del mondo). Potenza (peso) per quanto pesa. Precisione (dettaglio) se la cosa è una fra tante.",
    "formule": [
      "spostare"
    ]
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
    "scopes": "Portata per la distanza fra i due. Potenza (peso). Bersagli 2 per due persone.",
    "formule": [
      "spostare"
    ]
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
    "scopes": "Portata per la distanza. Bersagli per i compagni. Potenza (peso) per il carico.",
    "formule": [
      "varcare"
    ]
  },
  {
    "id": "correspondence-3-stropicciare-lo-spazio",
    "name": "Stropicciare lo spazio",
    "sphere": "correspondence",
    "level": 3,
    "extras": [],
    "text": "Pieghi lo spazio addosso a qualcuno e lo rimetti a posto come un foglio di carta stropicciato: non torna com'era, perché l'hai compresso e mutato. Non è la forza a colpire: è la posizione che si scardina, e il corpo fa i conti con dove si trova adesso.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Scardinare per le vie del corpo, e restare spiegabile: la caduta, lo strappo, la lussazione.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Stropicciare un oggetto o un veicolo insieme a chi c'è dentro.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far cedere per prima la piega che regge tutto.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto ferisce. Bersagli per più corpi. Precisione (dettaglio) per una parte sola: la mano, non l'uomo.",
    "formule": [
      "danneggiare"
    ]
  },
  {
    "id": "correspondence-3-disfare-il-ponte-di-un-altro",
    "name": "Disfare il ponte di un altro",
    "sphere": "correspondence",
    "level": 3,
    "extras": [],
    "text": "Mentre un altro mago getta un ponte, apre un varco o tira un filo, tu glielo tagli: il suo effetto non arriva dove voleva. Si tira contro il suo lancio; vince chi ha più successi.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Far nascere stanco qualunque suo effetto, non solo quelli sullo spazio.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far inceppare il suo lancio nel punto debole.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Fargli credere che il ponte regga, mentre non regge.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) nel braccio di ferro. Durata 1 per un lancio, 2 per tutta la scena.",
    "formule": [
      "contrastare"
    ]
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
    "scopes": "Durata per quanto regge. Potenza (epicità) nel braccio di ferro. Bersagli per più persone.",
    "formule": [
      "bloccare"
    ]
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
    "scopes": "Portata per la distanza. Durata per quanto resta aperto (4 la sessione). Potenza (peso) per tenerlo largo. Condizioni 1 se si apre solo per i tuoi.",
    "formule": [
      "aprire"
    ]
  },
  {
    "id": "correspondence-4-teletrasportare-un-gruppo",
    "name": "Teletrasportare un gruppo",
    "sphere": "correspondence",
    "level": 4,
    "extras": [],
    "text": "Sparite insieme e riapparite là: la Cabala intera, l'auto con chi c'è dentro, il carico. Nessuno viaggia. Volgare se qualcuno guarda.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Far passare i corpi restando corpi: il gesto si spiega.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Far passare anche il veicolo e il carico, interi.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far sì che chi resta non ricordi di avervi visto sparire.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Arrivare un attimo prima di partire.",
        "required": false
      }
    ],
    "scopes": "Portata per la distanza. Bersagli per quanti passano. Potenza (peso) per il veicolo e il carico.",
    "formule": [
      "varcare"
    ]
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
      }
    ],
    "scopes": "Area per il tratto di strada. Durata per quanto dura. Condizioni se vale solo per certi passi.",
    "formule": [
      "condizionare"
    ]
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
    "scopes": "Area per la grandezza. Durata per quanto resta chiusa. Condizioni 1 se si riapre all'alba.",
    "formule": [
      "barriera"
    ]
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
    "scopes": "Area, Potenza (peso ed epicità), Durata: tutti alti.",
    "formule": [
      "rivoluzionare"
    ]
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
    "scopes": "Precisione (dettaglio) per un punto solo e non l'insieme: 1 il muro, 3 il mattone. Bersagli per più cose alla volta. Durata 2 per tenere l'occhio acceso tutta la scena.",
    "formule": [
      "sapere"
    ]
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
    "scopes": "Bersagli per ascoltare più bocche insieme. Durata 2 per un interrogatorio intero. Precisione (dettaglio) per la frase esatta che stona.",
    "formule": [
      "sapere"
    ]
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
      }
    ],
    "scopes": "Precisione (dettaglio) per una domanda sola e precisa invece del quadro. Area per pesare un luogo intero. Durata 2 per tenere il fiuto acceso tutta la scena.",
    "formule": [
      "prevedere",
      "percepire"
    ]
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
    "scopes": "Precisione (dettaglio) per la cifra esatta e non l'ordine di grandezza. Bersagli per più conti insieme. Durata 2 per leggere tutta la scena.",
    "formule": [
      "prevedere"
    ]
  },
  {
    "id": "entropy-1-sentire-la-mano-sulla-sorte",
    "name": "Sentire la mano sulla sorte",
    "sphere": "entropy",
    "level": 1,
    "extras": [],
    "text": "Distingui il caso vero da quello orientato: la fortuna toccata, la sfortuna costruita, la coincidenza che ha una firma.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Sapere di chi è la mano, e con quanta forza ha spinto.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Sapere quando la sorte è stata toccata.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Sapere cosa voleva chi ha spinto.",
        "required": false
      }
    ],
    "scopes": "Area per setacciare un luogo. Durata 2 per tenere il fiuto acceso tutta la scena. Precisione (dettaglio) per una coincidenza sola fra tante.",
    "formule": [
      "percepire"
    ]
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
    "scopes": "Durata per quanto deve reggere: 1 la fuga, 2 la scena, 4 la sessione. Bersagli per più cose insieme. Potenza (peso) se è grosso: il ponte, non la corda.",
    "formule": [
      "potenziare"
    ]
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
      }
    ],
    "scopes": "Condizioni 1 per legarla a un momento: quando glielo chiederanno. Bersagli per più teste. Potenza (epicità) per quanto pesa la scelta: 1 il tavolo al ristorante, 4 il voto in consiglio.",
    "formule": [
      "suggestionare"
    ]
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
      }
    ],
    "scopes": "Durata 1 per attraversare la stanza, 2 per la scena. Bersagli per la Cabala intera. Area per un luogo dove nessuno nota niente.",
    "formule": [
      "celare"
    ]
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
      }
    ],
    "scopes": "Potenza (peso) per quanto è grosso quel che cede: 1 la serratura, 3 l'auto, 5 la casa. Condizioni 1 per farlo scattare al momento giusto: quando gira la chiave. Precisione (dettaglio) per il pezzo giusto e non l'insieme. Bersagli per più cose.",
    "formule": [
      "confondere",
      "distruggere"
    ]
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
    "scopes": "Bersagli per quanti ti seguono (zero se stanno tutti sulla stessa auto). Durata 1 per la fuga, 2 per tutta la scena. Area per un quartiere intero che gli va contro.",
    "formule": [
      "confondere"
    ]
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
      }
    ],
    "scopes": "Bersagli per più giocatori o più tavoli. Condizioni 1 per legarla a una mano precisa. Precisione (dettaglio) per il risultato esatto e non «vinco»: il sette, il doppio sei.",
    "formule": [
      "ritoccare"
    ]
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
    "scopes": "Durata 1 per lo scontro, 2 per la scena, 4 per la sessione. Bersagli per proteggere altri. Condizioni 1 se scatta da sola quando sparano, 2 se chi ti manca si inceppa pure.",
    "formule": [
      "benedire",
      "proteggere"
    ]
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
      }
    ],
    "scopes": "Area per quanto è grande la serata: 1 la bisca, 2 l'edificio, 3 il quartiere. Durata 2 la serata, o fuori gioco 3 per un mese. Bersagli per chi vince e chi perde. Condizioni 1 per una regola: solo i tuoi, solo al tavolo grande.",
    "formule": [
      "benedire",
      "maledire"
    ]
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
    "scopes": "Potenza (danni) per quanto ferisce. Bersagli per più spiriti. Precisione (dettaglio) per colpire quello giusto in uno sciame.",
    "formule": [
      "danneggiare"
    ]
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
      }
    ],
    "scopes": "Potenza (peso) per quanto è grosso: 1 la chiave, 3 l'auto, 5 la casa. Precisione (dettaglio) per la parte giusta e non l'insieme: la canna, non la pistola. Bersagli per più oggetti.",
    "formule": [
      "distruggere"
    ]
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
    "scopes": "Area per quanto è ampio il perimetro in cui il guasto resta chiuso. Durata per quanto tieni chiusa la porta: 2 la scena, 4 la sessione. Precisione (dettaglio) per l'anello esatto da spezzare.",
    "formule": [
      "proteggere"
    ]
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
      }
    ],
    "scopes": "Durata per quanto è lontano quel domani (fuori gioco: 1 il giorno, 3 il mese, 5 l'anno). Potenza (epicità) per quanto pesa il domani che scegli: 2 tocca la scena, 5 stravolge il capitolo. Precisione (dettaglio) per un esito preciso e non «meglio».",
    "formule": [
      "dominare"
    ]
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
        "sphere": "spirit",
        "text": "Sciogliere il patto, se la maledizione viene da uno spirito.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) nel braccio di ferro: contro una maledizione più forte vince l'Epicità più alta. Bersagli per più persone maledette. Precisione (dettaglio) per il nodo giusto fra molti.",
    "formule": [
      "cancellare"
    ]
  },
  {
    "id": "entropy-3-portarlo-dove-vuoi-per-coincidenze",
    "name": "Portarlo dove vuoi per coincidenze",
    "sphere": "entropy",
    "level": 3,
    "extras": [],
    "text": "Le coincidenze lo portano dove hai deciso tu: il taxi libero va di là, la porta aperta è quella, la telefonata arriva al momento giusto. Lui cammina da solo, e arriva.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Fargli credere di aver scelto lui la strada.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Farlo arrivare a un'ora precisa.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena, 4 per la sessione. Bersagli per più persone. Condizioni 1 per dove deve arrivare.",
    "formule": [
      "condizionare"
    ]
  },
  {
    "id": "entropy-3-rubare-la-fortuna",
    "name": "Rubare la fortuna",
    "sphere": "entropy",
    "level": 3,
    "extras": [],
    "text": "La fortuna di una persona passa a te: quello che a lui andava bene ora va bene a te, e lui colleziona quello che avresti collezionato tu.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Rubare anche la Quintessenza insieme alla fortuna.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Rubare la salute insieme alla fortuna: lui si ammala, tu guarisci.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Non fargli capire da dove viene la sfortuna.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena, 3 per più scene. Bersagli per rubare a più persone. Potenza (epicità) per quanta fortuna passa.",
    "formule": [
      "drenare"
    ]
  },
  {
    "id": "entropy-3-disfare-la-fortuna-comprata-da-un-altro",
    "name": "Disfare la fortuna comprata da un altro",
    "sphere": "entropy",
    "level": 3,
    "extras": [],
    "text": "Mentre un altro mago piega la sorte, tu la raddrizzi: la sua fortuna comprata non arriva, la sua maledizione non si stringe. Si tira contro il suo lancio; vince chi ha più successi.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Far nascere stanco qualunque suo effetto, non solo quelli sulla sorte.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Fargli credere che la sorte gli abbia risposto.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Raddrizzare la sorte prima ancora che la pieghi.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) nel braccio di ferro. Durata 1 per un lancio, 2 per tutta la scena.",
    "formule": [
      "contrastare"
    ]
  },
  {
    "id": "entropy-3-non-far-presa-alla-sfortuna",
    "name": "Non far presa alla sfortuna",
    "sphere": "entropy",
    "level": 3,
    "extras": [],
    "text": "La sfortuna e le maledizioni ti scivolano addosso: la malasorte cucita da altri non trova dove attaccarsi.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Respingere anche la Magick che porta la maledizione.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Non far presa nemmeno alla sfortuna del corpo: contagi, incidenti.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Non far presa alle maledizioni degli spiriti.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena, 4 per la sessione, 7 per sempre. Bersagli per proteggere altri.",
    "formule": [
      "resistere"
    ]
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
      }
    ],
    "scopes": "Durata per quanto dura (fuori gioco: 3 il mese, 7 per sempre). Condizioni 1 per legarla: solo quando impugna un'arma, solo la sua famiglia etc.. Potenza (epicità) per il peso: 2 tocca la scena, 6 impatta sulla storia. Bersagli per una famiglia intera.",
    "formule": [
      "benedire",
      "maledire"
    ]
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
    "scopes": "Potenza (epicità) per quanta fortuna: 1 un dettaglio, 4 impatta sul capitolo. Durata per quanto dura. Bersagli per chi la riceve.",
    "formule": [
      "creare"
    ]
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
      }
    ],
    "scopes": "Potenza (danni) per quanto ferisce. Durata per quanto continua a marcire. Condizioni 1 se scatta solo quando fa una cosa. Bersagli per più corpi.",
    "formule": [
      "danneggiare"
    ]
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
        "text": "Far seguire il perimetro a chi lo porta.",
        "required": false
      }
    ],
    "scopes": "Area per il perimetro: 1 la stanza, 2 l'edificio, 3 il quartiere. Durata per quanto regge. Condizioni 1 per chi entra: i tuoi tengono la fortuna, gli altri no.",
    "formule": [
      "barriera"
    ]
  },
  {
    "id": "entropy-4-costruire-un-alibi-di-coincidenze",
    "name": "Costruire un alibi di coincidenze",
    "sphere": "entropy",
    "level": 4,
    "extras": [],
    "text": "Le coincidenze confermano una storia che non è vera: il testimone che ti ha visto altrove, lo scontrino con l'ora giusta, la telecamera che ha ripreso un'altra cosa. Ogni verifica torna.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Far ricordare ai testimoni quello che serve.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Far esistere gli oggetti che confermano: lo scontrino, il biglietto.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far tornare i conti anche nel passato.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) per quanto pesa la storia: 2 tocca la scena, 4 impatta sul capitolo. Durata per quanto regge (7 per sempre). Condizioni 1 per ogni pezzo della storia.",
    "formule": [
      "simulare"
    ]
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
    "scopes": "Durata (7 per sempre). Bersagli 2, o di più per una Cabala intera. Condizioni 1 per una regola: finché vivono nella stessa città, finché uno non tradisce etc.. Potenza (epicità) per quanto pesa il legame.",
    "formule": [
      "destinare",
      "vincolare"
    ]
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
    "scopes": "Potenza (epicità) per quanto è grande il destino: 5 stravolge il capitolo, 7 impatta sull'intera ambientazione. Durata 7. Bersagli per una stirpe.",
    "formule": [
      "destinare"
    ]
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
    "scopes": "Condizioni 1 per ogni clausola, e Complessità per quanto è lungo il contratto (7 livello contratto). Durata 7 per sempre. Bersagli per quanti giurano. Potenza (epicità) per quanto pesa la punizione.",
    "formule": [
      "vincolare"
    ]
  },
  {
    "id": "entropy-5-dare-regole-alla-sorte-di-un-luogo",
    "name": "Dare regole alla sorte di un luogo",
    "sphere": "entropy",
    "level": 5,
    "extras": [],
    "text": "In quel luogo la sorte segue regole tue: chi mente inciampa, chi entra armato si ferisce da solo, chi dice la verità vince sempre al tavolo. Non pieghi probabilità: scrivi le leggi del caso.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Far sentire le regole a chi entra, come un'aria.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Far valere le regole anche nell'Umbra del luogo.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far reggere le regole senza mantenerle.",
        "required": false
      }
    ],
    "scopes": "Area per il luogo: 2 l'edificio, 3 il quartiere. Durata 7. Condizioni 1 per ogni regola, e Complessità per quanto è lungo il codice.",
    "formule": [
      "rivoluzionare"
    ]
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
    "scopes": "Durata 2 per tutta la scena. Precisione (dettaglio) per la frequenza esatta e non la banda.",
    "formule": [
      "percepire"
    ]
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
      }
    ],
    "scopes": "Precisione (dettaglio) per la traccia singola fra tante. Precisione (informazione) per quanto pesa nella trama quel che cerchi. Area per leggere un palazzo intero.",
    "formule": [
      "sapere"
    ]
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
    "scopes": "Area per la rete intera: 1 la stanza, 2 il palazzo, 3 il quartiere. Durata 2 per la scena. Precisione (dettaglio) per un filo solo.",
    "formule": [
      "trovare"
    ]
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
    "scopes": "Precisione (dettaglio) per i particolari: 1 le sagome, 3 l'arma in mano. Durata 1 per un'occhiata, 2 per la scena. Area per tutto il piano.",
    "formule": [
      "percepire"
    ]
  },
  {
    "id": "forces-1-sentire-suoni-e-vibrazioni-lontane",
    "name": "Sentire suoni e vibrazioni lontane",
    "sphere": "forces",
    "level": 1,
    "extras": [],
    "text": "L'orecchio arriva dove l'aria porta: il sussurro nella stanza accanto, i passi due piani sotto, il motore che si avvicina dalla strada, la voce in fondo al corridoio.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Capire anche cosa vuol dire chi parla, non solo le parole.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Sentire attraverso il muro come se non ci fosse.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Sentire il battito e il respiro, oltre alla voce.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Sentire dall'altra parte della città, non solo del palazzo.",
        "required": false
      }
    ],
    "scopes": "Area per quanto ascolti: 1 la stanza, 2 il palazzo, 3 il quartiere. Durata 2 per la scena. Precisione (dettaglio) per una voce sola fra tante.",
    "formule": [
      "percepire"
    ]
  },
  {
    "id": "forces-1-sapere-quanto-resta-a-un-energia",
    "name": "Sapere quanto resta a un'energia",
    "sphere": "forces",
    "level": 1,
    "extras": [],
    "text": "Sai quanto resta alla batteria, al quadro, al motore, al temporale: quando l'energia si spegne, e quanto ne è rimasta.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "Sapere anche cosa cede per primo quando finisce.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Avere l'ora esatta in cui si spegne.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Sapere quanto regge il contenitore insieme all'energia.",
        "required": false
      }
    ],
    "scopes": "Precisione (dettaglio) per la cifra esatta. Bersagli per più fonti. Durata 2 per la scena.",
    "formule": [
      "prevedere"
    ]
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
    "scopes": "Area per la stanza o la sala. Durata 1 per un attimo, 2 per la scena. Bersagli per zittire più bocche. Condizioni (malus 1) se il suono serve a distrarre.",
    "formule": [
      "spegnere",
      "potenziare"
    ]
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
    "scopes": "Durata 1 per attraversare, 2 per la scena. Bersagli per la Cabala. Area per nascondere un luogo. Precisione (dettaglio) se pieghi solo un colore, solo una voce.",
    "formule": [
      "celare"
    ]
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
        "sphere": "matter",
        "text": "Deformare la pallottola in volo, oltre a deviarla.",
        "required": false
      }
    ],
    "scopes": "Durata 1 per lo scontro, 2 per la scena. Bersagli per coprire i compagni. Potenza (peso) per quello che devii: 1 la pallottola, 3 l'auto lanciata. Condizioni 1 per farlo scattare da solo: ogni colpo diretto a te.",
    "formule": [
      "spostare",
      "proteggere"
    ]
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
    "scopes": "Potenza (danni) per quanto brucia o scarica. Area per quanta energia governi: 1 il camino, 2 l'incendio del piano. Durata 1 per lo scontro, 2 per la scena. Precisione (dettaglio) per guidarla in un punto solo.",
    "formule": [
      "dominare"
    ]
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
    "scopes": "Area per la superficie: 1 la stanza, 2 il palazzo. Durata 1 per un turno, 2 per la scena. Condizioni (malus 2, ostacolare) per chi ci cade. Bersagli per far scivolare solo loro.",
    "formule": [
      "confondere"
    ]
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
        "sphere": "life",
        "text": "Proiettare te stesso: la tua voce, la tua faccia, dove non sei.",
        "required": false
      }
    ],
    "scopes": "Area per quanto è grande: 1 la stanza. Durata 1 per un attimo, 2 per la scena. Precisione (dettaglio) per i particolari: 1 una sagoma, 3 un volto che si riconosce. Condizioni (malus 1, distrarre) se serve a ingannare.",
    "formule": [
      "ingannare",
      "creare"
    ]
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
        "sphere": "entropy",
        "text": "Far colpire il freddo alla cosa più fragile: la tubatura, il serbatoio, il vetro etc..",
        "required": false
      }
    ],
    "scopes": "Area per la stanza o il palazzo. Potenza (danni) per quanto ferisce il gelo. Durata 2 per tenere il gelo tutta la scena. Bersagli per gelare solo loro.",
    "formule": [
      "drenare"
    ]
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
        "sphere": "correspondence",
        "text": "Spegnere le luci del piano di sotto.",
        "required": false
      }
    ],
    "scopes": "Area per quante fiamme o luci: 1 la stanza, 2 il palazzo. Potenza (danni) se la fiamma divampa addosso a qualcuno. Bersagli per più fuochi scelti. Condizioni 1 per farlo scattare dopo: quando entra.",
    "formule": [
      "spegnere",
      "riparare"
    ]
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
    "scopes": "Durata 1 per lo scontro, 2 per la scena, 4 per la sessione. Bersagli per la Cabala. Potenza (danni) per quanto toglie ai colpi.",
    "formule": [
      "proteggere"
    ]
  },
  {
    "id": "forces-2-accelerare-o-frenare-cio-che-si-muove",
    "name": "Accelerare o frenare ciò che si muove",
    "sphere": "forces",
    "level": 2,
    "extras": [],
    "text": "La massa in volo va più veloce o più piano: il proiettile, l'auto, la corrente, la fiamma. Non li fermi: cambi il passo.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Far reggere la cosa alla velocità nuova senza strappi.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Accelerare o frenare un corpo senza fargli male.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far cambiare il passo nel momento giusto.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto muovi: 1 la pallottola, 3 l'auto. Durata 1 per un turno, 2 per la scena. Bersagli per più cose.",
    "formule": [
      "accelerare",
      "rallentare"
    ]
  },
  {
    "id": "forces-2-cambiare-colore-e-tono-a-un-energia",
    "name": "Cambiare colore e tono a un'energia",
    "sphere": "forces",
    "level": 2,
    "extras": [],
    "text": "Il colore della fiamma, il tono della luce, la frequenza del suono: cambi un dettaglio dell'energia e lasci il resto.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Far vedere il colore solo a chi scegli.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Far seguire alla materia il colore nuovo: la lampada resta blu.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far cambiare il colore nel momento giusto: il segnale.",
        "required": false
      }
    ],
    "scopes": "Area per la stanza. Durata 1 per un attimo, 2 per la scena. Precisione (dettaglio) per la frequenza esatta.",
    "formule": [
      "mutare"
    ]
  },
  {
    "id": "forces-2-rimettere-in-moto-un-impianto",
    "name": "Rimettere in moto un impianto",
    "sphere": "forces",
    "level": 2,
    "extras": [],
    "text": "Il motore, l'impianto, la corrente, la fiamma tornano a funzionare: l'energia riprende a girare dove si era fermata. Il pezzo rotto resta rotto: ripari il flusso, non la materia.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Riparare anche il pezzo rotto.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Rimettere in moto anche una Meraviglia scarica.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sì che non si fermi più lì.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto è grosso: 1 la torcia, 3 l'auto, 5 la centrale. Bersagli per più impianti. Durata per quanto regge il flusso.",
    "formule": [
      "riparare"
    ]
  },
  {
    "id": "forces-2-proiettare-la-voce-lontano",
    "name": "Proiettare la voce lontano",
    "sphere": "forces",
    "level": 2,
    "extras": [],
    "text": "La tua voce arriva dove non arriverebbe: in fondo alla piazza, nella radio, nel telefono dall'altra parte della città, e senti la risposta.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Far sentire la voce solo a chi scegli.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Far parlare un oggetto con la tua voce: la statua, l'altoparlante spento.",
        "required": false
      }
    ],
    "scopes": "Portata per la distanza. Durata 1 per una frase, 2 per la scena. Bersagli per più interlocutori.",
    "formule": [
      "comunicare"
    ]
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
    "scopes": "Durata 1 per la salita, 2 per la scena. Bersagli per chi viene con te. Potenza (peso) per quello che porti.",
    "formule": [
      "potenziare"
    ]
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
        "sphere": "entropy",
        "text": "Far finire la conversione nel posto peggiore per loro.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per l'energia che ne esce. Area per quanta energia converti: 1 la stanza. Durata 1 per il colpo, 2 per tenere aperta la conversione.",
    "formule": [
      "trasmutare"
    ]
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
    "scopes": "Potenza (danni) per quanto colpisce. Area per quanta ne evochi: 1 la stanza in fiamme. Durata 1 per una scarica, 2 per tenerla accesa. Precisione (dettaglio) per l'energia esatta: la frequenza, la temperatura.",
    "formule": [
      "creare",
      "evocare"
    ]
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
        "sphere": "entropy",
        "text": "Fermare solo quello che deve fermarsi: l'auto sì, il bambino che attraversa no.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto fermi: 2 una persona, 3 l'auto, 4 il tir. Bersagli per più cose in corsa. Durata 1 per tenerlo fermo un turno, 2 per la scena.",
    "formule": [
      "bloccare",
      "rallentare"
    ]
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
      }
    ],
    "scopes": "Durata 1 per il salto, 2 per la scena, 4 per la traversata. Bersagli per chi vola con te. Potenza (peso) per il carico: 1 lo zaino, 3 l'auto.",
    "formule": [
      "spostare"
    ]
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
    "scopes": "Potenza (danni) per quanto colpisce. Area per il raggio: 1 la stanza, 2 il palazzo. Bersagli per chi risparmiare. Condizioni (malus 4, stordire) per chi ci finisce dentro.",
    "formule": [
      "danneggiare"
    ]
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
    "scopes": "Area per il raggio: 1 la stanza, 2 il palazzo, 3 il quartiere. Bersagli per scegliere cosa risparmiare. Condizioni 1 per farlo scattare da solo: quando aprono la porta.",
    "formule": [
      "distruggere"
    ]
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
    "scopes": "Potenza (peso) per quanto sollevi: 1 lo zaino, 2 una persona, 3 l'auto, 4 il tir. Potenza (danni) se scagli. Bersagli per più cose insieme. Durata 1 per un turno, 2 per la scena. Precisione (dettaglio) per un lavoro fine: la chiave nella toppa.",
    "formule": [
      "spostare"
    ]
  },
  {
    "id": "forces-3-spegnere-la-magick-di-un-altro",
    "name": "Spegnere la Magick di un altro",
    "sphere": "forces",
    "level": 3,
    "extras": [],
    "text": "Mentre un altro mago scaglia energia, tu la disfi in aria: il fulmine si spegne a metà strada, la fiamma non arriva. Si tira contro il suo lancio; vince chi ha più successi.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Far nascere stanco qualunque suo effetto, non solo l'energia.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far inceppare il suo lancio nel punto debole.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Far assorbire l'energia disfatta da un oggetto.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) nel braccio di ferro. Durata 1 per un lancio, 2 per tutta la scena.",
    "formule": [
      "contrastare"
    ]
  },
  {
    "id": "forces-3-non-farti-toccare-da-un-energia",
    "name": "Non farti toccare da un'energia",
    "sphere": "forces",
    "level": 3,
    "extras": [],
    "text": "Fuoco, fulmine, freddo, suono: l'energia che scegli ti arriva addosso e non fa presa. Non è uno scudo: è il tuo corpo che non la sente.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Far entrare la resistenza nella carne: dura senza mantenerla.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Far resistere anche quello che porti addosso.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Resistere anche all'energia fatta di Magick.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena, 4 per la sessione. Bersagli per proteggere altri. Precisione (dettaglio) per un'energia sola o per tutte.",
    "formule": [
      "resistere"
    ]
  },
  {
    "id": "forces-3-modellare-la-sagoma-di-un-energia",
    "name": "Modellare la sagoma di un'energia",
    "sphere": "forces",
    "level": 3,
    "extras": [],
    "text": "Il fulmine a sfera, la fiamma a forma di mano, il suono che gira attorno alla stanza: dai forma all'energia senza cambiarne la natura.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Dare all'energia un corpo solido che tiene la forma.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far vedere la forma solo a chi scegli.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far tenere la forma senza mantenerla.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) se la forma colpisce. Durata 1 per un turno, 2 per la scena. Precisione (dettaglio) per una forma fine.",
    "formule": [
      "trasformare"
    ]
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
        "sphere": "mind",
        "text": "Far vedere la fonte solo ai tuoi.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto resta acceso (fuori gioco: 3 il mese, 7 per sempre). Area per quanto illumina e scalda: 1 la stanza, 2 il palazzo.",
    "formule": [
      "costruire"
    ]
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
    "scopes": "Potenza (danni) per quanto colpisce. Area per quanta energia raccogli: 2 il palazzo, 3 il quartiere. Precisione (dettaglio) per il punto esatto.",
    "formule": [
      "drenare"
    ]
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
        "sphere": "time",
        "text": "Far arrivare il meteo a orari: la nebbia ogni notte alle tre.",
        "required": false
      }
    ],
    "scopes": "Area per il perimetro: 3 il quartiere, 4 la città, 5 la regione. Durata (fuori gioco: 1 il giorno, 2 la settimana). Potenza (danni) se la tempesta ferisce. Condizioni 1 per legarlo a un evento.",
    "formule": [
      "dominare"
    ]
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
        "sphere": "time",
        "text": "Mostrare com'era ieri.",
        "required": false
      }
    ],
    "scopes": "Area per quanto è grande: 1 la stanza, 2 il palazzo. Durata 2 per la scena, 4 per la sessione. Precisione (dettaglio) per i particolari: 3 le facce, 5 il testo sui documenti. Bersagli per chi invece deve vedere la verità.",
    "formule": [
      "simulare"
    ]
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
      }
    ],
    "scopes": "Area per l'estensione: 2 il palazzo, 3 il quartiere, 4 la città. Potenza (danni) per quanto colpisce. Durata 2 per la scena. Bersagli per chi risparmiare.",
    "formule": [
      "evocare",
      "danneggiare"
    ]
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
        "sphere": "entropy",
        "text": "Lasciare acceso dentro solo quello che vuoi tu.",
        "required": false
      }
    ],
    "scopes": "Area per il perimetro: 2 il palazzo, 3 il quartiere. Durata 2 per la scena, 4 per la sessione. Condizioni 1 per chi è esente: i tuoi. Potenza (danni) se il gelo e il buio feriscono.",
    "formule": [
      "barriera"
    ]
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
        "sphere": "time",
        "text": "Dare all'energia nuova un orologio suo.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) per quanto pesa l'invenzione: 5 stravolge il capitolo, 7 impatta sull'intera ambientazione. Durata per quanto il mondo la tiene (7 per sempre). Area per dove vale.",
    "formule": [
      "inventare",
      "rivoluzionare"
    ]
  },
  {
    "id": "forces-5-non-essere-toccato-da-nessuna-energia",
    "name": "Non essere toccato da nessuna energia",
    "sphere": "forces",
    "level": 5,
    "extras": [],
    "text": "Fuoco, fulmine, urto, freddo, radiazioni: per la scena niente di quello che è energia ti tocca. Cammini nell'incendio e ne esci asciutto.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Far entrare l'invulnerabilità nella carne.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Far valere l'invulnerabilità anche per quello che porti addosso.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Non essere toccato nemmeno dall'energia fatta di Magick.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena, 4 per la sessione. Bersagli per la Cabala.",
    "formule": [
      "invulnerabilita"
    ]
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
      }
    ],
    "scopes": "Precisione (dettaglio) per andare a fondo: 1 l'auto, 3 la vite, 5 la lega. Precisione (informazione) per quanto pesa saperlo. Bersagli per più oggetti in un colpo.",
    "formule": [
      "sapere"
    ]
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
    "scopes": "Precisione (informazione) per quanto pesa nella trama quel che cerchi. Precisione (dettaglio) per una traccia sola fra tante. Durata 2 per leggere tutta la scena.",
    "formule": [
      "sapere"
    ]
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
    "scopes": "Bersagli per un banchetto intero. Precisione (dettaglio) per la sostanza esatta: 1 c'è veleno, 3 quale veleno, 5 quanto.",
    "formule": [
      "sapere"
    ]
  },
  {
    "id": "matter-1-vedere-dentro-un-oggetto-chiuso",
    "name": "Vedere dentro un oggetto chiuso",
    "sphere": "matter",
    "level": 1,
    "extras": [],
    "text": "La cassaforte, la scatola, il muro, la valigia: vedi cosa c'è dentro senza aprire, come se la materia si facesse di vetro per te.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Vedere anche cosa c'è di vivo dentro: la persona nel bagagliaio, il topo nel muro.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Vedere anche cosa ci passa dentro: la corrente, il calore.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Vedere se dentro c'è Magick.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Sapere chi ci ha messo quello che c'è.",
        "required": false
      }
    ],
    "scopes": "Precisione (dettaglio) per quanto a fondo: 1 c'è qualcosa, 3 cos'è, 5 il numero di serie. Bersagli per più contenitori. Durata 2 per la scena.",
    "formule": [
      "percepire"
    ]
  },
  {
    "id": "matter-1-trovare-un-oggetto",
    "name": "Trovare un oggetto",
    "sphere": "matter",
    "level": 1,
    "extras": [],
    "text": "Sai dove sta l'oggetto che cerchi: la chiave, l'arma, il metallo, la lega, e dove sta andando. Lo senti come si sente un peso nella stanza.",
    "pairings": [
      {
        "sphere": "correspondence",
        "text": "Trovarlo a qualunque distanza.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Sapere dov'era ieri e dove sarà domani.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Trovare una Meraviglia fra gli oggetti.",
        "required": false
      }
    ],
    "scopes": "Area per quanto cerchi: 1 la stanza, 3 il quartiere. Precisione (dettaglio) per l'oggetto esatto fra tanti. Durata 2 per tenere la traccia tutta la scena.",
    "formule": [
      "trovare"
    ]
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
    "scopes": "Area per quanta parete: 1 il muro, 2 la facciata. Durata 1 per la salita, 2 per la scena. Bersagli per chi sale con te.",
    "formule": [
      "mutare"
    ]
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
      }
    ],
    "scopes": "Potenza (danni) per quanto ferisce. Precisione (dettaglio) per il punto esatto: il cuore. Bersagli per più cadaveri.",
    "formule": [
      "danneggiare"
    ]
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
    "scopes": "Precisione (dettaglio) per la serratura difficile: 1 la porta di casa, 3 la cassaforte. Bersagli per più porte con la stessa chiave. Durata per quanto resta chiave: 1 per passare, 7 per sempre.",
    "formule": [
      "mutare"
    ]
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
        "sphere": "life",
        "text": "Caricare i proiettili di un veleno, un sedativo, un farmaco etc..",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sì che i proiettili non si inceppino mai.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più armi. Durata per quanto restano così (7 per sempre). Precisione (dettaglio) per la lega esatta.",
    "formule": [
      "mutare"
    ]
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
      }
    ],
    "scopes": "Potenza (peso) per quanto è grosso: 1 l'orologio, 3 l'auto, 5 la casa. Precisione (dettaglio) per il pezzo esatto. Bersagli per più cose.",
    "formule": [
      "riparare"
    ]
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
        "sphere": "time",
        "text": "Far agire il gas dopo: quando si siedono.",
        "required": false
      }
    ],
    "scopes": "Area per la stanza o il palazzo. Bersagli per chi respira aria buona. Condizioni (malus 3, addormentare) per quanto pesa. Durata 1 per un attimo di gas, 2 per la scena.",
    "formule": [
      "confondere"
    ]
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
      }
    ],
    "scopes": "Potenza (peso) per quanta sostanza: 1 lo zaino, 3 l'auto, 5 la casa. Precisione (dettaglio) per la sostanza esatta: 1 un metallo, 3 oro, 5 oro a ventiquattro carati. Durata per quanto resta (7 per sempre).",
    "formule": [
      "trasmutare"
    ]
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
        "sphere": "life",
        "text": "Alzare un muro vivo: radici, rami, edera etc..",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto muro: 3 due tonnellate, 5 una casa. Area per quanto è lungo: 1 la stanza, 2 il palazzo.",
    "formule": [
      "proteggere"
    ]
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
      }
    ],
    "scopes": "Bersagli per quanti scheletri. Durata per quanto camminano: 2 la scena, 4 la sessione. Condizioni 1 per l'ordine che eseguono: proteggi la porta. Potenza (danni) se colpiscono.",
    "formule": [
      "dominare"
    ]
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
      }
    ],
    "scopes": "Potenza (peso) per quanto vale la cosa che cambi: 1 lo zaino, 3 l'auto, 5 la casa. Bersagli per più cose. Durata se vuoi che finisca da sola (2 la scena); altrimenti resta finché non la disfi.",
    "formule": [
      "rallentare",
      "potenziare"
    ]
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
      }
    ],
    "scopes": "Potenza (peso) per quanto pesa: 1 lo zaino, 2 cento chili. Precisione (dettaglio) per quanto è fine: 1 un coltello, 3 una chiave precisa, 5 un meccanismo. Durata per quanto resta al mondo (7 per sempre).",
    "formule": [
      "creare"
    ]
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
        "sphere": "mind",
        "text": "Far sì che chi lo ripara non capisca mai cosa cercare.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto è grosso: 1 la pistola, 3 l'auto, 5 la centrale. Condizioni 1 per farlo scattare da solo: quando la impugna lui. Bersagli per più cose. Precisione (dettaglio) per il pezzo solo.",
    "formule": [
      "distruggere"
    ]
  },
  {
    "id": "matter-3-rendere-trasparente-o-invisibile-un-oggetto",
    "name": "Rendere trasparente o invisibile un oggetto",
    "sphere": "matter",
    "level": 3,
    "extras": [],
    "text": "La materia lascia passare la luce: il muro diventa una finestra, la porta sparisce alla vista restando porta, l'auto è un'ombra sull'asfalto.",
    "pairings": [
      {
        "sphere": "forces",
        "text": "Far passare anche il suono e il calore, non solo la luce.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far sì che nessuno si accorga che l'oggetto manca alla vista.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far guardare altrove chi potrebbe notare il vuoto.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Rendere trasparente anche quello che era vivo: il legno, il cuoio.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto è grosso: 1 la valigia, 3 l'auto, 5 la casa. Durata per quanto regge: 2 la scena, 4 la sessione. Precisione (dettaglio) per una parte sola: la porta, non il muro.",
    "formule": [
      "celare"
    ]
  },
  {
    "id": "matter-3-rimodellare",
    "name": "Rimodellare",
    "sphere": "matter",
    "level": 3,
    "extras": [],
    "text": "La serranda cola, la sbarra si piega, il muro si apre in una porta: plasmi la forma, la densità e lo stato di quello che tocchi. Ridurre una cosa a niente è un altro lavoro, e sta nell'Entropia.",
    "pairings": [
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
        "sphere": "prime",
        "text": "Rimodellare aggiungendo materia che non c'era.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far cedere da sola la parte che togli.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far tornare la cosa com'era quando decidi.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto rimodelli: 1 la serratura, 3 l'auto, 5 la casa. Precisione (dettaglio) per un lavoro fine: 3 la vite, 5 il meccanismo. Area per una parete intera.",
    "formule": [
      "trasformare"
    ]
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
    "scopes": "Bersagli per la Cabala. Potenza (danni) per quanto tolgono ai colpi. Durata solo se vuoi che finisca; altrimenti restano così finché non li disfi.",
    "formule": [
      "potenziare"
    ]
  },
  {
    "id": "matter-3-disfare-la-materia-che-un-altro-plasma",
    "name": "Disfare la materia che un altro plasma",
    "sphere": "matter",
    "level": 3,
    "extras": [],
    "text": "Mentre un altro mago plasma la materia, tu la tieni ferma: il suo muro non si alza, la sua chiave non prende forma. Si tira contro il suo lancio; vince chi ha più successi.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Far nascere stanco qualunque suo effetto, non solo quelli sulla materia.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far inceppare il suo lancio nel punto debole.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Far scaricare l'energia del suo lancio a vuoto.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) nel braccio di ferro. Durata 1 per un lancio, 2 per tutta la scena.",
    "formule": [
      "contrastare"
    ]
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
    "scopes": "Potenza (peso) per quanto è grossa: 1 la radio, 3 l'auto, 4 il tir. Precisione (dettaglio) per quanto è fine: 3 un motore, 5 un microchip. Durata per quanto resta al mondo (7 per sempre).",
    "formule": [
      "costruire"
    ]
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
    "scopes": "Durata 7: l'innesto resta. Potenza (epicità) per quanto pesa: 2 una placca, 5 un braccio nuovo. Precisione (dettaglio) per quanto è fine l'innesto.",
    "formule": [
      "costruire"
    ]
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
    "scopes": "Potenza (peso) per quanto è grosso: 5 una casa, 6 un grattacielo. Area per quanto rifai: 1 la stanza, 2 l'edificio. Precisione (dettaglio) per i particolari: 1 le pareti, 3 gli infissi, 5 i fregi.",
    "formule": [
      "trasformare"
    ]
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
      }
    ],
    "scopes": "Durata 7. Potenza (epicità) nel braccio di ferro con chi vuole aprire. Area per quanto sigilli: 1 la stanza, 2 l'edificio. Condizioni 1 se si apre per qualcuno: solo per te.",
    "formule": [
      "barriera"
    ]
  },
  {
    "id": "matter-4-far-inghiottire-dal-pavimento",
    "name": "Far inghiottire dal pavimento",
    "sphere": "matter",
    "level": 4,
    "extras": [],
    "text": "Il pavimento lo inghiotte fino alla vita, il metallo gli si chiude ai polsi, il muro gli cresce attorno: la materia lo tiene fermo finché non decidi tu.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Tenerlo fermo senza fargli male.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Fargli credere di non poter uscire anche quando potrebbe.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Liberarlo a un'ora precisa.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più persone. Durata 1 per un turno, 2 per la scena, 4 per la sessione. Condizioni (malus 4, inabilitare) per quanto lo tiene.",
    "formule": [
      "bloccare"
    ]
  },
  {
    "id": "matter-4-fabbricare-il-falso-perfetto",
    "name": "Fabbricare il falso perfetto",
    "sphere": "matter",
    "level": 4,
    "extras": [],
    "text": "Documenti, oggetti, opere: ogni perizia li dichiara veri, perché la materia è quella giusta fino all'ultima fibra. Non un'imitazione: una cosa vera, che non è mai esistita.",
    "pairings": [
      {
        "sphere": "time",
        "text": "Dare al falso l'età giusta: la carta ingiallita, la patina.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far ricordare a chi serve di averlo già visto.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far reggere il falso anche alla Magick che indaga.",
        "required": false
      }
    ],
    "scopes": "Precisione (dettaglio) per quanto è fine: 3 il documento, 5 il quadro. Potenza (epicità) per quanto pesa il falso nella storia. Durata 7.",
    "formule": [
      "simulare"
    ]
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
        "sphere": "time",
        "text": "Decidere se e come la lega invecchia.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) per quanto pesa l'invenzione: 5 stravolge il capitolo, 7 impatta sull'intera ambientazione. Potenza (peso) per quanta ne fai. Durata per quanto resta al mondo (7 per sempre).",
    "formule": [
      "inventare",
      "rivoluzionare"
    ]
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
        "sphere": "correspondence",
        "text": "Far valere il mutamento ovunque quella cosa vada.",
        "required": false
      }
    ],
    "scopes": "Durata 7, e basta. Potenza (epicità) per quanto pesa: 6 impatta sulla storia, 7 sull'intera ambientazione. Bersagli per più cose rese permanenti.",
    "formule": [
      "fissare"
    ]
  },
  {
    "id": "matter-5-annientare-una-sostanza",
    "name": "Annientare una sostanza",
    "sphere": "matter",
    "level": 5,
    "extras": [],
    "text": "Una sostanza smette di esistere in quel punto del mondo: l'acciaio della cassaforte, l'acqua del lago, l'aria della stanza. Non torna più, per nessuno.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Far tornare al nulla anche la Quintessenza che la teneva.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Annientare la sostanza in un luogo lontano.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sembrare l'annientamento un incidente.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanta sostanza: 3 l'auto, 5 la casa. Area per il punto del mondo. Durata 7, e basta.",
    "formule": [
      "annientare"
    ]
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
    "scopes": "Bersagli per più persone insieme. Durata 2 per tenere la lettura tutta la scena. Precisione (dettaglio) per un'emozione sola e precisa: 1 ha paura, 3 di cosa.",
    "formule": [
      "sapere"
    ]
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
    "scopes": "Precisione (dettaglio) per il pensiero esatto e non il rumore: 1 a cosa pensa, 3 il numero, 5 il ricordo sepolto. Precisione (informazione) per quanto pesa quel che cerchi. Bersagli per più teste. Durata 2 per restare in ascolto tutta la scena.",
    "formule": [
      "sapere"
    ]
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
    "scopes": "Area per quanto è grande la stanza: 1 la sala, 2 il palazzo, 3 il quartiere. Durata 2 per la scena. Precisione (dettaglio) per la testa da cui parte l'umore.",
    "formule": [
      "percepire"
    ]
  },
  {
    "id": "mind-1-riconoscere-il-sovrannaturale",
    "name": "Riconoscere il sovrannaturale",
    "sphere": "mind",
    "level": 1,
    "extras": [],
    "text": "L'aura dice cosa hai davanti: vampiro, mutaforma, posseduto, peggio. La Mente legge la mente e l'aura; per sapere cosa lo abita serve lo Spirito, per che corpo è la Vita.",
    "pairings": [
      {
        "sphere": "spirit",
        "text": "Sapere cosa lo abita, oltre che cosa pensa.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Sapere che corpo è, e quanto è lontano dal Modello umano.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Riconoscere anche un Risvegliato.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Sapere quanto è pericoloso, adesso.",
        "required": false
      }
    ],
    "scopes": "Bersagli per una stanza piena. Area per setacciare un luogo. Precisione (dettaglio) per la specie esatta: 1 non è umano, 3 cos'è, 5 quale clan, quale tribù.",
    "formule": [
      "sapere"
    ]
  },
  {
    "id": "mind-1-leggere-le-intenzioni",
    "name": "Leggere le intenzioni",
    "sphere": "mind",
    "level": 1,
    "extras": [],
    "text": "Sai cosa vuole fare chi hai davanti: se sta per sparare, per scappare, per mentire, per cedere. Le intenzioni, i desideri, la mossa che sta preparando.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "Sapere quanto è probabile che lo faccia davvero.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Sapere quando lo farà.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Leggere le intenzioni di chi pensa senza cervello.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più persone. Durata 2 per la scena. Precisione (dettaglio) per la mossa esatta.",
    "formule": [
      "prevedere"
    ]
  },
  {
    "id": "mind-1-trovare-una-persona",
    "name": "Trovare una persona",
    "sphere": "mind",
    "level": 1,
    "extras": [],
    "text": "Sai dove sta la persona che cerchi, e chi sta pensando a te: la mente la senti come una luce accesa nella città.",
    "pairings": [
      {
        "sphere": "correspondence",
        "text": "Trovarla a qualunque distanza.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Trovare anche un animale.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Trovare una mente senza cervello: lo spirito, il fantasma.",
        "required": false
      }
    ],
    "scopes": "Area per quanto cerchi: 2 il palazzo, 3 il quartiere, 4 la città. Precisione (dettaglio) per la persona esatta fra tante. Durata 2 per tenere la traccia.",
    "formule": [
      "trovare"
    ]
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
        "sphere": "life",
        "text": "Blindare anche il ricordo del corpo: il gesto imparato, il riflesso.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto resta blindato (7 per sempre). Bersagli per più ricordi o più teste. Condizioni 1 per la chiave che lo apre: solo tu, solo con quella parola.",
    "formule": [
      "proteggere"
    ]
  },
  {
    "id": "mind-2-mandare-un-pensiero",
    "name": "Mandare un pensiero",
    "sphere": "mind",
    "level": 2,
    "extras": [],
    "text": "Una parola, un'immagine, un'urgenza arrivano nella testa di un altro, a senso unico: lui sente, non risponde. Il dialogo intero è il terzo pallino.",
    "pairings": [
      {
        "sphere": "spirit",
        "text": "Mandare il pensiero a chi pensa senza cervello.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Mandare il pensiero a un animale.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Far arrivare il pensiero anche a una macchina: la radio, il telefono.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far arrivare il pensiero nel momento in cui serve.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più teste. Portata per la distanza. Precisione (dettaglio) per un pensiero esatto e non vago.",
    "formule": [
      "comunicare"
    ]
  },
  {
    "id": "mind-2-impiantare-un-illusione-mentale",
    "name": "Impiantare un'illusione mentale",
    "sphere": "mind",
    "level": 2,
    "extras": [],
    "text": "Scrivi in una testa una cosa che non c'è: la vede, la sente, la tocca, solo lui. Nessuna telecamera la riprende. Se deve ferire, è il terzo pallino. Scriverla in venti teste nello stesso istante è uno strappo: Volgare, senza le Forze.",
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
        "sphere": "time",
        "text": "Impiantare l'illusione di un momento passato: lo rivive.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più teste. Durata 1 per un attimo, 2 per la scena. Precisione (dettaglio) per i particolari: 1 una sagoma, 3 un volto, 5 un documento leggibile. Potenza (danni) se ferisce, dal terzo pallino.",
    "formule": [
      "ingannare",
      "creare"
    ]
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
    "scopes": "Durata 2 per la scena, 4 per la sessione. Bersagli per la Cabala. Area per un luogo intero: nessuno ricorda chi è passato.",
    "formule": [
      "celare"
    ]
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
    "scopes": "Bersagli per più persone. Area per una folla intera. Durata 1 per un attimo, 2 per la scena. Condizioni (malus 1, distrarre) se l'umore serve a distrarlo. Potenza (epicità) per quanto pesa: 1 un dettaglio, 3 stravolge la scena.",
    "formule": [
      "suggestionare",
      "spegnere"
    ]
  },
  {
    "id": "mind-2-risanare-la-tua-volonta",
    "name": "Risanare la tua Volontà",
    "sphere": "mind",
    "level": 2,
    "extras": [],
    "text": "Ripari la tua mente lacerata: torna l'Areté più il numero della Potenza (danni); gli Aggravati chiedono anche una Quintessenza ciascuno. Su un altro è il terzo pallino.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Risanare insieme il corpo: la fatica, il tremore etc..",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Pagare gli Aggravati con la Quintessenza del luogo.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Tornare a com'eri prima del trauma.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sì che la crepa non si riapra lì.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanta Volontà torna.",
    "formule": [
      "riparare"
    ]
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
        "sphere": "life",
        "text": "Schermare anche il corpo: niente sudore, niente battito che ti tradisce.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena, 4 per la sessione, 7 per sempre. Bersagli per la Cabala. Potenza (epicità) nel braccio di ferro con chi legge.",
    "formule": [
      "proteggere"
    ]
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
    "scopes": "Bersagli per più teste. Durata per quanto resta (7 per sempre). Condizioni 1 per quando affiora: quando vede la moglie. Precisione (dettaglio) per un'idea esatta e non vaga.",
    "formule": [
      "suggestionare",
      "creare"
    ]
  },
  {
    "id": "mind-2-far-perdere-il-filo",
    "name": "Far perdere il filo",
    "sphere": "mind",
    "level": 2,
    "extras": [],
    "text": "La paura che sale, il pensiero che si spezza, il nome che non torna: chi colpisci perde il filo di quello che stava facendo.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Far perdere il filo anche al corpo: la mano trema, il passo sbaglia.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Fargli perdere il filo nel momento peggiore.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Far arrivare la confusione come luce negli occhi, frastuono.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più persone. Durata 1 per un turno, 2 per la scena. Condizioni (malus 1, distrarre) per quanto pesa.",
    "formule": [
      "confondere"
    ]
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
      }
    ],
    "scopes": "Bersagli per più persone. Area per una sala intera. Durata 1 per un turno, 2 per la scena. Condizioni (malus 3, addormentare) per quanto è profondo il sonno.",
    "formule": [
      "bloccare"
    ]
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
    "scopes": "Potenza (danni) per quanto ferisce. Bersagli per più menti. Condizioni (malus 4, stordire) per lasciarlo stordito.",
    "formule": [
      "danneggiare"
    ]
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
    "scopes": "Bersagli per più dormienti insieme. Durata 2 per la notte. Precisione (dettaglio) per il sogno esatto. Condizioni 1 per legarlo: solo quando sogna lei.",
    "formule": [
      "condizionare"
    ]
  },
  {
    "id": "mind-3-impiantare-un-illusione-che-ferisce",
    "name": "Impiantare un'illusione che ferisce",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "L'illusione scritta nella sua testa fa male davvero: il fuoco che non c'è brucia, la lama che non c'è taglia, e il corpo ci crede. Il danno è Superficiale; per gli Aggravati serve la Vita.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Far ferire il corpo per davvero: danni Aggravati.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Fare l'illusione di luce e suono veri: la vedono tutti, e brucia lo stesso.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Ferire con l'illusione chi pensa senza cervello.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto ferisce. Bersagli per più teste. Durata 1 per un colpo, 2 per la scena.",
    "formule": [
      "danneggiare"
    ]
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
    "scopes": "Bersagli per quanti sono. Durata 2 per la scena, 4 per la sessione. Portata per quanto lontano regge il legame.",
    "formule": [
      "vincolare"
    ]
  },
  {
    "id": "mind-3-risanare-la-volonta",
    "name": "Risanare la Volontà",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "Ripari una mente lacerata: torna l'Areté più il numero della Potenza (danni); gli Aggravati chiedono anche una Quintessenza ciascuno. La tua chiede solo il secondo pallino.",
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
    "scopes": "Potenza (danni) per quanta Volontà torna. Bersagli per più menti.",
    "formule": [
      "guarire"
    ]
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
    "scopes": "Bersagli per più bocche. Durata 1 per una domanda, 2 per l'interrogatorio. Precisione (informazione) per quanto pesa quel che deve dire. Condizioni 1 se parla solo con te.",
    "formule": [
      "condizionare"
    ]
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
    "scopes": "Bersagli per più interlocutori. Durata 1 per una frase, 2 per la scena. Portata per la distanza. Condizioni 1 se parla solo lui a te.",
    "formule": [
      "comunicare"
    ]
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
      }
    ],
    "scopes": "Durata 2 per la scena, 4 per la sessione. Bersagli per far capire anche ai compagni. Precisione (dettaglio) per la sfumatura: 1 il senso, 3 le parole, 5 il tono e le allusioni.",
    "formule": [
      "comunicare"
    ]
  },
  {
    "id": "mind-3-spezzare-l-illusione-di-un-altro",
    "name": "Spezzare l'illusione di un altro",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "Mentre un altro mago scrive un'illusione, un ordine o una lettura, tu glielo spezzi in testa: il suo effetto non prende. Si tira contro il suo lancio; vince chi ha più successi.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Far nascere stanco qualunque suo effetto, non solo quelli sulla mente.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far inceppare il suo lancio nel punto debole.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Spezzare anche quello che scrive in uno spirito.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) nel braccio di ferro. Durata 1 per un lancio, 2 per tutta la scena. Bersagli per proteggere più teste.",
    "formule": [
      "contrastare"
    ]
  },
  {
    "id": "mind-3-non-far-presa-alle-suggestioni",
    "name": "Non far presa alle suggestioni",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "Suggestioni, letture, ordini: quello che entra nella tua testa da fuori non fa presa. La tua mente resta tua.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Respingere anche la Magick che li porta.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Non far presa nemmeno agli spiriti che sussurrano.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Non far presa nemmeno alla chimica: le droghe, il sonno indotto.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena, 4 per la sessione, 7 per sempre. Bersagli per proteggere altri.",
    "formule": [
      "resistere"
    ]
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
        "sphere": "prime",
        "text": "Far valere l'ordine anche contro la Magick che lo protegge.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più persone. Durata 1 per un ordine, 2 per la scena, 4 per la sessione. Condizioni 1 per ogni clausola dell'ordine. Potenza (epicità) per quanto pesa l'ordine: 1 un dettaglio, 4 impatta sul capitolo.",
    "formule": [
      "dominare"
    ]
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
        "sphere": "entropy",
        "text": "Far arrivare la facoltà quando serve.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto resta (7 per sempre). Bersagli per più persone. Potenza (epicità) per quanto pesa la facoltà: 2 un talento, 5 un genio.",
    "formule": [
      "potenziare"
    ]
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
        "sphere": "entropy",
        "text": "Fargli trovare il compito da solo, e non finirlo mai.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più persone. Durata 1 per un turno, 2 per la scena. Condizioni (malus 4, inabilitare) per quanto pesa: 4 non agisce, 7 non gioca.",
    "formule": [
      "bloccare"
    ]
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
    "scopes": "Durata 2 per la scena. Portata per quanto lontano ti mostri. Precisione (dettaglio) per quanto sei nitido: 1 una luce, 3 la tua faccia.",
    "formule": [
      "varcare"
    ]
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
    "scopes": "Bersagli per più teste. Durata per quanto regge la riscrittura (7 per sempre). Precisione (dettaglio) per un ricordo solo e preciso: 1 la serata, 3 un volto, 5 una frase. Potenza (epicità) per quanto pesa: 2 una serata, 5 un anno di vita.",
    "formule": [
      "cancellare"
    ]
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
    "scopes": "Condizioni 1 per la parola o l'evento che lo sveglia, e Complessità per quanto è lungo l'ordine. Durata (fuori gioco) per quanto resta dormiente: 3 il mese, 5 l'anno. Bersagli per più persone.",
    "formule": [
      "possedere"
    ]
  },
  {
    "id": "mind-4-risanare-una-mente-lacerata",
    "name": "Risanare una mente lacerata",
    "sphere": "mind",
    "level": 4,
    "extras": [],
    "text": "Una Volontà a pezzi, una personalità riscritta da altri, un trauma che nessuna cura scioglie: riporti la mente a com'era, intera.",
    "pairings": [
      {
        "sphere": "time",
        "text": "Riportare la mente a prima che fosse toccata.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Risanare anche l'anima insieme alla mente.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Disfare la Magick di chi l'ha riscritta.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanta Volontà torna. Durata 7 perché resti. Bersagli per più menti.",
    "formule": [
      "risanare"
    ]
  },
  {
    "id": "mind-4-costruire-un-identita-falsa",
    "name": "Costruire un'identità falsa",
    "sphere": "mind",
    "level": 4,
    "extras": [],
    "text": "Un'identità, una scena vissuta da tutti: chi la controlla la trova vera in ogni testa che interroga. La persona che non esiste ha amici che la ricordano.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Far esistere anche i documenti e le foto.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far tornare i conti anche alle coincidenze.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far esistere l'identità anche nel passato.",
        "required": false
      }
    ],
    "scopes": "Bersagli per quante teste la ricordano. Potenza (epicità) per quanto pesa. Durata per quanto regge (7 per sempre).",
    "formule": [
      "simulare"
    ]
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
        "sphere": "life",
        "text": "Accendere un vivente senza cervello: la pianta, la muffa, lo sciame etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Dare alla coscienza nuova un'anima, e un posto nell'Umbra.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto resta sveglia (7 per sempre). Potenza (epicità) per quanto pesa: 4 impatta sul capitolo, 7 sull'intera ambientazione. Precisione (dettaglio) per quanto è fine l'intelletto: 1 un cane, 3 un bambino, 5 un genio.",
    "formule": [
      "inventare"
    ]
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
        "sphere": "prime",
        "text": "Far reggere la personalità nuova contro qualunque Magick.",
        "required": false
      }
    ],
    "scopes": "Durata 7. Potenza (epicità) per quanto pesa: 5 stravolge il capitolo, 7 sull'intera ambientazione. Bersagli per più persone. Precisione (dettaglio) per un tratto solo o la persona intera.",
    "formule": [
      "trasmutare"
    ]
  },
  {
    "id": "mind-5-nessuna-mente-ti-tocca",
    "name": "Nessuna mente ti tocca",
    "sphere": "mind",
    "level": 5,
    "extras": [],
    "text": "Per la scena nessuna mente altrui ti entra dentro: niente letture, niente ordini, niente illusioni, niente suggestioni. Nemmeno le più alte.",
    "pairings": [
      {
        "sphere": "spirit",
        "text": "Non farti toccare nemmeno dagli spiriti.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Non farti toccare nemmeno dalla Magick sulla mente.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Non farti toccare nemmeno dalla chimica.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena, 4 per la sessione. Bersagli per la Cabala.",
    "formule": [
      "invulnerabilita"
    ]
  },
  {
    "id": "prime-1-percepire-la-magia",
    "name": "Percepire la magia",
    "sphere": "prime",
    "level": 1,
    "extras": [],
    "text": "Senti la Magick attorno a te: l'incantesimo ancora caldo, la firma di chi ha lanciato, l'oggetto che porta un effetto addosso. Con più successi sai cosa fa e chi l'ha fatto.",
    "pairings": [
      {
        "sphere": "time",
        "text": "Sapere quando è stata lanciata, e cosa c'era prima.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Sapere quando l'incantesimo cederà.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Sapere cosa voleva chi ha lanciato.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Percepire la Magick che viene dall'Umbra.",
        "required": false
      }
    ],
    "scopes": "Area per setacciare un luogo intero: 1 la stanza, 2 il palazzo. Precisione (dettaglio) per un incantesimo solo fra tanti. Precisione (informazione) per quanto pesa saperlo. Durata 2 per tenere i sensi accesi tutta la scena.",
    "formule": [
      "percepire"
    ]
  },
  {
    "id": "prime-1-vedere-quanto-e-carico",
    "name": "Vedere quanto è carico",
    "sphere": "prime",
    "level": 1,
    "extras": [],
    "text": "Sai quanta Quintessenza resta a un Nodo, a una Meraviglia, a un mago: quanto brucia, non come sta.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "Sapere quando finirà.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Sapere quanto ne aveva ieri, e quanto ne avrà domani.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Vedere la carica di uno spirito o di un luogo dell'Umbra.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Vedere la carica dentro un oggetto che non sembra una Meraviglia.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più Ruote insieme. Precisione (dettaglio) per la cifra esatta.",
    "formule": [
      "sapere"
    ]
  },
  {
    "id": "prime-1-consacrare-un-oggetto",
    "name": "Consacrare un oggetto",
    "sphere": "prime",
    "level": 1,
    "extras": [],
    "text": "Leghi un oggetto a te: ti segue in ogni trasformazione, non lo perdi quando cambi forma o luogo, e la tua Magick lo riconosce come parte di te.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Consacrare anche un oggetto grande: l'auto, l'armatura, la casa etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Consacrare un vivente: il cane, il cavallo, il famiglio etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Far seguire l'oggetto anche quando ti sposti nello spazio.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far seguire l'oggetto anche nel tempo.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto resta consacrato (7 per sempre). Bersagli per più oggetti. Potenza (peso) se è grosso.",
    "formule": [
      "vincolare"
    ]
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
    "text": "L'alone dei vivi si accende ai tuoi occhi: più forte la vita, più brilla. Serve la Vita: da solo il Primordio vede la Quintessenza, non la salute.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Vedere l'alone dei vivi.",
        "required": true
      },
      {
        "sphere": "mind",
        "text": "Leggere nell'aura anche l'umore.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Leggere l'aura degli spiriti e dei morti.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Vedere nell'aura quanto gli resta.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più persone. Area per una folla. Durata 2 per la scena.",
    "formule": [
      "percepire"
    ]
  },
  {
    "id": "prime-1-vedere-l-avatar",
    "name": "Vedere l'Avatar",
    "sphere": "prime",
    "level": 1,
    "extras": [
      {
        "sphere": "spirit",
        "level": 1,
        "required": true
      }
    ],
    "text": "Vedi la scintilla che rende Risvegliato un Risvegliato: forma, colore, e quanto è sveglia. Serve lo Spirito: da solo il Primordio vede la Ruota e la firma, non la scintilla.",
    "pairings": [
      {
        "sphere": "spirit",
        "text": "Vedere la scintilla oltre il Velo.",
        "required": true
      },
      {
        "sphere": "mind",
        "text": "Sapere cosa vuole l'Avatar da lui.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Vedere com'era l'Avatar prima del Risveglio, e dove sta andando.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Sapere quando l'Avatar si farà sentire.",
        "required": false
      }
    ],
    "scopes": "Precisione (dettaglio) per quanto a fondo: 1 la forma, 3 il colore e la natura, 5 cosa gli chiede. Bersagli per più Risvegliati.",
    "formule": [
      "sapere"
    ]
  },
  {
    "id": "prime-1-trovare-la-magick",
    "name": "Trovare la Magick",
    "sphere": "prime",
    "level": 1,
    "extras": [],
    "text": "Sai dove sta un effetto di Magick, una reliquia, un Risvegliato, un Nodo: la Quintessenza la senti come si sente il calore.",
    "pairings": [
      {
        "sphere": "correspondence",
        "text": "Trovarla a qualunque distanza.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Trovare anche la Magick di là.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Sapere dov'era ieri.",
        "required": false
      }
    ],
    "scopes": "Area per quanto cerchi: 2 il palazzo, 3 il quartiere, 4 la città. Precisione (dettaglio) per l'effetto esatto fra tanti. Durata 2 per tenere la traccia.",
    "formule": [
      "trovare"
    ]
  },
  {
    "id": "prime-2-bruciare-l-attrito-in-anticipo",
    "name": "Bruciare l'attrito in anticipo",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "Spendi Quintessenza e togli Paradosso dalla Ruota quando decidi tu, prima che il conto arrivi.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "Scegliere quale punto di Paradosso brucia per primo: quello che stava per scoppiare.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Bruciare l'attrito prima che il lancio lo generi.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Scaricare l'attrito nell'Umbra, dove nessuno lo raccoglie.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto Paradosso togli. Bersagli per più Ruote.",
    "formule": [
      "proteggere"
    ]
  },
  {
    "id": "prime-2-creare-dal-nulla",
    "name": "Creare dal nulla",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "Porti la materia prima; la Sfera del Modello dà la forma, e quello che nasce è una cosa vera, che il mondo archivia. Senza una compagna nasce grezzo, e il grezzo ha sempre un testimone.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Creare un oggetto: il muro, il coltello, la chiave etc..",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Creare energia: il fuoco, il fulmine, la luce etc..",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Creare carne: il cibo, l'organo, l'animale etc..",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Creare un'idea, una facoltà, un ricordo etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Creare un'effimera, uno spirito minore etc..",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Creare spazio: la stanza che non c'era.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Creare tempo: l'ora in più.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Creare fortuna che non manca a nessuno.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso o epicità) per quanto crei: 1 lo zaino, 3 l'auto, 5 la casa. Durata per quanto resta al mondo (7 per sempre). Precisione (dettaglio) per quanto è fine.",
    "formule": [
      "creare"
    ]
  },
  {
    "id": "prime-2-creare-grezzo",
    "name": "Creare grezzo",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "Energia grezza, senza forma: brilla, morde, e si spegne quando molli la presa. Non somiglia a niente che il mondo conosca: Volgare con Testimoni, sempre, +2 di Paradosso prima di tirare.",
    "pairings": [
      {
        "sphere": "forces",
        "text": "Dare al grezzo una direzione: il dardo, la lama, il muro di luce etc..",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Dare al grezzo un corpo che resta.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far colpire il grezzo dove fa più male.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto morde. Durata 1 per un turno, 2 per la scena, finché lo tieni. Area per quanto è largo.",
    "formule": [
      "creare"
    ]
  },
  {
    "id": "prime-2-destabilizzare-un-modello",
    "name": "Destabilizzare un Modello",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "Scuoti la trama stessa del bersaglio: danno diretto al Modello delle cose, che siano carne, pietra o spirito. Non passi per la Sfera del bersaglio: colpisci ciò che lo fa esistere.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Far arrivare il danno per le vie del corpo, e restare spiegabile.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Destabilizzare un oggetto: si sfalda senza motivo apparente.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Destabilizzare uno spirito o una Meraviglia.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Destabilizzare una mente: la Volontà cede.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Colpire dove il Modello è già stanco.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto ferisce. Bersagli per più Modelli. Precisione (dettaglio) per il punto del Modello che colpisci.",
    "formule": [
      "danneggiare"
    ]
  },
  {
    "id": "prime-2-forgiare-costrutti-di-pura-energia",
    "name": "Forgiare costrutti di pura energia",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "Dardi e lame di luce, scudi, corde: costrutti che reggono finché la Quintessenza regge. Quando la Ruota si svuota, buio.",
    "pairings": [
      {
        "sphere": "forces",
        "text": "Far durare i costrutti senza bere dalla Ruota: l'energia del mondo li alimenta.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Dare ai costrutti un corpo solido: la lama pesa e taglia come una lama.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far vedere i costrutti solo a chi decidi.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Far mordere i costrutti anche gli spiriti.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto ferisce. Durata 1 per lo scontro, 2 per la scena. Bersagli per armare la Cabala. Precisione (dettaglio) per la forma esatta.",
    "formule": [
      "creare"
    ]
  },
  {
    "id": "prime-2-incantare-un-arma",
    "name": "Incantare un'arma",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "Metti Quintessenza nel filo della lama o nella canna: danni Aggravati, e morde anche gli spiriti.",
    "pairings": [
      {
        "sphere": "forces",
        "text": "Far portare all'arma anche un'energia: brucia, folgora etc..",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Far restare l'incanto nell'arma anche senza di te.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Far ferire l'arma nell'Umbra come nel mondo.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far trovare all'arma il punto debole.",
        "required": false
      }
    ],
    "scopes": "Durata 1 per lo scontro, 2 per la scena, 7 per sempre. Bersagli per più armi. Potenza (danni) per quanto aggiunge.",
    "formule": [
      "potenziare"
    ]
  },
  {
    "id": "prime-2-mascherare-la-tua-aura",
    "name": "Mascherare la tua aura",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "La tua firma si spegne o mente: per i sensi mistici sei un altro, o non sei nessuno. Vale contro chi percepisce la magia, legge le aure o cerca la tua Ruota.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Mascherare anche l'umore e i pensieri in superficie.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Mascherare anche l'alone della vita: sembri malato, o morto.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far leggere a chi ci prova l'aura sbagliata.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena, 4 per la sessione. Bersagli per la Cabala. Precisione (dettaglio) per un'aura precisa da imitare.",
    "formule": [
      "celare"
    ]
  },
  {
    "id": "prime-3-assorbire-e-incanalare",
    "name": "Assorbire e incanalare",
    "sphere": "prime",
    "level": 3,
    "extras": [],
    "text": "Prendi Quintessenza da dove sta, Nodi, Meraviglie, incantesimi altrui, e la porti nella tua Ruota, o dove serve.",
    "pairings": [
      {
        "sphere": "spirit",
        "text": "Assorbire dall'Umbra e dagli spiriti.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Assorbire da una Meraviglia e lasciarla intera.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Assorbire senza che il Nodo si accorga di essere stato bevuto.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Assorbire la Quintessenza che passava di lì ieri.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanta ne prendi. Portata per la distanza. Durata 2 per tenere aperto il flusso.",
    "formule": [
      "spostare"
    ]
  },
  {
    "id": "prime-3-ricaricare-una-meraviglia",
    "name": "Ricaricare una Meraviglia",
    "sphere": "prime",
    "level": 3,
    "extras": [],
    "text": "La Quintessenza entra nell'oggetto incantato e lo riempie: il talismano torna a funzionare, il Feticcio riprende fiato.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Ricaricare anche una Meraviglia rotta, riparandola insieme.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Ricaricare un Feticcio nutrendo lo spirito dentro.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Ricaricare con l'energia del mondo invece che con la Ruota.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far durare la carica più del dovuto.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanta Quintessenza entra. Bersagli per più Meraviglie. Portata per ricaricare quella lontana.",
    "formule": [
      "riparare"
    ]
  },
  {
    "id": "prime-3-travasare-a-un-altro-mago",
    "name": "Travasare a un altro mago",
    "sphere": "prime",
    "level": 3,
    "extras": [],
    "text": "La tua energia entra nella sua Ruota, se lì c'è posto: Quintessenza che passa da te a lui.",
    "pairings": [
      {
        "sphere": "spirit",
        "text": "Travasare a uno spirito, o riceverne.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Travasare anche la salute insieme alla Quintessenza.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Travasare anche la Volontà.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanta ne passa. Bersagli per più Ruote. Portata per la distanza.",
    "formule": [
      "spostare"
    ]
  },
  {
    "id": "prime-3-far-nascere-stanca-la-magick-di-un-altro",
    "name": "Far nascere stanca la Magick di un altro",
    "sphere": "prime",
    "level": 3,
    "extras": [],
    "text": "Mentre un altro mago lancia, tu gli togli la Quintessenza da sotto: il suo effetto nasce stanco, qualunque Sfera usi. Si tira contro il suo lancio; vince chi ha più successi.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "Far inceppare il suo lancio nel punto debole.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Fargli credere che il lancio sia riuscito.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Far nascere stanca anche la Magick lanciata di là.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) nel braccio di ferro. Durata 1 per un lancio, 2 per tutta la scena.",
    "formule": [
      "contrastare"
    ]
  },
  {
    "id": "prime-4-deviare-il-contraccolpo",
    "name": "Deviare il Contraccolpo",
    "sphere": "prime",
    "level": 4,
    "extras": [],
    "text": "Quando il Paradosso arriva lo attutisci, lo assorbi in Quintessenza, o lo trasli su un altro.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "Far cadere il Contraccolpo su chi se lo meritava.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Rimandare il Contraccolpo a dopo.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Scaricare il Contraccolpo in un oggetto: si rompe lui.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Scaricare il Contraccolpo nell'Umbra.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto Contraccolpo devii. Bersagli per proteggere la Cabala. Condizioni 1 se scatta da solo: ogni volta che scoppia.",
    "formule": [
      "proteggere"
    ]
  },
  {
    "id": "prime-4-drenare-un-nodo",
    "name": "Drenare un Nodo",
    "sphere": "prime",
    "level": 4,
    "extras": [],
    "text": "Strappi la sorgente: la Quintessenza del Nodo passa a te, tutta, e il luogo appassisce.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Drenare il Nodo in una Meraviglia invece che nella Ruota.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far appassire il Nodo come un incidente.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Drenare il Nodo piano, in un mese, senza che nessuno se ne accorga.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Drenare anche la parte del Nodo che sta nell'Umbra.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanta ne prendi. Portata per la distanza. Durata per quanto resta drenato (7 per sempre).",
    "formule": [
      "drenare"
    ]
  },
  {
    "id": "prime-4-drenare-una-creatura",
    "name": "Drenare una creatura",
    "sphere": "prime",
    "level": 4,
    "extras": [],
    "text": "L'energia esce da ciò che la portava: il vampiro, lo spirito, il lupo, il mago. Serve la Sfera del bersaglio, che dice da dove esce. Sui viventi lascia Macchie.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Drenare un vivente o un vampiro.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Drenare uno spirito o un fantasma.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Drenare la Volontà insieme.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Drenare una Meraviglia o un Feticcio.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Drenare senza che se ne accorga finché non è tardi.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanta ne prendi. Bersagli per più creature. Durata 2 per tenere aperto il drenaggio.",
    "formule": [
      "drenare"
    ]
  },
  {
    "id": "prime-4-levare-un-campo-di-negazione",
    "name": "Levare un campo di negazione",
    "sphere": "prime",
    "level": 4,
    "extras": [],
    "text": "Nell'area la Magick altrui nasce già stanca: ogni effetto si smorza, ogni lancio perde successi.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Legare il campo a un oggetto: la stanza è protetta finché c'è la pietra.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far lavorare il campo solo contro chi vuoi tu.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Far seguire il campo a chi lo porta.",
        "required": false
      }
    ],
    "scopes": "Area per il perimetro: 1 la stanza, 2 l'edificio, 3 il quartiere. Durata per quanto regge. Condizioni 1 per chi è esente: i tuoi. Potenza (epicità) per quanto smorza.",
    "formule": [
      "barriera",
      "contrastare"
    ]
  },
  {
    "id": "prime-4-spegnere-una-meraviglia",
    "name": "Spegnere una Meraviglia",
    "sphere": "prime",
    "level": 4,
    "extras": [],
    "text": "Le togli la carica: l'oggetto resta, e smette di essere speciale.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Spegnere la Meraviglia e lasciare l'oggetto intatto, o romperlo insieme.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Spegnere un Feticcio: lo spirito se ne va.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) nel braccio di ferro con chi l'ha tessuta. Bersagli per più Meraviglie. Durata per quanto resta spenta (7 per sempre).",
    "formule": [
      "cancellare"
    ]
  },
  {
    "id": "prime-5-creare-un-nodo",
    "name": "Creare un Nodo",
    "sphere": "prime",
    "level": 5,
    "extras": [],
    "text": "Una sorgente nuova nel mondo, dove prima il mondo era ordinario: da lì in poi la Quintessenza sgorga.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Legare il Nodo a un oggetto: la pietra, la fontana, l'albero etc..",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Nascondere il Nodo alla sorte: nessuno lo trova per caso.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Legare il Nodo a un luogo che si sposta.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) per quanto è forte il Nodo: 4 impatta sul capitolo, 6 impatta sulla storia. Durata 7. Area per quanto è largo.",
    "formule": [
      "inventare"
    ]
  },
  {
    "id": "prime-5-produrre-quintessenza",
    "name": "Produrre Quintessenza",
    "sphere": "prime",
    "level": 5,
    "extras": [],
    "text": "La fai nascere dove non ce n'era: il gesto che nessuna spesa e nessun furto sostituiscono.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Farla nascere in un vivente.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Farla nascere dentro un oggetto: la Meraviglia si ricarica.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanta ne produci. Bersagli per più Ruote. Durata per quanto continua a nascere.",
    "formule": [
      "inventare"
    ]
  },
  {
    "id": "prime-5-radicare-un-incantesimo-per-sempre",
    "name": "Radicare un incantesimo per sempre",
    "sphere": "prime",
    "level": 5,
    "extras": [],
    "text": "L'effetto entra nell'Arazzo e smette di dipendere da te: non decade, non si mantiene, non conta fra le tue Magick in atto.",
    "pairings": [
      {
        "sphere": "time",
        "text": "Far sì che l'effetto sia sempre stato lì.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sì che nessuna sorte lo consumi.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Radicare l'effetto ovunque si sposti il bersaglio.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far sì che nessuno ricordi che una volta era diverso.",
        "required": false
      }
    ],
    "scopes": "Durata 7, e basta. Potenza (epicità) per quanto pesa l'effetto radicato.",
    "formule": [
      "fissare"
    ]
  },
  {
    "id": "prime-5-rifiutare-il-contraccolpo",
    "name": "Rifiutare il Contraccolpo",
    "sphere": "prime",
    "level": 5,
    "extras": [],
    "text": "Sai con cosa hanno costruito il Paradosso, e puoi dirgli di no: quando scoppia, non ti tocca.",
    "pairings": [
      {
        "sphere": "spirit",
        "text": "Rifiutare anche gli spiriti del Paradosso.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Rifiutare il Contraccolpo prima che scoppi.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far cadere il Contraccolpo rifiutato su chi vuoi tu.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena, 4 per la sessione. Bersagli per la Cabala. Condizioni 1 se vale solo per un tipo di Magick.",
    "formule": [
      "invulnerabilita"
    ]
  },
  {
    "id": "prime-5-chiudere-un-nodo-per-sempre",
    "name": "Chiudere un Nodo per sempre",
    "sphere": "prime",
    "level": 5,
    "extras": [],
    "text": "Il Nodo smette di esistere fino alla radice: dove sgorgava Quintessenza resta terra qualunque, e nessuna Magick lo riapre.",
    "pairings": [
      {
        "sphere": "spirit",
        "text": "Chiudere anche la parte del Nodo che sta nell'Umbra.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Chiudere il Nodo da lontano.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sembrare la chiusura un caso.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità): 6 impatta sulla storia. Durata 7, e basta.",
    "formule": [
      "annientare"
    ]
  },
  {
    "id": "spirit-1-vedere-oltre-il-velo",
    "name": "Vedere oltre il Velo",
    "sphere": "spirit",
    "level": 1,
    "extras": [],
    "text": "Vedi la Penumbra, il riflesso di là di ciò che hai davanti: lo spessore della parete in quel punto, le cariche mistiche negli oggetti, chi sta dall'altra parte a guardare.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Vedere quanta Quintessenza corre di là.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Sapere cosa vuole chi sta di là a guardare.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Vedere com'era la Penumbra ieri.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Sapere dove il Velo sta per cedere.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per tenere la vista aperta tutta la scena. Area per un luogo intero. Precisione (dettaglio) per un punto solo della parete.",
    "formule": [
      "percepire"
    ]
  },
  {
    "id": "spirit-1-sapere-cosa-e-morto-qui",
    "name": "Sapere cosa è morto qui",
    "sphere": "spirit",
    "level": 1,
    "extras": [],
    "text": "Il luogo racconta chi se n'è andato, quando, e se è rimasto qualcosa: la morte lascia un segno di là, e tu lo leggi.",
    "pairings": [
      {
        "sphere": "time",
        "text": "Avere la data, e vedere la scena della morte.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Sapere di cosa è morto.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Sapere cosa pensava mentre moriva.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Sapere se la morte era scritta o costruita.",
        "required": false
      }
    ],
    "scopes": "Area per un luogo intero: 1 la stanza, 2 il palazzo, 3 il quartiere. Precisione (informazione) per quanto pesa saperlo. Precisione (dettaglio) per una morte sola fra tante.",
    "formule": [
      "sapere"
    ]
  },
  {
    "id": "spirit-1-leggere-l-anima",
    "name": "Leggere l'anima",
    "sphere": "spirit",
    "level": 1,
    "extras": [],
    "text": "Sai quanto è integra una persona, cosa si porta addosso e da quanto tempo: le Macchie, i patti, i vincoli che le stanno cuciti sull'anima.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Leggere l'anima di un vivo attraverso il corpo che la ospita.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Sapere cosa ne pensa lui, di quello che porta.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Vedere l'Avatar dietro l'anima.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Sapere quando ogni Macchia è arrivata.",
        "required": false
      }
    ],
    "scopes": "Precisione (dettaglio) per quanto a fondo: 1 se è integra, 3 cosa porta, 5 chi glielo ha messo. Bersagli per più anime. Durata 2 per la scena.",
    "formule": [
      "sapere"
    ]
  },
  {
    "id": "spirit-1-leggere-la-geografia-di-la",
    "name": "Leggere la geografia di là",
    "sphere": "spirit",
    "level": 1,
    "extras": [],
    "text": "Hai la mappa dell'altro lato in quel punto: dove si passa, dove porta, chi comanda, cosa ci vive.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Sapere cosa vogliono quelli che comandano.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Sapere com'era la mappa un secolo fa, e come cambierà.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Sapere dove è pericoloso passare.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Vedere dove corre la Quintessenza di là.",
        "required": false
      }
    ],
    "scopes": "Area per quanto è larga la mappa: 1 la stanza, 3 il quartiere, 5 la regione. Precisione (dettaglio) per un varco solo. Durata 2 per tenere la mappa tutta la scena.",
    "formule": [
      "sapere"
    ]
  },
  {
    "id": "spirit-1-guardare-lontano",
    "name": "Guardare lontano",
    "sphere": "spirit",
    "level": 1,
    "extras": [],
    "text": "La tua vista si stacca dal luogo e va dove nessuno ha mappato: i Regni profondi, gli Orizzonti, quello che ci vive. Chi guarda tanto, prima o poi, viene guardato.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Non farti vedere da chi guarda indietro.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Guardare lontano nel passato dell'altro lato.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Trovare dove sta la Quintessenza, laggiù.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Sapere cosa ti conviene non guardare.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Guardare lontano anche di qua, oltre che di là.",
        "required": false
      }
    ],
    "scopes": "Portata per quanto lontano, in Veli e non in metri: 3 la Penumbra profonda, 5 i Regni, 7 gli Orizzonti. Durata 1 per un'occhiata, 2 per la scena. Precisione (dettaglio) per un luogo preciso.",
    "formule": [
      "percepire"
    ]
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
    "text": "Uno sguardo dice cosa hai davanti: vampiro, mutaforma, morto, posseduto, peggio. Serve la Vita: lo Spirito vede il riflesso, la Vita dice che corpo è.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Leggere il corpo insieme al riflesso.",
        "required": true
      },
      {
        "sphere": "mind",
        "text": "Leggere l'aura insieme al riflesso, e sapere se lui sa cos'è.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Riconoscere anche un Risvegliato, e quanto è forte.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Sapere quanto è pericoloso, adesso.",
        "required": false
      }
    ],
    "scopes": "Bersagli per una stanza piena. Area per setacciare un luogo. Precisione (dettaglio) per la specie esatta: 1 non è umano, 3 cos'è, 5 quale clan, quale tribù.",
    "formule": [
      "sapere"
    ]
  },
  {
    "id": "spirit-1-trovare-uno-spirito",
    "name": "Trovare uno spirito",
    "sphere": "spirit",
    "level": 1,
    "extras": [],
    "text": "Sai dove sta lo spirito, il licantropo, il morto rimasto: di qua o di là, la presenza la senti come un freddo in una direzione.",
    "pairings": [
      {
        "sphere": "correspondence",
        "text": "Trovarlo a qualunque distanza.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Trovare anche il corpo che lo ospita.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Sapere dov'era ieri.",
        "required": false
      }
    ],
    "scopes": "Area per quanto cerchi: 2 il palazzo, 3 il quartiere. Precisione (dettaglio) per lo spirito esatto fra tanti. Durata 2 per tenere la traccia.",
    "formule": [
      "trovare"
    ]
  },
  {
    "id": "spirit-2-aprire-una-trattativa",
    "name": "Aprire una trattativa",
    "sphere": "spirit",
    "level": 2,
    "extras": [],
    "text": "L'offerta formale a un'entità: dichiari cosa porti e cosa chiedi, e da lì si contratta. Lo spirito ti ascolta, e risponde con le sue regole.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Sapere che prezzo ha in mente davvero l'altra parte.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Mettere sul tavolo Quintessenza, e farla pesare.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Sapere cosa ha accettato in passato, e da chi.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Sapere quando l'entità cederà.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la trattativa intera. Condizioni 1 per ogni clausola dell'accordo, e Complessità per quanto è lungo. Bersagli per trattare con più entità.",
    "formule": [
      "comunicare"
    ]
  },
  {
    "id": "spirit-2-chiamare-il-tuo-alleato",
    "name": "Chiamare il tuo alleato",
    "sphere": "spirit",
    "level": 2,
    "extras": [],
    "text": "La voce del famiglio o del patrono ti risponde, ovunque sia: gli parli, ti parla, e se può, arriva.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Parlargli mente a mente, senza voce.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Dargli Quintessenza per il viaggio.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Chiamarlo prima, così che sia già lì.",
        "required": false
      }
    ],
    "scopes": "Portata per quanto lontano ti sente, in Veli. Durata 1 per una chiamata, 2 per la scena.",
    "formule": [
      "evocare"
    ]
  },
  {
    "id": "spirit-2-ispessire-o-assottigliare-il-velo",
    "name": "Ispessire o assottigliare il Velo",
    "sphere": "spirit",
    "level": 2,
    "extras": [],
    "text": "Apri la strada ai tuoi, la sbarri agli altri: in quel punto passare diventa facile, o impossibile.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Legare lo spessore a un oggetto: la porta, la soglia, la pietra.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far mordere il Velo a chi lo forza.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far passare solo chi ha l'intenzione giusta.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Aprire o chiudere il Velo a orari: solo a mezzanotte.",
        "required": false
      }
    ],
    "scopes": "Area per quanto Velo: 1 la stanza, 2 il palazzo, 3 il quartiere. Durata per quanto regge. Condizioni 1 per chi passa: solo i tuoi.",
    "formule": [
      "aprire"
    ]
  },
  {
    "id": "spirit-2-parlare-con-chi-sta-di-la",
    "name": "Parlare con chi sta di là",
    "sphere": "spirit",
    "level": 2,
    "extras": [],
    "text": "La tua voce attraversa la parete sottile: parli con lo spirito, col morto, con la cosa che vive nel muro, e senti la risposta.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Capire quello che l'entità non dice.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Far sentire la voce di là anche agli altri, e registrarla.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Parlare con chi stava di là ieri.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far sentire la voce di là a un corpo: lo tocca.",
        "required": false
      }
    ],
    "scopes": "Durata 1 per una frase, 2 per la scena. Bersagli per parlare con più entità. Portata per quanto lontano, in Veli.",
    "formule": [
      "comunicare"
    ]
  },
  {
    "id": "spirit-2-nasconderti-agli-spiriti",
    "name": "Nasconderti agli spiriti",
    "sphere": "spirit",
    "level": 2,
    "extras": [],
    "text": "Il tuo riflesso di là si spegne: chi guarda dall'Umbra, chi sente le anime, chi cerca la tua firma oltre il Velo, non ti trova.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Nasconderti anche a chi legge le menti.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Nascondere anche la tua Quintessenza.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Spegnere anche l'alone della vita.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far guardare altrove chi ti cerca di là.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena, 4 per la sessione. Bersagli per la Cabala. Area per nascondere un luogo intero.",
    "formule": [
      "celare",
      "proteggere"
    ]
  },
  {
    "id": "spirit-2-tenere-lontani-gli-spiriti",
    "name": "Tenere lontani gli spiriti",
    "sphere": "spirit",
    "level": 2,
    "extras": [],
    "text": "Gli spiriti non ti toccano e non ti entrano dentro: la possessione non attecchisce, il colpo dall'Umbra non arriva.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Tenere fuori anche i sussurri.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far mordere chi prova a entrare.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far entrare la protezione nella carne: dura senza mantenerla.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena, 4 per la sessione. Bersagli per proteggere altri.",
    "formule": [
      "proteggere"
    ]
  },
  {
    "id": "spirit-3-attraversare-il-velo",
    "name": "Attraversare il Velo",
    "sphere": "spirit",
    "level": 3,
    "extras": [],
    "text": "Passi dall'altra parte in carne e ossa, esattamente dove sei: la Penumbra del punto in cui stavi. Occhio alla barriera locale: nei luoghi sterili costa di più.",
    "pairings": [
      {
        "sphere": "correspondence",
        "text": "Attraversare e arrivare altrove: il Velo di qua, i chilometri di là.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far reggere il corpo all'aria di là.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Portare con te anche il carico: l'auto, l'attrezzatura.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Non farti notare da chi vive di là.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Pagare l'attrito della barriera con la Quintessenza.",
        "required": false
      }
    ],
    "scopes": "Bersagli per chi passa con te. Durata 1 per un'andata, 2 per la scena. Potenza (peso) per il carico.",
    "formule": [
      "varcare"
    ]
  },
  {
    "id": "spirit-3-chiudere-un-passaggio",
    "name": "Chiudere un passaggio",
    "sphere": "spirit",
    "level": 3,
    "extras": [],
    "text": "Il varco che qualcuno usava smette di esistere, e chi lo stava usando resta dov'è: di qua o di là.",
    "pairings": [
      {
        "sphere": "correspondence",
        "text": "Chiudere anche i varchi nello spazio.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Murare il varco con una cosa vera: la porta sparisce nel muro.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far mordere il varco chiuso a chi prova a riaprirlo.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far chiudere il varco proprio mentre lui ci passa.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto resta chiuso (7 per sempre). Potenza (epicità) nel braccio di ferro con chi vuole riaprirlo. Bersagli per più varchi.",
    "formule": [
      "aprire"
    ]
  },
  {
    "id": "spirit-3-colpire-l-anima",
    "name": "Colpire l'anima",
    "sphere": "spirit",
    "level": 3,
    "extras": [
      {
        "sphere": "life",
        "level": 1,
        "required": true
      }
    ],
    "text": "Colpisci l'anima di un vivente: danno alla Saggezza, uno dei pochissimi modi che esistano. Serve la Vita: il colpo passa per il corpo che la ospita.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Far passare il colpo per il corpo.",
        "required": true
      },
      {
        "sphere": "mind",
        "text": "Fargli capire cosa ha perso.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Colpire dove l'anima è già crepata.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Colpire anche l'Avatar dietro l'anima.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto ferisce. Bersagli per più anime. Precisione (dettaglio) per una parte sola dell'anima: una Convinzione.",
    "formule": [
      "danneggiare"
    ]
  },
  {
    "id": "spirit-3-ferire-l-immateriale",
    "name": "Ferire l'immateriale",
    "sphere": "spirit",
    "level": 3,
    "extras": [],
    "text": "Colpisci l'effimera come fosse carne: lo spirito, il fantasma, la cosa nel muro sanguinano. Oltre il Velo il danno è Aggravato e resta Accidentale: l'altro lato non ha Testimoni.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "Disfare l'effimera dall'interno.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far mordere il colpo con la Quintessenza.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Colpire con un'energia: il fuoco, il fulmine.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Ferire l'immateriale con un'arma vera.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto ferisce. Bersagli per più spiriti. Precisione (dettaglio) per colpire quello giusto in uno sciame.",
    "formule": [
      "danneggiare"
    ]
  },
  {
    "id": "spirit-3-guarire-uno-spirito",
    "name": "Guarire uno spirito",
    "sphere": "spirit",
    "level": 3,
    "extras": [],
    "text": "Ricuci l'effimera come si ricuce la carne: lo spirito ferito torna intero, il fantasma sfilacciato riprende forma.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Nutrire lo spirito di Quintessenza mentre lo ricuci.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Guarire uno spirito incarnato insieme al corpo che abita.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Guarire anche quello che lo spirito ricorda della ferita.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sì che la ferita non si riapra.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto guarisce. Bersagli per più spiriti.",
    "formule": [
      "guarire"
    ]
  },
  {
    "id": "spirit-3-ferire-un-mutaforma",
    "name": "Ferire un mutaforma",
    "sphere": "spirit",
    "level": 3,
    "extras": [
      {
        "sphere": "life",
        "level": 1,
        "required": true
      }
    ],
    "text": "Il loro Modello è ibrido, carne e spirito insieme: lo colpisci sulla parte spirituale, e la carne segue. Serve la Vita per la parte di carne.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Colpire anche la carne.",
        "required": true
      },
      {
        "sphere": "forces",
        "text": "Colpire con un'energia: il fuoco, l'argento fuso.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Colpire dove il Modello ibrido è più stanco.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far mordere il colpo con la Quintessenza.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto ferisce. Bersagli per più mutaforma. Precisione (dettaglio) per il punto esatto.",
    "formule": [
      "danneggiare"
    ]
  },
  {
    "id": "spirit-3-aprire-la-prova-dell-anima",
    "name": "Aprire la prova dell'anima",
    "sphere": "spirit",
    "level": 3,
    "extras": [
      {
        "sphere": "life",
        "level": 1,
        "required": true
      }
    ],
    "text": "Non cancelli niente da solo: apri una porta. Il soggetto si trova davanti a sé stesso e al proprio Avatar, in una prova cucita sulle sue Convinzioni; se la supera, ogni Macchia se ne va. Una sola per cronaca, a testa. Serve la Vita.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Aprire la porta attraverso il corpo che ospita l'anima.",
        "required": true
      },
      {
        "sphere": "mind",
        "text": "Costruire la prova con i suoi ricordi.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far parlare l'Avatar più chiaro.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Portarlo nella prova al momento della prima Macchia.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena della prova. Potenza (epicità) per quanto pesa: 4 impatta sul capitolo, 6 impatta sulla storia.",
    "formule": [
      "risanare"
    ]
  },
  {
    "id": "spirit-3-svegliare-cio-che-dorme-in-un-oggetto",
    "name": "Svegliare ciò che dorme in un oggetto",
    "sphere": "spirit",
    "level": 3,
    "extras": [],
    "text": "Il vecchio fucile si ricorda di avere un'opinione, e ti è amico: lo spirito che dorme nell'oggetto si sveglia, e ti risponde.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Far parlare l'oggetto anche a chi non ha lo Spirito: si muove, suona, scrive.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Capire cosa vuole lo spirito dell'oggetto.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Dare allo spirito la Quintessenza per restare sveglio.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Svegliare lo spirito com'era quando l'oggetto era nuovo.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto resta sveglio: 2 la scena, 7 per sempre. Bersagli per più oggetti. Condizioni 1 se risponde solo a te.",
    "formule": [
      "potenziare"
    ]
  },
  {
    "id": "spirit-3-chiudere-il-varco-di-un-altro-mentre-lo-apre",
    "name": "Chiudere il varco di un altro mentre lo apre",
    "sphere": "spirit",
    "level": 3,
    "extras": [],
    "text": "Mentre un altro mago evoca, apre il Velo o manda qualcosa di là, tu glielo chiudi in faccia: lo spirito non risponde, il varco non si apre. Si tira contro il suo lancio; vince chi ha più successi.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Far nascere stanco qualunque suo effetto, non solo quelli sul Velo.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far inceppare il suo lancio nel punto debole.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Chiudere anche i suoi varchi nello spazio.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) nel braccio di ferro. Durata 1 per un lancio, 2 per tutta la scena.",
    "formule": [
      "contrastare"
    ]
  },
  {
    "id": "spirit-3-non-far-presa-a-spiriti-e-possessione",
    "name": "Non far presa a spiriti e possessione",
    "sphere": "spirit",
    "level": 3,
    "extras": [],
    "text": "Spiriti, possessione, l'attrito del Velo: quello che viene di là non fa presa su di te. Passi e resti tuo.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Non far presa nemmeno ai sussurri.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Respingere anche la Magick che viene di là.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far entrare la resistenza nella carne.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena, 4 per la sessione, 7 per sempre. Bersagli per proteggere altri.",
    "formule": [
      "resistere"
    ]
  },
  {
    "id": "spirit-4-creare-un-feticcio",
    "name": "Creare un Feticcio",
    "sphere": "spirit",
    "level": 4,
    "extras": [],
    "text": "Leghi un'entità in un oggetto, che lo voglia o no: l'oggetto porta i suoi poteri. Con il Primordio il Feticcio nasce da un patto, e lo spirito consenziente abita la tua energia.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Legare uno spirito consenziente: la tua energia gli fa da casa.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Fare l'oggetto su misura per lo spirito.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far obbedire lo spirito legato come lo intendevi, senza spiragli.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Fare da Feticcio un vivente: l'animale, la pianta.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto resta legato (7 per sempre). Potenza (epicità) per quanto è forte lo spirito. Condizioni 1 per ogni clausola del vincolo, e Complessità per quanto è lungo.",
    "formule": [
      "vincolare"
    ]
  },
  {
    "id": "spirit-4-esiliare-oltre-il-velo",
    "name": "Esiliare oltre il Velo",
    "sphere": "spirit",
    "level": 4,
    "extras": [],
    "text": "Il bersaglio precipita dall'altro lato, e il ritorno è affar suo. Un vivente ci arriva in carne e ossa: serve la Vita perché la carne passi senza strappo.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Far passare un vivente restando un corpo.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Esiliare un oggetto, o un'auto con chi c'è dentro.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Fargli dimenticare la strada del ritorno.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Esiliarlo lontano, oltre che di là.",
        "required": false
      }
    ],
    "scopes": "Portata per quanto in fondo lo mandi, in Veli. Bersagli per più esiliati. Potenza (epicità) nel braccio di ferro con chi resiste. Durata per quanto resta chiuso fuori.",
    "formule": [
      "cancellare"
    ]
  },
  {
    "id": "spirit-4-esorcizzare-un-posseduto",
    "name": "Esorcizzare un posseduto",
    "sphere": "spirit",
    "level": 4,
    "extras": [],
    "text": "Il corpo torna libero, l'ospite torna di là: sciogli chi si è insediato dove non doveva.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Guarire il corpo dai segni della possessione.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Guarire la mente da quello che l'ospite ha lasciato.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far mordere l'esorcismo a un ospite più forte.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sì che l'ospite non trovi più la strada per tornare.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) nel braccio di ferro con l'ospite. Bersagli per più posseduti. Durata 2 per la scena, 7 perché non torni.",
    "formule": [
      "cancellare"
    ]
  },
  {
    "id": "spirit-4-evocare-e-vincolare",
    "name": "Evocare e vincolare",
    "sphere": "spirit",
    "level": 4,
    "extras": [],
    "text": "L'entità risponde all'appello e resta nel cerchio: vincolata, esegue alla lettera. Per comandarla come la intendi tu serve la Mente.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Comandarla come la intendi tu, senza spiragli nella lettera.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Pagarla in Quintessenza, e vincolarla più a lungo.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Darle un corpo di qua: la statua, il manichino.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) per quanto è forte l'entità. Durata per quanto resta vincolata: 2 la scena, 4 la sessione. Condizioni 1 per ogni clausola del vincolo, e Complessità per quanto è lungo.",
    "formule": [
      "evocare",
      "dominare"
    ]
  },
  {
    "id": "spirit-4-imprigionare-un-avatar",
    "name": "Imprigionare un Avatar",
    "sphere": "spirit",
    "level": 4,
    "extras": [],
    "text": "La scintilla di un Risvegliato resta chiusa fuori dalla sua portata: finché reggi il vincolo, la sua Magick non risponde.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Far reggere il vincolo contro la Quintessenza che spende per liberarsi.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Non fargli capire cosa è successo.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far scattare la prigione quando lancia.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto reggi: 2 la scena, 4 la sessione. Potenza (epicità) nel braccio di ferro con l'Avatar. Condizioni 1 se la prigione si apre a una condizione.",
    "formule": [
      "vincolare"
    ]
  },
  {
    "id": "spirit-4-intrappolare",
    "name": "Intrappolare",
    "sphere": "spirit",
    "level": 4,
    "extras": [],
    "text": "La trappola scatta su un'entità: niente poteri, niente fuga, finché la mantieni.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Legare la trappola a un oggetto: la bottiglia, il cerchio di sale, la gabbia.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far reggere la trappola senza mantenerla.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far credere all'entità di essere libera.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto reggi: 2 la scena, 4 la sessione, 7 per sempre. Potenza (epicità) nel braccio di ferro con l'entità. Bersagli per più entità.",
    "formule": [
      "bloccare"
    ]
  },
  {
    "id": "spirit-4-rianimare-un-morto-recente",
    "name": "Rianimare un morto recente",
    "sphere": "spirit",
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
    "text": "Richiami l'anima oltre il Velo e la rimetti nel corpo: il morto recente torna. Servono la Vita, che rimette in piedi il corpo, e il Primordio, che riaccende la scintilla. Volgare, sempre, ovunque.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Rimettere in piedi il corpo.",
        "required": true
      },
      {
        "sphere": "prime",
        "text": "Riaccendere la scintilla.",
        "required": true
      },
      {
        "sphere": "time",
        "text": "Rianimare chi è morto da più tempo.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far tornare il morto con la memoria intera.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) per quanto pesa il ritorno: 4 impatta sul capitolo, 6 impatta sulla storia. Durata 7. Condizioni 1 per ogni clausola del ritorno.",
    "formule": [
      "resuscitare"
    ]
  },
  {
    "id": "spirit-4-sbarrare-un-luogo-agli-spiriti",
    "name": "Sbarrare un luogo agli spiriti",
    "sphere": "spirit",
    "level": 4,
    "extras": [],
    "text": "Dentro quel perimetro gli spiriti non entrano e la possessione non attecchisce: il Velo lì è un muro, e chi era dentro resta fuori.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Legare la barriera a un oggetto: la soglia, la pietra, il sale.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far mordere la barriera a chi la forza.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far passare solo gli spiriti che hanno l'intenzione giusta.",
        "required": false
      }
    ],
    "scopes": "Area per il perimetro: 1 la stanza, 2 l'edificio, 3 il quartiere. Durata per quanto regge (7 per sempre). Condizioni 1 per chi passa.",
    "formule": [
      "barriera"
    ]
  },
  {
    "id": "spirit-5-aprire-un-regno",
    "name": "Aprire un Regno",
    "sphere": "spirit",
    "level": 5,
    "extras": [],
    "text": "Un luogo nuovo di là, con le sue leggi e i suoi confini, che resta quando te ne vai.",
    "pairings": [
      {
        "sphere": "correspondence",
        "text": "Aprire il Regno con una porta di qua, dove decidi tu.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Dare al Regno una materia sua: le pietre, le case.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Popolare il Regno di viventi.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Dare al Regno una legge sui pensieri: chi entra dimentica, chi entra dice il vero.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Dare al Regno un tempo suo.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Dare al Regno una sorgente di Quintessenza.",
        "required": false
      }
    ],
    "scopes": "Area per quanto è grande: 2 il palazzo, 4 la città, 6 il continente. Durata 7. Potenza (epicità) per quanto pesa: 5 stravolge il capitolo, 7 impatta sull'intera ambientazione.",
    "formule": [
      "inventare",
      "rivoluzionare"
    ]
  },
  {
    "id": "spirit-5-dare-corpo-a-una-presenza",
    "name": "Dare corpo a una presenza",
    "sphere": "spirit",
    "level": 5,
    "extras": [
      {
        "sphere": "prime",
        "level": 1,
        "required": true
      }
    ],
    "text": "Un'entità dove non ce n'era: nasce con una fame, e la fame la scegli tu. Serve il Primordio, che dà la materia prima.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Dare la materia prima all'entità.",
        "required": true
      },
      {
        "sphere": "mind",
        "text": "Dare all'entità una mente sua: pensa, ricorda, decide.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Dare all'entità un corpo di carne.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Dare all'entità un corpo di pietra o di metallo.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) per quanto è forte: 3 stravolge una scena, 6 impatta sulla storia. Durata per quanto vive (7 per sempre). Condizioni 1 per la fame che le dai.",
    "formule": [
      "inventare"
    ]
  },
  {
    "id": "spirit-5-il-gilgul",
    "name": "Il Gilgul",
    "sphere": "spirit",
    "level": 5,
    "extras": [],
    "text": "Spezzi l'Avatar di un Risvegliato: da quel momento non lancia più, e non lancerà mai più. Si fa una volta sola, e chi lo fa smette di essere quello di prima.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Disperdere la Quintessenza dell'Avatar spezzato.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Fargli restare la memoria di cos'era, o togliergliela.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Fare in modo che non si sia mai Risvegliato.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far sopravvivere il corpo al colpo.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità): 6 impatta sulla storia. Durata 7, e basta.",
    "formule": [
      "annientare"
    ]
  },
  {
    "id": "spirit-5-provocare-un-risveglio",
    "name": "Provocare un Risveglio",
    "sphere": "spirit",
    "level": 5,
    "extras": [],
    "text": "Apri gli occhi a un Dormiente. Non è un dono e non si chiede permesso: è una porta spalancata addosso a qualcuno che dormiva.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Dare al nuovo Risvegliato la prima Quintessenza.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Fargli reggere la mente al Risveglio.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Fargli reggere il corpo al Risveglio.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Scegliere il momento in cui si sveglia.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Scegliere chi, fra molti, si sveglia.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità): 5 stravolge il capitolo, 6 impatta sulla storia. Durata 7. Bersagli per più Dormienti.",
    "formule": [
      "trasmutare"
    ]
  },
  {
    "id": "spirit-5-abitare-un-corpo",
    "name": "Abitare un corpo",
    "sphere": "spirit",
    "level": 5,
    "extras": [],
    "text": "Entri in un corpo che non è tuo e lo abiti: lo muovi, lo usi, parli con la sua bocca. Il tuo resta dov'è, e chi c'era dentro aspetta.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Avere anche i suoi ricordi mentre lo abiti.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far reggere il corpo alla tua presenza senza consumarlo.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Abitare un corpo lontano.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena, 4 per la sessione, 7 per sempre. Potenza (epicità) nel braccio di ferro con chi c'è dentro.",
    "formule": [
      "possedere"
    ]
  },
  {
    "id": "time-1-leggere-il-flusso",
    "name": "Leggere il flusso",
    "sphere": "time",
    "level": 1,
    "extras": [],
    "text": "Sai l'ora esatta senza orologio, senti le anomalie del tempo attorno a te, e leggi la linea del luogo all'indietro: cosa è successo qui, e quando. La profondità la comprano i successi.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Sapere se l'anomalia l'ha fatta una Magick, e di chi.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Sapere quando il flusso si romperà.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Sentire cosa pensava chi era qui, nel momento che leggi.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto indietro arrivi (fuori gioco: 1 il giorno, 3 il mese, 5 l'anno). Area per un luogo intero. Precisione (dettaglio) per un momento solo.",
    "formule": [
      "percepire"
    ]
  },
  {
    "id": "time-1-leggere-la-linea-di-una-persona",
    "name": "Leggere la linea di una persona",
    "sphere": "time",
    "level": 1,
    "extras": [],
    "text": "Vedi il suo passato addosso a lei, e i rami che le partono da adesso: da dove viene, cosa ha fatto, e verso cosa sta andando.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Leggere anche cosa pensava lungo la linea.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Leggere la linea del corpo: le ferite, le malattie, quanto gli resta.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Sapere quale ramo peserà di più.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Leggere la linea di uno spirito o di un morto.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto indietro o avanti (fuori gioco: 3 il mese, 5 l'anno, 6 il decennio). Precisione (informazione) per quanto pesa quel che cerchi. Bersagli per più linee.",
    "formule": [
      "sapere"
    ]
  },
  {
    "id": "time-1-trovare-le-cuciture",
    "name": "Trovare le cuciture",
    "sphere": "time",
    "level": 1,
    "extras": [],
    "text": "Vedi i punti in cui il tempo è stato rifatto da qualcuno prima di te: la scena riavvolta, l'evento cancellato, l'anello chiuso.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Sapere chi ha cucito, e con quanta forza.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Ricordare la versione di prima della cucitura.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Sapere quale cucitura sta per cedere.",
        "required": false
      }
    ],
    "scopes": "Area per setacciare un luogo: 1 la stanza, 3 il quartiere. Durata per quanto indietro cerchi. Precisione (dettaglio) per una cucitura sola.",
    "formule": [
      "trovare"
    ]
  },
  {
    "id": "time-2-il-vantaggio-del-primo-istante",
    "name": "Il vantaggio del primo istante",
    "sphere": "time",
    "level": 2,
    "extras": [],
    "text": "Quando la violenza esplode, tu eri pronto da un attimo: agisci per primo, sempre. Su te stesso è la più Accidentale delle Arti.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "Far arrivare l'attimo giusto anche quando non te lo aspettavi.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Dare il vantaggio anche ai compagni, avvertendoli in tempo.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far muovere il corpo prima che la testa decida.",
        "required": false
      }
    ],
    "scopes": "Durata 1 per lo scontro, 2 per la scena. Bersagli per la Cabala.",
    "formule": [
      "potenziare"
    ]
  },
  {
    "id": "time-2-vedere-e-proiettare-passato-o-futuro",
    "name": "Vedere e proiettare passato o futuro",
    "sphere": "time",
    "level": 2,
    "extras": [],
    "text": "La scena rivive davanti a te, nitida e mostrabile: quello che è successo qui, o quello che succederà. La mostri anche agli altri. Lontano da qui serve la Corrispondenza.",
    "pairings": [
      {
        "sphere": "forces",
        "text": "Proiettare la scena in luce e suono veri: anche le telecamere la riprendono.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Mostrare la scena solo nelle teste che scegli.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Vedere il futuro più probabile, fra i rami.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto indietro o avanti (fuori gioco: 1 il giorno, 3 il mese, 5 l'anno). Precisione (dettaglio) per i particolari: 1 le sagome, 3 i volti, 5 le parole. Area per la scena intera.",
    "formule": [
      "percepire"
    ]
  },
  {
    "id": "time-2-vegliare-sui-futuri-prossimi",
    "name": "Vegliare sui futuri prossimi",
    "sphere": "time",
    "level": 2,
    "extras": [
      {
        "sphere": "entropy",
        "level": 1,
        "required": true
      }
    ],
    "text": "Tieni d'occhio i prossimi istanti: niente ti coglie di sorpresa, e sai un attimo prima cosa sta per succedere. Serve l'Entropia: senza, i rami li leggi solo quando guardi.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "Tenere i rami sotto gli occhi anche fra uno sguardo e l'altro.",
        "required": true
      },
      {
        "sphere": "mind",
        "text": "Avvertire i compagni di quel che sta per succedere.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far reagire il corpo da solo a quel che vedi arrivare.",
        "required": false
      }
    ],
    "scopes": "Durata 1 per lo scontro, 2 per la scena. Bersagli per far vegliare anche i compagni. Precisione (dettaglio) per un pericolo solo: il colpo di pistola.",
    "formule": [
      "prevedere"
    ]
  },
  {
    "id": "time-3-accelerare-e-rallentare",
    "name": "Accelerare e rallentare",
    "sphere": "time",
    "level": 3,
    "extras": [],
    "text": "Tu doppio, lui a metà: cambi il ritmo con cui il tempo scorre per qualcuno. L'Ora Rubata vive qui: un'azione extra per turno, finché regge. Sugli altri è Volgare.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Far reggere il corpo al ritmo doppio: niente strappi, niente fiato corto.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far pensare a ritmo doppio, senza muoversi.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Accelerare o rallentare un'energia: la fiamma, la scarica, il proiettile.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Accelerare o rallentare una macchina: l'auto, l'orologio.",
        "required": false
      }
    ],
    "scopes": "Durata 1 per lo scontro, 2 per la scena. Bersagli per più persone. Potenza (epicità) per quanto cambia il ritmo: 2 il doppio, 4 dieci volte.",
    "formule": [
      "accelerare",
      "rallentare"
    ]
  },
  {
    "id": "time-3-fermare-un-oggetto-nel-tempo",
    "name": "Fermare un oggetto nel tempo",
    "sphere": "time",
    "level": 3,
    "extras": [],
    "text": "Una cosa sola esce dal flusso: il proiettile resta a mezz'aria, la bomba non finisce di esplodere, il bicchiere che cade non arriva a terra. Il resto della stanza va avanti.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Fermare un oggetto grosso: l'auto, la gru.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Fermare un vivente senza danno.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Fermare un'energia: la fiamma, la scarica.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far ripartire l'oggetto nel momento peggiore per chi lo aspettava.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto fermi: 1 il proiettile, 3 l'auto. Durata per quanto resta fermo: 1 tre turni, 2 la scena, 7 per sempre. Bersagli per più oggetti.",
    "formule": [
      "bloccare"
    ]
  },
  {
    "id": "time-3-far-maturare-in-un-ora",
    "name": "Far maturare in un'ora",
    "sphere": "time",
    "level": 3,
    "extras": [
      {
        "sphere": "life",
        "level": 1,
        "required": true
      }
    ],
    "text": "La vigna fa in un pomeriggio la sua stagione intera: il vivente cresce, matura, guarisce col tempo che gli scarichi addosso. Serve la Vita.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Far crescere il vivente per le vie del vivente.",
        "required": true
      },
      {
        "sphere": "matter",
        "text": "Far maturare anche quello che non è vivo: il vino, il formaggio, il legno stagionato etc..",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far maturare senza marcire.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Dare al vivente la Quintessenza per crescere senza consumarsi.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto tempo scarichi (fuori gioco: 2 la settimana, 4 la stagione, 5 l'anno). Area per un campo intero. Bersagli per più viventi.",
    "formule": [
      "accelerare"
    ]
  },
  {
    "id": "time-3-invecchiare-o-ringiovanire-qualcuno",
    "name": "Invecchiare o ringiovanire qualcuno",
    "sphere": "time",
    "level": 3,
    "extras": [],
    "text": "Decenni scaricati nel corpo, o tolti: la pelle si segna o si distende, i capelli sbiancano o tornano, le forze vanno o tornano. Con la Vita il corpo invecchia da dentro, per le vie del vivente; con la Materia invecchia un oggetto. Senza la Sfera del bersaglio pieghi il tempo attorno a lui, e il mondo vede un uomo che invecchia senza motivo: Volgare.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Far invecchiare o ringiovanire il corpo da dentro, e restare spiegabile.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Invecchiare o rinnovare un oggetto: la ruggine, la polvere, il legno secco.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far invecchiare o ringiovanire anche la mente: la memoria che va, o che torna.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far cedere per primo quello che regge tutto.",
        "required": false
      }
    ],
    "scopes": "Durata per quanti anni scarichi (fuori gioco: 5 l'anno, 6 il decennio). Potenza (danni) se gli anni feriscono. Bersagli per più persone. Precisione (dettaglio) per una parte sola: le mani, la vista.",
    "formule": [
      "danneggiare",
      "risanare"
    ]
  },
  {
    "id": "time-3-riavvolgere-la-scena",
    "name": "Riavvolgere la scena",
    "sphere": "time",
    "level": 3,
    "extras": [],
    "text": "Gli ultimi istanti tornano indietro: quello che è appena successo non è successo, e si rifà. Senza la Mente i ricordi si riscrivono da soli, i tuoi per primi: rifarai le stesse scelte per le stesse ragioni.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Ricordare la versione cancellata, e rifare la scena sapendo com'era andata.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far cadere la scena rifatta dalla parte giusta.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far tornare indietro anche la Quintessenza spesa.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto indietro: 1 tre turni, 2 la scena. Area per quanto riavvolgi: 1 la stanza, 2 il palazzo. Bersagli per chi ricorda insieme a te.",
    "formule": [
      "riavvolgere"
    ]
  },
  {
    "id": "time-3-riavvolgere-un-corpo",
    "name": "Riavvolgere un corpo",
    "sphere": "time",
    "level": 3,
    "extras": [
      {
        "sphere": "life",
        "level": 1,
        "required": true
      }
    ],
    "text": "Le ferite si richiudono a ritroso, come un nastro mandato indietro: il corpo torna a com'era prima del colpo. Serve la Vita: senza, il flusso prende tutto insieme, la ferita e il resto.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Scegliere cosa torna indietro: la ferita e nient'altro.",
        "required": true
      },
      {
        "sphere": "mind",
        "text": "Fargli dimenticare il dolore insieme alla ferita.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sì che la ferita non si riapra.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Riavvolgere anche il proiettile: torna nella canna.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto guarisce. Durata per quanto indietro: 1 tre turni, 2 la scena, 3 due scene. Bersagli per più feriti.",
    "formule": [
      "guarire",
      "riavvolgere"
    ]
  },
  {
    "id": "time-3-saltare-l-attimo-del-colpo",
    "name": "Saltare l'attimo del colpo",
    "sphere": "time",
    "level": 3,
    "extras": [],
    "text": "Un passo nel futuro immediato: l'attacco attraversa il punto dove eri, e tu sei un istante più avanti. Su te stesso è Accidentale.",
    "pairings": [
      {
        "sphere": "correspondence",
        "text": "Riapparire un passo più in là, oltre che un istante dopo.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far fare il salto al corpo senza contraccolpi.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far saltare l'attimo giusto senza doverlo vedere arrivare.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far saltare l'attimo anche a un compagno, avvertendolo.",
        "required": false
      }
    ],
    "scopes": "Durata 1 per un colpo, 2 per la scena. Bersagli per chi salta con te. Condizioni 1 se scatta da solo: ogni colpo diretto a te.",
    "formule": [
      "proteggere"
    ]
  },
  {
    "id": "time-3-mostrare-un-passato-falso",
    "name": "Mostrare un passato falso",
    "sphere": "time",
    "level": 3,
    "extras": [],
    "text": "A chi è con te mostri un passato o un futuro che non è quello vero: la scena rivive, nitida, e mente.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Far credere la scena vera anche a chi la conosce.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Proiettare la scena in luce e suono veri: anche le telecamere la riprendono.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far tornare i conti alla scena falsa.",
        "required": false
      }
    ],
    "scopes": "Bersagli per quanti la vedono. Durata 1 per un attimo, 2 per la scena. Precisione (dettaglio) per i particolari: 3 i volti, 5 le parole.",
    "formule": [
      "ingannare"
    ]
  },
  {
    "id": "time-3-rubare-l-istante-a-un-altro",
    "name": "Rubare l'istante a un altro",
    "sphere": "time",
    "level": 3,
    "extras": [],
    "text": "Mentre un altro mago ruba istanti, accelera, riavvolge, tu gli togli il tempo da sotto: il suo effetto arriva tardi, o non arriva. Si tira contro il suo lancio; vince chi ha più successi.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Far nascere stanco qualunque suo effetto, non solo quelli sul tempo.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far inceppare il suo lancio nel punto debole.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Fargli credere che il tempo gli abbia risposto.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) nel braccio di ferro. Durata 1 per un lancio, 2 per tutta la scena.",
    "formule": [
      "contrastare"
    ]
  },
  {
    "id": "time-4-ancorare-il-presente",
    "name": "Ancorare il presente",
    "sphere": "time",
    "level": 4,
    "extras": [],
    "text": "Fissi un punto fermo nel flusso: la base di viaggi e ritorni, il momento a cui tornare quando tutto va storto.",
    "pairings": [
      {
        "sphere": "correspondence",
        "text": "Ancorare anche il luogo insieme al momento.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Ancorare anche i ricordi: tornando, ricordi.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far reggere l'ancora contro chi vuole spostarla.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Legare l'ancora a un oggetto: l'orologio, la pietra.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto resta l'ancora (7 per sempre). Area per quanto ancori: 1 la stanza, 2 il palazzo. Bersagli per chi può usarla.",
    "formule": [
      "fissare"
    ]
  },
  {
    "id": "time-4-avvertire-il-te-di-ieri",
    "name": "Avvertire il te di ieri",
    "sphere": "time",
    "level": 4,
    "extras": [
      {
        "sphere": "mind",
        "level": 1,
        "required": true
      }
    ],
    "text": "Un ricordo torna indietro di minuti e cambia la scena: il te di prima sa quello che tu sai adesso. Serve la Mente, che porta il ricordo.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Far risalire il ricordo lungo la corrente.",
        "required": true
      },
      {
        "sphere": "prime",
        "text": "Far pesare l'avvertimento contro chi ha cucito la scena.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto indietro: 1 tre turni, 2 la scena, 3 due scene. Bersagli per avvertire più persone. Precisione (dettaglio) per un ricordo solo e preciso.",
    "formule": [
      "comunicare"
    ]
  },
  {
    "id": "time-4-chiudere-un-area-in-un-anello",
    "name": "Chiudere un'area in un anello",
    "sphere": "time",
    "level": 4,
    "extras": [
      {
        "sphere": "mind",
        "level": 1,
        "required": true
      }
    ],
    "text": "Gli stessi tre minuti, ancora e ancora, finché non decidi tu: chi è dentro li rivive senza uscirne. Serve la Mente, perché l'anello regga nelle teste.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Far reggere l'anello nelle teste di chi è dentro.",
        "required": true
      },
      {
        "sphere": "entropy",
        "text": "Far cambiare qualcosa a ogni giro, o niente.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far reggere i corpi ai giri: niente fame, niente sonno.",
        "required": false
      }
    ],
    "scopes": "Area per l'anello: 1 la stanza, 2 il palazzo. Durata per quanto resta chiuso (2 la scena, 4 la sessione). Condizioni 1 per cosa lo apre: una parola, un gesto. Bersagli per chi resta fuori.",
    "formule": [
      "ripetere"
    ]
  },
  {
    "id": "time-4-fermare-il-tempo-in-un-area",
    "name": "Fermare il tempo in un'area",
    "sphere": "time",
    "level": 4,
    "extras": [],
    "text": "La stanza in stasi, con tutto ciò che contiene: niente si muove, niente invecchia, finché non riapri.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Fermare i corpi senza danno: si svegliano come se niente fosse.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far sì che chi era dentro non si accorga della pausa.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Legare la stasi a un oggetto: finché la teca è chiusa.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far reggere la stasi contro chi vuole romperla.",
        "required": false
      }
    ],
    "scopes": "Area per quanto fermi: 1 la stanza, 2 il palazzo, 3 il quartiere. Durata per quanto resta fermo (fuori gioco: 3 il mese, 7 per sempre). Bersagli per chi ne resta fuori.",
    "formule": [
      "bloccare"
    ]
  },
  {
    "id": "time-4-sospendere-un-incantesimo",
    "name": "Sospendere un incantesimo",
    "sphere": "time",
    "level": 4,
    "extras": [],
    "text": "L'effetto dorme fuori dal flusso e attende la condizione: quando scatta, parte come se lo lanciassi adesso.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "Far scattare la condizione da sola, per caso.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far scattare l'incantesimo su un pensiero: quando pensa a te.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far dormire l'incantesimo senza contare fra le tue Magick in atto.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Far scattare l'incantesimo quando passa uno spirito.",
        "required": false
      }
    ],
    "scopes": "Condizioni 1 per la condizione che lo sveglia, e Complessità per quanto è lunga. Durata (fuori gioco) per quanto resta sospeso: 3 il mese, 5 l'anno. Gli altri Ambiti li dichiara l'incantesimo sospeso.",
    "formule": [
      "fissare"
    ]
  },
  {
    "id": "time-5-rifare-un-evento",
    "name": "Rifare un evento",
    "sphere": "time",
    "level": 5,
    "extras": [],
    "text": "Non la scena di poco fa, ma il fatto: quello che è successo smette di essere successo, e al suo posto ce n'è un altro.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Far ricordare a chi vuoi tu la versione vecchia.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far tornare i conti al mondo: nessuna cucitura visibile.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far reggere l'evento nuovo contro chi vuole rifarlo ancora.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far tornare chi è morto in quell'evento.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto indietro (fuori gioco: 3 il mese, 5 l'anno, 6 il decennio). Potenza (epicità) per quanto pesa l'evento: 5 stravolge il capitolo, 7 impatta sull'intera ambientazione.",
    "formule": [
      "cancellare"
    ]
  },
  {
    "id": "time-5-smettere-di-invecchiare",
    "name": "Smettere di invecchiare",
    "sphere": "time",
    "level": 5,
    "extras": [],
    "text": "Gli anni ti scorrono accanto: resti quello che eri il giorno in cui hai imparato.",
    "pairings": [
      {
        "sphere": "life",
        "text": "Far reggere il corpo per quello che è: niente malattie dell'età.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Tenere la mente giovane insieme al corpo.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sì che nemmeno la sorte ti consumi.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far reggere l'effetto senza mantenerlo.",
        "required": false
      }
    ],
    "scopes": "Durata 7. Bersagli per chi vuoi con te.",
    "formule": [
      "fissare"
    ]
  },
  {
    "id": "time-5-viaggiare-nel-tempo",
    "name": "Viaggiare nel tempo",
    "sphere": "time",
    "level": 5,
    "extras": [],
    "text": "Vai e torni davvero, col corpo, in un altro quando. Quello che trovi al ritorno è affar tuo.",
    "pairings": [
      {
        "sphere": "correspondence",
        "text": "Viaggiare anche nello spazio: un altro quando, un altro dove.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far reggere il corpo al viaggio.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Ricordare tutto al ritorno, e non farti notare laggiù.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Portare con te il carico: l'auto, l'attrezzatura.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Pagare il viaggio in Quintessenza invece che in Paradosso.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto lontano (fuori gioco: 5 l'anno, 6 il decennio, 7 oltre). Bersagli per chi viaggia con te. Potenza (peso) per il carico.",
    "formule": [
      "varcare"
    ]
  },
  {
    "id": "time-5-invertire-il-verso-del-tempo-in-una-valle",
    "name": "Invertire il verso del tempo in una valle",
    "sphere": "time",
    "level": 5,
    "extras": [],
    "text": "In quel luogo il tempo va al contrario, o di lato, o a spirale: chi entra invecchia all'indietro, le cose rotte si riparano, il fiume risale. Scrivi le leggi del tempo per un luogo.",
    "pairings": [
      {
        "sphere": "correspondence",
        "text": "Legare il verso del tempo a un luogo che si sposta.",
        "required": false
      },
      {
        "sphere": "life",
        "text": "Far reggere i corpi al verso nuovo.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far reggere le leggi senza mantenerle.",
        "required": false
      }
    ],
    "scopes": "Area per il luogo: 3 il quartiere, 5 la regione. Durata 7. Potenza (epicità): 7 impatta sull'intera ambientazione.",
    "formule": [
      "rivoluzionare"
    ]
  },
  {
    "id": "life-1-percepire-salute-e-condizioni",
    "name": "Percepire salute e condizioni",
    "sphere": "life",
    "level": 1,
    "extras": [],
    "text": "Guardi un corpo e sai come sta: l'età vera, l'emorragia interna, il veleno in circolo, il farmaco che mente, la gravidanza. Con più successi sai anche cosa lo guarirebbe.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Sapere anche come sta la testa: la paura, la stanchezza, il trauma.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Sapere quanto gli resta, e cosa cederà per primo.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Sapere come stava ieri, e come starà domani.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Sapere cosa ha in corpo che non è suo: il proiettile, il chip, la protesi etc..",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Sapere se il corpo è abitato da qualcosa che non è lui.",
        "required": false
      }
    ],
    "scopes": "Bersagli per un pronto soccorso intero. Precisione (dettaglio) per andare a fondo: 1 è ferito, 3 dove, 5 il veleno esatto. Durata 2 per tenere l'occhio acceso tutta la scena.",
    "formule": [
      "percepire"
    ]
  },
  {
    "id": "life-1-leggere-la-storia-di-un-corpo",
    "name": "Leggere la storia di un corpo",
    "sphere": "life",
    "level": 1,
    "extras": [],
    "text": "Le vecchie fratture, le cicatrici che non si vedono, il mestiere che ha fatto, i figli che ha avuto: il corpo racconta la vita che ha vissuto.",
    "pairings": [
      {
        "sphere": "time",
        "text": "Avere le date, e vedere il momento in cui si è fatto quella ferita.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Sapere cosa ricorda lui di ognuna.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Leggere anche la storia di quello che porta addosso: l'arma, la protesi.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Leggere anche le Macchie che ogni ferita ha lasciato sull'anima.",
        "required": false
      }
    ],
    "scopes": "Precisione (informazione) per quanto pesa quel che cerchi. Precisione (dettaglio) per un segno solo fra tanti. Durata 2 per la scena.",
    "formule": [
      "sapere"
    ]
  },
  {
    "id": "life-1-trovare-un-vivente",
    "name": "Trovare un vivente",
    "sphere": "life",
    "level": 1,
    "extras": [],
    "text": "Sai dove sta la persona, la pianta, l'animale che cerchi, e il ferito lo trovi per il sangue: la vita la senti come un calore in una direzione.",
    "pairings": [
      {
        "sphere": "correspondence",
        "text": "Trovarlo a qualunque distanza.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Trovare una persona precisa fra tante, dalla testa.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Sapere dov'era ieri.",
        "required": false
      }
    ],
    "scopes": "Area per quanto cerchi: 2 il palazzo, 3 il quartiere. Precisione (dettaglio) per il vivente esatto fra tanti. Durata 2 per tenere la traccia.",
    "formule": [
      "trovare"
    ]
  },
  {
    "id": "life-2-curare-o-causare-malattie",
    "name": "Curare o causare malattie",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "Nella vita semplice, piante, insetti, muffe, e in te stesso: la malattia arriva o se ne va. Su un altro è il terzo pallino.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "Far arrivare la malattia come una sfortuna, o far guarire come un colpo di fortuna.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far correre la malattia in un'ora, o farla durare un anno.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Creare una malattia che non esisteva.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Far viaggiare la malattia in un oggetto: l'acqua, il cibo, la lettera.",
        "required": false
      }
    ],
    "scopes": "Area per un campo, un giardino, un raccolto. Durata per quanto dura. Potenza (danni) se la malattia ferisce. Condizioni (malus 2, ostacolare) per quanto pesa.",
    "formule": [
      "maledire",
      "riparare"
    ]
  },
  {
    "id": "life-2-fingere-la-morte",
    "name": "Fingere la morte",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "Battito e respiro scendono a zero apparente: i becchini ci cascano, i medici pure. Il corpo aspetta, e si risveglia quando decidi tu.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Far sembrare morto anche a chi legge le menti: nessun pensiero in superficie.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Far sembrare morto anche a chi legge le anime.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Fissare l'ora del risveglio.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sì che nessuno controlli troppo bene.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto resti morto: 2 la scena, 4 la sessione. Bersagli per far fingere anche i compagni. Condizioni 1 per cosa ti sveglia: la parola, il tocco.",
    "formule": [
      "celare",
      "simulare"
    ]
  },
  {
    "id": "life-2-guarire-te-stesso",
    "name": "Guarire te stesso",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "Le tue ferite si chiudono: guarisci l'Areté più il numero della Potenza (danni); gli Aggravati chiedono anche una Quintessenza ciascuno.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Pagare gli Aggravati con la Quintessenza del luogo, non con la tua.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Guarire come se la ferita non fosse mai stata aperta: niente cicatrice.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Guarire insieme la Volontà.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sì che la ferita non si riapra lì.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Far uscire il proiettile mentre guarisci.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanta Salute torna.",
    "formule": [
      "riparare"
    ]
  },
  {
    "id": "life-2-immunizzarti",
    "name": "Immunizzarti",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "Il tuo sangue impara il veleno prima che faccia danno: tossine, malattie, droghe non ti toccano, per quello che hai deciso.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Immunizzarti anche da un veleno che non è organico: il gas, il metallo pesante.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Immunizzarti dal caldo, dal freddo, dalle radiazioni.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Immunizzarti dalla sfortuna del contagio: non prendi mai quello che gira.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Immunizzarti in anticipo da quello che arriverà.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Immunizzarti dai veleni fatti di Magick.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto regge: 2 la scena, 4 la sessione, 7 per sempre. Precisione (dettaglio) per il veleno esatto o per tutti. Bersagli per immunizzare i compagni.",
    "formule": [
      "resistere"
    ]
  },
  {
    "id": "life-2-ritoccarti-i-connotati",
    "name": "Ritoccarti i connotati",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "Capelli, lineamenti, colore degli occhi, dettagli: il tuo Modello, di un soffio. Resti tu, ma nessuno ti riconosce dalla foto.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Far sì che chi ti conosce non trovi strano il cambiamento.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Ritoccarti a come eri dieci anni fa, o come sarai.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Ritoccare anche i denti, le unghie, le protesi.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Prendere per caso proprio i connotati che ti servono.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto regge: 2 la scena, 4 la sessione, 7 per sempre. Precisione (dettaglio) per quanto è fine il ritocco: 1 i capelli, 3 il volto, 5 le impronte.",
    "formule": [
      "mutare"
    ]
  },
  {
    "id": "life-2-smettere-di-aver-bisogno",
    "name": "Smettere di aver bisogno",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "Fame, sete, sonno e respiro si mettono in pausa finché reggi l'effetto: stai sott'acqua, attraversi il deserto, vegli tre notti.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Smettere di aver bisogno anche di aria: i polmoni non servono.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Smettere di sentire il caldo e il freddo.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Fissare per quanto reggi, e far tornare i bisogni tutti insieme, o piano.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Nutrirti di Quintessenza invece che di cibo.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Smettere di aver bisogno di dormire anche con la testa: niente allucinazioni.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto regge: 2 la scena, 4 la sessione, 5 due sessioni. Bersagli per la Cabala.",
    "formule": [
      "potenziare"
    ]
  },
  {
    "id": "life-2-far-cedere-il-corpo",
    "name": "Far cedere il corpo",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "Il crampo, la nausea, il fiato corto, il ginocchio che molla: il corpo di chi colpisci sbaglia nel momento in cui gli serve.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "Far cedere il corpo nel momento peggiore.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Fargli credere che sia peggio di com'è.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Far arrivare il cedimento come un calore o un freddo improvviso.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più persone. Durata 1 per un turno, 2 per la scena. Condizioni (malus 2, ostacolare) per quanto pesa.",
    "formule": [
      "confondere"
    ]
  },
  {
    "id": "life-2-spegnere-il-dolore",
    "name": "Spegnere il dolore",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "Il dolore, la febbre, l'adrenalina si spengono: il ferito cammina, il malato dorme, il corpo smette di urlare. La ferita resta.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Spegnere anche la paura del dolore.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Fissare per quanto resta spento, e quando torna.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sì che il dolore non torni di colpo.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più persone. Durata 1 per un turno, 2 per la scena, 4 per la sessione.",
    "formule": [
      "spegnere"
    ]
  },
  {
    "id": "life-2-rallentare-un-corpo",
    "name": "Rallentare un corpo",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "Fatica, fiato, riflessi, sanguinamento, veleno: il corpo va più piano. Chi ti insegue si stanca, il veleno ci mette un giorno invece di un'ora.",
    "pairings": [
      {
        "sphere": "time",
        "text": "Rallentare il corpo per davvero nel tempo.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Farlo rallentare nel momento peggiore per lui.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Rallentare anche la testa insieme al corpo.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più corpi. Durata 1 per un turno, 2 per la scena. Condizioni (malus 2, ostacolare) per quanto pesa.",
    "formule": [
      "rallentare"
    ]
  },
  {
    "id": "life-3-accelerare-una-guarigione-naturale",
    "name": "Accelerare una guarigione naturale",
    "sphere": "life",
    "level": 3,
    "extras": [],
    "text": "Il corpo fa in una notte il lavoro di due settimane: ossa, ferite, febbri guariscono da sole, in fretta, e il corpo chiede da mangiare.",
    "pairings": [
      {
        "sphere": "time",
        "text": "Far cadere la convalescenza di un mese in un pomeriggio.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Dare al corpo la Quintessenza per guarire senza consumarsi.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far guarire senza complicazioni.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far dormire il corpo mentre guarisce.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più feriti. Durata per quanto corre la guarigione: 2 la scena, 4 la sessione. Potenza (danni) per quanto guarisce in più.",
    "formule": [
      "accelerare"
    ]
  },
  {
    "id": "life-3-addormentare",
    "name": "Addormentare",
    "sphere": "life",
    "level": 3,
    "extras": [],
    "text": "Il corpo del bersaglio decide che è notte fonda: la notte chimica, che nessuna sveglia discute. Con la Mente si addormenta anche la testa.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Addormentare anche la testa: niente sogni, niente risvegli.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Farlo addormentare nel momento giusto: al volante no, sul divano sì.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Far viaggiare il sonno in un oggetto: il bicchiere, il cuscino.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più persone. Area per una sala intera. Durata 1 per un turno, 2 per la scena. Condizioni (malus 3, addormentare) per quanto è profondo il sonno.",
    "formule": [
      "bloccare"
    ]
  },
  {
    "id": "life-3-animare-un-cadavere",
    "name": "Animare un cadavere",
    "sphere": "life",
    "level": 3,
    "extras": [
      {
        "sphere": "prime",
        "level": 1,
        "required": true
      }
    ],
    "text": "Il cadavere si muove senz'anima: cammina, esegue, non pensa. Serve il Primordio, che gli dà il moto; le ossa nude chiedono anche la Materia.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Dare al cadavere il moto che non ha più.",
        "required": true
      },
      {
        "sphere": "matter",
        "text": "Animare anche le ossa nude, senza carne.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Mettere dentro qualcosa che vuole: il cadavere ha opinioni.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far capire al cadavere ordini complessi.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Animare un cadavere vecchio di anni come fosse di ieri.",
        "required": false
      }
    ],
    "scopes": "Bersagli per quanti cadaveri. Durata per quanto camminano: 2 la scena, 4 la sessione. Condizioni 1 per l'ordine che eseguono. Potenza (danni) se colpiscono.",
    "formule": [
      "dominare"
    ]
  },
  {
    "id": "life-3-curare-o-causare-malattie-a-un-altro",
    "name": "Curare o causare malattie a un altro",
    "sphere": "life",
    "level": 3,
    "extras": [],
    "text": "Metti le mani su un altro corpo e la malattia arriva o se ne va: la febbre, l'infezione, il male lento. Il Modello altrui chiede il terzo pallino; nella vita semplice e su di te basta il secondo.",
    "pairings": [
      {
        "sphere": "entropy",
        "text": "Far arrivare la malattia come una sfortuna, o far guarire come un colpo di fortuna.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far correre la malattia in un'ora, o farla durare un anno.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Creare una malattia che non esisteva.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Far viaggiare la malattia in un oggetto: l'acqua, il cibo, la lettera.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Fargli credere di stare bene, o di stare male, oltre al corpo.",
        "required": false
      }
    ],
    "scopes": "Bersagli per più persone. Durata per quanto dura. Potenza (danni) se la malattia ferisce. Condizioni (malus 2, ostacolare) per quanto pesa.",
    "formule": [
      "maledire",
      "guarire"
    ]
  },
  {
    "id": "life-3-guarire-o-ferire-un-altro",
    "name": "Guarire o ferire un altro",
    "sphere": "life",
    "level": 3,
    "extras": [],
    "text": "Metti le mani sul corpo di un altro: le sue ferite si chiudono, o si aprono, per l'Areté più il numero della Potenza (danni); gli Aggravati chiedono una Quintessenza ciascuno. Il Modello altrui chiede il terzo pallino.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Pagare gli Aggravati con la Quintessenza del luogo.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Guarire come se la ferita non fosse mai stata aperta, o riaprire quella di ieri.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sì che la ferita non si riapra, o che non si chiuda mai.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Guarire o ferire insieme la Volontà.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Far uscire il proiettile mentre guarisci.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanta Salute va o viene. Bersagli per più corpi: il triage di un pronto soccorso in un gesto solo. Precisione (dettaglio) per una ferita sola fra tante.",
    "formule": [
      "guarire",
      "danneggiare"
    ]
  },
  {
    "id": "life-3-potenziare-il-fisico",
    "name": "Potenziare il fisico",
    "sphere": "life",
    "level": 3,
    "extras": [],
    "text": "Il tuo corpo risponde: attributi accresciuti, artigli, branchie, corazza, occhi da gatto etc.. Resti umano, con qualcosa in più, finché paghi la Durata.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Farti crescere una corazza di osso o di chitina che regge le pallottole.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Farti reggere il fuoco, il freddo, la corrente.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far correre i riflessi: il corpo risponde prima.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Potenziare anche la testa: la memoria, la lucidità.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto regge: 1 lo scontro, 2 la scena, 4 la sessione. Potenza (epicità) per quanto pesa il potenziamento: 1 un dettaglio, 3 stravolge la scena. Bersagli per potenziare i compagni.",
    "formule": [
      "potenziare"
    ]
  },
  {
    "id": "life-3-portare-un-volto-non-tuo",
    "name": "Portare un volto non tuo",
    "sphere": "life",
    "level": 3,
    "extras": [],
    "text": "Un volto, una voce, una ferita che non c'è: il corpo mente a chi guarda, e regge al tocco. Non cambi il Modello: gli metti sopra una maschera di carne.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Far sì che chi ti conosce non trovi strano il volto.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Far mentire anche le impronte e i documenti.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Portare il volto che avevi, o che avrai.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena, 4 per la sessione. Precisione (dettaglio) per quanto è fine: 3 un volto qualunque, 5 il volto di quell'uomo.",
    "formule": [
      "ingannare"
    ]
  },
  {
    "id": "life-3-fermare-la-mano-di-un-altro-sulla-carne",
    "name": "Fermare la mano di un altro sulla carne",
    "sphere": "life",
    "level": 3,
    "extras": [],
    "text": "Mentre un altro mago tocca un corpo, per guarirlo, ferirlo o cambiarlo, tu gli chiudi la carne: il suo effetto non prende. Si tira contro il suo lancio; vince chi ha più successi.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Far nascere stanco qualunque suo effetto, non solo quelli sulla carne.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far inceppare il suo lancio nel punto debole.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Fargli credere che la carne abbia risposto.",
        "required": false
      }
    ],
    "scopes": "Potenza (epicità) nel braccio di ferro. Durata 1 per un lancio, 2 per tutta la scena. Bersagli per proteggere più corpi.",
    "formule": [
      "contrastare"
    ]
  },
  {
    "id": "life-4-diventare-interamente-altro",
    "name": "Diventare interamente altro",
    "sphere": "life",
    "level": 4,
    "extras": [],
    "text": "Il tuo Modello cambia da capo: un'altra faccia, un'altra taglia, un altro sesso, un'altra età, e ci resti finché paghi la Durata.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Far sì che chi ti conosceva ti riconosca lo stesso, o no.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Diventare chi eri, o chi sarai.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Portarti dietro gli abiti e gli oggetti nella misura nuova.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Cambiare anche il riflesso di là: nemmeno gli spiriti ti riconoscono.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far reggere la forma nuova senza mantenerla.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto regge: 2 la scena, 4 la sessione, 7 per sempre. Precisione (dettaglio) per quanto è fine la copia: 3 un volto qualunque, 5 il volto di quell'uomo.",
    "formule": [
      "trasformare"
    ]
  },
  {
    "id": "life-4-guarire-l-inguaribile",
    "name": "Guarire l'inguaribile",
    "sphere": "life",
    "level": 4,
    "extras": [],
    "text": "Ciò che la medicina dichiara irreversibile torna indietro: la paralisi, la cecità, l'organo perso, il male che non si cura. Il corpo regge; il resto è affar suo.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Ricreare quello che manca: l'organo, l'arto.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Riportare il corpo a prima del male.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Guarire insieme la mente che ha convissuto col male.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sì che il male non torni mai.",
        "required": false
      }
    ],
    "scopes": "Potenza (danni) per quanto guarisce. Bersagli per più corpi. Durata 7 perché resti.",
    "formule": [
      "risanare"
    ]
  },
  {
    "id": "life-4-ringiovanire-un-corpo",
    "name": "Ringiovanire un corpo",
    "sphere": "life",
    "level": 4,
    "extras": [],
    "text": "Gli anni escono dalla carne: la pelle si distende, le ossa tornano forti, il cuore riprende il passo di vent'anni prima. Il corpo torna giovane per quello che è.",
    "pairings": [
      {
        "sphere": "time",
        "text": "Riportare il corpo a com'era davvero in quell'anno, cicatrici comprese.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Ringiovanire anche la mente, o lasciarle tutta la memoria.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far reggere la giovinezza senza mantenerla.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sì che gli anni non tornino di colpo.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto regge: 4 la sessione, 7 per sempre. Potenza (epicità) per quanti anni: 2 dieci anni, 5 una vita. Bersagli per più corpi.",
    "formule": [
      "risanare"
    ]
  },
  {
    "id": "life-4-riscrivere-il-corpo-di-un-altro",
    "name": "Riscrivere il corpo di un altro",
    "sphere": "life",
    "level": 4,
    "extras": [],
    "text": "Forma, proporzioni, funzioni: esce diverso da come è entrato. Più alto, più forte, con un'altra faccia, con branchie etc..",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Far sì che lui non trovi strano il corpo nuovo.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Riscriverlo a com'era, o a come sarà.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Riscrivere anche quello che porta in corpo: le protesi, i denti.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Aggiungere carne che non c'era.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto regge: 2 la scena, 4 la sessione, 7 per sempre. Potenza (epicità) per quanto cambia: 1 un dettaglio, 4 impatta sul capitolo. Bersagli per più corpi.",
    "formule": [
      "trasformare"
    ]
  },
  {
    "id": "life-4-trasformare-in-animale",
    "name": "Trasformare in animale",
    "sphere": "life",
    "level": 4,
    "extras": [],
    "text": "Il Modello passa a un'altra specie, con quello che comporta pensarci dentro: il lupo pensa da lupo, il corvo vola da corvo. Tu, o un altro.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Tenere la testa umana dentro l'animale, o toglierla del tutto.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Trasformare anche il riflesso di là: gli spiriti vedono un animale.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Portarti dietro gli oggetti nella forma nuova.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Fissare l'ora in cui torni umano.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Trasformare in un animale che non esiste.",
        "required": false
      }
    ],
    "scopes": "Durata per quanto regge: 2 la scena, 4 la sessione, 7 per sempre. Potenza (peso) per quanto cambia la taglia: 1 il gatto, 3 il cavallo. Bersagli per più persone.",
    "formule": [
      "trasformare"
    ]
  },
  {
    "id": "life-4-un-cadavere-che-passa-i-controlli",
    "name": "Un cadavere che passa i controlli",
    "sphere": "life",
    "level": 4,
    "extras": [],
    "text": "Un cadavere vero per il medico legale, un corpo che passa ogni controllo: il sangue, il DNA, le impronte, l'età dicono quello che vuoi tu.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Far mentire anche gli oggetti addosso: i vestiti, il portafoglio.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far ricordare a chi serve di aver conosciuto quel corpo.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Dare al corpo l'età e la storia giuste.",
        "required": false
      }
    ],
    "scopes": "Precisione (dettaglio) per quanto è fine: 3 il volto, 5 il DNA. Potenza (epicità) per quanto pesa nella storia. Durata 7.",
    "formule": [
      "simulare"
    ]
  },
  {
    "id": "life-5-creare-un-organismo",
    "name": "Creare un organismo",
    "sphere": "life",
    "level": 5,
    "extras": [
      {
        "sphere": "prime",
        "level": 1,
        "required": true
      }
    ],
    "text": "Vita nuova, con una forma che decidi tu e una fame che decide lei. Serve il Primordio, che dà la carne dove manca.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Dare la carne dove manca.",
        "required": true
      },
      {
        "sphere": "mind",
        "text": "Dare all'organismo una mente: pensa, ricorda, obbedisce.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Dare all'organismo un'anima.",
        "required": false
      },
      {
        "sphere": "matter",
        "text": "Dare all'organismo parti che non sono carne: il guscio, gli artigli di metallo.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Farlo nascere già adulto, o farlo crescere in un'ora.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto è grande: 1 il topo, 2 l'uomo, 3 il cavallo. Potenza (epicità) per quanto pesa: 3 stravolge una scena, 6 impatta sulla storia. Durata per quanto vive (7 per sempre).",
    "formule": [
      "inventare"
    ]
  },
  {
    "id": "life-5-metamorfosi-senza-limiti",
    "name": "Metamorfosi senza limiti",
    "sphere": "life",
    "level": 5,
    "extras": [],
    "text": "Massa, specie e scala smettono di essere un problema: diventi la balena, lo sciame, il bosco, e torni.",
    "pairings": [
      {
        "sphere": "matter",
        "text": "Diventare anche qualcosa che non è vivo, e restare vivo dentro.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Cambiare anche il riflesso di là, e passare il Velo nella forma nuova.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Tenere la testa tua in qualunque forma.",
        "required": false
      },
      {
        "sphere": "forces",
        "text": "Diventare energia: il fuoco, il fulmine.",
        "required": false
      },
      {
        "sphere": "correspondence",
        "text": "Essere lo sciame in due luoghi insieme.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Far reggere la forma senza mantenerla.",
        "required": false
      }
    ],
    "scopes": "Potenza (peso) per quanto cambia la massa: 4 il tir, 6 il grattacielo. Durata per quanto regge: 2 la scena, 4 la sessione. Bersagli per trasformare anche altri.",
    "formule": [
      "trasformare"
    ]
  },
  {
    "id": "life-5-rendere-permanente-il-mutamento",
    "name": "Rendere permanente il mutamento",
    "sphere": "life",
    "level": 5,
    "extras": [],
    "text": "Quello che hai riscritto smette di poter tornare indietro, e diventa il suo Modello vero: la forma nuova è lui, per sempre, per tutti.",
    "pairings": [
      {
        "sphere": "prime",
        "text": "Far entrare il mutamento nell'Arazzo: nemmeno il Paradosso lo disfa.",
        "required": false
      },
      {
        "sphere": "time",
        "text": "Far sì che sia sempre stato così.",
        "required": false
      },
      {
        "sphere": "mind",
        "text": "Far sì che lui, e chi lo conosce, non ricordino l'altro corpo.",
        "required": false
      },
      {
        "sphere": "entropy",
        "text": "Far sì che nessuna sorte lo consumi.",
        "required": false
      }
    ],
    "scopes": "Durata 7, e basta. Potenza (epicità) per quanto pesa: 4 impatta sul capitolo, 6 impatta sulla storia. Bersagli per più corpi.",
    "formule": [
      "fissare"
    ]
  },
  {
    "id": "life-5-nessuna-ferita-ti-tocca",
    "name": "Nessuna ferita ti tocca",
    "sphere": "life",
    "level": 5,
    "extras": [],
    "text": "Per la scena niente tocca il tuo corpo: ferite, veleni, malattie, fatica. La lama entra e la carne non se ne accorge.",
    "pairings": [
      {
        "sphere": "forces",
        "text": "Non essere toccato nemmeno dal fuoco e dal fulmine.",
        "required": false
      },
      {
        "sphere": "prime",
        "text": "Non essere toccato nemmeno dalla Magick sul corpo.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Non essere toccato nemmeno dai colpi di là.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena, 4 per la sessione. Bersagli per la Cabala.",
    "formule": [
      "invulnerabilita"
    ]
  },
  {
    "id": "life-5-usare-il-corpo-di-un-altro-come-il-tuo",
    "name": "Usare il corpo di un altro come il tuo",
    "sphere": "life",
    "level": 5,
    "extras": [
      {
        "sphere": "mind",
        "level": 1,
        "required": true
      }
    ],
    "text": "Il corpo di un altro risponde a te come il tuo: lo muovi da lontano, ci vedi, ci parli, mentre il tuo aspetta. Serve la Mente, che ti ci porta dentro.",
    "pairings": [
      {
        "sphere": "mind",
        "text": "Entrare nella sua testa e prendere i comandi.",
        "required": true
      },
      {
        "sphere": "correspondence",
        "text": "Usare un corpo lontano.",
        "required": false
      },
      {
        "sphere": "spirit",
        "text": "Usare il corpo mentre chi c'era dentro aspetta di là.",
        "required": false
      }
    ],
    "scopes": "Durata 2 per la scena, 4 per la sessione. Potenza (epicità) nel braccio di ferro con chi c'è dentro.",
    "formule": [
      "possedere"
    ]
  }
]);

export const FORMULE = Object.freeze([
  {
    "id": "percepire",
    "name": "Percepire",
    "grade": 1,
    "text": "Capisci la presenza o l'assenza di ciò che sta nel dominio della Sfera.",
    "subjects": {
      "correspondence": "Distanze e vani nascosti; chi ti osserva da lontano; un luogo remoto",
      "entropy": "La fortuna toccata, la sfortuna costruita, il caso vero dal caso orientato",
      "forces": "Energia, calore, corrente, radiazioni; le sagome oltre la parete",
      "matter": "Pieni e vuoti, il doppio fondo, il metallo sotto la stoffa, la magia su un oggetto",
      "mind": "L'umore di una folla o di un luogo, e da dove arriva",
      "prime": "La magia calda, la firma, la Quintessenza in un Nodo, in una Meraviglia, in un mago",
      "spirit": "La Penumbra, il Velo, le cariche mistiche; la vista che va lontano di là",
      "time": "L'ora esatta, le anomalie, le cuciture; la scena passata o futura che rivive",
      "life": "Salute, età vera, emorragie, il farmaco che mente"
    }
  },
  {
    "id": "prevedere",
    "name": "Prevedere",
    "grade": 1,
    "text": "Un'idea di cosa sta per accadere; il dettaglio dipende dal soggetto e dai successi.",
    "subjects": {
      "entropy": "Gli eventi: quanto sono probabili, quanto manca alla rottura, alla rovina, alla fine",
      "forces": "Quanto resta a un'energia: la batteria, il quadro, il motore, il temporale",
      "mind": "Una persona, una fata: cosa vuole fare, le intenzioni, i desideri",
      "time": "I punti fissi che accadranno, o gli indizi; il primo istante della violenza"
    }
  },
  {
    "id": "ritoccare",
    "name": "Ritoccare",
    "grade": 1,
    "text": "L'effetto minimo: la candela, la moneta, la porta che non cigola.",
    "subjects": {
      "correspondence": "La cosa che era a portata di mano, il passo in meno",
      "entropy": "La moneta, il dado, il semaforo che diventa verde",
      "forces": "La candela, la lampadina, la tacca di segnale, il fiammifero",
      "matter": "La macchia, il nodo, la serratura che scatta al secondo colpo",
      "mind": "Il nome che torna in mente, il sorriso, la distrazione di un secondo",
      "prime": "L'aura più quieta, la candela votiva che non si spegne",
      "spirit": "Il brivido nella stanza, il cane che smette di abbaiare",
      "time": "L'orologio che ritarda un minuto, il tempismo",
      "life": "Il mal di testa, il singhiozzo, la mano che smette di tremare"
    }
  },
  {
    "id": "sapere",
    "name": "Sapere",
    "grade": 1,
    "text": "Leggi cosa c'è dentro una cosa, un luogo, una persona.",
    "subjects": {
      "correspondence": "I fili: quale chiave apre cosa, chi è passato e dove; con Materia la pianta dei dintorni",
      "entropy": "Il punto debole di un muro, di un alibi, di un piano; le catene fra i guasti",
      "forces": "La dinamica della scena, chi era seduto lì, dove va la corrente",
      "matter": "Un oggetto, un edificio, un Cyborg: composizione, struttura, storia, processo; con Vita il commestibile",
      "mind": "Una persona, una fata: emozioni, bugie, pensieri, ricordi, la leva",
      "prime": "Un effetto di Magick, una reliquia: la firma di chi ha lanciato",
      "spirit": "Un'anima, un luogo, l'altro lato: integrità, cosa è morto qui, chi comanda di là",
      "time": "Il passato di una persona o di un luogo, a ritroso",
      "life": "Un corpo, un animale: fratture, cicatrici, mestiere, età vera"
    }
  },
  {
    "id": "trovare",
    "name": "Trovare",
    "grade": 1,
    "text": "Sai dove sta ciò che cerchi, e dove va.",
    "subjects": {
      "correspondence": "Qualunque elemento, a lunga distanza; con un'altra Sfera accanto, il filtro",
      "forces": "Una fonte di energia, un motore acceso, chi sta trasmettendo",
      "matter": "Un oggetto, un Cyborg, un metallo, una lega",
      "mind": "Una persona, una fata; chi pensa a te",
      "prime": "Un effetto di Magick, una reliquia, un Risvegliato, un Nodo",
      "spirit": "Uno spirito, un licantropo, un morto rimasto",
      "time": "Le anomalie temporali, dove il tempo è stato rifatto",
      "life": "Una persona, una pianta, un animale; il ferito, per sangue"
    }
  },
  {
    "id": "accelerare",
    "name": "Accelerare",
    "grade": 2,
    "text": "Rendi più veloce un corpo, un movimento, un processo.",
    "subjects": {
      "forces": "Ciò che si muove: la massa in volo, la corrente, il motore, la fiamma",
      "time": "Te stesso, un altro; con Vita una stagione, un corpo; con Materia un oggetto",
      "life": "Una guarigione, una crescita, una digestione, un animale che matura"
    }
  },
  {
    "id": "celare",
    "name": "Celare",
    "grade": 2,
    "text": "Nascondi il vero: alla vista, all'udito, alla memoria, ai controlli.",
    "subjects": {
      "correspondence": "Un luogo, dalla divinazione e dalla mira a distanza",
      "entropy": "Te stesso, un gruppo: gli sguardi scivolano altrove",
      "forces": "Te stesso alla vista e all'udito; con Vita anche in movimento",
      "mind": "Te stesso nella memoria altrui; i tuoi pensieri",
      "prime": "La tua aura, la tua firma, un effetto lanciato",
      "spirit": "Te stesso, un luogo, agli occhi dell'altro lato",
      "life": "Il battito e il respiro, i connotati"
    }
  },
  {
    "id": "comunicare",
    "name": "Comunicare",
    "grade": 2,
    "text": "Parli e ricevi risposta dove la voce non arriva.",
    "subjects": {
      "correspondence": "Chi è nel luogo che stai osservando a distanza",
      "forces": "La voce proiettata lontano, la trasmissione in una radio o in un telefono",
      "mind": "Una persona, una fata, la Cabala; qualunque lingua",
      "spirit": "Uno spirito, il famiglio, il patrono; la trattativa formale"
    }
  },
  {
    "id": "confondere",
    "name": "Confondere",
    "grade": 2,
    "text": "Dai un malus: perde dadi, perde l'azione, perde il filo.",
    "subjects": {
      "entropy": "Una persona, un gruppo: inciampa, l'arma si inceppa, la serratura non scatta",
      "forces": "Chi si muove: il pavimento di ghiaccio o colla, la luce negli occhi, il frastuono",
      "matter": "Ciò che deve usare: la porta che pesa, l'arma goffa, la maniglia scivolosa",
      "mind": "Una persona, una fata: la paura che sale, il filo perso",
      "life": "Un corpo, un animale: il crampo, la nausea, il fiato corto"
    }
  },
  {
    "id": "creare",
    "name": "Creare",
    "grade": 2,
    "text": "Fai esistere una cosa semplice, e la cosa è vera.",
    "subjects": {
      "forces": "Con Primordio: una fiamma, una scintilla, un lampo, un suono, una scarica",
      "matter": "Con Primordio: un coltello, una chiave, dell'acqua, una corda",
      "mind": "Un pensiero, un'emozione nuova, un'immagine mentale",
      "prime": "Energia grezza: dardi e lame di luce finché la Quintessenza regge"
    }
  },
  {
    "id": "mutare",
    "name": "Mutare",
    "grade": 2,
    "text": "Cambi un dettaglio e lasci intatto il resto.",
    "subjects": {
      "forces": "Il colore della fiamma, il tono della luce, la frequenza del suono",
      "matter": "Un oggetto, una parete: gli appigli, i denti della chiave, la lega dei proiettili",
      "life": "I tuoi connotati: capelli, lineamenti, impronte, voce"
    }
  },
  {
    "id": "potenziare",
    "name": "Potenziare",
    "grade": 2,
    "text": "Dai un bonus: è più di quello che era.",
    "subjects": {
      "entropy": "Una cosa vecchia che regge, un motore che parte, un piano che tiene",
      "forces": "La brace, il suono, la corrente, il colpo",
      "matter": "Un vestito, una lama, una corda, un veicolo",
      "mind": "La concentrazione, la memoria, la calma; con Primordio una facoltà nuova",
      "prime": "Un'arma: danni Aggravati, morde anche gli spiriti",
      "spirit": "Un oggetto svegliato che lavora per te",
      "time": "L'iniziativa: il vantaggio del primo istante",
      "life": "Il tuo corpo: attributi, artigli, branchie, corazza; i bisogni in pausa"
    }
  },
  {
    "id": "proteggere",
    "name": "Proteggere",
    "grade": 2,
    "text": "Pari: il colpo arriva e non passa.",
    "subjects": {
      "correspondence": "Te stesso dalla mira e dalla Magick a distanza",
      "entropy": "La catena dei guasti: il disastro si ferma dov'è",
      "forces": "Te stesso, un altro: lo scudo di energia contro i colpi",
      "matter": "Un vestito, una barricata, una porta",
      "mind": "La tua psiche, un ricordo",
      "prime": "Il Paradosso e il Contraccolpo, attutiti o traslati",
      "spirit": "Te stesso dagli spiriti e dalla possessione",
      "time": "Te stesso: il passo nel futuro che scarta il colpo"
    }
  },
  {
    "id": "rallentare",
    "name": "Rallentare",
    "grade": 2,
    "text": "Rendi più lento un corpo, un movimento, un processo.",
    "subjects": {
      "forces": "Ciò che si muove: la massa in volo, il motore, il fuoco, la corrente",
      "matter": "Ciò che deve muovere: pesi raddoppiati, porte di piombo",
      "time": "Una persona, un gruppo, un'area",
      "life": "Un corpo, un animale: fatica, fiato, riflessi, sanguinamento, veleno"
    }
  },
  {
    "id": "riparare",
    "name": "Riparare",
    "grade": 2,
    "text": "Riporti a funzionare una cosa, o rimargini te stesso.",
    "subjects": {
      "forces": "Un motore, un impianto, una corrente, una fiamma",
      "matter": "Un oggetto, un ingranaggio, un vetro, un edificio, un Cyborg",
      "mind": "La tua Volontà",
      "life": "Le tue ferite, la tua malattia"
    }
  },
  {
    "id": "spegnere",
    "name": "Spegnere",
    "grade": 2,
    "text": "Spegni senza rompere: fiamma, suono, corrente, emozione, dolore.",
    "subjects": {
      "forces": "Fiamma, suono, corrente, calore, luce, motore",
      "mind": "Un'emozione: la rabbia, la paura, l'entusiasmo",
      "life": "Il dolore, la febbre, l'adrenalina"
    }
  },
  {
    "id": "spostare",
    "name": "Spostare",
    "grade": 2,
    "text": "Muovi da qui a là: sollevi, scagli, richiami, voli.",
    "subjects": {
      "correspondence": "Un oggetto richiamato, due cose scambiate, una pallottola estratta, le prove disperse",
      "forces": "Un proiettile deviato, il calore, un oggetto scagliato, te stesso in volo o sulla parete",
      "prime": "La Quintessenza, da un Nodo alla tua Ruota o a quella di un altro mago"
    }
  },
  {
    "id": "suggestionare",
    "name": "Suggestionare",
    "grade": 2,
    "text": "Inclini l'umore e la scelta di qualcuno, senza che se ne accorga.",
    "subjects": {
      "entropy": "Con Mente: l'idea che torna in mente al momento giusto, per coincidenza",
      "mind": "Una persona, una fata, un gruppo: emozioni accese o spente, idee seminate"
    }
  },
  {
    "id": "benedire",
    "name": "Benedire",
    "grade": 3,
    "text": "La sorte lavora a favore, nel tempo.",
    "subjects": {
      "entropy": "Una persona, un gruppo, un luogo: il dado, la carta, il colpo che manca per un soffio"
    }
  },
  {
    "id": "condizionare",
    "name": "Condizionare",
    "grade": 3,
    "text": "Fa quello che vuoi tu, e lo crede suo.",
    "subjects": {
      "correspondence": "Chi percorre una strada: arriva dove hai deciso tu",
      "entropy": "Una persona: le coincidenze lo portano dove vuoi",
      "mind": "Una persona, una fata: dice tutto, sceglie la porta che volevi, sogna ciò che gli dici"
    }
  },
  {
    "id": "contrastare",
    "name": "Contrastare",
    "grade": 3,
    "text": "Fermi la Magick di un altro mentre la lancia.",
    "subjects": {
      "correspondence": "Fili, varchi e ponti altrui",
      "entropy": "La fortuna comprata e le maledizioni altrui",
      "forces": "L'energia scagliata da altri",
      "matter": "La materia che un altro sta plasmando",
      "mind": "Illusioni, ordini e letture altrui",
      "prime": "La Quintessenza altrui: l'effetto nasce stanco",
      "spirit": "Evocazioni e varchi nel Velo altrui",
      "time": "Gli istanti rubati da altri",
      "life": "La carne che un altro sta toccando"
    }
  },
  {
    "id": "drenare",
    "name": "Drenare",
    "grade": 3,
    "text": "Prendi per te ciò che lo teneva in piedi.",
    "subjects": {
      "entropy": "La fortuna di una persona, che passa a te",
      "forces": "Il calore di una stanza, la corrente, tutta l'energia in scena",
      "prime": "Un Nodo, una Meraviglia, una creatura, un mago: la Quintessenza"
    }
  },
  {
    "id": "evocare",
    "name": "Evocare",
    "grade": 3,
    "text": "Chiami qui chi esiste altrove, e viene.",
    "subjects": {
      "forces": "L'energia che c'è altrove: la corrente della città, il fuoco del camino, il vento",
      "spirit": "Uno spirito, il famiglio, un'entità, un morto recente"
    }
  },
  {
    "id": "danneggiare",
    "name": "Danneggiare",
    "grade": 3,
    "text": "Fai danno al soggetto: con la forza, con il fuoco, con la mente, con la sorte, con l'anima.",
    "subjects": {
      "entropy": "Uno spirito con Primordio; la carne che marcisce",
      "forces": "Una persona, un gruppo, un veicolo: telecinesi, onda d'urto, fuoco, fulmine; Aggravato se l'energia lo giustifica",
      "matter": "Un vampiro, un Cyborg; la carne trattata come materiale, Volgare",
      "mind": "Una persona, una fata: la Volontà",
      "prime": "Qualunque Modello, alla radice",
      "spirit": "Uno spirito, un licantropo con Vita; l'anima, la Saggezza",
      "time": "Un corpo, con Vita: decenni in un istante",
      "life": "Una persona, un animale, un vampiro, un licantropo con Spirito"
    }
  },
  {
    "id": "guarire",
    "name": "Guarire",
    "grade": 3,
    "text": "Riporti un altro com'era prima del danno.",
    "subjects": {
      "mind": "La Volontà di un altro",
      "time": "Con Vita: le ferite riavvolte",
      "life": "Una persona, un animale, una pianta: ferite, malattie, veleni"
    }
  },
  {
    "id": "ingannare",
    "name": "Ingannare",
    "grade": 3,
    "text": "Fai vedere il falso: illusioni, immagini, voci, volti.",
    "subjects": {
      "forces": "Con Primordio: un'immagine vera di luce e suono, telecamere comprese",
      "mind": "Una persona, una fata, i presenti: l'illusione nella testa",
      "time": "Chi è con te: un passato o un futuro che non è quello vero",
      "life": "Un volto, una voce, una ferita che non c'è"
    }
  },
  {
    "id": "maledire",
    "name": "Maledire",
    "grade": 3,
    "text": "La sorte lavora contro, nel tempo.",
    "subjects": {
      "entropy": "Una persona, un gruppo, un luogo: guasti, inciampi, disastri",
      "life": "Una persona, un animale: la malattia che entra"
    }
  },
  {
    "id": "resistere",
    "name": "Resistere",
    "grade": 3,
    "text": "Ciò che ti entra dentro non fa presa.",
    "subjects": {
      "entropy": "La sfortuna e le maledizioni",
      "forces": "Fuoco, fulmine, freddo, suono",
      "mind": "Suggestioni, letture, ordini",
      "spirit": "Spiriti, possessione, l'attrito del Velo",
      "life": "Veleni, malattie, fatica"
    }
  },
  {
    "id": "riavvolgere",
    "name": "Riavvolgere",
    "grade": 3,
    "text": "Riporti indietro gli ultimi istanti.",
    "subjects": {
      "time": "Una scena; con Vita un corpo; con Materia un oggetto"
    }
  },
  {
    "id": "trasformare",
    "name": "Trasformare",
    "grade": 3,
    "text": "Cambi la forma e lasci la sostanza.",
    "subjects": {
      "forces": "La sagoma dell'energia: il fulmine a sfera, la fiamma modellata",
      "matter": "Un oggetto, una strada, una parete, un veicolo",
      "life": "Il tuo corpo, il corpo di un altro, un animale: un'altra forma, un'altra specie"
    }
  },
  {
    "id": "varcare",
    "name": "Varcare",
    "grade": 3,
    "text": "Passi un confine che il mondo non concede: la distanza, il Velo, un istante.",
    "subjects": {
      "correspondence": "Lo spazio: il teletrasporto, la mano oltre il varco, il ponte per la tua Magick",
      "mind": "Con Spirito e Primordio: la tua forma di luce",
      "spirit": "Il Velo, in carne e ossa",
      "time": "Un turno oltre il presente; il viaggio vero, in cima alla Sfera"
    }
  },
  {
    "id": "aprire",
    "name": "Aprire",
    "grade": 4,
    "text": "Apri o chiudi un passaggio che resta per tutti.",
    "subjects": {
      "correspondence": "Un portale stabile, una tasca fuori dal mondo",
      "spirit": "Il Velo, assottigliato o chiuso; un passaggio altrui chiuso per sempre"
    }
  },
  {
    "id": "barriera",
    "name": "Barriera",
    "grade": 4,
    "text": "Chiudi un perimetro: dentro non entra niente.",
    "subjects": {
      "correspondence": "Varchi e divinazioni: la stanza fuori dalla geometria",
      "entropy": "Il caso: dentro non capitano incidenti, e nemmeno fortune",
      "forces": "Energia: proiettili, fuoco, vento, suono restano fuori",
      "matter": "Le aperture: muro pieno, nessuna porta si apre",
      "prime": "La Magick altrui e la Quintessenza",
      "spirit": "Gli spiriti e la possessione"
    }
  },
  {
    "id": "bloccare",
    "name": "Bloccare",
    "grade": 4,
    "text": "Fermi qualcosa finché non decidi tu.",
    "subjects": {
      "correspondence": "Una persona: nessun varco la porta via",
      "forces": "Ciò che si muove: l'auto, il treno, il proiettile fermo a mezz'aria",
      "matter": "Una persona: il pavimento che inghiotte, il metallo ai polsi",
      "mind": "Una persona, una fata: il sonno, il compito assurdo",
      "spirit": "Uno spirito, un licantropo: la trappola, niente poteri e niente fuga",
      "time": "Una stanza in stasi con ciò che contiene",
      "life": "Un corpo, un animale: il sonno, la paralisi"
    }
  },
  {
    "id": "cancellare",
    "name": "Cancellare",
    "grade": 4,
    "text": "Disfai ciò che è stato fatto.",
    "subjects": {
      "entropy": "Una maledizione, una coincidenza costruita",
      "mind": "Un ricordo, una conversazione, un volto",
      "prime": "Una Meraviglia, un incantesimo altrui",
      "spirit": "Una possessione, un varco, un'entità esiliata",
      "time": "Un giorno intero; in cima, l'evento stesso"
    }
  },
  {
    "id": "costruire",
    "name": "Costruire",
    "grade": 4,
    "text": "Fai esistere una cosa complessa che regge da sola.",
    "subjects": {
      "forces": "Con Primordio: un piccolo sole, una fonte autonoma",
      "matter": "Un motore, un edificio, un veicolo, un Cyborg",
      "life": "Con Materia e Primordio: l'innesto nel corpo, l'organo nuovo"
    }
  },
  {
    "id": "distruggere",
    "name": "Distruggere",
    "grade": 4,
    "text": "Fai smettere di esistere o di funzionare una cosa.",
    "subjects": {
      "entropy": "Un oggetto, una macchina: il guasto certo; con Tempo la polvere",
      "forces": "L'elettronica di una stanza, l'energia di un isolato",
      "matter": "Un oggetto, una serranda, un edificio, un Cyborg; con Tempo la ruggine di decenni",
      "time": "Con Entropia o Materia: la cosa invecchiata fino a cadere"
    }
  },
  {
    "id": "dominare",
    "name": "Dominare",
    "grade": 4,
    "text": "Dai un ordine, e obbedisce.",
    "subjects": {
      "entropy": "Con Tempo: il domani, fra quelli possibili",
      "forces": "Energia, fuoco, corrente, il meteo su un perimetro",
      "matter": "Con Primordio: le ossa nude in piedi",
      "mind": "Una persona, una fata, un gruppo: l'ordine assoluto",
      "spirit": "Uno spirito evocato; con Mente per nome",
      "life": "Con Primordio: un cadavere che cammina; il corpo di un altro"
    }
  },
  {
    "id": "ripetere",
    "name": "Ripetere",
    "grade": 4,
    "text": "Chiudi in un anello: gli stessi minuti, ancora e ancora.",
    "subjects": {
      "time": "Con Mente: un'area, una scena, tre minuti in anello"
    }
  },
  {
    "id": "risanare",
    "name": "Risanare",
    "grade": 4,
    "text": "Riporti indietro ciò che era dichiarato perduto.",
    "subjects": {
      "mind": "Una mente lacerata, una Volontà a pezzi, una personalità riscritta da altri",
      "spirit": "Con Vita: le Macchie sull'anima, dopo la prova",
      "life": "Una persona, un animale: l'inguaribile, l'arto, la vecchia frattura"
    }
  },
  {
    "id": "rivelare",
    "name": "Rivelare",
    "grade": 4,
    "text": "Qualunque domanda sul dominio ha risposta.",
    "subjects": {
      "correspondence": "Lo spazio piegato senza autore, chi ti guarda e da dove",
      "entropy": "Chi ha pagato la fortuna, e a chi va il resto",
      "forces": "L'energia senza causa",
      "matter": "La lega impossibile, l'oggetto mai fabbricato, la mano che l'ha fatto",
      "mind": "Il pensiero non suo, il ricordo senza vita dietro",
      "prime": "La Quintessenza che non dovrebbe esserci, la magia senza autore",
      "spirit": "Cosa si muove là in fondo, e perché ti ha visto",
      "time": "La seconda stesura del mondo, e chi la corregge",
      "life": "Chi era quella persona, e chi l'ha cambiata"
    }
  },
  {
    "id": "simulare",
    "name": "Simulare",
    "grade": 4,
    "text": "Un falso che regge a ogni verifica.",
    "subjects": {
      "entropy": "Un alibi che le coincidenze confermano",
      "forces": "Con Mente e Primordio: la scena che tutti vedono e toccano",
      "matter": "Documenti e oggetti che ogni perizia dichiara veri",
      "mind": "Un'identità, una scena vissuta da tutti",
      "life": "Un cadavere vero per il medico legale, un corpo che passa i controlli"
    }
  },
  {
    "id": "trasmutare",
    "name": "Trasmutare",
    "grade": 4,
    "text": "Cambi la sostanza: cosa è, non che forma ha.",
    "subjects": {
      "forces": "Un'energia in un'altra: luce in calore, suono in urto",
      "matter": "Un metallo, un'aria, un oggetto; con Vita e Primordio il metallo nel corpo",
      "mind": "Una personalità, in cima alla Sfera",
      "spirit": "Un Dormiente che si Risveglia, in cima alla Sfera",
      "life": "Un corpo: carne che diventa altro; con Materia e Primordio l'innesto"
    }
  },
  {
    "id": "vincolare",
    "name": "Vincolare",
    "grade": 4,
    "text": "Un legame che resta e regge da solo.",
    "subjects": {
      "correspondence": "Una persona, un oggetto: il marchio che corre in due sensi",
      "entropy": "Un giuramento, in cima alla Sfera",
      "mind": "La Cabala, due menti",
      "prime": "Un oggetto consacrato, uno spirito consenziente nel Feticcio",
      "spirit": "Uno spirito nell'oggetto, l'Avatar di un Risvegliato"
    }
  },
  {
    "id": "annientare",
    "name": "Annientare",
    "grade": 5,
    "text": "Non torna più, per nessuno.",
    "subjects": {
      "matter": "Una sostanza, in quel punto del mondo",
      "prime": "Un Nodo, fino alla radice",
      "spirit": "L'Avatar di un Risvegliato"
    }
  },
  {
    "id": "destinare",
    "name": "Destinare",
    "grade": 5,
    "text": "Riscrivi il destino.",
    "subjects": {
      "entropy": "Una persona, due persone, un luogo; con Primordio la vita che non era prevista"
    }
  },
  {
    "id": "fissare",
    "name": "Fissare",
    "grade": 5,
    "text": "Metti fuori dal flusso: permanente, radicato, sospeso.",
    "subjects": {
      "matter": "Un mutamento reso definitivo",
      "prime": "Un incantesimo radicato nell'Arazzo",
      "time": "Un punto fermo, un effetto sospeso, gli anni che ti scorrono accanto",
      "life": "Un corpo riscritto che diventa il suo Modello vero"
    }
  },
  {
    "id": "inventare",
    "name": "Inventare",
    "grade": 5,
    "text": "Fai esistere ciò che non esisteva per nessuno.",
    "subjects": {
      "forces": "Un'energia nuova",
      "matter": "Una lega impossibile",
      "mind": "Con Primordio: una coscienza",
      "prime": "Un Nodo, la Quintessenza dal nulla",
      "spirit": "Con Primordio: un'entità nuova, un Regno",
      "life": "Con Primordio: un organismo nuovo"
    }
  },
  {
    "id": "invulnerabilita",
    "name": "Invulnerabilità",
    "grade": 5,
    "text": "Niente ti tocca, per la scena.",
    "subjects": {
      "forces": "Ogni energia: fuoco, fulmine, urto, freddo",
      "mind": "Ogni mente altrui",
      "prime": "La Magick altrui e il Paradosso",
      "life": "Ogni ferita, veleno, malattia"
    }
  },
  {
    "id": "possedere",
    "name": "Possedere",
    "grade": 5,
    "text": "È tuo anche quando non ci sei.",
    "subjects": {
      "mind": "Una persona: l'ordine dormiente, la mente che torna",
      "spirit": "Un corpo che non è tuo, abitato",
      "life": "Con Mente: il corpo di un altro usato come il tuo"
    }
  },
  {
    "id": "resuscitare",
    "name": "Resuscitare",
    "grade": 5,
    "text": "Il morto torna.",
    "subjects": {
      "prime": "La scintilla nel Modello spento",
      "spirit": "L'anima richiamata da oltre il Velo",
      "life": "Il corpo che ha lasciato da poco"
    }
  },
  {
    "id": "rivoluzionare",
    "name": "Rivoluzionare",
    "grade": 5,
    "text": "Cambi le leggi con cui una cosa funziona.",
    "subjects": {
      "correspondence": "La geometria: luoghi fusi, continenti avvicinati",
      "entropy": "La sorte di un luogo, con regole tue",
      "forces": "L'energia: fuoco freddo, luce che nutre, gravità laterale",
      "matter": "Le proprietà di una sostanza: l'acqua che brucia",
      "spirit": "Le leggi di un Regno",
      "time": "Il verso del tempo in una valle"
    }
  }
]);
