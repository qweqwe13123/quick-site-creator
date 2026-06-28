-- Запустите этот SQL в вашем Supabase: SQL Editor → New query → Run

CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text, email text, phone text, plan text, lang text,
  details jsonb, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_leads_created_at ON public.leads (created_at);
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT SELECT ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone inserts leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins read leads" ON public.leads FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text NOT NULL, path text, lang text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_visits_created_at ON public.visits (created_at);
CREATE INDEX idx_visits_visitor_id ON public.visits (visitor_id);
GRANT INSERT ON public.visits TO anon, authenticated;
GRANT SELECT ON public.visits TO authenticated;
GRANT ALL ON public.visits TO service_role;
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone inserts visits" ON public.visits FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins read visits" ON public.visits FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id text, amount numeric, currency text, email text, plan text, lang text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_payments_created_at ON public.payments (created_at);
GRANT INSERT ON public.payments TO anon, authenticated;
GRANT SELECT ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone inserts payments" ON public.payments FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins read payments" ON public.payments FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.visitors (
  visitor_id text PRIMARY KEY,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  country text, city text, source text, referrer text, user_agent text, lang text
);
GRANT INSERT ON public.visitors TO anon, authenticated;
GRANT SELECT ON public.visitors TO authenticated;
GRANT ALL ON public.visitors TO service_role;
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone inserts visitors" ON public.visitors FOR INSERT TO anon, authenticated WITH CHECK (true);
-- UPDATEs are performed by the server admin client only; no client UPDATE policy.
CREATE POLICY "Admins read visitors" ON public.visitors FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins read visitors" ON public.visitors FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text NOT NULL, path text NOT NULL,
  referrer text, source text, country text, city text, user_agent text, lang text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_page_views_created_at ON public.page_views (created_at);
CREATE INDEX idx_page_views_visitor_id ON public.page_views (visitor_id);
GRANT INSERT ON public.page_views TO anon, authenticated;
GRANT SELECT ON public.page_views TO authenticated;
GRANT ALL ON public.page_views TO service_role;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone inserts page_views" ON public.page_views FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins read page_views" ON public.page_views FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text, event_name text NOT NULL, path text, payload jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events (created_at);
CREATE INDEX idx_analytics_events_name ON public.analytics_events (event_name);
GRANT INSERT ON public.analytics_events TO anon, authenticated;
GRANT SELECT ON public.analytics_events TO authenticated;
GRANT ALL ON public.analytics_events TO service_role;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone inserts analytics_events" ON public.analytics_events FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins read analytics_events" ON public.analytics_events FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
