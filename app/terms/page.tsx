import Link from "next/link"
import { TopNav } from "@/components/top-nav"

export const metadata = {
  title: "Terms of Service | Stereos",
  description: "Stereos terms of service — the terms governing use of our platform.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background bg-grid-black/[0.02]">
      <TopNav />

      <main className="pt-16">
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <div className="border-4 border-black bg-white p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] bg-amber-100 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-6">
                Legal
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                Terms of Service
              </h1>
              <p className="text-sm text-muted-foreground mb-8">
                Last updated: February 8, 2026
              </p>

              <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
                  <p>
                    By accessing or using the Stereos platform operated by Atelier Logos LLC (&quot;Stereos,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our services. If you are using Stereos on behalf of an organization, you represent that you have authority to bind that organization to these terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">2. Description of Service</h2>
                  <p>
                    Stereos provides org-wide LLM usage attribution and change management tooling, including file-level diffs with provenance attribution, usage analytics, ledger export, and related features. The service is available through our web application, API, and IDE extensions.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">3. Accounts</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You must provide accurate and complete information when creating an account.</li>
                    <li>You are responsible for maintaining the security of your account credentials.</li>
                    <li>You are responsible for all activity that occurs under your account.</li>
                    <li>You must notify us immediately of any unauthorized use of your account.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">4. Subscription and Payment</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access to Stereos requires a paid subscription after the 14-day free trial period.</li>
                    <li>Subscription fees are billed monthly in advance. Usage-based charges (per ledger event) are billed in arrears.</li>
                    <li>All fees are non-refundable except as required by law or as expressly stated otherwise.</li>
                    <li>We reserve the right to change pricing with 30 days&apos; written notice.</li>
                    <li>Failure to pay may result in suspension or termination of your account.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">5. Acceptable Use</h2>
                  <p className="mb-3">You agree not to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use the service for any unlawful purpose or in violation of any applicable laws</li>
                    <li>Reverse engineer, decompile, or disassemble any part of the service</li>
                    <li>Attempt to gain unauthorized access to the service or its related systems</li>
                    <li>Interfere with or disrupt the integrity or performance of the service</li>
                    <li>Use the service to store or transmit malicious code</li>
                    <li>Resell, sublicense, or redistribute the service without our written consent</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">6. Your Data</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You retain ownership of all data you submit to the Stereos platform (&quot;Your Data&quot;).</li>
                    <li>You grant us a limited license to process Your Data solely to provide and improve the service.</li>
                    <li>We will not access Your Data except as necessary to provide the service, respond to support requests, or as required by law.</li>
                    <li>You may export Your Data at any time through the ledger export feature.</li>
                    <li>Upon account termination, we will delete Your Data within 30 days unless retention is required by law.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">7. Intellectual Property</h2>
                  <p>
                    The Stereos platform, including its code, design, trademarks, and documentation, is the property of Atelier Logos LLC. The Stereos core software is available under the Elastic License v2. Nothing in these terms grants you rights to our trademarks or branding without prior written consent.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">8. Availability and Support</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>We strive to maintain high availability but do not guarantee uninterrupted access to the service.</li>
                    <li>We may perform scheduled maintenance with reasonable advance notice.</li>
                    <li>Priority support is available to all paid subscribers.</li>
                    <li>We reserve the right to modify, suspend, or discontinue any part of the service with reasonable notice.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">9. Limitation of Liability</h2>
                  <p>
                    To the maximum extent permitted by law, Stereos and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenue, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the service. Our total liability for any claim arising from these terms or the service shall not exceed the amount you paid us in the 12 months preceding the claim.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">10. Disclaimer of Warranties</h2>
                  <p>
                    The service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the service will be error-free or uninterrupted.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">11. Indemnification</h2>
                  <p>
                    You agree to indemnify and hold harmless Stereos and its affiliates from any claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising from your use of the service or violation of these terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">12. Termination</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You may cancel your subscription at any time through your account settings or by contacting us.</li>
                    <li>We may suspend or terminate your account for violation of these terms or non-payment.</li>
                    <li>Upon termination, your right to use the service ceases immediately.</li>
                    <li>Sections regarding liability, indemnification, and governing law survive termination.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">13. Governing Law</h2>
                  <p>
                    These terms are governed by the laws of the State of Delaware, without regard to its conflict of law principles. Any disputes arising from these terms shall be resolved in the state or federal courts located in Delaware.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">14. Changes to Terms</h2>
                  <p>
                    We may update these Terms of Service from time to time. We will notify you of material changes by posting the updated terms on this page with a revised &quot;Last updated&quot; date. Your continued use of the service after changes constitutes acceptance of the updated terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-3">15. Contact Us</h2>
                  <p>
                    If you have questions about these Terms of Service, please contact us at{" "}
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
