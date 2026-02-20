import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TopNav } from "@/components/top-nav"
import { DitheringShader } from "@/components/dithering-shader"
import { HeroCtaButton } from "@/components/hero-cta-button"
import {
  Calendar,
  DollarSign,
  Globe,
  KeyRound,
  Layers,
  Lock,
  RefreshCw,
  ShieldCheck,
  Users,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Virtual Key Management | Stereos",
  description:
    "Provision virtual AI keys scoped to teams and individuals with spend controls enforced at the proxy level.",
}

export default function KeyProvisioningPage() {
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
              Virtual Key Management
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2b2e3a] leading-tight mb-6">
              One real key. Virtual keys for everyone else.
            </h1>
            <p className="text-base md:text-lg text-[#718096] max-w-2xl mb-10">
              Provision individual virtual keys for every developer, team, and service in your org — each with their own spend limits and model restrictions, all enforced at the proxy before a request ever touches your real API keys.
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
                    Proxy-enforced controls
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#2b2e3a] mb-4">
                    Spend limits that actually stick
                  </h3>
                  <p className="text-base text-[#718096] max-w-md mb-6">
                    Virtual keys aren't just tracked — limits are enforced at the proxy level before the request reaches the model provider. A developer who hits their monthly limit gets a clean error, not an overage on your bill.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {[
                      "Per-user spend caps",
                      "Per-team budgets",
                      "Model allow/deny lists",
                      "Instant key revocation",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-[#718096]">
                        <KeyRound className="w-4 h-4 text-emerald-500 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-[#88edc3]/30 rounded-full blur-2xl" />
              </div>

              <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-3">
                  <Lock className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">Real keys stay hidden</h3>
                <p className="text-[#718096] text-sm">
                  Your provider API keys are stored encrypted and never exposed to developers. Virtual keys are the only surface they interact with.
                </p>
              </div>

              <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">Cross-functional</h3>
                <p className="text-[#718096] text-sm">
                  Manage keys for engineering, product, sales, and ops from a single dashboard — one source of truth for the whole org.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 py-20 border-t border-[#E2E8F0] bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-[#2b2e3a] mb-4">
              Full governance without slowing anyone down
            </h2>
            <p className="text-base md:text-lg text-[#718096] mb-12 max-w-2xl">
              Issue keys in seconds. Revoke them instantly. Set budgets that enforce themselves. Your team keeps shipping; you keep control.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: KeyRound,
                  title: "Virtual key issuance",
                  body: "Provision keys for any team member or service from the dashboard in seconds. Each key is scoped, tracked, and independently revocable.",
                },
                {
                  icon: DollarSign,
                  title: "Spend controls",
                  body: "Set monthly or per-request spend limits per key. Limits are enforced at the proxy — no surprise overages.",
                },
                {
                  icon: ShieldCheck,
                  title: "Model restrictions",
                  body: "Allow or deny specific models on a per-key or per-team basis. Prevent junior devs from accidentally calling the most expensive models.",
                },
                {
                  icon: RefreshCw,
                  title: "Instant rotation",
                  body: "Rotate or revoke any virtual key without touching your real provider credentials. No deployment required.",
                },
                {
                  icon: Layers,
                  title: "Usage attribution",
                  body: "Every request is attributed to the virtual key that made it, giving you per-developer and per-team spend breakdowns automatically.",
                },
                {
                  icon: Globe,
                  title: "OpenAI-compatible",
                  body: "Virtual keys work as drop-in replacements in any OpenAI-compatible tool. Developers change one environment variable and they're on the gateway.",
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
                { stat: "∞", label: "Virtual keys" },
                { stat: "0", label: "Real keys exposed" },
                { stat: "Proxy", label: "Enforced limits" },
                { stat: "Instant", label: "Revocation" },
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
              Take back control of your AI spend
            </h2>
            <p className="text-base md:text-lg text-[#718096] mb-8">
              Provision your first virtual keys in minutes with a free 14-day trial.
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
