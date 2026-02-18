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

