import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TopNav } from "@/components/top-nav"
import { Pricing } from "@/components/pricing"
import { DitheringShader } from "@/components/dithering-shader"
import {
  Sparkles,
  Code2,
  Globe,
  Box,
  FileCode2,
  Heart,
  ArrowRight,
  Github,
  GitBranch
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-white bg-grid-black/[0.02]">
      <TopNav />

      {/* Main Content - clearance for fixed top nav */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-screen px-6 py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <DitheringShader
              width={1920}
              height={1080}
              colorBack="#ffffff"
              colorFront="#88edc3"
              shape="ripple"
              type="2x2"
              pxSize={2}
              speed={1.2}
              className="absolute inset-0 w-full h-full"
              style={{ width: "100%", height: "100%", minHeight: "100vh", opacity: 0.4 }}
            />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2b2e3a] leading-tight mb-6">
              Enterprise Key Management and Spend OS
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-lg text-[#718096] max-w-2xl mb-10">
             Stereos is the only platform that allows you to manage provider keys at the team level within a single spend management OS.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-16">
              <Button
                asChild
                size="lg"
                className="rounded-lg bg-[#2b2e3a] text-white font-medium shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:bg-[#1a1c24] transition-colors h-12 px-6"
              >
                <Link href="https://app.trystereos.com/">
                  Start a 14-day free trial
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 mb-16">
              {/* Large Card - Deep Drilldowns */}
              <div className="md:col-span-2 md:row-span-3 relative overflow-hidden rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-8">
                <div className="relative z-10">
                  <span className="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#2b2e3a] bg-[#88edc3] rounded-lg mb-4">
                    Best-in-Class
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#2b2e3a] mb-4">
                    Deep Drilldowns
                  </h3>
                  <p className="text-base text-[#718096] max-w-md mb-6">
                    Get deep insights at the key level. Understand who is using what keys, and how much is being spent. Provision keys and revoke access as needed.
                  </p>

                  {/* Diff Screenshot */}
                  <div className="rounded-lg overflow-hidden border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
                    <img
                      src="/test-key.png"
                      alt="Stereos file-level diff view showing LLM provenance attribution"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-[#88edc3]/30 rounded-full blur-2xl" />
              </div>

              {/* Small Card - Cross-functional */}
              <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-3">
                  <Globe className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">Cross-functional</h3>
                <p className="text-[#718096] text-sm">
                  Manage keys for multiple teams from a single source of truth.
                </p>
              </div>

              {/* Small Card - OTEL Compliant */}
              <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-3">
                  <Code2 className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">OTEL Compliant</h3>
                <p className="text-[#718096] text-sm">
                  Built on open standards. Easy to integrate into your products.
                </p>
              </div>

              {/* Small Card - CFO-friendly */}
              <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-3">
                  <FileCode2 className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">CFO-friendly</h3>
                <p className="text-[#718096] text-sm">
                  CFO-friendly reporting and insights. Export your spend data to your favorite tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20 border-t border-[#E2E8F0] bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-[#2b2e3a] mb-4">
              Stop letting your LLM spend be a black box. See where your money is being applied.
            </h2>
            <p className="text-base md:text-lg text-[#718096] mb-12 max-w-2xl">
              Get granular insights into your LLM spend and provision keys with custom guardrails and spend policies. Enable your team to use the tools they need to get the job done.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">Beautiful UX</h3>
                <p className="text-[#718096] text-sm">
                  Intuitive and delightful interface designed for developers and teams. No learning curve.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-4">
                  <Code2 className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">Cross-functional</h3>
                <p className="text-[#718096] text-sm">
                  Manage keys for multiple teams from a single source of truth.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-4">
                  <GitBranch className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">CFO-friendly</h3>
                <p className="text-[#718096] text-sm">
                  CFO-friendly reporting and insights. Export your spend data to your favorite tools.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-4">
                  <Box className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">Ledger Export</h3>
                <p className="text-[#718096] text-sm">
                  Export your spend data to your favorite tools.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-4">
                  <FileCode2 className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">OTEL Compliant</h3>
                <p className="text-[#718096] text-sm">
                  Built on open standards. Easy to integrate into your products.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">Source Available</h3>
                <p className="text-[#718096] text-sm">
                  Elastic v2 license. Source available on GitHub. We believe in transparency and community collaboration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="px-6 py-20 border-t border-[#E2E8F0] bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-[#2b2e3a] mb-4">
              Pricing Commitments
            </h2>
            <p className="text-base md:text-lg text-[#718096] mb-12 max-w-2xl">
              Our pricing is simple and transparent. You only pay for what you use — $450/mo platform fee plus usage-based pricing for managed keys and telemetry. We also offer a 14-day free trial.
            </p>
            <Pricing />
          </div>
        </section>
        {/* Stats Bar */}
        <section className="border-t border-[#E2E8F0] bg-white">
          <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#2b2e3a] tabular-nums">SOC 2</div>
                <div className="text-sm font-medium text-[#718096] mt-1">Aligned</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#2b2e3a] tabular-nums">100%</div>
                <div className="text-sm font-medium text-[#718096] mt-1">Serverless</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#2b2e3a] tabular-nums">24/7</div>
                <div className="text-sm font-medium text-[#718096] mt-1">Support Available</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#2b2e3a] tabular-nums">Elastic v2</div>
                <div className="text-sm font-medium text-[#718096] mt-1">License</div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="px-6 py-20 border-t border-[#E2E8F0] bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-[#2b2e3a] mb-4">
              Ready to create a ledger?
            </h2>
            <p className="text-base md:text-lg text-[#718096] mb-8">
              Create an account in seconds.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-lg bg-[#2b2e3a] text-white font-medium shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:bg-[#1a1c24] transition-colors h-12 px-6"
              >
                <Link href="https://github.com/StereosOrg/stereos">
                  View the repo
                  <Github className="ml-2" size={18} />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-lg border border-[#E2E8F0] bg-white font-medium text-[#2b2e3a] hover:bg-gray-50 transition-colors h-12 px-6"
              >
                <Link href="https://app.trystereos.com/">
                  Start a 14-day free trial
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#E2E8F0] bg-white px-6 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div>
                <h4 className="font-bold text-[#2b2e3a] mb-4">Resources</h4>
                <ul className="space-y-2 text-[#718096] text-sm">
                  <li><Link href="/" className="hover:text-[#2b2e3a] transition-colors">Guides</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#2b2e3a] mb-4">Community</h4>
                <ul className="space-y-2 text-[#718096] text-sm">
                  <li><Link href="https://github.com/StereosOrg/stereos" target="_blank" className="hover:text-[#2b2e3a] transition-colors">GitHub</Link></li>
                  <li><Link href="https://github.com/StereosOrg/stereos/issues" target="_blank" className="hover:text-[#2b2e3a] transition-colors">Issues</Link></li>
                  <li><Link href="https://github.com/StereosOrg/stereos/discussions" target="_blank" className="hover:text-[#2b2e3a] transition-colors">Discussions</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#2b2e3a] mb-4">Legal</h4>
                <ul className="space-y-2 text-[#718096] text-sm">
                  <li><Link href="/privacy" className="hover:text-[#2b2e3a] transition-colors">Privacy</Link></li>
                  <li><Link href="/terms" className="hover:text-[#2b2e3a] transition-colors">Terms</Link></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#2b2e3a] text-lg">Stereos</span>
              </div>
              <p className="text-sm text-[#718096]">
                &copy; {new Date().getFullYear()} Stereos. ELv2 License.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
