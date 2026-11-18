// GENERATO da tools/build-menu-sfere.py: non si scrive a mano.
// Le righe del menù circolare del Narratore per Sfera (stesura del 24/10/2026,
// Corrispondenza scritta da Blue, le altre otto proposte da provare al tavolo).
// Icone: Game-icons (https://game-icons.net), via @iconify-json/game-icons. Licenza CC BY 3.0 (https://creativecommons.org/licenses/by/3.0/): gli autori vanno citati nei crediti.
// Autori: Lorc, Delapouite e gli altri autori di game-icons.net.
export const MENU_SFERE = Object.freeze([
 {
  "id": "correspondence",
  "nome": "Corrispondenza",
  "dominio": "lo spazio e i legami",
  "autore": "Blue",
  "righe": [
   {
    "id": "correspondence-entrare-uscire-di-scena",
    "nome": "Entrare / Uscire di Scena",
    "lato": "n",
    "testo": "Un pg o npc entra o esce dalla scena attuale. Se vi è un orologio per l'arrivo o l'uscita viene completato anzitempo e pagare il rimanente costo in punti paradosso.",
    "prezzo": null,
    "fissa": false,
    "icona": "exit-door"
   },
   {
    "id": "correspondence-sbagliare-strada",
    "nome": "Sbagliare strada",
    "lato": "n",
    "testo": "Quando ci si sposta per raggiungere un luogo, pagare X a seconda della distanza da raggiungere, più è vicino più costa paradosso mettere la strada sbagliata, i personaggi sbaglieranno strada e si ritroveranno in un'altro luogo dove vi è in corso un'altro evento.",
    "prezzo": null,
    "fissa": false,
    "icona": "misdirection"
   },
   {
    "id": "correspondence-vicolo-cieco",
    "nome": "Vicolo Cieco",
    "lato": "n",
    "testo": "Quando si vuole uscire da un luogo, le uscite divengono inaccessibili. il costo pagato in paradosso +3 è la soglia per sbloccare una nuova via di fuga. il luogo viene bloccato sia sotto l'aspetto della Magick che fisico.",
    "prezzo": null,
    "fissa": true,
    "icona": "brick-wall"
   },
   {
    "id": "correspondence-sbarrare-la-via",
    "nome": "Sbarrare la via",
    "lato": "n",
    "testo": "è l'inverso di vicolo cieco, un luogo specifico viene bloccato",
    "prezzo": null,
    "fissa": false,
    "icona": "barricade"
   },
   {
    "id": "correspondence-spostare-pedina",
    "nome": "Spostare Pedina",
    "lato": "s",
    "testo": "Come effetto di Magick Paradossale sposta un NPC in un'altro punto della mappa senza usare la sua azione di movimento.",
    "prezzo": null,
    "fissa": false,
    "icona": "chess-pawn"
   },
   {
    "id": "correspondence-movimento-extra",
    "nome": "Movimento Extra",
    "lato": "s",
    "testo": "Fa fare un azione di movimento extra ad un NPC. Costo 1 Fisso.",
    "prezzo": 1,
    "fissa": false,
    "icona": "sprint"
   },
   {
    "id": "correspondence-rinforzi",
    "nome": "Rinforzi",
    "lato": "s",
    "testo": "Chiama un numero di rinforzi pari al paradosso pagato. il costo da moltiplicare è la sfida dell'NPC da \"chiamare\" o inferiore. Vedi lista precompilati.",
    "prezzo": null,
    "fissa": false,
    "icona": "guards"
   },
   {
    "id": "correspondence-gabbia",
    "nome": "Gabbia",
    "lato": "s",
    "testo": "Uscire di scena costa soglia in più oppure c'è un ostacolo fisico che impedisce l'uscita (Le porte si chiudono a chiave, un camion sbarra la strada)",
    "prezzo": null,
    "fissa": false,
    "icona": "cage"
   },
   {
    "id": "correspondence-colpo-distante",
    "nome": "Colpo Distante",
    "lato": "s",
    "testo": "L'attacco di un NPC ottiene una portata maggiore della norma",
    "prezzo": null,
    "fissa": false,
    "icona": "arrow-scope"
   },
   {
    "id": "correspondence-effetto-di-magick",
    "nome": "Effetto di Magick",
    "lato": "ns",
    "testo": "Lancia un incantesimo di corrispondenza bersagliando NPC o personaggi.",
    "prezzo": null,
    "fissa": false,
    "icona": "magic-swirl"
   }
  ]
 },
 {
  "id": "entropy",
  "nome": "Entropia",
  "dominio": "il caso e il destino",
  "autore": "proposta",
  "righe": [
   {
    "id": "entropy-andare-storto",
    "nome": "Andare Storto",
    "lato": "n",
    "testo": "Quando i pg tentano qualcosa, va storto di proposito: la soglia del tiro si alza di tanti punti quanto il paradosso pagato.",
    "prezzo": null,
    "fissa": false,
    "icona": "cat"
   },
   {
    "id": "entropy-incrocio",
    "nome": "Incrocio",
    "lato": "n",
    "testo": "Quando i pg seguono una pista, per caso si incrocia con un'altra linea della storia: li porta su quella, oppure l'inizio di una si confonde con l'altra. Costo X.",
    "prezzo": null,
    "fissa": false,
    "icona": "crossroad"
   },
   {
    "id": "entropy-guasto",
    "nome": "Guasto",
    "lato": "n",
    "testo": "Quando serve un oggetto o un impianto (auto, telefono, luci, serratura), si rompe adesso. Ripararlo è un tiro o un tempo. Costo X a seconda di quanto serve.",
    "prezzo": null,
    "fissa": false,
    "icona": "unplugged"
   },
   {
    "id": "entropy-destino-scritto",
    "nome": "Destino Scritto",
    "lato": "n",
    "testo": "Un evento della storia viene fissato: succede comunque, oppure non può succedere finché non ne succede un altro che dichiari. Il costo pagato +3 è la soglia per scardinarlo.",
    "prezzo": null,
    "fissa": true,
    "icona": "scroll-quill"
   },
   {
    "id": "entropy-tiro-sfortunato",
    "nome": "Tiro Sfortunato",
    "lato": "s",
    "testo": "Il prossimo tiro di un pg riesce solo con l'8. Costo 1 Fisso.",
    "prezzo": 1,
    "fissa": false,
    "icona": "dice-six-faces-one"
   },
   {
    "id": "entropy-tiro-fortunato",
    "nome": "Tiro Fortunato",
    "lato": "s",
    "testo": "Il prossimo tiro di un NPC riceve dadi in più pari al paradosso pagato.",
    "prezzo": null,
    "fissa": false,
    "icona": "clover"
   },
   {
    "id": "entropy-inceppamento",
    "nome": "Inceppamento",
    "lato": "s",
    "testo": "L'arma di un pg si inceppa: Disarmato finché non spende un'azione. Costo 1 Fisso.",
    "prezzo": 1,
    "fissa": false,
    "icona": "pistol-gun"
   },
   {
    "id": "entropy-scivolone",
    "nome": "Scivolone",
    "lato": "s",
    "testo": "Un pg subisce una Condizione che sembra naturale, dovuta al momento: scivola, inciampa, si distrae. Costo 1 Fisso se è naturale; se non lo è, costa più paradosso.",
    "prezzo": 1,
    "fissa": false,
    "icona": "banana-peel"
   },
   {
    "id": "entropy-colpo-deviato",
    "nome": "Colpo Deviato",
    "lato": "s",
    "testo": "Un colpo andato a segno finisce su un altro bersaglio nella linea di tiro: un alleato, un Dormiente, un oggetto. Costo X.",
    "prezzo": null,
    "fissa": false,
    "icona": "ricochet"
   },
   {
    "id": "entropy-punto-fisso",
    "nome": "Punto Fisso",
    "lato": "s",
    "testo": "Per questo scontro l'NPC ha un punto fisso: una condizione per batterlo, che dichiari (un oggetto da distruggere, un posto da raggiungere, una vulnerabilità da colpire). Finché non succede, non va giù. Il costo pagato +3 è la soglia per scardinarlo.",
    "prezzo": null,
    "fissa": true,
    "icona": "achilles-heel"
   },
   {
    "id": "entropy-effetto-di-magick",
    "nome": "Effetto di Magick",
    "lato": "ns",
    "testo": "Lancia un incantesimo di Entropia bersagliando NPC o personaggi.",
    "prezzo": null,
    "fissa": false,
    "icona": "magic-swirl"
   }
  ]
 },
 {
  "id": "forces",
  "nome": "Forza",
  "dominio": "l'energia",
  "autore": "proposta",
  "righe": [
   {
    "id": "forces-blackout",
    "nome": "Blackout",
    "lato": "n",
    "testo": "La corrente salta per la scena. Ostacola o facilita i Background e gli oggetti che dipendono dalla corrente (telecamere, allarmi, telefoni, ascensori): chi ci conta ha la soglia più alta, chi la evita più bassa. Costo X a seconda dell'area.",
    "prezzo": null,
    "fissa": false,
    "icona": "bulb"
   },
   {
    "id": "forces-maltempo",
    "nome": "Maltempo",
    "lato": "n",
    "testo": "Pioggia, nebbia, vento, gelo: ostacolano la vista e l'udito. Le soglie dei tiri di percezione si alzano di tanti punti quanto il paradosso pagato; condiziona anche il movimento e gli inseguimenti.",
    "prezzo": null,
    "fissa": false,
    "icona": "heavy-rain"
   },
   {
    "id": "forces-incendio",
    "nome": "Incendio",
    "lato": "n",
    "testo": "Un incendio parte nel luogo: chi resta prende danni a ogni turno o scena pari al paradosso pagato, e il luogo diventa inagibile.",
    "prezzo": null,
    "fissa": false,
    "icona": "fire"
   },
   {
    "id": "forces-tremore",
    "nome": "Tremore",
    "lato": "n",
    "testo": "Un tremore scuote il luogo: tutti fanno un tiro per restare in piedi o sono Atterrati, e qualcosa crolla: danni pari al paradosso pagato a chi sta sotto.",
    "prezzo": null,
    "fissa": false,
    "icona": "earth-crack"
   },
   {
    "id": "forces-zona-pericolosa",
    "nome": "Zona Pericolosa",
    "lato": "s",
    "testo": "Una zona della mappa fa 1 danno superficiale a turno a chi ci resta (corrente, fuoco, gelo). Costo X a seconda dell'ampiezza.",
    "prezzo": null,
    "fissa": false,
    "icona": "hazard-sign"
   },
   {
    "id": "forces-lampo",
    "nome": "Lampo",
    "lato": "s",
    "testo": "Infligge una Condizione di Vista o di Udito ai pg nella zona: Abbagliato o Ovattato. Costo 1 Fisso per un turno; più alto il grado e più dura, più costa.",
    "prezzo": 1,
    "fissa": false,
    "icona": "flash-grenade"
   },
   {
    "id": "forces-spinta",
    "nome": "Spinta",
    "lato": "s",
    "testo": "Un'esplosione, una raffica o una scarica spinge un pg: Atterrato, o spostato di una zona. Costo X.",
    "prezzo": null,
    "fissa": false,
    "icona": "push"
   },
   {
    "id": "forces-colpo-potente",
    "nome": "Colpo Potente",
    "lato": "s",
    "testo": "L'attacco di un NPC fa danni in più pari al paradosso pagato.",
    "prezzo": null,
    "fissa": false,
    "icona": "punch-blast"
   },
   {
    "id": "forces-scarica",
    "nome": "Scarica",
    "lato": "s",
    "testo": "Un NPC scarica energia su chi lo tocca o lo colpisce da vicino: danni pari al paradosso pagato.",
    "prezzo": null,
    "fissa": false,
    "icona": "lightning-arc"
   },
   {
    "id": "forces-effetto-di-magick",
    "nome": "Effetto di Magick",
    "lato": "ns",
    "testo": "Lancia un incantesimo di Forza bersagliando NPC o personaggi.",
    "prezzo": null,
    "fissa": false,
    "icona": "magic-swirl"
   }
  ]
 },
 {
  "id": "matter",
  "nome": "Materia",
  "dominio": "gli oggetti",
  "autore": "proposta",
  "righe": [
   {
    "id": "matter-porta-chiusa",
    "nome": "Porta Chiusa",
    "lato": "n",
    "testo": "Quando i pg vogliono entrare, la porta (serranda, cancello, cassaforte) è chiusa e resiste alla Magick: si apre da Dormienti, con una chiave, una persona, un orario. Il costo pagato +3 è la soglia per aprirla con la Magick.",
    "prezzo": null,
    "fissa": true,
    "icona": "locked-door"
   },
   {
    "id": "matter-prova-rovinata",
    "nome": "Prova Rovinata",
    "lato": "n",
    "testo": "Quando i pg hanno in mano una prova fisica (una foto, un documento, un oggetto), si rovina o sparisce. Senza la prova, convincere chi doveva vederla ha la soglia più alta. Costo X a seconda di quanto conta.",
    "prezzo": null,
    "fissa": false,
    "icona": "card-burn"
   },
   {
    "id": "matter-oggetto-sbagliato",
    "nome": "Oggetto Sbagliato",
    "lato": "n",
    "testo": "Quando i pg cercano un oggetto (la chiave, il libro, il corpo), trovano quello sbagliato: quello giusto è altrove, e cercarlo costa una scena o un tiro. Costo X.",
    "prezzo": null,
    "fissa": false,
    "icona": "swap-bag"
   },
   {
    "id": "matter-cedimento",
    "nome": "Cedimento",
    "lato": "n",
    "testo": "Il luogo cede: un pavimento, una scala, un soffitto. Chi è sopra è Atterrato o prende danni pari al paradosso pagato; il posto non si usa più.",
    "prezzo": null,
    "fissa": false,
    "icona": "falling-rocks"
   },
   {
    "id": "matter-perduto",
    "nome": "Perduto",
    "lato": "n",
    "testo": "Un oggetto è distrutto o irraggiungibile (murato, sul fondo, in mano a chi non si trova). Il costo pagato +3 è la soglia per ritrovarlo o rifarlo.",
    "prezzo": null,
    "fissa": true,
    "icona": "locked-chest"
   },
   {
    "id": "matter-disarmo",
    "nome": "Disarmo",
    "lato": "s",
    "testo": "L'arma di un pg vola via o si rompe: Disarmato finché non la riprende con un'azione; se è rotta, serve un'altra arma. Costo X a seconda dell'arma.",
    "prezzo": null,
    "fissa": false,
    "icona": "shattered-sword"
   },
   {
    "id": "matter-riparo",
    "nome": "Riparo",
    "lato": "s",
    "testo": "Un oggetto della mappa (un'auto, un muro, un cassonetto) fa da riparo a un NPC: per colpirlo i pg devono spostarsi per avere la linea di tiro. Costo 1 Fisso.",
    "prezzo": 1,
    "fissa": false,
    "icona": "stone-wall"
   },
   {
    "id": "matter-riparo-rotto",
    "nome": "Riparo Rotto",
    "lato": "s",
    "testo": "Il riparo di un pg cede: resta allo scoperto. Costo 1 Fisso.",
    "prezzo": 1,
    "fissa": false,
    "icona": "broken-wall"
   },
   {
    "id": "matter-arma-trovata",
    "nome": "Arma Trovata",
    "lato": "s",
    "testo": "Un NPC trova un'arma sulla mappa (vedi lista equipaggiamento). Costo 1 Fisso.",
    "prezzo": 1,
    "fissa": false,
    "icona": "saber-and-pistol"
   },
   {
    "id": "matter-terreno-che-cede",
    "nome": "Terreno che Cede",
    "lato": "s",
    "testo": "Il pavimento o la scala cede sotto un pg: Atterrato finché non spende un'azione. Costo 1 Fisso.",
    "prezzo": 1,
    "fissa": false,
    "icona": "sinking-trap"
   },
   {
    "id": "matter-effetto-di-magick",
    "nome": "Effetto di Magick",
    "lato": "ns",
    "testo": "Lancia un incantesimo di Materia bersagliando NPC o personaggi.",
    "prezzo": null,
    "fissa": false,
    "icona": "magic-swirl"
   }
  ]
 },
 {
  "id": "mind",
  "nome": "Mente",
  "dominio": "i pensieri",
  "autore": "proposta",
  "righe": [
   {
    "id": "mind-testimone",
    "nome": "Testimone",
    "lato": "n",
    "testo": "Qualcuno ha visto: finché resta in scena, i Volgari contano con testimoni. Costo X a seconda di chi è: un passante, una telecamera, una guardia.",
    "prezzo": null,
    "fissa": false,
    "icona": "door-watcher"
   },
   {
    "id": "mind-domande",
    "nome": "Domande",
    "lato": "n",
    "testo": "Un NPC fa domande scomode e non se ne va. Mente non gliele toglie: cancellate a uno, le fa un altro. Rispondere è un tiro con la soglia pari al paradosso pagato; se se ne vanno, lui ha visto.",
    "prezzo": null,
    "fissa": false,
    "icona": "conversation"
   },
   {
    "id": "mind-cambiare-idea",
    "nome": "Cambiare Idea",
    "lato": "n",
    "testo": "Un NPC cambia idea: dice no, ci ripensa, chiama qualcuno. Riconvincerlo è un tiro con la soglia più alta di tanti punti quanto il paradosso pagato.",
    "prezzo": null,
    "fissa": false,
    "icona": "think"
   },
   {
    "id": "mind-dimenticare",
    "nome": "Dimenticare",
    "lato": "n",
    "testo": "Un NPC dimentica quello che i pg gli hanno detto o fatto fare. Rifare quello che era fatto costa una scena o un tiro. Costo X.",
    "prezzo": null,
    "fissa": false,
    "icona": "brain-leak"
   },
   {
    "id": "mind-sospetto",
    "nome": "Sospetto",
    "lato": "n",
    "testo": "Un NPC inizia a sospettare dei pg: li segue, indaga, parla di loro. Apri un orologio: pieno, li trova o li denuncia. Costo X.",
    "prezzo": null,
    "fissa": false,
    "icona": "suspicious"
   },
   {
    "id": "mind-idea-fissa",
    "nome": "Idea Fissa",
    "lato": "n",
    "testo": "Un NPC è fissato su una convinzione. Il costo pagato +3 è la soglia per cambiargliela, con parole o con Mente.",
    "prezzo": null,
    "fissa": true,
    "icona": "idea"
   },
   {
    "id": "mind-paura",
    "nome": "Paura",
    "lato": "s",
    "testo": "Un pg prende una Condizione di Paura davanti a un NPC: Intimorito, Spaventato o Terrorizzato. Costo X a seconda del grado.",
    "prezzo": null,
    "fissa": false,
    "icona": "terror"
   },
   {
    "id": "mind-esitazione",
    "nome": "Esitazione",
    "lato": "s",
    "testo": "Un pg perde la prossima azione. Costo X.",
    "prezzo": null,
    "fissa": false,
    "icona": "halt"
   },
   {
    "id": "mind-sangue-freddo",
    "nome": "Sangue Freddo",
    "lato": "s",
    "testo": "Un NPC ignora una Condizione di Mente per la scena. Costo 1 Fisso.",
    "prezzo": 1,
    "fissa": false,
    "icona": "cold-heart"
   },
   {
    "id": "mind-senza-resa",
    "nome": "Senza Resa",
    "lato": "s",
    "testo": "Per questo scontro un NPC non tratta e non si arrende. Il costo pagato +3 è la soglia per fermarlo con parole o con Mente.",
    "prezzo": null,
    "fissa": true,
    "icona": "fist"
   },
   {
    "id": "mind-effetto-di-magick",
    "nome": "Effetto di Magick",
    "lato": "ns",
    "testo": "Lancia un incantesimo di Mente bersagliando NPC o personaggi.",
    "prezzo": null,
    "fissa": false,
    "icona": "magic-swirl"
   }
  ]
 },
 {
  "id": "prime",
  "nome": "Primordio",
  "dominio": "la Magick",
  "autore": "proposta",
  "righe": [
   {
    "id": "prime-pedaggio",
    "nome": "Pedaggio",
    "lato": "n",
    "testo": "Nel luogo della scena ogni Volgare costa 1 Quintessenza in più. Costo X a seconda del luogo.",
    "prezzo": null,
    "fissa": false,
    "icona": "pay-money"
   },
   {
    "id": "prime-dissonanza",
    "nome": "Dissonanza",
    "lato": "n",
    "testo": "Nel luogo della scena ogni lancio è Volgare. Costo X.",
    "prezzo": null,
    "fissa": false,
    "icona": "vortex"
   },
   {
    "id": "prime-residuo",
    "nome": "Residuo",
    "lato": "n",
    "testo": "Un effetto dei pg non si spegne: continua da solo per la scena, e a ogni turno fa 1 danno a chi ci sta o tocca un Dormiente. Costo X.",
    "prezzo": null,
    "fissa": false,
    "icona": "echo-ripples"
   },
   {
    "id": "prime-nodo-prosciugato",
    "nome": "Nodo Prosciugato",
    "lato": "n",
    "testo": "Il Nodo non dà Quintessenza per un numero di scene pari al paradosso pagato.",
    "prezzo": null,
    "fissa": false,
    "icona": "leak"
   },
   {
    "id": "prime-terra-morta",
    "nome": "Terra Morta",
    "lato": "n",
    "testo": "Nel luogo la Magick non funziona, per nessuno. Il costo pagato +3 è la soglia per riaprirla.",
    "prezzo": null,
    "fissa": true,
    "icona": "dead-wood"
   },
   {
    "id": "prime-inceppo",
    "nome": "Inceppo",
    "lato": "s",
    "testo": "−2 dadi al prossimo lancio di Magick di un pg. Costo 1 Fisso.",
    "prezzo": 1,
    "fissa": false,
    "icona": "cog-lock"
   },
   {
    "id": "prime-volgare-forzato",
    "nome": "Volgare Forzato",
    "lato": "s",
    "testo": "Il prossimo lancio di un pg conta come Volgare. Costo 1 Fisso.",
    "prezzo": 1,
    "fissa": false,
    "icona": "magic-palm"
   },
   {
    "id": "prime-spegnere",
    "nome": "Spegnere",
    "lato": "s",
    "testo": "Un effetto attivo dei pg si spegne. Costo pari alla soglia dell'effetto.",
    "prezzo": null,
    "fissa": false,
    "icona": "unlit-candelabra"
   },
   {
    "id": "prime-specchio",
    "nome": "Specchio",
    "lato": "s",
    "testo": "Un effetto dei pg si ritorce contro di loro. Costo pari alla soglia dell'effetto.",
    "prezzo": null,
    "fissa": false,
    "icona": "mirror-mirror"
   },
   {
    "id": "prime-quintessenza-bruciata",
    "nome": "Quintessenza Bruciata",
    "lato": "s",
    "testo": "Un pg perde Quintessenza pari al paradosso pagato.",
    "prezzo": null,
    "fissa": false,
    "icona": "burning-embers"
   },
   {
    "id": "prime-effetto-di-magick",
    "nome": "Effetto di Magick",
    "lato": "ns",
    "testo": "Lancia un incantesimo di Primordio bersagliando NPC o personaggi.",
    "prezzo": null,
    "fissa": false,
    "icona": "magic-swirl"
   }
  ]
 },
 {
  "id": "spirit",
  "nome": "Spirito",
  "dominio": "oltre il Velo",
  "autore": "proposta",
  "righe": [
   {
    "id": "spirit-presenza",
    "nome": "Presenza",
    "lato": "n",
    "testo": "Entra una Presenza (Ombra, Esattore, Ospite): vuole una cosa, e finché non l'ha la sua soglia pesa sui pg. Costo pari alla sfida della Presenza (vedi lista precompilati).",
    "prezzo": null,
    "fissa": false,
    "icona": "ghost"
   },
   {
    "id": "spirit-velo-sottile",
    "nome": "Velo Sottile",
    "lato": "n",
    "testo": "Nel luogo il Velo è sottile: gli spiriti passano e i Dormienti lo sentono. Gli effetti di Spirito hanno la soglia più bassa, tutti gli altri più alta, di tanti punti quanto il paradosso pagato.",
    "prezzo": null,
    "fissa": false,
    "icona": "magic-portal"
   },
   {
    "id": "spirit-richiamo",
    "nome": "Richiamo",
    "lato": "n",
    "testo": "Un pg riceve una visione o un sogno dal Velo che lo tira verso un evento della storia: finché non lo segue, perde 2 dadi su tutti i tiri. Costo X.",
    "prezzo": null,
    "fissa": false,
    "icona": "dream-catcher"
   },
   {
    "id": "spirit-debito",
    "nome": "Debito",
    "lato": "n",
    "testo": "Una Presenza resta finché non ha quello che vuole, e non si scaccia. Il costo pagato +3 è la soglia per scacciarla.",
    "prezzo": null,
    "fissa": true,
    "icona": "wax-seal"
   },
   {
    "id": "spirit-spirito-ostile",
    "nome": "Spirito Ostile",
    "lato": "s",
    "testo": "Entra uno spirito che attacca i pg, di sfida pari al paradosso pagato (vedi lista precompilati).",
    "prezzo": null,
    "fissa": false,
    "icona": "spectre"
   },
   {
    "id": "spirit-possessione",
    "nome": "Possessione",
    "lato": "s",
    "testo": "Un NPC viene posseduto: agisce con la sfida dello spirito. Costo pari alla sfida dello spirito.",
    "prezzo": null,
    "fissa": false,
    "icona": "shadow-grasp"
   },
   {
    "id": "spirit-esattore",
    "nome": "Esattore",
    "lato": "s",
    "testo": "Entra l'Esattore e va dritto su chi ha lanciato l'ultimo Volgare. Costo pari alla sua sfida.",
    "prezzo": null,
    "fissa": false,
    "icona": "hooded-figure"
   },
   {
    "id": "spirit-attacco-invisibile",
    "nome": "Attacco Invisibile",
    "lato": "s",
    "testo": "Un pg prende danni da qualcosa che non vede: per colpirlo serve Spirito. Costo X.",
    "prezzo": null,
    "fissa": false,
    "icona": "invisible"
   },
   {
    "id": "spirit-effetto-di-magick",
    "nome": "Effetto di Magick",
    "lato": "ns",
    "testo": "Lancia un incantesimo di Spirito bersagliando NPC o personaggi.",
    "prezzo": null,
    "fissa": false,
    "icona": "magic-swirl"
   }
  ]
 },
 {
  "id": "time",
  "nome": "Tempo",
  "dominio": "il quando",
  "autore": "proposta",
  "righe": [
   {
    "id": "time-anticipare",
    "nome": "Anticipare",
    "lato": "n",
    "testo": "Un evento previsto succede adesso: l'orologio si completa e paghi i segmenti rimanenti.",
    "prezzo": null,
    "fissa": false,
    "icona": "fast-forward-button"
   },
   {
    "id": "time-ritardare",
    "nome": "Ritardare",
    "lato": "n",
    "testo": "Un evento previsto slitta: l'orologio torna indietro di segmenti pari al paradosso pagato.",
    "prezzo": null,
    "fissa": false,
    "icona": "backward-time"
   },
   {
    "id": "time-scadenza",
    "nome": "Scadenza",
    "lato": "n",
    "testo": "Una finestra si chiude a un'ora fissa (il treno, l'appuntamento, l'apertura), e la Magick sul tempo non la sposta. Pieno l'orologio, l'altra parte se ne va con quello che ha. Costo X.",
    "prezzo": null,
    "fissa": false,
    "icona": "alarm-clock"
   },
   {
    "id": "time-fatto-compiuto",
    "nome": "Fatto Compiuto",
    "lato": "n",
    "testo": "Un evento è successo e non si riavvolge. Il costo pagato +3 è la soglia per riavvolgerlo con Tempo.",
    "prezzo": null,
    "fissa": true,
    "icona": "stone-tablet"
   },
   {
    "id": "time-iniziativa",
    "nome": "Iniziativa",
    "lato": "s",
    "testo": "Un NPC agisce prima dei pg in questo turno. Costo 1 Fisso.",
    "prezzo": 1,
    "fissa": false,
    "icona": "fast-arrow"
   },
   {
    "id": "time-ritardo",
    "nome": "Ritardo",
    "lato": "s",
    "testo": "Il Volgare di un pg arriva a fine turno. Costo 1 Fisso.",
    "prezzo": 1,
    "fissa": false,
    "icona": "snail"
   },
   {
    "id": "time-azione-extra",
    "nome": "Azione Extra",
    "lato": "s",
    "testo": "Un NPC fa un'azione in più in questo turno. Costo X.",
    "prezzo": null,
    "fissa": false,
    "icona": "extra-time"
   },
   {
    "id": "time-rallentare",
    "nome": "Rallentare",
    "lato": "s",
    "testo": "Un pg perde l'azione di movimento in questo turno. Costo 1 Fisso.",
    "prezzo": 1,
    "fissa": false,
    "icona": "turtle"
   },
   {
    "id": "time-orologio",
    "nome": "Orologio",
    "lato": "ns",
    "testo": "Apri un orologio, in vista o nascosto, su un evento: avanza a ogni scena, turno o Volgare; pieno, l'evento succede. Costo X a seconda dei segmenti: meno segmenti, più costa.",
    "prezzo": null,
    "fissa": false,
    "icona": "pocket-watch"
   },
   {
    "id": "time-effetto-di-magick",
    "nome": "Effetto di Magick",
    "lato": "ns",
    "testo": "Lancia un incantesimo di Tempo bersagliando NPC o personaggi.",
    "prezzo": null,
    "fissa": false,
    "icona": "magic-swirl"
   }
  ]
 },
 {
  "id": "life",
  "nome": "Vita",
  "dominio": "i corpi",
  "autore": "proposta",
  "righe": [
   {
    "id": "life-malore",
    "nome": "Malore",
    "lato": "n",
    "testo": "Un pg o un NPC si sente male: una Condizione di Corpo per la scena (Affannato, Intossicato, Sanguinante). Costo X a seconda del grado.",
    "prezzo": null,
    "fissa": false,
    "icona": "vomiting"
   },
   {
    "id": "life-dormiente-in-mezzo",
    "nome": "Dormiente in Mezzo",
    "lato": "n",
    "testo": "Un Dormiente finisce dentro l'effetto o nella scena: salvarlo costa un'azione, lasciarlo va sulla Saggezza. Costo X.",
    "prezzo": null,
    "fissa": false,
    "icona": "person"
   },
   {
    "id": "life-contagio",
    "nome": "Contagio",
    "lato": "n",
    "testo": "Nel luogo si diffonde qualcosa (una malattia, un veleno, un gas): chi resta prende una Condizione di Corpo. Costo X a seconda dell'area.",
    "prezzo": null,
    "fissa": false,
    "icona": "biohazard"
   },
   {
    "id": "life-animali",
    "nome": "Animali",
    "lato": "n",
    "testo": "Gli animali del luogo reagiscono (cani, ratti, uccelli): attaccano, come NPC dalla lista precompilati, oppure fanno rumore e richiamano un Testimone. Costo X.",
    "prezzo": null,
    "fissa": false,
    "icona": "wolf-head"
   },
   {
    "id": "life-ferita-aperta",
    "nome": "Ferita Aperta",
    "lato": "n",
    "testo": "Una ferita non si chiude con la Magick, o chi è morto resta morto. Il costo pagato +3 è la soglia per guarirla.",
    "prezzo": null,
    "fissa": true,
    "icona": "cut-palm"
   },
   {
    "id": "life-sanguinare",
    "nome": "Sanguinare",
    "lato": "s",
    "testo": "Un pg ferito prende Sanguinante. Costo 1 Fisso.",
    "prezzo": 1,
    "fissa": false,
    "icona": "blood"
   },
   {
    "id": "life-affanno",
    "nome": "Affanno",
    "lato": "s",
    "testo": "Un pg prende Affannato. Costo 1 Fisso.",
    "prezzo": 1,
    "fissa": false,
    "icona": "lungs"
   },
   {
    "id": "life-veleno",
    "nome": "Veleno",
    "lato": "s",
    "testo": "L'attacco di un NPC infligge anche Intossicato. Costo X.",
    "prezzo": null,
    "fissa": false,
    "icona": "poison-bottle"
   },
   {
    "id": "life-rigenerare",
    "nome": "Rigenerare",
    "lato": "s",
    "testo": "Un NPC recupera danni superficiali pari al paradosso pagato.",
    "prezzo": null,
    "fissa": false,
    "icona": "regeneration"
   },
   {
    "id": "life-tempra",
    "nome": "Tempra",
    "lato": "s",
    "testo": "Un NPC ignora una Condizione di Corpo per la scena. Costo 1 Fisso.",
    "prezzo": 1,
    "fissa": false,
    "icona": "muscle-up"
   },
   {
    "id": "life-effetto-di-magick",
    "nome": "Effetto di Magick",
    "lato": "ns",
    "testo": "Lancia un incantesimo di Vita bersagliando NPC o personaggi.",
    "prezzo": null,
    "fissa": false,
    "icona": "magic-swirl"
   }
  ]
 }
]);

export const MENU_ICONE_LATI = Object.freeze({"n": "open-book", "s": "crossed-swords", "componi": "quill-ink"});

export const MENU_ICONE_VIEWBOX = "0 0 512 512";

export const MENU_ICONE = Object.freeze({"achilles-heel": "M362.188 17.998c-12.9 65.825-49.788 140.505-98.616 197.37L352 224l-89.377 19.414l52.197 75.27l-71.111-56.364L224 336l-8.576-73.182l2.812-2.779c-45.221 40.71-35.888 74.86.702 96.49c6.775 4.005 16.257 9.046 27.38 8.7c58.243-1.813 93.255 35.012 126.575 76.199c18.234 22.54 48.35 30.059 73.529 44.246c52.44 29.548 67.894-32.667 14.767-53.445l-70.677-111.036c-11.42-53.08 52.186-171.824 103.49-248.37V17.997zM92.454 23.424v32.17l32.799 32.79l8.043-24.126zM78.578 67.352c-.233-.026-.57.037-1.224.199c-1.31.323-3.41 1.482-5.075 3.146c-1.664 1.664-2.823 3.763-3.146 5.073c-.266 1.074-.207 1.3.012 1.61l120.228 120.208l3.275-6.55l6.545-3.272L78.97 67.563c-.123-.086-.24-.195-.39-.211zM21.162 87.029L62 127.86l24.13-8.043l-30.335-30.33l-.397-.396l-.343-.442a18 18 0 0 1-1.112-1.619zm213.563 103.098l-28.663 14.326l-14.33 28.654l38.264 15.303l20.096-19.869z", "alarm-clock": "M247 62.107v9.94h-28.88v18H247v39.074c-84.367 4.682-151.514 74.737-151.514 160.26c0 41.037 15.468 78.508 40.873 106.91l-36.237 36.237l12.727 12.73l36.238-36.24C177.49 434.425 214.96 449.894 256 449.894s78.51-15.47 106.912-40.875l36.238 36.238l12.727-12.73l-36.236-36.235c25.406-28.402 40.874-65.873 40.874-106.91c0-85.523-67.147-155.578-151.514-160.26V90.048h28.88v-18H265v-9.94h-18zm-104.906 26.58a112 112 0 0 0-11.014.465C111.1 90.97 89.15 98 73.637 113.514c-15.514 15.513-22.545 37.462-24.362 57.443c-.908 9.99-.488 19.54 1.184 27.898c1.67 8.36 4.315 15.662 9.784 21.13l6.363 6.365l6.366-6.364l113.5-113.502l-6.366-6.363c-5.47-5.468-12.77-8.112-21.128-9.784c-4.18-.836-8.658-1.358-13.34-1.56q-1.755-.076-3.546-.088zm227.812 0q-1.79.015-3.547.09c-4.682.2-9.16.723-13.34 1.56c-8.357 1.67-15.658 4.315-21.127 9.784l-6.366 6.364l6.366 6.366l113.5 113.5l6.363-6.364c5.47-5.47 8.113-12.772 9.785-21.13c1.673-8.36 2.093-17.908 1.185-27.9c-1.817-19.98-8.848-41.93-24.362-57.442C422.85 98 400.9 90.97 380.92 89.152c-3.747-.34-7.43-.494-11.014-.465M256 146.865c78.815 0 142.514 63.7 142.514 142.514S334.814 431.892 256 431.892s-142.514-63.7-142.514-142.514c0-78.816 63.7-142.515 142.514-142.515zm-88.332 41.453l-12.73 12.73l82.92 82.917a19 19 0 0 0-.797 5.414A18.94 18.94 0 0 0 256 308.317a18.94 18.94 0 0 0 16.66-9.94h59.096v-18h-59.11A18.94 18.94 0 0 0 256 270.44a19 19 0 0 0-5.408.804l-82.924-82.924z", "arrow-scope": "M18.35 18.55v91.552l102.82 58.544l-101.203.305l285.76 135.443L170.27 18.637l-2.186 100.974l-58.49-101.06H18.35zm285.058 92.75a190.7 190.7 0 0 0-64.013 11.055l8.02 16.918a171 171 0 0 1 15.464-4.554l11.565 22.577a147 147 0 0 0-16.34 4.533l8.04 16.96a129 129 0 0 1 17.128-4.263l3.09 6.032l4.385 50.13l10.3 21.726q1.173-.059 2.35-.06c12.445 0 24.89 4.777 34.438 14.326a48.56 48.56 0 0 1 .002 68.875a48.564 48.564 0 0 1-68.877 0c-9.797-9.798-14.553-22.644-14.298-35.41l-17.9-8.483a68 68 0 0 0-.635 7.147l-51.738 4.778l-7.142-2.203a128.5 128.5 0 0 1 4.89-35.612l-17.01-8.062a147.8 147.8 0 0 0-6.347 37.972l-26.163-8.078a171.3 171.3 0 0 1 8.48-41.284l-16.94-8.03c-23.33 66.74-8.356 143.966 44.923 197.245c74.11 74.11 194.547 74.11 268.656.002c74.11-74.11 74.107-194.546-.002-268.654c-37.054-37.054-85.69-55.582-134.326-55.582zm16.244 19.34c38.255 3.63 75.53 20.115 104.87 49.456c22.975 22.975 38.064 50.816 45.275 80.18l-20.453 10.48c-5.624-27.06-18.91-52.83-39.877-73.795c-26.918-26.917-61.753-41.19-97.07-42.82l7.255-23.5zm-12.94 41.923c32.42.29 64.75 12.82 89.54 37.61c19.642 19.643 31.567 44.023 35.828 69.427l-2.648 1.357l-60.305 5.57c-2.665-12.13-8.68-23.66-18.078-33.058c-11.496-11.496-26.173-17.953-41.245-19.376l-4.877-55.754l1.783-5.778zM427.58 299.894l6.277 1.937c-.243 32.483-12.768 64.893-37.605 89.73c-19.303 19.304-43.184 31.156-68.113 35.604l-1.745-3.406l-5.05-57.74c10.892-2.985 21.176-8.723 29.704-17.25c12.094-12.096 18.6-27.717 19.544-43.612l56.986-5.263zm24.707 7.626l21.955 6.78c-3.005 39.356-19.574 77.878-49.72 108.024c-21.934 21.934-48.3 36.682-76.196 44.248l-11.37-22.195c26.588-5.774 51.877-18.967 72.51-39.602c26.965-26.964 41.23-61.875 42.82-97.254zm-214.234 9.88a66.9 66.9 0 0 0 17.697 31.37c12.966 12.966 29.982 19.514 47.045 19.666l4.904 56.084l-1.436 4.65c-33.04.18-66.134-12.346-91.397-37.61c-19.042-19.042-30.832-42.538-35.418-67.103l3.913-2.006l54.69-5.05zm-75.783 15.858c5.885 26.225 19.006 51.14 39.382 71.517c27.385 27.385 62.964 41.667 98.907 42.88l-7.583 24.566c-40.276-2.447-79.86-19.072-110.684-49.898c-22.04-22.04-36.823-48.554-44.356-76.6l24.333-12.464z", "backward-time": "m208.242 24.629l-52.058 95.205l95.207 52.059l17.271-31.586l-42.424-23.198A143.3 143.3 0 0 1 256 114c78.638 0 142 63.362 142 142s-63.362 142-142 142s-142-63.362-142-142c0-16.46 2.785-32.247 7.896-46.928l-32.32-16.16C82.106 212.535 78 233.798 78 256c0 98.093 79.907 178 178 178s178-79.907 178-178S354.093 78 256 78c-13.103 0-25.875 1.44-38.18 4.148l22.008-40.25l-31.586-17.27zm104.27 130.379L247 253.275V368h18V258.725l62.488-93.733z", "banana-peel": "M179.004 28.59c-27.103-.228-59.62 3.852-85.3 11.76c-13.603 4.19-25.234 9.464-32.825 15.035s-10.564 10.6-10.603 15.332c-.28 34.684 6.272 74.84 15.356 109.914c8.183 31.6 18.565 58.72 26.967 74.063l367.086-70.306c-1.167-5.557-3.892-15.144-10.04-30.635c-2.507-6.32-12.206-13.61-28.44-18.856c-16.236-5.245-37.98-8.552-61.41-9.914c-46.86-2.722-100.836 2.32-133.308 11.666l-9.408 2.71l-.023-.116c-4.746 3.855-8.45 8.89-9.192 13.295l-1.496 8.875l-17.75-2.99l1.495-8.875c2.28-13.532 12.047-23.497 22.963-29.34a367 367 0 0 0-4.39-16.828l-2.668-.148c-8.39-.46-15.76 2.225-23.487 7.608s-15.46 13.517-23.156 22.846l-5.73 6.943l-13.883-11.456l5.728-6.944c8.155-9.885 16.756-19.196 26.752-26.16c8.978-6.254 19.37-10.56 30.828-10.855a436 436 0 0 0-7.988-22.043l-4.242.182c-21.626.93-29.778 3.125-48.686 19.216l-6.853 5.832l-11.666-13.707l6.853-5.834c19.92-16.95 35.208-22.107 57.094-23.354c-2.817-6.128-5.696-11.84-8.58-16.916zM459.02 202.842l-208.19 39.875l12.865 12.582l193.785-36.78l1.54-15.678zM209.26 250.68L98.22 271.947l2.555 14.272l106.74-20.26l1.745-15.28zm6.898 67.187c-1.93.008-3.322.324-4.496.645c1.007 12.28 1.89 21.67 2.22 26.802c.135 2.085.15 3.93.138 5.784c5.136-1.573 10.24-2.392 15.253-2.528c1.41-5.27 4.942-11.547 12.27-19.783c.183-.285.252-.444.257-.375c.006.09.015-.237-.63-1.074c-1.287-1.674-5.192-4.53-10.03-6.442c-4.838-1.91-10.546-3.048-14.98-3.03zm-153.174 46.27c-.936.143-1.622.452-2.5 1.345c-1.18 1.202-2.628 3.658-3.654 7.282c-2.052 7.246-2.28 18.665-.166 30.36c2.114 11.693 6.475 23.732 12.395 32.85c2.324 3.58 4.842 6.625 7.505 9.112c15.763-4.76 32.333-8.89 47.444-11.45c-24.98-15.224-38.57-30.71-46.569-43.736c-5.478-8.922-8.535-16.58-10.925-21.113c-1.99-3.773-2.544-4.354-3.53-4.65m168.97 1.773c-6.16-.012-12.7 1.703-19.94 5.326c-2.462 1.232-4.116 3.314-5.463 7.98c-1.348 4.664-1.838 11.484-1.476 19.26c.724 15.547 4.603 34.716 7.23 51.08l2.882 17.936l-16.014-8.572c-18.284-9.787-35.306-11.132-54.543-9.754c-20.922 1.498-52.502 9.324-78.234 18.08c-12.865 4.378-24.37 9.007-32.316 12.98c-3.467 1.734-5.86 3.234-7.635 4.467c1.764 2.986 4.14 4.224 8.172 5.217c5.598 1.38 14.486.904 24.733-1.045c20.493-3.897 45.75-13.088 67.92-14.85c35.257-2.805 75.38 10.294 97.177 11.417c7.785.4 17.53 1.202 24.658.332c3.565-.435 6.33-1.335 7.64-2.14c1.097-.67 1.298-.95 1.478-1.755c-.266-1.334-.757-3.473-1.473-6.292c-1.533-6.03-3.872-14.574-6.338-23.683c-4.93-18.22-10.373-37.42-11.28-48.15l17.165-4.48c14.838 32.71 20.124 55.845 23.88 69.555c1.88 6.855 3.6 11.144 4.57 12.47c.967 1.328.13 1.122 3.237 1.122h.49l.48.053c7.68.833 28.17-2.197 45.196-5.883c17.027-3.686 31.438-7.666 31.438-7.666l.5-.137l.51-.08c34.406-5.364 65.797 8.805 88.408 17.04c11.305 4.118 20.553 6.367 24.81 5.844c2.13-.262 2.894-.67 3.95-1.836c.543-.6 1.174-1.598 1.79-3.04c-19.358-13.836-68.408-45.78-102.544-49.49c-11.62-1.264-25.05-1.387-36.828.805c-11.777 2.193-21.532 6.655-27.288 13.49l-9.603 11.405l-5.62-13.81c-12.367-30.39-27.037-55.573-42.538-69.596c-9.69-8.765-18.912-13.582-29.182-13.602zm241.204 19.565c-19.144 11.233-45.09 23.978-73.46 36.513c10.647 2.604 21.453 6.62 31.908 11.352c32.338-10.455 41.97-22.153 44.207-30.647c1.52-5.77-.156-11.773-2.654-17.218z", "barricade": "m197.492 19.762l9.692 43.058h-64.647l54.955 11.694l-55.892 74.422l77.238-43.059l7.553 58.887l20.033-69.545l-16.217-32.266l-.068-.133zm139.203 38.162c-26.949 0-48.677 21.869-48.677 49.178s21.728 49.18 48.677 49.18c26.95 0 48.68-21.872 48.68-49.18c0-27.31-21.73-49.178-48.68-49.178m-69.033 1.435c-6.037-.12-11.96.993-17.568 3.082l8.107 16.131c6.257-2.083 12.465-1.907 17.947.479a67.5 67.5 0 0 1 9.77-15.381c-6.068-2.838-12.219-4.19-18.256-4.31zm-43.205 139.053c-8.19.162-16.587 2.51-22.791 8.658c-8.732 8.652-12.31 20.356-12.17 31.985s3.637 23.506 9.012 34.87c1.852 3.919 3.99 7.743 6.248 11.507c-17.595 2.88-32.761 3.337-48.861 1.576c2.212-3.788 4.138-7.686 5.48-11.764c3.23-9.81 3.336-20.817-1.604-30.805c-7.19-14.538-23.07-23.922-40.39-25.718c-17.32-1.797-37.05 5.536-48.096 25.32l-.43.771l-.273.842c-4.044 12.485-2.03 24.454 4.38 32.848c6.209 8.126 15.297 12.995 25.026 16.498h17.576l2.659 5.318l.353.073l-.222.185l8.279 16.565c8.666-5.656 11.814-12.884 16.443-22.141h67.608l10.959-6.047l12.808 5.92a35 35 0 0 0 1.606-.62c12.233-5.157 23.172-11.977 31.172-21.083c7.999-9.106 12.85-20.95 11.74-33.938c-1.486-17.368-16.443-29.298-32.121-35.818c-8.266-2.786-16.934-5.078-24.391-5.002m1.86 18.004c5.47.074 11.067 1.763 15.617 3.617c11.712 4.871 20.551 14.338 21.1 20.735c.676 7.923-1.84 14.27-7.33 20.523c-5.494 6.252-14.17 11.959-24.645 16.377a114 114 0 0 1-7.97 2.996c-3.161-4.668-5.994-9.536-8.31-14.434c-4.56-9.645-7.187-19.336-7.285-27.392s1.968-14.156 6.84-18.983c3.548-2.578 7.727-3.497 11.982-3.439zm-113.11 19.988c10.382.084 25.994 7.69 30.43 16.014c2.69 5.439 2.757 10.77.64 17.2c-1.562 4.745-4.488 9.9-8.406 15.038c-10.05-1.39-20.343-3.272-28.986-6.293c-14.593-5.753-23.412-12.353-19.38-26.326c6.746-11.5 15.932-15.577 25.702-15.633M375.924 249l28.756 57.514l13.937-27.875L403.801 249zm77.639 0l-48.596 97.191l33.451-11.15L481.438 249zm-132.35 3.99c-16.417 1.038-28.12 9.49-29.205 25.674c-.071 15.51 8.313 29.383 16.414 40.613c-5.552.816-11.352 1.107-17.104.95c26.16 11.914 51.667 25.203 77.373 38.056l1.307-.435c-6.007-5.247-18.502-16.5-30.662-29.641c11.35-5.98 20.494-14.8 24.414-27.338c2.963-9.477 1.57-18.947-2.596-26.238c-9.02-13.823-24.812-21.435-39.941-21.64zm-.28 18.123c5.03-.2 10.634 1.597 14.41 3.463c8.69 4.386 13.611 12.962 11.227 20.922c-2.51 8.026-9.61 14.362-19.5 18.652c-6.389-8.15-11.73-16.343-14.59-23.273c-1.885-4.57-2.645-8.489-2.498-11.256c1.47-6.114 5.923-8.308 10.952-8.508zm-96.574 38.002l-25.156 13.88l-33.82 67.644L213.563 487h40.705l40.09-16.037l-21.651-15.332l-1.96-1.568l-7.677-6.141l56.764-59.385l83.709 36.041l36.258 46.356L403.738 487H487V386.725l-26.676-40.012l-93.015 31.004l-67.21-33.606zM78.562 313l28.758 57.514l13.938-27.875L106.438 313zm77.64 0l-87 174h27.874l87-174zM24.294 323.922l-.147 20.387c15.414 6.845 33.319 5.708 50.362.837l-8.239-16.478c-14.695 4.325-31.397 2.725-41.976-4.746m.705 42.64V487h24.076l48.18-96.361l-10.596-21.192l-39.924 7.985zm299.203 43.454l-34.217 35.796l62.55 44.293l58.888-26.234l-19.225-24.58zm-168.883.748l-13.937 27.875L165.563 487h27.875zm-24.002 48L117.201 487h28.237z", "biohazard": "M158.03 41.656c-19.755 22.934-31.78 52.76-31.78 85.406c0 23.544 6.228 45.667 17.125 64.782c-22.02.108-44.312 5.78-64.72 17.562c-28.266 16.32-48.113 41.64-58.093 70.22c9.484-15.492 23.012-28.562 39.844-38.282c23.238-13.417 49.246-17.604 73.813-13.72a126.2 126.2 0 0 0-3.907 31.22c0 57.436 38.516 106.03 91.062 121.375c-9.005 22.822-25.49 42.892-48.406 56.124c-16.838 9.722-35.253 14.313-53.407 14.78c29.763 5.674 61.89 1.723 90.187-14.624c20.317-11.732 36.307-28.117 47.406-47.03c11.1 18.922 27.08 35.325 47.406 47.06c28.296 16.35 60.422 20.268 90.188 14.595c-18.163-.466-36.574-5.03-53.406-14.75c-22.99-13.275-39.514-33.43-48.5-56.344c52.175-15.572 90.312-64.01 90.312-121.186a126.3 126.3 0 0 0-3.875-31.063c24.812-4.113 51.127.025 74.626 13.595c16.832 9.725 30.362 22.788 39.844 38.28c-9.978-28.58-29.826-53.896-58.094-70.217c-20.29-11.718-42.444-17.393-64.344-17.563c10.906-19.12 17.157-41.258 17.157-64.813c0-32.68-12.678-62.462-32.47-85.406c8.668 15.962 13.906 34.184 13.906 53.625c0 27.412-9.775 52.516-26.03 72.032c-22.69-21.61-53.39-34.906-87.126-34.906c-33.412 0-63.84 13.036-86.47 34.28c-15.94-19.424-25.5-44.29-25.5-71.405c0-19.44 4.58-37.662 13.25-53.624zm98.72 109.438c28.748 0 54.833 11.19 74.125 29.47c-17.373 14.994-39.375 24.76-63.594 26.874v19.812c12.912 3.6 22.283 15.35 22.283 29.47c0 2.39-.272 4.708-.782 6.936l17.44 9.5c14.018-19.577 33.415-33.477 54.967-40.844a108.4 108.4 0 0 1 3.282 26.532c0 48.918-32.41 90.075-76.97 103.28c-5.058-23.923-2.37-49.563 9.125-72.905l-17.438-9.5c-5.385 4.726-12.45 7.592-20.25 7.592c-8.056 0-15.342-3.05-20.78-8.062l-20.032 10.78c11.2 23.207 13.728 48.628 8.656 72.345c-44.973-12.95-77.78-54.324-77.78-103.53c0-9.25 1.163-18.223 3.344-26.783c22.14 7.39 42.055 21.663 56.28 41.875l20.345-10.968a31 31 0 0 1-.626-6.25c0-13.38 8.396-24.635 20.25-28.845V207.53c-24.962-1.917-47.63-11.958-65.375-27.5c19.238-17.95 45.074-28.936 73.53-28.936", "blood": "M18 18v229.88c22.044 9.644 49.156-17.056 37.773-38.415c-9.77-18.333-28.462-64.016 2.426-62.99c28.694.953-6.267 51.97 28.515 57.074c34.492 3.933 27.964-35.193 22.09-56.23c-.83-24.395 41.38-26.67 43.338-2.185c8.49 38.33 1.755 77.958-10.797 114.553c-6.183 26.524 23.463 53.067 48.754 40.68c21.484-8.98 27.2-37.24 15.63-56.155c-9.393-21.09-14.358-46.482-7.056-68.848c15.266-17.564 34.26-2.558 31.67 19.4c-2.603 22.057 34.583 31.325 47.707 12.366c12.132-13.536-3.528-44.482 25.866-38.55c24.315 8.45 20.396 42.19 23.975 63.074c1.875 57.63-4.794 115.585-17.48 171.766c-6.737 21.168-15.6 49.026 4.77 65.818c20.44 19.52 57 2.728 57.87-24.834c.22-41.152-14.95-80.59-16.593-121.685c-1.99-51.07-6.23-102.407-1.945-153.452c-1.35-22.65 26.44-52.9 47.29-33.247c14.973 22.996-3.973 48.37-2.218 71.568c2.93 38.73 64.42 11.456 42.328-19.217c-15.696-21.732 21.673-62.3 29.37-24.413c9.04 28.41 11.366 62.216-2.663 88.127c-10.492 19.376-17.404 46.694 5.806 56.666c7.55 3.914 15.26 3.6 19.574-.25V18zm58.988 120.832c21.007 14.74 2.246 37.2 10.23 48.88c1.113 2.357 9.44 7.467 7.966 7.622c-27.937-2.57-17.47-21.197-16.758-39.598c-1.642-9.125-3.514-16.687-1.438-16.904m83.46 9.176c15.11 37.11 14.654 71.48.814 107.937c-7.613 16.268 12.677 35.28 19.03 39.336c-27.713-3.024-36.51-30.838-25.93-52.378c9.564-30.688 12.476-54.2 6.085-94.894zm79.997 28.32c-.87 14.396 8.95 22.896 30.348 29.96c-17.49 11.152-43.003-10.59-30.348-29.96m167.602 13.215c1.624-.008 3.56 2.88 5.043 10.062c3.194 15.478 16.705 9.406 26.406.688c.426 17.666-31.39 25.417-34.154 3.49c-1.372-8.03.33-14.228 2.705-14.24m78.185 14.55a.4.4 0 0 1 .147.013c.786 6.186 1.374 13.183 1.243 19.416c3.29 24.09-15.953 44.724-7.834 67.03c4.092 11.247 3.7 18.713-7.085 10.108c-13.438-12.492-2.112-35.942 4.592-52.05c6.498-9.613 5.937-44.258 8.935-44.518zm-150.543 59.9c4.252 13.3 1.957 33.317 3.156 48.777c-1.066 44.92-10.64 87.364-14.39 131.2c-.59 6.89 13.26 28.558-1.274 20.708c-17.077-9.554-10.357-31.603-7.137-46.46c13.697-50.267 17.806-102.36 19.644-154.226z", "brain-leak": "M305.4 18.57c-7.1.02-14 1.78-19.2 5.53c-5.1 3.9-9.2 9.7-12.3 17c-9.6 27.56-7.9 53.89-8.1 82.9v.1h-18.7v-.1c-.3-26.58 1.2-60.32-8.1-82.9c-3.1-7.3-7.2-13.1-12.3-17c-11-6.86-33.9-8.65-44 2.4c-3.6 4.3-5.5 10.1-.1 22.2c5.8 8.8 10.4 20.85 14.4 36.37l-18.2 4.66C172.1 63.46 163.7 52.9 158 50.4c-14.6-4.94-39.3 17.69-39 30.32c3.9 14.08 15.3 21.48 28 27.48l-8 16.9c-5.1-2.5-9.6-5-13.7-7.6c-14.7-8.1-25.51-11.6-31.31-11.1c-13.93 1.5-21.03 32.8-16.2 41.3c2.4 3.9 8.5 8.1 22.91 9.5c4.8-.2 8.6.7 12.8.6l.2 18.7c-4.3 0-8.3-.1-12.1-.4c-12.11-.1-19.31.9-22.31 2.4c-6.45 5.8-8.37 18.5-5.5 26.3c1.1 2.5 2.6 4.4 6.3 6.4c7.4 4 24.41 6.5 52.61 4.1l1.6 18.6c-21.6 1.8-37.91 1.5-50.41-1.6c-1.8 18.5 16.05 26.8 32.91 27.1h103.8c12.1 0 22.6-8.9 26.7-25.1l8-32l10 31.5c5.3 16.6 16.2 25.6 26.9 25.6H396c6.3 0 18.4-3.9 25.6-10.2c4.9-4.6 8.7-10.7 7.5-17.1c-12.6 3.3-29.1 3.7-51.4 1.8l1.6-18.6c28.2 2.4 45.1-.1 52.5-4.1c8.1-7.1 10.9-27.8.8-32.7c-2.9-1.5-10.2-2.5-22.2-2.4c-3.8.3-7.8.4-12.1.4l.2-18.7c4.3-.2 8.8-.5 12.8-.6c14.4-1.4 20.5-5.6 22.8-9.5c5.2-12.8-4.8-40-16.1-41.3c-5.8-.5-16.6 3-31.3 11.1c-4.1 2.6-8.6 5.1-13.7 7.6l-8-16.9c5.1-2.2 8.7-4.8 13-7.3c11.5-7.69 14.8-14.74 15.1-20.2c-1-13.86-25.8-36.2-39-30.3c-2 .8-4.3 2.7-6.8 5.9c-6.4 10.05-11.6 23.71-14.2 33.41l-18-4.65c4.4-17.34 9.6-30.36 16.3-39.36c3.9-10 2.1-15.3-1.2-19.2c-6.2-5.12-15.6-7.96-24.8-7.93M256 272s-64 80-64 144c0 32 33.8 64 64 64s64-32 64-64c0-64-64-144-64-144", "brick-wall": "m494 18.02l-101 .103V119h101zm-119 .12l-238 .247V119h238zm-256 .266L18 18.51V119h101zM18 137v110h229V137zm247 0v110h229V137zM18 265v110h101V265zm119 0v110h238V265zm256 0v110h101V265zM18 393v100.98l229-.236V393zm247 0v100.727l229-.237V393z", "broken-wall": "m494 18.02l-101 .103V119h101zm-119 .12l-56.29 12.065l-31.01 64.361l-101.534-35.952L137 119h238zM18 137v61.63l12.416 31.981L62.575 247H247V137zm247 0v110h229V137zM76.294 322.591L18 332.203V375h101V265H65.317zM137 265v110h238c-48.428-109.932-.057-1.24-48.222-110zM18 393v100.98l199-.236L247 393zm247 0v55.79c66.067 45.222-.134-.028 65.798 44.869L494 493.49V393z", "bulb": "M313.3 17.086c-13.082 12.09-26.162 25.898-39.24 42.238c-40.78 61.662-59.706 130.838-39.908 213.328c-35.99-92.217-15.31-164.737 29.243-228.96c-1.796-8.394-4.97-16.178-9.848-23.335c-18.883 65.377-89.362 100.41-147.62 146.344c-32.994 28.667-51.81 58.787-57.06 89.454c-4.766 27.835 1.33 56.803 19.78 87.094c10.802-34.31 26.768-63.865 46.324-84.49l9.24-9.744l5.927 12.048c32.275 65.613 71.142 112.01 114.412 140.842c10.374-18.086 14.635-36.342 19.333-55.845l2.474-10.277l9.895 3.715c22.212 8.34 44.04 18.5 61.678 35.14c18.183-38.612 27.566-85.392 23.783-142.236l-.797-11.978l11.81 2.168c22.627 4.154 45.408 14.432 65.753 30.54c3.233-10.887 3.598-21.046 1.475-30.638c-2.42-10.94-8.185-21.423-17.627-31.346c-55.215-43.087-121.203-82.3-109.03-174.062zm145.86 206.742c1.99 13.81.06 28.272-5.61 42.79c14.545 14.657 27.26 32.713 36.968 54.05c6.42-42.19-8.148-71.86-31.358-96.84m-78.387 19.922c3.938 117.992-48.892 196.586-118.076 246.203c41.487-1.66 82.776-11.07 118.708-28.603c38.565-59.352 53.18-120.09 21.737-183.485c41.182 56.464 37.983 108.683 14.457 161.6c29.275-21.75 52.308-50.63 64.94-86.918c-18.195-60.55-60.133-96.758-101.767-108.797zm-351.93 23.576c-6.177 20.626-8.39 44.052-5.187 71.22c3.357 28.463 14.477 53.087 31.186 73.73c1.48-15.455 3.942-30.564 7.295-45.065c-23.806-33.228-35.06-67.02-33.294-99.884zm91.03 14.627c-25.597 33.54-44.708 89.362-47.594 148.688c25.046 22.66 57.76 39.022 93.898 48.803c-34.22-40.04-60.895-91.9-43.45-151.37c-9.138 65.866 35.742 116.368 82.06 159.146a328 328 0 0 0 24.355 2.382c21.233-12.672 41.274-27.57 59.058-45.157c-65.71-22.84-123.458-76.94-168.325-162.492zm159.564 79.024c-4.064 16.386-8.998 33.45-18.932 50.656c13.564 7.528 27.518 13.412 41.795 17.732c9.843-11.415 18.77-23.84 26.56-37.367c-13.084-13.78-30.284-23.143-49.424-31.02z", "burning-embers": "M239.344 24.063c-9.56 0-17.313 7.754-17.313 17.312s7.755 17.313 17.314 17.313c9.558 0 17.28-7.755 17.28-17.313c0-9.56-7.722-17.313-17.28-17.313zM39.594 35.75c-10.393 0-18.813 8.42-18.813 18.813c0 10.39 8.42 18.812 18.814 18.812s18.812-8.42 18.812-18.813s-8.42-18.812-18.812-18.812zM188.47 51.156c-14.34 0-25.97 11.6-25.97 25.938c0 14.336 11.63 25.97 25.97 25.97c14.337 0 25.968-11.634 25.968-25.97c0-14.338-11.63-25.938-25.97-25.938zm116.25 2.563c26.45 67.124-59.23 117.28-57 35.218c-40.215 36.923-12.817 84.228 4.78 121.874c13.34 28.545 12.342 53.843-10.125 63.47c-16.035 6.87-33.87-11.593-39.625-30.532c-1.254-4.128-1.663-9.237-1.47-15.375c9.652-.805 17.22-8.892 17.22-18.75c0-10.393-8.42-18.813-18.813-18.813s-18.812 8.42-18.812 18.813c0 7.014 3.84 13.14 9.53 16.375c-18.82 20.668-37.66 10.494-25.186-51.78c-59.608 67.83-38.06 198.86 45.03 238.874c-12.994-25.466-20.146-57.053-14.25-84c36.35 78.815 121.1 1.41 126.03-69.094c13.49 44.606 11.636 109.75-10.78 156.47c90.405-35.317 110.666-171.47 63-239.47c-5.868 82.112-70.492 50.032-44.03-58.406c6.495-26.622-12.05-57.205-25.5-64.875zM54.5 90.78c-9.56 0-17.313 7.756-17.313 17.314s7.754 17.312 17.313 17.312c9.56 0 17.313-7.755 17.313-17.312c0-9.56-7.754-17.313-17.313-17.313zm66.625 5.157c-11.525 0-20.844 9.352-20.844 20.876c0 2.88.57 5.628 1.626 8.124c-11.332 2.75-19.75 12.98-19.75 25.157c0 14.284 11.59 25.875 25.875 25.875c14.287 0 25.876-11.592 25.876-25.876a25.8 25.8 0 0 0-4.28-14.25c7.284-3.256 12.374-10.537 12.374-19.03c0-11.526-9.35-20.876-20.875-20.876zm258.28 22.376c-9.557 0-17.28 7.754-17.28 17.312s7.723 17.313 17.28 17.313c9.56 0 17.314-7.755 17.314-17.313c0-9.56-7.755-17.313-17.314-17.313zM99.814 196.5c-9.56 0-17.313 7.755-17.313 17.313s7.754 17.312 17.313 17.312s17.312-7.755 17.312-17.313S109.37 196.5 99.812 196.5zm1.406 168c-50.154 13.628-82.564 33.797-82.564 56.188c0 41.017 106.546 74.375 237.72 74.375c131.172 0 237.687-33.358 237.687-74.375c0-22.31-32.125-42.562-81.97-56.188c17.232 8.88 27.5 19.243 27.5 30.438c0 32.13-82.28 58.562-183.218 58.562S73.687 427.065 73.687 394.937c0-11.254 10.125-21.528 27.532-30.437z", "cage": "M119 75v64H55v346h402V139h-64V75H128zm18 18h46v46h-46zm64 0h46v46h-46zm64 0h46v46h-46zm64 0h46v46h-46zM73 157h46v18H73zm64 0h46v18h-46zm64 0h46v18h-46zm64 0h46v18h-46zm64 0h46v18h-46zm64 0h46v18h-46zM73 193h46v46H73zm64 0h46v46h-46zm64 0h46v46h-46zm64 0h46v46h-46zm64 0h46v46h-46zm64 0h46v46h-46zM73 257h46v46H73zm64 0h46v46h-46zm64 0h46v46h-46zm70.508 0h96.984l-26.287 46h20.73L375 281.889v156.22L362.937 417h-20.732l26.287 50h-96.984l26.287-50h-20.733L265 438.11V281.888L277.064 303h20.73zM393 257h46v46h-46zM73 321h46v46H73zm64 0h46v46h-46zm64 0h46v46h-46zm88 0v78h62v-78zm104 0h46v46h-46zm-73 10.043c7.732 0 14 6.268 14 14a14 14 0 0 1-5.19 10.87l5.19 31.13h-28l5.19-31.135a14 14 0 0 1-5.19-10.865c0-7.732 6.268-14 14-14M73 385h46v46H73zm64 0h46v46h-46zm64 0h46v46h-46zm192 0h46v46h-46zM73 449h46v18H73zm64 0h46v18h-46zm64 0h46v18h-46zm192 0h46v18h-46z", "card-burn": "M280.693 64.92c-5.164-.024-11.614 1.387-18.687 6.205c-55.605 39.039-112.172 76.494-169.584 112.826c-10.2 6.621-9.75 16.6 1.017 22.27l128.75 67.761c5.384 2.835 22.414 2.056 32.614-4.564l169.834-110.232c10.199-6.622 9.75-16.598-1.014-22.268c-44.669-23.51-85.78-45.116-130.578-68.865c0 0-4.803-3.099-12.352-3.133m6.416 27.547l-13.504 69.37l113.612-14.685l-2.84 15.22l-113.773 14.878l-13.672 70.232l-25.643 3.53l13.838-70.43l-117.033 15.305l3.205-15.655l116.865-15.105l13.668-69.565zm41.246 146.324l-65.74 42.674c-14.563 9.45-37.135 10.479-52.5 2.389L175.29 265.53l-87.236 41.375c-10.983 5.203-10.69 12.999.66 17.354l121.242 46.617v.006c11.35 4.368 29.494 3.66 40.477-1.535l166.992-79.196c10.985-5.194 10.68-12.996-.664-17.353l-88.405-34.008zm93.614 65.094l-165.393 78.44c-14.544 6.88-36.751 7.734-51.775 1.958L83.81 337.76c-6.4 4.962-4.722 11.122 4.902 14.812l121.242 46.625h.002c11.349 4.363 29.494 3.663 40.477-1.533l166.992-79.193c8.922-4.218 10.398-10.162 4.543-14.586zm0 28.318l-165.393 78.44c-14.544 6.874-36.751 7.729-51.775 1.959L83.81 366.078c-6.4 4.963-4.722 11.125 4.902 14.815l121.242 46.625h.002c11.349 4.362 29.494 3.66 40.477-1.534l166.992-79.2c8.922-4.22 10.398-10.165 4.543-14.58zm-.002 28.32l-165.393 78.434c-14.544 6.88-36.75 7.735-51.773 1.959L83.81 394.4c-6.4 4.96-4.721 11.119 4.902 14.809l121.242 46.623v-.002c11.35 4.37 29.494 3.663 40.477-1.533l166.994-79.193c8.922-4.22 10.396-10.164 4.54-14.58zm-3.871 30.153l-161.522 76.6c-14.544 6.88-36.75 7.737-51.773 1.96L87.924 424.293c-10.853 5.201-10.52 12.949.789 17.289l121.24 46.62h.002c11.35 4.366 29.492 3.66 40.475-1.534l166.996-79.193c10.534-4.98 10.684-12.363.67-16.8z", "cat": "m463.46 37.008l-30.694 50.738l-7.043-2.28c-27.146-8.797-71.525-7.15-97.6.11L321.22 87.5l-28.68-48.543c-33.63 69.254-32.264 117.56-14.79 148.574c18.71 33.208 57.378 49.09 99.117 48.574c48.743-.606 88.968-19.665 107.035-54.194c16.918-32.332 15.684-80.456-20.443-144.902zM323.935 137.594c18.45.1 29.36 15.338 31.462 36.644c-37.11 17.91-53.963 3.398-61.173-26.545c11.382-7.063 21.324-10.144 29.71-10.1zm109.26 0c8.385-.045 18.328 3.036 29.71 10.1c-7.21 29.942-24.064 44.454-61.174 26.544c2.104-21.306 13.014-36.545 31.463-36.644zm-293.553 50.96q-1.839-.014-3.66.018c-30.175.536-56.142 10.59-75.743 26.574c-43.444 35.43-57.27 100.752-12.824 166.192c20.293 33.995 44.432 54.24 70.797 64.187c32.85 12.395 66.655 8.823 99.94 4.114s65.854-10.63 96.896-8.42c31.04 2.212 62.09 10.18 90.505 41.165c19.374 21.125 46.887-1.627 23.82-24.156c-35.024-34.207-72.527-47.42-109.377-50.04s-72.2 4.698-104.207 9.228s-60.272 6.552-84.558-2.61c-14.39-5.43-28.308-14.802-41.55-31.142h351.744c13.673-52.293 14.867-106.368 1.873-142.072c-19.765 8.49-42.412 12.9-66.2 13.197h-.002c-29.85.37-59.458-6.925-82.907-22.823a426 426 0 0 0-14.292 9.685l-5.734 4.057l-5.49-4.382c-46.63-37.2-91.028-52.48-129.03-52.773z", "chess-pawn": "M312.07 194.46A56.07 56.07 0 1 1 256 138.39a56.07 56.07 0 0 1 56.07 56.07M406 418.01H106v60h300zM282.33 261.52a71.8 71.8 0 0 1-52.15.2c-.73 58.91-62.35 114.06-96.75 140.28H378.9c-34.09-26.33-95.44-81.78-96.57-140.48", "clover": "M256 16c-24 0-72 24-72 48s48 24 72 96c24-72 72-72 72-96s-48-48-72-48M64 184c-24 0-48 48-48 72s24 72 48 72s24-48 96-72c-72-24-72-72-96-72m384 0c-24 0-24 48-96 72c72 24 72 72 96 72s48-48 48-72s-24-72-48-72m-189.906.03A72 72 0 0 0 184 256a72 72 0 0 0 144 0a72 72 0 0 0-69.906-71.97M256 352c-24 72-72 72-72 96s48 48 72 48s72-24 72-48s-48-24-72-96", "cog-lock": "M253.922 20.86c-38.28 0-74.42 9.152-106.36 25.376l11.967 20.73c29.084-15.037 62.08-23.538 97.044-23.538c35.998 0 69.908 9.015 99.613 24.892l10.727-18.58c-33.535-18.404-72.04-28.88-112.992-28.88zM131.246 55.356C66.09 95.27 21.88 166.017 18.902 247.297h25.97c2.682-71.938 41.318-134.77 98.45-171.022l-12.076-20.918zm251.682 4.028l-10.662 18.467c55.79 36.48 93.37 98.538 96.01 169.447h20.67c-2.88-78.62-44.34-147.377-106.018-187.915zm-133.62 2.88C184.307 64.66 127.58 99.067 94.4 150.218l46.106 26.618a141 141 0 0 0-9.393 16.158L85 166.373c-13.8 26.61-21.603 56.844-21.603 88.926c0 32.418 7.97 62.948 22.042 89.76l45.917-26.51a141 141 0 0 0 9.457 16.12L94.92 361.166c33.25 50.713 89.725 84.778 154.393 87.162v-52.113c2.685.152 5.39.238 8.112.238q5.34-.002 10.578-.392v52.07c63.662-3.702 118.987-38.127 151.375-88.706l-44.652-25.78c3.45-5.17 6.565-10.58 9.318-16.2l44.64 25.77c13.475-26.36 21.074-56.24 21.074-87.915c0-31.34-7.447-60.917-20.656-87.073l-44.82 25.875a140 140 0 0 0-9.26-16.233l44.857-25.897c-32.316-51.016-87.88-85.79-151.877-89.512v52.544c-3.492-.26-7.018-.395-10.576-.395c-2.724 0-5.428.085-8.113.238V62.264zm-37.177 69.422l20.276 35.145a92.7 92.7 0 0 1 24.867-3.383c8.623 0 16.97 1.184 24.89 3.388l20.278-35.15l40.14 23.078l-20.355 35.283c11.824 11.63 20.54 26.41 24.785 42.985h40.722v46.156h-40.74c-4.253 16.56-12.974 31.322-24.795 42.94l20.383 35.33l-40.14 23.077l-20.315-35.213a92.7 92.7 0 0 1-24.852 3.38c-8.6 0-16.927-1.18-24.83-3.374l-20.312 35.207l-40.136-23.078l20.37-35.312c-11.828-11.62-20.554-26.39-24.81-42.957H126.84v-46.155h40.697c4.246-16.583 12.967-31.37 24.8-43.006l-20.343-35.264l40.137-23.078zm-193.185 134.3c3.365 80.998 47.677 151.42 112.797 191.085l12.725-22.04c-57.045-35.686-95.94-97.754-99.492-169.046zm449.23 0c-3.5 70.267-41.33 131.58-97.036 167.5l11.3 19.572c61.64-40.295 103.206-108.731 106.46-187.071h-20.726zm-113.18 176.915c-29.42 15.485-62.903 24.264-98.42 24.264c-34.484 0-67.055-8.27-95.846-22.922l-12.646 21.9c31.814 16.06 67.766 25.116 105.838 25.116c40.746 0 79.07-10.366 112.484-28.596z", "cold-heart": "M319.006 19.88L280.51 30.192l-10.315 38.495l14.366 14.365l-44.04 11.8l3.86 14.4l-14.403 14.405l9.523 35.537c-6.727-3.505-13.903-5.83-21.195-6.89l-6.37-23.774l-19.75-5.292l-3.86-14.4l-44.128 11.824l5.272-19.676l-28.183-28.18L82.79 83.12l-10.313 38.497l28.18 28.182l19.78-5.302l-11.796 44.02l14.413 3.86l5.27 19.673l19.333 5.18c-.234 6.7.35 13.298 1.584 19.774l-25.713-6.89l-14.46 14.46l-14.413-3.86l-11.814 44.09l-14.512-14.51l-38.496 10.313l-10.316 38.497l28.18 28.18l38.497-10.313l5.328-19.882l32.382 32.383l10.563-10.56l19.72 5.283l32.077-32.076c3.693 5.467 7.297 10.755 10.63 15.8l-29.497 29.5l5.28 19.702l-10.562 10.56l32.35 32.35l-19.834 5.316l-10.316 38.496l28.18 28.18l38.496-10.315l10.315-38.494l-14.676-14.678l44.188-11.84l-3.824-14.265l14.46-14.46l-11.054-41.257c5.476-2.7 11.17-5.46 17.1-8.383l12.016 44.842l19.673 5.27l3.822 14.27l44.095-11.817l-5.357 19.996l28.182 28.18l38.496-10.314l10.314-38.496l-28.18-28.182l-19.898 5.332l11.846-44.21l-14.252-3.817l-5.29-19.75l-27.593-7.395c4.258-5.043 7.94-10.498 10.867-16.433l21.6 5.787l14.402-14.403l14.254 3.818l11.826-44.13l14.528 14.526l38.496-10.314l10.316-38.496l-28.182-28.182l-38.496 10.315l-5.302 19.79l-32.204-32.204l-10.425 10.423l-19.705-5.28l-17.827 17.827c-6.376-3.127-13.32-5.12-20.533-5.896l25.14-25.14l-5.284-19.72l10.424-10.423l-32.233-32.235l19.834-5.315l10.316-38.496zm-110.77 150.438a50 50 0 0 1 3.612.086c19.263 1.154 39.154 14.41 46.09 39.83l-5.772 21.537l-19.912-19.91l-13.213 13.214l19.913 19.912l-27.2 7.287l4.837 18.053l27.2-7.287l-7.29 27.198l18.053 4.838l7.29-27.203l19.91 19.912l13.216-13.215l-19.913-19.91l27.2-7.29l-4.835-18.05l-27.203 7.29l6.684-24.952c18.676-16.51 39.705-17.307 55.352-9.117c16.562 8.67 27.495 27.23 21.273 53.75c-6.026 25.684-33.025 44.145-63.003 59.603c-14.99 7.728-30.364 14.645-43.517 21.795c-6.316 3.432-12.16 6.844-17.27 10.644c-2.464-6.242-5.88-12.455-9.69-18.805c-7.628-12.707-17.248-25.98-26.21-39.757c-17.925-27.558-32.38-56.28-25.936-83.83c5.883-25.135 22.363-35.392 40.332-35.622z", "conversation": "M211.313 21.094c-51.776 0-98.754 12.252-133.5 32.718C43.066 74.28 19.874 103.78 19.874 137.69c0 33.54 22.692 62.81 56.813 83.25L48.156 327.094l96.97-79.844c20.65 4.58 42.924 7.063 66.186 7.063c51.776 0 98.786-12.252 133.532-32.72c34.746-20.466 57.937-49.997 57.937-83.905s-23.19-63.41-57.936-83.875c-34.746-20.467-81.756-32.72-133.53-32.72zm0 18.687c48.8 0 92.866 11.77 124.03 30.126s48.75 42.447 48.75 67.78c0 25.338-17.585 49.457-48.75 67.814s-75.23 30.125-124.03 30.125S118.445 223.857 87.28 205.5c-31.163-18.357-48.718-42.476-48.718-67.813c0-25.336 17.555-49.424 48.72-67.78C118.445 51.55 162.51 39.78 211.31 39.78zM96.53 89.938v18.688h93.126V89.937H96.53zm111.814 0v18.688h28.094V89.937h-28.094zm46.78 0v18.688h71.97V89.937h-71.97zM96.532 129.844v18.72h29.657v-18.72H96.53zm48.345 0v18.72h65.938v-18.72zm84.656 0v18.72h38.095v-18.72H229.53zm56.782 0v18.72h40.782v-18.72h-40.78zM96.532 166.78v18.69h70.874v-18.69H96.53zm89.562 0v18.69h57.03v-18.69zm75.72 0l-.002 18.69h65.282v-18.69zm92.342 90.25c-74.88 0-135.594 41.762-135.594 93.283s60.716 93.28 135.594 93.28c18.23 0 35.623-2.48 51.5-6.968l68.53 51.156l-24.873-71.03c24.947-16.918 40.437-40.432 40.437-66.438c0-51.518-60.714-93.28-135.594-93.28zm-70.344 42.345h32.907v18.688H283.81v-18.688zm51.594 0h90.344v18.688h-90.344zm-78.97 41.75h78.314v18.688h-78.313zm97.002 0h20.968v18.688h-20.97zm39.656 0h51v18.688h-51zm-109.28 39h79.06v18.688h-79.062v-18.688zm97.748 0h44.188v18.688h-44.188z", "crossed-swords": "M19.75 14.438c59.538 112.29 142.51 202.35 232.28 292.718l3.626 3.75l.063-.062c21.827 21.93 44.04 43.923 66.405 66.25c-18.856 14.813-38.974 28.2-59.938 40.312l28.532 28.53l68.717-68.717c42.337 27.636 76.286 63.646 104.094 105.81l28.064-28.06c-42.47-27.493-79.74-60.206-106.03-103.876l68.936-68.938l-28.53-28.53c-11.115 21.853-24.413 42.015-39.47 60.593c-43.852-43.8-86.462-85.842-130.125-125.47c-.224-.203-.432-.422-.656-.625C183.624 122.75 108.515 63.91 19.75 14.437zm471.875 0c-83.038 46.28-154.122 100.78-221.97 161.156l22.814 21.562l56.81-56.812l13.22 13.187l-56.438 56.44l24.594 23.186c61.802-66.92 117.6-136.92 160.97-218.72zm-329.53 125.906l200.56 200.53a403 403 0 0 1-13.405 13.032L148.875 153.53zm-76.69 113.28l-28.5 28.532l68.907 68.906c-26.29 43.673-63.53 76.414-106 103.907l28.063 28.06c27.807-42.164 61.758-78.174 104.094-105.81l68.718 68.717l28.53-28.53c-20.962-12.113-41.08-25.5-59.937-40.313c17.865-17.83 35.61-35.433 53.157-52.97l-24.843-25.655l-55.47 55.467c-4.565-4.238-9.014-8.62-13.374-13.062l55.844-55.844l-24.53-25.374c-18.28 17.856-36.602 36.06-55.158 54.594c-15.068-18.587-28.38-38.758-39.5-60.625z", "crossroad": "m164 16l-32 16l32 32l64 16V32zm184 0l-64 16v48l64-16l32-32zM247 32v112h18V32zM16 64l182.7 182.7L96 496h320L313.3 246.7L496 64h-64L256 192L80 64z", "cut-palm": "M320.977 18.703q-.744-.015-1.463.008c-1.358.09-2.045.27-3.057.4L220.38 169.796c1.53 6.565 3.088 13.04 4.778 19.226l-18.027 4.926c-9.073-33.212-15.026-70.992-26.538-94.735c-5.757-11.872-12.47-19.702-20.625-23.246c-6.714-2.92-15.483-3.28-27.63.6c17.258 50.103 24.184 102.383 33.495 143.826c4.933 21.958 10.617 40.805 18.21 54.317c7.59 13.51 16.324 21.482 29.108 24.625l-4.463 18.148c-18.367-4.515-31.723-17.217-40.94-33.62c-4.192-7.46-7.682-15.74-10.726-24.673c-30.794 33.74-75.13 70.583-137.602 98.473v135.72h140.437c22.443-42.52 44.626-79.104 66.23-105.74c22.48-27.712 44.393-46.065 68.247-46.47l-.19.006l2.985-.112l-28.434-81.853l21.164-7.057l-33.67-79.035l68.99 92.844l-27.9 7.52l31.3 66.41l149.417-5.558c4.266-5.493 7.614-14.578 8.1-23.91c.467-8.97-1.767-17.213-5.073-22.166l-119.5 3.42c.137-8.21-.404-16.456-1.55-24.627l130.184-45.302c2.502-6.403 2.67-15.49-.002-24.108c-2.58-8.326-7.588-15.26-12.38-18.79l-130.13 43.943a177 177 0 0 0-12.177-23.694l108.244-77.542c.024-6.105-2.634-14.563-7.788-21.476c-5.365-7.196-12.655-12.406-19.1-14.172l-109.396 79.31c-6.44-5.683-13.267-10.506-20.36-14.316L358.24 39.23c-2.26-4.454-6.892-9.397-13.256-13.218c-7.39-4.438-16.575-7.177-24.007-7.31zm-8.975 336.23c-3.66 51.045-31.82 66.58-31.82 95.014c0 14.116 15.503 26.684 31.82 26.684c15.958 0 32.457-12.494 32.457-27.357c0-29.613-27.877-43.213-32.458-94.34z", "dead-wood": "m290.78 9.563l-19.5 72.53l70.033 26.813l-39.282 40.813c-15.52 8.456-27.103 8.22-37.31 2.124c-.014-.008-.02-.024-.033-.03l-5.093-11.064l41.844-33.5l-49.375 17.22l-29.875-64.626l14.406-31.375l-31.656 22.56V51l-91.344-20.094l90.75 37.844l11.53 24.938l-62.25 13.25l-33.31-41.626l15.78 45.344l-26.156 5.563L50.25 77.843l26.344 30.062l-39.906 31.938l52.03-18.125l13.907 15.843l80.563-16.938l-3.22 43.75l20.782-47.438l23.656-4.968l23.406 50.624c1.88 9.953 2.716 19.126 2.282 27.125l-45.188-17.657l41.188 35.562c-6.098 12.943-19.27 18.24-41.344 11.594l-75.344-49.97l-27.97 18.53l-16.405-37.343l3.376 46l-9.53 6.313l-65.157-49.344l61.5 74.938l54.186-35.938c10.9 7.49 21.867 14.905 32.844 22.28l-12.125 41.72l-48.75 20.22l63.97-3.782l13.593-47.03c5.696 3.787 11.38 7.58 17.093 11.342c49.537 75.88 57.073 189.32 1.97 176.688c9.086 38.633-24.273 67.905-54.844 81.062h28.03l-.03-.062c25.217-7.956 40.217-20.772 55.906-45.813c.113 17.364-7.4 33.346-20.875 45.876h66c-17.686-16.632-27.36-43.79-15.062-88.53c2.454 40.996 14.77 72.124 53.156 88.5v.03h25.97c-69.106-37.694-84.94-111.418-50.094-182.53l36.28-43.47l62.158 17.25l-38.188-24.28l18.156-45.72l-32.156 36.813l-14.22-9.064l-13.842 16.53c-7.277-7.843-9.635-21.475-7.78-38.405c2.074-18.954 9.395-40.43 17.123-56.25l15.938-16.405l41.53 25.97l13.408 57.28l79.75 21.938L401 219.22l-10.438-45.782l26.97-12.594L461.187 209l-26.72-56.063l9.813-4.593l50.47-2.875l-34.656-13l19.437-52.19l-40.374 49.845l-59.406 27.72l-36.28-22.72l24.124-24.844l42.437-33.968l-52.31 18.22l-5.408-2.094L392.75 13.31l-58.063 72.313l-43.906-16.938V9.563zm-13.5 224.687c.254 15.565 4.228 30.356 15 40.594l-12.186 14.562c-9.453-13.425-9.047-33.08-2.813-55.156zm-53.78 14.28c26.69 17.688 39.887 60.23 23.75 88.595c-3.706-24.886-12.738-58.882-25.688-85.188l1.938-3.406z", "dice-six-faces-one": "M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36zM256 206a50 50 0 0 1 0 100a50 50 0 0 1 0-100", "door-watcher": "M105 25v462h302V25zm44 28h214v150H149zm18 18v114h178V71zm16 16h146v82H183zm15.8 25c.8 7.9 5.2 18 11.1 24.8c11.2-.2 25.9-3.4 36.1-8.8c-21-2.3-38.9-9.3-47.2-16m114.4 0c-8.3 6.7-26.2 13.7-47.2 16c10.2 5.4 24.9 8.6 36.1 8.8c5.9-6.8 10.3-16.9 11.1-24.8M256 279h128v18h-17v14h17v18h-64v-18h29v-14h-93z", "dream-catcher": "M248 16v32.24c-65 3.79-117.8 53.36-126.7 116.86c-5-3.2-10.9-5.1-17.3-5.1c-17.58 0-32 14.4-32 32c0 14.8 10.21 27.4 23.92 31l3.16 30.2c-.25 63.8 2.62 135.7-2.38 202.3c-2.8-7.3-3.04-12.1-4.52-20.9l-12.22 2.2c2.2 13.7 4.98 27 13.12 38.9c23.92-9.3 30.22-60.9 36.62-93.9l-20.9-11.6l24.3-7c2.3-14.3 3.8-23.3 4.6-32.4l-19.5-15.2l20.2.2c0-3.9 0-8.1-.1-12.9c-.4-13-11.8-42-23.3-48.2l-3.3-31.7c4.6-1.1 8.7-3.2 12.3-6.1c14.2 56.7 63.9 99.4 124 102.9v9.6c-9.3 3.3-16 12.2-16 22.6c0 11.6 8.3 21.3 19.3 23.5c-12.5 3.6-25.2 19.2-23.8 26.2c8.3 41.6 14.9 88.6 30.8 93.1c19.6-19.7 21.6-59.3 25.5-97.1c.5-4.8-11.6-18.8-23-22.2c10.9-2.3 19.2-12 19.2-23.5c0-10.4-6.7-19.3-16-22.6v-9.6c60.1-3.5 109.8-46.2 124-102.9c3.9 3.1 8.5 5.4 13.5 6.4l3.3 42.1c-11.6 5.4-21.7 20.6-22.1 32.1c-.6 22.2.9 46.4 5.3 70.2l23.2 10.2l-21.2-.3c.4 1.9.8 3.7 1.3 5.6l7.6 8.2l-5.1 1.4c7.1 25.3 17.8 49 32.9 67.8c5.5-10.5 9.8-22.1 13.1-34.4l-12.2-1.9c-.6 7.8-1.3 15.6-2.1 23.3c-5-58.5-4.6-127.2-4.8-183.6l-3.3-41.4c13.1-4.1 22.6-16.3 22.6-30.6c0-17.6-14.4-32-32-32c-6.4 0-12.3 1.9-17.3 5.1C381.8 101.6 329 52.03 264 48.24V16zm8 48c66.4 0 120 53.6 120 120s-53.6 120-120 120s-120-53.6-120-120S189.6 64 256 64m-4.8 15.01c-6.8.31-13.4 1.25-19.8 2.78c-3.7 7.84-6.2 16.07-7.6 24.41c-7-4.9-14.6-8.91-22.7-11.87c-5.7 3.5-11 7.57-16 11.97c14.3 3.1 27.1 9.9 37.4 19.4c.4 10.6 2.6 21.2 6.5 31.3c-10.1-3.9-20.7-6.1-31.3-6.5c-9.5-10.3-16.3-23.1-19.4-37.3q-6.75 7.35-12 15.9c3 8.1 7.1 15.7 12 22.7c-8.4 1.4-16.7 3.9-24.5 7.6c-1.5 6.4-2.5 13-2.8 19.8c12.2-7.9 26.1-12.2 40.1-12.7c7.8 7.2 16.8 13.2 26.7 17.5c-9.9 4.3-18.9 10.3-26.7 17.6c-14-.6-27.9-4.8-40.1-12.7c.3 6.8 1.3 13.3 2.8 19.7c7.8 3.7 16.1 6.2 24.5 7.6c-4.9 7-9 14.6-12 22.7q5.25 8.55 12 15.9c3.1-14.2 9.9-27 19.4-37.3c10.6-.4 21.2-2.6 31.3-6.5c-3.9 10.1-6.1 20.6-6.5 31.3c-10.3 9.5-23.1 16.3-37.4 19.3c4.9 4.5 10.3 8.6 16 12.1c8.2-3 15.8-7 22.7-11.9c1.4 8.4 3.9 16.6 7.6 24.4c6.4 1.5 12.9 2.5 19.7 2.8c-7.9-12.2-12.1-26-12.7-40.1c7.3-7.8 13.3-16.8 17.6-26.7c4.3 9.9 10.3 18.9 17.5 26.7c-.5 14-4.8 27.9-12.7 40.1c6.8-.3 13.4-1.3 19.8-2.8c3.7-7.8 6.2-16 7.6-24.4c7 4.9 14.6 8.9 22.7 11.9c5.7-3.5 11.1-7.6 16-12.1c-14.3-3-27.1-9.8-37.4-19.3c-.4-10.6-2.5-21.2-6.5-31.3c10.1 4 20.7 6.1 31.3 6.5c9.5 10.3 16.3 23.1 19.4 37.3q6.75-7.35 12-15.9c-3-8.1-7-15.7-11.9-22.7c8.4-1.4 16.6-3.9 24.4-7.6c1.5-6.4 2.5-13 2.8-19.8c-12.2 7.9-26.1 12.2-40.1 12.7c-7.8-7.2-16.8-13.2-26.7-17.5c9.9-4.3 18.9-10.3 26.7-17.6c14 .6 27.9 4.8 40.1 12.7c-.3-6.8-1.3-13.3-2.8-19.7c-7.8-3.7-16.1-6.2-24.5-7.6c4.9-7 9-14.6 12-22.7c-3.5-5.7-7.6-11.1-12.1-16c-3 14.3-9.8 27.1-19.3 37.4c-10.7.4-21.2 2.6-31.3 6.5c3.9-10.1 6.1-20.7 6.5-31.3c10.3-9.5 23.1-16.4 37.4-19.4c-5-4.5-10.3-8.47-16-11.97c-8.1 2.96-15.7 6.97-22.7 11.87c-1.4-8.34-3.9-16.57-7.6-24.41c-6.4-1.53-13-2.47-19.8-2.78c8 12.2 12.2 26.09 12.8 40.09c-7.3 7.8-13.3 16.8-17.6 26.7c-4.3-9.9-10.3-18.9-17.6-26.7c.6-14 4.8-27.89 12.8-40.09M256 160c13.2 0 24 10.8 24 24s-10.8 24-24 24s-24-10.8-24-24s10.8-24 24-24m-152 16c8.9 0 16 7.1 16 16s-7.1 16-16 16c-8.93 0-16-7.1-16-16s7.07-16 16-16m152 0c-4.5 0-8 3.5-8 8s3.5 8 8 8s8-3.5 8-8s-3.5-8-8-8m152 0c8.9 0 16 7.1 16 16s-7.1 16-16 16s-16-7.1-16-16s7.1-16 16-16M87.78 257.7c-10.12 5.9-18.62 15.3-18.82 22.9c-2 42.8-.7 90.8 8.7 145.9l14.42 5.6c-3.8-58.4-3.7-116.3-4.3-174.4M432 268c-.6 51.3-.5 102.5-4.3 154.1l14.4-5c7.6-31.7 9.6-67.4 9.3-103.2l-14.6-.3l14.4-8.4c0-5.7-.1-11.4-.4-17c-.2-6.7-8.7-15-18.8-20.2m-176 76c4.5 0 8 3.5 8 8s-3.5 8-8 8s-8-3.5-8-8s3.5-8 8-8m-4.2 31.6c1.4.3 2.8.4 4.2.4c1.3 0 2.5-.1 3.7-.3l-2.3 90.6z", "earth-crack": "m156.777 16.248l21.832 149.004l-83.165-78.248l40.946 125.732l-74.765-6.927l39.33 68.112h71.87l-11.512-38.73l28.125 15.234l1.17-49.223l44.537 51.568l14.064-78.52l17.58 60.94l57.425-39.846l-17.58 58.597l55.082-22.266l-30.912 42.248h80.834l37.17-63.13l-51.26 6.845l20.565-85.008l-70.873 48.905l48.37-111.842l-95.25 51.473l-12.266-100.908l-51.576 104.803l-32.53-87.51l-18.517 18.18l-28.693-39.482zm57.23 259.61l-48.064 34.892l20.48 27.527L59.384 355l8.42 66.527l-.506 2.99l-48.087 20.126V491.7h34.42l47.1-46.206l-18.678-74.63l46.343-6.1l3.358 54.933l1.685.75l39.685 32.815l-18.117 38.437h54.185L215 432.284l-65.352-26.19l-2.673-43.777l73.43-9.666l-28.182-37.886l53.593-38.91h-31.81zm60.124 0l49.722 58.437l-74.63 35.61l-4.355.222l52.588 62.935L266.69 491.7h72.033l-2.315-73.403L282.78 374.6l58.706-28.014l73.418 17.262l-45.13 72.213l41.003 55.112l.19.527h69.838l-78.51-55.122l14.45-35.62l77.86 30.75v-34.606l-68.937-15.215l18.912-30.26l-101.807-23.934l-44.103-51.836h-24.54z", "echo-ripples": "M490.594 16.5C475.867 89.867 453.31 155.58 422.5 214.063c-21.152 25.636-62.322 41.665-103.53 34.375c43.72-60.817 65.875-137.485 56.75-217.813c-16.566 59.05-35.182 107.876-58.876 150.063c-15.774 16.782-43.006 26.035-71.03 17.562c32.043-43.75 48.387-99.21 41.78-157.375c-10.346 33.145-23.852 63.82-40.313 92.094c-14.07 15.776-39.033 24.72-64.843 17.186c21.468-29.682 32.4-67.153 27.938-106.437c-8.185 18.823-17.562 36.73-28.063 53.718c-13.755 11.638-44.94 9.03-68.406.906l-1.03-.78c12.087-18.074 16.897-41.415 11.655-66.783a207 207 0 0 1-15.186 31.94c-10.587 17.13-38.888 3.862-57.5-8.782c15.907 14.915 32.82 40.912 17.375 58.53c-8.39 7.818-17.43 15.142-27.095 21.938c23.353-.655 43.408-8.87 58.125-22.22c22.488 19.768 27.623 50.15 16.688 65.876a424 424 0 0 1-40.657 34.188c37.302-4.225 69.916-21.612 93.75-47l1.407 1.125c11.843 22.98 8.502 48.584-3.718 65.188c-23.105 21.13-48.766 40.03-76.876 56.687c57.276-6.488 107.018-34.138 142.344-74.25l1.03.813c13.878 25.61 10.338 54.48-3.312 73.062c-35.078 31.465-77.614 59.935-130.312 88.625c80.3-9.095 150.015-47.894 199.437-104.22c19.344 39.258 12.064 82.842-10.25 109.47c-49.987 43.37-108.914 79.872-177.217 109.97C348.12 465.035 517.375 252.265 490.592 16.5z", "exit-door": "M217 28.098v455.804l142-42.597V70.697zm159.938 26.88l.062 2.327V87h16V55zM119 55v117.27h18V73h62V55zm258 50v16h16v-16zm0 34v236h16V139zm-240 58.727V233H41v46h96v35.273L195.273 256zM244 232c6.627 0 12 10.745 12 24s-5.373 24-12 24s-12-10.745-12-24s5.373-24 12-24M137 339.73h-18V448h18zM377 393v14h16v-14zm0 32v23h16v-23zM32 471v18h167v-18zm290.652 0l-60 18H480v-18z", "extra-time": "M194.6 18.26c25.7 28.26 20.8 70.34-14.8 81.68c-49.6 15.76-89.25-16.95-126.35-40.32C63.11 95.64 87.2 146.6 132 175.6c-26.5 17.2-61.33 23.7-97.65 28.3c40.69 20.2 81.95 38.7 129.75 42.2c-38.8 36.3-74.24 61.8-127.55 76.9c43.68 13.4 89.75 16.4 132.75 4.8c-38 43.8-59 88.9-72.05 134.7c34.95-16.2 64.55-44 117.55-38.8c-2.2 25.5 3.9 49.1 23.3 70c8.8-31.8 29-60.8 65.7-85.9c26.8 35.3 71.5 56.8 122.1 73.8c-22.8-33.6-51-66.5-41.8-105.4c6.3-25.9 35.5-48.8 79.8-44.7c-18.3-25.7-67.8-52.1-118.4-70.6c59.1-14.7 101.4-52 132.1-89.6c-47.3 4.5-109 22.9-141.5-10.1c37-37.6 72.4-82.4 78.4-127.04c-40.1 26.91-80.5 51.89-124.9 45.5c-18-23.1-41-46.25-95-61.4M309 91.24l9.5 48.96l-10.7 2.1c2 17.2 1 40.1-4.4 61.8c-3.1 12.8-7.9 25.2-15.1 35.3c-1.7 2.4-3.7 4.7-5.7 6.9c2.7 1.1 5.3 2.5 7.8 4.1c10.5 6.6 19.5 16.2 27.2 26.9c13.2 18 22.7 38.8 27.4 55.4l10.6-2.1l9.7 48.9l-161.7 32.3l-7.8-40.2l-1.7-8.8l10.7-2.1c-2-17.2-1-40.1 4.4-61.8c3.1-12.8 7.9-25.2 15.1-35.3c1.7-2.4 3.6-4.7 5.6-6.8c-2.7-1.2-5.2-2.6-7.7-4.2c-10.5-6.6-19.5-16.2-27.3-26.9c-13.1-18-22.6-38.8-27.3-55.4l-10.7 2.1l-7.8-40.1l-1.8-8.8zm-14.2 21.16l-126.3 25.3l2.6 13.5L297.5 126zm-4.9 33.4l-104.4 20.9c4.3 14 12.7 33 24 48.4c6.8 9.4 14.6 17.4 22.3 22.3c4.7 2.9 9.2 4.8 13.7 5.5l4.1 20.7c-4 2.4-7.4 5.8-10.6 10.4c-5.4 7.5-9.6 17.9-12.4 29.2c-4.6 18.6-5.2 39.4-3.9 54l104.4-20.9c-4.3-14-12.7-33-24-48.4c-6.8-9.4-14.6-17.4-22.3-22.3c-4.7-3-9.2-4.8-13.7-5.5l-4.1-20.7c4-2.4 7.4-5.8 10.6-10.4c5.4-7.5 9.5-17.9 12.4-29.2c4.6-18.6 5.1-39.4 3.9-54m51.6 206L215.1 377l2.7 13.6l126.3-25.3z", "falling-rocks": "m156.115 34.48l-36.94.586l10.02 28.995l27.258-2.324zM18 37.727V494h297.682L304 448l-64-64l-48-160l-88.055-80L96 64zM219.076 98.58L160 112l16.38 30.342l17.65 5.394l-1.223 19.672L244.664 144zm34.656 60.99l-19.56 21.05l27.508 12.61l12.855-20.804zm50.907 90.002l-34.38 25.012l-11.766 58.662l100.53 22.97l-4.163-98.218zm107.475 62.373l-20.886 3.465l-15.988 20.033l4.873 21.23l40.848-15.55zm-43.62 95.996l-44.32 5.87l6.858 29.422l36.875-1.396zm37.573 59.982l-32.103 5.375L340.113 494h79.508z", "fast-arrow": "M20.91 20.002v32.29l357.793 338.9L20.91 101.407v58.942l355.942 250.224l-86.89-17.527l26.913 30.947l-70.502 3.008l245.633 64.603l-65.502-249.054l-15.352 92.36l-27.3-31.46l16.683 60.464L161.26 20.002h-22.37l142.276 208.935L109.496 42.17l98.975 138.547L45.194 20.002zm433 92.186l-32.234 38.482l55.19 208.21l15.286-217.794l-38.242-28.9zm-231.88 327.89l-24.975 23.47l21.674 27.62l149.225-12.78l-145.926-38.31z", "fast-forward-button": "M44.62 106a26 26 0 0 0-25.69 29.3c16 124 16 117.4 0 241.4A26 26 0 0 0 54.72 404l138.68-57.7c-1.2 9.5-2.4 18.9-3.9 30.4c-2.5 19.8 17.3 35 35.8 27.3l252-124c9.7-4 16-13.5 16-24s-6.3-20-16-24l-252-124c-3.2-1.3-6.6-2-10.1-2c-15.6.1-27.7 13.8-25.7 29.3c1.5 11.5 2.7 20.9 3.9 30.4L54.72 108a26 26 0 0 0-10.1-2", "fire": "M256 16c-52.5 252.632-210 277.845 0 454.688C466 293.845 308.5 268.63 256 16M124.75 167.407C98.5 243.197 46 294.117 46 369.907S151 496 229.75 496c-157.5-126.317-105-202.278-105-328.593m262.5 0c0 126.317 52.5 202.278-105 328.593C361 496 466 445.696 466 369.907c0-75.79-52.5-126.71-78.75-202.5", "fist": "m329.8 235.69l62.83-82.71l42.86 32.56l-62.83 82.75zm-12.86-9.53l66.81-88l-45-34.15l-66.81 88zm-27.48-97.78l-19.3 39.57l57-75l-42.51-32.3l-36.24 47.71zm-20.74-73.24l-46.64-35.43l-42 55.31l53.67 26.17zm107 235.52l-139-102.71l-9.92.91l4.56 2l62.16 138.43l-16.52 2.25l-57.68-128.5l-40-17.7l-4-30.84l39.41 19.42l36.36-3.33l17-34.83l-110.9-54.09l-80.68 112.51L177.6 346.67l-22.7 145.62H341V372.62l35.29-48.93L387 275.77z", "flash-grenade": "m279.31 24.574l-9.34 16.188l26.34 15.2l9.348-16.185l-26.347-15.203zm55.692 1.77l-23.04 39.88a158.5 158.5 0 0 1 25.716 11.936c9.207 5.313 17.637 11.378 25.215 18.024l23.287-40.31zm-71.49 50.017c-4.798.02-9.493.35-14.04.984c-24.26 3.384-44.065 15.097-55.01 34.043l-28.89 50.01l16.758 9.67l22.945-40.14l16.225 9.276l-22.982 40.203l48.847 28.188l22.774-39.84l16.223 9.275l-22.81 39.906l56.992 32.886l22.58-39.506l16.227 9.274l-22.62 39.572l14.88 8.586l28.894-50.018c10.945-18.946 11.19-41.94 1.994-64.626s-27.957-44.635-54.162-59.756c-19.655-11.34-40.545-17.14-59.996-17.9a112 112 0 0 0-4.83-.087zM389.207 87.99l-9.348 16.184l53.646 30.957c-4.74 3.604-8.798 8.41-12.006 13.83c-6.885 11.636-10.73 26.704-10.73 43.216s3.845 31.582 10.73 43.217s17.644 20.515 30.8 20.515c13.153 0 23.913-8.88 30.798-20.515s10.726-26.705 10.726-43.217s-3.842-31.58-10.726-43.215c-4.96-8.38-11.934-15.308-20.36-18.542zm63.092 59.147q1.277-.001 2.614.345l5.164 2.98l.12-.206c2.308 1.833 4.62 4.52 6.814 8.225c4.763 8.048 8.123 20.172 8.123 33.696s-3.36 25.65-8.123 33.7c-4.763 8.048-10.093 11.343-14.713 11.343s-9.953-3.296-14.716-11.345s-8.123-20.176-8.123-33.7c0-13.523 3.36-25.647 8.124-33.696c4.763-8.05 10.095-11.345 14.715-11.345zm-277.639 41.08l-62.41 108.037l148.63 85.764l62.41-108.036l-148.628-85.765zM84.467 301.8l-28.895 50.016c-10.946 18.948-11.19 41.943-1.996 64.63c9.193 22.68 27.948 44.62 54.143 59.74l.02.013h.002c26.206 15.12 54.607 20.388 78.865 17.003c24.26-3.384 44.064-15.096 55.01-34.043l28.89-50.01l-16.595-9.576l-25.855 45.235l-16.227-9.277l25.895-45.3l-56.993-32.885l-25.662 44.894l-16.226-9.275l25.7-44.96l-48.847-28.187l-25.494 44.598l-16.224-9.275l25.53-44.663l-15.043-8.68z", "ghost": "M373.688 22.063c-1.245-.014-2.498 0-3.75.03c-31.364.748-65.528 15.414-96.938 47.313c-88.264 89.642-154.092 171.18-242.938 174.03c23.65 18.21 54.87 31.21 85.25 36.783c-24.375 29.26-50.877 47.65-93.437 64.842c37.915 9.124 74.452 6.5 109.813-2.343c-27.29 34.35-62.118 65.85-107.47 95.78c60.376-.392 136.226-12.138 181.626-47.906c-4.842 30.69-16.186 65.125-43.22 100.47c70.74-18.73 117.115-42.386 146.595-83.533c2.905 27.513-.94 45.098-11.095 80.595c78.006-66.3 150.857-164.775 182.78-270.97C513.44 108.94 452.066 22.89 373.69 22.063zM371.03 96.47c5.76 0 11.1 1.732 15.564 4.686c-7.706.283-13.875 6.6-13.875 14.375c0 7.956 6.45 14.407 14.405 14.407c5.118 0 9.6-2.665 12.156-6.687c.028.503.033 1.022.033 1.53c0 15.633-12.648 28.314-28.282 28.314c-15.632 0-28.31-12.68-28.31-28.313c0-15.63 12.678-28.31 28.31-28.31zm67.376 34.874a28.2 28.2 0 0 1 12.438 2.875c-5.734 1.9-9.875 7.284-9.875 13.655c0 7.955 6.45 14.406 14.405 14.406c4.54 0 8.547-2.093 11.188-5.374c.086.902.156 1.826.156 2.75c0 15.632-12.68 28.313-28.314 28.313c-15.633 0-28.312-12.682-28.312-28.314s12.68-28.312 28.312-28.312zm-111.5 32.47l4.906 45.155l29.782-25.032l4.625 42.53l31.31-26.343l4.314 39.75l30.312-25.47l5.97 55.032l-43.938 36.938l-4.313-39.75l-30.313 25.47l-4.625-42.533l-31.312 26.344l-4.906-45.156l-29.783 25.03l-5.968-55.03l43.936-36.938z", "guards": "M72.877 31.904a29 29 0 0 0-2.988.098C43.67 35.408 22.545 61.005 18 93.775v26.15c2.296 16.266 8.804 30.665 17.848 41.565c-6.58 1.237-12.504 3.53-17.848 6.717v23.813c22.983.386 43.265 14.03 57.31 34.318C89.56 246.92 98 274.598 98 305s-8.44 58.08-22.69 78.662C61.266 403.95 40.984 417.592 18 417.98v8.577L23.03 494h7.67l108.204-161.824L140 304c.732-41.132 16.536-59.598 32-48c4.26 3.195 8.3 6.024 12.135 8.533l23.574-35.258c-21.607-17.4-59.103-43.23-90.68-68.658c10.89-13.647 17.894-32.612 17.894-53.627C134.924 65.494 108.478 32 76 32c-1.12-.036-2.133-.082-3.123-.096m366.246 0c-.99.014-2.002.06-3.123.096c-32.478 0-58.924 33.494-58.924 74.99c0 21.015 7.005 39.98 17.895 53.627c-31.577 25.43-69.073 51.26-90.68 68.658l23.577 35.258A232 232 0 0 0 340 256c15.464-11.598 31.268 6.868 32 48l1.096 28.174L481.3 494h7.67l5.03-67.443v-8.578c-22.983-.388-43.265-14.03-57.31-34.318C422.44 363.08 414 335.402 414 305s8.44-58.08 22.69-78.662c14.045-20.288 34.327-33.932 57.31-34.318v-23.813c-5.344-3.187-11.27-5.48-17.848-6.717c9.044-10.9 15.552-25.3 17.848-41.566v-26.15c-4.546-32.77-25.67-58.366-51.89-61.772a29 29 0 0 0-2.987-.098M148.758 46.758l40.068 110.215l47.34-31.653zm214.484 0l-87.408 78.562l47.34 31.653zM230.25 150.93l-16.625 11.117L435.588 494h24.057zm51.5 0l-14.922 22.316l12.03 17.99l19.517-29.19zM18 210.018v189.964c15.993-.38 30.943-9.855 42.512-26.566C72.322 356.356 80 332.036 80 305s-7.678-51.357-19.488-68.416c-11.57-16.71-26.52-26.186-42.512-26.566m476 0c-15.993.38-30.943 9.855-42.512 26.566C439.678 253.644 432 277.964 432 305s7.678 51.357 19.488 68.416c11.57 16.71 26.52 26.186 42.512 26.566zM233.145 223.62L52.355 494h24.057l168.762-252.39zm-98.397 215.52L98.066 494h34.55zm242.504 0l2.13 54.86h34.552z", "halt": "M389.917 128.73v100.836h-22.802v-158.5a17.11 17.11 0 0 0-17.11-17.11h-11.863a17.11 17.11 0 0 0-17.11 17.11v158.5h-22.698V46.993a17.11 17.11 0 0 0-17.11-17.11h-11.863a17.11 17.11 0 0 0-17.11 17.11v182.573H229.5V77.33a17.11 17.11 0 0 0-17.108-17.11h-11.864a17.11 17.11 0 0 0-17.11 17.11v263.873l-63.858-51.14a23.385 23.385 0 0 0-30.743 1.32l-5.567 5.31a23.385 23.385 0 0 0-2.01 31.678l102.19 125.647a72.03 72.03 0 0 0 57.092 28.1h60.85A134.637 134.637 0 0 0 436 347.5V128.73a17.11 17.11 0 0 0-17.11-17.108h-11.864a17.11 17.11 0 0 0-17.11 17.11z", "hazard-sign": "M254.97 34.75c-30.48-.167-59.02 22.12-79.532 62.156c-.075.146-.176.26-.25.406L43.063 326.783l-.22.343C18.5 365.413 13.377 401.515 28.47 428.03c15.08 26.498 48.627 40.126 93.5 37.908h265.093c44.887 2.227 78.445-11.404 93.53-37.907c15.09-26.51 9.956-62.595-14.375-100.874l-.22-.375L335.28 98.064c-.06-.12-.124-.225-.186-.344c-20.948-40.263-49.626-62.803-80.125-62.97zm.06 18.844c13.576.13 26.453 6.93 38.126 18.343c11.606 11.347 22.554 27.453 33.406 48.344c.063.122.125.224.188.345l115.22 201.563c.033.053.058.102.092.156l.125.22c12.92 20.274 21.395 38.06 25.282 53.967c3.91 16.01 3.063 30.648-3.845 42.408s-19.222 19.533-34.78 23.906c-15.444 4.34-34.508 5.656-57.408 4.5H137.625c-24.845 1.258-44.73-.32-60.405-5.125c-15.78-4.84-27.68-13.45-33.72-25.69c-6.04-12.237-5.862-26.797-1.5-42.436c4.333-15.535 12.815-32.608 24.875-51.53l.22-.377L183.562 120c.08-.157.17-.28.25-.438C194.51 98.644 205.32 82.6 216.875 71.376c11.642-11.307 24.58-17.913 38.156-17.78zm47.657 62.093l-28.53 224.032h-41.844L204.438 120.5a293 293 0 0 0-4.22 7.97l-.093.218l-.125.218l-116.938 202.97l-.093.187l-.126.187C71.28 350.346 63.598 366.226 60 379.125s-3.108 22.322.25 29.125s9.925 12.28 22.47 16.125c12.542 3.845 30.67 5.547 54.405 4.313l.25-.032h234.313l.25.03c21.85 1.138 39.308-.28 51.875-3.81c12.566-3.533 19.822-8.827 23.687-15.407s4.978-15.545 1.813-28.5c-3.166-12.958-10.732-29.374-23.094-48.72l-.126-.188l-.125-.218l-115.658-202.28l-.093-.158l-.064-.187c-2.5-4.828-4.99-9.326-7.47-13.532zM231.28 361.875h43.907v43.906H231.28z", "heavy-rain": "M50.656 22.125c24.862 31.888 280 358.568 341.063 411.72c76.902 66.936 132.718-3.814 73-73c-52.197-60.47-369.484-308.088-408.814-338.72h-5.25zm188.656 0c45.33 61.388 132.53 178.237 165.25 206.72c53.745 46.78 93.142-3.023 51.407-51.376C429.4 146.69 326.902 69.273 263.25 22.124h-23.938zm131.375 0C385.11 38.203 397.84 51.793 404 57.155c41.042 35.724 71.142 1.755 46.125-35.03zM17.375 132.5v54.313c42.702 54.933 87.407 110.516 108.03 128.468c53.748 46.783 93.143-2.456 51.407-50.81c-21.41-24.807-95.776-83.243-159.437-131.97zm0 165.844V355c45.978 54.937 90.37 107.056 106.28 120.906c47.652 41.476 81.973-2.693 44.97-45.562c-16.444-19.05-84.786-76.927-151.25-132", "hooded-figure": "M355.102 21.097c-33.682.164-64.173 18.585-74.615 50.5c21.357-.79 23.203 53.922 23.203 53.922l41.619 6.262c-13.41 12.963-50.025 5.967-50.025 5.967c-17.14 19.182-33.124 40.966-47.758 57.578c-15.952 18.127-35.2 38.103-57.018 60.086c-6.79 6.823 41.594-9.821 34.342-2.604c-24.567 12.751-42.297 16.097-61.764 32.069c-31.312 25.674-62.853 60.71-81.146 79.431c-7.711 7.91-44.362 37.674 20.469 34.74c2.404 7.52-1.621 9.456-7.493 15.293c-4.327 4.303-18.082.283-22.263 2.828c-22.172 35.055-17.246 37.975-27.43 58.047c-4.252 11.635 41.68-14.404 64.305-34.18c13.974-7.58 25.147-21.652 35.002-17.202c43.11 18.984 129.826 35.53 141.328 27.619c18.368-12.646-10.321-46.343 3.832-97.912c23.47 5.817 43.825 13.657 66.767 11.459c-1.581 49.307 3.56 55.306-3.888 104.777l59.129 21.127l1.91-13.809l-33.815-22.478c14.568-50.659 16.809-72.578 15.227-121.719c-.16-5.372-45.168-24.325-74.492-33.133l18.593-30.412c30.393-44.788 124.141-62.055 127.932-88.258c-13.02-19.676 3.022-27.384-25.092-21.912c-6.295 1.318-13.771 24.346-18.023 27.213c-7.843 5.276-40.655 24.477-51.951 18.377c-1.9-1.026 7.246-33.441 6.85-44.78c-.116-3.205-1.19-6.625-2.866-10.001c.185-.64 15.24-52.482 54.809-94.016c-43.978 25.134-65.332 79.925-65.354 79.98c-2.207-2.134-4.476-3.983-6.639-5.423c-1.916-14.7-4.819-73.02 68.598-78.776c-21.427-21.177-47.704-30.78-72.283-30.66", "idea": "M256.016 17.172c-103.018 0-188.532 105.858-188.532 238.812c0 55.877 15.122 106.973 40.282 147.438c96.796 34.218 203.558 38.207 295.187 2.062c25.932-40.785 41.563-92.667 41.563-149.5c0-132.953-85.483-238.81-188.498-238.812zm1.752 18.75c80.747 0 146.03 65.252 146.03 146s-65.283 146.03-146.03 146.03c-80.75 0-146-65.282-146-146.03s65.25-146 146-146m.484 25.562c-42.402 0-76.92 28.05-76.92 70.264c0 23.897 8.254 35.09 17.447 49.672c6.13 9.725 12.446 20.9 15.988 36.953h86.46c3.524-16.437 9.903-27.82 16.086-37.64c9.207-14.622 17.448-25.615 17.448-48.983c0-42.242-34.107-70.264-76.51-70.264zm-40.87 176.555v30.368h81.33v-30.37zm11.18 48.976v18h58.97v-18zm-57.36 47.218c18.365 0 33.157 14.84 33.157 33.5s-14.793 33.532-33.157 33.532s-33.125-14.872-33.125-33.532s14.76-33.5 33.123-33.5zm165.292.307c18.26 0 33.06 14.803 33.06 33.062c0 18.26-14.8 33.062-33.06 33.062s-33.06-14.803-33.06-33.062c0-18.26 14.8-33.06 33.06-33.06zm-208.447 96.694c11.517 13.484 24.36 25.148 38.22 34.688l-7.095-26.375c-10.68-2.355-21.077-5.124-31.125-8.313m254.594 1.532a362 362 0 0 1-27.406 7.062l-6.437 23.97c12.174-8.753 23.526-19.176 33.844-31.03zm-203.03 10.75l9.593 35.78c11.34 5.466 23.184 9.572 35.406 12.188l-5.063-43.125c-13.51-1.05-26.868-2.657-39.936-4.844zm155.22.216l-.002.002a450 450 0 0 1-30.935 3.97l-4.815 40.812c9.134-2.722 18.01-6.314 26.596-10.66zm-49.91 5.346c-16.24.828-31.392.948-46.467.375l5.313 44.846c4.052.332 8.135.528 12.25.528a149.5 149.5 0 0 0 23.718-1.904z", "invisible": "M260.7 31.1c5.2.51 9.9 2.45 14.5 4.9l9.1-16.3c-6.4-3.81-13.9-6.07-20.7-7.3c-.9 6.24-1.9 12.47-2.9 18.7m-9.1-18.4c-7.6.51-14.1 2.52-21.1 6l8.3 16.7c5.1-1.88 9.6-3.72 14.6-4zm-38.5 18.7c-5 5.17-9.8 11.69-12.7 17l16.3 9.1c3.1-4.71 5.9-9.09 9.6-12.8c-4.3-4.46-9-8.78-13.2-13.3m88.1 1.9l-14 12.4c3.8 3.98 6.6 8.63 9.3 13.4l16.7-8.5c-3.5-6.29-7.8-12.54-12-17.3M192.4 67.4c-2.1 6.71-3.3 14.19-3.8 20.2l18.6 1.8c.6-6.22 1.4-10.74 3-16.5zm128.2 2.2c-6 1.86-12 3.42-18.1 4.9c1.1 5.58 2.2 11.79 2.7 16.6l18.7-1c-.8-7.04-1.8-14.28-3.3-20.5m-113.2 36.6l-18.5 1.9c.4 7 2.6 14.3 4.3 20.1l17.8-5.7c-1.7-5.8-2.9-11-3.6-16.3m97.2 1.7c-.8 5.7-2.4 11.2-4 16.2l17.5 6.6c2.3-6.7 4.1-14 5-20zm-86.7 29.4s-11.5 5.4-16.1 6.7c0 0 4.8 9.6 6.9 17.1c7.6-2.2 15.5-3.2 23.3-4.5c-4.7-6.9-10.5-13.4-14.1-19.3m75.3 1.7c-4.2 6.3-9.2 12-13.9 17.9c7.8 2.1 16 2.7 23.6 5.5c0 0 4.4-12.9 6.1-17.7c-5.7-1.9-15.8-5.7-15.8-5.7m-108.9 12.7c-6.6 4.4-11.1 8.1-16.1 13.4l13.5 12.9c4.6-4.5 7.8-7.5 12.6-10.5zm143.6 2.8l-10.8 15.2c4.6 3.1 8.7 6.9 12.3 11.1l13.9-12.5c-5.4-5.6-9.4-9.8-15.4-13.8m-172.1 27.4c-3.5 5.7-6.3 11.8-8.7 18l17.4 6.9c2-5.4 4.5-10.7 7.5-15.6zm199.5 3.2l-16.2 9.2c2.8 5.1 5.4 10.4 7.6 15.8L364 203c-2.4-6.2-5.5-12.1-8.7-17.9m-214.2 33.8c-1.6 6.2-3 12.7-3.8 19.2l18.4 2.8c.8-5.9 2.2-11.7 3.5-17.5zm229.1 3l-18.1 4.8c1.8 5.7 2.6 11.5 3.8 17.4l18.4-3.1c-1.1-6.4-2.3-12.8-4.1-19.1m-235.1 35.5c-.5 6.8-.6 12.6-.6 19.3h18.7c.1-6.3.2-12.9.6-18zm241.6 2.9l-18.7 1.5c.5 5.8.8 12 .8 18l18.7-.1c-.1-7-.4-13.2-.8-19.4m-223 34.6l-18.7 1c.4 6.4 1 12.7 1.7 19.1l18.6-2c-.8-6-1.2-12.1-1.6-18.1m204.5 2.9c-.2 6-1 12-1.7 18l18.5 2.4c1-6.3 1.4-12.7 1.9-19.1zM139 329.6c.5 6.3 2 12.9 2.9 18.3h20.3v-18.7c-7.7-.2-15.4.1-23.2.4m41.9-.4c-.1 6.4 0 12.3 0 18.7l19.2-.5c-.5-6.1-.9-12.1-1.2-18.2zm130 0c-.5 6.3-1 12.7-1.5 19l18.7 1.4l-.2-20.4zm35.7 0v18.7h23.2c1.3-6.4 2.3-11.6 3.4-18c-8.8-.9-17.7-.7-26.6-.7m-145.3 36.9l-18.6 1.2l1.2 18.7l18.6-1.3zm106.7.7l-1.3 18.6l18.6 1.4l1.4-18.6zm-60.2 11.9v18.7h18.6v-18.7zm-44 24.7l-18.7 1.2l1.3 18.7L205 422zm101.5.7l-1.4 18.6l18.6 1.4l1.4-18.6zm-57.5 12v18.7h18.6v-18.7zm-41.6 24.6l-18.6 1.2l1.2 18.7l18.7-1.3zm96.3.6l-1.4 18.7l18.6 1.4l1.4-18.7zm-54.7 12.2v18.7h18.6v-18.7zM208.7 478l-18.7 1.2c.5 6.8.9 13.6 1.4 20.4h15.7zm91 .6l.8 21h16.4c.4-6.5 1-13.1 1.5-19.6zm-73.9 2.3v18.7h18.6v-18.7zm37.3 0v18.7h18.7v-18.7z", "leak": "M367 32s-37.8 51.9-32 80c3 14.8 16.9 32 32 32s29-17.2 32-32c5.8-28.1-32-80-32-80M160.2 133.4s-37.8 51.9-32 80c3 14.8 16.9 32 32 32s29-17.2 32-32c5.8-28.1-32-80-32-80m241.1 134.1a91.23 38.36 0 0 0-83.9 23.4a210 77.59 0 0 0-79.7-5.9a210 77.59 0 0 0-210 77.6a210 77.59 0 0 0 210 77.6a210 77.59 0 0 0 68.2-4.3a82.62 29.64 0 0 0-4.5 9.6a82.62 29.64 0 0 0 82.6 29.6a82.62 29.64 0 0 0 82.6-29.6a82.62 29.64 0 0 0-76.8-29.5a210 77.59 0 0 0 57.9-53.4a210 77.59 0 0 0-8.6-21.8a91.23 38.36 0 0 0 53.4-34.9a91.23 38.36 0 0 0-91.2-38.4M107.8 457.6A43.89 17.43 0 0 0 63.91 475a43.89 17.43 0 0 0 43.89 17.4a43.89 17.43 0 0 0 43.9-17.4a43.89 17.43 0 0 0-43.9-17.4", "lightning-arc": "m192.063 20.375l-44.625 98.563l-36.344-13.657l40.312 47.22l29.47-50.656l17.093 159.437l88.874-159.936l7.906 138.22l74.72-140.408l32.905 9.094l-32.594-57.28l-58.75 91.343L300.657 27.28L216.75 153.657l-24.688-133.28zM61.25 100.813c-22.213 0-40.03 17.785-40.03 40a39.896 39.896 0 0 0 40.03 40.03c.558 0 1.104-.04 1.656-.062l19.5 72.814l-27.812 7.437l4.843 18.064l27.813-7.47l6.656 24.876l-27.812 7.438L70.938 322l27.812-7.438l7.156 26.782l-27.78 7.437l4.81 18.033l27.814-7.438l6.906 25.813l-27.78 7.437l4.843 18.063l27.78-7.438l7.188 26.75l-27.813 7.47l4.844 18.06l27.81-7.467l12.25 45.78h19.345l-13.563-50.593l27.813-7.47l-4.844-18.06l-27.81 7.467l-7.157-26.78l27.78-7.438l-4.812-18.064l-27.81 7.438l-6.907-25.813l27.78-7.436l-4.812-18.063l-27.81 7.47l-7.157-26.78l27.78-7.44l-4.843-18.06l-27.78 7.436l-6.657-24.875l27.78-7.436l-4.843-18.03l-27.78 7.436l-19.564-73.03c12.173-6.842 20.344-19.858 20.344-34.907c0-22.215-17.787-40-40-40zm391.188 0c-22.213 0-40.032 17.785-40.032 40c0 15.052 8.19 28.066 20.375 34.906l-19.56 73.03l-27.814-7.438l-4.844 18.032l27.813 7.47l-6.656 24.842l-27.814-7.437l-4.844 18.06l27.813 7.44l-7.156 26.78l-27.814-7.47l-4.844 18.064l27.813 7.437l-6.906 25.814l-27.814-7.438l-4.844 18.063l27.813 7.436l-7.156 26.78l-27.845-7.467l-4.813 18.06l27.813 7.47l-13.563 50.594h19.313l12.25-45.78l27.813 7.467l4.843-18.06l-27.81-7.47l7.186-26.75l27.813 7.438l4.842-18.063L396 385.187l6.906-25.812l27.813 7.438l4.842-18.032l-27.812-7.467l7.156-26.75L442.72 322l4.842-18.063l-27.812-7.437l6.656-24.875l27.813 7.47l4.842-18.064l-27.812-7.436l19.5-72.813c.562.024 1.12.064 1.688.064c22.212 0 40-17.817 40-40.03c0-22.216-17.788-40-40-40z", "locked-chest": "M146.857 20.842c-12.535-.036-24.268 2.86-37.285 9.424h.004C61.356 54.6 19.966 120.734 17.982 175.91l41.848 14.236c4.33-61.89 47.057-128.37 101.527-155.86h.002a134 134 0 0 1 13.185-5.8l-22.26-7.45a84 84 0 0 0-5.428-.194zm59.34 20.19c-10.478-.09-22.832 3.093-36.424 9.943l.004-.004c-48.23 24.34-89.625 90.513-91.548 145.436l156.485 53.24c3.865-62.22 46.797-129.372 101.613-157.035h.002l.002-.003a134 134 0 0 1 12.832-5.666l-134.54-45.036a44 44 0 0 0-8.427-.873zm174.97 58.323c-10.476-.09-22.83 3.092-36.42 9.94l-.005.002c-48.577 24.518-90.225 91.473-91.586 146.623l46.205 15.72c3.914-62.188 46.825-129.274 101.607-156.92a129 129 0 0 1 13.53-5.91l-26.544-8.884a45 45 0 0 0-6.785-.57zm63.554 22.014c-10.267.093-22.094 3.353-35.333 10.034c-47.158 23.8-87.777 87.587-91.362 141.75l174.55-73.726c-.404-39.01-10.754-61.304-24.415-71.082a36 36 0 0 0-7.55-4.137l-.01.034l-4.735-1.584c-3.48-.887-7.195-1.327-11.144-1.29zM17.9 195.622l-.035 187.484L59.46 397.58V209.764l-41.56-14.14zm60.25 20.498v187.962l156.282 54.37V269.288l-29.053-9.886v119.43L104.325 344.75V225.025zm414.22 3.683L318.433 293.27v189.236l173.935-73.504v-189.2zm-369.354 11.582v99.947l63.675 21.477v-99.763l-63.674-21.662zm31.306 28.797c9.705 0 17.573 7.867 17.573 17.572c0 6.34-3.37 11.88-8.407 14.97v28.53h-18.69v-28.746c-4.838-3.13-8.048-8.562-8.048-14.754c0-9.705 7.867-17.572 17.572-17.572m98.797 15.464v189.307l46.626 16.22V291.51l-46.627-15.864z", "locked-door": "M105 41v398h302v-62H247V231h32v-55c0-38 36.5-57 73-57c20.5 0 41 6 55 18V41zm247 96c-27.5 0-55 13-55 39v55h110v-55c0-26-27.5-39-55-39m-192 78c18.1 0 33 14.9 33 33s-14.9 33-33 33s-33-14.9-33-33s14.9-33 33-33m0 18c-8.4 0-15 6.6-15 15s6.6 15 15 15s15-6.6 15-15s-6.6-15-15-15m105 16v110h174V249zm87 23a16 16 0 0 1 16 16a16 16 0 0 1-10.9 15.2L368 336h-32l10.9-32.8A16 16 0 0 1 336 288a16 16 0 0 1 16-16M73 457v30h366v-30z", "lungs": "M255.875 29.406A9 9 0 0 0 247 38.53v118.314l-15.188 18.97C232.602 181.416 233 186.87 233 192v11.156l23-28.75l23 28.75V192c0-5.13.398-10.583 1.188-16.188L265 156.845V38.53a9 9 0 0 0-9.125-9.124M176 121c-4.204 0-14.86 3.97-26.688 12.063s-25.28 19.814-38.125 33.468c-25.688 27.31-48.756 62.726-54.343 91.19c-7.464 38.02-11.432 81.626-11.532 119.342c-.1 37.717 4.43 70.268 10.75 82.907c.458.913 2.002 2.488 6.47 3.717c4.466 1.23 11.21 1.775 19.187 1.313c15.95-.925 36.805-5.69 57.06-13.406c20.257-7.717 40-18.395 54.126-30.438C207.033 409.113 215 396.25 215 384V192c0-13.92-4.043-33.063-11.375-47.625S186.832 121 176 121m160 0c-10.832 0-20.293 8.813-27.625 23.375S297 178.08 297 192v192c0 12.25 7.967 25.113 22.094 37.156s33.87 22.72 54.125 30.438c20.255 7.716 41.11 12.48 57.06 13.406c7.977.462 14.722-.084 19.19-1.313c4.466-1.228 6.01-2.804 6.467-3.718c6.32-12.64 10.85-45.19 10.75-82.908c-.1-37.716-4.067-81.32-11.53-119.343c-5.588-28.464-28.656-63.88-54.344-91.19c-12.845-13.653-26.297-25.374-38.125-33.468C350.858 124.97 340.204 121 336 121", "magic-palm": "M245.813 23.188a61 61 0 0 0-3.657.093c-10.103.56-19.646 3.682-30.156 11.25l20.72 196.782c-8.394 2.127-16.676 4.47-24.814 7.094L137.72 57.812c-7.032-1.706-17.442-.3-27.126 4.626c-10.248 5.213-19.034 13.84-22.813 22.937L155.03 261.5c-7.414 4.345-14.59 9.137-21.5 14.47l-74.343-94.25c-16.34.698-34.965 14.455-37.562 32.655C28.89 222.693 93.978 297.77 126 357.405c10.3 19.184 29.543 50.725 39.188 70.064c5.83 11.693 16.004 24.238 27.843 32.342c11.84 8.104 24.7 11.82 37.907 8.282l112.907-30.22c5.493-1.47 9.196-5.39 13.22-11.937c4.02-6.545 7.535-15.137 12.905-23c20.61-30.185 50.432-76.085 115.186-112.062c-2.696-15.053-7.405-24.57-12.72-29.563c-6.03-5.667-13.198-7.372-23.686-5.843c-18.062 2.63-43.498 17.063-69.594 36.874a231 231 0 0 0-4.937 4.22l-7-61.252l42.5-155.718c-4.478-7.355-13.806-13.258-24.845-15.97c-10.874-2.67-22.506-1.698-30.28 1.595l-38.75 149.874c-9.365 1.58-18.732 3.17-28.064 4.812L273.69 27.5c-10.057-2.52-19.284-4.272-27.875-4.313zM234.343 255l30.157 56.625l54.406-33.906l-33.78 54.186L341.562 362l-64.157-2.188l2.188 64.032l-30.03-56.344l-54.283 33.813l33.97-54.438l-56.53-30.125l63.78 2.156L234.344 255z", "magic-portal": "m88.418 17.17l-66.12 475.242h18.866l66.12-475.242H88.42zm315.7 0l66.023 475.242h18.87L422.988 17.17zm-56.26.24l-132.422.37c-59.343 41.506-78.325 97.982-61.596 168.03c-22.324-31.34-32.747-63.248-33.59-98.234l-26.684 191.78c1.05-3.64 2.25-7.31 3.653-11.012l-3.843 12.385l-4.934 35.454c.41 37.954 18.614 69.416 40.91 87.406c-18.52-6.774-35.355-15.287-49.25-27.445l-9.207 66.152c43.032 20.635 88.614 24.346 120.56 17.78c-33.542 18.813-71.344 29.428-125.382 16.886l-2.13 15.3h217.568c73.664-14.515 117.318-55.617 129.045-89.216c3.54 30.568-2.754 60.093-37.473 89.215h73.242l-41.553-299.11c-15.226-35.307-51.106-59.122-74.695-59.718c10.876-3.615 21.615-5.918 32.305-5.78c11.61.15 23.16 3.2 34.76 10.56l-4.207-30.278c-21.365-18.958-46.472-31.023-68.92-35.954c6.54-.477 13.043-.73 19.513-.685c15.23.104 30.273 1.868 45.18 6.21l-4.224-30.398C331.8 45.105 287.813 60.384 263.44 79.407c13.68-23.55 44.533-47.68 84.417-61.998zm-81.323 33.065c-68.785 37.085-71.87 82.26-36.1 122.146c-7.626-69.52 80.94-110.016 118.96-59.032c-40.867-20.17-77.79 7.84-76.21 47.723c23.234-23.997 98.678-13.267 79.795 36.19c-11.3-33.297-56.74-30.094-63.648-13.77c-14.75 34.866 64.34 14.582 98.117 66.284c-18.85-10.875-47.74.482-39.22 14.59c32.28 53.45 84.53 113.185 13.3 147.025c23.57-38.677 10.786-65.734-21.85-81.43c25.644 66.744-5.1 163.717-103.81 133.19c62.83-11.442 78.355-62.576 57.263-83.425c-23.617 60.37-122.14 97.174-181.444 38.453c58.693 22.535 99.285 7.31 120.644-26.39c-35.89 21.435-95.375 6.933-113.994-42.977c28.694 29.187 67.102 37.963 91.195 20.356c13.217-9.658 8.303-25.06-8.55-29.402c-24.53-6.32-61.988-12.852-76.563-36.588c21.722 6.003 43.444 10.698 65.166-3.375c-33.985-22.07-81.546-50.75-50.348-100.278c1.008 35.15 17.23 56.557 53.197 48.254c9.285-2.142 16.8-15.472 8.55-23.373c-61.138-58.54-47.58-160.406 65.548-174.168z", "magic-swirl": "M247.79 18.734C137.967 17.596 19.874 96.94 19.73 244.53l21.403-51.395c-9.485 72.28-7.75 147.236 38.79 202.502L38.2 377.355c39.24 69.774 126.333 90.976 200.855 92.51C124.11 429.9 67.87 342.277 63.912 246.492c-6.722-211.78 260.658-217.694 340.78-75.77c-3.417-19.492-8.623-38.426-15.618-56.11c77.406 89.155 59.293 214.875-21.29 253.036c-24.25 3.95-48.93 12.06-60.954 19c-58.548 33.802-6.27 126.536 53.225 92.188c9.44-5.45 23.404-17.303 36.494-31.352c64.36-59.52 98.1-118.24 93.108-188.94c-6.52 29.1-19.175 57.904-35.623 84.683c63.158-146.822 7.956-263.89-144.838-301.354c12.097 5.835 23.503 13.63 33.873 23.36c-57.415-23.752-131.123-22.62-186.884 3.505c28.066-26.2 64.776-43.73 102.2-49.642q-5.281-.307-10.597-.362zm-19.74 160.202l-19.843 100.566c-2.958 3.81-5.64 6.852-9.033 9.94l-25.688-49.096l-22.705 11.93l31.37 60.945c4.48 11.474 10.02 20.68 15.162 28.524c28.063 42.803 64.547 35.252 95.303 9.555l87.28-48.452l-12.71-22.498l-66.136 36.94c-1.517-3.154-3.266-6.552-5.056-9.51l67.818-64.96l-17.54-18.695l-66.47 63.762c-2.356-2.318-4.238-4.527-6.765-6.54l45.084-78.085l-22.733-13.127l-45.864 78.297c-3.79-1.31-7.72-2.2-11.595-2.745l15.656-81.896l-25.533-4.854z", "mirror-mirror": "M257.688 20.375c-38.528 0-74.835 12.49-107.282 34.813h-54.25V460.5h53.907c32.555 22.454 69.036 35.063 107.625 35.063s75.044-12.61 107.593-35.063h53.908V55.188H364.97c-32.447-22.323-68.754-34.812-107.283-34.812zM123.155 84.28H392.28v347.877H123.157V84.28zm18.688 18.69v108.718l126.844-108.72H141.844zm200.437 0L141.845 274.78v56.626l231.75-198.687v-29.75H342.28zm31.314 140.093L174.53 413.469h46.532l152.532-128.376zm0 66.468l-123.5 103.94h123.5V309.53z", "misdirection": "M273.5 22.48L166 86.15l45.2 16.05l-42.8 120.6l60.2 21.4l42.9-120.6l45.2 16.1zM62.4 35.28l-4.77 59.96l-22.59-1.91l34 48.07L110 99.44l-22.46-1.8l4.83-60.11zm329 58.44l-30.1 27.98l55.8 60.2l-22.7 20.9l79.6 10.3l-4.2-80l-22.6 20.9zM45.51 202.5L32.3 237l68.6 26.7l-10.22 25.8l68.42-22.7l-34.6-63.2l-10.2 25.9zm377.79 51.8l-94.9 7.6l24.7 91.6l21-29.8l79.4 56.3l28-39.8l-79.4-56.1zm-180.7 14.5L106.8 370.7l-38.27-51.3l-38.05 161.7l165.32 8.4l-38.1-51l136.1-101.8zm92.8 115.6l-22.3 15.8l31.3 44.9l-16.9 11.7l51.6 14.3l4.8-53.3l-17 11.7z", "muscle-up": "M165.906 18.688C15.593 59.28-42.187 198.55 92.72 245.375h-1.095c.635.086 1.274.186 1.906.28c8.985 3.077 18.83 5.733 29.532 7.94C173.36 273.35 209.74 321.22 212.69 368c-33.514 23.096-59.47 62.844-59.47 62.844l26.28 38.686L138.28 493h81.97c-40.425-40.435-11.76-85.906 36.125-85.906c48.54 0 73.945 48.112 36.156 85.906h81.126l-40.375-23.47l26.283-38.686s-26.376-40.4-60.282-63.406c3.204-46.602 39.5-94.167 89.595-113.844c10.706-2.207 20.546-4.86 29.53-7.938c.633-.095 1.273-.195 1.908-.28h-1.125c134.927-46.82 77.163-186.094-73.157-226.69c-40.722 39.37 6.54 101.683 43.626 56.877c36.9 69.08 8.603 127.587-72.28 83.406c-11.88 24.492-34.213 41.374-60.688 41.374c-26.703 0-49.168-17.167-60.97-42c-81.774 45.38-110.512-13.372-73.437-82.78c37.09 44.805 84.35-17.508 43.626-56.876zm90.79 35.92c-27.388 0-51.33 27.556-51.33 63.61c0 36.056 23.942 62.995 51.33 62.995s51.327-26.94 51.327-62.994c0-36.058-23.94-63.61-51.328-63.61z", "open-book": "M149.688 85.625c-1.234.005-2.465.033-3.72.063c-33.913.806-75.48 10.704-127.25 33.718V362.78c60.77-28.82 106.718-37.067 144.22-33.092c33.502 3.55 59.685 16.66 83.562 31.187v-242.97c-23.217-17.744-50.195-30.04-85.97-32a185 185 0 0 0-10.843-.28zm211.968 0c-3.7-.016-7.322.088-10.844.28c-35.773 1.96-62.75 14.256-85.968 32v242.97c23.876-14.527 50.06-27.637 83.562-31.188c37.502-3.974 83.45 4.272 144.22 33.094V119.407c-51.77-23.014-93.337-32.912-127.25-33.72c-1.255-.028-2.486-.056-3.72-.06zm5.72 261.78c-1.038-.002-2.074.017-3.095.033c-4.808.075-9.43.37-13.905.843c-33.932 3.597-59.603 17.976-85.53 34.44v.28c-6.554-1.99-13.02-2.37-19.408-.97c-25.566-16.177-51.003-30.202-84.468-33.75c-5.595-.592-11.44-.883-17.564-.842c-32.04.213-71.833 9.778-124.687 35.937v42.53c60.77-28.823 106.714-37.067 144.218-33.092c18.545 1.965 34.837 6.845 49.75 13.28c-4.682 6.064-9.308 13.268-13.875 21.688h117.156c-5.93-8.22-11.798-15.414-17.626-21.56c14.996-6.503 31.39-11.43 50.062-13.408c37.503-3.974 83.448 4.27 144.22 33.094v-42.53c-53.16-26.31-93.115-35.863-125.25-35.97z", "pay-money": "M298.9 24.31c-14.9.3-25.6 3.2-32.7 8.4l-97.3 52.1l-54.1 73.59c-11.4 17.6-3.3 51.6 32.3 29.8l39-51.4c49.5-42.69 150.5-23.1 102.6 62.6c-23.5 49.6-12.5 73.8 17.8 84l13.8-46.4c23.9-53.8 68.5-63.5 66.7-106.9l107.2 7.7l-1-112.09zM244.8 127.7c-17.4-.3-34.5 6.9-46.9 17.3l-39.1 51.4c10.7 8.5 21.5 3.9 32.2-6.4c12.6 6.4 22.4-3.5 30.4-23.3c3.3-13.5 8.2-23 23.4-39m-79.6 96c-.4 0-.9 0-1.3.1c-3.3.7-7.2 4.2-9.8 12.2c-2.7 8-3.3 19.4-.9 31.6c2.4 12.1 7.4 22.4 13 28.8c5.4 6.3 10.4 8.1 13.7 7.4c3.4-.6 7.2-4.2 9.8-12.1c2.7-8 3.4-19.5 1-31.6c-2.5-12.2-7.5-22.5-13-28.8c-4.8-5.6-9.2-7.6-12.5-7.6m82.6 106.8c-7.9.1-17.8 2.6-27.5 7.3c-11.1 5.5-19.8 13.1-24.5 20.1c-4.7 6.9-5.1 12.1-3.6 15.2c1.5 3 5.9 5.9 14.3 6.3c8.4.5 19.7-1.8 30.8-7.3s19.8-13 24.5-20c4.7-6.9 5.1-12.2 3.6-15.2c-1.5-3.1-5.9-5.9-14.3-6.3c-1.1-.1-2.1-.1-3.3-.1m-97.6 95.6c-4.7.1-9 .8-12.8 1.9c-8.5 2.5-13.4 7-15 12.3c-1.7 5.4 0 11.8 5.7 18.7c5.8 6.8 15.5 13.3 27.5 16.9c11.9 3.6 23.5 3.5 32.1.9c8.6-2.5 13.5-7 15.1-12.3c1.6-5.4 0-11.8-5.8-18.7c-5.7-6.8-15.4-13.3-27.4-16.9c-6.8-2-13.4-2.9-19.4-2.8", "person": "M250.882 22.802c-23.366 3.035-44.553 30.444-44.553 65.935c0 19.558 6.771 36.856 16.695 48.815l11.84 14.263l-18.217 3.424c-12.9 2.425-22.358 9.24-30.443 20.336c-8.085 11.097-14.266 26.558-18.598 44.375c-7.843 32.28-9.568 71.693-9.842 106.436h42.868l11.771 157.836c29.894 6.748 61.811 6.51 90.602.025l10.414-157.86h40.816c-.027-35.169-.477-75.126-7.584-107.65c-3.918-17.934-9.858-33.372-18.04-44.343c-8.185-10.97-18.08-17.745-32.563-19.989l-18.592-2.88l11.736-14.704c9.495-11.897 15.932-28.997 15.932-48.082c0-37.838-23.655-65.844-49.399-65.844z", "pistol-gun": "m79.238 115.768l-28.51 67.863h406.15l-.273-67.862h-263.83v55.605h-15v-55.605h-16.68v55.605H146.1v-55.605h-17.434v55.605h-15v-55.605H79.238zm387.834 15.96v40.66h18.688v-40.66zM56.768 198.63l20.566 32.015L28.894 406.5l101.68 7.174l21.54-97.996h115.74l14.664-80.252l174.55-3.873l-.13-32.922H56.767zm206.672 37.22l-11.17 61.142h-96.05l12.98-59.05l12.53-.278l-2.224 35.5l14.262 13.576l1.003-33.65l24.69-16.264l43.98-.976z", "pocket-watch": "M254.84 255.64a127.867 127.867 0 1 0 61.614 76.03a127.04 127.04 0 0 0-61.615-76.03zm-31.233 212.62a103.9 103.9 0 0 1-79.58-8.33a104.52 104.52 0 1 1 79.58 8.33m54.65-125.248a87.963 87.963 0 1 0-59.328 109.373a87.414 87.414 0 0 0 59.327-109.373zm-37.1 38.962a8.28 8.28 0 0 1-9.56 6.747l-37.256-6.436a8 8 0 0 1-.827-.186h-.124a8 8 0 0 1-.88-.32l-.24-.104a8 8 0 0 1-.9-.487h-.07l-59.174-37.244a8.28 8.28 0 0 1 8.817-14.012l57.755 36.324l35.67 6.158a8.28 8.28 0 0 1 6.76 9.562zm164.75-76.838c10.09 34.016 15.046 67.203 13.94 93.478c-1.12 26.69-8.156 38.176-14.365 40.018c-6.21 1.842-18.368-3.943-33.87-25.706c-15.244-21.42-29.194-51.95-39.325-85.955c-22.53-75.947-14.933-128.942.424-133.495c15.36-4.553 50.668 35.703 73.197 111.66zm-25.8-95.517a137 137 0 0 0-12.914-15.772q13.712 4.625 26.42 16.65c19.124 18.13 35.33 48.71 44.498 83.886c8.963 34.512 10.35 69.884 3.85 97.06a100 100 0 0 1-6.405 18.523c.362-3.322.632-6.86.797-10.67c1.17-28.044-4.015-63.126-14.612-98.88s-25.354-67.98-41.632-90.798zM357.104 16.1h-16.868v.125a8.77 8.77 0 0 1-.518 6.737a8.77 8.77 0 0 1-5.174 4.398a8.84 8.84 0 0 1-11.125-5.65l-1.748-5.61h-17.417l3.508 10.743c.094.29.218.56.322.838a25.17 25.17 0 0 0-11.456 10.35l-11.383 19.662a25.3 25.3 0 0 0-3.322 10.576a25.5 25.5 0 0 0-7.864 1.263l-19.662 6.437a25.2 25.2 0 0 0-7.358-11.59l-16.92-15.16a25.2 25.2 0 0 0-18.327-6.458a26 26 0 0 0-2.992.34a25.426 25.426 0 0 0-24.464-18.627H161.64a25.416 25.416 0 0 0-25.096 21.64a25.6 25.6 0 0 0-5.38.175a25.22 25.22 0 0 0-16.755 9.84l-13.692 18.11a25.416 25.416 0 0 0 3.177 34.08a25.36 25.36 0 0 0-4.036 22.435l6.456 21.732a25.24 25.24 0 0 0 9.17 13.11a32.267 32.267 0 0 0 25.933 51.496h1.19l4.273 14.395a152 152 0 0 1 5.91-1.904q4.738-1.406 9.51-2.472l-4.316-14.56a32.267 32.267 0 0 0-3.912-57.394a25.27 25.27 0 0 0 .962-17.075l-6.457-21.733a25.24 25.24 0 0 0-7.244-11.55l13.63-18.036a25.2 25.2 0 0 0 4.842-11.517c.62 0 1.252.072 1.883.072h22.706a25.4 25.4 0 0 0 4.346-.382a25.2 25.2 0 0 0 7.513 12.138l16.807 15.12a25.28 25.28 0 0 0 16.94 6.48a25.6 25.6 0 0 0 6.002-.726c.062.228.124.445.197.673a25.43 25.43 0 0 0 24.103 17.51a25.5 25.5 0 0 0 7.906-1.273l21.576-7.047a25.42 25.42 0 0 0 17.447-22.022a25.5 25.5 0 0 0 6.56-.88a25.2 25.2 0 0 0 15.41-11.828l11.384-19.662a25.33 25.33 0 0 0 1.83-21.37A25.44 25.44 0 0 0 357.104 16.1M122.19 147.808l-6.457-21.732a8.745 8.745 0 0 1 7.027-11.207c.414 0 .828-.063 1.242-.114h.186a8.84 8.84 0 0 1 8.465 6.312l6.458 21.732a8.817 8.817 0 0 1-4.987 10.618q-.946.217-1.894.497l-.415.134a8.84 8.84 0 0 1-9.603-6.24zm19.23 21.308a15.875 15.875 0 1 1-5.465 1.035a26 26 0 0 0 1.914-.487l.796-.26a15.7 15.7 0 0 1 2.773-.288zm.237-92.382l-13.64 18.12a8.78 8.78 0 0 1-5.474 3.353c-.497 0-1.035.083-1.5.145a8.817 8.817 0 0 1-7.11-14.124l13.69-18.11a8.827 8.827 0 1 1 14.034 10.617zm50.594-23.036q-.61.89-1.148 1.81a8.8 8.8 0 0 1-6.8 3.21H161.64a8.827 8.827 0 1 1 0-17.645h22.704a8.807 8.807 0 0 1 7.948 12.625zm44.334 35.496a8.817 8.817 0 0 1-12.418.673l-16.89-15.16a8.83 8.83 0 0 1-2.07-10.35q.57-.828 1.036-1.697c.103-.125.196-.26.31-.384a8.84 8.84 0 0 1 12.42-.672l16.898 15.17a8.817 8.817 0 0 1 .766 12.42zm53.202 8.486a8.77 8.77 0 0 1-5.175 4.397l-21.493 7.058a8.827 8.827 0 1 1-5.484-16.775l21.587-7.048a8.827 8.827 0 0 1 10.607 12.377zm36.416-42.513L314.82 74.83A8.827 8.827 0 0 1 299.533 66l11.383-19.662a8.843 8.843 0 1 1 15.327 8.827z", "poison-bottle": "M181.78 33v51.53h149.407V33zm14.19 70.22c-.66 2.9-1.554 5.263-2.75 6.936c-2.684 3.75-7.033 6.594-19.5 6.594c-21.54 0-40.804 5.862-55.157 16.094s-23.907 25.398-23.907 42.5V426.75c0 32.34 26.255 58.625 58.594 58.625h213.47c32.338 0 58.592-26.286 58.592-58.625V175.344c0-17.102-9.527-32.2-23.593-42.438s-32.83-16.156-53.44-16.156c-16.69 0-23.62-3.488-26.874-7.188c-1.41-1.604-2.43-3.698-3.156-6.343h-19.125c1.073 6.658 3.37 13.137 8.25 18.686c8.11 9.223 21.523 13.53 40.906 13.53c16.978 0 32.056 5.008 42.44 12.564c10.38 7.556 15.905 17.1 15.905 27.344V426.75c0 22.355-17.55 39.938-39.906 39.938H153.25c-22.355 0-39.906-17.583-39.906-39.938V175.344c0-10.245 5.455-19.72 16.062-27.28c10.607-7.563 26.22-12.626 44.313-12.626c15.962 0 28.056-5.142 34.686-14.407c3.904-5.455 5.733-11.545 6.625-17.81zm66.093 45.405c-30.545 0-50.062 12.865-63.282 32.313c-12.295 18.09-18.387 42.315-19.186 66.062c25.033 12.795 39.555 27.632 43.844 44.97a46 46 0 0 1 1.312 8.905c9.01 5.134 23.22 8.44 37.813 8.438c12.935-.002 26.08-2.538 36.093-6.875a49.4 49.4 0 0 1 1.47-10c4.486-17.583 19.028-33.2 44.405-45.563c-.838-22.46-6.793-46.595-19-64.938c-13.2-19.84-32.745-33.312-63.467-33.312zM232.188 223.5c9.157 0 16.593 7.405 16.593 16.563s-7.435 16.593-16.593 16.593c-9.157 0-16.562-7.436-16.562-16.594c0-9.157 7.405-16.562 16.563-16.562zm55.437 0c9.158 0 16.594 7.405 16.594 16.563s-7.438 16.593-16.595 16.593s-16.563-7.436-16.563-16.594c0-9.157 7.405-16.562 16.563-16.562zm-28.844 33.594c6.275 13.248 11.25 26.503 13.72 39.75c-9.148-3.022-18.29-3.426-27.438 0c3.34-13.25 7.352-26.504 13.72-39.75zm-37.03 63.47c-2.136 6.42-5.285 12.778-9.188 19.03c11.93 7.99 31.58 12.81 50.875 12.594c18.97-.214 36.878-5.57 46.22-12.407c-3.55-5.764-6.412-11.8-8.344-18c-11.947 4.416-25.424 6.375-38.75 6.376c-14.447.002-28.77-2.222-40.813-7.594zm-70.656 17.06c-8.9 11.268-12.694 22.493-10.03 36.313c68.925 5.54 164.194 31.92 226.686 60.75c9.16-11.166 12.518-22.67 9.97-36.78c-67.77-6.867-164.135-28.736-226.626-60.282zm216.594 0c-20.79 10.496-45.326 19.907-71.313 28.063c20.298 4.434 40.253 8.04 58.72 10.688c7.782-1.026 15.357-1.853 22.624-2.438c2.66-13.82-1.133-25.045-10.033-36.312zm-203.75 57.532a652 652 0 0 1-22.875 2.75c-2.55 14.11.81 25.615 9.968 36.78c21.375-9.86 46.575-19.447 73.25-27.998c-20.87-4.912-41.385-8.868-60.343-11.532", "punch-blast": "M91.773 25.994C189.313 167.854 104.52 157.17 65.64 169.2c38.8 52.918 16.554 102.644-44.503 133.788c52.5 21.085 122.25 30.452 42.027 141.707c79.578-45.024 134.707-48.82 127.13 53.15c57.795-58.495 133.043-87.973 208.054-38.53c-8.558-73.916 12.66-106.284 86.88-74.4c-79.58-73.01-46.696-116.363.458-158.83c-81.492-3.232-92.92-65.497-89.922-139.92c-49.183 53.518-86.497 47.756-104.002-56.962c-33.806 76.857-79.335 125.91-199.99-3.21zM202.15 135.336c16.1.356 25.565 12.198 34.666 24.678L177.312 263.08c-20.422 1.985-35.31-4.577-41.787-24.123l59.51-103.074a39 39 0 0 1 5.537-.545a33 33 0 0 1 1.578-.002m69.037 11.197c16.1.352 25.567 12.2 34.668 24.676L238.947 290.24c-20.423 1.985-35.31-4.586-41.785-24.127l66.91-119.03a39 39 0 0 1 5.537-.55a35 35 0 0 1 1.577-.002zm58.704 32.05c16.102.357 25.567 12.198 34.67 24.673l-65.945 117.547c-20.423 1.98-35.31-4.58-41.783-24.123l65.94-117.55a39 39 0 0 1 5.54-.544q.799-.019 1.58-.002zm46.342 55.233c16.773.098 26.746 11.977 36.354 24.485l-55.557 96.227c-20.026 1.297-34.856-5.367-41.786-24.125l55.56-96.224a39 39 0 0 1 5.428-.362zM127.55 271.713l105.83 47.52c3.015 21.69-2.782 38.788-21.958 48.91L105.588 320.62c-4.508-21.618 8.273-35.485 21.96-48.907z", "push": "m224 27.027l14.037 110.54l14.807-103.032zm112.71 21.127l-61.58 92.37l88.4-70.518zM125.15 69.012V98.81l77.475 41.715zM319 143.088C364.826 255.36 348.206 384 319 493h174V143.088zm-78.598 11.463q-.85-.01-1.718.02c-12.517.413-26.47 6.774-37.893 17.274c-15.774 14.527-23.843 34.25-20.167 49.3c-45 12.35-76.594 62.683-81.64 102.18c-3.968 37.166 15.322 61.415.558 85.432L40.77 447.54l-20.458 9.997L55.33 496.19h15.686l-17.27-32.17l72.906-38.573c14.698-8.6 16.065-23.74 19.28-41.092c16.147 11.876 33.577 23.202 47.56 32.48c-6.36 27.685-38.544 52.854-58.512 79.356h77.827l-2.905-5.21s-39.03-6.813-43.77-7.498c-.15.01-.29.005-.407-.02c-.327-.076-.082-.05.408.02c8.143-.477 65.126-51.946 63.53-64.54c-13.498-23.115-34.03-44.835-54.974-66.276c1.845-25.475 2.3-52.734 40.75-75.596l110.044-4.566c-.94-22.375-4.53-59.816-10.35-66.018c-9.702 7.54-10.872 30.843-11.628 48.637l-79.463-2.283c-8.445-.63-14.943-7.846-21.15-12.822c13.6 1.556 30.02-4.91 43.218-17.024c20.673-19.002 27.286-45.857 14.77-59.982c-4.795-5.412-11.97-8.365-20.478-8.46z", "quill-ink": "M496.938 14.063c-95.14 3.496-172.297 24.08-231.282 55.812l-29.47 49.28l-4.967-28.093c-10.535 7.402-20.314 15.222-29.314 23.407l-14.687 45.06l-5.032-25.155c-40.65 45.507-60.41 99.864-58.938 155.906c47.273-93.667 132.404-172.727 211.97-221.155l9.717 15.97c-75.312 45.838-156.387 121.202-202.187 208.25h12.156c19.78-12.02 39.16-26.858 58.406-43.44l-30.28 1.595l54.218-23.094c46.875-43.637 93.465-94.974 143.313-138.28l-24.47-5.19l56.5-21.03c26.853-20.485 54.8-37.844 84.344-49.843zM59.53 312.03v30.408H194V312.03zm20.376 49.095L47.25 389.813L24.97 474.78l14.53 15.876h177.22l14.56-15.875L209 389.814l-30.906-28.688H79.906z", "regeneration": "M229.594 16c-73.58 4.91-128.97 66.775-128.97 142.344c0 18.565 3.507 36.337 9.907 52.594c6.526 16.573 14.974 35.78 81.72 99.062l19.47-11.375a32.9 32.9 0 0 1-1.876-11.03c0-15.672 10.893-28.772 25.437-32.033v-22.75c-56.316-3.484-101.03-50.67-101.03-108.437c0-56.834 40.318-103.563 95.344-108.375zm12.75 137.313c-29.654 0-57.053 9.766-79.22 26.28c6.817 9.665 15.288 18.155 24.907 24.938c15.6-10.34 34.262-16.374 54.314-16.374c21.142 0 40.753 6.698 56.844 18.094c14.128-3.45 28.403-6.214 42.875-7.75c-24.47-27.71-60.07-45.188-99.72-45.188M355 209.093c-17.672.308-46.292 5.044-106.53 23.438v22.69c3.57.656 7.083 1.967 10.405 3.905c13.433 7.834 19.226 23.895 14.75 38.25l19.5 11.375c31.146-47.53 93.95-63.04 143.47-34.156c48.717 28.416 68.605 87.043 45.217 137.594c32.582-66.832 7.25-146.247-57.53-184.032c-15.916-9.282-32.896-15.096-50.032-17.625c-5.46-.805-11.217-1.576-19.25-1.436zm-239.47 36.813c-11.52 35.264-8.7 75.154 11.126 109.844c14.828 25.944 36.886 45.05 62.125 56.188a105.3 105.3 0 0 0 8.94-34.282c-16.666-8.476-31.163-21.767-41.19-39.312c-10.57-18.498-14.63-39.005-12.905-58.78c-10.022-10.637-19.54-21.764-28.094-33.658zM375.19 273.5a102.5 102.5 0 0 0-33.844 9.313c1.066 18.82-3.1 38.174-13.125 55.718c-10.573 18.5-26.094 32.307-43.908 40.69c-4.105 14.085-8.893 27.944-14.812 41.374c35.99-7.553 68.768-29.967 88.594-64.656c14.827-25.946 20.167-54.788 17.094-82.438zm-107.94 35.344c-2.35 2.796-5.24 5.218-8.563 7.156c-13.432 7.834-30.12 4.875-40.187-6.22l-19.47 11.345c25.173 51.015 7.052 113.74-42.468 142.625C107.844 492.166 47.638 480.238 16 434.5c40.998 61.92 121.75 79.472 186.53 41.688c15.916-9.282 29.36-21.24 40.095-34.97c10.946-13.994 23.187-30.992 44.063-121.03z", "ricochet": "M375.8 280.9c48.7 0 88.3 39.5 88.3 88.2c0 48.9-39.6 87.9-88.3 87.9s-88.2-39-88.2-87.9c0-48.7 39.5-88.2 88.2-88.2m-35.2-34l24.9 13.2c-97.1 0-102.8 86.2-102.8 86.2l-12.9-22.4c12.3-36.4 47-71.9 90.8-77m-37.1-19.6c-34.2 7.2-61.3 34.8-72.6 64l8.4 14.5c14.8-31 43.2-59.4 78.7-70.8zm-82.6 46.5l-20.5-35.5l-37.4 42.6l11.4-54l-94.45 8.3l87.25-48.3l-67.53-76.3l83.03 34.3V57.6l34.3 76.9l68.5-69.6l-36.3 98.6L489 147.8v28l-232.1 26.8l26 13.8c-27.2 11.1-49.2 33.1-62 57.4M31 250.4l94.3-60.4L27 216v63l87.6-30.1zm78.1-92.4L27 177v20l100.1-25.1zM301 143.7l153.8-11.9L489 120V94zM290.4 116l-10.8 17.6L489 81V70z", "saber-and-pistol": "M61.85 19.51c-15.08-.07-30.16 2.37-45.2 7.64C77.61 52.92 136.1 109.7 193.1 176.8l60.3-40.1C192.4 67.49 127.2 19.84 61.85 19.51M442 32.08L109.9 252.7C90 265.9 70.45 268.9 53.86 267c-12.28-1.4-22.98-5.3-31.77-9.6c-4.18 11.3-3.73 21-.16 27.5c4.67 8 14.54 13.6 35.43 10.7l22.8-3.2l-14.01 18.1c-27.23 35.3-43.29 105 7.58 167.4c10.57 12.7 22.97 18 36.27 18.9c13.1 1 27-3 38.2-9.9c11.2-6.8 19.3-16.3 22.2-25.1c2.9-9 1.7-16.6-7.6-25.6c-14.4-13.9-29.1-29.4-37-47.8c23.3-15.2 42.8-29.4 54.1-46.8c5.9-9.2 9.3-19.8 8.8-30.9c-.6-11.1-4.8-22.3-12.4-34.2c95.2-68 199.2-130 296.4-197.68zM309.6 207.9l-59.5 39.2c26.7 34.1 53.2 69 79.6 102.4c-14.7 12.4-28.6 17.5-37.5 16.7l-1.6 18.6c19.7 1.7 41-9.7 61.3-30.4c21.9-22.4 44.7-28.1 65.2-24.7c20.5 3.5 38.9 16.8 49.6 34.2c10.7 17.5 13.7 38.3 4.7 58.1c-9 19.9-30.8 39.7-73.1 52.7l5.4 17.8c45.8-14 72.9-36.8 84.7-62.7s7.7-53.8-5.8-75.6c-13.4-21.9-36-38.5-62.4-42.9c-13-2.2-26.9-1.2-40.6 3.4c-22.1-36.7-45.5-73-70-106.8m-148.1 80.2c5.7 9.3 8.1 17 8.5 23.6c.3 7-1.5 13.2-5.8 19.8c-7.7 11.9-23.4 24.2-44.1 38.2c-.3-2.2-.5-4.4-.6-6.8c-1.1-23.6 11-48.7 42-74.8m223 65c-6.6 3-13.4 7.4-20.2 13.6c8.6 26.1 36.2 62.1 60.3 77.1c8.6-4.9 15.2-10.3 20.1-16c-8.9-25.8-37.4-59.9-60.2-74.7", "scroll-quill": "M311.9 47.95c-17.6 0-34.6.7-50.7 2.43L244.6 93.5l-4.9-40.04c-2.5.46-5 .94-7.5 1.47c-9.1 1.94-15.1 7.22-20.3 14.87s-8.9 17.5-12.1 26.6C191 121.5 184 148 178.4 175c6 5.1 12 10.3 17.9 15.4l30.7-17.6l33.8 26.1l51.9-19.7l61 24.5l-6.8 16.7l-54.4-21.8l-54.7 20.7l-32.2-24.9l-14.9 8.5c19.6 17.3 38.6 34.4 56.5 51.2l14-6.4l33.9 16.1l31.2-13.1l24.2 23.3l-12.4 13l-15.8-15.1l-27.6 11.7l-33-15.8c6.9 6.7 13.6 13.2 20.1 19.7l1.7 1.8l19.5 76.3l-7.8-5.7l-53 .4l-38.1-17.8l-42.4 14.6l-5.8-17l49.2-17l41.1 19.2l24.7-.2l-70.7-51.7c-19.7 4.6-39.4 2.8-58.1-3.7c-4.2 44.4-5.9 85.7-7 118.7c-.4 10.7 2.7 23 7.5 32.5c4.9 9.5 11.7 15.4 15 16.1c5.2 1.2 19 3.2 37.7 5.1l12.4-39l19.1 41.7c16.7 1.2 35 2 53.5 2.2c28.2.3 57.1-.9 82-4.7c15.8-2.3 29.6-6 40.7-10.4c-11.8-5.1-21.6-10.6-29.1-16.6c-11.1-8.9-18.2-19.3-17.3-30.9v.2c5.4-96.4 10.8-188.8 30.3-286l.1-.4l.1-.4c5.3-17.9 17.9-39.86 36.1-55.83c-13.9-2.06-28.6-4-43.7-5.66l-22.3 25.3l-2.2-27.7c-19-1.64-38.4-2.71-57.4-2.92h-5.7zm148.5 20.44c-4.7 3.69-9.2 8.03-13.3 12.73c12.1 8.18 21.4 23.38 21.8 36.98c.3 7.8-1.9 14.9-7.7 21.4c-5.8 6.4-15.6 12.4-31.6 15.8l3.8 17.6c18.6-4 32.3-11.5 41.2-21.4c9-9.9 12.7-22.2 12.3-34c-.6-19.3-11.1-37.59-26.5-49.11M25.44 71.91c-.24 1.61-.38 3.43-.38 5.62c.1 7.69 2.03 18.17 5.83 30.17c3.41 10.7 8.27 22.5 14.35 34.8c10.63-5.3 20.59-11 28.41-18.1c-4.42 12.5-10.15 24.7-18.6 36.5c4.14 7.2 8.63 14.4 13.45 21.5c10.64-5.3 20.72-13 29.52-26.1c-3.3 16-8.47 30.6-18.27 41.8c6.53 8.5 13.5 16.8 20.75 24.5c8.7-9.3 15.6-21 20.7-34.9c3.8 18.5 2.6 35.3-5.7 49.4c8 7.2 16.3 13.7 24.8 19.1c6.1-14 8.9-30.6 8.5-49.7c9.2 23.7 11.3 42.9 9.6 59.5c20.2 9.2 40.8 12 61.3 6.1l4.2-1.3l69.3 50.6l-5.9-22.8c-73-72.8-175.4-156.7-261.86-226.69M312.8 123.9l33.2 13.8l31.3-9.9l5.4 17.2l-37.5 11.9l-33.6-14l-28.8 8.1l-4.8-17.4zm107.3 236.2c-.7 0-1.3.1-2 .1c-3.5.1-7.2.5-11.1 1.3l3.4 17.6c12.2-2.3 20-.4 24.5 2.5c4.4 2.9 6.3 6.8 6.4 12.5c.1 9.3-7 23-23.3 32.5c5.4 2.9 11.9 5.9 19.3 8.7c14.4-11.6 22.1-26.8 22-41.4c-.1-10.7-5.2-21.2-14.6-27.4c-6.7-4.3-15-6.5-24.6-6.4", "shadow-grasp": "M221.268 19.824c-9.866.172-19.968 2.14-30.002 6.63L65.386 67.983l-.44 7.108c-5.165 83.462-6.107 155.855-44.696 211.004v33.226c58.64-62.168 59.955-145.976 65.28-235.832l72.384-23.88c-21.245 23.445-34.98 43.238-42.084 59.808c-2.855 6.66-4.755 12.936-5.37 18.902c-7.816 25.16-5.503 51.296 15.24 74.905c-3.255-15.89-3.477-31.222-1.53-45.828a31.5 31.5 0 0 0 8.293 3.44c19.373 4.906 44.5-1.94 76.35-17.253c30.25-14.542 66.117-37.706 105.01-69.775l48.368 32.73c-29.567-2.373-57.21 2.11-80.665 12.113c-18.437 7.865-34.347 19.29-46.357 33.426c-24.973 26.092-33.82 71.752-28.268 98.403c2.466-10.895 6.392-22.255 11.496-33.578l143.338-40.074l46.852 41.906c-30.122-7.788-58.994-11.142-84.867-8.238c-39.39 4.42-72.503 24.934-86.783 64.244l-5.185 14.274l136.463-1.49l26.174 57.138c-42.183-25.606-84.56-34.873-125.693-34.37c-51.737.635-101.458 16.077-148.695 31.68l-2.484.82l-1.81 1.892c-11.985 12.504-27.58 37.417-41.985 66.17c-11.847 23.65-22.493 49.252-27.418 71.986H68c4.805-18.81 14.066-41.677 24.53-62.563c13.107-26.165 28.38-49.616 36.9-59.23c46.044-15.156 92.8-29.148 139.525-29.72c45.873-.563 91.752 11.28 139.047 48.245c15.232 20.38 26.606 41.606 31.72 64.203c4.928-23.655 5.312-52.454-11.784-76.38L381.65 276.343l-118.1 1.29c13.015-22.177 34.103-33.042 62.514-36.232c32.693-3.67 74.36 4.298 117.655 20.55c21.03 16.204 38.378 34.313 49.58 55.6c-1.527-26.99-10.2-58.732-39.917-76.972l-86.215-77.11l-130.076 36.366c8.267-22.522 26.764-40.777 52.687-51.834c28.765-12.27 66.23-15.26 106.263-4.094c24.284 10.177 45.53 23.124 61.742 40.658c-6.674-20.26-18.418-42.217-39.49-55.462L312.527 57.53l-6.082 5.124c-40.176 33.84-76.992 57.666-106.746 71.97c-29.754 14.306-52.98 18.12-62.073 15.817c-4.546-1.15-5.186-2.007-5.928-4.67c-.743-2.66-.484-8.857 3.464-18.067c7.5-17.498 27.28-44.476 62.05-78.553c25.34-10.698 50.48-17.074 75.28-16.107c-14.85-7.49-32.616-13.543-51.226-13.22z", "shattered-sword": "m496.223 16.818l-48.475 44.205l48.475 4.575zm-41.55 1.22l-68.91 11.28l-7.04 65.547l75.95-76.828zM352.26 77.907l-87.887 50.3l15.447 41.026l82.662-16.87zm64.34 25.022l-32.967 67.443l24.842 70.684l54.314-134.19zm-271.362 72.808c-10.02.155-20.714 3.165-30.79 9.057c4.143 8.863 3.382 18.708-2.776 24.873s-15.993 6.927-24.846 2.78c-12.923 22.167-11.88 47.34 2.485 61.73l29.84-29.87c58.655 42.87 109.37 92.94 150.57 151.24l-36.19 36.23l6.61-6.604c14.283 14.298 39.192 15.42 61.23 2.732c-4.88-9.197-4.366-19.74 2.107-26.22c6.47-6.478 17-6.993 26.185-2.112c12.66-22.062 11.54-47-2.732-61.3l-28.248 28.28c-57.035-42.41-107.91-92.665-151.426-150.386l35.455-35.492l-6.61 6.603c-7.834-7.843-18.863-11.726-30.862-11.542zm108.45 4.512c-17.61 17.41-39.674 39.21-62.22 61.375a729 729 0 0 0 27.407 30.094l59.063-59.126zm78.28 32.688L297 219.968l-65 65.063a728 728 0 0 0 35 32.376c22.02-23.134 43.764-46.41 64.97-69.406v-35.063zM173.47 313.25c-31.146 40.858-67.877 74.323-108.905 101.875c4.13 13.708 16.394 26.374 30.624 30.563c29.466-41.26 61.113-79.902 100.97-109.97a638 638 0 0 0-22.688-22.468zM44.5 410.28l-20.844 20.845c7.133 24.65 27.843 44.912 53.72 53.438l19.28-19.313c-26.948-4.28-48.314-26.91-51.875-52.938l-.28-2.03z", "sinking-trap": "m129.785 50.53l-18.34 3.59l11.502 58.716a45 45 0 0 0-8.738 2.092L81.245 58.336l-16.148 9.406l32.798 56.313a67 67 0 0 0-5.587 4.95l-47.675-45.73L31.7 96.762l49.007 47.01a78 78 0 0 0-3.734 6.988L29.01 123.87l-9.14 16.304l67.148 37.642c7.432 5.644 15.256 9.8 23.113 11.596l105.597 86.397l20.11 86.356l14.804 88.023h18.903l10.973-87.077l20.564-88.302l103.635-84.792c8.947-1.286 17.92-5.78 26.38-12.206l67.14-37.638l-9.137-16.303l-47.965 26.89a78 78 0 0 0-3.735-6.987l49.01-47.01l-12.937-13.488l-47.673 45.73a68 68 0 0 0-5.588-4.95l32.798-56.313l-16.15-9.406l-32.962 56.594a45 45 0 0 0-8.736-2.094l11.502-58.715l-18.342-3.59l-14.172 72.353c-2.132 2.757-4.35 5.304-6.79 7.547l-18.85-35.73l-16.53 8.72l22.436 42.527c3.555 9.423 7.447 17.122 11.592 23.307l-68.668 85.63a63 63 0 0 1-3.553 5.38c-8.562 11.545-21.266 19.51-35.67 19.51c-14.403 0-27.106-7.965-35.668-19.51c-.318-.43-.62-.874-.927-1.313h-.01l-70.574-88.007c4.583-6.456 8.876-14.704 12.763-25.01l22.427-42.513l-16.53-8.72l-18.85 35.73c-2.438-2.242-4.656-4.788-6.788-7.545L129.784 50.53zm128.33 121.837c-7.593 0-14.802 4.06-20.654 11.95c-5.85 7.89-9.825 19.448-9.825 32.406s3.974 24.516 9.826 32.408s13.062 11.952 20.655 11.952s14.804-4.06 20.656-11.95c5.854-7.893 9.828-19.452 9.828-32.41s-3.974-24.515-9.827-32.406c-5.85-7.89-13.06-11.95-20.655-11.95zm-52.912 257.06c-14.898 6.732-24.53 16.38-24.53 26.862c0 20.435 35.37 36.794 78.845 36.794c43.473 0 78.84-16.36 78.84-36.795c0-10.592-9.353-20.118-24.526-26.862c4.54 4.033 7.59 8.548 7.59 13.43c0 15.976-27.917 28.62-61.904 28.62s-61.323-12.644-61.323-28.62c0-4.833 2.55-9.427 7.008-13.43z", "snail": "M425.5 74.313c-8.895 0-16.35 6.21-18.25 14.53c-8.593 3.7-15.195 10.617-19.03 18.813c-5.254 11.223-6.848 24.648-7.158 39.313c-.525 24.904 2.99 53.73 4.532 79.03c-1.782 14.666-4.867 28.518-9.063 41.406c2.84 17.934 3.39 36.487.94 55.188c-5.017 38.286-36.52 61.134-70.22 67.937c-31.048 6.27-65.312.42-87.656-19.405c-34.752 22.61-76.646 28.578-112.406 16.594c-42.048 16.248-74.53 38.826-87.626 61.436H341.25c103.105 0 137.952-107.888 111.406-225.53c-.018.023-.044.038-.062.06c-5.71-40.853.98-70.45 14.906-88.905a18.6 18.6 0 0 0 6.25 1.095c10.333 0 18.688-8.386 18.688-18.72c0-10.332-8.355-18.718-18.688-18.718s-18.72 8.386-18.72 18.72c0 1.017.095 1.994.25 2.968c-21.242 25.165-28.854 65.708-19.25 117.906c-10.296 4.836-21.152 2.878-31.436-6.75c-1.286-28.002-5.364-59.27-4.844-83.905c.283-13.405 2.07-24.72 5.375-31.78c2.1-4.49 4.222-7.344 7.47-9.032c3.355 3.196 7.904 5.187 12.905 5.187c10.333 0 18.688-8.386 18.688-18.72c0-10.332-8.355-18.718-18.688-18.718M193.344 106.25c-2.196-.01-4.398.036-6.594.125c-35.143 1.42-70.142 15.475-99.063 41.25c-56.73 50.558-59.43 144.59-9.187 201.125c38.648 38.3 106.856 34.79 151.5-9.844c37.712-37.61 40.61-94.977 8.78-127c-22.1-22.23-60.996-24.817-85.843 1.188c-5.534 5.79-8.98 16.02-8.906 26.906c.076 10.887 3.653 22.003 9.532 29.063c3.593 4.313 10.625 8.476 18.5 10.468c4.687 1.187 9.596 1.58 14.094 1.25c13.195-.228 26.156-9.01 26.156-26.624c0-15.72-10.332-24.428-21.937-26.28c7.773-.697 14.783.618 20.594 3.81c8.51 4.678 13.69 12.944 15.468 21.533c3.52 16.995-5.478 37.125-25.407 43.343l.032.062c-.162.06-.337.067-.5.125c-.046.014-.078.05-.125.063c-10.572 3.753-22.202 3.567-32.968.843c-10.977-2.776-21.238-8.167-28.282-16.625c-9.418-11.306-13.744-26.222-13.844-40.874s4.01-29.453 14.062-39.97c32.03-33.52 83.263-31 112.625-1.467c39.98 40.22 35.282 109.352-8.843 153.374v.03c-2.627 2.627-5.384 5.056-8.156 7.438c17.017 12.7 44.022 17.605 68.532 12.657c28.256-5.706 51.524-22.667 55.375-52.064c9.492-72.455-34.215-147.342-72.25-179.25c-27.663-23.21-60.402-34.506-93.343-34.656z", "spectre": "M282.83 18.877c21.567 6.146 36.328 15.205 40.572 28.77a71 71 0 0 0-4.066 2.363c-25.655 5.807-53.084 18.634-81.047 34.363c20.225-4.69 36.705-4.42 47.544 3.324c-5.712 10.3-10.797 22.294-15.123 36.06c-21.343 67.922-125.678-80.577-189.065-5.255C41.47 166.24 92.702 212.342 26.5 294.29c35.583-4.14 45.11-9.47 62.416-36.21c10.44-16.13 28.52-22.1 44.668-21.45c-12.718 11.206-25.786 30.354-38.21 59.895c19.832-18.528 44.927-38.68 71.603-40.005c.912 6.354-2.408 13.74-12.008 21.418C93.21 327.327 15.58 364.185 19.83 476.504c5.558-11.267 11.646-20.31 17.574-28.617c5.98 29.582 28.2 53.8 92.99 40.482c-46.928-6.407-76.268-59.586-45.355-82.528c62.716-46.544 128.82 1.436 269.9-75.342a80 80 0 0 1 7.164-3.46c-2.246 19.6-12.367 39.84-22.362 57.14c14.26-10.38 25.415-20.147 33.928-29.262c2.14 26.14-11.748 54.65-25.393 78.268c43.26-31.49 61.19-57.976 63.207-78.422c9.334 36.678-1.895 95.547-25.03 123.492c77.553-39.433 106.608-77.127 109.76-190.664c1.662-59.824-66.23-60.536-56.435-101.344c11.945-49.756 6.768-84.69-7.565-107.947c-19.6-49.73-79.99-59.74-149.385-59.423zM89.8 47.684C54.69 47.534 45.233 83.056 55.724 117c17.146-51.504 70.414-44.24 111.17-34.367c-33.282-25.005-58.707-34.87-77.096-34.95zm254.595 30.742c18.643 21.37 29.373 43.02 10.105 65.732c-26.562-16.677-26.985-39.252-10.105-65.732m74.494 48.6c3.655-.013 7.78.35 12.473 1.09c-1.706 30.506-14.4 33-46.634 32.154c8.335-22.146 14.416-33.176 34.16-33.245zm-84.677 40.316c9.652.1 20.258 2.84 30.598 8.918c44.65 26.246 21.934 73.314-4.1 74.78c-15.174.855 1.443-23.842-16.17-38.476c-15.258-12.678-38.596 12.53-45.204-5.78c-8.218-22.693 10.21-39.696 34.877-39.442zm60.18 246.168c-24.195 27.825-58.89 60.1-99.444 31.41c16.625 45.643 68.87 70.465 99.443-31.41z", "sprint": "M169.53 16.344L259.345 88L337 92.28l-1.03 18.657l-161.376-8.906l-118.78-4.905l227.28 68.03l-197.72 246.75l-14.53-17.655l-49.22 96.625l248.69-202.78l51.81 11.592l-38.78 40.594L270.5 329.5l-57.28 84.125L444.843 273.47L328 241.06l100.22-81.718c1.132.46 2.3.898 3.5 1.22c23.324 6.248 49.764-16.835 59.06-51.533c9.298-34.695-2.08-67.874-25.405-74.124s-49.765 16.802-59.063 51.5a95.4 95.4 0 0 0-2.875 16.22z", "stone-tablet": "M206.355 24.53L23.982 171.567l.086.373h-.013l-5.7 124.037l131.676 82.55L245.66 492.14l63.94-8.59l109.808-109.587l72.772-35.453l.953-70.24l1.186-50.508L327.75 104.63l-33.41 14.46l-3.46 29.756l-18.566-2.16l3.21-27.598l-46.934-7.715l-21.106 28.844l-15.082-11.037l27.887-38.11l65.273 10.73l-.13.78l25.2-10.908l-51.485-64.012zM40.605 218.886l117.91 74.13l49.065-9.7l-14.14-13.71l13.01-13.42l39.75 38.545l-71.942 14.223l-18.918 50.844l-117.817-73.86zm362.754 59.068l44.382 20.55l26.463-12.92l-.56 41.165l-50.293 24.504l9.59-39.008l-37.434-17.332l7.85-16.96zm-211.534 37.373l78.108 93l-24.81 54.158l-75.405-89.59l.602.225zm218.403 11.028l-9.896 40.24l-89.69 89.51l19.092-49.204zm-102.293 85.064l-21.904 56.44l-24.312 3.267l26.118-57.01l20.1-2.697z", "stone-wall": "m18.08 23l.1 18H494V23zM254.3 54.93L133 61.6l30.1 68.5l98.1-3.6zm115.9.28l-92.9.53l3 71.96l96.8-.9zM18.23 56.43l.35 74.67l72.27-2.4l24.35-72.27zM393 64.24l-.5 47.16l15.7 21.5l85.8-6.3V64.93zM120.8 84.68l-17.6 49.82l41.1-1l-8.2-34.02zm354.7 56.02l-4 75.5l22.5-.6v-74.9zm-25.7 3.5l-97.3 10.7L346 219l110.7-3.2zm-243.8.7l-4 75.5l126.1-3.9l7-71.1zm-145.33 2.7l-3.9 75.5l126.13-3.9l-6.9-71.6zm-42 1.5l.33 72.4l24.77-.8l-6.9-71.6zm278.93 84.3L276 277.2l2.1 42l128.7-1.9l-7.6-79.7zm-40.2 1.4l-127.2 6l8 69.5l124.7 6.6zm236.6 3.1l-66.5 2.9l-7.5 75.8l74-5.2zm-474.89 7l.31 65.8l100.78-3.1l-6.9-62.7zm470.29 81.2l-115.9 10.5l-3.3 65l121.5-3.5zm-422.36 4.1l-47.52 2l.34 72.9l51.1-1.3zm17.84 0l3.98 68.5l138.64 9.6l-3-78.1zm161.22 4.3l-5.5 69l107.5 5.4l-1-73.5zm185.4 81.1l-4 75.5l66.5-.6v-73.8zm-9.8 1.2l-39 3.6l27.4 28zm-399.46 1.8l-2.13 40.6l.16 34.8H145.4v-68.9l-46.56-2.5l-18.4 14L68.56 421zm247.96.3l-111.3 1.5l3.5 72.5l114.7-2.4zm101.2 4.3l-72.2 5.9l-8.9 62.1l125.6.6l-6.2-27z", "suspicious": "M255.422 18.346c-111.086 0-204.14 76.375-229.615 179.533c-11.867 70.7 11.228 143.745 60.048 194.24c-5.034 28.402-5.687 61.755-5.687 100.54h18.687c0-57.013 2.106-100.723 14.88-130.744c12.776-30.02 34.883-47.983 81.394-56.728l15.61-2.934l-10.148-12.22c-16.364-19.7-27.22-48.142-27.22-79.84c0-30.586 9.785-58.117 25.093-77.66c15.308-19.54 35.707-30.99 57.99-30.99s42.683 11.45 57.99 30.99c15.308 19.543 25.094 47.074 25.094 77.66c0 31.072-9.61 59.05-25.186 78.55l-10.036 12.565l15.885 2.497c50.69 7.97 72.17 25.994 83.77 56.398c11.598 30.404 11.513 75.137 11.513 132.455h18.69c0-30.09.238-57.06-1.506-81.117c36.888-41.708 59.28-96.54 59.28-156.668c0-130.742-105.786-236.53-236.528-236.53zm8.2 43.45c30.12.1 60.5 7.25 88.24 21.995c99.02 52.642 132.557 179.59 80.525 276.79a208 208 0 0 1-5.698 9.95c-1.455-5.895-3.186-11.558-5.256-16.985a106 106 0 0 0-2.913-6.877c43.444-87.576 12.394-199.683-75.432-246.373c-24.95-13.264-52.307-19.685-79.436-19.775c-59.683-.2-118.266 30.23-147.71 85.798c-25.907 48.89-22.56 108.01 5.224 152.838a99 99 0 0 0-12.906 14.582c-34-50.89-38.835-119.552-8.834-176.17c32.91-62.107 97.928-95.992 164.195-95.77zm86.657 98.9c37.642 37.22 50.227 94.933 32.638 145.548c-5.115-3.25-10.7-6.19-16.773-8.81c10.177-31.69 6.895-66.347-8.112-95c-.702-14.7-3.382-28.753-7.754-41.74zM158.92 173.642c-2.762 11.597-4.24 23.864-4.24 36.55c0 7.46.533 14.768 1.543 21.875c-1.932 21.073 3.05 42.43 14.21 60.077c-6.35 1.94-12.302 4.153-17.867 6.638c-19.113-32.745-21.045-74.92-2.818-110.215c2.726-5.28 5.8-10.255 9.172-14.925m60.45 29.34c-15.794.205-19.24 4.585-24.546 8.15c12.483 11.99 36.9 10.832 47.748 0c-4.992-4.043-10.37-8.317-23.203-8.15zm74.69.177c-15.794.205-19.24 4.586-24.546 8.15c12.483 11.992 36.9 10.833 47.748 0c-4.992-4.042-10.37-8.317-23.203-8.15z", "swap-bag": "M363.783 23.545c-9.782.057-16.583 3.047-20.744 10.22c-17.51 30.18-38.432 61.645-48.552 97.245c2.836.83 5.635 1.787 8.373 2.853c7.353 2.863 14.38 6.482 20.542 10.858c27.534-25.542 58.165-45.21 87.45-65.462c11.356-7.854 12.273-13.584 10.183-20.83s-9.868-16.365-20.525-23.176c-10.658-6.81-23.87-11.33-34.73-11.68q-1.02-.032-1.997-.027zm-68.998.746c-10.02-.182-17.792 6.393-23.924 20.24c-8.94 20.194-10.212 53.436-1.446 83.185c.156-.008.31-.023.467-.03c1.99-.087 3.99-.072 6 .03c9.436-34.822 27.966-64.72 44.013-91.528c-10.31-8.496-18.874-11.782-25.108-11.896zM197.5 82.5L187 97.97c14.82 10.04 29.056 19.725 39.813 31.374c3.916 4.24 7.37 8.722 10.31 13.607a38.1 38.1 0 0 1 13.69-10.792c.407-.188.82-.355 1.228-.53c-3.423-5.44-7.304-10.418-11.51-14.972C227.765 102.83 212.29 92.52 197.5 82.5m223.77 12.27c-29.255 20.228-58.575 39.152-84.348 62.78c.438.576.848 1.168 1.258 1.76c20.68-6.75 49.486-15.333 73.916-19.41c11.484-1.916 15.66-6.552 17.574-13.228s.447-16.71-5.316-26.983a63 63 0 0 0-3.083-4.92zm-223.938 47.87c-14.95.2-29.732 4.3-43.957 12.766l9.563 16.03c21.657-12.89 42.626-14.133 65.232-4.563q.782-8.387 3.728-15.21c.35-.806.73-1.586 1.123-2.354c-11.87-4.52-23.83-6.827-35.688-6.67zm75.8 3.934c-5.578-.083-10.597.742-14.427 2.526c-4.377 2.038-7.466 4.914-9.648 9.97c-.884 2.047-1.572 4.54-1.985 7.494c.456-.007.91-.03 1.365-.033c16.053-.084 32.587 2.77 49.313 9.19c7.714 2.96 15.062 7.453 22.047 13.184c3.217-2.445 4.99-4.72 5.773-6.535c1.21-2.798 1.095-5.184-.634-8.82c-3.46-7.275-15.207-16.955-28.856-22.27c-6.824-2.658-13.98-4.224-20.523-4.614q-1.228-.075-2.424-.092zm-24.757 38.457c-22.982.075-44.722 7.386-65 19.782c-32.445 19.835-60.565 53.124-80.344 90.032c-19.777 36.908-31.133 77.41-31.186 110.53c-.053 33.06 10.26 57.27 32.812 67.782c.043.02.082.043.125.063h.032c24.872 11.51 65.616 19.337 108.407 20.092c42.79.756 87.79-5.457 121.874-20.187c21.96-9.49 34.545-28.452 40.5-54.156c5.954-25.705 4.518-57.657-2.375-89.314c-6.894-31.657-19.2-63.06-34.095-87.875s-32.614-42.664-48.063-48.593c-14.664-5.627-28.898-8.2-42.687-8.156", "terror": "M250.594 20.906c-45.425.318-89.65 20.975-112.78 61.282c-22.594 39.374-34.23 82.722-31.314 115.406c1.458 16.34 6.393 29.793 14.72 39.5c8.325 9.706 20.104 16.173 37.53 18.03l11 1.19l-3 10.655c-2.337 8.272-3.75 16.256-3.75 24.905c0 27.038 4.292 79.342 18.5 123.563c7.104 22.11 16.715 42.157 28.78 56.093c12.068 13.938 25.855 21.845 43.814 21.845c17.96 0 31.777-7.907 43.844-21.844c12.066-13.935 21.677-33.982 28.78-56.092c14.21-44.22 18.5-96.525 18.5-123.563c0-8.65-1.41-16.635-3.75-24.906l-2.968-10.533l10.875-1.28c17.146-2.04 29.05-8.367 37.47-17.72c8.417-9.352 13.49-22.17 15-38c3.02-31.66-8.958-74.675-34.814-117.03c-25.5-41.774-70.927-61.8-116.374-61.5h-.062zM173.406 145.47c24.447 0 44.063 19.58 44.063 44.03a43.92 43.92 0 0 1-44.064 44.063c-24.446 0-44.03-19.617-44.03-44.063s19.584-44.03 44.03-44.03zm161.438 0c24.447 0 44.062 19.58 44.062 44.03a43.92 43.92 0 0 1-44.062 44.063c-24.447 0-44.03-19.617-44.03-44.063a43.864 43.864 0 0 1 44.03-44.03m-162.47 35.093c-6.623 0-11.78 5.188-11.78 11.812s5.157 11.78 11.78 11.78c6.625 0 11.814-5.156 11.814-11.78c0-6.627-5.188-11.813-11.813-11.813zm164.22 0c-6.624 0-11.78 5.188-11.78 11.812c-.002 6.624 5.156 11.78 11.78 11.78s11.812-5.156 11.812-11.78c0-6.627-5.187-11.813-11.812-11.813zm-81.406 51.906c38.762 0 68.875 36.01 68.875 78.593c0 19.938-2.457 56.192-11.532 88.687c-4.536 16.247-10.655 31.58-19.686 43.563c-9.03 11.98-21.96 20.812-37.656 20.812s-28.626-8.83-37.657-20.813c-9.03-11.98-15.15-27.315-19.686-43.562c-9.075-32.495-11.563-68.75-11.563-88.688c0-42.584 30.145-78.593 68.907-78.593zm0 18.686c-17.93 0-34.16 11.453-43.063 29.063h86.094c-8.895-17.61-25.103-29.064-43.033-29.064zm-27.282 173.938c1.45 2.532 2.956 4.878 4.53 6.97c6.78 8.99 13.692 13.373 22.75 13.373c9.06 0 15.943-4.383 22.72-13.375c1.576-2.09 3.08-4.436 4.53-6.968z", "think": "M431.654 39.256q-11.909 0-23.123 3.236q-11.097 3.238-21.966 9.828v21.735q11.215-7.747 21.504-11.793q10.405-4.046 19.54-4.045q12.486 0 20 6.357q7.631 6.36 7.63 16.65q0 5.664-3.006 11.098q-2.89 5.434-9.48 11.56l-10.404 10.292q-10.406 9.942-13.643 17.457t-3.236 19.192v17.805h22.08v-14.22q0-6.015.346-9.48q.349-3.47 1.04-5.896q.926-2.888 3.123-5.895q2.31-3.121 7.745-8.557l10.174-9.943q10.403-9.943 14.567-17.803q4.162-7.978 4.162-16.766q-.001-18.382-12.95-29.595q-12.834-11.214-34.106-11.214zm-253.76 6.365C97.293 45.62 30 127.903 30 231.77c0 47.6 14.142 90.66 37.213 123.353c5.01-2.917 10.87-4.5 17.02-4.005c9.196.74 18.27 5.864 26.245 14.832c18.47 20.77 35.302 33.96 59.48 49.117c62.787-35.66 93.123-76.714 139.263-117.365c2.854-2.516 5.8-4.558 8.777-6.177c5.04-18.706 7.783-38.79 7.783-59.755c0-103.866-67.292-186.147-147.89-186.147zM97.01 146.063c15.177.09 30.255 8.09 43.607 23.764l-13.7 11.674c-11.907-13.977-21.85-18.017-31.802-17.385c-9.952.633-21.423 6.88-33.7 18.172L49.228 169.04c13.87-12.76 28.547-21.86 44.743-22.89a44 44 0 0 1 3.037-.088zm151.96 0a44 44 0 0 1 3.036.088c16.196 1.03 30.874 10.13 44.744 22.89l-12.186 13.247c-12.278-11.293-23.748-17.54-33.7-18.172s-19.896 3.408-31.802 17.385l-13.7-11.674c13.352-15.674 28.43-23.673 43.607-23.763zm165.803 39.56v29.366h23.47v-29.365zm-315.326 7.874c12.646 0 24.26 3.752 33.117 10.36c8.857 6.61 15.106 16.57 15.106 27.912s-6.25 21.302-15.106 27.912s-20.47 10.36-33.117 10.36s-24.26-3.75-33.117-10.36s-15.105-16.57-15.105-27.912s6.25-21.3 15.105-27.91c8.857-6.61 20.47-10.362 33.117-10.362m156.89 0c12.647 0 24.262 3.752 33.118 10.36c8.857 6.61 15.106 16.57 15.106 27.912s-6.248 21.302-15.105 27.912s-20.47 10.36-33.117 10.36s-24.26-3.75-33.117-10.36s-15.105-16.57-15.105-27.912s6.25-21.3 15.106-27.91s20.472-10.362 33.118-10.362zm-160.064 18.12c-7.707.567-14.474 3.155-19.177 6.665c-5.34 3.986-7.87 8.663-7.87 13.488s2.53 9.5 7.87 13.486c5.34 3.985 13.335 6.785 22.35 6.785c9.017 0 17.013-2.8 22.353-6.786c5.338-3.985 7.87-8.662 7.87-13.486c0-.09-.006-.177-.008-.266a19.61 19.515 0 0 1-15.506 7.584a19.61 19.515 0 0 1-19.61-19.516a19.61 19.515 0 0 1 1.727-7.955zm156.688.013c-7.623.596-14.31 3.172-18.974 6.65c-5.34 3.986-7.87 8.663-7.87 13.488s2.53 9.5 7.87 13.486c5.34 3.985 13.336 6.785 22.352 6.785s17.012-2.8 22.35-6.786c5.34-3.985 7.873-8.662 7.873-13.486c0-.23-.01-.46-.02-.688a19.61 19.515 0 0 1-15.493 7.566a19.61 19.515 0 0 1-19.61-19.515a19.61 19.515 0 0 1 1.524-7.5zm83.263 92.337a11 11 0 0 0-1.32.012c-3.626.24-8.098 2.217-13.782 7.225c-41.548 36.606-72.158 76.506-129.536 112.022l-39.91 26.484l-9.953-14.997l12.454-8.264c-22.1-14.347-39.177-28.335-57.145-48.542c-5.797-6.518-10.678-8.563-14.24-8.85c-3.56-.286-6.562.945-9.528 3.948c-5.88 5.95-9.498 19.257-4.2 32.29c12.462 22.93 36.147 44.15 54.038 71.204l1.953 2.95l-.582 3.49a521 521 0 0 0-1.74 11.06h211.452c.103-1.217.18-2.456.193-3.746c-.11-4.19-3.22-10.067-8.258-14.563c-5.066-4.518-11.74-7.125-15.402-7.032l-12.436.317l3.587-11.91c1.944-6.454.005-14.632-4.613-18.827c-4.62-4.195-12.2-6.694-27.313.99L259.2 425.156c28.086-30.964 65.366-68.32 87.653-102.594c3.04-4.676 1.373-11.558-3.237-15.41c-2.017-1.685-4.398-3.036-7.39-3.185zm-122.707 36.64l7.197 16.498c-28.058 12.24-57.48 12.936-85.8-.072l7.513-16.355c23.976 11.013 46.85 10.504 71.09-.07z", "turtle": "M258.406 25.03c-13.73 0-44.75 28.13-44.75 62.814c0 31.578 6.432 55.835 16.5 70.937c-23.144 3.766-44.237 12.52-61.03 27.314a99 99 0 0 0-8.5 8.47c-38.335-36.232-115.217 13.032-137 39.28c-19.604 23.618 58.395 26.618 110.718 16.75c-1.837 9.754-2.813 20.262-2.813 31.53c0 39.603 11.68 76.216 31.157 104.282c-42.685 4.89-61.916 64.204-61.093 90.438c.912 29.105 77-17.718 105.5-49.375c8.82 4.862 18.197 8.497 28 10.75c4.822 14.255 10.526 28.394 23.312 41.655c13.732-13.89 18.762-27.77 23.28-41.656c9.815-2.253 19.203-5.883 28.033-10.75c28.498 31.656 104.587 78.48 105.5 49.374c.822-26.234-18.41-85.55-61.095-90.438c19.477-28.066 31.156-64.68 31.156-104.28c0-11.27-.974-21.778-2.81-31.532c52.322 9.868 130.32 6.868 110.717-16.75c-21.784-26.248-98.666-75.512-137-39.28a99 99 0 0 0-8.5-8.47c-16.86-14.855-38.058-23.604-61.312-27.344c10.232-15.31 16.78-39.817 16.78-70.906c0-34.683-31.018-62.813-44.75-62.813m0 150.25c20.22 0 38.787 3.424 54.563 10.532l-26.345 31.97h-56.438l-26.343-31.97c15.775-7.108 34.34-10.53 54.562-10.53zm-70.937 20.032l25.75 31.25l-29.97 44.032l-4.28 6.28l5.31 5.47l36.532 37.625l-23.312 28.436l-5.28 6.438l5.78 6l27.125 28l13.438-13l-21.344-22.03l21.53-26.22h39.313l21.53 26.22l-21.343 22.03l13.438 13l27.125-28l5.78-6l-5.28-6.438L296 319.97l36.563-37.626l5.25-5.438l-4.22-6.28l-29.718-44.376l25.5-30.938a84 84 0 0 1 5.97 4.782c19.106 16.832 31.25 42.762 31.25 82.03c0 78.538-49.7 140.063-108.19 140.063c-58.486 0-108.186-61.525-108.186-140.062c0-39.27 12.14-65.2 31.25-82.03c1.913-1.688 3.93-3.273 6-4.782zm41.593 41.157h59.156l25.655 38.25l-33.188 34.186h-44.562L203 274.78z", "unlit-candelabra": "m249.344 17.344l-.97 37.375h-14.968v147.56h43.375V54.72h-12.936l-14.5-37.376zm135.22 0L376.28 54.72h-15.436v147.56h43.375V54.72h-12.47l-7.188-37.376zm-252.502.312L121.094 54.72h-14.03v147.56h43.374V54.72h-14.344l-4.03-37.064zm-30.78 204.375c0 16.145 9.13 26.056 20.343 29.72v41.72c0 30.783 24.7 56.53 55.688 56.53h70.125v91.5c-22.293 3.78-42.157 21.122-42.157 52.03h103c0-30.993-19.874-48.318-42.155-52.06V350h69.28c30.987 0 56.533-25.546 56.533-56.53v-41.345c11.76-3.307 21.593-13.317 21.593-30.094h-61.06c0 16.353 9.37 26.297 20.78 29.845v41.594c0 20.7-17.14 37.842-37.844 37.842h-69.28v-79.53c11.213-3.643 20.343-13.555 20.343-29.75h-61.064c0 16.93 10.077 27.015 22.03 30.218v79.063h-70.124c-20.702 0-37-16.946-37-37.844v-41.22c11.955-3.18 22.032-13.234 22.032-30.22H101.28z", "unplugged": "M196 136c-61.174 0-111.656 45.834-119.063 105H16v30h60.938C84.344 330.166 134.825 376 196 376h15c8.31 0 15-6.69 15-15v-30h45v-30h-45v-90h45v-30h-45v-30c0-8.31-6.69-15-15-15zm210 0c-8.31 0-15 6.69-15 15v30h30v30h-30v90h30v30h-30v30c0 8.31 6.69 15 15 15h90V136z", "vomiting": "M256.25 20.313c-108.64 0-196.78 90.592-196.78 202.937c0 84.615 49.994 156.904 121.093 187.438v-16.375c0-25.638-6.2-40.132-13.875-48.47c-7.675-8.336-17.567-11.4-27.72-11.937c-18.252-.97-32.4-12.266-40.905-27c-6.47-11.205-5.975-24.767-.532-36.97c5.444-12.2 15.49-23.71 29.19-33.905c27.394-20.39 69.79-35.56 122.436-35.56c52.702 0 98.475 15.648 129.344 36.218c15.435 10.284 27.24 21.746 34.22 33.968c6.976 12.222 8.93 26.41 2.186 38.094c-4.19 7.257-11.026 11.988-18.687 15.938c-7.663 3.95-16.085 6.78-24.595 6.78c-11.865 0-20.63 2.214-27.438 10.157s-12.437 23.63-12.437 52.688v16.437c71.195-30.488 121.28-102.814 121.28-187.5c0-112.347-88.14-202.938-196.78-202.938m-76.656 86.718c1.53.02 3.05.078 4.562.157c14.525.766 28.29 4.3 41.063 9.97l17.31 7.687l-16.624 9.062l-84.062 45.875l-8.938-16.405l65.156-35.563c-24.195-5.513-50.92-1.877-82.062 17.532l-9.875-15.844c25.778-16.066 50.528-22.75 73.47-22.47zm150.312 0c22.944-.28 47.722 6.404 73.5 22.47l-9.875 15.844c-31.14-19.41-57.865-23.045-82.06-17.53l65.155 35.56l-8.938 16.407l-84.062-45.874L267 124.844l17.313-7.688c12.772-5.67 26.506-9.203 41.03-9.97c1.514-.078 3.034-.136 4.563-.155m-73.594 170.282c-68.947 0-113.104 15.367-116.843 37.907l.5.03c13.487.714 28.843 5.31 40.468 17.938c11.624 12.627 18.812 32.418 18.812 61.125v100.312h113.813V394.312c0-31.4 5.766-51.81 16.937-64.843c11.17-13.034 27.003-16.69 41.625-16.69c.352 0 .76-.03 1.156-.06c-6.417-22.614-49.872-35.408-116.467-35.408z", "vortex": "M19.188 17.5v152.063C66.86 258.63 151.98 320.656 248.28 341.092a76.4 76.4 0 0 0 23.064 3.563c6.747 0 13.288-.884 19.53-2.53c-47.547 33.525-105.556 53.155-168.187 53.155c-36.77 0-71.258-7.8-103.5-20.342v35.625c39.863 9.25 78.667 13.034 114.188 10.812c22.572-1.413 43.213-4.7 63.063-10.53c-45.634 33.337-107.435 50.03-177.25 49.686v29.44c6.82.457 13.417.874 20.343.874c132.277 0 245.515-77.08 300.283-188.28c.174-.357.357-.708.53-1.064c.236-.48.463-.953.688-1.438c-.046.417-.076.835-.124 1.25c-7.255 62.57-34.964 122.59-82.937 170.563c-7.697 7.696-15.647 14.944-23.94 21.594h104.595c28.33-57.514 37.687-120.485 29.125-180.72c-3.284-23.093-8.64-45.25-16.938-67.188c53.172 71.838 78.54 160.38 71.47 247.907h73.374C492.68 363.235 416.173 252.043 305.406 199c-.273-.13-.538-.276-.812-.406a74 74 0 0 0-3.375-1.53c-.6-.278-1.183-.573-1.783-.845c.102.086.21.16.313.25a76 76 0 0 0-13.5-4c61.317-7.77 125.604 3.935 183.25 37.218c8.896 5.135 17.562 10.86 25.656 16.78v-94.655c-22.682-5.175-45.22-7.668-68.125-7.97c-66.77-.874-133.078 18.29-189.186 54.876c-9.19 4.476-17.36 10.758-24.063 18.343c24.015-56.973 66.21-107.004 123.69-140.188c49.576-28.623 104.276-41.016 157.686-39V17.5h-118.78c-41.383 17.778-79.457 43.683-111.282 75.656c16.34-27.53 36.19-52.736 58.594-75.656h-42.032c-60.804 67.31-91.872 156.46-87 245.656a77 77 0 0 0-.156 4.656c0 14.815 4.25 28.65 11.563 40.407c-47.44-37.913-83.766-90.83-100.625-153.75c-12.45-46.46-12.248-92.975-2.657-136.97H19.188zm252.156 192.188c32.223 0 58.156 25.902 58.156 58.125s-25.933 58.156-58.156 58.156c-11.938 0-23.007-3.57-32.22-9.69a45.4 45.4 0 0 0 20.72 4.97c25.67 0 46.438-20.802 46.437-46.47c.003-23.096-16.51-42.202-38.592-45.81c10.03 6.777 17 18.396 17 31.405c0 20.813-17.123 37.313-37.938 37.313c-13.864 0-25.89-7.378-32.438-18.532a59 59 0 0 1-1.125-11.344c0-32.223 25.934-58.125 58.157-58.125z", "wax-seal": "M283.406 26c-31.262-.124-67.23 14.174-87.406 24.813c-14.187 7.48-63.924 37.248-106.594 45.5c-55.05 10.643-86.878 63.63-54.594 90.156c53.676 44.1 55.533 101.236 15.844 143.186c-43.832 46.33 1.16 113.166 63.844 105.625s89.117.543 121.03 32.44c41.408 41.38 131.457 24.757 153.595-32.595c10.275-26.614 24.304-56.372 58.594-68.563c40.316-14.328 52.335-59.373 26.217-90.625c-19.376-23.183-21.61-47.184 4.875-95.468c21.756-39.664 4.657-83.827-55.937-80.44c-45.002 2.515-64.425-27.456-97.156-59.374C314.866 30.074 299.78 26.066 283.405 26zm-20.312 76.188c87.992 0 159.53 71.508 159.53 159.5c0 87.994-71.538 159.53-159.53 159.53s-159.53-71.536-159.53-159.53c0-87.995 71.538-159.5 159.53-159.5m0 18.687c-77.892 0-140.813 62.918-140.813 140.813s62.922 140.843 140.814 140.843c77.89 0 140.844-62.948 140.844-140.842c0-77.892-62.953-140.813-140.844-140.813zm-9.344 19.188h18.688v12.562l32.218 9.78l-32 9.72h-.78v97.47H253.75V172.53l-33.344-10.124l33.344-10.125zm-51.875 40.343c9.892-.023 20.71 2.28 32.313 7.156v20.594c-14.94-7.682-27.267-9.843-36.657-8.844c-11.21 1.194-18.696 6.513-23.468 14.125c-9.34 14.902-7.106 39.607 13.907 56.157h-25.657c-14.936-20.91-15.937-47.15-4.063-66.094c7.603-12.13 20.8-20.992 37.313-22.75c2.064-.22 4.16-.34 6.312-.344m122.438 0c2.153.005 4.28.124 6.343.344c16.513 1.758 29.71 10.62 37.313 22.75c11.872 18.944 10.872 45.183-4.064 66.094H338.22c21.01-16.55 23.245-41.255 13.905-56.156c-4.77-7.613-12.258-12.932-23.47-14.125c-9.69-1.032-22.498 1.294-38.092 9.593v-20.75c12.145-5.308 23.443-7.774 33.75-7.75m-71.438 16.875q.078.049.156.095l-.155.25v-.344zm-81.563 91h183.563v18.44h-34.28v17.81h34.28v18.69H171.312v-18.69h36.47v-17.81h-36.47zm55.157 18.44v17.81h27.28v-17.81zm45.968 0v17.81h29.468v-17.81h-29.47zm-9.157 50.03c7.64 0 13.845 6.204 13.845 13.844s-6.204 13.844-13.844 13.844s-13.842-6.204-13.842-13.844s6.203-13.844 13.843-13.844zM457 410.5c-7.208.234-14.82 2.62-21.5 7.688c-34.04 25.825-9.88 74.987 31.938 40.437c32.292-26.678 13.11-48.89-10.438-48.125", "wolf-head": "M179.3 38.94C154.7 77.7 142.7 139.7 168.4 185.9l-16.3 9.2c-6.7-11.9-11.2-24.4-13.9-37.2c-34.5-6.3-69.42-7.5-104.98-2.1c34.07 10.1 52.77 23.7 76.68 46.7c-26.82 9.7-60.25 30.2-92.93 70.2c35.47-8.8 64.83-11.5 89.43-6.3c-36.94 22.5-64.06 56.1-88.34 114.1c35.9-17.2 64.89-18.8 102.94-18.8c-23.07 32.7-35.27 77.2-36.31 112.8c24.51-26 57.61-60.2 87.21-79c3 29.9 15 58.3 35.9 85.3c-.2-43.9 10.3-88.3 31.6-133.4c-18.8 9-32.4 18.1-49.9 29.3c6.2-27.9 12.4-55.8 18.7-83.7c-23.3 2.4-39 10-60.5 18.5c16.3-33.1 32.7-66.1 49.1-99.2l16.8 8.3l-28.4 57.4c18.4-4.4 28.7-4.1 45.7-1.3c-4.5 20.4-9 40.7-13.6 61c65.3-36.2 148.3-45.9 226.7-50c7.6-12.9 13.8-24.2 18.8-34.8l-6.3-24.4l-24.4 30.8l-7.8-27.5l-22.5 29.2l-7.5-26.1l-23.9 31.5l-7.7-28.2l-23.8 31.4l1.2-41.1l22.6-42.7l7.6 28.3l23.9-31.5l7.6 28.2l23.5-30l6.5 26.9l24.5-30.8l7.8 27.5l24.6-32c2.3-10.8 4.6-22.4 7.4-35.7c-55.5-3.7-106.3 4.8-154 9.8c-38-20.8-80.8-26.8-121.9-18.5c-13.6-29.69-27.2-59.38-40.9-89.06M325.5 158.3c-4.5 14.2-13 18.3-24.7 20.6c-16.1-4.4-28.3-15.5-34.4-30.2c20.4-3.8 42.4 3.4 59.1 9.6"});
