import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { partners, referrals } from "@/lib/db/partner-schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { partner_code, type } = body;

    if (!partner_code || !type) {
      return NextResponse.json(
        { error: "partner_code and type are required" },
        { status: 400 }
      );
    }

    if (!["click", "signup"].includes(type)) {
      return NextResponse.json(
        { error: "type must be 'click' or 'signup'" },
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
      referral_type: type,
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
