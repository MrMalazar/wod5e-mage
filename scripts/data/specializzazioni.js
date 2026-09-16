/**
 * Le Specializzazioni di catalogo (canone «Le Abilità Essenziali», 11/9/2026,
 * le sei fisse del 16/9/2026): per ogni chiave viva, le sei proposte dal LIBRO,
 * tutte della stessa specie (rami di un mestiere, classi d'arma, leve). Sono
 * suggerimenti per la finestra «Aggiungi una Specializzazione», non un recinto:
 * il giocatore può scriverne una sua. Una parola l'una, come vuole il canone.
 * Difesa porta l'asterisco di Blue: le dinamiche del combattimento sono da rivalutare.
 */
export const SPECIALIZZAZIONI = Object.freeze({
  awareness: Object.freeze(["Agguati", "Pedinamenti", "Dettagli", "Ascolto", "Menzogne", "Intenzioni"]),
  firearms: Object.freeze(["Pistole", "Fucili", "Cecchino", "Automatiche", "Archi", "Pesanti"]),
  performance: Object.freeze(["Musica", "Scrittura", "Pittura", "Fotografia", "Scena", "Oratoria"]),
  athletics: Object.freeze(["Corsa", "Acrobazia", "Nuoto", "Scalata", "Resistenza", "Guida"]),
  academics: Object.freeze(["Storia", "Legge", "Finanza", "Politica", "Scienze", "Lingue"]),
  persuasion: Object.freeze(["Trattativa", "Comando", "Minaccia", "Galateo", "Parlantina", "Seduzione"]),
  larceny: Object.freeze(["Scasso", "Borseggio", "Falsificazione", "Rapina", "Demolizioni", "Intrusione"]),
  investigation: Object.freeze(["Forense", "Archivi", "Interrogatori", "Appostamenti", "Strada", "Dati"]),
  craft: Object.freeze(["Officina", "Impianti", "Carpenteria", "Elettronica", "Cucina", "Agricoltura"]),
  medicine: Object.freeze(["Soccorso", "Chirurgia", "Diagnosi", "Farmaci", "Autopsie", "Psicologia"]),
  brawl: Object.freeze(["Pugilato", "Lotta", "Lame", "Mazze", "Improvvisate", "Difesa"]),
  survival: Object.freeze(["Tracce", "Caccia", "Orientamento", "Rifugi", "Animali", "Rovine"]),
  subterfuge: Object.freeze(["Truffa", "Travestimenti", "Infiltrazione", "Bluff", "Depistaggi", "Furtività"]),
  occult: Object.freeze(["Cosmologia", "Vampiri", "Licantropi", "Risvegliati", "Fatati", "Esterni"])
});

/** Sei per voce, come vuole il canone del 16/9. */
export const SPECIALIZZAZIONI_PER_VOCE = 6;

/** I suggerimenti per una chiave, o niente. */
export function specialtySuggestions(skillId) {
  return SPECIALIZZAZIONI[skillId] ?? [];
}
