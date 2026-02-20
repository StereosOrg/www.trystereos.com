import { NextResponse } from "next/server"

const NOTIFY_USER_ID = process.env.SLACK_OWNER_USER_ID ?? "U0928RQADTP"

export async function POST(request: Request) {
  try {
    const lead = (await request.json()) as Record<string, string>

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
