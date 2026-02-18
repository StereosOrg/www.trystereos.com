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
