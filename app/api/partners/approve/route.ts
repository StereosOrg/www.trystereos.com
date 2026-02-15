import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { partners } from "@/lib/db/partner-schema";
import { sql } from "@/lib/db/postgres";
import { sendPartnerApproved } from "@/lib/email";

export async function POST(request: Request) {
  try {
    // Verify admin authorization
    const authHeader = request.headers.get("Authorization");
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { partner_id } = body;

    if (!partner_id) {
      return NextResponse.json(
        { error: "partner_id is required" },
        { status: 400 }
      );
    }

    // Look up partner
    const [partner] = await db
      .select()
      .from(partners)
      .where(eq(partners.id, partner_id));

    if (!partner) {
      return NextResponse.json(
        { error: "Partner not found" },
        { status: 404 }
      );
    }

    if (partner.status === "active") {
      return NextResponse.json(
        { error: "Partner is already active" },
        { status: 400 }
      );
    }

    // Update partner status to active
    await db
      .update(partners)
      .set({ status: "active" })
      .where(eq(partners.id, partner_id));

    // Generate and hash a new temporary password
    const tempPassword = nanoid(12);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Update the BetterAuth account password
    await sql`UPDATE account SET password = ${hashedPassword} WHERE "userId" = ${partner.user_id} AND "providerId" = 'credential'`;

    // Send approval email with the temporary password
    await sendPartnerApproved(partner.email, partner.name, tempPassword);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Partner approval error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
