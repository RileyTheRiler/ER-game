## 2024-05-23 - [ShiftManager Interval Optimization]
**Learning:** `useEffect` dependencies that change on every tick (like `shiftProgress` or `activeCases` count) cause the interval to be cleared and recreated every second. This adds React lifecycle overhead and potential timing drift.
**Action:** Use `useRef` to hold mutable values accessed inside `setInterval`, keeping the effect dependency array static.

## 2025-02-18 - [Waveform Canvas Animation Loop]
**Learning:** Passing a callback function (like `generatePoint`) to a component that uses `requestAnimationFrame` can cause the animation loop to tear down and restart if the callback identity changes (e.g., when dependencies like heart rate change). This results in canvas clearing and visual glitches (loss of waveform history).
**Action:** Store the callback in a `useRef` and access `ref.current` inside the animation loop. Remove the callback from the `useEffect` dependency array. This maintains the loop and state (canvas content) even when the logic updates.
