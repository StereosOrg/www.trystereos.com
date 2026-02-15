"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { toast } from "sonner"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\s\W]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "")
}

interface ReferralLinkCardProps {
  partnerName: string
  partnerCode: string
}

export function ReferralLinkCard({ partnerName, partnerCode }: ReferralLinkCardProps) {
  const [linkCopied, setLinkCopied] = useState(false)
  const [codeCopied, setCodeCopied] = useState(false)

  const referralUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/free-trial?partner=${slugify(partnerName)}&code=${partnerCode}`
      : ""

  async function copyToClipboard(text: string, type: "link" | "code") {
    await navigator.clipboard.writeText(text)
    toast("Copied to clipboard!")

    if (type === "link") {
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } else {
      setCodeCopied(true)
      setTimeout(() => setCodeCopied(false), 2000)
    }
  }

  return (
    <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
      <h3 className="text-lg font-bold text-[#2b2e3a]">Your Referral Link</h3>
      <p className="text-sm text-[#718096] mt-1">
        Share this link with potential customers
      </p>

      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          readOnly
          value={referralUrl}
          className="flex-1 bg-gray-50 font-mono text-sm px-3 py-2 rounded-lg border border-[#E2E8F0] outline-none"
        />
        <button
          onClick={() => copyToClipboard(referralUrl, "link")}
          className="rounded-lg bg-[#2b2e3a] text-white font-medium hover:bg-[#1a1c24] transition-colors p-2"
          aria-label="Copy referral link"
        >
          {linkCopied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <span className="text-sm text-[#718096]">
          Partner Code: <span className="font-medium text-[#2b2e3a]">{partnerCode}</span>
        </span>
        <button
          onClick={() => copyToClipboard(partnerCode, "code")}
          className="text-[#718096] hover:text-[#2b2e3a] transition-colors p-1"
          aria-label="Copy partner code"
        >
          {codeCopied ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  )
}
