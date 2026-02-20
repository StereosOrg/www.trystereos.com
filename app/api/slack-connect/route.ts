import { NextResponse } from "next/server"
import { z } from "zod"
import { sendSlackConnectIntro } from "@/lib/email"

const schema = z.object({
  userEmail: z.string().email(),
  securityEmail: z.string().email(),
})

function domainToChannelName(email: string): string {
  // e.g. "john@acme.com" → "acme-connect"
  const domain = email.split("@")[1] ?? "prospect"
  const base = domain
    .toLowerCase()
    .replace(/\.[^.]+$/, "")   // strip TLD
    .replace(/[^a-z0-9-]/g, "-") // replace invalid chars
    .slice(0, 70)               // Slack max is 80 chars, leave room for prefix
  return `${base}-connect`
}

async function slackPost(method: string, body: Record<string, unknown>) {
  const res = await fetch(`https://slack.com/api/${method}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
    },
    body: JSON.stringify(body),
  })
  return res.json() as Promise<{ ok: boolean; channel?: { id: string }; error?: string }>
}

async function createChannel(name: string): Promise<string | null> {
  const data = await slackPost("conversations.create", {
    name,
    is_private: true,
  })

  if (data.ok && data.channel?.id) {
    return data.channel.id
  }

  // Channel name already taken — append a short timestamp to make it unique
  if (data.error === "name_taken") {
    const unique = `${name}-${Date.now().toString(36)}`
    const retry = await slackPost("conversations.create", {
      name: unique,
      is_private: true,
    })
    return retry.ok && retry.channel?.id ? retry.channel.id : null
  }

  console.error("conversations.create failed:", data.error)
  return null
}

async function notifyOwner(userEmail: string, securityEmail: string, channelName: string) {
  const ownerId = process.env.SLACK_OWNER_USER_ID
  if (!ownerId) return
  await slackPost("chat.postMessage", {
    channel: ownerId,
    text: `🔔 New Slack Connect lead`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*🔔 New Slack Connect request*`,
        },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Prospect:*\n${userEmail}` },
          { type: "mrkdwn", text: `*Security leader:*\n${securityEmail}` },
          { type: "mrkdwn", text: `*Channel created:*\n#${channelName}` },
        ],
      },
    ],
  })
}

async function inviteOwnerToChannel(channelId: string) {
  const ownerId = process.env.SLACK_OWNER_USER_ID
  if (!ownerId) return
  const data = await slackPost("conversations.invite", {
    channel: channelId,
    users: ownerId,
  })
  if (!data.ok) {
    console.error("Failed to invite owner to channel:", data.error)
  }
}

async function inviteToChannel(channelId: string, email: string) {
  const data = await slackPost("conversations.inviteShared", {
    channel: channelId,
    emails: [email],
  })
  if (!data.ok) {
    console.error(`Slack invite failed for ${email}:`, data.error)
  }
  return data
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userEmail, securityEmail } = schema.parse(body)

    const channelName = domainToChannelName(userEmail)
    const channelId = await createChannel(channelName)

    if (channelId) {
      await inviteOwnerToChannel(channelId)
      // Invite externals one at a time per Slack API constraint
      await inviteToChannel(channelId, userEmail)
      await inviteToChannel(channelId, securityEmail)
    }

    // Notify owner and send intro email regardless of Slack status
    await notifyOwner(userEmail, securityEmail, channelName)
    await sendSlackConnectIntro(securityEmail, userEmail)

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Please provide valid email addresses." },
        { status: 400 }
      )
    }
    console.error("Slack Connect error:", error)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
