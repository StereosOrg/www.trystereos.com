"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, CheckCircle, Download } from "lucide-react"

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid work email"),
})

type FormData = z.infer<typeof schema>

export function DownloadForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setServerError(null)
    try {
      const res = await fetch("/api/trust/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        setServerError((json as { error?: string }).error ?? "Something went wrong. Please try again.")
        return
      }
      setSubmitted(true)
    } catch {
      setServerError("Network error. Please try again.")
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <CheckCircle className="w-10 h-10 text-emerald-500" />
        <p className="text-[#2b2e3a] font-semibold text-lg">Check your inbox</p>
        <p className="text-sm text-[#718096] max-w-xs">
          We&apos;ve sent the Security Overview to your email. It may take a minute to arrive.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#2b2e3a] mb-1.5" htmlFor="name">
          Full name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Jane Smith"
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E2E8F0] bg-white text-[#2b2e3a] placeholder:text-[#718096]/60 focus:outline-none focus:ring-2 focus:ring-[#88edc3] focus:border-transparent transition"
          {...register("name")}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2b2e3a] mb-1.5" htmlFor="email">
          Work email
        </label>
        <input
          id="email"
          type="email"
          placeholder="jane@company.com"
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E2E8F0] bg-white text-[#2b2e3a] placeholder:text-[#718096]/60 focus:outline-none focus:ring-2 focus:ring-[#88edc3] focus:border-transparent transition"
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      {serverError && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2b2e3a] text-white text-sm font-semibold hover:bg-[#2b2e3a]/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {isSubmitting ? "Sending…" : "Send me the security overview"}
      </button>

      <p className="text-xs text-[#718096] text-center">
        We&apos;ll send a one-time email with the download link. No spam.
      </p>
    </form>
  )
}
