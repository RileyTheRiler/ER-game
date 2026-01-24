## 2024-05-23 - [ShiftManager Interval Optimization]
**Learning:** `useEffect` dependencies that change on every tick (like `shiftProgress` or `activeCases` count) cause the interval to be cleared and recreated every second. This adds React lifecycle overhead and potential timing drift.
**Action:** Use `useRef` to hold mutable values accessed inside `setInterval`, keeping the effect dependency array static.

## 2024-05-24 - [Root Component State Subscription]
**Learning:** The root `GameContainer` component was using the monolithic `useGameState` hook, causing it to re-render on every single state update (including high-frequency timer ticks). This causes the entire React tree to be checked for updates unnecessarily.
**Action:** Use specific Zustand selectors (e.g., `useGameStore(s => s.currentPhase)`) in root/high-level components to isolate them from high-frequency updates they don't render.
