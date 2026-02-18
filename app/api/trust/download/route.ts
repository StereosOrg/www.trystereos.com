import { NextResponse } from "next/server";
import { z } from "zod";
import { sendSecurityOverview } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = schema.parse(body);

    await sendSecurityOverview(email, name);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Trust download error:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}
