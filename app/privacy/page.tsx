import Link from "next/link"
import { TopNav } from "@/components/top-nav"

export const metadata = {
  title: "Privacy Policy | Stereos",
  description: "Stereos privacy policy — how we collect, use, and protect your data.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white bg-grid-black/[0.02]">
      <TopNav />

      <main className="pt-16">
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-8 md:p-12">
              <span className="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#718096] bg-[#88edc3] rounded-lg mb-6">
                Legal
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#2b2e3a] mb-2">
                Privacy Policy
              </h1>
              <p className="text-sm text-[#718096] mb-8">
                Last updated: February 10, 2026
              </p>

              <div className="space-y-8 text-base leading-relaxed text-[#718096]">
                <section>
                  <h2 className="text-xl font-bold text-[#2b2e3a] mb-3">1. Introduction</h2>
                  <p>
                    Atelier Logos LLC (&quot;Stereos,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the Stereos platform at{" "}
                    <Link href="https://www.trystereos.com" className="font-semibold text-[#2b2e3a] underline decoration-2 underline-offset-4 hover:text-[#88edc3] transition-colors">
                      trystereos.com
                    </Link>
                    . Stereos provides LLM spend management and managed key provisioning for organizations. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-[#2b2e3a] mb-3">2. Information We Collect</h2>
                  <p className="mb-3">We may collect the following types of information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-[#2b2e3a]">Account Information:</strong> Name, email address, and organization details you provide when creating an account.
                    </li>
                    <li>
                      <strong className="text-[#2b2e3a]">Usage and Spend Data:</strong> LLM API usage, metering data, spend metrics, and related telemetry processed through the Stereos platform for spend management and reporting.
                    </li>
                    <li>
                      <strong className="text-[#2b2e3a]">Key and Configuration Data:</strong> Metadata related to managed keys (e.g., key names, provider associations, team assignments) and product configuration you provide for key provisioning and governance.
                    </li>
                    <li>
                      <strong className="text-[#2b2e3a]">Analytics Data:</strong> Browser type, device information, IP address, pages visited, and interaction patterns collected through analytics providers.
                    </li>
                    <li>
                      <strong className="text-[#2b2e3a]">Payment Information:</strong> Billing details processed securely through our third-party payment provider (e.g., Stripe). We do not store full payment card numbers.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-[#2b2e3a] mb-3">3. How We Use Your Information</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To provide, operate, and maintain the Stereos platform</li>
                    <li>To deliver LLM spend management, metering, and reporting for your organization</li>
                    <li>To provide managed key provisioning and related governance features</li>
                    <li>To process transactions and manage your subscription</li>
                    <li>To communicate with you about your account, updates, and support requests</li>
                    <li>To improve and optimize our services</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-[#2b2e3a] mb-3">4. Data Sharing</h2>
                  <p className="mb-3">We do not sell your personal information. We may share data with:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-[#2b2e3a]">Service Providers:</strong> Third-party vendors who assist in operating our platform (e.g., hosting, analytics, payment processing).
                    </li>
                    <li>
                      <strong className="text-[#2b2e3a]">Your Organization:</strong> Usage, spend, and key-related data is shared with authorized members of your organization as part of the core service.
                    </li>
                    <li>
                      <strong className="text-[#2b2e3a]">Legal Requirements:</strong> When required by law, regulation, or legal process.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-[#2b2e3a] mb-3">5. Data Security</h2>
                  <p>
                    We implement industry-standard security measures to protect your data, including encryption in transit and at rest. Our infrastructure is 100% serverless and SOC 2 aligned. However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-[#2b2e3a] mb-3">6. Data Retention</h2>
                  <p>
                    We retain your data for as long as your account is active or as needed to provide services. Upon account deletion, we will remove your personal data within 30 days, except where retention is required by law. Aggregated, anonymized data may be retained indefinitely for analytical purposes.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-[#2b2e3a] mb-3">7. Your Rights</h2>
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
                    <Link href="mailto:james@trystereos.com" className="font-semibold text-[#2b2e3a] underline decoration-2 underline-offset-4 hover:text-[#88edc3] transition-colors">
                      james@trystereos.com
                    </Link>.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-[#2b2e3a] mb-3">8. Cookies and Tracking</h2>
                  <p>
                    We use cookies and similar tracking technologies (including analytics from Customer.io, Segment, and Snitcher) to analyze usage patterns and improve our services. Snitcher is used to identify companies visiting our website based on IP address. You can control cookie preferences through your browser settings.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-[#2b2e3a] mb-3">9. Third-Party Services</h2>
                  <p>
                    Our platform may integrate with third-party services such as LLM API providers, identity providers, and payment processors. These services have their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices of third-party services.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-[#2b2e3a] mb-3">10. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page with a revised &quot;Last updated&quot; date. Your continued use of the service after changes constitutes acceptance of the updated policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-[#2b2e3a] mb-3">11. Contact Us</h2>
                  <p>
                    If you have questions about this Privacy Policy, please contact us at{" "}
                    <Link href="mailto:james@trystereos.com" className="font-semibold text-[#2b2e3a] underline decoration-2 underline-offset-4 hover:text-[#88edc3] transition-colors">
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
