-- Run in Supabase SQL Editor to fix security findings.

-- 1) Visitors UPDATE policy was USING (true) — anyone could overwrite anyone's row.
--    Lock UPDATE to service role only (server uses admin client).
DROP POLICY IF EXISTS "Anyone updates visitors" ON public.visitors;
REVOKE UPDATE ON public.visitors FROM anon, authenticated;

-- 2) user_roles: forbid client INSERT/UPDATE/DELETE explicitly (no policy = deny,
--    but make intent explicit + revoke privileges so future grants don't escalate).
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM anon, authenticated;
DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 3) has_role() is SECURITY DEFINER. Revoke EXECUTE from PUBLIC/anon so
--    unauthenticated users can't probe role membership. authenticated keeps
--    EXECUTE because RLS policies that reference has_role() are evaluated as
--    the calling role and need it.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
