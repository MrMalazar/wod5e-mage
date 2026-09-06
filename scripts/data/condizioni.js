// Generato da tools/build-archivi.py dalla bozza 04_BOZZE/condizioni_M6.md: non toccare a mano.
// Le venticinque Condizioni di M6, nell'ordine della bozza, coi dadi tolti nei modificatori.

export const CONDIZIONI = Object.freeze([
  {
    "id": "bloccato",
    "name": "Bloccato",
    "group": "Corpo",
    "what": "Qualcuno o qualcosa ti tiene fermo",
    "effect": "Non tiri in difesa: chi ti attacca fa un tiro semplice. Esci con un contrapposto di Forza o Destrezza, e ti costa il turno",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_bloccato.svg",
    "description": "<p><em>Qualcuno o qualcosa ti tiene fermo</em></p><p>Non tiri in difesa: chi ti attacca fa un tiro semplice. Esci con un contrapposto di Forza o Destrezza, e ti costa il turno</p>",
    "bonuses": []
  },
  {
    "id": "atterrato",
    "name": "Atterrato",
    "group": "Corpo",
    "what": "Sei a terra",
    "effect": "−2 alle riserve fisiche. Chi è già in mischia con te non lo subisce. Rialzarsi costa la mezza guardia",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_atterrato.svg",
    "description": "<p><em>Sei a terra</em></p><p>−2 alle riserve fisiche. Chi è già in mischia con te non lo subisce. Rialzarsi costa la mezza guardia</p>",
    "bonuses": [
      {
        "source": "Atterrato",
        "value": "-2",
        "paths": [
          "physical"
        ],
        "displayWhenInactive": false,
        "activeWhen": {
          "check": "always",
          "path": "",
          "value": ""
        }
      }
    ]
  },
  {
    "id": "rallentato",
    "name": "Rallentato",
    "group": "Corpo",
    "what": "Arrivi sempre dopo",
    "effect": "Agisci per ultimo nel turno, e fai una cosa sola per turno",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_rallentato.svg",
    "description": "<p><em>Arrivi sempre dopo</em></p><p>Agisci per ultimo nel turno, e fai una cosa sola per turno</p>",
    "bonuses": []
  },
  {
    "id": "inabile",
    "name": "Inabile",
    "group": "Corpo",
    "what": "Il corpo non risponde più",
    "effect": "Dimezzi tutte le riserve, per difetto",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_inabile.svg",
    "description": "<p><em>Il corpo non risponde più</em></p><p>Dimezzi tutte le riserve, per difetto</p>",
    "bonuses": []
  },
  {
    "id": "malato",
    "name": "Malato",
    "group": "Corpo",
    "what": "Febbre, veleno, infezione",
    "effect": "Non puoi ottenere più di 6 dadi in un tiro. È un tetto, non una penalità: si applica per ultimo, dopo ogni bonus e ogni malus",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_malato.svg",
    "description": "<p><em>Febbre, veleno, infezione</em></p><p>Non puoi ottenere più di 6 dadi in un tiro. È un tetto, non una penalità: si applica per ultimo, dopo ogni bonus e ogni malus</p>",
    "bonuses": []
  },
  {
    "id": "disarmato",
    "name": "Disarmato",
    "group": "Strumenti tagliati",
    "what": "L'oggetto che tenevi non ce l'hai più",
    "effect": "Perdi i dadi dell'equipaggiamento, e cade la famiglia Oggetto",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_disarmato.svg",
    "description": "<p><em>L'oggetto che tenevi non ce l'hai più</em></p><p>Perdi i dadi dell'equipaggiamento, e cade la famiglia Oggetto</p>",
    "bonuses": []
  },
  {
    "id": "muto",
    "name": "Muto",
    "group": "Strumenti tagliati",
    "what": "Non esce voce",
    "effect": "Cade la famiglia Parola",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_muto.svg",
    "description": "<p><em>Non esce voce</em></p><p>Cade la famiglia Parola</p>",
    "bonuses": []
  },
  {
    "id": "immobilizzato",
    "name": "Immobilizzato",
    "group": "Strumenti tagliati",
    "what": "Non puoi muoverti né gesticolare",
    "effect": "Cade la famiglia Corpo",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_immobilizzato.svg",
    "description": "<p><em>Non puoi muoverti né gesticolare</em></p><p>Cade la famiglia Corpo</p>",
    "bonuses": []
  },
  {
    "id": "guasto",
    "name": "Guasto",
    "group": "Strumenti tagliati",
    "what": "Il tuo apparato non funziona",
    "effect": "Cade la famiglia Macchina",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_guasto.svg",
    "description": "<p><em>Il tuo apparato non funziona</em></p><p>Cade la famiglia Macchina</p>",
    "bonuses": []
  },
  {
    "id": "a-secco",
    "name": "A secco",
    "group": "Strumenti tagliati",
    "what": "Le tue sostanze sono finite o versate",
    "effect": "Cade la famiglia Sostanza",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_a_secco.svg",
    "description": "<p><em>Le tue sostanze sono finite o versate</em></p><p>Cade la famiglia Sostanza</p>",
    "bonuses": []
  },
  {
    "id": "abbagliato",
    "name": "Abbagliato",
    "group": "Vista",
    "what": "Vedi, ma gli occhi lacrimano",
    "effect": "−1 ai dadi",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_abbagliato.svg",
    "description": "<p><em>Vedi, ma gli occhi lacrimano</em></p><p>−1 ai dadi</p>",
    "bonuses": [
      {
        "source": "Abbagliato",
        "value": "-1",
        "paths": [
          "all"
        ],
        "displayWhenInactive": false,
        "activeWhen": {
          "check": "always",
          "path": "",
          "value": ""
        }
      }
    ]
  },
  {
    "id": "offuscato",
    "name": "Offuscato",
    "group": "Vista",
    "what": "Distingui solo le forme",
    "effect": "−2 ai dadi",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_offuscato.svg",
    "description": "<p><em>Distingui solo le forme</em></p><p>−2 ai dadi</p>",
    "bonuses": [
      {
        "source": "Offuscato",
        "value": "-2",
        "paths": [
          "all"
        ],
        "displayWhenInactive": false,
        "activeWhen": {
          "check": "always",
          "path": "",
          "value": ""
        }
      }
    ]
  },
  {
    "id": "cieco",
    "name": "Cieco",
    "group": "Vista",
    "what": "Non vedi",
    "effect": "I tiri che si basano sulla vista non si tirano, e non scegli un bersaglio che non vedi",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_cieco.svg",
    "description": "<p><em>Non vedi</em></p><p>I tiri che si basano sulla vista non si tirano, e non scegli un bersaglio che non vedi</p>",
    "bonuses": []
  },
  {
    "id": "ovattato",
    "name": "Ovattato",
    "group": "Udito",
    "what": "Senti come da sott'acqua",
    "effect": "−1 ai dadi",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_ovattato.svg",
    "description": "<p><em>Senti come da sott'acqua</em></p><p>−1 ai dadi</p>",
    "bonuses": [
      {
        "source": "Ovattato",
        "value": "-1",
        "paths": [
          "all"
        ],
        "displayWhenInactive": false,
        "activeWhen": {
          "check": "always",
          "path": "",
          "value": ""
        }
      }
    ]
  },
  {
    "id": "assordato",
    "name": "Assordato",
    "group": "Udito",
    "what": "Senti solo un fischio",
    "effect": "−2 ai dadi",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_assordato.svg",
    "description": "<p><em>Senti solo un fischio</em></p><p>−2 ai dadi</p>",
    "bonuses": [
      {
        "source": "Assordato",
        "value": "-2",
        "paths": [
          "all"
        ],
        "displayWhenInactive": false,
        "activeWhen": {
          "check": "always",
          "path": "",
          "value": ""
        }
      }
    ]
  },
  {
    "id": "sordo",
    "name": "Sordo",
    "group": "Udito",
    "what": "Non senti",
    "effect": "I tiri che si basano sull'udito non si tirano",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_sordo.svg",
    "description": "<p><em>Non senti</em></p><p>I tiri che si basano sull'udito non si tirano</p>",
    "bonuses": []
  },
  {
    "id": "stordito",
    "name": "Stordito",
    "group": "Testa",
    "what": "Il colpo ti ha spento per un attimo",
    "effect": "Perdi l'azione, oppure segni 1 Salute mentale e agisci lo stesso",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_stordito.svg",
    "description": "<p><em>Il colpo ti ha spento per un attimo</em></p><p>Perdi l'azione, oppure segni 1 Salute mentale e agisci lo stesso</p>",
    "bonuses": []
  },
  {
    "id": "scosso",
    "name": "Scosso",
    "group": "Testa",
    "what": "Hai paura e reggi",
    "effect": "−1 ai dadi",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_scosso.svg",
    "description": "<p><em>Hai paura e reggi</em></p><p>−1 ai dadi</p>",
    "bonuses": [
      {
        "source": "Scosso",
        "value": "-1",
        "paths": [
          "all"
        ],
        "displayWhenInactive": false,
        "activeWhen": {
          "check": "always",
          "path": "",
          "value": ""
        }
      }
    ]
  },
  {
    "id": "spaventato",
    "name": "Spaventato",
    "group": "Testa",
    "what": "Hai paura e si vede",
    "effect": "−2 ai dadi, ma puoi ancora avvicinarti alla fonte. Finisce con la scena",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_spaventato.svg",
    "description": "<p><em>Hai paura e si vede</em></p><p>−2 ai dadi, ma puoi ancora avvicinarti alla fonte. Finisce con la scena</p>",
    "bonuses": [
      {
        "source": "Spaventato",
        "value": "-2",
        "paths": [
          "all"
        ],
        "displayWhenInactive": false,
        "activeWhen": {
          "check": "always",
          "path": "",
          "value": ""
        }
      }
    ]
  },
  {
    "id": "terrorizzato",
    "name": "Terrorizzato",
    "group": "Testa",
    "what": "Non riesci ad avvicinarti",
    "effect": "Non puoi avvicinarti alla fonte. Esci con Fermezza + Autocontrollo, e il tiro si fa la scena dopo",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_terrorizzato.svg",
    "description": "<p><em>Non riesci ad avvicinarti</em></p><p>Non puoi avvicinarti alla fonte. Esci con Fermezza + Autocontrollo, e il tiro si fa la scena dopo</p>",
    "bonuses": []
  },
  {
    "id": "sfortunato",
    "name": "Sfortunato",
    "group": "Testa",
    "what": "Il caso ti gira contro",
    "effect": "Il tuo critico non scatta",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_sfortunato.svg",
    "description": "<p><em>Il caso ti gira contro</em></p><p>Il tuo critico non scatta</p>",
    "bonuses": []
  },
  {
    "id": "ammaliato",
    "name": "Ammaliato",
    "group": "Testa",
    "what": "Stai subendo un effetto, o agisci sotto compulsione",
    "effect": "Segna che non stai decidendo tu. Le tue Convinzioni contano come attive: un ordine che ne viola una non passa",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_ammaliato.svg",
    "description": "<p><em>Stai subendo un effetto, o agisci sotto compulsione</em></p><p>Segna che non stai decidendo tu. Le tue Convinzioni contano come attive: un ordine che ne viola una non passa</p>",
    "bonuses": []
  },
  {
    "id": "maledetto",
    "name": "Maledetto",
    "group": "Maledizione",
    "what": "Le ferite non si chiudono",
    "effect": "Non guarisci in nessun modo, né col riposo né con le cure né con la Magick, finché la causa resta",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_maledetto.svg",
    "description": "<p><em>Le ferite non si chiudono</em></p><p>Non guarisci in nessun modo, né col riposo né con le cure né con la Magick, finché la causa resta</p>",
    "bonuses": []
  },
  {
    "id": "dissonanza",
    "name": "Dissonanza",
    "group": "Ambiente",
    "what": "Il posto rema contro il tuo Tipo di Magick",
    "effect": "Non puoi lanciare Accidentale: quello che fai è Volgare",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_dissonanza.svg",
    "description": "<p><em>Il posto rema contro il tuo Tipo di Magick</em></p><p>Non puoi lanciare Accidentale: quello che fai è Volgare</p>",
    "bonuses": []
  },
  {
    "id": "assonanza",
    "name": "Assonanza",
    "group": "Ambiente",
    "what": "Il posto lavora col tuo Tipo",
    "effect": "Puoi lanciare Volgare senza prendere Paradosso",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/cond_assonanza.svg",
    "description": "<p><em>Il posto lavora col tuo Tipo</em></p><p>Puoi lanciare Volgare senza prendere Paradosso</p>",
    "bonuses": []
  }
]);
