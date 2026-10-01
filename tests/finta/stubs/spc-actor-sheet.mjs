// La scheda spc del sistema, finta: quanto basta alla scheda del nemico (1/10).
// Ricalca quel che la scheda vera fa e che la scheda del nemico eredita
// (wod-actor-base.js e spc-actor-sheet.js del sistema, 5.3.28):
//   - il form: di un INPUT scrive solo il campo cambiato, e un numero lo legge
//     con parseInt;
//   - le linguette: getTabs segna quella accesa (`active`, `cssClass`) e il
//     contesto le porta in `tabs`;
//   - la linea: `system.gamesystem` (dallo spcType) entra fra le classi delle
//     opzioni a ogni contesto, e a ogni render la finestra prende la classe
//     della linea (vampire, hunter, werewolf, altrimenti mortal) e perde le altre.
const LINEE = Object.freeze({ vampire: "vampire", ghoul: "vampire", hunter: "hunter", werewolf: "werewolf", spirit: "werewolf" });

/** La linea di un attore spc, come la calcola il sistema in actor.js. */
export function lineaDelSistema(actor) {
  return LINEE[actor?.system?.spcType] ?? "mortal";
}

export class SPCActorSheet {
  static DEFAULT_OPTIONS = {};
  static PARTS = {};

  static async onSubmitActorForm(event) {
    const target = event.target;
    if (target.tagName !== "INPUT") return this.actor.update({ [target.name]: target.value });
    let value = target.value;
    if (target.type === "number") value = parseInt(target.value);
    else if (target.type === "checkbox") value = target.checked;
    return this.actor.update({ [target.name]: value });
  }

  tabGroups = { primary: "stats" };

  tabs = {};

  constructor(options = {}) {
    this.options = options;
    this.options.classes ??= [];
    this.document = options.document;
    this.actor = options.document;
    this.element = null;
    this.renders = [];
    this.position = {};
  }

  get token() {
    return this.options.token ?? this.actor?.token ?? null;
  }

  getTabs() {
    const tabs = this.tabs;
    for (const key in tabs) if (tabs[key].hidden) delete tabs[key];
    for (const tab of Object.values(tabs)) {
      tab.active = this.tabGroups[tab.group] === tab.id;
      tab.cssClass = tab.active ? "active" : "";
    }
    return tabs;
  }

  _initializeApplicationOptions(options) { return { ...options }; }
  async _renderFrame() { return null; }

  async _prepareContext() {
    this.options.classes.push(lineaDelSistema(this.actor));
    return { tabs: this.getTabs(), locked: this.actor?.isOwner ? Boolean(this.actor?.system?.locked) : true, isOwner: Boolean(this.actor?.isOwner) };
  }

  async _preparePartContext(_partId, context) { return context; }

  _onRender() {
    const classi = this.element?.classList;
    if (!classi) return;
    const linea = lineaDelSistema(this.actor);
    classi.remove(...["vampire", "hunter", "werewolf", "mortal"].filter((altra) => altra !== linea));
    classi.add(linea);
  }

  async render(options = {}) { this.renders.push(options); return this; }
}
