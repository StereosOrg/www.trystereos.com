import Link from "next/link"
import { TopNav } from "@/components/top-nav"
import { DitheringShader } from "@/components/dithering-shader"
import { db } from "@/lib/db/drizzle"
import { partners } from "@/lib/db/partner-schema"
import { eq } from "drizzle-orm"
import Image from "next/image"
import { KeyRound, BarChart3, FileText, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Start Your Free Trial | Stereos",
  description: "Start your 14-day free trial of Stereos. Enterprise key management and spend tracking for your team.",
}

const benefits = [
  {
    icon: KeyRound,
    title: "Key Management at Team Level",
    description: "Manage API keys across your entire organization with granular team-level controls and permissions.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Spend Tracking",
    description: "Monitor API spend in real-time with per-key and per-team breakdowns. No more surprise bills.",
  },
  {
    icon: FileText,
    title: "CFO-Friendly Reporting",
    description: "Generate clean, exportable reports that finance teams actually understand. Budget forecasting included.",
  },
]

async function getPartner(code: string | undefined) {
  if (!code) return null
  try {
    const [partner] = await db
      .select()
      .from(partners)
      .where(eq(partners.partner_code, code))
    if (partner && partner.status === "active") {
      return partner
    }
    return null
  } catch {
    return null
  }
}

export default async function FreeTrialPage({
  searchParams,
}: {
  searchParams: Promise<{ partner?: string; code?: string }>
}) {
  const params = await searchParams
  const partner = await getPartner(params.code)

  return (
    <div className="min-h-screen bg-white bg-grid-black/[0.02]">
      <TopNav />

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

          <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
            {/* Partner referral banner */}
            {partner && (
              <div className="mb-8 flex items-center gap-3 px-5 py-3 bg-[#88edc3]/20 border border-[#88edc3]/40 rounded-xl text-sm text-[#2b2e3a]">
                {partner.image_url && (
                  <Image
                    src={partner.image_url}
                    alt={partner.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                )}
                <span>
                  You&apos;ve been referred by <span className="font-semibold">{partner.name}</span>
                </span>
              </div>
            )}

            <span className="inline-block px-3 py-1.5 bg-[#88edc3] rounded-lg text-[11px] font-semibold uppercase tracking-wider text-[#2b2e3a] mb-6">
              14-Day Free Trial
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#2b2e3a] mb-6">
              Start your 14-day free trial
            </h1>

            <p className="text-base md:text-lg text-[#718096] max-w-2xl mb-10">
              The only platform that allows you to manage provider keys at the team level
              within a single spend management OS. No credit card required.
            </p>

            {partner && (
              <p className="text-lg md:text-xl font-semibold text-[#2b2e3a] mb-10">
                You&apos;re getting $450 in credits
              </p>
            )}

            <Link href="https://app.trystereos.com/">
              <Button className="h-12 px-8 rounded-lg bg-[#2b2e3a] text-white font-medium text-base hover:bg-[#2b2e3a]/90 transition-colors">
                {partner ? "Claim your credits" : "Get started free"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Benefits */}
          <div className="relative z-10 max-w-5xl mx-auto mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((benefit) => {
                const Icon = benefit.icon
                return (
                  <div
                    key={benefit.title}
                    className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#88edc3]/20">
                      <Icon className="h-5 w-5 text-[#2b2e3a]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#2b2e3a] mb-2">{benefit.title}</h3>
                    <p className="text-sm text-[#718096] leading-relaxed">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="relative z-10 max-w-5xl mx-auto mt-16 text-center">
            <p className="text-sm text-[#718096]">
              Already have an account?{" "}
              <Link href="https://app.trystereos.com/" className="text-[#2b2e3a] font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
