exports.generateRandomPassword = (length = 12) => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+[]{}<>?,.";

  const allChars = uppercase + lowercase + numbers + specialChars;

  let password = "";

  // Ensure at least one character from each category
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Fill remaining length
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password (important)
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

const crypto = require("crypto");

exports.generateResetToken = (email) => {
  const rawToken = `${email}:${crypto.randomBytes(32).toString("hex")}`;
  const base64Token = Buffer.from(rawToken).toString("base64");

  const hashedToken = crypto
    .createHash("sha256")
    .update(base64Token)
    .digest("hex");

  return { base64Token, hashedToken };
}