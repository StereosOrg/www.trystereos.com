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
      className="absolute right-3 top-3 p-2 border-2 border-black bg-white hover:bg-gray-100 transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
    </button>
  )
}
