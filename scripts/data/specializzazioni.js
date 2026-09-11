/**
 * Le Specializzazioni di catalogo (canone «Le Abilità Essenziali», 11/9/2026):
 * per ogni chiave viva, i nomi proposti dal LIBRO. Sono suggerimenti per la
 * finestra «Aggiungi una Specializzazione», non un recinto: il giocatore può
 * scriverne una sua. Una parola l'una, come vuole il canone.
 */
export const SPECIALIZZAZIONI = Object.freeze({
  awareness: Object.freeze(["Imboscate", "Vista", "Udito", "Fiuto", "Pedinamenti", "Veglia", "Menzogne", "Desideri", "Folle", "Ostilità", "Aure"]),
  firearms: Object.freeze(["Pistole", "Fucili", "Cecchino", "Raffica", "Archi", "Pesanti"]),
  performance: Object.freeze(["Musica", "Scrittura", "Pittura", "Fotografia", "Danza", "Palcoscenico", "Oratoria"]),
  athletics: Object.freeze(["Inseguimenti", "Parkour", "Nuoto", "Scalata", "Lancio", "Fondo", "Guida", "Moto", "Barche", "Velivoli", "Cavalcature"]),
  academics: Object.freeze(["Storia", "Legge", "Finanza", "Matematica", "Psicologia", "Politica", "Lingue", "Chimica", "Fisica", "Biologia", "Ingegneria", "Informatica"]),
  persuasion: Object.freeze(["Trattativa", "Comando", "Minaccia", "Galateo", "Parlantina", "Seduzione", "Conforto"]),
  larceny: Object.freeze(["Scasso", "Borseggio", "Falsificazione", "Ricettazione", "Rapina", "Demolizioni", "Intrusione", "Cifratura"]),
  investigation: Object.freeze(["Sopralluoghi", "Archivi", "Interrogatori", "Appostamenti", "Deduzione", "Scomparsi", "Strada", "Forense", "Dati"]),
  craft: Object.freeze(["Officina", "Impianti", "Carpenteria", "Cucina", "Agricoltura", "Sartoria", "Elettronica", "Droni", "Reti"]),
  medicine: Object.freeze(["Soccorso", "Chirurgia", "Veleni", "Farmaci", "Diagnosi", "Autopsie", "Veterinaria"]),
  brawl: Object.freeze(["Pugilato", "Lotta", "Lame", "Mazze", "Improvvisate", "Disarmo"]),
  survival: Object.freeze(["Selva", "Tracce", "Rovine", "Caccia", "Orientamento", "Rifugi", "Animali", "Belve"]),
  subterfuge: Object.freeze(["Truffa", "Travestimenti", "Infiltrazione", "Bluff", "Depistaggi", "Innocenza", "Furtività"]),
  occult: Object.freeze(["Tradizioni", "Rituali", "Cosmologia", "Enigmi", "Esoterica", "Folklore", "Spiriti", "Famigli", "Mostri", "Entità"])
});

/** I suggerimenti per una chiave, o niente. */
export function specialtySuggestions(skillId) {
  return SPECIALIZZAZIONI[skillId] ?? [];
}
