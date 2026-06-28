import { createFileRoute } from "@tanstack/react-router";

// Stripe webhook endpoint — the reliable, server-side source of truth for
// successful subscriptions. Stripe calls this URL directly, so it does NOT
// depend on the user reaching the /thank-you page. The signature is verified
// with STRIPE_WEBHOOK_SECRET before anything is recorded.
//
// Configure in the Stripe Dashboard → Developers → Webhooks:
//   Endpoint URL: https://YOUR-DOMAIN/api/public/stripe-webhook
//   Events:       checkout.session.completed
//
// Web Crypto (crypto.subtle) is used so verification works on Node and edge
// runtimes alike. No external dependency / Stripe SDK required.

const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let out = "";
  for (let i = 0; i < bytes.length; i++) {
    out += bytes[i].toString(16).padStart(2, "0");
  }
  return out;
}

// Constant-time comparison of two equal-length hex strings.
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

async function verifyStripeSignature(
  rawBody: string,
  sigHeader: string,
  secret: string,
  toleranceSeconds = 300,
): Promise<boolean> {
  const items = sigHeader.split(",").map((part) => part.split("="));
  const timestamp = items.find(([k]) => k === "t")?.[1];
  const signatures = items.filter(([k]) => k === "v1").map(([, v]) => v);
  if (!timestamp || signatures.length === 0) return false;

  // Reject events outside the tolerance window to prevent replay attacks.
  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > toleranceSeconds) return false;

  const signedPayload = `${timestamp}.${rawBody}`;
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, encoder.encode(signedPayload));
  const expected = toHex(mac);
  return signatures.some((sig) => timingSafeEqual(sig, expected));
}

export const Route = createFileRoute("/api/public/stripe-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!secret) {
          console.error("STRIPE_WEBHOOK_SECRET is not configured");
          return Response.json(
            { error: "Webhook secret not configured" },
            { status: 500 },
          );
        }

        const sigHeader = request.headers.get("stripe-signature");
        const rawBody = await request.text();
        if (!sigHeader) {
          return Response.json({ error: "Missing signature" }, { status: 400 });
        }

        const valid = await verifyStripeSignature(rawBody, sigHeader, secret);
        if (!valid) {
          console.error("stripe webhook signature verification failed");
          return Response.json({ error: "Invalid signature" }, { status: 400 });
        }

        let event: Record<string, any>;
        try {
          event = JSON.parse(rawBody);
        } catch {
          return Response.json({ error: "Invalid payload" }, { status: 400 });
        }

        // Acknowledge non-payment events quickly; Stripe only needs a 2xx.
        if (event.type !== "checkout.session.completed") {
          return Response.json({ received: true });
        }

        try {
          const session = (event.data?.object ?? {}) as Record<string, any>;
          const metadata = (session.metadata ?? {}) as Record<string, string>;
          const orderId =
            (session.client_reference_id as string) || metadata.order_id || null;
          const email =
            session.customer_details?.email || session.customer_email || null;
          const amount =
            typeof session.amount_total === "number"
              ? session.amount_total / 100
              : null;
          const currency = session.currency
            ? String(session.currency).toUpperCase()
            : "USD";
          const plan = metadata.plan ?? null;
          const lang = metadata.lang ?? null;

          const { getAdmin, sendTelegramMessage, buildPaymentMessage } =
            await import("@/lib/notifications.server");
          const admin = getAdmin();

          // Idempotency: a webhook can be delivered more than once, and the
          // /thank-you page may have already recorded this order.
          if (orderId) {
            const { data: existing } = await admin
              .from("payments")
              .select("id")
              .eq("order_id", orderId)
              .maybeSingle();
            if (existing) {
              return Response.json({ received: true, duplicate: true });
            }
          }

          await admin.from("payments").insert({
            order_id: orderId,
            amount,
            currency: currency.slice(0, 10),
            email: email ? String(email).slice(0, 200) : null,
            plan: plan ? String(plan).slice(0, 20) : null,
            lang: lang ? String(lang).slice(0, 30) : null,
          });

          const now = new Date();
          await sendTelegramMessage(
            await buildPaymentMessage({
              order_id: orderId,
              amount,
              currency,
              email,
              plan,
              lang,
              date: now.toLocaleDateString("ru-RU"),
              time: now.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }),
          );

          return Response.json({ received: true });
        } catch (err) {
          console.error("stripe webhook handler error", err);
          // Return 500 so Stripe retries delivery.
          return Response.json({ error: "Handler error" }, { status: 500 });
        }
      },
    },
  },
});
