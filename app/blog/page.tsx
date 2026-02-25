import type { Metadata } from "next"
import { TopNav } from "@/components/top-nav"
import { BlogFeatured } from "@/components/blog/blog-featured"
import { BlogCard } from "@/components/blog/blog-card"
import { getAllPosts, getFeaturedPost } from "@/lib/hygraph"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Blog | Stereos",
  description: "Thoughts on AI security, developer enablement, and building with LLMs.",
}

export default async function BlogPage() {
  const [allPosts, featuredPost] = await Promise.all([
    getAllPosts(),
    getFeaturedPost(),
  ])

  const hero = featuredPost ?? allPosts[0] ?? null
  const recentPosts = allPosts.filter((p) => p.id !== hero?.id).slice(0, 6)

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />

      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Blog
            </h1>
          </div>

          {/* Featured post */}
          {hero && (
            <section className="mb-16">
              <BlogFeatured post={hero} />
            </section>
          )}

          {/* Recent posts */}
          {recentPosts.length > 0 && (
            <section>
              <div className="mb-8">
                <h2 className="text-xl font-bold text-foreground mb-3">
                  Recent Posts
                </h2>
                <hr className="border-border" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* Empty state */}
          {!hero && recentPosts.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">
              No posts yet. Check back soon.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
