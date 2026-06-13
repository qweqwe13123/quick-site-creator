import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import innerHtml from "../site-clone/inner.html?raw";
import scriptText from "../site-clone/script.js?raw";

export const Route = createFileRoute("/application")({
  head: () => ({
    meta: [
      { title: "Application — Trabajo Listo" },
      { name: "description", content: "Start your application with Trabajo Listo." },
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
  component: ApplicationPage,
});

function ApplicationPage() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    try {
      // eslint-disable-next-line no-new-func
      new Function(scriptText)();
    } catch (err) {
      console.error("site-clone script error", err);
    }
    // Auto-open the wizard form
    setTimeout(() => {
      const btn = document.querySelector<HTMLElement>("[data-open-form]");
      btn?.click();
    }, 50);
  }, []);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: innerHtml }} />;
}
