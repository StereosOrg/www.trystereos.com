"use client"

import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { BookOpen, Briefcase, Mail, Settings, Building2 } from "lucide-react"

import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  href: string
  icon?: LucideIcon
  desktop?: boolean
  mobile?: boolean
  external?: boolean
  hasDropdown?: boolean
  dropdownItems?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    label: "Industries",
    href: "#industries",
    icon: Building2,
    hasDropdown: true,
    dropdownItems: [
      { label: "SaaS", href: "/industries/saas" },
      { label: "FinTech", href: "/industries/fintech" },
      { label: "HealthTech", href: "/industries/healthtech" },
      { label: "GovTech", href: "/industries/govtech" },
    ],
  },
  {
    label: "Company",
    href: "#company",
    icon: Mail,
    hasDropdown: true,
    dropdownItems: [
      { label: "Contact", href: "mailto:james@atelierlogos.com" },
      { label: "  ", href: "https://github.com/orgs/atelierlogos" },
      { label: "Linkedin", href: "https://www.linkedin.com/company/atelierlogos/" },
    ],
  },
  {
    label: "Resources",
    href: "#resources",
    icon: BookOpen,
    hasDropdown: true,
    dropdownItems: [
      { label: "Topic Hubs", href: "/topics" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Data Processing Agreement", href: "/dpa" },
    ],
  },
]

type NavigationMenuItemsProps = {
  variant?: "desktop" | "mobile"
  className?: string
  onNavigate?: () => void
}

export function NavigationMenuItems({
  variant = "desktop",
  className,
  onNavigate,
}: NavigationMenuItemsProps) {
  const filteredItems = navItems.filter((item) =>
    variant === "desktop" ? item.desktop !== false : item.mobile !== false
  )

  if (variant === "desktop") {
    return (
      <nav className={cn("flex items-center gap-6", className)}>
        {filteredItems.map((item) => (
          <div key={item.href} className="relative group">
            <Link
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
              prefetch={item.external ? false : undefined}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              onClick={onNavigate}
            >
              {item.label}
              {item.hasDropdown && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </Link>
            {item.hasDropdown && item.dropdownItems && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {item.dropdownItems.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.href}
                      href={dropdownItem.href}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      target={dropdownItem.href.startsWith("http") ? "_blank" : undefined}
                      rel={dropdownItem.href.startsWith("http") ? "noreferrer" : undefined}
                      onClick={onNavigate}
                    >
                      {dropdownItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
    )
  }

  return (
    <nav className={cn("space-y-3", className)}>
      {filteredItems.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.href}>
            <Link
              href={item.href}
              className="flex items-center gap-3 py-2 text-sm font-medium transition-colors hover:text-primary"
              prefetch={item.external ? false : undefined}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              onClick={onNavigate}
            >
              {Icon ? <Icon size={16} /> : null}
              {item.label}
              {item.hasDropdown && (
                <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </Link>
            {item.hasDropdown && item.dropdownItems && (
              <div className="ml-8 mt-2 space-y-2 border-l border-border pl-4">
                {item.dropdownItems.map((dropdownItem) => (
                  <Link
                    key={dropdownItem.href}
                    href={dropdownItem.href}
                    className="block py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    target={dropdownItem.href.startsWith("http") ? "_blank" : undefined}
                    rel={dropdownItem.href.startsWith("http") ? "noreferrer" : undefined}
                    onClick={onNavigate}
                  >
                    {dropdownItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
