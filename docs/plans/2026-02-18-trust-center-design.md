# Trust Center Design

**Date:** 2026-02-18
**Status:** Approved
**Scope:** www.trystereos.com marketing site

---

## Objectives

- Reduce security questionnaire friction for enterprise procurement
- Establish "SOC 2 in progress" posture publicly
- Support AI governance brand via data-handling transparency
- Gate CAIQ/security packet download behind email capture (Resend)

---

## Architecture

**Approach:** Option A — Static RSC pages + Next.js Route Handler for email gate. No new infra required. PDFs stored in `/public/trust/` with opaque filenames.

**Stack:** Next.js App Router, Tailwind, Sora font, lucide-react icons.
**Design tokens:** `#2b2e3a` (dark text), `#718096` (muted), `#88edc3` (accent green), `#E2E8F0` (border), white background, `bg-grid-black/[0.02]` grid.

---

## File Structure

```
app/trust/
  layout.tsx            ← shared trust layout: TopNav + trust sidebar nav + main content
  page.tsx              ← /trust overview
  security/page.tsx     ← /trust/security
  compliance/page.tsx   ← /trust/compliance
  subprocessors/page.tsx← /trust/subprocessors
  data-handling/page.tsx← /trust/data-handling
  downloads/page.tsx    ← /trust/downloads (email form)
  route.ts              ← POST /trust → Resend email + return PDF URL

components/trust/
  trust-nav.tsx         ← sidebar (desktop) / tabs (mobile) with 5 links + active state
  status-badge.tsx      ← reusable "SOC 2 Type I – Targeted Q4 2026" badge

public/trust/
  security-overview.pdf ← placeholder slot (PDF added separately)

components/footer.tsx   ← add "Trust Center" link under Resources
```

---

## Page Content

### /trust (Overview)
- Hero: security philosophy headline + 1-sentence subtext
- 4 status cards: Encryption at Rest, MFA Enforced, Zero Data Retention (default), SOC 2 Targeted Q4 2026
- Infrastructure provider logos: Cloudflare, Vercel, Neon, Stripe
- Contact CTA: james@trystereos.com

### /trust/security
Sections (card per item, lucide icon, prose paragraph):
- Access Control Policy
- MFA Enforcement
- RBAC Implementation
- Secret Management
- Logging & Monitoring
- Incident Response
- Change Management

### /trust/compliance
- SOC 2 alignment statement with explicit "aligned, not certified" disclaimer
- CAIQ completion status badge
- Control mapping summary table
- Vendor SOC 2 reliance model explanation

### /trust/data-handling
- Two-column: what IS processed | what is NOT stored
- Prompt retention policy (not stored by default — ZDR via Cloudflare AI Gateway `zdr: true`)
- Metadata logging policy
- Encryption in transit (TLS 1.2+) and at rest (AES-256)
- ZDR-by-default callout

### /trust/subprocessors
Table columns: Vendor | Role | Data Processed | Region
Rows: Vercel, Cloudflare, Neon, Stripe, PostHog, Resend
Last updated date shown.

### /trust/downloads
- Description of what's in the Security Overview packet
- Email gate form: Name + Work Email → POST /trust
- Route Handler: validates input → sends Resend email with PDF download link → returns 200
- Success state: confirmation message shown inline
- PDF placeholder: `/public/trust/security-overview.pdf`

---

## Navigation Updates

- `components/footer.tsx`: Add "Trust Center" link (`/trust`) under Resources section
- No top nav change (trust center is linked from footer + direct URL)

---

## Email Gate Flow

```
User fills form (name + email)
  → POST /trust (Next.js Route Handler)
    → validate inputs
    → call Resend API: send email with PDF link
    → return { success: true }
  → Client shows success message
```

Resend email includes:
- Subject: "Your Stereos Security Overview"
- Body: brief intro + direct PDF link
- From: james@trystereos.com (or noreply@trystereos.com)

---

## Non-Goals (This Pass)

- PDF design/content (placeholder slot only)
- Vercel Blob signed URLs
- Machine-readable OSCAL export
- Full CAIQ spreadsheet (linked separately when ready)
- Top nav addition
