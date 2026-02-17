import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL);

// List all constraints on Referral table
const constraints = await sql`
  SELECT conname, contype, pg_get_constraintdef(oid) as def
  FROM pg_constraint
  WHERE conrelid = '"Referral"'::regclass
`;

console.log("Current constraints on Referral:");
for (const c of constraints) {
  console.log(`  ${c.conname} (${c.contype}): ${c.def}`);
}

// Drop the stale customer_id foreign key if it exists
const stale = constraints.find((c) => c.conname === "Referral_customer_id_fkey");
if (stale) {
  console.log("\nDropping stale constraint: Referral_customer_id_fkey");
  await sql`ALTER TABLE "Referral" DROP CONSTRAINT "Referral_customer_id_fkey"`;
  console.log("Done.");
} else {
  console.log("\nNo Referral_customer_id_fkey constraint found — it may already be gone.");
  console.log("Listing all foreign keys to check:");
  const fks = constraints.filter((c) => c.contype === "f");
  if (fks.length === 0) console.log("  (none)");
  for (const fk of fks) console.log(`  ${fk.conname}: ${fk.def}`);
}
