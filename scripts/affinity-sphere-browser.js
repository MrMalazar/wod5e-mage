import {
  AFFINITY_SPHERE_FLAG,
  affinitySphereFromItem,
  getAffinitySpherePackId
} from "./affinity-sphere-data.js";
import { MODULE_ID } from "./constants.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

function normalizeSearch(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase()
    .trim();
}

function warnCannotEdit(actor) {
  if (!actor.isOwner) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.NoSufficientPermission", {
        string: actor.name
      })
    );
    return true;
  }

  if (actor.system.locked) {
    ui.notifications.warn(
      game.i18n.format("WOD5E.Notifications.CannotModifyResourceString", {
        string: actor.name
      })
    );
    return true;
  }

  return false;
}

async function onSelectAffinitySphere(event, target) {
  event.preventDefault();
  const actor = this.actor;
  if (warnCannotEdit(actor)) return;

  const item = await fromUuid(target.dataset.uuid);
  const sphere = affinitySphereFromItem(item);
  if (!sphere) return;

  await actor.setFlag(MODULE_ID, AFFINITY_SPHERE_FLAG, {
    id: sphere.id,
    uuid: sphere.uuid
  });

  await this.close();
  actor.sheet?.render?.();
}

export class AffinitySphereBrowser extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: "wod5e-mage-affinity-sphere-browser",
    tag: "div",
    window: {
      icon: "fa-solid fa-magnifying-glass",
      title: "WOD5E_MAGE.AffinitySphere.BrowserTitle",
      resizable: true
    },
    classes: [
      "wod5e",
      "wod5e-mage",
      "mage",
      "dialog-app",
      "wod5e-mage-affinity-browser"
    ],
    position: {
      width: 620,
      height: 520
    },
    actions: {
      selectAffinitySphere: onSelectAffinitySphere
    }
  };

  static PARTS = {
    body: {
      template: `modules/${MODULE_ID}/templates/dialogs/affinity-sphere-browser.hbs`,
      scrollable: [".wod5e-mage-affinity-results"]
    }
  };

  constructor(actor, options = {}) {
    super({
      ...options,
      id: `wod5e-mage-affinity-sphere-browser-${actor.id}`
    });
    this.actor = actor;
  }

  async _prepareContext() {
    const context = await super._prepareContext();
    const pack = game.packs.get(getAffinitySpherePackId());

    if (!pack) {
      return {
        ...context,
        affinitySpheres: [],
        packMissing: true
      };
    }

    const documents = await pack.getDocuments();
    const affinitySpheres = documents
      .map(affinitySphereFromItem)
      .filter(Boolean)
      .sort((left, right) => left.name.localeCompare(
        right.name,
        game.i18n.lang,
        { sensitivity: "base" }
      ))
      .map((sphere) => ({
        ...sphere,
        searchName: normalizeSearch(sphere.name)
      }));

    return {
      ...context,
      affinitySpheres,
      packMissing: false
    };
  }

  async _onRender() {
    const input = this.element.querySelector("[data-role=affinity-search]");
    const results = [...this.element.querySelectorAll(".wod5e-mage-affinity-result")];
    const noResults = this.element.querySelector("[data-role=affinity-no-results]");
    if (!input) return;

    const filter = () => {
      const query = normalizeSearch(input.value);
      let visible = 0;

      for (const result of results) {
        const matches = !query || result.dataset.search.includes(query);
        result.hidden = !matches;
        if (matches) visible += 1;
      }

      if (noResults) noResults.hidden = visible > 0;
    };

    input.addEventListener("input", filter);
    input.focus();
    filter();
  }
}
