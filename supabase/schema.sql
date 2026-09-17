-- Rode no SQL Editor do Supabase (Dashboard → SQL → New query)
-- Projeto: Financeiro Escritório / Vitrina Contabilidade

create table if not exists public.finance_workspace (
  workspace_key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.finance_workspace enable row level security;

-- Acesso via chave publishable (app estático de uso interno).
-- Para uso público na internet, troque depois por autenticação Supabase Auth.
drop policy if exists "finance_workspace_anon_all" on public.finance_workspace;
create policy "finance_workspace_anon_all"
  on public.finance_workspace
  for all
  to anon, authenticated
  using (true)
  with check (true);

grant select, insert, update, delete on public.finance_workspace to anon, authenticated;
