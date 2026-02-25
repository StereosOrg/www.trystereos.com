import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Post } from "@/lib/hygraph"

interface BlogFeaturedProps {
  post: Post
  className?: string
}

export function BlogFeatured({ post, className }: BlogFeaturedProps) {
  const date = post.publishedAt
    ? format(new Date(post.publishedAt), "MMM d, yyyy").toUpperCase()
    : null

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group grid md:grid-cols-2 rounded-2xl border border-border bg-white overflow-hidden",
        "hover:shadow-lg transition-shadow duration-200",
        className
      )}
    >
      {/* Cover image — flush left, full height */}
      {post.coverImage ? (
        <div className="relative min-h-[280px] md:min-h-[360px] overflow-hidden">
          <Image
            src={post.coverImage.url}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            priority
          />
        </div>
      ) : (
        <div className="min-h-[280px] md:min-h-[360px] bg-muted" />
      )}

      {/* Content — spread top to bottom */}
      <div className="flex flex-col justify-between gap-6 p-8 md:p-10">
        <div className="flex flex-col gap-4">
          {date && (
            <span className="text-[11px] tracking-widest font-medium text-muted-foreground">
              {date}
              {post.readTime && ` · ${post.readTime} MIN`}
            </span>
          )}

          <h2 className="text-2xl md:text-[1.75rem] font-bold text-foreground leading-snug group-hover:text-gray-600 transition-colors">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="text-base text-muted-foreground leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Author pushed to bottom */}
        {post.author && (
          <div className="flex items-center gap-3">
            {post.author.photo ? (
              <Image
                src={post.author.photo.url}
                alt={post.author.name}
                width={44}
                height={44}
                className="rounded-full ring-1 ring-border shrink-0"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-gray-200 shrink-0" />
            )}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">
                {post.author.name}
              </span>
              {post.author.title && (
                <span className="text-xs text-muted-foreground">
                  {post.author.title}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
