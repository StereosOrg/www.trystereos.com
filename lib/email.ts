import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const FROM_EMAIL = "Stereos Partners <partners@trystereos.com>";

export async function sendSecurityOverview(email: string, name: string) {
  const downloadUrl = "https://www.trystereos.com/downloads/stereos-security-overview.pdf";
  await getResend().emails.send({
    from: "Stereos Security <security@trystereos.com>",
    to: email,
    subject: "Your Stereos Security Overview",
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #2b2e3a;">Hi ${name},</h2>
        <p style="color: #718096; line-height: 1.6;">
          Thanks for your interest in Stereos security. You can download the Security &amp; Compliance Overview using the link below.
        </p>
        <p style="margin: 24px 0;">
          <a href="${downloadUrl}" style="display: inline-block; background: #2b2e3a; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px;">
            Download Security Overview (PDF)
          </a>
        </p>
        <p style="color: #718096; line-height: 1.6; font-size: 13px;">
          If you have questions about our security posture or need a completed security questionnaire, reply to this email or reach us at <a href="mailto:james@trystereos.com" style="color: #2b2e3a;">james@trystereos.com</a>.
        </p>
        <p style="color: #2b2e3a; font-weight: 600;">— The Stereos Team</p>
      </div>
    `,
  });
}

export async function sendSlackConnectIntro(
  securityEmail: string,
  requesterEmail: string
) {
  await getResend().emails.send({
    from: "James at Stereos <james@trystereos.com>",
    to: securityEmail,
    subject: `${requesterEmail} wants to talk about securing AI at your org`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f6f8fa;font-family:system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fa;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;max-width:560px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#2b2e3a;padding:28px 40px;">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="color:#88edc3;font-size:20px;font-weight:700;letter-spacing:-0.3px;">Stereos</span>
                  <span style="color:#ffffff;opacity:0.4;margin:0 8px;">|</span>
                  <span style="color:#ffffff;opacity:0.7;font-size:13px;">AI enablement for security-conscious orgs</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;">
            <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#718096;">
              Hi,
            </p>
            <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#718096;">
              <strong style="color:#2b2e3a;">${requesterEmail}</strong> from your organization wants to explore using Stereos — and they asked us to loop you in.
            </p>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.6;color:#718096;">
              Stereos is a <strong style="color:#2b2e3a;">Zero Data Retention AI gateway</strong> built for organizations where security isn't optional. Here's what that means in practice:
            </p>

            <!-- Feature cards -->
            <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:32px;">
              <tr>
                <td style="padding:0 0 12px;">
                  <table cellpadding="0" cellspacing="0" width="100%" style="background:#f8fffe;border:1px solid #c6f6e4;border-radius:8px;padding:16px 20px;">
                    <tr>
                      <td width="32" style="vertical-align:top;padding-right:12px;">
                        <div style="width:28px;height:28px;background:#88edc3;border-radius:6px;text-align:center;line-height:28px;font-size:14px;">🔒</div>
                      </td>
                      <td style="vertical-align:top;">
                        <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#2b2e3a;">Zero Data Retention</p>
                        <p style="margin:0;font-size:13px;color:#718096;line-height:1.5;">Prompts and completions are never logged or stored. Optional DLP rules redact PII and secrets before they reach the model.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:0 0 12px;">
                  <table cellpadding="0" cellspacing="0" width="100%" style="background:#f8fffe;border:1px solid #c6f6e4;border-radius:8px;padding:16px 20px;">
                    <tr>
                      <td width="32" style="vertical-align:top;padding-right:12px;">
                        <div style="width:28px;height:28px;background:#88edc3;border-radius:6px;text-align:center;line-height:28px;font-size:14px;">🗝️</div>
                      </td>
                      <td style="vertical-align:top;">
                        <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#2b2e3a;">Virtual Key Management</p>
                        <p style="margin:0;font-size:13px;color:#718096;line-height:1.5;">Developers get virtual keys with spend limits and model restrictions enforced at the proxy — your real API keys never leave the vault.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table cellpadding="0" cellspacing="0" width="100%" style="background:#f8fffe;border:1px solid #c6f6e4;border-radius:8px;padding:16px 20px;">
                    <tr>
                      <td width="32" style="vertical-align:top;padding-right:12px;">
                        <div style="width:28px;height:28px;background:#88edc3;border-radius:6px;text-align:center;line-height:28px;font-size:14px;">📡</div>
                      </td>
                      <td style="vertical-align:top;">
                        <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#2b2e3a;">Full OTEL Observability</p>
                        <p style="margin:0;font-size:13px;color:#718096;line-height:1.5;">Every AI request emits an OpenTelemetry span. Token usage, cost, and latency — attributed by team and service, in real time.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:#718096;">
              We've sent a Slack Connect invite to both of you so we can answer questions directly in a shared channel — no back-and-forth over email.
            </p>

            <!-- CTA -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td>
                  <a href="https://www.trystereos.com/ai-enablement" style="display:inline-block;background:#2b2e3a;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:600;font-size:14px;">
                    See how Stereos works →
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#718096;">
              Happy to answer any security questions or send over a completed questionnaire.
            </p>
            <p style="margin:0;font-size:14px;color:#2b2e3a;font-weight:600;">
              James Bohrman<br>
              <span style="font-weight:400;color:#718096;">Stereos · <a href="mailto:james@trystereos.com" style="color:#718096;">james@trystereos.com</a></span>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fffe;border-top:1px solid #e2e8f0;padding:20px 40px;">
            <p style="margin:0;font-size:12px;color:#a0aec0;line-height:1.5;">
              Stereos · <a href="https://www.trystereos.com" style="color:#a0aec0;">trystereos.com</a> · SOC 2 aligned · ELv2 license<br>
              You received this because ${requesterEmail} requested a Slack Connect introduction.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
    `,
  });
}

export async function sendApplicationReceived(email: string, name: string) {
  await getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "We received your partner application",
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #2b2e3a;">Thanks for applying, ${name}!</h2>
        <p style="color: #718096; line-height: 1.6;">
          We've received your application to join the Stereos Partner Program.
          Our team will review it and get back to you soon.
        </p>
        <p style="color: #718096; line-height: 1.6;">
          In the meantime, if you have any questions, reply to this email.
        </p>
        <p style="color: #2b2e3a; font-weight: 600;">— The Stereos Team</p>
      </div>
    `,
  });
}

