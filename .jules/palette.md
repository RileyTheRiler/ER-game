## 2024-05-23 - Accessible Progress Bars
**Learning:** Custom progress bar components (divs with widths) are invisible to screen readers without explicit ARIA roles.
**Action:** Always add `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` to the track or container. Ensure `aria-label` or `aria-labelledby` provides a text description.
