"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface TocSection {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  sections: TocSection[]
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    )

    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[]

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (sections.length === 0) return null

  return (
    <div className="hidden xl:block fixed right-8 top-32 w-64">
      <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
        <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-4">
          On this page
        </h4>
        <ScrollArea className="max-h-[calc(100vh-14rem)]">
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleClick(section.id)}
                className={cn(
                  "block w-full text-left text-sm py-1.5 border-l-4 transition-all",
                  section.level === 2 ? "pl-3" : "pl-6",
                  activeId === section.id
                    ? "border-black font-bold text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
                )}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </div>
  )
}
