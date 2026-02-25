"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-[#718096] hover:text-[#2b2e3a] hover:bg-[#F7FAFC] transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
    </button>
  )
}
