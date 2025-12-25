const { z } = require("zod"); // Use destructuring for require

const RegisterZodSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email cannot be empty" }),

  username: z
    .string({ required_error: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username cannot exceed 20 characters" })
    .regex(/^[a-zA-Z][a-zA-Z0-9]*$/, {
      message: "Username must start with a letter and contain only letters or numbers",
    }),

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// Export using CommonJS syntax
module.exports = { RegisterZodSchema };