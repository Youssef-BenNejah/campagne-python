-- Phase 5: the client computes passed/xp_awarded itself (there is no server
-- grading — Pyodide runs in the browser by design, zero backend cost). That
-- means a submission's PASS/FAIL result can't be trusted server-side without
-- re-running the grader, which is out of scope here. But xp_awarded CAN be
-- made tamper-proof independently of whatever the client sends: this trigger
-- recomputes it from passed + difficulty + cheat_flags, so editing the
-- request payload to inflate XP no longer works even if someone opens devtools.
--
-- Keep this in sync with src/lib/xp.ts (base XP per difficulty) and
-- src/lib/useCheatWatch.ts (per-flag penalty) — both are duplicated here on
-- purpose, since the DB must not trust the client's copy of the same numbers.

alter table public.submissions
  add column if not exists exam_mode boolean not null default false;

create or replace function public.compute_xp_awarded()
returns trigger
language plpgsql
as $$
declare
  base_xp int;
  penalty int := 0;
  multiplier int := 1;
  flag jsonb;
  kind text;
begin
  if not new.passed then
    new.xp_awarded := 0;
    return new;
  end if;

  base_xp := case new.difficulty
    when 1 then 50
    when 2 then 100
    when 3 then 150
    else 0
  end;

  if new.exam_mode then
    multiplier := 2;
  end if;

  for flag in select jsonb_array_elements(coalesce(new.cheat_flags, '[]'::jsonb))
  loop
    kind := flag->>'kind';
    if kind = 'paste' then
      penalty := penalty + 15 * multiplier;
    elsif kind = 'tab-blur' then
      penalty := penalty + 5 * multiplier;
    end if;
  end loop;

  new.xp_awarded := greatest(0, base_xp - penalty);
  return new;
end;
$$;

drop trigger if exists trg_compute_xp_awarded on public.submissions;
create trigger trg_compute_xp_awarded
  before insert on public.submissions
  for each row execute function public.compute_xp_awarded();
