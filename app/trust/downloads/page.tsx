import { FileText, ShieldCheck, ClipboardList } from "lucide-react"
import { DownloadForm } from "@/components/trust/download-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Security Downloads | Stereos Trust Center",
  description: "Download our comprehensive Security & Compliance Overview. Get detailed documentation on architecture, controls, data flows, and our SOC 2 roadmap. Available under NDA.",
  keywords: ["security documentation", "compliance downloads", "security overview", "architecture diagram", "security questionnaire"],
  openGraph: {
    title: "Security Downloads | Stereos Trust Center",
    description: "Download our comprehensive Security & Compliance Overview. Get detailed documentation on architecture, controls, and our SOC 2 roadmap.",
    url: "https://www.trystereos.com/trust/downloads",
    siteName: "Stereos",
    images: [
      {
        url: "https://www.trystereos.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stereos Security Documentation Downloads",
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Security Downloads | Stereos Trust Center",
    description: "Download our comprehensive Security & Compliance Overview. Get detailed documentation on architecture, controls, and our SOC 2 roadmap.",
    images: ["https://www.trystereos.com/og-image.png"]
  },
  alternates: {
    canonical: "/trust/downloads"
  }
}

const included = [
  "Company & product architecture overview",
  "Data flow diagram",
  "Security controls summary",
  "Access management & RBAC approach",
  "Encryption practices (in transit + at rest)",
  "Vendor management & subprocessors",
  "Incident response summary",
  "Compliance alignment (SOC 2, CAIQ)",
  "Roadmap toward formal SOC 2 audit",
]

export default function DownloadsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-[#2b2e3a] mb-2">Security Downloads</h1>
        <p className="text-[#718096]">
          Access our Security &amp; Compliance Overview — a detailed document covering architecture, controls, and our compliance roadmap.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Document card */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#f0fdf9] border border-[#88edc3]/40 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#2b2e3a]" />
            </div>
            <div>
              <p className="font-semibold text-[#2b2e3a]">Security &amp; Compliance Overview</p>
              <p className="text-xs text-[#718096] mt-0.5">PDF · ~10 pages · Updated Feb 2026</p>
            </div>
          </div>

          <ul className="space-y-1.5">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[#4a5568]">
                <ShieldCheck className="w-3.5 h-3.5 mt-0.5 text-[#88edc3] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 space-y-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-[#718096]" />
            <p className="text-sm font-medium text-[#2b2e3a]">Get the document</p>
          </div>
          <p className="text-xs text-[#718096]">
            Enter your name and work email — we&apos;ll send a one-time download link immediately.
          </p>
          <DownloadForm />
        </div>
      </div>

      <p className="text-xs text-[#718096]">
        Need a completed security questionnaire or CAIQ? Email{" "}
        <a href="mailto:james@trystereos.com" className="underline hover:text-[#2b2e3a] transition-colors">
          james@trystereos.com
        </a>
        .
      </p>
    </div>
  )
}
