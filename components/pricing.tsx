import { CheckIcon } from "lucide-react"
import { PricingCtaButton } from "@/components/pricing-cta-button"

const features = [
  "Unlimited team members",
  "No shared infrastructure",
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
    price: "$2400",
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
    <div className="rounded-xl bg-white shadow-[0_4px_10px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Left — Pricing */}
        <div className="p-8 md:p-10 flex flex-col gap-8">
          <div>
            <span className="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#2b2e3a] bg-[#88edc3] rounded-lg mb-5">
              14-day free trial
            </span>
            <h3 className="text-xl font-bold text-[#2b2e3a] mb-1">Pay as you go</h3>
            <p className="text-sm text-[#718096] mb-6">
              $2400/month platform fee plus usage-based pricing for managed keys and telemetry.
            </p>

            <div className="rounded-lg bg-white shadow-[0_4px_10px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden">
              <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-3 bg-[#F7FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold uppercase tracking-wider text-[#718096]">
                <span>Item</span>
                <span className="text-right">Price</span>
                <span className="text-right min-w-[120px]">Per</span>
              </div>
              {billableEvents.map((item, i) => (
                <div
                  key={item.event}
                  className={`grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-4 items-center ${
                    i < billableEvents.length - 1 ? "border-b border-[#E2E8F0]" : ""
                  }`}
                >
                  <div>
                    <code className="text-sm font-medium text-[#2b2e3a] bg-[#E2E8F0] rounded px-2 py-0.5">
                      {item.event}
                    </code>
                    <p className="text-xs text-[#718096] mt-1">{item.label}</p>
                  </div>
                  <span className="text-base font-bold tabular-nums text-[#2b2e3a] text-right">
                    {item.price}
                  </span>
                  <span className="text-sm text-[#718096] text-right min-w-[120px]">{item.per}</span>
                </div>
              ))}
            </div>
          </div>

          <PricingCtaButton />
        </div>

        {/* Right — What's included */}
        <div className="p-8 md:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#E2E8F0] bg-[#F7FAFC] rounded-r-xl">
          <h3 className="text-xl font-bold text-[#2b2e3a] mb-6">Everything you need</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5 rounded-full bg-[#88edc3] flex items-center justify-center flex-shrink-0">
                  <CheckIcon className="w-3 h-3 text-[#2b2e3a]" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-medium text-[#718096]">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
