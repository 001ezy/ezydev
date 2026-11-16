# Command Center Implementation Checklist

Progress is tracked here so work can resume without treating proposals or disconnected UI as completed functionality.

## Phase 1 — Repository audit
- [x] Inspect actual framework, package manager, routes, existing portfolio, deployment, env files, auth and database.
- [x] Record current architecture, constraints, risks, missing dependencies and phased proposal.
- [x] Preserve the existing portfolio source and deploy pipeline.

## Phase 2 — Foundation
- [ ] Select and provision the database/auth service; document owner-controlled account and access setup.
- [ ] Create isolated Command Center application boundary without changing portfolio behavior.
- [ ] Define environment variable contract using placeholders only; never commit secrets.
- [ ] Design initial schema/migrations for users/roles, settings, audit logs and execution records.
- [ ] Implement authentication and role enforcement; verify anonymous access is denied and tenant/data policies work.
- [ ] Keep Command Center deployment disabled until authentication and authorization are verified.

## Phase 3 — CRM
- [ ] Leads, sources, contacts, consent, suppression, activity history and duplicate protection.
- [ ] Search/filter/pagination and deal pipeline backed by real records.
- [ ] Authorization and audit coverage for all mutations.

## Phase 4 — Orchestrator
- [ ] Durable workflow/task records, idempotency, retries, limits and failure states.
- [ ] Agent registry, scoped permissions, structured inputs/outputs and logs.
- [ ] Manual/test mode and pause controls.

## Phase 5 — Agent infrastructure
- [ ] Implement constrained agents incrementally; test handoffs and permission boundaries.
- [ ] Track model/API usage only from provider-confirmed data.

## Phase 6 — Lead discovery
- [ ] Integrate only permitted sources; record provenance and verification confidence.
- [ ] Deduplication, scoring and source-specific limits.

## Phase 7 — Communications
- [ ] Configure verified email provider and controlled test account.
- [ ] Verify consent, suppression, unsubscribe, sender identity, rate limits and provider statuses.
- [ ] Configure official WhatsApp Business Platform only with valid account/template/opt-in setup.

## Phase 8 — Sales
- [ ] Unified inbox, reply intents, human escalation, requirements and proposal tracking.

## Phase 9 — Website production
- [ ] Project briefs, isolated project boundaries, previews, versioning and QA records.
- [ ] Approval gate before any public customer deployment.

## Phase 10 — Finance and reporting
- [ ] Record confirmed invoices, actual payments, refunds and costs distinctly.
- [ ] Calculate reports solely from stored, traceable records.

## Phase 11 — Production readiness
- [ ] Security, backup, performance, responsive UI, workflow and integration reviews.
- [ ] Verify access control against deployed runtime before making `/command` reachable.
