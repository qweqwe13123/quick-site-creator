import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import innerHtml from "../site-clone/inner.html?raw";
import scriptText from "../site-clone/script.js?raw";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mytalora — AI Finds Jobs. We Handle Applies For You." },
      {
        name: "description",
        content:
          "Mytalora's AI handles every step of your job search—from building a professional resume and finding relevant opportunities to preparing for interviews and optimizing applications.",
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
