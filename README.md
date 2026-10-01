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
the player clicks the level used; the six Scopes (Targets, Conditions,
Duration, Range, Potency, Precision) each show seven dots for their
level, and an icon beside the Scopes header opens the Scopes table for
reference. Since the table of 23 September 2026, reworked on 29 September
(Impact removed; Information moved to Precision; Influence and Benefit added),
every Scope reads through two or three lenses (Effect or Area; Malus,
Complexity or Benefit; game or world time; fight or narrative Range; Damage,
Weight or Influence; fight, narrative or Information Precision) on a scale from 0 to
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
(six Scopes, two or three lenses each, over the levels 0 to 7 with the 0 column
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

## The Roll box

Since 1 October 2026 (1.32.0, from Blue's approved mock in
`docs/mock_tiro_1-10.html`; the 1.31.0 box of 30 September is in
`docs/mock_tiro_30-9.html`) the Roll box on the first page reads in two
columns that each end with a single number, the total, with minus and plus.
The header names the kind of roll in words and, for Magick, shows the Sphere
in play with its sigil on a gold disc (and the Grimoire spell, if any):
they weigh on nothing and are removed with their ×. The Pool column lists
what gives dice, each row with the symbol it has on the sheet (the Attribute
and Skill sigils, the Specialty indented under its Skill, the Areté prize
with its checkbox, the power with its Sphere sigil, Traits with their icon,
Conditions with the family icon and grade, subtracting); its total includes
the adjustment, which the minus and plus change freely, and a small pen says
by how much. In a Magick roll the Threshold column always lists the six
Scopes, in alphabetical order: the Scope's icon, the reading of the declared
level in the lens that applies (the one chosen on the sheet, or the first)
and the level; at zero the row is dimmed and reads the base. The Scope's
name, lens and long explanation sit in the tooltip. The minus and plus on
the threshold total raise or lower it above the count of the Scopes, and in
a Skill roll set the whole threshold ("?" until set). One line below gives
the outcome (the dice to roll and the face that succeeds, from 6 or from 8;
"succeeds without rolling" and "the roll fails" take its place), the
Quintessence | Paradox payment pair in the centre (lit gold or red when
chosen), and the "Sforza la realtà" and "Dal Narratore" toggles, all in
words. Then the roll button: ROLL, or the three Magick kinds with their name
only (the price is in the tooltip and on the chat card); disabled, it says
what is missing. Blue's rule for the box: the fewer words, the better. State
in `scripts/tiro.js` (`soglia` is the by-hand addend, `dadi` the pool
adjustment), context in `scripts/tiro-scheda.js` (`righeAmbiti` builds the
six Scope rows).

## Storyteller's verdict on rolls

A roll from the Roll box first goes to every Storyteller connected, not to
one only: each sees a window with the roll as it is (who, what, pool,
threshold, dice) and a five-second countdown, can raise or lower the
threshold or the dice, or press OK; the first answer counts and closes the
others' windows, and when the count runs out the roll goes on as it was.
The card notes what was changed and by whom. The "Dal Narratore" toggle
under the roll button, remembered per client, sends the roll straight to
chat instead; a Storyteller's own roll never waits. Logic in
`scripts/verdetto-narratore.js`, tests in `tests/verdetto-narratore.test.js`.

## Sheet names on tokens

Since 25 September 2026 every token shows the name of its sheet to the
Storyteller, always, as its nameplate: a token called "Mortale (4)" reads
"Sahajiya - Vasco" for a GM. A token whose actor is gone shows its own name
followed by "(senza scheda)". Players see nothing new: their nameplates
follow each token's display setting as before. Nothing is written to the
world; the label is drawn in the GM's client only, and the "Sheet names on
tokens" client setting, shown to GMs only, turns it off. Logic in
`scripts/nomi-scheda.js`, tests in `tests/nomi-scheda.test.js`.

## Narrator's Board

Since 27 September 2026 the Paradox menu on the Board lists its 65 entries in
nine drawers, grouped by what the Paradox bounces on: on the mage, on the
spell, the Sleepers, the Presences, the place, clash and scene, the clocks,
the Anchors, and at the burst (last, set apart by a dashed line). Each drawer
has a coloured square with its icon, its name, a "what you find here" line
and its count, and opens or closes with a click that the client remembers.
With a scene chosen in the dropdown, the entries the rulebook recommends for
that scene carry a gold bar on the left and a gold name; the dropdown never
hides an entry and the search works as before. The families of the data stay
and still drive spending, chat cards, effects worn and clocks.

"New session" on the Narrator's Board opens no dialog: since 27 September
2026 it turns the Board into a session page that takes the place of the mode
in use, with the mages on the Board in short (portrait, name, who plays
them, a × to remove one), a drop area for the mages still missing (drag them
from the Actors sidebar, as in the Players mode), the first scene, the place
and Start; Cancel goes back to the previous mode. Start refuses with an
empty Board and warns. The old dialog that ticked characters is gone.

## Enemy sheet (M6)

The module registers a second sheet for the system's `spc` actors, "Scheda
del nemico (M6)". Since 1.33.0 the "Create Actor" dialog lists the M6 NPC
under the system's types, one entry per Nature ("PNG M6 · Vampiro"): the
actor is born as an `spc` with the enemy sheet and its Nature already set, so
there is no trip through the sheet configuration. An existing `spc` actor
still takes the sheet from its sheet configuration (the cog on the window).
It works from 1.33.1: in 1.33.0 two fields of the dialog were both named
`flags.core.sheetClass`, Foundry read them as a list and opened the default
sheet, for the M6 NPC and for a new Mage alike. The dialog now sends its data
through hidden fields, one per name; what you see (the Mortal/Mage choice, the
M6 entries) carries no name. The Nature of an M6 NPC lives in the module flag
only (`flags.wod5e-mage.nemico.natura`): since 1.33.2 the dialog no longer
writes the system's `spcType`, which dressed the window and the dialogs in the
colours of the system's line and went stale when the Nature was changed on
the sheet.

The sheet was redrawn on 1 October 2026 from the approved mock
(`docs/mock_scheda_nemico_1-10.html`). It has two modes, switched by the
button in the header. In "Gioca" the state changes (Health, armour,
Conditions, the Narrator's hand, rolls) and the text stays still; in "Scrivi"
the sheet itself changes, and everything that can be written is a paper
field. The mode is a module flag (`flags.wod5e-mage.nemico.modo`), not the
system's lock; an enemy with nothing written opens in "Scrivi", a written one
in "Gioca", and whoever does not own the actor always sees "Gioca". Until
someone picks a mode with the button, the window keeps the one it opened
with: a new enemy stays in "Scrivi" while it is being written (before 1.33.2
the first threshold made it "written" and the sheet jumped to "Gioca" on its
own). The frame of the window is the same for every Nature, the one of the
mortal sheets, whatever `spcType` the actor carries; and each open enemy keeps
its own page when several are redrawn together.

The header stays on every page: portrait, name, concept, the disposition of
the token as an icon and a word (hostile, neutral, friendly, secret; a line
of the same colour runs on top of the window), Nature and Faction. Under it
a band with the Health track of the mage sheet and its wheel (damage, rest,
reset), the armour points of each protection worn (click a point to set the
count, click the last full one to remove it), and the Conditions with their
malus (the × removes one, the + opens the list).

Below, three pages. "In gioco" has two columns. On the left, thresholds and
pools in two aligned columns for Physical, Social and Mental: the threshold
is a still number (the dice the enemy takes from a character acting against
them), the pool is the purple button that rolls, already scaled by the
active Conditions, with an arrow when something changed it; the cases sit
under their field (a threshold or a pool for one specific thing, the
system's exceptional pools included). Under them the Narrator's hand, a
minus and a plus for dice added to or taken from every roll of this enemy,
and the Effects as pills: what the enemy has without rolling, the text opens
on click. On the right the Actions, one row each (name, weapon, damage, the
roll button; an action without a roll has "Usa"), with the rest of the row
opening on click; a weapon in the inventory brings its own action.

Under the Actions sits the block of the Nature, the standard that lets NPCs
of the other lines in without new rules to learn. A plain NPC (Dormiente)
has no block. The Awakened (Risvegliato) has Magick: Areté, Type, Spheres,
and every effect as a threshold the character resists, added from the
Grimoire (the Formulas the Spheres open) or by hand (the six Scopes with
their dots, the threshold summed as on the mage sheet); the Narrator never
rolls, "Lancia" sends the card to chat. Every other supernatural (Sonnambulo,
Vampiro, Licantropo, Cacciatore, Spirito, Fatato) has Powers: the score of
its Nature, with its own name (Gnosi for a werewolf, Potenza del Sangue for
a vampire, Potere for a spirit, a name the Narrator writes for the others),
and the powers of the book, the same the mages take, picked from the full
catalogue with "Aggiungi" on every row. The sheet stores the catalogue key
and reads the text from the catalogue of the moment, with the Narrator's
world edits. The table of Natures is `NATURE` in `scripts/nemico.js`: a new
Nature is one row there and its word in the language files. A Magick block
switched on by the old button stays on an enemy of another Nature until the
Narrator removes it in "Scrivi".

"Oggetti" lists weapons, protections and gear, with "Dai" to move an item to
a character's sheet; in "Scrivi" each row has the pencil and the bin, and
each list ends with its empty slot (from the compendium, or by hand). "Note"
holds "what they want now", "when they give up" and the biography, for the
Narrator only. Rolls go to chat as the mage's dice with the pool, the
threshold and the outcome, and a button applies damage and Condition to the
targeted character; a Magick cast puts its threshold in chat with "Resisti",
which opens the target's sheet with the roll box loaded. Active actions with
a limit switch off at the end of the enemy's combat turn.

The pure logic is in `scripts/nemico.js`, with tests in
`tests/nemico.test.js`; `tests/finta/nemico.mjs` renders the templates in
both modes (`NEMICO_PAGINA=<dir>` writes the pages as HTML for screenshots),
and `tests/finta/nemico-scheda.mjs` drives the buttons of the real sheet
class on a fake Foundry.

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

