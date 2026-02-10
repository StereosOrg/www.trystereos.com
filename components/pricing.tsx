import Link from "next/link"
import { CheckIcon } from "lucide-react"

const features = [
  "Unlimited team members",
  "Deep drilldown diffs",
  "Usage analytics & reports",
  "Ledger export (JSON)",
  "Priority support",
  "OTEL compliant",
]

const billableEvents = [
  {
    event: "platform_fee",
    label: "Platform access",
    per: "Per month",
    price: "$450",
  },
  {
    event: "tool_profile",
    label: "Tool profile",
    per: "Per tool profile",
    price: "$75",
  },
  {
    event: "telemetry_event",
    label: "Telemetry event",
    per: "Per telemetry event",
    price: "$0.0025",
  },
]

export function Pricing() {
  return (
    <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Column — Pricing breakdown */}
        <div className="bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 p-8 md:p-10 flex flex-col justify-between gap-8">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-6">
              14-day free trial
            </span>
            <h3 className="text-xl font-display font-bold mb-1">Pay as you go</h3>
            <p className="text-sm text-gray-600 mb-6">$450/month platform fee plus usage-based pricing for tool profiles and telemetry.</p>

            <div className="space-y-4">
              {billableEvents.map((item) => (
                <div
                  key={item.event}
                  className="bg-white/70 border-2 border-black p-4"
                >
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <code className="text-sm font-semibold bg-gray-100 border border-gray-300 px-2 py-0.5 shrink-0">
                      {item.event}
                    </code>
                    <div className="text-right min-w-0">
                      <span className="text-xl font-sans font-semibold tabular-nums">{item.price}</span>
                      <span className="block text-sm text-gray-600 font-medium">{item.per}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="https://marketplace.visualstudio.com/items?itemName=Stereos.stereos-provenance"
              className="inline-flex w-full h-14 items-center justify-center border-4 border-black bg-primary text-black text-base font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Install the extension
              <svg className="mr-2 ml-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>
            </Link>
          </div>
        </div>

        {/* Right Column — What's included */}
        <div className="p-8 md:p-10 flex flex-col justify-center border-t-4 md:border-t-0 md:border-l-4 border-black">
          <h3 className="text-xl font-display font-bold mb-6">Everything you need</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-2">
                <div className="w-5 h-5 mt-0.5 bg-emerald-100 border-2 border-black flex items-center justify-center flex-shrink-0">
                  <CheckIcon className="w-3 h-3 text-emerald-700" strokeWidth={3} />
                </div>
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
