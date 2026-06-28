import { createFileRoute } from "@tanstack/react-router";

// Records a successful payment and sends a Telegram notification.
// Idempotent on order_id so a page refresh won't duplicate the notification.
export const Route = createFileRoute("/api/public/payment")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const data = (await request.json().catch(() => ({}))) as Record<string, unknown>;
          const orderId = data.order_id ? String(data.order_id).slice(0, 100) : null;

          const { getAdmin, sendTelegramMessage, buildPaymentMessage } = await import(
            "@/lib/notifications.server"
          );
          const admin = getAdmin();

          if (orderId) {
            const { data: existing } = await admin
              .from("payments")
              .select("id")
              .eq("order_id", orderId)
              .maybeSingle();
            if (existing) {
              return Response.json({ ok: true, duplicate: true });
            }
          }

          await admin.from("payments").insert({
            order_id: orderId,
            amount: data.amount != null ? Number(data.amount) : null,
            currency: data.currency ? String(data.currency).slice(0, 10) : null,
            email: data.email ? String(data.email).slice(0, 200) : null,
            plan: data.plan ? String(data.plan).slice(0, 20) : null,
            lang: data.lang ? String(data.lang).slice(0, 30) : null,
          });

          await sendTelegramMessage(await buildPaymentMessage(data));

          // Server-side TikTok Events API
          try {
            const { sendTikTokEvent } = await import("@/lib/tiktok-events.server");
            await sendTikTokEvent({
              event: "CompletePayment",
              email: data.email ? String(data.email) : null,
              ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
              userAgent: request.headers.get("user-agent"),
              url: request.headers.get("referer"),
              value: data.amount != null ? Number(data.amount) : null,
              currency: data.currency ? String(data.currency) : "USD",
              eventId: orderId ? `payment-${orderId}` : undefined,
            });
          } catch (e) {
            console.error("tiktok payment event failed", e);
          }

          return Response.json({ ok: true });
        } catch (err) {
          console.error("payment error", err);
          return Response.json({ ok: false }, { status: 500 });
        }
      },
    },
  },
});