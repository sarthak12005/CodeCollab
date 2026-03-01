const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({ to, subject, html }) {
  try {
    await resend.emails.send({
      from: "CodeCollab <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("📧 Email sent via Resend");
    return true;
  } catch (err) {
    console.error("❌ Email failed:", err);
    return false;
  }
}

module.exports = { sendEmail };