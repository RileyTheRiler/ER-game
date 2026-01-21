# Sentinel Journal

This journal records CRITICAL security learnings, vulnerabilities, and patterns specific to this codebase.

## 2025-02-25 - Initial Security Headers
**Vulnerability:** Missing HTTP security headers (HSTS, X-Frame-Options, etc.).
**Learning:** Default Next.js configuration provides some security but explicit headers are needed for defense-in-depth against clickjacking, MIME sniffing, and MITM.
**Prevention:** Added standard security headers in `next.config.ts`.
