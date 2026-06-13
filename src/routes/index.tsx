import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import innerHtml from "../site-clone/inner.html?raw";
import scriptText from "../site-clone/script.js?raw";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trabajo Listo — American resumes for Hispanic professionals in the U.S." },
      {
        name: "description",
        content:
          "We help Hispanic professionals in the U.S. build American-style resumes, prepare for interviews, and find better jobs.",
      },
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
  component: IndexEn,
});

function IndexEn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // First-visit language preference: default to Spanish unless user already chose
    try {
      const chosen = localStorage.getItem("tl-lang-chosen");
      if (!chosen) {
        localStorage.setItem("tl-lang-chosen", "1");
        window.location.replace("/es");
        return;
      }
    } catch {}
    if (!ref.current) return;
    try {
      // eslint-disable-next-line no-new-func
      new Function(scriptText)();
    } catch (err) {
      console.error("site-clone script error", err);
    }
  }, []);
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: innerHtml }} />;
}
