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
