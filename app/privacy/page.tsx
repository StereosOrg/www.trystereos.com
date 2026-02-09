import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

export const metadata = {
  title: "Privacy Policy | Stereos",
  description: "Stereos privacy policy — how we collect, use, and protect your data.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background bg-grid-black/[0.02]">
      <Sidebar />

      <main className="md:ml-64 pt-20 md:pt-0">
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <div className="border-4 border-black bg-white p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] bg-amber-100 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-6">
                Legal
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                Privacy Policy
              </h1>
              <p className="text-sm text-muted-foreground mb-8">
                Last updated: February 8, 2026
              </p>

              <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">1. Introduction</h2>
                  <p>
                    Atelier Logos LLC (&quot;Stereos,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the Stereos platform at{" "}
                    <Link href="https://www.trystereos.com" className="font-bold text-black underline decoration-2 underline-offset-4 hover:text-emerald-700 transition-colors">
                      trystereos.com
                    </Link>
                    . This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">2. Information We Collect</h2>
                  <p className="mb-3">We may collect the following types of information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground">Account Information:</strong> Name, email address, and organization details you provide when creating an account.
                    </li>
                    <li>
                      <strong className="text-foreground">Usage Data:</strong> LLM usage attribution data, including commit metadata, file-level diffs, and provenance information processed through the Stereos platform.
                    </li>
                    <li>
                      <strong className="text-foreground">Analytics Data:</strong> Browser type, device information, IP address, pages visited, and interaction patterns collected through analytics providers.
                    </li>
                    <li>
                      <strong className="text-foreground">Payment Information:</strong> Billing details processed securely through our third-party payment provider (Stripe). We do not store full payment card numbers.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">3. How We Use Your Information</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To provide, operate, and maintain the Stereos platform</li>
                    <li>To process LLM usage attribution and generate reports for your organization</li>
                    <li>To process transactions and manage your subscription</li>
                    <li>To communicate with you about your account, updates, and support requests</li>
                    <li>To improve and optimize our services</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">4. Data Sharing</h2>
                  <p className="mb-3">We do not sell your personal information. We may share data with:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground">Service Providers:</strong> Third-party vendors who assist in operating our platform (e.g., hosting, analytics, payment processing).
                    </li>
                    <li>
                      <strong className="text-foreground">Your Organization:</strong> Usage attribution data is shared with authorized members of your organization as part of the core service.
                    </li>
                    <li>
                      <strong className="text-foreground">Legal Requirements:</strong> When required by law, regulation, or legal process.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">5. Data Security</h2>
                  <p>
                    We implement industry-standard security measures to protect your data, including encryption in transit and at rest. Our infrastructure is 100% serverless and SOC 2 aligned. However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">6. Data Retention</h2>
                  <p>
                    We retain your data for as long as your account is active or as needed to provide services. Upon account deletion, we will remove your personal data within 30 days, except where retention is required by law. Aggregated, anonymized data may be retained indefinitely for analytical purposes.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">7. Your Rights</h2>
                  <p className="mb-3">Depending on your jurisdiction, you may have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access the personal data we hold about you</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to or restrict processing of your data</li>
                    <li>Export your data in a portable format</li>
                  </ul>
                  <p className="mt-3">
                    To exercise any of these rights, contact us at{" "}
                    <Link href="mailto:james@trystereos.com" className="font-bold text-black underline decoration-2 underline-offset-4 hover:text-emerald-700 transition-colors">
                      james@trystereos.com
                    </Link>.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">8. Cookies and Tracking</h2>
                  <p>
                    We use cookies and similar tracking technologies (including analytics from PostHog and Segment) to analyze usage patterns and improve our services. You can control cookie preferences through your browser settings.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">9. Third-Party Services</h2>
                  <p>
                    Our platform may integrate with third-party services such as GitHub, VS Code, and LLM providers. These services have their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices of third-party services.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">10. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page with a revised &quot;Last updated&quot; date. Your continued use of the service after changes constitutes acceptance of the updated policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">11. Contact Us</h2>
                  <p>
                    If you have questions about this Privacy Policy, please contact us at{" "}
                    <Link href="mailto:james@trystereos.com" className="font-bold text-black underline decoration-2 underline-offset-4 hover:text-emerald-700 transition-colors">
                      james@trystereos.com
                    </Link>.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
