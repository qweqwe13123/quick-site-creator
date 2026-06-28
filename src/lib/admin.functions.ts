import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

export const getAdminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const since30 = new Date(Date.now() - 30 * 86400_000).toISOString();

    const [leadsCount, visitorsCount, pageViewsCount, paymentsCount, recentLeads] =
      await Promise.all([
        supabaseAdmin.from("leads").select("*", { count: "exact", head: true }),
        supabaseAdmin.from("visitors").select("*", { count: "exact", head: true }),
        supabaseAdmin.from("page_views").select("*", { count: "exact", head: true }),
        supabaseAdmin.from("payments").select("*", { count: "exact", head: true }),
        supabaseAdmin
          .from("leads")
          .select("id, name, email, phone, plan, lang, created_at")
          .order("created_at", { ascending: false })
          .limit(20),
      ]);

    // Daily series for last 30 days
    const [{ data: visits30 }, { data: leads30 }, { data: pageViews30 }] = await Promise.all([
      supabaseAdmin.from("visits").select("created_at, visitor_id").gte("created_at", since30),
      supabaseAdmin.from("leads").select("created_at").gte("created_at", since30),
      supabaseAdmin.from("page_views").select("created_at").gte("created_at", since30),
    ]);

    const days: Record<string, { visitors: Set<string>; leads: number; views: number }> = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400_000).toISOString().slice(0, 10);
      days[d] = { visitors: new Set(), leads: 0, views: 0 };
    }
    for (const v of visits30 ?? []) {
      const d = (v.created_at as string).slice(0, 10);
      if (days[d]) days[d].visitors.add(v.visitor_id as string);
    }
    for (const l of leads30 ?? []) {
      const d = (l.created_at as string).slice(0, 10);
      if (days[d]) days[d].leads += 1;
    }
    for (const p of pageViews30 ?? []) {
      const d = (p.created_at as string).slice(0, 10);
      if (days[d]) days[d].views += 1;
    }
    const daily = Object.entries(days).map(([date, v]) => ({
      date,
      visitors: v.visitors.size,
      leads: v.leads,
      views: v.views,
    }));

    // Country / source breakdowns
    const { data: visitorRows } = await supabaseAdmin
      .from("visitors")
      .select("country, source")
      .limit(5000);
    const countries: Record<string, number> = {};
    const sources: Record<string, number> = {};
    for (const r of visitorRows ?? []) {
      const c = (r.country as string) || "—";
      countries[c] = (countries[c] ?? 0) + 1;
      const s = (r.source as string) || "direct";
      sources[s] = (sources[s] ?? 0) + 1;
    }

    const totalVisitors = visitorsCount.count ?? 0;
    const totalLeads = leadsCount.count ?? 0;
    const conversion = totalVisitors > 0 ? (totalLeads / totalVisitors) * 100 : 0;

    return {
      totals: {
        leads: totalLeads,
        visitors: totalVisitors,
        pageViews: pageViewsCount.count ?? 0,
        payments: paymentsCount.count ?? 0,
        conversion: Number(conversion.toFixed(2)),
      },
      daily,
      countries: Object.entries(countries)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([country, count]) => ({ country, count })),
      sources: Object.entries(sources)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([source, count]) => ({ source, count })),
      recentLeads: recentLeads.data ?? [],
    };
  });

export const isCurrentUserAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: Boolean(data), userId: context.userId };
  });
