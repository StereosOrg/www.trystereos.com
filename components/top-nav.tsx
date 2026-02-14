"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const docLinks = [
  { href: "/docs/telemetry", label: "Telemetry" },
  { href: "/docs/extension", label: "Extension" },
]

export function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isDocsActive = pathname.startsWith("/docs")

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="rounded-lg border border-white/40 bg-white/30 p-1 backdrop-blur-md">
                <Image src="/logo.png" alt="Stereos" width={48} height={48} />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">STEREOS</span>
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
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(
                    "inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-gray-400",
                    isDocsActive
                      ? "text-gray-900 bg-gray-100"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  Docs
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-44 rounded-lg border border-gray-200 shadow-md">
                  {docLinks.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href} className="cursor-pointer">
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                href="https://github.com/StereosOrg/stereos"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                GitHub
              </Link>
            </nav>

            {/* Desktop right: Log in + CTA */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <Link
                href="https://app.trystereos.com/"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Log in
              </Link>
              <Button
                asChild
                className="rounded-lg bg-gray-900 text-white font-semibold shadow-sm hover:bg-gray-800 transition-colors h-9 px-4"
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
              <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Docs
              </div>
              {docLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-6 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    pathname === item.href ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="https://github.com/StereosOrg/stereos"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                GitHub
              </Link>
              <div className="mt-4 pt-4 border-t border-white/20 flex flex-col gap-2">
                <Link
                  href="https://app.trystereos.com/"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 text-center"
                >
                  Log in
                </Link>
                <Button
                  asChild
                  className="w-full rounded-lg bg-gray-900 text-white font-semibold shadow-sm hover:bg-gray-800 h-11"
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
