// GENERATO da tools/genera-dati.mjs (sorgente: tools/dati/formule.json, dal testo delle matrici del 24/9/2026).
// Non si scrive a mano: si corregge il testo, si rifà l'esportazione e si rilancia l'attrezzo.
// Le 48 matrici (Blue, 24/9): Accesso, Amalgame, Descrizione per Sfera, Limite, soglia base come Ambiti, «In genere», i poteri legati.
export const FORMULE_M6 = Object.freeze([
  {
    "id": "accelerare-e-rallentare",
    "name": "Accelerare e Rallentare",
    "access": [
      "forces",
      "time"
    ],
    "amalgams": [],
    "amalgamsNote": "",
    "intro": "Puoi rendere più veloce e rapido un soggetto, un corpo, un processo o un movimento etc.. L'effetto varia a seconda del soggetto. Ad esempio il soggetto accelera compiendo l'azione anzitempo, oppure in ritardo rispetto a quando dovrebbe; l'auto improvvisamente taglia la strada o rallenta a passo umano; i proiettili rallentano a effetto Matrix, o colpirebbero anche qualcuno come Flash.",
    "bySphere": {
      "forces": "ciò che si muove, la massa in volo, la corrente, il motore, la fiamma.",
      "time": "una persona, un gruppo, un'area, e il tempo scorre per loro a un altro ritmo."
    },
    "coda": "",
    "limit": "non infligge danni.",
    "thresholds": [
      {
        "base": 4,
        "scopes": {
          "duration": 1,
          "impact": 3
        }
      }
    ],
    "thresholdText": "4 (Durata 1, Impatto 3)",
    "use": "In genere è pensato per rallentare quel momento della scena, pochi turni in combattimento.",
    "powers": [
      "prestito-dal-futuro",
      "pronto-all-uso",
      "puntuale",
      "sotto-tiro",
      "straordinari",
      "adesso-e-non-dopo",
      "allo-scadere",
      "ci-penso-domani",
      "contrattempo",
      "primo-istante",
      "salto",
      "slancio",
      "minute-man",
      "velocista",
      "rallentare"
    ],
    "newPowers": [
      "velocista",
      "rallentare"
    ],
    "byBlue": true
  },
  {
    "id": "annientare",
    "name": "Annientare",
    "access": [
      "matter",
      "prime",
      "spirit",
      "time",
      "life"
    ],
    "amalgams": [],
    "amalgamsNote": "",
    "intro": "Distruggi a livello d'essenza il tuo bersaglio. A differenza delle altre Formule, Annientare rende impossibile il recupero del soggetto, che viene rimosso completamente dalla scena attuale e da quelle future.",
    "bySphere": {
      "matter": "si occupa degli oggetti.",
      "prime": "del distruggere le reliquie.",
      "spirit": "nell'ottica di esiliarle dalla realtà.",
      "time": "le taglia dal tempo.",
      "life": "di «scomporle»."
    },
    "coda": "",
    "limit": "non infligge danni.",
    "thresholds": [
      {
        "base": 8,
        "scopes": {
          "impact": 4,
          "duration": 4
        }
      },
      {
        "base": 11,
        "scopes": {
          "impact": 4,
          "duration": 7
        }
      }
    ],
    "thresholdText": "8 (Impatto 4, Durata 4) o 11 (Impatto 4, Durata 7)",
    "use": "In genere è pensato per rimuovere il bersaglio dal capitolo attuale; se si vuole «esagerare» anche dall'intera campagna, soglia permettendo.",
    "powers": [
      "senza-residuo"
    ],
    "newPowers": [
      "senza-residuo"
    ],
    "byBlue": true
  },
  {
    "id": "aprire-e-bloccare",
    "name": "Aprire e Bloccare",
    "access": [
      "correspondence",
      "forces",
      "matter",
      "mind",
      "spirit",
      "time",
      "life"
    ],
    "amalgams": [
      "prime"
    ],
    "amalgamsNote": "",
    "intro": "Apri o chiudi un passaggio che resta per tutti, oppure fermi qualcosa finché non decidi tu.",
    "bySphere": {
      "correspondence": "apri un portale stabile o una tasca fuori dal mondo, o inchiodi una persona dove sta, e nessun varco la porta via.",
      "spirit": "assottigli o chiudi il Velo, chiudi per sempre un passaggio altrui, o intrappoli uno spirito o un licantropo, niente poteri e niente fuga.",
      "forces": "fermi l'auto, il treno, il proiettile a mezz'aria.",
      "matter": "il pavimento inghiotte le gambe, il metallo si chiude ai polsi.",
      "mind+life": "è il sonno, la paralisi, il compito assurdo che tiene occupata una fata.",
      "time": "una stanza intera in stasi con quello che contiene."
    },
    "coda": "La porta si apre e si chiude per tutti: chi la passa, passa da solo.",
    "limit": "trattiene e non danneggia; il soggetto resta intatto e si libera quando lo lasci.",
    "thresholds": [
      {
        "base": 4,
        "scopes": {
          "duration": 2,
          "impact": 2
        }
      }
    ],
    "thresholdText": "4 (Durata 2, Impatto 2)",
    "use": "In genere è pensato per aprire un varco o fermare un bersaglio per la scena; un blocco di pochi turni in combattimento costa meno (Durata 1).",
    "powers": [
      "uscita-d-emergenza",
      "nessuno-scappa",
      "colpo-in-canna",
      "montaggio-alternato"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "barriera",
    "name": "Barriera",
    "access": [
      "correspondence",
      "entropy",
      "forces",
      "matter",
      "prime",
      "spirit"
    ],
    "amalgams": [
      "mind"
    ],
    "amalgamsNote": "",
    "intro": "Chiudi un perimetro: dentro non entra niente del dominio della tua Sfera.",
    "bySphere": {
      "forces": "proiettili, fuoco, vento e suono restano fuori.",
      "matter": "il muro è pieno e nessuna porta si apre.",
      "correspondence": "nessun varco né divinazione arriva dentro, la stanza è fuori dalla geometria.",
      "spirit": "gli spiriti restano fuori e nessuno viene posseduto.",
      "entropy": "dentro non capitano incidenti, e nemmeno fortune.",
      "prime": "la Magick altrui e la Quintessenza restano sulla soglia."
    },
    "coda": "È il rifugio, la stanza sicura, il cerchio di sale che regge davvero.",
    "limit": "ferma ciò che entra, non ciò che è già dentro; protegge un luogo, non una persona.",
    "thresholds": [
      {
        "base": 5,
        "scopes": {
          "targets": 1,
          "duration": 2,
          "impact": 2
        }
      }
    ],
    "thresholdText": "5 (Bersagli 1, Durata 2, Impatto 2)",
    "use": "In genere è pensato per sigillare una stanza per la scena; un edificio intero chiede Bersagli 2, una notte intera Durata 4.",
    "powers": [
      "tasca-di-mary"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "benedire-e-maledire",
    "name": "Benedire e Maledire",
    "access": [
      "entropy",
      "prime",
      "spirit",
      "life"
    ],
    "amalgams": [
      "correspondence",
      "matter",
      "time"
    ],
    "amalgamsNote": "",
    "intro": "Fai lavorare la sorte a favore o contro qualcuno, nel tempo.",
    "bySphere": {
      "entropy": "il dado, la carta, il colpo mancato per un soffio girano dalla parte giusta per una persona, un gruppo, un luogo, oppure i guasti, gli inciampi e i disastri si accumulano addosso a chi hai scelto.",
      "life": "è la malattia che entra, o che non attecchisce.",
      "spirit": "benedici o maledici un'anima.",
      "prime": "metti in assonanza o in dissonanza la sua Magick con il luogo."
    },
    "coda": "La fortuna arriva dopo, non adesso: è la coincidenza che il Narratore fa scattare al momento giusto, o al momento peggiore.",
    "limit": "orienta gli esiti e non dà dadi adesso; tre fortune o tre sfortune di fila nella stessa scena sono una firma, e il Narratore può dichiararla Volgare.",
    "thresholds": [
      {
        "base": 4,
        "scopes": {
          "duration": 2,
          "impact": 2
        }
      }
    ],
    "thresholdText": "4 (Durata 2, Impatto 2)",
    "use": "In genere è pensato per una coincidenza a favore o contro che sposta un momento della scena; la maledizione che dura settimane sale con la Durata.",
    "powers": [
      "non-tutto-il-male",
      "chi-la-fa-l-aspetti",
      "fortuna-del-principiante",
      "legge-di-murphy",
      "tiri-gemelli",
      "contagio",
      "il-fucile-di-echov",
      "nerf",
      "bussola-comune",
      "scuola",
      "bussola-doppia"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "cancellare",
    "name": "Cancellare",
    "access": [
      "entropy",
      "mind",
      "prime",
      "spirit",
      "time"
    ],
    "amalgams": [
      "correspondence",
      "matter"
    ],
    "amalgamsNote": "",
    "intro": "Disfai ciò che è stato fatto.",
    "bySphere": {
      "entropy": "spezzi una maledizione o una coincidenza costruita.",
      "mind": "cancelli un ricordo, una conversazione, un volto.",
      "prime": "spegni una Meraviglia o un incantesimo altrui.",
      "spirit": "chiudi una possessione, un varco, esili un'entità.",
      "time": "disfai un giorno intero, e in cima alla Sfera l'evento stesso."
    },
    "coda": "La cosa resta com'era: è il fatto che non c'è più.",
    "limit": "disfa il fatto e non distrugge la cosa; il fatto alla radice chiede la cima di Tempo.",
    "thresholds": [
      {
        "base": 5,
        "scopes": {
          "impact": 4,
          "precision": 1
        }
      }
    ],
    "thresholdText": "5 (Impatto 4, Precisione 1)",
    "use": "In genere è pensato per togliere una cosa precisa (quel ricordo, quella maledizione, quell'incantesimo), e le scene dopo ne risentono.",
    "powers": [
      "flashback"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "celare",
    "name": "Celare",
    "access": [
      "correspondence",
      "entropy",
      "forces",
      "matter",
      "mind",
      "prime",
      "spirit",
      "life"
    ],
    "amalgams": [],
    "amalgamsNote": "",
    "intro": "Nascondi il vero: alla vista, all'udito, alla memoria, ai controlli.",
    "bySphere": {
      "forces": "pieghi luce e suono e nessuno ti vede né ti sente.",
      "entropy": "gli sguardi scivolano altrove, da te o da un gruppo.",
      "mind": "non resti nella memoria di chi ti ha incontrato, e i tuoi pensieri sono chiusi.",
      "correspondence": "un luogo sparisce dalla divinazione e dalla mira a distanza.",
      "matter": "un oggetto non si trova.",
      "life": "il battito, il respiro e i connotati non tradiscono.",
      "prime": "nascondi la tua aura, la tua firma, un effetto lanciato.",
      "spirit": "tu o un luogo siete invisibili agli occhi dell'altro lato."
    },
    "coda": "",
    "limit": "nasconde il vero e non mostra il falso, che è Ingannare; chi cerca con mezzi in più (telecamere, cani, sensi mistici) chiede più successi.",
    "thresholds": [
      {
        "base": 3,
        "scopes": {
          "duration": 2,
          "impact": 1
        }
      }
    ],
    "thresholdText": "3 (Durata 2, Impatto 1)",
    "use": "In genere è pensato per nascondere te, un compagno o una cosa per la scena; un gruppo intero sale con i Bersagli.",
    "powers": [
      "di-la-non-contano",
      "coperto"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "comunicare",
    "name": "Comunicare",
    "access": [
      "correspondence",
      "forces",
      "mind",
      "spirit",
      "time"
    ],
    "amalgams": [
      "life"
    ],
    "amalgamsNote": "",
    "intro": "Parli e ricevi risposta dove la voce non arriva.",
    "bySphere": {
      "mind": "è mente a mente, con una persona, una fata, la Cabala, in qualunque lingua.",
      "correspondence": "parli a chi sta nel luogo che osservi a distanza.",
      "forces": "proietti la voce lontano o dentro una radio, un telefono.",
      "spirit": "apri una trattativa formale con uno spirito, il famiglio, il patrono.",
      "time": "avverti il te di ieri."
    },
    "coda": "È uno scambio: l'altro ti sente e può risponderti, o tacere.",
    "limit": "comunichi e non comandi; l'altro resta libero di non rispondere.",
    "thresholds": [
      {
        "base": 3,
        "scopes": {
          "duration": 2,
          "impact": 1
        }
      }
    ],
    "thresholdText": "3 (Durata 2, Impatto 1)",
    "use": "In genere è pensato per una conversazione che dura la scena; una parola sola, subito, costa meno (Durata 0).",
    "powers": [
      "armonia-a-distanza",
      "interprete",
      "l-avevo-preparata"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "condizionare",
    "name": "Condizionare",
    "access": [
      "correspondence",
      "entropy",
      "mind"
    ],
    "amalgams": [
      "time",
      "life"
    ],
    "amalgamsNote": "",
    "intro": "Fa quello che vuoi tu, e lo crede suo.",
    "bySphere": {
      "mind": "la persona dice tutto, sceglie la porta che volevi, sogna quello che gli dici.",
      "entropy": "le coincidenze lo portano dove vuoi, l'autobus perso, l'incontro casuale, la strada chiusa.",
      "correspondence": "chi percorre una strada arriva dove hai deciso tu."
    },
    "coda": "Nessun ordine: il soggetto raramente se ne accorge, e quello che fa lo sente suo.",
    "limit": "indirizza e non ordina; lascia crepe che un altro esperto sa leggere.",
    "thresholds": [
      {
        "base": 4,
        "scopes": {
          "impact": 3,
          "duration": 1
        }
      }
    ],
    "thresholdText": "4 (Impatto 3, Durata 1)",
    "use": "In genere è pensato per decidere l'esito di una scena senza lasciare tracce; tenere qualcuno sul filo per giorni sale con la Durata.",
    "powers": [
      "si-trova-tutto",
      "fuori-dai-piedi",
      "alle-strette",
      "segnale"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "confondere",
    "name": "Confondere",
    "access": [
      "entropy",
      "forces",
      "matter",
      "mind",
      "life"
    ],
    "amalgams": [],
    "amalgamsNote": "",
    "intro": "Dai un malus: perde dadi, perde l'azione, perde il filo.",
    "bySphere": {
      "entropy": "inciampa, l'arma si inceppa, la serratura non scatta.",
      "forces": "il pavimento è ghiaccio o colla, la luce negli occhi, il frastuono.",
      "matter": "la porta pesa, l'arma è goffa, la maniglia scivola.",
      "mind": "la paura sale, il filo si perde.",
      "life": "il crampo, la nausea, il fiato corto."
    },
    "coda": "Quanto pesa lo dice l'Ambito Condizioni: da un disturbo (−1 ai dadi) a un'azione bloccata.",
    "limit": "dura quanto lo tieni; non danneggia e non ferma.",
    "thresholds": [
      {
        "base": 3,
        "scopes": {
          "conditions": 2,
          "duration": 1
        }
      }
    ],
    "thresholdText": "3 (Condizioni 2, Durata 1)",
    "use": "In genere è pensato per togliere un mezzo a un avversario per pochi turni (l'arma, la corsa, la mira); un malus più pesante sale con le Condizioni.",
    "powers": [
      "distrazione"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "contrastare",
    "name": "Contrastare",
    "access": [
      "correspondence",
      "entropy",
      "forces",
      "matter",
      "mind",
      "prime",
      "spirit",
      "time",
      "life"
    ],
    "amalgams": [],
    "amalgamsNote": "Primordio con la Sfera dell'effetto",
    "intro": "Fermi la Magick di un altro mentre la lancia. Serve la Sfera del suo effetto.",
    "bySphere": {
      "forces": "fermi l'energia scagliata.",
      "mind": "le illusioni, gli ordini e le letture.",
      "life": "la carne che sta toccando.",
      "correspondence": "i suoi fili e i suoi varchi.",
      "spirit": "le sue evocazioni.",
      "time": "gli istanti che ruba.",
      "entropy": "la fortuna comprata e le maledizioni.",
      "matter": "quello che sta plasmando.",
      "prime": "gli spegni la Quintessenza e l'effetto nasce stanco; con la Sfera giusta accanto si spegne prima di arrivare."
    },
    "coda": "Si tira contro il suo lancio: vince chi ha più successi.",
    "limit": "vale su un effetto in corso, non su un colpo e non su un effetto già compiuto; serve la Sfera del suo effetto.",
    "thresholds": [
      {
        "base": 3,
        "scopes": {
          "impact": 3
        }
      }
    ],
    "thresholdText": "3 (Impatto 3)",
    "use": "In genere è pensato per il duello: un lancio contro un lancio, nello stesso turno.",
    "powers": [
      "difendersi-dalla-sfera"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "costruire",
    "name": "Costruire",
    "access": [
      "forces",
      "matter",
      "mind",
      "prime",
      "life"
    ],
    "amalgams": [
      "spirit"
    ],
    "amalgamsNote": "",
    "intro": "Fai esistere una cosa complessa che regge da sola.",
    "bySphere": {
      "matter": "un motore, un edificio, un veicolo, un Cyborg.",
      "forces+prime": "un piccolo sole, una fonte autonoma che nessuna rete alimenta.",
      "matter+prime+life": "l'innesto nel corpo, l'organo nuovo, il metallo accettato dalla carne.",
      "mind": "riforgi ricordi interi.",
      "prime": "dai alla cosa la Quintessenza che la tiene in piedi."
    },
    "coda": "Quello che costruisci funziona e resta, e non ha bisogno di te per andare avanti.",
    "limit": "ciò che il mondo conosce; il mai visto chiede Inventare.",
    "thresholds": [
      {
        "base": 6,
        "scopes": {
          "potency": 2,
          "duration": 3,
          "impact": 1
        }
      }
    ],
    "thresholdText": "6 (Potenza 2, Durata 3, Impatto 1)",
    "use": "In genere costruisce una cosa fino a 100 kg che regge per un mese; un edificio o un veicolo salgono con la Potenza (Peso).",
    "powers": [
      "fai-da-te"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "creare-e-distruggere",
    "name": "Creare e Distruggere",
    "access": [
      "entropy",
      "forces",
      "matter",
      "mind",
      "prime",
      "time"
    ],
    "amalgams": [],
    "amalgamsNote": "",
    "intro": "Fai esistere una cosa semplice, e la cosa è vera; oppure la fai smettere di esistere o di funzionare.",
    "bySphere": {
      "matter": "crei un coltello, una chiave, dell'acqua, una corda, o riduci in pezzi un oggetto, una serranda, un edificio, un Cyborg.",
      "forces": "accendi una fiamma, una scintilla, un lampo, un suono, una scarica, o spegni per sempre l'elettronica di una stanza, l'energia di un isolato.",
      "entropy": "crei fortuna dal nulla, o il guasto è certo e il motore non riparte più.",
      "mind": "crei un pensiero, un'emozione nuova, un'immagine.",
      "prime": "dardi e lame di energia grezza finché la Quintessenza regge.",
      "time": "accanto a Entropia o Materia, la cosa invecchia fino a cadere, ruggine e polvere di decenni in un minuto."
    },
    "coda": "Per creare dal nulla serve anche Primordio: senza, la fiamma vuole un innesco e il coltello un pezzo di metallo da cui partire.",
    "limit": "una cosa sola, che si tiene in una mano; cose, non esseri; ciò che non deve tornare mai più chiede Annientare.",
    "thresholds": [
      {
        "base": 4,
        "scopes": {
          "potency": 1,
          "impact": 2,
          "duration": 1
        }
      }
    ],
    "thresholdText": "4 (Potenza 1, Impatto 2, Durata 1)",
    "use": "In genere fa comparire un oggetto fino a 10 kg per pochi turni, o rompere per sempre un oggetto della stessa taglia; una cosa creata che resta sale con la Durata.",
    "powers": [
      "ce-l-ho",
      "a-credito",
      "guasto"
    ],
    "newPowers": [
      "guasto"
    ],
    "byBlue": false
  },
  {
    "id": "danneggiare",
    "name": "Danneggiare",
    "access": [
      "correspondence",
      "entropy",
      "forces",
      "matter",
      "mind",
      "prime",
      "spirit",
      "time",
      "life"
    ],
    "amalgams": [],
    "amalgamsNote": "",
    "intro": "Fai male a un bersaglio con la tua Sfera.",
    "bySphere": {
      "forces": "gli scaglia addosso il fulmine, la fiamma, l'onda d'urto o il colpo cinetico, a una persona, un gruppo, un veicolo.",
      "life": "gli apre le ferite con le mani addosso.",
      "mind": "lo colpisce nella Volontà, mente contro mente.",
      "entropy": "gli fa marcire la carne, o gli fa capitare l'incidente.",
      "correspondence": "gli stropiccia lo spazio addosso.",
      "matter": "la carne trattata come materiale, e i Cyborg.",
      "spirit": "l'anima, la Saggezza; gli spiriti.",
      "time": "con Vita, gli scarica decenni nel corpo in un istante.",
      "prime": "colpisce qualunque Modello alla radice."
    },
    "coda": "I danni sono superficiali; se si spende 1 punto Quintessenza nel lancio divengono aggravati, dove la Sfera lo permette (il fuoco, il fulmine, la carne strappata). Il bersaglio si difende come da un attacco qualunque. A seconda del tipo di creatura servono Sfere diverse per ferirla, come Materia per un vampiro o un Cyborg, Spirito e Vita per un licantropo, Spirito con Primordio per uno spirito etc..",
    "limit": "esseri, vivi o che lo sono stati, oppure ciò che sta sulla traiettoria di una forza; le Condizioni (Stordito, Atterrato, Accecato) si comprano con l'Ambito Condizioni dentro lo stesso lancio.",
    "thresholds": [
      {
        "base": 4,
        "scopes": {
          "potency": 3,
          "impact": 1
        }
      }
    ],
    "thresholdText": "4 (Potenza 3, Impatto 1)",
    "use": "In genere fa 4 danni superficiali a un bersaglio avendo Areté 1.",
    "powers": [
      "a-stordire",
      "brucia-ancora",
      "bruciature",
      "onda-d-urto",
      "perforante",
      "semplice-violenza",
      "colpo-decisivo",
      "sferzata"
    ],
    "newPowers": [
      "sferzata"
    ],
    "byBlue": false
  },
  {
    "id": "destinare",
    "name": "Destinare",
    "access": [
      "entropy"
    ],
    "amalgams": [
      "correspondence",
      "mind",
      "prime",
      "life"
    ],
    "amalgamsNote": "",
    "intro": "Riscrivi il destino.",
    "bySphere": {
      "entropy": "una persona, due persone, un luogo: intrecci due vite che non si sarebbero mai incontrate, dai a un luogo il domani che hai deciso; con Primordio accanto fai nascere una vita che non era prevista."
    },
    "coda": "Più di una coincidenza: è la direzione che le coincidenze prendono da adesso in poi, e il Narratore le fa arrivare una alla volta, nelle scene e nelle sessioni dopo.",
    "limit": "il conto si sbilancia e presenta il resto quando vuole lui.",
    "thresholds": [
      {
        "base": 8,
        "scopes": {
          "impact": 5,
          "duration": 3
        }
      }
    ],
    "thresholdText": "8 (Impatto 5, Durata 3)",
    "use": "In genere è pensato per cambiare la direzione di un capitolo; un destino che dura una storia sale con la Durata.",
    "powers": [
      "scommessa",
      "tarocchi"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "dominare",
    "name": "Dominare",
    "access": [
      "entropy",
      "forces",
      "matter",
      "mind",
      "spirit",
      "life"
    ],
    "amalgams": [
      "correspondence",
      "prime",
      "time"
    ],
    "amalgamsNote": "",
    "intro": "Dai un ordine, e obbedisce.",
    "bySphere": {
      "mind": "è l'ordine assoluto a una persona, una fata, un gruppo.",
      "spirit": "comandi uno spirito evocato, per nome se hai anche Mente.",
      "forces": "dirigi l'energia, il fuoco, la corrente, il meteo su un perimetro.",
      "life": "pilota il corpo di un altro, o con Primordio fai camminare un cadavere.",
      "matter+prime": "le ossa nude si alzano in piedi.",
      "entropy+time": "scegli il domani fra quelli possibili."
    },
    "coda": "L'ordine dura la scena, poi finisce.",
    "limit": "l'ordine finisce con la scena; ogni ordine dato a una mente lascia crepe, e un altro esperto le legge.",
    "thresholds": [
      {
        "base": 6,
        "scopes": {
          "conditions": 3,
          "duration": 2,
          "impact": 1
        }
      }
    ],
    "thresholdText": "6 (Condizioni 3, Durata 2, Impatto 1)",
    "use": "In genere è pensato per un ordine che blocca un'azione o ne impone una, per la scena; comandare chi decide per sé sale sulle Condizioni.",
    "powers": [
      "niente-al-caso",
      "goccia-a-goccia"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "drenare",
    "name": "Drenare",
    "access": [
      "entropy",
      "forces",
      "prime"
    ],
    "amalgams": [
      "spirit",
      "life"
    ],
    "amalgamsNote": "",
    "intro": "Prendi per te ciò che lo teneva in piedi.",
    "bySphere": {
      "prime": "prendi la Quintessenza da un Nodo, una Meraviglia, una creatura, un mago.",
      "forces": "il calore di una stanza, la corrente, tutta l'energia in scena.",
      "entropy": "la fortuna di una persona, che passa a te."
    },
    "coda": "Quello che prendi lo usi: la Quintessenza entra nella tua Ruota, l'energia la scagli o la tieni, la fortuna gira dalla tua parte la coincidenza che stava per andare a lui.",
    "limit": "chi viene drenato resta vuoto e se ne accorge; sui viventi lascia Macchie.",
    "thresholds": [
      {
        "base": 4,
        "scopes": {
          "potency": 3,
          "impact": 1
        }
      }
    ],
    "thresholdText": "4 (Potenza 3, Impatto 1)",
    "use": "In genere prende 3 punti (Quintessenza, energia, fortuna) a un bersaglio che tocchi.",
    "powers": [
      "il-banco-vince",
      "ladro-di-fortuna",
      "porto-sfortuna-io",
      "scambio-di-sorte",
      "risarcimento",
      "sifone",
      "pellegrino",
      "parassita"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "evocare",
    "name": "Evocare",
    "access": [
      "forces",
      "spirit"
    ],
    "amalgams": [
      "correspondence",
      "mind",
      "life"
    ],
    "amalgamsNote": "",
    "intro": "Chiami qui chi esiste altrove, e viene.",
    "bySphere": {
      "spirit": "uno spirito, il famiglio, un'entità, un morto recente.",
      "forces": "l'energia che c'è altrove, la corrente della città, il fuoco del camino, il vento."
    },
    "coda": "Quello che arriva è vero e resta libero: uno spirito chiamato è presente, non tuo, e tratta, aiuta o si arrabbia per conto suo.",
    "limit": "fa venire e non comanda; per comandare serve Dominare, per trattenere Vincolare.",
    "thresholds": [
      {
        "base": 4,
        "scopes": {
          "impact": 2,
          "duration": 2
        }
      }
    ],
    "thresholdText": "4 (Impatto 2, Durata 2)",
    "use": "In genere è pensato per far arrivare uno spirito o un'energia per la scena.",
    "powers": [
      "lascio-fare-a-lui",
      "angelo-custode",
      "patto-col-diavolo"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "fissare",
    "name": "Fissare",
    "access": [
      "matter",
      "prime",
      "time",
      "life"
    ],
    "amalgams": [],
    "amalgamsNote": "",
    "intro": "Metti fuori dal flusso: permanente, radicato, sospeso.",
    "bySphere": {
      "matter": "un mutamento diventa definitivo.",
      "prime": "un incantesimo si radica nell'Arazzo e regge da solo.",
      "time": "un punto fermo, un effetto sospeso che scatta quando dici tu, gli anni che ti scorrono accanto senza toccarti.",
      "life": "un corpo riscritto diventa il suo Modello vero, e nessuna Magick lo riporta indietro."
    },
    "coda": "È la Formula che chiude il lavoro delle altre: prima trasformi, poi fissi.",
    "limit": "fissa ciò che c'è, non aggiunge e non ferma il mondo; lo rende definitivo.",
    "thresholds": [
      {
        "base": 9,
        "scopes": {
          "duration": 7,
          "impact": 2
        }
      }
    ],
    "thresholdText": "9 (Durata 7, Impatto 2)",
    "use": "In genere è pensato per rendere permanente un effetto tuo; sospenderlo fino a un segnale costa meno, con le Condizioni al posto della Durata.",
    "powers": [
      "tenuta",
      "preparato-a-casa",
      "fatto-per-durare"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "guarire",
    "name": "Guarire",
    "access": [
      "mind",
      "life"
    ],
    "amalgams": [
      "matter",
      "spirit"
    ],
    "amalgamsNote": "",
    "intro": "Che sia corpo, mente o anima, guarisci quella parte del soggetto, chiudi le ferite, rimuovi la febbre, risaldi l'osso, gli dai quel sollievo di pace che da molto cercava.",
    "bySphere": {
      "life": "il corpo di una persona, di un animale, di una pianta: ferite, malattie, veleni.",
      "mind": "la Volontà."
    },
    "coda": "Se si spende 1 punto Quintessenza nel lancio i danni guariti divengono aggravati invece che superficiali. Guarire toglie anche una Condizione al soggetto (Avvelenato, Stordito, Spaventato etc..). A seconda del tipo di creatura potrebbero essere richieste Sfere differenti per poterla guarire, come Materia e Vita per un vampiro, Vita e Spirito per un licantropo, Mente e Vita per una fata etc..",
    "limit": "Guarire non è Riparare.",
    "thresholds": [
      {
        "base": 4,
        "scopes": {
          "potency": 3,
          "impact": 1
        }
      }
    ],
    "thresholdText": "4 (Potenza 3, Impatto 1)",
    "use": "In genere guarisce 4 danni superficiali avendo Areté 1.",
    "powers": [
      "al-posto-tuo",
      "morale",
      "pace",
      "chiodo-fisso",
      "pisolino",
      "tempra",
      "buona-forchetta",
      "infermeria",
      "sangue-per-sangue",
      "bisturi",
      "in-piedi",
      "non-sotto-il-mio-turno",
      "rigenerazione",
      "pronto-soccorso"
    ],
    "newPowers": [
      "pronto-soccorso"
    ],
    "byBlue": true
  },
  {
    "id": "ingannare",
    "name": "Ingannare",
    "access": [
      "forces",
      "mind",
      "time",
      "life"
    ],
    "amalgams": [
      "prime"
    ],
    "amalgamsNote": "",
    "intro": "Fai vedere il falso: illusioni, immagini, voci, volti.",
    "bySphere": {
      "mind": "l'illusione sta nella testa di una persona, di una fata, o di tutti i presenti.",
      "forces+prime": "è fatta di luce e suono, vera per gli occhi e per le telecamere.",
      "life": "è un volto, una voce, una ferita che non c'è.",
      "time": "chi è con te vede un passato o un futuro che non è quello vero."
    },
    "coda": "Il falso non è vero: la fiamma finta non scalda, il muro finto non regge.",
    "limit": "mostra il falso e non nasconde il vero, che è Celare; a tutti i presenti insieme, senza Forza, l'illusione mentale nasce Volgare.",
    "thresholds": [
      {
        "base": 4,
        "scopes": {
          "duration": 2,
          "impact": 2
        }
      }
    ],
    "thresholdText": "4 (Durata 2, Impatto 2)",
    "use": "In genere è pensato per un'illusione che regge la scena davanti a uno o pochi; a tutti i presenti sale con i Bersagli.",
    "powers": [
      "miraggio"
    ],
    "newPowers": [
      "miraggio"
    ],
    "byBlue": false
  },
  {
    "id": "inventare",
    "name": "Inventare",
    "access": [
      "forces",
      "matter",
      "mind",
      "prime",
      "spirit",
      "life"
    ],
    "amalgams": [],
    "amalgamsNote": "",
    "intro": "Fai esistere ciò che non esisteva per nessuno.",
    "bySphere": {
      "forces": "un'energia nuova.",
      "matter": "una lega impossibile.",
      "prime": "un Nodo, la Quintessenza dal nulla.",
      "mind+prime": "una coscienza.",
      "prime+spirit": "un'entità nuova, un Regno.",
      "prime+life": "un organismo nuovo."
    },
    "coda": "Ciò che nasce ha regole sue, e nessun laboratorio saprà dire cos'è.",
    "limit": "ciò che nasce ha regole sue; la coscienza, l'entità e l'organismo chiedono Primordio accanto.",
    "thresholds": [
      {
        "base": 8,
        "scopes": {
          "impact": 5,
          "potency": 3
        }
      }
    ],
    "thresholdText": "8 (Impatto 5, Potenza 3)",
    "use": "In genere è pensato per far nascere una cosa che cambia il capitolo; il mondo con leggi nuove lo fa Rivoluzionare.",
    "powers": [
      "terra-sacra"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "invulnerabilita",
    "name": "Invulnerabilità",
    "access": [
      "forces",
      "mind",
      "prime",
      "life"
    ],
    "amalgams": [
      "spirit"
    ],
    "amalgamsNote": "",
    "intro": "Niente ti tocca, per la scena.",
    "bySphere": {
      "forces": "nessuna energia, fuoco, fulmine, urto, freddo.",
      "life": "nessuna ferita, veleno, malattia.",
      "mind": "nessuna mente altrui entra.",
      "prime": "la Magick altrui e il Paradosso ti scivolano addosso."
    },
    "coda": "Non pari e non schivi: il colpo arriva e non fa niente.",
    "limit": "tu e non un luogo; dura una scena e poi finisce.",
    "thresholds": [
      {
        "base": 7,
        "scopes": {
          "potency": 3,
          "duration": 2,
          "impact": 2
        }
      }
    ],
    "thresholdText": "7 (Potenza 3, Durata 2, Impatto 2)",
    "use": "In genere è pensato per una scena intera senza subire il dominio della tua Sfera; pochi turni costano meno (Durata 1).",
    "powers": [
      "doppio-cuore",
      "duro-a-morire"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "mutare",
    "name": "Mutare",
    "access": [
      "forces",
      "matter",
      "life"
    ],
    "amalgams": [
      "mind"
    ],
    "amalgamsNote": "",
    "intro": "Cambi un dettaglio e lasci intatto il resto.",
    "bySphere": {
      "forces": "il colore della fiamma, il tono della luce, la frequenza di un suono.",
      "matter": "i denti di una chiave, gli appigli su una parete, la lega dei proiettili.",
      "life": "i tuoi connotati, capelli, lineamenti, impronte, voce."
    },
    "coda": "La cosa resta quella: è il dettaglio che è un altro, e resta cambiato finché qualcuno lo disfa.",
    "limit": "un dettaglio, non la forma intera, che è Trasformare.",
    "thresholds": [
      {
        "base": 3,
        "scopes": {
          "duration": 2,
          "impact": 1
        }
      }
    ],
    "thresholdText": "3 (Durata 2, Impatto 1)",
    "use": "In genere è pensato per un ritocco che dura la scena: la chiave che entra, il volto che non corrisponde alla foto.",
    "powers": [
      "dettaglio"
    ],
    "newPowers": [
      "dettaglio"
    ],
    "byBlue": false
  },
  {
    "id": "percepire",
    "name": "Percepire",
    "access": [
      "correspondence",
      "entropy",
      "forces",
      "matter",
      "mind",
      "prime",
      "spirit",
      "time",
      "life"
    ],
    "amalgams": [],
    "amalgamsNote": "",
    "intro": "Capisci se una cosa del dominio della tua Sfera c'è oppure non c'è, qui e adesso, anche dove i sensi non arrivano.",
    "bySphere": {
      "forces": "senti l'energia, il calore, la corrente, le sagome oltre la parete.",
      "life": "la salute, l'età vera, un'emorragia, il farmaco che mente.",
      "mind": "l'umore di una folla o di un luogo, e da dove arriva.",
      "matter": "i pieni e i vuoti, il doppio fondo, il metallo sotto la stoffa.",
      "spirit": "la Penumbra, il Velo, le presenze.",
      "prime": "la magia calda, la firma, la Quintessenza in un Nodo, in una Meraviglia, in un mago.",
      "entropy": "la fortuna toccata e la sfortuna costruita.",
      "time": "l'ora esatta, le anomalie, la scena passata o futura che rivive.",
      "correspondence": "le distanze, i vani nascosti, chi ti osserva da lontano, un luogo remoto."
    },
    "coda": "",
    "limit": "presenza o assenza, nella scena; cosa c'è dentro lo dice Sapere.",
    "thresholds": [
      {
        "base": 2,
        "scopes": {
          "impact": 1,
          "duration": 1
        }
      }
    ],
    "thresholdText": "2 (Impatto 1, Durata 1)",
    "use": "In genere dice se c'è o non c'è, qui e adesso, e tiene il senso acceso per qualche turno.",
    "powers": [
      "quadrante",
      "sentinella",
      "sesto-senso"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "possedere",
    "name": "Possedere",
    "access": [
      "mind",
      "spirit",
      "life"
    ],
    "amalgams": [
      "correspondence",
      "time"
    ],
    "amalgamsNote": "",
    "intro": "È tuo anche quando non ci sei.",
    "bySphere": {
      "mind": "lasci in una persona un ordine dormiente che scatta quando dici tu, o una mente che torna a te.",
      "spirit": "abiti un corpo che non è tuo.",
      "mind+life": "usi il corpo di un altro come il tuo."
    },
    "coda": "Il soggetto non sa di essere tuo: vive, e in mezzo alla sua vita c'è un pezzo che risponde a te.",
    "limit": "non è un patto: il soggetto non lo sa e non ha acconsentito.",
    "thresholds": [
      {
        "base": 7,
        "scopes": {
          "impact": 4,
          "duration": 2,
          "conditions": 1
        }
      }
    ],
    "thresholdText": "7 (Impatto 4, Durata 2, Condizioni 1)",
    "use": "In genere è pensato per una possessione o un ordine dormiente che dura la scena; un'abitazione lunga sale con la Durata.",
    "powers": [
      "l-avatar-reagisce"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "potenziare",
    "name": "Potenziare",
    "access": [
      "entropy",
      "forces",
      "matter",
      "mind",
      "prime",
      "spirit",
      "time",
      "life"
    ],
    "amalgams": [],
    "amalgamsNote": "",
    "intro": "Dai un bonus: è più di quello che era.",
    "bySphere": {
      "life": "il tuo corpo, gli Attributi, gli artigli, le branchie, la corazza, i bisogni in pausa.",
      "forces": "la brace, il suono, la corrente, il colpo.",
      "matter": "un vestito, una lama, una corda, un veicolo.",
      "mind": "la concentrazione, la memoria, la calma.",
      "prime": "un'arma fa danni aggravati e morde anche gli spiriti.",
      "spirit": "un oggetto svegliato lavora per te.",
      "time": "l'iniziativa, il vantaggio del primo istante.",
      "entropy": "la cosa vecchia che regge, il motore che parte, il piano che tiene."
    },
    "coda": "Il bonus si conta in dadi o in livelli, e quanto lo dice la Potenza.",
    "limit": "dura quanto lo tieni; non ripara e non cambia la natura.",
    "thresholds": [
      {
        "base": 4,
        "scopes": {
          "potency": 2,
          "duration": 2
        }
      }
    ],
    "thresholdText": "4 (Potenza 2, Durata 2)",
    "use": "In genere è pensato per due dadi in più, o due livelli, per la scena.",
    "powers": [
      "il-giusto-attrezzo",
      "tutto-e-un-arma",
      "fatto-da-me",
      "opera",
      "come-da-piano",
      "anche-a-mani-nude",
      "coro",
      "doppia-modifica",
      "piu-forte-di-prima",
      "allenamento",
      "appoggio",
      "adrenalina"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "prevedere",
    "name": "Prevedere",
    "access": [
      "entropy",
      "forces",
      "mind",
      "time"
    ],
    "amalgams": [
      "correspondence",
      "matter",
      "life"
    ],
    "amalgamsNote": "",
    "intro": "Un'idea di cosa sta per accadere.",
    "bySphere": {
      "entropy": "quanto è probabile una cosa, quanto manca alla rottura, alla rovina, alla fine.",
      "forces": "quanto resta a un'energia, la batteria, il quadro elettrico, il temporale.",
      "mind": "cosa vuole fare una persona o una fata, le intenzioni, i desideri.",
      "time": "i punti fissi che accadranno, gli indizi, il primo istante della violenza."
    },
    "coda": "Con pochi successi hai un'idea, con molti un fatto; un futuro visto può ancora cambiare.",
    "limit": "vedi il futuro prossimo, non lo cambi.",
    "thresholds": [
      {
        "base": 2,
        "scopes": {
          "impact": 2
        }
      }
    ],
    "thresholdText": "2 (Impatto 2)",
    "use": "In genere dice cosa succederà nei prossimi istanti a una cosa che hai davanti; il domani di una persona sale con l'Impatto.",
    "powers": [
      "mai-colto-di-sorpresa",
      "due-mosse-avanti",
      "segni",
      "il-prezzo-prima",
      "l-avevo-previsto",
      "flash-forward"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "proteggere",
    "name": "Proteggere",
    "access": [
      "correspondence",
      "entropy",
      "forces",
      "matter",
      "mind",
      "prime",
      "spirit",
      "time"
    ],
    "amalgams": [
      "life"
    ],
    "amalgamsNote": "",
    "intro": "Pari: il colpo arriva e non passa.",
    "bySphere": {
      "forces": "uno scudo di energia contro i colpi, su di te o su un altro.",
      "matter": "il vestito, la barricata, la porta reggono.",
      "correspondence": "sei fuori dalla mira e dalla Magick a distanza.",
      "mind": "la tua psiche e un ricordo sono blindati.",
      "spirit": "niente spiriti e niente possessione.",
      "entropy": "la catena dei guasti si ferma dov'è.",
      "prime": "il Paradosso e il Contraccolpo sono attutiti o traslati.",
      "time": "il passo nel futuro che scarta il colpo."
    },
    "coda": "Quanto toglie a ogni colpo lo dice la Potenza.",
    "limit": "para il colpo e non ti rende immune a ciò che ti entra dentro, che è Resistere; lo scudo occupa un filo finché lo porti.",
    "thresholds": [
      {
        "base": 4,
        "scopes": {
          "potency": 2,
          "duration": 2
        }
      }
    ],
    "thresholdText": "4 (Potenza 2, Durata 2)",
    "use": "In genere è pensato per uno scudo che toglie 2 danni a ogni colpo per la scena.",
    "powers": [
      "angolo-morto",
      "roulette",
      "mi-metto-in-mezzo",
      "oggetto-sacrificale",
      "il-mio-disastro",
      "prendo-io",
      "parafulmine",
      "reliquia",
      "incassare"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "resistere",
    "name": "Resistere",
    "access": [
      "entropy",
      "forces",
      "mind",
      "spirit",
      "life"
    ],
    "amalgams": [
      "prime"
    ],
    "amalgamsNote": "",
    "intro": "Ciò che ti entra dentro non fa presa.",
    "bySphere": {
      "life": "veleni, malattie, fatica.",
      "forces": "fuoco, fulmine, freddo, suono.",
      "mind": "suggestioni, letture, ordini.",
      "spirit": "spiriti, possessione, l'attrito del Velo.",
      "entropy": "la sfortuna e le maledizioni."
    },
    "coda": "Lavora da sola, addosso a te: non pari, non ti accorgi nemmeno del colpo.",
    "limit": "passiva e su di te; non para il colpo (Proteggere) e non ferma l'effetto altrui in corso (Contrastare).",
    "thresholds": [
      {
        "base": 3,
        "scopes": {
          "duration": 2,
          "impact": 1
        }
      }
    ],
    "thresholdText": "3 (Durata 2, Impatto 1)",
    "use": "In genere è pensato per una cosa sola (un veleno, il fuoco, le suggestioni) per la scena; l'immunità intera è Invulnerabilità.",
    "powers": [
      "valvola-di-sfogo",
      "vaccino",
      "canto-del-cigno",
      "ferro-nel-sangue"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "resuscitare",
    "name": "Resuscitare",
    "access": [
      "prime",
      "spirit",
      "life"
    ],
    "amalgams": [],
    "amalgamsNote": "",
    "intro": "Il morto torna. Servono tutte e tre le Sfere insieme, e nessuna basta da sola.",
    "bySphere": {
      "life": "rimette in moto il corpo che ha lasciato da poco.",
      "spirit": "richiama l'anima da oltre il Velo.",
      "prime": "riaccende la scintilla nel Modello spento."
    },
    "coda": "Chi torna è quello di prima, e tutti quelli che erano nella stanza hanno visto un morto alzarsi.",
    "limit": "servono Vita, Spirito e Primordio insieme; è sempre Volgare, ovunque; il morto da tempo non torna.",
    "thresholds": [
      {
        "base": 8,
        "scopes": {
          "impact": 5,
          "potency": 3
        }
      }
    ],
    "thresholdText": "8 (Impatto 5, Potenza 3)",
    "use": "In genere è pensato per riportare un compagno morto in questa sessione, e cambia la direzione del capitolo; il Narratore può dichiararla impresa impossibile (+5).",
    "powers": [
      "il-ritorno"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "riavvolgere",
    "name": "Riavvolgere",
    "access": [
      "time"
    ],
    "amalgams": [
      "correspondence",
      "matter",
      "mind",
      "life"
    ],
    "amalgamsNote": "",
    "intro": "Riporti indietro gli ultimi istanti. La scena torna a pochi turni fa, e quello che è successo non è successo.",
    "bySphere": {
      "time": "la scena, con chi c'era dentro.",
      "life": "accanto a Tempo, una ferita si richiude a ritroso.",
      "matter": "accanto a Tempo, un oggetto rotto torna intero.",
      "mind": "accanto a Tempo, ricordi quello che hai riavvolto, tu solo."
    },
    "coda": "Chi era nella scena rifà le sue mosse, e stavolta tu sai cosa sta per fare.",
    "limit": "poco fa e non il fatto intero; per ricordare la scena riavvolta serve Mente.",
    "thresholds": [
      {
        "base": 4,
        "scopes": {
          "duration": 1,
          "impact": 3
        }
      }
    ],
    "thresholdText": "4 (Durata 1, Impatto 3)",
    "use": "In genere è pensato per riavvolgere pochi turni e decidere l'esito della scena; una scena intera sale con la Durata.",
    "powers": [
      "c-ho-ripensato",
      "seconda-possibilita"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "riparare",
    "name": "Riparare",
    "access": [
      "forces",
      "matter",
      "prime"
    ],
    "amalgams": [
      "time"
    ],
    "amalgamsNote": "",
    "intro": "Riporti a funzionare una cosa.",
    "bySphere": {
      "matter": "un oggetto, un ingranaggio, un vetro, un edificio, un Cyborg.",
      "forces": "un motore, un impianto, una corrente, una fiamma spenta.",
      "prime": "ricarichi una Meraviglia scarica."
    },
    "coda": "Torna com'era, non di più: il vetro incrinato torna intero, il motore riparte, la Meraviglia si riempie.",
    "limit": "cose, non corpi: un corpo o una mente chiedono Guarire; torna com'era, esattamente com'era.",
    "thresholds": [
      {
        "base": 3,
        "scopes": {
          "potency": 2,
          "impact": 1
        }
      }
    ],
    "thresholdText": "3 (Potenza 2, Impatto 1)",
    "use": "In genere rimette a posto un oggetto fino a 100 kg che tocchi; un edificio sale con la Potenza (Peso).",
    "powers": [
      "bottino",
      "pulito",
      "casa-dolce-casa",
      "pila"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "ripetere",
    "name": "Ripetere",
    "access": [
      "time"
    ],
    "amalgams": [
      "correspondence",
      "entropy",
      "mind"
    ],
    "amalgamsNote": "",
    "intro": "Chiudi in un anello: gli stessi minuti, ancora e ancora.",
    "bySphere": {
      "time": "un'area, una scena, tre minuti che ricominciano ogni volta che finiscono, e chi sta dentro probabilmente non se ne accorge.",
      "mind": "accanto a Tempo, tu ricordi ogni giro.",
      "correspondence": "accanto a Tempo, l'anello si chiude su un luogo che guardi da lontano.",
      "entropy": "accanto a Tempo, si chiude sempre sullo stesso incidente."
    },
    "coda": "",
    "limit": "finisce quando decidi tu.",
    "thresholds": [
      {
        "base": 4,
        "scopes": {
          "duration": 2,
          "impact": 2
        }
      }
    ],
    "thresholdText": "4 (Durata 2, Impatto 2)",
    "use": "In genere è pensato per chiudere una stanza in un anello per la scena: la guardia rifà la sua ronda e non arriva mai in fondo.",
    "powers": [
      "ciak-si-gira",
      "memoria-muscolare",
      "la-pratica-rende-perfetti"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "risanare",
    "name": "Risanare",
    "access": [
      "mind",
      "spirit",
      "time",
      "life"
    ],
    "amalgams": [
      "prime"
    ],
    "amalgamsNote": "",
    "intro": "Riporti indietro ciò che era dichiarato perduto.",
    "bySphere": {
      "life": "l'inguaribile, l'arto, la vecchia frattura, di una persona o di un animale.",
      "mind": "una mente lacerata, una Volontà a pezzi, una personalità riscritta da altri.",
      "spirit+life": "le Macchie sull'anima, dopo la prova.",
      "time": "il corpo com'era prima, gli anni tolti o restituiti."
    },
    "coda": "Quello che la medicina e il tempo davano per finito torna com'era.",
    "limit": "il perduto, non il morto; la prova dell'anima si apre una volta sola per cronaca, a testa.",
    "thresholds": [
      {
        "base": 7,
        "scopes": {
          "potency": 3,
          "impact": 4
        }
      }
    ],
    "thresholdText": "7 (Potenza 3, Impatto 4)",
    "use": "In genere è pensato per una cosa che la scena non può dare per scontata, e le scene dopo ne risentono.",
    "powers": [
      "convalescenza"
    ],
    "newPowers": [
      "convalescenza"
    ],
    "byBlue": false
  },
  {
    "id": "ritoccare",
    "name": "Ritoccare",
    "access": [
      "correspondence",
      "entropy",
      "forces",
      "matter",
      "mind",
      "prime",
      "spirit",
      "time",
      "life"
    ],
    "amalgams": [],
    "amalgamsNote": "",
    "intro": "L'effetto minimo che ogni Sfera concede.",
    "bySphere": {
      "correspondence": "la cosa che era a portata di mano, il passo in meno.",
      "entropy": "la moneta, il dado, il semaforo che diventa verde.",
      "forces": "la candela, la lampadina, la tacca di segnale, il fiammifero.",
      "matter": "la macchia, il nodo, la serratura che scatta al secondo colpo.",
      "mind": "il nome che torna in mente, il sorriso, la distrazione di un secondo.",
      "prime": "l'aura più quieta, la candela votiva che non si spegne.",
      "spirit": "il brivido nella stanza, il cane che smette di abbaiare.",
      "time": "l'orologio che ritarda un minuto, il tempismo.",
      "life": "il mal di testa, il singhiozzo, la mano che smette di tremare."
    },
    "coda": "Nessun peso meccanico: non dà dadi, non toglie dadi, non danneggia.",
    "limit": "dopo, nessuno ricorda che sia successo qualcosa, e nemmeno tu.",
    "thresholds": [
      {
        "base": 1,
        "scopes": {
          "impact": 1
        }
      }
    ],
    "thresholdText": "1 (Impatto 1)",
    "use": "In genere è pensato per il colore della scena: un dettaglio, e basta.",
    "powers": [
      "colpo-di-fortuna",
      "il-dado-e-tratto",
      "testa-o-croce",
      "lascia-o-raddoppia",
      "ambito-di-casa"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "rivelare",
    "name": "Rivelare",
    "access": [
      "correspondence",
      "entropy",
      "forces",
      "matter",
      "mind",
      "prime",
      "spirit",
      "time",
      "life"
    ],
    "amalgams": [],
    "amalgamsNote": "",
    "intro": "Qualunque domanda sul dominio della tua Sfera ha risposta, anche sull'inspiegabile.",
    "bySphere": {
      "prime": "la Quintessenza che non dovrebbe esserci e la magia senza autore.",
      "mind": "il pensiero che non è suo, il ricordo senza una vita dietro.",
      "life": "chi era quella persona e chi l'ha cambiata.",
      "correspondence": "lo spazio piegato senza autore, chi ti guarda e da dove.",
      "spirit": "cosa si muove là in fondo e perché ti ha visto.",
      "time": "la seconda stesura del mondo e chi la corregge.",
      "entropy": "chi ha pagato la fortuna e a chi va il resto.",
      "forces": "l'energia senza causa.",
      "matter": "la lega impossibile, l'oggetto mai fabbricato, la mano che l'ha fatto."
    },
    "coda": "",
    "limit": "sul dominio della Sfera e non su tutto.",
    "thresholds": [
      {
        "base": 5,
        "scopes": {
          "impact": 4,
          "precision": 1
        }
      }
    ],
    "thresholdText": "5 (Impatto 4, Precisione 1)",
    "use": "In genere è pensato per una domanda precisa la cui risposta apre una pista per le scene dopo; un segreto della storia sale con l'Impatto.",
    "powers": [
      "conto-degli-indizi",
      "tre-ipotesi"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "rivoluzionare",
    "name": "Rivoluzionare",
    "access": [
      "correspondence",
      "entropy",
      "forces",
      "matter",
      "spirit",
      "time"
    ],
    "amalgams": [],
    "amalgamsNote": "",
    "intro": "Cambi le leggi con cui una cosa funziona.",
    "bySphere": {
      "forces": "il fuoco freddo, la luce che nutre, la gravità laterale.",
      "matter": "le proprietà di una sostanza, l'acqua che brucia.",
      "correspondence": "la geometria, luoghi fusi, continenti avvicinati.",
      "entropy": "la sorte di un luogo con regole tue.",
      "spirit": "le leggi di un Regno.",
      "time": "il verso del tempo in una valle."
    },
    "coda": "Vale in un'area, e dentro quell'area il mondo funziona a modo tuo.",
    "limit": "cambia le leggi di ciò che c'è e non fa nascere il nuovo, che è Inventare.",
    "thresholds": [
      {
        "base": 10,
        "scopes": {
          "impact": 6,
          "duration": 4
        }
      }
    ],
    "thresholdText": "10 (Impatto 6, Durata 4)",
    "use": "In genere è pensato per piegare il corso della storia in un luogo per una sessione; la valle in cui il tempo va all'indietro per sempre è un'impresa impossibile.",
    "powers": [
      "il-narratore-ti-ascolta",
      "impresa-impossibile"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "sapere",
    "name": "Sapere",
    "access": [
      "correspondence",
      "entropy",
      "forces",
      "matter",
      "mind",
      "prime",
      "spirit",
      "time",
      "life"
    ],
    "amalgams": [],
    "amalgamsNote": "",
    "intro": "Leggi cosa c'è dentro una cosa, un luogo, una persona.",
    "bySphere": {
      "mind": "emozioni, bugie, pensieri, ricordi, la leva giusta di una persona o di una fata.",
      "matter": "di cosa è fatto un oggetto, un edificio, un Cyborg, come è tenuto insieme, la sua storia.",
      "life": "le fratture, le cicatrici, il mestiere, l'età vera di un corpo.",
      "entropy": "il punto debole di un muro, di un alibi, di un piano.",
      "forces": "la dinamica della scena, chi era seduto lì, dove va la corrente.",
      "correspondence": "quale chiave apre cosa, chi è passato e dove.",
      "prime": "la firma di chi ha lanciato un effetto.",
      "spirit": "l'integrità di un'anima, cosa è morto qui, chi comanda di là.",
      "time": "il passato di una persona o di un luogo, a ritroso."
    },
    "coda": "Ottieni informazione, mai un effetto sul soggetto.",
    "limit": "le menti si difendono con la Volontà e raramente si arrendono al primo tiro.",
    "thresholds": [
      {
        "base": 3,
        "scopes": {
          "impact": 2,
          "precision": 1
        }
      }
    ],
    "thresholdText": "3 (Impatto 2, Precisione 1)",
    "use": "In genere è pensato per una lettura precisa che dà un vantaggio nella scena; un segreto che decide la scena sale con l'Impatto.",
    "powers": [
      "conosco-un-posto",
      "ho-letto-qualcosa",
      "l-ho-sentito-dire",
      "pensiero-laterale",
      "vedo-il-bluff",
      "voce-dell-avatar",
      "mestiere",
      "modello"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "simulare",
    "name": "Simulare",
    "access": [
      "entropy",
      "forces",
      "matter",
      "mind",
      "life"
    ],
    "amalgams": [
      "prime"
    ],
    "amalgamsNote": "",
    "intro": "Un falso che regge a ogni verifica.",
    "bySphere": {
      "matter": "documenti e oggetti che ogni perizia dichiara veri.",
      "mind": "un'identità, o una scena vissuta da tutti.",
      "life": "un cadavere vero per il medico legale, un corpo che passa i controlli.",
      "entropy": "un alibi che le coincidenze confermano.",
      "forces+mind+prime": "la scena che tutti vedono e toccano."
    },
    "coda": "Un'illusione si tocca e sparisce; questa è una cosa falsa che il mondo tratta come vera.",
    "limit": "è falso e resta falso, e chi lo abita lo sa; regge finché lo tieni.",
    "thresholds": [
      {
        "base": 5,
        "scopes": {
          "duration": 2,
          "impact": 2,
          "precision": 1
        }
      }
    ],
    "thresholdText": "5 (Durata 2, Impatto 2, Precisione 1)",
    "use": "In genere è pensato per un falso preciso che regge la scena; un'identità che dura una sessione sale con la Durata.",
    "powers": [
      "copertura"
    ],
    "newPowers": [
      "copertura"
    ],
    "byBlue": false
  },
  {
    "id": "spegnere",
    "name": "Spegnere",
    "access": [
      "forces",
      "mind",
      "life"
    ],
    "amalgams": [
      "matter"
    ],
    "amalgamsNote": "",
    "intro": "Spegni senza rompere.",
    "bySphere": {
      "forces": "la fiamma, il suono, la corrente, il calore, la luce, il motore.",
      "mind": "un'emozione, la rabbia, la paura, l'entusiasmo.",
      "life": "il dolore, la febbre, l'adrenalina."
    },
    "coda": "Quello che spegni c'è ancora e domani si riaccende: il ferito cammina, ma la ferita resta; la stanza è buia, ma l'impianto funziona.",
    "limit": "non distrugge, che è Creare e Distruggere; non rallenta, che è Accelerare e Rallentare.",
    "thresholds": [
      {
        "base": 3,
        "scopes": {
          "duration": 2,
          "impact": 1
        }
      }
    ],
    "thresholdText": "3 (Durata 2, Impatto 1)",
    "use": "In genere è pensato per spegnere una cosa sola per la scena.",
    "powers": [
      "interruttore"
    ],
    "newPowers": [
      "interruttore"
    ],
    "byBlue": false
  },
  {
    "id": "spostare",
    "name": "Spostare",
    "access": [
      "correspondence",
      "forces",
      "prime"
    ],
    "amalgams": [
      "entropy",
      "matter",
      "life"
    ],
    "amalgamsNote": "",
    "intro": "Muovi da qui a là: sollevi, scagli, richiami, voli.",
    "bySphere": {
      "forces": "devii un proiettile, scagli un oggetto, sposti il calore, ti alzi in volo o cammini sulla parete.",
      "correspondence": "richiami un oggetto lontano, scambi due cose di posto, estrai una pallottola, disperdi le prove.",
      "prime": "sposti la Quintessenza da un Nodo alla tua Ruota o a quella di un altro mago."
    },
    "coda": "Quanto pesa quello che muovi lo dice la Potenza (Peso), quanto lontano la Portata.",
    "limit": "muove nello spazio ordinario; da sola la Corrispondenza strappa, con la Sfera della cosa accanto arriva pulito.",
    "thresholds": [
      {
        "base": 4,
        "scopes": {
          "potency": 2,
          "range": 2
        }
      }
    ],
    "thresholdText": "4 (Potenza 2, Portata 2)",
    "use": "In genere sposta una persona o 100 kg entro la stanza; un'auto sale con la Potenza.",
    "powers": [
      "torna-sempre",
      "rifornimento",
      "schieramento",
      "pedina",
      "niente-di-perso",
      "travaso",
      "cambiavalute",
      "recupero",
      "pagare-in-paradosso",
      "il-dolore-sveglia"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "suggestionare",
    "name": "Suggestionare",
    "access": [
      "entropy",
      "mind"
    ],
    "amalgams": [
      "spirit",
      "life"
    ],
    "amalgamsNote": "",
    "intro": "Inclini l'umore e la scelta di qualcuno senza che se ne accorga.",
    "bySphere": {
      "mind": "accendi o spegni un'emozione, semini un'idea in una persona, una fata, un gruppo.",
      "entropy+mind": "l'idea gli torna in mente al momento giusto, per coincidenza."
    },
    "coda": "Lui sceglie da solo, e quello che gli hai messo in testa è una fra le tante.",
    "limit": "inclina e non decide; la scelta imposta è Condizionare, l'ordine è Dominare.",
    "thresholds": [
      {
        "base": 3,
        "scopes": {
          "impact": 2,
          "duration": 1
        }
      }
    ],
    "thresholdText": "3 (Impatto 2, Durata 1)",
    "use": "In genere è pensato per spostare una scelta nella scena: la guardia che decide di non controllare, il testimone che preferisce tacere.",
    "powers": [
      "parole-che-pesano"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "trasformare",
    "name": "Trasformare",
    "access": [
      "correspondence",
      "forces",
      "matter",
      "life"
    ],
    "amalgams": [
      "mind",
      "spirit"
    ],
    "amalgamsNote": "",
    "intro": "Cambi la forma e lasci la sostanza.",
    "bySphere": {
      "matter": "un oggetto, una strada, una parete, un veicolo.",
      "life": "il tuo corpo, il corpo di un altro, un animale, un'altra forma o un'altra specie.",
      "forces": "la sagoma dell'energia, il fulmine a sfera, la fiamma modellata.",
      "correspondence": "allarghi o restringi uno spazio."
    },
    "coda": "Acciaio prima e acciaio dopo, carne prima e carne dopo: è la forma che cambia.",
    "limit": "la forma intera, non la sostanza, che è Trasmutare; resta trasformato finché qualcuno lo disfa.",
    "thresholds": [
      {
        "base": 5,
        "scopes": {
          "potency": 2,
          "duration": 2,
          "impact": 1
        }
      }
    ],
    "thresholdText": "5 (Potenza 2, Durata 2, Impatto 1)",
    "use": "In genere trasforma una cosa fino a 100 kg per la scena; per sempre chiede Fissare.",
    "powers": [
      "planimetria"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "trasmutare",
    "name": "Trasmutare",
    "access": [
      "forces",
      "matter",
      "mind",
      "spirit",
      "life"
    ],
    "amalgams": [
      "prime"
    ],
    "amalgamsNote": "",
    "intro": "Cambi la sostanza: cosa è, non che forma ha.",
    "bySphere": {
      "matter": "un metallo, l'aria, un oggetto.",
      "forces": "un'energia in un'altra, luce in calore, suono in urto.",
      "life": "la carne che diventa altro; con Materia e Primordio accanto il metallo nel corpo, accettato come suo.",
      "mind": "una personalità, in cima alla Sfera.",
      "spirit": "un Dormiente che si Risveglia, in cima alla Sfera."
    },
    "coda": "La cosa resta con la sua forma, ma è fatta di un'altra cosa.",
    "limit": "cambia la natura e non le leggi, che restano quelle del mondo; il piombo in oro costa successi per i preziosi.",
    "thresholds": [
      {
        "base": 5,
        "scopes": {
          "potency": 2,
          "impact": 3
        }
      }
    ],
    "thresholdText": "5 (Potenza 2, Impatto 3)",
    "use": "In genere cambia la sostanza di una cosa fino a 100 kg, per sempre.",
    "powers": [
      "baratto"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "trovare",
    "name": "Trovare",
    "access": [
      "correspondence",
      "forces",
      "matter",
      "mind",
      "prime",
      "spirit",
      "time",
      "life"
    ],
    "amalgams": [],
    "amalgamsNote": "",
    "intro": "Sai dove sta quello che cerchi, e dove va. Prima una direzione, poi la distanza, poi il punto esatto: la stanza, il cassetto, la persona in mezzo alla folla.",
    "bySphere": {
      "correspondence": "qualunque cosa, anche a lunga distanza, e con un'altra Sfera accanto scegli cosa.",
      "mind": "una persona, una fata, o chi sta pensando a te.",
      "life": "una persona, una pianta, un animale, il ferito per il sangue.",
      "matter": "un oggetto, un Cyborg, un metallo, una lega.",
      "forces": "una fonte di energia, un motore acceso, chi sta trasmettendo.",
      "prime": "un effetto di Magick, una reliquia, un Risvegliato, un Nodo.",
      "spirit": "uno spirito, un licantropo, un morto rimasto.",
      "time": "le anomalie, dove il tempo è stato rifatto."
    },
    "coda": "Se il bersaglio si muove sai dove era: per seguirlo serve la Durata.",
    "limit": "devi sapere cosa cerchi, una cosa precisa, una categoria, una persona, altrimenti la Formula non parte; trovi, non vedi.",
    "thresholds": [
      {
        "base": 4,
        "scopes": {
          "impact": 2,
          "range": 2
        }
      }
    ],
    "thresholdText": "4 (Impatto 2, Portata 2)",
    "use": "In genere è pensato per trovare una cosa precisa nei dintorni, fuori dallo scontro; un'altra città sale con la Portata.",
    "powers": [
      "il-pezzo-mancante",
      "il-mondo-e-piccolo",
      "bussola"
    ],
    "newPowers": [
      "bussola"
    ],
    "byBlue": false
  },
  {
    "id": "varcare",
    "name": "Varcare",
    "access": [
      "correspondence",
      "mind",
      "spirit",
      "time"
    ],
    "amalgams": [
      "matter",
      "prime",
      "life"
    ],
    "amalgamsNote": "",
    "intro": "Passi un confine che il mondo non concede: la distanza, il Velo, un istante.",
    "bySphere": {
      "correspondence": "ti teletrasporti, o allunghi la mano oltre il varco e agisci su ciò che non vedi.",
      "spirit": "attraversi il Velo in carne e ossa.",
      "time": "salti un turno oltre il presente, e in cima alla Sfera viaggi davvero.",
      "mind+prime+spirit": "esci in forma di luce."
    },
    "coda": "Passi tu, con quello che porti.",
    "limit": "passi tu e non gli altri; il Velo fa pagare l'attrito del luogo; da sola la Corrispondenza strappa.",
    "thresholds": [
      {
        "base": 4,
        "scopes": {
          "range": 2,
          "impact": 2
        }
      }
    ],
    "thresholdText": "4 (Portata 2, Impatto 2)",
    "use": "In genere è pensato per passare nella stanza accanto senza aprire la porta, o dall'altra parte del Velo; una città lontana sale con la Portata.",
    "powers": [
      "da-qualche-parte",
      "strada-facendo",
      "giochiamo-in-casa",
      "ero-gia-li"
    ],
    "newPowers": [],
    "byBlue": false
  },
  {
    "id": "vincolare",
    "name": "Vincolare",
    "access": [
      "correspondence",
      "entropy",
      "mind",
      "prime",
      "spirit"
    ],
    "amalgams": [
      "life"
    ],
    "amalgamsNote": "",
    "intro": "Un legame che resta e regge da solo.",
    "bySphere": {
      "correspondence": "il marchio su una persona o un oggetto, che corre in due sensi.",
      "mind": "la Cabala, due menti legate.",
      "prime": "un oggetto consacrato, uno spirito consenziente dentro un Feticcio.",
      "spirit": "uno spirito nell'oggetto, l'Avatar di un Risvegliato.",
      "entropy": "un giuramento, in cima alla Sfera."
    },
    "coda": "Il legame lavora anche quando non ci sei.",
    "limit": "è un legame e non un ordine; il giuramento che punisce chiede la cima di Entropia.",
    "thresholds": [
      {
        "base": 5,
        "scopes": {
          "duration": 3,
          "impact": 2
        }
      }
    ],
    "thresholdText": "5 (Durata 3, Impatto 2)",
    "use": "In genere è pensato per un marchio o un legame che regge due scene; per sempre chiede Fissare.",
    "powers": [
      "inseparabili",
      "pane-e-sale",
      "volonta-prestata",
      "strumento-di-fortuna",
      "tabu",
      "favori",
      "stesso-sangue",
      "folla",
      "legame"
    ],
    "newPowers": [],
    "byBlue": false
  }
]);

/** Le Formule di ieri (ramo B) che oggi hanno un altro id: le righe degli effetti le cercano qui. */
export const FORMULE_ALIAS = Object.freeze({
  "accelerare": "accelerare-e-rallentare",
  "rallentare": "accelerare-e-rallentare",
  "benedire": "benedire-e-maledire",
  "maledire": "benedire-e-maledire",
  "aprire": "aprire-e-bloccare",
  "bloccare": "aprire-e-bloccare",
  "creare": "creare-e-distruggere",
  "distruggere": "creare-e-distruggere",
  "invulnerabilita": "invulnerabilita"
});
