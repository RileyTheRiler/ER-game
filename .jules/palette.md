## 2024-05-22 - [Accessible Progress Bars with Visual Labels]
**Learning:** When adding ARIA roles to custom components like `ProgressBar` that have external visual labels, screen readers often read both the `aria-label` on the component and the visual text, causing duplication.
**Action:** Apply `aria-hidden="true"` to the visual label container when it duplicates the information provided in the `aria-label` of the semantic element (e.g., `role="progressbar"`). Ensure the semantic element carries the `aria-label`.
