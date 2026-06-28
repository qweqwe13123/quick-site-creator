import { createFileRoute } from "@tanstack/react-router";

// Sends a visitor-stats report to Telegram: today / 7 days / 30 days / all time
// plus top traffic sources. Designed to be triggered on a schedule (Supabase
// pg_cron, Vercel Cron, etc.) or on demand. Both GET and POST are accepted so
// simple cron services that only do GET requests work too.
//
// Auth: shared secret in WEEKLY_REPORT_SECRET, provided either as
//   Authorization: Bearer <secret>   or   ?secret=<secret>
//
// Examples:
//   curl "https://YOUR-DOMAIN/api/public/stats?secret=YOUR_SECRET"
//   curl -H "Authorization: Bearer YOUR_SECRET" https://YOUR-DOMAIN/api/public/stats

const DAY_MS = 24 * 60 * 60 * 1000;

function startOfTodayUTC(): string {
  const now = new Date();
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  ).toISOString();
}

async function buildAndSendReport(): Promise<{
  ok: boolean;
  data?: Record<string, number>;
}> {
  const { getAdmin, sendTelegramMessage, escapeHtml } = await import(
    "@/lib/notifications.server"
  );
  const admin = getAdmin();

  const todayISO = startOfTodayUTC();
  const since7 = new Date(Date.now() - 7 * DAY_MS).toISOString();
  const since30 = new Date(Date.now() - 30 * DAY_MS).toISOString();

  // Visit counts (head:true → count only, no rows transferred).
  const visitsCount = (col: string, value: string) =>
    admin
      .from("visits")
      .select("id", { count: "exact", head: true })
      .gte(col, value);
  // New unique visitors = rows added to the `visitors` table in the period.
  const newVisitors = (value: string) =>
    admin
      .from("visitors")
      .select("visitor_id", { count: "exact", head: true })
      .gte("first_seen_at", value);

  const [
    visitsToday,
    visits7,
    visits30,
    visitsAll,
    uniqueAll,
    newToday,
    new7,
    new30,
    sourcesRes,
  ] = await Promise.all([
    visitsCount("created_at", todayISO),
    visitsCount("created_at", since7),
    visitsCount("created_at", since30),
    admin.from("visits").select("id", { count: "exact", head: true }),
    admin.from("visitors").select("visitor_id", { count: "exact", head: true }),
    newVisitors(todayISO),
    newVisitors(since7),
    newVisitors(since30),
    // Top sources among visitors first seen in the last 30 days.
    admin
      .from("visitors")
      .select("source")
      .gte("first_seen_at", since30)
      .limit(5000),
  ]);

  const data = {
    visitsToday: visitsToday.count ?? 0,
    visits7: visits7.count ?? 0,
    visits30: visits30.count ?? 0,
    visitsAll: visitsAll.count ?? 0,
    uniqueAll: uniqueAll.count ?? 0,
    newToday: newToday.count ?? 0,
    new7: new7.count ?? 0,
    new30: new30.count ?? 0,
  };

  // Tally top traffic sources.
  const sourceCounts = new Map<string, number>();
  for (const row of (sourcesRes.data ?? []) as Array<{ source: string | null }>) {
    const src = row.source || "direct";
    sourceCounts.set(src, (sourceCounts.get(src) ?? 0) + 1);
  }
  const topSources = Array.from(sourceCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const lines = [
    "📊 <b>Статистика посетителей</b>",
    "",
    `Сегодня: <b>${escapeHtml(data.visitsToday)}</b> визитов · ${escapeHtml(data.newToday)} новых`,
    `За 7 дней: <b>${escapeHtml(data.visits7)}</b> визитов · ${escapeHtml(data.new7)} новых`,
    `За 30 дней: <b>${escapeHtml(data.visits30)}</b> визитов · ${escapeHtml(data.new30)} новых`,
    "",
    `Всего визитов: <b>${escapeHtml(data.visitsAll)}</b>`,
    `Всего уникальных посетителей: <b>${escapeHtml(data.uniqueAll)}</b>`,
  ];

  if (topSources.length) {
    lines.push("", "<b>Топ источников (30 дней):</b>");
    for (const [src, count] of topSources) {
      lines.push(`• ${escapeHtml(src)} — ${escapeHtml(count)}`);
    }
  }

  await sendTelegramMessage(lines.join("\n"));
  return { ok: true, data };
}

async function handle(request: Request): Promise<Response> {
  try {
    const expected = process.env.WEEKLY_REPORT_SECRET;
    if (!expected) {
      return Response.json(
        { ok: false, error: "WEEKLY_REPORT_SECRET is not configured" },
        { status: 503 },
      );
    }
    const auth = request.headers.get("authorization") ?? "";
    const url = new URL(request.url);
    const provided = auth.startsWith("Bearer ")
      ? auth.slice(7)
      : url.searchParams.get("secret") ?? "";
    if (provided !== expected) {
      return new Response("Unauthorized", { status: 401 });
    }

    const result = await buildAndSendReport();
    return Response.json(result);
  } catch (err) {
    console.error("stats report error", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}

export const Route = createFileRoute("/api/public/stats")({
  server: {
    handlers: {
      GET: async ({ request }) => handle(request),
      POST: async ({ request }) => handle(request),
    },
  },
});
