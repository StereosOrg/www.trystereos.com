import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TopNav } from "@/components/top-nav"
import { Pricing } from "@/components/pricing"
import { HeroCtaButton } from "@/components/hero-cta-button"
import { DitheringShader } from "@/components/dithering-shader"
import InteractiveGatewayDemo from "@/components/interactive-gateway-demo"
import {
  Sparkles,
  Code2,
  Globe,
  Box,
  FileCode2,
  Heart,
  ArrowRight,
  Github,
  GitBranch,
  KeyIcon,
  Calendar,
  LockIcon,
  FunnelX,
  SendIcon
} from "lucide-react"
import { LockClosedIcon } from "@radix-ui/react-icons"
import { SiteFooter } from "@/components/site-footer"

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
              Unleash your teams potential with isolated OpenAI-compatible enterprise AI gateways.
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-lg text-[#718096] max-w-2xl mb-10">
            Give your team the freedom to explore with zero data retention Anthropic and OpenAI models while maintaining control and visibility over your organization's AI usage.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-16">
              <HeroCtaButton />
            </div>

            {/* Interactive Demo replacing Bento Grid */}
            <div className="mb-6">
              <InteractiveGatewayDemo />
            </div>

            {/* Value-prop badges kept from Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
              <div className="rounded-xl bg-white border border-[#E2E8F0] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-3">
                  <Globe className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">Cross-functional</h3>
                <p className="text-[#718096] text-sm">Manage keys for multiple teams from a single source of truth.</p>
              </div>
              <div className="rounded-xl bg-white border border-[#E2E8F0] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-3">
                  <LockClosedIcon className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">No Shared Infrastructure</h3>
                <p className="text-[#718096] text-sm">Each gateway is provisioned as a isolated environment scoped to your org.</p>
              </div>
              <div className="rounded-xl bg-white border border-[#E2E8F0] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-3">
                  <Globe className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">OTEL-native</h3>
                <p className="text-[#718096] text-sm">All key gateway events are emitted as OTEL spans; ingest from your other tools, too.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20 border-t border-[#E2E8F0] bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-[#2b2e3a] mb-4">
              OpenAI-compatible endpoints designed so your team can move fast without leaks
            </h2>
            <p className="text-base md:text-lg text-[#718096] mb-12 max-w-2xl">
              Easen up your AI usage policy with a gateway endpoint designed to allow your team to administrate, monitor, and control your organization's AI usage without the need for complex policies or shared infrastructure.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-4">
                  <LockIcon className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">Data Loss Prevention</h3>
                <p className="text-[#718096] text-sm">
                  Take advantage of our built-in DLP features to prevent sensitive data from being sent.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-4">
                  <img src={"https://assets.streamlinehq.com/image/private/w_240,h_240,ar_1/f_auto/v1/icons/technology/openai_1-moa3pqsiii7l4dkheifi8.png/openai_1-gv7rd0u7lcncyfalyjodt.png?_a=DATAiZAAZAA0"} className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">OpenAI Compliant</h3>
                <p className="text-[#718096] text-sm">
                  Our proxy endpoint is fully OpenAI compliant, so you can use it with nearly any tool or IDE  
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-4">
                  <KeyIcon className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">Virtual Keys</h3>
                <p className="text-[#718096] text-sm">
                  Provision keys scoped to users and teams with spend controls that we enforce at the proxy level. 
                </p>
              </div>

              {/* Feature 4 */}
              <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-4">
                  <SendIcon className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">Destinations</h3>
                <p className="text-[#718096] text-sm">
                 Send your telemetry to any OTEL-compatible destination, including your existing APM and SIEM tools.
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
              Our pricing is simple and transparent. You only pay for what you use — $2400/mo platform fee plus usage-based pricing for managed keys and telemetry. We also offer a 14-day free trial.
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
              Ready to deploy a gateway?
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

        <SiteFooter />
      </main>
    </div>
  )
}
