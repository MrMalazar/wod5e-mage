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
opens with its M6 sigil, gold on the sheet's dark ground. Clicking Areté opens the Magick roll dialog
(branch A of the September 2026 playtest): the pool is Attribute + Skill +
Skill, any one of them is enough and the chosen ones add up; Areté never
rolls. Areté enters as the prize of the
description (a checkbox worth as many extra dice as Areté, outside the +3
cap, never for Hybrid Magick; since 27 September 2026 the prize adds dice
and no longer lowers the threshold), Harmony is a plain number of dice the
other Mages grant (counted at the table), and Harmony and every positive
modifier share a +3 cap that the confirmation dialog enforces. Every unlocked Sphere shows its dots and
the player clicks the level used; the seven Scopes (Targets, Conditions,
Duration, Impact, Range, Potency, Precision) each show seven dots for their
level, and an icon beside the Scopes header opens the Scopes table for
reference. Since the table of 23 September 2026 every Scope reads through
two lenses (Effect or Area, Malus or Complexity, game or world time, Epicness
or Information, fight or narrative, Damage or Weight) on a scale from 0 to
7: 0 is the free base, each level is worth its number, the threshold is the
sum of the levels used, at most three Scopes rise above 0 in one casting,
and an impossible feat takes +5 after the count. A Scope covered by a Sphere
Speciality counts as the lower of the Sphere and the Scope. When the pool
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
(seven Scopes, two lenses each, over the levels 0 to 7 with the 0 column
shaded; Damage reads as Areté plus a number per level, drawn as the Areté
sigil and the number; game Duration carries the time symbols, world Duration
and Area a symbol per cell, Targets the person icon; every cell explains
itself on hover with the guide's "what it means" and examples). Every
Sphere Speciality sits in its own box with a narrow dark drop-down. There is no Affinity Sphere any more: at the third dot of a Sphere the
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
dice, and each value is capped at ±3. Specialties sit in a line under each
Skill, on the first page (where the chevron at the end of the Skill row opens
and closes the line, and counts the written ones; a row whose Specialty is in
the Roll box starts open) and in the creation wizard: every Specialty is a pill
(click to roll with it, × to remove it) and, while a slot is free (one at the
first dot, two at the third, three at the fifth), a dashed box writes a new
one, typed or picked from the six catalogue suggestions, on Enter; there is no
dialog. They write the same `bonuses` entries the system's Skill editor
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
poured into the Sphere rows until the first save. Wisdom shows its state
(Marked, On the edge, Cracked, Steady, Clear, Serene: computed from the clean
boxes, never typed) in a box beside its name in the Resources of the first
page; the Compass page has no Status box, it holds Identity and Convictions on
the left and the Anchors, with expandable notes, on the right. The right
column lists only the Spheres currently selected in Magick, with a separate
rich-text note for each.
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

## Formulas page

The Formulas page has two full-width columns that stay within the sheet's
height: each column scrolls on its own, with its title, search box and Sphere
filter fixed at the top. On the left, the 48 Formulas the character's Spheres
open (a button shows all of them), each row the same matrix as the Grimoire
dialog, with the Access Sphere, the Amalgams and the threshold chosen by
buttons; "Write among the effects" saves it as a Magick effect, "Cast from
the Roll box" loads it into the Roll box on the first page with its values.
Row titles share one fixed column, so every description starts and ends at
the same vertical line. On the right, the player's Magick effects, one
collapsible card each, grouped by Sphere and in name order: closed, the card
keeps the name and the Goal; the die loads the effect into the Roll box the
same way. Both columns filter on the spot by text and by Sphere (the row of
sigils shows the Spheres that appear in the list; "All" clears it). Scope
selectors show eight dots everywhere: the first is level 0, the base effect,
always lit and never clickable; hovering it reads the base of the Scope (the
chosen lens, or every lens with its name).

## Narrator's Board

"New session" on the Narrator's Board opens no dialog: since 27 September
2026 it turns the Board into a session page that takes the place of the mode
in use, with the mages on the Board in short (portrait, name, who plays
them, a × to remove one), a drop area for the mages still missing (drag them
from the Actors sidebar, as in the Players mode), the first scene, the place
and Start; Cancel goes back to the previous mode. Start refuses with an
empty Board and warns. The old dialog that ticked characters is gone.

## Enemy sheet (M6)

The module registers a second sheet for the system's `spc` actors, "Scheda
del nemico (M6)": pick it from the actor's sheet configuration (the cog on
the window), or make it the default for the type from there. It is not the
default on its own. The header stays on every page: portrait (the + changes
it, and the same file goes on the map), name, concept, Nature and Faction;
on the right the Health track of the mage sheet with its wheel (damage, rest,
reset), the armour points of the protection worn, and the Conditions with
their malus (the × removes one, the drawer adds any of the list). A coloured
line on top follows the disposition of the prototype token: hostile, neutral,
friendly, secret. Below, four pages. "In gioco" has three cards, Physical,
Social and Mental: on the left the threshold, the dice the enemy takes from a
character acting against them; on the right the pool the enemy rolls, taken
from the system's standard pools and already scaled by the active Conditions;
under them the cases (a threshold or a pool for one specific thing, the
system's exceptional pools included). Then the Actions, one row each: name,
what it does, the pool it starts from and the die that rolls it, with the
inline editor opened by the name; a weapon in the inventory brings its own
action (damage, range, aggravated), and an action without a roll has "Usa".
Then the Effects, what the enemy has without rolling, written by hand or
taken from the mages' powers catalogue. "Magick" appears only when switched
on: Areté, Domains and Type in the strip; every effect is a threshold the
character resists or beats, with the trait pair it resists with; effects
come from the Grimoire drawer (the Formulas the Domains open, with the base
threshold of each) or from the hand drawer (name, what it does, resistance,
Domain and type, the eight dots of every Scope with their lens, the threshold
summed as on the mage sheet, the damage of Potency). "Oggetti" lists weapons,
protections and gear, with the compendium, the create button and "Give to a
character", which moves the item to a character's sheet. "Note" holds "what
they want now", "when they give up" and the biography, for the Narrator
only. Rolls go to chat as the mage's dice with the pool, the threshold and
the outcome, and a button applies damage and Condition to the targeted
character; a Magick cast puts its threshold in chat with "Resisti", which
opens the target's sheet with the roll box loaded (attribute, skill and
difficulty). Active actions with a limit switch off at the end of the
enemy's combat turn. The pure logic is in `scripts/nemico.js`, with tests
in `tests/nemico.test.js` and a fake-Foundry scenario in
`tests/finta/nemico.mjs`; `NEMICO_PAGINA=<dir>` writes the pages as HTML for
screenshots.

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

## Guided creation

Since 1.4.0 the sheet has a wand button in its title bar (and a new Mage opens it
by itself): the guided creation, a separate window in the spirit of the Roll20
D&D 5e charactermancer. Fourteen steps in the order of 5 September 2026 (Creed,
Family, Subfamily, Compass, Magick Type, Concept and Challenge, Spheres,
Instruments, Arete, Attributes, Skills, Advantages, Touchstones, final check),
each with the same three blocks: what you choose (cards with the image), why
(a few lines from the book, which the Storyteller can rewrite with the text
editor for the whole world, `guidaTesti` setting) and what you get (the
numbers that change on the sheet). Every click writes on the actor at once, the
sheet behind stays live, and the window reopens at the step it was on
(`flags.wod5e-mage.creazione.guidata.passo`). Family images are read from
`assets/immagini/famiglie/` when present (see the LEGGIMI there); until then the
cards show a placeholder.

