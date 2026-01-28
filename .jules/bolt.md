## 2024-05-23 - [ShiftManager Interval Optimization]
**Learning:** `useEffect` dependencies that change on every tick (like `shiftProgress` or `activeCases` count) cause the interval to be cleared and recreated every second. This adds React lifecycle overhead and potential timing drift.
**Action:** Use `useRef` to hold mutable values accessed inside `setInterval`, keeping the effect dependency array static.

## 2024-05-24 - [WaveformCanvas Animation Optimization]
**Learning:** `requestAnimationFrame` loops driven by `useEffect` are sensitive to prop changes. If the callback function (e.g. `generatePoint`) changes identity, the effect restarts, causing visual stutters and state reset (like waveform history).
**Action:** Use the "latest ref" pattern: store the callback in a `useRef`, update it in a separate effect, and read the ref inside the animation loop to keep dependencies stable.
