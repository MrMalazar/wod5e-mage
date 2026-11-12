/**
 * Le Specializzazioni di catalogo (canone «Le Abilità Essenziali»): le dieci per
 * chiave viva del 12/11/2026, con base l'Alpha 2.0 di Vampiri V6. Ognuna ha un
 * argomento suo, che le altre della stessa voce non toccano. Le azioni stanno
 * all'infinito (Scassinare, Pedinare); i campi, le cose che si usano, i sensi e
 * le creature restano nomi (Chimica, Armi da fuoco leggere, Vista, Non morti).
 * Sport e Design portano fra parentesi il tipo a scelta. Sono suggerimenti per
 * la finestra «Aggiungi una Specializzazione», non un recinto: il giocatore può
 * scriverne una sua. Bloccare eredita l'asterisco di Difesa: come si schiva si
 * decide quando si rivedono le dinamiche del combattimento.
 */
export const SPECIALIZZAZIONI = Object.freeze({
  awareness: Object.freeze(["Empatia", "Menzogne", "Intenzioni", "Agguati", "Pericolo", "Vista", "Udito", "Olfatto", "Tatto", "Soprannaturale"]),
  firearms: Object.freeze(["Armi da fuoco leggere", "Armi da fuoco medie", "Armi da fuoco pesanti", "Armi improvvisate", "Armi medievali", "Artiglieria", "Armi non letali", "Armi sperimentali", "Armi hi-tech", "Armi subacquee"]),
  performance: Object.freeze(["Recitazione", "Scena", "Danza", "Musica", "Scrittura", "Oratoria", "Disegno", "Pittura", "Scultura", "Fotografia"]),
  athletics: Object.freeze(["Correre", "Parkour", "Scalare", "Acrobazia", "Liberarsi", "Nuotare", "Sollevare", "Resistenza", "Guidare", "Sport (a scelta)"]),
  academics: Object.freeze(["Storia", "Legge", "Politica", "Affari", "Religione", "Lingue", "Informatica", "Chimica", "Biologia", "Ingegneria"]),
  persuasion: Object.freeze(["Galateo", "Fraternizzare", "Diplomazia", "Negoziare", "Comandare", "Sedurre", "Distrarre", "Minacciare", "Ricattare", "Corrompere"]),
  larceny: Object.freeze(["Scassinare", "Infiltrarsi", "Allarmi", "Hackerare", "Demolire", "Manomettere", "Rapinare", "Rapire", "Occultare", "Riciclare"]),
  investigation: Object.freeze(["Scena del crimine", "Dati", "Archivi", "Informatori", "Pettegolezzi", "Mercato nero", "Interrogare", "Appostarsi", "Intercettare", "Codici"]),
  craft: Object.freeze(["Carpenteria", "Muratura", "Officina", "Tecnologia", "Fai da te", "Trappole", "Falsificare", "Design (a scelta)", "Cucina", "Agricoltura"]),
  medicine: Object.freeze(["Primo soccorso", "Chirurgia", "Diagnosi", "Autopsie", "Psicologia", "Farmaci", "Tossicologia", "Medicina naturale", "Veterinaria", "Riabilitazione"]),
  brawl: Object.freeze(["Pugilato", "Lotta", "Colpi bassi", "Armi leggere", "Armi medie", "Armi pesanti", "Armi improvvisate", "Armi naturali", "Disarmare", "Bloccare"]),
  survival: Object.freeze(["Orientarsi", "Tracce", "Cacciare", "Pescare", "Animali", "Provviste", "Rifugi", "Intemperie", "Sottosuolo", "Nodi"]),
  subterfuge: Object.freeze(["Furtività", "Pedinare", "Origliare", "Borseggiare", "Barare", "Travestirsi", "Imitare", "Truffare", "Bluffare", "Depistare"]),
  occult: Object.freeze(["Occultismo", "Cosmologia", "Risvegliati", "Non morti", "Licantropi", "Fatati", "Spiriti", "Demoni", "Cacciatori", "Esterni"])
});

/** Dieci per voce, come vuole il canone del 12/11. */
export const SPECIALIZZAZIONI_PER_VOCE = 10;

/** I suggerimenti per una chiave, o niente. */
export function specialtySuggestions(skillId) {
  return SPECIALIZZAZIONI[skillId] ?? [];
}
