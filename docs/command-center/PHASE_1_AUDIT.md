# EZY DEV Command Center — Phase 1 Repository Audit

## Repository summary

- Repository: `001ezy/ezydev`; the working tree is a single Next.js App Router application at the repository root.
- Framework: Next.js 16.4.6, React 19.2, TypeScript 5.9; npm with a committed `package-lock.json`.
- Rendering/deployment mode: `output: "export"`, `trailingSlash: true`, images unoptimized. This produces a static site; there are no Next.js server routes or runtime database connections.
- Current routes: studio pages (`/`, `/about`, `/services`, `/process`, `/work`, `/work/[slug]`, `/contact`, `/privacy`), ten concept demos (`/vertex`, `/motion`, `/noir`, `/forma`, `/vitalis`, `/atelier`, `/alterra`, `/elan`, `/nexus`, `/orbit`) and generated robots/sitemap routes.
- Existing portfolio and concept demos are real source pages and must remain intact. Demo booking/quote forms explicitly do not create real bookings, send data, or charge users.
- Hosting: GitHub Actions builds the static export with `GITHUB_PAGES=true` and publishes to GitHub Pages under `/ezydev/`. A Cloudflare Worker `ezydev` now redirects to that Pages origin; `src/worker.ts` changes only the Worker entry behavior.
- Existing contact form: client-side validation followed by opening a prefilled `mailto:` link. It does not submit to a server or retain information.

## Existing architecture

```text
Next.js static export (repo root)
  ├─ GitHub Actions → GitHub Pages at /ezydev/
  └─ Cloudflare Worker ezydev → HTTP redirect to GitHub Pages

Command Center backend/database/authentication: absent
```

There is no database schema or migration system, authentication, authorization, server-only secret handling, API backend, job queue, AI integration, communications integration, monitoring, or finance data source in the repository. No `.env.example` or service credential files were found. The `package.json` has no Supabase, PostgreSQL, auth, queue, mail, WhatsApp, or AI SDK dependencies.

## Proposed architecture

1. Preserve the portfolio as a static application and avoid changing its root routes/components for Command Center work.
2. Start Command Center as an isolated application boundary under `apps/command-center/` or a similarly explicit workspace. Keep its dependencies, environment variables, routes, and build output separate from the portfolio.
3. Use managed PostgreSQL plus managed authentication (Supabase is the leading low-ops candidate) with strict row-level security, server-side role checks where applicable, audit records, and no service-role key in browser code. Do not enable communication or autonomous actions until provider credentials, consent/suppression enforcement, and authorization checks are verified.
4. Keep development and deployment separate from the existing GitHub Pages workflow until the Command Center authentication and data access have passed verification. A public route can expose only a login shell; it must never embed operational data or credentials.
5. Integrate a public path such as `/command` only after there is a deployable authenticated runtime and tested routing. The current Worker is a Pages redirect and the Pages site is static; neither is a private application backend.
6. Build the operational system incrementally from schema/auth/audit foundations, then CRM and workflow records. Real integrations should be enabled individually and report provider-confirmed statuses only.

## Risks and constraints

- Static export cannot securely host server-side secrets, protected server routes, webhooks, or durable background jobs. Placing a dashboard UI in the current public site without a verified access boundary would be unsafe.
- Client-side authentication can protect data only when database row-level security and every exposed API are configured and verified correctly.
- Current free hosting is suitable for the public portfolio, not sufficient by itself for durable workflows, inbound webhooks, private secrets, or a PostgreSQL-backed operational system.
- Ten agents, prospect discovery, outbound email/WhatsApp, finance and website delivery are distinct operational integrations. They cannot be truthfully represented as connected before credentials, provider setup, and end-to-end tests exist.
- Business outreach requires source provenance, consent/legal basis where required, opt-out/suppression handling, rate limits, and auditable status transitions.
- The business owner’s authorized login/account, desired currency and jurisdiction, provider credentials, and final access policy are not present in the repository. Safe technical scaffolding can proceed, but live authentication/provider operations cannot be verified without configured credentials.

## Missing dependencies and configuration

- Authentication and authorization provider; user/role model.
- PostgreSQL database and migration tooling.
- Server-side API/runtime and secret storage for webhooks and privileged operations.
- Durable queue/workflow execution and monitoring.
- Verified email/WhatsApp/LLM provider accounts and credentials.
- `.env.example`, deployment environment configuration, backup/retention policy, and operational alerting.

## Phase plan

1. **Phase 1 — Audit:** completed in this document; preserve existing portfolio and define isolated architecture.
2. **Phase 2 — Foundation:** define isolated Command Center app boundary, environment contract, database migration baseline, authentication/role model and audit-log design. Keep deployment disabled until access checks pass.
3. **Phase 3 — CRM:** leads, contacts, consent/suppression, activity history and deals with validated database policies.
4. **Phase 4 — Orchestrator:** durable task/run records, agent registry, retries and limits; begin in manual/test mode.
5. **Phase 5 — Agent infrastructure:** ten constrained logical agents with structured inputs/outputs, permissions and logs; no claims of autonomy absent live verified execution.
6. **Phase 6 — Discovery:** only permitted sources, provenance, duplicate prevention and verification.
7. **Phase 7 — Communications:** provider-backed email/WhatsApp, consent enforcement, webhooks and opt-outs, tested with controlled accounts.
8. **Phase 8 — Sales:** inbox classification, deals, requirements and proposal tracking.
9. **Phase 9 — Production:** project briefs, isolated website versions, preview and QA; require customer approval before publication.
10. **Phase 10 — Finance/reporting:** actual payments/expenses and metrics; distinguish expected, invoiced and received values.
11. **Phase 11 — Production readiness:** security, backup, performance, integration, workflow and mobile reviews; publish only after the access boundary is verified.

## Verification performed

- Inspected package/configuration, source routes/components, static export settings, GitHub Pages workflow, Worker configuration, and repository files for database/auth/environment integrations.
- `npm run lint`: passed before the latest Worker redirect change.
- `npm run build`: passed before the latest Worker redirect change.
- Latest Worker change is covered by the build/lint run recorded with commit `c2befa3`.
- GitHub Pages fallback: three repeated HTTP/2 requests returned the complete 29,574-byte home document.
- Cloudflare Worker URL: on the previously problematic edge, HTTP/2 returns `302` to `https://001ezy.github.io/ezydev/`; followed requests for `/`, `/work/vertex/`, `/contact/`, and `/robots.txt` completed successfully. Three repeated root requests returned complete HTML.
- This was command-line HTTP verification from the current environment. No visual browser session was available, so there is no user-browser confirmation.
