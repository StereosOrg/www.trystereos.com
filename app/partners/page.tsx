import { TopNav } from "@/components/top-nav"
import { DitheringShader } from "@/components/dithering-shader"
import { ApplicationForm } from "@/components/partners/application-form"
import { DollarSign, Megaphone, BarChart3 } from "lucide-react"

export const metadata = {
  title: "Partner Program | Stereos",
  description: "Join the Stereos Partner Program. Earn commissions by referring enterprise teams.",
}

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Commissions",
    description: "Earn recurring revenue for every enterprise team you refer to Stereos.",
  },
  {
    icon: Megaphone,
    title: "Marketing Support",
    description: "Access co-branded materials, resources, and dedicated partner support.",
  },
  {
    icon: BarChart3,
    title: "Partner Dashboard",
    description: "Real-time tracking of referrals, conversions, and commission earnings.",
  },
]

export default function PartnersPage() {
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
            <span className="inline-block px-3 py-1.5 bg-[#88edc3] rounded-lg text-[11px] font-semibold uppercase tracking-wider text-[#2b2e3a] mb-6">
              Now Accepting Applications
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#2b2e3a] mb-6">
              Partner Program
            </h1>

            <p className="text-lg md:text-xl text-[#718096] max-w-2xl leading-relaxed">
              Join the Stereos Partner Program and earn commissions by referring enterprise teams to our key management and spend OS platform.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="border-t border-[#E2E8F0] bg-white px-6 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-4">
                    <benefit.icon className="w-5 h-5 text-[#2b2e3a]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#2b2e3a] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[#718096] text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section className="border-t border-[#E2E8F0] bg-white px-6 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[#2b2e3a] mb-4">
                Apply to become a partner
              </h2>
              <p className="text-[#718096] text-lg">
                Fill out the form below and our team will review your application within 2-3 business days.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <ApplicationForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
