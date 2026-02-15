import { MousePointerClick, UserPlus } from "lucide-react"

interface StatsCardsProps {
  clicks: number
  signups: number
}

export function StatsCards({ clicks, signups }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
        <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center">
          <MousePointerClick className="w-5 h-5 text-[#2b2e3a]" />
        </div>
        <p className="text-sm text-[#718096] mt-3">Referral Clicks</p>
        <p className="text-3xl font-bold text-[#2b2e3a] tabular-nums mt-1">
          {clicks}
        </p>
      </div>

      <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
        <div className="w-10 h-10 rounded-lg bg-[#88edc3]/50 flex items-center justify-center">
          <UserPlus className="w-5 h-5 text-[#2b2e3a]" />
        </div>
        <p className="text-sm text-[#718096] mt-3">Signups</p>
        <p className="text-3xl font-bold text-[#2b2e3a] tabular-nums mt-1">
          {signups}
        </p>
      </div>
    </div>
  )
}
