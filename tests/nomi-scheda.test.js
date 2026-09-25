import assert from "node:assert/strict";
import { NOMI_SCHEDA_SETTING, registraNomiScheda, ridisegnaCartellini, testoCartellino } from "../scripts/nomi-scheda.js";

// Il testo: il nome della scheda; senza attore, il nome del token con la nota.
assert.equal(testoCartellino({ name: "Mortale (4)", actor: { name: "Sahajiya - Vasco" } }), "Sahajiya - Vasco");
assert.equal(testoCartellino({ name: "Zefiro", actor: { name: "Zefiro" } }), "Zefiro");
assert.equal(testoCartellino({ name: "Damocle", actor: null }), "Damocle (senza scheda)");
assert.equal(testoCartellino({ name: "Damocle", actor: null }, "no sheet"), "Damocle (no sheet)");
assert.equal(testoCartellino({ name: "Damocle", actor: null }, ""), "Damocle");
// Una scheda senza nome lascia quello del token; niente token, niente spazi appesi.
assert.equal(testoCartellino({ name: "Ombra", actor: { name: "" } }), "Ombra");
assert.equal(testoCartellino({ actor: null }), "(senza scheda)");
assert.equal(testoCartellino(undefined), "(senza scheda)");

// Una Foundry finta: gli hook, l'utente, le impostazioni, la scena.
const hooks = {};
globalThis.Hooks = {
  on(name, fn) { (hooks[name] ??= []).push(fn); return hooks[name].length; },
  once(name, fn) { (hooks[name] ??= []).push(fn); return hooks[name].length; }
};
const valori = new Map();
const registrate = new Map();
globalThis.game = {
  user: { isGM: true },
  i18n: { localize: (key) => (key === "WOD5E_MAGE.NomiScheda.SenzaScheda" ? "senza scheda" : key) },
  settings: {
    register(mod, key, cfg) {
      registrate.set(`${mod}.${key}`, cfg);
      if (!valori.has(`${mod}.${key}`)) valori.set(`${mod}.${key}`, cfg.default);
    },
    get(mod, key) {
      if (!registrate.has(`${mod}.${key}`)) throw new Error(`${mod}.${key} non registrata`);
      return valori.get(`${mod}.${key}`);
    },
    set(mod, key, value) {
      valori.set(`${mod}.${key}`, value);
      registrate.get(`${mod}.${key}`).onChange?.(value);
    }
  }
};

function token(name, actorName, actorId) {
  const giri = [];
  return {
    document: { name, actorId, actor: actorName === null ? null : { name: actorName } },
    nameplate: { text: name, visible: false, destroyed: false },
    renderFlags: { set: (flags) => giri.push(flags) },
    giri
  };
}
const vasco = token("Mortale (4)", "Sahajiya - Vasco", "a1");
const rham = token("Rham", "Sahajiya - Rham", "a2");
const orfano = token("Damocle", null, "a3");
globalThis.canvas = { tokens: { placeables: [vasco, rham, orfano] } };

registraNomiScheda();
assert.ok(hooks.setup && hooks.refreshToken && hooks.updateActor && hooks.deleteActor);
const giro = (t) => hooks.refreshToken.forEach((fn) => fn(t, {}));

// Prima del setup il giro non tocca niente: l'impostazione non c'è ancora.
giro(vasco);
assert.deepEqual([vasco.nameplate.text, vasco.nameplate.visible], ["Mortale (4)", false]);

// Il Narratore: impostazione fra le sue, accesa di partenza, per client.
hooks.setup.forEach((fn) => fn());
const cfg = registrate.get(`wod5e-mage.${NOMI_SCHEDA_SETTING}`);
assert.deepEqual([cfg.scope, cfg.config, cfg.type, cfg.default], ["client", true, Boolean, true]);

giro(vasco);
giro(orfano);
assert.deepEqual([vasco.nameplate.text, vasco.nameplate.visible], ["Sahajiya - Vasco", true]);
assert.deepEqual([orfano.nameplate.text, orfano.nameplate.visible], ["Damocle (senza scheda)", true]);

// La scheda rinominata: si ridisegnano solo i suoi token.
hooks.updateActor.forEach((fn) => fn({ id: "a2" }, { name: "Sahajiya - Rham il Vecchio" }));
assert.equal(rham.giri.length, 1);
assert.equal(vasco.giri.length, 0);
hooks.updateActor.forEach((fn) => fn({ id: "a2" }, { img: "x.webp" }));
assert.equal(rham.giri.length, 1);

// Spenta: tutti i token si ridisegnano e il giro di Foundry resta il suo.
game.settings.set("wod5e-mage", NOMI_SCHEDA_SETTING, false);
assert.ok([vasco, rham, orfano].every((t) => t.giri.at(-1)?.refreshNameplate && t.giri.at(-1)?.refreshState));
rham.nameplate.text = "Rham";
rham.nameplate.visible = false;
giro(rham);
assert.deepEqual([rham.nameplate.text, rham.nameplate.visible], ["Rham", false]);
game.settings.set("wod5e-mage", NOMI_SCHEDA_SETTING, true);
giro(rham);
assert.equal(rham.nameplate.text, "Sahajiya - Rham");

// Un cartellino già distrutto non si tocca.
const via = token("Via", "Scheda", "a4");
via.nameplate.destroyed = true;
giro(via);
assert.equal(via.nameplate.text, "Via");

// Il giocatore: niente cambia, e l'impostazione non compare fra le sue.
game.user.isGM = false;
hooks.setup.forEach((fn) => fn());
assert.equal(registrate.get(`wod5e-mage.${NOMI_SCHEDA_SETTING}`).config, false);
const suo = token("Leonardo Rizzo", "\"Stallman\" Leonardo Rizzo", "a5");
giro(suo);
assert.deepEqual([suo.nameplate.text, suo.nameplate.visible], ["Leonardo Rizzo", false]);

// Il ridisegno per attore salta gli altri.
const prima = vasco.giri.length;
ridisegnaCartellini("a2");
assert.equal(vasco.giri.length, prima);

console.log("nomi-scheda: ok");
