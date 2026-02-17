import { NextResponse } from "next/server";
import { z } from "zod";
import { nanoid } from "nanoid";
import { db } from "@/lib/db/drizzle";
import { partners } from "@/lib/db/partner-schema";
import { sendApplicationReceived } from "@/lib/email";

const applySchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().min(1).max(200),
  industry: z.string().min(1).max(100),
  audienceSize: z.union([z.number().int().positive(), z.literal("")]).optional().transform((val) => (val === "" ? undefined : val)),
  partnerType: z.enum(["Individual", "Organization", "Government Agency"]),
  imageUrl: z.string().url("Please provide a valid image URL"),
  message: z.string().max(1000).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = applySchema.parse(body);

    // Generate partner code: first 6 alphanumeric chars of company (uppercased) + "-" + random 4 chars
    const companyPrefix = data.company
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 6);
    const partnerCode = `${companyPrefix}-${nanoid(4).toUpperCase()}`;

    // Insert partner record
    await db.insert(partners).values({
      name: data.company,
      email: data.email,
      partner_code: partnerCode,
      industry: data.industry,
      audience_size: data.audienceSize,
      type: data.partnerType,
      image_url: data.imageUrl,
    });

    // Send confirmation email (non-critical, don't block on failure)
    sendApplicationReceived(data.email, data.fullName).catch((err) =>
      console.error("Failed to send confirmation email:", err)
    );

    return NextResponse.json({
      success: true,
      redirect: "/partners/thanks",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Partner application error:", error instanceof Error ? { message: error.message, stack: error.stack, name: error.name } : error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
