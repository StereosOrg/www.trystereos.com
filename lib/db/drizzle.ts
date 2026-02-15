import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import * as partnerSchema from "./partner-schema";

let _drizzlePool: Pool | null = null;

function getPool() {
  if (!_drizzlePool) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL environment variable is required");
    _drizzlePool = new Pool({ connectionString: url });
  }
  return _drizzlePool;
}

export const db = drizzle({
  client: getPool(),
  schema: partnerSchema,
});
