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
The Traits page is a six-cell grid: Attributes beside Conditions, Skills
beside Specialties, the Wheel beside Bonuses (the system's Custom Rolls panel
is gone). The Wheel carries the two persistent fields (generated
Quintessence, permanent Paradox) and the Areté rating from one to five. Every Attribute and Skill row
opens with its M5 sigil, gold on the sheet's dark ground. Clicking Areté opens the Magick roll dialog
(branch A of the September 2026 playtest): the pool is Attribute + Skill +
Skill, any one of them is enough and the chosen ones add up; Areté never
rolls. Areté enters as the prize of the
description (a checkbox worth as many dice as Areté, never for Hybrid Magick),
Harmony is a plain number of dice the other Mages grant (counted at the
table), and prize, Harmony and every positive modifier share a +3 cap that
the confirmation dialog enforces. Every unlocked Sphere shows its dots and
the player clicks the level used; the six Scopes each show seven dots for
their level, and an icon beside the Scopes header opens the Scopes table for
reference. The threshold is the higher of the highest Sphere and the
highest Scope, +1 per Scope beyond the first, +1 with three or more Spheres,
capped at 7; a Scope covered by a Sphere Speciality counts as the lower of
the Sphere and the Scope and does not weigh as an extra Scope. When the pool
is at least twice the threshold the victory is automatic: coincidental
Magick posts a chat card with no dice, vulgar Magick rolls only the Paradox
dice and the card states the Burn (equal to the threshold). A roll short of
the threshold by at most Areté successes is flagged "one step short".
Coincidental, vulgar and vulgar with witnesses move the Wheel toward Paradox
before the roll.
The Sphere area uses the nine module-provided icons with WoD5e's native resource-dot
selectors. Only selected Spheres are listed below; hiding a Sphere preserves its
dot rating. Each listed Sphere displays its Influence description for ratings one
through five, and the leftmost empty marker returns a Sphere to zero. Scopes
are free for everyone (no Sphere unlocks or forbids one): the Traits page shows
no Scope counters at all — the Magick tab ends with "The Scopes" table
(seven Scopes, Precision included, over seven levels; Potency reads as damage
per level with the damage mark: 0, 2, 5, 7, 8, 10, 13; Duration has two rows,
play time and narrative time, and the caster says which one the effect runs
on; Targets carry the person icon). There is no Affinity Sphere any more: at the third dot of a Sphere the
player picks one Sphere Speciality among the four passive powers the Spheres
compendium lists for it (Perception, Resistance, Innate Defence and the
Sphere's own Scope or track), and the fourth and fifth dots each grant
another slot; the choices live in module flags, a power taken in one slot is
disabled in the others, and each chosen power's text is shown under its
drop-down. Each Sphere row also carries a house toggle marking it as a
"family Sphere" (opened by Family, Subfamily and Creed): the Experience page
prices family Spheres lower than outside Spheres. The module also patches
the system's Italian "Successo di" / "Fallimento di" labels, which lacked the
margin placeholder. In the right side panel, under Custom Rolls, a small Bonuses
table (number, type, description) lets the player note reminders such as
"+3 · Forces Scope"; rows are stored in module flags and never touch the
dice, and each value is capped at ±3. Above the Bonuses, a Specialties panel
lists every Skill specialty with a + to add one (Skill and name) and a bin to
remove it; it writes the same `bonuses` entries the system's Skill editor
writes, so the S marker and the roll modifiers keep working. The Skills
header carries a + that adds a whole Specific Skill (name and dots, stored in
module flags) under the "Specific Skills" title; these skills roll from the
sheet and appear in every roll dialog, entering the pool as flat dice. The right
column of the Magick tab also provides a dynamic ongoing-Magick journal: it starts empty, lets the
player add or remove rows, and stores its three descriptive text fields in module
flags without affecting rolls.
The separate Concept Challenge tab contains three groups of guided character
questions. Its 21 compact three-line text areas save automatically to module
flags and do not affect any roll.
The Creed tab (branch A of the September 2026 playtest) stores the Creed as a
drop-down of the twelve manual Creeds plus a free-text line, the Type of Magick
(Magick, Technomagick, Hybrid Magick) and the Instruments for Magick: one row
per unlocked Sphere, each pairing one of the twenty-two Instruments (grouped by
the five families: Object, Word, Machine, Substance, Body) with the player's
own specific detail, and a trade field for the two "trade" Instruments. The
Type disables the families it cannot use (Machine is Technomagick only, Word
and Body are Magick only, Hybrid takes all); the same Instrument on two
Spheres is allowed and flagged. The six family slots of older sheets are
poured into the Sphere rows until the first save. Wisdom sits as a box at
the top of the left column and, when its track is full, shows the Marked
effects beside it. The right column lists only the Spheres currently selected
in Magick, with a separate rich-text note for each.
The Mage header carries a single Health track (branch A): 1 + Stamina +
Resolve boxes, adjustable with plus and minus, holding physical damage (/
superficial, X aggravated) and mental damage (o superficial, ◎ aggravated).
Left click opens a small vertical five-glyph menu at the pointer (the four
marks or empty), right click clears the box; the counts live in module flags and the system's Health and
Willpower partials are no longer shown, since Willpower is gone from the
rules (the Experience page no longer prices it). A two-line legend explains
the physical and mental marks. "New session" heals every mental superficial
box, removes one physical superficial box and re-arms "Deny the Backlash";
"Reset" empties the track. "New session" first asks for the session's
experience points, which land among the Gains of the Experience page. A full track reads "Impaired"; a track of
aggravated boxes reads KO, death if physical damage prevails, coma or shock
if mental does. Wisdom has an adjustable damage track and can be rolled
using its undamaged boxes as the pool. Next to Areté, "Deny the Backlash"
marks one mental aggravated box, raises the Wheel by three and locks itself
until the next "New session".
The Traits tab contains the shared nine-cell Wheel. Quintessence fills it
from the left and Paradox fills it from the right, with both values stored in
module flags. Plus fills an available cell immediately. On a full track, Plus
first removes one cell from the opposing side; the following Plus can then fill
that empty cell from the selected side. No contested or pending state is stored,
and Minus always removes one cell immediately. Permanent Paradox is the floor
of the Wheel: its cells are drawn apart, Minus never goes below them and
Quintessence never takes them. This play resource remains editable while the
sheet is locked.

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
