CREATE TABLE public.visits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id text NOT NULL,
  path text,
  lang text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.visits TO service_role;
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text,
  email text,
  phone text,
  plan text,
  lang text,
  details jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.payments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id text,
  amount numeric,
  currency text,
  email text,
  plan text,
  lang text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_visits_created_at ON public.visits (created_at);
CREATE INDEX idx_visits_visitor_id ON public.visits (visitor_id);
CREATE INDEX idx_leads_created_at ON public.leads (created_at);
CREATE INDEX idx_payments_created_at ON public.payments (created_at);