import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import innerHtml from "../site-clone/inner.es.html?raw";
import scriptText from "../site-clone/script.es.js?raw";

export const Route = createFileRoute("/es/")({
  head: () => ({
    meta: [
      { title: "Trabajo Listo — Currículums americanos para hispanohablantes en EE. UU." },
      {
        name: "description",
        content:
          "Ayudamos a hispanohablantes en EE. UU. a construir currículums profesionales al estilo americano, prepararse para entrevistas y conseguir mejores trabajos.",
      },
      { property: "og:title", content: "Trabajo Listo — Tu carrera en EE. UU. empieza aquí" },
      {
        property: "og:description",
        content:
          "Currículums optimizados para ATS, preparación de entrevistas y estrategia de búsqueda de empleo para la comunidad hispana en EE. UU.",
      },
      { property: "og:type", content: "website" },
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
  component: IndexEs,
});

function IndexEs() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try { localStorage.setItem("tl-lang-chosen", "1"); } catch {}
    if (!ref.current) return;
    try {
      // eslint-disable-next-line no-new-func
      new Function(scriptText)();
    } catch (err) {
      console.error("site-clone-es script error", err);
    }
  }, []);
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: innerHtml }} />;
}
