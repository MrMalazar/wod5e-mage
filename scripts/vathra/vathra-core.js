/*
 * Il motore del Vathrâ: copia di 03_FABBRICA/vathra/sorgenti/vathra-core.js
 * (MAGHI M6), identica fino all'ultima riga; qui in fondo c'è solo l'export
 * del modulo ES. Una correzione al lessico si fa nel sorgente, poi si ricopia
 * qui (tools/copia-vathra.mjs) e si rilanciano le prove (tests/vathra.test.js).
 */
/* ============================================================
   VATHRÂ — la lingua dei Risvegliati
   Motore di traduzione italiano → Vathrâ
   Progetto Maghi M6 · Le Storie di Nemeya
   ============================================================ */

const VATHRA = (function () {

  /* ---------- 1. FONOLOGIA ---------- */

  const VOCALI = "aeiouâêîôû";
  const DIGRAFI = ["kh", "sh", "th"];

  function fonemi(parola) {
    const out = [];
    for (let i = 0; i < parola.length;) {
      const due = parola.substr(i, 2).toLowerCase();
      if (DIGRAFI.includes(due)) { out.push(parola.substr(i, 2)); i += 2; }
      else { out.push(parola[i]); i += 1; }
    }
    return out;
  }
  const eVocale = f => f.length === 1 && VOCALI.includes(f.toLowerCase());

  // mai più di due consonanti attaccate: in mezzo entra un soffio
  function respira(parola) {
    let f = fonemi(parola);
    let cambiato = true, giri = 0;
    while (cambiato && giri < 8) {
      cambiato = false; giri++;
      let run = 0;
      for (let i = 0; i < f.length; i++) {
        if (!eVocale(f[i]) && f[i] !== "'" && f[i] !== "-") run++;
        else run = 0;
        if (run >= 3) { f.splice(i, 0, "e"); cambiato = true; break; }
      }
    }
    return f.join("");
  }

  function pulisci(w) {
    return w.replace(/''+/g, "'").replace(/e''/g, "e'").replace(/([aeiouâêîôû])\1+/g, "$1");
  }

  /* ---------- 2. I MODI (template vocalici) ---------- */
  const MODI = {
    atto:     (a, b, c) => a + "a" + b + "a" + c,       // karan  — l'azione nuda
    agente:   (a, b, c) => a + "i" + b + "â" + c,       // kirân  — chi la compie
    esito:    (a, b, c) => a + "o" + b + "u" + c,       // korun  — ciò che ne resta
    astratto: (a, b, c) => a + "a" + b + c + "â",       // karnâ  — la cosa in sé
    qualita:  (a, b, c) => a + "e" + b + "i" + c,       // kerin  — l'attributo
    luogo:    (a, b, c) => "ma" + a + b + "a" + c,      // makran — dove avviene
    intenso:  (a, b, c) => a + "a" + b + b + "a" + c    // karran — colmo, sacro
  };

  /* ---------- 3. DESINENZE ---------- */
  const CASO = { ass: "", vol: "en", ar: "ar", loc: "ath", abl: "um", leg: "i" };
  const PLUR = "ol";
  const ASPETTO = { fatto: "", corso: "il", intento: "âs", rito: "uk" };
  const PERSONA = { 1: "mi", 2: "ka", 3: "sa", 4: "mir", 5: "kar", 6: "sar" };
  const TESTIMONE = { nessuna: "", occhi: "ne", tessitura: "she", riferito: "ro", avatar: "shi" };
  const REGISTRO = { consensuale: "", reale: "sa" };   // sa- : quello che è successo davvero
  // ciò che il Risveglio rende animato: prende î' invece di e', e -ên invece di -en
  const ANIMATI = new Set(["mago","risvegliato","avatar","anima","spirito","nodo","santuario",
    "paradosso","quintessenza","tessitura","maestro","custode","veggente","artefice","medico",
    "oratore","scriba","signore","padre","figlio","amico","nemico","persona","dormiente"]);
  const CONSENSO = { nessuno: "", coincidente: "va", volgare: "thak" };

  /* ---------- 4. PAROLE FISSE ---------- */
  const PRONOMI = { "io": "mi", "me": "mi", "mi": "mi", "tu": "ka", "te": "ka", "ti": "ka",
    "lui": "sa", "lei": "sa", "esso": "sa", "essa": "sa", "noi": "mir", "ci": "mir",
    "voi": "kar", "vi": "kar", "loro": "sar", "essi": "sar", "esse": "sar" };

  const FISSE = Object.assign({}, PRONOMI, {
    "lo": "sa", "la": "sa", "li": "sar", "gli": "sa", "le": "sar", "si": "sa", "ne": "sa",
    "mio": "@LEG mi", "mia": "@LEG mi", "miei": "@LEG mi", "mie": "@LEG mi",
    "tuo": "@LEG ka", "tua": "@LEG ka", "tuoi": "@LEG ka", "tue": "@LEG ka",
    "suo": "@LEG sa", "sua": "@LEG sa", "suoi": "@LEG sa", "sue": "@LEG sa",
    "nostro": "@LEG mir", "nostra": "@LEG mir", "nostri": "@LEG mir", "nostre": "@LEG mir",
    "vostro": "@LEG kar", "vostra": "@LEG kar", "vostri": "@LEG kar", "vostre": "@LEG kar",
    "questo": "han", "questa": "han", "questi": "han", "queste": "han",
    "quello": "tham", "quella": "tham", "quelli": "tham", "quelle": "tham",
    "qui": "@CORNICE hann", "qua": "@CORNICE hann", "lì": "@CORNICE thamm", "là": "@CORNICE thamm",
    "ora": "@CORNICE 'adnath", "adesso": "@CORNICE 'adnath",
    "sempre": "@CORNICE kullâdan", "mai": "@CORNICE lâdan",
    "oggi": "@CORNICE hanyam", "ieri": "@CORNICE yamzâr", "domani": "@CORNICE yamnâs",
    "stanotte": "@CORNICE hanlayth", "stasera": "@CORNICE hanlayth",
    "già": "@CORNICE kabar", "ancora": "@CORNICE 'ôd", "poi": "@CORNICE bathar",
    "prima": "@CORNICE kadam", "dopo": "@CORNICE bathar", "subito": "@CORNICE mahar",
    "chi": "man", "cosa": "mah", "dove": "@CORNICE 'ana", "quando": "@CORNICE mathay",
    "perché": "lamah", "come": "kayp", "quanto": "kamah", "quale": "'ayzu", "quali": "'ayzu",
    "e": "ya", "ed": "ya", "o": "'ô", "oppure": "'ô", "ma": "bal", "però": "bal",
    "se": "'in", "anche": "'ap", "solo": "bad", "soltanto": "bad", "quindi": "lakhen", "allora": "lakhen",
    "tutto": "kull", "tutti": "kull", "tutta": "kull", "tutte": "kull", "ogni": "kull",
    "no": "lâ", "sì": "hen", "niente": "lâmah", "nulla": "lâmah",
    "nessuno": "lâman", "qualcuno": "'ayman", "qualcosa": "'aymah",
    "molto": "rabbi", "molta": "rabbi", "molti": "rabbi", "molte": "rabbi",
    "poco": "za'ir", "pochi": "za'ir", "più": "yathar", "meno": "khasar", "troppo": "yathar",
    "contro": "kal", "senza": "balî", "insieme": "yahad", "tra": "bayn", "fra": "bayn",
    "sopra": "'al", "sotto": "tahath", "dentro": "tôkh", "fuori": "bar",
    "davanti": "kadam", "dietro": "bathar",
    "uno": "an", "una": "an", "due": "dul", "tre": "theran", "quattro": "karav",
    "cinque": "shemin", "sei": "hazul", "sette": "sabin", "otto": "thamun",
    "nove": "nesav", "dieci": "'ashan", "cento": "me'an", "mille": "'alhan"
  });

  /* ---------- 5. IL LESSICO RADICALE ---------- */
  const LESSICO_GREZZO = {
    "magia|magick|arte": "m-g-y n astratto",
    "operare|incantare|lanciare": "'-n-kh v",
    "mago|maga|incantatore|incantatrice": "m-g-y n agente",
    "incantesimo|effetto": "m-g-y n esito",
    "risveglio": "kh-n-r n astratto",
    "risvegliare|destare|svegliare": "kh-n-r v",
    "risvegliato|risvegliata|desta|sveglio": "kh-n-r n agente",
    "dormiente|comune|mortale": "z-r-m n agente",
    "dormire|assopirsi": "z-r-m v",
    "sonno": "z-r-m n astratto",
    "avatar|daimon|genio|scintilla": "sh-'-r n agente",
    "risuonare|vibrare|echeggiare": "sh-'-r v",
    "sfera|dominio": "sh-f-r n astratto",
    "abbracciare|dominare": "sh-f-r v",
    "areté|arete|statura|maestria": "'-r-th n astratto",
    "quintessenza|tass|essenza": "'-sh-n n astratto",
    "scorrere|fluire|colare": "b-l-r v",
    "paradosso": "n-z-kh n astratto",
    "rifiutare|respingere|negare": "n-z-kh v",
    "consenso": "kh-m-n n astratto",
    "concordare|acconsentire": "kh-m-n v",
    "velo|barriera": "s-m-l n astratto",
    "coprire|velare": "s-m-l v",
    "tessitura|trama|tessuto|realtà|mondo": "th-r-m n astratto",
    "tessere|intrecciare": "th-r-m v",
    "volgare|palese|sfacciato": "v-l-g a",
    "strappare|forzare|squarciare": "r-f-r v",
    "coincidente|coincidenza|discreto": "kh-n-v a",
    "combaciare|coincidere|accordarsi": "kh-n-v v",
    "nodo|nexus|crocevia": "n-kh-sh n astratto",
    "annodare|legare|vincolare": "n-kh-th v",
    "regno|reame|orizzonte|umbra": "r-g-n n astratto",
    "ombra|penombra": "'-m-v n astratto",
    "tradizione|scuola|casa|setta": "th-r-z n astratto",
    "tramandare|trasmettere": "th-r-z v",
    "paradigma|credo": "z-g-m n astratto",
    "pratica|via|metodo": "sh-m-th n astratto",
    "strumento|focus|attrezzo": "b-kh-sh n esito",
    "volontà": "v-l-n n astratto",
    "volere|desiderare|bramare": "v-l-n v",
    "saggezza|misura|equilibrio": "sh-f-n n astratto",
    "convinzione|convinzioni": "b-z-r n esito",
    "credere|affidarsi|confidare": "b-z-r v",
    "fede|fiducia": "b-z-r n astratto",
    "nome": "v-th-r n esito",
    "dire|parlare|pronunciare|nominare": "v-th-r v",
    "lingua|parlata|idioma": "v-th-r n astratto",
    "oratore": "v-th-r n agente",
    "rito|rituale|cerimonia": "sh-kh-r n astratto",
    "consacrare|santificare|celebrare": "sh-kh-r v",
    "santuario|cappella|rifugio|chantry": "sh-kh-r n luogo",
    "maestro|mentore|maestra": "m-g-sh n agente",
    "insegnare|istruire|addestrare": "m-g-sh v",
    "imparare|apprendere|studiare": "z-sh-kh v atto",
    "orrore|nefando|abominio": "n-b-sh n astratto",
    "corrompere|guastare|marcire": "n-b-sh v",
    "frattura|crepa|breccia": "b-r-kh n astratto",
    "vedere|guardare|osservare|scorgere": "v-z-r v",
    "vista|sguardo|visione": "v-z-r n astratto",
    "veggente|testimone": "v-z-r n agente",
    "sapere|conoscere|riconoscere": "n-sh-kh v",
    "sapienza|conoscenza": "n-sh-kh n astratto",
    "fare|plasmare|creare|costruire|forgiare": "b-kh-r v",
    "forma|figura|foggia": "b-kh-r n astratto",
    "opera|manufatto|creazione": "b-kh-r n esito",
    "artefice|creatore|fabbro": "b-kh-r n agente",
    "fucina|officina|laboratorio": "b-kh-r n luogo",
    "andare|muoversi|partire|recarsi|camminare": "'-m-v v",
    "venire|arrivare|giungere|tornare": "v-n-r v",
    "prendere|afferrare|cogliere|rubare": "kh-f-r v",
    "dare|donare|offrire|porgere": "z-n-r v",
    "dono|offerta|regalo": "z-n-r n esito",
    "aprire|schiudere|dischiudere": "'-f-r v",
    "porta|apertura|varco|soglia": "'-f-r n esito",
    "chiudere|serrare|sigillare": "kh-l-z v",
    "sigillo|serratura|chiusura": "kh-l-z n esito",
    "rompere|spezzare|infrangere|distruggere": "r-m-f v",
    "rovina|macerie": "r-m-f n esito",
    "morire|perire|spegnersi": "m-r-sh v",
    "morte|fine": "m-r-sh n astratto",
    "morto|cadavere|defunto": "m-r-sh n esito",
    "vivere|esistere": "v-g-r v",
    "vita|esistenza": "v-g-r n astratto",
    "vivo|viva|vivente": "v-g-r a",
    "amare|adorare": "'-m-r v",
    "amore|affetto": "'-m-r n astratto",
    "temere|paventare": "th-m-r v",
    "paura|timore|terrore": "th-m-r n astratto",
    "ricordare|rammentare": "r-kh-r v",
    "memoria|ricordo": "r-kh-r n astratto",
    "udire|sentire|ascoltare|origliare": "'-sh-kh v",
    "orecchio|udito": "'-sh-kh n esito",
    "toccare|sfiorare": "th-n-g v",
    "pensare|riflettere|meditare": "kh-g-th v",
    "pensiero|mente|ragione": "kh-g-th n astratto",
    "scrivere|annotare|vergare": "l-th-r v",
    "scrittura|scritto|testo|libro|manuale|pagina": "l-th-r n esito",
    "scriba|scrivano|cronista": "l-th-r n agente",
    "storia|racconto|vicenda|cronaca": "'-sh-th n astratto",
    "leggere|decifrare": "l-g-r v",
    "cercare|frugare|indagare|investigare": "kh-v-r v",
    "trovare|scoprire|rinvenire": "'-n-v v",
    "perdere|smarrire": "f-r-z v",
    "tenere|trattenere|conservare|custodire|avere|possedere": "'-v-r v",
    "custode|guardiano|sentinella": "kh-sh-th n agente",
    "lasciare|abbandonare|liberare": "l-n-kh v",
    "combattere|lottare|attaccare": "f-g-n v",
    "battaglia|guerra|scontro|conflitto": "f-g-n n astratto",
    "fuggire|scappare|ritirarsi": "b-g-r v",
    "attendere|aspettare|pazientare": "'-kh-sh v",
    "iniziare|cominciare|avviare": "'-n-th v",
    "principio|inizio|origine": "'-n-th n astratto",
    "finire|compiere|concludere|terminare": "b-n-r v",
    "potere|riuscire": "f-th-r v",
    "potenza|forza": "f-th-r n astratto",
    "dovere": "z-v-r v",
    "chiamare|evocare|invocare|convocare": "v-kh-r v",
    "richiamo|chiamata|invocazione": "v-kh-r n astratto",
    "proteggere|difendere|riparare": "th-g-r v",
    "scudo|difesa|protezione": "th-g-r n esito",
    "ferire|colpire|tagliare": "l-z-r v",
    "ferita|taglio|piaga": "l-z-r n esito",
    "guarire|curare|sanare|risanare": "sh-n-r v",
    "medico|guaritore|curatore": "sh-n-r n agente",
    "nascondere|celare|occultare": "kh-l-r v",
    "rivelare|mostrare|svelare|manifestare": "r-v-l v",
    "specchio|riflesso": "r-v-l n luogo",
    "bruciare|ardere|incendiare": "b-l-g v",
    "cadere|precipitare|crollare": "kh-z-r v",
    "salire|sorgere|innalzarsi|elevarsi": "sh-r-g v",
    "mangiare|divorare|cibarsi": "m-n-z v",
    "bere|sorseggiare": "sh-r-v v",
    "mentire|ingannare|tradire": "m-n-th v",
    "menzogna|inganno|tradimento|bugia": "m-n-th n astratto",
    "giurare|promettere|impegnarsi": "f-kh-th v",
    "patto|giuramento|promessa|voto": "f-kh-th n astratto",
    "pagare|saldare|rendere": "sh-l-v v",
    "prezzo|costo|debito": "sh-l-v n astratto",
    "pace|tregua|calma": "sh-l-v n esito",
    "contare|misurare|pesare": "n-m-r v",
    "numero|conto": "n-m-r n astratto",
    "sperare|attendersi": "'-f-th v",
    "speranza|attesa": "'-f-th n astratto",
    "odiare|detestare|disprezzare": "'-z-sh v",
    "odio|disprezzo": "'-z-sh n astratto",
    "piangere|lacrimare": "l-kh-r v",
    "ridere|sorridere": "r-z-r v",
    "gridare|urlare|strillare": "kh-l-m v",
    "tacere|zittire|ammutolire": "th-kh-r v",
    "silenzio|quiete|pausa": "th-kh-r n astratto",
    "sognare": "sh-m-n v",
    "sogno|visione": "sh-m-n n astratto",
    "entrare|penetrare": "'-n-g v",
    "uscire|emergere": "'-g-r v",
    "mettere|porre|posare": "z-f-n v",
    "restare|rimanere|durare": "m-n-r v",
    "sedere|sedersi|accomodarsi|posarsi": "sh-z-r v",
    "seguire|inseguire|pedinare": "'-n-sh v",
    "fermare|arrestare|bloccare": "'-r-sh v",
    "aiutare|soccorrere|sostenere": "'-z-v v",
    "domandare|chiedere|interrogare": "f-sh-kh v",
    "rispondere|replicare": "r-sh-f v",
    "comandare|ordinare|imporre": "'-m-f v",
    "obbedire|ubbidire|servire": "'-v-z v",
    "pregare|supplicare|implorare": "f-r-kh v",
    "benedire|lodare": "v-n-z v",
    "maledire|imprecare": "m-l-z v",
    "persona|uomo|donna|individuo|gente|umano|umana": "'-m-n n agente",
    "corpo|carne": "kh-r-f n astratto",
    "anima|spirito|animo": "'-n-m n astratto",
    "abitare|risiedere": "z-m-sh v",
    "casa|dimora|abitazione|appartamento|stanza": "z-m-sh n esito",
    "città|metropoli|centro|quartiere": "kh-v-th n astratto",
    "strada|sentiero|percorso|corridoio": "'-th-n n esito",
    "acqua|pioggia|fiume|nebbia": "'-kh-v n astratto",
    "fuoco|fiamma|incendio": "'-g-n n astratto",
    "terra|suolo|polvere|cenere": "th-l-sh n astratto",
    "vento|aria|soffio|respiro": "v-n-th n astratto",
    "respirare|soffiare": "b-l-th v",
    "sangue": "sh-n-g n astratto",
    "cuore|petto": "kh-r-z n astratto",
    "mano|palmo|dito|dita": "m-n-sh n astratto",
    "occhio|pupilla|sguardo fisso": "'-kh-l n astratto",
    "voce|suono|grido|rumore": "v-kh-sh n astratto",
    "luce|chiarore|bagliore|lume": "l-kh-sh n astratto",
    "buio|oscurità|tenebra|tenebre": "th-n-v n astratto",
    "giorno|giornata|alba|mattina": "z-r-n n astratto",
    "notte|nottata|sera|crepuscolo": "n-kh-th n astratto",
    "tempo|epoca|momento|istante|attimo|anno|ora del giorno": "th-m-f n astratto",
    "pietra|sasso|roccia|muro|mattone": "l-f-sh n astratto",
    "ferro|metallo|acciaio|lama|coltello|spada|arma": "m-th-l n astratto",
    "denaro|oro|moneta|soldi|ricchezza": "'-r-m n astratto",
    "cielo|volta": "'-r-n n astratto",
    "mare|abisso|profondità": "f-l-g n astratto",
    "albero|bosco|legno|foresta|giardino": "'-r-v n astratto",
    "animale|bestia|belva|cane|gatto": "v-sh-th n astratto",
    "figlio|figlia|bambino|bambina|ragazzo|ragazza|erede": "b-l-sh n agente",
    "padre|madre|genitore": "g-n-th n agente",
    "amico|amica|compagno|alleato|fratello|sorella": "'-m-kh n agente",
    "nemico|avversario|rivale|traditore": "'-sh-th n agente",
    "signore|signora|padrone|capo|primo": "z-m-n n agente",
    "servo|servitore|schiavo|strumento umano": "b-m-l n agente",
    "dolore|sofferenza|male": "z-l-r n astratto",
    "ira|rabbia|furore|collera": "r-v-sh n astratto",
    "gioia|felicità|allegria": "g-z-m n astratto",
    "colpa|peccato|errore|sbaglio|macchia": "kh-l-f n astratto",
    "legge|regola|norma|ordine": "l-g-sh n astratto",
    "segreto|mistero|arcano": "'-r-kh n astratto",
    "presagio|augurio|segno|profezia": "f-r-th n astratto",
    "grande|grosso|enorme|vasto": "m-g-n a",
    "piccolo|minuto|breve": "f-r-v a",
    "buono|giusto|retto|bene": "v-n-sh a",
    "cattivo|malvagio|ingiusto|marcio|male morale": "m-l-sh a",
    "nuovo|recente|fresco": "n-v-sh a",
    "vecchio|antico|remoto": "v-th-sh a",
    "forte|robusto|saldo": "b-r-th a",
    "debole|fragile|sottile|tenue": "th-n-sh a",
    "alto|elevato|sublime": "'-l-th a",
    "basso|infimo|profondo": "f-r-b a",
    "vero|autentico|reale": "v-r-sh a",
    "verità|autenticità": "v-r-sh n astratto",
    "libertà": "l-v-r n astratto",
    "bellezza": "f-l-kh n astratto",
    "follia|pazzia|delirio": "b-r-sh n astratto",
    "destino|sorte|fato": "b-th-m n astratto",
    "falso|finto|apparente": "b-kh-th a",
    "vicino|prossimo|accanto": "f-r-f a",
    "lontano|distante": "r-m-th a",
    "puro|limpido|pulito|netto": "f-r-sh a",
    "impuro|sporco|contaminato": "sh-r-z a",
    "libero|sciolto|slegato": "l-v-r a",
    "chiuso|prigioniero|legato": "kh-l-sh a",
    "pieno|colmo|saturo": "f-l-n a",
    "vuoto|deserto|spoglio": "v-kh-n a",
    "attento|vigile": "v-g-l a",
    "stanco|sfinito|esausto": "z-b-sh a",
    "bello|splendido|magnifico": "f-l-kh a",
    "brutto|orrendo|deforme": "th-r-f a",
    "caldo|ardente|rovente": "b-r-v a",
    "freddo|gelido|glaciale": "g-l-z a",
    "silenzioso|muto|quieto": "th-kh-th a",
    "veloce|rapido|svelto": "r-f-z a",
    "lento|tardo|pigro": "l-n-th a",
    "difficile|arduo|duro": "z-r-sh a",
    "facile|agevole|leggero": "l-v-sh a",
    "pericoloso|rischioso|letale": "'-n-b a",
    "sicuro|salvo|protetto": "b-r-m a",
    "strano|inquietante|sbagliato": "m-r-sh a",
    "sacro|santo|consacrato": "sh-kh-r a",
    "segreto nascosto|celato|occulto": "kh-l-r a"
  };

  /* ---------- 6. LA PRIMA MUTAZIONE ---------- */
  const MUTAZIONE = { "p": "f", "t": "th", "c": "kh", "k": "kh", "b": "v", "d": "z",
    "g": "g", "f": "b", "s": "sh", "v": "v", "w": "v", "m": "m", "n": "n",
    "l": "l", "r": "r", "h": "'", "j": "y", "y": "y", "z": "z", "x": "kh",
    "C": "kh", "G": "g", "N": "n", "L": "y", "S": "sh", "Q": "khv" };
  const RIEMPITIVI = ["n", "r", "th", "l", "sh", "m", "k", "y"];

  function scheletroItaliano(parola) {
    let p = parola.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "");
    p = p.replace(/sci|sce/g, "S").replace(/sc(?=[ie])/g, "S")
         .replace(/gn/g, "N").replace(/gli/g, "L").replace(/gl(?=i)/g, "L")
         .replace(/ci|ce/g, "C").replace(/c(?=[ie])/g, "C")
         .replace(/gi|ge/g, "G").replace(/g(?=[ie])/g, "G")
         .replace(/ch/g, "k").replace(/gh/g, "g").replace(/qu/g, "Q");
    const out = [];
    if ("aeiou".includes(p[0])) out.push("'");
    for (const ch of p) {
      if ("aeiou".includes(ch)) continue;
      const m = MUTAZIONE[ch];
      if (m) for (const c of (m.match(/kh|sh|th|./g) || [])) out.push(c);
    }
    return out.filter((c, i) => c !== out[i - 1]);
  }

  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return Math.abs(h);
  }

  function radiceGenerata(lemma) {
    let sk = scheletroItaliano(lemma);
    const h = hash(lemma);
    if (sk.length === 0) sk = [RIEMPITIVI[h % 8], RIEMPITIVI[(h >> 3) % 8]];
    while (sk.length < 3) sk.push(RIEMPITIVI[(h >> (sk.length * 3)) % RIEMPITIVI.length]);
    if (sk.length > 3) sk = [sk[0], sk[1], sk[sk.length - 1]];
    if (sk[0] === sk[1]) sk[1] = RIEMPITIVI[h % RIEMPITIVI.length];
    if (sk[1] === sk[2]) sk[2] = RIEMPITIVI[(h >> 5) % RIEMPITIVI.length];
    return sk;
  }

  /* ---------- 7. LESSICO COMPILATO ---------- */
  const LESSICO = {};
  for (const chiave in LESSICO_GREZZO) {
    const parti = LESSICO_GREZZO[chiave].trim().split(/\s+/);
    const voce = { r: parti[0].split("-"), pos: parti[1],
      modo: parti[2] || (parti[1] === "v" ? "atto" : parti[1] === "a" ? "qualita" : "astratto") };
    for (const it of chiave.split("|")) if (!LESSICO[it.trim()]) LESSICO[it.trim()] = voce;
  }

  function componi(radicali, modo) {
    const [a, b, c] = radicali;
    return pulisci(respira((MODI[modo] || MODI.atto)(a, b, c)));
  }

  function voce(lemma) {
    const l = lemma.toLowerCase().trim();
    if (LESSICO[l]) return Object.assign({}, LESSICO[l], { nota: "lessico" });
    return { r: radiceGenerata(l), pos: null, modo: null, nota: "mutazione" };
  }

  /* ---------- 8. IRREGOLARI ITALIANI ---------- */
  const IRREGOLARI = {
    "sono": null, "sei": null, "è": null, "siamo": null, "siete": null,
    "vado": ["andare", 1, "corso"], "vai": ["andare", 2, "corso"], "va": ["andare", 3, "corso"],
    "andiamo": ["andare", 4, "corso"], "andate": ["andare", 5, "corso"], "vanno": ["andare", 6, "corso"],
    "andato": ["andare", 3, "fatto"], "andata": ["andare", 3, "fatto"], "andati": ["andare", 6, "fatto"],
    "faccio": ["fare", 1, "corso"], "fai": ["fare", 2, "corso"], "fa": ["fare", 3, "corso"],
    "facciamo": ["fare", 4, "corso"], "fate": ["fare", 5, "corso"], "fanno": ["fare", 6, "corso"],
    "fatto": ["fare", 3, "fatto"], "fatta": ["fare", 3, "fatto"], "fatti": ["fare", 6, "fatto"],
    "dico": ["dire", 1, "corso"], "dici": ["dire", 2, "corso"], "dice": ["dire", 3, "corso"],
    "diciamo": ["dire", 4, "corso"], "dite": ["dire", 5, "corso"], "dicono": ["dire", 6, "corso"],
    "detto": ["dire", 3, "fatto"], "detta": ["dire", 3, "fatto"],
    "so": ["sapere", 1, "corso"], "sai": ["sapere", 2, "corso"], "sa": ["sapere", 3, "corso"],
    "sappiamo": ["sapere", 4, "corso"], "sapete": ["sapere", 5, "corso"], "sanno": ["sapere", 6, "corso"],
    "saputo": ["sapere", 3, "fatto"],
    "vengo": ["venire", 1, "corso"], "vieni": ["venire", 2, "corso"], "viene": ["venire", 3, "corso"],
    "veniamo": ["venire", 4, "corso"], "venite": ["venire", 5, "corso"], "vengono": ["venire", 6, "corso"],
    "venuto": ["venire", 3, "fatto"], "venuta": ["venire", 3, "fatto"],
    "do": ["dare", 1, "corso"], "dà": ["dare", 3, "corso"], "diamo": ["dare", 4, "corso"], "danno": ["dare", 6, "corso"],
    "dato": ["dare", 3, "fatto"], "data": ["dare", 3, "fatto"],
    "rotto": ["rompere", 3, "fatto"], "rotta": ["rompere", 3, "fatto"], "rotti": ["rompere", 6, "fatto"],
    "visto": ["vedere", 3, "fatto"], "vista": ["vedere", 3, "fatto"], "visti": ["vedere", 6, "fatto"],
    "preso": ["prendere", 3, "fatto"], "presa": ["prendere", 3, "fatto"],
    "scritto": ["scrivere", 3, "fatto"], "letto": ["leggere", 3, "fatto"],
    "aperto": ["aprire", 3, "fatto"], "aperta": ["aprire", 3, "fatto"],
    "chiuso": ["chiudere", 3, "fatto"], "chiusa": ["chiudere", 3, "fatto"],
    "morto": ["morire", 3, "fatto"], "morta": ["morire", 3, "fatto"],
    "vissuto": ["vivere", 3, "fatto"], "perso": ["perdere", 3, "fatto"], "messo": ["mettere", 3, "fatto"],
    "tenuto": ["tenere", 3, "fatto"], "spento": ["spegnere", 3, "fatto"], "acceso": ["accendere", 3, "fatto"],
    "siedo": ["sedere", 1, "corso"], "siedi": ["sedere", 2, "corso"], "siede": ["sedere", 3, "corso"],
    "siediti": ["sedere", 2, "corso"], "sedetevi": ["sedere", 5, "corso"], "seduto": ["sedere", 3, "fatto"],
    "esco": ["uscire", 1, "corso"], "esci": ["uscire", 2, "corso"], "esce": ["uscire", 3, "corso"],
    "salgo": ["salire", 1, "corso"], "sale": ["salire", 3, "corso"],
    "tengo": ["tenere", 1, "corso"], "tiene": ["tenere", 3, "corso"],
    "rimango": ["restare", 1, "corso"], "rimane": ["restare", 3, "corso"],
    "muoio": ["morire", 1, "corso"], "muore": ["morire", 3, "corso"], "muoiono": ["morire", 6, "corso"],
    "apro": ["aprire", 1, "corso"], "apri": ["aprire", 2, "corso"], "apre": ["aprire", 3, "corso"],
    "chiedo": ["domandare", 1, "corso"], "chiede": ["domandare", 3, "corso"],
    "prendo": ["prendere", 1, "corso"], "prende": ["prendere", 3, "corso"],
    "scelgo": ["prendere", 1, "corso"], "sceglie": ["prendere", 3, "corso"]
  };
  const MODALI = { "posso": [1, "f-th-r"], "puoi": [2, "f-th-r"], "può": [3, "f-th-r"], "puo": [3, "f-th-r"],
    "possiamo": [4, "f-th-r"], "potete": [5, "f-th-r"], "possono": [6, "f-th-r"],
    "devo": [1, "z-v-r"], "devi": [2, "z-v-r"], "deve": [3, "z-v-r"], "dobbiamo": [4, "z-v-r"],
    "dovete": [5, "z-v-r"], "devono": [6, "z-v-r"],
    "voglio": [1, "v-l-n"], "vuoi": [2, "v-l-n"], "vuole": [3, "v-l-n"], "vogliamo": [4, "v-l-n"],
    "volete": [5, "v-l-n"], "vogliono": [6, "v-l-n"] };

  /* ---------- 9. ANALISI DELL'ITALIANO ---------- */
  const ARTICOLI = ["il", "lo", "la", "i", "gli", "le", "un", "uno", "una", "l"];
  const PLURALI = ["i", "gli", "le", "dei", "degli", "delle", "ai", "agli", "alle",
                   "dai", "dagli", "dalle", "nei", "negli", "nelle", "sui", "sugli", "sulle", "coi"];
  const PREP_CASO = {
    "di": "leg", "d": "leg", "del": "leg", "dello": "leg", "della": "leg", "dei": "leg",
    "degli": "leg", "delle": "leg", "dell": "leg", "all": "ar", "dall": "abl",
    "nell": "loc", "sull": "loc", "coll": "abl", "quell": "leg",
    "a": "ar", "ad": "ar", "al": "ar", "allo": "ar", "alla": "ar", "ai": "ar", "agli": "ar",
    "alle": "ar", "per": "ar", "verso": "ar",
    "da": "abl", "dal": "abl", "dallo": "abl", "dalla": "abl", "dai": "abl", "dagli": "abl",
    "dalle": "abl", "con": "abl", "col": "abl", "coi": "abl", "mediante": "abl", "tramite": "abl",
    "in": "loc", "nel": "loc", "nello": "loc", "nella": "loc", "nei": "loc", "negli": "loc",
    "nelle": "loc", "su": "loc", "sul": "loc", "sullo": "loc", "sulla": "loc", "sui": "loc",
    "sugli": "loc", "sulle": "loc", "presso": "loc"
  };
  const DEFINITI = ["il", "lo", "la", "i", "gli", "le", "l", "del", "dello", "della", "dei",
    "degli", "delle", "dell", "al", "allo", "alla", "ai", "agli", "alle", "dal", "dallo",
    "dalla", "dai", "dagli", "dalle", "nel", "nello", "nella", "nei", "negli", "nelle",
    "sul", "sullo", "sulla", "sui", "sugli", "sulle", "col", "coi",
    "all", "dall", "nell", "sull", "coll"];
  const PERSONA_AUX = { "ho": 1, "hai": 2, "ha": 3, "abbiamo": 4, "avete": 5, "hanno": 6,
    "avevo": 1, "avevi": 2, "aveva": 3, "avevamo": 4, "avevate": 5, "avevano": 6,
    "avrò": 1, "avrai": 2, "avrà": 3, "avremo": 4, "avrete": 5, "avranno": 6,
    "sono": 1, "sei": 2, "è": 3, "siamo": 4, "siete": 5, "ero": 1, "eri": 2, "era": 3 };
  const AUSILIARI = ["ho", "hai", "ha", "abbiamo", "avete", "hanno", "avevo", "avevi", "aveva",
    "avevamo", "avevate", "avevano", "avrò", "avrai", "avrà", "avremo", "avrete", "avranno"];
  const COPULE = ["sono", "sei", "è", "e'", "siamo", "siete", "ero", "eri", "era", "eravamo",
    "eravate", "erano", "sarò", "sarai", "sarà", "saremo", "sarete", "saranno", "essere",
    "stare", "sto", "stai", "sta", "stiamo", "stanno",
    "stato", "stata", "stati", "essendo", "stando", "venuto ad essere"];

  const FINALI_VERBALI = /(are|ere|ire|rre|ando|endo|iamo|ate|ete|ite|ano|ono|avo|avi|ava|avamo|avate|avano|evo|eva|evano|ivo|iva|ivano|erò|irò|erai|irai|erà|irà|eremo|iremo|erete|irete|eranno|iranno|erei|irei|ebbe|assi|esse|isse)$/;

  function analizzaVerbo(w) {
    const t = w.toLowerCase();
    if (MODALI[t]) return { modale: MODALI[t], persona: MODALI[t][0], aspetto: "corso", forma: t };
    if (IRREGOLARI[t]) {
      const [lem, per, asp] = IRREGOLARI[t];
      return { lemma: lem, persona: per, aspetto: asp, forma: t, irregolare: true };
    }
    const R = [
      [/^(.{2,})(iamo)$/, 4, "corso"], [/^(.{2,})(ate|ete|ite)$/, 5, "corso"],
      [/^(.{2,})(avamo|evamo|ivamo)$/, 4, "rito"], [/^(.{2,})(avate|evate|ivate)$/, 5, "rito"],
      [/^(.{2,})(avano|evano|ivano)$/, 6, "rito"],
      [/^(.{2,})(avo|evo|ivo)$/, 1, "rito"], [/^(.{2,})(avi|evi|ivi)$/, 2, "rito"],
      [/^(.{2,})(ava|eva|iva)$/, 3, "rito"],
      [/^(.{2,})(eremo|iremo|remo)$/, 4, "intento"], [/^(.{2,})(erete|irete|rete)$/, 5, "intento"],
      [/^(.{2,})(eranno|iranno|ranno)$/, 6, "intento"],
      [/^(.{2,})(erò|irò|rò)$/, 1, "intento"], [/^(.{2,})(erai|irai|rai)$/, 2, "intento"],
      [/^(.{2,})(erà|irà|rà)$/, 3, "intento"],
      [/^(.{2,})(erei|irei|rei)$/, 1, "intento"], [/^(.{2,})(erebbe|irebbe|ebbe)$/, 3, "intento"],
      [/^(.{2,})(ano|ono)$/, 6, "corso"],
      [/^(.{2,})(arsi|ersi|irsi|rsi)$/, 0, "infinito"],
      [/^(.{2,})(are|ere|ire|rre)$/, 0, "infinito"],
      [/^(.{2,})(ando|endo)$/, 0, "infinito"],
      [/^(.{2,})(ato|uto|ito|ata|uta|ita|ati|uti|iti)$/, 3, "fatto"],
      [/^(.{2,})(o)$/, 1, "corso"], [/^(.{2,})(i)$/, 2, "corso"], [/^(.{2,})(a|e)$/, 3, "corso"]
    ];
    const cand = [];
    for (const [re, pers, asp] of R) {
      const m = t.match(re);
      if (m) cand.push({ tema: m[1], persona: pers, aspetto: asp, forma: t });
    }
    if (!cand.length) return null;
    for (const c of cand) if (cercaVerbo(c.tema, true)) return c;   // lettura confermata alla lettera
    for (const c of cand) if (cercaVerbo(c.tema, false)) return c;  // lettura confermata alla larga
    return cand[0];
  }

  // «cercher-», «cerch-», «paghi-»: il tema italiano va ripulito prima di cercarlo
  function temiPossibili(tema) {
    const base = [];
    const agg = t => { if (t.length >= 2 && !base.includes(t)) base.push(t); };
    for (let k = 0; k <= 3; k++) {
      const t = tema.slice(0, tema.length - k);
      if (t.length < 2) break;
      agg(t);
      if (/ch$/.test(t)) agg(t.slice(0, -2) + "c");
      if (/gh$/.test(t)) agg(t.slice(0, -2) + "g");
      if (/i$/.test(t)) agg(t.slice(0, -1));
    }
    return base;
  }
  function cercaVerbo(tema, stretto) {
    let basi;
    if (stretto) {
      basi = [tema];
      if (/ch$/.test(tema)) basi.push(tema.slice(0, -2) + "c");
      if (/gh$/.test(tema)) basi.push(tema.slice(0, -2) + "g");
    } else basi = temiPossibili(tema);
    for (const b of basi)
      for (const suf of ["are", "ere", "ire", "iare", "arsi", "ersi", "irsi", ""]) {
        const c = b + suf;
        if (LESSICO[c] && LESSICO[c].pos === "v") return c;
      }
    return null;
  }

  function lemmaVerbale(av) {
    if (av.lemma) return av.lemma;
    if (LESSICO[av.forma] && LESSICO[av.forma].pos === "v") return av.forma;
    return cercaVerbo(av.tema) || (av.tema + "are");
  }

  const CLITICI = { "mi": "mi", "ti": "ka", "ci": "mir", "vi": "kar", "lo": "sa", "la": "sa",
    "li": "sar", "le": "sar", "ne": "sa", "gli": "sa", "si": "sa" };
  const CONTRATTI = { "dammi": "dare", "dimmi": "dire", "fammi": "fare", "dacci": "dare",
    "dillo": "dire", "fallo": "fare", "dagli": "dare", "vacci": "andare", "stammi": "restare" };

  // «guardami», «dammi»: il verbo si stacca dal pronome appiccicato
  function staccaClitico(wl) {
    if (CONTRATTI[wl]) {
      const m = wl.match(/(mi|ti|ci|vi|lo|la|li|le|ne|gli)$/);
      return { verbo: CONTRATTI[wl], clitico: m ? CLITICI[m[1]] : null, imperativo: true };
    }
    const m = wl.match(/^(.{3,}?)(mi|ti|ci|vi|lo|la|li|le|ne|gli)$/);
    if (!m) return null;
    let base = m[1];
    if (/(.)\1$/.test(base)) base = base.slice(0, -1);
    const v = cercaVerbo(base);
    if (!v) return null;
    return { verbo: v, clitico: CLITICI[m[2]], imperativo: true };
  }

  function lemmaNominale(w) {
    const t = w.toLowerCase();
    if (LESSICO[t]) return t;
    const prove = [];
    if (/i$/.test(t)) prove.push(t.slice(0, -1) + "o", t.slice(0, -1) + "e", t.slice(0, -1) + "a");
    if (/e$/.test(t)) prove.push(t.slice(0, -1) + "a", t.slice(0, -1) + "o");
    if (/a$/.test(t)) prove.push(t.slice(0, -1) + "o", t.slice(0, -1) + "e");
    if (/chi$/.test(t)) prove.push(t.slice(0, -1) + "io", t.slice(0, -3) + "co", t.slice(0, -3) + "ca");
    if (/ghi$/.test(t)) prove.push(t.slice(0, -3) + "go", t.slice(0, -3) + "ga");
    if (/che$/.test(t)) prove.push(t.slice(0, -3) + "ca");
    if (/i$/.test(t)) prove.push(t.slice(0, -1) + "io");
    for (const p of prove) if (LESSICO[p]) return p;
    return t;
  }

  /* ---------- 10. IL TRADUTTORE ---------- */

  /* Gli indizi. Se l'italiano dichiara già come fai a saperlo, il Vathrâ lo
     raccoglie e lo sposta dove gli spetta: in coda alla frase, in una sillaba. */
  const INDIZI = [
    [/^\s*(?:e\s+)?(?:io\s+)?(?:l['\u2019]\s*)?(?:ho|abbiamo)\s+visto\s+(?:che|come)\s+/i, "occhi"],
    [/^\s*con\s+questi\s+occhi\s+(?:ho|abbiamo)\s+visto\s+(?:che|come)\s+/i, "occhi"],
    [/^\s*(?:mi\s+)?(?:hanno\s+detto|dicono|si\s+dice|raccontano|gira\s+voce)\s+che\s+/i, "riferito"],
    [/^\s*(?:ho|abbiamo)\s+sentito\s+dire\s+che\s+/i, "riferito"],
    [/^\s*(?:sento|ho\s+sentito|percepisco|leggo)\s+nella\s+(?:tessitura|trama)\s+che\s+/i, "tessitura"],
    [/^\s*(?:me\s+)?l['\u2019]\s*ha\s+detto\s+(?:il\s+mio\s+)?avatar\s*[,:]?\s*/i, "avatar"],
    [/^\s*il\s+mio\s+avatar\s+(?:mi\s+)?(?:ha\s+detto|dice)\s+che\s+/i, "avatar"]
  ];

  function leggiIndizi(frase) {
    for (const [re, t] of INDIZI) {
      if (re.test(frase)) {
        let f = frase.replace(re, "");
        f = f.charAt(0).toUpperCase() + f.slice(1);
        return { frase: f, testimone: t, trovato: true };
      }
    }
    return { frase: frase, testimone: "nessuna", trovato: false };
  }

  /* Le formule. Certe frasi si dicono da secoli sempre uguali e non si
     ricostruiscono ogni volta: si citano. */
  const FORMULE = {
    "che il tuo risveglio sia puro": "ferish khanrâ i ka",
    "che il tuo risveglio sia puro.": "ferish khanrâ i ka.",
    "che il velo ti sia leggero": "levish samlâ i ka",
    "che il velo ti sia leggero.": "levish samlâ i ka.",
    "che il paradosso non ti trovi": "û navan î'nazkhâên ka",
    "che il paradosso non ti trovi.": "û navan î'nazkhâên ka."
  };

  function traduci(testo, opzioni) {
    const chiave = String(testo).trim().toLowerCase();
    if (FORMULE[chiave]) {
      const r = FORMULE[chiave];
      return { romanizzazione: r, glifi: perIlFont(r), glossa: "formula", frasi: [],
               formula: true };
    }
    const o = Object.assign({ testimone: "auto", consenso: "nessuno",
      determinatezza: true, nomiPropri: "lascia", modo: "auto",
      registro: "consensuale", risvegliato: "auto" }, opzioni || {});
    const frasi = String(testo).split(/(?<=[.!?;:])\s+|\n+/).filter(s => s.trim());
    const risultati = frasi.map(f => {
      if (o.testimone !== "auto") return traduciFrase(f, o);
      const ind = leggiIndizi(f);
      return traduciFrase(ind.frase, Object.assign({}, o, { testimone: ind.testimone }));
    });
    return {
      romanizzazione: risultati.map(r => r.romanizzazione).join(" "),
      glifi: risultati.map(r => r.glifi).join("  "),
      glossa: risultati.map(r => r.glossa).join("  ‖  "),
      frasi: risultati
    };
  }

  const CONGIUNZIONI = ["ya", "'ô", "bal", "lakhen"];
  const INTERROGATIVI = ["man", "mah", "lâmah", "lâman", "'aymah", "'ayman", "kull"];

  function traduciFrase(frase, o) {
    const domanda = /\?/.test(frase);
    const esclama = /!/.test(frase);
    const grezzo = frase.trim().replace(/,/g, " @ ").replace(/[.;:!?«»"“”]/g, " ")
      .replace(/([a-zA-Zàèéìòù])'/g, "$1' ").trim();
    const parole = grezzo.split(/\s+/).filter(Boolean);

    /* ---- passata 1: che cos'è ogni parola ---- */
    const items = [];
    let negato = false, casoPendente = null, pluralePendente = false;
    let determinato = false, possPendente = null, personaAux = null, copulaAttesa = false;

    for (let i = 0; i < parole.length; i++) {
      const w = parole[i];
      const wl = w.toLowerCase().replace(/'$/, "").replace(/[«»"]/g, "");
      if (!wl) continue;

      if (wl === "@") { items.push({ t: "fissa", w: "", it: "|", cornice: false, taglio: true }); continue; }
      if (wl === "non") { negato = true; continue; }
      if (wl === "si" && parole.length > 1) continue;
      if (COPULE.includes(wl)) { items.push({ t: "copula" }); copulaAttesa = true; continue; }
      if (AUSILIARI.includes(wl)) {
        const dopo = (parole[i + 1] || "").toLowerCase();
        const reggeParticipio = /(ato|uto|ito|ata|uta|ita|ati|uti|iti)$/.test(dopo) || !!IRREGOLARI[dopo];
        if (reggeParticipio) { personaAux = PERSONA_AUX[wl] || null; continue; }
        items.push({ t: "verbo", it: wl, negato,
          av: { lemma: "tenere", persona: PERSONA_AUX[wl] || 3, aspetto: "corso", forma: wl, irregolare: true } });
        negato = false; continue;
      }

      if (PREP_CASO[wl] !== undefined) {
        casoPendente = PREP_CASO[wl];
        if (PLURALI.includes(wl)) pluralePendente = true;
        if (DEFINITI.includes(wl)) determinato = true;
        continue;
      }
      if (ARTICOLI.includes(wl)) {
        determinato = DEFINITI.includes(wl);
        if (PLURALI.includes(wl)) pluralePendente = true;
        continue;
      }
      if (FISSE[wl] !== undefined) {
        let v = FISSE[wl], cornice = false;
        if (v.startsWith("@CORNICE ")) { cornice = true; v = v.slice(9); }
        if (v.startsWith("@LEG ")) { possPendente = v.slice(5); continue; }
        items.push({ t: "fissa", w: v, it: wl, cornice, caso: cornice ? null : casoPendente,
          pronome: Object.values(PRONOMI).includes(v) || INTERROGATIVI.includes(v) });
        casoPendente = null; pluralePendente = false; determinato = false;
        continue;
      }

      const lemN = lemmaNominale(wl);
      const nelLessicoComeNome = LESSICO[lemN] && LESSICO[lemN].pos !== "v";
      const av = analizzaVerbo(wl);
      const finaleVerbale = FINALI_VERBALI.test(wl);
      const proprio = /^[A-ZÀÈÉÌÒÙ]/.test(w) && i > 0 && !LESSICO[lemN]
        && !MODALI[wl] && !IRREGOLARI[wl];

      const cl = (!proprio && !nelLessicoComeNome) ? staccaClitico(wl) : null;
      if (cl) {
        items.push({ t: "verbo", it: wl, negato,
          av: { lemma: cl.verbo, persona: 2, aspetto: "corso", forma: wl, irregolare: true } });
        if (cl.clitico) items.push({ t: "fissa", w: cl.clitico, it: wl, pronome: true, caso: "ar" });
        negato = false; casoPendente = null; pluralePendente = false; determinato = false;
        continue;
      }

      let eVerbo = false;
      if (!proprio && av) {
        if (av.modale || av.irregolare) eVerbo = true;
        else if (LESSICO[wl] && LESSICO[wl].pos === "v") eVerbo = true;
        else if (LESSICO[wl]) eVerbo = false;                       // sta nel lessico così com'è
        else if (av.tema && cercaVerbo(av.tema, true)) eVerbo = true;
        else if (nelLessicoComeNome) eVerbo = false;
        else if (av.tema && cercaVerbo(av.tema, false)) eVerbo = true;
        else if (finaleVerbale) eVerbo = true;
      }

      if (eVerbo) {
        if (av.aspetto === "fatto" && personaAux) { av.persona = personaAux; personaAux = null; }
        if (av.aspetto === "fatto" && copulaAttesa) { av.impersonale = true; copulaAttesa = false; }
        items.push({ t: "verbo", av, it: wl, negato });
        negato = false; casoPendente = null; pluralePendente = false; determinato = false;
        continue;
      }

      const vv = LESSICO[lemN];
      items.push({ t: "nome", it: lemN, orig: w, proprio,
        agg: !!(vv && vv.pos === "a"),
        caso: casoPendente, plur: pluralePendente && !proprio,
        det: determinato && o.determinatezza && !proprio,
        poss: possPendente });
      casoPendente = null; pluralePendente = false; determinato = false; possPendente = null;
    }

    /* ---- passata 2: si spezza dove due predicati si danno il cambio ---- */
    const segmenti = [];
    let corrente = [];
    for (const it of items) {
      const eCong = it.t === "fissa" && (CONGIUNZIONI.includes(it.w) || it.taglio);
      const finitoPrima = corrente.some(x => x.t === "verbo" && x.av.aspetto !== "infinito");
      const dopo = items.slice(items.indexOf(it) + 1);
      const finitoDopo = dopo.some(x => x.t === "verbo" && x.av.aspetto !== "infinito");
      if (eCong && (it.taglio || (finitoPrima && finitoDopo))) {
        segmenti.push({ items: corrente, giunto: it.w });
        corrente = [];
      } else corrente.push(it);
    }
    segmenti.push({ items: corrente, giunto: null });

    /* ---- passata 3: si rende ---- */
    let pezzi = [];
    segmenti.forEach((seg, n) => {
      const p = rendiSegmento(seg.items, o, { domanda, esclama, apertura: n === 0 });
      pezzi = pezzi.concat(p);
      if (seg.giunto) pezzi.push({ w: seg.giunto, gloss: "&" });
      pezzi = pezzi.filter(x => x.w !== "");
    });

    if (domanda) pezzi.push({ w: "hu", gloss: "?" });
    const tst = TESTIMONE[o.testimone] || "";
    const cns = CONSENSO[o.consenso] || "";
    if (tst) pezzi.push({ w: tst, gloss: "test:" + o.testimone });
    if (cns) pezzi.push({ w: cns, gloss: "cons:" + o.consenso });

    const roman = pezzi.map(p => p.w).join(" ").replace(/\s+/g, " ").trim();
    return {
      romanizzazione: roman + (esclama ? "!" : domanda ? "" : "."),
      glifi: perIlFont(roman),
      glossa: pezzi.map(p => p.gloss).join(" · "),
      pezzi
    };
  }

  function rendiSegmento(items, o, ctx) {
    if (!items.some(x => x.t === "verbo")) {
      for (let i = items.length - 1; i >= 0; i--) {
        const it = items[i];
        if (it.t === "nome" && !it.caso && !it.proprio && !LESSICO[it.it]) {
          const av = analizzaVerbo(it.it);
          if (av && av.persona) { items[i] = { t: "verbo", av, it: it.it, negato: false }; break; }
        }
      }
    }
    const cCopula = items.some(x => x.t === "copula");
    const verbi = items.filter(x => x.t === "verbo");
    const finiti = verbi.filter(v => v.av.aspetto !== "infinito");
    const capo = finiti.length ? finiti[finiti.length - 1] : (verbi.length ? verbi[verbi.length - 1] : null);
    const infiniti = verbi.filter(v => v.av.aspetto === "infinito" && v !== capo);

    /* imperativo */
    let imperativo = false;
    if (capo && o.modo !== "racconto") {
      if (o.modo === "imperativo") imperativo = true;
      else {
        const idxCapo = items.indexOf(capo);
        const prima = items.slice(0, idxCapo);
        const soggPrima = prima.some(x => (x.t === "nome" && !x.caso) ||
          (x.t === "fissa" && x.pronome && !x.caso));
        const formaBuona = capo.av.aspetto === "corso" && [2, 3, 5].includes(capo.av.persona);
        if (!soggPrima && formaBuona && !ctx.domanda) imperativo = true;
      }
    }

    /* ruoli */
    const liberi = items.filter(x => (x.t === "nome" && !x.caso && !x.agg) ||
                                     (x.t === "fissa" && x.pronome && !x.caso));
    const soggetto = liberi[0] || null;
    const haOggetto = liberi.length > 1;

    const cornice = [], corpo = [];

    items.forEach(it => {
      if (it.t === "verbo" || it.t === "copula") return;

      if (it.t === "fissa") {
        let caso = it.caso ||
          ((it.pronome && it === soggetto && haOggetto && capo && !imperativo) ? "vol" : null);
        const b = { w: pulisci(respira(it.w + (caso ? CASO[caso] : ""))),
          gloss: it.it + (caso ? "." + caso.toUpperCase() : "") };
        (it.cornice ? cornice : corpo).push(b);
        return;
      }

      let w;
      if (it.proprio && o.nomiPropri === "lascia") w = it.orig;
      else {
        const v = voce(it.it);
        w = componi(v.r, v.modo || (v.pos === "a" ? "qualita" : "astratto"));
      }
      if (it.plur) w += PLUR;
      let caso = it.caso;
      if (!caso && it === soggetto && haOggetto && capo && !imperativo) caso = "vol";
      const sveglio = o.risvegliato === "si" ? true
        : o.risvegliato === "no" ? false : ANIMATI.has(it.it);
      const procl = it.det ? (sveglio ? "î'" : "e'") : "";
      const desin = caso === "vol" && sveglio ? "ên" : (caso ? CASO[caso] : "");
      const testa = procl + w + desin;
      const b = { w: pulisci(respira(testa)),
        gloss: it.it + (caso ? "." + caso.toUpperCase() : ""), agg: it.agg, idx: items.indexOf(it) };
      (it.caso === "loc" ? cornice : corpo).push(b);
      if (it.poss) corpo.push({ w: "i " + it.poss, gloss: "leg." + it.poss });
    });

    /* l'attributo precede, il predicato segue */
    if (!cCopula) {
      for (let i = 1; i < corpo.length; i++) {
        const a = corpo[i], b = corpo[i - 1];
        if (a.agg && b && !b.agg && a.idx !== undefined && b.idx !== undefined && a.idx - b.idx === 1) {
          corpo.splice(i - 1, 0, corpo.splice(i, 1)[0]);
        }
      }
    }

    const codaInf = infiniti.map(inf => {
      const L = lemmaVerbale(inf.av);
      return { w: componi(voce(L).r, "atto"), gloss: L + ".inf" };
    });

    const pezzi = [...cornice];

    if (capo) {
      const radicali = capo.av.modale ? capo.av.modale[1].split("-") : voce(lemmaVerbale(capo.av)).r;
      const stem = componi(radicali, "atto");
      let w, gl;
      if (imperativo) { w = stem + "ê"; gl = "IMP"; }
      else {
        const per = capo.av.impersonale ? "" : (PERSONA[capo.av.persona] || PERSONA[3]);
        w = stem + (ASPETTO[capo.av.aspetto] || "") + per;
        gl = (capo.av.aspetto || "corso") + "." + (capo.av.impersonale ? "impers" : (capo.av.persona || 3));
      }
      if (capo.negato) { w = "û" + w; gl = "NEG-" + gl; }
      const reg = REGISTRO[o.registro] || "";
      if (reg) { w = reg + w; gl = "REALE-" + gl; }
      pezzi.push({ w: pulisci(respira(w)), gloss: gl });
    }
    pezzi.push(...codaInf, ...corpo);
    return pezzi;
  }

  /* ---------- 11. VERSO I GLIFI ---------- */
  function perIlFont(s) {
    return s.toLowerCase().replace(/kh/g, "x").replace(/sh/g, "c").replace(/th/g, "q").replace(/'/g, "ʼ");
  }

  /* ---------- 12. ATTREZZI ---------- */
  function declina(lemma) {
    const v = voce(lemmaNominale(lemma));
    const out = { radice: "√" + v.r.join("-").toUpperCase(), nota: v.nota };
    for (const m in MODI) out[m] = componi(v.r, m);
    return out;
  }

  function coniuga(lemma) {
    const v = voce(lemma);
    const stem = componi(v.r, "atto");
    const out = { radice: "√" + v.r.join("-").toUpperCase(), imperativo: stem + "ê" };
    for (const a in ASPETTO) {
      out[a] = {};
      for (const p in PERSONA) out[a][p] = pulisci(respira(stem + ASPETTO[a] + PERSONA[p]));
    }
    return out;
  }

  return { traduci, traduciFrase, leggiIndizi, rendiSegmento, REGISTRO, ANIMATI, declina, coniuga, voce, componi, perIlFont,
    radiceGenerata, respira, fonemi, LESSICO, LESSICO_GREZZO, MODI, CASO, ASPETTO,
    PERSONA, TESTIMONE, CONSENSO, FISSE, PLUR };
})();

if (typeof module !== "undefined") module.exports = VATHRA;

export { VATHRA };

export default VATHRA;
