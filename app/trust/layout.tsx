import type React from "react"
import { TopNav } from "@/components/top-nav"
import { TrustNav } from "@/components/trust/trust-nav"

export default function TrustLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white bg-grid-black/[0.02]">
      <TopNav />
      <div className="pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16">
          <div className="flex gap-10">
            {/* Desktop sidebar — sticky */}
            <aside className="hidden md:block">
              <div className="sticky top-24">
                <TrustNav />
              </div>
            </aside>

            {/* Page content */}
            <div className="flex-1 min-w-0">
              {/* Mobile nav */}
              <div className="md:hidden">
                <TrustNav />
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
