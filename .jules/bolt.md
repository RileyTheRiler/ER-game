## 2024-05-23 - [ShiftManager Interval Optimization]
**Learning:** `useEffect` dependencies that change on every tick (like `shiftProgress` or `activeCases` count) cause the interval to be cleared and recreated every second. This adds React lifecycle overhead and potential timing drift.
**Action:** Use `useRef` to hold mutable values accessed inside `setInterval`, keeping the effect dependency array static.

## 2026-01-27 - [Canvas Animation Loop Stability]
**Learning:** In `requestAnimationFrame` loops driven by `useEffect`, including mutable props (like data generators or style options) in the dependency array causes the effect to re-run, resetting the animation loop and clearing the canvas buffer. This results in visual flickering and history loss.
**Action:** Use `useRef` to hold the latest values of mutable props (e.g., `color`, `generatePoint`). Update these refs in a separate effect or render body, and access `ref.current` inside the animation loop. This keeps the loop stable and the dependency array minimal (e.g., only `width`).
