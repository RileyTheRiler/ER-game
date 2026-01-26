## 2024-05-23 - [ShiftManager Interval Optimization]
**Learning:** `useEffect` dependencies that change on every tick (like `shiftProgress` or `activeCases` count) cause the interval to be cleared and recreated every second. This adds React lifecycle overhead and potential timing drift.
**Action:** Use `useRef` to hold mutable values accessed inside `setInterval`, keeping the effect dependency array static.

## 2024-05-24 - [Monolithic Hook Performance]
**Learning:** `useGameState` was subscribing to the entire store state. Even components that only needed `phase` (like `GameContainer`) were re-rendering on every clock tick because `shiftTimeRemaining` changed in the store.
**Action:** Split monolithic hooks into granular ones (e.g., `useGamePhase`) and use `useShallow` for selectors to prevent unnecessary re-renders when unrelated state changes.
