"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { useState, FormEvent, useEffect } from "react"
import { CheckCircle } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"


const currentProjects = [
  {
    name: "Colony",
    description: "The backoffice for modern vendor ops.",
    category: "VendorOps",
    logo_url: "/colony.png",
  },
  {
    name: "Fugu",
    description: "Angr-powered binary analysis visualization library",
    category: "DevTools",
    logo_url: "fugu.png",
  },
  {
    name: "Nooklanes",
    description: "Cedar-policy powered authorization service for CUI-sensitive infrastructure.",
    category: "Security",
    logo_url: "/nooklanes.png",
  },
]

const aiLogos = [
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/openai.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/claude-color.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/mcp.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/gemini-color.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/replit-color.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/cloudflare-color.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/exa-color.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/manus.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/v0.png",
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/vllm-color.png",
]

function CyclingLogo() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % aiLogos.length)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 50)
      }, 300)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline-flex items-center justify-center relative mx-2" style={{ width: "80px", height: "80px", verticalAlign: "middle" }}>
      <img
        src={aiLogos[currentIndex]}
        alt="AI Tool"
        className="transition-opacity duration-300"
        style={{
          height: "80px",
          width: "80px",
          objectFit: "contain",
          opacity: isTransitioning ? 0 : 1,
        }}
      />
    </span>
  )
}

export function HeroSection() {
  const { toast } = useToast()
  const analytics = useAnalytics()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSignedUp, setHasSignedUp] = useState(false)

  const handleNewsletterSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      toast({
        title: "Email required",
        description: "Let us know where to send updates.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const normalizedEmail = trimmedEmail.toLowerCase()
      const analyticsMetadata = {
        email: trimmedEmail,
        $email: trimmedEmail,
        source: "hero_section",
        channel: "newsletter",
      }

      analytics.identify(normalizedEmail, analyticsMetadata)
      analytics.track("newsletter_signup", analyticsMetadata)
      ;(window as any).cioanalytics?.track("newsletter_signup", analyticsMetadata)

      toast({
        title: "You're on the list",
        description: "We will send thoughtful builds when the dust clears.",
      })

      setEmail("")
      setHasSignedUp(true)
    } catch (error) {
      console.error("Failed to track newsletter signup", error)
      toast({
        title: "Something went wrong",
        description: "We couldn't record your signup. Please try again.",
        variant: "destructive",
      })
      setHasSignedUp(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-background font-sans">
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-[length:32px_32px] opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)",
        }}
      />

      <div className="container relative z-10 px-4 md:px-8 max-w-6xl mx-auto text-center space-y-10 md:space-y-12">
        <div className="inline-flex rounded-xl border-4 border-black bg-white px-6 py-3 text-[0.65rem] sm:text-xs md:text-sm text-foreground font-bold italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-serif">
          <span className="font-bold">Atelier</span> (atelier) – a workshop or studio where artists work. |{" "}
          <span className="font-bold">Logos</span> (λόγος) – the act of speaking, discourse, or reasoned thought.
        </div>

        <h1 className="text-6xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.15] text-black max-w-6xl mx-auto">
         We provide winning <CyclingLogo /> engineering strategy
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed tracking-tight">
          We strategize and build <b>agentic</b> software solutions using <a href="/guides/writing-effective-specs" className="text-primary hover:underline font-semibold">spec-driven development</a> and MCP-native architectures to empower businesses to leverage AI effectively and responsibly.
        </p>

        <div className="max-w-3xl mx-auto w-full">
          <form
            onSubmit={handleNewsletterSignup}
            className="rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="space-y-1 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Stay in the loop</p>
              <h3 className="text-2xl font-semibold text-foreground">Hear about new content and updates</h3>
              <p className="text-muted-foreground">
                We share thoughtful notes on our workflow, learnings, and launches about once a month.
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <Input
                type="email"
                name="email"
                value={email}
                placeholder="Email address"
                onChange={(event) => {
                  setEmail(event.target.value)
                  setHasSignedUp(false)
                }}
                required
                className="flex-1 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto sm:min-w-[160px] bg-primary border-4 border-black text-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Joining…" : hasSignedUp ? "You're in!" : "Join the list"}
              </Button>
            </div>
            {hasSignedUp && (
              <div className="mt-3 flex items-center justify-center gap-2 rounded-lg border-4 border-black bg-emerald-400 px-3 py-2 text-xs font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CheckCircle className="h-4 w-4" />
                You're on the list—watch your inbox for updates.
              </div>
            )}
          </form>
        </div>
        </div>
        <div className="pt-20 border-t border-border/30 max-w-5xl mx-auto">
          <div className="space-y-3 text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-semibold text-foreground">See one of our builds</h3>
            <p className="text-muted-foreground">
              We built <strong>Colony</strong>, a vendor operations platform that helps companies manage their external workforce with ease.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-4xl rounded-xl border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div
                className="w-full"
                style={{
                  position: "relative",
                  paddingBottom: "calc(56.25% + 33px)",
                  height: 0,
                }}
              >
                <iframe
                  src="https://demo.arcade.software/l3ClAIEprcx2X8eXBUGj?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
                  title="Colony: The backoffice for modern vendor ops"
                  frameBorder="0"
                  loading="lazy"
                  allow="clipboard-write"
                  className="rounded-xl shadow-md"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    colorScheme: "light",
                  }}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}
