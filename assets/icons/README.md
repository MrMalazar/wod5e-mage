# Mage icon assets

This directory contains only image assets owned or legally distributable by
the module. Use lowercase, descriptive, hyphen-separated PNG filenames.

## Structure

- `sheet/`: icons and decorative images used inside the Mage Actor sheet.
- `ui/`: buttons, tabs, controls, and other general interface icons.
- `dice/chat/`: die faces rendered in Foundry chat messages.
- `dice/dialog/`: die previews displayed in roll dialogs.
- `dice/dice-so-nice/`: face textures and bump maps for Dice So Nice.

## Recommended die filenames

Current chat faces and result mappings:

- `empty_mage.png`: Mage results 1–5.
- `spark_mage.png`: Mage results 6–9.
- `star_mage.png`: Mage result 10.
- `eye_closed_paradox.png`: Paradox result 1.
- `empty_paradox.png`: Paradox results 2–5.
- `spark_paradox.png`: Paradox results 6–9.
- `eye_open_paradox.png`: Paradox result 10.

Dialog previews:

- `mage-dice.png`
- `paradox-dice.png`

Dice So Nice textures should use the same descriptive names followed by
`-dsn.png`; optional bump maps should end in `-dsn-bump.png`.

Foundry paths start at the module root. For example:

```text
modules/wod5e-mage/assets/icons/dice/chat/paradox-success.png
```
