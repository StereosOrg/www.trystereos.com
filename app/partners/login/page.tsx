"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Clock, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { signIn } from "@/lib/auth-client"
import { TopNav } from "@/components/top-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function PartnerLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [pendingReview, setPendingReview] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await signIn.email({ email, password })

      if (error) {
        toast.error(error.message || "Invalid email or password.")
        setLoading(false)
        return
      }

      const res = await fetch("/api/partners/me")

      if (!res.ok) {
        if (res.status === 404) {
          toast.error("No partner account found for this user.")
        } else {
          toast.error("Something went wrong. Please try again.")
        }
        setLoading(false)
        return
      }

      const { partner } = await res.json()

      if (partner.status === "active") {
        router.push("/partners/dashboard")
      } else if (partner.status === "pending") {
        setPendingReview(true)
      } else {
        toast.error("Your partner account is not active. Please contact support.")
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <TopNav />
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="max-w-lg w-full mx-auto px-4">
            <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-8">
              {pendingReview ? (
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#88edc3]/30 flex items-center justify-center">
                      <Clock className="w-8 h-8 text-emerald-600" />
                    </div>
                  </div>

                  <h1 className="text-2xl font-bold text-[#2b2e3a] mb-4">
                    Application Under Review
                  </h1>

                  <p className="text-[#718096] mb-6">
                    Your partner application is still being reviewed. We&apos;ll
                    notify you by email once it&apos;s approved.
                  </p>

                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-lg border border-[#E2E8F0] bg-white font-medium text-[#2b2e3a] hover:bg-gray-50 transition-colors h-12 px-6"
                  >
                    Back to homepage
                  </Link>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-[#2b2e3a] mb-2">
                      Partner Login
                    </h1>
                    <p className="text-[#718096]">
                      Sign in to access your partner dashboard.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#2b2e3a] mb-1.5"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-[#2b2e3a] mb-1.5"
                      >
                        Password
                      </label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-lg bg-[#2b2e3a] text-white font-medium shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:bg-[#1a1c24] transition-colors h-12 px-6"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign in"
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
