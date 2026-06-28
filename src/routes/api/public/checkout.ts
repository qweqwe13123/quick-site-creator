import { createFileRoute } from "@tanstack/react-router";

// Creates a Stripe Checkout Session for a weekly subscription plan.
// Maps internal plan keys -> Stripe Price IDs. Configure the real Price IDs via
// environment variables (recommended) — the hardcoded values are only fallbacks.
// NOTE: read env inside the handler so request-time bindings (e.g. Cloudflare)
// resolve correctly instead of returning undefined at module scope.
function getPriceIds(): Record<string, string> {
  return {
    "49": process.env.STRIPE_PRICE_STARTER || "price_1TlyUuPOGCcyNylacCWp27Uu", // AI JOB STARTER $19.99/week
    "249": process.env.STRIPE_PRICE_ASSISTANT || "price_1TlybOPOGCcyNylaSPq4hWfX", // AI JOB ASSISTANT $29.99/week
    "549": process.env.STRIPE_PRICE_PRO || "price_1TlycYPOGCcyNylawqENi8Xu", // AI CAREER PRO $49.99/week
  };
}

export const Route = createFileRoute("/api/public/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const secret = process.env.STRIPE_SECRET_KEY;
          if (!secret) {
            return Response.json(
              { error: "STRIPE_SECRET_KEY is not configured" },
              { status: 500 },
            );
          }

          const data = (await request.json().catch(() => ({}))) as Record<string, unknown>;
          const plan = String(data.plan ?? "");
          const priceId = getPriceIds()[plan];
          if (!priceId) {
            return Response.json({ error: "Unknown plan" }, { status: 400 });
          }

          const email = data.email ? String(data.email).slice(0, 200) : "";
          const orderId = data.order_id ? String(data.order_id).slice(0, 100) : "";
          const lang = data.lang === "es" ? "es" : "en";

          const origin =
            request.headers.get("origin") ||
            (() => {
              try {
                return new URL(request.url).origin;
              } catch {
                return "";
              }
            })();

          const successUrl = `${origin}/thank-you?lang=${lang}&session_id={CHECKOUT_SESSION_ID}`;
          const cancelUrl = lang === "es" ? `${origin}/es` : `${origin}/`;

          const body = new URLSearchParams();
          body.set("mode", "subscription");
          body.set("line_items[0][price]", priceId);
          body.set("line_items[0][quantity]", "1");
          body.set("success_url", successUrl);
          body.set("cancel_url", cancelUrl);
          body.set("allow_promotion_codes", "true");
          // 3-day free trial for the $19.99/week starter plan
          if (plan === "49") {
            body.set("subscription_data[trial_period_days]", "3");
            body.set("subscription_data[trial_settings][end_behavior][missing_payment_method]", "cancel");
            body.set("payment_method_collection", "always");
          }
          if (email) body.set("customer_email", email);
          if (orderId) {
            body.set("client_reference_id", orderId);
            body.set("metadata[order_id]", orderId);
            // Mirror onto the subscription so invoice.* webhook events can
            // identify the order without looking the session up again.
            body.set("subscription_data[metadata][order_id]", orderId);
          }
          body.set("metadata[plan]", plan);
          body.set("metadata[lang]", lang);
          body.set("subscription_data[metadata][plan]", plan);
          body.set("subscription_data[metadata][lang]", lang);
          body.set("locale", lang === "es" ? "es" : "en");

          const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${secret}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body.toString(),
          });

          const json = (await res.json()) as Record<string, unknown>;
          if (!res.ok) {
            console.error("stripe checkout error", json);
            const msg =
              (json.error && typeof json.error === "object" && (json.error as any).message) ||
              "Stripe error";
            return Response.json({ error: String(msg) }, { status: 500 });
          }

          return Response.json({ url: json.url, id: json.id });
        } catch (err) {
          console.error("checkout error", err);
          return Response.json({ error: "Internal error" }, { status: 500 });
        }
      },
    },
  },
});
