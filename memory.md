# Memory — Dipol Project

## Session: 2026-05-12
- Analyzed `www.dipolltd.com` content.
- Initialized project structure under `/Users/gokhan_turhan/Projects/04_Web_Platforms/Dipol`.
- Created `gitrepo.md`, `README.md`, and `memory.md`.
- Plan: Initialize Next.js app and start building the foundation.
- Created Admin Portal at `/portal/login` (admin / dipol2026).

## Session: 2026-05-13
- Finalizing modernization and security hardening.
- Fixed dev server: Port 3005 was stuck, killed existing process and restarted `pnpm dev -p 3005`.
- Updated `walkthrough.md` to reflect Admin Portal, CMS, and Security features.
- Implemented Global SEO: TR/EN metadata in `layout.tsx`, added dynamic `robots.ts` and `sitemap.ts`.
- Developed Portal-based SEO Management: Added "SEO Yönetimi" tab to Admin Dashboard, dynamic metadata fetching via `generateMetadata` from `site-content.json`.
- Integrated Google Tag Manager (GTM) and GA4: Scripts added to `layout.tsx`, IDs are manageable through the Portal.
- Implemented Firebase Session Management: Created `/api/auth/session` and `/api/auth/logout` routes for secure cookie-based authentication.
- Enforced Session-Based Protection: Added `middleware.ts` for route protection and refactored API routes to use Firebase session cookies.
- Cleaned up Dashboard UI: Removed client-side `localStorage` auth logic and manual Authorization headers.
- Syncing changes to GitHub.





<!-- MCP update by antigravity at 2026-05-13 21:21 -->
- [2026-05-13 21:21] **Security research completed, plan artifact created, and Lighthouse tests executed.**: Created security_plan.md artifact for another agent to implement security fixes (JWT/Auth.js, bcrypt, header security, deps update). Ran Lighthouse tests on dev server: Performance 39/100, Accessibility 87/100, Best Practices 100/100, SEO 100/100. Stabilite is fine but Performance needs optimization.

<!-- MCP update by antigravity at 2026-05-13 21:25 -->
- [2026-05-13 21:25] **Created performance remediation plan.**: Created performance_plan.md artifact outlining steps to fix Lighthouse performance issues (removing 1-second SWR polling, LazyMotion for framer-motion, @next/third-parties/google for analytics, and React.cache for file system reads).
