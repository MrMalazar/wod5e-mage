// La scheda spc del sistema, finta: quanto basta alla scheda del nemico (1/10).
// Il form è quello del sistema (wod-actor-base.js): di un INPUT scrive solo il
// campo cambiato, e un numero lo legge con parseInt.
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

  constructor(options = {}) {
    this.options = options;
    this.document = options.document;
    this.actor = options.document;
    this.element = null;
    this.renders = [];
    this.position = {};
  }

  get token() {
    return this.options.token ?? this.actor?.token ?? null;
  }

  _initializeApplicationOptions(options) { return { ...options }; }
  async _renderFrame() { return null; }
  async _prepareContext() { return { tabs: {} }; }
  async _preparePartContext(_partId, context) { return context; }
  _onRender() {}
  async render(options = {}) { this.renders.push(options); return this; }
}
