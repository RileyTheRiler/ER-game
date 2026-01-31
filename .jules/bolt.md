## 2024-05-23 - [ShiftManager Interval Optimization]
**Learning:** `useEffect` dependencies that change on every tick (like `shiftProgress` or `activeCases` count) cause the interval to be cleared and recreated every second. This adds React lifecycle overhead and potential timing drift.
**Action:** Use `useRef` to hold mutable values accessed inside `setInterval`, keeping the effect dependency array static.

## 2024-05-24 - [Canvas Animation Loop Optimization]
**Learning:** `useEffect` that initializes `requestAnimationFrame` loops should avoid depending on unstable callback functions (like `generatePoint` derived from props). If the callback changes, the effect re-runs, often resetting internal state (like data buffers) and causing visual glitches (flickering or data loss).
**Action:** Wrap the callback in a `useRef` and keep it updated in a separate `useEffect`, allowing the main animation effect to depend only on the stable ref.
