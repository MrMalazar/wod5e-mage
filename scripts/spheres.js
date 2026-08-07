export const SPHERES = Object.freeze([
  "correspondence",
  "entropy",
  "forces",
  "life",
  "matter",
  "mind",
  "prime",
  "spirit",
  "time"
]);

export function prepareSpheres(actor) {
  const values = actor.getFlag("wod5e-mage", "spheres") ?? {};

  return SPHERES.map((id) => ({
    id,
    label: `WOD5E_MAGE.Spheres.${id}`,
    value: Math.min(Math.max(Number(values[id]) || 0, 0), 5)
  }));
}
