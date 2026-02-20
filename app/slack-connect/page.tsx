import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TopNav } from "@/components/top-nav"
import { DitheringShader } from "@/components/dithering-shader"
import { SlackConnectForm } from "@/components/slack-connect-form"
import { ShieldCheck, KeyRound, Activity, Calendar } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Security blocking AI tools? | Stereos",
  description:
    "Loop in your security leader and let's talk about zero data retention AI in a shared Slack channel.",
}

export default function SlackConnectPage() {
  return (
    <div className="min-h-screen bg-white bg-grid-black/[0.02]">
      <TopNav />

      <main className="pt-16">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              {/* Left: pitch */}
              <div>
                <span className="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#2b2e3a] bg-[#88edc3] rounded-lg mb-6">
                  Slack Connect
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-[#2b2e3a] leading-tight mb-6">
                  Need an AI solution your CISO will actually approve?
                </h1>
                <p className="text-base md:text-lg text-[#718096] mb-10 leading-relaxed">
                  Add your email and your security leader's email. We'll invite you both to a shared Slack Connect channel and send your security leader a full briefing on how Stereos handles data — so the conversation can happen on their terms.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Zero Data Retention by default",
                      body: "Prompts and completions are never logged or stored. Optional DLP policies redact sensitive content before it reaches the model.",
                    },
                    {
                      icon: KeyRound,
                      title: "No shared API keys",
                      body: "Virtual keys are scoped per developer with spend limits enforced at the proxy. Your real keys stay in the vault.",
                    },
                    {
                      icon: Activity,
                      title: "Full OTEL observability",
                      body: "Every request emits an OpenTelemetry span — token usage, cost, and latency attributed by team in real time.",
                    },
                  ].map(({ icon: Icon, title, body }) => (
                    <div key={title} className="flex gap-4">
                      <div className="w-9 h-9 rounded-lg bg-[#88edc3]/50 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-[#2b2e3a]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#2b2e3a] text-sm">{title}</p>
                        <p className="text-[#718096] text-sm mt-0.5">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-lg border border-[#E2E8F0] bg-white font-medium text-[#2b2e3a] hover:bg-gray-50 transition-colors h-11 px-5"
                >
                  <Link href="https://cal.com/jbohrman/45-min-meeting">
                    Prefer a call instead?
                    <Calendar className="ml-2" size={16} />
                  </Link>
                </Button>
              </div>

              {/* Right: form card */}
              <div className="lg:sticky lg:top-28">
                <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-lg bg-[#88edc3]/50 flex items-center justify-center shrink-0">
                      {/* Slack logo */}
                      <img src="https://cdn.brandfetch.io/idJ_HhtG0Z/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="Slack" className="w-10 h-10" />
                    </div>
                    <div>
                      <p className="font-bold text-[#2b2e3a]">Connect in Slack</p>
                      <p className="text-xs text-[#718096]">We'll loop everyone in within minutes</p>
                    </div>
                  </div>

                  <SlackConnectForm />
                </div>

                <p className="text-xs text-[#718096] text-center mt-4">
                  SOC 2 aligned · ELv2 license · No shared infrastructure
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
