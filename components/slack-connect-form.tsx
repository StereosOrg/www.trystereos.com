"use client"

import { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Loader2 } from "lucide-react"

interface SlackConnectFormProps {
  onSuccess?: () => void
}

export function SlackConnectForm({ onSuccess }: SlackConnectFormProps) {
  const [userEmail, setUserEmail] = useState("")
  const [securityEmail, setSecurityEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/slack-connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, securityEmail }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.")
        setStatus("error")
        return
      }
      setStatus("success")
      onSuccess?.()
    } catch {
      setErrorMsg("Network error. Please try again.")
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-emerald-600" />
        </div>
        <p className="font-semibold text-[#2b2e3a]">You're all set!</p>
        <p className="text-sm text-[#718096] max-w-xs">
          We've sent Slack Connect invites to both addresses and emailed your security leader with context on Stereos.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="userEmail" className="text-sm font-medium text-[#2b2e3a]">
          Your email
        </label>
        <Input
          id="userEmail"
          type="email"
          placeholder="you@company.com"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
          disabled={status === "loading"}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="securityEmail" className="text-sm font-medium text-[#2b2e3a]">
          Your security leader's email
        </label>
        <Input
          id="securityEmail"
          type="email"
          placeholder="ciso@company.com"
          value={securityEmail}
          onChange={(e) => setSecurityEmail(e.target.value)}
          required
          disabled={status === "loading"}
        />
      </div>

      {errorMsg && (
        <p className="text-sm text-red-600">{errorMsg}</p>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#2b2e3a] text-white hover:bg-[#1a1c24] transition-colors h-11 font-semibold"
      >
        {status === "loading" ? (
          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending invites…</>
        ) : (
          "Connect us in Slack →"
        )}
      </Button>

      <p className="text-xs text-[#718096] text-center">
        We'll send Slack Connect invites to both addresses and email your security leader with context.
      </p>
    </form>
  )
}
