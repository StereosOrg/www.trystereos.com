import { getIndustryGuide, getAllIndustrySlugs } from '@/lib/industries'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ShareWidget } from '@/components/share-widget'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { Spectral } from 'next/font/google'

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
})

interface IndustryPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllIndustrySlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const guide = await getIndustryGuide(params.slug)

  if (!guide) {
    return {
      title: 'Industry Guide Not Found',
      description: 'The requested industry guide could not be found.'
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.trystereos.com'
  const guideUrl = `${baseUrl}/industries/${params.slug}`

  const ogImageUrl = `/api/og/industries?title=${encodeURIComponent(guide.title)}&subtitle=${encodeURIComponent(guide.metaDescription)}`

  return {
    title: `${guide.title} | Atelier Logos`,
    description: guide.metaDescription,
    keywords: guide.keywords,
    authors: [{ name: guide.author }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      url: guideUrl,
      siteName: 'Atelier Logos',
      type: 'article',
      publishedTime: guide.published,
      authors: [guide.author],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: guide.title,
          type: 'image/png',
        }
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.metaDescription,
      images: [ogImageUrl],
      creator: '@atelierlogos',
      site: '@atelierlogos',
    },
    alternates: {
      canonical: guideUrl,
    },
    other: {
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:type': 'image/png',
      'twitter:label1': 'Industry',
      'twitter:data1': guide.industry,
      'twitter:label2': 'Reading time',
      'twitter:data2': `${guide.estimatedReadTime} min read`,
      'article:author': guide.author,
      'article:published_time': guide.published,
      'article:section': guide.industry,
      'article:tag': guide.keywords.join(', '),
    }
  }
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const guide = await getIndustryGuide(params.slug)

  if (!guide) {
    notFound()
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.trystereos.com'
  const guideUrl = `${baseUrl}/industries/${params.slug}`

  // Table of contents
  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'challenges', title: 'Key Challenges' },
    { id: 'approach', title: 'Our Approach' },
    { id: 'architecture', title: 'Architecture Patterns' },
    { id: 'technical', title: 'Technical Deep Dive' },
    { id: 'benefits', title: 'Benefits' },
  ]

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-20 lg:py-28">
        <div className="container relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center rounded-xl border-4 border-black bg-white px-6 py-2 text-sm font-bold text-foreground mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span>{guide.industry}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6 leading-tight">
                {guide.heroTitle}
              </h1>
              <p className={`text-base md:text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed ${spectral.className}`}>
                {guide.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#overview"
                  className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-lg bg-primary border-4 border-black text-black px-8 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  Read the Guide
                </Link>
                <Link
                  href="https://cal.com/team/atelierlogos/greenfield-retainer-intro"
                  className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-lg border-4 border-black bg-white text-black px-8 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  Schedule a Call
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="whitespace-nowrap">{guide.estimatedReadTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="truncate">{guide.author}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="pb-12 md:pb-16 lg:pb-24">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">

          {/* Table of Contents Card */}
          <div className="mb-12 md:mb-16">
            <div className="rounded-xl border-4 border-black bg-white p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Table of Contents
              </h2>
              <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded-lg border-2 border-transparent hover:border-black hover:bg-primary/5"
                  >
                    <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>{section.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12 md:space-y-16">

              {/* Overview */}
              <section id="overview" className="scroll-mt-20 md:scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 md:mb-6">Overview</h2>
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
                    [&_pre_code]:!text-white [&_pre_code]:!bg-transparent`}
                  dangerouslySetInnerHTML={{ __html: guide.overview }}
                />
              </section>

              {/* Challenges */}
              <section id="challenges" className="scroll-mt-20 md:scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 md:mb-6">Key Challenges</h2>
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
                  dangerouslySetInnerHTML={{ __html: guide.challenges }}
                />
              </section>

              {/* Spec-Driven Approach */}
              <section id="approach" className="scroll-mt-20 md:scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 md:mb-6">Our Spec-Driven Approach</h2>
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
                  dangerouslySetInnerHTML={{ __html: guide.specDrivenApproach }}
                />
              </section>

              {/* Architecture Patterns */}
              <section id="architecture" className="scroll-mt-20 md:scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 md:mb-6">Architecture Patterns</h2>
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
                  dangerouslySetInnerHTML={{ __html: guide.architecturePatterns }}
                />
              </section>

              {/* Technical Deep Dive */}
              <section id="technical" className="scroll-mt-20 md:scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 md:mb-6">Technical Deep Dive</h2>
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
                  dangerouslySetInnerHTML={{ __html: guide.technicalDeepDive }}
                />
              </section>

              {/* Benefits */}
              <section id="benefits" className="scroll-mt-20 md:scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 md:mb-6">Benefits</h2>
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
                  dangerouslySetInnerHTML={{ __html: guide.benefits }}
                />
              </section>

              {/* Call to Action */}
              <section className="scroll-mt-20 md:scroll-mt-24 border-t-4 border-black pt-8 md:pt-12">
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
                    [&_pre_code]:!text-white [&_pre_code]:!bg-transparent`}
                  dangerouslySetInnerHTML={{ __html: guide.callToAction }}
                />
              </section>

              {/* Related Industries */}
              {guide.relatedIndustries.length > 0 && (
                <section className="scroll-mt-20 md:scroll-mt-24 border-t-4 border-black pt-8 md:pt-12">
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4 md:mb-6">Related Industry Guides</h2>
                  <div className="flex flex-wrap gap-3">
                    {guide.relatedIndustries.map((industry) => (
                      <Link
                        key={industry}
                        href={`/industries/${industry.toLowerCase().replace(/\s+/g, '-')}`}
                        className="inline-flex items-center rounded-lg border-4 border-black bg-white px-4 py-2 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                      >
                        <span className="truncate">{industry}</span>
                        <svg className="ml-2 h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Keywords */}
              <section className="border-t-4 border-black pt-6 md:pt-8">
                <div className="flex flex-wrap gap-2">
                  {guide.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="text-xs px-3 py-1.5 bg-white border-2 border-black rounded-full text-foreground font-bold truncate max-w-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </section>

            </div>
        </div>
      </article>

      {/* Floating share button */}
      <ShareWidget
        url={guideUrl}
        title={guide.title}
        description={guide.metaDescription}
        variant="floating"
      />

      <Footer />
    </main>
  )
}
