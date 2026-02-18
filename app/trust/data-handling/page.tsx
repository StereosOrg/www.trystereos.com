import { CheckCircle, XCircle, Shield } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Data Handling | Stereos Trust Center",
  description: "Data minimization by design. Zero Data Retention on all LLM prompts by default. AES-256 encryption at rest, TLS 1.2+ in transit. Learn exactly what we process and protect.",
  keywords: ["data handling", "zero data retention", "ZDR", "encryption", "data protection", "privacy", "data minimization", "TLS"],
  openGraph: {
    title: "Data Handling | Stereos Trust Center",
    description: "Data minimization by design. Zero Data Retention on all LLM prompts by default. AES-256 encryption at rest, TLS 1.2+ in transit.",
    url: "https://www.trystereos.com/trust/data-handling",
    siteName: "Stereos",
    images: [
      {
        url: "https://www.trystereos.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stereos Data Handling & Privacy",
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Handling | Stereos Trust Center",
    description: "Data minimization by design. Zero Data Retention on all LLM prompts by default. AES-256 encryption at rest, TLS 1.2+ in transit.",
    images: ["https://www.trystereos.com/og-image.png"]
  },
  alternates: {
    canonical: "/trust/data-handling"
  }
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
