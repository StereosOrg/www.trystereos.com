"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Github, Home, Handshake } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/partners", label: "Partners", icon: Handshake },
  { href: "https://github.com/StereosOrg/stereos", label: "GitHub", icon: Github, external: true },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden border-b-4 border-black bg-background">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="border-4 border-black bg-white p-0.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Image src="/logo.png" alt="Stereos" width={28} height={28} />
            </div>
            <span className="text-xl font-black uppercase tracking-tight">Stereos</span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="border-t-4 border-black bg-background p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 border-2 border-black font-medium transition-all",
                    isActive
                      ? "bg-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                  )}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              )
            })}
            <Button
              asChild
              className="w-full mt-4 bg-primary border-4 border-black text-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <Link href="https://stereos-web.vercel.app/">Get Started</Link>
            </Button>
          </nav>
        )}
      </header>

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 z-40 hidden md:flex flex-col w-64 border-r-4 border-black bg-background">
        {/* Logo */}
        <div className="px-6 py-8 border-b-4 border-black">
          <Link href="/" className="flex items-center gap-4">
            <div className="border-4 border-black bg-white p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Image src="/logo.png" alt="Stereos" width={44} height={44} />
            </div>
            <span className="text-2xl font-black uppercase tracking-tight">Stereos</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 border-2 border-black font-medium transition-all",
                  isActive
                    ? "bg-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* CTA Button */}
        <div className="p-4 border-t-4 border-black">
          <Button
            asChild
            className="w-full bg-primary border-4 border-black text-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <Link href="https://stereos-web.vercel.app/">Get Started</Link>
          </Button>
        </div>
      </aside>
    </>
  )
}
