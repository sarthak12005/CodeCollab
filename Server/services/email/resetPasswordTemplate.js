module.exports = ({ username, resetLink, appName = "CodeCollab", domain = "codecollab.com" }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Change your password</title>
</head>

<body style="margin:0; padding:0; background-color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
    <tr>
      <td align="center">

        <!-- MAIN CONTAINER -->
        <table width="600" cellpadding="0" cellspacing="0" style="
          font-family: Arial, Helvetica, sans-serif;
          color:#333333;
        ">

          <!-- LOGO / HEADER -->
          <tr>
            <td style="padding-bottom:24px;">
              <h2 style="
                margin:0;
                font-size:26px;
                font-weight:700;
                color:#16a34a;
              ">
                ${appName}
              </h2>
            </td>
          </tr>

          <!-- TITLE -->
          <tr>
            <td style="padding-bottom:16px;">
              <h1 style="
                margin:0;
                font-size:22px;
                font-weight:600;
                color:#111827;
              ">
                Change your password
              </h1>
            </td>
          </tr>

          <!-- MESSAGE -->
          <tr>
            <td style="padding-bottom:20px; font-size:15px; line-height:1.6;">
              <p style="margin:0 0 12px;">
                We received a request to change the password for your
                <strong>${appName}</strong> account
                <strong>${username ? `(${username})` : ""}</strong>.
              </p>

              <p style="margin:0;">
                If you did not request a password change, you can safely ignore
                this email. Your password will not be changed.
              </p>
            </td>
          </tr>

          <!-- CTA BUTTON -->
          <tr>
            <td style="padding:24px 0;">
              <a href="${resetLink}" style="
                display:inline-block;
                background:#16a34a;
                color:#ffffff;
                text-decoration:none;
                padding:12px 24px;
                border-radius:4px;
                font-size:15px;
                font-weight:600;
              ">
                Reset password
              </a>
            </td>
          </tr>

          <!-- EXPIRY NOTE -->
          <tr>
            <td style="padding-bottom:24px; font-size:14px; color:#555555;">
              This link will remain active for <strong>48 hours</strong>.
            </td>
          </tr>

          <!-- FALLBACK LINK -->
          <tr>
            <td style="padding-bottom:32px; font-size:13px; color:#6b7280;">
              <p style="margin:0 0 8px;">
                If the button above doesn’t work, copy and paste this link into your browser:
              </p>
              <p style="margin:0; word-break:break-all; color:#2563eb;">
                ${resetLink}
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="
              border-top:1px solid #e5e7eb;
              padding-top:16px;
              font-size:12px;
              color:#9ca3af;
            ">
              <p style="margin:0;">
                © ${new Date().getFullYear()} ${appName}. All rights reserved.
              </p>
              <p style="margin:6px 0 0;">
                ${domain}
              </p>
            </td>
          </tr>

        </table>
        <!-- END CONTAINER -->

      </td>
    </tr>
  </table>
</body>
</html>
`;
};