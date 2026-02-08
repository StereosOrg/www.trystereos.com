import { sql } from "../lib/db/postgres";
import { createVideoSDKRoom } from "../lib/videosdk/token";

async function fixWebinarRoom() {
  // Get all webinars without room_id
  const webinars = await sql`
    SELECT id, title, room_id
    FROM webinar
    WHERE room_id IS NULL
  `;

  console.log(`Found ${webinars.length} webinar(s) without room_id`);

  for (const webinar of webinars) {
    console.log(`\nFixing webinar: ${webinar.title} (${webinar.id})`);

    try {
      // Create VideoSDK room
      const { roomId } = await createVideoSDKRoom();
      console.log(`Created room: ${roomId}`);

      // Update webinar
      await sql`
        UPDATE webinar
        SET room_id = ${roomId}, meeting_id = ${roomId}
        WHERE id = ${webinar.id}
      `;

      console.log(`✓ Updated webinar with room_id: ${roomId}`);
    } catch (error) {
      console.error(`✗ Failed to fix webinar:`, error);
    }
  }

  console.log("\nDone!");
  process.exit(0);
}

fixWebinarRoom().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
