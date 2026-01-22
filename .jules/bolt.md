## 2024-05-23 - [ShiftManager Interval Optimization]
**Learning:** `useEffect` dependencies that change on every tick (like `shiftProgress` or `activeCases` count) cause the interval to be cleared and recreated every second. This adds React lifecycle overhead and potential timing drift.
**Action:** Use `useRef` to hold mutable values accessed inside `setInterval`, keeping the effect dependency array static.

## 2025-05-24 - [WaveformCanvas Animation Loop Stabilization]
**Learning:** When using `requestAnimationFrame` loops that depend on changing props (like a waveform generator function based on heart rate), adding those props to the `useEffect` dependency array causes the effect to re-run, resetting the animation state (clearing canvas, resetting history). This causes visual flickering and clears the waveform history every time the data updates.
**Action:** Use `useRef` to store the latest version of the generator function. Update the ref in a separate `useEffect`. Inside the animation loop, call the function via the ref. This keeps the animation loop stable while still using the latest data, preserving visual continuity.
