import { sql } from "../lib/db/postgres";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

async function createAdminUser() {
  const userId = nanoid();
  const accountId = nanoid();
  const now = new Date();
  const password = "admin123"; // Default password - change after first login!

  try {
    // Check if user already exists
    const existing = await sql`
      SELECT id FROM "user" WHERE email = 'james@atelierlogos.studio'
    `;

    if (existing.length > 0) {
      console.log("⚠️  User james@atelierlogos.studio already exists");
      const existingUserId = existing[0].id;

      // Make sure they're a host
      await sql`
        INSERT INTO webinar_host (id, user_id, is_active, created_at, updated_at)
        VALUES (${nanoid()}, ${existingUserId}, true, ${Date.now()}, ${Date.now()})
        ON CONFLICT (user_id) DO UPDATE SET is_active = true, updated_at = ${Date.now()}
      `;

      console.log("✅ Updated james@atelierlogos.studio as webinar host");
      process.exit(0);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await sql`
      INSERT INTO "user" (id, name, email, "emailVerified", role, "createdAt", "updatedAt")
      VALUES (
        ${userId},
        'James Bohrman',
        'james@atelierlogos.studio',
        true,
        'admin',
        ${now},
        ${now}
      )
    `;

    // Create account with password
    await sql`
      INSERT INTO account (
        id, "userId", "accountId", "providerId", password, "createdAt", "updatedAt"
      )
      VALUES (
        ${accountId},
        ${userId},
        'james@atelierlogos.studio',
        'credential',
        ${hashedPassword},
        ${now},
        ${now}
      )
    `;

    console.log("✅ Created user: james@atelierlogos.studio");
    console.log("   User ID:", userId);
    console.log("   Password:", password);

    // Make them a webinar host
    await sql`
      INSERT INTO webinar_host (id, user_id, is_active, created_at, updated_at)
      VALUES (${nanoid()}, ${userId}, true, ${Date.now()}, ${Date.now()})
    `;

    console.log("✅ Added james@atelierlogos.studio as webinar host");
    console.log("\n📝 Next steps:");
    console.log("   1. Sign in at /sign-in with:");
    console.log("      Email: james@atelierlogos.studio");
    console.log("      Password:", password);
    console.log("   2. Enable 2FA in settings");
    console.log("   3. Add a passkey for additional security");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  }
}

createAdminUser();
