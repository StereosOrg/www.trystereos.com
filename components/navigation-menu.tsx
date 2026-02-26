"use client"

import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { BookOpen, Briefcase, Mail, Settings, Building2 } from "lucide-react"

import { cn } from "@/lib/utils"

function SlackIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
    </svg>
  )
}

type NavItem = {
  label: string
  href: string
  icon?: LucideIcon | (({ size, className }: { size?: number; className?: string }) => JSX.Element)
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
  {
    label: "Slack Community",
    href: "https://join.slack.com/t/trystereos/shared_invite",
    icon: SlackIcon,
    external: true,
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
        {filteredItems.map((item) => {
          const DesktopIcon = item.icon
          return (
          <div key={item.href} className="relative group">
            <Link
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5"
              prefetch={item.external ? false : undefined}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              onClick={onNavigate}
            >
              {DesktopIcon && <DesktopIcon size={14} />}
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
          )
        })}
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
