// Generato da tools/build-condizioni.py dalla guida del Narratore (tools/dati/condizioni.md,
// la regola di base del 29/9/2026): non toccare a mano.
// Ogni Condizione ha famiglia, scala, grado (1, 2, 3; 0 per lievi, scontro e Sventura), i tipi di
// tiro su cui pesa (physical, social, mental) e il peso: meno2 (−2 dadi), otto (−2 dadi e difficoltà 8),
// fallisce (il tiro fallisce), lieve (−1 dado), scelte (il Controllo: nessun dado), azione, nessuno.

export const FAMIGLIE_CONDIZIONI = Object.freeze([
  {
    "id": "sensi",
    "label": "Sensi",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/sensi.svg"
  },
  {
    "id": "corpo",
    "label": "Corpo",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg"
  },
  {
    "id": "mente",
    "label": "Mente",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/mente.svg"
  },
  {
    "id": "soprannaturale",
    "label": "Soprannaturale",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/soprannaturale.svg"
  }
]);

export const SCALE_CONDIZIONI = Object.freeze([
  {
    "id": "vista",
    "label": "Vista",
    "family": "sensi",
    "intro": "Nasce da luce forte, sabbia o spray negli occhi, un colpo al viso. Tocca quello che passa dagli occhi: mirare, cercare, leggere, riconoscere.",
    "tiri": "fisici quando miri, mentali quando cerchi o leggi."
  },
  {
    "id": "udito",
    "label": "Udito",
    "family": "sensi",
    "intro": "Nasce da esplosioni, spari al chiuso, colpi alla testa. Tocca quello che passa dalle orecchie: ascoltare, accorgerti di un rumore, seguire chi parla.",
    "tiri": "sociali quando segui chi parla, mentali quando ascolti."
  },
  {
    "id": "voce",
    "label": "Voce",
    "family": "corpo",
    "intro": "Nasce da un colpo alla gola, dal gas, da uno strangolamento, dalla Magick. Tocca quello che passa dalla voce: convincere, dare ordini, mentire, cantare.",
    "tiri": "sociali."
  },
  {
    "id": "respiro",
    "label": "Respiro",
    "family": "corpo",
    "intro": "Nasce dallo sforzo, dal fumo, dal gas, dall'acqua. Tocca il fiato: correre, arrampicarti, lottare, ogni sforzo.",
    "tiri": "fisici. Da Svenuto non agisci."
  },
  {
    "id": "emorragia",
    "label": "Emorragia",
    "family": "corpo",
    "intro": "Nasce da tagli, proiettili, morsi. Tocca il corpo intero.",
    "tiri": "fisici. Dal grado 2 costa caselle di Salute."
  },
  {
    "id": "avvelenamento",
    "label": "Avvelenamento",
    "family": "corpo",
    "intro": "Nasce da veleni, droghe, infezioni. Tocca il corpo e la testa.",
    "tiri": "fisici e mentali."
  },
  {
    "id": "rotto",
    "label": "Rotto",
    "family": "corpo",
    "intro": "Nasce da cadute, colpi, schiacciamenti. Vale per una parte sola, e si scrive con la parte: Rotto (braccio sinistro).",
    "tiri": "i fisici che chiedono la parte rotta, e falliscono come al grado 3."
  },
  {
    "id": "paura",
    "label": "Paura",
    "family": "mente",
    "intro": "Nasce da minacce, orrori, Presenze, e si scrive con la fonte: Spaventato dal Revisore. Tocca tutto quello che fai in presenza della fonte.",
    "tiri": "fisici, sociali e mentali, finché la fonte è in scena."
  },
  {
    "id": "rabbia",
    "label": "Rabbia",
    "family": "mente",
    "intro": "Nasce da insulti, umiliazioni, provocazioni. Tocca il controllo di te.",
    "tiri": "sociali."
  },
  {
    "id": "sonno",
    "label": "Sonno",
    "family": "mente",
    "intro": "Nasce da sedativi, notti in bianco, Magick di Mente o di Vita. Tocca la veglia.",
    "tiri": "fisici e mentali. Da Addormentato non agisci."
  },
  {
    "id": "controllo",
    "label": "Controllo",
    "family": "soprannaturale",
    "intro": "Nasce dalla Magick di Mente, dagli spiriti, dalle Presenze, e si scrive con chi ti tiene.",
    "tiri": "nessuno. Non toglie dadi: toglie le scelte."
  },
  {
    "id": "sventura",
    "label": "Sventura",
    "family": "soprannaturale",
    "intro": "",
    "tiri": ""
  },
  {
    "id": "lievi",
    "label": "Lievi",
    "family": "",
    "intro": "",
    "tiri": ""
  },
  {
    "id": "scontro",
    "label": "Scontro",
    "family": "",
    "intro": "",
    "tiri": ""
  }
]);

export const CONDIZIONI = Object.freeze([
  {
    "id": "abbagliato",
    "name": "Abbagliato",
    "proposed": false,
    "family": "sensi",
    "familyLabel": "Sensi",
    "scale": "vista",
    "scaleLabel": "Vista",
    "section": "scala",
    "grade": 1,
    "numeral": "I",
    "weight": "meno2",
    "tipi": [
      "physical",
      "mental"
    ],
    "tiriText": "fisici quando miri, mentali quando cerchi o leggi",
    "what": "Vedi macchie e aloni, come dopo un flash: da lontano non distingui volti né scritte.",
    "effect": "−2 dadi sui tiri fisici quando miri, mentali quando cerchi o leggi",
    "intro": "Nasce da luce forte, sabbia o spray negli occhi, un colpo al viso. Tocca quello che passa dagli occhi: mirare, cercare, leggere, riconoscere.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/sensi-1.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/sensi.svg",
    "description": "<p><strong>Vista I</strong> · Sensi</p><p><em>Vedi macchie e aloni, come dopo un flash: da lontano non distingui volti né scritte.</em></p><p>−2 dadi sui tiri fisici quando miri, mentali quando cerchi o leggi.</p><p>Nasce da luce forte, sabbia o spray negli occhi, un colpo al viso. Tocca quello che passa dagli occhi: mirare, cercare, leggere, riconoscere.</p>",
    "bonuses": [
      {
        "source": "Abbagliato",
        "value": "-2",
        "paths": [
          "physical",
          "mental"
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
    "proposed": false,
    "family": "sensi",
    "familyLabel": "Sensi",
    "scale": "vista",
    "scaleLabel": "Vista",
    "section": "scala",
    "grade": 2,
    "numeral": "II",
    "weight": "otto",
    "tipi": [
      "physical",
      "mental"
    ],
    "tiriText": "fisici quando miri, mentali quando cerchi o leggi",
    "what": "Vedi solo forme, e le persone le riconosci dalla voce. La sabbia si sciacqua; un occhio gonfio va medicato.",
    "effect": "−2 dadi e difficoltà 8 sui tiri fisici quando miri, mentali quando cerchi o leggi",
    "intro": "Nasce da luce forte, sabbia o spray negli occhi, un colpo al viso. Tocca quello che passa dagli occhi: mirare, cercare, leggere, riconoscere.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/sensi-2.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/sensi.svg",
    "description": "<p><strong>Vista II</strong> · Sensi</p><p><em>Vedi solo forme, e le persone le riconosci dalla voce. La sabbia si sciacqua; un occhio gonfio va medicato.</em></p><p>−2 dadi e difficoltà 8 sui tiri fisici quando miri, mentali quando cerchi o leggi.</p><p>Nasce da luce forte, sabbia o spray negli occhi, un colpo al viso. Tocca quello che passa dagli occhi: mirare, cercare, leggere, riconoscere.</p>",
    "bonuses": [
      {
        "source": "Offuscato",
        "value": "-2",
        "paths": [
          "physical",
          "mental"
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
    "proposed": false,
    "family": "sensi",
    "familyLabel": "Sensi",
    "scale": "vista",
    "scaleLabel": "Vista",
    "section": "scala",
    "grade": 3,
    "numeral": "III",
    "weight": "fallisce",
    "tipi": [
      "physical",
      "mental"
    ],
    "tiriText": "fisici quando miri, mentali quando cerchi o leggi",
    "what": "Non vedi. Ti muovi toccando o guidato, e in mischia colpisci chi ti tocca o chi senti, a −2 e 8.",
    "effect": "falliscono i tiri fisici quando miri, mentali quando cerchi o leggi",
    "intro": "Nasce da luce forte, sabbia o spray negli occhi, un colpo al viso. Tocca quello che passa dagli occhi: mirare, cercare, leggere, riconoscere.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/sensi-3.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/sensi.svg",
    "description": "<p><strong>Vista III</strong> · Sensi</p><p><em>Non vedi. Ti muovi toccando o guidato, e in mischia colpisci chi ti tocca o chi senti, a −2 e 8.</em></p><p>Falliscono i tiri fisici quando miri, mentali quando cerchi o leggi.</p><p>Nasce da luce forte, sabbia o spray negli occhi, un colpo al viso. Tocca quello che passa dagli occhi: mirare, cercare, leggere, riconoscere.</p>",
    "bonuses": []
  },
  {
    "id": "ovattato",
    "name": "Ovattato",
    "proposed": false,
    "family": "sensi",
    "familyLabel": "Sensi",
    "scale": "udito",
    "scaleLabel": "Udito",
    "section": "scala",
    "grade": 1,
    "numeral": "I",
    "weight": "meno2",
    "tipi": [
      "social",
      "mental"
    ],
    "tiriText": "sociali quando segui chi parla, mentali quando ascolti",
    "what": "Senti come da sott'acqua.",
    "effect": "−2 dadi sui tiri sociali quando segui chi parla, mentali quando ascolti",
    "intro": "Nasce da esplosioni, spari al chiuso, colpi alla testa. Tocca quello che passa dalle orecchie: ascoltare, accorgerti di un rumore, seguire chi parla.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/sensi-1.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/sensi.svg",
    "description": "<p><strong>Udito I</strong> · Sensi</p><p><em>Senti come da sott'acqua.</em></p><p>−2 dadi sui tiri sociali quando segui chi parla, mentali quando ascolti.</p><p>Nasce da esplosioni, spari al chiuso, colpi alla testa. Tocca quello che passa dalle orecchie: ascoltare, accorgerti di un rumore, seguire chi parla.</p>",
    "bonuses": [
      {
        "source": "Ovattato",
        "value": "-2",
        "paths": [
          "social",
          "mental"
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
    "proposed": false,
    "family": "sensi",
    "familyLabel": "Sensi",
    "scale": "udito",
    "scaleLabel": "Udito",
    "section": "scala",
    "grade": 2,
    "numeral": "II",
    "weight": "otto",
    "tipi": [
      "social",
      "mental"
    ],
    "tiriText": "sociali quando segui chi parla, mentali quando ascolti",
    "what": "Senti solo un fischio: capisci chi ti parla solo se ti guarda in faccia e scandisce.",
    "effect": "−2 dadi e difficoltà 8 sui tiri sociali quando segui chi parla, mentali quando ascolti",
    "intro": "Nasce da esplosioni, spari al chiuso, colpi alla testa. Tocca quello che passa dalle orecchie: ascoltare, accorgerti di un rumore, seguire chi parla.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/sensi-2.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/sensi.svg",
    "description": "<p><strong>Udito II</strong> · Sensi</p><p><em>Senti solo un fischio: capisci chi ti parla solo se ti guarda in faccia e scandisce.</em></p><p>−2 dadi e difficoltà 8 sui tiri sociali quando segui chi parla, mentali quando ascolti.</p><p>Nasce da esplosioni, spari al chiuso, colpi alla testa. Tocca quello che passa dalle orecchie: ascoltare, accorgerti di un rumore, seguire chi parla.</p>",
    "bonuses": [
      {
        "source": "Assordato",
        "value": "-2",
        "paths": [
          "social",
          "mental"
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
    "proposed": false,
    "family": "sensi",
    "familyLabel": "Sensi",
    "scale": "udito",
    "scaleLabel": "Udito",
    "section": "scala",
    "grade": 3,
    "numeral": "III",
    "weight": "fallisce",
    "tipi": [
      "social",
      "mental"
    ],
    "tiriText": "sociali quando segui chi parla, mentali quando ascolti",
    "what": "Non senti. Leggere le labbra o scrivere un biglietto aggirano la sordità, se il Narratore lo accetta.",
    "effect": "falliscono i tiri sociali quando segui chi parla, mentali quando ascolti",
    "intro": "Nasce da esplosioni, spari al chiuso, colpi alla testa. Tocca quello che passa dalle orecchie: ascoltare, accorgerti di un rumore, seguire chi parla.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/sensi-3.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/sensi.svg",
    "description": "<p><strong>Udito III</strong> · Sensi</p><p><em>Non senti. Leggere le labbra o scrivere un biglietto aggirano la sordità, se il Narratore lo accetta.</em></p><p>Falliscono i tiri sociali quando segui chi parla, mentali quando ascolti.</p><p>Nasce da esplosioni, spari al chiuso, colpi alla testa. Tocca quello che passa dalle orecchie: ascoltare, accorgerti di un rumore, seguire chi parla.</p>",
    "bonuses": []
  },
  {
    "id": "rauco",
    "name": "Rauco",
    "proposed": true,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "voce",
    "scaleLabel": "Voce",
    "section": "scala",
    "grade": 1,
    "numeral": "I",
    "weight": "meno2",
    "tipi": [
      "social"
    ],
    "tiriText": "sociali",
    "what": "La voce non arriva lontano e si spezza.",
    "effect": "−2 dadi sui tiri sociali",
    "intro": "Nasce da un colpo alla gola, dal gas, da uno strangolamento, dalla Magick. Tocca quello che passa dalla voce: convincere, dare ordini, mentire, cantare.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo-1.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Voce I</strong> · Corpo</p><p><em>La voce non arriva lontano e si spezza.</em></p><p>−2 dadi sui tiri sociali.</p><p>Nasce da un colpo alla gola, dal gas, da uno strangolamento, dalla Magick. Tocca quello che passa dalla voce: convincere, dare ordini, mentire, cantare.</p>",
    "bonuses": [
      {
        "source": "Rauco",
        "value": "-2",
        "paths": [
          "social"
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
    "id": "afono",
    "name": "Afono",
    "proposed": true,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "voce",
    "scaleLabel": "Voce",
    "section": "scala",
    "grade": 2,
    "numeral": "II",
    "weight": "otto",
    "tipi": [
      "social"
    ],
    "tiriText": "sociali",
    "what": "Parli solo sussurrando.",
    "effect": "−2 dadi e difficoltà 8 sui tiri sociali",
    "intro": "Nasce da un colpo alla gola, dal gas, da uno strangolamento, dalla Magick. Tocca quello che passa dalla voce: convincere, dare ordini, mentire, cantare.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo-2.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Voce II</strong> · Corpo</p><p><em>Parli solo sussurrando.</em></p><p>−2 dadi e difficoltà 8 sui tiri sociali.</p><p>Nasce da un colpo alla gola, dal gas, da uno strangolamento, dalla Magick. Tocca quello che passa dalla voce: convincere, dare ordini, mentire, cantare.</p>",
    "bonuses": [
      {
        "source": "Afono",
        "value": "-2",
        "paths": [
          "social"
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
    "id": "muto",
    "name": "Muto",
    "proposed": false,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "voce",
    "scaleLabel": "Voce",
    "section": "scala",
    "grade": 3,
    "numeral": "III",
    "weight": "fallisce",
    "tipi": [
      "social"
    ],
    "tiriText": "sociali",
    "what": "Non esce voce. Resta quello che si fa coi gesti o per iscritto.",
    "effect": "falliscono i sociali che passano dalla voce",
    "intro": "Nasce da un colpo alla gola, dal gas, da uno strangolamento, dalla Magick. Tocca quello che passa dalla voce: convincere, dare ordini, mentire, cantare.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo-3.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Voce III</strong> · Corpo</p><p><em>Non esce voce. Resta quello che si fa coi gesti o per iscritto.</em></p><p>Falliscono i sociali che passano dalla voce.</p><p>Nasce da un colpo alla gola, dal gas, da uno strangolamento, dalla Magick. Tocca quello che passa dalla voce: convincere, dare ordini, mentire, cantare.</p>",
    "bonuses": []
  },
  {
    "id": "affannato",
    "name": "Affannato",
    "proposed": true,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "respiro",
    "scaleLabel": "Respiro",
    "section": "scala",
    "grade": 1,
    "numeral": "I",
    "weight": "meno2",
    "tipi": [
      "physical"
    ],
    "tiriText": "fisici",
    "what": "Respiri male, e ogni sforzo ti costa. Passa riprendendo fiato.",
    "effect": "−2 dadi sui tiri fisici",
    "intro": "Nasce dallo sforzo, dal fumo, dal gas, dall'acqua. Tocca il fiato: correre, arrampicarti, lottare, ogni sforzo.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo-1.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Respiro I</strong> · Corpo</p><p><em>Respiri male, e ogni sforzo ti costa. Passa riprendendo fiato.</em></p><p>−2 dadi sui tiri fisici.</p><p>Nasce dallo sforzo, dal fumo, dal gas, dall'acqua. Tocca il fiato: correre, arrampicarti, lottare, ogni sforzo.</p>",
    "bonuses": [
      {
        "source": "Affannato",
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
    "id": "soffocato",
    "name": "Soffocato",
    "proposed": true,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "respiro",
    "scaleLabel": "Respiro",
    "section": "scala",
    "grade": 2,
    "numeral": "II",
    "weight": "otto",
    "tipi": [
      "physical"
    ],
    "tiriText": "fisici",
    "what": "L'aria non basta, e parli a fatica.",
    "effect": "−2 dadi e difficoltà 8 sui tiri fisici",
    "intro": "Nasce dallo sforzo, dal fumo, dal gas, dall'acqua. Tocca il fiato: correre, arrampicarti, lottare, ogni sforzo.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo-2.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Respiro II</strong> · Corpo</p><p><em>L'aria non basta, e parli a fatica.</em></p><p>−2 dadi e difficoltà 8 sui tiri fisici.</p><p>Nasce dallo sforzo, dal fumo, dal gas, dall'acqua. Tocca il fiato: correre, arrampicarti, lottare, ogni sforzo.</p>",
    "bonuses": [
      {
        "source": "Soffocato",
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
    "id": "svenuto",
    "name": "Svenuto",
    "proposed": false,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "respiro",
    "scaleLabel": "Respiro",
    "section": "scala",
    "grade": 3,
    "numeral": "III",
    "weight": "fallisce",
    "tipi": [
      "physical",
      "social",
      "mental"
    ],
    "tiriText": "fisici",
    "what": "Perdi i sensi, e non agisci finché qualcuno non ti rianima o la scena non finisce.",
    "effect": "falliscono tutti i tiri: fisici, sociali, mentali",
    "intro": "Nasce dallo sforzo, dal fumo, dal gas, dall'acqua. Tocca il fiato: correre, arrampicarti, lottare, ogni sforzo.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo-3.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Respiro III</strong> · Corpo</p><p><em>Perdi i sensi, e non agisci finché qualcuno non ti rianima o la scena non finisce.</em></p><p>Falliscono tutti i tiri: fisici, sociali, mentali.</p><p>Nasce dallo sforzo, dal fumo, dal gas, dall'acqua. Tocca il fiato: correre, arrampicarti, lottare, ogni sforzo.</p>",
    "bonuses": []
  },
  {
    "id": "sanguinante",
    "name": "Sanguinante",
    "proposed": false,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "emorragia",
    "scaleLabel": "Emorragia",
    "section": "scala",
    "grade": 1,
    "numeral": "I",
    "weight": "meno2",
    "tipi": [
      "physical"
    ],
    "tiriText": "fisici",
    "what": "Perdi sangue e lasci una scia che si può seguire; chi ti vede capisce che sei ferito.",
    "effect": "−2 dadi sui tiri fisici",
    "intro": "Nasce da tagli, proiettili, morsi. Tocca il corpo intero.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo-1.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Emorragia I</strong> · Corpo</p><p><em>Perdi sangue e lasci una scia che si può seguire; chi ti vede capisce che sei ferito.</em></p><p>−2 dadi sui tiri fisici.</p><p>Nasce da tagli, proiettili, morsi. Tocca il corpo intero.</p>",
    "bonuses": [
      {
        "source": "Sanguinante",
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
    "id": "dissanguato",
    "name": "Dissanguato",
    "proposed": true,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "emorragia",
    "scaleLabel": "Emorragia",
    "section": "scala",
    "grade": 2,
    "numeral": "II",
    "weight": "otto",
    "tipi": [
      "physical"
    ],
    "tiriText": "fisici",
    "what": "Sei pallido e ti gira la testa. A fine scena segni 1 Superficiale, finché nessuno ti fascia.",
    "effect": "−2 dadi e difficoltà 8 sui tiri fisici",
    "intro": "Nasce da tagli, proiettili, morsi. Tocca il corpo intero.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo-2.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Emorragia II</strong> · Corpo</p><p><em>Sei pallido e ti gira la testa. A fine scena segni 1 Superficiale, finché nessuno ti fascia.</em></p><p>−2 dadi e difficoltà 8 sui tiri fisici.</p><p>Nasce da tagli, proiettili, morsi. Tocca il corpo intero.</p>",
    "bonuses": [
      {
        "source": "Dissanguato",
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
    "id": "morente",
    "name": "Morente",
    "proposed": true,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "emorragia",
    "scaleLabel": "Emorragia",
    "section": "scala",
    "grade": 3,
    "numeral": "III",
    "weight": "fallisce",
    "tipi": [
      "physical"
    ],
    "tiriText": "fisici",
    "what": "Ogni fine scena costa 1 Aggravato, finché qualcuno non ti cura. Il sinonimo è Svenuto.",
    "effect": "falliscono i fisici, e ogni fine scena costa 1 Aggravato",
    "intro": "Nasce da tagli, proiettili, morsi. Tocca il corpo intero.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo-3.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Emorragia III</strong> · Corpo</p><p><em>Ogni fine scena costa 1 Aggravato, finché qualcuno non ti cura. Il sinonimo è Svenuto.</em></p><p>Falliscono i fisici, e ogni fine scena costa 1 Aggravato.</p><p>Nasce da tagli, proiettili, morsi. Tocca il corpo intero.</p>",
    "bonuses": []
  },
  {
    "id": "intossicato",
    "name": "Intossicato",
    "proposed": true,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "avvelenamento",
    "scaleLabel": "Avvelenamento",
    "section": "scala",
    "grade": 1,
    "numeral": "I",
    "weight": "meno2",
    "tipi": [
      "physical",
      "mental"
    ],
    "tiriText": "fisici e mentali",
    "what": "Nausea e sudore freddo.",
    "effect": "−2 dadi sui tiri fisici e mentali",
    "intro": "Nasce da veleni, droghe, infezioni. Tocca il corpo e la testa.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo-1.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Avvelenamento I</strong> · Corpo</p><p><em>Nausea e sudore freddo.</em></p><p>−2 dadi sui tiri fisici e mentali.</p><p>Nasce da veleni, droghe, infezioni. Tocca il corpo e la testa.</p>",
    "bonuses": [
      {
        "source": "Intossicato",
        "value": "-2",
        "paths": [
          "physical",
          "mental"
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
    "id": "avvelenato",
    "name": "Avvelenato",
    "proposed": false,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "avvelenamento",
    "scaleLabel": "Avvelenamento",
    "section": "scala",
    "grade": 2,
    "numeral": "II",
    "weight": "otto",
    "tipi": [
      "physical",
      "mental"
    ],
    "tiriText": "fisici e mentali",
    "what": "Il veleno lavora: un orologio da quattro spicchi, uno a ogni scena senza antidoto; pieno, sali al grado 3.",
    "effect": "−2 dadi e difficoltà 8 sui tiri fisici e mentali",
    "intro": "Nasce da veleni, droghe, infezioni. Tocca il corpo e la testa.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo-2.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Avvelenamento II</strong> · Corpo</p><p><em>Il veleno lavora: un orologio da quattro spicchi, uno a ogni scena senza antidoto; pieno, sali al grado 3.</em></p><p>−2 dadi e difficoltà 8 sui tiri fisici e mentali.</p><p>Nasce da veleni, droghe, infezioni. Tocca il corpo e la testa.</p>",
    "bonuses": [
      {
        "source": "Avvelenato",
        "value": "-2",
        "paths": [
          "physical",
          "mental"
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
    "id": "paralizzato",
    "name": "Paralizzato",
    "proposed": false,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "avvelenamento",
    "scaleLabel": "Avvelenamento",
    "section": "scala",
    "grade": 3,
    "numeral": "III",
    "weight": "fallisce",
    "tipi": [
      "physical",
      "social"
    ],
    "tiriText": "fisici e mentali",
    "what": "Non ti muovi e non parli, ma vedi, senti e pensi come prima. Il sinonimo è Svenuto, quando il veleno stende.",
    "effect": "falliscono i fisici, e i sociali che chiedono voce o gesti; pensi, vedi e senti come prima",
    "intro": "Nasce da veleni, droghe, infezioni. Tocca il corpo e la testa.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo-3.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Avvelenamento III</strong> · Corpo</p><p><em>Non ti muovi e non parli, ma vedi, senti e pensi come prima. Il sinonimo è Svenuto, quando il veleno stende.</em></p><p>Falliscono i fisici, e i sociali che chiedono voce o gesti; pensi, vedi e senti come prima.</p><p>Nasce da veleni, droghe, infezioni. Tocca il corpo e la testa.</p>",
    "bonuses": []
  },
  {
    "id": "rotto",
    "name": "Rotto",
    "proposed": false,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "rotto",
    "scaleLabel": "Rotto",
    "section": "sola",
    "grade": 3,
    "numeral": "III",
    "weight": "fallisce",
    "tipi": [
      "physical"
    ],
    "tiriText": "i fisici che chiedono la parte rotta, e falliscono come al grado 3",
    "what": "La parte rotta è fuori uso, e fallisce solo quello che senza di lei non si fa. Con la mano destra rotta falliscono sparare con quella mano, scassinare, dare un pugno; parlare, correre e guidare un'automatica no. Si cura col gesso e con le settimane, o con la Magick di Vita.",
    "effect": "falliscono i fisici che chiedono la parte rotta",
    "intro": "Nasce da cadute, colpi, schiacciamenti. Vale per una parte sola, e si scrive con la parte: Rotto (braccio sinistro).",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo-3.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Rotto III</strong> · Corpo</p><p><em>La parte rotta è fuori uso, e fallisce solo quello che senza di lei non si fa. Con la mano destra rotta falliscono sparare con quella mano, scassinare, dare un pugno; parlare, correre e guidare un'automatica no. Si cura col gesso e con le settimane, o con la Magick di Vita.</em></p><p>Falliscono i fisici che chiedono la parte rotta.</p><p>Nasce da cadute, colpi, schiacciamenti. Vale per una parte sola, e si scrive con la parte: Rotto (braccio sinistro).</p>",
    "bonuses": []
  },
  {
    "id": "intimorito",
    "name": "Intimorito",
    "proposed": true,
    "family": "mente",
    "familyLabel": "Mente",
    "scale": "paura",
    "scaleLabel": "Paura",
    "section": "scala",
    "grade": 1,
    "numeral": "I",
    "weight": "meno2",
    "tipi": [
      "physical",
      "social",
      "mental"
    ],
    "tiriText": "fisici, sociali e mentali, finché la fonte è in scena",
    "what": "Hai paura e reggi.",
    "effect": "−2 dadi sui tiri fisici, sociali e mentali, finché la fonte è in scena",
    "intro": "Nasce da minacce, orrori, Presenze, e si scrive con la fonte: Spaventato dal Revisore. Tocca tutto quello che fai in presenza della fonte.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/mente-1.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/mente.svg",
    "description": "<p><strong>Paura I</strong> · Mente</p><p><em>Hai paura e reggi.</em></p><p>−2 dadi sui tiri fisici, sociali e mentali, finché la fonte è in scena.</p><p>Nasce da minacce, orrori, Presenze, e si scrive con la fonte: Spaventato dal Revisore. Tocca tutto quello che fai in presenza della fonte.</p>",
    "bonuses": [
      {
        "source": "Intimorito",
        "value": "-2",
        "paths": [
          "physical",
          "social",
          "mental"
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
    "proposed": false,
    "family": "mente",
    "familyLabel": "Mente",
    "scale": "paura",
    "scaleLabel": "Paura",
    "section": "scala",
    "grade": 2,
    "numeral": "II",
    "weight": "otto",
    "tipi": [
      "physical",
      "social",
      "mental"
    ],
    "tiriText": "fisici, sociali e mentali, finché la fonte è in scena",
    "what": "Hai paura e si vede, e vuoi andartene: appena puoi, ti allontani.",
    "effect": "−2 dadi e difficoltà 8 sui tiri fisici, sociali e mentali, finché la fonte è in scena",
    "intro": "Nasce da minacce, orrori, Presenze, e si scrive con la fonte: Spaventato dal Revisore. Tocca tutto quello che fai in presenza della fonte.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/mente-2.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/mente.svg",
    "description": "<p><strong>Paura II</strong> · Mente</p><p><em>Hai paura e si vede, e vuoi andartene: appena puoi, ti allontani.</em></p><p>−2 dadi e difficoltà 8 sui tiri fisici, sociali e mentali, finché la fonte è in scena.</p><p>Nasce da minacce, orrori, Presenze, e si scrive con la fonte: Spaventato dal Revisore. Tocca tutto quello che fai in presenza della fonte.</p>",
    "bonuses": [
      {
        "source": "Spaventato",
        "value": "-2",
        "paths": [
          "physical",
          "social",
          "mental"
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
    "proposed": false,
    "family": "mente",
    "familyLabel": "Mente",
    "scale": "paura",
    "scaleLabel": "Paura",
    "section": "scala",
    "grade": 3,
    "numeral": "III",
    "weight": "fallisce",
    "tipi": [
      "physical",
      "social",
      "mental"
    ],
    "tiriText": "fisici, sociali e mentali, finché la fonte è in scena",
    "what": "Esci di scena. Il sinonimo è Svenuto: crolli dove sei.",
    "effect": "falliscono i tiri fisici, sociali e mentali, finché la fonte è in scena",
    "intro": "Nasce da minacce, orrori, Presenze, e si scrive con la fonte: Spaventato dal Revisore. Tocca tutto quello che fai in presenza della fonte.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/mente-3.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/mente.svg",
    "description": "<p><strong>Paura III</strong> · Mente</p><p><em>Esci di scena. Il sinonimo è Svenuto: crolli dove sei.</em></p><p>Falliscono i tiri fisici, sociali e mentali, finché la fonte è in scena.</p><p>Nasce da minacce, orrori, Presenze, e si scrive con la fonte: Spaventato dal Revisore. Tocca tutto quello che fai in presenza della fonte.</p>",
    "bonuses": []
  },
  {
    "id": "nervoso",
    "name": "Nervoso",
    "proposed": true,
    "family": "mente",
    "familyLabel": "Mente",
    "scale": "rabbia",
    "scaleLabel": "Rabbia",
    "section": "scala",
    "grade": 1,
    "numeral": "I",
    "weight": "meno2",
    "tipi": [
      "social"
    ],
    "tiriText": "sociali",
    "what": "Rispondi male, e ti si legge in faccia.",
    "effect": "−2 dadi sui tiri sociali",
    "intro": "Nasce da insulti, umiliazioni, provocazioni. Tocca il controllo di te.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/mente-1.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/mente.svg",
    "description": "<p><strong>Rabbia I</strong> · Mente</p><p><em>Rispondi male, e ti si legge in faccia.</em></p><p>−2 dadi sui tiri sociali.</p><p>Nasce da insulti, umiliazioni, provocazioni. Tocca il controllo di te.</p>",
    "bonuses": [
      {
        "source": "Nervoso",
        "value": "-2",
        "paths": [
          "social"
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
    "id": "arrabbiato",
    "name": "Arrabbiato",
    "proposed": false,
    "family": "mente",
    "familyLabel": "Mente",
    "scale": "rabbia",
    "scaleLabel": "Rabbia",
    "section": "scala",
    "grade": 2,
    "numeral": "II",
    "weight": "otto",
    "tipi": [
      "social"
    ],
    "tiriText": "sociali",
    "what": "A ogni provocazione rispondi, e ragioni peggio.",
    "effect": "−2 dadi e difficoltà 8 sui tiri sociali",
    "intro": "Nasce da insulti, umiliazioni, provocazioni. Tocca il controllo di te.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/mente-2.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/mente.svg",
    "description": "<p><strong>Rabbia II</strong> · Mente</p><p><em>A ogni provocazione rispondi, e ragioni peggio.</em></p><p>−2 dadi e difficoltà 8 sui tiri sociali.</p><p>Nasce da insulti, umiliazioni, provocazioni. Tocca il controllo di te.</p>",
    "bonuses": [
      {
        "source": "Arrabbiato",
        "value": "-2",
        "paths": [
          "social"
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
    "id": "furioso",
    "name": "Furioso",
    "proposed": true,
    "family": "mente",
    "familyLabel": "Mente",
    "scale": "rabbia",
    "scaleLabel": "Rabbia",
    "section": "scala",
    "grade": 3,
    "numeral": "III",
    "weight": "fallisce",
    "tipi": [
      "social"
    ],
    "tiriText": "sociali",
    "what": "Attacchi chi ti ha provocato, e non ascolti nessuno.",
    "effect": "falliscono i tiri sociali",
    "intro": "Nasce da insulti, umiliazioni, provocazioni. Tocca il controllo di te.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/mente-3.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/mente.svg",
    "description": "<p><strong>Rabbia III</strong> · Mente</p><p><em>Attacchi chi ti ha provocato, e non ascolti nessuno.</em></p><p>Falliscono i tiri sociali.</p><p>Nasce da insulti, umiliazioni, provocazioni. Tocca il controllo di te.</p>",
    "bonuses": []
  },
  {
    "id": "assonnato",
    "name": "Assonnato",
    "proposed": true,
    "family": "mente",
    "familyLabel": "Mente",
    "scale": "sonno",
    "scaleLabel": "Sonno",
    "section": "scala",
    "grade": 1,
    "numeral": "I",
    "weight": "meno2",
    "tipi": [
      "physical",
      "mental"
    ],
    "tiriText": "fisici e mentali",
    "what": "Le palpebre pesano e l'attenzione scappa.",
    "effect": "−2 dadi sui tiri fisici e mentali",
    "intro": "Nasce da sedativi, notti in bianco, Magick di Mente o di Vita. Tocca la veglia.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/mente-1.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/mente.svg",
    "description": "<p><strong>Sonno I</strong> · Mente</p><p><em>Le palpebre pesano e l'attenzione scappa.</em></p><p>−2 dadi sui tiri fisici e mentali.</p><p>Nasce da sedativi, notti in bianco, Magick di Mente o di Vita. Tocca la veglia.</p>",
    "bonuses": [
      {
        "source": "Assonnato",
        "value": "-2",
        "paths": [
          "physical",
          "mental"
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
    "id": "sedato",
    "name": "Sedato",
    "proposed": false,
    "family": "mente",
    "familyLabel": "Mente",
    "scale": "sonno",
    "scaleLabel": "Sonno",
    "section": "scala",
    "grade": 2,
    "numeral": "II",
    "weight": "otto",
    "tipi": [
      "physical",
      "mental"
    ],
    "tiriText": "fisici e mentali",
    "what": "Sei lento, e la lingua si impasta.",
    "effect": "−2 dadi e difficoltà 8 sui tiri fisici e mentali",
    "intro": "Nasce da sedativi, notti in bianco, Magick di Mente o di Vita. Tocca la veglia.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/mente-2.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/mente.svg",
    "description": "<p><strong>Sonno II</strong> · Mente</p><p><em>Sei lento, e la lingua si impasta.</em></p><p>−2 dadi e difficoltà 8 sui tiri fisici e mentali.</p><p>Nasce da sedativi, notti in bianco, Magick di Mente o di Vita. Tocca la veglia.</p>",
    "bonuses": [
      {
        "source": "Sedato",
        "value": "-2",
        "paths": [
          "physical",
          "mental"
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
    "id": "addormentato",
    "name": "Addormentato",
    "proposed": false,
    "family": "mente",
    "familyLabel": "Mente",
    "scale": "sonno",
    "scaleLabel": "Sonno",
    "section": "scala",
    "grade": 3,
    "numeral": "III",
    "weight": "fallisce",
    "tipi": [
      "physical",
      "social",
      "mental"
    ],
    "tiriText": "fisici e mentali",
    "what": "Dormi finché qualcuno non ti sveglia.",
    "effect": "non agisci: falliscono tutti i tiri",
    "intro": "Nasce da sedativi, notti in bianco, Magick di Mente o di Vita. Tocca la veglia.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/mente-3.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/mente.svg",
    "description": "<p><strong>Sonno III</strong> · Mente</p><p><em>Dormi finché qualcuno non ti sveglia.</em></p><p>Non agisci: falliscono tutti i tiri.</p><p>Nasce da sedativi, notti in bianco, Magick di Mente o di Vita. Tocca la veglia.</p>",
    "bonuses": []
  },
  {
    "id": "suggestionato",
    "name": "Suggestionato",
    "proposed": false,
    "family": "soprannaturale",
    "familyLabel": "Soprannaturale",
    "scale": "controllo",
    "scaleLabel": "Controllo",
    "section": "scala",
    "grade": 1,
    "numeral": "I",
    "weight": "scelte",
    "tipi": [],
    "tiriText": "nessuno",
    "what": "Segui l'indicazione che ti hanno dato, per lo scopo per cui te l'hanno data.",
    "effect": "nessun dado: toglie le scelte",
    "intro": "Nasce dalla Magick di Mente, dagli spiriti, dalle Presenze, e si scrive con chi ti tiene.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/soprannaturale-1.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/soprannaturale.svg",
    "description": "<p><strong>Controllo I</strong> · Soprannaturale</p><p><em>Segui l'indicazione che ti hanno dato, per lo scopo per cui te l'hanno data.</em></p><p>Nessun dado: toglie le scelte.</p><p>Nasce dalla Magick di Mente, dagli spiriti, dalle Presenze, e si scrive con chi ti tiene.</p>",
    "bonuses": []
  },
  {
    "id": "ammaliato",
    "name": "Ammaliato",
    "proposed": false,
    "family": "soprannaturale",
    "familyLabel": "Soprannaturale",
    "scale": "controllo",
    "scaleLabel": "Controllo",
    "section": "scala",
    "grade": 2,
    "numeral": "II",
    "weight": "scelte",
    "tipi": [],
    "tiriText": "nessuno",
    "what": "Non hai diritto di reazione, e sei convinto che l'idea sia tua.",
    "effect": "nessun dado: toglie le scelte",
    "intro": "Nasce dalla Magick di Mente, dagli spiriti, dalle Presenze, e si scrive con chi ti tiene.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/soprannaturale-2.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/soprannaturale.svg",
    "description": "<p><strong>Controllo II</strong> · Soprannaturale</p><p><em>Non hai diritto di reazione, e sei convinto che l'idea sia tua.</em></p><p>Nessun dado: toglie le scelte.</p><p>Nasce dalla Magick di Mente, dagli spiriti, dalle Presenze, e si scrive con chi ti tiene.</p>",
    "bonuses": []
  },
  {
    "id": "posseduto",
    "name": "Posseduto",
    "proposed": false,
    "family": "soprannaturale",
    "familyLabel": "Soprannaturale",
    "scale": "controllo",
    "scaleLabel": "Controllo",
    "section": "scala",
    "grade": 3,
    "numeral": "III",
    "weight": "scelte",
    "tipi": [],
    "tiriText": "nessuno",
    "what": "Il Narratore muove il tuo personaggio; tu lo giochi seguendo le sue indicazioni, senza tirare l'acqua al tuo mulino.",
    "effect": "nessun dado: toglie le scelte",
    "intro": "Nasce dalla Magick di Mente, dagli spiriti, dalle Presenze, e si scrive con chi ti tiene.",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/soprannaturale-3.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/soprannaturale.svg",
    "description": "<p><strong>Controllo III</strong> · Soprannaturale</p><p><em>Il Narratore muove il tuo personaggio; tu lo giochi seguendo le sue indicazioni, senza tirare l'acqua al tuo mulino.</em></p><p>Nessun dado: toglie le scelte.</p><p>Nasce dalla Magick di Mente, dagli spiriti, dalle Presenze, e si scrive con chi ti tiene.</p>",
    "bonuses": []
  },
  {
    "id": "sfortunato",
    "name": "Sfortunato",
    "proposed": false,
    "family": "soprannaturale",
    "familyLabel": "Soprannaturale",
    "scale": "sventura",
    "scaleLabel": "Sventura",
    "section": "da-riscrivere",
    "grade": 0,
    "numeral": "",
    "weight": "nessuno",
    "tipi": [],
    "tiriText": "",
    "what": "Il caso ti gira contro.",
    "effect": "Il tuo critico non scatta.",
    "intro": "",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/soprannaturale.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/soprannaturale.svg",
    "description": "<p><strong>Sventura</strong> · Soprannaturale</p><p><em>Il caso ti gira contro.</em></p><p>Il tuo critico non scatta.</p>",
    "bonuses": []
  },
  {
    "id": "maledetto",
    "name": "Maledetto",
    "proposed": false,
    "family": "soprannaturale",
    "familyLabel": "Soprannaturale",
    "scale": "sventura",
    "scaleLabel": "Sventura",
    "section": "da-riscrivere",
    "grade": 0,
    "numeral": "",
    "weight": "nessuno",
    "tipi": [],
    "tiriText": "",
    "what": "Le ferite non si chiudono.",
    "effect": "Non guarisci in nessun modo, né col riposo né con le cure né con la Magick, finché la causa resta.",
    "intro": "",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/soprannaturale.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/soprannaturale.svg",
    "description": "<p><strong>Sventura</strong> · Soprannaturale</p><p><em>Le ferite non si chiudono.</em></p><p>Non guarisci in nessun modo, né col riposo né con le cure né con la Magick, finché la causa resta.</p>",
    "bonuses": []
  },
  {
    "id": "contuso",
    "name": "Contuso",
    "proposed": false,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "lievi",
    "scaleLabel": "Lievi",
    "section": "lievi",
    "grade": 0,
    "numeral": "",
    "weight": "lieve",
    "tipi": [
      "physical"
    ],
    "tiriText": "fisici",
    "what": "Le botte si fanno sentire.",
    "effect": "−1 dado sui tiri fisici",
    "intro": "",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Lievi</strong> · Corpo</p><p><em>Le botte si fanno sentire.</em></p><p>−1 dado sui tiri fisici.</p>",
    "bonuses": [
      {
        "source": "Contuso",
        "value": "-1",
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
    "id": "slogato",
    "name": "Slogato",
    "proposed": false,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "lievi",
    "scaleLabel": "Lievi",
    "section": "lievi",
    "grade": 0,
    "numeral": "",
    "weight": "lieve",
    "tipi": [
      "physical"
    ],
    "tiriText": "fisici",
    "what": "Il polso o la caviglia.",
    "effect": "−1 dado sui tiri fisici",
    "intro": "",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Lievi</strong> · Corpo</p><p><em>Il polso o la caviglia.</em></p><p>−1 dado sui tiri fisici.</p>",
    "bonuses": [
      {
        "source": "Slogato",
        "value": "-1",
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
    "id": "stanco",
    "name": "Stanco",
    "proposed": false,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "lievi",
    "scaleLabel": "Lievi",
    "section": "lievi",
    "grade": 0,
    "numeral": "",
    "weight": "lieve",
    "tipi": [
      "physical"
    ],
    "tiriText": "fisici",
    "what": "Poco sonno, troppo sforzo.",
    "effect": "−1 dado sui tiri fisici",
    "intro": "",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Lievi</strong> · Corpo</p><p><em>Poco sonno, troppo sforzo.</em></p><p>−1 dado sui tiri fisici.</p>",
    "bonuses": [
      {
        "source": "Stanco",
        "value": "-1",
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
    "id": "scosso",
    "name": "Scosso",
    "proposed": false,
    "family": "mente",
    "familyLabel": "Mente",
    "scale": "lievi",
    "scaleLabel": "Lievi",
    "section": "lievi",
    "grade": 0,
    "numeral": "",
    "weight": "lieve",
    "tipi": [
      "social",
      "mental"
    ],
    "tiriText": "sociali e mentali",
    "what": "Uno spavento, uno shock.",
    "effect": "−1 dado sui tiri sociali e mentali",
    "intro": "",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/mente.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/mente.svg",
    "description": "<p><strong>Lievi</strong> · Mente</p><p><em>Uno spavento, uno shock.</em></p><p>−1 dado sui tiri sociali e mentali.</p>",
    "bonuses": [
      {
        "source": "Scosso",
        "value": "-1",
        "paths": [
          "social",
          "mental"
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
    "id": "emotivo",
    "name": "Emotivo",
    "proposed": false,
    "family": "mente",
    "familyLabel": "Mente",
    "scale": "lievi",
    "scaleLabel": "Lievi",
    "section": "lievi",
    "grade": 0,
    "numeral": "",
    "weight": "lieve",
    "tipi": [
      "social"
    ],
    "tiriText": "sociali",
    "what": "Commosso, toccato, a nervi scoperti.",
    "effect": "−1 dado sui tiri sociali",
    "intro": "",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/mente.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/mente.svg",
    "description": "<p><strong>Lievi</strong> · Mente</p><p><em>Commosso, toccato, a nervi scoperti.</em></p><p>−1 dado sui tiri sociali.</p>",
    "bonuses": [
      {
        "source": "Emotivo",
        "value": "-1",
        "paths": [
          "social"
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
    "id": "in-ansia",
    "name": "In ansia",
    "proposed": false,
    "family": "mente",
    "familyLabel": "Mente",
    "scale": "lievi",
    "scaleLabel": "Lievi",
    "section": "lievi",
    "grade": 0,
    "numeral": "",
    "weight": "lieve",
    "tipi": [
      "mental"
    ],
    "tiriText": "mentali",
    "what": "Teso, in attesa di qualcosa.",
    "effect": "−1 dado sui tiri mentali",
    "intro": "",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/mente.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/mente.svg",
    "description": "<p><strong>Lievi</strong> · Mente</p><p><em>Teso, in attesa di qualcosa.</em></p><p>−1 dado sui tiri mentali.</p>",
    "bonuses": [
      {
        "source": "In ansia",
        "value": "-1",
        "paths": [
          "mental"
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
    "id": "sovrappensiero",
    "name": "Sovrappensiero",
    "proposed": false,
    "family": "mente",
    "familyLabel": "Mente",
    "scale": "lievi",
    "scaleLabel": "Lievi",
    "section": "lievi",
    "grade": 0,
    "numeral": "",
    "weight": "lieve",
    "tipi": [
      "mental"
    ],
    "tiriText": "mentali",
    "what": "La testa è altrove.",
    "effect": "−1 dado sui tiri mentali",
    "intro": "",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/mente.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/mente.svg",
    "description": "<p><strong>Lievi</strong> · Mente</p><p><em>La testa è altrove.</em></p><p>−1 dado sui tiri mentali.</p>",
    "bonuses": [
      {
        "source": "Sovrappensiero",
        "value": "-1",
        "paths": [
          "mental"
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
    "id": "confuso",
    "name": "Confuso",
    "proposed": false,
    "family": "mente",
    "familyLabel": "Mente",
    "scale": "lievi",
    "scaleLabel": "Lievi",
    "section": "lievi",
    "grade": 0,
    "numeral": "",
    "weight": "lieve",
    "tipi": [
      "mental"
    ],
    "tiriText": "mentali",
    "what": "Hai perso il filo.",
    "effect": "−1 dado sui tiri mentali",
    "intro": "",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/mente.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/mente.svg",
    "description": "<p><strong>Lievi</strong> · Mente</p><p><em>Hai perso il filo.</em></p><p>−1 dado sui tiri mentali.</p>",
    "bonuses": [
      {
        "source": "Confuso",
        "value": "-1",
        "paths": [
          "mental"
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
    "id": "atterrato",
    "name": "Atterrato",
    "proposed": false,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "scontro",
    "scaleLabel": "Scontro",
    "section": "scontro",
    "grade": 0,
    "numeral": "",
    "weight": "lieve",
    "tipi": [
      "physical"
    ],
    "tiriText": "fisici",
    "what": "",
    "effect": "−1 dado sui tiri fisici; finisce quando ti rialzi",
    "intro": "",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Scontro</strong> · Corpo</p><p>−1 dado sui tiri fisici; finisce quando ti rialzi.</p>",
    "bonuses": [
      {
        "source": "Atterrato",
        "value": "-1",
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
    "id": "disarmato",
    "name": "Disarmato",
    "proposed": false,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "scontro",
    "scaleLabel": "Scontro",
    "section": "scontro",
    "grade": 0,
    "numeral": "",
    "weight": "nessuno",
    "tipi": [],
    "tiriText": "quelli con l'arma",
    "what": "",
    "effect": "l'arma non ce l'hai; finisce quando la riprendi",
    "intro": "",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Scontro</strong> · Corpo</p><p>L'arma non ce l'hai; finisce quando la riprendi.</p>",
    "bonuses": []
  },
  {
    "id": "legato",
    "name": "Legato",
    "proposed": false,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "scontro",
    "scaleLabel": "Scontro",
    "section": "scontro",
    "grade": 0,
    "numeral": "",
    "weight": "fallisce",
    "tipi": [
      "physical"
    ],
    "tiriText": "i fisici che chiedono di muoverti",
    "what": "",
    "effect": "falliscono i fisici che chiedono di muoverti; finisce quando qualcuno ti scioglie",
    "intro": "",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Scontro</strong> · Corpo</p><p>Falliscono i fisici che chiedono di muoverti; finisce quando qualcuno ti scioglie.</p>",
    "bonuses": []
  },
  {
    "id": "immobilizzato",
    "name": "Immobilizzato",
    "proposed": false,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "scontro",
    "scaleLabel": "Scontro",
    "section": "scontro",
    "grade": 0,
    "numeral": "",
    "weight": "fallisce",
    "tipi": [
      "physical"
    ],
    "tiriText": "i fisici che chiedono di muoverti",
    "what": "",
    "effect": "falliscono i fisici che chiedono di muoverti; finisce quando qualcuno ti scioglie",
    "intro": "",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Scontro</strong> · Corpo</p><p>Falliscono i fisici che chiedono di muoverti; finisce quando qualcuno ti scioglie.</p>",
    "bonuses": []
  },
  {
    "id": "stordito",
    "name": "Stordito",
    "proposed": false,
    "family": "corpo",
    "familyLabel": "Corpo",
    "scale": "scontro",
    "scaleLabel": "Scontro",
    "section": "scontro",
    "grade": 0,
    "numeral": "",
    "weight": "azione",
    "tipi": [],
    "tiriText": "tutti",
    "what": "",
    "effect": "perdi l'azione del turno; finisce a fine turno. Invece di perdere l'azione, puoi segnare 1 Superficiale mentale e agire lo stesso.",
    "intro": "",
    "icon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "familyIcon": "modules/wod5e-mage/assets/icons/condizioni/corpo.svg",
    "description": "<p><strong>Scontro</strong> · Corpo</p><p>Perdi l'azione del turno; finisce a fine turno. Invece di perdere l'azione, puoi segnare 1 Superficiale mentale e agire lo stesso.</p>",
    "bonuses": []
  }
]);
