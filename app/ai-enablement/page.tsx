import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TopNav } from "@/components/top-nav"
import { DitheringShader } from "@/components/dithering-shader"
import { HeroCtaButton } from "@/components/hero-cta-button"
import { PricingCtaButton } from "@/components/pricing-cta-button"
import {
  ShieldCheck,
  Zap,
  Globe,
  Lock,
  Users,
  BarChart3,
  Calendar,
  ArrowRight,
} from "lucide-react"
import { LockClosedIcon } from "@radix-ui/react-icons"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ZDR AI Gateway | Stereos",
  description:
    "Zero data retention, OpenAI-compatible AI gateway provisioned for your organization. Stop shadow AI without banning it.",
}

export default function AiEnablementPage() {
  return (
    <div className="min-h-screen bg-white bg-grid-black/[0.02]">
      <TopNav />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative min-h-[80vh] px-6 py-16 md:py-24 overflow-hidden">
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
              style={{ width: "100%", height: "100%", minHeight: "80vh", opacity: 0.4 }}
            />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto">
            <span className="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#2b2e3a] bg-[#88edc3] rounded-lg mb-6">
              ZDR Gateway
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2b2e3a] leading-tight mb-6">
              AI your security team will actually approve
            </h1>
            <p className="text-base md:text-lg text-[#718096] max-w-2xl mb-10">
              We provision a Zero Data Retention, OpenAI-compatible AI gateway scoped to your organization — so your team can use every LLM tool they need without putting data at risk.
            </p>
            <div className="flex flex-wrap gap-4 mb-16">
              <HeroCtaButton />
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-lg border border-[#E2E8F0] bg-white font-medium text-[#2b2e3a] hover:bg-gray-50 transition-colors h-12 px-6"
              >
                <Link href="https://cal.com/jbohrman/45-min-meeting">
                  Schedule a demo
                  <Calendar className="ml-2" size={18} />
                </Link>
              </Button>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
              <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-8">
                <div className="relative z-10">
                  <span className="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#2b2e3a] bg-[#88edc3] rounded-lg mb-4">
                    Zero Data Retention by default
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#2b2e3a] mb-4">
                    Your data never leaves your control
                  </h3>
                  <p className="text-base text-[#718096] max-w-md mb-6">
                    Every request is proxied through a gateway that enforces ZDR policies — prompts and completions are never logged, stored, or used for training by any model provider. Optional DLP rules let you redact or block sensitive patterns before they ever reach the model.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {[
                      "Prompts never stored",
                      "DLP policy enforcement",
                      "SOC 2 aligned",
                      "Audit-ready by design",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-[#718096]">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-[#88edc3]/30 rounded-full blur-2xl" />
              </div>

              <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-3">
                  <Globe className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">OpenAI-compatible</h3>
                <p className="text-[#718096] text-sm">
                  Drop-in compatible with any tool that speaks OpenAI's API — Claude Code, Cursor, Copilot, and more.
                </p>
              </div>

              <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-3">
                  <LockClosedIcon className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">No shared infrastructure</h3>
                <p className="text-[#718096] text-sm">
                  Each gateway is a self-contained environment provisioned exclusively for your org. No multi-tenancy at the data plane.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 py-20 border-t border-[#E2E8F0] bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-[#2b2e3a] mb-4">
              Stop choosing between security and productivity
            </h2>
            <p className="text-base md:text-lg text-[#718096] mb-12 max-w-2xl">
              Banning AI tools creates shadow usage. Allowing them without governance creates risk. The Stereos ZDR gateway is the third option.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: "Zero Data Retention",
                  body: "Requests are proxied with ZDR enforced end-to-end. No provider stores your prompts or outputs.",
                },
                {
                  icon: Zap,
                  title: "DLP Policies",
                  body: "Define regex or semantic rules to redact PII, secrets, or proprietary content before it reaches the model.",
                },
                {
                  icon: Lock,
                  title: "Org-scoped gateway",
                  body: "Your gateway URL is unique to your org. No cross-tenant data plane, no shared caches.",
                },
                {
                  icon: Users,
                  title: "Team-level access",
                  body: "Issue virtual keys per team or individual with spend limits and model restrictions enforced at the proxy.",
                },
                {
                  icon: BarChart3,
                  title: "Full usage visibility",
                  body: "See who is using which models, how much spend is attributed to each team, and where limits are approaching.",
                },
                {
                  icon: Globe,
                  title: "Works with everything",
                  body: "OpenAI-compatible API means any tool that supports a custom base URL works out of the box — no plugins required.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
                  <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#2b2e3a]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">{title}</h3>
                  <p className="text-[#718096] text-sm">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-t border-[#E2E8F0] bg-white">
          <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { stat: "ZDR", label: "By default" },
                { stat: "100%", label: "Serverless" },
                { stat: "SOC 2", label: "Aligned" },
                { stat: "0", label: "Shared infra" },
              ].map(({ stat, label }) => (
                <div key={label}>
                  <div className="text-2xl md:text-3xl font-bold text-[#2b2e3a] tabular-nums">{stat}</div>
                  <div className="text-sm font-medium text-[#718096] mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-6 py-20 border-t border-[#E2E8F0] bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-[#2b2e3a] mb-4">
              Ready to provision your gateway?
            </h2>
            <p className="text-base md:text-lg text-[#718096] mb-8">
              Start a free trial and have a ZDR gateway live in minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-lg bg-[#2b2e3a] text-white font-medium shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:bg-[#1a1c24] transition-colors h-12 px-6"
              >
                <Link href="https://cal.com/jbohrman/45-min-meeting">
                  Schedule a demo
                  <Calendar className="ml-2" size={18} />
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
                <h4 className="font-bold text-[#2b2e3a] mb-4">Product</h4>
                <ul className="space-y-2 text-[#718096] text-sm">
                  <li><Link href="/ai-enablement" className="hover:text-[#2b2e3a] transition-colors">ZDR Gateway</Link></li>
                  <li><Link href="/otel-relay" className="hover:text-[#2b2e3a] transition-colors">Telemetry Relay</Link></li>
                  <li><Link href="/key-provisioning" className="hover:text-[#2b2e3a] transition-colors">Virtual Key Management</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#2b2e3a] mb-4">Legal</h4>
                <ul className="space-y-2 text-[#718096] text-sm">
                  <li><Link href="/privacy" className="hover:text-[#2b2e3a] transition-colors">Privacy</Link></li>
                  <li><Link href="/trust" className="hover:text-[#2b2e3a] transition-colors">Trust Center</Link></li>
                  <li><Link href="/terms" className="hover:text-[#2b2e3a] transition-colors">Terms</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#2b2e3a] mb-4">Resources</h4>
                <ul className="space-y-2 text-[#718096] text-sm">
                  <li><Link href="/partners" className="hover:text-[#2b2e3a] transition-colors">Partner Program</Link></li>
                  <li><Link href="/" className="hover:text-[#2b2e3a] transition-colors">Home</Link></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="font-bold text-[#2b2e3a] text-lg">Stereos</span>
              <p className="text-sm text-[#718096]">&copy; {new Date().getFullYear()} Stereos. ELv2 License.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
