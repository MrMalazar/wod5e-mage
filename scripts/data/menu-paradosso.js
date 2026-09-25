// Generato da tools/build-menu-paradosso.py dal sorgente del menù (tools/dati/menu_paradosso.md, il testo del PDF del 24/9/2026): non toccare a mano.
// Le 65 voci del menù del Paradosso: famiglia, scena, modo (annunciato, immediato, nascosto, scoppio), prezzo (col suo breve), la riga breve, la scheda (quando, segno, effetto, mosse, poi, esempio),
// la faccia delle comuni in ogni scena e la durata addosso al mago (lancio, turno, scena, sessione; vuota se la voce non sta addosso a nessuno).
// I Tocchi si chiamano Conseguenze Magick (Blue, 24/9 sera): la rinomina è fatta qui, il PDF segue.

export const FAMIGLIE_PARADOSSO = Object.freeze(["tocchi", "comuni", "scena", "scettro", "presenze", "orologi", "ancore", "grandi"]);

export const SCENE_PARADOSSO = Object.freeze([
  {
    "id": "indagine",
    "nome": "Indagine",
    "sotto": "I maghi cercano qualcosa: una persona, un oggetto, la verità su un fatto.",
    "testo": "In un'indagine ti serve che la verità arrivi a pezzi e nell'ordine giusto, che chi è indagato resti pericoloso e che ogni pista costi qualcosa. La Magick rende tutto questo fragile: Tempo legge il passato di un luogo, Corrispondenza trova chiunque, Mente legge i pensieri, Spirito interroga chi c'era, e un solo Volgare può chiudere la scena. Il Paradosso risponde sporcando la verità: manca un pezzo, il bersaglio sente lo sguardo, la prova si cancella, chi ha visto fa le domande giuste.",
    "facce": {
      "tocchi": "Rigidità sul secondo lancio per sapere",
      "presenze": "l'Esattore, se hanno interrogato un morto",
      "orologi": "Scadenza sulla visione: quello che vedono dura tre segmenti",
      "ancore": "Il bersaglio sbagliato: il ricordo che cercavano è sparito a un'Ancora"
    }
  },
  {
    "id": "trattativa",
    "nome": "Trattativa",
    "sotto": "Si parla per ottenere qualcosa: un accordo, un permesso, un'informazione, un'alleanza.",
    "testo": "In una trattativa ti serve gente con una posizione e qualcosa da perdere, una posta chiara, un tempo che finisce, e che convincere con la Magick non basti mai da solo. La Magick qui è veloce: Mente convince e legge, Entropia piega la fortuna, Corrispondenza ascolta da lontano, Tempo conosce la risposta prima della domanda. Il Paradosso risponde sulla parola data: chi ha detto sì con la Magick addosso ci ripensa, il patto tiene più di quanto vorrebbero, il terzo ha la fortuna dalla sua, l'ora non si sposta.",
    "facce": {
      "tocchi": "Rigidità a chi ha convinto con la Mente",
      "presenze": "un'Ombra, se il Volgare era sulla persona",
      "orologi": "Ora o mai è già un orologio; Scadenza sulla Mente che convince",
      "ancore": "La chiamata nel mezzo della trattativa"
    }
  },
  {
    "id": "infiltrazione",
    "nome": "Infiltrazione",
    "sotto": "Entrare dove non si dovrebbe: un ufficio, una villa, un laboratorio, una centrale.",
    "testo": "In un'infiltrazione ti serve che la sicurezza conti, che il tempo stringa e che ogni Volgare lanciato in un posto chiuso lasci una traccia. La Magick attraversa tutto: Corrispondenza salta i muri, Mente nasconde, Materia apre, Forza spegne le luci, Tempo ferma i sensori. Il Paradosso risponde con l'edificio stesso: i sistemi registrano, la guardia non si inganna, il varco si richiude, e l'effetto lasciato dietro si comporta male.",
    "facce": {
      "tocchi": "Condizione (Abbagliato) dopo il buio, Tremore dopo la porta forzata",
      "presenze": "un'Ombra che li segue di stanza in stanza",
      "orologi": "Scadenza sulla Mente che nasconde: tre segmenti",
      "ancore": "La chiamata, quando sono dentro e non possono rispondere"
    }
  },
  {
    "id": "combattimento",
    "nome": "Combattimento",
    "sotto": "Si combatte, con le armi, con la Magick o con tutte e due.",
    "testo": "In uno scontro ti serve che le cose si muovano: che cambino le forze e la posta, e che lo scontro finisca quando ha detto quello che doveva dire. È la scena dove i maghi lanciano di più, quindi quella dove entrano più punti. Forza colpisce, Vita cura, Corrispondenza sposta, Tempo dà turni in più, Mente ferma il nemico. Il Paradosso risponde sul corpo del mago e sulla sua Magick: le mani tremano, il colpo torna indietro, il muro cade, il rinforzo esce dal fuoco che hanno acceso, e quando il cattivo scappa, scappa in un modo che la Magick non rimedia.",
    "facce": {
      "tocchi": "Tremore dopo Forza, Scottatura dopo il fuoco, Condizione dopo il lampo",
      "presenze": "Rinforzo, oppure un'Ombra al terzo Volgare",
      "orologi": "Carica a quattro segmenti: pieno, scatta lo Specchio",
      "ancore": "In scena: il passante è l'Ancora di uno di loro"
    }
  },
  {
    "id": "inseguimento",
    "nome": "Inseguimento",
    "sotto": "Qualcuno scappa e qualcuno insegue, a piedi o su ruote.",
    "testo": "In un inseguimento ti serve che la corsa resti una corsa, con ostacoli, svolte e una fine. La Magick la chiude in un tiro: Corrispondenza arriva prima, Forza va più veloce, Tempo rallenta tutti, Entropia fa cadere chi scappa. Il Paradosso risponde sulla velocità presa in prestito: la pista si perde, il mago prende la persona sbagliata, l'ostacolo non si scavalca, la corsa finisce dove c'è gente.",
    "facce": {
      "tocchi": "Tremore a chi corre con la Magick, Fiacco al terzo Volgare",
      "presenze": "un'Ombra che corre accanto al mago, alla sua stessa velocità",
      "orologi": "Scadenza sulla velocità: tre segmenti e finisce",
      "ancore": "L'incrocio: chi scappa entra nel bar dove lavora l'Ancora di uno"
    }
  },
  {
    "id": "rituale",
    "nome": "Rituale",
    "sotto": "Un incantesimo grande: i Passi di Rituale, la Quintessenza, il gruppo che lancia insieme.",
    "testo": "In un rituale ti serve che il grande incantesimo sia una scena e non un tiro: tempo che passa, disturbi, un prezzo, qualcosa che guarda. La Magick qui è lenta ma potente, perché i Passi di Rituale danno dadi dopo la sottrazione della soglia, e con tempo e Quintessenza i maghi arrivano a effetti che in un turno non potrebbero tentare. Il Paradosso risponde dentro il rito: un Passo salta, il rito chiede una cosa in più, arriva un ospite, e quello che resta acceso si muove da solo.",
    "facce": {
      "tocchi": "Fiacco a chi ha guidato il rito",
      "presenze": "Ospite, o l'Esattore se hanno riportato qualcuno",
      "orologi": "Scadenza sui Passi: l'alba, la ronda, chi sta arrivando",
      "ancore": "Il bersaglio sbagliato: il rito ha lavorato sull'Ancora"
    }
  },
  {
    "id": "altrove",
    "nome": "Altrove",
    "sotto": "La scena non sta nel mondo di tutti i giorni: l'Umbra, un luogo infestato, un Nodo, un regno del Paradosso.",
    "testo": "Fuori dal mondo di tutti i giorni ti serve che il posto abbia regole sue, che si paghi per passare e che qualcosa vada storto senza spiegazione. Le regole del posto sono tue: se è Dissonante o Assonante lo dichiari gratis, e vale per tutta la scena. La Magick dei maghi ci arriva lo stesso: Spirito parla con chi ci abita, Corrispondenza trova l'uscita, Tempo dice quanto manca all'alba. Il Paradosso risponde come il padrone di casa: il posto si fa pagare, chiama uno dei maghi con una voce nota, morde i sensi, rimanda indietro la Magick, e manda chi ci abita a vedere.",
    "facce": {
      "tocchi": "Rigidità a ogni Volgare, se il posto è Dissonante",
      "presenze": "l'Ospite con la faccia del posto, l'Esattore se hanno preso qualcosa",
      "orologi": "Ciclo se il posto è Dissonante, Scadenza sull'uscita che si chiude all'alba",
      "ancore": "La voce è già un'Ancora imitata; Il bersaglio sbagliato attraverso il posto"
    }
  },
  {
    "id": "santuario",
    "nome": "Santuario",
    "sotto": "La casa dei maghi: il Santuario, il Nodo, il Culto, le persone che contano per loro.",
    "testo": "A casa ti serve che il rifugio non diventi una fortezza. La vita degli altri deve entrare, le conseguenze devono bussare, e le protezioni hanno bisogno di cura. Qui i maghi hanno tempo, Strumenti e Quintessenza, quindi quasi ogni problema si prepara e si risolve da casa. Il Paradosso risponde dalla porta e dalle protezioni: una protezione cede, qualcuno la passa come se non ci fosse, un'Ancora chiama, e quello che hanno lasciato acceso in casa si muove da solo.",
    "facce": {
      "tocchi": "Tremore a chi ha lanciato in casa",
      "presenze": "l'Esattore viene a casa, se sa dove abitano",
      "orologi": "Ancora: l'orologio di chi ha chiamato",
      "ancore": "La chiamata, L'incrocio, Il ritmo: la casa è dove le Ancore arrivano"
    }
  },
  {
    "id": "citta",
    "nome": "Città",
    "sotto": "La città stessa: strade, mezzi, locali, folla, gli spostamenti fra una scena e l'altra.",
    "testo": "In città ti serve che il Consenso abbia carne e ossa: occhi che guardano, regole che valgono, intoppi che fanno perdere tempo. La Magick attraversa la città come niente: Corrispondenza la passa in un passo, Mente scioglie ogni controllo, Entropia trova sempre un taxi. Il Paradosso risponde come una città vera, e potenziata: la scorciatoia arriva nel posto sbagliato, il controllo vede attraverso la Magick, la folla si chiude, la porta chiusa resta chiusa.",
    "facce": {
      "tocchi": "Rigidità a chi ha lanciato davanti alla gente",
      "presenze": "un'Ombra nella folla",
      "orologi": "Scadenza sulla Mente che nasconde",
      "ancore": "In scena: la cassiera è la sorella; La chiamata sul tram"
    }
  }
]);

export const MENU_PARADOSSO = Object.freeze([
  {
    "id": "tremore",
    "nome": "Tremore",
    "famiglia": "tocchi",
    "scena": "",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "1 punto",
      "breve": "1 pt",
      "tipo": "fisso",
      "valore": 1
    },
    "quando": "subito dopo un Volgare.",
    "segno": "",
    "effetto": "−2 dadi al prossimo lancio di Magick di quel mago.",
    "mosse": [
      "lanciare lo stesso",
      "passare all'Accidentale",
      "lasciare il turno a un altro"
    ],
    "poi": "finisce col lancio dopo. Se quel lancio è Volgare, ti paga il prossimo rimbalzo.",
    "esempio": "«Le dita non chiudono il segno: meno due al prossimo.»",
    "durata": "lancio",
    "ordine": 1,
    "breve": "−2 dadi al prossimo lancio",
    "facce": {}
  },
  {
    "id": "rigidita",
    "nome": "Rigidità",
    "famiglia": "tocchi",
    "scena": "",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "1 punto",
      "breve": "1 pt",
      "tipo": "fisso",
      "valore": 1
    },
    "quando": "subito dopo un Volgare.",
    "segno": "",
    "effetto": "il prossimo Volgare di quel mago riesce con l'8, anche senza testimoni.",
    "mosse": [
      "aspettare un turno",
      "lanciare Accidentale",
      "farlo lanciare a un altro"
    ],
    "poi": "finisce col lancio dopo.",
    "esempio": "«L'aria intorno a te si fa densa, come acqua.»",
    "durata": "lancio",
    "ordine": 2,
    "breve": "prossimo Volgare: riesce solo con l'8",
    "facce": {}
  },
  {
    "id": "fragile",
    "nome": "Fragile",
    "famiglia": "tocchi",
    "scena": "",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "1 punto",
      "breve": "1 pt",
      "tipo": "fisso",
      "valore": 1
    },
    "quando": "subito dopo un Volgare, con la Ruota già alta.",
    "segno": "",
    "effetto": "al prossimo Volgare di quel mago i dadi rossi scoppiano anche col 2.",
    "mosse": [
      "rimandare il Volgare",
      "lanciare Accidentale",
      "farlo lanciare a chi ha la Ruota bassa"
    ],
    "poi": "finisce col lancio dopo.",
    "esempio": "«Un ronzio nei denti, e la sensazione che qualcosa stia per rompersi.»",
    "durata": "lancio",
    "ordine": 3,
    "breve": "prossimo Volgare: i rossi scoppiano col 2",
    "facce": {}
  },
  {
    "id": "fiacco",
    "nome": "Fiacco",
    "famiglia": "tocchi",
    "scena": "",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "un mago ha lanciato tre Volgari nella stessa scena.",
    "segno": "",
    "effetto": "fino a fine scena quel mago tira al massimo 6 dadi, su qualunque tiro.",
    "mosse": [
      "cambiare modo",
      "lasciare fare agli altri",
      "chiudere la scena"
    ],
    "poi": "finisce con la scena.",
    "esempio": "«Il fiato è corto, le gambe pesanti: da qui in poi sei a sei dadi.»",
    "durata": "scena",
    "ordine": 4,
    "breve": "max 6 dadi per la scena",
    "facce": {}
  },
  {
    "id": "scottatura",
    "nome": "Scottatura",
    "famiglia": "tocchi",
    "scena": "",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "1 punto",
      "breve": "1 pt",
      "tipo": "fisso",
      "valore": 1
    },
    "quando": "un Volgare ha spostato energia: fuoco, corrente, calore, gelo.",
    "segno": "",
    "effetto": "1 danno superficiale al mago, e il segno resta sulla pelle fino a fine sessione.",
    "mosse": [
      "curarsi con un altro Volgare (che paga)",
      "coprirlo",
      "ignorarlo"
    ],
    "poi": "il segno si vede. Se un Dormiente lo nota, ha visto, e conta come Testimone già pagato.",
    "esempio": "«La pelle del braccio è rossa dove è passato il fulmine: un livello superficiale.»",
    "durata": "sessione",
    "ordine": 5,
    "breve": "1 danno superficiale",
    "facce": {}
  },
  {
    "id": "condizione",
    "nome": "Condizione",
    "famiglia": "tocchi",
    "scena": "",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "1 punto",
      "breve": "1 pt",
      "tipo": "fisso",
      "valore": 1
    },
    "quando": "un Volgare ha fatto luce o rumore.",
    "segno": "",
    "effetto": "il mago prende Abbagliato oppure Ovattato per un turno, secondo il Volgare.",
    "mosse": [
      "coprirsi",
      "aspettare",
      "agire alla cieca"
    ],
    "poi": "finisce col turno. Un secondo Volgare uguale nello stesso posto porta la Condizione al secondo gradino (Offuscato, Assordato), sempre per un turno, senza pagarlo.",
    "esempio": "«Il lampo ti resta negli occhi: Abbagliato fino al tuo prossimo turno.»",
    "durata": "turno",
    "ordine": 6,
    "breve": "Abbagliato o Ovattato, 1 turno",
    "facce": {}
  },
  {
    "id": "ritorno",
    "nome": "Ritorno",
    "famiglia": "comuni",
    "scena": "",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "la soglia dell'effetto",
      "breve": "la soglia",
      "tipo": "soglia",
      "valore": 0
    },
    "quando": "la Magick ha sciolto un ostacolo che avevi preparato, o ha deciso una scena.",
    "segno": "l'effetto sfarfalla a fine turno, e il tavolo lo vede.",
    "effetto": "al turno dopo l'effetto finisce per coincidenza, e l'ostacolo torna com'era: la porta è chiusa, il nemico è libero, il muro non c'è più. Paghi la soglia di quell'effetto.",
    "mosse": [
      "rilanciare prima che cada",
      "spegnerlo da soli",
      "aggirare l'ostacolo senza Magick"
    ],
    "poi": "se lo spengono da soli, l'ostacolo torna lo stesso e la spesa ha fatto il suo. Se lo rilanciano, vale la regola del rilancio.",
    "esempio": "la serratura aperta con Materia suda ruggine a fine turno; al turno dopo è chiusa, e c'è anche il catenaccio.",
    "durata": "turno",
    "ordine": 7,
    "breve": "l'effetto svanisce, l'ostacolo torna",
    "facce": {
      "indagine": {
        "testo": "la pista trovata con Tempo si richiude: il luogo non ricorda più",
        "prezzo": "la soglia"
      },
      "trattativa": {
        "testo": "l'accordo strappato con la Magick si scioglie subito, invece che a fine scena",
        "prezzo": "la soglia"
      },
      "infiltrazione": {
        "testo": "Uscita è il Ritorno di questa scena",
        "prezzo": "la soglia"
      },
      "combattimento": {
        "testo": "il muro, lo scudo o il nemico fermato che ha deciso lo scontro sfarfalla, e al turno dopo non c'è più",
        "prezzo": "la soglia"
      },
      "inseguimento": {
        "testo": "la velocità presa in prestito finisce di colpo: il mago torna al suo passo",
        "prezzo": "la soglia"
      },
      "rituale": {
        "testo": "l'effetto grande cade alla scena dopo: la soglia è alta, e vale la spesa solo se ha deciso la sessione",
        "prezzo": "la soglia"
      },
      "altrove": {
        "testo": "l'uscita trovata con Corrispondenza si richiude",
        "prezzo": "la soglia"
      },
      "santuario": {
        "testo": "Falla è il Ritorno di questa scena",
        "prezzo": "la soglia"
      },
      "citta": {
        "testo": "la scorciatoia si richiude: Intoppo è la sua versione piccola",
        "prezzo": "la soglia"
      }
    }
  },
  {
    "id": "residuo",
    "nome": "Residuo",
    "famiglia": "comuni",
    "scena": "",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "un effetto Volgare è ancora in scena.",
    "segno": "",
    "effetto": "l'effetto non si chiude pulito e fino a fine scena fa di testa sua, dentro quello che sa fare: si allarga, si sposta, si accende da solo.",
    "mosse": [
      "spegnerlo",
      "usarlo",
      "allontanarsi"
    ],
    "poi": "se resta acceso a fine scena, la prossima volta che entrano lì il posto ha Il luogo già attivo, e non lo paghi.",
    "esempio": "il muro di ghiaccio che bloccava il corridoio si allarga, e chiude anche l'uscita alle spalle dei maghi.",
    "durata": "scena",
    "ordine": 8,
    "breve": "l'effetto continua da solo, per la scena",
    "facce": {
      "indagine": {
        "testo": "la visione continua a mostrare pezzi, anche quando il mago non vuole",
        "prezzo": "2"
      },
      "trattativa": {
        "testo": "la Mente che ha convinto continua a convincere: l'altra parte dice sì a tutto, e non vale niente",
        "prezzo": "2"
      },
      "infiltrazione": {
        "testo": "Sistema è il Residuo di questa scena; oppure il buio evocato si sposta di stanza in stanza",
        "prezzo": "2"
      },
      "combattimento": {
        "testo": "il fuoco si allarga, la porta gelata esplode, la spinta continua a spingere",
        "prezzo": "2"
      },
      "inseguimento": {
        "testo": "l'Entropia che ha fatto cadere chi scappa continua a far cadere: motorini, passanti, il mago",
        "prezzo": "2"
      },
      "rituale": {
        "testo": "Sbavatura è il Residuo di questa scena",
        "prezzo": "2"
      },
      "altrove": {
        "testo": "l'effetto lasciato acceso prende la forma del posto",
        "prezzo": "2"
      },
      "santuario": {
        "testo": "un effetto lasciato acceso in casa: la luce che non si spegne, la porta che si apre da sola",
        "prezzo": "2"
      },
      "citta": {
        "testo": "il taxi trovato con Entropia continua a trovarne: la fortuna storta sui mezzi",
        "prezzo": "2"
      }
    }
  },
  {
    "id": "specchio",
    "nome": "Specchio",
    "famiglia": "comuni",
    "scena": "",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "la soglia",
      "breve": "la soglia",
      "tipo": "soglia",
      "valore": 0
    },
    "quando": "ti serve una minaccia di Magick e non l'hai preparata.",
    "segno": "l'effetto del mago si piega verso di lui, e per un turno fa tutte e due le cose: la sua e la tua.",
    "effetto": "al turno dopo un incantesimo del Grimorio dei maghi torna contro di loro, storpiato. Non tiri: pagata la soglia, l'effetto succede. Il mago preso di mira tira per evitarlo o resistere, e la soglia gli toglie dadi.",
    "mosse": [
      "resistere",
      "ripararsi",
      "spegnere l'incantesimo originale"
    ],
    "poi": "lo Specchio muore con l'originale: se il mago spegne il suo effetto, il riflesso sparisce. Finché l'originale dura, dura anche lui.",
    "esempio": "lo scudo che la maga aveva alzato contro i proiettili si chiude intorno a lei, e non la lascia più uscire.",
    "durata": "scena",
    "ordine": 9,
    "breve": "un loro incantesimo si ritorce contro",
    "facce": {
      "indagine": {
        "testo": "la Mente che ha letto un pensiero ne riceve uno indietro",
        "prezzo": "la soglia"
      },
      "trattativa": {
        "testo": "la Mente che convince torna indietro come un dubbio",
        "prezzo": "la soglia"
      },
      "infiltrazione": {
        "testo": "il buio di Forza inghiotte anche i maghi",
        "prezzo": "la soglia"
      },
      "combattimento": {
        "testo": "il colpo si piega e torna indietro",
        "prezzo": "la soglia"
      },
      "inseguimento": {
        "testo": "il rallentamento di Tempo torna sul mago",
        "prezzo": "la soglia"
      },
      "rituale": {
        "testo": "il rito dei maghi rimandato indietro dallo stesso cerchio",
        "prezzo": "la soglia"
      },
      "altrove": {
        "testo": "il posto restituisce la Magick storpiata",
        "prezzo": "la soglia"
      },
      "santuario": {
        "testo": "la protezione si chiude anche contro chi l'ha messa",
        "prezzo": "la soglia"
      },
      "citta": {
        "testo": "la Mente che ha fatto passare un controllo torna come un vuoto di memoria",
        "prezzo": "la soglia"
      }
    }
  },
  {
    "id": "testimone",
    "nome": "Testimone",
    "famiglia": "comuni",
    "scena": "",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "un mago lancia Volgare in un posto dove c'è gente.",
    "segno": "qualcuno guarda nella direzione sbagliata: una finestra che si accende, una testa che si gira.",
    "effetto": "al turno dopo ha visto. Finché resta in scena, i Volgari successivi contano con testimoni: riescono con l'8 e costano due punti Paradosso invece di uno.",
    "mosse": [
      "convincerlo",
      "nascondersi",
      "passare all'Accidentale"
    ],
    "poi": "se fanno Magick su di lui per farlo dimenticare, è Volgare con testimoni e paga. Se lo lasciano andare, quello che ha visto è tuo: ne fai quello che vuoi nelle scene dopo, senza pagare.",
    "esempio": "al primo piano si accende una finestra, e una signora esce sul balcone col telefono in mano.",
    "durata": "scena",
    "ordine": 10,
    "breve": "i prossimi Volgari sono con testimoni",
    "facce": {
      "indagine": {
        "testo": "in un archivio, in una casa o in un obitorio c'è sempre qualcuno che lavora",
        "prezzo": "2"
      },
      "trattativa": {
        "testo": "un Volgare a tavola cambia la trattativa più di qualunque argomento",
        "prezzo": "2"
      },
      "infiltrazione": {
        "testo": "Telecamera, oppure la donna delle pulizie con le cuffie",
        "prezzo": "2"
      },
      "combattimento": {
        "testo": "il telefono dall'altra parte della strada",
        "prezzo": "2"
      },
      "inseguimento": {
        "testo": "una corsa Volgare in mezzo alla città è la scena più vista di tutte",
        "prezzo": "2"
      },
      "rituale": {
        "testo": "chi non è nel cerchio guarda: il proprietario della casa, il vicino",
        "prezzo": "2"
      },
      "altrove": {
        "testo": "chi ci abita guarda, e conta come testimone",
        "prezzo": "2"
      },
      "santuario": {
        "testo": "chi entra: Visita",
        "prezzo": "2"
      },
      "citta": {
        "testo": "in città non manca mai: un rider, una cassiera, una telecamera",
        "prezzo": "2"
      }
    }
  },
  {
    "id": "in-mezzo",
    "nome": "In mezzo",
    "famiglia": "comuni",
    "scena": "",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "uno scontro o un Volgare succede vicino a gente comune.",
    "segno": "",
    "effetto": "l'effetto trascina dentro un Dormiente che era già lì. Salvarlo costa un'azione. Lasciarlo morire, o colpirlo con la Magick, finisce sulla tavola della Saggezza.",
    "mosse": [
      "salvarlo",
      "portarlo via",
      "lasciarlo"
    ],
    "poi": "chi lo salva lo ha davanti, e lui ha visto: è un Testimone, e non lo paghi. Chi lo lascia risponde alla Saggezza.",
    "esempio": "il fulmine stacca la pensilina della fermata, e sotto c'è un rider fermo col motorino.",
    "durata": "turno",
    "ordine": 11,
    "breve": "un Dormiente finisce nell'effetto",
    "facce": {
      "indagine": {
        "testo": "l'archivista, la vicina, il custode del cimitero",
        "prezzo": "2"
      },
      "trattativa": {
        "testo": "il cameriere, la segretaria, l'autista che aspetta fuori",
        "prezzo": "2"
      },
      "infiltrazione": {
        "testo": "la donna delle pulizie nella stanza accanto, il tecnico di notte",
        "prezzo": "2"
      },
      "combattimento": {
        "testo": "il passante, l'ostaggio: colpire il rapinatore senza colpire la cassiera costa un Volgare",
        "prezzo": "2"
      },
      "inseguimento": {
        "testo": "un passante sulle strisce, un bambino, un ciclista",
        "prezzo": "2"
      },
      "rituale": {
        "testo": "chi tiene la candela e non è un mago",
        "prezzo": "2"
      },
      "altrove": {
        "testo": "chi ci abita e non ha colpe: un'anima, un animale, un bambino del posto",
        "prezzo": "2"
      },
      "santuario": {
        "testo": "chi vive lì e non è un mago: il coinquilino, il custode, il gatto",
        "prezzo": "2"
      },
      "citta": {
        "testo": "un passante, un rider, una cassiera",
        "prezzo": "2"
      }
    }
  },
  {
    "id": "il-luogo",
    "nome": "Il luogo",
    "famiglia": "comuni",
    "scena": "",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "un Volgare ha toccato lo spazio: il pavimento, le luci, l'aria.",
    "segno": "il posto reagisce: un crepitio, una crepa, le luci che vanno a intermittenza.",
    "effetto": "dal turno dopo, e fino a fine scena, il luogo cambia in uno di due modi. Una zona diventa pericolosa, e chi ci resta a fine turno prende 1 danno superficiale. Oppure tutti, maghi e PNG, prendono una Condizione di Vista o di Udito, fino al secondo gradino.",
    "mosse": [
      "spostarsi",
      "usarlo",
      "uscire"
    ],
    "poi": "un Volgare lanciato dentro la zona prende una Conseguenza a tua scelta, senza pagarlo.",
    "esempio": "l'impianto del capannone va in corto, e l'angolo dei quadri elettrici scarica a ogni turno.",
    "durata": "scena",
    "ordine": 12,
    "breve": "zona che morde: 1 danno a turno, o Condizione",
    "facce": {
      "indagine": {
        "testo": "l'archivio si allaga, il cimitero si copre di nebbia (Offuscato)",
        "prezzo": "2"
      },
      "trattativa": {
        "testo": "il locale si svuota, le voci arrivano lontane (Ovattato)",
        "prezzo": "2"
      },
      "infiltrazione": {
        "testo": "il piano diventa una zona pericolosa: il gas, il corto",
        "prezzo": "2"
      },
      "combattimento": {
        "testo": "il pavimento crepato da Forza cede, la nebbia di Vita copre tutto (Offuscato)",
        "prezzo": "2"
      },
      "inseguimento": {
        "testo": "la pioggia e il buio valgono per tutti e due (Offuscato)",
        "prezzo": "2"
      },
      "rituale": {
        "testo": "la stanza del rito prende una Condizione per tutti (Ovattato), o il cerchio scarica a ogni turno",
        "prezzo": "2"
      },
      "altrove": {
        "testo": "qui è la regola: una zona che scarica, la nebbia (Offuscato)",
        "prezzo": "2"
      },
      "santuario": {
        "testo": "la casa prende una Condizione per tutti, oppure Il Nodo storto",
        "prezzo": "2"
      },
      "citta": {
        "testo": "la strada si allaga, il tram si ferma in mezzo: una zona da attraversare",
        "prezzo": "2"
      }
    }
  },
  {
    "id": "ombra",
    "nome": "Ombra",
    "famiglia": "presenze",
    "scena": "",
    "presenza": true,
    "modo": "annunciato",
    "prezzo": {
      "testo": "la sua soglia, intorno a 2",
      "breve": "la sua soglia (≈2)",
      "tipo": "suaSoglia",
      "valore": 2
    },
    "quando": "il terzo Volgare della scena, o un Volgare che ha mosso luce e ombra.",
    "segno": "le ombre del mago si muovono un attimo dopo di lui.",
    "effetto": "entra un'Ombra: copia i movimenti del mago, rifà in piccolo quello che lui ha appena fatto con la Magick, e vuole una cosa piccola: essere guardata negli occhi, essere chiamata per nome, avere un oggetto del mago. Finché non l'ha avuta, la sua soglia toglie dadi a chi la ignora.",
    "mosse": [
      "darle quello che vuole",
      "tenerla lontana",
      "uscire dalla scena"
    ],
    "poi": "avuta la sua cosa se ne va, e a fine scena se ne va comunque. Se la colpiscono con la Magick, il colpo passa attraverso e arriva a chi c'è dietro: un In mezzo senza pagarlo.",
    "esempio": "l'ombra del mago sul muro alza la mano un secondo dopo di lui, poi si stacca e resta in piedi da sola.",
    "durata": "",
    "ordine": 13,
    "breve": "entra un'Ombra: vuole una cosa piccola",
    "facce": {}
  },
  {
    "id": "esattore",
    "nome": "Esattore",
    "famiglia": "presenze",
    "scena": "",
    "presenza": true,
    "modo": "annunciato",
    "prezzo": {
      "testo": "la sua soglia, intorno a 4",
      "breve": "la sua soglia (≈4)",
      "tipo": "suaSoglia",
      "valore": 4
    },
    "quando": "un Volgare grosso ha cambiato qualcosa che non doveva cambiare: un morto che respira, una porta nel tempo, un ricordo riscritto.",
    "segno": "qualcuno arriva dal punto esatto del Volgare, e sa il nome del mago.",
    "effetto": "entra l'Esattore, una figura con la sua soglia. Vuole che l'effetto venga disfatto, oppure un prezzo al posto suo: un oggetto che conta, una Quintessenza, una promessa. Finché non l'ha avuto, la sua soglia toglie dadi ai maghi, e la Magick contro di lui è Volgare con testimoni.",
    "mosse": [
      "disfare l'effetto",
      "pagare il prezzo",
      "tenerlo a bada fino a fine scena"
    ],
    "poi": "pagato, se ne va e non torna per quell'effetto. Non pagato, a fine scena se ne va lo stesso, e l'effetto ha un Ritorno addosso: alla scena dopo cade, senza pagarlo.",
    "esempio": "il vecchio che avevano fatto respirare di nuovo si mette a sedere, e dietro di lui c'è un uomo in cappotto che chiede chi ha firmato.",
    "durata": "",
    "ordine": 14,
    "breve": "entra l'Esattore: vuole l'effetto disfatto",
    "facce": {}
  },
  {
    "id": "ospite",
    "nome": "Ospite",
    "famiglia": "presenze",
    "scena": "",
    "presenza": true,
    "modo": "annunciato",
    "prezzo": {
      "testo": "la sua soglia",
      "breve": "la sua soglia",
      "tipo": "suaSoglia",
      "valore": 0
    },
    "quando": "un rituale è a metà, o un Volgare è stato lanciato in un posto che non è il mondo.",
    "segno": "qualcosa guarda dal bordo della scena: un riflesso che non torna, una voce nella statica.",
    "effetto": "entra l'Ospite, con la sua soglia. Vuole una cosa sola, e la dice. Non attacca per primo. Finché è in scena ogni Volgare è con testimoni, perché lui è un testimone che conta.",
    "mosse": [
      "dargli quello che vuole",
      "mandarlo via col rito",
      "ignorarlo e finire in fretta"
    ],
    "poi": "avuta la sua cosa se ne va. Ignorato fino a fine scena, ha visto tutto, e quello che ne fa lo decidi tu nelle scene dopo.",
    "esempio": "una figura in fondo al corridoio guarda il cerchio, e vuole che uno dei maghi le dica il nome che aveva da bambino.",
    "durata": "",
    "ordine": 15,
    "breve": "entra un testimone: Volgari con testimoni",
    "facce": {}
  },
  {
    "id": "carica",
    "nome": "Carica",
    "famiglia": "orologi",
    "scena": "",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "1 punto, più il rimbalzo",
      "breve": "1 pt + rimbalzo",
      "tipo": "orologioRimbalzo",
      "valore": 1
    },
    "quando": "vuoi che siano i giocatori a decidere quando arriva il colpo grosso.",
    "segno": "l'orologio si apre in vista, da tre a sei segmenti, e dici cosa scatta quando è pieno.",
    "effetto": "ogni Volgare dei maghi nella scena riempie un segmento. Pieno, scatta il rimbalzo che hai scelto e pagato all'apertura: uno Specchio, una Presenza, Il luogo.",
    "mosse": [
      "lanciare Accidentale",
      "fermarsi in tempo",
      "riempirlo apposta e prepararsi"
    ],
    "poi": "scattato, l'orologio sparisce. Se la scena finisce prima, i punti restano spesi e il rimbalzo non arriva: è il rischio dell'annuncio.",
    "esempio": "«Quattro segmenti. Quando è pieno, il fuoco che avete acceso torna indietro.»",
    "durata": "",
    "ordine": 16,
    "breve": "orologio a Volgari: pieno, scatta il rimbalzo",
    "facce": {}
  },
  {
    "id": "scadenza",
    "nome": "Scadenza",
    "famiglia": "orologi",
    "scena": "",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "1 punto",
      "breve": "1 pt",
      "tipo": "fisso",
      "valore": 1
    },
    "quando": "un effetto Volgare sta reggendo la scena e vuoi dire da subito che non durerà.",
    "segno": "l'orologio si apre accanto all'effetto, da due a quattro segmenti.",
    "effetto": "avanza di un segmento a turno. Pieno, l'effetto cade: è un Ritorno annunciato, e la soglia la paghi quando scatta.",
    "mosse": [
      "fare in fretta",
      "rilanciare prima che scada",
      "prepararsi al dopo"
    ],
    "poi": "se il mago spegne l'effetto prima, l'orologio si chiude e la soglia non la paghi.",
    "esempio": "«Il muro di ghiaccio, tre segmenti: al terzo si scioglie.»",
    "durata": "",
    "ordine": 17,
    "breve": "orologio a turni: pieno, l'effetto cade",
    "facce": {}
  },
  {
    "id": "arrivo",
    "nome": "Arrivo",
    "famiglia": "orologi",
    "scena": "",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "1 punto",
      "breve": "1 pt",
      "tipo": "fisso",
      "valore": 1
    },
    "quando": "una Presenza sta per entrare.",
    "segno": "l'orologio si apre, da due a quattro segmenti, col nome di quello che arriva o senza.",
    "effetto": "avanza di un segmento a turno, o a scena fuori dal combattimento. Pieno, la Presenza entra e ne paghi la soglia.",
    "mosse": [
      "chiudere la scena prima",
      "prepararsi",
      "andare incontro"
    ],
    "poi": "se la scena finisce prima che sia pieno, la Presenza non arriva e non la paghi.",
    "esempio": "«Due segmenti, senza nome. Al primo le ombre si muovono in ritardo.»",
    "durata": "",
    "ordine": 18,
    "breve": "orologio a turni: pieno, entra una Presenza",
    "facce": {}
  },
  {
    "id": "nascosto",
    "nome": "Nascosto",
    "famiglia": "orologi",
    "scena": "",
    "presenza": false,
    "modo": "nascosto",
    "prezzo": {
      "testo": "1 punto, più il rimbalzo",
      "breve": "1 pt + rimbalzo",
      "tipo": "orologioRimbalzo",
      "valore": 1
    },
    "quando": "vuoi un colpo grosso col segno solo all'ultimo.",
    "segno": "",
    "effetto": "come Carica, ma i giocatori non vedono l'orologio: lo vede solo chi ha il potere Quadrante. Si riempie coi loro Volgari; all'ultimo segmento dai il segno, e al Volgare dopo scatta il rimbalzo, pagato all'apertura.",
    "mosse": [
      "chi ha Quadrante lo dice agli altri; gli altri possono solo lanciare meno"
    ],
    "poi": "come Carica.",
    "esempio": "la maga con Quadrante sente un conto alla rovescia che gli altri non sentono, e sono già a tre Volgari.",
    "durata": "",
    "ordine": 19,
    "breve": "orologio invisibile a Volgari: pieno, il rimbalzo",
    "facce": {}
  },
  {
    "id": "ciclo",
    "nome": "Ciclo",
    "famiglia": "orologi",
    "scena": "",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "1 punto",
      "breve": "1 pt",
      "tipo": "fisso",
      "valore": 1
    },
    "quando": "la scena è in un posto Dissonante (lo hai dichiarato tu, gratis) e vuoi che il posto morda da solo.",
    "segno": "l'orologio gira in vista, con un timer.",
    "effetto": "a ogni giro completo, una Conseguenza a tua scelta a chi ha lanciato Volgare in quel giro, senza pagarlo.",
    "mosse": [
      "lanciare fra un giro e l'altro",
      "uscire",
      "finire in fretta"
    ],
    "poi": "si ferma quando la scena finisce o quando escono dal posto.",
    "esempio": "«Ogni due minuti il posto scarica: chi ha lanciato prende Tremore.»",
    "durata": "",
    "ordine": 20,
    "breve": "orologio a giri: pieno, una Conseguenza gratis",
    "facce": {}
  },
  {
    "id": "ancora",
    "nome": "Ancora",
    "famiglia": "orologi",
    "scena": "",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "1 punto",
      "breve": "1 pt",
      "tipo": "fisso",
      "valore": 1
    },
    "quando": "un'Ancora ha chiamato (vedi La chiamata) e i maghi hanno scelto di restare.",
    "segno": "",
    "effetto": "avanza di un segmento a scena finché i maghi non rispondono, da tre a quattro segmenti. Pieno, il problema dell'Ancora arriva sul gruppo, dove sono.",
    "mosse": [
      "andare",
      "telefonare",
      "mandare qualcuno che non sia del gruppo"
    ],
    "poi": "pieno, scatta La chiamata di nuovo, senza pagarla, ma stavolta il problema è già successo.",
    "esempio": "«Tre segmenti: uno per ogni scena in cui tua sorella non ha una risposta.»",
    "durata": "",
    "ordine": 21,
    "breve": "orologio a scene: pieno, il guaio dell'Ancora",
    "facce": {}
  },
  {
    "id": "la-chiamata",
    "nome": "La chiamata",
    "famiglia": "ancore",
    "scena": "",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "la scena è nel pieno e uno dei maghi ha appena lanciato Volgare.",
    "segno": "il telefono vibra, un messaggio, una voce: è l'Ancora, e non sta bene.",
    "effetto": "l'Ancora ha un problema che non aspetta, e lo dice al mago. Il gruppo decide insieme: va, e la scena si sposta tutta dove sta l'Ancora; oppure resta, e si apre l'orologio dell'Ancora.",
    "mosse": [
      "andare tutti",
      "restare tutti e aprire l'orologio",
      "mandare qualcuno che non sia del gruppo"
    ],
    "poi": "se vanno, la scena nuova è tua e comincia dal problema. Se restano, l'orologio corre.",
    "esempio": "«È Marta. Dice che c'è qualcuno sotto casa, e che non è la polizia.»",
    "durata": "scena",
    "ordine": 22,
    "breve": "l'Ancora chiama: si va da lei, o parte l'orologio",
    "facce": {}
  },
  {
    "id": "l-incrocio",
    "nome": "L'incrocio",
    "famiglia": "ancore",
    "scena": "",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "3 punti",
      "breve": "3 pt",
      "tipo": "fisso",
      "valore": 3
    },
    "quando": "due o più maghi hanno lanciato Volgare nella stessa scena.",
    "segno": "due telefoni vibrano insieme, o lo stesso nome esce da due bocche.",
    "effetto": "le Ancore di due o più maghi finiscono nello stesso guaio: sono nello stesso posto, oppure il problema di una è la causa del problema dell'altra. Il problema è di tutti.",
    "mosse": [
      "andare tutti",
      "dividere i compiti sul posto",
      "scegliere quale Ancora prima"
    ],
    "poi": "la scena nuova è tua. Chi arriva tardi da un'Ancora la trova cambiata, ed è materiale per le scene dopo, senza pagare.",
    "esempio": "la sorella di uno lavora nel bar dove il figlio dell'altra ha appena fatto a botte.",
    "durata": "scena",
    "ordine": 23,
    "breve": "due Ancore nello stesso guaio",
    "facce": {}
  },
  {
    "id": "in-scena",
    "nome": "In scena",
    "famiglia": "ancore",
    "scena": "",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "un Volgare succede in un posto dove un'Ancora potrebbe esserci.",
    "segno": "una voce nota, una schiena nota, in fondo alla scena.",
    "effetto": "l'Ancora era vicina e il rimbalzo la porta dentro l'effetto: da qui in poi è In mezzo e Testimone insieme, con le loro regole.",
    "mosse": [
      "salvarla",
      "portarla via",
      "spiegarle"
    ],
    "poi": "salvata ha visto, e il mago deve parlarle. Lasciata, va sulla tavola della Saggezza, e il gruppo lo sa.",
    "esempio": "la porta del bar che Forza ha sfondato era quella dove lavora la sorella di Luca.",
    "durata": "scena",
    "ordine": 24,
    "breve": "l'Ancora entra nell'effetto: In mezzo + Testimone",
    "facce": {}
  },
  {
    "id": "il-bersaglio-sbagliato",
    "nome": "Il bersaglio sbagliato",
    "famiglia": "ancore",
    "scena": "",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "la soglia",
      "breve": "la soglia",
      "tipo": "soglia",
      "valore": 0
    },
    "quando": "un Volgare su una persona: guarire, convincere, far dimenticare, spostare nel tempo.",
    "segno": "l'effetto parte, e per un attimo il mago vede un'altra faccia al posto del bersaglio.",
    "effetto": "al turno dopo l'effetto è andato sull'Ancora, ovunque sia, invece che sul bersaglio: la guarigione, la Mente, il Tempo hanno lavorato su di lei, storpiati come in uno Specchio. Paghi la soglia.",
    "mosse": [
      "andare a vedere",
      "rilanciare per riparare",
      "chiamarla"
    ],
    "poi": "riparare costa un altro Volgare, con la regola del rilancio. Non riparato, l'effetto resta su di lei fino a fine sessione.",
    "esempio": "il ricordo che dovevano cancellare al testimone è sparito a Marta, che non sa più dove abita.",
    "durata": "sessione",
    "ordine": 25,
    "breve": "l'effetto colpisce l'Ancora, storpiato",
    "facce": {}
  },
  {
    "id": "il-ritmo",
    "nome": "Il ritmo",
    "famiglia": "ancore",
    "scena": "",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "1 punto, più l'orologio",
      "breve": "1 pt + orologio",
      "tipo": "fisso",
      "valore": 1,
      "orologio": true
    },
    "quando": "una sessione con tanti Volgari, e vuoi un conto che i giocatori vedano crescere.",
    "segno": "si apre un orologio con il nome dell'Ancora, da quattro a sei segmenti.",
    "effetto": "la vita dell'Ancora va storta piano: ogni Volgare del mago riempie un segmento, e il mago lo sente (una chiamata persa, una notizia, un brutto sogno). Pieno, scatta La chiamata senza pagarla.",
    "mosse": [
      "lanciare meno",
      "andare a vedere prima",
      "prepararsi"
    ],
    "poi": "come La chiamata.",
    "esempio": "quattro segmenti col nome di Marta; al secondo, un messaggio di notte: «ho perso il lavoro».",
    "durata": "scena",
    "ordine": 26,
    "breve": "orologio sull'Ancora: pieno, La chiamata gratis",
    "facce": {}
  },
  {
    "id": "indagine-mezza-verita",
    "nome": "Mezza verità",
    "famiglia": "scena",
    "scena": "indagine",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "un mago sta per lanciare per sapere qualcosa. Spendi prima del tiro.",
    "segno": "",
    "effetto": "la risposta arriva vera, ma manca un pezzo: chi, dove, quando oppure perché. Scegli il pezzo prima del tiro e lo dici dopo.",
    "mosse": [
      "verificare",
      "usare quello che hanno",
      "cercare il pezzo mancante senza Magick"
    ],
    "poi": "se rilanciano per il pezzo mancante, il nuovo Volgare è tuo. Se lo trovano da Dormienti, la pista è pulita.",
    "esempio": "la visione mostra l'uomo col coltello e il bar, ma non la sera.",
    "durata": "scena",
    "ordine": 27,
    "breve": "risposta vera, manca un pezzo",
    "facce": {}
  },
  {
    "id": "indagine-sorvegliato",
    "nome": "Sorvegliato",
    "famiglia": "scena",
    "scena": "indagine",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "la Magick di un mago guarda o cerca qualcuno.",
    "segno": "",
    "effetto": "il bersaglio sente lo sguardo. Non sa chi, sa che qualcuno lo cerca, e in questa scena cambia le sue mosse: si sposta, chiama qualcuno, nasconde una cosa.",
    "mosse": [
      "sbrigarsi",
      "cambiare strada",
      "andare di persona"
    ],
    "poi": "se lo cercano di nuovo con la Magick, sente anche quello e capisce da dove viene lo sguardo. Da lì in poi è lui che cerca loro, ed è tuo.",
    "esempio": "la donna sul tram chiude il telefono, scende alla fermata sbagliata e si guarda alle spalle.",
    "durata": "scena",
    "ordine": 28,
    "breve": "il bersaglio si sente cercato, cambia mosse",
    "facce": {}
  },
  {
    "id": "indagine-domande",
    "nome": "Domande",
    "famiglia": "scettro",
    "scena": "indagine",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "un Dormiente ha visto i maghi fare qualcosa di strano.",
    "segno": "il Dormiente li guarda, e non se ne va.",
    "effetto": "fa le domande giuste, quelle che i maghi non possono spiegare, perché il Paradosso gliele ha messe in bocca. Mente non gliele toglie: cancellata a uno, la stessa domanda esce dalla bocca di un altro nella stessa scena.",
    "mosse": [
      "rispondere",
      "mentire bene",
      "andarsene con lui che guarda"
    ],
    "poi": "una risposta che regge chiude la cosa. Una bugia scoperta, o la fuga, vuol dire che ha visto, e da lì è un Testimone, già pagato.",
    "esempio": "il portiere blocca l'ascensore col piede: «Voi chi siete, di preciso? E com'è che la luce si è spenta solo qui?».",
    "durata": "scena",
    "ordine": 29,
    "breve": "un PNG fa domande scomode, Mente non le toglie",
    "facce": {}
  },
  {
    "id": "indagine-senza-prove",
    "nome": "Senza prove",
    "famiglia": "scettro",
    "scena": "indagine",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "i maghi hanno preso con la Magick una prova da usare con i Dormienti: una foto della visione, un file trovato con Corrispondenza, una confessione ottenuta con Mente.",
    "segno": "",
    "effetto": "la prova si cancella da sola: la foto esce mossa, il file si corrompe, la confessione non regge a una seconda domanda. Rifarla con la Magick la cancella di nuovo.",
    "mosse": [
      "prenderla da Dormienti",
      "usarla prima che sparisca",
      "farne a meno"
    ],
    "poi": "la prova presa senza Magick regge, e la scena con chi doveva vederla è tua.",
    "esempio": "sanno dov'è il corpo, ma il video del telefono ha solo neve.",
    "durata": "scena",
    "ordine": 30,
    "breve": "la prova si cancella da sola",
    "facce": {}
  },
  {
    "id": "trattativa-ripensamento",
    "nome": "Ripensamento",
    "famiglia": "scena",
    "scena": "trattativa",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "la soglia dell'effetto",
      "breve": "la soglia",
      "tipo": "soglia",
      "valore": 0
    },
    "quando": "il sì è arrivato con la Magick: Mente, Entropia, Tempo.",
    "segno": "la persona convinta si tocca la fronte, perde il filo, chiede di ripetere.",
    "effetto": "a fine scena è tornata alla posizione di prima dell'accordo. Ci ripensa, chiede tempo, manda avanti qualcun altro. Paghi la soglia.",
    "mosse": [
      "convincerla di nuovo da Dormienti",
      "accettare il rinvio",
      "chiudere prima che succeda"
    ],
    "poi": "se la convincono di nuovo con la Magick, il nuovo Volgare è tuo. Da Dormienti, l'accordo regge.",
    "esempio": "la guardia convinta a far passare i maghi, dieci minuti dopo, chiede di rivedere i documenti.",
    "durata": "scena",
    "ordine": 31,
    "breve": "a fine scena l'accordo salta",
    "facce": {}
  },
  {
    "id": "trattativa-garanzia",
    "nome": "Garanzia",
    "famiglia": "scettro",
    "scena": "trattativa",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "si sta chiudendo un accordo, e c'è stato un Volgare nella scena.",
    "segno": "l'altra parte chiede una garanzia, e la chiede con parole che non sono sue.",
    "effetto": "la garanzia data è legata dal Paradosso: se i maghi la rompono con la Magick, l'effetto fallisce (un Ritorno senza pagarlo) e l'altra parte lo sa. Da Dormienti si rompe come qualunque promessa.",
    "mosse": [
      "dare la garanzia",
      "negoziarne un'altra",
      "alzarsi dal tavolo"
    ],
    "poi": "il patto tiene finché una delle due parti lo rompe da Dormienti, e quella scena è tua.",
    "esempio": "«Voglio che me lo giuri su tua sorella.» Da quel momento la Mente su di lui non prende.",
    "durata": "scena",
    "ordine": 32,
    "breve": "promessa legata: con Magick l'effetto fallisce",
    "facce": {}
  },
  {
    "id": "trattativa-concorrenza",
    "nome": "Concorrenza",
    "famiglia": "scettro",
    "scena": "trattativa",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "3 punti",
      "breve": "3 pt",
      "tipo": "fisso",
      "valore": 3
    },
    "quando": "i maghi hanno usato la Magick per arrivare primi: sapere, trovare, convincere.",
    "segno": "qualcuno arriva con lo stesso obiettivo, e ha già in mano quello che serve.",
    "effetto": "un terzo vuole la sua parte, e la coincidenza lavora per lui: in questa scena Entropia, Mente e Tempo su di lui sono Volgari con testimoni, e le porte si aprono a lui per prime.",
    "mosse": [
      "trattare con lui",
      "batterlo da Dormienti",
      "cedergli una parte"
    ],
    "poi": "a fine scena la fortuna storta finisce. Lui resta, ed è tuo.",
    "esempio": "la bara che i maghi hanno appena trovato con Corrispondenza ha già un'offerta sopra, firmata.",
    "durata": "scena",
    "ordine": 33,
    "breve": "un terzo in gara, favorito dal caso",
    "facce": {}
  },
  {
    "id": "trattativa-ora-o-mai",
    "nome": "Ora o mai",
    "famiglia": "scettro",
    "scena": "trattativa",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "la trattativa gira a vuoto e c'è stato un Volgare.",
    "segno": "si apre un orologio da due a tre segmenti, con l'ora.",
    "effetto": "l'ora è fissa: Tempo non la allunga, Corrispondenza non la accorcia, la Magick sul tempo intorno alla scena fallisce. Pieno, l'altra parte se ne va con quello che ha, e l'accordo non c'è più.",
    "mosse": [
      "chiudere adesso",
      "cedere qualcosa",
      "lasciar perdere"
    ],
    "poi": "pieno, la scena si chiude. Chi vuole quell'accordo lo cerca in un'altra scena, da Dormienti.",
    "esempio": "«Ho un treno alle otto», e l'orologio della stazione resta sulle otto meno un quarto qualunque cosa faccia il mago del Tempo.",
    "durata": "scena",
    "ordine": 34,
    "breve": "ora fissa: la Magick sul tempo fallisce",
    "facce": {}
  },
  {
    "id": "infiltrazione-telecamera",
    "nome": "Telecamera",
    "famiglia": "scena",
    "scena": "infiltrazione",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "un Volgare in un posto sorvegliato.",
    "segno": "una spia rossa che si accende, un ronzio di motore.",
    "effetto": "al turno dopo il sistema ha registrato. È il Testimone di questa scena: finché la registrazione esiste, i Volgari nel palazzo contano con testimoni.",
    "mosse": [
      "cancellarla (con la Magick è Volgare con testimoni)",
      "portarsi via il disco",
      "andarsene"
    ],
    "poi": "cancellata con la Magick, si ricostruisce a metà: una prova contro di loro che resta. Lasciata, il video è tuo per le scene dopo.",
    "esempio": "la luce rossa sopra la porta lampeggia due volte.",
    "durata": "scena",
    "ordine": 35,
    "breve": "registrazione: Volgari con testimoni",
    "facce": {}
  },
  {
    "id": "infiltrazione-sistema",
    "nome": "Sistema",
    "famiglia": "scena",
    "scena": "infiltrazione",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "la Magick ha toccato l'impianto: luci, porte, sensori, rete.",
    "segno": "",
    "effetto": "il sistema reagisce, ed è il Residuo di questa scena: l'edificio si mette in allarme, le porte si chiudono, le luci si accendono a caso, l'ascensore si ferma al piano sbagliato.",
    "mosse": [
      "staccare tutto",
      "muoversi con le luci",
      "uscire"
    ],
    "poi": "se l'impianto è ancora in tilt a fine scena, alla prossima visita il palazzo ha Il luogo, già pagato.",
    "esempio": "il buio chiesto con Forza dura un secondo, poi tutto il piano si accende, corridoi compresi.",
    "durata": "scena",
    "ordine": 36,
    "breve": "l'edificio reagisce: allarme, porte, luci",
    "facce": {}
  },
  {
    "id": "infiltrazione-uscita",
    "nome": "Uscita",
    "famiglia": "scena",
    "scena": "infiltrazione",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "la soglia",
      "breve": "la soglia",
      "tipo": "soglia",
      "valore": 0
    },
    "quando": "i maghi sono entrati con la Magick: un varco di Corrispondenza, un muro passato con Materia, un salto nel tempo.",
    "segno": "il varco sfarfalla, il muro torna solido un attimo e poi cede di nuovo.",
    "effetto": "al turno dopo il passaggio è chiuso: l'uscita non è più l'entrata, e fuori c'è quello che c'era. È il Ritorno di questa scena.",
    "mosse": [
      "riaprirlo",
      "cercare un'uscita da Dormienti",
      "aspettare"
    ],
    "poi": "riaperto con un altro Volgare, quel Volgare è tuo.",
    "esempio": "il muro della cantina che avevano attraversato è di nuovo un muro, e stavolta c'è un armadio davanti.",
    "durata": "scena",
    "ordine": 37,
    "breve": "l'uscita si chiude",
    "facce": {}
  },
  {
    "id": "infiltrazione-ronda",
    "nome": "Ronda",
    "famiglia": "scettro",
    "scena": "infiltrazione",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "1 punto",
      "breve": "1 pt",
      "tipo": "fisso",
      "valore": 1
    },
    "quando": "la Magick ha nascosto i maghi: Mente, Vita, un buio di Forza.",
    "segno": "passi, una torcia, un cane.",
    "effetto": "la guardia che passa è sorda alla Magick: l'Accidentale su di lei non prende, e ogni Volgare per ingannarla è con testimoni, perché è un testimone che il Paradosso protegge. Da Dormienti si evita come una guardia qualsiasi.",
    "mosse": [
      "nascondersi davvero",
      "aspettare",
      "distrarla da Dormienti"
    ],
    "poi": "passata, se ne va. Fermata con un Volgare, ha visto, ed è un Testimone che non paghi.",
    "esempio": "l'illusione regge su tutti, tranne che sulla guardia col cane, che si ferma proprio lì.",
    "durata": "scena",
    "ordine": 38,
    "breve": "guardia immune alla Magick",
    "facce": {}
  },
  {
    "id": "combattimento-anticipo",
    "nome": "Anticipo",
    "famiglia": "scettro",
    "scena": "combattimento",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "1 punto",
      "breve": "1 pt",
      "tipo": "fisso",
      "valore": 1
    },
    "quando": "un mago sta per lanciare Volgare e un PNG deve colpire prima.",
    "segno": "",
    "effetto": "il tempo intorno al mago è storto: il suo Volgare di questo turno arriva a fine turno, dopo che tutti hanno agito. Tempo non lo raddrizza.",
    "mosse": [
      "lanciare lo stesso e incassare",
      "cambiare azione",
      "ripararsi"
    ],
    "poi": "finisce col turno.",
    "esempio": "la sfera di fuoco è pronta, ma il grilletto è già partito.",
    "durata": "turno",
    "ordine": 39,
    "breve": "il Volgare arriva a fine turno",
    "facce": {}
  },
  {
    "id": "combattimento-rinforzo",
    "nome": "Rinforzo",
    "famiglia": "scettro",
    "scena": "combattimento",
    "presenza": true,
    "modo": "annunciato",
    "prezzo": {
      "testo": "la sua soglia",
      "breve": "la sua soglia",
      "tipo": "suaSoglia",
      "valore": 0
    },
    "quando": "i maghi stanno vincendo troppo in fretta con la Magick.",
    "segno": "si apre un orologio a due segmenti, e qualcosa si muove dentro l'effetto dei maghi: nel fuoco, nel varco, nel buio.",
    "effetto": "al secondo segmento entra un rinforzo che non doveva esserci, uscito dalla loro Magick: una Presenza con la sua soglia, che vuole che l'effetto da cui è uscita continui.",
    "mosse": [
      "spegnere l'effetto da cui è uscito",
      "affrontarlo",
      "scappare"
    ],
    "poi": "spento l'effetto, se ne va. A fine scena se ne va comunque.",
    "esempio": "dal varco di Corrispondenza aperto per entrare esce qualcosa che ha la loro stessa faccia.",
    "durata": "",
    "ordine": 40,
    "breve": "al 2° segmento entra un rinforzo",
    "facce": {}
  },
  {
    "id": "combattimento-stop",
    "nome": "Stop",
    "famiglia": "scettro",
    "scena": "combattimento",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "lo scontro si trascina e i Volgari sono stati tanti.",
    "segno": "il suono se ne va dalla scena, un turno di silenzio che cresce.",
    "effetto": "al turno dopo, per un turno intero, nessuna Magick funziona nella scena: né dei maghi né dei nemici. Chi era in vantaggio lo tiene con le armi.",
    "mosse": [
      "scappare",
      "trattare",
      "colpire da Dormienti"
    ],
    "poi": "la Magick torna al turno dopo. Se in quel turno nessuno ha colpito, lo scontro è finito in uno stallo, e la scena è tua.",
    "esempio": "le sirene sembrano lontane, e la maga apre la mano: niente.",
    "durata": "turno",
    "ordine": 41,
    "breve": "1 turno senza Magick, per tutti",
    "facce": {}
  },
  {
    "id": "combattimento-ritirata",
    "nome": "Ritirata",
    "famiglia": "scettro",
    "scena": "combattimento",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "i nemici sono allo scoperto e stanno perdendo per la Magick.",
    "segno": "i nemici arretrano tutti insieme, come se sapessero.",
    "effetto": "al turno dopo si ritirano coperti dal Paradosso: la Magick non li segue. Corrispondenza non li vede, Forza si spegne sulla soglia, Mente non li ferma. Da Dormienti si inseguono come chiunque.",
    "mosse": [
      "inseguirli a piedi",
      "lasciarli andare",
      "tenere la posizione"
    ],
    "poi": "ritirati, restano tuoi per le scene dopo.",
    "esempio": "le guardie rientrano nella guardiola, e la porta di ferro non si apre né con Materia né con Forza.",
    "durata": "scena",
    "ordine": 42,
    "breve": "i nemici si ritirano, la Magick non li segue",
    "facce": {}
  },
  {
    "id": "combattimento-fuga",
    "nome": "Fuga",
    "famiglia": "scettro",
    "scena": "combattimento",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "3 punti",
      "breve": "3 pt",
      "tipo": "fisso",
      "valore": 3
    },
    "quando": "il cattivo sta per uscire di scena troppo presto, e i maghi hanno usato la Magick per prenderlo.",
    "segno": "",
    "effetto": "scappa in un modo soprannaturale: sparisce nel riflesso, esce da una porta che non c'era, arriva un'auto che nessuno ha chiamato. Corrispondenza e Tempo non lo ritrovano: il Paradosso lo copre fino alla scena dopo. Ritrovarlo costa un rituale, o lavoro da Dormienti.",
    "mosse": [
      "lasciarlo andare",
      "marcarlo con qualcosa di fisico prima che sparisca",
      "cercarlo dopo da Dormienti"
    ],
    "poi": "torna quando lo decidi tu. Il segno che gli hanno lasciato addosso, se c'è, è la pista.",
    "esempio": "il capo della banda è dietro la vetrina, poi c'è solo il riflesso della vetrina, e la vetrina è intera.",
    "durata": "scena",
    "ordine": 43,
    "breve": "fuga soprannaturale: non si ritrova",
    "facce": {}
  },
  {
    "id": "inseguimento-svolta",
    "nome": "Svolta",
    "famiglia": "scena",
    "scena": "inseguimento",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "la Magick segue chi scappa: Corrispondenza, Tempo, Spirito.",
    "segno": "",
    "effetto": "la pista si perde per un turno: chi scappa sparisce dalla Magick, non dagli occhi. È la Mezza verità di questa scena: sanno dov'era, non dov'è.",
    "mosse": [
      "seguirlo a vista",
      "tagliargli la strada da Dormienti",
      "rilanciare"
    ],
    "poi": "rilanciare vale la regola del rilancio. A vista, la corsa continua.",
    "esempio": "l'ago di Corrispondenza gira su se stesso per un turno, e il motorino è già oltre il semaforo.",
    "durata": "scena",
    "ordine": 44,
    "breve": "chi scappa sparisce dalla Magick, 1 turno",
    "facce": {}
  },
  {
    "id": "inseguimento-scambio",
    "nome": "Scambio",
    "famiglia": "scena",
    "scena": "inseguimento",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "3 punti",
      "breve": "3 pt",
      "tipo": "fisso",
      "valore": 3
    },
    "quando": "la Magick ferma o prende chi scappa.",
    "segno": "",
    "effetto": "hanno preso quello sbagliato: stesso giubbotto, stessa corporatura, stessa direzione. Quello giusto è ancora in corsa.",
    "mosse": [
      "lasciarlo",
      "riprendere la corsa",
      "interrogarlo"
    ],
    "poi": "quello sbagliato è un Dormiente che ha visto: un Testimone, e un In mezzo se lo hanno fermato con la forza, senza pagarli.",
    "esempio": "il ragazzo bloccato da Forza contro il muro ha la faccia sbagliata e il telefono in mano.",
    "durata": "scena",
    "ordine": 45,
    "breve": "hanno preso quello sbagliato",
    "facce": {}
  },
  {
    "id": "inseguimento-ostacolo",
    "nome": "Ostacolo",
    "famiglia": "scettro",
    "scena": "inseguimento",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "1 punto",
      "breve": "1 pt",
      "tipo": "fisso",
      "valore": 1
    },
    "quando": "un mago ha lanciato Volgare per andare più forte.",
    "segno": "",
    "effetto": "qualcosa attraversa la strada, e non si scavalca con la Magick: Corrispondenza scivola, Forza rimbalza, Tempo non lo sposta. Si passa da Dormienti, con un tiro: saltare, frenare, aggirare.",
    "mosse": [
      "saltare",
      "frenare",
      "tagliare"
    ],
    "poi": "passato, la corsa continua. Il tiro fallito è la tua chiusura.",
    "esempio": "il tram attraversa l'incrocio, e il salto di Corrispondenza finisce sulla pensilina.",
    "durata": "scena",
    "ordine": 46,
    "breve": "ostacolo che la Magick non passa",
    "facce": {}
  },
  {
    "id": "inseguimento-fine-corsa",
    "nome": "Fine corsa",
    "famiglia": "scettro",
    "scena": "inseguimento",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "la corsa non finisce più e i Volgari sono stati almeno due.",
    "segno": "la strada si stringe, la gente aumenta, si sente una piazza.",
    "effetto": "al turno dopo la corsa si chiude dove il Paradosso vuole: in mezzo alla gente. Tutti e due si fermano, e da lì ogni Volgare è con testimoni.",
    "mosse": [
      "prenderlo da Dormienti",
      "parlargli",
      "lasciarlo"
    ],
    "poi": "la scena è tua: una piazza piena e due persone col fiato corto.",
    "esempio": "la strada finisce nel mercato del sabato, e il ladro è in mezzo alle bancarelle, esattamente come i maghi.",
    "durata": "scena",
    "ordine": 47,
    "breve": "la corsa finisce tra la gente",
    "facce": {}
  },
  {
    "id": "rituale-disturbo",
    "nome": "Disturbo",
    "famiglia": "scena",
    "scena": "rituale",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "un mago sta facendo i Passi di Rituale.",
    "segno": "",
    "effetto": "il Paradosso interrompe un Passo dall'interno: il cerchio sfarfalla, una candela si spegne da sola, il canto perde una parola. Chi guida il rito sceglie: tiene il Passo e perde i dadi che gli avrebbe dato, oppure lo rifà, e il rito dura di più.",
    "mosse": [
      "tenere",
      "rifare",
      "farsi coprire da un altro"
    ],
    "poi": "rifatto, il rito è più lungo: se hai un orologio sul tempo, avanza di un segmento.",
    "esempio": "la fiamma del braciere si piega verso il mago, e il secondo Passo va rifatto.",
    "durata": "scena",
    "ordine": 48,
    "breve": "un Passo del rito si guasta",
    "facce": {}
  },
  {
    "id": "rituale-prezzo-in-piu",
    "nome": "Prezzo in più",
    "famiglia": "scena",
    "scena": "rituale",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "il rito è alla fine, prima del tiro.",
    "segno": "il cerchio chiede: si vede nel fumo, nel sale, nell'acqua.",
    "effetto": "il rito chiede una cosa in più prima di riuscire: un Passo in più, un'altra Quintessenza, oppure un oggetto presente in scena che finisce nel cerchio.",
    "mosse": [
      "pagare",
      "tirare lo stesso con la soglia più alta di 1",
      "fermarsi"
    ],
    "poi": "pagato, il rito è pulito. Tirato con la soglia alta, l'effetto ha un Residuo già dentro, senza pagarlo.",
    "esempio": "il cerchio di sale si apre da solo davanti alla borsa della maga, e vuole il libro che c'è dentro.",
    "durata": "scena",
    "ordine": 49,
    "breve": "il rito chiede una cosa in più",
    "facce": {}
  },
  {
    "id": "rituale-ospite",
    "nome": "Ospite",
    "famiglia": "scena",
    "scena": "rituale",
    "presenza": true,
    "modo": "annunciato",
    "prezzo": {
      "testo": "la sua soglia",
      "breve": "la sua soglia",
      "tipo": "suaSoglia",
      "valore": 0
    },
    "quando": "il rito è a metà.",
    "segno": "qualcosa guarda dal bordo della scena, e si apre l'orologio di Arrivo.",
    "effetto": "entra l'Ospite delle Presenze, e qui vuole una cosa che riguarda il rito: un posto nel cerchio, il nome dell'incantesimo, l'oggetto al centro. Finché è in scena, ogni Volgare è con testimoni.",
    "mosse": [
      "dargli quello che vuole",
      "mandarlo via col rito",
      "finire in fretta"
    ],
    "poi": "come nelle Presenze: avuta la sua cosa se ne va, ignorato ha visto tutto.",
    "esempio": "una figura in fondo al corridoio guarda il cerchio, e chiede di sedersi al posto vuoto.",
    "durata": "",
    "ordine": 50,
    "breve": "entra un Ospite nel rito: Volgari con testimoni",
    "facce": {}
  },
  {
    "id": "rituale-sbavatura",
    "nome": "Sbavatura",
    "famiglia": "scena",
    "scena": "rituale",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "il rito è riuscito.",
    "segno": "",
    "effetto": "l'effetto grande è riuscito, ma sbava: una parte resta fuori dal cerchio e va dove non doveva, come un Residuo più grosso, per questa scena e per la scena dopo.",
    "mosse": [
      "chiuderla",
      "usarla",
      "lasciarla"
    ],
    "poi": "lasciata, alla scena dopo il posto del rito ha Il luogo, e non lo paghi.",
    "esempio": "il varco aperto per far passare uno resta aperto anche per chi era nel corridoio.",
    "durata": "scena",
    "ordine": 51,
    "breve": "l'effetto sbava fuori dal cerchio, 2 scene",
    "facce": {}
  },
  {
    "id": "altrove-pedaggio",
    "nome": "Pedaggio",
    "famiglia": "scettro",
    "scena": "altrove",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "i maghi vogliono passare, entrare o uscire, e lo fanno con la Magick.",
    "segno": "il posto chiede: una mano tesa nel buio, un cancello che si chiude a metà.",
    "effetto": "il pedaggio si prende da solo: da qui a fine scena ogni Volgare costa al mago 1 Quintessenza in più, che il posto si tiene. Senza Quintessenza, il Volgare non parte.",
    "mosse": [
      "pagare",
      "passare da Dormienti (a piedi, seguendo chi ci abita)",
      "tornare indietro"
    ],
    "poi": "usciti dal posto, il pedaggio finisce.",
    "esempio": "il ponte si allunga a ogni passo, finché la maga non lascia cadere una moneta di luce nell'acqua.",
    "durata": "scena",
    "ordine": 52,
    "breve": "ogni Volgare costa 1 Quintessenza in più",
    "facce": {}
  },
  {
    "id": "altrove-la-voce",
    "nome": "La voce",
    "famiglia": "scettro",
    "scena": "altrove",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "1 punto",
      "breve": "1 pt",
      "tipo": "fisso",
      "valore": 1
    },
    "quando": "un mago ha lanciato Volgare qui, e il posto ha sentito il suo nome.",
    "segno": "qualcuno lo chiama, con la voce di un'Ancora.",
    "effetto": "chi non risponde perde 2 dadi su tutti i tiri finché non lo fa, e rispondere vuol dire andare verso la voce, in scena, con tutti. Non è l'Ancora: è il posto che la imita, e i maghi lo capiscono quando arrivano.",
    "mosse": [
      "andare tutti",
      "tapparsi le orecchie e accettare i dadi in meno",
      "finire in fretta e uscire"
    ],
    "poi": "arrivati alla voce, trovano quello che il posto voleva mostrare, e la scena è tua.",
    "esempio": "dal fondo del corridoio la voce della madre di Luca dice il suo nome da bambino.",
    "durata": "scena",
    "ordine": 53,
    "breve": "una voce chiama: −2 dadi a chi non va",
    "facce": {}
  },
  {
    "id": "altrove-stranezza",
    "nome": "Stranezza",
    "famiglia": "scettro",
    "scena": "altrove",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "1 punto",
      "breve": "1 pt",
      "tipo": "fisso",
      "valore": 1
    },
    "quando": "subito dopo un Volgare, fuori dal mondo.",
    "segno": "",
    "effetto": "un dettaglio del posto è sbagliato, e morde: il mago prende una Condizione di Vista o di Udito al primo gradino (Abbagliato, Ovattato) per tutta la scena, perché il posto non si lascia vedere o sentire come vorrebbe.",
    "mosse": [
      "chiudere gli occhi e farsi guidare",
      "cambiare senso",
      "uscire"
    ],
    "poi": "finisce con la scena. Un secondo Volgare porta la Condizione al secondo gradino, gratis.",
    "esempio": "le scale scendono ma il mago sale, e da quel momento vede tutto sfocato.",
    "durata": "scena",
    "ordine": 54,
    "breve": "Abbagliato o Ovattato per la scena",
    "facce": {}
  },
  {
    "id": "santuario-falla",
    "nome": "Falla",
    "famiglia": "scena",
    "scena": "santuario",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "la soglia dell'effetto",
      "breve": "la soglia",
      "tipo": "soglia",
      "valore": 0
    },
    "quando": "una protezione della casa è stata messa con la Magick.",
    "segno": "la protezione sfarfalla, il sale si sposta, il sigillo perde un tratto.",
    "effetto": "al turno dopo cede per coincidenza, e quello che teneva fuori adesso può entrare. È il Ritorno di questa scena.",
    "mosse": [
      "rifarla",
      "tenere la porta da Dormienti",
      "uscire incontro a quello che entra"
    ],
    "poi": "rifatta con un altro Volgare, quel Volgare è tuo.",
    "esempio": "il sigillo sulla porta del Nodo si scrosta, e i cani del vicino smettono di girare al largo.",
    "durata": "scena",
    "ordine": 55,
    "breve": "la protezione cede",
    "facce": {}
  },
  {
    "id": "santuario-il-nodo-storto",
    "nome": "Il Nodo storto",
    "famiglia": "scena",
    "scena": "santuario",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "un Volgare lanciato in casa, sopra il Nodo.",
    "segno": "la luce del Nodo cala, l'acqua della fonte si intorbidisce, le piante si girano dall'altra parte.",
    "effetto": "dal turno dopo, e fino a fine scena, il Nodo non dà Quintessenza e la casa è rigida: ogni Volgare lanciato in casa riesce con l'8.",
    "mosse": [
      "aspettare la scena dopo",
      "pulire il Nodo con un rito (che paga)",
      "uscire a lanciare"
    ],
    "poi": "alla scena dopo il Nodo torna come prima. Pulito col rito, torna subito.",
    "esempio": "la vasca in cortile ha l'acqua ferma e grigia, e la maga sente che stasera non c'è niente da prendere.",
    "durata": "scena",
    "ordine": 56,
    "breve": "Nodo senza Quintessenza, Volgari con l'8",
    "facce": {}
  },
  {
    "id": "santuario-visita",
    "nome": "Visita",
    "famiglia": "scettro",
    "scena": "santuario",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "la casa è protetta con la Magick e c'è stato un Volgare in casa.",
    "segno": "qualcuno bussa, e le protezioni non hanno suonato.",
    "effetto": "la visita passa le protezioni come se non ci fossero, perché il Paradosso le ha attraversate: un vicino, un tecnico, un parente, un'autorità. È dentro, ha visto quello che c'era da vedere, ed è un Testimone. La Magick su di lui è con testimoni.",
    "mosse": [
      "parlargli",
      "accompagnarlo fuori",
      "nascondere in fretta da Dormienti"
    ],
    "poi": "quello che ha visto è tuo per le scene dopo.",
    "esempio": "il vicino di pianerottolo è in cucina con la torta, e la cucina è ancora piena del fumo del rito.",
    "durata": "scena",
    "ordine": 57,
    "breve": "qualcuno entra oltre le protezioni e vede",
    "facce": {}
  },
  {
    "id": "citta-intoppo",
    "nome": "Intoppo",
    "famiglia": "scettro",
    "scena": "citta",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "1 punto",
      "breve": "1 pt",
      "tipo": "fisso",
      "valore": 1
    },
    "quando": "un mago usa la Magick per spostarsi in città: Corrispondenza, Forza, Tempo.",
    "segno": "",
    "effetto": "la scorciatoia arriva nel posto sbagliato: vicino, non lì. Il tempo che volevano risparmiare lo perdono lo stesso, a piedi, e il posto dove arrivano ha gente: con testimoni.",
    "mosse": [
      "fare l'ultimo pezzo a piedi",
      "prendere un mezzo",
      "rilanciare"
    ],
    "poi": "rilanciare vale la regola del rilancio. Arrivati, la scena è quella che avevi preparato.",
    "esempio": "il salto di Corrispondenza li lascia nel cortile del palazzo accanto, con la portinaia che guarda.",
    "durata": "scena",
    "ordine": 58,
    "breve": "la scorciatoia sbaglia posto, con gente",
    "facce": {}
  },
  {
    "id": "citta-controllo",
    "nome": "Controllo",
    "famiglia": "scettro",
    "scena": "citta",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "i maghi hanno usato la Magick su un documento, un'auto, una faccia.",
    "segno": "una pattuglia, un addetto, una divisa che guarda una seconda volta.",
    "effetto": "il controllo vede: la Magick sul documento salta, la targa torna quella vera, la faccia torna la sua. Da Dormienti si passa parlando, o con documenti veri. Mente sull'agente è con testimoni.",
    "mosse": [
      "parlare",
      "mostrare quello che è vero",
      "andarsene con calma"
    ],
    "poi": "superato, finisce lì. Fallito, la scena è tua: un fermo, una denuncia, un'auto sequestrata.",
    "esempio": "il documento fatto con Mente è perfetto finché l'agente non lo gira: dietro è bianco.",
    "durata": "scena",
    "ordine": 59,
    "breve": "il controllo vede attraverso la Magick",
    "facce": {}
  },
  {
    "id": "citta-folla",
    "nome": "Folla",
    "famiglia": "scettro",
    "scena": "citta",
    "presenza": false,
    "modo": "annunciato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "un Volgare in un posto pieno.",
    "segno": "la gente si volta tutta insieme, o si stringe.",
    "effetto": "la folla si chiude intorno al punto del Volgare: per tutta la scena non c'è più un posto senza testimoni, e uscire dalla folla con la Magick (Corrispondenza, Forza) porta un In mezzo, senza pagarlo.",
    "mosse": [
      "uscire a piedi",
      "aspettare che si sciolga",
      "restare e lanciare Accidentale"
    ],
    "poi": "sciolta a fine scena, quello che ha visto è tuo.",
    "esempio": "la piazza si volta verso la maga, e il cerchio di persone intorno a lei si stringe invece di aprirsi.",
    "durata": "scena",
    "ordine": 60,
    "breve": "la folla si chiude: tutto con testimoni",
    "facce": {}
  },
  {
    "id": "citta-chiusura",
    "nome": "Chiusura",
    "famiglia": "scettro",
    "scena": "citta",
    "presenza": false,
    "modo": "immediato",
    "prezzo": {
      "testo": "2 punti",
      "breve": "2 pt",
      "tipo": "fisso",
      "valore": 2
    },
    "quando": "i maghi vogliono entrare in un posto chiuso con la Magick.",
    "segno": "",
    "effetto": "la chiusura tiene: Materia, Forza e Corrispondenza scivolano sulla porta, sulla serranda, sul cancello. Si apre da Dormienti: una chiave, una persona, l'orario.",
    "mosse": [
      "trovare chi ha la chiave",
      "aspettare",
      "cercare un altro modo"
    ],
    "poi": "aperta da Dormienti, la scena dentro è quella che avevi preparato.",
    "esempio": "l'archivio chiude alle sette, e la serratura non sente né Materia né la spallata.",
    "durata": "scena",
    "ordine": 61,
    "breve": "porta o cancello che la Magick non apre",
    "facce": {}
  },
  {
    "id": "anomalia",
    "nome": "Anomalia",
    "famiglia": "grandi",
    "scena": "",
    "presenza": false,
    "modo": "scoppio",
    "prezzo": {
      "testo": "3 punti a pallino, fino a due",
      "breve": "3 pt a pallino",
      "tipo": "pallino",
      "valore": 3,
      "massimo": 2
    },
    "quando": "lo scoppio deve restare addosso al mago per tutta la sessione.",
    "segno": "",
    "effetto": "il mago prende il Difetto Echi. Ogni pallino dà un dado in più a chi prova a capire che è un mago. Intorno a lui il latte inacidisce, gli animali si scostano, le candele si spengono.",
    "mosse": [
      "stare lontano dalla gente",
      "coprire i segni",
      "fare in fretta"
    ],
    "poi": "finisce con la sessione. Se un Dormiente nota il segno, ha visto, e conta come Testimone già pagato.",
    "esempio": "il cane del portiere ringhia al mago dal fuoco, e a nessun altro.",
    "durata": "sessione",
    "ordine": 62,
    "breve": "Difetto Echi: +1 dado a chi lo cerca, per pallino",
    "facce": {}
  },
  {
    "id": "macchia",
    "nome": "Macchia",
    "famiglia": "grandi",
    "scena": "",
    "presenza": false,
    "modo": "scoppio",
    "prezzo": {
      "testo": "5 punti",
      "breve": "5 pt",
      "tipo": "fisso",
      "valore": 5
    },
    "quando": "lo scoppio deve cambiare il mago invece di ferirlo.",
    "segno": "",
    "effetto": "metà dell'Ustione va sulla Saggezza invece che sulla Salute o sulla Volontà, come Macchie Superficiali.",
    "mosse": [
      "fermarsi",
      "parlarne con qualcuno",
      "tornare al Santuario"
    ],
    "poi": "le Macchie restano finché la Saggezza non le assorbe, con le sue regole.",
    "esempio": "da quella sera il mago non riesce più a guardare il fuoco.",
    "durata": "sessione",
    "ordine": 63,
    "breve": "metà Ustione sulla Saggezza",
    "facce": {}
  },
  {
    "id": "spirito-del-paradosso",
    "nome": "Spirito del Paradosso",
    "famiglia": "grandi",
    "scena": "",
    "presenza": false,
    "modo": "scoppio",
    "prezzo": {
      "testo": "5 punti",
      "breve": "5 pt",
      "tipo": "fisso",
      "valore": 5
    },
    "quando": "lo scoppio deve avere un volto.",
    "segno": "",
    "effetto": "un'entità passa dallo strappo a riscuotere. La paghi adesso, e la giochi nella sessione dopo come trama da preparare: è una Presenza con la sua soglia, senza orologio, perché lo scoppio era l'annuncio.",
    "mosse": [
      "prepararsi",
      "cercarla per primi",
      "trattare"
    ],
    "poi": "vuole una cosa sola, come ogni Presenza, e la dice quando arriva.",
    "esempio": "un esattore in giacca grigia, un cane nero, un impiegato senza volto.",
    "durata": "sessione",
    "ordine": 64,
    "breve": "un'entità riscuote nella sessione dopo",
    "facce": {}
  },
  {
    "id": "regno-del-paradosso",
    "nome": "Regno del Paradosso",
    "famiglia": "grandi",
    "scena": "",
    "presenza": false,
    "modo": "scoppio",
    "prezzo": {
      "testo": "10 punti",
      "breve": "10 pt",
      "tipo": "fisso",
      "valore": 10
    },
    "quando": "scoppia un'impresa impossibile, quella col +5 alla soglia.",
    "segno": "",
    "effetto": "il mago, con chi gli sta accanto, finisce in una bolla fuori dal mondo dove le leggi violate non valgono. Uscirne è l'avventura della sessione dopo.",
    "mosse": [
      "capire le regole del posto",
      "restare insieme",
      "trovare la porta"
    ],
    "poi": "dentro, la pagina dell'Altrove vale tutta, e il posto è Dissonante finché non trovano la regola che lo apre.",
    "esempio": "una città vuota, una stanza senza fine, un giorno che si ripete.",
    "durata": "sessione",
    "ordine": 65,
    "breve": "bolla fuori dal mondo: uscirne è la sessione dopo",
    "facce": {}
  }
]);
