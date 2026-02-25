import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { ChevronLeft, Calendar } from "lucide-react"
import { TopNav } from "@/components/top-nav"
import { RichTextRenderer } from "@/components/blog/rich-text-renderer"
import { getPostBySlug, getAllPostSlugs } from "@/lib/hygraph"
import { SiteFooter } from "@/components/site-footer"

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Stereos Blog`,
    description: post.excerpt ?? undefined,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const date = post.publishedAt
    ? format(new Date(post.publishedAt), "MMMM d, yyyy")
    : null

  return (
    <div className="min-h-screen bg-white bg-grid-black/[0.02]">
      <TopNav />

      <main className="pt-16">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ChevronLeft className="w-4 h-4" />
            Blog
          </Link>

          {/* Post header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              {post.title}
            </h1>

            {/* Author + meta */}
            {post.author && (
              <div className="flex items-center gap-3">
                {post.author.photo && (
                  <Image
                    src={post.author.photo.url}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full ring-1 ring-border"
                  />
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">
                    {post.author.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {post.author.title && `${post.author.title} · `}
                    {date}
                    {post.readTime && ` · ${post.readTime} min read`}
                  </span>
                </div>
              </div>
            )}

            {/* Date only if no author */}
            {!post.author && date && (
              <span className="text-sm text-muted-foreground">
                {date}
                {post.readTime && ` · ${post.readTime} min read`}
              </span>
            )}
          </header>

          <hr className="border-border mb-10" />

          {/* Cover image */}
          {post.coverImage && (
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-10">
              <Image
                src={post.coverImage.url}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Body */}
          {post.body?.raw && (
            <RichTextRenderer content={post.body.raw} />
          )}

          {/* CTA */}
          <div className="mt-16 relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
            <div className="absolute inset-0 bg-grid-black/[0.02]" />
            {/* Green accent top bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#88edc3]" />
            <div className="relative px-8 py-12 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#88edc3]/20 px-3 py-1 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#88edc3]" />
                <span className="text-xs font-semibold text-[#2b2e3a]">14-day free trial</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2b2e3a] mb-4 leading-snug">
                Stop writing policies.{" "}
                <br />
                Start giving access.
              </h2>
              <p className="text-base text-[#718096] max-w-sm mx-auto mb-8">
                Give your team the freedom to use the AI tools they love, while your security team gets full visibility and control — without the policy wars.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="https://app.trystereos.com/"
                  className="inline-flex items-center justify-center rounded-lg bg-[#2b2e3a] text-white font-medium shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:bg-[#1a1c24] transition-colors h-11 px-6 text-sm"
                >
                  Start 14-day free trial
                </Link>
                <Link
                  href="https://cal.com/jbohrman/45-min-meeting"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] bg-white font-medium text-[#2b2e3a] hover:bg-gray-50 transition-colors h-11 px-6 text-sm"
                >
                  Schedule a demo
                  <Calendar size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
