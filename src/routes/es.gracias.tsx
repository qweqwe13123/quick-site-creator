import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/es/gracias")({
  beforeLoad: () => {
    throw redirect({ to: "/thank-you", search: { lang: "es" } });
  },
});
