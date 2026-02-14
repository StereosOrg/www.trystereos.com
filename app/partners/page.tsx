import Link from "next/link"
import { TopNav } from "@/components/top-nav"
import { Mail } from "lucide-react"

export const metadata = {
  title: "Partners | Stereos",
  description: "Stereos partnership program",
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-background bg-grid-black/[0.02]">
      <TopNav />

      <main className="pt-16">
        <section className="min-h-screen px-6 py-16 md:py-24 flex items-center justify-center">
          <div className="max-w-2xl mx-auto">
            <div className="border-4 border-black bg-white p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] bg-amber-100 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-6">
                Coming Soon
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Partners
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We&apos;re still working on our partnership program at the moment! If you are involved with an LLM tool in a stakeholder capacity, please send an email to{" "}
                <Link
                  href="mailto:james@trystereos.com"
                  className="font-bold text-black underline decoration-2 underline-offset-4 hover:text-emerald-700 transition-colors"
                >
                  james@trystereos.com
                </Link>{" "}
                and let&apos;s get some early conversations going.
              </p>
              <Link
                href="mailto:james@trystereos.com"
                className="inline-flex h-12 items-center justify-center px-6 border-4 border-black bg-primary text-black text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <Mail className="mr-2" size={18} />
                Get in touch
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
