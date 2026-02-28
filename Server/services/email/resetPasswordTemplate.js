module.exports = ({ username, resetLink }) => {
  return `
    <div style="font-family: Arial, sans-serif;">
      <h2>Hello ${username},</h2>
      <p>An account has been created for you.</p>
      <p>Please set your password using the link below:</p>

      <a href="${resetLink}"
         style="
           display:inline-block;
           padding:10px 18px;
           background:#4f46e5;
           color:#fff;
           text-decoration:none;
           border-radius:6px;
         ">
        Reset Password
      </a>

      <p><b>Note:</b> This link will expire in 48 hours.</p>
      <p>If you didn’t expect this email, you can ignore it.</p>

      <br />
      <p>Thanks,<br/>Team</p>
    </div>
  `;
};