import { createFileRoute } from "@tanstack/react-router";

// Computes weekly stats and sends a report to Telegram.
// Triggered by a scheduled job (pg_cron) once per week.
export const Route = createFileRoute("/api/public/weekly-report")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          // Shared-secret auth: caller must present WEEKLY_REPORT_SECRET.
          const expected = process.env.WEEKLY_REPORT_SECRET;
          if (!expected) {
            return Response.json({ ok: false, error: "not configured" }, { status: 503 });
          }
          const auth = request.headers.get("authorization") ?? "";
          const url = new URL(request.url);
          const provided = auth.startsWith("Bearer ")
            ? auth.slice(7)
            : url.searchParams.get("secret") ?? "";
          if (provided !== expected) {
            return new Response("Unauthorized", { status: 401 });
          }
          const { getAdmin, sendTelegramMessage, escapeHtml } = await import(
            "@/lib/notifications.server"
          );
          const admin = getAdmin();
          const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

          const [visitsRes, leadsRes, paymentsRes, uniqueRes] = await Promise.all([
            admin.from("visits").select("id", { count: "exact", head: true }).gte("created_at", since),
            admin.from("leads").select("id", { count: "exact", head: true }).gte("created_at", since),
            admin.from("payments").select("id", { count: "exact", head: true }).gte("created_at", since),
            admin.from("visits").select("visitor_id").gte("created_at", since),
          ]);

          const visitors = visitsRes.count ?? 0;
          const leads = leadsRes.count ?? 0;
          const payments = paymentsRes.count ?? 0;
          const uniqueVisitors = new Set(
            (uniqueRes.data ?? []).map((r: any) => r.visitor_id),
          ).size;
          const conversion = uniqueVisitors > 0 ? (payments / uniqueVisitors) * 100 : 0;

          const text = [
            "📊 <b>Отчет за неделю</b>",
            "",
            `Посетителей: ${escapeHtml(visitors)}`,
            `Уникальных посетителей: ${escapeHtml(uniqueVisitors)}`,
            `Заявок: ${escapeHtml(leads)}`,
            `Оплат: ${escapeHtml(payments)}`,
            `Конверсия: ${escapeHtml(conversion.toFixed(1))}%`,
          ].join("\n");

          await sendTelegramMessage(text);
          return Response.json({ ok: true, visitors, uniqueVisitors, leads, payments });
        } catch (err) {
          console.error("weekly-report error", err);
          return Response.json({ ok: false }, { status: 500 });
        }
      },
    },
  },
});