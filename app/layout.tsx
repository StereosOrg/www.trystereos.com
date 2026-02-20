import type React from "react"
import type { Metadata } from "next"
import { Sora } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { Toaster } from "@/components/ui/toaster"

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
        <link rel="preconnect" href="https://cdp.customer.io" />
      </head>
      <Script id="snitcher" strategy="afterInteractive">{`!function(e){"use strict";var t=e&&e.namespace;if(t&&e.profileId&&e.cdn){var i=window[t];if(i&&Array.isArray(i)||(i=window[t]=[]),!i.initialized&&!i._loaded)if(i._loaded)console&&console.warn("[Radar] Duplicate initialization attempted");else{i._loaded=!0;["track","page","identify","group","alias","ready","debug","on","off","once","trackClick","trackSubmit","trackLink","trackForm","pageview","screen","reset","register","setAnonymousId","addSourceMiddleware","addIntegrationMiddleware","addDestinationMiddleware","giveCookieConsent"].forEach((function(e){var a;i[e]=(a=e,function(){var e=window[t];if(e.initialized)return e[a].apply(e,arguments);var i=[].slice.call(arguments);return i.unshift(a),e.push(i),e})})),-1===e.apiEndpoint.indexOf("http")&&(e.apiEndpoint="https://"+e.apiEndpoint),i.bootstrap=function(){var t,i=document.createElement("script");i.async=!0,i.type="text/javascript",i.id="__radar__",i.setAttribute("data-settings",JSON.stringify(e)),i.src=[-1!==(t=e.cdn).indexOf("http")?"":"https://",t,"/releases/latest/radar.min.js"].join("");var a=document.scripts[0];a.parentNode.insertBefore(i,a)},i.bootstrap()}}else"undefined"!=typeof console&&console.error("[Radar] Configuration incomplete")}({"apiEndpoint":"radar.snitcher.com","cdn":"cdn.snitcher.com","namespace":"Snitcher","profileId":"sYDVfjosTM"});`}</Script>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground selection:bg-black selection:text-white"> 
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AnalyticsProvider />
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">
              {children}
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
