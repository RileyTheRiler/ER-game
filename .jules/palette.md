## 2025-02-24 - Manual Focus Management with Framer Motion
**Learning:** When using Framer Motion with conditional rendering (`AnimatePresence`), the DOM element might not be immediately available for focus in `useEffect`.
**Action:** Use `requestAnimationFrame` inside `useEffect` to ensure the element is mounted and ready before attempting to call `.focus()`. This prevents focus loss and ensures screen readers announce the modal content correctly.
