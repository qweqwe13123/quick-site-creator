// Server-only helper for TikTok Events API (server-side pixel events).
// Docs: https://business-api.tiktok.com/portal/docs?id=1741601162187777
import { createHash } from "crypto";

const PIXEL_ID = "D8OO37JC77UDGHEUK3N0";
// Access token can be overridden by env var TIKTOK_ACCESS_TOKEN.
const FALLBACK_ACCESS_TOKEN = "214a73d0001c7d91db41ed94dd65fd1cc4cedfaf";
const ENDPOINT = "https://business-api.tiktok.com/open_api/v1.3/event/track/";

function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export interface TikTokEventInput {
  event: "CompleteRegistration" | "CompletePayment" | "SubmitForm" | "Lead" | string;
  eventId?: string;
  email?: string | null;
  phone?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  url?: string | null;
  value?: number | null;
  currency?: string | null;
}

export async function sendTikTokEvent(input: TikTokEventInput): Promise<void> {
  const token = process.env.TIKTOK_ACCESS_TOKEN || FALLBACK_ACCESS_TOKEN;
  if (!token) {
    console.error("TikTok access token is not configured");
    return;
  }

  const user: Record<string, string> = {};
  if (input.email) user.email = sha256(String(input.email));
  if (input.phone) {
    // E.164-ish: strip everything except digits/plus
    const normalized = String(input.phone).replace(/[^0-9+]/g, "");
    if (normalized) user.phone = sha256(normalized);
  }
  if (input.ip) user.ip = input.ip;
  if (input.userAgent) user.user_agent = input.userAgent;

  const properties: Record<string, unknown> = {};
  if (input.value != null) properties.value = input.value;
  if (input.currency) properties.currency = input.currency;

  const payload = {
    event_source: "web",
    event_source_id: PIXEL_ID,
    data: [
      {
        event: input.event,
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId || `${input.event}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        user,
        properties,
        page: input.url ? { url: input.url } : undefined,
      },
    ],
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": token,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`TikTok Events API failed [${res.status}]: ${body}`);
      return;
    }
    const json = (await res.json().catch(() => null)) as { code?: number; message?: string } | null;
    if (json && json.code !== 0) {
      console.error(`TikTok Events API error: ${json.code} ${json.message}`);
    }
  } catch (err) {
    console.error("TikTok Events API request failed", err);
  }
}
