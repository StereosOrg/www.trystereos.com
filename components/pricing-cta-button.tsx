'use client'

import Link from "next/link"
import { usePostHog } from "posthog-js/react"
import { ArrowRight } from "lucide-react"

export function PricingCtaButton() {
  const posthog = usePostHog()

  return (
    <Link
      href="https://app.trystereos.com/"
      className="inline-flex w-full h-12 items-center justify-center rounded-lg bg-[#2b2e3a] text-white text-sm font-medium shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:bg-[#1a1c24] transition-colors"
      onClick={() => posthog.capture("Free Trial Button Clicked")}
    >
      Start a 14-day free trial
      <ArrowRight className="ml-2" size={16} />
    </Link>
  )
}
