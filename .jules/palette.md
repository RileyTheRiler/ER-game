## 2024-05-23 - Interactive Card Accessibility
**Learning:** Reusable `Card` components in design systems often block accessibility props when they wrap content in a `div` or `motion.div` without spreading `...props`. This prevents adding `role`, `aria-*`, or keyboard handlers to the card itself, forcing developers to wrap the card in another interactive element or break the component.
**Action:** Always ensure UI components like `Card` spread `...props` to their underlying root element to support ARIA attributes and event handlers natively.
