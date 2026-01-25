## 2024-05-23 - [ShiftManager Interval Optimization]
**Learning:** `useEffect` dependencies that change on every tick (like `shiftProgress` or `activeCases` count) cause the interval to be cleared and recreated every second. This adds React lifecycle overhead and potential timing drift.
**Action:** Use `useRef` to hold mutable values accessed inside `setInterval`, keeping the effect dependency array static.

## 2025-02-23 - [Game Loop Render Optimization]
**Learning:** High-frequency updates from the game loop (e.g., `shiftProgress` ticking every second) cause the top-level `ShiftManager` to re-render. Without memoization, this cascades to all child components (`CaseQueue`, `DiagnosticBoard`), even if their data hasn't changed.
**Action:** Wrap heavy view components in `React.memo` and ensure all callbacks passed to them are stable using `useCallback`. This isolates the frequent timer updates to only the components that actually display the time.
