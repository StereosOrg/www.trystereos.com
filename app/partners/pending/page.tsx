import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { TopNav } from "@/components/top-nav"

export const metadata = {
  title: "Application Received | Stereos Partners",
  description: "Your partner application has been received.",
}

export default function PartnerPendingPage() {
  return (
    <>
      <TopNav />
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#88edc3]/30 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-[#2b2e3a] mb-4">
                Application Received
              </h1>

              <p className="text-[#718096] mb-3">
                Thanks for your interest in the Stereos Partner Program. Our
                team will review your application and get back to you within 2-3
                business days.
              </p>

              <p className="text-[#718096]">
                You&apos;ll receive an email confirmation at the address you
                provided.
              </p>

              <div className="border-t border-[#E2E8F0] mt-6 pt-6">
                <p className="text-[#718096] mb-3">Already have an account?</p>
                <Link
                  href="/partners/login"
                  className="inline-flex items-center justify-center rounded-lg border border-[#E2E8F0] bg-white font-medium text-[#2b2e3a] hover:bg-gray-50 transition-colors h-12 px-6"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
