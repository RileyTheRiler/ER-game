## 2024-05-22 - [Accessible Progress Bars]
**Learning:** The `ProgressBar` component was purely visual (divs) and lacked ARIA roles, making stats like Energy and Stress invisible to screen readers.
**Action:** When creating custom UI components that represent values (like meters/bars), always extend `React.HTMLAttributes` and include `role`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` by default.
