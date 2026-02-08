import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Government Solutions | Atelier Logos',
  description: 'Modern digital services for mission-driven government teams. FedRAMP-compliant solutions with spec-driven development for federal, state, and local agencies.',
}

const focusAreas = [
  {
    title: "Secure infrastructure",
    body: "Designing resilient platforms that meet FedRAMP and CJIS expectations with observability and governance baked in.",
  },
  {
    title: "Citizen workflows",
    body: "Orchestrating user journeys that make services feel human while keeping data traceable and auditable.",
  },
  {
    title: "Data-first intelligence",
    body: "Modernizing analytics stacks so agencies can act on insights faster without compromising privacy.",
  },
]

const engagementHighlights = [
  "Specification-led delivery that keeps procurement and program offices aligned.",
  "Hybrid teams of engineers, product strategists, and compliance leads.",
  "Integrations with SSA, IRS, and state identity providers using secure APIs.",
]

export default function GovernmentPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 lg:px-0">
        <section className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Government</p>
          <h1 className="text-4xl font-semibold md:text-5xl lg:text-6xl">
            Modern digital services for mission-driven teams.
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            We partner with federal, state, and local governments to translate complex mandates into
            elegant, compliant experiences. Every engagement pairs standards-first engineering with
            transparent delivery so stakeholders stay confident from kickoff through steady state.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {focusAreas.map((area) => (
            <div
              key={area.title}
              className="border border-border/50 rounded-2xl bg-white/80 p-6 shadow-sm shadow-black/5"
            >
              <h3 className="text-lg font-semibold">{area.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{area.body}</p>
            </div>
          ))}
        </section>

        <section className="space-y-4 rounded-2xl border border-border/50 bg-muted/20 p-8">
          <h2 className="text-2xl font-semibold">What government leaders expect</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {engagementHighlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-border/30 bg-white/95 p-8 text-foreground shadow-2xl shadow-black/5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(147,197,253,0.25),transparent_55%)]" />
          <div className="relative space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-muted-foreground">Ready to brief leadership?</p>
            <h2 className="text-3xl font-bold leading-tight text-foreground">Book a call with our compliance-friendly product studio.</h2>
            <p className="text-sm text-muted-foreground max-w-3xl">
              We can stand up a small team and operate inside your procurement guardrails with weekly demos and artifacts you can share with budget teams.
            </p>
            <div className="flex flex-wrap gap-3 pt-3">
              <Button asChild className="rounded-2xl bg-black text-white shadow-lg shadow-black/20">
                <Link href="mailto:hello@atelierlogos.com">Email our team</Link>
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
