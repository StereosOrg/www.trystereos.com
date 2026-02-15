import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { db } from "@/lib/db/drizzle"
import { partners, referrals } from "@/lib/db/partner-schema"
import { eq, and, count } from "drizzle-orm"
import { format } from "date-fns"

import { TopNav } from "@/components/top-nav"
import { ReferralLinkCard } from "@/components/partners/referral-link-card"
import { StatsCards } from "@/components/partners/stats-cards"

export const metadata = {
  title: "Partner Dashboard | Stereos",
  description:
    "Manage your Stereos partner referral links and track performance.",
}

export default async function PartnerDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    redirect("/partners/login")
  }

  const [partner] = await db
    .select()
    .from(partners)
    .where(eq(partners.user_id, session.user.id))

  if (!partner || partner.status !== "active") {
    redirect("/partners/login")
  }

  const [clickResult] = await db
    .select({ count: count() })
    .from(referrals)
    .where(
      and(
        eq(referrals.partner_id, partner.id),
        eq(referrals.referral_type, "click")
      )
    )

  const [signupResult] = await db
    .select({ count: count() })
    .from(referrals)
    .where(
      and(
        eq(referrals.partner_id, partner.id),
        eq(referrals.referral_type, "signup")
      )
    )

  const clickCount = clickResult?.count ?? 0
  const signupCount = signupResult?.count ?? 0

  const memberSince = partner.created_at
    ? format(partner.created_at, "MMMM yyyy")
    : "Unknown"

  return (
    <>
      <TopNav />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Welcome Header */}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-[#2b2e3a]">
                Welcome back, {partner.name}
              </h1>
              <span className="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#2b2e3a] bg-[#88edc3] rounded-lg">
                {partner.tier.charAt(0).toUpperCase() + partner.tier.slice(1)}
              </span>
            </div>
            <p className="text-sm text-[#718096] mt-1">
              Member since {memberSince}
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid gap-6 mt-8">
            <ReferralLinkCard
              partnerName={partner.name}
              partnerCode={partner.partner_code}
            />

            <StatsCards clicks={clickCount} signups={signupCount} />

            {/* Account Details Card */}
            <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-6">
              <h3 className="text-lg font-bold text-[#2b2e3a] mb-4">
                Account Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#718096]">Email</p>
                  <p className="font-medium text-[#2b2e3a]">{partner.email}</p>
                </div>
                <div>
                  <p className="text-sm text-[#718096]">Partner Code</p>
                  <p className="font-medium text-[#2b2e3a]">
                    {partner.partner_code}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#718096]">Tier</p>
                  <p className="font-medium text-[#2b2e3a]">
                    {partner.tier.charAt(0).toUpperCase() +
                      partner.tier.slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#718096]">Status</p>
                  <p className="font-medium text-[#2b2e3a]">
                    {partner.status.charAt(0).toUpperCase() +
                      partner.status.slice(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
