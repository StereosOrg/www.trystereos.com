import { getTopicHub, getAllHubSlugs } from '@/lib/topic-hubs'
import { getGuidesByTopic } from '@/lib/guides'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight, BookOpen } from 'lucide-react'
import { Spectral } from 'next/font/google'

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
})

interface TopicHubPageProps {
  params: {
    hub: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllHubSlugs()
  return slugs.map((slug) => ({
    hub: slug,
  }))
}

export async function generateMetadata({ params }: TopicHubPageProps): Promise<Metadata> {
  const hub = await getTopicHub(params.hub)

  if (!hub) {
    return {
      title: 'Topic Not Found',
      description: 'The requested topic could not be found.'
    }
  }

  return {
    title: `${hub.title} | Atelier Logos`,
    description: hub.metaDescription,
    keywords: hub.keywords,
    openGraph: {
      images: [`/api/og/topics?title=${encodeURIComponent(hub.title)}&subtitle=${encodeURIComponent(hub.metaDescription)}`],
    },
  }
}

export default async function TopicHubPage({ params }: TopicHubPageProps) {
  const hub = await getTopicHub(params.hub)
  const guides = await getGuidesByTopic(params.hub)

  if (!hub) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="container relative mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center rounded-xl border-4 border-black bg-white px-6 py-2 text-sm font-bold text-foreground mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <BookOpen className="mr-2 h-4 w-4 flex-shrink-0" />
              <span>Topic Hub</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {hub.heroTitle}
            </h1>
            <p className={`text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto ${spectral.className}`}>
              {hub.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="pb-12 md:pb-16 lg:pb-24">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">

          {/* Guides Navigation Card */}
          {guides.length > 0 && (
            <div className="mb-12 md:mb-16">
              <div className="rounded-xl border-4 border-black bg-white p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Explore {guides.length} Related Guides
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {guides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={guide.url}
                      className="group flex items-start gap-3 text-sm p-3 rounded-lg border-2 border-transparent hover:border-black hover:bg-primary/5 transition-all"
                    >
                      <ArrowRight className="h-4 w-4 flex-shrink-0 mt-0.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <div>
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {guide.title}
                        </div>
                        <div className={`text-xs text-muted-foreground line-clamp-2 mt-1 ${spectral.className}`}>
                          {guide.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Content Sections */}
          <div className="space-y-12 md:space-y-16">

            {/* Overview */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 md:mb-6">Overview</h2>
              <div
                className={`prose prose-base md:prose-lg dark:prose-invert max-w-none ${spectral.className}
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-headings:text-foreground prose-strong:text-foreground
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-a:break-words
                  prose-ul:text-muted-foreground prose-li:text-muted-foreground`}
                dangerouslySetInnerHTML={{ __html: hub.overview }}
              />
            </section>

            {/* Key Benefits */}
            <section className="bg-white rounded-xl border-4 border-black p-6 md:p-8 lg:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 md:mb-6">Key Benefits</h2>
              <div
                className={`prose prose-base md:prose-lg dark:prose-invert max-w-none ${spectral.className}
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-headings:text-foreground prose-strong:text-foreground
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-a:break-words
                  prose-ul:text-muted-foreground prose-li:text-muted-foreground`}
                dangerouslySetInnerHTML={{ __html: hub.keyBenefits }}
              />
            </section>

            {/* How It Works */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 md:mb-6">How It Works</h2>
              <div
                className={`prose prose-base md:prose-lg dark:prose-invert max-w-none ${spectral.className}
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-headings:text-foreground prose-strong:text-foreground
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-a:break-words
                  prose-code:bg-black/5 dark:prose-code:bg-white/10 prose-code:text-foreground prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                  prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-code:break-words prose-code:font-semibold
                  prose-pre:!bg-black prose-pre:!text-white prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:border-0
                  prose-pre:shadow-lg
                  [&_pre_code]:!text-white [&_pre_code]:!bg-transparent
                  prose-ul:text-muted-foreground prose-li:text-muted-foreground`}
                dangerouslySetInnerHTML={{ __html: hub.howItWorks }}
              />
            </section>

            {/* Best Practices */}
            <section className="bg-white rounded-xl border-4 border-black p-6 md:p-8 lg:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 md:mb-6">Best Practices</h2>
              <div
                className={`prose prose-base md:prose-lg dark:prose-invert max-w-none ${spectral.className}
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-headings:text-foreground prose-strong:text-foreground
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-a:break-words
                  prose-code:bg-black/5 dark:prose-code:bg-white/10 prose-code:text-foreground prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                  prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-code:break-words prose-code:font-semibold
                  prose-pre:!bg-black prose-pre:!text-white prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:border-0
                  prose-pre:shadow-lg
                  [&_pre_code]:!text-white [&_pre_code]:!bg-transparent
                  prose-ul:text-muted-foreground prose-li:text-muted-foreground`}
                dangerouslySetInnerHTML={{ __html: hub.bestPractices }}
              />
            </section>

            {/* CTA */}
            <section className="border-t-4 border-black pt-8 md:pt-12">
              <div className="rounded-xl border-4 border-black bg-white p-6 md:p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                  Ready to Get Started?
                </h2>
                <p className={`text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto ${spectral.className}`}>
                  Let's discuss how we can help you implement these concepts in your project.
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
        </div>
      </article>

      <Footer />
    </main>
  )
}
