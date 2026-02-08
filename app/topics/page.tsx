import { getAllTopicHubs } from '@/lib/topic-hubs'
import { getGuidesByTopic } from '@/lib/guides'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { Metadata } from 'next'
import { BookOpen, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Topic Hubs | Atelier Logos',
  description: 'Explore comprehensive guides on spec-driven development, compliance engineering, llm security, and strategic tool selection.',
  keywords: ['software development', 'compliance', 'security', 'infrastructure', 'DevOps', 'technical guides'],
  openGraph: {
    images: ['/api/og/topics?title=Topic%20Hubs&subtitle=Comprehensive%20guides%20for%20regulated%20industries'],
  },
}

export default async function TopicsIndexPage() {
  const hubs = await getAllTopicHubs()

  // Fetch guides for each hub
  const hubsWithGuides = await Promise.all(
    hubs.map(async (hub) => {
      const guides = await getGuidesByTopic(hub.slug)
      return { ...hub, guides }
    })
  )

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="container relative mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-xl border-4 border-black bg-white px-6 py-2 text-sm font-bold text-foreground mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <BookOpen className="mr-2 h-4 w-4 flex-shrink-0" />
              <span>Knowledge Base</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Topic Hubs
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Comprehensive guides on building high-quality software for regulated industries.
              From spec-driven development to compliance engineering, security, and infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Topic Hubs Grid */}
      <section className="pb-16 md:pb-24 lg:pb-32">
        <div className="container mx-auto max-w-6xl px-6 lg:px-8">

          {hubsWithGuides.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No topic hubs available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {hubsWithGuides.map((hub) => (
                <Link
                  key={hub.slug}
                  href={hub.url}
                  className="group flex flex-col overflow-hidden rounded-xl border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  {/* Hub Header */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">
                        {hub.title}
                      </h2>
                      <ArrowRight className="h-6 w-6 flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {hub.description}
                    </p>

                    {/* Guide Count */}
                    {hub.guides.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>{hub.guides.length} detailed guides</span>
                      </div>
                    )}

                    {/* Preview of Guides */}
                    {hub.guides.length > 0 && (
                      <div className="border-t-2 border-black pt-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                          Topics Covered
                        </p>
                        <ul className="space-y-2">
                          {hub.guides.slice(0, 4).map((guide) => (
                            <li key={guide.slug} className="flex items-start gap-2 text-sm">
                              <svg className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                                {guide.title}
                              </span>
                            </li>
                          ))}
                          {hub.guides.length > 4 && (
                            <li className="flex items-start gap-2 text-sm text-primary font-medium">
                              <span className="ml-6">+{hub.guides.length - 4} more</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Hub Footer */}
                  <div className="mt-auto border-t-4 border-black bg-primary/10 px-6 md:px-8 py-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Comprehensive guide
                      </span>
                      <span className="font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Explore Hub
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Why These Topics Section */}
          <section className="mt-16 md:mt-24 max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                Why These Topics?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Building software for regulated industries requires expertise across multiple domains.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="h-10 w-10 rounded-lg border-4 border-black bg-primary flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Spec-Driven Development</h3>
                <p className="text-sm text-muted-foreground">
                  Write specifications first, generate implementation with LLM assistance, ship 3-4x faster.
                </p>
              </div>

              <div className="rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="h-10 w-10 rounded-lg border-4 border-black bg-primary flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Compliance Engineering</h3>
                <p className="text-sm text-muted-foreground">
                  Build regulatory requirements into your architecture from day one, pass audits first time.
                </p>
              </div>

              <div className="rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="h-10 w-10 rounded-lg border-4 border-black bg-primary flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">LLM Security</h3>
                <p className="text-sm text-muted-foreground">
                  Design and build LLM features to resist attacks and exploitation, not just be pretty feature addons.
                </p>
              </div>

              <div className="rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="h-10 w-10 rounded-lg border-4 border-black bg-primary flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Strategic Tooling Selection</h3>
                <p className="text-sm text-muted-foreground">
                  Build sustainable technology stacks through systematic evaluation, vendor assessment, and long-term strategic alignment
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16 md:mt-24">
            <div className="rounded-xl border-4 border-black bg-white p-8 md:p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                Need Help Implementing These Concepts?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                We help teams build compliant, secure software for regulated industries using
                spec-driven development and LLM-assisted engineering.
              </p>
              <Link
                href="https://cal.com/team/atelierlogos/greenfield-retainer-intro"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-primary border-4 border-black text-black px-8 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                Schedule a Consultation
              </Link>
            </div>
          </section>

        </div>
      </section>

      <Footer />
    </main>
  )
}
