import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const FROM_EMAIL = "Stereos Partners <partners@trystereos.com>";

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

