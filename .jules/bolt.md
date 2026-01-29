## 2024-05-23 - [ShiftManager Interval Optimization]
**Learning:** `useEffect` dependencies that change on every tick (like `shiftProgress` or `activeCases` count) cause the interval to be cleared and recreated every second. This adds React lifecycle overhead and potential timing drift.
**Action:** Use `useRef` to hold mutable values accessed inside `setInterval`, keeping the effect dependency array static.

## 2024-05-23 - [GameContainer Re-render Cascade]
**Learning:** The `useGameState` hook subscribes to the entire store state. When used in a top-level component like `GameContainer`, it causes the entire application tree to re-render on every state update (e.g., every clock tick), even if the component only cares about static properties like `phase`.
**Action:** Replace `useGameState` with specific `useGameStore` selectors in top-level components. For game loops, access transient state (like timers) imperatively using `useGameStore.getState()` inside intervals to avoid component re-renders entirely.
