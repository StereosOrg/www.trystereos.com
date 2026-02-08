#!/usr/bin/env bun

import { sql } from "../lib/db/postgres";

async function cleanup() {
  try {
    console.log("🗑️  Deleting test user...");
    // Delete test user and associated account
    await sql`DELETE FROM account WHERE "userId" IN (SELECT id FROM "user" WHERE email = 'admin@example.com')`;
    await sql`DELETE FROM "user" WHERE email = 'admin@example.com'`;
    console.log("✅ Test user deleted successfully");
  } catch (error) {
    console.error("❌ Error:", error);
  }
  process.exit(0);
}

cleanup();
