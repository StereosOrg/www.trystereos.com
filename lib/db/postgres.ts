import { Pool, neon } from "@neondatabase/serverless";

let _pool: Pool | null = null;
let _sql: ReturnType<typeof neon> | null = null;

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is required");
  }
  return url;
}

// Pool for Better Auth (pg-compatible) — lazily initialized
export const pool = new Proxy({} as Pool, {
  get(_, prop) {
    if (!_pool) {
      _pool = new Pool({ connectionString: getDatabaseUrl() });
    }
    const value = (_pool as any)[prop];
    return typeof value === "function" ? value.bind(_pool) : value;
  },
});

// Tagged-template SQL for direct queries — lazily initialized
export const sql = ((...args: Parameters<ReturnType<typeof neon>>) => {
  if (!_sql) {
    _sql = neon(getDatabaseUrl());
  }
  return _sql(...args);
}) as ReturnType<typeof neon>;

export function getDatabase() {
  return pool;
}
