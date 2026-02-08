import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Playfair_Display, Roboto } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { Toaster } from "@/components/ui/toaster"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Stereos | git-blame for LLM-driven teams ",
  description: "Org-wide LLM usage attribution and change management",
  generator: 'v0.dev',
  keywords: ['change management', 'attribution', 'developer enablement', 'process management', 'observability', 'analytics', 'LLMs', 'AI'],
  authors: [{ name: 'Stereos' }],
  creator: 'Stereos',
  openGraph: {
    title: "Stereos | git-blame for LLM-driven teams",
    description: "Org-wide LLM usage attribution and change management",
    url: "https://www.trystereos.com",
    siteName: "Stereos",
    images: [
      {
        url: "https://www.trystereos.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stereos - git-blame for LLM-driven teams",
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Stereos | git-blame for LLM-driven teams",
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
    <html lang="en" suppressHydrationWarning className={`${playfairDisplay.variable} ${roboto.variable}`}>
      <head>
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Stereos" />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://cdn.segment.com" />
      </head>
      <body className={`${roboto.className} antialiased min-h-screen bg-background text-foreground selection:bg-black selection:text-white`}> 
        <Script
          id="posthog"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init zr Wr fi Br Gr ci Nr Hr capture Ui calculateEventProperties Kr register register_once register_for_session unregister unregister_for_session Zr getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Xr Jr createPersonProfile Qr jr ts opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing Vr debug O Yr getPageViewId captureTraceFeedback captureTraceMetric Or".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('phc_TKzM1ekc7ke2OJ2TVEoEH4hS6OzJTnAwJbGAJ0W1Lwy', {
                api_host: 'https://us.i.posthog.com',
                defaults: '2025-11-30',
                person_profiles: 'identified_only',
            })
            `,
          }}
        />
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
