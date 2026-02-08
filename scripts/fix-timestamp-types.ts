#!/usr/bin/env bun

import { sql } from "../lib/db/postgres";

async function fixTimestampTypes() {
  try {
    console.log("🔧 Converting BIGINT timestamp fields to TIMESTAMPTZ...\n");

    // Fix user table
    console.log("📝 Updating user table...");
    await sql`ALTER TABLE "user"
      ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ USING to_timestamp("createdAt" / 1000),
      ALTER COLUMN "updatedAt" TYPE TIMESTAMPTZ USING to_timestamp("updatedAt" / 1000)`;

    // Fix session table
    console.log("📝 Updating session table...");
    await sql`ALTER TABLE session
      ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ USING to_timestamp("createdAt" / 1000),
      ALTER COLUMN "updatedAt" TYPE TIMESTAMPTZ USING to_timestamp("updatedAt" / 1000),
      ALTER COLUMN "expiresAt" TYPE TIMESTAMPTZ USING to_timestamp("expiresAt" / 1000)`;

    // Fix account table
    console.log("📝 Updating account table...");
    await sql`ALTER TABLE account
      ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ USING to_timestamp("createdAt" / 1000),
      ALTER COLUMN "updatedAt" TYPE TIMESTAMPTZ USING to_timestamp("updatedAt" / 1000),
      ALTER COLUMN "accessTokenExpiresAt" TYPE TIMESTAMPTZ USING
        CASE WHEN "accessTokenExpiresAt" IS NOT NULL
        THEN to_timestamp("accessTokenExpiresAt" / 1000)
        ELSE NULL END,
      ALTER COLUMN "refreshTokenExpiresAt" TYPE TIMESTAMPTZ USING
        CASE WHEN "refreshTokenExpiresAt" IS NOT NULL
        THEN to_timestamp("refreshTokenExpiresAt" / 1000)
        ELSE NULL END`;

    // Fix verification table
    console.log("📝 Updating verification table...");
    await sql`ALTER TABLE verification
      ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ USING to_timestamp("createdAt" / 1000),
      ALTER COLUMN "updatedAt" TYPE TIMESTAMPTZ USING to_timestamp("updatedAt" / 1000),
      ALTER COLUMN "expiresAt" TYPE TIMESTAMPTZ USING to_timestamp("expiresAt" / 1000)`;

    console.log("\n✅ All Better Auth timestamp fields converted to TIMESTAMPTZ");
    console.log("   (Webinar tables were left unchanged)\n");

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
  process.exit(0);
}

fixTimestampTypes();
