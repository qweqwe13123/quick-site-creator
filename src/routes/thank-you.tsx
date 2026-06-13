import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/thank-you")({
  validateSearch: (search: Record<string, unknown>) => ({
    lang: typeof search.lang === "string" ? (search.lang as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Thank you — Trabajo Listo" },
      { name: "description", content: "Thank you for your payment." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYou,
});

type Lang = "en" | "es";

const T = {
  en: {
    title: "Thank you for your payment!",
    body: "We have successfully received it. We will contact you within 24 hours with the next steps.",
    button: "Back to home",
    home: "/",
  },
  es: {
    title: "¡Gracias por tu pago!",
    body: "Lo hemos recibido con éxito. Nos pondremos en contacto contigo en 24 horas con los próximos pasos.",
    button: "Volver al inicio",
    home: "/es",
  },
} as const;

function detectLang(explicit?: string): Lang {
  if (explicit === "es" || explicit === "en") return explicit;
  if (typeof window !== "undefined") {
    // Referrer-based detection (came from /es/...)
    try {
      const ref = document.referrer ? new URL(document.referrer) : null;
      if (ref && ref.pathname.startsWith("/es")) return "es";
    } catch {}
    // Stored preference
    const stored = localStorage.getItem("lang");
    if (stored === "es" || stored === "en") return stored;
    // Browser language
    if ((navigator.language || "").toLowerCase().startsWith("es")) return "es";
  }
  return "en";
}

function ThankYou() {
  const { lang: langParam } = Route.useSearch();
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    setLang(detectLang(langParam));
  }, [langParam]);

  const t = T[lang];

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
        padding: "2rem",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 560,
          width: "100%",
          background: "white",
          borderRadius: 24,
          padding: "3rem 2.5rem",
          boxShadow: "0 20px 60px -20px rgba(2, 32, 71, 0.25)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "#22c55e",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
            margin: "0 auto 1.5rem",
            fontWeight: 700,
          }}
          aria-hidden
        >
          ✓
        </div>
        <h1 style={{ fontSize: "2rem", margin: "0 0 1rem", color: "#0f172a" }}>
          {t.title}
        </h1>
        <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: 1.6, margin: "0 0 2rem" }}>
          {t.body}
        </p>
        <Link
          to={t.home}
          style={{
            display: "inline-block",
            background: "#0c4a6e",
            color: "white",
            padding: "0.85rem 2rem",
            borderRadius: 12,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          {t.button}
        </Link>
      </div>
    </main>
  );
}
