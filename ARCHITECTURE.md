# Архитектура проекта (полностью автономная, без Lovable)

После этого изменения проект больше **не зависит** от платформы Lovable на уровне
кода и сборки. Его можно собрать и задеплоить где угодно: Vercel, Netlify, VPS,
Docker, Railway, Render.

---

## 1. Аудит зависимостей от Lovable

| Компонент   | Была ли зависимость от Lovable | Что сделано | Сложность | Риск |
|-------------|--------------------------------|-------------|-----------|------|
| **Frontend** (React 19 + TanStack Start) | Нет (обычный TanStack Start) | Без изменений | — | — |
| **Сборка / Vite** | ДА — плагин `@lovable.dev/vite-tanstack-config` | Заменён на стандартные плагины (`tanstackStart`, `viteReact`, `tailwindcss`, `tsConfigPaths`, `nitro`) в `vite.config.ts`. Пакет удалён из `package.json` | Средняя | Низкий (build проверен) |
| **Backend** (server routes / server fn) | Нет — это родной TanStack Start runtime | Без изменений | — | — |
| **Database** | Нет — это чистый Supabase Postgres | Без изменений | — | — |
| **Auth** | Не используется в проекте (это лендинг-воронка) | — | — | — |
| **Storage** | Не используется | — | — | — |
| **AI** | Не используется | — | — | — |
| **Deployment** | Конфиг сборки тянул Cloudflare-only через Lovable | `NITRO_PRESET` управляет целью: vercel / netlify / node-server | Низкая | Низкий |
| **Error reporting** | `src/lib/lovable-error-reporting.ts` зовёт `window.__lovableEvents` | Это **no-op** вне Lovable (безопасно). Можно удалить позже | Низкая | Нет |
| **Supabase client файлы** | Только строки в сообщениях об ошибках («Lovable Cloud») | Косметика, ключи берутся из `.env` | — | Нет |

**Скрытых внутренних API Lovable в рантайме приложения нет.** Единственная
зависимость была в инструменте сборки — она устранена.

---

## 2. Целевая архитектура (автономная)

```text
                 ┌─────────────────────────────────────┐
                 │            Браузер (SPA/SSR)         │
                 │   React 19 + TanStack Start (Vite)   │
                 └───────────────┬─────────────────────┘
                                 │ HTTPS (same-origin)
                 ┌───────────────▼─────────────────────┐
                 │   Server (Nitro) — деплой куда угодно │
                 │   Vercel / Netlify / VPS / Docker    │
                 │                                       │
                 │  src/routes/api/public/*  (HTTP)      │
                 │   • /track    — визиты                │
                 │   • /lead     — заполнил анкету       │
                 │   • /payment  — оплата                │
                 │   • /weekly-report — отчёт (cron)     │
                 └─────┬───────────────────────┬─────────┘
                       │                       │
        Supabase SDK   │                       │  fetch (HTTPS)
        (service role) │                       │
            ┌──────────▼──────────┐   ┌────────▼─────────────┐
            │  Supabase Postgres  │   │   Telegram Bot API    │
            │  leads / payments / │   │  (отдельный модуль,   │
            │  visits             │   │   токен из .env)      │
            └─────────────────────┘   └──────────────────────┘
```

- **Единственный backend-сервис:** Supabase (Postgres). Доступ только через
  официальный `@supabase/supabase-js`.
- **Все ключи — только через переменные окружения** (`.env`). Хардкодов нет.
- **Telegram — независимый модуль** (`src/lib/notifications.server.ts`), читает
  `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` из окружения.
- **Структура БД описана SQL-миграциями** в `supabase/migrations/`.

---

## 3. Переменные окружения

См. `.env.example`. Скопируйте в `.env` и заполните. Ничего не хардкодится.

| Переменная | Где используется | Секрет? |
|------------|------------------|---------|
| `VITE_SUPABASE_URL` / `SUPABASE_URL` | клиент / сервер | нет |
| `VITE_SUPABASE_PUBLISHABLE_KEY` / `SUPABASE_PUBLISHABLE_KEY` | клиент / сервер | нет (anon) |
| `SUPABASE_SERVICE_ROLE_KEY` | только сервер | **ДА** |
| `TELEGRAM_BOT_TOKEN` | только сервер | **ДА** |
| `TELEGRAM_CHAT_ID` | только сервер | нет |
| `NITRO_PRESET` | сборка | нет |

---

## 4. Telegram-бот

Уведомления уже шлются на каждом событии воронки:
- **`/api/public/lead`** — клиент заполнил анкету и дошёл до оплаты → сообщение
  с пометкой «⚠️ НЕ ОПЛАЧЕНО» и всеми данными анкеты.
- **`/api/public/payment`** — успешная оплата → «✅ ОПЛАЧЕНО» (идемпотентно по
  `order_id`).
- **`/api/public/weekly-report`** — недельная статистика (по расписанию).

Токен и chat_id хранятся только в `.env` (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`).

---

## 5. Пошаговый план миграции без потери данных

1. **Снять дамп текущей БД** (на всякий случай):
   `pg_dump "$SUPABASE_DB_URL" > backup.sql`
   *(на Lovable Cloud дамп недоступен — экспортируйте таблицы как CSV из вкладки
   Database, либо используйте Supabase-проект напрямую).*
2. **Создать/использовать собственный Supabase-проект.** Получить: Project URL,
   anon key, service_role key.
3. **Применить миграции** из `supabase/migrations/` к новому проекту
   (Supabase CLI: `supabase db push`, либо выполнить SQL вручную).
4. **Перенести данные** (если нужно): импортировать CSV/дамп в новые таблицы
   `leads`, `payments`, `visits`.
5. **Заполнить `.env`** значениями нового проекта + Telegram (см. `.env.example`).
6. **Локальная проверка:** `bun install && bun run build && bun run preview`.
7. **Деплой:**
   - **Vercel:** добавить env-переменные в Project Settings, `NITRO_PRESET=vercel`
     (уже в `vercel.json`). Deploy.
   - **Netlify:** env-переменные + `netlify.toml` (`NITRO_PRESET=netlify`).
   - **VPS / Docker / Railway / Render:** `NITRO_PRESET=node-server`,
     `bun run build`, запуск `node .output/server/index.mjs`.
8. **Cron для недельного отчёта:** настроить вызов
   `POST /api/public/weekly-report` (pg_cron в Supabase или внешний планировщик).
9. **Проверить Telegram:** отправить тестовую заявку → убедиться, что приходит
   сообщение.

---

## 6. Явный список зависимостей рантайма

- **Supabase** (Postgres + SDK) — backend.
- **Telegram Bot API** — уведомления.
- Всё остальное — обычные npm-пакеты (React, TanStack, Tailwind, Nitro, Vite).
- **Нет** зависимости от Lovable SDK или внутренних API в рантайме.
