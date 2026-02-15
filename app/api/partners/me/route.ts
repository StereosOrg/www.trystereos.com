import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db/drizzle";
import { partners } from "@/lib/db/partner-schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const [partner] = await db
    .select()
    .from(partners)
    .where(eq(partners.user_id, session.user.id));

  if (!partner) {
    return NextResponse.json({ error: "No partner record" }, { status: 404 });
  }

  return NextResponse.json({ partner });
}
