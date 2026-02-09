"use client"
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ProjectCardProps {
  title: string
  description: string
  tag: string
  link: string
}

export function HowItWorks() {
  const router = useRouter()
  // Sign-up form state
  const [step, setStep] = useState<'form' | 'checkEmail'>('form')
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    curationPrompt: ''
  })

  // // Handle form submit – send magic link
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   try {
  //     localStorage.setItem('pendingUserData', JSON.stringify(userData))
  //     await supabase.signInWithOTP(userData.email, true)
  //     setStep('checkEmail')
  //   } catch (error) {
  //     console.error('Failed to send magic link:', error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // // Resend link
  // const handleResend = async () => {
  //   setLoading(true)
  //   try {
  //     await supabase.signInWithOTP(userData.email, true)
  //   } catch (error) {
  //     console.error('Failed to resend link:', error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // // Redirect after verification
  // useEffect(() => {
  //   const { data: { subscription } } = supabase.onAuthStateChange((event) => {
  //     if (event === 'SIGNED_IN') {
  //       router.push('/')
  //     }
  //   })
  //   return () => {
  //     subscription.unsubscribe()
  //   }
  // }, [router])

  return (
    <section id="how-it-works" className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-black px-3 py-1 text-sm text-white">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Connect with us
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We would love to learn about what you're working on, but we're selective about the projects we take on to ensure we can deliver exceptional results. Here's how our process works:
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center space-y-2 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white text-xl font-bold">1</div>
            <h3 className="text-xl font-bold">Schedule a call</h3>
            <p className="text-sm text-muted-foreground text-center">Schedule a call with us to discuss your implementation needs.</p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center space-y-2 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white text-xl font-bold">2</div>
            <h3 className="text-xl font-bold">Send information</h3>
            <p className="text-sm text-muted-foreground text-center">Send us relevant informational materials.</p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center space-y-2 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white text-xl font-bold">3</div>
            <h3 className="text-xl font-bold">Receive a proposal</h3>
            <p className="text-sm text-muted-foreground text-center">Receive a proposal for your project.</p>
          </div>
        </div>

        <div className="w-full mt-16 flex justify-center px-4">
          <div className="w-full max-w-4xl rounded-[40px] border border-border/40 bg-white/90 p-10 text-center shadow-2xl shadow-black/10">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Next steps</p>
              <h3 className="text-3xl font-bold">Ready to scope a build?</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Share your product goals, integrations, and constraints. We&apos;ll respond within 1 business day with a
                tailored spec workshop invite and a suggested retainer tier.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button
                  className="rounded-full px-8"
                  onClick={() => {
                    if (typeof window === "undefined") return
                    if (window.location.pathname === "/") {
                      const pricingSection = document.getElementById("pricing")
                      if (pricingSection) {
                        pricingSection.scrollIntoView({ behavior: "smooth" })
                        return
                      }
                    }
                    window.location.href = "/#pricing"
                  }}
                >
                  View pricing
                </Button>
                <Button asChild variant="ghost" className="rounded-full border border-border/60">
                  <a href="mailto:james@atelierlogos.com">Email us</a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        </div>
      </div>
    </section>
  )
}

function ProjectCard({ title, description, tag, link }: ProjectCardProps) {
  const router = useRouter()
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md">
      <div className="absolute top-4 left-4">
        <div className="rounded-full bg-gray-100/90 dark:bg-gray-900/90 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
          {tag}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-4">
          <Button variant="link" onClick={() => router.push(link)} className="h-8 p-0 text-gray-600 dark:text-gray-400 gap-1 group-hover:underline">
            View details
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
