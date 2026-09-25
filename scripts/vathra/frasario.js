/**
 * Il frasario del traduttore (Blue, 25/9): prima «Di scena», le dieci frasi del
 * frasario della pagina di 03_FABBRICA più le quattro delle carte formula che
 * mancavano; poi i dieci gruppi di 05_TAVOLO/campagne/Vathra_cento_frasi.md.
 * Ogni frase porta le manopole con cui il motore la rende com'è scritta nel
 * documento (lo controlla tests/vathra.test.js); la traduzione si fa al volo.
 */
export const FRASARIO = Object.freeze([
  { id: "scena", titolo: "Di scena", frasi: [
    { it: "Il Velo si assottiglia qui.", o: { testimone: "tessitura" } },
    { it: "Apro la porta con la mia volontà.", o: { testimone: "occhi", consenso: "volgare" } },
    { it: "Chiamo il mio Avatar nella notte.", o: { consenso: "coincidente" } },
    { it: "Dimmi il tuo nome vero." },
    { it: "Non pagherò questo prezzo." },
    { it: "Il Paradosso ricorda ogni cosa." },
    { it: "Ho visto la Tessitura spezzarsi.", o: { testimone: "occhi" } },
    { it: "Vieni, siediti, ascolta.", o: { modo: "imperativo" } },
    { it: "I dormienti non vedono niente." },
    { it: "Che il tuo Risveglio sia puro." },
    { it: "Chiamo il mio Avatar.", o: { consenso: "coincidente" } },
    { it: "Questo patto ci lega." },
    { it: "Me l'ha detto il mio Avatar.", o: { testimone: "avatar" } },
    { it: "Il Dormiente è morto.", o: { testimone: "occhi", registro: "reale" } }
  ] },
  { id: "incontrarsi", titolo: "Incontrarsi", frasi: [
    { it: "Chi sei?" },
    { it: "Come ti chiami?" },
    { it: "Sei un Risvegliato?" },
    { it: "Vengo dalle Tradizioni." },
    { it: "Non ti conosco." },
    { it: "Chi ti manda?" },
    { it: "Non mi manda nessuno." },
    { it: "Lui è con me." },
    { it: "Siediti con noi." },
    { it: "Di chi è questo?" }
  ] },
  { id: "muoversi", titolo: "Muoversi", frasi: [
    { it: "Andiamo." },
    { it: "Aspetta." },
    { it: "Aspetta ancora." },
    { it: "Vieni con me." },
    { it: "Vieni dietro di me." },
    { it: "Resta qui." },
    { it: "Torna indietro." },
    { it: "Andiamo adagio." },
    { it: "Dove andiamo?" },
    { it: "Questa strada è chiusa.", o: { testimone: "occhi" } }
  ] },
  { id: "ordini", titolo: "Ordini brevi", frasi: [
    { it: "Vai." },
    { it: "Corri." },
    { it: "Entra." },
    { it: "Esci." },
    { it: "Sali." },
    { it: "Scendi." },
    { it: "Apri la porta." },
    { it: "Chiudi la porta." },
    { it: "Prendi questo." },
    { it: "Lascia stare." }
  ] },
  { id: "divieti", titolo: "Divieti", frasi: [
    { it: "Non parlate." },
    { it: "Non guardate." },
    { it: "Non toccate." },
    { it: "Non entrate." },
    { it: "Non uscite." },
    { it: "Non correte." },
    { it: "Non aspettate." },
    { it: "Non chiedete." },
    { it: "Non pagate." },
    { it: "Non mentite." }
  ] },
  { id: "pericolo", titolo: "Pericolo", frasi: [
    { it: "Loro arrivano.", o: { testimone: "occhi" } },
    { it: "Qualcuno arriva.", o: { testimone: "occhi" } },
    { it: "Ci hanno visti.", o: { testimone: "occhi" } },
    { it: "Qualcuno ci guarda.", o: { testimone: "occhi" } },
    { it: "Nessuno si muove." },
    { it: "Scappa." },
    { it: "Resta nascosto." },
    { it: "È armato.", o: { testimone: "occhi" } },
    { it: "Ho paura." },
    { it: "Non ho paura." }
  ] },
  { id: "velo", titolo: "Il Velo e i Dormienti", frasi: [
    { it: "Qui dormono tutti.", o: { testimone: "occhi" } },
    { it: "Lui dorme.", o: { testimone: "occhi" } },
    { it: "Lei è sveglia.", o: { testimone: "tessitura" } },
    { it: "Questo uomo dorme.", o: { testimone: "occhi" } },
    { it: "Il Velo è sottile qui.", o: { testimone: "tessitura" } },
    { it: "Hai rotto il Velo.", o: { testimone: "occhi" } },
    { it: "Il Paradosso ti ha trovato.", o: { testimone: "tessitura" } },
    { it: "Nessuno ti vede.", o: { testimone: "occhi" } },
    { it: "Nessuno ha visto.", o: { testimone: "occhi" } },
    { it: "Copri il segno." }
  ] },
  { id: "magick", titolo: "Magick", frasi: [
    { it: "Adesso lavoro.", o: { consenso: "coincidente" } },
    { it: "Ho aperto la porta.", o: { testimone: "occhi", consenso: "coincidente" } },
    { it: "Ho spento la luce.", o: { testimone: "occhi", consenso: "coincidente" } },
    { it: "Sento la Tessitura.", o: { testimone: "tessitura" } },
    { it: "Chiamo il mio Avatar.", o: { consenso: "coincidente" } },
    { it: "Il mio Avatar non parla.", o: { testimone: "avatar" } },
    { it: "La mia Sfera è troppo bassa.", o: { testimone: "tessitura" } },
    { it: "La mia Volontà è finita.", o: { testimone: "occhi" } },
    { it: "Ho speso la Quintessenza.", o: { testimone: "occhi" } },
    { it: "Nascondi il mio lavoro." }
  ] },
  { id: "spiriti", titolo: "Spiriti e patti", frasi: [
    { it: "Ti ascolto." },
    { it: "Porto un dono." },
    { it: "Prendi questo dono?" },
    { it: "Che prezzo chiedi?" },
    { it: "Chiedo il passaggio." },
    { it: "Ti chiedo la benedizione." },
    { it: "Ho parlato con il fiume.", o: { testimone: "tessitura" } },
    { it: "La terra ha risposto.", o: { testimone: "tessitura" } },
    { it: "Il Nodo respira.", o: { testimone: "tessitura" } },
    { it: "Sento il Nodo.", o: { testimone: "tessitura" } }
  ] },
  { id: "debiti", titolo: "Debiti e prezzo", frasi: [
    { it: "Ti devo una cosa." },
    { it: "Mi devi una cosa." },
    { it: "Ho un debito con te." },
    { it: "Non ti devo niente." },
    { it: "Non mi devi niente." },
    { it: "Il debito è chiuso.", o: { testimone: "occhi" } },
    { it: "Il prezzo è troppo alto.", o: { testimone: "occhi" } },
    { it: "Ho già pagato.", o: { testimone: "occhi" } },
    { it: "Pagherò domani." },
    { it: "Non ho niente." }
  ] },
  { id: "corpo", titolo: "Corpo, cura e chiusura", frasi: [
    { it: "Sei ferito.", o: { testimone: "occhi" } },
    { it: "Mostrami la ferita." },
    { it: "Curo la tua ferita." },
    { it: "Guarirai." },
    { it: "Vivrai." },
    { it: "È morto.", o: { testimone: "occhi" } },
    { it: "Prendi la mia mano." },
    { it: "Ho finito.", o: { testimone: "occhi" } },
    { it: "Torniamo a casa." },
    { it: "Ti ringrazio." }
  ] }
]);
