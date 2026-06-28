import { createFileRoute, Link } from "@tanstack/react-router";

const WHATSAPP = "https://wa.me/12065614159";
const PHONE_DISPLAY = "+1 (206) 561-4159";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Mytalora — AI Finds Jobs. We Handle Applies For You." },
      { name: "description", content: "Talk to us on WhatsApp. We reply fast." },
      { property: "og:title", content: "Mytalora — AI Finds Jobs. We Handle Applies For You." },
      { property: "og:description", content: "Talk to us on WhatsApp. We reply fast." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-neutral-50 to-sky-50 font-sans antialiased">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/assets/mytalora-logo.png" alt="Mytalora" className="h-10 w-auto object-contain" />
            <span className="font-semibold tracking-tight text-lg">Mytalora</span>
          </Link>
          <Link to="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">← Back home</Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white ring-1 ring-emerald-200 rounded-full px-4 py-1.5 text-xs font-semibold text-emerald-700 mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Online now · Replies within minutes
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight mb-4">
            Let's talk on <span className="text-emerald-600">WhatsApp</span>
          </h1>
          <p className="text-lg text-zinc-600 max-w-xl mx-auto">
            Got a question about your resume, our process, or pricing? Send us a message — we're here to help.
          </p>
        </div>

        <div className="bg-white rounded-3xl ring-1 ring-zinc-200 shadow-2xl shadow-emerald-500/10 p-8 md:p-12">
          <div className="flex flex-col items-center text-center">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-xl shadow-emerald-500/40 hover:scale-110 transition-transform mb-6"
              aria-label="Open WhatsApp chat"
            >
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30"></span>
              <svg className="w-14 h-14 md:w-16 md:h-16 text-white relative" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>
              </svg>
            </a>

            <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Our WhatsApp number</div>
            <div className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-8">{PHONE_DISPLAY}</div>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white py-4 px-8 rounded-xl font-semibold text-base shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>
              </svg>
              Open WhatsApp chat
            </a>

            <div className="mt-10 pt-8 border-t border-zinc-100 w-full grid sm:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Response time</div>
                <div className="font-semibold text-zinc-900">Within minutes</div>
              </div>
              <div>
                <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Languages</div>
                <div className="font-semibold text-zinc-900">English · Español</div>
              </div>
              <div>
                <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Hours</div>
                <div className="font-semibold text-zinc-900">Mon–Sat, 9am–9pm PT</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
