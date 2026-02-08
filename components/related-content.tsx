import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"

interface RelatedItem {
  title: string
  description: string
  href: string
  type?: "guide" | "blog" | "topic"
}

interface RelatedContentProps {
  items: RelatedItem[]
  title?: string
}

export function RelatedContent({ items, title = "Related Content" }: RelatedContentProps) {
  if (items.length === 0) return null

  return (
    <section className="my-12 rounded-xl border-4 border-black bg-white p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="h-5 w-5" />
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col gap-2 p-4 rounded-lg border-2 border-black hover:bg-primary/5 transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {item.description}
            </p>
            {item.type && (
              <span className="text-xs font-medium text-primary uppercase tracking-wider">
                {item.type}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
