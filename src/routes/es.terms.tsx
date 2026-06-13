import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/es/terms")({
  head: () => ({
    meta: [
      { title: "Términos de Uso — Trabajo Listo" },
      { name: "description", content: "Términos que rigen tu uso del sitio web y los servicios de Trabajo Listo." },
    ],
  }),
  component: TermsPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-zinc-900 mb-3">{title}</h2>
      <div className="text-zinc-700 leading-relaxed space-y-3 text-[15px]">{children}</div>
    </section>
  );
}

function TermsPage() {
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
        <h1 className="text-4xl font-semibold text-zinc-900 mb-2 tracking-tight">Términos de Uso</h1>
        <p className="text-sm text-zinc-500 mb-10">Última actualización: junio de 2024</p>
        <p className="text-zinc-700 leading-relaxed mb-8 text-[15px]">
          Bienvenido a Trabajo Listo. Al acceder o utilizar nuestro sitio web y servicios, aceptas estar sujeto a estos Términos de Uso.
        </p>

        <Section title="1. Nuestros servicios">
          <p>Trabajo Listo ofrece revisiones profesionales de currículums, servicios de redacción de currículums, asistencia en preparación de entrevistas, orientación profesional y apoyo en la búsqueda de empleo.</p>
          <p>NO somos una agencia de empleo, agencia de reclutamiento, agencia de personal ni servicio de colocación laboral.</p>
          <p>No ofrecemos oportunidades de empleo y no garantizamos entrevistas, ofertas de trabajo, promociones, aumentos salariales ni resultados laborales.</p>
        </Section>

        <Section title="2. Elegibilidad">
          <p>Debes tener al menos 18 años para usar nuestros servicios.</p>
          <p>Al usar nuestros servicios, confirmas que la información que proporcionas es precisa y veraz.</p>
        </Section>

        <Section title="3. Pagos">
          <p>Todos los precios se muestran en dólares estadounidenses (USD).</p>
          <p>El pago se requiere antes de comenzar el trabajo.</p>
          <p>Una vez iniciado el trabajo en un servicio adquirido, las tarifas generalmente no son reembolsables, excepto cuando la ley aplicable lo exija.</p>
        </Section>

        <Section title="4. Responsabilidades del cliente">
          <p>Eres responsable de proporcionar información precisa, historial laboral, detalles educativos, certificaciones y otros materiales necesarios para completar tu pedido.</p>
          <p>Trabajo Listo no es responsable de inexactitudes resultantes de información incompleta o incorrecta proporcionada por el cliente.</p>
        </Section>

        <Section title="5. Sin garantía de empleo">
          <p>Trabajo Listo no garantiza:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Ofertas de trabajo</li>
            <li>Entrevistas</li>
            <li>Empleo</li>
            <li>Promociones</li>
            <li>Aumentos salariales</li>
            <li>Beneficios migratorios</li>
            <li>Patrocinio de visa</li>
          </ul>
          <p>Los resultados profesionales dependen de muchos factores fuera de nuestro control.</p>
        </Section>

        <Section title="6. Propiedad intelectual">
          <p>Todo el contenido de este sitio web, incluyendo texto, gráficos, marca, logotipos y materiales, es propiedad de Trabajo Listo y no puede ser copiado o distribuido sin permiso.</p>
          <p>Los clientes conservan la propiedad de su información personal e historial laboral.</p>
        </Section>

        <Section title="7. Limitación de responsabilidad">
          <p>En la máxima medida permitida por la ley, Trabajo Listo no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos derivados del uso de nuestros servicios.</p>
          <p>Nuestra responsabilidad total no excederá el monto pagado por el cliente por el servicio específico adquirido.</p>
        </Section>

        <Section title="8. Terminación">
          <p>Nos reservamos el derecho de rechazar el servicio o terminar el acceso a nuestros servicios si un usuario viola estos Términos.</p>
        </Section>

        <Section title="9. Cambios a estos términos">
          <p>Podemos actualizar estos Términos de vez en cuando. Las actualizaciones entran en vigor al publicarse en este sitio web.</p>
        </Section>

        <Section title="10. Información de contacto">
          <p>Si tienes preguntas sobre estos Términos, contáctanos a través de la información de contacto proporcionada en nuestro sitio web.</p>
        </Section>
      </main>
      <footer className="border-t border-zinc-200 py-8 text-center text-xs text-zinc-500">
        © 2024 Trabajo Listo
      </footer>
    </div>
  );
}
