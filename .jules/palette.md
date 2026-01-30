## 2025-05-19 - ShiftHUD Icon Buttons Accessibility
**Learning:** Icon-only buttons using emojis or non-standard characters as content are invisible or confusing to screen readers without explicit labeling. The `title` attribute is insufficient for modern accessibility standards.
**Action:** Always add `aria-label` to buttons where the visual label is an icon or emoji, ensuring the accessible name matches the visual tooltip/intent.
