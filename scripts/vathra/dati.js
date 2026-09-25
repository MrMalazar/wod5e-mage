/**
 * I dati fissi del traduttore del Vathrâ (Blue, 25/9), presi dalla pagina di
 * 03_FABBRICA/vathra/sorgenti/modello.html: la tavola dei segni, gli otto
 * suoni registrati, le dieci frasi registrate, i sette Modi e le sette
 * regole. Sono testi del canone, in italiano anche con l'interfaccia in
 * inglese; i trattini lunghi della pagina sono diventati punti mediani.
 */

/** La tavola: [segno nel font, romanizzazione, come si dice], per famiglia. */
export const LETTERE = Object.freeze([
  { titolo: "Le Ferme · il ramo diritto", lettere: [
    ["p", "p", "come in «porta»"], ["t", "t", "come in «tempo»"], ["k", "k", "sempre dura, come in «casa»"],
    ["b", "b", "come in «bene»"], ["d", "d", "come in «dono»"], ["g", "g", "sempre dura, come in «gola»"]
  ] },
  { titolo: "I Soffi · il ramo obliquo", lettere: [
    ["f", "f", "come in «fuoco»"], ["s", "s", "sempre sorda, come in «sasso»"], ["h", "h", "un fiato appena udibile"],
    ["c", "sh", "come SC di «scena»"], ["q", "th", "T soffiata, come l'inglese «time»"], ["x", "kh", "C raschiata in gola"]
  ] },
  { titolo: "Le Correnti · il gomito", lettere: [
    ["m", "m", ""], ["n", "n", ""], ["r", "r", "vibrata, ben rullata"], ["l", "l", ""]
  ] },
  { titolo: "Le Voci", lettere: [
    ["v", "v", ""], ["y", "y", "come la I di «ieri»"], ["z", "z", "come ZZ di «pizza»"], ["ʼ", "ʼ", "lo stacco: un colpo di gola"]
  ] },
  { titolo: "I Soffi vocalici", lettere: [
    ["a", "a", ""], ["e", "e", ""], ["i", "i", ""], ["o", "o", ""], ["u", "u", ""]
  ] },
  { titolo: "I Soffi tenuti · la barra sopra", lettere: [
    ["â", "â", "tenuta, e prende l'accento"], ["ê", "ê", ""], ["î", "î", ""], ["ô", "ô", ""], ["û", "û", ""]
  ] }
]);

/** Gli otto suoni che non si indovinano: il file è voce/L<indice>.mp3. */
export const SUONI = Object.freeze([
  { seg: "kh", parola: "kharzâ", nota: "una C raschiata in gola" },
  { seg: "th", parola: "nakhthâ", nota: "una T soffiata" },
  { seg: "sh", parola: "lakhshâ", nota: "come la SC di scena" },
  { seg: "'", parola: "'agnâ", nota: "lo stacco: un colpo di gola" },
  { seg: "z", parola: "kharzâ", nota: "come la doppia zeta di pizza" },
  { seg: "r", parola: "khinâr", nota: "vibrata, ben rullata" },
  { seg: "y", parola: "magyâ", nota: "come la I di ieri" },
  { seg: "â", parola: "vathrâ", nota: "la vocale tenuta prende l'accento" }
]);

/**
 * Le dieci frasi registrate (il frasario della pagina): quando la lettura è
 * una di queste, Ascolta suona la registrazione voce/F<indice>.mp3; per le
 * altre parla la voce italiana del computer.
 */
export const REGISTRATE = Object.freeze([
  "hann 'asharilsa e'samlâ she.",
  "'afarilmi e'ofur e'valnâum i mi ne thak.",
  "e'nakhthâath vakharilmi î'shi'âr i mi va.",
  "vatharê miar e'vothur i ka verish.",
  "ûshalavâsmi han shalvâ.",
  "rakharilsa î'nazkhâên kull mah.",
  "vazarmi ramaf î'tharmâ ne.",
  "vanarê shazarê 'ashakhê.",
  "ûvazarilsar î'zirâmolên lâmah.",
  "ferish khanrâ i ka."
]);

/** I sette Modi, nell'ordine del capitolo. */
export const MODI = Object.freeze([
  { id: "atto", nome: "Atto", senso: "l'azione nuda" },
  { id: "agente", nome: "Agente", senso: "chi la compie" },
  { id: "esito", nome: "Esito", senso: "ciò che ne resta" },
  { id: "astratto", nome: "Astratto", senso: "la cosa in sé" },
  { id: "qualita", nome: "Qualità", senso: "l'attributo" },
  { id: "luogo", nome: "Luogo", senso: "dove avviene" },
  { id: "intenso", nome: "Intenso", senso: "colmo, sacro" }
]);

/** Le sette regole della pagina, una per riga (HTML fisso, niente dati dell'utente). */
export const REGOLE = Object.freeze([
  "<b>1.</b> Tre consonanti fanno una radice. Le vocali che ci entrano dentro dicono cosa quella radice sta diventando.",
  "<b>2.</b> Prima il quadro, poi <b>il verbo</b>, poi chi agisce, poi cosa subisce.",
  "<b>3.</b> Non esiste il verbo essere. Due parole accostate bastano.",
  "<b>4.</b> Non esiste il possesso. Esiste il legame: <code>i</code> lega, non appartiene.",
  "<b>5.</b> Chi agisce di proposito porta <code>-en</code>, la desinenza della volontà.",
  "<b>6.</b> Alla fine si dice come lo sai: <code>ne</code>, <code>she</code>, <code>ro</code>.",
  "<b>7.</b> E se c'è magia, si dice se il mondo ha acconsentito, <code>va</code>, oppure se gliel'hai strappata, <code>thak</code>.",
  "<b>+</b> Chi è risvegliato porta <code>î'</code> e <code>-ên</code>; chi dorme porta <code>e'</code> e <code>-en</code>. E <code>sa-</code> davanti al verbo dice quello che è successo davvero, sotto il Consenso."
]);
