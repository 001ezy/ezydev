-- Draft foundation for EZY DEV Command Center.
-- Apply only to the intended Supabase project after reviewing PHASE_1_AUDIT.md.
-- Never put provider credentials, personal data, or secrets in system_settings.

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to authenticated;

create type public.command_center_role as enum ('owner', 'operator', 'viewer');

create table public.command_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '' check (char_length(display_name) <= 120),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.command_user_roles (
  user_id uuid not null references public.command_profiles (user_id) on delete cascade,
  role public.command_center_role not null,
  assigned_by uuid references public.command_profiles (user_id) on delete set null,
  assigned_at timestamptz not null default now(),
  primary key (user_id, role)
);

-- SECURITY DEFINER is limited to this read-only role check. The fixed search_path
-- prevents object-shadowing; role rows are not writable through the app client.
create function private.has_command_role(required_role public.command_center_role)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.command_user_roles as user_role
    where user_role.user_id = (select auth.uid())
      and user_role.role = required_role
  );
$$;

revoke all on function private.has_command_role(public.command_center_role) from public, anon;
grant execute on function private.has_command_role(public.command_center_role) to authenticated;

create function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create table public.command_system_settings (
  setting_key text primary key check (setting_key ~ '^[a-z][a-z0-9_.-]{1,99}$'),
  setting_value jsonb not null default '{}'::jsonb,
  updated_by uuid references public.command_profiles (user_id) on delete set null,
  updated_at timestamptz not null default now()
);

create table public.command_audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.command_profiles (user_id) on delete set null,
  action text not null check (char_length(action) between 1 and 120),
  entity_type text not null check (char_length(entity_type) between 1 and 80),
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index command_audit_logs_created_at_idx on public.command_audit_logs (created_at desc);
create index command_audit_logs_entity_idx on public.command_audit_logs (entity_type, entity_id, created_at desc);

-- Client users cannot forge audit rows. This trigger records settings changes
-- under the authenticated actor while bypassing client-side table permissions.
create function private.audit_system_settings_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  row_data jsonb;
  record_id text;
  action_name text;
begin
  if tg_op = 'DELETE' then
    row_data := to_jsonb(old);
    record_id := old.setting_key;
    action_name := 'settings.deleted';
  elsif tg_op = 'INSERT' then
    row_data := to_jsonb(new);
    record_id := new.setting_key;
    action_name := 'settings.created';
  else
    row_data := jsonb_build_object('before', to_jsonb(old), 'after', to_jsonb(new));
    record_id := new.setting_key;
    action_name := 'settings.updated';
  end if;

  insert into public.command_audit_logs (actor_id, action, entity_type, entity_id, metadata)
  values (auth.uid(), action_name, 'system_setting', record_id, row_data);

  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

create trigger command_profiles_set_updated_at
before update on public.command_profiles
for each row execute function private.set_updated_at();

create trigger command_system_settings_audit
 after insert or update or delete on public.command_system_settings
for each row execute function private.audit_system_settings_change();

create table public.command_agent_definitions (
  agent_key text primary key check (agent_key ~ '^[a-z][a-z0-9_-]{1,49}$'),
  display_name text not null check (char_length(display_name) between 1 and 100),
  responsibility text not null,
  enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger command_agent_definitions_set_updated_at
before update on public.command_agent_definitions
for each row execute function private.set_updated_at();

create table public.command_agent_runs (
  id uuid primary key default gen_random_uuid(),
  agent_key text not null references public.command_agent_definitions (agent_key) on delete restrict,
  status text not null check (status in ('queued', 'running', 'succeeded', 'failed', 'cancelled')),
  attempt integer not null default 0 check (attempt >= 0),
  input_summary jsonb not null default '{}'::jsonb,
  output_summary jsonb,
  error_code text,
  created_at timestamptz not null default now(),
  started_at timestamptz,
  finished_at timestamptz,
  check (finished_at is null or started_at is not null)
);

create index command_agent_runs_created_at_idx on public.command_agent_runs (created_at desc);
create index command_agent_runs_agent_status_idx on public.command_agent_runs (agent_key, status, created_at desc);

create table public.command_workflow_runs (
  id uuid primary key default gen_random_uuid(),
  workflow_key text not null check (workflow_key ~ '^[a-z][a-z0-9_.-]{1,99}$'),
  status text not null check (status in ('queued', 'running', 'succeeded', 'failed', 'cancelled', 'paused')),
  idempotency_key text unique,
  attempt integer not null default 0 check (attempt >= 0),
  error_code text,
  created_at timestamptz not null default now(),
  started_at timestamptz,
  finished_at timestamptz,
  check (finished_at is null or started_at is not null)
);

create index command_workflow_runs_status_idx on public.command_workflow_runs (status, created_at desc);

alter table public.command_profiles enable row level security;
alter table public.command_user_roles enable row level security;
alter table public.command_system_settings enable row level security;
alter table public.command_audit_logs enable row level security;
alter table public.command_agent_definitions enable row level security;
alter table public.command_agent_runs enable row level security;
alter table public.command_workflow_runs enable row level security;

revoke all on table
  public.command_profiles,
  public.command_user_roles,
  public.command_system_settings,
  public.command_audit_logs,
  public.command_agent_definitions,
  public.command_agent_runs,
  public.command_workflow_runs
from anon, authenticated;

grant select on public.command_profiles, public.command_user_roles to authenticated;
grant update (display_name) on public.command_profiles to authenticated;
grant select, insert, update, delete on public.command_system_settings to authenticated;
grant select on
  public.command_audit_logs,
  public.command_agent_definitions,
  public.command_agent_runs,
  public.command_workflow_runs
to authenticated;

create policy command_profiles_select_self_or_owner
on public.command_profiles for select to authenticated
using (user_id = (select auth.uid()) or private.has_command_role('owner'));

create policy command_profiles_update_self
on public.command_profiles for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

create policy command_user_roles_select_self_or_owner
on public.command_user_roles for select to authenticated
using (user_id = (select auth.uid()) or private.has_command_role('owner'));
-- Deliberately no client INSERT/UPDATE/DELETE policy on roles. Bootstrap the first
-- owner only through trusted Supabase project administration after creating a user.

create policy command_system_settings_owner_only
on public.command_system_settings for all to authenticated
using (private.has_command_role('owner'))
with check (private.has_command_role('owner'));

create policy command_audit_logs_owner_read_only
on public.command_audit_logs for select to authenticated
using (private.has_command_role('owner'));
-- No client write/update/delete policy: audit events are trigger- or server-written.

create policy command_agent_definitions_staff_read_only
on public.command_agent_definitions for select to authenticated
using (
  private.has_command_role('owner')
  or private.has_command_role('operator')
);

create policy command_agent_runs_staff_read_only
on public.command_agent_runs for select to authenticated
using (
  private.has_command_role('owner')
  or private.has_command_role('operator')
);

create policy command_workflow_runs_staff_read_only
on public.command_workflow_runs for select to authenticated
using (
  private.has_command_role('owner')
  or private.has_command_role('operator')
);
-- Agent/workflow execution rows have no client write policy. A future trusted
-- server/queue integration must own these writes and keep secrets server-side.
