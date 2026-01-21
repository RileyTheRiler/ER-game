## 2024-05-22 - [Accessibilty] Silent Progress Bars
**Learning:** Core UI components like `ProgressBar` were purely visual divs, leaving screen reader users completely unaware of critical game stats like Health, Stress, and Time.
**Action:** When creating custom visual indicators, always enforce `role="progressbar"` and standard ARIA attributes (`valuenow`, `valuemin`, `valuemax`). Ensure consumers can provide an accessible name (`aria-label`) even if no visual label is present.
