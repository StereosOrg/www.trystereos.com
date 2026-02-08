import { Pool, neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Pool for Better Auth (pg-compatible)
export const pool = new Pool({ connectionString: databaseUrl });

// Tagged-template SQL for direct queries
export const sql = neon(databaseUrl);

export function getDatabase() {
  return pool;
}
