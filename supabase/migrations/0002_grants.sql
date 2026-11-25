-- Tables created via the SQL Editor don't automatically get the
-- anon/authenticated grants that Supabase's dashboard table editor adds for
-- you. RLS policies only take effect once the role has table-level
-- privileges in the first place, so without this every request fails with
-- "permission denied for table ..." before RLS is ever evaluated.

-- Only "authenticated" needs access: every query in the app happens after
-- magic-link sign-in, and RLS further restricts each row to its owner (or
-- their mentor), so there is no reason to grant anything to "anon" here.
grant usage on schema public to authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert on public.submissions to authenticated;
