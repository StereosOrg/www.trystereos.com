"use client"

import { RichText } from "@graphcms/rich-text-react-renderer"

interface RichTextRendererProps {
  content: Record<string, unknown>
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
  return (
    <div
      className={[
        "prose prose-gray max-w-none",
        "prose-headings:font-sans prose-headings:font-bold prose-headings:text-foreground",
        "prose-p:text-[1.0625rem] prose-p:leading-7 prose-p:text-foreground",
        "prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline",
        "prose-blockquote:border-l-4 prose-blockquote:border-border prose-blockquote:text-muted-foreground",
        "prose-code:bg-muted prose-code:text-foreground prose-code:rounded prose-code:px-1",
        "prose-pre:bg-muted prose-pre:border prose-pre:border-border",
        "prose-img:rounded-xl prose-img:shadow-sm",
        "prose-hr:border-border",
      ].join(" ")}
    >
      <RichText
        content={content}
        renderers={{
          iframe: ({ url, title }) => (
            <div className="not-prose my-8 aspect-video w-full overflow-hidden rounded-xl">
              <iframe
                src={url}
                title={title ?? "Embedded video"}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ),
        }}
      />
    </div>
  )
}
