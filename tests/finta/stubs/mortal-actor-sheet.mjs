// La scheda mortal del sistema, finta: la scheda del mago la estende, e la scheda del nemico ne prende la ruota dei comandi.
export class MortalActorSheet {
  static DEFAULT_OPTIONS = {};
  static PARTS = {};
  constructor(options = {}) { this.options = options; this.actor = options.document; }
}
