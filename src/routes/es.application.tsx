import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import innerHtml from "../site-clone/inner.es.html?raw";
import scriptText from "../site-clone/script.es.js?raw";

export const Route = createFileRoute("/es/application")({
  head: () => ({
    meta: [
      { title: "Solicitud — Trabajo Listo" },
      { name: "description", content: "Inicia tu solicitud con Trabajo Listo." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Public+Sans:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: AppEs,
});

function AppEs() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    try {
      // eslint-disable-next-line no-new-func
      new Function(scriptText)();
    } catch (err) {
      console.error("site-clone-es script error", err);
    }
    setTimeout(() => {
      const btn = document.querySelector<HTMLElement>("[data-open-form]");
      btn?.click();
    }, 50);
  }, []);
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: innerHtml }} />;
}
