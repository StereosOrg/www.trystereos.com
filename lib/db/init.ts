import { pool } from "./postgres";
import path from "path";
import fs from "fs";

const schemaPath = path.join(process.cwd(), "lib", "db", "schema.sql");

export async function initializeDatabase() {
  // Read schema file
  const schema = fs.readFileSync(schemaPath, "utf8");

  // Split schema into individual statements and execute them
  const statements = schema
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const statement of statements) {
    await pool.query(statement);
  }

  console.log("✅ Database initialized successfully");

  return pool;
}

export function getDatabase() {
  return pool;
}
