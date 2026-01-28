## 2025-05-15 - Visual-Only Components Missing ARIA
**Learning:** UI components like ProgressBar are implemented purely visually using divs and Framer Motion, making them invisible to screen readers.
**Action:** Always verify `role` and `aria-*` attributes when encountering custom visual indicators in this codebase, specifically ensuring they support `...props` spreading for accessibility overrides.
