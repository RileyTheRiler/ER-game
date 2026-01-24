## 2024-10-27 - Added Security Headers
**Vulnerability:** Missing HTTP security headers (X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security, etc.) in `next.config.ts`.
**Learning:** Next.js defaults focus on functionality; security headers for defense-in-depth (like preventing Clickjacking or MIME sniffing) must be manually configured.
**Prevention:** Add a `headers()` configuration to `next.config.ts` enforcing `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and other standard hardening headers.
