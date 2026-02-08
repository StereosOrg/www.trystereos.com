#!/usr/bin/env bun

import { sql } from "../lib/db/postgres";

async function checkSchema() {
  try {
    console.log("📊 Checking database schema...\n");

    // Check session table schema
    const sessionSchema = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'session'
      ORDER BY ordinal_position
    `;

    console.log("Session table schema:");
    console.table(sessionSchema);

    // Check user table schema
    const userSchema = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'user'
      ORDER BY ordinal_position
    `;

    console.log("\nUser table schema:");
    console.table(userSchema);

  } catch (error) {
    console.error("❌ Error:", error);
  }
  process.exit(0);
}

checkSchema();
