import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Post } from "@/lib/hygraph"

interface BlogCardProps {
  post: Post
  className?: string
}

export function BlogCard({ post, className }: BlogCardProps) {
  const date = post.publishedAt
    ? format(new Date(post.publishedAt), "MMM d, yyyy")
    : null

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col rounded-xl border border-border bg-white overflow-hidden",
        "hover:shadow-md transition-all duration-200",
        className
      )}
    >
      {/* Cover image */}
      {post.coverImage && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.coverImage.url}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-2 p-5 flex-1">
        {date && (
          <span className="text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
            {date}
            {post.readTime && ` · ${post.readTime} min`}
          </span>
        )}

        <h3 className="font-semibold text-base text-foreground leading-snug group-hover:text-gray-600 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Author */}
        {post.author && (
          <div className="flex items-center gap-2 mt-auto pt-4">
            {post.author.photo && (
              <Image
                src={post.author.photo.url}
                alt={post.author.name}
                width={24}
                height={24}
                className="rounded-full ring-1 ring-border"
              />
            )}
            <span className="text-xs font-medium text-muted-foreground">
              {post.author.name}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
