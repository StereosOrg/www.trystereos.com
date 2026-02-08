import { getGuide, getRelatedGuides, getAllGuideSlugs } from '@/lib/guides'
import { getTopicHub } from '@/lib/topic-hubs'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { RelatedContent } from '@/components/related-content'
import { getRelatedContent } from '@/lib/related-content'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Home, BookOpen } from 'lucide-react'
import { Spectral } from 'next/font/google'

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
})

interface GuidePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllGuideSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = await getGuide(slug)

  if (!guide) {
    return {
      title: 'Guide Not Found',
      description: 'The requested guide could not be found.'
    }
  }

  return {
    title: `${guide.title} | Atelier Logos`,
    description: guide.description,
    keywords: guide.keywords,
    openGraph: {
      title: guide.title,
      description: guide.description,
      images: [`/api/og?title=${encodeURIComponent(guide.title)}&subtitle=${encodeURIComponent(guide.description)}`],
    },
  }
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params
  const guide = await getGuide(slug)
  const relatedGuides = await getRelatedGuides(slug)

  if (!guide) {
    notFound()
  }

  // Get parent topic if exists
  const parentTopic = guide.topic ? await getTopicHub(guide.topic) : null

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Breadcrumbs */}
      <section className="border-b-4 border-black bg-white">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-foreground transition-colors flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              Guides
            </Link>
            {parentTopic && (
              <>
                <span>/</span>
                <Link href={parentTopic.url} className="hover:text-foreground transition-colors">
                  {parentTopic.title}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-foreground font-medium">{guide.title}</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">
          {parentTopic && (
            <Link
              href={parentTopic.url}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {parentTopic.title}
            </Link>
          )}
          {guide.image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={guide.image}
                alt={guide.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
            {guide.title}
          </h1>
          <p className={`text-base md:text-lg text-muted-foreground leading-relaxed ${spectral.className}`}>
            {guide.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="pb-12 md:pb-16 lg:pb-24">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">

          {/* Content */}
          <div className="mb-12 md:mb-16">
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
                prose-ul:text-muted-foreground prose-li:text-muted-foreground
                prose-blockquote:border-l-4 prose-blockquote:border-primary/40 prose-blockquote:pl-4
                prose-table:border-collapse prose-table:w-full
                prose-thead:border-b-2 prose-thead:border-border
                prose-th:text-left prose-th:font-semibold prose-th:text-foreground prose-th:py-3 prose-th:px-4
                prose-td:text-foreground prose-td:py-3 prose-td:px-4 prose-td:border-t prose-td:border-border
                prose-tr:border-b prose-tr:border-border`}
              dangerouslySetInnerHTML={{ __html: guide.content }}
            />
          </div>

          {/* Related Content */}
          <RelatedContent items={getRelatedContent(slug)} title="Continue Learning" />

          {/* Related Guides */}
          {relatedGuides.length > 0 && (
            <section className="border-t-4 border-black pt-8 md:pt-12 mb-12">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6">More from this Topic</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedGuides.map((related) => (
                  <Link
                    key={related.slug}
                    href={related.url}
                    className="group flex flex-col p-4 rounded-xl border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <ArrowRight className="h-4 w-4 flex-shrink-0 mt-1 text-primary" />
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                    </div>
                    <p className={`text-sm text-muted-foreground line-clamp-2 ${spectral.className}`}>
                      {related.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back to Topic Hub */}
          {parentTopic && (
            <section className="border-t-4 border-black pt-8">
              <div className="rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold mb-1">Explore More</h3>
                    <p className={`text-sm text-muted-foreground ${spectral.className}`}>
                      Discover more guides in {parentTopic.title}
                    </p>
                  </div>
                  <Link
                    href={parentTopic.url}
                    className="inline-flex h-10 items-center justify-center rounded-lg bg-primary border-4 border-black text-black px-6 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    View Topic
                  </Link>
                </div>
              </div>
            </section>
          )}

        </div>
      </article>

      <Footer />
    </main>
  )
}
