import { NextResponse } from "next/server";
import { z } from "zod";
import { nanoid } from "nanoid";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { partners } from "@/lib/db/partner-schema";
import { sql } from "@/lib/db/postgres";
import { sendApplicationReceived } from "@/lib/email";

const applySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().min(1).max(200),
  industry: z.string().min(1).max(100),
  audience_size: z.number().int().positive().optional(),
  type: z.enum(["affiliate", "reseller", "integration", "strategic"]),
  message: z.string().max(1000).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = applySchema.parse(body);

    // Generate a temporary password for the BetterAuth user
    const tempPassword = nanoid(16);

    // Create a BetterAuth user via the server-side API
    const signUpResult = await auth.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: tempPassword,
      },
    });

    const userId = signUpResult.user.id;

    // Set user role to 'partner'
    await sql`UPDATE "user" SET role = 'partner' WHERE id = ${userId}`;

    // Generate partner code: first 6 alphanumeric chars of company (uppercased) + "-" + random 4 chars
    const companyPrefix = data.company
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 6);
    const partnerCode = `${companyPrefix}-${nanoid(4).toUpperCase()}`;

    // Insert partner record
    await db.insert(partners).values({
      name: data.name,
      email: data.email,
      partner_code: partnerCode,
      industry: data.industry,
      audience_size: data.audience_size,
      type: data.type,
      user_id: userId,
    });

    // Send confirmation email
    await sendApplicationReceived(data.email, data.name);

    return NextResponse.json({
      success: true,
      redirect: "/partners/pending",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Partner application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
