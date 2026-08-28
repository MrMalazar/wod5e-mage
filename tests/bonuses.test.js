import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { BONUS_KINDS, onBonusAdd, onBonusDelete, prepareBonuses } from "../scripts/bonuses.js";

globalThis.foundry = { utils: { randomID: () => "row1" } };
globalThis.ui = { notifications: { warn() {} } };
globalThis.game = { i18n: { format: (key) => key, localize: (key) => key } };

function mageActor(flags = {}, { owner = true, locked = false } = {}) {
  return {
    isOwner: owner,
    name: "Mage",
    system: { locked },
    getFlag(_moduleId, key) {
      return flags[key];
    },
    async setFlag(_moduleId, key, value) {
      this.lastFlag = { key, value };
    },
    async update(data) {
      this.lastUpdate = data;
    }
  };
}

// Senza flag, nessuna riga.
assert.deepEqual(prepareBonuses(mageActor()), []);

// Le righe tornano con numero intero, il tipo in tendina e la descrizione.
const rows = prepareBonuses(mageActor({
  bonuses: {
    a: { value: "3", kind: "dice", description: "tiri di Forza" },
    b: { value: -1.7, kind: null },
    c: { value: "niente" }
  }
}));
assert.equal(rows.length, 3);
assert.equal(rows[0].value, 3);
assert.equal(rows[0].kind, "dice");
assert.equal(rows[0].description, "tiri di Forza");
assert.deepEqual(rows[0].kinds.map((kind) => kind.id), [...BONUS_KINDS]);
assert.equal(rows[0].kinds.find((kind) => kind.id === "dice").selected, true);
assert.equal(rows[1].value, -1);
assert.equal(rows[1].kind, "");
assert.equal(rows[2].value, 0);

// Il + aggiunge una riga vuota a +1, con un id nuovo.
let actor = mageActor({ bonuses: { a: { value: 2, kind: "", description: "" } } });
await onBonusAdd.call({ actor }, { preventDefault() {} });
assert.deepEqual(actor.lastFlag, {
  key: "bonuses",
  value: {
    a: { value: 2, kind: "", description: "" },
    row1: { value: 1, kind: "", description: "" }
  }
});

// Il cestino toglie solo la riga scelta, con la sintassi -= di Foundry.
await onBonusDelete.call({ actor }, { preventDefault() {} }, { dataset: { row: "a" } });
assert.deepEqual(actor.lastUpdate, { "flags.wod5e-mage.bonuses.-=a": null });

// Una riga inesistente non produce aggiornamenti.
actor = mageActor({ bonuses: {} });
await onBonusDelete.call({ actor }, { preventDefault() {} }, { dataset: { row: "zzz" } });
assert.equal(actor.lastUpdate, undefined);

// Scheda bloccata o senza permessi: niente scritture.
actor = mageActor({}, { locked: true });
await onBonusAdd.call({ actor }, { preventDefault() {} });
assert.equal(actor.lastFlag, undefined);
actor = mageActor({}, { owner: false });
await onBonusAdd.call({ actor }, { preventDefault() {} });
assert.equal(actor.lastFlag, undefined);

// Il template: numero, tipo in tendina, descrizione a mano.
const template = readFileSync(new URL("../templates/actor/parts/bonuses.hbs", import.meta.url), "utf8");
assert.match(template, /type="number"[^>]*name="flags\.wod5e-mage\.bonuses\.\{\{row\.id\}\}\.value"/);
assert.match(template, /<select name="flags\.wod5e-mage\.bonuses\.\{\{row\.id\}\}\.kind"[\s\S]*row\.kinds/);
assert.match(template, /name="flags\.wod5e-mage\.bonuses\.\{\{row\.id\}\}\.description"/);
assert.match(template, /data-action="bonusAdd"[\s\S]*data-action="bonusDelete"/);

console.log("Bonus tests passed.");
