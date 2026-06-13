import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Trabajo Listo" },
      { name: "description", content: "Terms governing your use of Trabajo Listo's website and services." },
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
          <Link to="/" className="flex items-center gap-2">
            <img src="/assets/trabajo-listo-logo.png" alt="Trabajo Listo" className="h-9 w-auto object-contain" />
            <span className="font-semibold text-zinc-900">Trabajo Listo</span>
          </Link>
          <Link to="/" className="text-sm text-zinc-600 hover:text-zinc-900">← Back to home</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-semibold text-zinc-900 mb-2 tracking-tight">Terms of Use</h1>
        <p className="text-sm text-zinc-500 mb-10">Last Updated: June 2026</p>
        <p className="text-zinc-700 leading-relaxed mb-8 text-[15px]">
          Welcome to Trabajo Listo. By accessing or using our website and services, you agree to be bound by these Terms of Use.
        </p>

        <Section title="1. Our Services">
          <p>Trabajo Listo provides professional resume reviews, resume writing services, interview preparation assistance, career guidance, and job search support.</p>
          <p>We are NOT an employment agency, recruiting agency, staffing agency, or job placement service.</p>
          <p>We do not offer employment opportunities and do not guarantee interviews, job offers, promotions, salary increases, or employment outcomes.</p>
        </Section>

        <Section title="2. Eligibility">
          <p>You must be at least 18 years old to use our services.</p>
          <p>By using our services, you confirm that the information you provide is accurate and truthful.</p>
        </Section>

        <Section title="3. Payments">
          <p>All prices are displayed in U.S. Dollars (USD).</p>
          <p>Payment is required before work begins.</p>
          <p>Once work has started on a purchased service, fees are generally non-refundable except where required by applicable law.</p>
        </Section>

        <Section title="4. Client Responsibilities">
          <p>You are responsible for providing accurate information, employment history, education details, certifications, and other materials needed to complete your order.</p>
          <p>Trabajo Listo is not responsible for inaccuracies resulting from incomplete or incorrect information provided by the client.</p>
        </Section>

        <Section title="5. No Employment Guarantee">
          <p>Trabajo Listo does not guarantee:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Job offers</li>
            <li>Interviews</li>
            <li>Employment</li>
            <li>Promotions</li>
            <li>Salary increases</li>
            <li>Immigration benefits</li>
            <li>Visa sponsorship</li>
          </ul>
          <p>Career outcomes depend on many factors outside our control.</p>
        </Section>

        <Section title="6. Intellectual Property">
          <p>All content on this website, including text, graphics, branding, logos, and materials, is the property of Trabajo Listo and may not be copied or distributed without permission.</p>
          <p>Clients retain ownership of their personal information and employment history.</p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>To the maximum extent permitted by law, Trabajo Listo shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our services.</p>
          <p>Our total liability shall not exceed the amount paid by the client for the specific service purchased.</p>
        </Section>

        <Section title="8. Termination">
          <p>We reserve the right to refuse service or terminate access to our services if a user violates these Terms.</p>
        </Section>

        <Section title="9. Changes to These Terms">
          <p>We may update these Terms from time to time. Updates become effective when posted on this website.</p>
        </Section>

        <Section title="10. Contact Information">
          <p>If you have questions regarding these Terms, please contact us through the contact information provided on our website.</p>
        </Section>
      </main>
      <footer className="border-t border-zinc-200 py-8 text-center text-xs text-zinc-500">
        © 2024 Trabajo Listo
      </footer>
    </div>
  );
}
