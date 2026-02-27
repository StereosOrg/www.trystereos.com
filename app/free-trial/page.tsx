import { TopNav } from "@/components/top-nav"
import { CalEmbed } from "@/components/cal-embed"
import { DitheringShader } from "@/components/dithering-shader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book a Demo | Stereos",
  description: "Book a demo of Stereos. See how our ZDR AI gateway helps your team use AI safely.",
}

export default function BookDemoPage() {
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2b2e3a] leading-tight mb-6">
              Book a Demo
            </h1>
            <p className="text-base md:text-lg text-[#718096] max-w-2xl mb-10">
              Pick a time and we'll walk you through how Stereos works — provisioning a ZDR gateway, virtual key management, and observability for your team.
            </p>

            <div className="min-h-[600px] bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
              <CalEmbed />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
