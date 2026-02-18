import { StatusBadge } from "@/components/trust/status-badge"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Compliance | Stereos Trust Center",
  description: "Transparent view of our SOC 2 Type I alignment journey, CSA CAIQ v4 completion, and vendor compliance controls. See how Stereos meets enterprise security standards.",
  keywords: ["SOC 2", "compliance", "security audit", "CAIQ", "CSA", "trust service criteria", "security controls"],
  openGraph: {
    title: "Compliance | Stereos Trust Center",
    description: "Transparent view of our SOC 2 Type I alignment journey, CSA CAIQ v4 completion, and vendor compliance controls.",
    url: "https://www.trystereos.com/trust/compliance",
    siteName: "Stereos",
    images: [
      {
        url: "https://www.trystereos.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stereos Compliance & SOC 2 Alignment",
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Compliance | Stereos Trust Center",
    description: "Transparent view of our SOC 2 Type I alignment journey, CSA CAIQ v4 completion, and vendor compliance controls.",
    images: ["https://www.trystereos.com/og-image.png"]
  },
  alternates: {
    canonical: "/trust/compliance"
  }
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
