import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"
import { Pricing } from "@/components/pricing"
import {
  Sparkles,
  Code2,
  Globe,
  Box,
  FileCode2,
  Heart,
  ArrowRight,
  Github,
  GitBranch
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background bg-grid-black/[0.02]">
      <Sidebar />

      {/* Main Content - offset for sidebar on desktop */}
      <main className="md:ml-64 pt-20 md:pt-0">
        {/* Hero Section */}
        <section className="min-h-screen px-6 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
              Stop sending your LLM usage patterns into the void 🌀
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
             Stereos is the only tool that provides deep drilldowns into your team's LLM usage. Understand how LLMs are impacting your projects and your team.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-16">
              <Button
                asChild
                size="lg"
                className="bg-primary border-4 border-black text-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <Link href="https://app.trystereos.com/">
                  Get Started
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <Link href="https://marketplace.visualstudio.com/items?itemName=Stereos.stereos-provenance" target="_blank">
                  <svg className="mr-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>
                  Install the Extension
                </Link>
              </Button>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 mb-16">
              {/* Large Card - Deep Drilldowns */}
              <div className="md:col-span-2 md:row-span-3 relative overflow-hidden border-4 border-black bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 text-sm font-bold bg-white border-2 border-black mb-4">
                    Best-in-Class
                  </span>
                  <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
                    Deep Drilldowns
                  </h3>
                  <p className="text-lg text-gray-700 max-w-md mb-6">
                    See changes in realtime with file-level diffs. Understand who changed what, and what tool they used.
                  </p>

                  {/* Diff Screenshot */}
                  <div className="border-2 border-black rounded-lg overflow-hidden shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <img
                      src="/deep-drilldown-diff.png"
                      alt="Stereos file-level diff view showing LLM provenance attribution"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-gradient-to-br from-emerald-200/50 to-transparent rounded-full blur-2xl" />
              </div>

              {/* Small Card - IDE Agnostic */}
              <div className="border-4 border-black bg-gradient-to-br from-violet-100 to-purple-50 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Globe className="w-8 h-8 mb-3 text-violet-600" />
                <h3 className="text-xl font-display font-bold mb-2">IDE Agnostic</h3>
                <p className="text-gray-600">
                  Published in VSIX format to VS Marketplace.
                </p>
              </div>

              {/* Small Card - OpenAPI Compliant */}
              <div className="border-4 border-black bg-gradient-to-br from-amber-100 to-yellow-50 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Code2 className="w-8 h-8 mb-3 text-amber-600" />
                <h3 className="text-xl font-display font-bold mb-2">OpenAPI Compliant</h3>
                <p className="text-gray-600">
                  Built on open standards. Easy to integrate into your products. 
                </p>
              </div>

              {/* Small Card - Collaborative */}
              <div className="border-4 border-black bg-gradient-to-br from-rose-100 to-pink-50 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <FileCode2 className="w-8 h-8 mb-3 text-rose-600" />
                <h3 className="text-xl font-display font-bold mb-2">Collaborative</h3>
                <p className="text-gray-600">
                  Comment on changes, share insights, and collaborate across your team.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20 border-t-4 border-black">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Stereos is a central usage repo for your teams LLM-enabled tool usage
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
              Drill down, analyze, critique, and compare LLM tool usage across your projects and your team. Don't let your LLM usage be a black box.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                <div className="w-12 h-12 bg-emerald-100 border-2 border-black flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">Beautiful UX</h3>
                <p className="text-muted-foreground">
                  Intuitive and delightful interface designed for developers and teams. No learning curve. 
                </p>
              </div>

              {/* Feature 2 */}
              <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                <div className="w-12 h-12 bg-blue-100 border-2 border-black flex items-center justify-center mb-4">
                  <Code2 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">Developer-first</h3>
                <p className="text-muted-foreground">
                  We want to make the relationship between developers and LLMs thrive by tracking what gets done.  
                </p>
              </div>

              {/* Feature 3 */}
              <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                <div className="w-12 h-12 bg-violet-100 border-2 border-black flex items-center justify-center mb-4">
                  <GitBranch className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">Git-centric Model</h3>
                <p className="text-muted-foreground">
                  Built on Git principles. Commit attribution, diffs, and provenance for your LLM usage data.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                <div className="w-12 h-12 bg-orange-100 border-2 border-black flex items-center justify-center mb-4">
                  <Box className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">Ledger Export</h3>
                <p className="text-muted-foreground">
                  Export your usage ledger to JSON for custom analysis, internal dashboards, or compliance needs.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                <div className="w-12 h-12 bg-cyan-100 border-2 border-black flex items-center justify-center mb-4">
                  <FileCode2 className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">Deterministic</h3>
                <p className="text-muted-foreground">
                 Multiple layers of trigger fallbacks such as Language Model Tools API and file system watchers.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                <div className="w-12 h-12 bg-pink-100 border-2 border-black flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">Source Available</h3>
                <p className="text-muted-foreground">
                  Elastic v2 license. Source available on GitHub. We believe in transparency and community collaboration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="px-6 py-20 border-t-4 border-black bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Pricing Commitments
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
              Our pricing is simple and transparent. You only pay for what you use — $75/mo per tool profile and $0.12 per ledger event. We also offer a 14-day free trial.
            </p>

            <Pricing />
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-t-4 border-black bg-primary">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold">SOC 2</div>
                <div className="text-sm font-medium text-gray-700">Aligned</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold">100%</div>
                <div className="text-sm font-medium text-gray-700">Serverless</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold">24/7</div>
                <div className="text-sm font-medium text-gray-700">Support Available</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold">Elastic v2</div>
                <div className="text-sm font-medium text-gray-700">License</div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="px-6 py-20 border-t-4 border-black bg-grid-black/[0.02]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Ready to create a ledger?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Create an account in seconds.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary border-4 border-black text-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <Link href="https://github.com/StereosOrg/stereos">
                  View the repo
                  <Github className="ml-2" size={18} />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <Link href="https://marketplace.visualstudio.com/items?itemName=Stereos.stereos-provenance" target="_blank">
                  <svg className="mr-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>
                  Install the extension
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t-4 border-black bg-background px-6 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div>
                <h4 className="font-display font-bold mb-4">Resources</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link href="https://marketplace.visualstudio.com/items?itemName=Stereos.stereos-provenancelog" className="hover:text-foreground transition-colors">Extension</Link></li>
                  <li><Link href="/" className="hover:text-foreground transition-colors">Guides</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-display font-bold mb-4">Community</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link href="https://github.com/StereosOrg/stereos" target="_blank" className="hover:text-foreground transition-colors">GitHub</Link></li>
                  <li><Link href="https://github.com/StereosOrg/stereos/issues" target="_blank" className="hover:text-foreground transition-colors">Issues</Link></li>
                  <li><Link href="https://github.com/StereosOrg/stereos/discussions" target="_blank" className="hover:text-foreground transition-colors">Discussions</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-display font-bold mb-4">Legal</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
                  <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t-2 border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-xl">Stereos</span>
              </div>
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Stereos. ELv2 License.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
