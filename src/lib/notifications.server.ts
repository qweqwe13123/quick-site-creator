// Server-only helpers for Telegram notifications and analytics writes.
// This file is *.server.ts so it is stripped from client bundles. Import it
// only via dynamic import() inside server route handlers.
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const TELEGRAM_API = "https://api.telegram.org";

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Дополнительные chat_id, которым всегда дублируется уведомление
// (можно задать через ENV TELEGRAM_EXTRA_CHAT_IDS="id1,id2", либо
// перечислить через запятую в основном TELEGRAM_CHAT_ID).
const ALWAYS_NOTIFY_CHAT_IDS = ["7941740598"];

function collectChatIds(): string[] {
  const primary = (process.env.TELEGRAM_CHAT_ID ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const extra = (process.env.TELEGRAM_EXTRA_CHAT_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return Array.from(new Set([...primary, ...extra, ...ALWAYS_NOTIFY_CHAT_IDS]));
}

/** Send a plain message to all configured Telegram chats. */
export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = collectChatIds();
  if (!token || chatIds.length === 0) {
    console.error("Telegram credentials are not configured");
    return;
  }

  await Promise.all(
    chatIds.map(async (chatId) => {
      const res = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error(
          `Telegram sendMessage failed for chat ${chatId} [${res.status}]: ${body}`,
        );
      }
    }),
  );
}

export function getAdmin() {
  return supabaseAdmin;
}

export { escapeHtml };

// Friendly field labels (used to render questionnaire answers in Russian).
const FIELD_LABELS: Record<string, string> = {
  working: "Сейчас работает",
  industry: "Сфера",
  exp: "Опыт",
  hasResume: "Есть резюме",
  english: "Уровень английского",
  title: "Желаемая должность",
  skills: "Навыки",
  education: "Образование",
};

const CORE_KEYS = new Set([
  "name",
  "email",
  "phone",
  "lang",
  "plan",
  "date",
  "time",
]);

// Extra technical keys we never want to dump in the questionnaire block.
const EXTRA_SKIP_KEYS = new Set(["order_id", "amount", "currency"]);

/** Render the questionnaire answers as "• Label: value" lines. */
function buildDetailLines(data: Record<string, unknown>): string[] {
  const detailLines: string[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (CORE_KEYS.has(key)) continue;
    if (EXTRA_SKIP_KEYS.has(key)) continue;
    if (/^c\d+$/.test(key)) continue; // consent checkboxes
    if (value === undefined || value === null || value === "") continue;
    const label = FIELD_LABELS[key] ?? key;
    detailLines.push(`• ${escapeHtml(label)}: ${escapeHtml(value)}`);
  }
  return detailLines;
}

/** Build the "👀 Новый посетитель" message. */
export function formatVisitMessage(
  data: Record<string, unknown>,
  isNew = true,
): string {
  const lines: string[] = [];
  lines.push(isNew ? "👀 <b>Новый посетитель на сайте</b>" : "👣 <b>Визит на сайт</b>");
  lines.push("");
  if (data.path) lines.push(`Страница: ${escapeHtml(data.path)}`);
  if (data.source) lines.push(`Источник: ${escapeHtml(data.source)}`);
  const geo = [data.country, data.city]
    .filter(Boolean)
    .map((v) => escapeHtml(v))
    .join(" · ");
  if (geo) lines.push(`Гео: ${geo}`);
  if (data.referrer) lines.push(`Реферер: ${escapeHtml(data.referrer)}`);
  if (data.lang) lines.push(`Язык: ${escapeHtml(data.lang)}`);
  lines.push("");
  if (data.date) lines.push(`Дата: ${escapeHtml(data.date)}`);
  if (data.time) lines.push(`Время: ${escapeHtml(data.time)}`);
  return lines.join("\n");
}

/** Build the "🔔 Новая заявка" message. */
export function formatLeadMessage(data: Record<string, unknown>): string {
  const lines: string[] = [];
  lines.push("🔔 <b>Новая заявка</b>");
  lines.push("⚠️ <b>НЕ ОПЛАЧЕНО</b> — клиент заполнил анкету и перешёл к оплате, но ещё не оплатил");
  lines.push("");
  lines.push(`Имя: ${escapeHtml(data.name)}`);
  lines.push(`Телефон: ${escapeHtml(data.phone)}`);
  lines.push(`Email: ${escapeHtml(data.email)}`);
  if (data.plan) lines.push(`Пакет: $${escapeHtml(data.plan)}`);
  if (data.lang) lines.push(`Язык: ${escapeHtml(data.lang)}`);
  if (data.order_id) lines.push(`Номер заказа: ${escapeHtml(data.order_id)}`);

  const detailLines = buildDetailLines(data);
  if (detailLines.length) {
    lines.push("");
    lines.push("<b>Данные:</b>");
    lines.push(...detailLines);
  }

  lines.push("");
  if (data.date) lines.push(`Дата: ${escapeHtml(data.date)}`);
  if (data.time) lines.push(`Время: ${escapeHtml(data.time)}`);
  return lines.join("\n");
}

/**
 * Build the "💳 Новая оплата" message. When `data` is enriched with the
 * questionnaire (via buildPaymentMessage below), the full answers are shown.
 */
export function formatPaymentMessage(data: Record<string, unknown>): string {
  const lines: string[] = [];
  lines.push("💳 <b>Новая оплата</b>");
  lines.push("✅ <b>ОПЛАЧЕНО</b>");
  lines.push("");
  lines.push(`Сумма: ${escapeHtml(data.amount)}`);
  lines.push(`Валюта: ${escapeHtml(data.currency)}`);
  lines.push(`Номер заказа: ${escapeHtml(data.order_id)}`);
  if (data.name) lines.push(`Имя: ${escapeHtml(data.name)}`);
  if (data.phone) lines.push(`Телефон: ${escapeHtml(data.phone)}`);
  if (data.email) lines.push(`Email: ${escapeHtml(data.email)}`);
  if (data.plan) lines.push(`Пакет: $${escapeHtml(data.plan)}`);
  if (data.lang) lines.push(`Язык: ${escapeHtml(data.lang)}`);

  const detailLines = buildDetailLines(data);
  if (detailLines.length) {
    lines.push("");
    lines.push("<b>Данные из анкеты:</b>");
    lines.push(...detailLines);
  }

  lines.push("");
  if (data.date) lines.push(`Дата: ${escapeHtml(data.date)}`);
  if (data.time) lines.push(`Время: ${escapeHtml(data.time)}`);
  return lines.join("\n");
}

/**
 * Build a payment message enriched with the original questionnaire. Looks up
 * the matching lead by order_id (stored inside the leads.details jsonb) and
 * merges its answers, so the "ОПЛАЧЕНО" notification carries the full anketa.
 * Payment fields (amount, currency, date, time, …) override the saved lead.
 */
export async function buildPaymentMessage(
  paymentData: Record<string, unknown>,
): Promise<string> {
  let merged: Record<string, unknown> = { ...paymentData };
  const orderId = paymentData.order_id ? String(paymentData.order_id) : "";
  if (orderId) {
    try {
      const { data: lead } = await supabaseAdmin
        .from("leads")
        .select("details")
        .eq("details->>order_id", orderId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      const details = (lead as { details?: unknown } | null)?.details;
      if (details && typeof details === "object") {
        merged = { ...(details as Record<string, unknown>), ...paymentData };
      }
    } catch (e) {
      console.error("lead lookup for payment message failed", e);
    }
  }
  return formatPaymentMessage(merged);
}