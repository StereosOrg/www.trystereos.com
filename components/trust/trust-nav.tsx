"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Lock, CheckSquare, Database, Users, Download } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Overview", href: "/trust", icon: Shield },
  { label: "Security", href: "/trust/security", icon: Lock },
  { label: "Compliance", href: "/trust/compliance", icon: CheckSquare },
  { label: "Data Handling", href: "/trust/data-handling", icon: Database },
  { label: "Subprocessors", href: "/trust/subprocessors", icon: Users },
  { label: "Downloads", href: "/trust/downloads", icon: Download },
]

export function TrustNav() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex flex-col gap-1 w-52 shrink-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#718096] px-3 mb-2">
          Trust Center
        </p>
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-[#88edc3]/20 text-[#2b2e3a]"
                  : "text-[#718096] hover:text-[#2b2e3a] hover:bg-gray-50"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", active ? "text-[#2b2e3a]" : "text-[#718096]")} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Mobile horizontal tabs */}
      <nav className="md:hidden flex gap-1 overflow-x-auto pb-2 mb-6 border-b border-[#E2E8F0] no-scrollbar">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors shrink-0",
                active
                  ? "bg-[#88edc3]/20 text-[#2b2e3a]"
                  : "text-[#718096] hover:text-[#2b2e3a] hover:bg-gray-50"
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
