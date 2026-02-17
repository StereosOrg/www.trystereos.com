import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { partners, referrals } from "@/lib/db/partner-schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { partner_code, customer_id } = body;

    if (!partner_code || !customer_id) {
      return NextResponse.json(
        { error: "partner_code and customer_id are required" },
        { status: 400 }
      );
    }

    // Validate partner exists and is active
    const [partner] = await db
      .select()
      .from(partners)
      .where(
        and(eq(partners.partner_code, partner_code), eq(partners.status, "active"))
      );

    if (!partner) {
      return NextResponse.json(
        { error: "Partner not found or not active" },
        { status: 404 }
      );
    }

    // Insert referral record
    await db.insert(referrals).values({
      partner_id: partner.id,
      customer_id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Referral tracking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
