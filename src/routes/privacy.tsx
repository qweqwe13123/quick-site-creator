import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Trabajo Listo" },
      { name: "description", content: "How Trabajo Listo collects, uses, and protects your personal information." },
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
          <Link to="/" className="flex items-center gap-2">
            <img src="/assets/trabajo-listo-logo.png" alt="Trabajo Listo" className="h-9 w-auto object-contain" />
            <span className="font-semibold text-zinc-900">Trabajo Listo</span>
          </Link>
          <Link to="/" className="text-sm text-zinc-600 hover:text-zinc-900">← Back to home</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-semibold text-zinc-900 mb-2 tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-zinc-500 mb-10">Last Updated: June 2026</p>
        <p className="text-zinc-700 leading-relaxed mb-8 text-[15px]">
          Trabajo Listo respects your privacy and is committed to protecting your personal information.
        </p>

        <Section title="1. Information We Collect">
          <p>We may collect:</p>
          <p className="font-semibold">Personal Information</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>State of residence</li>
            <li>Employment history</li>
            <li>Education information</li>
            <li>Resume files</li>
            <li>Information submitted through forms or questionnaires</li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide resume and career services</li>
            <li>Process payments</li>
            <li>Communicate regarding your order</li>
            <li>Improve our services</li>
            <li>Respond to customer inquiries</li>
            <li>Maintain website security</li>
          </ul>
        </Section>

        <Section title="3. Payment Processing">
          <p>Payments are processed through secure third-party payment providers.</p>
          <p>Trabajo Listo does not store full credit card information on its servers.</p>
        </Section>

        <Section title="4. Information Sharing">
          <p>We do not sell your personal information.</p>
          <p>We may share information with trusted service providers who assist in operating our business, including:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Payment processors</li>
            <li>Cloud storage providers</li>
            <li>Customer support platforms</li>
            <li>Website analytics providers</li>
          </ul>
          <p>These providers may only use information as necessary to perform their services.</p>
        </Section>

        <Section title="5. Data Storage and Security">
          <p>We take reasonable administrative, technical, and organizational measures to protect your information.</p>
          <p>However, no method of internet transmission or electronic storage is completely secure.</p>
        </Section>

        <Section title="6. Resume and Uploaded Documents">
          <p>Any resume, employment history, or documents uploaded to our platform are used solely for providing requested services.</p>
          <p>We will not publicly share your documents without your consent.</p>
        </Section>

        <Section title="7. Cookies">
          <p>Our website may use cookies and similar technologies to improve user experience and analyze website traffic.</p>
          <p>You may disable cookies through your browser settings.</p>
        </Section>

        <Section title="8. Your Rights">
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access your personal data</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of personal information</li>
            <li>Withdraw consent where applicable</li>
          </ul>
          <p>To make a request, contact us using the information on our website.</p>
        </Section>

        <Section title="9. Children's Privacy">
          <p>Our services are not intended for individuals under the age of 18.</p>
          <p>We do not knowingly collect information from minors.</p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>We may update this Privacy Policy periodically. Any changes will be posted on this page.</p>
        </Section>

        <Section title="11. Contact Us">
          <p>If you have questions about this Privacy Policy or your personal information, please contact us through the contact details listed on our website.</p>
        </Section>
      </main>
      <footer className="border-t border-zinc-200 py-8 text-center text-xs text-zinc-500">
        © 2024 Trabajo Listo
      </footer>
    </div>
  );
}
