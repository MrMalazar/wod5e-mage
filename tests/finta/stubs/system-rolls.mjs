export class WOD5eRoll {
  constructor(formula, data, options) { this.formula = formula; this.data = data; this.options = options; }
  async roll() {
    const [basic, reds] = this.formula.split(" + ").map((part) => Number.parseInt(part, 10));
    const faces = globalThis.__sim.faces ?? [];
    let cursor = 0;
    const take = (n) => Array.from({ length: n }, () => ({ result: faces[cursor++] ?? 1, active: true }));
    this.basicDice = { results: take(basic) };
    this.advancedDice = { results: take(reds) };
    globalThis.__sim.rolls.push({ formula: this.formula, options: this.options });
    return this;
  }
  async toMessage(data, opts) {
    const message = { ...data, rollMode: opts.rollMode, total: this._total, flavor: this.options.flavor, getFlag: (scope, key) => data.flags?.[scope]?.[key] };
    globalThis.__sim.messages.push(message);
    return message;
  }
}
