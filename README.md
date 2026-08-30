# Mage for World of Darkness 5e

An early-stage Foundry VTT module that adds Mage support to the community
`wod5e` game system.

## Compatibility

- Foundry Virtual Tabletop 14
- World of Darkness 5e (`wod5e`) 5.3.1 or newer

## Development installation

Place or link this directory at:

```text
<Foundry user data>/Data/modules/wod5e-mage
```

Restart Foundry, enable the module in a world that uses `wod5e`, and reload the
world. Run `npm run check` to validate the JavaScript and module manifest.

PNG assets are organized under `assets/icons` by purpose: Mage sheet, general
UI, chat dice, roll-dialog dice, and Dice So Nice textures. See the README in
that directory for naming conventions and module-relative paths.

## Public API

The API is available after Foundry's `init` hook:

```js
const mage = game.modules.get("wod5e-mage").api;

await mage.setMage(actor, true);
mage.isMage(actor);
```

Mage status is stored as a Foundry flag, so existing `wod5e` actors can be
extended without changing their document type or migrating their system data.

## Creating a Mage

Create a new Actor from the Actors directory and select `mortal`. The creation
dialog displays an additional Sheet field:

- `Mortal` uses the native `wod5e` mortal sheet.
- `Mage` uses this module's Mage sheet.

The Mage sheet currently inherits the complete mortal sheet without replacing
any native system file. It adds a Magick tab with the nine Mage: The Ascension
Spheres and ratings from zero to five. Sphere values are stored in module flags.
The Traits page hosts the Wheel widget full-width under the Skills, with the
two persistent fields (generated Quintessence, permanent Paradox) inside it
and an Areté rating from one to five below. Every Attribute and Skill row
opens with its M5 sigil, gold on the sheet's dark ground. Clicking Areté opens separate Attribute and Skill
selectors containing every available trait, including custom system definitions,
and rolls the static Areté rating plus both selected traits. Coincidental,
vulgar, and vulgar with witnesses are independent roll options and do not apply
a dice penalty at this stage.
The Sphere area uses the nine module-provided icons with WoD5e's native resource-dot
selectors. Only selected Spheres are listed below; hiding a Sphere preserves its
dot rating. Each listed Sphere displays its Influence description for ratings one
through five, and the leftmost empty marker returns a Sphere to zero. Scopes
are free for everyone (no Sphere unlocks or forbids one): the Traits page shows
no Scope counters at all — the Magick tab ends with the "Spending Extra
Successes" table (six Scopes, seven steps) with the Affinity Gift row
highlighted, and the Gift's automatic successes equal the Affinity Sphere's
own rating. In the right side panel, under Custom Rolls, a small Bonuses
table (number, type, description) lets the player note reminders such as
"+3 · Forces Scope"; rows are stored in module flags and never touch the
dice. The right
column of the Magick tab also provides a dynamic ongoing-Magick journal: it starts empty, lets the
player add or remove rows, and stores its three descriptive text fields in module
flags without affecting rolls.
The separate Concept Challenge tab contains three groups of guided character
questions. Its 21 compact three-line text areas save automatically to module
flags and do not affect any roll.
The Focus tab stores Paradigm, the Practice split into Form (Magick,
Technomagick, Hybrid Magick) plus name, and six Instrument slots, one per family
seven regardless of Arete; each slot pairs a family drop-down (the six
families of the M5 manual) with the free-text detail. Wisdom sits as a box at
the top of the left column and, when its track is full, shows the Marked
effects beside it. The right column lists only the Spheres currently selected
in Magick, with a separate rich-text note for each.
The Mage header groups Health and Willpower on the left. Wisdom has an
adjustable damage track and can be rolled using its undamaged boxes as the pool.
The Magick tab also contains a shared nine-cell Magick track. Quintessence fills
it from the left and Paradox fills it from the right, with both values stored in
module flags. Plus fills an available cell immediately. On a full track, Plus
first removes one cell from the opposing side; the following Plus can then fill
that empty cell from the selected side. No contested or pending state is stored,
and Minus always removes one cell immediately. This play resource remains
editable while the sheet is locked.

Only Areté rolls use Paradox dice. The current number of purple Paradox cells
replaces the same number of normal dice in the Areté pool, capped by the pool
size, in the same way that Hunger replaces normal Vampire dice. Paradox dice
have their own `paradox-dice` chat class and a purple Dice So Nice preset.
Existing mortal Actors can also select it through Foundry's standard sheet
configuration.

Dice rendered in chat for Mage Actors use the module-specific `mage-dice` CSS
class instead of the native `mortal-dice` class. The replacement happens only
at render time, leaving the native WoD5e dice registry and Mortal rolls intact.

## Planned implementation layers

1. Define the target Mage rules and actor data stored in module flags.
2. Add a Mage actor sheet that extends the `wod5e` mortal sheet.
3. Add reusable Item documents for magical traits and effects.
4. Implement dice pools and chat cards through the `wod5e` roll API.
5. Add compendiums only for content that can legally be distributed.

The Belongings page pairs the character's Backgrounds, Merits and Flaws with
the inventory, and adds two free tables — Shared Elements (with other
players) and Story Elements (gained in play, possibly temporary) — each row
a type, a name and a dot rating, stored in module flags. The Character page
uses the same collapsible layout as the Concept Challenge: allegiance,
Concept and Chronicle with described Ambition and Desire ("when it
triggers"), then free-slot Anchors and Convictions (usually three each, plus
and minus at will), every Conviction tied to one of the seven catalogue
groups.

This project does not include copyrighted game text or artwork.
