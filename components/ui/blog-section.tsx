import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { MoveRight } from "lucide-react";

import type { BlogPost } from "@/lib/blog";
import { Button } from "@/components/ui/button";

async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const headersList = await headers();
    const host = headersList.get("host");
    if (!host) return [];

    const forwardedProto = headersList.get("x-forwarded-proto");
    const protocol = forwardedProto ?? (host.includes("localhost") ? "http" : "https");
    const response = await fetch(`${protocol}://${host}/api/blog`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch blog posts", response.statusText);
      return [];
    }

    return (await response.json()) as BlogPost[];
  } catch (error) {
    console.error("Error fetching blog posts", error);
    return [];
  }
}

const Blog = async () => {
  const posts = await fetchBlogPosts();
  const latestPosts = posts.slice(0, 4);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto flex flex-col gap-14">
        <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Blog
            </p>
            <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
              Latest insights
            </h4>
          </div>
          <Button asChild className="gap-4">
            <Link href="/blog">
              View all articles <MoveRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestPosts.length === 0 && (
            <p className="text-muted-foreground text-base col-span-full">
              No articles available yet. Check back soon!
            </p>
          )}
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              href={post.url}
              className="flex flex-col gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="relative overflow-hidden rounded-md aspect-video bg-muted">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    📝
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {new Date(post.published).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h3 className="text-xl tracking-tight font-medium">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-base">
                  {post.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Blog };
