"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { SlackConnectModal } from "@/components/slack-connect-modal"

function SlackIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 2447.6 2452.5" className={className} xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
      <path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" fill="#36c5f0"/>
      <path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" fill="#2eb67d"/>
      <path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.8c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.5 245.2 244.8 245.3z" fill="#ecb22e"/>
      <path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0z" fill="#e01e5a"/>
    </svg>
  )
}

export function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [slackModalOpen, setSlackModalOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("stereos_slack_modal_seen")
    if (!hasSeenModal) {
      const timer = setTimeout(() => setSlackModalOpen(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  function handleSlackModalChange(open: boolean) {
    setSlackModalOpen(open)
    if (!open) {
      localStorage.setItem("stereos_slack_modal_seen", "1")
    }
  }

  return (
    <>
      <SlackConnectModal open={slackModalOpen} onOpenChange={handleSlackModalChange} />

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="rounded-lg border border-white/40 bg-white/30 p-1 backdrop-blur-md">
                <Image src="/logo.png" alt="Stereos" width={48} height={48} />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">Stereos</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === "/"
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                Home
              </Link>
              <Link
                href="/partners"
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === "/partners"
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                Partners
              </Link>
              <Link
                href="/blog"
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === "/blog" || pathname.startsWith("/blog/")
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                Blog
              </Link>
              <Link
                href="https://join.slack.com/t/trystereos/shared_invite/zt-384mjl0hs-X2WTb8sc1xFrrDKULcgboQ"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
              >
                <SlackIcon />
                Slack Community
              </Link>
            </nav>

            {/* Desktop right: Log in + CTA */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <Link
                href="https://app.trystereos.com/"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => (window as any).cioanalytics?.track("Header Button Clicked", { button: "Login" })}
              >
                Log in
              </Link>
              <Button
                asChild
                className="rounded-lg bg-gray-900 text-white font-semibold shadow-sm hover:bg-gray-800 transition-colors h-9 px-4"
                onClick={() => (window as any).cioanalytics?.track("Header Button Clicked", { button: "Get Started" })}
              >
                <Link href="https://app.trystereos.com/">Get started</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg border border-gray-200/60 bg-white/50 hover:bg-white/70 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-200/80 bg-white/80 backdrop-blur-md px-4 py-4">
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  pathname === "/" ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                )}
              >
                Home
              </Link>
              <Link
                href="/partners"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  pathname === "/partners" ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                )}
              >
                Partners
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  pathname === "/blog" || pathname.startsWith("/blog/")
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                Blog
              </Link>
              <Link
                href="https://join.slack.com/t/trystereos/shared_invite/zt-384mjl0hs-X2WTb8sc1xFrrDKULcgboQ"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <SlackIcon />
                Slack Community
              </Link>
              <div className="mt-4 pt-4 border-t border-white/20 flex flex-col gap-2">
                <Link
                  href="https://app.trystereos.com/"
                  onClick={() => { (window as any).cioanalytics?.track("Header Button Clicked", { button: "Login" }); setMobileOpen(false) }}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 text-center"
                >
                  Log in
                </Link>
                <Button
                  asChild
                  className="w-full rounded-lg bg-gray-900 text-white font-semibold shadow-sm hover:bg-gray-800 h-11"
                  onClick={() => (window as any).cioanalytics?.track("Header Button Clicked", { button: "Get Started" })}
                >
                  <Link href="https://app.trystereos.com/" onClick={() => setMobileOpen(false)}>
                    Get started
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
