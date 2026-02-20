"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { SlackConnectForm } from "@/components/slack-connect-form"

interface SlackConnectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SlackConnectModal({ open, onOpenChange }: SlackConnectModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center mb-2">
            <img src="https://cdn.brandfetch.io/idJ_HhtG0Z/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="Slack" className="w-10 h-10" />
          </div>
          <DialogTitle className="text-lg font-bold text-[#2b2e3a]">
            Need an AI solution your CISO will approve?
          </DialogTitle>
          <DialogDescription className="text-[#718096]">
            Add your emails and let's talk about it in Slack Connect — we'll loop in your security leader with the full context.
          </DialogDescription>
        </DialogHeader>

        <SlackConnectForm onSuccess={() => setTimeout(() => onOpenChange(false), 3000)} />
      </DialogContent>
    </Dialog>
  )
}
