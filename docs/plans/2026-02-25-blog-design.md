# Blog Design — 2026-02-25

## Overview

Add a public blog at `/blog` and `/blog/[slug]` to the Stereos marketing site, styled after raindrop.ai's blog design but using Stereos' existing design system. Content is managed via Hygraph (headless CMS) with a GraphQL API.

## Tech Stack

- **CMS**: Hygraph (GraphQL Content API)
- **Data fetching**: `graphql-request` + server-side Next.js (ISR, revalidate 60s)
- **Rich text**: `@hygraph/rich-text-react-renderer`
- **Styling**: Existing Tailwind config, shadcn/ui components, Sora font, `@tailwindcss/typography`

## Architecture

```
Hygraph CMS
  └── GraphQL Content API
        └── graphql-request (server-side)
              ├── /app/blog/page.tsx          ← listing page (ISR)
              └── /app/blog/[slug]/page.tsx   ← post page (ISR)

lib/
  └── hygraph.ts     ← GraphQL client + typed queries

components/
  └── blog/
        ├── blog-card.tsx
        ├── blog-featured.tsx
        └── rich-text-renderer.tsx
```

## Hygraph Content Model

**Post** model fields:
- `title` — String (required)
- `slug` — String (unique, required)
- `excerpt` — String
- `coverImage` — Asset
- `publishedAt` — DateTime
- `readTime` — Int (minutes)
- `author` — Component: `{ name: String, title: String, photo: Asset }`
- `body` — Rich Text
- `featured` — Boolean (pins post as hero on listing page)

## Pages

### `/blog` — Listing Page

- White background with subtle `bg-grid-black/[0.02]` dot pattern (matches homepage)
- Existing `TopNav` with "Blog" link added
- **Featured section**: One `featured: true` post rendered as a large hero card — cover image on the left, title/excerpt/author/date on the right. Falls back to most recent post if none flagged.
- **Recent posts grid**: 3-column responsive grid of `BlogCard` components — cover image on top, uppercase date metadata, title, excerpt, author avatar + name
- Section dividers using horizontal rules with section labels ("Recent Posts")
- Cards: `rounded-xl`, `border-border`, hover shadow lift + subtle image scale transition

### `/blog/[slug]` — Post Page

- `max-w-3xl` centered layout, `min-h-screen bg-background`
- Back-to-blog link (`← Blog`) at top-left
- Header: author avatar (40×40, rounded-full), author name + title, publication date, read time
- Horizontal rule separating header from body
- Body rendered with `@tailwindcss/typography` `prose` class + Sora font override
- Custom `prose` overrides: uses `--foreground` for text, `--border` for `hr`/blockquote borders, `--muted-foreground` for code backgrounds

## Theming

All styling uses existing CSS variables — no new colors. Sora font throughout. Fully consistent with the current design system.

## Data Fetching Pattern

```ts
// lib/hygraph.ts
import { GraphQLClient } from "graphql-request"

const client = new GraphQLClient(process.env.HYGRAPH_ENDPOINT!)

export async function getAllPosts() { ... }
export async function getPostBySlug(slug: string) { ... }
export async function getFeaturedPost() { ... }
```

ISR via `export const revalidate = 60` on both route files.

## Navigation

Add "Blog" link to `TopNav` (desktop nav + mobile menu).

## New Dependencies

- `graphql-request`
- `@hygraph/rich-text-react-renderer`

## Environment Variables

- `HYGRAPH_ENDPOINT` — Hygraph Content API endpoint URL
