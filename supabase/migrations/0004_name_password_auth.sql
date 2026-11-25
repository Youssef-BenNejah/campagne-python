-- Switched from magic-link email to name+password auth (src/lib/nameAuth.ts
-- turns the name into a synthetic "name@campagne.local" email so Supabase
-- Auth — which always keys on email — never actually needs to send mail).
-- Update the profile-creation trigger to use the real display name passed
-- at sign-up instead of falling back to that synthetic address.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', new.email));
  return new;
end;
$$;

-- IMPORTANT (manual dashboard step, not something this migration can do):
-- Authentication -> Providers -> Email -> turn OFF "Confirm email".
-- Without this, Supabase still tries to send a confirmation link to the
-- fake @campagne.local address on every sign-up, which bounces and leaves
-- the account unusable until confirmed.
