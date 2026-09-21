// Il catalogo dei poteri delle Sfere. Blue li scrive nel foglio «Poteri Sfere
// M6» (dieci pagine, una per Sfera più Qualsiasi, 124 poteri al 20/9/2026);
// finché il foglio non è fermo il catalogo qui è VUOTO, e il giocatore
// scrive i suoi poteri a mano nella pagina Magick (Blue, 21/9: «starà a lui
// inserirne»). Quando arriverà, ogni riga avrà questa forma:
//
// {
//   id: "P016-Vi",            // l'ID del foglio, col suffisso della Sfera
//   sphere: "life",           // la Sfera della pagina
//   name: "Rigenerazione",
//   dot: 1,                   // il pallino richiesto (1-5), 0 se non ancora dato
//   type: "passivo",          // "attivo" | "passivo" | ""
//   text: "Ogni cambio scena…",   // Cosa fa
//   amalgam: "mind",          // la seconda Sfera, o ""
//   amalgamText: "…",         // Con l'Amalgama
//   flavor: "",
//   cost: "1 Quintessenza a scena",
//   effects: []               // { on: "threshold" | "dice" | "successFrom", value }
// }
//
// Gli `on` ammessi stanno in poteri.js (POTERE_EFFECTS).
export const POTERI = Object.freeze([]);
