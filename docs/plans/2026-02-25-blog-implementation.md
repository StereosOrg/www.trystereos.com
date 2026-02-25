# Blog Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a public blog at `/blog` and `/blog/[slug]` powered by Hygraph CMS, styled to match the raindrop.ai blog layout using Stereos' existing design system.

**Architecture:** `graphql-request` fetches posts from the Hygraph GraphQL Content API at build time. Both pages use ISR (`revalidate = 60`). Rich text body is rendered with `@hygraph/rich-text-react-renderer`. No test framework is configured in this project — skip test steps and verify visually via `next dev`.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS, Sora font (`--font-sora`), shadcn/ui, `graphql-request`, `@hygraph/rich-text-react-renderer`, `@tailwindcss/typography` (already installed)

**Key project conventions to know:**
- `cn()` utility is at `lib/utils.ts`
- CSS variables: `--background`, `--foreground`, `--border`, `--muted`, `--muted-foreground` (defined in `app/globals.css`)
- Pages use `bg-white bg-grid-black/[0.02]` for the subtle dot grid background
- `TopNav` is at `components/top-nav.tsx` — has desktop nav links + mobile menu
- `images: { unoptimized: true }` is set in `next.config.mjs` — no need to add remote image domains
- Alias `@/` maps to project root

---

## Task 1: Install dependencies

**Files:** none (shell only)

**Step 1: Install packages**

```bash
npm install graphql-request @hygraph/rich-text-react-renderer
```

**Step 2: Verify install**

```bash
cat package.json | grep -E "graphql-request|hygraph"
```

Expected: both packages appear in `dependencies`.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat(blog): add graphql-request and hygraph rich text renderer"
```

---

## Task 2: Set up Hygraph content model

This is a manual step in the Hygraph dashboard — no code.

**Step 1: Create a Hygraph account and project**

Go to https://app.hygraph.com and create a new project.

**Step 2: Create an `Author` component**

In Schema → Components → Add Component:
- Name: `Author`
- Fields:
  - `name` — Single line text (required)
  - `title` — Single line text
  - `photo` — Asset

**Step 3: Create a `Post` model**

In Schema → Models → Add Model:
- Name: `Post`
- Fields (add in this order):
  - `title` — Single line text (required)
  - `slug` — Slug field, based on `title` (required, unique)
  - `excerpt` — Single line text
  - `coverImage` — Asset
  - `publishedAt` — Date and time
  - `readTime` — Integer (minutes)
  - `author` — Component, select `Author`
  - `body` — Rich text
  - `featured` — Boolean (default: false)

**Step 4: Create 2-3 sample posts**

In Content → Post → Add entry. Fill in all fields. Mark one post `featured: true`.

**Step 5: Copy your Content API endpoint**

In Settings → API Access → Endpoints → copy the "Content API" URL. It looks like:
```
https://api-<region>.hygraph.com/v2/<hash>/master
```

**Step 6: Add to environment**

Create `.env.local` at project root (if it doesn't exist):

```bash
echo 'HYGRAPH_ENDPOINT="<paste your endpoint here>"' >> .env.local
```

No commit needed — `.env.local` should be gitignored.

---

## Task 3: Create Hygraph client and typed queries

**Files:**
- Create: `lib/hygraph.ts`

**Step 1: Write the file**

```ts
// lib/hygraph.ts
import { GraphQLClient, gql } from "graphql-request"

const client = new GraphQLClient(process.env.HYGRAPH_ENDPOINT!, {
  headers: {
    "Content-Type": "application/json",
  },
})

export interface Author {
  name: string
  title: string | null
  photo: { url: string } | null
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  coverImage: { url: string } | null
  publishedAt: string
  readTime: number | null
  featured: boolean
  author: Author | null
  body: { raw: Record<string, unknown> } | null
}

const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    title
    slug
    excerpt
    coverImage { url }
    publishedAt
    readTime
    featured
    author {
      name
      title
      photo { url }
    }
  }
`

export async function getAllPosts(): Promise<Post[]> {
  const query = gql`
    ${POST_FIELDS}
    query AllPosts {
      posts(orderBy: publishedAt_DESC) {
        ...PostFields
      }
    }
  `
  const data = await client.request<{ posts: Post[] }>(query)
  return data.posts
}

export async function getFeaturedPost(): Promise<Post | null> {
  const query = gql`
    ${POST_FIELDS}
    query FeaturedPost {
      posts(where: { featured: true }, first: 1, orderBy: publishedAt_DESC) {
        ...PostFields
      }
    }
  `
  const data = await client.request<{ posts: Post[] }>(query)
  return data.posts[0] ?? null
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const query = gql`
    ${POST_FIELDS}
    query PostBySlug($slug: String!) {
      post(where: { slug: $slug }) {
        ...PostFields
        body { raw }
      }
    }
  `
  const data = await client.request<{ post: Post | null }>(query, { slug })
  return data.post
}

export async function getAllPostSlugs(): Promise<string[]> {
  const query = gql`
    query AllSlugs {
      posts { slug }
    }
  `
  const data = await client.request<{ posts: { slug: string }[] }>(query)
  return data.posts.map((p) => p.slug)
}
```

**Step 2: Commit**

```bash
git add lib/hygraph.ts
git commit -m "feat(blog): add Hygraph GraphQL client and typed queries"
```

---

## Task 4: Create `BlogCard` component

This renders a single post as a card for the recent posts grid (image on top, date, title, excerpt, author).

**Files:**
- Create: `components/blog/blog-card.tsx`

**Step 1: Create the directory and file**

```bash
mkdir -p components/blog
```

```tsx
// components/blog/blog-card.tsx
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Post } from "@/lib/hygraph"

interface BlogCardProps {
  post: Post
  className?: string
}

export function BlogCard({ post, className }: BlogCardProps) {
  const date = post.publishedAt
    ? format(new Date(post.publishedAt), "MMM d, yyyy")
    : null

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col rounded-xl border border-border bg-white overflow-hidden",
        "hover:shadow-md transition-all duration-200",
        className
      )}
    >
      {/* Cover image */}
      {post.coverImage && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.coverImage.url}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-2 p-5 flex-1">
        {date && (
          <span className="text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
            {date}
            {post.readTime && ` · ${post.readTime} min`}
          </span>
        )}

        <h3 className="font-semibold text-base text-foreground leading-snug group-hover:text-gray-600 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Author */}
        {post.author && (
          <div className="flex items-center gap-2 mt-auto pt-4">
            {post.author.photo && (
              <Image
                src={post.author.photo.url}
                alt={post.author.name}
                width={24}
                height={24}
                className="rounded-full ring-1 ring-border"
              />
            )}
            <span className="text-xs font-medium text-muted-foreground">
              {post.author.name}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
```

**Step 2: Commit**

```bash
git add components/blog/blog-card.tsx
git commit -m "feat(blog): add BlogCard component"
```

---

## Task 5: Create `BlogFeatured` component

This renders the hero/featured post as a large two-column card (image left, content right).

**Files:**
- Create: `components/blog/blog-featured.tsx`

**Step 1: Write the file**

```tsx
// components/blog/blog-featured.tsx
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Post } from "@/lib/hygraph"

interface BlogFeaturedProps {
  post: Post
  className?: string
}

export function BlogFeatured({ post, className }: BlogFeaturedProps) {
  const date = post.publishedAt
    ? format(new Date(post.publishedAt), "MMM d, yyyy")
    : null

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group grid md:grid-cols-2 rounded-2xl border border-border bg-white overflow-hidden",
        "hover:shadow-lg transition-all duration-200",
        className
      )}
    >
      {/* Cover image */}
      {post.coverImage && (
        <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
          <Image
            src={post.coverImage.url}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col justify-center gap-4 p-8">
        {date && (
          <span className="text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
            {date}
            {post.readTime && ` · ${post.readTime} min`}
          </span>
        )}

        <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight group-hover:text-gray-600 transition-colors">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="text-base text-muted-foreground leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {/* Author */}
        {post.author && (
          <div className="flex items-center gap-3 mt-2">
            {post.author.photo && (
              <Image
                src={post.author.photo.url}
                alt={post.author.name}
                width={36}
                height={36}
                className="rounded-full ring-1 ring-border"
              />
            )}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">
                {post.author.name}
              </span>
              {post.author.title && (
                <span className="text-xs text-muted-foreground">
                  {post.author.title}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
```

**Step 2: Commit**

```bash
git add components/blog/blog-featured.tsx
git commit -m "feat(blog): add BlogFeatured hero card component"
```

---

## Task 6: Create `RichTextRenderer` component

Wraps `@hygraph/rich-text-react-renderer` with Stereos prose styling.

**Files:**
- Create: `components/blog/rich-text-renderer.tsx`

**Step 1: Write the file**

```tsx
// components/blog/rich-text-renderer.tsx
"use client"

import { RichText } from "@hygraph/rich-text-react-renderer"

interface RichTextRendererProps {
  content: Record<string, unknown>
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
  return (
    <div
      className={[
        "prose prose-gray max-w-none",
        "prose-headings:font-sans prose-headings:font-bold prose-headings:text-foreground",
        "prose-p:text-[1.0625rem] prose-p:leading-7 prose-p:text-foreground",
        "prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline",
        "prose-blockquote:border-l-4 prose-blockquote:border-border prose-blockquote:text-muted-foreground",
        "prose-code:bg-muted prose-code:text-foreground prose-code:rounded prose-code:px-1",
        "prose-pre:bg-muted prose-pre:border prose-pre:border-border",
        "prose-img:rounded-xl prose-img:shadow-sm",
        "prose-hr:border-border",
      ].join(" ")}
    >
      <RichText content={content} />
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add components/blog/rich-text-renderer.tsx
git commit -m "feat(blog): add RichTextRenderer with Stereos prose styling"
```

---

## Task 7: Create blog listing page

**Files:**
- Create: `app/blog/page.tsx`

**Step 1: Write the file**

```tsx
// app/blog/page.tsx
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
    <div className="min-h-screen bg-white bg-grid-black/[0.02]">
      <TopNav />

      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Blog
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Thoughts on AI security, developer enablement, and building with LLMs.
            </p>
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
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                  Recent Posts
                </h2>
                <hr className="flex-1 border-border" />
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
```

**Step 2: Verify dev server starts without errors**

```bash
npm run dev
```

Open http://localhost:3000/blog — should show the listing page with your Hygraph posts.

**Step 3: Commit**

```bash
git add app/blog/page.tsx
git commit -m "feat(blog): add blog listing page with featured + grid layout"
```

---

## Task 8: Create blog post page

**Files:**
- Create: `app/blog/[slug]/page.tsx`

**Step 1: Write the file**

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { ChevronLeft } from "lucide-react"
import { TopNav } from "@/components/top-nav"
import { RichTextRenderer } from "@/components/blog/rich-text-renderer"
import { getPostBySlug, getAllPostSlugs } from "@/lib/hygraph"

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
        </div>
      </main>
    </div>
  )
}
```

**Step 2: Verify**

Open http://localhost:3000/blog/your-post-slug — should show the full post.

**Step 3: Commit**

```bash
git add app/blog/[slug]/page.tsx
git commit -m "feat(blog): add blog post page with author header and rich text body"
```

---

## Task 9: Add Blog link to TopNav

**Files:**
- Modify: `components/top-nav.tsx`

The `TopNav` has a desktop nav section (around line 48-77) and a mobile nav section (around line 113-140). Add a "Blog" link to both.

**Step 1: Add to desktop nav**

Find the block that renders the `/partners` link in the desktop nav:

```tsx
<Link
  href="/partners"
  className={cn(
    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
    pathname === "/partners"
      ? "text-gray-900 bg-gray-100"
      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
  )}
>
  Partners
</Link>
```

Add this immediately after it:

```tsx
<Link
  href="/blog"
  className={cn(
    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
    pathname === "/blog" || pathname.startsWith("/blog/")
      ? "text-gray-900 bg-gray-100"
      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
  )}
>
  Blog
</Link>
```

**Step 2: Add to mobile nav**

Find the mobile `/partners` link block and add after it:

```tsx
<Link
  href="/blog"
  onClick={() => setMobileOpen(false)}
  className={cn(
    "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
    pathname === "/blog" || pathname.startsWith("/blog/")
      ? "bg-gray-100 text-gray-900"
      : "text-gray-700 hover:bg-gray-50"
  )}
>
  Blog
</Link>
```

**Step 3: Verify**

Check http://localhost:3000 — "Blog" should appear in the nav, highlighted when on `/blog`.

**Step 4: Commit**

```bash
git add components/top-nav.tsx
git commit -m "feat(blog): add Blog link to TopNav desktop and mobile menus"
```

---

## Task 10: Final verification and cleanup

**Step 1: Build check**

```bash
npm run build
```

Expected: build completes without errors. TypeScript errors are ignored by `tsconfig` settings, but fix any obvious runtime errors.

**Step 2: Spot check all routes**

- `/blog` — listing page loads, featured post + grid visible
- `/blog/[slug]` — post page loads with title, author, body
- TopNav "Blog" link active-highlights correctly on both routes

**Step 3: Commit (if any fixes made)**

```bash
git add -A
git commit -m "fix(blog): address build issues"
```
