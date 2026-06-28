import { createFileRoute } from "@tanstack/react-router";

// Records a generic analytics event (button click, form step, etc.)
export const Route = createFileRoute("/api/public/event")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json().catch(() => ({}))) as {
            visitor_id?: string;
            event_name?: string;
            path?: string;
            payload?: Record<string, unknown>;
          };
          const eventName = String(body.event_name ?? "").slice(0, 100);
          if (!eventName) {
            return Response.json({ ok: false, error: "missing event_name" }, { status: 400 });
          }
          const { getAdmin } = await import("@/lib/notifications.server");
          await getAdmin().from("analytics_events").insert({
            visitor_id: body.visitor_id ? String(body.visitor_id).slice(0, 100) : null,
            event_name: eventName,
            path: body.path ? String(body.path).slice(0, 300) : null,
            payload: body.payload ? JSON.parse(JSON.stringify(body.payload)) : null,
          });
          return Response.json({ ok: true });
        } catch (err) {
          console.error("event error", err);
          return Response.json({ ok: false }, { status: 500 });
        }
      },
    },
  },
});
