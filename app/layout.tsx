import type React from "react"
import type { Metadata } from "next"
import { Sora } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { Toaster } from "@/components/ui/toaster"
import { PostHogProvider } from "@/components/posthog-provider"

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Stereos | LLM tool usage ledger for teams",
  description: "Org-wide LLM usage attribution and change management",
  generator: 'v0.dev',
  keywords: ['change management', 'attribution', 'developer enablement', 'process management', 'observability', 'analytics', 'LLMs', 'AI'],
  authors: [{ name: 'Stereos' }],
  creator: 'Stereos',
  openGraph: {
    title: "Stereos | LLM tool usage ledger for teams",
    description: "Org-wide LLM usage attribution and change management",
    url: "https://www.trystereos.com",
    siteName: "Stereos",
    images: [
      {
        url: "https://www.trystereos.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stereos - LLM tool usage ledger for teams",
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Stereos | LLM tool usage ledger for teams",
    description: "Org-wide LLM usage attribution and change management",
    images: ["https://www.trystereos.com/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={sora.variable}>
      <head>
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Stereos" />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://cdn.segment.com" />
      </head>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground selection:bg-black selection:text-white"> 
        <PostHogProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AnalyticsProvider />
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">
              {children}
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}
