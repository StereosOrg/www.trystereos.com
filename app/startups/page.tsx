import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Startup Solutions | Atelier Logos',
  description: 'Launch faster with a spec-driven product studio. From MVP to Series B, we help startups ship production-ready code with modern ops and premium design.',
}

const growthSignals = [
  {
    label: "From idea to investor-ready",
    description:
      "Product strategy sessions that capture the thesis, positioning, and traction metrics angels care about.",
  },
  {
    label: "Ship with modern ops",
    description: "We build serverless foundations, observability, and CI/CD so you can iterate confidently at venture speed.",
  },
  {
    label: "Design that feels premium",
    description: "Prototyping to final UI with system-level thinking ensures your brand remains distinctive as you scale.",
  },
]

const partnershipPhases = [
  {
    title: "Discovery Sprint",
    description: "Rapid spec workshops, technical feasibility mapping, and early mockups.",
  },
  {
    title: "Bi-weekly Demos",
    description: "Camera-ready builds with the updates you can show investors and early users.",
  },
  {
    title: "Analytics & Ops",
    description: "Telemetry, growth hooks, and handoff docs wired into your stack.",
  },
]

export default function StartupsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 lg:px-0">
        <section className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Startups</p>
          <h1 className="text-4xl font-semibold md:text-5xl lg:text-6xl">
            Launch faster with a spec-driven product studio.
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            We join founders who need more than contractors—partners who can analyze market data, wireframe experiences, and write production-ready code in lockstep with your team.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {growthSignals.map((signal) => (
            <div key={signal.label} className="rounded-3xl border border-border/40 bg-white/80 p-6 shadow-sm">
              <h3 className="text-lg font-semibold">{signal.label}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{signal.description}</p>
            </div>
          ))}
        </section>

        <section className="space-y-4 rounded-2xl border border-border/40 bg-white/70 p-8">
          <h2 className="text-3xl font-semibold">Our partnership rhythm</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {partnershipPhases.map((phase) => (
              <div key={phase.title} className="rounded-2xl border border-border/20 p-4 text-sm text-muted-foreground">
                <h3 className="font-semibold text-foreground">{phase.title}</h3>
                <p className="mt-1">{phase.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-border/30 bg-white/95 p-8 text-foreground shadow-2xl shadow-black/5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(147,197,253,0.25),transparent_55%)]" />
          <div className="relative space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-muted-foreground">Let’s build</p>
            <h2 className="text-3xl font-bold leading-tight text-foreground">Tell us about your next milestone.</h2>
            <p className="text-sm text-muted-foreground max-w-3xl">
              We scale with you from pre-seed experiments to Series B launches, staying flexible so your roadmap can evolve without friction.
            </p>
            <div className="flex flex-wrap gap-3 pt-3">
              <Button asChild className="rounded-2xl bg-black text-white shadow-lg shadow-black/20">
                <Link href="mailto:hello@atelierlogos.com">Email our founders desk</Link>
              </Button>
              <Button asChild variant="ghost" className="rounded-2xl border border-border/60 text-foreground hover:bg-muted/40">
                <Link href="https://www.linkedin.com/company/atelierlogos/" target="_blank" rel="noreferrer">
                  Message on LinkedIn
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
