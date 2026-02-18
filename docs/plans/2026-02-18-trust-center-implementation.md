# Trust Center Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a public hosted Trust Center at `/trust` on www.trystereos.com with five sub-pages (overview, security, compliance, data-handling, subprocessors) and a gated security packet download via Resend email.

**Architecture:** Static Next.js RSC pages sharing a sidebar layout (`app/trust/layout.tsx`). A client component handles the email gate form, posting to `app/api/trust/download/route.ts` which calls Resend. PDFs live in `/public/trust/` with opaque filenames. No new infra required.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS, lucide-react, Resend SDK (`resend@6.9.2`), Zod for validation. Design tokens: `#2b2e3a` (dark), `#718096` (muted), `#88edc3` (accent green), `#E2E8F0` (border).

---

## Reference: Design Patterns

Study these existing files before starting — match their patterns exactly:
- `app/privacy/page.tsx` — card layout, badge, `TopNav` usage
- `app/partners/page.tsx` — hero section, card grid
- `components/top-nav.tsx` — `usePathname` for active state, import pattern
- `components/footer.tsx` — link section structure

---

## Task 1: Shared Trust Components

**Files:**
- Create: `components/trust/trust-nav.tsx`
- Create: `components/trust/status-badge.tsx`

**Step 1: Create the trust nav component**

This is a "use client" component (needs `usePathname`). It renders as a vertical sidebar on desktop and horizontal scrolling tabs on mobile.

```tsx
// components/trust/trust-nav.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Lock, CheckSquare, Database, Users, Download } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Overview", href: "/trust", icon: Shield },
  { label: "Security", href: "/trust/security", icon: Lock },
  { label: "Compliance", href: "/trust/compliance", icon: CheckSquare },
  { label: "Data Handling", href: "/trust/data-handling", icon: Database },
  { label: "Subprocessors", href: "/trust/subprocessors", icon: Users },
  { label: "Downloads", href: "/trust/downloads", icon: Download },
]

export function TrustNav() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex flex-col gap-1 w-52 shrink-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#718096] px-3 mb-2">
          Trust Center
        </p>
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-[#88edc3]/20 text-[#2b2e3a]"
                  : "text-[#718096] hover:text-[#2b2e3a] hover:bg-gray-50"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", active ? "text-[#2b2e3a]" : "text-[#718096]")} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Mobile horizontal tabs */}
      <nav className="md:hidden flex gap-1 overflow-x-auto pb-2 mb-6 border-b border-[#E2E8F0] no-scrollbar">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors shrink-0",
                active
                  ? "bg-[#88edc3]/20 text-[#2b2e3a]"
                  : "text-[#718096] hover:text-[#2b2e3a] hover:bg-gray-50"
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
```

**Step 2: Create the status badge component**

```tsx
// components/trust/status-badge.tsx
import { cn } from "@/lib/utils"

type StatusBadgeProps = {
  label: string
  status: "in-progress" | "complete" | "planned"
  className?: string
}

const statusStyles = {
  "in-progress": "bg-amber-50 text-amber-700 border-amber-200",
  "complete": "bg-[#88edc3]/20 text-[#2b2e3a] border-[#88edc3]/40",
  "planned": "bg-gray-50 text-[#718096] border-[#E2E8F0]",
}

export function StatusBadge({ label, status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        statusStyles[status],
        className
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          status === "in-progress" && "bg-amber-500",
          status === "complete" && "bg-[#2b2e3a]",
          status === "planned" && "bg-[#718096]"
        )}
      />
      {label}
    </span>
  )
}
```

**Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors (or only pre-existing errors unrelated to these files).

**Step 4: Commit**

```bash
git add components/trust/
git commit -m "feat: add TrustNav and StatusBadge components"
```

---

## Task 2: Trust Layout

**Files:**
- Create: `app/trust/layout.tsx`

**Step 1: Create the layout**

This layout wraps all `/trust/*` pages. It renders `TopNav`, then a two-column area (sidebar + content) on desktop.

```tsx
// app/trust/layout.tsx
import type React from "react"
import { TopNav } from "@/components/top-nav"
import { TrustNav } from "@/components/trust/trust-nav"

export default function TrustLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white bg-grid-black/[0.02]">
      <TopNav />
      <div className="pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16">
          {/* Mobile tabs rendered inside TrustNav */}
          <div className="flex gap-10">
            {/* Desktop sidebar — sticky */}
            <aside className="hidden md:block">
              <div className="sticky top-24">
                <TrustNav />
              </div>
            </aside>

            {/* Page content */}
            <div className="flex-1 min-w-0">
              {/* Mobile nav */}
              <div className="md:hidden">
                <TrustNav />
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Verify**

```bash
npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add app/trust/layout.tsx
git commit -m "feat: add trust center shared layout"
```

---

## Task 3: Trust Overview Page (`/trust`)

**Files:**
- Create: `app/trust/page.tsx`

**Step 1: Create the overview page**

```tsx
// app/trust/page.tsx
import { Shield, Lock, Server, CheckCircle } from "lucide-react"
import { StatusBadge } from "@/components/trust/status-badge"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trust Center | Stereos",
  description: "Stereos security posture, compliance alignment, and data handling practices.",
}

const statusCards = [
  {
    icon: Lock,
    title: "Encryption at Rest",
    description: "AES-256 encryption for all stored data via Neon (PostgreSQL) and Cloudflare.",
    status: "complete" as const,
    label: "Implemented",
  },
  {
    icon: Shield,
    title: "MFA Enforced",
    description: "Multi-factor authentication required for all internal systems and production access.",
    status: "complete" as const,
    label: "Enforced",
  },
  {
    icon: Server,
    title: "Zero Data Retention",
    description: "AI Gateway configured with ZDR by default — prompts and responses are not stored by Cloudflare.",
    status: "complete" as const,
    label: "Default On",
  },
  {
    icon: CheckCircle,
    title: "SOC 2 Type I",
    description: "Actively aligning controls to SOC 2 Trust Service Criteria. Formal audit targeted Q4 2026.",
    status: "in-progress" as const,
    label: "Targeted Q4 2026",
  },
]

const infrastructure = [
  { name: "Cloudflare", role: "Edge, AI Gateway, Zero Trust, DLP" },
  { name: "Vercel", role: "Frontend hosting & serverless functions" },
  { name: "Neon", role: "PostgreSQL database (region-locked)" },
  { name: "Stripe", role: "Payment processing" },
]

export default function TrustPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <span className="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#718096] bg-[#88edc3] rounded-lg mb-4">
          Trust Center
        </span>
        <h1 className="text-3xl font-bold text-[#2b2e3a] mb-3">Security & Compliance Overview</h1>
        <p className="text-[#718096] leading-relaxed max-w-2xl">
          Stereos is built on a security-first infrastructure stack. We are actively aligning to SOC 2 principles
          and preparing for formal audit. This page describes our current security posture — not a certification claim.
        </p>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {statusCards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.title}
              className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#88edc3]/20 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#2b2e3a]" />
                </div>
                <StatusBadge label={card.label} status={card.status} />
              </div>
              <h3 className="text-sm font-semibold text-[#2b2e3a] mb-1.5">{card.title}</h3>
              <p className="text-sm text-[#718096] leading-relaxed">{card.description}</p>
            </div>
          )
        })}
      </div>

      {/* Security philosophy */}
      <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6 md:p-8">
        <h2 className="text-lg font-semibold text-[#2b2e3a] mb-4">Security Philosophy</h2>
        <div className="space-y-3 text-sm text-[#718096] leading-relaxed">
          <p>
            Stereos is designed from the ground up to handle sensitive LLM usage data. We minimize what we collect,
            maximize what we protect, and make our practices visible to customers without NDAs.
          </p>
          <p>
            Our infrastructure is 100% serverless and built on providers with industry-leading security certifications.
            We inherit and extend their security controls rather than re-inventing them.
          </p>
          <p>
            We do not train AI models on customer data. We do not sell data. We do not log LLM prompts or responses
            by default — our AI Gateway is configured with Zero Data Retention enabled out of the box.
          </p>
        </div>
      </div>

      {/* Infrastructure providers */}
      <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
        <h2 className="text-lg font-semibold text-[#2b2e3a] mb-4">Infrastructure Providers</h2>
        <div className="divide-y divide-[#E2E8F0]">
          {infrastructure.map((provider) => (
            <div key={provider.name} className="flex items-center justify-between py-3">
              <span className="text-sm font-medium text-[#2b2e3a]">{provider.name}</span>
              <span className="text-sm text-[#718096]">{provider.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <p className="text-sm text-[#718096]">
        Security questions?{" "}
        <a href="mailto:james@trystereos.com" className="text-[#2b2e3a] font-medium hover:underline">
          james@trystereos.com
        </a>
      </p>
    </div>
  )
}
```

**Step 2: Verify**

```bash
npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add app/trust/page.tsx
git commit -m "feat: add trust center overview page"
```

---

## Task 4: Security Page (`/trust/security`)

**Files:**
- Create: `app/trust/security/page.tsx`

**Step 1: Create the security page**

```tsx
// app/trust/security/page.tsx
import { Users, Smartphone, GitBranch, KeyRound, FileText, AlertTriangle, RefreshCw } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Security Controls | Stereos Trust Center",
  description: "Stereos access control, MFA, RBAC, secret management, monitoring, and incident response.",
}

const controls = [
  {
    icon: Users,
    title: "Access Control Policy",
    description:
      "Access to production systems follows least-privilege principles. All internal team members are provisioned with role-appropriate access. Access is reviewed quarterly and revoked immediately upon offboarding. No shared credentials are used for production systems.",
  },
  {
    icon: Smartphone,
    title: "MFA Enforcement",
    description:
      "Multi-factor authentication is enforced for all internal accounts including Google Workspace, GitHub, Cloudflare, Vercel, and Neon. Passkey and TOTP methods are supported. MFA cannot be bypassed for production access.",
  },
  {
    icon: GitBranch,
    title: "RBAC Implementation",
    description:
      "The Stereos platform implements role-based access control with three tiers: admin, manager, and user. Permissions are scoped by role and enforced server-side on every request. Customers can assign roles to team members independently.",
  },
  {
    icon: KeyRound,
    title: "Secret Management",
    description:
      "Secrets are managed via environment variables in Vercel and Cloudflare Workers — never committed to source code. API keys are rotated on a scheduled basis. All keys are stored encrypted at rest by the respective platform providers.",
  },
  {
    icon: FileText,
    title: "Logging & Monitoring",
    description:
      "Application errors and anomalies are monitored via PostHog and server-side logging. Cloudflare provides edge-level request logging and anomaly detection. Alerts are configured for unusual traffic patterns, authentication failures, and error rate spikes.",
  },
  {
    icon: AlertTriangle,
    title: "Incident Response",
    description:
      "Security incidents are triaged within 24 hours of detection. Affected customers are notified within 72 hours of a confirmed breach. Our incident response process includes root cause analysis, containment, remediation, and post-mortem documentation.",
  },
  {
    icon: RefreshCw,
    title: "Change Management",
    description:
      "All code changes require pull request review before merging to main. Production deployments are triggered via CI/CD pipeline on Vercel. Database schema changes are applied via reviewed migration scripts. No direct production database edits are permitted.",
  },
]

export default function SecurityPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#718096] bg-[#88edc3] rounded-lg mb-4">
          Security
        </span>
        <h1 className="text-3xl font-bold text-[#2b2e3a] mb-3">Security Controls</h1>
        <p className="text-[#718096] leading-relaxed max-w-2xl">
          This page documents the existence and nature of our security controls. Internal-sensitive implementation
          details are omitted. For a full security briefing, contact{" "}
          <a href="mailto:james@trystereos.com" className="text-[#2b2e3a] font-medium hover:underline">
            james@trystereos.com
          </a>
          .
        </p>
      </div>

      <div className="space-y-4">
        {controls.map((control) => {
          const Icon = control.icon
          return (
            <div
              key={control.title}
              className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-[#88edc3]/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#2b2e3a]" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-[#2b2e3a] mb-2">{control.title}</h2>
                  <p className="text-sm text-[#718096] leading-relaxed">{control.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

**Step 2: Verify & commit**

```bash
npx tsc --noEmit
git add app/trust/security/
git commit -m "feat: add trust/security page"
```

---

## Task 5: Compliance Page (`/trust/compliance`)

**Files:**
- Create: `app/trust/compliance/page.tsx`

**Step 1: Create the compliance page**

```tsx
// app/trust/compliance/page.tsx
import { StatusBadge } from "@/components/trust/status-badge"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Compliance | Stereos Trust Center",
  description: "Stereos SOC 2 alignment, CAIQ status, and compliance posture.",
}

const controlDomains = [
  { domain: "CC1 – Control Environment", alignment: "Policies documented, roles defined", status: "In progress" },
  { domain: "CC2 – Communication", alignment: "Internal comms via Slack + GitHub", status: "In progress" },
  { domain: "CC6 – Logical Access", alignment: "MFA, RBAC, least-privilege enforced", status: "Aligned" },
  { domain: "CC7 – System Operations", alignment: "CI/CD pipeline, change review required", status: "Aligned" },
  { domain: "CC8 – Change Management", alignment: "PR-based deploys, migration scripts reviewed", status: "Aligned" },
  { domain: "CC9 – Risk Mitigation", alignment: "Vendor risk review, subprocessor tracking", status: "In progress" },
  { domain: "A1 – Availability", alignment: "Vercel + Cloudflare SLAs inherited", status: "Aligned" },
  { domain: "C1 – Confidentiality", alignment: "ZDR-by-default, encryption at rest + transit", status: "Aligned" },
  { domain: "P1-P8 – Privacy", alignment: "Privacy policy published, DPA available", status: "In progress" },
]

export default function CompliancePage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#718096] bg-[#88edc3] rounded-lg mb-4">
          Compliance
        </span>
        <h1 className="text-3xl font-bold text-[#2b2e3a] mb-3">Compliance Alignment</h1>
        <p className="text-[#718096] leading-relaxed max-w-2xl">
          This is not a certification page. It describes our alignment to security frameworks and our progress
          toward formal audit. We are transparent about what is in place and what is in progress.
        </p>
      </div>

      {/* SOC 2 statement */}
      <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <h2 className="text-lg font-semibold text-[#2b2e3a]">SOC 2 Type I</h2>
          <StatusBadge label="Targeted Q4 2026" status="in-progress" />
        </div>
        <p className="text-sm text-[#718096] leading-relaxed">
          We are aligned to SOC 2 security principles and preparing for formal audit. Our controls are documented,
          implemented, and being tested internally. We expect to engage an auditor for SOC 2 Type I in Q4 2026.
          We will share the resulting report under NDA upon request.
        </p>
        <p className="text-sm text-[#718096] leading-relaxed mt-3">
          <strong className="text-[#2b2e3a]">We do not claim SOC 2 certification.</strong> We claim alignment —
          which means our controls are designed to meet the criteria, but have not yet been independently validated.
        </p>
      </div>

      {/* CAIQ */}
      <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <h2 className="text-lg font-semibold text-[#2b2e3a]">CSA CAIQ v4</h2>
          <StatusBadge label="Available on Request" status="in-progress" />
        </div>
        <p className="text-sm text-[#718096] leading-relaxed">
          We have completed the Cloud Security Alliance Consensus Assessments Initiative Questionnaire (CAIQ) v4.
          The full questionnaire is available as a gated download — visit the{" "}
          <a href="/trust/downloads" className="text-[#2b2e3a] font-medium hover:underline">
            Downloads page
          </a>{" "}
          to request a copy via email.
        </p>
      </div>

      {/* Control mapping */}
      <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
        <h2 className="text-lg font-semibold text-[#2b2e3a] mb-4">SOC 2 Control Alignment Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="text-left py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-[#718096]">Domain</th>
                <th className="text-left py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-[#718096]">Our Alignment</th>
                <th className="text-left py-2 text-xs font-semibold uppercase tracking-wider text-[#718096]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {controlDomains.map((row) => (
                <tr key={row.domain}>
                  <td className="py-3 pr-4 font-medium text-[#2b2e3a] whitespace-nowrap">{row.domain}</td>
                  <td className="py-3 pr-4 text-[#718096]">{row.alignment}</td>
                  <td className="py-3">
                    <span
                      className={
                        row.status === "Aligned"
                          ? "text-emerald-600 font-medium"
                          : "text-amber-600 font-medium"
                      }
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vendor reliance */}
      <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6 md:p-8">
        <h2 className="text-lg font-semibold text-[#2b2e3a] mb-3">Vendor SOC 2 Reliance Model</h2>
        <p className="text-sm text-[#718096] leading-relaxed">
          Stereos inherits security controls from infrastructure providers that hold their own SOC 2 certifications.
          Cloudflare (SOC 2 Type II), Vercel (SOC 2 Type II), Neon (SOC 2 Type II), and Stripe (SOC 2 Type II) form
          the backbone of our control environment. Our audit will document the scope of reliance on each vendor&apos;s
          report and what complementary user entity controls we implement on top.
        </p>
      </div>
    </div>
  )
}
```

**Step 2: Verify & commit**

```bash
npx tsc --noEmit
git add app/trust/compliance/
git commit -m "feat: add trust/compliance page"
```

---

## Task 6: Data Handling Page (`/trust/data-handling`)

**Files:**
- Create: `app/trust/data-handling/page.tsx`

**Step 1: Create the data handling page**

```tsx
// app/trust/data-handling/page.tsx
import { CheckCircle, XCircle, Shield } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Data Handling | Stereos Trust Center",
  description: "What data Stereos processes, what it does not store, and how it is protected.",
}

const dataProcessed = [
  "LLM API usage metadata (model, provider, token counts, latency)",
  "Spend data and per-key/per-team attribution",
  "User account information (name, email, role)",
  "OpenTelemetry traces from integrated developer tools",
  "DLP event metadata (topic, severity, matched profile names)",
  "Gateway key configuration and budget rules",
]

const dataNotStored = [
  "LLM prompt content (prompts are not logged by default)",
  "LLM response content (responses are not logged by default)",
  "Full credit card or payment instrument details",
  "Personally identifiable information beyond account fields",
  "Raw telemetry payloads beyond span metadata",
]

const encryptionItems = [
  { label: "In transit", detail: "TLS 1.2+ enforced on all connections via Cloudflare and Vercel edge." },
  { label: "At rest", detail: "AES-256 encryption via Neon (PostgreSQL) and Cloudflare KV/R2 where used." },
  { label: "Secrets", detail: "Environment secrets stored encrypted by Vercel and Cloudflare — not in source." },
]

export default function DataHandlingPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#718096] bg-[#88edc3] rounded-lg mb-4">
          Data Handling
        </span>
        <h1 className="text-3xl font-bold text-[#2b2e3a] mb-3">Data Handling Practices</h1>
        <p className="text-[#718096] leading-relaxed max-w-2xl">
          This page defines exactly what data Stereos processes, what it deliberately does not store,
          and how all data is protected. We prioritize data minimization.
        </p>
      </div>

      {/* ZDR callout */}
      <div className="rounded-xl border border-[#88edc3]/40 bg-[#88edc3]/10 p-6 flex items-start gap-3">
        <Shield className="w-5 h-5 text-[#2b2e3a] shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-[#2b2e3a] mb-1">Zero Data Retention — Enabled by Default</p>
          <p className="text-sm text-[#718096] leading-relaxed">
            Every customer&apos;s AI Gateway is provisioned with <code className="text-[#2b2e3a] bg-white px-1 rounded">zdr: true</code>. Cloudflare does not
            log, store, or retain prompt or response content. This is not opt-in — it is the default for all Stereos customers.
          </p>
        </div>
      </div>

      {/* What is / isn't stored */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
          <h2 className="text-sm font-semibold text-[#2b2e3a] mb-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            Data We Process
          </h2>
          <ul className="space-y-2">
            {dataProcessed.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[#718096]">
                <span className="text-[#2b2e3a] mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
          <h2 className="text-sm font-semibold text-[#2b2e3a] mb-4 flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-400" />
            Data We Do Not Store
          </h2>
          <ul className="space-y-2">
            {dataNotStored.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[#718096]">
                <span className="text-red-400 mt-0.5">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Retention policy */}
      <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6 md:p-8">
        <h2 className="text-lg font-semibold text-[#2b2e3a] mb-3">Data Retention Policy</h2>
        <div className="space-y-3 text-sm text-[#718096] leading-relaxed">
          <p>
            <strong className="text-[#2b2e3a]">Account data</strong> is retained for the duration of your active subscription.
            Upon account deletion, personal data is removed within 30 days. Anonymized, aggregated metrics
            may be retained for analytics purposes.
          </p>
          <p>
            <strong className="text-[#2b2e3a]">Telemetry spans</strong> are retained for 90 days and then automatically purged.
          </p>
          <p>
            <strong className="text-[#2b2e3a]">Prompt and response content</strong> is never retained — ZDR is enforced
            at the gateway layer before data reaches Stereos infrastructure.
          </p>
        </div>
      </div>

      {/* Encryption */}
      <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
        <h2 className="text-lg font-semibold text-[#2b2e3a] mb-4">Encryption</h2>
        <div className="divide-y divide-[#E2E8F0]">
          {encryptionItems.map((item) => (
            <div key={item.label} className="py-3 flex items-start gap-4">
              <span className="text-sm font-medium text-[#2b2e3a] w-20 shrink-0">{item.label}</span>
              <span className="text-sm text-[#718096]">{item.detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Regional */}
      <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6 md:p-8">
        <h2 className="text-lg font-semibold text-[#2b2e3a] mb-3">Regional Data Handling</h2>
        <p className="text-sm text-[#718096] leading-relaxed">
          Primary data storage is in the United States (Neon PostgreSQL, US East region). Cloudflare&apos;s global
          edge network processes request metadata worldwide, but persistent data is anchored to the US region.
          Enterprise customers requiring EU data residency should contact{" "}
          <a href="mailto:james@trystereos.com" className="text-[#2b2e3a] font-medium hover:underline">
            james@trystereos.com
          </a>{" "}
          to discuss configuration options.
        </p>
      </div>
    </div>
  )
}
```

**Step 2: Verify & commit**

```bash
npx tsc --noEmit
git add app/trust/data-handling/
git commit -m "feat: add trust/data-handling page"
```

---

## Task 7: Subprocessors Page (`/trust/subprocessors`)

**Files:**
- Create: `app/trust/subprocessors/page.tsx`

**Step 1: Create the subprocessors page**

```tsx
// app/trust/subprocessors/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Subprocessors | Stereos Trust Center",
  description: "Third-party vendors and subprocessors used by Stereos.",
}

const subprocessors = [
  {
    vendor: "Cloudflare",
    role: "Edge network, AI Gateway, Zero Trust, DLP",
    dataProcessed: "Request metadata, AI gateway routing, security policy enforcement",
    region: "Global (edge), US primary",
    soc2: true,
  },
  {
    vendor: "Vercel",
    role: "Frontend hosting, serverless functions",
    dataProcessed: "Application traffic, function invocations",
    region: "US / EU (configurable)",
    soc2: true,
  },
  {
    vendor: "Neon",
    role: "PostgreSQL database",
    dataProcessed: "Application data, user records, telemetry metadata",
    region: "US East",
    soc2: true,
  },
  {
    vendor: "Stripe",
    role: "Payment processing",
    dataProcessed: "Billing information, subscription data",
    region: "US",
    soc2: true,
  },
  {
    vendor: "PostHog",
    role: "Product analytics",
    dataProcessed: "Anonymous usage events, page views",
    region: "US",
    soc2: true,
  },
  {
    vendor: "Resend",
    role: "Transactional email",
    dataProcessed: "Email addresses for transactional sends",
    region: "US",
    soc2: true,
  },
]

export default function SubprocessorsPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#718096] bg-[#88edc3] rounded-lg mb-4">
          Subprocessors
        </span>
        <h1 className="text-3xl font-bold text-[#2b2e3a] mb-3">Subprocessors</h1>
        <p className="text-[#718096] leading-relaxed max-w-2xl">
          The following third-party vendors process data on behalf of Stereos. We review vendors for
          security posture before onboarding. This list is updated when vendors are added or removed.
        </p>
        <p className="text-xs text-[#718096] mt-2">Last updated: February 2026</p>
      </div>

      <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-[#E2E8F0]">
              <tr>
                {["Vendor", "Role", "Data Processed", "Region", "SOC 2"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#718096]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {subprocessors.map((sp) => (
                <tr key={sp.vendor} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-[#2b2e3a] whitespace-nowrap">{sp.vendor}</td>
                  <td className="px-4 py-3 text-[#718096]">{sp.role}</td>
                  <td className="px-4 py-3 text-[#718096] max-w-xs">{sp.dataProcessed}</td>
                  <td className="px-4 py-3 text-[#718096] whitespace-nowrap">{sp.region}</td>
                  <td className="px-4 py-3">
                    {sp.soc2 ? (
                      <span className="text-emerald-600 font-medium text-xs">Type II</span>
                    ) : (
                      <span className="text-[#718096] text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-sm text-[#718096]">
        To be notified of subprocessor changes,{" "}
        <a href="mailto:james@trystereos.com" className="text-[#2b2e3a] font-medium hover:underline">
          contact us
        </a>
        .
      </p>
    </div>
  )
}
```

**Step 2: Verify & commit**

```bash
npx tsc --noEmit
git add app/trust/subprocessors/
git commit -m "feat: add trust/subprocessors page"
```

---

## Task 8: Download Form Client Component

**Files:**
- Create: `components/trust/download-form.tsx`

This is a "use client" component. It uses `react-hook-form` + `zod` for validation, posts to `/api/trust/download`, and shows an inline success state.

**Step 1: Create the download form component**

```tsx
// components/trust/download-form.tsx
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, CheckCircle, Download } from "lucide-react"

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid work email"),
})

type FormData = z.infer<typeof schema>

export function DownloadForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setServerError(null)
    try {
      const res = await fetch("/api/trust/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        setServerError((json as { error?: string }).error ?? "Something went wrong. Please try again.")
        return
      }
      setSubmitted(true)
    } catch {
      setServerError("Network error. Please try again.")
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <CheckCircle className="w-10 h-10 text-emerald-500" />
        <p className="text-[#2b2e3a] font-semibold text-lg">Check your inbox</p>
        <p className="text-sm text-[#718096] max-w-xs">
          We&apos;ve sent the Security Overview to your email. It may take a minute to arrive.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#2b2e3a] mb-1.5" htmlFor="name">
          Full name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Jane Smith"
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E2E8F0] bg-white text-[#2b2e3a] placeholder:text-[#718096]/60 focus:outline-none focus:ring-2 focus:ring-[#88edc3] focus:border-transparent transition"
          {...register("name")}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2b2e3a] mb-1.5" htmlFor="email">
          Work email
        </label>
        <input
          id="email"
          type="email"
          placeholder="jane@company.com"
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E2E8F0] bg-white text-[#2b2e3a] placeholder:text-[#718096]/60 focus:outline-none focus:ring-2 focus:ring-[#88edc3] focus:border-transparent transition"
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      {serverError && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2b2e3a] text-white text-sm font-semibold hover:bg-[#2b2e3a]/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {isSubmitting ? "Sending…" : "Send me the security overview"}
      </button>

      <p className="text-xs text-[#718096] text-center">
        We&apos;ll send a one-time email with the download link. No spam.
      </p>
    </form>
  )
}
```

**Step 2: Verify & commit**

```bash
npx tsc --noEmit
git add components/trust/download-form.tsx
git commit -m "feat: add DownloadForm client component"
```

---

## Task 9: API Route Handler (Resend Email Gate)

**Files:**
- Create: `app/api/trust/download/route.ts`

**Step 1: Create the route handler**

The handler validates the body with Zod, calls Resend, and returns `{ success: true }`. The PDF URL points to `/public/trust/stereos-security-overview.pdf` (which will be a real file after the PDF is designed). For now it points to a placeholder path.

```typescript
// app/api/trust/download/route.ts
import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"

const bodySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})

const resend = new Resend(process.env.RESEND_API_KEY)

const PDF_URL = "https://www.trystereos.com/trust/stereos-security-overview.pdf"

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 422 })
  }

  const { name, email } = parsed.data

  try {
    await resend.emails.send({
      from: "Stereos Security <james@trystereos.com>",
      to: [email],
      subject: "Your Stereos Security Overview",
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 20px; color: #2b2e3a;">
          <p style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">Hi ${name},</p>
          <p style="color: #718096; line-height: 1.6; margin-bottom: 24px;">
            Thanks for your interest in Stereos' security practices. Here's your copy of our Security &amp; Compliance Overview.
          </p>
          <a
            href="${PDF_URL}"
            style="display: inline-block; padding: 12px 24px; background: #2b2e3a; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;"
          >
            Download Security Overview
          </a>
          <p style="color: #718096; font-size: 13px; margin-top: 32px; line-height: 1.6;">
            If you have questions about our security posture or need additional documentation,
            reply to this email or contact <a href="mailto:james@trystereos.com" style="color: #2b2e3a;">james@trystereos.com</a>.
          </p>
          <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 32px 0;" />
          <p style="color: #718096; font-size: 12px;">Stereos · trystereos.com</p>
        </div>
      `,
    })
  } catch (err) {
    console.error("Resend error:", err)
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
```

**Step 2: Add `RESEND_API_KEY` to `.env.local` (if not already present)**

```bash
# check if already set
grep -l "RESEND_API_KEY" .env.local 2>/dev/null || echo "Need to add RESEND_API_KEY to .env.local"
```

If not present, add it:
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

Get the key from resend.com → API Keys.

**Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

**Step 4: Commit**

```bash
git add app/api/trust/download/
git commit -m "feat: add trust download route handler with Resend email gate"
```

---

## Task 10: Downloads Page (`/trust/downloads`)

**Files:**
- Create: `app/trust/downloads/page.tsx`

**Step 1: Create the downloads page**

```tsx
// app/trust/downloads/page.tsx
import { FileText, Table2 } from "lucide-react"
import { DownloadForm } from "@/components/trust/download-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Downloads | Stereos Trust Center",
  description: "Download Stereos security documentation including the Security Overview PDF and CAIQ.",
}

const documents = [
  {
    icon: FileText,
    title: "Security & Compliance Overview",
    description:
      "10-page PDF covering architecture, data flow, security controls, access management, encryption, incident response, and our SOC 2 roadmap.",
    format: "PDF",
    gated: true,
  },
  {
    icon: Table2,
    title: "CSA CAIQ v4",
    description:
      "Completed Cloud Security Alliance Consensus Assessments Initiative Questionnaire answering ~200 security questions across 17 control domains.",
    format: "Included with Security Overview",
    gated: true,
  },
]

export default function DownloadsPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#718096] bg-[#88edc3] rounded-lg mb-4">
          Downloads
        </span>
        <h1 className="text-3xl font-bold text-[#2b2e3a] mb-3">Security Documentation</h1>
        <p className="text-[#718096] leading-relaxed max-w-2xl">
          Enter your name and work email to receive our Security &amp; Compliance Overview. We&apos;ll send
          a one-time download link — no account required.
        </p>
      </div>

      {/* What's included */}
      <div className="space-y-3">
        {documents.map((doc) => {
          const Icon = doc.icon
          return (
            <div
              key={doc.title}
              className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-5 flex items-start gap-4"
            >
              <div className="w-9 h-9 rounded-lg bg-[#88edc3]/20 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#2b2e3a]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="text-sm font-semibold text-[#2b2e3a]">{doc.title}</h3>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-[#718096] bg-gray-100 px-2 py-0.5 rounded">
                    {doc.format}
                  </span>
                </div>
                <p className="text-sm text-[#718096] leading-relaxed">{doc.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Email gate form */}
      <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6 md:p-8">
        <h2 className="text-lg font-semibold text-[#2b2e3a] mb-1">Request access</h2>
        <p className="text-sm text-[#718096] mb-6">
          Enter your details below and we&apos;ll email you the download link instantly.
        </p>
        <DownloadForm />
      </div>
    </div>
  )
}
```

**Step 2: Verify & commit**

```bash
npx tsc --noEmit
git add app/trust/downloads/
git commit -m "feat: add trust/downloads page with email gate form"
```

---

## Task 11: Footer Update + PDF Placeholder

**Files:**
- Modify: `components/footer.tsx`
- Create: `public/trust/.gitkeep`

**Step 1: Add Trust Center link to footer**

In `components/footer.tsx`, find the `Resources` section in `footerLinkSections` and add the Trust Center link:

```typescript
// In the "Resources" section of footerLinkSections array, add:
{ label: "Trust Center", href: "/trust" },
```

The full Resources section should look like:

```typescript
{
  title: "Resources",
  links: [
    { label: "Trust Center", href: "/trust" },
    { label: "Partner Program", href: "/partners" },
    { label: "Topic Hubs", href: "/topics" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Data Processing Agreement", href: "/dpa" },
  ],
},
```

**Step 2: Create the public/trust directory**

```bash
mkdir -p public/trust
touch public/trust/.gitkeep
```

> Note: The actual `stereos-security-overview.pdf` should be placed at `public/trust/stereos-security-overview.pdf` when the PDF is ready. The route handler already references this path.

**Step 3: Verify & commit**

```bash
npx tsc --noEmit
git add components/footer.tsx public/trust/
git commit -m "feat: add Trust Center to footer, create public/trust dir"
```

---

## Task 12: Final Build Verification

**Step 1: Run a full build**

```bash
npm run build
```

Expected: Build completes with no TypeScript errors. You may see warnings about missing `RESEND_API_KEY` at build time — these are fine (it's a runtime env var).

**Step 2: Start dev server and manually verify each route**

```bash
npm run dev
```

Open in browser and check:
- `http://localhost:3000/trust` — Overview page with 4 status cards
- `http://localhost:3000/trust/security` — 7 control cards
- `http://localhost:3000/trust/compliance` — SOC 2 statement + control table
- `http://localhost:3000/trust/data-handling` — ZDR callout + two-column lists
- `http://localhost:3000/trust/subprocessors` — 6-row vendor table
- `http://localhost:3000/trust/downloads` — Form that posts to `/api/trust/download`
- Sidebar/tabs navigation between pages works
- Footer has "Trust Center" link under Resources

**Step 3: Test the download form (if RESEND_API_KEY is set)**

Fill out the form on `/trust/downloads` with a real email. Verify:
- Success state appears inline
- Email arrives with PDF link (once PDF is placed at `public/trust/stereos-security-overview.pdf`)

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: trust center — all pages, email gate, footer link"
```

---

## Post-Launch: Add the PDF

Once the Security & Compliance Overview PDF is designed:
1. Place it at `public/trust/stereos-security-overview.pdf`
2. Update the `PDF_URL` constant in `app/api/trust/download/route.ts` if needed (it already points to the correct path)
3. `git add public/trust/stereos-security-overview.pdf && git commit -m "docs: add security overview PDF"`
