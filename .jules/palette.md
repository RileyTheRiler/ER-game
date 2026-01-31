## 2024-05-22 - [Accessible Progress Bars in Timed Modes]
**Learning:** Progress bars used for game timers (like in CPC Exam Mode) often lack visible labels for immersion, making them invisible to screen readers without explicit ARIA attributes.
**Action:** Always add `role="progressbar"` and `aria-valuenow` to the progress component, and ensure `aria-label` is passed when visual labels are hidden.
