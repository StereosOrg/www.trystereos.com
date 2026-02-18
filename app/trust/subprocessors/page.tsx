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
