import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/es/privacy")({
  head: () => ({
    meta: [
      { title: "Política de Privacidad — Trabajo Listo" },
      { name: "description", content: "Cómo Trabajo Listo recopila, usa y protege tu información personal." },
    ],
  }),
  component: PrivacyPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-zinc-900 mb-3">{title}</h2>
      <div className="text-zinc-700 leading-relaxed space-y-3 text-[15px]">{children}</div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}>
      <header className="border-b border-zinc-200">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/es" className="flex items-center gap-2">
            <img src="/assets/trabajo-listo-logo.png" alt="Trabajo Listo" className="h-9 w-auto object-contain" />
            <span className="font-semibold text-zinc-900">Trabajo Listo</span>
          </Link>
          <Link to="/es" className="text-sm text-zinc-600 hover:text-zinc-900">← Volver al inicio</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-semibold text-zinc-900 mb-2 tracking-tight">Política de Privacidad</h1>
        <p className="text-sm text-zinc-500 mb-10">Última actualización: junio de 2024</p>
        <p className="text-zinc-700 leading-relaxed mb-8 text-[15px]">
          Trabajo Listo respeta tu privacidad y se compromete a proteger tu información personal.
        </p>

        <Section title="1. Información que recopilamos">
          <p>Podemos recopilar:</p>
          <p className="font-semibold">Información personal</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nombre</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Estado de residencia</li>
            <li>Historial laboral</li>
            <li>Información educativa</li>
            <li>Archivos de currículum</li>
            <li>Información enviada a través de formularios o cuestionarios</li>
          </ul>
        </Section>

        <Section title="2. Cómo usamos tu información">
          <p>Utilizamos tu información para:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Proporcionar servicios de currículum y carrera</li>
            <li>Procesar pagos</li>
            <li>Comunicarnos contigo sobre tu pedido</li>
            <li>Mejorar nuestros servicios</li>
            <li>Responder a consultas de clientes</li>
            <li>Mantener la seguridad del sitio web</li>
          </ul>
        </Section>

        <Section title="3. Procesamiento de pagos">
          <p>Los pagos se procesan a través de proveedores de pago externos seguros.</p>
          <p>Trabajo Listo no almacena información completa de tarjetas de crédito en sus servidores.</p>
        </Section>

        <Section title="4. Compartir información">
          <p>No vendemos tu información personal.</p>
          <p>Podemos compartir información con proveedores de servicios de confianza que ayudan a operar nuestro negocio, incluyendo:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Procesadores de pago</li>
            <li>Proveedores de almacenamiento en la nube</li>
            <li>Plataformas de atención al cliente</li>
            <li>Proveedores de análisis de sitios web</li>
          </ul>
          <p>Estos proveedores solo pueden utilizar la información según sea necesario para realizar sus servicios.</p>
        </Section>

        <Section title="5. Almacenamiento y seguridad de datos">
          <p>Tomamos medidas administrativas, técnicas y organizativas razonables para proteger tu información.</p>
          <p>Sin embargo, ningún método de transmisión por internet o almacenamiento electrónico es completamente seguro.</p>
        </Section>

        <Section title="6. Currículum y documentos cargados">
          <p>Cualquier currículum, historial laboral o documento cargado en nuestra plataforma se utiliza únicamente para proporcionar los servicios solicitados.</p>
          <p>No compartiremos públicamente tus documentos sin tu consentimiento.</p>
        </Section>

        <Section title="7. Cookies">
          <p>Nuestro sitio web puede utilizar cookies y tecnologías similares para mejorar la experiencia del usuario y analizar el tráfico del sitio web.</p>
          <p>Puedes desactivar las cookies a través de la configuración de tu navegador.</p>
        </Section>

        <Section title="8. Tus derechos">
          <p>Dependiendo de tu ubicación, puedes tener derecho a:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Acceder a tus datos personales</li>
            <li>Corregir información inexacta</li>
            <li>Solicitar la eliminación de información personal</li>
            <li>Retirar el consentimiento cuando corresponda</li>
          </ul>
          <p>Para realizar una solicitud, contáctanos usando la información de nuestro sitio web.</p>
        </Section>

        <Section title="9. Privacidad de menores">
          <p>Nuestros servicios no están destinados a personas menores de 18 años.</p>
          <p>No recopilamos a sabiendas información de menores.</p>
        </Section>

        <Section title="10. Cambios a esta política">
          <p>Podemos actualizar esta Política de Privacidad periódicamente. Cualquier cambio se publicará en esta página.</p>
        </Section>

        <Section title="11. Contáctanos">
          <p>Si tienes preguntas sobre esta Política de Privacidad o tu información personal, contáctanos a través de los datos disponibles en nuestro sitio web.</p>
        </Section>
      </main>
      <footer className="border-t border-zinc-200 py-8 text-center text-xs text-zinc-500">
        © 2024 Trabajo Listo
      </footer>
    </div>
  );
}
