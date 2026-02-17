'use client'

import Link from "next/link"
import { usePostHog } from "posthog-js/react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroCtaButton() {
  const posthog = usePostHog()

  return (
    <Button
      asChild
      size="lg"
      className="rounded-lg bg-[#2b2e3a] text-white font-medium shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:bg-[#1a1c24] transition-colors h-12 px-6"
      onClick={() => posthog.capture("Free Trial Button Clicked")}
    >
      <Link href="https://app.trystereos.com/">
        Start a 14-day free trial
        <ArrowRight className="ml-2" size={18} />
      </Link>
    </Button>
  )
}
