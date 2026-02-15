import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = "Stereos Partners <partners@trystereos.com>";

export async function sendApplicationReceived(email: string, name: string) {
  await resend.emails.send({
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

export async function sendPartnerApproved(
  email: string,
  name: string,
  tempPassword: string
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.trystereos.com";
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Welcome to the Stereos Partner Program!",
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #2b2e3a;">You're in, ${name}!</h2>
        <p style="color: #718096; line-height: 1.6;">
          Your partner application has been approved. You now have access to your
          partner dashboard where you can manage your referral links and track performance.
        </p>
        <p style="color: #718096; line-height: 1.6;">
          <strong>Your temporary password:</strong> ${tempPassword}<br/>
          Please change it after your first login.
        </p>
        <a href="${baseUrl}/partners/login"
           style="display: inline-block; padding: 12px 24px; background: #2b2e3a; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 8px;">
          Go to Dashboard
        </a>
        <p style="color: #2b2e3a; font-weight: 600; margin-top: 24px;">— The Stereos Team</p>
      </div>
    `,
  });
}
