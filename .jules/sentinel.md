# Sentinel's Journal

## 2025-02-23 - [Input Validation in Client-Side State]
**Vulnerability:** Game state stored in local storage and modified via store actions lacked input validation, allowing potentially unlimited string lengths or invalid characters to be persisted.
**Learning:** Client-side state management (Zustand) is often treated as trusted, but since it can be manipulated via console or modified in local storage, it requires validation boundaries just like a backend API.
**Prevention:** Implement a dedicated security utility for sanitization and enforce limits on all user-controlled inputs before they enter the state tree.
