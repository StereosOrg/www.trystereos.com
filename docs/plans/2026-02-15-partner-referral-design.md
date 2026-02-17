# Partner Referral Program Design

## Overview

Build a partner referral application, onboarding, and dashboard system. Partners apply via `/partners`, get created as BetterAuth users with pending status, and receive a dashboard with referral link management once approved.

## Database

**New dependency:** Drizzle ORM (`drizzle-orm` + `drizzle-kit` + `drizzle-orm/neon-serverless`)

**New file:** `lib/db/drizzle.ts` — Drizzle client using Neon serverless
**New file:** `lib/db/partner-schema.ts` — Partner table using the provided pgTable schema

### Tables

**Partner** (provided schema):
- id, name, email, partner_code (unique), tier (bronze/silver/gold/platinum), status (pending/active/inactive/suspended), audience_size, industry, type (affiliate/reseller/integration/strategic), image_url, user_id (FK to BetterAuth user), created_at, updated_at

**Referral** (new):
- id, partner_id (FK), referral_type ('click' | 'signup'), referred_email, created_at

### Partner Code Generation
Auto-generate a URL-friendly code from the partner name + random suffix (e.g., `ACME-X7K2`).

## Email (Resend)

**New dependency:** `resend`
**New file:** `lib/email.ts`

Templates:
- `sendApplicationReceived(email, name)` — "Thanks for applying, we'll review your application"
- `sendPartnerApproved(email, name, loginUrl)` — "You're approved! Here's your dashboard"

**Env var:** `RESEND_API_KEY`

## Routes

| Route | Type | Auth | Description |
|-------|------|------|-------------|
| `/partners` | Page | Public | Application form + marketing hero |
| `/partners/pending` | Page | Public | "Application received" confirmation |
| `/partners/login` | Page | Public | Partner login form |
| `/partners/dashboard` | Page | Protected (active partner) | Partner dashboard |
| `/free-trial` | Page | Public | Marketing landing with partner branding |
| `POST /api/partners/apply` | API | Public | Handle application |
| `POST /api/partners/track` | API | Public | Track referral click |
| `POST /api/partners/approve` | API | Admin | Approve partner + send email |

## Flow

### Application (`/partners`)
1. Hero section with DitheringShader, headline about the partner program
2. Below: application form card with fields: name, email, company, industry, audience size, partner type (select), message (textarea)
3. On submit → `POST /api/partners/apply`:
   - Create BetterAuth user via `auth.api.signUpEmail()` with email + random password, role='partner'
   - Create Partner record (status=pending, auto-generated partner_code)
   - Send "application received" email via Resend
4. Redirect to `/partners/pending`

### Pending State (`/partners/pending`)
- Clean confirmation page: "Your application has been received"
- Explains next steps, shows estimated review time
- Link to `/partners/login` for returning partners

### Partner Login (`/partners/login`)
- Email + password form using BetterAuth `signIn.email`
- After login: check partner status
  - If `pending` → show pending status card
  - If `active` → redirect to `/partners/dashboard`
  - If no partner record → error

### Approval (Manual)
- Admin calls `POST /api/partners/approve` with partner_id
- Sets partner status to `active`
- Sends approval email via Resend with dashboard link + temporary password reset link

### Dashboard (`/partners/dashboard`)
Protected: requires BetterAuth session + partner status = 'active'.

Components:
- **Welcome header**: partner name, tier badge (mint green `bg-[#88edc3]`), member since
- **Referral Link Card**: displays `/free-trial?partner={url-friendly-name}&code={partner_code}`, copy button
- **Stats cards**: total clicks, total signups (from referrals table)
- **Partner code display**: with copy button
- **Account section**: email, tier, status

### Free Trial Page (`/free-trial`)
- **With params** (`?partner=acme&code=TESTCODE`): Server-side validates partner code, shows "Referred by {Partner Name}" banner, tracks click in referrals table, CTA links to `https://app.trystereos.com/` with referral cookie
- **Without params**: Generic marketing page with CTA to app

## Design System

All new pages follow the existing homepage design:

- **Colors**: `#2b2e3a` (text), `#718096` (muted), `#88edc3` (accent), `#E2E8F0` (borders), white bg
- **Cards**: `rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)]`
- **Buttons**: `rounded-lg bg-[#2b2e3a] text-white` (primary), outline variant with `border-[#E2E8F0]`
- **Badges**: `bg-[#88edc3] rounded-lg text-[11px] font-semibold uppercase tracking-wider`
- **Icon containers**: `w-10 h-10 rounded-lg bg-[#88edc3]/50`
- **Hero**: DitheringShader background with `#88edc3` color
- **Layout**: `max-w-5xl mx-auto`, TopNav, consistent spacing
- **Typography**: Sora font, bold headings in `#2b2e3a`

## File Structure

```
lib/
  db/
    drizzle.ts          # Drizzle client
    partner-schema.ts   # Partner + Referral tables
  email.ts              # Resend setup + templates
app/
  partners/
    page.tsx            # Application form (replaces coming soon)
    pending/page.tsx    # Confirmation page
    login/page.tsx      # Partner login
    dashboard/page.tsx  # Partner dashboard (protected)
  free-trial/
    page.tsx            # Marketing landing with partner branding
  api/
    partners/
      apply/route.ts    # Application handler
      track/route.ts    # Referral tracking
      approve/route.ts  # Admin approval
components/
  partners/
    application-form.tsx    # Application form component
    partner-dashboard.tsx   # Dashboard layout
    referral-link-card.tsx  # Copy referral link component
    stats-cards.tsx         # Click/signup stats
    pending-status.tsx      # Pending state display
```
