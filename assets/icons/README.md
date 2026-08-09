# Mage icon assets

This directory contains only image assets owned or legally distributable by
the module. Use lowercase, descriptive, hyphen-separated filenames.

## Structure

- `sheet/`: icons and decorative images used inside the Mage Actor sheet.
- `ui/`: buttons, tabs, controls, and other general interface icons.
- `dice/chat/`: die faces rendered in Foundry chat messages.
- `dice/dialog/`: die previews displayed in roll dialogs.
- `dice/dice-so-nice/`: face textures and bump maps for Dice So Nice.

## Recommended die filenames

Current chat faces and result mappings:

- `dado-vuoto.svg`: transparent base used for empty Mage and Paradox faces;
  their color and border are rendered with CSS.
- Mage results 1–5: empty CSS face using `dado-vuoto.svg`.
- `magick-scintilla.svg`: Mage results 6–9.
- `magick-stellina.svg`: Mage result 10.
- `paradosso-occhio-vuoto.svg`: Paradox result 1.
- Paradox results 2–5: empty CSS face using `dado-vuoto.svg`.
- `paradosso-scintilla.svg`: Paradox results 6–9.
- `paradosso-occhio-completo.svg`: Paradox result 10.

Dialog previews:

- `mage-dice.png`
- `paradox-dice.png`

Dice So Nice textures should use the same descriptive names followed by
`-dsn.png`; optional bump maps should end in `-dsn-bump.png`.

Foundry paths start at the module root. For example:

```text
modules/wod5e-mage/assets/icons/dice/chat/paradox-success.png
```
