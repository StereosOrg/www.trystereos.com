import { NextResponse } from "next/server"
import { createHmac, timingSafeEqual } from "crypto"

const NOTIFY_USER_ID = process.env.SLACK_OWNER_USER_ID ?? "U0928RQADTP"

async function verifySignature(body: string, signature: string): Promise<boolean> {
  const secret = process.env.LEADPIPE_WEBHOOK_SECRET
  if (!secret) return false
  const expected = createHmac("sha256", secret).update(body).digest("hex")
  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-leadpipe-signature") ?? ""

    if (!(await verifySignature(body, signature))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const lead = JSON.parse(body) as Record<string, string>

    const name = lead.name ?? lead.first_name ?? "Unknown"
    const email = lead.email ?? "—"
    const company = lead.company ?? "—"
    const pageUrl = lead.page_url ?? lead.url ?? "—"

    await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      },
      body: JSON.stringify({
        channel: "#chatter",
        text: `New Leadpipe lead — <@${NOTIFY_USER_ID}>`,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*New lead identified* <@${NOTIFY_USER_ID}>`,
            },
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*Name:*\n${name}` },
              { type: "mrkdwn", text: `*Email:*\n${email}` },
              { type: "mrkdwn", text: `*Company:*\n${company}` },
              { type: "mrkdwn", text: `*Page:*\n${pageUrl}` },
            ],
          },
        ],
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Leadpipe webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
