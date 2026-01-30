## 2024-05-23 - Next.js Security Headers Configuration
**Vulnerability:** The application lacked HTTP security headers (HSTS, CSP, X-Frame-Options), leaving it vulnerable to XSS, Clickjacking, and MIME-sniffing attacks.
**Learning:** Next.js applications need explicit header configuration in `next.config.ts`. Standard CSPs can break Next.js dev mode (hot reload) and styling libraries (Tailwind/Framer Motion) unless `'unsafe-inline'` and `'unsafe-eval'` are carefully permitted or nonces are implemented (complex).
**Prevention:** Implement a default secure `headers()` configuration in `next.config.ts` for all new Next.js projects, including HSTS, X-Content-Type-Options: nosniff, and a pragmatic CSP.
