# Stereos

**LLM tool usage ledger for teams**

Org-wide LLM usage attribution and change management. Stereos is the only tool that provides deep drilldowns into your team's LLM usage -- understand how LLMs are impacting your projects and your team.

This repo contains the homepage site at [trystereos.com](https://www.trystereos.com). The core Stereos product is at [github.com/StereosOrg/stereos](https://github.com/StereosOrg/stereos).

## What is Stereos?

Stereos is a central usage ledger for your team's LLM-enabled tool usage. It lets you:

- **Deep Drilldowns** -- See changes in realtime with file-level diffs. Understand who changed what, and what tool they used.
- **Git-centric Model** -- Commit attribution, diffs, and provenance for your LLM usage data.
- **Collaborative** -- Comment on changes, share insights, and collaborate across your team.
- **Ledger Export** -- Export your usage ledger to JSON for custom analysis, internal dashboards, or compliance needs.
- **Deterministic** -- Multiple layers of trigger fallbacks such as Language Model Tools API and file system watchers.
- **IDE Agnostic** -- Published in VSIX format to the [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=Stereos.stereos-provenance).
- **OpenAPI Compliant** -- Built on open standards. Easy to integrate into your products.
- **Source Available** -- Elastic v2 license. We believe in transparency and community collaboration.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Runtime**: React 19
- **Styling**: Tailwind CSS
- **UI**: Radix UI + shadcn/ui
- **Content**: MDX
- **Auth**: Supabase
- **Payments**: Stripe
- **Analytics**: Segment + PostHog

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

```bash
git clone https://github.com/StereosOrg/www.trystereos.com.git
cd www.trystereos.com
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm run start
```

## Project Structure

```
app/
  page.tsx              # Homepage
  sidebar.tsx           # Main navigation sidebar
  pricing.tsx           # Pricing section
  hero-section.tsx      # Hero component
  features.tsx          # Features grid
  footer.tsx            # Site footer
  ui/                   # shadcn/ui primitives
data/                   # Static content and data
lib/                    # Utilities and config
styles/                 # Global styles
public/                 # Static assets
```

## Deployment

Deployed on Vercel. Pushes to `main` trigger automatic deploys.

## License

Elastic License v2 (ELv2)