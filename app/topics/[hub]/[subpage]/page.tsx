import { getSubpage, getTopicHub, getRelatedSubpages, getAllSubpagePaths } from '@/lib/topic-hubs'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Home } from 'lucide-react'

interface SubpageProps {
  params: {
    hub: string
    subpage: string
  }
}

export async function generateStaticParams() {
  const paths = getAllSubpagePaths()
  return paths.map(({ hub, subpage }) => ({
    hub,
    subpage,
  }))
}

export async function generateMetadata({ params }: SubpageProps): Promise<Metadata> {
  const subpage = await getSubpage(params.hub, params.subpage)

  if (!subpage) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.'
    }
  }

  return {
    title: `${subpage.title} | Atelier Logos`,
    description: subpage.description,
    keywords: subpage.keywords,
  }
}

export default async function SubpagePage({ params }: SubpageProps) {
  const subpage = await getSubpage(params.hub, params.subpage)
  const hub = await getTopicHub(params.hub)
  const relatedPages = await getRelatedSubpages(params.hub, params.subpage)

  if (!subpage || !hub) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Breadcrumbs */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <span>/</span>
            <Link href={hub.url} className="hover:text-foreground transition-colors">
              {hub.title}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{subpage.title}</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">
          <Link
            href={hub.url}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {hub.title}
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
            {subpage.title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {subpage.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="pb-12 md:pb-16 lg:pb-24">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">

          {/* Content */}
          <div className="mb-12 md:mb-16">
            <div
              className="prose prose-base md:prose-lg dark:prose-invert max-w-none
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
                prose-tr:border-b prose-tr:border-border"
              dangerouslySetInnerHTML={{ __html: subpage.content }}
            />
          </div>

          {/* Related Concepts - Aggressive Interlinking */}
          {relatedPages.length > 0 && (
            <section className="border-t border-border pt-8 md:pt-12 mb-12">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6">Related Concepts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPages.map((related) => (
                  <Link
                    key={related.slug}
                    href={related.url}
                    className="group flex flex-col p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <ArrowRight className="h-4 w-4 flex-shrink-0 mt-1 text-primary" />
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {related.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back to Hub */}
          <section className="border-t border-border pt-8">
            <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Explore More</h3>
                  <p className="text-sm text-muted-foreground">
                    Check out all {hub.subpages.length} topics in {hub.title}
                  </p>
                </div>
                <Link
                  href={hub.url}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-black text-white px-6 text-sm font-medium shadow transition-colors hover:bg-black/90"
                >
                  View Hub
                </Link>
              </div>
            </div>
          </section>

        </div>
      </article>

      <Footer />
    </main>
  )
}
