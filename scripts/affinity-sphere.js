import { AffinitySphereBrowser } from "./affinity-sphere-browser.js";
import { AFFINITY_SPHERE_FLAG } from "./affinity-sphere-data.js";
import { MODULE_ID } from "./constants.js";

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

export function onAffinitySphereOpen(event) {
  event?.preventDefault?.();
  if (warnCannotEdit(this.actor)) return;

  new AffinitySphereBrowser(this.actor).render(true);
}

export async function onAffinitySphereClear(event) {
  event?.preventDefault?.();
  if (warnCannotEdit(this.actor)) return;

  await this.actor.unsetFlag(MODULE_ID, AFFINITY_SPHERE_FLAG);
}
