import Link from "next/link"
import { ArrowRight, CheckIcon } from "lucide-react"

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
    event: "managed_key",
    label: "Managed key",
    per: "Per managed key",
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
    <div className="rounded-xl bg-white/95 shadow-sm border border-gray-200/60">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Left — Pricing */}
        <div className="p-8 md:p-10 flex flex-col gap-8">
          <div>
            <span className="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500 bg-white rounded-md shadow-sm mb-5">
              14-day free trial
            </span>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">Pay as you go</h3>
            <p className="text-sm text-gray-600 mb-6">
              $450/month platform fee plus usage-based pricing for managed keys and telemetry.
            </p>

            <div className="rounded-lg bg-white shadow-sm border border-gray-200/80 overflow-hidden">
              <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-3 bg-gray-50/80 border-b border-gray-200/80 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                <span>Item</span>
                <span className="text-right">Price</span>
                <span className="text-right min-w-[120px]">Per</span>
              </div>
              {billableEvents.map((item, i) => (
                <div
                  key={item.event}
                  className={`grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-4 items-center ${
                    i < billableEvents.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div>
                    <code className="text-sm font-medium text-gray-900 bg-gray-100 rounded px-2 py-0.5">
                      {item.event}
                    </code>
                    <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                  </div>
                  <span className="text-base font-semibold tabular-nums text-gray-900 text-right">
                    {item.price}
                  </span>
                  <span className="text-sm text-gray-600 text-right min-w-[120px]">{item.per}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="https://app.trystereos.com/"
            className="inline-flex w-full h-12 items-center justify-center rounded-lg bg-gray-900 text-white text-sm font-semibold shadow-sm hover:bg-gray-800 transition-colors"
          >
            Start a 14-day free trial
            <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>

        {/* Right — What's included */}
        <div className="p-8 md:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-200/80 bg-gray-50/50 rounded-r-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Everything you need</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <CheckIcon className="w-3 h-3 text-gray-600" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-medium text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
