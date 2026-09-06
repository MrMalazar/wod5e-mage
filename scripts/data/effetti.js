// Generato da tools/build-effetti.py dalle nove tavole di Sfera del LIBRO (06_2_1 … 06_2_9): non toccare a mano.
// Il Grimorio: gli effetti del manuale, Sfera per Sfera e livello per livello, con le Sfere in più che il testo chiede.

export const EFFETTI = Object.freeze([
  {
    "id": "correspondence-1-leggere-lo-spazio",
    "name": "Leggere lo spazio",
    "sphere": "correspondence",
    "level": 1,
    "extras": [],
    "text": "sai ogni distanza al centimetro, e senti il vano che la parete nasconde"
  },
  {
    "id": "correspondence-1-sapere-dove-sei",
    "name": "Sapere dove sei",
    "sphere": "correspondence",
    "level": 1,
    "extras": [],
    "text": "l'orientamento perfetto: la strada di casa esiste sempre, anche sottoterra e al buio"
  },
  {
    "id": "correspondence-1-mappare-la-zona",
    "name": "Mappare la zona",
    "sphere": "correspondence",
    "level": 1,
    "extras": [
      {
        "sphere": "matter",
        "level": 1,
        "required": true
      }
    ],
    "text": "+ Materia ●: la planimetria dei dintorni ti si disegna in testa, presenze comprese"
  },
  {
    "id": "correspondence-1-cercare-nell-area",
    "name": "Cercare nell'area",
    "sphere": "correspondence",
    "level": 1,
    "extras": [],
    "text": "+ la Sfera del filtro ●: scandagli l'isolato e trovi solo ciò che cerchi: armi, vivi, magia"
  },
  {
    "id": "correspondence-2-accorciare-la-strada",
    "name": "Accorciare la strada",
    "sphere": "correspondence",
    "level": 2,
    "extras": [],
    "text": "i tuoi passi valgono doppio: la scorciatoia che esiste solo per te"
  },
  {
    "id": "correspondence-2-agire-su-cio-che-non-vedi",
    "name": "Agire su ciò che non vedi",
    "sphere": "correspondence",
    "level": 2,
    "extras": [],
    "text": "+ la Sfera del bersaglio, Regola del Ponte: il ponte ti porta, l'altra Sfera lavora"
  },
  {
    "id": "correspondence-2-chiaroveggenza",
    "name": "Chiaroveggenza",
    "sphere": "correspondence",
    "level": 2,
    "extras": [
      {
        "sphere": "mind",
        "level": 1,
        "required": false
      }
    ],
    "text": "osservi un luogo remoto, in tempo reale. Più luoghi insieme: + Mente ●"
  },
  {
    "id": "correspondence-2-marchiare-un-bersaglio",
    "name": "Marchiare un bersaglio",
    "sphere": "correspondence",
    "level": 2,
    "extras": [],
    "text": "leghi un filo invisibile: ovunque vada, tu sai dov'è. E il filo corre in due sensi"
  },
  {
    "id": "correspondence-2-schermare-un-luogo",
    "name": "Schermare un luogo",
    "sphere": "correspondence",
    "level": 2,
    "extras": [],
    "text": "ispessisci lo spazio: chi scruta o divina perde successi"
  },
  {
    "id": "correspondence-2-sentire-il-filo",
    "name": "Sentire il filo",
    "sphere": "correspondence",
    "level": 2,
    "extras": [],
    "text": "ti accorgi di essere marchiato, osservato o cercato, e sai da che distanza"
  },
  {
    "id": "correspondence-3-affacciarti-oltre-il-varco",
    "name": "Affacciarti oltre il varco",
    "sphere": "correspondence",
    "level": 3,
    "extras": [
      {
        "sphere": "life",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Vita ●●: la tua mano attraversa lo spazio e apre la porta dall'altro lato"
  },
  {
    "id": "correspondence-3-disperdere-oggetti-lontano",
    "name": "Disperdere oggetti lontano",
    "sphere": "correspondence",
    "level": 3,
    "extras": [
      {
        "sphere": "entropy",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Entropia ●●: le prove si sparpagliano in dieci chilometri di nascondigli casuali"
  },
  {
    "id": "correspondence-3-estrarre-senza-bisturi",
    "name": "Estrarre senza bisturi",
    "sphere": "correspondence",
    "level": 3,
    "extras": [
      {
        "sphere": "life",
        "level": 2,
        "required": false
      },
      {
        "sphere": "matter",
        "level": 2,
        "required": false
      }
    ],
    "text": "il proiettile lascia il ferito da solo; + Vita ●● perché sembri medicina, da un congegno + Materia ●●"
  },
  {
    "id": "correspondence-3-richiamare-un-oggetto-distante",
    "name": "Richiamare un oggetto distante",
    "sphere": "correspondence",
    "level": 3,
    "extras": [
      {
        "sphere": "matter",
        "level": 2,
        "required": false
      },
      {
        "sphere": "life",
        "level": 2,
        "required": false
      }
    ],
    "text": "il filo si tira e la cosa arriva. Da solo è strappo, Volgare; pulito con + Materia ●●, vivo con + Vita ●●"
  },
  {
    "id": "correspondence-3-scambiare-due-cose-di-posto",
    "name": "Scambiare due cose di posto",
    "sphere": "correspondence",
    "level": 3,
    "extras": [],
    "text": "quello che era lì è qui, e viceversa: nessuno ha viaggiato. Senza Sfere compagne, due strappi"
  },
  {
    "id": "correspondence-3-teletrasportarti",
    "name": "Teletrasportarti",
    "sphere": "correspondence",
    "level": 3,
    "extras": [],
    "text": "sparisci qui, riappari là, con piccoli carichi. Gruppi e veicoli: ●●●●"
  },
  {
    "id": "correspondence-4-ancorare-un-bersaglio",
    "name": "Ancorare un bersaglio",
    "sphere": "correspondence",
    "level": 4,
    "extras": [],
    "text": "lo spazio attorno a lui si rifiuta: nessun varco lo porta via"
  },
  {
    "id": "correspondence-4-aprire-un-portale-stabile",
    "name": "Aprire un portale stabile",
    "sphere": "correspondence",
    "level": 4,
    "extras": [],
    "text": "una soglia spalancata tra due punti, finché la mantieni"
  },
  {
    "id": "correspondence-4-piegare-una-strada",
    "name": "Piegare una strada",
    "sphere": "correspondence",
    "level": 4,
    "extras": [],
    "text": "chi la percorre arriva dove hai deciso tu, convinto di aver camminato dritto"
  },
  {
    "id": "correspondence-4-sigillare-una-tasca-spaziale",
    "name": "Sigillare una tasca spaziale",
    "sphere": "correspondence",
    "level": 4,
    "extras": [],
    "text": "chiudi una stanza fuori dalla geometria del mondo"
  },
  {
    "id": "correspondence-5-riscrivere-la-geometria",
    "name": "Riscrivere la geometria",
    "sphere": "correspondence",
    "level": 5,
    "extras": [],
    "text": "luoghi fusi, edifici spostati, continenti avvicinati"
  },
  {
    "id": "entropy-1-individuare-il-punto-debole",
    "name": "Individuare il punto debole",
    "sphere": "entropy",
    "level": 1,
    "extras": [],
    "text": "la crepa nel muro, nell'alibi, nel piano"
  },
  {
    "id": "entropy-1-fiutare-la-menzogna",
    "name": "Fiutare la menzogna",
    "sphere": "entropy",
    "level": 1,
    "extras": [],
    "text": "il racconto che stona; le menti si difendono con la Volontà"
  },
  {
    "id": "entropy-1-fiutare-il-pericolo",
    "name": "Fiutare il pericolo",
    "sphere": "entropy",
    "level": 1,
    "extras": [],
    "text": "sai quanto è pericolosa la stanza prima di entrarci"
  },
  {
    "id": "entropy-1-pesare-le-probabilita",
    "name": "Pesare le probabilità",
    "sphere": "entropy",
    "level": 1,
    "extras": [],
    "text": "quanto è probabile che il banco sballi, che piova, che sopravvivi"
  },
  {
    "id": "entropy-1-leggere-il-conto-alla-rovescia",
    "name": "Leggere il conto alla rovescia",
    "sphere": "entropy",
    "level": 1,
    "extras": [],
    "text": "quanto resta a un oggetto, a una struttura, a un accordo prima che ceda"
  },
  {
    "id": "entropy-2-far-durare",
    "name": "Far durare",
    "sphere": "entropy",
    "level": 2,
    "extras": [],
    "text": "l'Entropia al contrario: la corda regge, il motore parte, la cosa vecchia arriva a fine giornata"
  },
  {
    "id": "entropy-2-inclinare-una-scelta",
    "name": "Inclinare una scelta",
    "sphere": "entropy",
    "level": 2,
    "extras": [
      {
        "sphere": "mind",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Mente ●●: la Mente gli mette l'idea in testa, l'Entropia fa sì che sia proprio quella a tornargli in mente"
  },
  {
    "id": "entropy-2-passare-inosservato",
    "name": "Passare inosservato",
    "sphere": "entropy",
    "level": 2,
    "extras": [],
    "text": "gli sguardi scivolano altrove: nessuno ricorda di averti visto"
  },
  {
    "id": "entropy-2-provocare-un-guasto",
    "name": "Provocare un guasto",
    "sphere": "entropy",
    "level": 2,
    "extras": [],
    "text": "la probabilità di rottura sale al cento per cento: l'auto tace"
  },
  {
    "id": "entropy-2-seminare-gli-inseguitori",
    "name": "Seminare gli inseguitori",
    "sphere": "entropy",
    "level": 2,
    "extras": [],
    "text": "chi ti segue colleziona gomme a terra, buche e semafori rossi"
  },
  {
    "id": "entropy-2-truccare-la-fortuna",
    "name": "Truccare la fortuna",
    "sphere": "entropy",
    "level": 2,
    "extras": [],
    "text": "il dado, la carta, l'ingranaggio che si inceppa al momento giusto"
  },
  {
    "id": "entropy-3-deviare-la-malasorte",
    "name": "Deviare la malasorte",
    "sphere": "entropy",
    "level": 3,
    "extras": [],
    "text": "ogni colpo ti manca per un soffio, e sembra sempre fortuna"
  },
  {
    "id": "entropy-3-distribuire-fortuna-e-sfortuna",
    "name": "Distribuire fortuna e sfortuna",
    "sphere": "entropy",
    "level": 3,
    "extras": [],
    "text": "pieghi una serata intera: la bisca ti ama, il rivale colleziona disastri"
  },
  {
    "id": "entropy-3-ferire-uno-spirito",
    "name": "Ferire uno spirito",
    "sphere": "entropy",
    "level": 3,
    "extras": [
      {
        "sphere": "prime",
        "level": 2,
        "required": true
      },
      {
        "sphere": "spirit",
        "level": 3,
        "required": true
      }
    ],
    "text": "+ Primordio ●●: disfi l'effimera dall'interno; via diretta: + Spirito ●●●"
  },
  {
    "id": "entropy-3-ridurre-in-polvere-un-oggetto",
    "name": "Ridurre in polvere un oggetto",
    "sphere": "entropy",
    "level": 3,
    "extras": [
      {
        "sphere": "time",
        "level": 2,
        "required": true
      },
      {
        "sphere": "matter",
        "level": 3,
        "required": true
      }
    ],
    "text": "+ Tempo ●●: anni di decadimento in un istante; via diretta: + Materia ●●●"
  },
  {
    "id": "entropy-3-rompere-la-catena",
    "name": "Rompere la catena",
    "sphere": "entropy",
    "level": 3,
    "extras": [],
    "text": "isoli un guasto perché smetta di propagarsi: il disastro si ferma dov'è"
  },
  {
    "id": "entropy-3-scegliere-il-domani-piu-comodo",
    "name": "Scegliere il domani più comodo",
    "sphere": "entropy",
    "level": 3,
    "extras": [
      {
        "sphere": "time",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Tempo ●●: tra i futuri possibili, spingi il mondo verso quello che preferisci"
  },
  {
    "id": "entropy-3-spezzare-una-maledizione",
    "name": "Spezzare una maledizione",
    "sphere": "entropy",
    "level": 3,
    "extras": [],
    "text": "disfi il nodo di sfortuna stretto da altri; la Sfera d'origine aiuta"
  },
  {
    "id": "entropy-4-benedire-o-maledire",
    "name": "Benedire o maledire",
    "sphere": "entropy",
    "level": 4,
    "extras": [
      {
        "sphere": "life",
        "level": 2,
        "required": false
      }
    ],
    "text": "riscrivi il destino di un vivente; potenziata: + Vita ●●"
  },
  {
    "id": "entropy-4-creare-fortuna-dal-nulla",
    "name": "Creare fortuna dal nulla",
    "sphere": "entropy",
    "level": 4,
    "extras": [
      {
        "sphere": "prime",
        "level": 3,
        "required": true
      }
    ],
    "text": "+ Primordio ●●●: aggiungi al conto invece di spostarlo. Il mondo se ne accorge, e il resto lo reclamerà"
  },
  {
    "id": "entropy-4-far-marcire-un-corpo",
    "name": "Far marcire un corpo",
    "sphere": "entropy",
    "level": 4,
    "extras": [
      {
        "sphere": "life",
        "level": 2,
        "required": false
      },
      {
        "sphere": "life",
        "level": 4,
        "required": false
      }
    ],
    "text": "la mortalità accelera nella carne; anche ●●● + Vita ●●, oppure + Vita ●●●●"
  },
  {
    "id": "entropy-4-rendere-un-luogo-immune-al-caso",
    "name": "Rendere un luogo immune al caso",
    "sphere": "entropy",
    "level": 4,
    "extras": [],
    "text": "dentro quel perimetro gli incidenti smettono di capitare, e la fortuna pure"
  },
  {
    "id": "entropy-5-intrecciare-destini",
    "name": "Intrecciare destini",
    "sphere": "entropy",
    "level": 5,
    "extras": [],
    "text": "due vite legate per sempre, nel bene e nella rovina"
  },
  {
    "id": "entropy-5-riscrivere-un-destino-da-zero",
    "name": "Riscrivere un destino da zero",
    "sphere": "entropy",
    "level": 5,
    "extras": [
      {
        "sphere": "prime",
        "level": 4,
        "required": true
      }
    ],
    "text": "+ Primordio ●●●●: la vita che non era prevista. Il conto si sbilancia, e presenta il resto quando vuole lui"
  },
  {
    "id": "entropy-5-sigillare-un-giuramento",
    "name": "Sigillare un Giuramento",
    "sphere": "entropy",
    "level": 5,
    "extras": [],
    "text": "il patto punisce da solo chi lo spezza"
  },
  {
    "id": "forces-1-allargare-lo-spettro",
    "name": "Allargare lo spettro",
    "sphere": "forces",
    "level": 1,
    "extras": [],
    "text": "infrarossi, correnti, radiazioni: il buio ti si apre"
  },
  {
    "id": "forces-1-leggere-il-calore-rimasto",
    "name": "Leggere il calore rimasto",
    "sphere": "forces",
    "level": 1,
    "extras": [],
    "text": "chi era seduto lì, quale motore è ancora tiepido, quanto tempo fa"
  },
  {
    "id": "forces-1-sentire-la-corrente",
    "name": "Sentire la corrente",
    "sphere": "forces",
    "level": 1,
    "extras": [],
    "text": "la segui dentro i muri: dove passa, dove è staccata, chi la sta usando"
  },
  {
    "id": "forces-1-vedere-attraverso-i-muri",
    "name": "Vedere attraverso i muri",
    "sphere": "forces",
    "level": 1,
    "extras": [],
    "text": "leggi le radiazioni oltre la parete: sagome nitide nella stanza accanto"
  },
  {
    "id": "forces-2-amplificare-o-spegnere-un-suono",
    "name": "Amplificare o spegnere un suono",
    "sphere": "forces",
    "level": 2,
    "extras": [],
    "text": "il sussurro che attraversa la sala, o la porta che si chiude in silenzio"
  },
  {
    "id": "forces-2-curvare-la-luce-o-il-suono",
    "name": "Curvare la luce o il suono",
    "sphere": "forces",
    "level": 2,
    "extras": [
      {
        "sphere": "life",
        "level": 2,
        "required": false
      }
    ],
    "text": "scompari alla vista, o all'orecchio. Su un vivente in movimento: + Vita ●●"
  },
  {
    "id": "forces-2-deviare-un-proiettile",
    "name": "Deviare un proiettile",
    "sphere": "forces",
    "level": 2,
    "extras": [],
    "text": "acceleri o rallenti la massa in volo"
  },
  {
    "id": "forces-2-dirigere-l-energia-in-scena",
    "name": "Dirigere l'energia in scena",
    "sphere": "forces",
    "level": 2,
    "extras": [],
    "text": "fuoco, vento, corrente: c'è già, e lo pieghi"
  },
  {
    "id": "forces-2-governare-l-attrito",
    "name": "Governare l'attrito",
    "sphere": "forces",
    "level": 2,
    "extras": [],
    "text": "il pavimento diventa ghiaccio, o colla: chi corre se ne accorge"
  },
  {
    "id": "forces-2-proiettare-luce-e-suono",
    "name": "Proiettare luce e suono",
    "sphere": "forces",
    "level": 2,
    "extras": [
      {
        "sphere": "prime",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Primordio ●●: un'immagine vera, visibile a chiunque, telecamere incluse"
  },
  {
    "id": "forces-2-rubare-il-calore",
    "name": "Rubare il calore",
    "sphere": "forces",
    "level": 2,
    "extras": [],
    "text": "il gelo improvviso in una stanza; il calore tolto va comunque da qualche parte"
  },
  {
    "id": "forces-2-spegnere-e-ravvivare",
    "name": "Spegnere e ravvivare",
    "sphere": "forces",
    "level": 2,
    "extras": [],
    "text": "la fiamma divampa o muore, il motore riparte; dal nulla serve il Primordio"
  },
  {
    "id": "forces-2-vestire-uno-scudo-di-forza",
    "name": "Vestire uno scudo di forza",
    "sphere": "forces",
    "level": 2,
    "extras": [],
    "text": "un'armatura invisibile di energia smorza i colpi in arrivo"
  },
  {
    "id": "forces-3-camminare-dove-non-si-cammina",
    "name": "Camminare dove non si cammina",
    "sphere": "forces",
    "level": 3,
    "extras": [],
    "text": "attrito e gravità insieme: la parete verticale, la superficie dell'acqua"
  },
  {
    "id": "forces-3-convertire-un-energia",
    "name": "Convertire un'energia",
    "sphere": "forces",
    "level": 3,
    "extras": [],
    "text": "luce in calore, suono in urto; la scarica drenata dall'ambiente"
  },
  {
    "id": "forces-3-evocare-energia-dal-nulla",
    "name": "Evocare energia dal nulla",
    "sphere": "forces",
    "level": 3,
    "extras": [
      {
        "sphere": "prime",
        "level": 2,
        "required": true
      },
      {
        "sphere": "prime",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Primordio ●●: fulmine senza rete, fiamma senza innesco. Terra e acqua: Materia ●●● + Primordio ●●"
  },
  {
    "id": "forces-3-fermare-cio-che-corre",
    "name": "Fermare ciò che corre",
    "sphere": "forces",
    "level": 3,
    "extras": [],
    "text": "l'auto in corsa, il treno, il corpo lanciato: la cinetica gli viene tolta"
  },
  {
    "id": "forces-3-levitare-e-volare",
    "name": "Levitare e volare",
    "sphere": "forces",
    "level": 3,
    "extras": [],
    "text": "il peso ti obbedisce: sali dolcemente, o fendi il cielo di fretta"
  },
  {
    "id": "forces-3-onda-d-urto",
    "name": "Onda d'urto",
    "sphere": "forces",
    "level": 3,
    "extras": [],
    "text": "il suono si fa pugno: tutto attorno al punto d'impatto vola"
  },
  {
    "id": "forces-3-spegnere-l-elettronica",
    "name": "Spegnere l'elettronica",
    "sphere": "forces",
    "level": 3,
    "extras": [],
    "text": "un impulso muto frigge ogni circuito nella stanza"
  },
  {
    "id": "forces-3-telecinesi",
    "name": "Telecinesi",
    "sphere": "forces",
    "level": 3,
    "extras": [],
    "text": "la cinetica obbedisce: sollevi, scagli, blocchi"
  },
  {
    "id": "forces-4-accendere-un-piccolo-sole",
    "name": "Accendere un piccolo sole",
    "sphere": "forces",
    "level": 4,
    "extras": [
      {
        "sphere": "prime",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Primordio ●●: una fonte stabile e autonoma, che nessuna rete alimenta"
  },
  {
    "id": "forces-4-concentrare-ogni-energia",
    "name": "Concentrare ogni energia",
    "sphere": "forces",
    "level": 4,
    "extras": [],
    "text": "tutta quella in scena, in un punto solo: quello che regge, dopo, è poco"
  },
  {
    "id": "forces-4-dominare-il-meteo",
    "name": "Dominare il meteo",
    "sphere": "forces",
    "level": 4,
    "extras": [],
    "text": "pioggia, nebbia, gelo su un perimetro intero"
  },
  {
    "id": "forces-4-proiettare-una-scena-intera",
    "name": "Proiettare una scena intera",
    "sphere": "forces",
    "level": 4,
    "extras": [
      {
        "sphere": "mind",
        "level": 4,
        "required": true
      },
      {
        "sphere": "prime",
        "level": 4,
        "required": true
      }
    ],
    "text": "+ Mente ●●●● + Primordio ●●●●: la scena finta che tutti vedono e toccano"
  },
  {
    "id": "forces-4-scatenare-la-tempesta",
    "name": "Scatenare la tempesta",
    "sphere": "forces",
    "level": 4,
    "extras": [
      {
        "sphere": "prime",
        "level": 2,
        "required": true
      }
    ],
    "text": "+ Primordio ●● a ciel sereno; tifone e tempesta di fuoco si comprano in espansione"
  },
  {
    "id": "forces-4-togliere-l-energia-a-un-area",
    "name": "Togliere l'energia a un'area",
    "sphere": "forces",
    "level": 4,
    "extras": [],
    "text": "buio, silenzio, gelo e immobilità su un isolato: la Sfera al contrario"
  },
  {
    "id": "forces-5-inventare-un-energia-nuova",
    "name": "Inventare un'energia nuova",
    "sphere": "forces",
    "level": 5,
    "extras": [],
    "text": "inventi nuove regole su come funziona l'energia: il fuoco freddo, la luce che nutre, la gravità laterale"
  },
  {
    "id": "matter-1-analizzare-un-oggetto",
    "name": "Analizzare un oggetto",
    "sphere": "matter",
    "level": 1,
    "extras": [],
    "text": "composizione, doppi fondi, il punto dove cederà"
  },
  {
    "id": "matter-1-sapere-cosa-c-era-prima",
    "name": "Sapere cosa c'era prima",
    "sphere": "matter",
    "level": 1,
    "extras": [],
    "text": "il residuo parla: cosa conteneva, chi l'ha usato, quanto tempo fa"
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
    "text": "+ Vita ●: un'occhiata dice se il piatto nutre, marcisce o avvelena"
  },
  {
    "id": "matter-2-aprire-appigli-nella-parete",
    "name": "Aprire appigli nella parete",
    "sphere": "matter",
    "level": 2,
    "extras": [],
    "text": "la facciata liscia germoglia maniglie su misura per le tue mani"
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
    "text": "carne morta: la tocchi come materia. Via Vita: + Vita ●●●"
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
    "text": "+ Tempo ●●●: ruggine e polvere di decenni in un minuto"
  },
  {
    "id": "matter-2-modellare-un-passe-partout",
    "name": "Modellare un passe-partout",
    "sphere": "matter",
    "level": 2,
    "extras": [],
    "text": "la chiave sbagliata cola e si riassesta nei denti giusti"
  },
  {
    "id": "matter-2-riforgiare-le-munizioni",
    "name": "Riforgiare le munizioni",
    "sphere": "matter",
    "level": 2,
    "extras": [],
    "text": "i proiettili in canna cambiano lega: argento, gomma, sale"
  },
  {
    "id": "matter-2-rimettere-a-posto",
    "name": "Rimettere a posto",
    "sphere": "matter",
    "level": 2,
    "extras": [],
    "text": "la crepa si chiude, l'ingranaggio torna in tolleranza, lo strappo si richiude"
  },
  {
    "id": "matter-2-trasformare-l-aria-in-sonnifero",
    "name": "Trasformare l'aria in sonnifero",
    "sphere": "matter",
    "level": 2,
    "extras": [],
    "text": "l'aria della stanza si fa dolciastra, e la sala si addormenta"
  },
  {
    "id": "matter-2-trasmutare-una-sostanza",
    "name": "Trasmutare una sostanza",
    "sphere": "matter",
    "level": 2,
    "extras": [],
    "text": "piombo in oro: forma, volume e stato intatti; i preziosi costano successi"
  },
  {
    "id": "matter-3-alzare-un-muro-dal-terreno",
    "name": "Alzare un muro dal terreno",
    "sphere": "matter",
    "level": 3,
    "extras": [],
    "text": "l'asfalto si solleva e ti fa da barricata"
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
    "text": "+ Primordio ●●: lo scheletro si alza, struttura senz'anima; cadavere intero: + Vita ●●● + Primordio ●●"
  },
  {
    "id": "matter-3-appesantire-o-alleggerire",
    "name": "Appesantire o alleggerire",
    "sphere": "matter",
    "level": 3,
    "extras": [],
    "text": "la refurtiva pesa piume, la porta del nemico pesa tonnellate"
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
    "text": "+ Primordio ●●: il coltello che prima non c'era; congegni complessi: ●●●●"
  },
  {
    "id": "matter-3-guastare-senza-rompere",
    "name": "Guastare senza rompere",
    "sphere": "matter",
    "level": 3,
    "extras": [],
    "text": "l'oggetto sembra intatto e smette di funzionare: nessuno capisce perché"
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
    "text": "la serranda cola. Per disintegrare anche: + Entropia ●●● + Tempo ●●"
  },
  {
    "id": "matter-3-rinforzare-gli-abiti",
    "name": "Rinforzare gli abiti",
    "sphere": "matter",
    "level": 3,
    "extras": [],
    "text": "la giacca pesa uguale e ferma i coltelli come maglia d'acciaio"
  },
  {
    "id": "matter-4-costruire-macchinari-complessi",
    "name": "Costruire macchinari complessi",
    "sphere": "matter",
    "level": 4,
    "extras": [],
    "text": "dal rottame al motore funzionante, con la tua firma"
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
    "text": "+ Vita ●●●● + Primordio ●●●: il metallo entra nel corpo, e il corpo lo accetta come suo"
  },
  {
    "id": "matter-4-rifare-un-edificio",
    "name": "Rifare un edificio",
    "sphere": "matter",
    "level": 4,
    "extras": [],
    "text": "la struttura si riassesta: pareti spostate, piani aggiunti, la casa che cambia pianta"
  },
  {
    "id": "matter-4-sigillare-per-sempre",
    "name": "Sigillare per sempre",
    "sphere": "matter",
    "level": 4,
    "extras": [],
    "text": "la porta smette di essere una porta: muro pieno, senza giunzione"
  },
  {
    "id": "matter-5-creare-una-lega-impossibile",
    "name": "Creare una lega impossibile",
    "sphere": "matter",
    "level": 5,
    "extras": [],
    "text": "leggera come stoffa e dura come nient'altro, e nessun laboratorio saprà dire cos'è"
  },
  {
    "id": "matter-5-rendere-permanente-il-mutamento",
    "name": "Rendere permanente il mutamento",
    "sphere": "matter",
    "level": 5,
    "extras": [],
    "text": "quello che hai trasformato smette di poter tornare indietro"
  },
  {
    "id": "mind-1-leggere-aure-ed-emozioni",
    "name": "Leggere aure ed emozioni",
    "sphere": "mind",
    "level": 1,
    "extras": [],
    "text": "la paura sotto il sorriso; la profondità la comprano i successi"
  },
  {
    "id": "mind-1-leggere-pensieri-e-ricordi",
    "name": "Leggere pensieri e ricordi",
    "sphere": "mind",
    "level": 1,
    "extras": [],
    "text": "fino al sepolto, coi successi; le menti resistono con la Volontà"
  },
  {
    "id": "mind-1-sentire-la-stanza",
    "name": "Sentire la stanza",
    "sphere": "mind",
    "level": 1,
    "extras": [],
    "text": "l'umore collettivo di una folla o di un luogo, e da dove sta arrivando"
  },
  {
    "id": "mind-2-blindare-un-ricordo",
    "name": "Blindare un ricordo",
    "sphere": "mind",
    "level": 2,
    "extras": [],
    "text": "quel ricordo diventa cassaforte: nessuna lettura, nessuna riscrittura"
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
    "text": "la vedono solo i bersagli scelti; che ferisce: ●●● (+ Vita ●● per gli Aggravati)"
  },
  {
    "id": "mind-2-non-restare-in-memoria",
    "name": "Non restare in memoria",
    "sphere": "mind",
    "level": 2,
    "extras": [],
    "text": "ti vedono, ti parlano, e mezz'ora dopo saprebbero descrivere soltanto un tipo qualunque"
  },
  {
    "id": "mind-2-pilotare-l-umore",
    "name": "Pilotare l'umore",
    "sphere": "mind",
    "level": 2,
    "extras": [],
    "text": "accendi o spegni un'emozione che c'è già"
  },
  {
    "id": "mind-2-schermare-i-tuoi-pensieri",
    "name": "Schermare i tuoi pensieri",
    "sphere": "mind",
    "level": 2,
    "extras": [],
    "text": "mura attorno alla tua psiche: chi legge perde successi"
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
    "text": "gliela metti in testa, e da lì in poi è una fra le tante. + Entropia ●● perché sia proprio quella a tornargli in mente"
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
    "text": "le palpebre del bersaglio si arrendono in tre respiri; anche + Vita ●●●"
  },
  {
    "id": "mind-3-assalto-psichico",
    "name": "Assalto psichico",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "danno alla Volontà, mente contro mente"
  },
  {
    "id": "mind-3-entrare-e-dirigere-i-sogni",
    "name": "Entrare e dirigere i sogni",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "il sonno altrui diventa il tuo palcoscenico"
  },
  {
    "id": "mind-3-legare-le-menti-della-squadra",
    "name": "Legare le menti della squadra",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "la Cabala pensa in coro: ognuno sente ciò che serve agli altri"
  },
  {
    "id": "mind-3-risanare-la-volonta",
    "name": "Risanare la Volontà",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "1 successo per livello; Aggravati: +1 Quintessenza; la tua: ●●"
  },
  {
    "id": "mind-3-sciogliere-la-lingua",
    "name": "Sciogliere la lingua",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "il bersaglio dice tutto ciò che pensa, e si stupisce di dirlo"
  },
  {
    "id": "mind-3-telepatia-piena",
    "name": "Telepatia piena",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "dialogo completo, mente a mente"
  },
  {
    "id": "mind-3-tradurre-le-lingue",
    "name": "Tradurre le lingue",
    "sphere": "mind",
    "level": 3,
    "extras": [],
    "text": "il significato ti arriva prima delle parole"
  },
  {
    "id": "mind-4-comandare-una-mente",
    "name": "Comandare una mente",
    "sphere": "mind",
    "level": 4,
    "extras": [],
    "text": "ordini assoluti; ben eseguito, il bersaglio razionalizza"
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
    "text": "+ Primordio ●●●: creatività, orecchio, coraggio: materia nuova invece che materia piegata"
  },
  {
    "id": "mind-4-inceppare-una-mente",
    "name": "Inceppare una mente",
    "sphere": "mind",
    "level": 4,
    "extras": [],
    "text": "nella sua testa resta un solo compito assurdo: il mondo può attendere"
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
    "text": "+ Spirito ●●● + Primordio ●●: la tua forma astrale si stacca e si mostra ai presenti"
  },
  {
    "id": "mind-4-riscrivere-ricordi",
    "name": "Riscrivere ricordi",
    "sphere": "mind",
    "level": 4,
    "extras": [],
    "text": "cancelli e cuci; la personalità intera: ●●●●●"
  },
  {
    "id": "mind-4-seminare-un-ordine-dormiente",
    "name": "Seminare un ordine dormiente",
    "sphere": "mind",
    "level": 4,
    "extras": [],
    "text": "l'istruzione resta latente per mesi e si sveglia alla parola convenuta"
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
    "text": "+ Primordio ●●●: una coscienza dove non ce n'era: la macchina che pensa, il luogo che sa di esistere"
  },
  {
    "id": "mind-5-riforgiare-una-personalita",
    "name": "Riforgiare una personalità",
    "sphere": "mind",
    "level": 5,
    "extras": [],
    "text": "la persona che esce è coerente, funzionante e diversa, e non lo sospetta"
  },
  {
    "id": "prime-1-percepire-la-magia",
    "name": "Percepire la magia",
    "sphere": "prime",
    "level": 1,
    "extras": [],
    "text": "l'incantesimo ancora caldo, la firma di chi ha lanciato"
  },
  {
    "id": "prime-1-vedere-quanto-e-carico",
    "name": "Vedere quanto è carico",
    "sphere": "prime",
    "level": 1,
    "extras": [],
    "text": "quanta Quintessenza resta a un Nodo, a una Meraviglia, a un mago"
  },
  {
    "id": "prime-1-consacrare-un-oggetto",
    "name": "Consacrare un oggetto",
    "sphere": "prime",
    "level": 1,
    "extras": [],
    "text": "legato a te, ti segue in ogni trasformazione"
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
    "text": "+ Vita ●: l'alone dei vivi si accende: più forte la vita, più brilla"
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
    "text": "+ Spirito ●●: la scintilla che rende Risvegliato un Risvegliato: forma, colore, e quanto è sveglia"
  },
  {
    "id": "prime-2-bruciare-l-attrito-in-anticipo",
    "name": "Bruciare l'attrito in anticipo",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "spendi Quintessenza e togli Paradosso quando decidi tu (5.6)"
  },
  {
    "id": "prime-2-creare-dal-nulla",
    "name": "Creare dal nulla",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "+ la Sfera del Modello, Regola del Nulla: tu porti la materia prima, l'altra Sfera la forma"
  },
  {
    "id": "prime-2-creare-grezzo",
    "name": "Creare grezzo",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "energia grezza, che si spegne quando molli la presa. Volgare con Testimoni, sempre"
  },
  {
    "id": "prime-2-destabilizzare-un-modello",
    "name": "Destabilizzare un Modello",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "scuoti la trama stessa del bersaglio: danno diretto al Modello delle cose"
  },
  {
    "id": "prime-2-forgiare-costrutti-di-pura-energia",
    "name": "Forgiare costrutti di pura energia",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "dardi e lame di luce, finché la Quintessenza regge"
  },
  {
    "id": "prime-2-incantare-un-arma",
    "name": "Incantare un'arma",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "danni Aggravati nel filo della lama; morde anche gli spiriti"
  },
  {
    "id": "prime-2-mascherare-la-tua-aura",
    "name": "Mascherare la tua aura",
    "sphere": "prime",
    "level": 2,
    "extras": [],
    "text": "la tua firma si spegne o mente: per i sensi mistici sei un altro"
  },
  {
    "id": "prime-3-assorbire-e-incanalare",
    "name": "Assorbire e incanalare",
    "sphere": "prime",
    "level": 3,
    "extras": [],
    "text": "da Nodi altrui alla tua Ruota, o dove serve"
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
    "text": "+ Materia ●●●● + Vita ●●●●: la tua energia salda l'acciaio al battito"
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
    "text": "+ Vita ●●●● + Spirito ●●●●: la scintilla riaccesa nel Modello spento; Volgare, sempre"
  },
  {
    "id": "prime-3-travasare-a-un-altro-mago",
    "name": "Travasare a un altro mago",
    "sphere": "prime",
    "level": 3,
    "extras": [],
    "text": "la tua energia entra nella sua Ruota, se lì c'è posto"
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
    "text": "spirito consenziente: la tua energia gli fa da casa. A forza: + Spirito ●●●●"
  },
  {
    "id": "prime-4-deviare-il-contraccolpo",
    "name": "Deviare il Contraccolpo",
    "sphere": "prime",
    "level": 4,
    "extras": [],
    "text": "lo attutisci, lo assorbi in Quintessenza, o lo trasli su un altro (5.6)"
  },
  {
    "id": "prime-4-drenare-un-nodo",
    "name": "Drenare un Nodo",
    "sphere": "prime",
    "level": 4,
    "extras": [],
    "text": "strappi la sorgente, e il luogo appassisce"
  },
  {
    "id": "prime-4-drenare-una-creatura",
    "name": "Drenare una creatura",
    "sphere": "prime",
    "level": 4,
    "extras": [],
    "text": "+ la Sfera del bersaglio: l'energia esce da ciò che la portava. Sui viventi lascia Macchie"
  },
  {
    "id": "prime-4-levare-un-campo-di-negazione",
    "name": "Levare un campo di negazione",
    "sphere": "prime",
    "level": 4,
    "extras": [],
    "text": "nell'area la Magick altrui nasce già stanca: ogni effetto si smorza"
  },
  {
    "id": "prime-4-spegnere-una-meraviglia",
    "name": "Spegnere una Meraviglia",
    "sphere": "prime",
    "level": 4,
    "extras": [],
    "text": "le togli la carica: l'oggetto resta, e smette di essere speciale"
  },
  {
    "id": "prime-5-creare-un-nodo",
    "name": "Creare un Nodo",
    "sphere": "prime",
    "level": 5,
    "extras": [],
    "text": "una sorgente nuova nel mondo, dove prima il mondo era ordinario"
  },
  {
    "id": "prime-5-produrre-quintessenza",
    "name": "Produrre Quintessenza",
    "sphere": "prime",
    "level": 5,
    "extras": [],
    "text": "la fai nascere dove non ce n'era: il gesto che nessuna spesa e nessun furto sostituiscono"
  },
  {
    "id": "prime-5-radicare-un-incantesimo-per-sempre",
    "name": "Radicare un incantesimo per sempre",
    "sphere": "prime",
    "level": 5,
    "extras": [],
    "text": "l'effetto entra nell'Arazzo e smette di dipendere da te"
  },
  {
    "id": "prime-5-rifiutare-il-contraccolpo",
    "name": "Rifiutare il Contraccolpo",
    "sphere": "prime",
    "level": 5,
    "extras": [],
    "text": "sai con cosa hanno costruito il Paradosso, e puoi dirgli di no (5.6)"
  },
  {
    "id": "spirit-1-vedere-oltre-il-velo",
    "name": "Vedere oltre il Velo",
    "sphere": "spirit",
    "level": 1,
    "extras": [],
    "text": "la Penumbra, lo spessore della parete, le cariche mistiche negli oggetti"
  },
  {
    "id": "spirit-1-sapere-cosa-e-morto-qui",
    "name": "Sapere cosa è morto qui",
    "sphere": "spirit",
    "level": 1,
    "extras": [],
    "text": "il luogo racconta chi se n'è andato, quando, e se è rimasto qualcosa"
  },
  {
    "id": "spirit-1-leggere-l-anima",
    "name": "Leggere l'anima",
    "sphere": "spirit",
    "level": 1,
    "extras": [],
    "text": "quanto è integra una persona, cosa si porta addosso e da quanto tempo"
  },
  {
    "id": "spirit-1-leggere-la-geografia-di-la",
    "name": "Leggere la geografia di là",
    "sphere": "spirit",
    "level": 1,
    "extras": [],
    "text": "la mappa dell'altro lato in quel punto: dove si passa, dove porta, chi comanda"
  },
  {
    "id": "spirit-1-guardare-lontano",
    "name": "Guardare lontano",
    "sphere": "spirit",
    "level": 1,
    "extras": [],
    "text": "la vista si stacca dal luogo e va dove nessuno ha mappato. Chi guarda tanto, prima o poi, viene guardato"
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
    "text": "+ Vita ●: uno sguardo dice cosa hai davanti: vampiro, mutaforma, morto, peggio"
  },
  {
    "id": "spirit-2-aprire-una-trattativa",
    "name": "Aprire una trattativa",
    "sphere": "spirit",
    "level": 2,
    "extras": [],
    "text": "l'offerta formale: dichiari cosa porti e cosa chiedi, e da lì si contratta"
  },
  {
    "id": "spirit-2-chiamare-il-tuo-alleato",
    "name": "Chiamare il tuo alleato",
    "sphere": "spirit",
    "level": 2,
    "extras": [],
    "text": "la voce del famiglio o del patrono ti risponde, ovunque sia"
  },
  {
    "id": "spirit-2-ispessire-o-assottigliare-il-velo",
    "name": "Ispessire o assottigliare il Velo",
    "sphere": "spirit",
    "level": 2,
    "extras": [],
    "text": "apri la strada ai tuoi, la sbarri agli altri"
  },
  {
    "id": "spirit-2-parlare-con-chi-sta-di-la",
    "name": "Parlare con chi sta di là",
    "sphere": "spirit",
    "level": 2,
    "extras": [],
    "text": "la tua voce attraversa la parete sottile"
  },
  {
    "id": "spirit-3-attraversare-il-velo",
    "name": "Attraversare il Velo",
    "sphere": "spirit",
    "level": 3,
    "extras": [],
    "text": "in carne e ossa; occhio alla barriera locale"
  },
  {
    "id": "spirit-3-chiudere-un-passaggio",
    "name": "Chiudere un passaggio",
    "sphere": "spirit",
    "level": 3,
    "extras": [],
    "text": "il varco che qualcuno usava smette di esistere, e chi lo stava usando resta dov'è"
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
    "text": "+ Vita ●● su un vivente: danno alla Saggezza, uno dei pochissimi modi che esistano"
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
    "text": "colpisci l'effimera come fosse carne; anche + Entropia ●●● + Primordio ●●"
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
    "text": "+ Vita ●●: il loro Modello è ibrido; a scelta: + Vita ●●● + Spirito ●●"
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
    "text": "+ Mente ●●●● + Primordio ●●: la tua forma astrale si mostra ai presenti"
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
    "text": "+ Vita ●●: non cancelli niente da solo, apri una porta. Lo aspetta una prova cucita sulle sue Convinzioni; se la supera, ogni Macchia se ne va. Una sola per cronaca, a testa"
  },
  {
    "id": "spirit-3-svegliare-cio-che-dorme-in-un-oggetto",
    "name": "Svegliare ciò che dorme in un oggetto",
    "sphere": "spirit",
    "level": 3,
    "extras": [],
    "text": "il vecchio fucile si ricorda di avere un'opinione, e ti è amico"
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
    "text": "l'entità legata nell'oggetto; consenziente: + Primordio ●●●●"
  },
  {
    "id": "spirit-4-esiliare-oltre-il-velo",
    "name": "Esiliare oltre il Velo",
    "sphere": "spirit",
    "level": 4,
    "extras": [],
    "text": "il bersaglio precipita dall'altro lato, e il ritorno è affar suo"
  },
  {
    "id": "spirit-4-esorcizzare-un-posseduto",
    "name": "Esorcizzare un posseduto",
    "sphere": "spirit",
    "level": 4,
    "extras": [],
    "text": "il corpo torna libero, l'ospite torna di là"
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
    "text": "l'entità risponde all'appello; per comandarla: + Mente ●●"
  },
  {
    "id": "spirit-4-imprigionare-un-avatar",
    "name": "Imprigionare un Avatar",
    "sphere": "spirit",
    "level": 4,
    "extras": [],
    "text": "la scintilla di un Risvegliato resta chiusa fuori dalla sua portata, finché reggi il vincolo"
  },
  {
    "id": "spirit-4-intrappolare",
    "name": "Intrappolare",
    "sphere": "spirit",
    "level": 4,
    "extras": [],
    "text": "la trappola scatta: niente poteri, niente fuga, finché la mantieni"
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
    "text": "+ Vita ●●●● + Primordio ●●●: richiami l'anima oltre il Velo; Volgare, sempre, ovunque"
  },
  {
    "id": "spirit-5-aprire-un-regno",
    "name": "Aprire un Regno",
    "sphere": "spirit",
    "level": 5,
    "extras": [],
    "text": "un luogo nuovo di là, con le sue leggi e i suoi confini, che resta quando te ne vai"
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
    "text": "+ Primordio ●●●: un'entità dove non ce n'era: nasce con una fame, e la fame la scegli tu"
  },
  {
    "id": "spirit-5-il-gilgul",
    "name": "Il Gilgul",
    "sphere": "spirit",
    "level": 5,
    "extras": [],
    "text": "spezzi l'Avatar di un Risvegliato. Si fa una volta sola, e chi lo fa smette di essere quello di prima"
  },
  {
    "id": "spirit-5-provocare-un-risveglio",
    "name": "Provocare un Risveglio",
    "sphere": "spirit",
    "level": 5,
    "extras": [],
    "text": "apri gli occhi a un Dormiente. Non è un dono e non si chiede permesso: è una porta spalancata addosso a qualcuno che dormiva"
  },
  {
    "id": "time-1-leggere-il-flusso",
    "name": "Leggere il flusso",
    "sphere": "time",
    "level": 1,
    "extras": [],
    "text": "ora esatta, anomalie, la linea del luogo a ritroso; la profondità la comprano i successi"
  },
  {
    "id": "time-1-leggere-la-linea-di-una-persona",
    "name": "Leggere la linea di una persona",
    "sphere": "time",
    "level": 1,
    "extras": [],
    "text": "il suo passato addosso a lei, e i rami che le partono da adesso"
  },
  {
    "id": "time-1-trovare-le-cuciture",
    "name": "Trovare le cuciture",
    "sphere": "time",
    "level": 1,
    "extras": [],
    "text": "i punti in cui il tempo è stato rifatto da qualcuno prima di te"
  },
  {
    "id": "time-2-il-vantaggio-del-primo-istante",
    "name": "Il vantaggio del primo istante",
    "sphere": "time",
    "level": 2,
    "extras": [],
    "text": "quando la violenza esplode, tu eri pronto da un attimo"
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
    "text": "la scena rivive, nitida e mostrabile; lontano da qui: + Corrispondenza ●●"
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
    "text": "+ Entropia ●●: tieni d'occhio i prossimi istanti: niente ti coglie di sorpresa"
  },
  {
    "id": "time-3-accelerare-e-rallentare",
    "name": "Accelerare e rallentare",
    "sphere": "time",
    "level": 3,
    "extras": [],
    "text": "tu doppio, lui a metà; l'Ora Rubata vive qui (5.9): un'azione extra per turno, finché regge"
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
    "text": "+ Vita ●●: la vigna fa in un pomeriggio la sua stagione intera"
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
    "text": "+ Vita ●●: decenni scaricati nel corpo; un oggetto: + Materia ●●"
  },
  {
    "id": "time-3-riavvolgere-la-scena",
    "name": "Riavvolgere la scena",
    "sphere": "time",
    "level": 3,
    "extras": [],
    "text": "gli ultimi istanti tornano indietro; per ricordarlo: + Mente"
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
    "text": "+ Vita ●●: le ferite si richiudono a ritroso, come un nastro mandato indietro"
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
    "text": "+ Entropia ●●: anni di decadimento in un istante; via diretta: + Materia ●●●"
  },
  {
    "id": "time-3-saltare-l-attimo-del-colpo",
    "name": "Saltare l'attimo del colpo",
    "sphere": "time",
    "level": 3,
    "extras": [],
    "text": "un passo nel futuro immediato: l'attacco attraversa il punto dove eri"
  },
  {
    "id": "time-4-ancorare-il-presente",
    "name": "Ancorare il presente",
    "sphere": "time",
    "level": 4,
    "extras": [],
    "text": "fissi un punto fermo nel flusso: la base di viaggi e ritorni"
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
    "text": "+ Mente ●●: un ricordo torna indietro di minuti e cambia la scena"
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
    "text": "+ Mente ●●: gli stessi tre minuti, ancora e ancora, finché non decidi tu"
  },
  {
    "id": "time-4-fermare-il-tempo-in-un-area",
    "name": "Fermare il tempo in un'area",
    "sphere": "time",
    "level": 4,
    "extras": [],
    "text": "la stanza in stasi, con tutto ciò che contiene"
  },
  {
    "id": "time-4-sospendere-un-incantesimo",
    "name": "Sospendere un incantesimo",
    "sphere": "time",
    "level": 4,
    "extras": [],
    "text": "l'effetto dorme fuori dal flusso e attende la condizione"
  },
  {
    "id": "time-5-rifare-un-evento",
    "name": "Rifare un evento",
    "sphere": "time",
    "level": 5,
    "extras": [],
    "text": "non la scena di poco fa, ma il fatto: quello che è successo smette di essere successo"
  },
  {
    "id": "time-5-smettere-di-invecchiare",
    "name": "Smettere di invecchiare",
    "sphere": "time",
    "level": 5,
    "extras": [],
    "text": "gli anni ti scorrono accanto: resti quello che eri il giorno in cui hai imparato"
  },
  {
    "id": "time-5-viaggiare-nel-tempo",
    "name": "Viaggiare nel tempo",
    "sphere": "time",
    "level": 5,
    "extras": [],
    "text": "vai e torni davvero, col corpo. Quello che trovi al ritorno è affar tuo"
  },
  {
    "id": "life-1-percepire-salute-e-condizioni",
    "name": "Percepire salute e condizioni",
    "sphere": "life",
    "level": 1,
    "extras": [],
    "text": "età vera, emorragie interne, il farmaco che mente"
  },
  {
    "id": "life-1-leggere-la-storia-di-un-corpo",
    "name": "Leggere la storia di un corpo",
    "sphere": "life",
    "level": 1,
    "extras": [],
    "text": "vecchie fratture, cicatrici che non si vedono, il mestiere che ha fatto"
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
    "text": "+ Spirito ●: uno sguardo dice se quello davanti a te è umano"
  },
  {
    "id": "life-2-curare-o-causare-malattie",
    "name": "Curare o causare malattie",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "nella vita semplice e in te stesso; su un altro: ●●●"
  },
  {
    "id": "life-2-fingere-la-morte",
    "name": "Fingere la morte",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "battito e respiro scendono a zero apparente: i becchini ci cascano"
  },
  {
    "id": "life-2-guarire-te-stesso",
    "name": "Guarire te stesso",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "1 successo per livello; Aggravati: +1 Quintessenza ciascuno"
  },
  {
    "id": "life-2-immunizzarti",
    "name": "Immunizzarti",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "il tuo sangue impara il veleno prima che faccia danno"
  },
  {
    "id": "life-2-ritoccarti-i-connotati",
    "name": "Ritoccarti i connotati",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "capelli, lineamenti, dettagli: il tuo Modello, di un soffio"
  },
  {
    "id": "life-2-smettere-di-aver-bisogno",
    "name": "Smettere di aver bisogno",
    "sphere": "life",
    "level": 2,
    "extras": [],
    "text": "fame, sete, sonno e respiro si mettono in pausa finché reggi l'effetto"
  },
  {
    "id": "life-3-accelerare-una-guarigione-naturale",
    "name": "Accelerare una guarigione naturale",
    "sphere": "life",
    "level": 3,
    "extras": [],
    "text": "il corpo fa in una notte il lavoro di due settimane, e chiede da mangiare"
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
    "text": "il corpo del bersaglio decide che è notte fonda; anche + Mente ●●●"
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
    "text": "+ Primordio ●●: si muove senz'anima; ossa nude: + Materia ●●● + Primordio ●●"
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
    "text": "+ Spirito ●●: il loro Modello è ibrido; a scelta: + Spirito ●●● + Vita ●●"
  },
  {
    "id": "life-3-ferire-un-vampiro",
    "name": "Ferire un vampiro",
    "sphere": "life",
    "level": 3,
    "extras": [],
    "text": "carne morta animata; via Materia: ●●"
  },
  {
    "id": "life-3-guarire-o-ferire-un-altro",
    "name": "Guarire o ferire un altro",
    "sphere": "life",
    "level": 3,
    "extras": [],
    "text": "la Regola del Sé al lavoro: il Modello altrui chiede il terzo pallino"
  },
  {
    "id": "life-3-potenziare-il-fisico",
    "name": "Potenziare il fisico",
    "sphere": "life",
    "level": 3,
    "extras": [],
    "text": "attributi accresciuti, artigli, branchie, corazza: il tuo corpo risponde"
  },
  {
    "id": "life-4-diventare-interamente-altro",
    "name": "Diventare interamente altro",
    "sphere": "life",
    "level": 4,
    "extras": [],
    "text": "il tuo Modello cambia da capo, e ci resti finché paghi la Durata"
  },
  {
    "id": "life-4-guarire-l-inguaribile",
    "name": "Guarire l'inguaribile",
    "sphere": "life",
    "level": 4,
    "extras": [],
    "text": "ciò che la medicina dichiara irreversibile torna indietro. Il corpo regge; il resto è affar suo"
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
    "text": "+ Materia ●●●● + Primordio ●●●: il metallo entra nel corpo, e il corpo lo accetta come suo"
  },
  {
    "id": "life-4-riscrivere-il-corpo-di-un-altro",
    "name": "Riscrivere il corpo di un altro",
    "sphere": "life",
    "level": 4,
    "extras": [],
    "text": "forma, proporzioni, funzioni: esce diverso da come è entrato"
  },
  {
    "id": "life-4-trasformare-in-animale",
    "name": "Trasformare in animale",
    "sphere": "life",
    "level": 4,
    "extras": [],
    "text": "il Modello passa a un'altra specie, con quello che comporta pensarci dentro"
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
    "text": "+ Primordio ●●●: vita nuova, con una forma che decidi tu e una fame che decide lei"
  },
  {
    "id": "life-5-metamorfosi-senza-limiti",
    "name": "Metamorfosi senza limiti",
    "sphere": "life",
    "level": 5,
    "extras": [],
    "text": "massa, specie e scala smettono di essere un problema"
  },
  {
    "id": "life-5-rendere-permanente-il-mutamento",
    "name": "Rendere permanente il mutamento",
    "sphere": "life",
    "level": 5,
    "extras": [],
    "text": "quello che hai riscritto smette di poter tornare indietro, e diventa il suo Modello vero"
  }
]);
