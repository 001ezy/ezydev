# Phase 2 Foundation — setup and verification gate

## Current state

The SQL file in `supabase/migrations/` is a **draft migration**. It has not been applied to a real database. The repository contains no Supabase project URL, publishable key, secret key, or authentication configuration. No Command Center route or login UI is published.

## Proposed service contract

- Supabase managed PostgreSQL and Auth.
- Browser code may use only the project URL and Supabase **publishable** key. A publishable key is not an authorization boundary; row-level security and policies must enforce access. Supabase's current docs state that publishable keys are safe to expose only with RLS and correct policies enabled: https://supabase.com/docs/guides/database/secure-data and https://supabase.com/docs/guides/getting-started/api-keys.
- Secret/service keys must stay in server-side runtime secrets and must never enter a `NEXT_PUBLIC_*` variable or static bundle. No server runtime has been selected or deployed yet.
- Public self-registration should remain disabled. Create/invite the intended operator through trusted project administration, then assign the first `owner` role through trusted SQL/admin tooling. The browser client intentionally has no role-write policy.
- Never store provider credentials or personal/contact data in `command_system_settings` or agent execution summaries without a separately reviewed data-retention design.

## Required environment names (values intentionally absent)

A future browser client may use:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

A trusted backend, if selected later, must receive its secret key only as a server-side deployment secret. It is intentionally not included as a frontend environment variable here.

## Apply and verify gate

Before this migration can be called implemented:

1. The operator provisions the intended Supabase project and creates/invites the intended account.
2. Apply the migration to that project only after security review.
3. Verify anonymous users cannot read any `command_*` table.
4. Verify an authenticated user without a role can read no operational data and cannot write roles, audit entries, agent runs, or workflow runs.
5. Verify `viewer`, `operator`, and `owner` access separately; confirm owner-only settings and append-only audit behavior.
6. Confirm sign-up is disabled and the first owner is bootstrapped through trusted administration.
7. Add credentials to local/deployment secret stores without committing them.
8. Only then implement and deploy the Command Center login boundary. Do not publish until anonymous and unauthorized access tests pass.

The migration is a foundation draft, not a connected database, tested authorization boundary, or live integration.
