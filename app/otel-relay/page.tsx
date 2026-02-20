import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TopNav } from "@/components/top-nav"
import { DitheringShader } from "@/components/dithering-shader"
import { HeroCtaButton } from "@/components/hero-cta-button"
import {
  Activity,
  ArrowRight,
  BarChart3,
  Calendar,
  FileCode2,
  GitMerge,
  Globe,
  Layers,
  Zap,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Telemetry Relay | Stereos",
  description:
    "OTEL-native telemetry relay for LLM usage. Ingest spans from any tool, visualize usage across your entire AI stack.",
}

export default function OtelRelayPage() {
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
              Telemetry Relay
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2b2e3a] leading-tight mb-6">
              Full visibility into every LLM call across your stack
            </h1>
            <p className="text-base md:text-lg text-[#718096] max-w-2xl mb-10">
              Stereos is OTEL-native. Every gateway request emits a span. Send spans from your own instrumented services too — we relay and surface everything in one place.
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
                    OTLP/HTTP — drop-in compatible
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#2b2e3a] mb-4">
                    Built on open standards
                  </h3>
                  <p className="text-base text-[#718096] max-w-md mb-6">
                    Stereos accepts standard OTLP/HTTP JSON on <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">/v1/traces</code>, <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">/v1/logs</code>, and <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">/v1/metrics</code>. Any OpenTelemetry SDK or exporter that speaks OTLP/HTTP can send data with minimal configuration.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {[
                      "Traces, logs & metrics",
                      "Gen AI semantic conventions",
                      "Auto vendor detection",
                      "Real-time event feed",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-[#718096]">
                        <Activity className="w-4 h-4 text-emerald-500 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-[#88edc3]/30 rounded-full blur-2xl" />
              </div>

              <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-3">
                  <Layers className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">Gateway-native spans</h3>
                <p className="text-[#718096] text-sm">
                  Every request through your Stereos gateway automatically emits an OTEL span — no instrumentation required on your end.
                </p>
              </div>

              <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-3">
                  <GitMerge className="w-5 h-5 text-[#2b2e3a]" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e3a] mb-2">Ingest from anywhere</h3>
                <p className="text-[#718096] text-sm">
                  Send spans from your own apps, agents, or pipelines and correlate them with gateway-emitted spans end-to-end.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 py-20 border-t border-[#E2E8F0] bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-[#2b2e3a] mb-4">
              Everything you need to understand AI usage in production
            </h2>
            <p className="text-base md:text-lg text-[#718096] mb-12 max-w-2xl">
              From token usage and latency percentiles to per-service attribution and error rates — surfaced automatically from the spans you already emit.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Activity,
                  title: "Real-time event feed",
                  body: "A reverse-chronological stream of every trace, log, and metric received — filterable by vendor, model, service, or severity.",
                },
                {
                  icon: BarChart3,
                  title: "Token & cost charts",
                  body: "Stacked bar charts of input vs. output token usage over time, with cost attribution broken down by team and model.",
                },
                {
                  icon: Zap,
                  title: "Latency percentiles",
                  body: "p50, p90, p95, and p99 latency charts per model and service so you can catch regressions before they impact users.",
                },
                {
                  icon: FileCode2,
                  title: "Gen AI conventions",
                  body: "Built on the OpenTelemetry Gen AI semantic conventions. Standard attributes like gen_ai.system and gen_ai.usage.* map directly to dashboard widgets.",
                },
                {
                  icon: Globe,
                  title: "Multi-vendor",
                  body: "Automatic vendor detection from gen_ai.system covers OpenAI, Anthropic, Gemini, Mistral, Bedrock, and more.",
                },
                {
                  icon: Layers,
                  title: "Span waterfall",
                  body: "Full trace timeline showing the waterfall of spans for individual requests — click any span to inspect attributes, prompts, and completions.",
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
                { stat: "OTLP", label: "HTTP + JSON" },
                { stat: "3", label: "Signal types" },
                { stat: "10+", label: "Vendors detected" },
                { stat: "Real-time", label: "Event feed" },
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
              See your LLM usage in real time
            </h2>
            <p className="text-base md:text-lg text-[#718096] mb-8">
              Connect your first service in minutes with any OTEL SDK.
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
