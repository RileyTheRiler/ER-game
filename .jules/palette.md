## 2024-05-23 - Modal Accessibility
**Learning:** Reusable Modal components often lack critical ARIA roles (`dialog`, `modal`) and labelled close buttons, creating traps for screen reader users. `useId` is a perfect solution for linking titles to the modal container.
**Action:** Always check `role="dialog"`, `aria-modal="true"`, and ensure close buttons have `aria-label` or visible text in any overlay component.
