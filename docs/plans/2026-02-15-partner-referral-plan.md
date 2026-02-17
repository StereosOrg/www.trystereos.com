# Partner Referral Program Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a partner referral application, onboarding, dashboard, and free-trial landing page with BetterAuth + Resend integration.

**Architecture:** Partners apply at `/partners`, get created as BetterAuth users (role=partner) with a linked Partner record (status=pending). After manual admin approval via API, partners access a dashboard at `/partners/dashboard` with referral link management. Referral links land on `/free-trial?partner=X&code=Y`.

**Tech Stack:** Next.js 15 App Router, Drizzle ORM + Neon PostgreSQL, BetterAuth, Resend, React Hook Form + Zod, shadcn/ui, Tailwind CSS

---

### Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install Drizzle ORM and Resend**

Run:
```bash
npm install drizzle-orm resend
npm install -D drizzle-kit
```

**Step 2: Verify installation**

Run: `npm ls drizzle-orm resend drizzle-kit`
Expected: All three packages listed

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add drizzle-orm and resend dependencies"
```

---

### Task 2: Drizzle Client + Partner Schema

**Files:**
- Create: `lib/db/drizzle.ts`
- Create: `lib/db/partner-schema.ts`

**Step 1: Create Drizzle client**

Create `lib/db/drizzle.ts`:

```typescript
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import * as partnerSchema from "./partner-schema";

let _drizzlePool: Pool | null = null;

function getPool() {
  if (!_drizzlePool) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL environment variable is required");
    _drizzlePool = new Pool({ connectionString: url });
  }
  return _drizzlePool;
}

export const db = drizzle(getPool(), { schema: partnerSchema });
```

**Step 2: Create Partner schema**

Create `lib/db/partner-schema.ts` with these tables:

- `partnerTierEnum`: pgEnum with values `['bronze', 'silver', 'gold', 'platinum']`
- `partnerStatusEnum`: pgEnum with values `['pending', 'active', 'inactive', 'suspended']`
- `partnerTypeEnum`: pgEnum with values `['affiliate', 'reseller', 'integration', 'strategic']`
- `referralTypeEnum`: pgEnum with values `['click', 'signup']`
- `partners` table: exactly as provided in the user's schema, plus a `user_id` text column (references BetterAuth user.id)
- `referrals` table: id (text PK, crypto.randomUUID), partner_id (text, FK to partners.id), referral_type (referralTypeEnum), referred_email (text, nullable), created_at (timestamptz, defaultNow)

Index on `referrals.partner_id`.

**Step 3: Create drizzle config**

Create `drizzle.config.ts` at project root:

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/partner-schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

**Step 4: Generate and apply migration**

Run:
```bash
npx drizzle-kit generate
npx drizzle-kit push
```

Expected: Tables created in database

**Step 5: Commit**

```bash
git add lib/db/drizzle.ts lib/db/partner-schema.ts drizzle.config.ts drizzle/
git commit -m "feat: add drizzle ORM setup with partner and referral schemas"
```

---

### Task 3: Email Service Setup (Resend)

**Files:**
- Create: `lib/email.ts`

**Step 1: Create email module**

Create `lib/email.ts`:

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Stereos Partners <partners@trystereos.com>";

export async function sendApplicationReceived(email: string, name: string) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "We received your partner application",
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #2b2e3a;">Thanks for applying, ${name}!</h2>
        <p style="color: #718096; line-height: 1.6;">
          We've received your application to join the Stereos Partner Program.
          Our team will review it and get back to you soon.
        </p>
        <p style="color: #718096; line-height: 1.6;">
          In the meantime, if you have any questions, reply to this email.
        </p>
        <p style="color: #2b2e3a; font-weight: 600;">— The Stereos Team</p>
      </div>
    `,
  });
}

export async function sendPartnerApproved(
  email: string,
  name: string,
  tempPassword: string
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.trystereos.com";
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Welcome to the Stereos Partner Program!",
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #2b2e3a;">You're in, ${name}!</h2>
        <p style="color: #718096; line-height: 1.6;">
          Your partner application has been approved. You now have access to your
          partner dashboard where you can manage your referral links and track performance.
        </p>
        <p style="color: #718096; line-height: 1.6;">
          <strong>Your temporary password:</strong> ${tempPassword}<br/>
          Please change it after your first login.
        </p>
        <a href="${baseUrl}/partners/login"
           style="display: inline-block; padding: 12px 24px; background: #2b2e3a; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 8px;">
          Go to Dashboard
        </a>
        <p style="color: #2b2e3a; font-weight: 600; margin-top: 24px;">— The Stereos Team</p>
      </div>
    `,
  });
}
```

**Step 2: Add RESEND_API_KEY to .env.local**

Add to `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
```

(User fills in their actual Resend API key)

**Step 3: Commit**

```bash
git add lib/email.ts
git commit -m "feat: add Resend email service with partner email templates"
```

---

### Task 4: Partner Application API (`POST /api/partners/apply`)

**Files:**
- Create: `app/api/partners/apply/route.ts`

**Step 1: Create the apply API route**

This endpoint:
1. Validates input with Zod
2. Creates a BetterAuth user with `auth.api.signUpEmail()` (role='partner', random password)
3. Creates a Partner record via Drizzle (status=pending, auto-generated partner_code)
4. Sends application received email via Resend
5. Returns success with redirect URL

```typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { partners } from "@/lib/db/partner-schema";
import { sendApplicationReceived } from "@/lib/email";
import { nanoid } from "nanoid";

const applySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().min(1).max(200),
  industry: z.string().min(1).max(100),
  audience_size: z.number().int().positive().optional(),
  type: z.enum(["affiliate", "reseller", "integration", "strategic"]),
  message: z.string().max(1000).optional(),
});

function generatePartnerCode(name: string): string {
  const prefix = name
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 6);
  const suffix = nanoid(4).toUpperCase();
  return `${prefix}-${suffix}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = applySchema.parse(body);

    // Generate a random password for the BetterAuth user
    const tempPassword = nanoid(16);

    // Create BetterAuth user
    const signUpResult = await auth.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: tempPassword,
      },
    });

    if (!signUpResult?.user) {
      return NextResponse.json(
        { error: "Failed to create account. Email may already be registered." },
        { status: 400 }
      );
    }

    // Update user role to 'partner'
    // BetterAuth doesn't let us set role on signup since input:false,
    // so we update via raw SQL
    const { sql } = await import("@/lib/db/postgres");
    await sql`UPDATE "user" SET role = 'partner' WHERE id = ${signUpResult.user.id}`;

    // Create Partner record
    const partnerCode = generatePartnerCode(data.company);
    await db.insert(partners).values({
      name: data.company,
      email: data.email,
      partner_code: partnerCode,
      tier: "bronze",
      status: "pending",
      audience_size: data.audience_size ?? null,
      industry: data.industry,
      type: data.type,
      user_id: signUpResult.user.id,
    });

    // Send confirmation email
    await sendApplicationReceived(data.email, data.name);

    return NextResponse.json({ success: true, redirect: "/partners/pending" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Partner apply error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
```

**Notes:**
- The partner schema needs a `user_id` field added — make sure Task 2 includes it.
- `nanoid` is already in package.json.
- `sql` is imported from the existing `lib/db/postgres.ts` for the role update.

**Step 2: Commit**

```bash
git add app/api/partners/apply/route.ts
git commit -m "feat: add partner application API endpoint"
```

---

### Task 5: Partner Approval API (`POST /api/partners/approve`)

**Files:**
- Create: `app/api/partners/approve/route.ts`

**Step 1: Create the approve API route**

This endpoint:
1. Accepts `partner_id` in body
2. Checks for a secret admin key in Authorization header (simple auth)
3. Updates partner status to `active`
4. Generates a new temp password for the partner's BetterAuth user
5. Sends approval email with temp password

```typescript
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import { partners } from "@/lib/db/partner-schema";
import { eq } from "drizzle-orm";
import { sendPartnerApproved } from "@/lib/email";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import { sql } from "@/lib/db/postgres";

export async function POST(req: NextRequest) {
  // Simple admin auth via secret key
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { partner_id } = await req.json();
  if (!partner_id) {
    return NextResponse.json({ error: "partner_id required" }, { status: 400 });
  }

  // Get partner
  const [partner] = await db
    .select()
    .from(partners)
    .where(eq(partners.id, partner_id));

  if (!partner) {
    return NextResponse.json({ error: "Partner not found" }, { status: 404 });
  }

  if (partner.status === "active") {
    return NextResponse.json({ error: "Partner already active" }, { status: 400 });
  }

  // Update status to active
  await db
    .update(partners)
    .set({ status: "active" })
    .where(eq(partners.id, partner_id));

  // Generate new temp password and update BetterAuth user
  const tempPassword = nanoid(12);
  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  if (partner.user_id) {
    await sql`UPDATE account SET password = ${hashedPassword} WHERE "userId" = ${partner.user_id} AND "providerId" = 'credential'`;
  }

  // Send approval email
  await sendPartnerApproved(partner.email, partner.name, tempPassword);

  return NextResponse.json({ success: true });
}
```

**Env var needed:** `ADMIN_SECRET` in `.env.local`

**Step 2: Commit**

```bash
git add app/api/partners/approve/route.ts
git commit -m "feat: add partner approval API endpoint"
```

---

### Task 6: Referral Tracking API (`POST /api/partners/track`)

**Files:**
- Create: `app/api/partners/track/route.ts`

**Step 1: Create the track API route**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import { partners, referrals } from "@/lib/db/partner-schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { partner_code, type } = await req.json();

    if (!partner_code || !type) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Validate partner exists and is active
    const [partner] = await db
      .select()
      .from(partners)
      .where(eq(partners.partner_code, partner_code));

    if (!partner || partner.status !== "active") {
      return NextResponse.json({ error: "Invalid partner" }, { status: 404 });
    }

    // Record referral
    await db.insert(referrals).values({
      partner_id: partner.id,
      referral_type: type,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
```

**Step 2: Commit**

```bash
git add app/api/partners/track/route.ts
git commit -m "feat: add referral tracking API endpoint"
```

---

### Task 7: Application Form Component

**Files:**
- Create: `components/partners/application-form.tsx`

**Step 1: Create the application form**

Client component using React Hook Form + Zod. Fields:
- Full name (text input)
- Email (email input)
- Company/Organization name (text input)
- Industry (text input)
- Audience size (number input)
- Partner type (select: affiliate, reseller, integration, strategic)
- Message (textarea)

Styling:
- Card wrapper: `rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-8`
- Input styling: use existing `<Input />` from `components/ui/input.tsx` with custom classes to match the design system
- Labels: `text-sm font-medium text-[#2b2e3a]`
- Submit button: `rounded-lg bg-[#2b2e3a] text-white font-medium h-12 px-6`
- Form grid: 2-column grid on desktop, single column on mobile
- On submit: POST to `/api/partners/apply`, on success redirect to `/partners/pending` via `router.push()`
- Loading state on submit button
- Error display using toast (sonner)

Use shadcn `Select` component from `components/ui/select.tsx` for partner type.
Use shadcn `Textarea` component from `components/ui/textarea.tsx` for message.

**Step 2: Commit**

```bash
git add components/partners/application-form.tsx
git commit -m "feat: add partner application form component"
```

---

### Task 8: Partners Application Page (`/partners`)

**Files:**
- Modify: `app/partners/page.tsx` (replace entire file)

**Step 1: Replace the coming-soon page**

New page structure:
1. `<TopNav />`
2. Hero section with `<DitheringShader />` background (same as homepage)
   - Headline: "Partner Program"
   - Subheading: "Join the Stereos Partner Program and earn commissions by referring enterprise teams to our key management platform."
   - Mint badge: "Now accepting applications"
3. Below hero: benefits section with 3 cards (icon + title + description):
   - "Competitive Commissions" — earn recurring revenue
   - "Marketing Support" — co-branded materials and resources
   - "Partner Dashboard" — real-time tracking and analytics
4. Application form section with `<ApplicationForm />`
5. Footer (same pattern as homepage)

Design tokens match homepage exactly: colors, card styles, shadows, typography.

**Step 2: Commit**

```bash
git add app/partners/page.tsx
git commit -m "feat: replace partners coming-soon with application page"
```

---

### Task 9: Pending Confirmation Page (`/partners/pending`)

**Files:**
- Create: `app/partners/pending/page.tsx`

**Step 1: Create pending page**

Simple, clean confirmation page:
- TopNav
- Centered card with:
  - Mint green checkmark icon in `bg-[#88edc3]/50` circle
  - "Application Received" heading
  - "Thanks for your interest in the Stereos Partner Program. Our team will review your application and get back to you within 2-3 business days."
  - "You'll receive an email confirmation shortly."
  - Link to `/partners/login`: "Already have an account? Sign in"
- No DitheringShader (keep it clean and focused)

**Step 2: Commit**

```bash
git add app/partners/pending/page.tsx
git commit -m "feat: add partner application pending confirmation page"
```

---

### Task 10: Partner Login Page (`/partners/login`)

**Files:**
- Create: `app/partners/login/page.tsx`

**Step 1: Create login page**

Client component:
- TopNav
- Centered login card:
  - "Partner Login" heading
  - Email + password inputs
  - Submit button
  - Uses `signIn.email()` from `lib/auth-client.ts`
  - On success:
    - Fetch partner record from a new API endpoint (or use session + redirect)
    - Check partner status
    - If `active` → `router.push("/partners/dashboard")`
    - If `pending` → show inline pending message (don't navigate away)
  - Error handling via toast

We need a small helper API to check partner status after login.

**Step 2: Create partner status check API**

Create `app/api/partners/me/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db/drizzle";
import { partners } from "@/lib/db/partner-schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const [partner] = await db
    .select()
    .from(partners)
    .where(eq(partners.user_id, session.user.id));

  if (!partner) {
    return NextResponse.json({ error: "No partner record" }, { status: 404 });
  }

  return NextResponse.json({ partner });
}
```

**Step 3: Commit**

```bash
git add app/partners/login/page.tsx app/api/partners/me/route.ts
git commit -m "feat: add partner login page and status check API"
```

---

### Task 11: Referral Link Card Component

**Files:**
- Create: `components/partners/referral-link-card.tsx`

**Step 1: Create the referral link card**

Client component. Props: `partnerName: string, partnerCode: string`.

- Card with `rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6`
- Title: "Your Referral Link"
- Generates URL: `${baseUrl}/free-trial?partner=${slugify(partnerName)}&code=${partnerCode}`
  - `slugify`: lowercase, replace spaces with hyphens, remove non-alphanumeric
- Display URL in a read-only input with monospace font
- Copy button using `navigator.clipboard.writeText()`
- Toast notification on copy: "Link copied to clipboard!"
- Also show partner code separately with its own copy button

**Step 2: Commit**

```bash
git add components/partners/referral-link-card.tsx
git commit -m "feat: add referral link card component with copy functionality"
```

---

### Task 12: Stats Cards Component

**Files:**
- Create: `components/partners/stats-cards.tsx`

**Step 1: Create stats display**

Server component (or client with data passed as props). Props: `clicks: number, signups: number`.

Two stat cards side by side:
- "Referral Clicks" — large number, icon (MousePointerClick from lucide)
- "Signups" — large number, icon (UserPlus from lucide)

Card styling matches design system. Numbers in `text-3xl font-bold text-[#2b2e3a] tabular-nums`.

**Step 2: Commit**

```bash
git add components/partners/stats-cards.tsx
git commit -m "feat: add partner stats cards component"
```

---

### Task 13: Partner Dashboard Page (`/partners/dashboard`)

**Files:**
- Create: `app/partners/dashboard/page.tsx`

**Step 1: Create the dashboard page**

Server component that:
1. Gets session via `auth.api.getSession({ headers: await headers() })`
2. If no session → redirect to `/partners/login`
3. Fetches partner record by `user_id`
4. If no partner or status !== 'active' → redirect to `/partners/login`
5. Fetches referral stats (count clicks, count signups from referrals table)

Layout:
- TopNav
- `max-w-5xl mx-auto` container
- Welcome header: "Welcome back, {name}" with tier badge
- "Member since {date}" in muted text
- Grid layout:
  - `<ReferralLinkCard />` (full width)
  - `<StatsCards />` (2 columns)
  - Account info card: email, partner code, tier, status

**Step 2: Commit**

```bash
git add app/partners/dashboard/page.tsx
git commit -m "feat: add partner dashboard page with referral tracking"
```

---

### Task 14: Free Trial Landing Page (`/free-trial`)

**Files:**
- Create: `app/free-trial/page.tsx`

**Step 1: Create the free trial page**

Server component. Reads `searchParams` for `partner` and `code`.

**With valid partner params:**
1. Server-side: look up partner by `partner_code` matching `code` param
2. If valid and active partner found:
   - Track the click via direct DB insert (no API call needed, we're server-side)
   - Show partner referral banner: "You've been referred by **{Partner Name}**" in a mint green banner
3. If invalid code → show generic page (no error, just no banner)

**Page layout (both variants):**
- TopNav
- Hero with DitheringShader background
- Headline: "Start your 14-day free trial"
- Subheading about Stereos benefits
- 3 benefit cards (similar to homepage bento):
  - Key management at team level
  - Real-time spend tracking
  - CFO-friendly reporting
- CTA button: "Get started free" → links to `https://app.trystereos.com/` (preserves referral in a cookie if partner params present)
- Set a `stereos_ref` cookie with partner code (httpOnly, 30-day expiry) so the main app can track the referral

**Step 2: Commit**

```bash
git add app/free-trial/page.tsx
git commit -m "feat: add free trial landing page with partner referral support"
```

---

### Task 15: Final Integration + Build Verification

**Files:**
- Modify: `components/top-nav.tsx` (no changes needed — already links to /partners)

**Step 1: Verify the build**

Run:
```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 2: Manual smoke test**

Run: `npm run dev`

Test these flows:
1. Visit `/partners` — see application form
2. Submit application → redirects to `/partners/pending`
3. Visit `/partners/login` — see login form
4. Visit `/free-trial` — see generic marketing page
5. Visit `/free-trial?partner=test&code=INVALID` — see generic page (no error)

**Step 3: Commit any fixes**

```bash
git add -A
git commit -m "feat: complete partner referral program integration"
```

---

## Environment Variables Needed

Add to `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
ADMIN_SECRET=your-admin-secret-here
```

## Summary

| Task | What | Key Files |
|------|------|-----------|
| 1 | Install deps | package.json |
| 2 | Drizzle + schema | lib/db/drizzle.ts, lib/db/partner-schema.ts |
| 3 | Email service | lib/email.ts |
| 4 | Apply API | app/api/partners/apply/route.ts |
| 5 | Approve API | app/api/partners/approve/route.ts |
| 6 | Track API | app/api/partners/track/route.ts |
| 7 | Application form | components/partners/application-form.tsx |
| 8 | Partners page | app/partners/page.tsx |
| 9 | Pending page | app/partners/pending/page.tsx |
| 10 | Login page + me API | app/partners/login/page.tsx, app/api/partners/me/route.ts |
| 11 | Referral link card | components/partners/referral-link-card.tsx |
| 12 | Stats cards | components/partners/stats-cards.tsx |
| 13 | Dashboard page | app/partners/dashboard/page.tsx |
| 14 | Free trial page | app/free-trial/page.tsx |
| 15 | Build verification | — |
