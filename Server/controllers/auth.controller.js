require('dotenv').config();
const { generateToken } = require("../lib/jwt");
const { generateRandomPassword, generateResetToken } = require("../lib/generate");
const { sendEmail } = require("../services/email/emailService");
const resetPasswordTemplate = require("../services/email/resetPasswordTemplate");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const crypto = require("crypto");


exports.signUpUser = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            isAdminCreated = false,
            premium = false // admin-controlled
        } = req.body;

        // Required fields
        if (!username || !email) {
            return res.status(400).json({
                message: "Username and email are required"
            });
        }

        // Check existing user
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        let finalPasswordHash;
        let resetPasswordToken = null;
        let resetPasswordExpiry = null;
        let status = "ACTIVE";

        // 🔁 ADMIN FLOW
        if (isAdminCreated) {
            // 1️⃣ Generate random password
            const randomPassword = generateRandomPassword();
            finalPasswordHash = await bcrypt.hash(randomPassword, 10);

            // 2️⃣ Generate reset token
            const { base64Token, hashedToken } = generateResetToken(email);
            resetPasswordToken = hashedToken;
            resetPasswordExpiry = Date.now() + 48 * 60 * 60 * 1000;
            status = "INACTIVE";

            // 👉 Send reset link via email
            console.log("Reset Password Token:", base64Token);

            //send email to user
            // 3️⃣ Create reset password link
            const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${base64Token}`;

            // 4️⃣ Send email (NON-BLOCKING recommended)
            sendEmail({
                to: email,
                subject: "Set Your Password",
                html: resetPasswordTemplate({
                    username,
                    resetLink
                })
            }).catch(err => {
                console.error("Email failed:", err.message);
            });
        }

        // 🔁 NORMAL USER FLOW
        else {
            if (!password) {
                return res.status(400).json({
                    message: "Password is required"
                });
            }

            finalPasswordHash = await bcrypt.hash(password, 10);
        }

        // ✅ Whitelisted payload
        const newUser = new User({
            username,
            email: email.toLowerCase(),
            password: finalPasswordHash,
            role: "User",
            premium: isAdminCreated ? premium : false, // users can't fake premium
            status,
            verified: false,
            resetPasswordToken,
            resetPasswordExpiry
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: isAdminCreated
                ? "User created successfully. Reset password link sent."
                : "User registered successfully."
        });

    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        // Accept both username and email for login
        const user = await User.findOne({
            $or: [{ username }, { email: username }]
        }).select('+password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = generateToken(user._id, user.username, process.env.JWT_SECRET, process.env.JWT_EXPIRY);

        await User.findByIdAndUpdate(
            user._id,
            {
                status: "ACTIVE",
                lastLoginAt: new Date(),
            },
            {
                new: true,           // return updated doc
                runValidators: true  // enforce schema rules
            }
        );


        const userResponse = {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        res.status(200).json({ message: "User login successful", token, user: userResponse });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({
                message: "Token and new password are required"
            });
        }

        // Hash incoming token
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // Find user with valid token
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired reset token"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpiry = null;
        user.status = "ACTIVE";
        user.Verified = true;

        await user.save();

        res.json({
            success: true,
            message: "Password reset successful. You can now login."
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.json({
            message: "If user exists, reset link sent"
        });
    }

    const { base64Token, hashedToken } = generateResetToken(email);

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpiry = Date.now() + 48 * 60 * 60 * 1000;
    await user.save();

    console.log("Reset Token:", base64Token); // send via email

    res.json({
        message: "Reset password link sent"
    });
};