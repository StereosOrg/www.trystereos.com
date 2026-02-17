import Link from "next/link"
import Image from "next/image"
import { Mail } from "lucide-react"
import { siGithub, siX, siCaldotcom, siSlack } from "simple-icons"

const footerLinkSections = [
  {
    title: "Solutions",
    links: [
      { label: "Government", href: "/government" },
      { label: "Startups", href: "/startups" },
      { label: "Monthly Retainer", href: "/monthly-retainer" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "mailto:james@atelierlogos.com" },
      { label: "Github", href: "https://github.com/orgs/atelierlogos" },
      { label: "Linkedin", href: "https://www.linkedin.com/company/atelierlogos/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Partner Program", href: "/partners" },
      { label: "Topic Hubs", href: "/topics" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Data Processing Agreement", href: "/dpa" },
    ],
  },
  {
    title: "Popular Guides",
    links: [
      { label: "LLM-Assisted Coding", href: "/guides/llm-assisted-coding" },
      { label: "Writing Effective Specs", href: "/guides/writing-effective-specs" },
      { label: "Compliance Mapping", href: "/guides/compliance-mapping" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Stereos Logo" width={60} height={60} className="dark:brightness-110" />
              <span className="text-lg font-bold">Stereos</span>
            </div>
            <p className="text-sm text-muted-foreground">
            LLM Solutions Studio
            </p>
            <div className="flex gap-4">
              <Link href="https://join.slack.com/t/atelierlogos/shared_invite/zt-384mjl0hs-X2WTb8sc1xFrrDKULcgboQ" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d={siSlack.path} />
                </svg>
                <span className="sr-only">Slack</span>
              </Link>
              <Link href="https://cal.com/team/atelierlogos/general-sessions" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d={siCaldotcom.path} />
                </svg>
                <span className="sr-only">Cal.com</span>
              </Link>
              <Link
                href="mailto:hello@atelierlogos.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" aria-hidden />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
          {footerLinkSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">{section.title}</p>
              <div className="space-y-1 text-sm">
                {section.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-foreground/80 hover:text-foreground transition-colors block"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Atelier Logos LLC. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
